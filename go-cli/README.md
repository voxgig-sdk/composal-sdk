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
./composal-cli load 1 agent            # {id:1} shorthand
./composal-cli load '{id:1}' agent       # explicit match map
./composal-cli list agent_automation

# 5. Override the API base URL for a single call
COMPOSAL_BASE=https://api.example.com ./composal-cli list agent

# 6. No arguments -> interactive REPL
./composal-cli
composal> list agent
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
   ./dist/*/composal-cli list agent
   ```

4. **Go interactive.** Run the binary with no arguments to open the REPL, then
   type `/help` for the word and entity lists and `/quit` to leave.

That is the whole loop: *build → set key → evaluate boru expressions*.

## How-to guides

### List the records of an entity

```sh
./composal-cli list agent
```

`list <entity>` returns the first page of records. `<entity>` is a bareword —
it is auto-quoted as an boru atom, so no quotes are needed.

### Load a single record

```sh
./composal-cli load 1 agent          # scalar shorthand for {id:1}
./composal-cli load '{id:1}' agent     # explicit match map
```

The query is either a **scalar** (`1`, treated as `{id:1}`) or a **match map**
(`{id:1}`, `{slug:"acme"}`). Quote the map so your shell passes it through intact.

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export COMPOSAL_APIKEY=apikey_xxx             # API key
export COMPOSAL_BASE=https://api.example.com  # optional: override the API base URL
./composal-cli list agent
```

Both are injectable by a secrets vault, so the key never has to be typed inline.

### Explore interactively with the REPL

Run with no arguments to open a REPL (prompt `composal>`). Each line is
evaluated as its own boru expression:

```text
$ ./composal-cli
composal> list agent
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
below — this SDK exposes 216 entities.

## Reference

### Words

The CLI registers these boru words, each bound to the SDK:

| Word     | Signatures                                    | Returns                        |
|----------|-----------------------------------------------|--------------------------------|
| `list`   | `list <entity>` · `list <query> <entity>`     | First page of records          |
| `load`   | `load <entity>` · `load <query> <entity>`     | A single record                |
| `update` | `update <query> <entity>`                     | Update a record, return it     |

- `<entity>` is a bareword, auto-quoted as an boru atom (e.g. `agent`).
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

The 216 entities this SDK exposes (any is valid as `<entity>`):

agent agent_attachment agent_automation agent_avatar agent_command agent_computer agent_connection agent_control_flow agent_coordination agent_email agent_file agent_input agent_integration agent_interaction agent_library agent_manager agent_manager_choice agent_marketplace agent_marketplace_shared agent_mission_control agent_operation agent_provisioning agent_pull_request agent_question agent_repository agent_resource agent_routine agent_run agent_runtime agent_setting agent_sharing agent_site agent_skill agent_slack agent_subagent agent_subscription agent_teammate agent_terminal agent_thread agent_tool agent_verify_project agent_wait agent_webhook agent_work agent_workflow agent_workflow_proposal agent_workflow_run agent_workflow_trigger agent_workspace agent_write_permission allocation_log app app_cdn app_config_variable app_data_resource app_deploy app_deployment app_deployment_operation app_deployment_rollback app_environment app_location app_metric app_preview app_preview_profile app_run app_secret app_service app_service_binding app_service_placement app_storage_resource attachment_part automation_event automation_run binary binary_version browser_egress_candidate browser_session browser_session_connection browser_session_control browser_session_event browser_session_media browser_session_recording browser_session_screenshot browser_session_task catalog_selector cdn_deployment cdn_hostname cdn_space cdn_space_object connection_request connection_source coordination_wait credential_sign_in_check data_resource_rotate_credential deep_scan deep_scan_finding deep_scan_flow deep_scan_mapped_flow deep_scan_option demo_share demo_share_segment deployment_dashboard_nomad deployment_file domain_path_rule dream environment environment_discovery_run environment_exploration environment_first_run environment_revision environment_secret_binding environment_test_account evidence exploration exploration_message exploration_report exploration_scenario finding github_connection hosting_app_domain image_repository integration interaction_response invitation journey_variant_replay knowledge local_thread_delivery local_thread_operation location me me_email me_onboarding media_file member memory merge_request messaging_conversation_message messaging_conversation_upload metric_query network_connection nomad_allocation nomad_log organization page page_agent page_project_run pages_project_credential pages_project_persona pages_project_run pages_project_scenario personal_access_token preview_operation preview_profile_secret_binding preview_secret preview_sharing_approval product_map_identity_decision product_map_journey product_map_journey_replay product_map_observation product_map_question product_map_state project project_android_apk project_code_map project_environment project_finding project_fixture project_ios_app project_messaging_conversation project_overview_metric project_overview_pull_request project_product_map project_recording project_run_plan project_run_schedule project_scenario_option project_scenario_row project_setting pull_request pull_request_setting pull_request_setting_add_repository pull_request_setting_detect_comment recorder registry registry_v2 relay_agent_local_thread report_replay report_scenario run_scenario_run run_schedule_option run_search run_update scenario_revision scenario_run_lesson scenario_run_scenario_edit service_endpoint site_preview slack_channel spark_agent_local_thread static_site static_site_deployment static_site_domain subscription_model thread_preview verification_project_credential verification_project_persona verification_project_run verification_project_scenario verify_app_domain verify_browser_session verify_static_site_domain version_log web_bot_auth workflow_run_step workflow_run_stop_notice workflow_trigger_skipped

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
