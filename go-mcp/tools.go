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
	Entity string         `json:"entity" jsonschema:"one of: agent | agent_app | agent_automation | agent_command | agent_connection | agent_connection_delegation | agent_connection_grant | agent_connection_safety_control | agent_connection_trigger_subscription | agent_control_flow | agent_integration_account | agent_interaction | agent_manager_choice | agent_pull_request | agent_relay_file_grant | agent_relay_file_grant_account | agent_resource | agent_routine | agent_site | agent_subagent | agent_swarm | agent_teammate | agent_tool | agent_verify_project | agent_workflow_run | agent_workflow_trigger | agent_workspace | agent_write_permission | agreement | app | app_deployment_operation | app_location | app_secret | app_service_placement | artefact | artefact_comment_thread | audit_event | billing_invoice | billing_package | billing_prepaid_purchase | binary | binary_version | browser_egress_candidate | browser_session_event | change_comment | change_reviewer | change_transcript | ci_pipeline | ci_runner_pool | connection_source | control_computer | coordination_wait | deep_scan_finding | deep_scan_option | deployment_log | deployment_metric | deployment_preview | deployment_setting | desktop_local_agent_model | device | device_browser_operation | device_control_message | device_grant | docker_builder | domain_dns_integration | domain_path_rule | dream | environment_test_account | execution_runtime_instance | exploration | finding | github_app_importable_repository | github_app_installation | github_ci_repository | github_ci_repository_compatibility_report | github_integration | github_onboarding_branch | github_runner_image | github_runner_pool | image_repository | image_repository_tag | invitation | job_log_chunk | label | location | me_email | member | memory | model_subscription_account | node | organization | organization_secret | page_artefact | pages_member | pages_project_credential | pages_project_persona | pages_project_run | pages_project_scenario | pages_session | product_map_journey | product_map_state | project | project_code_map | project_environment | project_finding | project_fixture | project_overview_pull_request | project_run_plan | project_run_schedule | project_scenario_row | pull_request_transcript | pull_zone | relay_agent_connection | repo | repo_access_token | repo_action | repo_bookmark_protection | repo_bookmark_protection_event | repo_code_rule | repo_setting | repo_vc_commit | repository_import_session_repository | run_schedule_option | run_update | runner_pool_node_enrollment_token | scenario_revision | signal | signal_integration | signal_integration_delivery | signal_integration_target | site | slack_channel | spark_agent_site | spark_agent_skill | spark_agent_thread | static_site | static_site_deployment | static_site_domain | subscription_model | swarm_event | swarm_task | transcript | vc_branch | vc_change | vc_change_group | vc_file | vc_merge_queue | vc_stack | vcs_node | verification_project_credential | verification_project_persona | verification_project_run | verification_project_scenario | version_log | workspace_space"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to composal_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: admin_org | agent | agent_app | agent_automation | agent_connection | agent_control_flow | agent_email | agent_event | agent_file | agent_integration | agent_integration_callback | agent_interaction | agent_marketplace | agent_marketplace_shared | agent_operation | agent_relay_file_grant | agent_repository | agent_run | agent_session_checkpoint | agent_setting | agent_site | agent_skill | agent_subscription | agent_swarm | agent_thread | agent_usage | agent_web_preview | agent_webhook | agent_workflow | agent_workflow_proposal | agent_workflow_run | agent_workflow_trigger | alert_rule_event | allocation_log | app | app_access_jwk | app_cdn | app_config_variable | app_data_resource | app_deployment | app_deployment_operation | app_environment | app_preview | app_preview_profile | app_run | app_secret | app_service | app_service_binding | app_service_placement | app_storage_resource | artefact | artifact | artifact_cache_namespace | artifact_image_repository | artifact_package_mirror | artifact_retention_policy | auth_registration_option | backend_runner_pool | bazel_action_result | bazel_backend | bazel_blob | bazel_execution | billing | billing_prepaid_period | billing_prepaid_purchase | binary | binary_version | browser_session | browser_session_control | browser_session_media | browser_session_task | cache_namespace_entry | catalog_selector | cdn_deployment | cdn_hostname | cdn_space | cdn_space_object | change | change_git_commit_identity | change_git_publication | change_transcript_summary | ci_node | ci_pipeline | ci_pipeline_run | ci_runner_pool | cli_release | cloud_workspace_backup_object | commit_diff | connection_request | control_computer_control_operation | deep_scan | deep_scan_mapped_flow | demo_share | demo_share_segment | deployment | deployment_detail | device | device_control_operation | device_enterprise_relay | device_folder_listing | docker_builder | docker_builder_session | docker_builder_setting | domain_path_rule | dream | environment | environment_discovery_run | environment_revision | environment_secret_binding | evidence | execution_desired_state | execution_reconciler_tick | execution_release | execution_runtime_instance | exploration | finding | gh | git_import | github_ci_repository | github_ci_repository_compatibility_report | github_connection | github_integration | github_onboarding | github_onboarding_import_batch | github_pull_request | github_runner_egress | github_runner_history | github_runner_image | github_runner_setup | gitlab | hosting_app_domain | import_branch_policy | integration | job_step | job_workspace | knowledge | local_thread_delivery | local_thread_operation | log_stream_chunk | marketing_setting | me | media_file | memory | merge_request | metric_query | model_subscription_account_connection | networking_space | node_lease | nomad_allocation | nomad_log | now | observability_clickhouse_cluster | observability_quickwit_cluster | observability_space | openapi | org_invitation | organization | organization_app | organization_identity_certificate | organization_oidc_trust | organization_secret | organization_service_account | organization_site | organization_workload_identity | page | page_agent | page_artefact | page_ci_pipeline_run | page_project_run | page_repo_vc_commit | pages_billing | pages_github_onboarding | pages_registry | pages_session | pairing | pairing_event | patchset_diff | personal_access_token | preview_operation | preview_profile_secret_binding | preview_sharing_approval | proactive_agent_waitlist_entry | product_map_journey | product_map_journey_replay | product_map_observation | product_map_state | project | project_environment | project_fixture | project_messaging_conversation | project_overview_metric | project_recording | project_run_plan | project_run_schedule | project_scenario_option | project_setting | pull_request | pull_request_setting | recorder | relay_agent_connection | release_rollout | repo_agent_checkpoint | repo_agent_session | repo_bookmark_protection | repo_cloud_workspace_backup | repo_code_rule | repo_stat | report_replay | repository_access_resolve | repository_import | repository_import_session | repository_sandbox_environment | roder_code_repair | roder_code_repair_setting | run_artifact | run_job | run_search | runner_lease | runner_pool_runner | runtime_instance_health_snapshot | sandbox_integration | secret_grant | secret_version | service_endpoint | setting | signal | signal_integration | signal_subscription | site_access_key | site_preview | space_alert_rule | space_audit_event | space_dns_record | space_enrollment_token | space_gateway | space_group | space_group_membership | space_log_stream | space_metric_sery | space_otel_collector | space_peer | space_peer_attachment | space_policy | space_segment | space_trace_span | spark | spark_agent_integration | spark_agent_local_thread | spark_credit | spark_credit_agent_usage | spark_credit_usage_total | static_site | static_site_deployment | static_site_domain | status_change | status_commit | status_patchset | tool_feedback | vc_change | vc_change_group | vc_merge_queue | vc_stack | vcs_setting | verification_project_credential | verification_project_persona | verification_project_run | verification_project_scenario | verify_browser_session | verify_email_verification | workspace_activity | workspace_space"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.ComposalSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "composal_list",
		Description: "List records from Composal. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("agent", "agent_app", "agent_automation", "agent_command", "agent_connection", "agent_connection_delegation", "agent_connection_grant", "agent_connection_safety_control", "agent_connection_trigger_subscription", "agent_control_flow", "agent_integration_account", "agent_interaction", "agent_manager_choice", "agent_pull_request", "agent_relay_file_grant", "agent_relay_file_grant_account", "agent_resource", "agent_routine", "agent_site", "agent_subagent", "agent_swarm", "agent_teammate", "agent_tool", "agent_verify_project", "agent_workflow_run", "agent_workflow_trigger", "agent_workspace", "agent_write_permission", "agreement", "app", "app_deployment_operation", "app_location", "app_secret", "app_service_placement", "artefact", "artefact_comment_thread", "audit_event", "billing_invoice", "billing_package", "billing_prepaid_purchase", "binary", "binary_version", "browser_egress_candidate", "browser_session_event", "change_comment", "change_reviewer", "change_transcript", "ci_pipeline", "ci_runner_pool", "connection_source", "control_computer", "coordination_wait", "deep_scan_finding", "deep_scan_option", "deployment_log", "deployment_metric", "deployment_preview", "deployment_setting", "desktop_local_agent_model", "device", "device_browser_operation", "device_control_message", "device_grant", "docker_builder", "domain_dns_integration", "domain_path_rule", "dream", "environment_test_account", "execution_runtime_instance", "exploration", "finding", "github_app_importable_repository", "github_app_installation", "github_ci_repository", "github_ci_repository_compatibility_report", "github_integration", "github_onboarding_branch", "github_runner_image", "github_runner_pool", "image_repository", "image_repository_tag", "invitation", "job_log_chunk", "label", "location", "me_email", "member", "memory", "model_subscription_account", "node", "organization", "organization_secret", "page_artefact", "pages_member", "pages_project_credential", "pages_project_persona", "pages_project_run", "pages_project_scenario", "pages_session", "product_map_journey", "product_map_state", "project", "project_code_map", "project_environment", "project_finding", "project_fixture", "project_overview_pull_request", "project_run_plan", "project_run_schedule", "project_scenario_row", "pull_request_transcript", "pull_zone", "relay_agent_connection", "repo", "repo_access_token", "repo_action", "repo_bookmark_protection", "repo_bookmark_protection_event", "repo_code_rule", "repo_setting", "repo_vc_commit", "repository_import_session_repository", "run_schedule_option", "run_update", "runner_pool_node_enrollment_token", "scenario_revision", "signal", "signal_integration", "signal_integration_delivery", "signal_integration_target", "site", "slack_channel", "spark_agent_site", "spark_agent_skill", "spark_agent_thread", "static_site", "static_site_deployment", "static_site_domain", "subscription_model", "swarm_event", "swarm_task", "transcript", "vc_branch", "vc_change", "vc_change_group", "vc_file", "vc_merge_queue", "vc_stack", "vcs_node", "verification_project_credential", "verification_project_persona", "verification_project_run", "verification_project_scenario", "version_log", "workspace_space"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "composal_load",
		Description: "Load one record from Composal. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("admin_org", "agent", "agent_app", "agent_automation", "agent_connection", "agent_control_flow", "agent_email", "agent_event", "agent_file", "agent_integration", "agent_integration_callback", "agent_interaction", "agent_marketplace", "agent_marketplace_shared", "agent_operation", "agent_relay_file_grant", "agent_repository", "agent_run", "agent_session_checkpoint", "agent_setting", "agent_site", "agent_skill", "agent_subscription", "agent_swarm", "agent_thread", "agent_usage", "agent_web_preview", "agent_webhook", "agent_workflow", "agent_workflow_proposal", "agent_workflow_run", "agent_workflow_trigger", "alert_rule_event", "allocation_log", "app", "app_access_jwk", "app_cdn", "app_config_variable", "app_data_resource", "app_deployment", "app_deployment_operation", "app_environment", "app_preview", "app_preview_profile", "app_run", "app_secret", "app_service", "app_service_binding", "app_service_placement", "app_storage_resource", "artefact", "artifact", "artifact_cache_namespace", "artifact_image_repository", "artifact_package_mirror", "artifact_retention_policy", "auth_registration_option", "backend_runner_pool", "bazel_action_result", "bazel_backend", "bazel_blob", "bazel_execution", "billing", "billing_prepaid_period", "billing_prepaid_purchase", "binary", "binary_version", "browser_session", "browser_session_control", "browser_session_media", "browser_session_task", "cache_namespace_entry", "catalog_selector", "cdn_deployment", "cdn_hostname", "cdn_space", "cdn_space_object", "change", "change_git_commit_identity", "change_git_publication", "change_transcript_summary", "ci_node", "ci_pipeline", "ci_pipeline_run", "ci_runner_pool", "cli_release", "cloud_workspace_backup_object", "commit_diff", "connection_request", "control_computer_control_operation", "deep_scan", "deep_scan_mapped_flow", "demo_share", "demo_share_segment", "deployment", "deployment_detail", "device", "device_control_operation", "device_enterprise_relay", "device_folder_listing", "docker_builder", "docker_builder_session", "docker_builder_setting", "domain_path_rule", "dream", "environment", "environment_discovery_run", "environment_revision", "environment_secret_binding", "evidence", "execution_desired_state", "execution_reconciler_tick", "execution_release", "execution_runtime_instance", "exploration", "finding", "gh", "git_import", "github_ci_repository", "github_ci_repository_compatibility_report", "github_connection", "github_integration", "github_onboarding", "github_onboarding_import_batch", "github_pull_request", "github_runner_egress", "github_runner_history", "github_runner_image", "github_runner_setup", "gitlab", "hosting_app_domain", "import_branch_policy", "integration", "job_step", "job_workspace", "knowledge", "local_thread_delivery", "local_thread_operation", "log_stream_chunk", "marketing_setting", "me", "media_file", "memory", "merge_request", "metric_query", "model_subscription_account_connection", "networking_space", "node_lease", "nomad_allocation", "nomad_log", "now", "observability_clickhouse_cluster", "observability_quickwit_cluster", "observability_space", "openapi", "org_invitation", "organization", "organization_app", "organization_identity_certificate", "organization_oidc_trust", "organization_secret", "organization_service_account", "organization_site", "organization_workload_identity", "page", "page_agent", "page_artefact", "page_ci_pipeline_run", "page_project_run", "page_repo_vc_commit", "pages_billing", "pages_github_onboarding", "pages_registry", "pages_session", "pairing", "pairing_event", "patchset_diff", "personal_access_token", "preview_operation", "preview_profile_secret_binding", "preview_sharing_approval", "proactive_agent_waitlist_entry", "product_map_journey", "product_map_journey_replay", "product_map_observation", "product_map_state", "project", "project_environment", "project_fixture", "project_messaging_conversation", "project_overview_metric", "project_recording", "project_run_plan", "project_run_schedule", "project_scenario_option", "project_setting", "pull_request", "pull_request_setting", "recorder", "relay_agent_connection", "release_rollout", "repo_agent_checkpoint", "repo_agent_session", "repo_bookmark_protection", "repo_cloud_workspace_backup", "repo_code_rule", "repo_stat", "report_replay", "repository_access_resolve", "repository_import", "repository_import_session", "repository_sandbox_environment", "roder_code_repair", "roder_code_repair_setting", "run_artifact", "run_job", "run_search", "runner_lease", "runner_pool_runner", "runtime_instance_health_snapshot", "sandbox_integration", "secret_grant", "secret_version", "service_endpoint", "setting", "signal", "signal_integration", "signal_subscription", "site_access_key", "site_preview", "space_alert_rule", "space_audit_event", "space_dns_record", "space_enrollment_token", "space_gateway", "space_group", "space_group_membership", "space_log_stream", "space_metric_sery", "space_otel_collector", "space_peer", "space_peer_attachment", "space_policy", "space_segment", "space_trace_span", "spark", "spark_agent_integration", "spark_agent_local_thread", "spark_credit", "spark_credit_agent_usage", "spark_credit_usage_total", "static_site", "static_site_deployment", "static_site_domain", "status_change", "status_commit", "status_patchset", "tool_feedback", "vc_change", "vc_change_group", "vc_merge_queue", "vc_stack", "vcs_setting", "verification_project_credential", "verification_project_persona", "verification_project_run", "verification_project_scenario", "verify_browser_session", "verify_email_verification", "workspace_activity", "workspace_space"),
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
	case "a2a_well_known":
		return client.A2aWellKnown(nil), nil
	case "admin_org":
		return client.AdminOrg(nil), nil
	case "agent":
		return client.Agent(nil), nil
	case "agent_app":
		return client.AgentApp(nil), nil
	case "agent_app_install":
		return client.AgentAppInstall(nil), nil
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
	case "agent_connection_delegation":
		return client.AgentConnectionDelegation(nil), nil
	case "agent_connection_grant":
		return client.AgentConnectionGrant(nil), nil
	case "agent_connection_resource":
		return client.AgentConnectionResource(nil), nil
	case "agent_connection_safety_control":
		return client.AgentConnectionSafetyControl(nil), nil
	case "agent_connection_trigger_subscription":
		return client.AgentConnectionTriggerSubscription(nil), nil
	case "agent_context_checkpoint":
		return client.AgentContextCheckpoint(nil), nil
	case "agent_control_flow":
		return client.AgentControlFlow(nil), nil
	case "agent_coordination":
		return client.AgentCoordination(nil), nil
	case "agent_email":
		return client.AgentEmail(nil), nil
	case "agent_event":
		return client.AgentEvent(nil), nil
	case "agent_file":
		return client.AgentFile(nil), nil
	case "agent_input":
		return client.AgentInput(nil), nil
	case "agent_integration":
		return client.AgentIntegration(nil), nil
	case "agent_integration_account":
		return client.AgentIntegrationAccount(nil), nil
	case "agent_integration_callback":
		return client.AgentIntegrationCallback(nil), nil
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
	case "agent_relay_file_grant":
		return client.AgentRelayFileGrant(nil), nil
	case "agent_relay_file_grant_account":
		return client.AgentRelayFileGrantAccount(nil), nil
	case "agent_repository":
		return client.AgentRepository(nil), nil
	case "agent_resource":
		return client.AgentResource(nil), nil
	case "agent_roder":
		return client.AgentRoder(nil), nil
	case "agent_routine":
		return client.AgentRoutine(nil), nil
	case "agent_run":
		return client.AgentRun(nil), nil
	case "agent_runtime":
		return client.AgentRuntime(nil), nil
	case "agent_session":
		return client.AgentSession(nil), nil
	case "agent_session_checkpoint":
		return client.AgentSessionCheckpoint(nil), nil
	case "agent_session_roder_handoff":
		return client.AgentSessionRoderHandoff(nil), nil
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
	case "agent_swarm":
		return client.AgentSwarm(nil), nil
	case "agent_teammate":
		return client.AgentTeammate(nil), nil
	case "agent_terminal":
		return client.AgentTerminal(nil), nil
	case "agent_thread":
		return client.AgentThread(nil), nil
	case "agent_tool":
		return client.AgentTool(nil), nil
	case "agent_usage":
		return client.AgentUsage(nil), nil
	case "agent_verify_project":
		return client.AgentVerifyProject(nil), nil
	case "agent_wait":
		return client.AgentWait(nil), nil
	case "agent_web_preview":
		return client.AgentWebPreview(nil), nil
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
	case "agreement":
		return client.Agreement(nil), nil
	case "agreement_access_request":
		return client.AgreementAccessRequest(nil), nil
	case "alert_rule_event":
		return client.AlertRuleEvent(nil), nil
	case "allocation_log":
		return client.AllocationLog(nil), nil
	case "app":
		return client.App(nil), nil
	case "app_access":
		return client.AppAccess(nil), nil
	case "app_access_jwk":
		return client.AppAccessJwk(nil), nil
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
	case "artefact":
		return client.Artefact(nil), nil
	case "artefact_comment_thread":
		return client.ArtefactCommentThread(nil), nil
	case "artefact_revision":
		return client.ArtefactRevision(nil), nil
	case "artefact_view_token":
		return client.ArtefactViewToken(nil), nil
	case "artifact":
		return client.Artifact(nil), nil
	case "artifact_cache_namespace":
		return client.ArtifactCacheNamespace(nil), nil
	case "artifact_image_repository":
		return client.ArtifactImageRepository(nil), nil
	case "artifact_package_mirror":
		return client.ArtifactPackageMirror(nil), nil
	case "artifact_retention_policy":
		return client.ArtifactRetentionPolicy(nil), nil
	case "attachment_part":
		return client.AttachmentPart(nil), nil
	case "audit_event":
		return client.AuditEvent(nil), nil
	case "auth":
		return client.Auth(nil), nil
	case "auth_cli":
		return client.AuthCli(nil), nil
	case "auth_github":
		return client.AuthGithub(nil), nil
	case "auth_google":
		return client.AuthGoogle(nil), nil
	case "auth_openai":
		return client.AuthOpenai(nil), nil
	case "auth_password_reset":
		return client.AuthPasswordReset(nil), nil
	case "auth_registration_option":
		return client.AuthRegistrationOption(nil), nil
	case "automation_event":
		return client.AutomationEvent(nil), nil
	case "automation_run":
		return client.AutomationRun(nil), nil
	case "backend_runner_pool":
		return client.BackendRunnerPool(nil), nil
	case "bazel":
		return client.Bazel(nil), nil
	case "bazel_action_result":
		return client.BazelActionResult(nil), nil
	case "bazel_backend":
		return client.BazelBackend(nil), nil
	case "bazel_blob":
		return client.BazelBlob(nil), nil
	case "bazel_execution":
		return client.BazelExecution(nil), nil
	case "bazel_find_missing_blob":
		return client.BazelFindMissingBlob(nil), nil
	case "billing":
		return client.Billing(nil), nil
	case "billing_addon":
		return client.BillingAddon(nil), nil
	case "billing_budget":
		return client.BillingBudget(nil), nil
	case "billing_checkout_session":
		return client.BillingCheckoutSession(nil), nil
	case "billing_contact":
		return client.BillingContact(nil), nil
	case "billing_extra_spend":
		return client.BillingExtraSpend(nil), nil
	case "billing_invoice":
		return client.BillingInvoice(nil), nil
	case "billing_package":
		return client.BillingPackage(nil), nil
	case "billing_portal_session":
		return client.BillingPortalSession(nil), nil
	case "billing_prepaid_period":
		return client.BillingPrepaidPeriod(nil), nil
	case "billing_prepaid_purchase":
		return client.BillingPrepaidPurchase(nil), nil
	case "billing_subscription":
		return client.BillingSubscription(nil), nil
	case "billing_token_top_up":
		return client.BillingTokenTopUp(nil), nil
	case "billing_usage":
		return client.BillingUsage(nil), nil
	case "binary":
		return client.Binary(nil), nil
	case "binary_version":
		return client.BinaryVersion(nil), nil
	case "bookmark_protection_refresh_github_required_check":
		return client.BookmarkProtectionRefreshGithubRequiredCheck(nil), nil
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
	case "cache_namespace_entry":
		return client.CacheNamespaceEntry(nil), nil
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
	case "change":
		return client.Change(nil), nil
	case "change_asset":
		return client.ChangeAsset(nil), nil
	case "change_comment":
		return client.ChangeComment(nil), nil
	case "change_file_review_checkpoint":
		return client.ChangeFileReviewCheckpoint(nil), nil
	case "change_git_branch_submission":
		return client.ChangeGitBranchSubmission(nil), nil
	case "change_git_commit_identity":
		return client.ChangeGitCommitIdentity(nil), nil
	case "change_git_publication":
		return client.ChangeGitPublication(nil), nil
	case "change_group_member":
		return client.ChangeGroupMember(nil), nil
	case "change_label":
		return client.ChangeLabel(nil), nil
	case "change_landing_hold":
		return client.ChangeLandingHold(nil), nil
	case "change_landing_request":
		return client.ChangeLandingRequest(nil), nil
	case "change_request_change":
		return client.ChangeRequestChange(nil), nil
	case "change_reviewer":
		return client.ChangeReviewer(nil), nil
	case "change_transcript":
		return client.ChangeTranscript(nil), nil
	case "change_transcript_summary":
		return client.ChangeTranscriptSummary(nil), nil
	case "checkpoint_prepare_chunk":
		return client.CheckpointPrepareChunk(nil), nil
	case "ci_node":
		return client.CiNode(nil), nil
	case "ci_pipeline":
		return client.CiPipeline(nil), nil
	case "ci_pipeline_run":
		return client.CiPipelineRun(nil), nil
	case "ci_runner_pool":
		return client.CiRunnerPool(nil), nil
	case "ci_status":
		return client.CiStatus(nil), nil
	case "cli_event":
		return client.CliEvent(nil), nil
	case "cli_release":
		return client.CliRelease(nil), nil
	case "cloud_workspace_backup_object":
		return client.CloudWorkspaceBackupObject(nil), nil
	case "code_rule_evaluation":
		return client.CodeRuleEvaluation(nil), nil
	case "com_site_access":
		return client.ComSiteAccess(nil), nil
	case "com_site_access_session":
		return client.ComSiteAccessSession(nil), nil
	case "comment_thread_comment":
		return client.CommentThreadComment(nil), nil
	case "commit_diff":
		return client.CommitDiff(nil), nil
	case "connection_request":
		return client.ConnectionRequest(nil), nil
	case "connection_source":
		return client.ConnectionSource(nil), nil
	case "contact_submission":
		return client.ContactSubmission(nil), nil
	case "control_computer":
		return client.ControlComputer(nil), nil
	case "control_computer_control_operation":
		return client.ControlComputerControlOperation(nil), nil
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
	case "deployment":
		return client.Deployment(nil), nil
	case "deployment_dashboard_nomad":
		return client.DeploymentDashboardNomad(nil), nil
	case "deployment_detail":
		return client.DeploymentDetail(nil), nil
	case "deployment_file":
		return client.DeploymentFile(nil), nil
	case "deployment_log":
		return client.DeploymentLog(nil), nil
	case "deployment_metric":
		return client.DeploymentMetric(nil), nil
	case "deployment_preview":
		return client.DeploymentPreview(nil), nil
	case "deployment_setting":
		return client.DeploymentSetting(nil), nil
	case "desktop_local_agent_model":
		return client.DesktopLocalAgentModel(nil), nil
	case "desktop_local_agent_response":
		return client.DesktopLocalAgentResponse(nil), nil
	case "device":
		return client.Device(nil), nil
	case "device_browser_operation":
		return client.DeviceBrowserOperation(nil), nil
	case "device_control_message":
		return client.DeviceControlMessage(nil), nil
	case "device_control_operation":
		return client.DeviceControlOperation(nil), nil
	case "device_enterprise_relay":
		return client.DeviceEnterpriseRelay(nil), nil
	case "device_folder_listing":
		return client.DeviceFolderListing(nil), nil
	case "device_grant":
		return client.DeviceGrant(nil), nil
	case "device_invocation":
		return client.DeviceInvocation(nil), nil
	case "device_local_event":
		return client.DeviceLocalEvent(nil), nil
	case "device_pairing":
		return client.DevicePairing(nil), nil
	case "device_project":
		return client.DeviceProject(nil), nil
	case "device_scheduled_check_in":
		return client.DeviceScheduledCheckIn(nil), nil
	case "docker_builder":
		return client.DockerBuilder(nil), nil
	case "docker_builder_session":
		return client.DockerBuilderSession(nil), nil
	case "docker_builder_setting":
		return client.DockerBuilderSetting(nil), nil
	case "domain_dns_integration":
		return client.DomainDnsIntegration(nil), nil
	case "domain_path_rule":
		return client.DomainPathRule(nil), nil
	case "dream":
		return client.Dream(nil), nil
	case "edge":
		return client.Edge(nil), nil
	case "email_verification":
		return client.EmailVerification(nil), nil
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
	case "execution_desired_state":
		return client.ExecutionDesiredState(nil), nil
	case "execution_reconciler_tick":
		return client.ExecutionReconcilerTick(nil), nil
	case "execution_release":
		return client.ExecutionRelease(nil), nil
	case "execution_runtime_instance":
		return client.ExecutionRuntimeInstance(nil), nil
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
	case "gh":
		return client.Gh(nil), nil
	case "git_import":
		return client.GitImport(nil), nil
	case "github":
		return client.Github(nil), nil
	case "github_app":
		return client.GithubApp(nil), nil
	case "github_app_importable_repository":
		return client.GithubAppImportableRepository(nil), nil
	case "github_app_installation":
		return client.GithubAppInstallation(nil), nil
	case "github_app_installation_authorization":
		return client.GithubAppInstallationAuthorization(nil), nil
	case "github_app_user_authorization":
		return client.GithubAppUserAuthorization(nil), nil
	case "github_ci_repository":
		return client.GithubCiRepository(nil), nil
	case "github_ci_repository_compatibility_report":
		return client.GithubCiRepositoryCompatibilityReport(nil), nil
	case "github_connection":
		return client.GithubConnection(nil), nil
	case "github_integration":
		return client.GithubIntegration(nil), nil
	case "github_onboarding":
		return client.GithubOnboarding(nil), nil
	case "github_onboarding_branch":
		return client.GithubOnboardingBranch(nil), nil
	case "github_onboarding_import":
		return client.GithubOnboardingImport(nil), nil
	case "github_onboarding_import_batch":
		return client.GithubOnboardingImportBatch(nil), nil
	case "github_onboarding_import_item":
		return client.GithubOnboardingImportItem(nil), nil
	case "github_pull_request":
		return client.GithubPullRequest(nil), nil
	case "github_runner_admission":
		return client.GithubRunnerAdmission(nil), nil
	case "github_runner_cache":
		return client.GithubRunnerCache(nil), nil
	case "github_runner_egress":
		return client.GithubRunnerEgress(nil), nil
	case "github_runner_history":
		return client.GithubRunnerHistory(nil), nil
	case "github_runner_image":
		return client.GithubRunnerImage(nil), nil
	case "github_runner_pool":
		return client.GithubRunnerPool(nil), nil
	case "github_runner_setup":
		return client.GithubRunnerSetup(nil), nil
	case "gitlab":
		return client.Gitlab(nil), nil
	case "gitlab_connection":
		return client.GitlabConnection(nil), nil
	case "gitlab_import":
		return client.GitlabImport(nil), nil
	case "gitlab_oauth":
		return client.GitlabOauth(nil), nil
	case "grant_all_agent":
		return client.GrantAllAgent(nil), nil
	case "hosting_app_domain":
		return client.HostingAppDomain(nil), nil
	case "identity_organization":
		return client.IdentityOrganization(nil), nil
	case "image_repository":
		return client.ImageRepository(nil), nil
	case "image_repository_tag":
		return client.ImageRepositoryTag(nil), nil
	case "import_branch_policy":
		return client.ImportBranchPolicy(nil), nil
	case "integration":
		return client.Integration(nil), nil
	case "interaction_response":
		return client.InteractionResponse(nil), nil
	case "invitation":
		return client.Invitation(nil), nil
	case "invocation_control":
		return client.InvocationControl(nil), nil
	case "job_log_chunk":
		return client.JobLogChunk(nil), nil
	case "job_step":
		return client.JobStep(nil), nil
	case "job_workspace":
		return client.JobWorkspace(nil), nil
	case "journey_variant_replay":
		return client.JourneyVariantReplay(nil), nil
	case "knowledge":
		return client.Knowledge(nil), nil
	case "known":
		return client.Known(nil), nil
	case "label":
		return client.Label(nil), nil
	case "lease_artifact":
		return client.LeaseArtifact(nil), nil
	case "lease_cache":
		return client.LeaseCache(nil), nil
	case "lease_log_chunk":
		return client.LeaseLogChunk(nil), nil
	case "lease_reconciliation":
		return client.LeaseReconciliation(nil), nil
	case "lease_step":
		return client.LeaseStep(nil), nil
	case "lease_verify_diagnostic":
		return client.LeaseVerifyDiagnostic(nil), nil
	case "lease_verify_secret":
		return client.LeaseVerifySecret(nil), nil
	case "lease_workspace":
		return client.LeaseWorkspace(nil), nil
	case "local_agent_decision":
		return client.LocalAgentDecision(nil), nil
	case "local_agent_response":
		return client.LocalAgentResponse(nil), nil
	case "local_thread_delivery":
		return client.LocalThreadDelivery(nil), nil
	case "local_thread_operation":
		return client.LocalThreadOperation(nil), nil
	case "location":
		return client.Location(nil), nil
	case "log_stream_chunk":
		return client.LogStreamChunk(nil), nil
	case "logo_image":
		return client.LogoImage(nil), nil
	case "marketing_setting":
		return client.MarketingSetting(nil), nil
	case "mcp_oauth":
		return client.McpOauth(nil), nil
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
	case "merge_queue_entry":
		return client.MergeQueueEntry(nil), nil
	case "merge_request":
		return client.MergeRequest(nil), nil
	case "merge_resolution":
		return client.MergeResolution(nil), nil
	case "messaging_conversation_message":
		return client.MessagingConversationMessage(nil), nil
	case "messaging_conversation_upload":
		return client.MessagingConversationUpload(nil), nil
	case "metric_query":
		return client.MetricQuery(nil), nil
	case "metronome_webhook":
		return client.MetronomeWebhook(nil), nil
	case "model_subscription_account":
		return client.ModelSubscriptionAccount(nil), nil
	case "model_subscription_account_connection":
		return client.ModelSubscriptionAccountConnection(nil), nil
	case "network_connection":
		return client.NetworkConnection(nil), nil
	case "networking_space":
		return client.NetworkingSpace(nil), nil
	case "node":
		return client.Node(nil), nil
	case "node_certificate":
		return client.NodeCertificate(nil), nil
	case "node_lease":
		return client.NodeLease(nil), nil
	case "nomad_allocation":
		return client.NomadAllocation(nil), nil
	case "nomad_log":
		return client.NomadLog(nil), nil
	case "now":
		return client.Now(nil), nil
	case "observability_clickhouse_cluster":
		return client.ObservabilityClickhouseCluster(nil), nil
	case "observability_quickwit_cluster":
		return client.ObservabilityQuickwitCluster(nil), nil
	case "observability_space":
		return client.ObservabilitySpace(nil), nil
	case "openapi":
		return client.Openapi(nil), nil
	case "org_invitation":
		return client.OrgInvitation(nil), nil
	case "organization":
		return client.Organization(nil), nil
	case "organization_app":
		return client.OrganizationApp(nil), nil
	case "organization_control":
		return client.OrganizationControl(nil), nil
	case "organization_device":
		return client.OrganizationDevice(nil), nil
	case "organization_identity_certificate":
		return client.OrganizationIdentityCertificate(nil), nil
	case "organization_interaction":
		return client.OrganizationInteraction(nil), nil
	case "organization_invitation":
		return client.OrganizationInvitation(nil), nil
	case "organization_message_file":
		return client.OrganizationMessageFile(nil), nil
	case "organization_oidc_trust":
		return client.OrganizationOidcTrust(nil), nil
	case "organization_run_event":
		return client.OrganizationRunEvent(nil), nil
	case "organization_run_outcome":
		return client.OrganizationRunOutcome(nil), nil
	case "organization_run_usage":
		return client.OrganizationRunUsage(nil), nil
	case "organization_sandbox":
		return client.OrganizationSandbox(nil), nil
	case "organization_secret":
		return client.OrganizationSecret(nil), nil
	case "organization_service_account":
		return client.OrganizationServiceAccount(nil), nil
	case "organization_setting":
		return client.OrganizationSetting(nil), nil
	case "organization_site":
		return client.OrganizationSite(nil), nil
	case "organization_subscription":
		return client.OrganizationSubscription(nil), nil
	case "organization_tool":
		return client.OrganizationTool(nil), nil
	case "organization_workload_identity":
		return client.OrganizationWorkloadIdentity(nil), nil
	case "otel_ingest":
		return client.OtelIngest(nil), nil
	case "page":
		return client.Page(nil), nil
	case "page_agent":
		return client.PageAgent(nil), nil
	case "page_artefact":
		return client.PageArtefact(nil), nil
	case "page_ci_pipeline_run":
		return client.PageCiPipelineRun(nil), nil
	case "page_project_run":
		return client.PageProjectRun(nil), nil
	case "page_repo_vc_commit":
		return client.PageRepoVcCommit(nil), nil
	case "pages_billing":
		return client.PagesBilling(nil), nil
	case "pages_github_onboarding":
		return client.PagesGithubOnboarding(nil), nil
	case "pages_member":
		return client.PagesMember(nil), nil
	case "pages_project_credential":
		return client.PagesProjectCredential(nil), nil
	case "pages_project_persona":
		return client.PagesProjectPersona(nil), nil
	case "pages_project_run":
		return client.PagesProjectRun(nil), nil
	case "pages_project_scenario":
		return client.PagesProjectScenario(nil), nil
	case "pages_registry":
		return client.PagesRegistry(nil), nil
	case "pages_session":
		return client.PagesSession(nil), nil
	case "pairing":
		return client.Pairing(nil), nil
	case "pairing_event":
		return client.PairingEvent(nil), nil
	case "parallel_v1":
		return client.ParallelV1(nil), nil
	case "patchset_diff":
		return client.PatchsetDiff(nil), nil
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
	case "proactive_agent_waitlist_entry":
		return client.ProactiveAgentWaitlistEntry(nil), nil
	case "product":
		return client.Product(nil), nil
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
	case "pull_request_action":
		return client.PullRequestAction(nil), nil
	case "pull_request_magic_merge":
		return client.PullRequestMagicMerge(nil), nil
	case "pull_request_setting":
		return client.PullRequestSetting(nil), nil
	case "pull_request_setting_add_repository":
		return client.PullRequestSettingAddRepository(nil), nil
	case "pull_request_setting_detect_comment":
		return client.PullRequestSettingDetectComment(nil), nil
	case "pull_request_transcript":
		return client.PullRequestTranscript(nil), nil
	case "pull_zone":
		return client.PullZone(nil), nil
	case "recorder":
		return client.Recorder(nil), nil
	case "registry":
		return client.Registry(nil), nil
	case "registry_v2":
		return client.RegistryV2(nil), nil
	case "relay_agent_connection":
		return client.RelayAgentConnection(nil), nil
	case "relay_agent_local_thread":
		return client.RelayAgentLocalThread(nil), nil
	case "relay_signal":
		return client.RelaySignal(nil), nil
	case "release_rollout":
		return client.ReleaseRollout(nil), nil
	case "repo":
		return client.Repo(nil), nil
	case "repo_access_token":
		return client.RepoAccessToken(nil), nil
	case "repo_action":
		return client.RepoAction(nil), nil
	case "repo_agent_checkpoint":
		return client.RepoAgentCheckpoint(nil), nil
	case "repo_agent_session":
		return client.RepoAgentSession(nil), nil
	case "repo_bookmark_protection":
		return client.RepoBookmarkProtection(nil), nil
	case "repo_bookmark_protection_event":
		return client.RepoBookmarkProtectionEvent(nil), nil
	case "repo_cloud_workspace_backup":
		return client.RepoCloudWorkspaceBackup(nil), nil
	case "repo_code_rule":
		return client.RepoCodeRule(nil), nil
	case "repo_setting":
		return client.RepoSetting(nil), nil
	case "repo_stat":
		return client.RepoStat(nil), nil
	case "repo_vc":
		return client.RepoVc(nil), nil
	case "repo_vc_commit":
		return client.RepoVcCommit(nil), nil
	case "report_replay":
		return client.ReportReplay(nil), nil
	case "report_scenario":
		return client.ReportScenario(nil), nil
	case "repository_access":
		return client.RepositoryAccess(nil), nil
	case "repository_access_resolve":
		return client.RepositoryAccessResolve(nil), nil
	case "repository_event":
		return client.RepositoryEvent(nil), nil
	case "repository_import":
		return client.RepositoryImport(nil), nil
	case "repository_import_session":
		return client.RepositoryImportSession(nil), nil
	case "repository_import_session_repository":
		return client.RepositoryImportSessionRepository(nil), nil
	case "repository_import_session_selection":
		return client.RepositoryImportSessionSelection(nil), nil
	case "repository_sandbox_environment":
		return client.RepositorySandboxEnvironment(nil), nil
	case "roder_code_repair":
		return client.RoderCodeRepair(nil), nil
	case "roder_code_repair_setting":
		return client.RoderCodeRepairSetting(nil), nil
	case "roder_machine":
		return client.RoderMachine(nil), nil
	case "roder_run":
		return client.RoderRun(nil), nil
	case "roder_workspace_credential":
		return client.RoderWorkspaceCredential(nil), nil
	case "run_artifact":
		return client.RunArtifact(nil), nil
	case "run_job":
		return client.RunJob(nil), nil
	case "run_scenario_run":
		return client.RunScenarioRun(nil), nil
	case "run_schedule_option":
		return client.RunScheduleOption(nil), nil
	case "run_search":
		return client.RunSearch(nil), nil
	case "run_update":
		return client.RunUpdate(nil), nil
	case "run_workspace_credential":
		return client.RunWorkspaceCredential(nil), nil
	case "runner_lease":
		return client.RunnerLease(nil), nil
	case "runner_pool_node_enrollment_token":
		return client.RunnerPoolNodeEnrollmentToken(nil), nil
	case "runner_pool_runner":
		return client.RunnerPoolRunner(nil), nil
	case "runtime_instance_health_snapshot":
		return client.RuntimeInstanceHealthSnapshot(nil), nil
	case "sandbox_integration":
		return client.SandboxIntegration(nil), nil
	case "scenario_revision":
		return client.ScenarioRevision(nil), nil
	case "scenario_run_lesson":
		return client.ScenarioRunLesson(nil), nil
	case "scenario_run_scenario_edit":
		return client.ScenarioRunScenarioEdit(nil), nil
	case "secret_grant":
		return client.SecretGrant(nil), nil
	case "secret_version":
		return client.SecretVersion(nil), nil
	case "service_endpoint":
		return client.ServiceEndpoint(nil), nil
	case "setting":
		return client.Setting(nil), nil
	case "setting_mutation_lease":
		return client.SettingMutationLease(nil), nil
	case "signal":
		return client.Signal(nil), nil
	case "signal_inbound":
		return client.SignalInbound(nil), nil
	case "signal_integration":
		return client.SignalIntegration(nil), nil
	case "signal_integration_delivery":
		return client.SignalIntegrationDelivery(nil), nil
	case "signal_integration_target":
		return client.SignalIntegrationTarget(nil), nil
	case "signal_subscription":
		return client.SignalSubscription(nil), nil
	case "site":
		return client.Site(nil), nil
	case "site_access_key":
		return client.SiteAccessKey(nil), nil
	case "site_preview":
		return client.SitePreview(nil), nil
	case "site_secret":
		return client.SiteSecret(nil), nil
	case "slack_channel":
		return client.SlackChannel(nil), nil
	case "source_connection":
		return client.SourceConnection(nil), nil
	case "space_alert_rule":
		return client.SpaceAlertRule(nil), nil
	case "space_audit_event":
		return client.SpaceAuditEvent(nil), nil
	case "space_dns_record":
		return client.SpaceDnsRecord(nil), nil
	case "space_enrollment_token":
		return client.SpaceEnrollmentToken(nil), nil
	case "space_gateway":
		return client.SpaceGateway(nil), nil
	case "space_group":
		return client.SpaceGroup(nil), nil
	case "space_group_membership":
		return client.SpaceGroupMembership(nil), nil
	case "space_log_stream":
		return client.SpaceLogStream(nil), nil
	case "space_metric_sery":
		return client.SpaceMetricSery(nil), nil
	case "space_otel_collector":
		return client.SpaceOtelCollector(nil), nil
	case "space_peer":
		return client.SpacePeer(nil), nil
	case "space_peer_attachment":
		return client.SpacePeerAttachment(nil), nil
	case "space_policy":
		return client.SpacePolicy(nil), nil
	case "space_segment":
		return client.SpaceSegment(nil), nil
	case "space_trace_span":
		return client.SpaceTraceSpan(nil), nil
	case "spark":
		return client.Spark(nil), nil
	case "spark_agent_integration":
		return client.SparkAgentIntegration(nil), nil
	case "spark_agent_local_thread":
		return client.SparkAgentLocalThread(nil), nil
	case "spark_agent_site":
		return client.SparkAgentSite(nil), nil
	case "spark_agent_skill":
		return client.SparkAgentSkill(nil), nil
	case "spark_agent_thread":
		return client.SparkAgentThread(nil), nil
	case "spark_credit":
		return client.SparkCredit(nil), nil
	case "spark_credit_agent_usage":
		return client.SparkCreditAgentUsage(nil), nil
	case "spark_credit_usage_total":
		return client.SparkCreditUsageTotal(nil), nil
	case "static_site":
		return client.StaticSite(nil), nil
	case "static_site_deployment":
		return client.StaticSiteDeployment(nil), nil
	case "static_site_domain":
		return client.StaticSiteDomain(nil), nil
	case "status_change":
		return client.StatusChange(nil), nil
	case "status_commit":
		return client.StatusCommit(nil), nil
	case "status_patchset":
		return client.StatusPatchset(nil), nil
	case "stripe_webhook":
		return client.StripeWebhook(nil), nil
	case "submit_telemetry":
		return client.SubmitTelemetry(nil), nil
	case "subscription_model":
		return client.SubscriptionModel(nil), nil
	case "swarm_event":
		return client.SwarmEvent(nil), nil
	case "swarm_live":
		return client.SwarmLive(nil), nil
	case "swarm_note":
		return client.SwarmNote(nil), nil
	case "swarm_task":
		return client.SwarmTask(nil), nil
	case "task_lease":
		return client.TaskLease(nil), nil
	case "thread_preview":
		return client.ThreadPreview(nil), nil
	case "thread_preview_access":
		return client.ThreadPreviewAccess(nil), nil
	case "tool_feedback":
		return client.ToolFeedback(nil), nil
	case "transcript":
		return client.Transcript(nil), nil
	case "v1_message":
		return client.V1Message(nil), nil
	case "vc_branch":
		return client.VcBranch(nil), nil
	case "vc_browser":
		return client.VcBrowser(nil), nil
	case "vc_change":
		return client.VcChange(nil), nil
	case "vc_change_group":
		return client.VcChangeGroup(nil), nil
	case "vc_file":
		return client.VcFile(nil), nil
	case "vc_merge_queue":
		return client.VcMergeQueue(nil), nil
	case "vc_stack":
		return client.VcStack(nil), nil
	case "vcs_node":
		return client.VcsNode(nil), nil
	case "vcs_setting":
		return client.VcsSetting(nil), nil
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
	case "verify_email_verification":
		return client.VerifyEmailVerification(nil), nil
	case "verify_signal_integration":
		return client.VerifySignalIntegration(nil), nil
	case "verify_static_site_domain":
		return client.VerifyStaticSiteDomain(nil), nil
	case "version_log":
		return client.VersionLog(nil), nil
	case "waitlist_application":
		return client.WaitlistApplication(nil), nil
	case "web_bot_auth":
		return client.WebBotAuth(nil), nil
	case "webhook_gitlab":
		return client.WebhookGitlab(nil), nil
	case "workflow_run_step":
		return client.WorkflowRunStep(nil), nil
	case "workflow_run_stop_notice":
		return client.WorkflowRunStopNotice(nil), nil
	case "workflow_trigger_skipped":
		return client.WorkflowTriggerSkipped(nil), nil
	case "workspace_activity":
		return client.WorkspaceActivity(nil), nil
	case "workspace_activity_notification":
		return client.WorkspaceActivityNotification(nil), nil
	case "workspace_space":
		return client.WorkspaceSpace(nil), nil
	case "workspace_space_preference":
		return client.WorkspaceSpacePreference(nil), nil
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
