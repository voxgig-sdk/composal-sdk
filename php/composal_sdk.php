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


    private $_a2a_well_known = null;

    // Canonical facade: $client->A2aWellKnown()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->a2a_well_known()
    // resolves here too.
    public function A2aWellKnown($data = null)
    {
        require_once __DIR__ . '/entity/a2a_well_known_entity.php';
        if ($data === null) {
            if ($this->_a2a_well_known === null) {
                $this->_a2a_well_known = new A2aWellKnownEntity($this, null);
            }
            return $this->_a2a_well_known;
        }
        return new A2aWellKnownEntity($this, $data);
    }


    private $_admin_org = null;

    // Canonical facade: $client->AdminOrg()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->admin_org()
    // resolves here too.
    public function AdminOrg($data = null)
    {
        require_once __DIR__ . '/entity/admin_org_entity.php';
        if ($data === null) {
            if ($this->_admin_org === null) {
                $this->_admin_org = new AdminOrgEntity($this, null);
            }
            return $this->_admin_org;
        }
        return new AdminOrgEntity($this, $data);
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


    private $_agent_app = null;

    // Canonical facade: $client->AgentApp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_app()
    // resolves here too.
    public function AgentApp($data = null)
    {
        require_once __DIR__ . '/entity/agent_app_entity.php';
        if ($data === null) {
            if ($this->_agent_app === null) {
                $this->_agent_app = new AgentAppEntity($this, null);
            }
            return $this->_agent_app;
        }
        return new AgentAppEntity($this, $data);
    }


    private $_agent_app_install = null;

    // Canonical facade: $client->AgentAppInstall()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_app_install()
    // resolves here too.
    public function AgentAppInstall($data = null)
    {
        require_once __DIR__ . '/entity/agent_app_install_entity.php';
        if ($data === null) {
            if ($this->_agent_app_install === null) {
                $this->_agent_app_install = new AgentAppInstallEntity($this, null);
            }
            return $this->_agent_app_install;
        }
        return new AgentAppInstallEntity($this, $data);
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


    private $_agent_connection_delegation = null;

    // Canonical facade: $client->AgentConnectionDelegation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection_delegation()
    // resolves here too.
    public function AgentConnectionDelegation($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_delegation_entity.php';
        if ($data === null) {
            if ($this->_agent_connection_delegation === null) {
                $this->_agent_connection_delegation = new AgentConnectionDelegationEntity($this, null);
            }
            return $this->_agent_connection_delegation;
        }
        return new AgentConnectionDelegationEntity($this, $data);
    }


    private $_agent_connection_grant = null;

    // Canonical facade: $client->AgentConnectionGrant()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection_grant()
    // resolves here too.
    public function AgentConnectionGrant($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_grant_entity.php';
        if ($data === null) {
            if ($this->_agent_connection_grant === null) {
                $this->_agent_connection_grant = new AgentConnectionGrantEntity($this, null);
            }
            return $this->_agent_connection_grant;
        }
        return new AgentConnectionGrantEntity($this, $data);
    }


    private $_agent_connection_resource = null;

    // Canonical facade: $client->AgentConnectionResource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection_resource()
    // resolves here too.
    public function AgentConnectionResource($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_resource_entity.php';
        if ($data === null) {
            if ($this->_agent_connection_resource === null) {
                $this->_agent_connection_resource = new AgentConnectionResourceEntity($this, null);
            }
            return $this->_agent_connection_resource;
        }
        return new AgentConnectionResourceEntity($this, $data);
    }


    private $_agent_connection_safety_control = null;

    // Canonical facade: $client->AgentConnectionSafetyControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection_safety_control()
    // resolves here too.
    public function AgentConnectionSafetyControl($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_safety_control_entity.php';
        if ($data === null) {
            if ($this->_agent_connection_safety_control === null) {
                $this->_agent_connection_safety_control = new AgentConnectionSafetyControlEntity($this, null);
            }
            return $this->_agent_connection_safety_control;
        }
        return new AgentConnectionSafetyControlEntity($this, $data);
    }


    private $_agent_connection_trigger_subscription = null;

    // Canonical facade: $client->AgentConnectionTriggerSubscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_connection_trigger_subscription()
    // resolves here too.
    public function AgentConnectionTriggerSubscription($data = null)
    {
        require_once __DIR__ . '/entity/agent_connection_trigger_subscription_entity.php';
        if ($data === null) {
            if ($this->_agent_connection_trigger_subscription === null) {
                $this->_agent_connection_trigger_subscription = new AgentConnectionTriggerSubscriptionEntity($this, null);
            }
            return $this->_agent_connection_trigger_subscription;
        }
        return new AgentConnectionTriggerSubscriptionEntity($this, $data);
    }


    private $_agent_context_checkpoint = null;

    // Canonical facade: $client->AgentContextCheckpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_context_checkpoint()
    // resolves here too.
    public function AgentContextCheckpoint($data = null)
    {
        require_once __DIR__ . '/entity/agent_context_checkpoint_entity.php';
        if ($data === null) {
            if ($this->_agent_context_checkpoint === null) {
                $this->_agent_context_checkpoint = new AgentContextCheckpointEntity($this, null);
            }
            return $this->_agent_context_checkpoint;
        }
        return new AgentContextCheckpointEntity($this, $data);
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


    private $_agent_event = null;

    // Canonical facade: $client->AgentEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_event()
    // resolves here too.
    public function AgentEvent($data = null)
    {
        require_once __DIR__ . '/entity/agent_event_entity.php';
        if ($data === null) {
            if ($this->_agent_event === null) {
                $this->_agent_event = new AgentEventEntity($this, null);
            }
            return $this->_agent_event;
        }
        return new AgentEventEntity($this, $data);
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


    private $_agent_integration_account = null;

    // Canonical facade: $client->AgentIntegrationAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_integration_account()
    // resolves here too.
    public function AgentIntegrationAccount($data = null)
    {
        require_once __DIR__ . '/entity/agent_integration_account_entity.php';
        if ($data === null) {
            if ($this->_agent_integration_account === null) {
                $this->_agent_integration_account = new AgentIntegrationAccountEntity($this, null);
            }
            return $this->_agent_integration_account;
        }
        return new AgentIntegrationAccountEntity($this, $data);
    }


    private $_agent_integration_callback = null;

    // Canonical facade: $client->AgentIntegrationCallback()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_integration_callback()
    // resolves here too.
    public function AgentIntegrationCallback($data = null)
    {
        require_once __DIR__ . '/entity/agent_integration_callback_entity.php';
        if ($data === null) {
            if ($this->_agent_integration_callback === null) {
                $this->_agent_integration_callback = new AgentIntegrationCallbackEntity($this, null);
            }
            return $this->_agent_integration_callback;
        }
        return new AgentIntegrationCallbackEntity($this, $data);
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


    private $_agent_relay_file_grant = null;

    // Canonical facade: $client->AgentRelayFileGrant()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_relay_file_grant()
    // resolves here too.
    public function AgentRelayFileGrant($data = null)
    {
        require_once __DIR__ . '/entity/agent_relay_file_grant_entity.php';
        if ($data === null) {
            if ($this->_agent_relay_file_grant === null) {
                $this->_agent_relay_file_grant = new AgentRelayFileGrantEntity($this, null);
            }
            return $this->_agent_relay_file_grant;
        }
        return new AgentRelayFileGrantEntity($this, $data);
    }


    private $_agent_relay_file_grant_account = null;

    // Canonical facade: $client->AgentRelayFileGrantAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_relay_file_grant_account()
    // resolves here too.
    public function AgentRelayFileGrantAccount($data = null)
    {
        require_once __DIR__ . '/entity/agent_relay_file_grant_account_entity.php';
        if ($data === null) {
            if ($this->_agent_relay_file_grant_account === null) {
                $this->_agent_relay_file_grant_account = new AgentRelayFileGrantAccountEntity($this, null);
            }
            return $this->_agent_relay_file_grant_account;
        }
        return new AgentRelayFileGrantAccountEntity($this, $data);
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


    private $_agent_roder = null;

    // Canonical facade: $client->AgentRoder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_roder()
    // resolves here too.
    public function AgentRoder($data = null)
    {
        require_once __DIR__ . '/entity/agent_roder_entity.php';
        if ($data === null) {
            if ($this->_agent_roder === null) {
                $this->_agent_roder = new AgentRoderEntity($this, null);
            }
            return $this->_agent_roder;
        }
        return new AgentRoderEntity($this, $data);
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


    private $_agent_session = null;

    // Canonical facade: $client->AgentSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_session()
    // resolves here too.
    public function AgentSession($data = null)
    {
        require_once __DIR__ . '/entity/agent_session_entity.php';
        if ($data === null) {
            if ($this->_agent_session === null) {
                $this->_agent_session = new AgentSessionEntity($this, null);
            }
            return $this->_agent_session;
        }
        return new AgentSessionEntity($this, $data);
    }


    private $_agent_session_checkpoint = null;

    // Canonical facade: $client->AgentSessionCheckpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_session_checkpoint()
    // resolves here too.
    public function AgentSessionCheckpoint($data = null)
    {
        require_once __DIR__ . '/entity/agent_session_checkpoint_entity.php';
        if ($data === null) {
            if ($this->_agent_session_checkpoint === null) {
                $this->_agent_session_checkpoint = new AgentSessionCheckpointEntity($this, null);
            }
            return $this->_agent_session_checkpoint;
        }
        return new AgentSessionCheckpointEntity($this, $data);
    }


    private $_agent_session_roder_handoff = null;

    // Canonical facade: $client->AgentSessionRoderHandoff()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_session_roder_handoff()
    // resolves here too.
    public function AgentSessionRoderHandoff($data = null)
    {
        require_once __DIR__ . '/entity/agent_session_roder_handoff_entity.php';
        if ($data === null) {
            if ($this->_agent_session_roder_handoff === null) {
                $this->_agent_session_roder_handoff = new AgentSessionRoderHandoffEntity($this, null);
            }
            return $this->_agent_session_roder_handoff;
        }
        return new AgentSessionRoderHandoffEntity($this, $data);
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


    private $_agent_swarm = null;

    // Canonical facade: $client->AgentSwarm()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_swarm()
    // resolves here too.
    public function AgentSwarm($data = null)
    {
        require_once __DIR__ . '/entity/agent_swarm_entity.php';
        if ($data === null) {
            if ($this->_agent_swarm === null) {
                $this->_agent_swarm = new AgentSwarmEntity($this, null);
            }
            return $this->_agent_swarm;
        }
        return new AgentSwarmEntity($this, $data);
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


    private $_agent_usage = null;

    // Canonical facade: $client->AgentUsage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_usage()
    // resolves here too.
    public function AgentUsage($data = null)
    {
        require_once __DIR__ . '/entity/agent_usage_entity.php';
        if ($data === null) {
            if ($this->_agent_usage === null) {
                $this->_agent_usage = new AgentUsageEntity($this, null);
            }
            return $this->_agent_usage;
        }
        return new AgentUsageEntity($this, $data);
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


    private $_agent_web_preview = null;

    // Canonical facade: $client->AgentWebPreview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_web_preview()
    // resolves here too.
    public function AgentWebPreview($data = null)
    {
        require_once __DIR__ . '/entity/agent_web_preview_entity.php';
        if ($data === null) {
            if ($this->_agent_web_preview === null) {
                $this->_agent_web_preview = new AgentWebPreviewEntity($this, null);
            }
            return $this->_agent_web_preview;
        }
        return new AgentWebPreviewEntity($this, $data);
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


    private $_agreement = null;

    // Canonical facade: $client->Agreement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agreement()
    // resolves here too.
    public function Agreement($data = null)
    {
        require_once __DIR__ . '/entity/agreement_entity.php';
        if ($data === null) {
            if ($this->_agreement === null) {
                $this->_agreement = new AgreementEntity($this, null);
            }
            return $this->_agreement;
        }
        return new AgreementEntity($this, $data);
    }


    private $_agreement_access_request = null;

    // Canonical facade: $client->AgreementAccessRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agreement_access_request()
    // resolves here too.
    public function AgreementAccessRequest($data = null)
    {
        require_once __DIR__ . '/entity/agreement_access_request_entity.php';
        if ($data === null) {
            if ($this->_agreement_access_request === null) {
                $this->_agreement_access_request = new AgreementAccessRequestEntity($this, null);
            }
            return $this->_agreement_access_request;
        }
        return new AgreementAccessRequestEntity($this, $data);
    }


    private $_alert_rule_event = null;

    // Canonical facade: $client->AlertRuleEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->alert_rule_event()
    // resolves here too.
    public function AlertRuleEvent($data = null)
    {
        require_once __DIR__ . '/entity/alert_rule_event_entity.php';
        if ($data === null) {
            if ($this->_alert_rule_event === null) {
                $this->_alert_rule_event = new AlertRuleEventEntity($this, null);
            }
            return $this->_alert_rule_event;
        }
        return new AlertRuleEventEntity($this, $data);
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


    private $_app_access = null;

    // Canonical facade: $client->AppAccess()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_access()
    // resolves here too.
    public function AppAccess($data = null)
    {
        require_once __DIR__ . '/entity/app_access_entity.php';
        if ($data === null) {
            if ($this->_app_access === null) {
                $this->_app_access = new AppAccessEntity($this, null);
            }
            return $this->_app_access;
        }
        return new AppAccessEntity($this, $data);
    }


    private $_app_access_jwk = null;

    // Canonical facade: $client->AppAccessJwk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_access_jwk()
    // resolves here too.
    public function AppAccessJwk($data = null)
    {
        require_once __DIR__ . '/entity/app_access_jwk_entity.php';
        if ($data === null) {
            if ($this->_app_access_jwk === null) {
                $this->_app_access_jwk = new AppAccessJwkEntity($this, null);
            }
            return $this->_app_access_jwk;
        }
        return new AppAccessJwkEntity($this, $data);
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


    private $_artefact = null;

    // Canonical facade: $client->Artefact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artefact()
    // resolves here too.
    public function Artefact($data = null)
    {
        require_once __DIR__ . '/entity/artefact_entity.php';
        if ($data === null) {
            if ($this->_artefact === null) {
                $this->_artefact = new ArtefactEntity($this, null);
            }
            return $this->_artefact;
        }
        return new ArtefactEntity($this, $data);
    }


    private $_artefact_comment_thread = null;

    // Canonical facade: $client->ArtefactCommentThread()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artefact_comment_thread()
    // resolves here too.
    public function ArtefactCommentThread($data = null)
    {
        require_once __DIR__ . '/entity/artefact_comment_thread_entity.php';
        if ($data === null) {
            if ($this->_artefact_comment_thread === null) {
                $this->_artefact_comment_thread = new ArtefactCommentThreadEntity($this, null);
            }
            return $this->_artefact_comment_thread;
        }
        return new ArtefactCommentThreadEntity($this, $data);
    }


    private $_artefact_revision = null;

    // Canonical facade: $client->ArtefactRevision()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artefact_revision()
    // resolves here too.
    public function ArtefactRevision($data = null)
    {
        require_once __DIR__ . '/entity/artefact_revision_entity.php';
        if ($data === null) {
            if ($this->_artefact_revision === null) {
                $this->_artefact_revision = new ArtefactRevisionEntity($this, null);
            }
            return $this->_artefact_revision;
        }
        return new ArtefactRevisionEntity($this, $data);
    }


    private $_artefact_view_token = null;

    // Canonical facade: $client->ArtefactViewToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artefact_view_token()
    // resolves here too.
    public function ArtefactViewToken($data = null)
    {
        require_once __DIR__ . '/entity/artefact_view_token_entity.php';
        if ($data === null) {
            if ($this->_artefact_view_token === null) {
                $this->_artefact_view_token = new ArtefactViewTokenEntity($this, null);
            }
            return $this->_artefact_view_token;
        }
        return new ArtefactViewTokenEntity($this, $data);
    }


    private $_artifact = null;

    // Canonical facade: $client->Artifact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact()
    // resolves here too.
    public function Artifact($data = null)
    {
        require_once __DIR__ . '/entity/artifact_entity.php';
        if ($data === null) {
            if ($this->_artifact === null) {
                $this->_artifact = new ArtifactEntity($this, null);
            }
            return $this->_artifact;
        }
        return new ArtifactEntity($this, $data);
    }


    private $_artifact_cache_namespace = null;

    // Canonical facade: $client->ArtifactCacheNamespace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_cache_namespace()
    // resolves here too.
    public function ArtifactCacheNamespace($data = null)
    {
        require_once __DIR__ . '/entity/artifact_cache_namespace_entity.php';
        if ($data === null) {
            if ($this->_artifact_cache_namespace === null) {
                $this->_artifact_cache_namespace = new ArtifactCacheNamespaceEntity($this, null);
            }
            return $this->_artifact_cache_namespace;
        }
        return new ArtifactCacheNamespaceEntity($this, $data);
    }


    private $_artifact_image_repository = null;

    // Canonical facade: $client->ArtifactImageRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_image_repository()
    // resolves here too.
    public function ArtifactImageRepository($data = null)
    {
        require_once __DIR__ . '/entity/artifact_image_repository_entity.php';
        if ($data === null) {
            if ($this->_artifact_image_repository === null) {
                $this->_artifact_image_repository = new ArtifactImageRepositoryEntity($this, null);
            }
            return $this->_artifact_image_repository;
        }
        return new ArtifactImageRepositoryEntity($this, $data);
    }


    private $_artifact_package_mirror = null;

    // Canonical facade: $client->ArtifactPackageMirror()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_package_mirror()
    // resolves here too.
    public function ArtifactPackageMirror($data = null)
    {
        require_once __DIR__ . '/entity/artifact_package_mirror_entity.php';
        if ($data === null) {
            if ($this->_artifact_package_mirror === null) {
                $this->_artifact_package_mirror = new ArtifactPackageMirrorEntity($this, null);
            }
            return $this->_artifact_package_mirror;
        }
        return new ArtifactPackageMirrorEntity($this, $data);
    }


    private $_artifact_retention_policy = null;

    // Canonical facade: $client->ArtifactRetentionPolicy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_retention_policy()
    // resolves here too.
    public function ArtifactRetentionPolicy($data = null)
    {
        require_once __DIR__ . '/entity/artifact_retention_policy_entity.php';
        if ($data === null) {
            if ($this->_artifact_retention_policy === null) {
                $this->_artifact_retention_policy = new ArtifactRetentionPolicyEntity($this, null);
            }
            return $this->_artifact_retention_policy;
        }
        return new ArtifactRetentionPolicyEntity($this, $data);
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


    private $_audit_event = null;

    // Canonical facade: $client->AuditEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->audit_event()
    // resolves here too.
    public function AuditEvent($data = null)
    {
        require_once __DIR__ . '/entity/audit_event_entity.php';
        if ($data === null) {
            if ($this->_audit_event === null) {
                $this->_audit_event = new AuditEventEntity($this, null);
            }
            return $this->_audit_event;
        }
        return new AuditEventEntity($this, $data);
    }


    private $_auth = null;

    // Canonical facade: $client->Auth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth()
    // resolves here too.
    public function Auth($data = null)
    {
        require_once __DIR__ . '/entity/auth_entity.php';
        if ($data === null) {
            if ($this->_auth === null) {
                $this->_auth = new AuthEntity($this, null);
            }
            return $this->_auth;
        }
        return new AuthEntity($this, $data);
    }


    private $_auth_cli = null;

    // Canonical facade: $client->AuthCli()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_cli()
    // resolves here too.
    public function AuthCli($data = null)
    {
        require_once __DIR__ . '/entity/auth_cli_entity.php';
        if ($data === null) {
            if ($this->_auth_cli === null) {
                $this->_auth_cli = new AuthCliEntity($this, null);
            }
            return $this->_auth_cli;
        }
        return new AuthCliEntity($this, $data);
    }


    private $_auth_github = null;

    // Canonical facade: $client->AuthGithub()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_github()
    // resolves here too.
    public function AuthGithub($data = null)
    {
        require_once __DIR__ . '/entity/auth_github_entity.php';
        if ($data === null) {
            if ($this->_auth_github === null) {
                $this->_auth_github = new AuthGithubEntity($this, null);
            }
            return $this->_auth_github;
        }
        return new AuthGithubEntity($this, $data);
    }


    private $_auth_google = null;

    // Canonical facade: $client->AuthGoogle()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_google()
    // resolves here too.
    public function AuthGoogle($data = null)
    {
        require_once __DIR__ . '/entity/auth_google_entity.php';
        if ($data === null) {
            if ($this->_auth_google === null) {
                $this->_auth_google = new AuthGoogleEntity($this, null);
            }
            return $this->_auth_google;
        }
        return new AuthGoogleEntity($this, $data);
    }


    private $_auth_openai = null;

    // Canonical facade: $client->AuthOpenai()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_openai()
    // resolves here too.
    public function AuthOpenai($data = null)
    {
        require_once __DIR__ . '/entity/auth_openai_entity.php';
        if ($data === null) {
            if ($this->_auth_openai === null) {
                $this->_auth_openai = new AuthOpenaiEntity($this, null);
            }
            return $this->_auth_openai;
        }
        return new AuthOpenaiEntity($this, $data);
    }


    private $_auth_password_reset = null;

    // Canonical facade: $client->AuthPasswordReset()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_password_reset()
    // resolves here too.
    public function AuthPasswordReset($data = null)
    {
        require_once __DIR__ . '/entity/auth_password_reset_entity.php';
        if ($data === null) {
            if ($this->_auth_password_reset === null) {
                $this->_auth_password_reset = new AuthPasswordResetEntity($this, null);
            }
            return $this->_auth_password_reset;
        }
        return new AuthPasswordResetEntity($this, $data);
    }


    private $_auth_registration_option = null;

    // Canonical facade: $client->AuthRegistrationOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->auth_registration_option()
    // resolves here too.
    public function AuthRegistrationOption($data = null)
    {
        require_once __DIR__ . '/entity/auth_registration_option_entity.php';
        if ($data === null) {
            if ($this->_auth_registration_option === null) {
                $this->_auth_registration_option = new AuthRegistrationOptionEntity($this, null);
            }
            return $this->_auth_registration_option;
        }
        return new AuthRegistrationOptionEntity($this, $data);
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


    private $_backend_runner_pool = null;

    // Canonical facade: $client->BackendRunnerPool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->backend_runner_pool()
    // resolves here too.
    public function BackendRunnerPool($data = null)
    {
        require_once __DIR__ . '/entity/backend_runner_pool_entity.php';
        if ($data === null) {
            if ($this->_backend_runner_pool === null) {
                $this->_backend_runner_pool = new BackendRunnerPoolEntity($this, null);
            }
            return $this->_backend_runner_pool;
        }
        return new BackendRunnerPoolEntity($this, $data);
    }


    private $_bazel = null;

    // Canonical facade: $client->Bazel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel()
    // resolves here too.
    public function Bazel($data = null)
    {
        require_once __DIR__ . '/entity/bazel_entity.php';
        if ($data === null) {
            if ($this->_bazel === null) {
                $this->_bazel = new BazelEntity($this, null);
            }
            return $this->_bazel;
        }
        return new BazelEntity($this, $data);
    }


    private $_bazel_action_result = null;

    // Canonical facade: $client->BazelActionResult()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel_action_result()
    // resolves here too.
    public function BazelActionResult($data = null)
    {
        require_once __DIR__ . '/entity/bazel_action_result_entity.php';
        if ($data === null) {
            if ($this->_bazel_action_result === null) {
                $this->_bazel_action_result = new BazelActionResultEntity($this, null);
            }
            return $this->_bazel_action_result;
        }
        return new BazelActionResultEntity($this, $data);
    }


    private $_bazel_backend = null;

    // Canonical facade: $client->BazelBackend()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel_backend()
    // resolves here too.
    public function BazelBackend($data = null)
    {
        require_once __DIR__ . '/entity/bazel_backend_entity.php';
        if ($data === null) {
            if ($this->_bazel_backend === null) {
                $this->_bazel_backend = new BazelBackendEntity($this, null);
            }
            return $this->_bazel_backend;
        }
        return new BazelBackendEntity($this, $data);
    }


    private $_bazel_blob = null;

    // Canonical facade: $client->BazelBlob()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel_blob()
    // resolves here too.
    public function BazelBlob($data = null)
    {
        require_once __DIR__ . '/entity/bazel_blob_entity.php';
        if ($data === null) {
            if ($this->_bazel_blob === null) {
                $this->_bazel_blob = new BazelBlobEntity($this, null);
            }
            return $this->_bazel_blob;
        }
        return new BazelBlobEntity($this, $data);
    }


    private $_bazel_execution = null;

    // Canonical facade: $client->BazelExecution()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel_execution()
    // resolves here too.
    public function BazelExecution($data = null)
    {
        require_once __DIR__ . '/entity/bazel_execution_entity.php';
        if ($data === null) {
            if ($this->_bazel_execution === null) {
                $this->_bazel_execution = new BazelExecutionEntity($this, null);
            }
            return $this->_bazel_execution;
        }
        return new BazelExecutionEntity($this, $data);
    }


    private $_bazel_find_missing_blob = null;

    // Canonical facade: $client->BazelFindMissingBlob()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bazel_find_missing_blob()
    // resolves here too.
    public function BazelFindMissingBlob($data = null)
    {
        require_once __DIR__ . '/entity/bazel_find_missing_blob_entity.php';
        if ($data === null) {
            if ($this->_bazel_find_missing_blob === null) {
                $this->_bazel_find_missing_blob = new BazelFindMissingBlobEntity($this, null);
            }
            return $this->_bazel_find_missing_blob;
        }
        return new BazelFindMissingBlobEntity($this, $data);
    }


    private $_billing = null;

    // Canonical facade: $client->Billing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing()
    // resolves here too.
    public function Billing($data = null)
    {
        require_once __DIR__ . '/entity/billing_entity.php';
        if ($data === null) {
            if ($this->_billing === null) {
                $this->_billing = new BillingEntity($this, null);
            }
            return $this->_billing;
        }
        return new BillingEntity($this, $data);
    }


    private $_billing_addon = null;

    // Canonical facade: $client->BillingAddon()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_addon()
    // resolves here too.
    public function BillingAddon($data = null)
    {
        require_once __DIR__ . '/entity/billing_addon_entity.php';
        if ($data === null) {
            if ($this->_billing_addon === null) {
                $this->_billing_addon = new BillingAddonEntity($this, null);
            }
            return $this->_billing_addon;
        }
        return new BillingAddonEntity($this, $data);
    }


    private $_billing_checkout_session = null;

    // Canonical facade: $client->BillingCheckoutSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_checkout_session()
    // resolves here too.
    public function BillingCheckoutSession($data = null)
    {
        require_once __DIR__ . '/entity/billing_checkout_session_entity.php';
        if ($data === null) {
            if ($this->_billing_checkout_session === null) {
                $this->_billing_checkout_session = new BillingCheckoutSessionEntity($this, null);
            }
            return $this->_billing_checkout_session;
        }
        return new BillingCheckoutSessionEntity($this, $data);
    }


    private $_billing_invoice = null;

    // Canonical facade: $client->BillingInvoice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_invoice()
    // resolves here too.
    public function BillingInvoice($data = null)
    {
        require_once __DIR__ . '/entity/billing_invoice_entity.php';
        if ($data === null) {
            if ($this->_billing_invoice === null) {
                $this->_billing_invoice = new BillingInvoiceEntity($this, null);
            }
            return $this->_billing_invoice;
        }
        return new BillingInvoiceEntity($this, $data);
    }


    private $_billing_package = null;

    // Canonical facade: $client->BillingPackage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_package()
    // resolves here too.
    public function BillingPackage($data = null)
    {
        require_once __DIR__ . '/entity/billing_package_entity.php';
        if ($data === null) {
            if ($this->_billing_package === null) {
                $this->_billing_package = new BillingPackageEntity($this, null);
            }
            return $this->_billing_package;
        }
        return new BillingPackageEntity($this, $data);
    }


    private $_billing_portal_session = null;

    // Canonical facade: $client->BillingPortalSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_portal_session()
    // resolves here too.
    public function BillingPortalSession($data = null)
    {
        require_once __DIR__ . '/entity/billing_portal_session_entity.php';
        if ($data === null) {
            if ($this->_billing_portal_session === null) {
                $this->_billing_portal_session = new BillingPortalSessionEntity($this, null);
            }
            return $this->_billing_portal_session;
        }
        return new BillingPortalSessionEntity($this, $data);
    }


    private $_billing_prepaid_period = null;

    // Canonical facade: $client->BillingPrepaidPeriod()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_prepaid_period()
    // resolves here too.
    public function BillingPrepaidPeriod($data = null)
    {
        require_once __DIR__ . '/entity/billing_prepaid_period_entity.php';
        if ($data === null) {
            if ($this->_billing_prepaid_period === null) {
                $this->_billing_prepaid_period = new BillingPrepaidPeriodEntity($this, null);
            }
            return $this->_billing_prepaid_period;
        }
        return new BillingPrepaidPeriodEntity($this, $data);
    }


    private $_billing_prepaid_purchase = null;

    // Canonical facade: $client->BillingPrepaidPurchase()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_prepaid_purchase()
    // resolves here too.
    public function BillingPrepaidPurchase($data = null)
    {
        require_once __DIR__ . '/entity/billing_prepaid_purchase_entity.php';
        if ($data === null) {
            if ($this->_billing_prepaid_purchase === null) {
                $this->_billing_prepaid_purchase = new BillingPrepaidPurchaseEntity($this, null);
            }
            return $this->_billing_prepaid_purchase;
        }
        return new BillingPrepaidPurchaseEntity($this, $data);
    }


    private $_billing_token_top_up = null;

    // Canonical facade: $client->BillingTokenTopUp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_token_top_up()
    // resolves here too.
    public function BillingTokenTopUp($data = null)
    {
        require_once __DIR__ . '/entity/billing_token_top_up_entity.php';
        if ($data === null) {
            if ($this->_billing_token_top_up === null) {
                $this->_billing_token_top_up = new BillingTokenTopUpEntity($this, null);
            }
            return $this->_billing_token_top_up;
        }
        return new BillingTokenTopUpEntity($this, $data);
    }


    private $_billing_usage = null;

    // Canonical facade: $client->BillingUsage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_usage()
    // resolves here too.
    public function BillingUsage($data = null)
    {
        require_once __DIR__ . '/entity/billing_usage_entity.php';
        if ($data === null) {
            if ($this->_billing_usage === null) {
                $this->_billing_usage = new BillingUsageEntity($this, null);
            }
            return $this->_billing_usage;
        }
        return new BillingUsageEntity($this, $data);
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


    private $_bookmark_protection_refresh_github_required_check = null;

    // Canonical facade: $client->BookmarkProtectionRefreshGithubRequiredCheck()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bookmark_protection_refresh_github_required_check()
    // resolves here too.
    public function BookmarkProtectionRefreshGithubRequiredCheck($data = null)
    {
        require_once __DIR__ . '/entity/bookmark_protection_refresh_github_required_check_entity.php';
        if ($data === null) {
            if ($this->_bookmark_protection_refresh_github_required_check === null) {
                $this->_bookmark_protection_refresh_github_required_check = new BookmarkProtectionRefreshGithubRequiredCheckEntity($this, null);
            }
            return $this->_bookmark_protection_refresh_github_required_check;
        }
        return new BookmarkProtectionRefreshGithubRequiredCheckEntity($this, $data);
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


    private $_cache_namespace_entry = null;

    // Canonical facade: $client->CacheNamespaceEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cache_namespace_entry()
    // resolves here too.
    public function CacheNamespaceEntry($data = null)
    {
        require_once __DIR__ . '/entity/cache_namespace_entry_entity.php';
        if ($data === null) {
            if ($this->_cache_namespace_entry === null) {
                $this->_cache_namespace_entry = new CacheNamespaceEntryEntity($this, null);
            }
            return $this->_cache_namespace_entry;
        }
        return new CacheNamespaceEntryEntity($this, $data);
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


    private $_change = null;

    // Canonical facade: $client->Change()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change()
    // resolves here too.
    public function Change($data = null)
    {
        require_once __DIR__ . '/entity/change_entity.php';
        if ($data === null) {
            if ($this->_change === null) {
                $this->_change = new ChangeEntity($this, null);
            }
            return $this->_change;
        }
        return new ChangeEntity($this, $data);
    }


    private $_change_asset = null;

    // Canonical facade: $client->ChangeAsset()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_asset()
    // resolves here too.
    public function ChangeAsset($data = null)
    {
        require_once __DIR__ . '/entity/change_asset_entity.php';
        if ($data === null) {
            if ($this->_change_asset === null) {
                $this->_change_asset = new ChangeAssetEntity($this, null);
            }
            return $this->_change_asset;
        }
        return new ChangeAssetEntity($this, $data);
    }


    private $_change_comment = null;

    // Canonical facade: $client->ChangeComment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_comment()
    // resolves here too.
    public function ChangeComment($data = null)
    {
        require_once __DIR__ . '/entity/change_comment_entity.php';
        if ($data === null) {
            if ($this->_change_comment === null) {
                $this->_change_comment = new ChangeCommentEntity($this, null);
            }
            return $this->_change_comment;
        }
        return new ChangeCommentEntity($this, $data);
    }


    private $_change_file_review_checkpoint = null;

    // Canonical facade: $client->ChangeFileReviewCheckpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_file_review_checkpoint()
    // resolves here too.
    public function ChangeFileReviewCheckpoint($data = null)
    {
        require_once __DIR__ . '/entity/change_file_review_checkpoint_entity.php';
        if ($data === null) {
            if ($this->_change_file_review_checkpoint === null) {
                $this->_change_file_review_checkpoint = new ChangeFileReviewCheckpointEntity($this, null);
            }
            return $this->_change_file_review_checkpoint;
        }
        return new ChangeFileReviewCheckpointEntity($this, $data);
    }


    private $_change_git_branch_submission = null;

    // Canonical facade: $client->ChangeGitBranchSubmission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_git_branch_submission()
    // resolves here too.
    public function ChangeGitBranchSubmission($data = null)
    {
        require_once __DIR__ . '/entity/change_git_branch_submission_entity.php';
        if ($data === null) {
            if ($this->_change_git_branch_submission === null) {
                $this->_change_git_branch_submission = new ChangeGitBranchSubmissionEntity($this, null);
            }
            return $this->_change_git_branch_submission;
        }
        return new ChangeGitBranchSubmissionEntity($this, $data);
    }


    private $_change_git_commit_identity = null;

    // Canonical facade: $client->ChangeGitCommitIdentity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_git_commit_identity()
    // resolves here too.
    public function ChangeGitCommitIdentity($data = null)
    {
        require_once __DIR__ . '/entity/change_git_commit_identity_entity.php';
        if ($data === null) {
            if ($this->_change_git_commit_identity === null) {
                $this->_change_git_commit_identity = new ChangeGitCommitIdentityEntity($this, null);
            }
            return $this->_change_git_commit_identity;
        }
        return new ChangeGitCommitIdentityEntity($this, $data);
    }


    private $_change_git_publication = null;

    // Canonical facade: $client->ChangeGitPublication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_git_publication()
    // resolves here too.
    public function ChangeGitPublication($data = null)
    {
        require_once __DIR__ . '/entity/change_git_publication_entity.php';
        if ($data === null) {
            if ($this->_change_git_publication === null) {
                $this->_change_git_publication = new ChangeGitPublicationEntity($this, null);
            }
            return $this->_change_git_publication;
        }
        return new ChangeGitPublicationEntity($this, $data);
    }


    private $_change_group_member = null;

    // Canonical facade: $client->ChangeGroupMember()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_group_member()
    // resolves here too.
    public function ChangeGroupMember($data = null)
    {
        require_once __DIR__ . '/entity/change_group_member_entity.php';
        if ($data === null) {
            if ($this->_change_group_member === null) {
                $this->_change_group_member = new ChangeGroupMemberEntity($this, null);
            }
            return $this->_change_group_member;
        }
        return new ChangeGroupMemberEntity($this, $data);
    }


    private $_change_label = null;

    // Canonical facade: $client->ChangeLabel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_label()
    // resolves here too.
    public function ChangeLabel($data = null)
    {
        require_once __DIR__ . '/entity/change_label_entity.php';
        if ($data === null) {
            if ($this->_change_label === null) {
                $this->_change_label = new ChangeLabelEntity($this, null);
            }
            return $this->_change_label;
        }
        return new ChangeLabelEntity($this, $data);
    }


    private $_change_landing_hold = null;

    // Canonical facade: $client->ChangeLandingHold()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_landing_hold()
    // resolves here too.
    public function ChangeLandingHold($data = null)
    {
        require_once __DIR__ . '/entity/change_landing_hold_entity.php';
        if ($data === null) {
            if ($this->_change_landing_hold === null) {
                $this->_change_landing_hold = new ChangeLandingHoldEntity($this, null);
            }
            return $this->_change_landing_hold;
        }
        return new ChangeLandingHoldEntity($this, $data);
    }


    private $_change_landing_request = null;

    // Canonical facade: $client->ChangeLandingRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_landing_request()
    // resolves here too.
    public function ChangeLandingRequest($data = null)
    {
        require_once __DIR__ . '/entity/change_landing_request_entity.php';
        if ($data === null) {
            if ($this->_change_landing_request === null) {
                $this->_change_landing_request = new ChangeLandingRequestEntity($this, null);
            }
            return $this->_change_landing_request;
        }
        return new ChangeLandingRequestEntity($this, $data);
    }


    private $_change_request_change = null;

    // Canonical facade: $client->ChangeRequestChange()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_request_change()
    // resolves here too.
    public function ChangeRequestChange($data = null)
    {
        require_once __DIR__ . '/entity/change_request_change_entity.php';
        if ($data === null) {
            if ($this->_change_request_change === null) {
                $this->_change_request_change = new ChangeRequestChangeEntity($this, null);
            }
            return $this->_change_request_change;
        }
        return new ChangeRequestChangeEntity($this, $data);
    }


    private $_change_reviewer = null;

    // Canonical facade: $client->ChangeReviewer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_reviewer()
    // resolves here too.
    public function ChangeReviewer($data = null)
    {
        require_once __DIR__ . '/entity/change_reviewer_entity.php';
        if ($data === null) {
            if ($this->_change_reviewer === null) {
                $this->_change_reviewer = new ChangeReviewerEntity($this, null);
            }
            return $this->_change_reviewer;
        }
        return new ChangeReviewerEntity($this, $data);
    }


    private $_change_transcript = null;

    // Canonical facade: $client->ChangeTranscript()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_transcript()
    // resolves here too.
    public function ChangeTranscript($data = null)
    {
        require_once __DIR__ . '/entity/change_transcript_entity.php';
        if ($data === null) {
            if ($this->_change_transcript === null) {
                $this->_change_transcript = new ChangeTranscriptEntity($this, null);
            }
            return $this->_change_transcript;
        }
        return new ChangeTranscriptEntity($this, $data);
    }


    private $_change_transcript_summary = null;

    // Canonical facade: $client->ChangeTranscriptSummary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->change_transcript_summary()
    // resolves here too.
    public function ChangeTranscriptSummary($data = null)
    {
        require_once __DIR__ . '/entity/change_transcript_summary_entity.php';
        if ($data === null) {
            if ($this->_change_transcript_summary === null) {
                $this->_change_transcript_summary = new ChangeTranscriptSummaryEntity($this, null);
            }
            return $this->_change_transcript_summary;
        }
        return new ChangeTranscriptSummaryEntity($this, $data);
    }


    private $_checkpoint_prepare_chunk = null;

    // Canonical facade: $client->CheckpointPrepareChunk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->checkpoint_prepare_chunk()
    // resolves here too.
    public function CheckpointPrepareChunk($data = null)
    {
        require_once __DIR__ . '/entity/checkpoint_prepare_chunk_entity.php';
        if ($data === null) {
            if ($this->_checkpoint_prepare_chunk === null) {
                $this->_checkpoint_prepare_chunk = new CheckpointPrepareChunkEntity($this, null);
            }
            return $this->_checkpoint_prepare_chunk;
        }
        return new CheckpointPrepareChunkEntity($this, $data);
    }


    private $_ci_node = null;

    // Canonical facade: $client->CiNode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ci_node()
    // resolves here too.
    public function CiNode($data = null)
    {
        require_once __DIR__ . '/entity/ci_node_entity.php';
        if ($data === null) {
            if ($this->_ci_node === null) {
                $this->_ci_node = new CiNodeEntity($this, null);
            }
            return $this->_ci_node;
        }
        return new CiNodeEntity($this, $data);
    }


    private $_ci_pipeline = null;

    // Canonical facade: $client->CiPipeline()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ci_pipeline()
    // resolves here too.
    public function CiPipeline($data = null)
    {
        require_once __DIR__ . '/entity/ci_pipeline_entity.php';
        if ($data === null) {
            if ($this->_ci_pipeline === null) {
                $this->_ci_pipeline = new CiPipelineEntity($this, null);
            }
            return $this->_ci_pipeline;
        }
        return new CiPipelineEntity($this, $data);
    }


    private $_ci_pipeline_run = null;

    // Canonical facade: $client->CiPipelineRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ci_pipeline_run()
    // resolves here too.
    public function CiPipelineRun($data = null)
    {
        require_once __DIR__ . '/entity/ci_pipeline_run_entity.php';
        if ($data === null) {
            if ($this->_ci_pipeline_run === null) {
                $this->_ci_pipeline_run = new CiPipelineRunEntity($this, null);
            }
            return $this->_ci_pipeline_run;
        }
        return new CiPipelineRunEntity($this, $data);
    }


    private $_ci_runner_pool = null;

    // Canonical facade: $client->CiRunnerPool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ci_runner_pool()
    // resolves here too.
    public function CiRunnerPool($data = null)
    {
        require_once __DIR__ . '/entity/ci_runner_pool_entity.php';
        if ($data === null) {
            if ($this->_ci_runner_pool === null) {
                $this->_ci_runner_pool = new CiRunnerPoolEntity($this, null);
            }
            return $this->_ci_runner_pool;
        }
        return new CiRunnerPoolEntity($this, $data);
    }


    private $_ci_status = null;

    // Canonical facade: $client->CiStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ci_status()
    // resolves here too.
    public function CiStatus($data = null)
    {
        require_once __DIR__ . '/entity/ci_status_entity.php';
        if ($data === null) {
            if ($this->_ci_status === null) {
                $this->_ci_status = new CiStatusEntity($this, null);
            }
            return $this->_ci_status;
        }
        return new CiStatusEntity($this, $data);
    }


    private $_cli_event = null;

    // Canonical facade: $client->CliEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cli_event()
    // resolves here too.
    public function CliEvent($data = null)
    {
        require_once __DIR__ . '/entity/cli_event_entity.php';
        if ($data === null) {
            if ($this->_cli_event === null) {
                $this->_cli_event = new CliEventEntity($this, null);
            }
            return $this->_cli_event;
        }
        return new CliEventEntity($this, $data);
    }


    private $_cli_release = null;

    // Canonical facade: $client->CliRelease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cli_release()
    // resolves here too.
    public function CliRelease($data = null)
    {
        require_once __DIR__ . '/entity/cli_release_entity.php';
        if ($data === null) {
            if ($this->_cli_release === null) {
                $this->_cli_release = new CliReleaseEntity($this, null);
            }
            return $this->_cli_release;
        }
        return new CliReleaseEntity($this, $data);
    }


    private $_cloud_workspace_backup_object = null;

    // Canonical facade: $client->CloudWorkspaceBackupObject()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cloud_workspace_backup_object()
    // resolves here too.
    public function CloudWorkspaceBackupObject($data = null)
    {
        require_once __DIR__ . '/entity/cloud_workspace_backup_object_entity.php';
        if ($data === null) {
            if ($this->_cloud_workspace_backup_object === null) {
                $this->_cloud_workspace_backup_object = new CloudWorkspaceBackupObjectEntity($this, null);
            }
            return $this->_cloud_workspace_backup_object;
        }
        return new CloudWorkspaceBackupObjectEntity($this, $data);
    }


    private $_code_rule_evaluation = null;

    // Canonical facade: $client->CodeRuleEvaluation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->code_rule_evaluation()
    // resolves here too.
    public function CodeRuleEvaluation($data = null)
    {
        require_once __DIR__ . '/entity/code_rule_evaluation_entity.php';
        if ($data === null) {
            if ($this->_code_rule_evaluation === null) {
                $this->_code_rule_evaluation = new CodeRuleEvaluationEntity($this, null);
            }
            return $this->_code_rule_evaluation;
        }
        return new CodeRuleEvaluationEntity($this, $data);
    }


    private $_com_site_access = null;

    // Canonical facade: $client->ComSiteAccess()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->com_site_access()
    // resolves here too.
    public function ComSiteAccess($data = null)
    {
        require_once __DIR__ . '/entity/com_site_access_entity.php';
        if ($data === null) {
            if ($this->_com_site_access === null) {
                $this->_com_site_access = new ComSiteAccessEntity($this, null);
            }
            return $this->_com_site_access;
        }
        return new ComSiteAccessEntity($this, $data);
    }


    private $_com_site_access_session = null;

    // Canonical facade: $client->ComSiteAccessSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->com_site_access_session()
    // resolves here too.
    public function ComSiteAccessSession($data = null)
    {
        require_once __DIR__ . '/entity/com_site_access_session_entity.php';
        if ($data === null) {
            if ($this->_com_site_access_session === null) {
                $this->_com_site_access_session = new ComSiteAccessSessionEntity($this, null);
            }
            return $this->_com_site_access_session;
        }
        return new ComSiteAccessSessionEntity($this, $data);
    }


    private $_comment_thread_comment = null;

    // Canonical facade: $client->CommentThreadComment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->comment_thread_comment()
    // resolves here too.
    public function CommentThreadComment($data = null)
    {
        require_once __DIR__ . '/entity/comment_thread_comment_entity.php';
        if ($data === null) {
            if ($this->_comment_thread_comment === null) {
                $this->_comment_thread_comment = new CommentThreadCommentEntity($this, null);
            }
            return $this->_comment_thread_comment;
        }
        return new CommentThreadCommentEntity($this, $data);
    }


    private $_commit_diff = null;

    // Canonical facade: $client->CommitDiff()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->commit_diff()
    // resolves here too.
    public function CommitDiff($data = null)
    {
        require_once __DIR__ . '/entity/commit_diff_entity.php';
        if ($data === null) {
            if ($this->_commit_diff === null) {
                $this->_commit_diff = new CommitDiffEntity($this, null);
            }
            return $this->_commit_diff;
        }
        return new CommitDiffEntity($this, $data);
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


    private $_contact_submission = null;

    // Canonical facade: $client->ContactSubmission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->contact_submission()
    // resolves here too.
    public function ContactSubmission($data = null)
    {
        require_once __DIR__ . '/entity/contact_submission_entity.php';
        if ($data === null) {
            if ($this->_contact_submission === null) {
                $this->_contact_submission = new ContactSubmissionEntity($this, null);
            }
            return $this->_contact_submission;
        }
        return new ContactSubmissionEntity($this, $data);
    }


    private $_control_computer = null;

    // Canonical facade: $client->ControlComputer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->control_computer()
    // resolves here too.
    public function ControlComputer($data = null)
    {
        require_once __DIR__ . '/entity/control_computer_entity.php';
        if ($data === null) {
            if ($this->_control_computer === null) {
                $this->_control_computer = new ControlComputerEntity($this, null);
            }
            return $this->_control_computer;
        }
        return new ControlComputerEntity($this, $data);
    }


    private $_control_computer_control_operation = null;

    // Canonical facade: $client->ControlComputerControlOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->control_computer_control_operation()
    // resolves here too.
    public function ControlComputerControlOperation($data = null)
    {
        require_once __DIR__ . '/entity/control_computer_control_operation_entity.php';
        if ($data === null) {
            if ($this->_control_computer_control_operation === null) {
                $this->_control_computer_control_operation = new ControlComputerControlOperationEntity($this, null);
            }
            return $this->_control_computer_control_operation;
        }
        return new ControlComputerControlOperationEntity($this, $data);
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


    private $_deployment = null;

    // Canonical facade: $client->Deployment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment()
    // resolves here too.
    public function Deployment($data = null)
    {
        require_once __DIR__ . '/entity/deployment_entity.php';
        if ($data === null) {
            if ($this->_deployment === null) {
                $this->_deployment = new DeploymentEntity($this, null);
            }
            return $this->_deployment;
        }
        return new DeploymentEntity($this, $data);
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


    private $_deployment_detail = null;

    // Canonical facade: $client->DeploymentDetail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_detail()
    // resolves here too.
    public function DeploymentDetail($data = null)
    {
        require_once __DIR__ . '/entity/deployment_detail_entity.php';
        if ($data === null) {
            if ($this->_deployment_detail === null) {
                $this->_deployment_detail = new DeploymentDetailEntity($this, null);
            }
            return $this->_deployment_detail;
        }
        return new DeploymentDetailEntity($this, $data);
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


    private $_deployment_log = null;

    // Canonical facade: $client->DeploymentLog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_log()
    // resolves here too.
    public function DeploymentLog($data = null)
    {
        require_once __DIR__ . '/entity/deployment_log_entity.php';
        if ($data === null) {
            if ($this->_deployment_log === null) {
                $this->_deployment_log = new DeploymentLogEntity($this, null);
            }
            return $this->_deployment_log;
        }
        return new DeploymentLogEntity($this, $data);
    }


    private $_deployment_metric = null;

    // Canonical facade: $client->DeploymentMetric()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_metric()
    // resolves here too.
    public function DeploymentMetric($data = null)
    {
        require_once __DIR__ . '/entity/deployment_metric_entity.php';
        if ($data === null) {
            if ($this->_deployment_metric === null) {
                $this->_deployment_metric = new DeploymentMetricEntity($this, null);
            }
            return $this->_deployment_metric;
        }
        return new DeploymentMetricEntity($this, $data);
    }


    private $_deployment_preview = null;

    // Canonical facade: $client->DeploymentPreview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_preview()
    // resolves here too.
    public function DeploymentPreview($data = null)
    {
        require_once __DIR__ . '/entity/deployment_preview_entity.php';
        if ($data === null) {
            if ($this->_deployment_preview === null) {
                $this->_deployment_preview = new DeploymentPreviewEntity($this, null);
            }
            return $this->_deployment_preview;
        }
        return new DeploymentPreviewEntity($this, $data);
    }


    private $_deployment_setting = null;

    // Canonical facade: $client->DeploymentSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deployment_setting()
    // resolves here too.
    public function DeploymentSetting($data = null)
    {
        require_once __DIR__ . '/entity/deployment_setting_entity.php';
        if ($data === null) {
            if ($this->_deployment_setting === null) {
                $this->_deployment_setting = new DeploymentSettingEntity($this, null);
            }
            return $this->_deployment_setting;
        }
        return new DeploymentSettingEntity($this, $data);
    }


    private $_desktop_local_agent_model = null;

    // Canonical facade: $client->DesktopLocalAgentModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->desktop_local_agent_model()
    // resolves here too.
    public function DesktopLocalAgentModel($data = null)
    {
        require_once __DIR__ . '/entity/desktop_local_agent_model_entity.php';
        if ($data === null) {
            if ($this->_desktop_local_agent_model === null) {
                $this->_desktop_local_agent_model = new DesktopLocalAgentModelEntity($this, null);
            }
            return $this->_desktop_local_agent_model;
        }
        return new DesktopLocalAgentModelEntity($this, $data);
    }


    private $_desktop_local_agent_response = null;

    // Canonical facade: $client->DesktopLocalAgentResponse()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->desktop_local_agent_response()
    // resolves here too.
    public function DesktopLocalAgentResponse($data = null)
    {
        require_once __DIR__ . '/entity/desktop_local_agent_response_entity.php';
        if ($data === null) {
            if ($this->_desktop_local_agent_response === null) {
                $this->_desktop_local_agent_response = new DesktopLocalAgentResponseEntity($this, null);
            }
            return $this->_desktop_local_agent_response;
        }
        return new DesktopLocalAgentResponseEntity($this, $data);
    }


    private $_device = null;

    // Canonical facade: $client->Device()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device()
    // resolves here too.
    public function Device($data = null)
    {
        require_once __DIR__ . '/entity/device_entity.php';
        if ($data === null) {
            if ($this->_device === null) {
                $this->_device = new DeviceEntity($this, null);
            }
            return $this->_device;
        }
        return new DeviceEntity($this, $data);
    }


    private $_device_browser_operation = null;

    // Canonical facade: $client->DeviceBrowserOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_browser_operation()
    // resolves here too.
    public function DeviceBrowserOperation($data = null)
    {
        require_once __DIR__ . '/entity/device_browser_operation_entity.php';
        if ($data === null) {
            if ($this->_device_browser_operation === null) {
                $this->_device_browser_operation = new DeviceBrowserOperationEntity($this, null);
            }
            return $this->_device_browser_operation;
        }
        return new DeviceBrowserOperationEntity($this, $data);
    }


    private $_device_control_message = null;

    // Canonical facade: $client->DeviceControlMessage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_control_message()
    // resolves here too.
    public function DeviceControlMessage($data = null)
    {
        require_once __DIR__ . '/entity/device_control_message_entity.php';
        if ($data === null) {
            if ($this->_device_control_message === null) {
                $this->_device_control_message = new DeviceControlMessageEntity($this, null);
            }
            return $this->_device_control_message;
        }
        return new DeviceControlMessageEntity($this, $data);
    }


    private $_device_control_operation = null;

    // Canonical facade: $client->DeviceControlOperation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_control_operation()
    // resolves here too.
    public function DeviceControlOperation($data = null)
    {
        require_once __DIR__ . '/entity/device_control_operation_entity.php';
        if ($data === null) {
            if ($this->_device_control_operation === null) {
                $this->_device_control_operation = new DeviceControlOperationEntity($this, null);
            }
            return $this->_device_control_operation;
        }
        return new DeviceControlOperationEntity($this, $data);
    }


    private $_device_enterprise_relay = null;

    // Canonical facade: $client->DeviceEnterpriseRelay()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_enterprise_relay()
    // resolves here too.
    public function DeviceEnterpriseRelay($data = null)
    {
        require_once __DIR__ . '/entity/device_enterprise_relay_entity.php';
        if ($data === null) {
            if ($this->_device_enterprise_relay === null) {
                $this->_device_enterprise_relay = new DeviceEnterpriseRelayEntity($this, null);
            }
            return $this->_device_enterprise_relay;
        }
        return new DeviceEnterpriseRelayEntity($this, $data);
    }


    private $_device_folder_listing = null;

    // Canonical facade: $client->DeviceFolderListing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_folder_listing()
    // resolves here too.
    public function DeviceFolderListing($data = null)
    {
        require_once __DIR__ . '/entity/device_folder_listing_entity.php';
        if ($data === null) {
            if ($this->_device_folder_listing === null) {
                $this->_device_folder_listing = new DeviceFolderListingEntity($this, null);
            }
            return $this->_device_folder_listing;
        }
        return new DeviceFolderListingEntity($this, $data);
    }


    private $_device_grant = null;

    // Canonical facade: $client->DeviceGrant()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_grant()
    // resolves here too.
    public function DeviceGrant($data = null)
    {
        require_once __DIR__ . '/entity/device_grant_entity.php';
        if ($data === null) {
            if ($this->_device_grant === null) {
                $this->_device_grant = new DeviceGrantEntity($this, null);
            }
            return $this->_device_grant;
        }
        return new DeviceGrantEntity($this, $data);
    }


    private $_device_invocation = null;

    // Canonical facade: $client->DeviceInvocation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_invocation()
    // resolves here too.
    public function DeviceInvocation($data = null)
    {
        require_once __DIR__ . '/entity/device_invocation_entity.php';
        if ($data === null) {
            if ($this->_device_invocation === null) {
                $this->_device_invocation = new DeviceInvocationEntity($this, null);
            }
            return $this->_device_invocation;
        }
        return new DeviceInvocationEntity($this, $data);
    }


    private $_device_local_event = null;

    // Canonical facade: $client->DeviceLocalEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_local_event()
    // resolves here too.
    public function DeviceLocalEvent($data = null)
    {
        require_once __DIR__ . '/entity/device_local_event_entity.php';
        if ($data === null) {
            if ($this->_device_local_event === null) {
                $this->_device_local_event = new DeviceLocalEventEntity($this, null);
            }
            return $this->_device_local_event;
        }
        return new DeviceLocalEventEntity($this, $data);
    }


    private $_device_pairing = null;

    // Canonical facade: $client->DevicePairing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_pairing()
    // resolves here too.
    public function DevicePairing($data = null)
    {
        require_once __DIR__ . '/entity/device_pairing_entity.php';
        if ($data === null) {
            if ($this->_device_pairing === null) {
                $this->_device_pairing = new DevicePairingEntity($this, null);
            }
            return $this->_device_pairing;
        }
        return new DevicePairingEntity($this, $data);
    }


    private $_device_project = null;

    // Canonical facade: $client->DeviceProject()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_project()
    // resolves here too.
    public function DeviceProject($data = null)
    {
        require_once __DIR__ . '/entity/device_project_entity.php';
        if ($data === null) {
            if ($this->_device_project === null) {
                $this->_device_project = new DeviceProjectEntity($this, null);
            }
            return $this->_device_project;
        }
        return new DeviceProjectEntity($this, $data);
    }


    private $_device_scheduled_check_in = null;

    // Canonical facade: $client->DeviceScheduledCheckIn()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device_scheduled_check_in()
    // resolves here too.
    public function DeviceScheduledCheckIn($data = null)
    {
        require_once __DIR__ . '/entity/device_scheduled_check_in_entity.php';
        if ($data === null) {
            if ($this->_device_scheduled_check_in === null) {
                $this->_device_scheduled_check_in = new DeviceScheduledCheckInEntity($this, null);
            }
            return $this->_device_scheduled_check_in;
        }
        return new DeviceScheduledCheckInEntity($this, $data);
    }


    private $_docker_builder = null;

    // Canonical facade: $client->DockerBuilder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->docker_builder()
    // resolves here too.
    public function DockerBuilder($data = null)
    {
        require_once __DIR__ . '/entity/docker_builder_entity.php';
        if ($data === null) {
            if ($this->_docker_builder === null) {
                $this->_docker_builder = new DockerBuilderEntity($this, null);
            }
            return $this->_docker_builder;
        }
        return new DockerBuilderEntity($this, $data);
    }


    private $_docker_builder_session = null;

    // Canonical facade: $client->DockerBuilderSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->docker_builder_session()
    // resolves here too.
    public function DockerBuilderSession($data = null)
    {
        require_once __DIR__ . '/entity/docker_builder_session_entity.php';
        if ($data === null) {
            if ($this->_docker_builder_session === null) {
                $this->_docker_builder_session = new DockerBuilderSessionEntity($this, null);
            }
            return $this->_docker_builder_session;
        }
        return new DockerBuilderSessionEntity($this, $data);
    }


    private $_docker_builder_setting = null;

    // Canonical facade: $client->DockerBuilderSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->docker_builder_setting()
    // resolves here too.
    public function DockerBuilderSetting($data = null)
    {
        require_once __DIR__ . '/entity/docker_builder_setting_entity.php';
        if ($data === null) {
            if ($this->_docker_builder_setting === null) {
                $this->_docker_builder_setting = new DockerBuilderSettingEntity($this, null);
            }
            return $this->_docker_builder_setting;
        }
        return new DockerBuilderSettingEntity($this, $data);
    }


    private $_domain_dns_integration = null;

    // Canonical facade: $client->DomainDnsIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_dns_integration()
    // resolves here too.
    public function DomainDnsIntegration($data = null)
    {
        require_once __DIR__ . '/entity/domain_dns_integration_entity.php';
        if ($data === null) {
            if ($this->_domain_dns_integration === null) {
                $this->_domain_dns_integration = new DomainDnsIntegrationEntity($this, null);
            }
            return $this->_domain_dns_integration;
        }
        return new DomainDnsIntegrationEntity($this, $data);
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


    private $_edge = null;

    // Canonical facade: $client->Edge()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->edge()
    // resolves here too.
    public function Edge($data = null)
    {
        require_once __DIR__ . '/entity/edge_entity.php';
        if ($data === null) {
            if ($this->_edge === null) {
                $this->_edge = new EdgeEntity($this, null);
            }
            return $this->_edge;
        }
        return new EdgeEntity($this, $data);
    }


    private $_email_verification = null;

    // Canonical facade: $client->EmailVerification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_verification()
    // resolves here too.
    public function EmailVerification($data = null)
    {
        require_once __DIR__ . '/entity/email_verification_entity.php';
        if ($data === null) {
            if ($this->_email_verification === null) {
                $this->_email_verification = new EmailVerificationEntity($this, null);
            }
            return $this->_email_verification;
        }
        return new EmailVerificationEntity($this, $data);
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


    private $_execution_desired_state = null;

    // Canonical facade: $client->ExecutionDesiredState()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->execution_desired_state()
    // resolves here too.
    public function ExecutionDesiredState($data = null)
    {
        require_once __DIR__ . '/entity/execution_desired_state_entity.php';
        if ($data === null) {
            if ($this->_execution_desired_state === null) {
                $this->_execution_desired_state = new ExecutionDesiredStateEntity($this, null);
            }
            return $this->_execution_desired_state;
        }
        return new ExecutionDesiredStateEntity($this, $data);
    }


    private $_execution_reconciler_tick = null;

    // Canonical facade: $client->ExecutionReconcilerTick()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->execution_reconciler_tick()
    // resolves here too.
    public function ExecutionReconcilerTick($data = null)
    {
        require_once __DIR__ . '/entity/execution_reconciler_tick_entity.php';
        if ($data === null) {
            if ($this->_execution_reconciler_tick === null) {
                $this->_execution_reconciler_tick = new ExecutionReconcilerTickEntity($this, null);
            }
            return $this->_execution_reconciler_tick;
        }
        return new ExecutionReconcilerTickEntity($this, $data);
    }


    private $_execution_release = null;

    // Canonical facade: $client->ExecutionRelease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->execution_release()
    // resolves here too.
    public function ExecutionRelease($data = null)
    {
        require_once __DIR__ . '/entity/execution_release_entity.php';
        if ($data === null) {
            if ($this->_execution_release === null) {
                $this->_execution_release = new ExecutionReleaseEntity($this, null);
            }
            return $this->_execution_release;
        }
        return new ExecutionReleaseEntity($this, $data);
    }


    private $_execution_runtime_instance = null;

    // Canonical facade: $client->ExecutionRuntimeInstance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->execution_runtime_instance()
    // resolves here too.
    public function ExecutionRuntimeInstance($data = null)
    {
        require_once __DIR__ . '/entity/execution_runtime_instance_entity.php';
        if ($data === null) {
            if ($this->_execution_runtime_instance === null) {
                $this->_execution_runtime_instance = new ExecutionRuntimeInstanceEntity($this, null);
            }
            return $this->_execution_runtime_instance;
        }
        return new ExecutionRuntimeInstanceEntity($this, $data);
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


    private $_gh = null;

    // Canonical facade: $client->Gh()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gh()
    // resolves here too.
    public function Gh($data = null)
    {
        require_once __DIR__ . '/entity/gh_entity.php';
        if ($data === null) {
            if ($this->_gh === null) {
                $this->_gh = new GhEntity($this, null);
            }
            return $this->_gh;
        }
        return new GhEntity($this, $data);
    }


    private $_git_import = null;

    // Canonical facade: $client->GitImport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->git_import()
    // resolves here too.
    public function GitImport($data = null)
    {
        require_once __DIR__ . '/entity/git_import_entity.php';
        if ($data === null) {
            if ($this->_git_import === null) {
                $this->_git_import = new GitImportEntity($this, null);
            }
            return $this->_git_import;
        }
        return new GitImportEntity($this, $data);
    }


    private $_github = null;

    // Canonical facade: $client->Github()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github()
    // resolves here too.
    public function Github($data = null)
    {
        require_once __DIR__ . '/entity/github_entity.php';
        if ($data === null) {
            if ($this->_github === null) {
                $this->_github = new GithubEntity($this, null);
            }
            return $this->_github;
        }
        return new GithubEntity($this, $data);
    }


    private $_github_app = null;

    // Canonical facade: $client->GithubApp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_app()
    // resolves here too.
    public function GithubApp($data = null)
    {
        require_once __DIR__ . '/entity/github_app_entity.php';
        if ($data === null) {
            if ($this->_github_app === null) {
                $this->_github_app = new GithubAppEntity($this, null);
            }
            return $this->_github_app;
        }
        return new GithubAppEntity($this, $data);
    }


    private $_github_app_importable_repository = null;

    // Canonical facade: $client->GithubAppImportableRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_app_importable_repository()
    // resolves here too.
    public function GithubAppImportableRepository($data = null)
    {
        require_once __DIR__ . '/entity/github_app_importable_repository_entity.php';
        if ($data === null) {
            if ($this->_github_app_importable_repository === null) {
                $this->_github_app_importable_repository = new GithubAppImportableRepositoryEntity($this, null);
            }
            return $this->_github_app_importable_repository;
        }
        return new GithubAppImportableRepositoryEntity($this, $data);
    }


    private $_github_app_installation = null;

    // Canonical facade: $client->GithubAppInstallation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_app_installation()
    // resolves here too.
    public function GithubAppInstallation($data = null)
    {
        require_once __DIR__ . '/entity/github_app_installation_entity.php';
        if ($data === null) {
            if ($this->_github_app_installation === null) {
                $this->_github_app_installation = new GithubAppInstallationEntity($this, null);
            }
            return $this->_github_app_installation;
        }
        return new GithubAppInstallationEntity($this, $data);
    }


    private $_github_app_installation_authorization = null;

    // Canonical facade: $client->GithubAppInstallationAuthorization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_app_installation_authorization()
    // resolves here too.
    public function GithubAppInstallationAuthorization($data = null)
    {
        require_once __DIR__ . '/entity/github_app_installation_authorization_entity.php';
        if ($data === null) {
            if ($this->_github_app_installation_authorization === null) {
                $this->_github_app_installation_authorization = new GithubAppInstallationAuthorizationEntity($this, null);
            }
            return $this->_github_app_installation_authorization;
        }
        return new GithubAppInstallationAuthorizationEntity($this, $data);
    }


    private $_github_app_user_authorization = null;

    // Canonical facade: $client->GithubAppUserAuthorization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_app_user_authorization()
    // resolves here too.
    public function GithubAppUserAuthorization($data = null)
    {
        require_once __DIR__ . '/entity/github_app_user_authorization_entity.php';
        if ($data === null) {
            if ($this->_github_app_user_authorization === null) {
                $this->_github_app_user_authorization = new GithubAppUserAuthorizationEntity($this, null);
            }
            return $this->_github_app_user_authorization;
        }
        return new GithubAppUserAuthorizationEntity($this, $data);
    }


    private $_github_ci_repository = null;

    // Canonical facade: $client->GithubCiRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_ci_repository()
    // resolves here too.
    public function GithubCiRepository($data = null)
    {
        require_once __DIR__ . '/entity/github_ci_repository_entity.php';
        if ($data === null) {
            if ($this->_github_ci_repository === null) {
                $this->_github_ci_repository = new GithubCiRepositoryEntity($this, null);
            }
            return $this->_github_ci_repository;
        }
        return new GithubCiRepositoryEntity($this, $data);
    }


    private $_github_ci_repository_compatibility_report = null;

    // Canonical facade: $client->GithubCiRepositoryCompatibilityReport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_ci_repository_compatibility_report()
    // resolves here too.
    public function GithubCiRepositoryCompatibilityReport($data = null)
    {
        require_once __DIR__ . '/entity/github_ci_repository_compatibility_report_entity.php';
        if ($data === null) {
            if ($this->_github_ci_repository_compatibility_report === null) {
                $this->_github_ci_repository_compatibility_report = new GithubCiRepositoryCompatibilityReportEntity($this, null);
            }
            return $this->_github_ci_repository_compatibility_report;
        }
        return new GithubCiRepositoryCompatibilityReportEntity($this, $data);
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


    private $_github_integration = null;

    // Canonical facade: $client->GithubIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_integration()
    // resolves here too.
    public function GithubIntegration($data = null)
    {
        require_once __DIR__ . '/entity/github_integration_entity.php';
        if ($data === null) {
            if ($this->_github_integration === null) {
                $this->_github_integration = new GithubIntegrationEntity($this, null);
            }
            return $this->_github_integration;
        }
        return new GithubIntegrationEntity($this, $data);
    }


    private $_github_onboarding = null;

    // Canonical facade: $client->GithubOnboarding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_onboarding()
    // resolves here too.
    public function GithubOnboarding($data = null)
    {
        require_once __DIR__ . '/entity/github_onboarding_entity.php';
        if ($data === null) {
            if ($this->_github_onboarding === null) {
                $this->_github_onboarding = new GithubOnboardingEntity($this, null);
            }
            return $this->_github_onboarding;
        }
        return new GithubOnboardingEntity($this, $data);
    }


    private $_github_onboarding_branch = null;

    // Canonical facade: $client->GithubOnboardingBranch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_onboarding_branch()
    // resolves here too.
    public function GithubOnboardingBranch($data = null)
    {
        require_once __DIR__ . '/entity/github_onboarding_branch_entity.php';
        if ($data === null) {
            if ($this->_github_onboarding_branch === null) {
                $this->_github_onboarding_branch = new GithubOnboardingBranchEntity($this, null);
            }
            return $this->_github_onboarding_branch;
        }
        return new GithubOnboardingBranchEntity($this, $data);
    }


    private $_github_onboarding_import = null;

    // Canonical facade: $client->GithubOnboardingImport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_onboarding_import()
    // resolves here too.
    public function GithubOnboardingImport($data = null)
    {
        require_once __DIR__ . '/entity/github_onboarding_import_entity.php';
        if ($data === null) {
            if ($this->_github_onboarding_import === null) {
                $this->_github_onboarding_import = new GithubOnboardingImportEntity($this, null);
            }
            return $this->_github_onboarding_import;
        }
        return new GithubOnboardingImportEntity($this, $data);
    }


    private $_github_onboarding_import_batch = null;

    // Canonical facade: $client->GithubOnboardingImportBatch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_onboarding_import_batch()
    // resolves here too.
    public function GithubOnboardingImportBatch($data = null)
    {
        require_once __DIR__ . '/entity/github_onboarding_import_batch_entity.php';
        if ($data === null) {
            if ($this->_github_onboarding_import_batch === null) {
                $this->_github_onboarding_import_batch = new GithubOnboardingImportBatchEntity($this, null);
            }
            return $this->_github_onboarding_import_batch;
        }
        return new GithubOnboardingImportBatchEntity($this, $data);
    }


    private $_github_onboarding_import_item = null;

    // Canonical facade: $client->GithubOnboardingImportItem()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_onboarding_import_item()
    // resolves here too.
    public function GithubOnboardingImportItem($data = null)
    {
        require_once __DIR__ . '/entity/github_onboarding_import_item_entity.php';
        if ($data === null) {
            if ($this->_github_onboarding_import_item === null) {
                $this->_github_onboarding_import_item = new GithubOnboardingImportItemEntity($this, null);
            }
            return $this->_github_onboarding_import_item;
        }
        return new GithubOnboardingImportItemEntity($this, $data);
    }


    private $_github_pull_request = null;

    // Canonical facade: $client->GithubPullRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_pull_request()
    // resolves here too.
    public function GithubPullRequest($data = null)
    {
        require_once __DIR__ . '/entity/github_pull_request_entity.php';
        if ($data === null) {
            if ($this->_github_pull_request === null) {
                $this->_github_pull_request = new GithubPullRequestEntity($this, null);
            }
            return $this->_github_pull_request;
        }
        return new GithubPullRequestEntity($this, $data);
    }


    private $_github_runner_admission = null;

    // Canonical facade: $client->GithubRunnerAdmission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_admission()
    // resolves here too.
    public function GithubRunnerAdmission($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_admission_entity.php';
        if ($data === null) {
            if ($this->_github_runner_admission === null) {
                $this->_github_runner_admission = new GithubRunnerAdmissionEntity($this, null);
            }
            return $this->_github_runner_admission;
        }
        return new GithubRunnerAdmissionEntity($this, $data);
    }


    private $_github_runner_cache = null;

    // Canonical facade: $client->GithubRunnerCache()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_cache()
    // resolves here too.
    public function GithubRunnerCache($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_cache_entity.php';
        if ($data === null) {
            if ($this->_github_runner_cache === null) {
                $this->_github_runner_cache = new GithubRunnerCacheEntity($this, null);
            }
            return $this->_github_runner_cache;
        }
        return new GithubRunnerCacheEntity($this, $data);
    }


    private $_github_runner_egress = null;

    // Canonical facade: $client->GithubRunnerEgress()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_egress()
    // resolves here too.
    public function GithubRunnerEgress($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_egress_entity.php';
        if ($data === null) {
            if ($this->_github_runner_egress === null) {
                $this->_github_runner_egress = new GithubRunnerEgressEntity($this, null);
            }
            return $this->_github_runner_egress;
        }
        return new GithubRunnerEgressEntity($this, $data);
    }


    private $_github_runner_history = null;

    // Canonical facade: $client->GithubRunnerHistory()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_history()
    // resolves here too.
    public function GithubRunnerHistory($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_history_entity.php';
        if ($data === null) {
            if ($this->_github_runner_history === null) {
                $this->_github_runner_history = new GithubRunnerHistoryEntity($this, null);
            }
            return $this->_github_runner_history;
        }
        return new GithubRunnerHistoryEntity($this, $data);
    }


    private $_github_runner_image = null;

    // Canonical facade: $client->GithubRunnerImage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_image()
    // resolves here too.
    public function GithubRunnerImage($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_image_entity.php';
        if ($data === null) {
            if ($this->_github_runner_image === null) {
                $this->_github_runner_image = new GithubRunnerImageEntity($this, null);
            }
            return $this->_github_runner_image;
        }
        return new GithubRunnerImageEntity($this, $data);
    }


    private $_github_runner_pool = null;

    // Canonical facade: $client->GithubRunnerPool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_pool()
    // resolves here too.
    public function GithubRunnerPool($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_pool_entity.php';
        if ($data === null) {
            if ($this->_github_runner_pool === null) {
                $this->_github_runner_pool = new GithubRunnerPoolEntity($this, null);
            }
            return $this->_github_runner_pool;
        }
        return new GithubRunnerPoolEntity($this, $data);
    }


    private $_github_runner_setup = null;

    // Canonical facade: $client->GithubRunnerSetup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->github_runner_setup()
    // resolves here too.
    public function GithubRunnerSetup($data = null)
    {
        require_once __DIR__ . '/entity/github_runner_setup_entity.php';
        if ($data === null) {
            if ($this->_github_runner_setup === null) {
                $this->_github_runner_setup = new GithubRunnerSetupEntity($this, null);
            }
            return $this->_github_runner_setup;
        }
        return new GithubRunnerSetupEntity($this, $data);
    }


    private $_gitlab = null;

    // Canonical facade: $client->Gitlab()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gitlab()
    // resolves here too.
    public function Gitlab($data = null)
    {
        require_once __DIR__ . '/entity/gitlab_entity.php';
        if ($data === null) {
            if ($this->_gitlab === null) {
                $this->_gitlab = new GitlabEntity($this, null);
            }
            return $this->_gitlab;
        }
        return new GitlabEntity($this, $data);
    }


    private $_gitlab_connection = null;

    // Canonical facade: $client->GitlabConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gitlab_connection()
    // resolves here too.
    public function GitlabConnection($data = null)
    {
        require_once __DIR__ . '/entity/gitlab_connection_entity.php';
        if ($data === null) {
            if ($this->_gitlab_connection === null) {
                $this->_gitlab_connection = new GitlabConnectionEntity($this, null);
            }
            return $this->_gitlab_connection;
        }
        return new GitlabConnectionEntity($this, $data);
    }


    private $_gitlab_import = null;

    // Canonical facade: $client->GitlabImport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gitlab_import()
    // resolves here too.
    public function GitlabImport($data = null)
    {
        require_once __DIR__ . '/entity/gitlab_import_entity.php';
        if ($data === null) {
            if ($this->_gitlab_import === null) {
                $this->_gitlab_import = new GitlabImportEntity($this, null);
            }
            return $this->_gitlab_import;
        }
        return new GitlabImportEntity($this, $data);
    }


    private $_gitlab_oauth = null;

    // Canonical facade: $client->GitlabOauth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gitlab_oauth()
    // resolves here too.
    public function GitlabOauth($data = null)
    {
        require_once __DIR__ . '/entity/gitlab_oauth_entity.php';
        if ($data === null) {
            if ($this->_gitlab_oauth === null) {
                $this->_gitlab_oauth = new GitlabOauthEntity($this, null);
            }
            return $this->_gitlab_oauth;
        }
        return new GitlabOauthEntity($this, $data);
    }


    private $_grant_all_agent = null;

    // Canonical facade: $client->GrantAllAgent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->grant_all_agent()
    // resolves here too.
    public function GrantAllAgent($data = null)
    {
        require_once __DIR__ . '/entity/grant_all_agent_entity.php';
        if ($data === null) {
            if ($this->_grant_all_agent === null) {
                $this->_grant_all_agent = new GrantAllAgentEntity($this, null);
            }
            return $this->_grant_all_agent;
        }
        return new GrantAllAgentEntity($this, $data);
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


    private $_identity_organization = null;

    // Canonical facade: $client->IdentityOrganization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->identity_organization()
    // resolves here too.
    public function IdentityOrganization($data = null)
    {
        require_once __DIR__ . '/entity/identity_organization_entity.php';
        if ($data === null) {
            if ($this->_identity_organization === null) {
                $this->_identity_organization = new IdentityOrganizationEntity($this, null);
            }
            return $this->_identity_organization;
        }
        return new IdentityOrganizationEntity($this, $data);
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


    private $_image_repository_tag = null;

    // Canonical facade: $client->ImageRepositoryTag()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->image_repository_tag()
    // resolves here too.
    public function ImageRepositoryTag($data = null)
    {
        require_once __DIR__ . '/entity/image_repository_tag_entity.php';
        if ($data === null) {
            if ($this->_image_repository_tag === null) {
                $this->_image_repository_tag = new ImageRepositoryTagEntity($this, null);
            }
            return $this->_image_repository_tag;
        }
        return new ImageRepositoryTagEntity($this, $data);
    }


    private $_import_branch_policy = null;

    // Canonical facade: $client->ImportBranchPolicy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->import_branch_policy()
    // resolves here too.
    public function ImportBranchPolicy($data = null)
    {
        require_once __DIR__ . '/entity/import_branch_policy_entity.php';
        if ($data === null) {
            if ($this->_import_branch_policy === null) {
                $this->_import_branch_policy = new ImportBranchPolicyEntity($this, null);
            }
            return $this->_import_branch_policy;
        }
        return new ImportBranchPolicyEntity($this, $data);
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


    private $_invocation_control = null;

    // Canonical facade: $client->InvocationControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->invocation_control()
    // resolves here too.
    public function InvocationControl($data = null)
    {
        require_once __DIR__ . '/entity/invocation_control_entity.php';
        if ($data === null) {
            if ($this->_invocation_control === null) {
                $this->_invocation_control = new InvocationControlEntity($this, null);
            }
            return $this->_invocation_control;
        }
        return new InvocationControlEntity($this, $data);
    }


    private $_job_log_chunk = null;

    // Canonical facade: $client->JobLogChunk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->job_log_chunk()
    // resolves here too.
    public function JobLogChunk($data = null)
    {
        require_once __DIR__ . '/entity/job_log_chunk_entity.php';
        if ($data === null) {
            if ($this->_job_log_chunk === null) {
                $this->_job_log_chunk = new JobLogChunkEntity($this, null);
            }
            return $this->_job_log_chunk;
        }
        return new JobLogChunkEntity($this, $data);
    }


    private $_job_step = null;

    // Canonical facade: $client->JobStep()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->job_step()
    // resolves here too.
    public function JobStep($data = null)
    {
        require_once __DIR__ . '/entity/job_step_entity.php';
        if ($data === null) {
            if ($this->_job_step === null) {
                $this->_job_step = new JobStepEntity($this, null);
            }
            return $this->_job_step;
        }
        return new JobStepEntity($this, $data);
    }


    private $_job_workspace = null;

    // Canonical facade: $client->JobWorkspace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->job_workspace()
    // resolves here too.
    public function JobWorkspace($data = null)
    {
        require_once __DIR__ . '/entity/job_workspace_entity.php';
        if ($data === null) {
            if ($this->_job_workspace === null) {
                $this->_job_workspace = new JobWorkspaceEntity($this, null);
            }
            return $this->_job_workspace;
        }
        return new JobWorkspaceEntity($this, $data);
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


    private $_known = null;

    // Canonical facade: $client->Known()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->known()
    // resolves here too.
    public function Known($data = null)
    {
        require_once __DIR__ . '/entity/known_entity.php';
        if ($data === null) {
            if ($this->_known === null) {
                $this->_known = new KnownEntity($this, null);
            }
            return $this->_known;
        }
        return new KnownEntity($this, $data);
    }


    private $_label = null;

    // Canonical facade: $client->Label()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->label()
    // resolves here too.
    public function Label($data = null)
    {
        require_once __DIR__ . '/entity/label_entity.php';
        if ($data === null) {
            if ($this->_label === null) {
                $this->_label = new LabelEntity($this, null);
            }
            return $this->_label;
        }
        return new LabelEntity($this, $data);
    }


    private $_lease_artifact = null;

    // Canonical facade: $client->LeaseArtifact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_artifact()
    // resolves here too.
    public function LeaseArtifact($data = null)
    {
        require_once __DIR__ . '/entity/lease_artifact_entity.php';
        if ($data === null) {
            if ($this->_lease_artifact === null) {
                $this->_lease_artifact = new LeaseArtifactEntity($this, null);
            }
            return $this->_lease_artifact;
        }
        return new LeaseArtifactEntity($this, $data);
    }


    private $_lease_cache = null;

    // Canonical facade: $client->LeaseCache()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_cache()
    // resolves here too.
    public function LeaseCache($data = null)
    {
        require_once __DIR__ . '/entity/lease_cache_entity.php';
        if ($data === null) {
            if ($this->_lease_cache === null) {
                $this->_lease_cache = new LeaseCacheEntity($this, null);
            }
            return $this->_lease_cache;
        }
        return new LeaseCacheEntity($this, $data);
    }


    private $_lease_log_chunk = null;

    // Canonical facade: $client->LeaseLogChunk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_log_chunk()
    // resolves here too.
    public function LeaseLogChunk($data = null)
    {
        require_once __DIR__ . '/entity/lease_log_chunk_entity.php';
        if ($data === null) {
            if ($this->_lease_log_chunk === null) {
                $this->_lease_log_chunk = new LeaseLogChunkEntity($this, null);
            }
            return $this->_lease_log_chunk;
        }
        return new LeaseLogChunkEntity($this, $data);
    }


    private $_lease_reconciliation = null;

    // Canonical facade: $client->LeaseReconciliation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_reconciliation()
    // resolves here too.
    public function LeaseReconciliation($data = null)
    {
        require_once __DIR__ . '/entity/lease_reconciliation_entity.php';
        if ($data === null) {
            if ($this->_lease_reconciliation === null) {
                $this->_lease_reconciliation = new LeaseReconciliationEntity($this, null);
            }
            return $this->_lease_reconciliation;
        }
        return new LeaseReconciliationEntity($this, $data);
    }


    private $_lease_step = null;

    // Canonical facade: $client->LeaseStep()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_step()
    // resolves here too.
    public function LeaseStep($data = null)
    {
        require_once __DIR__ . '/entity/lease_step_entity.php';
        if ($data === null) {
            if ($this->_lease_step === null) {
                $this->_lease_step = new LeaseStepEntity($this, null);
            }
            return $this->_lease_step;
        }
        return new LeaseStepEntity($this, $data);
    }


    private $_lease_verify_diagnostic = null;

    // Canonical facade: $client->LeaseVerifyDiagnostic()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_verify_diagnostic()
    // resolves here too.
    public function LeaseVerifyDiagnostic($data = null)
    {
        require_once __DIR__ . '/entity/lease_verify_diagnostic_entity.php';
        if ($data === null) {
            if ($this->_lease_verify_diagnostic === null) {
                $this->_lease_verify_diagnostic = new LeaseVerifyDiagnosticEntity($this, null);
            }
            return $this->_lease_verify_diagnostic;
        }
        return new LeaseVerifyDiagnosticEntity($this, $data);
    }


    private $_lease_verify_secret = null;

    // Canonical facade: $client->LeaseVerifySecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_verify_secret()
    // resolves here too.
    public function LeaseVerifySecret($data = null)
    {
        require_once __DIR__ . '/entity/lease_verify_secret_entity.php';
        if ($data === null) {
            if ($this->_lease_verify_secret === null) {
                $this->_lease_verify_secret = new LeaseVerifySecretEntity($this, null);
            }
            return $this->_lease_verify_secret;
        }
        return new LeaseVerifySecretEntity($this, $data);
    }


    private $_lease_workspace = null;

    // Canonical facade: $client->LeaseWorkspace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lease_workspace()
    // resolves here too.
    public function LeaseWorkspace($data = null)
    {
        require_once __DIR__ . '/entity/lease_workspace_entity.php';
        if ($data === null) {
            if ($this->_lease_workspace === null) {
                $this->_lease_workspace = new LeaseWorkspaceEntity($this, null);
            }
            return $this->_lease_workspace;
        }
        return new LeaseWorkspaceEntity($this, $data);
    }


    private $_local_agent_decision = null;

    // Canonical facade: $client->LocalAgentDecision()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->local_agent_decision()
    // resolves here too.
    public function LocalAgentDecision($data = null)
    {
        require_once __DIR__ . '/entity/local_agent_decision_entity.php';
        if ($data === null) {
            if ($this->_local_agent_decision === null) {
                $this->_local_agent_decision = new LocalAgentDecisionEntity($this, null);
            }
            return $this->_local_agent_decision;
        }
        return new LocalAgentDecisionEntity($this, $data);
    }


    private $_local_agent_response = null;

    // Canonical facade: $client->LocalAgentResponse()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->local_agent_response()
    // resolves here too.
    public function LocalAgentResponse($data = null)
    {
        require_once __DIR__ . '/entity/local_agent_response_entity.php';
        if ($data === null) {
            if ($this->_local_agent_response === null) {
                $this->_local_agent_response = new LocalAgentResponseEntity($this, null);
            }
            return $this->_local_agent_response;
        }
        return new LocalAgentResponseEntity($this, $data);
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


    private $_log_stream_chunk = null;

    // Canonical facade: $client->LogStreamChunk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->log_stream_chunk()
    // resolves here too.
    public function LogStreamChunk($data = null)
    {
        require_once __DIR__ . '/entity/log_stream_chunk_entity.php';
        if ($data === null) {
            if ($this->_log_stream_chunk === null) {
                $this->_log_stream_chunk = new LogStreamChunkEntity($this, null);
            }
            return $this->_log_stream_chunk;
        }
        return new LogStreamChunkEntity($this, $data);
    }


    private $_logo_image = null;

    // Canonical facade: $client->LogoImage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->logo_image()
    // resolves here too.
    public function LogoImage($data = null)
    {
        require_once __DIR__ . '/entity/logo_image_entity.php';
        if ($data === null) {
            if ($this->_logo_image === null) {
                $this->_logo_image = new LogoImageEntity($this, null);
            }
            return $this->_logo_image;
        }
        return new LogoImageEntity($this, $data);
    }


    private $_marketing_setting = null;

    // Canonical facade: $client->MarketingSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->marketing_setting()
    // resolves here too.
    public function MarketingSetting($data = null)
    {
        require_once __DIR__ . '/entity/marketing_setting_entity.php';
        if ($data === null) {
            if ($this->_marketing_setting === null) {
                $this->_marketing_setting = new MarketingSettingEntity($this, null);
            }
            return $this->_marketing_setting;
        }
        return new MarketingSettingEntity($this, $data);
    }


    private $_mcp_oauth = null;

    // Canonical facade: $client->McpOauth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mcp_oauth()
    // resolves here too.
    public function McpOauth($data = null)
    {
        require_once __DIR__ . '/entity/mcp_oauth_entity.php';
        if ($data === null) {
            if ($this->_mcp_oauth === null) {
                $this->_mcp_oauth = new McpOauthEntity($this, null);
            }
            return $this->_mcp_oauth;
        }
        return new McpOauthEntity($this, $data);
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


    private $_merge_queue_entry = null;

    // Canonical facade: $client->MergeQueueEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->merge_queue_entry()
    // resolves here too.
    public function MergeQueueEntry($data = null)
    {
        require_once __DIR__ . '/entity/merge_queue_entry_entity.php';
        if ($data === null) {
            if ($this->_merge_queue_entry === null) {
                $this->_merge_queue_entry = new MergeQueueEntryEntity($this, null);
            }
            return $this->_merge_queue_entry;
        }
        return new MergeQueueEntryEntity($this, $data);
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


    private $_merge_resolution = null;

    // Canonical facade: $client->MergeResolution()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->merge_resolution()
    // resolves here too.
    public function MergeResolution($data = null)
    {
        require_once __DIR__ . '/entity/merge_resolution_entity.php';
        if ($data === null) {
            if ($this->_merge_resolution === null) {
                $this->_merge_resolution = new MergeResolutionEntity($this, null);
            }
            return $this->_merge_resolution;
        }
        return new MergeResolutionEntity($this, $data);
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


    private $_metronome_webhook = null;

    // Canonical facade: $client->MetronomeWebhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->metronome_webhook()
    // resolves here too.
    public function MetronomeWebhook($data = null)
    {
        require_once __DIR__ . '/entity/metronome_webhook_entity.php';
        if ($data === null) {
            if ($this->_metronome_webhook === null) {
                $this->_metronome_webhook = new MetronomeWebhookEntity($this, null);
            }
            return $this->_metronome_webhook;
        }
        return new MetronomeWebhookEntity($this, $data);
    }


    private $_model_subscription_account = null;

    // Canonical facade: $client->ModelSubscriptionAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->model_subscription_account()
    // resolves here too.
    public function ModelSubscriptionAccount($data = null)
    {
        require_once __DIR__ . '/entity/model_subscription_account_entity.php';
        if ($data === null) {
            if ($this->_model_subscription_account === null) {
                $this->_model_subscription_account = new ModelSubscriptionAccountEntity($this, null);
            }
            return $this->_model_subscription_account;
        }
        return new ModelSubscriptionAccountEntity($this, $data);
    }


    private $_model_subscription_account_connection = null;

    // Canonical facade: $client->ModelSubscriptionAccountConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->model_subscription_account_connection()
    // resolves here too.
    public function ModelSubscriptionAccountConnection($data = null)
    {
        require_once __DIR__ . '/entity/model_subscription_account_connection_entity.php';
        if ($data === null) {
            if ($this->_model_subscription_account_connection === null) {
                $this->_model_subscription_account_connection = new ModelSubscriptionAccountConnectionEntity($this, null);
            }
            return $this->_model_subscription_account_connection;
        }
        return new ModelSubscriptionAccountConnectionEntity($this, $data);
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


    private $_networking_space = null;

    // Canonical facade: $client->NetworkingSpace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->networking_space()
    // resolves here too.
    public function NetworkingSpace($data = null)
    {
        require_once __DIR__ . '/entity/networking_space_entity.php';
        if ($data === null) {
            if ($this->_networking_space === null) {
                $this->_networking_space = new NetworkingSpaceEntity($this, null);
            }
            return $this->_networking_space;
        }
        return new NetworkingSpaceEntity($this, $data);
    }


    private $_node = null;

    // Canonical facade: $client->Node()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->node()
    // resolves here too.
    public function Node($data = null)
    {
        require_once __DIR__ . '/entity/node_entity.php';
        if ($data === null) {
            if ($this->_node === null) {
                $this->_node = new NodeEntity($this, null);
            }
            return $this->_node;
        }
        return new NodeEntity($this, $data);
    }


    private $_node_certificate = null;

    // Canonical facade: $client->NodeCertificate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->node_certificate()
    // resolves here too.
    public function NodeCertificate($data = null)
    {
        require_once __DIR__ . '/entity/node_certificate_entity.php';
        if ($data === null) {
            if ($this->_node_certificate === null) {
                $this->_node_certificate = new NodeCertificateEntity($this, null);
            }
            return $this->_node_certificate;
        }
        return new NodeCertificateEntity($this, $data);
    }


    private $_node_lease = null;

    // Canonical facade: $client->NodeLease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->node_lease()
    // resolves here too.
    public function NodeLease($data = null)
    {
        require_once __DIR__ . '/entity/node_lease_entity.php';
        if ($data === null) {
            if ($this->_node_lease === null) {
                $this->_node_lease = new NodeLeaseEntity($this, null);
            }
            return $this->_node_lease;
        }
        return new NodeLeaseEntity($this, $data);
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


    private $_now = null;

    // Canonical facade: $client->Now()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->now()
    // resolves here too.
    public function Now($data = null)
    {
        require_once __DIR__ . '/entity/now_entity.php';
        if ($data === null) {
            if ($this->_now === null) {
                $this->_now = new NowEntity($this, null);
            }
            return $this->_now;
        }
        return new NowEntity($this, $data);
    }


    private $_observability_clickhouse_cluster = null;

    // Canonical facade: $client->ObservabilityClickhouseCluster()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->observability_clickhouse_cluster()
    // resolves here too.
    public function ObservabilityClickhouseCluster($data = null)
    {
        require_once __DIR__ . '/entity/observability_clickhouse_cluster_entity.php';
        if ($data === null) {
            if ($this->_observability_clickhouse_cluster === null) {
                $this->_observability_clickhouse_cluster = new ObservabilityClickhouseClusterEntity($this, null);
            }
            return $this->_observability_clickhouse_cluster;
        }
        return new ObservabilityClickhouseClusterEntity($this, $data);
    }


    private $_observability_quickwit_cluster = null;

    // Canonical facade: $client->ObservabilityQuickwitCluster()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->observability_quickwit_cluster()
    // resolves here too.
    public function ObservabilityQuickwitCluster($data = null)
    {
        require_once __DIR__ . '/entity/observability_quickwit_cluster_entity.php';
        if ($data === null) {
            if ($this->_observability_quickwit_cluster === null) {
                $this->_observability_quickwit_cluster = new ObservabilityQuickwitClusterEntity($this, null);
            }
            return $this->_observability_quickwit_cluster;
        }
        return new ObservabilityQuickwitClusterEntity($this, $data);
    }


    private $_observability_space = null;

    // Canonical facade: $client->ObservabilitySpace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->observability_space()
    // resolves here too.
    public function ObservabilitySpace($data = null)
    {
        require_once __DIR__ . '/entity/observability_space_entity.php';
        if ($data === null) {
            if ($this->_observability_space === null) {
                $this->_observability_space = new ObservabilitySpaceEntity($this, null);
            }
            return $this->_observability_space;
        }
        return new ObservabilitySpaceEntity($this, $data);
    }


    private $_openapi = null;

    // Canonical facade: $client->Openapi()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->openapi()
    // resolves here too.
    public function Openapi($data = null)
    {
        require_once __DIR__ . '/entity/openapi_entity.php';
        if ($data === null) {
            if ($this->_openapi === null) {
                $this->_openapi = new OpenapiEntity($this, null);
            }
            return $this->_openapi;
        }
        return new OpenapiEntity($this, $data);
    }


    private $_org_invitation = null;

    // Canonical facade: $client->OrgInvitation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->org_invitation()
    // resolves here too.
    public function OrgInvitation($data = null)
    {
        require_once __DIR__ . '/entity/org_invitation_entity.php';
        if ($data === null) {
            if ($this->_org_invitation === null) {
                $this->_org_invitation = new OrgInvitationEntity($this, null);
            }
            return $this->_org_invitation;
        }
        return new OrgInvitationEntity($this, $data);
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


    private $_organization_app = null;

    // Canonical facade: $client->OrganizationApp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_app()
    // resolves here too.
    public function OrganizationApp($data = null)
    {
        require_once __DIR__ . '/entity/organization_app_entity.php';
        if ($data === null) {
            if ($this->_organization_app === null) {
                $this->_organization_app = new OrganizationAppEntity($this, null);
            }
            return $this->_organization_app;
        }
        return new OrganizationAppEntity($this, $data);
    }


    private $_organization_control = null;

    // Canonical facade: $client->OrganizationControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_control()
    // resolves here too.
    public function OrganizationControl($data = null)
    {
        require_once __DIR__ . '/entity/organization_control_entity.php';
        if ($data === null) {
            if ($this->_organization_control === null) {
                $this->_organization_control = new OrganizationControlEntity($this, null);
            }
            return $this->_organization_control;
        }
        return new OrganizationControlEntity($this, $data);
    }


    private $_organization_device = null;

    // Canonical facade: $client->OrganizationDevice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_device()
    // resolves here too.
    public function OrganizationDevice($data = null)
    {
        require_once __DIR__ . '/entity/organization_device_entity.php';
        if ($data === null) {
            if ($this->_organization_device === null) {
                $this->_organization_device = new OrganizationDeviceEntity($this, null);
            }
            return $this->_organization_device;
        }
        return new OrganizationDeviceEntity($this, $data);
    }


    private $_organization_identity_certificate = null;

    // Canonical facade: $client->OrganizationIdentityCertificate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_identity_certificate()
    // resolves here too.
    public function OrganizationIdentityCertificate($data = null)
    {
        require_once __DIR__ . '/entity/organization_identity_certificate_entity.php';
        if ($data === null) {
            if ($this->_organization_identity_certificate === null) {
                $this->_organization_identity_certificate = new OrganizationIdentityCertificateEntity($this, null);
            }
            return $this->_organization_identity_certificate;
        }
        return new OrganizationIdentityCertificateEntity($this, $data);
    }


    private $_organization_interaction = null;

    // Canonical facade: $client->OrganizationInteraction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_interaction()
    // resolves here too.
    public function OrganizationInteraction($data = null)
    {
        require_once __DIR__ . '/entity/organization_interaction_entity.php';
        if ($data === null) {
            if ($this->_organization_interaction === null) {
                $this->_organization_interaction = new OrganizationInteractionEntity($this, null);
            }
            return $this->_organization_interaction;
        }
        return new OrganizationInteractionEntity($this, $data);
    }


    private $_organization_invitation = null;

    // Canonical facade: $client->OrganizationInvitation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_invitation()
    // resolves here too.
    public function OrganizationInvitation($data = null)
    {
        require_once __DIR__ . '/entity/organization_invitation_entity.php';
        if ($data === null) {
            if ($this->_organization_invitation === null) {
                $this->_organization_invitation = new OrganizationInvitationEntity($this, null);
            }
            return $this->_organization_invitation;
        }
        return new OrganizationInvitationEntity($this, $data);
    }


    private $_organization_message_file = null;

    // Canonical facade: $client->OrganizationMessageFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_message_file()
    // resolves here too.
    public function OrganizationMessageFile($data = null)
    {
        require_once __DIR__ . '/entity/organization_message_file_entity.php';
        if ($data === null) {
            if ($this->_organization_message_file === null) {
                $this->_organization_message_file = new OrganizationMessageFileEntity($this, null);
            }
            return $this->_organization_message_file;
        }
        return new OrganizationMessageFileEntity($this, $data);
    }


    private $_organization_oidc_trust = null;

    // Canonical facade: $client->OrganizationOidcTrust()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_oidc_trust()
    // resolves here too.
    public function OrganizationOidcTrust($data = null)
    {
        require_once __DIR__ . '/entity/organization_oidc_trust_entity.php';
        if ($data === null) {
            if ($this->_organization_oidc_trust === null) {
                $this->_organization_oidc_trust = new OrganizationOidcTrustEntity($this, null);
            }
            return $this->_organization_oidc_trust;
        }
        return new OrganizationOidcTrustEntity($this, $data);
    }


    private $_organization_run_event = null;

    // Canonical facade: $client->OrganizationRunEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_run_event()
    // resolves here too.
    public function OrganizationRunEvent($data = null)
    {
        require_once __DIR__ . '/entity/organization_run_event_entity.php';
        if ($data === null) {
            if ($this->_organization_run_event === null) {
                $this->_organization_run_event = new OrganizationRunEventEntity($this, null);
            }
            return $this->_organization_run_event;
        }
        return new OrganizationRunEventEntity($this, $data);
    }


    private $_organization_run_outcome = null;

    // Canonical facade: $client->OrganizationRunOutcome()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_run_outcome()
    // resolves here too.
    public function OrganizationRunOutcome($data = null)
    {
        require_once __DIR__ . '/entity/organization_run_outcome_entity.php';
        if ($data === null) {
            if ($this->_organization_run_outcome === null) {
                $this->_organization_run_outcome = new OrganizationRunOutcomeEntity($this, null);
            }
            return $this->_organization_run_outcome;
        }
        return new OrganizationRunOutcomeEntity($this, $data);
    }


    private $_organization_run_usage = null;

    // Canonical facade: $client->OrganizationRunUsage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_run_usage()
    // resolves here too.
    public function OrganizationRunUsage($data = null)
    {
        require_once __DIR__ . '/entity/organization_run_usage_entity.php';
        if ($data === null) {
            if ($this->_organization_run_usage === null) {
                $this->_organization_run_usage = new OrganizationRunUsageEntity($this, null);
            }
            return $this->_organization_run_usage;
        }
        return new OrganizationRunUsageEntity($this, $data);
    }


    private $_organization_sandbox = null;

    // Canonical facade: $client->OrganizationSandbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_sandbox()
    // resolves here too.
    public function OrganizationSandbox($data = null)
    {
        require_once __DIR__ . '/entity/organization_sandbox_entity.php';
        if ($data === null) {
            if ($this->_organization_sandbox === null) {
                $this->_organization_sandbox = new OrganizationSandboxEntity($this, null);
            }
            return $this->_organization_sandbox;
        }
        return new OrganizationSandboxEntity($this, $data);
    }


    private $_organization_secret = null;

    // Canonical facade: $client->OrganizationSecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_secret()
    // resolves here too.
    public function OrganizationSecret($data = null)
    {
        require_once __DIR__ . '/entity/organization_secret_entity.php';
        if ($data === null) {
            if ($this->_organization_secret === null) {
                $this->_organization_secret = new OrganizationSecretEntity($this, null);
            }
            return $this->_organization_secret;
        }
        return new OrganizationSecretEntity($this, $data);
    }


    private $_organization_service_account = null;

    // Canonical facade: $client->OrganizationServiceAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_service_account()
    // resolves here too.
    public function OrganizationServiceAccount($data = null)
    {
        require_once __DIR__ . '/entity/organization_service_account_entity.php';
        if ($data === null) {
            if ($this->_organization_service_account === null) {
                $this->_organization_service_account = new OrganizationServiceAccountEntity($this, null);
            }
            return $this->_organization_service_account;
        }
        return new OrganizationServiceAccountEntity($this, $data);
    }


    private $_organization_setting = null;

    // Canonical facade: $client->OrganizationSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_setting()
    // resolves here too.
    public function OrganizationSetting($data = null)
    {
        require_once __DIR__ . '/entity/organization_setting_entity.php';
        if ($data === null) {
            if ($this->_organization_setting === null) {
                $this->_organization_setting = new OrganizationSettingEntity($this, null);
            }
            return $this->_organization_setting;
        }
        return new OrganizationSettingEntity($this, $data);
    }


    private $_organization_site = null;

    // Canonical facade: $client->OrganizationSite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_site()
    // resolves here too.
    public function OrganizationSite($data = null)
    {
        require_once __DIR__ . '/entity/organization_site_entity.php';
        if ($data === null) {
            if ($this->_organization_site === null) {
                $this->_organization_site = new OrganizationSiteEntity($this, null);
            }
            return $this->_organization_site;
        }
        return new OrganizationSiteEntity($this, $data);
    }


    private $_organization_subscription = null;

    // Canonical facade: $client->OrganizationSubscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_subscription()
    // resolves here too.
    public function OrganizationSubscription($data = null)
    {
        require_once __DIR__ . '/entity/organization_subscription_entity.php';
        if ($data === null) {
            if ($this->_organization_subscription === null) {
                $this->_organization_subscription = new OrganizationSubscriptionEntity($this, null);
            }
            return $this->_organization_subscription;
        }
        return new OrganizationSubscriptionEntity($this, $data);
    }


    private $_organization_tool = null;

    // Canonical facade: $client->OrganizationTool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_tool()
    // resolves here too.
    public function OrganizationTool($data = null)
    {
        require_once __DIR__ . '/entity/organization_tool_entity.php';
        if ($data === null) {
            if ($this->_organization_tool === null) {
                $this->_organization_tool = new OrganizationToolEntity($this, null);
            }
            return $this->_organization_tool;
        }
        return new OrganizationToolEntity($this, $data);
    }


    private $_organization_workload_identity = null;

    // Canonical facade: $client->OrganizationWorkloadIdentity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_workload_identity()
    // resolves here too.
    public function OrganizationWorkloadIdentity($data = null)
    {
        require_once __DIR__ . '/entity/organization_workload_identity_entity.php';
        if ($data === null) {
            if ($this->_organization_workload_identity === null) {
                $this->_organization_workload_identity = new OrganizationWorkloadIdentityEntity($this, null);
            }
            return $this->_organization_workload_identity;
        }
        return new OrganizationWorkloadIdentityEntity($this, $data);
    }


    private $_otel_ingest = null;

    // Canonical facade: $client->OtelIngest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->otel_ingest()
    // resolves here too.
    public function OtelIngest($data = null)
    {
        require_once __DIR__ . '/entity/otel_ingest_entity.php';
        if ($data === null) {
            if ($this->_otel_ingest === null) {
                $this->_otel_ingest = new OtelIngestEntity($this, null);
            }
            return $this->_otel_ingest;
        }
        return new OtelIngestEntity($this, $data);
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


    private $_page_artefact = null;

    // Canonical facade: $client->PageArtefact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page_artefact()
    // resolves here too.
    public function PageArtefact($data = null)
    {
        require_once __DIR__ . '/entity/page_artefact_entity.php';
        if ($data === null) {
            if ($this->_page_artefact === null) {
                $this->_page_artefact = new PageArtefactEntity($this, null);
            }
            return $this->_page_artefact;
        }
        return new PageArtefactEntity($this, $data);
    }


    private $_page_ci_pipeline_run = null;

    // Canonical facade: $client->PageCiPipelineRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page_ci_pipeline_run()
    // resolves here too.
    public function PageCiPipelineRun($data = null)
    {
        require_once __DIR__ . '/entity/page_ci_pipeline_run_entity.php';
        if ($data === null) {
            if ($this->_page_ci_pipeline_run === null) {
                $this->_page_ci_pipeline_run = new PageCiPipelineRunEntity($this, null);
            }
            return $this->_page_ci_pipeline_run;
        }
        return new PageCiPipelineRunEntity($this, $data);
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


    private $_page_repo_vc_commit = null;

    // Canonical facade: $client->PageRepoVcCommit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->page_repo_vc_commit()
    // resolves here too.
    public function PageRepoVcCommit($data = null)
    {
        require_once __DIR__ . '/entity/page_repo_vc_commit_entity.php';
        if ($data === null) {
            if ($this->_page_repo_vc_commit === null) {
                $this->_page_repo_vc_commit = new PageRepoVcCommitEntity($this, null);
            }
            return $this->_page_repo_vc_commit;
        }
        return new PageRepoVcCommitEntity($this, $data);
    }


    private $_pages_billing = null;

    // Canonical facade: $client->PagesBilling()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_billing()
    // resolves here too.
    public function PagesBilling($data = null)
    {
        require_once __DIR__ . '/entity/pages_billing_entity.php';
        if ($data === null) {
            if ($this->_pages_billing === null) {
                $this->_pages_billing = new PagesBillingEntity($this, null);
            }
            return $this->_pages_billing;
        }
        return new PagesBillingEntity($this, $data);
    }


    private $_pages_github_onboarding = null;

    // Canonical facade: $client->PagesGithubOnboarding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_github_onboarding()
    // resolves here too.
    public function PagesGithubOnboarding($data = null)
    {
        require_once __DIR__ . '/entity/pages_github_onboarding_entity.php';
        if ($data === null) {
            if ($this->_pages_github_onboarding === null) {
                $this->_pages_github_onboarding = new PagesGithubOnboardingEntity($this, null);
            }
            return $this->_pages_github_onboarding;
        }
        return new PagesGithubOnboardingEntity($this, $data);
    }


    private $_pages_member = null;

    // Canonical facade: $client->PagesMember()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_member()
    // resolves here too.
    public function PagesMember($data = null)
    {
        require_once __DIR__ . '/entity/pages_member_entity.php';
        if ($data === null) {
            if ($this->_pages_member === null) {
                $this->_pages_member = new PagesMemberEntity($this, null);
            }
            return $this->_pages_member;
        }
        return new PagesMemberEntity($this, $data);
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


    private $_pages_registry = null;

    // Canonical facade: $client->PagesRegistry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_registry()
    // resolves here too.
    public function PagesRegistry($data = null)
    {
        require_once __DIR__ . '/entity/pages_registry_entity.php';
        if ($data === null) {
            if ($this->_pages_registry === null) {
                $this->_pages_registry = new PagesRegistryEntity($this, null);
            }
            return $this->_pages_registry;
        }
        return new PagesRegistryEntity($this, $data);
    }


    private $_pages_session = null;

    // Canonical facade: $client->PagesSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pages_session()
    // resolves here too.
    public function PagesSession($data = null)
    {
        require_once __DIR__ . '/entity/pages_session_entity.php';
        if ($data === null) {
            if ($this->_pages_session === null) {
                $this->_pages_session = new PagesSessionEntity($this, null);
            }
            return $this->_pages_session;
        }
        return new PagesSessionEntity($this, $data);
    }


    private $_pairing = null;

    // Canonical facade: $client->Pairing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pairing()
    // resolves here too.
    public function Pairing($data = null)
    {
        require_once __DIR__ . '/entity/pairing_entity.php';
        if ($data === null) {
            if ($this->_pairing === null) {
                $this->_pairing = new PairingEntity($this, null);
            }
            return $this->_pairing;
        }
        return new PairingEntity($this, $data);
    }


    private $_pairing_event = null;

    // Canonical facade: $client->PairingEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pairing_event()
    // resolves here too.
    public function PairingEvent($data = null)
    {
        require_once __DIR__ . '/entity/pairing_event_entity.php';
        if ($data === null) {
            if ($this->_pairing_event === null) {
                $this->_pairing_event = new PairingEventEntity($this, null);
            }
            return $this->_pairing_event;
        }
        return new PairingEventEntity($this, $data);
    }


    private $_parallel_v1 = null;

    // Canonical facade: $client->ParallelV1()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->parallel_v1()
    // resolves here too.
    public function ParallelV1($data = null)
    {
        require_once __DIR__ . '/entity/parallel_v1_entity.php';
        if ($data === null) {
            if ($this->_parallel_v1 === null) {
                $this->_parallel_v1 = new ParallelV1Entity($this, null);
            }
            return $this->_parallel_v1;
        }
        return new ParallelV1Entity($this, $data);
    }


    private $_patchset_diff = null;

    // Canonical facade: $client->PatchsetDiff()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->patchset_diff()
    // resolves here too.
    public function PatchsetDiff($data = null)
    {
        require_once __DIR__ . '/entity/patchset_diff_entity.php';
        if ($data === null) {
            if ($this->_patchset_diff === null) {
                $this->_patchset_diff = new PatchsetDiffEntity($this, null);
            }
            return $this->_patchset_diff;
        }
        return new PatchsetDiffEntity($this, $data);
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


    private $_proactive_agent_waitlist_entry = null;

    // Canonical facade: $client->ProactiveAgentWaitlistEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->proactive_agent_waitlist_entry()
    // resolves here too.
    public function ProactiveAgentWaitlistEntry($data = null)
    {
        require_once __DIR__ . '/entity/proactive_agent_waitlist_entry_entity.php';
        if ($data === null) {
            if ($this->_proactive_agent_waitlist_entry === null) {
                $this->_proactive_agent_waitlist_entry = new ProactiveAgentWaitlistEntryEntity($this, null);
            }
            return $this->_proactive_agent_waitlist_entry;
        }
        return new ProactiveAgentWaitlistEntryEntity($this, $data);
    }


    private $_product = null;

    // Canonical facade: $client->Product()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->product()
    // resolves here too.
    public function Product($data = null)
    {
        require_once __DIR__ . '/entity/product_entity.php';
        if ($data === null) {
            if ($this->_product === null) {
                $this->_product = new ProductEntity($this, null);
            }
            return $this->_product;
        }
        return new ProductEntity($this, $data);
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


    private $_pull_request_action = null;

    // Canonical facade: $client->PullRequestAction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_action()
    // resolves here too.
    public function PullRequestAction($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_action_entity.php';
        if ($data === null) {
            if ($this->_pull_request_action === null) {
                $this->_pull_request_action = new PullRequestActionEntity($this, null);
            }
            return $this->_pull_request_action;
        }
        return new PullRequestActionEntity($this, $data);
    }


    private $_pull_request_magic_merge = null;

    // Canonical facade: $client->PullRequestMagicMerge()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_magic_merge()
    // resolves here too.
    public function PullRequestMagicMerge($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_magic_merge_entity.php';
        if ($data === null) {
            if ($this->_pull_request_magic_merge === null) {
                $this->_pull_request_magic_merge = new PullRequestMagicMergeEntity($this, null);
            }
            return $this->_pull_request_magic_merge;
        }
        return new PullRequestMagicMergeEntity($this, $data);
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


    private $_pull_request_transcript = null;

    // Canonical facade: $client->PullRequestTranscript()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_request_transcript()
    // resolves here too.
    public function PullRequestTranscript($data = null)
    {
        require_once __DIR__ . '/entity/pull_request_transcript_entity.php';
        if ($data === null) {
            if ($this->_pull_request_transcript === null) {
                $this->_pull_request_transcript = new PullRequestTranscriptEntity($this, null);
            }
            return $this->_pull_request_transcript;
        }
        return new PullRequestTranscriptEntity($this, $data);
    }


    private $_pull_zone = null;

    // Canonical facade: $client->PullZone()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pull_zone()
    // resolves here too.
    public function PullZone($data = null)
    {
        require_once __DIR__ . '/entity/pull_zone_entity.php';
        if ($data === null) {
            if ($this->_pull_zone === null) {
                $this->_pull_zone = new PullZoneEntity($this, null);
            }
            return $this->_pull_zone;
        }
        return new PullZoneEntity($this, $data);
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


    private $_relay_agent_connection = null;

    // Canonical facade: $client->RelayAgentConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->relay_agent_connection()
    // resolves here too.
    public function RelayAgentConnection($data = null)
    {
        require_once __DIR__ . '/entity/relay_agent_connection_entity.php';
        if ($data === null) {
            if ($this->_relay_agent_connection === null) {
                $this->_relay_agent_connection = new RelayAgentConnectionEntity($this, null);
            }
            return $this->_relay_agent_connection;
        }
        return new RelayAgentConnectionEntity($this, $data);
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


    private $_relay_signal = null;

    // Canonical facade: $client->RelaySignal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->relay_signal()
    // resolves here too.
    public function RelaySignal($data = null)
    {
        require_once __DIR__ . '/entity/relay_signal_entity.php';
        if ($data === null) {
            if ($this->_relay_signal === null) {
                $this->_relay_signal = new RelaySignalEntity($this, null);
            }
            return $this->_relay_signal;
        }
        return new RelaySignalEntity($this, $data);
    }


    private $_release_rollout = null;

    // Canonical facade: $client->ReleaseRollout()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->release_rollout()
    // resolves here too.
    public function ReleaseRollout($data = null)
    {
        require_once __DIR__ . '/entity/release_rollout_entity.php';
        if ($data === null) {
            if ($this->_release_rollout === null) {
                $this->_release_rollout = new ReleaseRolloutEntity($this, null);
            }
            return $this->_release_rollout;
        }
        return new ReleaseRolloutEntity($this, $data);
    }


    private $_repo = null;

    // Canonical facade: $client->Repo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo()
    // resolves here too.
    public function Repo($data = null)
    {
        require_once __DIR__ . '/entity/repo_entity.php';
        if ($data === null) {
            if ($this->_repo === null) {
                $this->_repo = new RepoEntity($this, null);
            }
            return $this->_repo;
        }
        return new RepoEntity($this, $data);
    }


    private $_repo_access_token = null;

    // Canonical facade: $client->RepoAccessToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_access_token()
    // resolves here too.
    public function RepoAccessToken($data = null)
    {
        require_once __DIR__ . '/entity/repo_access_token_entity.php';
        if ($data === null) {
            if ($this->_repo_access_token === null) {
                $this->_repo_access_token = new RepoAccessTokenEntity($this, null);
            }
            return $this->_repo_access_token;
        }
        return new RepoAccessTokenEntity($this, $data);
    }


    private $_repo_action = null;

    // Canonical facade: $client->RepoAction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_action()
    // resolves here too.
    public function RepoAction($data = null)
    {
        require_once __DIR__ . '/entity/repo_action_entity.php';
        if ($data === null) {
            if ($this->_repo_action === null) {
                $this->_repo_action = new RepoActionEntity($this, null);
            }
            return $this->_repo_action;
        }
        return new RepoActionEntity($this, $data);
    }


    private $_repo_agent_checkpoint = null;

    // Canonical facade: $client->RepoAgentCheckpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_agent_checkpoint()
    // resolves here too.
    public function RepoAgentCheckpoint($data = null)
    {
        require_once __DIR__ . '/entity/repo_agent_checkpoint_entity.php';
        if ($data === null) {
            if ($this->_repo_agent_checkpoint === null) {
                $this->_repo_agent_checkpoint = new RepoAgentCheckpointEntity($this, null);
            }
            return $this->_repo_agent_checkpoint;
        }
        return new RepoAgentCheckpointEntity($this, $data);
    }


    private $_repo_agent_session = null;

    // Canonical facade: $client->RepoAgentSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_agent_session()
    // resolves here too.
    public function RepoAgentSession($data = null)
    {
        require_once __DIR__ . '/entity/repo_agent_session_entity.php';
        if ($data === null) {
            if ($this->_repo_agent_session === null) {
                $this->_repo_agent_session = new RepoAgentSessionEntity($this, null);
            }
            return $this->_repo_agent_session;
        }
        return new RepoAgentSessionEntity($this, $data);
    }


    private $_repo_bookmark_protection = null;

    // Canonical facade: $client->RepoBookmarkProtection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_bookmark_protection()
    // resolves here too.
    public function RepoBookmarkProtection($data = null)
    {
        require_once __DIR__ . '/entity/repo_bookmark_protection_entity.php';
        if ($data === null) {
            if ($this->_repo_bookmark_protection === null) {
                $this->_repo_bookmark_protection = new RepoBookmarkProtectionEntity($this, null);
            }
            return $this->_repo_bookmark_protection;
        }
        return new RepoBookmarkProtectionEntity($this, $data);
    }


    private $_repo_bookmark_protection_event = null;

    // Canonical facade: $client->RepoBookmarkProtectionEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_bookmark_protection_event()
    // resolves here too.
    public function RepoBookmarkProtectionEvent($data = null)
    {
        require_once __DIR__ . '/entity/repo_bookmark_protection_event_entity.php';
        if ($data === null) {
            if ($this->_repo_bookmark_protection_event === null) {
                $this->_repo_bookmark_protection_event = new RepoBookmarkProtectionEventEntity($this, null);
            }
            return $this->_repo_bookmark_protection_event;
        }
        return new RepoBookmarkProtectionEventEntity($this, $data);
    }


    private $_repo_cloud_workspace_backup = null;

    // Canonical facade: $client->RepoCloudWorkspaceBackup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_cloud_workspace_backup()
    // resolves here too.
    public function RepoCloudWorkspaceBackup($data = null)
    {
        require_once __DIR__ . '/entity/repo_cloud_workspace_backup_entity.php';
        if ($data === null) {
            if ($this->_repo_cloud_workspace_backup === null) {
                $this->_repo_cloud_workspace_backup = new RepoCloudWorkspaceBackupEntity($this, null);
            }
            return $this->_repo_cloud_workspace_backup;
        }
        return new RepoCloudWorkspaceBackupEntity($this, $data);
    }


    private $_repo_code_rule = null;

    // Canonical facade: $client->RepoCodeRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_code_rule()
    // resolves here too.
    public function RepoCodeRule($data = null)
    {
        require_once __DIR__ . '/entity/repo_code_rule_entity.php';
        if ($data === null) {
            if ($this->_repo_code_rule === null) {
                $this->_repo_code_rule = new RepoCodeRuleEntity($this, null);
            }
            return $this->_repo_code_rule;
        }
        return new RepoCodeRuleEntity($this, $data);
    }


    private $_repo_setting = null;

    // Canonical facade: $client->RepoSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_setting()
    // resolves here too.
    public function RepoSetting($data = null)
    {
        require_once __DIR__ . '/entity/repo_setting_entity.php';
        if ($data === null) {
            if ($this->_repo_setting === null) {
                $this->_repo_setting = new RepoSettingEntity($this, null);
            }
            return $this->_repo_setting;
        }
        return new RepoSettingEntity($this, $data);
    }


    private $_repo_stat = null;

    // Canonical facade: $client->RepoStat()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_stat()
    // resolves here too.
    public function RepoStat($data = null)
    {
        require_once __DIR__ . '/entity/repo_stat_entity.php';
        if ($data === null) {
            if ($this->_repo_stat === null) {
                $this->_repo_stat = new RepoStatEntity($this, null);
            }
            return $this->_repo_stat;
        }
        return new RepoStatEntity($this, $data);
    }


    private $_repo_vc = null;

    // Canonical facade: $client->RepoVc()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_vc()
    // resolves here too.
    public function RepoVc($data = null)
    {
        require_once __DIR__ . '/entity/repo_vc_entity.php';
        if ($data === null) {
            if ($this->_repo_vc === null) {
                $this->_repo_vc = new RepoVcEntity($this, null);
            }
            return $this->_repo_vc;
        }
        return new RepoVcEntity($this, $data);
    }


    private $_repo_vc_commit = null;

    // Canonical facade: $client->RepoVcCommit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repo_vc_commit()
    // resolves here too.
    public function RepoVcCommit($data = null)
    {
        require_once __DIR__ . '/entity/repo_vc_commit_entity.php';
        if ($data === null) {
            if ($this->_repo_vc_commit === null) {
                $this->_repo_vc_commit = new RepoVcCommitEntity($this, null);
            }
            return $this->_repo_vc_commit;
        }
        return new RepoVcCommitEntity($this, $data);
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


    private $_repository_access = null;

    // Canonical facade: $client->RepositoryAccess()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_access()
    // resolves here too.
    public function RepositoryAccess($data = null)
    {
        require_once __DIR__ . '/entity/repository_access_entity.php';
        if ($data === null) {
            if ($this->_repository_access === null) {
                $this->_repository_access = new RepositoryAccessEntity($this, null);
            }
            return $this->_repository_access;
        }
        return new RepositoryAccessEntity($this, $data);
    }


    private $_repository_access_resolve = null;

    // Canonical facade: $client->RepositoryAccessResolve()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_access_resolve()
    // resolves here too.
    public function RepositoryAccessResolve($data = null)
    {
        require_once __DIR__ . '/entity/repository_access_resolve_entity.php';
        if ($data === null) {
            if ($this->_repository_access_resolve === null) {
                $this->_repository_access_resolve = new RepositoryAccessResolveEntity($this, null);
            }
            return $this->_repository_access_resolve;
        }
        return new RepositoryAccessResolveEntity($this, $data);
    }


    private $_repository_event = null;

    // Canonical facade: $client->RepositoryEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_event()
    // resolves here too.
    public function RepositoryEvent($data = null)
    {
        require_once __DIR__ . '/entity/repository_event_entity.php';
        if ($data === null) {
            if ($this->_repository_event === null) {
                $this->_repository_event = new RepositoryEventEntity($this, null);
            }
            return $this->_repository_event;
        }
        return new RepositoryEventEntity($this, $data);
    }


    private $_repository_import = null;

    // Canonical facade: $client->RepositoryImport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_import()
    // resolves here too.
    public function RepositoryImport($data = null)
    {
        require_once __DIR__ . '/entity/repository_import_entity.php';
        if ($data === null) {
            if ($this->_repository_import === null) {
                $this->_repository_import = new RepositoryImportEntity($this, null);
            }
            return $this->_repository_import;
        }
        return new RepositoryImportEntity($this, $data);
    }


    private $_repository_import_session = null;

    // Canonical facade: $client->RepositoryImportSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_import_session()
    // resolves here too.
    public function RepositoryImportSession($data = null)
    {
        require_once __DIR__ . '/entity/repository_import_session_entity.php';
        if ($data === null) {
            if ($this->_repository_import_session === null) {
                $this->_repository_import_session = new RepositoryImportSessionEntity($this, null);
            }
            return $this->_repository_import_session;
        }
        return new RepositoryImportSessionEntity($this, $data);
    }


    private $_repository_import_session_repository = null;

    // Canonical facade: $client->RepositoryImportSessionRepository()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_import_session_repository()
    // resolves here too.
    public function RepositoryImportSessionRepository($data = null)
    {
        require_once __DIR__ . '/entity/repository_import_session_repository_entity.php';
        if ($data === null) {
            if ($this->_repository_import_session_repository === null) {
                $this->_repository_import_session_repository = new RepositoryImportSessionRepositoryEntity($this, null);
            }
            return $this->_repository_import_session_repository;
        }
        return new RepositoryImportSessionRepositoryEntity($this, $data);
    }


    private $_repository_import_session_selection = null;

    // Canonical facade: $client->RepositoryImportSessionSelection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_import_session_selection()
    // resolves here too.
    public function RepositoryImportSessionSelection($data = null)
    {
        require_once __DIR__ . '/entity/repository_import_session_selection_entity.php';
        if ($data === null) {
            if ($this->_repository_import_session_selection === null) {
                $this->_repository_import_session_selection = new RepositoryImportSessionSelectionEntity($this, null);
            }
            return $this->_repository_import_session_selection;
        }
        return new RepositoryImportSessionSelectionEntity($this, $data);
    }


    private $_repository_sandbox_environment = null;

    // Canonical facade: $client->RepositorySandboxEnvironment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->repository_sandbox_environment()
    // resolves here too.
    public function RepositorySandboxEnvironment($data = null)
    {
        require_once __DIR__ . '/entity/repository_sandbox_environment_entity.php';
        if ($data === null) {
            if ($this->_repository_sandbox_environment === null) {
                $this->_repository_sandbox_environment = new RepositorySandboxEnvironmentEntity($this, null);
            }
            return $this->_repository_sandbox_environment;
        }
        return new RepositorySandboxEnvironmentEntity($this, $data);
    }


    private $_roder_code_repair = null;

    // Canonical facade: $client->RoderCodeRepair()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roder_code_repair()
    // resolves here too.
    public function RoderCodeRepair($data = null)
    {
        require_once __DIR__ . '/entity/roder_code_repair_entity.php';
        if ($data === null) {
            if ($this->_roder_code_repair === null) {
                $this->_roder_code_repair = new RoderCodeRepairEntity($this, null);
            }
            return $this->_roder_code_repair;
        }
        return new RoderCodeRepairEntity($this, $data);
    }


    private $_roder_code_repair_setting = null;

    // Canonical facade: $client->RoderCodeRepairSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roder_code_repair_setting()
    // resolves here too.
    public function RoderCodeRepairSetting($data = null)
    {
        require_once __DIR__ . '/entity/roder_code_repair_setting_entity.php';
        if ($data === null) {
            if ($this->_roder_code_repair_setting === null) {
                $this->_roder_code_repair_setting = new RoderCodeRepairSettingEntity($this, null);
            }
            return $this->_roder_code_repair_setting;
        }
        return new RoderCodeRepairSettingEntity($this, $data);
    }


    private $_roder_machine = null;

    // Canonical facade: $client->RoderMachine()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roder_machine()
    // resolves here too.
    public function RoderMachine($data = null)
    {
        require_once __DIR__ . '/entity/roder_machine_entity.php';
        if ($data === null) {
            if ($this->_roder_machine === null) {
                $this->_roder_machine = new RoderMachineEntity($this, null);
            }
            return $this->_roder_machine;
        }
        return new RoderMachineEntity($this, $data);
    }


    private $_roder_run = null;

    // Canonical facade: $client->RoderRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roder_run()
    // resolves here too.
    public function RoderRun($data = null)
    {
        require_once __DIR__ . '/entity/roder_run_entity.php';
        if ($data === null) {
            if ($this->_roder_run === null) {
                $this->_roder_run = new RoderRunEntity($this, null);
            }
            return $this->_roder_run;
        }
        return new RoderRunEntity($this, $data);
    }


    private $_roder_workspace_credential = null;

    // Canonical facade: $client->RoderWorkspaceCredential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roder_workspace_credential()
    // resolves here too.
    public function RoderWorkspaceCredential($data = null)
    {
        require_once __DIR__ . '/entity/roder_workspace_credential_entity.php';
        if ($data === null) {
            if ($this->_roder_workspace_credential === null) {
                $this->_roder_workspace_credential = new RoderWorkspaceCredentialEntity($this, null);
            }
            return $this->_roder_workspace_credential;
        }
        return new RoderWorkspaceCredentialEntity($this, $data);
    }


    private $_run_artifact = null;

    // Canonical facade: $client->RunArtifact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_artifact()
    // resolves here too.
    public function RunArtifact($data = null)
    {
        require_once __DIR__ . '/entity/run_artifact_entity.php';
        if ($data === null) {
            if ($this->_run_artifact === null) {
                $this->_run_artifact = new RunArtifactEntity($this, null);
            }
            return $this->_run_artifact;
        }
        return new RunArtifactEntity($this, $data);
    }


    private $_run_job = null;

    // Canonical facade: $client->RunJob()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_job()
    // resolves here too.
    public function RunJob($data = null)
    {
        require_once __DIR__ . '/entity/run_job_entity.php';
        if ($data === null) {
            if ($this->_run_job === null) {
                $this->_run_job = new RunJobEntity($this, null);
            }
            return $this->_run_job;
        }
        return new RunJobEntity($this, $data);
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


    private $_run_workspace_credential = null;

    // Canonical facade: $client->RunWorkspaceCredential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->run_workspace_credential()
    // resolves here too.
    public function RunWorkspaceCredential($data = null)
    {
        require_once __DIR__ . '/entity/run_workspace_credential_entity.php';
        if ($data === null) {
            if ($this->_run_workspace_credential === null) {
                $this->_run_workspace_credential = new RunWorkspaceCredentialEntity($this, null);
            }
            return $this->_run_workspace_credential;
        }
        return new RunWorkspaceCredentialEntity($this, $data);
    }


    private $_runner_lease = null;

    // Canonical facade: $client->RunnerLease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->runner_lease()
    // resolves here too.
    public function RunnerLease($data = null)
    {
        require_once __DIR__ . '/entity/runner_lease_entity.php';
        if ($data === null) {
            if ($this->_runner_lease === null) {
                $this->_runner_lease = new RunnerLeaseEntity($this, null);
            }
            return $this->_runner_lease;
        }
        return new RunnerLeaseEntity($this, $data);
    }


    private $_runner_pool_node_enrollment_token = null;

    // Canonical facade: $client->RunnerPoolNodeEnrollmentToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->runner_pool_node_enrollment_token()
    // resolves here too.
    public function RunnerPoolNodeEnrollmentToken($data = null)
    {
        require_once __DIR__ . '/entity/runner_pool_node_enrollment_token_entity.php';
        if ($data === null) {
            if ($this->_runner_pool_node_enrollment_token === null) {
                $this->_runner_pool_node_enrollment_token = new RunnerPoolNodeEnrollmentTokenEntity($this, null);
            }
            return $this->_runner_pool_node_enrollment_token;
        }
        return new RunnerPoolNodeEnrollmentTokenEntity($this, $data);
    }


    private $_runner_pool_runner = null;

    // Canonical facade: $client->RunnerPoolRunner()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->runner_pool_runner()
    // resolves here too.
    public function RunnerPoolRunner($data = null)
    {
        require_once __DIR__ . '/entity/runner_pool_runner_entity.php';
        if ($data === null) {
            if ($this->_runner_pool_runner === null) {
                $this->_runner_pool_runner = new RunnerPoolRunnerEntity($this, null);
            }
            return $this->_runner_pool_runner;
        }
        return new RunnerPoolRunnerEntity($this, $data);
    }


    private $_runtime_instance_health_snapshot = null;

    // Canonical facade: $client->RuntimeInstanceHealthSnapshot()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->runtime_instance_health_snapshot()
    // resolves here too.
    public function RuntimeInstanceHealthSnapshot($data = null)
    {
        require_once __DIR__ . '/entity/runtime_instance_health_snapshot_entity.php';
        if ($data === null) {
            if ($this->_runtime_instance_health_snapshot === null) {
                $this->_runtime_instance_health_snapshot = new RuntimeInstanceHealthSnapshotEntity($this, null);
            }
            return $this->_runtime_instance_health_snapshot;
        }
        return new RuntimeInstanceHealthSnapshotEntity($this, $data);
    }


    private $_sandbox_integration = null;

    // Canonical facade: $client->SandboxIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sandbox_integration()
    // resolves here too.
    public function SandboxIntegration($data = null)
    {
        require_once __DIR__ . '/entity/sandbox_integration_entity.php';
        if ($data === null) {
            if ($this->_sandbox_integration === null) {
                $this->_sandbox_integration = new SandboxIntegrationEntity($this, null);
            }
            return $this->_sandbox_integration;
        }
        return new SandboxIntegrationEntity($this, $data);
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


    private $_secret_grant = null;

    // Canonical facade: $client->SecretGrant()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->secret_grant()
    // resolves here too.
    public function SecretGrant($data = null)
    {
        require_once __DIR__ . '/entity/secret_grant_entity.php';
        if ($data === null) {
            if ($this->_secret_grant === null) {
                $this->_secret_grant = new SecretGrantEntity($this, null);
            }
            return $this->_secret_grant;
        }
        return new SecretGrantEntity($this, $data);
    }


    private $_secret_version = null;

    // Canonical facade: $client->SecretVersion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->secret_version()
    // resolves here too.
    public function SecretVersion($data = null)
    {
        require_once __DIR__ . '/entity/secret_version_entity.php';
        if ($data === null) {
            if ($this->_secret_version === null) {
                $this->_secret_version = new SecretVersionEntity($this, null);
            }
            return $this->_secret_version;
        }
        return new SecretVersionEntity($this, $data);
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


    private $_setting = null;

    // Canonical facade: $client->Setting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->setting()
    // resolves here too.
    public function Setting($data = null)
    {
        require_once __DIR__ . '/entity/setting_entity.php';
        if ($data === null) {
            if ($this->_setting === null) {
                $this->_setting = new SettingEntity($this, null);
            }
            return $this->_setting;
        }
        return new SettingEntity($this, $data);
    }


    private $_setting_mutation_lease = null;

    // Canonical facade: $client->SettingMutationLease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->setting_mutation_lease()
    // resolves here too.
    public function SettingMutationLease($data = null)
    {
        require_once __DIR__ . '/entity/setting_mutation_lease_entity.php';
        if ($data === null) {
            if ($this->_setting_mutation_lease === null) {
                $this->_setting_mutation_lease = new SettingMutationLeaseEntity($this, null);
            }
            return $this->_setting_mutation_lease;
        }
        return new SettingMutationLeaseEntity($this, $data);
    }


    private $_signal = null;

    // Canonical facade: $client->Signal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal()
    // resolves here too.
    public function Signal($data = null)
    {
        require_once __DIR__ . '/entity/signal_entity.php';
        if ($data === null) {
            if ($this->_signal === null) {
                $this->_signal = new SignalEntity($this, null);
            }
            return $this->_signal;
        }
        return new SignalEntity($this, $data);
    }


    private $_signal_inbound = null;

    // Canonical facade: $client->SignalInbound()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal_inbound()
    // resolves here too.
    public function SignalInbound($data = null)
    {
        require_once __DIR__ . '/entity/signal_inbound_entity.php';
        if ($data === null) {
            if ($this->_signal_inbound === null) {
                $this->_signal_inbound = new SignalInboundEntity($this, null);
            }
            return $this->_signal_inbound;
        }
        return new SignalInboundEntity($this, $data);
    }


    private $_signal_integration = null;

    // Canonical facade: $client->SignalIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal_integration()
    // resolves here too.
    public function SignalIntegration($data = null)
    {
        require_once __DIR__ . '/entity/signal_integration_entity.php';
        if ($data === null) {
            if ($this->_signal_integration === null) {
                $this->_signal_integration = new SignalIntegrationEntity($this, null);
            }
            return $this->_signal_integration;
        }
        return new SignalIntegrationEntity($this, $data);
    }


    private $_signal_integration_delivery = null;

    // Canonical facade: $client->SignalIntegrationDelivery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal_integration_delivery()
    // resolves here too.
    public function SignalIntegrationDelivery($data = null)
    {
        require_once __DIR__ . '/entity/signal_integration_delivery_entity.php';
        if ($data === null) {
            if ($this->_signal_integration_delivery === null) {
                $this->_signal_integration_delivery = new SignalIntegrationDeliveryEntity($this, null);
            }
            return $this->_signal_integration_delivery;
        }
        return new SignalIntegrationDeliveryEntity($this, $data);
    }


    private $_signal_integration_target = null;

    // Canonical facade: $client->SignalIntegrationTarget()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal_integration_target()
    // resolves here too.
    public function SignalIntegrationTarget($data = null)
    {
        require_once __DIR__ . '/entity/signal_integration_target_entity.php';
        if ($data === null) {
            if ($this->_signal_integration_target === null) {
                $this->_signal_integration_target = new SignalIntegrationTargetEntity($this, null);
            }
            return $this->_signal_integration_target;
        }
        return new SignalIntegrationTargetEntity($this, $data);
    }


    private $_signal_subscription = null;

    // Canonical facade: $client->SignalSubscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->signal_subscription()
    // resolves here too.
    public function SignalSubscription($data = null)
    {
        require_once __DIR__ . '/entity/signal_subscription_entity.php';
        if ($data === null) {
            if ($this->_signal_subscription === null) {
                $this->_signal_subscription = new SignalSubscriptionEntity($this, null);
            }
            return $this->_signal_subscription;
        }
        return new SignalSubscriptionEntity($this, $data);
    }


    private $_site = null;

    // Canonical facade: $client->Site()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->site()
    // resolves here too.
    public function Site($data = null)
    {
        require_once __DIR__ . '/entity/site_entity.php';
        if ($data === null) {
            if ($this->_site === null) {
                $this->_site = new SiteEntity($this, null);
            }
            return $this->_site;
        }
        return new SiteEntity($this, $data);
    }


    private $_site_access_key = null;

    // Canonical facade: $client->SiteAccessKey()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->site_access_key()
    // resolves here too.
    public function SiteAccessKey($data = null)
    {
        require_once __DIR__ . '/entity/site_access_key_entity.php';
        if ($data === null) {
            if ($this->_site_access_key === null) {
                $this->_site_access_key = new SiteAccessKeyEntity($this, null);
            }
            return $this->_site_access_key;
        }
        return new SiteAccessKeyEntity($this, $data);
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


    private $_site_secret = null;

    // Canonical facade: $client->SiteSecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->site_secret()
    // resolves here too.
    public function SiteSecret($data = null)
    {
        require_once __DIR__ . '/entity/site_secret_entity.php';
        if ($data === null) {
            if ($this->_site_secret === null) {
                $this->_site_secret = new SiteSecretEntity($this, null);
            }
            return $this->_site_secret;
        }
        return new SiteSecretEntity($this, $data);
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


    private $_source_connection = null;

    // Canonical facade: $client->SourceConnection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->source_connection()
    // resolves here too.
    public function SourceConnection($data = null)
    {
        require_once __DIR__ . '/entity/source_connection_entity.php';
        if ($data === null) {
            if ($this->_source_connection === null) {
                $this->_source_connection = new SourceConnectionEntity($this, null);
            }
            return $this->_source_connection;
        }
        return new SourceConnectionEntity($this, $data);
    }


    private $_space_alert_rule = null;

    // Canonical facade: $client->SpaceAlertRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_alert_rule()
    // resolves here too.
    public function SpaceAlertRule($data = null)
    {
        require_once __DIR__ . '/entity/space_alert_rule_entity.php';
        if ($data === null) {
            if ($this->_space_alert_rule === null) {
                $this->_space_alert_rule = new SpaceAlertRuleEntity($this, null);
            }
            return $this->_space_alert_rule;
        }
        return new SpaceAlertRuleEntity($this, $data);
    }


    private $_space_audit_event = null;

    // Canonical facade: $client->SpaceAuditEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_audit_event()
    // resolves here too.
    public function SpaceAuditEvent($data = null)
    {
        require_once __DIR__ . '/entity/space_audit_event_entity.php';
        if ($data === null) {
            if ($this->_space_audit_event === null) {
                $this->_space_audit_event = new SpaceAuditEventEntity($this, null);
            }
            return $this->_space_audit_event;
        }
        return new SpaceAuditEventEntity($this, $data);
    }


    private $_space_dns_record = null;

    // Canonical facade: $client->SpaceDnsRecord()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_dns_record()
    // resolves here too.
    public function SpaceDnsRecord($data = null)
    {
        require_once __DIR__ . '/entity/space_dns_record_entity.php';
        if ($data === null) {
            if ($this->_space_dns_record === null) {
                $this->_space_dns_record = new SpaceDnsRecordEntity($this, null);
            }
            return $this->_space_dns_record;
        }
        return new SpaceDnsRecordEntity($this, $data);
    }


    private $_space_enrollment_token = null;

    // Canonical facade: $client->SpaceEnrollmentToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_enrollment_token()
    // resolves here too.
    public function SpaceEnrollmentToken($data = null)
    {
        require_once __DIR__ . '/entity/space_enrollment_token_entity.php';
        if ($data === null) {
            if ($this->_space_enrollment_token === null) {
                $this->_space_enrollment_token = new SpaceEnrollmentTokenEntity($this, null);
            }
            return $this->_space_enrollment_token;
        }
        return new SpaceEnrollmentTokenEntity($this, $data);
    }


    private $_space_gateway = null;

    // Canonical facade: $client->SpaceGateway()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_gateway()
    // resolves here too.
    public function SpaceGateway($data = null)
    {
        require_once __DIR__ . '/entity/space_gateway_entity.php';
        if ($data === null) {
            if ($this->_space_gateway === null) {
                $this->_space_gateway = new SpaceGatewayEntity($this, null);
            }
            return $this->_space_gateway;
        }
        return new SpaceGatewayEntity($this, $data);
    }


    private $_space_group = null;

    // Canonical facade: $client->SpaceGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_group()
    // resolves here too.
    public function SpaceGroup($data = null)
    {
        require_once __DIR__ . '/entity/space_group_entity.php';
        if ($data === null) {
            if ($this->_space_group === null) {
                $this->_space_group = new SpaceGroupEntity($this, null);
            }
            return $this->_space_group;
        }
        return new SpaceGroupEntity($this, $data);
    }


    private $_space_group_membership = null;

    // Canonical facade: $client->SpaceGroupMembership()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_group_membership()
    // resolves here too.
    public function SpaceGroupMembership($data = null)
    {
        require_once __DIR__ . '/entity/space_group_membership_entity.php';
        if ($data === null) {
            if ($this->_space_group_membership === null) {
                $this->_space_group_membership = new SpaceGroupMembershipEntity($this, null);
            }
            return $this->_space_group_membership;
        }
        return new SpaceGroupMembershipEntity($this, $data);
    }


    private $_space_log_stream = null;

    // Canonical facade: $client->SpaceLogStream()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_log_stream()
    // resolves here too.
    public function SpaceLogStream($data = null)
    {
        require_once __DIR__ . '/entity/space_log_stream_entity.php';
        if ($data === null) {
            if ($this->_space_log_stream === null) {
                $this->_space_log_stream = new SpaceLogStreamEntity($this, null);
            }
            return $this->_space_log_stream;
        }
        return new SpaceLogStreamEntity($this, $data);
    }


    private $_space_metric_sery = null;

    // Canonical facade: $client->SpaceMetricSery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_metric_sery()
    // resolves here too.
    public function SpaceMetricSery($data = null)
    {
        require_once __DIR__ . '/entity/space_metric_sery_entity.php';
        if ($data === null) {
            if ($this->_space_metric_sery === null) {
                $this->_space_metric_sery = new SpaceMetricSeryEntity($this, null);
            }
            return $this->_space_metric_sery;
        }
        return new SpaceMetricSeryEntity($this, $data);
    }


    private $_space_otel_collector = null;

    // Canonical facade: $client->SpaceOtelCollector()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_otel_collector()
    // resolves here too.
    public function SpaceOtelCollector($data = null)
    {
        require_once __DIR__ . '/entity/space_otel_collector_entity.php';
        if ($data === null) {
            if ($this->_space_otel_collector === null) {
                $this->_space_otel_collector = new SpaceOtelCollectorEntity($this, null);
            }
            return $this->_space_otel_collector;
        }
        return new SpaceOtelCollectorEntity($this, $data);
    }


    private $_space_peer = null;

    // Canonical facade: $client->SpacePeer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_peer()
    // resolves here too.
    public function SpacePeer($data = null)
    {
        require_once __DIR__ . '/entity/space_peer_entity.php';
        if ($data === null) {
            if ($this->_space_peer === null) {
                $this->_space_peer = new SpacePeerEntity($this, null);
            }
            return $this->_space_peer;
        }
        return new SpacePeerEntity($this, $data);
    }


    private $_space_peer_attachment = null;

    // Canonical facade: $client->SpacePeerAttachment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_peer_attachment()
    // resolves here too.
    public function SpacePeerAttachment($data = null)
    {
        require_once __DIR__ . '/entity/space_peer_attachment_entity.php';
        if ($data === null) {
            if ($this->_space_peer_attachment === null) {
                $this->_space_peer_attachment = new SpacePeerAttachmentEntity($this, null);
            }
            return $this->_space_peer_attachment;
        }
        return new SpacePeerAttachmentEntity($this, $data);
    }


    private $_space_policy = null;

    // Canonical facade: $client->SpacePolicy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_policy()
    // resolves here too.
    public function SpacePolicy($data = null)
    {
        require_once __DIR__ . '/entity/space_policy_entity.php';
        if ($data === null) {
            if ($this->_space_policy === null) {
                $this->_space_policy = new SpacePolicyEntity($this, null);
            }
            return $this->_space_policy;
        }
        return new SpacePolicyEntity($this, $data);
    }


    private $_space_segment = null;

    // Canonical facade: $client->SpaceSegment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_segment()
    // resolves here too.
    public function SpaceSegment($data = null)
    {
        require_once __DIR__ . '/entity/space_segment_entity.php';
        if ($data === null) {
            if ($this->_space_segment === null) {
                $this->_space_segment = new SpaceSegmentEntity($this, null);
            }
            return $this->_space_segment;
        }
        return new SpaceSegmentEntity($this, $data);
    }


    private $_space_trace_span = null;

    // Canonical facade: $client->SpaceTraceSpan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_trace_span()
    // resolves here too.
    public function SpaceTraceSpan($data = null)
    {
        require_once __DIR__ . '/entity/space_trace_span_entity.php';
        if ($data === null) {
            if ($this->_space_trace_span === null) {
                $this->_space_trace_span = new SpaceTraceSpanEntity($this, null);
            }
            return $this->_space_trace_span;
        }
        return new SpaceTraceSpanEntity($this, $data);
    }


    private $_spark = null;

    // Canonical facade: $client->Spark()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark()
    // resolves here too.
    public function Spark($data = null)
    {
        require_once __DIR__ . '/entity/spark_entity.php';
        if ($data === null) {
            if ($this->_spark === null) {
                $this->_spark = new SparkEntity($this, null);
            }
            return $this->_spark;
        }
        return new SparkEntity($this, $data);
    }


    private $_spark_agent_integration = null;

    // Canonical facade: $client->SparkAgentIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_agent_integration()
    // resolves here too.
    public function SparkAgentIntegration($data = null)
    {
        require_once __DIR__ . '/entity/spark_agent_integration_entity.php';
        if ($data === null) {
            if ($this->_spark_agent_integration === null) {
                $this->_spark_agent_integration = new SparkAgentIntegrationEntity($this, null);
            }
            return $this->_spark_agent_integration;
        }
        return new SparkAgentIntegrationEntity($this, $data);
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


    private $_spark_agent_site = null;

    // Canonical facade: $client->SparkAgentSite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_agent_site()
    // resolves here too.
    public function SparkAgentSite($data = null)
    {
        require_once __DIR__ . '/entity/spark_agent_site_entity.php';
        if ($data === null) {
            if ($this->_spark_agent_site === null) {
                $this->_spark_agent_site = new SparkAgentSiteEntity($this, null);
            }
            return $this->_spark_agent_site;
        }
        return new SparkAgentSiteEntity($this, $data);
    }


    private $_spark_agent_skill = null;

    // Canonical facade: $client->SparkAgentSkill()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_agent_skill()
    // resolves here too.
    public function SparkAgentSkill($data = null)
    {
        require_once __DIR__ . '/entity/spark_agent_skill_entity.php';
        if ($data === null) {
            if ($this->_spark_agent_skill === null) {
                $this->_spark_agent_skill = new SparkAgentSkillEntity($this, null);
            }
            return $this->_spark_agent_skill;
        }
        return new SparkAgentSkillEntity($this, $data);
    }


    private $_spark_agent_thread = null;

    // Canonical facade: $client->SparkAgentThread()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_agent_thread()
    // resolves here too.
    public function SparkAgentThread($data = null)
    {
        require_once __DIR__ . '/entity/spark_agent_thread_entity.php';
        if ($data === null) {
            if ($this->_spark_agent_thread === null) {
                $this->_spark_agent_thread = new SparkAgentThreadEntity($this, null);
            }
            return $this->_spark_agent_thread;
        }
        return new SparkAgentThreadEntity($this, $data);
    }


    private $_spark_credit = null;

    // Canonical facade: $client->SparkCredit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_credit()
    // resolves here too.
    public function SparkCredit($data = null)
    {
        require_once __DIR__ . '/entity/spark_credit_entity.php';
        if ($data === null) {
            if ($this->_spark_credit === null) {
                $this->_spark_credit = new SparkCreditEntity($this, null);
            }
            return $this->_spark_credit;
        }
        return new SparkCreditEntity($this, $data);
    }


    private $_spark_credit_agent_usage = null;

    // Canonical facade: $client->SparkCreditAgentUsage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_credit_agent_usage()
    // resolves here too.
    public function SparkCreditAgentUsage($data = null)
    {
        require_once __DIR__ . '/entity/spark_credit_agent_usage_entity.php';
        if ($data === null) {
            if ($this->_spark_credit_agent_usage === null) {
                $this->_spark_credit_agent_usage = new SparkCreditAgentUsageEntity($this, null);
            }
            return $this->_spark_credit_agent_usage;
        }
        return new SparkCreditAgentUsageEntity($this, $data);
    }


    private $_spark_credit_usage_total = null;

    // Canonical facade: $client->SparkCreditUsageTotal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spark_credit_usage_total()
    // resolves here too.
    public function SparkCreditUsageTotal($data = null)
    {
        require_once __DIR__ . '/entity/spark_credit_usage_total_entity.php';
        if ($data === null) {
            if ($this->_spark_credit_usage_total === null) {
                $this->_spark_credit_usage_total = new SparkCreditUsageTotalEntity($this, null);
            }
            return $this->_spark_credit_usage_total;
        }
        return new SparkCreditUsageTotalEntity($this, $data);
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


    private $_status_change = null;

    // Canonical facade: $client->StatusChange()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->status_change()
    // resolves here too.
    public function StatusChange($data = null)
    {
        require_once __DIR__ . '/entity/status_change_entity.php';
        if ($data === null) {
            if ($this->_status_change === null) {
                $this->_status_change = new StatusChangeEntity($this, null);
            }
            return $this->_status_change;
        }
        return new StatusChangeEntity($this, $data);
    }


    private $_status_commit = null;

    // Canonical facade: $client->StatusCommit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->status_commit()
    // resolves here too.
    public function StatusCommit($data = null)
    {
        require_once __DIR__ . '/entity/status_commit_entity.php';
        if ($data === null) {
            if ($this->_status_commit === null) {
                $this->_status_commit = new StatusCommitEntity($this, null);
            }
            return $this->_status_commit;
        }
        return new StatusCommitEntity($this, $data);
    }


    private $_status_patchset = null;

    // Canonical facade: $client->StatusPatchset()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->status_patchset()
    // resolves here too.
    public function StatusPatchset($data = null)
    {
        require_once __DIR__ . '/entity/status_patchset_entity.php';
        if ($data === null) {
            if ($this->_status_patchset === null) {
                $this->_status_patchset = new StatusPatchsetEntity($this, null);
            }
            return $this->_status_patchset;
        }
        return new StatusPatchsetEntity($this, $data);
    }


    private $_stripe_webhook = null;

    // Canonical facade: $client->StripeWebhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->stripe_webhook()
    // resolves here too.
    public function StripeWebhook($data = null)
    {
        require_once __DIR__ . '/entity/stripe_webhook_entity.php';
        if ($data === null) {
            if ($this->_stripe_webhook === null) {
                $this->_stripe_webhook = new StripeWebhookEntity($this, null);
            }
            return $this->_stripe_webhook;
        }
        return new StripeWebhookEntity($this, $data);
    }


    private $_submit_telemetry = null;

    // Canonical facade: $client->SubmitTelemetry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->submit_telemetry()
    // resolves here too.
    public function SubmitTelemetry($data = null)
    {
        require_once __DIR__ . '/entity/submit_telemetry_entity.php';
        if ($data === null) {
            if ($this->_submit_telemetry === null) {
                $this->_submit_telemetry = new SubmitTelemetryEntity($this, null);
            }
            return $this->_submit_telemetry;
        }
        return new SubmitTelemetryEntity($this, $data);
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


    private $_swarm_event = null;

    // Canonical facade: $client->SwarmEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->swarm_event()
    // resolves here too.
    public function SwarmEvent($data = null)
    {
        require_once __DIR__ . '/entity/swarm_event_entity.php';
        if ($data === null) {
            if ($this->_swarm_event === null) {
                $this->_swarm_event = new SwarmEventEntity($this, null);
            }
            return $this->_swarm_event;
        }
        return new SwarmEventEntity($this, $data);
    }


    private $_swarm_live = null;

    // Canonical facade: $client->SwarmLive()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->swarm_live()
    // resolves here too.
    public function SwarmLive($data = null)
    {
        require_once __DIR__ . '/entity/swarm_live_entity.php';
        if ($data === null) {
            if ($this->_swarm_live === null) {
                $this->_swarm_live = new SwarmLiveEntity($this, null);
            }
            return $this->_swarm_live;
        }
        return new SwarmLiveEntity($this, $data);
    }


    private $_swarm_note = null;

    // Canonical facade: $client->SwarmNote()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->swarm_note()
    // resolves here too.
    public function SwarmNote($data = null)
    {
        require_once __DIR__ . '/entity/swarm_note_entity.php';
        if ($data === null) {
            if ($this->_swarm_note === null) {
                $this->_swarm_note = new SwarmNoteEntity($this, null);
            }
            return $this->_swarm_note;
        }
        return new SwarmNoteEntity($this, $data);
    }


    private $_swarm_task = null;

    // Canonical facade: $client->SwarmTask()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->swarm_task()
    // resolves here too.
    public function SwarmTask($data = null)
    {
        require_once __DIR__ . '/entity/swarm_task_entity.php';
        if ($data === null) {
            if ($this->_swarm_task === null) {
                $this->_swarm_task = new SwarmTaskEntity($this, null);
            }
            return $this->_swarm_task;
        }
        return new SwarmTaskEntity($this, $data);
    }


    private $_task_lease = null;

    // Canonical facade: $client->TaskLease()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->task_lease()
    // resolves here too.
    public function TaskLease($data = null)
    {
        require_once __DIR__ . '/entity/task_lease_entity.php';
        if ($data === null) {
            if ($this->_task_lease === null) {
                $this->_task_lease = new TaskLeaseEntity($this, null);
            }
            return $this->_task_lease;
        }
        return new TaskLeaseEntity($this, $data);
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


    private $_thread_preview_access = null;

    // Canonical facade: $client->ThreadPreviewAccess()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->thread_preview_access()
    // resolves here too.
    public function ThreadPreviewAccess($data = null)
    {
        require_once __DIR__ . '/entity/thread_preview_access_entity.php';
        if ($data === null) {
            if ($this->_thread_preview_access === null) {
                $this->_thread_preview_access = new ThreadPreviewAccessEntity($this, null);
            }
            return $this->_thread_preview_access;
        }
        return new ThreadPreviewAccessEntity($this, $data);
    }


    private $_tool_feedback = null;

    // Canonical facade: $client->ToolFeedback()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tool_feedback()
    // resolves here too.
    public function ToolFeedback($data = null)
    {
        require_once __DIR__ . '/entity/tool_feedback_entity.php';
        if ($data === null) {
            if ($this->_tool_feedback === null) {
                $this->_tool_feedback = new ToolFeedbackEntity($this, null);
            }
            return $this->_tool_feedback;
        }
        return new ToolFeedbackEntity($this, $data);
    }


    private $_transcript = null;

    // Canonical facade: $client->Transcript()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->transcript()
    // resolves here too.
    public function Transcript($data = null)
    {
        require_once __DIR__ . '/entity/transcript_entity.php';
        if ($data === null) {
            if ($this->_transcript === null) {
                $this->_transcript = new TranscriptEntity($this, null);
            }
            return $this->_transcript;
        }
        return new TranscriptEntity($this, $data);
    }


    private $_v1_message = null;

    // Canonical facade: $client->V1Message()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->v1_message()
    // resolves here too.
    public function V1Message($data = null)
    {
        require_once __DIR__ . '/entity/v1_message_entity.php';
        if ($data === null) {
            if ($this->_v1_message === null) {
                $this->_v1_message = new V1MessageEntity($this, null);
            }
            return $this->_v1_message;
        }
        return new V1MessageEntity($this, $data);
    }


    private $_vc_branch = null;

    // Canonical facade: $client->VcBranch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_branch()
    // resolves here too.
    public function VcBranch($data = null)
    {
        require_once __DIR__ . '/entity/vc_branch_entity.php';
        if ($data === null) {
            if ($this->_vc_branch === null) {
                $this->_vc_branch = new VcBranchEntity($this, null);
            }
            return $this->_vc_branch;
        }
        return new VcBranchEntity($this, $data);
    }


    private $_vc_browser = null;

    // Canonical facade: $client->VcBrowser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_browser()
    // resolves here too.
    public function VcBrowser($data = null)
    {
        require_once __DIR__ . '/entity/vc_browser_entity.php';
        if ($data === null) {
            if ($this->_vc_browser === null) {
                $this->_vc_browser = new VcBrowserEntity($this, null);
            }
            return $this->_vc_browser;
        }
        return new VcBrowserEntity($this, $data);
    }


    private $_vc_change = null;

    // Canonical facade: $client->VcChange()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_change()
    // resolves here too.
    public function VcChange($data = null)
    {
        require_once __DIR__ . '/entity/vc_change_entity.php';
        if ($data === null) {
            if ($this->_vc_change === null) {
                $this->_vc_change = new VcChangeEntity($this, null);
            }
            return $this->_vc_change;
        }
        return new VcChangeEntity($this, $data);
    }


    private $_vc_change_group = null;

    // Canonical facade: $client->VcChangeGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_change_group()
    // resolves here too.
    public function VcChangeGroup($data = null)
    {
        require_once __DIR__ . '/entity/vc_change_group_entity.php';
        if ($data === null) {
            if ($this->_vc_change_group === null) {
                $this->_vc_change_group = new VcChangeGroupEntity($this, null);
            }
            return $this->_vc_change_group;
        }
        return new VcChangeGroupEntity($this, $data);
    }


    private $_vc_file = null;

    // Canonical facade: $client->VcFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_file()
    // resolves here too.
    public function VcFile($data = null)
    {
        require_once __DIR__ . '/entity/vc_file_entity.php';
        if ($data === null) {
            if ($this->_vc_file === null) {
                $this->_vc_file = new VcFileEntity($this, null);
            }
            return $this->_vc_file;
        }
        return new VcFileEntity($this, $data);
    }


    private $_vc_merge_queue = null;

    // Canonical facade: $client->VcMergeQueue()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_merge_queue()
    // resolves here too.
    public function VcMergeQueue($data = null)
    {
        require_once __DIR__ . '/entity/vc_merge_queue_entity.php';
        if ($data === null) {
            if ($this->_vc_merge_queue === null) {
                $this->_vc_merge_queue = new VcMergeQueueEntity($this, null);
            }
            return $this->_vc_merge_queue;
        }
        return new VcMergeQueueEntity($this, $data);
    }


    private $_vc_stack = null;

    // Canonical facade: $client->VcStack()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vc_stack()
    // resolves here too.
    public function VcStack($data = null)
    {
        require_once __DIR__ . '/entity/vc_stack_entity.php';
        if ($data === null) {
            if ($this->_vc_stack === null) {
                $this->_vc_stack = new VcStackEntity($this, null);
            }
            return $this->_vc_stack;
        }
        return new VcStackEntity($this, $data);
    }


    private $_vcs_node = null;

    // Canonical facade: $client->VcsNode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vcs_node()
    // resolves here too.
    public function VcsNode($data = null)
    {
        require_once __DIR__ . '/entity/vcs_node_entity.php';
        if ($data === null) {
            if ($this->_vcs_node === null) {
                $this->_vcs_node = new VcsNodeEntity($this, null);
            }
            return $this->_vcs_node;
        }
        return new VcsNodeEntity($this, $data);
    }


    private $_vcs_setting = null;

    // Canonical facade: $client->VcsSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vcs_setting()
    // resolves here too.
    public function VcsSetting($data = null)
    {
        require_once __DIR__ . '/entity/vcs_setting_entity.php';
        if ($data === null) {
            if ($this->_vcs_setting === null) {
                $this->_vcs_setting = new VcsSettingEntity($this, null);
            }
            return $this->_vcs_setting;
        }
        return new VcsSettingEntity($this, $data);
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


    private $_verify_email_verification = null;

    // Canonical facade: $client->VerifyEmailVerification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verify_email_verification()
    // resolves here too.
    public function VerifyEmailVerification($data = null)
    {
        require_once __DIR__ . '/entity/verify_email_verification_entity.php';
        if ($data === null) {
            if ($this->_verify_email_verification === null) {
                $this->_verify_email_verification = new VerifyEmailVerificationEntity($this, null);
            }
            return $this->_verify_email_verification;
        }
        return new VerifyEmailVerificationEntity($this, $data);
    }


    private $_verify_signal_integration = null;

    // Canonical facade: $client->VerifySignalIntegration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verify_signal_integration()
    // resolves here too.
    public function VerifySignalIntegration($data = null)
    {
        require_once __DIR__ . '/entity/verify_signal_integration_entity.php';
        if ($data === null) {
            if ($this->_verify_signal_integration === null) {
                $this->_verify_signal_integration = new VerifySignalIntegrationEntity($this, null);
            }
            return $this->_verify_signal_integration;
        }
        return new VerifySignalIntegrationEntity($this, $data);
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


    private $_waitlist_application = null;

    // Canonical facade: $client->WaitlistApplication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->waitlist_application()
    // resolves here too.
    public function WaitlistApplication($data = null)
    {
        require_once __DIR__ . '/entity/waitlist_application_entity.php';
        if ($data === null) {
            if ($this->_waitlist_application === null) {
                $this->_waitlist_application = new WaitlistApplicationEntity($this, null);
            }
            return $this->_waitlist_application;
        }
        return new WaitlistApplicationEntity($this, $data);
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


    private $_webhook_gitlab = null;

    // Canonical facade: $client->WebhookGitlab()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webhook_gitlab()
    // resolves here too.
    public function WebhookGitlab($data = null)
    {
        require_once __DIR__ . '/entity/webhook_gitlab_entity.php';
        if ($data === null) {
            if ($this->_webhook_gitlab === null) {
                $this->_webhook_gitlab = new WebhookGitlabEntity($this, null);
            }
            return $this->_webhook_gitlab;
        }
        return new WebhookGitlabEntity($this, $data);
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


    private $_workspace_activity = null;

    // Canonical facade: $client->WorkspaceActivity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workspace_activity()
    // resolves here too.
    public function WorkspaceActivity($data = null)
    {
        require_once __DIR__ . '/entity/workspace_activity_entity.php';
        if ($data === null) {
            if ($this->_workspace_activity === null) {
                $this->_workspace_activity = new WorkspaceActivityEntity($this, null);
            }
            return $this->_workspace_activity;
        }
        return new WorkspaceActivityEntity($this, $data);
    }


    private $_workspace_activity_notification = null;

    // Canonical facade: $client->WorkspaceActivityNotification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workspace_activity_notification()
    // resolves here too.
    public function WorkspaceActivityNotification($data = null)
    {
        require_once __DIR__ . '/entity/workspace_activity_notification_entity.php';
        if ($data === null) {
            if ($this->_workspace_activity_notification === null) {
                $this->_workspace_activity_notification = new WorkspaceActivityNotificationEntity($this, null);
            }
            return $this->_workspace_activity_notification;
        }
        return new WorkspaceActivityNotificationEntity($this, $data);
    }


    private $_workspace_space = null;

    // Canonical facade: $client->WorkspaceSpace()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workspace_space()
    // resolves here too.
    public function WorkspaceSpace($data = null)
    {
        require_once __DIR__ . '/entity/workspace_space_entity.php';
        if ($data === null) {
            if ($this->_workspace_space === null) {
                $this->_workspace_space = new WorkspaceSpaceEntity($this, null);
            }
            return $this->_workspace_space;
        }
        return new WorkspaceSpaceEntity($this, $data);
    }


    private $_workspace_space_preference = null;

    // Canonical facade: $client->WorkspaceSpacePreference()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workspace_space_preference()
    // resolves here too.
    public function WorkspaceSpacePreference($data = null)
    {
        require_once __DIR__ . '/entity/workspace_space_preference_entity.php';
        if ($data === null) {
            if ($this->_workspace_space_preference === null) {
                $this->_workspace_space_preference = new WorkspaceSpacePreferenceEntity($this, null);
            }
            return $this->_workspace_space_preference;
        }
        return new WorkspaceSpacePreferenceEntity($this, $data);
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
