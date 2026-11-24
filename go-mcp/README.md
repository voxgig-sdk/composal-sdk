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
{ "entity": "agent", "query": { "id": "example_id", "organization_id": "example" } }
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
{ "entity": "agent", "query": { "id": "example_id", "organization_id": "example" } }
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
operation, of the 216 the SDK has:

| Tool | Entities |
|------|----------|
| `composal_list` | agent, agent_automation, agent_command, agent_connection, agent_control_flow, agent_integration, agent_interaction, agent_manager_choice, agent_pull_request, agent_repository, agent_resource, agent_routine, agent_setting, agent_site, agent_skill, agent_subagent, agent_subscription, agent_teammate, agent_thread, agent_tool, agent_verify_project, agent_workflow, agent_workflow_run, agent_workflow_trigger, agent_workspace, agent_write_permission, allocation_log, app, app_cdn, app_config_variable, app_data_resource, app_deployment, app_deployment_operation, app_environment, app_location, app_preview, app_preview_profile, app_run, app_secret, app_service, app_service_binding, app_service_placement, app_storage_resource, binary, binary_version, browser_egress_candidate, browser_session_event, catalog_selector, cdn_deployment, cdn_hostname, cdn_space, cdn_space_object, connection_source, coordination_wait, deep_scan, deep_scan_finding, deep_scan_mapped_flow, deep_scan_option, domain_path_rule, dream, environment, environment_secret_binding, environment_test_account, exploration, finding, github_connection, hosting_app_domain, image_repository, integration, invitation, location, me_email, member, memory, metric_query, nomad_log, organization, page_agent, pages_project_credential, pages_project_persona, pages_project_run, pages_project_scenario, personal_access_token, preview_operation, preview_profile_secret_binding, preview_sharing_approval, product_map_journey, product_map_state, project, project_code_map, project_environment, project_finding, project_fixture, project_overview_metric, project_overview_pull_request, project_run_plan, project_run_schedule, project_scenario_option, project_scenario_row, project_setting, pull_request_setting, run_schedule_option, run_update, scenario_revision, service_endpoint, slack_channel, static_site, static_site_deployment, static_site_domain, subscription_model, verification_project_credential, verification_project_persona, verification_project_run, verification_project_scenario, version_log |
| `composal_load` | agent, agent_automation, agent_connection, agent_control_flow, agent_email, agent_file, agent_interaction, agent_marketplace, agent_marketplace_shared, agent_operation, agent_run, agent_webhook, agent_workflow_proposal, agent_workflow_run, agent_workflow_trigger, app, app_cdn, app_config_variable, app_data_resource, app_deployment, app_deployment_operation, app_environment, app_preview, app_preview_profile, app_run, app_secret, app_service, app_service_binding, app_service_placement, app_storage_resource, binary, binary_version, browser_session, browser_session_control, browser_session_media, browser_session_task, cdn_deployment, cdn_hostname, cdn_space, cdn_space_object, connection_request, deep_scan, demo_share, demo_share_segment, domain_path_rule, dream, environment, environment_discovery_run, environment_revision, evidence, exploration, finding, hosting_app_domain, knowledge, local_thread_delivery, local_thread_operation, me, media_file, memory, merge_request, nomad_allocation, organization, page, page_project_run, product_map_journey, product_map_journey_replay, product_map_observation, product_map_state, project, project_environment, project_fixture, project_messaging_conversation, project_recording, project_run_plan, project_run_schedule, pull_request, recorder, report_replay, run_search, service_endpoint, site_preview, spark_agent_local_thread, static_site, static_site_deployment, static_site_domain, verification_project_credential, verification_project_persona, verification_project_run, verification_project_scenario, verify_browser_session |

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
