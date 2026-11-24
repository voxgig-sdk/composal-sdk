# Composal SDK — documentation example COMPLETENESS GATE.
#
# Guarantees every fenced ruby code example across ALL THREE package docs is
# unit-tested. Reads the root ../../README.md, the Ruby ../README.md, and
# ../REFERENCE.md, extracts every fenced ruby block (tagged by source doc +
# index) and enforces:
#
#   1. SYNTAX — 'ruby -c' on every block. Every documented ruby example must
#      parse.
#   2. RUN — every RUNNABLE block (one that constructs the SDK, drives client.,
#      or performs an entity op load/list/create/update/patch/remove) is EXECUTED
#      offline in seeded test mode (ComposalSDK.test) against the real
#      SDK. The captured output is scanned for a real Ruby-level error (undefined
#      method, wrong number of arguments, NameError, ...) REGARDLESS of exit
#      code, so a bug a documented begin/rescue swallows and prints cannot slip
#      through. Expected not-found domain errors are tolerated.
#   3. COMPLETENESS — every block is partitioned into exactly one of
#      {executed, syntaxchecked-nonrunnable, illustration}; the counts must sum
#      to the total. A runnable-looking block that was not executed belongs to
#      no bucket and FAILS the gate.
#
# Ruby is dynamically typed, so syntax + actually running every example is the
# strongest check available without a live server.

require "minitest/autorun"
require "tempfile"
require "open3"
require "tmpdir"

class ReadmeExamplesTest < Minitest::Test
  # The three documentation sources this gate covers.
  DOCS = {
    "root README" => File.join(__dir__, "..", "..", "README.md"),
    "rb README" => File.join(__dir__, "..", "README.md"),
    "rb REFERENCE" => File.join(__dir__, "..", "REFERENCE.md"),
  }
  SDK = File.join(__dir__, "..", "Composal_sdk.rb")
  SDK_CLASS = "ComposalSDK"

  # SDK file basename (no extension) — used to strip the doc's own require of the
  # SDK file from a runnable block (we require it by absolute path).
  SDK_BASE = "Composal_sdk"

  # Entity accessor (client.<Name>) => fixture storage key (lowercase name).
  ENTITIES = {
    "Agent" => "agent",
    "AgentAttachment" => "agent_attachment",
    "AgentAutomation" => "agent_automation",
    "AgentAvatar" => "agent_avatar",
    "AgentCommand" => "agent_command",
    "AgentComputer" => "agent_computer",
    "AgentConnection" => "agent_connection",
    "AgentControlFlow" => "agent_control_flow",
    "AgentCoordination" => "agent_coordination",
    "AgentEmail" => "agent_email",
    "AgentFile" => "agent_file",
    "AgentInput" => "agent_input",
    "AgentIntegration" => "agent_integration",
    "AgentInteraction" => "agent_interaction",
    "AgentLibrary" => "agent_library",
    "AgentManager" => "agent_manager",
    "AgentManagerChoice" => "agent_manager_choice",
    "AgentMarketplace" => "agent_marketplace",
    "AgentMarketplaceShared" => "agent_marketplace_shared",
    "AgentMissionControl" => "agent_mission_control",
    "AgentOperation" => "agent_operation",
    "AgentProvisioning" => "agent_provisioning",
    "AgentPullRequest" => "agent_pull_request",
    "AgentQuestion" => "agent_question",
    "AgentRepository" => "agent_repository",
    "AgentResource" => "agent_resource",
    "AgentRoutine" => "agent_routine",
    "AgentRun" => "agent_run",
    "AgentRuntime" => "agent_runtime",
    "AgentSetting" => "agent_setting",
    "AgentSharing" => "agent_sharing",
    "AgentSite" => "agent_site",
    "AgentSkill" => "agent_skill",
    "AgentSlack" => "agent_slack",
    "AgentSubagent" => "agent_subagent",
    "AgentSubscription" => "agent_subscription",
    "AgentTeammate" => "agent_teammate",
    "AgentTerminal" => "agent_terminal",
    "AgentThread" => "agent_thread",
    "AgentTool" => "agent_tool",
    "AgentVerifyProject" => "agent_verify_project",
    "AgentWait" => "agent_wait",
    "AgentWebhook" => "agent_webhook",
    "AgentWork" => "agent_work",
    "AgentWorkflow" => "agent_workflow",
    "AgentWorkflowProposal" => "agent_workflow_proposal",
    "AgentWorkflowRun" => "agent_workflow_run",
    "AgentWorkflowTrigger" => "agent_workflow_trigger",
    "AgentWorkspace" => "agent_workspace",
    "AgentWritePermission" => "agent_write_permission",
    "AllocationLog" => "allocation_log",
    "App" => "app",
    "AppCdn" => "app_cdn",
    "AppConfigVariable" => "app_config_variable",
    "AppDataResource" => "app_data_resource",
    "AppDeploy" => "app_deploy",
    "AppDeployment" => "app_deployment",
    "AppDeploymentOperation" => "app_deployment_operation",
    "AppDeploymentRollback" => "app_deployment_rollback",
    "AppEnvironment" => "app_environment",
    "AppLocation" => "app_location",
    "AppMetric" => "app_metric",
    "AppPreview" => "app_preview",
    "AppPreviewProfile" => "app_preview_profile",
    "AppRun" => "app_run",
    "AppSecret" => "app_secret",
    "AppService" => "app_service",
    "AppServiceBinding" => "app_service_binding",
    "AppServicePlacement" => "app_service_placement",
    "AppStorageResource" => "app_storage_resource",
    "AttachmentPart" => "attachment_part",
    "AutomationEvent" => "automation_event",
    "AutomationRun" => "automation_run",
    "Binary" => "binary",
    "BinaryVersion" => "binary_version",
    "BrowserEgressCandidate" => "browser_egress_candidate",
    "BrowserSession" => "browser_session",
    "BrowserSessionConnection" => "browser_session_connection",
    "BrowserSessionControl" => "browser_session_control",
    "BrowserSessionEvent" => "browser_session_event",
    "BrowserSessionMedia" => "browser_session_media",
    "BrowserSessionRecording" => "browser_session_recording",
    "BrowserSessionScreenshot" => "browser_session_screenshot",
    "BrowserSessionTask" => "browser_session_task",
    "CatalogSelector" => "catalog_selector",
    "CdnDeployment" => "cdn_deployment",
    "CdnHostname" => "cdn_hostname",
    "CdnSpace" => "cdn_space",
    "CdnSpaceObject" => "cdn_space_object",
    "ConnectionRequest" => "connection_request",
    "ConnectionSource" => "connection_source",
    "CoordinationWait" => "coordination_wait",
    "CredentialSignInCheck" => "credential_sign_in_check",
    "DataResourceRotateCredential" => "data_resource_rotate_credential",
    "DeepScan" => "deep_scan",
    "DeepScanFinding" => "deep_scan_finding",
    "DeepScanFlow" => "deep_scan_flow",
    "DeepScanMappedFlow" => "deep_scan_mapped_flow",
    "DeepScanOption" => "deep_scan_option",
    "DemoShare" => "demo_share",
    "DemoShareSegment" => "demo_share_segment",
    "DeploymentDashboardNomad" => "deployment_dashboard_nomad",
    "DeploymentFile" => "deployment_file",
    "DomainPathRule" => "domain_path_rule",
    "Dream" => "dream",
    "Environment" => "environment",
    "EnvironmentDiscoveryRun" => "environment_discovery_run",
    "EnvironmentExploration" => "environment_exploration",
    "EnvironmentFirstRun" => "environment_first_run",
    "EnvironmentRevision" => "environment_revision",
    "EnvironmentSecretBinding" => "environment_secret_binding",
    "EnvironmentTestAccount" => "environment_test_account",
    "Evidence" => "evidence",
    "Exploration" => "exploration",
    "ExplorationMessage" => "exploration_message",
    "ExplorationReport" => "exploration_report",
    "ExplorationScenario" => "exploration_scenario",
    "Finding" => "finding",
    "GithubConnection" => "github_connection",
    "HostingAppDomain" => "hosting_app_domain",
    "ImageRepository" => "image_repository",
    "Integration" => "integration",
    "InteractionResponse" => "interaction_response",
    "Invitation" => "invitation",
    "JourneyVariantReplay" => "journey_variant_replay",
    "Knowledge" => "knowledge",
    "LocalThreadDelivery" => "local_thread_delivery",
    "LocalThreadOperation" => "local_thread_operation",
    "Location" => "location",
    "Me" => "me",
    "MeEmail" => "me_email",
    "MeOnboarding" => "me_onboarding",
    "MediaFile" => "media_file",
    "Member" => "member",
    "Memory" => "memory",
    "MergeRequest" => "merge_request",
    "MessagingConversationMessage" => "messaging_conversation_message",
    "MessagingConversationUpload" => "messaging_conversation_upload",
    "MetricQuery" => "metric_query",
    "NetworkConnection" => "network_connection",
    "NomadAllocation" => "nomad_allocation",
    "NomadLog" => "nomad_log",
    "Organization" => "organization",
    "Page" => "page",
    "PageAgent" => "page_agent",
    "PageProjectRun" => "page_project_run",
    "PagesProjectCredential" => "pages_project_credential",
    "PagesProjectPersona" => "pages_project_persona",
    "PagesProjectRun" => "pages_project_run",
    "PagesProjectScenario" => "pages_project_scenario",
    "PersonalAccessToken" => "personal_access_token",
    "PreviewOperation" => "preview_operation",
    "PreviewProfileSecretBinding" => "preview_profile_secret_binding",
    "PreviewSecret" => "preview_secret",
    "PreviewSharingApproval" => "preview_sharing_approval",
    "ProductMapIdentityDecision" => "product_map_identity_decision",
    "ProductMapJourney" => "product_map_journey",
    "ProductMapJourneyReplay" => "product_map_journey_replay",
    "ProductMapObservation" => "product_map_observation",
    "ProductMapQuestion" => "product_map_question",
    "ProductMapState" => "product_map_state",
    "Project" => "project",
    "ProjectAndroidApk" => "project_android_apk",
    "ProjectCodeMap" => "project_code_map",
    "ProjectEnvironment" => "project_environment",
    "ProjectFinding" => "project_finding",
    "ProjectFixture" => "project_fixture",
    "ProjectIosApp" => "project_ios_app",
    "ProjectMessagingConversation" => "project_messaging_conversation",
    "ProjectOverviewMetric" => "project_overview_metric",
    "ProjectOverviewPullRequest" => "project_overview_pull_request",
    "ProjectProductMap" => "project_product_map",
    "ProjectRecording" => "project_recording",
    "ProjectRunPlan" => "project_run_plan",
    "ProjectRunSchedule" => "project_run_schedule",
    "ProjectScenarioOption" => "project_scenario_option",
    "ProjectScenarioRow" => "project_scenario_row",
    "ProjectSetting" => "project_setting",
    "PullRequest" => "pull_request",
    "PullRequestSetting" => "pull_request_setting",
    "PullRequestSettingAddRepository" => "pull_request_setting_add_repository",
    "PullRequestSettingDetectComment" => "pull_request_setting_detect_comment",
    "Recorder" => "recorder",
    "Registry" => "registry",
    "RegistryV2" => "registry_v2",
    "RelayAgentLocalThread" => "relay_agent_local_thread",
    "ReportReplay" => "report_replay",
    "ReportScenario" => "report_scenario",
    "RunScenarioRun" => "run_scenario_run",
    "RunScheduleOption" => "run_schedule_option",
    "RunSearch" => "run_search",
    "RunUpdate" => "run_update",
    "ScenarioRevision" => "scenario_revision",
    "ScenarioRunLesson" => "scenario_run_lesson",
    "ScenarioRunScenarioEdit" => "scenario_run_scenario_edit",
    "ServiceEndpoint" => "service_endpoint",
    "SitePreview" => "site_preview",
    "SlackChannel" => "slack_channel",
    "SparkAgentLocalThread" => "spark_agent_local_thread",
    "StaticSite" => "static_site",
    "StaticSiteDeployment" => "static_site_deployment",
    "StaticSiteDomain" => "static_site_domain",
    "SubscriptionModel" => "subscription_model",
    "ThreadPreview" => "thread_preview",
    "VerificationProjectCredential" => "verification_project_credential",
    "VerificationProjectPersona" => "verification_project_persona",
    "VerificationProjectRun" => "verification_project_run",
    "VerificationProjectScenario" => "verification_project_scenario",
    "VerifyAppDomain" => "verify_app_domain",
    "VerifyBrowserSession" => "verify_browser_session",
    "VerifyStaticSiteDomain" => "verify_static_site_domain",
    "VersionLog" => "version_log",
    "WebBotAuth" => "web_bot_auth",
    "WorkflowRunStep" => "workflow_run_step",
    "WorkflowRunStopNotice" => "workflow_run_stop_notice",
    "WorkflowTriggerSkipped" => "workflow_trigger_skipped",
  }

  # Fixture key => the entity's declared identity field, where it is not "id".
  ID_FIELDS = {

  }

  # Documented SDK method names — used only to recognise the NARROW
  # signature/method-table "illustration" class.
  METHODS = %w[options_map get_utility prepare direct data_get data_set match_get match_set make get_name]

  # The client VARIABLE, not the word: a gem or package name carries the word
  # between hyphens (voxgig-sdk-multifon-client-sdk).
  CLIENT = /(?<![\w\-.\/"'])client(?![\w\-\/"'])/

  # Ruby-level errors that indicate a real bug in a documented example (as
  # opposed to an expected not-found / domain error, which is tolerated), and
  # the ScriptError classes an SDK that does not load raises.
  FATAL = /NoMethodError|NameError|ArgumentError|SyntaxError|LoadError|NotImplementedError|undefined method|undefined local variable|uninitialized constant|wrong number of arguments/

  # Extract every fenced ruby block from all three docs, each tagged with its
  # source doc label and its index within that doc.
  def ruby_blocks
    fence = (96.chr) * 3
    blocks = []
    DOCS.each do |label, path|
      assert File.exist?(path), "missing documentation source: #{label}"
      # Explicit UTF-8: the docs contain non-ASCII punctuation, and under a
      # POSIX/US-ASCII locale a default-encoded read makes scan raise
      # ArgumentError (invalid byte sequence).
      File.read(path, encoding: "UTF-8").scan(/#{fence}ruby\r?\n(.*?)#{fence}/m).each_with_index do |a, i|
        blocks << { doc: label, n: i, code: a[0] }
      end
    end
    blocks
  end

  # --- classification -------------------------------------------------------

  # A block is RUNNABLE when it constructs the SDK, drives client., or performs
  # an entity operation. Every runnable block MUST be executed.
  def runnable?(b)
    b =~ /#{Regexp.escape(SDK_CLASS)}\.(?:new|test)\b/ ||
      b =~ /#{CLIENT}\./ ||
      b =~ /\.(?:load|list|create|update|patch|remove)\b/ ? true : false
  end

  # A block "mentions the SDK" when it references the client variable, the SDK
  # class, an entity accessor, or an entity operation. A non-runnable block that
  # mentions the SDK but is not a signature illustration is an uncovered
  # runnable-looking block and must fail the completeness gate.
  def looks_sdk?(b)
    return true if b =~ CLIENT
    return true if b =~ /\b#{Regexp.escape(SDK_CLASS)}\b/
    return true if b =~ /\.(?:load|list|create|update|patch|remove)\b/
    ENTITIES.each_key { |name| return true if b =~ /\.#{Regexp.escape(name)}\b/ }
    false
  end

  # NARROW illustration class: a non-runnable block that references the SDK class
  # or a documented method NAME as a signature / method-table, and never uses a
  # live client variable. This is an explicit, restricted class — not a
  # catch-all — so an unexecuted block that uses a client variable cannot hide here.
  def illustration?(b)
    return false if runnable?(b)
    return false if b =~ CLIENT
    return true if b =~ /\b#{Regexp.escape(SDK_CLASS)}\b/
    METHODS.each { |m| return true if b =~ /\b#{Regexp.escape(m)}\s*\(/ }
    false
  end

  # Partition label for a block: exactly one of the four.
  def classify(b)
    return "executed" if runnable?(b)
    return "illustration" if illustration?(b)
    return "syntaxchecked_nonrunnable" unless looks_sdk?(b)
    "unclassified"
  end

  # --- tests ----------------------------------------------------------------

  def test_docs_have_ruby_examples
    refute_empty ruby_blocks, "docs should contain ruby examples"
  end

  # Every ruby block across all three docs must parse (ruby -c).
  def test_ruby_snippets_have_valid_syntax
    failures = []
    ruby_blocks.each do |blk|
      Tempfile.create(["readme_rb_", ".rb"]) do |f|
        f.write(blk[:code])
        f.flush
        out, status = Open3.capture2e("ruby", "-c", f.path)
        out.force_encoding(Encoding::UTF_8)
        failures << "#{blk[:doc]} ##{blk[:n]}:\n#{out}\n#{blk[:code]}" unless status.success?
      end
    end
    assert_equal [], failures, "docs ruby blocks with syntax errors:\n#{failures.join("\n\n")}"
  end

  # Build the SDK 'entity' fixture option (as Ruby source) for the entities a
  # block references, falling back to seeding all entities when none are named.
  def fixtures_literal(block)
    refs = ENTITIES.select { |name, _| block =~ /#{CLIENT}\.#{Regexp.escape(name)}\b/ }
    refs = ENTITIES if refs.empty?
    entity = {}
    refs.each_value do |storage|
      record = { "id" => "test01" }
      record[ID_FIELDS[storage]] = "test01" if ID_FIELDS.key?(storage)
      entity[storage] = { "test01" => record }
    end
    { "entity" => entity }.inspect
  end

  # Rewrite a runnable block into an executable offline test-mode program: the
  # doc's own require of the SDK file is stripped (we require it by absolute
  # path); any real client constructor (.new/.test) becomes <Sdk>SDK.test(<fixtures>);
  # a block that only uses a client variable gets such a constructor prepended. (The
  # constructor arg-list match is deliberately shallow — it does not span nested
  # parens — because runnable op blocks never build a client inline with a
  # lambda/closure argument.)
  def to_runner(block)
    fixtures = fixtures_literal(block)
    # Drop the doc's own require of the SDK file; we require it by absolute path.
    block = block.gsub(/^[ \t]*require(?:_relative|_once)?[^\n]*#{Regexp.escape(SDK_BASE)}[^\n]*\r?\n?/i, "")
    ctor_re = /#{Regexp.escape(SDK_CLASS)}\.(?:new|test)(?:\([^()]*\))?/
    body =
      if block =~ /#{Regexp.escape(SDK_CLASS)}\.(?:new|test)\b/
        block.gsub(ctor_re) { "#{SDK_CLASS}.test(#{fixtures})" }
      else
        "client = #{SDK_CLASS}.test(#{fixtures})\n" + block
      end
    "require_relative #{SDK.inspect}\n" + body
  end

  # Every RUNNABLE block is executed offline in test mode and must not raise a
  # real Ruby-level error — even one an error-handling example swallows in a
  # rescue and prints: the captured output is scanned for FATAL either way, so a
  # programming error in a documented begin/rescue cannot slip through. Expected
  # domain errors (e.g. "404: Not found") never match FATAL, so caught not-found
  # cases stay tolerated.
  def test_ruby_examples_run_offline
    failures = []
    runnable = ruby_blocks.select { |blk| runnable?(blk[:code]) }
    ran = runnable.length

    # BATCHED. One ruby process for every runnable block, not one each. A
    # spawn per snippet dominated this suite on the large SDKs.
    #
    # Each snippet is loaded inside its own anonymous Module, so constants and
    # methods do not collide, and is bracketed by markers so output is
    # attributed back. The interpreter is SHARED, which is the cost of
    # batching: a snippet that mutates global state or calls exit! affects
    # what follows it.
    #
    # So the batch is not trusted blindly. Any snippet whose END marker never
    # arrives is re-run on its own, in a fresh process, and that isolated
    # result is the one that counts.
    if ran > 0
      Dir.mktmpdir("readme_batch_") do |dir|
        paths = {}
        runnable.each_with_index do |blk, i|
          path = File.join(dir, "snip_#{i}.rb")
          File.write(path, to_runner(blk[:code]))
          paths[i] = path
        end

        driver = File.join(dir, "_driver.rb")
        File.write(driver, batch_driver(paths))
        out, status = Open3.capture2e("ruby", driver)
        # A pipe is tagged with the locale's encoding; the snippets wrote UTF-8.
        out.force_encoding(Encoding::UTF_8)

        runnable.each_with_index do |blk, i|
          seg = batch_segment(out, i)
          code = status.exitstatus
          if seg.nil?
            solo, sstatus = Open3.capture2e("ruby", paths[i])
            solo.force_encoding(Encoding::UTF_8)
            seg = solo
            code = sstatus.exitstatus
          end
          if seg =~ FATAL
            failures << "#{blk[:doc]} ##{blk[:n]} (exit #{code}):\n#{seg}\n#{blk[:code]}"
          end
        end
      end
    end
    assert_operator ran, :>, 0, "expected at least one runnable example to execute"
    assert_equal [], failures, "docs ruby examples raised a real error when run offline:\n#{failures.join("\n\n")}"
  end

  # The batch driver: load each snippet into its own anonymous Module so its
  # constants and methods cannot collide with another's. The at_exit hook is
  # what makes a hard death recoverable — it emits the END marker for whichever
  # snippet was in flight, so the harness can tell "this one died" from "the
  # batch never reached it", and re-run only what it must.
  def batch_driver(paths)
    list = paths.keys.sort.map { |i| [i, paths[i]] }
    <<~DRIVER
      files = #{list.inspect}
      current = nil
      at_exit do
        if current
          puts
          puts "@@VOXEND \#{current}"
        end
      end
      files.each do |(i, path)|
        current = i
        puts
        puts "@@VOXBEGIN \#{i}"
        begin
          Module.new.module_eval(File.read(path, encoding: "UTF-8"), path)
        rescue Exception => e
          puts "FATAL: \#{e.class}: \#{e.message}"
        end
        puts
        puts "@@VOXEND \#{i}"
        current = nil
      end
    DRIVER
  end

  # Output between this snippet's markers, or nil when the END marker is
  # absent — the batch never got past it, so only an isolated re-run can say.
  def batch_segment(text, i)
    b = text.index("@@VOXBEGIN #{i}")
    return nil if b.nil?
    b += "@@VOXBEGIN #{i}".length
    e = text.index("@@VOXEND #{i}", b)
    return nil if e.nil?
    text[b...e].strip
  end

  # COMPLETENESS GATE: every fenced ruby block is partitioned into exactly one of
  # {executed, syntaxchecked-nonrunnable, illustration}. The three counts must
  # sum to the total. A block that references the SDK but is neither runnable (so
  # not executed) nor a narrow signature illustration is "unclassified" — a
  # runnable-looking example that would be silently skipped — and fails the gate.
  def test_ruby_examples_are_completely_classified
    blocks = ruby_blocks
    buckets = { "executed" => [], "syntaxchecked_nonrunnable" => [], "illustration" => [], "unclassified" => [] }
    per_doc = {}
    blocks.each do |blk|
      cls = classify(blk[:code])
      buckets[cls] << blk
      d = (per_doc[blk[:doc]] ||= { "total" => 0, "executed" => 0, "syntaxchecked_nonrunnable" => 0, "illustration" => 0, "unclassified" => 0 })
      d["total"] += 1
      d[cls] += 1
    end

    summary = "ReadmeExamplesTest — ruby example coverage:\n"
    per_doc.each do |doc, c|
      extra = c["unclassified"] > 0 ? " UNCLASSIFIED=#{c["unclassified"]}" : ""
      summary += format("  %-14s total=%d executed=%d syntaxchecked=%d illustration=%d%s\n",
                        doc, c["total"], c["executed"], c["syntaxchecked_nonrunnable"], c["illustration"], extra)
    end
    warn "\n" + summary

    unclassified = buckets["unclassified"].map { |b| "#{b[:doc]} ##{b[:n]}:\n#{b[:code]}" }
    assert_equal [], unclassified,
                 "runnable-looking ruby blocks that were neither executed nor a signature illustration:\n#{unclassified.join("\n\n")}"

    total = blocks.length
    sum = buckets["executed"].length + buckets["syntaxchecked_nonrunnable"].length + buckets["illustration"].length
    assert_equal total, sum,
                 "every ruby block must be executed, syntaxchecked-nonrunnable, or illustration.\n#{summary}"

    assert_operator buckets["executed"].length, :>, 0, "expected at least one executed ruby example"
  end
end
