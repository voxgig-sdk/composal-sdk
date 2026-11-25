# composal-cli

boru-driven command-line client **and** interactive REPL for the Composal
SDK. Each command line is parsed as a single [boru](https://github.com/boru-lang/boru)
expression and evaluated against the live API; run it with no arguments to drop
into a REPL. Built on `github.com/boru-lang/boru/eng/go` and the sibling Go SDK
at `../go`.

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/composal-cli)
make build

# 2. See usage (words, entities, env vars)
./composal-cli --help

# 3. Provide credentials once, via the environment
export COMPOSAL_APIKEY=apikey_xxx

# 4. Each command line is ONE boru expression, run against the API:
./composal-cli list agent

# 5. Override the API base URL for a single call
COMPOSAL_BASE=https://api.example.com ./composal-cli --help

# 6. No arguments -> interactive REPL
./composal-cli
composal> /help
composal> /quit
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: your first query in under a minute

1. **Build the binary.** From this `go-cli/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/composal-cli
   ```

2. **Set your API key** (read from the environment):

   ```sh
   export COMPOSAL_APIKEY=apikey_xxx
   ```

3. **Run a query.** Evaluate an boru expression against the API (or run with no
   arguments to open the REPL):

   ```sh
   ./dist/*/composal-cli --help
   ```

4. **Go interactive.** Run the binary with no arguments to open the REPL, then
   type `/help` for the word and entity lists and `/quit` to leave.

That is the whole loop: *build → set key → evaluate boru expressions*.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export COMPOSAL_APIKEY=apikey_xxx             # API key
export COMPOSAL_BASE=https://api.example.com  # optional: override the API base URL
./composal-cli --help
```

Both are injectable by a secrets vault, so the key never has to be typed inline.

### Explore interactively with the REPL

Run with no arguments to open a REPL (prompt `composal>`). Each line is
evaluated as its own boru expression:

```text
$ ./composal-cli
composal> /help
composal> /quit
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

### Discover the available entities

`/help` in the REPL prints the full entity list, or see [Entities](#entities)
below — this SDK exposes 558 entities.

## Reference

### Words

The CLI registers these boru words, each bound to the SDK:

| Word     | Signatures                                    | Returns                        |
|----------|-----------------------------------------------|--------------------------------|
| `list`   | `list <entity>` · `list <query> <entity>`     | First page of records          |
| `load`   | `load <entity>` · `load <query> <entity>`     | A single record                |
| `update` | `update <query> <entity>`                     | Update a record, return it     |

- `<entity>` is a bareword, auto-quoted as an boru atom (e.g. `a2a_well_known`).
- `<query>` is either a **Map** (`{id:1}`) or a **Scalar** (`1`, treated as
  `{id:1}`). A scalar is always wrapped as `{id:<value>}`.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `COMPOSAL_APIKEY` | API key sent with every request. |
| `COMPOSAL_BASE` | Optional override of the API base URL. |

Unset variables fall back to the SDK's built-in defaults.

### CLI flags

- `--help` / `-h` — print usage (words, entities, env vars) and exit.

### REPL commands

Meta-commands use the `/` prefix (everything else on a line is evaluated as boru):

- `/quit` / `/q` / `/exit` — exit the REPL
- `/help` / `/h` / `/?`     — show the word list, entity list and meta commands

### Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success (also the normal REPL exit). |
| `1` | Parse error, word-registration error, or an API/evaluation error. |

### Build targets

| Target | Result |
|--------|--------|
| `make build` | Native binary at `dist/<os>-<arch>/composal-cli`. |
| `make build-all` | linux/darwin/windows x amd64/arm64, each under its own `dist/<os>-<arch>/`. |
| `make clean` | Remove `dist/` and any stray binaries. |

### Entities

The 558 entities this SDK exposes (any is valid as `<entity>`):

a2a_well_known admin_org agent agent_app agent_app_install agent_attachment agent_avatar agent_command agent_computer agent_connection agent_connection_delegation agent_connection_grant agent_connection_resource agent_connection_safety_control agent_connection_trigger_subscription agent_context_checkpoint agent_control_flow agent_coordination agent_email agent_event agent_file agent_input agent_integration agent_integration_account agent_integration_callback agent_interaction agent_library agent_manager agent_manager_choice agent_marketplace agent_marketplace_shared agent_mission_control agent_operation agent_provisioning agent_pull_request agent_question agent_relay_file_grant agent_relay_file_grant_account agent_repository agent_resource agent_roder agent_routine agent_run agent_runtime agent_session agent_session_checkpoint agent_session_roder_handoff agent_setting agent_sharing agent_site agent_skill agent_slack agent_subagent agent_subscription agent_swarm agent_teammate agent_terminal agent_thread agent_tool agent_usage agent_verify_project agent_wait agent_web_preview agent_webhook agent_work agent_workflow agent_workflow_proposal agent_workflow_run agent_workflow_trigger agent_workspace agent_write_permission agreement agreement_access_request alert_rule_event allocation_log app app_access app_access_jwk app_cdn app_config_variable app_data_resource app_deploy app_deployment app_deployment_dashboard app_deployment_operation app_deployment_rollback app_environment app_location app_metric app_preview app_preview_profile app_run app_secret app_service app_service_binding app_service_placement app_storage_resource artefact artefact_comment_thread artefact_revision artefact_view_token artifact artifact_cache_namespace artifact_image_repository artifact_package_mirror artifact_retention_policy attachment_part audit_event auth auth_cli auth_github auth_google auth_openai auth_password_reset auth_registration_option automation_event automation_run backend_runner_pool bazel bazel_action_result bazel_backend bazel_blob bazel_execution bazel_find_missing_blob billing billing_addon billing_budget billing_checkout_session billing_contact billing_extra_spend billing_invoice billing_package billing_portal_session billing_prepaid_period billing_prepaid_purchase billing_subscription billing_token_top_up billing_usage binary binary_version bookmark_protection_refresh_github_required_check browser_egress_candidate browser_session browser_session_connection browser_session_control browser_session_event browser_session_media browser_session_recording browser_session_screenshot browser_session_task cache_namespace_entry catalog_selector cdn_deployment cdn_hostname cdn_space cdn_space_object change change_asset change_comment change_file_review_checkpoint change_git_branch_submission change_git_commit_identity change_git_publication change_group_member change_label change_landing_hold change_landing_request change_request_change change_reviewer change_transcript change_transcript_summary checkpoint_prepare_chunk ci_node ci_pipeline ci_pipeline_run ci_runner_pool ci_status cli_event cli_release cloud_workspace_backup_object code_rule_evaluation com_site_access com_site_access_session comment_thread_comment commit_diff connection_request connection_source contact_submission control_computer control_computer_control_operation coordination_wait credential_sign_in_check data_resource_rotate_credential deep_scan deep_scan_finding deep_scan_flow deep_scan_mapped_flow deep_scan_option demo_share demo_share_segment deployment deployment_dashboard_nomad deployment_detail deployment_file deployment_log deployment_metric deployment_preview deployment_setting desktop_local_agent_model desktop_local_agent_response device device_browser_operation device_control_message device_enterprise_relay device_folder_listing device_grant device_invocation device_local_event device_operation device_pairing device_project device_scheduled_check_in docker_builder docker_builder_session docker_builder_setting domain_dns_integration domain_path_rule dream edge email_verification environment_discovery_run environment_exploration environment_first_run environment_revision environment_secret_binding environment_test_account execution_desired_state execution_reconciler_tick execution_release execution_runtime_instance exploration exploration_message exploration_report exploration_scenario finding gh git_import github github_app github_app_importable_repository github_app_installation github_app_installation_authorization github_app_user_authorization github_ci_repository github_ci_repository_compatibility_report github_connection github_onboarding github_onboarding_branch github_onboarding_import github_onboarding_import_batch github_onboarding_import_item github_pull_request github_runner_admission github_runner_cache github_runner_egress github_runner_history github_runner_image github_runner_pool github_runner_setup gitlab gitlab_connection gitlab_import gitlab_oauth grant_all_agent hosting_app_domain identity_organization image_repository image_repository_tag import_branch_policy integration interaction_response invitation invocation_control job_log_chunk job_step job_workspace journey_variant_replay knowledge known label lease_artifact lease_cache lease_log_chunk lease_reconciliation lease_step lease_verify_diagnostic lease_verify_secret lease_workspace local_agent_decision local_agent_response local_thread_delivery local_thread_operation location log_stream_chunk logo_image marketing_setting mcp_oauth me me_email me_onboarding media_file member memory merge_queue_entry merge_resolution messaging_conversation_message messaging_conversation_upload metric_query metronome_webhook model_subscription_account model_subscription_account_connection network_connection networking_space node node_certificate node_lease nomad_allocation nomad_log now observability_clickhouse_cluster observability_quickwit_cluster observability_space openapi org_invitation organization organization_app organization_control organization_device organization_identity_certificate organization_interaction organization_invitation organization_message_file organization_oidc_trust organization_run_event organization_run_outcome organization_run_usage organization_sandbox organization_secret organization_service_account organization_setting organization_site organization_subscription organization_tool organization_workload_identity otel_ingest page page_agent page_artefact page_ci_pipeline_run page_project_run page_repo_vc_commit pages_billing pages_github_integration pages_github_onboarding pages_member pages_project_credential pages_project_persona pages_project_run pages_project_scenario pages_registry pages_session pairing pairing_event parallel_v1 patchset_diff personal_access_token preview_operation preview_profile_secret_binding preview_secret preview_sharing_approval proactive_agent_waitlist_entry product product_map_identity_decision product_map_journey product_map_journey_replay product_map_observation product_map_question product_map_state project project_android_apk project_code_map project_environment project_finding project_fixture project_ios_app project_messaging_conversation project_overview_metric project_overview_pull_request project_pr_testing project_product_map project_product_map_comparison project_recording project_run_plan project_run_schedule project_scenario_option project_scenario_row project_setting pull_request_action pull_request_magic_merge pull_request_setting pull_request_setting_add_repository pull_request_setting_detect_comment pull_request_transcript pull_zone recorder registry registry_v2 relay_agent_connection relay_agent_local_thread relay_signal release_rollout repo repo_access_token repo_action repo_agent_checkpoint repo_agent_session repo_bookmark_protection repo_bookmark_protection_event repo_cloud_workspace_backup repo_code_rule repo_setting repo_stat repo_vc repo_vc_commit report_replay report_scenario repository_access repository_access_resolve repository_event repository_import repository_import_session repository_import_session_repository repository_import_session_selection repository_sandbox_environment roder_code_repair roder_code_repair_setting roder_machine roder_run roder_workspace_credential run_artifact run_job run_scenario_run run_schedule_option run_search run_update run_workspace_credential runner_lease runner_pool_node_enrollment_token runner_pool_runner runtime_instance_health_snapshot sandbox_integration scenario_revision scenario_run_lesson scenario_run_scenario_edit secret_grant secret_version service_endpoint setting setting_mutation_lease signal signal_inbound signal_integration signal_integration_delivery signal_integration_target signal_subscription site site_access_key site_preview site_secret slack_channel source_connection space_alert_rule space_audit_event space_dns_record space_enrollment_token space_gateway space_group space_group_membership space_log_stream space_metric_sery space_otel_collector space_peer space_peer_attachment space_policy space_segment space_trace_span spark spark_agent_integration spark_agent_local_thread spark_agent_site spark_agent_skill spark_agent_thread spark_automation spark_credit spark_credit_agent_usage spark_credit_usage_total static_site static_site_deployment static_site_domain status_change status_commit status_patchset stripe_webhook submit_telemetry subscription_model swarm_event swarm_live swarm_note swarm_task task_lease thread_preview thread_preview_access tool_feedback transcript v1_message vc_branch vc_browser vc_change vc_change_group vc_file vc_merge_queue vc_stack vcs_node vcs_setting verification_project_credential verification_project_persona verification_project_run verification_project_scenario verify_app_domain verify_browser_session verify_email_verification verify_environment verify_evidence verify_merge_request verify_pull_request verify_signal_integration verify_static_site_domain version_log waitlist_application web_bot_auth webhook_gitlab workflow_run_step workflow_run_stop_notice workflow_trigger_skipped workspace_activity workspace_activity_notification workspace_space workspace_space_preference

## Explanation

### Why boru?

The whole command line is one [boru](https://github.com/boru-lang/boru) expression,
not a fixed `verb --flag` grammar. That means the same binary works one-shot
(`./composal-cli <expr>`) and interactively (the REPL), and expressions compose the
same way in both. `list` / `load` / `update` are ordinary boru *words* bound to
the SDK — adding SDK operations is adding words, not re-parsing flags.

### How it is wired

`main.go` builds the SDK client (configured from the environment), creates an
boru registry, and `words.go` registers `list` / `load` / `update` as native
words that dispatch on the entity atom and call the sibling Go SDK at `../go`.
Results are unwrapped from their `Entity` wrappers to plain data before being
printed.

### Output format

Each result value is printed as its boru string form (a JSON-like rendering of
the record or list of records). One-shot mode prints to stdout; errors go to
stderr with a non-zero exit code.

## Generated by

sdkgen `go-cli` target. See the target source under `.sdk/src/cmp/go-cli/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-cli/`.
