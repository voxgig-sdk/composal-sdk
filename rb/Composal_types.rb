# frozen_string_literal: true

# Typed models for the Composal SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Agent entity data model.
#
# @!attribute [rw] attention
#   @return [Object]
#
# @!attribute [rw] avatar
#   @return [Object, nil]
#
# @!attribute [rw] can_delete
#   @return [Boolean, nil]
#
# @!attribute [rw] can_edit_configuration
#   @return [Boolean]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sharing
#   @return [Boolean, nil]
#
# @!attribute [rw] can_name_managers
#   @return [Boolean, nil]
#
# @!attribute [rw] can_queue_input
#   @return [Boolean, nil]
#
# @!attribute [rw] can_reconcile_save
#   @return [Boolean]
#
# @!attribute [rw] configuration
#   @return [Object]
#
# @!attribute [rw] configuration_revision
#   @return [Integer]
#
# @!attribute [rw] configuration_version
#   @return [Object]
#
# @!attribute [rw] control_connections_available
#   @return [Boolean, nil]
#
# @!attribute [rw] controlling_user_id
#   @return [String]
#
# @!attribute [rw] coordination_available
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] direct_chat_available
#   @return [Boolean, nil]
#
# @!attribute [rw] has_unread_updates
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_reply_at
#   @return [Object]
#
# @!attribute [rw] lifecycle_actions
#   @return [Array]
#
# @!attribute [rw] lifecycle_version
#   @return [Object]
#
# @!attribute [rw] local_agent_control_available
#   @return [Boolean, nil]
#
# @!attribute [rw] managers
#   @return [Array, nil]
#
# @!attribute [rw] model_change_action
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] persona
#   @return [Object, nil]
#
# @!attribute [rw] preview
#   @return [Object, nil]
#
# @!attribute [rw] preview_received_at
#   @return [Object, nil]
#
# @!attribute [rw] provisioning
#   @return [Object, nil]
#
# @!attribute [rw] reply_triage
#   @return [Object]
#
# @!attribute [rw] runtime_version
#   @return [String, nil]
#
# @!attribute [rw] setup_pending
#   @return [Boolean]
#
# @!attribute [rw] sharing_fixed
#   @return [Boolean, nil]
#
# @!attribute [rw] sharing_version
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] team_role
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] url_slug
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
Agent = Struct.new(
  :attention,
  :avatar,
  :can_delete,
  :can_edit_configuration,
  :can_manage,
  :can_manage_sharing,
  :can_name_managers,
  :can_queue_input,
  :can_reconcile_save,
  :configuration,
  :configuration_revision,
  :configuration_version,
  :control_connections_available,
  :controlling_user_id,
  :coordination_available,
  :created_at,
  :direct_chat_available,
  :has_unread_updates,
  :id,
  :last_reply_at,
  :lifecycle_actions,
  :lifecycle_version,
  :local_agent_control_available,
  :managers,
  :model_change_action,
  :name,
  :organization_id,
  :persona,
  :preview,
  :preview_received_at,
  :provisioning,
  :reply_triage,
  :runtime_version,
  :setup_pending,
  :sharing_fixed,
  :sharing_version,
  :slug,
  :status,
  :team_role,
  :updated_at,
  :url_slug,
  :visibility,
  keyword_init: true
)

# Request payload for Agent#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Agent#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] runtime_version
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AgentListMatch = Struct.new(
  :organization_id,
  :cursor,
  :limit,
  :q,
  :runtime_version,
  :status,
  keyword_init: true
)

# Request payload for Agent#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] viewer_time_zone
#   @return [String, nil]
#
# @!attribute [rw] configuration
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] runtime_version
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
AgentCreateData = Struct.new(
  :organization_id,
  :viewer_time_zone,
  :configuration,
  :name,
  :runtime_version,
  :slug,
  :visibility,
  keyword_init: true
)

# Request payload for Agent#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] team_role
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
#
# @!attribute [rw] acknowledge_reset
#   @return [Object, nil]
#
# @!attribute [rw] after_id
#   @return [Object, nil]
#
# @!attribute [rw] before_id
#   @return [Object, nil]
#
# @!attribute [rw] conversation_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_generation
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
#
# @!attribute [rw] github_access
#   @return [Object, nil]
#
# @!attribute [rw] integration_id
#   @return [Object, nil]
#
# @!attribute [rw] keep_connections
#   @return [Object, nil]
#
# @!attribute [rw] memory_mb
#   @return [Object, nil]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] profile
#   @return [Object, nil]
#
# @!attribute [rw] provider
#   @return [Object, nil]
#
# @!attribute [rw] reasoning
#   @return [Object, nil]
#
# @!attribute [rw] revoke_access
#   @return [Object, nil]
#
# @!attribute [rw] setup_only
#   @return [Object, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
AgentUpdateData = Struct.new(
  :id,
  :organization_id,
  :name,
  :team_role,
  :visibility,
  :acknowledge_reset,
  :after_id,
  :before_id,
  :conversation_id,
  :expected_generation,
  :expected_version,
  :github_access,
  :integration_id,
  :keep_connections,
  :memory_mb,
  :model,
  :profile,
  :provider,
  :reasoning,
  :revoke_access,
  :setup_only,
  :value,
  keyword_init: true
)

# Request payload for Agent#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentAttachment entity data model.
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] file_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
AgentAttachment = Struct.new(
  :byte_size,
  :content_type,
  :file_name,
  :id,
  keyword_init: true
)

# Request payload for AgentAttachment#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] file_name
#   @return [String]
AgentAttachmentCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :byte_size,
  :content_type,
  :file_name,
  keyword_init: true
)

# AgentAutomation entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_events
#   @return [Boolean]
#
# @!attribute [rw] can_run
#   @return [Boolean]
#
# @!attribute [rw] can_schedule
#   @return [Boolean]
#
# @!attribute [rw] definition
#   @return [Hash]
#
# @!attribute [rw] event_subscriptions
#   @return [Array]
#
# @!attribute [rw] event_triggers
#   @return [Array]
#
# @!attribute [rw] expected_revision
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] revision
#   @return [Integer]
#
# @!attribute [rw] schedule
#   @return [Object]
#
# @!attribute [rw] schedules
#   @return [Array]
#
# @!attribute [rw] version
#   @return [Hash]
AgentAutomation = Struct.new(
  :can_manage,
  :can_manage_events,
  :can_run,
  :can_schedule,
  :definition,
  :event_subscriptions,
  :event_triggers,
  :expected_revision,
  :id,
  :key,
  :name,
  :revision,
  :schedule,
  :schedules,
  :version,
  keyword_init: true
)

# Request payload for AgentAutomation#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentAutomationLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentAutomation#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
AgentAutomationListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# Request payload for AgentAutomation#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash, nil]
#
# @!attribute [rw] expected_revision
#   @return [Integer, nil]
AgentAutomationUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :definition,
  :expected_revision,
  keyword_init: true
)

# AgentAvatar entity data model.
class AgentAvatar
end

# Request payload for AgentAvatar#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] style_catalog
#   @return [Integer, nil]
AgentAvatarLoadMatch = Struct.new(
  :agent_id,
  :organization_id,
  :style_catalog,
  keyword_init: true
)

# Request payload for AgentAvatar#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] style_catalog
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] expected_generation
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] pixel
#   @return [Object, nil]
#
# @!attribute [rw] style
#   @return [Object, nil]
AgentAvatarCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :style_catalog,
  :description,
  :expected_generation,
  :mode,
  :pixel,
  :style,
  keyword_init: true
)

# AgentCommand entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] skill_model_visible
#   @return [Boolean]
#
# @!attribute [rw] source
#   @return [String]
AgentCommand = Struct.new(
  :description,
  :display_name,
  :name,
  :skill_model_visible,
  :source,
  keyword_init: true
)

# Request payload for AgentCommand#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [String, nil]
AgentCommandListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :conversation_id,
  keyword_init: true
)

# AgentComputer entity data model.
class AgentComputer
end

# Request payload for AgentComputer#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentComputerLoadMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentComputer#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] prepare
#   @return [Object, nil]
AgentComputerCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :prepare,
  keyword_init: true
)

# AgentConnection entity data model.
#
# @!attribute [rw] agent_card_url
#   @return [String]
#
# @!attribute [rw] auth_scheme
#   @return [String]
#
# @!attribute [rw] can_configure
#   @return [Boolean]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean]
#
# @!attribute [rw] can_setup
#   @return [Boolean]
#
# @!attribute [rw] connection
#   @return [Hash]
#
# @!attribute [rw] credential
#   @return [Object, nil]
#
# @!attribute [rw] error_code
#   @return [Object]
#
# @!attribute [rw] expected_generation
#   @return [Integer]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] remote_agent
#   @return [Object]
#
# @!attribute [rw] requester_id
#   @return [String]
#
# @!attribute [rw] retired_at
#   @return [Object]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] scope_key
#   @return [String]
#
# @!attribute [rw] source_operation_id
#   @return [Object]
#
# @!attribute [rw] state
#   @return [String]
AgentConnection = Struct.new(
  :agent_card_url,
  :auth_scheme,
  :can_configure,
  :can_disconnect,
  :can_setup,
  :connection,
  :credential,
  :error_code,
  :expected_generation,
  :generation,
  :id,
  :name,
  :remote_agent,
  :requester_id,
  :retired_at,
  :revoked_at,
  :scope_key,
  :source_operation_id,
  :state,
  keyword_init: true
)

# Request payload for AgentConnection#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentConnection#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] selected_connection_id
#   @return [String, nil]
AgentConnectionListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  :selected_connection_id,
  keyword_init: true
)

# Request payload for AgentConnection#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_card_url
#   @return [String]
#
# @!attribute [rw] auth_scheme
#   @return [String]
#
# @!attribute [rw] credential
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] remote_agent
#   @return [Object, nil]
#
# @!attribute [rw] source_operation_id
#   @return [Object, nil]
AgentConnectionCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :agent_card_url,
  :auth_scheme,
  :credential,
  :name,
  :remote_agent,
  :source_operation_id,
  keyword_init: true
)

# Request payload for AgentConnection#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] auth_scheme
#   @return [String, nil]
#
# @!attribute [rw] credential
#   @return [Object, nil]
#
# @!attribute [rw] expected_generation
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] remote_agent
#   @return [Object, nil]
AgentConnectionUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :auth_scheme,
  :credential,
  :expected_generation,
  :name,
  :remote_agent,
  keyword_init: true
)

# Request payload for AgentConnection#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentControlFlow entity data model.
#
# @!attribute [rw] can_cancel
#   @return [Boolean]
#
# @!attribute [rw] cancellation_requested
#   @return [Boolean]
#
# @!attribute [rw] device_name
#   @return [String]
#
# @!attribute [rw] flow_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] providers
#   @return [Array]
#
# @!attribute [rw] repair_of_flow_id
#   @return [String, nil]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] step_count
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [Object]
AgentControlFlow = Struct.new(
  :can_cancel,
  :cancellation_requested,
  :device_name,
  :flow_id,
  :id,
  :providers,
  :repair_of_flow_id,
  :status_label,
  :step_count,
  :title,
  keyword_init: true
)

# Request payload for AgentControlFlow#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentControlFlowLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentControlFlow#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentControlFlowListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentControlFlow#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentControlFlowCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentCoordination entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentCoordination = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentCoordination#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] include_source
#   @return [Object, nil]
AgentCoordinationCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :include_source,
  keyword_init: true
)

# AgentEmail entity data model.
#
# @!attribute [rw] delivery
#   @return [Object]
#
# @!attribute [rw] direction
#   @return [String]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] preview
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [String]
#
# @!attribute [rw] recipient_tag
#   @return [Object]
#
# @!attribute [rw] spam
#   @return [Boolean]
#
# @!attribute [rw] subject
#   @return [Object]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] to
#   @return [Array]
AgentEmail = Struct.new(
  :delivery,
  :direction,
  :from,
  :id,
  :preview,
  :received_at,
  :recipient_tag,
  :spam,
  :subject,
  :text,
  :to,
  keyword_init: true
)

# Request payload for AgentEmail#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentEmailLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentFile entity data model.
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] download_url
#   @return [String]
#
# @!attribute [rw] filename
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] size_bytes
#   @return [Integer]
AgentFile = Struct.new(
  :content_type,
  :download_url,
  :filename,
  :id,
  :size_bytes,
  keyword_init: true
)

# Request payload for AgentFile#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentFileLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentInput entity data model.
#
# @!attribute [rw] attachment_ids
#   @return [Array, nil]
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] browser_context
#   @return [Hash]
#
# @!attribute [rw] client_time
#   @return [Hash]
#
# @!attribute [rw] conversation_id
#   @return [String]
#
# @!attribute [rw] model_policy
#   @return [Object, nil]
#
# @!attribute [rw] requester_membership_id
#   @return [String, nil]
#
# @!attribute [rw] speed
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
AgentInput = Struct.new(
  :attachment_ids,
  :attachments,
  :browser_context,
  :client_time,
  :conversation_id,
  :model_policy,
  :requester_membership_id,
  :speed,
  :text,
  keyword_init: true
)

# Request payload for AgentInput#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] attachment_ids
#   @return [Array, nil]
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] browser_context
#   @return [Hash]
#
# @!attribute [rw] client_time
#   @return [Hash]
#
# @!attribute [rw] conversation_id
#   @return [String]
#
# @!attribute [rw] model_policy
#   @return [Object, nil]
#
# @!attribute [rw] requester_membership_id
#   @return [String, nil]
#
# @!attribute [rw] speed
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
AgentInputCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :attachment_ids,
  :attachments,
  :browser_context,
  :client_time,
  :conversation_id,
  :model_policy,
  :requester_membership_id,
  :speed,
  :text,
  keyword_init: true
)

# AgentIntegration entity data model.
#
# @!attribute [rw] account_counts
#   @return [Hash]
#
# @!attribute [rw] accounts_path
#   @return [String]
#
# @!attribute [rw] added_toolkits
#   @return [Array]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_organization
#   @return [Boolean]
#
# @!attribute [rw] catalog
#   @return [Array]
#
# @!attribute [rw] connect_as
#   @return [Object]
#
# @!attribute [rw] connect_as_by_toolkit
#   @return [Hash]
#
# @!attribute [rw] connected_counts
#   @return [Hash]
#
# @!attribute [rw] connection_id
#   @return [String]
#
# @!attribute [rw] connections
#   @return [Array]
#
# @!attribute [rw] email
#   @return [Hash]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] enabled_toolkits
#   @return [Array]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] pending_counts
#   @return [Hash]
#
# @!attribute [rw] personal_creation_key_supported
#   @return [Boolean, nil]
#
# @!attribute [rw] private_agent
#   @return [Boolean]
#
# @!attribute [rw] shared_agent_personal_accounts_enabled
#   @return [Boolean]
#
# @!attribute [rw] slack
#   @return [Hash]
#
# @!attribute [rw] webhook_connections
#   @return [Array]
#
# @!attribute [rw] webhooks_available
#   @return [Boolean]
AgentIntegration = Struct.new(
  :account_counts,
  :accounts_path,
  :added_toolkits,
  :can_manage,
  :can_manage_organization,
  :catalog,
  :connect_as,
  :connect_as_by_toolkit,
  :connected_counts,
  :connection_id,
  :connections,
  :email,
  :enabled,
  :enabled_toolkits,
  :generation,
  :pagination,
  :pending_counts,
  :personal_creation_key_supported,
  :private_agent,
  :shared_agent_personal_accounts_enabled,
  :slack,
  :webhook_connections,
  :webhooks_available,
  keyword_init: true
)

# Request payload for AgentIntegration#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] catalog_q
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] toolkit
#   @return [String, nil]
AgentIntegrationListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :catalog_q,
  :cursor,
  :limit,
  :q,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentIntegration#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] toolkit
#   @return [String, nil]
#
# @!attribute [rw] connection_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] generation
#   @return [Integer]
AgentIntegrationCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  :q,
  :toolkit,
  :connection_id,
  :enabled,
  :generation,
  keyword_init: true
)

# AgentInteraction entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] interactions
#   @return [Array]
AgentInteraction = Struct.new(
  :id,
  :interactions,
  keyword_init: true
)

# Request payload for AgentInteraction#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [String]
AgentInteractionLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :conversation_id,
  keyword_init: true
)

# Request payload for AgentInteraction#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [String]
#
# @!attribute [rw] ids
#   @return [Array, nil]
AgentInteractionListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :conversation_id,
  :ids,
  keyword_init: true
)

# Request payload for AgentInteraction#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_revision
#   @return [Object, nil]
AgentInteractionCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :conversation_id,
  :expected_revision,
  keyword_init: true
)

# AgentLibrary entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentLibrary = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentLibrary#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentLibraryLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentManager entity data model.
#
# @!attribute [rw] attention
#   @return [Object]
#
# @!attribute [rw] avatar
#   @return [Object, nil]
#
# @!attribute [rw] can_delete
#   @return [Boolean, nil]
#
# @!attribute [rw] can_edit_configuration
#   @return [Boolean]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sharing
#   @return [Boolean, nil]
#
# @!attribute [rw] can_name_managers
#   @return [Boolean, nil]
#
# @!attribute [rw] can_queue_input
#   @return [Boolean, nil]
#
# @!attribute [rw] can_reconcile_save
#   @return [Boolean]
#
# @!attribute [rw] configuration
#   @return [Object]
#
# @!attribute [rw] configuration_revision
#   @return [Integer]
#
# @!attribute [rw] configuration_version
#   @return [Object]
#
# @!attribute [rw] control_connections_available
#   @return [Boolean, nil]
#
# @!attribute [rw] controlling_user_id
#   @return [String]
#
# @!attribute [rw] coordination_available
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] direct_chat_available
#   @return [Boolean, nil]
#
# @!attribute [rw] has_unread_updates
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_reply_at
#   @return [Object]
#
# @!attribute [rw] lifecycle_actions
#   @return [Array]
#
# @!attribute [rw] lifecycle_version
#   @return [Object]
#
# @!attribute [rw] local_agent_control_available
#   @return [Boolean, nil]
#
# @!attribute [rw] managers
#   @return [Array, nil]
#
# @!attribute [rw] model_change_action
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] persona
#   @return [Object, nil]
#
# @!attribute [rw] preview
#   @return [Object, nil]
#
# @!attribute [rw] preview_received_at
#   @return [Object, nil]
#
# @!attribute [rw] provisioning
#   @return [Object, nil]
#
# @!attribute [rw] reply_triage
#   @return [Object]
#
# @!attribute [rw] runtime_version
#   @return [String, nil]
#
# @!attribute [rw] setup_pending
#   @return [Boolean]
#
# @!attribute [rw] sharing_fixed
#   @return [Boolean, nil]
#
# @!attribute [rw] sharing_version
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] team_role
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] url_slug
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String, nil]
AgentManager = Struct.new(
  :attention,
  :avatar,
  :can_delete,
  :can_edit_configuration,
  :can_manage,
  :can_manage_sharing,
  :can_name_managers,
  :can_queue_input,
  :can_reconcile_save,
  :configuration,
  :configuration_revision,
  :configuration_version,
  :control_connections_available,
  :controlling_user_id,
  :coordination_available,
  :created_at,
  :direct_chat_available,
  :has_unread_updates,
  :id,
  :last_reply_at,
  :lifecycle_actions,
  :lifecycle_version,
  :local_agent_control_available,
  :managers,
  :model_change_action,
  :name,
  :organization_id,
  :persona,
  :preview,
  :preview_received_at,
  :provisioning,
  :reply_triage,
  :runtime_version,
  :setup_pending,
  :sharing_fixed,
  :sharing_version,
  :slug,
  :status,
  :team_role,
  :updated_at,
  :url_slug,
  :user_id,
  :visibility,
  keyword_init: true
)

# Request payload for AgentManager#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
AgentManagerCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :user_id,
  keyword_init: true
)

# Request payload for AgentManager#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentManagerRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentManagerChoice entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
AgentManagerChoice = Struct.new(
  :id,
  :name,
  keyword_init: true
)

# Request payload for AgentManagerChoice#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] q
#   @return [String, nil]
AgentManagerChoiceListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :q,
  keyword_init: true
)

# AgentMarketplace entity data model.
#
# @!attribute [rw] bundle
#   @return [Hash]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] catalog_key
#   @return [Object]
#
# @!attribute [rw] categories
#   @return [Array]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] explainer
#   @return [Object]
#
# @!attribute [rw] featured
#   @return [Boolean]
#
# @!attribute [rw] from_composal
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] installs_count
#   @return [Integer]
#
# @!attribute [rw] instructions
#   @return [String]
#
# @!attribute [rw] integration_toolkits
#   @return [Array]
#
# @!attribute [rw] integrations
#   @return [Array]
#
# @!attribute [rw] listing
#   @return [Object]
#
# @!attribute [rw] listings
#   @return [Array]
#
# @!attribute [rw] memories
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_page
#   @return [Object]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] page_apps
#   @return [Array]
#
# @!attribute [rw] publisher_avatar_url
#   @return [Object]
#
# @!attribute [rw] publisher_name
#   @return [String]
#
# @!attribute [rw] sections
#   @return [Array]
#
# @!attribute [rw] share_token
#   @return [Object]
#
# @!attribute [rw] skills
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_agent_id
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] viewer
#   @return [Hash]
#
# @!attribute [rw] visibility
#   @return [String]
AgentMarketplace = Struct.new(
  :bundle,
  :can_manage,
  :catalog_key,
  :categories,
  :category,
  :counts,
  :created_at,
  :expected_version,
  :explainer,
  :featured,
  :from_composal,
  :id,
  :installs_count,
  :instructions,
  :integration_toolkits,
  :integrations,
  :listing,
  :listings,
  :memories,
  :name,
  :next_page,
  :organization_name,
  :page_apps,
  :publisher_avatar_url,
  :publisher_name,
  :sections,
  :share_token,
  :skills,
  :slug,
  :source_agent_id,
  :summary,
  :updated_at,
  :version,
  :viewer,
  :visibility,
  keyword_init: true
)

# Request payload for AgentMarketplace#load.
#
# @!attribute [rw] id
#   @return [String]
AgentMarketplaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentMarketplace#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] bundle
#   @return [Hash]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] explainer
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] source_agent_id
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String, nil]
AgentMarketplaceCreateData = Struct.new(
  :organization_id,
  :bundle,
  :category,
  :explainer,
  :name,
  :source_agent_id,
  :summary,
  :visibility,
  keyword_init: true
)

# Request payload for AgentMarketplace#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentMarketplaceUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentMarketplace#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] bundle
#   @return [Hash, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
#
# @!attribute [rw] explainer
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
AgentMarketplacePatchData = Struct.new(
  :id,
  :organization_id,
  :bundle,
  :category,
  :expected_version,
  :explainer,
  :name,
  :summary,
  :visibility,
  keyword_init: true
)

# Request payload for AgentMarketplace#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentMarketplaceRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentMarketplaceShared entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] catalog_key
#   @return [Object]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] explainer
#   @return [Object]
#
# @!attribute [rw] featured
#   @return [Boolean]
#
# @!attribute [rw] from_composal
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] installs_count
#   @return [Integer]
#
# @!attribute [rw] instructions
#   @return [String]
#
# @!attribute [rw] integration_toolkits
#   @return [Array]
#
# @!attribute [rw] integrations
#   @return [Array]
#
# @!attribute [rw] listing
#   @return [Object]
#
# @!attribute [rw] memories
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] page_apps
#   @return [Array]
#
# @!attribute [rw] publisher_avatar_url
#   @return [Object]
#
# @!attribute [rw] publisher_name
#   @return [String]
#
# @!attribute [rw] share_token
#   @return [Object]
#
# @!attribute [rw] skills
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] viewer
#   @return [Hash]
#
# @!attribute [rw] visibility
#   @return [String]
AgentMarketplaceShared = Struct.new(
  :can_manage,
  :catalog_key,
  :category,
  :counts,
  :created_at,
  :explainer,
  :featured,
  :from_composal,
  :id,
  :installs_count,
  :instructions,
  :integration_toolkits,
  :integrations,
  :listing,
  :memories,
  :name,
  :organization_name,
  :page_apps,
  :publisher_avatar_url,
  :publisher_name,
  :share_token,
  :skills,
  :slug,
  :summary,
  :updated_at,
  :version,
  :viewer,
  :visibility,
  keyword_init: true
)

# Request payload for AgentMarketplaceShared#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
AgentMarketplaceSharedLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentMarketplaceShared#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentMarketplaceSharedCreateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentMissionControl entity data model.
class AgentMissionControl
end

# Request payload for AgentMissionControl#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [Object, nil]
#
# @!attribute [rw] agent_id
#   @return [Object, nil]
#
# @!attribute [rw] agent_ids
#   @return [Object, nil]
#
# @!attribute [rw] at
#   @return [Object, nil]
AgentMissionControlCreateData = Struct.new(
  :organization_id,
  :action,
  :agent_id,
  :agent_ids,
  :at,
  keyword_init: true
)

# AgentOperation entity data model.
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] operation
#   @return [Hash]
#
# @!attribute [rw] participant
#   @return [String]
#
# @!attribute [rw] requester_id
#   @return [String]
#
# @!attribute [rw] scope_key
#   @return [String]
AgentOperation = Struct.new(
  :arguments,
  :id,
  :key,
  :name,
  :operation,
  :participant,
  :requester_id,
  :scope_key,
  keyword_init: true
)

# Request payload for AgentOperation#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentOperationLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentOperation#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] requester_id
#   @return [String]
AgentOperationCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :arguments,
  :key,
  :name,
  :requester_id,
  keyword_init: true
)

# AgentProvisioning entity data model.
class AgentProvisioning
end

# Request payload for AgentProvisioning#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
AgentProvisioningCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :expected_version,
  keyword_init: true
)

# AgentPullRequest entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] owners
#   @return [Array]
#
# @!attribute [rw] repository
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
AgentPullRequest = Struct.new(
  :id,
  :number,
  :owners,
  :repository,
  :status,
  :title,
  :url,
  keyword_init: true
)

# Request payload for AgentPullRequest#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
AgentPullRequestListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :scope,
  keyword_init: true
)

# AgentQuestion entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentQuestion = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentQuestion#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] answers
#   @return [Object, nil]
#
# @!attribute [rw] conversation_id
#   @return [Object, nil]
AgentQuestionCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :answers,
  :conversation_id,
  keyword_init: true
)

# AgentRepository entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] environments
#   @return [Hash]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] repository_choices
#   @return [Array]
#
# @!attribute [rw] repository_choices_error
#   @return [Object, nil]
#
# @!attribute [rw] repository_choices_truncated
#   @return [Boolean]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] work_repositories
#   @return [Array]
AgentRepository = Struct.new(
  :can_manage,
  :environments,
  :expected_version,
  :id,
  :repository_choices,
  :repository_choices_error,
  :repository_choices_truncated,
  :version,
  :work_repositories,
  keyword_init: true
)

# Request payload for AgentRepository#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] q
#   @return [String, nil]
AgentRepositoryListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :q,
  keyword_init: true
)

# Request payload for AgentRepository#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
#
# @!attribute [rw] work_repositories
#   @return [Array, nil]
AgentRepositoryUpdateData = Struct.new(
  :agent_id,
  :organization_id,
  :expected_version,
  :work_repositories,
  keyword_init: true
)

# AgentResource entity data model.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] uri
#   @return [String]
AgentResource = Struct.new(
  :name,
  :uri,
  keyword_init: true
)

# Request payload for AgentResource#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentResourceListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# AgentRoutine entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] consecutive_errors
#   @return [Integer]
#
# @!attribute [rw] credit_wait
#   @return [Hash]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] last_run_at
#   @return [Object]
#
# @!attribute [rw] last_status
#   @return [Object]
#
# @!attribute [rw] managed
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_run_at
#   @return [Object]
#
# @!attribute [rw] routine
#   @return [Hash]
#
# @!attribute [rw] schedule
#   @return [Hash]
#
# @!attribute [rw] schedule_label
#   @return [String]
#
# @!attribute [rw] utility_model
#   @return [Hash]
AgentRoutine = Struct.new(
  :can_manage,
  :consecutive_errors,
  :credit_wait,
  :description,
  :enabled,
  :id,
  :kind,
  :last_error,
  :last_run_at,
  :last_status,
  :managed,
  :name,
  :next_run_at,
  :routine,
  :schedule,
  :schedule_label,
  :utility_model,
  keyword_init: true
)

# Request payload for AgentRoutine#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
AgentRoutineListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  keyword_init: true
)

# Request payload for AgentRoutine#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] utility_model
#   @return [Hash, nil]
AgentRoutineUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :enabled,
  :utility_model,
  keyword_init: true
)

# AgentRun entity data model.
#
# @!attribute [rw] error
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] run_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
AgentRun = Struct.new(
  :error,
  :id,
  :run_id,
  :status,
  keyword_init: true
)

# Request payload for AgentRun#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [String, nil]
AgentRunLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :conversation_id,
  keyword_init: true
)

# AgentRuntime entity data model.
#
# @!attribute [rw] available_profiles
#   @return [Array, nil]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_reset
#   @return [Boolean, nil]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] memory_mb
#   @return [Object]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] profile
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
#
# @!attribute [rw] volume
#   @return [Object]
AgentRuntime = Struct.new(
  :available_profiles,
  :can_manage,
  :can_reset,
  :image,
  :memory_mb,
  :platform,
  :profile,
  :provider,
  :state,
  :version,
  :volume,
  keyword_init: true
)

# Request payload for AgentRuntime#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] acknowledge_data_loss
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
AgentRuntimeCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :acknowledge_data_loss,
  :expected_version,
  keyword_init: true
)

# AgentSetting entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] expected_version
#   @return [String]
#
# @!attribute [rw] instructions
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
AgentSetting = Struct.new(
  :can_manage,
  :expected_version,
  :instructions,
  :version,
  keyword_init: true
)

# Request payload for AgentSetting#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSettingListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentSetting#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [String, nil]
#
# @!attribute [rw] instructions
#   @return [String, nil]
AgentSettingUpdateData = Struct.new(
  :agent_id,
  :organization_id,
  :expected_version,
  :instructions,
  keyword_init: true
)

# AgentSharing entity data model.
class AgentSharing
end

# Request payload for AgentSharing#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSharingLoadMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# AgentSite entity data model.
#
# @!attribute [rw] deployed_at
#   @return [String]
#
# @!attribute [rw] deployments_count
#   @return [Integer]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] https
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String]
AgentSite = Struct.new(
  :deployed_at,
  :deployments_count,
  :hostname,
  :https,
  :id,
  :name,
  :url,
  :visibility,
  keyword_init: true
)

# Request payload for AgentSite#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
AgentSiteListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# AgentSkill entity data model.
#
# @!attribute [rw] available
#   @return [Boolean]
#
# @!attribute [rw] can_configure
#   @return [Boolean]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] configuration_state
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] skills
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
AgentSkill = Struct.new(
  :available,
  :can_configure,
  :can_manage,
  :configuration_state,
  :description,
  :enabled,
  :name,
  :skills,
  :version,
  keyword_init: true
)

# Request payload for AgentSkill#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSkillListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentSkill#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
AgentSkillCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :enabled,
  :name,
  :version,
  keyword_init: true
)

# AgentSlack entity data model.
class AgentSlack
end

# Request payload for AgentSlack#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [Object, nil]
#
# @!attribute [rw] bot_token
#   @return [Object, nil]
#
# @!attribute [rw] callback
#   @return [Object, nil]
#
# @!attribute [rw] confirm_before_sending
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] show_sent_using
#   @return [Object, nil]
#
# @!attribute [rw] signing_secret
#   @return [Object, nil]
AgentSlackCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :action,
  :bot_token,
  :callback,
  :confirm_before_sending,
  :expected_version,
  :mode,
  :show_sent_using,
  :signing_secret,
  keyword_init: true
)

# AgentSubagent entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] attention
#   @return [Object]
#
# @!attribute [rw] ended_at
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] model
#   @return [Object]
#
# @!attribute [rw] parent_id
#   @return [String]
#
# @!attribute [rw] preview
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] state
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [Object]
AgentSubagent = Struct.new(
  :active,
  :attention,
  :ended_at,
  :id,
  :model,
  :parent_id,
  :preview,
  :started_at,
  :state,
  :status,
  :title,
  :updated_at,
  keyword_init: true
)

# Request payload for AgentSubagent#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] conversation_id
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
AgentSubagentListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :conversation_id,
  :cursor,
  keyword_init: true
)

# AgentSubscription entity data model.
class AgentSubscription
end

# Request payload for AgentSubscription#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] refresh_provider
#   @return [String, nil]
AgentSubscriptionListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :refresh_provider,
  keyword_init: true
)

# Request payload for AgentSubscription#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action_name
#   @return [Object, nil]
#
# @!attribute [rw] label
#   @return [Object, nil]
#
# @!attribute [rw] login_id
#   @return [Object, nil]
#
# @!attribute [rw] method
#   @return [Object, nil]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] profile_id
#   @return [Object, nil]
#
# @!attribute [rw] provider
#   @return [Object, nil]
#
# @!attribute [rw] reasoning
#   @return [Object, nil]
#
# @!attribute [rw] step_id
#   @return [Object, nil]
#
# @!attribute [rw] token
#   @return [Object, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Object, nil]
AgentSubscriptionCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :action_name,
  :label,
  :login_id,
  :method,
  :model,
  :profile_id,
  :provider,
  :reasoning,
  :step_id,
  :token,
  :value,
  :version,
  keyword_init: true
)

# AgentTeammate entity data model.
#
# @!attribute [rw] avatar
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] persona
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
AgentTeammate = Struct.new(
  :avatar,
  :id,
  :name,
  :persona,
  :slug,
  keyword_init: true
)

# Request payload for AgentTeammate#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] q
#   @return [String, nil]
AgentTeammateListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :q,
  keyword_init: true
)

# AgentTerminal entity data model.
class AgentTerminal
end

# Request payload for AgentTerminal#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentTerminalCreateData = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# AgentThread entity data model.
#
# @!attribute [rw] archived_count
#   @return [Object, nil]
#
# @!attribute [rw] can_create
#   @return [Boolean]
#
# @!attribute [rw] execution
#   @return [Object, nil]
#
# @!attribute [rw] first_input
#   @return [Object, nil]
#
# @!attribute [rw] first_input_key
#   @return [String, nil]
#
# @!attribute [rw] first_input_requester_membership_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inherit_context
#   @return [Boolean, nil]
#
# @!attribute [rw] local_activities
#   @return [Hash]
#
# @!attribute [rw] local_archived_count
#   @return [Integer]
#
# @!attribute [rw] local_next_cursor
#   @return [Object]
#
# @!attribute [rw] local_scope_key
#   @return [Object]
#
# @!attribute [rw] local_status_pending
#   @return [Boolean]
#
# @!attribute [rw] local_threads
#   @return [Array]
#
# @!attribute [rw] main_thread_id
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] next_cursor
#   @return [Object]
#
# @!attribute [rw] parent_conversation_id
#   @return [String, nil]
#
# @!attribute [rw] requester_membership_id
#   @return [String, nil]
#
# @!attribute [rw] selected_thread
#   @return [Object]
#
# @!attribute [rw] thread
#   @return [Hash]
#
# @!attribute [rw] threads
#   @return [Array]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total_archived_count
#   @return [Object]
AgentThread = Struct.new(
  :archived_count,
  :can_create,
  :execution,
  :first_input,
  :first_input_key,
  :first_input_requester_membership_id,
  :id,
  :inherit_context,
  :local_activities,
  :local_archived_count,
  :local_next_cursor,
  :local_scope_key,
  :local_status_pending,
  :local_threads,
  :main_thread_id,
  :message,
  :next_cursor,
  :parent_conversation_id,
  :requester_membership_id,
  :selected_thread,
  :thread,
  :threads,
  :title,
  :total_archived_count,
  keyword_init: true
)

# Request payload for AgentThread#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] archived
#   @return [Boolean, nil]
#
# @!attribute [rw] conversation_id
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] local_cursor
#   @return [String, nil]
AgentThreadListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :archived,
  :conversation_id,
  :cursor,
  :local_cursor,
  keyword_init: true
)

# Request payload for AgentThread#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] execution
#   @return [Object, nil]
#
# @!attribute [rw] inherit_context
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] parent_conversation_id
#   @return [String, nil]
#
# @!attribute [rw] requester_membership_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
AgentThreadCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :execution,
  :inherit_context,
  :message,
  :parent_conversation_id,
  :requester_membership_id,
  :title,
  keyword_init: true
)

# AgentTool entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] inputSchema
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
AgentTool = Struct.new(
  :description,
  :inputSchema,
  :name,
  keyword_init: true
)

# Request payload for AgentTool#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentToolListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# AgentVerifyProject entity data model.
#
# @!attribute [rw] available
#   @return [Boolean]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] project_choices
#   @return [Array]
#
# @!attribute [rw] project_choices_truncated
#   @return [Boolean]
#
# @!attribute [rw] verify_projects
#   @return [Array]
#
# @!attribute [rw] version
#   @return [Integer]
AgentVerifyProject = Struct.new(
  :available,
  :can_manage,
  :expected_version,
  :project_choices,
  :project_choices_truncated,
  :verify_projects,
  :version,
  keyword_init: true
)

# Request payload for AgentVerifyProject#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentVerifyProjectListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentVerifyProject#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
#
# @!attribute [rw] verify_projects
#   @return [Array, nil]
AgentVerifyProjectUpdateData = Struct.new(
  :agent_id,
  :organization_id,
  :expected_version,
  :verify_projects,
  keyword_init: true
)

# AgentWait entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentWait = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentWait#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWaitCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentWebhook entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] connection
#   @return [Hash]
#
# @!attribute [rw] deliveries
#   @return [Array]
#
# @!attribute [rw] event_types
#   @return [Array]
#
# @!attribute [rw] expected_generation
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] max_events_per_day
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] purpose
#   @return [String]
#
# @!attribute [rw] signing_key
#   @return [Object]
AgentWebhook = Struct.new(
  :action,
  :connection,
  :deliveries,
  :event_types,
  :expected_generation,
  :id,
  :max_events_per_day,
  :name,
  :purpose,
  :signing_key,
  keyword_init: true
)

# Request payload for AgentWebhook#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWebhookLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentWebhook#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] event_types
#   @return [Array]
#
# @!attribute [rw] max_events_per_day
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] purpose
#   @return [String]
AgentWebhookCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :event_types,
  :max_events_per_day,
  :name,
  :purpose,
  keyword_init: true
)

# Request payload for AgentWebhook#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [String, nil]
#
# @!attribute [rw] expected_generation
#   @return [Integer, nil]
AgentWebhookUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :action,
  :expected_generation,
  keyword_init: true
)

# AgentWork entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentWork = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentWork#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] revision
#   @return [Object, nil]
AgentWorkCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :revision,
  keyword_init: true
)

# AgentWorkflow entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] expected_digest
#   @return [String]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] template
#   @return [String]
#
# @!attribute [rw] templates
#   @return [Array]
#
# @!attribute [rw] truncated
#   @return [Boolean]
#
# @!attribute [rw] workflows
#   @return [Array]
AgentWorkflow = Struct.new(
  :can_manage,
  :expected_digest,
  :path,
  :source,
  :template,
  :templates,
  :truncated,
  :workflows,
  keyword_init: true
)

# Request payload for AgentWorkflow#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] view
#   @return [String, nil]
#
# @!attribute [rw] workflow_path
#   @return [String, nil]
AgentWorkflowListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :view,
  :workflow_path,
  keyword_init: true
)

# Request payload for AgentWorkflow#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] template
#   @return [String]
AgentWorkflowCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :path,
  :template,
  keyword_init: true
)

# Request payload for AgentWorkflow#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_digest
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
AgentWorkflowUpdateData = Struct.new(
  :agent_id,
  :organization_id,
  :expected_digest,
  :path,
  :source,
  keyword_init: true
)

# AgentWorkflowProposal entity data model.
#
# @!attribute [rw] agent_steps
#   @return [Hash]
#
# @!attribute [rw] base_digest
#   @return [Object]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_revise
#   @return [Boolean]
#
# @!attribute [rw] can_save
#   @return [Boolean]
#
# @!attribute [rw] can_set_trigger
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Object]
#
# @!attribute [rw] digest
#   @return [String]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] model_choices
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] native_rows
#   @return [Array, nil]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] pipeline_checkpoints
#   @return [Hash]
#
# @!attribute [rw] pipeline_commands
#   @return [Hash]
#
# @!attribute [rw] reasoning_choices
#   @return [Array, nil]
#
# @!attribute [rw] runs_on_earlier_version
#   @return [Object]
#
# @!attribute [rw] saved
#   @return [Object]
#
# @!attribute [rw] stale
#   @return [Boolean]
#
# @!attribute [rw] starts
#   @return [Object]
#
# @!attribute [rw] trigger_error
#   @return [Object]
AgentWorkflowProposal = Struct.new(
  :agent_steps,
  :base_digest,
  :can_manage,
  :can_revise,
  :can_save,
  :can_set_trigger,
  :created_at,
  :definition,
  :digest,
  :error,
  :id,
  :model_choices,
  :name,
  :native_rows,
  :path,
  :pipeline_checkpoints,
  :pipeline_commands,
  :reasoning_choices,
  :runs_on_earlier_version,
  :saved,
  :stale,
  :starts,
  :trigger_error,
  keyword_init: true
)

# Request payload for AgentWorkflowProposal#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWorkflowProposalLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentWorkflowProposal#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] digest
#   @return [String]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] reasoning
#   @return [Object, nil]
AgentWorkflowProposalCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :digest,
  :model,
  :reasoning,
  keyword_init: true
)

# AgentWorkflowRun entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] automation
#   @return [Object]
#
# @!attribute [rw] budget_seconds
#   @return [Object]
#
# @!attribute [rw] budget_usd
#   @return [Object]
#
# @!attribute [rw] can_answer
#   @return [Boolean]
#
# @!attribute [rw] can_approve
#   @return [Boolean]
#
# @!attribute [rw] can_dismiss
#   @return [Boolean]
#
# @!attribute [rw] checkpoint
#   @return [Object]
#
# @!attribute [rw] conversation_id
#   @return [Object]
#
# @!attribute [rw] decision_history
#   @return [Hash]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] flow_steps
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] needs_you
#   @return [Boolean]
#
# @!attribute [rw] note
#   @return [Object]
#
# @!attribute [rw] nothing_to_do_reason
#   @return [Object]
#
# @!attribute [rw] resume_count
#   @return [Integer]
#
# @!attribute [rw] retry_step_id
#   @return [Object]
#
# @!attribute [rw] running_seconds
#   @return [Integer]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] spent_tokens
#   @return [Integer]
#
# @!attribute [rw] spent_usd
#   @return [Float]
#
# @!attribute [rw] stalled
#   @return [Boolean]
#
# @!attribute [rw] started_at
#   @return [String]
#
# @!attribute [rw] started_by
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] step_count
#   @return [Integer]
#
# @!attribute [rw] steps
#   @return [Array]
#
# @!attribute [rw] trigger_id
#   @return [Object]
#
# @!attribute [rw] wake_at
#   @return [Object]
#
# @!attribute [rw] workflow_digest
#   @return [Object]
#
# @!attribute [rw] workflow_path
#   @return [Object]
AgentWorkflowRun = Struct.new(
  :action,
  :automation,
  :budget_seconds,
  :budget_usd,
  :can_answer,
  :can_approve,
  :can_dismiss,
  :checkpoint,
  :conversation_id,
  :decision_history,
  :error,
  :finished_at,
  :flow_steps,
  :id,
  :needs_you,
  :note,
  :nothing_to_do_reason,
  :resume_count,
  :retry_step_id,
  :running_seconds,
  :source,
  :spent_tokens,
  :spent_usd,
  :stalled,
  :started_at,
  :started_by,
  :status,
  :step_count,
  :steps,
  :trigger_id,
  :wake_at,
  :workflow_digest,
  :workflow_path,
  keyword_init: true
)

# Request payload for AgentWorkflowRun#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] decision_cursor
#   @return [String, nil]
AgentWorkflowRunLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :decision_cursor,
  keyword_init: true
)

# Request payload for AgentWorkflowRun#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] automation_key
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] view
#   @return [String, nil]
#
# @!attribute [rw] workflow_path
#   @return [String, nil]
AgentWorkflowRunListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :automation_key,
  :cursor,
  :limit,
  :view,
  :workflow_path,
  keyword_init: true
)

# Request payload for AgentWorkflowRun#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] checkpoint
#   @return [Object]
#
# @!attribute [rw] resume_count
#   @return [Integer]
#
# @!attribute [rw] answer
#   @return [Object, nil]
#
# @!attribute [rw] approved
#   @return [Object, nil]
#
# @!attribute [rw] question_at
#   @return [Object, nil]
AgentWorkflowRunCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :checkpoint,
  :resume_count,
  :answer,
  :approved,
  :question_at,
  keyword_init: true
)

# AgentWorkflowTrigger entity data model.
#
# @!attribute [rw] budget
#   @return [Object]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_pause
#   @return [Boolean]
#
# @!attribute [rw] can_resume
#   @return [Boolean]
#
# @!attribute [rw] can_review
#   @return [Boolean]
#
# @!attribute [rw] daily_limit
#   @return [Object]
#
# @!attribute [rw] day_resets_at
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] next_due_at
#   @return [Object]
#
# @!attribute [rw] pause_cause
#   @return [Object]
#
# @!attribute [rw] paused
#   @return [Boolean]
#
# @!attribute [rw] read_at
#   @return [Object]
#
# @!attribute [rw] run_budget_usd
#   @return [Object]
#
# @!attribute [rw] schedule
#   @return [Object]
#
# @!attribute [rw] settings_changed_at
#   @return [Object]
#
# @!attribute [rw] skipped_today
#   @return [Integer]
#
# @!attribute [rw] stale_at
#   @return [Object]
#
# @!attribute [rw] stale_reason
#   @return [Object]
#
# @!attribute [rw] starts
#   @return [Object]
#
# @!attribute [rw] subscription_id
#   @return [Object]
#
# @!attribute [rw] time_zone
#   @return [String]
#
# @!attribute [rw] today_count
#   @return [Object]
#
# @!attribute [rw] trigger
#   @return [Hash]
#
# @!attribute [rw] workflow_path
#   @return [String]
AgentWorkflowTrigger = Struct.new(
  :budget,
  :can_manage,
  :can_pause,
  :can_resume,
  :can_review,
  :daily_limit,
  :day_resets_at,
  :id,
  :kind,
  :next_due_at,
  :pause_cause,
  :paused,
  :read_at,
  :run_budget_usd,
  :schedule,
  :settings_changed_at,
  :skipped_today,
  :stale_at,
  :stale_reason,
  :starts,
  :subscription_id,
  :time_zone,
  :today_count,
  :trigger,
  :workflow_path,
  keyword_init: true
)

# Request payload for AgentWorkflowTrigger#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWorkflowTriggerLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentWorkflowTrigger#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWorkflowTriggerListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentWorkflowTrigger#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] daily_limit
#   @return [Object, nil]
#
# @!attribute [rw] read_at
#   @return [Object, nil]
#
# @!attribute [rw] run_budget_usd
#   @return [Object, nil]
AgentWorkflowTriggerUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :daily_limit,
  :read_at,
  :run_budget_usd,
  keyword_init: true
)

# Request payload for AgentWorkflowTrigger#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWorkflowTriggerRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentWorkspace entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] can_delete
#   @return [Boolean]
#
# @!attribute [rw] can_keep
#   @return [Boolean]
#
# @!attribute [rw] cleanup_after
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] reason
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
AgentWorkspace = Struct.new(
  :action,
  :can_delete,
  :can_keep,
  :cleanup_after,
  :created_at,
  :id,
  :name,
  :reason,
  :state,
  keyword_init: true
)

# Request payload for AgentWorkspace#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
AgentWorkspaceListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  keyword_init: true
)

# Request payload for AgentWorkspace#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [String, nil]
AgentWorkspaceUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :action,
  keyword_init: true
)

# AgentWritePermission entity data model.
#
# @!attribute [rw] account
#   @return [String]
#
# @!attribute [rw] granted_at
#   @return [String]
#
# @!attribute [rw] granted_by
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] in_effect
#   @return [Boolean]
#
# @!attribute [rw] last_used_at
#   @return [Object]
#
# @!attribute [rw] tool
#   @return [String]
AgentWritePermission = Struct.new(
  :account,
  :granted_at,
  :granted_by,
  :id,
  :in_effect,
  :last_used_at,
  :tool,
  keyword_init: true
)

# Request payload for AgentWritePermission#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWritePermissionListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentWritePermission#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentWritePermissionRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AllocationLog entity data model.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] fetched_at
#   @return [String]
#
# @!attribute [rw] location
#   @return [Object, nil]
#
# @!attribute [rw] logs
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] task
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
AllocationLog = Struct.new(
  :allocation_id,
  :environment,
  :fetched_at,
  :location,
  :logs,
  :namespace,
  :offset,
  :origin,
  :service,
  :task,
  :type,
  keyword_init: true
)

# Request payload for AllocationLog#list.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] origin
#   @return [String, nil]
#
# @!attribute [rw] task
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
AllocationLogListMatch = Struct.new(
  :allocation_id,
  :app_id,
  :offset,
  :origin,
  :task,
  :type,
  keyword_init: true
)

# App entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] framework
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_kind
#   @return [Object]
#
# @!attribute [rw] root_path
#   @return [String]
#
# @!attribute [rw] root_path_display
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
App = Struct.new(
  :created_at,
  :created_at_label,
  :description,
  :framework,
  :id,
  :name,
  :organization_id,
  :repository_id,
  :repository_kind,
  :root_path,
  :root_path_display,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for App#load.
#
# @!attribute [rw] id
#   @return [String]
AppLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for App#list.
#
# @!attribute [rw] organization_id
#   @return [String, nil]
AppListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for App#create.
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] framework
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] root_path
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
AppCreateData = Struct.new(
  :description,
  :framework,
  :name,
  :organization_id,
  :repository_id,
  :root_path,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for App#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] framework
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] root_path
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppUpdateData = Struct.new(
  :id,
  :description,
  :framework,
  :name,
  :organization_id,
  :repository_id,
  :root_path,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for App#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] framework
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] root_path
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppPatchData = Struct.new(
  :id,
  :description,
  :framework,
  :name,
  :organization_id,
  :repository_id,
  :root_path,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for App#remove.
#
# @!attribute [rw] id
#   @return [String]
AppRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# AppCdn entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] cache_path_prefix
#   @return [Object, nil]
#
# @!attribute [rw] cache_settings_json
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] distribution_kind
#   @return [String]
#
# @!attribute [rw] edge_hostname
#   @return [Object]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] hostnames
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_deployed_at
#   @return [Object]
#
# @!attribute [rw] last_deployed_at_label
#   @return [Object]
#
# @!attribute [rw] last_purged_at
#   @return [Object]
#
# @!attribute [rw] last_purged_at_label
#   @return [Object]
#
# @!attribute [rw] last_synced_at
#   @return [Object]
#
# @!attribute [rw] last_synced_at_label
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] origin_url
#   @return [String]
#
# @!attribute [rw] provisioned
#   @return [Boolean]
#
# @!attribute [rw] routing_settings_json
#   @return [Object]
#
# @!attribute [rw] security_settings_json
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
AppCdn = Struct.new(
  :app_environment_id,
  :app_service_id,
  :cache_path_prefix,
  :cache_settings_json,
  :created_at,
  :created_at_label,
  :distribution_kind,
  :edge_hostname,
  :failure_message,
  :hosted_app_id,
  :hostnames,
  :id,
  :last_deployed_at,
  :last_deployed_at_label,
  :last_purged_at,
  :last_purged_at_label,
  :last_synced_at,
  :last_synced_at_label,
  :name,
  :origin_url,
  :provisioned,
  :routing_settings_json,
  :security_settings_json,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for AppCdn#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppCdnLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppCdn#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppCdnListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppCdn#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] cache_path_prefix
#   @return [Object, nil]
#
# @!attribute [rw] cache_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] distribution_kind
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] origin_url
#   @return [String]
#
# @!attribute [rw] routing_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] security_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
AppCdnCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :cache_path_prefix,
  :cache_settings_json,
  :distribution_kind,
  :name,
  :origin_url,
  :routing_settings_json,
  :security_settings_json,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppCdn#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] cache_path_prefix
#   @return [Object, nil]
#
# @!attribute [rw] cache_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] distribution_kind
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] origin_url
#   @return [String, nil]
#
# @!attribute [rw] routing_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] security_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppCdnUpdateData = Struct.new(
  :app_id,
  :id,
  :app_environment_id,
  :app_service_id,
  :cache_path_prefix,
  :cache_settings_json,
  :distribution_kind,
  :name,
  :origin_url,
  :routing_settings_json,
  :security_settings_json,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppCdn#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] cache_path_prefix
#   @return [Object, nil]
#
# @!attribute [rw] cache_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] distribution_kind
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] origin_url
#   @return [String, nil]
#
# @!attribute [rw] routing_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] security_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppCdnPatchData = Struct.new(
  :app_id,
  :id,
  :app_environment_id,
  :app_service_id,
  :cache_path_prefix,
  :cache_settings_json,
  :distribution_kind,
  :name,
  :origin_url,
  :routing_settings_json,
  :security_settings_json,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppCdn#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppCdnRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppConfigVariable entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] exposed_to_build
#   @return [Boolean]
#
# @!attribute [rw] has_value
#   @return [Boolean]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] scope_kind
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] value
#   @return [Object]
#
# @!attribute [rw] value_kind
#   @return [String]
AppConfigVariable = Struct.new(
  :app_environment_id,
  :app_service_id,
  :created_at,
  :description,
  :exposed_to_build,
  :has_value,
  :hosted_app_id,
  :id,
  :key,
  :scope_kind,
  :updated_at,
  :value,
  :value_kind,
  keyword_init: true
)

# Request payload for AppConfigVariable#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppConfigVariableLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppConfigVariable#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
AppConfigVariableListMatch = Struct.new(
  :app_id,
  :app_environment_id,
  keyword_init: true
)

# Request payload for AppConfigVariable#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] exposed_to_build
#   @return [Boolean]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] scope_kind
#   @return [String]
#
# @!attribute [rw] value
#   @return [Object, nil]
#
# @!attribute [rw] value_kind
#   @return [String]
AppConfigVariableCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :description,
  :exposed_to_build,
  :key,
  :scope_kind,
  :value,
  :value_kind,
  keyword_init: true
)

# Request payload for AppConfigVariable#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppConfigVariableUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppConfigVariable#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppConfigVariablePatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppConfigVariable#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppConfigVariableRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppDataResource entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] engine
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] high_availability
#   @return [Boolean]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] plan
#   @return [Object]
#
# @!attribute [rw] provider_metadata
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] storage_gb
#   @return [Object]
#
# @!attribute [rw] storage_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Object]
AppDataResource = Struct.new(
  :app_environment_id,
  :created_at,
  :engine,
  :failure_message,
  :high_availability,
  :hosted_app_id,
  :id,
  :kind,
  :name,
  :plan,
  :provider_metadata,
  :region,
  :slug,
  :status,
  :storage_gb,
  :storage_label,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for AppDataResource#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDataResourceLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDataResource#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppDataResourceListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppDataResource#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] engine
#   @return [String]
#
# @!attribute [rw] high_availability
#   @return [Boolean, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] plan
#   @return [Object, nil]
#
# @!attribute [rw] region
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] storage_gb
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Object, nil]
AppDataResourceCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :engine,
  :high_availability,
  :kind,
  :name,
  :plan,
  :region,
  :slug,
  :storage_gb,
  :version,
  keyword_init: true
)

# Request payload for AppDataResource#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDataResourceUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDataResource#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDataResourcePatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDataResource#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDataResourceRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppDeploy entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] command
#   @return [String, nil]
#
# @!attribute [rw] commit_sha
#   @return [String, nil]
#
# @!attribute [rw] desired_instances
#   @return [Integer, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] rollout_predecessor
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
AppDeploy = Struct.new(
  :app_environment_id,
  :app_service_id,
  :channel,
  :command,
  :commit_sha,
  :desired_instances,
  :environment,
  :image,
  :region,
  :rollout_predecessor,
  :service,
  :source_ref,
  keyword_init: true
)

# Request payload for AppDeploy#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] command
#   @return [String, nil]
#
# @!attribute [rw] commit_sha
#   @return [String, nil]
#
# @!attribute [rw] desired_instances
#   @return [Integer, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] rollout_predecessor
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
AppDeployCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :channel,
  :command,
  :commit_sha,
  :desired_instances,
  :environment,
  :image,
  :region,
  :rollout_predecessor,
  :service,
  :source_ref,
  keyword_init: true
)

# AppDeployment entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [String]
#
# @!attribute [rw] app_service_id
#   @return [String]
#
# @!attribute [rw] app_service_placement_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_locator
#   @return [Object]
#
# @!attribute [rw] build_role
#   @return [Object]
#
# @!attribute [rw] commit_sha
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] creator_user_id
#   @return [Object]
#
# @!attribute [rw] deployed_url
#   @return [Object]
#
# @!attribute [rw] display_id
#   @return [Integer]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] finished_at_label
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [Object]
#
# @!attribute [rw] is_rollback
#   @return [Boolean]
#
# @!attribute [rw] location
#   @return [Object]
#
# @!attribute [rw] location_id
#   @return [String]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] operation_key
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] rollback_reason
#   @return [Object]
#
# @!attribute [rw] rollback_source_deployment_id
#   @return [Object]
#
# @!attribute [rw] rollback_source_release_id
#   @return [Object]
#
# @!attribute [rw] rollback_target_release_id
#   @return [Object]
#
# @!attribute [rw] source_ref
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] started_at_label
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] trigger_kind
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
AppDeployment = Struct.new(
  :app_environment_id,
  :app_service_id,
  :app_service_placement_id,
  :artifact_locator,
  :build_role,
  :commit_sha,
  :created_at,
  :created_at_label,
  :creator_user_id,
  :deployed_url,
  :display_id,
  :failure_message,
  :finished_at,
  :finished_at_label,
  :hosted_app_id,
  :id,
  :idempotency_key,
  :is_rollback,
  :location,
  :location_id,
  :number,
  :operation_key,
  :organization_id,
  :rollback_reason,
  :rollback_source_deployment_id,
  :rollback_source_release_id,
  :rollback_target_release_id,
  :source_ref,
  :started_at,
  :started_at_label,
  :status,
  :trigger_kind,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for AppDeployment#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDeploymentLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDeployment#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppDeploymentListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppDeployment#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_placement_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_locator
#   @return [Object, nil]
#
# @!attribute [rw] commit_sha
#   @return [Object, nil]
#
# @!attribute [rw] deployed_url
#   @return [Object, nil]
#
# @!attribute [rw] failure_message
#   @return [Object, nil]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] location_id
#   @return [String, nil]
#
# @!attribute [rw] source_ref
#   @return [Object, nil]
#
# @!attribute [rw] started_at
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] trigger_kind
#   @return [String, nil]
AppDeploymentCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :app_service_placement_id,
  :artifact_locator,
  :commit_sha,
  :deployed_url,
  :failure_message,
  :finished_at,
  :location_id,
  :source_ref,
  :started_at,
  :status,
  :trigger_kind,
  keyword_init: true
)

# Request payload for AppDeployment#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDeploymentUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDeployment#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDeploymentPatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDeployment#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDeploymentRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppDeploymentOperation entity data model.
#
# @!attribute [rw] app
#   @return [Hash]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_placement_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_locator
#   @return [Object]
#
# @!attribute [rw] build_duration_seconds
#   @return [Object]
#
# @!attribute [rw] build_source
#   @return [Object]
#
# @!attribute [rw] build_status
#   @return [String]
#
# @!attribute [rw] children
#   @return [Array]
#
# @!attribute [rw] ci_pipeline_id
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_run_id
#   @return [Object]
#
# @!attribute [rw] commit_sha
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] creator
#   @return [Object]
#
# @!attribute [rw] deployed_url
#   @return [Object]
#
# @!attribute [rw] duration_seconds
#   @return [Object]
#
# @!attribute [rw] environment
#   @return [Hash]
#
# @!attribute [rw] failure_message
#   @return [String, nil]
#
# @!attribute [rw] finished_at
#   @return [String, nil]
#
# @!attribute [rw] history_kind
#   @return [String]
#
# @!attribute [rw] history_reason
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_live
#   @return [Boolean]
#
# @!attribute [rw] is_rollback
#   @return [Boolean]
#
# @!attribute [rw] live_region_count
#   @return [Integer]
#
# @!attribute [rw] location_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] placement
#   @return [Object]
#
# @!attribute [rw] region_count
#   @return [Integer]
#
# @!attribute [rw] replicas_per_region
#   @return [Integer]
#
# @!attribute [rw] rollback_reason
#   @return [Object]
#
# @!attribute [rw] rollback_source_release_id
#   @return [Object]
#
# @!attribute [rw] rollback_target_release_id
#   @return [Object]
#
# @!attribute [rw] rollout_predecessor_id
#   @return [Object]
#
# @!attribute [rw] rollout_status
#   @return [String]
#
# @!attribute [rw] rollout_strategy
#   @return [String]
#
# @!attribute [rw] service
#   @return [Hash]
#
# @!attribute [rw] source_ref
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] total_replicas
#   @return [Integer]
#
# @!attribute [rw] trigger_kind
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
AppDeploymentOperation = Struct.new(
  :app,
  :app_environment_id,
  :app_service_id,
  :app_service_placement_id,
  :artifact_locator,
  :build_duration_seconds,
  :build_source,
  :build_status,
  :children,
  :ci_pipeline_id,
  :ci_pipeline_run_id,
  :commit_sha,
  :created_at,
  :creator,
  :deployed_url,
  :duration_seconds,
  :environment,
  :failure_message,
  :finished_at,
  :history_kind,
  :history_reason,
  :id,
  :is_live,
  :is_rollback,
  :live_region_count,
  :location_id,
  :number,
  :placement,
  :region_count,
  :replicas_per_region,
  :rollback_reason,
  :rollback_source_release_id,
  :rollback_target_release_id,
  :rollout_predecessor_id,
  :rollout_status,
  :rollout_strategy,
  :service,
  :source_ref,
  :started_at,
  :status,
  :total_replicas,
  :trigger_kind,
  :updated_at,
  keyword_init: true
)

# Request payload for AppDeploymentOperation#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppDeploymentOperationLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppDeploymentOperation#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
AppDeploymentOperationListMatch = Struct.new(
  :app_id,
  :limit,
  :page,
  keyword_init: true
)

# Request payload for AppDeploymentOperation#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_placement_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_locator
#   @return [Object, nil]
#
# @!attribute [rw] commit_sha
#   @return [Object, nil]
#
# @!attribute [rw] deployed_url
#   @return [Object, nil]
#
# @!attribute [rw] failure_message
#   @return [String, nil]
#
# @!attribute [rw] finished_at
#   @return [String, nil]
#
# @!attribute [rw] location_id
#   @return [String, nil]
#
# @!attribute [rw] source_ref
#   @return [Object, nil]
#
# @!attribute [rw] started_at
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] trigger_kind
#   @return [String, nil]
AppDeploymentOperationCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :app_service_placement_id,
  :artifact_locator,
  :commit_sha,
  :deployed_url,
  :failure_message,
  :finished_at,
  :location_id,
  :source_ref,
  :started_at,
  :status,
  :trigger_kind,
  keyword_init: true
)

# AppDeploymentRollback entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] blockers
#   @return [Array]
#
# @!attribute [rw] candidate_releases
#   @return [Array]
#
# @!attribute [rw] confirmation_text
#   @return [String]
#
# @!attribute [rw] current_deployment
#   @return [Object]
#
# @!attribute [rw] current_release
#   @return [Object]
#
# @!attribute [rw] deployment
#   @return [Object]
#
# @!attribute [rw] desired_state
#   @return [Object]
#
# @!attribute [rw] environment
#   @return [Object]
#
# @!attribute [rw] execution_allowed
#   @return [Boolean]
#
# @!attribute [rw] force
#   @return [Boolean]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] idempotent_reuse
#   @return [Boolean]
#
# @!attribute [rw] location
#   @return [Object]
#
# @!attribute [rw] operation
#   @return [Object]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] rollback_release
#   @return [Object]
#
# @!attribute [rw] rollout
#   @return [Object]
#
# @!attribute [rw] service
#   @return [Object]
#
# @!attribute [rw] target_artifact_locator
#   @return [Object]
#
# @!attribute [rw] target_release
#   @return [Object]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
AppDeploymentRollback = Struct.new(
  :app_environment_id,
  :app_id,
  :app_service_id,
  :blockers,
  :candidate_releases,
  :confirmation_text,
  :current_deployment,
  :current_release,
  :deployment,
  :desired_state,
  :environment,
  :execution_allowed,
  :force,
  :idempotency_key,
  :idempotent_reuse,
  :location,
  :operation,
  :reason,
  :rollback_release,
  :rollout,
  :service,
  :target_artifact_locator,
  :target_release,
  :to,
  :warnings,
  keyword_init: true
)

# Request payload for AppDeploymentRollback#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] deployment
#   @return [Object, nil]
#
# @!attribute [rw] environment
#   @return [Object, nil]
#
# @!attribute [rw] force
#   @return [Boolean, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [Object, nil]
#
# @!attribute [rw] service
#   @return [Object, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
AppDeploymentRollbackCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :deployment,
  :environment,
  :force,
  :idempotency_key,
  :reason,
  :service,
  :to,
  keyword_init: true
)

# AppEnvironment entity data model.
#
# @!attribute [rw] auto_deploy
#   @return [Boolean]
#
# @!attribute [rw] base_domain
#   @return [Object]
#
# @!attribute [rw] branch_pattern
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] location
#   @return [Object]
#
# @!attribute [rw] location_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
AppEnvironment = Struct.new(
  :auto_deploy,
  :base_domain,
  :branch_pattern,
  :created_at,
  :created_at_label,
  :hosted_app_id,
  :id,
  :kind,
  :location,
  :location_id,
  :name,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for AppEnvironment#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppEnvironmentLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppEnvironment#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppEnvironmentListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppEnvironment#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean]
#
# @!attribute [rw] base_domain
#   @return [Object, nil]
#
# @!attribute [rw] branch_pattern
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] location_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
AppEnvironmentCreateData = Struct.new(
  :app_id,
  :auto_deploy,
  :base_domain,
  :branch_pattern,
  :kind,
  :location_id,
  :name,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppEnvironment#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean, nil]
#
# @!attribute [rw] base_domain
#   @return [Object, nil]
#
# @!attribute [rw] branch_pattern
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] location_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppEnvironmentUpdateData = Struct.new(
  :app_id,
  :id,
  :auto_deploy,
  :base_domain,
  :branch_pattern,
  :kind,
  :location_id,
  :name,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppEnvironment#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean, nil]
#
# @!attribute [rw] base_domain
#   @return [Object, nil]
#
# @!attribute [rw] branch_pattern
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] location_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppEnvironmentPatchData = Struct.new(
  :app_id,
  :id,
  :auto_deploy,
  :base_domain,
  :branch_pattern,
  :kind,
  :location_id,
  :name,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppEnvironment#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppEnvironmentRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppLocation entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] location_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nomad_datacenter
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
AppLocation = Struct.new(
  :code,
  :created_at,
  :id,
  :location_id,
  :name,
  :nomad_datacenter,
  :updated_at,
  keyword_init: true
)

# Request payload for AppLocation#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppLocationListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppLocation#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] location_id
#   @return [String]
AppLocationCreateData = Struct.new(
  :app_id,
  :location_id,
  keyword_init: true
)

# Request payload for AppLocation#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppLocationRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppMetric entity data model.
class AppMetric
end

# Request payload for AppMetric#load.
#
# @!attribute [rw] app_id
#   @return [String]
AppMetricLoadMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# AppPreview entity data model.
#
# @!attribute [rw] access
#   @return [String, nil]
#
# @!attribute [rw] app_preview_profile_id
#   @return [String]
#
# @!attribute [rw] change_number
#   @return [String, nil]
#
# @!attribute [rw] expected_generation
#   @return [Integer, nil]
#
# @!attribute [rw] expected_patchset
#   @return [Integer, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] resource_overrides
#   @return [Hash, nil]
#
# @!attribute [rw] retained
#   @return [Boolean, nil]
#
# @!attribute [rw] shared_data_binding_ids
#   @return [Array, nil]
#
# @!attribute [rw] shared_service_binding_ids
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
#
# @!attribute [rw] storage_binding_resources
#   @return [Hash, nil]
AppPreview = Struct.new(
  :access,
  :app_preview_profile_id,
  :change_number,
  :expected_generation,
  :expected_patchset,
  :expires_at,
  :id,
  :name,
  :resource_overrides,
  :retained,
  :shared_data_binding_ids,
  :shared_service_binding_ids,
  :slug,
  :source_ref,
  :storage_binding_resources,
  keyword_init: true
)

# Request payload for AppPreview#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppPreview#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppPreviewListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppPreview#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_preview_profile_id
#   @return [String]
#
# @!attribute [rw] change_number
#   @return [String, nil]
#
# @!attribute [rw] expected_patchset
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
AppPreviewCreateData = Struct.new(
  :app_id,
  :app_preview_profile_id,
  :change_number,
  :expected_patchset,
  :name,
  :slug,
  :source_ref,
  keyword_init: true
)

# Request payload for AppPreview#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppPreview#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] access
#   @return [String, nil]
#
# @!attribute [rw] expected_generation
#   @return [Integer, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] resource_overrides
#   @return [Hash, nil]
#
# @!attribute [rw] retained
#   @return [Boolean, nil]
#
# @!attribute [rw] shared_data_binding_ids
#   @return [Array, nil]
#
# @!attribute [rw] shared_service_binding_ids
#   @return [Array, nil]
#
# @!attribute [rw] storage_binding_resources
#   @return [Hash, nil]
AppPreviewPatchData = Struct.new(
  :app_id,
  :id,
  :access,
  :expected_generation,
  :expires_at,
  :resource_overrides,
  :retained,
  :shared_data_binding_ids,
  :shared_service_binding_ids,
  :storage_binding_resources,
  keyword_init: true
)

# Request payload for AppPreview#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppPreviewProfile entity data model.
#
# @!attribute [rw] automatic
#   @return [Boolean, nil]
#
# @!attribute [rw] configuration
#   @return [Hash, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_environment_id
#   @return [String]
#
# @!attribute [rw] ttl_days
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
AppPreviewProfile = Struct.new(
  :automatic,
  :configuration,
  :created_at,
  :hosted_app_id,
  :id,
  :name,
  :slug,
  :source_environment_id,
  :ttl_days,
  :updated_at,
  keyword_init: true
)

# Request payload for AppPreviewProfile#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewProfileLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppPreviewProfile#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppPreviewProfileListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppPreviewProfile#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] automatic
#   @return [Boolean, nil]
#
# @!attribute [rw] configuration
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_environment_id
#   @return [String]
#
# @!attribute [rw] ttl_days
#   @return [Integer, nil]
AppPreviewProfileCreateData = Struct.new(
  :app_id,
  :automatic,
  :configuration,
  :name,
  :slug,
  :source_environment_id,
  :ttl_days,
  keyword_init: true
)

# Request payload for AppPreviewProfile#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewProfileUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppPreviewProfile#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] automatic
#   @return [Boolean, nil]
#
# @!attribute [rw] configuration
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_environment_id
#   @return [String, nil]
#
# @!attribute [rw] ttl_days
#   @return [Integer, nil]
AppPreviewProfilePatchData = Struct.new(
  :app_id,
  :id,
  :automatic,
  :configuration,
  :name,
  :slug,
  :source_environment_id,
  :ttl_days,
  keyword_init: true
)

# Request payload for AppPreviewProfile#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppPreviewProfileRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppRun entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
AppRun = Struct.new(
  :id,
  :image,
  keyword_init: true
)

# Request payload for AppRun#load.
#
# @!attribute [rw] id
#   @return [String]
AppRunLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AppRun#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
AppRunListMatch = Struct.new(
  :id,
  :image,
  keyword_init: true
)

# Request payload for AppRun#create.
#
# @!attribute [rw] image
#   @return [String, nil]
AppRunCreateData = Struct.new(
  :image,
  keyword_init: true
)

# AppSecret entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] env_key
#   @return [Object, nil]
#
# @!attribute [rw] expose_to_build
#   @return [Boolean, nil]
#
# @!attribute [rw] has_value
#   @return [Boolean, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latest_version_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] rotation_policy
#   @return [Object, nil]
#
# @!attribute [rw] scope_kind
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
#
# @!attribute [rw] value_digest
#   @return [Object, nil]
#
# @!attribute [rw] value_kind
#   @return [Object, nil]
AppSecret = Struct.new(
  :created_at,
  :description,
  :env_key,
  :expose_to_build,
  :has_value,
  :hosted_app_id,
  :id,
  :latest_version_number,
  :name,
  :organization_id,
  :rotation_policy,
  :scope_kind,
  :slug,
  :status,
  :updated_at,
  :value,
  :value_digest,
  :value_kind,
  keyword_init: true
)

# Request payload for AppSecret#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppSecretLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppSecret#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppSecretListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppSecret#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] env_key
#   @return [Object, nil]
#
# @!attribute [rw] expose_to_build
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] rotation_policy
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] value
#   @return [String, nil]
#
# @!attribute [rw] value_kind
#   @return [Object, nil]
AppSecretCreateData = Struct.new(
  :app_id,
  :description,
  :env_key,
  :expose_to_build,
  :name,
  :rotation_policy,
  :slug,
  :value,
  :value_kind,
  keyword_init: true
)

# Request payload for AppSecret#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] env_key
#   @return [Object, nil]
#
# @!attribute [rw] expose_to_build
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rotation_policy
#   @return [Object, nil]
AppSecretUpdateData = Struct.new(
  :app_id,
  :id,
  :description,
  :env_key,
  :expose_to_build,
  :name,
  :rotation_policy,
  keyword_init: true
)

# Request payload for AppSecret#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] env_key
#   @return [Object, nil]
#
# @!attribute [rw] expose_to_build
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rotation_policy
#   @return [Object, nil]
AppSecretPatchData = Struct.new(
  :app_id,
  :id,
  :description,
  :env_key,
  :expose_to_build,
  :name,
  :rotation_policy,
  keyword_init: true
)

# Request payload for AppSecret#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppSecretRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppService entity data model.
#
# @!attribute [rw] auto_deploy
#   @return [Boolean]
#
# @!attribute [rw] bindings
#   @return [Array]
#
# @!attribute [rw] build_command
#   @return [Object]
#
# @!attribute [rw] cpu_label
#   @return [Object]
#
# @!attribute [rw] cpu_mhz
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] deploy_paths
#   @return [Array]
#
# @!attribute [rw] desired_instances
#   @return [Integer]
#
# @!attribute [rw] disk_label
#   @return [Object]
#
# @!attribute [rw] disk_mb
#   @return [Object]
#
# @!attribute [rw] effective_deploy_paths
#   @return [Array]
#
# @!attribute [rw] healthcheck_path
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] internal_port
#   @return [Object]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] memory_label
#   @return [Object]
#
# @!attribute [rw] memory_max_label
#   @return [Object]
#
# @!attribute [rw] memory_max_mb
#   @return [Object]
#
# @!attribute [rw] memory_mb
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nomad_constraints_json
#   @return [Object]
#
# @!attribute [rw] nomad_kill_timeout_seconds
#   @return [Object]
#
# @!attribute [rw] nomad_namespace
#   @return [Object]
#
# @!attribute [rw] nomad_region
#   @return [Object]
#
# @!attribute [rw] nomad_shutdown_delay_seconds
#   @return [Object]
#
# @!attribute [rw] nomad_ulimits_json
#   @return [Object]
#
# @!attribute [rw] nomad_update_strategy_json
#   @return [Object]
#
# @!attribute [rw] prestart_command
#   @return [Object]
#
# @!attribute [rw] publicly_accessible
#   @return [Boolean]
#
# @!attribute [rw] release_command
#   @return [Object]
#
# @!attribute [rw] repo_source_path
#   @return [String]
#
# @!attribute [rw] runtime
#   @return [String]
#
# @!attribute [rw] runtime_adapter_kind
#   @return [String]
#
# @!attribute [rw] runtime_adapter_settings_json
#   @return [Object]
#
# @!attribute [rw] schedule
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_path
#   @return [String]
#
# @!attribute [rw] start_command
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
AppService = Struct.new(
  :auto_deploy,
  :bindings,
  :build_command,
  :cpu_label,
  :cpu_mhz,
  :created_at,
  :created_at_label,
  :deploy_paths,
  :desired_instances,
  :disk_label,
  :disk_mb,
  :effective_deploy_paths,
  :healthcheck_path,
  :hosted_app_id,
  :id,
  :internal_port,
  :kind,
  :memory_label,
  :memory_max_label,
  :memory_max_mb,
  :memory_mb,
  :name,
  :nomad_constraints_json,
  :nomad_kill_timeout_seconds,
  :nomad_namespace,
  :nomad_region,
  :nomad_shutdown_delay_seconds,
  :nomad_ulimits_json,
  :nomad_update_strategy_json,
  :prestart_command,
  :publicly_accessible,
  :release_command,
  :repo_source_path,
  :runtime,
  :runtime_adapter_kind,
  :runtime_adapter_settings_json,
  :schedule,
  :slug,
  :source_path,
  :start_command,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for AppService#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppService#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppServiceListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppService#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean]
#
# @!attribute [rw] build_command
#   @return [Object, nil]
#
# @!attribute [rw] cpu_mhz
#   @return [Object, nil]
#
# @!attribute [rw] deploy_paths
#   @return [Array, nil]
#
# @!attribute [rw] desired_instances
#   @return [Integer]
#
# @!attribute [rw] disk_mb
#   @return [Object, nil]
#
# @!attribute [rw] healthcheck_path
#   @return [Object, nil]
#
# @!attribute [rw] internal_port
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] memory_max_mb
#   @return [Object, nil]
#
# @!attribute [rw] memory_mb
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nomad_constraints_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_kill_timeout_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_namespace
#   @return [Object, nil]
#
# @!attribute [rw] nomad_region
#   @return [Object, nil]
#
# @!attribute [rw] nomad_shutdown_delay_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_ulimits_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_update_strategy_json
#   @return [Object, nil]
#
# @!attribute [rw] prestart_command
#   @return [Object, nil]
#
# @!attribute [rw] publicly_accessible
#   @return [Boolean]
#
# @!attribute [rw] release_command
#   @return [Object, nil]
#
# @!attribute [rw] runtime
#   @return [String]
#
# @!attribute [rw] runtime_adapter_kind
#   @return [String]
#
# @!attribute [rw] runtime_adapter_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] schedule
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_path
#   @return [String]
#
# @!attribute [rw] start_command
#   @return [Object]
AppServiceCreateData = Struct.new(
  :app_id,
  :auto_deploy,
  :build_command,
  :cpu_mhz,
  :deploy_paths,
  :desired_instances,
  :disk_mb,
  :healthcheck_path,
  :internal_port,
  :kind,
  :memory_max_mb,
  :memory_mb,
  :name,
  :nomad_constraints_json,
  :nomad_kill_timeout_seconds,
  :nomad_namespace,
  :nomad_region,
  :nomad_shutdown_delay_seconds,
  :nomad_ulimits_json,
  :nomad_update_strategy_json,
  :prestart_command,
  :publicly_accessible,
  :release_command,
  :runtime,
  :runtime_adapter_kind,
  :runtime_adapter_settings_json,
  :schedule,
  :slug,
  :source_path,
  :start_command,
  keyword_init: true
)

# Request payload for AppService#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean, nil]
#
# @!attribute [rw] build_command
#   @return [Object, nil]
#
# @!attribute [rw] cpu_mhz
#   @return [Object, nil]
#
# @!attribute [rw] deploy_paths
#   @return [Array, nil]
#
# @!attribute [rw] desired_instances
#   @return [Integer, nil]
#
# @!attribute [rw] disk_mb
#   @return [Object, nil]
#
# @!attribute [rw] healthcheck_path
#   @return [Object, nil]
#
# @!attribute [rw] internal_port
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] memory_max_mb
#   @return [Object, nil]
#
# @!attribute [rw] memory_mb
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nomad_constraints_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_kill_timeout_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_namespace
#   @return [Object, nil]
#
# @!attribute [rw] nomad_region
#   @return [Object, nil]
#
# @!attribute [rw] nomad_shutdown_delay_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_ulimits_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_update_strategy_json
#   @return [Object, nil]
#
# @!attribute [rw] prestart_command
#   @return [Object, nil]
#
# @!attribute [rw] publicly_accessible
#   @return [Boolean, nil]
#
# @!attribute [rw] release_command
#   @return [Object, nil]
#
# @!attribute [rw] runtime
#   @return [String, nil]
#
# @!attribute [rw] runtime_adapter_kind
#   @return [String, nil]
#
# @!attribute [rw] runtime_adapter_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] schedule
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_path
#   @return [String, nil]
#
# @!attribute [rw] start_command
#   @return [Object, nil]
AppServiceUpdateData = Struct.new(
  :app_id,
  :id,
  :auto_deploy,
  :build_command,
  :cpu_mhz,
  :deploy_paths,
  :desired_instances,
  :disk_mb,
  :healthcheck_path,
  :internal_port,
  :kind,
  :memory_max_mb,
  :memory_mb,
  :name,
  :nomad_constraints_json,
  :nomad_kill_timeout_seconds,
  :nomad_namespace,
  :nomad_region,
  :nomad_shutdown_delay_seconds,
  :nomad_ulimits_json,
  :nomad_update_strategy_json,
  :prestart_command,
  :publicly_accessible,
  :release_command,
  :runtime,
  :runtime_adapter_kind,
  :runtime_adapter_settings_json,
  :schedule,
  :slug,
  :source_path,
  :start_command,
  keyword_init: true
)

# Request payload for AppService#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] auto_deploy
#   @return [Boolean, nil]
#
# @!attribute [rw] build_command
#   @return [Object, nil]
#
# @!attribute [rw] cpu_mhz
#   @return [Object, nil]
#
# @!attribute [rw] deploy_paths
#   @return [Array, nil]
#
# @!attribute [rw] desired_instances
#   @return [Integer, nil]
#
# @!attribute [rw] disk_mb
#   @return [Object, nil]
#
# @!attribute [rw] healthcheck_path
#   @return [Object, nil]
#
# @!attribute [rw] internal_port
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] memory_max_mb
#   @return [Object, nil]
#
# @!attribute [rw] memory_mb
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nomad_constraints_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_kill_timeout_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_namespace
#   @return [Object, nil]
#
# @!attribute [rw] nomad_region
#   @return [Object, nil]
#
# @!attribute [rw] nomad_shutdown_delay_seconds
#   @return [Object, nil]
#
# @!attribute [rw] nomad_ulimits_json
#   @return [Object, nil]
#
# @!attribute [rw] nomad_update_strategy_json
#   @return [Object, nil]
#
# @!attribute [rw] prestart_command
#   @return [Object, nil]
#
# @!attribute [rw] publicly_accessible
#   @return [Boolean, nil]
#
# @!attribute [rw] release_command
#   @return [Object, nil]
#
# @!attribute [rw] runtime
#   @return [String, nil]
#
# @!attribute [rw] runtime_adapter_kind
#   @return [String, nil]
#
# @!attribute [rw] runtime_adapter_settings_json
#   @return [Object, nil]
#
# @!attribute [rw] schedule
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_path
#   @return [String, nil]
#
# @!attribute [rw] start_command
#   @return [Object, nil]
AppServicePatchData = Struct.new(
  :app_id,
  :id,
  :auto_deploy,
  :build_command,
  :cpu_mhz,
  :deploy_paths,
  :desired_instances,
  :disk_mb,
  :healthcheck_path,
  :internal_port,
  :kind,
  :memory_max_mb,
  :memory_mb,
  :name,
  :nomad_constraints_json,
  :nomad_kill_timeout_seconds,
  :nomad_namespace,
  :nomad_region,
  :nomad_shutdown_delay_seconds,
  :nomad_ulimits_json,
  :nomad_update_strategy_json,
  :prestart_command,
  :publicly_accessible,
  :release_command,
  :runtime,
  :runtime_adapter_kind,
  :runtime_adapter_settings_json,
  :schedule,
  :slug,
  :source_path,
  :start_command,
  keyword_init: true
)

# Request payload for AppService#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppServiceBinding entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AppServiceBinding = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AppServiceBinding#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceBindingLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppServiceBinding#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppServiceBindingListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppServiceBinding#create.
#
# @!attribute [rw] app_id
#   @return [String]
AppServiceBindingCreateData = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppServiceBinding#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceBindingUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppServiceBinding#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceBindingPatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppServiceBinding#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServiceBindingRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AppServicePlacement entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [String]
#
# @!attribute [rw] app_service_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deployment_channel
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] region_count
#   @return [Integer]
#
# @!attribute [rw] replicas_per_region
#   @return [Integer]
#
# @!attribute [rw] rollout_strategy
#   @return [String]
#
# @!attribute [rw] targets
#   @return [Array]
#
# @!attribute [rw] total_replicas
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [String]
AppServicePlacement = Struct.new(
  :app_environment_id,
  :app_service_id,
  :created_at,
  :deployment_channel,
  :hosted_app_id,
  :id,
  :mode,
  :organization_id,
  :region_count,
  :replicas_per_region,
  :rollout_strategy,
  :targets,
  :total_replicas,
  :updated_at,
  keyword_init: true
)

# Request payload for AppServicePlacement#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppServicePlacementLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppServicePlacement#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] existing
#   @return [Boolean, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
AppServicePlacementListMatch = Struct.new(
  :app_id,
  :existing,
  :service,
  keyword_init: true
)

# Request payload for AppServicePlacement#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] deployment_channel
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] replicas_per_region
#   @return [Integer, nil]
#
# @!attribute [rw] rollout_strategy
#   @return [String, nil]
#
# @!attribute [rw] targets
#   @return [Array, nil]
#
# @!attribute [rw] expected_generation
#   @return [Object, nil]
AppServicePlacementUpdateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :deployment_channel,
  :mode,
  :replicas_per_region,
  :rollout_strategy,
  :targets,
  :expected_generation,
  keyword_init: true
)

# AppStorageResource entity data model.
#
# @!attribute [rw] access_mode
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] attachment
#   @return [Object]
#
# @!attribute [rw] capacity_gb
#   @return [Object]
#
# @!attribute [rw] capacity_label
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] ephemeral
#   @return [Boolean]
#
# @!attribute [rw] external_volume_id
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] location_code
#   @return [Object]
#
# @!attribute [rw] location_id
#   @return [Object]
#
# @!attribute [rw] mount_path
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] provider_error
#   @return [Object]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
AppStorageResource = Struct.new(
  :access_mode,
  :app_environment_id,
  :attachment,
  :capacity_gb,
  :capacity_label,
  :created_at,
  :ephemeral,
  :external_volume_id,
  :hosted_app_id,
  :id,
  :kind,
  :location_code,
  :location_id,
  :mount_path,
  :name,
  :provider,
  :provider_error,
  :region,
  :slug,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for AppStorageResource#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppStorageResourceLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppStorageResource#list.
#
# @!attribute [rw] app_id
#   @return [String]
AppStorageResourceListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# Request payload for AppStorageResource#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] access_mode
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] capacity_gb
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] location_id
#   @return [Object, nil]
#
# @!attribute [rw] mount_path
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] region
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
AppStorageResourceCreateData = Struct.new(
  :app_id,
  :access_mode,
  :app_environment_id,
  :capacity_gb,
  :kind,
  :location_id,
  :mount_path,
  :name,
  :provider,
  :region,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for AppStorageResource#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppStorageResourceUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppStorageResource#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppStorageResourcePatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for AppStorageResource#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
AppStorageResourceRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# AttachmentPart entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AttachmentPart = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AttachmentPart#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] attachment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AttachmentPartUpdateData = Struct.new(
  :agent_id,
  :attachment_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AutomationEvent entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_events
#   @return [Boolean]
#
# @!attribute [rw] can_run
#   @return [Boolean]
#
# @!attribute [rw] can_schedule
#   @return [Boolean]
#
# @!attribute [rw] event_subscriptions
#   @return [Array]
#
# @!attribute [rw] event_triggers
#   @return [Array]
#
# @!attribute [rw] expected_revision
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] revision
#   @return [Integer]
#
# @!attribute [rw] schedule
#   @return [Object]
#
# @!attribute [rw] schedules
#   @return [Array]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] subscription_key
#   @return [String]
#
# @!attribute [rw] version
#   @return [Hash]
AutomationEvent = Struct.new(
  :action,
  :can_manage,
  :can_manage_events,
  :can_run,
  :can_schedule,
  :event_subscriptions,
  :event_triggers,
  :expected_revision,
  :id,
  :key,
  :name,
  :revision,
  :schedule,
  :schedules,
  :settings,
  :subscription_key,
  :version,
  keyword_init: true
)

# Request payload for AutomationEvent#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] automation_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [String, nil]
#
# @!attribute [rw] expected_revision
#   @return [Object, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] subscription_key
#   @return [String, nil]
AutomationEventUpdateData = Struct.new(
  :agent_id,
  :automation_id,
  :organization_id,
  :action,
  :expected_revision,
  :settings,
  :subscription_key,
  keyword_init: true
)

# AutomationRun entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] automation
#   @return [Object]
#
# @!attribute [rw] budget_seconds
#   @return [Object]
#
# @!attribute [rw] budget_usd
#   @return [Object]
#
# @!attribute [rw] can_answer
#   @return [Boolean]
#
# @!attribute [rw] can_approve
#   @return [Boolean]
#
# @!attribute [rw] can_dismiss
#   @return [Boolean]
#
# @!attribute [rw] checkpoint
#   @return [Object]
#
# @!attribute [rw] conversation_id
#   @return [Object]
#
# @!attribute [rw] decision_history
#   @return [Hash]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] flow_steps
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Hash]
#
# @!attribute [rw] needs_you
#   @return [Boolean]
#
# @!attribute [rw] note
#   @return [Object]
#
# @!attribute [rw] nothing_to_do_reason
#   @return [Object]
#
# @!attribute [rw] request_id
#   @return [String]
#
# @!attribute [rw] resume_count
#   @return [Integer]
#
# @!attribute [rw] retry_step_id
#   @return [Object]
#
# @!attribute [rw] running_seconds
#   @return [Integer]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] spent_tokens
#   @return [Integer]
#
# @!attribute [rw] spent_usd
#   @return [Float]
#
# @!attribute [rw] stalled
#   @return [Boolean]
#
# @!attribute [rw] started_at
#   @return [String]
#
# @!attribute [rw] started_by
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] step_count
#   @return [Integer]
#
# @!attribute [rw] steps
#   @return [Array]
#
# @!attribute [rw] trigger_id
#   @return [Object]
#
# @!attribute [rw] version_id
#   @return [String]
#
# @!attribute [rw] wake_at
#   @return [Object]
#
# @!attribute [rw] workflow_digest
#   @return [Object]
#
# @!attribute [rw] workflow_path
#   @return [Object]
AutomationRun = Struct.new(
  :action,
  :automation,
  :budget_seconds,
  :budget_usd,
  :can_answer,
  :can_approve,
  :can_dismiss,
  :checkpoint,
  :conversation_id,
  :decision_history,
  :error,
  :finished_at,
  :flow_steps,
  :id,
  :input,
  :needs_you,
  :note,
  :nothing_to_do_reason,
  :request_id,
  :resume_count,
  :retry_step_id,
  :running_seconds,
  :source,
  :spent_tokens,
  :spent_usd,
  :stalled,
  :started_at,
  :started_by,
  :status,
  :step_count,
  :steps,
  :trigger_id,
  :version_id,
  :wake_at,
  :workflow_digest,
  :workflow_path,
  keyword_init: true
)

# Request payload for AutomationRun#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] automation_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Hash]
#
# @!attribute [rw] request_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String]
AutomationRunCreateData = Struct.new(
  :agent_id,
  :automation_id,
  :organization_id,
  :input,
  :request_id,
  :version_id,
  keyword_init: true
)

# Binary entity data model.
#
# @!attribute [rw] accepts_versions
#   @return [Boolean]
#
# @!attribute [rw] arch
#   @return [Object, nil]
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] binary
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] download_secret
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String]
#
# @!attribute [rw] executable
#   @return [String]
#
# @!attribute [rw] format
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] latest_version
#   @return [Object]
#
# @!attribute [rw] launch_args
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] needs_refresh
#   @return [Boolean]
#
# @!attribute [rw] operation
#   @return [Hash]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] platform
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] sha256
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] version
#   @return [Hash]
#
# @!attribute [rw] version_defaults
#   @return [Object, nil]
#
# @!attribute [rw] versions
#   @return [Array]
#
# @!attribute [rw] window_title
#   @return [String]
Binary = Struct.new(
  :accepts_versions,
  :arch,
  :archived_at,
  :binary,
  :created_at,
  :download_secret,
  :download_url,
  :executable,
  :format,
  :id,
  :idempotency_key,
  :latest_version,
  :launch_args,
  :name,
  :needs_refresh,
  :operation,
  :pagination,
  :permissions,
  :platform,
  :project_id,
  :sha256,
  :slug,
  :version,
  :version_defaults,
  :versions,
  :window_title,
  keyword_init: true
)

# Request payload for Binary#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String]
BinaryLoadMatch = Struct.new(
  :id,
  :organization_id,
  :page,
  :project_id,
  keyword_init: true
)

# Request payload for Binary#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String]
BinaryListMatch = Struct.new(
  :organization_id,
  :page,
  :project_id,
  keyword_init: true
)

# Request payload for Binary#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] arch
#   @return [Object, nil]
#
# @!attribute [rw] download_secret
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String]
#
# @!attribute [rw] executable
#   @return [String]
#
# @!attribute [rw] format
#   @return [Object]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] launch_args
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] platform
#   @return [Object, nil]
#
# @!attribute [rw] sha256
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] window_title
#   @return [String]
BinaryCreateData = Struct.new(
  :organization_id,
  :project_id,
  :arch,
  :download_secret,
  :download_url,
  :executable,
  :format,
  :idempotency_key,
  :launch_args,
  :name,
  :platform,
  :sha256,
  :slug,
  :window_title,
  keyword_init: true
)

# BinaryVersion entity data model.
#
# @!attribute [rw] arch
#   @return [Object, nil]
#
# @!attribute [rw] cancelable
#   @return [Boolean]
#
# @!attribute [rw] configuration
#   @return [Hash]
#
# @!attribute [rw] configuration_digest
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deletable
#   @return [Boolean]
#
# @!attribute [rw] download_secret
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String]
#
# @!attribute [rw] environment_uses
#   @return [Array]
#
# @!attribute [rw] executable
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] launch_args
#   @return [Array, nil]
#
# @!attribute [rw] operation
#   @return [Hash]
#
# @!attribute [rw] package_sha256
#   @return [Object]
#
# @!attribute [rw] package_size
#   @return [Object]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] platform
#   @return [Object, nil]
#
# @!attribute [rw] preparations
#   @return [Array]
#
# @!attribute [rw] retryable
#   @return [Boolean]
#
# @!attribute [rw] sha256
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] version
#   @return [Hash]
#
# @!attribute [rw] window_title
#   @return [String, nil]
BinaryVersion = Struct.new(
  :arch,
  :cancelable,
  :configuration,
  :configuration_digest,
  :created_at,
  :deletable,
  :download_secret,
  :download_url,
  :environment_uses,
  :executable,
  :format,
  :id,
  :idempotency_key,
  :launch_args,
  :operation,
  :package_sha256,
  :package_size,
  :permissions,
  :platform,
  :preparations,
  :retryable,
  :sha256,
  :status,
  :version,
  :window_title,
  keyword_init: true
)

# Request payload for BinaryVersion#load.
#
# @!attribute [rw] binary_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
BinaryVersionLoadMatch = Struct.new(
  :binary_id,
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for BinaryVersion#list.
#
# @!attribute [rw] binary_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String]
BinaryVersionListMatch = Struct.new(
  :binary_id,
  :organization_id,
  :page,
  :project_id,
  keyword_init: true
)

# Request payload for BinaryVersion#create.
#
# @!attribute [rw] binary_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] arch
#   @return [Object, nil]
#
# @!attribute [rw] download_secret
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String]
#
# @!attribute [rw] executable
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] launch_args
#   @return [Array, nil]
#
# @!attribute [rw] platform
#   @return [Object, nil]
#
# @!attribute [rw] sha256
#   @return [String, nil]
#
# @!attribute [rw] window_title
#   @return [String, nil]
BinaryVersionCreateData = Struct.new(
  :binary_id,
  :organization_id,
  :project_id,
  :arch,
  :download_secret,
  :download_url,
  :executable,
  :format,
  :idempotency_key,
  :launch_args,
  :platform,
  :sha256,
  :window_title,
  keyword_init: true
)

# Request payload for BinaryVersion#remove.
#
# @!attribute [rw] binary_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
BinaryVersionRemoveMatch = Struct.new(
  :binary_id,
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# BrowserEgressCandidate entity data model.
#
# @!attribute [rw] id
#   @return [String]
BrowserEgressCandidate = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BrowserEgressCandidate#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
BrowserEgressCandidateListMatch = Struct.new(
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# BrowserSession entity data model.
#
# @!attribute [rw] active_task_id
#   @return [Object, nil]
#
# @!attribute [rw] authentication_status
#   @return [String]
#
# @!attribute [rw] authentication_task_id
#   @return [Object, nil]
#
# @!attribute [rw] cdp_url
#   @return [Object, nil]
#
# @!attribute [rw] closed_at
#   @return [Object, nil]
#
# @!attribute [rw] closure_basis
#   @return [Object, nil]
#
# @!attribute [rw] control_generation
#   @return [Integer]
#
# @!attribute [rw] controller
#   @return [String]
#
# @!attribute [rw] credential_id
#   @return [Object, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] environment_revision_id
#   @return [Object, nil]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] failure_code
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] initial_url
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] pending_control_id
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] reconciled_at
#   @return [Object, nil]
#
# @!attribute [rw] started_at
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] viewer
#   @return [Object, nil]
BrowserSession = Struct.new(
  :active_task_id,
  :authentication_status,
  :authentication_task_id,
  :cdp_url,
  :closed_at,
  :closure_basis,
  :control_generation,
  :controller,
  :credential_id,
  :environment_id,
  :environment_revision_id,
  :expires_at,
  :failure_code,
  :id,
  :idempotency_key,
  :initial_url,
  :max_seconds,
  :pending_control_id,
  :project_id,
  :reconciled_at,
  :started_at,
  :status,
  :url,
  :viewer,
  keyword_init: true
)

# Request payload for BrowserSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BrowserSessionLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for BrowserSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] controller
#   @return [String, nil]
#
# @!attribute [rw] credential_id
#   @return [Object, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
BrowserSessionCreateData = Struct.new(
  :organization_id,
  :controller,
  :credential_id,
  :environment_id,
  :idempotency_key,
  :max_seconds,
  :project_id,
  :url,
  keyword_init: true
)

# Request payload for BrowserSession#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BrowserSessionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# BrowserSessionConnection entity data model.
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
BrowserSessionConnection = Struct.new(
  :generation,
  :idempotency_key,
  keyword_init: true
)

# Request payload for BrowserSessionConnection#create.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
BrowserSessionConnectionCreateData = Struct.new(
  :browser_session_id,
  :organization_id,
  :generation,
  :idempotency_key,
  keyword_init: true
)

# BrowserSessionControl entity data model.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] completed_at
#   @return [Object, nil]
#
# @!attribute [rw] completed_generation
#   @return [Object, nil]
#
# @!attribute [rw] connection
#   @return [Object, nil]
#
# @!attribute [rw] failure_code
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] requested_controller
#   @return [String]
#
# @!attribute [rw] requested_generation
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String]
BrowserSessionControl = Struct.new(
  :browser_session_id,
  :completed_at,
  :completed_generation,
  :connection,
  :failure_code,
  :id,
  :requested_controller,
  :requested_generation,
  :status,
  keyword_init: true
)

# Request payload for BrowserSessionControl#load.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BrowserSessionControlLoadMatch = Struct.new(
  :browser_session_id,
  :id,
  :organization_id,
  keyword_init: true
)

# BrowserSessionEvent entity data model.
#
# @!attribute [rw] browser_task_id
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] source_sequence
#   @return [Object, nil]
BrowserSessionEvent = Struct.new(
  :browser_task_id,
  :created_at,
  :id,
  :kind,
  :payload,
  :source_sequence,
  keyword_init: true
)

# Request payload for BrowserSessionEvent#list.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] after
#   @return [String, nil]
BrowserSessionEventListMatch = Struct.new(
  :browser_session_id,
  :organization_id,
  :after,
  keyword_init: true
)

# BrowserSessionMedia entity data model.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] capture_omissions
#   @return [Object, nil]
#
# @!attribute [rw] captured_at
#   @return [Object, nil]
#
# @!attribute [rw] ended_at
#   @return [Object, nil]
#
# @!attribute [rw] failure_code
#   @return [Object, nil]
#
# @!attribute [rw] files
#   @return [Array]
#
# @!attribute [rw] frames
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] partial
#   @return [Boolean]
#
# @!attribute [rw] retention_expires_at
#   @return [String]
#
# @!attribute [rw] source
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] stop_requested_at
#   @return [Object, nil]
BrowserSessionMedia = Struct.new(
  :browser_session_id,
  :capture_omissions,
  :captured_at,
  :ended_at,
  :failure_code,
  :files,
  :frames,
  :id,
  :kind,
  :partial,
  :retention_expires_at,
  :source,
  :status,
  :stop_requested_at,
  keyword_init: true
)

# Request payload for BrowserSessionMedia#load.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BrowserSessionMediaLoadMatch = Struct.new(
  :browser_session_id,
  :id,
  :organization_id,
  keyword_init: true
)

# BrowserSessionRecording entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] wait
#   @return [Boolean, nil]
BrowserSessionRecording = Struct.new(
  :id,
  :idempotency_key,
  :wait,
  keyword_init: true
)

# Request payload for BrowserSessionRecording#create.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] wait
#   @return [Boolean, nil]
BrowserSessionRecordingCreateData = Struct.new(
  :browser_session_id,
  :organization_id,
  :idempotency_key,
  :wait,
  keyword_init: true
)

# BrowserSessionScreenshot entity data model.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] wait
#   @return [Boolean, nil]
BrowserSessionScreenshot = Struct.new(
  :idempotency_key,
  :wait,
  keyword_init: true
)

# Request payload for BrowserSessionScreenshot#create.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] wait
#   @return [Boolean, nil]
BrowserSessionScreenshotCreateData = Struct.new(
  :browser_session_id,
  :organization_id,
  :idempotency_key,
  :wait,
  keyword_init: true
)

# BrowserSessionTask entity data model.
#
# @!attribute [rw] activity
#   @return [Object, nil]
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] cancel_requested_at
#   @return [Object, nil]
#
# @!attribute [rw] completed_at
#   @return [Object, nil]
#
# @!attribute [rw] control_generation
#   @return [Object, nil]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] effects_unknown
#   @return [Boolean]
#
# @!attribute [rw] failure_code
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] instruction
#   @return [String]
#
# @!attribute [rw] max_rounds
#   @return [Integer]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] model_selection
#   @return [Hash]
#
# @!attribute [rw] outcome
#   @return [Object, nil]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] started_at
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
BrowserSessionTask = Struct.new(
  :activity,
  :browser_session_id,
  :cancel_requested_at,
  :completed_at,
  :control_generation,
  :deadline_at,
  :effects_unknown,
  :failure_code,
  :id,
  :idempotency_key,
  :instruction,
  :max_rounds,
  :max_seconds,
  :model_selection,
  :outcome,
  :result,
  :started_at,
  :status,
  keyword_init: true
)

# Request payload for BrowserSessionTask#load.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BrowserSessionTaskLoadMatch = Struct.new(
  :browser_session_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for BrowserSessionTask#create.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] instruction
#   @return [String]
#
# @!attribute [rw] max_rounds
#   @return [Integer, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] outcome
#   @return [Object, nil]
BrowserSessionTaskCreateData = Struct.new(
  :browser_session_id,
  :organization_id,
  :idempotency_key,
  :instruction,
  :max_rounds,
  :max_seconds,
  :outcome,
  keyword_init: true
)

# CatalogSelector entity data model.
#
# @!attribute [rw] app
#   @return [Hash]
CatalogSelector = Struct.new(
  :app,
  keyword_init: true
)

# Request payload for CatalogSelector#list.
#
# @!attribute [rw] app_id
#   @return [String]
CatalogSelectorListMatch = Struct.new(
  :app_id,
  keyword_init: true
)

# CdnDeployment entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CdnDeployment = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnDeployment#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnDeploymentLoadMatch = Struct.new(
  :app_id,
  :cdn_id,
  :id,
  keyword_init: true
)

# Request payload for CdnDeployment#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
CdnDeploymentListMatch = Struct.new(
  :app_id,
  :cdn_id,
  keyword_init: true
)

# Request payload for CdnDeployment#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
CdnDeploymentCreateData = Struct.new(
  :app_id,
  :cdn_id,
  keyword_init: true
)

# CdnHostname entity data model.
#
# @!attribute [rw] app_cdn_distribution_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dns_status
#   @return [String]
#
# @!attribute [rw] force_ssl
#   @return [Boolean]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] provider_hostname_id
#   @return [Object]
#
# @!attribute [rw] tls_status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
CdnHostname = Struct.new(
  :app_cdn_distribution_id,
  :created_at,
  :dns_status,
  :force_ssl,
  :hostname,
  :id,
  :provider_hostname_id,
  :tls_status,
  :updated_at,
  keyword_init: true
)

# Request payload for CdnHostname#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnHostnameLoadMatch = Struct.new(
  :app_id,
  :cdn_id,
  :id,
  keyword_init: true
)

# Request payload for CdnHostname#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
CdnHostnameListMatch = Struct.new(
  :app_id,
  :cdn_id,
  keyword_init: true
)

# Request payload for CdnHostname#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] dns_status
#   @return [String, nil]
#
# @!attribute [rw] force_ssl
#   @return [Boolean, nil]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] tls_status
#   @return [String, nil]
CdnHostnameCreateData = Struct.new(
  :app_id,
  :cdn_id,
  :dns_status,
  :force_ssl,
  :hostname,
  :tls_status,
  keyword_init: true
)

# Request payload for CdnHostname#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnHostnameUpdateData = Struct.new(
  :app_id,
  :cdn_id,
  :id,
  keyword_init: true
)

# Request payload for CdnHostname#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnHostnamePatchData = Struct.new(
  :app_id,
  :cdn_id,
  :id,
  keyword_init: true
)

# Request payload for CdnHostname#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] cdn_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnHostnameRemoveMatch = Struct.new(
  :app_id,
  :cdn_id,
  :id,
  keyword_init: true
)

# CdnSpace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CdnSpace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnSpace#load.
#
# @!attribute [rw] id
#   @return [String]
CdnSpaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnSpace#list.
#
# @!attribute [rw] organization_id
#   @return [String]
CdnSpaceListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for CdnSpace#create.
#
# @!attribute [rw] organization_id
#   @return [String]
CdnSpaceCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for CdnSpace#update.
#
# @!attribute [rw] id
#   @return [String]
CdnSpaceUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnSpace#patch.
#
# @!attribute [rw] id
#   @return [String]
CdnSpacePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnSpace#remove.
#
# @!attribute [rw] id
#   @return [String]
CdnSpaceRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# CdnSpaceObject entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CdnSpaceObject = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CdnSpaceObject#load.
#
# @!attribute [rw] cdn_space_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnSpaceObjectLoadMatch = Struct.new(
  :cdn_space_id,
  :id,
  keyword_init: true
)

# Request payload for CdnSpaceObject#list.
#
# @!attribute [rw] cdn_space_id
#   @return [String]
CdnSpaceObjectListMatch = Struct.new(
  :cdn_space_id,
  keyword_init: true
)

# Request payload for CdnSpaceObject#update.
#
# @!attribute [rw] cdn_space_id
#   @return [String]
CdnSpaceObjectUpdateData = Struct.new(
  :cdn_space_id,
  keyword_init: true
)

# Request payload for CdnSpaceObject#remove.
#
# @!attribute [rw] cdn_space_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CdnSpaceObjectRemoveMatch = Struct.new(
  :cdn_space_id,
  :id,
  keyword_init: true
)

# ConnectionRequest entity data model.
#
# @!attribute [rw] agent_card_url
#   @return [String]
#
# @!attribute [rw] auth_scheme
#   @return [String]
#
# @!attribute [rw] can_configure
#   @return [Boolean]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean]
#
# @!attribute [rw] can_setup
#   @return [Boolean]
#
# @!attribute [rw] error_code
#   @return [Object]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] remote_agent
#   @return [Object]
#
# @!attribute [rw] retired_at
#   @return [Object]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] source_operation_id
#   @return [Object]
#
# @!attribute [rw] state
#   @return [String]
ConnectionRequest = Struct.new(
  :agent_card_url,
  :auth_scheme,
  :can_configure,
  :can_disconnect,
  :can_setup,
  :error_code,
  :generation,
  :id,
  :name,
  :remote_agent,
  :retired_at,
  :revoked_at,
  :source_operation_id,
  :state,
  keyword_init: true
)

# Request payload for ConnectionRequest#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ConnectionRequestLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# ConnectionSource entity data model.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] device_name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] source_operation_id
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
ConnectionSource = Struct.new(
  :device_id,
  :device_name,
  :provider,
  :source_operation_id,
  :title,
  keyword_init: true
)

# Request payload for ConnectionSource#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
ConnectionSourceListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# CoordinationWait entity data model.
#
# @!attribute [rw] can_stop
#   @return [Boolean]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] stop_state
#   @return [Object]
#
# @!attribute [rw] wake_outcome
#   @return [Object]
CoordinationWait = Struct.new(
  :can_stop,
  :expires_at,
  :id,
  :status,
  :stop_state,
  :wake_outcome,
  keyword_init: true
)

# Request payload for CoordinationWait#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] coordination_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
CoordinationWaitListMatch = Struct.new(
  :agent_id,
  :coordination_id,
  :organization_id,
  :cursor,
  keyword_init: true
)

# CredentialSignInCheck entity data model.
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
CredentialSignInCheck = Struct.new(
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :paywalled,
  :permissions,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for CredentialSignInCheck#create.
#
# @!attribute [rw] credential_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String]
CredentialSignInCheckCreateData = Struct.new(
  :credential_id,
  :organization_id,
  :project_id,
  :environment_id,
  keyword_init: true
)

# DataResourceRotateCredential entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] engine
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] high_availability
#   @return [Boolean]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] plan
#   @return [Object]
#
# @!attribute [rw] provider_metadata
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] storage_gb
#   @return [Object]
#
# @!attribute [rw] storage_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Object]
DataResourceRotateCredential = Struct.new(
  :app_environment_id,
  :created_at,
  :engine,
  :failure_message,
  :high_availability,
  :hosted_app_id,
  :id,
  :kind,
  :name,
  :plan,
  :provider_metadata,
  :region,
  :slug,
  :status,
  :storage_gb,
  :storage_label,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for DataResourceRotateCredential#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] data_resource_id
#   @return [String]
DataResourceRotateCredentialCreateData = Struct.new(
  :app_id,
  :data_resource_id,
  keyword_init: true
)

# DeepScan entity data model.
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] active
#   @return [Array]
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorations
#   @return [Array]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] launch_options
#   @return [Hash]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
DeepScan = Struct.new(
  :account_id,
  :active,
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorations,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :idempotency_key,
  :launch_options,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :pagination,
  :paywalled,
  :permissions,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for DeepScan#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_id
#   @return [String, nil]
#
# @!attribute [rw] evidence
#   @return [String, nil]
#
# @!attribute [rw] finding_id
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
DeepScanLoadMatch = Struct.new(
  :id,
  :organization_id,
  :agent_id,
  :evidence,
  :finding_id,
  :project_id,
  keyword_init: true
)

# Request payload for DeepScan#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] finding
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
DeepScanListMatch = Struct.new(
  :organization_id,
  :finding,
  :page,
  :project_id,
  :query,
  :status,
  keyword_init: true
)

# Request payload for DeepScan#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_testers
#   @return [Integer, nil]
DeepScanCreateData = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :concurrency,
  :environment_id,
  :goal,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  keyword_init: true
)

# DeepScanFinding entity data model.
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] finding_ids
#   @return [Array]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] free_findings_pending
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] priority
#   @return [Object]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] reruns_available
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] unlock
#   @return [Hash]
#
# @!attribute [rw] web_url
#   @return [String]
DeepScanFinding = Struct.new(
  :finding_count,
  :finding_ids,
  :findings,
  :findings_fix_prompt,
  :free_findings_pending,
  :id,
  :mode,
  :permissions,
  :priority,
  :priority_counts,
  :project_id,
  :reproduction_of,
  :reproductions,
  :reruns_available,
  :status,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for DeepScanFinding#list.
#
# @!attribute [rw] deep_scan_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] priority
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
DeepScanFindingListMatch = Struct.new(
  :deep_scan_id,
  :organization_id,
  :priority,
  :project_id,
  keyword_init: true
)

# DeepScanFlow entity data model.
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] exploration_id
#   @return [String, nil]
#
# @!attribute [rw] flow_names
#   @return [Array]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_testers
#   @return [Integer, nil]
#
# @!attribute [rw] note
#   @return [Object, nil]
DeepScanFlow = Struct.new(
  :account_id,
  :concurrency,
  :environment_id,
  :exploration_id,
  :flow_names,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  :note,
  keyword_init: true
)

# Request payload for DeepScanFlow#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] exploration_id
#   @return [String, nil]
#
# @!attribute [rw] flow_names
#   @return [Array]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_testers
#   @return [Integer, nil]
#
# @!attribute [rw] note
#   @return [Object, nil]
DeepScanFlowCreateData = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :concurrency,
  :environment_id,
  :exploration_id,
  :flow_names,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  :note,
  keyword_init: true
)

# DeepScanMappedFlow entity data model.
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] flow_map
#   @return [Object]
#
# @!attribute [rw] revision_id
#   @return [Object]
DeepScanMappedFlow = Struct.new(
  :account_id,
  :environment_id,
  :flow_map,
  :revision_id,
  keyword_init: true
)

# Request payload for DeepScanMappedFlow#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
DeepScanMappedFlowListMatch = Struct.new(
  :organization_id,
  :account_id,
  :environment_id,
  :project_id,
  keyword_init: true
)

# DeepScanOption entity data model.
#
# @!attribute [rw] accounts
#   @return [Array]
#
# @!attribute [rw] deep_scan_defaults
#   @return [Object, nil]
#
# @!attribute [rw] flow_map
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] personas
#   @return [Array, nil]
#
# @!attribute [rw] preview
#   @return [Boolean, nil]
#
# @!attribute [rw] target_url
#   @return [Object]
DeepScanOption = Struct.new(
  :accounts,
  :deep_scan_defaults,
  :flow_map,
  :id,
  :name,
  :personas,
  :preview,
  :target_url,
  keyword_init: true
)

# Request payload for DeepScanOption#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] environment_query
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
DeepScanOptionListMatch = Struct.new(
  :organization_id,
  :environment_query,
  :project_id,
  keyword_init: true
)

# DemoShare entity data model.
#
# @!attribute [rw] head_sha
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] recording
#   @return [Hash]
#
# @!attribute [rw] summary
#   @return [String]
DemoShare = Struct.new(
  :head_sha,
  :id,
  :recording,
  :summary,
  keyword_init: true
)

# Request payload for DemoShare#load.
#
# @!attribute [rw] id
#   @return [String]
DemoShareLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# DemoShareSegment entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
DemoShareSegment = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for DemoShareSegment#load.
#
# @!attribute [rw] demo_share_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
DemoShareSegmentLoadMatch = Struct.new(
  :demo_share_id,
  :id,
  keyword_init: true
)

# DeploymentDashboardNomad entity data model.
class DeploymentDashboardNomad
end

# Request payload for DeploymentDashboardNomad#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
DeploymentDashboardNomadLoadMatch = Struct.new(
  :app_id,
  :environment,
  :location,
  :service,
  keyword_init: true
)

# DeploymentFile entity data model.
class DeploymentFile
end

# Request payload for DeploymentFile#update.
#
# @!attribute [rw] deployment_id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
DeploymentFileUpdateData = Struct.new(
  :deployment_id,
  :static_site_id,
  keyword_init: true
)

# DomainPathRule entity data model.
#
# @!attribute [rw] action_kind
#   @return [String]
#
# @!attribute [rw] app_service_endpoint_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] backend_ref
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] path_prefix
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
DomainPathRule = Struct.new(
  :action_kind,
  :app_service_endpoint_id,
  :app_service_id,
  :backend_ref,
  :created_at,
  :id,
  :last_error,
  :path_prefix,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for DomainPathRule#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
DomainPathRuleLoadMatch = Struct.new(
  :app_id,
  :domain_id,
  :id,
  keyword_init: true
)

# Request payload for DomainPathRule#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
DomainPathRuleListMatch = Struct.new(
  :app_id,
  :domain_id,
  keyword_init: true
)

# Request payload for DomainPathRule#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
#
# @!attribute [rw] app_service_endpoint_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] path_prefix
#   @return [String]
DomainPathRuleCreateData = Struct.new(
  :app_id,
  :domain_id,
  :app_service_endpoint_id,
  :app_service_id,
  :path_prefix,
  keyword_init: true
)

# Request payload for DomainPathRule#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] app_service_endpoint_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] path_prefix
#   @return [String, nil]
DomainPathRuleUpdateData = Struct.new(
  :app_id,
  :domain_id,
  :id,
  :app_service_endpoint_id,
  :app_service_id,
  :path_prefix,
  keyword_init: true
)

# Request payload for DomainPathRule#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] app_service_endpoint_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] path_prefix
#   @return [String, nil]
DomainPathRulePatchData = Struct.new(
  :app_id,
  :domain_id,
  :id,
  :app_service_endpoint_id,
  :app_service_id,
  :path_prefix,
  keyword_init: true
)

# Request payload for DomainPathRule#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] domain_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
DomainPathRuleRemoveMatch = Struct.new(
  :app_id,
  :domain_id,
  :id,
  keyword_init: true
)

# Dream entity data model.
#
# @!attribute [rw] attention
#   @return [Boolean]
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] completed_at
#   @return [Object]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] dream
#   @return [Object]
#
# @!attribute [rw] error_code
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] phase
#   @return [String]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] reviewed
#   @return [Integer]
#
# @!attribute [rw] reviewed_date
#   @return [String]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] scope_name
#   @return [String]
#
# @!attribute [rw] skipped
#   @return [Integer]
#
# @!attribute [rw] tab
#   @return [String]
#
# @!attribute [rw] timezone
#   @return [String]
Dream = Struct.new(
  :attention,
  :changes,
  :completed_at,
  :counts,
  :dream,
  :error_code,
  :id,
  :pagination,
  :permissions,
  :phase,
  :reason,
  :reviewed,
  :reviewed_date,
  :runs,
  :scope_name,
  :skipped,
  :tab,
  :timezone,
  keyword_init: true
)

# Request payload for Dream#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] tab
#   @return [String, nil]
DreamLoadMatch = Struct.new(
  :id,
  :organization_id,
  :page,
  :project_id,
  :tab,
  keyword_init: true
)

# Request payload for Dream#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String]
DreamListMatch = Struct.new(
  :organization_id,
  :page,
  :project_id,
  keyword_init: true
)

# Request payload for Dream#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] attention
#   @return [Boolean]
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] completed_at
#   @return [Object]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] dream
#   @return [Object]
#
# @!attribute [rw] error_code
#   @return [Object]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] phase
#   @return [String]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] reviewed
#   @return [Integer]
#
# @!attribute [rw] reviewed_date
#   @return [String]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] scope_name
#   @return [String]
#
# @!attribute [rw] skipped
#   @return [Integer]
#
# @!attribute [rw] tab
#   @return [String]
#
# @!attribute [rw] timezone
#   @return [String]
DreamCreateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :attention,
  :changes,
  :completed_at,
  :counts,
  :dream,
  :error_code,
  :pagination,
  :permissions,
  :phase,
  :reason,
  :reviewed,
  :reviewed_date,
  :runs,
  :scope_name,
  :skipped,
  :tab,
  :timezone,
  keyword_init: true
)

# Environment entity data model.
#
# @!attribute [rw] active_revision_id
#   @return [Object]
#
# @!attribute [rw] agent_sign_up_available
#   @return [Boolean]
#
# @!attribute [rw] allowed_actions
#   @return [String]
#
# @!attribute [rw] billing
#   @return [Hash]
#
# @!attribute [rw] cleanup
#   @return [Array]
#
# @!attribute [rw] connection
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] default_policy
#   @return [Hash, nil]
#
# @!attribute [rw] default_policy_json
#   @return [Hash]
#
# @!attribute [rw] discovery_defaults
#   @return [Hash]
#
# @!attribute [rw] environment
#   @return [Hash]
#
# @!attribute [rw] exploration_accounts
#   @return [Array, nil]
#
# @!attribute [rw] explorations
#   @return [Array, nil]
#
# @!attribute [rw] first_run
#   @return [Object, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imessage_number
#   @return [Object]
#
# @!attribute [rw] included_deep_scan
#   @return [Boolean]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] managed_google_available
#   @return [Boolean]
#
# @!attribute [rw] managed_google_email
#   @return [String]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_connections
#   @return [Array]
#
# @!attribute [rw] onboarding_discovery
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pending_accounts
#   @return [Array, nil]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] revisions
#   @return [Array]
#
# @!attribute [rw] setup_discovery_id
#   @return [Object, nil]
#
# @!attribute [rw] sign_in_check_available
#   @return [Boolean]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] target_kind
#   @return [Object]
#
# @!attribute [rw] target_url
#   @return [Object]
#
# @!attribute [rw] test_accounts
#   @return [Hash]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verify_network_connection_id
#   @return [Object]
#
# @!attribute [rw] version
#   @return [Integer, nil]
Environment = Struct.new(
  :active_revision_id,
  :agent_sign_up_available,
  :allowed_actions,
  :billing,
  :cleanup,
  :connection,
  :created_at,
  :default_policy,
  :default_policy_json,
  :discovery_defaults,
  :environment,
  :exploration_accounts,
  :explorations,
  :first_run,
  :hosted_app_id,
  :id,
  :imessage_number,
  :included_deep_scan,
  :lock_version,
  :managed_google_available,
  :managed_google_email,
  :messaging_tester_number,
  :name,
  :network_connections,
  :onboarding_discovery,
  :organization_id,
  :pending_accounts,
  :permissions,
  :project_id,
  :repository_id,
  :revisions,
  :setup_discovery_id,
  :sign_in_check_available,
  :slug,
  :status,
  :target_kind,
  :target_url,
  :test_accounts,
  :updated_at,
  :verify_network_connection_id,
  :version,
  keyword_init: true
)

# Request payload for Environment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
EnvironmentLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for Environment#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
EnvironmentListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for Environment#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] default_policy
#   @return [Hash, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] target_kind
#   @return [Object, nil]
#
# @!attribute [rw] target_url
#   @return [Object, nil]
EnvironmentCreateData = Struct.new(
  :organization_id,
  :allowed_actions,
  :default_policy,
  :imessage_number,
  :messaging_tester_number,
  :name,
  :project_id,
  :repository_id,
  :slug,
  :target_kind,
  :target_url,
  keyword_init: true
)

# Request payload for Environment#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Environment#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] target_url
#   @return [Object, nil]
#
# @!attribute [rw] verify_network_connection_id
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
EnvironmentPatchData = Struct.new(
  :id,
  :organization_id,
  :allowed_actions,
  :imessage_number,
  :messaging_tester_number,
  :name,
  :target_url,
  :verify_network_connection_id,
  :version,
  keyword_init: true
)

# Request payload for Environment#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# EnvironmentDiscoveryRun entity data model.
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] environment_revision_id
#   @return [String]
#
# @!attribute [rw] evidence
#   @return [Array, nil]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] queued_at
#   @return [String]
#
# @!attribute [rw] recording
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
EnvironmentDiscoveryRun = Struct.new(
  :account_id,
  :deadline_at,
  :environment_revision_id,
  :evidence,
  :failure_code,
  :id,
  :queued_at,
  :recording,
  :result,
  :status,
  keyword_init: true
)

# Request payload for EnvironmentDiscoveryRun#load.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentDiscoveryRunLoadMatch = Struct.new(
  :environment_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for EnvironmentDiscoveryRun#create.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [Object, nil]
EnvironmentDiscoveryRunCreateData = Struct.new(
  :environment_id,
  :organization_id,
  :account_id,
  keyword_init: true
)

# EnvironmentExploration entity data model.
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] persona_id
#   @return [Object, nil]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
EnvironmentExploration = Struct.new(
  :account_id,
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :paywalled,
  :permissions,
  :persona_id,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for EnvironmentExploration#create.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_testers
#   @return [Integer, nil]
#
# @!attribute [rw] persona_id
#   @return [Object, nil]
EnvironmentExplorationCreateData = Struct.new(
  :environment_id,
  :organization_id,
  :project_id,
  :account_id,
  :concurrency,
  :goal,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  :persona_id,
  keyword_init: true
)

# EnvironmentFirstRun entity data model.
class EnvironmentFirstRun
end

# Request payload for EnvironmentFirstRun#create.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentFirstRunCreateData = Struct.new(
  :environment_id,
  :organization_id,
  keyword_init: true
)

# EnvironmentRevision entity data model.
#
# @!attribute [rw] allowed_origins
#   @return [Array]
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_release_id
#   @return [Object]
#
# @!attribute [rw] blueprint
#   @return [Hash]
#
# @!attribute [rw] blueprint_json
#   @return [Hash]
#
# @!attribute [rw] cleanup_state
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] digest
#   @return [String]
#
# @!attribute [rw] dry_run
#   @return [Boolean, nil]
#
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] ready_at
#   @return [Object]
#
# @!attribute [rw] resolved_manifest_json
#   @return [Hash]
#
# @!attribute [rw] retention_policy_json
#   @return [Hash]
#
# @!attribute [rw] revision
#   @return [Integer]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] runner_environment_revision_id
#   @return [Object]
#
# @!attribute [rw] safety_policy_json
#   @return [Hash]
#
# @!attribute [rw] schema_version
#   @return [Integer]
#
# @!attribute [rw] source_metadata
#   @return [Hash, nil]
#
# @!attribute [rw] source_metadata_json
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] validation_json
#   @return [Hash]
#
# @!attribute [rw] verify_environment_id
#   @return [String]
EnvironmentRevision = Struct.new(
  :allowed_origins,
  :app_environment_id,
  :app_release_id,
  :blueprint,
  :blueprint_json,
  :cleanup_state,
  :created_at,
  :digest,
  :dry_run,
  :expires_at,
  :id,
  :organization_id,
  :ready_at,
  :resolved_manifest_json,
  :retention_policy_json,
  :revision,
  :revoked_at,
  :runner_environment_revision_id,
  :safety_policy_json,
  :schema_version,
  :source_metadata,
  :source_metadata_json,
  :status,
  :updated_at,
  :validation_json,
  :verify_environment_id,
  keyword_init: true
)

# Request payload for EnvironmentRevision#load.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentRevisionLoadMatch = Struct.new(
  :environment_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for EnvironmentRevision#create.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] blueprint
#   @return [Hash]
#
# @!attribute [rw] dry_run
#   @return [Boolean, nil]
#
# @!attribute [rw] source_metadata
#   @return [Hash, nil]
EnvironmentRevisionCreateData = Struct.new(
  :environment_id,
  :organization_id,
  :blueprint,
  :dry_run,
  :source_metadata,
  keyword_init: true
)

# Request payload for EnvironmentRevision#update.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentRevisionUpdateData = Struct.new(
  :environment_id,
  :id,
  :organization_id,
  keyword_init: true
)

# EnvironmentSecretBinding entity data model.
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] secret_id
#   @return [String, nil]
#
# @!attribute [rw] secret_version_id
#   @return [String, nil]
EnvironmentSecretBinding = Struct.new(
  :env_key,
  :id,
  :mode,
  :secret_id,
  :secret_version_id,
  keyword_init: true
)

# Request payload for EnvironmentSecretBinding#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String]
EnvironmentSecretBindingListMatch = Struct.new(
  :app_id,
  :environment_id,
  keyword_init: true
)

# Request payload for EnvironmentSecretBinding#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] secret_id
#   @return [String, nil]
#
# @!attribute [rw] secret_version_id
#   @return [String, nil]
EnvironmentSecretBindingCreateData = Struct.new(
  :app_id,
  :environment_id,
  :env_key,
  :mode,
  :secret_id,
  :secret_version_id,
  keyword_init: true
)

# Request payload for EnvironmentSecretBinding#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
EnvironmentSecretBindingRemoveMatch = Struct.new(
  :app_id,
  :environment_id,
  :id,
  keyword_init: true
)

# EnvironmentTestAccount entity data model.
#
# @!attribute [rw] configured
#   @return [Boolean]
#
# @!attribute [rw] credentials
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] persona
#   @return [String]
#
# @!attribute [rw] revision_id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] tenant
#   @return [String]
EnvironmentTestAccount = Struct.new(
  :configured,
  :credentials,
  :id,
  :persona,
  :revision_id,
  :role,
  :tenant,
  keyword_init: true
)

# Request payload for EnvironmentTestAccount#list.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentTestAccountListMatch = Struct.new(
  :environment_id,
  :organization_id,
  keyword_init: true
)

# Request payload for EnvironmentTestAccount#update.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
EnvironmentTestAccountUpdateData = Struct.new(
  :environment_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for EnvironmentTestAccount#patch.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] credentials
#   @return [Array, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
EnvironmentTestAccountPatchData = Struct.new(
  :environment_id,
  :id,
  :organization_id,
  :credentials,
  :revision_id,
  keyword_init: true
)

# Evidence entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Evidence = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Evidence#load.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_id
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] exploration_id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] scenario_run_id
#   @return [String, nil]
EvidenceLoadMatch = Struct.new(
  :id,
  :organization_id,
  :agent_id,
  :cursor,
  :exploration_id,
  :kind,
  :limit,
  :repository_id,
  :scenario_run_id,
  keyword_init: true
)

# Exploration entity data model.
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] active
#   @return [Array]
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorations
#   @return [Array]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] launch_options
#   @return [Hash]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] persona_id
#   @return [Object, nil]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
Exploration = Struct.new(
  :account_id,
  :active,
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorations,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :idempotency_key,
  :launch_options,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :pagination,
  :paywalled,
  :permissions,
  :persona_id,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for Exploration#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_id
#   @return [String, nil]
#
# @!attribute [rw] evidence
#   @return [String, nil]
#
# @!attribute [rw] finding_id
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ExplorationLoadMatch = Struct.new(
  :id,
  :organization_id,
  :agent_id,
  :evidence,
  :finding_id,
  :project_id,
  keyword_init: true
)

# Request payload for Exploration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] launch
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ExplorationListMatch = Struct.new(
  :organization_id,
  :launch,
  :page,
  :project_id,
  keyword_init: true
)

# Request payload for Exploration#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] account_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_testers
#   @return [Integer, nil]
#
# @!attribute [rw] persona_id
#   @return [Object, nil]
ExplorationCreateData = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :concurrency,
  :environment_id,
  :goal,
  :idempotency_key,
  :max_seconds,
  :max_testers,
  :persona_id,
  keyword_init: true
)

# ExplorationMessage entity data model.
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
ExplorationMessage = Struct.new(
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :paywalled,
  :permissions,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :text,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for ExplorationMessage#create.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
ExplorationMessageCreateData = Struct.new(
  :exploration_id,
  :organization_id,
  :project_id,
  :text,
  keyword_init: true
)

# ExplorationReport entity data model.
class ExplorationReport
end

# Request payload for ExplorationReport#load.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ExplorationReportLoadMatch = Struct.new(
  :exploration_id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ExplorationReport#create.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] source_ids
#   @return [Object, nil]
ExplorationReportCreateData = Struct.new(
  :exploration_id,
  :organization_id,
  :project_id,
  :source_ids,
  keyword_init: true
)

# ExplorationScenario entity data model.
#
# @!attribute [rw] agent_filters
#   @return [Hash]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_continue
#   @return [Boolean, nil]
#
# @!attribute [rw] chat_messages
#   @return [Array, nil]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] covered_areas
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deadline_at
#   @return [String]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] ended_early
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] explorer_activity
#   @return [Hash]
#
# @!attribute [rw] finding_count
#   @return [Integer]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] findings_fix_prompt
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] huntable_flows
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] max_testers
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_scan_improvements
#   @return [Array]
#
# @!attribute [rw] observed_at
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Boolean]
#
# @!attribute [rw] paywalled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] priority_counts
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] reproduction_of
#   @return [Object]
#
# @!attribute [rw] reproductions
#   @return [Array]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scannable_flows
#   @return [Array]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] sign_in_needs_answer
#   @return [Boolean]
#
# @!attribute [rw] sign_in_outcome
#   @return [String]
#
# @!attribute [rw] sign_in_question
#   @return [Object, nil]
#
# @!attribute [rw] startup_retryable
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] time_limit_reached
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unlock
#   @return [Object]
#
# @!attribute [rw] web_url
#   @return [String]
ExplorationScenario = Struct.new(
  :agent_filters,
  :agents,
  :can_continue,
  :chat_messages,
  :concurrency,
  :covered_areas,
  :created_at,
  :deadline_at,
  :demo_project,
  :ended_early,
  :environment_id,
  :environment_name,
  :explorer_activity,
  :finding_count,
  :findings,
  :findings_fix_prompt,
  :finished_at,
  :goal,
  :huntable_flows,
  :id,
  :max_seconds,
  :max_testers,
  :mode,
  :next_scan_improvements,
  :observed_at,
  :onboarding,
  :paywalled,
  :permissions,
  :priority_counts,
  :project_id,
  :related_explorations,
  :report,
  :reproduction_of,
  :reproductions,
  :saves_scenarios,
  :scannable_flows,
  :scenario_generation,
  :sign_in_needs_answer,
  :sign_in_outcome,
  :sign_in_question,
  :startup_retryable,
  :status,
  :time_limit_reached,
  :title,
  :unlock,
  :web_url,
  keyword_init: true
)

# Request payload for ExplorationScenario#create.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ExplorationScenarioCreateData = Struct.new(
  :exploration_id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Finding entity data model.
#
# @!attribute [rw] confidence
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deferred_until
#   @return [Object, nil]
#
# @!attribute [rw] finding
#   @return [Hash]
#
# @!attribute [rw] fingerprint
#   @return [String]
#
# @!attribute [rw] first_seen_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_seen_at
#   @return [String]
#
# @!attribute [rw] locked
#   @return [Boolean]
#
# @!attribute [rw] occurrence_count
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] reported_occurrence
#   @return [Object]
#
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] safe_summary
#   @return [String]
#
# @!attribute [rw] scenario_occurrences
#   @return [Array, nil]
#
# @!attribute [rw] severity
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verification
#   @return [Object]
Finding = Struct.new(
  :confidence,
  :created_at,
  :deferred_until,
  :finding,
  :fingerprint,
  :first_seen_at,
  :id,
  :last_seen_at,
  :locked,
  :occurrence_count,
  :organization_id,
  :permissions,
  :reason,
  :reported_occurrence,
  :repository_id,
  :safe_summary,
  :scenario_occurrences,
  :severity,
  :status,
  :title,
  :updated_at,
  :verification,
  keyword_init: true
)

# Request payload for Finding#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
FindingLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repository_id,
  keyword_init: true
)

# Request payload for Finding#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
FindingListMatch = Struct.new(
  :organization_id,
  :status,
  keyword_init: true
)

# Request payload for Finding#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
FindingUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Finding#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] deferred_until
#   @return [Object, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
FindingPatchData = Struct.new(
  :id,
  :organization_id,
  :repository_id,
  :deferred_until,
  :reason,
  :status,
  keyword_init: true
)

# GithubConnection entity data model.
#
# @!attribute [rw] accounts
#   @return [Array]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] installations
#   @return [Array]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] replace
#   @return [Boolean, nil]
#
# @!attribute [rw] repositories
#   @return [Array]
GithubConnection = Struct.new(
  :accounts,
  :github_app_installation_id,
  :installations,
  :project_id,
  :replace,
  :repositories,
  keyword_init: true
)

# Request payload for GithubConnection#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
GithubConnectionListMatch = Struct.new(
  :organization_id,
  :github_app_installation_id,
  :project_id,
  keyword_init: true
)

# Request payload for GithubConnection#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] replace
#   @return [Boolean, nil]
#
# @!attribute [rw] repositories
#   @return [Array]
GithubConnectionCreateData = Struct.new(
  :organization_id,
  :github_app_installation_id,
  :project_id,
  :replace,
  :repositories,
  keyword_init: true
)

# HostingAppDomain entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] certificate
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dns_mode
#   @return [String]
#
# @!attribute [rw] dns_status
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] last_checked_at
#   @return [Object]
#
# @!attribute [rw] path_rules
#   @return [Array]
#
# @!attribute [rw] record_name
#   @return [Object]
#
# @!attribute [rw] record_type
#   @return [Object]
#
# @!attribute [rw] record_value
#   @return [Object]
#
# @!attribute [rw] redirect_to
#   @return [Object]
#
# @!attribute [rw] static_site_id
#   @return [Object]
#
# @!attribute [rw] target_kind
#   @return [String]
#
# @!attribute [rw] tls_status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verification_record
#   @return [Object]
#
# @!attribute [rw] verification_status
#   @return [String]
HostingAppDomain = Struct.new(
  :app_environment_id,
  :app_service_id,
  :certificate,
  :created_at,
  :dns_mode,
  :dns_status,
  :failure_message,
  :hosted_app_id,
  :hostname,
  :id,
  :kind,
  :last_checked_at,
  :path_rules,
  :record_name,
  :record_type,
  :record_value,
  :redirect_to,
  :static_site_id,
  :target_kind,
  :tls_status,
  :updated_at,
  :verification_record,
  :verification_status,
  keyword_init: true
)

# Request payload for HostingAppDomain#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
HostingAppDomainLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for HostingAppDomain#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
HostingAppDomainListMatch = Struct.new(
  :app_id,
  :app_environment_id,
  keyword_init: true
)

# Request payload for HostingAppDomain#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] dns_status
#   @return [String, nil]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] redirect_to
#   @return [Object, nil]
#
# @!attribute [rw] tls_status
#   @return [String, nil]
HostingAppDomainCreateData = Struct.new(
  :app_id,
  :app_environment_id,
  :app_service_id,
  :dns_status,
  :hostname,
  :kind,
  :redirect_to,
  :tls_status,
  keyword_init: true
)

# Request payload for HostingAppDomain#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
HostingAppDomainUpdateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for HostingAppDomain#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
HostingAppDomainPatchData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# Request payload for HostingAppDomain#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
HostingAppDomainRemoveMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# ImageRepository entity data model.
#
# @!attribute [rw] auth_configured
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider_kind
#   @return [String]
#
# @!attribute [rw] registry_auth_token
#   @return [String, nil]
#
# @!attribute [rw] repository_path
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] visibility
#   @return [String]
ImageRepository = Struct.new(
  :auth_configured,
  :created_at,
  :created_at_label,
  :hosted_app_id,
  :id,
  :name,
  :organization_id,
  :provider_kind,
  :registry_auth_token,
  :repository_path,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  :visibility,
  keyword_init: true
)

# Request payload for ImageRepository#list.
#
# @!attribute [rw] organization_id
#   @return [String]
ImageRepositoryListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for ImageRepository#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] hosted_app_id
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider_kind
#   @return [String, nil]
#
# @!attribute [rw] registry_auth_token
#   @return [String, nil]
#
# @!attribute [rw] repository_path
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
ImageRepositoryCreateData = Struct.new(
  :organization_id,
  :hosted_app_id,
  :name,
  :provider_kind,
  :registry_auth_token,
  :repository_path,
  :slug,
  :status,
  :visibility,
  keyword_init: true
)

# Integration entity data model.
#
# @!attribute [rw] github
#   @return [Hash]
#
# @!attribute [rw] gitlab
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] slack
#   @return [Hash]
Integration = Struct.new(
  :github,
  :gitlab,
  :permissions,
  :slack,
  keyword_init: true
)

# Request payload for Integration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
IntegrationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# InteractionResponse entity data model.
#
# @!attribute [rw] answer
#   @return [Hash]
#
# @!attribute [rw] conversation_id
#   @return [String]
#
# @!attribute [rw] expected_revision
#   @return [Integer]
InteractionResponse = Struct.new(
  :answer,
  :conversation_id,
  :expected_revision,
  keyword_init: true
)

# Request payload for InteractionResponse#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] interaction_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] answer
#   @return [Hash]
#
# @!attribute [rw] conversation_id
#   @return [String]
#
# @!attribute [rw] expected_revision
#   @return [Integer]
InteractionResponseCreateData = Struct.new(
  :agent_id,
  :interaction_id,
  :organization_id,
  :answer,
  :conversation_id,
  :expected_revision,
  keyword_init: true
)

# Invitation entity data model.
#
# @!attribute [rw] accepted_at
#   @return [Object]
#
# @!attribute [rw] accepted_by_user
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] email_delivery_status
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] expires_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] invite_url
#   @return [Object]
#
# @!attribute [rw] invited_by_user
#   @return [Object]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
Invitation = Struct.new(
  :accepted_at,
  :accepted_by_user,
  :created_at,
  :created_at_label,
  :email,
  :email_delivery_status,
  :expires_at,
  :expires_at_label,
  :id,
  :invite_url,
  :invited_by_user,
  :organization,
  :revoked_at,
  :role,
  :status,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for Invitation#list.
#
# @!attribute [rw] organization_id
#   @return [String]
InvitationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Invitation#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
InvitationCreateData = Struct.new(
  :organization_id,
  :email,
  :role,
  keyword_init: true
)

# Request payload for Invitation#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
InvitationRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# JourneyVariantReplay entity data model.
#
# @!attribute [rw] actor_id
#   @return [Object]
#
# @!attribute [rw] can_request_qualification
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] preparation_receipt
#   @return [Object]
#
# @!attribute [rw] qualification
#   @return [Object]
#
# @!attribute [rw] qualification_status
#   @return [String]
#
# @!attribute [rw] replay_required
#   @return [Boolean]
#
# @!attribute [rw] review_reason
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [Object]
#
# @!attribute [rw] scenario_file
#   @return [Hash]
#
# @!attribute [rw] scenario_run_id
#   @return [Object]
#
# @!attribute [rw] source_digest
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] variant_id
#   @return [String]
JourneyVariantReplay = Struct.new(
  :actor_id,
  :can_request_qualification,
  :created_at,
  :failure_code,
  :failure_message,
  :id,
  :idempotency_key,
  :max_seconds,
  :preparation_receipt,
  :qualification,
  :qualification_status,
  :replay_required,
  :review_reason,
  :run_id,
  :scenario_file,
  :scenario_run_id,
  :source_digest,
  :status,
  :updated_at,
  :variant_id,
  keyword_init: true
)

# Request payload for JourneyVariantReplay#create.
#
# @!attribute [rw] journey_variant_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] actor_id
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] review_reason
#   @return [String]
#
# @!attribute [rw] scenario_file
#   @return [Hash]
JourneyVariantReplayCreateData = Struct.new(
  :journey_variant_id,
  :organization_id,
  :project_id,
  :actor_id,
  :idempotency_key,
  :max_seconds,
  :review_reason,
  :scenario_file,
  keyword_init: true
)

# Knowledge entity data model.
#
# @!attribute [rw] content_digest
#   @return [String]
#
# @!attribute [rw] content_json
#   @return [Hash]
#
# @!attribute [rw] document
#   @return [Hash]
#
# @!attribute [rw] documents
#   @return [Array]
#
# @!attribute [rw] dreaming
#   @return [Hash]
#
# @!attribute [rw] expected_digest
#   @return [String]
#
# @!attribute [rw] history
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] markdown
#   @return [String]
#
# @!attribute [rw] observed_at
#   @return [String]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] project_name
#   @return [String]
#
# @!attribute [rw] projects
#   @return [Array]
#
# @!attribute [rw] selected_project_id
#   @return [Object]
#
# @!attribute [rw] source
#   @return [Hash]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] total
#   @return [Integer]
Knowledge = Struct.new(
  :content_digest,
  :content_json,
  :document,
  :documents,
  :dreaming,
  :expected_digest,
  :history,
  :id,
  :kind,
  :markdown,
  :observed_at,
  :organization,
  :permissions,
  :project_id,
  :project_name,
  :projects,
  :selected_project_id,
  :source,
  :title,
  :total,
  keyword_init: true
)

# Request payload for Knowledge#load.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
KnowledgeLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :q,
  keyword_init: true
)

# Request payload for Knowledge#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] markdown
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
KnowledgeCreateData = Struct.new(
  :organization_id,
  :markdown,
  :project_id,
  :title,
  keyword_init: true
)

# Request payload for Knowledge#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
KnowledgeUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Knowledge#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_digest
#   @return [String, nil]
#
# @!attribute [rw] markdown
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
KnowledgePatchData = Struct.new(
  :id,
  :organization_id,
  :expected_digest,
  :markdown,
  :title,
  keyword_init: true
)

# Request payload for Knowledge#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
KnowledgeRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# LocalThreadDelivery entity data model.
#
# @!attribute [rw] decision
#   @return [String]
#
# @!attribute [rw] decision_pending
#   @return [Boolean]
#
# @!attribute [rw] delivery
#   @return [Hash]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] policy
#   @return [Hash]
#
# @!attribute [rw] recovery_message
#   @return [Object]
LocalThreadDelivery = Struct.new(
  :decision,
  :decision_pending,
  :delivery,
  :expected_version,
  :id,
  :policy,
  :recovery_message,
  keyword_init: true
)

# Request payload for LocalThreadDelivery#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] local_thread_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
LocalThreadDeliveryLoadMatch = Struct.new(
  :agent_id,
  :id,
  :local_thread_id,
  :organization_id,
  :expected_version,
  keyword_init: true
)

# Request payload for LocalThreadDelivery#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] local_thread_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] decision
#   @return [String, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
LocalThreadDeliveryUpdateData = Struct.new(
  :agent_id,
  :id,
  :local_thread_id,
  :organization_id,
  :decision,
  :expected_version,
  keyword_init: true
)

# LocalThreadOperation entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] delivery
#   @return [Hash]
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] diagnostic_code
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [Hash]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] references
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Object]
#
# @!attribute [rw] result_expired
#   @return [Boolean]
#
# @!attribute [rw] state
#   @return [String]
LocalThreadOperation = Struct.new(
  :action,
  :arguments,
  :created_at,
  :delivery,
  :device_id,
  :diagnostic_code,
  :end,
  :expires_at,
  :id,
  :key,
  :provider,
  :references,
  :result,
  :result_expired,
  :state,
  keyword_init: true
)

# Request payload for LocalThreadOperation#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] local_thread_id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
LocalThreadOperationLoadMatch = Struct.new(
  :agent_id,
  :id,
  :local_thread_id,
  :organization_id,
  keyword_init: true
)

# Request payload for LocalThreadOperation#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] local_thread_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] key
#   @return [String]
LocalThreadOperationCreateData = Struct.new(
  :agent_id,
  :local_thread_id,
  :organization_id,
  :action,
  :arguments,
  :key,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nomad_datacenter
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
Location = Struct.new(
  :code,
  :created_at,
  :id,
  :name,
  :nomad_datacenter,
  :updated_at,
  keyword_init: true
)

# Request payload for Location#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nomad_datacenter
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
LocationListMatch = Struct.new(
  :code,
  :created_at,
  :id,
  :name,
  :nomad_datacenter,
  :updated_at,
  keyword_init: true
)

# Me entity data model.
#
# @!attribute [rw] active_organization
#   @return [Object]
#
# @!attribute [rw] analytics_distinct_id
#   @return [String, nil]
#
# @!attribute [rw] analytics_internal
#   @return [Boolean]
#
# @!attribute [rw] api_base_url
#   @return [String, nil]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] app_promotion
#   @return [Hash]
#
# @!attribute [rw] commit_author_email
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] enabled_features
#   @return [Array]
#
# @!attribute [rw] github_pr_user_authorization_connected
#   @return [Boolean]
#
# @!attribute [rw] github_pr_user_authorization_login
#   @return [Object]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] impersonation
#   @return [Object]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] next_path
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Hash]
#
# @!attribute [rw] openai_sign_in_connected
#   @return [Boolean, nil]
#
# @!attribute [rw] openai_sign_in_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] organizations
#   @return [Array]
#
# @!attribute [rw] pending_organization_invitation_count
#   @return [Integer]
#
# @!attribute [rw] pending_organization_invitation_count_label
#   @return [String]
#
# @!attribute [rw] picture_url
#   @return [Object]
#
# @!attribute [rw] superadmin
#   @return [Boolean, nil]
#
# @!attribute [rw] time_zone
#   @return [Object, nil]
Me = Struct.new(
  :active_organization,
  :analytics_distinct_id,
  :analytics_internal,
  :api_base_url,
  :api_token,
  :app_promotion,
  :commit_author_email,
  :email,
  :enabled_features,
  :github_pr_user_authorization_connected,
  :github_pr_user_authorization_login,
  :github_prs_authored_by_change_author,
  :id,
  :impersonation,
  :name,
  :next_path,
  :onboarding,
  :openai_sign_in_connected,
  :openai_sign_in_enabled,
  :organizations,
  :pending_organization_invitation_count,
  :pending_organization_invitation_count_label,
  :picture_url,
  :superadmin,
  :time_zone,
  keyword_init: true
)

# Request payload for Me#load.
#
# @!attribute [rw] active_organization
#   @return [Object, nil]
#
# @!attribute [rw] analytics_distinct_id
#   @return [String, nil]
#
# @!attribute [rw] analytics_internal
#   @return [Boolean, nil]
#
# @!attribute [rw] api_base_url
#   @return [String, nil]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] app_promotion
#   @return [Hash, nil]
#
# @!attribute [rw] commit_author_email
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] enabled_features
#   @return [Array, nil]
#
# @!attribute [rw] github_pr_user_authorization_connected
#   @return [Boolean, nil]
#
# @!attribute [rw] github_pr_user_authorization_login
#   @return [Object, nil]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] impersonation
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] next_path
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Hash, nil]
#
# @!attribute [rw] openai_sign_in_connected
#   @return [Boolean, nil]
#
# @!attribute [rw] openai_sign_in_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] organizations
#   @return [Array, nil]
#
# @!attribute [rw] pending_organization_invitation_count
#   @return [Integer, nil]
#
# @!attribute [rw] pending_organization_invitation_count_label
#   @return [String, nil]
#
# @!attribute [rw] picture_url
#   @return [Object, nil]
#
# @!attribute [rw] superadmin
#   @return [Boolean, nil]
#
# @!attribute [rw] time_zone
#   @return [Object, nil]
MeLoadMatch = Struct.new(
  :active_organization,
  :analytics_distinct_id,
  :analytics_internal,
  :api_base_url,
  :api_token,
  :app_promotion,
  :commit_author_email,
  :email,
  :enabled_features,
  :github_pr_user_authorization_connected,
  :github_pr_user_authorization_login,
  :github_prs_authored_by_change_author,
  :id,
  :impersonation,
  :name,
  :next_path,
  :onboarding,
  :openai_sign_in_connected,
  :openai_sign_in_enabled,
  :organizations,
  :pending_organization_invitation_count,
  :pending_organization_invitation_count_label,
  :picture_url,
  :superadmin,
  :time_zone,
  keyword_init: true
)

# Request payload for Me#create.
#
# @!attribute [rw] action_name
#   @return [Object, nil]
#
# @!attribute [rw] confirmation
#   @return [Object, nil]
MeCreateData = Struct.new(
  :action_name,
  :confirmation,
  keyword_init: true
)

# Request payload for Me#update.
class MeUpdateData
end

# Request payload for Me#remove.
#
# @!attribute [rw] active_organization
#   @return [Object, nil]
#
# @!attribute [rw] analytics_distinct_id
#   @return [String, nil]
#
# @!attribute [rw] analytics_internal
#   @return [Boolean, nil]
#
# @!attribute [rw] api_base_url
#   @return [String, nil]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] app_promotion
#   @return [Hash, nil]
#
# @!attribute [rw] commit_author_email
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] enabled_features
#   @return [Array, nil]
#
# @!attribute [rw] github_pr_user_authorization_connected
#   @return [Boolean, nil]
#
# @!attribute [rw] github_pr_user_authorization_login
#   @return [Object, nil]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] impersonation
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] next_path
#   @return [String, nil]
#
# @!attribute [rw] onboarding
#   @return [Hash, nil]
#
# @!attribute [rw] openai_sign_in_connected
#   @return [Boolean, nil]
#
# @!attribute [rw] openai_sign_in_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] organizations
#   @return [Array, nil]
#
# @!attribute [rw] pending_organization_invitation_count
#   @return [Integer, nil]
#
# @!attribute [rw] pending_organization_invitation_count_label
#   @return [String, nil]
#
# @!attribute [rw] picture_url
#   @return [Object, nil]
#
# @!attribute [rw] superadmin
#   @return [Boolean, nil]
#
# @!attribute [rw] time_zone
#   @return [Object, nil]
MeRemoveMatch = Struct.new(
  :active_organization,
  :analytics_distinct_id,
  :analytics_internal,
  :api_base_url,
  :api_token,
  :app_promotion,
  :commit_author_email,
  :email,
  :enabled_features,
  :github_pr_user_authorization_connected,
  :github_pr_user_authorization_login,
  :github_prs_authored_by_change_author,
  :id,
  :impersonation,
  :name,
  :next_path,
  :onboarding,
  :openai_sign_in_connected,
  :openai_sign_in_enabled,
  :organizations,
  :pending_organization_invitation_count,
  :pending_organization_invitation_count_label,
  :picture_url,
  :superadmin,
  :time_zone,
  keyword_init: true
)

# MeEmail entity data model.
#
# @!attribute [rw] account
#   @return [Boolean]
#
# @!attribute [rw] can_delete
#   @return [Boolean]
#
# @!attribute [rw] can_resend_verification
#   @return [Boolean]
#
# @!attribute [rw] can_set_account
#   @return [Boolean]
#
# @!attribute [rw] can_set_commit_author
#   @return [Boolean]
#
# @!attribute [rw] commit_author
#   @return [Boolean]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] emails
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] verification_status
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
MeEmail = Struct.new(
  :account,
  :can_delete,
  :can_resend_verification,
  :can_set_account,
  :can_set_commit_author,
  :commit_author,
  :email,
  :emails,
  :id,
  :message,
  :verification_status,
  :verified,
  keyword_init: true
)

# Request payload for MeEmail#list.
#
# @!attribute [rw] account
#   @return [Boolean, nil]
#
# @!attribute [rw] can_delete
#   @return [Boolean, nil]
#
# @!attribute [rw] can_resend_verification
#   @return [Boolean, nil]
#
# @!attribute [rw] can_set_account
#   @return [Boolean, nil]
#
# @!attribute [rw] can_set_commit_author
#   @return [Boolean, nil]
#
# @!attribute [rw] commit_author
#   @return [Boolean, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] emails
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] verification_status
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
MeEmailListMatch = Struct.new(
  :account,
  :can_delete,
  :can_resend_verification,
  :can_set_account,
  :can_set_commit_author,
  :commit_author,
  :email,
  :emails,
  :id,
  :message,
  :verification_status,
  :verified,
  keyword_init: true
)

# Request payload for MeEmail#create.
#
# @!attribute [rw] email
#   @return [String]
MeEmailCreateData = Struct.new(
  :email,
  keyword_init: true
)

# Request payload for MeEmail#update.
#
# @!attribute [rw] id
#   @return [String]
MeEmailUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for MeEmail#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] account
#   @return [Boolean, nil]
#
# @!attribute [rw] commit_author
#   @return [Boolean, nil]
MeEmailPatchData = Struct.new(
  :id,
  :account,
  :commit_author,
  keyword_init: true
)

# Request payload for MeEmail#remove.
#
# @!attribute [rw] id
#   @return [String]
MeEmailRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# MeOnboarding entity data model.
class MeOnboarding
end

# Request payload for MeOnboarding#create.
#
# @!attribute [rw] step
#   @return [Object, nil]
MeOnboardingCreateData = Struct.new(
  :step,
  keyword_init: true
)

# MediaFile entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
MediaFile = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for MediaFile#load.
#
# @!attribute [rw] browser_session_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] media_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] inline
#   @return [Boolean, nil]
MediaFileLoadMatch = Struct.new(
  :browser_session_id,
  :id,
  :media_id,
  :organization_id,
  :inline,
  keyword_init: true
)

# Member entity data model.
#
# @!attribute [rw] accepted_at
#   @return [Object]
#
# @!attribute [rw] accepted_by_user
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] email_delivery_status
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] expires_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] invite_url
#   @return [Object]
#
# @!attribute [rw] invited_by_user
#   @return [Object]
#
# @!attribute [rw] is_self
#   @return [Boolean]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] user
#   @return [Hash]
Member = Struct.new(
  :accepted_at,
  :accepted_by_user,
  :created_at,
  :created_at_label,
  :email,
  :email_delivery_status,
  :expires_at,
  :expires_at_label,
  :id,
  :invite_url,
  :invited_by_user,
  :is_self,
  :organization,
  :revoked_at,
  :role,
  :status,
  :updated_at,
  :updated_at_label,
  :user,
  keyword_init: true
)

# Request payload for Member#list.
#
# @!attribute [rw] organization_id
#   @return [String]
MemberListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Member#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
MemberUpdateData = Struct.new(
  :id,
  :organization_id,
  :role,
  keyword_init: true
)

# Request payload for Member#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
MemberPatchData = Struct.new(
  :id,
  :organization_id,
  :role,
  keyword_init: true
)

# Request payload for Member#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
MemberRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Memory entity data model.
#
# @!attribute [rw] confidence
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] finding
#   @return [String]
#
# @!attribute [rw] history
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] indexed_at
#   @return [Object]
#
# @!attribute [rw] memory
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [Hash]
#
# @!attribute [rw] source
#   @return [Hash]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] workaround
#   @return [String, nil]
Memory = Struct.new(
  :confidence,
  :created_at,
  :environment_id,
  :finding,
  :history,
  :id,
  :indexed_at,
  :memory,
  :project_id,
  :response,
  :scope,
  :source,
  :tags,
  :title,
  :workaround,
  keyword_init: true
)

# Request payload for Memory#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
MemoryLoadMatch = Struct.new(
  :id,
  :organization_id,
  :environment_id,
  :project_id,
  keyword_init: true
)

# Request payload for Memory#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] include_environment
#   @return [Boolean, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
MemoryListMatch = Struct.new(
  :organization_id,
  :environment_id,
  :include_environment,
  :project_id,
  :q,
  :tag,
  keyword_init: true
)

# Request payload for Memory#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] finding
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] workaround
#   @return [String, nil]
MemoryCreateData = Struct.new(
  :organization_id,
  :environment_id,
  :finding,
  :project_id,
  :response,
  :tags,
  :title,
  :workaround,
  keyword_init: true
)

# Request payload for Memory#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
MemoryRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# MergeRequest entity data model.
#
# @!attribute [rw] available_tests
#   @return [Array]
#
# @!attribute [rw] base_sha
#   @return [String]
#
# @!attribute [rw] branch
#   @return [String, nil]
#
# @!attribute [rw] comment_url
#   @return [Object]
#
# @!attribute [rw] current_run
#   @return [Object, nil]
#
# @!attribute [rw] draft
#   @return [Boolean]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] github_repository
#   @return [Object]
#
# @!attribute [rw] github_url
#   @return [Object]
#
# @!attribute [rw] head_sha
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] preview_cleanup_ready
#   @return [Boolean]
#
# @!attribute [rw] preview_url
#   @return [Object, nil]
#
# @!attribute [rw] project
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] project_slug
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] pull_request
#   @return [Hash]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] request_label
#   @return [String]
#
# @!attribute [rw] requested_run_id
#   @return [Object]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] source_branch
#   @return [Object]
#
# @!attribute [rw] source_repository
#   @return [Object]
#
# @!attribute [rw] source_url
#   @return [Object]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] web_path
#   @return [String]
MergeRequest = Struct.new(
  :available_tests,
  :base_sha,
  :branch,
  :comment_url,
  :current_run,
  :draft,
  :findings,
  :github_repository,
  :github_url,
  :head_sha,
  :id,
  :idempotency_key,
  :number,
  :pagination,
  :permissions,
  :preview_cleanup_ready,
  :preview_url,
  :project,
  :project_id,
  :project_slug,
  :provider,
  :pull_request,
  :repository_id,
  :request_label,
  :requested_run_id,
  :runs,
  :source_branch,
  :source_repository,
  :source_url,
  :state,
  :title,
  :updated_at,
  :web_path,
  keyword_init: true
)

# Request payload for MergeRequest#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
MergeRequestLoadMatch = Struct.new(
  :id,
  :organization_id,
  :page,
  keyword_init: true
)

# Request payload for MergeRequest#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] branch
#   @return [String, nil]
#
# @!attribute [rw] head_sha
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] project_id
#   @return [Object, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
MergeRequestCreateData = Struct.new(
  :organization_id,
  :branch,
  :head_sha,
  :idempotency_key,
  :number,
  :project_id,
  :repository_id,
  keyword_init: true
)

# MessagingConversationMessage entity data model.
#
# @!attribute [rw] attachment_limit
#   @return [Integer]
#
# @!attribute [rw] attachment_max_bytes
#   @return [Integer]
#
# @!attribute [rw] client_operation_id
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] media
#   @return [Hash]
#
# @!attribute [rw] media_upload_ids
#   @return [Array, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] reply_to
#   @return [String, nil]
#
# @!attribute [rw] retry_attachment
#   @return [Boolean, nil]
#
# @!attribute [rw] send_blocked_reason
#   @return [Object]
#
# @!attribute [rw] send_disposition
#   @return [String, nil]
#
# @!attribute [rw] send_error
#   @return [Object, nil]
#
# @!attribute [rw] send_style
#   @return [Object, nil]
MessagingConversationMessage = Struct.new(
  :attachment_limit,
  :attachment_max_bytes,
  :client_operation_id,
  :content,
  :id,
  :media,
  :media_upload_ids,
  :messages,
  :reply_to,
  :retry_attachment,
  :send_blocked_reason,
  :send_disposition,
  :send_error,
  :send_style,
  keyword_init: true
)

# Request payload for MessagingConversationMessage#create.
#
# @!attribute [rw] messaging_conversation_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] client_operation_id
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] media
#   @return [Hash]
#
# @!attribute [rw] media_upload_ids
#   @return [Array, nil]
#
# @!attribute [rw] reply_to
#   @return [String, nil]
#
# @!attribute [rw] retry_attachment
#   @return [Boolean, nil]
#
# @!attribute [rw] send_style
#   @return [Object, nil]
MessagingConversationMessageCreateData = Struct.new(
  :messaging_conversation_id,
  :organization_id,
  :project_id,
  :client_operation_id,
  :content,
  :media,
  :media_upload_ids,
  :reply_to,
  :retry_attachment,
  :send_style,
  keyword_init: true
)

# MessagingConversationUpload entity data model.
#
# @!attribute [rw] attachment
#   @return [Hash]
#
# @!attribute [rw] upload_id
#   @return [String]
MessagingConversationUpload = Struct.new(
  :attachment,
  :upload_id,
  keyword_init: true
)

# Request payload for MessagingConversationUpload#create.
#
# @!attribute [rw] messaging_conversation_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
MessagingConversationUploadCreateData = Struct.new(
  :messaging_conversation_id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# MetricQuery entity data model.
class MetricQuery
end

# Request payload for MetricQuery#list.
class MetricQueryListMatch
end

# NetworkConnection entity data model.
#
# @!attribute [rw] aws_client_vpn_profile
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] device_tag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] oauth_client_id
#   @return [String, nil]
#
# @!attribute [rw] oauth_client_secret
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String]
NetworkConnection = Struct.new(
  :aws_client_vpn_profile,
  :created_at,
  :device_tag,
  :id,
  :name,
  :oauth_client_id,
  :oauth_client_secret,
  :provider,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for NetworkConnection#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] aws_client_vpn_profile
#   @return [String, nil]
#
# @!attribute [rw] device_tag
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] oauth_client_id
#   @return [String, nil]
#
# @!attribute [rw] oauth_client_secret
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
NetworkConnectionCreateData = Struct.new(
  :organization_id,
  :aws_client_vpn_profile,
  :device_tag,
  :name,
  :oauth_client_id,
  :oauth_client_secret,
  :provider,
  :status,
  keyword_init: true
)

# Request payload for NetworkConnection#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
NetworkConnectionUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for NetworkConnection#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] aws_client_vpn_profile
#   @return [String, nil]
#
# @!attribute [rw] device_tag
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] oauth_client_id
#   @return [String, nil]
#
# @!attribute [rw] oauth_client_secret
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
NetworkConnectionPatchData = Struct.new(
  :id,
  :organization_id,
  :aws_client_vpn_profile,
  :device_tag,
  :name,
  :oauth_client_id,
  :oauth_client_secret,
  :provider,
  :status,
  keyword_init: true
)

# NomadAllocation entity data model.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] client_status
#   @return [Object]
#
# @!attribute [rw] create_time
#   @return [Object]
#
# @!attribute [rw] datacenter
#   @return [Object]
#
# @!attribute [rw] desired_description
#   @return [Object]
#
# @!attribute [rw] desired_status
#   @return [Object]
#
# @!attribute [rw] fetched_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] job_id
#   @return [Object]
#
# @!attribute [rw] modify_time
#   @return [Object]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] namespace
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [Object]
#
# @!attribute [rw] node_name
#   @return [Object]
#
# @!attribute [rw] resources
#   @return [Hash]
#
# @!attribute [rw] task_group
#   @return [Object]
#
# @!attribute [rw] task_states
#   @return [Array]
#
# @!attribute [rw] verify_runner_images
#   @return [Array, nil]
NomadAllocation = Struct.new(
  :allocation_id,
  :client_status,
  :create_time,
  :datacenter,
  :desired_description,
  :desired_status,
  :fetched_at,
  :id,
  :job_id,
  :modify_time,
  :name,
  :namespace,
  :node_id,
  :node_name,
  :resources,
  :task_group,
  :task_states,
  :verify_runner_images,
  keyword_init: true
)

# Request payload for NomadAllocation#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
NomadAllocationLoadMatch = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# NomadLog entity data model.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] fetched_at
#   @return [String]
#
# @!attribute [rw] location
#   @return [Object, nil]
#
# @!attribute [rw] logs
#   @return [String]
#
# @!attribute [rw] namespace
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] task
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
NomadLog = Struct.new(
  :allocation_id,
  :environment,
  :fetched_at,
  :location,
  :logs,
  :namespace,
  :offset,
  :origin,
  :service,
  :task,
  :type,
  keyword_init: true
)

# Request payload for NomadLog#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] origin
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] task
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
NomadLogListMatch = Struct.new(
  :app_id,
  :environment,
  :location,
  :offset,
  :origin,
  :service,
  :task,
  :type,
  keyword_init: true
)

# Organization entity data model.
#
# @!attribute [rw] activated_products
#   @return [Array]
#
# @!attribute [rw] agents_only
#   @return [Boolean, nil]
#
# @!attribute [rw] can_activate_products
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean]
#
# @!attribute [rw] google_workspace_domain
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] logo_url
#   @return [Object]
#
# @!attribute [rw] member_count
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pending_invitation_count
#   @return [Integer]
#
# @!attribute [rw] personal
#   @return [Boolean]
#
# @!attribute [rw] repository_count
#   @return [Integer]
#
# @!attribute [rw] role
#   @return [Object]
#
# @!attribute [rw] sandbox_region
#   @return [String]
#
# @!attribute [rw] shared_agent_personal_accounts_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_control_providers
#   @return [Array, nil]
#
# @!attribute [rw] source_ui_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] timezone
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] verify_pr_scenario_writing_enabled
#   @return [Boolean]
Organization = Struct.new(
  :activated_products,
  :agents_only,
  :can_activate_products,
  :created_at,
  :created_at_label,
  :github_prs_authored_by_change_author,
  :google_workspace_domain,
  :id,
  :logo_url,
  :member_count,
  :name,
  :pending_invitation_count,
  :personal,
  :repository_count,
  :role,
  :sandbox_region,
  :shared_agent_personal_accounts_enabled,
  :slug,
  :source_control_providers,
  :source_ui_enabled,
  :timezone,
  :updated_at,
  :updated_at_label,
  :verify_pr_scenario_writing_enabled,
  keyword_init: true
)

# Request payload for Organization#load.
#
# @!attribute [rw] id
#   @return [String]
OrganizationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Organization#list.
#
# @!attribute [rw] activated_products
#   @return [Array, nil]
#
# @!attribute [rw] agents_only
#   @return [Boolean, nil]
#
# @!attribute [rw] can_activate_products
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_at_label
#   @return [Object, nil]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean, nil]
#
# @!attribute [rw] google_workspace_domain
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [Object, nil]
#
# @!attribute [rw] member_count
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pending_invitation_count
#   @return [Integer, nil]
#
# @!attribute [rw] personal
#   @return [Boolean, nil]
#
# @!attribute [rw] repository_count
#   @return [Integer, nil]
#
# @!attribute [rw] role
#   @return [Object, nil]
#
# @!attribute [rw] sandbox_region
#   @return [String, nil]
#
# @!attribute [rw] shared_agent_personal_accounts_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_control_providers
#   @return [Array, nil]
#
# @!attribute [rw] source_ui_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] updated_at_label
#   @return [Object, nil]
#
# @!attribute [rw] verify_pr_scenario_writing_enabled
#   @return [Boolean, nil]
OrganizationListMatch = Struct.new(
  :activated_products,
  :agents_only,
  :can_activate_products,
  :created_at,
  :created_at_label,
  :github_prs_authored_by_change_author,
  :google_workspace_domain,
  :id,
  :logo_url,
  :member_count,
  :name,
  :pending_invitation_count,
  :personal,
  :repository_count,
  :role,
  :sandbox_region,
  :shared_agent_personal_accounts_enabled,
  :slug,
  :source_control_providers,
  :source_ui_enabled,
  :timezone,
  :updated_at,
  :updated_at_label,
  :verify_pr_scenario_writing_enabled,
  keyword_init: true
)

# Request payload for Organization#create.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] timezone
#   @return [String, nil]
OrganizationCreateData = Struct.new(
  :name,
  :slug,
  :timezone,
  keyword_init: true
)

# Request payload for Organization#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean, nil]
#
# @!attribute [rw] google_workspace_domain
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] sandbox_region
#   @return [String, nil]
#
# @!attribute [rw] shared_agent_personal_accounts_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] verify_pr_scenario_writing_enabled
#   @return [Boolean, nil]
OrganizationUpdateData = Struct.new(
  :id,
  :github_prs_authored_by_change_author,
  :google_workspace_domain,
  :name,
  :sandbox_region,
  :shared_agent_personal_accounts_enabled,
  :slug,
  :timezone,
  :verify_pr_scenario_writing_enabled,
  keyword_init: true
)

# Request payload for Organization#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean, nil]
#
# @!attribute [rw] google_workspace_domain
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] sandbox_region
#   @return [String, nil]
#
# @!attribute [rw] shared_agent_personal_accounts_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] verify_pr_scenario_writing_enabled
#   @return [Boolean, nil]
OrganizationPatchData = Struct.new(
  :id,
  :github_prs_authored_by_change_author,
  :google_workspace_domain,
  :name,
  :sandbox_region,
  :shared_agent_personal_accounts_enabled,
  :slug,
  :timezone,
  :verify_pr_scenario_writing_enabled,
  keyword_init: true
)

# Page entity data model.
#
# @!attribute [rw] active_runs
#   @return [Array]
#
# @!attribute [rw] checkout_required
#   @return [Boolean]
#
# @!attribute [rw] cli_signed_in_at
#   @return [Object]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] demo_project
#   @return [Object]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] included_deep_scan
#   @return [Boolean]
#
# @!attribute [rw] onboarding_discovery
#   @return [Object, nil]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] project
#   @return [Object]
#
# @!attribute [rw] pull_request_launch_options
#   @return [Array, nil]
#
# @!attribute [rw] pull_requests
#   @return [Array, nil]
#
# @!attribute [rw] repositories
#   @return [Array]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] runs_pagination
#   @return [Hash]
#
# @!attribute [rw] suggested_app_url
#   @return [Object]
#
# @!attribute [rw] url_first_start
#   @return [Boolean]
Page = Struct.new(
  :active_runs,
  :checkout_required,
  :cli_signed_in_at,
  :counts,
  :demo_project,
  :environments,
  :included_deep_scan,
  :onboarding_discovery,
  :organization,
  :permissions,
  :project,
  :pull_request_launch_options,
  :pull_requests,
  :repositories,
  :runs,
  :runs_pagination,
  :suggested_app_url,
  :url_first_start,
  keyword_init: true
)

# Request payload for Page#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] section
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] verify_environment_id
#   @return [String, nil]
PageLoadMatch = Struct.new(
  :organization_id,
  :page,
  :project_id,
  :query,
  :section,
  :status,
  :verify_environment_id,
  keyword_init: true
)

# PageAgent entity data model.
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_edit_integration_connections
#   @return [Boolean]
#
# @!attribute [rw] creation_enabled
#   @return [Boolean]
#
# @!attribute [rw] inbox
#   @return [Object, nil]
#
# @!attribute [rw] integration_choices
#   @return [Array]
#
# @!attribute [rw] integration_choices_truncated
#   @return [Boolean]
#
# @!attribute [rw] integration_selected
#   @return [Array]
#
# @!attribute [rw] model_choices
#   @return [Array, nil]
#
# @!attribute [rw] new_configuration
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] pinned_agent
#   @return [Object]
#
# @!attribute [rw] platform_event_types
#   @return [Array]
#
# @!attribute [rw] repository_choices
#   @return [Array]
#
# @!attribute [rw] repository_choices_truncated
#   @return [Boolean]
#
# @!attribute [rw] runtime_versions
#   @return [Array, nil]
#
# @!attribute [rw] selected_agent
#   @return [Object]
#
# @!attribute [rw] selected_reference
#   @return [Object]
#
# @!attribute [rw] viewer_id
#   @return [String]
PageAgent = Struct.new(
  :agents,
  :can_edit_integration_connections,
  :creation_enabled,
  :inbox,
  :integration_choices,
  :integration_choices_truncated,
  :integration_selected,
  :model_choices,
  :new_configuration,
  :organization_id,
  :pagination,
  :pinned_agent,
  :platform_event_types,
  :repository_choices,
  :repository_choices_truncated,
  :runtime_versions,
  :selected_agent,
  :selected_reference,
  :viewer_id,
  keyword_init: true
)

# Request payload for PageAgent#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent
#   @return [String, nil]
#
# @!attribute [rw] agent_search
#   @return [String, nil]
#
# @!attribute [rw] agent_visibility
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
PageAgentLoadMatch = Struct.new(
  :organization_id,
  :agent,
  :agent_search,
  :agent_visibility,
  :cursor,
  :limit,
  keyword_init: true
)

# Request payload for PageAgent#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent
#   @return [String, nil]
#
# @!attribute [rw] agent_search
#   @return [String, nil]
#
# @!attribute [rw] agent_visibility
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] integration_search
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
PageAgentListMatch = Struct.new(
  :organization_id,
  :agent,
  :agent_search,
  :agent_visibility,
  :cursor,
  :integration_search,
  :limit,
  keyword_init: true
)

# Request payload for PageAgent#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_ids
#   @return [Object, nil]
PageAgentCreateData = Struct.new(
  :organization_id,
  :agent_ids,
  keyword_init: true
)

# PageProjectRun entity data model.
#
# @!attribute [rw] available_tests
#   @return [Array]
#
# @!attribute [rw] fix_scenario_count
#   @return [Integer]
#
# @!attribute [rw] fix_scenarios
#   @return [Array]
#
# @!attribute [rw] fixable_count
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] preparation_reason
#   @return [Object]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] run
#   @return [Hash]
#
# @!attribute [rw] scenario_runs
#   @return [Array]
#
# @!attribute [rw] selected_scenario_run
#   @return [Object]
#
# @!attribute [rw] web_path
#   @return [String]
PageProjectRun = Struct.new(
  :available_tests,
  :fix_scenario_count,
  :fix_scenarios,
  :fixable_count,
  :id,
  :pagination,
  :permissions,
  :preparation_reason,
  :project,
  :run,
  :scenario_runs,
  :selected_scenario_run,
  :web_path,
  keyword_init: true
)

# Request payload for PageProjectRun#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] browser
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
PageProjectRunLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :browser,
  :detail,
  :page,
  keyword_init: true
)

# PagesProjectCredential entity data model.
#
# @!attribute [rw] browser_authentication
#   @return [Object, nil]
#
# @!attribute [rw] composal_address
#   @return [Object]
#
# @!attribute [rw] configured
#   @return [Boolean]
#
# @!attribute [rw] credential_keys
#   @return [Hash]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] email_link_auth_origins
#   @return [Array]
#
# @!attribute [rw] has_inbox
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identity_provider
#   @return [Object]
#
# @!attribute [rw] instructions
#   @return [Object]
#
# @!attribute [rw] login_method
#   @return [String]
#
# @!attribute [rw] login_url
#   @return [String]
#
# @!attribute [rw] managed
#   @return [Boolean]
#
# @!attribute [rw] mfa_enabled
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] provider_guidance
#   @return [String]
#
# @!attribute [rw] sign_in_verified
#   @return [Boolean]
#
# @!attribute [rw] sign_in_verified_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] username
#   @return [String]
PagesProjectCredential = Struct.new(
  :browser_authentication,
  :composal_address,
  :configured,
  :credential_keys,
  :description,
  :email_link_auth_origins,
  :has_inbox,
  :id,
  :identity_provider,
  :instructions,
  :login_method,
  :login_url,
  :managed,
  :mfa_enabled,
  :name,
  :project_id,
  :provider_guidance,
  :sign_in_verified,
  :sign_in_verified_at,
  :status,
  :updated_at,
  :username,
  keyword_init: true
)

# Request payload for PagesProjectCredential#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
PagesProjectCredentialListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# PagesProjectPersona entity data model.
#
# @!attribute [rw] active_count
#   @return [Integer]
#
# @!attribute [rw] credentials
#   @return [Array]
#
# @!attribute [rw] needs_attention_count
#   @return [Integer]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] persona_states
#   @return [Hash]
#
# @!attribute [rw] personas
#   @return [Array]
#
# @!attribute [rw] project
#   @return [Hash]
PagesProjectPersona = Struct.new(
  :active_count,
  :credentials,
  :needs_attention_count,
  :permissions,
  :persona_states,
  :personas,
  :project,
  keyword_init: true
)

# Request payload for PagesProjectPersona#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
PagesProjectPersonaListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# PagesProjectRun entity data model.
#
# @!attribute [rw] environment_query
#   @return [String]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] environments_has_more
#   @return [Boolean]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] selected_environment
#   @return [Object]
PagesProjectRun = Struct.new(
  :environment_query,
  :environments,
  :environments_has_more,
  :pagination,
  :runs,
  :selected_environment,
  keyword_init: true
)

# Request payload for PagesProjectRun#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] environment_query
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] trigger
#   @return [String, nil]
PagesProjectRunListMatch = Struct.new(
  :organization_id,
  :project_id,
  :environment_id,
  :environment_query,
  :page,
  :query,
  :status,
  :trigger,
  keyword_init: true
)

# PagesProjectScenario entity data model.
#
# @!attribute [rw] base_url
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
PagesProjectScenario = Struct.new(
  :base_url,
  :id,
  :kind,
  :name,
  keyword_init: true
)

# Request payload for PagesProjectScenario#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
PagesProjectScenarioListMatch = Struct.new(
  :organization_id,
  :project_id,
  :limit,
  :sort,
  keyword_init: true
)

# PersonalAccessToken entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
PersonalAccessToken = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for PersonalAccessToken#list.
#
# @!attribute [rw] id
#   @return [String, nil]
PersonalAccessTokenListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for PersonalAccessToken#create.
class PersonalAccessTokenCreateData
end

# Request payload for PersonalAccessToken#remove.
#
# @!attribute [rw] id
#   @return [String]
PersonalAccessTokenRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# PreviewOperation entity data model.
class PreviewOperation
end

# Request payload for PreviewOperation#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_id
#   @return [String]
PreviewOperationListMatch = Struct.new(
  :app_id,
  :preview_id,
  keyword_init: true
)

# PreviewProfileSecretBinding entity data model.
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] secret_id
#   @return [String, nil]
#
# @!attribute [rw] secret_version_id
#   @return [String, nil]
PreviewProfileSecretBinding = Struct.new(
  :env_key,
  :id,
  :mode,
  :secret_id,
  :secret_version_id,
  keyword_init: true
)

# Request payload for PreviewProfileSecretBinding#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_profile_id
#   @return [String]
PreviewProfileSecretBindingListMatch = Struct.new(
  :app_id,
  :preview_profile_id,
  keyword_init: true
)

# Request payload for PreviewProfileSecretBinding#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_profile_id
#   @return [String]
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] secret_id
#   @return [String, nil]
#
# @!attribute [rw] secret_version_id
#   @return [String, nil]
PreviewProfileSecretBindingCreateData = Struct.new(
  :app_id,
  :preview_profile_id,
  :env_key,
  :mode,
  :secret_id,
  :secret_version_id,
  keyword_init: true
)

# Request payload for PreviewProfileSecretBinding#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] preview_profile_id
#   @return [String]
PreviewProfileSecretBindingRemoveMatch = Struct.new(
  :app_id,
  :id,
  :preview_profile_id,
  keyword_init: true
)

# PreviewSecret entity data model.
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
PreviewSecret = Struct.new(
  :env_key,
  :id,
  :name,
  :slug,
  :value,
  keyword_init: true
)

# Request payload for PreviewSecret#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_id
#   @return [String]
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
PreviewSecretCreateData = Struct.new(
  :app_id,
  :preview_id,
  :env_key,
  :name,
  :slug,
  :value,
  keyword_init: true
)

# Request payload for PreviewSecret#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] preview_id
#   @return [String]
PreviewSecretRemoveMatch = Struct.new(
  :app_id,
  :id,
  :preview_id,
  keyword_init: true
)

# PreviewSharingApproval entity data model.
#
# @!attribute [rw] approved_build_keys
#   @return [Array]
#
# @!attribute [rw] approved_build_secrets
#   @return [Array]
#
# @!attribute [rw] approved_default_configuration
#   @return [Array]
#
# @!attribute [rw] approved_default_secrets
#   @return [Array]
#
# @!attribute [rw] approved_source_keys
#   @return [Array]
#
# @!attribute [rw] build_keys
#   @return [Array, nil]
#
# @!attribute [rw] build_secrets
#   @return [Array, nil]
#
# @!attribute [rw] default_configuration
#   @return [Array, nil]
#
# @!attribute [rw] default_secrets
#   @return [Array, nil]
#
# @!attribute [rw] services
#   @return [Array]
#
# @!attribute [rw] snapshot_version
#   @return [Integer]
#
# @!attribute [rw] source_keys
#   @return [Array, nil]
PreviewSharingApproval = Struct.new(
  :approved_build_keys,
  :approved_build_secrets,
  :approved_default_configuration,
  :approved_default_secrets,
  :approved_source_keys,
  :build_keys,
  :build_secrets,
  :default_configuration,
  :default_secrets,
  :services,
  :snapshot_version,
  :source_keys,
  keyword_init: true
)

# Request payload for PreviewSharingApproval#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_id
#   @return [String]
PreviewSharingApprovalListMatch = Struct.new(
  :app_id,
  :preview_id,
  keyword_init: true
)

# Request payload for PreviewSharingApproval#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] preview_id
#   @return [String]
#
# @!attribute [rw] build_keys
#   @return [Array, nil]
#
# @!attribute [rw] build_secrets
#   @return [Array, nil]
#
# @!attribute [rw] default_configuration
#   @return [Array, nil]
#
# @!attribute [rw] default_secrets
#   @return [Array, nil]
#
# @!attribute [rw] snapshot_version
#   @return [Integer]
#
# @!attribute [rw] source_keys
#   @return [Array, nil]
PreviewSharingApprovalCreateData = Struct.new(
  :app_id,
  :preview_id,
  :build_keys,
  :build_secrets,
  :default_configuration,
  :default_secrets,
  :snapshot_version,
  :source_keys,
  keyword_init: true
)

# ProductMapIdentityDecision entity data model.
#
# @!attribute [rw] observations
#   @return [Array]
#
# @!attribute [rw] operation
#   @return [String]
#
# @!attribute [rw] reason
#   @return [String]
#
# @!attribute [rw] target
#   @return [Hash]
ProductMapIdentityDecision = Struct.new(
  :observations,
  :operation,
  :reason,
  :target,
  keyword_init: true
)

# Request payload for ProductMapIdentityDecision#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] observations
#   @return [Array]
#
# @!attribute [rw] operation
#   @return [String]
#
# @!attribute [rw] reason
#   @return [String]
#
# @!attribute [rw] target
#   @return [Hash]
ProductMapIdentityDecisionCreateData = Struct.new(
  :organization_id,
  :project_id,
  :observations,
  :operation,
  :reason,
  :target,
  keyword_init: true
)

# ProductMapJourney entity data model.
#
# @!attribute [rw] default_variant_id
#   @return [Object, nil]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] journey
#   @return [Hash]
#
# @!attribute [rw] next_cursor
#   @return [Object]
#
# @!attribute [rw] preview
#   @return [Object, nil]
#
# @!attribute [rw] scope
#   @return [Hash]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] tree
#   @return [Hash]
#
# @!attribute [rw] tree_loaded
#   @return [Boolean, nil]
#
# @!attribute [rw] variant_count
#   @return [Integer]
#
# @!attribute [rw] variants
#   @return [Array]
ProductMapJourney = Struct.new(
  :default_variant_id,
  :goal,
  :id,
  :journey,
  :next_cursor,
  :preview,
  :scope,
  :title,
  :tree,
  :tree_loaded,
  :variant_count,
  :variants,
  keyword_init: true
)

# Request payload for ProductMapJourney#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] after
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] include_tree
#   @return [Boolean, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] variant_id
#   @return [String, nil]
ProductMapJourneyLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :account_id,
  :after,
  :area,
  :before,
  :include_tree,
  :persona_id,
  :query,
  :revision_id,
  :since,
  :variant_id,
  keyword_init: true
)

# Request payload for ProductMapJourney#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] after
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] include_coverage
#   @return [Boolean, nil]
#
# @!attribute [rw] journey_query
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
ProductMapJourneyListMatch = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :after,
  :area,
  :before,
  :include_coverage,
  :journey_query,
  :persona_id,
  :query,
  :revision_id,
  :since,
  keyword_init: true
)

# ProductMapJourneyReplay entity data model.
#
# @!attribute [rw] actor_id
#   @return [Object]
#
# @!attribute [rw] can_request_qualification
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] preparation_receipt
#   @return [Object]
#
# @!attribute [rw] qualification
#   @return [Object]
#
# @!attribute [rw] qualification_status
#   @return [String]
#
# @!attribute [rw] replay_required
#   @return [Boolean]
#
# @!attribute [rw] review_reason
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [Object]
#
# @!attribute [rw] scenario_run_id
#   @return [Object]
#
# @!attribute [rw] source_digest
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] variant_id
#   @return [String]
ProductMapJourneyReplay = Struct.new(
  :actor_id,
  :can_request_qualification,
  :created_at,
  :failure_code,
  :failure_message,
  :id,
  :preparation_receipt,
  :qualification,
  :qualification_status,
  :replay_required,
  :review_reason,
  :run_id,
  :scenario_run_id,
  :source_digest,
  :status,
  :updated_at,
  :variant_id,
  keyword_init: true
)

# Request payload for ProductMapJourneyReplay#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProductMapJourneyReplayLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProductMapJourneyReplay#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProductMapJourneyReplayCreateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProductMapObservation entity data model.
#
# @!attribute [rw] capture
#   @return [Hash]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] evidence_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] observation_id
#   @return [String]
#
# @!attribute [rw] scope
#   @return [Hash]
#
# @!attribute [rw] state
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
ProductMapObservation = Struct.new(
  :capture,
  :events,
  :evidence_id,
  :id,
  :observation_id,
  :scope,
  :state,
  :status,
  keyword_init: true
)

# Request payload for ProductMapObservation#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
ProductMapObservationLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :account_id,
  :area,
  :before,
  :persona_id,
  :query,
  :revision_id,
  :since,
  keyword_init: true
)

# ProductMapQuestion entity data model.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] claims
#   @return [Array]
#
# @!attribute [rw] evidence_truncated
#   @return [Boolean]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] reasoning_effort
#   @return [String]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [Hash]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] state_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] unknowns
#   @return [Array]
ProductMapQuestion = Struct.new(
  :account_id,
  :area,
  :before,
  :claims,
  :evidence_truncated,
  :model,
  :persona_id,
  :query,
  :question,
  :reasoning_effort,
  :revision_id,
  :scope,
  :since,
  :state_id,
  :status,
  :unknowns,
  keyword_init: true
)

# Request payload for ProductMapQuestion#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] state_id
#   @return [String, nil]
ProductMapQuestionCreateData = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :area,
  :before,
  :persona_id,
  :query,
  :question,
  :revision_id,
  :since,
  :state_id,
  keyword_init: true
)

# ProductMapState entity data model.
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] attempts
#   @return [Array]
#
# @!attribute [rw] captured_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] incoming
#   @return [Array]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] layout
#   @return [Hash]
#
# @!attribute [rw] observation_id
#   @return [String]
#
# @!attribute [rw] omitted_controls
#   @return [Integer]
#
# @!attribute [rw] outgoing
#   @return [Array]
#
# @!attribute [rw] revision_id
#   @return [String]
#
# @!attribute [rw] scope
#   @return [Hash]
#
# @!attribute [rw] screenshot_url
#   @return [Object]
#
# @!attribute [rw] state
#   @return [Hash]
#
# @!attribute [rw] truncated
#   @return [Boolean]
#
# @!attribute [rw] url
#   @return [String]
ProductMapState = Struct.new(
  :account_id,
  :attempts,
  :captured_at,
  :id,
  :incoming,
  :labels,
  :layout,
  :observation_id,
  :omitted_controls,
  :outgoing,
  :revision_id,
  :scope,
  :screenshot_url,
  :state,
  :truncated,
  :url,
  keyword_init: true
)

# Request payload for ProductMapState#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] include_connection
#   @return [Boolean, nil]
#
# @!attribute [rw] observation_id
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
ProductMapStateLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :account_id,
  :area,
  :before,
  :include_connection,
  :observation_id,
  :persona_id,
  :query,
  :revision_id,
  :since,
  keyword_init: true
)

# Request payload for ProductMapState#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] after
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
ProductMapStateListMatch = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :after,
  :area,
  :before,
  :persona_id,
  :query,
  :revision_id,
  :since,
  keyword_init: true
)

# Project entity data model.
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] context
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] credentials
#   @return [Array]
#
# @!attribute [rw] demo
#   @return [Boolean]
#
# @!attribute [rw] documentation_urls
#   @return [Array]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] execution_mode
#   @return [String]
#
# @!attribute [rw] icon_url
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identity_provider
#   @return [Hash]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_connections
#   @return [Array]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] overview
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] personas
#   @return [Array]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] pull_request_options
#   @return [Hash]
#
# @!attribute [rw] pull_requests
#   @return [Array]
#
# @!attribute [rw] purpose
#   @return [Object]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] scenario_history
#   @return [Hash]
#
# @!attribute [rw] scenario_states
#   @return [Hash]
#
# @!attribute [rw] scenarios
#   @return [Array]
#
# @!attribute [rw] setup_required
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verifier_preferences
#   @return [Hash]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] website_url
#   @return [Object]
Project = Struct.new(
  :archived_at,
  :context,
  :created_at,
  :credentials,
  :demo,
  :documentation_urls,
  :environments,
  :execution_mode,
  :icon_url,
  :id,
  :identity_provider,
  :lock_version,
  :name,
  :network_connections,
  :organization_id,
  :overview,
  :permissions,
  :personas,
  :project,
  :pull_request_options,
  :pull_requests,
  :purpose,
  :runs,
  :scenario_history,
  :scenario_states,
  :scenarios,
  :setup_required,
  :slug,
  :updated_at,
  :verifier_preferences,
  :version,
  :website_url,
  keyword_init: true
)

# Request payload for Project#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] overview
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] scenario_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] verify_environment_id
#   @return [String, nil]
#
# @!attribute [rw] view
#   @return [String, nil]
ProjectLoadMatch = Struct.new(
  :id,
  :organization_id,
  :overview,
  :page,
  :query,
  :scenario_id,
  :status,
  :verify_environment_id,
  :view,
  keyword_init: true
)

# Request payload for Project#list.
#
# @!attribute [rw] organization_id
#   @return [String]
ProjectListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Project#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] context
#   @return [Object, nil]
#
# @!attribute [rw] documentation_urls
#   @return [Array, nil]
#
# @!attribute [rw] execution_mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] purpose
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] verifier_preferences
#   @return [Hash, nil]
#
# @!attribute [rw] website_url
#   @return [Object, nil]
ProjectCreateData = Struct.new(
  :organization_id,
  :context,
  :documentation_urls,
  :execution_mode,
  :name,
  :purpose,
  :slug,
  :verifier_preferences,
  :website_url,
  keyword_init: true
)

# Request payload for Project#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] context
#   @return [Object, nil]
#
# @!attribute [rw] documentation_urls
#   @return [Array, nil]
#
# @!attribute [rw] execution_mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] purpose
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] verifier_preferences
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
#
# @!attribute [rw] website_url
#   @return [Object, nil]
ProjectUpdateData = Struct.new(
  :id,
  :organization_id,
  :context,
  :documentation_urls,
  :execution_mode,
  :name,
  :purpose,
  :slug,
  :verifier_preferences,
  :version,
  :website_url,
  keyword_init: true
)

# Request payload for Project#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] context
#   @return [Object, nil]
#
# @!attribute [rw] documentation_urls
#   @return [Array, nil]
#
# @!attribute [rw] execution_mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] purpose
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] verifier_preferences
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
#
# @!attribute [rw] website_url
#   @return [Object, nil]
ProjectPatchData = Struct.new(
  :id,
  :organization_id,
  :context,
  :documentation_urls,
  :execution_mode,
  :name,
  :purpose,
  :slug,
  :verifier_preferences,
  :version,
  :website_url,
  keyword_init: true
)

# ProjectAndroidApk entity data model.
#
# @!attribute [rw] android
#   @return [Hash]
#
# @!attribute [rw] artifact_paths
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] ios
#   @return [Hash]
#
# @!attribute [rw] launch_command
#   @return [String, nil]
#
# @!attribute [rw] managed_binary
#   @return [Hash]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] setup_command
#   @return [String, nil]
ProjectAndroidApk = Struct.new(
  :android,
  :artifact_paths,
  :description,
  :image,
  :ios,
  :launch_command,
  :managed_binary,
  :platform,
  :provider,
  :setup_command,
  keyword_init: true
)

# Request payload for ProjectAndroidApk#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectAndroidApkCreateData = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectCodeMap entity data model.
#
# @!attribute [rw] can_scan
#   @return [Boolean]
#
# @!attribute [rw] commit_sha
#   @return [String]
#
# @!attribute [rw] configured
#   @return [Boolean]
#
# @!attribute [rw] error_code
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] revision
#   @return [Hash]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
ProjectCodeMap = Struct.new(
  :can_scan,
  :commit_sha,
  :configured,
  :error_code,
  :id,
  :name,
  :ref,
  :repository_id,
  :revision,
  :slug,
  :status,
  keyword_init: true
)

# Request payload for ProjectCodeMap#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
ProjectCodeMapListMatch = Struct.new(
  :organization_id,
  :project_id,
  :ref,
  :repository_id,
  keyword_init: true
)

# Request payload for ProjectCodeMap#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String]
ProjectCodeMapCreateData = Struct.new(
  :organization_id,
  :project_id,
  :ref,
  :repository_id,
  keyword_init: true
)

# ProjectEnvironment entity data model.
#
# @!attribute [rw] allowed_actions
#   @return [String]
#
# @!attribute [rw] allowed_origins
#   @return [Array]
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] base_url
#   @return [Object]
#
# @!attribute [rw] base_url_changeable
#   @return [Boolean]
#
# @!attribute [rw] binary
#   @return [String, nil]
#
# @!attribute [rw] conversation_only_messaging
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] desktop
#   @return [Object]
#
# @!attribute [rw] execution_mode
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imessage_number
#   @return [Object]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] messaging_conversation
#   @return [Object]
#
# @!attribute [rw] messaging_problem
#   @return [Object]
#
# @!attribute [rw] messaging_source
#   @return [Object]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] pull_request
#   @return [Object]
#
# @!attribute [rw] source_branch
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verify_network_connection_id
#   @return [Object]
#
# @!attribute [rw] version
#   @return [Integer]
ProjectEnvironment = Struct.new(
  :allowed_actions,
  :allowed_origins,
  :archived_at,
  :base_url,
  :base_url_changeable,
  :binary,
  :conversation_only_messaging,
  :created_at,
  :desktop,
  :execution_mode,
  :id,
  :imessage_number,
  :kind,
  :lock_version,
  :messaging_conversation,
  :messaging_problem,
  :messaging_source,
  :messaging_tester_number,
  :name,
  :project_id,
  :pull_request,
  :source_branch,
  :updated_at,
  :verify_network_connection_id,
  :version,
  keyword_init: true
)

# Request payload for ProjectEnvironment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectEnvironmentLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectEnvironment#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectEnvironmentListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectEnvironment#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] allowed_origins
#   @return [Array, nil]
#
# @!attribute [rw] base_url
#   @return [Object, nil]
#
# @!attribute [rw] binary
#   @return [String, nil]
#
# @!attribute [rw] desktop
#   @return [Object, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
ProjectEnvironmentCreateData = Struct.new(
  :organization_id,
  :project_id,
  :allowed_actions,
  :allowed_origins,
  :base_url,
  :binary,
  :desktop,
  :imessage_number,
  :kind,
  :messaging_tester_number,
  :name,
  keyword_init: true
)

# Request payload for ProjectEnvironment#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] allowed_origins
#   @return [Array, nil]
#
# @!attribute [rw] base_url
#   @return [Object, nil]
#
# @!attribute [rw] binary
#   @return [String, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verify_network_connection_id
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectEnvironmentUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :allowed_actions,
  :allowed_origins,
  :base_url,
  :binary,
  :imessage_number,
  :kind,
  :messaging_tester_number,
  :name,
  :verify_network_connection_id,
  :version,
  keyword_init: true
)

# Request payload for ProjectEnvironment#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] allowed_origins
#   @return [Array, nil]
#
# @!attribute [rw] base_url
#   @return [Object, nil]
#
# @!attribute [rw] binary
#   @return [String, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verify_network_connection_id
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectEnvironmentPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :allowed_actions,
  :allowed_origins,
  :base_url,
  :binary,
  :imessage_number,
  :kind,
  :messaging_tester_number,
  :name,
  :verify_network_connection_id,
  :version,
  keyword_init: true
)

# ProjectFinding entity data model.
#
# @!attribute [rw] deferred_until
#   @return [Object, nil]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_seen_at
#   @return [String]
#
# @!attribute [rw] locked
#   @return [Boolean]
#
# @!attribute [rw] severity
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] source_title
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] verification
#   @return [Object]
#
# @!attribute [rw] web_path
#   @return [String]
ProjectFinding = Struct.new(
  :deferred_until,
  :environment_name,
  :id,
  :last_seen_at,
  :locked,
  :severity,
  :source,
  :source_title,
  :status,
  :title,
  :verification,
  :web_path,
  keyword_init: true
)

# Request payload for ProjectFinding#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] priority
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] run_id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
ProjectFindingListMatch = Struct.new(
  :organization_id,
  :project_id,
  :page,
  :priority,
  :query,
  :run_id,
  :source,
  :state,
  keyword_init: true
)

# ProjectFixture entity data model.
#
# @!attribute [rw] assignments
#   @return [Array]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Array]
#
# @!attribute [rw] credentials
#   @return [Array]
#
# @!attribute [rw] environment_ids
#   @return [Array]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] fixtures
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] persona_ids
#   @return [Array]
#
# @!attribute [rw] personas
#   @return [Array]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] sha256
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ProjectFixture = Struct.new(
  :assignments,
  :byte_size,
  :content_type,
  :credential_ids,
  :credentials,
  :environment_ids,
  :environments,
  :fixtures,
  :id,
  :lock_version,
  :name,
  :pagination,
  :permissions,
  :persona_ids,
  :personas,
  :project,
  :sha256,
  :url,
  :version,
  keyword_init: true
)

# Request payload for ProjectFixture#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectFixtureLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectFixture#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_id
#   @return [String, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
ProjectFixtureListMatch = Struct.new(
  :organization_id,
  :project_id,
  :credential_id,
  :environment_id,
  :page,
  :persona_id,
  :q,
  keyword_init: true
)

# Request payload for ProjectFixture#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectFixtureCreateData = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectFixture#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Array, nil]
#
# @!attribute [rw] environment_ids
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] persona_ids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectFixtureUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :credential_ids,
  :environment_ids,
  :name,
  :persona_ids,
  :version,
  keyword_init: true
)

# Request payload for ProjectFixture#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Array, nil]
#
# @!attribute [rw] environment_ids
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] persona_ids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectFixturePatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :credential_ids,
  :environment_ids,
  :name,
  :persona_ids,
  :version,
  keyword_init: true
)

# Request payload for ProjectFixture#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ProjectFixtureRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :version,
  keyword_init: true
)

# ProjectIosApp entity data model.
#
# @!attribute [rw] android
#   @return [Hash]
#
# @!attribute [rw] artifact_paths
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] ios
#   @return [Hash]
#
# @!attribute [rw] launch_command
#   @return [String, nil]
#
# @!attribute [rw] managed_binary
#   @return [Hash]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] setup_command
#   @return [String, nil]
ProjectIosApp = Struct.new(
  :android,
  :artifact_paths,
  :description,
  :image,
  :ios,
  :launch_command,
  :managed_binary,
  :platform,
  :provider,
  :setup_command,
  keyword_init: true
)

# Request payload for ProjectIosApp#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectIosAppCreateData = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectMessagingConversation entity data model.
#
# @!attribute [rw] assistant_number
#   @return [String]
#
# @!attribute [rw] attachment_limit
#   @return [Integer]
#
# @!attribute [rw] attachment_max_bytes
#   @return [Integer]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] leased
#   @return [Boolean]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] reconciled_at
#   @return [Object]
#
# @!attribute [rw] retirable
#   @return [Boolean]
#
# @!attribute [rw] seeded
#   @return [Boolean]
#
# @!attribute [rw] send_blocked_reason
#   @return [Object]
#
# @!attribute [rw] send_disposition
#   @return [String, nil]
#
# @!attribute [rw] send_error
#   @return [Object, nil]
#
# @!attribute [rw] tester_number
#   @return [String]
#
# @!attribute [rw] unknown_send
#   @return [Boolean]
#
# @!attribute [rw] verify_environment_id
#   @return [String]
ProjectMessagingConversation = Struct.new(
  :assistant_number,
  :attachment_limit,
  :attachment_max_bytes,
  :environment_name,
  :id,
  :leased,
  :messages,
  :reconciled_at,
  :retirable,
  :seeded,
  :send_blocked_reason,
  :send_disposition,
  :send_error,
  :tester_number,
  :unknown_send,
  :verify_environment_id,
  keyword_init: true
)

# Request payload for ProjectMessagingConversation#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectMessagingConversationLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectMessagingConversation#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] assistant_number
#   @return [String]
#
# @!attribute [rw] tester_number
#   @return [String]
#
# @!attribute [rw] verify_environment_id
#   @return [String]
ProjectMessagingConversationCreateData = Struct.new(
  :organization_id,
  :project_id,
  :assistant_number,
  :tester_number,
  :verify_environment_id,
  keyword_init: true
)

# Request payload for ProjectMessagingConversation#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] assistant_number
#   @return [String, nil]
#
# @!attribute [rw] tester_number
#   @return [String, nil]
ProjectMessagingConversationUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :assistant_number,
  :tester_number,
  keyword_init: true
)

# Request payload for ProjectMessagingConversation#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] assistant_number
#   @return [String, nil]
#
# @!attribute [rw] tester_number
#   @return [String, nil]
ProjectMessagingConversationPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :assistant_number,
  :tester_number,
  keyword_init: true
)

# ProjectOverviewMetric entity data model.
#
# @!attribute [rw] counts
#   @return [Hash]
ProjectOverviewMetric = Struct.new(
  :counts,
  keyword_init: true
)

# Request payload for ProjectOverviewMetric#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectOverviewMetricListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectOverviewPullRequest entity data model.
#
# @!attribute [rw] base_sha
#   @return [String]
#
# @!attribute [rw] can_verify
#   @return [Boolean]
#
# @!attribute [rw] comment_url
#   @return [Object]
#
# @!attribute [rw] draft
#   @return [Boolean]
#
# @!attribute [rw] github_repository
#   @return [Object]
#
# @!attribute [rw] github_url
#   @return [Object]
#
# @!attribute [rw] head_sha
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latest_created_at
#   @return [Object]
#
# @!attribute [rw] latest_current
#   @return [Boolean]
#
# @!attribute [rw] latest_head_sha
#   @return [Object]
#
# @!attribute [rw] latest_reason
#   @return [Object]
#
# @!attribute [rw] latest_run_id
#   @return [Object]
#
# @!attribute [rw] latest_state
#   @return [Object]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] project_slug
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] request_label
#   @return [String]
#
# @!attribute [rw] source_branch
#   @return [Object]
#
# @!attribute [rw] source_repository
#   @return [Object]
#
# @!attribute [rw] source_url
#   @return [Object]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] web_path
#   @return [String]
ProjectOverviewPullRequest = Struct.new(
  :base_sha,
  :can_verify,
  :comment_url,
  :draft,
  :github_repository,
  :github_url,
  :head_sha,
  :id,
  :latest_created_at,
  :latest_current,
  :latest_head_sha,
  :latest_reason,
  :latest_run_id,
  :latest_state,
  :number,
  :project_id,
  :project_slug,
  :provider,
  :repository_id,
  :request_label,
  :source_branch,
  :source_repository,
  :source_url,
  :state,
  :title,
  :updated_at,
  :web_path,
  keyword_init: true
)

# Request payload for ProjectOverviewPullRequest#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectOverviewPullRequestListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectProductMap entity data model.
class ProjectProductMap
end

# Request payload for ProjectProductMap#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] before
#   @return [String, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] revision_id
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
#
# @!attribute [rw] compare_revision_id
#   @return [String, nil]
#
# @!attribute [rw] after
#   @return [String, nil]
#
# @!attribute [rw] view_id
#   @return [String, nil]
ProjectProductMapLoadMatch = Struct.new(
  :organization_id,
  :project_id,
  :account_id,
  :area,
  :before,
  :persona_id,
  :query,
  :revision_id,
  :since,
  :source,
  :target,
  :compare_revision_id,
  :after,
  :view_id,
  keyword_init: true
)

# Request payload for ProjectProductMap#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectProductMapCreateData = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectRecording entity data model.
#
# @!attribute [rw] browser
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] draft
#   @return [Object]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] event_count
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] persona_id
#   @return [String]
#
# @!attribute [rw] phase
#   @return [String]
#
# @!attribute [rw] signed_in_during_recording
#   @return [Boolean]
#
# @!attribute [rw] start_path
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
ProjectRecording = Struct.new(
  :browser,
  :created_at,
  :draft,
  :environment_id,
  :error,
  :event_count,
  :id,
  :persona_id,
  :phase,
  :signed_in_during_recording,
  :start_path,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for ProjectRecording#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectRecordingLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectRecording#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] persona_id
#   @return [String]
#
# @!attribute [rw] start_path
#   @return [String, nil]
ProjectRecordingCreateData = Struct.new(
  :organization_id,
  :project_id,
  :environment_id,
  :persona_id,
  :start_path,
  keyword_init: true
)

# Request payload for ProjectRecording#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectRecordingRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectRunPlan entity data model.
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] base_url
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dependencies
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identity_probe
#   @return [Object]
#
# @!attribute [rw] kind
#   @return [Object]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nodes
#   @return [Array]
#
# @!attribute [rw] preview
#   @return [Object]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ProjectRunPlan = Struct.new(
  :archived_at,
  :base_url,
  :created_at,
  :dependencies,
  :id,
  :identity_probe,
  :kind,
  :lock_version,
  :name,
  :nodes,
  :preview,
  :project_id,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for ProjectRunPlan#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectRunPlanLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectRunPlan#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
ProjectRunPlanListMatch = Struct.new(
  :organization_id,
  :project_id,
  :page,
  keyword_init: true
)

# Request payload for ProjectRunPlan#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] dependencies
#   @return [Array]
#
# @!attribute [rw] identity_probe
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nodes
#   @return [Array]
ProjectRunPlanCreateData = Struct.new(
  :organization_id,
  :project_id,
  :dependencies,
  :identity_probe,
  :name,
  :nodes,
  keyword_init: true
)

# Request payload for ProjectRunPlan#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] dependencies
#   @return [Array, nil]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nodes
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectRunPlanUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :dependencies,
  :identity_probe,
  :name,
  :nodes,
  :version,
  keyword_init: true
)

# Request payload for ProjectRunPlan#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] dependencies
#   @return [Array, nil]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nodes
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectRunPlanPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :dependencies,
  :identity_probe,
  :name,
  :nodes,
  :version,
  keyword_init: true
)

# ProjectRunSchedule entity data model.
#
# @!attribute [rw] credential_ids
#   @return [Hash]
#
# @!attribute [rw] cron_expression
#   @return [Object, nil]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String, nil]
#
# @!attribute [rw] history
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Array]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_run_at
#   @return [String]
#
# @!attribute [rw] notification_channel
#   @return [String, nil]
#
# @!attribute [rw] scenario_count
#   @return [Integer]
#
# @!attribute [rw] selection_mode
#   @return [String]
#
# @!attribute [rw] slack_subscription_id
#   @return [Object, nil]
#
# @!attribute [rw] source_scenario_id
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] time_of_day
#   @return [String]
#
# @!attribute [rw] time_zone
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ProjectRunSchedule = Struct.new(
  :credential_ids,
  :cron_expression,
  :environment_id,
  :environment_name,
  :history,
  :id,
  :labels,
  :lock_version,
  :name,
  :next_run_at,
  :notification_channel,
  :scenario_count,
  :selection_mode,
  :slack_subscription_id,
  :source_scenario_id,
  :state,
  :time_of_day,
  :time_zone,
  :version,
  keyword_init: true
)

# Request payload for ProjectRunSchedule#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectRunScheduleLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectRunSchedule#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectRunScheduleListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for ProjectRunSchedule#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Hash]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] notification_channel
#   @return [String, nil]
#
# @!attribute [rw] selection_mode
#   @return [String]
#
# @!attribute [rw] slack_subscription_id
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] time_of_day
#   @return [String]
#
# @!attribute [rw] time_zone
#   @return [String]
ProjectRunScheduleCreateData = Struct.new(
  :organization_id,
  :project_id,
  :credential_ids,
  :environment_id,
  :labels,
  :name,
  :notification_channel,
  :selection_mode,
  :slack_subscription_id,
  :state,
  :time_of_day,
  :time_zone,
  keyword_init: true
)

# Request payload for ProjectRunSchedule#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Hash, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] notification_channel
#   @return [String, nil]
#
# @!attribute [rw] selection_mode
#   @return [String, nil]
#
# @!attribute [rw] slack_subscription_id
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] time_of_day
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectRunScheduleUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :credential_ids,
  :environment_id,
  :labels,
  :name,
  :notification_channel,
  :selection_mode,
  :slack_subscription_id,
  :state,
  :time_of_day,
  :time_zone,
  :version,
  keyword_init: true
)

# Request payload for ProjectRunSchedule#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] credential_ids
#   @return [Hash, nil]
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] notification_channel
#   @return [String, nil]
#
# @!attribute [rw] selection_mode
#   @return [String, nil]
#
# @!attribute [rw] slack_subscription_id
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] time_of_day
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ProjectRunSchedulePatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :credential_ids,
  :environment_id,
  :labels,
  :name,
  :notification_channel,
  :selection_mode,
  :slack_subscription_id,
  :state,
  :time_of_day,
  :time_zone,
  :version,
  keyword_init: true
)

# ProjectScenarioOption entity data model.
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] personas
#   @return [Array]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] scenario_states
#   @return [Hash]
#
# @!attribute [rw] scenarios
#   @return [Array]
#
# @!attribute [rw] schedule_options
#   @return [Object, nil]
#
# @!attribute [rw] schedules
#   @return [Array, nil]
ProjectScenarioOption = Struct.new(
  :environments,
  :permissions,
  :personas,
  :project,
  :scenario_states,
  :scenarios,
  :schedule_options,
  :schedules,
  keyword_init: true
)

# Request payload for ProjectScenarioOption#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectScenarioOptionListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# ProjectScenarioRow entity data model.
#
# @!attribute [rw] actor_count
#   @return [Integer]
#
# @!attribute [rw] dependency_count
#   @return [Integer]
#
# @!attribute [rw] health
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] persona_id
#   @return [String]
#
# @!attribute [rw] selectable_for_run
#   @return [Boolean]
#
# @!attribute [rw] step_count
#   @return [Integer]
ProjectScenarioRow = Struct.new(
  :actor_count,
  :dependency_count,
  :health,
  :id,
  :labels,
  :name,
  :persona_id,
  :selectable_for_run,
  :step_count,
  keyword_init: true
)

# Request payload for ProjectScenarioRow#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
ProjectScenarioRowListMatch = Struct.new(
  :organization_id,
  :project_id,
  :page,
  :sort,
  :state,
  keyword_init: true
)

# ProjectSetting entity data model.
#
# @!attribute [rw] available_messaging_environments
#   @return [Array]
#
# @!attribute [rw] messaging_conversations
#   @return [Array]
#
# @!attribute [rw] messaging_enabled
#   @return [Boolean]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] tester_numbers
#   @return [Array]
ProjectSetting = Struct.new(
  :available_messaging_environments,
  :messaging_conversations,
  :messaging_enabled,
  :permissions,
  :project,
  :tester_numbers,
  keyword_init: true
)

# Request payload for ProjectSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ProjectSettingListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# PullRequest entity data model.
#
# @!attribute [rw] available_tests
#   @return [Array]
#
# @!attribute [rw] branch
#   @return [String, nil]
#
# @!attribute [rw] cleanup_only
#   @return [Boolean, nil]
#
# @!attribute [rw] current_run
#   @return [Object, nil]
#
# @!attribute [rw] findings
#   @return [Array]
#
# @!attribute [rw] head_sha
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] imessage_number
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] preview_cleanup_ready
#   @return [Boolean]
#
# @!attribute [rw] preview_url
#   @return [Object, nil]
#
# @!attribute [rw] project
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] pull_request
#   @return [Hash]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] runs
#   @return [Array]
PullRequest = Struct.new(
  :available_tests,
  :branch,
  :cleanup_only,
  :current_run,
  :findings,
  :head_sha,
  :id,
  :idempotency_key,
  :imessage_number,
  :number,
  :pagination,
  :permissions,
  :preview_cleanup_ready,
  :preview_url,
  :project,
  :project_id,
  :pull_request,
  :repository_id,
  :runs,
  keyword_init: true
)

# Request payload for PullRequest#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
PullRequestLoadMatch = Struct.new(
  :id,
  :organization_id,
  :page,
  keyword_init: true
)

# Request payload for PullRequest#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] branch
#   @return [String, nil]
#
# @!attribute [rw] cleanup_only
#   @return [Boolean, nil]
#
# @!attribute [rw] head_sha
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] imessage_number
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] preview_url
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
PullRequestCreateData = Struct.new(
  :organization_id,
  :branch,
  :cleanup_only,
  :head_sha,
  :idempotency_key,
  :imessage_number,
  :number,
  :preview_url,
  :project_id,
  :repository_id,
  keyword_init: true
)

# Request payload for PullRequest#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
PullRequestRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# PullRequestSetting entity data model.
#
# @!attribute [rw] app_preview_profile_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] bots
#   @return [Array]
#
# @!attribute [rw] browser_options_available
#   @return [Boolean]
#
# @!attribute [rw] ci_preview
#   @return [Object]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] configured_repository
#   @return [Object]
#
# @!attribute [rw] demo_videos
#   @return [Boolean]
#
# @!attribute [rw] demo_videos_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] deployment
#   @return [Object]
#
# @!attribute [rw] deployment_environment
#   @return [String, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] environment
#   @return [String]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] github_check_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] hosting_presets
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imessage_comment_prefix
#   @return [Object]
#
# @!attribute [rw] imessage_number
#   @return [Object]
#
# @!attribute [rw] imessage_number_source
#   @return [String]
#
# @!attribute [rw] limits
#   @return [Hash]
#
# @!attribute [rw] link_pattern
#   @return [Object]
#
# @!attribute [rw] links
#   @return [Object]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] messaging_enabled
#   @return [Boolean]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object]
#
# @!attribute [rw] non_product_paths
#   @return [Array, nil]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] pr_check
#   @return [Boolean]
#
# @!attribute [rw] preview_access
#   @return [String, nil]
#
# @!attribute [rw] preview_comment_authors
#   @return [Array, nil]
#
# @!attribute [rw] preview_comment_pattern
#   @return [String, nil]
#
# @!attribute [rw] preview_comment_wildcard
#   @return [Object]
#
# @!attribute [rw] preview_profile
#   @return [Object]
#
# @!attribute [rw] preview_profiles
#   @return [Array]
#
# @!attribute [rw] previews
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] project_repositories
#   @return [Array]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] repositories
#   @return [Array]
#
# @!attribute [rw] repository
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_kind
#   @return [String]
#
# @!attribute [rw] selected_repository
#   @return [Object]
#
# @!attribute [rw] service
#   @return [Object]
#
# @!attribute [rw] settings
#   @return [Array]
#
# @!attribute [rw] setup
#   @return [Object]
#
# @!attribute [rw] setup_defaults
#   @return [Hash]
#
# @!attribute [rw] source_repository
#   @return [String]
#
# @!attribute [rw] target_mode
#   @return [String]
#
# @!attribute [rw] tester_numbers
#   @return [Array]
#
# @!attribute [rw] trigger_label
#   @return [String]
#
# @!attribute [rw] trigger_on_comment
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_label
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_push
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_ready
#   @return [Boolean, nil]
#
# @!attribute [rw] triggers
#   @return [Hash]
#
# @!attribute [rw] verify_environment_id
#   @return [String]
#
# @!attribute [rw] write_scenarios
#   @return [Boolean]
PullRequestSetting = Struct.new(
  :app_preview_profile_id,
  :app_service_id,
  :bots,
  :browser_options_available,
  :ci_preview,
  :concurrency,
  :configured_repository,
  :demo_videos,
  :demo_videos_enabled,
  :deployment,
  :deployment_environment,
  :enabled,
  :environment,
  :environments,
  :github_check_enabled,
  :hosting_presets,
  :id,
  :imessage_comment_prefix,
  :imessage_number,
  :imessage_number_source,
  :limits,
  :link_pattern,
  :links,
  :max_seconds,
  :messaging_enabled,
  :messaging_tester_number,
  :non_product_paths,
  :permissions,
  :pr_check,
  :preview_access,
  :preview_comment_authors,
  :preview_comment_pattern,
  :preview_comment_wildcard,
  :preview_profile,
  :preview_profiles,
  :previews,
  :project_id,
  :project_repositories,
  :provider,
  :repositories,
  :repository,
  :repository_id,
  :repository_kind,
  :selected_repository,
  :service,
  :settings,
  :setup,
  :setup_defaults,
  :source_repository,
  :target_mode,
  :tester_numbers,
  :trigger_label,
  :trigger_on_comment,
  :trigger_on_label,
  :trigger_on_push,
  :trigger_on_ready,
  :triggers,
  :verify_environment_id,
  :write_scenarios,
  keyword_init: true
)

# Request payload for PullRequestSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
PullRequestSettingListMatch = Struct.new(
  :organization_id,
  :project_id,
  :provider,
  :repository_id,
  keyword_init: true
)

# Request payload for PullRequestSetting#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app_preview_profile_id
#   @return [Object, nil]
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] bots
#   @return [Array]
#
# @!attribute [rw] concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] demo_videos
#   @return [Boolean]
#
# @!attribute [rw] demo_videos_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] deployment
#   @return [Object]
#
# @!attribute [rw] deployment_environment
#   @return [String, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] environment
#   @return [String]
#
# @!attribute [rw] github_check_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] imessage_comment_prefix
#   @return [Object]
#
# @!attribute [rw] imessage_number
#   @return [Object]
#
# @!attribute [rw] imessage_number_source
#   @return [String]
#
# @!attribute [rw] limits
#   @return [Hash]
#
# @!attribute [rw] link_pattern
#   @return [Object]
#
# @!attribute [rw] links
#   @return [Object]
#
# @!attribute [rw] max_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] messaging_tester_number
#   @return [Object]
#
# @!attribute [rw] non_product_paths
#   @return [Array, nil]
#
# @!attribute [rw] pr_check
#   @return [Boolean]
#
# @!attribute [rw] preview_access
#   @return [String, nil]
#
# @!attribute [rw] preview_comment_authors
#   @return [Array, nil]
#
# @!attribute [rw] preview_comment_pattern
#   @return [String, nil]
#
# @!attribute [rw] preview_comment_wildcard
#   @return [Object]
#
# @!attribute [rw] preview_profile
#   @return [Object]
#
# @!attribute [rw] previews
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] repository
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_kind
#   @return [String]
#
# @!attribute [rw] service
#   @return [Object]
#
# @!attribute [rw] target_mode
#   @return [String]
#
# @!attribute [rw] trigger_label
#   @return [String]
#
# @!attribute [rw] trigger_on_comment
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_label
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_push
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_ready
#   @return [Boolean, nil]
#
# @!attribute [rw] triggers
#   @return [Hash]
#
# @!attribute [rw] verify_environment_id
#   @return [String]
#
# @!attribute [rw] write_scenarios
#   @return [Boolean]
PullRequestSettingCreateData = Struct.new(
  :organization_id,
  :app_preview_profile_id,
  :app_service_id,
  :bots,
  :concurrency,
  :demo_videos,
  :demo_videos_enabled,
  :deployment,
  :deployment_environment,
  :enabled,
  :environment,
  :github_check_enabled,
  :imessage_comment_prefix,
  :imessage_number,
  :imessage_number_source,
  :limits,
  :link_pattern,
  :links,
  :max_seconds,
  :messaging_tester_number,
  :non_product_paths,
  :pr_check,
  :preview_access,
  :preview_comment_authors,
  :preview_comment_pattern,
  :preview_comment_wildcard,
  :preview_profile,
  :previews,
  :project_id,
  :provider,
  :repository,
  :repository_id,
  :repository_kind,
  :service,
  :target_mode,
  :trigger_label,
  :trigger_on_comment,
  :trigger_on_label,
  :trigger_on_push,
  :trigger_on_ready,
  :triggers,
  :verify_environment_id,
  :write_scenarios,
  keyword_init: true
)

# PullRequestSettingAddRepository entity data model.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] replace
#   @return [Boolean, nil]
#
# @!attribute [rw] repositories
#   @return [Array]
PullRequestSettingAddRepository = Struct.new(
  :project_id,
  :replace,
  :repositories,
  keyword_init: true
)

# Request payload for PullRequestSettingAddRepository#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] replace
#   @return [Boolean, nil]
#
# @!attribute [rw] repositories
#   @return [Array]
PullRequestSettingAddRepositoryCreateData = Struct.new(
  :organization_id,
  :project_id,
  :replace,
  :repositories,
  keyword_init: true
)

# PullRequestSettingDetectComment entity data model.
#
# @!attribute [rw] bots
#   @return [Array, nil]
#
# @!attribute [rw] deployment
#   @return [String, nil]
#
# @!attribute [rw] example_url
#   @return [String, nil]
#
# @!attribute [rw] imessage_comment_prefix
#   @return [String, nil]
#
# @!attribute [rw] imessage_number
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] link_pattern
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
#
# @!attribute [rw] request_number
#   @return [Integer, nil]
PullRequestSettingDetectComment = Struct.new(
  :bots,
  :deployment,
  :example_url,
  :imessage_comment_prefix,
  :imessage_number,
  :kind,
  :link_pattern,
  :project_id,
  :provider,
  :repository_id,
  :request_number,
  keyword_init: true
)

# Request payload for PullRequestSettingDetectComment#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String, nil]
PullRequestSettingDetectCommentCreateData = Struct.new(
  :organization_id,
  :project_id,
  :repository_id,
  keyword_init: true
)

# Recorder entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
Recorder = Struct.new(
  :id,
  :name,
  :slug,
  keyword_init: true
)

# Request payload for Recorder#load.
#
# @!attribute [rw] organization_id
#   @return [String]
RecorderLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Registry entity data model.
class Registry
end

# Request payload for Registry#load.
class RegistryLoadMatch
end

# RegistryV2 entity data model.
class RegistryV2
end

# Request payload for RegistryV2#create.
class RegistryV2CreateData
end

# RelayAgentLocalThread entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RelayAgentLocalThread = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RelayAgentLocalThread#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
RelayAgentLocalThreadRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# ReportReplay entity data model.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] generated_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] recording
#   @return [Hash]
#
# @!attribute [rw] replay_steps
#   @return [Array]
ReportReplay = Struct.new(
  :agent_id,
  :generated_at,
  :id,
  :recording,
  :replay_steps,
  keyword_init: true
)

# Request payload for ReportReplay#load.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] generated_at
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ReportReplayLoadMatch = Struct.new(
  :exploration_id,
  :id,
  :organization_id,
  :generated_at,
  :project_id,
  keyword_init: true
)

# ReportScenario entity data model.
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] goal
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] related_explorations
#   @return [Array]
#
# @!attribute [rw] report
#   @return [Hash]
#
# @!attribute [rw] saves_scenarios
#   @return [Boolean]
#
# @!attribute [rw] scenario_generation
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
ReportScenario = Struct.new(
  :environment_name,
  :goal,
  :id,
  :mode,
  :permissions,
  :project_id,
  :related_explorations,
  :report,
  :saves_scenarios,
  :scenario_generation,
  :status,
  keyword_init: true
)

# Request payload for ReportScenario#create.
#
# @!attribute [rw] exploration_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
ReportScenarioCreateData = Struct.new(
  :exploration_id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# RunScenarioRun entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RunScenarioRun = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RunScenarioRun#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunScenarioRunLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :run_id,
  keyword_init: true
)

# Request payload for RunScenarioRun#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
#
# @!attribute [rw] outcomes
#   @return [Object, nil]
#
# @!attribute [rw] steps
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Object, nil]
RunScenarioRunUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :run_id,
  :outcomes,
  :steps,
  :version,
  keyword_init: true
)

# RunScheduleOption entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
RunScheduleOption = Struct.new(
  :id,
  :name,
  keyword_init: true
)

# Request payload for RunScheduleOption#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
RunScheduleOptionListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# RunSearch entity data model.
#
# @!attribute [rw] runs
#   @return [Array]
RunSearch = Struct.new(
  :runs,
  keyword_init: true
)

# Request payload for RunSearch#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] query
#   @return [String, nil]
RunSearchLoadMatch = Struct.new(
  :organization_id,
  :query,
  keyword_init: true
)

# RunUpdate entity data model.
#
# @!attribute [rw] base_sha
#   @return [String]
#
# @!attribute [rw] can_verify
#   @return [Boolean]
#
# @!attribute [rw] comment_url
#   @return [Object]
#
# @!attribute [rw] draft
#   @return [Boolean]
#
# @!attribute [rw] github_repository
#   @return [Object]
#
# @!attribute [rw] github_url
#   @return [Object]
#
# @!attribute [rw] head_sha
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latest_created_at
#   @return [Object]
#
# @!attribute [rw] latest_current
#   @return [Boolean]
#
# @!attribute [rw] latest_head_sha
#   @return [Object]
#
# @!attribute [rw] latest_reason
#   @return [Object]
#
# @!attribute [rw] latest_run_id
#   @return [Object]
#
# @!attribute [rw] latest_state
#   @return [Object]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] project_id
#   @return [Object]
#
# @!attribute [rw] project_slug
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] request_label
#   @return [String]
#
# @!attribute [rw] source_branch
#   @return [Object]
#
# @!attribute [rw] source_repository
#   @return [Object]
#
# @!attribute [rw] source_url
#   @return [Object]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] web_path
#   @return [String]
RunUpdate = Struct.new(
  :base_sha,
  :can_verify,
  :comment_url,
  :draft,
  :github_repository,
  :github_url,
  :head_sha,
  :id,
  :latest_created_at,
  :latest_current,
  :latest_head_sha,
  :latest_reason,
  :latest_run_id,
  :latest_state,
  :number,
  :project_id,
  :project_slug,
  :provider,
  :repository_id,
  :request_label,
  :source_branch,
  :source_repository,
  :source_url,
  :state,
  :title,
  :updated_at,
  :web_path,
  keyword_init: true
)

# Request payload for RunUpdate#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] verify_environment_id
#   @return [String, nil]
RunUpdateListMatch = Struct.new(
  :organization_id,
  :page,
  :query,
  :status,
  :verify_environment_id,
  keyword_init: true
)

# ScenarioRevision entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] batch
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] user
#   @return [Object]
#
# @!attribute [rw] version
#   @return [Integer]
ScenarioRevision = Struct.new(
  :action,
  :batch,
  :created_at,
  :definition,
  :id,
  :source,
  :user,
  :version,
  keyword_init: true
)

# Request payload for ScenarioRevision#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] scenario_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
ScenarioRevisionListMatch = Struct.new(
  :organization_id,
  :project_id,
  :scenario_id,
  :page,
  keyword_init: true
)

# ScenarioRunLesson entity data model.
#
# @!attribute [rw] finding
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] workaround
#   @return [String]
ScenarioRunLesson = Struct.new(
  :finding,
  :title,
  :workaround,
  keyword_init: true
)

# Request payload for ScenarioRunLesson#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
#
# @!attribute [rw] scenario_run_id
#   @return [String]
#
# @!attribute [rw] finding
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] workaround
#   @return [String]
ScenarioRunLessonCreateData = Struct.new(
  :organization_id,
  :project_id,
  :run_id,
  :scenario_run_id,
  :finding,
  :title,
  :workaround,
  keyword_init: true
)

# ScenarioRunScenarioEdit entity data model.
class ScenarioRunScenarioEdit
end

# Request payload for ScenarioRunScenarioEdit#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
#
# @!attribute [rw] scenario_run_id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [Object, nil]
#
# @!attribute [rw] outcomes
#   @return [Object, nil]
#
# @!attribute [rw] prompt
#   @return [Object, nil]
#
# @!attribute [rw] steps
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Object, nil]
#
# @!attribute [rw] viewer_time_zone
#   @return [Object, nil]
ScenarioRunScenarioEditCreateData = Struct.new(
  :organization_id,
  :project_id,
  :run_id,
  :scenario_run_id,
  :idempotency_key,
  :outcomes,
  :prompt,
  :steps,
  :version,
  :viewer_time_zone,
  keyword_init: true
)

# ServiceEndpoint entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ServiceEndpoint = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#load.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointLoadMatch = Struct.new(
  :app_id,
  :id,
  :service_id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#list.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointListMatch = Struct.new(
  :app_id,
  :service_id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointCreateData = Struct.new(
  :app_id,
  :service_id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#update.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointUpdateData = Struct.new(
  :app_id,
  :id,
  :service_id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#patch.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointPatchData = Struct.new(
  :app_id,
  :id,
  :service_id,
  keyword_init: true
)

# Request payload for ServiceEndpoint#remove.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] service_id
#   @return [String]
ServiceEndpointRemoveMatch = Struct.new(
  :app_id,
  :id,
  :service_id,
  keyword_init: true
)

# SitePreview entity data model.
#
# @!attribute [rw] icon_data_url
#   @return [Object]
#
# @!attribute [rw] title
#   @return [Object]
#
# @!attribute [rw] url
#   @return [String]
SitePreview = Struct.new(
  :icon_data_url,
  :title,
  :url,
  keyword_init: true
)

# Request payload for SitePreview#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
SitePreviewLoadMatch = Struct.new(
  :organization_id,
  :url,
  keyword_init: true
)

# SlackChannel entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_member
#   @return [Boolean]
#
# @!attribute [rw] is_private
#   @return [Boolean]
#
# @!attribute [rw] is_slack_connect
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] published
#   @return [Boolean]
SlackChannel = Struct.new(
  :id,
  :is_member,
  :is_private,
  :is_slack_connect,
  :name,
  :published,
  keyword_init: true
)

# Request payload for SlackChannel#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] refresh
#   @return [Boolean, nil]
SlackChannelListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :kind,
  :q,
  :refresh,
  keyword_init: true
)

# SparkAgentLocalThread entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] archived
#   @return [Boolean]
#
# @!attribute [rw] can_archive
#   @return [Boolean]
#
# @!attribute [rw] can_disconnect_relay
#   @return [Boolean, nil]
#
# @!attribute [rw] can_end
#   @return [Boolean]
#
# @!attribute [rw] can_interrupt
#   @return [Boolean]
#
# @!attribute [rw] can_send
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] delivery
#   @return [Hash]
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] device_name
#   @return [String]
#
# @!attribute [rw] diagnostic_code
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [Object]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] full_title
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] last_activity_at
#   @return [Object]
#
# @!attribute [rw] native_thread_id
#   @return [String]
#
# @!attribute [rw] parent_conversation_id
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] references
#   @return [Hash]
#
# @!attribute [rw] relay_disconnected_at
#   @return [Object, nil]
#
# @!attribute [rw] relay_participant
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Object]
#
# @!attribute [rw] result_expired
#   @return [Boolean]
#
# @!attribute [rw] result_schema
#   @return [Object, nil]
#
# @!attribute [rw] section
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] status
#   @return [Object]
#
# @!attribute [rw] task_configured
#   @return [Boolean]
#
# @!attribute [rw] thread_id
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
SparkAgentLocalThread = Struct.new(
  :action,
  :archived,
  :can_archive,
  :can_disconnect_relay,
  :can_end,
  :can_interrupt,
  :can_send,
  :created_at,
  :delivery,
  :device_id,
  :device_name,
  :diagnostic_code,
  :end,
  :expires_at,
  :full_title,
  :id,
  :key,
  :last_activity_at,
  :native_thread_id,
  :parent_conversation_id,
  :provider,
  :references,
  :relay_disconnected_at,
  :relay_participant,
  :result,
  :result_expired,
  :result_schema,
  :section,
  :state,
  :status,
  :task_configured,
  :thread_id,
  :title,
  keyword_init: true
)

# Request payload for SparkAgentLocalThread#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SparkAgentLocalThreadLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for SparkAgentLocalThread#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] result_schema
#   @return [Object, nil]
#
# @!attribute [rw] thread_id
#   @return [String]
SparkAgentLocalThreadCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :device_id,
  :key,
  :provider,
  :result_schema,
  :thread_id,
  keyword_init: true
)

# Request payload for SparkAgentLocalThread#update.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] allowed_senders
#   @return [Object, nil]
#
# @!attribute [rw] ask_first
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
#
# @!attribute [rw] reply_with_final_answer
#   @return [Object, nil]
#
# @!attribute [rw] restricted
#   @return [Object, nil]
SparkAgentLocalThreadUpdateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :allowed_senders,
  :ask_first,
  :expected_version,
  :reply_with_final_answer,
  :restricted,
  keyword_init: true
)

# StaticSite entity data model.
#
# @!attribute [rw] active_deployment_id
#   @return [Object]
#
# @!attribute [rw] cdn_hostname
#   @return [String]
#
# @!attribute [rw] cdn_url
#   @return [String]
#
# @!attribute [rw] cname_target
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] default_url
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] error_document
#   @return [Object]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] index_document
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provisioned
#   @return [Boolean]
#
# @!attribute [rw] provisioned_at
#   @return [Object]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] replication_regions
#   @return [Array]
#
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
StaticSite = Struct.new(
  :active_deployment_id,
  :cdn_hostname,
  :cdn_url,
  :cname_target,
  :created_at,
  :default_url,
  :description,
  :error_document,
  :failure_message,
  :hosted_app_id,
  :id,
  :index_document,
  :name,
  :organization_id,
  :provisioned,
  :provisioned_at,
  :region,
  :replication_regions,
  :repository_id,
  :slug,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for StaticSite#load.
#
# @!attribute [rw] id
#   @return [String]
StaticSiteLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for StaticSite#list.
#
# @!attribute [rw] organization_id
#   @return [String]
StaticSiteListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for StaticSite#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] error_document
#   @return [Object, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [Object, nil]
#
# @!attribute [rw] index_document
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] region
#   @return [Object, nil]
#
# @!attribute [rw] replication_regions
#   @return [Array, nil]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
StaticSiteCreateData = Struct.new(
  :organization_id,
  :description,
  :error_document,
  :hosted_app_id,
  :index_document,
  :name,
  :region,
  :replication_regions,
  :repository_id,
  :slug,
  keyword_init: true
)

# Request payload for StaticSite#update.
#
# @!attribute [rw] id
#   @return [String]
StaticSiteUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for StaticSite#patch.
#
# @!attribute [rw] id
#   @return [String]
StaticSitePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for StaticSite#remove.
#
# @!attribute [rw] id
#   @return [String]
StaticSiteRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# StaticSiteDeployment entity data model.
#
# @!attribute [rw] activated_at
#   @return [Object]
#
# @!attribute [rw] activated_at_label
#   @return [Object]
#
# @!attribute [rw] commit_sha
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] creator_user_id
#   @return [Object]
#
# @!attribute [rw] deploy_slug
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] file_count
#   @return [Integer]
#
# @!attribute [rw] file_count_label
#   @return [String]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] finished_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_active
#   @return [Boolean]
#
# @!attribute [rw] source_ref
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] started_at_label
#   @return [Object]
#
# @!attribute [rw] static_site_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] total_bytes
#   @return [Integer]
#
# @!attribute [rw] total_bytes_label
#   @return [String]
#
# @!attribute [rw] trigger_kind
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] uploaded_at
#   @return [Object]
#
# @!attribute [rw] uploaded_at_label
#   @return [Object]
StaticSiteDeployment = Struct.new(
  :activated_at,
  :activated_at_label,
  :commit_sha,
  :created_at,
  :created_at_label,
  :creator_user_id,
  :deploy_slug,
  :failure_message,
  :file_count,
  :file_count_label,
  :finished_at,
  :finished_at_label,
  :id,
  :is_active,
  :source_ref,
  :started_at,
  :started_at_label,
  :static_site_id,
  :status,
  :total_bytes,
  :total_bytes_label,
  :trigger_kind,
  :updated_at,
  :updated_at_label,
  :uploaded_at,
  :uploaded_at_label,
  keyword_init: true
)

# Request payload for StaticSiteDeployment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDeploymentLoadMatch = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDeployment#list.
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDeploymentListMatch = Struct.new(
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDeployment#create.
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDeploymentCreateData = Struct.new(
  :static_site_id,
  keyword_init: true
)

# StaticSiteDomain entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dns_mode
#   @return [String]
#
# @!attribute [rw] dns_status
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] last_checked_at
#   @return [Object]
#
# @!attribute [rw] record_name
#   @return [Object]
#
# @!attribute [rw] record_type
#   @return [Object]
#
# @!attribute [rw] record_value
#   @return [Object]
#
# @!attribute [rw] redirect_to
#   @return [Object]
#
# @!attribute [rw] static_site_id
#   @return [Object]
#
# @!attribute [rw] target_kind
#   @return [String]
#
# @!attribute [rw] tls_status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verification_status
#   @return [String]
StaticSiteDomain = Struct.new(
  :app_environment_id,
  :app_service_id,
  :created_at,
  :dns_mode,
  :dns_status,
  :failure_message,
  :hosted_app_id,
  :hostname,
  :id,
  :kind,
  :last_checked_at,
  :record_name,
  :record_type,
  :record_value,
  :redirect_to,
  :static_site_id,
  :target_kind,
  :tls_status,
  :updated_at,
  :verification_status,
  keyword_init: true
)

# Request payload for StaticSiteDomain#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDomainLoadMatch = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDomain#list.
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDomainListMatch = Struct.new(
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDomain#create.
#
# @!attribute [rw] static_site_id
#   @return [String]
#
# @!attribute [rw] dns_mode
#   @return [String, nil]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] redirect_to
#   @return [Object, nil]
StaticSiteDomainCreateData = Struct.new(
  :static_site_id,
  :dns_mode,
  :hostname,
  :kind,
  :redirect_to,
  keyword_init: true
)

# Request payload for StaticSiteDomain#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDomainUpdateData = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDomain#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDomainPatchData = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# Request payload for StaticSiteDomain#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
StaticSiteDomainRemoveMatch = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# SubscriptionModel entity data model.
#
# @!attribute [rw] default_reasoning
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] reasoning
#   @return [Array, nil]
#
# @!attribute [rw] speeds
#   @return [Array, nil]
SubscriptionModel = Struct.new(
  :default_reasoning,
  :id,
  :name,
  :provider,
  :reasoning,
  :speeds,
  keyword_init: true
)

# Request payload for SubscriptionModel#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [String]
SubscriptionModelListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :profile_id,
  keyword_init: true
)

# ThreadPreview entity data model.
#
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] port
#   @return [Integer]
#
# @!attribute [rw] url
#   @return [String]
ThreadPreview = Struct.new(
  :expires_at,
  :port,
  :url,
  keyword_init: true
)

# Request payload for ThreadPreview#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] thread_id
#   @return [String]
#
# @!attribute [rw] port
#   @return [Integer]
ThreadPreviewCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :thread_id,
  :port,
  keyword_init: true
)

# VerificationProjectCredential entity data model.
#
# @!attribute [rw] browser_authentication
#   @return [Object, nil]
#
# @!attribute [rw] browser_session
#   @return [String, nil]
#
# @!attribute [rw] composal_address
#   @return [Object]
#
# @!attribute [rw] composal_inbox
#   @return [Boolean, nil]
#
# @!attribute [rw] composal_inbox_user
#   @return [String, nil]
#
# @!attribute [rw] composal_managed_google
#   @return [Boolean, nil]
#
# @!attribute [rw] configured
#   @return [Boolean]
#
# @!attribute [rw] cookies
#   @return [String, nil]
#
# @!attribute [rw] credential_keys
#   @return [Hash]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] email_link_auth_origins
#   @return [Array]
#
# @!attribute [rw] has_inbox
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identity_provider
#   @return [Object]
#
# @!attribute [rw] instructions
#   @return [Object]
#
# @!attribute [rw] login_method
#   @return [String]
#
# @!attribute [rw] login_url
#   @return [String]
#
# @!attribute [rw] managed
#   @return [Boolean]
#
# @!attribute [rw] mfa_enabled
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] oidc
#   @return [Hash, nil]
#
# @!attribute [rw] passkey
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] provider_guidance
#   @return [String]
#
# @!attribute [rw] remove_browser_authentication
#   @return [Boolean, nil]
#
# @!attribute [rw] remove_totp
#   @return [Boolean, nil]
#
# @!attribute [rw] sign_in_verified
#   @return [Boolean]
#
# @!attribute [rw] sign_in_verified_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] totp_secret
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] username
#   @return [String]
VerificationProjectCredential = Struct.new(
  :browser_authentication,
  :browser_session,
  :composal_address,
  :composal_inbox,
  :composal_inbox_user,
  :composal_managed_google,
  :configured,
  :cookies,
  :credential_keys,
  :description,
  :email_link_auth_origins,
  :has_inbox,
  :id,
  :identity_provider,
  :instructions,
  :login_method,
  :login_url,
  :managed,
  :mfa_enabled,
  :name,
  :oidc,
  :passkey,
  :password,
  :project_id,
  :provider_guidance,
  :remove_browser_authentication,
  :remove_totp,
  :sign_in_verified,
  :sign_in_verified_at,
  :status,
  :totp_secret,
  :updated_at,
  :username,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectCredentialLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectCredentialListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] browser_session
#   @return [String, nil]
#
# @!attribute [rw] composal_inbox
#   @return [Boolean, nil]
#
# @!attribute [rw] composal_inbox_user
#   @return [String, nil]
#
# @!attribute [rw] composal_managed_google
#   @return [Boolean, nil]
#
# @!attribute [rw] cookies
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] email_link_auth_origins
#   @return [Array, nil]
#
# @!attribute [rw] instructions
#   @return [Object, nil]
#
# @!attribute [rw] login_method
#   @return [String]
#
# @!attribute [rw] login_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] oidc
#   @return [Hash, nil]
#
# @!attribute [rw] passkey
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] remove_browser_authentication
#   @return [Boolean, nil]
#
# @!attribute [rw] remove_totp
#   @return [Boolean, nil]
#
# @!attribute [rw] totp_secret
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
VerificationProjectCredentialCreateData = Struct.new(
  :organization_id,
  :project_id,
  :browser_session,
  :composal_inbox,
  :composal_inbox_user,
  :composal_managed_google,
  :cookies,
  :description,
  :email_link_auth_origins,
  :instructions,
  :login_method,
  :login_url,
  :name,
  :oidc,
  :passkey,
  :password,
  :remove_browser_authentication,
  :remove_totp,
  :totp_secret,
  :username,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] browser_session
#   @return [String, nil]
#
# @!attribute [rw] composal_inbox
#   @return [Boolean, nil]
#
# @!attribute [rw] composal_inbox_user
#   @return [String, nil]
#
# @!attribute [rw] composal_managed_google
#   @return [Boolean, nil]
#
# @!attribute [rw] cookies
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] email_link_auth_origins
#   @return [Array, nil]
#
# @!attribute [rw] instructions
#   @return [Object, nil]
#
# @!attribute [rw] login_method
#   @return [String, nil]
#
# @!attribute [rw] login_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] oidc
#   @return [Hash, nil]
#
# @!attribute [rw] passkey
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] remove_browser_authentication
#   @return [Boolean, nil]
#
# @!attribute [rw] remove_totp
#   @return [Boolean, nil]
#
# @!attribute [rw] totp_secret
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
VerificationProjectCredentialUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :browser_session,
  :composal_inbox,
  :composal_inbox_user,
  :composal_managed_google,
  :cookies,
  :description,
  :email_link_auth_origins,
  :instructions,
  :login_method,
  :login_url,
  :name,
  :oidc,
  :passkey,
  :password,
  :remove_browser_authentication,
  :remove_totp,
  :totp_secret,
  :username,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] browser_session
#   @return [String, nil]
#
# @!attribute [rw] composal_inbox
#   @return [Boolean, nil]
#
# @!attribute [rw] composal_inbox_user
#   @return [String, nil]
#
# @!attribute [rw] composal_managed_google
#   @return [Boolean, nil]
#
# @!attribute [rw] cookies
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] email_link_auth_origins
#   @return [Array, nil]
#
# @!attribute [rw] instructions
#   @return [Object, nil]
#
# @!attribute [rw] login_method
#   @return [String, nil]
#
# @!attribute [rw] login_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] oidc
#   @return [Hash, nil]
#
# @!attribute [rw] passkey
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] remove_browser_authentication
#   @return [Boolean, nil]
#
# @!attribute [rw] remove_totp
#   @return [Boolean, nil]
#
# @!attribute [rw] totp_secret
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
VerificationProjectCredentialPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :browser_session,
  :composal_inbox,
  :composal_inbox_user,
  :composal_managed_google,
  :cookies,
  :description,
  :email_link_auth_origins,
  :instructions,
  :login_method,
  :login_url,
  :name,
  :oidc,
  :passkey,
  :password,
  :remove_browser_authentication,
  :remove_totp,
  :totp_secret,
  :username,
  keyword_init: true
)

# Request payload for VerificationProjectCredential#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] permanent
#   @return [Boolean, nil]
VerificationProjectCredentialRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :permanent,
  keyword_init: true
)

# VerificationProjectPersona entity data model.
#
# @!attribute [rw] access_mode
#   @return [String]
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] capabilities
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] credential_id
#   @return [Object]
#
# @!attribute [rw] goals
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
VerificationProjectPersona = Struct.new(
  :access_mode,
  :archived_at,
  :capabilities,
  :created_at,
  :credential_id,
  :goals,
  :id,
  :lock_version,
  :name,
  :project_id,
  :role,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectPersonaLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectPersonaListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] access_mode
#   @return [String, nil]
#
# @!attribute [rw] capabilities
#   @return [Object, nil]
#
# @!attribute [rw] credential_id
#   @return [Object, nil]
#
# @!attribute [rw] goals
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
VerificationProjectPersonaCreateData = Struct.new(
  :organization_id,
  :project_id,
  :access_mode,
  :capabilities,
  :credential_id,
  :goals,
  :name,
  :role,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] access_mode
#   @return [String, nil]
#
# @!attribute [rw] capabilities
#   @return [Object, nil]
#
# @!attribute [rw] credential_id
#   @return [Object, nil]
#
# @!attribute [rw] goals
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
VerificationProjectPersonaUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :access_mode,
  :capabilities,
  :credential_id,
  :goals,
  :name,
  :role,
  :version,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] access_mode
#   @return [String, nil]
#
# @!attribute [rw] capabilities
#   @return [Object, nil]
#
# @!attribute [rw] credential_id
#   @return [Object, nil]
#
# @!attribute [rw] goals
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
VerificationProjectPersonaPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :access_mode,
  :capabilities,
  :credential_id,
  :goals,
  :name,
  :role,
  :version,
  keyword_init: true
)

# Request payload for VerificationProjectPersona#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectPersonaRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# VerificationProjectRun entity data model.
#
# @!attribute [rw] approved_at
#   @return [Object]
#
# @!attribute [rw] approved_digest
#   @return [Object]
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] available_tests
#   @return [Array]
#
# @!attribute [rw] can_archive
#   @return [Boolean]
#
# @!attribute [rw] can_restore
#   @return [Boolean]
#
# @!attribute [rw] can_start_another_run
#   @return [Boolean]
#
# @!attribute [rw] cleanup_state
#   @return [String]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] creator_name
#   @return [Object]
#
# @!attribute [rw] definition_mode
#   @return [String]
#
# @!attribute [rw] environment_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] outcome
#   @return [Object]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] plan_digest
#   @return [Object]
#
# @!attribute [rw] preparation_error_code
#   @return [Object]
#
# @!attribute [rw] progress
#   @return [Hash]
#
# @!attribute [rw] project
#   @return [Hash]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] pull_request
#   @return [Object]
#
# @!attribute [rw] queued_at
#   @return [Object]
#
# @!attribute [rw] run
#   @return [Hash]
#
# @!attribute [rw] run_plan_id
#   @return [Object, nil]
#
# @!attribute [rw] scenario_runs
#   @return [Array]
#
# @!attribute [rw] source_run_id
#   @return [Object]
#
# @!attribute [rw] source_versions
#   @return [Object]
#
# @!attribute [rw] start_when_prepared
#   @return [Boolean]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] target_snapshot
#   @return [Hash]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verifier_preferences_snapshot
#   @return [Hash]
#
# @!attribute [rw] web_path
#   @return [String]
VerificationProjectRun = Struct.new(
  :approved_at,
  :approved_digest,
  :archived_at,
  :available_tests,
  :can_archive,
  :can_restore,
  :can_start_another_run,
  :cleanup_state,
  :concurrency,
  :created_at,
  :creator_name,
  :definition_mode,
  :environment_id,
  :id,
  :lock_version,
  :max_seconds,
  :outcome,
  :permissions,
  :plan_digest,
  :preparation_error_code,
  :progress,
  :project,
  :project_id,
  :pull_request,
  :queued_at,
  :run,
  :run_plan_id,
  :scenario_runs,
  :source_run_id,
  :source_versions,
  :start_when_prepared,
  :state,
  :target_snapshot,
  :title,
  :updated_at,
  :verifier_preferences_snapshot,
  :web_path,
  keyword_init: true
)

# Request payload for VerificationProjectRun#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] diagnostic
#   @return [Boolean, nil]
VerificationProjectRunLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :diagnostic,
  keyword_init: true
)

# Request payload for VerificationProjectRun#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
VerificationProjectRunListMatch = Struct.new(
  :organization_id,
  :project_id,
  :page,
  :status,
  keyword_init: true
)

# Request payload for VerificationProjectRun#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] concurrency
#   @return [Integer]
#
# @!attribute [rw] environment_id
#   @return [Object]
#
# @!attribute [rw] max_seconds
#   @return [Integer]
#
# @!attribute [rw] run_plan_id
#   @return [Object, nil]
#
# @!attribute [rw] start_when_prepared
#   @return [Boolean]
#
# @!attribute [rw] digest
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] run_plan_version
#   @return [Object, nil]
#
# @!attribute [rw] scenario_files
#   @return [Object, nil]
#
# @!attribute [rw] scenario_ids
#   @return [Object, nil]
#
# @!attribute [rw] viewer_time_zone
#   @return [Object, nil]
VerificationProjectRunCreateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :concurrency,
  :environment_id,
  :max_seconds,
  :run_plan_id,
  :start_when_prepared,
  :digest,
  :idempotency_key,
  :mode,
  :run_plan_version,
  :scenario_files,
  :scenario_ids,
  :viewer_time_zone,
  keyword_init: true
)

# VerificationProjectScenario entity data model.
#
# @!attribute [rw] actors
#   @return [Hash, nil]
#
# @!attribute [rw] allowed_actions
#   @return [String]
#
# @!attribute [rw] archived_at
#   @return [Object]
#
# @!attribute [rw] cleanup
#   @return [Array, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dependencies
#   @return [Array]
#
# @!attribute [rw] fixtures
#   @return [Array, nil]
#
# @!attribute [rw] health
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] if
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array]
#
# @!attribute [rw] last_revision
#   @return [Object]
#
# @!attribute [rw] lock_version
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] on
#   @return [Object, nil]
#
# @!attribute [rw] outcomes
#   @return [Array]
#
# @!attribute [rw] persona_id
#   @return [String]
#
# @!attribute [rw] primary_actor
#   @return [Object, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] selectable_for_run
#   @return [Boolean]
#
# @!attribute [rw] starting_conditions
#   @return [Object]
#
# @!attribute [rw] steps
#   @return [Array]
#
# @!attribute [rw] triggers
#   @return [Array]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
VerificationProjectScenario = Struct.new(
  :actors,
  :allowed_actions,
  :archived_at,
  :cleanup,
  :created_at,
  :dependencies,
  :fixtures,
  :health,
  :id,
  :identity_probe,
  :if,
  :labels,
  :last_revision,
  :lock_version,
  :name,
  :on,
  :outcomes,
  :persona_id,
  :primary_actor,
  :project_id,
  :selectable_for_run,
  :starting_conditions,
  :steps,
  :triggers,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for VerificationProjectScenario#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectScenarioLoadMatch = Struct.new(
  :id,
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectScenario#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VerificationProjectScenarioListMatch = Struct.new(
  :organization_id,
  :project_id,
  keyword_init: true
)

# Request payload for VerificationProjectScenario#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] actors
#   @return [Hash, nil]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] cleanup
#   @return [Array, nil]
#
# @!attribute [rw] dependencies
#   @return [Array, nil]
#
# @!attribute [rw] fixtures
#   @return [Array, nil]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] if
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] on
#   @return [Object, nil]
#
# @!attribute [rw] outcomes
#   @return [Array, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] primary_actor
#   @return [Object, nil]
#
# @!attribute [rw] starting_conditions
#   @return [Object, nil]
#
# @!attribute [rw] steps
#   @return [Array, nil]
#
# @!attribute [rw] triggers
#   @return [Array, nil]
VerificationProjectScenarioCreateData = Struct.new(
  :organization_id,
  :project_id,
  :actors,
  :allowed_actions,
  :cleanup,
  :dependencies,
  :fixtures,
  :identity_probe,
  :if,
  :labels,
  :name,
  :on,
  :outcomes,
  :persona_id,
  :primary_actor,
  :starting_conditions,
  :steps,
  :triggers,
  keyword_init: true
)

# Request payload for VerificationProjectScenario#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] actors
#   @return [Hash, nil]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] cleanup
#   @return [Array, nil]
#
# @!attribute [rw] dependencies
#   @return [Array, nil]
#
# @!attribute [rw] fixtures
#   @return [Array, nil]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] if
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] on
#   @return [Object, nil]
#
# @!attribute [rw] outcomes
#   @return [Array, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] primary_actor
#   @return [Object, nil]
#
# @!attribute [rw] starting_conditions
#   @return [Object, nil]
#
# @!attribute [rw] steps
#   @return [Array, nil]
#
# @!attribute [rw] triggers
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
VerificationProjectScenarioUpdateData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :actors,
  :allowed_actions,
  :cleanup,
  :dependencies,
  :fixtures,
  :identity_probe,
  :if,
  :labels,
  :name,
  :on,
  :outcomes,
  :persona_id,
  :primary_actor,
  :starting_conditions,
  :steps,
  :triggers,
  :version,
  keyword_init: true
)

# Request payload for VerificationProjectScenario#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] actors
#   @return [Hash, nil]
#
# @!attribute [rw] allowed_actions
#   @return [String, nil]
#
# @!attribute [rw] cleanup
#   @return [Array, nil]
#
# @!attribute [rw] dependencies
#   @return [Array, nil]
#
# @!attribute [rw] fixtures
#   @return [Array, nil]
#
# @!attribute [rw] identity_probe
#   @return [Object, nil]
#
# @!attribute [rw] if
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] on
#   @return [Object, nil]
#
# @!attribute [rw] outcomes
#   @return [Array, nil]
#
# @!attribute [rw] persona_id
#   @return [String, nil]
#
# @!attribute [rw] primary_actor
#   @return [Object, nil]
#
# @!attribute [rw] starting_conditions
#   @return [Object, nil]
#
# @!attribute [rw] steps
#   @return [Array, nil]
#
# @!attribute [rw] triggers
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
VerificationProjectScenarioPatchData = Struct.new(
  :id,
  :organization_id,
  :project_id,
  :actors,
  :allowed_actions,
  :cleanup,
  :dependencies,
  :fixtures,
  :identity_probe,
  :if,
  :labels,
  :name,
  :on,
  :outcomes,
  :persona_id,
  :primary_actor,
  :starting_conditions,
  :steps,
  :triggers,
  :version,
  keyword_init: true
)

# VerifyAppDomain entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
VerifyAppDomain = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for VerifyAppDomain#create.
#
# @!attribute [rw] app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
VerifyAppDomainCreateData = Struct.new(
  :app_id,
  :id,
  keyword_init: true
)

# VerifyBrowserSession entity data model.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] viewer_url
#   @return [Object]
VerifyBrowserSession = Struct.new(
  :account_id,
  :expires_at,
  :id,
  :name,
  :origin,
  :project_id,
  :status,
  :url,
  :viewer_url,
  keyword_init: true
)

# Request payload for VerifyBrowserSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
VerifyBrowserSessionLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for VerifyBrowserSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
VerifyBrowserSessionCreateData = Struct.new(
  :organization_id,
  :account_id,
  :name,
  :project_id,
  :url,
  keyword_init: true
)

# Request payload for VerifyBrowserSession#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
VerifyBrowserSessionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# VerifyStaticSiteDomain entity data model.
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dns_mode
#   @return [String]
#
# @!attribute [rw] dns_status
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] last_checked_at
#   @return [Object]
#
# @!attribute [rw] record_name
#   @return [Object]
#
# @!attribute [rw] record_type
#   @return [Object]
#
# @!attribute [rw] record_value
#   @return [Object]
#
# @!attribute [rw] redirect_to
#   @return [Object]
#
# @!attribute [rw] static_site_id
#   @return [Object]
#
# @!attribute [rw] target_kind
#   @return [String]
#
# @!attribute [rw] tls_status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] verification_status
#   @return [String]
VerifyStaticSiteDomain = Struct.new(
  :app_environment_id,
  :app_service_id,
  :created_at,
  :dns_mode,
  :dns_status,
  :failure_message,
  :hosted_app_id,
  :hostname,
  :id,
  :kind,
  :last_checked_at,
  :record_name,
  :record_type,
  :record_value,
  :redirect_to,
  :static_site_id,
  :target_kind,
  :tls_status,
  :updated_at,
  :verification_status,
  keyword_init: true
)

# Request payload for VerifyStaticSiteDomain#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] static_site_id
#   @return [String]
VerifyStaticSiteDomainCreateData = Struct.new(
  :id,
  :static_site_id,
  keyword_init: true
)

# VersionLog entity data model.
#
# @!attribute [rw] base_image
#   @return [String]
#
# @!attribute [rw] failure_phase
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image_digest
#   @return [Object]
#
# @!attribute [rw] image_reference
#   @return [Object]
#
# @!attribute [rw] installer_version
#   @return [String]
#
# @!attribute [rw] ready_at
#   @return [Object]
#
# @!attribute [rw] receipt
#   @return [Object]
#
# @!attribute [rw] safe_error
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
VersionLog = Struct.new(
  :base_image,
  :failure_phase,
  :id,
  :image_digest,
  :image_reference,
  :installer_version,
  :ready_at,
  :receipt,
  :safe_error,
  :started_at,
  :status,
  keyword_init: true
)

# Request payload for VersionLog#list.
#
# @!attribute [rw] binary_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
VersionLogListMatch = Struct.new(
  :binary_id,
  :organization_id,
  :version_id,
  :project_id,
  keyword_init: true
)

# WebBotAuth entity data model.
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] signatures
#   @return [Array]
WebBotAuth = Struct.new(
  :expires_at,
  :origin,
  :signatures,
  keyword_init: true
)

# Request payload for WebBotAuth#create.
#
# @!attribute [rw] origin
#   @return [String]
WebBotAuthCreateData = Struct.new(
  :origin,
  keyword_init: true
)

# WorkflowRunStep entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
WorkflowRunStep = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for WorkflowRunStep#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] workflow_run_id
#   @return [String]
WorkflowRunStepLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :workflow_run_id,
  keyword_init: true
)

# WorkflowRunStopNotice entity data model.
class WorkflowRunStopNotice
end

# Request payload for WorkflowRunStopNotice#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] workflow_run_id
#   @return [String]
WorkflowRunStopNoticeCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :workflow_run_id,
  keyword_init: true
)

# WorkflowTriggerSkipped entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
WorkflowTriggerSkipped = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for WorkflowTriggerSkipped#create.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] workflow_trigger_id
#   @return [String]
WorkflowTriggerSkippedCreateData = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  :workflow_trigger_id,
  keyword_init: true
)

