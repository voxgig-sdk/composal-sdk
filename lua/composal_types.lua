-- Typed models for the Composal SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Agent
---@field attention string|nil
---@field avatar? string|nil
---@field can_delete? boolean
---@field can_edit_configuration boolean
---@field can_manage boolean
---@field can_manage_sharing? boolean
---@field can_name_managers? boolean
---@field can_queue_input? boolean
---@field can_reconcile_save boolean
---@field configuration any
---@field configuration_revision number
---@field configuration_version string|nil
---@field control_connections_available? boolean
---@field controlling_user_id string
---@field coordination_available? boolean
---@field created_at string
---@field direct_chat_available? boolean
---@field has_unread_updates boolean
---@field id string
---@field last_reply_at string|nil
---@field lifecycle_actions table
---@field lifecycle_version string|nil
---@field local_agent_control_available? boolean
---@field managers? table
---@field model_change_action? string|nil
---@field name string
---@field organization_id string
---@field persona? any
---@field preview? any
---@field preview_received_at? string|nil
---@field provisioning? any
---@field reply_triage table|nil
---@field runtime_version? string
---@field setup_pending boolean
---@field sharing_fixed? boolean
---@field sharing_version? number
---@field slug string
---@field status string
---@field team_role? string
---@field updated_at string
---@field url_slug? string
---@field visibility? string

---@class AgentLoadMatch
---@field id string
---@field organization_id string

---@class AgentListMatch
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field q? string
---@field runtime_version? string
---@field status? string

---@class AgentCreateData
---@field organization_id string
---@field viewer_time_zone? string
---@field configuration? any
---@field name string
---@field runtime_version? string
---@field slug? string
---@field visibility? string

---@class AgentUpdateData
---@field id string
---@field organization_id string
---@field name? string
---@field team_role? string
---@field visibility? string
---@field acknowledge_reset? any
---@field after_id? any
---@field before_id? any
---@field conversation_id? any
---@field expected_generation? any
---@field expected_version? any
---@field github_access? any
---@field integration_id? any
---@field keep_connections? any
---@field memory_mb? any
---@field model? any
---@field profile? any
---@field provider? any
---@field reasoning? any
---@field revoke_access? any
---@field setup_only? any
---@field value? any

---@class AgentRemoveMatch
---@field id string
---@field organization_id string

---@class AgentAttachment
---@field byte_size number
---@field content_type string
---@field file_name string
---@field id? string

---@class AgentAttachmentCreateData
---@field agent_id string
---@field organization_id string
---@field byte_size number
---@field content_type string
---@field file_name string

---@class AgentAutomation
---@field can_manage boolean
---@field can_manage_events boolean
---@field can_run boolean
---@field can_schedule boolean
---@field definition table
---@field event_subscriptions table
---@field event_triggers table
---@field expected_revision number
---@field id string
---@field key string
---@field name string
---@field revision number
---@field schedule any
---@field schedules table
---@field version table

---@class AgentAutomationLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentAutomationListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class AgentAutomationUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field definition? table
---@field expected_revision? number

---@class AgentAvatar

---@class AgentAvatarLoadMatch
---@field agent_id string
---@field organization_id string
---@field style_catalog? number

---@class AgentAvatarCreateData
---@field agent_id string
---@field organization_id string
---@field style_catalog? number
---@field description? any
---@field expected_generation? any
---@field mode? any
---@field pixel? any
---@field style? any

---@class AgentCommand
---@field description string
---@field display_name string
---@field name string
---@field skill_model_visible boolean
---@field source string

---@class AgentCommandListMatch
---@field agent_id string
---@field organization_id string
---@field conversation_id? string

---@class AgentComputer

---@class AgentComputerLoadMatch
---@field agent_id string
---@field organization_id string

---@class AgentComputerCreateData
---@field agent_id string
---@field organization_id string
---@field prepare? any

---@class AgentConnection
---@field agent_card_url string
---@field auth_scheme string
---@field can_configure boolean
---@field can_disconnect boolean
---@field can_setup boolean
---@field connection table
---@field credential? string|nil
---@field error_code string|nil
---@field expected_generation number
---@field generation number
---@field id string
---@field name string
---@field remote_agent string|nil
---@field requester_id string
---@field retired_at string|nil
---@field revoked_at string|nil
---@field scope_key string
---@field source_operation_id string|nil
---@field state string

---@class AgentConnectionLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentConnectionListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field selected_connection_id? string

---@class AgentConnectionCreateData
---@field agent_id string
---@field organization_id string
---@field agent_card_url string
---@field auth_scheme string
---@field credential? string|nil
---@field name string
---@field remote_agent? string|nil
---@field source_operation_id? string|nil

---@class AgentConnectionUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field auth_scheme? string
---@field credential? string|nil
---@field expected_generation? number
---@field name? string
---@field remote_agent? string|nil

---@class AgentConnectionRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentControlFlow
---@field can_cancel boolean
---@field cancellation_requested boolean
---@field device_name string
---@field flow_id string
---@field id? string
---@field providers table
---@field repair_of_flow_id? string
---@field status_label string
---@field step_count number
---@field title string|nil

---@class AgentControlFlowLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentControlFlowListMatch
---@field agent_id string
---@field organization_id string

---@class AgentControlFlowCreateData
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentCoordination
---@field id? string

---@class AgentCoordinationCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field include_source? any

---@class AgentEmail
---@field delivery string|nil
---@field direction string
---@field from string
---@field id string
---@field preview? string
---@field received_at string
---@field recipient_tag string|nil
---@field spam boolean
---@field subject string|nil
---@field text string
---@field to table

---@class AgentEmailLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentFile
---@field content_type string
---@field download_url string
---@field filename string
---@field id string
---@field size_bytes number

---@class AgentFileLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentInput
---@field attachment_ids? table
---@field attachments? table
---@field browser_context table
---@field client_time table
---@field conversation_id string
---@field model_policy? any
---@field requester_membership_id? string
---@field speed? string
---@field text string

---@class AgentInputCreateData
---@field agent_id string
---@field organization_id string
---@field attachment_ids? table
---@field attachments? table
---@field browser_context table
---@field client_time table
---@field conversation_id string
---@field model_policy? any
---@field requester_membership_id? string
---@field speed? string
---@field text string

---@class AgentIntegration
---@field account_counts table
---@field accounts_path string
---@field added_toolkits table
---@field can_manage boolean
---@field can_manage_organization boolean
---@field catalog table
---@field connect_as string|nil
---@field connect_as_by_toolkit table
---@field connected_counts table
---@field connection_id string
---@field connections table
---@field email table
---@field enabled boolean
---@field enabled_toolkits table
---@field generation number
---@field pagination table
---@field pending_counts table
---@field personal_creation_key_supported? boolean
---@field private_agent boolean
---@field shared_agent_personal_accounts_enabled boolean
---@field slack table
---@field webhook_connections table
---@field webhooks_available boolean

---@class AgentIntegrationListMatch
---@field agent_id string
---@field organization_id string
---@field catalog_q? string
---@field cursor? string
---@field limit? number
---@field q? string
---@field toolkit? string

---@class AgentIntegrationCreateData
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field q? string
---@field toolkit? string
---@field connection_id string
---@field enabled boolean
---@field generation number

---@class AgentInteraction
---@field id? string
---@field interactions table

---@class AgentInteractionLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string
---@field conversation_id string

---@class AgentInteractionListMatch
---@field agent_id string
---@field organization_id string
---@field conversation_id string
---@field ids? table

---@class AgentInteractionCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field conversation_id? any
---@field expected_revision? any

---@class AgentLibrary
---@field id? string

---@class AgentLibraryLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentManager
---@field attention string|nil
---@field avatar? string|nil
---@field can_delete? boolean
---@field can_edit_configuration boolean
---@field can_manage boolean
---@field can_manage_sharing? boolean
---@field can_name_managers? boolean
---@field can_queue_input? boolean
---@field can_reconcile_save boolean
---@field configuration any
---@field configuration_revision number
---@field configuration_version string|nil
---@field control_connections_available? boolean
---@field controlling_user_id string
---@field coordination_available? boolean
---@field created_at string
---@field direct_chat_available? boolean
---@field has_unread_updates boolean
---@field id string
---@field last_reply_at string|nil
---@field lifecycle_actions table
---@field lifecycle_version string|nil
---@field local_agent_control_available? boolean
---@field managers? table
---@field model_change_action? string|nil
---@field name string
---@field organization_id string
---@field persona? any
---@field preview? any
---@field preview_received_at? string|nil
---@field provisioning? any
---@field reply_triage table|nil
---@field runtime_version? string
---@field setup_pending boolean
---@field sharing_fixed? boolean
---@field sharing_version? number
---@field slug string
---@field status string
---@field team_role? string
---@field updated_at string
---@field url_slug? string
---@field user_id string
---@field visibility? string

---@class AgentManagerCreateData
---@field agent_id string
---@field organization_id string
---@field user_id string

---@class AgentManagerRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentManagerChoice
---@field id string
---@field name string

---@class AgentManagerChoiceListMatch
---@field agent_id string
---@field organization_id string
---@field q? string

---@class AgentMarketplace
---@field bundle table
---@field can_manage boolean
---@field catalog_key string|nil
---@field categories table
---@field category string
---@field counts table
---@field created_at string
---@field expected_version number
---@field explainer string|nil
---@field featured boolean
---@field from_composal boolean
---@field id string
---@field installs_count number
---@field instructions string
---@field integration_toolkits table
---@field integrations table
---@field listing any
---@field listings table
---@field memories table
---@field name string
---@field next_page number|nil
---@field organization_name string
---@field page_apps table
---@field publisher_avatar_url string|nil
---@field publisher_name string
---@field sections table
---@field share_token string|nil
---@field skills table
---@field slug string
---@field source_agent_id? string
---@field summary string
---@field updated_at string
---@field version number
---@field viewer table
---@field visibility string

---@class AgentMarketplaceLoadMatch
---@field id string

---@class AgentMarketplaceCreateData
---@field organization_id string
---@field bundle table
---@field category string
---@field explainer? string|nil
---@field name string
---@field source_agent_id? string
---@field summary string
---@field visibility? string

---@class AgentMarketplaceUpdateData
---@field id string
---@field organization_id string

---@class AgentMarketplacePatchData
---@field id string
---@field organization_id string
---@field bundle? table
---@field category? string
---@field expected_version? number
---@field explainer? string|nil
---@field name? string
---@field summary? string
---@field visibility? string

---@class AgentMarketplaceRemoveMatch
---@field id string
---@field organization_id string

---@class AgentMarketplaceShared
---@field can_manage boolean
---@field catalog_key string|nil
---@field category string
---@field counts table
---@field created_at string
---@field explainer string|nil
---@field featured boolean
---@field from_composal boolean
---@field id string
---@field installs_count number
---@field instructions string
---@field integration_toolkits table
---@field integrations table
---@field listing any
---@field memories table
---@field name string
---@field organization_name string
---@field page_apps table
---@field publisher_avatar_url string|nil
---@field publisher_name string
---@field share_token string|nil
---@field skills table
---@field slug string
---@field summary string
---@field updated_at string
---@field version number
---@field viewer table
---@field visibility string

---@class AgentMarketplaceSharedLoadMatch
---@field id string
---@field organization_id? string

---@class AgentMarketplaceSharedCreateData
---@field id string
---@field organization_id string

---@class AgentMissionControl

---@class AgentMissionControlCreateData
---@field organization_id string
---@field action? any
---@field agent_id? any
---@field agent_ids? any
---@field at? any

---@class AgentOperation
---@field arguments table
---@field id? string
---@field key string
---@field name string
---@field operation table
---@field participant string
---@field requester_id string
---@field scope_key string

---@class AgentOperationLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentOperationCreateData
---@field agent_id string
---@field organization_id string
---@field arguments table
---@field key string
---@field name string
---@field requester_id string

---@class AgentProvisioning

---@class AgentProvisioningCreateData
---@field agent_id string
---@field organization_id string
---@field expected_version? any

---@class AgentPullRequest
---@field id string
---@field number number
---@field owners table
---@field repository string
---@field status string
---@field title string
---@field url string

---@class AgentPullRequestListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field scope? string

---@class AgentQuestion
---@field id? string

---@class AgentQuestionCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field answers? any
---@field conversation_id? any

---@class AgentRepository
---@field can_manage boolean
---@field environments table
---@field expected_version number
---@field id? string
---@field repository_choices table
---@field repository_choices_error? string|nil
---@field repository_choices_truncated boolean
---@field version number
---@field work_repositories table

---@class AgentRepositoryListMatch
---@field agent_id string
---@field organization_id string
---@field q? string

---@class AgentRepositoryUpdateData
---@field agent_id string
---@field organization_id string
---@field expected_version? number
---@field work_repositories? table

---@class AgentResource
---@field name string
---@field uri string

---@class AgentResourceListMatch
---@field agent_id string
---@field organization_id string

---@class AgentRoutine
---@field can_manage boolean
---@field consecutive_errors number
---@field credit_wait table
---@field description string|nil
---@field enabled boolean
---@field id string
---@field kind string
---@field last_error string|nil
---@field last_run_at string|nil
---@field last_status string|nil
---@field managed boolean
---@field name string
---@field next_run_at string|nil
---@field routine table
---@field schedule table
---@field schedule_label string
---@field utility_model table

---@class AgentRoutineListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string

---@class AgentRoutineUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field enabled? boolean
---@field utility_model? table

---@class AgentRun
---@field error? string|nil
---@field id? string
---@field run_id string
---@field status string

---@class AgentRunLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string
---@field conversation_id? string

---@class AgentRuntime
---@field available_profiles? table
---@field can_manage boolean
---@field can_reset? boolean
---@field image string
---@field memory_mb number|nil
---@field platform? string
---@field profile string
---@field provider? string
---@field state string
---@field version string
---@field volume table|nil

---@class AgentRuntimeCreateData
---@field agent_id string
---@field organization_id string
---@field acknowledge_data_loss? any
---@field expected_version? any

---@class AgentSetting
---@field can_manage boolean
---@field expected_version string
---@field instructions string
---@field version string

---@class AgentSettingListMatch
---@field agent_id string
---@field organization_id string

---@class AgentSettingUpdateData
---@field agent_id string
---@field organization_id string
---@field expected_version? string
---@field instructions? string

---@class AgentSharing

---@class AgentSharingLoadMatch
---@field agent_id string
---@field organization_id string

---@class AgentSite
---@field deployed_at string
---@field deployments_count number
---@field hostname string
---@field https string
---@field id string
---@field name string
---@field url string
---@field visibility string

---@class AgentSiteListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class AgentSkill
---@field available boolean
---@field can_configure boolean
---@field can_manage boolean
---@field configuration_state? string
---@field description string
---@field enabled boolean
---@field name string
---@field skills table
---@field version string

---@class AgentSkillListMatch
---@field agent_id string
---@field organization_id string

---@class AgentSkillCreateData
---@field agent_id string
---@field organization_id string
---@field enabled boolean
---@field name string
---@field version string

---@class AgentSlack

---@class AgentSlackCreateData
---@field agent_id string
---@field organization_id string
---@field action? any
---@field bot_token? any
---@field callback? any
---@field confirm_before_sending? any
---@field expected_version? any
---@field mode? any
---@field show_sent_using? any
---@field signing_secret? any

---@class AgentSubagent
---@field active boolean
---@field attention table|nil
---@field ended_at string|nil
---@field id string
---@field model string|nil
---@field parent_id string
---@field preview string|nil
---@field started_at string|nil
---@field state string|nil
---@field status string
---@field title string
---@field updated_at string|nil

---@class AgentSubagentListMatch
---@field agent_id string
---@field organization_id string
---@field conversation_id? string
---@field cursor? string

---@class AgentSubscription

---@class AgentSubscriptionListMatch
---@field agent_id string
---@field organization_id string
---@field refresh_provider? string

---@class AgentSubscriptionCreateData
---@field agent_id string
---@field organization_id string
---@field action_name? any
---@field label? any
---@field login_id? any
---@field method? any
---@field model? any
---@field profile_id? any
---@field provider? any
---@field reasoning? any
---@field step_id? any
---@field token? any
---@field value? any
---@field version? any

---@class AgentTeammate
---@field avatar string|nil
---@field id string
---@field name string
---@field persona? any
---@field slug string

---@class AgentTeammateListMatch
---@field agent_id string
---@field organization_id string
---@field q? string

---@class AgentTerminal

---@class AgentTerminalCreateData
---@field agent_id string
---@field organization_id string

---@class AgentThread
---@field archived_count? number|nil
---@field can_create boolean
---@field execution? any
---@field first_input? any
---@field first_input_key? string
---@field first_input_requester_membership_id? string
---@field id? string
---@field inherit_context? boolean
---@field local_activities table
---@field local_archived_count number
---@field local_next_cursor string|nil
---@field local_scope_key string|nil
---@field local_status_pending boolean
---@field local_threads table
---@field main_thread_id string
---@field message? string
---@field next_cursor string|nil
---@field parent_conversation_id? string
---@field requester_membership_id? string
---@field selected_thread any
---@field thread table
---@field threads table
---@field title? string
---@field total_archived_count number|nil

---@class AgentThreadListMatch
---@field agent_id string
---@field organization_id string
---@field archived? boolean
---@field conversation_id? string
---@field cursor? string
---@field local_cursor? string

---@class AgentThreadCreateData
---@field agent_id string
---@field organization_id string
---@field execution? any
---@field inherit_context? boolean
---@field message? string
---@field parent_conversation_id? string
---@field requester_membership_id? string
---@field title? string

---@class AgentTool
---@field description? string
---@field inputSchema table
---@field name string

---@class AgentToolListMatch
---@field agent_id string
---@field organization_id string

---@class AgentVerifyProject
---@field available boolean
---@field can_manage boolean
---@field expected_version number
---@field project_choices table
---@field project_choices_truncated boolean
---@field verify_projects table
---@field version number

---@class AgentVerifyProjectListMatch
---@field agent_id string
---@field organization_id string

---@class AgentVerifyProjectUpdateData
---@field agent_id string
---@field organization_id string
---@field expected_version? number
---@field verify_projects? table

---@class AgentWait
---@field id? string

---@class AgentWaitCreateData
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentWebhook
---@field action string
---@field connection table
---@field deliveries table
---@field event_types table
---@field expected_generation number
---@field id? string
---@field max_events_per_day number
---@field name string
---@field purpose string
---@field signing_key string|nil

---@class AgentWebhookLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentWebhookCreateData
---@field agent_id string
---@field organization_id string
---@field event_types table
---@field max_events_per_day number
---@field name string
---@field purpose string

---@class AgentWebhookUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field action? string
---@field expected_generation? number

---@class AgentWork
---@field id? string

---@class AgentWorkCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field revision? any

---@class AgentWorkflow
---@field can_manage boolean
---@field expected_digest string
---@field path string
---@field source string
---@field template string
---@field templates table
---@field truncated boolean
---@field workflows table

---@class AgentWorkflowListMatch
---@field agent_id string
---@field organization_id string
---@field view? string
---@field workflow_path? string

---@class AgentWorkflowCreateData
---@field agent_id string
---@field organization_id string
---@field path string
---@field template string

---@class AgentWorkflowUpdateData
---@field agent_id string
---@field organization_id string
---@field expected_digest? string
---@field path? string
---@field source? string

---@class AgentWorkflowProposal
---@field agent_steps table
---@field base_digest string|nil
---@field can_manage boolean
---@field can_revise boolean
---@field can_save boolean
---@field can_set_trigger boolean
---@field created_at string
---@field definition table|nil
---@field digest string
---@field error string|nil
---@field id string
---@field model_choices? table
---@field name string
---@field native_rows? table
---@field path string
---@field pipeline_checkpoints table
---@field pipeline_commands table
---@field reasoning_choices? table
---@field runs_on_earlier_version number|nil
---@field saved table|nil
---@field stale boolean
---@field starts table|nil
---@field trigger_error string|nil

---@class AgentWorkflowProposalLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentWorkflowProposalCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field digest string
---@field model? any
---@field reasoning? any

---@class AgentWorkflowRun
---@field action string
---@field automation table|nil
---@field budget_seconds number|nil
---@field budget_usd number|nil
---@field can_answer boolean
---@field can_approve boolean
---@field can_dismiss boolean
---@field checkpoint table|nil
---@field conversation_id string|nil
---@field decision_history table
---@field error string|nil
---@field finished_at string|nil
---@field flow_steps table|nil
---@field id string
---@field needs_you boolean
---@field note string|nil
---@field nothing_to_do_reason string|nil
---@field resume_count number
---@field retry_step_id string|nil
---@field running_seconds number
---@field source string
---@field spent_tokens number
---@field spent_usd number
---@field stalled boolean
---@field started_at string
---@field started_by table|nil
---@field status string
---@field step_count number
---@field steps table
---@field trigger_id string|nil
---@field wake_at string|nil
---@field workflow_digest string|nil
---@field workflow_path string|nil

---@class AgentWorkflowRunLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string
---@field decision_cursor? string

---@class AgentWorkflowRunListMatch
---@field agent_id string
---@field organization_id string
---@field automation_key? string
---@field cursor? string
---@field limit? number
---@field view? string
---@field workflow_path? string

---@class AgentWorkflowRunCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field checkpoint table|nil
---@field resume_count number
---@field answer? any
---@field approved? any
---@field question_at? any

---@class AgentWorkflowTrigger
---@field budget table|nil
---@field can_manage boolean
---@field can_pause boolean
---@field can_resume boolean
---@field can_review boolean
---@field daily_limit number|nil
---@field day_resets_at string|nil
---@field id string
---@field kind string
---@field next_due_at string|nil
---@field pause_cause string|nil
---@field paused boolean
---@field read_at string|nil
---@field run_budget_usd number|nil
---@field schedule table|nil
---@field settings_changed_at string|nil
---@field skipped_today number
---@field stale_at string|nil
---@field stale_reason string|nil
---@field starts table|nil
---@field subscription_id string|nil
---@field time_zone string
---@field today_count number|nil
---@field trigger table
---@field workflow_path string

---@class AgentWorkflowTriggerLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentWorkflowTriggerListMatch
---@field agent_id string
---@field organization_id string

---@class AgentWorkflowTriggerUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field daily_limit? number|nil
---@field read_at? string|nil
---@field run_budget_usd? number|nil

---@class AgentWorkflowTriggerRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AgentWorkspace
---@field action string
---@field can_delete boolean
---@field can_keep boolean
---@field cleanup_after string|nil
---@field created_at string
---@field id string
---@field name string
---@field reason string
---@field state string

---@class AgentWorkspaceListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string

---@class AgentWorkspaceUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field action? string

---@class AgentWritePermission
---@field account string
---@field granted_at string
---@field granted_by string|nil
---@field id string
---@field in_effect boolean
---@field last_used_at string|nil
---@field tool string

---@class AgentWritePermissionListMatch
---@field agent_id string
---@field organization_id string

---@class AgentWritePermissionRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class AllocationLog
---@field allocation_id string
---@field environment? string
---@field fetched_at string
---@field location? string|nil
---@field logs string
---@field namespace string
---@field offset number
---@field origin string
---@field service? string
---@field task string
---@field type string

---@class AllocationLogListMatch
---@field allocation_id string
---@field app_id string
---@field offset? number
---@field origin? string
---@field task? string
---@field type? string

---@class App
---@field created_at string
---@field created_at_label string|nil
---@field description string|nil
---@field framework string|nil
---@field id string
---@field name string
---@field organization_id string
---@field repository_id string
---@field repository_kind string|nil
---@field root_path string
---@field root_path_display string
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil

---@class AppLoadMatch
---@field id string

---@class AppListMatch
---@field organization_id? string

---@class AppCreateData
---@field description? string|nil
---@field framework? string|nil
---@field name string
---@field organization_id string
---@field repository_id string
---@field root_path string
---@field slug string
---@field status? string

---@class AppUpdateData
---@field id string
---@field description? string|nil
---@field framework? string|nil
---@field name? string
---@field organization_id? string
---@field repository_id? string
---@field root_path? string
---@field slug? string
---@field status? string

---@class AppPatchData
---@field id string
---@field description? string|nil
---@field framework? string|nil
---@field name? string
---@field organization_id? string
---@field repository_id? string
---@field root_path? string
---@field slug? string
---@field status? string

---@class AppRemoveMatch
---@field id string

---@class AppCdn
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field cache_path_prefix? string|nil
---@field cache_settings_json string|nil
---@field created_at string
---@field created_at_label string|nil
---@field distribution_kind string
---@field edge_hostname string|nil
---@field failure_message string|nil
---@field hosted_app_id string
---@field hostnames table
---@field id string
---@field last_deployed_at string|nil
---@field last_deployed_at_label string|nil
---@field last_purged_at string|nil
---@field last_purged_at_label string|nil
---@field last_synced_at string|nil
---@field last_synced_at_label string|nil
---@field name string
---@field origin_url string
---@field provisioned boolean
---@field routing_settings_json string|nil
---@field security_settings_json string|nil
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil

---@class AppCdnLoadMatch
---@field app_id string
---@field id string

---@class AppCdnListMatch
---@field app_id string

---@class AppCdnCreateData
---@field app_id string
---@field app_environment_id? string|nil
---@field app_service_id? string|nil
---@field cache_path_prefix? string|nil
---@field cache_settings_json? string|nil
---@field distribution_kind? string
---@field name string
---@field origin_url string
---@field routing_settings_json? string|nil
---@field security_settings_json? string|nil
---@field slug string
---@field status? string

---@class AppCdnUpdateData
---@field app_id string
---@field id string
---@field app_environment_id? string|nil
---@field app_service_id? string|nil
---@field cache_path_prefix? string|nil
---@field cache_settings_json? string|nil
---@field distribution_kind? string
---@field name? string
---@field origin_url? string
---@field routing_settings_json? string|nil
---@field security_settings_json? string|nil
---@field slug? string
---@field status? string

---@class AppCdnPatchData
---@field app_id string
---@field id string
---@field app_environment_id? string|nil
---@field app_service_id? string|nil
---@field cache_path_prefix? string|nil
---@field cache_settings_json? string|nil
---@field distribution_kind? string
---@field name? string
---@field origin_url? string
---@field routing_settings_json? string|nil
---@field security_settings_json? string|nil
---@field slug? string
---@field status? string

---@class AppCdnRemoveMatch
---@field app_id string
---@field id string

---@class AppConfigVariable
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field created_at string
---@field description string|nil
---@field exposed_to_build boolean
---@field has_value boolean
---@field hosted_app_id string
---@field id string
---@field key string
---@field scope_kind string
---@field updated_at string
---@field value string|nil
---@field value_kind string

---@class AppConfigVariableLoadMatch
---@field app_id string
---@field id string

---@class AppConfigVariableListMatch
---@field app_id string
---@field app_environment_id? string

---@class AppConfigVariableCreateData
---@field app_id string
---@field app_environment_id? string|nil
---@field app_service_id? string|nil
---@field description? string|nil
---@field exposed_to_build boolean
---@field key string
---@field scope_kind string
---@field value? string|nil
---@field value_kind string

---@class AppConfigVariableUpdateData
---@field app_id string
---@field id string

---@class AppConfigVariablePatchData
---@field app_id string
---@field id string

---@class AppConfigVariableRemoveMatch
---@field app_id string
---@field id string

---@class AppDataResource
---@field app_environment_id string|nil
---@field created_at string
---@field engine string
---@field failure_message string|nil
---@field high_availability boolean
---@field hosted_app_id string
---@field id string
---@field kind string
---@field name string
---@field plan string|nil
---@field provider_metadata table
---@field region string|nil
---@field slug string
---@field status string
---@field storage_gb number|nil
---@field storage_label string|nil
---@field updated_at string
---@field version string|nil

---@class AppDataResourceLoadMatch
---@field app_id string
---@field id string

---@class AppDataResourceListMatch
---@field app_id string

---@class AppDataResourceCreateData
---@field app_id string
---@field app_environment_id? string|nil
---@field engine string
---@field high_availability? boolean
---@field kind string
---@field name string
---@field plan? string|nil
---@field region? string|nil
---@field slug string
---@field storage_gb? number|nil
---@field version? string|nil

---@class AppDataResourceUpdateData
---@field app_id string
---@field id string

---@class AppDataResourcePatchData
---@field app_id string
---@field id string

---@class AppDataResourceRemoveMatch
---@field app_id string
---@field id string

---@class AppDeploy
---@field app_environment_id? string
---@field app_service_id? string
---@field channel? string
---@field command? string
---@field commit_sha? string
---@field desired_instances? number
---@field environment? string
---@field image string
---@field region? string
---@field rollout_predecessor? string
---@field service? string
---@field source_ref? string

---@class AppDeployCreateData
---@field app_id string
---@field app_environment_id? string
---@field app_service_id? string
---@field channel? string
---@field command? string
---@field commit_sha? string
---@field desired_instances? number
---@field environment? string
---@field image string
---@field region? string
---@field rollout_predecessor? string
---@field service? string
---@field source_ref? string

---@class AppDeployment
---@field app_environment_id string
---@field app_service_id string
---@field app_service_placement_id? string
---@field artifact_locator string|nil
---@field build_role string|nil
---@field commit_sha string|nil
---@field created_at string
---@field created_at_label string|nil
---@field creator_user_id string|nil
---@field deployed_url string|nil
---@field display_id number
---@field failure_message string|nil
---@field finished_at string|nil
---@field finished_at_label string|nil
---@field hosted_app_id string
---@field id string
---@field idempotency_key string|nil
---@field is_rollback boolean
---@field location any
---@field location_id string
---@field number number
---@field operation_key string|nil
---@field organization_id string
---@field rollback_reason string|nil
---@field rollback_source_deployment_id string|nil
---@field rollback_source_release_id string|nil
---@field rollback_target_release_id string|nil
---@field source_ref string|nil
---@field started_at string|nil
---@field started_at_label string|nil
---@field status string
---@field trigger_kind string
---@field updated_at string
---@field updated_at_label string|nil

---@class AppDeploymentLoadMatch
---@field app_id string
---@field id string

---@class AppDeploymentListMatch
---@field app_id string

---@class AppDeploymentCreateData
---@field app_id string
---@field app_environment_id? string
---@field app_service_id? string
---@field app_service_placement_id? string
---@field artifact_locator? string|nil
---@field commit_sha? string|nil
---@field deployed_url? string|nil
---@field failure_message? string|nil
---@field finished_at? string|nil
---@field location_id? string
---@field source_ref? string|nil
---@field started_at? string|nil
---@field status? string
---@field trigger_kind? string

---@class AppDeploymentUpdateData
---@field app_id string
---@field id string

---@class AppDeploymentPatchData
---@field app_id string
---@field id string

---@class AppDeploymentRemoveMatch
---@field app_id string
---@field id string

---@class AppDeploymentOperation
---@field app table
---@field app_environment_id? string
---@field app_service_id? string
---@field app_service_placement_id? string
---@field artifact_locator string|nil
---@field build_duration_seconds number|nil
---@field build_source table|nil
---@field build_status string
---@field children table
---@field ci_pipeline_id string|nil
---@field ci_pipeline_run_id string|nil
---@field commit_sha string|nil
---@field created_at string
---@field creator table|nil
---@field deployed_url string|nil
---@field duration_seconds number|nil
---@field environment table
---@field failure_message? string
---@field finished_at? string
---@field history_kind string
---@field history_reason string|nil
---@field id string
---@field is_live boolean
---@field is_rollback boolean
---@field live_region_count number
---@field location_id? string
---@field number number
---@field placement table|nil
---@field region_count number
---@field replicas_per_region number
---@field rollback_reason string|nil
---@field rollback_source_release_id string|nil
---@field rollback_target_release_id string|nil
---@field rollout_predecessor_id string|nil
---@field rollout_status string
---@field rollout_strategy string
---@field service table
---@field source_ref string|nil
---@field started_at? string
---@field status string
---@field total_replicas number
---@field trigger_kind string
---@field updated_at string

---@class AppDeploymentOperationLoadMatch
---@field app_id string
---@field id string

---@class AppDeploymentOperationListMatch
---@field app_id string
---@field limit? number
---@field page? number

---@class AppDeploymentOperationCreateData
---@field app_id string
---@field app_environment_id? string
---@field app_service_id? string
---@field app_service_placement_id? string
---@field artifact_locator? string|nil
---@field commit_sha? string|nil
---@field deployed_url? string|nil
---@field failure_message? string
---@field finished_at? string
---@field location_id? string
---@field source_ref? string|nil
---@field started_at? string
---@field status? string
---@field trigger_kind? string

---@class AppDeploymentRollback
---@field app_environment_id? string
---@field app_id string
---@field app_service_id? string
---@field blockers table
---@field candidate_releases table
---@field confirmation_text string
---@field current_deployment any
---@field current_release any
---@field deployment any
---@field desired_state any
---@field environment any
---@field execution_allowed boolean
---@field force boolean
---@field idempotency_key? string
---@field idempotent_reuse boolean
---@field location any
---@field operation any
---@field reason string|nil
---@field rollback_release any
---@field rollout any
---@field service any
---@field target_artifact_locator string|nil
---@field target_release any
---@field to? string
---@field warnings table

---@class AppDeploymentRollbackCreateData
---@field app_id string
---@field app_environment_id? string
---@field app_service_id? string
---@field deployment? any
---@field environment? any
---@field force? boolean
---@field idempotency_key? string
---@field reason? string|nil
---@field service? any
---@field to? string

---@class AppEnvironment
---@field auto_deploy boolean
---@field base_domain string|nil
---@field branch_pattern string|nil
---@field created_at string
---@field created_at_label string|nil
---@field hosted_app_id string
---@field id string
---@field kind string
---@field location any
---@field location_id string
---@field name string
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil

---@class AppEnvironmentLoadMatch
---@field app_id string
---@field id string

---@class AppEnvironmentListMatch
---@field app_id string

---@class AppEnvironmentCreateData
---@field app_id string
---@field auto_deploy boolean
---@field base_domain? string|nil
---@field branch_pattern? string|nil
---@field kind string
---@field location_id string
---@field name string
---@field slug string
---@field status string

---@class AppEnvironmentUpdateData
---@field app_id string
---@field id string
---@field auto_deploy? boolean
---@field base_domain? string|nil
---@field branch_pattern? string|nil
---@field kind? string
---@field location_id? string
---@field name? string
---@field slug? string
---@field status? string

---@class AppEnvironmentPatchData
---@field app_id string
---@field id string
---@field auto_deploy? boolean
---@field base_domain? string|nil
---@field branch_pattern? string|nil
---@field kind? string
---@field location_id? string
---@field name? string
---@field slug? string
---@field status? string

---@class AppEnvironmentRemoveMatch
---@field app_id string
---@field id string

---@class AppLocation
---@field code string
---@field created_at string
---@field id string
---@field location_id string
---@field name string
---@field nomad_datacenter string
---@field updated_at string

---@class AppLocationListMatch
---@field app_id string

---@class AppLocationCreateData
---@field app_id string
---@field location_id string

---@class AppLocationRemoveMatch
---@field app_id string
---@field id string

---@class AppMetric

---@class AppMetricLoadMatch
---@field app_id string

---@class AppPreview
---@field access? string
---@field app_preview_profile_id string
---@field change_number? string
---@field expected_generation? number
---@field expected_patchset? number
---@field expires_at? string
---@field id? string
---@field name string
---@field resource_overrides? table
---@field retained? boolean
---@field shared_data_binding_ids? table
---@field shared_service_binding_ids? table
---@field slug string
---@field source_ref? string
---@field storage_binding_resources? table

---@class AppPreviewLoadMatch
---@field app_id string
---@field id string

---@class AppPreviewListMatch
---@field app_id string

---@class AppPreviewCreateData
---@field app_id string
---@field app_preview_profile_id string
---@field change_number? string
---@field expected_patchset? number
---@field name string
---@field slug string
---@field source_ref? string

---@class AppPreviewUpdateData
---@field app_id string
---@field id string

---@class AppPreviewPatchData
---@field app_id string
---@field id string
---@field access? string
---@field expected_generation? number
---@field expires_at? string
---@field resource_overrides? table
---@field retained? boolean
---@field shared_data_binding_ids? table
---@field shared_service_binding_ids? table
---@field storage_binding_resources? table

---@class AppPreviewRemoveMatch
---@field app_id string
---@field id string

---@class AppPreviewProfile
---@field automatic? boolean
---@field configuration? table
---@field created_at? string
---@field hosted_app_id string
---@field id string
---@field name string
---@field slug string
---@field source_environment_id string
---@field ttl_days? number
---@field updated_at? string

---@class AppPreviewProfileLoadMatch
---@field app_id string
---@field id string

---@class AppPreviewProfileListMatch
---@field app_id string

---@class AppPreviewProfileCreateData
---@field app_id string
---@field automatic? boolean
---@field configuration? table
---@field name string
---@field slug string
---@field source_environment_id string
---@field ttl_days? number

---@class AppPreviewProfileUpdateData
---@field app_id string
---@field id string

---@class AppPreviewProfilePatchData
---@field app_id string
---@field id string
---@field automatic? boolean
---@field configuration? table
---@field name? string
---@field slug? string
---@field source_environment_id? string
---@field ttl_days? number

---@class AppPreviewProfileRemoveMatch
---@field app_id string
---@field id string

---@class AppRun
---@field id? string
---@field image? string

---@class AppRunLoadMatch
---@field id string

---@class AppRunListMatch
---@field id? string
---@field image? string

---@class AppRunCreateData
---@field image? string

---@class AppSecret
---@field created_at? string
---@field description? string|nil
---@field env_key? string|nil
---@field expose_to_build? boolean
---@field has_value? boolean
---@field hosted_app_id string
---@field id string
---@field latest_version_number? number|nil
---@field name string
---@field organization_id string
---@field rotation_policy? string|nil
---@field scope_kind string
---@field slug string
---@field status string
---@field updated_at? string
---@field value? string
---@field value_digest? string|nil
---@field value_kind? string|nil

---@class AppSecretLoadMatch
---@field app_id string
---@field id string

---@class AppSecretListMatch
---@field app_id string

---@class AppSecretCreateData
---@field app_id string
---@field description? string|nil
---@field env_key? string|nil
---@field expose_to_build? boolean
---@field name string
---@field rotation_policy? string|nil
---@field slug string
---@field value? string
---@field value_kind? string|nil

---@class AppSecretUpdateData
---@field app_id string
---@field id string
---@field description? string|nil
---@field env_key? string|nil
---@field expose_to_build? boolean
---@field name? string
---@field rotation_policy? string|nil

---@class AppSecretPatchData
---@field app_id string
---@field id string
---@field description? string|nil
---@field env_key? string|nil
---@field expose_to_build? boolean
---@field name? string
---@field rotation_policy? string|nil

---@class AppSecretRemoveMatch
---@field app_id string
---@field id string

---@class AppService
---@field auto_deploy boolean
---@field bindings table
---@field build_command string|nil
---@field cpu_label string|nil
---@field cpu_mhz number|nil
---@field created_at string
---@field created_at_label string|nil
---@field deploy_paths table
---@field desired_instances number
---@field disk_label string|nil
---@field disk_mb number|nil
---@field effective_deploy_paths table
---@field healthcheck_path string|nil
---@field hosted_app_id string
---@field id string
---@field internal_port number|nil
---@field kind string
---@field memory_label string|nil
---@field memory_max_label string|nil
---@field memory_max_mb number|nil
---@field memory_mb number|nil
---@field name string
---@field nomad_constraints_json string|nil
---@field nomad_kill_timeout_seconds number|nil
---@field nomad_namespace string|nil
---@field nomad_region string|nil
---@field nomad_shutdown_delay_seconds number|nil
---@field nomad_ulimits_json string|nil
---@field nomad_update_strategy_json string|nil
---@field prestart_command string|nil
---@field publicly_accessible boolean
---@field release_command string|nil
---@field repo_source_path string
---@field runtime string
---@field runtime_adapter_kind string
---@field runtime_adapter_settings_json string|nil
---@field schedule string|nil
---@field slug string
---@field source_path string
---@field start_command string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class AppServiceLoadMatch
---@field app_id string
---@field id string

---@class AppServiceListMatch
---@field app_id string

---@class AppServiceCreateData
---@field app_id string
---@field auto_deploy boolean
---@field build_command? string|nil
---@field cpu_mhz? number|nil
---@field deploy_paths? table
---@field desired_instances number
---@field disk_mb? number|nil
---@field healthcheck_path? string|nil
---@field internal_port? number|nil
---@field kind string
---@field memory_max_mb? number|nil
---@field memory_mb? number|nil
---@field name string
---@field nomad_constraints_json? string|nil
---@field nomad_kill_timeout_seconds? number|nil
---@field nomad_namespace? string|nil
---@field nomad_region? string|nil
---@field nomad_shutdown_delay_seconds? number|nil
---@field nomad_ulimits_json? string|nil
---@field nomad_update_strategy_json? string|nil
---@field prestart_command? string|nil
---@field publicly_accessible boolean
---@field release_command? string|nil
---@field runtime string
---@field runtime_adapter_kind string
---@field runtime_adapter_settings_json? string|nil
---@field schedule? string|nil
---@field slug string
---@field source_path string
---@field start_command string|nil

---@class AppServiceUpdateData
---@field app_id string
---@field id string
---@field auto_deploy? boolean
---@field build_command? string|nil
---@field cpu_mhz? number|nil
---@field deploy_paths? table
---@field desired_instances? number
---@field disk_mb? number|nil
---@field healthcheck_path? string|nil
---@field internal_port? number|nil
---@field kind? string
---@field memory_max_mb? number|nil
---@field memory_mb? number|nil
---@field name? string
---@field nomad_constraints_json? string|nil
---@field nomad_kill_timeout_seconds? number|nil
---@field nomad_namespace? string|nil
---@field nomad_region? string|nil
---@field nomad_shutdown_delay_seconds? number|nil
---@field nomad_ulimits_json? string|nil
---@field nomad_update_strategy_json? string|nil
---@field prestart_command? string|nil
---@field publicly_accessible? boolean
---@field release_command? string|nil
---@field runtime? string
---@field runtime_adapter_kind? string
---@field runtime_adapter_settings_json? string|nil
---@field schedule? string|nil
---@field slug? string
---@field source_path? string
---@field start_command? string|nil

---@class AppServicePatchData
---@field app_id string
---@field id string
---@field auto_deploy? boolean
---@field build_command? string|nil
---@field cpu_mhz? number|nil
---@field deploy_paths? table
---@field desired_instances? number
---@field disk_mb? number|nil
---@field healthcheck_path? string|nil
---@field internal_port? number|nil
---@field kind? string
---@field memory_max_mb? number|nil
---@field memory_mb? number|nil
---@field name? string
---@field nomad_constraints_json? string|nil
---@field nomad_kill_timeout_seconds? number|nil
---@field nomad_namespace? string|nil
---@field nomad_region? string|nil
---@field nomad_shutdown_delay_seconds? number|nil
---@field nomad_ulimits_json? string|nil
---@field nomad_update_strategy_json? string|nil
---@field prestart_command? string|nil
---@field publicly_accessible? boolean
---@field release_command? string|nil
---@field runtime? string
---@field runtime_adapter_kind? string
---@field runtime_adapter_settings_json? string|nil
---@field schedule? string|nil
---@field slug? string
---@field source_path? string
---@field start_command? string|nil

---@class AppServiceRemoveMatch
---@field app_id string
---@field id string

---@class AppServiceBinding
---@field id? string

---@class AppServiceBindingLoadMatch
---@field app_id string
---@field id string

---@class AppServiceBindingListMatch
---@field app_id string

---@class AppServiceBindingCreateData
---@field app_id string

---@class AppServiceBindingUpdateData
---@field app_id string
---@field id string

---@class AppServiceBindingPatchData
---@field app_id string
---@field id string

---@class AppServiceBindingRemoveMatch
---@field app_id string
---@field id string

---@class AppServicePlacement
---@field app_environment_id string
---@field app_service_id string
---@field created_at string
---@field deployment_channel string|nil
---@field hosted_app_id string
---@field id string
---@field mode string
---@field organization_id string
---@field region_count number
---@field replicas_per_region number
---@field rollout_strategy string
---@field targets table
---@field total_replicas number
---@field updated_at string

---@class AppServicePlacementLoadMatch
---@field app_id string
---@field id string

---@class AppServicePlacementListMatch
---@field app_id string
---@field existing? boolean
---@field service? string

---@class AppServicePlacementUpdateData
---@field app_id string
---@field app_environment_id? string
---@field app_service_id? string
---@field deployment_channel? string|nil
---@field mode? string
---@field replicas_per_region? number
---@field rollout_strategy? string
---@field targets? table
---@field expected_generation? any

---@class AppStorageResource
---@field access_mode string
---@field app_environment_id string|nil
---@field attachment table|nil
---@field capacity_gb number|nil
---@field capacity_label string|nil
---@field created_at string
---@field ephemeral boolean
---@field external_volume_id string|nil
---@field hosted_app_id string
---@field id string
---@field kind string
---@field location_code string|nil
---@field location_id string|nil
---@field mount_path string|nil
---@field name string
---@field provider string
---@field provider_error string|nil
---@field region string|nil
---@field slug string
---@field status string
---@field updated_at string

---@class AppStorageResourceLoadMatch
---@field app_id string
---@field id string

---@class AppStorageResourceListMatch
---@field app_id string

---@class AppStorageResourceCreateData
---@field app_id string
---@field access_mode string
---@field app_environment_id? string|nil
---@field capacity_gb? number|nil
---@field kind string
---@field location_id? string|nil
---@field mount_path? string|nil
---@field name string
---@field provider string
---@field region? string|nil
---@field slug string
---@field status string

---@class AppStorageResourceUpdateData
---@field app_id string
---@field id string

---@class AppStorageResourcePatchData
---@field app_id string
---@field id string

---@class AppStorageResourceRemoveMatch
---@field app_id string
---@field id string

---@class AttachmentPart
---@field id? string

---@class AttachmentPartUpdateData
---@field agent_id string
---@field attachment_id string
---@field id string
---@field organization_id string

---@class AutomationEvent
---@field action string
---@field can_manage boolean
---@field can_manage_events boolean
---@field can_run boolean
---@field can_schedule boolean
---@field event_subscriptions table
---@field event_triggers table
---@field expected_revision string|nil
---@field id string
---@field key string
---@field name string
---@field revision number
---@field schedule any
---@field schedules table
---@field settings? table
---@field subscription_key string
---@field version table

---@class AutomationEventUpdateData
---@field agent_id string
---@field automation_id string
---@field organization_id string
---@field action? string
---@field expected_revision? string|nil
---@field settings? table
---@field subscription_key? string

---@class AutomationRun
---@field action string
---@field automation table|nil
---@field budget_seconds number|nil
---@field budget_usd number|nil
---@field can_answer boolean
---@field can_approve boolean
---@field can_dismiss boolean
---@field checkpoint table|nil
---@field conversation_id string|nil
---@field decision_history table
---@field error string|nil
---@field finished_at string|nil
---@field flow_steps table|nil
---@field id string
---@field input table
---@field needs_you boolean
---@field note string|nil
---@field nothing_to_do_reason string|nil
---@field request_id string
---@field resume_count number
---@field retry_step_id string|nil
---@field running_seconds number
---@field source string
---@field spent_tokens number
---@field spent_usd number
---@field stalled boolean
---@field started_at string
---@field started_by table|nil
---@field status string
---@field step_count number
---@field steps table
---@field trigger_id string|nil
---@field version_id string
---@field wake_at string|nil
---@field workflow_digest string|nil
---@field workflow_path string|nil

---@class AutomationRunCreateData
---@field agent_id string
---@field automation_id string
---@field organization_id string
---@field input table
---@field request_id string
---@field version_id string

---@class Binary
---@field accepts_versions boolean
---@field arch? any
---@field archived_at string|nil
---@field binary table
---@field created_at string
---@field download_secret? string
---@field download_url string
---@field executable string
---@field format any
---@field id string
---@field idempotency_key string
---@field latest_version any
---@field launch_args? table
---@field name string
---@field needs_refresh boolean
---@field operation table
---@field pagination table
---@field permissions table
---@field platform? any
---@field project_id string
---@field sha256? string
---@field slug string
---@field version table
---@field version_defaults? any
---@field versions table
---@field window_title string

---@class BinaryLoadMatch
---@field id string
---@field organization_id string
---@field page? number
---@field project_id string

---@class BinaryListMatch
---@field organization_id string
---@field page? number
---@field project_id string

---@class BinaryCreateData
---@field organization_id string
---@field project_id string
---@field arch? any
---@field download_secret? string
---@field download_url string
---@field executable string
---@field format any
---@field idempotency_key string
---@field launch_args? table
---@field name string
---@field platform? any
---@field sha256? string
---@field slug string
---@field window_title string

---@class BinaryVersion
---@field arch? any
---@field cancelable boolean
---@field configuration table
---@field configuration_digest string
---@field created_at string
---@field deletable boolean
---@field download_secret? string
---@field download_url string
---@field environment_uses table
---@field executable? string
---@field format? any
---@field id string
---@field idempotency_key string
---@field launch_args? table
---@field operation table
---@field package_sha256 string|nil
---@field package_size number|nil
---@field permissions table
---@field platform? any
---@field preparations table
---@field retryable boolean
---@field sha256? string
---@field status string
---@field version table
---@field window_title? string

---@class BinaryVersionLoadMatch
---@field binary_id string
---@field id string
---@field organization_id string
---@field project_id string

---@class BinaryVersionListMatch
---@field binary_id string
---@field organization_id string
---@field page? number
---@field project_id string

---@class BinaryVersionCreateData
---@field binary_id string
---@field organization_id string
---@field project_id string
---@field arch? any
---@field download_secret? string
---@field download_url string
---@field executable? string
---@field format? any
---@field idempotency_key string
---@field launch_args? table
---@field platform? any
---@field sha256? string
---@field window_title? string

---@class BinaryVersionRemoveMatch
---@field binary_id string
---@field id string
---@field organization_id string
---@field project_id string

---@class BrowserEgressCandidate
---@field id string

---@class BrowserEgressCandidateListMatch
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class BrowserSession
---@field active_task_id? string|nil
---@field authentication_status string
---@field authentication_task_id? string|nil
---@field cdp_url? string|nil
---@field closed_at? string|nil
---@field closure_basis? string|nil
---@field control_generation number
---@field controller string
---@field credential_id? string|nil
---@field environment_id? string
---@field environment_revision_id? string|nil
---@field expires_at string
---@field failure_code? string|nil
---@field id string
---@field idempotency_key? string
---@field initial_url string
---@field max_seconds? number
---@field pending_control_id? string|nil
---@field project_id? string|nil
---@field reconciled_at? string|nil
---@field started_at? string|nil
---@field status string
---@field url? string
---@field viewer? table|nil

---@class BrowserSessionLoadMatch
---@field id string
---@field organization_id string

---@class BrowserSessionCreateData
---@field organization_id string
---@field controller? string
---@field credential_id? string|nil
---@field environment_id? string
---@field idempotency_key? string
---@field max_seconds? number
---@field project_id? string|nil
---@field url? string

---@class BrowserSessionRemoveMatch
---@field id string
---@field organization_id string

---@class BrowserSessionConnection
---@field generation number
---@field idempotency_key? string

---@class BrowserSessionConnectionCreateData
---@field browser_session_id string
---@field organization_id string
---@field generation number
---@field idempotency_key? string

---@class BrowserSessionControl
---@field browser_session_id string
---@field completed_at? string|nil
---@field completed_generation? number|nil
---@field connection? table|nil
---@field failure_code? string|nil
---@field id string
---@field requested_controller string
---@field requested_generation number
---@field status string

---@class BrowserSessionControlLoadMatch
---@field browser_session_id string
---@field id string
---@field organization_id string

---@class BrowserSessionEvent
---@field browser_task_id? string|nil
---@field created_at string
---@field id string
---@field kind string
---@field payload table
---@field source_sequence? number|nil

---@class BrowserSessionEventListMatch
---@field browser_session_id string
---@field organization_id string
---@field after? string

---@class BrowserSessionMedia
---@field browser_session_id string
---@field capture_omissions? table|nil
---@field captured_at? string|nil
---@field ended_at? string|nil
---@field failure_code? string|nil
---@field files table
---@field frames? number|nil
---@field id string
---@field kind string
---@field partial boolean
---@field retention_expires_at string
---@field source? table|nil
---@field status string
---@field stop_requested_at? string|nil

---@class BrowserSessionMediaLoadMatch
---@field browser_session_id string
---@field id string
---@field organization_id string

---@class BrowserSessionRecording
---@field id? string
---@field idempotency_key? string
---@field wait? boolean

---@class BrowserSessionRecordingCreateData
---@field browser_session_id string
---@field organization_id string
---@field idempotency_key? string
---@field wait? boolean

---@class BrowserSessionScreenshot
---@field idempotency_key? string
---@field wait? boolean

---@class BrowserSessionScreenshotCreateData
---@field browser_session_id string
---@field organization_id string
---@field idempotency_key? string
---@field wait? boolean

---@class BrowserSessionTask
---@field activity? table|nil
---@field browser_session_id string
---@field cancel_requested_at? string|nil
---@field completed_at? string|nil
---@field control_generation? number|nil
---@field deadline_at string
---@field effects_unknown boolean
---@field failure_code? string|nil
---@field id string
---@field idempotency_key? string
---@field instruction string
---@field max_rounds number
---@field max_seconds? number
---@field model_selection table
---@field outcome? string|nil
---@field result table
---@field started_at? string|nil
---@field status string

---@class BrowserSessionTaskLoadMatch
---@field browser_session_id string
---@field id string
---@field organization_id string

---@class BrowserSessionTaskCreateData
---@field browser_session_id string
---@field organization_id string
---@field idempotency_key? string
---@field instruction string
---@field max_rounds? number
---@field max_seconds? number
---@field outcome? string|nil

---@class CatalogSelector
---@field app table

---@class CatalogSelectorListMatch
---@field app_id string

---@class CdnDeployment
---@field id? string

---@class CdnDeploymentLoadMatch
---@field app_id string
---@field cdn_id string
---@field id string

---@class CdnDeploymentListMatch
---@field app_id string
---@field cdn_id string

---@class CdnDeploymentCreateData
---@field app_id string
---@field cdn_id string

---@class CdnHostname
---@field app_cdn_distribution_id string
---@field created_at string
---@field dns_status string
---@field force_ssl boolean
---@field hostname string
---@field id string
---@field provider_hostname_id string|nil
---@field tls_status string
---@field updated_at string

---@class CdnHostnameLoadMatch
---@field app_id string
---@field cdn_id string
---@field id string

---@class CdnHostnameListMatch
---@field app_id string
---@field cdn_id string

---@class CdnHostnameCreateData
---@field app_id string
---@field cdn_id string
---@field dns_status? string
---@field force_ssl? boolean
---@field hostname string
---@field tls_status? string

---@class CdnHostnameUpdateData
---@field app_id string
---@field cdn_id string
---@field id string

---@class CdnHostnamePatchData
---@field app_id string
---@field cdn_id string
---@field id string

---@class CdnHostnameRemoveMatch
---@field app_id string
---@field cdn_id string
---@field id string

---@class CdnSpace
---@field id? string

---@class CdnSpaceLoadMatch
---@field id string

---@class CdnSpaceListMatch
---@field organization_id string

---@class CdnSpaceCreateData
---@field organization_id string

---@class CdnSpaceUpdateData
---@field id string

---@class CdnSpacePatchData
---@field id string

---@class CdnSpaceRemoveMatch
---@field id string

---@class CdnSpaceObject
---@field id? string

---@class CdnSpaceObjectLoadMatch
---@field cdn_space_id string
---@field id string

---@class CdnSpaceObjectListMatch
---@field cdn_space_id string

---@class CdnSpaceObjectUpdateData
---@field cdn_space_id string

---@class CdnSpaceObjectRemoveMatch
---@field cdn_space_id string
---@field id string

---@class ConnectionRequest
---@field agent_card_url string
---@field auth_scheme string
---@field can_configure boolean
---@field can_disconnect boolean
---@field can_setup boolean
---@field error_code string|nil
---@field generation number
---@field id string
---@field name string
---@field remote_agent string|nil
---@field retired_at string|nil
---@field revoked_at string|nil
---@field source_operation_id string|nil
---@field state string

---@class ConnectionRequestLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class ConnectionSource
---@field device_id string
---@field device_name string
---@field provider string
---@field source_operation_id string
---@field title string

---@class ConnectionSourceListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class CoordinationWait
---@field can_stop boolean
---@field expires_at string
---@field id string
---@field status string
---@field stop_state string|nil
---@field wake_outcome string|nil

---@class CoordinationWaitListMatch
---@field agent_id string
---@field coordination_id string
---@field organization_id string
---@field cursor? string

---@class CredentialSignInCheck
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field paywalled boolean
---@field permissions table
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class CredentialSignInCheckCreateData
---@field credential_id string
---@field organization_id string
---@field project_id string
---@field environment_id string

---@class DataResourceRotateCredential
---@field app_environment_id string|nil
---@field created_at string
---@field engine string
---@field failure_message string|nil
---@field high_availability boolean
---@field hosted_app_id string
---@field id string
---@field kind string
---@field name string
---@field plan string|nil
---@field provider_metadata table
---@field region string|nil
---@field slug string
---@field status string
---@field storage_gb number|nil
---@field storage_label string|nil
---@field updated_at string
---@field version string|nil

---@class DataResourceRotateCredentialCreateData
---@field app_id string
---@field data_resource_id string

---@class DeepScan
---@field account_id? string|nil
---@field active table
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorations table
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field idempotency_key? string
---@field launch_options table
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field pagination table
---@field paywalled boolean
---@field permissions table
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class DeepScanLoadMatch
---@field id string
---@field organization_id string
---@field agent_id? string
---@field evidence? string
---@field finding_id? string
---@field project_id? string

---@class DeepScanListMatch
---@field organization_id string
---@field finding? string
---@field page? number
---@field project_id? string
---@field query? string
---@field status? string

---@class DeepScanCreateData
---@field organization_id string
---@field project_id? string
---@field account_id? string|nil
---@field concurrency? number
---@field environment_id string
---@field goal string
---@field idempotency_key? string
---@field max_seconds? number
---@field max_testers? number

---@class DeepScanFinding
---@field finding_count number
---@field finding_ids table
---@field findings table
---@field findings_fix_prompt string|nil
---@field free_findings_pending boolean
---@field id string
---@field mode string
---@field permissions table
---@field priority string|nil
---@field priority_counts table
---@field project_id string|nil
---@field reproduction_of table|nil
---@field reproductions table
---@field reruns_available boolean
---@field status string
---@field title string
---@field unlock table
---@field web_url string

---@class DeepScanFindingListMatch
---@field deep_scan_id string
---@field organization_id string
---@field priority? string
---@field project_id? string

---@class DeepScanFlow
---@field account_id? string|nil
---@field concurrency? number
---@field environment_id? string
---@field exploration_id? string
---@field flow_names table
---@field idempotency_key? string
---@field max_seconds? number
---@field max_testers? number
---@field note? string|nil

---@class DeepScanFlowCreateData
---@field organization_id string
---@field project_id? string
---@field account_id? string|nil
---@field concurrency? number
---@field environment_id? string
---@field exploration_id? string
---@field flow_names table
---@field idempotency_key? string
---@field max_seconds? number
---@field max_testers? number
---@field note? string|nil

---@class DeepScanMappedFlow
---@field account_id string|nil
---@field environment_id string
---@field flow_map table|nil
---@field revision_id string|nil

---@class DeepScanMappedFlowListMatch
---@field organization_id string
---@field account_id? string
---@field environment_id string
---@field project_id? string

---@class DeepScanOption
---@field accounts table
---@field deep_scan_defaults? any
---@field flow_map table|nil
---@field id string
---@field name string
---@field personas? table
---@field preview? boolean
---@field target_url string|nil

---@class DeepScanOptionListMatch
---@field organization_id string
---@field environment_query? string
---@field project_id? string

---@class DemoShare
---@field head_sha string
---@field id? string
---@field recording table
---@field summary string

---@class DemoShareLoadMatch
---@field id string

---@class DemoShareSegment
---@field id? string

---@class DemoShareSegmentLoadMatch
---@field demo_share_id string
---@field id string

---@class DeploymentDashboardNomad

---@class DeploymentDashboardNomadLoadMatch
---@field app_id string
---@field environment? string
---@field location? string
---@field service? string

---@class DeploymentFile

---@class DeploymentFileUpdateData
---@field deployment_id string
---@field static_site_id string

---@class DomainPathRule
---@field action_kind string
---@field app_service_endpoint_id string|nil
---@field app_service_id string|nil
---@field backend_ref string|nil
---@field created_at string
---@field id string
---@field last_error string|nil
---@field path_prefix string
---@field status string
---@field updated_at string

---@class DomainPathRuleLoadMatch
---@field app_id string
---@field domain_id string
---@field id string

---@class DomainPathRuleListMatch
---@field app_id string
---@field domain_id string

---@class DomainPathRuleCreateData
---@field app_id string
---@field domain_id string
---@field app_service_endpoint_id? string|nil
---@field app_service_id string|nil
---@field path_prefix string

---@class DomainPathRuleUpdateData
---@field app_id string
---@field domain_id string
---@field id string
---@field app_service_endpoint_id? string|nil
---@field app_service_id? string|nil
---@field path_prefix? string

---@class DomainPathRulePatchData
---@field app_id string
---@field domain_id string
---@field id string
---@field app_service_endpoint_id? string|nil
---@field app_service_id? string|nil
---@field path_prefix? string

---@class DomainPathRuleRemoveMatch
---@field app_id string
---@field domain_id string
---@field id string

---@class Dream
---@field attention boolean
---@field changes table
---@field completed_at string|nil
---@field counts table
---@field dream any
---@field error_code string|nil
---@field id string
---@field pagination table
---@field permissions table
---@field phase string
---@field reason string|nil
---@field reviewed number
---@field reviewed_date string
---@field runs table
---@field scope_name string
---@field skipped number
---@field tab string
---@field timezone string

---@class DreamLoadMatch
---@field id string
---@field organization_id string
---@field page? number
---@field project_id string
---@field tab? string

---@class DreamListMatch
---@field organization_id string
---@field page? number
---@field project_id string

---@class DreamCreateData
---@field id string
---@field organization_id string
---@field project_id string
---@field attention boolean
---@field changes table
---@field completed_at string|nil
---@field counts table
---@field dream any
---@field error_code string|nil
---@field pagination table
---@field permissions table
---@field phase string
---@field reason string|nil
---@field reviewed number
---@field reviewed_date string
---@field runs table
---@field scope_name string
---@field skipped number
---@field tab string
---@field timezone string

---@class Environment
---@field active_revision_id string|nil
---@field agent_sign_up_available boolean
---@field allowed_actions string
---@field billing table
---@field cleanup table
---@field connection string
---@field created_at string
---@field default_policy? table
---@field default_policy_json table
---@field discovery_defaults table
---@field environment table
---@field exploration_accounts? table
---@field explorations? table
---@field first_run? any
---@field hosted_app_id string|nil
---@field id string
---@field imessage_number string|nil
---@field included_deep_scan boolean
---@field lock_version number
---@field managed_google_available boolean
---@field managed_google_email string
---@field messaging_tester_number? string|nil
---@field name string
---@field network_connections table
---@field onboarding_discovery? any
---@field organization_id string
---@field pending_accounts? table
---@field permissions table
---@field project_id string|nil
---@field repository_id string|nil
---@field revisions table
---@field setup_discovery_id? string|nil
---@field sign_in_check_available boolean
---@field slug string
---@field status string
---@field target_kind string|nil
---@field target_url string|nil
---@field test_accounts table
---@field updated_at string
---@field verify_network_connection_id string|nil
---@field version? number

---@class EnvironmentLoadMatch
---@field id string
---@field organization_id string
---@field project_id? string

---@class EnvironmentListMatch
---@field organization_id string
---@field project_id? string

---@class EnvironmentCreateData
---@field organization_id string
---@field allowed_actions? string
---@field default_policy? table
---@field imessage_number? string|nil
---@field messaging_tester_number? string|nil
---@field name? string
---@field project_id? string|nil
---@field repository_id? string|nil
---@field slug string
---@field target_kind? string|nil
---@field target_url? string|nil

---@class EnvironmentUpdateData
---@field id string
---@field organization_id string

---@class EnvironmentPatchData
---@field id string
---@field organization_id string
---@field allowed_actions? string
---@field imessage_number? string|nil
---@field messaging_tester_number? string|nil
---@field name? string
---@field target_url? string|nil
---@field verify_network_connection_id? string|nil
---@field version? number

---@class EnvironmentRemoveMatch
---@field id string
---@field organization_id string

---@class EnvironmentDiscoveryRun
---@field account_id string|nil
---@field deadline_at string
---@field environment_revision_id string
---@field evidence? table
---@field failure_code string|nil
---@field id string
---@field queued_at string
---@field recording table
---@field result table|nil
---@field status string

---@class EnvironmentDiscoveryRunLoadMatch
---@field environment_id string
---@field id string
---@field organization_id string

---@class EnvironmentDiscoveryRunCreateData
---@field environment_id string
---@field organization_id string
---@field account_id? string|nil

---@class EnvironmentExploration
---@field account_id? string|nil
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field idempotency_key? string
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field paywalled boolean
---@field permissions table
---@field persona_id? string|nil
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class EnvironmentExplorationCreateData
---@field environment_id string
---@field organization_id string
---@field project_id string
---@field account_id? string|nil
---@field concurrency? number
---@field goal string
---@field idempotency_key? string
---@field max_seconds? number
---@field max_testers? number
---@field persona_id? string|nil

---@class EnvironmentFirstRun

---@class EnvironmentFirstRunCreateData
---@field environment_id string
---@field organization_id string

---@class EnvironmentRevision
---@field allowed_origins table
---@field app_environment_id string|nil
---@field app_release_id string|nil
---@field blueprint table
---@field blueprint_json table
---@field cleanup_state string
---@field created_at string
---@field digest string
---@field dry_run? boolean
---@field expires_at string|nil
---@field id string
---@field organization_id string
---@field ready_at string|nil
---@field resolved_manifest_json table
---@field retention_policy_json table
---@field revision number
---@field revoked_at string|nil
---@field runner_environment_revision_id string|nil
---@field safety_policy_json table
---@field schema_version number
---@field source_metadata? table
---@field source_metadata_json table
---@field status string
---@field updated_at string
---@field validation_json table
---@field verify_environment_id string

---@class EnvironmentRevisionLoadMatch
---@field environment_id string
---@field id string
---@field organization_id string

---@class EnvironmentRevisionCreateData
---@field environment_id string
---@field organization_id string
---@field blueprint table
---@field dry_run? boolean
---@field source_metadata? table

---@class EnvironmentRevisionUpdateData
---@field environment_id string
---@field id string
---@field organization_id string

---@class EnvironmentSecretBinding
---@field env_key string
---@field id? string
---@field mode? string
---@field secret_id? string
---@field secret_version_id? string

---@class EnvironmentSecretBindingListMatch
---@field app_id string
---@field environment_id string

---@class EnvironmentSecretBindingCreateData
---@field app_id string
---@field environment_id string
---@field env_key string
---@field mode? string
---@field secret_id? string
---@field secret_version_id? string

---@class EnvironmentSecretBindingRemoveMatch
---@field app_id string
---@field environment_id string
---@field id string

---@class EnvironmentTestAccount
---@field configured boolean
---@field credentials table
---@field id? string
---@field persona string
---@field revision_id string
---@field role string
---@field tenant string

---@class EnvironmentTestAccountListMatch
---@field environment_id string
---@field organization_id string

---@class EnvironmentTestAccountUpdateData
---@field environment_id string
---@field id string
---@field organization_id string

---@class EnvironmentTestAccountPatchData
---@field environment_id string
---@field id string
---@field organization_id string
---@field credentials? table
---@field revision_id? string

---@class Evidence
---@field id? string

---@class EvidenceLoadMatch
---@field id? string
---@field organization_id string
---@field agent_id? string
---@field cursor? string
---@field exploration_id? string
---@field kind? string
---@field limit? number
---@field repository_id? string
---@field scenario_run_id? string

---@class Exploration
---@field account_id? string|nil
---@field active table
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorations table
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field idempotency_key? string
---@field launch_options table
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field pagination table
---@field paywalled boolean
---@field permissions table
---@field persona_id? string|nil
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class ExplorationLoadMatch
---@field id string
---@field organization_id string
---@field agent_id? string
---@field evidence? string
---@field finding_id? string
---@field project_id? string

---@class ExplorationListMatch
---@field organization_id string
---@field launch? boolean
---@field page? number
---@field project_id? string

---@class ExplorationCreateData
---@field organization_id string
---@field project_id? string
---@field account_id? string|nil
---@field concurrency? number
---@field environment_id string
---@field goal string
---@field idempotency_key? string
---@field max_seconds? number
---@field max_testers? number
---@field persona_id? string|nil

---@class ExplorationMessage
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field paywalled boolean
---@field permissions table
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field text string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class ExplorationMessageCreateData
---@field exploration_id string
---@field organization_id string
---@field project_id? string
---@field text string

---@class ExplorationReport

---@class ExplorationReportLoadMatch
---@field exploration_id string
---@field organization_id string
---@field project_id? string

---@class ExplorationReportCreateData
---@field exploration_id string
---@field organization_id string
---@field project_id? string
---@field source_ids? any

---@class ExplorationScenario
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field deadline_at string
---@field demo_project table|nil
---@field ended_early boolean
---@field environment_id string
---@field environment_name string
---@field explorer_activity table
---@field finding_count number
---@field findings table
---@field findings_fix_prompt string|nil
---@field finished_at? string|nil
---@field goal string
---@field huntable_flows table
---@field id string
---@field max_seconds number
---@field max_testers number
---@field mode? string
---@field next_scan_improvements table
---@field observed_at? string
---@field onboarding boolean
---@field paywalled boolean
---@field permissions table
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_generation table
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field startup_retryable? boolean
---@field status string
---@field time_limit_reached boolean
---@field title? string
---@field unlock any
---@field web_url string

---@class ExplorationScenarioCreateData
---@field exploration_id string
---@field organization_id string
---@field project_id? string

---@class Finding
---@field confidence string
---@field created_at string
---@field deferred_until? string|nil
---@field finding table
---@field fingerprint string
---@field first_seen_at string
---@field id string
---@field last_seen_at string
---@field locked boolean
---@field occurrence_count number
---@field organization_id string
---@field permissions table
---@field reason? string
---@field reported_occurrence table|nil
---@field repository_id string|nil
---@field safe_summary string
---@field scenario_occurrences? table
---@field severity string
---@field status string
---@field title string
---@field updated_at string
---@field verification any

---@class FindingLoadMatch
---@field id string
---@field organization_id string
---@field repository_id? string

---@class FindingListMatch
---@field organization_id string
---@field status? string

---@class FindingUpdateData
---@field id string
---@field organization_id string

---@class FindingPatchData
---@field id string
---@field organization_id string
---@field repository_id? string
---@field deferred_until? string|nil
---@field reason? string
---@field status? string

---@class GithubConnection
---@field accounts table
---@field github_app_installation_id string
---@field installations table
---@field project_id? string
---@field replace? boolean
---@field repositories table

---@class GithubConnectionListMatch
---@field organization_id string
---@field github_app_installation_id? string
---@field project_id? string

---@class GithubConnectionCreateData
---@field organization_id string
---@field github_app_installation_id string
---@field project_id? string
---@field replace? boolean
---@field repositories table

---@class HostingAppDomain
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field certificate table|nil
---@field created_at string
---@field dns_mode string
---@field dns_status string
---@field failure_message string|nil
---@field hosted_app_id string
---@field hostname string
---@field id string
---@field kind string
---@field last_checked_at string|nil
---@field path_rules table
---@field record_name string|nil
---@field record_type string|nil
---@field record_value string|nil
---@field redirect_to string|nil
---@field static_site_id string|nil
---@field target_kind string
---@field tls_status string
---@field updated_at string
---@field verification_record table|nil
---@field verification_status string

---@class HostingAppDomainLoadMatch
---@field app_id string
---@field id string

---@class HostingAppDomainListMatch
---@field app_id string
---@field app_environment_id? string

---@class HostingAppDomainCreateData
---@field app_id string
---@field app_environment_id? string|nil
---@field app_service_id string|nil
---@field dns_status? string
---@field hostname string
---@field kind string
---@field redirect_to? string|nil
---@field tls_status? string

---@class HostingAppDomainUpdateData
---@field app_id string
---@field id string

---@class HostingAppDomainPatchData
---@field app_id string
---@field id string

---@class HostingAppDomainRemoveMatch
---@field app_id string
---@field id string

---@class ImageRepository
---@field auth_configured boolean
---@field created_at string
---@field created_at_label string|nil
---@field hosted_app_id string|nil
---@field id string
---@field name string
---@field organization_id string
---@field provider_kind string
---@field registry_auth_token? string
---@field repository_path string
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil
---@field visibility string

---@class ImageRepositoryListMatch
---@field organization_id string

---@class ImageRepositoryCreateData
---@field organization_id string
---@field hosted_app_id? string|nil
---@field name string
---@field provider_kind? string
---@field registry_auth_token? string
---@field repository_path? string
---@field slug string
---@field status? string
---@field visibility? string

---@class Integration
---@field github table
---@field gitlab table
---@field permissions table
---@field slack table

---@class IntegrationListMatch
---@field organization_id string

---@class InteractionResponse
---@field answer table
---@field conversation_id string
---@field expected_revision number

---@class InteractionResponseCreateData
---@field agent_id string
---@field interaction_id string
---@field organization_id string
---@field answer table
---@field conversation_id string
---@field expected_revision number

---@class Invitation
---@field accepted_at string|nil
---@field accepted_by_user any
---@field created_at string
---@field created_at_label string|nil
---@field email string
---@field email_delivery_status? string
---@field expires_at string|nil
---@field expires_at_label string|nil
---@field id string
---@field invite_url string|nil
---@field invited_by_user any
---@field organization table
---@field revoked_at string|nil
---@field role string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil

---@class InvitationListMatch
---@field organization_id string

---@class InvitationCreateData
---@field organization_id string
---@field email string
---@field role string

---@class InvitationRemoveMatch
---@field id string
---@field organization_id string

---@class JourneyVariantReplay
---@field actor_id string|nil
---@field can_request_qualification boolean
---@field created_at string
---@field failure_code string|nil
---@field failure_message string|nil
---@field id string
---@field idempotency_key string
---@field max_seconds? number
---@field preparation_receipt table|nil
---@field qualification any
---@field qualification_status string
---@field replay_required boolean
---@field review_reason string
---@field run_id string|nil
---@field scenario_file table
---@field scenario_run_id string|nil
---@field source_digest string
---@field status string
---@field updated_at string
---@field variant_id string

---@class JourneyVariantReplayCreateData
---@field journey_variant_id string
---@field organization_id string
---@field project_id string
---@field actor_id? string|nil
---@field idempotency_key string
---@field max_seconds? number
---@field review_reason string
---@field scenario_file table

---@class Knowledge
---@field content_digest string
---@field content_json table
---@field document table
---@field documents table
---@field dreaming table
---@field expected_digest string
---@field history table
---@field id string
---@field kind string
---@field markdown string
---@field observed_at string
---@field organization table
---@field permissions table
---@field project_id string
---@field project_name string
---@field projects table
---@field selected_project_id string|nil
---@field source table
---@field title string
---@field total number

---@class KnowledgeLoadMatch
---@field id? string
---@field organization_id string
---@field project_id? string
---@field q? string

---@class KnowledgeCreateData
---@field organization_id string
---@field markdown string
---@field project_id string
---@field title string

---@class KnowledgeUpdateData
---@field id string
---@field organization_id string

---@class KnowledgePatchData
---@field id string
---@field organization_id string
---@field expected_digest? string
---@field markdown? string
---@field title? string

---@class KnowledgeRemoveMatch
---@field id string
---@field organization_id string

---@class LocalThreadDelivery
---@field decision string
---@field decision_pending boolean
---@field delivery table
---@field expected_version number
---@field id? string
---@field policy table
---@field recovery_message string|nil

---@class LocalThreadDeliveryLoadMatch
---@field agent_id string
---@field id string
---@field local_thread_id string
---@field organization_id string
---@field expected_version? number

---@class LocalThreadDeliveryUpdateData
---@field agent_id string
---@field id string
---@field local_thread_id string
---@field organization_id string
---@field decision? string
---@field expected_version? number

---@class LocalThreadOperation
---@field action string
---@field arguments table
---@field created_at string
---@field delivery table
---@field device_id string
---@field diagnostic_code? string
---@field end table
---@field expires_at string
---@field id string
---@field key string
---@field provider string
---@field references table
---@field result any
---@field result_expired boolean
---@field state string

---@class LocalThreadOperationLoadMatch
---@field agent_id string
---@field id string
---@field local_thread_id? string
---@field organization_id string

---@class LocalThreadOperationCreateData
---@field agent_id string
---@field local_thread_id string
---@field organization_id string
---@field action string
---@field arguments table
---@field key string

---@class Location
---@field code string
---@field created_at string
---@field id string
---@field name string
---@field nomad_datacenter string
---@field updated_at string

---@class LocationListMatch
---@field code? string
---@field created_at? string
---@field id? string
---@field name? string
---@field nomad_datacenter? string
---@field updated_at? string

---@class Me
---@field active_organization any
---@field analytics_distinct_id? string
---@field analytics_internal boolean
---@field api_base_url? string
---@field api_token? string
---@field app_promotion table
---@field commit_author_email string
---@field email string
---@field enabled_features table
---@field github_pr_user_authorization_connected boolean
---@field github_pr_user_authorization_login string|nil
---@field github_prs_authored_by_change_author boolean
---@field id string
---@field impersonation table|nil
---@field name string|nil
---@field next_path? string
---@field onboarding table
---@field openai_sign_in_connected? boolean
---@field openai_sign_in_enabled? boolean
---@field organizations table
---@field pending_organization_invitation_count number
---@field pending_organization_invitation_count_label string
---@field picture_url string|nil
---@field superadmin? boolean
---@field time_zone? string|nil

---@class MeLoadMatch
---@field active_organization? any
---@field analytics_distinct_id? string
---@field analytics_internal? boolean
---@field api_base_url? string
---@field api_token? string
---@field app_promotion? table
---@field commit_author_email? string
---@field email? string
---@field enabled_features? table
---@field github_pr_user_authorization_connected? boolean
---@field github_pr_user_authorization_login? string|nil
---@field github_prs_authored_by_change_author? boolean
---@field id string
---@field impersonation? table|nil
---@field name? string|nil
---@field next_path? string
---@field onboarding? table
---@field openai_sign_in_connected? boolean
---@field openai_sign_in_enabled? boolean
---@field organizations? table
---@field pending_organization_invitation_count? number
---@field pending_organization_invitation_count_label? string
---@field picture_url? string|nil
---@field superadmin? boolean
---@field time_zone? string|nil

---@class MeCreateData
---@field action_name? any
---@field confirmation? any

---@class MeUpdateData

---@class MeRemoveMatch
---@field active_organization? any
---@field analytics_distinct_id? string
---@field analytics_internal? boolean
---@field api_base_url? string
---@field api_token? string
---@field app_promotion? table
---@field commit_author_email? string
---@field email? string
---@field enabled_features? table
---@field github_pr_user_authorization_connected? boolean
---@field github_pr_user_authorization_login? string|nil
---@field github_prs_authored_by_change_author? boolean
---@field id string
---@field impersonation? table|nil
---@field name? string|nil
---@field next_path? string
---@field onboarding? table
---@field openai_sign_in_connected? boolean
---@field openai_sign_in_enabled? boolean
---@field organizations? table
---@field pending_organization_invitation_count? number
---@field pending_organization_invitation_count_label? string
---@field picture_url? string|nil
---@field superadmin? boolean
---@field time_zone? string|nil

---@class MeEmail
---@field account boolean
---@field can_delete boolean
---@field can_resend_verification boolean
---@field can_set_account boolean
---@field can_set_commit_author boolean
---@field commit_author boolean
---@field email string
---@field emails table
---@field id string
---@field message? string
---@field verification_status string
---@field verified boolean

---@class MeEmailListMatch
---@field account? boolean
---@field can_delete? boolean
---@field can_resend_verification? boolean
---@field can_set_account? boolean
---@field can_set_commit_author? boolean
---@field commit_author? boolean
---@field email? string
---@field emails? table
---@field id? string
---@field message? string
---@field verification_status? string
---@field verified? boolean

---@class MeEmailCreateData
---@field email string

---@class MeEmailUpdateData
---@field id string

---@class MeEmailPatchData
---@field id string
---@field account? boolean
---@field commit_author? boolean

---@class MeEmailRemoveMatch
---@field id string

---@class MeOnboarding

---@class MeOnboardingCreateData
---@field step? any

---@class MediaFile
---@field id? string

---@class MediaFileLoadMatch
---@field browser_session_id string
---@field id string
---@field media_id string
---@field organization_id string
---@field inline? boolean

---@class Member
---@field accepted_at string|nil
---@field accepted_by_user any
---@field created_at string
---@field created_at_label string|nil
---@field email string
---@field email_delivery_status? string
---@field expires_at string|nil
---@field expires_at_label string|nil
---@field id string
---@field invite_url string|nil
---@field invited_by_user any
---@field is_self boolean
---@field organization table
---@field revoked_at string|nil
---@field role string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil
---@field user table

---@class MemberListMatch
---@field organization_id string

---@class MemberUpdateData
---@field id string
---@field organization_id string
---@field role? string

---@class MemberPatchData
---@field id string
---@field organization_id string
---@field role? string

---@class MemberRemoveMatch
---@field id string
---@field organization_id string

---@class Memory
---@field confidence string
---@field created_at string
---@field environment_id? string
---@field finding string
---@field history table
---@field id string
---@field indexed_at string|nil
---@field memory table
---@field project_id? string
---@field response? string
---@field scope table
---@field source table
---@field tags? table
---@field title string
---@field workaround? string

---@class MemoryLoadMatch
---@field id string
---@field organization_id string
---@field environment_id? string
---@field project_id? string

---@class MemoryListMatch
---@field organization_id string
---@field environment_id? string
---@field include_environment? boolean
---@field project_id? string
---@field q? string
---@field tag? string

---@class MemoryCreateData
---@field organization_id string
---@field environment_id? string
---@field finding string
---@field project_id? string
---@field response? string
---@field tags? table
---@field title string
---@field workaround? string

---@class MemoryRemoveMatch
---@field id string
---@field organization_id string
---@field project_id? string

---@class MergeRequest
---@field available_tests table
---@field base_sha string
---@field branch? string
---@field comment_url string|nil
---@field current_run? any
---@field draft boolean
---@field findings table
---@field github_repository string|nil
---@field github_url string|nil
---@field head_sha string
---@field id string
---@field idempotency_key string
---@field number number
---@field pagination table
---@field permissions table
---@field preview_cleanup_ready boolean
---@field preview_url? string|nil
---@field project? any
---@field project_id string|nil
---@field project_slug string|nil
---@field provider string
---@field pull_request table
---@field repository_id string
---@field request_label string
---@field requested_run_id string|nil
---@field runs table
---@field source_branch string|nil
---@field source_repository string|nil
---@field source_url string|nil
---@field state string
---@field title string
---@field updated_at string
---@field web_path string

---@class MergeRequestLoadMatch
---@field id string
---@field organization_id string
---@field page? number

---@class MergeRequestCreateData
---@field organization_id string
---@field branch? string
---@field head_sha? string
---@field idempotency_key string
---@field number number
---@field project_id? string|nil
---@field repository_id? string

---@class MessagingConversationMessage
---@field attachment_limit number
---@field attachment_max_bytes number
---@field client_operation_id string
---@field content string
---@field id? string
---@field media table
---@field media_upload_ids? table
---@field messages table
---@field reply_to? string
---@field retry_attachment? boolean
---@field send_blocked_reason string|nil
---@field send_disposition? string
---@field send_error? string|nil
---@field send_style? string|nil

---@class MessagingConversationMessageCreateData
---@field messaging_conversation_id string
---@field organization_id string
---@field project_id string
---@field client_operation_id string
---@field content string
---@field media table
---@field media_upload_ids? table
---@field reply_to? string
---@field retry_attachment? boolean
---@field send_style? string|nil

---@class MessagingConversationUpload
---@field attachment table
---@field upload_id string

---@class MessagingConversationUploadCreateData
---@field messaging_conversation_id string
---@field organization_id string
---@field project_id string

---@class MetricQuery

---@class MetricQueryListMatch

---@class NetworkConnection
---@field aws_client_vpn_profile? string
---@field created_at string
---@field device_tag? string
---@field id string
---@field name string
---@field oauth_client_id? string
---@field oauth_client_secret? string
---@field provider? string
---@field status? string
---@field updated_at string

---@class NetworkConnectionCreateData
---@field organization_id string
---@field aws_client_vpn_profile? string
---@field device_tag? string
---@field name string
---@field oauth_client_id? string
---@field oauth_client_secret? string
---@field provider? string
---@field status? string

---@class NetworkConnectionUpdateData
---@field id string
---@field organization_id string

---@class NetworkConnectionPatchData
---@field id string
---@field organization_id string
---@field aws_client_vpn_profile? string
---@field device_tag? string
---@field name? string
---@field oauth_client_id? string
---@field oauth_client_secret? string
---@field provider? string
---@field status? string

---@class NomadAllocation
---@field allocation_id string
---@field client_status string|nil
---@field create_time string|nil
---@field datacenter string|nil
---@field desired_description string|nil
---@field desired_status string|nil
---@field fetched_at string
---@field id? string
---@field job_id string|nil
---@field modify_time string|nil
---@field name string|nil
---@field namespace string
---@field node_id string|nil
---@field node_name string|nil
---@field resources table
---@field task_group string|nil
---@field task_states table
---@field verify_runner_images? table

---@class NomadAllocationLoadMatch
---@field app_id string
---@field id string

---@class NomadLog
---@field allocation_id string
---@field environment? string
---@field fetched_at string
---@field location? string|nil
---@field logs string
---@field namespace string
---@field offset number
---@field origin string
---@field service? string
---@field task string
---@field type string

---@class NomadLogListMatch
---@field app_id string
---@field environment? string
---@field location? string
---@field offset? number
---@field origin? string
---@field service? string
---@field task? string
---@field type? string

---@class Organization
---@field activated_products table
---@field agents_only? boolean
---@field can_activate_products boolean
---@field created_at string
---@field created_at_label string|nil
---@field github_prs_authored_by_change_author boolean
---@field google_workspace_domain? string|nil
---@field id string
---@field logo_url string|nil
---@field member_count number
---@field name string
---@field pending_invitation_count number
---@field personal boolean
---@field repository_count number
---@field role string|nil
---@field sandbox_region string
---@field shared_agent_personal_accounts_enabled? boolean
---@field slug string
---@field source_control_providers? table
---@field source_ui_enabled? boolean
---@field timezone string
---@field updated_at string
---@field updated_at_label string|nil
---@field verify_pr_scenario_writing_enabled boolean

---@class OrganizationLoadMatch
---@field id string

---@class OrganizationListMatch
---@field activated_products? table
---@field agents_only? boolean
---@field can_activate_products? boolean
---@field created_at? string
---@field created_at_label? string|nil
---@field github_prs_authored_by_change_author? boolean
---@field google_workspace_domain? string|nil
---@field id? string
---@field logo_url? string|nil
---@field member_count? number
---@field name? string
---@field pending_invitation_count? number
---@field personal? boolean
---@field repository_count? number
---@field role? string|nil
---@field sandbox_region? string
---@field shared_agent_personal_accounts_enabled? boolean
---@field slug? string
---@field source_control_providers? table
---@field source_ui_enabled? boolean
---@field timezone? string
---@field updated_at? string
---@field updated_at_label? string|nil
---@field verify_pr_scenario_writing_enabled? boolean

---@class OrganizationCreateData
---@field name string
---@field slug string
---@field timezone? string

---@class OrganizationUpdateData
---@field id string
---@field github_prs_authored_by_change_author? boolean
---@field google_workspace_domain? string|nil
---@field name? string
---@field sandbox_region? string
---@field shared_agent_personal_accounts_enabled? boolean
---@field slug? string
---@field timezone? string
---@field verify_pr_scenario_writing_enabled? boolean

---@class OrganizationPatchData
---@field id string
---@field github_prs_authored_by_change_author? boolean
---@field google_workspace_domain? string|nil
---@field name? string
---@field sandbox_region? string
---@field shared_agent_personal_accounts_enabled? boolean
---@field slug? string
---@field timezone? string
---@field verify_pr_scenario_writing_enabled? boolean

---@class Page
---@field active_runs table
---@field checkout_required boolean
---@field cli_signed_in_at string|nil
---@field counts table
---@field demo_project table|nil
---@field environments table
---@field included_deep_scan boolean
---@field onboarding_discovery? any
---@field organization table
---@field permissions table
---@field project any
---@field pull_request_launch_options? table
---@field pull_requests? table
---@field repositories table
---@field runs table
---@field runs_pagination table
---@field suggested_app_url string|nil
---@field url_first_start boolean

---@class PageLoadMatch
---@field organization_id string
---@field page? number
---@field project_id? string
---@field query? string
---@field section? string
---@field status? string
---@field verify_environment_id? string

---@class PageAgent
---@field agents table
---@field can_edit_integration_connections boolean
---@field creation_enabled boolean
---@field inbox? any
---@field integration_choices table
---@field integration_choices_truncated boolean
---@field integration_selected table
---@field model_choices? table
---@field new_configuration any
---@field organization_id string
---@field pagination table
---@field pinned_agent any
---@field platform_event_types table
---@field repository_choices table
---@field repository_choices_truncated boolean
---@field runtime_versions? table
---@field selected_agent any
---@field selected_reference string|nil
---@field viewer_id string

---@class PageAgentLoadMatch
---@field organization_id string
---@field agent? string
---@field agent_search? string
---@field agent_visibility? string
---@field cursor? string
---@field limit? number

---@class PageAgentListMatch
---@field organization_id string
---@field agent? string
---@field agent_search? string
---@field agent_visibility? string
---@field cursor? string
---@field integration_search? string
---@field limit? number

---@class PageAgentCreateData
---@field organization_id string
---@field agent_ids? any

---@class PageProjectRun
---@field available_tests table
---@field fix_scenario_count number
---@field fix_scenarios table
---@field fixable_count number
---@field id? string
---@field pagination table
---@field permissions table
---@field preparation_reason string|nil
---@field project table
---@field run table
---@field scenario_runs table
---@field selected_scenario_run any
---@field web_path string

---@class PageProjectRunLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field browser? string
---@field detail? boolean
---@field page? number

---@class PagesProjectCredential
---@field browser_authentication? table|nil
---@field composal_address string|nil
---@field configured boolean
---@field credential_keys table
---@field description string|nil
---@field email_link_auth_origins table
---@field has_inbox boolean
---@field id string
---@field identity_provider table|nil
---@field instructions string|nil
---@field login_method string
---@field login_url string
---@field managed boolean
---@field mfa_enabled boolean
---@field name string
---@field project_id string
---@field provider_guidance string
---@field sign_in_verified boolean
---@field sign_in_verified_at string|nil
---@field status string
---@field updated_at string
---@field username string

---@class PagesProjectCredentialListMatch
---@field organization_id string
---@field project_id string

---@class PagesProjectPersona
---@field active_count number
---@field credentials table
---@field needs_attention_count number
---@field permissions table
---@field persona_states table
---@field personas table
---@field project table

---@class PagesProjectPersonaListMatch
---@field organization_id string
---@field project_id string

---@class PagesProjectRun
---@field environment_query string
---@field environments table
---@field environments_has_more boolean
---@field pagination table
---@field runs table
---@field selected_environment any

---@class PagesProjectRunListMatch
---@field organization_id string
---@field project_id string
---@field environment_id? string
---@field environment_query? string
---@field page? number
---@field query? string
---@field status? string
---@field trigger? string

---@class PagesProjectScenario
---@field base_url string|nil
---@field id string
---@field kind string|nil
---@field name string

---@class PagesProjectScenarioListMatch
---@field organization_id string
---@field project_id string
---@field limit? number
---@field sort? string

---@class PersonalAccessToken
---@field id? string

---@class PersonalAccessTokenListMatch
---@field id? string

---@class PersonalAccessTokenCreateData

---@class PersonalAccessTokenRemoveMatch
---@field id string

---@class PreviewOperation

---@class PreviewOperationListMatch
---@field app_id string
---@field preview_id string

---@class PreviewProfileSecretBinding
---@field env_key string
---@field id? string
---@field mode? string
---@field secret_id? string
---@field secret_version_id? string

---@class PreviewProfileSecretBindingListMatch
---@field app_id string
---@field preview_profile_id string

---@class PreviewProfileSecretBindingCreateData
---@field app_id string
---@field preview_profile_id string
---@field env_key string
---@field mode? string
---@field secret_id? string
---@field secret_version_id? string

---@class PreviewProfileSecretBindingRemoveMatch
---@field app_id string
---@field id string
---@field preview_profile_id string

---@class PreviewSecret
---@field env_key string
---@field id? string
---@field name string
---@field slug string
---@field value string

---@class PreviewSecretCreateData
---@field app_id string
---@field preview_id string
---@field env_key string
---@field name string
---@field slug string
---@field value string

---@class PreviewSecretRemoveMatch
---@field app_id string
---@field id string
---@field preview_id string

---@class PreviewSharingApproval
---@field approved_build_keys table
---@field approved_build_secrets table
---@field approved_default_configuration table
---@field approved_default_secrets table
---@field approved_source_keys table
---@field build_keys? table
---@field build_secrets? table
---@field default_configuration? table
---@field default_secrets? table
---@field services table
---@field snapshot_version number
---@field source_keys? table

---@class PreviewSharingApprovalListMatch
---@field app_id string
---@field preview_id string

---@class PreviewSharingApprovalCreateData
---@field app_id string
---@field preview_id string
---@field build_keys? table
---@field build_secrets? table
---@field default_configuration? table
---@field default_secrets? table
---@field snapshot_version number
---@field source_keys? table

---@class ProductMapIdentityDecision
---@field observations table
---@field operation string
---@field reason string
---@field target table

---@class ProductMapIdentityDecisionCreateData
---@field organization_id string
---@field project_id string
---@field observations table
---@field operation string
---@field reason string
---@field target table

---@class ProductMapJourney
---@field default_variant_id? string|nil
---@field goal string
---@field id string
---@field journey table
---@field next_cursor string|nil
---@field preview? any
---@field scope table
---@field title string
---@field tree table
---@field tree_loaded? boolean
---@field variant_count number
---@field variants table

---@class ProductMapJourneyLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field after? string
---@field area? string
---@field before? string
---@field include_tree? boolean
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string
---@field variant_id? string

---@class ProductMapJourneyListMatch
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field after? string
---@field area? string
---@field before? string
---@field include_coverage? boolean
---@field journey_query? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string

---@class ProductMapJourneyReplay
---@field actor_id string|nil
---@field can_request_qualification boolean
---@field created_at string
---@field failure_code string|nil
---@field failure_message string|nil
---@field id string
---@field preparation_receipt table|nil
---@field qualification any
---@field qualification_status string
---@field replay_required boolean
---@field review_reason string
---@field run_id string|nil
---@field scenario_run_id string|nil
---@field source_digest string
---@field status string
---@field updated_at string
---@field variant_id string

---@class ProductMapJourneyReplayLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProductMapJourneyReplayCreateData
---@field id string
---@field organization_id string
---@field project_id string

---@class ProductMapObservation
---@field capture table
---@field events table
---@field evidence_id string
---@field id? string
---@field observation_id string
---@field scope table
---@field state any
---@field status string

---@class ProductMapObservationLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field area? string
---@field before? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string

---@class ProductMapQuestion
---@field account_id? string
---@field area? string
---@field before? string
---@field claims table
---@field evidence_truncated boolean
---@field model string
---@field persona_id? string
---@field query? string
---@field question string
---@field reasoning_effort string
---@field revision_id? string
---@field scope table
---@field since? string
---@field state_id? string
---@field status string
---@field unknowns table

---@class ProductMapQuestionCreateData
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field area? string
---@field before? string
---@field persona_id? string
---@field query? string
---@field question string
---@field revision_id? string
---@field since? string
---@field state_id? string

---@class ProductMapState
---@field account_id string|nil
---@field attempts table
---@field captured_at string
---@field id string
---@field incoming table
---@field labels table
---@field layout table
---@field observation_id string
---@field omitted_controls number
---@field outgoing table
---@field revision_id string
---@field scope table
---@field screenshot_url string|nil
---@field state table
---@field truncated boolean
---@field url string

---@class ProductMapStateLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field area? string
---@field before? string
---@field include_connection? boolean
---@field observation_id? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string

---@class ProductMapStateListMatch
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field after? string
---@field area? string
---@field before? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string

---@class Project
---@field archived_at string|nil
---@field context string|nil
---@field created_at string
---@field credentials table
---@field demo boolean
---@field documentation_urls table
---@field environments table
---@field execution_mode string
---@field icon_url string|nil
---@field id string
---@field identity_provider table
---@field lock_version number
---@field name string
---@field network_connections table
---@field organization_id string
---@field overview table
---@field permissions table
---@field personas table
---@field project table
---@field pull_request_options table
---@field pull_requests table
---@field purpose string|nil
---@field runs table
---@field scenario_history table
---@field scenario_states table
---@field scenarios table
---@field setup_required? boolean
---@field slug string
---@field updated_at string
---@field verifier_preferences table
---@field version number
---@field website_url string|nil

---@class ProjectLoadMatch
---@field id string
---@field organization_id string
---@field overview? boolean
---@field page? number
---@field query? string
---@field scenario_id? string
---@field status? string
---@field verify_environment_id? string
---@field view? string

---@class ProjectListMatch
---@field organization_id string

---@class ProjectCreateData
---@field organization_id string
---@field context? string|nil
---@field documentation_urls? table
---@field execution_mode? string
---@field name string
---@field purpose? string|nil
---@field slug? string
---@field verifier_preferences? table
---@field website_url? string|nil

---@class ProjectUpdateData
---@field id string
---@field organization_id string
---@field context? string|nil
---@field documentation_urls? table
---@field execution_mode? string
---@field name? string
---@field purpose? string|nil
---@field slug? string
---@field verifier_preferences? table
---@field version? number
---@field website_url? string|nil

---@class ProjectPatchData
---@field id string
---@field organization_id string
---@field context? string|nil
---@field documentation_urls? table
---@field execution_mode? string
---@field name? string
---@field purpose? string|nil
---@field slug? string
---@field verifier_preferences? table
---@field version? number
---@field website_url? string|nil

---@class ProjectAndroidApk
---@field android table
---@field artifact_paths? table
---@field description string
---@field image string
---@field ios table
---@field launch_command? string
---@field managed_binary table
---@field platform? string
---@field provider? string
---@field setup_command? string

---@class ProjectAndroidApkCreateData
---@field organization_id string
---@field project_id string

---@class ProjectCodeMap
---@field can_scan boolean
---@field commit_sha string
---@field configured boolean
---@field error_code string|nil
---@field id string
---@field name string
---@field ref? string
---@field repository_id string
---@field revision table
---@field slug string
---@field status string

---@class ProjectCodeMapListMatch
---@field organization_id string
---@field project_id string
---@field ref? string
---@field repository_id? string

---@class ProjectCodeMapCreateData
---@field organization_id string
---@field project_id string
---@field ref? string
---@field repository_id string

---@class ProjectEnvironment
---@field allowed_actions string
---@field allowed_origins table
---@field archived_at string|nil
---@field base_url string|nil
---@field base_url_changeable boolean
---@field binary? string
---@field conversation_only_messaging boolean
---@field created_at string
---@field desktop table|nil
---@field execution_mode string
---@field id string
---@field imessage_number string|nil
---@field kind string
---@field lock_version number
---@field messaging_conversation any
---@field messaging_problem string|nil
---@field messaging_source any
---@field messaging_tester_number string|nil
---@field name string
---@field project_id string
---@field pull_request table|nil
---@field source_branch string|nil
---@field updated_at string
---@field verify_network_connection_id string|nil
---@field version number

---@class ProjectEnvironmentLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectEnvironmentListMatch
---@field organization_id string
---@field project_id string

---@class ProjectEnvironmentCreateData
---@field organization_id string
---@field project_id string
---@field allowed_actions? string
---@field allowed_origins? table
---@field base_url? string|nil
---@field binary? string
---@field desktop? table|nil
---@field imessage_number? string|nil
---@field kind? string
---@field messaging_tester_number? string|nil
---@field name string

---@class ProjectEnvironmentUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field allowed_actions? string
---@field allowed_origins? table
---@field base_url? string|nil
---@field binary? string
---@field imessage_number? string|nil
---@field kind? string
---@field messaging_tester_number? string|nil
---@field name? string
---@field verify_network_connection_id? string|nil
---@field version? number

---@class ProjectEnvironmentPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field allowed_actions? string
---@field allowed_origins? table
---@field base_url? string|nil
---@field binary? string
---@field imessage_number? string|nil
---@field kind? string
---@field messaging_tester_number? string|nil
---@field name? string
---@field verify_network_connection_id? string|nil
---@field version? number

---@class ProjectFinding
---@field deferred_until? string|nil
---@field environment_name string
---@field id string
---@field last_seen_at string
---@field locked boolean
---@field severity string
---@field source string
---@field source_title string
---@field status string
---@field title string
---@field verification any
---@field web_path string

---@class ProjectFindingListMatch
---@field organization_id string
---@field project_id string
---@field page? number
---@field priority? string
---@field query? string
---@field run_id? string
---@field source? string
---@field state? string

---@class ProjectFixture
---@field assignments table
---@field byte_size number
---@field content_type string
---@field credential_ids table
---@field credentials table
---@field environment_ids table
---@field environments table
---@field fixtures table
---@field id? string
---@field lock_version number
---@field name string
---@field pagination table
---@field permissions table
---@field persona_ids table
---@field personas table
---@field project table
---@field sha256 string
---@field url string
---@field version number

---@class ProjectFixtureLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectFixtureListMatch
---@field organization_id string
---@field project_id string
---@field credential_id? string
---@field environment_id? string
---@field page? number
---@field persona_id? string
---@field q? string

---@class ProjectFixtureCreateData
---@field organization_id string
---@field project_id string

---@class ProjectFixtureUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field credential_ids? table
---@field environment_ids? table
---@field name? string
---@field persona_ids? table
---@field version? number

---@class ProjectFixturePatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field credential_ids? table
---@field environment_ids? table
---@field name? string
---@field persona_ids? table
---@field version? number

---@class ProjectFixtureRemoveMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field version number

---@class ProjectIosApp
---@field android table
---@field artifact_paths? table
---@field description string
---@field image string
---@field ios table
---@field launch_command? string
---@field managed_binary table
---@field platform? string
---@field provider? string
---@field setup_command? string

---@class ProjectIosAppCreateData
---@field organization_id string
---@field project_id string

---@class ProjectMessagingConversation
---@field assistant_number string
---@field attachment_limit number
---@field attachment_max_bytes number
---@field environment_name string
---@field id string
---@field leased boolean
---@field messages table
---@field reconciled_at string|nil
---@field retirable boolean
---@field seeded boolean
---@field send_blocked_reason string|nil
---@field send_disposition? string
---@field send_error? string|nil
---@field tester_number string
---@field unknown_send boolean
---@field verify_environment_id string

---@class ProjectMessagingConversationLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectMessagingConversationCreateData
---@field organization_id string
---@field project_id string
---@field assistant_number string
---@field tester_number string
---@field verify_environment_id string

---@class ProjectMessagingConversationUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field assistant_number? string
---@field tester_number? string

---@class ProjectMessagingConversationPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field assistant_number? string
---@field tester_number? string

---@class ProjectOverviewMetric
---@field counts table

---@class ProjectOverviewMetricListMatch
---@field organization_id string
---@field project_id string

---@class ProjectOverviewPullRequest
---@field base_sha string
---@field can_verify boolean
---@field comment_url string|nil
---@field draft boolean
---@field github_repository string|nil
---@field github_url string|nil
---@field head_sha string
---@field id string
---@field latest_created_at string|nil
---@field latest_current boolean
---@field latest_head_sha string|nil
---@field latest_reason string|nil
---@field latest_run_id string|nil
---@field latest_state string|nil
---@field number number
---@field project_id string|nil
---@field project_slug string|nil
---@field provider string
---@field repository_id string
---@field request_label string
---@field source_branch string|nil
---@field source_repository string|nil
---@field source_url string|nil
---@field state string
---@field title string
---@field updated_at string
---@field web_path string

---@class ProjectOverviewPullRequestListMatch
---@field organization_id string
---@field project_id string

---@class ProjectProductMap

---@class ProjectProductMapLoadMatch
---@field organization_id string
---@field project_id string
---@field account_id? string
---@field area? string
---@field before? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string
---@field source? string
---@field target? string
---@field compare_revision_id? string
---@field after? string
---@field view_id? string

---@class ProjectProductMapCreateData
---@field organization_id string
---@field project_id string

---@class ProjectRecording
---@field browser table
---@field created_at string
---@field draft any
---@field environment_id string
---@field error string|nil
---@field event_count number
---@field id string
---@field persona_id string
---@field phase string
---@field signed_in_during_recording boolean
---@field start_path? string
---@field status string
---@field updated_at string

---@class ProjectRecordingLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectRecordingCreateData
---@field organization_id string
---@field project_id string
---@field environment_id string
---@field persona_id string
---@field start_path? string

---@class ProjectRecordingRemoveMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectRunPlan
---@field archived_at string|nil
---@field base_url string|nil
---@field created_at string
---@field dependencies table
---@field id string
---@field identity_probe table|nil
---@field kind string|nil
---@field lock_version number
---@field name string
---@field nodes table
---@field preview any
---@field project_id string
---@field updated_at string
---@field version number

---@class ProjectRunPlanLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectRunPlanListMatch
---@field organization_id string
---@field project_id string
---@field page? number

---@class ProjectRunPlanCreateData
---@field organization_id string
---@field project_id string
---@field dependencies table
---@field identity_probe table|nil
---@field name string
---@field nodes table

---@class ProjectRunPlanUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field dependencies? table
---@field identity_probe? table|nil
---@field name? string
---@field nodes? table
---@field version? number

---@class ProjectRunPlanPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field dependencies? table
---@field identity_probe? table|nil
---@field name? string
---@field nodes? table
---@field version? number

---@class ProjectRunSchedule
---@field credential_ids table
---@field cron_expression? string|nil
---@field environment_id string
---@field environment_name? string
---@field history table
---@field id string
---@field labels table
---@field lock_version number
---@field name string
---@field next_run_at string
---@field notification_channel? string
---@field scenario_count number
---@field selection_mode string
---@field slack_subscription_id? string|nil
---@field source_scenario_id? string|nil
---@field state string
---@field time_of_day string
---@field time_zone string
---@field version number

---@class ProjectRunScheduleLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class ProjectRunScheduleListMatch
---@field organization_id string
---@field project_id string

---@class ProjectRunScheduleCreateData
---@field organization_id string
---@field project_id string
---@field credential_ids table
---@field environment_id string
---@field labels table
---@field name string
---@field notification_channel? string
---@field selection_mode string
---@field slack_subscription_id? string|nil
---@field state string
---@field time_of_day string
---@field time_zone string

---@class ProjectRunScheduleUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field credential_ids? table
---@field environment_id? string
---@field labels? table
---@field name? string
---@field notification_channel? string
---@field selection_mode? string
---@field slack_subscription_id? string|nil
---@field state? string
---@field time_of_day? string
---@field time_zone? string
---@field version? number

---@class ProjectRunSchedulePatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field credential_ids? table
---@field environment_id? string
---@field labels? table
---@field name? string
---@field notification_channel? string
---@field selection_mode? string
---@field slack_subscription_id? string|nil
---@field state? string
---@field time_of_day? string
---@field time_zone? string
---@field version? number

---@class ProjectScenarioOption
---@field environments table
---@field permissions table
---@field personas table
---@field project table
---@field scenario_states table
---@field scenarios table
---@field schedule_options? any
---@field schedules? table

---@class ProjectScenarioOptionListMatch
---@field organization_id string
---@field project_id string

---@class ProjectScenarioRow
---@field actor_count number
---@field dependency_count number
---@field health table
---@field id string
---@field labels table
---@field name string
---@field persona_id string
---@field selectable_for_run boolean
---@field step_count number

---@class ProjectScenarioRowListMatch
---@field organization_id string
---@field project_id string
---@field page? number
---@field sort? string
---@field state? string

---@class ProjectSetting
---@field available_messaging_environments table
---@field messaging_conversations table
---@field messaging_enabled boolean
---@field permissions table
---@field project table
---@field tester_numbers table

---@class ProjectSettingListMatch
---@field organization_id string
---@field project_id string

---@class PullRequest
---@field available_tests table
---@field branch? string
---@field cleanup_only? boolean
---@field current_run? any
---@field findings table
---@field head_sha? string
---@field id? string
---@field idempotency_key string
---@field imessage_number? string
---@field number? number
---@field pagination table
---@field permissions table
---@field preview_cleanup_ready boolean
---@field preview_url? string|nil
---@field project? any
---@field project_id? string
---@field pull_request table
---@field repository_id? string
---@field runs table

---@class PullRequestLoadMatch
---@field id string
---@field organization_id string
---@field page? number

---@class PullRequestCreateData
---@field organization_id string
---@field branch? string
---@field cleanup_only? boolean
---@field head_sha? string
---@field idempotency_key string
---@field imessage_number? string
---@field number? number
---@field preview_url? string|nil
---@field project_id? string
---@field repository_id? string

---@class PullRequestRemoveMatch
---@field id string
---@field organization_id string

---@class PullRequestSetting
---@field app_preview_profile_id? string|nil
---@field app_service_id? string|nil
---@field bots table
---@field browser_options_available boolean
---@field ci_preview table|nil
---@field concurrency? number
---@field configured_repository any
---@field demo_videos boolean
---@field demo_videos_enabled? boolean
---@field deployment string|nil
---@field deployment_environment? string
---@field enabled boolean
---@field environment string
---@field environments table
---@field github_check_enabled? boolean
---@field hosting_presets table
---@field id string
---@field imessage_comment_prefix string|nil
---@field imessage_number string|nil
---@field imessage_number_source string
---@field limits table
---@field link_pattern string|nil
---@field links string|nil
---@field max_seconds? number
---@field messaging_enabled boolean
---@field messaging_tester_number string|nil
---@field non_product_paths? table
---@field permissions table
---@field pr_check boolean
---@field preview_access? string
---@field preview_comment_authors? table
---@field preview_comment_pattern? string
---@field preview_comment_wildcard string|nil
---@field preview_profile string|nil
---@field preview_profiles table
---@field previews string
---@field project_id string
---@field project_repositories table
---@field provider string
---@field repositories table
---@field repository string
---@field repository_id string
---@field repository_kind string
---@field selected_repository any
---@field service string|nil
---@field settings table
---@field setup any
---@field setup_defaults table
---@field source_repository string
---@field target_mode string
---@field tester_numbers table
---@field trigger_label string
---@field trigger_on_comment? boolean
---@field trigger_on_label? boolean
---@field trigger_on_push? boolean
---@field trigger_on_ready? boolean
---@field triggers table
---@field verify_environment_id string
---@field write_scenarios boolean

---@class PullRequestSettingListMatch
---@field organization_id string
---@field project_id? string
---@field provider? string
---@field repository_id? string

---@class PullRequestSettingCreateData
---@field organization_id string
---@field app_preview_profile_id? string|nil
---@field app_service_id? string|nil
---@field bots table
---@field concurrency? number
---@field demo_videos boolean
---@field demo_videos_enabled? boolean
---@field deployment string|nil
---@field deployment_environment? string
---@field enabled boolean
---@field environment string
---@field github_check_enabled? boolean
---@field imessage_comment_prefix string|nil
---@field imessage_number string|nil
---@field imessage_number_source string
---@field limits table
---@field link_pattern string|nil
---@field links string|nil
---@field max_seconds? number
---@field messaging_tester_number string|nil
---@field non_product_paths? table
---@field pr_check boolean
---@field preview_access? string
---@field preview_comment_authors? table
---@field preview_comment_pattern? string
---@field preview_comment_wildcard string|nil
---@field preview_profile string|nil
---@field previews string
---@field project_id string
---@field provider string
---@field repository string
---@field repository_id string
---@field repository_kind string
---@field service string|nil
---@field target_mode string
---@field trigger_label string
---@field trigger_on_comment? boolean
---@field trigger_on_label? boolean
---@field trigger_on_push? boolean
---@field trigger_on_ready? boolean
---@field triggers table
---@field verify_environment_id string
---@field write_scenarios boolean

---@class PullRequestSettingAddRepository
---@field project_id string
---@field replace? boolean
---@field repositories table

---@class PullRequestSettingAddRepositoryCreateData
---@field organization_id string
---@field project_id string
---@field replace? boolean
---@field repositories table

---@class PullRequestSettingDetectComment
---@field bots? table
---@field deployment? string
---@field example_url? string
---@field imessage_comment_prefix? string
---@field imessage_number? string|nil
---@field kind string
---@field link_pattern? string
---@field project_id string
---@field provider? string
---@field repository_id? string
---@field request_number? number

---@class PullRequestSettingDetectCommentCreateData
---@field organization_id string
---@field project_id string
---@field repository_id? string

---@class Recorder
---@field id string
---@field name string
---@field slug string

---@class RecorderLoadMatch
---@field organization_id string

---@class Registry

---@class RegistryLoadMatch

---@class RegistryV2

---@class RegistryV2CreateData

---@class RelayAgentLocalThread
---@field id? string

---@class RelayAgentLocalThreadRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class ReportReplay
---@field agent_id string
---@field generated_at string
---@field id? string
---@field recording table
---@field replay_steps table

---@class ReportReplayLoadMatch
---@field exploration_id string
---@field id string
---@field organization_id string
---@field generated_at? string
---@field project_id? string

---@class ReportScenario
---@field environment_name string
---@field goal string
---@field id string
---@field mode string
---@field permissions table
---@field project_id string|nil
---@field related_explorations table
---@field report table
---@field saves_scenarios boolean
---@field scenario_generation table
---@field status string

---@class ReportScenarioCreateData
---@field exploration_id string
---@field organization_id string
---@field project_id? string

---@class RunScenarioRun
---@field id? string

---@class RunScenarioRunLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field run_id string

---@class RunScenarioRunUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field run_id string
---@field outcomes? any
---@field steps? any
---@field version? any

---@class RunScheduleOption
---@field id string
---@field name string

---@class RunScheduleOptionListMatch
---@field organization_id string
---@field project_id string

---@class RunSearch
---@field runs table

---@class RunSearchLoadMatch
---@field organization_id string
---@field query? string

---@class RunUpdate
---@field base_sha string
---@field can_verify boolean
---@field comment_url string|nil
---@field draft boolean
---@field github_repository string|nil
---@field github_url string|nil
---@field head_sha string
---@field id string
---@field latest_created_at string|nil
---@field latest_current boolean
---@field latest_head_sha string|nil
---@field latest_reason string|nil
---@field latest_run_id string|nil
---@field latest_state string|nil
---@field number number
---@field project_id string|nil
---@field project_slug string|nil
---@field provider string
---@field repository_id string
---@field request_label string
---@field source_branch string|nil
---@field source_repository string|nil
---@field source_url string|nil
---@field state string
---@field title string
---@field updated_at string
---@field web_path string

---@class RunUpdateListMatch
---@field organization_id string
---@field page? number
---@field query? string
---@field status? string
---@field verify_environment_id? string

---@class ScenarioRevision
---@field action string
---@field batch string
---@field created_at string
---@field definition table
---@field id string
---@field source string
---@field user any
---@field version number

---@class ScenarioRevisionListMatch
---@field organization_id string
---@field project_id string
---@field scenario_id string
---@field page? number

---@class ScenarioRunLesson
---@field finding string
---@field title? string
---@field workaround string

---@class ScenarioRunLessonCreateData
---@field organization_id string
---@field project_id string
---@field run_id string
---@field scenario_run_id string
---@field finding string
---@field title? string
---@field workaround string

---@class ScenarioRunScenarioEdit

---@class ScenarioRunScenarioEditCreateData
---@field organization_id string
---@field project_id string
---@field run_id string
---@field scenario_run_id string
---@field idempotency_key? any
---@field outcomes? any
---@field prompt? any
---@field steps? any
---@field version? any
---@field viewer_time_zone? any

---@class ServiceEndpoint
---@field id? string

---@class ServiceEndpointLoadMatch
---@field app_id string
---@field id string
---@field service_id string

---@class ServiceEndpointListMatch
---@field app_id string
---@field service_id string

---@class ServiceEndpointCreateData
---@field app_id string
---@field service_id string

---@class ServiceEndpointUpdateData
---@field app_id string
---@field id string
---@field service_id string

---@class ServiceEndpointPatchData
---@field app_id string
---@field id string
---@field service_id string

---@class ServiceEndpointRemoveMatch
---@field app_id string
---@field id string
---@field service_id string

---@class SitePreview
---@field icon_data_url string|nil
---@field title string|nil
---@field url string

---@class SitePreviewLoadMatch
---@field organization_id string
---@field url string

---@class SlackChannel
---@field id string
---@field is_member boolean
---@field is_private boolean
---@field is_slack_connect boolean
---@field name string
---@field published boolean

---@class SlackChannelListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field kind? string
---@field q? string
---@field refresh? boolean

---@class SparkAgentLocalThread
---@field action string
---@field archived boolean
---@field can_archive boolean
---@field can_disconnect_relay? boolean
---@field can_end boolean
---@field can_interrupt boolean
---@field can_send boolean
---@field created_at string
---@field delivery table
---@field device_id string
---@field device_name string
---@field diagnostic_code? string
---@field end any
---@field expires_at string
---@field full_title string
---@field id string
---@field key string
---@field last_activity_at string|nil
---@field native_thread_id string
---@field parent_conversation_id string|nil
---@field provider string
---@field references table
---@field relay_disconnected_at? string|nil
---@field relay_participant table
---@field result any
---@field result_expired boolean
---@field result_schema? table|boolean
---@field section string
---@field state string
---@field status string|nil
---@field task_configured boolean
---@field thread_id string
---@field title string

---@class SparkAgentLocalThreadLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class SparkAgentLocalThreadCreateData
---@field agent_id string
---@field organization_id string
---@field device_id string
---@field key string
---@field provider string
---@field result_schema? table|boolean
---@field thread_id string

---@class SparkAgentLocalThreadUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field allowed_senders? any
---@field ask_first? any
---@field expected_version? any
---@field reply_with_final_answer? any
---@field restricted? any

---@class StaticSite
---@field active_deployment_id string|nil
---@field cdn_hostname string
---@field cdn_url string
---@field cname_target string
---@field created_at string
---@field default_url string
---@field description string|nil
---@field error_document string|nil
---@field failure_message string|nil
---@field hosted_app_id string|nil
---@field id string
---@field index_document string
---@field name string
---@field organization_id string
---@field provisioned boolean
---@field provisioned_at string|nil
---@field region string|nil
---@field replication_regions table
---@field repository_id string|nil
---@field slug string
---@field status string
---@field updated_at string

---@class StaticSiteLoadMatch
---@field id string

---@class StaticSiteListMatch
---@field organization_id string

---@class StaticSiteCreateData
---@field organization_id string
---@field description? string|nil
---@field error_document? string|nil
---@field hosted_app_id? string|nil
---@field index_document? string
---@field name string
---@field region? string|nil
---@field replication_regions? table
---@field repository_id? string|nil
---@field slug string

---@class StaticSiteUpdateData
---@field id string

---@class StaticSitePatchData
---@field id string

---@class StaticSiteRemoveMatch
---@field id string

---@class StaticSiteDeployment
---@field activated_at string|nil
---@field activated_at_label string|nil
---@field commit_sha string|nil
---@field created_at string
---@field created_at_label string|nil
---@field creator_user_id string|nil
---@field deploy_slug string
---@field failure_message string|nil
---@field file_count number
---@field file_count_label string
---@field finished_at string|nil
---@field finished_at_label string|nil
---@field id string
---@field is_active boolean
---@field source_ref string|nil
---@field started_at string|nil
---@field started_at_label string|nil
---@field static_site_id string
---@field status string
---@field total_bytes number
---@field total_bytes_label string
---@field trigger_kind string
---@field updated_at string
---@field updated_at_label string|nil
---@field uploaded_at string|nil
---@field uploaded_at_label string|nil

---@class StaticSiteDeploymentLoadMatch
---@field id string
---@field static_site_id string

---@class StaticSiteDeploymentListMatch
---@field static_site_id string

---@class StaticSiteDeploymentCreateData
---@field static_site_id string

---@class StaticSiteDomain
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field created_at string
---@field dns_mode string
---@field dns_status string
---@field failure_message string|nil
---@field hosted_app_id string|nil
---@field hostname string
---@field id string
---@field kind string
---@field last_checked_at string|nil
---@field record_name string|nil
---@field record_type string|nil
---@field record_value string|nil
---@field redirect_to string|nil
---@field static_site_id string|nil
---@field target_kind string
---@field tls_status string
---@field updated_at string
---@field verification_status string

---@class StaticSiteDomainLoadMatch
---@field id string
---@field static_site_id string

---@class StaticSiteDomainListMatch
---@field static_site_id string

---@class StaticSiteDomainCreateData
---@field static_site_id string
---@field dns_mode? string
---@field hostname string
---@field kind? string
---@field redirect_to? string|nil

---@class StaticSiteDomainUpdateData
---@field id string
---@field static_site_id string

---@class StaticSiteDomainPatchData
---@field id string
---@field static_site_id string

---@class StaticSiteDomainRemoveMatch
---@field id string
---@field static_site_id string

---@class SubscriptionModel
---@field default_reasoning? string
---@field id string
---@field name string
---@field provider string
---@field reasoning? table
---@field speeds? table

---@class SubscriptionModelListMatch
---@field agent_id string
---@field organization_id string
---@field profile_id string

---@class ThreadPreview
---@field expires_at string|nil
---@field port number
---@field url string

---@class ThreadPreviewCreateData
---@field agent_id string
---@field organization_id string
---@field thread_id string
---@field port number

---@class VerificationProjectCredential
---@field browser_authentication? table|nil
---@field browser_session? string
---@field composal_address string|nil
---@field composal_inbox? boolean
---@field composal_inbox_user? string
---@field composal_managed_google? boolean
---@field configured boolean
---@field cookies? string
---@field credential_keys table
---@field description string|nil
---@field email_link_auth_origins table
---@field has_inbox boolean
---@field id string
---@field identity_provider table|nil
---@field instructions string|nil
---@field login_method string
---@field login_url string
---@field managed boolean
---@field mfa_enabled boolean
---@field name string
---@field oidc? table
---@field passkey? string
---@field password? string
---@field project_id string
---@field provider_guidance string
---@field remove_browser_authentication? boolean
---@field remove_totp? boolean
---@field sign_in_verified boolean
---@field sign_in_verified_at string|nil
---@field status string
---@field totp_secret? string
---@field updated_at string
---@field username string

---@class VerificationProjectCredentialLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class VerificationProjectCredentialListMatch
---@field organization_id string
---@field project_id string

---@class VerificationProjectCredentialCreateData
---@field organization_id string
---@field project_id string
---@field browser_session? string
---@field composal_inbox? boolean
---@field composal_inbox_user? string
---@field composal_managed_google? boolean
---@field cookies? string
---@field description? string|nil
---@field email_link_auth_origins? table
---@field instructions? string|nil
---@field login_method string
---@field login_url? string
---@field name string
---@field oidc? table
---@field passkey? string
---@field password? string
---@field remove_browser_authentication? boolean
---@field remove_totp? boolean
---@field totp_secret? string
---@field username? string

---@class VerificationProjectCredentialUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field browser_session? string
---@field composal_inbox? boolean
---@field composal_inbox_user? string
---@field composal_managed_google? boolean
---@field cookies? string
---@field description? string|nil
---@field email_link_auth_origins? table
---@field instructions? string|nil
---@field login_method? string
---@field login_url? string
---@field name? string
---@field oidc? table
---@field passkey? string
---@field password? string
---@field remove_browser_authentication? boolean
---@field remove_totp? boolean
---@field totp_secret? string
---@field username? string

---@class VerificationProjectCredentialPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field browser_session? string
---@field composal_inbox? boolean
---@field composal_inbox_user? string
---@field composal_managed_google? boolean
---@field cookies? string
---@field description? string|nil
---@field email_link_auth_origins? table
---@field instructions? string|nil
---@field login_method? string
---@field login_url? string
---@field name? string
---@field oidc? table
---@field passkey? string
---@field password? string
---@field remove_browser_authentication? boolean
---@field remove_totp? boolean
---@field totp_secret? string
---@field username? string

---@class VerificationProjectCredentialRemoveMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field permanent? boolean

---@class VerificationProjectPersona
---@field access_mode string
---@field archived_at string|nil
---@field capabilities string|nil
---@field created_at string
---@field credential_id string|nil
---@field goals string|nil
---@field id string
---@field lock_version number
---@field name string
---@field project_id string
---@field role string
---@field updated_at string
---@field version number

---@class VerificationProjectPersonaLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class VerificationProjectPersonaListMatch
---@field organization_id string
---@field project_id string

---@class VerificationProjectPersonaCreateData
---@field organization_id string
---@field project_id string
---@field access_mode? string
---@field capabilities? string|nil
---@field credential_id? string|nil
---@field goals? string|nil
---@field name string
---@field role string

---@class VerificationProjectPersonaUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field access_mode? string
---@field capabilities? string|nil
---@field credential_id? string|nil
---@field goals? string|nil
---@field name? string
---@field role? string
---@field version? number

---@class VerificationProjectPersonaPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field access_mode? string
---@field capabilities? string|nil
---@field credential_id? string|nil
---@field goals? string|nil
---@field name? string
---@field role? string
---@field version? number

---@class VerificationProjectPersonaRemoveMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class VerificationProjectRun
---@field approved_at string|nil
---@field approved_digest string|nil
---@field archived_at string|nil
---@field available_tests table
---@field can_archive boolean
---@field can_restore boolean
---@field can_start_another_run boolean
---@field cleanup_state string
---@field concurrency number
---@field created_at string
---@field creator_name string|nil
---@field definition_mode string
---@field environment_id string|nil
---@field id string
---@field lock_version number
---@field max_seconds number
---@field outcome string|nil
---@field permissions table
---@field plan_digest string|nil
---@field preparation_error_code string|nil
---@field progress table
---@field project table
---@field project_id string
---@field pull_request any
---@field queued_at string|nil
---@field run table
---@field run_plan_id? string|nil
---@field scenario_runs table
---@field source_run_id string|nil
---@field source_versions table|nil
---@field start_when_prepared boolean
---@field state string
---@field target_snapshot table
---@field title string
---@field updated_at string
---@field verifier_preferences_snapshot table
---@field web_path string

---@class VerificationProjectRunLoadMatch
---@field id string
---@field organization_id string
---@field project_id string
---@field diagnostic? boolean

---@class VerificationProjectRunListMatch
---@field organization_id string
---@field project_id string
---@field page? number
---@field status? string

---@class VerificationProjectRunCreateData
---@field id? string
---@field organization_id string
---@field project_id string
---@field concurrency number
---@field environment_id string|nil
---@field max_seconds number
---@field run_plan_id? string|nil
---@field start_when_prepared boolean
---@field digest? any
---@field idempotency_key? any
---@field mode? any
---@field run_plan_version? any
---@field scenario_files? any
---@field scenario_ids? any
---@field viewer_time_zone? any

---@class VerificationProjectScenario
---@field actors? table
---@field allowed_actions string
---@field archived_at string|nil
---@field cleanup? table
---@field created_at string
---@field dependencies table
---@field fixtures? table
---@field health table
---@field id string
---@field identity_probe? any
---@field if? string|nil
---@field labels table
---@field last_revision any
---@field lock_version number
---@field name string
---@field on? any
---@field outcomes table
---@field persona_id string
---@field primary_actor? string|nil
---@field project_id string
---@field selectable_for_run boolean
---@field starting_conditions string|nil
---@field steps table
---@field triggers table
---@field updated_at string
---@field version number

---@class VerificationProjectScenarioLoadMatch
---@field id string
---@field organization_id string
---@field project_id string

---@class VerificationProjectScenarioListMatch
---@field organization_id string
---@field project_id string

---@class VerificationProjectScenarioCreateData
---@field organization_id string
---@field project_id string
---@field actors? table
---@field allowed_actions? string
---@field cleanup? table
---@field dependencies? table
---@field fixtures? table
---@field identity_probe? any
---@field if? string|nil
---@field labels? table
---@field name string
---@field on? any
---@field outcomes? table
---@field persona_id? string
---@field primary_actor? string|nil
---@field starting_conditions? string|nil
---@field steps? table
---@field triggers? table

---@class VerificationProjectScenarioUpdateData
---@field id string
---@field organization_id string
---@field project_id string
---@field actors? table
---@field allowed_actions? string
---@field cleanup? table
---@field dependencies? table
---@field fixtures? table
---@field identity_probe? any
---@field if? string|nil
---@field labels? table
---@field name? string
---@field on? any
---@field outcomes? table
---@field persona_id? string
---@field primary_actor? string|nil
---@field starting_conditions? string|nil
---@field steps? table
---@field triggers? table
---@field version? number

---@class VerificationProjectScenarioPatchData
---@field id string
---@field organization_id string
---@field project_id string
---@field actors? table
---@field allowed_actions? string
---@field cleanup? table
---@field dependencies? table
---@field fixtures? table
---@field identity_probe? any
---@field if? string|nil
---@field labels? table
---@field name? string
---@field on? any
---@field outcomes? table
---@field persona_id? string
---@field primary_actor? string|nil
---@field starting_conditions? string|nil
---@field steps? table
---@field triggers? table
---@field version? number

---@class VerifyAppDomain
---@field id? string

---@class VerifyAppDomainCreateData
---@field app_id string
---@field id string

---@class VerifyBrowserSession
---@field account_id string
---@field expires_at string
---@field id string
---@field name? string
---@field origin string
---@field project_id string
---@field status string
---@field url string
---@field viewer_url string|nil

---@class VerifyBrowserSessionLoadMatch
---@field id string
---@field organization_id string

---@class VerifyBrowserSessionCreateData
---@field organization_id string
---@field account_id? string
---@field name? string
---@field project_id string
---@field url string

---@class VerifyBrowserSessionRemoveMatch
---@field id string
---@field organization_id string

---@class VerifyStaticSiteDomain
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field created_at string
---@field dns_mode string
---@field dns_status string
---@field failure_message string|nil
---@field hosted_app_id string|nil
---@field hostname string
---@field id string
---@field kind string
---@field last_checked_at string|nil
---@field record_name string|nil
---@field record_type string|nil
---@field record_value string|nil
---@field redirect_to string|nil
---@field static_site_id string|nil
---@field target_kind string
---@field tls_status string
---@field updated_at string
---@field verification_status string

---@class VerifyStaticSiteDomainCreateData
---@field id string
---@field static_site_id string

---@class VersionLog
---@field base_image string
---@field failure_phase string|nil
---@field id string
---@field image_digest string|nil
---@field image_reference string|nil
---@field installer_version string
---@field ready_at string|nil
---@field receipt table|nil
---@field safe_error string|nil
---@field started_at string|nil
---@field status string

---@class VersionLogListMatch
---@field binary_id string
---@field organization_id string
---@field version_id string
---@field project_id string

---@class WebBotAuth
---@field expires_at string
---@field origin string
---@field signatures table

---@class WebBotAuthCreateData
---@field origin string

---@class WorkflowRunStep
---@field id? string

---@class WorkflowRunStepLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string
---@field workflow_run_id string

---@class WorkflowRunStopNotice

---@class WorkflowRunStopNoticeCreateData
---@field agent_id string
---@field organization_id string
---@field workflow_run_id string

---@class WorkflowTriggerSkipped
---@field id? string

---@class WorkflowTriggerSkippedCreateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field workflow_trigger_id string

local M = {}

return M
