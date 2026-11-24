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


  # Canonical facade: client.A2aWellKnown.list / client.A2aWellKnown.load({ "id" => ... })
  def A2aWellKnown(data = nil)
    require_relative 'entity/a2a_well_known_entity'
    A2aWellKnownEntity.new(self, data)
  end


  # Canonical facade: client.AdminOrg.list / client.AdminOrg.load({ "id" => ... })
  def AdminOrg(data = nil)
    require_relative 'entity/admin_org_entity'
    AdminOrgEntity.new(self, data)
  end


  # Canonical facade: client.Agent.list / client.Agent.load({ "id" => ... })
  def Agent(data = nil)
    require_relative 'entity/agent_entity'
    AgentEntity.new(self, data)
  end


  # Canonical facade: client.AgentApp.list / client.AgentApp.load({ "id" => ... })
  def AgentApp(data = nil)
    require_relative 'entity/agent_app_entity'
    AgentAppEntity.new(self, data)
  end


  # Canonical facade: client.AgentAppInstall.list / client.AgentAppInstall.load({ "id" => ... })
  def AgentAppInstall(data = nil)
    require_relative 'entity/agent_app_install_entity'
    AgentAppInstallEntity.new(self, data)
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


  # Canonical facade: client.AgentConnectionDelegation.list / client.AgentConnectionDelegation.load({ "id" => ... })
  def AgentConnectionDelegation(data = nil)
    require_relative 'entity/agent_connection_delegation_entity'
    AgentConnectionDelegationEntity.new(self, data)
  end


  # Canonical facade: client.AgentConnectionGrant.list / client.AgentConnectionGrant.load({ "id" => ... })
  def AgentConnectionGrant(data = nil)
    require_relative 'entity/agent_connection_grant_entity'
    AgentConnectionGrantEntity.new(self, data)
  end


  # Canonical facade: client.AgentConnectionResource.list / client.AgentConnectionResource.load({ "id" => ... })
  def AgentConnectionResource(data = nil)
    require_relative 'entity/agent_connection_resource_entity'
    AgentConnectionResourceEntity.new(self, data)
  end


  # Canonical facade: client.AgentConnectionSafetyControl.list / client.AgentConnectionSafetyControl.load({ "id" => ... })
  def AgentConnectionSafetyControl(data = nil)
    require_relative 'entity/agent_connection_safety_control_entity'
    AgentConnectionSafetyControlEntity.new(self, data)
  end


  # Canonical facade: client.AgentConnectionTriggerSubscription.list / client.AgentConnectionTriggerSubscription.load({ "id" => ... })
  def AgentConnectionTriggerSubscription(data = nil)
    require_relative 'entity/agent_connection_trigger_subscription_entity'
    AgentConnectionTriggerSubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.AgentContextCheckpoint.list / client.AgentContextCheckpoint.load({ "id" => ... })
  def AgentContextCheckpoint(data = nil)
    require_relative 'entity/agent_context_checkpoint_entity'
    AgentContextCheckpointEntity.new(self, data)
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


  # Canonical facade: client.AgentEvent.list / client.AgentEvent.load({ "id" => ... })
  def AgentEvent(data = nil)
    require_relative 'entity/agent_event_entity'
    AgentEventEntity.new(self, data)
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


  # Canonical facade: client.AgentIntegrationAccount.list / client.AgentIntegrationAccount.load({ "id" => ... })
  def AgentIntegrationAccount(data = nil)
    require_relative 'entity/agent_integration_account_entity'
    AgentIntegrationAccountEntity.new(self, data)
  end


  # Canonical facade: client.AgentIntegrationCallback.list / client.AgentIntegrationCallback.load({ "id" => ... })
  def AgentIntegrationCallback(data = nil)
    require_relative 'entity/agent_integration_callback_entity'
    AgentIntegrationCallbackEntity.new(self, data)
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


  # Canonical facade: client.AgentRelayFileGrant.list / client.AgentRelayFileGrant.load({ "id" => ... })
  def AgentRelayFileGrant(data = nil)
    require_relative 'entity/agent_relay_file_grant_entity'
    AgentRelayFileGrantEntity.new(self, data)
  end


  # Canonical facade: client.AgentRelayFileGrantAccount.list / client.AgentRelayFileGrantAccount.load({ "id" => ... })
  def AgentRelayFileGrantAccount(data = nil)
    require_relative 'entity/agent_relay_file_grant_account_entity'
    AgentRelayFileGrantAccountEntity.new(self, data)
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


  # Canonical facade: client.AgentRoder.list / client.AgentRoder.load({ "id" => ... })
  def AgentRoder(data = nil)
    require_relative 'entity/agent_roder_entity'
    AgentRoderEntity.new(self, data)
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


  # Canonical facade: client.AgentSession.list / client.AgentSession.load({ "id" => ... })
  def AgentSession(data = nil)
    require_relative 'entity/agent_session_entity'
    AgentSessionEntity.new(self, data)
  end


  # Canonical facade: client.AgentSessionCheckpoint.list / client.AgentSessionCheckpoint.load({ "id" => ... })
  def AgentSessionCheckpoint(data = nil)
    require_relative 'entity/agent_session_checkpoint_entity'
    AgentSessionCheckpointEntity.new(self, data)
  end


  # Canonical facade: client.AgentSessionRoderHandoff.list / client.AgentSessionRoderHandoff.load({ "id" => ... })
  def AgentSessionRoderHandoff(data = nil)
    require_relative 'entity/agent_session_roder_handoff_entity'
    AgentSessionRoderHandoffEntity.new(self, data)
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


  # Canonical facade: client.AgentSwarm.list / client.AgentSwarm.load({ "id" => ... })
  def AgentSwarm(data = nil)
    require_relative 'entity/agent_swarm_entity'
    AgentSwarmEntity.new(self, data)
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


  # Canonical facade: client.AgentUsage.list / client.AgentUsage.load({ "id" => ... })
  def AgentUsage(data = nil)
    require_relative 'entity/agent_usage_entity'
    AgentUsageEntity.new(self, data)
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


  # Canonical facade: client.AgentWebPreview.list / client.AgentWebPreview.load({ "id" => ... })
  def AgentWebPreview(data = nil)
    require_relative 'entity/agent_web_preview_entity'
    AgentWebPreviewEntity.new(self, data)
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


  # Canonical facade: client.Agreement.list / client.Agreement.load({ "id" => ... })
  def Agreement(data = nil)
    require_relative 'entity/agreement_entity'
    AgreementEntity.new(self, data)
  end


  # Canonical facade: client.AgreementAccessRequest.list / client.AgreementAccessRequest.load({ "id" => ... })
  def AgreementAccessRequest(data = nil)
    require_relative 'entity/agreement_access_request_entity'
    AgreementAccessRequestEntity.new(self, data)
  end


  # Canonical facade: client.AlertRuleEvent.list / client.AlertRuleEvent.load({ "id" => ... })
  def AlertRuleEvent(data = nil)
    require_relative 'entity/alert_rule_event_entity'
    AlertRuleEventEntity.new(self, data)
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


  # Canonical facade: client.AppAccess.list / client.AppAccess.load({ "id" => ... })
  def AppAccess(data = nil)
    require_relative 'entity/app_access_entity'
    AppAccessEntity.new(self, data)
  end


  # Canonical facade: client.AppAccessJwk.list / client.AppAccessJwk.load({ "id" => ... })
  def AppAccessJwk(data = nil)
    require_relative 'entity/app_access_jwk_entity'
    AppAccessJwkEntity.new(self, data)
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


  # Canonical facade: client.Artefact.list / client.Artefact.load({ "id" => ... })
  def Artefact(data = nil)
    require_relative 'entity/artefact_entity'
    ArtefactEntity.new(self, data)
  end


  # Canonical facade: client.ArtefactCommentThread.list / client.ArtefactCommentThread.load({ "id" => ... })
  def ArtefactCommentThread(data = nil)
    require_relative 'entity/artefact_comment_thread_entity'
    ArtefactCommentThreadEntity.new(self, data)
  end


  # Canonical facade: client.ArtefactRevision.list / client.ArtefactRevision.load({ "id" => ... })
  def ArtefactRevision(data = nil)
    require_relative 'entity/artefact_revision_entity'
    ArtefactRevisionEntity.new(self, data)
  end


  # Canonical facade: client.ArtefactViewToken.list / client.ArtefactViewToken.load({ "id" => ... })
  def ArtefactViewToken(data = nil)
    require_relative 'entity/artefact_view_token_entity'
    ArtefactViewTokenEntity.new(self, data)
  end


  # Canonical facade: client.Artifact.list / client.Artifact.load({ "id" => ... })
  def Artifact(data = nil)
    require_relative 'entity/artifact_entity'
    ArtifactEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactCacheNamespace.list / client.ArtifactCacheNamespace.load({ "id" => ... })
  def ArtifactCacheNamespace(data = nil)
    require_relative 'entity/artifact_cache_namespace_entity'
    ArtifactCacheNamespaceEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactImageRepository.list / client.ArtifactImageRepository.load({ "id" => ... })
  def ArtifactImageRepository(data = nil)
    require_relative 'entity/artifact_image_repository_entity'
    ArtifactImageRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactPackageMirror.list / client.ArtifactPackageMirror.load({ "id" => ... })
  def ArtifactPackageMirror(data = nil)
    require_relative 'entity/artifact_package_mirror_entity'
    ArtifactPackageMirrorEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactRetentionPolicy.list / client.ArtifactRetentionPolicy.load({ "id" => ... })
  def ArtifactRetentionPolicy(data = nil)
    require_relative 'entity/artifact_retention_policy_entity'
    ArtifactRetentionPolicyEntity.new(self, data)
  end


  # Canonical facade: client.AttachmentPart.list / client.AttachmentPart.load({ "id" => ... })
  def AttachmentPart(data = nil)
    require_relative 'entity/attachment_part_entity'
    AttachmentPartEntity.new(self, data)
  end


  # Canonical facade: client.AuditEvent.list / client.AuditEvent.load({ "id" => ... })
  def AuditEvent(data = nil)
    require_relative 'entity/audit_event_entity'
    AuditEventEntity.new(self, data)
  end


  # Canonical facade: client.Auth.list / client.Auth.load({ "id" => ... })
  def Auth(data = nil)
    require_relative 'entity/auth_entity'
    AuthEntity.new(self, data)
  end


  # Canonical facade: client.AuthCli.list / client.AuthCli.load({ "id" => ... })
  def AuthCli(data = nil)
    require_relative 'entity/auth_cli_entity'
    AuthCliEntity.new(self, data)
  end


  # Canonical facade: client.AuthGithub.list / client.AuthGithub.load({ "id" => ... })
  def AuthGithub(data = nil)
    require_relative 'entity/auth_github_entity'
    AuthGithubEntity.new(self, data)
  end


  # Canonical facade: client.AuthGoogle.list / client.AuthGoogle.load({ "id" => ... })
  def AuthGoogle(data = nil)
    require_relative 'entity/auth_google_entity'
    AuthGoogleEntity.new(self, data)
  end


  # Canonical facade: client.AuthOpenai.list / client.AuthOpenai.load({ "id" => ... })
  def AuthOpenai(data = nil)
    require_relative 'entity/auth_openai_entity'
    AuthOpenaiEntity.new(self, data)
  end


  # Canonical facade: client.AuthPasswordReset.list / client.AuthPasswordReset.load({ "id" => ... })
  def AuthPasswordReset(data = nil)
    require_relative 'entity/auth_password_reset_entity'
    AuthPasswordResetEntity.new(self, data)
  end


  # Canonical facade: client.AuthRegistrationOption.list / client.AuthRegistrationOption.load({ "id" => ... })
  def AuthRegistrationOption(data = nil)
    require_relative 'entity/auth_registration_option_entity'
    AuthRegistrationOptionEntity.new(self, data)
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


  # Canonical facade: client.BackendRunnerPool.list / client.BackendRunnerPool.load({ "id" => ... })
  def BackendRunnerPool(data = nil)
    require_relative 'entity/backend_runner_pool_entity'
    BackendRunnerPoolEntity.new(self, data)
  end


  # Canonical facade: client.Bazel.list / client.Bazel.load({ "id" => ... })
  def Bazel(data = nil)
    require_relative 'entity/bazel_entity'
    BazelEntity.new(self, data)
  end


  # Canonical facade: client.BazelActionResult.list / client.BazelActionResult.load({ "id" => ... })
  def BazelActionResult(data = nil)
    require_relative 'entity/bazel_action_result_entity'
    BazelActionResultEntity.new(self, data)
  end


  # Canonical facade: client.BazelBackend.list / client.BazelBackend.load({ "id" => ... })
  def BazelBackend(data = nil)
    require_relative 'entity/bazel_backend_entity'
    BazelBackendEntity.new(self, data)
  end


  # Canonical facade: client.BazelBlob.list / client.BazelBlob.load({ "id" => ... })
  def BazelBlob(data = nil)
    require_relative 'entity/bazel_blob_entity'
    BazelBlobEntity.new(self, data)
  end


  # Canonical facade: client.BazelExecution.list / client.BazelExecution.load({ "id" => ... })
  def BazelExecution(data = nil)
    require_relative 'entity/bazel_execution_entity'
    BazelExecutionEntity.new(self, data)
  end


  # Canonical facade: client.BazelFindMissingBlob.list / client.BazelFindMissingBlob.load({ "id" => ... })
  def BazelFindMissingBlob(data = nil)
    require_relative 'entity/bazel_find_missing_blob_entity'
    BazelFindMissingBlobEntity.new(self, data)
  end


  # Canonical facade: client.Billing.list / client.Billing.load({ "id" => ... })
  def Billing(data = nil)
    require_relative 'entity/billing_entity'
    BillingEntity.new(self, data)
  end


  # Canonical facade: client.BillingAddon.list / client.BillingAddon.load({ "id" => ... })
  def BillingAddon(data = nil)
    require_relative 'entity/billing_addon_entity'
    BillingAddonEntity.new(self, data)
  end


  # Canonical facade: client.BillingCheckoutSession.list / client.BillingCheckoutSession.load({ "id" => ... })
  def BillingCheckoutSession(data = nil)
    require_relative 'entity/billing_checkout_session_entity'
    BillingCheckoutSessionEntity.new(self, data)
  end


  # Canonical facade: client.BillingInvoice.list / client.BillingInvoice.load({ "id" => ... })
  def BillingInvoice(data = nil)
    require_relative 'entity/billing_invoice_entity'
    BillingInvoiceEntity.new(self, data)
  end


  # Canonical facade: client.BillingPackage.list / client.BillingPackage.load({ "id" => ... })
  def BillingPackage(data = nil)
    require_relative 'entity/billing_package_entity'
    BillingPackageEntity.new(self, data)
  end


  # Canonical facade: client.BillingPortalSession.list / client.BillingPortalSession.load({ "id" => ... })
  def BillingPortalSession(data = nil)
    require_relative 'entity/billing_portal_session_entity'
    BillingPortalSessionEntity.new(self, data)
  end


  # Canonical facade: client.BillingPrepaidPeriod.list / client.BillingPrepaidPeriod.load({ "id" => ... })
  def BillingPrepaidPeriod(data = nil)
    require_relative 'entity/billing_prepaid_period_entity'
    BillingPrepaidPeriodEntity.new(self, data)
  end


  # Canonical facade: client.BillingPrepaidPurchase.list / client.BillingPrepaidPurchase.load({ "id" => ... })
  def BillingPrepaidPurchase(data = nil)
    require_relative 'entity/billing_prepaid_purchase_entity'
    BillingPrepaidPurchaseEntity.new(self, data)
  end


  # Canonical facade: client.BillingTokenTopUp.list / client.BillingTokenTopUp.load({ "id" => ... })
  def BillingTokenTopUp(data = nil)
    require_relative 'entity/billing_token_top_up_entity'
    BillingTokenTopUpEntity.new(self, data)
  end


  # Canonical facade: client.BillingUsage.list / client.BillingUsage.load({ "id" => ... })
  def BillingUsage(data = nil)
    require_relative 'entity/billing_usage_entity'
    BillingUsageEntity.new(self, data)
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


  # Canonical facade: client.BookmarkProtectionRefreshGithubRequiredCheck.list / client.BookmarkProtectionRefreshGithubRequiredCheck.load({ "id" => ... })
  def BookmarkProtectionRefreshGithubRequiredCheck(data = nil)
    require_relative 'entity/bookmark_protection_refresh_github_required_check_entity'
    BookmarkProtectionRefreshGithubRequiredCheckEntity.new(self, data)
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


  # Canonical facade: client.CacheNamespaceEntry.list / client.CacheNamespaceEntry.load({ "id" => ... })
  def CacheNamespaceEntry(data = nil)
    require_relative 'entity/cache_namespace_entry_entity'
    CacheNamespaceEntryEntity.new(self, data)
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


  # Canonical facade: client.Change.list / client.Change.load({ "id" => ... })
  def Change(data = nil)
    require_relative 'entity/change_entity'
    ChangeEntity.new(self, data)
  end


  # Canonical facade: client.ChangeAsset.list / client.ChangeAsset.load({ "id" => ... })
  def ChangeAsset(data = nil)
    require_relative 'entity/change_asset_entity'
    ChangeAssetEntity.new(self, data)
  end


  # Canonical facade: client.ChangeComment.list / client.ChangeComment.load({ "id" => ... })
  def ChangeComment(data = nil)
    require_relative 'entity/change_comment_entity'
    ChangeCommentEntity.new(self, data)
  end


  # Canonical facade: client.ChangeFileReviewCheckpoint.list / client.ChangeFileReviewCheckpoint.load({ "id" => ... })
  def ChangeFileReviewCheckpoint(data = nil)
    require_relative 'entity/change_file_review_checkpoint_entity'
    ChangeFileReviewCheckpointEntity.new(self, data)
  end


  # Canonical facade: client.ChangeGitBranchSubmission.list / client.ChangeGitBranchSubmission.load({ "id" => ... })
  def ChangeGitBranchSubmission(data = nil)
    require_relative 'entity/change_git_branch_submission_entity'
    ChangeGitBranchSubmissionEntity.new(self, data)
  end


  # Canonical facade: client.ChangeGitCommitIdentity.list / client.ChangeGitCommitIdentity.load({ "id" => ... })
  def ChangeGitCommitIdentity(data = nil)
    require_relative 'entity/change_git_commit_identity_entity'
    ChangeGitCommitIdentityEntity.new(self, data)
  end


  # Canonical facade: client.ChangeGitPublication.list / client.ChangeGitPublication.load({ "id" => ... })
  def ChangeGitPublication(data = nil)
    require_relative 'entity/change_git_publication_entity'
    ChangeGitPublicationEntity.new(self, data)
  end


  # Canonical facade: client.ChangeGroupMember.list / client.ChangeGroupMember.load({ "id" => ... })
  def ChangeGroupMember(data = nil)
    require_relative 'entity/change_group_member_entity'
    ChangeGroupMemberEntity.new(self, data)
  end


  # Canonical facade: client.ChangeLabel.list / client.ChangeLabel.load({ "id" => ... })
  def ChangeLabel(data = nil)
    require_relative 'entity/change_label_entity'
    ChangeLabelEntity.new(self, data)
  end


  # Canonical facade: client.ChangeLandingHold.list / client.ChangeLandingHold.load({ "id" => ... })
  def ChangeLandingHold(data = nil)
    require_relative 'entity/change_landing_hold_entity'
    ChangeLandingHoldEntity.new(self, data)
  end


  # Canonical facade: client.ChangeLandingRequest.list / client.ChangeLandingRequest.load({ "id" => ... })
  def ChangeLandingRequest(data = nil)
    require_relative 'entity/change_landing_request_entity'
    ChangeLandingRequestEntity.new(self, data)
  end


  # Canonical facade: client.ChangeRequestChange.list / client.ChangeRequestChange.load({ "id" => ... })
  def ChangeRequestChange(data = nil)
    require_relative 'entity/change_request_change_entity'
    ChangeRequestChangeEntity.new(self, data)
  end


  # Canonical facade: client.ChangeReviewer.list / client.ChangeReviewer.load({ "id" => ... })
  def ChangeReviewer(data = nil)
    require_relative 'entity/change_reviewer_entity'
    ChangeReviewerEntity.new(self, data)
  end


  # Canonical facade: client.ChangeTranscript.list / client.ChangeTranscript.load({ "id" => ... })
  def ChangeTranscript(data = nil)
    require_relative 'entity/change_transcript_entity'
    ChangeTranscriptEntity.new(self, data)
  end


  # Canonical facade: client.ChangeTranscriptSummary.list / client.ChangeTranscriptSummary.load({ "id" => ... })
  def ChangeTranscriptSummary(data = nil)
    require_relative 'entity/change_transcript_summary_entity'
    ChangeTranscriptSummaryEntity.new(self, data)
  end


  # Canonical facade: client.CheckpointPrepareChunk.list / client.CheckpointPrepareChunk.load({ "id" => ... })
  def CheckpointPrepareChunk(data = nil)
    require_relative 'entity/checkpoint_prepare_chunk_entity'
    CheckpointPrepareChunkEntity.new(self, data)
  end


  # Canonical facade: client.CiNode.list / client.CiNode.load({ "id" => ... })
  def CiNode(data = nil)
    require_relative 'entity/ci_node_entity'
    CiNodeEntity.new(self, data)
  end


  # Canonical facade: client.CiPipeline.list / client.CiPipeline.load({ "id" => ... })
  def CiPipeline(data = nil)
    require_relative 'entity/ci_pipeline_entity'
    CiPipelineEntity.new(self, data)
  end


  # Canonical facade: client.CiPipelineRun.list / client.CiPipelineRun.load({ "id" => ... })
  def CiPipelineRun(data = nil)
    require_relative 'entity/ci_pipeline_run_entity'
    CiPipelineRunEntity.new(self, data)
  end


  # Canonical facade: client.CiRunnerPool.list / client.CiRunnerPool.load({ "id" => ... })
  def CiRunnerPool(data = nil)
    require_relative 'entity/ci_runner_pool_entity'
    CiRunnerPoolEntity.new(self, data)
  end


  # Canonical facade: client.CiStatus.list / client.CiStatus.load({ "id" => ... })
  def CiStatus(data = nil)
    require_relative 'entity/ci_status_entity'
    CiStatusEntity.new(self, data)
  end


  # Canonical facade: client.CliEvent.list / client.CliEvent.load({ "id" => ... })
  def CliEvent(data = nil)
    require_relative 'entity/cli_event_entity'
    CliEventEntity.new(self, data)
  end


  # Canonical facade: client.CliRelease.list / client.CliRelease.load({ "id" => ... })
  def CliRelease(data = nil)
    require_relative 'entity/cli_release_entity'
    CliReleaseEntity.new(self, data)
  end


  # Canonical facade: client.CloudWorkspaceBackupObject.list / client.CloudWorkspaceBackupObject.load({ "id" => ... })
  def CloudWorkspaceBackupObject(data = nil)
    require_relative 'entity/cloud_workspace_backup_object_entity'
    CloudWorkspaceBackupObjectEntity.new(self, data)
  end


  # Canonical facade: client.CodeRuleEvaluation.list / client.CodeRuleEvaluation.load({ "id" => ... })
  def CodeRuleEvaluation(data = nil)
    require_relative 'entity/code_rule_evaluation_entity'
    CodeRuleEvaluationEntity.new(self, data)
  end


  # Canonical facade: client.ComSiteAccess.list / client.ComSiteAccess.load({ "id" => ... })
  def ComSiteAccess(data = nil)
    require_relative 'entity/com_site_access_entity'
    ComSiteAccessEntity.new(self, data)
  end


  # Canonical facade: client.ComSiteAccessSession.list / client.ComSiteAccessSession.load({ "id" => ... })
  def ComSiteAccessSession(data = nil)
    require_relative 'entity/com_site_access_session_entity'
    ComSiteAccessSessionEntity.new(self, data)
  end


  # Canonical facade: client.CommentThreadComment.list / client.CommentThreadComment.load({ "id" => ... })
  def CommentThreadComment(data = nil)
    require_relative 'entity/comment_thread_comment_entity'
    CommentThreadCommentEntity.new(self, data)
  end


  # Canonical facade: client.CommitDiff.list / client.CommitDiff.load({ "id" => ... })
  def CommitDiff(data = nil)
    require_relative 'entity/commit_diff_entity'
    CommitDiffEntity.new(self, data)
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


  # Canonical facade: client.ContactSubmission.list / client.ContactSubmission.load({ "id" => ... })
  def ContactSubmission(data = nil)
    require_relative 'entity/contact_submission_entity'
    ContactSubmissionEntity.new(self, data)
  end


  # Canonical facade: client.ControlComputer.list / client.ControlComputer.load({ "id" => ... })
  def ControlComputer(data = nil)
    require_relative 'entity/control_computer_entity'
    ControlComputerEntity.new(self, data)
  end


  # Canonical facade: client.ControlComputerControlOperation.list / client.ControlComputerControlOperation.load({ "id" => ... })
  def ControlComputerControlOperation(data = nil)
    require_relative 'entity/control_computer_control_operation_entity'
    ControlComputerControlOperationEntity.new(self, data)
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


  # Canonical facade: client.Deployment.list / client.Deployment.load({ "id" => ... })
  def Deployment(data = nil)
    require_relative 'entity/deployment_entity'
    DeploymentEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentDashboardNomad.list / client.DeploymentDashboardNomad.load({ "id" => ... })
  def DeploymentDashboardNomad(data = nil)
    require_relative 'entity/deployment_dashboard_nomad_entity'
    DeploymentDashboardNomadEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentDetail.list / client.DeploymentDetail.load({ "id" => ... })
  def DeploymentDetail(data = nil)
    require_relative 'entity/deployment_detail_entity'
    DeploymentDetailEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentFile.list / client.DeploymentFile.load({ "id" => ... })
  def DeploymentFile(data = nil)
    require_relative 'entity/deployment_file_entity'
    DeploymentFileEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentLog.list / client.DeploymentLog.load({ "id" => ... })
  def DeploymentLog(data = nil)
    require_relative 'entity/deployment_log_entity'
    DeploymentLogEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentMetric.list / client.DeploymentMetric.load({ "id" => ... })
  def DeploymentMetric(data = nil)
    require_relative 'entity/deployment_metric_entity'
    DeploymentMetricEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentPreview.list / client.DeploymentPreview.load({ "id" => ... })
  def DeploymentPreview(data = nil)
    require_relative 'entity/deployment_preview_entity'
    DeploymentPreviewEntity.new(self, data)
  end


  # Canonical facade: client.DeploymentSetting.list / client.DeploymentSetting.load({ "id" => ... })
  def DeploymentSetting(data = nil)
    require_relative 'entity/deployment_setting_entity'
    DeploymentSettingEntity.new(self, data)
  end


  # Canonical facade: client.DesktopLocalAgentModel.list / client.DesktopLocalAgentModel.load({ "id" => ... })
  def DesktopLocalAgentModel(data = nil)
    require_relative 'entity/desktop_local_agent_model_entity'
    DesktopLocalAgentModelEntity.new(self, data)
  end


  # Canonical facade: client.DesktopLocalAgentResponse.list / client.DesktopLocalAgentResponse.load({ "id" => ... })
  def DesktopLocalAgentResponse(data = nil)
    require_relative 'entity/desktop_local_agent_response_entity'
    DesktopLocalAgentResponseEntity.new(self, data)
  end


  # Canonical facade: client.Device.list / client.Device.load({ "id" => ... })
  def Device(data = nil)
    require_relative 'entity/device_entity'
    DeviceEntity.new(self, data)
  end


  # Canonical facade: client.DeviceBrowserOperation.list / client.DeviceBrowserOperation.load({ "id" => ... })
  def DeviceBrowserOperation(data = nil)
    require_relative 'entity/device_browser_operation_entity'
    DeviceBrowserOperationEntity.new(self, data)
  end


  # Canonical facade: client.DeviceControlMessage.list / client.DeviceControlMessage.load({ "id" => ... })
  def DeviceControlMessage(data = nil)
    require_relative 'entity/device_control_message_entity'
    DeviceControlMessageEntity.new(self, data)
  end


  # Canonical facade: client.DeviceControlOperation.list / client.DeviceControlOperation.load({ "id" => ... })
  def DeviceControlOperation(data = nil)
    require_relative 'entity/device_control_operation_entity'
    DeviceControlOperationEntity.new(self, data)
  end


  # Canonical facade: client.DeviceEnterpriseRelay.list / client.DeviceEnterpriseRelay.load({ "id" => ... })
  def DeviceEnterpriseRelay(data = nil)
    require_relative 'entity/device_enterprise_relay_entity'
    DeviceEnterpriseRelayEntity.new(self, data)
  end


  # Canonical facade: client.DeviceFolderListing.list / client.DeviceFolderListing.load({ "id" => ... })
  def DeviceFolderListing(data = nil)
    require_relative 'entity/device_folder_listing_entity'
    DeviceFolderListingEntity.new(self, data)
  end


  # Canonical facade: client.DeviceGrant.list / client.DeviceGrant.load({ "id" => ... })
  def DeviceGrant(data = nil)
    require_relative 'entity/device_grant_entity'
    DeviceGrantEntity.new(self, data)
  end


  # Canonical facade: client.DeviceInvocation.list / client.DeviceInvocation.load({ "id" => ... })
  def DeviceInvocation(data = nil)
    require_relative 'entity/device_invocation_entity'
    DeviceInvocationEntity.new(self, data)
  end


  # Canonical facade: client.DeviceLocalEvent.list / client.DeviceLocalEvent.load({ "id" => ... })
  def DeviceLocalEvent(data = nil)
    require_relative 'entity/device_local_event_entity'
    DeviceLocalEventEntity.new(self, data)
  end


  # Canonical facade: client.DevicePairing.list / client.DevicePairing.load({ "id" => ... })
  def DevicePairing(data = nil)
    require_relative 'entity/device_pairing_entity'
    DevicePairingEntity.new(self, data)
  end


  # Canonical facade: client.DeviceProject.list / client.DeviceProject.load({ "id" => ... })
  def DeviceProject(data = nil)
    require_relative 'entity/device_project_entity'
    DeviceProjectEntity.new(self, data)
  end


  # Canonical facade: client.DeviceScheduledCheckIn.list / client.DeviceScheduledCheckIn.load({ "id" => ... })
  def DeviceScheduledCheckIn(data = nil)
    require_relative 'entity/device_scheduled_check_in_entity'
    DeviceScheduledCheckInEntity.new(self, data)
  end


  # Canonical facade: client.DockerBuilder.list / client.DockerBuilder.load({ "id" => ... })
  def DockerBuilder(data = nil)
    require_relative 'entity/docker_builder_entity'
    DockerBuilderEntity.new(self, data)
  end


  # Canonical facade: client.DockerBuilderSession.list / client.DockerBuilderSession.load({ "id" => ... })
  def DockerBuilderSession(data = nil)
    require_relative 'entity/docker_builder_session_entity'
    DockerBuilderSessionEntity.new(self, data)
  end


  # Canonical facade: client.DockerBuilderSetting.list / client.DockerBuilderSetting.load({ "id" => ... })
  def DockerBuilderSetting(data = nil)
    require_relative 'entity/docker_builder_setting_entity'
    DockerBuilderSettingEntity.new(self, data)
  end


  # Canonical facade: client.DomainDnsIntegration.list / client.DomainDnsIntegration.load({ "id" => ... })
  def DomainDnsIntegration(data = nil)
    require_relative 'entity/domain_dns_integration_entity'
    DomainDnsIntegrationEntity.new(self, data)
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


  # Canonical facade: client.Edge.list / client.Edge.load({ "id" => ... })
  def Edge(data = nil)
    require_relative 'entity/edge_entity'
    EdgeEntity.new(self, data)
  end


  # Canonical facade: client.EmailVerification.list / client.EmailVerification.load({ "id" => ... })
  def EmailVerification(data = nil)
    require_relative 'entity/email_verification_entity'
    EmailVerificationEntity.new(self, data)
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


  # Canonical facade: client.ExecutionDesiredState.list / client.ExecutionDesiredState.load({ "id" => ... })
  def ExecutionDesiredState(data = nil)
    require_relative 'entity/execution_desired_state_entity'
    ExecutionDesiredStateEntity.new(self, data)
  end


  # Canonical facade: client.ExecutionReconcilerTick.list / client.ExecutionReconcilerTick.load({ "id" => ... })
  def ExecutionReconcilerTick(data = nil)
    require_relative 'entity/execution_reconciler_tick_entity'
    ExecutionReconcilerTickEntity.new(self, data)
  end


  # Canonical facade: client.ExecutionRelease.list / client.ExecutionRelease.load({ "id" => ... })
  def ExecutionRelease(data = nil)
    require_relative 'entity/execution_release_entity'
    ExecutionReleaseEntity.new(self, data)
  end


  # Canonical facade: client.ExecutionRuntimeInstance.list / client.ExecutionRuntimeInstance.load({ "id" => ... })
  def ExecutionRuntimeInstance(data = nil)
    require_relative 'entity/execution_runtime_instance_entity'
    ExecutionRuntimeInstanceEntity.new(self, data)
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


  # Canonical facade: client.Gh.list / client.Gh.load({ "id" => ... })
  def Gh(data = nil)
    require_relative 'entity/gh_entity'
    GhEntity.new(self, data)
  end


  # Canonical facade: client.GitImport.list / client.GitImport.load({ "id" => ... })
  def GitImport(data = nil)
    require_relative 'entity/git_import_entity'
    GitImportEntity.new(self, data)
  end


  # Canonical facade: client.Github.list / client.Github.load({ "id" => ... })
  def Github(data = nil)
    require_relative 'entity/github_entity'
    GithubEntity.new(self, data)
  end


  # Canonical facade: client.GithubApp.list / client.GithubApp.load({ "id" => ... })
  def GithubApp(data = nil)
    require_relative 'entity/github_app_entity'
    GithubAppEntity.new(self, data)
  end


  # Canonical facade: client.GithubAppImportableRepository.list / client.GithubAppImportableRepository.load({ "id" => ... })
  def GithubAppImportableRepository(data = nil)
    require_relative 'entity/github_app_importable_repository_entity'
    GithubAppImportableRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.GithubAppInstallation.list / client.GithubAppInstallation.load({ "id" => ... })
  def GithubAppInstallation(data = nil)
    require_relative 'entity/github_app_installation_entity'
    GithubAppInstallationEntity.new(self, data)
  end


  # Canonical facade: client.GithubAppInstallationAuthorization.list / client.GithubAppInstallationAuthorization.load({ "id" => ... })
  def GithubAppInstallationAuthorization(data = nil)
    require_relative 'entity/github_app_installation_authorization_entity'
    GithubAppInstallationAuthorizationEntity.new(self, data)
  end


  # Canonical facade: client.GithubAppUserAuthorization.list / client.GithubAppUserAuthorization.load({ "id" => ... })
  def GithubAppUserAuthorization(data = nil)
    require_relative 'entity/github_app_user_authorization_entity'
    GithubAppUserAuthorizationEntity.new(self, data)
  end


  # Canonical facade: client.GithubCiRepository.list / client.GithubCiRepository.load({ "id" => ... })
  def GithubCiRepository(data = nil)
    require_relative 'entity/github_ci_repository_entity'
    GithubCiRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.GithubCiRepositoryCompatibilityReport.list / client.GithubCiRepositoryCompatibilityReport.load({ "id" => ... })
  def GithubCiRepositoryCompatibilityReport(data = nil)
    require_relative 'entity/github_ci_repository_compatibility_report_entity'
    GithubCiRepositoryCompatibilityReportEntity.new(self, data)
  end


  # Canonical facade: client.GithubConnection.list / client.GithubConnection.load({ "id" => ... })
  def GithubConnection(data = nil)
    require_relative 'entity/github_connection_entity'
    GithubConnectionEntity.new(self, data)
  end


  # Canonical facade: client.GithubIntegration.list / client.GithubIntegration.load({ "id" => ... })
  def GithubIntegration(data = nil)
    require_relative 'entity/github_integration_entity'
    GithubIntegrationEntity.new(self, data)
  end


  # Canonical facade: client.GithubOnboarding.list / client.GithubOnboarding.load({ "id" => ... })
  def GithubOnboarding(data = nil)
    require_relative 'entity/github_onboarding_entity'
    GithubOnboardingEntity.new(self, data)
  end


  # Canonical facade: client.GithubOnboardingBranch.list / client.GithubOnboardingBranch.load({ "id" => ... })
  def GithubOnboardingBranch(data = nil)
    require_relative 'entity/github_onboarding_branch_entity'
    GithubOnboardingBranchEntity.new(self, data)
  end


  # Canonical facade: client.GithubOnboardingImport.list / client.GithubOnboardingImport.load({ "id" => ... })
  def GithubOnboardingImport(data = nil)
    require_relative 'entity/github_onboarding_import_entity'
    GithubOnboardingImportEntity.new(self, data)
  end


  # Canonical facade: client.GithubOnboardingImportBatch.list / client.GithubOnboardingImportBatch.load({ "id" => ... })
  def GithubOnboardingImportBatch(data = nil)
    require_relative 'entity/github_onboarding_import_batch_entity'
    GithubOnboardingImportBatchEntity.new(self, data)
  end


  # Canonical facade: client.GithubOnboardingImportItem.list / client.GithubOnboardingImportItem.load({ "id" => ... })
  def GithubOnboardingImportItem(data = nil)
    require_relative 'entity/github_onboarding_import_item_entity'
    GithubOnboardingImportItemEntity.new(self, data)
  end


  # Canonical facade: client.GithubPullRequest.list / client.GithubPullRequest.load({ "id" => ... })
  def GithubPullRequest(data = nil)
    require_relative 'entity/github_pull_request_entity'
    GithubPullRequestEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerAdmission.list / client.GithubRunnerAdmission.load({ "id" => ... })
  def GithubRunnerAdmission(data = nil)
    require_relative 'entity/github_runner_admission_entity'
    GithubRunnerAdmissionEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerCache.list / client.GithubRunnerCache.load({ "id" => ... })
  def GithubRunnerCache(data = nil)
    require_relative 'entity/github_runner_cache_entity'
    GithubRunnerCacheEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerEgress.list / client.GithubRunnerEgress.load({ "id" => ... })
  def GithubRunnerEgress(data = nil)
    require_relative 'entity/github_runner_egress_entity'
    GithubRunnerEgressEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerHistory.list / client.GithubRunnerHistory.load({ "id" => ... })
  def GithubRunnerHistory(data = nil)
    require_relative 'entity/github_runner_history_entity'
    GithubRunnerHistoryEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerImage.list / client.GithubRunnerImage.load({ "id" => ... })
  def GithubRunnerImage(data = nil)
    require_relative 'entity/github_runner_image_entity'
    GithubRunnerImageEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerPool.list / client.GithubRunnerPool.load({ "id" => ... })
  def GithubRunnerPool(data = nil)
    require_relative 'entity/github_runner_pool_entity'
    GithubRunnerPoolEntity.new(self, data)
  end


  # Canonical facade: client.GithubRunnerSetup.list / client.GithubRunnerSetup.load({ "id" => ... })
  def GithubRunnerSetup(data = nil)
    require_relative 'entity/github_runner_setup_entity'
    GithubRunnerSetupEntity.new(self, data)
  end


  # Canonical facade: client.Gitlab.list / client.Gitlab.load({ "id" => ... })
  def Gitlab(data = nil)
    require_relative 'entity/gitlab_entity'
    GitlabEntity.new(self, data)
  end


  # Canonical facade: client.GitlabConnection.list / client.GitlabConnection.load({ "id" => ... })
  def GitlabConnection(data = nil)
    require_relative 'entity/gitlab_connection_entity'
    GitlabConnectionEntity.new(self, data)
  end


  # Canonical facade: client.GitlabImport.list / client.GitlabImport.load({ "id" => ... })
  def GitlabImport(data = nil)
    require_relative 'entity/gitlab_import_entity'
    GitlabImportEntity.new(self, data)
  end


  # Canonical facade: client.GitlabOauth.list / client.GitlabOauth.load({ "id" => ... })
  def GitlabOauth(data = nil)
    require_relative 'entity/gitlab_oauth_entity'
    GitlabOauthEntity.new(self, data)
  end


  # Canonical facade: client.GrantAllAgent.list / client.GrantAllAgent.load({ "id" => ... })
  def GrantAllAgent(data = nil)
    require_relative 'entity/grant_all_agent_entity'
    GrantAllAgentEntity.new(self, data)
  end


  # Canonical facade: client.HostingAppDomain.list / client.HostingAppDomain.load({ "id" => ... })
  def HostingAppDomain(data = nil)
    require_relative 'entity/hosting_app_domain_entity'
    HostingAppDomainEntity.new(self, data)
  end


  # Canonical facade: client.IdentityOrganization.list / client.IdentityOrganization.load({ "id" => ... })
  def IdentityOrganization(data = nil)
    require_relative 'entity/identity_organization_entity'
    IdentityOrganizationEntity.new(self, data)
  end


  # Canonical facade: client.ImageRepository.list / client.ImageRepository.load({ "id" => ... })
  def ImageRepository(data = nil)
    require_relative 'entity/image_repository_entity'
    ImageRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.ImageRepositoryTag.list / client.ImageRepositoryTag.load({ "id" => ... })
  def ImageRepositoryTag(data = nil)
    require_relative 'entity/image_repository_tag_entity'
    ImageRepositoryTagEntity.new(self, data)
  end


  # Canonical facade: client.ImportBranchPolicy.list / client.ImportBranchPolicy.load({ "id" => ... })
  def ImportBranchPolicy(data = nil)
    require_relative 'entity/import_branch_policy_entity'
    ImportBranchPolicyEntity.new(self, data)
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


  # Canonical facade: client.InvocationControl.list / client.InvocationControl.load({ "id" => ... })
  def InvocationControl(data = nil)
    require_relative 'entity/invocation_control_entity'
    InvocationControlEntity.new(self, data)
  end


  # Canonical facade: client.JobLogChunk.list / client.JobLogChunk.load({ "id" => ... })
  def JobLogChunk(data = nil)
    require_relative 'entity/job_log_chunk_entity'
    JobLogChunkEntity.new(self, data)
  end


  # Canonical facade: client.JobStep.list / client.JobStep.load({ "id" => ... })
  def JobStep(data = nil)
    require_relative 'entity/job_step_entity'
    JobStepEntity.new(self, data)
  end


  # Canonical facade: client.JobWorkspace.list / client.JobWorkspace.load({ "id" => ... })
  def JobWorkspace(data = nil)
    require_relative 'entity/job_workspace_entity'
    JobWorkspaceEntity.new(self, data)
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


  # Canonical facade: client.Known.list / client.Known.load({ "id" => ... })
  def Known(data = nil)
    require_relative 'entity/known_entity'
    KnownEntity.new(self, data)
  end


  # Canonical facade: client.Label.list / client.Label.load({ "id" => ... })
  def Label(data = nil)
    require_relative 'entity/label_entity'
    LabelEntity.new(self, data)
  end


  # Canonical facade: client.LeaseArtifact.list / client.LeaseArtifact.load({ "id" => ... })
  def LeaseArtifact(data = nil)
    require_relative 'entity/lease_artifact_entity'
    LeaseArtifactEntity.new(self, data)
  end


  # Canonical facade: client.LeaseCache.list / client.LeaseCache.load({ "id" => ... })
  def LeaseCache(data = nil)
    require_relative 'entity/lease_cache_entity'
    LeaseCacheEntity.new(self, data)
  end


  # Canonical facade: client.LeaseLogChunk.list / client.LeaseLogChunk.load({ "id" => ... })
  def LeaseLogChunk(data = nil)
    require_relative 'entity/lease_log_chunk_entity'
    LeaseLogChunkEntity.new(self, data)
  end


  # Canonical facade: client.LeaseReconciliation.list / client.LeaseReconciliation.load({ "id" => ... })
  def LeaseReconciliation(data = nil)
    require_relative 'entity/lease_reconciliation_entity'
    LeaseReconciliationEntity.new(self, data)
  end


  # Canonical facade: client.LeaseStep.list / client.LeaseStep.load({ "id" => ... })
  def LeaseStep(data = nil)
    require_relative 'entity/lease_step_entity'
    LeaseStepEntity.new(self, data)
  end


  # Canonical facade: client.LeaseVerifyDiagnostic.list / client.LeaseVerifyDiagnostic.load({ "id" => ... })
  def LeaseVerifyDiagnostic(data = nil)
    require_relative 'entity/lease_verify_diagnostic_entity'
    LeaseVerifyDiagnosticEntity.new(self, data)
  end


  # Canonical facade: client.LeaseVerifySecret.list / client.LeaseVerifySecret.load({ "id" => ... })
  def LeaseVerifySecret(data = nil)
    require_relative 'entity/lease_verify_secret_entity'
    LeaseVerifySecretEntity.new(self, data)
  end


  # Canonical facade: client.LeaseWorkspace.list / client.LeaseWorkspace.load({ "id" => ... })
  def LeaseWorkspace(data = nil)
    require_relative 'entity/lease_workspace_entity'
    LeaseWorkspaceEntity.new(self, data)
  end


  # Canonical facade: client.LocalAgentDecision.list / client.LocalAgentDecision.load({ "id" => ... })
  def LocalAgentDecision(data = nil)
    require_relative 'entity/local_agent_decision_entity'
    LocalAgentDecisionEntity.new(self, data)
  end


  # Canonical facade: client.LocalAgentResponse.list / client.LocalAgentResponse.load({ "id" => ... })
  def LocalAgentResponse(data = nil)
    require_relative 'entity/local_agent_response_entity'
    LocalAgentResponseEntity.new(self, data)
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


  # Canonical facade: client.LogStreamChunk.list / client.LogStreamChunk.load({ "id" => ... })
  def LogStreamChunk(data = nil)
    require_relative 'entity/log_stream_chunk_entity'
    LogStreamChunkEntity.new(self, data)
  end


  # Canonical facade: client.LogoImage.list / client.LogoImage.load({ "id" => ... })
  def LogoImage(data = nil)
    require_relative 'entity/logo_image_entity'
    LogoImageEntity.new(self, data)
  end


  # Canonical facade: client.MarketingSetting.list / client.MarketingSetting.load({ "id" => ... })
  def MarketingSetting(data = nil)
    require_relative 'entity/marketing_setting_entity'
    MarketingSettingEntity.new(self, data)
  end


  # Canonical facade: client.McpOauth.list / client.McpOauth.load({ "id" => ... })
  def McpOauth(data = nil)
    require_relative 'entity/mcp_oauth_entity'
    McpOauthEntity.new(self, data)
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


  # Canonical facade: client.MergeQueueEntry.list / client.MergeQueueEntry.load({ "id" => ... })
  def MergeQueueEntry(data = nil)
    require_relative 'entity/merge_queue_entry_entity'
    MergeQueueEntryEntity.new(self, data)
  end


  # Canonical facade: client.MergeRequest.list / client.MergeRequest.load({ "id" => ... })
  def MergeRequest(data = nil)
    require_relative 'entity/merge_request_entity'
    MergeRequestEntity.new(self, data)
  end


  # Canonical facade: client.MergeResolution.list / client.MergeResolution.load({ "id" => ... })
  def MergeResolution(data = nil)
    require_relative 'entity/merge_resolution_entity'
    MergeResolutionEntity.new(self, data)
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


  # Canonical facade: client.MetronomeWebhook.list / client.MetronomeWebhook.load({ "id" => ... })
  def MetronomeWebhook(data = nil)
    require_relative 'entity/metronome_webhook_entity'
    MetronomeWebhookEntity.new(self, data)
  end


  # Canonical facade: client.ModelSubscriptionAccount.list / client.ModelSubscriptionAccount.load({ "id" => ... })
  def ModelSubscriptionAccount(data = nil)
    require_relative 'entity/model_subscription_account_entity'
    ModelSubscriptionAccountEntity.new(self, data)
  end


  # Canonical facade: client.ModelSubscriptionAccountConnection.list / client.ModelSubscriptionAccountConnection.load({ "id" => ... })
  def ModelSubscriptionAccountConnection(data = nil)
    require_relative 'entity/model_subscription_account_connection_entity'
    ModelSubscriptionAccountConnectionEntity.new(self, data)
  end


  # Canonical facade: client.NetworkConnection.list / client.NetworkConnection.load({ "id" => ... })
  def NetworkConnection(data = nil)
    require_relative 'entity/network_connection_entity'
    NetworkConnectionEntity.new(self, data)
  end


  # Canonical facade: client.NetworkingSpace.list / client.NetworkingSpace.load({ "id" => ... })
  def NetworkingSpace(data = nil)
    require_relative 'entity/networking_space_entity'
    NetworkingSpaceEntity.new(self, data)
  end


  # Canonical facade: client.Node.list / client.Node.load({ "id" => ... })
  def Node(data = nil)
    require_relative 'entity/node_entity'
    NodeEntity.new(self, data)
  end


  # Canonical facade: client.NodeCertificate.list / client.NodeCertificate.load({ "id" => ... })
  def NodeCertificate(data = nil)
    require_relative 'entity/node_certificate_entity'
    NodeCertificateEntity.new(self, data)
  end


  # Canonical facade: client.NodeLease.list / client.NodeLease.load({ "id" => ... })
  def NodeLease(data = nil)
    require_relative 'entity/node_lease_entity'
    NodeLeaseEntity.new(self, data)
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


  # Canonical facade: client.Now.list / client.Now.load({ "id" => ... })
  def Now(data = nil)
    require_relative 'entity/now_entity'
    NowEntity.new(self, data)
  end


  # Canonical facade: client.ObservabilityClickhouseCluster.list / client.ObservabilityClickhouseCluster.load({ "id" => ... })
  def ObservabilityClickhouseCluster(data = nil)
    require_relative 'entity/observability_clickhouse_cluster_entity'
    ObservabilityClickhouseClusterEntity.new(self, data)
  end


  # Canonical facade: client.ObservabilityQuickwitCluster.list / client.ObservabilityQuickwitCluster.load({ "id" => ... })
  def ObservabilityQuickwitCluster(data = nil)
    require_relative 'entity/observability_quickwit_cluster_entity'
    ObservabilityQuickwitClusterEntity.new(self, data)
  end


  # Canonical facade: client.ObservabilitySpace.list / client.ObservabilitySpace.load({ "id" => ... })
  def ObservabilitySpace(data = nil)
    require_relative 'entity/observability_space_entity'
    ObservabilitySpaceEntity.new(self, data)
  end


  # Canonical facade: client.Openapi.list / client.Openapi.load({ "id" => ... })
  def Openapi(data = nil)
    require_relative 'entity/openapi_entity'
    OpenapiEntity.new(self, data)
  end


  # Canonical facade: client.OrgInvitation.list / client.OrgInvitation.load({ "id" => ... })
  def OrgInvitation(data = nil)
    require_relative 'entity/org_invitation_entity'
    OrgInvitationEntity.new(self, data)
  end


  # Canonical facade: client.Organization.list / client.Organization.load({ "id" => ... })
  def Organization(data = nil)
    require_relative 'entity/organization_entity'
    OrganizationEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationApp.list / client.OrganizationApp.load({ "id" => ... })
  def OrganizationApp(data = nil)
    require_relative 'entity/organization_app_entity'
    OrganizationAppEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationControl.list / client.OrganizationControl.load({ "id" => ... })
  def OrganizationControl(data = nil)
    require_relative 'entity/organization_control_entity'
    OrganizationControlEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationDevice.list / client.OrganizationDevice.load({ "id" => ... })
  def OrganizationDevice(data = nil)
    require_relative 'entity/organization_device_entity'
    OrganizationDeviceEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationIdentityCertificate.list / client.OrganizationIdentityCertificate.load({ "id" => ... })
  def OrganizationIdentityCertificate(data = nil)
    require_relative 'entity/organization_identity_certificate_entity'
    OrganizationIdentityCertificateEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationInteraction.list / client.OrganizationInteraction.load({ "id" => ... })
  def OrganizationInteraction(data = nil)
    require_relative 'entity/organization_interaction_entity'
    OrganizationInteractionEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationInvitation.list / client.OrganizationInvitation.load({ "id" => ... })
  def OrganizationInvitation(data = nil)
    require_relative 'entity/organization_invitation_entity'
    OrganizationInvitationEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationMessageFile.list / client.OrganizationMessageFile.load({ "id" => ... })
  def OrganizationMessageFile(data = nil)
    require_relative 'entity/organization_message_file_entity'
    OrganizationMessageFileEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationOidcTrust.list / client.OrganizationOidcTrust.load({ "id" => ... })
  def OrganizationOidcTrust(data = nil)
    require_relative 'entity/organization_oidc_trust_entity'
    OrganizationOidcTrustEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationRunEvent.list / client.OrganizationRunEvent.load({ "id" => ... })
  def OrganizationRunEvent(data = nil)
    require_relative 'entity/organization_run_event_entity'
    OrganizationRunEventEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationRunOutcome.list / client.OrganizationRunOutcome.load({ "id" => ... })
  def OrganizationRunOutcome(data = nil)
    require_relative 'entity/organization_run_outcome_entity'
    OrganizationRunOutcomeEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationRunUsage.list / client.OrganizationRunUsage.load({ "id" => ... })
  def OrganizationRunUsage(data = nil)
    require_relative 'entity/organization_run_usage_entity'
    OrganizationRunUsageEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationSandbox.list / client.OrganizationSandbox.load({ "id" => ... })
  def OrganizationSandbox(data = nil)
    require_relative 'entity/organization_sandbox_entity'
    OrganizationSandboxEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationSecret.list / client.OrganizationSecret.load({ "id" => ... })
  def OrganizationSecret(data = nil)
    require_relative 'entity/organization_secret_entity'
    OrganizationSecretEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationServiceAccount.list / client.OrganizationServiceAccount.load({ "id" => ... })
  def OrganizationServiceAccount(data = nil)
    require_relative 'entity/organization_service_account_entity'
    OrganizationServiceAccountEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationSetting.list / client.OrganizationSetting.load({ "id" => ... })
  def OrganizationSetting(data = nil)
    require_relative 'entity/organization_setting_entity'
    OrganizationSettingEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationSite.list / client.OrganizationSite.load({ "id" => ... })
  def OrganizationSite(data = nil)
    require_relative 'entity/organization_site_entity'
    OrganizationSiteEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationSubscription.list / client.OrganizationSubscription.load({ "id" => ... })
  def OrganizationSubscription(data = nil)
    require_relative 'entity/organization_subscription_entity'
    OrganizationSubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationTool.list / client.OrganizationTool.load({ "id" => ... })
  def OrganizationTool(data = nil)
    require_relative 'entity/organization_tool_entity'
    OrganizationToolEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationWorkloadIdentity.list / client.OrganizationWorkloadIdentity.load({ "id" => ... })
  def OrganizationWorkloadIdentity(data = nil)
    require_relative 'entity/organization_workload_identity_entity'
    OrganizationWorkloadIdentityEntity.new(self, data)
  end


  # Canonical facade: client.OtelIngest.list / client.OtelIngest.load({ "id" => ... })
  def OtelIngest(data = nil)
    require_relative 'entity/otel_ingest_entity'
    OtelIngestEntity.new(self, data)
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


  # Canonical facade: client.PageArtefact.list / client.PageArtefact.load({ "id" => ... })
  def PageArtefact(data = nil)
    require_relative 'entity/page_artefact_entity'
    PageArtefactEntity.new(self, data)
  end


  # Canonical facade: client.PageCiPipelineRun.list / client.PageCiPipelineRun.load({ "id" => ... })
  def PageCiPipelineRun(data = nil)
    require_relative 'entity/page_ci_pipeline_run_entity'
    PageCiPipelineRunEntity.new(self, data)
  end


  # Canonical facade: client.PageProjectRun.list / client.PageProjectRun.load({ "id" => ... })
  def PageProjectRun(data = nil)
    require_relative 'entity/page_project_run_entity'
    PageProjectRunEntity.new(self, data)
  end


  # Canonical facade: client.PageRepoVcCommit.list / client.PageRepoVcCommit.load({ "id" => ... })
  def PageRepoVcCommit(data = nil)
    require_relative 'entity/page_repo_vc_commit_entity'
    PageRepoVcCommitEntity.new(self, data)
  end


  # Canonical facade: client.PagesBilling.list / client.PagesBilling.load({ "id" => ... })
  def PagesBilling(data = nil)
    require_relative 'entity/pages_billing_entity'
    PagesBillingEntity.new(self, data)
  end


  # Canonical facade: client.PagesGithubOnboarding.list / client.PagesGithubOnboarding.load({ "id" => ... })
  def PagesGithubOnboarding(data = nil)
    require_relative 'entity/pages_github_onboarding_entity'
    PagesGithubOnboardingEntity.new(self, data)
  end


  # Canonical facade: client.PagesMember.list / client.PagesMember.load({ "id" => ... })
  def PagesMember(data = nil)
    require_relative 'entity/pages_member_entity'
    PagesMemberEntity.new(self, data)
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


  # Canonical facade: client.PagesRegistry.list / client.PagesRegistry.load({ "id" => ... })
  def PagesRegistry(data = nil)
    require_relative 'entity/pages_registry_entity'
    PagesRegistryEntity.new(self, data)
  end


  # Canonical facade: client.PagesSession.list / client.PagesSession.load({ "id" => ... })
  def PagesSession(data = nil)
    require_relative 'entity/pages_session_entity'
    PagesSessionEntity.new(self, data)
  end


  # Canonical facade: client.Pairing.list / client.Pairing.load({ "id" => ... })
  def Pairing(data = nil)
    require_relative 'entity/pairing_entity'
    PairingEntity.new(self, data)
  end


  # Canonical facade: client.PairingEvent.list / client.PairingEvent.load({ "id" => ... })
  def PairingEvent(data = nil)
    require_relative 'entity/pairing_event_entity'
    PairingEventEntity.new(self, data)
  end


  # Canonical facade: client.ParallelV1.list / client.ParallelV1.load({ "id" => ... })
  def ParallelV1(data = nil)
    require_relative 'entity/parallel_v1_entity'
    ParallelV1Entity.new(self, data)
  end


  # Canonical facade: client.PatchsetDiff.list / client.PatchsetDiff.load({ "id" => ... })
  def PatchsetDiff(data = nil)
    require_relative 'entity/patchset_diff_entity'
    PatchsetDiffEntity.new(self, data)
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


  # Canonical facade: client.ProactiveAgentWaitlistEntry.list / client.ProactiveAgentWaitlistEntry.load({ "id" => ... })
  def ProactiveAgentWaitlistEntry(data = nil)
    require_relative 'entity/proactive_agent_waitlist_entry_entity'
    ProactiveAgentWaitlistEntryEntity.new(self, data)
  end


  # Canonical facade: client.Product.list / client.Product.load({ "id" => ... })
  def Product(data = nil)
    require_relative 'entity/product_entity'
    ProductEntity.new(self, data)
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


  # Canonical facade: client.PullRequestAction.list / client.PullRequestAction.load({ "id" => ... })
  def PullRequestAction(data = nil)
    require_relative 'entity/pull_request_action_entity'
    PullRequestActionEntity.new(self, data)
  end


  # Canonical facade: client.PullRequestMagicMerge.list / client.PullRequestMagicMerge.load({ "id" => ... })
  def PullRequestMagicMerge(data = nil)
    require_relative 'entity/pull_request_magic_merge_entity'
    PullRequestMagicMergeEntity.new(self, data)
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


  # Canonical facade: client.PullRequestTranscript.list / client.PullRequestTranscript.load({ "id" => ... })
  def PullRequestTranscript(data = nil)
    require_relative 'entity/pull_request_transcript_entity'
    PullRequestTranscriptEntity.new(self, data)
  end


  # Canonical facade: client.PullZone.list / client.PullZone.load({ "id" => ... })
  def PullZone(data = nil)
    require_relative 'entity/pull_zone_entity'
    PullZoneEntity.new(self, data)
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


  # Canonical facade: client.RelayAgentConnection.list / client.RelayAgentConnection.load({ "id" => ... })
  def RelayAgentConnection(data = nil)
    require_relative 'entity/relay_agent_connection_entity'
    RelayAgentConnectionEntity.new(self, data)
  end


  # Canonical facade: client.RelayAgentLocalThread.list / client.RelayAgentLocalThread.load({ "id" => ... })
  def RelayAgentLocalThread(data = nil)
    require_relative 'entity/relay_agent_local_thread_entity'
    RelayAgentLocalThreadEntity.new(self, data)
  end


  # Canonical facade: client.RelaySignal.list / client.RelaySignal.load({ "id" => ... })
  def RelaySignal(data = nil)
    require_relative 'entity/relay_signal_entity'
    RelaySignalEntity.new(self, data)
  end


  # Canonical facade: client.ReleaseRollout.list / client.ReleaseRollout.load({ "id" => ... })
  def ReleaseRollout(data = nil)
    require_relative 'entity/release_rollout_entity'
    ReleaseRolloutEntity.new(self, data)
  end


  # Canonical facade: client.Repo.list / client.Repo.load({ "id" => ... })
  def Repo(data = nil)
    require_relative 'entity/repo_entity'
    RepoEntity.new(self, data)
  end


  # Canonical facade: client.RepoAccessToken.list / client.RepoAccessToken.load({ "id" => ... })
  def RepoAccessToken(data = nil)
    require_relative 'entity/repo_access_token_entity'
    RepoAccessTokenEntity.new(self, data)
  end


  # Canonical facade: client.RepoAction.list / client.RepoAction.load({ "id" => ... })
  def RepoAction(data = nil)
    require_relative 'entity/repo_action_entity'
    RepoActionEntity.new(self, data)
  end


  # Canonical facade: client.RepoAgentCheckpoint.list / client.RepoAgentCheckpoint.load({ "id" => ... })
  def RepoAgentCheckpoint(data = nil)
    require_relative 'entity/repo_agent_checkpoint_entity'
    RepoAgentCheckpointEntity.new(self, data)
  end


  # Canonical facade: client.RepoAgentSession.list / client.RepoAgentSession.load({ "id" => ... })
  def RepoAgentSession(data = nil)
    require_relative 'entity/repo_agent_session_entity'
    RepoAgentSessionEntity.new(self, data)
  end


  # Canonical facade: client.RepoBookmarkProtection.list / client.RepoBookmarkProtection.load({ "id" => ... })
  def RepoBookmarkProtection(data = nil)
    require_relative 'entity/repo_bookmark_protection_entity'
    RepoBookmarkProtectionEntity.new(self, data)
  end


  # Canonical facade: client.RepoBookmarkProtectionEvent.list / client.RepoBookmarkProtectionEvent.load({ "id" => ... })
  def RepoBookmarkProtectionEvent(data = nil)
    require_relative 'entity/repo_bookmark_protection_event_entity'
    RepoBookmarkProtectionEventEntity.new(self, data)
  end


  # Canonical facade: client.RepoCloudWorkspaceBackup.list / client.RepoCloudWorkspaceBackup.load({ "id" => ... })
  def RepoCloudWorkspaceBackup(data = nil)
    require_relative 'entity/repo_cloud_workspace_backup_entity'
    RepoCloudWorkspaceBackupEntity.new(self, data)
  end


  # Canonical facade: client.RepoCodeRule.list / client.RepoCodeRule.load({ "id" => ... })
  def RepoCodeRule(data = nil)
    require_relative 'entity/repo_code_rule_entity'
    RepoCodeRuleEntity.new(self, data)
  end


  # Canonical facade: client.RepoSetting.list / client.RepoSetting.load({ "id" => ... })
  def RepoSetting(data = nil)
    require_relative 'entity/repo_setting_entity'
    RepoSettingEntity.new(self, data)
  end


  # Canonical facade: client.RepoStat.list / client.RepoStat.load({ "id" => ... })
  def RepoStat(data = nil)
    require_relative 'entity/repo_stat_entity'
    RepoStatEntity.new(self, data)
  end


  # Canonical facade: client.RepoVc.list / client.RepoVc.load({ "id" => ... })
  def RepoVc(data = nil)
    require_relative 'entity/repo_vc_entity'
    RepoVcEntity.new(self, data)
  end


  # Canonical facade: client.RepoVcCommit.list / client.RepoVcCommit.load({ "id" => ... })
  def RepoVcCommit(data = nil)
    require_relative 'entity/repo_vc_commit_entity'
    RepoVcCommitEntity.new(self, data)
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


  # Canonical facade: client.RepositoryAccess.list / client.RepositoryAccess.load({ "id" => ... })
  def RepositoryAccess(data = nil)
    require_relative 'entity/repository_access_entity'
    RepositoryAccessEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryAccessResolve.list / client.RepositoryAccessResolve.load({ "id" => ... })
  def RepositoryAccessResolve(data = nil)
    require_relative 'entity/repository_access_resolve_entity'
    RepositoryAccessResolveEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryEvent.list / client.RepositoryEvent.load({ "id" => ... })
  def RepositoryEvent(data = nil)
    require_relative 'entity/repository_event_entity'
    RepositoryEventEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryImport.list / client.RepositoryImport.load({ "id" => ... })
  def RepositoryImport(data = nil)
    require_relative 'entity/repository_import_entity'
    RepositoryImportEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryImportSession.list / client.RepositoryImportSession.load({ "id" => ... })
  def RepositoryImportSession(data = nil)
    require_relative 'entity/repository_import_session_entity'
    RepositoryImportSessionEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryImportSessionRepository.list / client.RepositoryImportSessionRepository.load({ "id" => ... })
  def RepositoryImportSessionRepository(data = nil)
    require_relative 'entity/repository_import_session_repository_entity'
    RepositoryImportSessionRepositoryEntity.new(self, data)
  end


  # Canonical facade: client.RepositoryImportSessionSelection.list / client.RepositoryImportSessionSelection.load({ "id" => ... })
  def RepositoryImportSessionSelection(data = nil)
    require_relative 'entity/repository_import_session_selection_entity'
    RepositoryImportSessionSelectionEntity.new(self, data)
  end


  # Canonical facade: client.RepositorySandboxEnvironment.list / client.RepositorySandboxEnvironment.load({ "id" => ... })
  def RepositorySandboxEnvironment(data = nil)
    require_relative 'entity/repository_sandbox_environment_entity'
    RepositorySandboxEnvironmentEntity.new(self, data)
  end


  # Canonical facade: client.RoderCodeRepair.list / client.RoderCodeRepair.load({ "id" => ... })
  def RoderCodeRepair(data = nil)
    require_relative 'entity/roder_code_repair_entity'
    RoderCodeRepairEntity.new(self, data)
  end


  # Canonical facade: client.RoderCodeRepairSetting.list / client.RoderCodeRepairSetting.load({ "id" => ... })
  def RoderCodeRepairSetting(data = nil)
    require_relative 'entity/roder_code_repair_setting_entity'
    RoderCodeRepairSettingEntity.new(self, data)
  end


  # Canonical facade: client.RoderMachine.list / client.RoderMachine.load({ "id" => ... })
  def RoderMachine(data = nil)
    require_relative 'entity/roder_machine_entity'
    RoderMachineEntity.new(self, data)
  end


  # Canonical facade: client.RoderRun.list / client.RoderRun.load({ "id" => ... })
  def RoderRun(data = nil)
    require_relative 'entity/roder_run_entity'
    RoderRunEntity.new(self, data)
  end


  # Canonical facade: client.RoderWorkspaceCredential.list / client.RoderWorkspaceCredential.load({ "id" => ... })
  def RoderWorkspaceCredential(data = nil)
    require_relative 'entity/roder_workspace_credential_entity'
    RoderWorkspaceCredentialEntity.new(self, data)
  end


  # Canonical facade: client.RunArtifact.list / client.RunArtifact.load({ "id" => ... })
  def RunArtifact(data = nil)
    require_relative 'entity/run_artifact_entity'
    RunArtifactEntity.new(self, data)
  end


  # Canonical facade: client.RunJob.list / client.RunJob.load({ "id" => ... })
  def RunJob(data = nil)
    require_relative 'entity/run_job_entity'
    RunJobEntity.new(self, data)
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


  # Canonical facade: client.RunWorkspaceCredential.list / client.RunWorkspaceCredential.load({ "id" => ... })
  def RunWorkspaceCredential(data = nil)
    require_relative 'entity/run_workspace_credential_entity'
    RunWorkspaceCredentialEntity.new(self, data)
  end


  # Canonical facade: client.RunnerLease.list / client.RunnerLease.load({ "id" => ... })
  def RunnerLease(data = nil)
    require_relative 'entity/runner_lease_entity'
    RunnerLeaseEntity.new(self, data)
  end


  # Canonical facade: client.RunnerPoolNodeEnrollmentToken.list / client.RunnerPoolNodeEnrollmentToken.load({ "id" => ... })
  def RunnerPoolNodeEnrollmentToken(data = nil)
    require_relative 'entity/runner_pool_node_enrollment_token_entity'
    RunnerPoolNodeEnrollmentTokenEntity.new(self, data)
  end


  # Canonical facade: client.RunnerPoolRunner.list / client.RunnerPoolRunner.load({ "id" => ... })
  def RunnerPoolRunner(data = nil)
    require_relative 'entity/runner_pool_runner_entity'
    RunnerPoolRunnerEntity.new(self, data)
  end


  # Canonical facade: client.RuntimeInstanceHealthSnapshot.list / client.RuntimeInstanceHealthSnapshot.load({ "id" => ... })
  def RuntimeInstanceHealthSnapshot(data = nil)
    require_relative 'entity/runtime_instance_health_snapshot_entity'
    RuntimeInstanceHealthSnapshotEntity.new(self, data)
  end


  # Canonical facade: client.SandboxIntegration.list / client.SandboxIntegration.load({ "id" => ... })
  def SandboxIntegration(data = nil)
    require_relative 'entity/sandbox_integration_entity'
    SandboxIntegrationEntity.new(self, data)
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


  # Canonical facade: client.SecretGrant.list / client.SecretGrant.load({ "id" => ... })
  def SecretGrant(data = nil)
    require_relative 'entity/secret_grant_entity'
    SecretGrantEntity.new(self, data)
  end


  # Canonical facade: client.SecretVersion.list / client.SecretVersion.load({ "id" => ... })
  def SecretVersion(data = nil)
    require_relative 'entity/secret_version_entity'
    SecretVersionEntity.new(self, data)
  end


  # Canonical facade: client.ServiceEndpoint.list / client.ServiceEndpoint.load({ "id" => ... })
  def ServiceEndpoint(data = nil)
    require_relative 'entity/service_endpoint_entity'
    ServiceEndpointEntity.new(self, data)
  end


  # Canonical facade: client.Setting.list / client.Setting.load({ "id" => ... })
  def Setting(data = nil)
    require_relative 'entity/setting_entity'
    SettingEntity.new(self, data)
  end


  # Canonical facade: client.SettingMutationLease.list / client.SettingMutationLease.load({ "id" => ... })
  def SettingMutationLease(data = nil)
    require_relative 'entity/setting_mutation_lease_entity'
    SettingMutationLeaseEntity.new(self, data)
  end


  # Canonical facade: client.Signal.list / client.Signal.load({ "id" => ... })
  def Signal(data = nil)
    require_relative 'entity/signal_entity'
    SignalEntity.new(self, data)
  end


  # Canonical facade: client.SignalInbound.list / client.SignalInbound.load({ "id" => ... })
  def SignalInbound(data = nil)
    require_relative 'entity/signal_inbound_entity'
    SignalInboundEntity.new(self, data)
  end


  # Canonical facade: client.SignalIntegration.list / client.SignalIntegration.load({ "id" => ... })
  def SignalIntegration(data = nil)
    require_relative 'entity/signal_integration_entity'
    SignalIntegrationEntity.new(self, data)
  end


  # Canonical facade: client.SignalIntegrationDelivery.list / client.SignalIntegrationDelivery.load({ "id" => ... })
  def SignalIntegrationDelivery(data = nil)
    require_relative 'entity/signal_integration_delivery_entity'
    SignalIntegrationDeliveryEntity.new(self, data)
  end


  # Canonical facade: client.SignalIntegrationTarget.list / client.SignalIntegrationTarget.load({ "id" => ... })
  def SignalIntegrationTarget(data = nil)
    require_relative 'entity/signal_integration_target_entity'
    SignalIntegrationTargetEntity.new(self, data)
  end


  # Canonical facade: client.SignalSubscription.list / client.SignalSubscription.load({ "id" => ... })
  def SignalSubscription(data = nil)
    require_relative 'entity/signal_subscription_entity'
    SignalSubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.Site.list / client.Site.load({ "id" => ... })
  def Site(data = nil)
    require_relative 'entity/site_entity'
    SiteEntity.new(self, data)
  end


  # Canonical facade: client.SiteAccessKey.list / client.SiteAccessKey.load({ "id" => ... })
  def SiteAccessKey(data = nil)
    require_relative 'entity/site_access_key_entity'
    SiteAccessKeyEntity.new(self, data)
  end


  # Canonical facade: client.SitePreview.list / client.SitePreview.load({ "id" => ... })
  def SitePreview(data = nil)
    require_relative 'entity/site_preview_entity'
    SitePreviewEntity.new(self, data)
  end


  # Canonical facade: client.SiteSecret.list / client.SiteSecret.load({ "id" => ... })
  def SiteSecret(data = nil)
    require_relative 'entity/site_secret_entity'
    SiteSecretEntity.new(self, data)
  end


  # Canonical facade: client.SlackChannel.list / client.SlackChannel.load({ "id" => ... })
  def SlackChannel(data = nil)
    require_relative 'entity/slack_channel_entity'
    SlackChannelEntity.new(self, data)
  end


  # Canonical facade: client.SourceConnection.list / client.SourceConnection.load({ "id" => ... })
  def SourceConnection(data = nil)
    require_relative 'entity/source_connection_entity'
    SourceConnectionEntity.new(self, data)
  end


  # Canonical facade: client.SpaceAlertRule.list / client.SpaceAlertRule.load({ "id" => ... })
  def SpaceAlertRule(data = nil)
    require_relative 'entity/space_alert_rule_entity'
    SpaceAlertRuleEntity.new(self, data)
  end


  # Canonical facade: client.SpaceAuditEvent.list / client.SpaceAuditEvent.load({ "id" => ... })
  def SpaceAuditEvent(data = nil)
    require_relative 'entity/space_audit_event_entity'
    SpaceAuditEventEntity.new(self, data)
  end


  # Canonical facade: client.SpaceDnsRecord.list / client.SpaceDnsRecord.load({ "id" => ... })
  def SpaceDnsRecord(data = nil)
    require_relative 'entity/space_dns_record_entity'
    SpaceDnsRecordEntity.new(self, data)
  end


  # Canonical facade: client.SpaceEnrollmentToken.list / client.SpaceEnrollmentToken.load({ "id" => ... })
  def SpaceEnrollmentToken(data = nil)
    require_relative 'entity/space_enrollment_token_entity'
    SpaceEnrollmentTokenEntity.new(self, data)
  end


  # Canonical facade: client.SpaceGateway.list / client.SpaceGateway.load({ "id" => ... })
  def SpaceGateway(data = nil)
    require_relative 'entity/space_gateway_entity'
    SpaceGatewayEntity.new(self, data)
  end


  # Canonical facade: client.SpaceGroup.list / client.SpaceGroup.load({ "id" => ... })
  def SpaceGroup(data = nil)
    require_relative 'entity/space_group_entity'
    SpaceGroupEntity.new(self, data)
  end


  # Canonical facade: client.SpaceGroupMembership.list / client.SpaceGroupMembership.load({ "id" => ... })
  def SpaceGroupMembership(data = nil)
    require_relative 'entity/space_group_membership_entity'
    SpaceGroupMembershipEntity.new(self, data)
  end


  # Canonical facade: client.SpaceLogStream.list / client.SpaceLogStream.load({ "id" => ... })
  def SpaceLogStream(data = nil)
    require_relative 'entity/space_log_stream_entity'
    SpaceLogStreamEntity.new(self, data)
  end


  # Canonical facade: client.SpaceMetricSery.list / client.SpaceMetricSery.load({ "id" => ... })
  def SpaceMetricSery(data = nil)
    require_relative 'entity/space_metric_sery_entity'
    SpaceMetricSeryEntity.new(self, data)
  end


  # Canonical facade: client.SpaceOtelCollector.list / client.SpaceOtelCollector.load({ "id" => ... })
  def SpaceOtelCollector(data = nil)
    require_relative 'entity/space_otel_collector_entity'
    SpaceOtelCollectorEntity.new(self, data)
  end


  # Canonical facade: client.SpacePeer.list / client.SpacePeer.load({ "id" => ... })
  def SpacePeer(data = nil)
    require_relative 'entity/space_peer_entity'
    SpacePeerEntity.new(self, data)
  end


  # Canonical facade: client.SpacePeerAttachment.list / client.SpacePeerAttachment.load({ "id" => ... })
  def SpacePeerAttachment(data = nil)
    require_relative 'entity/space_peer_attachment_entity'
    SpacePeerAttachmentEntity.new(self, data)
  end


  # Canonical facade: client.SpacePolicy.list / client.SpacePolicy.load({ "id" => ... })
  def SpacePolicy(data = nil)
    require_relative 'entity/space_policy_entity'
    SpacePolicyEntity.new(self, data)
  end


  # Canonical facade: client.SpaceSegment.list / client.SpaceSegment.load({ "id" => ... })
  def SpaceSegment(data = nil)
    require_relative 'entity/space_segment_entity'
    SpaceSegmentEntity.new(self, data)
  end


  # Canonical facade: client.SpaceTraceSpan.list / client.SpaceTraceSpan.load({ "id" => ... })
  def SpaceTraceSpan(data = nil)
    require_relative 'entity/space_trace_span_entity'
    SpaceTraceSpanEntity.new(self, data)
  end


  # Canonical facade: client.Spark.list / client.Spark.load({ "id" => ... })
  def Spark(data = nil)
    require_relative 'entity/spark_entity'
    SparkEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentIntegration.list / client.SparkAgentIntegration.load({ "id" => ... })
  def SparkAgentIntegration(data = nil)
    require_relative 'entity/spark_agent_integration_entity'
    SparkAgentIntegrationEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentLocalThread.list / client.SparkAgentLocalThread.load({ "id" => ... })
  def SparkAgentLocalThread(data = nil)
    require_relative 'entity/spark_agent_local_thread_entity'
    SparkAgentLocalThreadEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentSite.list / client.SparkAgentSite.load({ "id" => ... })
  def SparkAgentSite(data = nil)
    require_relative 'entity/spark_agent_site_entity'
    SparkAgentSiteEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentSkill.list / client.SparkAgentSkill.load({ "id" => ... })
  def SparkAgentSkill(data = nil)
    require_relative 'entity/spark_agent_skill_entity'
    SparkAgentSkillEntity.new(self, data)
  end


  # Canonical facade: client.SparkAgentThread.list / client.SparkAgentThread.load({ "id" => ... })
  def SparkAgentThread(data = nil)
    require_relative 'entity/spark_agent_thread_entity'
    SparkAgentThreadEntity.new(self, data)
  end


  # Canonical facade: client.SparkCredit.list / client.SparkCredit.load({ "id" => ... })
  def SparkCredit(data = nil)
    require_relative 'entity/spark_credit_entity'
    SparkCreditEntity.new(self, data)
  end


  # Canonical facade: client.SparkCreditAgentUsage.list / client.SparkCreditAgentUsage.load({ "id" => ... })
  def SparkCreditAgentUsage(data = nil)
    require_relative 'entity/spark_credit_agent_usage_entity'
    SparkCreditAgentUsageEntity.new(self, data)
  end


  # Canonical facade: client.SparkCreditUsageTotal.list / client.SparkCreditUsageTotal.load({ "id" => ... })
  def SparkCreditUsageTotal(data = nil)
    require_relative 'entity/spark_credit_usage_total_entity'
    SparkCreditUsageTotalEntity.new(self, data)
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


  # Canonical facade: client.StatusChange.list / client.StatusChange.load({ "id" => ... })
  def StatusChange(data = nil)
    require_relative 'entity/status_change_entity'
    StatusChangeEntity.new(self, data)
  end


  # Canonical facade: client.StatusCommit.list / client.StatusCommit.load({ "id" => ... })
  def StatusCommit(data = nil)
    require_relative 'entity/status_commit_entity'
    StatusCommitEntity.new(self, data)
  end


  # Canonical facade: client.StatusPatchset.list / client.StatusPatchset.load({ "id" => ... })
  def StatusPatchset(data = nil)
    require_relative 'entity/status_patchset_entity'
    StatusPatchsetEntity.new(self, data)
  end


  # Canonical facade: client.StripeWebhook.list / client.StripeWebhook.load({ "id" => ... })
  def StripeWebhook(data = nil)
    require_relative 'entity/stripe_webhook_entity'
    StripeWebhookEntity.new(self, data)
  end


  # Canonical facade: client.SubmitTelemetry.list / client.SubmitTelemetry.load({ "id" => ... })
  def SubmitTelemetry(data = nil)
    require_relative 'entity/submit_telemetry_entity'
    SubmitTelemetryEntity.new(self, data)
  end


  # Canonical facade: client.SubscriptionModel.list / client.SubscriptionModel.load({ "id" => ... })
  def SubscriptionModel(data = nil)
    require_relative 'entity/subscription_model_entity'
    SubscriptionModelEntity.new(self, data)
  end


  # Canonical facade: client.SwarmEvent.list / client.SwarmEvent.load({ "id" => ... })
  def SwarmEvent(data = nil)
    require_relative 'entity/swarm_event_entity'
    SwarmEventEntity.new(self, data)
  end


  # Canonical facade: client.SwarmLive.list / client.SwarmLive.load({ "id" => ... })
  def SwarmLive(data = nil)
    require_relative 'entity/swarm_live_entity'
    SwarmLiveEntity.new(self, data)
  end


  # Canonical facade: client.SwarmNote.list / client.SwarmNote.load({ "id" => ... })
  def SwarmNote(data = nil)
    require_relative 'entity/swarm_note_entity'
    SwarmNoteEntity.new(self, data)
  end


  # Canonical facade: client.SwarmTask.list / client.SwarmTask.load({ "id" => ... })
  def SwarmTask(data = nil)
    require_relative 'entity/swarm_task_entity'
    SwarmTaskEntity.new(self, data)
  end


  # Canonical facade: client.TaskLease.list / client.TaskLease.load({ "id" => ... })
  def TaskLease(data = nil)
    require_relative 'entity/task_lease_entity'
    TaskLeaseEntity.new(self, data)
  end


  # Canonical facade: client.ThreadPreview.list / client.ThreadPreview.load({ "id" => ... })
  def ThreadPreview(data = nil)
    require_relative 'entity/thread_preview_entity'
    ThreadPreviewEntity.new(self, data)
  end


  # Canonical facade: client.ThreadPreviewAccess.list / client.ThreadPreviewAccess.load({ "id" => ... })
  def ThreadPreviewAccess(data = nil)
    require_relative 'entity/thread_preview_access_entity'
    ThreadPreviewAccessEntity.new(self, data)
  end


  # Canonical facade: client.ToolFeedback.list / client.ToolFeedback.load({ "id" => ... })
  def ToolFeedback(data = nil)
    require_relative 'entity/tool_feedback_entity'
    ToolFeedbackEntity.new(self, data)
  end


  # Canonical facade: client.Transcript.list / client.Transcript.load({ "id" => ... })
  def Transcript(data = nil)
    require_relative 'entity/transcript_entity'
    TranscriptEntity.new(self, data)
  end


  # Canonical facade: client.V1Message.list / client.V1Message.load({ "id" => ... })
  def V1Message(data = nil)
    require_relative 'entity/v1_message_entity'
    V1MessageEntity.new(self, data)
  end


  # Canonical facade: client.VcBranch.list / client.VcBranch.load({ "id" => ... })
  def VcBranch(data = nil)
    require_relative 'entity/vc_branch_entity'
    VcBranchEntity.new(self, data)
  end


  # Canonical facade: client.VcBrowser.list / client.VcBrowser.load({ "id" => ... })
  def VcBrowser(data = nil)
    require_relative 'entity/vc_browser_entity'
    VcBrowserEntity.new(self, data)
  end


  # Canonical facade: client.VcChange.list / client.VcChange.load({ "id" => ... })
  def VcChange(data = nil)
    require_relative 'entity/vc_change_entity'
    VcChangeEntity.new(self, data)
  end


  # Canonical facade: client.VcChangeGroup.list / client.VcChangeGroup.load({ "id" => ... })
  def VcChangeGroup(data = nil)
    require_relative 'entity/vc_change_group_entity'
    VcChangeGroupEntity.new(self, data)
  end


  # Canonical facade: client.VcFile.list / client.VcFile.load({ "id" => ... })
  def VcFile(data = nil)
    require_relative 'entity/vc_file_entity'
    VcFileEntity.new(self, data)
  end


  # Canonical facade: client.VcMergeQueue.list / client.VcMergeQueue.load({ "id" => ... })
  def VcMergeQueue(data = nil)
    require_relative 'entity/vc_merge_queue_entity'
    VcMergeQueueEntity.new(self, data)
  end


  # Canonical facade: client.VcStack.list / client.VcStack.load({ "id" => ... })
  def VcStack(data = nil)
    require_relative 'entity/vc_stack_entity'
    VcStackEntity.new(self, data)
  end


  # Canonical facade: client.VcsNode.list / client.VcsNode.load({ "id" => ... })
  def VcsNode(data = nil)
    require_relative 'entity/vcs_node_entity'
    VcsNodeEntity.new(self, data)
  end


  # Canonical facade: client.VcsSetting.list / client.VcsSetting.load({ "id" => ... })
  def VcsSetting(data = nil)
    require_relative 'entity/vcs_setting_entity'
    VcsSettingEntity.new(self, data)
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


  # Canonical facade: client.VerifyEmailVerification.list / client.VerifyEmailVerification.load({ "id" => ... })
  def VerifyEmailVerification(data = nil)
    require_relative 'entity/verify_email_verification_entity'
    VerifyEmailVerificationEntity.new(self, data)
  end


  # Canonical facade: client.VerifySignalIntegration.list / client.VerifySignalIntegration.load({ "id" => ... })
  def VerifySignalIntegration(data = nil)
    require_relative 'entity/verify_signal_integration_entity'
    VerifySignalIntegrationEntity.new(self, data)
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


  # Canonical facade: client.WaitlistApplication.list / client.WaitlistApplication.load({ "id" => ... })
  def WaitlistApplication(data = nil)
    require_relative 'entity/waitlist_application_entity'
    WaitlistApplicationEntity.new(self, data)
  end


  # Canonical facade: client.WebBotAuth.list / client.WebBotAuth.load({ "id" => ... })
  def WebBotAuth(data = nil)
    require_relative 'entity/web_bot_auth_entity'
    WebBotAuthEntity.new(self, data)
  end


  # Canonical facade: client.WebhookGitlab.list / client.WebhookGitlab.load({ "id" => ... })
  def WebhookGitlab(data = nil)
    require_relative 'entity/webhook_gitlab_entity'
    WebhookGitlabEntity.new(self, data)
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


  # Canonical facade: client.WorkspaceActivity.list / client.WorkspaceActivity.load({ "id" => ... })
  def WorkspaceActivity(data = nil)
    require_relative 'entity/workspace_activity_entity'
    WorkspaceActivityEntity.new(self, data)
  end


  # Canonical facade: client.WorkspaceActivityNotification.list / client.WorkspaceActivityNotification.load({ "id" => ... })
  def WorkspaceActivityNotification(data = nil)
    require_relative 'entity/workspace_activity_notification_entity'
    WorkspaceActivityNotificationEntity.new(self, data)
  end


  # Canonical facade: client.WorkspaceSpace.list / client.WorkspaceSpace.load({ "id" => ... })
  def WorkspaceSpace(data = nil)
    require_relative 'entity/workspace_space_entity'
    WorkspaceSpaceEntity.new(self, data)
  end


  # Canonical facade: client.WorkspaceSpacePreference.list / client.WorkspaceSpacePreference.load({ "id" => ... })
  def WorkspaceSpacePreference(data = nil)
    require_relative 'entity/workspace_space_preference_entity'
    WorkspaceSpacePreferenceEntity.new(self, data)
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
