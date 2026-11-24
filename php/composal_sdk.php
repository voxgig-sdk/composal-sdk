<?php
declare(strict_types=1);

// Composal SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class ComposalSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ComposalUtility();
        $this->_utility = $utility;

        $config = ComposalConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = ComposalHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = ComposalHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!ComposalFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, ComposalFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'Composal'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return ComposalUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ComposalHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!ComposalPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = ComposalHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ComposalHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ComposalSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        $has_accept = false;
        foreach (array_keys($ctx->spec->headers) as $k) {
            if (strtolower((string)$k) === 'accept') {
                $has_accept = true;
                break;
            }
        }
        if (!$has_accept) {
            $ctx->spec->headers['accept'] = 'application/json';
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return ComposalPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new ComposalError($op . "_allow",
                "ComposalSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ComposalHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ComposalHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (ComposalFetcher::usesDefault($ctx)) {
                        $sent = ComposalFetcher::sentHeaders($sent);
                    }
                    $body_err = ComposalResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new ComposalError("graphql_error",
                "ComposalSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_agent = null;

    // Canonical facade: $client->Agent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent()
    // resolves here too.
    public function Agent($data = null)
    {
        require_once __DIR__ . '/entity/agent_entity.php';
        if ($data === null) {
            if ($this->_agent === null) {
                $this->_agent = new AgentEntity($this, null);
            }
            return $this->_agent;
        }
        return new AgentEntity($this, $data);
    }


    private $_agent_attachment = null;

    // Canonical facade: $client->AgentAttachment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_attachment()
    // resolves here too.
    public function AgentAttachment($data = null)
    {
        require_once __DIR__ . '/entity/agent_attachment_entity.php';
        if ($data === null) {
            if ($this->_agent_attachment === null) {
                $this->_agent_attachment = new AgentAttachmentEntity($this, null);
            }
            return $this->_agent_attachment;
        }
        return new AgentAttachmentEntity($this, $data);
    }


    private $_agent_automation = null;

    // Canonical facade: $client->AgentAutomation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_automation()
    // resolves here too.
    public function AgentAutomation($data = null)
    {
        require_once __DIR__ . '/entity/agent_automation_entity.php';
        if ($data === null) {
            if ($this->_agent_automation === null) {
                $this->_agent_automation = new AgentAutomationEntity($this, null);
            }
            return $this->_agent_automation;
        }
        return new AgentAutomationEntity($this, $data);
    }


    private $_agent_avatar = null;

    // Canonical facade: $client->AgentAvatar()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_avatar()
    // resolves here too.
    public function AgentAvatar($data = null)
    {
        require_once __DIR__ . '/entity/agent_avatar_entity.php';
        if ($data === null) {
            if ($this->_agent_avatar === null) {
                $this->_agent_avatar = new AgentAvatarEntity($this, null);
            }
            return $this->_agent_avatar;
        }
        return new AgentAvatarEntity($this, $data);
    }


    private $_agent_command = null;

    // Canonical facade: $client->AgentCommand()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_command()
    // resolves here too.
    public function AgentCommand($data = null)
    {
        require_once __DIR__ . '/entity/agent_command_entity.php';
        if ($data === null) {
            if ($this->_agent_command === null) {
                $this->_agent_command = new AgentCommandEntity($this, null);
            }
            return $this->_agent_command;
        }
        return new AgentCommandEntity($this, $data);
    }


    private $_agent_computer = null;

    // Canonical facade: $client->AgentComputer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_computer()
    // resolves here too.
    public function AgentComputer($data = null)
    {
        require_once __DIR__ . '/entity/agent_computer_entity.php';
        if ($data === null) {
            if ($this->_agent_computer === null) {
                $this->_agent_computer = new AgentComputerEntity($this, null);
            }
            return $this->_agent_computer;
        }
        return new AgentComputerEntity($this, $data);
    }


    private $_agent_connection = null;

    // Canonical facade: $client->AgentConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection()
    // resolves here too.
    public function AgentConnection($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_entity.php';
        if ($data === null) {
            if ($this->_agent_connection === null) {
                $this->_agent_connection = new AgentConnectionEntity($this, null);
            }
            return $this->_agent_connection;
        }
        return new AgentConnectionEntity($this, $data);
    }


    private $_agent_control_flow = null;

    // Canonical facade: $client->AgentControlFlow()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_control_flow()
    // resolves here too.
    public function AgentControlFlow($data = null)
    {
        require_once __DIR__ . '/entity/agent_control_flow_entity.php';
        if ($data === null) {
            if ($this->_agent_control_flow === null) {
                $this->_agent_control_flow = new AgentControlFlowEntity($this, null);
            }
            return $this->_agent_control_flow;
        }
        return new AgentControlFlowEntity($this, $data);
    }


    private $_agent_coordination = null;

    // Canonical facade: $client->AgentCoordination()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_coordination()
    // resolves here too.
    public function AgentCoordination($data = null)
    {
        require_once __DIR__ . '/entity/agent_coordination_entity.php';
        if ($data === null) {
            if ($this->_agent_coordination === null) {
                $this->_agent_coordination = new AgentCoordinationEntity($this, null);
            }
            return $this->_agent_coordination;
        }
        return new AgentCoordinationEntity($this, $data);
    }


    private $_agent_email = null;

    // Canonical facade: $client->AgentEmail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_email()
    // resolves here too.
    public function AgentEmail($data = null)
    {
        require_once __DIR__ . '/entity/agent_email_entity.php';
        if ($data === null) {
            if ($this->_agent_email === null) {
                $this->_agent_email = new AgentEmailEntity($this, null);
            }
            return $this->_agent_email;
        }
        return new AgentEmailEntity($this, $data);
    }


    private $_agent_file = null;

    // Canonical facade: $client->AgentFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_file()
    // resolves here too.
    public function AgentFile($data = null)
    {
        require_once __DIR__ . '/entity/agent_file_entity.php';
        if ($data === null) {
            if ($this->_agent_file === null) {
                $this->_agent_file = new AgentFileEntity($this, null);
            }
            return $this->_agent_file;
        }
        return new AgentFileEntity($this, $data);
    }


    private $_agent_input = null;

    // Canonical facade: $client->AgentInput()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_input()
    // resolves here too.
    public function AgentInput($data = null)
    {
        require_once __DIR__ . '/entity/agent_input_entity.php';
        if ($data === null) {
            if ($this->_agent_input === null) {
                $this->_agent_input = new AgentInputEntity($this, null);
            }
            return $this->_agent_input;
        }
        return new AgentInputEntity($this, $data);
    }


    private $_agent_integration = null;

    // Canonical facade: $client->AgentIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_integration()
    // resolves here too.
    public function AgentIntegration($data = null)
    {
        require_once __DIR__ . '/entity/agent_integration_entity.php';
        if ($data === null) {
            if ($this->_agent_integration === null) {
                $this->_agent_integration = new AgentIntegrationEntity($this, null);
            }
            return $this->_agent_integration;
        }
        return new AgentIntegrationEntity($this, $data);
    }


    private $_agent_interaction = null;

    // Canonical facade: $client->AgentInteraction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_interaction()
    // resolves here too.
    public function AgentInteraction($data = null)
    {
        require_once __DIR__ . '/entity/agent_interaction_entity.php';
        if ($data === null) {
            if ($this->_agent_interaction === null) {
                $this->_agent_interaction = new AgentInteractionEntity($this, null);
            }
            return $this->_agent_interaction;
        }
        return new AgentInteractionEntity($this, $data);
    }


    private $_agent_library = null;

    // Canonical facade: $client->AgentLibrary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_library()
    // resolves here too.
    public function AgentLibrary($data = null)
    {
        require_once __DIR__ . '/entity/agent_library_entity.php';
        if ($data === null) {
            if ($this->_agent_library === null) {
                $this->_agent_library = new AgentLibraryEntity($this, null);
            }
            return $this->_agent_library;
        }
        return new AgentLibraryEntity($this, $data);
    }


    private $_agent_manager = null;

    // Canonical facade: $client->AgentManager()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_manager()
    // resolves here too.
    public function AgentManager($data = null)
    {
        require_once __DIR__ . '/entity/agent_manager_entity.php';
        if ($data === null) {
            if ($this->_agent_manager === null) {
                $this->_agent_manager = new AgentManagerEntity($this, null);
            }
            return $this->_agent_manager;
        }
        return new AgentManagerEntity($this, $data);
    }


    private $_agent_manager_choice = null;

    // Canonical facade: $client->AgentManagerChoice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_manager_choice()
    // resolves here too.
    public function AgentManagerChoice($data = null)
    {
        require_once __DIR__ . '/entity/agent_manager_choice_entity.php';
        if ($data === null) {
            if ($this->_agent_manager_choice === null) {
                $this->_agent_manager_choice = new AgentManagerChoiceEntity($this, null);
            }
            return $this->_agent_manager_choice;
        }
        return new AgentManagerChoiceEntity($this, $data);
    }


    private $_agent_marketplace = null;

    // Canonical facade: $client->AgentMarketplace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_marketplace()
    // resolves here too.
    public function AgentMarketplace($data = null)
    {
        require_once __DIR__ . '/entity/agent_marketplace_entity.php';
        if ($data === null) {
            if ($this->_agent_marketplace === null) {
                $this->_agent_marketplace = new AgentMarketplaceEntity($this, null);
            }
            return $this->_agent_marketplace;
        }
        return new AgentMarketplaceEntity($this, $data);
    }


    private $_agent_marketplace_shared = null;

    // Canonical facade: $client->AgentMarketplaceShared()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_marketplace_shared()
    // resolves here too.
    public function AgentMarketplaceShared($data = null)
    {
        require_once __DIR__ . '/entity/agent_marketplace_shared_entity.php';
        if ($data === null) {
            if ($this->_agent_marketplace_shared === null) {
                $this->_agent_marketplace_shared = new AgentMarketplaceSharedEntity($this, null);
            }
            return $this->_agent_marketplace_shared;
        }
        return new AgentMarketplaceSharedEntity($this, $data);
    }


    private $_agent_mission_control = null;

    // Canonical facade: $client->AgentMissionControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_mission_control()
    // resolves here too.
    public function AgentMissionControl($data = null)
    {
        require_once __DIR__ . '/entity/agent_mission_control_entity.php';
        if ($data === null) {
            if ($this->_agent_mission_control === null) {
                $this->_agent_mission_control = new AgentMissionControlEntity($this, null);
            }
            return $this->_agent_mission_control;
        }
        return new AgentMissionControlEntity($this, $data);
    }


    private $_agent_operation = null;

    // Canonical facade: $client->AgentOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_operation()
    // resolves here too.
    public function AgentOperation($data = null)
    {
        require_once __DIR__ . '/entity/agent_operation_entity.php';
        if ($data === null) {
            if ($this->_agent_operation === null) {
                $this->_agent_operation = new AgentOperationEntity($this, null);
            }
            return $this->_agent_operation;
        }
        return new AgentOperationEntity($this, $data);
    }


    private $_agent_provisioning = null;

    // Canonical facade: $client->AgentProvisioning()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_provisioning()
    // resolves here too.
    public function AgentProvisioning($data = null)
    {
        require_once __DIR__ . '/entity/agent_provisioning_entity.php';
        if ($data === null) {
            if ($this->_agent_provisioning === null) {
                $this->_agent_provisioning = new AgentProvisioningEntity($this, null);
            }
            return $this->_agent_provisioning;
        }
        return new AgentProvisioningEntity($this, $data);
    }


    private $_agent_pull_request = null;

    // Canonical facade: $client->AgentPullRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_pull_request()
    // resolves here too.
    public function AgentPullRequest($data = null)
    {
        require_once __DIR__ . '/entity/agent_pull_request_entity.php';
        if ($data === null) {
            if ($this->_agent_pull_request === null) {
                $this->_agent_pull_request = new AgentPullRequestEntity($this, null);
            }
            return $this->_agent_pull_request;
        }
        return new AgentPullRequestEntity($this, $data);
    }


    private $_agent_question = null;

    // Canonical facade: $client->AgentQuestion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_question()
    // resolves here too.
    public function AgentQuestion($data = null)
    {
        require_once __DIR__ . '/entity/agent_question_entity.php';
        if ($data === null) {
            if ($this->_agent_question === null) {
                $this->_agent_question = new AgentQuestionEntity($this, null);
            }
            return $this->_agent_question;
        }
        return new AgentQuestionEntity($this, $data);
    }


    private $_agent_repository = null;

    // Canonical facade: $client->AgentRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_repository()
    // resolves here too.
    public function AgentRepository($data = null)
    {
        require_once __DIR__ . '/entity/agent_repository_entity.php';
        if ($data === null) {
            if ($this->_agent_repository === null) {
                $this->_agent_repository = new AgentRepositoryEntity($this, null);
            }
            return $this->_agent_repository;
        }
        return new AgentRepositoryEntity($this, $data);
    }


    private $_agent_resource = null;

    // Canonical facade: $client->AgentResource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_resource()
    // resolves here too.
    public function AgentResource($data = null)
    {
        require_once __DIR__ . '/entity/agent_resource_entity.php';
        if ($data === null) {
            if ($this->_agent_resource === null) {
                $this->_agent_resource = new AgentResourceEntity($this, null);
            }
            return $this->_agent_resource;
        }
        return new AgentResourceEntity($this, $data);
    }


    private $_agent_routine = null;

    // Canonical facade: $client->AgentRoutine()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_routine()
    // resolves here too.
    public function AgentRoutine($data = null)
    {
        require_once __DIR__ . '/entity/agent_routine_entity.php';
        if ($data === null) {
            if ($this->_agent_routine === null) {
                $this->_agent_routine = new AgentRoutineEntity($this, null);
            }
            return $this->_agent_routine;
        }
        return new AgentRoutineEntity($this, $data);
    }


    private $_agent_run = null;

    // Canonical facade: $client->AgentRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_run()
    // resolves here too.
    public function AgentRun($data = null)
    {
        require_once __DIR__ . '/entity/agent_run_entity.php';
        if ($data === null) {
            if ($this->_agent_run === null) {
                $this->_agent_run = new AgentRunEntity($this, null);
            }
            return $this->_agent_run;
        }
        return new AgentRunEntity($this, $data);
    }


    private $_agent_runtime = null;

    // Canonical facade: $client->AgentRuntime()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_runtime()
    // resolves here too.
    public function AgentRuntime($data = null)
    {
        require_once __DIR__ . '/entity/agent_runtime_entity.php';
        if ($data === null) {
            if ($this->_agent_runtime === null) {
                $this->_agent_runtime = new AgentRuntimeEntity($this, null);
            }
            return $this->_agent_runtime;
        }
        return new AgentRuntimeEntity($this, $data);
    }


    private $_agent_setting = null;

    // Canonical facade: $client->AgentSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_setting()
    // resolves here too.
    public function AgentSetting($data = null)
    {
        require_once __DIR__ . '/entity/agent_setting_entity.php';
        if ($data === null) {
            if ($this->_agent_setting === null) {
                $this->_agent_setting = new AgentSettingEntity($this, null);
            }
            return $this->_agent_setting;
        }
        return new AgentSettingEntity($this, $data);
    }


    private $_agent_sharing = null;

    // Canonical facade: $client->AgentSharing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_sharing()
    // resolves here too.
    public function AgentSharing($data = null)
    {
        require_once __DIR__ . '/entity/agent_sharing_entity.php';
        if ($data === null) {
            if ($this->_agent_sharing === null) {
                $this->_agent_sharing = new AgentSharingEntity($this, null);
            }
            return $this->_agent_sharing;
        }
        return new AgentSharingEntity($this, $data);
    }


    private $_agent_site = null;

    // Canonical facade: $client->AgentSite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_site()
    // resolves here too.
    public function AgentSite($data = null)
    {
        require_once __DIR__ . '/entity/agent_site_entity.php';
        if ($data === null) {
            if ($this->_agent_site === null) {
                $this->_agent_site = new AgentSiteEntity($this, null);
            }
            return $this->_agent_site;
        }
        return new AgentSiteEntity($this, $data);
    }


    private $_agent_skill = null;

    // Canonical facade: $client->AgentSkill()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_skill()
    // resolves here too.
    public function AgentSkill($data = null)
    {
        require_once __DIR__ . '/entity/agent_skill_entity.php';
        if ($data === null) {
            if ($this->_agent_skill === null) {
                $this->_agent_skill = new AgentSkillEntity($this, null);
            }
            return $this->_agent_skill;
        }
        return new AgentSkillEntity($this, $data);
    }


    private $_agent_slack = null;

    // Canonical facade: $client->AgentSlack()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_slack()
    // resolves here too.
    public function AgentSlack($data = null)
    {
        require_once __DIR__ . '/entity/agent_slack_entity.php';
        if ($data === null) {
            if ($this->_agent_slack === null) {
                $this->_agent_slack = new AgentSlackEntity($this, null);
            }
            return $this->_agent_slack;
        }
        return new AgentSlackEntity($this, $data);
    }


    private $_agent_subagent = null;

    // Canonical facade: $client->AgentSubagent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_subagent()
    // resolves here too.
    public function AgentSubagent($data = null)
    {
        require_once __DIR__ . '/entity/agent_subagent_entity.php';
        if ($data === null) {
            if ($this->_agent_subagent === null) {
                $this->_agent_subagent = new AgentSubagentEntity($this, null);
            }
            return $this->_agent_subagent;
        }
        return new AgentSubagentEntity($this, $data);
    }


    private $_agent_subscription = null;

    // Canonical facade: $client->AgentSubscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_subscription()
    // resolves here too.
    public function AgentSubscription($data = null)
    {
        require_once __DIR__ . '/entity/agent_subscription_entity.php';
        if ($data === null) {
            if ($this->_agent_subscription === null) {
                $this->_agent_subscription = new AgentSubscriptionEntity($this, null);
            }
            return $this->_agent_subscription;
        }
        return new AgentSubscriptionEntity($this, $data);
    }


    private $_agent_teammate = null;

    // Canonical facade: $client->AgentTeammate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_teammate()
    // resolves here too.
    public function AgentTeammate($data = null)
    {
        require_once __DIR__ . '/entity/agent_teammate_entity.php';
        if ($data === null) {
            if ($this->_agent_teammate === null) {
                $this->_agent_teammate = new AgentTeammateEntity($this, null);
            }
            return $this->_agent_teammate;
        }
        return new AgentTeammateEntity($this, $data);
    }


    private $_agent_terminal = null;

    // Canonical facade: $client->AgentTerminal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_terminal()
    // resolves here too.
    public function AgentTerminal($data = null)
    {
        require_once __DIR__ . '/entity/agent_terminal_entity.php';
        if ($data === null) {
            if ($this->_agent_terminal === null) {
                $this->_agent_terminal = new AgentTerminalEntity($this, null);
            }
            return $this->_agent_terminal;
        }
        return new AgentTerminalEntity($this, $data);
    }


    private $_agent_thread = null;

    // Canonical facade: $client->AgentThread()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_thread()
    // resolves here too.
    public function AgentThread($data = null)
    {
        require_once __DIR__ . '/entity/agent_thread_entity.php';
        if ($data === null) {
            if ($this->_agent_thread === null) {
                $this->_agent_thread = new AgentThreadEntity($this, null);
            }
            return $this->_agent_thread;
        }
        return new AgentThreadEntity($this, $data);
    }


    private $_agent_tool = null;

    // Canonical facade: $client->AgentTool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_tool()
    // resolves here too.
    public function AgentTool($data = null)
    {
        require_once __DIR__ . '/entity/agent_tool_entity.php';
        if ($data === null) {
            if ($this->_agent_tool === null) {
                $this->_agent_tool = new AgentToolEntity($this, null);
            }
            return $this->_agent_tool;
        }
        return new AgentToolEntity($this, $data);
    }


    private $_agent_verify_project = null;

    // Canonical facade: $client->AgentVerifyProject()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_verify_project()
    // resolves here too.
    public function AgentVerifyProject($data = null)
    {
        require_once __DIR__ . '/entity/agent_verify_project_entity.php';
        if ($data === null) {
            if ($this->_agent_verify_project === null) {
                $this->_agent_verify_project = new AgentVerifyProjectEntity($this, null);
            }
            return $this->_agent_verify_project;
        }
        return new AgentVerifyProjectEntity($this, $data);
    }


    private $_agent_wait = null;

    // Canonical facade: $client->AgentWait()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_wait()
    // resolves here too.
    public function AgentWait($data = null)
    {
        require_once __DIR__ . '/entity/agent_wait_entity.php';
        if ($data === null) {
            if ($this->_agent_wait === null) {
                $this->_agent_wait = new AgentWaitEntity($this, null);
            }
            return $this->_agent_wait;
        }
        return new AgentWaitEntity($this, $data);
    }


    private $_agent_webhook = null;

    // Canonical facade: $client->AgentWebhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_webhook()
    // resolves here too.
    public function AgentWebhook($data = null)
    {
        require_once __DIR__ . '/entity/agent_webhook_entity.php';
        if ($data === null) {
            if ($this->_agent_webhook === null) {
                $this->_agent_webhook = new AgentWebhookEntity($this, null);
            }
            return $this->_agent_webhook;
        }
        return new AgentWebhookEntity($this, $data);
    }


    private $_agent_work = null;

    // Canonical facade: $client->AgentWork()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_work()
    // resolves here too.
    public function AgentWork($data = null)
    {
        require_once __DIR__ . '/entity/agent_work_entity.php';
        if ($data === null) {
            if ($this->_agent_work === null) {
                $this->_agent_work = new AgentWorkEntity($this, null);
            }
            return $this->_agent_work;
        }
        return new AgentWorkEntity($this, $data);
    }


    private $_agent_workflow = null;

    // Canonical facade: $client->AgentWorkflow()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_workflow()
    // resolves here too.
    public function AgentWorkflow($data = null)
    {
        require_once __DIR__ . '/entity/agent_workflow_entity.php';
        if ($data === null) {
            if ($this->_agent_workflow === null) {
                $this->_agent_workflow = new AgentWorkflowEntity($this, null);
            }
            return $this->_agent_workflow;
        }
        return new AgentWorkflowEntity($this, $data);
    }


    private $_agent_workflow_proposal = null;

    // Canonical facade: $client->AgentWorkflowProposal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_workflow_proposal()
    // resolves here too.
    public function AgentWorkflowProposal($data = null)
    {
        require_once __DIR__ . '/entity/agent_workflow_proposal_entity.php';
        if ($data === null) {
            if ($this->_agent_workflow_proposal === null) {
                $this->_agent_workflow_proposal = new AgentWorkflowProposalEntity($this, null);
            }
            return $this->_agent_workflow_proposal;
        }
        return new AgentWorkflowProposalEntity($this, $data);
    }


    private $_agent_workflow_run = null;

    // Canonical facade: $client->AgentWorkflowRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_workflow_run()
    // resolves here too.
    public function AgentWorkflowRun($data = null)
    {
        require_once __DIR__ . '/entity/agent_workflow_run_entity.php';
        if ($data === null) {
            if ($this->_agent_workflow_run === null) {
                $this->_agent_workflow_run = new AgentWorkflowRunEntity($this, null);
            }
            return $this->_agent_workflow_run;
        }
        return new AgentWorkflowRunEntity($this, $data);
    }


    private $_agent_workflow_trigger = null;

    // Canonical facade: $client->AgentWorkflowTrigger()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_workflow_trigger()
    // resolves here too.
    public function AgentWorkflowTrigger($data = null)
    {
        require_once __DIR__ . '/entity/agent_workflow_trigger_entity.php';
        if ($data === null) {
            if ($this->_agent_workflow_trigger === null) {
                $this->_agent_workflow_trigger = new AgentWorkflowTriggerEntity($this, null);
            }
            return $this->_agent_workflow_trigger;
        }
        return new AgentWorkflowTriggerEntity($this, $data);
    }


    private $_agent_workspace = null;

    // Canonical facade: $client->AgentWorkspace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_workspace()
    // resolves here too.
    public function AgentWorkspace($data = null)
    {
        require_once __DIR__ . '/entity/agent_workspace_entity.php';
        if ($data === null) {
            if ($this->_agent_workspace === null) {
                $this->_agent_workspace = new AgentWorkspaceEntity($this, null);
            }
            return $this->_agent_workspace;
        }
        return new AgentWorkspaceEntity($this, $data);
    }


    private $_agent_write_permission = null;

    // Canonical facade: $client->AgentWritePermission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_write_permission()
    // resolves here too.
    public function AgentWritePermission($data = null)
    {
        require_once __DIR__ . '/entity/agent_write_permission_entity.php';
        if ($data === null) {
            if ($this->_agent_write_permission === null) {
                $this->_agent_write_permission = new AgentWritePermissionEntity($this, null);
            }
            return $this->_agent_write_permission;
        }
        return new AgentWritePermissionEntity($this, $data);
    }


    private $_allocation_log = null;

    // Canonical facade: $client->AllocationLog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->allocation_log()
    // resolves here too.
    public function AllocationLog($data = null)
    {
        require_once __DIR__ . '/entity/allocation_log_entity.php';
        if ($data === null) {
            if ($this->_allocation_log === null) {
                $this->_allocation_log = new AllocationLogEntity($this, null);
            }
            return $this->_allocation_log;
        }
        return new AllocationLogEntity($this, $data);
    }


    private $_app = null;

    // Canonical facade: $client->App()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app()
    // resolves here too.
    public function App($data = null)
    {
        require_once __DIR__ . '/entity/app_entity.php';
        if ($data === null) {
            if ($this->_app === null) {
                $this->_app = new AppEntity($this, null);
            }
            return $this->_app;
        }
        return new AppEntity($this, $data);
    }


    private $_app_cdn = null;

    // Canonical facade: $client->AppCdn()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_cdn()
    // resolves here too.
    public function AppCdn($data = null)
    {
        require_once __DIR__ . '/entity/app_cdn_entity.php';
        if ($data === null) {
            if ($this->_app_cdn === null) {
                $this->_app_cdn = new AppCdnEntity($this, null);
            }
            return $this->_app_cdn;
        }
        return new AppCdnEntity($this, $data);
    }


    private $_app_config_variable = null;

    // Canonical facade: $client->AppConfigVariable()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_config_variable()
    // resolves here too.
    public function AppConfigVariable($data = null)
    {
        require_once __DIR__ . '/entity/app_config_variable_entity.php';
        if ($data === null) {
            if ($this->_app_config_variable === null) {
                $this->_app_config_variable = new AppConfigVariableEntity($this, null);
            }
            return $this->_app_config_variable;
        }
        return new AppConfigVariableEntity($this, $data);
    }


    private $_app_data_resource = null;

    // Canonical facade: $client->AppDataResource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_data_resource()
    // resolves here too.
    public function AppDataResource($data = null)
    {
        require_once __DIR__ . '/entity/app_data_resource_entity.php';
        if ($data === null) {
            if ($this->_app_data_resource === null) {
                $this->_app_data_resource = new AppDataResourceEntity($this, null);
            }
            return $this->_app_data_resource;
        }
        return new AppDataResourceEntity($this, $data);
    }


    private $_app_deploy = null;

    // Canonical facade: $client->AppDeploy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_deploy()
    // resolves here too.
    public function AppDeploy($data = null)
    {
        require_once __DIR__ . '/entity/app_deploy_entity.php';
        if ($data === null) {
            if ($this->_app_deploy === null) {
                $this->_app_deploy = new AppDeployEntity($this, null);
            }
            return $this->_app_deploy;
        }
        return new AppDeployEntity($this, $data);
    }


    private $_app_deployment = null;

    // Canonical facade: $client->AppDeployment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_deployment()
    // resolves here too.
    public function AppDeployment($data = null)
    {
        require_once __DIR__ . '/entity/app_deployment_entity.php';
        if ($data === null) {
            if ($this->_app_deployment === null) {
                $this->_app_deployment = new AppDeploymentEntity($this, null);
            }
            return $this->_app_deployment;
        }
        return new AppDeploymentEntity($this, $data);
    }


    private $_app_deployment_operation = null;

    // Canonical facade: $client->AppDeploymentOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_deployment_operation()
    // resolves here too.
    public function AppDeploymentOperation($data = null)
    {
        require_once __DIR__ . '/entity/app_deployment_operation_entity.php';
        if ($data === null) {
            if ($this->_app_deployment_operation === null) {
                $this->_app_deployment_operation = new AppDeploymentOperationEntity($this, null);
            }
            return $this->_app_deployment_operation;
        }
        return new AppDeploymentOperationEntity($this, $data);
    }


    private $_app_deployment_rollback = null;

    // Canonical facade: $client->AppDeploymentRollback()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_deployment_rollback()
    // resolves here too.
    public function AppDeploymentRollback($data = null)
    {
        require_once __DIR__ . '/entity/app_deployment_rollback_entity.php';
        if ($data === null) {
            if ($this->_app_deployment_rollback === null) {
                $this->_app_deployment_rollback = new AppDeploymentRollbackEntity($this, null);
            }
            return $this->_app_deployment_rollback;
        }
        return new AppDeploymentRollbackEntity($this, $data);
    }


    private $_app_environment = null;

    // Canonical facade: $client->AppEnvironment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_environment()
    // resolves here too.
    public function AppEnvironment($data = null)
    {
        require_once __DIR__ . '/entity/app_environment_entity.php';
        if ($data === null) {
            if ($this->_app_environment === null) {
                $this->_app_environment = new AppEnvironmentEntity($this, null);
            }
            return $this->_app_environment;
        }
        return new AppEnvironmentEntity($this, $data);
    }


    private $_app_location = null;

    // Canonical facade: $client->AppLocation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_location()
    // resolves here too.
    public function AppLocation($data = null)
    {
        require_once __DIR__ . '/entity/app_location_entity.php';
        if ($data === null) {
            if ($this->_app_location === null) {
                $this->_app_location = new AppLocationEntity($this, null);
            }
            return $this->_app_location;
        }
        return new AppLocationEntity($this, $data);
    }


    private $_app_metric = null;

    // Canonical facade: $client->AppMetric()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_metric()
    // resolves here too.
    public function AppMetric($data = null)
    {
        require_once __DIR__ . '/entity/app_metric_entity.php';
        if ($data === null) {
            if ($this->_app_metric === null) {
                $this->_app_metric = new AppMetricEntity($this, null);
            }
            return $this->_app_metric;
        }
        return new AppMetricEntity($this, $data);
    }


    private $_app_preview = null;

    // Canonical facade: $client->AppPreview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_preview()
    // resolves here too.
    public function AppPreview($data = null)
    {
        require_once __DIR__ . '/entity/app_preview_entity.php';
        if ($data === null) {
            if ($this->_app_preview === null) {
                $this->_app_preview = new AppPreviewEntity($this, null);
            }
            return $this->_app_preview;
        }
        return new AppPreviewEntity($this, $data);
    }


    private $_app_preview_profile = null;

    // Canonical facade: $client->AppPreviewProfile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_preview_profile()
    // resolves here too.
    public function AppPreviewProfile($data = null)
    {
        require_once __DIR__ . '/entity/app_preview_profile_entity.php';
        if ($data === null) {
            if ($this->_app_preview_profile === null) {
                $this->_app_preview_profile = new AppPreviewProfileEntity($this, null);
            }
            return $this->_app_preview_profile;
        }
        return new AppPreviewProfileEntity($this, $data);
    }


    private $_app_run = null;

    // Canonical facade: $client->AppRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_run()
    // resolves here too.
    public function AppRun($data = null)
    {
        require_once __DIR__ . '/entity/app_run_entity.php';
        if ($data === null) {
            if ($this->_app_run === null) {
                $this->_app_run = new AppRunEntity($this, null);
            }
            return $this->_app_run;
        }
        return new AppRunEntity($this, $data);
    }


    private $_app_secret = null;

    // Canonical facade: $client->AppSecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_secret()
    // resolves here too.
    public function AppSecret($data = null)
    {
        require_once __DIR__ . '/entity/app_secret_entity.php';
        if ($data === null) {
            if ($this->_app_secret === null) {
                $this->_app_secret = new AppSecretEntity($this, null);
            }
            return $this->_app_secret;
        }
        return new AppSecretEntity($this, $data);
    }


    private $_app_service = null;

    // Canonical facade: $client->AppService()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_service()
    // resolves here too.
    public function AppService($data = null)
    {
        require_once __DIR__ . '/entity/app_service_entity.php';
        if ($data === null) {
            if ($this->_app_service === null) {
                $this->_app_service = new AppServiceEntity($this, null);
            }
            return $this->_app_service;
        }
        return new AppServiceEntity($this, $data);
    }


    private $_app_service_binding = null;

    // Canonical facade: $client->AppServiceBinding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_service_binding()
    // resolves here too.
    public function AppServiceBinding($data = null)
    {
        require_once __DIR__ . '/entity/app_service_binding_entity.php';
        if ($data === null) {
            if ($this->_app_service_binding === null) {
                $this->_app_service_binding = new AppServiceBindingEntity($this, null);
            }
            return $this->_app_service_binding;
        }
        return new AppServiceBindingEntity($this, $data);
    }


    private $_app_service_placement = null;

    // Canonical facade: $client->AppServicePlacement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_service_placement()
    // resolves here too.
    public function AppServicePlacement($data = null)
    {
        require_once __DIR__ . '/entity/app_service_placement_entity.php';
        if ($data === null) {
            if ($this->_app_service_placement === null) {
                $this->_app_service_placement = new AppServicePlacementEntity($this, null);
            }
            return $this->_app_service_placement;
        }
        return new AppServicePlacementEntity($this, $data);
    }


    private $_app_storage_resource = null;

    // Canonical facade: $client->AppStorageResource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_storage_resource()
    // resolves here too.
    public function AppStorageResource($data = null)
    {
        require_once __DIR__ . '/entity/app_storage_resource_entity.php';
        if ($data === null) {
            if ($this->_app_storage_resource === null) {
                $this->_app_storage_resource = new AppStorageResourceEntity($this, null);
            }
            return $this->_app_storage_resource;
        }
        return new AppStorageResourceEntity($this, $data);
    }


    private $_attachment_part = null;

    // Canonical facade: $client->AttachmentPart()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->attachment_part()
    // resolves here too.
    public function AttachmentPart($data = null)
    {
        require_once __DIR__ . '/entity/attachment_part_entity.php';
        if ($data === null) {
            if ($this->_attachment_part === null) {
                $this->_attachment_part = new AttachmentPartEntity($this, null);
            }
            return $this->_attachment_part;
        }
        return new AttachmentPartEntity($this, $data);
    }


    private $_automation_event = null;

    // Canonical facade: $client->AutomationEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->automation_event()
    // resolves here too.
    public function AutomationEvent($data = null)
    {
        require_once __DIR__ . '/entity/automation_event_entity.php';
        if ($data === null) {
            if ($this->_automation_event === null) {
                $this->_automation_event = new AutomationEventEntity($this, null);
            }
            return $this->_automation_event;
        }
        return new AutomationEventEntity($this, $data);
    }


    private $_automation_run = null;

    // Canonical facade: $client->AutomationRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->automation_run()
    // resolves here too.
    public function AutomationRun($data = null)
    {
        require_once __DIR__ . '/entity/automation_run_entity.php';
        if ($data === null) {
            if ($this->_automation_run === null) {
                $this->_automation_run = new AutomationRunEntity($this, null);
            }
            return $this->_automation_run;
        }
        return new AutomationRunEntity($this, $data);
    }


    private $_binary = null;

    // Canonical facade: $client->Binary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->binary()
    // resolves here too.
    public function Binary($data = null)
    {
        require_once __DIR__ . '/entity/binary_entity.php';
        if ($data === null) {
            if ($this->_binary === null) {
                $this->_binary = new BinaryEntity($this, null);
            }
            return $this->_binary;
        }
        return new BinaryEntity($this, $data);
    }


    private $_binary_version = null;

    // Canonical facade: $client->BinaryVersion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->binary_version()
    // resolves here too.
    public function BinaryVersion($data = null)
    {
        require_once __DIR__ . '/entity/binary_version_entity.php';
        if ($data === null) {
            if ($this->_binary_version === null) {
                $this->_binary_version = new BinaryVersionEntity($this, null);
            }
            return $this->_binary_version;
        }
        return new BinaryVersionEntity($this, $data);
    }


    private $_browser_egress_candidate = null;

    // Canonical facade: $client->BrowserEgressCandidate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_egress_candidate()
    // resolves here too.
    public function BrowserEgressCandidate($data = null)
    {
        require_once __DIR__ . '/entity/browser_egress_candidate_entity.php';
        if ($data === null) {
            if ($this->_browser_egress_candidate === null) {
                $this->_browser_egress_candidate = new BrowserEgressCandidateEntity($this, null);
            }
            return $this->_browser_egress_candidate;
        }
        return new BrowserEgressCandidateEntity($this, $data);
    }


    private $_browser_session = null;

    // Canonical facade: $client->BrowserSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session()
    // resolves here too.
    public function BrowserSession($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_entity.php';
        if ($data === null) {
            if ($this->_browser_session === null) {
                $this->_browser_session = new BrowserSessionEntity($this, null);
            }
            return $this->_browser_session;
        }
        return new BrowserSessionEntity($this, $data);
    }


    private $_browser_session_connection = null;

    // Canonical facade: $client->BrowserSessionConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_connection()
    // resolves here too.
    public function BrowserSessionConnection($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_connection_entity.php';
        if ($data === null) {
            if ($this->_browser_session_connection === null) {
                $this->_browser_session_connection = new BrowserSessionConnectionEntity($this, null);
            }
            return $this->_browser_session_connection;
        }
        return new BrowserSessionConnectionEntity($this, $data);
    }


    private $_browser_session_control = null;

    // Canonical facade: $client->BrowserSessionControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_control()
    // resolves here too.
    public function BrowserSessionControl($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_control_entity.php';
        if ($data === null) {
            if ($this->_browser_session_control === null) {
                $this->_browser_session_control = new BrowserSessionControlEntity($this, null);
            }
            return $this->_browser_session_control;
        }
        return new BrowserSessionControlEntity($this, $data);
    }


    private $_browser_session_event = null;

    // Canonical facade: $client->BrowserSessionEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_event()
    // resolves here too.
    public function BrowserSessionEvent($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_event_entity.php';
        if ($data === null) {
            if ($this->_browser_session_event === null) {
                $this->_browser_session_event = new BrowserSessionEventEntity($this, null);
            }
            return $this->_browser_session_event;
        }
        return new BrowserSessionEventEntity($this, $data);
    }


    private $_browser_session_media = null;

    // Canonical facade: $client->BrowserSessionMedia()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_media()
    // resolves here too.
    public function BrowserSessionMedia($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_media_entity.php';
        if ($data === null) {
            if ($this->_browser_session_media === null) {
                $this->_browser_session_media = new BrowserSessionMediaEntity($this, null);
            }
            return $this->_browser_session_media;
        }
        return new BrowserSessionMediaEntity($this, $data);
    }


    private $_browser_session_recording = null;

    // Canonical facade: $client->BrowserSessionRecording()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_recording()
    // resolves here too.
    public function BrowserSessionRecording($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_recording_entity.php';
        if ($data === null) {
            if ($this->_browser_session_recording === null) {
                $this->_browser_session_recording = new BrowserSessionRecordingEntity($this, null);
            }
            return $this->_browser_session_recording;
        }
        return new BrowserSessionRecordingEntity($this, $data);
    }


    private $_browser_session_screenshot = null;

    // Canonical facade: $client->BrowserSessionScreenshot()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_screenshot()
    // resolves here too.
    public function BrowserSessionScreenshot($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_screenshot_entity.php';
        if ($data === null) {
            if ($this->_browser_session_screenshot === null) {
                $this->_browser_session_screenshot = new BrowserSessionScreenshotEntity($this, null);
            }
            return $this->_browser_session_screenshot;
        }
        return new BrowserSessionScreenshotEntity($this, $data);
    }


    private $_browser_session_task = null;

    // Canonical facade: $client->BrowserSessionTask()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->browser_session_task()
    // resolves here too.
    public function BrowserSessionTask($data = null)
    {
        require_once __DIR__ . '/entity/browser_session_task_entity.php';
        if ($data === null) {
            if ($this->_browser_session_task === null) {
                $this->_browser_session_task = new BrowserSessionTaskEntity($this, null);
            }
            return $this->_browser_session_task;
        }
        return new BrowserSessionTaskEntity($this, $data);
    }


    private $_catalog_selector = null;

    // Canonical facade: $client->CatalogSelector()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->catalog_selector()
    // resolves here too.
    public function CatalogSelector($data = null)
    {
        require_once __DIR__ . '/entity/catalog_selector_entity.php';
        if ($data === null) {
            if ($this->_catalog_selector === null) {
                $this->_catalog_selector = new CatalogSelectorEntity($this, null);
            }
            return $this->_catalog_selector;
        }
        return new CatalogSelectorEntity($this, $data);
    }


    private $_cdn_deployment = null;

    // Canonical facade: $client->CdnDeployment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cdn_deployment()
    // resolves here too.
    public function CdnDeployment($data = null)
    {
        require_once __DIR__ . '/entity/cdn_deployment_entity.php';
        if ($data === null) {
            if ($this->_cdn_deployment === null) {
                $this->_cdn_deployment = new CdnDeploymentEntity($this, null);
            }
            return $this->_cdn_deployment;
        }
        return new CdnDeploymentEntity($this, $data);
    }


    private $_cdn_hostname = null;

    // Canonical facade: $client->CdnHostname()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cdn_hostname()
    // resolves here too.
    public function CdnHostname($data = null)
    {
        require_once __DIR__ . '/entity/cdn_hostname_entity.php';
        if ($data === null) {
            if ($this->_cdn_hostname === null) {
                $this->_cdn_hostname = new CdnHostnameEntity($this, null);
            }
            return $this->_cdn_hostname;
        }
        return new CdnHostnameEntity($this, $data);
    }


    private $_cdn_space = null;

    // Canonical facade: $client->CdnSpace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cdn_space()
    // resolves here too.
    public function CdnSpace($data = null)
    {
        require_once __DIR__ . '/entity/cdn_space_entity.php';
        if ($data === null) {
            if ($this->_cdn_space === null) {
                $this->_cdn_space = new CdnSpaceEntity($this, null);
            }
            return $this->_cdn_space;
        }
        return new CdnSpaceEntity($this, $data);
    }


    private $_cdn_space_object = null;

    // Canonical facade: $client->CdnSpaceObject()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cdn_space_object()
    // resolves here too.
    public function CdnSpaceObject($data = null)
    {
        require_once __DIR__ . '/entity/cdn_space_object_entity.php';
        if ($data === null) {
            if ($this->_cdn_space_object === null) {
                $this->_cdn_space_object = new CdnSpaceObjectEntity($this, null);
            }
            return $this->_cdn_space_object;
        }
        return new CdnSpaceObjectEntity($this, $data);
    }


    private $_connection_request = null;

    // Canonical facade: $client->ConnectionRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->connection_request()
    // resolves here too.
    public function ConnectionRequest($data = null)
    {
        require_once __DIR__ . '/entity/connection_request_entity.php';
        if ($data === null) {
            if ($this->_connection_request === null) {
                $this->_connection_request = new ConnectionRequestEntity($this, null);
            }
            return $this->_connection_request;
        }
        return new ConnectionRequestEntity($this, $data);
    }


    private $_connection_source = null;

    // Canonical facade: $client->ConnectionSource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->connection_source()
    // resolves here too.
    public function ConnectionSource($data = null)
    {
        require_once __DIR__ . '/entity/connection_source_entity.php';
        if ($data === null) {
            if ($this->_connection_source === null) {
                $this->_connection_source = new ConnectionSourceEntity($this, null);
            }
            return $this->_connection_source;
        }
        return new ConnectionSourceEntity($this, $data);
    }


    private $_coordination_wait = null;

    // Canonical facade: $client->CoordinationWait()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->coordination_wait()
    // resolves here too.
    public function CoordinationWait($data = null)
    {
        require_once __DIR__ . '/entity/coordination_wait_entity.php';
        if ($data === null) {
            if ($this->_coordination_wait === null) {
                $this->_coordination_wait = new CoordinationWaitEntity($this, null);
            }
            return $this->_coordination_wait;
        }
        return new CoordinationWaitEntity($this, $data);
    }


    private $_credential_sign_in_check = null;

    // Canonical facade: $client->CredentialSignInCheck()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->credential_sign_in_check()
    // resolves here too.
    public function CredentialSignInCheck($data = null)
    {
        require_once __DIR__ . '/entity/credential_sign_in_check_entity.php';
        if ($data === null) {
            if ($this->_credential_sign_in_check === null) {
                $this->_credential_sign_in_check = new CredentialSignInCheckEntity($this, null);
            }
            return $this->_credential_sign_in_check;
        }
        return new CredentialSignInCheckEntity($this, $data);
    }


    private $_data_resource_rotate_credential = null;

    // Canonical facade: $client->DataResourceRotateCredential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->data_resource_rotate_credential()
    // resolves here too.
    public function DataResourceRotateCredential($data = null)
    {
        require_once __DIR__ . '/entity/data_resource_rotate_credential_entity.php';
        if ($data === null) {
            if ($this->_data_resource_rotate_credential === null) {
                $this->_data_resource_rotate_credential = new DataResourceRotateCredentialEntity($this, null);
            }
            return $this->_data_resource_rotate_credential;
        }
        return new DataResourceRotateCredentialEntity($this, $data);
    }


    private $_deep_scan = null;

    // Canonical facade: $client->DeepScan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deep_scan()
    // resolves here too.
    public function DeepScan($data = null)
    {
        require_once __DIR__ . '/entity/deep_scan_entity.php';
        if ($data === null) {
            if ($this->_deep_scan === null) {
                $this->_deep_scan = new DeepScanEntity($this, null);
            }
            return $this->_deep_scan;
        }
        return new DeepScanEntity($this, $data);
    }


    private $_deep_scan_finding = null;

    // Canonical facade: $client->DeepScanFinding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deep_scan_finding()
    // resolves here too.
    public function DeepScanFinding($data = null)
    {
        require_once __DIR__ . '/entity/deep_scan_finding_entity.php';
        if ($data === null) {
            if ($this->_deep_scan_finding === null) {
                $this->_deep_scan_finding = new DeepScanFindingEntity($this, null);
            }
            return $this->_deep_scan_finding;
        }
        return new DeepScanFindingEntity($this, $data);
    }


    private $_deep_scan_flow = null;

    // Canonical facade: $client->DeepScanFlow()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deep_scan_flow()
    // resolves here too.
    public function DeepScanFlow($data = null)
    {
        require_once __DIR__ . '/entity/deep_scan_flow_entity.php';
        if ($data === null) {
            if ($this->_deep_scan_flow === null) {
                $this->_deep_scan_flow = new DeepScanFlowEntity($this, null);
            }
            return $this->_deep_scan_flow;
        }
        return new DeepScanFlowEntity($this, $data);
    }


    private $_deep_scan_mapped_flow = null;

    // Canonical facade: $client->DeepScanMappedFlow()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deep_scan_mapped_flow()
    // resolves here too.
    public function DeepScanMappedFlow($data = null)
    {
        require_once __DIR__ . '/entity/deep_scan_mapped_flow_entity.php';
        if ($data === null) {
            if ($this->_deep_scan_mapped_flow === null) {
                $this->_deep_scan_mapped_flow = new DeepScanMappedFlowEntity($this, null);
            }
            return $this->_deep_scan_mapped_flow;
        }
        return new DeepScanMappedFlowEntity($this, $data);
    }


    private $_deep_scan_option = null;

    // Canonical facade: $client->DeepScanOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deep_scan_option()
    // resolves here too.
    public function DeepScanOption($data = null)
    {
        require_once __DIR__ . '/entity/deep_scan_option_entity.php';
        if ($data === null) {
            if ($this->_deep_scan_option === null) {
                $this->_deep_scan_option = new DeepScanOptionEntity($this, null);
            }
            return $this->_deep_scan_option;
        }
        return new DeepScanOptionEntity($this, $data);
    }


    private $_demo_share = null;

    // Canonical facade: $client->DemoShare()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->demo_share()
    // resolves here too.
    public function DemoShare($data = null)
    {
        require_once __DIR__ . '/entity/demo_share_entity.php';
        if ($data === null) {
            if ($this->_demo_share === null) {
                $this->_demo_share = new DemoShareEntity($this, null);
            }
            return $this->_demo_share;
        }
        return new DemoShareEntity($this, $data);
    }


    private $_demo_share_segment = null;

    // Canonical facade: $client->DemoShareSegment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->demo_share_segment()
    // resolves here too.
    public function DemoShareSegment($data = null)
    {
        require_once __DIR__ . '/entity/demo_share_segment_entity.php';
        if ($data === null) {
            if ($this->_demo_share_segment === null) {
                $this->_demo_share_segment = new DemoShareSegmentEntity($this, null);
            }
            return $this->_demo_share_segment;
        }
        return new DemoShareSegmentEntity($this, $data);
    }


    private $_deployment_dashboard_nomad = null;

    // Canonical facade: $client->DeploymentDashboardNomad()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_dashboard_nomad()
    // resolves here too.
    public function DeploymentDashboardNomad($data = null)
    {
        require_once __DIR__ . '/entity/deployment_dashboard_nomad_entity.php';
        if ($data === null) {
            if ($this->_deployment_dashboard_nomad === null) {
                $this->_deployment_dashboard_nomad = new DeploymentDashboardNomadEntity($this, null);
            }
            return $this->_deployment_dashboard_nomad;
        }
        return new DeploymentDashboardNomadEntity($this, $data);
    }


    private $_deployment_file = null;

    // Canonical facade: $client->DeploymentFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_file()
    // resolves here too.
    public function DeploymentFile($data = null)
    {
        require_once __DIR__ . '/entity/deployment_file_entity.php';
        if ($data === null) {
            if ($this->_deployment_file === null) {
                $this->_deployment_file = new DeploymentFileEntity($this, null);
            }
            return $this->_deployment_file;
        }
        return new DeploymentFileEntity($this, $data);
    }


    private $_domain_path_rule = null;

    // Canonical facade: $client->DomainPathRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_path_rule()
    // resolves here too.
    public function DomainPathRule($data = null)
    {
        require_once __DIR__ . '/entity/domain_path_rule_entity.php';
        if ($data === null) {
            if ($this->_domain_path_rule === null) {
                $this->_domain_path_rule = new DomainPathRuleEntity($this, null);
            }
            return $this->_domain_path_rule;
        }
        return new DomainPathRuleEntity($this, $data);
    }


    private $_dream = null;

    // Canonical facade: $client->Dream()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->dream()
    // resolves here too.
    public function Dream($data = null)
    {
        require_once __DIR__ . '/entity/dream_entity.php';
        if ($data === null) {
            if ($this->_dream === null) {
                $this->_dream = new DreamEntity($this, null);
            }
            return $this->_dream;
        }
        return new DreamEntity($this, $data);
    }


    private $_environment = null;

    // Canonical facade: $client->Environment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment()
    // resolves here too.
    public function Environment($data = null)
    {
        require_once __DIR__ . '/entity/environment_entity.php';
        if ($data === null) {
            if ($this->_environment === null) {
                $this->_environment = new EnvironmentEntity($this, null);
            }
            return $this->_environment;
        }
        return new EnvironmentEntity($this, $data);
    }


    private $_environment_discovery_run = null;

    // Canonical facade: $client->EnvironmentDiscoveryRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_discovery_run()
    // resolves here too.
    public function EnvironmentDiscoveryRun($data = null)
    {
        require_once __DIR__ . '/entity/environment_discovery_run_entity.php';
        if ($data === null) {
            if ($this->_environment_discovery_run === null) {
                $this->_environment_discovery_run = new EnvironmentDiscoveryRunEntity($this, null);
            }
            return $this->_environment_discovery_run;
        }
        return new EnvironmentDiscoveryRunEntity($this, $data);
    }


    private $_environment_exploration = null;

    // Canonical facade: $client->EnvironmentExploration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_exploration()
    // resolves here too.
    public function EnvironmentExploration($data = null)
    {
        require_once __DIR__ . '/entity/environment_exploration_entity.php';
        if ($data === null) {
            if ($this->_environment_exploration === null) {
                $this->_environment_exploration = new EnvironmentExplorationEntity($this, null);
            }
            return $this->_environment_exploration;
        }
        return new EnvironmentExplorationEntity($this, $data);
    }


    private $_environment_first_run = null;

    // Canonical facade: $client->EnvironmentFirstRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_first_run()
    // resolves here too.
    public function EnvironmentFirstRun($data = null)
    {
        require_once __DIR__ . '/entity/environment_first_run_entity.php';
        if ($data === null) {
            if ($this->_environment_first_run === null) {
                $this->_environment_first_run = new EnvironmentFirstRunEntity($this, null);
            }
            return $this->_environment_first_run;
        }
        return new EnvironmentFirstRunEntity($this, $data);
    }


    private $_environment_revision = null;

    // Canonical facade: $client->EnvironmentRevision()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_revision()
    // resolves here too.
    public function EnvironmentRevision($data = null)
    {
        require_once __DIR__ . '/entity/environment_revision_entity.php';
        if ($data === null) {
            if ($this->_environment_revision === null) {
                $this->_environment_revision = new EnvironmentRevisionEntity($this, null);
            }
            return $this->_environment_revision;
        }
        return new EnvironmentRevisionEntity($this, $data);
    }


    private $_environment_secret_binding = null;

    // Canonical facade: $client->EnvironmentSecretBinding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_secret_binding()
    // resolves here too.
    public function EnvironmentSecretBinding($data = null)
    {
        require_once __DIR__ . '/entity/environment_secret_binding_entity.php';
        if ($data === null) {
            if ($this->_environment_secret_binding === null) {
                $this->_environment_secret_binding = new EnvironmentSecretBindingEntity($this, null);
            }
            return $this->_environment_secret_binding;
        }
        return new EnvironmentSecretBindingEntity($this, $data);
    }


    private $_environment_test_account = null;

    // Canonical facade: $client->EnvironmentTestAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->environment_test_account()
    // resolves here too.
    public function EnvironmentTestAccount($data = null)
    {
        require_once __DIR__ . '/entity/environment_test_account_entity.php';
        if ($data === null) {
            if ($this->_environment_test_account === null) {
                $this->_environment_test_account = new EnvironmentTestAccountEntity($this, null);
            }
            return $this->_environment_test_account;
        }
        return new EnvironmentTestAccountEntity($this, $data);
    }


    private $_evidence = null;

    // Canonical facade: $client->Evidence()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->evidence()
    // resolves here too.
    public function Evidence($data = null)
    {
        require_once __DIR__ . '/entity/evidence_entity.php';
        if ($data === null) {
            if ($this->_evidence === null) {
                $this->_evidence = new EvidenceEntity($this, null);
            }
            return $this->_evidence;
        }
        return new EvidenceEntity($this, $data);
    }


    private $_exploration = null;

    // Canonical facade: $client->Exploration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->exploration()
    // resolves here too.
    public function Exploration($data = null)
    {
        require_once __DIR__ . '/entity/exploration_entity.php';
        if ($data === null) {
            if ($this->_exploration === null) {
                $this->_exploration = new ExplorationEntity($this, null);
            }
            return $this->_exploration;
        }
        return new ExplorationEntity($this, $data);
    }


    private $_exploration_message = null;

    // Canonical facade: $client->ExplorationMessage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->exploration_message()
    // resolves here too.
    public function ExplorationMessage($data = null)
    {
        require_once __DIR__ . '/entity/exploration_message_entity.php';
        if ($data === null) {
            if ($this->_exploration_message === null) {
                $this->_exploration_message = new ExplorationMessageEntity($this, null);
            }
            return $this->_exploration_message;
        }
        return new ExplorationMessageEntity($this, $data);
    }


    private $_exploration_report = null;

    // Canonical facade: $client->ExplorationReport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->exploration_report()
    // resolves here too.
    public function ExplorationReport($data = null)
    {
        require_once __DIR__ . '/entity/exploration_report_entity.php';
        if ($data === null) {
            if ($this->_exploration_report === null) {
                $this->_exploration_report = new ExplorationReportEntity($this, null);
            }
            return $this->_exploration_report;
        }
        return new ExplorationReportEntity($this, $data);
    }


    private $_exploration_scenario = null;

    // Canonical facade: $client->ExplorationScenario()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->exploration_scenario()
    // resolves here too.
    public function ExplorationScenario($data = null)
    {
        require_once __DIR__ . '/entity/exploration_scenario_entity.php';
        if ($data === null) {
            if ($this->_exploration_scenario === null) {
                $this->_exploration_scenario = new ExplorationScenarioEntity($this, null);
            }
            return $this->_exploration_scenario;
        }
        return new ExplorationScenarioEntity($this, $data);
    }


    private $_finding = null;

    // Canonical facade: $client->Finding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->finding()
    // resolves here too.
    public function Finding($data = null)
    {
        require_once __DIR__ . '/entity/finding_entity.php';
        if ($data === null) {
            if ($this->_finding === null) {
                $this->_finding = new FindingEntity($this, null);
            }
            return $this->_finding;
        }
        return new FindingEntity($this, $data);
    }


    private $_github_connection = null;

    // Canonical facade: $client->GithubConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_connection()
    // resolves here too.
    public function GithubConnection($data = null)
    {
        require_once __DIR__ . '/entity/github_connection_entity.php';
        if ($data === null) {
            if ($this->_github_connection === null) {
                $this->_github_connection = new GithubConnectionEntity($this, null);
            }
            return $this->_github_connection;
        }
        return new GithubConnectionEntity($this, $data);
    }


    private $_hosting_app_domain = null;

    // Canonical facade: $client->HostingAppDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hosting_app_domain()
    // resolves here too.
    public function HostingAppDomain($data = null)
    {
        require_once __DIR__ . '/entity/hosting_app_domain_entity.php';
        if ($data === null) {
            if ($this->_hosting_app_domain === null) {
                $this->_hosting_app_domain = new HostingAppDomainEntity($this, null);
            }
            return $this->_hosting_app_domain;
        }
        return new HostingAppDomainEntity($this, $data);
    }


    private $_image_repository = null;

    // Canonical facade: $client->ImageRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->image_repository()
    // resolves here too.
    public function ImageRepository($data = null)
    {
        require_once __DIR__ . '/entity/image_repository_entity.php';
        if ($data === null) {
            if ($this->_image_repository === null) {
                $this->_image_repository = new ImageRepositoryEntity($this, null);
            }
            return $this->_image_repository;
        }
        return new ImageRepositoryEntity($this, $data);
    }


    private $_integration = null;

    // Canonical facade: $client->Integration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->integration()
    // resolves here too.
    public function Integration($data = null)
    {
        require_once __DIR__ . '/entity/integration_entity.php';
        if ($data === null) {
            if ($this->_integration === null) {
                $this->_integration = new IntegrationEntity($this, null);
            }
            return $this->_integration;
        }
        return new IntegrationEntity($this, $data);
    }


    private $_interaction_response = null;

    // Canonical facade: $client->InteractionResponse()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->interaction_response()
    // resolves here too.
    public function InteractionResponse($data = null)
    {
        require_once __DIR__ . '/entity/interaction_response_entity.php';
        if ($data === null) {
            if ($this->_interaction_response === null) {
                $this->_interaction_response = new InteractionResponseEntity($this, null);
            }
            return $this->_interaction_response;
        }
        return new InteractionResponseEntity($this, $data);
    }


    private $_invitation = null;

    // Canonical facade: $client->Invitation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->invitation()
    // resolves here too.
    public function Invitation($data = null)
    {
        require_once __DIR__ . '/entity/invitation_entity.php';
        if ($data === null) {
            if ($this->_invitation === null) {
                $this->_invitation = new InvitationEntity($this, null);
            }
            return $this->_invitation;
        }
        return new InvitationEntity($this, $data);
    }


    private $_journey_variant_replay = null;

    // Canonical facade: $client->JourneyVariantReplay()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->journey_variant_replay()
    // resolves here too.
    public function JourneyVariantReplay($data = null)
    {
        require_once __DIR__ . '/entity/journey_variant_replay_entity.php';
        if ($data === null) {
            if ($this->_journey_variant_replay === null) {
                $this->_journey_variant_replay = new JourneyVariantReplayEntity($this, null);
            }
            return $this->_journey_variant_replay;
        }
        return new JourneyVariantReplayEntity($this, $data);
    }


    private $_knowledge = null;

    // Canonical facade: $client->Knowledge()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->knowledge()
    // resolves here too.
    public function Knowledge($data = null)
    {
        require_once __DIR__ . '/entity/knowledge_entity.php';
        if ($data === null) {
            if ($this->_knowledge === null) {
                $this->_knowledge = new KnowledgeEntity($this, null);
            }
            return $this->_knowledge;
        }
        return new KnowledgeEntity($this, $data);
    }


    private $_local_thread_delivery = null;

    // Canonical facade: $client->LocalThreadDelivery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->local_thread_delivery()
    // resolves here too.
    public function LocalThreadDelivery($data = null)
    {
        require_once __DIR__ . '/entity/local_thread_delivery_entity.php';
        if ($data === null) {
            if ($this->_local_thread_delivery === null) {
                $this->_local_thread_delivery = new LocalThreadDeliveryEntity($this, null);
            }
            return $this->_local_thread_delivery;
        }
        return new LocalThreadDeliveryEntity($this, $data);
    }


    private $_local_thread_operation = null;

    // Canonical facade: $client->LocalThreadOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->local_thread_operation()
    // resolves here too.
    public function LocalThreadOperation($data = null)
    {
        require_once __DIR__ . '/entity/local_thread_operation_entity.php';
        if ($data === null) {
            if ($this->_local_thread_operation === null) {
                $this->_local_thread_operation = new LocalThreadOperationEntity($this, null);
            }
            return $this->_local_thread_operation;
        }
        return new LocalThreadOperationEntity($this, $data);
    }


    private $_location = null;

    // Canonical facade: $client->Location()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->location()
    // resolves here too.
    public function Location($data = null)
    {
        require_once __DIR__ . '/entity/location_entity.php';
        if ($data === null) {
            if ($this->_location === null) {
                $this->_location = new LocationEntity($this, null);
            }
            return $this->_location;
        }
        return new LocationEntity($this, $data);
    }


    private $_me = null;

    // Canonical facade: $client->Me()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->me()
    // resolves here too.
    public function Me($data = null)
    {
        require_once __DIR__ . '/entity/me_entity.php';
        if ($data === null) {
            if ($this->_me === null) {
                $this->_me = new MeEntity($this, null);
            }
            return $this->_me;
        }
        return new MeEntity($this, $data);
    }


    private $_me_email = null;

    // Canonical facade: $client->MeEmail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->me_email()
    // resolves here too.
    public function MeEmail($data = null)
    {
        require_once __DIR__ . '/entity/me_email_entity.php';
        if ($data === null) {
            if ($this->_me_email === null) {
                $this->_me_email = new MeEmailEntity($this, null);
            }
            return $this->_me_email;
        }
        return new MeEmailEntity($this, $data);
    }


    private $_me_onboarding = null;

    // Canonical facade: $client->MeOnboarding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->me_onboarding()
    // resolves here too.
    public function MeOnboarding($data = null)
    {
        require_once __DIR__ . '/entity/me_onboarding_entity.php';
        if ($data === null) {
            if ($this->_me_onboarding === null) {
                $this->_me_onboarding = new MeOnboardingEntity($this, null);
            }
            return $this->_me_onboarding;
        }
        return new MeOnboardingEntity($this, $data);
    }


    private $_media_file = null;

    // Canonical facade: $client->MediaFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->media_file()
    // resolves here too.
    public function MediaFile($data = null)
    {
        require_once __DIR__ . '/entity/media_file_entity.php';
        if ($data === null) {
            if ($this->_media_file === null) {
                $this->_media_file = new MediaFileEntity($this, null);
            }
            return $this->_media_file;
        }
        return new MediaFileEntity($this, $data);
    }


    private $_member = null;

    // Canonical facade: $client->Member()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->member()
    // resolves here too.
    public function Member($data = null)
    {
        require_once __DIR__ . '/entity/member_entity.php';
        if ($data === null) {
            if ($this->_member === null) {
                $this->_member = new MemberEntity($this, null);
            }
            return $this->_member;
        }
        return new MemberEntity($this, $data);
    }


    private $_memory = null;

    // Canonical facade: $client->Memory()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->memory()
    // resolves here too.
    public function Memory($data = null)
    {
        require_once __DIR__ . '/entity/memory_entity.php';
        if ($data === null) {
            if ($this->_memory === null) {
                $this->_memory = new MemoryEntity($this, null);
            }
            return $this->_memory;
        }
        return new MemoryEntity($this, $data);
    }


    private $_merge_request = null;

    // Canonical facade: $client->MergeRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->merge_request()
    // resolves here too.
    public function MergeRequest($data = null)
    {
        require_once __DIR__ . '/entity/merge_request_entity.php';
        if ($data === null) {
            if ($this->_merge_request === null) {
                $this->_merge_request = new MergeRequestEntity($this, null);
            }
            return $this->_merge_request;
        }
        return new MergeRequestEntity($this, $data);
    }


    private $_messaging_conversation_message = null;

    // Canonical facade: $client->MessagingConversationMessage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->messaging_conversation_message()
    // resolves here too.
    public function MessagingConversationMessage($data = null)
    {
        require_once __DIR__ . '/entity/messaging_conversation_message_entity.php';
        if ($data === null) {
            if ($this->_messaging_conversation_message === null) {
                $this->_messaging_conversation_message = new MessagingConversationMessageEntity($this, null);
            }
            return $this->_messaging_conversation_message;
        }
        return new MessagingConversationMessageEntity($this, $data);
    }


    private $_messaging_conversation_upload = null;

    // Canonical facade: $client->MessagingConversationUpload()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->messaging_conversation_upload()
    // resolves here too.
    public function MessagingConversationUpload($data = null)
    {
        require_once __DIR__ . '/entity/messaging_conversation_upload_entity.php';
        if ($data === null) {
            if ($this->_messaging_conversation_upload === null) {
                $this->_messaging_conversation_upload = new MessagingConversationUploadEntity($this, null);
            }
            return $this->_messaging_conversation_upload;
        }
        return new MessagingConversationUploadEntity($this, $data);
    }


    private $_metric_query = null;

    // Canonical facade: $client->MetricQuery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->metric_query()
    // resolves here too.
    public function MetricQuery($data = null)
    {
        require_once __DIR__ . '/entity/metric_query_entity.php';
        if ($data === null) {
            if ($this->_metric_query === null) {
                $this->_metric_query = new MetricQueryEntity($this, null);
            }
            return $this->_metric_query;
        }
        return new MetricQueryEntity($this, $data);
    }


    private $_network_connection = null;

    // Canonical facade: $client->NetworkConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->network_connection()
    // resolves here too.
    public function NetworkConnection($data = null)
    {
        require_once __DIR__ . '/entity/network_connection_entity.php';
        if ($data === null) {
            if ($this->_network_connection === null) {
                $this->_network_connection = new NetworkConnectionEntity($this, null);
            }
            return $this->_network_connection;
        }
        return new NetworkConnectionEntity($this, $data);
    }


    private $_nomad_allocation = null;

    // Canonical facade: $client->NomadAllocation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nomad_allocation()
    // resolves here too.
    public function NomadAllocation($data = null)
    {
        require_once __DIR__ . '/entity/nomad_allocation_entity.php';
        if ($data === null) {
            if ($this->_nomad_allocation === null) {
                $this->_nomad_allocation = new NomadAllocationEntity($this, null);
            }
            return $this->_nomad_allocation;
        }
        return new NomadAllocationEntity($this, $data);
    }


    private $_nomad_log = null;

    // Canonical facade: $client->NomadLog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nomad_log()
    // resolves here too.
    public function NomadLog($data = null)
    {
        require_once __DIR__ . '/entity/nomad_log_entity.php';
        if ($data === null) {
            if ($this->_nomad_log === null) {
                $this->_nomad_log = new NomadLogEntity($this, null);
            }
            return $this->_nomad_log;
        }
        return new NomadLogEntity($this, $data);
    }


    private $_organization = null;

    // Canonical facade: $client->Organization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization()
    // resolves here too.
    public function Organization($data = null)
    {
        require_once __DIR__ . '/entity/organization_entity.php';
        if ($data === null) {
            if ($this->_organization === null) {
                $this->_organization = new OrganizationEntity($this, null);
            }
            return $this->_organization;
        }
        return new OrganizationEntity($this, $data);
    }


    private $_page = null;

    // Canonical facade: $client->Page()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page()
    // resolves here too.
    public function Page($data = null)
    {
        require_once __DIR__ . '/entity/page_entity.php';
        if ($data === null) {
            if ($this->_page === null) {
                $this->_page = new PageEntity($this, null);
            }
            return $this->_page;
        }
        return new PageEntity($this, $data);
    }


    private $_page_agent = null;

    // Canonical facade: $client->PageAgent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page_agent()
    // resolves here too.
    public function PageAgent($data = null)
    {
        require_once __DIR__ . '/entity/page_agent_entity.php';
        if ($data === null) {
            if ($this->_page_agent === null) {
                $this->_page_agent = new PageAgentEntity($this, null);
            }
            return $this->_page_agent;
        }
        return new PageAgentEntity($this, $data);
    }


    private $_page_project_run = null;

    // Canonical facade: $client->PageProjectRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page_project_run()
    // resolves here too.
    public function PageProjectRun($data = null)
    {
        require_once __DIR__ . '/entity/page_project_run_entity.php';
        if ($data === null) {
            if ($this->_page_project_run === null) {
                $this->_page_project_run = new PageProjectRunEntity($this, null);
            }
            return $this->_page_project_run;
        }
        return new PageProjectRunEntity($this, $data);
    }


    private $_pages_project_credential = null;

    // Canonical facade: $client->PagesProjectCredential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_project_credential()
    // resolves here too.
    public function PagesProjectCredential($data = null)
    {
        require_once __DIR__ . '/entity/pages_project_credential_entity.php';
        if ($data === null) {
            if ($this->_pages_project_credential === null) {
                $this->_pages_project_credential = new PagesProjectCredentialEntity($this, null);
            }
            return $this->_pages_project_credential;
        }
        return new PagesProjectCredentialEntity($this, $data);
    }


    private $_pages_project_persona = null;

    // Canonical facade: $client->PagesProjectPersona()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_project_persona()
    // resolves here too.
    public function PagesProjectPersona($data = null)
    {
        require_once __DIR__ . '/entity/pages_project_persona_entity.php';
        if ($data === null) {
            if ($this->_pages_project_persona === null) {
                $this->_pages_project_persona = new PagesProjectPersonaEntity($this, null);
            }
            return $this->_pages_project_persona;
        }
        return new PagesProjectPersonaEntity($this, $data);
    }


    private $_pages_project_run = null;

    // Canonical facade: $client->PagesProjectRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_project_run()
    // resolves here too.
    public function PagesProjectRun($data = null)
    {
        require_once __DIR__ . '/entity/pages_project_run_entity.php';
        if ($data === null) {
            if ($this->_pages_project_run === null) {
                $this->_pages_project_run = new PagesProjectRunEntity($this, null);
            }
            return $this->_pages_project_run;
        }
        return new PagesProjectRunEntity($this, $data);
    }


    private $_pages_project_scenario = null;

    // Canonical facade: $client->PagesProjectScenario()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_project_scenario()
    // resolves here too.
    public function PagesProjectScenario($data = null)
    {
        require_once __DIR__ . '/entity/pages_project_scenario_entity.php';
        if ($data === null) {
            if ($this->_pages_project_scenario === null) {
                $this->_pages_project_scenario = new PagesProjectScenarioEntity($this, null);
            }
            return $this->_pages_project_scenario;
        }
        return new PagesProjectScenarioEntity($this, $data);
    }


    private $_personal_access_token = null;

    // Canonical facade: $client->PersonalAccessToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->personal_access_token()
    // resolves here too.
    public function PersonalAccessToken($data = null)
    {
        require_once __DIR__ . '/entity/personal_access_token_entity.php';
        if ($data === null) {
            if ($this->_personal_access_token === null) {
                $this->_personal_access_token = new PersonalAccessTokenEntity($this, null);
            }
            return $this->_personal_access_token;
        }
        return new PersonalAccessTokenEntity($this, $data);
    }


    private $_preview_operation = null;

    // Canonical facade: $client->PreviewOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->preview_operation()
    // resolves here too.
    public function PreviewOperation($data = null)
    {
        require_once __DIR__ . '/entity/preview_operation_entity.php';
        if ($data === null) {
            if ($this->_preview_operation === null) {
                $this->_preview_operation = new PreviewOperationEntity($this, null);
            }
            return $this->_preview_operation;
        }
        return new PreviewOperationEntity($this, $data);
    }


    private $_preview_profile_secret_binding = null;

    // Canonical facade: $client->PreviewProfileSecretBinding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->preview_profile_secret_binding()
    // resolves here too.
    public function PreviewProfileSecretBinding($data = null)
    {
        require_once __DIR__ . '/entity/preview_profile_secret_binding_entity.php';
        if ($data === null) {
            if ($this->_preview_profile_secret_binding === null) {
                $this->_preview_profile_secret_binding = new PreviewProfileSecretBindingEntity($this, null);
            }
            return $this->_preview_profile_secret_binding;
        }
        return new PreviewProfileSecretBindingEntity($this, $data);
    }


    private $_preview_secret = null;

    // Canonical facade: $client->PreviewSecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->preview_secret()
    // resolves here too.
    public function PreviewSecret($data = null)
    {
        require_once __DIR__ . '/entity/preview_secret_entity.php';
        if ($data === null) {
            if ($this->_preview_secret === null) {
                $this->_preview_secret = new PreviewSecretEntity($this, null);
            }
            return $this->_preview_secret;
        }
        return new PreviewSecretEntity($this, $data);
    }


    private $_preview_sharing_approval = null;

    // Canonical facade: $client->PreviewSharingApproval()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->preview_sharing_approval()
    // resolves here too.
    public function PreviewSharingApproval($data = null)
    {
        require_once __DIR__ . '/entity/preview_sharing_approval_entity.php';
        if ($data === null) {
            if ($this->_preview_sharing_approval === null) {
                $this->_preview_sharing_approval = new PreviewSharingApprovalEntity($this, null);
            }
            return $this->_preview_sharing_approval;
        }
        return new PreviewSharingApprovalEntity($this, $data);
    }


    private $_product_map_identity_decision = null;

    // Canonical facade: $client->ProductMapIdentityDecision()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_identity_decision()
    // resolves here too.
    public function ProductMapIdentityDecision($data = null)
    {
        require_once __DIR__ . '/entity/product_map_identity_decision_entity.php';
        if ($data === null) {
            if ($this->_product_map_identity_decision === null) {
                $this->_product_map_identity_decision = new ProductMapIdentityDecisionEntity($this, null);
            }
            return $this->_product_map_identity_decision;
        }
        return new ProductMapIdentityDecisionEntity($this, $data);
    }


    private $_product_map_journey = null;

    // Canonical facade: $client->ProductMapJourney()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_journey()
    // resolves here too.
    public function ProductMapJourney($data = null)
    {
        require_once __DIR__ . '/entity/product_map_journey_entity.php';
        if ($data === null) {
            if ($this->_product_map_journey === null) {
                $this->_product_map_journey = new ProductMapJourneyEntity($this, null);
            }
            return $this->_product_map_journey;
        }
        return new ProductMapJourneyEntity($this, $data);
    }


    private $_product_map_journey_replay = null;

    // Canonical facade: $client->ProductMapJourneyReplay()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_journey_replay()
    // resolves here too.
    public function ProductMapJourneyReplay($data = null)
    {
        require_once __DIR__ . '/entity/product_map_journey_replay_entity.php';
        if ($data === null) {
            if ($this->_product_map_journey_replay === null) {
                $this->_product_map_journey_replay = new ProductMapJourneyReplayEntity($this, null);
            }
            return $this->_product_map_journey_replay;
        }
        return new ProductMapJourneyReplayEntity($this, $data);
    }


    private $_product_map_observation = null;

    // Canonical facade: $client->ProductMapObservation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_observation()
    // resolves here too.
    public function ProductMapObservation($data = null)
    {
        require_once __DIR__ . '/entity/product_map_observation_entity.php';
        if ($data === null) {
            if ($this->_product_map_observation === null) {
                $this->_product_map_observation = new ProductMapObservationEntity($this, null);
            }
            return $this->_product_map_observation;
        }
        return new ProductMapObservationEntity($this, $data);
    }


    private $_product_map_question = null;

    // Canonical facade: $client->ProductMapQuestion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_question()
    // resolves here too.
    public function ProductMapQuestion($data = null)
    {
        require_once __DIR__ . '/entity/product_map_question_entity.php';
        if ($data === null) {
            if ($this->_product_map_question === null) {
                $this->_product_map_question = new ProductMapQuestionEntity($this, null);
            }
            return $this->_product_map_question;
        }
        return new ProductMapQuestionEntity($this, $data);
    }


    private $_product_map_state = null;

    // Canonical facade: $client->ProductMapState()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product_map_state()
    // resolves here too.
    public function ProductMapState($data = null)
    {
        require_once __DIR__ . '/entity/product_map_state_entity.php';
        if ($data === null) {
            if ($this->_product_map_state === null) {
                $this->_product_map_state = new ProductMapStateEntity($this, null);
            }
            return $this->_product_map_state;
        }
        return new ProductMapStateEntity($this, $data);
    }


    private $_project = null;

    // Canonical facade: $client->Project()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project()
    // resolves here too.
    public function Project($data = null)
    {
        require_once __DIR__ . '/entity/project_entity.php';
        if ($data === null) {
            if ($this->_project === null) {
                $this->_project = new ProjectEntity($this, null);
            }
            return $this->_project;
        }
        return new ProjectEntity($this, $data);
    }


    private $_project_android_apk = null;

    // Canonical facade: $client->ProjectAndroidApk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_android_apk()
    // resolves here too.
    public function ProjectAndroidApk($data = null)
    {
        require_once __DIR__ . '/entity/project_android_apk_entity.php';
        if ($data === null) {
            if ($this->_project_android_apk === null) {
                $this->_project_android_apk = new ProjectAndroidApkEntity($this, null);
            }
            return $this->_project_android_apk;
        }
        return new ProjectAndroidApkEntity($this, $data);
    }


    private $_project_code_map = null;

    // Canonical facade: $client->ProjectCodeMap()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_code_map()
    // resolves here too.
    public function ProjectCodeMap($data = null)
    {
        require_once __DIR__ . '/entity/project_code_map_entity.php';
        if ($data === null) {
            if ($this->_project_code_map === null) {
                $this->_project_code_map = new ProjectCodeMapEntity($this, null);
            }
            return $this->_project_code_map;
        }
        return new ProjectCodeMapEntity($this, $data);
    }


    private $_project_environment = null;

    // Canonical facade: $client->ProjectEnvironment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_environment()
    // resolves here too.
    public function ProjectEnvironment($data = null)
    {
        require_once __DIR__ . '/entity/project_environment_entity.php';
        if ($data === null) {
            if ($this->_project_environment === null) {
                $this->_project_environment = new ProjectEnvironmentEntity($this, null);
            }
            return $this->_project_environment;
        }
        return new ProjectEnvironmentEntity($this, $data);
    }


    private $_project_finding = null;

    // Canonical facade: $client->ProjectFinding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_finding()
    // resolves here too.
    public function ProjectFinding($data = null)
    {
        require_once __DIR__ . '/entity/project_finding_entity.php';
        if ($data === null) {
            if ($this->_project_finding === null) {
                $this->_project_finding = new ProjectFindingEntity($this, null);
            }
            return $this->_project_finding;
        }
        return new ProjectFindingEntity($this, $data);
    }


    private $_project_fixture = null;

    // Canonical facade: $client->ProjectFixture()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_fixture()
    // resolves here too.
    public function ProjectFixture($data = null)
    {
        require_once __DIR__ . '/entity/project_fixture_entity.php';
        if ($data === null) {
            if ($this->_project_fixture === null) {
                $this->_project_fixture = new ProjectFixtureEntity($this, null);
            }
            return $this->_project_fixture;
        }
        return new ProjectFixtureEntity($this, $data);
    }


    private $_project_ios_app = null;

    // Canonical facade: $client->ProjectIosApp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_ios_app()
    // resolves here too.
    public function ProjectIosApp($data = null)
    {
        require_once __DIR__ . '/entity/project_ios_app_entity.php';
        if ($data === null) {
            if ($this->_project_ios_app === null) {
                $this->_project_ios_app = new ProjectIosAppEntity($this, null);
            }
            return $this->_project_ios_app;
        }
        return new ProjectIosAppEntity($this, $data);
    }


    private $_project_messaging_conversation = null;

    // Canonical facade: $client->ProjectMessagingConversation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_messaging_conversation()
    // resolves here too.
    public function ProjectMessagingConversation($data = null)
    {
        require_once __DIR__ . '/entity/project_messaging_conversation_entity.php';
        if ($data === null) {
            if ($this->_project_messaging_conversation === null) {
                $this->_project_messaging_conversation = new ProjectMessagingConversationEntity($this, null);
            }
            return $this->_project_messaging_conversation;
        }
        return new ProjectMessagingConversationEntity($this, $data);
    }


    private $_project_overview_metric = null;

    // Canonical facade: $client->ProjectOverviewMetric()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_overview_metric()
    // resolves here too.
    public function ProjectOverviewMetric($data = null)
    {
        require_once __DIR__ . '/entity/project_overview_metric_entity.php';
        if ($data === null) {
            if ($this->_project_overview_metric === null) {
                $this->_project_overview_metric = new ProjectOverviewMetricEntity($this, null);
            }
            return $this->_project_overview_metric;
        }
        return new ProjectOverviewMetricEntity($this, $data);
    }


    private $_project_overview_pull_request = null;

    // Canonical facade: $client->ProjectOverviewPullRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_overview_pull_request()
    // resolves here too.
    public function ProjectOverviewPullRequest($data = null)
    {
        require_once __DIR__ . '/entity/project_overview_pull_request_entity.php';
        if ($data === null) {
            if ($this->_project_overview_pull_request === null) {
                $this->_project_overview_pull_request = new ProjectOverviewPullRequestEntity($this, null);
            }
            return $this->_project_overview_pull_request;
        }
        return new ProjectOverviewPullRequestEntity($this, $data);
    }


    private $_project_product_map = null;

    // Canonical facade: $client->ProjectProductMap()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_product_map()
    // resolves here too.
    public function ProjectProductMap($data = null)
    {
        require_once __DIR__ . '/entity/project_product_map_entity.php';
        if ($data === null) {
            if ($this->_project_product_map === null) {
                $this->_project_product_map = new ProjectProductMapEntity($this, null);
            }
            return $this->_project_product_map;
        }
        return new ProjectProductMapEntity($this, $data);
    }


    private $_project_recording = null;

    // Canonical facade: $client->ProjectRecording()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_recording()
    // resolves here too.
    public function ProjectRecording($data = null)
    {
        require_once __DIR__ . '/entity/project_recording_entity.php';
        if ($data === null) {
            if ($this->_project_recording === null) {
                $this->_project_recording = new ProjectRecordingEntity($this, null);
            }
            return $this->_project_recording;
        }
        return new ProjectRecordingEntity($this, $data);
    }


    private $_project_run_plan = null;

    // Canonical facade: $client->ProjectRunPlan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_run_plan()
    // resolves here too.
    public function ProjectRunPlan($data = null)
    {
        require_once __DIR__ . '/entity/project_run_plan_entity.php';
        if ($data === null) {
            if ($this->_project_run_plan === null) {
                $this->_project_run_plan = new ProjectRunPlanEntity($this, null);
            }
            return $this->_project_run_plan;
        }
        return new ProjectRunPlanEntity($this, $data);
    }


    private $_project_run_schedule = null;

    // Canonical facade: $client->ProjectRunSchedule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_run_schedule()
    // resolves here too.
    public function ProjectRunSchedule($data = null)
    {
        require_once __DIR__ . '/entity/project_run_schedule_entity.php';
        if ($data === null) {
            if ($this->_project_run_schedule === null) {
                $this->_project_run_schedule = new ProjectRunScheduleEntity($this, null);
            }
            return $this->_project_run_schedule;
        }
        return new ProjectRunScheduleEntity($this, $data);
    }


    private $_project_scenario_option = null;

    // Canonical facade: $client->ProjectScenarioOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_scenario_option()
    // resolves here too.
    public function ProjectScenarioOption($data = null)
    {
        require_once __DIR__ . '/entity/project_scenario_option_entity.php';
        if ($data === null) {
            if ($this->_project_scenario_option === null) {
                $this->_project_scenario_option = new ProjectScenarioOptionEntity($this, null);
            }
            return $this->_project_scenario_option;
        }
        return new ProjectScenarioOptionEntity($this, $data);
    }


    private $_project_scenario_row = null;

    // Canonical facade: $client->ProjectScenarioRow()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_scenario_row()
    // resolves here too.
    public function ProjectScenarioRow($data = null)
    {
        require_once __DIR__ . '/entity/project_scenario_row_entity.php';
        if ($data === null) {
            if ($this->_project_scenario_row === null) {
                $this->_project_scenario_row = new ProjectScenarioRowEntity($this, null);
            }
            return $this->_project_scenario_row;
        }
        return new ProjectScenarioRowEntity($this, $data);
    }


    private $_project_setting = null;

    // Canonical facade: $client->ProjectSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->project_setting()
    // resolves here too.
    public function ProjectSetting($data = null)
    {
        require_once __DIR__ . '/entity/project_setting_entity.php';
        if ($data === null) {
            if ($this->_project_setting === null) {
                $this->_project_setting = new ProjectSettingEntity($this, null);
            }
            return $this->_project_setting;
        }
        return new ProjectSettingEntity($this, $data);
    }


    private $_pull_request = null;

    // Canonical facade: $client->PullRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request()
    // resolves here too.
    public function PullRequest($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_entity.php';
        if ($data === null) {
            if ($this->_pull_request === null) {
                $this->_pull_request = new PullRequestEntity($this, null);
            }
            return $this->_pull_request;
        }
        return new PullRequestEntity($this, $data);
    }


    private $_pull_request_setting = null;

    // Canonical facade: $client->PullRequestSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_setting()
    // resolves here too.
    public function PullRequestSetting($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_setting_entity.php';
        if ($data === null) {
            if ($this->_pull_request_setting === null) {
                $this->_pull_request_setting = new PullRequestSettingEntity($this, null);
            }
            return $this->_pull_request_setting;
        }
        return new PullRequestSettingEntity($this, $data);
    }


    private $_pull_request_setting_add_repository = null;

    // Canonical facade: $client->PullRequestSettingAddRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_setting_add_repository()
    // resolves here too.
    public function PullRequestSettingAddRepository($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_setting_add_repository_entity.php';
        if ($data === null) {
            if ($this->_pull_request_setting_add_repository === null) {
                $this->_pull_request_setting_add_repository = new PullRequestSettingAddRepositoryEntity($this, null);
            }
            return $this->_pull_request_setting_add_repository;
        }
        return new PullRequestSettingAddRepositoryEntity($this, $data);
    }


    private $_pull_request_setting_detect_comment = null;

    // Canonical facade: $client->PullRequestSettingDetectComment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_setting_detect_comment()
    // resolves here too.
    public function PullRequestSettingDetectComment($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_setting_detect_comment_entity.php';
        if ($data === null) {
            if ($this->_pull_request_setting_detect_comment === null) {
                $this->_pull_request_setting_detect_comment = new PullRequestSettingDetectCommentEntity($this, null);
            }
            return $this->_pull_request_setting_detect_comment;
        }
        return new PullRequestSettingDetectCommentEntity($this, $data);
    }


    private $_recorder = null;

    // Canonical facade: $client->Recorder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recorder()
    // resolves here too.
    public function Recorder($data = null)
    {
        require_once __DIR__ . '/entity/recorder_entity.php';
        if ($data === null) {
            if ($this->_recorder === null) {
                $this->_recorder = new RecorderEntity($this, null);
            }
            return $this->_recorder;
        }
        return new RecorderEntity($this, $data);
    }


    private $_registry = null;

    // Canonical facade: $client->Registry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->registry()
    // resolves here too.
    public function Registry($data = null)
    {
        require_once __DIR__ . '/entity/registry_entity.php';
        if ($data === null) {
            if ($this->_registry === null) {
                $this->_registry = new RegistryEntity($this, null);
            }
            return $this->_registry;
        }
        return new RegistryEntity($this, $data);
    }


    private $_registry_v2 = null;

    // Canonical facade: $client->RegistryV2()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->registry_v2()
    // resolves here too.
    public function RegistryV2($data = null)
    {
        require_once __DIR__ . '/entity/registry_v2_entity.php';
        if ($data === null) {
            if ($this->_registry_v2 === null) {
                $this->_registry_v2 = new RegistryV2Entity($this, null);
            }
            return $this->_registry_v2;
        }
        return new RegistryV2Entity($this, $data);
    }


    private $_relay_agent_local_thread = null;

    // Canonical facade: $client->RelayAgentLocalThread()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->relay_agent_local_thread()
    // resolves here too.
    public function RelayAgentLocalThread($data = null)
    {
        require_once __DIR__ . '/entity/relay_agent_local_thread_entity.php';
        if ($data === null) {
            if ($this->_relay_agent_local_thread === null) {
                $this->_relay_agent_local_thread = new RelayAgentLocalThreadEntity($this, null);
            }
            return $this->_relay_agent_local_thread;
        }
        return new RelayAgentLocalThreadEntity($this, $data);
    }


    private $_report_replay = null;

    // Canonical facade: $client->ReportReplay()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->report_replay()
    // resolves here too.
    public function ReportReplay($data = null)
    {
        require_once __DIR__ . '/entity/report_replay_entity.php';
        if ($data === null) {
            if ($this->_report_replay === null) {
                $this->_report_replay = new ReportReplayEntity($this, null);
            }
            return $this->_report_replay;
        }
        return new ReportReplayEntity($this, $data);
    }


    private $_report_scenario = null;

    // Canonical facade: $client->ReportScenario()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->report_scenario()
    // resolves here too.
    public function ReportScenario($data = null)
    {
        require_once __DIR__ . '/entity/report_scenario_entity.php';
        if ($data === null) {
            if ($this->_report_scenario === null) {
                $this->_report_scenario = new ReportScenarioEntity($this, null);
            }
            return $this->_report_scenario;
        }
        return new ReportScenarioEntity($this, $data);
    }


    private $_run_scenario_run = null;

    // Canonical facade: $client->RunScenarioRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_scenario_run()
    // resolves here too.
    public function RunScenarioRun($data = null)
    {
        require_once __DIR__ . '/entity/run_scenario_run_entity.php';
        if ($data === null) {
            if ($this->_run_scenario_run === null) {
                $this->_run_scenario_run = new RunScenarioRunEntity($this, null);
            }
            return $this->_run_scenario_run;
        }
        return new RunScenarioRunEntity($this, $data);
    }


    private $_run_schedule_option = null;

    // Canonical facade: $client->RunScheduleOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_schedule_option()
    // resolves here too.
    public function RunScheduleOption($data = null)
    {
        require_once __DIR__ . '/entity/run_schedule_option_entity.php';
        if ($data === null) {
            if ($this->_run_schedule_option === null) {
                $this->_run_schedule_option = new RunScheduleOptionEntity($this, null);
            }
            return $this->_run_schedule_option;
        }
        return new RunScheduleOptionEntity($this, $data);
    }


    private $_run_search = null;

    // Canonical facade: $client->RunSearch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_search()
    // resolves here too.
    public function RunSearch($data = null)
    {
        require_once __DIR__ . '/entity/run_search_entity.php';
        if ($data === null) {
            if ($this->_run_search === null) {
                $this->_run_search = new RunSearchEntity($this, null);
            }
            return $this->_run_search;
        }
        return new RunSearchEntity($this, $data);
    }


    private $_run_update = null;

    // Canonical facade: $client->RunUpdate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_update()
    // resolves here too.
    public function RunUpdate($data = null)
    {
        require_once __DIR__ . '/entity/run_update_entity.php';
        if ($data === null) {
            if ($this->_run_update === null) {
                $this->_run_update = new RunUpdateEntity($this, null);
            }
            return $this->_run_update;
        }
        return new RunUpdateEntity($this, $data);
    }


    private $_scenario_revision = null;

    // Canonical facade: $client->ScenarioRevision()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->scenario_revision()
    // resolves here too.
    public function ScenarioRevision($data = null)
    {
        require_once __DIR__ . '/entity/scenario_revision_entity.php';
        if ($data === null) {
            if ($this->_scenario_revision === null) {
                $this->_scenario_revision = new ScenarioRevisionEntity($this, null);
            }
            return $this->_scenario_revision;
        }
        return new ScenarioRevisionEntity($this, $data);
    }


    private $_scenario_run_lesson = null;

    // Canonical facade: $client->ScenarioRunLesson()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->scenario_run_lesson()
    // resolves here too.
    public function ScenarioRunLesson($data = null)
    {
        require_once __DIR__ . '/entity/scenario_run_lesson_entity.php';
        if ($data === null) {
            if ($this->_scenario_run_lesson === null) {
                $this->_scenario_run_lesson = new ScenarioRunLessonEntity($this, null);
            }
            return $this->_scenario_run_lesson;
        }
        return new ScenarioRunLessonEntity($this, $data);
    }


    private $_scenario_run_scenario_edit = null;

    // Canonical facade: $client->ScenarioRunScenarioEdit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->scenario_run_scenario_edit()
    // resolves here too.
    public function ScenarioRunScenarioEdit($data = null)
    {
        require_once __DIR__ . '/entity/scenario_run_scenario_edit_entity.php';
        if ($data === null) {
            if ($this->_scenario_run_scenario_edit === null) {
                $this->_scenario_run_scenario_edit = new ScenarioRunScenarioEditEntity($this, null);
            }
            return $this->_scenario_run_scenario_edit;
        }
        return new ScenarioRunScenarioEditEntity($this, $data);
    }


    private $_service_endpoint = null;

    // Canonical facade: $client->ServiceEndpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->service_endpoint()
    // resolves here too.
    public function ServiceEndpoint($data = null)
    {
        require_once __DIR__ . '/entity/service_endpoint_entity.php';
        if ($data === null) {
            if ($this->_service_endpoint === null) {
                $this->_service_endpoint = new ServiceEndpointEntity($this, null);
            }
            return $this->_service_endpoint;
        }
        return new ServiceEndpointEntity($this, $data);
    }


    private $_site_preview = null;

    // Canonical facade: $client->SitePreview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->site_preview()
    // resolves here too.
    public function SitePreview($data = null)
    {
        require_once __DIR__ . '/entity/site_preview_entity.php';
        if ($data === null) {
            if ($this->_site_preview === null) {
                $this->_site_preview = new SitePreviewEntity($this, null);
            }
            return $this->_site_preview;
        }
        return new SitePreviewEntity($this, $data);
    }


    private $_slack_channel = null;

    // Canonical facade: $client->SlackChannel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->slack_channel()
    // resolves here too.
    public function SlackChannel($data = null)
    {
        require_once __DIR__ . '/entity/slack_channel_entity.php';
        if ($data === null) {
            if ($this->_slack_channel === null) {
                $this->_slack_channel = new SlackChannelEntity($this, null);
            }
            return $this->_slack_channel;
        }
        return new SlackChannelEntity($this, $data);
    }


    private $_spark_agent_local_thread = null;

    // Canonical facade: $client->SparkAgentLocalThread()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_agent_local_thread()
    // resolves here too.
    public function SparkAgentLocalThread($data = null)
    {
        require_once __DIR__ . '/entity/spark_agent_local_thread_entity.php';
        if ($data === null) {
            if ($this->_spark_agent_local_thread === null) {
                $this->_spark_agent_local_thread = new SparkAgentLocalThreadEntity($this, null);
            }
            return $this->_spark_agent_local_thread;
        }
        return new SparkAgentLocalThreadEntity($this, $data);
    }


    private $_static_site = null;

    // Canonical facade: $client->StaticSite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->static_site()
    // resolves here too.
    public function StaticSite($data = null)
    {
        require_once __DIR__ . '/entity/static_site_entity.php';
        if ($data === null) {
            if ($this->_static_site === null) {
                $this->_static_site = new StaticSiteEntity($this, null);
            }
            return $this->_static_site;
        }
        return new StaticSiteEntity($this, $data);
    }


    private $_static_site_deployment = null;

    // Canonical facade: $client->StaticSiteDeployment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->static_site_deployment()
    // resolves here too.
    public function StaticSiteDeployment($data = null)
    {
        require_once __DIR__ . '/entity/static_site_deployment_entity.php';
        if ($data === null) {
            if ($this->_static_site_deployment === null) {
                $this->_static_site_deployment = new StaticSiteDeploymentEntity($this, null);
            }
            return $this->_static_site_deployment;
        }
        return new StaticSiteDeploymentEntity($this, $data);
    }


    private $_static_site_domain = null;

    // Canonical facade: $client->StaticSiteDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->static_site_domain()
    // resolves here too.
    public function StaticSiteDomain($data = null)
    {
        require_once __DIR__ . '/entity/static_site_domain_entity.php';
        if ($data === null) {
            if ($this->_static_site_domain === null) {
                $this->_static_site_domain = new StaticSiteDomainEntity($this, null);
            }
            return $this->_static_site_domain;
        }
        return new StaticSiteDomainEntity($this, $data);
    }


    private $_subscription_model = null;

    // Canonical facade: $client->SubscriptionModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->subscription_model()
    // resolves here too.
    public function SubscriptionModel($data = null)
    {
        require_once __DIR__ . '/entity/subscription_model_entity.php';
        if ($data === null) {
            if ($this->_subscription_model === null) {
                $this->_subscription_model = new SubscriptionModelEntity($this, null);
            }
            return $this->_subscription_model;
        }
        return new SubscriptionModelEntity($this, $data);
    }


    private $_thread_preview = null;

    // Canonical facade: $client->ThreadPreview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->thread_preview()
    // resolves here too.
    public function ThreadPreview($data = null)
    {
        require_once __DIR__ . '/entity/thread_preview_entity.php';
        if ($data === null) {
            if ($this->_thread_preview === null) {
                $this->_thread_preview = new ThreadPreviewEntity($this, null);
            }
            return $this->_thread_preview;
        }
        return new ThreadPreviewEntity($this, $data);
    }


    private $_verification_project_credential = null;

    // Canonical facade: $client->VerificationProjectCredential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verification_project_credential()
    // resolves here too.
    public function VerificationProjectCredential($data = null)
    {
        require_once __DIR__ . '/entity/verification_project_credential_entity.php';
        if ($data === null) {
            if ($this->_verification_project_credential === null) {
                $this->_verification_project_credential = new VerificationProjectCredentialEntity($this, null);
            }
            return $this->_verification_project_credential;
        }
        return new VerificationProjectCredentialEntity($this, $data);
    }


    private $_verification_project_persona = null;

    // Canonical facade: $client->VerificationProjectPersona()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verification_project_persona()
    // resolves here too.
    public function VerificationProjectPersona($data = null)
    {
        require_once __DIR__ . '/entity/verification_project_persona_entity.php';
        if ($data === null) {
            if ($this->_verification_project_persona === null) {
                $this->_verification_project_persona = new VerificationProjectPersonaEntity($this, null);
            }
            return $this->_verification_project_persona;
        }
        return new VerificationProjectPersonaEntity($this, $data);
    }


    private $_verification_project_run = null;

    // Canonical facade: $client->VerificationProjectRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verification_project_run()
    // resolves here too.
    public function VerificationProjectRun($data = null)
    {
        require_once __DIR__ . '/entity/verification_project_run_entity.php';
        if ($data === null) {
            if ($this->_verification_project_run === null) {
                $this->_verification_project_run = new VerificationProjectRunEntity($this, null);
            }
            return $this->_verification_project_run;
        }
        return new VerificationProjectRunEntity($this, $data);
    }


    private $_verification_project_scenario = null;

    // Canonical facade: $client->VerificationProjectScenario()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verification_project_scenario()
    // resolves here too.
    public function VerificationProjectScenario($data = null)
    {
        require_once __DIR__ . '/entity/verification_project_scenario_entity.php';
        if ($data === null) {
            if ($this->_verification_project_scenario === null) {
                $this->_verification_project_scenario = new VerificationProjectScenarioEntity($this, null);
            }
            return $this->_verification_project_scenario;
        }
        return new VerificationProjectScenarioEntity($this, $data);
    }


    private $_verify_app_domain = null;

    // Canonical facade: $client->VerifyAppDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verify_app_domain()
    // resolves here too.
    public function VerifyAppDomain($data = null)
    {
        require_once __DIR__ . '/entity/verify_app_domain_entity.php';
        if ($data === null) {
            if ($this->_verify_app_domain === null) {
                $this->_verify_app_domain = new VerifyAppDomainEntity($this, null);
            }
            return $this->_verify_app_domain;
        }
        return new VerifyAppDomainEntity($this, $data);
    }


    private $_verify_browser_session = null;

    // Canonical facade: $client->VerifyBrowserSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verify_browser_session()
    // resolves here too.
    public function VerifyBrowserSession($data = null)
    {
        require_once __DIR__ . '/entity/verify_browser_session_entity.php';
        if ($data === null) {
            if ($this->_verify_browser_session === null) {
                $this->_verify_browser_session = new VerifyBrowserSessionEntity($this, null);
            }
            return $this->_verify_browser_session;
        }
        return new VerifyBrowserSessionEntity($this, $data);
    }


    private $_verify_static_site_domain = null;

    // Canonical facade: $client->VerifyStaticSiteDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verify_static_site_domain()
    // resolves here too.
    public function VerifyStaticSiteDomain($data = null)
    {
        require_once __DIR__ . '/entity/verify_static_site_domain_entity.php';
        if ($data === null) {
            if ($this->_verify_static_site_domain === null) {
                $this->_verify_static_site_domain = new VerifyStaticSiteDomainEntity($this, null);
            }
            return $this->_verify_static_site_domain;
        }
        return new VerifyStaticSiteDomainEntity($this, $data);
    }


    private $_version_log = null;

    // Canonical facade: $client->VersionLog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->version_log()
    // resolves here too.
    public function VersionLog($data = null)
    {
        require_once __DIR__ . '/entity/version_log_entity.php';
        if ($data === null) {
            if ($this->_version_log === null) {
                $this->_version_log = new VersionLogEntity($this, null);
            }
            return $this->_version_log;
        }
        return new VersionLogEntity($this, $data);
    }


    private $_web_bot_auth = null;

    // Canonical facade: $client->WebBotAuth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->web_bot_auth()
    // resolves here too.
    public function WebBotAuth($data = null)
    {
        require_once __DIR__ . '/entity/web_bot_auth_entity.php';
        if ($data === null) {
            if ($this->_web_bot_auth === null) {
                $this->_web_bot_auth = new WebBotAuthEntity($this, null);
            }
            return $this->_web_bot_auth;
        }
        return new WebBotAuthEntity($this, $data);
    }


    private $_workflow_run_step = null;

    // Canonical facade: $client->WorkflowRunStep()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workflow_run_step()
    // resolves here too.
    public function WorkflowRunStep($data = null)
    {
        require_once __DIR__ . '/entity/workflow_run_step_entity.php';
        if ($data === null) {
            if ($this->_workflow_run_step === null) {
                $this->_workflow_run_step = new WorkflowRunStepEntity($this, null);
            }
            return $this->_workflow_run_step;
        }
        return new WorkflowRunStepEntity($this, $data);
    }


    private $_workflow_run_stop_notice = null;

    // Canonical facade: $client->WorkflowRunStopNotice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workflow_run_stop_notice()
    // resolves here too.
    public function WorkflowRunStopNotice($data = null)
    {
        require_once __DIR__ . '/entity/workflow_run_stop_notice_entity.php';
        if ($data === null) {
            if ($this->_workflow_run_stop_notice === null) {
                $this->_workflow_run_stop_notice = new WorkflowRunStopNoticeEntity($this, null);
            }
            return $this->_workflow_run_stop_notice;
        }
        return new WorkflowRunStopNoticeEntity($this, $data);
    }


    private $_workflow_trigger_skipped = null;

    // Canonical facade: $client->WorkflowTriggerSkipped()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workflow_trigger_skipped()
    // resolves here too.
    public function WorkflowTriggerSkipped($data = null)
    {
        require_once __DIR__ . '/entity/workflow_trigger_skipped_entity.php';
        if ($data === null) {
            if ($this->_workflow_trigger_skipped === null) {
                $this->_workflow_trigger_skipped = new WorkflowTriggerSkippedEntity($this, null);
            }
            return $this->_workflow_trigger_skipped;
        }
        return new WorkflowTriggerSkippedEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ComposalSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
