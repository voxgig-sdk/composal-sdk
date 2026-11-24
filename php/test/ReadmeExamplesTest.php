<?php
declare(strict_types=1);

// Composal SDK — documentation example COMPLETENESS GATE.
//
// Guarantees every fenced php code example across ALL THREE package docs is
// unit-tested. Reads the root ../../README.md, the PHP ../README.md, and
// ../REFERENCE.md, extracts every fenced php block (tagged by source doc +
// index) and enforces:
//
//   1. SYNTAX — 'php -l' on every block (a leading <?php is prepended when the
//      snippet omits one). Every documented php example must parse.
//   2. RUN — every RUNNABLE block (one that constructs the SDK, drives
//      \$client->, or performs an entity op load/list/create/update/patch/remove) is
//      EXECUTED offline in seeded test mode (ComposalSDK::test)
//      against the real SDK. The captured output is scanned for a real
//      PHP-level error (undefined method, wrong-arg-count, TypeError, ...)
//      REGARDLESS of exit code, so a bug a documented try/catch swallows and
//      echoes cannot slip through. Expected not-found domain errors are
//      tolerated.
//   3. COMPLETENESS — every block is partitioned into exactly one of
//      {executed, syntaxchecked-nonrunnable, illustration}; the counts must sum
//      to the total. A runnable-looking block that was not executed belongs to
//      no bucket and FAILS the gate.
//
// PHP is dynamically typed, so syntax + actually running every example is the
// strongest check available without a live server.

require_once __DIR__ . '/../composal_sdk.php';

use PHPUnit\Framework\TestCase;

class ReadmeExamplesTest extends TestCase
{
    private const SDK_CLASS = 'ComposalSDK';

    // SDK file basename (no extension) — used to strip the doc's own require of
    // the SDK file from a runnable block (we require it by absolute path).
    private const SDK_BASE = 'composal_sdk';

    // Entity accessor (\$client->Name()) => fixture storage key (lowercase name).
    private const ENTITIES = [
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
    ];

    // Fixture key => the entity's declared identity field, where it is not "id".
    private const ID_FIELDS = [
        'proactive_agent_waitlist_entry' => 'referral_code',
    ];

    // Documented SDK method names — used only to recognise the NARROW
    // signature/method-table "illustration" class.
    private const METHODS = [
        'options_map', 'get_utility', 'prepare', 'direct',
        'data_get', 'data_set', 'match_get', 'match_set', 'make', 'get_name',
    ];

    // PHP-level errors that indicate a real bug in a documented example (as
    // opposed to an expected not-found / domain error, which is tolerated).
    // A whitelist, so an expected domain error ("404: Not found") that an
    // example deliberately catches stays tolerated.
    //
    // ParseError and "Parse error" are in it because runnable blocks are no
    // longer linted: test_php_snippets_have_valid_syntax now skips anything the
    // run pass executes, on the grounds that running a block proves it parses.
    // That only holds if the run pass can SEE a parse failure — and without
    // these two patterns it could not, so a syntax error in a runnable example
    // would have passed both gates.
    private const FATAL = '/(Call to undefined method|Call to undefined function|Call to a member function|ArgumentCountError|Too few arguments|Undefined constant|Uncaught TypeError|ParseError|Parse error|Allowed memory size|Cannot use object of type)/';

    // The three documentation sources this gate covers.
    private function docs(): array
    {
        return [
            'root README' => __DIR__ . '/../../README.md',
            'php README' => __DIR__ . '/../README.md',
            'php REFERENCE' => __DIR__ . '/../REFERENCE.md',
        ];
    }

    /**
     * Extract every fenced php block from all three docs, each tagged with its
     * source doc label and its index within that doc.
     */
    private function phpBlocks(): array
    {
        $fence = str_repeat(chr(96), 3);
        $pattern = '/' . $fence . 'php\r?\n(.*?)' . $fence . '/s';
        $blocks = [];
        foreach ($this->docs() as $label => $path) {
            $this->assertFileExists($path, 'missing documentation source: ' . $label);
            preg_match_all($pattern, file_get_contents($path), $m);
            foreach ($m[1] as $i => $b) {
                $blocks[] = ['doc' => $label, 'n' => $i, 'code' => $b];
            }
        }
        return $blocks;
    }

    // --- classification -----------------------------------------------------

    /**
     * A block is RUNNABLE when it constructs the SDK, drives \$client->, or
     * performs an entity operation. Every runnable block MUST be executed.
     */
    private function isRunnable(string $b): bool
    {
        $cls = preg_quote(self::SDK_CLASS, '/');
        return preg_match('/new\s+' . $cls . '\b/', $b) === 1
            || preg_match('/' . $cls . '::test\b/', $b) === 1
            || preg_match('/\$client\s*->/', $b) === 1
            || preg_match('/->\s*(?:load|list|create|update|patch|remove)\s*\(/', $b) === 1;
    }

    /**
     * A block "mentions the SDK" when it references the client variable, the SDK
     * class, an entity accessor, or an entity operation. A non-runnable block
     * that mentions the SDK but is not a signature illustration is an uncovered
     * runnable-looking block and must fail the completeness gate.
     */
    private function looksSdk(string $b): bool
    {
        if (preg_match('/\$client\b/', $b) === 1) {
            return true;
        }
        if (preg_match('/\b' . preg_quote(self::SDK_CLASS, '/') . '\b/', $b) === 1) {
            return true;
        }
        if (preg_match('/->\s*(?:load|list|create|update|patch|remove)\b/', $b) === 1) {
            return true;
        }
        foreach (array_keys(self::ENTITIES) as $name) {
            if (preg_match('/->\s*' . preg_quote($name, '/') . '\s*\(/', $b) === 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * NARROW illustration class: a non-runnable block that references the SDK
     * class or a documented method NAME as a signature / method-table, and never
     * uses a live client variable. This is an explicit, restricted class — not a
     * catch-all — so an unexecuted block that uses \$client cannot hide here.
     */
    private function isIllustration(string $b): bool
    {
        if ($this->isRunnable($b)) {
            return false;
        }
        if (preg_match('/\$client\b/', $b) === 1) {
            return false;
        }
        if (preg_match('/\b' . preg_quote(self::SDK_CLASS, '/') . '\b/', $b) === 1) {
            return true;
        }
        foreach (self::METHODS as $meth) {
            if (preg_match('/\b' . preg_quote($meth, '/') . '\s*\(/', $b) === 1) {
                return true;
            }
        }
        return false;
    }

    /** Partition label for a block: exactly one of the four. */
    private function classify(string $b): string
    {
        if ($this->isRunnable($b)) {
            return 'executed';
        }
        if ($this->isIllustration($b)) {
            return 'illustration';
        }
        if (!$this->looksSdk($b)) {
            return 'syntaxchecked_nonrunnable';
        }
        return 'unclassified';
    }

    // --- tests --------------------------------------------------------------

    public function test_docs_have_php_examples(): void
    {
        $this->assertNotEmpty($this->phpBlocks(), 'docs should contain php examples');
    }

    /**
     * Every php block that is NOT executed must parse (php -l).
     *
     * Runnable blocks are deliberately excluded: test_php_examples_run_offline
     * executes them, and a syntax error there fails that gate with a better
     * message than a lint pass gives. Linting them as well spawned a second php
     * process per runnable block for a result the run already establishes.
     *
     * The non-runnable blocks — illustrations and signature snippets — are
     * never executed, so this is the ONLY syntax check they get, and dropping
     * it entirely would lose that coverage.
     */
    public function test_php_snippets_have_valid_syntax(): void
    {
        $failures = [];
        foreach ($this->phpBlocks() as $blk) {
            if ($this->isRunnable($blk['code'])) {
                continue;
            }
            $block = $blk['code'];
            $code = preg_match('/^\s*<\?php/', $block) ? $block : "<?php\n" . $block;
            $tmp = tempnam(sys_get_temp_dir(), 'readme_php_') . '.php';
            file_put_contents($tmp, $code);
            $out = [];
            $rc = 0;
            exec('php -l ' . escapeshellarg($tmp) . ' 2>&1', $out, $rc);
            @unlink($tmp);
            if ($rc !== 0) {
                $failures[] = $blk['doc'] . ' #' . $blk['n'] . ":\n" . implode("\n", $out) . "\n" . $block;
            }
        }
        $this->assertSame([], $failures, "docs php blocks with syntax errors:\n" . implode("\n\n", $failures));
    }

    /** The one mock record seeded per entity, keyed as the mock keys it. */
    private static function seedRecord(string $storage): array
    {
        $record = ["id" => "test01"];
        if (isset(self::ID_FIELDS[$storage])) {
            $record[self::ID_FIELDS[$storage]] = "test01";
        }
        return $record;
    }

    /**
     * Build the SDK 'entity' fixture option for the entities a block references,
     * falling back to seeding all entities when none are named.
     */
    private function fixturesFor(string $block): array
    {
        $refs = [];
        foreach (self::ENTITIES as $name => $storage) {
            if (preg_match('/\$client->' . preg_quote($name, '/') . '\b/', $block)) {
                $refs[$storage] = ["test01" => self::seedRecord($storage)];
            }
        }
        if (empty($refs)) {
            foreach (self::ENTITIES as $storage) {
                $refs[$storage] = ["test01" => self::seedRecord($storage)];
            }
        }
        return ["entity" => $refs];
    }

    /**
     * Rewrite a runnable block into an executable offline test-mode program: the
     * doc's own require of the SDK file is stripped (we require it by absolute
     * path); any real client constructor (new <Sdk>SDK / <Sdk>SDK::test) becomes
     * <Sdk>SDK::test(<fixtures>); a block that only uses \$client gets such a
     * constructor prepended. (The constructor arg-list match is deliberately
     * shallow — it does not span nested parens — because runnable op blocks
     * never build a client inline with a closure argument.)
     */
    private function toRunner(string $block, string $sdk): string
    {
        $cls = self::SDK_CLASS;
        $fixtures = var_export($this->fixturesFor($block), true);
        $body = preg_replace('/^\s*<\?php\s*/', '', $block);
        // Drop the doc's own require of the SDK file; we require it by absolute path.
        $body = preg_replace(
            '/^[ \t]*require(?:_once)?[^\n]*' . preg_quote(self::SDK_BASE, '/') . '[^\n]*\r?\n?/mi',
            '',
            $body
        );
        $ctorRe = '/(?:new\s+' . preg_quote($cls, '/') . '|' . preg_quote($cls, '/') . '::test)(?:\([^()]*\))?/';
        if (preg_match($ctorRe, $body)) {
            $body = preg_replace_callback($ctorRe, function () use ($cls, $fixtures) {
                return $cls . '::test(' . $fixtures . ')';
            }, $body);
        } else {
            $body = '$client = ' . $cls . '::test(' . $fixtures . ");\n" . $body;
        }
        return "<?php\nrequire_once " . var_export($sdk, true) . ";\n" . $body;
    }

    /**
     * Every RUNNABLE block is executed offline in test mode and must not raise a
     * real PHP-level error — even one an error-handling example swallows in a
     * catch (Throwable) and echoes via getMessage(): the captured output is
     * scanned for FATAL either way, so a programming error in a documented
     * try/catch cannot slip through. Expected domain errors (e.g. "404: Not
     * found") never match FATAL, so caught not-found cases stay tolerated.
     */
    public function test_php_examples_run_offline(): void
    {
        $ran = 0;
        $failures = [];
        $sdk = __DIR__ . '/../composal_sdk.php';

        // BATCHED. One php process for every runnable snippet, not one each.
        // A repo with 277 entities documents hundreds of examples, and a
        // process spawn per snippet dominated the php suite's wall clock.
        //
        // Each snippet is included inside a closure, so it gets its own
        // variable scope, and is bracketed by markers so output is attributed
        // back to the snippet that produced it. The interpreter is SHARED,
        // which is the cost of batching: a snippet that mutates process-wide
        // state (the SDK config singleton) or calls exit() affects what
        // follows it.
        //
        // That is why the batch is not trusted blindly. A snippet whose END
        // marker never arrives — killed by a fatal, or by an exit() that took
        // the rest of the batch with it — is RE-RUN on its own, in a fresh
        // process, and that isolated result is the one that counts. So the
        // fast path is a single spawn, and the moment isolation actually
        // matters the harness falls back to the old one-process-per-snippet
        // behaviour for the affected snippets only.
        $runnable = [];
        foreach ($this->phpBlocks() as $blk) {
            if ($this->isRunnable($blk['code'])) {
                $runnable[] = $blk;
            }
        }
        $ran = count($runnable);

        if ($ran > 0) {
            $dir = sys_get_temp_dir() . '/readme_batch_' . getmypid() . '_' . bin2hex(random_bytes(4));
            @mkdir($dir, 0700, true);
            $paths = [];
            foreach ($runnable as $i => $blk) {
                $f = $dir . '/snip_' . $i . '.php';
                file_put_contents($f, $this->toRunner($blk['code'], $sdk));
                $paths[$i] = $f;
            }

            $driver = $dir . '/_driver.php';
            file_put_contents($driver, $this->batchDriver($paths));
            [$text, $rc] = $this->runOutput('php ' . escapeshellarg($driver));

            foreach ($runnable as $i => $blk) {
                $seg = $this->batchSegment($text, $i);
                if ($seg === null) {
                    // No END marker: the batch died inside or before this
                    // snippet. Re-run it alone so the verdict is isolated.
                    [$seg, $src] = $this->runOutput('php ' . escapeshellarg($paths[$i]));
                    $rc = $src;
                }
                if (preg_match(self::FATAL, $seg) === 1) {
                    $failures[] = $blk['doc'] . ' #' . $blk['n'] . ' (exit ' . $rc . "):\n" . $seg . "\n" . $blk['code'];
                }
            }

            foreach ($paths as $f) { @unlink($f); }
            @unlink($driver);
            @rmdir($dir);
        }
        $this->assertGreaterThan(0, $ran, 'expected at least one runnable example to execute');
        $this->assertSame([], $failures, "docs php examples raised a real error when run offline:\n" . implode("\n\n", $failures));
    }

    /**
     * The batch driver: include each snippet in its own closure scope, marked
     * so output can be attributed back. The shutdown handler is what makes a
     * fatal recoverable — it prints the END marker for whichever snippet was
     * in flight, so the harness can tell "this one died" from "the batch
     * stopped before reaching it", and re-run only what it must.
     */
    private function runOutput(string $command): array
    {
        // A printed entity can include the client graph. Scan the stream;
        // retaining all output (and a second joined copy) exhausts PHP's heap.
        $process = proc_open($command, [1 => ['pipe', 'w'], 2 => ['redirect', 1]], $pipes);
        if (!is_resource($process)) throw new RuntimeException('Could not run README example');
        $summary = '';
        $tail = '';
        $reported = false;
        while (($chunk = fgets($pipes[1], 8192)) !== false) {
            if (preg_match('/@@VOX(BEGIN|END) [0-9]+/', $chunk, $marker)) {
                $summary .= "\n" . $marker[0] . "\n";
                if ($marker[1] === 'BEGIN') $reported = false;
                $tail = '';
            }
            $window = $tail . $chunk;
            if (!$reported && preg_match(self::FATAL, $window, $error, PREG_OFFSET_CAPTURE)) {
                $summary .= "\n" . substr($window, max(0, $error[0][1] - 100), 512) . "\n";
                $reported = true;
            }
            // Keep enough overlap to catch an error phrase split by fgets.
            $tail = substr($window, -256);
        }
        fclose($pipes[1]);
        return [$summary, proc_close($process)];
    }

    private function batchDriver(array $paths): string
    {
        // NOWDOC, not heredoc. The driver is PHP source that must survive
        // being embedded verbatim: a heredoc interpolates it, and $e['message']
        // with a quoted key is a parse error under interpolation. A nowdoc
        // substitutes nothing, so the only thing injected is the file list.
        $tpl = <<<'DRIVER'
<?php
$__files = __VOX_FILES__;
$__current = null;
register_shutdown_function(function () use (&$__current) {
    if ($__current !== null) {
        $e = error_get_last();
        if ($e !== null) {
            echo "\nFATAL: " . $e['message'] . "\n";
        }
        echo "\n@@VOXEND " . $__current . "\n";
    }
});
foreach ($__files as $__i => $__f) {
    $__current = $__i;
    echo "\n@@VOXBEGIN " . $__i . "\n";
    try {
        (function ($__path) { include $__path; })($__f);
    } catch (\Throwable $__t) {
        echo "\nFATAL: " . get_class($__t) . ": " . $__t->getMessage() . "\n";
    }
    echo "\n@@VOXEND " . $__i . "\n";
    $__current = null;
}
DRIVER;
        return str_replace('__VOX_FILES__', var_export($paths, true), $tpl);
    }

    /**
     * The output between this snippet's BEGIN and END markers, or null when the
     * END marker is absent — meaning the batch never got past it, and the
     * caller must re-run it in isolation rather than guess.
     */
    private function batchSegment(string $text, int $i): ?string
    {
        $begin = '@@VOXBEGIN ' . $i;
        $end = '@@VOXEND ' . $i;
        $b = strpos($text, $begin);
        if ($b === false) {
            return null;
        }
        $b += strlen($begin);
        $e = strpos($text, $end, $b);
        if ($e === false) {
            return null;
        }
        return trim(substr($text, $b, $e - $b));
    }

    /**
     * COMPLETENESS GATE: every fenced php block is partitioned into exactly one
     * of {executed, syntaxchecked-nonrunnable, illustration}. The three counts
     * must sum to the total. A block that references the SDK but is neither
     * runnable (so not executed) nor a narrow signature illustration is
     * "unclassified" — a runnable-looking example that would be silently skipped
     * — and fails the gate.
     */
    public function test_php_examples_are_completely_classified(): void
    {
        $blocks = $this->phpBlocks();
        $buckets = [
            'executed' => [],
            'syntaxchecked_nonrunnable' => [],
            'illustration' => [],
            'unclassified' => [],
        ];
        $perDoc = [];
        foreach ($blocks as $blk) {
            $cls = $this->classify($blk['code']);
            $buckets[$cls][] = $blk;
            $doc = $blk['doc'];
            if (!isset($perDoc[$doc])) {
                $perDoc[$doc] = ['total' => 0, 'executed' => 0, 'syntaxchecked_nonrunnable' => 0, 'illustration' => 0, 'unclassified' => 0];
            }
            $perDoc[$doc]['total']++;
            $perDoc[$doc][$cls]++;
        }

        $summary = "ReadmeExamplesTest — php example coverage:\n";
        foreach ($perDoc as $doc => $c) {
            $summary .= sprintf(
                "  %-14s total=%d executed=%d syntaxchecked=%d illustration=%d%s\n",
                $doc, $c['total'], $c['executed'], $c['syntaxchecked_nonrunnable'], $c['illustration'],
                $c['unclassified'] > 0 ? ' UNCLASSIFIED=' . $c['unclassified'] : ''
            );
        }
        fwrite(STDERR, "\n" . $summary);

        $unclassified = array_map(
            function ($b) { return $b['doc'] . ' #' . $b['n'] . ":\n" . $b['code']; },
            $buckets['unclassified']
        );
        $this->assertSame([], $unclassified,
            "runnable-looking php blocks that were neither executed nor a signature illustration:\n"
            . implode("\n\n", $unclassified));

        $total = count($blocks);
        $sum = count($buckets['executed'])
            + count($buckets['syntaxchecked_nonrunnable'])
            + count($buckets['illustration']);
        $this->assertSame($total, $sum,
            "every php block must be executed, syntaxchecked-nonrunnable, or illustration.\n" . $summary);

        $this->assertGreaterThan(0, count($buckets['executed']),
            'expected at least one executed php example');
    }
}
