# Composal API

Composal runs AI agents for engineering teams: always-on persistent agents with their own instructions, memory and triggers, and Verify, whose browser agents test real user journeys on pull-request previews and releases. Its HTTP API also covers app hosting and a container registry.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 216 entities and 726 HTTP routes. There are 7 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Agent](docs/api/agent.html)

A persistent agent: list, create, read or delete one, rename it, change who can see it, and read its conversation, usage and runtime (actions).

Results: Success; Browser opening recorded; Read recorded; Agent Slack settings; Ephemeral OpenAI realtime client secret (never the provider API key); Native agent lifecycle response; Ephemeral OpenAI transcription client secret (never the provider API key); Preparation requested or not needed; Authorized agent with current configuration and version tokens; Private identity and initialization accepted; setup is pending Git recovery; Authorized agent roster; Private message image; Authorized private image; Recent root tasks issued by this thread, including durable waits and reports; Rails custody or native acknowledgement for this exact submission; waiting does not prove native acceptance; Authorized bounded room observation; Authorized operator result; Available models for this thread; Authorized agent settings; Bounded receipt metadata without copied prompts or results; Requester-authorized paired computer choices for a new thread; Agent workspace; Native conversation history; Superadmin debug facts beside one conversation; The agent&#39;s inbox; Agent environment metadata; values are never returned; The saved choice and the identity in use; Agent sidebar response; Validated card, or a safe text fallback while the worker generates it; What the agent&#39;s runs used over the window, subagents&#39; included; Agent sandbox resources; Sandbox configuration; Selected private agent subscription quota and conversation usage; Agent removed; runtime revocation queued; Saved agent model; Renamed agent with current permissions and version; Order saved; Agent with current sharing and permissions; Updated thread model.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `attention`: Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model&#39;s verdict on its last reply (question when `reply_triage` is `needs_you`). Null when nothing waits or the agent is not active. Clients map it to labels and never classify messages or run status themselves.
- `avatar`: Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. Null selects the default icon. Omission preserves legacy configuration bytes.
- `can_delete`: Whether this viewer may delete this v2 agent.
- `can_manage`: Only the owner may connect, configure or disconnect it.
- `can_name_managers`: Whether the viewer may name managers now. True for an owner or named manager of an agent shared with the team; search whom to name with the `manager_choices` endpoint.

### [AgentAttachment](docs/api/agent_attachment.html)

Results: The upload is ready to send; The upload, with the number and size of its parts.

SDK operations: `create`.

### [AgentAutomation](docs/api/agent_automation.html)

Results: Native automation definitions stored in Rails; Automation with updated schedule.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `can_manage_events`: Whether new event triggers can be attached or existing settings saved. Pause and remove use each trigger’s `can_pause` and `can_remove` fields, which remain available without Temporal enrollment.
- `can_run`: Whether the viewer can request a manual Temporal run

### [AgentAvatar](docs/api/agent_avatar.html)

Results: Generation accepted or exact receipt replayed; Generation request accepted or exact receipt replayed; Authorized avatar configuration.

SDK operations: `create`, `load`.

### [AgentCommand](docs/api/agent_command.html)

Results: Available chat commands.

SDK operations: `list`.

### [AgentComputer](docs/api/agent_computer.html)

Results: Private computer connection; Preparing computer control; Short-lived private browser egress connection; Agent workspace; Current computer frame.

SDK operations: `create`, `load`.

### [AgentConnection](docs/api/agent_connection.html)

Results: Current owner connection result.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `credential`: Write-only outbound key.

### [AgentControlFlow](docs/api/agent_control_flow.html)

Results: Current requester Control workflows.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `repair_of_flow_id`: Original retained workflow for an explicitly repaired failed task.

### [AgentCoordination](docs/api/agent_coordination.html)

Results: Success; Stop retained for exact-run delivery; execution may still be stopping.

SDK operations: `create`.

### [AgentEmail](docs/api/agent_email.html)

Results: The message as a plain-text document.

SDK operations: `load`.

Key fields to recognise:

- `delivery`: What SES reported for mail the agent sent; null for received mail
- `direction`: inbound: mail the agent received; outbound: mail it sent
- `recipient_tag`: The +tag the sender used, if any
- `spam`: SES judged it spam
- `text`: From, To, Subject and Date headers, a blank line, then the body as plain text

### [AgentFile](docs/api/agent_file.html)

Results: Receipt-bound file download.

SDK operations: `load`.

### [AgentInput](docs/api/agent_input.html)

A message sent to an agent in a conversation. Accepting it starts a run; the reply arrives in the conversation.

Results: Previously accepted run receipt or completed control. Native /stop returns cancellation details without a new `run_id`; observe the affected runs for their final state.; Message held durably by Rails or acknowledged by native runtime. Waiting does not prove native acceptance; poll `input_delivery` until acknowledged.

SDK operations: `create`.

Key fields to recognise:

- `attachment_ids`: Completed uploads from the attachments endpoint, in order.
- `browser_context`: Advisory snapshot of the browser pane beside this conversation when the message was sent.
- `client_time`: The sending app&#39;s IANA time zone and clock, so the agent answers in the person&#39;s local time.
- `conversation_id`: Main or a conversation identity returned by the agent thread list.
- `requester_membership_id`: Snapshot the membership supplied by conversation history for a NEW V1 input.

### [AgentIntegration](docs/api/agent_integration.html)

Results: Organization accounts available to this V2 agent.

SDK operations: `create`, `list`.

Key fields to recognise:

- `account_counts`: Accounts the viewer can see per toolkit, across all account pages.
- `accounts_path`: Web path of the organization&#39;s Integrations page, where people reconnect and remove the accounts this agent lists. Add `integrations_q` to show one app.
- `added_toolkits`: Apps with a connected or connecting account the viewer can see. The Apps panel lists them among the agent&#39;s accounts rather than as apps to add.
- `can_manage`: Only the owner may connect, configure or disconnect it.
- `connect_as`: The account Connect creates and switches on for this agent: the owner&#39;s own (personal) or, for an admin connecting someone else&#39;s agent, the team&#39;s (organization). Null when the viewer cannot connect apps here.

### [AgentInteraction](docs/api/agent_interaction.html)

Results: Interaction cancelled, or durable cancellation receipt replayed; Bound setup and transient secure authorization link; Current authorized interaction states in the explicit conversation; Current authorized interaction state and durable response receipt.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: Durable request ID; at most 256 UTF-8 bytes.

### [AgentLibrary](docs/api/agent_library.html)

Results: Generated file.

SDK operations: `load`.

### [AgentManager](docs/api/agent_manager.html)

Results: Agent with its current managers; The teammate no longer manages the agent.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `attention`: Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model&#39;s verdict on its last reply (question when `reply_triage` is `needs_you`). Null when nothing waits or the agent is not active. Clients map it to labels and never classify messages or run status themselves.
- `avatar`: Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. Null selects the default icon. Omission preserves legacy configuration bytes.
- `can_delete`: Whether this viewer may delete this v2 agent.
- `can_name_managers`: Whether the viewer may name managers now. True for an owner or named manager of an agent shared with the team; search whom to name with the `manager_choices` endpoint.
- `can_queue_input`: Current V2 authority to admit a durable input independently of native readiness.

### [AgentManagerChoice](docs/api/agent_manager_choice.html)

Results: Matching teammates.

SDK operations: `list`.

### [AgentMarketplace](docs/api/agent_marketplace.html)

Agent listings in the organization&#39;s marketplace: browse them, publish, change or remove one, or install one (action).

Results: Installed agent; Published listing; Listing; Marketplace listings; Listing draft; Public marketplace listings; Listing removed from the marketplace; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `catalog_key`: Stable key of a Composal listing, which names its character; null for other listings.
- `category`: The section&#39;s category; &quot;composal&quot; names the section of Composal&#39;s own listings.
- `explainer`: The listing&#39;s public write-up in Markdown.
- `from_composal`: One of Composal&#39;s ready-made listings.
- `listing`: The listing being edited, or null for a new one.

### [AgentMarketplaceShared](docs/api/agent_marketplace_shared.html)

Results: Installed agent; Listing opened from a share link; Listing.

SDK operations: `create`, `load`.

Key fields to recognise:

- `catalog_key`: Stable key of a Composal listing, which names its character; null for other listings.
- `explainer`: The listing&#39;s public write-up in Markdown.
- `from_composal`: One of Composal&#39;s ready-made listings.
- `publisher_avatar_url`: The publisher&#39;s own profile picture; null for Composal&#39;s listings and publishers without one.
- `publisher_name`: &quot;Composal&quot; on listings Composal publishes.

### [AgentMissionControl](docs/api/agent_mission_control.html)

Results: Success; Recorded, or ignored when disabled or the reply is no longer current; Verdicts for readable agents whose latest preview is their own reply. A missing agent was not judged. Disabled organizations get no verdicts.

SDK operations: `create`.

### [AgentOperation](docs/api/agent_operation.html)

Results: Authorized operator result.

SDK operations: `create`, `load`.

Key fields to recognise:

- `arguments`: JSON object limited to 65536 encoded bytes.
- `requester_id`: Signed-in user public ID returned by discovery.

### [AgentProvisioning](docs/api/agent_provisioning.html)

Results: Setup retry accepted. Poll the Spark to check its progress.

SDK operations: `create`.

### [AgentPullRequest](docs/api/agent_pull_request.html)

Results: Pull requests with current GitHub status and owning conversations.

SDK operations: `list`.

### [AgentQuestion](docs/api/agent_question.html)

Results: The agent received the answer.

SDK operations: `create`.

### [AgentRepository](docs/api/agent_repository.html)

Results: Repository grants, editor choices and optimistic version; What this call prepared. A build still running at the default branch head is building even while thread sandboxes start from an earlier ready revision, which the repositories read shows. Repeated calls reuse the same revision, running setup run or running branch check.

SDK operations: `list`, `update`.

Key fields to recognise:

- `environments`: Sandbox environment per granted repository ID, shared by every bot granted that repository.
- `repository_choices_error`: GitHub discovery warning. Saved grants and known local repository choices remain available.

### [AgentResource](docs/api/agent_resource.html)

Results: Authorized operator result.

SDK operations: `list`.

### [AgentRoutine](docs/api/agent_routine.html)

An agent&#39;s scheduled routines and heartbeat: list them, or change one (pause or enable it).

Results: Agent sidebar response.

SDK operations: `list`, `update`.

Key fields to recognise:

- `credit_wait`: The wallet funding an enabled routine that is waiting for inference credit.

### [AgentRun](docs/api/agent_run.html)

One run of an agent&#39;s work, with its status.

Results: Native run state.

SDK operations: `load`.

### [AgentRuntime](docs/api/agent_runtime.html)

Results: Agent sandbox resources.

SDK operations: `create`.

### [AgentSetting](docs/api/agent_setting.html)

Results: Agent configuration.

SDK operations: `list`, `update`.

### [AgentSharing](docs/api/agent_sharing.html)

Results: Accounts sharing would stop.

SDK operations: `load`.

### [AgentSite](docs/api/agent_site.html)

Results: Agent sidebar response.

SDK operations: `list`.

Key fields to recognise:

- `https`: Whether the organization&#39;s certificate serves this site over HTTPS

### [AgentSkill](docs/api/agent_skill.html)

Results: Agent configuration; Managed skill settings accepted for a replacement runtime revision. The catalog remains the last observed native state until qualification.

SDK operations: `create`, `list`.

Key fields to recognise:

- `configuration_state`: The requested managed skill selection is awaiting runtime qualification.

### [AgentSlack](docs/api/agent_slack.html)

Results: Agent Slack settings; The agent&#39;s As you Slack state.

SDK operations: `create`.

### [AgentSubagent](docs/api/agent_subagent.html)

Results: Agent workspace.

SDK operations: `list`.

Key fields to recognise:

- `attention`: Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish.
- `state`: What the thread is to the viewer. `needs_you` only when the thread asked the person or flagged that it needs them (attention); otherwise null while an idle thread has not been judged.

### [AgentSubscription](docs/api/agent_subscription.html)

Results: Agent subscription settings; Enterprise subscription selection accepted; the new revision must qualify before use.

SDK operations: `create`, `list`.

### [AgentTeammate](docs/api/agent_teammate.html)

Results: Shared team agents.

SDK operations: `list`.

Key fields to recognise:

- `avatar`: Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. Null selects the default icon. Omission preserves legacy configuration bytes.

### [AgentTerminal](docs/api/agent_terminal.html)

Results: Private computer connection; Preparing computer control.

SDK operations: `create`.

### [AgentThread](docs/api/agent_thread.html)

An agent&#39;s conversations: list or start one, or archive, compact or snooze it (actions).

Results: Thread archive state confirmed; history is retained; Native agent lifecycle response; Snooze confirmed by the runtime. New activity in the thread also wakes it.

SDK operations: `create`, `list`.

Key fields to recognise:

- `archived_count`: Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. Null or omitted when the runtime cannot establish the complete total without an unbounded archive read; never a loaded-page count.
- `execution`: `device_folder` threads also report state and path; sandbox threads run on their own machine with the coding agent in harness.
- `first_input_key`: Idempotency-Key that finds the first message through `input_delivery`. Present with `first_input`.
- `first_input_requester_membership_id`: Membership the first message was sent as, for `input_delivery`. Absent when it is bound to none.
- `inherit_context`: Include the source conversation through its last completed reply.

### [AgentTool](docs/api/agent_tool.html)

Results: Authorized operator result.

SDK operations: `list`.

### [AgentVerifyProject](docs/api/agent_verify_project.html)

Results: Granted Verify projects, choices and optimistic version.

SDK operations: `list`, `update`.

Key fields to recognise:

- `available`: Whether Verify is on for the organization; hide Verify access when false.
- `can_manage`: Whether the viewer can manage the agent and is a Verify admin.
- `project_choices`: Every granted project, then other Verify projects up to the choice limit.

### [AgentWait](docs/api/agent_wait.html)

Results: Success; Wait cancelled; its child tasks continue.

SDK operations: `create`.

### [AgentWebhook](docs/api/agent_webhook.html)

Results: Created connection; signing key is shown once; Connection metadata without secrets or event content; Updated connection; only a new rotation reveals a signing key.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `signing_key`: Revealed only by the first successful creation or rotation response.

### [AgentWork](docs/api/agent_work.html)

Results: Work handled.

SDK operations: `create`.

### [AgentWorkflow](docs/api/agent_workflow.html)

Results: Native workflow catalog including the new workflow; Native Lobster workflow files for the selected agent; Updated native workflow catalog.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `source`: At most 262144 UTF-8 bytes
- `template`: A template id from the catalog&#39;s templates

### [AgentWorkflowProposal](docs/api/agent_workflow_proposal.html)

Results: The revised proposal; The saved proposal; The proposal and its steps.

SDK operations: `create`, `load`.

Key fields to recognise:

- `agent_steps`: The model and reasoning the workflow&#39;s agent steps share.
- `base_digest`: The saved workflow this proposal changes; null for a new workflow.
- `can_revise`: The viewer can choose the model and reasoning of the agent steps now, before saving.
- `can_save`: The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks.
- `can_set_trigger`: Saved as proposed with nothing starting it, so saving again sets its trigger.

### [AgentWorkflowRun](docs/api/agent_workflow_run.html)

Results: The reopened run, whose stopped step the agent&#39;s worker runs again with the answer; The reopened run, whose checkpoint the agent&#39;s worker answers with the decision; a decline ends the run; The ended run; a run that worked in a thread made for it also has that thread archived; The reopened run, which the agent&#39;s worker continues from its failed step; Recorded workflow runs, newest first; A recorded workflow run and its steps; Each workflow&#39;s runs over the last 30 days.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `automation`: Saved native automation identity. Name is its current catalog name; version identifies the immutable definition this run uses. Null for legacy runs.
- `budget_seconds`: The run stops once it has been running this long
- `budget_usd`: The run stops before a step once it has spent this much
- `can_answer`: Whether this viewer can answer the step that stopped the run; the answer runs that step again
- `can_approve`: Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one

### [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html)

The triggers that start an agent&#39;s workflows: list, read, change or remove one, or pause or resume it (actions).

Results: What starts this agent&#39;s workflows without a chat turn; A workflow&#39;s run settings; The version a person last checked and the file as it is now; Events the workflow skipped today, newest first; Success; The trigger no longer starts its workflow; The changed run settings; The paused workflow&#39;s run settings; The resumed workflow&#39;s run settings.

SDK operations: `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `budget`: Each run&#39;s limits, and what the trigger may spend per period with its runs&#39; spend in the current one
- `can_pause`: It is running, so a manager can pause it
- `can_resume`: A person paused it, so a manager can resume it
- `can_review`: The file changed and nobody checked it, so a manager can review it and resume
- `daily_limit`: How many events a day may start an event workflow&#39;s runs

### [AgentWorkspace](docs/api/agent_workspace.html)

Results: Retained workspaces and reserved capacity, independent of native runtime availability; Durable workspace action; deletion is not confirmed until both resources return 404.

SDK operations: `list`, `update`.

### [AgentWritePermission](docs/api/agent_write_permission.html)

Results: The agent&#39;s write permissions, by tool; The permission is removed.

SDK operations: `list`, `remove`.

Key fields to recognise:

- `account`: Whose account the writes run as, as the preview named it, such as Maya Chen through Linear.
- `in_effect`: Whether the permission approves writes now. False once the person who gave it can no longer manage the agent.
- `tool`: The tool the agent writes with, such as linear.`update_issue`.

### [AllocationLog](docs/api/allocation_log.html)

Results: Live Nomad task logs.

SDK operations: `list`.

### [App](docs/api/app.html)

An app hosted by Composal: list, create, read, change, activate, archive or delete one.

Results: Success; Hosted app created; Hosted apps visible to the current user; Hosted app configuration catalog; Hosted app deployment dashboard; Hosted app updated.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppCdn](docs/api/app_cdn.html)

Results: Updated app CDN distribution; App CDN deployment action completed; App CDN distribution created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppConfigVariable](docs/api/app_config_variable.html)

Results: Updated app configuration variable; App configuration variable created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppDataResource](docs/api/app_data_resource.html)

Results: Success; Updated app data resource; Restored app data resource created; App data resource created.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppDeploy](docs/api/app_deploy.html)

Results: Success.

SDK operations: `create`.

Key fields to recognise:

- `environment`: Environment slug or public ID, all, or existing.
- `rollout_predecessor`: Public deployment operation ID from the same app that must succeed before this rollout starts.
- `service`: Service slug or public ID; required unless `app_service_id` is supplied.

### [AppDeployment](docs/api/app_deployment.html)

A deployment of a hosted app: list, start, read or cancel one.

Results: Updated app deployment; App deployment created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppDeploymentOperation](docs/api/app_deployment_operation.html)

Results: Logical deployment operation; Logical deployment operations; Aggregate deployment operation live status.

SDK operations: `create`, `list`, `load`.

### [AppDeploymentRollback](docs/api/app_deployment_rollback.html)

Results: Existing idempotent deployment rollback; Deployment rollback created; Deployment rollback plan.

SDK operations: `create`.

### [AppEnvironment](docs/api/app_environment.html)

A hosted app&#39;s environments: list, create, read, change, pause, resume, archive or remove one.

Results: Updated app environment; App environment created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppLocation](docs/api/app_location.html)

Results: Hosting location enabled for an app; Available hosting locations; Success; Hosting location disabled for an app.

SDK operations: `create`, `list`, `remove`.

### [AppMetric](docs/api/app_metric.html)

Results: Success.

SDK operations: `load`.

### [AppPreview](docs/api/app_preview.html)

Results: Success; Selected deployment operations accepted; Refreshed preview; Expiring source refresh review; Preview with the selected resolved revision and current generation; Created preview; Preview administration page; Preview administration index.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `change_number`: Organization Change number, optionally prefixed with #; mutually exclusive with `source_ref`.
- `expected_generation`: Required for `resource_overrides`, `storage_binding_resources`, `shared_service_binding_ids` or `shared_data_binding_ids`; stale generations return 409.
- `expected_patchset`: Optional public Change patchset fence; stale selections return 409.
- `resource_overrides`: Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.
- `shared_data_binding_ids`: Replace explicitly shared captured native data connections.

### [AppPreviewProfile](docs/api/app_preview_profile.html)

Results: Created preview defaults; Success; Updated preview defaults.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppRun](docs/api/app_run.html)

Results: Success.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `image`: Optional fully qualified digest-pinned image from the deployed service&#39;s registry and repository.

### [AppSecret](docs/api/app_secret.html)

Results: Success; Updated secret metadata after new version; Created secret metadata; Bulk import result summary; List of secret metadata objects; Secret metadata; Raw secret value for the current active version; Dotenv-formatted secrets (KEY=value pairs); Updated secret metadata; Secret deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppService](docs/api/app_service.html)

Results: Updated app service; App service created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `deploy_paths`: Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. Empty means default to the app `root_path`.
- `effective_deploy_paths`: Tracked paths actually applied by the auto-deploy trigger (explicit `deploy_paths`, else [`root_path`]).
- `memory_max_mb`: Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). `memory_mb` stays the reservation the scheduler places against, so raising this does not make a rollout harder to place. Must be &gt;= `memory_mb`. Memory above the reservation is oversubscribed and best effort: under node pressure the kernel reclaims it and can OOM-kill the task. Null/absent renders no limit beyond the reservation.
- `nomad_kill_timeout_seconds`: Seconds the task gets after SIGTERM before SIGKILL. Null/absent leaves Nomad&#39;s 5s default. Capped at 30 because a Nomad client silently clamps `kill_timeout` to its own `max_kill_timeout` (default 30s).
- `nomad_shutdown_delay_seconds`: Seconds Nomad waits between deregistering the group&#39;s services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. Null/absent leaves Nomad&#39;s 0s default.

### [AppServiceBinding](docs/api/app_service_binding.html)

Results: Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppServicePlacement](docs/api/app_service_placement.html)

Results: Service placements; Service placement; Configured service placement.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `deployment_channel`: Preview-only override; null inherits the captured source channel.

### [AppStorageResource](docs/api/app_storage_resource.html)

Results: Storage resource archived; Success; App storage resource created.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `access_mode`: Object-store semantics only; ignored for volume resources
- `attachment`: Attachment readback: CSI publish state for `nomad_csi`, or the nodes carrying the directory for `local_nvme`. Nil until provisioned
- `capacity_gb`: Enforced for `nomad_csi` (minimum 10 GB).
- `ephemeral`: True when the contents may be deleted at any time and do not survive the loss of the underlying node. Ephemeral storage is a cache and must never hold a system of record.
- `external_volume_id`: Nomad/CSI volume id assigned at provisioning

### [AttachmentPart](docs/api/attachment_part.html)

Results: Part stored.

SDK operations: `update`.

### [AutomationEvent](docs/api/automation_event.html)

Results: Automation with updated event trigger.

SDK operations: `update`.

Key fields to recognise:

- `can_manage_events`: Whether new event triggers can be attached or existing settings saved. Pause and remove use each trigger’s `can_pause` and `can_remove` fields, which remain available without Temporal enrollment.
- `can_run`: Whether the viewer can request a manual Temporal run

### [AutomationRun](docs/api/automation_run.html)

Results: The manually requested run, using the reviewed version.

SDK operations: `create`.

Key fields to recognise:

- `automation`: Saved native automation identity. Name is its current catalog name; version identifies the immutable definition this run uses. Null for legacy runs.
- `budget_seconds`: The run stops once it has been running this long
- `budget_usd`: The run stops before a step once it has spent this much
- `can_answer`: Whether this viewer can answer the step that stopped the run; the answer runs that step again
- `can_approve`: Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one

### [Binary](docs/api/binary.html)

Results: Safe project-scoped binary response.

SDK operations: `create`, `list`, `load`.

### [BinaryVersion](docs/api/binary_version.html)

Results: Safe project-scoped binary response; Success; Unreferenced version and owned resources deleted.

SDK operations: `create`, `list`, `load`, `remove`.

### [BrowserEgressCandidate](docs/api/browser_egress_candidate.html)

Results: Owner-scoped automatic routing candidates; no compute is acquired.

SDK operations: `list`.

### [BrowserSession](docs/api/browser_session.html)

A browser runner: open one, hand control between your client and the agent, read its media, or close it.

Results: Success; Control handoff accepted or replayed; Admitted or previously created browser session; Up to 256 captures belonging to this browser session; Admin-only browser state; connection capabilities expire with control or session closure.; Closure requested or already finished.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `authentication_status`: Session readiness alone does not confirm application sign-in.
- `authentication_task_id`: Automatic sign-in task; read its status and result separately from browser readiness.
- `cdp_url`: Admin-only full browser CDP bearer capability for the current external control generation.
- `closure_basis`: Provider deletion is a conservative closure bound when the worker cannot report its stop time.
- `credential_id`: Optional configured credential public ID within the selected project.

### [BrowserSessionConnection](docs/api/browser_session_connection.html)

Results: Success; External connection handoff accepted or replayed.

SDK operations: `create`.

### [BrowserSessionControl](docs/api/browser_session_control.html)

Results: Control handoff state; an old generation never returns a current connection.

SDK operations: `load`.

### [BrowserSessionEvent](docs/api/browser_session_event.html)

Results: Up to 100 ordered events without private model reasoning.

SDK operations: `list`.

### [BrowserSessionMedia](docs/api/browser_session_media.html)

Results: Capture state and retained file metadata.

SDK operations: `load`.

Key fields to recognise:

- `partial`: Retained footage has a capture failure or reported omissions.
- `source`: Screenshot provenance. Dimensions describe retained PNG pixels. URLs are observations before and after capture; concurrent navigation may change the page during that interval.

### [BrowserSessionRecording](docs/api/browser_session_recording.html)

Results: Success; Recording stop requested or already finished; Recording accepted or replayed.

SDK operations: `create`.

Key fields to recognise:

- `wait`: Only screenshots support wait: true.

### [BrowserSessionScreenshot](docs/api/browser_session_screenshot.html)

Results: Success; Screenshot accepted or replayed.

SDK operations: `create`.

Key fields to recognise:

- `wait`: Only screenshots support wait: true.

### [BrowserSessionTask](docs/api/browser_session_task.html)

Results: Success; Task cancellation requested or already terminal; Instruction accepted or replayed; Browser task state.

SDK operations: `create`, `load`.

### [CatalogSelector](docs/api/catalog_selector.html)

Results: Target selectors without deployment history or configuration values.

SDK operations: `list`.

### [CdnDeployment](docs/api/cdn_deployment.html)

Results: Success.

SDK operations: `create`, `list`, `load`.

### [CdnHostname](docs/api/cdn_hostname.html)

Results: App CDN hostname created; Success; App CDN hostname deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [CdnSpace](docs/api/cdn_space.html)

A CDN storage space and its objects.

Results: Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [CdnSpaceObject](docs/api/cdn_space_object.html)

Results: Success.

SDK operations: `list`, `load`, `remove`, `update`.

### [ConnectionRequest](docs/api/connection_request.html)

Results: Current owner connection result.

SDK operations: `load`.

### [ConnectionSource](docs/api/connection_source.html)

Results: Current owner connection result.

SDK operations: `list`.

### [CoordinationWait](docs/api/coordination_wait.html)

Results: A bounded page of this task&#39;s waits.

SDK operations: `list`.

### [CredentialSignInCheck](docs/api/credential_sign_in_check.html)

Results: The sign-in check this Idempotency-Key already started; The new sign-in check; The check that continued or started.

SDK operations: `create`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.
- `ended_early`: Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. False for a team that ran its course with a tester short of completed.

### [DataResourceRotateCredential](docs/api/data_resource_rotate_credential.html)

Results: Updated app data resource.

SDK operations: `create`.

### [DeepScan](docs/api/deep_scan.html)

Results: Success; The rerun scan; Stopped deep scan; Previously accepted scan; Accepted scan with its report URL; Deep scan history and active scans; Deep scan; The selected tester; Deep Scan navigation context.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `deadline_at`: When the team&#39;s time limit ends. Older API releases omit this additive field during independent web and API rollouts.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.

### [DeepScanFinding](docs/api/deep_scan_finding.html)

Results: Deep Scan findings.

SDK operations: `list`.

Key fields to recognise:

- `finding_count`: Findings at every priority; findings lists only the listed priority.
- `finding_ids`: Original team order used by legacy hash links and rerun indices.
- `free_findings_pending`: Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. Keep checking while true; reviews don&#39;t affect it.
- `priority`: The priority findings are narrowed to, or null when they are not narrowed.
- `reproductions`: Fresh-browser reruns of this scan&#39;s reported bugs.

### [DeepScanFlow](docs/api/deep_scan_flow.html)

Results: Success; The started scans.

SDK operations: `create`.

### [DeepScanMappedFlow](docs/api/deep_scan_mapped_flow.html)

Results: Selected-scope flow choices.

SDK operations: `list`.

### [DeepScanOption](docs/api/deep_scan_option.html)

Results: Launch form choices and permissions.

SDK operations: `list`.

Key fields to recognise:

- `deep_scan_defaults`: A signed-out browser Deep Scan&#39;s team when launched without budgets, before an environment is chosen. Older API releases omit this additive field.
- `flow_map`: Flows from the newest discovery; null until discovery has recorded some.
- `preview`: A short-lived pull request or branch deployment, listed after configured environments. Older API releases omit this additive field during independent web and API rollouts.

### [DemoShare](docs/api/demo_share.html)

Results: Shared demo; Demo capture with a play button.

SDK operations: `load`.

Key fields to recognise:

- `summary`: What the recorded browser confirmed.

### [DemoShareSegment](docs/api/demo_share_segment.html)

Results: Video bytes; Requested byte range.

SDK operations: `load`.

### [DeploymentDashboardNomad](docs/api/deployment_dashboard_nomad.html)

Results: Live Nomad allocation details.

SDK operations: `load`.

### [DeploymentFile](docs/api/deployment_file.html)

Results: Success.

SDK operations: `update`.

### [DomainPathRule](docs/api/domain_path_rule.html)

Results: Path rule created; Path rules for the domain, in routing precedence (most-specific prefix first, &quot;/&quot; catch-all last); App domain path rule; Success; Path rule deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [Dream](docs/api/dream.html)

Results: The dream as it is after the review job was queued; its status is pending; One page of 25 dreams for the project, newest first; The dream, its counts, and one page of the selected tab&#39;s list.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `attention`: The dream skipped at least one run, which will not be retried
- `changes`: Knowledge and memory entries created, updated or archived
- `error_code`: Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead
- `id`: Public id used in the dream&#39;s URL
- `phase`: Where the dream is. queued: waiting for a worker. running: a worker holds it. stalled: marked running but no worker holds it. paused: it hit an error and the periodic sweep still resumes it. stopped: it hit an error and is no longer retried automatically; only an administrator can resume it. completed: finished normally. `stopped_early`: finished, but ended before reviewing everything because its project or environment became unavailable.

### [Environment](docs/api/environment.html)

Results: Existing environment returned for an idempotent replay; Verify environment created; Success; Combined Verify environment detail snapshot; Updated Verify environment; The choice is cleared, or was already settled; The saved choice and, once started, the discovery to open.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `agent_sign_up_available`: Whether the signed-in admin can have Verify&#39;s agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). False once the agent stopped on something only the person can resolve.
- `allowed_actions`: `read_only` only looks around; writes may create, change and delete data.
- `imessage_number`: International destination number; blank or null clears it on an added environment.
- `included_deep_scan`: Whether this app still gets the signed-in user&#39;s included Deep Scan (`verify_onboarding_deep_scan`) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else.
- `managed_google_available`: Whether the managed Google account can be offered for this app.

### [EnvironmentDiscoveryRun](docs/api/environment_discovery_run.html)

Results: Discovery stopped; sandbox cleanup follows runner cancellation; Existing discovery run; Discovery admitted; exploration can change application data; Discovery status and saved report.

SDK operations: `create`, `load`.

Key fields to recognise:

- `account_id`: Omit for anonymous exploration

### [EnvironmentExploration](docs/api/environment_exploration.html)

Results: Exploratory run with agent reports and protected recordings.

SDK operations: `create`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.
- `ended_early`: Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. False for a team that ran its course with a tester short of completed.

### [EnvironmentFirstRun](docs/api/environment_first_run.html)

Results: The included discovery to open; The app page with the saved choice, waiting for the sign-up check.

SDK operations: `create`.

### [EnvironmentRevision](docs/api/environment_revision.html)

Results: Existing provision operation returned for an idempotent replay; Provision operation accepted; Existing revoke operation returned for an idempotent replay; Revocation accepted; Environment revision validated; Blueprint dry-run or idempotent replay; Immutable environment revision imported; Success; Existing destroy operation returned for an idempotent replay; Teardown accepted.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `allowed_origins`: Origins browser testers may visit, subdomains included. Links elsewhere are blocked.

### [EnvironmentSecretBinding](docs/api/environment_secret_binding.html)

Results: Success.

SDK operations: `create`, `list`, `remove`.

### [EnvironmentTestAccount](docs/api/environment_test_account.html)

Results: Login personas and write-only credential configuration status; Test account credentials configured without returning values; Success.

SDK operations: `list`, `patch`, `update`.

### [Evidence](docs/api/evidence.html)

Results: Success; A zip of the scenario run&#39;s evidence in capture order; Evidence bytes with the recorded content type; Requested byte range.

SDK operations: `load`.

### [Exploration](docs/api/exploration.html)

An exploration in which browser agents map an app before scenarios exist: start, follow, stop or read its report.

Results: Exploration after a replayed startup recovery; One replacement coordinator scheduled, or the same retry replayed; Project Scenario saved without launching a run; Existing report generation; Report queued; poll the exploration for the completed document; Exploratory run with agent reports and protected recordings; Running discovery teams and one page of all discovery runs; Exploration progress; Compact report page; recording timelines load separately; Latest attempt with live media and retained recording.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `deadline_at`: When the team&#39;s time limit ends. Older API releases omit this additive field during independent web and API rollouts.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.

### [ExplorationMessage](docs/api/exploration_message.html)

Results: Previously saved message; Message saved and orchestration scheduled.

SDK operations: `create`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.
- `ended_early`: Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. False for a team that ran its course with a tester short of completed.

### [ExplorationReport](docs/api/exploration_report.html)

Results: Compact report page; Report generation queued; previous published report remains readable; Deep Scan document; Discovery runs return not found.

SDK operations: `create`, `load`.

### [ExplorationScenario](docs/api/exploration_scenario.html)

Results: Scenarios already saved; Scenario authoring queued or already saved.

SDK operations: `create`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `demo_project`: The workspace&#39;s copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.
- `ended_early`: Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. False for a team that ran its course with a tester short of completed.

### [Finding](docs/api/finding.html)

A problem Verify found: list, read or update findings.

Results: Findings observed in the organization, newest first; Combined Verify finding detail snapshot; Finding status updated; Success.

SDK operations: `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `deferred_until`: Required future time when status is deferred
- `locked`: True when the workspace&#39;s included scan reported this finding, it is not one of the free ones, and the workspace has not paid. Its title, summary and verification reason are empty.
- `reason`: What the check saw, in plain words.
- `reported_occurrence`: The Discovery or Deep Scan report behind the finding; null for scenario run findings
- `verification`: Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. Null for findings recorded before findings were checked.

### [GithubConnection](docs/api/github_connection.html)

Results: GitHub verification connection.

SDK operations: `create`, `list`.

Key fields to recognise:

- `project_id`: Project slug or public ID the repositories are added to.
- `replace`: Make these the project&#39;s only repositories.

### [HostingAppDomain](docs/api/hosting_app_domain.html)

Results: Updated app domain; App domain created; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [ImageRepository](docs/api/image_repository.html)

A container image repository in the organization&#39;s registry: list or create one.

Results: Image repository created; Image repositories for an organization.

SDK operations: `create`, `list`.

### [Integration](docs/api/integration.html)

Results: VerificationIntegrations.

SDK operations: `list`.

### [InteractionResponse](docs/api/interaction_response.html)

Results: Previously accepted durable response receipt; no effects repeated; New response durably accepted; continuation delivery is pending.

SDK operations: `create`.

Key fields to recognise:

- `conversation_id`: Explicit conversation identity, including an agent-scoped native session alias.

### [Invitation](docs/api/invitation.html)

Invitations to join an organization: list, send or withdraw one.

Results: Organization invitation; Organization invitations page (organization summary plus invitations); Success; Organization invitation revoked.

SDK operations: `create`, `list`, `remove`.

### [JourneyVariantReplay](docs/api/journey_variant_replay.html)

Results: Reviewed replay request; existing Run approval remains required.

SDK operations: `create`.

### [Knowledge](docs/api/knowledge.html)

Results: Document saved; Markdown document and viewer permissions; Project selection and most recent 50 matching knowledge documents; Markdown document saved; Success; Document archived.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `id`: Public id used in the dream&#39;s URL

### [LocalThreadDelivery](docs/api/local_thread_delivery.html)

Results: Original requester-scoped Relay delivery consent.

SDK operations: `load`, `update`.

### [LocalThreadOperation](docs/api/local_thread_operation.html)

Results: Authorized local coding-agent thread; Authorized native session adoption receipt.

SDK operations: `create`, `load`.

Key fields to recognise:

- `delivery`: Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.
- `diagnostic_code`: Approved product error code retained after copied diagnostics expire. Absent for success, unknown codes and older cleared receipts; it does not reconcile uncertain delivery.
- `result_expired`: Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences.

### [Location](docs/api/location.html)

Results: Available hosting locations.

SDK operations: `list`.

### [Me](docs/api/me.html)

The calling user: read or change the profile, choose the active organization, or request account deletion (actions).

Results: Success; Durable deletion request recorded; Updated app promotion eligibility; Current authenticated session; Current request or null when none exists; Final organization or project destination; Suggested workspace name and address; Authenticated session; Updated authenticated session; Active organization updated.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `analytics_internal`: Staff, team or test account; its product analytics are marked internal.
- `next_path`: Present on a sign-in that created the person&#39;s first workspace; its setup page, where they go next.
- `onboarding`: V2 agent onboarding progress. Each finished step pays its `reward_cents` once; an invited person finishing every step pays the inviter referral.`reward_cents`.
- `superadmin`: Present and true only for Composal staff superadmins, not while impersonating.
- `time_zone`: The IANA zone the person chose for their agents&#39; replies; null follows their app.

### [MeEmail](docs/api/me_email.html)

Results: Updated account emails; Email registered and verification sent; Account emails; Success.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [MeOnboarding](docs/api/me_onboarding.html)

Results: Updated onboarding progress.

SDK operations: `create`.

### [MediaFile](docs/api/media_file.html)

Results: Retained file bytes; Requested byte range.

SDK operations: `load`.

### [Member](docs/api/member.html)

An organization&#39;s members: list them, or change or remove one.

Results: Organization team page (members plus invitations for admins and owners); Updated organization member; Success; Organization member removed.

SDK operations: `list`, `patch`, `remove`, `update`.

### [Memory](docs/api/memory.html)

Results: Success; Scoped operator note saved; Most recent or 50 best matching memories, with indexing health; Current lesson and latest ten revisions; Memory archived.

SDK operations: `create`, `list`, `load`, `remove`.

### [MergeRequest](docs/api/merge_request.html)

Results: PR verification response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `available_tests`: All active saved scenarios in the configured project, including scenarios outside the automatic selection.
- `branch`: Exact deployed source branch; refused if it differs from the canonical request branch.
- `current_run`: Latest verification request if it matches the current head and base, independent of history pagination.
- `github_repository`: GitHub owner/repository associated with this pull request.
- `head_sha`: If supplied, refuse to create a run unless this is the current PR head.

### [MessagingConversationMessage](docs/api/messaging_conversation_message.html)

Results: Manual conversation after Sendblue accepts the Tapback; Manual conversation after sending.

SDK operations: `create`.

Key fields to recognise:

- `content`: Plain text with any account link removed
- `media_upload_ids`: Ordered staged upload IDs; six on Photon, one on Sendblue.
- `reply_to`: Public ID of the visible quoted parent
- `retry_attachment`: Retry an already recorded attachment when its file bytes are no longer on this page.

### [MessagingConversationUpload](docs/api/messaging_conversation_upload.html)

Results: Attachment staged; Attachment staged for this actor and conversation for one day.

SDK operations: `create`.

### [MetricQuery](docs/api/metric_query.html)

Results: Success.

SDK operations: `list`.

### [NetworkConnection](docs/api/network_connection.html)

Results: Success; Private network connection saved; Private network connection metadata without its secret.

SDK operations: `create`, `patch`, `update`.

### [NomadAllocation](docs/api/nomad_allocation.html)

Results: Live Nomad allocation details.

SDK operations: `load`.

Key fields to recognise:

- `verify_runner_images`: Public Verify image pins from tasks in this allocation&#39;s attached job group, not current app settings. Empty when attached job metadata is unavailable. Other environment values are never returned; malformed pins are named in `invalid_keys` without their values. References and fingerprints are reported independently so callers can detect mismatches.

### [NomadLog](docs/api/nomad_log.html)

Results: Live Nomad task logs.

SDK operations: `list`.

### [Organization](docs/api/organization.html)

An organization the user belongs to: list, create, read or change one.

Results: Organization; Organizations visible to the current user; Organization detail.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `activated_products`: Products this organization has activated (PRD 144). Activation is what makes a product&#39;s surfaces visible; it is neither permission nor entitlement.
- `agents_only`: Whether this organization uses the agents-only interface; older responses may omit this value.
- `can_activate_products`: Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.
- `google_workspace_domain`: Owners can approve their verified Google Workspace domain, or send null to disable automatic joining.
- `shared_agent_personal_accounts_enabled`: Whether a shared agent may use one person&#39;s account for everyone who chats with it. Present only where agent integrations are on.

### [Page](docs/api/page.html)

Results: Combined Verify dashboard snapshot.

SDK operations: `load`.

Key fields to recognise:

- `cli_signed_in_at`: When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected.
- `demo_project`: The workspace&#39;s copy of the demo project, which setup offers as example data. Only the environments section sets it.
- `included_deep_scan`: Whether a new app gets the signed-in user&#39;s included Deep Scan (`verify_onboarding_deep_scan`) once it has a test account, so setup asks for one right after the app. True only in the environments section.
- `project`: The project the page is limited to, or null for the whole organization.
- `suggested_app_url`: The URL first-run setup prefills for a new app, from the workspace&#39;s project website or the signed-in user&#39;s work email domain. Only the environments section sets it.

### [PageAgent](docs/api/page_agent.html)

Results: Markers keyed by agent ID. A marker changes when the conversation does; null means it has no history yet.; V2 agent workspace page; Authorized agent rows and the selected agent when outside the current page.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `repository_choices`: Empty compatibility field. Use the agent&#39;s clawder/repositories endpoint.
- `runtime_versions`: Runtime choices authorized for this organization.

### [PageProjectRun](docs/api/page_project_run.html)

Results: Run browser page.

SDK operations: `load`.

Key fields to recognise:

- `fix_scenario_count`: How many scenarios the agent handoff covers, including those on other pages.
- `fix_scenarios`: The fixable scenarios an agent handoff covers. With an open browser, only that scenario; otherwise the fixable scenarios on this page.

### [PagesProjectCredential](docs/api/pages_project_credential.html)

Results: ProjectCredentialsPage.

SDK operations: `list`.

Key fields to recognise:

- `composal_address`: The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. Null until one is provisioned.
- `has_inbox`: Whether Composal provisioned this address and can show the mail it receives
- `identity_provider`: Where the organization&#39;s apps trust Composal sign-in, for new personas
- `sign_in_verified`: A sign-in check confirmed this account signs in with its current settings

### [PagesProjectPersona](docs/api/pages_project_persona.html)

Results: ProjectPersonasPage.

SDK operations: `list`.

Key fields to recognise:

- `persona_states`: Scenarios by the state of their latest execution. Timeouts count as failing.

### [PagesProjectRun](docs/api/pages_project_run.html)

Results: ProjectRunsPage.

SDK operations: `list`.

### [PagesProjectScenario](docs/api/pages_project_scenario.html)

Results: ProjectScenariosPage.

SDK operations: `list`.

### [PersonalAccessToken](docs/api/personal_access_token.html)

The calling user&#39;s personal access tokens: list, create or revoke one.

Results: Success.

SDK operations: `create`, `list`, `remove`.

### [PreviewOperation](docs/api/preview_operation.html)

Results: Success.

SDK operations: `list`.

### [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html)

Results: Success.

SDK operations: `create`, `list`, `remove`.

### [PreviewSecret](docs/api/preview_secret.html)

Results: Success; New preview-owned secret version; Preview-owned secret created.

SDK operations: `create`, `remove`.

### [PreviewSharingApproval](docs/api/preview_sharing_approval.html)

Results: Success; Sharing selections and available metadata without values.

SDK operations: `create`, `list`.

### [ProductMapIdentityDecision](docs/api/product_map_identity_decision.html)

Results: Success; Atomic operator correction; immutable evidence retained.

SDK operations: `create`.

### [ProductMapJourney](docs/api/product_map_journey.html)

Results: Bounded evidence-backed product map retrieval.

SDK operations: `list`, `load`.

### [ProductMapJourneyReplay](docs/api/product_map_journey_replay.html)

Results: Retained qualification request; check the replay receipt for its result; Current preparation receipt; preparation is not qualification.

SDK operations: `create`, `load`.

### [ProductMapObservation](docs/api/product_map_observation.html)

Results: Bounded evidence-backed product map retrieval; Bounded immutable model and operator identity history.

SDK operations: `load`.

### [ProductMapQuestion](docs/api/product_map_question.html)

Results: A bounded historical map answer with server-resolved evidence citations.

SDK operations: `create`.

### [ProductMapState](docs/api/product_map_state.html)

Results: Bounded evidence-backed product map retrieval.

SDK operations: `list`, `load`.

### [Project](docs/api/project.html)

A Verify project: an app whose user journeys Verify tests, with its environments, credentials, personas and scenarios.

Results: A replay of a discovery this key already started; The discovery started; Project; ProjectCollection; ProjectEnvironmentPage; ProjectPersonaPage; ProjectScenarioPage; ProjectPage; ProjectHeaderPage; ProjectOverviewPage; ProjectOverviewActivityPage; ProjectOverviewDiscoveryPage; ProjectOverviewHistoryPage; ProjectPrTestingPage; Persistent shared project map with optional revision and account filters; Matching-scope observation comparison with bounded retained evidence; Recorder Project options; ProjectScenarioEditorPage; Project with the uploaded icon.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `demo`: Whether this is a signup demo project copied from the shared template.
- `identity_provider`: For `oidc_identity` accounts, the Composal issuer the app trusts and the persona settings it must match
- `name`: The file name the page receives
- `project`: The project the page is limited to, or null for the whole organization.
- `scenario_states`: Scenarios by the state of their latest execution. Timeouts count as failing.

### [ProjectAndroidApk](docs/api/project_android_apk.html)

Results: Pinned Android configuration; Pinned Android configuration for a new environment.

SDK operations: `create`.

### [ProjectCodeMap](docs/api/project_code_map.html)

Results: Existing or newly started scan; Signed URL scoped to the authorized project repository and browser origin; Project-linked repository choices and selected commit map.

SDK operations: `create`, `list`.

### [ProjectEnvironment](docs/api/project_environment.html)

Results: Environment; EnvironmentCollection; ProjectEnvironmentDirectory.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `base_url_changeable`: Whether an update may send a new `base_url`. Pull request and branch previews keep theirs.
- `imessage_number`: International destination number; blank or null clears it on an added environment.
- `messaging_tester_number`: One configured tester number. Copied to each preview; may be overridden locally before preparation.

### [ProjectFinding](docs/api/project_finding.html)

Results: ProjectFindingsPage.

SDK operations: `list`.

Key fields to recognise:

- `locked`: True for a locked finding of the workspace&#39;s included scan before it pays. Its title, source title and verification reason are empty.
- `source`: The workflow that produced the finding
- `source_title`: The scenario, Discovery or Deep Scan that produced the finding
- `verification`: Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. Null for findings recorded before findings were checked.
- `web_path`: Where the finding is reviewed within its source

### [ProjectFixture](docs/api/project_fixture.html)

Results: The project already held these bytes; Stored new bytes; Files, assignment choices and permissions; The fixture and a signed URL that expires within minutes; Updated file; Archived; existing Scenario and run attachments remain.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `assignments`: Every assignment with its target&#39;s name, including targets archived or disabled since.

### [ProjectIosApp](docs/api/project_ios_app.html)

Results: Pinned iOS configuration; Pinned iOS configuration for a new environment.

SDK operations: `create`.

### [ProjectMessagingConversation](docs/api/project_messaging_conversation.html)

Results: Success; Read request accepted; Retired conversation; Typing state accepted; Conversation created; Manual messages and send eligibility; Updated conversation.

SDK operations: `create`, `load`, `patch`, `update`.

### [ProjectOverviewMetric](docs/api/project_overview_metric.html)

Results: ProjectOverviewMetricsPage.

SDK operations: `list`.

### [ProjectOverviewPullRequest](docs/api/project_overview_pull_request.html)

Results: ProjectOverviewPullRequestsPage.

SDK operations: `list`.

Key fields to recognise:

- `github_repository`: GitHub owner/repository associated with this pull request.

### [ProjectProductMap](docs/api/project_product_map.html)

Results: Coalesced background graph refresh intent; Bounded evidence-backed product map retrieval; Compact whole-app screen inventory and retained connections; coalesces a stale projection refresh; Cheap project change watermark without reconstructing the map.

SDK operations: `create`, `load`.

### [ProjectRecording](docs/api/project_recording.html)

Results: The recording, now drafting; The recording, drafting again; The recording, with its browser starting; The recording; only its creator can read it; The discarded recording.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `draft`: Present once drafted.
- `environment_id`: The project environment the browser opens.
- `persona_id`: The project persona the journey acts as.
- `phase`: What the owner can do now. preparing: the browser is starting. recording: the browser takes input and the recording can be finished. saving: the lease ended and the journey is being saved. drafting: the draft is being written. drafted: the draft is ready. redraftable: the journey is saved and can be drafted again. ended: nothing more happens; start a new recording. drafted, redraftable and ended change only when the owner acts.
- `start_path`: A path on the environment to start at, such as /settings.

### [ProjectRunPlan](docs/api/project_run_plan.html)

Results: Archived Run Plan; Saved Run Plan; Run Plan authoring page; Run Plan; Updated Run Plan.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

### [ProjectRunSchedule](docs/api/project_run_schedule.html)

Results: Success; Current matching scenarios and credential requirements.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `environment_id`: Project environment slug or public ID.
- `notification_channel`: Email the schedule owner by default; legacy requests with a Slack subscription keep Slack.

### [ProjectScenarioOption](docs/api/project_scenario_option.html)

Results: ProjectScenarioOptions.

SDK operations: `list`.

Key fields to recognise:

- `scenario_states`: Scenarios by the state of their latest execution. Timeouts count as failing.

### [ProjectScenarioRow](docs/api/project_scenario_row.html)

Results: ProjectScenarioRowsPage.

SDK operations: `list`.

### [ProjectSetting](docs/api/project_setting.html)

Results: ProjectSettingsPage.

SDK operations: `list`.

### [PullRequest](docs/api/pull_request.html)

Results: Success; Demo share link; PR verification response; Revoked.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `available_tests`: All active saved scenarios in the configured project, including scenarios outside the automatic selection.
- `branch`: Exact deployed source branch; refused if it differs from the canonical request branch.
- `cleanup_only`: Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing.
- `current_run`: Latest verification request if it matches the current head and base, independent of history pagination.
- `head_sha`: If supplied, refuse to create a run unless this is the current PR head.

### [PullRequestSetting](docs/api/pull_request_setting.html)

Results: PR verification response; What was found on recent requests.

SDK operations: `create`, `list`.

Key fields to recognise:

- `bots`: hosting: bot accounts that comment the preview link, such as netlify[bot]. GitHub only.
- `browser_options_available`: Whether browser demo and scenario-writing options apply to this saved repository setup.
- `ci_preview`: The latest preview the project&#39;s CI handed over, while the saved setting uses CI
- `concurrency`: Up to 50 parallel browsers per run, lowered only by an explicit administrator override. Submitted values are ignored; packages do not cap browser parallelism.
- `demo_videos`: Record a short walkthrough of the change and add it to the PR comment. Off by default.

### [PullRequestSettingAddRepository](docs/api/pull_request_setting_add_repository.html)

Results: Repositories associated with this project.

SDK operations: `create`.

Key fields to recognise:

- `replace`: Make these the project&#39;s only repositories.

### [PullRequestSettingDetectComment](docs/api/pull_request_setting_detect_comment.html)

Results: What was found on recent requests.

SDK operations: `create`.

Key fields to recognise:

- `bots`: The bots answer
- `deployment`: The deployment answer
- `imessage_number`: International destination number; blank or null clears it on an added environment.
- `link_pattern`: The `link_pattern` answer
- `project_id`: Project slug or ID.

### [Recorder](docs/api/recorder.html)

Results: Recorder setup.

SDK operations: `load`.

### [Registry](docs/api/registry.html)

Results: Success.

SDK operations: `load`.

### [RegistryV2](docs/api/registry_v2.html)

Results: Success.

SDK operations: `create`.

### [RelayAgentLocalThread](docs/api/relay_agent_local_thread.html)

Results: Relay authorization disconnected.

SDK operations: `remove`.

### [ReportReplay](docs/api/report_replay.html)

Results: Recording groups and step timing for one cited tester.

SDK operations: `load`.

### [ReportScenario](docs/api/report_scenario.html)

Results: Compact report page; Scenario authoring queued; poll the compact report page.

SDK operations: `create`.

### [RunScenarioRun](docs/api/run_scenario_run.html)

Results: JPEG frame; The current scenario and the environment for a new run; admins only; Saved scenario; the original run remains unchanged.

SDK operations: `load`, `update`.

### [RunScheduleOption](docs/api/run_schedule_option.html)

Results: Success.

SDK operations: `list`.

### [RunSearch](docs/api/run_search.html)

Results: The newest runs whose scenario name or pull request matches the search.

SDK operations: `load`.

### [RunUpdate](docs/api/run_update.html)

Results: Compact Verify run updates.

SDK operations: `list`.

Key fields to recognise:

- `github_repository`: GitHub owner/repository associated with this pull request.

### [ScenarioRevision](docs/api/scenario_revision.html)

Results: ScenarioRevisionCollection.

SDK operations: `list`.

Key fields to recognise:

- `batch`: Shared by every revision one request or job saved.
- `definition`: One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract.
- `id`: Absent on a new file
- `source`: The client the save came through.
- `user`: Null when a system job saved the Scenario.

### [ScenarioRunLesson](docs/api/scenario_run_lesson.html)

Results: Lesson saved.

SDK operations: `create`.

Key fields to recognise:

- `title`: Defaults to the Scenario&#39;s name.

### [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html)

Results: New run, with the normal preparation and admission checks; Validated proposal ready for review; Valid proposed steps and outcomes.

SDK operations: `create`.

### [ServiceEndpoint](docs/api/service_endpoint.html)

Results: Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [SitePreview](docs/api/site_preview.html)

Results: What the site calls itself, and its icon.

SDK operations: `load`.

Key fields to recognise:

- `icon_data_url`: The site&#39;s icon as a data: URL, up to 256 KB
- `url`: The address as it will be saved

### [SlackChannel](docs/api/slack_channel.html)

Results: Channels visible to this agent bot, with Slack pagination.

SDK operations: `list`.

### [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html)

Results: Authorized native session adoption receipt; Authorized local coding-agent thread; Original requester-scoped Relay delivery consent; Current authorized native task result receipts.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `archived`: Archived in the provider&#39;s own list, or null when the helper did not report it (some reads). threads.list includes archived threads only with `include_archived`.
- `can_archive`: This requester can archive or restore it, and the computer&#39;s Desktop supports archiving.
- `delivery`: Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.
- `diagnostic_code`: Approved product error code retained after copied diagnostics expire. Absent for success, unknown codes and older cleared receipts; it does not reconcile uncertain delivery.
- `full_title`: The native name or first prompt in full, for a tooltip.

### [StaticSite](docs/api/static_site.html)

A static site hosted by Composal: list, create, read, change or remove one.

Results: Provisioned static site; Static site created; Static sites in the organization; Success.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [StaticSiteDeployment](docs/api/static_site_deployment.html)

Results: Activated static site deployment; Success; Recent static site deployments.

SDK operations: `create`, `list`, `load`.

### [StaticSiteDomain](docs/api/static_site_domain.html)

Results: Updated static site domain; Static site domain created; Static site domains; Success; Static site domain deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [SubscriptionModel](docs/api/subscription_model.html)

Results: Account model catalog.

SDK operations: `list`.

Key fields to recognise:

- `reasoning`: Effort levels this plan model accepts.
- `speeds`: Speed modes advertised by this connected account and model. Missing metadata enables Standard only.

### [ThreadPreview](docs/api/thread_preview.html)

Results: Private preview URL.

SDK operations: `create`.

### [VerificationProjectCredential](docs/api/verification_project_credential.html)

Results: Success; Credential disabled; its inbox is retained; ProjectCredential; ProjectCredentialCollection; ProjectCredentialInbox; Credential disabled, or permanently deleted with its inbox when permanent=true.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `browser_session`: JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected.
- `composal_address`: The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. Null until one is provisioned.
- `composal_inbox`: `email_password` only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,…
- `composal_inbox_user`: The user part of a new Composal address, which becomes &lt;user&gt;@&lt;organization slug&gt;.mailposal.com.
- `composal_managed_google`: Select the Composal-managed Google test account when available.

### [VerificationProjectPersona](docs/api/verification_project_persona.html)

Results: Persona; Success; PersonaCollection; Persona deleted; historical reports retained.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `credential_id`: The credential this persona signs in with. Without one, a run chooses from the project&#39;s credentials.

### [VerificationProjectRun](docs/api/verification_project_run.html)

A Verify run of a project: list or read runs, launch, cancel or rerun one (actions).

Results: Run; RunPage; Success; RunCollection; Run chat card.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `start_when_prepared`: The run starts as soon as its browser plans are ready, without a review step.
- `state`: pending while the model checks it, reproducing while its rerun runs, then confirmed, unverified or dismissed. Unverified means the check did not confirm it, could not decide or run, or a rerun did not see it again; dismissed means the screenshots show the expected result. Unverified and dismissed findings stay listed below confirmed ones.
- `verifier_preferences_snapshot`: Project guidance for human-readable verifier reports; core execution and evidence rules take precedence.
- `web_path`: Path of the run&#39;s page in the web app, where it can be watched live.

### [VerificationProjectScenario](docs/api/verification_project_scenario.html)

A user journey Verify tests in a project: list, write, import or export them.

Results: Scenario; Success; Scenario saved earlier from the same check; Every file was accepted; nothing is saved on a dry run; ScenarioCollection; ScenarioFileExport.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `cleanup`: Optional application cleanup instructions, attempted after checks pass or fail. Omit on updates to preserve saved instructions; [] clears them. Results are separate from Scenario checks.
- `fixtures`: Files upload steps choose, ordered by name. Omitted when the Scenario has none.
- `id`: Null for a refused file or a Scenario that was not saved
- `identity_probe`: Same-origin JSON identity endpoint. Required for two or more signed-in actors; optional for one signed-in actor or anonymous-only journeys. A supplied probe is always used. Responses stay private.
- `if`: A documented subset of Actions expressions. Supports comparisons, &amp;&amp;, ||, !, parentheses, contains, startsWith and endsWith over GitHub event metadata. Empty or null clears it. Applied to automatic execution.

### [VerifyAppDomain](docs/api/verify_app_domain.html)

Results: Success; Domain verification scheduled.

SDK operations: `create`.

### [VerifyBrowserSession](docs/api/verify_browser_session.html)

Results: Account metadata; browser cookies and storage remain write-only; Expiring owner browser session metadata; Owner-only metadata; no application cookies or storage values; Success; Browser closure requested.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `account_id`: The project&#39;s active credential to refresh; omit to create a credential.
- `name`: Required when opening a browser for a new credential.
- `project_id`: The project (slug or ID) whose credential receives the session.
- `viewer_url`: Owner-only bearer link. Do not share; expires with the browser lease.

### [VerifyStaticSiteDomain](docs/api/verify_static_site_domain.html)

Results: Updated static site domain.

SDK operations: `create`.

### [VersionLog](docs/api/version_log.html)

Results: Safe project-scoped binary response.

SDK operations: `list`.

### [WebBotAuth](docs/api/web_bot_auth.html)

Results: Distinct signatures for the authorized HTTPS origin.

SDK operations: `create`.

### [WorkflowRunStep](docs/api/workflow_run_step.html)

Results: The step&#39;s full recorded output.

SDK operations: `load`.

### [WorkflowRunStopNotice](docs/api/workflow_run_stop_notice.html)

Results: The viewer&#39;s notice that this run stopped is put away; one already put away or resolved stays as it is.

SDK operations: `create`.

### [WorkflowTriggerSkipped](docs/api/workflow_trigger_skipped.html)

Results: The started run.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/marked_read` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/call_session` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/lifecycle` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/transcription_session` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/warm` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents` | Required |
| [Agent](docs/api/agent.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/message_image` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/avatar` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/coordination` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/input_delivery` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/inspection` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resource` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/thread_model` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/activity` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/compute` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/computer` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/debug` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/environment` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/github_access` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/library` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/lifecycle` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/mission_control_card` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/run_usage` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/runtime` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/sandbox` | Required |
| [Agent](docs/api/agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/usage` | Required |
| [Agent](docs/api/agent.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/environment` | Required |
| [Agent](docs/api/agent.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/github_access` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/model` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/rename` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/roster_position` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/runtime` | Required |
| [Agent](docs/api/agent.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/sandbox` | Required |
| [Agent](docs/api/agent.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/sharing` | Required |
| [Agent](docs/api/agent.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/thread_model` | Required |
| [AgentAttachment](docs/api/agent_attachment.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete` | Required |
| [AgentAttachment](docs/api/agent_attachment.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments` | Required |
| [AgentAutomation](docs/api/agent_automation.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations` | Required |
| [AgentAutomation](docs/api/agent_automation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}` | Required |
| [AgentAutomation](docs/api/agent_automation.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}` | Required |
| [AgentAutomation](docs/api/agent_automation.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/schedule` | Required |
| [AgentAvatar](docs/api/agent_avatar.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/generate` | Required |
| [AgentAvatar](docs/api/agent_avatar.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/retry` | Required |
| [AgentAvatar](docs/api/agent_avatar.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/avatar/configuration` | Required |
| [AgentCommand](docs/api/agent_command.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/commands` | Required |
| [AgentComputer](docs/api/agent_computer.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/computer/connect` | Required |
| [AgentComputer](docs/api/agent_computer.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/computer/egress` | Required |
| [AgentComputer](docs/api/agent_computer.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/computer/start` | Required |
| [AgentComputer](docs/api/agent_computer.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/computer/frame` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}` | Required |
| [AgentCoordination](docs/api/agent_coordination.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/stop` | Required |
| [AgentEmail](docs/api/agent_email.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}` | Required |
| [AgentFile](docs/api/agent_file.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/files/{file_id}` | Required |
| [AgentInput](docs/api/agent_input.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/inputs` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations` | Required |
| [AgentInteraction](docs/api/agent_interaction.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel` | Required |
| [AgentInteraction](docs/api/agent_interaction.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/connect` | Required |
| [AgentInteraction](docs/api/agent_interaction.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions` | Required |
| [AgentInteraction](docs/api/agent_interaction.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}` | Required |
| [AgentLibrary](docs/api/agent_library.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/library/{artifact_id}/download` | Required |
| [AgentManager](docs/api/agent_manager.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/managers` | Required |
| [AgentManager](docs/api/agent_manager.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/managers/{user_id}` | Required |
| [AgentManagerChoice](docs/api/agent_manager_choice.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/manager_choices` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_marketplace/{id}/install` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_marketplace` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_marketplace/{id}` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `load` | `GET /api/v1/agent_marketplace/{id}` | Not required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_marketplace` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_marketplace/draft` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `load` | `GET /api/v1/agent_marketplace` | Not required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/agent_marketplace/{id}` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_marketplace/{id}` | Required |
| [AgentMarketplace](docs/api/agent_marketplace.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agent_marketplace/{id}` | Required |
| [AgentMarketplaceShared](docs/api/agent_marketplace_shared.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install` | Required |
| [AgentMarketplaceShared](docs/api/agent_marketplace_shared.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}` | Required |
| [AgentMarketplaceShared](docs/api/agent_marketplace_shared.html) | `load` | `GET /api/v1/agent_marketplace/shared/{share_token}` | Not required |
| [AgentMissionControl](docs/api/agent_mission_control.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/mission_control/feedback` | Required |
| [AgentMissionControl](docs/api/agent_mission_control.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/mission_control/relevance` | Required |
| [AgentOperation](docs/api/agent_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations` | Required |
| [AgentOperation](docs/api/agent_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations/{operation_id}` | Required |
| [AgentProvisioning](docs/api/agent_provisioning.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/provisioning/retry` | Required |
| [AgentPullRequest](docs/api/agent_pull_request.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/pull_requests` | Required |
| [AgentQuestion](docs/api/agent_question.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/questions/{question_id}/answer` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories` | Required |
| [AgentResource](docs/api/agent_resource.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resources` | Required |
| [AgentRoutine](docs/api/agent_routine.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/routines` | Required |
| [AgentRoutine](docs/api/agent_routine.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}` | Required |
| [AgentRun](docs/api/agent_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/runs/{run_id}` | Required |
| [AgentRuntime](docs/api/agent_runtime.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset` | Required |
| [AgentSetting](docs/api/agent_setting.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/settings` | Required |
| [AgentSetting](docs/api/agent_setting.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/settings` | Required |
| [AgentSharing](docs/api/agent_sharing.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/sharing/review` | Required |
| [AgentSite](docs/api/agent_site.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/sites` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/skills` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/skills` | Required |
| [AgentSlack](docs/api/agent_slack.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/app` | Required |
| [AgentSlack](docs/api/agent_slack.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/as_you` | Required |
| [AgentSubagent](docs/api/agent_subagent.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subagents` | Required |
| [AgentSubscription](docs/api/agent_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions` | Required |
| [AgentSubscription](docs/api/agent_subscription.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions` | Required |
| [AgentTeammate](docs/api/agent_teammate.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/teammates` | Required |
| [AgentTerminal](docs/api/agent_terminal.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/terminal/connect` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads` | Required |
| [AgentThread](docs/api/agent_thread.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/threads` | Required |
| [AgentTool](docs/api/agent_tool.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools` | Required |
| [AgentVerifyProject](docs/api/agent_verify_project.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects` | Required |
| [AgentVerifyProject](docs/api/agent_verify_project.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects` | Required |
| [AgentWait](docs/api/agent_wait.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/waits/{wait_id}/stop` | Required |
| [AgentWebhook](docs/api/agent_webhook.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks` | Required |
| [AgentWebhook](docs/api/agent_webhook.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}` | Required |
| [AgentWebhook](docs/api/agent_webhook.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}` | Required |
| [AgentWork](docs/api/agent_work.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/work/{work_id}/handled` | Required |
| [AgentWorkflow](docs/api/agent_workflow.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows` | Required |
| [AgentWorkflow](docs/api/agent_workflow.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows` | Required |
| [AgentWorkflow](docs/api/agent_workflow.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows` | Required |
| [AgentWorkflowProposal](docs/api/agent_workflow_proposal.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise` | Required |
| [AgentWorkflowProposal](docs/api/agent_workflow_proposal.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/save` | Required |
| [AgentWorkflowProposal](docs/api/agent_workflow_proposal.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/approve` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/dismiss` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/retry` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}` | Required |
| [AgentWorkflowRun](docs/api/agent_workflow_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/summary` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/pause` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/resume` | Required |
| [AgentWorkflowTrigger](docs/api/agent_workflow_trigger.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review` | Required |
| [AgentWorkspace](docs/api/agent_workspace.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workspaces` | Required |
| [AgentWorkspace](docs/api/agent_workspace.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workspaces/{workspace_id}` | Required |
| [AgentWritePermission](docs/api/agent_write_permission.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/write_permissions` | Required |
| [AgentWritePermission](docs/api/agent_write_permission.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/write_permissions/{write_permission_id}` | Required |
| [AllocationLog](docs/api/allocation_log.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs` | Required |
| [App](docs/api/app.html) | `create` | `POST /api/v1/hosting/apps/{id}/activate` | Required |
| [App](docs/api/app.html) | `create` | `POST /api/v1/hosting/apps/{id}/archive` | Required |
| [App](docs/api/app.html) | `create` | `POST /api/v1/hosting/apps` | Required |
| [App](docs/api/app.html) | `list` | `GET /api/v1/hosting/apps` | Required |
| [App](docs/api/app.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/catalog` | Required |
| [App](docs/api/app.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard` | Required |
| [App](docs/api/app.html) | `load` | `GET /api/v1/hosting/apps/{id}` | Required |
| [App](docs/api/app.html) | `patch` | `PATCH /api/v1/hosting/apps/{id}` | Required |
| [App](docs/api/app.html) | `remove` | `DELETE /api/v1/hosting/apps/{id}` | Required |
| [App](docs/api/app.html) | `update` | `PUT /api/v1/hosting/apps/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/pause` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/provision` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/purge` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/resume` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/sync` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns` | Required |
| [AppCdn](docs/api/app_cdn.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/cdns` | Required |
| [AppCdn](docs/api/app_cdn.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables/{id}/disable` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables/{id}/rotate` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/config_variables` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/restore` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/resume` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/data_resources` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDeploy](docs/api/app_deploy.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deploys` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/fail` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/succeed` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/deployments` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployments/{id}` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/deployments/{id}` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/deployments/{id}` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/deployments/{id}` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/redeploy` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/rollback` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_operations` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/deployment_operations` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}` | Required |
| [AppDeploymentOperation](docs/api/app_deployment_operation.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/live` | Required |
| [AppDeploymentRollback](docs/api/app_deployment_rollback.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks` | Required |
| [AppDeploymentRollback](docs/api/app_deployment_rollback.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks/plan` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments/{id}/pause` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments/{id}/resume` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/environments` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/environments/{id}` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/environments/{id}` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/environments/{id}` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/environments/{id}` | Required |
| [AppLocation](docs/api/app_location.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/locations` | Required |
| [AppLocation](docs/api/app_location.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/locations` | Required |
| [AppLocation](docs/api/app_location.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/locations/{id}` | Required |
| [AppMetric](docs/api/app_metric.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/metrics/query_range` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/archive` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/deploy` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/expire` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/pause` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/refresh_source` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/resume` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/review_source` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/update_revision` | Required |
| [AppPreview](docs/api/app_preview.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews` | Required |
| [AppPreview](docs/api/app_preview.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/previews` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/administration` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/administration_index` | Required |
| [AppPreview](docs/api/app_preview.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/preview_profiles` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppRun](docs/api/app_run.html) | `create` | `POST /api/v1/hosting/app_runs/{id}/cancel` | Required |
| [AppRun](docs/api/app_run.html) | `create` | `POST /api/v1/hosting/app_runs` | Required |
| [AppRun](docs/api/app_run.html) | `list` | `GET /api/v1/hosting/app_runs` | Required |
| [AppRun](docs/api/app_run.html) | `load` | `GET /api/v1/hosting/app_runs/{id}` | Required |
| [AppSecret](docs/api/app_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/secrets/{id}/set_value` | Required |
| [AppSecret](docs/api/app_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/secrets` | Required |
| [AppSecret](docs/api/app_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/secrets/bulk` | Required |
| [AppSecret](docs/api/app_secret.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/secrets` | Required |
| [AppSecret](docs/api/app_secret.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/secrets/{id}` | Required |
| [AppSecret](docs/api/app_secret.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/secrets/{id}/value` | Required |
| [AppSecret](docs/api/app_secret.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/secrets/dotenv` | Required |
| [AppSecret](docs/api/app_secret.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/secrets/{id}` | Required |
| [AppSecret](docs/api/app_secret.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/secrets/{id}` | Required |
| [AppSecret](docs/api/app_secret.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/secrets/{id}` | Required |
| [AppService](docs/api/app_service.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services/{id}/archive` | Required |
| [AppService](docs/api/app_service.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services/{id}/pause` | Required |
| [AppService](docs/api/app_service.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services/{id}/resume` | Required |
| [AppService](docs/api/app_service.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services` | Required |
| [AppService](docs/api/app_service.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/services` | Required |
| [AppService](docs/api/app_service.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/service_bindings` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/service_bindings/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/service_bindings/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}` | Required |
| [AppServicePlacement](docs/api/app_service_placement.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/service_placements` | Required |
| [AppServicePlacement](docs/api/app_service_placement.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/service_placements/{id}` | Required |
| [AppServicePlacement](docs/api/app_service_placement.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/service_placements/configure` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/issue_access_key` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/resume` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/suspend` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/storage_resources` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/storage_resources` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AttachmentPart](docs/api/attachment_part.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}` | Required |
| [AutomationEvent](docs/api/automation_event.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events` | Required |
| [AutomationRun](docs/api/automation_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs` | Required |
| [Binary](docs/api/binary.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/binaries/{id}/archive` | Required |
| [Binary](docs/api/binary.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/binaries` | Required |
| [Binary](docs/api/binary.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/binaries` | Required |
| [Binary](docs/api/binary.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/binaries/{id}` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/retry` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}` | Required |
| [BinaryVersion](docs/api/binary_version.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}` | Required |
| [BrowserEgressCandidate](docs/api/browser_egress_candidate.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/browser_egress/candidates` | Required |
| [BrowserSession](docs/api/browser_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control` | Required |
| [BrowserSession](docs/api/browser_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions` | Required |
| [BrowserSession](docs/api/browser_session.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media` | Required |
| [BrowserSession](docs/api/browser_session.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{id}` | Required |
| [BrowserSession](docs/api/browser_session.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/browser_sessions/{id}` | Required |
| [BrowserSessionConnection](docs/api/browser_session_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections` | Required |
| [BrowserSessionControl](docs/api/browser_session_control.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}` | Required |
| [BrowserSessionEvent](docs/api/browser_session_event.html) | `list` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events` | Required |
| [BrowserSessionMedia](docs/api/browser_session_media.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}` | Required |
| [BrowserSessionRecording](docs/api/browser_session_recording.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings/{id}/stop` | Required |
| [BrowserSessionRecording](docs/api/browser_session_recording.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings` | Required |
| [BrowserSessionScreenshot](docs/api/browser_session_screenshot.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/screenshots` | Required |
| [BrowserSessionTask](docs/api/browser_session_task.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}/cancel` | Required |
| [BrowserSessionTask](docs/api/browser_session_task.html) | `create` | `POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks` | Required |
| [BrowserSessionTask](docs/api/browser_session_task.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}` | Required |
| [CatalogSelector](docs/api/catalog_selector.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/catalog/selectors` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/cdn_spaces/{id}/archive` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/cdn_spaces/{id}/provision` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/organizations/{org_slug}/cdn_spaces` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `list` | `GET /api/v1/organizations/{org_slug}/cdn_spaces` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `load` | `GET /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `patch` | `PATCH /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `remove` | `DELETE /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `update` | `PUT /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `list` | `GET /api/v1/cdn_spaces/{cdn_space_id}/objects` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `load` | `GET /api/v1/cdn_spaces/{cdn_space_id}/objects/{path}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `remove` | `DELETE /api/v1/cdn_spaces/{cdn_space_id}/objects/{path}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `update` | `PUT /api/v1/cdn_spaces/{cdn_space_id}/objects` | Required |
| [ConnectionRequest](docs/api/connection_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}` | Required |
| [ConnectionSource](docs/api/connection_source.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/sources` | Required |
| [CoordinationWait](docs/api/coordination_wait.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/waits` | Required |
| [CredentialSignInCheck](docs/api/credential_sign_in_check.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks` | Required |
| [CredentialSignInCheck](docs/api/credential_sign_in_check.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again` | Required |
| [DataResourceRotateCredential](docs/api/data_resource_rotate_credential.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans` | Required |
| [DeepScan](docs/api/deep_scan.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context` | Required |
| [DeepScanFinding](docs/api/deep_scan_finding.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings` | Required |
| [DeepScanFlow](docs/api/deep_scan_flow.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/flows` | Required |
| [DeepScanMappedFlow](docs/api/deep_scan_mapped_flow.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/mapped_flows` | Required |
| [DeepScanOption](docs/api/deep_scan_option.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/options` | Required |
| [DemoShare](docs/api/demo_share.html) | `load` | `GET /api/v1/verify/demo_shares/{token}` | Not required |
| [DemoShare](docs/api/demo_share.html) | `load` | `GET /api/v1/verify/demo_shares/{token}/thumbnail` | Not required |
| [DemoShareSegment](docs/api/demo_share_segment.html) | `load` | `GET /api/v1/verify/demo_shares/{token}/segments/{segment_id}` | Not required |
| [DeploymentDashboardNomad](docs/api/deployment_dashboard_nomad.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation` | Required |
| [DeploymentFile](docs/api/deployment_file.html) | `update` | `PUT /api/v1/static_sites/{static_site_id}/deployments/{id}/files` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [Dream](docs/api/dream.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/dreams/{id}/resume` | Required |
| [Dream](docs/api/dream.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/dreams` | Required |
| [Dream](docs/api/dream.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/dreams/{id}` | Required |
| [Environment](docs/api/environment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments` | Required |
| [Environment](docs/api/environment.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/environments` | Required |
| [Environment](docs/api/environment.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/environments/{id}` | Required |
| [Environment](docs/api/environment.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/environments/{id}` | Required |
| [Environment](docs/api/environment.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}` | Required |
| [Environment](docs/api/environment.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run` | Required |
| [Environment](docs/api/environment.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/environments/{id}` | Required |
| [Environment](docs/api/environment.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run` | Required |
| [EnvironmentDiscoveryRun](docs/api/environment_discovery_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop` | Required |
| [EnvironmentDiscoveryRun](docs/api/environment_discovery_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs` | Required |
| [EnvironmentDiscoveryRun](docs/api/environment_discovery_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}` | Required |
| [EnvironmentExploration](docs/api/environment_exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{environment_id}/explorations` | Required |
| [EnvironmentFirstRun](docs/api/environment_first_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run/start` | Required |
| [EnvironmentFirstRun](docs/api/environment_first_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run/test_user` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/revoke` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/validate` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}` | Required |
| [EnvironmentRevision](docs/api/environment_revision.html) | `update` | `POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}` | Required |
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings` | Required |
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/copy` | Required |
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings` | Required |
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/{id}` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/archive` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/{id}/download` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence` | Required |
| [Exploration](docs/api/exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/retry_startup` | Required |
| [Exploration](docs/api/exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/create_project` | Required |
| [Exploration](docs/api/exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report` | Required |
| [Exploration](docs/api/exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/stop` | Required |
| [Exploration](docs/api/exploration.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations` | Required |
| [Exploration](docs/api/exploration.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/explorations` | Required |
| [Exploration](docs/api/exploration.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}` | Required |
| [Exploration](docs/api/exploration.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/progress` | Required |
| [Exploration](docs/api/exploration.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report` | Required |
| [Exploration](docs/api/exploration.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/sign_in_browser` | Required |
| [ExplorationMessage](docs/api/exploration_message.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/messages` | Required |
| [ExplorationReport](docs/api/exploration_report.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/refresh` | Required |
| [ExplorationReport](docs/api/exploration_report.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/document` | Required |
| [ExplorationScenario](docs/api/exploration_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios` | Required |
| [Finding](docs/api/finding.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/findings` | Required |
| [Finding](docs/api/finding.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/findings/{id}` | Required |
| [Finding](docs/api/finding.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/findings/{id}` | Required |
| [Finding](docs/api/finding.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/findings/{id}` | Required |
| [GithubConnection](docs/api/github_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/github_connections` | Required |
| [GithubConnection](docs/api/github_connection.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/github_connections` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{id}/enable` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/domains` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [ImageRepository](docs/api/image_repository.html) | `create` | `POST /api/v1/organizations/{org_slug}/image_repositories` | Required |
| [ImageRepository](docs/api/image_repository.html) | `list` | `GET /api/v1/organizations/{org_slug}/image_repositories` | Required |
| [Integration](docs/api/integration.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/integrations` | Required |
| [InteractionResponse](docs/api/interaction_response.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses` | Required |
| [Invitation](docs/api/invitation.html) | `create` | `POST /api/v1/organizations/{organization_id}/invitations` | Required |
| [Invitation](docs/api/invitation.html) | `list` | `GET /api/v1/organizations/{organization_id}/invitations` | Required |
| [Invitation](docs/api/invitation.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/invitations/{id}` | Required |
| [JourneyVariantReplay](docs/api/journey_variant_replay.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays` | Required |
| [Knowledge](docs/api/knowledge.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/knowledge` | Required |
| [Knowledge](docs/api/knowledge.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/knowledge` | Required |
| [Knowledge](docs/api/knowledge.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [LocalThreadDelivery](docs/api/local_thread_delivery.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}` | Required |
| [LocalThreadDelivery](docs/api/local_thread_delivery.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations/{operation_id}` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/operations/{operation_id}` | Required |
| [Location](docs/api/location.html) | `list` | `GET /api/v1/hosting/locations` | Required |
| [Me](docs/api/me.html) | `create` | `POST /api/v1/me/account_deletion` | Required |
| [Me](docs/api/me.html) | `create` | `POST /api/v1/me/app_promotion` | Required |
| [Me](docs/api/me.html) | `load` | `GET /api/v1/me` | Required |
| [Me](docs/api/me.html) | `load` | `GET /api/v1/me/account_deletion` | Required |
| [Me](docs/api/me.html) | `load` | `GET /api/v1/me/landing` | Required |
| [Me](docs/api/me.html) | `load` | `GET /api/v1/me/workspace_suggestion` | Required |
| [Me](docs/api/me.html) | `remove` | `DELETE /api/v1/me/profile_image` | Required |
| [Me](docs/api/me.html) | `update` | `PATCH /api/v1/me` | Required |
| [Me](docs/api/me.html) | `update` | `PUT /api/v1/me/active_organization` | Required |
| [Me](docs/api/me.html) | `update` | `PUT /api/v1/me/profile_image` | Required |
| [MeEmail](docs/api/me_email.html) | `create` | `POST /api/v1/me/emails/{id}/resend_verification` | Required |
| [MeEmail](docs/api/me_email.html) | `create` | `POST /api/v1/me/emails` | Required |
| [MeEmail](docs/api/me_email.html) | `list` | `GET /api/v1/me/emails` | Required |
| [MeEmail](docs/api/me_email.html) | `patch` | `PATCH /api/v1/me/emails/{id}` | Required |
| [MeEmail](docs/api/me_email.html) | `remove` | `DELETE /api/v1/me/emails/{id}` | Required |
| [MeEmail](docs/api/me_email.html) | `update` | `PUT /api/v1/me/emails/{id}` | Required |
| [MeOnboarding](docs/api/me_onboarding.html) | `create` | `POST /api/v1/me/onboarding/call` | Required |
| [MeOnboarding](docs/api/me_onboarding.html) | `create` | `POST /api/v1/me/onboarding/claim` | Required |
| [MeOnboarding](docs/api/me_onboarding.html) | `create` | `POST /api/v1/me/onboarding/dismiss` | Required |
| [MediaFile](docs/api/media_file.html) | `load` | `GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}/files/{file_id}` | Required |
| [Member](docs/api/member.html) | `list` | `GET /api/v1/organizations/{organization_id}/members` | Required |
| [Member](docs/api/member.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/members/{id}` | Required |
| [Member](docs/api/member.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/members/{id}` | Required |
| [Member](docs/api/member.html) | `update` | `PUT /api/v1/organizations/{organization_id}/members/{id}` | Required |
| [Memory](docs/api/memory.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/memories` | Required |
| [Memory](docs/api/memory.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/memories` | Required |
| [Memory](docs/api/memory.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/memories/{id}` | Required |
| [Memory](docs/api/memory.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/memories/{id}` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests/preview` | Required |
| [MergeRequest](docs/api/merge_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/merge_requests/{id}` | Required |
| [MessagingConversationMessage](docs/api/messaging_conversation_message.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction` | Required |
| [MessagingConversationMessage](docs/api/messaging_conversation_message.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages` | Required |
| [MessagingConversationUpload](docs/api/messaging_conversation_upload.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads` | Required |
| [MetricQuery](docs/api/metric_query.html) | `list` | `GET /api/v1/hosting/metrics/queries` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/network_connections` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/network_connections/{id}` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/network_connections/{id}` | Required |
| [NomadAllocation](docs/api/nomad_allocation.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}` | Required |
| [NomadLog](docs/api/nomad_log.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs` | Required |
| [Organization](docs/api/organization.html) | `create` | `POST /api/v1/organizations` | Required |
| [Organization](docs/api/organization.html) | `list` | `GET /api/v1/organizations` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /api/v1/organizations/{id}` | Required |
| [Organization](docs/api/organization.html) | `patch` | `PATCH /api/v1/organizations/{id}` | Required |
| [Organization](docs/api/organization.html) | `update` | `PUT /api/v1/organizations/{id}` | Required |
| [Page](docs/api/page.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/page` | Required |
| [PageAgent](docs/api/page_agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/page/activity` | Required |
| [PageAgent](docs/api/page_agent.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/page` | Required |
| [PageAgent](docs/api/page_agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/page/roster` | Required |
| [PageProjectRun](docs/api/page_project_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/page` | Required |
| [PagesProjectCredential](docs/api/pages_project_credential.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/credentials` | Required |
| [PagesProjectPersona](docs/api/pages_project_persona.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas` | Required |
| [PagesProjectRun](docs/api/pages_project_run.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs` | Required |
| [PagesProjectScenario](docs/api/pages_project_scenario.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenarios` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `create` | `POST /api/v1/personal_access_tokens` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `list` | `GET /api/v1/personal_access_tokens` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `remove` | `DELETE /api/v1/personal_access_tokens/{id}` | Required |
| [PreviewOperation](docs/api/preview_operation.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/operations` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}` | Required |
| [PreviewSharingApproval](docs/api/preview_sharing_approval.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals` | Required |
| [PreviewSharingApproval](docs/api/preview_sharing_approval.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals` | Required |
| [ProductMapIdentityDecision](docs/api/product_map_identity_decision.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions` | Required |
| [ProductMapJourney](docs/api/product_map_journey.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys` | Required |
| [ProductMapJourney](docs/api/product_map_journey.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys/{journey_id}` | Required |
| [ProductMapJourneyReplay](docs/api/product_map_journey_replay.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification` | Required |
| [ProductMapJourneyReplay](docs/api/product_map_journey_replay.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}` | Required |
| [ProductMapObservation](docs/api/product_map_observation.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}` | Required |
| [ProductMapObservation](docs/api/product_map_observation.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}/identity_history` | Required |
| [ProductMapQuestion](docs/api/product_map_question.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions` | Required |
| [ProductMapState](docs/api/product_map_state.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/states` | Required |
| [ProductMapState](docs/api/product_map_state.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/states/{state_id}` | Required |
| [Project](docs/api/project.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/discovery` | Required |
| [Project](docs/api/project.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{id}/archive` | Required |
| [Project](docs/api/project.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects` | Required |
| [Project](docs/api/project.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/environment` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/persona` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{id}` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/header` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_activity` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_discovery` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_history` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/pr_testing` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/recorder` | Required |
| [Project](docs/api/project.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_editor` | Required |
| [Project](docs/api/project.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{id}` | Required |
| [Project](docs/api/project.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{id}` | Required |
| [Project](docs/api/project.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{id}/icon_image` | Required |
| [ProjectAndroidApk](docs/api/project_android_apk.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/android_apks` | Required |
| [ProjectCodeMap](docs/api/project_code_map.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps` | Required |
| [ProjectCodeMap](docs/api/project_code_map.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps/session` | Required |
| [ProjectCodeMap](docs/api/project_code_map.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/directory` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}` | Required |
| [ProjectEnvironment](docs/api/project_environment.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}` | Required |
| [ProjectFinding](docs/api/project_finding.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}` | Required |
| [ProjectFixture](docs/api/project_fixture.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}` | Required |
| [ProjectIosApp](docs/api/project_ios_app.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/retire` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/typing` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}` | Required |
| [ProjectMessagingConversation](docs/api/project_messaging_conversation.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}` | Required |
| [ProjectOverviewMetric](docs/api/project_overview_metric.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_metrics` | Required |
| [ProjectOverviewPullRequest](docs/api/project_overview_pull_request.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/path` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/compare` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/brief` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/frontier` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview` | Required |
| [ProjectProductMap](docs/api/project_product_map.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/version` | Required |
| [ProjectRecording](docs/api/project_recording.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish` | Required |
| [ProjectRecording](docs/api/project_recording.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/redraft` | Required |
| [ProjectRecording](docs/api/project_recording.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings` | Required |
| [ProjectRecording](docs/api/project_recording.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}` | Required |
| [ProjectRecording](docs/api/project_recording.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}` | Required |
| [ProjectRunPlan](docs/api/project_run_plan.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/preview` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/lookup` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}` | Required |
| [ProjectRunSchedule](docs/api/project_run_schedule.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}` | Required |
| [ProjectScenarioOption](docs/api/project_scenario_option.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_options` | Required |
| [ProjectScenarioRow](docs/api/project_scenario_row.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows` | Required |
| [ProjectSetting](docs/api/project_setting.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/settings` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/preview` | Required |
| [PullRequest](docs/api/pull_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/pull_requests/lookup` | Required |
| [PullRequest](docs/api/pull_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/pull_requests/{id}` | Required |
| [PullRequest](docs/api/pull_request.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/pull_request_settings` | Required |
| [PullRequestSettingAddRepository](docs/api/pull_request_setting_add_repository.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories` | Required |
| [PullRequestSettingDetectComment](docs/api/pull_request_setting_detect_comment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments` | Required |
| [Recorder](docs/api/recorder.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/recorder` | Required |
| [Registry](docs/api/registry.html) | `load` | `GET /api/v1/registry/namespace` | Required |
| [RegistryV2](docs/api/registry_v2.html) | `create` | `POST /api/v1/registry/v2/authorize` | Required |
| [RelayAgentLocalThread](docs/api/relay_agent_local_thread.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay` | Required |
| [ReportReplay](docs/api/report_replay.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}` | Required |
| [ReportScenario](docs/api/report_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | Required |
| [RunScheduleOption](docs/api/run_schedule_option.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/options` | Required |
| [RunSearch](docs/api/run_search.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/run_search` | Required |
| [RunUpdate](docs/api/run_update.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/run_updates` | Required |
| [ScenarioRevision](docs/api/scenario_revision.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/revisions` | Required |
| [ScenarioRunLesson](docs/api/scenario_run_lesson.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [SitePreview](docs/api/site_preview.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/site_preview` | Required |
| [SlackChannel](docs/api/slack_channel.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/channels` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | Required |
| [StaticSite](docs/api/static_site.html) | `create` | `POST /api/v1/static_sites/{id}/provision` | Required |
| [StaticSite](docs/api/static_site.html) | `create` | `POST /api/v1/organizations/{organization_id}/static_sites` | Required |
| [StaticSite](docs/api/static_site.html) | `list` | `GET /api/v1/organizations/{organization_id}/static_sites` | Required |
| [StaticSite](docs/api/static_site.html) | `load` | `GET /api/v1/static_sites/{id}` | Required |
| [StaticSite](docs/api/static_site.html) | `patch` | `PATCH /api/v1/static_sites/{id}` | Required |
| [StaticSite](docs/api/static_site.html) | `remove` | `DELETE /api/v1/static_sites/{id}` | Required |
| [StaticSite](docs/api/static_site.html) | `update` | `PUT /api/v1/static_sites/{id}` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/deployments/{id}/cancel` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/deployments/{id}/finalize` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/deployments` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `list` | `GET /api/v1/static_sites/{static_site_id}/deployments` | Required |
| [StaticSiteDeployment](docs/api/static_site_deployment.html) | `load` | `GET /api/v1/static_sites/{static_site_id}/deployments/{id}` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/domains/{id}/provision` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/domains` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `list` | `GET /api/v1/static_sites/{static_site_id}/domains` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `load` | `GET /api/v1/static_sites/{static_site_id}/domains/{id}` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `patch` | `PATCH /api/v1/static_sites/{static_site_id}/domains/{id}` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `remove` | `DELETE /api/v1/static_sites/{static_site_id}/domains/{id}` | Required |
| [StaticSiteDomain](docs/api/static_site_domain.html) | `update` | `PUT /api/v1/static_sites/{static_site_id}/domains/{id}` | Required |
| [SubscriptionModel](docs/api/subscription_model.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions/models` | Required |
| [ThreadPreview](docs/api/thread_preview.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/inbox` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}` | Required |
| [VerificationProjectCredential](docs/api/verification_project_credential.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}` | Required |
| [VerificationProjectPersona](docs/api/verification_project_persona.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/archive` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/cancel` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/launch` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/rerun` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/restore` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/prepare` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}` | Required |
| [VerificationProjectRun](docs/api/verification_project_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/card` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/archive` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/duplicate` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/from_exploration` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/import` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/export` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}` | Required |
| [VerificationProjectScenario](docs/api/verification_project_scenario.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}` | Required |
| [VerifyAppDomain](docs/api/verify_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{id}/verify` | Required |
| [VerifyBrowserSession](docs/api/verify_browser_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}/save` | Required |
| [VerifyBrowserSession](docs/api/verify_browser_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/browser_sessions` | Required |
| [VerifyBrowserSession](docs/api/verify_browser_session.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}` | Required |
| [VerifyBrowserSession](docs/api/verify_browser_session.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}` | Required |
| [VerifyStaticSiteDomain](docs/api/verify_static_site_domain.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/domains/{id}/verify` | Required |
| [VersionLog](docs/api/version_log.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs` | Required |
| [WebBotAuth](docs/api/web_bot_auth.html) | `create` | `POST /api/v1/verify/web_bot_auth` | Required |
| [WorkflowRunStep](docs/api/workflow_run_step.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/steps/{step_id}/output` | Required |
| [WorkflowRunStopNotice](docs/api/workflow_run_stop_notice.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/stop_notice/dismissal` | Required |
| [WorkflowTriggerSkipped](docs/api/workflow_trigger_skipped.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run` | Required |

## Connect to the API

- API server: `https://api.composal.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

A sandbox thread&#39;s per-turn stand-in token. Model credentials are never accepted or returned.

Private tenant bridge credential. Personal API tokens are not accepted.

Current Enterprise runtime callback credential; browser sessions and hosted worker credentials are not accepted.

Private tenant bridge credential. Personal API tokens and Parallel provider credentials are not accepted.

The current explicit owner setup key for this exact connection. User and worker tokens are refused.

Namespace-scoped read-only native ingress credential, invalidated by namespace retirement or generation changes. Browser sessions, user API tokens, OCE worker and operator credentials cannot replace it.

Signed credential bound to one active runner invocation attempt

Revocable Boxmad control-plane credential for one configured repository/class pool

Expiring credential bound to one active single-use runner supply and GitHub runner ID

Browser session cookie issued by login; deployments may configure the cookie name.

Current organization-owned Control-service credential. Never a user or agent token.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /api/v1/agent_marketplace`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.composal.com/api/v1/agent_marketplace'
```

Inspect the response using the [AgentMarketplace](docs/api/agent_marketplace.html) reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Postman collections](docs/sdks/postman.html) | `postman/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `composal_list`: List records for an entity. Supported entities: `agent`, `agent_automation`, `agent_command`, `agent_connection`, `agent_control_flow`, `agent_integration`, `agent_interaction`, `agent_manager_choice`, `agent_pull_request`, `agent_repository`, `agent_resource`, `agent_routine`, `agent_setting`, `agent_site`, `agent_skill`, `agent_subagent`, `agent_subscription`, `agent_teammate`, `agent_thread`, `agent_tool`, `agent_verify_project`, `agent_workflow`, `agent_workflow_run`, `agent_workflow_trigger`, `agent_workspace`, `agent_write_permission`, `allocation_log`, `app`, `app_cdn`, `app_config_variable`, `app_data_resource`, `app_deployment`, `app_deployment_operation`, `app_environment`, `app_location`, `app_preview`, `app_preview_profile`, `app_run`, `app_secret`, `app_service`, `app_service_binding`, `app_service_placement`, `app_storage_resource`, `binary`, `binary_version`, `browser_egress_candidate`, `browser_session_event`, `catalog_selector`, `cdn_deployment`, `cdn_hostname`, `cdn_space`, `cdn_space_object`, `connection_source`, `coordination_wait`, `deep_scan`, `deep_scan_finding`, `deep_scan_mapped_flow`, `deep_scan_option`, `domain_path_rule`, `dream`, `environment`, `environment_secret_binding`, `environment_test_account`, `exploration`, `finding`, `github_connection`, `hosting_app_domain`, `image_repository`, `integration`, `invitation`, `location`, `me_email`, `member`, `memory`, `metric_query`, `nomad_log`, `organization`, `page_agent`, `pages_project_credential`, `pages_project_persona`, `pages_project_run`, `pages_project_scenario`, `personal_access_token`, `preview_operation`, `preview_profile_secret_binding`, `preview_sharing_approval`, `product_map_journey`, `product_map_state`, `project`, `project_code_map`, `project_environment`, `project_finding`, `project_fixture`, `project_overview_metric`, `project_overview_pull_request`, `project_run_plan`, `project_run_schedule`, `project_scenario_option`, `project_scenario_row`, `project_setting`, `pull_request_setting`, `run_schedule_option`, `run_update`, `scenario_revision`, `service_endpoint`, `slack_channel`, `static_site`, `static_site_deployment`, `static_site_domain`, `subscription_model`, `verification_project_credential`, `verification_project_persona`, `verification_project_run`, `verification_project_scenario`, `version_log`.
- `composal_load`: Load one record for an entity. Supported entities: `agent`, `agent_automation`, `agent_avatar`, `agent_computer`, `agent_connection`, `agent_control_flow`, `agent_email`, `agent_file`, `agent_interaction`, `agent_library`, `agent_marketplace`, `agent_marketplace_shared`, `agent_operation`, `agent_run`, `agent_sharing`, `agent_webhook`, `agent_workflow_proposal`, `agent_workflow_run`, `agent_workflow_trigger`, `app`, `app_cdn`, `app_config_variable`, `app_data_resource`, `app_deployment`, `app_deployment_operation`, `app_environment`, `app_metric`, `app_preview`, `app_preview_profile`, `app_run`, `app_secret`, `app_service`, `app_service_binding`, `app_service_placement`, `app_storage_resource`, `binary`, `binary_version`, `browser_session`, `browser_session_control`, `browser_session_media`, `browser_session_task`, `cdn_deployment`, `cdn_hostname`, `cdn_space`, `cdn_space_object`, `connection_request`, `deep_scan`, `demo_share`, `demo_share_segment`, `deployment_dashboard_nomad`, `domain_path_rule`, `dream`, `environment`, `environment_discovery_run`, `environment_revision`, `evidence`, `exploration`, `exploration_report`, `finding`, `hosting_app_domain`, `knowledge`, `local_thread_delivery`, `local_thread_operation`, `me`, `media_file`, `memory`, `merge_request`, `nomad_allocation`, `organization`, `page`, `page_agent`, `page_project_run`, `product_map_journey`, `product_map_journey_replay`, `product_map_observation`, `product_map_state`, `project`, `project_environment`, `project_fixture`, `project_messaging_conversation`, `project_product_map`, `project_recording`, `project_run_plan`, `project_run_schedule`, `pull_request`, `recorder`, `registry`, `report_replay`, `run_scenario_run`, `run_search`, `service_endpoint`, `site_preview`, `spark_agent_local_thread`, `static_site`, `static_site_deployment`, `static_site_domain`, `verification_project_credential`, `verification_project_persona`, `verification_project_run`, `verification_project_scenario`, `verify_browser_session`, `workflow_run_step`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`secrets`](docs/features/secrets.html): Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

