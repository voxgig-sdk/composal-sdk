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
    "A2aWellKnown" => "a2a_well_known",
    "AdminOrg" => "admin_org",
    "Agent" => "agent",
    "AgentApp" => "agent_app",
    "AgentAppInstall" => "agent_app_install",
    "AgentAttachment" => "agent_attachment",
    "AgentAutomation" => "agent_automation",
    "AgentAvatar" => "agent_avatar",
    "AgentCommand" => "agent_command",
    "AgentComputer" => "agent_computer",
    "AgentConnection" => "agent_connection",
    "AgentConnectionDelegation" => "agent_connection_delegation",
    "AgentConnectionGrant" => "agent_connection_grant",
    "AgentConnectionResource" => "agent_connection_resource",
    "AgentConnectionSafetyControl" => "agent_connection_safety_control",
    "AgentConnectionTriggerSubscription" => "agent_connection_trigger_subscription",
    "AgentContextCheckpoint" => "agent_context_checkpoint",
    "AgentControlFlow" => "agent_control_flow",
    "AgentCoordination" => "agent_coordination",
    "AgentEmail" => "agent_email",
    "AgentEvent" => "agent_event",
    "AgentFile" => "agent_file",
    "AgentInput" => "agent_input",
    "AgentIntegration" => "agent_integration",
    "AgentIntegrationAccount" => "agent_integration_account",
    "AgentIntegrationCallback" => "agent_integration_callback",
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
    "AgentRelayFileGrant" => "agent_relay_file_grant",
    "AgentRelayFileGrantAccount" => "agent_relay_file_grant_account",
    "AgentRepository" => "agent_repository",
    "AgentResource" => "agent_resource",
    "AgentRoder" => "agent_roder",
    "AgentRoutine" => "agent_routine",
    "AgentRun" => "agent_run",
    "AgentRuntime" => "agent_runtime",
    "AgentSession" => "agent_session",
    "AgentSessionCheckpoint" => "agent_session_checkpoint",
    "AgentSessionRoderHandoff" => "agent_session_roder_handoff",
    "AgentSetting" => "agent_setting",
    "AgentSharing" => "agent_sharing",
    "AgentSite" => "agent_site",
    "AgentSkill" => "agent_skill",
    "AgentSlack" => "agent_slack",
    "AgentSubagent" => "agent_subagent",
    "AgentSubscription" => "agent_subscription",
    "AgentSwarm" => "agent_swarm",
    "AgentTeammate" => "agent_teammate",
    "AgentTerminal" => "agent_terminal",
    "AgentThread" => "agent_thread",
    "AgentTool" => "agent_tool",
    "AgentUsage" => "agent_usage",
    "AgentVerifyProject" => "agent_verify_project",
    "AgentWait" => "agent_wait",
    "AgentWebPreview" => "agent_web_preview",
    "AgentWebhook" => "agent_webhook",
    "AgentWork" => "agent_work",
    "AgentWorkflow" => "agent_workflow",
    "AgentWorkflowProposal" => "agent_workflow_proposal",
    "AgentWorkflowRun" => "agent_workflow_run",
    "AgentWorkflowTrigger" => "agent_workflow_trigger",
    "AgentWorkspace" => "agent_workspace",
    "AgentWritePermission" => "agent_write_permission",
    "Agreement" => "agreement",
    "AgreementAccessRequest" => "agreement_access_request",
    "AlertRuleEvent" => "alert_rule_event",
    "AllocationLog" => "allocation_log",
    "App" => "app",
    "AppAccess" => "app_access",
    "AppAccessJwk" => "app_access_jwk",
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
    "Artefact" => "artefact",
    "ArtefactCommentThread" => "artefact_comment_thread",
    "ArtefactRevision" => "artefact_revision",
    "ArtefactViewToken" => "artefact_view_token",
    "Artifact" => "artifact",
    "ArtifactCacheNamespace" => "artifact_cache_namespace",
    "ArtifactImageRepository" => "artifact_image_repository",
    "ArtifactPackageMirror" => "artifact_package_mirror",
    "ArtifactRetentionPolicy" => "artifact_retention_policy",
    "AttachmentPart" => "attachment_part",
    "AuditEvent" => "audit_event",
    "Auth" => "auth",
    "AuthCli" => "auth_cli",
    "AuthGithub" => "auth_github",
    "AuthGoogle" => "auth_google",
    "AuthOpenai" => "auth_openai",
    "AuthPasswordReset" => "auth_password_reset",
    "AuthRegistrationOption" => "auth_registration_option",
    "AutomationEvent" => "automation_event",
    "AutomationRun" => "automation_run",
    "BackendRunnerPool" => "backend_runner_pool",
    "Bazel" => "bazel",
    "BazelActionResult" => "bazel_action_result",
    "BazelBackend" => "bazel_backend",
    "BazelBlob" => "bazel_blob",
    "BazelExecution" => "bazel_execution",
    "BazelFindMissingBlob" => "bazel_find_missing_blob",
    "Billing" => "billing",
    "BillingAddon" => "billing_addon",
    "BillingBudget" => "billing_budget",
    "BillingCheckoutSession" => "billing_checkout_session",
    "BillingContact" => "billing_contact",
    "BillingExtraSpend" => "billing_extra_spend",
    "BillingInvoice" => "billing_invoice",
    "BillingPackage" => "billing_package",
    "BillingPortalSession" => "billing_portal_session",
    "BillingPrepaidPeriod" => "billing_prepaid_period",
    "BillingPrepaidPurchase" => "billing_prepaid_purchase",
    "BillingSubscription" => "billing_subscription",
    "BillingTokenTopUp" => "billing_token_top_up",
    "BillingUsage" => "billing_usage",
    "Binary" => "binary",
    "BinaryVersion" => "binary_version",
    "BookmarkProtectionRefreshGithubRequiredCheck" => "bookmark_protection_refresh_github_required_check",
    "BrowserEgressCandidate" => "browser_egress_candidate",
    "BrowserSession" => "browser_session",
    "BrowserSessionConnection" => "browser_session_connection",
    "BrowserSessionControl" => "browser_session_control",
    "BrowserSessionEvent" => "browser_session_event",
    "BrowserSessionMedia" => "browser_session_media",
    "BrowserSessionRecording" => "browser_session_recording",
    "BrowserSessionScreenshot" => "browser_session_screenshot",
    "BrowserSessionTask" => "browser_session_task",
    "CacheNamespaceEntry" => "cache_namespace_entry",
    "CatalogSelector" => "catalog_selector",
    "CdnDeployment" => "cdn_deployment",
    "CdnHostname" => "cdn_hostname",
    "CdnSpace" => "cdn_space",
    "CdnSpaceObject" => "cdn_space_object",
    "Change" => "change",
    "ChangeAsset" => "change_asset",
    "ChangeComment" => "change_comment",
    "ChangeFileReviewCheckpoint" => "change_file_review_checkpoint",
    "ChangeGitBranchSubmission" => "change_git_branch_submission",
    "ChangeGitCommitIdentity" => "change_git_commit_identity",
    "ChangeGitPublication" => "change_git_publication",
    "ChangeGroupMember" => "change_group_member",
    "ChangeLabel" => "change_label",
    "ChangeLandingHold" => "change_landing_hold",
    "ChangeLandingRequest" => "change_landing_request",
    "ChangeRequestChange" => "change_request_change",
    "ChangeReviewer" => "change_reviewer",
    "ChangeTranscript" => "change_transcript",
    "ChangeTranscriptSummary" => "change_transcript_summary",
    "CheckpointPrepareChunk" => "checkpoint_prepare_chunk",
    "CiNode" => "ci_node",
    "CiPipeline" => "ci_pipeline",
    "CiPipelineRun" => "ci_pipeline_run",
    "CiRunnerPool" => "ci_runner_pool",
    "CiStatus" => "ci_status",
    "CliEvent" => "cli_event",
    "CliRelease" => "cli_release",
    "CloudWorkspaceBackupObject" => "cloud_workspace_backup_object",
    "CodeRuleEvaluation" => "code_rule_evaluation",
    "ComSiteAccess" => "com_site_access",
    "ComSiteAccessSession" => "com_site_access_session",
    "CommentThreadComment" => "comment_thread_comment",
    "CommitDiff" => "commit_diff",
    "ConnectionRequest" => "connection_request",
    "ConnectionSource" => "connection_source",
    "ContactSubmission" => "contact_submission",
    "ControlComputer" => "control_computer",
    "ControlComputerControlOperation" => "control_computer_control_operation",
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
    "Deployment" => "deployment",
    "DeploymentDashboardNomad" => "deployment_dashboard_nomad",
    "DeploymentDetail" => "deployment_detail",
    "DeploymentFile" => "deployment_file",
    "DeploymentLog" => "deployment_log",
    "DeploymentMetric" => "deployment_metric",
    "DeploymentPreview" => "deployment_preview",
    "DeploymentSetting" => "deployment_setting",
    "DesktopLocalAgentModel" => "desktop_local_agent_model",
    "DesktopLocalAgentResponse" => "desktop_local_agent_response",
    "Device" => "device",
    "DeviceBrowserOperation" => "device_browser_operation",
    "DeviceControlMessage" => "device_control_message",
    "DeviceControlOperation" => "device_control_operation",
    "DeviceEnterpriseRelay" => "device_enterprise_relay",
    "DeviceFolderListing" => "device_folder_listing",
    "DeviceGrant" => "device_grant",
    "DeviceInvocation" => "device_invocation",
    "DeviceLocalEvent" => "device_local_event",
    "DevicePairing" => "device_pairing",
    "DeviceProject" => "device_project",
    "DeviceScheduledCheckIn" => "device_scheduled_check_in",
    "DockerBuilder" => "docker_builder",
    "DockerBuilderSession" => "docker_builder_session",
    "DockerBuilderSetting" => "docker_builder_setting",
    "DomainDnsIntegration" => "domain_dns_integration",
    "DomainPathRule" => "domain_path_rule",
    "Dream" => "dream",
    "Edge" => "edge",
    "EmailVerification" => "email_verification",
    "Environment" => "environment",
    "EnvironmentDiscoveryRun" => "environment_discovery_run",
    "EnvironmentExploration" => "environment_exploration",
    "EnvironmentFirstRun" => "environment_first_run",
    "EnvironmentRevision" => "environment_revision",
    "EnvironmentSecretBinding" => "environment_secret_binding",
    "EnvironmentTestAccount" => "environment_test_account",
    "Evidence" => "evidence",
    "ExecutionDesiredState" => "execution_desired_state",
    "ExecutionReconcilerTick" => "execution_reconciler_tick",
    "ExecutionRelease" => "execution_release",
    "ExecutionRuntimeInstance" => "execution_runtime_instance",
    "Exploration" => "exploration",
    "ExplorationMessage" => "exploration_message",
    "ExplorationReport" => "exploration_report",
    "ExplorationScenario" => "exploration_scenario",
    "Finding" => "finding",
    "Gh" => "gh",
    "GitImport" => "git_import",
    "Github" => "github",
    "GithubApp" => "github_app",
    "GithubAppImportableRepository" => "github_app_importable_repository",
    "GithubAppInstallation" => "github_app_installation",
    "GithubAppInstallationAuthorization" => "github_app_installation_authorization",
    "GithubAppUserAuthorization" => "github_app_user_authorization",
    "GithubCiRepository" => "github_ci_repository",
    "GithubCiRepositoryCompatibilityReport" => "github_ci_repository_compatibility_report",
    "GithubConnection" => "github_connection",
    "GithubIntegration" => "github_integration",
    "GithubOnboarding" => "github_onboarding",
    "GithubOnboardingBranch" => "github_onboarding_branch",
    "GithubOnboardingImport" => "github_onboarding_import",
    "GithubOnboardingImportBatch" => "github_onboarding_import_batch",
    "GithubOnboardingImportItem" => "github_onboarding_import_item",
    "GithubPullRequest" => "github_pull_request",
    "GithubRunnerAdmission" => "github_runner_admission",
    "GithubRunnerCache" => "github_runner_cache",
    "GithubRunnerEgress" => "github_runner_egress",
    "GithubRunnerHistory" => "github_runner_history",
    "GithubRunnerImage" => "github_runner_image",
    "GithubRunnerPool" => "github_runner_pool",
    "GithubRunnerSetup" => "github_runner_setup",
    "Gitlab" => "gitlab",
    "GitlabConnection" => "gitlab_connection",
    "GitlabImport" => "gitlab_import",
    "GitlabOauth" => "gitlab_oauth",
    "GrantAllAgent" => "grant_all_agent",
    "HostingAppDomain" => "hosting_app_domain",
    "IdentityOrganization" => "identity_organization",
    "ImageRepository" => "image_repository",
    "ImageRepositoryTag" => "image_repository_tag",
    "ImportBranchPolicy" => "import_branch_policy",
    "Integration" => "integration",
    "InteractionResponse" => "interaction_response",
    "Invitation" => "invitation",
    "InvocationControl" => "invocation_control",
    "JobLogChunk" => "job_log_chunk",
    "JobStep" => "job_step",
    "JobWorkspace" => "job_workspace",
    "JourneyVariantReplay" => "journey_variant_replay",
    "Knowledge" => "knowledge",
    "Known" => "known",
    "Label" => "label",
    "LeaseArtifact" => "lease_artifact",
    "LeaseCache" => "lease_cache",
    "LeaseLogChunk" => "lease_log_chunk",
    "LeaseReconciliation" => "lease_reconciliation",
    "LeaseStep" => "lease_step",
    "LeaseVerifyDiagnostic" => "lease_verify_diagnostic",
    "LeaseVerifySecret" => "lease_verify_secret",
    "LeaseWorkspace" => "lease_workspace",
    "LocalAgentDecision" => "local_agent_decision",
    "LocalAgentResponse" => "local_agent_response",
    "LocalThreadDelivery" => "local_thread_delivery",
    "LocalThreadOperation" => "local_thread_operation",
    "Location" => "location",
    "LogStreamChunk" => "log_stream_chunk",
    "LogoImage" => "logo_image",
    "MarketingSetting" => "marketing_setting",
    "McpOauth" => "mcp_oauth",
    "Me" => "me",
    "MeEmail" => "me_email",
    "MeOnboarding" => "me_onboarding",
    "MediaFile" => "media_file",
    "Member" => "member",
    "Memory" => "memory",
    "MergeQueueEntry" => "merge_queue_entry",
    "MergeRequest" => "merge_request",
    "MergeResolution" => "merge_resolution",
    "MessagingConversationMessage" => "messaging_conversation_message",
    "MessagingConversationUpload" => "messaging_conversation_upload",
    "MetricQuery" => "metric_query",
    "MetronomeWebhook" => "metronome_webhook",
    "ModelSubscriptionAccount" => "model_subscription_account",
    "ModelSubscriptionAccountConnection" => "model_subscription_account_connection",
    "NetworkConnection" => "network_connection",
    "NetworkingSpace" => "networking_space",
    "Node" => "node",
    "NodeCertificate" => "node_certificate",
    "NodeLease" => "node_lease",
    "NomadAllocation" => "nomad_allocation",
    "NomadLog" => "nomad_log",
    "Now" => "now",
    "ObservabilityClickhouseCluster" => "observability_clickhouse_cluster",
    "ObservabilityQuickwitCluster" => "observability_quickwit_cluster",
    "ObservabilitySpace" => "observability_space",
    "Openapi" => "openapi",
    "OrgInvitation" => "org_invitation",
    "Organization" => "organization",
    "OrganizationApp" => "organization_app",
    "OrganizationControl" => "organization_control",
    "OrganizationDevice" => "organization_device",
    "OrganizationIdentityCertificate" => "organization_identity_certificate",
    "OrganizationInteraction" => "organization_interaction",
    "OrganizationInvitation" => "organization_invitation",
    "OrganizationMessageFile" => "organization_message_file",
    "OrganizationOidcTrust" => "organization_oidc_trust",
    "OrganizationRunEvent" => "organization_run_event",
    "OrganizationRunOutcome" => "organization_run_outcome",
    "OrganizationRunUsage" => "organization_run_usage",
    "OrganizationSandbox" => "organization_sandbox",
    "OrganizationSecret" => "organization_secret",
    "OrganizationServiceAccount" => "organization_service_account",
    "OrganizationSetting" => "organization_setting",
    "OrganizationSite" => "organization_site",
    "OrganizationSubscription" => "organization_subscription",
    "OrganizationTool" => "organization_tool",
    "OrganizationWorkloadIdentity" => "organization_workload_identity",
    "OtelIngest" => "otel_ingest",
    "Page" => "page",
    "PageAgent" => "page_agent",
    "PageArtefact" => "page_artefact",
    "PageCiPipelineRun" => "page_ci_pipeline_run",
    "PageProjectRun" => "page_project_run",
    "PageRepoVcCommit" => "page_repo_vc_commit",
    "PagesBilling" => "pages_billing",
    "PagesGithubOnboarding" => "pages_github_onboarding",
    "PagesMember" => "pages_member",
    "PagesProjectCredential" => "pages_project_credential",
    "PagesProjectPersona" => "pages_project_persona",
    "PagesProjectRun" => "pages_project_run",
    "PagesProjectScenario" => "pages_project_scenario",
    "PagesRegistry" => "pages_registry",
    "PagesSession" => "pages_session",
    "Pairing" => "pairing",
    "PairingEvent" => "pairing_event",
    "ParallelV1" => "parallel_v1",
    "PatchsetDiff" => "patchset_diff",
    "PersonalAccessToken" => "personal_access_token",
    "PreviewOperation" => "preview_operation",
    "PreviewProfileSecretBinding" => "preview_profile_secret_binding",
    "PreviewSecret" => "preview_secret",
    "PreviewSharingApproval" => "preview_sharing_approval",
    "ProactiveAgentWaitlistEntry" => "proactive_agent_waitlist_entry",
    "Product" => "product",
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
    "PullRequestAction" => "pull_request_action",
    "PullRequestMagicMerge" => "pull_request_magic_merge",
    "PullRequestSetting" => "pull_request_setting",
    "PullRequestSettingAddRepository" => "pull_request_setting_add_repository",
    "PullRequestSettingDetectComment" => "pull_request_setting_detect_comment",
    "PullRequestTranscript" => "pull_request_transcript",
    "PullZone" => "pull_zone",
    "Recorder" => "recorder",
    "Registry" => "registry",
    "RegistryV2" => "registry_v2",
    "RelayAgentConnection" => "relay_agent_connection",
    "RelayAgentLocalThread" => "relay_agent_local_thread",
    "RelaySignal" => "relay_signal",
    "ReleaseRollout" => "release_rollout",
    "Repo" => "repo",
    "RepoAccessToken" => "repo_access_token",
    "RepoAction" => "repo_action",
    "RepoAgentCheckpoint" => "repo_agent_checkpoint",
    "RepoAgentSession" => "repo_agent_session",
    "RepoBookmarkProtection" => "repo_bookmark_protection",
    "RepoBookmarkProtectionEvent" => "repo_bookmark_protection_event",
    "RepoCloudWorkspaceBackup" => "repo_cloud_workspace_backup",
    "RepoCodeRule" => "repo_code_rule",
    "RepoSetting" => "repo_setting",
    "RepoStat" => "repo_stat",
    "RepoVc" => "repo_vc",
    "RepoVcCommit" => "repo_vc_commit",
    "ReportReplay" => "report_replay",
    "ReportScenario" => "report_scenario",
    "RepositoryAccess" => "repository_access",
    "RepositoryAccessResolve" => "repository_access_resolve",
    "RepositoryEvent" => "repository_event",
    "RepositoryImport" => "repository_import",
    "RepositoryImportSession" => "repository_import_session",
    "RepositoryImportSessionRepository" => "repository_import_session_repository",
    "RepositoryImportSessionSelection" => "repository_import_session_selection",
    "RepositorySandboxEnvironment" => "repository_sandbox_environment",
    "RoderCodeRepair" => "roder_code_repair",
    "RoderCodeRepairSetting" => "roder_code_repair_setting",
    "RoderMachine" => "roder_machine",
    "RoderRun" => "roder_run",
    "RoderWorkspaceCredential" => "roder_workspace_credential",
    "RunArtifact" => "run_artifact",
    "RunJob" => "run_job",
    "RunScenarioRun" => "run_scenario_run",
    "RunScheduleOption" => "run_schedule_option",
    "RunSearch" => "run_search",
    "RunUpdate" => "run_update",
    "RunWorkspaceCredential" => "run_workspace_credential",
    "RunnerLease" => "runner_lease",
    "RunnerPoolNodeEnrollmentToken" => "runner_pool_node_enrollment_token",
    "RunnerPoolRunner" => "runner_pool_runner",
    "RuntimeInstanceHealthSnapshot" => "runtime_instance_health_snapshot",
    "SandboxIntegration" => "sandbox_integration",
    "ScenarioRevision" => "scenario_revision",
    "ScenarioRunLesson" => "scenario_run_lesson",
    "ScenarioRunScenarioEdit" => "scenario_run_scenario_edit",
    "SecretGrant" => "secret_grant",
    "SecretVersion" => "secret_version",
    "ServiceEndpoint" => "service_endpoint",
    "Setting" => "setting",
    "SettingMutationLease" => "setting_mutation_lease",
    "Signal" => "signal",
    "SignalInbound" => "signal_inbound",
    "SignalIntegration" => "signal_integration",
    "SignalIntegrationDelivery" => "signal_integration_delivery",
    "SignalIntegrationTarget" => "signal_integration_target",
    "SignalSubscription" => "signal_subscription",
    "Site" => "site",
    "SiteAccessKey" => "site_access_key",
    "SitePreview" => "site_preview",
    "SiteSecret" => "site_secret",
    "SlackChannel" => "slack_channel",
    "SourceConnection" => "source_connection",
    "SpaceAlertRule" => "space_alert_rule",
    "SpaceAuditEvent" => "space_audit_event",
    "SpaceDnsRecord" => "space_dns_record",
    "SpaceEnrollmentToken" => "space_enrollment_token",
    "SpaceGateway" => "space_gateway",
    "SpaceGroup" => "space_group",
    "SpaceGroupMembership" => "space_group_membership",
    "SpaceLogStream" => "space_log_stream",
    "SpaceMetricSery" => "space_metric_sery",
    "SpaceOtelCollector" => "space_otel_collector",
    "SpacePeer" => "space_peer",
    "SpacePeerAttachment" => "space_peer_attachment",
    "SpacePolicy" => "space_policy",
    "SpaceSegment" => "space_segment",
    "SpaceTraceSpan" => "space_trace_span",
    "Spark" => "spark",
    "SparkAgentIntegration" => "spark_agent_integration",
    "SparkAgentLocalThread" => "spark_agent_local_thread",
    "SparkAgentSite" => "spark_agent_site",
    "SparkAgentSkill" => "spark_agent_skill",
    "SparkAgentThread" => "spark_agent_thread",
    "SparkCredit" => "spark_credit",
    "SparkCreditAgentUsage" => "spark_credit_agent_usage",
    "SparkCreditUsageTotal" => "spark_credit_usage_total",
    "StaticSite" => "static_site",
    "StaticSiteDeployment" => "static_site_deployment",
    "StaticSiteDomain" => "static_site_domain",
    "StatusChange" => "status_change",
    "StatusCommit" => "status_commit",
    "StatusPatchset" => "status_patchset",
    "StripeWebhook" => "stripe_webhook",
    "SubmitTelemetry" => "submit_telemetry",
    "SubscriptionModel" => "subscription_model",
    "SwarmEvent" => "swarm_event",
    "SwarmLive" => "swarm_live",
    "SwarmNote" => "swarm_note",
    "SwarmTask" => "swarm_task",
    "TaskLease" => "task_lease",
    "ThreadPreview" => "thread_preview",
    "ThreadPreviewAccess" => "thread_preview_access",
    "ToolFeedback" => "tool_feedback",
    "Transcript" => "transcript",
    "V1Message" => "v1_message",
    "VcBranch" => "vc_branch",
    "VcBrowser" => "vc_browser",
    "VcChange" => "vc_change",
    "VcChangeGroup" => "vc_change_group",
    "VcFile" => "vc_file",
    "VcMergeQueue" => "vc_merge_queue",
    "VcStack" => "vc_stack",
    "VcsNode" => "vcs_node",
    "VcsSetting" => "vcs_setting",
    "VerificationProjectCredential" => "verification_project_credential",
    "VerificationProjectPersona" => "verification_project_persona",
    "VerificationProjectRun" => "verification_project_run",
    "VerificationProjectScenario" => "verification_project_scenario",
    "VerifyAppDomain" => "verify_app_domain",
    "VerifyBrowserSession" => "verify_browser_session",
    "VerifyEmailVerification" => "verify_email_verification",
    "VerifySignalIntegration" => "verify_signal_integration",
    "VerifyStaticSiteDomain" => "verify_static_site_domain",
    "VersionLog" => "version_log",
    "WaitlistApplication" => "waitlist_application",
    "WebBotAuth" => "web_bot_auth",
    "WebhookGitlab" => "webhook_gitlab",
    "WorkflowRunStep" => "workflow_run_step",
    "WorkflowRunStopNotice" => "workflow_run_stop_notice",
    "WorkflowTriggerSkipped" => "workflow_trigger_skipped",
    "WorkspaceActivity" => "workspace_activity",
    "WorkspaceActivityNotification" => "workspace_activity_notification",
    "WorkspaceSpace" => "workspace_space",
    "WorkspaceSpacePreference" => "workspace_space_preference",
  }

  # Fixture key => the entity's declared identity field, where it is not "id".
  ID_FIELDS = {
    "proactive_agent_waitlist_entry" => "referral_code",
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
