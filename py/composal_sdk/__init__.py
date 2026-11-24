# Composal SDK

from composal_sdk.utility.voxgig_struct import voxgig_struct as vs
from composal_sdk.core.utility_type import ComposalUtility
from composal_sdk.core.spec import ComposalSpec
from composal_sdk.core import helpers
from composal_sdk.utility.prepare_method import allowed
from composal_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from composal_sdk.utility import register

# Load features
from composal_sdk.feature.base_feature import ComposalBaseFeature
from composal_sdk.features import _has_feature, _make_feature


class ComposalSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = ComposalUtility()
        self._utility = utility

        from composal_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "ComposalSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ComposalUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def secrets(self):
        _s = getattr(self, "_secrets", None)
        return None if _s is None else _s.sekreto()

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        if getattr(self, "_secrets", None) is not None:
            self._secrets.resolve()

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ComposalSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        # A raw request has no point to declare its response type, so it asks
        # for the JSON it reads: an API that negotiates on Accept otherwise
        # answers in its own default format. A caller's own accept wins.
        if not any(str(k).lower() == "accept" for k in ctx.spec.headers):
            ctx.spec.headers["accept"] = "application/json"

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "ComposalSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("ComposalSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def A2aWellKnown(self, data=None) -> "A2aWellKnownEntity":
        """Entity factory: client.A2aWellKnown().list() / client.A2aWellKnown().load({"id": ...})."""
        from composal_sdk.entity.a2a_well_known_entity import A2aWellKnownEntity
        return A2aWellKnownEntity(self, data)


    def AdminOrg(self, data=None) -> "AdminOrgEntity":
        """Entity factory: client.AdminOrg().list() / client.AdminOrg().load({"id": ...})."""
        from composal_sdk.entity.admin_org_entity import AdminOrgEntity
        return AdminOrgEntity(self, data)


    def Agent(self, data=None) -> "AgentEntity":
        """Entity factory: client.Agent().list() / client.Agent().load({"id": ...})."""
        from composal_sdk.entity.agent_entity import AgentEntity
        return AgentEntity(self, data)


    def AgentApp(self, data=None) -> "AgentAppEntity":
        """Entity factory: client.AgentApp().list() / client.AgentApp().load({"id": ...})."""
        from composal_sdk.entity.agent_app_entity import AgentAppEntity
        return AgentAppEntity(self, data)


    def AgentAppInstall(self, data=None) -> "AgentAppInstallEntity":
        """Entity factory: client.AgentAppInstall().list() / client.AgentAppInstall().load({"id": ...})."""
        from composal_sdk.entity.agent_app_install_entity import AgentAppInstallEntity
        return AgentAppInstallEntity(self, data)


    def AgentAttachment(self, data=None) -> "AgentAttachmentEntity":
        """Entity factory: client.AgentAttachment().list() / client.AgentAttachment().load({"id": ...})."""
        from composal_sdk.entity.agent_attachment_entity import AgentAttachmentEntity
        return AgentAttachmentEntity(self, data)


    def AgentAutomation(self, data=None) -> "AgentAutomationEntity":
        """Entity factory: client.AgentAutomation().list() / client.AgentAutomation().load({"id": ...})."""
        from composal_sdk.entity.agent_automation_entity import AgentAutomationEntity
        return AgentAutomationEntity(self, data)


    def AgentAvatar(self, data=None) -> "AgentAvatarEntity":
        """Entity factory: client.AgentAvatar().list() / client.AgentAvatar().load({"id": ...})."""
        from composal_sdk.entity.agent_avatar_entity import AgentAvatarEntity
        return AgentAvatarEntity(self, data)


    def AgentCommand(self, data=None) -> "AgentCommandEntity":
        """Entity factory: client.AgentCommand().list() / client.AgentCommand().load({"id": ...})."""
        from composal_sdk.entity.agent_command_entity import AgentCommandEntity
        return AgentCommandEntity(self, data)


    def AgentComputer(self, data=None) -> "AgentComputerEntity":
        """Entity factory: client.AgentComputer().list() / client.AgentComputer().load({"id": ...})."""
        from composal_sdk.entity.agent_computer_entity import AgentComputerEntity
        return AgentComputerEntity(self, data)


    def AgentConnection(self, data=None) -> "AgentConnectionEntity":
        """Entity factory: client.AgentConnection().list() / client.AgentConnection().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_entity import AgentConnectionEntity
        return AgentConnectionEntity(self, data)


    def AgentConnectionDelegation(self, data=None) -> "AgentConnectionDelegationEntity":
        """Entity factory: client.AgentConnectionDelegation().list() / client.AgentConnectionDelegation().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_delegation_entity import AgentConnectionDelegationEntity
        return AgentConnectionDelegationEntity(self, data)


    def AgentConnectionGrant(self, data=None) -> "AgentConnectionGrantEntity":
        """Entity factory: client.AgentConnectionGrant().list() / client.AgentConnectionGrant().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_grant_entity import AgentConnectionGrantEntity
        return AgentConnectionGrantEntity(self, data)


    def AgentConnectionResource(self, data=None) -> "AgentConnectionResourceEntity":
        """Entity factory: client.AgentConnectionResource().list() / client.AgentConnectionResource().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_resource_entity import AgentConnectionResourceEntity
        return AgentConnectionResourceEntity(self, data)


    def AgentConnectionSafetyControl(self, data=None) -> "AgentConnectionSafetyControlEntity":
        """Entity factory: client.AgentConnectionSafetyControl().list() / client.AgentConnectionSafetyControl().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_safety_control_entity import AgentConnectionSafetyControlEntity
        return AgentConnectionSafetyControlEntity(self, data)


    def AgentConnectionTriggerSubscription(self, data=None) -> "AgentConnectionTriggerSubscriptionEntity":
        """Entity factory: client.AgentConnectionTriggerSubscription().list() / client.AgentConnectionTriggerSubscription().load({"id": ...})."""
        from composal_sdk.entity.agent_connection_trigger_subscription_entity import AgentConnectionTriggerSubscriptionEntity
        return AgentConnectionTriggerSubscriptionEntity(self, data)


    def AgentContextCheckpoint(self, data=None) -> "AgentContextCheckpointEntity":
        """Entity factory: client.AgentContextCheckpoint().list() / client.AgentContextCheckpoint().load({"id": ...})."""
        from composal_sdk.entity.agent_context_checkpoint_entity import AgentContextCheckpointEntity
        return AgentContextCheckpointEntity(self, data)


    def AgentControlFlow(self, data=None) -> "AgentControlFlowEntity":
        """Entity factory: client.AgentControlFlow().list() / client.AgentControlFlow().load({"id": ...})."""
        from composal_sdk.entity.agent_control_flow_entity import AgentControlFlowEntity
        return AgentControlFlowEntity(self, data)


    def AgentCoordination(self, data=None) -> "AgentCoordinationEntity":
        """Entity factory: client.AgentCoordination().list() / client.AgentCoordination().load({"id": ...})."""
        from composal_sdk.entity.agent_coordination_entity import AgentCoordinationEntity
        return AgentCoordinationEntity(self, data)


    def AgentEmail(self, data=None) -> "AgentEmailEntity":
        """Entity factory: client.AgentEmail().list() / client.AgentEmail().load({"id": ...})."""
        from composal_sdk.entity.agent_email_entity import AgentEmailEntity
        return AgentEmailEntity(self, data)


    def AgentEvent(self, data=None) -> "AgentEventEntity":
        """Entity factory: client.AgentEvent().list() / client.AgentEvent().load({"id": ...})."""
        from composal_sdk.entity.agent_event_entity import AgentEventEntity
        return AgentEventEntity(self, data)


    def AgentFile(self, data=None) -> "AgentFileEntity":
        """Entity factory: client.AgentFile().list() / client.AgentFile().load({"id": ...})."""
        from composal_sdk.entity.agent_file_entity import AgentFileEntity
        return AgentFileEntity(self, data)


    def AgentInput(self, data=None) -> "AgentInputEntity":
        """Entity factory: client.AgentInput().list() / client.AgentInput().load({"id": ...})."""
        from composal_sdk.entity.agent_input_entity import AgentInputEntity
        return AgentInputEntity(self, data)


    def AgentIntegration(self, data=None) -> "AgentIntegrationEntity":
        """Entity factory: client.AgentIntegration().list() / client.AgentIntegration().load({"id": ...})."""
        from composal_sdk.entity.agent_integration_entity import AgentIntegrationEntity
        return AgentIntegrationEntity(self, data)


    def AgentIntegrationAccount(self, data=None) -> "AgentIntegrationAccountEntity":
        """Entity factory: client.AgentIntegrationAccount().list() / client.AgentIntegrationAccount().load({"id": ...})."""
        from composal_sdk.entity.agent_integration_account_entity import AgentIntegrationAccountEntity
        return AgentIntegrationAccountEntity(self, data)


    def AgentIntegrationCallback(self, data=None) -> "AgentIntegrationCallbackEntity":
        """Entity factory: client.AgentIntegrationCallback().list() / client.AgentIntegrationCallback().load({"id": ...})."""
        from composal_sdk.entity.agent_integration_callback_entity import AgentIntegrationCallbackEntity
        return AgentIntegrationCallbackEntity(self, data)


    def AgentInteraction(self, data=None) -> "AgentInteractionEntity":
        """Entity factory: client.AgentInteraction().list() / client.AgentInteraction().load({"id": ...})."""
        from composal_sdk.entity.agent_interaction_entity import AgentInteractionEntity
        return AgentInteractionEntity(self, data)


    def AgentLibrary(self, data=None) -> "AgentLibraryEntity":
        """Entity factory: client.AgentLibrary().list() / client.AgentLibrary().load({"id": ...})."""
        from composal_sdk.entity.agent_library_entity import AgentLibraryEntity
        return AgentLibraryEntity(self, data)


    def AgentManager(self, data=None) -> "AgentManagerEntity":
        """Entity factory: client.AgentManager().list() / client.AgentManager().load({"id": ...})."""
        from composal_sdk.entity.agent_manager_entity import AgentManagerEntity
        return AgentManagerEntity(self, data)


    def AgentManagerChoice(self, data=None) -> "AgentManagerChoiceEntity":
        """Entity factory: client.AgentManagerChoice().list() / client.AgentManagerChoice().load({"id": ...})."""
        from composal_sdk.entity.agent_manager_choice_entity import AgentManagerChoiceEntity
        return AgentManagerChoiceEntity(self, data)


    def AgentMarketplace(self, data=None) -> "AgentMarketplaceEntity":
        """Entity factory: client.AgentMarketplace().list() / client.AgentMarketplace().load({"id": ...})."""
        from composal_sdk.entity.agent_marketplace_entity import AgentMarketplaceEntity
        return AgentMarketplaceEntity(self, data)


    def AgentMarketplaceShared(self, data=None) -> "AgentMarketplaceSharedEntity":
        """Entity factory: client.AgentMarketplaceShared().list() / client.AgentMarketplaceShared().load({"id": ...})."""
        from composal_sdk.entity.agent_marketplace_shared_entity import AgentMarketplaceSharedEntity
        return AgentMarketplaceSharedEntity(self, data)


    def AgentMissionControl(self, data=None) -> "AgentMissionControlEntity":
        """Entity factory: client.AgentMissionControl().list() / client.AgentMissionControl().load({"id": ...})."""
        from composal_sdk.entity.agent_mission_control_entity import AgentMissionControlEntity
        return AgentMissionControlEntity(self, data)


    def AgentOperation(self, data=None) -> "AgentOperationEntity":
        """Entity factory: client.AgentOperation().list() / client.AgentOperation().load({"id": ...})."""
        from composal_sdk.entity.agent_operation_entity import AgentOperationEntity
        return AgentOperationEntity(self, data)


    def AgentProvisioning(self, data=None) -> "AgentProvisioningEntity":
        """Entity factory: client.AgentProvisioning().list() / client.AgentProvisioning().load({"id": ...})."""
        from composal_sdk.entity.agent_provisioning_entity import AgentProvisioningEntity
        return AgentProvisioningEntity(self, data)


    def AgentPullRequest(self, data=None) -> "AgentPullRequestEntity":
        """Entity factory: client.AgentPullRequest().list() / client.AgentPullRequest().load({"id": ...})."""
        from composal_sdk.entity.agent_pull_request_entity import AgentPullRequestEntity
        return AgentPullRequestEntity(self, data)


    def AgentQuestion(self, data=None) -> "AgentQuestionEntity":
        """Entity factory: client.AgentQuestion().list() / client.AgentQuestion().load({"id": ...})."""
        from composal_sdk.entity.agent_question_entity import AgentQuestionEntity
        return AgentQuestionEntity(self, data)


    def AgentRelayFileGrant(self, data=None) -> "AgentRelayFileGrantEntity":
        """Entity factory: client.AgentRelayFileGrant().list() / client.AgentRelayFileGrant().load({"id": ...})."""
        from composal_sdk.entity.agent_relay_file_grant_entity import AgentRelayFileGrantEntity
        return AgentRelayFileGrantEntity(self, data)


    def AgentRelayFileGrantAccount(self, data=None) -> "AgentRelayFileGrantAccountEntity":
        """Entity factory: client.AgentRelayFileGrantAccount().list() / client.AgentRelayFileGrantAccount().load({"id": ...})."""
        from composal_sdk.entity.agent_relay_file_grant_account_entity import AgentRelayFileGrantAccountEntity
        return AgentRelayFileGrantAccountEntity(self, data)


    def AgentRepository(self, data=None) -> "AgentRepositoryEntity":
        """Entity factory: client.AgentRepository().list() / client.AgentRepository().load({"id": ...})."""
        from composal_sdk.entity.agent_repository_entity import AgentRepositoryEntity
        return AgentRepositoryEntity(self, data)


    def AgentResource(self, data=None) -> "AgentResourceEntity":
        """Entity factory: client.AgentResource().list() / client.AgentResource().load({"id": ...})."""
        from composal_sdk.entity.agent_resource_entity import AgentResourceEntity
        return AgentResourceEntity(self, data)


    def AgentRoder(self, data=None) -> "AgentRoderEntity":
        """Entity factory: client.AgentRoder().list() / client.AgentRoder().load({"id": ...})."""
        from composal_sdk.entity.agent_roder_entity import AgentRoderEntity
        return AgentRoderEntity(self, data)


    def AgentRoutine(self, data=None) -> "AgentRoutineEntity":
        """Entity factory: client.AgentRoutine().list() / client.AgentRoutine().load({"id": ...})."""
        from composal_sdk.entity.agent_routine_entity import AgentRoutineEntity
        return AgentRoutineEntity(self, data)


    def AgentRun(self, data=None) -> "AgentRunEntity":
        """Entity factory: client.AgentRun().list() / client.AgentRun().load({"id": ...})."""
        from composal_sdk.entity.agent_run_entity import AgentRunEntity
        return AgentRunEntity(self, data)


    def AgentRuntime(self, data=None) -> "AgentRuntimeEntity":
        """Entity factory: client.AgentRuntime().list() / client.AgentRuntime().load({"id": ...})."""
        from composal_sdk.entity.agent_runtime_entity import AgentRuntimeEntity
        return AgentRuntimeEntity(self, data)


    def AgentSession(self, data=None) -> "AgentSessionEntity":
        """Entity factory: client.AgentSession().list() / client.AgentSession().load({"id": ...})."""
        from composal_sdk.entity.agent_session_entity import AgentSessionEntity
        return AgentSessionEntity(self, data)


    def AgentSessionCheckpoint(self, data=None) -> "AgentSessionCheckpointEntity":
        """Entity factory: client.AgentSessionCheckpoint().list() / client.AgentSessionCheckpoint().load({"id": ...})."""
        from composal_sdk.entity.agent_session_checkpoint_entity import AgentSessionCheckpointEntity
        return AgentSessionCheckpointEntity(self, data)


    def AgentSessionRoderHandoff(self, data=None) -> "AgentSessionRoderHandoffEntity":
        """Entity factory: client.AgentSessionRoderHandoff().list() / client.AgentSessionRoderHandoff().load({"id": ...})."""
        from composal_sdk.entity.agent_session_roder_handoff_entity import AgentSessionRoderHandoffEntity
        return AgentSessionRoderHandoffEntity(self, data)


    def AgentSetting(self, data=None) -> "AgentSettingEntity":
        """Entity factory: client.AgentSetting().list() / client.AgentSetting().load({"id": ...})."""
        from composal_sdk.entity.agent_setting_entity import AgentSettingEntity
        return AgentSettingEntity(self, data)


    def AgentSharing(self, data=None) -> "AgentSharingEntity":
        """Entity factory: client.AgentSharing().list() / client.AgentSharing().load({"id": ...})."""
        from composal_sdk.entity.agent_sharing_entity import AgentSharingEntity
        return AgentSharingEntity(self, data)


    def AgentSite(self, data=None) -> "AgentSiteEntity":
        """Entity factory: client.AgentSite().list() / client.AgentSite().load({"id": ...})."""
        from composal_sdk.entity.agent_site_entity import AgentSiteEntity
        return AgentSiteEntity(self, data)


    def AgentSkill(self, data=None) -> "AgentSkillEntity":
        """Entity factory: client.AgentSkill().list() / client.AgentSkill().load({"id": ...})."""
        from composal_sdk.entity.agent_skill_entity import AgentSkillEntity
        return AgentSkillEntity(self, data)


    def AgentSlack(self, data=None) -> "AgentSlackEntity":
        """Entity factory: client.AgentSlack().list() / client.AgentSlack().load({"id": ...})."""
        from composal_sdk.entity.agent_slack_entity import AgentSlackEntity
        return AgentSlackEntity(self, data)


    def AgentSubagent(self, data=None) -> "AgentSubagentEntity":
        """Entity factory: client.AgentSubagent().list() / client.AgentSubagent().load({"id": ...})."""
        from composal_sdk.entity.agent_subagent_entity import AgentSubagentEntity
        return AgentSubagentEntity(self, data)


    def AgentSubscription(self, data=None) -> "AgentSubscriptionEntity":
        """Entity factory: client.AgentSubscription().list() / client.AgentSubscription().load({"id": ...})."""
        from composal_sdk.entity.agent_subscription_entity import AgentSubscriptionEntity
        return AgentSubscriptionEntity(self, data)


    def AgentSwarm(self, data=None) -> "AgentSwarmEntity":
        """Entity factory: client.AgentSwarm().list() / client.AgentSwarm().load({"id": ...})."""
        from composal_sdk.entity.agent_swarm_entity import AgentSwarmEntity
        return AgentSwarmEntity(self, data)


    def AgentTeammate(self, data=None) -> "AgentTeammateEntity":
        """Entity factory: client.AgentTeammate().list() / client.AgentTeammate().load({"id": ...})."""
        from composal_sdk.entity.agent_teammate_entity import AgentTeammateEntity
        return AgentTeammateEntity(self, data)


    def AgentTerminal(self, data=None) -> "AgentTerminalEntity":
        """Entity factory: client.AgentTerminal().list() / client.AgentTerminal().load({"id": ...})."""
        from composal_sdk.entity.agent_terminal_entity import AgentTerminalEntity
        return AgentTerminalEntity(self, data)


    def AgentThread(self, data=None) -> "AgentThreadEntity":
        """Entity factory: client.AgentThread().list() / client.AgentThread().load({"id": ...})."""
        from composal_sdk.entity.agent_thread_entity import AgentThreadEntity
        return AgentThreadEntity(self, data)


    def AgentTool(self, data=None) -> "AgentToolEntity":
        """Entity factory: client.AgentTool().list() / client.AgentTool().load({"id": ...})."""
        from composal_sdk.entity.agent_tool_entity import AgentToolEntity
        return AgentToolEntity(self, data)


    def AgentUsage(self, data=None) -> "AgentUsageEntity":
        """Entity factory: client.AgentUsage().list() / client.AgentUsage().load({"id": ...})."""
        from composal_sdk.entity.agent_usage_entity import AgentUsageEntity
        return AgentUsageEntity(self, data)


    def AgentVerifyProject(self, data=None) -> "AgentVerifyProjectEntity":
        """Entity factory: client.AgentVerifyProject().list() / client.AgentVerifyProject().load({"id": ...})."""
        from composal_sdk.entity.agent_verify_project_entity import AgentVerifyProjectEntity
        return AgentVerifyProjectEntity(self, data)


    def AgentWait(self, data=None) -> "AgentWaitEntity":
        """Entity factory: client.AgentWait().list() / client.AgentWait().load({"id": ...})."""
        from composal_sdk.entity.agent_wait_entity import AgentWaitEntity
        return AgentWaitEntity(self, data)


    def AgentWebPreview(self, data=None) -> "AgentWebPreviewEntity":
        """Entity factory: client.AgentWebPreview().list() / client.AgentWebPreview().load({"id": ...})."""
        from composal_sdk.entity.agent_web_preview_entity import AgentWebPreviewEntity
        return AgentWebPreviewEntity(self, data)


    def AgentWebhook(self, data=None) -> "AgentWebhookEntity":
        """Entity factory: client.AgentWebhook().list() / client.AgentWebhook().load({"id": ...})."""
        from composal_sdk.entity.agent_webhook_entity import AgentWebhookEntity
        return AgentWebhookEntity(self, data)


    def AgentWork(self, data=None) -> "AgentWorkEntity":
        """Entity factory: client.AgentWork().list() / client.AgentWork().load({"id": ...})."""
        from composal_sdk.entity.agent_work_entity import AgentWorkEntity
        return AgentWorkEntity(self, data)


    def AgentWorkflow(self, data=None) -> "AgentWorkflowEntity":
        """Entity factory: client.AgentWorkflow().list() / client.AgentWorkflow().load({"id": ...})."""
        from composal_sdk.entity.agent_workflow_entity import AgentWorkflowEntity
        return AgentWorkflowEntity(self, data)


    def AgentWorkflowProposal(self, data=None) -> "AgentWorkflowProposalEntity":
        """Entity factory: client.AgentWorkflowProposal().list() / client.AgentWorkflowProposal().load({"id": ...})."""
        from composal_sdk.entity.agent_workflow_proposal_entity import AgentWorkflowProposalEntity
        return AgentWorkflowProposalEntity(self, data)


    def AgentWorkflowRun(self, data=None) -> "AgentWorkflowRunEntity":
        """Entity factory: client.AgentWorkflowRun().list() / client.AgentWorkflowRun().load({"id": ...})."""
        from composal_sdk.entity.agent_workflow_run_entity import AgentWorkflowRunEntity
        return AgentWorkflowRunEntity(self, data)


    def AgentWorkflowTrigger(self, data=None) -> "AgentWorkflowTriggerEntity":
        """Entity factory: client.AgentWorkflowTrigger().list() / client.AgentWorkflowTrigger().load({"id": ...})."""
        from composal_sdk.entity.agent_workflow_trigger_entity import AgentWorkflowTriggerEntity
        return AgentWorkflowTriggerEntity(self, data)


    def AgentWorkspace(self, data=None) -> "AgentWorkspaceEntity":
        """Entity factory: client.AgentWorkspace().list() / client.AgentWorkspace().load({"id": ...})."""
        from composal_sdk.entity.agent_workspace_entity import AgentWorkspaceEntity
        return AgentWorkspaceEntity(self, data)


    def AgentWritePermission(self, data=None) -> "AgentWritePermissionEntity":
        """Entity factory: client.AgentWritePermission().list() / client.AgentWritePermission().load({"id": ...})."""
        from composal_sdk.entity.agent_write_permission_entity import AgentWritePermissionEntity
        return AgentWritePermissionEntity(self, data)


    def Agreement(self, data=None) -> "AgreementEntity":
        """Entity factory: client.Agreement().list() / client.Agreement().load({"id": ...})."""
        from composal_sdk.entity.agreement_entity import AgreementEntity
        return AgreementEntity(self, data)


    def AgreementAccessRequest(self, data=None) -> "AgreementAccessRequestEntity":
        """Entity factory: client.AgreementAccessRequest().list() / client.AgreementAccessRequest().load({"id": ...})."""
        from composal_sdk.entity.agreement_access_request_entity import AgreementAccessRequestEntity
        return AgreementAccessRequestEntity(self, data)


    def AlertRuleEvent(self, data=None) -> "AlertRuleEventEntity":
        """Entity factory: client.AlertRuleEvent().list() / client.AlertRuleEvent().load({"id": ...})."""
        from composal_sdk.entity.alert_rule_event_entity import AlertRuleEventEntity
        return AlertRuleEventEntity(self, data)


    def AllocationLog(self, data=None) -> "AllocationLogEntity":
        """Entity factory: client.AllocationLog().list() / client.AllocationLog().load({"id": ...})."""
        from composal_sdk.entity.allocation_log_entity import AllocationLogEntity
        return AllocationLogEntity(self, data)


    def App(self, data=None) -> "AppEntity":
        """Entity factory: client.App().list() / client.App().load({"id": ...})."""
        from composal_sdk.entity.app_entity import AppEntity
        return AppEntity(self, data)


    def AppAccess(self, data=None) -> "AppAccessEntity":
        """Entity factory: client.AppAccess().list() / client.AppAccess().load({"id": ...})."""
        from composal_sdk.entity.app_access_entity import AppAccessEntity
        return AppAccessEntity(self, data)


    def AppAccessJwk(self, data=None) -> "AppAccessJwkEntity":
        """Entity factory: client.AppAccessJwk().list() / client.AppAccessJwk().load({"id": ...})."""
        from composal_sdk.entity.app_access_jwk_entity import AppAccessJwkEntity
        return AppAccessJwkEntity(self, data)


    def AppCdn(self, data=None) -> "AppCdnEntity":
        """Entity factory: client.AppCdn().list() / client.AppCdn().load({"id": ...})."""
        from composal_sdk.entity.app_cdn_entity import AppCdnEntity
        return AppCdnEntity(self, data)


    def AppConfigVariable(self, data=None) -> "AppConfigVariableEntity":
        """Entity factory: client.AppConfigVariable().list() / client.AppConfigVariable().load({"id": ...})."""
        from composal_sdk.entity.app_config_variable_entity import AppConfigVariableEntity
        return AppConfigVariableEntity(self, data)


    def AppDataResource(self, data=None) -> "AppDataResourceEntity":
        """Entity factory: client.AppDataResource().list() / client.AppDataResource().load({"id": ...})."""
        from composal_sdk.entity.app_data_resource_entity import AppDataResourceEntity
        return AppDataResourceEntity(self, data)


    def AppDeploy(self, data=None) -> "AppDeployEntity":
        """Entity factory: client.AppDeploy().list() / client.AppDeploy().load({"id": ...})."""
        from composal_sdk.entity.app_deploy_entity import AppDeployEntity
        return AppDeployEntity(self, data)


    def AppDeployment(self, data=None) -> "AppDeploymentEntity":
        """Entity factory: client.AppDeployment().list() / client.AppDeployment().load({"id": ...})."""
        from composal_sdk.entity.app_deployment_entity import AppDeploymentEntity
        return AppDeploymentEntity(self, data)


    def AppDeploymentOperation(self, data=None) -> "AppDeploymentOperationEntity":
        """Entity factory: client.AppDeploymentOperation().list() / client.AppDeploymentOperation().load({"id": ...})."""
        from composal_sdk.entity.app_deployment_operation_entity import AppDeploymentOperationEntity
        return AppDeploymentOperationEntity(self, data)


    def AppDeploymentRollback(self, data=None) -> "AppDeploymentRollbackEntity":
        """Entity factory: client.AppDeploymentRollback().list() / client.AppDeploymentRollback().load({"id": ...})."""
        from composal_sdk.entity.app_deployment_rollback_entity import AppDeploymentRollbackEntity
        return AppDeploymentRollbackEntity(self, data)


    def AppEnvironment(self, data=None) -> "AppEnvironmentEntity":
        """Entity factory: client.AppEnvironment().list() / client.AppEnvironment().load({"id": ...})."""
        from composal_sdk.entity.app_environment_entity import AppEnvironmentEntity
        return AppEnvironmentEntity(self, data)


    def AppLocation(self, data=None) -> "AppLocationEntity":
        """Entity factory: client.AppLocation().list() / client.AppLocation().load({"id": ...})."""
        from composal_sdk.entity.app_location_entity import AppLocationEntity
        return AppLocationEntity(self, data)


    def AppMetric(self, data=None) -> "AppMetricEntity":
        """Entity factory: client.AppMetric().list() / client.AppMetric().load({"id": ...})."""
        from composal_sdk.entity.app_metric_entity import AppMetricEntity
        return AppMetricEntity(self, data)


    def AppPreview(self, data=None) -> "AppPreviewEntity":
        """Entity factory: client.AppPreview().list() / client.AppPreview().load({"id": ...})."""
        from composal_sdk.entity.app_preview_entity import AppPreviewEntity
        return AppPreviewEntity(self, data)


    def AppPreviewProfile(self, data=None) -> "AppPreviewProfileEntity":
        """Entity factory: client.AppPreviewProfile().list() / client.AppPreviewProfile().load({"id": ...})."""
        from composal_sdk.entity.app_preview_profile_entity import AppPreviewProfileEntity
        return AppPreviewProfileEntity(self, data)


    def AppRun(self, data=None) -> "AppRunEntity":
        """Entity factory: client.AppRun().list() / client.AppRun().load({"id": ...})."""
        from composal_sdk.entity.app_run_entity import AppRunEntity
        return AppRunEntity(self, data)


    def AppSecret(self, data=None) -> "AppSecretEntity":
        """Entity factory: client.AppSecret().list() / client.AppSecret().load({"id": ...})."""
        from composal_sdk.entity.app_secret_entity import AppSecretEntity
        return AppSecretEntity(self, data)


    def AppService(self, data=None) -> "AppServiceEntity":
        """Entity factory: client.AppService().list() / client.AppService().load({"id": ...})."""
        from composal_sdk.entity.app_service_entity import AppServiceEntity
        return AppServiceEntity(self, data)


    def AppServiceBinding(self, data=None) -> "AppServiceBindingEntity":
        """Entity factory: client.AppServiceBinding().list() / client.AppServiceBinding().load({"id": ...})."""
        from composal_sdk.entity.app_service_binding_entity import AppServiceBindingEntity
        return AppServiceBindingEntity(self, data)


    def AppServicePlacement(self, data=None) -> "AppServicePlacementEntity":
        """Entity factory: client.AppServicePlacement().list() / client.AppServicePlacement().load({"id": ...})."""
        from composal_sdk.entity.app_service_placement_entity import AppServicePlacementEntity
        return AppServicePlacementEntity(self, data)


    def AppStorageResource(self, data=None) -> "AppStorageResourceEntity":
        """Entity factory: client.AppStorageResource().list() / client.AppStorageResource().load({"id": ...})."""
        from composal_sdk.entity.app_storage_resource_entity import AppStorageResourceEntity
        return AppStorageResourceEntity(self, data)


    def Artefact(self, data=None) -> "ArtefactEntity":
        """Entity factory: client.Artefact().list() / client.Artefact().load({"id": ...})."""
        from composal_sdk.entity.artefact_entity import ArtefactEntity
        return ArtefactEntity(self, data)


    def ArtefactCommentThread(self, data=None) -> "ArtefactCommentThreadEntity":
        """Entity factory: client.ArtefactCommentThread().list() / client.ArtefactCommentThread().load({"id": ...})."""
        from composal_sdk.entity.artefact_comment_thread_entity import ArtefactCommentThreadEntity
        return ArtefactCommentThreadEntity(self, data)


    def ArtefactRevision(self, data=None) -> "ArtefactRevisionEntity":
        """Entity factory: client.ArtefactRevision().list() / client.ArtefactRevision().load({"id": ...})."""
        from composal_sdk.entity.artefact_revision_entity import ArtefactRevisionEntity
        return ArtefactRevisionEntity(self, data)


    def ArtefactViewToken(self, data=None) -> "ArtefactViewTokenEntity":
        """Entity factory: client.ArtefactViewToken().list() / client.ArtefactViewToken().load({"id": ...})."""
        from composal_sdk.entity.artefact_view_token_entity import ArtefactViewTokenEntity
        return ArtefactViewTokenEntity(self, data)


    def Artifact(self, data=None) -> "ArtifactEntity":
        """Entity factory: client.Artifact().list() / client.Artifact().load({"id": ...})."""
        from composal_sdk.entity.artifact_entity import ArtifactEntity
        return ArtifactEntity(self, data)


    def ArtifactCacheNamespace(self, data=None) -> "ArtifactCacheNamespaceEntity":
        """Entity factory: client.ArtifactCacheNamespace().list() / client.ArtifactCacheNamespace().load({"id": ...})."""
        from composal_sdk.entity.artifact_cache_namespace_entity import ArtifactCacheNamespaceEntity
        return ArtifactCacheNamespaceEntity(self, data)


    def ArtifactImageRepository(self, data=None) -> "ArtifactImageRepositoryEntity":
        """Entity factory: client.ArtifactImageRepository().list() / client.ArtifactImageRepository().load({"id": ...})."""
        from composal_sdk.entity.artifact_image_repository_entity import ArtifactImageRepositoryEntity
        return ArtifactImageRepositoryEntity(self, data)


    def ArtifactPackageMirror(self, data=None) -> "ArtifactPackageMirrorEntity":
        """Entity factory: client.ArtifactPackageMirror().list() / client.ArtifactPackageMirror().load({"id": ...})."""
        from composal_sdk.entity.artifact_package_mirror_entity import ArtifactPackageMirrorEntity
        return ArtifactPackageMirrorEntity(self, data)


    def ArtifactRetentionPolicy(self, data=None) -> "ArtifactRetentionPolicyEntity":
        """Entity factory: client.ArtifactRetentionPolicy().list() / client.ArtifactRetentionPolicy().load({"id": ...})."""
        from composal_sdk.entity.artifact_retention_policy_entity import ArtifactRetentionPolicyEntity
        return ArtifactRetentionPolicyEntity(self, data)


    def AttachmentPart(self, data=None) -> "AttachmentPartEntity":
        """Entity factory: client.AttachmentPart().list() / client.AttachmentPart().load({"id": ...})."""
        from composal_sdk.entity.attachment_part_entity import AttachmentPartEntity
        return AttachmentPartEntity(self, data)


    def AuditEvent(self, data=None) -> "AuditEventEntity":
        """Entity factory: client.AuditEvent().list() / client.AuditEvent().load({"id": ...})."""
        from composal_sdk.entity.audit_event_entity import AuditEventEntity
        return AuditEventEntity(self, data)


    def Auth(self, data=None) -> "AuthEntity":
        """Entity factory: client.Auth().list() / client.Auth().load({"id": ...})."""
        from composal_sdk.entity.auth_entity import AuthEntity
        return AuthEntity(self, data)


    def AuthCli(self, data=None) -> "AuthCliEntity":
        """Entity factory: client.AuthCli().list() / client.AuthCli().load({"id": ...})."""
        from composal_sdk.entity.auth_cli_entity import AuthCliEntity
        return AuthCliEntity(self, data)


    def AuthGithub(self, data=None) -> "AuthGithubEntity":
        """Entity factory: client.AuthGithub().list() / client.AuthGithub().load({"id": ...})."""
        from composal_sdk.entity.auth_github_entity import AuthGithubEntity
        return AuthGithubEntity(self, data)


    def AuthGoogle(self, data=None) -> "AuthGoogleEntity":
        """Entity factory: client.AuthGoogle().list() / client.AuthGoogle().load({"id": ...})."""
        from composal_sdk.entity.auth_google_entity import AuthGoogleEntity
        return AuthGoogleEntity(self, data)


    def AuthOpenai(self, data=None) -> "AuthOpenaiEntity":
        """Entity factory: client.AuthOpenai().list() / client.AuthOpenai().load({"id": ...})."""
        from composal_sdk.entity.auth_openai_entity import AuthOpenaiEntity
        return AuthOpenaiEntity(self, data)


    def AuthPasswordReset(self, data=None) -> "AuthPasswordResetEntity":
        """Entity factory: client.AuthPasswordReset().list() / client.AuthPasswordReset().load({"id": ...})."""
        from composal_sdk.entity.auth_password_reset_entity import AuthPasswordResetEntity
        return AuthPasswordResetEntity(self, data)


    def AuthRegistrationOption(self, data=None) -> "AuthRegistrationOptionEntity":
        """Entity factory: client.AuthRegistrationOption().list() / client.AuthRegistrationOption().load({"id": ...})."""
        from composal_sdk.entity.auth_registration_option_entity import AuthRegistrationOptionEntity
        return AuthRegistrationOptionEntity(self, data)


    def AutomationEvent(self, data=None) -> "AutomationEventEntity":
        """Entity factory: client.AutomationEvent().list() / client.AutomationEvent().load({"id": ...})."""
        from composal_sdk.entity.automation_event_entity import AutomationEventEntity
        return AutomationEventEntity(self, data)


    def AutomationRun(self, data=None) -> "AutomationRunEntity":
        """Entity factory: client.AutomationRun().list() / client.AutomationRun().load({"id": ...})."""
        from composal_sdk.entity.automation_run_entity import AutomationRunEntity
        return AutomationRunEntity(self, data)


    def BackendRunnerPool(self, data=None) -> "BackendRunnerPoolEntity":
        """Entity factory: client.BackendRunnerPool().list() / client.BackendRunnerPool().load({"id": ...})."""
        from composal_sdk.entity.backend_runner_pool_entity import BackendRunnerPoolEntity
        return BackendRunnerPoolEntity(self, data)


    def Bazel(self, data=None) -> "BazelEntity":
        """Entity factory: client.Bazel().list() / client.Bazel().load({"id": ...})."""
        from composal_sdk.entity.bazel_entity import BazelEntity
        return BazelEntity(self, data)


    def BazelActionResult(self, data=None) -> "BazelActionResultEntity":
        """Entity factory: client.BazelActionResult().list() / client.BazelActionResult().load({"id": ...})."""
        from composal_sdk.entity.bazel_action_result_entity import BazelActionResultEntity
        return BazelActionResultEntity(self, data)


    def BazelBackend(self, data=None) -> "BazelBackendEntity":
        """Entity factory: client.BazelBackend().list() / client.BazelBackend().load({"id": ...})."""
        from composal_sdk.entity.bazel_backend_entity import BazelBackendEntity
        return BazelBackendEntity(self, data)


    def BazelBlob(self, data=None) -> "BazelBlobEntity":
        """Entity factory: client.BazelBlob().list() / client.BazelBlob().load({"id": ...})."""
        from composal_sdk.entity.bazel_blob_entity import BazelBlobEntity
        return BazelBlobEntity(self, data)


    def BazelExecution(self, data=None) -> "BazelExecutionEntity":
        """Entity factory: client.BazelExecution().list() / client.BazelExecution().load({"id": ...})."""
        from composal_sdk.entity.bazel_execution_entity import BazelExecutionEntity
        return BazelExecutionEntity(self, data)


    def BazelFindMissingBlob(self, data=None) -> "BazelFindMissingBlobEntity":
        """Entity factory: client.BazelFindMissingBlob().list() / client.BazelFindMissingBlob().load({"id": ...})."""
        from composal_sdk.entity.bazel_find_missing_blob_entity import BazelFindMissingBlobEntity
        return BazelFindMissingBlobEntity(self, data)


    def Billing(self, data=None) -> "BillingEntity":
        """Entity factory: client.Billing().list() / client.Billing().load({"id": ...})."""
        from composal_sdk.entity.billing_entity import BillingEntity
        return BillingEntity(self, data)


    def BillingAddon(self, data=None) -> "BillingAddonEntity":
        """Entity factory: client.BillingAddon().list() / client.BillingAddon().load({"id": ...})."""
        from composal_sdk.entity.billing_addon_entity import BillingAddonEntity
        return BillingAddonEntity(self, data)


    def BillingCheckoutSession(self, data=None) -> "BillingCheckoutSessionEntity":
        """Entity factory: client.BillingCheckoutSession().list() / client.BillingCheckoutSession().load({"id": ...})."""
        from composal_sdk.entity.billing_checkout_session_entity import BillingCheckoutSessionEntity
        return BillingCheckoutSessionEntity(self, data)


    def BillingInvoice(self, data=None) -> "BillingInvoiceEntity":
        """Entity factory: client.BillingInvoice().list() / client.BillingInvoice().load({"id": ...})."""
        from composal_sdk.entity.billing_invoice_entity import BillingInvoiceEntity
        return BillingInvoiceEntity(self, data)


    def BillingPackage(self, data=None) -> "BillingPackageEntity":
        """Entity factory: client.BillingPackage().list() / client.BillingPackage().load({"id": ...})."""
        from composal_sdk.entity.billing_package_entity import BillingPackageEntity
        return BillingPackageEntity(self, data)


    def BillingPortalSession(self, data=None) -> "BillingPortalSessionEntity":
        """Entity factory: client.BillingPortalSession().list() / client.BillingPortalSession().load({"id": ...})."""
        from composal_sdk.entity.billing_portal_session_entity import BillingPortalSessionEntity
        return BillingPortalSessionEntity(self, data)


    def BillingPrepaidPeriod(self, data=None) -> "BillingPrepaidPeriodEntity":
        """Entity factory: client.BillingPrepaidPeriod().list() / client.BillingPrepaidPeriod().load({"id": ...})."""
        from composal_sdk.entity.billing_prepaid_period_entity import BillingPrepaidPeriodEntity
        return BillingPrepaidPeriodEntity(self, data)


    def BillingPrepaidPurchase(self, data=None) -> "BillingPrepaidPurchaseEntity":
        """Entity factory: client.BillingPrepaidPurchase().list() / client.BillingPrepaidPurchase().load({"id": ...})."""
        from composal_sdk.entity.billing_prepaid_purchase_entity import BillingPrepaidPurchaseEntity
        return BillingPrepaidPurchaseEntity(self, data)


    def BillingTokenTopUp(self, data=None) -> "BillingTokenTopUpEntity":
        """Entity factory: client.BillingTokenTopUp().list() / client.BillingTokenTopUp().load({"id": ...})."""
        from composal_sdk.entity.billing_token_top_up_entity import BillingTokenTopUpEntity
        return BillingTokenTopUpEntity(self, data)


    def BillingUsage(self, data=None) -> "BillingUsageEntity":
        """Entity factory: client.BillingUsage().list() / client.BillingUsage().load({"id": ...})."""
        from composal_sdk.entity.billing_usage_entity import BillingUsageEntity
        return BillingUsageEntity(self, data)


    def Binary(self, data=None) -> "BinaryEntity":
        """Entity factory: client.Binary().list() / client.Binary().load({"id": ...})."""
        from composal_sdk.entity.binary_entity import BinaryEntity
        return BinaryEntity(self, data)


    def BinaryVersion(self, data=None) -> "BinaryVersionEntity":
        """Entity factory: client.BinaryVersion().list() / client.BinaryVersion().load({"id": ...})."""
        from composal_sdk.entity.binary_version_entity import BinaryVersionEntity
        return BinaryVersionEntity(self, data)


    def BookmarkProtectionRefreshGithubRequiredCheck(self, data=None) -> "BookmarkProtectionRefreshGithubRequiredCheckEntity":
        """Entity factory: client.BookmarkProtectionRefreshGithubRequiredCheck().list() / client.BookmarkProtectionRefreshGithubRequiredCheck().load({"id": ...})."""
        from composal_sdk.entity.bookmark_protection_refresh_github_required_check_entity import BookmarkProtectionRefreshGithubRequiredCheckEntity
        return BookmarkProtectionRefreshGithubRequiredCheckEntity(self, data)


    def BrowserEgressCandidate(self, data=None) -> "BrowserEgressCandidateEntity":
        """Entity factory: client.BrowserEgressCandidate().list() / client.BrowserEgressCandidate().load({"id": ...})."""
        from composal_sdk.entity.browser_egress_candidate_entity import BrowserEgressCandidateEntity
        return BrowserEgressCandidateEntity(self, data)


    def BrowserSession(self, data=None) -> "BrowserSessionEntity":
        """Entity factory: client.BrowserSession().list() / client.BrowserSession().load({"id": ...})."""
        from composal_sdk.entity.browser_session_entity import BrowserSessionEntity
        return BrowserSessionEntity(self, data)


    def BrowserSessionConnection(self, data=None) -> "BrowserSessionConnectionEntity":
        """Entity factory: client.BrowserSessionConnection().list() / client.BrowserSessionConnection().load({"id": ...})."""
        from composal_sdk.entity.browser_session_connection_entity import BrowserSessionConnectionEntity
        return BrowserSessionConnectionEntity(self, data)


    def BrowserSessionControl(self, data=None) -> "BrowserSessionControlEntity":
        """Entity factory: client.BrowserSessionControl().list() / client.BrowserSessionControl().load({"id": ...})."""
        from composal_sdk.entity.browser_session_control_entity import BrowserSessionControlEntity
        return BrowserSessionControlEntity(self, data)


    def BrowserSessionEvent(self, data=None) -> "BrowserSessionEventEntity":
        """Entity factory: client.BrowserSessionEvent().list() / client.BrowserSessionEvent().load({"id": ...})."""
        from composal_sdk.entity.browser_session_event_entity import BrowserSessionEventEntity
        return BrowserSessionEventEntity(self, data)


    def BrowserSessionMedia(self, data=None) -> "BrowserSessionMediaEntity":
        """Entity factory: client.BrowserSessionMedia().list() / client.BrowserSessionMedia().load({"id": ...})."""
        from composal_sdk.entity.browser_session_media_entity import BrowserSessionMediaEntity
        return BrowserSessionMediaEntity(self, data)


    def BrowserSessionRecording(self, data=None) -> "BrowserSessionRecordingEntity":
        """Entity factory: client.BrowserSessionRecording().list() / client.BrowserSessionRecording().load({"id": ...})."""
        from composal_sdk.entity.browser_session_recording_entity import BrowserSessionRecordingEntity
        return BrowserSessionRecordingEntity(self, data)


    def BrowserSessionScreenshot(self, data=None) -> "BrowserSessionScreenshotEntity":
        """Entity factory: client.BrowserSessionScreenshot().list() / client.BrowserSessionScreenshot().load({"id": ...})."""
        from composal_sdk.entity.browser_session_screenshot_entity import BrowserSessionScreenshotEntity
        return BrowserSessionScreenshotEntity(self, data)


    def BrowserSessionTask(self, data=None) -> "BrowserSessionTaskEntity":
        """Entity factory: client.BrowserSessionTask().list() / client.BrowserSessionTask().load({"id": ...})."""
        from composal_sdk.entity.browser_session_task_entity import BrowserSessionTaskEntity
        return BrowserSessionTaskEntity(self, data)


    def CacheNamespaceEntry(self, data=None) -> "CacheNamespaceEntryEntity":
        """Entity factory: client.CacheNamespaceEntry().list() / client.CacheNamespaceEntry().load({"id": ...})."""
        from composal_sdk.entity.cache_namespace_entry_entity import CacheNamespaceEntryEntity
        return CacheNamespaceEntryEntity(self, data)


    def CatalogSelector(self, data=None) -> "CatalogSelectorEntity":
        """Entity factory: client.CatalogSelector().list() / client.CatalogSelector().load({"id": ...})."""
        from composal_sdk.entity.catalog_selector_entity import CatalogSelectorEntity
        return CatalogSelectorEntity(self, data)


    def CdnDeployment(self, data=None) -> "CdnDeploymentEntity":
        """Entity factory: client.CdnDeployment().list() / client.CdnDeployment().load({"id": ...})."""
        from composal_sdk.entity.cdn_deployment_entity import CdnDeploymentEntity
        return CdnDeploymentEntity(self, data)


    def CdnHostname(self, data=None) -> "CdnHostnameEntity":
        """Entity factory: client.CdnHostname().list() / client.CdnHostname().load({"id": ...})."""
        from composal_sdk.entity.cdn_hostname_entity import CdnHostnameEntity
        return CdnHostnameEntity(self, data)


    def CdnSpace(self, data=None) -> "CdnSpaceEntity":
        """Entity factory: client.CdnSpace().list() / client.CdnSpace().load({"id": ...})."""
        from composal_sdk.entity.cdn_space_entity import CdnSpaceEntity
        return CdnSpaceEntity(self, data)


    def CdnSpaceObject(self, data=None) -> "CdnSpaceObjectEntity":
        """Entity factory: client.CdnSpaceObject().list() / client.CdnSpaceObject().load({"id": ...})."""
        from composal_sdk.entity.cdn_space_object_entity import CdnSpaceObjectEntity
        return CdnSpaceObjectEntity(self, data)


    def Change(self, data=None) -> "ChangeEntity":
        """Entity factory: client.Change().list() / client.Change().load({"id": ...})."""
        from composal_sdk.entity.change_entity import ChangeEntity
        return ChangeEntity(self, data)


    def ChangeAsset(self, data=None) -> "ChangeAssetEntity":
        """Entity factory: client.ChangeAsset().list() / client.ChangeAsset().load({"id": ...})."""
        from composal_sdk.entity.change_asset_entity import ChangeAssetEntity
        return ChangeAssetEntity(self, data)


    def ChangeComment(self, data=None) -> "ChangeCommentEntity":
        """Entity factory: client.ChangeComment().list() / client.ChangeComment().load({"id": ...})."""
        from composal_sdk.entity.change_comment_entity import ChangeCommentEntity
        return ChangeCommentEntity(self, data)


    def ChangeFileReviewCheckpoint(self, data=None) -> "ChangeFileReviewCheckpointEntity":
        """Entity factory: client.ChangeFileReviewCheckpoint().list() / client.ChangeFileReviewCheckpoint().load({"id": ...})."""
        from composal_sdk.entity.change_file_review_checkpoint_entity import ChangeFileReviewCheckpointEntity
        return ChangeFileReviewCheckpointEntity(self, data)


    def ChangeGitBranchSubmission(self, data=None) -> "ChangeGitBranchSubmissionEntity":
        """Entity factory: client.ChangeGitBranchSubmission().list() / client.ChangeGitBranchSubmission().load({"id": ...})."""
        from composal_sdk.entity.change_git_branch_submission_entity import ChangeGitBranchSubmissionEntity
        return ChangeGitBranchSubmissionEntity(self, data)


    def ChangeGitCommitIdentity(self, data=None) -> "ChangeGitCommitIdentityEntity":
        """Entity factory: client.ChangeGitCommitIdentity().list() / client.ChangeGitCommitIdentity().load({"id": ...})."""
        from composal_sdk.entity.change_git_commit_identity_entity import ChangeGitCommitIdentityEntity
        return ChangeGitCommitIdentityEntity(self, data)


    def ChangeGitPublication(self, data=None) -> "ChangeGitPublicationEntity":
        """Entity factory: client.ChangeGitPublication().list() / client.ChangeGitPublication().load({"id": ...})."""
        from composal_sdk.entity.change_git_publication_entity import ChangeGitPublicationEntity
        return ChangeGitPublicationEntity(self, data)


    def ChangeGroupMember(self, data=None) -> "ChangeGroupMemberEntity":
        """Entity factory: client.ChangeGroupMember().list() / client.ChangeGroupMember().load({"id": ...})."""
        from composal_sdk.entity.change_group_member_entity import ChangeGroupMemberEntity
        return ChangeGroupMemberEntity(self, data)


    def ChangeLabel(self, data=None) -> "ChangeLabelEntity":
        """Entity factory: client.ChangeLabel().list() / client.ChangeLabel().load({"id": ...})."""
        from composal_sdk.entity.change_label_entity import ChangeLabelEntity
        return ChangeLabelEntity(self, data)


    def ChangeLandingHold(self, data=None) -> "ChangeLandingHoldEntity":
        """Entity factory: client.ChangeLandingHold().list() / client.ChangeLandingHold().load({"id": ...})."""
        from composal_sdk.entity.change_landing_hold_entity import ChangeLandingHoldEntity
        return ChangeLandingHoldEntity(self, data)


    def ChangeLandingRequest(self, data=None) -> "ChangeLandingRequestEntity":
        """Entity factory: client.ChangeLandingRequest().list() / client.ChangeLandingRequest().load({"id": ...})."""
        from composal_sdk.entity.change_landing_request_entity import ChangeLandingRequestEntity
        return ChangeLandingRequestEntity(self, data)


    def ChangeRequestChange(self, data=None) -> "ChangeRequestChangeEntity":
        """Entity factory: client.ChangeRequestChange().list() / client.ChangeRequestChange().load({"id": ...})."""
        from composal_sdk.entity.change_request_change_entity import ChangeRequestChangeEntity
        return ChangeRequestChangeEntity(self, data)


    def ChangeReviewer(self, data=None) -> "ChangeReviewerEntity":
        """Entity factory: client.ChangeReviewer().list() / client.ChangeReviewer().load({"id": ...})."""
        from composal_sdk.entity.change_reviewer_entity import ChangeReviewerEntity
        return ChangeReviewerEntity(self, data)


    def ChangeTranscript(self, data=None) -> "ChangeTranscriptEntity":
        """Entity factory: client.ChangeTranscript().list() / client.ChangeTranscript().load({"id": ...})."""
        from composal_sdk.entity.change_transcript_entity import ChangeTranscriptEntity
        return ChangeTranscriptEntity(self, data)


    def ChangeTranscriptSummary(self, data=None) -> "ChangeTranscriptSummaryEntity":
        """Entity factory: client.ChangeTranscriptSummary().list() / client.ChangeTranscriptSummary().load({"id": ...})."""
        from composal_sdk.entity.change_transcript_summary_entity import ChangeTranscriptSummaryEntity
        return ChangeTranscriptSummaryEntity(self, data)


    def CheckpointPrepareChunk(self, data=None) -> "CheckpointPrepareChunkEntity":
        """Entity factory: client.CheckpointPrepareChunk().list() / client.CheckpointPrepareChunk().load({"id": ...})."""
        from composal_sdk.entity.checkpoint_prepare_chunk_entity import CheckpointPrepareChunkEntity
        return CheckpointPrepareChunkEntity(self, data)


    def CiNode(self, data=None) -> "CiNodeEntity":
        """Entity factory: client.CiNode().list() / client.CiNode().load({"id": ...})."""
        from composal_sdk.entity.ci_node_entity import CiNodeEntity
        return CiNodeEntity(self, data)


    def CiPipeline(self, data=None) -> "CiPipelineEntity":
        """Entity factory: client.CiPipeline().list() / client.CiPipeline().load({"id": ...})."""
        from composal_sdk.entity.ci_pipeline_entity import CiPipelineEntity
        return CiPipelineEntity(self, data)


    def CiPipelineRun(self, data=None) -> "CiPipelineRunEntity":
        """Entity factory: client.CiPipelineRun().list() / client.CiPipelineRun().load({"id": ...})."""
        from composal_sdk.entity.ci_pipeline_run_entity import CiPipelineRunEntity
        return CiPipelineRunEntity(self, data)


    def CiRunnerPool(self, data=None) -> "CiRunnerPoolEntity":
        """Entity factory: client.CiRunnerPool().list() / client.CiRunnerPool().load({"id": ...})."""
        from composal_sdk.entity.ci_runner_pool_entity import CiRunnerPoolEntity
        return CiRunnerPoolEntity(self, data)


    def CiStatus(self, data=None) -> "CiStatusEntity":
        """Entity factory: client.CiStatus().list() / client.CiStatus().load({"id": ...})."""
        from composal_sdk.entity.ci_status_entity import CiStatusEntity
        return CiStatusEntity(self, data)


    def CliEvent(self, data=None) -> "CliEventEntity":
        """Entity factory: client.CliEvent().list() / client.CliEvent().load({"id": ...})."""
        from composal_sdk.entity.cli_event_entity import CliEventEntity
        return CliEventEntity(self, data)


    def CliRelease(self, data=None) -> "CliReleaseEntity":
        """Entity factory: client.CliRelease().list() / client.CliRelease().load({"id": ...})."""
        from composal_sdk.entity.cli_release_entity import CliReleaseEntity
        return CliReleaseEntity(self, data)


    def CloudWorkspaceBackupObject(self, data=None) -> "CloudWorkspaceBackupObjectEntity":
        """Entity factory: client.CloudWorkspaceBackupObject().list() / client.CloudWorkspaceBackupObject().load({"id": ...})."""
        from composal_sdk.entity.cloud_workspace_backup_object_entity import CloudWorkspaceBackupObjectEntity
        return CloudWorkspaceBackupObjectEntity(self, data)


    def CodeRuleEvaluation(self, data=None) -> "CodeRuleEvaluationEntity":
        """Entity factory: client.CodeRuleEvaluation().list() / client.CodeRuleEvaluation().load({"id": ...})."""
        from composal_sdk.entity.code_rule_evaluation_entity import CodeRuleEvaluationEntity
        return CodeRuleEvaluationEntity(self, data)


    def ComSiteAccess(self, data=None) -> "ComSiteAccessEntity":
        """Entity factory: client.ComSiteAccess().list() / client.ComSiteAccess().load({"id": ...})."""
        from composal_sdk.entity.com_site_access_entity import ComSiteAccessEntity
        return ComSiteAccessEntity(self, data)


    def ComSiteAccessSession(self, data=None) -> "ComSiteAccessSessionEntity":
        """Entity factory: client.ComSiteAccessSession().list() / client.ComSiteAccessSession().load({"id": ...})."""
        from composal_sdk.entity.com_site_access_session_entity import ComSiteAccessSessionEntity
        return ComSiteAccessSessionEntity(self, data)


    def CommentThreadComment(self, data=None) -> "CommentThreadCommentEntity":
        """Entity factory: client.CommentThreadComment().list() / client.CommentThreadComment().load({"id": ...})."""
        from composal_sdk.entity.comment_thread_comment_entity import CommentThreadCommentEntity
        return CommentThreadCommentEntity(self, data)


    def CommitDiff(self, data=None) -> "CommitDiffEntity":
        """Entity factory: client.CommitDiff().list() / client.CommitDiff().load({"id": ...})."""
        from composal_sdk.entity.commit_diff_entity import CommitDiffEntity
        return CommitDiffEntity(self, data)


    def ConnectionRequest(self, data=None) -> "ConnectionRequestEntity":
        """Entity factory: client.ConnectionRequest().list() / client.ConnectionRequest().load({"id": ...})."""
        from composal_sdk.entity.connection_request_entity import ConnectionRequestEntity
        return ConnectionRequestEntity(self, data)


    def ConnectionSource(self, data=None) -> "ConnectionSourceEntity":
        """Entity factory: client.ConnectionSource().list() / client.ConnectionSource().load({"id": ...})."""
        from composal_sdk.entity.connection_source_entity import ConnectionSourceEntity
        return ConnectionSourceEntity(self, data)


    def ContactSubmission(self, data=None) -> "ContactSubmissionEntity":
        """Entity factory: client.ContactSubmission().list() / client.ContactSubmission().load({"id": ...})."""
        from composal_sdk.entity.contact_submission_entity import ContactSubmissionEntity
        return ContactSubmissionEntity(self, data)


    def ControlComputer(self, data=None) -> "ControlComputerEntity":
        """Entity factory: client.ControlComputer().list() / client.ControlComputer().load({"id": ...})."""
        from composal_sdk.entity.control_computer_entity import ControlComputerEntity
        return ControlComputerEntity(self, data)


    def ControlComputerControlOperation(self, data=None) -> "ControlComputerControlOperationEntity":
        """Entity factory: client.ControlComputerControlOperation().list() / client.ControlComputerControlOperation().load({"id": ...})."""
        from composal_sdk.entity.control_computer_control_operation_entity import ControlComputerControlOperationEntity
        return ControlComputerControlOperationEntity(self, data)


    def CoordinationWait(self, data=None) -> "CoordinationWaitEntity":
        """Entity factory: client.CoordinationWait().list() / client.CoordinationWait().load({"id": ...})."""
        from composal_sdk.entity.coordination_wait_entity import CoordinationWaitEntity
        return CoordinationWaitEntity(self, data)


    def CredentialSignInCheck(self, data=None) -> "CredentialSignInCheckEntity":
        """Entity factory: client.CredentialSignInCheck().list() / client.CredentialSignInCheck().load({"id": ...})."""
        from composal_sdk.entity.credential_sign_in_check_entity import CredentialSignInCheckEntity
        return CredentialSignInCheckEntity(self, data)


    def DataResourceRotateCredential(self, data=None) -> "DataResourceRotateCredentialEntity":
        """Entity factory: client.DataResourceRotateCredential().list() / client.DataResourceRotateCredential().load({"id": ...})."""
        from composal_sdk.entity.data_resource_rotate_credential_entity import DataResourceRotateCredentialEntity
        return DataResourceRotateCredentialEntity(self, data)


    def DeepScan(self, data=None) -> "DeepScanEntity":
        """Entity factory: client.DeepScan().list() / client.DeepScan().load({"id": ...})."""
        from composal_sdk.entity.deep_scan_entity import DeepScanEntity
        return DeepScanEntity(self, data)


    def DeepScanFinding(self, data=None) -> "DeepScanFindingEntity":
        """Entity factory: client.DeepScanFinding().list() / client.DeepScanFinding().load({"id": ...})."""
        from composal_sdk.entity.deep_scan_finding_entity import DeepScanFindingEntity
        return DeepScanFindingEntity(self, data)


    def DeepScanFlow(self, data=None) -> "DeepScanFlowEntity":
        """Entity factory: client.DeepScanFlow().list() / client.DeepScanFlow().load({"id": ...})."""
        from composal_sdk.entity.deep_scan_flow_entity import DeepScanFlowEntity
        return DeepScanFlowEntity(self, data)


    def DeepScanMappedFlow(self, data=None) -> "DeepScanMappedFlowEntity":
        """Entity factory: client.DeepScanMappedFlow().list() / client.DeepScanMappedFlow().load({"id": ...})."""
        from composal_sdk.entity.deep_scan_mapped_flow_entity import DeepScanMappedFlowEntity
        return DeepScanMappedFlowEntity(self, data)


    def DeepScanOption(self, data=None) -> "DeepScanOptionEntity":
        """Entity factory: client.DeepScanOption().list() / client.DeepScanOption().load({"id": ...})."""
        from composal_sdk.entity.deep_scan_option_entity import DeepScanOptionEntity
        return DeepScanOptionEntity(self, data)


    def DemoShare(self, data=None) -> "DemoShareEntity":
        """Entity factory: client.DemoShare().list() / client.DemoShare().load({"id": ...})."""
        from composal_sdk.entity.demo_share_entity import DemoShareEntity
        return DemoShareEntity(self, data)


    def DemoShareSegment(self, data=None) -> "DemoShareSegmentEntity":
        """Entity factory: client.DemoShareSegment().list() / client.DemoShareSegment().load({"id": ...})."""
        from composal_sdk.entity.demo_share_segment_entity import DemoShareSegmentEntity
        return DemoShareSegmentEntity(self, data)


    def Deployment(self, data=None) -> "DeploymentEntity":
        """Entity factory: client.Deployment().list() / client.Deployment().load({"id": ...})."""
        from composal_sdk.entity.deployment_entity import DeploymentEntity
        return DeploymentEntity(self, data)


    def DeploymentDashboardNomad(self, data=None) -> "DeploymentDashboardNomadEntity":
        """Entity factory: client.DeploymentDashboardNomad().list() / client.DeploymentDashboardNomad().load({"id": ...})."""
        from composal_sdk.entity.deployment_dashboard_nomad_entity import DeploymentDashboardNomadEntity
        return DeploymentDashboardNomadEntity(self, data)


    def DeploymentDetail(self, data=None) -> "DeploymentDetailEntity":
        """Entity factory: client.DeploymentDetail().list() / client.DeploymentDetail().load({"id": ...})."""
        from composal_sdk.entity.deployment_detail_entity import DeploymentDetailEntity
        return DeploymentDetailEntity(self, data)


    def DeploymentFile(self, data=None) -> "DeploymentFileEntity":
        """Entity factory: client.DeploymentFile().list() / client.DeploymentFile().load({"id": ...})."""
        from composal_sdk.entity.deployment_file_entity import DeploymentFileEntity
        return DeploymentFileEntity(self, data)


    def DeploymentLog(self, data=None) -> "DeploymentLogEntity":
        """Entity factory: client.DeploymentLog().list() / client.DeploymentLog().load({"id": ...})."""
        from composal_sdk.entity.deployment_log_entity import DeploymentLogEntity
        return DeploymentLogEntity(self, data)


    def DeploymentMetric(self, data=None) -> "DeploymentMetricEntity":
        """Entity factory: client.DeploymentMetric().list() / client.DeploymentMetric().load({"id": ...})."""
        from composal_sdk.entity.deployment_metric_entity import DeploymentMetricEntity
        return DeploymentMetricEntity(self, data)


    def DeploymentPreview(self, data=None) -> "DeploymentPreviewEntity":
        """Entity factory: client.DeploymentPreview().list() / client.DeploymentPreview().load({"id": ...})."""
        from composal_sdk.entity.deployment_preview_entity import DeploymentPreviewEntity
        return DeploymentPreviewEntity(self, data)


    def DeploymentSetting(self, data=None) -> "DeploymentSettingEntity":
        """Entity factory: client.DeploymentSetting().list() / client.DeploymentSetting().load({"id": ...})."""
        from composal_sdk.entity.deployment_setting_entity import DeploymentSettingEntity
        return DeploymentSettingEntity(self, data)


    def DesktopLocalAgentModel(self, data=None) -> "DesktopLocalAgentModelEntity":
        """Entity factory: client.DesktopLocalAgentModel().list() / client.DesktopLocalAgentModel().load({"id": ...})."""
        from composal_sdk.entity.desktop_local_agent_model_entity import DesktopLocalAgentModelEntity
        return DesktopLocalAgentModelEntity(self, data)


    def DesktopLocalAgentResponse(self, data=None) -> "DesktopLocalAgentResponseEntity":
        """Entity factory: client.DesktopLocalAgentResponse().list() / client.DesktopLocalAgentResponse().load({"id": ...})."""
        from composal_sdk.entity.desktop_local_agent_response_entity import DesktopLocalAgentResponseEntity
        return DesktopLocalAgentResponseEntity(self, data)


    def Device(self, data=None) -> "DeviceEntity":
        """Entity factory: client.Device().list() / client.Device().load({"id": ...})."""
        from composal_sdk.entity.device_entity import DeviceEntity
        return DeviceEntity(self, data)


    def DeviceBrowserOperation(self, data=None) -> "DeviceBrowserOperationEntity":
        """Entity factory: client.DeviceBrowserOperation().list() / client.DeviceBrowserOperation().load({"id": ...})."""
        from composal_sdk.entity.device_browser_operation_entity import DeviceBrowserOperationEntity
        return DeviceBrowserOperationEntity(self, data)


    def DeviceControlMessage(self, data=None) -> "DeviceControlMessageEntity":
        """Entity factory: client.DeviceControlMessage().list() / client.DeviceControlMessage().load({"id": ...})."""
        from composal_sdk.entity.device_control_message_entity import DeviceControlMessageEntity
        return DeviceControlMessageEntity(self, data)


    def DeviceControlOperation(self, data=None) -> "DeviceControlOperationEntity":
        """Entity factory: client.DeviceControlOperation().list() / client.DeviceControlOperation().load({"id": ...})."""
        from composal_sdk.entity.device_control_operation_entity import DeviceControlOperationEntity
        return DeviceControlOperationEntity(self, data)


    def DeviceEnterpriseRelay(self, data=None) -> "DeviceEnterpriseRelayEntity":
        """Entity factory: client.DeviceEnterpriseRelay().list() / client.DeviceEnterpriseRelay().load({"id": ...})."""
        from composal_sdk.entity.device_enterprise_relay_entity import DeviceEnterpriseRelayEntity
        return DeviceEnterpriseRelayEntity(self, data)


    def DeviceFolderListing(self, data=None) -> "DeviceFolderListingEntity":
        """Entity factory: client.DeviceFolderListing().list() / client.DeviceFolderListing().load({"id": ...})."""
        from composal_sdk.entity.device_folder_listing_entity import DeviceFolderListingEntity
        return DeviceFolderListingEntity(self, data)


    def DeviceGrant(self, data=None) -> "DeviceGrantEntity":
        """Entity factory: client.DeviceGrant().list() / client.DeviceGrant().load({"id": ...})."""
        from composal_sdk.entity.device_grant_entity import DeviceGrantEntity
        return DeviceGrantEntity(self, data)


    def DeviceInvocation(self, data=None) -> "DeviceInvocationEntity":
        """Entity factory: client.DeviceInvocation().list() / client.DeviceInvocation().load({"id": ...})."""
        from composal_sdk.entity.device_invocation_entity import DeviceInvocationEntity
        return DeviceInvocationEntity(self, data)


    def DeviceLocalEvent(self, data=None) -> "DeviceLocalEventEntity":
        """Entity factory: client.DeviceLocalEvent().list() / client.DeviceLocalEvent().load({"id": ...})."""
        from composal_sdk.entity.device_local_event_entity import DeviceLocalEventEntity
        return DeviceLocalEventEntity(self, data)


    def DevicePairing(self, data=None) -> "DevicePairingEntity":
        """Entity factory: client.DevicePairing().list() / client.DevicePairing().load({"id": ...})."""
        from composal_sdk.entity.device_pairing_entity import DevicePairingEntity
        return DevicePairingEntity(self, data)


    def DeviceProject(self, data=None) -> "DeviceProjectEntity":
        """Entity factory: client.DeviceProject().list() / client.DeviceProject().load({"id": ...})."""
        from composal_sdk.entity.device_project_entity import DeviceProjectEntity
        return DeviceProjectEntity(self, data)


    def DeviceScheduledCheckIn(self, data=None) -> "DeviceScheduledCheckInEntity":
        """Entity factory: client.DeviceScheduledCheckIn().list() / client.DeviceScheduledCheckIn().load({"id": ...})."""
        from composal_sdk.entity.device_scheduled_check_in_entity import DeviceScheduledCheckInEntity
        return DeviceScheduledCheckInEntity(self, data)


    def DockerBuilder(self, data=None) -> "DockerBuilderEntity":
        """Entity factory: client.DockerBuilder().list() / client.DockerBuilder().load({"id": ...})."""
        from composal_sdk.entity.docker_builder_entity import DockerBuilderEntity
        return DockerBuilderEntity(self, data)


    def DockerBuilderSession(self, data=None) -> "DockerBuilderSessionEntity":
        """Entity factory: client.DockerBuilderSession().list() / client.DockerBuilderSession().load({"id": ...})."""
        from composal_sdk.entity.docker_builder_session_entity import DockerBuilderSessionEntity
        return DockerBuilderSessionEntity(self, data)


    def DockerBuilderSetting(self, data=None) -> "DockerBuilderSettingEntity":
        """Entity factory: client.DockerBuilderSetting().list() / client.DockerBuilderSetting().load({"id": ...})."""
        from composal_sdk.entity.docker_builder_setting_entity import DockerBuilderSettingEntity
        return DockerBuilderSettingEntity(self, data)


    def DomainDnsIntegration(self, data=None) -> "DomainDnsIntegrationEntity":
        """Entity factory: client.DomainDnsIntegration().list() / client.DomainDnsIntegration().load({"id": ...})."""
        from composal_sdk.entity.domain_dns_integration_entity import DomainDnsIntegrationEntity
        return DomainDnsIntegrationEntity(self, data)


    def DomainPathRule(self, data=None) -> "DomainPathRuleEntity":
        """Entity factory: client.DomainPathRule().list() / client.DomainPathRule().load({"id": ...})."""
        from composal_sdk.entity.domain_path_rule_entity import DomainPathRuleEntity
        return DomainPathRuleEntity(self, data)


    def Dream(self, data=None) -> "DreamEntity":
        """Entity factory: client.Dream().list() / client.Dream().load({"id": ...})."""
        from composal_sdk.entity.dream_entity import DreamEntity
        return DreamEntity(self, data)


    def Edge(self, data=None) -> "EdgeEntity":
        """Entity factory: client.Edge().list() / client.Edge().load({"id": ...})."""
        from composal_sdk.entity.edge_entity import EdgeEntity
        return EdgeEntity(self, data)


    def EmailVerification(self, data=None) -> "EmailVerificationEntity":
        """Entity factory: client.EmailVerification().list() / client.EmailVerification().load({"id": ...})."""
        from composal_sdk.entity.email_verification_entity import EmailVerificationEntity
        return EmailVerificationEntity(self, data)


    def Environment(self, data=None) -> "EnvironmentEntity":
        """Entity factory: client.Environment().list() / client.Environment().load({"id": ...})."""
        from composal_sdk.entity.environment_entity import EnvironmentEntity
        return EnvironmentEntity(self, data)


    def EnvironmentDiscoveryRun(self, data=None) -> "EnvironmentDiscoveryRunEntity":
        """Entity factory: client.EnvironmentDiscoveryRun().list() / client.EnvironmentDiscoveryRun().load({"id": ...})."""
        from composal_sdk.entity.environment_discovery_run_entity import EnvironmentDiscoveryRunEntity
        return EnvironmentDiscoveryRunEntity(self, data)


    def EnvironmentExploration(self, data=None) -> "EnvironmentExplorationEntity":
        """Entity factory: client.EnvironmentExploration().list() / client.EnvironmentExploration().load({"id": ...})."""
        from composal_sdk.entity.environment_exploration_entity import EnvironmentExplorationEntity
        return EnvironmentExplorationEntity(self, data)


    def EnvironmentFirstRun(self, data=None) -> "EnvironmentFirstRunEntity":
        """Entity factory: client.EnvironmentFirstRun().list() / client.EnvironmentFirstRun().load({"id": ...})."""
        from composal_sdk.entity.environment_first_run_entity import EnvironmentFirstRunEntity
        return EnvironmentFirstRunEntity(self, data)


    def EnvironmentRevision(self, data=None) -> "EnvironmentRevisionEntity":
        """Entity factory: client.EnvironmentRevision().list() / client.EnvironmentRevision().load({"id": ...})."""
        from composal_sdk.entity.environment_revision_entity import EnvironmentRevisionEntity
        return EnvironmentRevisionEntity(self, data)


    def EnvironmentSecretBinding(self, data=None) -> "EnvironmentSecretBindingEntity":
        """Entity factory: client.EnvironmentSecretBinding().list() / client.EnvironmentSecretBinding().load({"id": ...})."""
        from composal_sdk.entity.environment_secret_binding_entity import EnvironmentSecretBindingEntity
        return EnvironmentSecretBindingEntity(self, data)


    def EnvironmentTestAccount(self, data=None) -> "EnvironmentTestAccountEntity":
        """Entity factory: client.EnvironmentTestAccount().list() / client.EnvironmentTestAccount().load({"id": ...})."""
        from composal_sdk.entity.environment_test_account_entity import EnvironmentTestAccountEntity
        return EnvironmentTestAccountEntity(self, data)


    def Evidence(self, data=None) -> "EvidenceEntity":
        """Entity factory: client.Evidence().list() / client.Evidence().load({"id": ...})."""
        from composal_sdk.entity.evidence_entity import EvidenceEntity
        return EvidenceEntity(self, data)


    def ExecutionDesiredState(self, data=None) -> "ExecutionDesiredStateEntity":
        """Entity factory: client.ExecutionDesiredState().list() / client.ExecutionDesiredState().load({"id": ...})."""
        from composal_sdk.entity.execution_desired_state_entity import ExecutionDesiredStateEntity
        return ExecutionDesiredStateEntity(self, data)


    def ExecutionReconcilerTick(self, data=None) -> "ExecutionReconcilerTickEntity":
        """Entity factory: client.ExecutionReconcilerTick().list() / client.ExecutionReconcilerTick().load({"id": ...})."""
        from composal_sdk.entity.execution_reconciler_tick_entity import ExecutionReconcilerTickEntity
        return ExecutionReconcilerTickEntity(self, data)


    def ExecutionRelease(self, data=None) -> "ExecutionReleaseEntity":
        """Entity factory: client.ExecutionRelease().list() / client.ExecutionRelease().load({"id": ...})."""
        from composal_sdk.entity.execution_release_entity import ExecutionReleaseEntity
        return ExecutionReleaseEntity(self, data)


    def ExecutionRuntimeInstance(self, data=None) -> "ExecutionRuntimeInstanceEntity":
        """Entity factory: client.ExecutionRuntimeInstance().list() / client.ExecutionRuntimeInstance().load({"id": ...})."""
        from composal_sdk.entity.execution_runtime_instance_entity import ExecutionRuntimeInstanceEntity
        return ExecutionRuntimeInstanceEntity(self, data)


    def Exploration(self, data=None) -> "ExplorationEntity":
        """Entity factory: client.Exploration().list() / client.Exploration().load({"id": ...})."""
        from composal_sdk.entity.exploration_entity import ExplorationEntity
        return ExplorationEntity(self, data)


    def ExplorationMessage(self, data=None) -> "ExplorationMessageEntity":
        """Entity factory: client.ExplorationMessage().list() / client.ExplorationMessage().load({"id": ...})."""
        from composal_sdk.entity.exploration_message_entity import ExplorationMessageEntity
        return ExplorationMessageEntity(self, data)


    def ExplorationReport(self, data=None) -> "ExplorationReportEntity":
        """Entity factory: client.ExplorationReport().list() / client.ExplorationReport().load({"id": ...})."""
        from composal_sdk.entity.exploration_report_entity import ExplorationReportEntity
        return ExplorationReportEntity(self, data)


    def ExplorationScenario(self, data=None) -> "ExplorationScenarioEntity":
        """Entity factory: client.ExplorationScenario().list() / client.ExplorationScenario().load({"id": ...})."""
        from composal_sdk.entity.exploration_scenario_entity import ExplorationScenarioEntity
        return ExplorationScenarioEntity(self, data)


    def Finding(self, data=None) -> "FindingEntity":
        """Entity factory: client.Finding().list() / client.Finding().load({"id": ...})."""
        from composal_sdk.entity.finding_entity import FindingEntity
        return FindingEntity(self, data)


    def Gh(self, data=None) -> "GhEntity":
        """Entity factory: client.Gh().list() / client.Gh().load({"id": ...})."""
        from composal_sdk.entity.gh_entity import GhEntity
        return GhEntity(self, data)


    def GitImport(self, data=None) -> "GitImportEntity":
        """Entity factory: client.GitImport().list() / client.GitImport().load({"id": ...})."""
        from composal_sdk.entity.git_import_entity import GitImportEntity
        return GitImportEntity(self, data)


    def Github(self, data=None) -> "GithubEntity":
        """Entity factory: client.Github().list() / client.Github().load({"id": ...})."""
        from composal_sdk.entity.github_entity import GithubEntity
        return GithubEntity(self, data)


    def GithubApp(self, data=None) -> "GithubAppEntity":
        """Entity factory: client.GithubApp().list() / client.GithubApp().load({"id": ...})."""
        from composal_sdk.entity.github_app_entity import GithubAppEntity
        return GithubAppEntity(self, data)


    def GithubAppImportableRepository(self, data=None) -> "GithubAppImportableRepositoryEntity":
        """Entity factory: client.GithubAppImportableRepository().list() / client.GithubAppImportableRepository().load({"id": ...})."""
        from composal_sdk.entity.github_app_importable_repository_entity import GithubAppImportableRepositoryEntity
        return GithubAppImportableRepositoryEntity(self, data)


    def GithubAppInstallation(self, data=None) -> "GithubAppInstallationEntity":
        """Entity factory: client.GithubAppInstallation().list() / client.GithubAppInstallation().load({"id": ...})."""
        from composal_sdk.entity.github_app_installation_entity import GithubAppInstallationEntity
        return GithubAppInstallationEntity(self, data)


    def GithubAppInstallationAuthorization(self, data=None) -> "GithubAppInstallationAuthorizationEntity":
        """Entity factory: client.GithubAppInstallationAuthorization().list() / client.GithubAppInstallationAuthorization().load({"id": ...})."""
        from composal_sdk.entity.github_app_installation_authorization_entity import GithubAppInstallationAuthorizationEntity
        return GithubAppInstallationAuthorizationEntity(self, data)


    def GithubAppUserAuthorization(self, data=None) -> "GithubAppUserAuthorizationEntity":
        """Entity factory: client.GithubAppUserAuthorization().list() / client.GithubAppUserAuthorization().load({"id": ...})."""
        from composal_sdk.entity.github_app_user_authorization_entity import GithubAppUserAuthorizationEntity
        return GithubAppUserAuthorizationEntity(self, data)


    def GithubCiRepository(self, data=None) -> "GithubCiRepositoryEntity":
        """Entity factory: client.GithubCiRepository().list() / client.GithubCiRepository().load({"id": ...})."""
        from composal_sdk.entity.github_ci_repository_entity import GithubCiRepositoryEntity
        return GithubCiRepositoryEntity(self, data)


    def GithubCiRepositoryCompatibilityReport(self, data=None) -> "GithubCiRepositoryCompatibilityReportEntity":
        """Entity factory: client.GithubCiRepositoryCompatibilityReport().list() / client.GithubCiRepositoryCompatibilityReport().load({"id": ...})."""
        from composal_sdk.entity.github_ci_repository_compatibility_report_entity import GithubCiRepositoryCompatibilityReportEntity
        return GithubCiRepositoryCompatibilityReportEntity(self, data)


    def GithubConnection(self, data=None) -> "GithubConnectionEntity":
        """Entity factory: client.GithubConnection().list() / client.GithubConnection().load({"id": ...})."""
        from composal_sdk.entity.github_connection_entity import GithubConnectionEntity
        return GithubConnectionEntity(self, data)


    def GithubIntegration(self, data=None) -> "GithubIntegrationEntity":
        """Entity factory: client.GithubIntegration().list() / client.GithubIntegration().load({"id": ...})."""
        from composal_sdk.entity.github_integration_entity import GithubIntegrationEntity
        return GithubIntegrationEntity(self, data)


    def GithubOnboarding(self, data=None) -> "GithubOnboardingEntity":
        """Entity factory: client.GithubOnboarding().list() / client.GithubOnboarding().load({"id": ...})."""
        from composal_sdk.entity.github_onboarding_entity import GithubOnboardingEntity
        return GithubOnboardingEntity(self, data)


    def GithubOnboardingBranch(self, data=None) -> "GithubOnboardingBranchEntity":
        """Entity factory: client.GithubOnboardingBranch().list() / client.GithubOnboardingBranch().load({"id": ...})."""
        from composal_sdk.entity.github_onboarding_branch_entity import GithubOnboardingBranchEntity
        return GithubOnboardingBranchEntity(self, data)


    def GithubOnboardingImport(self, data=None) -> "GithubOnboardingImportEntity":
        """Entity factory: client.GithubOnboardingImport().list() / client.GithubOnboardingImport().load({"id": ...})."""
        from composal_sdk.entity.github_onboarding_import_entity import GithubOnboardingImportEntity
        return GithubOnboardingImportEntity(self, data)


    def GithubOnboardingImportBatch(self, data=None) -> "GithubOnboardingImportBatchEntity":
        """Entity factory: client.GithubOnboardingImportBatch().list() / client.GithubOnboardingImportBatch().load({"id": ...})."""
        from composal_sdk.entity.github_onboarding_import_batch_entity import GithubOnboardingImportBatchEntity
        return GithubOnboardingImportBatchEntity(self, data)


    def GithubOnboardingImportItem(self, data=None) -> "GithubOnboardingImportItemEntity":
        """Entity factory: client.GithubOnboardingImportItem().list() / client.GithubOnboardingImportItem().load({"id": ...})."""
        from composal_sdk.entity.github_onboarding_import_item_entity import GithubOnboardingImportItemEntity
        return GithubOnboardingImportItemEntity(self, data)


    def GithubPullRequest(self, data=None) -> "GithubPullRequestEntity":
        """Entity factory: client.GithubPullRequest().list() / client.GithubPullRequest().load({"id": ...})."""
        from composal_sdk.entity.github_pull_request_entity import GithubPullRequestEntity
        return GithubPullRequestEntity(self, data)


    def GithubRunnerAdmission(self, data=None) -> "GithubRunnerAdmissionEntity":
        """Entity factory: client.GithubRunnerAdmission().list() / client.GithubRunnerAdmission().load({"id": ...})."""
        from composal_sdk.entity.github_runner_admission_entity import GithubRunnerAdmissionEntity
        return GithubRunnerAdmissionEntity(self, data)


    def GithubRunnerCache(self, data=None) -> "GithubRunnerCacheEntity":
        """Entity factory: client.GithubRunnerCache().list() / client.GithubRunnerCache().load({"id": ...})."""
        from composal_sdk.entity.github_runner_cache_entity import GithubRunnerCacheEntity
        return GithubRunnerCacheEntity(self, data)


    def GithubRunnerEgress(self, data=None) -> "GithubRunnerEgressEntity":
        """Entity factory: client.GithubRunnerEgress().list() / client.GithubRunnerEgress().load({"id": ...})."""
        from composal_sdk.entity.github_runner_egress_entity import GithubRunnerEgressEntity
        return GithubRunnerEgressEntity(self, data)


    def GithubRunnerHistory(self, data=None) -> "GithubRunnerHistoryEntity":
        """Entity factory: client.GithubRunnerHistory().list() / client.GithubRunnerHistory().load({"id": ...})."""
        from composal_sdk.entity.github_runner_history_entity import GithubRunnerHistoryEntity
        return GithubRunnerHistoryEntity(self, data)


    def GithubRunnerImage(self, data=None) -> "GithubRunnerImageEntity":
        """Entity factory: client.GithubRunnerImage().list() / client.GithubRunnerImage().load({"id": ...})."""
        from composal_sdk.entity.github_runner_image_entity import GithubRunnerImageEntity
        return GithubRunnerImageEntity(self, data)


    def GithubRunnerPool(self, data=None) -> "GithubRunnerPoolEntity":
        """Entity factory: client.GithubRunnerPool().list() / client.GithubRunnerPool().load({"id": ...})."""
        from composal_sdk.entity.github_runner_pool_entity import GithubRunnerPoolEntity
        return GithubRunnerPoolEntity(self, data)


    def GithubRunnerSetup(self, data=None) -> "GithubRunnerSetupEntity":
        """Entity factory: client.GithubRunnerSetup().list() / client.GithubRunnerSetup().load({"id": ...})."""
        from composal_sdk.entity.github_runner_setup_entity import GithubRunnerSetupEntity
        return GithubRunnerSetupEntity(self, data)


    def Gitlab(self, data=None) -> "GitlabEntity":
        """Entity factory: client.Gitlab().list() / client.Gitlab().load({"id": ...})."""
        from composal_sdk.entity.gitlab_entity import GitlabEntity
        return GitlabEntity(self, data)


    def GitlabConnection(self, data=None) -> "GitlabConnectionEntity":
        """Entity factory: client.GitlabConnection().list() / client.GitlabConnection().load({"id": ...})."""
        from composal_sdk.entity.gitlab_connection_entity import GitlabConnectionEntity
        return GitlabConnectionEntity(self, data)


    def GitlabImport(self, data=None) -> "GitlabImportEntity":
        """Entity factory: client.GitlabImport().list() / client.GitlabImport().load({"id": ...})."""
        from composal_sdk.entity.gitlab_import_entity import GitlabImportEntity
        return GitlabImportEntity(self, data)


    def GitlabOauth(self, data=None) -> "GitlabOauthEntity":
        """Entity factory: client.GitlabOauth().list() / client.GitlabOauth().load({"id": ...})."""
        from composal_sdk.entity.gitlab_oauth_entity import GitlabOauthEntity
        return GitlabOauthEntity(self, data)


    def GrantAllAgent(self, data=None) -> "GrantAllAgentEntity":
        """Entity factory: client.GrantAllAgent().list() / client.GrantAllAgent().load({"id": ...})."""
        from composal_sdk.entity.grant_all_agent_entity import GrantAllAgentEntity
        return GrantAllAgentEntity(self, data)


    def HostingAppDomain(self, data=None) -> "HostingAppDomainEntity":
        """Entity factory: client.HostingAppDomain().list() / client.HostingAppDomain().load({"id": ...})."""
        from composal_sdk.entity.hosting_app_domain_entity import HostingAppDomainEntity
        return HostingAppDomainEntity(self, data)


    def IdentityOrganization(self, data=None) -> "IdentityOrganizationEntity":
        """Entity factory: client.IdentityOrganization().list() / client.IdentityOrganization().load({"id": ...})."""
        from composal_sdk.entity.identity_organization_entity import IdentityOrganizationEntity
        return IdentityOrganizationEntity(self, data)


    def ImageRepository(self, data=None) -> "ImageRepositoryEntity":
        """Entity factory: client.ImageRepository().list() / client.ImageRepository().load({"id": ...})."""
        from composal_sdk.entity.image_repository_entity import ImageRepositoryEntity
        return ImageRepositoryEntity(self, data)


    def ImageRepositoryTag(self, data=None) -> "ImageRepositoryTagEntity":
        """Entity factory: client.ImageRepositoryTag().list() / client.ImageRepositoryTag().load({"id": ...})."""
        from composal_sdk.entity.image_repository_tag_entity import ImageRepositoryTagEntity
        return ImageRepositoryTagEntity(self, data)


    def ImportBranchPolicy(self, data=None) -> "ImportBranchPolicyEntity":
        """Entity factory: client.ImportBranchPolicy().list() / client.ImportBranchPolicy().load({"id": ...})."""
        from composal_sdk.entity.import_branch_policy_entity import ImportBranchPolicyEntity
        return ImportBranchPolicyEntity(self, data)


    def Integration(self, data=None) -> "IntegrationEntity":
        """Entity factory: client.Integration().list() / client.Integration().load({"id": ...})."""
        from composal_sdk.entity.integration_entity import IntegrationEntity
        return IntegrationEntity(self, data)


    def InteractionResponse(self, data=None) -> "InteractionResponseEntity":
        """Entity factory: client.InteractionResponse().list() / client.InteractionResponse().load({"id": ...})."""
        from composal_sdk.entity.interaction_response_entity import InteractionResponseEntity
        return InteractionResponseEntity(self, data)


    def Invitation(self, data=None) -> "InvitationEntity":
        """Entity factory: client.Invitation().list() / client.Invitation().load({"id": ...})."""
        from composal_sdk.entity.invitation_entity import InvitationEntity
        return InvitationEntity(self, data)


    def InvocationControl(self, data=None) -> "InvocationControlEntity":
        """Entity factory: client.InvocationControl().list() / client.InvocationControl().load({"id": ...})."""
        from composal_sdk.entity.invocation_control_entity import InvocationControlEntity
        return InvocationControlEntity(self, data)


    def JobLogChunk(self, data=None) -> "JobLogChunkEntity":
        """Entity factory: client.JobLogChunk().list() / client.JobLogChunk().load({"id": ...})."""
        from composal_sdk.entity.job_log_chunk_entity import JobLogChunkEntity
        return JobLogChunkEntity(self, data)


    def JobStep(self, data=None) -> "JobStepEntity":
        """Entity factory: client.JobStep().list() / client.JobStep().load({"id": ...})."""
        from composal_sdk.entity.job_step_entity import JobStepEntity
        return JobStepEntity(self, data)


    def JobWorkspace(self, data=None) -> "JobWorkspaceEntity":
        """Entity factory: client.JobWorkspace().list() / client.JobWorkspace().load({"id": ...})."""
        from composal_sdk.entity.job_workspace_entity import JobWorkspaceEntity
        return JobWorkspaceEntity(self, data)


    def JourneyVariantReplay(self, data=None) -> "JourneyVariantReplayEntity":
        """Entity factory: client.JourneyVariantReplay().list() / client.JourneyVariantReplay().load({"id": ...})."""
        from composal_sdk.entity.journey_variant_replay_entity import JourneyVariantReplayEntity
        return JourneyVariantReplayEntity(self, data)


    def Knowledge(self, data=None) -> "KnowledgeEntity":
        """Entity factory: client.Knowledge().list() / client.Knowledge().load({"id": ...})."""
        from composal_sdk.entity.knowledge_entity import KnowledgeEntity
        return KnowledgeEntity(self, data)


    def Known(self, data=None) -> "KnownEntity":
        """Entity factory: client.Known().list() / client.Known().load({"id": ...})."""
        from composal_sdk.entity.known_entity import KnownEntity
        return KnownEntity(self, data)


    def Label(self, data=None) -> "LabelEntity":
        """Entity factory: client.Label().list() / client.Label().load({"id": ...})."""
        from composal_sdk.entity.label_entity import LabelEntity
        return LabelEntity(self, data)


    def LeaseArtifact(self, data=None) -> "LeaseArtifactEntity":
        """Entity factory: client.LeaseArtifact().list() / client.LeaseArtifact().load({"id": ...})."""
        from composal_sdk.entity.lease_artifact_entity import LeaseArtifactEntity
        return LeaseArtifactEntity(self, data)


    def LeaseCache(self, data=None) -> "LeaseCacheEntity":
        """Entity factory: client.LeaseCache().list() / client.LeaseCache().load({"id": ...})."""
        from composal_sdk.entity.lease_cache_entity import LeaseCacheEntity
        return LeaseCacheEntity(self, data)


    def LeaseLogChunk(self, data=None) -> "LeaseLogChunkEntity":
        """Entity factory: client.LeaseLogChunk().list() / client.LeaseLogChunk().load({"id": ...})."""
        from composal_sdk.entity.lease_log_chunk_entity import LeaseLogChunkEntity
        return LeaseLogChunkEntity(self, data)


    def LeaseReconciliation(self, data=None) -> "LeaseReconciliationEntity":
        """Entity factory: client.LeaseReconciliation().list() / client.LeaseReconciliation().load({"id": ...})."""
        from composal_sdk.entity.lease_reconciliation_entity import LeaseReconciliationEntity
        return LeaseReconciliationEntity(self, data)


    def LeaseStep(self, data=None) -> "LeaseStepEntity":
        """Entity factory: client.LeaseStep().list() / client.LeaseStep().load({"id": ...})."""
        from composal_sdk.entity.lease_step_entity import LeaseStepEntity
        return LeaseStepEntity(self, data)


    def LeaseVerifyDiagnostic(self, data=None) -> "LeaseVerifyDiagnosticEntity":
        """Entity factory: client.LeaseVerifyDiagnostic().list() / client.LeaseVerifyDiagnostic().load({"id": ...})."""
        from composal_sdk.entity.lease_verify_diagnostic_entity import LeaseVerifyDiagnosticEntity
        return LeaseVerifyDiagnosticEntity(self, data)


    def LeaseVerifySecret(self, data=None) -> "LeaseVerifySecretEntity":
        """Entity factory: client.LeaseVerifySecret().list() / client.LeaseVerifySecret().load({"id": ...})."""
        from composal_sdk.entity.lease_verify_secret_entity import LeaseVerifySecretEntity
        return LeaseVerifySecretEntity(self, data)


    def LeaseWorkspace(self, data=None) -> "LeaseWorkspaceEntity":
        """Entity factory: client.LeaseWorkspace().list() / client.LeaseWorkspace().load({"id": ...})."""
        from composal_sdk.entity.lease_workspace_entity import LeaseWorkspaceEntity
        return LeaseWorkspaceEntity(self, data)


    def LocalAgentDecision(self, data=None) -> "LocalAgentDecisionEntity":
        """Entity factory: client.LocalAgentDecision().list() / client.LocalAgentDecision().load({"id": ...})."""
        from composal_sdk.entity.local_agent_decision_entity import LocalAgentDecisionEntity
        return LocalAgentDecisionEntity(self, data)


    def LocalAgentResponse(self, data=None) -> "LocalAgentResponseEntity":
        """Entity factory: client.LocalAgentResponse().list() / client.LocalAgentResponse().load({"id": ...})."""
        from composal_sdk.entity.local_agent_response_entity import LocalAgentResponseEntity
        return LocalAgentResponseEntity(self, data)


    def LocalThreadDelivery(self, data=None) -> "LocalThreadDeliveryEntity":
        """Entity factory: client.LocalThreadDelivery().list() / client.LocalThreadDelivery().load({"id": ...})."""
        from composal_sdk.entity.local_thread_delivery_entity import LocalThreadDeliveryEntity
        return LocalThreadDeliveryEntity(self, data)


    def LocalThreadOperation(self, data=None) -> "LocalThreadOperationEntity":
        """Entity factory: client.LocalThreadOperation().list() / client.LocalThreadOperation().load({"id": ...})."""
        from composal_sdk.entity.local_thread_operation_entity import LocalThreadOperationEntity
        return LocalThreadOperationEntity(self, data)


    def Location(self, data=None) -> "LocationEntity":
        """Entity factory: client.Location().list() / client.Location().load({"id": ...})."""
        from composal_sdk.entity.location_entity import LocationEntity
        return LocationEntity(self, data)


    def LogStreamChunk(self, data=None) -> "LogStreamChunkEntity":
        """Entity factory: client.LogStreamChunk().list() / client.LogStreamChunk().load({"id": ...})."""
        from composal_sdk.entity.log_stream_chunk_entity import LogStreamChunkEntity
        return LogStreamChunkEntity(self, data)


    def LogoImage(self, data=None) -> "LogoImageEntity":
        """Entity factory: client.LogoImage().list() / client.LogoImage().load({"id": ...})."""
        from composal_sdk.entity.logo_image_entity import LogoImageEntity
        return LogoImageEntity(self, data)


    def MarketingSetting(self, data=None) -> "MarketingSettingEntity":
        """Entity factory: client.MarketingSetting().list() / client.MarketingSetting().load({"id": ...})."""
        from composal_sdk.entity.marketing_setting_entity import MarketingSettingEntity
        return MarketingSettingEntity(self, data)


    def McpOauth(self, data=None) -> "McpOauthEntity":
        """Entity factory: client.McpOauth().list() / client.McpOauth().load({"id": ...})."""
        from composal_sdk.entity.mcp_oauth_entity import McpOauthEntity
        return McpOauthEntity(self, data)


    def Me(self, data=None) -> "MeEntity":
        """Entity factory: client.Me().list() / client.Me().load({"id": ...})."""
        from composal_sdk.entity.me_entity import MeEntity
        return MeEntity(self, data)


    def MeEmail(self, data=None) -> "MeEmailEntity":
        """Entity factory: client.MeEmail().list() / client.MeEmail().load({"id": ...})."""
        from composal_sdk.entity.me_email_entity import MeEmailEntity
        return MeEmailEntity(self, data)


    def MeOnboarding(self, data=None) -> "MeOnboardingEntity":
        """Entity factory: client.MeOnboarding().list() / client.MeOnboarding().load({"id": ...})."""
        from composal_sdk.entity.me_onboarding_entity import MeOnboardingEntity
        return MeOnboardingEntity(self, data)


    def MediaFile(self, data=None) -> "MediaFileEntity":
        """Entity factory: client.MediaFile().list() / client.MediaFile().load({"id": ...})."""
        from composal_sdk.entity.media_file_entity import MediaFileEntity
        return MediaFileEntity(self, data)


    def Member(self, data=None) -> "MemberEntity":
        """Entity factory: client.Member().list() / client.Member().load({"id": ...})."""
        from composal_sdk.entity.member_entity import MemberEntity
        return MemberEntity(self, data)


    def Memory(self, data=None) -> "MemoryEntity":
        """Entity factory: client.Memory().list() / client.Memory().load({"id": ...})."""
        from composal_sdk.entity.memory_entity import MemoryEntity
        return MemoryEntity(self, data)


    def MergeQueueEntry(self, data=None) -> "MergeQueueEntryEntity":
        """Entity factory: client.MergeQueueEntry().list() / client.MergeQueueEntry().load({"id": ...})."""
        from composal_sdk.entity.merge_queue_entry_entity import MergeQueueEntryEntity
        return MergeQueueEntryEntity(self, data)


    def MergeRequest(self, data=None) -> "MergeRequestEntity":
        """Entity factory: client.MergeRequest().list() / client.MergeRequest().load({"id": ...})."""
        from composal_sdk.entity.merge_request_entity import MergeRequestEntity
        return MergeRequestEntity(self, data)


    def MergeResolution(self, data=None) -> "MergeResolutionEntity":
        """Entity factory: client.MergeResolution().list() / client.MergeResolution().load({"id": ...})."""
        from composal_sdk.entity.merge_resolution_entity import MergeResolutionEntity
        return MergeResolutionEntity(self, data)


    def MessagingConversationMessage(self, data=None) -> "MessagingConversationMessageEntity":
        """Entity factory: client.MessagingConversationMessage().list() / client.MessagingConversationMessage().load({"id": ...})."""
        from composal_sdk.entity.messaging_conversation_message_entity import MessagingConversationMessageEntity
        return MessagingConversationMessageEntity(self, data)


    def MessagingConversationUpload(self, data=None) -> "MessagingConversationUploadEntity":
        """Entity factory: client.MessagingConversationUpload().list() / client.MessagingConversationUpload().load({"id": ...})."""
        from composal_sdk.entity.messaging_conversation_upload_entity import MessagingConversationUploadEntity
        return MessagingConversationUploadEntity(self, data)


    def MetricQuery(self, data=None) -> "MetricQueryEntity":
        """Entity factory: client.MetricQuery().list() / client.MetricQuery().load({"id": ...})."""
        from composal_sdk.entity.metric_query_entity import MetricQueryEntity
        return MetricQueryEntity(self, data)


    def MetronomeWebhook(self, data=None) -> "MetronomeWebhookEntity":
        """Entity factory: client.MetronomeWebhook().list() / client.MetronomeWebhook().load({"id": ...})."""
        from composal_sdk.entity.metronome_webhook_entity import MetronomeWebhookEntity
        return MetronomeWebhookEntity(self, data)


    def ModelSubscriptionAccount(self, data=None) -> "ModelSubscriptionAccountEntity":
        """Entity factory: client.ModelSubscriptionAccount().list() / client.ModelSubscriptionAccount().load({"id": ...})."""
        from composal_sdk.entity.model_subscription_account_entity import ModelSubscriptionAccountEntity
        return ModelSubscriptionAccountEntity(self, data)


    def ModelSubscriptionAccountConnection(self, data=None) -> "ModelSubscriptionAccountConnectionEntity":
        """Entity factory: client.ModelSubscriptionAccountConnection().list() / client.ModelSubscriptionAccountConnection().load({"id": ...})."""
        from composal_sdk.entity.model_subscription_account_connection_entity import ModelSubscriptionAccountConnectionEntity
        return ModelSubscriptionAccountConnectionEntity(self, data)


    def NetworkConnection(self, data=None) -> "NetworkConnectionEntity":
        """Entity factory: client.NetworkConnection().list() / client.NetworkConnection().load({"id": ...})."""
        from composal_sdk.entity.network_connection_entity import NetworkConnectionEntity
        return NetworkConnectionEntity(self, data)


    def NetworkingSpace(self, data=None) -> "NetworkingSpaceEntity":
        """Entity factory: client.NetworkingSpace().list() / client.NetworkingSpace().load({"id": ...})."""
        from composal_sdk.entity.networking_space_entity import NetworkingSpaceEntity
        return NetworkingSpaceEntity(self, data)


    def Node(self, data=None) -> "NodeEntity":
        """Entity factory: client.Node().list() / client.Node().load({"id": ...})."""
        from composal_sdk.entity.node_entity import NodeEntity
        return NodeEntity(self, data)


    def NodeCertificate(self, data=None) -> "NodeCertificateEntity":
        """Entity factory: client.NodeCertificate().list() / client.NodeCertificate().load({"id": ...})."""
        from composal_sdk.entity.node_certificate_entity import NodeCertificateEntity
        return NodeCertificateEntity(self, data)


    def NodeLease(self, data=None) -> "NodeLeaseEntity":
        """Entity factory: client.NodeLease().list() / client.NodeLease().load({"id": ...})."""
        from composal_sdk.entity.node_lease_entity import NodeLeaseEntity
        return NodeLeaseEntity(self, data)


    def NomadAllocation(self, data=None) -> "NomadAllocationEntity":
        """Entity factory: client.NomadAllocation().list() / client.NomadAllocation().load({"id": ...})."""
        from composal_sdk.entity.nomad_allocation_entity import NomadAllocationEntity
        return NomadAllocationEntity(self, data)


    def NomadLog(self, data=None) -> "NomadLogEntity":
        """Entity factory: client.NomadLog().list() / client.NomadLog().load({"id": ...})."""
        from composal_sdk.entity.nomad_log_entity import NomadLogEntity
        return NomadLogEntity(self, data)


    def Now(self, data=None) -> "NowEntity":
        """Entity factory: client.Now().list() / client.Now().load({"id": ...})."""
        from composal_sdk.entity.now_entity import NowEntity
        return NowEntity(self, data)


    def ObservabilityClickhouseCluster(self, data=None) -> "ObservabilityClickhouseClusterEntity":
        """Entity factory: client.ObservabilityClickhouseCluster().list() / client.ObservabilityClickhouseCluster().load({"id": ...})."""
        from composal_sdk.entity.observability_clickhouse_cluster_entity import ObservabilityClickhouseClusterEntity
        return ObservabilityClickhouseClusterEntity(self, data)


    def ObservabilityQuickwitCluster(self, data=None) -> "ObservabilityQuickwitClusterEntity":
        """Entity factory: client.ObservabilityQuickwitCluster().list() / client.ObservabilityQuickwitCluster().load({"id": ...})."""
        from composal_sdk.entity.observability_quickwit_cluster_entity import ObservabilityQuickwitClusterEntity
        return ObservabilityQuickwitClusterEntity(self, data)


    def ObservabilitySpace(self, data=None) -> "ObservabilitySpaceEntity":
        """Entity factory: client.ObservabilitySpace().list() / client.ObservabilitySpace().load({"id": ...})."""
        from composal_sdk.entity.observability_space_entity import ObservabilitySpaceEntity
        return ObservabilitySpaceEntity(self, data)


    def Openapi(self, data=None) -> "OpenapiEntity":
        """Entity factory: client.Openapi().list() / client.Openapi().load({"id": ...})."""
        from composal_sdk.entity.openapi_entity import OpenapiEntity
        return OpenapiEntity(self, data)


    def OrgInvitation(self, data=None) -> "OrgInvitationEntity":
        """Entity factory: client.OrgInvitation().list() / client.OrgInvitation().load({"id": ...})."""
        from composal_sdk.entity.org_invitation_entity import OrgInvitationEntity
        return OrgInvitationEntity(self, data)


    def Organization(self, data=None) -> "OrganizationEntity":
        """Entity factory: client.Organization().list() / client.Organization().load({"id": ...})."""
        from composal_sdk.entity.organization_entity import OrganizationEntity
        return OrganizationEntity(self, data)


    def OrganizationApp(self, data=None) -> "OrganizationAppEntity":
        """Entity factory: client.OrganizationApp().list() / client.OrganizationApp().load({"id": ...})."""
        from composal_sdk.entity.organization_app_entity import OrganizationAppEntity
        return OrganizationAppEntity(self, data)


    def OrganizationControl(self, data=None) -> "OrganizationControlEntity":
        """Entity factory: client.OrganizationControl().list() / client.OrganizationControl().load({"id": ...})."""
        from composal_sdk.entity.organization_control_entity import OrganizationControlEntity
        return OrganizationControlEntity(self, data)


    def OrganizationDevice(self, data=None) -> "OrganizationDeviceEntity":
        """Entity factory: client.OrganizationDevice().list() / client.OrganizationDevice().load({"id": ...})."""
        from composal_sdk.entity.organization_device_entity import OrganizationDeviceEntity
        return OrganizationDeviceEntity(self, data)


    def OrganizationIdentityCertificate(self, data=None) -> "OrganizationIdentityCertificateEntity":
        """Entity factory: client.OrganizationIdentityCertificate().list() / client.OrganizationIdentityCertificate().load({"id": ...})."""
        from composal_sdk.entity.organization_identity_certificate_entity import OrganizationIdentityCertificateEntity
        return OrganizationIdentityCertificateEntity(self, data)


    def OrganizationInteraction(self, data=None) -> "OrganizationInteractionEntity":
        """Entity factory: client.OrganizationInteraction().list() / client.OrganizationInteraction().load({"id": ...})."""
        from composal_sdk.entity.organization_interaction_entity import OrganizationInteractionEntity
        return OrganizationInteractionEntity(self, data)


    def OrganizationInvitation(self, data=None) -> "OrganizationInvitationEntity":
        """Entity factory: client.OrganizationInvitation().list() / client.OrganizationInvitation().load({"id": ...})."""
        from composal_sdk.entity.organization_invitation_entity import OrganizationInvitationEntity
        return OrganizationInvitationEntity(self, data)


    def OrganizationMessageFile(self, data=None) -> "OrganizationMessageFileEntity":
        """Entity factory: client.OrganizationMessageFile().list() / client.OrganizationMessageFile().load({"id": ...})."""
        from composal_sdk.entity.organization_message_file_entity import OrganizationMessageFileEntity
        return OrganizationMessageFileEntity(self, data)


    def OrganizationOidcTrust(self, data=None) -> "OrganizationOidcTrustEntity":
        """Entity factory: client.OrganizationOidcTrust().list() / client.OrganizationOidcTrust().load({"id": ...})."""
        from composal_sdk.entity.organization_oidc_trust_entity import OrganizationOidcTrustEntity
        return OrganizationOidcTrustEntity(self, data)


    def OrganizationRunEvent(self, data=None) -> "OrganizationRunEventEntity":
        """Entity factory: client.OrganizationRunEvent().list() / client.OrganizationRunEvent().load({"id": ...})."""
        from composal_sdk.entity.organization_run_event_entity import OrganizationRunEventEntity
        return OrganizationRunEventEntity(self, data)


    def OrganizationRunOutcome(self, data=None) -> "OrganizationRunOutcomeEntity":
        """Entity factory: client.OrganizationRunOutcome().list() / client.OrganizationRunOutcome().load({"id": ...})."""
        from composal_sdk.entity.organization_run_outcome_entity import OrganizationRunOutcomeEntity
        return OrganizationRunOutcomeEntity(self, data)


    def OrganizationRunUsage(self, data=None) -> "OrganizationRunUsageEntity":
        """Entity factory: client.OrganizationRunUsage().list() / client.OrganizationRunUsage().load({"id": ...})."""
        from composal_sdk.entity.organization_run_usage_entity import OrganizationRunUsageEntity
        return OrganizationRunUsageEntity(self, data)


    def OrganizationSandbox(self, data=None) -> "OrganizationSandboxEntity":
        """Entity factory: client.OrganizationSandbox().list() / client.OrganizationSandbox().load({"id": ...})."""
        from composal_sdk.entity.organization_sandbox_entity import OrganizationSandboxEntity
        return OrganizationSandboxEntity(self, data)


    def OrganizationSecret(self, data=None) -> "OrganizationSecretEntity":
        """Entity factory: client.OrganizationSecret().list() / client.OrganizationSecret().load({"id": ...})."""
        from composal_sdk.entity.organization_secret_entity import OrganizationSecretEntity
        return OrganizationSecretEntity(self, data)


    def OrganizationServiceAccount(self, data=None) -> "OrganizationServiceAccountEntity":
        """Entity factory: client.OrganizationServiceAccount().list() / client.OrganizationServiceAccount().load({"id": ...})."""
        from composal_sdk.entity.organization_service_account_entity import OrganizationServiceAccountEntity
        return OrganizationServiceAccountEntity(self, data)


    def OrganizationSetting(self, data=None) -> "OrganizationSettingEntity":
        """Entity factory: client.OrganizationSetting().list() / client.OrganizationSetting().load({"id": ...})."""
        from composal_sdk.entity.organization_setting_entity import OrganizationSettingEntity
        return OrganizationSettingEntity(self, data)


    def OrganizationSite(self, data=None) -> "OrganizationSiteEntity":
        """Entity factory: client.OrganizationSite().list() / client.OrganizationSite().load({"id": ...})."""
        from composal_sdk.entity.organization_site_entity import OrganizationSiteEntity
        return OrganizationSiteEntity(self, data)


    def OrganizationSubscription(self, data=None) -> "OrganizationSubscriptionEntity":
        """Entity factory: client.OrganizationSubscription().list() / client.OrganizationSubscription().load({"id": ...})."""
        from composal_sdk.entity.organization_subscription_entity import OrganizationSubscriptionEntity
        return OrganizationSubscriptionEntity(self, data)


    def OrganizationTool(self, data=None) -> "OrganizationToolEntity":
        """Entity factory: client.OrganizationTool().list() / client.OrganizationTool().load({"id": ...})."""
        from composal_sdk.entity.organization_tool_entity import OrganizationToolEntity
        return OrganizationToolEntity(self, data)


    def OrganizationWorkloadIdentity(self, data=None) -> "OrganizationWorkloadIdentityEntity":
        """Entity factory: client.OrganizationWorkloadIdentity().list() / client.OrganizationWorkloadIdentity().load({"id": ...})."""
        from composal_sdk.entity.organization_workload_identity_entity import OrganizationWorkloadIdentityEntity
        return OrganizationWorkloadIdentityEntity(self, data)


    def OtelIngest(self, data=None) -> "OtelIngestEntity":
        """Entity factory: client.OtelIngest().list() / client.OtelIngest().load({"id": ...})."""
        from composal_sdk.entity.otel_ingest_entity import OtelIngestEntity
        return OtelIngestEntity(self, data)


    def Page(self, data=None) -> "PageEntity":
        """Entity factory: client.Page().list() / client.Page().load({"id": ...})."""
        from composal_sdk.entity.page_entity import PageEntity
        return PageEntity(self, data)


    def PageAgent(self, data=None) -> "PageAgentEntity":
        """Entity factory: client.PageAgent().list() / client.PageAgent().load({"id": ...})."""
        from composal_sdk.entity.page_agent_entity import PageAgentEntity
        return PageAgentEntity(self, data)


    def PageArtefact(self, data=None) -> "PageArtefactEntity":
        """Entity factory: client.PageArtefact().list() / client.PageArtefact().load({"id": ...})."""
        from composal_sdk.entity.page_artefact_entity import PageArtefactEntity
        return PageArtefactEntity(self, data)


    def PageCiPipelineRun(self, data=None) -> "PageCiPipelineRunEntity":
        """Entity factory: client.PageCiPipelineRun().list() / client.PageCiPipelineRun().load({"id": ...})."""
        from composal_sdk.entity.page_ci_pipeline_run_entity import PageCiPipelineRunEntity
        return PageCiPipelineRunEntity(self, data)


    def PageProjectRun(self, data=None) -> "PageProjectRunEntity":
        """Entity factory: client.PageProjectRun().list() / client.PageProjectRun().load({"id": ...})."""
        from composal_sdk.entity.page_project_run_entity import PageProjectRunEntity
        return PageProjectRunEntity(self, data)


    def PageRepoVcCommit(self, data=None) -> "PageRepoVcCommitEntity":
        """Entity factory: client.PageRepoVcCommit().list() / client.PageRepoVcCommit().load({"id": ...})."""
        from composal_sdk.entity.page_repo_vc_commit_entity import PageRepoVcCommitEntity
        return PageRepoVcCommitEntity(self, data)


    def PagesBilling(self, data=None) -> "PagesBillingEntity":
        """Entity factory: client.PagesBilling().list() / client.PagesBilling().load({"id": ...})."""
        from composal_sdk.entity.pages_billing_entity import PagesBillingEntity
        return PagesBillingEntity(self, data)


    def PagesGithubOnboarding(self, data=None) -> "PagesGithubOnboardingEntity":
        """Entity factory: client.PagesGithubOnboarding().list() / client.PagesGithubOnboarding().load({"id": ...})."""
        from composal_sdk.entity.pages_github_onboarding_entity import PagesGithubOnboardingEntity
        return PagesGithubOnboardingEntity(self, data)


    def PagesMember(self, data=None) -> "PagesMemberEntity":
        """Entity factory: client.PagesMember().list() / client.PagesMember().load({"id": ...})."""
        from composal_sdk.entity.pages_member_entity import PagesMemberEntity
        return PagesMemberEntity(self, data)


    def PagesProjectCredential(self, data=None) -> "PagesProjectCredentialEntity":
        """Entity factory: client.PagesProjectCredential().list() / client.PagesProjectCredential().load({"id": ...})."""
        from composal_sdk.entity.pages_project_credential_entity import PagesProjectCredentialEntity
        return PagesProjectCredentialEntity(self, data)


    def PagesProjectPersona(self, data=None) -> "PagesProjectPersonaEntity":
        """Entity factory: client.PagesProjectPersona().list() / client.PagesProjectPersona().load({"id": ...})."""
        from composal_sdk.entity.pages_project_persona_entity import PagesProjectPersonaEntity
        return PagesProjectPersonaEntity(self, data)


    def PagesProjectRun(self, data=None) -> "PagesProjectRunEntity":
        """Entity factory: client.PagesProjectRun().list() / client.PagesProjectRun().load({"id": ...})."""
        from composal_sdk.entity.pages_project_run_entity import PagesProjectRunEntity
        return PagesProjectRunEntity(self, data)


    def PagesProjectScenario(self, data=None) -> "PagesProjectScenarioEntity":
        """Entity factory: client.PagesProjectScenario().list() / client.PagesProjectScenario().load({"id": ...})."""
        from composal_sdk.entity.pages_project_scenario_entity import PagesProjectScenarioEntity
        return PagesProjectScenarioEntity(self, data)


    def PagesRegistry(self, data=None) -> "PagesRegistryEntity":
        """Entity factory: client.PagesRegistry().list() / client.PagesRegistry().load({"id": ...})."""
        from composal_sdk.entity.pages_registry_entity import PagesRegistryEntity
        return PagesRegistryEntity(self, data)


    def PagesSession(self, data=None) -> "PagesSessionEntity":
        """Entity factory: client.PagesSession().list() / client.PagesSession().load({"id": ...})."""
        from composal_sdk.entity.pages_session_entity import PagesSessionEntity
        return PagesSessionEntity(self, data)


    def Pairing(self, data=None) -> "PairingEntity":
        """Entity factory: client.Pairing().list() / client.Pairing().load({"id": ...})."""
        from composal_sdk.entity.pairing_entity import PairingEntity
        return PairingEntity(self, data)


    def PairingEvent(self, data=None) -> "PairingEventEntity":
        """Entity factory: client.PairingEvent().list() / client.PairingEvent().load({"id": ...})."""
        from composal_sdk.entity.pairing_event_entity import PairingEventEntity
        return PairingEventEntity(self, data)


    def ParallelV1(self, data=None) -> "ParallelV1Entity":
        """Entity factory: client.ParallelV1().list() / client.ParallelV1().load({"id": ...})."""
        from composal_sdk.entity.parallel_v1_entity import ParallelV1Entity
        return ParallelV1Entity(self, data)


    def PatchsetDiff(self, data=None) -> "PatchsetDiffEntity":
        """Entity factory: client.PatchsetDiff().list() / client.PatchsetDiff().load({"id": ...})."""
        from composal_sdk.entity.patchset_diff_entity import PatchsetDiffEntity
        return PatchsetDiffEntity(self, data)


    def PersonalAccessToken(self, data=None) -> "PersonalAccessTokenEntity":
        """Entity factory: client.PersonalAccessToken().list() / client.PersonalAccessToken().load({"id": ...})."""
        from composal_sdk.entity.personal_access_token_entity import PersonalAccessTokenEntity
        return PersonalAccessTokenEntity(self, data)


    def PreviewOperation(self, data=None) -> "PreviewOperationEntity":
        """Entity factory: client.PreviewOperation().list() / client.PreviewOperation().load({"id": ...})."""
        from composal_sdk.entity.preview_operation_entity import PreviewOperationEntity
        return PreviewOperationEntity(self, data)


    def PreviewProfileSecretBinding(self, data=None) -> "PreviewProfileSecretBindingEntity":
        """Entity factory: client.PreviewProfileSecretBinding().list() / client.PreviewProfileSecretBinding().load({"id": ...})."""
        from composal_sdk.entity.preview_profile_secret_binding_entity import PreviewProfileSecretBindingEntity
        return PreviewProfileSecretBindingEntity(self, data)


    def PreviewSecret(self, data=None) -> "PreviewSecretEntity":
        """Entity factory: client.PreviewSecret().list() / client.PreviewSecret().load({"id": ...})."""
        from composal_sdk.entity.preview_secret_entity import PreviewSecretEntity
        return PreviewSecretEntity(self, data)


    def PreviewSharingApproval(self, data=None) -> "PreviewSharingApprovalEntity":
        """Entity factory: client.PreviewSharingApproval().list() / client.PreviewSharingApproval().load({"id": ...})."""
        from composal_sdk.entity.preview_sharing_approval_entity import PreviewSharingApprovalEntity
        return PreviewSharingApprovalEntity(self, data)


    def ProactiveAgentWaitlistEntry(self, data=None) -> "ProactiveAgentWaitlistEntryEntity":
        """Entity factory: client.ProactiveAgentWaitlistEntry().list() / client.ProactiveAgentWaitlistEntry().load({"id": ...})."""
        from composal_sdk.entity.proactive_agent_waitlist_entry_entity import ProactiveAgentWaitlistEntryEntity
        return ProactiveAgentWaitlistEntryEntity(self, data)


    def Product(self, data=None) -> "ProductEntity":
        """Entity factory: client.Product().list() / client.Product().load({"id": ...})."""
        from composal_sdk.entity.product_entity import ProductEntity
        return ProductEntity(self, data)


    def ProductMapIdentityDecision(self, data=None) -> "ProductMapIdentityDecisionEntity":
        """Entity factory: client.ProductMapIdentityDecision().list() / client.ProductMapIdentityDecision().load({"id": ...})."""
        from composal_sdk.entity.product_map_identity_decision_entity import ProductMapIdentityDecisionEntity
        return ProductMapIdentityDecisionEntity(self, data)


    def ProductMapJourney(self, data=None) -> "ProductMapJourneyEntity":
        """Entity factory: client.ProductMapJourney().list() / client.ProductMapJourney().load({"id": ...})."""
        from composal_sdk.entity.product_map_journey_entity import ProductMapJourneyEntity
        return ProductMapJourneyEntity(self, data)


    def ProductMapJourneyReplay(self, data=None) -> "ProductMapJourneyReplayEntity":
        """Entity factory: client.ProductMapJourneyReplay().list() / client.ProductMapJourneyReplay().load({"id": ...})."""
        from composal_sdk.entity.product_map_journey_replay_entity import ProductMapJourneyReplayEntity
        return ProductMapJourneyReplayEntity(self, data)


    def ProductMapObservation(self, data=None) -> "ProductMapObservationEntity":
        """Entity factory: client.ProductMapObservation().list() / client.ProductMapObservation().load({"id": ...})."""
        from composal_sdk.entity.product_map_observation_entity import ProductMapObservationEntity
        return ProductMapObservationEntity(self, data)


    def ProductMapQuestion(self, data=None) -> "ProductMapQuestionEntity":
        """Entity factory: client.ProductMapQuestion().list() / client.ProductMapQuestion().load({"id": ...})."""
        from composal_sdk.entity.product_map_question_entity import ProductMapQuestionEntity
        return ProductMapQuestionEntity(self, data)


    def ProductMapState(self, data=None) -> "ProductMapStateEntity":
        """Entity factory: client.ProductMapState().list() / client.ProductMapState().load({"id": ...})."""
        from composal_sdk.entity.product_map_state_entity import ProductMapStateEntity
        return ProductMapStateEntity(self, data)


    def Project(self, data=None) -> "ProjectEntity":
        """Entity factory: client.Project().list() / client.Project().load({"id": ...})."""
        from composal_sdk.entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    def ProjectAndroidApk(self, data=None) -> "ProjectAndroidApkEntity":
        """Entity factory: client.ProjectAndroidApk().list() / client.ProjectAndroidApk().load({"id": ...})."""
        from composal_sdk.entity.project_android_apk_entity import ProjectAndroidApkEntity
        return ProjectAndroidApkEntity(self, data)


    def ProjectCodeMap(self, data=None) -> "ProjectCodeMapEntity":
        """Entity factory: client.ProjectCodeMap().list() / client.ProjectCodeMap().load({"id": ...})."""
        from composal_sdk.entity.project_code_map_entity import ProjectCodeMapEntity
        return ProjectCodeMapEntity(self, data)


    def ProjectEnvironment(self, data=None) -> "ProjectEnvironmentEntity":
        """Entity factory: client.ProjectEnvironment().list() / client.ProjectEnvironment().load({"id": ...})."""
        from composal_sdk.entity.project_environment_entity import ProjectEnvironmentEntity
        return ProjectEnvironmentEntity(self, data)


    def ProjectFinding(self, data=None) -> "ProjectFindingEntity":
        """Entity factory: client.ProjectFinding().list() / client.ProjectFinding().load({"id": ...})."""
        from composal_sdk.entity.project_finding_entity import ProjectFindingEntity
        return ProjectFindingEntity(self, data)


    def ProjectFixture(self, data=None) -> "ProjectFixtureEntity":
        """Entity factory: client.ProjectFixture().list() / client.ProjectFixture().load({"id": ...})."""
        from composal_sdk.entity.project_fixture_entity import ProjectFixtureEntity
        return ProjectFixtureEntity(self, data)


    def ProjectIosApp(self, data=None) -> "ProjectIosAppEntity":
        """Entity factory: client.ProjectIosApp().list() / client.ProjectIosApp().load({"id": ...})."""
        from composal_sdk.entity.project_ios_app_entity import ProjectIosAppEntity
        return ProjectIosAppEntity(self, data)


    def ProjectMessagingConversation(self, data=None) -> "ProjectMessagingConversationEntity":
        """Entity factory: client.ProjectMessagingConversation().list() / client.ProjectMessagingConversation().load({"id": ...})."""
        from composal_sdk.entity.project_messaging_conversation_entity import ProjectMessagingConversationEntity
        return ProjectMessagingConversationEntity(self, data)


    def ProjectOverviewMetric(self, data=None) -> "ProjectOverviewMetricEntity":
        """Entity factory: client.ProjectOverviewMetric().list() / client.ProjectOverviewMetric().load({"id": ...})."""
        from composal_sdk.entity.project_overview_metric_entity import ProjectOverviewMetricEntity
        return ProjectOverviewMetricEntity(self, data)


    def ProjectOverviewPullRequest(self, data=None) -> "ProjectOverviewPullRequestEntity":
        """Entity factory: client.ProjectOverviewPullRequest().list() / client.ProjectOverviewPullRequest().load({"id": ...})."""
        from composal_sdk.entity.project_overview_pull_request_entity import ProjectOverviewPullRequestEntity
        return ProjectOverviewPullRequestEntity(self, data)


    def ProjectProductMap(self, data=None) -> "ProjectProductMapEntity":
        """Entity factory: client.ProjectProductMap().list() / client.ProjectProductMap().load({"id": ...})."""
        from composal_sdk.entity.project_product_map_entity import ProjectProductMapEntity
        return ProjectProductMapEntity(self, data)


    def ProjectRecording(self, data=None) -> "ProjectRecordingEntity":
        """Entity factory: client.ProjectRecording().list() / client.ProjectRecording().load({"id": ...})."""
        from composal_sdk.entity.project_recording_entity import ProjectRecordingEntity
        return ProjectRecordingEntity(self, data)


    def ProjectRunPlan(self, data=None) -> "ProjectRunPlanEntity":
        """Entity factory: client.ProjectRunPlan().list() / client.ProjectRunPlan().load({"id": ...})."""
        from composal_sdk.entity.project_run_plan_entity import ProjectRunPlanEntity
        return ProjectRunPlanEntity(self, data)


    def ProjectRunSchedule(self, data=None) -> "ProjectRunScheduleEntity":
        """Entity factory: client.ProjectRunSchedule().list() / client.ProjectRunSchedule().load({"id": ...})."""
        from composal_sdk.entity.project_run_schedule_entity import ProjectRunScheduleEntity
        return ProjectRunScheduleEntity(self, data)


    def ProjectScenarioOption(self, data=None) -> "ProjectScenarioOptionEntity":
        """Entity factory: client.ProjectScenarioOption().list() / client.ProjectScenarioOption().load({"id": ...})."""
        from composal_sdk.entity.project_scenario_option_entity import ProjectScenarioOptionEntity
        return ProjectScenarioOptionEntity(self, data)


    def ProjectScenarioRow(self, data=None) -> "ProjectScenarioRowEntity":
        """Entity factory: client.ProjectScenarioRow().list() / client.ProjectScenarioRow().load({"id": ...})."""
        from composal_sdk.entity.project_scenario_row_entity import ProjectScenarioRowEntity
        return ProjectScenarioRowEntity(self, data)


    def ProjectSetting(self, data=None) -> "ProjectSettingEntity":
        """Entity factory: client.ProjectSetting().list() / client.ProjectSetting().load({"id": ...})."""
        from composal_sdk.entity.project_setting_entity import ProjectSettingEntity
        return ProjectSettingEntity(self, data)


    def PullRequest(self, data=None) -> "PullRequestEntity":
        """Entity factory: client.PullRequest().list() / client.PullRequest().load({"id": ...})."""
        from composal_sdk.entity.pull_request_entity import PullRequestEntity
        return PullRequestEntity(self, data)


    def PullRequestAction(self, data=None) -> "PullRequestActionEntity":
        """Entity factory: client.PullRequestAction().list() / client.PullRequestAction().load({"id": ...})."""
        from composal_sdk.entity.pull_request_action_entity import PullRequestActionEntity
        return PullRequestActionEntity(self, data)


    def PullRequestMagicMerge(self, data=None) -> "PullRequestMagicMergeEntity":
        """Entity factory: client.PullRequestMagicMerge().list() / client.PullRequestMagicMerge().load({"id": ...})."""
        from composal_sdk.entity.pull_request_magic_merge_entity import PullRequestMagicMergeEntity
        return PullRequestMagicMergeEntity(self, data)


    def PullRequestSetting(self, data=None) -> "PullRequestSettingEntity":
        """Entity factory: client.PullRequestSetting().list() / client.PullRequestSetting().load({"id": ...})."""
        from composal_sdk.entity.pull_request_setting_entity import PullRequestSettingEntity
        return PullRequestSettingEntity(self, data)


    def PullRequestSettingAddRepository(self, data=None) -> "PullRequestSettingAddRepositoryEntity":
        """Entity factory: client.PullRequestSettingAddRepository().list() / client.PullRequestSettingAddRepository().load({"id": ...})."""
        from composal_sdk.entity.pull_request_setting_add_repository_entity import PullRequestSettingAddRepositoryEntity
        return PullRequestSettingAddRepositoryEntity(self, data)


    def PullRequestSettingDetectComment(self, data=None) -> "PullRequestSettingDetectCommentEntity":
        """Entity factory: client.PullRequestSettingDetectComment().list() / client.PullRequestSettingDetectComment().load({"id": ...})."""
        from composal_sdk.entity.pull_request_setting_detect_comment_entity import PullRequestSettingDetectCommentEntity
        return PullRequestSettingDetectCommentEntity(self, data)


    def PullRequestTranscript(self, data=None) -> "PullRequestTranscriptEntity":
        """Entity factory: client.PullRequestTranscript().list() / client.PullRequestTranscript().load({"id": ...})."""
        from composal_sdk.entity.pull_request_transcript_entity import PullRequestTranscriptEntity
        return PullRequestTranscriptEntity(self, data)


    def PullZone(self, data=None) -> "PullZoneEntity":
        """Entity factory: client.PullZone().list() / client.PullZone().load({"id": ...})."""
        from composal_sdk.entity.pull_zone_entity import PullZoneEntity
        return PullZoneEntity(self, data)


    def Recorder(self, data=None) -> "RecorderEntity":
        """Entity factory: client.Recorder().list() / client.Recorder().load({"id": ...})."""
        from composal_sdk.entity.recorder_entity import RecorderEntity
        return RecorderEntity(self, data)


    def Registry(self, data=None) -> "RegistryEntity":
        """Entity factory: client.Registry().list() / client.Registry().load({"id": ...})."""
        from composal_sdk.entity.registry_entity import RegistryEntity
        return RegistryEntity(self, data)


    def RegistryV2(self, data=None) -> "RegistryV2Entity":
        """Entity factory: client.RegistryV2().list() / client.RegistryV2().load({"id": ...})."""
        from composal_sdk.entity.registry_v2_entity import RegistryV2Entity
        return RegistryV2Entity(self, data)


    def RelayAgentConnection(self, data=None) -> "RelayAgentConnectionEntity":
        """Entity factory: client.RelayAgentConnection().list() / client.RelayAgentConnection().load({"id": ...})."""
        from composal_sdk.entity.relay_agent_connection_entity import RelayAgentConnectionEntity
        return RelayAgentConnectionEntity(self, data)


    def RelayAgentLocalThread(self, data=None) -> "RelayAgentLocalThreadEntity":
        """Entity factory: client.RelayAgentLocalThread().list() / client.RelayAgentLocalThread().load({"id": ...})."""
        from composal_sdk.entity.relay_agent_local_thread_entity import RelayAgentLocalThreadEntity
        return RelayAgentLocalThreadEntity(self, data)


    def RelaySignal(self, data=None) -> "RelaySignalEntity":
        """Entity factory: client.RelaySignal().list() / client.RelaySignal().load({"id": ...})."""
        from composal_sdk.entity.relay_signal_entity import RelaySignalEntity
        return RelaySignalEntity(self, data)


    def ReleaseRollout(self, data=None) -> "ReleaseRolloutEntity":
        """Entity factory: client.ReleaseRollout().list() / client.ReleaseRollout().load({"id": ...})."""
        from composal_sdk.entity.release_rollout_entity import ReleaseRolloutEntity
        return ReleaseRolloutEntity(self, data)


    def Repo(self, data=None) -> "RepoEntity":
        """Entity factory: client.Repo().list() / client.Repo().load({"id": ...})."""
        from composal_sdk.entity.repo_entity import RepoEntity
        return RepoEntity(self, data)


    def RepoAccessToken(self, data=None) -> "RepoAccessTokenEntity":
        """Entity factory: client.RepoAccessToken().list() / client.RepoAccessToken().load({"id": ...})."""
        from composal_sdk.entity.repo_access_token_entity import RepoAccessTokenEntity
        return RepoAccessTokenEntity(self, data)


    def RepoAction(self, data=None) -> "RepoActionEntity":
        """Entity factory: client.RepoAction().list() / client.RepoAction().load({"id": ...})."""
        from composal_sdk.entity.repo_action_entity import RepoActionEntity
        return RepoActionEntity(self, data)


    def RepoAgentCheckpoint(self, data=None) -> "RepoAgentCheckpointEntity":
        """Entity factory: client.RepoAgentCheckpoint().list() / client.RepoAgentCheckpoint().load({"id": ...})."""
        from composal_sdk.entity.repo_agent_checkpoint_entity import RepoAgentCheckpointEntity
        return RepoAgentCheckpointEntity(self, data)


    def RepoAgentSession(self, data=None) -> "RepoAgentSessionEntity":
        """Entity factory: client.RepoAgentSession().list() / client.RepoAgentSession().load({"id": ...})."""
        from composal_sdk.entity.repo_agent_session_entity import RepoAgentSessionEntity
        return RepoAgentSessionEntity(self, data)


    def RepoBookmarkProtection(self, data=None) -> "RepoBookmarkProtectionEntity":
        """Entity factory: client.RepoBookmarkProtection().list() / client.RepoBookmarkProtection().load({"id": ...})."""
        from composal_sdk.entity.repo_bookmark_protection_entity import RepoBookmarkProtectionEntity
        return RepoBookmarkProtectionEntity(self, data)


    def RepoBookmarkProtectionEvent(self, data=None) -> "RepoBookmarkProtectionEventEntity":
        """Entity factory: client.RepoBookmarkProtectionEvent().list() / client.RepoBookmarkProtectionEvent().load({"id": ...})."""
        from composal_sdk.entity.repo_bookmark_protection_event_entity import RepoBookmarkProtectionEventEntity
        return RepoBookmarkProtectionEventEntity(self, data)


    def RepoCloudWorkspaceBackup(self, data=None) -> "RepoCloudWorkspaceBackupEntity":
        """Entity factory: client.RepoCloudWorkspaceBackup().list() / client.RepoCloudWorkspaceBackup().load({"id": ...})."""
        from composal_sdk.entity.repo_cloud_workspace_backup_entity import RepoCloudWorkspaceBackupEntity
        return RepoCloudWorkspaceBackupEntity(self, data)


    def RepoCodeRule(self, data=None) -> "RepoCodeRuleEntity":
        """Entity factory: client.RepoCodeRule().list() / client.RepoCodeRule().load({"id": ...})."""
        from composal_sdk.entity.repo_code_rule_entity import RepoCodeRuleEntity
        return RepoCodeRuleEntity(self, data)


    def RepoSetting(self, data=None) -> "RepoSettingEntity":
        """Entity factory: client.RepoSetting().list() / client.RepoSetting().load({"id": ...})."""
        from composal_sdk.entity.repo_setting_entity import RepoSettingEntity
        return RepoSettingEntity(self, data)


    def RepoStat(self, data=None) -> "RepoStatEntity":
        """Entity factory: client.RepoStat().list() / client.RepoStat().load({"id": ...})."""
        from composal_sdk.entity.repo_stat_entity import RepoStatEntity
        return RepoStatEntity(self, data)


    def RepoVc(self, data=None) -> "RepoVcEntity":
        """Entity factory: client.RepoVc().list() / client.RepoVc().load({"id": ...})."""
        from composal_sdk.entity.repo_vc_entity import RepoVcEntity
        return RepoVcEntity(self, data)


    def RepoVcCommit(self, data=None) -> "RepoVcCommitEntity":
        """Entity factory: client.RepoVcCommit().list() / client.RepoVcCommit().load({"id": ...})."""
        from composal_sdk.entity.repo_vc_commit_entity import RepoVcCommitEntity
        return RepoVcCommitEntity(self, data)


    def ReportReplay(self, data=None) -> "ReportReplayEntity":
        """Entity factory: client.ReportReplay().list() / client.ReportReplay().load({"id": ...})."""
        from composal_sdk.entity.report_replay_entity import ReportReplayEntity
        return ReportReplayEntity(self, data)


    def ReportScenario(self, data=None) -> "ReportScenarioEntity":
        """Entity factory: client.ReportScenario().list() / client.ReportScenario().load({"id": ...})."""
        from composal_sdk.entity.report_scenario_entity import ReportScenarioEntity
        return ReportScenarioEntity(self, data)


    def RepositoryAccess(self, data=None) -> "RepositoryAccessEntity":
        """Entity factory: client.RepositoryAccess().list() / client.RepositoryAccess().load({"id": ...})."""
        from composal_sdk.entity.repository_access_entity import RepositoryAccessEntity
        return RepositoryAccessEntity(self, data)


    def RepositoryAccessResolve(self, data=None) -> "RepositoryAccessResolveEntity":
        """Entity factory: client.RepositoryAccessResolve().list() / client.RepositoryAccessResolve().load({"id": ...})."""
        from composal_sdk.entity.repository_access_resolve_entity import RepositoryAccessResolveEntity
        return RepositoryAccessResolveEntity(self, data)


    def RepositoryEvent(self, data=None) -> "RepositoryEventEntity":
        """Entity factory: client.RepositoryEvent().list() / client.RepositoryEvent().load({"id": ...})."""
        from composal_sdk.entity.repository_event_entity import RepositoryEventEntity
        return RepositoryEventEntity(self, data)


    def RepositoryImport(self, data=None) -> "RepositoryImportEntity":
        """Entity factory: client.RepositoryImport().list() / client.RepositoryImport().load({"id": ...})."""
        from composal_sdk.entity.repository_import_entity import RepositoryImportEntity
        return RepositoryImportEntity(self, data)


    def RepositoryImportSession(self, data=None) -> "RepositoryImportSessionEntity":
        """Entity factory: client.RepositoryImportSession().list() / client.RepositoryImportSession().load({"id": ...})."""
        from composal_sdk.entity.repository_import_session_entity import RepositoryImportSessionEntity
        return RepositoryImportSessionEntity(self, data)


    def RepositoryImportSessionRepository(self, data=None) -> "RepositoryImportSessionRepositoryEntity":
        """Entity factory: client.RepositoryImportSessionRepository().list() / client.RepositoryImportSessionRepository().load({"id": ...})."""
        from composal_sdk.entity.repository_import_session_repository_entity import RepositoryImportSessionRepositoryEntity
        return RepositoryImportSessionRepositoryEntity(self, data)


    def RepositoryImportSessionSelection(self, data=None) -> "RepositoryImportSessionSelectionEntity":
        """Entity factory: client.RepositoryImportSessionSelection().list() / client.RepositoryImportSessionSelection().load({"id": ...})."""
        from composal_sdk.entity.repository_import_session_selection_entity import RepositoryImportSessionSelectionEntity
        return RepositoryImportSessionSelectionEntity(self, data)


    def RepositorySandboxEnvironment(self, data=None) -> "RepositorySandboxEnvironmentEntity":
        """Entity factory: client.RepositorySandboxEnvironment().list() / client.RepositorySandboxEnvironment().load({"id": ...})."""
        from composal_sdk.entity.repository_sandbox_environment_entity import RepositorySandboxEnvironmentEntity
        return RepositorySandboxEnvironmentEntity(self, data)


    def RoderCodeRepair(self, data=None) -> "RoderCodeRepairEntity":
        """Entity factory: client.RoderCodeRepair().list() / client.RoderCodeRepair().load({"id": ...})."""
        from composal_sdk.entity.roder_code_repair_entity import RoderCodeRepairEntity
        return RoderCodeRepairEntity(self, data)


    def RoderCodeRepairSetting(self, data=None) -> "RoderCodeRepairSettingEntity":
        """Entity factory: client.RoderCodeRepairSetting().list() / client.RoderCodeRepairSetting().load({"id": ...})."""
        from composal_sdk.entity.roder_code_repair_setting_entity import RoderCodeRepairSettingEntity
        return RoderCodeRepairSettingEntity(self, data)


    def RoderMachine(self, data=None) -> "RoderMachineEntity":
        """Entity factory: client.RoderMachine().list() / client.RoderMachine().load({"id": ...})."""
        from composal_sdk.entity.roder_machine_entity import RoderMachineEntity
        return RoderMachineEntity(self, data)


    def RoderRun(self, data=None) -> "RoderRunEntity":
        """Entity factory: client.RoderRun().list() / client.RoderRun().load({"id": ...})."""
        from composal_sdk.entity.roder_run_entity import RoderRunEntity
        return RoderRunEntity(self, data)


    def RoderWorkspaceCredential(self, data=None) -> "RoderWorkspaceCredentialEntity":
        """Entity factory: client.RoderWorkspaceCredential().list() / client.RoderWorkspaceCredential().load({"id": ...})."""
        from composal_sdk.entity.roder_workspace_credential_entity import RoderWorkspaceCredentialEntity
        return RoderWorkspaceCredentialEntity(self, data)


    def RunArtifact(self, data=None) -> "RunArtifactEntity":
        """Entity factory: client.RunArtifact().list() / client.RunArtifact().load({"id": ...})."""
        from composal_sdk.entity.run_artifact_entity import RunArtifactEntity
        return RunArtifactEntity(self, data)


    def RunJob(self, data=None) -> "RunJobEntity":
        """Entity factory: client.RunJob().list() / client.RunJob().load({"id": ...})."""
        from composal_sdk.entity.run_job_entity import RunJobEntity
        return RunJobEntity(self, data)


    def RunScenarioRun(self, data=None) -> "RunScenarioRunEntity":
        """Entity factory: client.RunScenarioRun().list() / client.RunScenarioRun().load({"id": ...})."""
        from composal_sdk.entity.run_scenario_run_entity import RunScenarioRunEntity
        return RunScenarioRunEntity(self, data)


    def RunScheduleOption(self, data=None) -> "RunScheduleOptionEntity":
        """Entity factory: client.RunScheduleOption().list() / client.RunScheduleOption().load({"id": ...})."""
        from composal_sdk.entity.run_schedule_option_entity import RunScheduleOptionEntity
        return RunScheduleOptionEntity(self, data)


    def RunSearch(self, data=None) -> "RunSearchEntity":
        """Entity factory: client.RunSearch().list() / client.RunSearch().load({"id": ...})."""
        from composal_sdk.entity.run_search_entity import RunSearchEntity
        return RunSearchEntity(self, data)


    def RunUpdate(self, data=None) -> "RunUpdateEntity":
        """Entity factory: client.RunUpdate().list() / client.RunUpdate().load({"id": ...})."""
        from composal_sdk.entity.run_update_entity import RunUpdateEntity
        return RunUpdateEntity(self, data)


    def RunWorkspaceCredential(self, data=None) -> "RunWorkspaceCredentialEntity":
        """Entity factory: client.RunWorkspaceCredential().list() / client.RunWorkspaceCredential().load({"id": ...})."""
        from composal_sdk.entity.run_workspace_credential_entity import RunWorkspaceCredentialEntity
        return RunWorkspaceCredentialEntity(self, data)


    def RunnerLease(self, data=None) -> "RunnerLeaseEntity":
        """Entity factory: client.RunnerLease().list() / client.RunnerLease().load({"id": ...})."""
        from composal_sdk.entity.runner_lease_entity import RunnerLeaseEntity
        return RunnerLeaseEntity(self, data)


    def RunnerPoolNodeEnrollmentToken(self, data=None) -> "RunnerPoolNodeEnrollmentTokenEntity":
        """Entity factory: client.RunnerPoolNodeEnrollmentToken().list() / client.RunnerPoolNodeEnrollmentToken().load({"id": ...})."""
        from composal_sdk.entity.runner_pool_node_enrollment_token_entity import RunnerPoolNodeEnrollmentTokenEntity
        return RunnerPoolNodeEnrollmentTokenEntity(self, data)


    def RunnerPoolRunner(self, data=None) -> "RunnerPoolRunnerEntity":
        """Entity factory: client.RunnerPoolRunner().list() / client.RunnerPoolRunner().load({"id": ...})."""
        from composal_sdk.entity.runner_pool_runner_entity import RunnerPoolRunnerEntity
        return RunnerPoolRunnerEntity(self, data)


    def RuntimeInstanceHealthSnapshot(self, data=None) -> "RuntimeInstanceHealthSnapshotEntity":
        """Entity factory: client.RuntimeInstanceHealthSnapshot().list() / client.RuntimeInstanceHealthSnapshot().load({"id": ...})."""
        from composal_sdk.entity.runtime_instance_health_snapshot_entity import RuntimeInstanceHealthSnapshotEntity
        return RuntimeInstanceHealthSnapshotEntity(self, data)


    def SandboxIntegration(self, data=None) -> "SandboxIntegrationEntity":
        """Entity factory: client.SandboxIntegration().list() / client.SandboxIntegration().load({"id": ...})."""
        from composal_sdk.entity.sandbox_integration_entity import SandboxIntegrationEntity
        return SandboxIntegrationEntity(self, data)


    def ScenarioRevision(self, data=None) -> "ScenarioRevisionEntity":
        """Entity factory: client.ScenarioRevision().list() / client.ScenarioRevision().load({"id": ...})."""
        from composal_sdk.entity.scenario_revision_entity import ScenarioRevisionEntity
        return ScenarioRevisionEntity(self, data)


    def ScenarioRunLesson(self, data=None) -> "ScenarioRunLessonEntity":
        """Entity factory: client.ScenarioRunLesson().list() / client.ScenarioRunLesson().load({"id": ...})."""
        from composal_sdk.entity.scenario_run_lesson_entity import ScenarioRunLessonEntity
        return ScenarioRunLessonEntity(self, data)


    def ScenarioRunScenarioEdit(self, data=None) -> "ScenarioRunScenarioEditEntity":
        """Entity factory: client.ScenarioRunScenarioEdit().list() / client.ScenarioRunScenarioEdit().load({"id": ...})."""
        from composal_sdk.entity.scenario_run_scenario_edit_entity import ScenarioRunScenarioEditEntity
        return ScenarioRunScenarioEditEntity(self, data)


    def SecretGrant(self, data=None) -> "SecretGrantEntity":
        """Entity factory: client.SecretGrant().list() / client.SecretGrant().load({"id": ...})."""
        from composal_sdk.entity.secret_grant_entity import SecretGrantEntity
        return SecretGrantEntity(self, data)


    def SecretVersion(self, data=None) -> "SecretVersionEntity":
        """Entity factory: client.SecretVersion().list() / client.SecretVersion().load({"id": ...})."""
        from composal_sdk.entity.secret_version_entity import SecretVersionEntity
        return SecretVersionEntity(self, data)


    def ServiceEndpoint(self, data=None) -> "ServiceEndpointEntity":
        """Entity factory: client.ServiceEndpoint().list() / client.ServiceEndpoint().load({"id": ...})."""
        from composal_sdk.entity.service_endpoint_entity import ServiceEndpointEntity
        return ServiceEndpointEntity(self, data)


    def Setting(self, data=None) -> "SettingEntity":
        """Entity factory: client.Setting().list() / client.Setting().load({"id": ...})."""
        from composal_sdk.entity.setting_entity import SettingEntity
        return SettingEntity(self, data)


    def SettingMutationLease(self, data=None) -> "SettingMutationLeaseEntity":
        """Entity factory: client.SettingMutationLease().list() / client.SettingMutationLease().load({"id": ...})."""
        from composal_sdk.entity.setting_mutation_lease_entity import SettingMutationLeaseEntity
        return SettingMutationLeaseEntity(self, data)


    def Signal(self, data=None) -> "SignalEntity":
        """Entity factory: client.Signal().list() / client.Signal().load({"id": ...})."""
        from composal_sdk.entity.signal_entity import SignalEntity
        return SignalEntity(self, data)


    def SignalInbound(self, data=None) -> "SignalInboundEntity":
        """Entity factory: client.SignalInbound().list() / client.SignalInbound().load({"id": ...})."""
        from composal_sdk.entity.signal_inbound_entity import SignalInboundEntity
        return SignalInboundEntity(self, data)


    def SignalIntegration(self, data=None) -> "SignalIntegrationEntity":
        """Entity factory: client.SignalIntegration().list() / client.SignalIntegration().load({"id": ...})."""
        from composal_sdk.entity.signal_integration_entity import SignalIntegrationEntity
        return SignalIntegrationEntity(self, data)


    def SignalIntegrationDelivery(self, data=None) -> "SignalIntegrationDeliveryEntity":
        """Entity factory: client.SignalIntegrationDelivery().list() / client.SignalIntegrationDelivery().load({"id": ...})."""
        from composal_sdk.entity.signal_integration_delivery_entity import SignalIntegrationDeliveryEntity
        return SignalIntegrationDeliveryEntity(self, data)


    def SignalIntegrationTarget(self, data=None) -> "SignalIntegrationTargetEntity":
        """Entity factory: client.SignalIntegrationTarget().list() / client.SignalIntegrationTarget().load({"id": ...})."""
        from composal_sdk.entity.signal_integration_target_entity import SignalIntegrationTargetEntity
        return SignalIntegrationTargetEntity(self, data)


    def SignalSubscription(self, data=None) -> "SignalSubscriptionEntity":
        """Entity factory: client.SignalSubscription().list() / client.SignalSubscription().load({"id": ...})."""
        from composal_sdk.entity.signal_subscription_entity import SignalSubscriptionEntity
        return SignalSubscriptionEntity(self, data)


    def Site(self, data=None) -> "SiteEntity":
        """Entity factory: client.Site().list() / client.Site().load({"id": ...})."""
        from composal_sdk.entity.site_entity import SiteEntity
        return SiteEntity(self, data)


    def SiteAccessKey(self, data=None) -> "SiteAccessKeyEntity":
        """Entity factory: client.SiteAccessKey().list() / client.SiteAccessKey().load({"id": ...})."""
        from composal_sdk.entity.site_access_key_entity import SiteAccessKeyEntity
        return SiteAccessKeyEntity(self, data)


    def SitePreview(self, data=None) -> "SitePreviewEntity":
        """Entity factory: client.SitePreview().list() / client.SitePreview().load({"id": ...})."""
        from composal_sdk.entity.site_preview_entity import SitePreviewEntity
        return SitePreviewEntity(self, data)


    def SiteSecret(self, data=None) -> "SiteSecretEntity":
        """Entity factory: client.SiteSecret().list() / client.SiteSecret().load({"id": ...})."""
        from composal_sdk.entity.site_secret_entity import SiteSecretEntity
        return SiteSecretEntity(self, data)


    def SlackChannel(self, data=None) -> "SlackChannelEntity":
        """Entity factory: client.SlackChannel().list() / client.SlackChannel().load({"id": ...})."""
        from composal_sdk.entity.slack_channel_entity import SlackChannelEntity
        return SlackChannelEntity(self, data)


    def SourceConnection(self, data=None) -> "SourceConnectionEntity":
        """Entity factory: client.SourceConnection().list() / client.SourceConnection().load({"id": ...})."""
        from composal_sdk.entity.source_connection_entity import SourceConnectionEntity
        return SourceConnectionEntity(self, data)


    def SpaceAlertRule(self, data=None) -> "SpaceAlertRuleEntity":
        """Entity factory: client.SpaceAlertRule().list() / client.SpaceAlertRule().load({"id": ...})."""
        from composal_sdk.entity.space_alert_rule_entity import SpaceAlertRuleEntity
        return SpaceAlertRuleEntity(self, data)


    def SpaceAuditEvent(self, data=None) -> "SpaceAuditEventEntity":
        """Entity factory: client.SpaceAuditEvent().list() / client.SpaceAuditEvent().load({"id": ...})."""
        from composal_sdk.entity.space_audit_event_entity import SpaceAuditEventEntity
        return SpaceAuditEventEntity(self, data)


    def SpaceDnsRecord(self, data=None) -> "SpaceDnsRecordEntity":
        """Entity factory: client.SpaceDnsRecord().list() / client.SpaceDnsRecord().load({"id": ...})."""
        from composal_sdk.entity.space_dns_record_entity import SpaceDnsRecordEntity
        return SpaceDnsRecordEntity(self, data)


    def SpaceEnrollmentToken(self, data=None) -> "SpaceEnrollmentTokenEntity":
        """Entity factory: client.SpaceEnrollmentToken().list() / client.SpaceEnrollmentToken().load({"id": ...})."""
        from composal_sdk.entity.space_enrollment_token_entity import SpaceEnrollmentTokenEntity
        return SpaceEnrollmentTokenEntity(self, data)


    def SpaceGateway(self, data=None) -> "SpaceGatewayEntity":
        """Entity factory: client.SpaceGateway().list() / client.SpaceGateway().load({"id": ...})."""
        from composal_sdk.entity.space_gateway_entity import SpaceGatewayEntity
        return SpaceGatewayEntity(self, data)


    def SpaceGroup(self, data=None) -> "SpaceGroupEntity":
        """Entity factory: client.SpaceGroup().list() / client.SpaceGroup().load({"id": ...})."""
        from composal_sdk.entity.space_group_entity import SpaceGroupEntity
        return SpaceGroupEntity(self, data)


    def SpaceGroupMembership(self, data=None) -> "SpaceGroupMembershipEntity":
        """Entity factory: client.SpaceGroupMembership().list() / client.SpaceGroupMembership().load({"id": ...})."""
        from composal_sdk.entity.space_group_membership_entity import SpaceGroupMembershipEntity
        return SpaceGroupMembershipEntity(self, data)


    def SpaceLogStream(self, data=None) -> "SpaceLogStreamEntity":
        """Entity factory: client.SpaceLogStream().list() / client.SpaceLogStream().load({"id": ...})."""
        from composal_sdk.entity.space_log_stream_entity import SpaceLogStreamEntity
        return SpaceLogStreamEntity(self, data)


    def SpaceMetricSery(self, data=None) -> "SpaceMetricSeryEntity":
        """Entity factory: client.SpaceMetricSery().list() / client.SpaceMetricSery().load({"id": ...})."""
        from composal_sdk.entity.space_metric_sery_entity import SpaceMetricSeryEntity
        return SpaceMetricSeryEntity(self, data)


    def SpaceOtelCollector(self, data=None) -> "SpaceOtelCollectorEntity":
        """Entity factory: client.SpaceOtelCollector().list() / client.SpaceOtelCollector().load({"id": ...})."""
        from composal_sdk.entity.space_otel_collector_entity import SpaceOtelCollectorEntity
        return SpaceOtelCollectorEntity(self, data)


    def SpacePeer(self, data=None) -> "SpacePeerEntity":
        """Entity factory: client.SpacePeer().list() / client.SpacePeer().load({"id": ...})."""
        from composal_sdk.entity.space_peer_entity import SpacePeerEntity
        return SpacePeerEntity(self, data)


    def SpacePeerAttachment(self, data=None) -> "SpacePeerAttachmentEntity":
        """Entity factory: client.SpacePeerAttachment().list() / client.SpacePeerAttachment().load({"id": ...})."""
        from composal_sdk.entity.space_peer_attachment_entity import SpacePeerAttachmentEntity
        return SpacePeerAttachmentEntity(self, data)


    def SpacePolicy(self, data=None) -> "SpacePolicyEntity":
        """Entity factory: client.SpacePolicy().list() / client.SpacePolicy().load({"id": ...})."""
        from composal_sdk.entity.space_policy_entity import SpacePolicyEntity
        return SpacePolicyEntity(self, data)


    def SpaceSegment(self, data=None) -> "SpaceSegmentEntity":
        """Entity factory: client.SpaceSegment().list() / client.SpaceSegment().load({"id": ...})."""
        from composal_sdk.entity.space_segment_entity import SpaceSegmentEntity
        return SpaceSegmentEntity(self, data)


    def SpaceTraceSpan(self, data=None) -> "SpaceTraceSpanEntity":
        """Entity factory: client.SpaceTraceSpan().list() / client.SpaceTraceSpan().load({"id": ...})."""
        from composal_sdk.entity.space_trace_span_entity import SpaceTraceSpanEntity
        return SpaceTraceSpanEntity(self, data)


    def Spark(self, data=None) -> "SparkEntity":
        """Entity factory: client.Spark().list() / client.Spark().load({"id": ...})."""
        from composal_sdk.entity.spark_entity import SparkEntity
        return SparkEntity(self, data)


    def SparkAgentIntegration(self, data=None) -> "SparkAgentIntegrationEntity":
        """Entity factory: client.SparkAgentIntegration().list() / client.SparkAgentIntegration().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_integration_entity import SparkAgentIntegrationEntity
        return SparkAgentIntegrationEntity(self, data)


    def SparkAgentLocalThread(self, data=None) -> "SparkAgentLocalThreadEntity":
        """Entity factory: client.SparkAgentLocalThread().list() / client.SparkAgentLocalThread().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_local_thread_entity import SparkAgentLocalThreadEntity
        return SparkAgentLocalThreadEntity(self, data)


    def SparkAgentSite(self, data=None) -> "SparkAgentSiteEntity":
        """Entity factory: client.SparkAgentSite().list() / client.SparkAgentSite().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_site_entity import SparkAgentSiteEntity
        return SparkAgentSiteEntity(self, data)


    def SparkAgentSkill(self, data=None) -> "SparkAgentSkillEntity":
        """Entity factory: client.SparkAgentSkill().list() / client.SparkAgentSkill().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_skill_entity import SparkAgentSkillEntity
        return SparkAgentSkillEntity(self, data)


    def SparkAgentThread(self, data=None) -> "SparkAgentThreadEntity":
        """Entity factory: client.SparkAgentThread().list() / client.SparkAgentThread().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_thread_entity import SparkAgentThreadEntity
        return SparkAgentThreadEntity(self, data)


    def SparkCredit(self, data=None) -> "SparkCreditEntity":
        """Entity factory: client.SparkCredit().list() / client.SparkCredit().load({"id": ...})."""
        from composal_sdk.entity.spark_credit_entity import SparkCreditEntity
        return SparkCreditEntity(self, data)


    def SparkCreditAgentUsage(self, data=None) -> "SparkCreditAgentUsageEntity":
        """Entity factory: client.SparkCreditAgentUsage().list() / client.SparkCreditAgentUsage().load({"id": ...})."""
        from composal_sdk.entity.spark_credit_agent_usage_entity import SparkCreditAgentUsageEntity
        return SparkCreditAgentUsageEntity(self, data)


    def SparkCreditUsageTotal(self, data=None) -> "SparkCreditUsageTotalEntity":
        """Entity factory: client.SparkCreditUsageTotal().list() / client.SparkCreditUsageTotal().load({"id": ...})."""
        from composal_sdk.entity.spark_credit_usage_total_entity import SparkCreditUsageTotalEntity
        return SparkCreditUsageTotalEntity(self, data)


    def StaticSite(self, data=None) -> "StaticSiteEntity":
        """Entity factory: client.StaticSite().list() / client.StaticSite().load({"id": ...})."""
        from composal_sdk.entity.static_site_entity import StaticSiteEntity
        return StaticSiteEntity(self, data)


    def StaticSiteDeployment(self, data=None) -> "StaticSiteDeploymentEntity":
        """Entity factory: client.StaticSiteDeployment().list() / client.StaticSiteDeployment().load({"id": ...})."""
        from composal_sdk.entity.static_site_deployment_entity import StaticSiteDeploymentEntity
        return StaticSiteDeploymentEntity(self, data)


    def StaticSiteDomain(self, data=None) -> "StaticSiteDomainEntity":
        """Entity factory: client.StaticSiteDomain().list() / client.StaticSiteDomain().load({"id": ...})."""
        from composal_sdk.entity.static_site_domain_entity import StaticSiteDomainEntity
        return StaticSiteDomainEntity(self, data)


    def StatusChange(self, data=None) -> "StatusChangeEntity":
        """Entity factory: client.StatusChange().list() / client.StatusChange().load({"id": ...})."""
        from composal_sdk.entity.status_change_entity import StatusChangeEntity
        return StatusChangeEntity(self, data)


    def StatusCommit(self, data=None) -> "StatusCommitEntity":
        """Entity factory: client.StatusCommit().list() / client.StatusCommit().load({"id": ...})."""
        from composal_sdk.entity.status_commit_entity import StatusCommitEntity
        return StatusCommitEntity(self, data)


    def StatusPatchset(self, data=None) -> "StatusPatchsetEntity":
        """Entity factory: client.StatusPatchset().list() / client.StatusPatchset().load({"id": ...})."""
        from composal_sdk.entity.status_patchset_entity import StatusPatchsetEntity
        return StatusPatchsetEntity(self, data)


    def StripeWebhook(self, data=None) -> "StripeWebhookEntity":
        """Entity factory: client.StripeWebhook().list() / client.StripeWebhook().load({"id": ...})."""
        from composal_sdk.entity.stripe_webhook_entity import StripeWebhookEntity
        return StripeWebhookEntity(self, data)


    def SubmitTelemetry(self, data=None) -> "SubmitTelemetryEntity":
        """Entity factory: client.SubmitTelemetry().list() / client.SubmitTelemetry().load({"id": ...})."""
        from composal_sdk.entity.submit_telemetry_entity import SubmitTelemetryEntity
        return SubmitTelemetryEntity(self, data)


    def SubscriptionModel(self, data=None) -> "SubscriptionModelEntity":
        """Entity factory: client.SubscriptionModel().list() / client.SubscriptionModel().load({"id": ...})."""
        from composal_sdk.entity.subscription_model_entity import SubscriptionModelEntity
        return SubscriptionModelEntity(self, data)


    def SwarmEvent(self, data=None) -> "SwarmEventEntity":
        """Entity factory: client.SwarmEvent().list() / client.SwarmEvent().load({"id": ...})."""
        from composal_sdk.entity.swarm_event_entity import SwarmEventEntity
        return SwarmEventEntity(self, data)


    def SwarmLive(self, data=None) -> "SwarmLiveEntity":
        """Entity factory: client.SwarmLive().list() / client.SwarmLive().load({"id": ...})."""
        from composal_sdk.entity.swarm_live_entity import SwarmLiveEntity
        return SwarmLiveEntity(self, data)


    def SwarmNote(self, data=None) -> "SwarmNoteEntity":
        """Entity factory: client.SwarmNote().list() / client.SwarmNote().load({"id": ...})."""
        from composal_sdk.entity.swarm_note_entity import SwarmNoteEntity
        return SwarmNoteEntity(self, data)


    def SwarmTask(self, data=None) -> "SwarmTaskEntity":
        """Entity factory: client.SwarmTask().list() / client.SwarmTask().load({"id": ...})."""
        from composal_sdk.entity.swarm_task_entity import SwarmTaskEntity
        return SwarmTaskEntity(self, data)


    def TaskLease(self, data=None) -> "TaskLeaseEntity":
        """Entity factory: client.TaskLease().list() / client.TaskLease().load({"id": ...})."""
        from composal_sdk.entity.task_lease_entity import TaskLeaseEntity
        return TaskLeaseEntity(self, data)


    def ThreadPreview(self, data=None) -> "ThreadPreviewEntity":
        """Entity factory: client.ThreadPreview().list() / client.ThreadPreview().load({"id": ...})."""
        from composal_sdk.entity.thread_preview_entity import ThreadPreviewEntity
        return ThreadPreviewEntity(self, data)


    def ThreadPreviewAccess(self, data=None) -> "ThreadPreviewAccessEntity":
        """Entity factory: client.ThreadPreviewAccess().list() / client.ThreadPreviewAccess().load({"id": ...})."""
        from composal_sdk.entity.thread_preview_access_entity import ThreadPreviewAccessEntity
        return ThreadPreviewAccessEntity(self, data)


    def ToolFeedback(self, data=None) -> "ToolFeedbackEntity":
        """Entity factory: client.ToolFeedback().list() / client.ToolFeedback().load({"id": ...})."""
        from composal_sdk.entity.tool_feedback_entity import ToolFeedbackEntity
        return ToolFeedbackEntity(self, data)


    def Transcript(self, data=None) -> "TranscriptEntity":
        """Entity factory: client.Transcript().list() / client.Transcript().load({"id": ...})."""
        from composal_sdk.entity.transcript_entity import TranscriptEntity
        return TranscriptEntity(self, data)


    def V1Message(self, data=None) -> "V1MessageEntity":
        """Entity factory: client.V1Message().list() / client.V1Message().load({"id": ...})."""
        from composal_sdk.entity.v1_message_entity import V1MessageEntity
        return V1MessageEntity(self, data)


    def VcBranch(self, data=None) -> "VcBranchEntity":
        """Entity factory: client.VcBranch().list() / client.VcBranch().load({"id": ...})."""
        from composal_sdk.entity.vc_branch_entity import VcBranchEntity
        return VcBranchEntity(self, data)


    def VcBrowser(self, data=None) -> "VcBrowserEntity":
        """Entity factory: client.VcBrowser().list() / client.VcBrowser().load({"id": ...})."""
        from composal_sdk.entity.vc_browser_entity import VcBrowserEntity
        return VcBrowserEntity(self, data)


    def VcChange(self, data=None) -> "VcChangeEntity":
        """Entity factory: client.VcChange().list() / client.VcChange().load({"id": ...})."""
        from composal_sdk.entity.vc_change_entity import VcChangeEntity
        return VcChangeEntity(self, data)


    def VcChangeGroup(self, data=None) -> "VcChangeGroupEntity":
        """Entity factory: client.VcChangeGroup().list() / client.VcChangeGroup().load({"id": ...})."""
        from composal_sdk.entity.vc_change_group_entity import VcChangeGroupEntity
        return VcChangeGroupEntity(self, data)


    def VcFile(self, data=None) -> "VcFileEntity":
        """Entity factory: client.VcFile().list() / client.VcFile().load({"id": ...})."""
        from composal_sdk.entity.vc_file_entity import VcFileEntity
        return VcFileEntity(self, data)


    def VcMergeQueue(self, data=None) -> "VcMergeQueueEntity":
        """Entity factory: client.VcMergeQueue().list() / client.VcMergeQueue().load({"id": ...})."""
        from composal_sdk.entity.vc_merge_queue_entity import VcMergeQueueEntity
        return VcMergeQueueEntity(self, data)


    def VcStack(self, data=None) -> "VcStackEntity":
        """Entity factory: client.VcStack().list() / client.VcStack().load({"id": ...})."""
        from composal_sdk.entity.vc_stack_entity import VcStackEntity
        return VcStackEntity(self, data)


    def VcsNode(self, data=None) -> "VcsNodeEntity":
        """Entity factory: client.VcsNode().list() / client.VcsNode().load({"id": ...})."""
        from composal_sdk.entity.vcs_node_entity import VcsNodeEntity
        return VcsNodeEntity(self, data)


    def VcsSetting(self, data=None) -> "VcsSettingEntity":
        """Entity factory: client.VcsSetting().list() / client.VcsSetting().load({"id": ...})."""
        from composal_sdk.entity.vcs_setting_entity import VcsSettingEntity
        return VcsSettingEntity(self, data)


    def VerificationProjectCredential(self, data=None) -> "VerificationProjectCredentialEntity":
        """Entity factory: client.VerificationProjectCredential().list() / client.VerificationProjectCredential().load({"id": ...})."""
        from composal_sdk.entity.verification_project_credential_entity import VerificationProjectCredentialEntity
        return VerificationProjectCredentialEntity(self, data)


    def VerificationProjectPersona(self, data=None) -> "VerificationProjectPersonaEntity":
        """Entity factory: client.VerificationProjectPersona().list() / client.VerificationProjectPersona().load({"id": ...})."""
        from composal_sdk.entity.verification_project_persona_entity import VerificationProjectPersonaEntity
        return VerificationProjectPersonaEntity(self, data)


    def VerificationProjectRun(self, data=None) -> "VerificationProjectRunEntity":
        """Entity factory: client.VerificationProjectRun().list() / client.VerificationProjectRun().load({"id": ...})."""
        from composal_sdk.entity.verification_project_run_entity import VerificationProjectRunEntity
        return VerificationProjectRunEntity(self, data)


    def VerificationProjectScenario(self, data=None) -> "VerificationProjectScenarioEntity":
        """Entity factory: client.VerificationProjectScenario().list() / client.VerificationProjectScenario().load({"id": ...})."""
        from composal_sdk.entity.verification_project_scenario_entity import VerificationProjectScenarioEntity
        return VerificationProjectScenarioEntity(self, data)


    def VerifyAppDomain(self, data=None) -> "VerifyAppDomainEntity":
        """Entity factory: client.VerifyAppDomain().list() / client.VerifyAppDomain().load({"id": ...})."""
        from composal_sdk.entity.verify_app_domain_entity import VerifyAppDomainEntity
        return VerifyAppDomainEntity(self, data)


    def VerifyBrowserSession(self, data=None) -> "VerifyBrowserSessionEntity":
        """Entity factory: client.VerifyBrowserSession().list() / client.VerifyBrowserSession().load({"id": ...})."""
        from composal_sdk.entity.verify_browser_session_entity import VerifyBrowserSessionEntity
        return VerifyBrowserSessionEntity(self, data)


    def VerifyEmailVerification(self, data=None) -> "VerifyEmailVerificationEntity":
        """Entity factory: client.VerifyEmailVerification().list() / client.VerifyEmailVerification().load({"id": ...})."""
        from composal_sdk.entity.verify_email_verification_entity import VerifyEmailVerificationEntity
        return VerifyEmailVerificationEntity(self, data)


    def VerifySignalIntegration(self, data=None) -> "VerifySignalIntegrationEntity":
        """Entity factory: client.VerifySignalIntegration().list() / client.VerifySignalIntegration().load({"id": ...})."""
        from composal_sdk.entity.verify_signal_integration_entity import VerifySignalIntegrationEntity
        return VerifySignalIntegrationEntity(self, data)


    def VerifyStaticSiteDomain(self, data=None) -> "VerifyStaticSiteDomainEntity":
        """Entity factory: client.VerifyStaticSiteDomain().list() / client.VerifyStaticSiteDomain().load({"id": ...})."""
        from composal_sdk.entity.verify_static_site_domain_entity import VerifyStaticSiteDomainEntity
        return VerifyStaticSiteDomainEntity(self, data)


    def VersionLog(self, data=None) -> "VersionLogEntity":
        """Entity factory: client.VersionLog().list() / client.VersionLog().load({"id": ...})."""
        from composal_sdk.entity.version_log_entity import VersionLogEntity
        return VersionLogEntity(self, data)


    def WaitlistApplication(self, data=None) -> "WaitlistApplicationEntity":
        """Entity factory: client.WaitlistApplication().list() / client.WaitlistApplication().load({"id": ...})."""
        from composal_sdk.entity.waitlist_application_entity import WaitlistApplicationEntity
        return WaitlistApplicationEntity(self, data)


    def WebBotAuth(self, data=None) -> "WebBotAuthEntity":
        """Entity factory: client.WebBotAuth().list() / client.WebBotAuth().load({"id": ...})."""
        from composal_sdk.entity.web_bot_auth_entity import WebBotAuthEntity
        return WebBotAuthEntity(self, data)


    def WebhookGitlab(self, data=None) -> "WebhookGitlabEntity":
        """Entity factory: client.WebhookGitlab().list() / client.WebhookGitlab().load({"id": ...})."""
        from composal_sdk.entity.webhook_gitlab_entity import WebhookGitlabEntity
        return WebhookGitlabEntity(self, data)


    def WorkflowRunStep(self, data=None) -> "WorkflowRunStepEntity":
        """Entity factory: client.WorkflowRunStep().list() / client.WorkflowRunStep().load({"id": ...})."""
        from composal_sdk.entity.workflow_run_step_entity import WorkflowRunStepEntity
        return WorkflowRunStepEntity(self, data)


    def WorkflowRunStopNotice(self, data=None) -> "WorkflowRunStopNoticeEntity":
        """Entity factory: client.WorkflowRunStopNotice().list() / client.WorkflowRunStopNotice().load({"id": ...})."""
        from composal_sdk.entity.workflow_run_stop_notice_entity import WorkflowRunStopNoticeEntity
        return WorkflowRunStopNoticeEntity(self, data)


    def WorkflowTriggerSkipped(self, data=None) -> "WorkflowTriggerSkippedEntity":
        """Entity factory: client.WorkflowTriggerSkipped().list() / client.WorkflowTriggerSkipped().load({"id": ...})."""
        from composal_sdk.entity.workflow_trigger_skipped_entity import WorkflowTriggerSkippedEntity
        return WorkflowTriggerSkippedEntity(self, data)


    def WorkspaceActivity(self, data=None) -> "WorkspaceActivityEntity":
        """Entity factory: client.WorkspaceActivity().list() / client.WorkspaceActivity().load({"id": ...})."""
        from composal_sdk.entity.workspace_activity_entity import WorkspaceActivityEntity
        return WorkspaceActivityEntity(self, data)


    def WorkspaceActivityNotification(self, data=None) -> "WorkspaceActivityNotificationEntity":
        """Entity factory: client.WorkspaceActivityNotification().list() / client.WorkspaceActivityNotification().load({"id": ...})."""
        from composal_sdk.entity.workspace_activity_notification_entity import WorkspaceActivityNotificationEntity
        return WorkspaceActivityNotificationEntity(self, data)


    def WorkspaceSpace(self, data=None) -> "WorkspaceSpaceEntity":
        """Entity factory: client.WorkspaceSpace().list() / client.WorkspaceSpace().load({"id": ...})."""
        from composal_sdk.entity.workspace_space_entity import WorkspaceSpaceEntity
        return WorkspaceSpaceEntity(self, data)


    def WorkspaceSpacePreference(self, data=None) -> "WorkspaceSpacePreferenceEntity":
        """Entity factory: client.WorkspaceSpacePreference().list() / client.WorkspaceSpacePreference().load({"id": ...})."""
        from composal_sdk.entity.workspace_space_preference_entity import WorkspaceSpacePreferenceEntity
        return WorkspaceSpacePreferenceEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "ComposalSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from composal_sdk.entity.a2a_well_known_entity import A2aWellKnownEntity
    from composal_sdk.entity.admin_org_entity import AdminOrgEntity
    from composal_sdk.entity.agent_entity import AgentEntity
    from composal_sdk.entity.agent_app_entity import AgentAppEntity
    from composal_sdk.entity.agent_app_install_entity import AgentAppInstallEntity
    from composal_sdk.entity.agent_attachment_entity import AgentAttachmentEntity
    from composal_sdk.entity.agent_automation_entity import AgentAutomationEntity
    from composal_sdk.entity.agent_avatar_entity import AgentAvatarEntity
    from composal_sdk.entity.agent_command_entity import AgentCommandEntity
    from composal_sdk.entity.agent_computer_entity import AgentComputerEntity
    from composal_sdk.entity.agent_connection_entity import AgentConnectionEntity
    from composal_sdk.entity.agent_connection_delegation_entity import AgentConnectionDelegationEntity
    from composal_sdk.entity.agent_connection_grant_entity import AgentConnectionGrantEntity
    from composal_sdk.entity.agent_connection_resource_entity import AgentConnectionResourceEntity
    from composal_sdk.entity.agent_connection_safety_control_entity import AgentConnectionSafetyControlEntity
    from composal_sdk.entity.agent_connection_trigger_subscription_entity import AgentConnectionTriggerSubscriptionEntity
    from composal_sdk.entity.agent_context_checkpoint_entity import AgentContextCheckpointEntity
    from composal_sdk.entity.agent_control_flow_entity import AgentControlFlowEntity
    from composal_sdk.entity.agent_coordination_entity import AgentCoordinationEntity
    from composal_sdk.entity.agent_email_entity import AgentEmailEntity
    from composal_sdk.entity.agent_event_entity import AgentEventEntity
    from composal_sdk.entity.agent_file_entity import AgentFileEntity
    from composal_sdk.entity.agent_input_entity import AgentInputEntity
    from composal_sdk.entity.agent_integration_entity import AgentIntegrationEntity
    from composal_sdk.entity.agent_integration_account_entity import AgentIntegrationAccountEntity
    from composal_sdk.entity.agent_integration_callback_entity import AgentIntegrationCallbackEntity
    from composal_sdk.entity.agent_interaction_entity import AgentInteractionEntity
    from composal_sdk.entity.agent_library_entity import AgentLibraryEntity
    from composal_sdk.entity.agent_manager_entity import AgentManagerEntity
    from composal_sdk.entity.agent_manager_choice_entity import AgentManagerChoiceEntity
    from composal_sdk.entity.agent_marketplace_entity import AgentMarketplaceEntity
    from composal_sdk.entity.agent_marketplace_shared_entity import AgentMarketplaceSharedEntity
    from composal_sdk.entity.agent_mission_control_entity import AgentMissionControlEntity
    from composal_sdk.entity.agent_operation_entity import AgentOperationEntity
    from composal_sdk.entity.agent_provisioning_entity import AgentProvisioningEntity
    from composal_sdk.entity.agent_pull_request_entity import AgentPullRequestEntity
    from composal_sdk.entity.agent_question_entity import AgentQuestionEntity
    from composal_sdk.entity.agent_relay_file_grant_entity import AgentRelayFileGrantEntity
    from composal_sdk.entity.agent_relay_file_grant_account_entity import AgentRelayFileGrantAccountEntity
    from composal_sdk.entity.agent_repository_entity import AgentRepositoryEntity
    from composal_sdk.entity.agent_resource_entity import AgentResourceEntity
    from composal_sdk.entity.agent_roder_entity import AgentRoderEntity
    from composal_sdk.entity.agent_routine_entity import AgentRoutineEntity
    from composal_sdk.entity.agent_run_entity import AgentRunEntity
    from composal_sdk.entity.agent_runtime_entity import AgentRuntimeEntity
    from composal_sdk.entity.agent_session_entity import AgentSessionEntity
    from composal_sdk.entity.agent_session_checkpoint_entity import AgentSessionCheckpointEntity
    from composal_sdk.entity.agent_session_roder_handoff_entity import AgentSessionRoderHandoffEntity
    from composal_sdk.entity.agent_setting_entity import AgentSettingEntity
    from composal_sdk.entity.agent_sharing_entity import AgentSharingEntity
    from composal_sdk.entity.agent_site_entity import AgentSiteEntity
    from composal_sdk.entity.agent_skill_entity import AgentSkillEntity
    from composal_sdk.entity.agent_slack_entity import AgentSlackEntity
    from composal_sdk.entity.agent_subagent_entity import AgentSubagentEntity
    from composal_sdk.entity.agent_subscription_entity import AgentSubscriptionEntity
    from composal_sdk.entity.agent_swarm_entity import AgentSwarmEntity
    from composal_sdk.entity.agent_teammate_entity import AgentTeammateEntity
    from composal_sdk.entity.agent_terminal_entity import AgentTerminalEntity
    from composal_sdk.entity.agent_thread_entity import AgentThreadEntity
    from composal_sdk.entity.agent_tool_entity import AgentToolEntity
    from composal_sdk.entity.agent_usage_entity import AgentUsageEntity
    from composal_sdk.entity.agent_verify_project_entity import AgentVerifyProjectEntity
    from composal_sdk.entity.agent_wait_entity import AgentWaitEntity
    from composal_sdk.entity.agent_web_preview_entity import AgentWebPreviewEntity
    from composal_sdk.entity.agent_webhook_entity import AgentWebhookEntity
    from composal_sdk.entity.agent_work_entity import AgentWorkEntity
    from composal_sdk.entity.agent_workflow_entity import AgentWorkflowEntity
    from composal_sdk.entity.agent_workflow_proposal_entity import AgentWorkflowProposalEntity
    from composal_sdk.entity.agent_workflow_run_entity import AgentWorkflowRunEntity
    from composal_sdk.entity.agent_workflow_trigger_entity import AgentWorkflowTriggerEntity
    from composal_sdk.entity.agent_workspace_entity import AgentWorkspaceEntity
    from composal_sdk.entity.agent_write_permission_entity import AgentWritePermissionEntity
    from composal_sdk.entity.agreement_entity import AgreementEntity
    from composal_sdk.entity.agreement_access_request_entity import AgreementAccessRequestEntity
    from composal_sdk.entity.alert_rule_event_entity import AlertRuleEventEntity
    from composal_sdk.entity.allocation_log_entity import AllocationLogEntity
    from composal_sdk.entity.app_entity import AppEntity
    from composal_sdk.entity.app_access_entity import AppAccessEntity
    from composal_sdk.entity.app_access_jwk_entity import AppAccessJwkEntity
    from composal_sdk.entity.app_cdn_entity import AppCdnEntity
    from composal_sdk.entity.app_config_variable_entity import AppConfigVariableEntity
    from composal_sdk.entity.app_data_resource_entity import AppDataResourceEntity
    from composal_sdk.entity.app_deploy_entity import AppDeployEntity
    from composal_sdk.entity.app_deployment_entity import AppDeploymentEntity
    from composal_sdk.entity.app_deployment_operation_entity import AppDeploymentOperationEntity
    from composal_sdk.entity.app_deployment_rollback_entity import AppDeploymentRollbackEntity
    from composal_sdk.entity.app_environment_entity import AppEnvironmentEntity
    from composal_sdk.entity.app_location_entity import AppLocationEntity
    from composal_sdk.entity.app_metric_entity import AppMetricEntity
    from composal_sdk.entity.app_preview_entity import AppPreviewEntity
    from composal_sdk.entity.app_preview_profile_entity import AppPreviewProfileEntity
    from composal_sdk.entity.app_run_entity import AppRunEntity
    from composal_sdk.entity.app_secret_entity import AppSecretEntity
    from composal_sdk.entity.app_service_entity import AppServiceEntity
    from composal_sdk.entity.app_service_binding_entity import AppServiceBindingEntity
    from composal_sdk.entity.app_service_placement_entity import AppServicePlacementEntity
    from composal_sdk.entity.app_storage_resource_entity import AppStorageResourceEntity
    from composal_sdk.entity.artefact_entity import ArtefactEntity
    from composal_sdk.entity.artefact_comment_thread_entity import ArtefactCommentThreadEntity
    from composal_sdk.entity.artefact_revision_entity import ArtefactRevisionEntity
    from composal_sdk.entity.artefact_view_token_entity import ArtefactViewTokenEntity
    from composal_sdk.entity.artifact_entity import ArtifactEntity
    from composal_sdk.entity.artifact_cache_namespace_entity import ArtifactCacheNamespaceEntity
    from composal_sdk.entity.artifact_image_repository_entity import ArtifactImageRepositoryEntity
    from composal_sdk.entity.artifact_package_mirror_entity import ArtifactPackageMirrorEntity
    from composal_sdk.entity.artifact_retention_policy_entity import ArtifactRetentionPolicyEntity
    from composal_sdk.entity.attachment_part_entity import AttachmentPartEntity
    from composal_sdk.entity.audit_event_entity import AuditEventEntity
    from composal_sdk.entity.auth_entity import AuthEntity
    from composal_sdk.entity.auth_cli_entity import AuthCliEntity
    from composal_sdk.entity.auth_github_entity import AuthGithubEntity
    from composal_sdk.entity.auth_google_entity import AuthGoogleEntity
    from composal_sdk.entity.auth_openai_entity import AuthOpenaiEntity
    from composal_sdk.entity.auth_password_reset_entity import AuthPasswordResetEntity
    from composal_sdk.entity.auth_registration_option_entity import AuthRegistrationOptionEntity
    from composal_sdk.entity.automation_event_entity import AutomationEventEntity
    from composal_sdk.entity.automation_run_entity import AutomationRunEntity
    from composal_sdk.entity.backend_runner_pool_entity import BackendRunnerPoolEntity
    from composal_sdk.entity.bazel_entity import BazelEntity
    from composal_sdk.entity.bazel_action_result_entity import BazelActionResultEntity
    from composal_sdk.entity.bazel_backend_entity import BazelBackendEntity
    from composal_sdk.entity.bazel_blob_entity import BazelBlobEntity
    from composal_sdk.entity.bazel_execution_entity import BazelExecutionEntity
    from composal_sdk.entity.bazel_find_missing_blob_entity import BazelFindMissingBlobEntity
    from composal_sdk.entity.billing_entity import BillingEntity
    from composal_sdk.entity.billing_addon_entity import BillingAddonEntity
    from composal_sdk.entity.billing_checkout_session_entity import BillingCheckoutSessionEntity
    from composal_sdk.entity.billing_invoice_entity import BillingInvoiceEntity
    from composal_sdk.entity.billing_package_entity import BillingPackageEntity
    from composal_sdk.entity.billing_portal_session_entity import BillingPortalSessionEntity
    from composal_sdk.entity.billing_prepaid_period_entity import BillingPrepaidPeriodEntity
    from composal_sdk.entity.billing_prepaid_purchase_entity import BillingPrepaidPurchaseEntity
    from composal_sdk.entity.billing_token_top_up_entity import BillingTokenTopUpEntity
    from composal_sdk.entity.billing_usage_entity import BillingUsageEntity
    from composal_sdk.entity.binary_entity import BinaryEntity
    from composal_sdk.entity.binary_version_entity import BinaryVersionEntity
    from composal_sdk.entity.bookmark_protection_refresh_github_required_check_entity import BookmarkProtectionRefreshGithubRequiredCheckEntity
    from composal_sdk.entity.browser_egress_candidate_entity import BrowserEgressCandidateEntity
    from composal_sdk.entity.browser_session_entity import BrowserSessionEntity
    from composal_sdk.entity.browser_session_connection_entity import BrowserSessionConnectionEntity
    from composal_sdk.entity.browser_session_control_entity import BrowserSessionControlEntity
    from composal_sdk.entity.browser_session_event_entity import BrowserSessionEventEntity
    from composal_sdk.entity.browser_session_media_entity import BrowserSessionMediaEntity
    from composal_sdk.entity.browser_session_recording_entity import BrowserSessionRecordingEntity
    from composal_sdk.entity.browser_session_screenshot_entity import BrowserSessionScreenshotEntity
    from composal_sdk.entity.browser_session_task_entity import BrowserSessionTaskEntity
    from composal_sdk.entity.cache_namespace_entry_entity import CacheNamespaceEntryEntity
    from composal_sdk.entity.catalog_selector_entity import CatalogSelectorEntity
    from composal_sdk.entity.cdn_deployment_entity import CdnDeploymentEntity
    from composal_sdk.entity.cdn_hostname_entity import CdnHostnameEntity
    from composal_sdk.entity.cdn_space_entity import CdnSpaceEntity
    from composal_sdk.entity.cdn_space_object_entity import CdnSpaceObjectEntity
    from composal_sdk.entity.change_entity import ChangeEntity
    from composal_sdk.entity.change_asset_entity import ChangeAssetEntity
    from composal_sdk.entity.change_comment_entity import ChangeCommentEntity
    from composal_sdk.entity.change_file_review_checkpoint_entity import ChangeFileReviewCheckpointEntity
    from composal_sdk.entity.change_git_branch_submission_entity import ChangeGitBranchSubmissionEntity
    from composal_sdk.entity.change_git_commit_identity_entity import ChangeGitCommitIdentityEntity
    from composal_sdk.entity.change_git_publication_entity import ChangeGitPublicationEntity
    from composal_sdk.entity.change_group_member_entity import ChangeGroupMemberEntity
    from composal_sdk.entity.change_label_entity import ChangeLabelEntity
    from composal_sdk.entity.change_landing_hold_entity import ChangeLandingHoldEntity
    from composal_sdk.entity.change_landing_request_entity import ChangeLandingRequestEntity
    from composal_sdk.entity.change_request_change_entity import ChangeRequestChangeEntity
    from composal_sdk.entity.change_reviewer_entity import ChangeReviewerEntity
    from composal_sdk.entity.change_transcript_entity import ChangeTranscriptEntity
    from composal_sdk.entity.change_transcript_summary_entity import ChangeTranscriptSummaryEntity
    from composal_sdk.entity.checkpoint_prepare_chunk_entity import CheckpointPrepareChunkEntity
    from composal_sdk.entity.ci_node_entity import CiNodeEntity
    from composal_sdk.entity.ci_pipeline_entity import CiPipelineEntity
    from composal_sdk.entity.ci_pipeline_run_entity import CiPipelineRunEntity
    from composal_sdk.entity.ci_runner_pool_entity import CiRunnerPoolEntity
    from composal_sdk.entity.ci_status_entity import CiStatusEntity
    from composal_sdk.entity.cli_event_entity import CliEventEntity
    from composal_sdk.entity.cli_release_entity import CliReleaseEntity
    from composal_sdk.entity.cloud_workspace_backup_object_entity import CloudWorkspaceBackupObjectEntity
    from composal_sdk.entity.code_rule_evaluation_entity import CodeRuleEvaluationEntity
    from composal_sdk.entity.com_site_access_entity import ComSiteAccessEntity
    from composal_sdk.entity.com_site_access_session_entity import ComSiteAccessSessionEntity
    from composal_sdk.entity.comment_thread_comment_entity import CommentThreadCommentEntity
    from composal_sdk.entity.commit_diff_entity import CommitDiffEntity
    from composal_sdk.entity.connection_request_entity import ConnectionRequestEntity
    from composal_sdk.entity.connection_source_entity import ConnectionSourceEntity
    from composal_sdk.entity.contact_submission_entity import ContactSubmissionEntity
    from composal_sdk.entity.control_computer_entity import ControlComputerEntity
    from composal_sdk.entity.control_computer_control_operation_entity import ControlComputerControlOperationEntity
    from composal_sdk.entity.coordination_wait_entity import CoordinationWaitEntity
    from composal_sdk.entity.credential_sign_in_check_entity import CredentialSignInCheckEntity
    from composal_sdk.entity.data_resource_rotate_credential_entity import DataResourceRotateCredentialEntity
    from composal_sdk.entity.deep_scan_entity import DeepScanEntity
    from composal_sdk.entity.deep_scan_finding_entity import DeepScanFindingEntity
    from composal_sdk.entity.deep_scan_flow_entity import DeepScanFlowEntity
    from composal_sdk.entity.deep_scan_mapped_flow_entity import DeepScanMappedFlowEntity
    from composal_sdk.entity.deep_scan_option_entity import DeepScanOptionEntity
    from composal_sdk.entity.demo_share_entity import DemoShareEntity
    from composal_sdk.entity.demo_share_segment_entity import DemoShareSegmentEntity
    from composal_sdk.entity.deployment_entity import DeploymentEntity
    from composal_sdk.entity.deployment_dashboard_nomad_entity import DeploymentDashboardNomadEntity
    from composal_sdk.entity.deployment_detail_entity import DeploymentDetailEntity
    from composal_sdk.entity.deployment_file_entity import DeploymentFileEntity
    from composal_sdk.entity.deployment_log_entity import DeploymentLogEntity
    from composal_sdk.entity.deployment_metric_entity import DeploymentMetricEntity
    from composal_sdk.entity.deployment_preview_entity import DeploymentPreviewEntity
    from composal_sdk.entity.deployment_setting_entity import DeploymentSettingEntity
    from composal_sdk.entity.desktop_local_agent_model_entity import DesktopLocalAgentModelEntity
    from composal_sdk.entity.desktop_local_agent_response_entity import DesktopLocalAgentResponseEntity
    from composal_sdk.entity.device_entity import DeviceEntity
    from composal_sdk.entity.device_browser_operation_entity import DeviceBrowserOperationEntity
    from composal_sdk.entity.device_control_message_entity import DeviceControlMessageEntity
    from composal_sdk.entity.device_control_operation_entity import DeviceControlOperationEntity
    from composal_sdk.entity.device_enterprise_relay_entity import DeviceEnterpriseRelayEntity
    from composal_sdk.entity.device_folder_listing_entity import DeviceFolderListingEntity
    from composal_sdk.entity.device_grant_entity import DeviceGrantEntity
    from composal_sdk.entity.device_invocation_entity import DeviceInvocationEntity
    from composal_sdk.entity.device_local_event_entity import DeviceLocalEventEntity
    from composal_sdk.entity.device_pairing_entity import DevicePairingEntity
    from composal_sdk.entity.device_project_entity import DeviceProjectEntity
    from composal_sdk.entity.device_scheduled_check_in_entity import DeviceScheduledCheckInEntity
    from composal_sdk.entity.docker_builder_entity import DockerBuilderEntity
    from composal_sdk.entity.docker_builder_session_entity import DockerBuilderSessionEntity
    from composal_sdk.entity.docker_builder_setting_entity import DockerBuilderSettingEntity
    from composal_sdk.entity.domain_dns_integration_entity import DomainDnsIntegrationEntity
    from composal_sdk.entity.domain_path_rule_entity import DomainPathRuleEntity
    from composal_sdk.entity.dream_entity import DreamEntity
    from composal_sdk.entity.edge_entity import EdgeEntity
    from composal_sdk.entity.email_verification_entity import EmailVerificationEntity
    from composal_sdk.entity.environment_entity import EnvironmentEntity
    from composal_sdk.entity.environment_discovery_run_entity import EnvironmentDiscoveryRunEntity
    from composal_sdk.entity.environment_exploration_entity import EnvironmentExplorationEntity
    from composal_sdk.entity.environment_first_run_entity import EnvironmentFirstRunEntity
    from composal_sdk.entity.environment_revision_entity import EnvironmentRevisionEntity
    from composal_sdk.entity.environment_secret_binding_entity import EnvironmentSecretBindingEntity
    from composal_sdk.entity.environment_test_account_entity import EnvironmentTestAccountEntity
    from composal_sdk.entity.evidence_entity import EvidenceEntity
    from composal_sdk.entity.execution_desired_state_entity import ExecutionDesiredStateEntity
    from composal_sdk.entity.execution_reconciler_tick_entity import ExecutionReconcilerTickEntity
    from composal_sdk.entity.execution_release_entity import ExecutionReleaseEntity
    from composal_sdk.entity.execution_runtime_instance_entity import ExecutionRuntimeInstanceEntity
    from composal_sdk.entity.exploration_entity import ExplorationEntity
    from composal_sdk.entity.exploration_message_entity import ExplorationMessageEntity
    from composal_sdk.entity.exploration_report_entity import ExplorationReportEntity
    from composal_sdk.entity.exploration_scenario_entity import ExplorationScenarioEntity
    from composal_sdk.entity.finding_entity import FindingEntity
    from composal_sdk.entity.gh_entity import GhEntity
    from composal_sdk.entity.git_import_entity import GitImportEntity
    from composal_sdk.entity.github_entity import GithubEntity
    from composal_sdk.entity.github_app_entity import GithubAppEntity
    from composal_sdk.entity.github_app_importable_repository_entity import GithubAppImportableRepositoryEntity
    from composal_sdk.entity.github_app_installation_entity import GithubAppInstallationEntity
    from composal_sdk.entity.github_app_installation_authorization_entity import GithubAppInstallationAuthorizationEntity
    from composal_sdk.entity.github_app_user_authorization_entity import GithubAppUserAuthorizationEntity
    from composal_sdk.entity.github_ci_repository_entity import GithubCiRepositoryEntity
    from composal_sdk.entity.github_ci_repository_compatibility_report_entity import GithubCiRepositoryCompatibilityReportEntity
    from composal_sdk.entity.github_connection_entity import GithubConnectionEntity
    from composal_sdk.entity.github_integration_entity import GithubIntegrationEntity
    from composal_sdk.entity.github_onboarding_entity import GithubOnboardingEntity
    from composal_sdk.entity.github_onboarding_branch_entity import GithubOnboardingBranchEntity
    from composal_sdk.entity.github_onboarding_import_entity import GithubOnboardingImportEntity
    from composal_sdk.entity.github_onboarding_import_batch_entity import GithubOnboardingImportBatchEntity
    from composal_sdk.entity.github_onboarding_import_item_entity import GithubOnboardingImportItemEntity
    from composal_sdk.entity.github_pull_request_entity import GithubPullRequestEntity
    from composal_sdk.entity.github_runner_admission_entity import GithubRunnerAdmissionEntity
    from composal_sdk.entity.github_runner_cache_entity import GithubRunnerCacheEntity
    from composal_sdk.entity.github_runner_egress_entity import GithubRunnerEgressEntity
    from composal_sdk.entity.github_runner_history_entity import GithubRunnerHistoryEntity
    from composal_sdk.entity.github_runner_image_entity import GithubRunnerImageEntity
    from composal_sdk.entity.github_runner_pool_entity import GithubRunnerPoolEntity
    from composal_sdk.entity.github_runner_setup_entity import GithubRunnerSetupEntity
    from composal_sdk.entity.gitlab_entity import GitlabEntity
    from composal_sdk.entity.gitlab_connection_entity import GitlabConnectionEntity
    from composal_sdk.entity.gitlab_import_entity import GitlabImportEntity
    from composal_sdk.entity.gitlab_oauth_entity import GitlabOauthEntity
    from composal_sdk.entity.grant_all_agent_entity import GrantAllAgentEntity
    from composal_sdk.entity.hosting_app_domain_entity import HostingAppDomainEntity
    from composal_sdk.entity.identity_organization_entity import IdentityOrganizationEntity
    from composal_sdk.entity.image_repository_entity import ImageRepositoryEntity
    from composal_sdk.entity.image_repository_tag_entity import ImageRepositoryTagEntity
    from composal_sdk.entity.import_branch_policy_entity import ImportBranchPolicyEntity
    from composal_sdk.entity.integration_entity import IntegrationEntity
    from composal_sdk.entity.interaction_response_entity import InteractionResponseEntity
    from composal_sdk.entity.invitation_entity import InvitationEntity
    from composal_sdk.entity.invocation_control_entity import InvocationControlEntity
    from composal_sdk.entity.job_log_chunk_entity import JobLogChunkEntity
    from composal_sdk.entity.job_step_entity import JobStepEntity
    from composal_sdk.entity.job_workspace_entity import JobWorkspaceEntity
    from composal_sdk.entity.journey_variant_replay_entity import JourneyVariantReplayEntity
    from composal_sdk.entity.knowledge_entity import KnowledgeEntity
    from composal_sdk.entity.known_entity import KnownEntity
    from composal_sdk.entity.label_entity import LabelEntity
    from composal_sdk.entity.lease_artifact_entity import LeaseArtifactEntity
    from composal_sdk.entity.lease_cache_entity import LeaseCacheEntity
    from composal_sdk.entity.lease_log_chunk_entity import LeaseLogChunkEntity
    from composal_sdk.entity.lease_reconciliation_entity import LeaseReconciliationEntity
    from composal_sdk.entity.lease_step_entity import LeaseStepEntity
    from composal_sdk.entity.lease_verify_diagnostic_entity import LeaseVerifyDiagnosticEntity
    from composal_sdk.entity.lease_verify_secret_entity import LeaseVerifySecretEntity
    from composal_sdk.entity.lease_workspace_entity import LeaseWorkspaceEntity
    from composal_sdk.entity.local_agent_decision_entity import LocalAgentDecisionEntity
    from composal_sdk.entity.local_agent_response_entity import LocalAgentResponseEntity
    from composal_sdk.entity.local_thread_delivery_entity import LocalThreadDeliveryEntity
    from composal_sdk.entity.local_thread_operation_entity import LocalThreadOperationEntity
    from composal_sdk.entity.location_entity import LocationEntity
    from composal_sdk.entity.log_stream_chunk_entity import LogStreamChunkEntity
    from composal_sdk.entity.logo_image_entity import LogoImageEntity
    from composal_sdk.entity.marketing_setting_entity import MarketingSettingEntity
    from composal_sdk.entity.mcp_oauth_entity import McpOauthEntity
    from composal_sdk.entity.me_entity import MeEntity
    from composal_sdk.entity.me_email_entity import MeEmailEntity
    from composal_sdk.entity.me_onboarding_entity import MeOnboardingEntity
    from composal_sdk.entity.media_file_entity import MediaFileEntity
    from composal_sdk.entity.member_entity import MemberEntity
    from composal_sdk.entity.memory_entity import MemoryEntity
    from composal_sdk.entity.merge_queue_entry_entity import MergeQueueEntryEntity
    from composal_sdk.entity.merge_request_entity import MergeRequestEntity
    from composal_sdk.entity.merge_resolution_entity import MergeResolutionEntity
    from composal_sdk.entity.messaging_conversation_message_entity import MessagingConversationMessageEntity
    from composal_sdk.entity.messaging_conversation_upload_entity import MessagingConversationUploadEntity
    from composal_sdk.entity.metric_query_entity import MetricQueryEntity
    from composal_sdk.entity.metronome_webhook_entity import MetronomeWebhookEntity
    from composal_sdk.entity.model_subscription_account_entity import ModelSubscriptionAccountEntity
    from composal_sdk.entity.model_subscription_account_connection_entity import ModelSubscriptionAccountConnectionEntity
    from composal_sdk.entity.network_connection_entity import NetworkConnectionEntity
    from composal_sdk.entity.networking_space_entity import NetworkingSpaceEntity
    from composal_sdk.entity.node_entity import NodeEntity
    from composal_sdk.entity.node_certificate_entity import NodeCertificateEntity
    from composal_sdk.entity.node_lease_entity import NodeLeaseEntity
    from composal_sdk.entity.nomad_allocation_entity import NomadAllocationEntity
    from composal_sdk.entity.nomad_log_entity import NomadLogEntity
    from composal_sdk.entity.now_entity import NowEntity
    from composal_sdk.entity.observability_clickhouse_cluster_entity import ObservabilityClickhouseClusterEntity
    from composal_sdk.entity.observability_quickwit_cluster_entity import ObservabilityQuickwitClusterEntity
    from composal_sdk.entity.observability_space_entity import ObservabilitySpaceEntity
    from composal_sdk.entity.openapi_entity import OpenapiEntity
    from composal_sdk.entity.org_invitation_entity import OrgInvitationEntity
    from composal_sdk.entity.organization_entity import OrganizationEntity
    from composal_sdk.entity.organization_app_entity import OrganizationAppEntity
    from composal_sdk.entity.organization_control_entity import OrganizationControlEntity
    from composal_sdk.entity.organization_device_entity import OrganizationDeviceEntity
    from composal_sdk.entity.organization_identity_certificate_entity import OrganizationIdentityCertificateEntity
    from composal_sdk.entity.organization_interaction_entity import OrganizationInteractionEntity
    from composal_sdk.entity.organization_invitation_entity import OrganizationInvitationEntity
    from composal_sdk.entity.organization_message_file_entity import OrganizationMessageFileEntity
    from composal_sdk.entity.organization_oidc_trust_entity import OrganizationOidcTrustEntity
    from composal_sdk.entity.organization_run_event_entity import OrganizationRunEventEntity
    from composal_sdk.entity.organization_run_outcome_entity import OrganizationRunOutcomeEntity
    from composal_sdk.entity.organization_run_usage_entity import OrganizationRunUsageEntity
    from composal_sdk.entity.organization_sandbox_entity import OrganizationSandboxEntity
    from composal_sdk.entity.organization_secret_entity import OrganizationSecretEntity
    from composal_sdk.entity.organization_service_account_entity import OrganizationServiceAccountEntity
    from composal_sdk.entity.organization_setting_entity import OrganizationSettingEntity
    from composal_sdk.entity.organization_site_entity import OrganizationSiteEntity
    from composal_sdk.entity.organization_subscription_entity import OrganizationSubscriptionEntity
    from composal_sdk.entity.organization_tool_entity import OrganizationToolEntity
    from composal_sdk.entity.organization_workload_identity_entity import OrganizationWorkloadIdentityEntity
    from composal_sdk.entity.otel_ingest_entity import OtelIngestEntity
    from composal_sdk.entity.page_entity import PageEntity
    from composal_sdk.entity.page_agent_entity import PageAgentEntity
    from composal_sdk.entity.page_artefact_entity import PageArtefactEntity
    from composal_sdk.entity.page_ci_pipeline_run_entity import PageCiPipelineRunEntity
    from composal_sdk.entity.page_project_run_entity import PageProjectRunEntity
    from composal_sdk.entity.page_repo_vc_commit_entity import PageRepoVcCommitEntity
    from composal_sdk.entity.pages_billing_entity import PagesBillingEntity
    from composal_sdk.entity.pages_github_onboarding_entity import PagesGithubOnboardingEntity
    from composal_sdk.entity.pages_member_entity import PagesMemberEntity
    from composal_sdk.entity.pages_project_credential_entity import PagesProjectCredentialEntity
    from composal_sdk.entity.pages_project_persona_entity import PagesProjectPersonaEntity
    from composal_sdk.entity.pages_project_run_entity import PagesProjectRunEntity
    from composal_sdk.entity.pages_project_scenario_entity import PagesProjectScenarioEntity
    from composal_sdk.entity.pages_registry_entity import PagesRegistryEntity
    from composal_sdk.entity.pages_session_entity import PagesSessionEntity
    from composal_sdk.entity.pairing_entity import PairingEntity
    from composal_sdk.entity.pairing_event_entity import PairingEventEntity
    from composal_sdk.entity.parallel_v1_entity import ParallelV1Entity
    from composal_sdk.entity.patchset_diff_entity import PatchsetDiffEntity
    from composal_sdk.entity.personal_access_token_entity import PersonalAccessTokenEntity
    from composal_sdk.entity.preview_operation_entity import PreviewOperationEntity
    from composal_sdk.entity.preview_profile_secret_binding_entity import PreviewProfileSecretBindingEntity
    from composal_sdk.entity.preview_secret_entity import PreviewSecretEntity
    from composal_sdk.entity.preview_sharing_approval_entity import PreviewSharingApprovalEntity
    from composal_sdk.entity.proactive_agent_waitlist_entry_entity import ProactiveAgentWaitlistEntryEntity
    from composal_sdk.entity.product_entity import ProductEntity
    from composal_sdk.entity.product_map_identity_decision_entity import ProductMapIdentityDecisionEntity
    from composal_sdk.entity.product_map_journey_entity import ProductMapJourneyEntity
    from composal_sdk.entity.product_map_journey_replay_entity import ProductMapJourneyReplayEntity
    from composal_sdk.entity.product_map_observation_entity import ProductMapObservationEntity
    from composal_sdk.entity.product_map_question_entity import ProductMapQuestionEntity
    from composal_sdk.entity.product_map_state_entity import ProductMapStateEntity
    from composal_sdk.entity.project_entity import ProjectEntity
    from composal_sdk.entity.project_android_apk_entity import ProjectAndroidApkEntity
    from composal_sdk.entity.project_code_map_entity import ProjectCodeMapEntity
    from composal_sdk.entity.project_environment_entity import ProjectEnvironmentEntity
    from composal_sdk.entity.project_finding_entity import ProjectFindingEntity
    from composal_sdk.entity.project_fixture_entity import ProjectFixtureEntity
    from composal_sdk.entity.project_ios_app_entity import ProjectIosAppEntity
    from composal_sdk.entity.project_messaging_conversation_entity import ProjectMessagingConversationEntity
    from composal_sdk.entity.project_overview_metric_entity import ProjectOverviewMetricEntity
    from composal_sdk.entity.project_overview_pull_request_entity import ProjectOverviewPullRequestEntity
    from composal_sdk.entity.project_product_map_entity import ProjectProductMapEntity
    from composal_sdk.entity.project_recording_entity import ProjectRecordingEntity
    from composal_sdk.entity.project_run_plan_entity import ProjectRunPlanEntity
    from composal_sdk.entity.project_run_schedule_entity import ProjectRunScheduleEntity
    from composal_sdk.entity.project_scenario_option_entity import ProjectScenarioOptionEntity
    from composal_sdk.entity.project_scenario_row_entity import ProjectScenarioRowEntity
    from composal_sdk.entity.project_setting_entity import ProjectSettingEntity
    from composal_sdk.entity.pull_request_entity import PullRequestEntity
    from composal_sdk.entity.pull_request_action_entity import PullRequestActionEntity
    from composal_sdk.entity.pull_request_magic_merge_entity import PullRequestMagicMergeEntity
    from composal_sdk.entity.pull_request_setting_entity import PullRequestSettingEntity
    from composal_sdk.entity.pull_request_setting_add_repository_entity import PullRequestSettingAddRepositoryEntity
    from composal_sdk.entity.pull_request_setting_detect_comment_entity import PullRequestSettingDetectCommentEntity
    from composal_sdk.entity.pull_request_transcript_entity import PullRequestTranscriptEntity
    from composal_sdk.entity.pull_zone_entity import PullZoneEntity
    from composal_sdk.entity.recorder_entity import RecorderEntity
    from composal_sdk.entity.registry_entity import RegistryEntity
    from composal_sdk.entity.registry_v2_entity import RegistryV2Entity
    from composal_sdk.entity.relay_agent_connection_entity import RelayAgentConnectionEntity
    from composal_sdk.entity.relay_agent_local_thread_entity import RelayAgentLocalThreadEntity
    from composal_sdk.entity.relay_signal_entity import RelaySignalEntity
    from composal_sdk.entity.release_rollout_entity import ReleaseRolloutEntity
    from composal_sdk.entity.repo_entity import RepoEntity
    from composal_sdk.entity.repo_access_token_entity import RepoAccessTokenEntity
    from composal_sdk.entity.repo_action_entity import RepoActionEntity
    from composal_sdk.entity.repo_agent_checkpoint_entity import RepoAgentCheckpointEntity
    from composal_sdk.entity.repo_agent_session_entity import RepoAgentSessionEntity
    from composal_sdk.entity.repo_bookmark_protection_entity import RepoBookmarkProtectionEntity
    from composal_sdk.entity.repo_bookmark_protection_event_entity import RepoBookmarkProtectionEventEntity
    from composal_sdk.entity.repo_cloud_workspace_backup_entity import RepoCloudWorkspaceBackupEntity
    from composal_sdk.entity.repo_code_rule_entity import RepoCodeRuleEntity
    from composal_sdk.entity.repo_setting_entity import RepoSettingEntity
    from composal_sdk.entity.repo_stat_entity import RepoStatEntity
    from composal_sdk.entity.repo_vc_entity import RepoVcEntity
    from composal_sdk.entity.repo_vc_commit_entity import RepoVcCommitEntity
    from composal_sdk.entity.report_replay_entity import ReportReplayEntity
    from composal_sdk.entity.report_scenario_entity import ReportScenarioEntity
    from composal_sdk.entity.repository_access_entity import RepositoryAccessEntity
    from composal_sdk.entity.repository_access_resolve_entity import RepositoryAccessResolveEntity
    from composal_sdk.entity.repository_event_entity import RepositoryEventEntity
    from composal_sdk.entity.repository_import_entity import RepositoryImportEntity
    from composal_sdk.entity.repository_import_session_entity import RepositoryImportSessionEntity
    from composal_sdk.entity.repository_import_session_repository_entity import RepositoryImportSessionRepositoryEntity
    from composal_sdk.entity.repository_import_session_selection_entity import RepositoryImportSessionSelectionEntity
    from composal_sdk.entity.repository_sandbox_environment_entity import RepositorySandboxEnvironmentEntity
    from composal_sdk.entity.roder_code_repair_entity import RoderCodeRepairEntity
    from composal_sdk.entity.roder_code_repair_setting_entity import RoderCodeRepairSettingEntity
    from composal_sdk.entity.roder_machine_entity import RoderMachineEntity
    from composal_sdk.entity.roder_run_entity import RoderRunEntity
    from composal_sdk.entity.roder_workspace_credential_entity import RoderWorkspaceCredentialEntity
    from composal_sdk.entity.run_artifact_entity import RunArtifactEntity
    from composal_sdk.entity.run_job_entity import RunJobEntity
    from composal_sdk.entity.run_scenario_run_entity import RunScenarioRunEntity
    from composal_sdk.entity.run_schedule_option_entity import RunScheduleOptionEntity
    from composal_sdk.entity.run_search_entity import RunSearchEntity
    from composal_sdk.entity.run_update_entity import RunUpdateEntity
    from composal_sdk.entity.run_workspace_credential_entity import RunWorkspaceCredentialEntity
    from composal_sdk.entity.runner_lease_entity import RunnerLeaseEntity
    from composal_sdk.entity.runner_pool_node_enrollment_token_entity import RunnerPoolNodeEnrollmentTokenEntity
    from composal_sdk.entity.runner_pool_runner_entity import RunnerPoolRunnerEntity
    from composal_sdk.entity.runtime_instance_health_snapshot_entity import RuntimeInstanceHealthSnapshotEntity
    from composal_sdk.entity.sandbox_integration_entity import SandboxIntegrationEntity
    from composal_sdk.entity.scenario_revision_entity import ScenarioRevisionEntity
    from composal_sdk.entity.scenario_run_lesson_entity import ScenarioRunLessonEntity
    from composal_sdk.entity.scenario_run_scenario_edit_entity import ScenarioRunScenarioEditEntity
    from composal_sdk.entity.secret_grant_entity import SecretGrantEntity
    from composal_sdk.entity.secret_version_entity import SecretVersionEntity
    from composal_sdk.entity.service_endpoint_entity import ServiceEndpointEntity
    from composal_sdk.entity.setting_entity import SettingEntity
    from composal_sdk.entity.setting_mutation_lease_entity import SettingMutationLeaseEntity
    from composal_sdk.entity.signal_entity import SignalEntity
    from composal_sdk.entity.signal_inbound_entity import SignalInboundEntity
    from composal_sdk.entity.signal_integration_entity import SignalIntegrationEntity
    from composal_sdk.entity.signal_integration_delivery_entity import SignalIntegrationDeliveryEntity
    from composal_sdk.entity.signal_integration_target_entity import SignalIntegrationTargetEntity
    from composal_sdk.entity.signal_subscription_entity import SignalSubscriptionEntity
    from composal_sdk.entity.site_entity import SiteEntity
    from composal_sdk.entity.site_access_key_entity import SiteAccessKeyEntity
    from composal_sdk.entity.site_preview_entity import SitePreviewEntity
    from composal_sdk.entity.site_secret_entity import SiteSecretEntity
    from composal_sdk.entity.slack_channel_entity import SlackChannelEntity
    from composal_sdk.entity.source_connection_entity import SourceConnectionEntity
    from composal_sdk.entity.space_alert_rule_entity import SpaceAlertRuleEntity
    from composal_sdk.entity.space_audit_event_entity import SpaceAuditEventEntity
    from composal_sdk.entity.space_dns_record_entity import SpaceDnsRecordEntity
    from composal_sdk.entity.space_enrollment_token_entity import SpaceEnrollmentTokenEntity
    from composal_sdk.entity.space_gateway_entity import SpaceGatewayEntity
    from composal_sdk.entity.space_group_entity import SpaceGroupEntity
    from composal_sdk.entity.space_group_membership_entity import SpaceGroupMembershipEntity
    from composal_sdk.entity.space_log_stream_entity import SpaceLogStreamEntity
    from composal_sdk.entity.space_metric_sery_entity import SpaceMetricSeryEntity
    from composal_sdk.entity.space_otel_collector_entity import SpaceOtelCollectorEntity
    from composal_sdk.entity.space_peer_entity import SpacePeerEntity
    from composal_sdk.entity.space_peer_attachment_entity import SpacePeerAttachmentEntity
    from composal_sdk.entity.space_policy_entity import SpacePolicyEntity
    from composal_sdk.entity.space_segment_entity import SpaceSegmentEntity
    from composal_sdk.entity.space_trace_span_entity import SpaceTraceSpanEntity
    from composal_sdk.entity.spark_entity import SparkEntity
    from composal_sdk.entity.spark_agent_integration_entity import SparkAgentIntegrationEntity
    from composal_sdk.entity.spark_agent_local_thread_entity import SparkAgentLocalThreadEntity
    from composal_sdk.entity.spark_agent_site_entity import SparkAgentSiteEntity
    from composal_sdk.entity.spark_agent_skill_entity import SparkAgentSkillEntity
    from composal_sdk.entity.spark_agent_thread_entity import SparkAgentThreadEntity
    from composal_sdk.entity.spark_credit_entity import SparkCreditEntity
    from composal_sdk.entity.spark_credit_agent_usage_entity import SparkCreditAgentUsageEntity
    from composal_sdk.entity.spark_credit_usage_total_entity import SparkCreditUsageTotalEntity
    from composal_sdk.entity.static_site_entity import StaticSiteEntity
    from composal_sdk.entity.static_site_deployment_entity import StaticSiteDeploymentEntity
    from composal_sdk.entity.static_site_domain_entity import StaticSiteDomainEntity
    from composal_sdk.entity.status_change_entity import StatusChangeEntity
    from composal_sdk.entity.status_commit_entity import StatusCommitEntity
    from composal_sdk.entity.status_patchset_entity import StatusPatchsetEntity
    from composal_sdk.entity.stripe_webhook_entity import StripeWebhookEntity
    from composal_sdk.entity.submit_telemetry_entity import SubmitTelemetryEntity
    from composal_sdk.entity.subscription_model_entity import SubscriptionModelEntity
    from composal_sdk.entity.swarm_event_entity import SwarmEventEntity
    from composal_sdk.entity.swarm_live_entity import SwarmLiveEntity
    from composal_sdk.entity.swarm_note_entity import SwarmNoteEntity
    from composal_sdk.entity.swarm_task_entity import SwarmTaskEntity
    from composal_sdk.entity.task_lease_entity import TaskLeaseEntity
    from composal_sdk.entity.thread_preview_entity import ThreadPreviewEntity
    from composal_sdk.entity.thread_preview_access_entity import ThreadPreviewAccessEntity
    from composal_sdk.entity.tool_feedback_entity import ToolFeedbackEntity
    from composal_sdk.entity.transcript_entity import TranscriptEntity
    from composal_sdk.entity.v1_message_entity import V1MessageEntity
    from composal_sdk.entity.vc_branch_entity import VcBranchEntity
    from composal_sdk.entity.vc_browser_entity import VcBrowserEntity
    from composal_sdk.entity.vc_change_entity import VcChangeEntity
    from composal_sdk.entity.vc_change_group_entity import VcChangeGroupEntity
    from composal_sdk.entity.vc_file_entity import VcFileEntity
    from composal_sdk.entity.vc_merge_queue_entity import VcMergeQueueEntity
    from composal_sdk.entity.vc_stack_entity import VcStackEntity
    from composal_sdk.entity.vcs_node_entity import VcsNodeEntity
    from composal_sdk.entity.vcs_setting_entity import VcsSettingEntity
    from composal_sdk.entity.verification_project_credential_entity import VerificationProjectCredentialEntity
    from composal_sdk.entity.verification_project_persona_entity import VerificationProjectPersonaEntity
    from composal_sdk.entity.verification_project_run_entity import VerificationProjectRunEntity
    from composal_sdk.entity.verification_project_scenario_entity import VerificationProjectScenarioEntity
    from composal_sdk.entity.verify_app_domain_entity import VerifyAppDomainEntity
    from composal_sdk.entity.verify_browser_session_entity import VerifyBrowserSessionEntity
    from composal_sdk.entity.verify_email_verification_entity import VerifyEmailVerificationEntity
    from composal_sdk.entity.verify_signal_integration_entity import VerifySignalIntegrationEntity
    from composal_sdk.entity.verify_static_site_domain_entity import VerifyStaticSiteDomainEntity
    from composal_sdk.entity.version_log_entity import VersionLogEntity
    from composal_sdk.entity.waitlist_application_entity import WaitlistApplicationEntity
    from composal_sdk.entity.web_bot_auth_entity import WebBotAuthEntity
    from composal_sdk.entity.webhook_gitlab_entity import WebhookGitlabEntity
    from composal_sdk.entity.workflow_run_step_entity import WorkflowRunStepEntity
    from composal_sdk.entity.workflow_run_stop_notice_entity import WorkflowRunStopNoticeEntity
    from composal_sdk.entity.workflow_trigger_skipped_entity import WorkflowTriggerSkippedEntity
    from composal_sdk.entity.workspace_activity_entity import WorkspaceActivityEntity
    from composal_sdk.entity.workspace_activity_notification_entity import WorkspaceActivityNotificationEntity
    from composal_sdk.entity.workspace_space_entity import WorkspaceSpaceEntity
    from composal_sdk.entity.workspace_space_preference_entity import WorkspaceSpacePreferenceEntity
