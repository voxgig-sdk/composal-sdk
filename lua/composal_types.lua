-- Typed models for the Composal SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class A2aWellKnown

---@class A2aWellKnownLoadMatch
---@field a2a_id string

---@class AdminOrg
---@field billing_email string|nil
---@field billing_reason? string
---@field customize_onboarding_packages? boolean
---@field deployment_usage_visibility string
---@field deployment_usage_visible boolean
---@field id string
---@field monthly_price_dollars? string|number
---@field monthly_price_override_cents number|nil
---@field name string
---@field onboarding_custom_pricing? boolean
---@field onboarding_package_keys? table|nil
---@field owner_email string
---@field package_id string|nil
---@field skip_payment? boolean
---@field slug string

---@class AdminOrgLoadMatch
---@field id string

---@class AdminOrgCreateData
---@field billing_reason? string
---@field customize_onboarding_packages? boolean
---@field monthly_price_dollars? string|number
---@field name string
---@field onboarding_custom_pricing? boolean
---@field onboarding_package_keys? table|nil
---@field owner_email string
---@field package_id? string|nil
---@field skip_payment? boolean
---@field slug string

---@class AdminOrgUpdateData
---@field id string
---@field billing_email? string|nil
---@field monthly_price_dollars? string|number
---@field package_id? string|nil
---@field reason? any

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

---@class AgentApp
---@field author table
---@field can_message boolean
---@field deployments_count number
---@field description string
---@field hidden_install_count number
---@field id string
---@field install_count number
---@field installed_by table
---@field installed_target_ids table
---@field mcp_url string|nil
---@field owner table
---@field thread any
---@field title string
---@field url string
---@field visibility string

---@class AgentAppLoadMatch
---@field id string
---@field organization_id string

---@class AgentAppListMatch
---@field organization_id string
---@field cursor? string

---@class AgentAppCreateData
---@field id string
---@field organization_id string
---@field surface? any
---@field view? any

---@class AgentAppInstall
---@field id? string
---@field installed boolean

---@class AgentAppInstallUpdateData
---@field agent_app_id string
---@field id string
---@field organization_id string

---@class AgentAppInstallRemoveMatch
---@field agent_app_id string
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
---@field actions table
---@field activity table
---@field admin_disabled_at? string|nil
---@field agent_tools? boolean
---@field authentication string
---@field authorized_at string|nil
---@field can_create_account? boolean
---@field capabilities table
---@field catalog_section? string
---@field category? string
---@field certification string
---@field checked_at string|nil
---@field connection table
---@field consent table|nil
---@field created_at string
---@field creation_key? string
---@field custodian_id string|nil
---@field description? string
---@field disabled_reason? string|nil
---@field failure_code string|nil
---@field generation number
---@field grants table
---@field grants_pagination table
---@field id string
---@field limits table
---@field name string
---@field organization_id string
---@field owner_name? string
---@field ownership_kind string
---@field pagination table
---@field policy_digest string
---@field provider table
---@field provider_disabled_reason? string|nil
---@field provider_identity table
---@field revoked_at string|nil
---@field schema_version number
---@field status string
---@field toolkit string
---@field triggers table
---@field updated_at string
---@field user_id string
---@field version string

---@class AgentConnectionLoadMatch
---@field id string
---@field organization_id string
---@field cursor? string
---@field grants_cursor? string
---@field grants_limit? number
---@field limit? number

---@class AgentConnectionListMatch
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class AgentConnectionCreateData
---@field organization_id string
---@field creation_key? string
---@field name string
---@field toolkit string

---@class AgentConnectionUpdateData
---@field id string
---@field organization_id string
---@field name? string

---@class AgentConnectionPatchData
---@field id string
---@field organization_id string
---@field name? string

---@class AgentConnectionRemoveMatch
---@field id string
---@field organization_id string

---@class AgentConnectionDelegation
---@field authorized_by_id string
---@field automation_connection_grant_id string
---@field created_at string
---@field id string
---@field member_name string
---@field revoked_at string|nil
---@field roles table
---@field usable boolean
---@field user_id string

---@class AgentConnectionDelegationListMatch
---@field agent_connection_id string
---@field organization_id string

---@class AgentConnectionGrant
---@field actions table
---@field agent_connection_id string
---@field automation_id string
---@field connection_generation number
---@field created_at string
---@field id string
---@field organization_id string
---@field revision number
---@field revoked_at string|nil
---@field status string
---@field usable boolean
---@field user_id string

---@class AgentConnectionGrantListMatch
---@field agent_connection_id string
---@field organization_id string

---@class AgentConnectionResource
---@field cursor? string|nil
---@field next_cursor string|nil
---@field query? string
---@field resources table

---@class AgentConnectionResourceCreateData
---@field agent_connection_id string
---@field organization_id string
---@field cursor? string|nil
---@field query? string

---@class AgentConnectionSafetyControl
---@field admin_disabled_at? string|nil
---@field authorized_at string|nil
---@field checked_at string|nil
---@field created_at string
---@field custodian_id string|nil
---@field failure_code string|nil
---@field generation number
---@field id string
---@field name string
---@field organization_id string
---@field owner_name? string
---@field ownership_kind string
---@field provider_disabled_reason? string|nil
---@field provider_identity table
---@field revoked_at string|nil
---@field status string
---@field toolkit string
---@field updated_at string
---@field user_id string

---@class AgentConnectionSafetyControlListMatch
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class AgentConnectionTriggerSubscription
---@field agent_connection_id string
---@field configuration table
---@field created_at string
---@field defaults table
---@field delivery string
---@field enabled boolean
---@field failure_code string|nil
---@field failure_request_id string|nil
---@field id string
---@field latency string
---@field name string
---@field reconcile_at string
---@field reconciliation_uncertain boolean
---@field remote_enabled boolean|nil
---@field replacement_id string|nil
---@field retired_at string|nil
---@field retirement_completed_at string|nil
---@field schema table
---@field slug string
---@field status string
---@field toolkit string
---@field toolkit_version string
---@field trigger_slug string
---@field updated_at string
---@field version string
---@field waiting_for_retirement boolean

---@class AgentConnectionTriggerSubscriptionListMatch
---@field agent_connection_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class AgentConnectionTriggerSubscriptionCreateData
---@field agent_connection_id string
---@field organization_id string
---@field configuration table
---@field trigger_slug string

---@class AgentConnectionTriggerSubscriptionUpdateData
---@field agent_connection_id string
---@field id string
---@field organization_id string
---@field enabled? boolean

---@class AgentConnectionTriggerSubscriptionPatchData
---@field agent_connection_id string
---@field id string
---@field organization_id string
---@field enabled? boolean

---@class AgentConnectionTriggerSubscriptionRemoveMatch
---@field agent_connection_id string
---@field id string
---@field organization_id string

---@class AgentContextCheckpoint
---@field id? string

---@class AgentContextCheckpointLoadMatch
---@field change_id string
---@field id string
---@field organization_id string
---@field repo_id string
---@field expected_commit_id string
---@field max_byte? number

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

---@class AgentEvent

---@class AgentEventLoadMatch
---@field agent_id string
---@field organization_id string
---@field conversation_id? string
---@field device_activity_provider? string

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
---@field browser_context? table
---@field client_time? table
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
---@field browser_context? table
---@field client_time? table
---@field conversation_id string
---@field model_policy? any
---@field requester_membership_id? string
---@field speed? string
---@field text string

---@class AgentIntegration
---@field account_counts table
---@field can_cancel_sign_in? boolean
---@field can_delete boolean
---@field can_disconnect boolean
---@field can_enable boolean
---@field can_manage boolean
---@field can_manage_sharing boolean
---@field can_reconnect boolean
---@field can_sync boolean
---@field catalog table
---@field connected_by string|nil
---@field connected_by_you boolean
---@field connected_counts table
---@field connections table
---@field creation_key? string
---@field creation_key_digest? string|nil
---@field generation number
---@field id string
---@field name string
---@field pagination table
---@field pending_counts table
---@field provider_disabled_reason string|nil
---@field provider_identity table
---@field provider_name string|nil
---@field reference string
---@field sharing_status? string
---@field status string
---@field team_sharing_enabled boolean
---@field team_sharing_version number
---@field toolkit string

---@class AgentIntegrationLoadMatch
---@field id? string
---@field organization_id string
---@field cursor? string
---@field enableable? boolean
---@field limit? number
---@field q? string
---@field toolkit? string

---@class AgentIntegrationCreateData
---@field organization_id string
---@field creation_key? string
---@field name string
---@field toolkit string

---@class AgentIntegrationRemoveMatch
---@field id string
---@field organization_id string

---@class AgentIntegrationAccount
---@field can_cancel_sign_in? boolean
---@field can_delete boolean
---@field can_disconnect boolean
---@field can_enable boolean
---@field can_manage_sharing boolean
---@field can_reconnect boolean
---@field can_sync boolean
---@field connected_by string|nil
---@field connected_by_you boolean
---@field creation_key_digest? string|nil
---@field generation number
---@field id string
---@field name string
---@field provider_disabled_reason string|nil
---@field provider_identity table
---@field reference string
---@field sharing_status? string
---@field status string
---@field team_sharing_enabled boolean
---@field team_sharing_version number
---@field toolkit string

---@class AgentIntegrationAccountListMatch
---@field organization_id string
---@field cursor? string
---@field enableable? boolean
---@field limit? number
---@field q? string
---@field toolkit? string

---@class AgentIntegrationCallback

---@class AgentIntegrationCallbackLoadMatch
---@field code? string
---@field connection_id string
---@field state string

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

---@class AgentRelayFileGrant
---@field access_mode string
---@field connection_generation number
---@field connection_id string
---@field connection_name string
---@field created_at string
---@field expected_generation number
---@field id string
---@field key string
---@field provider string
---@field resource_id string
---@field resource_kind string
---@field revoked boolean
---@field revoked_at string|nil
---@field snapshot_supported? boolean
---@field source_operation_id string

---@class AgentRelayFileGrantLoadMatch
---@field id string
---@field organization_id string

---@class AgentRelayFileGrantListMatch
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field request_key? string
---@field source_operation_id? string

---@class AgentRelayFileGrantCreateData
---@field organization_id string
---@field access_mode string
---@field connection_id string
---@field expected_generation number
---@field key string
---@field resource_id string
---@field resource_kind string
---@field source_operation_id string

---@class AgentRelayFileGrantRemoveMatch
---@field id string
---@field organization_id string

---@class AgentRelayFileGrantAccount
---@field access_modes? table
---@field generation number
---@field id string
---@field name string
---@field provider string
---@field resource_kind string

---@class AgentRelayFileGrantAccountListMatch
---@field organization_id string
---@field cursor? string
---@field source_operation_id string

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

---@class AgentRepositoryLoadMatch
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

---@class AgentRoder

---@class AgentRoderLoadMatch
---@field organization_id string

---@class AgentRoderCreateData
---@field checkpoint_handoff? any
---@field github_repository? any
---@field organization_id? any
---@field repository_slug? any
---@field session_purpose? any

---@class AgentRoutine
---@field can_manage boolean
---@field consecutive_errors number
---@field credit_wait? table
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
---@field utility_model? table

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

---@class AgentSession
---@field id? string

---@class AgentSessionLoadMatch
---@field id string
---@field around_event? number
---@field checkpoint? string
---@field cursor? string
---@field event_digest? string
---@field include_tool? boolean
---@field limit? number
---@field max_byte? number
---@field source_ref? string

---@class AgentSessionCheckpoint
---@field id? string

---@class AgentSessionCheckpointLoadMatch
---@field agent_session_id string
---@field id? string
---@field organization_id string
---@field repo_id string

---@class AgentSessionCheckpointCreateData
---@field agent_session_id string
---@field organization_id string
---@field repo_id string

---@class AgentSessionRoderHandoff
---@field checkpoint_id? string
---@field purpose? string

---@class AgentSessionRoderHandoffCreateData
---@field agent_session_id string
---@field organization_id string
---@field repo_id string
---@field checkpoint_id? string
---@field purpose? string

---@class AgentSetting
---@field can_manage boolean
---@field expected_version string
---@field instructions string
---@field version string

---@class AgentSettingLoadMatch
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
---@field author table
---@field can_message boolean
---@field deployments_count number
---@field description string|nil
---@field icon_url string|nil
---@field id string
---@field name string
---@field owner table
---@field thread any
---@field title string
---@field url string
---@field visibility string

---@class AgentSiteLoadMatch
---@field id string
---@field organization_id string

---@class AgentSiteListMatch
---@field organization_id string
---@field cursor? string

---@class AgentSiteCreateData
---@field id string
---@field organization_id string
---@field surface? any
---@field view? any

---@class AgentSkill
---@field agents table
---@field audience table
---@field can_manage_library boolean
---@field content string
---@field files table
---@field id? string
---@field marketplace? string
---@field pending boolean
---@field plugin? string
---@field revision string
---@field skill table
---@field skills table
---@field source? string

---@class AgentSkillLoadMatch
---@field id? string
---@field organization_id string

---@class AgentSkillCreateData
---@field organization_id string
---@field audience table
---@field marketplace? string
---@field plugin? string
---@field revision string
---@field skills table
---@field source? string

---@class AgentSkillUpdateData
---@field id string
---@field organization_id string
---@field agent_ids? any
---@field mode? any
---@field new_agents? any

---@class AgentSkillRemoveMatch
---@field id string
---@field organization_id string

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
---@field attention? table|nil
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

---@class AgentSubscriptionLoadMatch
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

---@class AgentSwarm
---@field base_bookmark string|nil
---@field base_ref string|nil
---@field base_revision string|nil
---@field budget table
---@field canceled_at string|nil
---@field canceled_count number
---@field concurrency_key string|nil
---@field created_at string
---@field created_at_label string|nil
---@field creator_user_id string|nil
---@field deadline_at string|nil
---@field display_id number
---@field done_count number
---@field environment table
---@field failed_count number
---@field finished_at string|nil
---@field finished_at_label string|nil
---@field github table
---@field goal string|nil
---@field id string
---@field model string|nil
---@field model_provider string|nil
---@field number number
---@field organization_id string
---@field organization_slug string|nil
---@field outcome string|nil
---@field phase string|nil
---@field policy table
---@field queued_at string|nil
---@field queued_at_label string|nil
---@field repository? string
---@field repository_id string|nil
---@field repository_slug string|nil
---@field reserved table
---@field scheduler_generation number
---@field skipped_count number
---@field slug string
---@field started_at string|nil
---@field started_at_label string|nil
---@field status string
---@field summary table
---@field target? table
---@field task_count number
---@field task_template_json string|nil
---@field tasks table
---@field updated_at string
---@field updated_at_label string|nil
---@field usage table

---@class AgentSwarmLoadMatch
---@field id string

---@class AgentSwarmListMatch
---@field org string
---@field page? number
---@field per_page? number

---@class AgentSwarmCreateData
---@field base_bookmark? string|nil
---@field base_ref? string|nil
---@field base_revision? string|nil
---@field budget? table
---@field concurrency_key? string|nil
---@field environment? table
---@field goal? string|nil
---@field model? string|nil
---@field model_provider? string|nil
---@field organization_slug string|nil
---@field policy? table
---@field queued_at? string|nil
---@field repository? string
---@field slug? string
---@field target? table
---@field task_template_json? string|nil
---@field tasks? table

---@class AgentSwarmUpdateData
---@field id string
---@field policy? table

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
---@field id? string

---@class AgentThreadLoadMatch
---@field id string

---@class AgentThreadCreateData

---@class AgentTool
---@field description? string
---@field inputSchema table
---@field name string

---@class AgentToolListMatch
---@field agent_id string
---@field organization_id string

---@class AgentUsage
---@field days table
---@field ended_at string
---@field pricing_version string
---@field source string
---@field started_at string
---@field user_days table
---@field users table
---@field window string

---@class AgentUsageLoadMatch
---@field organization_id string
---@field window? string

---@class AgentVerifyProject
---@field available boolean
---@field can_manage boolean
---@field expected_version number
---@field id string
---@field name string
---@field project_choices table
---@field project_choices_truncated boolean
---@field slug string
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

---@class AgentWebPreview
---@field description string|nil
---@field icon_url string|nil
---@field image_url string|nil
---@field title string|nil

---@class AgentWebPreviewLoadMatch
---@field asset? string
---@field token string

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

---@class AgentWorkflowLoadMatch
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
---@field agent_steps? table
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
---@field automation? table|nil
---@field budget_seconds number|nil
---@field budget_usd number|nil
---@field can_answer boolean
---@field can_approve boolean
---@field can_dismiss boolean
---@field checkpoint table|nil
---@field conversation_id string|nil
---@field decision_history? table
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

---@class Agreement
---@field body string|nil
---@field effective_on_label string
---@field key string
---@field summary string
---@field title string
---@field version string

---@class AgreementListMatch
---@field organization_id string

---@class AgreementAccessRequest

---@class AgreementAccessRequestCreateData
---@field organization_id string

---@class AlertRuleEvent
---@field id? string

---@class AlertRuleEventLoadMatch
---@field alert_rule_id string
---@field id? string
---@field space_id string

---@class AlertRuleEventCreateData
---@field alert_rule_id string
---@field space_id string

---@class AlertRuleEventRemoveMatch
---@field alert_rule_id string
---@field id string
---@field space_id string

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

---@class AllocationLogLoadMatch
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

---@class AppAccess

---@class AppAccessLoadMatch

---@class AppAccessJwk

---@class AppAccessJwkLoadMatch

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
---@field id? string

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
---@field id? string
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
---@field id? string

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
---@field id? string

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

---@class AppDeploymentDashboard
---@field activity table
---@field app table
---@field audit_events table
---@field capacity table
---@field connections table
---@field data_resources table
---@field deployments table
---@field desired_states table
---@field environments table
---@field id? string
---@field locations table
---@field managed_database_catalog table
---@field observability table
---@field operations table
---@field placements table
---@field reconciler_ticks table
---@field releases table
---@field rollback_deployments table
---@field rollouts table
---@field runtime_instances table
---@field service_bindings table
---@field service_views table
---@field services table
---@field storage_resources table
---@field summary table

---@class AppDeploymentDashboardLoadMatch
---@field id string
---@field metrics_range? string

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
---@field id? string

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
---@field id? string

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
---@field id? string

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
---@field id? string

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
---@field id? string

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
---@field id? string

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

---@class Artefact
---@field automation_invocation_id? string|nil
---@field byte_size number
---@field checksum_sha256 string
---@field content_type string
---@field created_at? string|nil
---@field created_by_user_id? string|nil
---@field description? string|nil
---@field document_key? string
---@field entrypoint? string
---@field expires_at? string|nil
---@field filename string
---@field files? table
---@field harness? string|nil
---@field harness_version? string|nil
---@field id string
---@field kind string
---@field model? string|nil
---@field organization_id string
---@field published_at? string|nil
---@field repository_id? string|nil
---@field slug string
---@field source string
---@field status string
---@field title string
---@field vcs_agent_checkpoint_id? string|nil
---@field vcs_agent_session_id? string|nil
---@field version number
---@field view_url string
---@field web_url string

---@class ArtefactLoadMatch
---@field id string
---@field organization_id string

---@class ArtefactListMatch
---@field organization_id string
---@field author? string
---@field created_by_agent? string
---@field cursor? string
---@field editable? string
---@field harness? string
---@field kind? string
---@field limit? number
---@field model? string
---@field q? string
---@field repo? string
---@field slug? string
---@field source? string

---@class ArtefactCreateData
---@field organization_id string

---@class ArtefactUpdateData
---@field id string
---@field organization_id string

---@class ArtefactPatchData
---@field id string
---@field organization_id string
---@field description? string|nil
---@field kind? string
---@field title? string

---@class ArtefactRemoveMatch
---@field id string
---@field organization_id string

---@class ArtefactCommentThread
---@field anchor string
---@field body string
---@field comments table
---@field id string
---@field quote? string
---@field resolved boolean

---@class ArtefactCommentThreadListMatch
---@field artefact_id string
---@field organization_id string

---@class ArtefactCommentThreadCreateData
---@field artefact_id string
---@field organization_id string
---@field anchor string
---@field body string
---@field quote? string

---@class ArtefactCommentThreadUpdateData
---@field artefact_id string
---@field id string
---@field organization_id string
---@field resolved? boolean

---@class ArtefactRevision
---@field base_version number
---@field content string

---@class ArtefactRevisionCreateData
---@field artefact_id string
---@field organization_id string
---@field base_version number
---@field content string

---@class ArtefactViewToken
---@field expires_in number
---@field file? string
---@field organization_slug? string
---@field version? number
---@field viewer_url string

---@class ArtefactViewTokenCreateData
---@field artefact_id string
---@field organization_id string
---@field file? string
---@field organization_slug? string
---@field version? number

---@class Artifact
---@field id? string

---@class ArtifactLoadMatch
---@field id string

---@class ArtifactCreateData

---@class ArtifactUpdateData
---@field id string

---@class ArtifactPatchData
---@field id string

---@class ArtifactRemoveMatch
---@field id string

---@class ArtifactCacheNamespace
---@field id? string

---@class ArtifactCacheNamespaceLoadMatch
---@field id string

---@class ArtifactCacheNamespaceCreateData

---@class ArtifactCacheNamespaceUpdateData
---@field id string

---@class ArtifactCacheNamespacePatchData
---@field id string

---@class ArtifactCacheNamespaceRemoveMatch
---@field id string

---@class ArtifactImageRepository
---@field id? string

---@class ArtifactImageRepositoryLoadMatch
---@field id string

---@class ArtifactImageRepositoryCreateData

---@class ArtifactImageRepositoryUpdateData
---@field id string

---@class ArtifactImageRepositoryPatchData
---@field id string

---@class ArtifactImageRepositoryRemoveMatch
---@field id string

---@class ArtifactPackageMirror
---@field id? string

---@class ArtifactPackageMirrorLoadMatch
---@field id string

---@class ArtifactPackageMirrorCreateData

---@class ArtifactPackageMirrorUpdateData
---@field id string

---@class ArtifactPackageMirrorPatchData
---@field id string

---@class ArtifactPackageMirrorRemoveMatch
---@field id string

---@class ArtifactRetentionPolicy
---@field id? string

---@class ArtifactRetentionPolicyLoadMatch
---@field id string

---@class ArtifactRetentionPolicyCreateData

---@class ArtifactRetentionPolicyUpdateData
---@field id string

---@class ArtifactRetentionPolicyPatchData
---@field id string

---@class ArtifactRetentionPolicyRemoveMatch
---@field id string

---@class AttachmentPart
---@field id? string

---@class AttachmentPartUpdateData
---@field agent_id string
---@field attachment_id string
---@field id string
---@field organization_id string

---@class AuditEvent
---@field action string
---@field actor_kind string
---@field actor_user_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field id string
---@field observability_space_id string|nil
---@field organization_id string
---@field payload any
---@field request_id string|nil
---@field severity string
---@field subject_id string
---@field subject_kind string
---@field subject_name string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class AuditEventListMatch
---@field organization_id string

---@class Auth

---@class AuthLoadMatch

---@class AuthCreateData
---@field cli_login_id? any
---@field code? any
---@field email? any
---@field invite_code? any
---@field login_id? any
---@field name? any
---@field organization_invitation_token? any
---@field password? any
---@field polling_token? any
---@field redirect_uri? any
---@field state? any
---@field turnstile_token? any

---@class AuthRemoveMatch

---@class AuthCli

---@class AuthCliCreateData
---@field client_kind? any
---@field intent? any
---@field login_id? any
---@field name? any
---@field organization_id? any
---@field organization_slug? any

---@class AuthGithub

---@class AuthGithubLoadMatch
---@field redirect_uri string

---@class AuthGoogle

---@class AuthGoogleLoadMatch
---@field redirect_uri string

---@class AuthOpenai

---@class AuthOpenaiLoadMatch
---@field code? string
---@field error? string
---@field state string

---@class AuthPasswordReset
---@field email string
---@field message string
---@field password string
---@field token string

---@class AuthPasswordResetCreateData
---@field email string

---@class AuthPasswordResetUpdateData
---@field password? string
---@field token? string

---@class AuthRegistrationOption
---@field email_password_signup_enabled boolean
---@field openai_sign_in_enabled? boolean
---@field turnstile_site_key string|nil
---@field waitlist_enabled boolean

---@class AuthRegistrationOptionLoadMatch
---@field email_password_signup_enabled? boolean
---@field openai_sign_in_enabled? boolean
---@field turnstile_site_key? string|nil
---@field waitlist_enabled? boolean

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
---@field automation? table|nil
---@field budget_seconds number|nil
---@field budget_usd number|nil
---@field can_answer boolean
---@field can_approve boolean
---@field can_dismiss boolean
---@field checkpoint table|nil
---@field conversation_id string|nil
---@field decision_history? table
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

---@class BackendRunnerPool
---@field id? string

---@class BackendRunnerPoolLoadMatch
---@field backend_id string

---@class BackendRunnerPoolCreateData
---@field backend_id string

---@class BackendRunnerPoolRemoveMatch
---@field backend_id string
---@field id string

---@class Bazel

---@class BazelCreateData

---@class BazelActionResult
---@field id? string

---@class BazelActionResultLoadMatch
---@field action_result_id string
---@field id string

---@class BazelActionResultUpdateData
---@field action_result_id string
---@field id string

---@class BazelBackend
---@field id? string

---@class BazelBackendLoadMatch
---@field id string

---@class BazelBackendCreateData

---@class BazelBackendUpdateData
---@field id string

---@class BazelBackendPatchData
---@field id string

---@class BazelBackendRemoveMatch
---@field id string

---@class BazelBlob
---@field id? string

---@class BazelBlobLoadMatch
---@field blob_id string
---@field hash string
---@field id string

---@class BazelBlobUpdateData
---@field blob_id string
---@field hash string
---@field id string

---@class BazelExecution
---@field id? string

---@class BazelExecutionLoadMatch
---@field id string

---@class BazelExecutionCreateData

---@class BazelFindMissingBlob

---@class BazelFindMissingBlobCreateData

---@class Billing
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingLoadMatch
---@field organization_id string

---@class BillingAddon
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field id? string
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field quantity number
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingAddonUpdateData
---@field id string
---@field organization_id string
---@field quantity? number

---@class BillingBudget
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field monthly_cap_cents? number|nil
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingBudgetUpdateData
---@field organization_id string
---@field monthly_cap_cents? number|nil

---@class BillingBudgetPatchData
---@field organization_id string

---@class BillingCheckoutSession
---@field cancel_url? string
---@field coupon_code? string
---@field entry_point? string
---@field package_key? string
---@field package_revision? number
---@field success_url? string

---@class BillingCheckoutSessionCreateData
---@field organization_id string
---@field cancel_url? string
---@field coupon_code? string
---@field entry_point? string
---@field package_key? string
---@field package_revision? number
---@field success_url? string

---@class BillingContact
---@field addons table
---@field billing_email string
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingContactUpdateData
---@field organization_id string

---@class BillingContactPatchData
---@field organization_id string
---@field billing_email? string

---@class BillingExtraSpend
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field enabled boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field monthly_cap_cents? number|nil
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingExtraSpendUpdateData
---@field organization_id string
---@field enabled? boolean
---@field monthly_cap_cents? number|nil

---@class BillingExtraSpendPatchData
---@field organization_id string
---@field enabled? boolean
---@field monthly_cap_cents? number|nil

---@class BillingInvoice
---@field amount_due_cents number
---@field created_at string
---@field currency string
---@field hosted_invoice_url? string|nil
---@field id string
---@field invoice_pdf? string|nil
---@field metronome_invoice_id? string|nil
---@field number? string|nil
---@field period_ended_at? string|nil
---@field period_started_at? string|nil
---@field status string
---@field total_cents number

---@class BillingInvoiceListMatch
---@field organization_id string

---@class BillingPackage
---@field addons table
---@field base_price_cents number
---@field billing_interval string
---@field billing_policy string
---@field ci_included_spend_cents? number
---@field currency string
---@field key string
---@field max_seats? number|nil
---@field name string
---@field pay_as_you_go_enabled boolean
---@field rates table
---@field revision number
---@field roder_daily_run_limit? number
---@field roder_run_concurrency_limit? number
---@field seat_price_cents number
---@field trial_days number
---@field visibility string

---@class BillingPackageListMatch
---@field addons? table
---@field base_price_cents? number
---@field billing_interval? string
---@field billing_policy? string
---@field ci_included_spend_cents? number
---@field currency? string
---@field key? string
---@field max_seats? number|nil
---@field name? string
---@field pay_as_you_go_enabled? boolean
---@field rates? table
---@field revision? number
---@field roder_daily_run_limit? number
---@field roder_run_concurrency_limit? number
---@field seat_price_cents? number
---@field trial_days? number
---@field visibility? string

---@class BillingPortalSession
---@field return_url? string

---@class BillingPortalSessionCreateData
---@field organization_id string
---@field return_url? string

---@class BillingPrepaidPeriod
---@field activated_at string|nil
---@field created_at string
---@field currency string
---@field id string
---@field last_error string|nil
---@field minutes number
---@field net_amount_cents number
---@field paid_at string|nil
---@field paid_total_cents number|nil
---@field payment_action_url string|nil
---@field period_ended_at string
---@field period_started_at string
---@field receipt_url string|nil
---@field refunded_net_cents number
---@field state string

---@class BillingPrepaidPeriodLoadMatch
---@field id string
---@field organization_id string

---@class BillingPrepaidPurchase
---@field activated_at string|nil
---@field created_at string
---@field currency string
---@field id string
---@field last_error string|nil
---@field minutes number
---@field net_amount_cents number
---@field paid_at string|nil
---@field paid_total_cents number|nil
---@field payment_action_url string|nil
---@field prepaid table
---@field purchase table
---@field receipt_url string|nil
---@field refunded_net_cents number
---@field request_key string
---@field state string

---@class BillingPrepaidPurchaseLoadMatch
---@field id string
---@field organization_id string

---@class BillingPrepaidPurchaseListMatch
---@field organization_id string

---@class BillingPrepaidPurchaseCreateData
---@field organization_id string
---@field minutes number
---@field request_key string

---@class BillingSubscription
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field cancel_at_period_end boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class BillingSubscriptionUpdateData
---@field organization_id string

---@class BillingSubscriptionPatchData
---@field organization_id string
---@field cancel_at_period_end? boolean

---@class BillingTokenTopUp
---@field amount_cents number
---@field request_key string

---@class BillingTokenTopUpCreateData
---@field organization_id string
---@field amount_cents number
---@field request_key string

---@class BillingUsage

---@class BillingUsageLoadMatch
---@field organization_id string
---@field meter? string
---@field window? string

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

---@class BookmarkProtectionRefreshGithubRequiredCheck
---@field exclusions table
---@field fetched_at? string|nil
---@field fetched_at_label? string|nil
---@field github_branch string
---@field github_owner? string|nil
---@field github_repository_name? string|nil
---@field last_error? string|nil
---@field proven boolean
---@field requirements table
---@field stale boolean

---@class BookmarkProtectionRefreshGithubRequiredCheckCreateData
---@field organization_id string
---@field repo_id string
---@field github_branch? string

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

---@class CacheNamespaceEntry
---@field id? string

---@class CacheNamespaceEntryLoadMatch
---@field cache_namespace_id string
---@field id? string

---@class CacheNamespaceEntryCreateData
---@field cache_namespace_id string

---@class CacheNamespaceEntryUpdateData
---@field cache_namespace_id string
---@field id string

---@class CacheNamespaceEntryPatchData
---@field cache_namespace_id string
---@field id string

---@class CacheNamespaceEntryRemoveMatch
---@field cache_namespace_id string
---@field id string

---@class CatalogSelector
---@field environments table
---@field id string
---@field locations table
---@field services table

---@class CatalogSelectorLoadMatch
---@field app_id string

---@class CdnDeployment
---@field id? string

---@class CdnDeploymentLoadMatch
---@field app_id string
---@field cdn_id string
---@field id? string

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
---@field id? string

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
---@field id? string

---@class CdnSpaceObjectUpdateData
---@field cdn_space_id string

---@class CdnSpaceObjectRemoveMatch
---@field cdn_space_id string
---@field id string

---@class Change
---@field counts table
---@field filters table
---@field github_sync? table
---@field result any

---@class ChangeLoadMatch
---@field organization_id string
---@field author? string
---@field awaiting_review? boolean
---@field direction? string
---@field group_page? string
---@field label? string
---@field mine? boolean
---@field number? number
---@field page? number
---@field q? string
---@field repo? string
---@field sort? string
---@field source? string
---@field stack? string
---@field state? string
---@field target? string
---@field tips_only? boolean
---@field view? string

---@class ChangeAsset
---@field alias string
---@field byte_size number
---@field checksum_md5 string
---@field checksum_sha256 string
---@field content_type string
---@field filename string
---@field id? string

---@class ChangeAssetCreateData
---@field organization_id string
---@field repo_id string
---@field alias string
---@field byte_size number
---@field checksum_md5 string
---@field checksum_sha256 string
---@field content_type string
---@field filename string

---@class ChangeComment
---@field body string
---@field comment? table
---@field comments table
---@field id? string
---@field kind? string|nil
---@field line? number|nil
---@field parent_comment_id? string|nil
---@field patchset_id? string|nil
---@field path? string|nil
---@field side? string|nil

---@class ChangeCommentLoadMatch
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field path? string
---@field resolved? boolean

---@class ChangeCommentCreateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field body string
---@field kind? string|nil
---@field line? number|nil
---@field parent_comment_id? string|nil
---@field patchset_id? string|nil
---@field path? string|nil
---@field side? string|nil

---@class ChangeFileReviewCheckpoint
---@field patchset_id string
---@field path string
---@field request_id string
---@field review_action string

---@class ChangeFileReviewCheckpointCreateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field patchset_id string
---@field path string
---@field request_id string
---@field review_action string

---@class ChangeGitBranchSubmission

---@class ChangeGitBranchSubmissionCreateData
---@field organization_id string
---@field repo_id string

---@class ChangeGitCommitIdentity
---@field change_id string
---@field change_number number
---@field git_commit_id string
---@field git_commit_ids table
---@field id? string
---@field identities table
---@field missing_git_commit_ids table
---@field patchset_number number

---@class ChangeGitCommitIdentityLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class ChangeGitCommitIdentityCreateData
---@field organization_id string
---@field repo_id string
---@field git_commit_ids table

---@class ChangeGitPublication
---@field expected_target_commit_id string
---@field id? string
---@field operation_key string
---@field publication_id string
---@field request table
---@field request_digest string
---@field revisions table
---@field status string
---@field transfer_refs? table

---@class ChangeGitPublicationLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class ChangeGitPublicationCreateData
---@field organization_id string
---@field repo_id string
---@field operation_key string
---@field request table

---@class ChangeGroupMember
---@field change_id string
---@field changes table
---@field id? string
---@field name? string
---@field number? number
---@field status string
---@field title string|nil

---@class ChangeGroupMemberCreateData
---@field change_group_id string
---@field organization_id string
---@field repo_id string
---@field change_id string

---@class ChangeGroupMemberRemoveMatch
---@field change_group_id string
---@field id string
---@field organization_id string
---@field repo_id string

---@class ChangeLabel
---@field accepted? boolean
---@field add? table
---@field approval? table
---@field assets? table
---@field author? any
---@field capabilities? table
---@field change_key? string
---@field checks? table
---@field checks_status? string
---@field comments? table
---@field comments_count? number
---@field comments_count_label? string
---@field commit_message? string|nil
---@field current_patchset? table
---@field description? string|nil
---@field draft? boolean
---@field folded_into_number? number|nil
---@field github_projection_status? string|nil
---@field github_pull_request? table
---@field github_pull_requests? table
---@field group? table|nil
---@field has_description? boolean
---@field id string
---@field jj_change_id? string|nil
---@field labels? table
---@field landable? boolean
---@field landed_by? table
---@field number number
---@field orphaned? boolean
---@field orphaned_at? string
---@field orphaned_at_label? string
---@field orphaned_reason? string
---@field parent_change_id? string|nil
---@field parent_change_number? number|nil
---@field patchset_number? number|nil
---@field patchsets? table
---@field primary_status? string|nil
---@field public_id? string
---@field relation_chain? table
---@field remove? table
---@field requested_changes? boolean
---@field restack_state? string
---@field reviewer_candidates? table
---@field reviewers? table
---@field stable_change_id? string
---@field stack? any
---@field status string
---@field target_branch string
---@field title string
---@field unresolved_comments_count_label? string
---@field url? string
---@field votes? table

---@class ChangeLabelUpdateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field add? table
---@field labels? table
---@field remove? table

---@class ChangeLandingHold

---@class ChangeLandingHoldCreateData
---@field change_id string
---@field organization_id string
---@field repo_id string

---@class ChangeLandingRequest
---@field change_ids? table
---@field count number
---@field defer_until_ready? boolean
---@field expected_requirement_version? string
---@field expected_scope_version? string
---@field head_change_id? string
---@field id? string|nil
---@field numbers table
---@field override_acknowledged? boolean
---@field override_codes? table
---@field position? number
---@field priority? string
---@field scope_version string
---@field state string
---@field version? number

---@class ChangeLandingRequestCreateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field defer_until_ready? boolean
---@field expected_requirement_version? string
---@field expected_scope_version? string
---@field override_acknowledged? boolean
---@field override_codes? table
---@field priority? string

---@class ChangeLandingRequestRemoveMatch
---@field change_id string
---@field id string
---@field organization_id string
---@field repo_id string

---@class ChangeRequestChange
---@field message? string|nil

---@class ChangeRequestChangeCreateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field message? string|nil

---@class ChangeReviewer
---@field add? table
---@field email string
---@field name string|nil
---@field remove? table
---@field removed_reviewers table
---@field requested_reviewers table
---@field reviewers table

---@class ChangeReviewerListMatch
---@field change_id string
---@field organization_id string
---@field repo_id string

---@class ChangeReviewerUpdateData
---@field change_id string
---@field organization_id string
---@field repo_id string
---@field add? table
---@field remove? table

---@class ChangeTranscript
---@field capture_kind string
---@field captured_at string
---@field harness table
---@field id string
---@field original_resume? any
---@field patchset_commit_id string
---@field patchset_number number
---@field redaction_count number
---@field session_id? string|nil
---@field session_title? string|nil
---@field status string
---@field superseded boolean
---@field user? table

---@class ChangeTranscriptListMatch
---@field change_id string
---@field organization_id string
---@field repo_id string

---@class ChangeTranscriptSummary
---@field estimated_cost any
---@field session_count number
---@field sessions table
---@field tokens_partial boolean
---@field total_tokens number|nil

---@class ChangeTranscriptSummaryLoadMatch
---@field organization_id string
---@field ids string

---@class CheckpointPrepareChunk

---@class CheckpointPrepareChunkCreateData
---@field agent_session_id string
---@field organization_id string
---@field repo_id string

---@class CiNode
---@field architecture string|nil
---@field bazel_enabled boolean
---@field bazel_properties_json string|nil
---@field ci_runner_pool_id string
---@field cordoned_at string|nil
---@field cordoned_at_label string|nil
---@field created_at string
---@field created_at_label string|nil
---@field health_state string
---@field heartbeat_age_seconds number|nil
---@field id string
---@field kind string
---@field labels_csv string|nil
---@field last_seen_at string|nil
---@field last_seen_at_label string|nil
---@field name string
---@field network_peer_id string|nil
---@field node_capabilities_csv string|nil
---@field node_certificate_expires_at string|nil
---@field node_certificate_expires_at_label string|nil
---@field node_certificate_fingerprint_sha256 string|nil
---@field node_certificate_serial string|nil
---@field offline_at string|nil
---@field offline_at_label string|nil
---@field online_at string|nil
---@field online_at_label string|nil
---@field organization_id string
---@field os string|nil
---@field revoked_at string|nil
---@field revoked_at_label string|nil
---@field schedulable boolean
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil
---@field version string|nil

---@class CiNodeLoadMatch
---@field id string

---@class CiNodeCreateData

---@class CiPipeline
---@field ci_runner_pool_id string|nil
---@field concurrency_key string|nil
---@field created_at string
---@field default_branch string|nil
---@field description string|nil
---@field hosted_app_id string|nil
---@field id string
---@field name string
---@field organization_id string
---@field repository_id string|nil
---@field required_capabilities_csv string|nil
---@field runner_pool table|nil
---@field runs table
---@field slug string
---@field source_kind string
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string
---@field trigger_on_pull_request boolean
---@field trigger_on_push boolean
---@field trigger_on_schedule boolean
---@field updated_at string
---@field workflow_path string|nil

---@class CiPipelineLoadMatch
---@field id string

---@class CiPipelineListMatch
---@field ci_runner_pool_id? string|nil
---@field concurrency_key? string|nil
---@field created_at? string
---@field default_branch? string|nil
---@field description? string|nil
---@field hosted_app_id? string|nil
---@field id? string
---@field name? string
---@field organization_id? string
---@field repository_id? string|nil
---@field required_capabilities_csv? string|nil
---@field runner_pool? table|nil
---@field runs? table
---@field slug? string
---@field source_kind? string
---@field status? string
---@field status_label? string
---@field status_state? string
---@field status_tone? string
---@field trigger_on_pull_request? boolean
---@field trigger_on_push? boolean
---@field trigger_on_schedule? boolean
---@field updated_at? string
---@field workflow_path? string|nil

---@class CiPipelineCreateData

---@class CiPipelineRun
---@field active boolean
---@field canceled_at string|nil
---@field ci_pipeline_id string
---@field ci_runner_pool_id string|nil
---@field commit_sha string|nil
---@field concurrency_key string|nil
---@field created_at string
---@field creator_user_id string|nil
---@field display_id number
---@field failed boolean
---@field finished_at string|nil
---@field hosted_app_id string|nil
---@field id string
---@field jobs table
---@field message string|nil
---@field number number
---@field organization_id string
---@field parameters_json string|nil
---@field queued_at string|nil
---@field ref_name string|nil
---@field repository_id string|nil
---@field required_capabilities_csv string|nil
---@field retry_number number
---@field retryable boolean
---@field slug string
---@field source_url string|nil
---@field started_at string|nil
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string
---@field trigger_kind string
---@field updated_at string

---@class CiPipelineRunLoadMatch
---@field id? string
---@field pipeline_id string

---@class CiPipelineRunCreateData
---@field pipeline_id string

---@class CiRunnerPool
---@field bazel_enabled boolean
---@field bazel_properties_json string|nil
---@field created_at string
---@field description string|nil
---@field elastic_config_json string|nil
---@field elastic_provider_kind string|nil
---@field id string
---@field isolation_mode string
---@field labels_csv string|nil
---@field max_concurrency number
---@field modal_capacity table
---@field modal_runner_invocations table
---@field name string
---@field network_space_id string|nil
---@field node_capabilities_csv string|nil
---@field organization_id string
---@field runner_count_label string
---@field runner_kind string
---@field runners table
---@field slug string
---@field status string
---@field updated_at string

---@class CiRunnerPoolLoadMatch
---@field id string

---@class CiRunnerPoolListMatch
---@field organization_id? string

---@class CiRunnerPoolCreateData

---@class CiRunnerPoolUpdateData
---@field id string

---@class CiRunnerPoolPatchData
---@field id string
---@field description? string|nil
---@field elastic_config_json? string|nil
---@field elastic_provider_kind? string|nil
---@field isolation_mode? string
---@field labels_csv? string|nil
---@field max_concurrency? number
---@field node_capabilities_csv? string|nil
---@field runner_kind? string
---@field status? string

---@class CiStatus

---@class CiStatusLoadMatch
---@field organization_id string
---@field repo_id string
---@field ref? string

---@class CliEvent
---@field event string
---@field properties table

---@class CliEventCreateData
---@field event string
---@field properties table

---@class CliRelease

---@class CliReleaseLoadMatch

---@class CliReleaseCreateData

---@class CloudWorkspaceBackupObject
---@field id? string

---@class CloudWorkspaceBackupObjectLoadMatch
---@field cloud_workspace_backup_id string
---@field id string
---@field organization_id string
---@field repo_id string

---@class CodeRuleEvaluation
---@field advisory boolean
---@field coverage table
---@field diff string
---@field duration_ms number
---@field evaluator_version? string
---@field input_digest? string|nil
---@field limits? table
---@field model? string
---@field requests table
---@field schema_version number
---@field snapshot_digest? string|nil
---@field unchecked table
---@field verdicts table

---@class CodeRuleEvaluationCreateData
---@field organization_id string
---@field repo_id string
---@field diff string

---@class ComSiteAccess

---@class ComSiteAccessLoadMatch
---@field host string
---@field return_to? string

---@class ComSiteAccessCreateData
---@field host? any
---@field token? any

---@class ComSiteAccessSession
---@field cookie_name string
---@field host string
---@field max_age number
---@field session_token string

---@class ComSiteAccessSessionCreateData
---@field host string

---@class CommentThreadComment
---@field body string

---@class CommentThreadCommentCreateData
---@field artefact_id string
---@field comment_thread_id string
---@field organization_id string
---@field body string

---@class CommitDiff
---@field files table
---@field id? string
---@field parent_id string|nil

---@class CommitDiffLoadMatch
---@field commit_id string
---@field id string
---@field organization_id string
---@field repo_id string
---@field parent? string

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

---@class ContactSubmission
---@field company? string|nil
---@field email string
---@field message string
---@field name string
---@field website? string|nil

---@class ContactSubmissionCreateData
---@field company? string|nil
---@field email string
---@field message string
---@field name string
---@field website? string|nil

---@class ControlComputer
---@field connection? table
---@field consent table
---@field device table
---@field id? string
---@field provider_status? table

---@class ControlComputerListMatch
---@field organization_id string
---@field cursor? string
---@field observe_connection? boolean
---@field persistent_agent_id string

---@class ControlComputerUpdateData
---@field id string
---@field organization_id string
---@field enabled? any
---@field expected_revision? any
---@field persistent_agent_id? any
---@field providers? any

---@class ControlComputerControlOperation
---@field action string
---@field arguments table
---@field created_at string
---@field delivery? table
---@field device_id string
---@field diagnostic_code? string
---@field end? table
---@field expires_at string
---@field id string
---@field key string
---@field provider string
---@field references table
---@field result any
---@field result_expired boolean
---@field state string

---@class ControlComputerControlOperationLoadMatch
---@field control_computer_id string
---@field id string
---@field organization_id string

---@class ControlComputerControlOperationCreateData
---@field control_computer_id string
---@field organization_id string
---@field action string
---@field arguments table
---@field key string

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
---@field scenario_generation? table
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
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field check_count number
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field credential_name? string|nil
---@field deadline_at string
---@field demo_project table|nil
---@field duration_ms number|nil
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
---@field priority_counts table
---@field project_id? string|nil
---@field related_explorations table
---@field report table
---@field reproduction_of table|nil
---@field reproductions table
---@field saves_scenarios boolean
---@field scannable_flows table
---@field scenario_count? number
---@field scenario_generation? table
---@field scenarios_pending? boolean
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field started_at string
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
---@field actual string
---@field agent_id string
---@field agent_title string
---@field area? string|nil
---@field checks table
---@field confidence string
---@field confirmed? boolean
---@field evidence_step_ids? table
---@field evidence_timestamp_ms number|nil
---@field expected string
---@field fix_prompt string
---@field has_recording? boolean
---@field id string
---@field locked boolean
---@field reproduction_steps table
---@field severity string
---@field title string
---@field tracked table|nil
---@field url string

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

---@class DeepScanMappedFlowLoadMatch
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

---@class Deployment
---@field app table
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
---@field history_kind string
---@field history_reason string|nil
---@field id string
---@field is_live boolean
---@field is_rollback boolean
---@field live_region_count number
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
---@field status string
---@field total_replicas number
---@field trigger_kind string
---@field updated_at string

---@class DeploymentLoadMatch
---@field id string
---@field organization_id string

---@class DeploymentDashboardNomad

---@class DeploymentDashboardNomadLoadMatch
---@field app_id string
---@field environment? string
---@field location? string
---@field service? string

---@class DeploymentDetail
---@field activity table
---@field app any
---@field app_id string|nil
---@field audit_events table
---@field capacity table
---@field data_resources table
---@field deploy_targets table
---@field deployments table
---@field desired_states table
---@field environments table
---@field filters table
---@field health table
---@field nomad table
---@field operations table
---@field placements table
---@field reconciler_ticks table
---@field releases table
---@field runtime_instances table
---@field service_bindings table
---@field service_views table
---@field storage_resources table

---@class DeploymentDetailLoadMatch
---@field organization_id string
---@field app? string
---@field environment? string
---@field service? string

---@class DeploymentFile

---@class DeploymentFileUpdateData
---@field deployment_id string
---@field static_site_id string

---@class DeploymentLog
---@field allocation_id string
---@field app_environment_id string|nil
---@field app_release_id string|nil
---@field app_service_id string|nil
---@field details any
---@field environment_name string
---@field release_version string|nil
---@field service_name string
---@field status string
---@field task string|nil
---@field unreachable_reason string|nil

---@class DeploymentLogListMatch
---@field organization_id string
---@field app? string
---@field environment? string
---@field limit? number
---@field log_location? string
---@field log_service? string
---@field service? string

---@class DeploymentMetric
---@field auto_deploy boolean
---@field environment_id string
---@field environment_name string
---@field placement_id string
---@field redeploy boolean
---@field region_count number
---@field replicas_per_region number
---@field rollout_strategy string
---@field service_id string
---@field service_name string
---@field source_ref string|nil

---@class DeploymentMetricListMatch
---@field organization_id string
---@field app? string
---@field environment? string
---@field metrics_range? string
---@field service? string

---@class DeploymentPreview
---@field access string
---@field app_environment_id string
---@field app_name string
---@field app_preview_profile_id string
---@field app_slug string
---@field change_number number|nil
---@field created_at? string
---@field created_by_user_id? string
---@field expires_at string
---@field generation number
---@field health string
---@field hosted_app_id string
---@field id string
---@field latest_operation_status string|nil
---@field name string
---@field owner_name string|nil
---@field profile_name string
---@field resource_overrides? table
---@field retained boolean
---@field slug string
---@field snapshot_version number
---@field source_revision string
---@field status string
---@field updated_at? string
---@field urls table
---@field vcs_change_id? string|nil

---@class DeploymentPreviewListMatch
---@field organization_id string
---@field app? string
---@field change? string
---@field expiry? string
---@field health? string
---@field owner? string
---@field page? number

---@class DeploymentSetting
---@field code string
---@field created_at string
---@field id string
---@field name string
---@field nomad_datacenter string
---@field updated_at string

---@class DeploymentSettingListMatch
---@field organization_id string
---@field app? string
---@field environment? string
---@field service? string

---@class DesktopLocalAgentModel
---@field id string
---@field name string

---@class DesktopLocalAgentModelListMatch
---@field organization_id string

---@class DesktopLocalAgentResponse
---@field input table
---@field max_output_tokens? number
---@field model string
---@field store boolean
---@field stream boolean

---@class DesktopLocalAgentResponseCreateData
---@field organization_id string
---@field input table
---@field max_output_tokens? number
---@field model string
---@field store boolean
---@field stream boolean

---@class Device
---@field architecture string
---@field channel string
---@field coding_connection? table|nil
---@field connection_checked_at string|nil
---@field connection_status string
---@field control_delivery_policy table
---@field control_spawn_policy? table
---@field created_at string
---@field device table
---@field environment string
---@field execution_available boolean
---@field id string
---@field name string
---@field native_device_id string
---@field paired_at string
---@field pairing_generation number
---@field platform string
---@field project_visibility table
---@field provider_status? table
---@field revoked_at string|nil
---@field scheduled_check_ins? boolean
---@field user_browser_access string

---@class DeviceLoadMatch
---@field id string
---@field organization_id string

---@class DeviceListMatch
---@field organization_id string
---@field cursor? string
---@field include_revoked? boolean

---@class DeviceCreateData
---@field id string
---@field organization_id string
---@field architecture string
---@field channel string
---@field name string
---@field pairing_generation number
---@field platform string
---@field access? any
---@field folders? any
---@field max_agents? any
---@field mode? any
---@field public_key? any
---@field repositories? any
---@field restricted? any
---@field transport? any
---@field version? any

---@class DeviceBrowserOperation
---@field command string
---@field created_at string
---@field id string

---@class DeviceBrowserOperationListMatch
---@field device_id string
---@field organization_id string

---@class DeviceBrowserOperationCreateData
---@field device_id string
---@field id string
---@field organization_id string
---@field claim_token? any
---@field response? any

---@class DeviceControlMessage
---@field agent_id string
---@field agent_name string
---@field expires_at string
---@field id string
---@field sender string|nil
---@field text string|nil
---@field text_omitted boolean
---@field thread table

---@class DeviceControlMessageListMatch
---@field device_id string
---@field organization_id string
---@field cursor? string

---@class DeviceEnterpriseRelay

---@class DeviceEnterpriseRelayLoadMatch

---@class DeviceFolderListing
---@field code? string
---@field error? string
---@field folders? table
---@field id string
---@field key string
---@field parent? string|nil
---@field path? string
---@field state string
---@field truncated? boolean

---@class DeviceFolderListingLoadMatch
---@field device_id string
---@field id string
---@field organization_id string

---@class DeviceFolderListingCreateData
---@field device_id string
---@field organization_id string
---@field key string
---@field path string

---@class DeviceGrant
---@field agent_id string
---@field agent_name string|nil
---@field can_edit boolean
---@field can_revoke boolean
---@field capabilities table
---@field created_at string
---@field id string
---@field principal_id string
---@field principal_name string|nil
---@field revision number
---@field revoked_at string|nil
---@field updated_at string

---@class DeviceGrantListMatch
---@field device_id string
---@field organization_id string
---@field cursor? string

---@class DeviceGrantCreateData
---@field device_id string
---@field organization_id string
---@field agent_id string
---@field capabilities table
---@field principal_id string

---@class DeviceInvocation

---@class DeviceInvocationCreateData
---@field device_id string
---@field organization_id string
---@field challenge? any
---@field invocation_id? any
---@field request_hash? any
---@field signature? any

---@class DeviceLocalEvent
---@field event string
---@field recorded boolean

---@class DeviceLocalEventCreateData
---@field device_id string
---@field organization_id string
---@field event string

---@class DeviceOperation
---@field action string
---@field arguments table
---@field created_at string
---@field delivery? table
---@field device_id string
---@field diagnostic_code? string
---@field end? table
---@field expires_at string
---@field id string
---@field key string
---@field provider string
---@field references table
---@field result any
---@field result_expired boolean
---@field state string

---@class DeviceOperationLoadMatch
---@field device_id string
---@field id string
---@field organization_id string

---@class DeviceOperationCreateData
---@field device_id string
---@field organization_id string
---@field action string
---@field arguments table
---@field key string

---@class DevicePairing
---@field architecture string
---@field channel string
---@field id? string
---@field name string
---@field platform string
---@field public_key string

---@class DevicePairingCreateData
---@field organization_id string
---@field architecture string
---@field channel string
---@field name string
---@field platform string
---@field public_key string

---@class DeviceProject
---@field id? string

---@class DeviceProjectRemoveMatch
---@field device_id string
---@field id string
---@field organization_id string

---@class DeviceScheduledCheckIn
---@field enabled boolean

---@class DeviceScheduledCheckInCreateData
---@field device_id string
---@field organization_id string
---@field enabled boolean

---@class DockerBuilder
---@field backend string
---@field created_at string|nil
---@field gateway_url? string|nil
---@field generation number
---@field id string
---@field last_activity_at string|nil
---@field organization_id string
---@field ready_at string|nil
---@field slept_at string|nil
---@field slug string
---@field startup_attempt number
---@field startup_failure string|nil
---@field startup_stage string|nil
---@field status string
---@field updated_at string|nil

---@class DockerBuilderLoadMatch
---@field id string
---@field organization_id string

---@class DockerBuilderListMatch
---@field organization_id string
---@field slug? string

---@class DockerBuilderCreateData
---@field organization_id string
---@field backend? string
---@field slug? string

---@class DockerBuilderUpdateData
---@field id string
---@field organization_id string

---@class DockerBuilderPatchData
---@field id string
---@field organization_id string
---@field slug? string

---@class DockerBuilderSession
---@field created_at string
---@field docker_builder_id string
---@field expires_at string
---@field gateway_url? string|nil
---@field generation number
---@field id string
---@field organization_id string
---@field revoked_at string|nil
---@field user_id string

---@class DockerBuilderSessionLoadMatch
---@field id string
---@field organization_id string

---@class DockerBuilderSessionCreateData
---@field docker_builder_id string
---@field organization_id string

---@class DockerBuilderSessionRemoveMatch
---@field id string
---@field organization_id string

---@class DockerBuilderSetting
---@field idle_timeout_seconds number
---@field max_concurrency number
---@field organization_id string
---@field region string
---@field runtime_timeout_seconds number

---@class DockerBuilderSettingLoadMatch
---@field organization_id string

---@class DockerBuilderSettingUpdateData
---@field organization_id string

---@class DockerBuilderSettingPatchData
---@field organization_id string
---@field idle_timeout_seconds? number
---@field max_concurrency? number
---@field region? string
---@field runtime_timeout_seconds? number

---@class DomainDnsIntegration
---@field account_label string|nil
---@field api_token string
---@field created_at string
---@field failure_message string|nil
---@field has_token boolean
---@field id string
---@field last_verified_at string|nil
---@field organization_id string
---@field provider string
---@field status string
---@field updated_at string

---@class DomainDnsIntegrationListMatch
---@field organization_id string

---@class DomainDnsIntegrationCreateData
---@field organization_id string
---@field account_label? string|nil
---@field api_token string

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

---@class Edge

---@class EdgeLoadMatch

---@class EmailVerification

---@class EmailVerificationCreateData
---@field email? any

---@class EnvironmentDiscoveryRun
---@field account_id string|nil
---@field deadline_at string
---@field environment_revision_id string
---@field evidence? table
---@field failure_code string|nil
---@field id string
---@field queued_at string
---@field recording? table
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
---@field scenario_generation? table
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

---@class EnvironmentSecretBindingLoadMatch
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

---@class ExecutionDesiredState
---@field desired_state table
---@field id? string
---@field stop_observed boolean

---@class ExecutionDesiredStateLoadMatch
---@field id string

---@class ExecutionDesiredStateCreateData

---@class ExecutionDesiredStateUpdateData
---@field id string

---@class ExecutionDesiredStatePatchData
---@field id string

---@class ExecutionDesiredStateRemoveMatch
---@field id string

---@class ExecutionReconcilerTick
---@field id? string

---@class ExecutionReconcilerTickLoadMatch
---@field id string

---@class ExecutionReconcilerTickCreateData

---@class ExecutionRelease
---@field id? string

---@class ExecutionReleaseLoadMatch
---@field id string

---@class ExecutionReleaseCreateData

---@class ExecutionRuntimeInstance
---@field adapter_kind string
---@field app_environment_id string
---@field app_release_id string|nil
---@field app_service_id string
---@field booted_at string|nil
---@field booted_at_label string|nil
---@field created_at string
---@field created_at_label string|nil
---@field hosted_app_id string
---@field id string
---@field instance_key string
---@field last_reconciled_at string|nil
---@field last_reconciled_at_label string|nil
---@field last_seen_at string|nil
---@field last_seen_at_label string|nil
---@field location any
---@field location_id string
---@field network_peer_id string|nil
---@field nomad_allocation_id string|nil
---@field nomad_task_name string|nil
---@field organization_id string
---@field private_ipv4 string|nil
---@field private_ipv6 string|nil
---@field provider_instance_id string|nil
---@field public_endpoint string|nil
---@field service_name string
---@field slug string
---@field status string
---@field terminated_at string|nil
---@field terminated_at_label string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class ExecutionRuntimeInstanceLoadMatch
---@field id string

---@class ExecutionRuntimeInstanceListMatch
---@field app_environment_id? string
---@field app_service_id? string
---@field hosted_app_id? string
---@field limit? number
---@field page? number

---@class ExecutionRuntimeInstanceCreateData

---@class ExecutionRuntimeInstanceUpdateData
---@field id string

---@class ExecutionRuntimeInstancePatchData
---@field id string

---@class ExecutionRuntimeInstanceRemoveMatch
---@field id string

---@class Exploration
---@field account_id? string|nil
---@field agent_filters table
---@field agents table
---@field can_continue? boolean
---@field chat_messages? table
---@field check_count number
---@field concurrency number
---@field covered_areas table
---@field created_at string
---@field credential_name? string|nil
---@field deadline_at string
---@field demo_project table|nil
---@field duration_ms number|nil
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
---@field scenario_count? number
---@field scenario_generation? table
---@field scenarios_pending? boolean
---@field sign_in_needs_answer boolean
---@field sign_in_outcome string
---@field sign_in_question? string|nil
---@field started_at string
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
---@field scenario_generation? table
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
---@field scenario_generation? table
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
---@field reported_occurrence? table|nil
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

---@class Gh
---@field capabilities table
---@field content table
---@field fetched_at string
---@field id? string
---@field magic_merge table|nil
---@field pull_request any
---@field stack table
---@field transcript_paths table

---@class GhLoadMatch
---@field gh_id string
---@field github_repo string
---@field id string
---@field organization_id string
---@field check_id? string
---@field cursor? string
---@field job_id? string
---@field page? number
---@field run_id? string
---@field section? string
---@field thread_id? string

---@class GitImport
---@field destination_mode string
---@field error? string|nil
---@field git_default_branch? string
---@field git_status string
---@field git_url string
---@field id string
---@field idempotency_key string
---@field name? string
---@field native_status string
---@field organization string
---@field repository_id? string|nil
---@field root_path string
---@field slug string
---@field source_branch string
---@field target_branch string

---@class GitImportLoadMatch
---@field id string

---@class GitImportCreateData
---@field organization_id string
---@field destination_mode string
---@field git_default_branch? string
---@field idempotency_key string
---@field name? string
---@field root_path string
---@field slug string
---@field source_branch string
---@field target_branch? string

---@class Github

---@class GithubLoadMatch
---@field name string
---@field owner string

---@class GithubApp

---@class GithubAppCreateData

---@class GithubAppImportableRepository
---@field account_login string
---@field github_app_installation_id string
---@field next_page number|nil
---@field repositories table

---@class GithubAppImportableRepositoryListMatch
---@field github_app_installation_id? string
---@field page? number

---@class GithubAppInstallation
---@field account_avatar_url string|nil
---@field account_id string|nil
---@field account_login string
---@field created_at string
---@field created_at_label string|nil
---@field id string
---@field installation_id string
---@field installed_at string|nil
---@field installed_at_label string|nil
---@field manage_access_url string
---@field organization_id string
---@field permission_entries table
---@field permissions table
---@field status string
---@field suspended_at string|nil
---@field suspended_at_label string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class GithubAppInstallationListMatch
---@field organization_id string

---@class GithubAppInstallationCreateData
---@field id string
---@field organization_id string
---@field account_avatar_url string|nil
---@field account_id string|nil
---@field account_login string
---@field created_at string
---@field created_at_label string|nil
---@field installation_id string
---@field installed_at string|nil
---@field installed_at_label string|nil
---@field manage_access_url string
---@field permission_entries table
---@field permissions table
---@field status string
---@field suspended_at string|nil
---@field suspended_at_label string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class GithubAppInstallationRemoveMatch
---@field id string
---@field organization_id string
---@field force? boolean
---@field uninstall_on_github? boolean

---@class GithubAppInstallationAuthorization
---@field installation_url string
---@field organization_slug string
---@field return_target string

---@class GithubAppInstallationAuthorizationCreateData
---@field organization_slug string
---@field return_target string

---@class GithubAppUserAuthorization

---@class GithubAppUserAuthorizationCreateData

---@class GithubCiRepository
---@field adoption_mode string
---@field check_name_prefix string
---@field ci_runner_pool_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field default_branch string
---@field github_app_installation_id string
---@field github_repository_id string
---@field id string
---@field last_compatibility_status string|nil
---@field last_error_message string|nil
---@field last_head_sha string|nil
---@field last_pull_request_number number|nil
---@field last_ref string|nil
---@field last_webhook_action string|nil
---@field last_webhook_at string|nil
---@field last_webhook_at_label string|nil
---@field last_webhook_delivery_id string|nil
---@field last_webhook_event string|nil
---@field metadata table
---@field organization_id string
---@field permission_status string
---@field repository_full_name string
---@field repository_name string
---@field repository_owner string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil
---@field webhook_delivery_count number

---@class GithubCiRepositoryLoadMatch
---@field id string
---@field organization_id string

---@class GithubCiRepositoryListMatch
---@field organization_id string
---@field adoption_mode? string
---@field status? string

---@class GithubCiRepositoryCreateData
---@field organization_id string
---@field adoption_mode? string
---@field check_name_prefix? string
---@field ci_runner_pool_id? string|nil
---@field default_branch? string
---@field github_app_installation_id string
---@field github_repository_id string
---@field repository_name string
---@field repository_owner string
---@field status? string

---@class GithubCiRepositoryUpdateData
---@field id string
---@field organization_id string
---@field adoption_mode? string
---@field check_name_prefix? string
---@field ci_runner_pool_id? string|nil
---@field default_branch? string
---@field permission_status? string
---@field status? string

---@class GithubCiRepositoryPatchData
---@field id string
---@field organization_id string
---@field adoption_mode? string
---@field check_name_prefix? string
---@field ci_runner_pool_id? string|nil
---@field default_branch? string
---@field permission_status? string
---@field status? string

---@class GithubCiRepositoryCompatibilityReport
---@field analyzed_at string
---@field analyzed_at_label string|nil
---@field ci_pipeline_id string|nil
---@field ci_pipeline_run_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field diagnostics table
---@field errors table
---@field event_action string|nil
---@field event_name string
---@field execution_allowed boolean
---@field github_ci_repository_id string
---@field head_sha string|nil
---@field id string
---@field metadata table
---@field organization_id string
---@field parser_version string
---@field pull_request_number number|nil
---@field ref_name string|nil
---@field referenced_actions table
---@field required_secrets table
---@field runner_labels table
---@field source_blob_sha string|nil
---@field source_sha string
---@field status string
---@field supported_features table
---@field updated_at string
---@field updated_at_label string|nil
---@field warnings table
---@field workflow_name string|nil
---@field workflow_path string

---@class GithubCiRepositoryCompatibilityReportLoadMatch
---@field github_ci_repository_id string
---@field id string
---@field organization_id string

---@class GithubCiRepositoryCompatibilityReportListMatch
---@field github_ci_repository_id string
---@field organization_id string
---@field event_name? string
---@field source_sha? string
---@field status? string

---@class GithubConnection
---@field accounts table
---@field github_app_installation_id string
---@field installations table
---@field project_id? string
---@field replace? boolean
---@field repositories table

---@class GithubConnectionLoadMatch
---@field organization_id string
---@field github_app_installation_id? string
---@field project_id? string

---@class GithubConnectionCreateData
---@field organization_id string
---@field github_app_installation_id string
---@field project_id? string
---@field replace? boolean
---@field repositories table

---@class GithubOnboarding
---@field accounts table
---@field active_batch_id string|nil
---@field batches table
---@field capabilities table
---@field installations table

---@class GithubOnboardingLoadMatch
---@field organization_id string

---@class GithubOnboardingBranch
---@field branches table

---@class GithubOnboardingBranchListMatch
---@field organization_id string
---@field github_app_installation_id string
---@field name string
---@field owner string

---@class GithubOnboardingImport
---@field account_login string
---@field complete boolean
---@field created_at string
---@field failed_item_count number
---@field github_app_installation_id string
---@field id string
---@field imported_item_count number
---@field item_count number
---@field items table
---@field repositories any
---@field status string
---@field terminal_item_count number
---@field updated_at string

---@class GithubOnboardingImportCreateData
---@field organization_id string
---@field github_app_installation_id string
---@field repositories any

---@class GithubOnboardingImportBatch
---@field account_login string
---@field complete boolean
---@field created_at string
---@field failed_item_count number
---@field github_app_installation_id string
---@field id string
---@field imported_item_count number
---@field item_count number
---@field items table
---@field status string
---@field terminal_item_count number
---@field updated_at string

---@class GithubOnboardingImportBatchLoadMatch
---@field id string
---@field organization_id string

---@class GithubOnboardingImportItem
---@field id? string

---@class GithubOnboardingImportItemCreateData
---@field id string
---@field organization_id string

---@class GithubPullRequest
---@field capabilities table
---@field content table
---@field fetched_at string
---@field id? string
---@field magic_merge table|nil
---@field pull_request any
---@field stack table
---@field transcript_paths table

---@class GithubPullRequestLoadMatch
---@field id string
---@field organization_id string
---@field pull_request_id string
---@field check_id? string
---@field cursor? string
---@field job_id? string
---@field page? number
---@field run_id? string
---@field section? string
---@field thread_id? string

---@class GithubPullRequestCreateData
---@field organization_id string

---@class GithubRunnerAdmission

---@class GithubRunnerAdmissionCreateData

---@class GithubRunnerCache
---@field entry_id? string
---@field key? string
---@field matched_key? string
---@field ok boolean
---@field operation string
---@field restore_keys? table
---@field signed_download_url? string
---@field size_bytes? string
---@field upload_path? string
---@field version? string

---@class GithubRunnerCacheCreateData
---@field entry_id? string
---@field key? string
---@field operation string
---@field restore_keys? table
---@field size_bytes? string
---@field version? string

---@class GithubRunnerEgress
---@field can_request boolean
---@field cidr string|nil
---@field ipv4 string|nil
---@field requested_at_label string|nil
---@field status string

---@class GithubRunnerEgressLoadMatch
---@field organization_id string

---@class GithubRunnerEgressCreateData
---@field organization_id string

---@class GithubRunnerHistory
---@field activity table
---@field counts table
---@field observed_at string
---@field pagination table
---@field repositories table
---@field runs table
---@field setup? any
---@field success_rate number|nil
---@field usage? table

---@class GithubRunnerHistoryLoadMatch
---@field organization_id string
---@field day? number
---@field page? number
---@field q? string
---@field repository? string
---@field status? string

---@class GithubRunnerImage
---@field created_at string
---@field id string
---@field image_reference string
---@field last_error string|nil
---@field modal_image_id string|nil
---@field name string
---@field registry_secret_name string|nil
---@field status string
---@field updated_at string

---@class GithubRunnerImageLoadMatch
---@field id string
---@field organization_id string

---@class GithubRunnerImageListMatch
---@field organization_id string

---@class GithubRunnerImageCreateData
---@field organization_id string
---@field image_reference string
---@field name string
---@field registry_secret_name? string|nil

---@class GithubRunnerPool
---@field cpu_millicores number
---@field enabled boolean
---@field github_app_installation_id string
---@field github_repository_id string
---@field github_runner_image any
---@field id string
---@field image? string|nil
---@field invocations table
---@field label string
---@field last_error string|nil
---@field last_polled_at string|nil
---@field max_concurrency number
---@field memory_mb number
---@field organization_id string
---@field provider string
---@field repository_full_name string
---@field runtime_kind string
---@field timeout_seconds number

---@class GithubRunnerPoolListMatch
---@field organization_id string

---@class GithubRunnerPoolCreateData
---@field organization_id string
---@field enabled? boolean
---@field github_app_installation_id string
---@field image? string|nil
---@field label? string
---@field max_concurrency? number
---@field provider? string
---@field repository_full_name string
---@field timeout_seconds? number

---@class GithubRunnerPoolUpdateData
---@field id string
---@field organization_id string
---@field enabled? boolean
---@field image? string|nil
---@field max_concurrency? number
---@field provider? string
---@field timeout_seconds? number

---@class GithubRunnerSetup
---@field error string|nil
---@field github_repository_connection_id string
---@field id string
---@field pull_request_url string|nil
---@field repository_full_name string
---@field roder_thread_id string|nil
---@field runner_labels table
---@field status string
---@field status_label string
---@field summary string|nil

---@class GithubRunnerSetupLoadMatch
---@field organization_id string
---@field id string

---@class GithubRunnerSetupCreateData
---@field organization_id string
---@field github_repository_connection_id string

---@class Gitlab
---@field configured boolean
---@field connections table
---@field integrations table
---@field inventory_error? string|nil
---@field next_page number|nil
---@field organization table
---@field projects table
---@field redirect_uri string|nil
---@field selected_integration_id string|nil

---@class GitlabLoadMatch
---@field organization_id string
---@field connection_id? string
---@field integration_id? string
---@field page? number
---@field search? string
---@field sort? string

---@class GitlabCreateData
---@field organization_id string
---@field client_id? any
---@field client_secret? any
---@field instance_url? any
---@field integration_id? any
---@field return_target? any
---@field webhook_authentication? any

---@class GitlabConnection
---@field id? string

---@class GitlabConnectionCreateData
---@field id string
---@field organization_id string
---@field action_name? any
---@field integration_id? any
---@field source_branch? any

---@class GitlabImport
---@field integration_id string
---@field project_id number
---@field repo_slug? string
---@field source_branch? string

---@class GitlabImportCreateData
---@field organization_id string
---@field integration_id string
---@field project_id number
---@field repo_slug? string
---@field source_branch? string

---@class GitlabOauth

---@class GitlabOauthLoadMatch

---@class GrantAllAgent
---@field all_agents_access boolean
---@field enabled boolean
---@field execution_available boolean

---@class GrantAllAgentCreateData
---@field device_id string
---@field organization_id string
---@field enabled boolean

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
---@field id? string
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

---@class IdentityOrganization
---@field id? string

---@class IdentityOrganizationLoadMatch
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

---@class ImageRepositoryTag
---@field image_repository table
---@field name string
---@field registry_url string
---@field tags table

---@class ImageRepositoryTagListMatch
---@field image_repository_id string

---@class ImportBranchPolicy
---@field can_manage_pr_scenario_writing boolean
---@field can_manage_sandbox_region boolean
---@field dedicated_outbound_ip_addresses table
---@field default_trunk_bookmark string
---@field organization table
---@field sandbox_regions table

---@class ImportBranchPolicyLoadMatch
---@field organization_id string

---@class ImportBranchPolicyUpdateData
---@field organization_id string

---@class ImportBranchPolicyPatchData
---@field organization_id string
---@field default_trunk_bookmark? string

---@class Integration
---@field github table
---@field gitlab table
---@field permissions table
---@field slack table

---@class IntegrationLoadMatch
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

---@class InvocationControl

---@class InvocationControlCreateData
---@field device_id string
---@field organization_id string
---@field challenge? any
---@field invocation_id? any
---@field request_hash? any
---@field signature? any

---@class JobLogChunk
---@field byte_size number
---@field ci_job_id string|nil
---@field ci_pipeline_run_id string|nil
---@field ci_step_id string|nil
---@field content string
---@field content_format string
---@field created_at string
---@field id string
---@field organization_id string
---@field sequence_number number
---@field stream string
---@field updated_at string

---@class JobLogChunkListMatch
---@field job_id string
---@field pipeline_id string
---@field run_id string
---@field after_sequence? number

---@class JobLogChunkCreateData
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobStep
---@field id? string

---@class JobStepLoadMatch
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobStepCreateData
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobStepUpdateData
---@field id string
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobStepPatchData
---@field id string
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobWorkspace
---@field id? string

---@class JobWorkspaceLoadMatch
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobWorkspaceCreateData
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobWorkspaceUpdateData
---@field id string
---@field job_id string
---@field pipeline_id string
---@field run_id string

---@class JobWorkspacePatchData
---@field id string
---@field job_id string
---@field pipeline_id string
---@field run_id string

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

---@class Known

---@class KnownLoadMatch

---@class Label
---@field changes_count number
---@field id string
---@field name string
---@field slug string

---@class LabelListMatch
---@field organization_id string
---@field include_unused? boolean
---@field limit? number
---@field q? string

---@class LeaseArtifact

---@class LeaseArtifactCreateData
---@field lease_id string
---@field node_id string

---@class LeaseCache

---@class LeaseCacheCreateData
---@field lease_id string
---@field node_id string

---@class LeaseLogChunk

---@class LeaseLogChunkCreateData
---@field lease_id string
---@field node_id string

---@class LeaseReconciliation
---@field id? string

---@class LeaseReconciliationCreateData
---@field id string
---@field lease_id string
---@field node_id string

---@class LeaseStep
---@field id? string

---@class LeaseStepUpdateData
---@field id string
---@field lease_id string
---@field node_id string

---@class LeaseVerifyDiagnostic
---@field browser_events table
---@field live_browser? table
---@field live_view? table
---@field steps? table

---@class LeaseVerifyDiagnosticCreateData
---@field lease_id string
---@field swarm_id string
---@field task_id string
---@field browser_events table
---@field live_browser? table
---@field live_view? table
---@field steps? table

---@class LeaseVerifySecret

---@class LeaseVerifySecretCreateData
---@field lease_id string
---@field swarm_id string
---@field task_id string

---@class LeaseWorkspace
---@field id? string

---@class LeaseWorkspaceUpdateData
---@field id string
---@field lease_id string
---@field node_id string

---@class LocalAgentDecision
---@field request table

---@class LocalAgentDecisionCreateData
---@field organization_id string
---@field request table

---@class LocalAgentResponse
---@field input table
---@field model string
---@field service_tier? string|nil
---@field store boolean
---@field stream boolean
---@field tools? table

---@class LocalAgentResponseCreateData
---@field organization_id string
---@field input table
---@field model string
---@field service_tier? string|nil
---@field store boolean
---@field stream boolean
---@field tools? table

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
---@field delivery? table
---@field device_id string
---@field diagnostic_code? string
---@field end? table
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

---@class LogStreamChunk
---@field id? string

---@class LogStreamChunkLoadMatch
---@field id? string
---@field log_stream_id string
---@field space_id string

---@class LogStreamChunkCreateData
---@field log_stream_id string
---@field space_id string

---@class LogoImage
---@field activated_products table
---@field agents_only? boolean
---@field can_activate_products boolean
---@field created_at string
---@field created_at_label string|nil
---@field github_prs_authored_by_change_author boolean
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

---@class LogoImageUpdateData
---@field organization_id string

---@class LogoImageRemoveMatch
---@field organization_id string

---@class MarketingSetting
---@field call_first boolean

---@class MarketingSettingLoadMatch
---@field call_first? boolean

---@class McpOauth

---@class McpOauthLoadMatch
---@field request string

---@class McpOauthCreateData
---@field all_organizations? any
---@field approve? any
---@field organization_id? any
---@field request? any

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
---@field impersonation? table|nil
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
---@field created_at string
---@field created_at_label string|nil
---@field id string
---@field is_self boolean
---@field role string
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

---@class MergeQueueEntry
---@field analytics? table
---@field change_id? string|nil
---@field expected_target_commit_id? string|nil
---@field expected_target_version? number|nil
---@field expected_version number
---@field github_pr_number? number|nil
---@field id? string
---@field idempotency_key string
---@field kind string
---@field policy table
---@field priority? string
---@field queue table
---@field target_branches? table
---@field when_ready? boolean|nil

---@class MergeQueueEntryCreateData
---@field merge_queue_id string
---@field organization_id string
---@field repo_id string
---@field change_id? string|nil
---@field expected_target_commit_id? string|nil
---@field expected_target_version? number|nil
---@field expected_version number
---@field github_pr_number? number|nil
---@field idempotency_key string
---@field kind string
---@field priority? string
---@field when_ready? boolean|nil

---@class MergeQueueEntryRemoveMatch
---@field id string
---@field merge_queue_id string
---@field organization_id string
---@field repo_id string

---@class MergeResolution
---@field action string
---@field base string
---@field content? string|nil
---@field context? table
---@field duration_ms number
---@field fallback boolean
---@field model? string
---@field ours string
---@field path? string
---@field resolved boolean
---@field theirs string

---@class MergeResolutionCreateData
---@field base string
---@field context? table
---@field ours string
---@field path? string
---@field theirs string

---@class MessagingConversationMessage
---@field attachment_limit number
---@field attachment_max_bytes number
---@field client_operation_id string
---@field content string
---@field id? string
---@field media? table
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
---@field media? table
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

---@class MetricQueryLoadMatch

---@class MetronomeWebhook

---@class MetronomeWebhookCreateData

---@class ModelSubscriptionAccount
---@field accounts table
---@field agents table
---@field can_disconnect boolean
---@field connection_agent table|nil
---@field email? string
---@field id string
---@field label string
---@field provider string
---@field saved boolean
---@field status string
---@field usable boolean

---@class ModelSubscriptionAccountListMatch
---@field accounts? table
---@field agents? table
---@field can_disconnect? boolean
---@field connection_agent? table|nil
---@field email? string
---@field id? string
---@field label? string
---@field provider? string
---@field saved? boolean
---@field status? string
---@field usable? boolean

---@class ModelSubscriptionAccountCreateData
---@field label string
---@field action_name? any
---@field agent_id? any
---@field profile_id? any
---@field token? any

---@class ModelSubscriptionAccountUpdateData
---@field id string

---@class ModelSubscriptionAccountPatchData
---@field id string
---@field label? string

---@class ModelSubscriptionAccountRemoveMatch
---@field id string

---@class ModelSubscriptionAccountConnection
---@field id? string

---@class ModelSubscriptionAccountConnectionLoadMatch
---@field id string

---@class ModelSubscriptionAccountConnectionUpdateData
---@field id string
---@field action_name? any
---@field login_id? any
---@field method? any
---@field step_id? any
---@field value? any

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

---@class NetworkingSpace
---@field id? string

---@class NetworkingSpaceLoadMatch
---@field id string

---@class NetworkingSpaceCreateData

---@class NetworkingSpaceUpdateData
---@field id string

---@class NetworkingSpacePatchData
---@field id string

---@class NetworkingSpaceRemoveMatch
---@field id string

---@class Node
---@field account_avatar_url string|nil
---@field account_id string|nil
---@field account_login string
---@field created_at string
---@field created_at_label string|nil
---@field id string
---@field installation_id string
---@field installed_at string|nil
---@field installed_at_label string|nil
---@field manage_access_url string
---@field organization_id string
---@field permission_entries table
---@field permissions table
---@field status string
---@field suspended_at string|nil
---@field suspended_at_label string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class NodeListMatch
---@field organization_id string

---@class NodeCertificate

---@class NodeCertificateCreateData
---@field node_id string

---@class NodeLease
---@field id? string

---@class NodeLeaseLoadMatch
---@field node_id string

---@class NodeLeaseCreateData
---@field id string
---@field node_id string

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

---@class NomadLogLoadMatch
---@field app_id string
---@field environment? string
---@field location? string
---@field offset? number
---@field origin? string
---@field service? string
---@field task? string
---@field type? string

---@class Now
---@field needs_attention table
---@field pagination table
---@field recently_landed table
---@field shipping_now table
---@field summary table

---@class NowLoadMatch
---@field organization_id string
---@field page? number

---@class ObservabilityClickhouseCluster
---@field id? string

---@class ObservabilityClickhouseClusterLoadMatch
---@field id string

---@class ObservabilityClickhouseClusterCreateData

---@class ObservabilityClickhouseClusterUpdateData
---@field id string

---@class ObservabilityClickhouseClusterPatchData
---@field id string

---@class ObservabilityClickhouseClusterRemoveMatch
---@field id string

---@class ObservabilityQuickwitCluster
---@field id? string

---@class ObservabilityQuickwitClusterLoadMatch
---@field id string

---@class ObservabilityQuickwitClusterCreateData

---@class ObservabilityQuickwitClusterUpdateData
---@field id string

---@class ObservabilityQuickwitClusterPatchData
---@field id string

---@class ObservabilityQuickwitClusterRemoveMatch
---@field id string

---@class ObservabilitySpace
---@field id? string

---@class ObservabilitySpaceLoadMatch
---@field id string

---@class ObservabilitySpaceCreateData

---@class ObservabilitySpaceUpdateData
---@field id string

---@class ObservabilitySpacePatchData
---@field id string

---@class ObservabilitySpaceRemoveMatch
---@field id string

---@class Openapi

---@class OpenapiLoadMatch

---@class OrgInvitation
---@field id? string
---@field invitation table
---@field registration_options any
---@field requires_password_setup boolean
---@field start_guided_setup boolean

---@class OrgInvitationLoadMatch
---@field id string

---@class OrgInvitationCreateData
---@field id string

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

---@class OrganizationApp
---@field id? string

---@class OrganizationAppLoadMatch
---@field organization_id string
---@field context? boolean
---@field installed? boolean
---@field native_agent_id string

---@class OrganizationAppUpdateData
---@field id string
---@field organization_id string

---@class OrganizationAppRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationControl

---@class OrganizationControlCreateData
---@field organization_id string
---@field device_id? any
---@field native_device_id? any
---@field pairing_generation? any

---@class OrganizationDevice
---@field id? string

---@class OrganizationDeviceCreateData
---@field id string
---@field organization_id string
---@field payload? any
---@field signature? any

---@class OrganizationIdentityCertificate
---@field id? string

---@class OrganizationIdentityCertificateLoadMatch
---@field id? string
---@field organization_id string

---@class OrganizationIdentityCertificateCreateData
---@field organization_id string

---@class OrganizationIdentityCertificateUpdateData
---@field id string
---@field organization_id string

---@class OrganizationIdentityCertificatePatchData
---@field id string
---@field organization_id string

---@class OrganizationIdentityCertificateRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationInteraction

---@class OrganizationInteractionCreateData
---@field organization_id string

---@class OrganizationInvitation
---@field email string
---@field id? string
---@field role string

---@class OrganizationInvitationCreateData
---@field organization_id string
---@field email string
---@field role string

---@class OrganizationInvitationRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationMessageFile

---@class OrganizationMessageFileCreateData
---@field organization_id string

---@class OrganizationOidcTrust
---@field id? string

---@class OrganizationOidcTrustLoadMatch
---@field id? string
---@field organization_id string

---@class OrganizationOidcTrustCreateData
---@field organization_id string

---@class OrganizationOidcTrustUpdateData
---@field id string
---@field organization_id string

---@class OrganizationOidcTrustPatchData
---@field id string
---@field organization_id string

---@class OrganizationOidcTrustRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationRunEvent

---@class OrganizationRunEventCreateData
---@field organization_id string

---@class OrganizationRunOutcome

---@class OrganizationRunOutcomeCreateData
---@field organization_id string

---@class OrganizationRunUsage

---@class OrganizationRunUsageCreateData
---@field organization_id string

---@class OrganizationSandbox

---@class OrganizationSandboxCreateData
---@field organization_id string

---@class OrganizationSecret
---@field app_environment_id string|nil
---@field app_service_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field created_by table|nil
---@field current_version table|nil
---@field description string|nil
---@field env_key string
---@field expose_to_build boolean
---@field expose_to_ci boolean
---@field hosted_app_id string|nil
---@field id string
---@field last_accessed_at string|nil
---@field last_accessed_at_label string|nil
---@field last_accessed_by table|nil
---@field latest_version_number number|nil
---@field name string
---@field organization_id string|nil
---@field owner_service_account_id string|nil
---@field rotation_policy string|nil
---@field scope_kind string
---@field slug string
---@field status string
---@field updated_at string
---@field updated_at_label string|nil

---@class OrganizationSecretLoadMatch
---@field id string
---@field organization_id string

---@class OrganizationSecretListMatch
---@field organization_id string

---@class OrganizationSecretCreateData
---@field organization_id string

---@class OrganizationSecretUpdateData
---@field id string
---@field organization_id string

---@class OrganizationSecretPatchData
---@field id string
---@field organization_id string

---@class OrganizationSecretRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationServiceAccount
---@field id? string

---@class OrganizationServiceAccountLoadMatch
---@field id? string
---@field organization_id string

---@class OrganizationServiceAccountCreateData
---@field organization_id string

---@class OrganizationServiceAccountUpdateData
---@field id string
---@field organization_id string

---@class OrganizationServiceAccountPatchData
---@field id string
---@field organization_id string

---@class OrganizationServiceAccountRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationSetting
---@field concurrent_run_limit_override? number|nil
---@field customize_onboarding_packages? boolean
---@field daily_run_limit_override? number|nil
---@field deployment_usage_visibility? string
---@field monthly_browser_minutes_limit_override? number|nil
---@field monthly_budget_dollars? string|number|nil
---@field name? string
---@field onboarding_custom_pricing? boolean
---@field onboarding_package_keys? table

---@class OrganizationSettingUpdateData
---@field organization_id string
---@field concurrent_run_limit_override? number|nil
---@field customize_onboarding_packages? boolean
---@field daily_run_limit_override? number|nil
---@field deployment_usage_visibility? string
---@field monthly_browser_minutes_limit_override? number|nil
---@field monthly_budget_dollars? string|number|nil
---@field name? string
---@field onboarding_custom_pricing? boolean
---@field onboarding_package_keys? table

---@class OrganizationSite
---@field id? string

---@class OrganizationSiteLoadMatch
---@field organization_id string
---@field native_agent_id string

---@class OrganizationSiteCreateData
---@field organization_id string

---@class OrganizationSiteUpdateData
---@field id string
---@field organization_id string

---@class OrganizationSiteRemoveMatch
---@field id string
---@field organization_id string

---@class OrganizationSubscription

---@class OrganizationSubscriptionCreateData
---@field organization_id string

---@class OrganizationTool
---@field arguments table
---@field native_agent_id string
---@field tool string

---@class OrganizationToolCreateData
---@field organization_id string
---@field arguments table
---@field native_agent_id string
---@field tool string

---@class OrganizationWorkloadIdentity
---@field id? string

---@class OrganizationWorkloadIdentityLoadMatch
---@field id? string
---@field organization_id string

---@class OrganizationWorkloadIdentityCreateData
---@field organization_id string

---@class OrganizationWorkloadIdentityUpdateData
---@field id string
---@field organization_id string

---@class OrganizationWorkloadIdentityPatchData
---@field id string
---@field organization_id string

---@class OrganizationWorkloadIdentityRemoveMatch
---@field id string
---@field organization_id string

---@class OtelIngest

---@class OtelIngestCreateData

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
---@field integration_search? string
---@field limit? number

---@class PageAgentCreateData
---@field organization_id string
---@field agent_ids? any

---@class PageArtefact
---@field artefact any
---@field automation table|nil
---@field automation_invocation_id? string|nil
---@field byte_size number
---@field checksum_sha256 string
---@field comment_threads table
---@field content_type string
---@field created_at? string|nil
---@field created_by_user_id? string|nil
---@field description? string|nil
---@field document_key? string
---@field draft table|nil
---@field entrypoint? string
---@field expires_at? string|nil
---@field filename string
---@field files? table
---@field harness? string|nil
---@field harness_version? string|nil
---@field id string
---@field kind string
---@field kinds table
---@field model? string|nil
---@field organization table
---@field organization_id string
---@field pagination table
---@field permissions table
---@field preview table
---@field published_at? string|nil
---@field published_at_label string|nil
---@field publisher table|nil
---@field repository table|nil
---@field repository_id? string|nil
---@field selected_path? string
---@field slug string
---@field source string
---@field status string
---@field title string
---@field vcs_agent_checkpoint_id? string|nil
---@field vcs_agent_session_id? string|nil
---@field version number
---@field versions table
---@field view_url string
---@field web_url string

---@class PageArtefactLoadMatch
---@field id string
---@field organization_id string
---@field file? string
---@field version? number
---@field versions_page? number

---@class PageArtefactListMatch
---@field organization_id string
---@field author? string
---@field harness? string
---@field kind? string
---@field model? string
---@field page? number
---@field q? string
---@field repo? string
---@field slug? string
---@field source? string

---@class PageCiPipelineRun
---@field error string|nil
---@field id? string
---@field jobs table

---@class PageCiPipelineRunLoadMatch
---@field id string
---@field pipeline_id string

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

---@class PageRepoVcCommit
---@field commit any
---@field diff_path string
---@field id? string

---@class PageRepoVcCommitLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string
---@field parent? string

---@class PagesBilling
---@field addons table
---@field breakdown any
---@field budget any
---@field can_manage_contact boolean
---@field can_manage_extra_spend boolean
---@field can_manage_local_subscription boolean
---@field can_manage_payment_method boolean
---@field can_set_up_billing boolean
---@field customer any
---@field deployment_usage_visible boolean
---@field entitlements table
---@field extra_spend_enabled boolean
---@field feature_enabled boolean
---@field organization_id string
---@field package any
---@field prepaid any
---@field preview any
---@field storage_usage table
---@field stripe table
---@field subscription any
---@field token_account table

---@class PagesBillingLoadMatch
---@field organization_id string

---@class PagesGithubIntegration
---@field account_avatar_url string|nil
---@field account_login string
---@field connection_status string
---@field connection_status_label string
---@field github_installation any
---@field health table
---@field id string
---@field imported_repositories_count number
---@field imported_repositories_count_label string
---@field organization table
---@field pagination table
---@field repositories table

---@class PagesGithubIntegrationLoadMatch
---@field id string
---@field organization_id string
---@field page? number

---@class PagesGithubIntegrationListMatch
---@field organization_id string

---@class PagesGithubOnboarding
---@field onboarding table
---@field organization table

---@class PagesGithubOnboardingLoadMatch
---@field organization_id string
---@field github_app_installation_id? string
---@field github_import_batch_id? string

---@class PagesMember
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

---@class PagesMemberListMatch
---@field organization_id string

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
---@field access_mode string
---@field active_run_count number
---@field archived_at string|nil
---@field attention table
---@field capabilities string|nil
---@field created_at string
---@field credential any
---@field credential_id string|nil
---@field goals string|nil
---@field health table
---@field id string
---@field lock_version number
---@field name string
---@field project_id string
---@field role string
---@field scenario_count number
---@field updated_at string

---@class PagesProjectPersonaListMatch
---@field organization_id string
---@field project_id string

---@class PagesProjectRun
---@field archived_at string|nil
---@field browser_seconds number|nil
---@field can_archive boolean
---@field can_restore boolean
---@field cleanup_state string
---@field commit_sha string|nil
---@field created_at string
---@field duration_seconds number|nil
---@field environment_name string|nil
---@field finished_at string|nil
---@field id string
---@field outcome string|nil
---@field pull_request any
---@field pull_request_label string|nil
---@field scenario_count number
---@field source_run table|nil
---@field started_at string|nil
---@field state string
---@field title string
---@field trigger_kind string
---@field triggered_by string|nil
---@field web_path string

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

---@class PagesRegistry
---@field active_repository_count number
---@field error string|nil
---@field pagination table
---@field repositories table
---@field repository_count number

---@class PagesRegistryLoadMatch
---@field organization_id string
---@field page? number

---@class PagesSession
---@field adapter? string
---@field created_at string|nil
---@field cursor? string
---@field ended_at string|nil
---@field external_session_id string
---@field facets table
---@field from? string
---@field github_access_warnings? table
---@field harness string
---@field id string
---@field last_activity_at string|nil
---@field last_checkpoint_at string|nil
---@field limit? number
---@field markers table
---@field max_bytes? number
---@field mode? string
---@field offset? number
---@field pagination table
---@field query? string
---@field repo? string
---@field repository any
---@field search? any
---@field search_enabled? boolean
---@field session any
---@field sessions table
---@field started_at string|nil
---@field stats table
---@field status? string
---@field title string|nil
---@field to? string
---@field token_stats any
---@field transcript_index any
---@field transcript_stats any
---@field updated_at string|nil
---@field user any
---@field user_id? string

---@class PagesSessionLoadMatch
---@field id string
---@field organization_id string
---@field around_event? number
---@field checkpoint? string
---@field event_digest? string

---@class PagesSessionListMatch
---@field organization_id string
---@field adapter? string
---@field from? string
---@field limit? number
---@field offset? number
---@field repo? string
---@field session? string
---@field status? string
---@field to? string
---@field user_id? string

---@class PagesSessionCreateData
---@field organization_id string
---@field adapter? string
---@field cursor? string
---@field from? string
---@field limit? number
---@field max_bytes? number
---@field mode? string
---@field offset? number
---@field query? string
---@field repo? string
---@field status? string
---@field to? string
---@field user_id? string

---@class Pairing
---@field id? string

---@class PairingLoadMatch
---@field id string

---@class PairingCreateData

---@class PairingEvent

---@class PairingEventLoadMatch
---@field pairing_id string

---@class ParallelV1

---@class ParallelV1CreateData
---@field organization_id string

---@class PatchsetDiff
---@field files table
---@field id? string
---@field patchset table

---@class PatchsetDiffLoadMatch
---@field change_id string
---@field id string
---@field organization_id string
---@field patchset_id string
---@field repo_id string

---@class PersonalAccessToken
---@field id? string

---@class PersonalAccessTokenLoadMatch
---@field id string

---@class PersonalAccessTokenCreateData

---@class PersonalAccessTokenRemoveMatch
---@field id string

---@class PreviewOperation

---@class PreviewOperationLoadMatch
---@field app_id string
---@field preview_id string

---@class PreviewProfileSecretBinding
---@field env_key string
---@field id? string
---@field mode? string
---@field secret_id? string
---@field secret_version_id? string

---@class PreviewProfileSecretBindingLoadMatch
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
---@field build_secrets table
---@field default_configuration table
---@field default_secrets table
---@field services table
---@field snapshot_version number
---@field source_keys table

---@class PreviewSharingApprovalLoadMatch
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

---@class ProactiveAgentWaitlistEntry
---@field email string
---@field first_task? string|nil
---@field invite_code? string|nil
---@field places_per_referral number
---@field position number
---@field position_after_next_referral number
---@field referral_code string
---@field referral_count number
---@field total number
---@field website? string|nil

---@class ProactiveAgentWaitlistEntryLoadMatch
---@field id string

---@class ProactiveAgentWaitlistEntryCreateData
---@field email string
---@field first_task? string|nil
---@field invite_code? string|nil
---@field website? string|nil

---@class Product
---@field activated_products table
---@field agents_only? boolean
---@field can_activate_products boolean
---@field created_at string
---@field created_at_label string|nil
---@field github_prs_authored_by_change_author boolean
---@field id string
---@field logo_url string|nil
---@field member_count number
---@field name string
---@field pending_invitation_count number
---@field personal boolean
---@field product string
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

---@class ProductCreateData
---@field organization_id string
---@field product string

---@class ProductMapIdentityDecision
---@field observations table
---@field operation string
---@field reason string
---@field target? table

---@class ProductMapIdentityDecisionCreateData
---@field organization_id string
---@field project_id string
---@field observations table
---@field operation string
---@field reason string
---@field target? table

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
---@field overview? table
---@field permissions table
---@field personas table
---@field project table
---@field pull_request_options table
---@field pull_requests table
---@field purpose string|nil
---@field runs table
---@field scenario_history? table
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
---@field android? table
---@field artifact_paths? table
---@field description string
---@field image string
---@field ios? table
---@field launch_command? string
---@field managed_binary? table
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
---@field revision? table
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
---@field environment_ids table
---@field id? string
---@field lock_version number
---@field name string
---@field persona_ids table
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
---@field android? table
---@field artifact_paths? table
---@field description string
---@field image string
---@field ios? table
---@field launch_command? string
---@field managed_binary? table
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
---@field active_runs number
---@field open_findings number
---@field ready_environments number
---@field scenarios table

---@class ProjectOverviewMetricLoadMatch
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

---@class ProjectPrTesting
---@field id? string
---@field project table
---@field pull_request_options table

---@class ProjectPrTestingLoadMatch
---@field id string
---@field organization_id string
---@field provider? string
---@field repository_id? string
---@field repository_search? string
---@field source_repository? string

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

---@class ProjectProductMapComparison
---@field accounts table
---@field comparison any
---@field filters any
---@field id? string
---@field project table
---@field requirements table
---@field revisions table

---@class ProjectProductMapComparisonLoadMatch
---@field id string
---@field organization_id string
---@field account_id? string
---@field area? string
---@field before? string
---@field compare_revision_id? string
---@field persona_id? string
---@field query? string
---@field revision_id? string
---@field since? string

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
---@field identity_probe? table|nil
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

---@class ProjectScenarioOptionLoadMatch
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
---@field id string
---@field name string

---@class ProjectSettingListMatch
---@field organization_id string
---@field project_id string

---@class PullRequestAction
---@field action_name string
---@field body? string
---@field comment_id? string
---@field comments? table
---@field event? string
---@field expected_head_sha? string
---@field id? string|nil
---@field label? string
---@field line? number
---@field node_id? string|nil
---@field operation_key string
---@field path? string
---@field run_id? string
---@field side? string
---@field start_line? number
---@field start_side? string
---@field thread_id? string

---@class PullRequestActionCreateData
---@field number string
---@field organization_id string
---@field pull_request_id string
---@field action_name string
---@field body? string
---@field comment_id? string
---@field comments? table
---@field event? string
---@field expected_head_sha? string
---@field label? string
---@field line? number
---@field operation_key string
---@field path? string
---@field run_id? string
---@field side? string
---@field start_line? number
---@field start_side? string
---@field thread_id? string

---@class PullRequestMagicMerge

---@class PullRequestMagicMergeCreateData
---@field number string
---@field organization_id string
---@field pull_request_id string
---@field expected_base_sha? any
---@field expected_head_sha? any
---@field idempotency_key? any
---@field mode? any
---@field resolutions? any

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

---@class PullRequestSettingLoadMatch
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

---@class PullRequestTranscript
---@field adapter string
---@field created_at string|nil
---@field ended_at string|nil
---@field external_session_id string
---@field harness string
---@field id string
---@field last_activity_at string|nil
---@field last_checkpoint_at string|nil
---@field repository any
---@field started_at string|nil
---@field stats table
---@field status string
---@field title string|nil
---@field updated_at string|nil
---@field user any

---@class PullRequestTranscriptListMatch
---@field organization_id string
---@field pull_request_id string
---@field repo_id string
---@field cursor? string
---@field limit? number
---@field paginated? boolean

---@class PullZone
---@field id string
---@field name string
---@field slug string

---@class PullZoneListMatch
---@field organization_id string
---@field app? string

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

---@class RelayAgentConnection
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

---@class RelayAgentConnectionLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class RelayAgentConnectionListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field selected_connection_id? string

---@class RelayAgentConnectionCreateData
---@field agent_id string
---@field organization_id string
---@field agent_card_url string
---@field auth_scheme string
---@field credential? string|nil
---@field name string
---@field remote_agent? string|nil
---@field source_operation_id? string|nil

---@class RelayAgentConnectionUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field auth_scheme? string
---@field credential? string|nil
---@field expected_generation? number
---@field name? string
---@field remote_agent? string|nil

---@class RelayAgentConnectionRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class RelayAgentLocalThread
---@field id? string

---@class RelayAgentLocalThreadRemoveMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class RelaySignal

---@class RelaySignalCreateData

---@class ReleaseRollout
---@field id? string

---@class ReleaseRolloutLoadMatch
---@field id? string
---@field release_id string

---@class ReleaseRolloutCreateData
---@field release_id string

---@class Repo
---@field can_retry_import boolean
---@field can_retry_sync boolean
---@field disclaimer string|nil
---@field federated_in_home boolean
---@field github_repository string|nil
---@field icon_name string
---@field id string
---@field import_item_id string|nil
---@field is_home boolean
---@field name string
---@field remote_repository? string|nil
---@field root_path string|nil
---@field slug string
---@field sync_error_message string|nil
---@field sync_provider? string
---@field sync_status string

---@class RepoLoadMatch
---@field id string
---@field organization_id string

---@class RepoListMatch
---@field organization_id string
---@field direction? string
---@field page? number
---@field q? string
---@field sort? string

---@class RepoRemoveMatch
---@field id string
---@field organization_id string

---@class RepoAccessToken
---@field access_token table
---@field active boolean
---@field created_at string
---@field created_at_label string|nil
---@field credential_purpose? string
---@field expires_at string|nil
---@field expires_at_label string|nil
---@field expires_in_days? number|nil
---@field id string
---@field last_used_at string|nil
---@field last_used_at_label string|nil
---@field name string
---@field permission_level? string
---@field plain_text_token string
---@field revoked_at string|nil
---@field revoked_at_label string|nil
---@field token_preview string
---@field updated_at string
---@field updated_at_label string|nil

---@class RepoAccessTokenListMatch
---@field organization_id string
---@field repo_id string

---@class RepoAccessTokenCreateData
---@field organization_id string
---@field repo_id string
---@field credential_purpose? string
---@field expires_in_days? number|nil
---@field name string
---@field permission_level? string

---@class RepoAccessTokenRemoveMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoAction
---@field pipeline table
---@field run table

---@class RepoActionListMatch
---@field organization_id string
---@field repo_id string
---@field pipeline_id? string
---@field range? string

---@class RepoAgentCheckpoint
---@field id? string

---@class RepoAgentCheckpointLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoAgentSession
---@field adapter? string
---@field agent_session table
---@field external_session_id? string
---@field id? string
---@field status? string
---@field title? string|nil

---@class RepoAgentSessionLoadMatch
---@field id? string
---@field organization_id string
---@field repo_id string

---@class RepoAgentSessionCreateData
---@field organization_id string
---@field repo_id string

---@class RepoAgentSessionUpdateData
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoAgentSessionPatchData
---@field id string
---@field organization_id string
---@field repo_id string
---@field agent_session? table

---@class RepoBookmarkProtection
---@field actor_policy table
---@field bypass_mode string
---@field created_at string
---@field created_by_user_id string|nil
---@field enabled boolean
---@field id string
---@field name string
---@field organization_id string
---@field priority number
---@field repository_id string
---@field requirements table
---@field target_kind string
---@field target_pattern string|nil
---@field updated_at string
---@field updated_by_user_id string|nil

---@class RepoBookmarkProtectionLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoBookmarkProtectionListMatch
---@field organization_id string
---@field repo_id string

---@class RepoBookmarkProtectionCreateData
---@field organization_id string
---@field repo_id string
---@field actor_policy? table
---@field bypass_mode? string
---@field enabled? boolean
---@field name? string
---@field priority? number
---@field requirements? table
---@field target_kind? string
---@field target_pattern? string|nil

---@class RepoBookmarkProtectionUpdateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field actor_policy? table
---@field bypass_mode? string
---@field enabled? boolean
---@field name? string
---@field priority? number
---@field requirements? table
---@field target_kind? string
---@field target_pattern? string|nil

---@class RepoBookmarkProtectionPatchData
---@field id string
---@field organization_id string
---@field repo_id string
---@field actor_policy? table
---@field bypass_mode? string
---@field enabled? boolean
---@field name? string
---@field priority? number
---@field requirements? table
---@field target_kind? string
---@field target_pattern? string|nil

---@class RepoBookmarkProtectionRemoveMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoBookmarkProtectionEvent
---@field action string
---@field actor_kind string
---@field actor_label string|nil
---@field actor_user_id string|nil
---@field bookmark_name string
---@field bookmark_protection_rule_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field decision string
---@field id string
---@field intent string|nil
---@field metadata table
---@field new_target string|nil
---@field old_target string|nil
---@field organization_id string
---@field reason_codes table
---@field repository_id string
---@field source_request_id string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class RepoBookmarkProtectionEventListMatch
---@field organization_id string
---@field repo_id string
---@field bookmark? string
---@field limit? number

---@class RepoCloudWorkspaceBackup
---@field id? string

---@class RepoCloudWorkspaceBackupLoadMatch
---@field id? string
---@field organization_id string
---@field repo_id string

---@class RepoCloudWorkspaceBackupCreateData
---@field organization_id string
---@field repo_id string

---@class RepoCodeRule
---@field active_revision_number number|nil
---@field capabilities table
---@field code_rule any
---@field created_at string
---@field definition table
---@field draft_pending boolean
---@field enabled boolean
---@field expected_version number
---@field id string
---@field latest_revision_number number
---@field name string
---@field repository table
---@field scope table
---@field slug string
---@field state_version number
---@field updated_at string
---@field web_url string

---@class RepoCodeRuleLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoCodeRuleListMatch
---@field organization_id string
---@field repo_id string
---@field rule? string

---@class RepoCodeRuleCreateData
---@field organization_id string
---@field repo_id string
---@field definition table

---@class RepoCodeRuleUpdateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field definition? table
---@field expected_version? number

---@class RepoCodeRulePatchData
---@field id string
---@field organization_id string
---@field repo_id string
---@field definition? table
---@field expected_version? number

---@class RepoCodeRuleRemoveMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class RepoSetting
---@field active boolean
---@field created_at string
---@field created_at_label string|nil
---@field description string|nil
---@field expires_at string|nil
---@field expires_at_label string|nil
---@field icon_name string
---@field id string
---@field last_used_at string|nil
---@field last_used_at_label string|nil
---@field merge_authority string
---@field name string
---@field organization_id string
---@field permission_level string
---@field revoked_at string|nil
---@field revoked_at_label string|nil
---@field slug string
---@field status string
---@field token_preview string
---@field updated_at string
---@field updated_at_label string|nil

---@class RepoSettingListMatch
---@field organization_id string
---@field repo_id string

---@class RepoSettingUpdateData
---@field organization_id string
---@field repo_id string
---@field description? string|nil
---@field icon_name? string
---@field name? string
---@field status? string

---@class RepoStat
---@field backend string
---@field can_refresh boolean
---@field freshness table
---@field note string
---@field physical table
---@field series table

---@class RepoStatLoadMatch
---@field organization_id string
---@field repo_id string

---@class RepoStatCreateData
---@field organization_id string
---@field repo_id string
---@field backend string
---@field can_refresh boolean
---@field freshness table
---@field note string
---@field physical table
---@field series table

---@class RepoVc

---@class RepoVcLoadMatch
---@field organization_id string
---@field repo_id string
---@field path? string
---@field ref? string

---@class RepoVcCreateData
---@field organization_id string
---@field repo_id string
---@field from? any
---@field into? any

---@class RepoVcUpdateData
---@field organization_id string
---@field repo_id string
---@field auto_land_enabled? any
---@field expected_version? any
---@field github_merge_gate? any
---@field merge_authority? any
---@field merge_github_repository_connection_id? any
---@field queue_concurrency? any
---@field queue_validation_mode? any

---@class RepoVcCommit
---@field name string
---@field target_commit_id string

---@class RepoVcCommitListMatch
---@field organization_id string
---@field repo_id string
---@field limit? number
---@field offset? number
---@field page? number
---@field path? string
---@field q? string
---@field ref string

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

---@class RepositoryAccess

---@class RepositoryAccessLoadMatch
---@field organization_slug? string

---@class RepositoryAccessCreateData

---@class RepositoryAccessResolve
---@field default_branch string
---@field git_auth_username string
---@field git_https_clone_url string|nil
---@field git_https_supported boolean
---@field github_access_warnings? table
---@field id? string
---@field membership_role string
---@field organization_id string
---@field organization_name string
---@field organization_slug string
---@field repository_id string
---@field repository_name string
---@field repository_slug string

---@class RepositoryAccessResolveLoadMatch
---@field id string
---@field resolve_id string

---@class RepositoryEvent

---@class RepositoryEventCreateData

---@class RepositoryImport
---@field can_manage_connections boolean
---@field github_imports table
---@field github_installations table
---@field gitlab_configured boolean
---@field gitlab_imports table
---@field gitlab_integrations table
---@field gitlab_redirect_uri string|nil
---@field gitlab_self_managed_available boolean
---@field inventory_errors table
---@field organization_id string
---@field repositories table

---@class RepositoryImportLoadMatch
---@field organization_id string
---@field accounts_only? boolean
---@field search? string

---@class RepositoryImportSession
---@field action_required? string
---@field authorization_endpoint? string
---@field can_authorize_github boolean
---@field client_name string|nil
---@field client_version string|nil
---@field created_at string
---@field error_message string|nil
---@field expires_at string
---@field git_imports table
---@field github_app_installation_id string|nil
---@field github_connected boolean
---@field id string
---@field idempotency_key string
---@field organization_id string
---@field organization_slug string
---@field status string
---@field updated_at string

---@class RepositoryImportSessionLoadMatch
---@field id string

---@class RepositoryImportSessionCreateData
---@field organization_id string
---@field client_name? string|nil
---@field client_version? string|nil
---@field github_app_installation_id? string|nil
---@field idempotency_key string

---@class RepositoryImportSessionRepository
---@field default_branch string|nil
---@field full_name string
---@field name string
---@field owner string
---@field private boolean
---@field reason? string|nil
---@field selectable boolean
---@field status string
---@field visibility string

---@class RepositoryImportSessionRepositoryListMatch
---@field repository_import_session_id string
---@field q? string

---@class RepositoryImportSessionSelection
---@field repositories any

---@class RepositoryImportSessionSelectionCreateData
---@field repository_import_session_id string
---@field repositories any

---@class RepositorySandboxEnvironment
---@field id? string

---@class RepositorySandboxEnvironmentLoadMatch
---@field id string
---@field repository_id string

---@class RepositorySandboxEnvironmentCreateData
---@field repository_id string

---@class RoderCodeRepair
---@field base_sha string
---@field cancel_requested boolean
---@field failure_code string|nil
---@field id string
---@field launch_state string
---@field organization_id string
---@field repository_slug string
---@field roder_thread_id string|nil
---@field roder_turn_id string|nil
---@field scenario_run_id string
---@field task table|nil
---@field trigger_kind string

---@class RoderCodeRepairLoadMatch
---@field id string

---@class RoderCodeRepairCreateData
---@field base_sha string
---@field organization_id string
---@field repository_slug string
---@field scenario_run_id string

---@class RoderCodeRepairSetting
---@field available boolean
---@field daily_limit number
---@field enabled boolean
---@field enabled_at string|nil
---@field operator_user_id string|nil
---@field organization_id string
---@field repository_slug string|nil

---@class RoderCodeRepairSettingLoadMatch
---@field organization_id string

---@class RoderCodeRepairSettingCreateData
---@field enabled boolean
---@field organization_id string
---@field repository_slug? string|nil

---@class RoderMachine
---@field id? string

---@class RoderMachineUpdateData
---@field id string

---@class RoderRun

---@class RoderRunCreateData
---@field events? any

---@class RoderWorkspaceCredential
---@field api_token string
---@field author_email string
---@field author_name string
---@field clone_url string
---@field default_branch string
---@field expires_at string
---@field organization_id string
---@field repository_id string
---@field repository_slug string
---@field repository_spec string
---@field required_lifetime_seconds number
---@field token string
---@field username string

---@class RoderWorkspaceCredentialCreateData
---@field required_lifetime_seconds number

---@class RunArtifact

---@class RunArtifactLoadMatch
---@field pipeline_id string
---@field run_id string

---@class RunArtifactCreateData
---@field pipeline_id string
---@field run_id string

---@class RunJob
---@field active boolean
---@field allow_failure boolean
---@field cache_archive_observations? table|nil
---@field ci_pipeline_run_id string
---@field ci_runner_id string|nil
---@field created_at string
---@field dependencies_csv string|nil
---@field display_id number
---@field environment_csv string|nil
---@field execution_order number
---@field execution_profile? string|nil
---@field exit_code number|nil
---@field failed boolean
---@field finished_at string|nil
---@field id string
---@field kind string
---@field log_chunks table
---@field name string
---@field number number
---@field organization_id string
---@field queued_at string|nil
---@field reconciliation_id? string|nil
---@field retry_number number
---@field reuse? table|nil
---@field runner_label_selector string|nil
---@field slug string
---@field started_at string|nil
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string
---@field steps table
---@field timeout_seconds number|nil
---@field updated_at string

---@class RunJobLoadMatch
---@field id? string
---@field pipeline_id string
---@field run_id string

---@class RunJobCreateData
---@field pipeline_id string
---@field run_id string

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

---@class RunUpdateLoadMatch
---@field organization_id string
---@field page? number
---@field query? string
---@field status? string
---@field verify_environment_id? string

---@class RunWorkspaceCredential

---@class RunWorkspaceCredentialCreateData

---@class RunnerLease
---@field id? string

---@class RunnerLeaseLoadMatch
---@field runner_id string
---@field runner_pool_id string

---@class RunnerLeaseCreateData
---@field runner_id string
---@field runner_pool_id string

---@class RunnerPoolNodeEnrollmentToken
---@field capabilities_csv string|nil
---@field ci_runner_pool_id string
---@field created_at string
---@field created_at_label string|nil
---@field creator_user_id string|nil
---@field description string|nil
---@field expires_at string|nil
---@field expires_at_label string|nil
---@field id string
---@field kind string
---@field last_used_at string|nil
---@field last_used_at_label string|nil
---@field name string
---@field organization_id string
---@field raw_token string|nil
---@field revoked_at string|nil
---@field status string
---@field token_hint string
---@field updated_at string
---@field updated_at_label string|nil
---@field usage_count number
---@field usage_count_label string

---@class RunnerPoolNodeEnrollmentTokenListMatch
---@field runner_pool_id string

---@class RunnerPoolNodeEnrollmentTokenCreateData
---@field runner_pool_id string
---@field capabilities_csv? string|nil
---@field description? string|nil
---@field expires_at? string|nil
---@field kind? string
---@field name string

---@class RunnerPoolRunner
---@field id? string

---@class RunnerPoolRunnerLoadMatch
---@field id? string
---@field runner_pool_id string

---@class RunnerPoolRunnerCreateData
---@field runner_pool_id string

---@class RunnerPoolRunnerUpdateData
---@field id string
---@field runner_pool_id string

---@class RunnerPoolRunnerPatchData
---@field id string
---@field runner_pool_id string

---@class RuntimeInstanceHealthSnapshot

---@class RuntimeInstanceHealthSnapshotLoadMatch
---@field runtime_instance_id string

---@class RuntimeInstanceHealthSnapshotCreateData
---@field runtime_instance_id string

---@class SandboxIntegration
---@field can_manage boolean
---@field catalog table
---@field configuration table
---@field connected_profiles table
---@field credentials table
---@field enabled boolean
---@field id string
---@field integrations table
---@field name string
---@field provider string
---@field version number

---@class SandboxIntegrationLoadMatch
---@field organization_id string
---@field provider? string

---@class SandboxIntegrationCreateData
---@field organization_id string
---@field configuration table
---@field credentials table
---@field name string
---@field provider string

---@class SandboxIntegrationUpdateData
---@field id string
---@field organization_id string
---@field credentials? table
---@field enabled? boolean
---@field name? string
---@field version? number

---@class SandboxIntegrationPatchData
---@field id string
---@field organization_id string
---@field credentials? table
---@field enabled? boolean
---@field name? string
---@field version? number

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

---@class SecretGrant
---@field id? string

---@class SecretGrantLoadMatch
---@field id? string
---@field organization_id string
---@field secret_id string

---@class SecretGrantCreateData
---@field organization_id string
---@field secret_id string

---@class SecretGrantUpdateData
---@field id string
---@field organization_id string
---@field secret_id string

---@class SecretGrantPatchData
---@field id string
---@field organization_id string
---@field secret_id string

---@class SecretGrantRemoveMatch
---@field id string
---@field organization_id string
---@field secret_id string

---@class SecretVersion
---@field id? string

---@class SecretVersionLoadMatch
---@field id? string
---@field organization_id string
---@field secret_id string

---@class SecretVersionCreateData
---@field organization_id string
---@field secret_id string

---@class SecretVersionUpdateData
---@field id string
---@field organization_id string
---@field secret_id string

---@class SecretVersionPatchData
---@field id string
---@field organization_id string
---@field secret_id string

---@class SecretVersionRemoveMatch
---@field id string
---@field organization_id string
---@field secret_id string

---@class ServiceEndpoint
---@field id? string

---@class ServiceEndpointLoadMatch
---@field app_id string
---@field id? string
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

---@class Setting
---@field can_manage_pr_scenario_writing boolean
---@field can_manage_sandbox_region boolean
---@field dedicated_outbound_ip_addresses table
---@field default_trunk_bookmark string
---@field organization table
---@field sandbox_regions table

---@class SettingLoadMatch
---@field organization_id string

---@class SettingMutationLease

---@class SettingMutationLeaseCreateData
---@field organization_id string
---@field repo_id string
---@field reason? any

---@class Signal
---@field acked_at string|nil
---@field acked_by? table|nil
---@field agent_runs? table
---@field app_service_id string|nil
---@field attribution table
---@field created_at string
---@field dedupe_key string|nil
---@field hosted_app_id string|nil
---@field id string
---@field kind string
---@field links table
---@field occurred_at string
---@field organization_id string
---@field payload table
---@field recovery? table
---@field resolution? table
---@field severity string
---@field source table
---@field subject_id string|nil
---@field subject_type string|nil
---@field summary string

---@class SignalLoadMatch
---@field id string
---@field organization_id string

---@class SignalListMatch
---@field organization_id string
---@field after_id? string
---@field before_id? string
---@field hosted_app_id? string
---@field integration_id? string
---@field kind? string
---@field limit? number
---@field min_severity? string
---@field order? string
---@field severity? string
---@field since? string
---@field source? string
---@field subscription_id? string
---@field unacked? boolean

---@class SignalCreateData

---@class SignalInbound
---@field id? string

---@class SignalInboundUpdateData
---@field id string
---@field inbound_id string

---@class SignalIntegration
---@field api_token? string
---@field api_token_stored boolean
---@field config table
---@field created_at? string|nil
---@field failure_message string|nil
---@field id string
---@field inbound_path string
---@field inbound_url string
---@field last_received_at? string|nil
---@field last_verified_at? string|nil
---@field mode string
---@field name string
---@field organization_id string
---@field provider string
---@field rejected_signature_count number
---@field status string
---@field target_count number
---@field unmapped_delivery_count number
---@field updated_at? string|nil
---@field webhook_secret? string
---@field webhook_secret_stored boolean

---@class SignalIntegrationLoadMatch
---@field id string
---@field organization_id string

---@class SignalIntegrationListMatch
---@field organization_id string

---@class SignalIntegrationCreateData
---@field organization_id string
---@field api_token? string
---@field config? table
---@field mode? string
---@field name string
---@field provider string
---@field webhook_secret? string

---@class SignalIntegrationUpdateData
---@field id string
---@field organization_id string
---@field api_token? string
---@field config? table
---@field mode? string
---@field name? string
---@field status? string
---@field webhook_secret? string

---@class SignalIntegrationPatchData
---@field id string
---@field organization_id string
---@field api_token? string
---@field config? table
---@field mode? string
---@field name? string
---@field status? string
---@field webhook_secret? string

---@class SignalIntegrationRemoveMatch
---@field id string
---@field organization_id string

---@class SignalIntegrationDelivery
---@field attempt_count number
---@field created_at? string|nil
---@field delivery_id string
---@field event_kind? string|nil
---@field id string
---@field last_error? string|nil
---@field ops_signal_id? string|nil
---@field organization_id string
---@field processed_at? string|nil
---@field provider string
---@field received_at? string|nil
---@field signal_integration_id string
---@field state string

---@class SignalIntegrationDeliveryListMatch
---@field organization_id string
---@field signal_integration_id string
---@field limit? number

---@class SignalIntegrationTarget
---@field app_service_id? string|nil
---@field created_at? string|nil
---@field display_name? string|nil
---@field enabled boolean
---@field external_id string
---@field external_kind string
---@field external_slug? string|nil
---@field hosted_app_id? string|nil
---@field id string
---@field organization_id string
---@field signal_integration_id string
---@field signal_integration_targets table
---@field targets table
---@field updated_at? string|nil

---@class SignalIntegrationTargetListMatch
---@field organization_id string
---@field signal_integration_id string

---@class SignalIntegrationTargetUpdateData
---@field organization_id string
---@field signal_integration_id string
---@field targets? table

---@class SignalSubscription
---@field id? string

---@class SignalSubscriptionLoadMatch
---@field id? string
---@field organization_id string

---@class SignalSubscriptionCreateData
---@field organization_id string

---@class SignalSubscriptionUpdateData
---@field id string
---@field organization_id string

---@class SignalSubscriptionPatchData
---@field id string
---@field organization_id string

---@class SignalSubscriptionRemoveMatch
---@field id string
---@field organization_id string

---@class Site
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

---@class SiteListMatch
---@field organization_id string
---@field site? string

---@class SiteAccessKey
---@field id? string

---@class SiteAccessKeyLoadMatch
---@field organization_id string
---@field site_id string

---@class SiteAccessKeyCreateData
---@field organization_id string
---@field site_id string

---@class SiteAccessKeyRemoveMatch
---@field id string
---@field organization_id string
---@field site_id string

---@class SitePreview
---@field icon_data_url string|nil
---@field title string|nil
---@field url string

---@class SitePreviewLoadMatch
---@field organization_id string
---@field url string

---@class SiteSecret
---@field id? string
---@field native_agent_id string
---@field value string

---@class SiteSecretUpdateData
---@field id string
---@field organization_id string
---@field site_id string
---@field native_agent_id? string
---@field value? string

---@class SiteSecretRemoveMatch
---@field id string
---@field organization_id string
---@field site_id string

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

---@class SourceConnection
---@field id? string

---@class SourceConnectionCreateData
---@field id string

---@class SpaceAlertRule
---@field id? string

---@class SpaceAlertRuleLoadMatch
---@field id? string
---@field space_id string

---@class SpaceAlertRuleCreateData
---@field space_id string

---@class SpaceAlertRuleUpdateData
---@field id string
---@field space_id string

---@class SpaceAlertRulePatchData
---@field id string
---@field space_id string

---@class SpaceAlertRuleRemoveMatch
---@field id string
---@field space_id string

---@class SpaceAuditEvent

---@class SpaceAuditEventLoadMatch
---@field space_id string

---@class SpaceAuditEventCreateData
---@field space_id string

---@class SpaceDnsRecord
---@field id? string

---@class SpaceDnsRecordLoadMatch
---@field id? string
---@field space_id string

---@class SpaceDnsRecordCreateData
---@field space_id string

---@class SpaceDnsRecordUpdateData
---@field id string
---@field space_id string

---@class SpaceDnsRecordPatchData
---@field id string
---@field space_id string

---@class SpaceDnsRecordRemoveMatch
---@field id string
---@field space_id string

---@class SpaceEnrollmentToken
---@field id? string

---@class SpaceEnrollmentTokenLoadMatch
---@field id? string
---@field space_id string

---@class SpaceEnrollmentTokenCreateData
---@field space_id string

---@class SpaceEnrollmentTokenUpdateData
---@field id string
---@field space_id string

---@class SpaceEnrollmentTokenPatchData
---@field id string
---@field space_id string

---@class SpaceEnrollmentTokenRemoveMatch
---@field id string
---@field space_id string

---@class SpaceGateway
---@field id? string

---@class SpaceGatewayLoadMatch
---@field id? string
---@field space_id string

---@class SpaceGatewayCreateData
---@field space_id string

---@class SpaceGatewayUpdateData
---@field id string
---@field space_id string

---@class SpaceGatewayPatchData
---@field id string
---@field space_id string

---@class SpaceGatewayRemoveMatch
---@field id string
---@field space_id string

---@class SpaceGroup
---@field id? string

---@class SpaceGroupLoadMatch
---@field space_id string

---@class SpaceGroupCreateData
---@field space_id string

---@class SpaceGroupUpdateData
---@field id string
---@field space_id string

---@class SpaceGroupPatchData
---@field id string
---@field space_id string

---@class SpaceGroupRemoveMatch
---@field id string
---@field space_id string

---@class SpaceGroupMembership
---@field id? string

---@class SpaceGroupMembershipLoadMatch
---@field space_id string

---@class SpaceGroupMembershipCreateData
---@field space_id string

---@class SpaceGroupMembershipUpdateData
---@field id string
---@field space_id string

---@class SpaceGroupMembershipPatchData
---@field id string
---@field space_id string

---@class SpaceGroupMembershipRemoveMatch
---@field id string
---@field space_id string

---@class SpaceLogStream

---@class SpaceLogStreamLoadMatch
---@field space_id string

---@class SpaceLogStreamCreateData
---@field space_id string

---@class SpaceMetricSery

---@class SpaceMetricSeryLoadMatch
---@field space_id string

---@class SpaceMetricSeryCreateData
---@field space_id string

---@class SpaceOtelCollector
---@field id? string

---@class SpaceOtelCollectorLoadMatch
---@field id? string
---@field space_id string

---@class SpaceOtelCollectorCreateData
---@field space_id string

---@class SpaceOtelCollectorUpdateData
---@field id string
---@field space_id string

---@class SpaceOtelCollectorPatchData
---@field id string
---@field space_id string

---@class SpaceOtelCollectorRemoveMatch
---@field id string
---@field space_id string

---@class SpacePeer
---@field id? string

---@class SpacePeerLoadMatch
---@field id? string
---@field space_id string

---@class SpacePeerCreateData
---@field space_id string

---@class SpacePeerUpdateData
---@field id string
---@field space_id string

---@class SpacePeerPatchData
---@field id string
---@field space_id string

---@class SpacePeerRemoveMatch
---@field id string
---@field space_id string

---@class SpacePeerAttachment
---@field id? string

---@class SpacePeerAttachmentLoadMatch
---@field space_id string

---@class SpacePeerAttachmentCreateData
---@field space_id string

---@class SpacePeerAttachmentUpdateData
---@field id string
---@field space_id string

---@class SpacePeerAttachmentPatchData
---@field id string
---@field space_id string

---@class SpacePeerAttachmentRemoveMatch
---@field id string
---@field space_id string

---@class SpacePolicy
---@field id? string

---@class SpacePolicyLoadMatch
---@field id? string
---@field space_id string

---@class SpacePolicyCreateData
---@field space_id string

---@class SpacePolicyUpdateData
---@field id string
---@field space_id string

---@class SpacePolicyPatchData
---@field id string
---@field space_id string

---@class SpacePolicyRemoveMatch
---@field id string
---@field space_id string

---@class SpaceSegment
---@field id? string

---@class SpaceSegmentLoadMatch
---@field id? string
---@field space_id string

---@class SpaceSegmentCreateData
---@field space_id string

---@class SpaceSegmentUpdateData
---@field id string
---@field space_id string

---@class SpaceSegmentPatchData
---@field id string
---@field space_id string

---@class SpaceSegmentRemoveMatch
---@field id string
---@field space_id string

---@class SpaceTraceSpan

---@class SpaceTraceSpanLoadMatch
---@field space_id string

---@class SpaceTraceSpanCreateData
---@field space_id string

---@class Spark
---@field activated_products table
---@field agents_only? boolean
---@field can_activate_products boolean
---@field can_manage boolean
---@field compute_credit_cents number|nil
---@field created_at string
---@field created_at_label string|nil
---@field credit_cents number|nil
---@field first_spark table|nil
---@field github_connected boolean
---@field github_prs_authored_by_change_author boolean
---@field id string
---@field jsonrpc string
---@field logo_url string|nil
---@field member_count number
---@field method string
---@field name string
---@field params? table
---@field pending_invitation_count number
---@field personal boolean
---@field repository_count number
---@field role string|nil
---@field sandbox_region string
---@field shared_agent_personal_accounts_enabled? boolean
---@field slug string
---@field source_control_providers? table
---@field source_ui_enabled? boolean
---@field started boolean
---@field timezone string
---@field updated_at string
---@field updated_at_label string|nil
---@field verify_pr_scenario_writing_enabled boolean

---@class SparkLoadMatch
---@field organization_id string

---@class SparkCreateData
---@field id? string
---@field jsonrpc string
---@field method string
---@field params? table

---@class SparkAgentIntegration
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

---@class SparkAgentIntegrationLoadMatch
---@field agent_id string
---@field organization_id string
---@field catalog_q? string
---@field cursor? string
---@field limit? number
---@field q? string
---@field toolkit? string

---@class SparkAgentIntegrationCreateData
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number
---@field q? string
---@field toolkit? string
---@field connection_id string
---@field enabled boolean
---@field generation number

---@class SparkAgentLocalThread
---@field action string
---@field archived boolean
---@field can_archive boolean
---@field can_disconnect_relay? boolean
---@field can_end boolean
---@field can_interrupt boolean
---@field can_send boolean
---@field created_at string
---@field delivery? table
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
---@field relay_participant? table
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

---@class SparkAgentSite
---@field deployed_at string
---@field deployments_count number
---@field hostname string
---@field https string
---@field id string
---@field name string
---@field url string
---@field visibility string

---@class SparkAgentSiteListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class SparkAgentSkill
---@field available boolean
---@field can_configure boolean
---@field can_manage boolean
---@field configuration_state? string
---@field description string
---@field enabled boolean
---@field name string
---@field skills table
---@field version string

---@class SparkAgentSkillListMatch
---@field agent_id string
---@field organization_id string

---@class SparkAgentSkillCreateData
---@field agent_id string
---@field organization_id string
---@field enabled boolean
---@field name string
---@field version string

---@class SparkAgentThread
---@field archive_deletes_sandbox? boolean
---@field archived boolean
---@field attention table|nil
---@field can_archive boolean
---@field can_compact boolean
---@field can_snooze boolean
---@field coordination_status? string|nil
---@field execution? any
---@field first_input? any
---@field first_input_key? string
---@field first_input_requester_membership_id? string
---@field group string
---@field has_active_run boolean
---@field id string
---@field inherit_context? boolean
---@field is_main boolean
---@field kind string
---@field message? string
---@field older boolean
---@field parent_conversation_id? string
---@field parent_conversation_title? string
---@field requester_membership_id? string
---@field snoozed_until string|nil
---@field thread table
---@field title? string
---@field updated_at string|nil

---@class SparkAgentThreadListMatch
---@field agent_id string
---@field organization_id string
---@field archived? boolean
---@field conversation_id? string
---@field cursor? string
---@field local_cursor? string

---@class SparkAgentThreadCreateData
---@field agent_id string
---@field organization_id string
---@field execution? any
---@field inherit_context? boolean
---@field message? string
---@field parent_conversation_id? string
---@field requester_membership_id? string
---@field title? string

---@class SparkAutomation
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

---@class SparkAutomationLoadMatch
---@field agent_id string
---@field id string
---@field organization_id string

---@class SparkAutomationListMatch
---@field agent_id string
---@field organization_id string
---@field cursor? string
---@field limit? number

---@class SparkAutomationUpdateData
---@field agent_id string
---@field id string
---@field organization_id string
---@field definition? table
---@field expected_revision? number

---@class SparkCredit
---@field amount_cents? number
---@field autofill any
---@field autofill_payment_unconfirmed boolean
---@field available_usd string
---@field billing_unit? string
---@field can_manage boolean
---@field compute_minutes? table
---@field compute_usd? string
---@field credits_per_usd number
---@field inference_usd? string
---@field kind string
---@field payment_method table|nil
---@field payments_enabled boolean
---@field plan string|nil
---@field plans table
---@field quoted_credits_cents? number
---@field quoted_price_cents? number
---@field refill_limits_cents table
---@field refill_options table
---@field refill_thresholds_cents table
---@field request_key string
---@field settings any
---@field starter_cents number
---@field top_up_max_cents number
---@field top_up_step_cents number

---@class SparkCreditLoadMatch
---@field organization_id string
---@field view? string

---@class SparkCreditCreateData
---@field organization_id string
---@field amount_cents? number
---@field billing_unit? string
---@field kind string
---@field plan? string|nil
---@field quoted_credits_cents? number
---@field quoted_price_cents? number
---@field request_key string

---@class SparkCreditUpdateData
---@field organization_id string

---@class SparkCreditPatchData
---@field organization_id string
---@field view? string
---@field settings? any

---@class SparkCreditAgentUsage
---@field agents table
---@field all table
---@field days table
---@field id? string
---@field owners table

---@class SparkCreditAgentUsageLoadMatch
---@field id string
---@field organization_id string

---@class SparkCreditUsageTotal
---@field compute_minutes_used string
---@field compute_usd string
---@field inference_usd string

---@class SparkCreditUsageTotalLoadMatch
---@field organization_id string

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

---@class StatusChange
---@field change_id string
---@field id? string
---@field patchsets table
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string

---@class StatusChangeLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class StatusCommit
---@field checks table
---@field commit_sha string
---@field counts table
---@field id? string
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string
---@field total number

---@class StatusCommitLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class StatusPatchset
---@field checks table
---@field checks_status string|nil
---@field commit_sha string|nil
---@field counts table
---@field id? string
---@field patchset_id string
---@field status string
---@field status_label string
---@field status_state string
---@field status_tone string
---@field total number

---@class StatusPatchsetLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class StripeWebhook

---@class StripeWebhookCreateData

---@class SubmitTelemetry

---@class SubmitTelemetryCreateData

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

---@class SwarmEvent
---@field agent_swarm_id string
---@field attempt_id string|nil
---@field created_at string
---@field created_at_label string|nil
---@field id number
---@field kind string
---@field payload table
---@field reason string|nil
---@field scheduler_generation number|nil
---@field task_id string|nil

---@class SwarmEventListMatch
---@field swarm_id string
---@field after? number
---@field kind? string
---@field limit? number

---@class SwarmLive

---@class SwarmLiveLoadMatch
---@field swarm_id string
---@field after_event_id? number
---@field after_seq? number
---@field cursor? string
---@field limit? number

---@class SwarmNote
---@field task_id? string|nil
---@field text string

---@class SwarmNoteCreateData
---@field swarm_id string
---@field task_id? string|nil
---@field text string

---@class SwarmTask
---@field acceptance_commands table
---@field agent_swarm_id string
---@field assigned_runner_id string|nil
---@field blocked_reason string|nil
---@field changes table
---@field commit_count number
---@field commit_sha_result string|nil
---@field created_at string
---@field created_at_label string|nil
---@field current_attempt_id string|nil
---@field deadline_at string|nil
---@field depends_on_task_ids table
---@field depth number
---@field diff_artifact_url string|nil
---@field display_id number
---@field environment_profile string|nil
---@field error_message string|nil
---@field failure_code string|nil
---@field finished_at string|nil
---@field finished_at_label string|nil
---@field harness string
---@field id string
---@field input_revision string|nil
---@field iteration number
---@field landing_state string
---@field model string|nil
---@field model_provider string|nil
---@field number number
---@field organization_id string
---@field owned_paths table
---@field parent_task_id string|nil
---@field position number
---@field prompt string
---@field queued_at string|nil
---@field queued_at_label string|nil
---@field reasoning_effort string|nil
---@field recent_activity table
---@field repo_url string
---@field result table
---@field retry_number number
---@field role string
---@field run_id string|nil
---@field stack_after_task_id string|nil
---@field started_at string|nil
---@field started_at_label string|nil
---@field status string
---@field title string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class SwarmTaskLoadMatch
---@field id string
---@field swarm_id string
---@field after_seq? number
---@field limit? number

---@class SwarmTaskListMatch
---@field swarm_id string

---@class TaskLease
---@field id? string

---@class TaskLeaseCreateData
---@field swarm_id string
---@field task_id string

---@class ThreadPreview
---@field expires_at string|nil
---@field port number
---@field url string

---@class ThreadPreviewCreateData
---@field agent_id string
---@field organization_id string
---@field thread_id string
---@field port number

---@class ThreadPreviewAccess

---@class ThreadPreviewAccessLoadMatch
---@field host string
---@field return_to? string

---@class ThreadPreviewAccessCreateData
---@field host? any
---@field token? any

---@class ToolFeedback
---@field category string
---@field created_at string
---@field details string
---@field feedback table
---@field id string
---@field metadata table
---@field organization_id string
---@field source string
---@field summary string
---@field user_id string

---@class ToolFeedbackLoadMatch
---@field id string
---@field organization_id string

---@class ToolFeedbackCreateData
---@field organization_id string
---@field feedback table

---@class Transcript
---@field agent string
---@field author table
---@field checkpoint_pagination table
---@field checkpoints table
---@field id string
---@field last_checkpoint_at string|nil
---@field selected_checkpoint any
---@field source_url string
---@field started_at string
---@field status string
---@field title string|nil

---@class TranscriptLoadMatch
---@field around_event? number
---@field cursor? string
---@field event_digest? string
---@field include_tool? boolean
---@field limit? number
---@field max_byte? number
---@field source_ref? string

---@class TranscriptListMatch
---@field change? string
---@field checkpoint_cursor? string
---@field commit? string
---@field cursor? string
---@field limit? number
---@field patchset? number
---@field pr? string
---@field repo string
---@field session? string

---@class TranscriptCreateData
---@field organization_id string
---@field status string
---@field adapter? any
---@field cursor? any
---@field from? any
---@field limit? any
---@field max_bytes? any
---@field mode? any
---@field query? any
---@field repo? any
---@field to? any
---@field user? any

---@class V1Message

---@class V1MessageCreateData
---@field organization_id string

---@class VcBranch
---@field id? string
---@field name string
---@field target_commit_id string

---@class VcBranchListMatch
---@field organization_id string
---@field repo_id string

---@class VcBranchCreateData
---@field organization_id string
---@field repo_id string

---@class VcBranchRemoveMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class VcBrowser

---@class VcBrowserLoadMatch
---@field organization_id string
---@field repo_id string
---@field file? string
---@field path? string
---@field ref string
---@field recursive? boolean

---@class VcChange
---@field activity table
---@field canonical_path string
---@field change any
---@field checks? table
---@field checks_status? string
---@field description? string|nil
---@field group? table|nil
---@field id string
---@field jj_change_id? string|nil
---@field labels? table
---@field landing table
---@field number number
---@field patchset_number? number|nil
---@field previews table
---@field primary_status? string|nil
---@field public_id? string
---@field related_changes table
---@field relation_chain table
---@field restack_state? string
---@field review_summary? table
---@field stack? any
---@field status string
---@field sync table
---@field target table
---@field target_advanced boolean
---@field target_branch string
---@field title string
---@field url? string

---@class VcChangeLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class VcChangeListMatch
---@field organization_id string
---@field repo_id string
---@field group? string
---@field label? string
---@field limit? number
---@field mine? boolean
---@field page? number
---@field status? string
---@field target? string

---@class VcChangeCreateData
---@field id? string
---@field organization_id string
---@field repo_id string
---@field description? string|nil
---@field labels? table
---@field title string
---@field assets? any
---@field base? any
---@field draft? any
---@field dry_run? any
---@field expected_base_commit_id? any
---@field expected_head_commit_id? any
---@field expected_review_head_commit_id? any
---@field expected_review_patchset_number? any
---@field git_publication_id? any
---@field head? any
---@field into? any
---@field message? any
---@field remove_reviewers? any
---@field request_id? any
---@field reviewers? any
---@field transcript_chat? any

---@class VcChangeUpdateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field description? string|nil
---@field assets? any

---@class VcChangeGroup
---@field changes table
---@field id? string
---@field name? string
---@field number? number
---@field status string
---@field title string|nil

---@class VcChangeGroupLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class VcChangeGroupListMatch
---@field organization_id string
---@field repo_id string

---@class VcChangeGroupCreateData
---@field organization_id string
---@field repo_id string
---@field name string
---@field title? string|nil

---@class VcFile
---@field paths table
---@field truncated boolean

---@class VcFileListMatch
---@field organization_id string
---@field repo_id string
---@field prefix? string
---@field ref string

---@class VcMergeQueue
---@field analytics? table
---@field id? string
---@field policy table
---@field queue table
---@field target_branches? table

---@class VcMergeQueueLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string
---@field change? string
---@field entry_id? string
---@field page? number
---@field window_day? number

---@class VcMergeQueueListMatch
---@field organization_id string
---@field repo_id string
---@field change? string
---@field entry_id? string
---@field page? number
---@field target? string
---@field window_day? number

---@class VcMergeQueueCreateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field expected_version? any

---@class VcMergeQueueUpdateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field concurrency? any
---@field enabled? any
---@field expected_version? any

---@class VcStack
---@field alias_ref_name string|nil
---@field changes table
---@field code string
---@field id? string
---@field landing? table
---@field member_count number
---@field name string|nil
---@field ref_name string
---@field status string
---@field tip_change_number number|nil
---@field updated_at string
---@field updated_at_label string

---@class VcStackLoadMatch
---@field id string
---@field organization_id string
---@field repo_id string

---@class VcStackListMatch
---@field organization_id string
---@field repo_id string

---@class VcStackUpdateData
---@field id string
---@field organization_id string
---@field repo_id string
---@field name? string|nil

---@class VcsNode
---@field account_avatar_url string|nil
---@field account_id string|nil
---@field account_login string
---@field created_at string
---@field created_at_label string|nil
---@field id string
---@field installation_id string
---@field installed_at string|nil
---@field installed_at_label string|nil
---@field manage_access_url string
---@field organization_id string
---@field permission_entries table
---@field permissions table
---@field status string
---@field suspended_at string|nil
---@field suspended_at_label string|nil
---@field updated_at string
---@field updated_at_label string|nil

---@class VcsNodeListMatch
---@field organization_id string

---@class VcsSetting
---@field can_manage_pr_scenario_writing boolean
---@field can_manage_sandbox_region boolean
---@field dedicated_outbound_ip_addresses table
---@field default_trunk_bookmark string
---@field organization table
---@field sandbox_regions table

---@class VcsSettingLoadMatch
---@field organization_id string

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
---@field health? table
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

---@class VerifyEmailVerification

---@class VerifyEmailVerificationLoadMatch

---@class VerifyEnvironment
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

---@class VerifyEnvironmentLoadMatch
---@field id? string
---@field organization_id string
---@field project_id? string

---@class VerifyEnvironmentCreateData
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

---@class VerifyEnvironmentUpdateData
---@field id string
---@field organization_id string

---@class VerifyEnvironmentPatchData
---@field id string
---@field organization_id string
---@field allowed_actions? string
---@field imessage_number? string|nil
---@field messaging_tester_number? string|nil
---@field name? string
---@field target_url? string|nil
---@field verify_network_connection_id? string|nil
---@field version? number

---@class VerifyEnvironmentRemoveMatch
---@field id string
---@field organization_id string

---@class VerifyEvidence
---@field id? string

---@class VerifyEvidenceLoadMatch
---@field id? string
---@field organization_id string
---@field agent_id? string
---@field cursor? string
---@field exploration_id? string
---@field kind? string
---@field limit? number
---@field repository_id? string
---@field scenario_run_id? string

---@class VerifyMergeRequest
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

---@class VerifyMergeRequestLoadMatch
---@field id string
---@field organization_id string
---@field page? number

---@class VerifyMergeRequestCreateData
---@field organization_id string
---@field branch? string
---@field head_sha? string
---@field idempotency_key string
---@field number number
---@field project_id? string|nil
---@field repository_id? string

---@class VerifyPullRequest
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

---@class VerifyPullRequestLoadMatch
---@field id string
---@field organization_id string
---@field page? number

---@class VerifyPullRequestCreateData
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

---@class VerifyPullRequestRemoveMatch
---@field id string
---@field organization_id string

---@class VerifySignalIntegration
---@field api_token_stored boolean
---@field config table
---@field created_at? string|nil
---@field failure_message string|nil
---@field id string
---@field inbound_path string
---@field inbound_url string
---@field last_received_at? string|nil
---@field last_verified_at? string|nil
---@field mode string
---@field name string
---@field organization_id string
---@field provider string
---@field rejected_signature_count number
---@field status string
---@field target_count number
---@field unmapped_delivery_count number
---@field updated_at? string|nil
---@field webhook_secret_stored boolean

---@class VerifySignalIntegrationCreateData
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

---@class WaitlistApplication

---@class WaitlistApplicationCreateData
---@field company_name? any
---@field company_size? any
---@field email? any
---@field invite_code? any
---@field name? any
---@field use_case? any

---@class WebBotAuth
---@field expires_at string
---@field origin string
---@field signatures table

---@class WebBotAuthCreateData
---@field origin string

---@class WebhookGitlab
---@field id? string

---@class WebhookGitlabUpdateData
---@field id string

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

---@class WorkspaceActivity
---@field live_activity table
---@field recent_items table
---@field unresolved_notification_count number

---@class WorkspaceActivityLoadMatch
---@field organization_id string

---@class WorkspaceActivityNotification
---@field id? string

---@class WorkspaceActivityNotificationUpdateData
---@field id string
---@field organization_id string

---@class WorkspaceSpace
---@field created_at string
---@field default_branch? string
---@field description string|nil
---@field hidden boolean
---@field icon_name string
---@field id string
---@field import_status string|nil
---@field name string
---@field organization_id string
---@field position number|nil
---@field repository_id string
---@field repository_slug string
---@field slug string
---@field status string
---@field updated_at string

---@class WorkspaceSpaceLoadMatch
---@field id string
---@field organization_id string

---@class WorkspaceSpaceListMatch
---@field organization_id string

---@class WorkspaceSpaceCreateData
---@field organization_id string
---@field default_branch? string
---@field description? string|nil
---@field icon_name string
---@field name string
---@field slug string

---@class WorkspaceSpacePreference
---@field preferences table
---@field spaces table

---@class WorkspaceSpacePreferenceUpdateData
---@field organization_id string
---@field preferences? table

local M = {}

return M
