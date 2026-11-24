# Composal SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Composal_types'


class ComposalSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = ComposalUtility.new
    @_utility = utility

    config = ComposalConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = ComposalHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = ComposalHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, ComposalFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    ComposalUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  # The options and the root context both hold the credential, so the
  # client's printed form is its name alone; `options_map` is the
  # documented way to read them back.
  def to_s
    "Composal " + VoxgigStruct.jsonify({ "name" => "Composal" })
  end

  def inspect
    to_s
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = ComposalHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String) && "" != method_val
    method_val = method_val.upcase
    allow_method = VoxgigStruct.getpath(opts, "allow.method")
    unless ComposalUtilities.allowed(allow_method, method_val)
      raise ctx.make_error("spec_method_allow",
        "Method \"#{method_val}\" not allowed by SDK option allow.method value: \"#{allow_method}\"")
    end
    params = ComposalHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = ComposalHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = ComposalSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    # A raw request has no point to declare its response type, so it asks
    # for the JSON it reads: an API that negotiates on Accept otherwise
    # answers in its own default format. A caller's own accept wins.
    unless ctx.spec.headers.keys.any? { |k| k.to_s.downcase == "accept" }
      ctx.spec.headers["accept"] = "application/json"
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    ComposalUtilities.allowed(VoxgigStruct.getpath(@options, "allow.op"), op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => ComposalError.new(
        "ComposalSDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\"",
        code: "#{op}_allow"),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue ComposalError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = ComposalHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => utility.clean.call(ctx, fetch_err) } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = ComposalHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      body_err = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
        if true == VoxgigStruct.getprop(fetched, "unreadable")
          failed = status >= 200 && status < 300 ? nil : ctx.make_error("request_status",
            "request: #{status}: #{VoxgigStruct.getprop(fetched, 'statusText')}")
          body_err = ComposalUtilities::UnreadableBody.call(ctx, status, headers,
            VoxgigStruct.getprop(fetched, "body"), fetchdef["headers"], failed)
        end
      end

      out = {
        "ok" => body_err.nil? && status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
      out["err"] = utility.clean.call(ctx, body_err) unless body_err.nil?
      return out
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = ComposalError.new(
        "ComposalSDK: graphql: #{msg}", code: "graphql_error")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.Agent.list / client.Agent.load({ "id" => ... })
  def Agent(data = nil)
    require_relative 'entity/agent_entity'
    AgentEntity.new(self, data)
  end


  # Canonical facade: client.AgentAttachment.list / client.AgentAttachment.load({ "id" => ... })
  def AgentAttachment(data = nil)
    require_relative 'entity/agent_attachment_entity'
    AgentAttachmentEntity.new(self, data)
  end


  # Canonical facade: client.AgentAutomation.list / client.AgentAutomation.load({ "id" => ... })
  def AgentAutomation(data = nil)
    require_relative 'entity/agent_automation_entity'
    AgentAutomationEntity.new(self, data)
  end


  # Canonical facade: client.AgentAvatar.list / client.AgentAvatar.load({ "id" => ... })
  def AgentAvatar(data = nil)
    require_relative 'entity/agent_avatar_entity'
    AgentAvatarEntity.new(self, data)
  end


  # Canonical facade: client.AgentCommand.list / client.AgentCommand.load({ "id" => ... })
  def AgentCommand(data = nil)
    require_relative 'entity/agent_command_entity'
    AgentCommandEntity.new(self, data)
  end


  # Canonical facade: client.AgentComputer.list / client.AgentComputer.load({ "id" => ... })
  def AgentComputer(data = nil)
    require_relative 'entity/agent_computer_entity'
    AgentComputerEntity.new(self, data)
  end


  # Canonical facade: client.AgentConnection.list / client.AgentConnection.load({ "id" => ... })
  def AgentConnection(data = nil)
    require_relative 'entity/agent_connection_entity'
    AgentConnectionEntity.new(self, data)
  end


  # Canonical facade: client.AgentControlFlow.list / client.AgentControlFlow.load({ "id" => ... })
  def AgentControlFlow(data = nil)
    require_relative 'entity/agent_control_flow_entity'
    AgentControlFlowEntity.new(self, data)
  end


  # Canonical facade: client.AgentCoordination.list / client.AgentCoordination.load({ "id" => ... })
  def AgentCoordination(data = nil)
    require_relative 'entity/agent_coordination_entity'
    AgentCoordinationEntity.new(self, data)
  end


  # Canonical facade: client.AgentEmail.list / client.AgentEmail.load({ "id" => ... })
  def AgentEmail(data = nil)
    require_relative 'entity/agent_email_entity'
    AgentEmailEntity.new(self, data)
  end


  # Canonical facade: client.AgentFile.list / client.AgentFile.load({ "id" => ... })
  def AgentFile(data = nil)
    require_relative 'entity/agent_file_entity'
    AgentFileEntity.new(self, data)
  end


  # Canonical facade: client.AgentInput.list / client.AgentInput.load({ "id" => ... })
  def AgentInput(data = nil)
    require_relative 'entity/agent_input_entity'
    AgentInputEntity.new(self, data)
  end


  # Canonical facade: client.AgentIntegration.list / client.AgentIntegration.load({ "id" => ... })
  def AgentIntegration(data = nil)
    require_relative 'entity/agent_integration_entity'
    AgentIntegrationEntity.new(self, data)
  end


  # Canonical facade: client.AgentInteraction.list / client.AgentInteraction.load({ "id" => ... })
  def AgentInteraction(data = nil)
    require_relative 'entity/agent_interaction_entity'
    AgentInteractionEntity.new(self, data)
  end


  # Canonical facade: client.AgentLibrary.list / client.AgentLibrary.load({ "id" => ... })
  def AgentLibrary(data = nil)
    require_relative 'entity/agent_library_entity'
    AgentLibraryEntity.new(self, data)
  end


  # Canonical facade: client.AgentManager.list / client.AgentManager.load({ "id" => ... })
  def AgentManager(data = nil)
    require_relative 'entity/agent_manager_entity'
    AgentManagerEntity.new(self, data)
  end


  # Canonical facade: client.AgentManagerChoice.list / client.AgentManagerChoice.load({ "id" => ... })
  def AgentManagerChoice(data = nil)
    require_relative 'entity/agent_manager_choice_entity'
    AgentManagerChoiceEntity.new(self, data)
  end


  # Canonical facade: client.AgentMarketplace.list / client.AgentMarketplace.load({ "id" => ... })
  def AgentMarketplace(data = nil)
    require_relative 'entity/agent_marketplace_entity'
    AgentMarketplaceEntity.new(self, data)
  end


  # Canonical facade: client.AgentMarketplaceShared.list / client.AgentMarketplaceShared.load({ "id" => ... })
  def AgentMarketplaceShared(data = nil)
    require_relative 'entity/agent_marketplace_shared_entity'
    AgentMarketplaceSharedEntity.new(self, data)
  end


  # Canonical facade: client.AgentMissionControl.list / client.AgentMissionControl.load({ "id" => ... })
  def AgentMissionControl(data = nil)
    require_relative 'entity/agent_mission_control_entity'
    AgentMissionControlEntity.new(self, data)
  end


  # Canonical facade: client.AgentOperation.list / client.AgentOperation.load({ "id" => ... })
  def AgentOperation(data = nil)
    require_relative 'entity/agent_operation_entity'
    AgentOperationEntity.new(self, data)
  end


  # Canonical facade: client.AgentProvisioning.list / client.AgentProvisioning.load({ "id" => ... })
  def AgentProvisioning(data = nil)
    require_relative 'entity/agent_provisioning_entity'
    AgentProvisioningEntity.new(self, data)
  end


  # Canonical facade: client.AgentPullRequest.list / client.AgentPullRequest.load({ "id" => ... })
  def AgentPullRequest(data = nil)
    require_relative 'entity/agent_pull_request_entity'
    AgentPullRequestEntity.new(self, data)
  end


  # Canonical facade: client.AgentQuestion.list / client.AgentQuestion.load({ "id" => ... })
  def AgentQuestion(data = nil)
    require_relative 'entity/agent_question_entity'
    AgentQuestionEntity.new(self, data)
  end


  # Canonical facade: client.AgentRepository.list / client.AgentRepository.load({ "id" => ... })
  def AgentRepository(data = nil)
    require_relative 'entity/agent_repository_entity'
    AgentRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.AgentResource.list / client.AgentResource.load({ "id" => ... })
  def AgentResource(data = nil)
    require_relative 'entity/agent_resource_entity'
    AgentResourceEntity.new(self, data)
  end


  # Canonical facade: client.AgentRoutine.list / client.AgentRoutine.load({ "id" => ... })
  def AgentRoutine(data = nil)
    require_relative 'entity/agent_routine_entity'
    AgentRoutineEntity.new(self, data)
  end


  # Canonical facade: client.AgentRun.list / client.AgentRun.load({ "id" => ... })
  def AgentRun(data = nil)
    require_relative 'entity/agent_run_entity'
    AgentRunEntity.new(self, data)
  end


  # Canonical facade: client.AgentRuntime.list / client.AgentRuntime.load({ "id" => ... })
  def AgentRuntime(data = nil)
    require_relative 'entity/agent_runtime_entity'
    AgentRuntimeEntity.new(self, data)
  end


  # Canonical facade: client.AgentSetting.list / client.AgentSetting.load({ "id" => ... })
  def AgentSetting(data = nil)
    require_relative 'entity/agent_setting_entity'
    AgentSettingEntity.new(self, data)
  end


  # Canonical facade: client.AgentSharing.list / client.AgentSharing.load({ "id" => ... })
  def AgentSharing(data = nil)
    require_relative 'entity/agent_sharing_entity'
    AgentSharingEntity.new(self, data)
  end


  # Canonical facade: client.AgentSite.list / client.AgentSite.load({ "id" => ... })
  def AgentSite(data = nil)
    require_relative 'entity/agent_site_entity'
    AgentSiteEntity.new(self, data)
  end


  # Canonical facade: client.AgentSkill.list / client.AgentSkill.load({ "id" => ... })
  def AgentSkill(data = nil)
    require_relative 'entity/agent_skill_entity'
    AgentSkillEntity.new(self, data)
  end


  # Canonical facade: client.AgentSlack.list / client.AgentSlack.load({ "id" => ... })
  def AgentSlack(data = nil)
    require_relative 'entity/agent_slack_entity'
    AgentSlackEntity.new(self, data)
  end


  # Canonical facade: client.AgentSubagent.list / client.AgentSubagent.load({ "id" => ... })
  def AgentSubagent(data = nil)
    require_relative 'entity/agent_subagent_entity'
    AgentSubagentEntity.new(self, data)
  end


  # Canonical facade: client.AgentSubscription.list / client.AgentSubscription.load({ "id" => ... })
  def AgentSubscription(data = nil)
    require_relative 'entity/agent_subscription_entity'
    AgentSubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.AgentTeammate.list / client.AgentTeammate.load({ "id" => ... })
  def AgentTeammate(data = nil)
    require_relative 'entity/agent_teammate_entity'
    AgentTeammateEntity.new(self, data)
  end


  # Canonical facade: client.AgentTerminal.list / client.AgentTerminal.load({ "id" => ... })
  def AgentTerminal(data = nil)
    require_relative 'entity/agent_terminal_entity'
    AgentTerminalEntity.new(self, data)
  end


  # Canonical facade: client.AgentThread.list / client.AgentThread.load({ "id" => ... })
  def AgentThread(data = nil)
    require_relative 'entity/agent_thread_entity'
    AgentThreadEntity.new(self, data)
  end


  # Canonical facade: client.AgentTool.list / client.AgentTool.load({ "id" => ... })
  def AgentTool(data = nil)
    require_relative 'entity/agent_tool_entity'
    AgentToolEntity.new(self, data)
  end


  # Canonical facade: client.AgentVerifyProject.list / client.AgentVerifyProject.load({ "id" => ... })
  def AgentVerifyProject(data = nil)
    require_relative 'entity/agent_verify_project_entity'
    AgentVerifyProjectEntity.new(self, data)
  end


  # Canonical facade: client.AgentWait.list / client.AgentWait.load({ "id" => ... })
  def AgentWait(data = nil)
    require_relative 'entity/agent_wait_entity'
    AgentWaitEntity.new(self, data)
  end


  # Canonical facade: client.AgentWebhook.list / client.AgentWebhook.load({ "id" => ... })
  def AgentWebhook(data = nil)
    require_relative 'entity/agent_webhook_entity'
    AgentWebhookEntity.new(self, data)
  end


  # Canonical facade: client.AgentWork.list / client.AgentWork.load({ "id" => ... })
  def AgentWork(data = nil)
    require_relative 'entity/agent_work_entity'
    AgentWorkEntity.new(self, data)
  end


  # Canonical facade: client.AgentWorkflow.list / client.AgentWorkflow.load({ "id" => ... })
  def AgentWorkflow(data = nil)
    require_relative 'entity/agent_workflow_entity'
    AgentWorkflowEntity.new(self, data)
  end


  # Canonical facade: client.AgentWorkflowProposal.list / client.AgentWorkflowProposal.load({ "id" => ... })
  def AgentWorkflowProposal(data = nil)
    require_relative 'entity/agent_workflow_proposal_entity'
    AgentWorkflowProposalEntity.new(self, data)
  end


  # Canonical facade: client.AgentWorkflowRun.list / client.AgentWorkflowRun.load({ "id" => ... })
  def AgentWorkflowRun(data = nil)
    require_relative 'entity/agent_workflow_run_entity'
    AgentWorkflowRunEntity.new(self, data)
  end


  # Canonical facade: client.AgentWorkflowTrigger.list / client.AgentWorkflowTrigger.load({ "id" => ... })
  def AgentWorkflowTrigger(data = nil)
    require_relative 'entity/agent_workflow_trigger_entity'
    AgentWorkflowTriggerEntity.new(self, data)
  end


  # Canonical facade: client.AgentWorkspace.list / client.AgentWorkspace.load({ "id" => ... })
  def AgentWorkspace(data = nil)
    require_relative 'entity/agent_workspace_entity'
    AgentWorkspaceEntity.new(self, data)
  end


  # Canonical facade: client.AgentWritePermission.list / client.AgentWritePermission.load({ "id" => ... })
  def AgentWritePermission(data = nil)
    require_relative 'entity/agent_write_permission_entity'
    AgentWritePermissionEntity.new(self, data)
  end


  # Canonical facade: client.AllocationLog.list / client.AllocationLog.load({ "id" => ... })
  def AllocationLog(data = nil)
    require_relative 'entity/allocation_log_entity'
    AllocationLogEntity.new(self, data)
  end


  # Canonical facade: client.App.list / client.App.load({ "id" => ... })
  def App(data = nil)
    require_relative 'entity/app_entity'
    AppEntity.new(self, data)
  end


  # Canonical facade: client.AppCdn.list / client.AppCdn.load({ "id" => ... })
  def AppCdn(data = nil)
    require_relative 'entity/app_cdn_entity'
    AppCdnEntity.new(self, data)
  end


  # Canonical facade: client.AppConfigVariable.list / client.AppConfigVariable.load({ "id" => ... })
  def AppConfigVariable(data = nil)
    require_relative 'entity/app_config_variable_entity'
    AppConfigVariableEntity.new(self, data)
  end


  # Canonical facade: client.AppDataResource.list / client.AppDataResource.load({ "id" => ... })
  def AppDataResource(data = nil)
    require_relative 'entity/app_data_resource_entity'
    AppDataResourceEntity.new(self, data)
  end


  # Canonical facade: client.AppDeploy.list / client.AppDeploy.load({ "id" => ... })
  def AppDeploy(data = nil)
    require_relative 'entity/app_deploy_entity'
    AppDeployEntity.new(self, data)
  end


  # Canonical facade: client.AppDeployment.list / client.AppDeployment.load({ "id" => ... })
  def AppDeployment(data = nil)
    require_relative 'entity/app_deployment_entity'
    AppDeploymentEntity.new(self, data)
  end


  # Canonical facade: client.AppDeploymentOperation.list / client.AppDeploymentOperation.load({ "id" => ... })
  def AppDeploymentOperation(data = nil)
    require_relative 'entity/app_deployment_operation_entity'
    AppDeploymentOperationEntity.new(self, data)
  end


  # Canonical facade: client.AppDeploymentRollback.list / client.AppDeploymentRollback.load({ "id" => ... })
  def AppDeploymentRollback(data = nil)
    require_relative 'entity/app_deployment_rollback_entity'
    AppDeploymentRollbackEntity.new(self, data)
  end


  # Canonical facade: client.AppEnvironment.list / client.AppEnvironment.load({ "id" => ... })
  def AppEnvironment(data = nil)
    require_relative 'entity/app_environment_entity'
    AppEnvironmentEntity.new(self, data)
  end


  # Canonical facade: client.AppLocation.list / client.AppLocation.load({ "id" => ... })
  def AppLocation(data = nil)
    require_relative 'entity/app_location_entity'
    AppLocationEntity.new(self, data)
  end


  # Canonical facade: client.AppMetric.list / client.AppMetric.load({ "id" => ... })
  def AppMetric(data = nil)
    require_relative 'entity/app_metric_entity'
    AppMetricEntity.new(self, data)
  end


  # Canonical facade: client.AppPreview.list / client.AppPreview.load({ "id" => ... })
  def AppPreview(data = nil)
    require_relative 'entity/app_preview_entity'
    AppPreviewEntity.new(self, data)
  end


  # Canonical facade: client.AppPreviewProfile.list / client.AppPreviewProfile.load({ "id" => ... })
  def AppPreviewProfile(data = nil)
    require_relative 'entity/app_preview_profile_entity'
    AppPreviewProfileEntity.new(self, data)
  end


  # Canonical facade: client.AppRun.list / client.AppRun.load({ "id" => ... })
  def AppRun(data = nil)
    require_relative 'entity/app_run_entity'
    AppRunEntity.new(self, data)
  end


  # Canonical facade: client.AppSecret.list / client.AppSecret.load({ "id" => ... })
  def AppSecret(data = nil)
    require_relative 'entity/app_secret_entity'
    AppSecretEntity.new(self, data)
  end


  # Canonical facade: client.AppService.list / client.AppService.load({ "id" => ... })
  def AppService(data = nil)
    require_relative 'entity/app_service_entity'
    AppServiceEntity.new(self, data)
  end


  # Canonical facade: client.AppServiceBinding.list / client.AppServiceBinding.load({ "id" => ... })
  def AppServiceBinding(data = nil)
    require_relative 'entity/app_service_binding_entity'
    AppServiceBindingEntity.new(self, data)
  end


  # Canonical facade: client.AppServicePlacement.list / client.AppServicePlacement.load({ "id" => ... })
  def AppServicePlacement(data = nil)
    require_relative 'entity/app_service_placement_entity'
    AppServicePlacementEntity.new(self, data)
  end


  # Canonical facade: client.AppStorageResource.list / client.AppStorageResource.load({ "id" => ... })
  def AppStorageResource(data = nil)
    require_relative 'entity/app_storage_resource_entity'
    AppStorageResourceEntity.new(self, data)
  end


  # Canonical facade: client.AttachmentPart.list / client.AttachmentPart.load({ "id" => ... })
  def AttachmentPart(data = nil)
    require_relative 'entity/attachment_part_entity'
    AttachmentPartEntity.new(self, data)
  end


  # Canonical facade: client.AutomationEvent.list / client.AutomationEvent.load({ "id" => ... })
  def AutomationEvent(data = nil)
    require_relative 'entity/automation_event_entity'
    AutomationEventEntity.new(self, data)
  end


  # Canonical facade: client.AutomationRun.list / client.AutomationRun.load({ "id" => ... })
  def AutomationRun(data = nil)
    require_relative 'entity/automation_run_entity'
    AutomationRunEntity.new(self, data)
  end


  # Canonical facade: client.Binary.list / client.Binary.load({ "id" => ... })
  def Binary(data = nil)
    require_relative 'entity/binary_entity'
    BinaryEntity.new(self, data)
  end


  # Canonical facade: client.BinaryVersion.list / client.BinaryVersion.load({ "id" => ... })
  def BinaryVersion(data = nil)
    require_relative 'entity/binary_version_entity'
    BinaryVersionEntity.new(self, data)
  end


  # Canonical facade: client.BrowserEgressCandidate.list / client.BrowserEgressCandidate.load({ "id" => ... })
  def BrowserEgressCandidate(data = nil)
    require_relative 'entity/browser_egress_candidate_entity'
    BrowserEgressCandidateEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSession.list / client.BrowserSession.load({ "id" => ... })
  def BrowserSession(data = nil)
    require_relative 'entity/browser_session_entity'
    BrowserSessionEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionConnection.list / client.BrowserSessionConnection.load({ "id" => ... })
  def BrowserSessionConnection(data = nil)
    require_relative 'entity/browser_session_connection_entity'
    BrowserSessionConnectionEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionControl.list / client.BrowserSessionControl.load({ "id" => ... })
  def BrowserSessionControl(data = nil)
    require_relative 'entity/browser_session_control_entity'
    BrowserSessionControlEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionEvent.list / client.BrowserSessionEvent.load({ "id" => ... })
  def BrowserSessionEvent(data = nil)
    require_relative 'entity/browser_session_event_entity'
    BrowserSessionEventEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionMedia.list / client.BrowserSessionMedia.load({ "id" => ... })
  def BrowserSessionMedia(data = nil)
    require_relative 'entity/browser_session_media_entity'
    BrowserSessionMediaEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionRecording.list / client.BrowserSessionRecording.load({ "id" => ... })
  def BrowserSessionRecording(data = nil)
    require_relative 'entity/browser_session_recording_entity'
    BrowserSessionRecordingEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionScreenshot.list / client.BrowserSessionScreenshot.load({ "id" => ... })
  def BrowserSessionScreenshot(data = nil)
    require_relative 'entity/browser_session_screenshot_entity'
    BrowserSessionScreenshotEntity.new(self, data)
  end


  # Canonical facade: client.BrowserSessionTask.list / client.BrowserSessionTask.load({ "id" => ... })
  def BrowserSessionTask(data = nil)
    require_relative 'entity/browser_session_task_entity'
    BrowserSessionTaskEntity.new(self, data)
  end


  # Canonical facade: client.CatalogSelector.list / client.CatalogSelector.load({ "id" => ... })
  def CatalogSelector(data = nil)
    require_relative 'entity/catalog_selector_entity'
    CatalogSelectorEntity.new(self, data)
  end


  # Canonical facade: client.CdnDeployment.list / client.CdnDeployment.load({ "id" => ... })
  def CdnDeployment(data = nil)
    require_relative 'entity/cdn_deployment_entity'
    CdnDeploymentEntity.new(self, data)
  end


  # Canonical facade: client.CdnHostname.list / client.CdnHostname.load({ "id" => ... })
  def CdnHostname(data = nil)
    require_relative 'entity/cdn_hostname_entity'
    CdnHostnameEntity.new(self, data)
  end


  # Canonical facade: client.CdnSpace.list / client.CdnSpace.load({ "id" => ... })
  def CdnSpace(data = nil)
    require_relative 'entity/cdn_space_entity'
    CdnSpaceEntity.new(self, data)
  end


  # Canonical facade: client.CdnSpaceObject.list / client.CdnSpaceObject.load({ "id" => ... })
  def CdnSpaceObject(data = nil)
    require_relative 'entity/cdn_space_object_entity'
    CdnSpaceObjectEntity.new(self, data)
  end


  # Canonical facade: client.ConnectionRequest.list / client.ConnectionRequest.load({ "id" => ... })
  def ConnectionRequest(data = nil)
    require_relative 'entity/connection_request_entity'
    ConnectionRequestEntity.new(self, data)
  end


  # Canonical facade: client.ConnectionSource.list / client.ConnectionSource.load({ "id" => ... })
  def ConnectionSource(data = nil)
    require_relative 'entity/connection_source_entity'
    ConnectionSourceEntity.new(self, data)
  end


  # Canonical facade: client.CoordinationWait.list / client.CoordinationWait.load({ "id" => ... })
  def CoordinationWait(data = nil)
    require_relative 'entity/coordination_wait_entity'
    CoordinationWaitEntity.new(self, data)
  end


  # Canonical facade: client.CredentialSignInCheck.list / client.CredentialSignInCheck.load({ "id" => ... })
  def CredentialSignInCheck(data = nil)
    require_relative 'entity/credential_sign_in_check_entity'
    CredentialSignInCheckEntity.new(self, data)
  end


  # Canonical facade: client.DataResourceRotateCredential.list / client.DataResourceRotateCredential.load({ "id" => ... })
  def DataResourceRotateCredential(data = nil)
    require_relative 'entity/data_resource_rotate_credential_entity'
    DataResourceRotateCredentialEntity.new(self, data)
  end


  # Canonical facade: client.DeepScan.list / client.DeepScan.load({ "id" => ... })
  def DeepScan(data = nil)
    require_relative 'entity/deep_scan_entity'
    DeepScanEntity.new(self, data)
  end


  # Canonical facade: client.DeepScanFinding.list / client.DeepScanFinding.load({ "id" => ... })
  def DeepScanFinding(data = nil)
    require_relative 'entity/deep_scan_finding_entity'
    DeepScanFindingEntity.new(self, data)
  end


  # Canonical facade: client.DeepScanFlow.list / client.DeepScanFlow.load({ "id" => ... })
  def DeepScanFlow(data = nil)
    require_relative 'entity/deep_scan_flow_entity'
    DeepScanFlowEntity.new(self, data)
  end


  # Canonical facade: client.DeepScanMappedFlow.list / client.DeepScanMappedFlow.load({ "id" => ... })
  def DeepScanMappedFlow(data = nil)
    require_relative 'entity/deep_scan_mapped_flow_entity'
    DeepScanMappedFlowEntity.new(self, data)
  end


  # Canonical facade: client.DeepScanOption.list / client.DeepScanOption.load({ "id" => ... })
  def DeepScanOption(data = nil)
    require_relative 'entity/deep_scan_option_entity'
    DeepScanOptionEntity.new(self, data)
  end


  # Canonical facade: client.DemoShare.list / client.DemoShare.load({ "id" => ... })
  def DemoShare(data = nil)
    require_relative 'entity/demo_share_entity'
    DemoShareEntity.new(self, data)
  end


  # Canonical facade: client.DemoShareSegment.list / client.DemoShareSegment.load({ "id" => ... })
  def DemoShareSegment(data = nil)
    require_relative 'entity/demo_share_segment_entity'
    DemoShareSegmentEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentDashboardNomad.list / client.DeploymentDashboardNomad.load({ "id" => ... })
  def DeploymentDashboardNomad(data = nil)
    require_relative 'entity/deployment_dashboard_nomad_entity'
    DeploymentDashboardNomadEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentFile.list / client.DeploymentFile.load({ "id" => ... })
  def DeploymentFile(data = nil)
    require_relative 'entity/deployment_file_entity'
    DeploymentFileEntity.new(self, data)
  end


  # Canonical facade: client.DomainPathRule.list / client.DomainPathRule.load({ "id" => ... })
  def DomainPathRule(data = nil)
    require_relative 'entity/domain_path_rule_entity'
    DomainPathRuleEntity.new(self, data)
  end


  # Canonical facade: client.Dream.list / client.Dream.load({ "id" => ... })
  def Dream(data = nil)
    require_relative 'entity/dream_entity'
    DreamEntity.new(self, data)
  end


  # Canonical facade: client.Environment.list / client.Environment.load({ "id" => ... })
  def Environment(data = nil)
    require_relative 'entity/environment_entity'
    EnvironmentEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentDiscoveryRun.list / client.EnvironmentDiscoveryRun.load({ "id" => ... })
  def EnvironmentDiscoveryRun(data = nil)
    require_relative 'entity/environment_discovery_run_entity'
    EnvironmentDiscoveryRunEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentExploration.list / client.EnvironmentExploration.load({ "id" => ... })
  def EnvironmentExploration(data = nil)
    require_relative 'entity/environment_exploration_entity'
    EnvironmentExplorationEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentFirstRun.list / client.EnvironmentFirstRun.load({ "id" => ... })
  def EnvironmentFirstRun(data = nil)
    require_relative 'entity/environment_first_run_entity'
    EnvironmentFirstRunEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentRevision.list / client.EnvironmentRevision.load({ "id" => ... })
  def EnvironmentRevision(data = nil)
    require_relative 'entity/environment_revision_entity'
    EnvironmentRevisionEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentSecretBinding.list / client.EnvironmentSecretBinding.load({ "id" => ... })
  def EnvironmentSecretBinding(data = nil)
    require_relative 'entity/environment_secret_binding_entity'
    EnvironmentSecretBindingEntity.new(self, data)
  end


  # Canonical facade: client.EnvironmentTestAccount.list / client.EnvironmentTestAccount.load({ "id" => ... })
  def EnvironmentTestAccount(data = nil)
    require_relative 'entity/environment_test_account_entity'
    EnvironmentTestAccountEntity.new(self, data)
  end


  # Canonical facade: client.Evidence.list / client.Evidence.load({ "id" => ... })
  def Evidence(data = nil)
    require_relative 'entity/evidence_entity'
    EvidenceEntity.new(self, data)
  end


  # Canonical facade: client.Exploration.list / client.Exploration.load({ "id" => ... })
  def Exploration(data = nil)
    require_relative 'entity/exploration_entity'
    ExplorationEntity.new(self, data)
  end


  # Canonical facade: client.ExplorationMessage.list / client.ExplorationMessage.load({ "id" => ... })
  def ExplorationMessage(data = nil)
    require_relative 'entity/exploration_message_entity'
    ExplorationMessageEntity.new(self, data)
  end


  # Canonical facade: client.ExplorationReport.list / client.ExplorationReport.load({ "id" => ... })
  def ExplorationReport(data = nil)
    require_relative 'entity/exploration_report_entity'
    ExplorationReportEntity.new(self, data)
  end


  # Canonical facade: client.ExplorationScenario.list / client.ExplorationScenario.load({ "id" => ... })
  def ExplorationScenario(data = nil)
    require_relative 'entity/exploration_scenario_entity'
    ExplorationScenarioEntity.new(self, data)
  end


  # Canonical facade: client.Finding.list / client.Finding.load({ "id" => ... })
  def Finding(data = nil)
    require_relative 'entity/finding_entity'
    FindingEntity.new(self, data)
  end


  # Canonical facade: client.GithubConnection.list / client.GithubConnection.load({ "id" => ... })
  def GithubConnection(data = nil)
    require_relative 'entity/github_connection_entity'
    GithubConnectionEntity.new(self, data)
  end


  # Canonical facade: client.HostingAppDomain.list / client.HostingAppDomain.load({ "id" => ... })
  def HostingAppDomain(data = nil)
    require_relative 'entity/hosting_app_domain_entity'
    HostingAppDomainEntity.new(self, data)
  end


  # Canonical facade: client.ImageRepository.list / client.ImageRepository.load({ "id" => ... })
  def ImageRepository(data = nil)
    require_relative 'entity/image_repository_entity'
    ImageRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.Integration.list / client.Integration.load({ "id" => ... })
  def Integration(data = nil)
    require_relative 'entity/integration_entity'
    IntegrationEntity.new(self, data)
  end


  # Canonical facade: client.InteractionResponse.list / client.InteractionResponse.load({ "id" => ... })
  def InteractionResponse(data = nil)
    require_relative 'entity/interaction_response_entity'
    InteractionResponseEntity.new(self, data)
  end


  # Canonical facade: client.Invitation.list / client.Invitation.load({ "id" => ... })
  def Invitation(data = nil)
    require_relative 'entity/invitation_entity'
    InvitationEntity.new(self, data)
  end


  # Canonical facade: client.JourneyVariantReplay.list / client.JourneyVariantReplay.load({ "id" => ... })
  def JourneyVariantReplay(data = nil)
    require_relative 'entity/journey_variant_replay_entity'
    JourneyVariantReplayEntity.new(self, data)
  end


  # Canonical facade: client.Knowledge.list / client.Knowledge.load({ "id" => ... })
  def Knowledge(data = nil)
    require_relative 'entity/knowledge_entity'
    KnowledgeEntity.new(self, data)
  end


  # Canonical facade: client.LocalThreadDelivery.list / client.LocalThreadDelivery.load({ "id" => ... })
  def LocalThreadDelivery(data = nil)
    require_relative 'entity/local_thread_delivery_entity'
    LocalThreadDeliveryEntity.new(self, data)
  end


  # Canonical facade: client.LocalThreadOperation.list / client.LocalThreadOperation.load({ "id" => ... })
  def LocalThreadOperation(data = nil)
    require_relative 'entity/local_thread_operation_entity'
    LocalThreadOperationEntity.new(self, data)
  end


  # Canonical facade: client.Location.list / client.Location.load({ "id" => ... })
  def Location(data = nil)
    require_relative 'entity/location_entity'
    LocationEntity.new(self, data)
  end


  # Canonical facade: client.Me.list / client.Me.load({ "id" => ... })
  def Me(data = nil)
    require_relative 'entity/me_entity'
    MeEntity.new(self, data)
  end


  # Canonical facade: client.MeEmail.list / client.MeEmail.load({ "id" => ... })
  def MeEmail(data = nil)
    require_relative 'entity/me_email_entity'
    MeEmailEntity.new(self, data)
  end


  # Canonical facade: client.MeOnboarding.list / client.MeOnboarding.load({ "id" => ... })
  def MeOnboarding(data = nil)
    require_relative 'entity/me_onboarding_entity'
    MeOnboardingEntity.new(self, data)
  end


  # Canonical facade: client.MediaFile.list / client.MediaFile.load({ "id" => ... })
  def MediaFile(data = nil)
    require_relative 'entity/media_file_entity'
    MediaFileEntity.new(self, data)
  end


  # Canonical facade: client.Member.list / client.Member.load({ "id" => ... })
  def Member(data = nil)
    require_relative 'entity/member_entity'
    MemberEntity.new(self, data)
  end


  # Canonical facade: client.Memory.list / client.Memory.load({ "id" => ... })
  def Memory(data = nil)
    require_relative 'entity/memory_entity'
    MemoryEntity.new(self, data)
  end


  # Canonical facade: client.MergeRequest.list / client.MergeRequest.load({ "id" => ... })
  def MergeRequest(data = nil)
    require_relative 'entity/merge_request_entity'
    MergeRequestEntity.new(self, data)
  end


  # Canonical facade: client.MessagingConversationMessage.list / client.MessagingConversationMessage.load({ "id" => ... })
  def MessagingConversationMessage(data = nil)
    require_relative 'entity/messaging_conversation_message_entity'
    MessagingConversationMessageEntity.new(self, data)
  end


  # Canonical facade: client.MessagingConversationUpload.list / client.MessagingConversationUpload.load({ "id" => ... })
  def MessagingConversationUpload(data = nil)
    require_relative 'entity/messaging_conversation_upload_entity'
    MessagingConversationUploadEntity.new(self, data)
  end


  # Canonical facade: client.MetricQuery.list / client.MetricQuery.load({ "id" => ... })
  def MetricQuery(data = nil)
    require_relative 'entity/metric_query_entity'
    MetricQueryEntity.new(self, data)
  end


  # Canonical facade: client.NetworkConnection.list / client.NetworkConnection.load({ "id" => ... })
  def NetworkConnection(data = nil)
    require_relative 'entity/network_connection_entity'
    NetworkConnectionEntity.new(self, data)
  end


  # Canonical facade: client.NomadAllocation.list / client.NomadAllocation.load({ "id" => ... })
  def NomadAllocation(data = nil)
    require_relative 'entity/nomad_allocation_entity'
    NomadAllocationEntity.new(self, data)
  end


  # Canonical facade: client.NomadLog.list / client.NomadLog.load({ "id" => ... })
  def NomadLog(data = nil)
    require_relative 'entity/nomad_log_entity'
    NomadLogEntity.new(self, data)
  end


  # Canonical facade: client.Organization.list / client.Organization.load({ "id" => ... })
  def Organization(data = nil)
    require_relative 'entity/organization_entity'
    OrganizationEntity.new(self, data)
  end


  # Canonical facade: client.Page.list / client.Page.load({ "id" => ... })
  def Page(data = nil)
    require_relative 'entity/page_entity'
    PageEntity.new(self, data)
  end


  # Canonical facade: client.PageAgent.list / client.PageAgent.load({ "id" => ... })
  def PageAgent(data = nil)
    require_relative 'entity/page_agent_entity'
    PageAgentEntity.new(self, data)
  end


  # Canonical facade: client.PageProjectRun.list / client.PageProjectRun.load({ "id" => ... })
  def PageProjectRun(data = nil)
    require_relative 'entity/page_project_run_entity'
    PageProjectRunEntity.new(self, data)
  end


  # Canonical facade: client.PagesProjectCredential.list / client.PagesProjectCredential.load({ "id" => ... })
  def PagesProjectCredential(data = nil)
    require_relative 'entity/pages_project_credential_entity'
    PagesProjectCredentialEntity.new(self, data)
  end


  # Canonical facade: client.PagesProjectPersona.list / client.PagesProjectPersona.load({ "id" => ... })
  def PagesProjectPersona(data = nil)
    require_relative 'entity/pages_project_persona_entity'
    PagesProjectPersonaEntity.new(self, data)
  end


  # Canonical facade: client.PagesProjectRun.list / client.PagesProjectRun.load({ "id" => ... })
  def PagesProjectRun(data = nil)
    require_relative 'entity/pages_project_run_entity'
    PagesProjectRunEntity.new(self, data)
  end


  # Canonical facade: client.PagesProjectScenario.list / client.PagesProjectScenario.load({ "id" => ... })
  def PagesProjectScenario(data = nil)
    require_relative 'entity/pages_project_scenario_entity'
    PagesProjectScenarioEntity.new(self, data)
  end


  # Canonical facade: client.PersonalAccessToken.list / client.PersonalAccessToken.load({ "id" => ... })
  def PersonalAccessToken(data = nil)
    require_relative 'entity/personal_access_token_entity'
    PersonalAccessTokenEntity.new(self, data)
  end


  # Canonical facade: client.PreviewOperation.list / client.PreviewOperation.load({ "id" => ... })
  def PreviewOperation(data = nil)
    require_relative 'entity/preview_operation_entity'
    PreviewOperationEntity.new(self, data)
  end


  # Canonical facade: client.PreviewProfileSecretBinding.list / client.PreviewProfileSecretBinding.load({ "id" => ... })
  def PreviewProfileSecretBinding(data = nil)
    require_relative 'entity/preview_profile_secret_binding_entity'
    PreviewProfileSecretBindingEntity.new(self, data)
  end


  # Canonical facade: client.PreviewSecret.list / client.PreviewSecret.load({ "id" => ... })
  def PreviewSecret(data = nil)
    require_relative 'entity/preview_secret_entity'
    PreviewSecretEntity.new(self, data)
  end


  # Canonical facade: client.PreviewSharingApproval.list / client.PreviewSharingApproval.load({ "id" => ... })
  def PreviewSharingApproval(data = nil)
    require_relative 'entity/preview_sharing_approval_entity'
    PreviewSharingApprovalEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapIdentityDecision.list / client.ProductMapIdentityDecision.load({ "id" => ... })
  def ProductMapIdentityDecision(data = nil)
    require_relative 'entity/product_map_identity_decision_entity'
    ProductMapIdentityDecisionEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapJourney.list / client.ProductMapJourney.load({ "id" => ... })
  def ProductMapJourney(data = nil)
    require_relative 'entity/product_map_journey_entity'
    ProductMapJourneyEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapJourneyReplay.list / client.ProductMapJourneyReplay.load({ "id" => ... })
  def ProductMapJourneyReplay(data = nil)
    require_relative 'entity/product_map_journey_replay_entity'
    ProductMapJourneyReplayEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapObservation.list / client.ProductMapObservation.load({ "id" => ... })
  def ProductMapObservation(data = nil)
    require_relative 'entity/product_map_observation_entity'
    ProductMapObservationEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapQuestion.list / client.ProductMapQuestion.load({ "id" => ... })
  def ProductMapQuestion(data = nil)
    require_relative 'entity/product_map_question_entity'
    ProductMapQuestionEntity.new(self, data)
  end


  # Canonical facade: client.ProductMapState.list / client.ProductMapState.load({ "id" => ... })
  def ProductMapState(data = nil)
    require_relative 'entity/product_map_state_entity'
    ProductMapStateEntity.new(self, data)
  end


  # Canonical facade: client.Project.list / client.Project.load({ "id" => ... })
  def Project(data = nil)
    require_relative 'entity/project_entity'
    ProjectEntity.new(self, data)
  end


  # Canonical facade: client.ProjectAndroidApk.list / client.ProjectAndroidApk.load({ "id" => ... })
  def ProjectAndroidApk(data = nil)
    require_relative 'entity/project_android_apk_entity'
    ProjectAndroidApkEntity.new(self, data)
  end


  # Canonical facade: client.ProjectCodeMap.list / client.ProjectCodeMap.load({ "id" => ... })
  def ProjectCodeMap(data = nil)
    require_relative 'entity/project_code_map_entity'
    ProjectCodeMapEntity.new(self, data)
  end


  # Canonical facade: client.ProjectEnvironment.list / client.ProjectEnvironment.load({ "id" => ... })
  def ProjectEnvironment(data = nil)
    require_relative 'entity/project_environment_entity'
    ProjectEnvironmentEntity.new(self, data)
  end


  # Canonical facade: client.ProjectFinding.list / client.ProjectFinding.load({ "id" => ... })
  def ProjectFinding(data = nil)
    require_relative 'entity/project_finding_entity'
    ProjectFindingEntity.new(self, data)
  end


  # Canonical facade: client.ProjectFixture.list / client.ProjectFixture.load({ "id" => ... })
  def ProjectFixture(data = nil)
    require_relative 'entity/project_fixture_entity'
    ProjectFixtureEntity.new(self, data)
  end


  # Canonical facade: client.ProjectIosApp.list / client.ProjectIosApp.load({ "id" => ... })
  def ProjectIosApp(data = nil)
    require_relative 'entity/project_ios_app_entity'
    ProjectIosAppEntity.new(self, data)
  end


  # Canonical facade: client.ProjectMessagingConversation.list / client.ProjectMessagingConversation.load({ "id" => ... })
  def ProjectMessagingConversation(data = nil)
    require_relative 'entity/project_messaging_conversation_entity'
    ProjectMessagingConversationEntity.new(self, data)
  end


  # Canonical facade: client.ProjectOverviewMetric.list / client.ProjectOverviewMetric.load({ "id" => ... })
  def ProjectOverviewMetric(data = nil)
    require_relative 'entity/project_overview_metric_entity'
    ProjectOverviewMetricEntity.new(self, data)
  end


  # Canonical facade: client.ProjectOverviewPullRequest.list / client.ProjectOverviewPullRequest.load({ "id" => ... })
  def ProjectOverviewPullRequest(data = nil)
    require_relative 'entity/project_overview_pull_request_entity'
    ProjectOverviewPullRequestEntity.new(self, data)
  end


  # Canonical facade: client.ProjectProductMap.list / client.ProjectProductMap.load({ "id" => ... })
  def ProjectProductMap(data = nil)
    require_relative 'entity/project_product_map_entity'
    ProjectProductMapEntity.new(self, data)
  end


  # Canonical facade: client.ProjectRecording.list / client.ProjectRecording.load({ "id" => ... })
  def ProjectRecording(data = nil)
    require_relative 'entity/project_recording_entity'
    ProjectRecordingEntity.new(self, data)
  end


  # Canonical facade: client.ProjectRunPlan.list / client.ProjectRunPlan.load({ "id" => ... })
  def ProjectRunPlan(data = nil)
    require_relative 'entity/project_run_plan_entity'
    ProjectRunPlanEntity.new(self, data)
  end


  # Canonical facade: client.ProjectRunSchedule.list / client.ProjectRunSchedule.load({ "id" => ... })
  def ProjectRunSchedule(data = nil)
    require_relative 'entity/project_run_schedule_entity'
    ProjectRunScheduleEntity.new(self, data)
  end


  # Canonical facade: client.ProjectScenarioOption.list / client.ProjectScenarioOption.load({ "id" => ... })
  def ProjectScenarioOption(data = nil)
    require_relative 'entity/project_scenario_option_entity'
    ProjectScenarioOptionEntity.new(self, data)
  end


  # Canonical facade: client.ProjectScenarioRow.list / client.ProjectScenarioRow.load({ "id" => ... })
  def ProjectScenarioRow(data = nil)
    require_relative 'entity/project_scenario_row_entity'
    ProjectScenarioRowEntity.new(self, data)
  end


  # Canonical facade: client.ProjectSetting.list / client.ProjectSetting.load({ "id" => ... })
  def ProjectSetting(data = nil)
    require_relative 'entity/project_setting_entity'
    ProjectSettingEntity.new(self, data)
  end


  # Canonical facade: client.PullRequest.list / client.PullRequest.load({ "id" => ... })
  def PullRequest(data = nil)
    require_relative 'entity/pull_request_entity'
    PullRequestEntity.new(self, data)
  end


  # Canonical facade: client.PullRequestSetting.list / client.PullRequestSetting.load({ "id" => ... })
  def PullRequestSetting(data = nil)
    require_relative 'entity/pull_request_setting_entity'
    PullRequestSettingEntity.new(self, data)
  end


  # Canonical facade: client.PullRequestSettingAddRepository.list / client.PullRequestSettingAddRepository.load({ "id" => ... })
  def PullRequestSettingAddRepository(data = nil)
    require_relative 'entity/pull_request_setting_add_repository_entity'
    PullRequestSettingAddRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.PullRequestSettingDetectComment.list / client.PullRequestSettingDetectComment.load({ "id" => ... })
  def PullRequestSettingDetectComment(data = nil)
    require_relative 'entity/pull_request_setting_detect_comment_entity'
    PullRequestSettingDetectCommentEntity.new(self, data)
  end


  # Canonical facade: client.Recorder.list / client.Recorder.load({ "id" => ... })
  def Recorder(data = nil)
    require_relative 'entity/recorder_entity'
    RecorderEntity.new(self, data)
  end


  # Canonical facade: client.Registry.list / client.Registry.load({ "id" => ... })
  def Registry(data = nil)
    require_relative 'entity/registry_entity'
    RegistryEntity.new(self, data)
  end


  # Canonical facade: client.RegistryV2.list / client.RegistryV2.load({ "id" => ... })
  def RegistryV2(data = nil)
    require_relative 'entity/registry_v2_entity'
    RegistryV2Entity.new(self, data)
  end


  # Canonical facade: client.RelayAgentLocalThread.list / client.RelayAgentLocalThread.load({ "id" => ... })
  def RelayAgentLocalThread(data = nil)
    require_relative 'entity/relay_agent_local_thread_entity'
    RelayAgentLocalThreadEntity.new(self, data)
  end


  # Canonical facade: client.ReportReplay.list / client.ReportReplay.load({ "id" => ... })
  def ReportReplay(data = nil)
    require_relative 'entity/report_replay_entity'
    ReportReplayEntity.new(self, data)
  end


  # Canonical facade: client.ReportScenario.list / client.ReportScenario.load({ "id" => ... })
  def ReportScenario(data = nil)
    require_relative 'entity/report_scenario_entity'
    ReportScenarioEntity.new(self, data)
  end


  # Canonical facade: client.RunScenarioRun.list / client.RunScenarioRun.load({ "id" => ... })
  def RunScenarioRun(data = nil)
    require_relative 'entity/run_scenario_run_entity'
    RunScenarioRunEntity.new(self, data)
  end


  # Canonical facade: client.RunScheduleOption.list / client.RunScheduleOption.load({ "id" => ... })
  def RunScheduleOption(data = nil)
    require_relative 'entity/run_schedule_option_entity'
    RunScheduleOptionEntity.new(self, data)
  end


  # Canonical facade: client.RunSearch.list / client.RunSearch.load({ "id" => ... })
  def RunSearch(data = nil)
    require_relative 'entity/run_search_entity'
    RunSearchEntity.new(self, data)
  end


  # Canonical facade: client.RunUpdate.list / client.RunUpdate.load({ "id" => ... })
  def RunUpdate(data = nil)
    require_relative 'entity/run_update_entity'
    RunUpdateEntity.new(self, data)
  end


  # Canonical facade: client.ScenarioRevision.list / client.ScenarioRevision.load({ "id" => ... })
  def ScenarioRevision(data = nil)
    require_relative 'entity/scenario_revision_entity'
    ScenarioRevisionEntity.new(self, data)
  end


  # Canonical facade: client.ScenarioRunLesson.list / client.ScenarioRunLesson.load({ "id" => ... })
  def ScenarioRunLesson(data = nil)
    require_relative 'entity/scenario_run_lesson_entity'
    ScenarioRunLessonEntity.new(self, data)
  end


  # Canonical facade: client.ScenarioRunScenarioEdit.list / client.ScenarioRunScenarioEdit.load({ "id" => ... })
  def ScenarioRunScenarioEdit(data = nil)
    require_relative 'entity/scenario_run_scenario_edit_entity'
    ScenarioRunScenarioEditEntity.new(self, data)
  end


  # Canonical facade: client.ServiceEndpoint.list / client.ServiceEndpoint.load({ "id" => ... })
  def ServiceEndpoint(data = nil)
    require_relative 'entity/service_endpoint_entity'
    ServiceEndpointEntity.new(self, data)
  end


  # Canonical facade: client.SitePreview.list / client.SitePreview.load({ "id" => ... })
  def SitePreview(data = nil)
    require_relative 'entity/site_preview_entity'
    SitePreviewEntity.new(self, data)
  end


  # Canonical facade: client.SlackChannel.list / client.SlackChannel.load({ "id" => ... })
  def SlackChannel(data = nil)
    require_relative 'entity/slack_channel_entity'
    SlackChannelEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentLocalThread.list / client.SparkAgentLocalThread.load({ "id" => ... })
  def SparkAgentLocalThread(data = nil)
    require_relative 'entity/spark_agent_local_thread_entity'
    SparkAgentLocalThreadEntity.new(self, data)
  end


  # Canonical facade: client.StaticSite.list / client.StaticSite.load({ "id" => ... })
  def StaticSite(data = nil)
    require_relative 'entity/static_site_entity'
    StaticSiteEntity.new(self, data)
  end


  # Canonical facade: client.StaticSiteDeployment.list / client.StaticSiteDeployment.load({ "id" => ... })
  def StaticSiteDeployment(data = nil)
    require_relative 'entity/static_site_deployment_entity'
    StaticSiteDeploymentEntity.new(self, data)
  end


  # Canonical facade: client.StaticSiteDomain.list / client.StaticSiteDomain.load({ "id" => ... })
  def StaticSiteDomain(data = nil)
    require_relative 'entity/static_site_domain_entity'
    StaticSiteDomainEntity.new(self, data)
  end


  # Canonical facade: client.SubscriptionModel.list / client.SubscriptionModel.load({ "id" => ... })
  def SubscriptionModel(data = nil)
    require_relative 'entity/subscription_model_entity'
    SubscriptionModelEntity.new(self, data)
  end


  # Canonical facade: client.ThreadPreview.list / client.ThreadPreview.load({ "id" => ... })
  def ThreadPreview(data = nil)
    require_relative 'entity/thread_preview_entity'
    ThreadPreviewEntity.new(self, data)
  end


  # Canonical facade: client.VerificationProjectCredential.list / client.VerificationProjectCredential.load({ "id" => ... })
  def VerificationProjectCredential(data = nil)
    require_relative 'entity/verification_project_credential_entity'
    VerificationProjectCredentialEntity.new(self, data)
  end


  # Canonical facade: client.VerificationProjectPersona.list / client.VerificationProjectPersona.load({ "id" => ... })
  def VerificationProjectPersona(data = nil)
    require_relative 'entity/verification_project_persona_entity'
    VerificationProjectPersonaEntity.new(self, data)
  end


  # Canonical facade: client.VerificationProjectRun.list / client.VerificationProjectRun.load({ "id" => ... })
  def VerificationProjectRun(data = nil)
    require_relative 'entity/verification_project_run_entity'
    VerificationProjectRunEntity.new(self, data)
  end


  # Canonical facade: client.VerificationProjectScenario.list / client.VerificationProjectScenario.load({ "id" => ... })
  def VerificationProjectScenario(data = nil)
    require_relative 'entity/verification_project_scenario_entity'
    VerificationProjectScenarioEntity.new(self, data)
  end


  # Canonical facade: client.VerifyAppDomain.list / client.VerifyAppDomain.load({ "id" => ... })
  def VerifyAppDomain(data = nil)
    require_relative 'entity/verify_app_domain_entity'
    VerifyAppDomainEntity.new(self, data)
  end


  # Canonical facade: client.VerifyBrowserSession.list / client.VerifyBrowserSession.load({ "id" => ... })
  def VerifyBrowserSession(data = nil)
    require_relative 'entity/verify_browser_session_entity'
    VerifyBrowserSessionEntity.new(self, data)
  end


  # Canonical facade: client.VerifyStaticSiteDomain.list / client.VerifyStaticSiteDomain.load({ "id" => ... })
  def VerifyStaticSiteDomain(data = nil)
    require_relative 'entity/verify_static_site_domain_entity'
    VerifyStaticSiteDomainEntity.new(self, data)
  end


  # Canonical facade: client.VersionLog.list / client.VersionLog.load({ "id" => ... })
  def VersionLog(data = nil)
    require_relative 'entity/version_log_entity'
    VersionLogEntity.new(self, data)
  end


  # Canonical facade: client.WebBotAuth.list / client.WebBotAuth.load({ "id" => ... })
  def WebBotAuth(data = nil)
    require_relative 'entity/web_bot_auth_entity'
    WebBotAuthEntity.new(self, data)
  end


  # Canonical facade: client.WorkflowRunStep.list / client.WorkflowRunStep.load({ "id" => ... })
  def WorkflowRunStep(data = nil)
    require_relative 'entity/workflow_run_step_entity'
    WorkflowRunStepEntity.new(self, data)
  end


  # Canonical facade: client.WorkflowRunStopNotice.list / client.WorkflowRunStopNotice.load({ "id" => ... })
  def WorkflowRunStopNotice(data = nil)
    require_relative 'entity/workflow_run_stop_notice_entity'
    WorkflowRunStopNoticeEntity.new(self, data)
  end


  # Canonical facade: client.WorkflowTriggerSkipped.list / client.WorkflowTriggerSkipped.load({ "id" => ... })
  def WorkflowTriggerSkipped(data = nil)
    require_relative 'entity/workflow_trigger_skipped_entity'
    WorkflowTriggerSkippedEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = ComposalSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
