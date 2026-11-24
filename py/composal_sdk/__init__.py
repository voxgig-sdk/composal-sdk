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


    def Agent(self, data=None) -> "AgentEntity":
        """Entity factory: client.Agent().list() / client.Agent().load({"id": ...})."""
        from composal_sdk.entity.agent_entity import AgentEntity
        return AgentEntity(self, data)


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


    def AgentRepository(self, data=None) -> "AgentRepositoryEntity":
        """Entity factory: client.AgentRepository().list() / client.AgentRepository().load({"id": ...})."""
        from composal_sdk.entity.agent_repository_entity import AgentRepositoryEntity
        return AgentRepositoryEntity(self, data)


    def AgentResource(self, data=None) -> "AgentResourceEntity":
        """Entity factory: client.AgentResource().list() / client.AgentResource().load({"id": ...})."""
        from composal_sdk.entity.agent_resource_entity import AgentResourceEntity
        return AgentResourceEntity(self, data)


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


    def AgentVerifyProject(self, data=None) -> "AgentVerifyProjectEntity":
        """Entity factory: client.AgentVerifyProject().list() / client.AgentVerifyProject().load({"id": ...})."""
        from composal_sdk.entity.agent_verify_project_entity import AgentVerifyProjectEntity
        return AgentVerifyProjectEntity(self, data)


    def AgentWait(self, data=None) -> "AgentWaitEntity":
        """Entity factory: client.AgentWait().list() / client.AgentWait().load({"id": ...})."""
        from composal_sdk.entity.agent_wait_entity import AgentWaitEntity
        return AgentWaitEntity(self, data)


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


    def AllocationLog(self, data=None) -> "AllocationLogEntity":
        """Entity factory: client.AllocationLog().list() / client.AllocationLog().load({"id": ...})."""
        from composal_sdk.entity.allocation_log_entity import AllocationLogEntity
        return AllocationLogEntity(self, data)


    def App(self, data=None) -> "AppEntity":
        """Entity factory: client.App().list() / client.App().load({"id": ...})."""
        from composal_sdk.entity.app_entity import AppEntity
        return AppEntity(self, data)


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


    def AttachmentPart(self, data=None) -> "AttachmentPartEntity":
        """Entity factory: client.AttachmentPart().list() / client.AttachmentPart().load({"id": ...})."""
        from composal_sdk.entity.attachment_part_entity import AttachmentPartEntity
        return AttachmentPartEntity(self, data)


    def AutomationEvent(self, data=None) -> "AutomationEventEntity":
        """Entity factory: client.AutomationEvent().list() / client.AutomationEvent().load({"id": ...})."""
        from composal_sdk.entity.automation_event_entity import AutomationEventEntity
        return AutomationEventEntity(self, data)


    def AutomationRun(self, data=None) -> "AutomationRunEntity":
        """Entity factory: client.AutomationRun().list() / client.AutomationRun().load({"id": ...})."""
        from composal_sdk.entity.automation_run_entity import AutomationRunEntity
        return AutomationRunEntity(self, data)


    def Binary(self, data=None) -> "BinaryEntity":
        """Entity factory: client.Binary().list() / client.Binary().load({"id": ...})."""
        from composal_sdk.entity.binary_entity import BinaryEntity
        return BinaryEntity(self, data)


    def BinaryVersion(self, data=None) -> "BinaryVersionEntity":
        """Entity factory: client.BinaryVersion().list() / client.BinaryVersion().load({"id": ...})."""
        from composal_sdk.entity.binary_version_entity import BinaryVersionEntity
        return BinaryVersionEntity(self, data)


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


    def ConnectionRequest(self, data=None) -> "ConnectionRequestEntity":
        """Entity factory: client.ConnectionRequest().list() / client.ConnectionRequest().load({"id": ...})."""
        from composal_sdk.entity.connection_request_entity import ConnectionRequestEntity
        return ConnectionRequestEntity(self, data)


    def ConnectionSource(self, data=None) -> "ConnectionSourceEntity":
        """Entity factory: client.ConnectionSource().list() / client.ConnectionSource().load({"id": ...})."""
        from composal_sdk.entity.connection_source_entity import ConnectionSourceEntity
        return ConnectionSourceEntity(self, data)


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


    def DeploymentDashboardNomad(self, data=None) -> "DeploymentDashboardNomadEntity":
        """Entity factory: client.DeploymentDashboardNomad().list() / client.DeploymentDashboardNomad().load({"id": ...})."""
        from composal_sdk.entity.deployment_dashboard_nomad_entity import DeploymentDashboardNomadEntity
        return DeploymentDashboardNomadEntity(self, data)


    def DeploymentFile(self, data=None) -> "DeploymentFileEntity":
        """Entity factory: client.DeploymentFile().list() / client.DeploymentFile().load({"id": ...})."""
        from composal_sdk.entity.deployment_file_entity import DeploymentFileEntity
        return DeploymentFileEntity(self, data)


    def DomainPathRule(self, data=None) -> "DomainPathRuleEntity":
        """Entity factory: client.DomainPathRule().list() / client.DomainPathRule().load({"id": ...})."""
        from composal_sdk.entity.domain_path_rule_entity import DomainPathRuleEntity
        return DomainPathRuleEntity(self, data)


    def Dream(self, data=None) -> "DreamEntity":
        """Entity factory: client.Dream().list() / client.Dream().load({"id": ...})."""
        from composal_sdk.entity.dream_entity import DreamEntity
        return DreamEntity(self, data)


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


    def GithubConnection(self, data=None) -> "GithubConnectionEntity":
        """Entity factory: client.GithubConnection().list() / client.GithubConnection().load({"id": ...})."""
        from composal_sdk.entity.github_connection_entity import GithubConnectionEntity
        return GithubConnectionEntity(self, data)


    def HostingAppDomain(self, data=None) -> "HostingAppDomainEntity":
        """Entity factory: client.HostingAppDomain().list() / client.HostingAppDomain().load({"id": ...})."""
        from composal_sdk.entity.hosting_app_domain_entity import HostingAppDomainEntity
        return HostingAppDomainEntity(self, data)


    def ImageRepository(self, data=None) -> "ImageRepositoryEntity":
        """Entity factory: client.ImageRepository().list() / client.ImageRepository().load({"id": ...})."""
        from composal_sdk.entity.image_repository_entity import ImageRepositoryEntity
        return ImageRepositoryEntity(self, data)


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


    def JourneyVariantReplay(self, data=None) -> "JourneyVariantReplayEntity":
        """Entity factory: client.JourneyVariantReplay().list() / client.JourneyVariantReplay().load({"id": ...})."""
        from composal_sdk.entity.journey_variant_replay_entity import JourneyVariantReplayEntity
        return JourneyVariantReplayEntity(self, data)


    def Knowledge(self, data=None) -> "KnowledgeEntity":
        """Entity factory: client.Knowledge().list() / client.Knowledge().load({"id": ...})."""
        from composal_sdk.entity.knowledge_entity import KnowledgeEntity
        return KnowledgeEntity(self, data)


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


    def MergeRequest(self, data=None) -> "MergeRequestEntity":
        """Entity factory: client.MergeRequest().list() / client.MergeRequest().load({"id": ...})."""
        from composal_sdk.entity.merge_request_entity import MergeRequestEntity
        return MergeRequestEntity(self, data)


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


    def NetworkConnection(self, data=None) -> "NetworkConnectionEntity":
        """Entity factory: client.NetworkConnection().list() / client.NetworkConnection().load({"id": ...})."""
        from composal_sdk.entity.network_connection_entity import NetworkConnectionEntity
        return NetworkConnectionEntity(self, data)


    def NomadAllocation(self, data=None) -> "NomadAllocationEntity":
        """Entity factory: client.NomadAllocation().list() / client.NomadAllocation().load({"id": ...})."""
        from composal_sdk.entity.nomad_allocation_entity import NomadAllocationEntity
        return NomadAllocationEntity(self, data)


    def NomadLog(self, data=None) -> "NomadLogEntity":
        """Entity factory: client.NomadLog().list() / client.NomadLog().load({"id": ...})."""
        from composal_sdk.entity.nomad_log_entity import NomadLogEntity
        return NomadLogEntity(self, data)


    def Organization(self, data=None) -> "OrganizationEntity":
        """Entity factory: client.Organization().list() / client.Organization().load({"id": ...})."""
        from composal_sdk.entity.organization_entity import OrganizationEntity
        return OrganizationEntity(self, data)


    def Page(self, data=None) -> "PageEntity":
        """Entity factory: client.Page().list() / client.Page().load({"id": ...})."""
        from composal_sdk.entity.page_entity import PageEntity
        return PageEntity(self, data)


    def PageAgent(self, data=None) -> "PageAgentEntity":
        """Entity factory: client.PageAgent().list() / client.PageAgent().load({"id": ...})."""
        from composal_sdk.entity.page_agent_entity import PageAgentEntity
        return PageAgentEntity(self, data)


    def PageProjectRun(self, data=None) -> "PageProjectRunEntity":
        """Entity factory: client.PageProjectRun().list() / client.PageProjectRun().load({"id": ...})."""
        from composal_sdk.entity.page_project_run_entity import PageProjectRunEntity
        return PageProjectRunEntity(self, data)


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


    def RelayAgentLocalThread(self, data=None) -> "RelayAgentLocalThreadEntity":
        """Entity factory: client.RelayAgentLocalThread().list() / client.RelayAgentLocalThread().load({"id": ...})."""
        from composal_sdk.entity.relay_agent_local_thread_entity import RelayAgentLocalThreadEntity
        return RelayAgentLocalThreadEntity(self, data)


    def ReportReplay(self, data=None) -> "ReportReplayEntity":
        """Entity factory: client.ReportReplay().list() / client.ReportReplay().load({"id": ...})."""
        from composal_sdk.entity.report_replay_entity import ReportReplayEntity
        return ReportReplayEntity(self, data)


    def ReportScenario(self, data=None) -> "ReportScenarioEntity":
        """Entity factory: client.ReportScenario().list() / client.ReportScenario().load({"id": ...})."""
        from composal_sdk.entity.report_scenario_entity import ReportScenarioEntity
        return ReportScenarioEntity(self, data)


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


    def ServiceEndpoint(self, data=None) -> "ServiceEndpointEntity":
        """Entity factory: client.ServiceEndpoint().list() / client.ServiceEndpoint().load({"id": ...})."""
        from composal_sdk.entity.service_endpoint_entity import ServiceEndpointEntity
        return ServiceEndpointEntity(self, data)


    def SitePreview(self, data=None) -> "SitePreviewEntity":
        """Entity factory: client.SitePreview().list() / client.SitePreview().load({"id": ...})."""
        from composal_sdk.entity.site_preview_entity import SitePreviewEntity
        return SitePreviewEntity(self, data)


    def SlackChannel(self, data=None) -> "SlackChannelEntity":
        """Entity factory: client.SlackChannel().list() / client.SlackChannel().load({"id": ...})."""
        from composal_sdk.entity.slack_channel_entity import SlackChannelEntity
        return SlackChannelEntity(self, data)


    def SparkAgentLocalThread(self, data=None) -> "SparkAgentLocalThreadEntity":
        """Entity factory: client.SparkAgentLocalThread().list() / client.SparkAgentLocalThread().load({"id": ...})."""
        from composal_sdk.entity.spark_agent_local_thread_entity import SparkAgentLocalThreadEntity
        return SparkAgentLocalThreadEntity(self, data)


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


    def SubscriptionModel(self, data=None) -> "SubscriptionModelEntity":
        """Entity factory: client.SubscriptionModel().list() / client.SubscriptionModel().load({"id": ...})."""
        from composal_sdk.entity.subscription_model_entity import SubscriptionModelEntity
        return SubscriptionModelEntity(self, data)


    def ThreadPreview(self, data=None) -> "ThreadPreviewEntity":
        """Entity factory: client.ThreadPreview().list() / client.ThreadPreview().load({"id": ...})."""
        from composal_sdk.entity.thread_preview_entity import ThreadPreviewEntity
        return ThreadPreviewEntity(self, data)


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


    def VerifyStaticSiteDomain(self, data=None) -> "VerifyStaticSiteDomainEntity":
        """Entity factory: client.VerifyStaticSiteDomain().list() / client.VerifyStaticSiteDomain().load({"id": ...})."""
        from composal_sdk.entity.verify_static_site_domain_entity import VerifyStaticSiteDomainEntity
        return VerifyStaticSiteDomainEntity(self, data)


    def VersionLog(self, data=None) -> "VersionLogEntity":
        """Entity factory: client.VersionLog().list() / client.VersionLog().load({"id": ...})."""
        from composal_sdk.entity.version_log_entity import VersionLogEntity
        return VersionLogEntity(self, data)


    def WebBotAuth(self, data=None) -> "WebBotAuthEntity":
        """Entity factory: client.WebBotAuth().list() / client.WebBotAuth().load({"id": ...})."""
        from composal_sdk.entity.web_bot_auth_entity import WebBotAuthEntity
        return WebBotAuthEntity(self, data)


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
    from composal_sdk.entity.agent_entity import AgentEntity
    from composal_sdk.entity.agent_attachment_entity import AgentAttachmentEntity
    from composal_sdk.entity.agent_automation_entity import AgentAutomationEntity
    from composal_sdk.entity.agent_avatar_entity import AgentAvatarEntity
    from composal_sdk.entity.agent_command_entity import AgentCommandEntity
    from composal_sdk.entity.agent_computer_entity import AgentComputerEntity
    from composal_sdk.entity.agent_connection_entity import AgentConnectionEntity
    from composal_sdk.entity.agent_control_flow_entity import AgentControlFlowEntity
    from composal_sdk.entity.agent_coordination_entity import AgentCoordinationEntity
    from composal_sdk.entity.agent_email_entity import AgentEmailEntity
    from composal_sdk.entity.agent_file_entity import AgentFileEntity
    from composal_sdk.entity.agent_input_entity import AgentInputEntity
    from composal_sdk.entity.agent_integration_entity import AgentIntegrationEntity
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
    from composal_sdk.entity.agent_repository_entity import AgentRepositoryEntity
    from composal_sdk.entity.agent_resource_entity import AgentResourceEntity
    from composal_sdk.entity.agent_routine_entity import AgentRoutineEntity
    from composal_sdk.entity.agent_run_entity import AgentRunEntity
    from composal_sdk.entity.agent_runtime_entity import AgentRuntimeEntity
    from composal_sdk.entity.agent_setting_entity import AgentSettingEntity
    from composal_sdk.entity.agent_sharing_entity import AgentSharingEntity
    from composal_sdk.entity.agent_site_entity import AgentSiteEntity
    from composal_sdk.entity.agent_skill_entity import AgentSkillEntity
    from composal_sdk.entity.agent_slack_entity import AgentSlackEntity
    from composal_sdk.entity.agent_subagent_entity import AgentSubagentEntity
    from composal_sdk.entity.agent_subscription_entity import AgentSubscriptionEntity
    from composal_sdk.entity.agent_teammate_entity import AgentTeammateEntity
    from composal_sdk.entity.agent_terminal_entity import AgentTerminalEntity
    from composal_sdk.entity.agent_thread_entity import AgentThreadEntity
    from composal_sdk.entity.agent_tool_entity import AgentToolEntity
    from composal_sdk.entity.agent_verify_project_entity import AgentVerifyProjectEntity
    from composal_sdk.entity.agent_wait_entity import AgentWaitEntity
    from composal_sdk.entity.agent_webhook_entity import AgentWebhookEntity
    from composal_sdk.entity.agent_work_entity import AgentWorkEntity
    from composal_sdk.entity.agent_workflow_entity import AgentWorkflowEntity
    from composal_sdk.entity.agent_workflow_proposal_entity import AgentWorkflowProposalEntity
    from composal_sdk.entity.agent_workflow_run_entity import AgentWorkflowRunEntity
    from composal_sdk.entity.agent_workflow_trigger_entity import AgentWorkflowTriggerEntity
    from composal_sdk.entity.agent_workspace_entity import AgentWorkspaceEntity
    from composal_sdk.entity.agent_write_permission_entity import AgentWritePermissionEntity
    from composal_sdk.entity.allocation_log_entity import AllocationLogEntity
    from composal_sdk.entity.app_entity import AppEntity
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
    from composal_sdk.entity.attachment_part_entity import AttachmentPartEntity
    from composal_sdk.entity.automation_event_entity import AutomationEventEntity
    from composal_sdk.entity.automation_run_entity import AutomationRunEntity
    from composal_sdk.entity.binary_entity import BinaryEntity
    from composal_sdk.entity.binary_version_entity import BinaryVersionEntity
    from composal_sdk.entity.browser_egress_candidate_entity import BrowserEgressCandidateEntity
    from composal_sdk.entity.browser_session_entity import BrowserSessionEntity
    from composal_sdk.entity.browser_session_connection_entity import BrowserSessionConnectionEntity
    from composal_sdk.entity.browser_session_control_entity import BrowserSessionControlEntity
    from composal_sdk.entity.browser_session_event_entity import BrowserSessionEventEntity
    from composal_sdk.entity.browser_session_media_entity import BrowserSessionMediaEntity
    from composal_sdk.entity.browser_session_recording_entity import BrowserSessionRecordingEntity
    from composal_sdk.entity.browser_session_screenshot_entity import BrowserSessionScreenshotEntity
    from composal_sdk.entity.browser_session_task_entity import BrowserSessionTaskEntity
    from composal_sdk.entity.catalog_selector_entity import CatalogSelectorEntity
    from composal_sdk.entity.cdn_deployment_entity import CdnDeploymentEntity
    from composal_sdk.entity.cdn_hostname_entity import CdnHostnameEntity
    from composal_sdk.entity.cdn_space_entity import CdnSpaceEntity
    from composal_sdk.entity.cdn_space_object_entity import CdnSpaceObjectEntity
    from composal_sdk.entity.connection_request_entity import ConnectionRequestEntity
    from composal_sdk.entity.connection_source_entity import ConnectionSourceEntity
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
    from composal_sdk.entity.deployment_dashboard_nomad_entity import DeploymentDashboardNomadEntity
    from composal_sdk.entity.deployment_file_entity import DeploymentFileEntity
    from composal_sdk.entity.domain_path_rule_entity import DomainPathRuleEntity
    from composal_sdk.entity.dream_entity import DreamEntity
    from composal_sdk.entity.environment_entity import EnvironmentEntity
    from composal_sdk.entity.environment_discovery_run_entity import EnvironmentDiscoveryRunEntity
    from composal_sdk.entity.environment_exploration_entity import EnvironmentExplorationEntity
    from composal_sdk.entity.environment_first_run_entity import EnvironmentFirstRunEntity
    from composal_sdk.entity.environment_revision_entity import EnvironmentRevisionEntity
    from composal_sdk.entity.environment_secret_binding_entity import EnvironmentSecretBindingEntity
    from composal_sdk.entity.environment_test_account_entity import EnvironmentTestAccountEntity
    from composal_sdk.entity.evidence_entity import EvidenceEntity
    from composal_sdk.entity.exploration_entity import ExplorationEntity
    from composal_sdk.entity.exploration_message_entity import ExplorationMessageEntity
    from composal_sdk.entity.exploration_report_entity import ExplorationReportEntity
    from composal_sdk.entity.exploration_scenario_entity import ExplorationScenarioEntity
    from composal_sdk.entity.finding_entity import FindingEntity
    from composal_sdk.entity.github_connection_entity import GithubConnectionEntity
    from composal_sdk.entity.hosting_app_domain_entity import HostingAppDomainEntity
    from composal_sdk.entity.image_repository_entity import ImageRepositoryEntity
    from composal_sdk.entity.integration_entity import IntegrationEntity
    from composal_sdk.entity.interaction_response_entity import InteractionResponseEntity
    from composal_sdk.entity.invitation_entity import InvitationEntity
    from composal_sdk.entity.journey_variant_replay_entity import JourneyVariantReplayEntity
    from composal_sdk.entity.knowledge_entity import KnowledgeEntity
    from composal_sdk.entity.local_thread_delivery_entity import LocalThreadDeliveryEntity
    from composal_sdk.entity.local_thread_operation_entity import LocalThreadOperationEntity
    from composal_sdk.entity.location_entity import LocationEntity
    from composal_sdk.entity.me_entity import MeEntity
    from composal_sdk.entity.me_email_entity import MeEmailEntity
    from composal_sdk.entity.me_onboarding_entity import MeOnboardingEntity
    from composal_sdk.entity.media_file_entity import MediaFileEntity
    from composal_sdk.entity.member_entity import MemberEntity
    from composal_sdk.entity.memory_entity import MemoryEntity
    from composal_sdk.entity.merge_request_entity import MergeRequestEntity
    from composal_sdk.entity.messaging_conversation_message_entity import MessagingConversationMessageEntity
    from composal_sdk.entity.messaging_conversation_upload_entity import MessagingConversationUploadEntity
    from composal_sdk.entity.metric_query_entity import MetricQueryEntity
    from composal_sdk.entity.network_connection_entity import NetworkConnectionEntity
    from composal_sdk.entity.nomad_allocation_entity import NomadAllocationEntity
    from composal_sdk.entity.nomad_log_entity import NomadLogEntity
    from composal_sdk.entity.organization_entity import OrganizationEntity
    from composal_sdk.entity.page_entity import PageEntity
    from composal_sdk.entity.page_agent_entity import PageAgentEntity
    from composal_sdk.entity.page_project_run_entity import PageProjectRunEntity
    from composal_sdk.entity.pages_project_credential_entity import PagesProjectCredentialEntity
    from composal_sdk.entity.pages_project_persona_entity import PagesProjectPersonaEntity
    from composal_sdk.entity.pages_project_run_entity import PagesProjectRunEntity
    from composal_sdk.entity.pages_project_scenario_entity import PagesProjectScenarioEntity
    from composal_sdk.entity.personal_access_token_entity import PersonalAccessTokenEntity
    from composal_sdk.entity.preview_operation_entity import PreviewOperationEntity
    from composal_sdk.entity.preview_profile_secret_binding_entity import PreviewProfileSecretBindingEntity
    from composal_sdk.entity.preview_secret_entity import PreviewSecretEntity
    from composal_sdk.entity.preview_sharing_approval_entity import PreviewSharingApprovalEntity
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
    from composal_sdk.entity.pull_request_setting_entity import PullRequestSettingEntity
    from composal_sdk.entity.pull_request_setting_add_repository_entity import PullRequestSettingAddRepositoryEntity
    from composal_sdk.entity.pull_request_setting_detect_comment_entity import PullRequestSettingDetectCommentEntity
    from composal_sdk.entity.recorder_entity import RecorderEntity
    from composal_sdk.entity.registry_entity import RegistryEntity
    from composal_sdk.entity.registry_v2_entity import RegistryV2Entity
    from composal_sdk.entity.relay_agent_local_thread_entity import RelayAgentLocalThreadEntity
    from composal_sdk.entity.report_replay_entity import ReportReplayEntity
    from composal_sdk.entity.report_scenario_entity import ReportScenarioEntity
    from composal_sdk.entity.run_scenario_run_entity import RunScenarioRunEntity
    from composal_sdk.entity.run_schedule_option_entity import RunScheduleOptionEntity
    from composal_sdk.entity.run_search_entity import RunSearchEntity
    from composal_sdk.entity.run_update_entity import RunUpdateEntity
    from composal_sdk.entity.scenario_revision_entity import ScenarioRevisionEntity
    from composal_sdk.entity.scenario_run_lesson_entity import ScenarioRunLessonEntity
    from composal_sdk.entity.scenario_run_scenario_edit_entity import ScenarioRunScenarioEditEntity
    from composal_sdk.entity.service_endpoint_entity import ServiceEndpointEntity
    from composal_sdk.entity.site_preview_entity import SitePreviewEntity
    from composal_sdk.entity.slack_channel_entity import SlackChannelEntity
    from composal_sdk.entity.spark_agent_local_thread_entity import SparkAgentLocalThreadEntity
    from composal_sdk.entity.static_site_entity import StaticSiteEntity
    from composal_sdk.entity.static_site_deployment_entity import StaticSiteDeploymentEntity
    from composal_sdk.entity.static_site_domain_entity import StaticSiteDomainEntity
    from composal_sdk.entity.subscription_model_entity import SubscriptionModelEntity
    from composal_sdk.entity.thread_preview_entity import ThreadPreviewEntity
    from composal_sdk.entity.verification_project_credential_entity import VerificationProjectCredentialEntity
    from composal_sdk.entity.verification_project_persona_entity import VerificationProjectPersonaEntity
    from composal_sdk.entity.verification_project_run_entity import VerificationProjectRunEntity
    from composal_sdk.entity.verification_project_scenario_entity import VerificationProjectScenarioEntity
    from composal_sdk.entity.verify_app_domain_entity import VerifyAppDomainEntity
    from composal_sdk.entity.verify_browser_session_entity import VerifyBrowserSessionEntity
    from composal_sdk.entity.verify_static_site_domain_entity import VerifyStaticSiteDomainEntity
    from composal_sdk.entity.version_log_entity import VersionLogEntity
    from composal_sdk.entity.web_bot_auth_entity import WebBotAuthEntity
    from composal_sdk.entity.workflow_run_step_entity import WorkflowRunStepEntity
    from composal_sdk.entity.workflow_run_stop_notice_entity import WorkflowRunStopNoticeEntity
    from composal_sdk.entity.workflow_trigger_skipped_entity import WorkflowTriggerSkippedEntity
