package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/composal-sdk/go"
)

// ListArgs is what an agent sends to composal_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: agent | agent_automation | agent_command | agent_connection | agent_control_flow | agent_integration | agent_interaction | agent_manager_choice | agent_pull_request | agent_repository | agent_resource | agent_routine | agent_setting | agent_site | agent_skill | agent_subagent | agent_subscription | agent_teammate | agent_thread | agent_tool | agent_verify_project | agent_workflow | agent_workflow_run | agent_workflow_trigger | agent_workspace | agent_write_permission | allocation_log | app | app_cdn | app_config_variable | app_data_resource | app_deployment | app_deployment_operation | app_environment | app_location | app_preview | app_preview_profile | app_run | app_secret | app_service | app_service_binding | app_service_placement | app_storage_resource | binary | binary_version | browser_egress_candidate | browser_session_event | catalog_selector | cdn_deployment | cdn_hostname | cdn_space | cdn_space_object | connection_source | coordination_wait | deep_scan | deep_scan_finding | deep_scan_mapped_flow | deep_scan_option | domain_path_rule | dream | environment | environment_secret_binding | environment_test_account | exploration | finding | github_connection | hosting_app_domain | image_repository | integration | invitation | location | me_email | member | memory | metric_query | nomad_log | organization | page_agent | pages_project_credential | pages_project_persona | pages_project_run | pages_project_scenario | personal_access_token | preview_operation | preview_profile_secret_binding | preview_sharing_approval | product_map_journey | product_map_state | project | project_code_map | project_environment | project_finding | project_fixture | project_overview_metric | project_overview_pull_request | project_run_plan | project_run_schedule | project_scenario_option | project_scenario_row | project_setting | pull_request_setting | run_schedule_option | run_update | scenario_revision | service_endpoint | slack_channel | static_site | static_site_deployment | static_site_domain | subscription_model | verification_project_credential | verification_project_persona | verification_project_run | verification_project_scenario | version_log"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to composal_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: agent | agent_automation | agent_connection | agent_control_flow | agent_email | agent_file | agent_interaction | agent_marketplace | agent_marketplace_shared | agent_operation | agent_run | agent_webhook | agent_workflow_proposal | agent_workflow_run | agent_workflow_trigger | app | app_cdn | app_config_variable | app_data_resource | app_deployment | app_deployment_operation | app_environment | app_preview | app_preview_profile | app_run | app_secret | app_service | app_service_binding | app_service_placement | app_storage_resource | binary | binary_version | browser_session | browser_session_control | browser_session_media | browser_session_task | cdn_deployment | cdn_hostname | cdn_space | cdn_space_object | connection_request | deep_scan | demo_share | demo_share_segment | domain_path_rule | dream | environment | environment_discovery_run | environment_revision | evidence | exploration | finding | hosting_app_domain | knowledge | local_thread_delivery | local_thread_operation | me | media_file | memory | merge_request | nomad_allocation | organization | page | page_project_run | product_map_journey | product_map_journey_replay | product_map_observation | product_map_state | project | project_environment | project_fixture | project_messaging_conversation | project_recording | project_run_plan | project_run_schedule | pull_request | recorder | report_replay | run_search | service_endpoint | site_preview | spark_agent_local_thread | static_site | static_site_deployment | static_site_domain | verification_project_credential | verification_project_persona | verification_project_run | verification_project_scenario | verify_browser_session"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.ComposalSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "composal_list",
		Description: "List records from Composal. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("agent", "agent_automation", "agent_command", "agent_connection", "agent_control_flow", "agent_integration", "agent_interaction", "agent_manager_choice", "agent_pull_request", "agent_repository", "agent_resource", "agent_routine", "agent_setting", "agent_site", "agent_skill", "agent_subagent", "agent_subscription", "agent_teammate", "agent_thread", "agent_tool", "agent_verify_project", "agent_workflow", "agent_workflow_run", "agent_workflow_trigger", "agent_workspace", "agent_write_permission", "allocation_log", "app", "app_cdn", "app_config_variable", "app_data_resource", "app_deployment", "app_deployment_operation", "app_environment", "app_location", "app_preview", "app_preview_profile", "app_run", "app_secret", "app_service", "app_service_binding", "app_service_placement", "app_storage_resource", "binary", "binary_version", "browser_egress_candidate", "browser_session_event", "catalog_selector", "cdn_deployment", "cdn_hostname", "cdn_space", "cdn_space_object", "connection_source", "coordination_wait", "deep_scan", "deep_scan_finding", "deep_scan_mapped_flow", "deep_scan_option", "domain_path_rule", "dream", "environment", "environment_secret_binding", "environment_test_account", "exploration", "finding", "github_connection", "hosting_app_domain", "image_repository", "integration", "invitation", "location", "me_email", "member", "memory", "metric_query", "nomad_log", "organization", "page_agent", "pages_project_credential", "pages_project_persona", "pages_project_run", "pages_project_scenario", "personal_access_token", "preview_operation", "preview_profile_secret_binding", "preview_sharing_approval", "product_map_journey", "product_map_state", "project", "project_code_map", "project_environment", "project_finding", "project_fixture", "project_overview_metric", "project_overview_pull_request", "project_run_plan", "project_run_schedule", "project_scenario_option", "project_scenario_row", "project_setting", "pull_request_setting", "run_schedule_option", "run_update", "scenario_revision", "service_endpoint", "slack_channel", "static_site", "static_site_deployment", "static_site_domain", "subscription_model", "verification_project_credential", "verification_project_persona", "verification_project_run", "verification_project_scenario", "version_log"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "composal_load",
		Description: "Load one record from Composal. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("agent", "agent_automation", "agent_connection", "agent_control_flow", "agent_email", "agent_file", "agent_interaction", "agent_marketplace", "agent_marketplace_shared", "agent_operation", "agent_run", "agent_webhook", "agent_workflow_proposal", "agent_workflow_run", "agent_workflow_trigger", "app", "app_cdn", "app_config_variable", "app_data_resource", "app_deployment", "app_deployment_operation", "app_environment", "app_preview", "app_preview_profile", "app_run", "app_secret", "app_service", "app_service_binding", "app_service_placement", "app_storage_resource", "binary", "binary_version", "browser_session", "browser_session_control", "browser_session_media", "browser_session_task", "cdn_deployment", "cdn_hostname", "cdn_space", "cdn_space_object", "connection_request", "deep_scan", "demo_share", "demo_share_segment", "domain_path_rule", "dream", "environment", "environment_discovery_run", "environment_revision", "evidence", "exploration", "finding", "hosting_app_domain", "knowledge", "local_thread_delivery", "local_thread_operation", "me", "media_file", "memory", "merge_request", "nomad_allocation", "organization", "page", "page_project_run", "product_map_journey", "product_map_journey_replay", "product_map_observation", "product_map_state", "project", "project_environment", "project_fixture", "project_messaging_conversation", "project_recording", "project_run_plan", "project_run_schedule", "pull_request", "recorder", "report_replay", "run_search", "service_endpoint", "site_preview", "spark_agent_local_thread", "static_site", "static_site_deployment", "static_site_domain", "verification_project_credential", "verification_project_persona", "verification_project_run", "verification_project_scenario", "verify_browser_session"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.ComposalSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.ComposalSDK, name string) (sdk.ComposalEntityBase, error) {
	switch strings.ToLower(name) {
	case "agent":
		return client.Agent(nil), nil
	case "agent_attachment":
		return client.AgentAttachment(nil), nil
	case "agent_automation":
		return client.AgentAutomation(nil), nil
	case "agent_avatar":
		return client.AgentAvatar(nil), nil
	case "agent_command":
		return client.AgentCommand(nil), nil
	case "agent_computer":
		return client.AgentComputer(nil), nil
	case "agent_connection":
		return client.AgentConnection(nil), nil
	case "agent_control_flow":
		return client.AgentControlFlow(nil), nil
	case "agent_coordination":
		return client.AgentCoordination(nil), nil
	case "agent_email":
		return client.AgentEmail(nil), nil
	case "agent_file":
		return client.AgentFile(nil), nil
	case "agent_input":
		return client.AgentInput(nil), nil
	case "agent_integration":
		return client.AgentIntegration(nil), nil
	case "agent_interaction":
		return client.AgentInteraction(nil), nil
	case "agent_library":
		return client.AgentLibrary(nil), nil
	case "agent_manager":
		return client.AgentManager(nil), nil
	case "agent_manager_choice":
		return client.AgentManagerChoice(nil), nil
	case "agent_marketplace":
		return client.AgentMarketplace(nil), nil
	case "agent_marketplace_shared":
		return client.AgentMarketplaceShared(nil), nil
	case "agent_mission_control":
		return client.AgentMissionControl(nil), nil
	case "agent_operation":
		return client.AgentOperation(nil), nil
	case "agent_provisioning":
		return client.AgentProvisioning(nil), nil
	case "agent_pull_request":
		return client.AgentPullRequest(nil), nil
	case "agent_question":
		return client.AgentQuestion(nil), nil
	case "agent_repository":
		return client.AgentRepository(nil), nil
	case "agent_resource":
		return client.AgentResource(nil), nil
	case "agent_routine":
		return client.AgentRoutine(nil), nil
	case "agent_run":
		return client.AgentRun(nil), nil
	case "agent_runtime":
		return client.AgentRuntime(nil), nil
	case "agent_setting":
		return client.AgentSetting(nil), nil
	case "agent_sharing":
		return client.AgentSharing(nil), nil
	case "agent_site":
		return client.AgentSite(nil), nil
	case "agent_skill":
		return client.AgentSkill(nil), nil
	case "agent_slack":
		return client.AgentSlack(nil), nil
	case "agent_subagent":
		return client.AgentSubagent(nil), nil
	case "agent_subscription":
		return client.AgentSubscription(nil), nil
	case "agent_teammate":
		return client.AgentTeammate(nil), nil
	case "agent_terminal":
		return client.AgentTerminal(nil), nil
	case "agent_thread":
		return client.AgentThread(nil), nil
	case "agent_tool":
		return client.AgentTool(nil), nil
	case "agent_verify_project":
		return client.AgentVerifyProject(nil), nil
	case "agent_wait":
		return client.AgentWait(nil), nil
	case "agent_webhook":
		return client.AgentWebhook(nil), nil
	case "agent_work":
		return client.AgentWork(nil), nil
	case "agent_workflow":
		return client.AgentWorkflow(nil), nil
	case "agent_workflow_proposal":
		return client.AgentWorkflowProposal(nil), nil
	case "agent_workflow_run":
		return client.AgentWorkflowRun(nil), nil
	case "agent_workflow_trigger":
		return client.AgentWorkflowTrigger(nil), nil
	case "agent_workspace":
		return client.AgentWorkspace(nil), nil
	case "agent_write_permission":
		return client.AgentWritePermission(nil), nil
	case "allocation_log":
		return client.AllocationLog(nil), nil
	case "app":
		return client.App(nil), nil
	case "app_cdn":
		return client.AppCdn(nil), nil
	case "app_config_variable":
		return client.AppConfigVariable(nil), nil
	case "app_data_resource":
		return client.AppDataResource(nil), nil
	case "app_deploy":
		return client.AppDeploy(nil), nil
	case "app_deployment":
		return client.AppDeployment(nil), nil
	case "app_deployment_operation":
		return client.AppDeploymentOperation(nil), nil
	case "app_deployment_rollback":
		return client.AppDeploymentRollback(nil), nil
	case "app_environment":
		return client.AppEnvironment(nil), nil
	case "app_location":
		return client.AppLocation(nil), nil
	case "app_metric":
		return client.AppMetric(nil), nil
	case "app_preview":
		return client.AppPreview(nil), nil
	case "app_preview_profile":
		return client.AppPreviewProfile(nil), nil
	case "app_run":
		return client.AppRun(nil), nil
	case "app_secret":
		return client.AppSecret(nil), nil
	case "app_service":
		return client.AppService(nil), nil
	case "app_service_binding":
		return client.AppServiceBinding(nil), nil
	case "app_service_placement":
		return client.AppServicePlacement(nil), nil
	case "app_storage_resource":
		return client.AppStorageResource(nil), nil
	case "attachment_part":
		return client.AttachmentPart(nil), nil
	case "automation_event":
		return client.AutomationEvent(nil), nil
	case "automation_run":
		return client.AutomationRun(nil), nil
	case "binary":
		return client.Binary(nil), nil
	case "binary_version":
		return client.BinaryVersion(nil), nil
	case "browser_egress_candidate":
		return client.BrowserEgressCandidate(nil), nil
	case "browser_session":
		return client.BrowserSession(nil), nil
	case "browser_session_connection":
		return client.BrowserSessionConnection(nil), nil
	case "browser_session_control":
		return client.BrowserSessionControl(nil), nil
	case "browser_session_event":
		return client.BrowserSessionEvent(nil), nil
	case "browser_session_media":
		return client.BrowserSessionMedia(nil), nil
	case "browser_session_recording":
		return client.BrowserSessionRecording(nil), nil
	case "browser_session_screenshot":
		return client.BrowserSessionScreenshot(nil), nil
	case "browser_session_task":
		return client.BrowserSessionTask(nil), nil
	case "catalog_selector":
		return client.CatalogSelector(nil), nil
	case "cdn_deployment":
		return client.CdnDeployment(nil), nil
	case "cdn_hostname":
		return client.CdnHostname(nil), nil
	case "cdn_space":
		return client.CdnSpace(nil), nil
	case "cdn_space_object":
		return client.CdnSpaceObject(nil), nil
	case "connection_request":
		return client.ConnectionRequest(nil), nil
	case "connection_source":
		return client.ConnectionSource(nil), nil
	case "coordination_wait":
		return client.CoordinationWait(nil), nil
	case "credential_sign_in_check":
		return client.CredentialSignInCheck(nil), nil
	case "data_resource_rotate_credential":
		return client.DataResourceRotateCredential(nil), nil
	case "deep_scan":
		return client.DeepScan(nil), nil
	case "deep_scan_finding":
		return client.DeepScanFinding(nil), nil
	case "deep_scan_flow":
		return client.DeepScanFlow(nil), nil
	case "deep_scan_mapped_flow":
		return client.DeepScanMappedFlow(nil), nil
	case "deep_scan_option":
		return client.DeepScanOption(nil), nil
	case "demo_share":
		return client.DemoShare(nil), nil
	case "demo_share_segment":
		return client.DemoShareSegment(nil), nil
	case "deployment_dashboard_nomad":
		return client.DeploymentDashboardNomad(nil), nil
	case "deployment_file":
		return client.DeploymentFile(nil), nil
	case "domain_path_rule":
		return client.DomainPathRule(nil), nil
	case "dream":
		return client.Dream(nil), nil
	case "environment":
		return client.Environment(nil), nil
	case "environment_discovery_run":
		return client.EnvironmentDiscoveryRun(nil), nil
	case "environment_exploration":
		return client.EnvironmentExploration(nil), nil
	case "environment_first_run":
		return client.EnvironmentFirstRun(nil), nil
	case "environment_revision":
		return client.EnvironmentRevision(nil), nil
	case "environment_secret_binding":
		return client.EnvironmentSecretBinding(nil), nil
	case "environment_test_account":
		return client.EnvironmentTestAccount(nil), nil
	case "evidence":
		return client.Evidence(nil), nil
	case "exploration":
		return client.Exploration(nil), nil
	case "exploration_message":
		return client.ExplorationMessage(nil), nil
	case "exploration_report":
		return client.ExplorationReport(nil), nil
	case "exploration_scenario":
		return client.ExplorationScenario(nil), nil
	case "finding":
		return client.Finding(nil), nil
	case "github_connection":
		return client.GithubConnection(nil), nil
	case "hosting_app_domain":
		return client.HostingAppDomain(nil), nil
	case "image_repository":
		return client.ImageRepository(nil), nil
	case "integration":
		return client.Integration(nil), nil
	case "interaction_response":
		return client.InteractionResponse(nil), nil
	case "invitation":
		return client.Invitation(nil), nil
	case "journey_variant_replay":
		return client.JourneyVariantReplay(nil), nil
	case "knowledge":
		return client.Knowledge(nil), nil
	case "local_thread_delivery":
		return client.LocalThreadDelivery(nil), nil
	case "local_thread_operation":
		return client.LocalThreadOperation(nil), nil
	case "location":
		return client.Location(nil), nil
	case "me":
		return client.Me(nil), nil
	case "me_email":
		return client.MeEmail(nil), nil
	case "me_onboarding":
		return client.MeOnboarding(nil), nil
	case "media_file":
		return client.MediaFile(nil), nil
	case "member":
		return client.Member(nil), nil
	case "memory":
		return client.Memory(nil), nil
	case "merge_request":
		return client.MergeRequest(nil), nil
	case "messaging_conversation_message":
		return client.MessagingConversationMessage(nil), nil
	case "messaging_conversation_upload":
		return client.MessagingConversationUpload(nil), nil
	case "metric_query":
		return client.MetricQuery(nil), nil
	case "network_connection":
		return client.NetworkConnection(nil), nil
	case "nomad_allocation":
		return client.NomadAllocation(nil), nil
	case "nomad_log":
		return client.NomadLog(nil), nil
	case "organization":
		return client.Organization(nil), nil
	case "page":
		return client.Page(nil), nil
	case "page_agent":
		return client.PageAgent(nil), nil
	case "page_project_run":
		return client.PageProjectRun(nil), nil
	case "pages_project_credential":
		return client.PagesProjectCredential(nil), nil
	case "pages_project_persona":
		return client.PagesProjectPersona(nil), nil
	case "pages_project_run":
		return client.PagesProjectRun(nil), nil
	case "pages_project_scenario":
		return client.PagesProjectScenario(nil), nil
	case "personal_access_token":
		return client.PersonalAccessToken(nil), nil
	case "preview_operation":
		return client.PreviewOperation(nil), nil
	case "preview_profile_secret_binding":
		return client.PreviewProfileSecretBinding(nil), nil
	case "preview_secret":
		return client.PreviewSecret(nil), nil
	case "preview_sharing_approval":
		return client.PreviewSharingApproval(nil), nil
	case "product_map_identity_decision":
		return client.ProductMapIdentityDecision(nil), nil
	case "product_map_journey":
		return client.ProductMapJourney(nil), nil
	case "product_map_journey_replay":
		return client.ProductMapJourneyReplay(nil), nil
	case "product_map_observation":
		return client.ProductMapObservation(nil), nil
	case "product_map_question":
		return client.ProductMapQuestion(nil), nil
	case "product_map_state":
		return client.ProductMapState(nil), nil
	case "project":
		return client.Project(nil), nil
	case "project_android_apk":
		return client.ProjectAndroidApk(nil), nil
	case "project_code_map":
		return client.ProjectCodeMap(nil), nil
	case "project_environment":
		return client.ProjectEnvironment(nil), nil
	case "project_finding":
		return client.ProjectFinding(nil), nil
	case "project_fixture":
		return client.ProjectFixture(nil), nil
	case "project_ios_app":
		return client.ProjectIosApp(nil), nil
	case "project_messaging_conversation":
		return client.ProjectMessagingConversation(nil), nil
	case "project_overview_metric":
		return client.ProjectOverviewMetric(nil), nil
	case "project_overview_pull_request":
		return client.ProjectOverviewPullRequest(nil), nil
	case "project_product_map":
		return client.ProjectProductMap(nil), nil
	case "project_recording":
		return client.ProjectRecording(nil), nil
	case "project_run_plan":
		return client.ProjectRunPlan(nil), nil
	case "project_run_schedule":
		return client.ProjectRunSchedule(nil), nil
	case "project_scenario_option":
		return client.ProjectScenarioOption(nil), nil
	case "project_scenario_row":
		return client.ProjectScenarioRow(nil), nil
	case "project_setting":
		return client.ProjectSetting(nil), nil
	case "pull_request":
		return client.PullRequest(nil), nil
	case "pull_request_setting":
		return client.PullRequestSetting(nil), nil
	case "pull_request_setting_add_repository":
		return client.PullRequestSettingAddRepository(nil), nil
	case "pull_request_setting_detect_comment":
		return client.PullRequestSettingDetectComment(nil), nil
	case "recorder":
		return client.Recorder(nil), nil
	case "registry":
		return client.Registry(nil), nil
	case "registry_v2":
		return client.RegistryV2(nil), nil
	case "relay_agent_local_thread":
		return client.RelayAgentLocalThread(nil), nil
	case "report_replay":
		return client.ReportReplay(nil), nil
	case "report_scenario":
		return client.ReportScenario(nil), nil
	case "run_scenario_run":
		return client.RunScenarioRun(nil), nil
	case "run_schedule_option":
		return client.RunScheduleOption(nil), nil
	case "run_search":
		return client.RunSearch(nil), nil
	case "run_update":
		return client.RunUpdate(nil), nil
	case "scenario_revision":
		return client.ScenarioRevision(nil), nil
	case "scenario_run_lesson":
		return client.ScenarioRunLesson(nil), nil
	case "scenario_run_scenario_edit":
		return client.ScenarioRunScenarioEdit(nil), nil
	case "service_endpoint":
		return client.ServiceEndpoint(nil), nil
	case "site_preview":
		return client.SitePreview(nil), nil
	case "slack_channel":
		return client.SlackChannel(nil), nil
	case "spark_agent_local_thread":
		return client.SparkAgentLocalThread(nil), nil
	case "static_site":
		return client.StaticSite(nil), nil
	case "static_site_deployment":
		return client.StaticSiteDeployment(nil), nil
	case "static_site_domain":
		return client.StaticSiteDomain(nil), nil
	case "subscription_model":
		return client.SubscriptionModel(nil), nil
	case "thread_preview":
		return client.ThreadPreview(nil), nil
	case "verification_project_credential":
		return client.VerificationProjectCredential(nil), nil
	case "verification_project_persona":
		return client.VerificationProjectPersona(nil), nil
	case "verification_project_run":
		return client.VerificationProjectRun(nil), nil
	case "verification_project_scenario":
		return client.VerificationProjectScenario(nil), nil
	case "verify_app_domain":
		return client.VerifyAppDomain(nil), nil
	case "verify_browser_session":
		return client.VerifyBrowserSession(nil), nil
	case "verify_static_site_domain":
		return client.VerifyStaticSiteDomain(nil), nil
	case "version_log":
		return client.VersionLog(nil), nil
	case "web_bot_auth":
		return client.WebBotAuth(nil), nil
	case "workflow_run_step":
		return client.WorkflowRunStep(nil), nil
	case "workflow_run_stop_notice":
		return client.WorkflowRunStopNotice(nil), nil
	case "workflow_trigger_skipped":
		return client.WorkflowTriggerSkipped(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
