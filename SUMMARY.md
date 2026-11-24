# Composal API

Composal runs AI agents for engineering teams: always-on persistent agents with their own instructions, memory and triggers, and Verify, whose browser agents test real user journeys on pull-request previews and releases. Its HTTP API also covers app hosting and a container registry.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 555 entities and 1747 HTTP routes. There are 7 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [A2aWellKnown](docs/api/a2a_well_known.html)

Results: Generic pinned Relaycast message profile, without live connection data.

SDK operations: `load`.

### [AdminOrg](docs/api/admin_org.html)

Results: Success; Hosted Stripe Checkout URL; Organization, owner invitation URL, and queued email delivery status; Customer account settings.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `billing_reason`: Required when setting an agreed price
- `monthly_price_dollars`: Ongoing USD workspace price, for example &#39;50.00&#39;
- `onboarding_package_keys`: Package keys offered when customizing onboarding.
- `package_id`: Active customer package public ID.
- `skip_payment`: Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits.

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

### [AgentApp](docs/api/agent_app.html)

Results: Success; Opening recorded; Team apps; Team app.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `can_message`: The viewer may send input to the author agent
- `deployments_count`: Increases with every deploy of the site
- `hidden_install_count`: Installs by agents the viewer cannot open
- `installed_target_ids`: Install targets of the viewer that have this app installed
- `owner`: The person who controls the author agent

### [AgentAppInstall](docs/api/agent_app_install.html)

Results: Uninstalled; Installed.

SDK operations: `remove`, `update`.

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

Results: Updated connection custody metadata; Connection response; Success; Sign-in cancelled; Owner-managed revision delegation; Connection grants; Administrator safety metadata only; Custody permissions and audit history; Current disconnect impact; Deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `can_create_account`: Whether another account can be created directly from this provider. Custom MCP endpoints use the MCP setup form.
- `catalog_section`: Server-owned grouping in the agent integration catalog.
- `category`: Short product label, such as CRM or Email.
- `creation_key`: Reuse the same key to recover the account after an interrupted response.
- `description`: One-line catalog description of the app.

### [AgentConnectionDelegation](docs/api/agent_connection_delegation.html)

Results: Owner-managed revision delegation.

SDK operations: `list`.

### [AgentConnectionGrant](docs/api/agent_connection_grant.html)

Results: Connection grants.

SDK operations: `list`.

### [AgentConnectionResource](docs/api/agent_connection_resource.html)

Results: Owned account resource metadata.

SDK operations: `create`.

### [AgentConnectionSafetyControl](docs/api/agent_connection_safety_control.html)

Results: Administrator safety metadata only.

SDK operations: `list`.

### [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html)

Results: Owner subscription response; Success.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [AgentContextCheckpoint](docs/api/agent_context_checkpoint.html)

Results: A verified bounded excerpt from the selected change patchset&#39;s sanitized checkpoint archive.

SDK operations: `load`.

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

### [AgentEvent](docs/api/agent_event.html)

Results: Native conversation event stream.

SDK operations: `load`.

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

Results: Connection response; Success; Sign-in cancelled; Organization MCP connection created; Integration catalog; Current GitHub App repository scope without Verify projects or source imports; Account deleted.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `account_counts`: Accounts the viewer can see per toolkit, across all account pages.
- `can_cancel_sign_in`: The viewer can cancel the unfinished authorization attempt.
- `can_sync`: The viewer&#39;s own sign-in is waiting; their app may ask Rails whether the browser finished.
- `connected_by`: Name of the person whose sign-in this account is.
- `connected_by_you`: True when the viewer is the person whose sign-in this account is.

### [AgentIntegrationAccount](docs/api/agent_integration_account.html)

Results: Organization accounts.

SDK operations: `list`.

Key fields to recognise:

- `can_cancel_sign_in`: The viewer can cancel the unfinished authorization attempt.
- `can_sync`: The viewer&#39;s own sign-in is waiting; their app may ask Rails whether the browser finished.
- `connected_by`: Name of the person whose sign-in this account is.
- `connected_by_you`: True when the viewer is the person whose sign-in this account is.
- `creation_key_digest`: SHA-256 of the unfinished setup key for its original creator.

### [AgentIntegrationCallback](docs/api/agent_integration_callback.html)

Results: Connected.

SDK operations: `load`.

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

### [AgentRelayFileGrant](docs/api/agent_relay_file_grant.html)

Results: Selected resource permission.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `connection_name`: Current display name of the selected account.
- `snapshot_supported`: Whether this selected permission supports snapshot controls. Each operation still requires current source and account access. Missing on older servers.

### [AgentRelayFileGrantAccount](docs/api/agent_relay_file_grant_account.html)

Results: Current owner-held accounts authorized for this source.

SDK operations: `list`.

Key fields to recognise:

- `access_modes`: Supported file access modes. Older API versions omit this field and offer read access only.

### [AgentRepository](docs/api/agent_repository.html)

Results: Repository grants, editor choices and optimistic version; What this call prepared. A build still running at the default branch head is building even while thread sandboxes start from an earlier ready revision, which the repositories read shows. Repeated calls reuse the same revision, running setup run or running branch check.

SDK operations: `load`, `update`.

Key fields to recognise:

- `environments`: Sandbox environment per granted repository ID, shared by every bot granted that repository.
- `repository_choices_error`: GitHub discovery warning. Saved grants and known local repository choices remain available.

### [AgentResource](docs/api/agent_resource.html)

Results: Authorized operator result.

SDK operations: `list`.

### [AgentRoder](docs/api/agent_roder.html)

Results: Browser executor authority remains valid; Roder browser session; The capability still authorizes native runner access; Browser collaboration is enabled for the current organization member.

SDK operations: `create`, `load`.

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

### [AgentSession](docs/api/agent_session.html)

Results: Indexed events or an explicit content availability state.

SDK operations: `load`.

### [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html)

Results: Success; The recorded checkpoint source, after required queue admission.

SDK operations: `create`, `load`.

### [AgentSessionRoderHandoff](docs/api/agent_session_roder_handoff.html)

Results: Success; Roder browser connection seeded with the session handoff capability.

SDK operations: `create`.

Key fields to recognise:

- `checkpoint_id`: Public id of the checkpoint to hand off.
- `purpose`: Handoff intent; defaults to `continue`.

### [AgentSetting](docs/api/agent_setting.html)

Results: Agent configuration.

SDK operations: `load`, `update`.

### [AgentSharing](docs/api/agent_sharing.html)

Results: Accounts sharing would stop.

SDK operations: `load`.

### [AgentSite](docs/api/agent_site.html)

Results: Success; Opening recorded; Published sites; Published site; 128 pixel WebP icon.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `can_message`: The viewer may send input to the author agent
- `deployments_count`: Increases with every deploy of the site
- `description`: The team app description, when the site is a team app
- `icon_url`: Path of the site&#39;s generated icon, versioned by the picture; null until one is generated
- `name`: The site&#39;s DNS label

### [AgentSkill](docs/api/agent_skill.html)

Results: Skills added; Skills found; Skill; Matching plugins or skills; Skill library; Updated library; Updated skill.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `agents`: Active V2 agents the viewer can see whose owner is still a member
- `audience`: all while every listed agent has it and new agents get it
- `content`: The skill&#39;s SKILL.md
- `pending`: Some agent is still applying a change; check again shortly
- `plugin`: The marketplace entry id

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

SDK operations: `create`, `load`.

### [AgentSwarm](docs/api/agent_swarm.html)

Results: Agent swarm canceled (PRD 146 FR30); Success; Agent swarm created; One page of agent swarms in the organization; Agent swarm with recent tasks; One page response for the swarm live view; The swarm&#39;s effective policy, budget and pinned environment; The swarm&#39;s effective policy after the edit.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `base_bookmark`: An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`.
- `base_revision`: 64-hex commit id; skips the head lookup
- `policy`: Every key is optional and defaults to AgentSwarm::`POLICY_DEFAULTS`.
- `repository`: Repository slug inside the organization
- `target`: Where the swarm lands.

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

Results: Success.

SDK operations: `create`, `load`.

### [AgentTool](docs/api/agent_tool.html)

Results: Authorized operator result.

SDK operations: `list`.

### [AgentUsage](docs/api/agent_usage.html)

Results: The analytics page.

SDK operations: `load`.

Key fields to recognise:

- `days`: One cell per (day, model), ascending by day then model. Days with no usage are absent.
- `pricing_version`: The price table in effect now; rows carry the version they were priced at.
- `source`: Which store served the rows.
- `user_days`: One cell per (day, person), ascending by day. `user` is null for hosted agents.
- `users`: One row per (person, model), descending by tokens. `user` is null for hosted agents.

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

### [AgentWebPreview](docs/api/agent_web_preview.html)

Results: Optional public metadata, or image bytes when asset is supplied.

SDK operations: `load`.

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

SDK operations: `create`, `load`, `update`.

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

### [Agreement](docs/api/agreement.html)

Results: Organization agreements page.

SDK operations: `list`.

Key fields to recognise:

- `body`: Markdown text, or null until staff grant the organization access.

### [AgreementAccessRequest](docs/api/agreement_access_request.html)

Results: Success; Agreement access requested; the refreshed agreements page.

SDK operations: `create`.

### [AlertRuleEvent](docs/api/alert_rule_event.html)

Results: Success.

SDK operations: `create`, `load`, `remove`.

### [AllocationLog](docs/api/allocation_log.html)

Results: Live Nomad task logs.

SDK operations: `load`.

### [App](docs/api/app.html)

An app hosted by Composal: list, create, read, change, activate, archive or delete one.

Results: Success; Hosted app created; Hosted apps visible to the current user; Hosted app configuration catalog; Hosted app deployment dashboard; Hosted app updated.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppAccess](docs/api/app_access.html)

Results: Success.

SDK operations: `load`.

### [AppAccessJwk](docs/api/app_access_jwk.html)

Results: Success.

SDK operations: `load`.

### [AppCdn](docs/api/app_cdn.html)

Results: Updated app CDN distribution; App CDN deployment action completed; App CDN distribution created; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppConfigVariable](docs/api/app_config_variable.html)

Results: Updated app configuration variable; App configuration variable created; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppDataResource](docs/api/app_data_resource.html)

Results: Success; Updated app data resource; Restored app data resource created; App data resource created.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

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

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppDeploymentOperation](docs/api/app_deployment_operation.html)

Results: Logical deployment operation; Logical deployment operations; Aggregate deployment operation live status.

SDK operations: `create`, `list`, `load`.

### [AppDeploymentRollback](docs/api/app_deployment_rollback.html)

Results: Existing idempotent deployment rollback; Deployment rollback created; Deployment rollback plan.

SDK operations: `create`.

### [AppEnvironment](docs/api/app_environment.html)

A hosted app&#39;s environments: list, create, read, change, pause, resume, archive or remove one.

Results: Updated app environment; App environment created; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppLocation](docs/api/app_location.html)

Results: Hosting location enabled for an app; Available hosting locations; Success; Hosting location disabled for an app.

SDK operations: `create`, `list`, `remove`.

### [AppMetric](docs/api/app_metric.html)

Results: Success.

SDK operations: `load`.

### [AppPreview](docs/api/app_preview.html)

Results: Success; Selected deployment operations accepted; Refreshed preview; Expiring source refresh review; Preview with the selected resolved revision and current generation; Created preview; Preview administration page; Preview administration index.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `change_number`: Organization Change number, optionally prefixed with #; mutually exclusive with `source_ref`.
- `expected_generation`: Required for `resource_overrides`, `storage_binding_resources`, `shared_service_binding_ids` or `shared_data_binding_ids`; stale generations return 409.
- `expected_patchset`: Optional public Change patchset fence; stale selections return 409.
- `resource_overrides`: Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.
- `shared_data_binding_ids`: Replace explicitly shared captured native data connections.

### [AppPreviewProfile](docs/api/app_preview_profile.html)

Results: Created preview defaults; Success; Updated preview defaults.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppRun](docs/api/app_run.html)

Results: Success.

SDK operations: `create`, `load`.

Key fields to recognise:

- `image`: Optional fully qualified digest-pinned image from the deployed service&#39;s registry and repository.

### [AppSecret](docs/api/app_secret.html)

Results: Success; Updated secret metadata after new version; Created secret metadata; Bulk import result summary; List of secret metadata objects; Secret metadata; Raw secret value for the current active version; Dotenv-formatted secrets (KEY=value pairs); Updated secret metadata; Secret deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [AppService](docs/api/app_service.html)

Results: Updated app service; App service created; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `deploy_paths`: Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. Empty means default to the app `root_path`.
- `effective_deploy_paths`: Tracked paths actually applied by the auto-deploy trigger (explicit `deploy_paths`, else [`root_path`]).
- `memory_max_mb`: Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). `memory_mb` stays the reservation the scheduler places against, so raising this does not make a rollout harder to place. Must be &gt;= `memory_mb`. Memory above the reservation is oversubscribed and best effort: under node pressure the kernel reclaims it and can OOM-kill the task. Null/absent renders no limit beyond the reservation.
- `nomad_kill_timeout_seconds`: Seconds the task gets after SIGTERM before SIGKILL. Null/absent leaves Nomad&#39;s 5s default. Capped at 30 because a Nomad client silently clamps `kill_timeout` to its own `max_kill_timeout` (default 30s).
- `nomad_shutdown_delay_seconds`: Seconds Nomad waits between deregistering the group&#39;s services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. Null/absent leaves Nomad&#39;s 0s default.

### [AppServiceBinding](docs/api/app_service_binding.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AppServicePlacement](docs/api/app_service_placement.html)

Results: Service placements; Service placement; Configured service placement.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `deployment_channel`: Preview-only override; null inherits the captured source channel.

### [AppStorageResource](docs/api/app_storage_resource.html)

Results: Storage resource archived; Success; App storage resource created.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `access_mode`: Object-store semantics only; ignored for volume resources
- `attachment`: Attachment readback: CSI publish state for `nomad_csi`, or the nodes carrying the directory for `local_nvme`. Nil until provisioned
- `capacity_gb`: Enforced for `nomad_csi` (minimum 10 GB).
- `ephemeral`: True when the contents may be deleted at any time and do not survive the loss of the underlying node. Ephemeral storage is a cache and must never hold a system of record.
- `external_volume_id`: Nomad/CSI volume id assigned at provisioning

### [Artefact](docs/api/artefact.html)

Results: Success; Successful response; Private attachment; Deleted; Working copy saved.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `document_key`: Stable document identity shared by all revisions.
- `version`: The newest published version.

### [ArtefactCommentThread](docs/api/artefact_comment_thread.html)

Results: Thread created; Threads in creation order; Thread updated.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `anchor`: The `#anchor` written into the Markdown.
- `id`: The anchor key.

### [ArtefactRevision](docs/api/artefact_revision.html)

Results: Revision published.

SDK operations: `create`.

Key fields to recognise:

- `base_version`: The newest version the editor started from.
- `content`: Markdown, including CriticMarkup suggestions and comment anchors.

### [ArtefactViewToken](docs/api/artefact_view_token.html)

Results: Short-lived viewer handshake URL.

SDK operations: `create`.

Key fields to recognise:

- `file`: Exact manifest path.
- `organization_slug`: If provided, must match the organization addressed by the route.

### [Artifact](docs/api/artifact.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ArtifactImageRepository](docs/api/artifact_image_repository.html)

Results: Success; Image repository push or pull contract.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ArtifactPackageMirror](docs/api/artifact_package_mirror.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [AttachmentPart](docs/api/attachment_part.html)

Results: Part stored.

SDK operations: `update`.

### [AuditEvent](docs/api/audit_event.html)

Results: Organization audit events.

SDK operations: `list`.

### [Auth](docs/api/auth.html)

Results: Apple identity approved this login; Authenticated user session; Success; Session cleared; Signup accepted for email verification; Browser CSRF token; Available only to the active superadmin who began this session; Support session ended and the superadmin browser session restored.

SDK operations: `create`, `load`, `remove`.

### [AuthCli](docs/api/auth_cli.html)

Results: CLI login completed, or waiting for the user to choose an organization; Approved connection; Waiting for browser approval; Install grant valid for 45 minutes; the organization becomes the CLI default; CLI approval request; CLI approval request created.

SDK operations: `create`.

### [AuthGithub](docs/api/auth_github.html)

Results: Provider authorization URL.

SDK operations: `load`.

### [AuthGoogle](docs/api/auth_google.html)

Results: Provider authorization URL.

SDK operations: `load`.

### [AuthOpenai](docs/api/auth_openai.html)

Results: Success.

SDK operations: `load`.

### [AuthPasswordReset](docs/api/auth_password_reset.html)

Results: Password reset request accepted; Password updated.

SDK operations: `create`, `update`.

### [AuthRegistrationOption](docs/api/auth_registration_option.html)

Results: Password signup availability and Turnstile configuration.

SDK operations: `load`.

Key fields to recognise:

- `openai_sign_in_enabled`: Whether ChatGPT identity sign-in is configured and enabled for rollout.
- `waitlist_enabled`: New public signups require waitlist approval when enabled.

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

### [BackendRunnerPool](docs/api/backend_runner_pool.html)

Results: Success.

SDK operations: `create`, `load`, `remove`.

### [Bazel](docs/api/bazel.html)

Results: Success.

SDK operations: `create`.

### [BazelActionResult](docs/api/bazel_action_result.html)

Results: Success.

SDK operations: `load`, `update`.

### [BazelBackend](docs/api/bazel_backend.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [BazelBlob](docs/api/bazel_blob.html)

Results: Success.

SDK operations: `load`, `update`.

### [BazelExecution](docs/api/bazel_execution.html)

Results: Success.

SDK operations: `create`, `load`.

### [BazelFindMissingBlob](docs/api/bazel_find_missing_blob.html)

Results: Success.

SDK operations: `create`.

### [Billing](docs/api/billing.html)

Results: Billing page; Meters.

SDK operations: `load`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingAddon](docs/api/billing_addon.html)

Results: Updated billing page.

SDK operations: `update`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingBudget](docs/api/billing_budget.html)

Results: Updated billing page.

SDK operations: `patch`, `update`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `monthly_cap_cents`: Null clears the budget.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingCheckoutSession](docs/api/billing_checkout_session.html)

Results: Success; The hosted Checkout URL to redirect the browser to.

SDK operations: `create`.

Key fields to recognise:

- `entry_point`: Where the owner chose to pay, for product analytics.

### [BillingContact](docs/api/billing_contact.html)

Results: Updated billing page; Success.

SDK operations: `patch`, `update`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingExtraSpend](docs/api/billing_extra_spend.html)

Results: Updated billing page.

SDK operations: `patch`, `update`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `monthly_cap_cents`: Monthly limit across all metered overages, excluding plan fees.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingInvoice](docs/api/billing_invoice.html)

Results: Invoices.

SDK operations: `list`.

Key fields to recognise:

- `metronome_invoice_id`: Metronome&#39;s id for the invoice it pushed
- `total_cents`: The Metronome draft total

### [BillingPackage](docs/api/billing_package.html)

Results: Packages.

SDK operations: `list`.

Key fields to recognise:

- `ci_included_spend_cents`: Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. Omitted by older API releases.

### [BillingPortalSession](docs/api/billing_portal_session.html)

Results: Success; The portal URL to redirect the browser to.

SDK operations: `create`.

### [BillingPrepaidPeriod](docs/api/billing_prepaid_period.html)

Results: Monthly payment and service period; Current Stripe hosted invoice URL.

SDK operations: `load`.

### [BillingPrepaidPurchase](docs/api/billing_prepaid_purchase.html)

Results: Purchase accepted for payment reconciliation; Purchases, newest first; Purchase status and balance; Current hosted invoice URL.

SDK operations: `create`, `list`, `load`.

### [BillingSubscription](docs/api/billing_subscription.html)

Results: Updated billing page.

SDK operations: `patch`, `update`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `preview`: Metronome draft invoice and credits, or null.

### [BillingTokenTopUp](docs/api/billing_token_top_up.html)

Results: Success; Stripe Checkout URL; credit is granted only after verified payment.

SDK operations: `create`.

### [BillingUsage](docs/api/billing_usage.html)

Results: Usage breakdown.

SDK operations: `load`.

### [Binary](docs/api/binary.html)

Results: Safe project-scoped binary response.

SDK operations: `create`, `list`, `load`.

### [BinaryVersion](docs/api/binary_version.html)

Results: Safe project-scoped binary response; Success; Unreferenced version and owned resources deleted.

SDK operations: `create`, `list`, `load`, `remove`.

### [BookmarkProtectionRefreshGithubRequiredCheck](docs/api/bookmark_protection_refresh_github_required_check.html)

Results: GitHub required-check policy snapshot.

SDK operations: `create`.

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

### [CacheNamespaceEntry](docs/api/cache_namespace_entry.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [CatalogSelector](docs/api/catalog_selector.html)

Results: Target selectors without deployment history or configuration values.

SDK operations: `list`.

### [CdnDeployment](docs/api/cdn_deployment.html)

Results: Success.

SDK operations: `create`, `load`.

### [CdnHostname](docs/api/cdn_hostname.html)

Results: App CDN hostname created; Success; App CDN hostname deleted.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [CdnSpace](docs/api/cdn_space.html)

A CDN storage space and its objects.

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [CdnSpaceObject](docs/api/cdn_space_object.html)

Results: Success.

SDK operations: `load`, `remove`, `update`.

### [Change](docs/api/change.html)

Results: One page of the organization change queue, flat or grouped.

SDK operations: `load`.

Key fields to recognise:

- `counts`: Counts for each state across the active non-state filters.
- `result`: What this page is a page of. `kind` states what the top-level pagination describes: changes in the list view, group keys in a grouped view.

### [ChangeAsset](docs/api/change_asset.html)

Results: Available change asset; Success; Direct upload instructions and a pending asset binding.

SDK operations: `create`.

### [ChangeComment](docs/api/change_comment.html)

Results: Change comment threads; Success; Created comment and refreshed change comment threads.

SDK operations: `create`, `list`.

### [ChangeFileReviewCheckpoint](docs/api/change_file_review_checkpoint.html)

Results: Success; Recorded checkpoint and refreshed exact-content review projection.

SDK operations: `create`.

### [ChangeGitBranchSubmission](docs/api/change_git_branch_submission.html)

Results: Success.

SDK operations: `create`.

### [ChangeGitCommitIdentity](docs/api/change_git_commit_identity.html)

Results: Exact patchset identities and explicit unmatched Git commits; no native conversion; Exact persisted Git patchset in the authorized physical repository.

SDK operations: `create`, `load`.

### [ChangeGitPublication](docs/api/change_git_publication.html)

Results: Success; Receipt prepared or identical retry acknowledged; object readiness is checked separately; Original Git objects, Change identities, exact parents, and target verified; Receipt-owned immutable Git anchors are awaiting durable publication.

SDK operations: `create`, `load`.

Key fields to recognise:

- `transfer_refs`: Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness.

### [ChangeGroupMember](docs/api/change_group_member.html)

Results: Created explicit change group.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `change_id`: Change number
- `name`: Display name

### [ChangeLabel](docs/api/change_label.html)

Results: Detailed canonical change.

SDK operations: `update`.

Key fields to recognise:

- `assets`: Proof assets referenced from the description as `vex-asset:&lt;id&gt;`.
- `author`: Human user summary or organization automation identity. Automations have kind and slug, without email or `picture_url`.
- `has_description`: True when the change has Vex-owned review description content, distinct from the JJ commit message.
- `reviewer_candidates`: Organization members available to the reviewer picker on this page.

### [ChangeLandingHold](docs/api/change_landing_hold.html)

Results: Success.

SDK operations: `create`.

### [ChangeLandingRequest](docs/api/change_landing_request.html)

Results: Landing request created for the complete submitted-together closure; Landing request cancelled.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `defer_until_ready`: Admit the request while approvals or checks are pending

### [ChangeRequestChange](docs/api/change_request_change.html)

Results: Recorded vote. Reread the change page for its updated state.

SDK operations: `create`.

### [ChangeReviewer](docs/api/change_reviewer.html)

Results: Current requested reviewers; Current requested reviewers and the assignments changed by this request.

SDK operations: `list`, `update`.

### [ChangeTranscript](docs/api/change_transcript.html)

Results: Bounded transcript metadata for the Change.

SDK operations: `list`.

### [ChangeTranscriptSummary](docs/api/change_transcript_summary.html)

Results: Transcript summaries keyed by public Change ID.

SDK operations: `list`.

### [CheckpointPrepareChunk](docs/api/checkpoint_prepare_chunk.html)

Results: Success.

SDK operations: `create`.

### [CiNode](docs/api/ci_node.html)

Results: CI runner; Success.

SDK operations: `create`, `load`.

### [CiPipeline](docs/api/ci_pipeline.html)

Results: Success; CI pipelines; CI pipeline catalog.

SDK operations: `create`, `list`, `load`.

### [CiPipelineRun](docs/api/ci_pipeline_run.html)

Results: Existing CI retry for this request; CI retry created; Success; CI pipeline run catalog.

SDK operations: `create`, `load`.

### [CiRunnerPool](docs/api/ci_runner_pool.html)

Results: Verified runtime promoted for future reconciliation generations; Success; CI runner pools; CI runner pool catalog.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

### [CiStatus](docs/api/ci_status.html)

Results: CI status for a ref.

SDK operations: `load`.

### [CliEvent](docs/api/cli_event.html)

Results: Success; Accepted; command events are queued and legacy starts ignored. Does not confirm PostHog ingestion.

SDK operations: `create`.

### [CliRelease](docs/api/cli_release.html)

Results: Success.

SDK operations: `create`, `load`.

### [CloudWorkspaceBackupObject](docs/api/cloud_workspace_backup_object.html)

Results: Success.

SDK operations: `load`.

### [CodeRuleEvaluation](docs/api/code_rule_evaluation.html)

Results: Advisory evaluation, including explicit incomplete coverage when disabled or unavailable.

SDK operations: `create`.

Key fields to recognise:

- `diff`: UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB

### [ComSiteAccess](docs/api/com_site_access.html)

Results: Viewer session token for the site&#39;s host-only cookie; HTML waiting page that refreshes until the site&#39;s HTTPS certificate is ready.

SDK operations: `create`, `load`.

### [ComSiteAccessSession](docs/api/com_site_access_session.html)

Results: Viewer session for the site.

SDK operations: `create`.

Key fields to recognise:

- `host`: Site hostname, for example `docs.acme.composal.page`

### [CommentThreadComment](docs/api/comment_thread_comment.html)

Results: Reply added.

SDK operations: `create`.

### [CommitDiff](docs/api/commit_diff.html)

Results: One commit range and its file diff.

SDK operations: `load`.

### [ConnectionRequest](docs/api/connection_request.html)

Results: Current owner connection result.

SDK operations: `load`.

### [ConnectionSource](docs/api/connection_source.html)

Results: Current owner connection result.

SDK operations: `list`.

### [ContactSubmission](docs/api/contact_submission.html)

Results: The message was accepted (or silently discarded as spam).

SDK operations: `create`.

Key fields to recognise:

- `email`: Stored downcased and stripped.
- `website`: Honeypot.

### [ControlComputer](docs/api/control_computer.html)

Results: Current authorized local agent control result.

SDK operations: `list`, `update`.

Key fields to recognise:

- `connection`: A point-in-time control transport observation. Unknown means no valid observation; it never means offline. This grants no execution access or provider readiness.

### [ControlComputerControlOperation](docs/api/control_computer_control_operation.html)

Results: Current authorized local agent control result.

SDK operations: `create`, `load`.

Key fields to recognise:

- `delivery`: Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.
- `diagnostic_code`: Approved product error code retained after copied diagnostics expire. Absent for success, unknown codes and older cleared receipts; it does not reconcile uncertain delivery.
- `result_expired`: Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences.

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

Results: Success; The rerun scan; Stopped deep scan; Previously accepted scan; Accepted scan with its report URL; Deep scan; The selected tester; Deep Scan navigation context; Deep scan history and active scans.

SDK operations: `create`, `load`.

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

- `area`: On a locked finding, the first segment of the page it was seen on, such as Billing.
- `checks`: Checks in the same tester report that this finding cites.
- `confirmed`: On a locked finding, whether the automatic review confirmed it.
- `fix_prompt`: A coding-agent prompt for this finding alone
- `has_recording`: On a locked finding, whether the tester recorded evidence for it.

### [DeepScanFlow](docs/api/deep_scan_flow.html)

Results: Success; The started scans.

SDK operations: `create`.

### [DeepScanMappedFlow](docs/api/deep_scan_mapped_flow.html)

Results: Selected-scope flow choices.

SDK operations: `load`.

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

### [Deployment](docs/api/deployment.html)

Results: Deployment operation detail page contract; Deployments Architecture page contract. The view draws one of two canvases and never both: `map` is the organization topology and is present exactly when no app was selected, and everything below it is the selected app&#39;s topology. A scope value that names nothing is ignored rather than rejected.; Organization deployment feed page contract. `operations` is one page of deployment operations for the requested app, service and environment; a scope value that names nothing is ignored rather than rejected.

SDK operations: `load`.

### [DeploymentDashboardNomad](docs/api/deployment_dashboard_nomad.html)

Results: Live Nomad allocation details.

SDK operations: `load`.

### [DeploymentDetail](docs/api/deployment_detail.html)

Results: Deployments Details page contract: the live operational state of the app, service and stage the request names. Every collection is already narrowed to that scope, so nothing is filtered again after it arrives. A scope value that names nothing is ignored rather than rejected.

SDK operations: `load`.

Key fields to recognise:

- `filters`: The option lists the deployments page&#39;s app, service and stage pickers narrow by. `services` and `environments` are empty until an app is selected.
- `health`: The rolled-up state of the selected scope. `control_state` is the one word the dashboard leads with, and which signal wins is a deployment rule rather than something to re-derive from the counts beside it.
- `nomad`: The Nomad footprint of the selected scope, deduplicated.

### [DeploymentFile](docs/api/deployment_file.html)

Results: Success.

SDK operations: `update`.

### [DeploymentLog](docs/api/deployment_log.html)

Results: Deployments Logs page contract. `lines` is the stdout and stderr of every allocation serving `app_service_id`, merged and numbered across the whole stream before truncation; a scope value that names nothing is ignored rather than rejected.

SDK operations: `list`.

### [DeploymentMetric](docs/api/deployment_metric.html)

Results: Deployments Metrics page contract: observed usage, reserved capacity, and the one Grafana embed for the scope the page draws. A scope value that names nothing is ignored rather than rejected.

SDK operations: `list`.

### [DeploymentPreview](docs/api/deployment_preview.html)

Results: Organization preview inventory, filter choices and pagination.

SDK operations: `list`.

Key fields to recognise:

- `resource_overrides`: Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.

### [DeploymentSetting](docs/api/deployment_setting.html)

Results: Deployments Settings page contract. Everything below `app_id` is empty or null until an app is selected; a scope value that names nothing is ignored rather than rejected.

SDK operations: `list`.

### [DesktopLocalAgentModel](docs/api/desktop_local_agent_model.html)

Results: The model catalog for standalone Desktop Local inference.

SDK operations: `list`.

### [DesktopLocalAgentResponse](docs/api/desktop_local_agent_response.html)

Results: Provider events and usage streamed to the Local gateway.

SDK operations: `create`.

### [Device](docs/api/device.html)

Results: Identity-bound node connection; execution remains unavailable; Device enrollment metadata; Paired Desktop connection metadata; execution still requires separate authority; Process surface approved; task and local authorization remain required; Retry accepted, or the current attempt is already active; readiness remains separate.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `coding_connection`: Independent organization coding-control service state for the current device owner. Null when unavailable or using the legacy transport. A retry request does not imply readiness.
- `connection_checked_at`: When this native presence observation was obtained; null when unobserved or unavailable.
- `connection_status`: Display-only native presence. Does not grant execution or placement authority.
- `project_visibility`: Folder discovery and new-thread selection. Does not restrict existing threads or OS-account command access.
- `provider_status`: Recent native provider observations; absent on older API replicas.

### [DeviceBrowserOperation](docs/api/device_browser_operation.html)

Results: The request to carry out; Answer recorded; Waiting requests, oldest first.

SDK operations: `create`, `list`.

Key fields to recognise:

- `command`: The in-app browser takes open through `open_external`; the person&#39;s own browser (arguments.browser user) takes open, tabs, `share_tab`, navigate, back, reload, screenshot, read, click, type, press, scroll and close.

### [DeviceControlMessage](docs/api/device_control_message.html)

Results: Current held messages.

SDK operations: `list`.

### [DeviceControlOperation](docs/api/device_control_operation.html)

Results: Current authorized local agent control result.

SDK operations: `create`, `load`.

Key fields to recognise:

- `delivery`: Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.
- `diagnostic_code`: Approved product error code retained after copied diagnostics expire. Absent for success, unknown codes and older cleared receipts; it does not reconcile uncertain delivery.
- `result_expired`: Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences.

### [DeviceEnterpriseRelay](docs/api/device_enterprise_relay.html)

Results: Success.

SDK operations: `load`.

### [DeviceFolderListing](docs/api/device_folder_listing.html)

Results: Queued folder listing; Folder listing.

SDK operations: `create`, `load`.

Key fields to recognise:

- `key`: Stable idempotency key for this listing.
- `path`: The resolved folder.

### [DeviceGrant](docs/api/device_grant.html)

Results: Owner-scoped product grant metadata; execution remains unavailable.

SDK operations: `create`, `list`.

### [DeviceInvocation](docs/api/device_invocation.html)

Results: Device-key authorization response.

SDK operations: `create`.

### [DeviceLocalEvent](docs/api/device_local_event.html)

Results: Completion event recorded.

SDK operations: `create`.

### [DevicePairing](docs/api/device_pairing.html)

Results: Device enrollment metadata.

SDK operations: `create`.

### [DeviceProject](docs/api/device_project.html)

Results: Project removed.

SDK operations: `remove`.

### [DeviceScheduledCheckIn](docs/api/device_scheduled_check_in.html)

Results: Scheduled check-in setting saved.

SDK operations: `create`.

### [DockerBuilder](docs/api/docker_builder.html)

Results: Builder is already sleeping; Recovery scheduled; Builder state; Success.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

Key fields to recognise:

- `gateway_url`: Organization-addressed public WSS gateway; null until configured
- `startup_failure`: Safe failure reason for the most recent startup attempt

### [DockerBuilderSession](docs/api/docker_builder_session.html)

Results: Success; Builder session; Session revoked; active native runs remain admitted until provider completion.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `gateway_url`: Organization-addressed public WSS gateway; null until configured

### [DockerBuilderSetting](docs/api/docker_builder_setting.html)

Results: Builder state; Success.

SDK operations: `list`, `patch`, `update`.

### [DomainDnsIntegration](docs/api/domain_dns_integration.html)

Results: Connected Cloudflare DNS integration; DNS integrations in the organization.

SDK operations: `create`, `list`.

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

### [Edge](docs/api/edge.html)

Results: Success.

SDK operations: `load`.

### [EmailVerification](docs/api/email_verification.html)

Results: Generic verification request acknowledgement.

SDK operations: `create`.

### [Environment](docs/api/environment.html)

Results: Existing environment returned for an idempotent replay; Verify environment created; Combined Verify environment detail snapshot; Success; Updated Verify environment; The choice is cleared, or was already settled; The saved choice and, once started, the discovery to open.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

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

SDK operations: `create`, `load`, `remove`.

### [EnvironmentTestAccount](docs/api/environment_test_account.html)

Results: Login personas and write-only credential configuration status; Test account credentials configured without returning values; Success.

SDK operations: `list`, `patch`, `update`.

### [Evidence](docs/api/evidence.html)

Results: Success; A zip of the scenario run&#39;s evidence in capture order; Evidence bytes with the recorded content type; Requested byte range.

SDK operations: `load`.

### [ExecutionDesiredState](docs/api/execution_desired_state.html)

Results: Success; Desired state and current scheduler termination proof.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `stop_observed`: True only for archived zero-capacity states with all known jobs stopped and allocations terminated. Unknown observations return false.

### [ExecutionReconcilerTick](docs/api/execution_reconciler_tick.html)

Results: Success.

SDK operations: `create`, `load`.

### [ExecutionRelease](docs/api/execution_release.html)

Results: Success.

SDK operations: `create`, `load`.

### [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html)

Results: Success; Recent and live runtime instances.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `service_name`: Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. `nomad_task_name` is the scheduler&#39;s own name for the same workload.

### [Exploration](docs/api/exploration.html)

An exploration in which browser agents map an app before scenarios exist: start, follow, stop or read its report.

Results: Exploration after a replayed startup recovery; One replacement coordinator scheduled, or the same retry replayed; Project Scenario saved without launching a run; Existing report generation; Report queued; poll the exploration for the completed document; Exploratory run with agent reports and protected recordings; Running discovery teams and one page of all discovery runs; Exploration progress; Compact report page; recording timelines load separately; Latest attempt with live media and retained recording.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `agent_filters`: Status counts and matching agent IDs for every filter in this live snapshot.
- `can_continue`: Whether a finished run can be resumed through the orchestrator.
- `covered_areas`: Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.
- `credential_name`: The credential the team signed in with, by its saved name if it was deleted; null for public access. Older API releases omit this additive field.
- `deadline_at`: When the team&#39;s time limit ends. Older API releases omit this additive field during independent web and API rollouts.

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

### [Gh](docs/api/gh.html)

Results: GitHub review response.

SDK operations: `load`.

### [GitImport](docs/api/git_import.html)

Results: Success; Git is durable; conversion proceeds asynchronously; Native repair queued from retained Git storage; Scoped Git upload destination; Writer preparation is pending. Repeat the same idempotent creation request after Retry-After; no transfer credential is issued yet.; Git durability and native readiness.

SDK operations: `create`, `load`.

Key fields to recognise:

- `git_default_branch`: Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion

### [Github](docs/api/github.html)

Results: The physical Composal repository this GitHub remote resolves to.

SDK operations: `load`.

### [GithubApp](docs/api/github_app.html)

Results: Success.

SDK operations: `create`.

### [GithubAppImportableRepository](docs/api/github_app_importable_repository.html)

Results: Importable GitHub repositories grouped by installation account.

SDK operations: `list`.

Key fields to recognise:

- `next_page`: Next GitHub page for this installation

### [GithubAppInstallation](docs/api/github_app_installation.html)

Results: Connection verification requested or already pending; GitHub App installations linked to the organization; The installation link was removed.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `permission_entries`: GitHub&#39;s permission hash as a display-ready list, sorted by name.

### [GithubAppInstallationAuthorization](docs/api/github_app_installation_authorization.html)

Results: GitHub App installation URL with opaque setup state; Existing verified installation link refreshed; Verified installation link created; PKCE-protected GitHub App user authorization URL.

SDK operations: `create`.

Key fields to recognise:

- `organization_slug`: Vex organization slug whose installation will be linked.
- `return_target`: Server-validated Vex application target used after verification.

### [GithubAppUserAuthorization](docs/api/github_app_user_authorization.html)

Results: Success; GitHub App user authorization started.

SDK operations: `create`.

### [GithubCiRepository](docs/api/github_ci_repository.html)

Results: GitHub CI repository; GitHub CI repositories.

SDK operations: `create`, `list`, `load`, `patch`, `update`.

### [GithubCiRepositoryCompatibilityReport](docs/api/github_ci_repository_compatibility_report.html)

Results: CI workflow compatibility reports; CI workflow compatibility report.

SDK operations: `list`, `load`.

### [GithubConnection](docs/api/github_connection.html)

Results: GitHub verification connection.

SDK operations: `create`, `load`.

Key fields to recognise:

- `project_id`: Project slug or public ID the repositories are added to.
- `replace`: Make these the project&#39;s only repositories.

### [GithubIntegration](docs/api/github_integration.html)

Results: GitHub organization settings overview page contract; GitHub organization settings detail page contract.

SDK operations: `list`, `load`.

### [GithubOnboarding](docs/api/github_onboarding.html)

Results: GitHub onboarding state.

SDK operations: `load`.

Key fields to recognise:

- `active_batch_id`: The batch the wizard&#39;s import step should resume, the most recent batch still working, else the most recent overall.

### [GithubOnboardingBranch](docs/api/github_onboarding_branch.html)

Results: GitHub repository branches.

SDK operations: `list`.

### [GithubOnboardingImport](docs/api/github_onboarding_import.html)

Results: GitHub import batch.

SDK operations: `create`.

Key fields to recognise:

- `complete`: Whether every item has settled and the wizard should treat the import as finished.

### [GithubOnboardingImportBatch](docs/api/github_onboarding_import_batch.html)

Results: GitHub import batch.

SDK operations: `load`.

Key fields to recognise:

- `complete`: Whether every item has settled and the wizard should treat the import as finished.

### [GithubOnboardingImportItem](docs/api/github_onboarding_import_item.html)

Results: GitHub import batch.

SDK operations: `create`.

### [GithubPullRequest](docs/api/github_pull_request.html)

Results: Success; GitHub review response.

SDK operations: `create`, `load`.

### [GithubRunnerAdmission](docs/api/github_runner_admission.html)

Results: Success.

SDK operations: `create`.

### [GithubRunnerCache](docs/api/github_runner_cache.html)

Results: Cache lookup, upload reservation, or publication result.

SDK operations: `create`.

### [GithubRunnerEgress](docs/api/github_runner_egress.html)

Results: Current tenant-scoped routing status.

SDK operations: `create`, `load`.

### [GithubRunnerHistory](docs/api/github_runner_history.html)

Results: Organization runner history.

SDK operations: `load`.

Key fields to recognise:

- `setup`: CI onboarding. Older Rails replicas omit this additive field during deployment.

### [GithubRunnerImage](docs/api/github_runner_image.html)

Results: Success; Runner image and preparation status; Toolchains and preparation status.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `image_reference`: Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+
- `registry_secret_name`: Name of an organization CI secret containing `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` JSON fields

### [GithubRunnerPool](docs/api/github_runner_pool.html)

Results: GitHub Actions runner configuration; Repository runner pools.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `image`: Organization image name or ID; null restores the standard image

### [GithubRunnerSetup](docs/api/github_runner_setup.html)

Results: CI setup queued; Read-only connection to the setup agent; CI setup progress.

SDK operations: `create`, `load`.

### [Gitlab](docs/api/gitlab.html)

Results: Success; GitLab source integration.

SDK operations: `create`, `load`.

Key fields to recognise:

- `redirect_uri`: The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren&#39;t configured.

### [GitlabConnection](docs/api/gitlab_connection.html)

Results: Success; Sync control applied; GitLab source integration.

SDK operations: `create`.

### [GitlabImport](docs/api/gitlab_import.html)

Results: Success; GitLab source integration.

SDK operations: `create`.

### [GitlabOauth](docs/api/gitlab_oauth.html)

Results: Success.

SDK operations: `load`.

### [GrantAllAgent](docs/api/grant_all_agent.html)

Results: Owner-scoped product grant metadata; execution remains unavailable.

SDK operations: `create`.

### [HostingAppDomain](docs/api/hosting_app_domain.html)

Results: Updated app domain; App domain created; Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [IdentityOrganization](docs/api/identity_organization.html)

Results: Success.

SDK operations: `load`.

### [ImageRepository](docs/api/image_repository.html)

A container image repository in the organization&#39;s registry: list or create one.

Results: Image repository created; Image repositories for an organization.

SDK operations: `create`, `list`.

### [ImageRepositoryTag](docs/api/image_repository_tag.html)

Results: Image repository tags.

SDK operations: `list`.

### [ImportBranchPolicy](docs/api/import_branch_policy.html)

Results: Organization settings page (organization summary plus import branch policy); Updated organization import branch policy; Success.

SDK operations: `load`, `patch`, `update`.

Key fields to recognise:

- `dedicated_outbound_ip_addresses`: Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled.

### [Integration](docs/api/integration.html)

Results: VerificationIntegrations.

SDK operations: `load`.

### [InteractionResponse](docs/api/interaction_response.html)

Results: Previously accepted durable response receipt; no effects repeated; New response durably accepted; continuation delivery is pending.

SDK operations: `create`.

Key fields to recognise:

- `conversation_id`: Explicit conversation identity, including an agent-scoped native session alias.

### [Invitation](docs/api/invitation.html)

Invitations to join an organization: list, send or withdraw one.

Results: Organization invitation; Organization invitations page (organization summary plus invitations); Success; Organization invitation revoked.

SDK operations: `create`, `list`, `remove`.

### [InvocationControl](docs/api/invocation_control.html)

Results: Device-key authorization response.

SDK operations: `create`.

### [JobLogChunk](docs/api/job_log_chunk.html)

Results: Success; CI job log chunks.

SDK operations: `create`, `list`.

### [JobStep](docs/api/job_step.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `update`.

### [JobWorkspace](docs/api/job_workspace.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `update`.

### [JourneyVariantReplay](docs/api/journey_variant_replay.html)

Results: Reviewed replay request; existing Run approval remains required.

SDK operations: `create`.

### [Knowledge](docs/api/knowledge.html)

Results: Document saved; Markdown document and viewer permissions; Project selection and most recent 50 matching knowledge documents; Markdown document saved; Success; Document archived.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `id`: Public id used in the dream&#39;s URL

### [Known](docs/api/known.html)

Results: Generic pinned Relaycast message profile, without live connection data.

SDK operations: `load`.

### [Label](docs/api/label.html)

Results: Organization change labels.

SDK operations: `list`.

Key fields to recognise:

- `name`: Display name
- `slug`: Normalized identity used for filtering and lookup.

### [LeaseArtifact](docs/api/lease_artifact.html)

Results: Success.

SDK operations: `create`.

### [LeaseCache](docs/api/lease_cache.html)

Results: Success.

SDK operations: `create`.

### [LeaseLogChunk](docs/api/lease_log_chunk.html)

Results: Success.

SDK operations: `create`.

### [LeaseReconciliation](docs/api/lease_reconciliation.html)

Results: Success.

SDK operations: `create`.

### [LeaseStep](docs/api/lease_step.html)

Results: Success.

SDK operations: `update`.

### [LeaseVerifyDiagnostic](docs/api/lease_verify_diagnostic.html)

Results: Success; Browser diagnostics checkpoint accepted.

SDK operations: `create`.

Key fields to recognise:

- `live_view`: The tester&#39;s read-only live stream for page viewers.

### [LeaseVerifySecret](docs/api/lease_verify_secret.html)

Results: Success.

SDK operations: `create`.

### [LeaseWorkspace](docs/api/lease_workspace.html)

Results: Success.

SDK operations: `update`.

### [LocalAgentDecision](docs/api/local_agent_decision.html)

Results: The provider&#39;s native Decisions answer.

SDK operations: `create`.

Key fields to recognise:

- `request`: A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only

### [LocalAgentResponse](docs/api/local_agent_response.html)

Results: The provider&#39;s Responses event stream, unchanged. Usage from its terminal event is recorded for the organization.

SDK operations: `create`.

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

### [LogStreamChunk](docs/api/log_stream_chunk.html)

Results: Success.

SDK operations: `create`, `load`.

### [LogoImage](docs/api/logo_image.html)

Results: Organization.

SDK operations: `remove`, `update`.

Key fields to recognise:

- `activated_products`: Products this organization has activated (PRD 144). Activation is what makes a product&#39;s surfaces visible; it is neither permission nor entitlement.
- `agents_only`: Whether this organization uses the agents-only interface; older responses may omit this value.
- `can_activate_products`: Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.
- `shared_agent_personal_accounts_enabled`: Whether a shared agent may use one person&#39;s account for everyone who chats with it. Present only where agent integrations are on.
- `source_control_providers`: Connected source control providers for this organization. Missing values mean no providers are known.

### [MarketingSetting](docs/api/marketing_setting.html)

Results: Current homepage call-to-action mode.

SDK operations: `load`.

### [McpOauth](docs/api/mcp_oauth.html)

Results: Validated client callback URL; Success; Verified client request and accessible Verify organizations.

SDK operations: `create`, `load`.

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

### [MergeQueueEntry](docs/api/merge_queue_entry.html)

Results: Updated queue snapshot; Queue snapshot after idempotent enqueue; Queue snapshot after enqueue.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `analytics`: Queue performance for the reporting window. Present on queue reads only, mutation responses omit it rather than pay for a full window scan.
- `target_branches`: Bookmark names for the target picker. Present only on the queue-page read (`GET /vcs/merge_queues`); mutation snapshots omit it. Empty while jj-backend is degraded.

### [MergeRequest](docs/api/merge_request.html)

Results: PR verification response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `available_tests`: All active saved scenarios in the configured project, including scenarios outside the automatic selection.
- `branch`: Exact deployed source branch; refused if it differs from the canonical request branch.
- `current_run`: Latest verification request if it matches the current head and base, independent of history pagination.
- `github_repository`: GitHub owner/repository associated with this pull request.
- `head_sha`: If supplied, refuse to create a run unless this is the current PR head.

### [MergeResolution](docs/api/merge_resolution.html)

Results: Resolved file bytes, or resolved=false when the conflict is left intact.

SDK operations: `create`.

Key fields to recognise:

- `base`: Common ancestor file contents
- `context`: Optional surrounding files keyed by path
- `ours`: Current / left file contents
- `path`: Repository-relative path of the conflicted file
- `theirs`: Incoming / right file contents

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

SDK operations: `load`.

### [MetronomeWebhook](docs/api/metronome_webhook.html)

Results: Event stored; processing runs in a job.

SDK operations: `create`.

### [ModelSubscriptionAccount](docs/api/model_subscription_account.html)

Results: Your personal model subscription accounts; Success.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [ModelSubscriptionAccountConnection](docs/api/model_subscription_account_connection.html)

Results: Provider sign-in state.

SDK operations: `load`, `update`.

### [NetworkConnection](docs/api/network_connection.html)

Results: Success; Private network connection saved; Private network connection metadata without its secret.

SDK operations: `create`, `patch`, `update`.

### [NetworkingSpace](docs/api/networking_space.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [Node](docs/api/node.html)

Results: Organization nodes page contract.

SDK operations: `list`.

Key fields to recognise:

- `permission_entries`: GitHub&#39;s permission hash as a display-ready list, sorted by name.

### [NodeCertificate](docs/api/node_certificate.html)

Results: Success.

SDK operations: `create`.

### [NodeLease](docs/api/node_lease.html)

Results: Success.

SDK operations: `create`, `load`.

### [NomadAllocation](docs/api/nomad_allocation.html)

Results: Live Nomad allocation details.

SDK operations: `load`.

Key fields to recognise:

- `verify_runner_images`: Public Verify image pins from tasks in this allocation&#39;s attached job group, not current app settings. Empty when attached job metadata is unavailable. Other environment values are never returned; malformed pins are named in `invalid_keys` without their values. References and fingerprints are reported independently so callers can detect mismatches.

### [NomadLog](docs/api/nomad_log.html)

Results: Live Nomad task logs.

SDK operations: `load`.

### [Now](docs/api/now.html)

Results: Organization Now page contract.

SDK operations: `load`.

### [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ObservabilitySpace](docs/api/observability_space.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [Openapi](docs/api/openapi.html)

Results: Success.

SDK operations: `load`.

### [OrgInvitation](docs/api/org_invitation.html)

Results: Accepted organization invitation; Organization invitation and sign-in setup.

SDK operations: `create`, `load`.

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

### [OrganizationApp](docs/api/organization_app.html)

Results: Team app catalog or agent context; Success.

SDK operations: `load`, `remove`, `update`.

### [OrganizationControl](docs/api/organization_control.html)

Results: Current authorized local agent control result.

SDK operations: `create`.

### [OrganizationDevice](docs/api/organization_device.html)

Results: Current authorized local agent control result.

SDK operations: `create`.

### [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [OrganizationInteraction](docs/api/organization_interaction.html)

Results: Success.

SDK operations: `create`.

### [OrganizationInvitation](docs/api/organization_invitation.html)

Results: Success; Invitation URL and queued email delivery status.

SDK operations: `create`, `remove`.

### [OrganizationMessageFile](docs/api/organization_message_file.html)

Results: Success.

SDK operations: `create`.

### [OrganizationOidcTrust](docs/api/organization_oidc_trust.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [OrganizationRunEvent](docs/api/organization_run_event.html)

Results: Success.

SDK operations: `create`.

### [OrganizationRunOutcome](docs/api/organization_run_outcome.html)

Results: Success.

SDK operations: `create`.

### [OrganizationRunUsage](docs/api/organization_run_usage.html)

Results: Success.

SDK operations: `create`.

### [OrganizationSandbox](docs/api/organization_sandbox.html)

Results: Success.

SDK operations: `create`.

### [OrganizationSecret](docs/api/organization_secret.html)

Results: Success; Updated organization secret metadata; Created organization secret metadata; Organization secrets page (organization summary plus secret metadata); Organization secret deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [OrganizationServiceAccount](docs/api/organization_service_account.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [OrganizationSetting](docs/api/organization_setting.html)

Results: Success.

SDK operations: `update`.

### [OrganizationSite](docs/api/organization_site.html)

Results: Success.

SDK operations: `create`, `load`, `remove`, `update`.

### [OrganizationSubscription](docs/api/organization_subscription.html)

Results: Success.

SDK operations: `create`.

### [OrganizationTool](docs/api/organization_tool.html)

Results: Provider tool result.

SDK operations: `create`.

### [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [OtelIngest](docs/api/otel_ingest.html)

Results: Short-lived organization identity for the managed OTLP gateway.

SDK operations: `create`.

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

SDK operations: `create`, `load`.

Key fields to recognise:

- `repository_choices`: Empty compatibility field. Use the agent&#39;s clawder/repositories endpoint.
- `runtime_versions`: Runtime choices authorized for this organization.

### [PageArtefact](docs/api/page_artefact.html)

Results: Authorized private Artefacts page.

SDK operations: `list`, `load`.

Key fields to recognise:

- `document_key`: Stable document identity shared by all revisions.
- `draft`: The autosaved working copy of the newest Markdown version; null for older versions and other files.
- `id`: The anchor key.

### [PageCiPipelineRun](docs/api/page_ci_pipeline_run.html)

Results: CI action run page contract.

SDK operations: `load`.

### [PageProjectRun](docs/api/page_project_run.html)

Results: Run browser page.

SDK operations: `load`.

Key fields to recognise:

- `fix_scenario_count`: How many scenarios the agent handoff covers, including those on other pages.
- `fix_scenarios`: The fixable scenarios an agent handoff covers. With an open browser, only that scenario; otherwise the fixable scenarios on this page.

### [PageRepoVcCommit](docs/api/page_repo_vc_commit.html)

Results: Commit metadata and the path serving its file diff.

SDK operations: `load`.

Key fields to recognise:

- `diff_path`: Fingerprinted path serving this commit range&#39;s file diff. Rails builds it; fetch it as given rather than assembling one.

### [PagesBilling](docs/api/pages_billing.html)

Results: Billing page.

SDK operations: `load`.

Key fields to recognise:

- `breakdown`: The 24-hour live series with its provenance; null only when the rollup fallback itself failed.
- `extra_spend_enabled`: Organization consent to paid overages across all metered usage.
- `feature_enabled`: Whether the `billing` feature is on for this organization. False renders the page as not enabled, with no Subscribe action.
- `preview`: Metronome draft invoice and credits, or null.

### [PagesGithubOnboarding](docs/api/pages_github_onboarding.html)

Results: Organization GitHub onboarding page contract.

SDK operations: `load`.

### [PagesMember](docs/api/pages_member.html)

Results: Organization team page (members plus invitations for admins and owners).

SDK operations: `list`.

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

- `attention`: What needs an operator&#39;s eye, problems before notices
- `credential_id`: The credential this persona signs in with. Without one, a run chooses from the project&#39;s credentials.

### [PagesProjectRun](docs/api/pages_project_run.html)

Results: ProjectRunsPage.

SDK operations: `list`.

### [PagesProjectScenario](docs/api/pages_project_scenario.html)

Results: ProjectScenariosPage.

SDK operations: `list`.

### [PagesRegistry](docs/api/pages_registry.html)

Results: Organization registry page contract.

SDK operations: `load`.

### [PagesSession](docs/api/pages_session.html)

Results: Composed transcript search page; Organization sessions page contract; Fullscreen session detail page contract.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `harness`: Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope&#39;s harness when recorded, else the adapter&#39;s canonical harness.
- `last_activity_at`: When the session last did anything: the newest checkpoint capture, else the session end, else its start.
- `session`: Identical serialization to the org sessions page&#39;s expanded session, so the web reuses one session-detail builder. Jump-to data lives in `markers`, not on these checkpoints.

### [Pairing](docs/api/pairing.html)

Results: Success.

SDK operations: `create`, `load`.

### [PairingEvent](docs/api/pairing_event.html)

Results: Success.

SDK operations: `load`.

### [ParallelV1](docs/api/parallel_v1.html)

Results: Parallel&#39;s extract response, unchanged; Parallel&#39;s search response, unchanged.

SDK operations: `create`.

### [PatchsetDiff](docs/api/patchset_diff.html)

Results: One patchset and its stored file diffs.

SDK operations: `load`.

### [PersonalAccessToken](docs/api/personal_access_token.html)

The calling user&#39;s personal access tokens: list, create or revoke one.

Results: Success.

SDK operations: `create`, `load`, `remove`.

### [PreviewOperation](docs/api/preview_operation.html)

Results: Success.

SDK operations: `load`.

### [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html)

Results: Success.

SDK operations: `create`, `load`, `remove`.

### [PreviewSecret](docs/api/preview_secret.html)

Results: Success; New preview-owned secret version; Preview-owned secret created.

SDK operations: `create`, `remove`.

### [PreviewSharingApproval](docs/api/preview_sharing_approval.html)

Results: Success; Sharing selections and available metadata without values.

SDK operations: `create`, `load`.

### [ProactiveAgentWaitlistEntry](docs/api/proactive_agent_waitlist_entry.html)

Results: The email was already on the waitlist; its current place.; Joined (or silently discarded as spam).; The entry&#39;s current place.

SDK operations: `create`, `load`.

Key fields to recognise:

- `first_task`: The first job they would hand an agent.
- `invite_code`: The referral code of the invite link they arrived through.
- `places_per_referral`: Most places one referral moves the entry up; fewer when boosted entries are ahead.
- `position`: 1-based place in the queue.
- `position_after_next_referral`: The place one more referral would give this entry, as Rails would assign it.

### [Product](docs/api/product.html)

Results: Organization.

SDK operations: `create`.

Key fields to recognise:

- `activated_products`: Products this organization has activated (PRD 144). Activation is what makes a product&#39;s surfaces visible; it is neither permission nor entitlement.
- `agents_only`: Whether this organization uses the agents-only interface; older responses may omit this value.
- `can_activate_products`: Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.
- `shared_agent_personal_accounts_enabled`: Whether a shared agent may use one person&#39;s account for everyone who chats with it. Present only where agent integrations are on.
- `source_control_providers`: Connected source control providers for this organization. Missing values mean no providers are known.

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

SDK operations: `load`.

Key fields to recognise:

- `scenario_states`: Scenarios by the state of their latest execution. Timeouts count as failing.

### [ProjectScenarioRow](docs/api/project_scenario_row.html)

Results: ProjectScenarioRowsPage.

SDK operations: `list`.

### [ProjectSetting](docs/api/project_setting.html)

Results: ProjectSettingsPage.

SDK operations: `load`.

### [PullRequest](docs/api/pull_request.html)

Results: Success; Demo share link; PR verification response; Revoked.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `available_tests`: All active saved scenarios in the configured project, including scenarios outside the automatic selection.
- `branch`: Exact deployed source branch; refused if it differs from the canonical request branch.
- `cleanup_only`: Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing.
- `current_run`: Latest verification request if it matches the current head and base, independent of history pagination.
- `head_sha`: If supplied, refuse to create a run unless this is the current PR head.

### [PullRequestAction](docs/api/pull_request_action.html)

Results: GitHub review response.

SDK operations: `create`.

### [PullRequestMagicMerge](docs/api/pull_request_magic_merge.html)

Results: The exact merge commit was applied and read back; The exact candidate was applied and read back; A clean candidate was published privately.

SDK operations: `create`.

### [PullRequestSetting](docs/api/pull_request_setting.html)

Results: PR verification response; What was found on recent requests.

SDK operations: `create`, `load`.

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

### [PullRequestTranscript](docs/api/pull_request_transcript.html)

Results: Pull request agent transcripts page contract.

SDK operations: `list`.

Key fields to recognise:

- `harness`: Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope&#39;s harness when recorded, else the adapter&#39;s canonical harness.
- `last_activity_at`: When the session last did anything: the newest checkpoint capture, else the session end, else its start.

### [PullZone](docs/api/pull_zone.html)

Results: Organization pull zones and the selected app&#39;s CDN configuration.

SDK operations: `list`.

### [Recorder](docs/api/recorder.html)

Results: Recorder setup.

SDK operations: `load`.

### [Registry](docs/api/registry.html)

Results: Success.

SDK operations: `load`.

### [RegistryV2](docs/api/registry_v2.html)

Results: Success.

SDK operations: `create`.

### [RelayAgentConnection](docs/api/relay_agent_connection.html)

Results: Current owner connection result.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `credential`: Write-only outbound key.

### [RelayAgentLocalThread](docs/api/relay_agent_local_thread.html)

Results: Relay authorization disconnected.

SDK operations: `remove`.

### [RelaySignal](docs/api/relay_signal.html)

Results: Success.

SDK operations: `create`.

### [ReleaseRollout](docs/api/release_rollout.html)

Results: Success.

SDK operations: `create`, `load`.

### [Repo](docs/api/repo.html)

Results: Paginated workspace Repo inventory; Repository access page contract; Git source availability and refresh capability; Success; Repository deleted.

SDK operations: `list`, `load`, `remove`.

Key fields to recognise:

- `can_retry_import`: True when a failed client import can be requeued for CLI resume.
- `can_retry_sync`: True when the latest sync run failed and can be retried.
- `federated_in_home`: True when this Space is a folder virtual repository inside the organization Home monorepo. False for Home itself and for standalone physical companions.
- `id`: Virtual repository public ID for non-Home rows; Home uses the physical repository public ID.
- `root_path`: Home-relative folder path when `federated_in_home` is true; null otherwise.

### [RepoAccessToken](docs/api/repo_access_token.html)

Results: Created repository access token; Manual repository access tokens; Success; Repository access token revoked.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `credential_purpose`: Issues a revocable read-write system credential valid for one hour.

### [RepoAction](docs/api/repo_action.html)

Results: Actions page contract.

SDK operations: `list`.

### [RepoAgentCheckpoint](docs/api/repo_agent_checkpoint.html)

Results: Success.

SDK operations: `load`.

### [RepoAgentSession](docs/api/repo_agent_session.html)

Results: Success; A page of transcript events, newest-last within the page.; Transcript file attachment.; Without `chunk`: the transcript index state, when `state` is `ready` the `manifest` and the per-chunk `chunks` URLs are included, otherwise only `state`, `session_id`, and `checkpoint_id`. With `chunk`: that chunk object&#39;s raw JSON, zstd-encoded when the client accepts it.; The updated agent session.

SDK operations: `create`, `load`, `patch`, `update`.

### [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html)

Results: Success; Bookmark protection rule created; Bookmark protection evaluation; Bookmark protection rules; Bookmark protection rule; Bookmark protection rule updated; Bookmark protection rule deleted.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [RepoBookmarkProtectionEvent](docs/api/repo_bookmark_protection_event.html)

Results: Recent bookmark protection events.

SDK operations: `list`.

### [RepoCloudWorkspaceBackup](docs/api/repo_cloud_workspace_backup.html)

Results: Success.

SDK operations: `create`, `load`.

### [RepoCodeRule](docs/api/repo_code_rule.html)

Results: Success; The rule after the operation; Code rules for the Repo; The deleted rule identity and its canonical Repo.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `draft_pending`: The latest revision is not the active one
- `name`: Name of the latest revision
- `slug`: Canonical Repo slug
- `state_version`: Send back as `expected_version` on every mutation

### [RepoSetting](docs/api/repo_setting.html)

Results: Physical Git repository settings snapshot; Repository metadata updated; Default Change land method updated; Repository MagicMerge mode updated; Repository trunk updated.

SDK operations: `list`, `update`.

### [RepoStat](docs/api/repo_stat.html)

Results: Repository statistics snapshot with a downsampled history series.

SDK operations: `create`, `list`.

### [RepoVc](docs/api/repo_vc.html)

Results: Success; Bookmark merge result; Per line file blame; Materialized trunk snapshot without repository history or VCS metadata; Current policy and GitHub-primary eligibility; Trunk tip summary; Updated policy.

SDK operations: `create`, `load`, `update`.

### [RepoVcCommit](docs/api/repo_vc_commit.html)

Results: First parent commit history.

SDK operations: `list`.

### [ReportReplay](docs/api/report_replay.html)

Results: Recording groups and step timing for one cited tester.

SDK operations: `load`.

### [ReportScenario](docs/api/report_scenario.html)

Results: Compact report page; Scenario authoring queued; poll the compact report page.

SDK operations: `create`.

### [RepositoryAccess](docs/api/repository_access.html)

Results: Success; Physical Git repositories accessible to the authenticated user.

SDK operations: `create`, `load`.

### [RepositoryAccessResolve](docs/api/repository_access_resolve.html)

Results: Exact physical repository address and access contract.

SDK operations: `load`.

### [RepositoryEvent](docs/api/repository_event.html)

Results: Success.

SDK operations: `create`.

### [RepositoryImport](docs/api/repository_import.html)

Results: Connected source accounts for repository import.

SDK operations: `load`.

### [RepositoryImportSession](docs/api/repository_import_session.html)

Results: Success; One-time GitHub App installation continuation URL. Never contains API bearer credentials.; Repository import session.

SDK operations: `create`, `load`.

### [RepositoryImportSessionRepository](docs/api/repository_import_session_repository.html)

Results: Session-scoped GitHub App repository inventory.

SDK operations: `list`.

### [RepositoryImportSessionSelection](docs/api/repository_import_session_selection.html)

Results: Success; Repository import session.

SDK operations: `create`.

### [RepositorySandboxEnvironment](docs/api/repository_sandbox_environment.html)

Results: Success.

SDK operations: `create`, `load`.

### [RoderCodeRepair](docs/api/roder_code_repair.html)

Results: Investigation launch record.

SDK operations: `create`, `load`.

### [RoderCodeRepairSetting](docs/api/roder_code_repair_setting.html)

Results: Internal automatic-intake settings.

SDK operations: `create`, `load`.

Key fields to recognise:

- `repository_slug`: Connected Composal repository required when enabling

### [RoderMachine](docs/api/roder_machine.html)

Results: Success.

SDK operations: `update`.

### [RoderRun](docs/api/roder_run.html)

Results: Activity batch accepted; Replay of an already received stack; the existing receipt; Stack received and composed; the receipt; The receipt is still composing in another request; The transcript is stored and attached; Success.

SDK operations: `create`.

### [RoderWorkspaceCredential](docs/api/roder_workspace_credential.html)

Results: Short-lived repository clone and user API credentials.

SDK operations: `create`.

Key fields to recognise:

- `api_token`: Short-lived personal access token for the spawning user. Installed into the sandbox CLI config so `vex` and API clients act as that user. The raw value is returned once and only its digest is stored.
- `repository_spec`: The explicitly selected physical repository address.
- `required_lifetime_seconds`: Lifetime the pending clone or command must be able to complete within.
- `token`: Short-lived read/write repository credential. The raw value is returned once and only its digest is stored.

### [RunArtifact](docs/api/run_artifact.html)

Results: Success.

SDK operations: `create`, `load`.

### [RunJob](docs/api/run_job.html)

Results: Success; CI job catalog.

SDK operations: `create`, `load`.

Key fields to recognise:

- `cache_archive_observations`: Bounded server response history; it does not confirm runner extraction or test-result reuse.

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

### [RunWorkspaceCredential](docs/api/run_workspace_credential.html)

Results: Success.

SDK operations: `create`.

### [RunnerLease](docs/api/runner_lease.html)

Results: Success.

SDK operations: `create`, `load`.

### [RunnerPoolNodeEnrollmentToken](docs/api/runner_pool_node_enrollment_token.html)

Results: CI node enrollment token; CI node enrollment tokens.

SDK operations: `create`, `list`.

### [RunnerPoolRunner](docs/api/runner_pool_runner.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `update`.

### [RuntimeInstanceHealthSnapshot](docs/api/runtime_instance_health_snapshot.html)

Results: Success.

SDK operations: `create`, `load`.

### [SandboxIntegration](docs/api/sandbox_integration.html)

Results: Sandbox configuration.

SDK operations: `create`, `load`, `patch`, `update`.

Key fields to recognise:

- `connected_profiles`: Connected profiles per provider across the organization. A provider whose profiles are all disconnected maps to 0; one without profiles is absent.

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

### [SecretGrant](docs/api/secret_grant.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SecretVersion](docs/api/secret_version.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [ServiceEndpoint](docs/api/service_endpoint.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [Setting](docs/api/setting.html)

Results: Organization settings page (organization summary plus import branch policy).

SDK operations: `load`.

Key fields to recognise:

- `dedicated_outbound_ip_addresses`: Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled.

### [SettingMutationLease](docs/api/setting_mutation_lease.html)

Results: Mutation lease cleared and the previous holder fenced off.

SDK operations: `create`.

### [Signal](docs/api/signal.html)

Results: The acked signal.; The number of signals newly acked.; Success; A page of signals, ordered by the id cursor.; The signal, with its additive resource envelopes.; The agent prompt text.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `acked_by`: Who acked the signal, read from `acked_by_user_id`. Always present so it reads as a pair with `acked_at`: null while unacked, and null for an ack recorded without a user (a bulk ack from a token-authed caller).
- `agent_runs`: Dispatched-run summary (docs §6c). Present only once a signal has at least one `SignalAgentRun`, of either origin.
- `attribution`: The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need, for example vex-web building its own UI routes, without reading the per-kind JSON. Always present; each key is null when the producer did not know it.
- `created_at`: ISO8601 row insert time, retention math and debugging only.
- `id`: The signal&#39;s own `sig_…` public id, also the paging cursor value.

### [SignalInbound](docs/api/signal_inbound.html)

Results: Success; Recorded. `state` is `pending` for an event that will become a signal and `ignored` for one the adapter recognizes and does not act on (a provider test ping, an installation notice).

SDK operations: `update`.

### [SignalIntegration](docs/api/signal_integration.html)

Results: The signal integration; The organization&#39;s signal integrations; Success; The integration and its targets.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `api_token`: Optional provider API token for target discovery and backfill.
- `id`: Public id (`sint_…`).
- `inbound_url`: The absolute URL to paste into the provider&#39;s webhook configuration.
- `mode`: `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.
- `rejected_signature_count`: Deliveries rejected for a bad or missing signature.

### [SignalIntegrationDelivery](docs/api/signal_integration_delivery.html)

Results: The integration&#39;s recent deliveries.

SDK operations: `list`.

Key fields to recognise:

- `delivery_id`: The provider&#39;s delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none.
- `id`: Public id (`sdel_…`).
- `ops_signal_id`: Public id (`sig_…`) of the signal this delivery emitted.

### [SignalIntegrationTarget](docs/api/signal_integration_target.html)

Results: The integration&#39;s targets.

SDK operations: `list`, `update`.

Key fields to recognise:

- `id`: Public id (`stgt_…`).

### [SignalSubscription](docs/api/signal_subscription.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [Site](docs/api/site.html)

Results: Organization Sites page contract. `domains` and `deployments` belong to `selected_site_id`, which names one of `sites`.

SDK operations: `list`.

### [SiteAccessKey](docs/api/site_access_key.html)

Results: Success.

SDK operations: `create`, `load`, `remove`.

### [SitePreview](docs/api/site_preview.html)

Results: What the site calls itself, and its icon.

SDK operations: `load`.

Key fields to recognise:

- `icon_data_url`: The site&#39;s icon as a data: URL, up to 256 KB
- `url`: The address as it will be saved

### [SiteSecret](docs/api/site_secret.html)

Results: Success.

SDK operations: `remove`, `update`.

### [SlackChannel](docs/api/slack_channel.html)

Results: Channels visible to this agent bot, with Slack pagination.

SDK operations: `list`.

### [SourceConnection](docs/api/source_connection.html)

Results: Success; Source refresh queued.

SDK operations: `create`.

### [SpaceAlertRule](docs/api/space_alert_rule.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceAuditEvent](docs/api/space_audit_event.html)

Results: Success.

SDK operations: `create`, `load`.

### [SpaceDnsRecord](docs/api/space_dns_record.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceEnrollmentToken](docs/api/space_enrollment_token.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceGateway](docs/api/space_gateway.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceGroup](docs/api/space_group.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceGroupMembership](docs/api/space_group_membership.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceLogStream](docs/api/space_log_stream.html)

Results: Success.

SDK operations: `create`, `load`.

### [SpaceMetricSery](docs/api/space_metric_sery.html)

Results: Success.

SDK operations: `create`, `load`.

### [SpaceOtelCollector](docs/api/space_otel_collector.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpacePeer](docs/api/space_peer.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpacePeerAttachment](docs/api/space_peer_attachment.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpacePolicy](docs/api/space_policy.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceSegment](docs/api/space_segment.html)

Results: Success.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### [SpaceTraceSpan](docs/api/space_trace_span.html)

Results: Success.

SDK operations: `create`, `load`.

### [Spark](docs/api/spark.html)

Results: Organization; JSON-RPC result or error; tool failures have isError true in the result; Notification accepted; The first Spark, GitHub status and starting credit.

SDK operations: `create`, `load`.

Key fields to recognise:

- `activated_products`: Products this organization has activated (PRD 144). Activation is what makes a product&#39;s surfaces visible; it is neither permission nor entitlement.
- `agents_only`: Whether this organization uses the agents-only interface; older responses may omit this value.
- `can_activate_products`: Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.
- `compute_credit_cents`: Included compute the workspace started Sparks with, when it is on compute billing.
- `credit_cents`: Inference credit the workspace started Sparks with.

### [SparkAgentIntegration](docs/api/spark_agent_integration.html)

Results: Organization accounts available to this V2 agent.

SDK operations: `create`, `load`.

Key fields to recognise:

- `account_counts`: Accounts the viewer can see per toolkit, across all account pages.
- `accounts_path`: Web path of the organization&#39;s Integrations page, where people reconnect and remove the accounts this agent lists. Add `integrations_q` to show one app.
- `added_toolkits`: Apps with a connected or connecting account the viewer can see. The Apps panel lists them among the agent&#39;s accounts rather than as apps to add.
- `can_manage`: Only the owner may connect, configure or disconnect it.
- `connect_as`: The account Connect creates and switches on for this agent: the owner&#39;s own (personal) or, for an admin connecting someone else&#39;s agent, the team&#39;s (organization). Null when the viewer cannot connect apps here.

### [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html)

Results: Authorized native session adoption receipt; Authorized local coding-agent thread; Original requester-scoped Relay delivery consent; Current authorized native task result receipts.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `archived`: Archived in the provider&#39;s own list, or null when the helper did not report it (some reads). threads.list includes archived threads only with `include_archived`.
- `can_archive`: This requester can archive or restore it, and the computer&#39;s Desktop supports archiving.
- `delivery`: Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.
- `diagnostic_code`: Approved product error code retained after copied diagnostics expire. Absent for success, unknown codes and older cleared receipts; it does not reconcile uncertain delivery.
- `full_title`: The native name or first prompt in full, for a tooltip.

### [SparkAgentSite](docs/api/spark_agent_site.html)

Results: Agent sidebar response.

SDK operations: `list`.

Key fields to recognise:

- `https`: Whether the organization&#39;s certificate serves this site over HTTPS

### [SparkAgentSkill](docs/api/spark_agent_skill.html)

Results: Agent configuration; Managed skill settings accepted for a replacement runtime revision. The catalog remains the last observed native state until qualification.

SDK operations: `create`, `list`.

Key fields to recognise:

- `configuration_state`: The requested managed skill selection is awaiting runtime qualification.

### [SparkAgentThread](docs/api/spark_agent_thread.html)

Results: Thread archive state confirmed; history is retained; Native agent lifecycle response; Snooze confirmed by the runtime. New activity in the thread also wakes it.

SDK operations: `create`, `list`.

Key fields to recognise:

- `archived`: Archived on its computer: hidden from the active list and shown with the archived threads.
- `attention`: Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish.
- `can_archive`: This requester can archive or restore it, and the computer&#39;s Desktop supports archiving.
- `coordination_status`: Durable work not represented by a native run: a queued input or an outstanding thread report.
- `execution`: `device_folder` threads also report state and path; sandbox threads run on their own machine with the coding agent in harness.

### [SparkCredit](docs/api/spark_credit.html)

Results: Success; Hosted Stripe session; SparkCredits billing summary; Current-month daily Spark usage in UTC; Updated SparkCredits billing summary.

SDK operations: `create`, `load`, `patch`, `update`.

Key fields to recognise:

- `amount_cents`: Cash price in USD cents.
- `billing_unit`: Compute minute quote version returned by the billing summary.
- `quoted_credits_cents`: Grant shown for a top-up or subscription, in usage cents.
- `quoted_price_cents`: Monthly cash price shown for a subscription, in USD cents.
- `top_up_max_cents`: Maximum manual top-up, in USD cents.

### [SparkCreditAgentUsage](docs/api/spark_credit_agent_usage.html)

Results: Daily inference cost and compute minutes for one agent.

SDK operations: `load`.

### [SparkCreditUsageTotal](docs/api/spark_credit_usage_total.html)

Results: Month-to-date totals.

SDK operations: `load`.

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

### [StatusChange](docs/api/status_change.html)

Results: CI status for a change.

SDK operations: `load`.

### [StatusCommit](docs/api/status_commit.html)

Results: CI status for a commit.

SDK operations: `load`.

### [StatusPatchset](docs/api/status_patchset.html)

Results: CI status for a patchset.

SDK operations: `load`.

### [StripeWebhook](docs/api/stripe_webhook.html)

Results: Event stored; processing runs in a job.

SDK operations: `create`.

### [SubmitTelemetry](docs/api/submit_telemetry.html)

Results: Success.

SDK operations: `create`.

### [SubscriptionModel](docs/api/subscription_model.html)

Results: Account model catalog.

SDK operations: `list`.

Key fields to recognise:

- `reasoning`: Effort levels this plan model accepts.
- `speeds`: Speed modes advertised by this connected account and model. Missing metadata enables Standard only.

### [SwarmEvent](docs/api/swarm_event.html)

Results: The swarm&#39;s decision log, oldest first.

SDK operations: `list`.

### [SwarmLive](docs/api/swarm_live.html)

Results: One page of the stored stream, activity and scheduler events interleaved by time.

SDK operations: `load`.

### [SwarmNote](docs/api/swarm_note.html)

Results: Success; The note as a live feed event.

SDK operations: `create`.

Key fields to recognise:

- `task_id`: A task public id; omitted

### [SwarmTask](docs/api/swarm_task.html)

Results: Agent swarm tasks; The task, its activity page and its events.

SDK operations: `list`, `load`.

### [TaskLease](docs/api/task_lease.html)

Results: Bounded browser decision evaluation result; A UTF-8 page from the exact returned commit; reference data, not current-build evidence; Success; Learning report stored with the ScenarioRun; Sign-in report recorded; Detached Roder result accepted or validated; Bounded history from the active Discovery lease scope; candidate paths require fresh replay.

SDK operations: `create`.

### [ThreadPreview](docs/api/thread_preview.html)

Results: Private preview URL.

SDK operations: `create`.

### [ThreadPreviewAccess](docs/api/thread_preview_access.html)

Results: Viewer session token for the preview&#39;s host-only cookie; Token to send as X-Blaxel-Preview-Token until it expires.

SDK operations: `create`, `load`.

### [ToolFeedback](docs/api/tool_feedback.html)

Results: Success; Feedback saved, including on an identical retry. Does not confirm Slack delivery.; Saved feedback.

SDK operations: `create`, `load`.

Key fields to recognise:

- `metadata`: Caller-supplied session context; no secrets or transcripts

### [Transcript](docs/api/transcript.html)

Results: Bounded ranked session window and indexing coverage; A bounded page of associated conversations, including an empty known target.; Indexed events or an explicit content availability state.

SDK operations: `create`, `list`, `load`.

### [V1Message](docs/api/v1_message.html)

Results: Success.

SDK operations: `create`.

### [VcBranch](docs/api/vc_branch.html)

Results: Success; Repository bookmarks; Bookmark deleted.

SDK operations: `create`, `list`, `remove`.

### [VcBrowser](docs/api/vc_browser.html)

Results: Selected repository browser file; Repository browser tree.

SDK operations: `load`.

### [VcChange](docs/api/vc_change.html)

Results: Abandoned change and any directly orphaned changes; Recorded vote. Reread the change page for its updated state.; The absorbing change with its new patchset, the folded change, and the changes reparented onto the absorber. For `dry_run`, the plan.; Success; Current per-change GitHub projection state; Change marked ready; Existing retries for this request; A stateless answer. Accept text/event-stream for start, delta (text), done, and error (message) SSE events.; Created or updated change outcomes; Git revision anchors are awaiting durable publication; no review was created; Created or updated Change; One page of change summaries, plus status counts for the whole filtered scope; Selected comparison, picker options, and persisted diff files; Resolved Git revision, target, and observed review lease; Change detail, canonical product path, relation chain, target state, sync preview, and landing closure; Current checks, timing history, and retryable runs; Uncached accepted revision metadata without backend or review-page reads; Ordered known and missing JJ change identities, or the canonical first change for a legacy stack; Detailed canonical change.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `landing`: Compact landing state for the Stack CLI.
- `title`: Short server-owned requirement heading.

### [VcChangeGroup](docs/api/vc_change_group.html)

Results: Success; Created explicit change group; Repository-scoped change groups.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `name`: Display name

### [VcFile](docs/api/vc_file.html)

Results: Flat repository file index.

SDK operations: `list`.

### [VcMergeQueue](docs/api/vc_merge_queue.html)

Results: Updated queue snapshot; Merge queue snapshot with target picker bookmarks; Merge queue snapshot.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `analytics`: Queue performance for the reporting window. Present on queue reads only, mutation responses omit it rather than pay for a full window scan.
- `target_branches`: Bookmark names for the target picker. Present only on the queue-page read (`GET /vcs/merge_queues`); mutation snapshots omit it. Empty while jj-backend is degraded.

### [VcStack](docs/api/vc_stack.html)

Results: Active stacks with their member changes ordered from tip to root; Active stack with member changes ordered from tip to root; The renamed active stack.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `landing`: Compact landing state for the Stack CLI.
- `name`: Display name

### [VcsNode](docs/api/vcs_node.html)

Results: Organization nodes page contract.

SDK operations: `list`.

Key fields to recognise:

- `permission_entries`: GitHub&#39;s permission hash as a display-ready list, sorted by name.

### [VcsSetting](docs/api/vcs_setting.html)

Results: Organization settings page (organization summary plus import branch policy).

SDK operations: `load`.

Key fields to recognise:

- `dedicated_outbound_ip_addresses`: Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled.

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

### [VerifyEmailVerification](docs/api/verify_email_verification.html)

Results: Success.

SDK operations: `load`.

### [VerifySignalIntegration](docs/api/verify_signal_integration.html)

Results: The signal integration.

SDK operations: `create`.

Key fields to recognise:

- `id`: Public id (`sint_…`).
- `inbound_url`: The absolute URL to paste into the provider&#39;s webhook configuration.
- `mode`: `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.
- `rejected_signature_count`: Deliveries rejected for a bad or missing signature.
- `unmapped_delivery_count`: Deliveries accepted whose provider resource matched no enabled target.

### [VerifyStaticSiteDomain](docs/api/verify_static_site_domain.html)

Results: Updated static site domain.

SDK operations: `create`.

### [VersionLog](docs/api/version_log.html)

Results: Safe project-scoped binary response.

SDK operations: `list`.

### [WaitlistApplication](docs/api/waitlist_application.html)

Results: Continue account creation, with the invite code saved in the browser session when supplied.

SDK operations: `create`.

### [WebBotAuth](docs/api/web_bot_auth.html)

Results: Distinct signatures for the authorized HTTPS origin.

SDK operations: `create`.

### [WebhookGitlab](docs/api/webhook_gitlab.html)

Results: Success.

SDK operations: `update`.

### [WorkflowRunStep](docs/api/workflow_run_step.html)

Results: The step&#39;s full recorded output.

SDK operations: `load`.

### [WorkflowRunStopNotice](docs/api/workflow_run_stop_notice.html)

Results: The viewer&#39;s notice that this run stopped is put away; one already put away or resolved stays as it is.

SDK operations: `create`.

### [WorkflowTriggerSkipped](docs/api/workflow_trigger_skipped.html)

Results: The started run.

SDK operations: `create`.

### [WorkspaceActivity](docs/api/workspace_activity.html)

Results: Sidebar Workspace Activity page contract.

SDK operations: `load`.

### [WorkspaceActivityNotification](docs/api/workspace_activity_notification.html)

Results: The updated Workspace Activity page after the dismissal.

SDK operations: `update`.

### [WorkspaceSpace](docs/api/workspace_space.html)

Results: Created workspace space; Workspace spaces visible to the current member; Workspace space.

SDK operations: `create`, `list`, `load`.

### [WorkspaceSpacePreference](docs/api/workspace_space_preference.html)

Results: Updated workspace space preferences.

SDK operations: `update`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [A2aWellKnown](docs/api/a2a_well_known.html) | `load` | `GET /api/v1/control/a2a/{connection_id}/.well-known/agent-card.json` | Not required |
| [AdminOrg](docs/api/admin_org.html) | `create` | `POST /api/v1/admin/organizations/{org_slug}/checkout_session` | Required |
| [AdminOrg](docs/api/admin_org.html) | `create` | `POST /api/v1/admin/organizations` | Required |
| [AdminOrg](docs/api/admin_org.html) | `load` | `GET /api/v1/admin/organizations/{org_slug}` | Required |
| [AdminOrg](docs/api/admin_org.html) | `load` | `GET /api/v1/admin/organizations` | Required |
| [AdminOrg](docs/api/admin_org.html) | `update` | `PUT /api/v1/admin/organizations/{org_slug}/billing_agreement` | Required |
| [AdminOrg](docs/api/admin_org.html) | `update` | `PATCH /api/v1/admin/organizations/{org_slug}/billing_contact` | Required |
| [AdminOrg](docs/api/admin_org.html) | `update` | `PUT /api/v1/admin/organizations/{org_slug}/package` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/marked_read` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/call_session` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/lifecycle` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/transcription_session` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/warm` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents` | Required |
| [Agent](docs/api/agent.html) | `create` | `POST /api/v1/agent/chat` | Required |
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
| [AgentApp](docs/api/agent_app.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_apps/{id}/opened` | Required |
| [AgentApp](docs/api/agent_app.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_apps` | Required |
| [AgentApp](docs/api/agent_app.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_apps/{id}` | Required |
| [AgentAppInstall](docs/api/agent_app_install.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_apps/{id}/installs/{agent_id}` | Required |
| [AgentAppInstall](docs/api/agent_app_install.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agent_apps/{id}/installs/{agent_id}` | Required |
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
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/authorize` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/cancel_sign_in` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/complete` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/custom_mcp` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/delegate` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/reassign_custody` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_delegation` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_grant` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/safety_control` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/sync` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_connections` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_connections/{id}` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_connections/{id}/custody` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect_impact` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/agent_connections/{id}` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_connections/{id}` | Required |
| [AgentConnection](docs/api/agent_connection.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agent_connections/{id}` | Required |
| [AgentConnectionDelegation](docs/api/agent_connection_delegation.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_connections/{id}/delegations` | Required |
| [AgentConnectionGrant](docs/api/agent_connection_grant.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_connections/{id}/grants` | Required |
| [AgentConnectionResource](docs/api/agent_connection_resource.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{id}/resources` | Required |
| [AgentConnectionSafetyControl](docs/api/agent_connection_safety_control.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_connections/safety_controls` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/replace` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}` | Required |
| [AgentConnectionTriggerSubscription](docs/api/agent_connection_trigger_subscription.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}` | Required |
| [AgentContextCheckpoint](docs/api/agent_context_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/agent_context/checkpoints/{checkpoint_id}/transcript` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows` | Required |
| [AgentControlFlow](docs/api/agent_control_flow.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}` | Required |
| [AgentCoordination](docs/api/agent_coordination.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/stop` | Required |
| [AgentEmail](docs/api/agent_email.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}` | Required |
| [AgentEvent](docs/api/agent_event.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/events` | Required |
| [AgentFile](docs/api/agent_file.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/files/{file_id}` | Required |
| [AgentInput](docs/api/agent_input.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/inputs` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/authorize` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/cancel_sign_in` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/complete` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/custom_mcp` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/disconnect` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/sharing` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations/{id}/sync` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_integrations` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_integrations/{id}` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_integrations` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_integrations/catalog` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_integrations/github` | Required |
| [AgentIntegration](docs/api/agent_integration.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_integrations/{id}` | Required |
| [AgentIntegrationAccount](docs/api/agent_integration_account.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_integrations/accounts` | Required |
| [AgentIntegrationCallback](docs/api/agent_integration_callback.html) | `load` | `GET /api/v1/agent_integration_callback` | Not required |
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
| [AgentRelayFileGrant](docs/api/agent_relay_file_grant.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_relay_file_grants` | Required |
| [AgentRelayFileGrant](docs/api/agent_relay_file_grant.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_relay_file_grants` | Required |
| [AgentRelayFileGrant](docs/api/agent_relay_file_grant.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}` | Required |
| [AgentRelayFileGrant](docs/api/agent_relay_file_grant.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}` | Required |
| [AgentRelayFileGrantAccount](docs/api/agent_relay_file_grant_account.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_relay_file_grants/accounts` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment` | Required |
| [AgentRepository](docs/api/agent_repository.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories` | Required |
| [AgentResource](docs/api/agent_resource.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resources` | Required |
| [AgentRoder](docs/api/agent_roder.html) | `create` | `POST /api/v1/agent/roder/browser_executor_authorization` | Required |
| [AgentRoder](docs/api/agent_roder.html) | `create` | `POST /api/v1/agent/roder/session` | Required |
| [AgentRoder](docs/api/agent_roder.html) | `create` | `POST /api/v1/agent/roder/workspace_authorization` | Required |
| [AgentRoder](docs/api/agent_roder.html) | `load` | `GET /api/v1/agent/roder/browser_authorization` | Required |
| [AgentRoutine](docs/api/agent_routine.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/routines` | Required |
| [AgentRoutine](docs/api/agent_routine.html) | `update` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}` | Required |
| [AgentRun](docs/api/agent_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/runs/{run_id}` | Required |
| [AgentRuntime](docs/api/agent_runtime.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset` | Required |
| [AgentSession](docs/api/agent_session.html) | `load` | `GET /api/v1/agent_sessions/{session_id}/transcript` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/seal` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/download` | Required |
| [AgentSessionCheckpoint](docs/api/agent_session_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints` | Required |
| [AgentSessionRoderHandoff](docs/api/agent_session_roder_handoff.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs` | Required |
| [AgentSetting](docs/api/agent_setting.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/settings` | Required |
| [AgentSetting](docs/api/agent_setting.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/settings` | Required |
| [AgentSharing](docs/api/agent_sharing.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/sharing/review` | Required |
| [AgentSite](docs/api/agent_site.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_sites/{id}/opened` | Required |
| [AgentSite](docs/api/agent_site.html) | `list` | `GET /api/v1/organizations/{organization_id}/agent_sites` | Required |
| [AgentSite](docs/api/agent_site.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_sites/{id}` | Required |
| [AgentSite](docs/api/agent_site.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_sites/{id}/icon` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_skills` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `create` | `POST /api/v1/organizations/{organization_id}/agent_skills/preview` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_skills/{id}` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_skills/marketplace` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `load` | `GET /api/v1/organizations/{organization_id}/agent_skills` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agent_skills/{id}` | Required |
| [AgentSkill](docs/api/agent_skill.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience` | Required |
| [AgentSlack](docs/api/agent_slack.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/app` | Required |
| [AgentSlack](docs/api/agent_slack.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/as_you` | Required |
| [AgentSubagent](docs/api/agent_subagent.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subagents` | Required |
| [AgentSubscription](docs/api/agent_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions` | Required |
| [AgentSubscription](docs/api/agent_subscription.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `create` | `POST /api/v1/agent/swarms/{id}/cancel` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `create` | `POST /api/v1/agent/swarms` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `list` | `GET /api/v1/agent/swarms` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `load` | `GET /api/v1/agent/swarms/{id}` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `load` | `GET /api/v1/agent/swarms/{id}/live` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `load` | `GET /api/v1/agent/swarms/{id}/policy` | Required |
| [AgentSwarm](docs/api/agent_swarm.html) | `update` | `PATCH /api/v1/agent/swarms/{id}/policy` | Required |
| [AgentTeammate](docs/api/agent_teammate.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/teammates` | Required |
| [AgentTerminal](docs/api/agent_terminal.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/terminal/connect` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/agent/threads/{id}/archive` | Required |
| [AgentThread](docs/api/agent_thread.html) | `create` | `POST /api/v1/agent/threads` | Required |
| [AgentThread](docs/api/agent_thread.html) | `load` | `GET /api/v1/agent/threads/{id}` | Required |
| [AgentThread](docs/api/agent_thread.html) | `load` | `GET /api/v1/agent/threads` | Required |
| [AgentTool](docs/api/agent_tool.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools` | Required |
| [AgentUsage](docs/api/agent_usage.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/agent_usage` | Required |
| [AgentVerifyProject](docs/api/agent_verify_project.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects` | Required |
| [AgentVerifyProject](docs/api/agent_verify_project.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects` | Required |
| [AgentWait](docs/api/agent_wait.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/waits/{wait_id}/stop` | Required |
| [AgentWebPreview](docs/api/agent_web_preview.html) | `load` | `GET /api/v1/agent_web_previews` | Not required |
| [AgentWebhook](docs/api/agent_webhook.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks` | Required |
| [AgentWebhook](docs/api/agent_webhook.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}` | Required |
| [AgentWebhook](docs/api/agent_webhook.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}` | Required |
| [AgentWork](docs/api/agent_work.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/work/{work_id}/handled` | Required |
| [AgentWorkflow](docs/api/agent_workflow.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows` | Required |
| [AgentWorkflow](docs/api/agent_workflow.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows` | Required |
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
| [Agreement](docs/api/agreement.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/agreements` | Required |
| [AgreementAccessRequest](docs/api/agreement_access_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/agreement_access_request` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events` | Required |
| [AlertRuleEvent](docs/api/alert_rule_event.html) | `remove` | `DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}` | Required |
| [AllocationLog](docs/api/allocation_log.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs` | Required |
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
| [AppAccess](docs/api/app_access.html) | `load` | `GET /api/v1/app_access/callback` | Required |
| [AppAccess](docs/api/app_access.html) | `load` | `GET /api/v1/app_access/start` | Required |
| [AppAccessJwk](docs/api/app_access_jwk.html) | `load` | `GET /api/v1/app_access/jwks` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/pause` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/provision` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/purge` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/resume` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{id}/sync` | Required |
| [AppCdn](docs/api/app_cdn.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns` | Required |
| [AppCdn](docs/api/app_cdn.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns` | Required |
| [AppCdn](docs/api/app_cdn.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppCdn](docs/api/app_cdn.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/cdns/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables/{id}/disable` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables/{id}/rotate` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/config_variables` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/config_variables` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppConfigVariable](docs/api/app_config_variable.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/config_variables/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/restore` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/resume` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/data_resources` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDataResource](docs/api/app_data_resource.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}` | Required |
| [AppDeploy](docs/api/app_deploy.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deploys` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/fail` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments/{id}/succeed` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/deployments` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployments/{id}` | Required |
| [AppDeployment](docs/api/app_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployments` | Required |
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
| [AppEnvironment](docs/api/app_environment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/environments/{id}` | Required |
| [AppEnvironment](docs/api/app_environment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/environments` | Required |
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
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/administration` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews` | Required |
| [AppPreview](docs/api/app_preview.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/administration_index` | Required |
| [AppPreview](docs/api/app_preview.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreview](docs/api/app_preview.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/previews/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/preview_profiles` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppPreviewProfile](docs/api/app_preview_profile.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}` | Required |
| [AppRun](docs/api/app_run.html) | `create` | `POST /api/v1/hosting/app_runs/{id}/cancel` | Required |
| [AppRun](docs/api/app_run.html) | `create` | `POST /api/v1/hosting/app_runs` | Required |
| [AppRun](docs/api/app_run.html) | `load` | `GET /api/v1/hosting/app_runs/{id}` | Required |
| [AppRun](docs/api/app_run.html) | `load` | `GET /api/v1/hosting/app_runs` | Required |
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
| [AppService](docs/api/app_service.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services` | Required |
| [AppService](docs/api/app_service.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppService](docs/api/app_service.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/services/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/service_bindings` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/service_bindings/{id}` | Required |
| [AppServiceBinding](docs/api/app_service_binding.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/service_bindings` | Required |
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
| [AppStorageResource](docs/api/app_storage_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/storage_resources` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [AppStorageResource](docs/api/app_storage_resource.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}` | Required |
| [Artefact](docs/api/artefact.html) | `create` | `POST /api/v1/organizations/{organization_id}/artefacts` | Required |
| [Artefact](docs/api/artefact.html) | `list` | `GET /api/v1/organizations/{organization_id}/artefacts` | Required |
| [Artefact](docs/api/artefact.html) | `load` | `GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}` | Required |
| [Artefact](docs/api/artefact.html) | `load` | `GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/download` | Required |
| [Artefact](docs/api/artefact.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}` | Required |
| [Artefact](docs/api/artefact.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}` | Required |
| [Artefact](docs/api/artefact.html) | `update` | `PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}` | Required |
| [Artefact](docs/api/artefact.html) | `update` | `PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/draft` | Required |
| [ArtefactCommentThread](docs/api/artefact_comment_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads` | Required |
| [ArtefactCommentThread](docs/api/artefact_comment_thread.html) | `list` | `GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads` | Required |
| [ArtefactCommentThread](docs/api/artefact_comment_thread.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}` | Required |
| [ArtefactRevision](docs/api/artefact_revision.html) | `create` | `POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions` | Required |
| [ArtefactViewToken](docs/api/artefact_view_token.html) | `create` | `POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens` | Required |
| [Artifact](docs/api/artifact.html) | `create` | `POST /api/v1/artifacts/artifacts/{id}/expire` | Required |
| [Artifact](docs/api/artifact.html) | `create` | `POST /api/v1/artifacts/artifacts/{id}/issue_contract` | Required |
| [Artifact](docs/api/artifact.html) | `create` | `POST /api/v1/artifacts/artifacts/{id}/restore` | Required |
| [Artifact](docs/api/artifact.html) | `create` | `POST /api/v1/artifacts/artifacts` | Required |
| [Artifact](docs/api/artifact.html) | `load` | `GET /api/v1/artifacts/artifacts/{id}` | Required |
| [Artifact](docs/api/artifact.html) | `load` | `GET /api/v1/artifacts/artifacts` | Required |
| [Artifact](docs/api/artifact.html) | `patch` | `PATCH /api/v1/artifacts/artifacts/{id}` | Required |
| [Artifact](docs/api/artifact.html) | `remove` | `DELETE /api/v1/artifacts/artifacts/{id}` | Required |
| [Artifact](docs/api/artifact.html) | `update` | `PUT /api/v1/artifacts/artifacts/{id}` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{id}/archive` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{id}/pause` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{id}/resume` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `create` | `POST /api/v1/artifacts/cache_namespaces` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `load` | `GET /api/v1/artifacts/cache_namespaces/{id}` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `load` | `GET /api/v1/artifacts/cache_namespaces` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `patch` | `PATCH /api/v1/artifacts/cache_namespaces/{id}` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `remove` | `DELETE /api/v1/artifacts/cache_namespaces/{id}` | Required |
| [ArtifactCacheNamespace](docs/api/artifact_cache_namespace.html) | `update` | `PUT /api/v1/artifacts/cache_namespaces/{id}` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `create` | `POST /api/v1/artifacts/image_repositories/{id}/archive` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `create` | `POST /api/v1/artifacts/image_repositories/{id}/contract` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `create` | `POST /api/v1/artifacts/image_repositories/{id}/pause` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `create` | `POST /api/v1/artifacts/image_repositories/{id}/resume` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `create` | `POST /api/v1/artifacts/image_repositories` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `load` | `GET /api/v1/artifacts/image_repositories/{id}` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `load` | `GET /api/v1/artifacts/image_repositories` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `patch` | `PATCH /api/v1/artifacts/image_repositories/{id}` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `remove` | `DELETE /api/v1/artifacts/image_repositories/{id}` | Required |
| [ArtifactImageRepository](docs/api/artifact_image_repository.html) | `update` | `PUT /api/v1/artifacts/image_repositories/{id}` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `create` | `POST /api/v1/artifacts/package_mirrors/{id}/pause` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `create` | `POST /api/v1/artifacts/package_mirrors/{id}/resume` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `create` | `POST /api/v1/artifacts/package_mirrors/{id}/sync` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `create` | `POST /api/v1/artifacts/package_mirrors` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `load` | `GET /api/v1/artifacts/package_mirrors/{id}` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `load` | `GET /api/v1/artifacts/package_mirrors` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `patch` | `PATCH /api/v1/artifacts/package_mirrors/{id}` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `remove` | `DELETE /api/v1/artifacts/package_mirrors/{id}` | Required |
| [ArtifactPackageMirror](docs/api/artifact_package_mirror.html) | `update` | `PUT /api/v1/artifacts/package_mirrors/{id}` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `create` | `POST /api/v1/artifacts/retention_policies` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `load` | `GET /api/v1/artifacts/retention_policies/{id}` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `load` | `GET /api/v1/artifacts/retention_policies` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `patch` | `PATCH /api/v1/artifacts/retention_policies/{id}` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `remove` | `DELETE /api/v1/artifacts/retention_policies/{id}` | Required |
| [ArtifactRetentionPolicy](docs/api/artifact_retention_policy.html) | `update` | `PUT /api/v1/artifacts/retention_policies/{id}` | Required |
| [AttachmentPart](docs/api/attachment_part.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}` | Required |
| [AuditEvent](docs/api/audit_event.html) | `list` | `GET /api/v1/organizations/{organization_id}/audit_events` | Required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/apple` | Not required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/github` | Not required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/google` | Not required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/login` | Not required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/logout` | Required |
| [Auth](docs/api/auth.html) | `create` | `POST /api/v1/auth/register` | Not required |
| [Auth](docs/api/auth.html) | `load` | `GET /api/v1/auth/csrf` | Required |
| [Auth](docs/api/auth.html) | `load` | `GET /api/v1/auth/impersonation` | Required |
| [Auth](docs/api/auth.html) | `remove` | `DELETE /api/v1/auth/impersonation` | Required |
| [AuthCli](docs/api/auth_cli.html) | `create` | `POST /api/v1/auth/cli/complete` | Required |
| [AuthCli](docs/api/auth_cli.html) | `create` | `POST /api/v1/auth/cli/exchange` | Required |
| [AuthCli](docs/api/auth_cli.html) | `create` | `POST /api/v1/auth/cli/install` | Required |
| [AuthCli](docs/api/auth_cli.html) | `create` | `POST /api/v1/auth/cli/start` | Required |
| [AuthGithub](docs/api/auth_github.html) | `load` | `GET /api/v1/auth/github/start` | Required |
| [AuthGoogle](docs/api/auth_google.html) | `load` | `GET /api/v1/auth/google/start` | Required |
| [AuthOpenai](docs/api/auth_openai.html) | `load` | `GET /api/v1/auth/openai/callback` | Required |
| [AuthOpenai](docs/api/auth_openai.html) | `load` | `GET /api/v1/auth/openai/start` | Required |
| [AuthPasswordReset](docs/api/auth_password_reset.html) | `create` | `POST /api/v1/auth/password_resets` | Required |
| [AuthPasswordReset](docs/api/auth_password_reset.html) | `update` | `PATCH /api/v1/auth/password_resets` | Required |
| [AuthRegistrationOption](docs/api/auth_registration_option.html) | `load` | `GET /api/v1/auth/registration_options` | Not required |
| [AutomationEvent](docs/api/automation_event.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events` | Required |
| [AutomationRun](docs/api/automation_run.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs` | Required |
| [BackendRunnerPool](docs/api/backend_runner_pool.html) | `create` | `POST /api/v1/bazel/backends/{backend_id}/runner_pools` | Required |
| [BackendRunnerPool](docs/api/backend_runner_pool.html) | `load` | `GET /api/v1/bazel/backends/{backend_id}/runner_pools` | Required |
| [BackendRunnerPool](docs/api/backend_runner_pool.html) | `remove` | `DELETE /api/v1/bazel/backends/{backend_id}/runner_pools/{id}` | Required |
| [Bazel](docs/api/bazel.html) | `create` | `POST /api/v1/bazel/authorize` | Required |
| [BazelActionResult](docs/api/bazel_action_result.html) | `load` | `GET /api/v1/bazel/action_results/{hash}/{size_bytes}` | Required |
| [BazelActionResult](docs/api/bazel_action_result.html) | `update` | `PUT /api/v1/bazel/action_results/{hash}/{size_bytes}` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `create` | `POST /api/v1/bazel/backends/{id}/issue_token` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `create` | `POST /api/v1/bazel/backends/{id}/pause` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `create` | `POST /api/v1/bazel/backends/{id}/resume` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `create` | `POST /api/v1/bazel/backends` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `load` | `GET /api/v1/bazel/backends/{id}` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `load` | `GET /api/v1/bazel/backends` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `patch` | `PATCH /api/v1/bazel/backends/{id}` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `remove` | `DELETE /api/v1/bazel/backends/{id}` | Required |
| [BazelBackend](docs/api/bazel_backend.html) | `update` | `PUT /api/v1/bazel/backends/{id}` | Required |
| [BazelBlob](docs/api/bazel_blob.html) | `load` | `GET /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}` | Required |
| [BazelBlob](docs/api/bazel_blob.html) | `update` | `PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `create` | `POST /api/v1/bazel/executions/{id}/complete` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `create` | `POST /api/v1/bazel/executions/{id}/fail` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `create` | `POST /api/v1/bazel/executions/{id}/heartbeat` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `create` | `POST /api/v1/bazel/executions` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `create` | `POST /api/v1/bazel/executions/claim_next` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `load` | `GET /api/v1/bazel/executions/{id}` | Required |
| [BazelExecution](docs/api/bazel_execution.html) | `load` | `GET /api/v1/bazel/executions/lookup` | Required |
| [BazelFindMissingBlob](docs/api/bazel_find_missing_blob.html) | `create` | `POST /api/v1/bazel/find_missing_blobs` | Required |
| [Billing](docs/api/billing.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing` | Required |
| [Billing](docs/api/billing.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/usage` | Required |
| [BillingAddon](docs/api/billing_addon.html) | `update` | `PUT /api/v1/organizations/{organization_id}/billing/addons/{addon_key}` | Required |
| [BillingBudget](docs/api/billing_budget.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/billing/budget` | Required |
| [BillingBudget](docs/api/billing_budget.html) | `update` | `PUT /api/v1/organizations/{organization_id}/billing/budget` | Required |
| [BillingCheckoutSession](docs/api/billing_checkout_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/billing/checkout_sessions` | Required |
| [BillingContact](docs/api/billing_contact.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/billing/contact` | Required |
| [BillingContact](docs/api/billing_contact.html) | `update` | `PUT /api/v1/organizations/{organization_id}/billing/contact` | Required |
| [BillingExtraSpend](docs/api/billing_extra_spend.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/billing/extra_spend` | Required |
| [BillingExtraSpend](docs/api/billing_extra_spend.html) | `update` | `PUT /api/v1/organizations/{organization_id}/billing/extra_spend` | Required |
| [BillingInvoice](docs/api/billing_invoice.html) | `list` | `GET /api/v1/organizations/{organization_id}/billing/invoices` | Required |
| [BillingPackage](docs/api/billing_package.html) | `list` | `GET /api/v1/billing/packages` | Not required |
| [BillingPortalSession](docs/api/billing_portal_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/billing/portal_sessions` | Required |
| [BillingPrepaidPeriod](docs/api/billing_prepaid_period.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}` | Required |
| [BillingPrepaidPeriod](docs/api/billing_prepaid_period.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}/payment_page` | Required |
| [BillingPrepaidPurchase](docs/api/billing_prepaid_purchase.html) | `create` | `POST /api/v1/organizations/{organization_id}/billing/prepaid_purchases` | Required |
| [BillingPrepaidPurchase](docs/api/billing_prepaid_purchase.html) | `list` | `GET /api/v1/organizations/{organization_id}/billing/prepaid_purchases` | Required |
| [BillingPrepaidPurchase](docs/api/billing_prepaid_purchase.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/prepaid_purchases/{id}` | Required |
| [BillingPrepaidPurchase](docs/api/billing_prepaid_purchase.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/prepaid_purchases/{id}/payment_page` | Required |
| [BillingSubscription](docs/api/billing_subscription.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/billing/subscription` | Required |
| [BillingSubscription](docs/api/billing_subscription.html) | `update` | `PUT /api/v1/organizations/{organization_id}/billing/subscription` | Required |
| [BillingTokenTopUp](docs/api/billing_token_top_up.html) | `create` | `POST /api/v1/organizations/{organization_id}/billing/token_top_ups` | Required |
| [BillingUsage](docs/api/billing_usage.html) | `load` | `GET /api/v1/organizations/{organization_id}/billing/usage/breakdown` | Required |
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
| [BookmarkProtectionRefreshGithubRequiredCheck](docs/api/bookmark_protection_refresh_github_required_check.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/refresh_github_required_checks` | Required |
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
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/issue_contract` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_hit` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_miss` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `create` | `POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `load` | `GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `load` | `GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `patch` | `PATCH /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `remove` | `DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}` | Required |
| [CacheNamespaceEntry](docs/api/cache_namespace_entry.html) | `update` | `PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}` | Required |
| [CatalogSelector](docs/api/catalog_selector.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/catalog/selectors` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}` | Required |
| [CdnDeployment](docs/api/cdn_deployment.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnHostname](docs/api/cdn_hostname.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/cdn_spaces/{id}/archive` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/cdn_spaces/{id}/provision` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `create` | `POST /api/v1/organizations/{org_slug}/cdn_spaces` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `load` | `GET /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `load` | `GET /api/v1/organizations/{org_slug}/cdn_spaces` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `patch` | `PATCH /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `remove` | `DELETE /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpace](docs/api/cdn_space.html) | `update` | `PUT /api/v1/cdn_spaces/{id}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `load` | `GET /api/v1/cdn_spaces/{cdn_space_id}/objects/{path}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `load` | `GET /api/v1/cdn_spaces/{cdn_space_id}/objects` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `remove` | `DELETE /api/v1/cdn_spaces/{cdn_space_id}/objects/{path}` | Required |
| [CdnSpaceObject](docs/api/cdn_space_object.html) | `update` | `PUT /api/v1/cdn_spaces/{cdn_space_id}/objects` | Required |
| [Change](docs/api/change.html) | `load` | `GET /api/v1/organizations/{org_slug}/changes` | Required |
| [ChangeAsset](docs/api/change_asset.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize` | Required |
| [ChangeAsset](docs/api/change_asset.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets` | Required |
| [ChangeComment](docs/api/change_comment.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve` | Required |
| [ChangeComment](docs/api/change_comment.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve` | Required |
| [ChangeComment](docs/api/change_comment.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments` | Required |
| [ChangeComment](docs/api/change_comment.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments` | Required |
| [ChangeFileReviewCheckpoint](docs/api/change_file_review_checkpoint.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/file_review_checkpoints` | Required |
| [ChangeGitBranchSubmission](docs/api/change_git_branch_submission.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_branch_submissions` | Required |
| [ChangeGitCommitIdentity](docs/api/change_git_commit_identity.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities` | Required |
| [ChangeGitCommitIdentity](docs/api/change_git_commit_identity.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities/{id}` | Required |
| [ChangeGitPublication](docs/api/change_git_publication.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications` | Required |
| [ChangeGitPublication](docs/api/change_git_publication.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications/{id}` | Required |
| [ChangeGroupMember](docs/api/change_group_member.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members` | Required |
| [ChangeGroupMember](docs/api/change_group_member.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members/{change_id}` | Required |
| [ChangeLabel](docs/api/change_label.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels` | Required |
| [ChangeLandingHold](docs/api/change_landing_hold.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_hold/release` | Required |
| [ChangeLandingRequest](docs/api/change_landing_request.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests` | Required |
| [ChangeLandingRequest](docs/api/change_landing_request.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests/{entry_id}` | Required |
| [ChangeRequestChange](docs/api/change_request_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/request_changes` | Required |
| [ChangeReviewer](docs/api/change_reviewer.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/reviewers` | Required |
| [ChangeReviewer](docs/api/change_reviewer.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/reviewers` | Required |
| [ChangeTranscript](docs/api/change_transcript.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts` | Required |
| [ChangeTranscriptSummary](docs/api/change_transcript_summary.html) | `list` | `GET /api/v1/organizations/{org_slug}/changes/transcript_summaries` | Required |
| [CheckpointPrepareChunk](docs/api/checkpoint_prepare_chunk.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/prepare_chunks` | Required |
| [CiNode](docs/api/ci_node.html) | `create` | `POST /api/v1/ci/nodes/{id}/cordon` | Required |
| [CiNode](docs/api/ci_node.html) | `create` | `POST /api/v1/ci/nodes/{id}/drain` | Required |
| [CiNode](docs/api/ci_node.html) | `create` | `POST /api/v1/ci/nodes/{id}/heartbeat` | Required |
| [CiNode](docs/api/ci_node.html) | `create` | `POST /api/v1/ci/nodes/{id}/uncordon` | Required |
| [CiNode](docs/api/ci_node.html) | `create` | `POST /api/v1/ci/nodes/enroll` | Required |
| [CiNode](docs/api/ci_node.html) | `load` | `GET /api/v1/ci/nodes/{id}` | Required |
| [CiPipeline](docs/api/ci_pipeline.html) | `create` | `POST /api/v1/ci/pipelines` | Required |
| [CiPipeline](docs/api/ci_pipeline.html) | `list` | `GET /api/v1/ci/pipelines` | Required |
| [CiPipeline](docs/api/ci_pipeline.html) | `load` | `GET /api/v1/ci/pipelines/{id}` | Required |
| [CiPipelineRun](docs/api/ci_pipeline_run.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry` | Required |
| [CiPipelineRun](docs/api/ci_pipeline_run.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs` | Required |
| [CiPipelineRun](docs/api/ci_pipeline_run.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{id}` | Required |
| [CiPipelineRun](docs/api/ci_pipeline_run.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `create` | `POST /api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `create` | `POST /api/v1/ci/runner_pools` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `list` | `GET /api/v1/ci/runner_pools` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `load` | `GET /api/v1/ci/runner_pools/{id}` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `patch` | `PATCH /api/v1/ci/runner_pools/{id}` | Required |
| [CiRunnerPool](docs/api/ci_runner_pool.html) | `update` | `PUT /api/v1/ci/runner_pools/{id}` | Required |
| [CiStatus](docs/api/ci_status.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/ref` | Required |
| [CliEvent](docs/api/cli_event.html) | `create` | `POST /api/v1/cli_events` | Required |
| [CliRelease](docs/api/cli_release.html) | `create` | `POST /api/v1/cli_releases` | Required |
| [CliRelease](docs/api/cli_release.html) | `load` | `GET /api/v1/cli_releases` | Required |
| [CliRelease](docs/api/cli_release.html) | `load` | `GET /api/v1/cli_releases/latest` | Required |
| [CloudWorkspaceBackupObject](docs/api/cloud_workspace_backup_object.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/objects/{object_key}` | Required |
| [CodeRuleEvaluation](docs/api/code_rule_evaluation.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations` | Required |
| [ComSiteAccess](docs/api/com_site_access.html) | `create` | `POST /api/v1/com_site_access/redeem` | Required |
| [ComSiteAccess](docs/api/com_site_access.html) | `load` | `GET /api/v1/com_site_access/start` | Not required |
| [ComSiteAccessSession](docs/api/com_site_access_session.html) | `create` | `POST /api/v1/com_site_access/sessions` | Required |
| [CommentThreadComment](docs/api/comment_thread_comment.html) | `create` | `POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments` | Required |
| [CommitDiff](docs/api/commit_diff.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/diff/{fingerprint}` | Required |
| [ConnectionRequest](docs/api/connection_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}` | Required |
| [ConnectionSource](docs/api/connection_source.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/sources` | Required |
| [ContactSubmission](docs/api/contact_submission.html) | `create` | `POST /api/v1/contact_submissions` | Not required |
| [ControlComputer](docs/api/control_computer.html) | `list` | `GET /api/v1/organizations/{organization_id}/control_computers` | Required |
| [ControlComputer](docs/api/control_computer.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/control_computers/{computer}/consent` | Required |
| [ControlComputerControlOperation](docs/api/control_computer_control_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations` | Required |
| [ControlComputerControlOperation](docs/api/control_computer_control_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/{id}` | Required |
| [ControlComputerControlOperation](docs/api/control_computer_control_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/request` | Required |
| [CoordinationWait](docs/api/coordination_wait.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/waits` | Required |
| [CredentialSignInCheck](docs/api/credential_sign_in_check.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks` | Required |
| [CredentialSignInCheck](docs/api/credential_sign_in_check.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again` | Required |
| [DataResourceRotateCredential](docs/api/data_resource_rotate_credential.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop` | Required |
| [DeepScan](docs/api/deep_scan.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context` | Required |
| [DeepScan](docs/api/deep_scan.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans` | Required |
| [DeepScanFinding](docs/api/deep_scan_finding.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings` | Required |
| [DeepScanFlow](docs/api/deep_scan_flow.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/deep_scans/flows` | Required |
| [DeepScanMappedFlow](docs/api/deep_scan_mapped_flow.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/mapped_flows` | Required |
| [DeepScanOption](docs/api/deep_scan_option.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/deep_scans/options` | Required |
| [DemoShare](docs/api/demo_share.html) | `load` | `GET /api/v1/verify/demo_shares/{token}` | Not required |
| [DemoShare](docs/api/demo_share.html) | `load` | `GET /api/v1/verify/demo_shares/{token}/thumbnail` | Not required |
| [DemoShareSegment](docs/api/demo_share_segment.html) | `load` | `GET /api/v1/verify/demo_shares/{token}/segments/{segment_id}` | Not required |
| [Deployment](docs/api/deployment.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}` | Required |
| [Deployment](docs/api/deployment.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/deployments/architecture` | Required |
| [Deployment](docs/api/deployment.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/deployments/feed` | Required |
| [DeploymentDashboardNomad](docs/api/deployment_dashboard_nomad.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation` | Required |
| [DeploymentDetail](docs/api/deployment_detail.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/deployments/details` | Required |
| [DeploymentFile](docs/api/deployment_file.html) | `update` | `PUT /api/v1/static_sites/{static_site_id}/deployments/{id}/files` | Required |
| [DeploymentLog](docs/api/deployment_log.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/deployments/logs` | Required |
| [DeploymentMetric](docs/api/deployment_metric.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/deployments/metrics` | Required |
| [DeploymentPreview](docs/api/deployment_preview.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/deployments/previews` | Required |
| [DeploymentSetting](docs/api/deployment_setting.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/deployments/settings` | Required |
| [DesktopLocalAgentModel](docs/api/desktop_local_agent_model.html) | `list` | `GET /api/v1/organizations/{organization_id}/desktop_local_agent/models` | Required |
| [DesktopLocalAgentResponse](docs/api/desktop_local_agent_response.html) | `create` | `POST /api/v1/organizations/{organization_id}/desktop_local_agent/responses` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/desktop_connection` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/process_surface` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/project_visibility` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/reconnect` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/rename` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/retry_control` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/revoke` | Required |
| [Device](docs/api/device.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/user_browser_access` | Required |
| [Device](docs/api/device.html) | `list` | `GET /api/v1/organizations/{organization_id}/devices` | Required |
| [Device](docs/api/device.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}` | Required |
| [Device](docs/api/device.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy` | Required |
| [Device](docs/api/device.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy` | Required |
| [DeviceBrowserOperation](docs/api/device_browser_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations/{id}/claim` | Required |
| [DeviceBrowserOperation](docs/api/device_browser_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations/{id}/finish` | Required |
| [DeviceBrowserOperation](docs/api/device_browser_operation.html) | `list` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations` | Required |
| [DeviceControlMessage](docs/api/device_control_message.html) | `list` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages` | Required |
| [DeviceControlOperation](docs/api/device_control_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations` | Required |
| [DeviceControlOperation](docs/api/device_control_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations/{id}` | Required |
| [DeviceControlOperation](docs/api/device_control_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations/request` | Required |
| [DeviceEnterpriseRelay](docs/api/device_enterprise_relay.html) | `load` | `GET /api/v1/spark/devices/enterprise_relays` | Required |
| [DeviceFolderListing](docs/api/device_folder_listing.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings` | Required |
| [DeviceFolderListing](docs/api/device_folder_listing.html) | `load` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings/{id}` | Required |
| [DeviceGrant](docs/api/device_grant.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise` | Required |
| [DeviceGrant](docs/api/device_grant.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revoke` | Required |
| [DeviceGrant](docs/api/device_grant.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants` | Required |
| [DeviceGrant](docs/api/device_grant.html) | `list` | `GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants` | Required |
| [DeviceInvocation](docs/api/device_invocation.html) | `create` | `POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge` | Not required |
| [DeviceInvocation](docs/api/device_invocation.html) | `create` | `POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/lease` | Not required |
| [DeviceLocalEvent](docs/api/device_local_event.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/local_events` | Required |
| [DevicePairing](docs/api/device_pairing.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete` | Required |
| [DevicePairing](docs/api/device_pairing.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/pairings` | Required |
| [DeviceProject](docs/api/device_project.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/devices/{device_registration_id}/projects/{id}` | Required |
| [DeviceScheduledCheckIn](docs/api/device_scheduled_check_in.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/scheduled_check_ins` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builders/{id}/recover` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builders/{id}/sleep` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builders/{id}/wake` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builders` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `list` | `GET /api/v1/organizations/{organization_id}/docker_builders` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `load` | `GET /api/v1/organizations/{organization_id}/docker_builders/{id}` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/docker_builders/{id}` | Required |
| [DockerBuilder](docs/api/docker_builder.html) | `update` | `PUT /api/v1/organizations/{organization_id}/docker_builders/{id}` | Required |
| [DockerBuilderSession](docs/api/docker_builder_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions` | Required |
| [DockerBuilderSession](docs/api/docker_builder_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}/refresh` | Required |
| [DockerBuilderSession](docs/api/docker_builder_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/docker_builder_sessions/authorize` | Required |
| [DockerBuilderSession](docs/api/docker_builder_session.html) | `load` | `GET /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}` | Required |
| [DockerBuilderSession](docs/api/docker_builder_session.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}` | Required |
| [DockerBuilderSetting](docs/api/docker_builder_setting.html) | `list` | `GET /api/v1/organizations/{organization_id}/docker_builder_settings` | Required |
| [DockerBuilderSetting](docs/api/docker_builder_setting.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/docker_builder_settings` | Required |
| [DockerBuilderSetting](docs/api/docker_builder_setting.html) | `update` | `PUT /api/v1/organizations/{organization_id}/docker_builder_settings` | Required |
| [DomainDnsIntegration](docs/api/domain_dns_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/domain_dns_integrations` | Required |
| [DomainDnsIntegration](docs/api/domain_dns_integration.html) | `list` | `GET /api/v1/organizations/{organization_id}/domain_dns_integrations` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `list` | `GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [DomainPathRule](docs/api/domain_path_rule.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}` | Required |
| [Dream](docs/api/dream.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/dreams/{id}/resume` | Required |
| [Dream](docs/api/dream.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/dreams` | Required |
| [Dream](docs/api/dream.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/dreams/{id}` | Required |
| [Edge](docs/api/edge.html) | `load` | `GET /api/v1/edge/tls-check` | Required |
| [EmailVerification](docs/api/email_verification.html) | `create` | `POST /api/v1/email_verifications/resend` | Not required |
| [Environment](docs/api/environment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/environments` | Required |
| [Environment](docs/api/environment.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/environments/{id}` | Required |
| [Environment](docs/api/environment.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/environments` | Required |
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
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings` | Required |
| [EnvironmentSecretBinding](docs/api/environment_secret_binding.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}` | Required |
| [EnvironmentTestAccount](docs/api/environment_test_account.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/{id}` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/archive` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence/{id}/download` | Required |
| [Evidence](docs/api/evidence.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/evidence` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `create` | `POST /api/v1/execution/desired_states/{id}/reconcile` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `create` | `POST /api/v1/execution/desired_states` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `load` | `GET /api/v1/execution/desired_states/{id}` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `load` | `GET /api/v1/execution/desired_states` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `patch` | `PATCH /api/v1/execution/desired_states/{id}` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `remove` | `DELETE /api/v1/execution/desired_states/{id}` | Required |
| [ExecutionDesiredState](docs/api/execution_desired_state.html) | `update` | `PUT /api/v1/execution/desired_states/{id}` | Required |
| [ExecutionReconcilerTick](docs/api/execution_reconciler_tick.html) | `create` | `POST /api/v1/execution/reconciler_ticks` | Required |
| [ExecutionReconcilerTick](docs/api/execution_reconciler_tick.html) | `load` | `GET /api/v1/execution/reconciler_ticks/{id}` | Required |
| [ExecutionReconcilerTick](docs/api/execution_reconciler_tick.html) | `load` | `GET /api/v1/execution/reconciler_ticks` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `create` | `POST /api/v1/execution/releases/{id}/activate` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `create` | `POST /api/v1/execution/releases/{id}/fail` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `create` | `POST /api/v1/execution/releases/{id}/mark_ready` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `create` | `POST /api/v1/execution/releases` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `load` | `GET /api/v1/execution/releases/{id}` | Required |
| [ExecutionRelease](docs/api/execution_release.html) | `load` | `GET /api/v1/execution/releases` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `create` | `POST /api/v1/execution/runtime_instances/{id}/refresh` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `create` | `POST /api/v1/execution/runtime_instances/{id}/terminate` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `create` | `POST /api/v1/execution/runtime_instances` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `list` | `GET /api/v1/execution/runtime_instances` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `load` | `GET /api/v1/execution/runtime_instances/{id}` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `patch` | `PATCH /api/v1/execution/runtime_instances/{id}` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `remove` | `DELETE /api/v1/execution/runtime_instances/{id}` | Required |
| [ExecutionRuntimeInstance](docs/api/execution_runtime_instance.html) | `update` | `PUT /api/v1/execution/runtime_instances/{id}` | Required |
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
| [Gh](docs/api/gh.html) | `load` | `GET /api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}` | Required |
| [GitImport](docs/api/git_import.html) | `create` | `POST /api/v1/git_imports/{id}/complete` | Required |
| [GitImport](docs/api/git_import.html) | `create` | `POST /api/v1/git_imports/{id}/retry` | Required |
| [GitImport](docs/api/git_import.html) | `create` | `POST /api/v1/organizations/{organization_id}/git_imports` | Required |
| [GitImport](docs/api/git_import.html) | `load` | `GET /api/v1/git_imports/{id}` | Required |
| [Github](docs/api/github.html) | `load` | `GET /api/v1/github/repository_lookup` | Required |
| [GithubApp](docs/api/github_app.html) | `create` | `POST /api/v1/github_app/webhook` | Required |
| [GithubAppImportableRepository](docs/api/github_app_importable_repository.html) | `list` | `GET /api/v1/github_app/importable_repositories` | Required |
| [GithubAppInstallation](docs/api/github_app_installation.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection` | Required |
| [GithubAppInstallation](docs/api/github_app_installation.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_app/installations` | Required |
| [GithubAppInstallation](docs/api/github_app_installation.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/github_app/installations/{id}` | Required |
| [GithubAppInstallationAuthorization](docs/api/github_app_installation_authorization.html) | `create` | `POST /api/v1/github_app/installation_authorizations` | Required |
| [GithubAppInstallationAuthorization](docs/api/github_app_installation_authorization.html) | `create` | `POST /api/v1/github_app/installation_authorizations/complete` | Required |
| [GithubAppInstallationAuthorization](docs/api/github_app_installation_authorization.html) | `create` | `POST /api/v1/github_app/installation_authorizations/setup` | Required |
| [GithubAppUserAuthorization](docs/api/github_app_user_authorization.html) | `create` | `POST /api/v1/github_app/user_authorizations` | Required |
| [GithubCiRepository](docs/api/github_ci_repository.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_ci_repositories` | Required |
| [GithubCiRepository](docs/api/github_ci_repository.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_ci_repositories` | Required |
| [GithubCiRepository](docs/api/github_ci_repository.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_ci_repositories/{id}` | Required |
| [GithubCiRepository](docs/api/github_ci_repository.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/github_ci_repositories/{id}` | Required |
| [GithubCiRepository](docs/api/github_ci_repository.html) | `update` | `PUT /api/v1/organizations/{organization_id}/github_ci_repositories/{id}` | Required |
| [GithubCiRepositoryCompatibilityReport](docs/api/github_ci_repository_compatibility_report.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports` | Required |
| [GithubCiRepositoryCompatibilityReport](docs/api/github_ci_repository_compatibility_report.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports/{id}` | Required |
| [GithubConnection](docs/api/github_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/github_connections` | Required |
| [GithubConnection](docs/api/github_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/github_connections` | Required |
| [GithubIntegration](docs/api/github_integration.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/github_integrations` | Required |
| [GithubIntegration](docs/api/github_integration.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/github_integrations/{github_app_installation_id}` | Required |
| [GithubOnboarding](docs/api/github_onboarding.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_onboarding` | Required |
| [GithubOnboardingBranch](docs/api/github_onboarding_branch.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_onboarding/branches` | Required |
| [GithubOnboardingImport](docs/api/github_onboarding_import.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_onboarding/imports` | Required |
| [GithubOnboardingImportBatch](docs/api/github_onboarding_import_batch.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}` | Required |
| [GithubOnboardingImportItem](docs/api/github_onboarding_import_item.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_onboarding/import_items/{github_import_batch_item_id}/retry` | Required |
| [GithubPullRequest](docs/api/github_pull_request.html) | `create` | `POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh` | Required |
| [GithubPullRequest](docs/api/github_pull_request.html) | `load` | `GET /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}` | Required |
| [GithubRunnerAdmission](docs/api/github_runner_admission.html) | `create` | `POST /api/v1/github_runner_admission` | Required |
| [GithubRunnerCache](docs/api/github_runner_cache.html) | `create` | `POST /api/v1/github_runner_cache` | Required |
| [GithubRunnerEgress](docs/api/github_runner_egress.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_egress` | Required |
| [GithubRunnerEgress](docs/api/github_runner_egress.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_runner_egress` | Required |
| [GithubRunnerHistory](docs/api/github_runner_history.html) | `load` | `GET /api/v1/organizations/{org_slug}/github_runner_history` | Required |
| [GithubRunnerImage](docs/api/github_runner_image.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_images/{id}/prepare` | Required |
| [GithubRunnerImage](docs/api/github_runner_image.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_images` | Required |
| [GithubRunnerImage](docs/api/github_runner_image.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_runner_images` | Required |
| [GithubRunnerImage](docs/api/github_runner_image.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_runner_images/{id}` | Required |
| [GithubRunnerPool](docs/api/github_runner_pool.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_pools` | Required |
| [GithubRunnerPool](docs/api/github_runner_pool.html) | `list` | `GET /api/v1/organizations/{organization_id}/github_runner_pools` | Required |
| [GithubRunnerPool](docs/api/github_runner_pool.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/github_runner_pools/{id}` | Required |
| [GithubRunnerPool](docs/api/github_runner_pool.html) | `update` | `PUT /api/v1/organizations/{organization_id}/github_runner_pools/configure` | Required |
| [GithubRunnerSetup](docs/api/github_runner_setup.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_setup` | Required |
| [GithubRunnerSetup](docs/api/github_runner_setup.html) | `create` | `POST /api/v1/organizations/{organization_id}/github_runner_setup/agent_session` | Required |
| [GithubRunnerSetup](docs/api/github_runner_setup.html) | `load` | `GET /api/v1/organizations/{organization_id}/github_runner_setup` | Required |
| [Gitlab](docs/api/gitlab.html) | `create` | `POST /api/v1/organizations/{org_slug}/gitlab/authorize` | Required |
| [Gitlab](docs/api/gitlab.html) | `load` | `GET /api/v1/organizations/{org_slug}/gitlab` | Required |
| [GitlabConnection](docs/api/gitlab_connection.html) | `create` | `POST /api/v1/organizations/{org_slug}/gitlab/connections/{connection_id}/control` | Required |
| [GitlabConnection](docs/api/gitlab_connection.html) | `create` | `POST /api/v1/organizations/{org_slug}/gitlab/connections/{connection_id}/retry` | Required |
| [GitlabImport](docs/api/gitlab_import.html) | `create` | `POST /api/v1/organizations/{org_slug}/gitlab/imports` | Required |
| [GitlabOauth](docs/api/gitlab_oauth.html) | `load` | `GET /api/v1/gitlab/oauth/callback` | Required |
| [GrantAllAgent](docs/api/grant_all_agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/all_agents` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains/{id}/enable` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/domains` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/domains` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [HostingAppDomain](docs/api/hosting_app_domain.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/domains/{id}` | Required |
| [IdentityOrganization](docs/api/identity_organization.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/catalog` | Required |
| [ImageRepository](docs/api/image_repository.html) | `create` | `POST /api/v1/organizations/{org_slug}/image_repositories` | Required |
| [ImageRepository](docs/api/image_repository.html) | `list` | `GET /api/v1/organizations/{org_slug}/image_repositories` | Required |
| [ImageRepositoryTag](docs/api/image_repository_tag.html) | `list` | `GET /api/v1/artifacts/image_repositories/{id}/tags` | Required |
| [ImportBranchPolicy](docs/api/import_branch_policy.html) | `load` | `GET /api/v1/organizations/{organization_id}/import_branch_policy` | Required |
| [ImportBranchPolicy](docs/api/import_branch_policy.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/import_branch_policy` | Required |
| [ImportBranchPolicy](docs/api/import_branch_policy.html) | `update` | `PUT /api/v1/organizations/{organization_id}/import_branch_policy` | Required |
| [Integration](docs/api/integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/integrations` | Required |
| [InteractionResponse](docs/api/interaction_response.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses` | Required |
| [Invitation](docs/api/invitation.html) | `create` | `POST /api/v1/organizations/{organization_id}/invitations` | Required |
| [Invitation](docs/api/invitation.html) | `list` | `GET /api/v1/organizations/{organization_id}/invitations` | Required |
| [Invitation](docs/api/invitation.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/invitations/{id}` | Required |
| [InvocationControl](docs/api/invocation_control.html) | `create` | `POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/control/challenge` | Not required |
| [InvocationControl](docs/api/invocation_control.html) | `create` | `POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/control/lease` | Not required |
| [JobLogChunk](docs/api/job_log_chunk.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks` | Required |
| [JobLogChunk](docs/api/job_log_chunk.html) | `list` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks` | Required |
| [JobStep](docs/api/job_step.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps` | Required |
| [JobStep](docs/api/job_step.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps` | Required |
| [JobStep](docs/api/job_step.html) | `patch` | `PATCH /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}` | Required |
| [JobStep](docs/api/job_step.html) | `update` | `PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}` | Required |
| [JobWorkspace](docs/api/job_workspace.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces` | Required |
| [JobWorkspace](docs/api/job_workspace.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces` | Required |
| [JobWorkspace](docs/api/job_workspace.html) | `patch` | `PATCH /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces/{id}` | Required |
| [JobWorkspace](docs/api/job_workspace.html) | `update` | `PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces/{id}` | Required |
| [JourneyVariantReplay](docs/api/journey_variant_replay.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays` | Required |
| [Knowledge](docs/api/knowledge.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/knowledge` | Required |
| [Knowledge](docs/api/knowledge.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/knowledge` | Required |
| [Knowledge](docs/api/knowledge.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Knowledge](docs/api/knowledge.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}` | Required |
| [Known](docs/api/known.html) | `load` | `GET /.well-known/agent-card.json` | Not required |
| [Label](docs/api/label.html) | `list` | `GET /api/v1/organizations/{org_slug}/labels` | Required |
| [LeaseArtifact](docs/api/lease_artifact.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/artifacts` | Required |
| [LeaseCache](docs/api/lease_cache.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore` | Required |
| [LeaseCache](docs/api/lease_cache.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/save` | Required |
| [LeaseLogChunk](docs/api/lease_log_chunk.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/log_chunks` | Required |
| [LeaseReconciliation](docs/api/lease_reconciliation.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/reconciliations/{reconciliation_id}/output` | Required |
| [LeaseStep](docs/api/lease_step.html) | `update` | `PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id}` | Required |
| [LeaseVerifyDiagnostic](docs/api/lease_verify_diagnostic.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics` | Required |
| [LeaseVerifySecret](docs/api/lease_verify_secret.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets` | Required |
| [LeaseWorkspace](docs/api/lease_workspace.html) | `update` | `PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id}` | Required |
| [LocalAgentDecision](docs/api/local_agent_decision.html) | `create` | `POST /api/v1/organizations/{organization_id}/local_agent/decisions` | Required |
| [LocalAgentResponse](docs/api/local_agent_response.html) | `create` | `POST /api/v1/organizations/{organization_id}/local_agent/responses` | Required |
| [LocalThreadDelivery](docs/api/local_thread_delivery.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}` | Required |
| [LocalThreadDelivery](docs/api/local_thread_delivery.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations/{operation_id}` | Required |
| [LocalThreadOperation](docs/api/local_thread_operation.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/operations/{operation_id}` | Required |
| [Location](docs/api/location.html) | `list` | `GET /api/v1/hosting/locations` | Required |
| [LogStreamChunk](docs/api/log_stream_chunk.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks` | Required |
| [LogStreamChunk](docs/api/log_stream_chunk.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}` | Required |
| [LogStreamChunk](docs/api/log_stream_chunk.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks` | Required |
| [LogoImage](docs/api/logo_image.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/logo_image` | Required |
| [LogoImage](docs/api/logo_image.html) | `update` | `PUT /api/v1/organizations/{organization_id}/logo_image` | Required |
| [MarketingSetting](docs/api/marketing_setting.html) | `load` | `GET /api/v1/marketing_settings` | Not required |
| [McpOauth](docs/api/mcp_oauth.html) | `create` | `POST /api/v1/mcp/oauth/consent` | Required |
| [McpOauth](docs/api/mcp_oauth.html) | `create` | `POST /api/v1/mcp/oauth/register` | Required |
| [McpOauth](docs/api/mcp_oauth.html) | `create` | `POST /api/v1/mcp/oauth/revoke` | Required |
| [McpOauth](docs/api/mcp_oauth.html) | `create` | `POST /api/v1/mcp/oauth/token` | Required |
| [McpOauth](docs/api/mcp_oauth.html) | `load` | `GET /api/v1/mcp/oauth/consent` | Required |
| [McpOauth](docs/api/mcp_oauth.html) | `load` | `GET /api/v1/mcp/oauth/authorize` | Required |
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
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/promote` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/retry` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/skip_ci` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/validate_full` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries` | Required |
| [MergeQueueEntry](docs/api/merge_queue_entry.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests` | Required |
| [MergeRequest](docs/api/merge_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/merge_requests/preview` | Required |
| [MergeRequest](docs/api/merge_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/merge_requests/{id}` | Required |
| [MergeResolution](docs/api/merge_resolution.html) | `create` | `POST /api/v1/merge_resolutions` | Required |
| [MessagingConversationMessage](docs/api/messaging_conversation_message.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction` | Required |
| [MessagingConversationMessage](docs/api/messaging_conversation_message.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages` | Required |
| [MessagingConversationUpload](docs/api/messaging_conversation_upload.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads` | Required |
| [MetricQuery](docs/api/metric_query.html) | `load` | `GET /api/v1/hosting/metrics/queries` | Required |
| [MetronomeWebhook](docs/api/metronome_webhook.html) | `create` | `POST /api/v1/metronome/webhooks` | Not required |
| [ModelSubscriptionAccount](docs/api/model_subscription_account.html) | `create` | `POST /api/v1/model_subscription_accounts` | Required |
| [ModelSubscriptionAccount](docs/api/model_subscription_account.html) | `list` | `GET /api/v1/model_subscription_accounts` | Required |
| [ModelSubscriptionAccount](docs/api/model_subscription_account.html) | `patch` | `PATCH /api/v1/model_subscription_accounts/{id}` | Required |
| [ModelSubscriptionAccount](docs/api/model_subscription_account.html) | `remove` | `DELETE /api/v1/model_subscription_accounts/{id}` | Required |
| [ModelSubscriptionAccount](docs/api/model_subscription_account.html) | `update` | `PUT /api/v1/model_subscription_accounts/{id}` | Required |
| [ModelSubscriptionAccountConnection](docs/api/model_subscription_account_connection.html) | `load` | `GET /api/v1/model_subscription_accounts/connection/{agent_id}` | Required |
| [ModelSubscriptionAccountConnection](docs/api/model_subscription_account_connection.html) | `update` | `POST /api/v1/model_subscription_accounts/connection/{agent_id}` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/network_connections` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/verify/network_connections/{id}` | Required |
| [NetworkConnection](docs/api/network_connection.html) | `update` | `PUT /api/v1/organizations/{organization_id}/verify/network_connections/{id}` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `create` | `POST /api/v1/networking/spaces/{id}/activate` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `create` | `POST /api/v1/networking/spaces/{id}/archive` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `create` | `POST /api/v1/networking/spaces/{id}/pause` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `create` | `POST /api/v1/networking/spaces/{id}/validate_route` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `create` | `POST /api/v1/networking/spaces` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `load` | `GET /api/v1/networking/spaces/{id}` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/catalog` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `load` | `GET /api/v1/networking/spaces` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `patch` | `PATCH /api/v1/networking/spaces/{id}` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `remove` | `DELETE /api/v1/networking/spaces/{id}` | Required |
| [NetworkingSpace](docs/api/networking_space.html) | `update` | `PUT /api/v1/networking/spaces/{id}` | Required |
| [Node](docs/api/node.html) | `list` | `GET /api/v1/organizations/{organization_id}/pages/nodes` | Required |
| [NodeCertificate](docs/api/node_certificate.html) | `create` | `POST /api/v1/ci/nodes/{id}/certificate/rotate` | Required |
| [NodeLease](docs/api/node_lease.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/claim` | Required |
| [NodeLease](docs/api/node_lease.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/heartbeat` | Required |
| [NodeLease](docs/api/node_lease.html) | `create` | `POST /api/v1/ci/nodes/{id}/leases/{lease_id}/release` | Required |
| [NodeLease](docs/api/node_lease.html) | `load` | `GET /api/v1/ci/nodes/{id}/leases/{lease_id}/job` | Required |
| [NodeLease](docs/api/node_lease.html) | `load` | `GET /api/v1/ci/nodes/{id}/leases/{lease_id}/workspace_archive` | Required |
| [NodeLease](docs/api/node_lease.html) | `load` | `GET /api/v1/ci/nodes/{id}/leases` | Required |
| [NomadAllocation](docs/api/nomad_allocation.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}` | Required |
| [NomadLog](docs/api/nomad_log.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs` | Required |
| [Now](docs/api/now.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/now` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `create` | `POST /api/v1/observability/clickhouse_clusters/{id}/activate` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `create` | `POST /api/v1/observability/clickhouse_clusters/{id}/archive` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `create` | `POST /api/v1/observability/clickhouse_clusters/{id}/deploy` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `create` | `POST /api/v1/observability/clickhouse_clusters/{id}/pause` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `create` | `POST /api/v1/observability/clickhouse_clusters` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `load` | `GET /api/v1/observability/clickhouse_clusters/{id}` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `load` | `GET /api/v1/observability/clickhouse_clusters` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `patch` | `PATCH /api/v1/observability/clickhouse_clusters/{id}` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `remove` | `DELETE /api/v1/observability/clickhouse_clusters/{id}` | Required |
| [ObservabilityClickhouseCluster](docs/api/observability_clickhouse_cluster.html) | `update` | `PUT /api/v1/observability/clickhouse_clusters/{id}` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `create` | `POST /api/v1/observability/quickwit_clusters/{id}/activate` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `create` | `POST /api/v1/observability/quickwit_clusters/{id}/archive` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `create` | `POST /api/v1/observability/quickwit_clusters/{id}/deploy` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `create` | `POST /api/v1/observability/quickwit_clusters/{id}/pause` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `create` | `POST /api/v1/observability/quickwit_clusters` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `load` | `GET /api/v1/observability/quickwit_clusters/{id}` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `load` | `GET /api/v1/observability/quickwit_clusters` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `patch` | `PATCH /api/v1/observability/quickwit_clusters/{id}` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `remove` | `DELETE /api/v1/observability/quickwit_clusters/{id}` | Required |
| [ObservabilityQuickwitCluster](docs/api/observability_quickwit_cluster.html) | `update` | `PUT /api/v1/observability/quickwit_clusters/{id}` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `create` | `POST /api/v1/observability/spaces/{id}/activate` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `create` | `POST /api/v1/observability/spaces/{id}/archive` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `create` | `POST /api/v1/observability/spaces/{id}/pause` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `create` | `POST /api/v1/observability/spaces` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `load` | `GET /api/v1/observability/spaces/{id}` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `load` | `GET /api/v1/observability/spaces` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `patch` | `PATCH /api/v1/observability/spaces/{id}` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `remove` | `DELETE /api/v1/observability/spaces/{id}` | Required |
| [ObservabilitySpace](docs/api/observability_space.html) | `update` | `PUT /api/v1/observability/spaces/{id}` | Required |
| [Openapi](docs/api/openapi.html) | `load` | `GET /api/v1/openapi` | Required |
| [OrgInvitation](docs/api/org_invitation.html) | `create` | `POST /api/v1/org_invitations/{token}/accept` | Required |
| [OrgInvitation](docs/api/org_invitation.html) | `load` | `GET /api/v1/org_invitations/{token}` | Required |
| [Organization](docs/api/organization.html) | `create` | `POST /api/v1/organizations` | Required |
| [Organization](docs/api/organization.html) | `list` | `GET /api/v1/organizations` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /api/v1/organizations/{id}` | Required |
| [Organization](docs/api/organization.html) | `patch` | `PATCH /api/v1/organizations/{id}` | Required |
| [Organization](docs/api/organization.html) | `update` | `PUT /api/v1/organizations/{id}` | Required |
| [OrganizationApp](docs/api/organization_app.html) | `load` | `GET /api/v1/spark/organizations/{organization_id}/apps` | Required |
| [OrganizationApp](docs/api/organization_app.html) | `remove` | `DELETE /api/v1/spark/organizations/{organization_id}/apps/{name}/install` | Required |
| [OrganizationApp](docs/api/organization_app.html) | `update` | `PUT /api/v1/spark/organizations/{organization_id}/apps/{name}/install` | Required |
| [OrganizationControl](docs/api/organization_control.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/control/admission` | Required |
| [OrganizationDevice](docs/api/organization_device.html) | `create` | `POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/control` | Not required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}/expire` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}/revoke` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/identity_certificates` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/identity_certificates` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}` | Required |
| [OrganizationIdentityCertificate](docs/api/organization_identity_certificate.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}` | Required |
| [OrganizationInteraction](docs/api/organization_interaction.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/interactions` | Required |
| [OrganizationInvitation](docs/api/organization_invitation.html) | `create` | `POST /api/v1/admin/organizations/{org_slug}/invitations` | Required |
| [OrganizationInvitation](docs/api/organization_invitation.html) | `remove` | `DELETE /api/v1/admin/organizations/{org_slug}/invitations/{id}` | Required |
| [OrganizationMessageFile](docs/api/organization_message_file.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/message_files` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/pause` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/revoke` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/oidc_trusts` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/oidc_trusts` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}` | Required |
| [OrganizationOidcTrust](docs/api/organization_oidc_trust.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}` | Required |
| [OrganizationRunEvent](docs/api/organization_run_event.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/run_events` | Required |
| [OrganizationRunOutcome](docs/api/organization_run_outcome.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/run_outcomes` | Required |
| [OrganizationRunUsage](docs/api/organization_run_usage.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/run_usages` | Required |
| [OrganizationSandbox](docs/api/organization_sandbox.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/sandbox/automation-cleanup` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/disable` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/enable` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/rotate` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/upsert` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `list` | `GET /api/v1/identity/organizations/{organization_id}/secrets` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{id}` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{id}/value` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/dotenv` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/secrets/{id}` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/secrets/{id}` | Required |
| [OrganizationSecret](docs/api/organization_secret.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/secrets/{id}` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/revoke` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/suspend` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/service_accounts` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/service_accounts/{id}` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/service_accounts` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/service_accounts/{id}` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/service_accounts/{id}` | Required |
| [OrganizationServiceAccount](docs/api/organization_service_account.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/service_accounts/{id}` | Required |
| [OrganizationSetting](docs/api/organization_setting.html) | `update` | `PATCH /api/v1/admin/organizations/{org_slug}/settings` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/sites/{name}/token` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/sites` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `load` | `GET /api/v1/spark/organizations/{organization_id}/sites` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `remove` | `DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `remove` | `DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/app` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `update` | `PATCH /api/v1/spark/organizations/{organization_id}/sites/{name}` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `update` | `PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/app` | Required |
| [OrganizationSite](docs/api/organization_site.html) | `update` | `PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/marketplace_template` | Required |
| [OrganizationSubscription](docs/api/organization_subscription.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/subscriptions/selection` | Required |
| [OrganizationTool](docs/api/organization_tool.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/tools` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/issue_exchange_token` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/materialize` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/revoke` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/suspend` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/workload_identities/token_exchange` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/workload_identities/{id}` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/workload_identities` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/workload_identities/{id}` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/workload_identities/{id}` | Required |
| [OrganizationWorkloadIdentity](docs/api/organization_workload_identity.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/workload_identities/{id}` | Required |
| [OtelIngest](docs/api/otel_ingest.html) | `create` | `POST /api/v1/otel_ingest/authorize` | Required |
| [Page](docs/api/page.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/page` | Required |
| [PageAgent](docs/api/page_agent.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/page/activity` | Required |
| [PageAgent](docs/api/page_agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/page` | Required |
| [PageAgent](docs/api/page_agent.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/page/roster` | Required |
| [PageArtefact](docs/api/page_artefact.html) | `list` | `GET /api/v1/organizations/{organization_id}/artefacts/page` | Required |
| [PageArtefact](docs/api/page_artefact.html) | `load` | `GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/page` | Required |
| [PageCiPipelineRun](docs/api/page_ci_pipeline_run.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page` | Required |
| [PageProjectRun](docs/api/page_project_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/page` | Required |
| [PageRepoVcCommit](docs/api/page_repo_vc_commit.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/page` | Required |
| [PagesBilling](docs/api/pages_billing.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/billing` | Required |
| [PagesGithubOnboarding](docs/api/pages_github_onboarding.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/github_onboarding` | Required |
| [PagesMember](docs/api/pages_member.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/members` | Required |
| [PagesProjectCredential](docs/api/pages_project_credential.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/credentials` | Required |
| [PagesProjectPersona](docs/api/pages_project_persona.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas` | Required |
| [PagesProjectRun](docs/api/pages_project_run.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs` | Required |
| [PagesProjectScenario](docs/api/pages_project_scenario.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenarios` | Required |
| [PagesRegistry](docs/api/pages_registry.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/registry` | Required |
| [PagesSession](docs/api/pages_session.html) | `create` | `POST /api/v1/organizations/{org_slug}/pages/sessions` | Required |
| [PagesSession](docs/api/pages_session.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/sessions` | Required |
| [PagesSession](docs/api/pages_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/session/{session_id}` | Required |
| [Pairing](docs/api/pairing.html) | `create` | `POST /api/v1/relay/pairings` | Required |
| [Pairing](docs/api/pairing.html) | `create` | `POST /api/v1/relay/pairings/claim` | Required |
| [Pairing](docs/api/pairing.html) | `load` | `GET /api/v1/relay/pairings/{id}` | Required |
| [Pairing](docs/api/pairing.html) | `load` | `GET /api/v1/relay/pairings` | Required |
| [PairingEvent](docs/api/pairing_event.html) | `load` | `GET /api/v1/relay/pairings/{id}/events` | Required |
| [ParallelV1](docs/api/parallel_v1.html) | `create` | `POST /api/v1/organizations/{organization_id}/local_agent/parallel/v1/extract` | Required |
| [ParallelV1](docs/api/parallel_v1.html) | `create` | `POST /api/v1/organizations/{organization_id}/local_agent/parallel/v1/search` | Required |
| [PatchsetDiff](docs/api/patchset_diff.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `create` | `POST /api/v1/personal_access_tokens` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `load` | `GET /api/v1/personal_access_tokens` | Required |
| [PersonalAccessToken](docs/api/personal_access_token.html) | `remove` | `DELETE /api/v1/personal_access_tokens/{id}` | Required |
| [PreviewOperation](docs/api/preview_operation.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/operations` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings` | Required |
| [PreviewProfileSecretBinding](docs/api/preview_profile_secret_binding.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets` | Required |
| [PreviewSecret](docs/api/preview_secret.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}` | Required |
| [PreviewSharingApproval](docs/api/preview_sharing_approval.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals` | Required |
| [PreviewSharingApproval](docs/api/preview_sharing_approval.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals` | Required |
| [ProactiveAgentWaitlistEntry](docs/api/proactive_agent_waitlist_entry.html) | `create` | `POST /api/v1/proactive_agent_waitlist_entries` | Not required |
| [ProactiveAgentWaitlistEntry](docs/api/proactive_agent_waitlist_entry.html) | `load` | `GET /api/v1/proactive_agent_waitlist_entries/{referral_code}` | Not required |
| [Product](docs/api/product.html) | `create` | `POST /api/v1/organizations/{organization_id}/products` | Required |
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
| [ProjectScenarioOption](docs/api/project_scenario_option.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_options` | Required |
| [ProjectScenarioRow](docs/api/project_scenario_row.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows` | Required |
| [ProjectSetting](docs/api/project_setting.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/settings` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests` | Required |
| [PullRequest](docs/api/pull_request.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_requests/preview` | Required |
| [PullRequest](docs/api/pull_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/pull_requests/lookup` | Required |
| [PullRequest](docs/api/pull_request.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/pull_requests/{id}` | Required |
| [PullRequest](docs/api/pull_request.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | Required |
| [PullRequestAction](docs/api/pull_request_action.html) | `create` | `POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions` | Required |
| [PullRequestMagicMerge](docs/api/pull_request_magic_merge.html) | `create` | `POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge` | Required |
| [PullRequestMagicMerge](docs/api/pull_request_magic_merge.html) | `create` | `POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/rebase` | Required |
| [PullRequestMagicMerge](docs/api/pull_request_magic_merge.html) | `create` | `POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/resolve` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview` | Required |
| [PullRequestSetting](docs/api/pull_request_setting.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/pull_request_settings` | Required |
| [PullRequestSettingAddRepository](docs/api/pull_request_setting_add_repository.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories` | Required |
| [PullRequestSettingDetectComment](docs/api/pull_request_setting_detect_comment.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments` | Required |
| [PullRequestTranscript](docs/api/pull_request_transcript.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts` | Required |
| [PullZone](docs/api/pull_zone.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/pull_zones` | Required |
| [Recorder](docs/api/recorder.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/recorder` | Required |
| [Registry](docs/api/registry.html) | `load` | `GET /api/v1/registry/namespace` | Required |
| [RegistryV2](docs/api/registry_v2.html) | `create` | `POST /api/v1/registry/v2/authorize` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [RelayAgentConnection](docs/api/relay_agent_connection.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}` | Required |
| [RelayAgentLocalThread](docs/api/relay_agent_local_thread.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay` | Required |
| [RelaySignal](docs/api/relay_signal.html) | `create` | `POST /api/v1/relay/signals` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `create` | `POST /api/v1/execution/releases/{release_id}/rollouts/{id}/complete` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `create` | `POST /api/v1/execution/releases/{release_id}/rollouts/{id}/fail` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `create` | `POST /api/v1/execution/releases/{release_id}/rollouts/{id}/start` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `create` | `POST /api/v1/execution/releases/{release_id}/rollouts` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `load` | `GET /api/v1/execution/releases/{release_id}/rollouts/{id}` | Required |
| [ReleaseRollout](docs/api/release_rollout.html) | `load` | `GET /api/v1/execution/releases/{release_id}/rollouts` | Required |
| [Repo](docs/api/repo.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos` | Required |
| [Repo](docs/api/repo.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/access` | Required |
| [Repo](docs/api/repo.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/sync` | Required |
| [Repo](docs/api/repo.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}` | Required |
| [RepoAccessToken](docs/api/repo_access_token.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens` | Required |
| [RepoAccessToken](docs/api/repo_access_token.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens` | Required |
| [RepoAccessToken](docs/api/repo_access_token.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}` | Required |
| [RepoAction](docs/api/repo_action.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/actions` | Required |
| [RepoAgentCheckpoint](docs/api/repo_agent_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_checkpoints/{id}` | Required |
| [RepoAgentCheckpoint](docs/api/repo_agent_checkpoint.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_checkpoints/{id}/download` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_export` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_index` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `patch` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}` | Required |
| [RepoAgentSession](docs/api/repo_agent_session.html) | `update` | `PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/simulate` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `patch` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}` | Required |
| [RepoBookmarkProtection](docs/api/repo_bookmark_protection.html) | `update` | `PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}` | Required |
| [RepoBookmarkProtectionEvent](docs/api/repo_bookmark_protection_event.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events` | Required |
| [RepoCloudWorkspaceBackup](docs/api/repo_cloud_workspace_backup.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/restore_request` | Required |
| [RepoCloudWorkspaceBackup](docs/api/repo_cloud_workspace_backup.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups` | Required |
| [RepoCloudWorkspaceBackup](docs/api/repo_cloud_workspace_backup.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}` | Required |
| [RepoCloudWorkspaceBackup](docs/api/repo_cloud_workspace_backup.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `patch` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `update` | `PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}` | Required |
| [RepoCodeRule](docs/api/repo_code_rule.html) | `update` | `PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation` | Required |
| [RepoSetting](docs/api/repo_setting.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings` | Required |
| [RepoSetting](docs/api/repo_setting.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings` | Required |
| [RepoSetting](docs/api/repo_setting.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/land_method` | Required |
| [RepoSetting](docs/api/repo_setting.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/magic_merge` | Required |
| [RepoSetting](docs/api/repo_setting.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/trunk` | Required |
| [RepoStat](docs/api/repo_stat.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/stats/refresh` | Required |
| [RepoStat](docs/api/repo_stat.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/stats` | Required |
| [RepoVc](docs/api/repo_vc.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commit_file` | Required |
| [RepoVc](docs/api/repo_vc.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/blame` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/tree` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/archive.zip` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/blob` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_policy` | Required |
| [RepoVc](docs/api/repo_vc.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/trunk_tip` | Required |
| [RepoVc](docs/api/repo_vc.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_policy` | Required |
| [RepoVcCommit](docs/api/repo_vc_commit.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits` | Required |
| [ReportReplay](docs/api/report_replay.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}` | Required |
| [ReportScenario](docs/api/report_scenario.html) | `create` | `POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios` | Required |
| [RepositoryAccess](docs/api/repository_access.html) | `create` | `POST /api/v1/repository_access/authorize` | Required |
| [RepositoryAccess](docs/api/repository_access.html) | `create` | `POST /api/v1/repository_access/authorize_git` | Required |
| [RepositoryAccess](docs/api/repository_access.html) | `load` | `GET /api/v1/repository_access/catalog` | Required |
| [RepositoryAccessResolve](docs/api/repository_access_resolve.html) | `load` | `GET /api/v1/repository_access/resolve/{org_slug}/{repo_slug}` | Required |
| [RepositoryEvent](docs/api/repository_event.html) | `create` | `POST /api/v1/repository_events/walgit` | Required |
| [RepositoryImport](docs/api/repository_import.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/repository_import` | Required |
| [RepositoryImportSession](docs/api/repository_import_session.html) | `create` | `POST /api/v1/repository_import_sessions/{id}/authorization` | Required |
| [RepositoryImportSession](docs/api/repository_import_session.html) | `create` | `POST /api/v1/repository_import_sessions/{id}/cancel` | Required |
| [RepositoryImportSession](docs/api/repository_import_session.html) | `create` | `POST /api/v1/organizations/{organization_id}/repository_import_sessions` | Required |
| [RepositoryImportSession](docs/api/repository_import_session.html) | `load` | `GET /api/v1/repository_import_sessions/{id}` | Required |
| [RepositoryImportSessionRepository](docs/api/repository_import_session_repository.html) | `list` | `GET /api/v1/repository_import_sessions/{id}/repositories` | Required |
| [RepositoryImportSessionSelection](docs/api/repository_import_session_selection.html) | `create` | `POST /api/v1/repository_import_sessions/{id}/selections` | Required |
| [RepositorySandboxEnvironment](docs/api/repository_sandbox_environment.html) | `create` | `POST /api/v1/repositories/{repository}/sandbox_environments/validate` | Required |
| [RepositorySandboxEnvironment](docs/api/repository_sandbox_environment.html) | `load` | `GET /api/v1/repositories/{repository}/sandbox_environments/{profile}` | Required |
| [RoderCodeRepair](docs/api/roder_code_repair.html) | `create` | `POST /api/v1/agent/roder/code_repairs/{id}/cancel` | Required |
| [RoderCodeRepair](docs/api/roder_code_repair.html) | `create` | `POST /api/v1/agent/roder/code_repairs` | Required |
| [RoderCodeRepair](docs/api/roder_code_repair.html) | `load` | `GET /api/v1/agent/roder/code_repairs/{id}` | Required |
| [RoderCodeRepair](docs/api/roder_code_repair.html) | `load` | `GET /api/v1/agent/roder/code_repairs` | Required |
| [RoderCodeRepairSetting](docs/api/roder_code_repair_setting.html) | `create` | `POST /api/v1/agent/roder/code_repair_settings` | Required |
| [RoderCodeRepairSetting](docs/api/roder_code_repair_setting.html) | `load` | `GET /api/v1/agent/roder/code_repair_settings` | Required |
| [RoderMachine](docs/api/roder_machine.html) | `update` | `POST /api/v1/agent/roder/machines/{public_id}` | Required |
| [RoderRun](docs/api/roder_run.html) | `create` | `POST /api/v1/agent/roder/run/swarm_activity` | Required |
| [RoderRun](docs/api/roder_run.html) | `create` | `POST /api/v1/agent/roder/run/swarm_stack` | Required |
| [RoderRun](docs/api/roder_run.html) | `create` | `POST /api/v1/agent/roder/run/swarm_transcript` | Required |
| [RoderRun](docs/api/roder_run.html) | `create` | `POST /api/v1/agent/roder/run/workspace_authorization` | Required |
| [RoderWorkspaceCredential](docs/api/roder_workspace_credential.html) | `create` | `POST /api/v1/agent/roder/workspace_credentials` | Required |
| [RunArtifact](docs/api/run_artifact.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts` | Required |
| [RunArtifact](docs/api/run_artifact.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts` | Required |
| [RunJob](docs/api/run_job.html) | `create` | `POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs` | Required |
| [RunJob](docs/api/run_job.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{id}` | Required |
| [RunJob](docs/api/run_job.html) | `load` | `GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `load` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | Required |
| [RunScenarioRun](docs/api/run_scenario_run.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | Required |
| [RunScheduleOption](docs/api/run_schedule_option.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/options` | Required |
| [RunSearch](docs/api/run_search.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/run_search` | Required |
| [RunUpdate](docs/api/run_update.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/run_updates` | Required |
| [RunWorkspaceCredential](docs/api/run_workspace_credential.html) | `create` | `POST /api/v1/agent/roder/run/workspace_credentials` | Required |
| [RunnerLease](docs/api/runner_lease.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim` | Required |
| [RunnerLease](docs/api/runner_lease.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/heartbeat` | Required |
| [RunnerLease](docs/api/runner_lease.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/release` | Required |
| [RunnerLease](docs/api/runner_lease.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases` | Required |
| [RunnerLease](docs/api/runner_lease.html) | `load` | `GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases` | Required |
| [RunnerPoolNodeEnrollmentToken](docs/api/runner_pool_node_enrollment_token.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens/{id}/revoke` | Required |
| [RunnerPoolNodeEnrollmentToken](docs/api/runner_pool_node_enrollment_token.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens` | Required |
| [RunnerPoolNodeEnrollmentToken](docs/api/runner_pool_node_enrollment_token.html) | `list` | `GET /api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `create` | `POST /api/v1/ci/runner_pools/{runner_pool_id}/runners` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `load` | `GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `load` | `GET /api/v1/ci/runner_pools/{runner_pool_id}/runners` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `patch` | `PATCH /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}` | Required |
| [RunnerPoolRunner](docs/api/runner_pool_runner.html) | `update` | `PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}` | Required |
| [RuntimeInstanceHealthSnapshot](docs/api/runtime_instance_health_snapshot.html) | `create` | `POST /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots` | Required |
| [RuntimeInstanceHealthSnapshot](docs/api/runtime_instance_health_snapshot.html) | `load` | `GET /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots` | Required |
| [SandboxIntegration](docs/api/sandbox_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/sandbox_integrations` | Required |
| [SandboxIntegration](docs/api/sandbox_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/sandbox_integrations` | Required |
| [SandboxIntegration](docs/api/sandbox_integration.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/sandbox_integrations/{id}` | Required |
| [SandboxIntegration](docs/api/sandbox_integration.html) | `update` | `PUT /api/v1/organizations/{organization_id}/sandbox_integrations/{id}` | Required |
| [ScenarioRevision](docs/api/scenario_revision.html) | `list` | `GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/revisions` | Required |
| [ScenarioRunLesson](docs/api/scenario_run_lesson.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest` | Required |
| [ScenarioRunScenarioEdit](docs/api/scenario_run_scenario_edit.html) | `create` | `POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/revoke` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/suspend` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}` | Required |
| [SecretGrant](docs/api/secret_grant.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}` | Required |
| [SecretVersion](docs/api/secret_version.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact` | Required |
| [SecretVersion](docs/api/secret_version.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/revoke` | Required |
| [SecretVersion](docs/api/secret_version.html) | `create` | `POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions` | Required |
| [SecretVersion](docs/api/secret_version.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}` | Required |
| [SecretVersion](docs/api/secret_version.html) | `load` | `GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions` | Required |
| [SecretVersion](docs/api/secret_version.html) | `patch` | `PATCH /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}` | Required |
| [SecretVersion](docs/api/secret_version.html) | `remove` | `DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}` | Required |
| [SecretVersion](docs/api/secret_version.html) | `update` | `PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `create` | `POST /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `load` | `GET /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `patch` | `PATCH /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `remove` | `DELETE /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [ServiceEndpoint](docs/api/service_endpoint.html) | `update` | `PUT /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}` | Required |
| [Setting](docs/api/setting.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/settings` | Required |
| [SettingMutationLease](docs/api/setting_mutation_lease.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/mutation_lease/clear` | Required |
| [Signal](docs/api/signal.html) | `create` | `POST /api/v1/organizations/{organization_id}/signals/{id}/ack` | Required |
| [Signal](docs/api/signal.html) | `create` | `POST /api/v1/organizations/{organization_id}/signals/ack` | Required |
| [Signal](docs/api/signal.html) | `create` | `POST /api/v1/signals` | Required |
| [Signal](docs/api/signal.html) | `list` | `GET /api/v1/organizations/{organization_id}/signals` | Required |
| [Signal](docs/api/signal.html) | `load` | `GET /api/v1/organizations/{organization_id}/signals/{id}` | Required |
| [Signal](docs/api/signal.html) | `load` | `GET /api/v1/organizations/{organization_id}/signals/{id}/agent_prompt` | Required |
| [SignalInbound](docs/api/signal_inbound.html) | `update` | `POST /api/v1/signals/inbound/{provider}/{inbound_token}` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/signal_integrations` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `list` | `GET /api/v1/organizations/{organization_id}/signal_integrations` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/signal_integrations/{id}` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/signal_integrations/{id}` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}` | Required |
| [SignalIntegration](docs/api/signal_integration.html) | `update` | `PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}` | Required |
| [SignalIntegrationDelivery](docs/api/signal_integration_delivery.html) | `list` | `GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries` | Required |
| [SignalIntegrationTarget](docs/api/signal_integration_target.html) | `list` | `GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets` | Required |
| [SignalIntegrationTarget](docs/api/signal_integration_target.html) | `update` | `PUT /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `create` | `POST /api/v1/organizations/{organization_id}/signal_subscriptions` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `load` | `GET /api/v1/organizations/{organization_id}/signal_subscriptions/{id}` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `load` | `GET /api/v1/organizations/{organization_id}/signal_subscriptions` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `patch` | `PATCH /api/v1/organizations/{organization_id}/signal_subscriptions/{id}` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/signal_subscriptions/{id}` | Required |
| [SignalSubscription](docs/api/signal_subscription.html) | `update` | `PUT /api/v1/organizations/{organization_id}/signal_subscriptions/{id}` | Required |
| [Site](docs/api/site.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/sites` | Required |
| [SiteAccessKey](docs/api/site_access_key.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys` | Required |
| [SiteAccessKey](docs/api/site_access_key.html) | `load` | `GET /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys` | Required |
| [SiteAccessKey](docs/api/site_access_key.html) | `remove` | `DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys/{key_id}` | Required |
| [SitePreview](docs/api/site_preview.html) | `load` | `GET /api/v1/organizations/{organization_id}/verify/site_preview` | Required |
| [SiteSecret](docs/api/site_secret.html) | `remove` | `DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}` | Required |
| [SiteSecret](docs/api/site_secret.html) | `update` | `PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}` | Required |
| [SlackChannel](docs/api/slack_channel.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/slack/channels` | Required |
| [SourceConnection](docs/api/source_connection.html) | `create` | `POST /api/v1/source_connections/{id}/refresh` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{id}/activate` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{id}/archive` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules/{id}/pause` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/alert_rules` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/alert_rules/{id}` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/alert_rules` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `patch` | `PATCH /api/v1/observability/spaces/{space_id}/alert_rules/{id}` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `remove` | `DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{id}` | Required |
| [SpaceAlertRule](docs/api/space_alert_rule.html) | `update` | `PUT /api/v1/observability/spaces/{space_id}/alert_rules/{id}` | Required |
| [SpaceAuditEvent](docs/api/space_audit_event.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/audit_events` | Required |
| [SpaceAuditEvent](docs/api/space_audit_event.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/audit_events` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/dns_records` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/dns_records/sync_report` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/dns_records/{id}` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/dns_records` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/dns_records/config` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/dns_records/{id}` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/dns_records/{id}` | Required |
| [SpaceDnsRecord](docs/api/space_dns_record.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/dns_records/{id}` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/enrollment_tokens` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/enrollment_tokens` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}` | Required |
| [SpaceEnrollmentToken](docs/api/space_enrollment_token.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/gateways/{id}/sync` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/gateways` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/gateways/{id}` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/gateways/{id}/config` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/gateways` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/gateways/{id}` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/gateways/{id}` | Required |
| [SpaceGateway](docs/api/space_gateway.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/gateways/{id}` | Required |
| [SpaceGroup](docs/api/space_group.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/groups` | Required |
| [SpaceGroup](docs/api/space_group.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/groups` | Required |
| [SpaceGroup](docs/api/space_group.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/groups/{id}` | Required |
| [SpaceGroup](docs/api/space_group.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/groups/{id}` | Required |
| [SpaceGroup](docs/api/space_group.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/groups/{id}` | Required |
| [SpaceGroupMembership](docs/api/space_group_membership.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/group_memberships` | Required |
| [SpaceGroupMembership](docs/api/space_group_membership.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/group_memberships` | Required |
| [SpaceGroupMembership](docs/api/space_group_membership.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/group_memberships/{id}` | Required |
| [SpaceGroupMembership](docs/api/space_group_membership.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/group_memberships/{id}` | Required |
| [SpaceGroupMembership](docs/api/space_group_membership.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/group_memberships/{id}` | Required |
| [SpaceLogStream](docs/api/space_log_stream.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/log_streams` | Required |
| [SpaceLogStream](docs/api/space_log_stream.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/log_streams` | Required |
| [SpaceMetricSery](docs/api/space_metric_sery.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/metric_series` | Required |
| [SpaceMetricSery](docs/api/space_metric_sery.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/metric_series` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/archive` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/deploy` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/heartbeat` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/pause` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/otel_collectors` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/otel_collectors/{id}` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/bootstrap_config` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/nomad_spec` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/rendered_config` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/otel_collectors` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `patch` | `PATCH /api/v1/observability/spaces/{space_id}/otel_collectors/{id}` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `remove` | `DELETE /api/v1/observability/spaces/{space_id}/otel_collectors/{id}` | Required |
| [SpaceOtelCollector](docs/api/space_otel_collector.html) | `update` | `PUT /api/v1/observability/spaces/{space_id}/otel_collectors/{id}` | Required |
| [SpacePeer](docs/api/space_peer.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peers/{id}/approve` | Required |
| [SpacePeer](docs/api/space_peer.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peers/{id}/revoke` | Required |
| [SpacePeer](docs/api/space_peer.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peers/{id}/suspend` | Required |
| [SpacePeer](docs/api/space_peer.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peers` | Required |
| [SpacePeer](docs/api/space_peer.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peers/enroll` | Required |
| [SpacePeer](docs/api/space_peer.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/peers/{id}` | Required |
| [SpacePeer](docs/api/space_peer.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/peers/{id}/bootstrap` | Required |
| [SpacePeer](docs/api/space_peer.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/peers` | Required |
| [SpacePeer](docs/api/space_peer.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/peers/{id}` | Required |
| [SpacePeer](docs/api/space_peer.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/peers/{id}` | Required |
| [SpacePeer](docs/api/space_peer.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/peers/{id}` | Required |
| [SpacePeerAttachment](docs/api/space_peer_attachment.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/peer_attachments` | Required |
| [SpacePeerAttachment](docs/api/space_peer_attachment.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/peer_attachments` | Required |
| [SpacePeerAttachment](docs/api/space_peer_attachment.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/peer_attachments/{id}` | Required |
| [SpacePeerAttachment](docs/api/space_peer_attachment.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/peer_attachments/{id}` | Required |
| [SpacePeerAttachment](docs/api/space_peer_attachment.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/peer_attachments/{id}` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/policies/{id}/activate` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/policies/{id}/archive` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/policies/{id}/pause` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/policies` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/policies/{id}` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/policies` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/policies/{id}` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/policies/{id}` | Required |
| [SpacePolicy](docs/api/space_policy.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/policies/{id}` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `create` | `POST /api/v1/networking/spaces/{space_id}/segments` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/segments/{id}` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `load` | `GET /api/v1/networking/spaces/{space_id}/segments` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `patch` | `PATCH /api/v1/networking/spaces/{space_id}/segments/{id}` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `remove` | `DELETE /api/v1/networking/spaces/{space_id}/segments/{id}` | Required |
| [SpaceSegment](docs/api/space_segment.html) | `update` | `PUT /api/v1/networking/spaces/{space_id}/segments/{id}` | Required |
| [SpaceTraceSpan](docs/api/space_trace_span.html) | `create` | `POST /api/v1/observability/spaces/{space_id}/trace_spans` | Required |
| [SpaceTraceSpan](docs/api/space_trace_span.html) | `load` | `GET /api/v1/observability/spaces/{space_id}/trace_spans` | Required |
| [Spark](docs/api/spark.html) | `create` | `POST /api/v1/organizations/{organization_id}/sparks` | Required |
| [Spark](docs/api/spark.html) | `create` | `POST /v1/mcp/spark` | Required |
| [Spark](docs/api/spark.html) | `load` | `GET /api/v1/organizations/{organization_id}/sparks` | Required |
| [SparkAgentIntegration](docs/api/spark_agent_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations` | Required |
| [SparkAgentIntegration](docs/api/spark_agent_integration.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task` | Required |
| [SparkAgentLocalThread](docs/api/spark_agent_local_thread.html) | `update` | `PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | Required |
| [SparkAgentSite](docs/api/spark_agent_site.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/sites` | Required |
| [SparkAgentSkill](docs/api/spark_agent_skill.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/skills` | Required |
| [SparkAgentSkill](docs/api/spark_agent_skill.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/skills` | Required |
| [SparkAgentThread](docs/api/spark_agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive` | Required |
| [SparkAgentThread](docs/api/spark_agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact` | Required |
| [SparkAgentThread](docs/api/spark_agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze` | Required |
| [SparkAgentThread](docs/api/spark_agent_thread.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads` | Required |
| [SparkAgentThread](docs/api/spark_agent_thread.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/threads` | Required |
| [SparkCredit](docs/api/spark_credit.html) | `create` | `POST /api/v1/organizations/{org_slug}/spark_credits` | Required |
| [SparkCredit](docs/api/spark_credit.html) | `load` | `GET /api/v1/organizations/{org_slug}/spark_credits` | Required |
| [SparkCredit](docs/api/spark_credit.html) | `load` | `GET /api/v1/organizations/{org_slug}/spark_credits/daily_usage` | Required |
| [SparkCredit](docs/api/spark_credit.html) | `patch` | `PATCH /api/v1/organizations/{org_slug}/spark_credits` | Required |
| [SparkCredit](docs/api/spark_credit.html) | `update` | `PUT /api/v1/organizations/{org_slug}/spark_credits` | Required |
| [SparkCreditAgentUsage](docs/api/spark_credit_agent_usage.html) | `load` | `GET /api/v1/organizations/{org_slug}/spark_credits/agent_usage/{agent_id}` | Required |
| [SparkCreditUsageTotal](docs/api/spark_credit_usage_total.html) | `load` | `GET /api/v1/organizations/{org_slug}/spark_credits/usage_totals` | Required |
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
| [StatusChange](docs/api/status_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/changes/{id}` | Required |
| [StatusCommit](docs/api/status_commit.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/commits/{commit_sha}` | Required |
| [StatusPatchset](docs/api/status_patchset.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/patchsets/{id}` | Required |
| [StripeWebhook](docs/api/stripe_webhook.html) | `create` | `POST /api/v1/stripe/webhooks` | Not required |
| [SubmitTelemetry](docs/api/submit_telemetry.html) | `create` | `POST /api/v1/submit_telemetry` | Required |
| [SubscriptionModel](docs/api/subscription_model.html) | `list` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions/models` | Required |
| [SwarmEvent](docs/api/swarm_event.html) | `list` | `GET /api/v1/agent/swarms/{swarm_id}/events` | Required |
| [SwarmLive](docs/api/swarm_live.html) | `load` | `GET /api/v1/agent/swarms/{id}/live/replay` | Required |
| [SwarmNote](docs/api/swarm_note.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/notes` | Required |
| [SwarmTask](docs/api/swarm_task.html) | `list` | `GET /api/v1/agent/swarms/{swarm_id}/tasks` | Required |
| [SwarmTask](docs/api/swarm_task.html) | `load` | `GET /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/activity` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_jev` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_knowledge` | Not required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_learning` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_sign_in` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/browser_task_activity` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/claim` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/evidence` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/heartbeat` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/release` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/result` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_mail` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_product_map` | Required |
| [TaskLease](docs/api/task_lease.html) | `create` | `POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases` | Required |
| [ThreadPreview](docs/api/thread_preview.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews` | Required |
| [ThreadPreviewAccess](docs/api/thread_preview_access.html) | `create` | `POST /api/v1/thread_preview_access/redeem` | Required |
| [ThreadPreviewAccess](docs/api/thread_preview_access.html) | `create` | `POST /api/v1/thread_preview_access/upstream` | Required |
| [ThreadPreviewAccess](docs/api/thread_preview_access.html) | `load` | `GET /api/v1/thread_preview_access/start` | Not required |
| [ToolFeedback](docs/api/tool_feedback.html) | `create` | `POST /api/v1/organizations/{organization_id}/tool_feedbacks` | Required |
| [ToolFeedback](docs/api/tool_feedback.html) | `load` | `GET /api/v1/organizations/{organization_id}/tool_feedbacks/{id}` | Required |
| [Transcript](docs/api/transcript.html) | `create` | `POST /api/v1/organizations/{org_slug}/transcripts/search` | Required |
| [Transcript](docs/api/transcript.html) | `list` | `GET /api/v1/transcripts` | Required |
| [Transcript](docs/api/transcript.html) | `load` | `GET /api/v1/transcripts/read` | Required |
| [V1Message](docs/api/v1_message.html) | `create` | `POST /api/v1/spark/organizations/{organization_id}/inference/v1/messages` | Required |
| [VcBranch](docs/api/vc_branch.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches` | Required |
| [VcBranch](docs/api/vc_branch.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches` | Required |
| [VcBranch](docs/api/vc_branch.html) | `remove` | `DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}` | Required |
| [VcBrowser](docs/api/vc_browser.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/browser/file` | Required |
| [VcBrowser](docs/api/vc_browser.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/browser/tree` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/abandon` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/accept` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/fold` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/github_projection` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/ready` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/retry_ci` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcript_chat` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/submit` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/submit_ref` | Required |
| [VcChange](docs/api/vc_change.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/sync` | Required |
| [VcChange](docs/api/vc_change.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/diff` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/submit_preview` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/ci` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/github_projection` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/state` | Required |
| [VcChange](docs/api/vc_change.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/lookup` | Required |
| [VcChange](docs/api/vc_change.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/description` | Required |
| [VcChangeGroup](docs/api/vc_change_group.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups` | Required |
| [VcChangeGroup](docs/api/vc_change_group.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups` | Required |
| [VcChangeGroup](docs/api/vc_change_group.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}` | Required |
| [VcFile](docs/api/vc_file.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/files` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `create` | `POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/resume` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency` | Required |
| [VcMergeQueue](docs/api/vc_merge_queue.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/skip_ci` | Required |
| [VcStack](docs/api/vc_stack.html) | `list` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks` | Required |
| [VcStack](docs/api/vc_stack.html) | `load` | `GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}` | Required |
| [VcStack](docs/api/vc_stack.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name` | Required |
| [VcsNode](docs/api/vcs_node.html) | `list` | `GET /api/v1/organizations/{org_slug}/pages/vcs_nodes` | Required |
| [VcsSetting](docs/api/vcs_setting.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/vcs_settings` | Required |
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
| [VerifyEmailVerification](docs/api/verify_email_verification.html) | `load` | `GET /api/v1/email_verifications/verify` | Required |
| [VerifySignalIntegration](docs/api/verify_signal_integration.html) | `create` | `POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/verify` | Required |
| [VerifyStaticSiteDomain](docs/api/verify_static_site_domain.html) | `create` | `POST /api/v1/static_sites/{static_site_id}/domains/{id}/verify` | Required |
| [VersionLog](docs/api/version_log.html) | `list` | `GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs` | Required |
| [WaitlistApplication](docs/api/waitlist_application.html) | `create` | `POST /api/v1/waitlist_applications` | Not required |
| [WebBotAuth](docs/api/web_bot_auth.html) | `create` | `POST /api/v1/verify/web_bot_auth` | Required |
| [WebhookGitlab](docs/api/webhook_gitlab.html) | `update` | `POST /api/v1/webhooks/gitlab/{connection_key}` | Required |
| [WorkflowRunStep](docs/api/workflow_run_step.html) | `load` | `GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/steps/{step_id}/output` | Required |
| [WorkflowRunStopNotice](docs/api/workflow_run_stop_notice.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/stop_notice/dismissal` | Required |
| [WorkflowTriggerSkipped](docs/api/workflow_trigger_skipped.html) | `create` | `POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run` | Required |
| [WorkspaceActivity](docs/api/workspace_activity.html) | `load` | `GET /api/v1/organizations/{org_slug}/pages/workspace_activity` | Required |
| [WorkspaceActivityNotification](docs/api/workspace_activity_notification.html) | `update` | `PATCH /api/v1/organizations/{org_slug}/workspace_activity/notifications/{id}/dismissal` | Required |
| [WorkspaceSpace](docs/api/workspace_space.html) | `create` | `POST /api/v1/organizations/{organization_id}/workspace_spaces` | Required |
| [WorkspaceSpace](docs/api/workspace_space.html) | `list` | `GET /api/v1/organizations/{organization_id}/workspace_spaces` | Required |
| [WorkspaceSpace](docs/api/workspace_space.html) | `load` | `GET /api/v1/organizations/{organization_id}/workspace_spaces/{id}` | Required |
| [WorkspaceSpacePreference](docs/api/workspace_space_preference.html) | `update` | `PATCH /api/v1/organizations/{organization_id}/workspace_spaces/preferences` | Required |

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

- `composal_list`: List records for an entity. Supported entities: `agent`, `agent_app`, `agent_automation`, `agent_command`, `agent_connection`, `agent_connection_delegation`, `agent_connection_grant`, `agent_connection_safety_control`, `agent_connection_trigger_subscription`, `agent_control_flow`, `agent_integration_account`, `agent_interaction`, `agent_manager_choice`, `agent_pull_request`, `agent_relay_file_grant`, `agent_relay_file_grant_account`, `agent_resource`, `agent_routine`, `agent_site`, `agent_subagent`, `agent_swarm`, `agent_teammate`, `agent_tool`, `agent_verify_project`, `agent_workflow_run`, `agent_workflow_trigger`, `agent_workspace`, `agent_write_permission`, `agreement`, `app`, `app_deployment_operation`, `app_location`, `app_secret`, `app_service_placement`, `artefact`, `artefact_comment_thread`, `audit_event`, `billing_invoice`, `billing_package`, `billing_prepaid_purchase`, `binary`, `binary_version`, `browser_egress_candidate`, `browser_session_event`, `catalog_selector`, `change_comment`, `change_reviewer`, `change_transcript`, `change_transcript_summary`, `ci_pipeline`, `ci_runner_pool`, `connection_source`, `control_computer`, `coordination_wait`, `deep_scan_finding`, `deep_scan_option`, `deployment_log`, `deployment_metric`, `deployment_preview`, `deployment_setting`, `desktop_local_agent_model`, `device`, `device_browser_operation`, `device_control_message`, `device_grant`, `docker_builder`, `docker_builder_setting`, `domain_dns_integration`, `domain_path_rule`, `dream`, `environment_test_account`, `execution_runtime_instance`, `exploration`, `finding`, `github_app_importable_repository`, `github_app_installation`, `github_ci_repository`, `github_ci_repository_compatibility_report`, `github_integration`, `github_onboarding_branch`, `github_runner_image`, `github_runner_pool`, `image_repository`, `image_repository_tag`, `invitation`, `job_log_chunk`, `label`, `location`, `me_email`, `member`, `memory`, `model_subscription_account`, `node`, `organization`, `organization_secret`, `page_artefact`, `pages_member`, `pages_project_credential`, `pages_project_persona`, `pages_project_run`, `pages_project_scenario`, `pages_session`, `product_map_journey`, `product_map_state`, `project`, `project_code_map`, `project_environment`, `project_finding`, `project_fixture`, `project_overview_metric`, `project_overview_pull_request`, `project_run_plan`, `project_run_schedule`, `project_scenario_row`, `pull_request_transcript`, `pull_zone`, `relay_agent_connection`, `repo`, `repo_access_token`, `repo_action`, `repo_bookmark_protection`, `repo_bookmark_protection_event`, `repo_code_rule`, `repo_setting`, `repo_stat`, `repo_vc_commit`, `repository_import_session_repository`, `run_schedule_option`, `run_update`, `runner_pool_node_enrollment_token`, `scenario_revision`, `signal`, `signal_integration`, `signal_integration_delivery`, `signal_integration_target`, `site`, `slack_channel`, `spark_agent_site`, `spark_agent_skill`, `spark_agent_thread`, `static_site`, `static_site_deployment`, `static_site_domain`, `subscription_model`, `swarm_event`, `swarm_task`, `transcript`, `vc_branch`, `vc_change`, `vc_change_group`, `vc_file`, `vc_merge_queue`, `vc_stack`, `vcs_node`, `verification_project_credential`, `verification_project_persona`, `verification_project_run`, `verification_project_scenario`, `version_log`, `workspace_space`.
- `composal_load`: Load one record for an entity. Supported entities: `a2a_well_known`, `admin_org`, `agent`, `agent_app`, `agent_automation`, `agent_avatar`, `agent_computer`, `agent_connection`, `agent_context_checkpoint`, `agent_control_flow`, `agent_email`, `agent_event`, `agent_file`, `agent_integration`, `agent_integration_callback`, `agent_interaction`, `agent_library`, `agent_marketplace`, `agent_marketplace_shared`, `agent_operation`, `agent_relay_file_grant`, `agent_repository`, `agent_roder`, `agent_run`, `agent_session`, `agent_session_checkpoint`, `agent_setting`, `agent_sharing`, `agent_site`, `agent_skill`, `agent_subscription`, `agent_swarm`, `agent_thread`, `agent_usage`, `agent_web_preview`, `agent_webhook`, `agent_workflow`, `agent_workflow_proposal`, `agent_workflow_run`, `agent_workflow_trigger`, `alert_rule_event`, `allocation_log`, `app`, `app_access`, `app_access_jwk`, `app_cdn`, `app_config_variable`, `app_data_resource`, `app_deployment`, `app_deployment_operation`, `app_environment`, `app_metric`, `app_preview`, `app_preview_profile`, `app_run`, `app_secret`, `app_service`, `app_service_binding`, `app_service_placement`, `app_storage_resource`, `artefact`, `artifact`, `artifact_cache_namespace`, `artifact_image_repository`, `artifact_package_mirror`, `artifact_retention_policy`, `auth`, `auth_github`, `auth_google`, `auth_openai`, `auth_registration_option`, `backend_runner_pool`, `bazel_action_result`, `bazel_backend`, `bazel_blob`, `bazel_execution`, `billing`, `billing_prepaid_period`, `billing_prepaid_purchase`, `billing_usage`, `binary`, `binary_version`, `browser_session`, `browser_session_control`, `browser_session_media`, `browser_session_task`, `cache_namespace_entry`, `cdn_deployment`, `cdn_hostname`, `cdn_space`, `cdn_space_object`, `change`, `change_git_commit_identity`, `change_git_publication`, `ci_node`, `ci_pipeline`, `ci_pipeline_run`, `ci_runner_pool`, `ci_status`, `cli_release`, `cloud_workspace_backup_object`, `com_site_access`, `commit_diff`, `connection_request`, `control_computer_control_operation`, `deep_scan`, `deep_scan_mapped_flow`, `demo_share`, `demo_share_segment`, `deployment`, `deployment_dashboard_nomad`, `deployment_detail`, `device`, `device_control_operation`, `device_enterprise_relay`, `device_folder_listing`, `docker_builder`, `docker_builder_session`, `domain_path_rule`, `dream`, `edge`, `environment`, `environment_discovery_run`, `environment_revision`, `environment_secret_binding`, `evidence`, `execution_desired_state`, `execution_reconciler_tick`, `execution_release`, `execution_runtime_instance`, `exploration`, `exploration_report`, `finding`, `gh`, `git_import`, `github`, `github_ci_repository`, `github_ci_repository_compatibility_report`, `github_connection`, `github_integration`, `github_onboarding`, `github_onboarding_import_batch`, `github_pull_request`, `github_runner_egress`, `github_runner_history`, `github_runner_image`, `github_runner_setup`, `gitlab`, `gitlab_oauth`, `hosting_app_domain`, `identity_organization`, `import_branch_policy`, `integration`, `job_step`, `job_workspace`, `knowledge`, `known`, `local_thread_delivery`, `local_thread_operation`, `log_stream_chunk`, `marketing_setting`, `mcp_oauth`, `me`, `media_file`, `memory`, `merge_request`, `metric_query`, `model_subscription_account_connection`, `networking_space`, `node_lease`, `nomad_allocation`, `nomad_log`, `now`, `observability_clickhouse_cluster`, `observability_quickwit_cluster`, `observability_space`, `openapi`, `org_invitation`, `organization`, `organization_app`, `organization_identity_certificate`, `organization_oidc_trust`, `organization_secret`, `organization_service_account`, `organization_site`, `organization_workload_identity`, `page`, `page_agent`, `page_artefact`, `page_ci_pipeline_run`, `page_project_run`, `page_repo_vc_commit`, `pages_billing`, `pages_github_onboarding`, `pages_registry`, `pages_session`, `pairing`, `pairing_event`, `patchset_diff`, `personal_access_token`, `preview_operation`, `preview_profile_secret_binding`, `preview_sharing_approval`, `proactive_agent_waitlist_entry`, `product_map_journey`, `product_map_journey_replay`, `product_map_observation`, `product_map_state`, `project`, `project_environment`, `project_fixture`, `project_messaging_conversation`, `project_product_map`, `project_recording`, `project_run_plan`, `project_run_schedule`, `project_scenario_option`, `project_setting`, `pull_request`, `pull_request_setting`, `recorder`, `registry`, `relay_agent_connection`, `release_rollout`, `repo`, `repo_agent_checkpoint`, `repo_agent_session`, `repo_bookmark_protection`, `repo_cloud_workspace_backup`, `repo_code_rule`, `repo_vc`, `report_replay`, `repository_access`, `repository_access_resolve`, `repository_import`, `repository_import_session`, `repository_sandbox_environment`, `roder_code_repair`, `roder_code_repair_setting`, `run_artifact`, `run_job`, `run_scenario_run`, `run_search`, `runner_lease`, `runner_pool_runner`, `runtime_instance_health_snapshot`, `sandbox_integration`, `secret_grant`, `secret_version`, `service_endpoint`, `setting`, `signal`, `signal_integration`, `signal_subscription`, `site_access_key`, `site_preview`, `space_alert_rule`, `space_audit_event`, `space_dns_record`, `space_enrollment_token`, `space_gateway`, `space_group`, `space_group_membership`, `space_log_stream`, `space_metric_sery`, `space_otel_collector`, `space_peer`, `space_peer_attachment`, `space_policy`, `space_segment`, `space_trace_span`, `spark`, `spark_agent_integration`, `spark_agent_local_thread`, `spark_credit`, `spark_credit_agent_usage`, `spark_credit_usage_total`, `static_site`, `static_site_deployment`, `static_site_domain`, `status_change`, `status_commit`, `status_patchset`, `swarm_live`, `swarm_task`, `thread_preview_access`, `tool_feedback`, `transcript`, `vc_browser`, `vc_change`, `vc_change_group`, `vc_merge_queue`, `vc_stack`, `vcs_setting`, `verification_project_credential`, `verification_project_persona`, `verification_project_run`, `verification_project_scenario`, `verify_browser_session`, `verify_email_verification`, `workflow_run_step`, `workspace_activity`, `workspace_space`.

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

