# composal-mcp

[MCP](https://modelcontextprotocol.io) server exposing the Composal SDK as
2 agent tools, `composal_list` and `composal_load`, built on the
[official Go MCP SDK](https://github.com/modelcontextprotocol/go-sdk) and the
sibling Go SDK at `../go`. Runs over **stdio** (default, for spawnable installs)
or **streamable HTTP** (one shared server for several agents).

The server only reads. Create, update, patch and remove become tools too when the
SDK's own model sets `main: kit: target: 'go-mcp': tool: write: true`; they are off by default, as an agent calling
them changes the API's data.

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/composal-mcp)
make build

# 2. Provide credentials via the environment
export COMPOSAL_APIKEY=apikey_xxx

# 3a. Install into Claude Code over stdio (most common)
claude mcp add --scope user composal \
  -- /absolute/path/to/composal-mcp -transport stdio

# 3b. …or run a shared HTTP server instead
./composal-mcp -transport http -addr :8080
```

Tool-call arguments (what an agent sends):

```jsonc
// composal_list: first page of records
{ "entity": "agent", "query": { "organization_id": "example" } }

// composal_load: one record
{ "entity": "admin_org", "query": { "id": "example_id" } }
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: install and call a tool

1. **Build** the server from this `go-mcp/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/composal-mcp
   ```

2. **Set your API key:**

   ```sh
   export COMPOSAL_APIKEY=apikey_xxx
   ```

3. **Install it into Claude Code** (stdio transport):

   ```sh
   claude mcp add --scope user composal \
     -- "$PWD"/dist/*/composal-mcp -transport stdio
   ```

4. **Restart Claude Code.** The `composal_list` and `composal_load` tools now appear in new
   sessions. Ask the agent to *"list agent using composal"*
   and it calls `composal_list` with `{"entity":"agent","query":{"organization_id":"example"}}`.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export COMPOSAL_APIKEY=apikey_xxx             # API key
export COMPOSAL_BASE=https://api.example.com  # optional: override the API base URL
```

Set these in the shell that launches the server (or in the `claude mcp add`
environment) so every tool call is authenticated.

### Run as a shared HTTP server

```sh
./composal-mcp -transport http -addr :8080
```

Streamable HTTP lets several agents share one running process; stdio (the
default) spawns a fresh process per client.

### Call the `composal_list` tool

Args: `entity` (required), `query` (optional: optional filter map; omit it for the first page).
Returns the first page of records as JSON:

```jsonc
{ "entity": "agent", "query": { "organization_id": "example" } }
```

### Call the `composal_load` tool

Args: `entity` (required), `query` (required: match map naming the record, such as {"id":1}).
Returns the record as JSON:

```jsonc
{ "entity": "admin_org", "query": { "id": "example_id" } }
```

### Turn on the write tools

In the SDK's own model (`.sdk/model/sdk.aontu`), then regenerate:

```
main: kit: target: 'go-mcp': tool: write: true
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

## Reference

### Tools

| Tool | Args | Returns | MCP hints |
|------|------|---------|-----------|
| `composal_list` | `entity`, `query` (optional map) | The first page of records as JSON | read-only |
| `composal_load` | `entity`, `query` (required map) | The record as JSON | read-only |

On error, a tool returns an MCP error result (`isError: true`) whose text is the
failure message (e.g. unknown entity, or an API error).

### Entities

Each tool takes as its `entity` argument one of the entities that has its
operation, of the 555 the SDK has:

| Tool | Entities |
|------|----------|
| `composal_list` | agent, agent_app, agent_automation, agent_command, agent_connection, agent_connection_delegation, agent_connection_grant, agent_connection_safety_control, agent_connection_trigger_subscription, agent_control_flow, agent_integration_account, agent_interaction, agent_manager_choice, agent_pull_request, agent_relay_file_grant, agent_relay_file_grant_account, agent_resource, agent_routine, agent_site, agent_subagent, agent_swarm, agent_teammate, agent_tool, agent_verify_project, agent_workflow_run, agent_workflow_trigger, agent_workspace, agent_write_permission, agreement, app, app_deployment_operation, app_location, app_secret, app_service_placement, artefact, artefact_comment_thread, audit_event, billing_invoice, billing_package, billing_prepaid_purchase, binary, binary_version, browser_egress_candidate, browser_session_event, change_comment, change_reviewer, change_transcript, ci_pipeline, ci_runner_pool, connection_source, control_computer, coordination_wait, deep_scan_finding, deep_scan_option, deployment_log, deployment_metric, deployment_preview, deployment_setting, desktop_local_agent_model, device, device_browser_operation, device_control_message, device_grant, docker_builder, domain_dns_integration, domain_path_rule, dream, environment_test_account, execution_runtime_instance, exploration, finding, github_app_importable_repository, github_app_installation, github_ci_repository, github_ci_repository_compatibility_report, github_integration, github_onboarding_branch, github_runner_image, github_runner_pool, image_repository, image_repository_tag, invitation, job_log_chunk, label, location, me_email, member, memory, model_subscription_account, node, organization, organization_secret, page_artefact, pages_member, pages_project_credential, pages_project_persona, pages_project_run, pages_project_scenario, pages_session, product_map_journey, product_map_state, project, project_code_map, project_environment, project_finding, project_fixture, project_overview_pull_request, project_run_plan, project_run_schedule, project_scenario_row, pull_request_transcript, pull_zone, relay_agent_connection, repo, repo_access_token, repo_action, repo_bookmark_protection, repo_bookmark_protection_event, repo_code_rule, repo_setting, repo_vc_commit, repository_import_session_repository, run_schedule_option, run_update, runner_pool_node_enrollment_token, scenario_revision, signal, signal_integration, signal_integration_delivery, signal_integration_target, site, slack_channel, spark_agent_site, spark_agent_skill, spark_agent_thread, static_site, static_site_deployment, static_site_domain, subscription_model, swarm_event, swarm_task, transcript, vc_branch, vc_change, vc_change_group, vc_file, vc_merge_queue, vc_stack, vcs_node, verification_project_credential, verification_project_persona, verification_project_run, verification_project_scenario, version_log, workspace_space |
| `composal_load` | admin_org, agent, agent_app, agent_automation, agent_connection, agent_control_flow, agent_email, agent_event, agent_file, agent_integration, agent_integration_callback, agent_interaction, agent_marketplace, agent_marketplace_shared, agent_operation, agent_relay_file_grant, agent_repository, agent_run, agent_session_checkpoint, agent_setting, agent_site, agent_skill, agent_subscription, agent_swarm, agent_thread, agent_usage, agent_web_preview, agent_webhook, agent_workflow, agent_workflow_proposal, agent_workflow_run, agent_workflow_trigger, alert_rule_event, allocation_log, app, app_access_jwk, app_cdn, app_config_variable, app_data_resource, app_deployment, app_deployment_operation, app_environment, app_preview, app_preview_profile, app_run, app_secret, app_service, app_service_binding, app_service_placement, app_storage_resource, artefact, artifact, artifact_cache_namespace, artifact_image_repository, artifact_package_mirror, artifact_retention_policy, auth_registration_option, backend_runner_pool, bazel_action_result, bazel_backend, bazel_blob, bazel_execution, billing, billing_prepaid_period, billing_prepaid_purchase, binary, binary_version, browser_session, browser_session_control, browser_session_media, browser_session_task, cache_namespace_entry, catalog_selector, cdn_deployment, cdn_hostname, cdn_space, cdn_space_object, change, change_git_commit_identity, change_git_publication, change_transcript_summary, ci_node, ci_pipeline, ci_pipeline_run, ci_runner_pool, cli_release, cloud_workspace_backup_object, commit_diff, connection_request, control_computer_control_operation, deep_scan, deep_scan_mapped_flow, demo_share, demo_share_segment, deployment, deployment_detail, device, device_control_operation, device_enterprise_relay, device_folder_listing, docker_builder, docker_builder_session, docker_builder_setting, domain_path_rule, dream, environment, environment_discovery_run, environment_revision, environment_secret_binding, evidence, execution_desired_state, execution_reconciler_tick, execution_release, execution_runtime_instance, exploration, finding, gh, git_import, github_ci_repository, github_ci_repository_compatibility_report, github_connection, github_integration, github_onboarding, github_onboarding_import_batch, github_pull_request, github_runner_egress, github_runner_history, github_runner_image, github_runner_setup, gitlab, hosting_app_domain, import_branch_policy, integration, job_step, job_workspace, knowledge, local_thread_delivery, local_thread_operation, log_stream_chunk, marketing_setting, me, media_file, memory, merge_request, metric_query, model_subscription_account_connection, networking_space, node_lease, nomad_allocation, nomad_log, now, observability_clickhouse_cluster, observability_quickwit_cluster, observability_space, openapi, org_invitation, organization, organization_app, organization_identity_certificate, organization_oidc_trust, organization_secret, organization_service_account, organization_site, organization_workload_identity, page, page_agent, page_artefact, page_ci_pipeline_run, page_project_run, page_repo_vc_commit, pages_billing, pages_github_onboarding, pages_registry, pages_session, pairing, pairing_event, patchset_diff, personal_access_token, preview_operation, preview_profile_secret_binding, preview_sharing_approval, proactive_agent_waitlist_entry, product_map_journey, product_map_journey_replay, product_map_observation, product_map_state, project, project_environment, project_fixture, project_messaging_conversation, project_overview_metric, project_recording, project_run_plan, project_run_schedule, project_scenario_option, project_setting, pull_request, pull_request_setting, recorder, relay_agent_connection, release_rollout, repo_agent_checkpoint, repo_agent_session, repo_bookmark_protection, repo_cloud_workspace_backup, repo_code_rule, repo_stat, report_replay, repository_access_resolve, repository_import, repository_import_session, repository_sandbox_environment, roder_code_repair, roder_code_repair_setting, run_artifact, run_job, run_search, runner_lease, runner_pool_runner, runtime_instance_health_snapshot, sandbox_integration, secret_grant, secret_version, service_endpoint, setting, signal, signal_integration, signal_subscription, site_access_key, site_preview, space_alert_rule, space_audit_event, space_dns_record, space_enrollment_token, space_gateway, space_group, space_group_membership, space_log_stream, space_metric_sery, space_otel_collector, space_peer, space_peer_attachment, space_policy, space_segment, space_trace_span, spark, spark_agent_integration, spark_agent_local_thread, spark_credit, spark_credit_agent_usage, spark_credit_usage_total, static_site, static_site_deployment, static_site_domain, status_change, status_commit, status_patchset, tool_feedback, vc_change, vc_change_group, vc_merge_queue, vc_stack, vcs_setting, verification_project_credential, verification_project_persona, verification_project_run, verification_project_scenario, verify_browser_session, verify_email_verification, workspace_activity, workspace_space |

JSON schemas are emitted by the SDK from each tool's argument struct's
`json` / `jsonschema` tags — no schema is hand-written. Each tool's
`entity` is an `enum` of the entities in its row, so the server refuses
any other before it runs a call.

### Transports & flags

| Flag | Default | Purpose |
|------|---------|---------|
| `-transport` | `stdio` | `stdio` (spawnable) or `http` (streamable HTTP). |
| `-addr` | `:8080` | Listen address for the `http` transport. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `COMPOSAL_APIKEY` | API key sent with every request. |
| `COMPOSAL_BASE` | Optional override of the API base URL. |

### Smoke test via HTTP (raw JSON-RPC)

```sh
./composal-mcp -transport http -addr :18080 &

# initialize, grab the session id
curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -D headers \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}'

SESSION=$(awk '/Mcp-Session-Id/ {print $2}' headers | tr -d '\r')

curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: $SESSION" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"composal_list","arguments":{"entity":"agent","query":{"organization_id":"example"}}}}'
```

## Explanation

### How tools map to the SDK

`main.go` builds the SDK client (configured from the environment) and registers
one tool per operation the SDK's entities have. Each dispatches on the
`entity` argument to the matching entity in the sibling Go SDK at `../go`,
calls its operation, unwraps the `Entity` wrappers to plain data, and returns
it as pretty-printed JSON.

### Why two transports

**stdio** is the standard for agent hosts that spawn a server per client
(Claude Code's `claude mcp add`). **streamable HTTP** keeps one process running
that many agents can share — handy for a long-lived deployment.

### Schema generation

The input schema is derived from each tool's argument struct's `json` /
`jsonschema` tags at registration time, so the advertised tool schema can
never drift from the code that consumes it. The `entity` enum comes from the
same list the tool is registered for.

## Generated by

sdkgen `go-mcp` target. See the target source under `.sdk/src/cmp/go-mcp/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-mcp/`.
