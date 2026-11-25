package sdktest

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"runtime"
	"strconv"
	"strings"
	"testing"
)

// testSeed is a test-mode fixture seeded for every entity, as Go source, so
// the offline mock transport has data to return. It is NOT spliced into each
// snippet: it is written ONCE per generated package as seed.go, and snippets
// reference it by name (seedRef).
//
// Splicing it inline was O(snippets x entities). Every fragment lands in ONE
// package, so a large API multiplied one ~26 KB composite literal by every
// ```go block in the docs: gitlab reached 1132 fragments / ~625k literal
// entries in a single compilation unit, and `compile` grew ~15 MB per fragment
// to ~16 GB — the same superlinear-composite-literal blowup the L1 config data
// path fixed for core/config.go. One shared var is O(1) in the snippet count.
const testSeed = `map[string]any{"entity": map[string]any{"a2a_well_known": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "admin_org": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_app": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_app_install": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_attachment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_avatar": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_command": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_computer": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection_delegation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection_grant": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection_resource": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection_safety_control": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_connection_trigger_subscription": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_context_checkpoint": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_control_flow": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_coordination": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_email": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_file": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_input": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_integration_account": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_integration_callback": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_interaction": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_library": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_manager": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_manager_choice": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_marketplace": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_marketplace_shared": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_mission_control": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_provisioning": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_pull_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_question": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_relay_file_grant": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_relay_file_grant_account": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_resource": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_roder": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_routine": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_runtime": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_session_checkpoint": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_session_roder_handoff": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_sharing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_site": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_skill": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_slack": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_subagent": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_subscription": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_swarm": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_teammate": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_terminal": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_thread": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_tool": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_usage": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_verify_project": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_wait": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_web_preview": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_webhook": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_work": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_workflow": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_workflow_proposal": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_workflow_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_workflow_trigger": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_workspace": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agent_write_permission": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agreement": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "agreement_access_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "alert_rule_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "allocation_log": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_access": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_access_jwk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_cdn": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_config_variable": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_data_resource": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_deploy": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_deployment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_deployment_dashboard": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_deployment_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_deployment_rollback": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_environment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_location": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_metric": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_preview": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_preview_profile": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_secret": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_service": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_service_binding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_service_placement": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "app_storage_resource": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artefact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artefact_comment_thread": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artefact_revision": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artefact_view_token": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artifact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artifact_cache_namespace": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artifact_image_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artifact_package_mirror": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "artifact_retention_policy": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "attachment_part": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "audit_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_cli": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_github": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_google": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_openai": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_password_reset": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "auth_registration_option": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "automation_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "automation_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "backend_runner_pool": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel_action_result": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel_backend": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel_blob": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel_execution": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bazel_find_missing_blob": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_addon": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_budget": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_checkout_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_contact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_extra_spend": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_invoice": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_package": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_portal_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_prepaid_period": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_prepaid_purchase": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_subscription": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_token_top_up": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "billing_usage": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "binary": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "binary_version": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "bookmark_protection_refresh_github_required_check": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_egress_candidate": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_control": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_media": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_recording": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_screenshot": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "browser_session_task": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cache_namespace_entry": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "catalog_selector": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cdn_deployment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cdn_hostname": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cdn_space": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cdn_space_object": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_asset": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_comment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_file_review_checkpoint": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_git_branch_submission": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_git_commit_identity": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_git_publication": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_group_member": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_label": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_landing_hold": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_landing_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_request_change": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_reviewer": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_transcript": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "change_transcript_summary": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "checkpoint_prepare_chunk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "ci_node": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "ci_pipeline": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "ci_pipeline_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "ci_runner_pool": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "ci_status": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cli_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cli_release": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "cloud_workspace_backup_object": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "code_rule_evaluation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "com_site_access": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "com_site_access_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "comment_thread_comment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "commit_diff": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "connection_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "connection_source": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "contact_submission": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "control_computer": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "control_computer_control_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "coordination_wait": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "credential_sign_in_check": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "data_resource_rotate_credential": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deep_scan": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deep_scan_finding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deep_scan_flow": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deep_scan_mapped_flow": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deep_scan_option": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "demo_share": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "demo_share_segment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_dashboard_nomad": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_detail": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_file": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_log": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_metric": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_preview": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "deployment_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "desktop_local_agent_model": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "desktop_local_agent_response": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_browser_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_control_message": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_enterprise_relay": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_folder_listing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_grant": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_invocation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_local_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_pairing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_project": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "device_scheduled_check_in": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "docker_builder": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "docker_builder_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "docker_builder_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "domain_dns_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "domain_path_rule": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "dream": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "edge": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "email_verification": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_discovery_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_exploration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_first_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_revision": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_secret_binding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "environment_test_account": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "execution_desired_state": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "execution_reconciler_tick": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "execution_release": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "execution_runtime_instance": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "exploration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "exploration_message": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "exploration_report": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "exploration_scenario": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "finding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "gh": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "git_import": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_app": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_app_importable_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_app_installation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_app_installation_authorization": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_app_user_authorization": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_ci_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_ci_repository_compatibility_report": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_onboarding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_onboarding_branch": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_onboarding_import": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_onboarding_import_batch": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_onboarding_import_item": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_pull_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_admission": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_cache": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_egress": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_history": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_image": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_pool": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "github_runner_setup": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "gitlab": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "gitlab_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "gitlab_import": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "gitlab_oauth": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "grant_all_agent": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "hosting_app_domain": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "identity_organization": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "image_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "image_repository_tag": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "import_branch_policy": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "interaction_response": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "invitation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "invocation_control": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "job_log_chunk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "job_step": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "job_workspace": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "journey_variant_replay": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "knowledge": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "known": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "label": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_artifact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_cache": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_log_chunk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_reconciliation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_step": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_verify_diagnostic": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_verify_secret": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "lease_workspace": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "local_agent_decision": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "local_agent_response": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "local_thread_delivery": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "local_thread_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "location": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "log_stream_chunk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "logo_image": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "marketing_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "mcp_oauth": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "me": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "me_email": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "me_onboarding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "media_file": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "member": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "memory": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "merge_queue_entry": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "merge_resolution": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "messaging_conversation_message": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "messaging_conversation_upload": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "metric_query": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "metronome_webhook": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "model_subscription_account": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "model_subscription_account_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "network_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "networking_space": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "node": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "node_certificate": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "node_lease": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "nomad_allocation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "nomad_log": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "now": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "observability_clickhouse_cluster": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "observability_quickwit_cluster": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "observability_space": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "openapi": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "org_invitation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_app": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_control": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_device": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_identity_certificate": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_interaction": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_invitation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_message_file": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_oidc_trust": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_run_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_run_outcome": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_run_usage": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_sandbox": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_secret": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_service_account": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_site": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_subscription": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_tool": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "organization_workload_identity": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "otel_ingest": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page_agent": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page_artefact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page_ci_pipeline_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page_project_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "page_repo_vc_commit": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_billing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_github_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_github_onboarding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_member": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_project_credential": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_project_persona": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_project_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_project_scenario": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_registry": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pages_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pairing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pairing_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "parallel_v1": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "patchset_diff": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "personal_access_token": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "preview_operation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "preview_profile_secret_binding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "preview_secret": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "preview_sharing_approval": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "proactive_agent_waitlist_entry": map[string]any{"example_id": map[string]any{"id": "example_id", "referral_code": "example_id"}}, "product": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_identity_decision": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_journey": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_journey_replay": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_observation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_question": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "product_map_state": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_android_apk": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_code_map": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_environment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_finding": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_fixture": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_ios_app": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_messaging_conversation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_overview_metric": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_overview_pull_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_pr_testing": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_product_map": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_product_map_comparison": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_recording": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_run_plan": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_run_schedule": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_scenario_option": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_scenario_row": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "project_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_action": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_magic_merge": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_setting_add_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_setting_detect_comment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_request_transcript": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "pull_zone": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "recorder": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "registry": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "registry_v2": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "relay_agent_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "relay_agent_local_thread": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "relay_signal": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "release_rollout": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_access_token": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_action": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_agent_checkpoint": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_agent_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_bookmark_protection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_bookmark_protection_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_cloud_workspace_backup": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_code_rule": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_stat": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_vc": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repo_vc_commit": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "report_replay": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "report_scenario": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_access": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_access_resolve": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_import": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_import_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_import_session_repository": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_import_session_selection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "repository_sandbox_environment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "roder_code_repair": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "roder_code_repair_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "roder_machine": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "roder_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "roder_workspace_credential": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_artifact": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_job": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_scenario_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_schedule_option": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_search": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_update": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "run_workspace_credential": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "runner_lease": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "runner_pool_node_enrollment_token": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "runner_pool_runner": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "runtime_instance_health_snapshot": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "sandbox_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "scenario_revision": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "scenario_run_lesson": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "scenario_run_scenario_edit": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "secret_grant": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "secret_version": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "service_endpoint": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "setting_mutation_lease": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal_inbound": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal_integration_delivery": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal_integration_target": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "signal_subscription": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "site": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "site_access_key": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "site_preview": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "site_secret": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "slack_channel": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "source_connection": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_alert_rule": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_audit_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_dns_record": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_enrollment_token": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_gateway": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_group": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_group_membership": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_log_stream": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_metric_sery": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_otel_collector": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_peer": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_peer_attachment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_policy": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_segment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "space_trace_span": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_agent_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_agent_local_thread": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_agent_site": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_agent_skill": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_agent_thread": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_automation": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_credit": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_credit_agent_usage": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "spark_credit_usage_total": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "static_site": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "static_site_deployment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "static_site_domain": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "status_change": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "status_commit": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "status_patchset": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "stripe_webhook": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "submit_telemetry": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "subscription_model": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "swarm_event": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "swarm_live": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "swarm_note": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "swarm_task": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "task_lease": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "thread_preview": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "thread_preview_access": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "tool_feedback": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "transcript": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "v1_message": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_branch": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_browser": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_change": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_change_group": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_file": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_merge_queue": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vc_stack": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vcs_node": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "vcs_setting": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verification_project_credential": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verification_project_persona": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verification_project_run": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verification_project_scenario": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_app_domain": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_browser_session": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_email_verification": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_environment": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_evidence": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_merge_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_pull_request": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_signal_integration": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "verify_static_site_domain": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "version_log": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "waitlist_application": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "web_bot_auth": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "webhook_gitlab": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workflow_run_step": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workflow_run_stop_notice": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workflow_trigger_skipped": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workspace_activity": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workspace_activity_notification": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workspace_space": map[string]any{"example_id": map[string]any{"id": "example_id"}}, "workspace_space_preference": map[string]any{"example_id": map[string]any{"id": "example_id"}}}}`

// seedRef is how a snippet names the shared fixture; seedFile declares it.
const seedRef = "readmeTestSeed"

// The client variable, not the word: an import path carries the word between
// hyphens (github.com/voxgig-sdk/multifon-client-sdk/go).
var clientVar = regexp.MustCompile(`(^|[^\w.\-/"])client([^\w\-/"]|$)`)

func seedFile(pkg string) []byte {
	return []byte("package " + pkg + "\n\nvar " + seedRef + " = " + testSeed + "\n")
}

// doc names one of the three docs that carry go examples, with its path
// relative to this test file's directory (which is <repo>/go/test): the root
// README is two levels up, the go docs are one.
type doc struct {
	label   string
	relpath string
}

// docStat accumulates the completeness bookkeeping for one doc.
type docStat struct {
	total        int
	compiled     int
	illustration int
	leaked       []int
}

// TestReadmeGoSnippets is a completeness gate over every ```go fenced block
// in the root README.md, go/README.md, and go/REFERENCE.md. Fragments are
// `go build`-checked with a seeded test client injected; complete programs
// are built as-is and their test-mode variant is run with `go run`; and per
// doc, total == compiled + illustration is asserted.
func TestReadmeGoSnippets(t *testing.T) {
	_, thisFile, _, _ := runtime.Caller(0)
	testDir := filepath.Dir(thisFile)
	moduleRoot := filepath.Dir(testDir)

	modulePath := readModulePath(moduleRoot)
	if modulePath == "" {
		t.Fatal("could not read module path from go.mod")
	}

	docs := []doc{
		{"root README", filepath.Join(testDir, "..", "..", "README.md")},
		{"go/README", filepath.Join(testDir, "..", "README.md")},
		{"go/REFERENCE", filepath.Join(testDir, "..", "REFERENCE.md")},
	}

	// The work dir has to live inside the module (the snippets import the SDK
	// by module path), but it MUST stay invisible to `go build ./...`. The go
	// tool skips directories whose name starts with "_" for wildcard matching
	// while still building them by explicit path — exactly what is needed
	// here, because `defer os.RemoveAll` does NOT run when the process is
	// killed. A leftover frag package inside the module made the NEXT plain
	// `go build ./...` compile every snippet and OOM, which is how a killed
	// run poisoned later runs (and, once committed, every fresh clone).
	// Sweeping first lets a repo that already carries one self-heal.
	sweepStaleWorkDirs(moduleRoot)

	work, err := os.MkdirTemp(moduleRoot, "_readmecheck-")
	if err != nil {
		t.Fatalf("mkdir temp: %v", err)
	}
	defer os.RemoveAll(work)
	rel := filepath.Base(work)

	binDir := filepath.Join(work, "bin")
	if err := os.MkdirAll(binDir, 0o755); err != nil {
		t.Fatal(err)
	}

	fragDir := filepath.Join(work, "frag")
	fragFiles := map[string]string{}
	var progDirs []string
	var runDirs []string
	progCount := 0

	stats := make([]*docStat, len(docs))

	for di, d := range docs {
		src, err := os.ReadFile(d.relpath)
		if err != nil {
			t.Fatalf("%s not found at %s: %v", d.label, d.relpath, err)
		}
		blocks := extractFencedBlocks(string(src), "go")
		if len(blocks) == 0 {
			t.Fatalf("no go code blocks in %s", d.label)
		}
		st := &docStat{total: len(blocks)}
		stats[di] = st

		for bi, block := range blocks {
			if isIllustration(block) {
				st.illustration++
				continue
			}
			if strings.Contains(block, "/*") {
				// Real code hidden behind a block comment: neither a
				// recognized illustration nor safely compilable as-is. Flag
				// it so the completeness assertion catches a would-be
				// silently-skipped example rather than dropping it.
				st.leaked = append(st.leaked, bi+1)
				continue
			}
			if strings.Contains(block, "func main") {
				// The documented program (possibly using the live sdk.New)
				// must compile as-is.
				dir := filepath.Join(work, "prog"+strconv.Itoa(progCount))
				if err := os.MkdirAll(dir, 0o755); err != nil {
					t.Fatal(err)
				}
				if err := os.WriteFile(filepath.Join(dir, "main.go"), []byte(block), 0o644); err != nil {
					t.Fatal(err)
				}
				progDirs = append(progDirs, "./"+rel+"/prog"+strconv.Itoa(progCount))

				// A test-mode variant — constructor rewritten to a seeded
				// sdk.TestSDK(...) — is run offline to prove the program runs.
				if variant, ok := rewriteCtorsToTest(block); ok {
					if !strings.Contains(variant, "os.") {
						variant = removeImportLine(variant, "os")
					}
					runDir := filepath.Join(work, "run"+strconv.Itoa(progCount))
					if err := os.MkdirAll(runDir, 0o755); err != nil {
						t.Fatal(err)
					}
					if err := os.WriteFile(filepath.Join(runDir, "main.go"), []byte(variant), 0o644); err != nil {
						t.Fatal(err)
					}
					// The rewritten ctors reference the shared fixture.
					if err := os.WriteFile(filepath.Join(runDir, "seed.go"), seedFile("main"), 0o644); err != nil {
						t.Fatal(err)
					}
					runDirs = append(runDirs, "./"+rel+"/run"+strconv.Itoa(progCount))
				}

				progCount++
				st.compiled++
				continue
			}
			name := "snip" + strconv.Itoa(len(fragFiles))
			fragFiles[name] = wrapFragment(name, block, modulePath)
			st.compiled++
		}
	}

	fragPkg := ""
	if len(fragFiles) > 0 {
		if err := os.MkdirAll(fragDir, 0o755); err != nil {
			t.Fatal(err)
		}
		// One shared fixture for the whole fragment package (see testSeed).
		if err := os.WriteFile(filepath.Join(fragDir, "seed.go"), seedFile("readmefrag"), 0o644); err != nil {
			t.Fatal(err)
		}
		fragPkg = "./" + rel + "/frag"
	}

	if len(progDirs) == 0 && fragPkg == "" {
		t.Fatal("no buildable go snippets across docs")
	}

	// Build. The Go compiler is the oracle for unused imports/vars in the
	// wrapped fragments: blank them out and rebuild. Any OTHER error is a
	// genuine snippet bug and fails the test. The loop is progress-based,
	// not attempt-capped: `-gcflags=-e` lifts the compiler's 10-error cap so
	// every error surfaces in one round, applyFixes repairs them all, and
	// the loop continues while a round makes progress. It fails hard when no
	// fix applies, and fails as non-converged when a round changes nothing
	// in the build output (the fixes stopped helping).
	var lastOut string
	for {
		for name, content := range fragFiles {
			if err := os.WriteFile(filepath.Join(fragDir, name+".go"), []byte(content), 0o644); err != nil {
				t.Fatal(err)
			}
		}
		out, buildErr := runGoBuild(moduleRoot, binDir, progDirs, fragPkg)
		if buildErr == nil {
			break
		}
		if out == lastOut {
			t.Fatalf("README go snippets did not converge to a clean build:\n%s", out)
		}
		lastOut = out
		if !applyFixes(out, fragFiles) {
			t.Fatalf("README go snippet failed to compile:\n%s", out)
		}
	}

	// Everything compiled. Now RUN the test-mode variants of the complete
	// programs and fail on a genuine runtime panic.
	if fail := runProgs(moduleRoot, runDirs); fail != "" {
		t.Fatal(fail)
	}

	// Completeness: every block in every doc is either compiled/run or a
	// recognized (narrow) illustration. A leaked block or a count mismatch is
	// a silently-untested example and fails the gate.
	for di, d := range docs {
		st := stats[di]
		if len(st.leaked) > 0 {
			t.Errorf("%s: go block(s) %v are neither compiled nor a "+
				"recognized illustration (silently untested) — use // "+
				"comments with real code, or a bare signature / /* ... */ "+
				"placeholder", d.label, st.leaked)
		}
		if st.total != st.compiled+st.illustration {
			t.Errorf("%s completeness: total %d != compiled %d + "+
				"illustration %d", d.label, st.total, st.compiled,
				st.illustration)
		}
		fmt.Printf("[readme-go] %s: total=%d compiled=%d illustration=%d\n",
			d.label, st.total, st.compiled, st.illustration)
	}
}

// runProgs executes each test-mode program variant with `go run` and reports
// a genuine runtime panic (nil pointer / nil map / index / interface
// conversion). A tolerated not-found domain error (panic(err) on an offline
// fixture miss) is not a failure. A run-variant that fails to even compile is
// skipped — the documented program already passed the strict build check, so
// a rewrite artefact must not manufacture a false failure.
func runProgs(moduleRoot string, dirs []string) string {
	runtimeSigs := []string{
		"runtime error",
		"invalid memory address",
		"nil pointer dereference",
		"index out of range",
		"slice bounds out of range",
		"interface conversion",
		"assignment to entry in nil map",
	}
	for _, d := range dirs {
		cmd := exec.Command("go", "run", d)
		cmd.Dir = moduleRoot
		out, err := cmd.CombinedOutput()
		if err == nil {
			continue
		}
		s := string(out)
		if !strings.Contains(s, "panic:") {
			// Did not run (compile artefact of the rewrite) — tolerate.
			continue
		}
		for _, sig := range runtimeSigs {
			if strings.Contains(s, sig) {
				return "README go complete program panicked at runtime " +
					"(nil / type bug in a documented call):\n" + s
			}
		}
		// Domain-error panic (e.g. offline fixture miss) — tolerated.
	}
	return ""
}

// rewriteCtorsToTest replaces every sdk.New.../sdk.Test... constructor call
// in src with a seeded test-mode client, so a documented (possibly live)
// program runs offline against the mock, and a fragment whose constructor
// takes undefined placeholder variables still type-checks. Single
// left-to-right pass with balanced-paren matching; returns the rewritten
// source and whether any replacement was made.
func rewriteCtorsToTest(src string) (string, bool) {
	repl := "sdk.TestSDK(" + seedRef + ", nil)"
	var b strings.Builder
	changed := false
	i := 0
	for i < len(src) {
		matched := ""
		if strings.HasPrefix(src[i:], "sdk.New") {
			matched = "sdk.New"
		} else if strings.HasPrefix(src[i:], "sdk.Test") {
			matched = "sdk.Test"
		}
		if matched == "" {
			b.WriteByte(src[i])
			i++
			continue
		}
		// Consume the rest of the identifier (e.g. NewAdviceSlipSDK, TestSDK).
		j := i + len(matched)
		for j < len(src) && isIdentByte(src[j]) {
			j++
		}
		if j >= len(src) || src[j] != '(' {
			b.WriteString(src[i:j])
			i = j
			continue
		}
		// Scan the balanced ( ... ) argument list.
		depth := 0
		k := j
		for k < len(src) {
			switch src[k] {
			case '(':
				depth++
			case ')':
				depth--
			}
			k++
			if depth == 0 {
				break
			}
		}
		b.WriteString(repl)
		changed = true
		i = k
	}
	return b.String(), changed
}

func isIdentByte(c byte) bool {
	return c == '_' ||
		(c >= 'a' && c <= 'z') ||
		(c >= 'A' && c <= 'Z') ||
		(c >= '0' && c <= '9')
}

// runGoBuild type-checks the fragment package with `go build -gcflags=-e`
// (a non-main package produces no output but is still fully type-checked —
// unlike `go build -o dir/`, which skips non-main packages — and `-e` lifts
// the compiler's 10-errors-per-package cap so EVERY unused-var/import error
// surfaces in a single round), and builds each complete program with
// `-o binDir/`. Any compile error from either is returned.
func runGoBuild(dir, binDir string, progDirs []string, fragPkg string) (string, error) {
	var out strings.Builder
	if fragPkg != "" {
		cmd := exec.Command("go", "build", "-gcflags=-e", fragPkg)
		cmd.Dir = dir
		o, err := cmd.CombinedOutput()
		out.Write(o)
		if err != nil {
			return out.String(), err
		}
	}
	if len(progDirs) > 0 {
		args := append([]string{"build", "-gcflags=-e", "-o", binDir + string(os.PathSeparator)}, progDirs...)
		cmd := exec.Command("go", args...)
		cmd.Dir = dir
		o, err := cmd.CombinedOutput()
		out.Write(o)
		if err != nil {
			return out.String(), err
		}
	}
	return out.String(), nil
}

func extractFencedBlocks(md, lang string) []string {
	var blocks []string
	lines := strings.Split(md, "\n")
	open := "```" + lang
	inBlock := false
	var cur []string
	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if !inBlock {
			if trimmed == open {
				inBlock = true
				cur = nil
			}
			continue
		}
		if trimmed == "```" {
			blocks = append(blocks, strings.Join(cur, "\n"))
			inBlock = false
			continue
		}
		cur = append(cur, line)
	}
	return blocks
}

// isIllustration is the NARROW class of blocks that are intentionally not
// compiled:
//   - a bare signature: a top-level func line with no body;
//   - a comment-only block: nothing remains after stripping // and /* */;
//   - a /* ... */ value-slot placeholder: a fill-in-the-blank template such as
//     "field": /* type */, that is deliberately not compilable.
// Every other block is compiled or run.
func isIllustration(block string) bool {
	trimmed := strings.TrimSpace(block)
	if strings.HasPrefix(trimmed, "func ") && !strings.Contains(block, "{") {
		return true
	}
	if strings.TrimSpace(stripGoComments(block)) == "" {
		return true
	}
	if hasPlaceholderComment(block) {
		return true
	}
	return false
}

// hasPlaceholderComment reports whether the block uses a /* ... */ comment in a
// value slot — immediately after ':', '=', '(', '{' or ',' (ignoring spaces) —
// i.e. the comment stands in for a value (`"field": /* type */,`), making the
// block a non-compilable illustration. A /* ... */ elsewhere (an incidental
// block comment) is NOT a placeholder, so a block that merely contains one is
// left for the completeness gate to flag rather than silently skip.
func hasPlaceholderComment(block string) bool {
	i := 0
	for {
		j := strings.Index(block[i:], "/*")
		if j < 0 {
			return false
		}
		start := i + j
		p := start - 1
		for p >= 0 && (block[p] == ' ' || block[p] == '\t') {
			p--
		}
		if p >= 0 {
			switch block[p] {
			case ':', '=', '(', '{', ',':
				return true
			}
		}
		end := strings.Index(block[start+2:], "*/")
		if end < 0 {
			return false
		}
		i = start + 2 + end + 2
	}
}

// stripGoComments removes /* ... */ block comments and // line comments so a
// placeholder-only block can be recognized.
func stripGoComments(s string) string {
	var b strings.Builder
	i := 0
	for i < len(s) {
		if i+1 < len(s) && s[i] == '/' && s[i+1] == '*' {
			j := strings.Index(s[i+2:], "*/")
			if j < 0 {
				break
			}
			i = i + 2 + j + 2
			continue
		}
		if i+1 < len(s) && s[i] == '/' && s[i+1] == '/' {
			k := strings.IndexByte(s[i:], '\n')
			if k < 0 {
				break
			}
			i += k
			continue
		}
		b.WriteByte(s[i])
		i++
	}
	return b.String()
}

// stripImportLines drops any single-line `import ...` statement from a
// fragment. Quick-start fragments carry their own import line (e.g.
// `import sdk "..."`), which is illegal inside the function wrapper; the
// wrapper re-adds the correct imports itself.
func stripImportLines(block string) string {
	var kept []string
	for _, line := range strings.Split(block, "\n") {
		if strings.HasPrefix(strings.TrimSpace(line), "import ") {
			continue
		}
		kept = append(kept, line)
	}
	return strings.Join(kept, "\n")
}

func wrapFragment(name, block, modulePath string) string {
	// Drop stray import lines and rewrite constructors to the seeded test
	// client so placeholder args (options, testopts, ...) type-check.
	block = stripImportLines(block)
	if rewritten, ok := rewriteCtorsToTest(block); ok {
		block = rewritten
	}

	declaresClient := strings.Contains(block, "client :=")
	injectClient := !declaresClient && clientVar.MatchString(block)

	needSdk := injectClient || strings.Contains(block, "sdk.")
	usesFmt := strings.Contains(block, "fmt.")
	usesOs := strings.Contains(block, "os.")
	usesCore := strings.Contains(block, "core.")
	usesEntity := strings.Contains(block, "entity.")

	var imports []string
	if usesFmt {
		imports = append(imports, "\t\"fmt\"")
	}
	if usesOs {
		imports = append(imports, "\t\"os\"")
	}
	if needSdk {
		imports = append(imports, "\tsdk \""+modulePath+"\"")
	}
	if usesCore {
		imports = append(imports, "\t\""+modulePath+"/core\"")
	}
	if usesEntity {
		imports = append(imports, "\t\""+modulePath+"/entity\"")
	}

	var b strings.Builder
	b.WriteString("package readmefrag\n\n")
	if len(imports) > 0 {
		b.WriteString("import (\n")
		b.WriteString(strings.Join(imports, "\n"))
		b.WriteString("\n)\n\n")
	}
	b.WriteString("func " + name + "() {\n")
	if injectClient {
		// Seeded test client so the fragment's documented calls have data.
		b.WriteString("\tclient := sdk.TestSDK(" + seedRef + ", nil)\n")
	}
	b.WriteString(block)
	b.WriteString("\n}\n")
	return b.String()
}

func applyFixes(out string, fragFiles map[string]string) bool {
	changed := false
	for _, line := range strings.Split(out, "\n") {
		if !strings.Contains(line, ".go:") {
			continue
		}
		key := snipKeyFromLine(line)
		if key == "" {
			continue
		}
		content, ok := fragFiles[key]
		if !ok {
			continue
		}
		if strings.Contains(line, "imported and not used") {
			pkg := quoted(line)
			if pkg != "" {
				nc := removeImportLine(content, pkg)
				if nc != content {
					fragFiles[key] = nc
					changed = true
				}
			}
		} else if strings.Contains(line, "not used") {
			nm := unusedName(line)
			if nm != "" {
				fragFiles[key] = addBlankAssign(content, nm)
				changed = true
			}
		}
	}
	return changed
}

func snipKeyFromLine(line string) string {
	i := strings.Index(line, "snip")
	if i < 0 {
		return ""
	}
	rest := line[i:]
	j := strings.Index(rest, ".go")
	if j < 0 {
		return ""
	}
	return rest[:j]
}

func quoted(line string) string {
	a := strings.Index(line, "\"")
	if a < 0 {
		return ""
	}
	b := strings.Index(line[a+1:], "\"")
	if b < 0 {
		return ""
	}
	return line[a+1 : a+1+b]
}

func unusedName(line string) string {
	marker := "not used:"
	i := strings.Index(line, marker)
	if i >= 0 {
		return strings.TrimSpace(line[i+len(marker):])
	}
	// Fallback: "<name> declared but not used"
	d := strings.Index(line, " declared")
	if d < 0 {
		return ""
	}
	head := strings.TrimSpace(line[:d])
	parts := strings.Fields(head)
	if len(parts) == 0 {
		return ""
	}
	return parts[len(parts)-1]
}

func removeImportLine(content, pkg string) string {
	needle := "\"" + pkg + "\""
	var kept []string
	for _, line := range strings.Split(content, "\n") {
		t := strings.TrimSpace(line)
		// An import spec line ends with the quoted path (with optional
		// alias prefix); the `import (` opener does not.
		if strings.HasSuffix(t, needle) && !strings.HasPrefix(t, "import") {
			continue
		}
		kept = append(kept, line)
	}
	return strings.Join(kept, "\n")
}

func addBlankAssign(content, name string) string {
	// Insert `_ = name` before the final closing brace of the func.
	last := strings.LastIndex(content, "}")
	if last < 0 {
		return content
	}
	return content[:last] + "\t_ = " + name + "\n" + content[last:]
}

// sweepStaleWorkDirs removes work dirs abandoned by a killed run, under both
// the current "_readmecheck-" name and the legacy "readmecheck-" one that
// `go build ./...` still picks up.
func sweepStaleWorkDirs(moduleRoot string) {
	entries, err := os.ReadDir(moduleRoot)
	if err != nil {
		return
	}
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		if n := e.Name(); strings.HasPrefix(n, "readmecheck-") ||
			strings.HasPrefix(n, "_readmecheck-") {
			os.RemoveAll(filepath.Join(moduleRoot, n))
		}
	}
}

func readModulePath(moduleRoot string) string {
	data, err := os.ReadFile(filepath.Join(moduleRoot, "go.mod"))
	if err != nil {
		return ""
	}
	for _, line := range strings.Split(string(data), "\n") {
		t := strings.TrimSpace(line)
		if strings.HasPrefix(t, "module ") {
			return strings.TrimSpace(strings.TrimPrefix(t, "module"))
		}
	}
	return ""
}
