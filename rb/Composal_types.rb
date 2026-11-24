# frozen_string_literal: true

# Typed models for the Composal SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# A2aWellKnown entity data model.
class A2aWellKnown
end

# Request payload for A2aWellKnown#load.
#
# @!attribute [rw] a2a_id
#   @return [String]
A2aWellKnownLoadMatch = Struct.new(
  :a2a_id,
  keyword_init: true
)

# AdminOrg entity data model.
#
# @!attribute [rw] billing_email
#   @return [Object]
#
# @!attribute [rw] billing_reason
#   @return [String, nil]
#
# @!attribute [rw] customize_onboarding_packages
#   @return [Boolean, nil]
#
# @!attribute [rw] deployment_usage_visibility
#   @return [String]
#
# @!attribute [rw] deployment_usage_visible
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] monthly_price_dollars
#   @return [Object, nil]
#
# @!attribute [rw] monthly_price_override_cents
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] onboarding_custom_pricing
#   @return [Boolean, nil]
#
# @!attribute [rw] onboarding_package_keys
#   @return [Object, nil]
#
# @!attribute [rw] owner_email
#   @return [String]
#
# @!attribute [rw] package_id
#   @return [Object]
#
# @!attribute [rw] skip_payment
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String]
AdminOrg = Struct.new(
  :billing_email,
  :billing_reason,
  :customize_onboarding_packages,
  :deployment_usage_visibility,
  :deployment_usage_visible,
  :id,
  :monthly_price_dollars,
  :monthly_price_override_cents,
  :name,
  :onboarding_custom_pricing,
  :onboarding_package_keys,
  :owner_email,
  :package_id,
  :skip_payment,
  :slug,
  keyword_init: true
)

# Request payload for AdminOrg#load.
#
# @!attribute [rw] id
#   @return [String]
AdminOrgLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AdminOrg#list.
#
# @!attribute [rw] billing_email
#   @return [Object, nil]
#
# @!attribute [rw] billing_reason
#   @return [String, nil]
#
# @!attribute [rw] customize_onboarding_packages
#   @return [Boolean, nil]
#
# @!attribute [rw] deployment_usage_visibility
#   @return [String, nil]
#
# @!attribute [rw] deployment_usage_visible
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] monthly_price_dollars
#   @return [Object, nil]
#
# @!attribute [rw] monthly_price_override_cents
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] onboarding_custom_pricing
#   @return [Boolean, nil]
#
# @!attribute [rw] onboarding_package_keys
#   @return [Object, nil]
#
# @!attribute [rw] owner_email
#   @return [String, nil]
#
# @!attribute [rw] package_id
#   @return [Object, nil]
#
# @!attribute [rw] skip_payment
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
AdminOrgListMatch = Struct.new(
  :billing_email,
  :billing_reason,
  :customize_onboarding_packages,
  :deployment_usage_visibility,
  :deployment_usage_visible,
  :id,
  :monthly_price_dollars,
  :monthly_price_override_cents,
  :name,
  :onboarding_custom_pricing,
  :onboarding_package_keys,
  :owner_email,
  :package_id,
  :skip_payment,
  :slug,
  keyword_init: true
)

# Request payload for AdminOrg#create.
#
# @!attribute [rw] billing_reason
#   @return [String, nil]
#
# @!attribute [rw] customize_onboarding_packages
#   @return [Boolean, nil]
#
# @!attribute [rw] monthly_price_dollars
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] onboarding_custom_pricing
#   @return [Boolean, nil]
#
# @!attribute [rw] onboarding_package_keys
#   @return [Object, nil]
#
# @!attribute [rw] owner_email
#   @return [String]
#
# @!attribute [rw] package_id
#   @return [Object, nil]
#
# @!attribute [rw] skip_payment
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String]
AdminOrgCreateData = Struct.new(
  :billing_reason,
  :customize_onboarding_packages,
  :monthly_price_dollars,
  :name,
  :onboarding_custom_pricing,
  :onboarding_package_keys,
  :owner_email,
  :package_id,
  :skip_payment,
  :slug,
  keyword_init: true
)

# Request payload for AdminOrg#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] billing_email
#   @return [Object, nil]
#
# @!attribute [rw] monthly_price_dollars
#   @return [Object, nil]
#
# @!attribute [rw] package_id
#   @return [Object, nil]
#
# @!attribute [rw] reason
#   @return [Object, nil]
AdminOrgUpdateData = Struct.new(
  :id,
  :billing_email,
  :monthly_price_dollars,
  :package_id,
  :reason,
  keyword_init: true
)

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

# AgentApp entity data model.
#
# @!attribute [rw] author
#   @return [Hash]
#
# @!attribute [rw] can_message
#   @return [Boolean]
#
# @!attribute [rw] deployments_count
#   @return [Integer]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] hidden_install_count
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] install_count
#   @return [Integer]
#
# @!attribute [rw] install_targets
#   @return [Array]
#
# @!attribute [rw] installed_by
#   @return [Array]
#
# @!attribute [rw] installed_target_ids
#   @return [Array]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] mcp_url
#   @return [Object]
#
# @!attribute [rw] next_cursor
#   @return [Object]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] thread
#   @return [Object]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String]
AgentApp = Struct.new(
  :author,
  :can_message,
  :deployments_count,
  :description,
  :hidden_install_count,
  :id,
  :install_count,
  :install_targets,
  :installed_by,
  :installed_target_ids,
  :items,
  :mcp_url,
  :next_cursor,
  :owner,
  :thread,
  :title,
  :url,
  :visibility,
  keyword_init: true
)

# Request payload for AgentApp#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentAppLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentApp#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
AgentAppListMatch = Struct.new(
  :organization_id,
  :cursor,
  keyword_init: true
)

# Request payload for AgentApp#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] surface
#   @return [Object, nil]
#
# @!attribute [rw] view
#   @return [Object, nil]
AgentAppCreateData = Struct.new(
  :id,
  :organization_id,
  :surface,
  :view,
  keyword_init: true
)

# AgentAppInstall entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] installed
#   @return [Boolean]
AgentAppInstall = Struct.new(
  :id,
  :installed,
  keyword_init: true
)

# Request payload for AgentAppInstall#update.
#
# @!attribute [rw] agent_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentAppInstallUpdateData = Struct.new(
  :agent_app_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentAppInstall#remove.
#
# @!attribute [rw] agent_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentAppInstallRemoveMatch = Struct.new(
  :agent_app_id,
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
# @!attribute [rw] actions
#   @return [Array]
#
# @!attribute [rw] activity
#   @return [Array]
#
# @!attribute [rw] admin_disabled_at
#   @return [Object, nil]
#
# @!attribute [rw] agent_tools
#   @return [Boolean, nil]
#
# @!attribute [rw] authentication
#   @return [String]
#
# @!attribute [rw] authorized_at
#   @return [Object]
#
# @!attribute [rw] can_create_account
#   @return [Boolean, nil]
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] catalog_section
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] certification
#   @return [String]
#
# @!attribute [rw] checked_at
#   @return [Object]
#
# @!attribute [rw] connection
#   @return [Hash]
#
# @!attribute [rw] consent
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] creation_key
#   @return [String, nil]
#
# @!attribute [rw] custodian_id
#   @return [Object]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] disabled_reason
#   @return [Object, nil]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] grants
#   @return [Array]
#
# @!attribute [rw] grants_pagination
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] limits
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] owner_name
#   @return [String, nil]
#
# @!attribute [rw] ownership_kind
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] policy_digest
#   @return [String]
#
# @!attribute [rw] provider
#   @return [Hash]
#
# @!attribute [rw] provider_disabled_reason
#   @return [Object, nil]
#
# @!attribute [rw] provider_identity
#   @return [Hash]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] schema_version
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] toolkit
#   @return [String]
#
# @!attribute [rw] triggers
#   @return [Array]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
AgentConnection = Struct.new(
  :actions,
  :activity,
  :admin_disabled_at,
  :agent_tools,
  :authentication,
  :authorized_at,
  :can_create_account,
  :capabilities,
  :catalog_section,
  :category,
  :certification,
  :checked_at,
  :connection,
  :consent,
  :created_at,
  :creation_key,
  :custodian_id,
  :description,
  :disabled_reason,
  :failure_code,
  :generation,
  :grants,
  :grants_pagination,
  :id,
  :limits,
  :name,
  :organization_id,
  :owner_name,
  :ownership_kind,
  :pagination,
  :policy_digest,
  :provider,
  :provider_disabled_reason,
  :provider_identity,
  :revoked_at,
  :schema_version,
  :status,
  :toolkit,
  :triggers,
  :updated_at,
  :user_id,
  :version,
  keyword_init: true
)

# Request payload for AgentConnection#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] grants_cursor
#   @return [String, nil]
#
# @!attribute [rw] grants_limit
#   @return [Integer, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
AgentConnectionLoadMatch = Struct.new(
  :id,
  :organization_id,
  :cursor,
  :grants_cursor,
  :grants_limit,
  :limit,
  keyword_init: true
)

# Request payload for AgentConnection#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
AgentConnectionListMatch = Struct.new(
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# Request payload for AgentConnection#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] creation_key
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] toolkit
#   @return [String]
AgentConnectionCreateData = Struct.new(
  :organization_id,
  :creation_key,
  :name,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentConnection#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
AgentConnectionUpdateData = Struct.new(
  :id,
  :organization_id,
  :name,
  keyword_init: true
)

# Request payload for AgentConnection#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
AgentConnectionPatchData = Struct.new(
  :id,
  :organization_id,
  :name,
  keyword_init: true
)

# Request payload for AgentConnection#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentConnectionDelegation entity data model.
#
# @!attribute [rw] authorized_by_id
#   @return [String]
#
# @!attribute [rw] automation_connection_grant_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] member_name
#   @return [String]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] roles
#   @return [Array]
#
# @!attribute [rw] usable
#   @return [Boolean]
#
# @!attribute [rw] user_id
#   @return [String]
AgentConnectionDelegation = Struct.new(
  :authorized_by_id,
  :automation_connection_grant_id,
  :created_at,
  :id,
  :member_name,
  :revoked_at,
  :roles,
  :usable,
  :user_id,
  keyword_init: true
)

# Request payload for AgentConnectionDelegation#list.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionDelegationListMatch = Struct.new(
  :agent_connection_id,
  :organization_id,
  keyword_init: true
)

# AgentConnectionGrant entity data model.
#
# @!attribute [rw] actions
#   @return [Array]
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] automation_id
#   @return [String]
#
# @!attribute [rw] connection_generation
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] revision
#   @return [Integer]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] usable
#   @return [Boolean]
#
# @!attribute [rw] user_id
#   @return [String]
AgentConnectionGrant = Struct.new(
  :actions,
  :agent_connection_id,
  :automation_id,
  :connection_generation,
  :created_at,
  :id,
  :organization_id,
  :revision,
  :revoked_at,
  :status,
  :usable,
  :user_id,
  keyword_init: true
)

# Request payload for AgentConnectionGrant#list.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionGrantListMatch = Struct.new(
  :agent_connection_id,
  :organization_id,
  keyword_init: true
)

# AgentConnectionResource entity data model.
#
# @!attribute [rw] cursor
#   @return [Object, nil]
#
# @!attribute [rw] next_cursor
#   @return [Object]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] resources
#   @return [Array]
AgentConnectionResource = Struct.new(
  :cursor,
  :next_cursor,
  :query,
  :resources,
  keyword_init: true
)

# Request payload for AgentConnectionResource#create.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [Object, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
AgentConnectionResourceCreateData = Struct.new(
  :agent_connection_id,
  :organization_id,
  :cursor,
  :query,
  keyword_init: true
)

# AgentConnectionSafetyControl entity data model.
#
# @!attribute [rw] admin_disabled_at
#   @return [Object, nil]
#
# @!attribute [rw] authorized_at
#   @return [Object]
#
# @!attribute [rw] checked_at
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] custodian_id
#   @return [Object]
#
# @!attribute [rw] failure_code
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
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] owner_name
#   @return [String, nil]
#
# @!attribute [rw] ownership_kind
#   @return [String]
#
# @!attribute [rw] provider_disabled_reason
#   @return [Object, nil]
#
# @!attribute [rw] provider_identity
#   @return [Hash]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] toolkit
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
AgentConnectionSafetyControl = Struct.new(
  :admin_disabled_at,
  :authorized_at,
  :checked_at,
  :created_at,
  :custodian_id,
  :failure_code,
  :generation,
  :id,
  :name,
  :organization_id,
  :owner_name,
  :ownership_kind,
  :provider_disabled_reason,
  :provider_identity,
  :revoked_at,
  :status,
  :toolkit,
  :updated_at,
  :user_id,
  keyword_init: true
)

# Request payload for AgentConnectionSafetyControl#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
AgentConnectionSafetyControlListMatch = Struct.new(
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# AgentConnectionTriggerSubscription entity data model.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] configuration
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] defaults
#   @return [Hash]
#
# @!attribute [rw] delivery
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] failure_request_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latency
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] reconcile_at
#   @return [String]
#
# @!attribute [rw] reconciliation_uncertain
#   @return [Boolean]
#
# @!attribute [rw] remote_enabled
#   @return [Object]
#
# @!attribute [rw] replacement_id
#   @return [Object]
#
# @!attribute [rw] retired_at
#   @return [Object]
#
# @!attribute [rw] retirement_completed_at
#   @return [Object]
#
# @!attribute [rw] schema
#   @return [Hash]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] toolkit
#   @return [String]
#
# @!attribute [rw] toolkit_version
#   @return [String]
#
# @!attribute [rw] trigger_slug
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
#
# @!attribute [rw] waiting_for_retirement
#   @return [Boolean]
AgentConnectionTriggerSubscription = Struct.new(
  :agent_connection_id,
  :configuration,
  :created_at,
  :defaults,
  :delivery,
  :enabled,
  :failure_code,
  :failure_request_id,
  :id,
  :latency,
  :name,
  :reconcile_at,
  :reconciliation_uncertain,
  :remote_enabled,
  :replacement_id,
  :retired_at,
  :retirement_completed_at,
  :schema,
  :slug,
  :status,
  :toolkit,
  :toolkit_version,
  :trigger_slug,
  :updated_at,
  :version,
  :waiting_for_retirement,
  keyword_init: true
)

# Request payload for AgentConnectionTriggerSubscription#list.
#
# @!attribute [rw] agent_connection_id
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
AgentConnectionTriggerSubscriptionListMatch = Struct.new(
  :agent_connection_id,
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# Request payload for AgentConnectionTriggerSubscription#create.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] configuration
#   @return [Hash]
#
# @!attribute [rw] trigger_slug
#   @return [String]
AgentConnectionTriggerSubscriptionCreateData = Struct.new(
  :agent_connection_id,
  :organization_id,
  :configuration,
  :trigger_slug,
  keyword_init: true
)

# Request payload for AgentConnectionTriggerSubscription#update.
#
# @!attribute [rw] agent_connection_id
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
AgentConnectionTriggerSubscriptionUpdateData = Struct.new(
  :agent_connection_id,
  :id,
  :organization_id,
  :enabled,
  keyword_init: true
)

# Request payload for AgentConnectionTriggerSubscription#patch.
#
# @!attribute [rw] agent_connection_id
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
AgentConnectionTriggerSubscriptionPatchData = Struct.new(
  :agent_connection_id,
  :id,
  :organization_id,
  :enabled,
  keyword_init: true
)

# Request payload for AgentConnectionTriggerSubscription#remove.
#
# @!attribute [rw] agent_connection_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentConnectionTriggerSubscriptionRemoveMatch = Struct.new(
  :agent_connection_id,
  :id,
  :organization_id,
  keyword_init: true
)

# AgentContextCheckpoint entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentContextCheckpoint = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentContextCheckpoint#load.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] expected_commit_id
#   @return [String]
#
# @!attribute [rw] max_byte
#   @return [Integer, nil]
AgentContextCheckpointLoadMatch = Struct.new(
  :change_id,
  :id,
  :organization_id,
  :repo_id,
  :expected_commit_id,
  :max_byte,
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

# AgentEvent entity data model.
class AgentEvent
end

# Request payload for AgentEvent#list.
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
# @!attribute [rw] device_activity_provider
#   @return [String, nil]
AgentEventListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :conversation_id,
  :device_activity_provider,
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
# @!attribute [rw] can_cancel_sign_in
#   @return [Boolean, nil]
#
# @!attribute [rw] can_delete
#   @return [Boolean]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean]
#
# @!attribute [rw] can_enable
#   @return [Boolean]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sharing
#   @return [Boolean]
#
# @!attribute [rw] can_reconnect
#   @return [Boolean]
#
# @!attribute [rw] can_sync
#   @return [Boolean]
#
# @!attribute [rw] catalog
#   @return [Array]
#
# @!attribute [rw] connected_by
#   @return [Object]
#
# @!attribute [rw] connected_by_you
#   @return [Boolean]
#
# @!attribute [rw] connected_counts
#   @return [Hash]
#
# @!attribute [rw] connections
#   @return [Array]
#
# @!attribute [rw] creation_key
#   @return [String, nil]
#
# @!attribute [rw] creation_key_digest
#   @return [Object, nil]
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
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] pending_counts
#   @return [Hash]
#
# @!attribute [rw] provider_disabled_reason
#   @return [Object]
#
# @!attribute [rw] provider_identity
#   @return [Hash]
#
# @!attribute [rw] provider_name
#   @return [Object]
#
# @!attribute [rw] reference
#   @return [String]
#
# @!attribute [rw] sharing_status
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] team_sharing_enabled
#   @return [Boolean]
#
# @!attribute [rw] team_sharing_version
#   @return [Integer]
#
# @!attribute [rw] toolkit
#   @return [String]
AgentIntegration = Struct.new(
  :account_counts,
  :can_cancel_sign_in,
  :can_delete,
  :can_disconnect,
  :can_enable,
  :can_manage,
  :can_manage_sharing,
  :can_reconnect,
  :can_sync,
  :catalog,
  :connected_by,
  :connected_by_you,
  :connected_counts,
  :connections,
  :creation_key,
  :creation_key_digest,
  :generation,
  :id,
  :name,
  :pagination,
  :pending_counts,
  :provider_disabled_reason,
  :provider_identity,
  :provider_name,
  :reference,
  :sharing_status,
  :status,
  :team_sharing_enabled,
  :team_sharing_version,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentIntegration#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentIntegrationLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentIntegration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] enableable
#   @return [Boolean, nil]
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
  :organization_id,
  :cursor,
  :enableable,
  :limit,
  :q,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentIntegration#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] creation_key
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] toolkit
#   @return [String]
AgentIntegrationCreateData = Struct.new(
  :organization_id,
  :creation_key,
  :name,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentIntegration#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentIntegrationRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentIntegrationAccount entity data model.
#
# @!attribute [rw] can_cancel_sign_in
#   @return [Boolean, nil]
#
# @!attribute [rw] can_delete
#   @return [Boolean]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean]
#
# @!attribute [rw] can_enable
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sharing
#   @return [Boolean]
#
# @!attribute [rw] can_reconnect
#   @return [Boolean]
#
# @!attribute [rw] can_sync
#   @return [Boolean]
#
# @!attribute [rw] connected_by
#   @return [Object]
#
# @!attribute [rw] connected_by_you
#   @return [Boolean]
#
# @!attribute [rw] creation_key_digest
#   @return [Object, nil]
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
# @!attribute [rw] provider_disabled_reason
#   @return [Object]
#
# @!attribute [rw] provider_identity
#   @return [Hash]
#
# @!attribute [rw] reference
#   @return [String]
#
# @!attribute [rw] sharing_status
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] team_sharing_enabled
#   @return [Boolean]
#
# @!attribute [rw] team_sharing_version
#   @return [Integer]
#
# @!attribute [rw] toolkit
#   @return [String]
AgentIntegrationAccount = Struct.new(
  :can_cancel_sign_in,
  :can_delete,
  :can_disconnect,
  :can_enable,
  :can_manage_sharing,
  :can_reconnect,
  :can_sync,
  :connected_by,
  :connected_by_you,
  :creation_key_digest,
  :generation,
  :id,
  :name,
  :provider_disabled_reason,
  :provider_identity,
  :reference,
  :sharing_status,
  :status,
  :team_sharing_enabled,
  :team_sharing_version,
  :toolkit,
  keyword_init: true
)

# Request payload for AgentIntegrationAccount#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] enableable
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] toolkit
#   @return [String, nil]
AgentIntegrationAccountListMatch = Struct.new(
  :organization_id,
  :cursor,
  :enableable,
  :limit,
  :q,
  :toolkit,
  keyword_init: true
)

# AgentIntegrationCallback entity data model.
class AgentIntegrationCallback
end

# Request payload for AgentIntegrationCallback#load.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] connection_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
AgentIntegrationCallbackLoadMatch = Struct.new(
  :code,
  :connection_id,
  :state,
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

# AgentRelayFileGrant entity data model.
#
# @!attribute [rw] access_mode
#   @return [String]
#
# @!attribute [rw] connection_generation
#   @return [Integer]
#
# @!attribute [rw] connection_id
#   @return [String]
#
# @!attribute [rw] connection_name
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] expected_generation
#   @return [Integer]
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
# @!attribute [rw] resource_id
#   @return [String]
#
# @!attribute [rw] resource_kind
#   @return [String]
#
# @!attribute [rw] revoked
#   @return [Boolean]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] snapshot_supported
#   @return [Boolean, nil]
#
# @!attribute [rw] source_operation_id
#   @return [String]
AgentRelayFileGrant = Struct.new(
  :access_mode,
  :connection_generation,
  :connection_id,
  :connection_name,
  :created_at,
  :expected_generation,
  :id,
  :key,
  :provider,
  :resource_id,
  :resource_kind,
  :revoked,
  :revoked_at,
  :snapshot_supported,
  :source_operation_id,
  keyword_init: true
)

# Request payload for AgentRelayFileGrant#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentRelayFileGrantLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentRelayFileGrant#list.
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
# @!attribute [rw] request_key
#   @return [String, nil]
#
# @!attribute [rw] source_operation_id
#   @return [String, nil]
AgentRelayFileGrantListMatch = Struct.new(
  :organization_id,
  :cursor,
  :limit,
  :request_key,
  :source_operation_id,
  keyword_init: true
)

# Request payload for AgentRelayFileGrant#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] access_mode
#   @return [String]
#
# @!attribute [rw] connection_id
#   @return [String]
#
# @!attribute [rw] expected_generation
#   @return [Integer]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] resource_id
#   @return [String]
#
# @!attribute [rw] resource_kind
#   @return [String]
#
# @!attribute [rw] source_operation_id
#   @return [String]
AgentRelayFileGrantCreateData = Struct.new(
  :organization_id,
  :access_mode,
  :connection_id,
  :expected_generation,
  :key,
  :resource_id,
  :resource_kind,
  :source_operation_id,
  keyword_init: true
)

# Request payload for AgentRelayFileGrant#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentRelayFileGrantRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# AgentRelayFileGrantAccount entity data model.
#
# @!attribute [rw] access_modes
#   @return [Array, nil]
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
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] resource_kind
#   @return [String]
AgentRelayFileGrantAccount = Struct.new(
  :access_modes,
  :generation,
  :id,
  :name,
  :provider,
  :resource_kind,
  keyword_init: true
)

# Request payload for AgentRelayFileGrantAccount#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] source_operation_id
#   @return [String]
AgentRelayFileGrantAccountListMatch = Struct.new(
  :organization_id,
  :cursor,
  :source_operation_id,
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

# AgentRoder entity data model.
class AgentRoder
end

# Request payload for AgentRoder#load.
#
# @!attribute [rw] organization_id
#   @return [String]
AgentRoderLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for AgentRoder#create.
#
# @!attribute [rw] checkpoint_handoff
#   @return [Object, nil]
#
# @!attribute [rw] github_repository
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [Object, nil]
#
# @!attribute [rw] repository_slug
#   @return [Object, nil]
#
# @!attribute [rw] session_purpose
#   @return [Object, nil]
AgentRoderCreateData = Struct.new(
  :checkpoint_handoff,
  :github_repository,
  :organization_id,
  :repository_slug,
  :session_purpose,
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

# AgentSession entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentSession = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] around_event
#   @return [Integer, nil]
#
# @!attribute [rw] checkpoint
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] event_digest
#   @return [String, nil]
#
# @!attribute [rw] include_tool
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] max_byte
#   @return [Integer, nil]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
AgentSessionLoadMatch = Struct.new(
  :id,
  :around_event,
  :checkpoint,
  :cursor,
  :event_digest,
  :include_tool,
  :limit,
  :max_byte,
  :source_ref,
  keyword_init: true
)

# AgentSessionCheckpoint entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentSessionCheckpoint = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentSessionCheckpoint#load.
#
# @!attribute [rw] agent_session_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
AgentSessionCheckpointLoadMatch = Struct.new(
  :agent_session_id,
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for AgentSessionCheckpoint#list.
#
# @!attribute [rw] agent_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
AgentSessionCheckpointListMatch = Struct.new(
  :agent_session_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for AgentSessionCheckpoint#create.
#
# @!attribute [rw] agent_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
AgentSessionCheckpointCreateData = Struct.new(
  :agent_session_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# AgentSessionRoderHandoff entity data model.
#
# @!attribute [rw] checkpoint_id
#   @return [String, nil]
#
# @!attribute [rw] purpose
#   @return [String, nil]
AgentSessionRoderHandoff = Struct.new(
  :checkpoint_id,
  :purpose,
  keyword_init: true
)

# Request payload for AgentSessionRoderHandoff#create.
#
# @!attribute [rw] agent_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] checkpoint_id
#   @return [String, nil]
#
# @!attribute [rw] purpose
#   @return [String, nil]
AgentSessionRoderHandoffCreateData = Struct.new(
  :agent_session_id,
  :organization_id,
  :repo_id,
  :checkpoint_id,
  :purpose,
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
# @!attribute [rw] author
#   @return [Hash]
#
# @!attribute [rw] can_message
#   @return [Boolean]
#
# @!attribute [rw] deployments_count
#   @return [Integer]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] icon_url
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] thread
#   @return [Object]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String]
AgentSite = Struct.new(
  :author,
  :can_message,
  :deployments_count,
  :description,
  :icon_url,
  :id,
  :name,
  :owner,
  :thread,
  :title,
  :url,
  :visibility,
  keyword_init: true
)

# Request payload for AgentSite#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSiteLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentSite#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
AgentSiteListMatch = Struct.new(
  :organization_id,
  :cursor,
  keyword_init: true
)

# Request payload for AgentSite#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] surface
#   @return [Object, nil]
#
# @!attribute [rw] view
#   @return [Object, nil]
AgentSiteCreateData = Struct.new(
  :id,
  :organization_id,
  :surface,
  :view,
  keyword_init: true
)

# AgentSkill entity data model.
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] audience
#   @return [Hash]
#
# @!attribute [rw] can_manage_library
#   @return [Boolean]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] files
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] marketplace
#   @return [String, nil]
#
# @!attribute [rw] pending
#   @return [Boolean]
#
# @!attribute [rw] plugin
#   @return [String, nil]
#
# @!attribute [rw] revision
#   @return [String]
#
# @!attribute [rw] skill
#   @return [Hash]
#
# @!attribute [rw] skills
#   @return [Array]
#
# @!attribute [rw] source
#   @return [String, nil]
AgentSkill = Struct.new(
  :agents,
  :audience,
  :can_manage_library,
  :content,
  :files,
  :id,
  :marketplace,
  :pending,
  :plugin,
  :revision,
  :skill,
  :skills,
  :source,
  keyword_init: true
)

# Request payload for AgentSkill#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSkillLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for AgentSkill#list.
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSkillListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for AgentSkill#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] audience
#   @return [Hash]
#
# @!attribute [rw] marketplace
#   @return [String, nil]
#
# @!attribute [rw] plugin
#   @return [String, nil]
#
# @!attribute [rw] revision
#   @return [String]
#
# @!attribute [rw] skills
#   @return [Array]
#
# @!attribute [rw] source
#   @return [String, nil]
AgentSkillCreateData = Struct.new(
  :organization_id,
  :audience,
  :marketplace,
  :plugin,
  :revision,
  :skills,
  :source,
  keyword_init: true
)

# Request payload for AgentSkill#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_ids
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] new_agents
#   @return [Object, nil]
AgentSkillUpdateData = Struct.new(
  :id,
  :organization_id,
  :agent_ids,
  :mode,
  :new_agents,
  keyword_init: true
)

# Request payload for AgentSkill#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
AgentSkillRemoveMatch = Struct.new(
  :id,
  :organization_id,
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

# AgentSwarm entity data model.
#
# @!attribute [rw] base_bookmark
#   @return [Object]
#
# @!attribute [rw] base_ref
#   @return [Object]
#
# @!attribute [rw] base_revision
#   @return [Object]
#
# @!attribute [rw] budget
#   @return [Hash]
#
# @!attribute [rw] canceled_at
#   @return [Object]
#
# @!attribute [rw] canceled_count
#   @return [Integer]
#
# @!attribute [rw] concurrency_key
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
# @!attribute [rw] deadline_at
#   @return [Object]
#
# @!attribute [rw] display_id
#   @return [Integer]
#
# @!attribute [rw] done_count
#   @return [Integer]
#
# @!attribute [rw] environment
#   @return [Hash]
#
# @!attribute [rw] failed_count
#   @return [Integer]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] finished_at_label
#   @return [Object]
#
# @!attribute [rw] github
#   @return [Hash]
#
# @!attribute [rw] goal
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] model
#   @return [Object]
#
# @!attribute [rw] model_provider
#   @return [Object]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] organization_slug
#   @return [Object]
#
# @!attribute [rw] outcome
#   @return [Object]
#
# @!attribute [rw] phase
#   @return [Object]
#
# @!attribute [rw] policy
#   @return [Hash]
#
# @!attribute [rw] queued_at
#   @return [Object]
#
# @!attribute [rw] queued_at_label
#   @return [Object]
#
# @!attribute [rw] repository
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] repository_slug
#   @return [Object]
#
# @!attribute [rw] reserved
#   @return [Hash]
#
# @!attribute [rw] scheduler_generation
#   @return [Integer]
#
# @!attribute [rw] skipped_count
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
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
# @!attribute [rw] summary
#   @return [Hash]
#
# @!attribute [rw] target
#   @return [Hash]
#
# @!attribute [rw] task_count
#   @return [Integer]
#
# @!attribute [rw] task_template_json
#   @return [Object]
#
# @!attribute [rw] tasks
#   @return [Array]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] usage
#   @return [Hash]
AgentSwarm = Struct.new(
  :base_bookmark,
  :base_ref,
  :base_revision,
  :budget,
  :canceled_at,
  :canceled_count,
  :concurrency_key,
  :created_at,
  :created_at_label,
  :creator_user_id,
  :deadline_at,
  :display_id,
  :done_count,
  :environment,
  :failed_count,
  :finished_at,
  :finished_at_label,
  :github,
  :goal,
  :id,
  :model,
  :model_provider,
  :number,
  :organization_id,
  :organization_slug,
  :outcome,
  :phase,
  :policy,
  :queued_at,
  :queued_at_label,
  :repository,
  :repository_id,
  :repository_slug,
  :reserved,
  :scheduler_generation,
  :skipped_count,
  :slug,
  :started_at,
  :started_at_label,
  :status,
  :summary,
  :target,
  :task_count,
  :task_template_json,
  :tasks,
  :updated_at,
  :updated_at_label,
  :usage,
  keyword_init: true
)

# Request payload for AgentSwarm#load.
#
# @!attribute [rw] id
#   @return [String]
AgentSwarmLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentSwarm#list.
#
# @!attribute [rw] org
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
AgentSwarmListMatch = Struct.new(
  :org,
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for AgentSwarm#create.
#
# @!attribute [rw] base_bookmark
#   @return [Object, nil]
#
# @!attribute [rw] base_ref
#   @return [Object, nil]
#
# @!attribute [rw] base_revision
#   @return [Object, nil]
#
# @!attribute [rw] budget
#   @return [Hash, nil]
#
# @!attribute [rw] concurrency_key
#   @return [Object, nil]
#
# @!attribute [rw] environment
#   @return [Hash, nil]
#
# @!attribute [rw] goal
#   @return [Object, nil]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] model_provider
#   @return [Object, nil]
#
# @!attribute [rw] organization_slug
#   @return [Object]
#
# @!attribute [rw] policy
#   @return [Hash, nil]
#
# @!attribute [rw] queued_at
#   @return [Object, nil]
#
# @!attribute [rw] repository
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [Hash]
#
# @!attribute [rw] task_template_json
#   @return [Object, nil]
#
# @!attribute [rw] tasks
#   @return [Array, nil]
AgentSwarmCreateData = Struct.new(
  :base_bookmark,
  :base_ref,
  :base_revision,
  :budget,
  :concurrency_key,
  :environment,
  :goal,
  :model,
  :model_provider,
  :organization_slug,
  :policy,
  :queued_at,
  :repository,
  :slug,
  :target,
  :task_template_json,
  :tasks,
  keyword_init: true
)

# Request payload for AgentSwarm#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] policy
#   @return [Hash, nil]
AgentSwarmUpdateData = Struct.new(
  :id,
  :policy,
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
# @!attribute [rw] id
#   @return [String, nil]
AgentThread = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentThread#load.
#
# @!attribute [rw] id
#   @return [String]
AgentThreadLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentThread#list.
#
# @!attribute [rw] id
#   @return [String, nil]
AgentThreadListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AgentThread#create.
class AgentThreadCreateData
end

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

# AgentUsage entity data model.
#
# @!attribute [rw] days
#   @return [Array]
#
# @!attribute [rw] ended_at
#   @return [String]
#
# @!attribute [rw] pricing_version
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] started_at
#   @return [String]
#
# @!attribute [rw] user_days
#   @return [Array]
#
# @!attribute [rw] users
#   @return [Array]
#
# @!attribute [rw] window
#   @return [String]
AgentUsage = Struct.new(
  :days,
  :ended_at,
  :pricing_version,
  :source,
  :started_at,
  :user_days,
  :users,
  :window,
  keyword_init: true
)

# Request payload for AgentUsage#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] window
#   @return [String, nil]
AgentUsageLoadMatch = Struct.new(
  :organization_id,
  :window,
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

# AgentWebPreview entity data model.
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] icon_url
#   @return [Object]
#
# @!attribute [rw] image_url
#   @return [Object]
#
# @!attribute [rw] title
#   @return [Object]
AgentWebPreview = Struct.new(
  :description,
  :icon_url,
  :image_url,
  :title,
  keyword_init: true
)

# Request payload for AgentWebPreview#list.
#
# @!attribute [rw] asset
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
AgentWebPreviewListMatch = Struct.new(
  :asset,
  :token,
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

# Agreement entity data model.
#
# @!attribute [rw] body
#   @return [Object]
#
# @!attribute [rw] effective_on_label
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
Agreement = Struct.new(
  :body,
  :effective_on_label,
  :key,
  :summary,
  :title,
  :version,
  keyword_init: true
)

# Request payload for Agreement#list.
#
# @!attribute [rw] organization_id
#   @return [String]
AgreementListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# AgreementAccessRequest entity data model.
class AgreementAccessRequest
end

# Request payload for AgreementAccessRequest#create.
#
# @!attribute [rw] organization_id
#   @return [String]
AgreementAccessRequestCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# AlertRuleEvent entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
AlertRuleEvent = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AlertRuleEvent#load.
#
# @!attribute [rw] alert_rule_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
AlertRuleEventLoadMatch = Struct.new(
  :alert_rule_id,
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for AlertRuleEvent#list.
#
# @!attribute [rw] alert_rule_id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
AlertRuleEventListMatch = Struct.new(
  :alert_rule_id,
  :space_id,
  keyword_init: true
)

# Request payload for AlertRuleEvent#create.
#
# @!attribute [rw] alert_rule_id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
AlertRuleEventCreateData = Struct.new(
  :alert_rule_id,
  :space_id,
  keyword_init: true
)

# Request payload for AlertRuleEvent#remove.
#
# @!attribute [rw] alert_rule_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
AlertRuleEventRemoveMatch = Struct.new(
  :alert_rule_id,
  :id,
  :space_id,
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

# AppAccess entity data model.
class AppAccess
end

# Request payload for AppAccess#load.
class AppAccessLoadMatch
end

# AppAccessJwk entity data model.
class AppAccessJwk
end

# Request payload for AppAccessJwk#list.
class AppAccessJwkListMatch
end

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

# Artefact entity data model.
#
# @!attribute [rw] automation_invocation_id
#   @return [Object, nil]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] checksum_sha256
#   @return [String]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] created_by_user_id
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] document_key
#   @return [String, nil]
#
# @!attribute [rw] entrypoint
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [Object, nil]
#
# @!attribute [rw] filename
#   @return [String]
#
# @!attribute [rw] files
#   @return [Array, nil]
#
# @!attribute [rw] harness
#   @return [Object, nil]
#
# @!attribute [rw] harness_version
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] published_at
#   @return [Object, nil]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] vcs_agent_checkpoint_id
#   @return [Object, nil]
#
# @!attribute [rw] vcs_agent_session_id
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] view_url
#   @return [String]
#
# @!attribute [rw] web_url
#   @return [String]
Artefact = Struct.new(
  :automation_invocation_id,
  :byte_size,
  :checksum_sha256,
  :content_type,
  :created_at,
  :created_by_user_id,
  :description,
  :document_key,
  :entrypoint,
  :expires_at,
  :filename,
  :files,
  :harness,
  :harness_version,
  :id,
  :kind,
  :model,
  :organization_id,
  :published_at,
  :repository_id,
  :slug,
  :source,
  :status,
  :title,
  :vcs_agent_checkpoint_id,
  :vcs_agent_session_id,
  :version,
  :view_url,
  :web_url,
  keyword_init: true
)

# Request payload for Artefact#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ArtefactLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Artefact#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] created_by_agent
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] editable
#   @return [String, nil]
#
# @!attribute [rw] harness
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
ArtefactListMatch = Struct.new(
  :organization_id,
  :author,
  :created_by_agent,
  :cursor,
  :editable,
  :harness,
  :kind,
  :limit,
  :model,
  :q,
  :repo,
  :slug,
  :source,
  keyword_init: true
)

# Request payload for Artefact#create.
#
# @!attribute [rw] organization_id
#   @return [String]
ArtefactCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Artefact#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ArtefactUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Artefact#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ArtefactPatchData = Struct.new(
  :id,
  :organization_id,
  :description,
  :kind,
  :title,
  keyword_init: true
)

# Request payload for Artefact#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ArtefactRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# ArtefactCommentThread entity data model.
#
# @!attribute [rw] anchor
#   @return [String]
#
# @!attribute [rw] body
#   @return [String]
#
# @!attribute [rw] comments
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] resolved
#   @return [Boolean]
ArtefactCommentThread = Struct.new(
  :anchor,
  :body,
  :comments,
  :id,
  :quote,
  :resolved,
  keyword_init: true
)

# Request payload for ArtefactCommentThread#list.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ArtefactCommentThreadListMatch = Struct.new(
  :artefact_id,
  :organization_id,
  keyword_init: true
)

# Request payload for ArtefactCommentThread#create.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] anchor
#   @return [String]
#
# @!attribute [rw] body
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String, nil]
ArtefactCommentThreadCreateData = Struct.new(
  :artefact_id,
  :organization_id,
  :anchor,
  :body,
  :quote,
  keyword_init: true
)

# Request payload for ArtefactCommentThread#update.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] resolved
#   @return [Boolean, nil]
ArtefactCommentThreadUpdateData = Struct.new(
  :artefact_id,
  :id,
  :organization_id,
  :resolved,
  keyword_init: true
)

# ArtefactRevision entity data model.
#
# @!attribute [rw] base_version
#   @return [Integer]
#
# @!attribute [rw] content
#   @return [String]
ArtefactRevision = Struct.new(
  :base_version,
  :content,
  keyword_init: true
)

# Request payload for ArtefactRevision#create.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] base_version
#   @return [Integer]
#
# @!attribute [rw] content
#   @return [String]
ArtefactRevisionCreateData = Struct.new(
  :artefact_id,
  :organization_id,
  :base_version,
  :content,
  keyword_init: true
)

# ArtefactViewToken entity data model.
#
# @!attribute [rw] expires_in
#   @return [Integer]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] organization_slug
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
#
# @!attribute [rw] viewer_url
#   @return [String]
ArtefactViewToken = Struct.new(
  :expires_in,
  :file,
  :organization_slug,
  :version,
  :viewer_url,
  keyword_init: true
)

# Request payload for ArtefactViewToken#create.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] organization_slug
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ArtefactViewTokenCreateData = Struct.new(
  :artefact_id,
  :organization_id,
  :file,
  :organization_slug,
  :version,
  keyword_init: true
)

# Artifact entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Artifact = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Artifact#load.
#
# @!attribute [rw] id
#   @return [String]
ArtifactLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Artifact#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Artifact#create.
class ArtifactCreateData
end

# Request payload for Artifact#update.
#
# @!attribute [rw] id
#   @return [String]
ArtifactUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Artifact#patch.
#
# @!attribute [rw] id
#   @return [String]
ArtifactPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Artifact#remove.
#
# @!attribute [rw] id
#   @return [String]
ArtifactRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ArtifactCacheNamespace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactCacheNamespace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactCacheNamespace#load.
#
# @!attribute [rw] id
#   @return [String]
ArtifactCacheNamespaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactCacheNamespace#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactCacheNamespaceListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactCacheNamespace#create.
class ArtifactCacheNamespaceCreateData
end

# Request payload for ArtifactCacheNamespace#update.
#
# @!attribute [rw] id
#   @return [String]
ArtifactCacheNamespaceUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactCacheNamespace#patch.
#
# @!attribute [rw] id
#   @return [String]
ArtifactCacheNamespacePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactCacheNamespace#remove.
#
# @!attribute [rw] id
#   @return [String]
ArtifactCacheNamespaceRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ArtifactImageRepository entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactImageRepository = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactImageRepository#load.
#
# @!attribute [rw] id
#   @return [String]
ArtifactImageRepositoryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactImageRepository#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactImageRepositoryListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactImageRepository#create.
class ArtifactImageRepositoryCreateData
end

# Request payload for ArtifactImageRepository#update.
#
# @!attribute [rw] id
#   @return [String]
ArtifactImageRepositoryUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactImageRepository#patch.
#
# @!attribute [rw] id
#   @return [String]
ArtifactImageRepositoryPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactImageRepository#remove.
#
# @!attribute [rw] id
#   @return [String]
ArtifactImageRepositoryRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ArtifactPackageMirror entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactPackageMirror = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactPackageMirror#load.
#
# @!attribute [rw] id
#   @return [String]
ArtifactPackageMirrorLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactPackageMirror#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactPackageMirrorListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactPackageMirror#create.
class ArtifactPackageMirrorCreateData
end

# Request payload for ArtifactPackageMirror#update.
#
# @!attribute [rw] id
#   @return [String]
ArtifactPackageMirrorUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactPackageMirror#patch.
#
# @!attribute [rw] id
#   @return [String]
ArtifactPackageMirrorPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactPackageMirror#remove.
#
# @!attribute [rw] id
#   @return [String]
ArtifactPackageMirrorRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ArtifactRetentionPolicy entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactRetentionPolicy = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactRetentionPolicy#load.
#
# @!attribute [rw] id
#   @return [String]
ArtifactRetentionPolicyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactRetentionPolicy#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactRetentionPolicyListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactRetentionPolicy#create.
class ArtifactRetentionPolicyCreateData
end

# Request payload for ArtifactRetentionPolicy#update.
#
# @!attribute [rw] id
#   @return [String]
ArtifactRetentionPolicyUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactRetentionPolicy#patch.
#
# @!attribute [rw] id
#   @return [String]
ArtifactRetentionPolicyPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArtifactRetentionPolicy#remove.
#
# @!attribute [rw] id
#   @return [String]
ArtifactRetentionPolicyRemoveMatch = Struct.new(
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

# AuditEvent entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] actor_kind
#   @return [String]
#
# @!attribute [rw] actor_user_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] observability_space_id
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Object]
#
# @!attribute [rw] request_id
#   @return [Object]
#
# @!attribute [rw] severity
#   @return [String]
#
# @!attribute [rw] subject_id
#   @return [String]
#
# @!attribute [rw] subject_kind
#   @return [String]
#
# @!attribute [rw] subject_name
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
AuditEvent = Struct.new(
  :action,
  :actor_kind,
  :actor_user_id,
  :created_at,
  :created_at_label,
  :id,
  :observability_space_id,
  :organization_id,
  :payload,
  :request_id,
  :severity,
  :subject_id,
  :subject_kind,
  :subject_name,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for AuditEvent#list.
#
# @!attribute [rw] organization_id
#   @return [String]
AuditEventListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Auth entity data model.
class Auth
end

# Request payload for Auth#load.
class AuthLoadMatch
end

# Request payload for Auth#create.
#
# @!attribute [rw] cli_login_id
#   @return [Object, nil]
#
# @!attribute [rw] code
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [Object, nil]
#
# @!attribute [rw] invite_code
#   @return [Object, nil]
#
# @!attribute [rw] login_id
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] organization_invitation_token
#   @return [Object, nil]
#
# @!attribute [rw] password
#   @return [Object, nil]
#
# @!attribute [rw] polling_token
#   @return [Object, nil]
#
# @!attribute [rw] redirect_uri
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [Object, nil]
#
# @!attribute [rw] turnstile_token
#   @return [Object, nil]
AuthCreateData = Struct.new(
  :cli_login_id,
  :code,
  :email,
  :invite_code,
  :login_id,
  :name,
  :organization_invitation_token,
  :password,
  :polling_token,
  :redirect_uri,
  :state,
  :turnstile_token,
  keyword_init: true
)

# Request payload for Auth#remove.
class AuthRemoveMatch
end

# AuthCli entity data model.
class AuthCli
end

# Request payload for AuthCli#create.
#
# @!attribute [rw] client_kind
#   @return [Object, nil]
#
# @!attribute [rw] intent
#   @return [Object, nil]
#
# @!attribute [rw] login_id
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [Object, nil]
#
# @!attribute [rw] organization_slug
#   @return [Object, nil]
AuthCliCreateData = Struct.new(
  :client_kind,
  :intent,
  :login_id,
  :name,
  :organization_id,
  :organization_slug,
  keyword_init: true
)

# AuthGithub entity data model.
class AuthGithub
end

# Request payload for AuthGithub#load.
#
# @!attribute [rw] redirect_uri
#   @return [String]
AuthGithubLoadMatch = Struct.new(
  :redirect_uri,
  keyword_init: true
)

# AuthGoogle entity data model.
class AuthGoogle
end

# Request payload for AuthGoogle#load.
#
# @!attribute [rw] redirect_uri
#   @return [String]
AuthGoogleLoadMatch = Struct.new(
  :redirect_uri,
  keyword_init: true
)

# AuthOpenai entity data model.
class AuthOpenai
end

# Request payload for AuthOpenai#load.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
AuthOpenaiLoadMatch = Struct.new(
  :code,
  :error,
  :state,
  keyword_init: true
)

# AuthPasswordReset entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
AuthPasswordReset = Struct.new(
  :email,
  :message,
  :password,
  :token,
  keyword_init: true
)

# Request payload for AuthPasswordReset#create.
#
# @!attribute [rw] email
#   @return [String]
AuthPasswordResetCreateData = Struct.new(
  :email,
  keyword_init: true
)

# Request payload for AuthPasswordReset#update.
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
AuthPasswordResetUpdateData = Struct.new(
  :password,
  :token,
  keyword_init: true
)

# AuthRegistrationOption entity data model.
#
# @!attribute [rw] email_password_signup_enabled
#   @return [Boolean]
#
# @!attribute [rw] openai_sign_in_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] turnstile_site_key
#   @return [Object]
#
# @!attribute [rw] waitlist_enabled
#   @return [Boolean]
AuthRegistrationOption = Struct.new(
  :email_password_signup_enabled,
  :openai_sign_in_enabled,
  :turnstile_site_key,
  :waitlist_enabled,
  keyword_init: true
)

# Request payload for AuthRegistrationOption#list.
#
# @!attribute [rw] email_password_signup_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] openai_sign_in_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] turnstile_site_key
#   @return [Object, nil]
#
# @!attribute [rw] waitlist_enabled
#   @return [Boolean, nil]
AuthRegistrationOptionListMatch = Struct.new(
  :email_password_signup_enabled,
  :openai_sign_in_enabled,
  :turnstile_site_key,
  :waitlist_enabled,
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

# BackendRunnerPool entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
BackendRunnerPool = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BackendRunnerPool#list.
#
# @!attribute [rw] backend_id
#   @return [String]
BackendRunnerPoolListMatch = Struct.new(
  :backend_id,
  keyword_init: true
)

# Request payload for BackendRunnerPool#create.
#
# @!attribute [rw] backend_id
#   @return [String]
BackendRunnerPoolCreateData = Struct.new(
  :backend_id,
  keyword_init: true
)

# Request payload for BackendRunnerPool#remove.
#
# @!attribute [rw] backend_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BackendRunnerPoolRemoveMatch = Struct.new(
  :backend_id,
  :id,
  keyword_init: true
)

# Bazel entity data model.
class Bazel
end

# Request payload for Bazel#create.
class BazelCreateData
end

# BazelActionResult entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
BazelActionResult = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelActionResult#load.
#
# @!attribute [rw] action_result_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BazelActionResultLoadMatch = Struct.new(
  :action_result_id,
  :id,
  keyword_init: true
)

# Request payload for BazelActionResult#update.
#
# @!attribute [rw] action_result_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BazelActionResultUpdateData = Struct.new(
  :action_result_id,
  :id,
  keyword_init: true
)

# BazelBackend entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
BazelBackend = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBackend#load.
#
# @!attribute [rw] id
#   @return [String]
BazelBackendLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBackend#list.
#
# @!attribute [rw] id
#   @return [String, nil]
BazelBackendListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBackend#create.
class BazelBackendCreateData
end

# Request payload for BazelBackend#update.
#
# @!attribute [rw] id
#   @return [String]
BazelBackendUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBackend#patch.
#
# @!attribute [rw] id
#   @return [String]
BazelBackendPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBackend#remove.
#
# @!attribute [rw] id
#   @return [String]
BazelBackendRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# BazelBlob entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
BazelBlob = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelBlob#load.
#
# @!attribute [rw] blob_id
#   @return [String]
#
# @!attribute [rw] hash
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BazelBlobLoadMatch = Struct.new(
  :blob_id,
  :hash,
  :id,
  keyword_init: true
)

# Request payload for BazelBlob#update.
#
# @!attribute [rw] blob_id
#   @return [String]
#
# @!attribute [rw] hash
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BazelBlobUpdateData = Struct.new(
  :blob_id,
  :hash,
  :id,
  keyword_init: true
)

# BazelExecution entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
BazelExecution = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelExecution#load.
#
# @!attribute [rw] id
#   @return [String]
BazelExecutionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BazelExecution#create.
class BazelExecutionCreateData
end

# BazelFindMissingBlob entity data model.
class BazelFindMissingBlob
end

# Request payload for BazelFindMissingBlob#create.
class BazelFindMissingBlobCreateData
end

# Billing entity data model.
#
# @!attribute [rw] addons
#   @return [Array]
#
# @!attribute [rw] breakdown
#   @return [Object]
#
# @!attribute [rw] budget
#   @return [Object]
#
# @!attribute [rw] can_manage_contact
#   @return [Boolean]
#
# @!attribute [rw] can_manage_extra_spend
#   @return [Boolean]
#
# @!attribute [rw] can_manage_local_subscription
#   @return [Boolean]
#
# @!attribute [rw] can_manage_payment_method
#   @return [Boolean]
#
# @!attribute [rw] can_set_up_billing
#   @return [Boolean]
#
# @!attribute [rw] customer
#   @return [Object]
#
# @!attribute [rw] deployment_usage_visible
#   @return [Boolean]
#
# @!attribute [rw] entitlements
#   @return [Hash]
#
# @!attribute [rw] extra_spend_enabled
#   @return [Boolean]
#
# @!attribute [rw] feature_enabled
#   @return [Boolean]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] package
#   @return [Object]
#
# @!attribute [rw] prepaid
#   @return [Object]
#
# @!attribute [rw] preview
#   @return [Object]
#
# @!attribute [rw] storage_usage
#   @return [Hash]
#
# @!attribute [rw] stripe
#   @return [Hash]
#
# @!attribute [rw] subscription
#   @return [Object]
#
# @!attribute [rw] token_account
#   @return [Hash]
Billing = Struct.new(
  :addons,
  :breakdown,
  :budget,
  :can_manage_contact,
  :can_manage_extra_spend,
  :can_manage_local_subscription,
  :can_manage_payment_method,
  :can_set_up_billing,
  :customer,
  :deployment_usage_visible,
  :entitlements,
  :extra_spend_enabled,
  :feature_enabled,
  :organization_id,
  :package,
  :prepaid,
  :preview,
  :storage_usage,
  :stripe,
  :subscription,
  :token_account,
  keyword_init: true
)

# Request payload for Billing#load.
#
# @!attribute [rw] organization_id
#   @return [String]
BillingLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Billing#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] billing_email
#   @return [Object, nil]
#
# @!attribute [rw] cancel_at_period_end
#   @return [Object, nil]
#
# @!attribute [rw] enabled
#   @return [Object, nil]
#
# @!attribute [rw] monthly_cap_cents
#   @return [Object, nil]
BillingUpdateData = Struct.new(
  :organization_id,
  :billing_email,
  :cancel_at_period_end,
  :enabled,
  :monthly_cap_cents,
  keyword_init: true
)

# BillingAddon entity data model.
#
# @!attribute [rw] addons
#   @return [Array]
#
# @!attribute [rw] breakdown
#   @return [Object]
#
# @!attribute [rw] budget
#   @return [Object]
#
# @!attribute [rw] can_manage_contact
#   @return [Boolean]
#
# @!attribute [rw] can_manage_extra_spend
#   @return [Boolean]
#
# @!attribute [rw] can_manage_local_subscription
#   @return [Boolean]
#
# @!attribute [rw] can_manage_payment_method
#   @return [Boolean]
#
# @!attribute [rw] can_set_up_billing
#   @return [Boolean]
#
# @!attribute [rw] customer
#   @return [Object]
#
# @!attribute [rw] deployment_usage_visible
#   @return [Boolean]
#
# @!attribute [rw] entitlements
#   @return [Hash]
#
# @!attribute [rw] extra_spend_enabled
#   @return [Boolean]
#
# @!attribute [rw] feature_enabled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] package
#   @return [Object]
#
# @!attribute [rw] prepaid
#   @return [Object]
#
# @!attribute [rw] preview
#   @return [Object]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] storage_usage
#   @return [Hash]
#
# @!attribute [rw] stripe
#   @return [Hash]
#
# @!attribute [rw] subscription
#   @return [Object]
#
# @!attribute [rw] token_account
#   @return [Hash]
BillingAddon = Struct.new(
  :addons,
  :breakdown,
  :budget,
  :can_manage_contact,
  :can_manage_extra_spend,
  :can_manage_local_subscription,
  :can_manage_payment_method,
  :can_set_up_billing,
  :customer,
  :deployment_usage_visible,
  :entitlements,
  :extra_spend_enabled,
  :feature_enabled,
  :id,
  :organization_id,
  :package,
  :prepaid,
  :preview,
  :quantity,
  :storage_usage,
  :stripe,
  :subscription,
  :token_account,
  keyword_init: true
)

# Request payload for BillingAddon#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
BillingAddonUpdateData = Struct.new(
  :id,
  :organization_id,
  :quantity,
  keyword_init: true
)

# BillingCheckoutSession entity data model.
#
# @!attribute [rw] cancel_url
#   @return [String, nil]
#
# @!attribute [rw] coupon_code
#   @return [String, nil]
#
# @!attribute [rw] entry_point
#   @return [String, nil]
#
# @!attribute [rw] package_key
#   @return [String, nil]
#
# @!attribute [rw] package_revision
#   @return [Integer, nil]
#
# @!attribute [rw] success_url
#   @return [String, nil]
BillingCheckoutSession = Struct.new(
  :cancel_url,
  :coupon_code,
  :entry_point,
  :package_key,
  :package_revision,
  :success_url,
  keyword_init: true
)

# Request payload for BillingCheckoutSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cancel_url
#   @return [String, nil]
#
# @!attribute [rw] coupon_code
#   @return [String, nil]
#
# @!attribute [rw] entry_point
#   @return [String, nil]
#
# @!attribute [rw] package_key
#   @return [String, nil]
#
# @!attribute [rw] package_revision
#   @return [Integer, nil]
#
# @!attribute [rw] success_url
#   @return [String, nil]
BillingCheckoutSessionCreateData = Struct.new(
  :organization_id,
  :cancel_url,
  :coupon_code,
  :entry_point,
  :package_key,
  :package_revision,
  :success_url,
  keyword_init: true
)

# BillingInvoice entity data model.
#
# @!attribute [rw] amount_due_cents
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] hosted_invoice_url
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] invoice_pdf
#   @return [Object, nil]
#
# @!attribute [rw] metronome_invoice_id
#   @return [Object, nil]
#
# @!attribute [rw] number
#   @return [Object, nil]
#
# @!attribute [rw] period_ended_at
#   @return [Object, nil]
#
# @!attribute [rw] period_started_at
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] total_cents
#   @return [Integer]
BillingInvoice = Struct.new(
  :amount_due_cents,
  :created_at,
  :currency,
  :hosted_invoice_url,
  :id,
  :invoice_pdf,
  :metronome_invoice_id,
  :number,
  :period_ended_at,
  :period_started_at,
  :status,
  :total_cents,
  keyword_init: true
)

# Request payload for BillingInvoice#list.
#
# @!attribute [rw] organization_id
#   @return [String]
BillingInvoiceListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# BillingPackage entity data model.
#
# @!attribute [rw] addons
#   @return [Array]
#
# @!attribute [rw] base_price_cents
#   @return [Integer]
#
# @!attribute [rw] billing_interval
#   @return [String]
#
# @!attribute [rw] billing_policy
#   @return [String]
#
# @!attribute [rw] ci_included_spend_cents
#   @return [Integer, nil]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] max_seats
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pay_as_you_go_enabled
#   @return [Boolean]
#
# @!attribute [rw] rates
#   @return [Array]
#
# @!attribute [rw] revision
#   @return [Integer]
#
# @!attribute [rw] roder_daily_run_limit
#   @return [Integer, nil]
#
# @!attribute [rw] roder_run_concurrency_limit
#   @return [Integer, nil]
#
# @!attribute [rw] seat_price_cents
#   @return [Integer]
#
# @!attribute [rw] trial_days
#   @return [Integer]
#
# @!attribute [rw] visibility
#   @return [String]
BillingPackage = Struct.new(
  :addons,
  :base_price_cents,
  :billing_interval,
  :billing_policy,
  :ci_included_spend_cents,
  :currency,
  :key,
  :max_seats,
  :name,
  :pay_as_you_go_enabled,
  :rates,
  :revision,
  :roder_daily_run_limit,
  :roder_run_concurrency_limit,
  :seat_price_cents,
  :trial_days,
  :visibility,
  keyword_init: true
)

# Request payload for BillingPackage#list.
#
# @!attribute [rw] addons
#   @return [Array, nil]
#
# @!attribute [rw] base_price_cents
#   @return [Integer, nil]
#
# @!attribute [rw] billing_interval
#   @return [String, nil]
#
# @!attribute [rw] billing_policy
#   @return [String, nil]
#
# @!attribute [rw] ci_included_spend_cents
#   @return [Integer, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] max_seats
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pay_as_you_go_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] rates
#   @return [Array, nil]
#
# @!attribute [rw] revision
#   @return [Integer, nil]
#
# @!attribute [rw] roder_daily_run_limit
#   @return [Integer, nil]
#
# @!attribute [rw] roder_run_concurrency_limit
#   @return [Integer, nil]
#
# @!attribute [rw] seat_price_cents
#   @return [Integer, nil]
#
# @!attribute [rw] trial_days
#   @return [Integer, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
BillingPackageListMatch = Struct.new(
  :addons,
  :base_price_cents,
  :billing_interval,
  :billing_policy,
  :ci_included_spend_cents,
  :currency,
  :key,
  :max_seats,
  :name,
  :pay_as_you_go_enabled,
  :rates,
  :revision,
  :roder_daily_run_limit,
  :roder_run_concurrency_limit,
  :seat_price_cents,
  :trial_days,
  :visibility,
  keyword_init: true
)

# BillingPortalSession entity data model.
#
# @!attribute [rw] return_url
#   @return [String, nil]
BillingPortalSession = Struct.new(
  :return_url,
  keyword_init: true
)

# Request payload for BillingPortalSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] return_url
#   @return [String, nil]
BillingPortalSessionCreateData = Struct.new(
  :organization_id,
  :return_url,
  keyword_init: true
)

# BillingPrepaidPeriod entity data model.
#
# @!attribute [rw] activated_at
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] minutes
#   @return [Integer]
#
# @!attribute [rw] net_amount_cents
#   @return [Integer]
#
# @!attribute [rw] paid_at
#   @return [Object]
#
# @!attribute [rw] paid_total_cents
#   @return [Object]
#
# @!attribute [rw] payment_action_url
#   @return [Object]
#
# @!attribute [rw] period_ended_at
#   @return [String]
#
# @!attribute [rw] period_started_at
#   @return [String]
#
# @!attribute [rw] receipt_url
#   @return [Object]
#
# @!attribute [rw] refunded_net_cents
#   @return [Integer]
#
# @!attribute [rw] state
#   @return [String]
BillingPrepaidPeriod = Struct.new(
  :activated_at,
  :created_at,
  :currency,
  :id,
  :last_error,
  :minutes,
  :net_amount_cents,
  :paid_at,
  :paid_total_cents,
  :payment_action_url,
  :period_ended_at,
  :period_started_at,
  :receipt_url,
  :refunded_net_cents,
  :state,
  keyword_init: true
)

# Request payload for BillingPrepaidPeriod#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BillingPrepaidPeriodLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# BillingPrepaidPurchase entity data model.
#
# @!attribute [rw] activated_at
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] minutes
#   @return [Integer]
#
# @!attribute [rw] net_amount_cents
#   @return [Integer]
#
# @!attribute [rw] paid_at
#   @return [Object]
#
# @!attribute [rw] paid_total_cents
#   @return [Object]
#
# @!attribute [rw] payment_action_url
#   @return [Object]
#
# @!attribute [rw] prepaid
#   @return [Hash]
#
# @!attribute [rw] purchase
#   @return [Hash]
#
# @!attribute [rw] receipt_url
#   @return [Object]
#
# @!attribute [rw] refunded_net_cents
#   @return [Integer]
#
# @!attribute [rw] request_key
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
BillingPrepaidPurchase = Struct.new(
  :activated_at,
  :created_at,
  :currency,
  :id,
  :last_error,
  :minutes,
  :net_amount_cents,
  :paid_at,
  :paid_total_cents,
  :payment_action_url,
  :prepaid,
  :purchase,
  :receipt_url,
  :refunded_net_cents,
  :request_key,
  :state,
  keyword_init: true
)

# Request payload for BillingPrepaidPurchase#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
BillingPrepaidPurchaseLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for BillingPrepaidPurchase#list.
#
# @!attribute [rw] organization_id
#   @return [String]
BillingPrepaidPurchaseListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for BillingPrepaidPurchase#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] minutes
#   @return [Integer]
#
# @!attribute [rw] request_key
#   @return [String]
BillingPrepaidPurchaseCreateData = Struct.new(
  :organization_id,
  :minutes,
  :request_key,
  keyword_init: true
)

# BillingTokenTopUp entity data model.
#
# @!attribute [rw] amount_cents
#   @return [Integer]
#
# @!attribute [rw] request_key
#   @return [String]
BillingTokenTopUp = Struct.new(
  :amount_cents,
  :request_key,
  keyword_init: true
)

# Request payload for BillingTokenTopUp#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] amount_cents
#   @return [Integer]
#
# @!attribute [rw] request_key
#   @return [String]
BillingTokenTopUpCreateData = Struct.new(
  :organization_id,
  :amount_cents,
  :request_key,
  keyword_init: true
)

# BillingUsage entity data model.
class BillingUsage
end

# Request payload for BillingUsage#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] meter
#   @return [String, nil]
#
# @!attribute [rw] window
#   @return [String, nil]
BillingUsageLoadMatch = Struct.new(
  :organization_id,
  :meter,
  :window,
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

# BookmarkProtectionRefreshGithubRequiredCheck entity data model.
#
# @!attribute [rw] exclusions
#   @return [Array]
#
# @!attribute [rw] fetched_at
#   @return [Object, nil]
#
# @!attribute [rw] fetched_at_label
#   @return [Object, nil]
#
# @!attribute [rw] github_branch
#   @return [String]
#
# @!attribute [rw] github_owner
#   @return [Object, nil]
#
# @!attribute [rw] github_repository_name
#   @return [Object, nil]
#
# @!attribute [rw] last_error
#   @return [Object, nil]
#
# @!attribute [rw] proven
#   @return [Boolean]
#
# @!attribute [rw] requirements
#   @return [Array]
#
# @!attribute [rw] stale
#   @return [Boolean]
BookmarkProtectionRefreshGithubRequiredCheck = Struct.new(
  :exclusions,
  :fetched_at,
  :fetched_at_label,
  :github_branch,
  :github_owner,
  :github_repository_name,
  :last_error,
  :proven,
  :requirements,
  :stale,
  keyword_init: true
)

# Request payload for BookmarkProtectionRefreshGithubRequiredCheck#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] github_branch
#   @return [String, nil]
BookmarkProtectionRefreshGithubRequiredCheckCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :github_branch,
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

# CacheNamespaceEntry entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CacheNamespaceEntry = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#load.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CacheNamespaceEntryLoadMatch = Struct.new(
  :cache_namespace_id,
  :id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#list.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
CacheNamespaceEntryListMatch = Struct.new(
  :cache_namespace_id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#create.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
CacheNamespaceEntryCreateData = Struct.new(
  :cache_namespace_id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#update.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CacheNamespaceEntryUpdateData = Struct.new(
  :cache_namespace_id,
  :id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#patch.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CacheNamespaceEntryPatchData = Struct.new(
  :cache_namespace_id,
  :id,
  keyword_init: true
)

# Request payload for CacheNamespaceEntry#remove.
#
# @!attribute [rw] cache_namespace_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CacheNamespaceEntryRemoveMatch = Struct.new(
  :cache_namespace_id,
  :id,
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

# Change entity data model.
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] filters
#   @return [Hash]
#
# @!attribute [rw] github_sync
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Object]
Change = Struct.new(
  :counts,
  :filters,
  :github_sync,
  :result,
  keyword_init: true
)

# Request payload for Change#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] awaiting_review
#   @return [Boolean, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] group_page
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] mine
#   @return [Boolean, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] stack
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
#
# @!attribute [rw] tips_only
#   @return [Boolean, nil]
#
# @!attribute [rw] view
#   @return [String, nil]
ChangeListMatch = Struct.new(
  :organization_id,
  :author,
  :awaiting_review,
  :direction,
  :group_page,
  :label,
  :mine,
  :number,
  :page,
  :q,
  :repo,
  :sort,
  :source,
  :stack,
  :state,
  :target,
  :tips_only,
  :view,
  keyword_init: true
)

# ChangeAsset entity data model.
#
# @!attribute [rw] alias
#   @return [String]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] checksum_md5
#   @return [String]
#
# @!attribute [rw] checksum_sha256
#   @return [String]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] filename
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
ChangeAsset = Struct.new(
  :alias,
  :byte_size,
  :checksum_md5,
  :checksum_sha256,
  :content_type,
  :filename,
  :id,
  keyword_init: true
)

# Request payload for ChangeAsset#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] alias
#   @return [String]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] checksum_md5
#   @return [String]
#
# @!attribute [rw] checksum_sha256
#   @return [String]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] filename
#   @return [String]
ChangeAssetCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :alias,
  :byte_size,
  :checksum_md5,
  :checksum_sha256,
  :content_type,
  :filename,
  keyword_init: true
)

# ChangeComment entity data model.
#
# @!attribute [rw] body
#   @return [String]
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] change_id
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] created_at_label
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [Object, nil]
#
# @!attribute [rw] line
#   @return [Object, nil]
#
# @!attribute [rw] outdated
#   @return [Boolean]
#
# @!attribute [rw] parent_comment_id
#   @return [Object, nil]
#
# @!attribute [rw] patchset_id
#   @return [Object, nil]
#
# @!attribute [rw] patchset_number
#   @return [Object]
#
# @!attribute [rw] path
#   @return [Object, nil]
#
# @!attribute [rw] replies
#   @return [Array, nil]
#
# @!attribute [rw] resolved
#   @return [Boolean]
#
# @!attribute [rw] resolved_at
#   @return [Object, nil]
#
# @!attribute [rw] resolved_at_label
#   @return [Object, nil]
#
# @!attribute [rw] resolved_by
#   @return [Hash]
#
# @!attribute [rw] side
#   @return [Object, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] updated_at_label
#   @return [Object, nil]
#
# @!attribute [rw] user
#   @return [Hash]
ChangeComment = Struct.new(
  :body,
  :capabilities,
  :change_id,
  :created_at,
  :created_at_label,
  :id,
  :kind,
  :line,
  :outdated,
  :parent_comment_id,
  :patchset_id,
  :patchset_number,
  :path,
  :replies,
  :resolved,
  :resolved_at,
  :resolved_at_label,
  :resolved_by,
  :side,
  :updated_at,
  :updated_at_label,
  :user,
  keyword_init: true
)

# Request payload for ChangeComment#list.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] resolved
#   @return [Boolean, nil]
ChangeCommentListMatch = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :path,
  :resolved,
  keyword_init: true
)

# Request payload for ChangeComment#create.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] body
#   @return [String]
#
# @!attribute [rw] kind
#   @return [Object, nil]
#
# @!attribute [rw] line
#   @return [Object, nil]
#
# @!attribute [rw] parent_comment_id
#   @return [Object, nil]
#
# @!attribute [rw] patchset_id
#   @return [Object, nil]
#
# @!attribute [rw] path
#   @return [Object, nil]
#
# @!attribute [rw] side
#   @return [Object, nil]
ChangeCommentCreateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :body,
  :kind,
  :line,
  :parent_comment_id,
  :patchset_id,
  :path,
  :side,
  keyword_init: true
)

# ChangeFileReviewCheckpoint entity data model.
#
# @!attribute [rw] patchset_id
#   @return [String]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] request_id
#   @return [String]
#
# @!attribute [rw] review_action
#   @return [String]
ChangeFileReviewCheckpoint = Struct.new(
  :patchset_id,
  :path,
  :request_id,
  :review_action,
  keyword_init: true
)

# Request payload for ChangeFileReviewCheckpoint#create.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] patchset_id
#   @return [String]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] request_id
#   @return [String]
#
# @!attribute [rw] review_action
#   @return [String]
ChangeFileReviewCheckpointCreateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :patchset_id,
  :path,
  :request_id,
  :review_action,
  keyword_init: true
)

# ChangeGitBranchSubmission entity data model.
class ChangeGitBranchSubmission
end

# Request payload for ChangeGitBranchSubmission#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeGitBranchSubmissionCreateData = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# ChangeGitCommitIdentity entity data model.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] change_number
#   @return [Integer]
#
# @!attribute [rw] git_commit_id
#   @return [String]
#
# @!attribute [rw] git_commit_ids
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identities
#   @return [Array]
#
# @!attribute [rw] missing_git_commit_ids
#   @return [Array]
#
# @!attribute [rw] patchset_number
#   @return [Integer]
ChangeGitCommitIdentity = Struct.new(
  :change_id,
  :change_number,
  :git_commit_id,
  :git_commit_ids,
  :id,
  :identities,
  :missing_git_commit_ids,
  :patchset_number,
  keyword_init: true
)

# Request payload for ChangeGitCommitIdentity#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeGitCommitIdentityLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for ChangeGitCommitIdentity#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] git_commit_ids
#   @return [Array]
ChangeGitCommitIdentityCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :git_commit_ids,
  keyword_init: true
)

# ChangeGitPublication entity data model.
#
# @!attribute [rw] expected_target_commit_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] operation_key
#   @return [String]
#
# @!attribute [rw] publication_id
#   @return [String]
#
# @!attribute [rw] request
#   @return [Hash]
#
# @!attribute [rw] request_digest
#   @return [String]
#
# @!attribute [rw] revisions
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] transfer_refs
#   @return [Array, nil]
ChangeGitPublication = Struct.new(
  :expected_target_commit_id,
  :id,
  :operation_key,
  :publication_id,
  :request,
  :request_digest,
  :revisions,
  :status,
  :transfer_refs,
  keyword_init: true
)

# Request payload for ChangeGitPublication#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeGitPublicationLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for ChangeGitPublication#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] operation_key
#   @return [String]
#
# @!attribute [rw] request
#   @return [Hash]
ChangeGitPublicationCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :operation_key,
  :request,
  keyword_init: true
)

# ChangeGroupMember entity data model.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [Object]
ChangeGroupMember = Struct.new(
  :change_id,
  :changes,
  :id,
  :name,
  :number,
  :status,
  :title,
  keyword_init: true
)

# Request payload for ChangeGroupMember#create.
#
# @!attribute [rw] change_group_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] change_id
#   @return [String]
ChangeGroupMemberCreateData = Struct.new(
  :change_group_id,
  :organization_id,
  :repo_id,
  :change_id,
  keyword_init: true
)

# Request payload for ChangeGroupMember#remove.
#
# @!attribute [rw] change_group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeGroupMemberRemoveMatch = Struct.new(
  :change_group_id,
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# ChangeLabel entity data model.
#
# @!attribute [rw] accepted
#   @return [Boolean, nil]
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] approval
#   @return [Hash]
#
# @!attribute [rw] assets
#   @return [Array, nil]
#
# @!attribute [rw] author
#   @return [Object, nil]
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] change_key
#   @return [String, nil]
#
# @!attribute [rw] checks
#   @return [Array, nil]
#
# @!attribute [rw] checks_status
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Array, nil]
#
# @!attribute [rw] comments_count
#   @return [Integer, nil]
#
# @!attribute [rw] comments_count_label
#   @return [String, nil]
#
# @!attribute [rw] commit_message
#   @return [Object, nil]
#
# @!attribute [rw] current_patchset
#   @return [Hash]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] draft
#   @return [Boolean, nil]
#
# @!attribute [rw] folded_into_number
#   @return [Object, nil]
#
# @!attribute [rw] github_projection_status
#   @return [Object, nil]
#
# @!attribute [rw] github_pull_request
#   @return [Hash]
#
# @!attribute [rw] github_pull_requests
#   @return [Array, nil]
#
# @!attribute [rw] group
#   @return [Object, nil]
#
# @!attribute [rw] has_description
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jj_change_id
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] landable
#   @return [Boolean, nil]
#
# @!attribute [rw] landed_by
#   @return [Hash]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] orphaned
#   @return [Boolean, nil]
#
# @!attribute [rw] orphaned_at
#   @return [String, nil]
#
# @!attribute [rw] orphaned_at_label
#   @return [String, nil]
#
# @!attribute [rw] orphaned_reason
#   @return [String, nil]
#
# @!attribute [rw] parent_change_id
#   @return [Object, nil]
#
# @!attribute [rw] parent_change_number
#   @return [Object, nil]
#
# @!attribute [rw] patchset_number
#   @return [Object, nil]
#
# @!attribute [rw] patchsets
#   @return [Array, nil]
#
# @!attribute [rw] primary_status
#   @return [Object, nil]
#
# @!attribute [rw] public_id
#   @return [String, nil]
#
# @!attribute [rw] relation_chain
#   @return [Array, nil]
#
# @!attribute [rw] remove
#   @return [Array, nil]
#
# @!attribute [rw] requested_changes
#   @return [Boolean, nil]
#
# @!attribute [rw] restack_state
#   @return [String, nil]
#
# @!attribute [rw] reviewer_candidates
#   @return [Array, nil]
#
# @!attribute [rw] reviewers
#   @return [Array, nil]
#
# @!attribute [rw] stable_change_id
#   @return [String, nil]
#
# @!attribute [rw] stack
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] target_branch
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] unresolved_comments_count_label
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] votes
#   @return [Array, nil]
ChangeLabel = Struct.new(
  :accepted,
  :add,
  :approval,
  :assets,
  :author,
  :capabilities,
  :change_key,
  :checks,
  :checks_status,
  :comments,
  :comments_count,
  :comments_count_label,
  :commit_message,
  :current_patchset,
  :description,
  :draft,
  :folded_into_number,
  :github_projection_status,
  :github_pull_request,
  :github_pull_requests,
  :group,
  :has_description,
  :id,
  :jj_change_id,
  :labels,
  :landable,
  :landed_by,
  :number,
  :orphaned,
  :orphaned_at,
  :orphaned_at_label,
  :orphaned_reason,
  :parent_change_id,
  :parent_change_number,
  :patchset_number,
  :patchsets,
  :primary_status,
  :public_id,
  :relation_chain,
  :remove,
  :requested_changes,
  :restack_state,
  :reviewer_candidates,
  :reviewers,
  :stable_change_id,
  :stack,
  :status,
  :target_branch,
  :title,
  :unresolved_comments_count_label,
  :url,
  :votes,
  keyword_init: true
)

# Request payload for ChangeLabel#update.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] remove
#   @return [Array, nil]
ChangeLabelUpdateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :add,
  :labels,
  :remove,
  keyword_init: true
)

# ChangeLandingHold entity data model.
class ChangeLandingHold
end

# Request payload for ChangeLandingHold#create.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeLandingHoldCreateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# ChangeLandingRequest entity data model.
#
# @!attribute [rw] change_ids
#   @return [Array, nil]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] defer_until_ready
#   @return [Boolean, nil]
#
# @!attribute [rw] expected_requirement_version
#   @return [String, nil]
#
# @!attribute [rw] expected_scope_version
#   @return [String, nil]
#
# @!attribute [rw] head_change_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Object, nil]
#
# @!attribute [rw] numbers
#   @return [Array]
#
# @!attribute [rw] override_acknowledged
#   @return [Boolean, nil]
#
# @!attribute [rw] override_codes
#   @return [Array, nil]
#
# @!attribute [rw] position
#   @return [Integer, nil]
#
# @!attribute [rw] priority
#   @return [String, nil]
#
# @!attribute [rw] scope_version
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ChangeLandingRequest = Struct.new(
  :change_ids,
  :count,
  :defer_until_ready,
  :expected_requirement_version,
  :expected_scope_version,
  :head_change_id,
  :id,
  :numbers,
  :override_acknowledged,
  :override_codes,
  :position,
  :priority,
  :scope_version,
  :state,
  :version,
  keyword_init: true
)

# Request payload for ChangeLandingRequest#create.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] defer_until_ready
#   @return [Boolean, nil]
#
# @!attribute [rw] expected_requirement_version
#   @return [String, nil]
#
# @!attribute [rw] expected_scope_version
#   @return [String, nil]
#
# @!attribute [rw] override_acknowledged
#   @return [Boolean, nil]
#
# @!attribute [rw] override_codes
#   @return [Array, nil]
#
# @!attribute [rw] priority
#   @return [String, nil]
ChangeLandingRequestCreateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :defer_until_ready,
  :expected_requirement_version,
  :expected_scope_version,
  :override_acknowledged,
  :override_codes,
  :priority,
  keyword_init: true
)

# Request payload for ChangeLandingRequest#remove.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeLandingRequestRemoveMatch = Struct.new(
  :change_id,
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# ChangeRequestChange entity data model.
#
# @!attribute [rw] message
#   @return [Object, nil]
ChangeRequestChange = Struct.new(
  :message,
  keyword_init: true
)

# Request payload for ChangeRequestChange#create.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] message
#   @return [Object, nil]
ChangeRequestChangeCreateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :message,
  keyword_init: true
)

# ChangeReviewer entity data model.
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] remove
#   @return [Array, nil]
#
# @!attribute [rw] removed_reviewers
#   @return [Array]
#
# @!attribute [rw] requested_reviewers
#   @return [Array]
#
# @!attribute [rw] reviewers
#   @return [Array]
ChangeReviewer = Struct.new(
  :add,
  :email,
  :name,
  :remove,
  :removed_reviewers,
  :requested_reviewers,
  :reviewers,
  keyword_init: true
)

# Request payload for ChangeReviewer#list.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeReviewerListMatch = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for ChangeReviewer#update.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] remove
#   @return [Array, nil]
ChangeReviewerUpdateData = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  :add,
  :remove,
  keyword_init: true
)

# ChangeTranscript entity data model.
#
# @!attribute [rw] capture_kind
#   @return [String]
#
# @!attribute [rw] captured_at
#   @return [String]
#
# @!attribute [rw] harness
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] original_resume
#   @return [Object, nil]
#
# @!attribute [rw] patchset_commit_id
#   @return [String]
#
# @!attribute [rw] patchset_number
#   @return [Integer]
#
# @!attribute [rw] redaction_count
#   @return [Integer]
#
# @!attribute [rw] session_id
#   @return [Object, nil]
#
# @!attribute [rw] session_title
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] superseded
#   @return [Boolean]
#
# @!attribute [rw] user
#   @return [Hash]
ChangeTranscript = Struct.new(
  :capture_kind,
  :captured_at,
  :harness,
  :id,
  :original_resume,
  :patchset_commit_id,
  :patchset_number,
  :redaction_count,
  :session_id,
  :session_title,
  :status,
  :superseded,
  :user,
  keyword_init: true
)

# Request payload for ChangeTranscript#list.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
ChangeTranscriptListMatch = Struct.new(
  :change_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# ChangeTranscriptSummary entity data model.
#
# @!attribute [rw] summaries
#   @return [Hash]
ChangeTranscriptSummary = Struct.new(
  :summaries,
  keyword_init: true
)

# Request payload for ChangeTranscriptSummary#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] ids
#   @return [String]
ChangeTranscriptSummaryListMatch = Struct.new(
  :organization_id,
  :ids,
  keyword_init: true
)

# CheckpointPrepareChunk entity data model.
class CheckpointPrepareChunk
end

# Request payload for CheckpointPrepareChunk#create.
#
# @!attribute [rw] agent_session_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
CheckpointPrepareChunkCreateData = Struct.new(
  :agent_session_id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# CiNode entity data model.
#
# @!attribute [rw] architecture
#   @return [Object]
#
# @!attribute [rw] bazel_enabled
#   @return [Boolean]
#
# @!attribute [rw] bazel_properties_json
#   @return [Object]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [String]
#
# @!attribute [rw] cordoned_at
#   @return [Object]
#
# @!attribute [rw] cordoned_at_label
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] health_state
#   @return [String]
#
# @!attribute [rw] heartbeat_age_seconds
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] labels_csv
#   @return [Object]
#
# @!attribute [rw] last_seen_at
#   @return [Object]
#
# @!attribute [rw] last_seen_at_label
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_peer_id
#   @return [Object]
#
# @!attribute [rw] node_capabilities_csv
#   @return [Object]
#
# @!attribute [rw] node_certificate_expires_at
#   @return [Object]
#
# @!attribute [rw] node_certificate_expires_at_label
#   @return [Object]
#
# @!attribute [rw] node_certificate_fingerprint_sha256
#   @return [Object]
#
# @!attribute [rw] node_certificate_serial
#   @return [Object]
#
# @!attribute [rw] offline_at
#   @return [Object]
#
# @!attribute [rw] offline_at_label
#   @return [Object]
#
# @!attribute [rw] online_at
#   @return [Object]
#
# @!attribute [rw] online_at_label
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] os
#   @return [Object]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] revoked_at_label
#   @return [Object]
#
# @!attribute [rw] schedulable
#   @return [Boolean]
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
# @!attribute [rw] version
#   @return [Object]
CiNode = Struct.new(
  :architecture,
  :bazel_enabled,
  :bazel_properties_json,
  :ci_runner_pool_id,
  :cordoned_at,
  :cordoned_at_label,
  :created_at,
  :created_at_label,
  :health_state,
  :heartbeat_age_seconds,
  :id,
  :kind,
  :labels_csv,
  :last_seen_at,
  :last_seen_at_label,
  :name,
  :network_peer_id,
  :node_capabilities_csv,
  :node_certificate_expires_at,
  :node_certificate_expires_at_label,
  :node_certificate_fingerprint_sha256,
  :node_certificate_serial,
  :offline_at,
  :offline_at_label,
  :online_at,
  :online_at_label,
  :organization_id,
  :os,
  :revoked_at,
  :revoked_at_label,
  :schedulable,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  :version,
  keyword_init: true
)

# Request payload for CiNode#load.
#
# @!attribute [rw] id
#   @return [String]
CiNodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CiNode#create.
class CiNodeCreateData
end

# CiPipeline entity data model.
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object]
#
# @!attribute [rw] concurrency_key
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] default_branch
#   @return [Object]
#
# @!attribute [rw] description
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
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] required_capabilities_csv
#   @return [Object]
#
# @!attribute [rw] runner_pool
#   @return [Object]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_kind
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
#
# @!attribute [rw] trigger_on_pull_request
#   @return [Boolean]
#
# @!attribute [rw] trigger_on_push
#   @return [Boolean]
#
# @!attribute [rw] trigger_on_schedule
#   @return [Boolean]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] workflow_path
#   @return [Object]
CiPipeline = Struct.new(
  :ci_runner_pool_id,
  :concurrency_key,
  :created_at,
  :default_branch,
  :description,
  :hosted_app_id,
  :id,
  :name,
  :organization_id,
  :repository_id,
  :required_capabilities_csv,
  :runner_pool,
  :runs,
  :slug,
  :source_kind,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :trigger_on_pull_request,
  :trigger_on_push,
  :trigger_on_schedule,
  :updated_at,
  :workflow_path,
  keyword_init: true
)

# Request payload for CiPipeline#load.
#
# @!attribute [rw] id
#   @return [String]
CiPipelineLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CiPipeline#list.
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object, nil]
#
# @!attribute [rw] concurrency_key
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] default_branch
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] required_capabilities_csv
#   @return [Object, nil]
#
# @!attribute [rw] runner_pool
#   @return [Object, nil]
#
# @!attribute [rw] runs
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_kind
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] status_label
#   @return [String, nil]
#
# @!attribute [rw] status_state
#   @return [String, nil]
#
# @!attribute [rw] status_tone
#   @return [String, nil]
#
# @!attribute [rw] trigger_on_pull_request
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_push
#   @return [Boolean, nil]
#
# @!attribute [rw] trigger_on_schedule
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] workflow_path
#   @return [Object, nil]
CiPipelineListMatch = Struct.new(
  :ci_runner_pool_id,
  :concurrency_key,
  :created_at,
  :default_branch,
  :description,
  :hosted_app_id,
  :id,
  :name,
  :organization_id,
  :repository_id,
  :required_capabilities_csv,
  :runner_pool,
  :runs,
  :slug,
  :source_kind,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :trigger_on_pull_request,
  :trigger_on_push,
  :trigger_on_schedule,
  :updated_at,
  :workflow_path,
  keyword_init: true
)

# Request payload for CiPipeline#create.
class CiPipelineCreateData
end

# CiPipelineRun entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] canceled_at
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_id
#   @return [String]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object]
#
# @!attribute [rw] commit_sha
#   @return [Object]
#
# @!attribute [rw] concurrency_key
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] creator_user_id
#   @return [Object]
#
# @!attribute [rw] display_id
#   @return [Integer]
#
# @!attribute [rw] failed
#   @return [Boolean]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jobs
#   @return [Array]
#
# @!attribute [rw] message
#   @return [Object]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] parameters_json
#   @return [Object]
#
# @!attribute [rw] queued_at
#   @return [Object]
#
# @!attribute [rw] ref_name
#   @return [Object]
#
# @!attribute [rw] repository_id
#   @return [Object]
#
# @!attribute [rw] required_capabilities_csv
#   @return [Object]
#
# @!attribute [rw] retry_number
#   @return [Integer]
#
# @!attribute [rw] retryable
#   @return [Boolean]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_url
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
#
# @!attribute [rw] trigger_kind
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
CiPipelineRun = Struct.new(
  :active,
  :canceled_at,
  :ci_pipeline_id,
  :ci_runner_pool_id,
  :commit_sha,
  :concurrency_key,
  :created_at,
  :creator_user_id,
  :display_id,
  :failed,
  :finished_at,
  :hosted_app_id,
  :id,
  :jobs,
  :message,
  :number,
  :organization_id,
  :parameters_json,
  :queued_at,
  :ref_name,
  :repository_id,
  :required_capabilities_csv,
  :retry_number,
  :retryable,
  :slug,
  :source_url,
  :started_at,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :trigger_kind,
  :updated_at,
  keyword_init: true
)

# Request payload for CiPipelineRun#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
CiPipelineRunLoadMatch = Struct.new(
  :id,
  :pipeline_id,
  keyword_init: true
)

# Request payload for CiPipelineRun#list.
#
# @!attribute [rw] pipeline_id
#   @return [String]
CiPipelineRunListMatch = Struct.new(
  :pipeline_id,
  keyword_init: true
)

# Request payload for CiPipelineRun#create.
#
# @!attribute [rw] pipeline_id
#   @return [String]
CiPipelineRunCreateData = Struct.new(
  :pipeline_id,
  keyword_init: true
)

# CiRunnerPool entity data model.
#
# @!attribute [rw] bazel_enabled
#   @return [Boolean]
#
# @!attribute [rw] bazel_properties_json
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] elastic_config_json
#   @return [Object]
#
# @!attribute [rw] elastic_provider_kind
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] isolation_mode
#   @return [String]
#
# @!attribute [rw] labels_csv
#   @return [Object]
#
# @!attribute [rw] max_concurrency
#   @return [Integer]
#
# @!attribute [rw] modal_capacity
#   @return [Hash]
#
# @!attribute [rw] modal_runner_invocations
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_space_id
#   @return [Object]
#
# @!attribute [rw] node_capabilities_csv
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] runner_count_label
#   @return [String]
#
# @!attribute [rw] runner_kind
#   @return [String]
#
# @!attribute [rw] runners
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
CiRunnerPool = Struct.new(
  :bazel_enabled,
  :bazel_properties_json,
  :created_at,
  :description,
  :elastic_config_json,
  :elastic_provider_kind,
  :id,
  :isolation_mode,
  :labels_csv,
  :max_concurrency,
  :modal_capacity,
  :modal_runner_invocations,
  :name,
  :network_space_id,
  :node_capabilities_csv,
  :organization_id,
  :runner_count_label,
  :runner_kind,
  :runners,
  :slug,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for CiRunnerPool#load.
#
# @!attribute [rw] id
#   @return [String]
CiRunnerPoolLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CiRunnerPool#list.
#
# @!attribute [rw] organization_id
#   @return [String, nil]
CiRunnerPoolListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for CiRunnerPool#create.
class CiRunnerPoolCreateData
end

# Request payload for CiRunnerPool#update.
#
# @!attribute [rw] id
#   @return [String]
CiRunnerPoolUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CiRunnerPool#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] elastic_config_json
#   @return [Object, nil]
#
# @!attribute [rw] elastic_provider_kind
#   @return [Object, nil]
#
# @!attribute [rw] isolation_mode
#   @return [String, nil]
#
# @!attribute [rw] labels_csv
#   @return [Object, nil]
#
# @!attribute [rw] max_concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] node_capabilities_csv
#   @return [Object, nil]
#
# @!attribute [rw] runner_kind
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
CiRunnerPoolPatchData = Struct.new(
  :id,
  :description,
  :elastic_config_json,
  :elastic_provider_kind,
  :isolation_mode,
  :labels_csv,
  :max_concurrency,
  :node_capabilities_csv,
  :runner_kind,
  :status,
  keyword_init: true
)

# CiStatus entity data model.
class CiStatus
end

# Request payload for CiStatus#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String, nil]
CiStatusLoadMatch = Struct.new(
  :organization_id,
  :repo_id,
  :ref,
  keyword_init: true
)

# CliEvent entity data model.
#
# @!attribute [rw] event
#   @return [String]
#
# @!attribute [rw] properties
#   @return [Hash]
CliEvent = Struct.new(
  :event,
  :properties,
  keyword_init: true
)

# Request payload for CliEvent#create.
#
# @!attribute [rw] event
#   @return [String]
#
# @!attribute [rw] properties
#   @return [Hash]
CliEventCreateData = Struct.new(
  :event,
  :properties,
  keyword_init: true
)

# CliRelease entity data model.
class CliRelease
end

# Request payload for CliRelease#load.
class CliReleaseLoadMatch
end

# Request payload for CliRelease#list.
class CliReleaseListMatch
end

# Request payload for CliRelease#create.
class CliReleaseCreateData
end

# CloudWorkspaceBackupObject entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
CloudWorkspaceBackupObject = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for CloudWorkspaceBackupObject#load.
#
# @!attribute [rw] cloud_workspace_backup_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
CloudWorkspaceBackupObjectLoadMatch = Struct.new(
  :cloud_workspace_backup_id,
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# CodeRuleEvaluation entity data model.
#
# @!attribute [rw] advisory
#   @return [Boolean]
#
# @!attribute [rw] coverage
#   @return [Hash]
#
# @!attribute [rw] diff
#   @return [String]
#
# @!attribute [rw] duration_ms
#   @return [Integer]
#
# @!attribute [rw] evaluator_version
#   @return [String, nil]
#
# @!attribute [rw] input_digest
#   @return [Object, nil]
#
# @!attribute [rw] limits
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] requests
#   @return [Hash]
#
# @!attribute [rw] schema_version
#   @return [Integer]
#
# @!attribute [rw] snapshot_digest
#   @return [Object, nil]
#
# @!attribute [rw] unchecked
#   @return [Array]
#
# @!attribute [rw] verdicts
#   @return [Array]
CodeRuleEvaluation = Struct.new(
  :advisory,
  :coverage,
  :diff,
  :duration_ms,
  :evaluator_version,
  :input_digest,
  :limits,
  :model,
  :requests,
  :schema_version,
  :snapshot_digest,
  :unchecked,
  :verdicts,
  keyword_init: true
)

# Request payload for CodeRuleEvaluation#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] diff
#   @return [String]
CodeRuleEvaluationCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :diff,
  keyword_init: true
)

# ComSiteAccess entity data model.
class ComSiteAccess
end

# Request payload for ComSiteAccess#load.
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] return_to
#   @return [String, nil]
ComSiteAccessLoadMatch = Struct.new(
  :host,
  :return_to,
  keyword_init: true
)

# Request payload for ComSiteAccess#create.
#
# @!attribute [rw] host
#   @return [Object, nil]
#
# @!attribute [rw] token
#   @return [Object, nil]
ComSiteAccessCreateData = Struct.new(
  :host,
  :token,
  keyword_init: true
)

# ComSiteAccessSession entity data model.
#
# @!attribute [rw] cookie_name
#   @return [String]
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] max_age
#   @return [Integer]
#
# @!attribute [rw] session_token
#   @return [String]
ComSiteAccessSession = Struct.new(
  :cookie_name,
  :host,
  :max_age,
  :session_token,
  keyword_init: true
)

# Request payload for ComSiteAccessSession#create.
#
# @!attribute [rw] host
#   @return [String]
ComSiteAccessSessionCreateData = Struct.new(
  :host,
  keyword_init: true
)

# CommentThreadComment entity data model.
#
# @!attribute [rw] body
#   @return [String]
CommentThreadComment = Struct.new(
  :body,
  keyword_init: true
)

# Request payload for CommentThreadComment#create.
#
# @!attribute [rw] artefact_id
#   @return [String]
#
# @!attribute [rw] comment_thread_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] body
#   @return [String]
CommentThreadCommentCreateData = Struct.new(
  :artefact_id,
  :comment_thread_id,
  :organization_id,
  :body,
  keyword_init: true
)

# CommitDiff entity data model.
#
# @!attribute [rw] files
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] parent_id
#   @return [Object]
CommitDiff = Struct.new(
  :files,
  :id,
  :parent_id,
  keyword_init: true
)

# Request payload for CommitDiff#load.
#
# @!attribute [rw] commit_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] parent
#   @return [String, nil]
CommitDiffLoadMatch = Struct.new(
  :commit_id,
  :id,
  :organization_id,
  :repo_id,
  :parent,
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

# ContactSubmission entity data model.
#
# @!attribute [rw] company
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] website
#   @return [Object, nil]
ContactSubmission = Struct.new(
  :company,
  :email,
  :message,
  :name,
  :website,
  keyword_init: true
)

# Request payload for ContactSubmission#create.
#
# @!attribute [rw] company
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] website
#   @return [Object, nil]
ContactSubmissionCreateData = Struct.new(
  :company,
  :email,
  :message,
  :name,
  :website,
  keyword_init: true
)

# ControlComputer entity data model.
#
# @!attribute [rw] connection
#   @return [Hash]
#
# @!attribute [rw] consent
#   @return [Hash]
#
# @!attribute [rw] device
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] provider_status
#   @return [Array, nil]
ControlComputer = Struct.new(
  :connection,
  :consent,
  :device,
  :id,
  :provider_status,
  keyword_init: true
)

# Request payload for ControlComputer#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] observe_connection
#   @return [Boolean, nil]
#
# @!attribute [rw] persistent_agent_id
#   @return [String]
ControlComputerListMatch = Struct.new(
  :organization_id,
  :cursor,
  :observe_connection,
  :persistent_agent_id,
  keyword_init: true
)

# Request payload for ControlComputer#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Object, nil]
#
# @!attribute [rw] expected_revision
#   @return [Object, nil]
#
# @!attribute [rw] persistent_agent_id
#   @return [Object, nil]
#
# @!attribute [rw] providers
#   @return [Object, nil]
ControlComputerUpdateData = Struct.new(
  :id,
  :organization_id,
  :enabled,
  :expected_revision,
  :persistent_agent_id,
  :providers,
  keyword_init: true
)

# ControlComputerControlOperation entity data model.
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
ControlComputerControlOperation = Struct.new(
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

# Request payload for ControlComputerControlOperation#load.
#
# @!attribute [rw] control_computer_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ControlComputerControlOperationLoadMatch = Struct.new(
  :control_computer_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for ControlComputerControlOperation#create.
#
# @!attribute [rw] control_computer_id
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
ControlComputerControlOperationCreateData = Struct.new(
  :control_computer_id,
  :organization_id,
  :action,
  :arguments,
  :key,
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

# Deployment entity data model.
#
# @!attribute [rw] app
#   @return [Hash]
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
Deployment = Struct.new(
  :app,
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
  :history_kind,
  :history_reason,
  :id,
  :is_live,
  :is_rollback,
  :live_region_count,
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
  :status,
  :total_replicas,
  :trigger_kind,
  :updated_at,
  keyword_init: true
)

# Request payload for Deployment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeploymentLoadMatch = Struct.new(
  :id,
  :organization_id,
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

# DeploymentDetail entity data model.
#
# @!attribute [rw] activity
#   @return [Array]
#
# @!attribute [rw] app
#   @return [Object]
#
# @!attribute [rw] app_id
#   @return [Object]
#
# @!attribute [rw] audit_events
#   @return [Array]
#
# @!attribute [rw] capacity
#   @return [Hash]
#
# @!attribute [rw] data_resources
#   @return [Array]
#
# @!attribute [rw] deploy_targets
#   @return [Array]
#
# @!attribute [rw] deployments
#   @return [Array]
#
# @!attribute [rw] desired_states
#   @return [Array]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] filters
#   @return [Hash]
#
# @!attribute [rw] health
#   @return [Hash]
#
# @!attribute [rw] nomad
#   @return [Hash]
#
# @!attribute [rw] operations
#   @return [Array]
#
# @!attribute [rw] placements
#   @return [Array]
#
# @!attribute [rw] reconciler_ticks
#   @return [Array]
#
# @!attribute [rw] releases
#   @return [Array]
#
# @!attribute [rw] runtime_instances
#   @return [Array]
#
# @!attribute [rw] service_bindings
#   @return [Array]
#
# @!attribute [rw] service_views
#   @return [Array]
#
# @!attribute [rw] storage_resources
#   @return [Array]
DeploymentDetail = Struct.new(
  :activity,
  :app,
  :app_id,
  :audit_events,
  :capacity,
  :data_resources,
  :deploy_targets,
  :deployments,
  :desired_states,
  :environments,
  :filters,
  :health,
  :nomad,
  :operations,
  :placements,
  :reconciler_ticks,
  :releases,
  :runtime_instances,
  :service_bindings,
  :service_views,
  :storage_resources,
  keyword_init: true
)

# Request payload for DeploymentDetail#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
DeploymentDetailListMatch = Struct.new(
  :organization_id,
  :app,
  :environment,
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

# DeploymentLog entity data model.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [Object]
#
# @!attribute [rw] app_release_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] details
#   @return [Object]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] release_version
#   @return [Object]
#
# @!attribute [rw] service_name
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] task
#   @return [Object]
#
# @!attribute [rw] unreachable_reason
#   @return [Object]
DeploymentLog = Struct.new(
  :allocation_id,
  :app_environment_id,
  :app_release_id,
  :app_service_id,
  :details,
  :environment_name,
  :release_version,
  :service_name,
  :status,
  :task,
  :unreachable_reason,
  keyword_init: true
)

# Request payload for DeploymentLog#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] log_location
#   @return [String, nil]
#
# @!attribute [rw] log_service
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
DeploymentLogListMatch = Struct.new(
  :organization_id,
  :app,
  :environment,
  :limit,
  :log_location,
  :log_service,
  :service,
  keyword_init: true
)

# DeploymentMetric entity data model.
#
# @!attribute [rw] auto_deploy
#   @return [Boolean]
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] environment_name
#   @return [String]
#
# @!attribute [rw] placement_id
#   @return [String]
#
# @!attribute [rw] redeploy
#   @return [Boolean]
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
# @!attribute [rw] service_id
#   @return [String]
#
# @!attribute [rw] service_name
#   @return [String]
#
# @!attribute [rw] source_ref
#   @return [Object]
DeploymentMetric = Struct.new(
  :auto_deploy,
  :environment_id,
  :environment_name,
  :placement_id,
  :redeploy,
  :region_count,
  :replicas_per_region,
  :rollout_strategy,
  :service_id,
  :service_name,
  :source_ref,
  keyword_init: true
)

# Request payload for DeploymentMetric#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] metrics_range
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
DeploymentMetricListMatch = Struct.new(
  :organization_id,
  :app,
  :environment,
  :metrics_range,
  :service,
  keyword_init: true
)

# DeploymentPreview entity data model.
#
# @!attribute [rw] access
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String]
#
# @!attribute [rw] app_name
#   @return [String]
#
# @!attribute [rw] app_preview_profile_id
#   @return [String]
#
# @!attribute [rw] app_slug
#   @return [String]
#
# @!attribute [rw] change_number
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by_user_id
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] health
#   @return [String]
#
# @!attribute [rw] hosted_app_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latest_operation_status
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner_name
#   @return [Object]
#
# @!attribute [rw] profile_name
#   @return [String]
#
# @!attribute [rw] resource_overrides
#   @return [Hash, nil]
#
# @!attribute [rw] retained
#   @return [Boolean]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] snapshot_version
#   @return [Integer]
#
# @!attribute [rw] source_revision
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] urls
#   @return [Array]
#
# @!attribute [rw] vcs_change_id
#   @return [Object, nil]
DeploymentPreview = Struct.new(
  :access,
  :app_environment_id,
  :app_name,
  :app_preview_profile_id,
  :app_slug,
  :change_number,
  :created_at,
  :created_by_user_id,
  :expires_at,
  :generation,
  :health,
  :hosted_app_id,
  :id,
  :latest_operation_status,
  :name,
  :owner_name,
  :profile_name,
  :resource_overrides,
  :retained,
  :slug,
  :snapshot_version,
  :source_revision,
  :status,
  :updated_at,
  :urls,
  :vcs_change_id,
  keyword_init: true
)

# Request payload for DeploymentPreview#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] change
#   @return [String, nil]
#
# @!attribute [rw] expiry
#   @return [String, nil]
#
# @!attribute [rw] health
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
DeploymentPreviewListMatch = Struct.new(
  :organization_id,
  :app,
  :change,
  :expiry,
  :health,
  :owner,
  :page,
  keyword_init: true
)

# DeploymentSetting entity data model.
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
DeploymentSetting = Struct.new(
  :code,
  :created_at,
  :id,
  :name,
  :nomad_datacenter,
  :updated_at,
  keyword_init: true
)

# Request payload for DeploymentSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
DeploymentSettingListMatch = Struct.new(
  :organization_id,
  :app,
  :environment,
  :service,
  keyword_init: true
)

# DesktopLocalAgentModel entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
DesktopLocalAgentModel = Struct.new(
  :id,
  :name,
  keyword_init: true
)

# Request payload for DesktopLocalAgentModel#list.
#
# @!attribute [rw] organization_id
#   @return [String]
DesktopLocalAgentModelListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# DesktopLocalAgentResponse entity data model.
#
# @!attribute [rw] input
#   @return [Array]
#
# @!attribute [rw] max_output_tokens
#   @return [Integer, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] store
#   @return [Boolean]
#
# @!attribute [rw] stream
#   @return [Boolean]
DesktopLocalAgentResponse = Struct.new(
  :input,
  :max_output_tokens,
  :model,
  :store,
  :stream,
  keyword_init: true
)

# Request payload for DesktopLocalAgentResponse#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Array]
#
# @!attribute [rw] max_output_tokens
#   @return [Integer, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] store
#   @return [Boolean]
#
# @!attribute [rw] stream
#   @return [Boolean]
DesktopLocalAgentResponseCreateData = Struct.new(
  :organization_id,
  :input,
  :max_output_tokens,
  :model,
  :store,
  :stream,
  keyword_init: true
)

# Device entity data model.
#
# @!attribute [rw] architecture
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] coding_connection
#   @return [Object]
#
# @!attribute [rw] connection_checked_at
#   @return [Object]
#
# @!attribute [rw] connection_status
#   @return [String]
#
# @!attribute [rw] control_delivery_policy
#   @return [Hash]
#
# @!attribute [rw] control_spawn_policy
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] device
#   @return [Hash]
#
# @!attribute [rw] environment
#   @return [String]
#
# @!attribute [rw] execution_available
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] native_device_id
#   @return [String]
#
# @!attribute [rw] paired_at
#   @return [String]
#
# @!attribute [rw] pairing_generation
#   @return [Integer]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] project_visibility
#   @return [Hash]
#
# @!attribute [rw] provider_status
#   @return [Array, nil]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] scheduled_check_ins
#   @return [Boolean, nil]
#
# @!attribute [rw] user_browser_access
#   @return [String]
Device = Struct.new(
  :architecture,
  :channel,
  :coding_connection,
  :connection_checked_at,
  :connection_status,
  :control_delivery_policy,
  :control_spawn_policy,
  :created_at,
  :device,
  :environment,
  :execution_available,
  :id,
  :name,
  :native_device_id,
  :paired_at,
  :pairing_generation,
  :platform,
  :project_visibility,
  :provider_status,
  :revoked_at,
  :scheduled_check_ins,
  :user_browser_access,
  keyword_init: true
)

# Request payload for Device#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeviceLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Device#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] include_revoked
#   @return [Boolean, nil]
DeviceListMatch = Struct.new(
  :organization_id,
  :cursor,
  :include_revoked,
  keyword_init: true
)

# Request payload for Device#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] architecture
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pairing_generation
#   @return [Integer]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] access
#   @return [Object, nil]
#
# @!attribute [rw] folders
#   @return [Object, nil]
#
# @!attribute [rw] max_agents
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] public_key
#   @return [Object, nil]
#
# @!attribute [rw] repositories
#   @return [Object, nil]
#
# @!attribute [rw] restricted
#   @return [Object, nil]
#
# @!attribute [rw] transport
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Object, nil]
DeviceCreateData = Struct.new(
  :id,
  :organization_id,
  :architecture,
  :channel,
  :name,
  :pairing_generation,
  :platform,
  :access,
  :folders,
  :max_agents,
  :mode,
  :public_key,
  :repositories,
  :restricted,
  :transport,
  :version,
  keyword_init: true
)

# DeviceBrowserOperation entity data model.
#
# @!attribute [rw] command
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
DeviceBrowserOperation = Struct.new(
  :command,
  :created_at,
  :id,
  keyword_init: true
)

# Request payload for DeviceBrowserOperation#list.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeviceBrowserOperationListMatch = Struct.new(
  :device_id,
  :organization_id,
  keyword_init: true
)

# Request payload for DeviceBrowserOperation#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] claim_token
#   @return [Object, nil]
#
# @!attribute [rw] response
#   @return [Object, nil]
DeviceBrowserOperationCreateData = Struct.new(
  :device_id,
  :id,
  :organization_id,
  :claim_token,
  :response,
  keyword_init: true
)

# DeviceControlMessage entity data model.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] agent_name
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sender
#   @return [Object]
#
# @!attribute [rw] text
#   @return [Object]
#
# @!attribute [rw] text_omitted
#   @return [Boolean]
#
# @!attribute [rw] thread
#   @return [Hash]
DeviceControlMessage = Struct.new(
  :agent_id,
  :agent_name,
  :expires_at,
  :id,
  :sender,
  :text,
  :text_omitted,
  :thread,
  keyword_init: true
)

# Request payload for DeviceControlMessage#list.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
DeviceControlMessageListMatch = Struct.new(
  :device_id,
  :organization_id,
  :cursor,
  keyword_init: true
)

# DeviceControlOperation entity data model.
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
DeviceControlOperation = Struct.new(
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

# Request payload for DeviceControlOperation#load.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeviceControlOperationLoadMatch = Struct.new(
  :device_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for DeviceControlOperation#create.
#
# @!attribute [rw] device_id
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
DeviceControlOperationCreateData = Struct.new(
  :device_id,
  :organization_id,
  :action,
  :arguments,
  :key,
  keyword_init: true
)

# DeviceEnterpriseRelay entity data model.
class DeviceEnterpriseRelay
end

# Request payload for DeviceEnterpriseRelay#list.
class DeviceEnterpriseRelayListMatch
end

# DeviceFolderListing entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] folders
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] parent
#   @return [Object, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] truncated
#   @return [Boolean, nil]
DeviceFolderListing = Struct.new(
  :code,
  :error,
  :folders,
  :id,
  :key,
  :parent,
  :path,
  :state,
  :truncated,
  keyword_init: true
)

# Request payload for DeviceFolderListing#load.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeviceFolderListingLoadMatch = Struct.new(
  :device_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for DeviceFolderListing#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] path
#   @return [String]
DeviceFolderListingCreateData = Struct.new(
  :device_id,
  :organization_id,
  :key,
  :path,
  keyword_init: true
)

# DeviceGrant entity data model.
#
# @!attribute [rw] active_grants
#   @return [Array]
#
# @!attribute [rw] agent_choices
#   @return [Array]
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] all_agents_access
#   @return [Boolean]
#
# @!attribute [rw] capabilities
#   @return [Array]
#
# @!attribute [rw] execution_available
#   @return [Boolean]
#
# @!attribute [rw] grants
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_cursor
#   @return [Object]
#
# @!attribute [rw] principal_id
#   @return [String]
DeviceGrant = Struct.new(
  :active_grants,
  :agent_choices,
  :agent_id,
  :all_agents_access,
  :capabilities,
  :execution_available,
  :grants,
  :id,
  :next_cursor,
  :principal_id,
  keyword_init: true
)

# Request payload for DeviceGrant#list.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
DeviceGrantListMatch = Struct.new(
  :device_id,
  :organization_id,
  :cursor,
  keyword_init: true
)

# Request payload for DeviceGrant#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] capabilities
#   @return [Array]
#
# @!attribute [rw] principal_id
#   @return [String]
DeviceGrantCreateData = Struct.new(
  :device_id,
  :organization_id,
  :agent_id,
  :capabilities,
  :principal_id,
  keyword_init: true
)

# DeviceInvocation entity data model.
class DeviceInvocation
end

# Request payload for DeviceInvocation#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] challenge
#   @return [Object, nil]
#
# @!attribute [rw] invocation_id
#   @return [Object, nil]
#
# @!attribute [rw] request_hash
#   @return [Object, nil]
#
# @!attribute [rw] signature
#   @return [Object, nil]
DeviceInvocationCreateData = Struct.new(
  :device_id,
  :organization_id,
  :challenge,
  :invocation_id,
  :request_hash,
  :signature,
  keyword_init: true
)

# DeviceLocalEvent entity data model.
#
# @!attribute [rw] event
#   @return [String]
#
# @!attribute [rw] recorded
#   @return [Boolean]
DeviceLocalEvent = Struct.new(
  :event,
  :recorded,
  keyword_init: true
)

# Request payload for DeviceLocalEvent#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] event
#   @return [String]
DeviceLocalEventCreateData = Struct.new(
  :device_id,
  :organization_id,
  :event,
  keyword_init: true
)

# DevicePairing entity data model.
#
# @!attribute [rw] architecture
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] public_key
#   @return [String]
DevicePairing = Struct.new(
  :architecture,
  :channel,
  :id,
  :name,
  :platform,
  :public_key,
  keyword_init: true
)

# Request payload for DevicePairing#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] architecture
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] public_key
#   @return [String]
DevicePairingCreateData = Struct.new(
  :organization_id,
  :architecture,
  :channel,
  :name,
  :platform,
  :public_key,
  keyword_init: true
)

# DeviceProject entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
DeviceProject = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for DeviceProject#remove.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DeviceProjectRemoveMatch = Struct.new(
  :device_id,
  :id,
  :organization_id,
  keyword_init: true
)

# DeviceScheduledCheckIn entity data model.
#
# @!attribute [rw] enabled
#   @return [Boolean]
DeviceScheduledCheckIn = Struct.new(
  :enabled,
  keyword_init: true
)

# Request payload for DeviceScheduledCheckIn#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
DeviceScheduledCheckInCreateData = Struct.new(
  :device_id,
  :organization_id,
  :enabled,
  keyword_init: true
)

# DockerBuilder entity data model.
#
# @!attribute [rw] backend
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [Object]
#
# @!attribute [rw] gateway_url
#   @return [Object, nil]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_activity_at
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] ready_at
#   @return [Object]
#
# @!attribute [rw] slept_at
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] startup_attempt
#   @return [Integer]
#
# @!attribute [rw] startup_failure
#   @return [Object]
#
# @!attribute [rw] startup_stage
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [Object]
DockerBuilder = Struct.new(
  :backend,
  :created_at,
  :gateway_url,
  :generation,
  :id,
  :last_activity_at,
  :organization_id,
  :ready_at,
  :slept_at,
  :slug,
  :startup_attempt,
  :startup_failure,
  :startup_stage,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for DockerBuilder#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilder#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String, nil]
DockerBuilderListMatch = Struct.new(
  :organization_id,
  :slug,
  keyword_init: true
)

# Request payload for DockerBuilder#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] backend
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
DockerBuilderCreateData = Struct.new(
  :organization_id,
  :backend,
  :slug,
  keyword_init: true
)

# Request payload for DockerBuilder#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilder#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String, nil]
DockerBuilderPatchData = Struct.new(
  :id,
  :organization_id,
  :slug,
  keyword_init: true
)

# DockerBuilderSession entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] docker_builder_id
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] gateway_url
#   @return [Object, nil]
#
# @!attribute [rw] generation
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] user_id
#   @return [String]
DockerBuilderSession = Struct.new(
  :created_at,
  :docker_builder_id,
  :expires_at,
  :gateway_url,
  :generation,
  :id,
  :organization_id,
  :revoked_at,
  :user_id,
  keyword_init: true
)

# Request payload for DockerBuilderSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderSessionLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilderSession#create.
#
# @!attribute [rw] docker_builder_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderSessionCreateData = Struct.new(
  :docker_builder_id,
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilderSession#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderSessionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# DockerBuilderSetting entity data model.
#
# @!attribute [rw] docker_builder_settings
#   @return [Hash]
#
# @!attribute [rw] idle_timeout_seconds
#   @return [Integer]
#
# @!attribute [rw] max_concurrency
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] runtime_timeout_seconds
#   @return [Integer]
DockerBuilderSetting = Struct.new(
  :docker_builder_settings,
  :idle_timeout_seconds,
  :max_concurrency,
  :organization_id,
  :region,
  :runtime_timeout_seconds,
  keyword_init: true
)

# Request payload for DockerBuilderSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderSettingListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilderSetting#update.
#
# @!attribute [rw] organization_id
#   @return [String]
DockerBuilderSettingUpdateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for DockerBuilderSetting#patch.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] idle_timeout_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] max_concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] runtime_timeout_seconds
#   @return [Integer, nil]
DockerBuilderSettingPatchData = Struct.new(
  :organization_id,
  :idle_timeout_seconds,
  :max_concurrency,
  :region,
  :runtime_timeout_seconds,
  keyword_init: true
)

# DomainDnsIntegration entity data model.
#
# @!attribute [rw] account_label
#   @return [Object]
#
# @!attribute [rw] api_token
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] has_token
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_verified_at
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
DomainDnsIntegration = Struct.new(
  :account_label,
  :api_token,
  :created_at,
  :failure_message,
  :has_token,
  :id,
  :last_verified_at,
  :organization_id,
  :provider,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for DomainDnsIntegration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
DomainDnsIntegrationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for DomainDnsIntegration#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] account_label
#   @return [Object, nil]
#
# @!attribute [rw] api_token
#   @return [String]
DomainDnsIntegrationCreateData = Struct.new(
  :organization_id,
  :account_label,
  :api_token,
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

# Edge entity data model.
class Edge
end

# Request payload for Edge#load.
class EdgeLoadMatch
end

# EmailVerification entity data model.
class EmailVerification
end

# Request payload for EmailVerification#create.
#
# @!attribute [rw] email
#   @return [Object, nil]
EmailVerificationCreateData = Struct.new(
  :email,
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

# ExecutionDesiredState entity data model.
#
# @!attribute [rw] desired_state
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] stop_observed
#   @return [Boolean]
ExecutionDesiredState = Struct.new(
  :desired_state,
  :id,
  :stop_observed,
  keyword_init: true
)

# Request payload for ExecutionDesiredState#load.
#
# @!attribute [rw] id
#   @return [String]
ExecutionDesiredStateLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionDesiredState#list.
#
# @!attribute [rw] desired_state
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] stop_observed
#   @return [Boolean, nil]
ExecutionDesiredStateListMatch = Struct.new(
  :desired_state,
  :id,
  :stop_observed,
  keyword_init: true
)

# Request payload for ExecutionDesiredState#create.
class ExecutionDesiredStateCreateData
end

# Request payload for ExecutionDesiredState#update.
#
# @!attribute [rw] id
#   @return [String]
ExecutionDesiredStateUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionDesiredState#patch.
#
# @!attribute [rw] id
#   @return [String]
ExecutionDesiredStatePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionDesiredState#remove.
#
# @!attribute [rw] id
#   @return [String]
ExecutionDesiredStateRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ExecutionReconcilerTick entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ExecutionReconcilerTick = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionReconcilerTick#load.
#
# @!attribute [rw] id
#   @return [String]
ExecutionReconcilerTickLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionReconcilerTick#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ExecutionReconcilerTickListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionReconcilerTick#create.
class ExecutionReconcilerTickCreateData
end

# ExecutionRelease entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ExecutionRelease = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRelease#load.
#
# @!attribute [rw] id
#   @return [String]
ExecutionReleaseLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRelease#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ExecutionReleaseListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRelease#create.
class ExecutionReleaseCreateData
end

# ExecutionRuntimeInstance entity data model.
#
# @!attribute [rw] adapter_kind
#   @return [String]
#
# @!attribute [rw] app_environment_id
#   @return [String]
#
# @!attribute [rw] app_release_id
#   @return [Object]
#
# @!attribute [rw] app_service_id
#   @return [String]
#
# @!attribute [rw] booted_at
#   @return [Object]
#
# @!attribute [rw] booted_at_label
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
# @!attribute [rw] instance_key
#   @return [String]
#
# @!attribute [rw] last_reconciled_at
#   @return [Object]
#
# @!attribute [rw] last_reconciled_at_label
#   @return [Object]
#
# @!attribute [rw] last_seen_at
#   @return [Object]
#
# @!attribute [rw] last_seen_at_label
#   @return [Object]
#
# @!attribute [rw] location
#   @return [Object]
#
# @!attribute [rw] location_id
#   @return [String]
#
# @!attribute [rw] network_peer_id
#   @return [Object]
#
# @!attribute [rw] nomad_allocation_id
#   @return [Object]
#
# @!attribute [rw] nomad_task_name
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] private_ipv4
#   @return [Object]
#
# @!attribute [rw] private_ipv6
#   @return [Object]
#
# @!attribute [rw] provider_instance_id
#   @return [Object]
#
# @!attribute [rw] public_endpoint
#   @return [Object]
#
# @!attribute [rw] service_name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] terminated_at
#   @return [Object]
#
# @!attribute [rw] terminated_at_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
ExecutionRuntimeInstance = Struct.new(
  :adapter_kind,
  :app_environment_id,
  :app_release_id,
  :app_service_id,
  :booted_at,
  :booted_at_label,
  :created_at,
  :created_at_label,
  :hosted_app_id,
  :id,
  :instance_key,
  :last_reconciled_at,
  :last_reconciled_at_label,
  :last_seen_at,
  :last_seen_at_label,
  :location,
  :location_id,
  :network_peer_id,
  :nomad_allocation_id,
  :nomad_task_name,
  :organization_id,
  :private_ipv4,
  :private_ipv6,
  :provider_instance_id,
  :public_endpoint,
  :service_name,
  :slug,
  :status,
  :terminated_at,
  :terminated_at_label,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for ExecutionRuntimeInstance#load.
#
# @!attribute [rw] id
#   @return [String]
ExecutionRuntimeInstanceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRuntimeInstance#list.
#
# @!attribute [rw] app_environment_id
#   @return [String, nil]
#
# @!attribute [rw] app_service_id
#   @return [String, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
ExecutionRuntimeInstanceListMatch = Struct.new(
  :app_environment_id,
  :app_service_id,
  :hosted_app_id,
  :limit,
  :page,
  keyword_init: true
)

# Request payload for ExecutionRuntimeInstance#create.
class ExecutionRuntimeInstanceCreateData
end

# Request payload for ExecutionRuntimeInstance#update.
#
# @!attribute [rw] id
#   @return [String]
ExecutionRuntimeInstanceUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRuntimeInstance#patch.
#
# @!attribute [rw] id
#   @return [String]
ExecutionRuntimeInstancePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ExecutionRuntimeInstance#remove.
#
# @!attribute [rw] id
#   @return [String]
ExecutionRuntimeInstanceRemoveMatch = Struct.new(
  :id,
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

# Gh entity data model.
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] fetched_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] magic_merge
#   @return [Object]
#
# @!attribute [rw] pull_request
#   @return [Object]
#
# @!attribute [rw] stack
#   @return [Hash]
#
# @!attribute [rw] transcript_paths
#   @return [Array]
Gh = Struct.new(
  :capabilities,
  :content,
  :fetched_at,
  :id,
  :magic_merge,
  :pull_request,
  :stack,
  :transcript_paths,
  keyword_init: true
)

# Request payload for Gh#load.
#
# @!attribute [rw] gh_id
#   @return [String]
#
# @!attribute [rw] github_repo
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] check_id
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] job_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] run_id
#   @return [String, nil]
#
# @!attribute [rw] section
#   @return [String, nil]
#
# @!attribute [rw] thread_id
#   @return [String, nil]
GhLoadMatch = Struct.new(
  :gh_id,
  :github_repo,
  :id,
  :organization_id,
  :check_id,
  :cursor,
  :job_id,
  :page,
  :run_id,
  :section,
  :thread_id,
  keyword_init: true
)

# GitImport entity data model.
#
# @!attribute [rw] destination_mode
#   @return [String]
#
# @!attribute [rw] error
#   @return [Object, nil]
#
# @!attribute [rw] git_default_branch
#   @return [String, nil]
#
# @!attribute [rw] git_status
#   @return [String]
#
# @!attribute [rw] git_url
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] native_status
#   @return [String]
#
# @!attribute [rw] organization
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] root_path
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_branch
#   @return [String]
#
# @!attribute [rw] target_branch
#   @return [String]
GitImport = Struct.new(
  :destination_mode,
  :error,
  :git_default_branch,
  :git_status,
  :git_url,
  :id,
  :idempotency_key,
  :name,
  :native_status,
  :organization,
  :repository_id,
  :root_path,
  :slug,
  :source_branch,
  :target_branch,
  keyword_init: true
)

# Request payload for GitImport#load.
#
# @!attribute [rw] id
#   @return [String]
GitImportLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GitImport#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] destination_mode
#   @return [String]
#
# @!attribute [rw] git_default_branch
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] root_path
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source_branch
#   @return [String]
#
# @!attribute [rw] target_branch
#   @return [String, nil]
GitImportCreateData = Struct.new(
  :organization_id,
  :destination_mode,
  :git_default_branch,
  :idempotency_key,
  :name,
  :root_path,
  :slug,
  :source_branch,
  :target_branch,
  keyword_init: true
)

# Github entity data model.
class Github
end

# Request payload for Github#load.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
GithubLoadMatch = Struct.new(
  :name,
  :owner,
  keyword_init: true
)

# GithubApp entity data model.
class GithubApp
end

# Request payload for GithubApp#create.
class GithubAppCreateData
end

# GithubAppImportableRepository entity data model.
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] next_page
#   @return [Object]
#
# @!attribute [rw] repositories
#   @return [Array]
GithubAppImportableRepository = Struct.new(
  :account_login,
  :github_app_installation_id,
  :next_page,
  :repositories,
  keyword_init: true
)

# Request payload for GithubAppImportableRepository#list.
#
# @!attribute [rw] github_app_installation_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
GithubAppImportableRepositoryListMatch = Struct.new(
  :github_app_installation_id,
  :page,
  keyword_init: true
)

# GithubAppInstallation entity data model.
#
# @!attribute [rw] account_avatar_url
#   @return [Object]
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] installation_id
#   @return [String]
#
# @!attribute [rw] installed_at
#   @return [Object]
#
# @!attribute [rw] installed_at_label
#   @return [Object]
#
# @!attribute [rw] manage_access_url
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permission_entries
#   @return [Array]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] suspended_at
#   @return [Object]
#
# @!attribute [rw] suspended_at_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
GithubAppInstallation = Struct.new(
  :account_avatar_url,
  :account_id,
  :account_login,
  :created_at,
  :created_at_label,
  :id,
  :installation_id,
  :installed_at,
  :installed_at_label,
  :manage_access_url,
  :organization_id,
  :permission_entries,
  :permissions,
  :status,
  :suspended_at,
  :suspended_at_label,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for GithubAppInstallation#list.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubAppInstallationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for GithubAppInstallation#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] account_avatar_url
#   @return [Object]
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] installation_id
#   @return [String]
#
# @!attribute [rw] installed_at
#   @return [Object]
#
# @!attribute [rw] installed_at_label
#   @return [Object]
#
# @!attribute [rw] manage_access_url
#   @return [String]
#
# @!attribute [rw] permission_entries
#   @return [Array]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] suspended_at
#   @return [Object]
#
# @!attribute [rw] suspended_at_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
GithubAppInstallationCreateData = Struct.new(
  :id,
  :organization_id,
  :account_avatar_url,
  :account_id,
  :account_login,
  :created_at,
  :created_at_label,
  :installation_id,
  :installed_at,
  :installed_at_label,
  :manage_access_url,
  :permission_entries,
  :permissions,
  :status,
  :suspended_at,
  :suspended_at_label,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for GithubAppInstallation#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] force
#   @return [Boolean, nil]
#
# @!attribute [rw] uninstall_on_github
#   @return [Boolean, nil]
GithubAppInstallationRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :force,
  :uninstall_on_github,
  keyword_init: true
)

# GithubAppInstallationAuthorization entity data model.
#
# @!attribute [rw] installation_url
#   @return [String]
#
# @!attribute [rw] organization_slug
#   @return [String]
#
# @!attribute [rw] return_target
#   @return [String]
GithubAppInstallationAuthorization = Struct.new(
  :installation_url,
  :organization_slug,
  :return_target,
  keyword_init: true
)

# Request payload for GithubAppInstallationAuthorization#create.
#
# @!attribute [rw] organization_slug
#   @return [String]
#
# @!attribute [rw] return_target
#   @return [String]
GithubAppInstallationAuthorizationCreateData = Struct.new(
  :organization_slug,
  :return_target,
  keyword_init: true
)

# GithubAppUserAuthorization entity data model.
class GithubAppUserAuthorization
end

# Request payload for GithubAppUserAuthorization#create.
class GithubAppUserAuthorizationCreateData
end

# GithubCiRepository entity data model.
#
# @!attribute [rw] adoption_mode
#   @return [String]
#
# @!attribute [rw] check_name_prefix
#   @return [String]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] default_branch
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] github_repository_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_compatibility_status
#   @return [Object]
#
# @!attribute [rw] last_error_message
#   @return [Object]
#
# @!attribute [rw] last_head_sha
#   @return [Object]
#
# @!attribute [rw] last_pull_request_number
#   @return [Object]
#
# @!attribute [rw] last_ref
#   @return [Object]
#
# @!attribute [rw] last_webhook_action
#   @return [Object]
#
# @!attribute [rw] last_webhook_at
#   @return [Object]
#
# @!attribute [rw] last_webhook_at_label
#   @return [Object]
#
# @!attribute [rw] last_webhook_delivery_id
#   @return [Object]
#
# @!attribute [rw] last_webhook_event
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permission_status
#   @return [String]
#
# @!attribute [rw] repository_full_name
#   @return [String]
#
# @!attribute [rw] repository_name
#   @return [String]
#
# @!attribute [rw] repository_owner
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
# @!attribute [rw] webhook_delivery_count
#   @return [Integer]
GithubCiRepository = Struct.new(
  :adoption_mode,
  :check_name_prefix,
  :ci_runner_pool_id,
  :created_at,
  :created_at_label,
  :default_branch,
  :github_app_installation_id,
  :github_repository_id,
  :id,
  :last_compatibility_status,
  :last_error_message,
  :last_head_sha,
  :last_pull_request_number,
  :last_ref,
  :last_webhook_action,
  :last_webhook_at,
  :last_webhook_at_label,
  :last_webhook_delivery_id,
  :last_webhook_event,
  :metadata,
  :organization_id,
  :permission_status,
  :repository_full_name,
  :repository_name,
  :repository_owner,
  :status,
  :updated_at,
  :updated_at_label,
  :webhook_delivery_count,
  keyword_init: true
)

# Request payload for GithubCiRepository#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
GithubCiRepositoryLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for GithubCiRepository#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adoption_mode
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubCiRepositoryListMatch = Struct.new(
  :organization_id,
  :adoption_mode,
  :status,
  keyword_init: true
)

# Request payload for GithubCiRepository#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adoption_mode
#   @return [String, nil]
#
# @!attribute [rw] check_name_prefix
#   @return [String, nil]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object, nil]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] github_repository_id
#   @return [String]
#
# @!attribute [rw] repository_name
#   @return [String]
#
# @!attribute [rw] repository_owner
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubCiRepositoryCreateData = Struct.new(
  :organization_id,
  :adoption_mode,
  :check_name_prefix,
  :ci_runner_pool_id,
  :default_branch,
  :github_app_installation_id,
  :github_repository_id,
  :repository_name,
  :repository_owner,
  :status,
  keyword_init: true
)

# Request payload for GithubCiRepository#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adoption_mode
#   @return [String, nil]
#
# @!attribute [rw] check_name_prefix
#   @return [String, nil]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object, nil]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] permission_status
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubCiRepositoryUpdateData = Struct.new(
  :id,
  :organization_id,
  :adoption_mode,
  :check_name_prefix,
  :ci_runner_pool_id,
  :default_branch,
  :permission_status,
  :status,
  keyword_init: true
)

# Request payload for GithubCiRepository#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adoption_mode
#   @return [String, nil]
#
# @!attribute [rw] check_name_prefix
#   @return [String, nil]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [Object, nil]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] permission_status
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubCiRepositoryPatchData = Struct.new(
  :id,
  :organization_id,
  :adoption_mode,
  :check_name_prefix,
  :ci_runner_pool_id,
  :default_branch,
  :permission_status,
  :status,
  keyword_init: true
)

# GithubCiRepositoryCompatibilityReport entity data model.
#
# @!attribute [rw] analyzed_at
#   @return [String]
#
# @!attribute [rw] analyzed_at_label
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_id
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_run_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] diagnostics
#   @return [Array]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] event_action
#   @return [Object]
#
# @!attribute [rw] event_name
#   @return [String]
#
# @!attribute [rw] execution_allowed
#   @return [Boolean]
#
# @!attribute [rw] github_ci_repository_id
#   @return [String]
#
# @!attribute [rw] head_sha
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] parser_version
#   @return [String]
#
# @!attribute [rw] pull_request_number
#   @return [Object]
#
# @!attribute [rw] ref_name
#   @return [Object]
#
# @!attribute [rw] referenced_actions
#   @return [Array]
#
# @!attribute [rw] required_secrets
#   @return [Array]
#
# @!attribute [rw] runner_labels
#   @return [Array]
#
# @!attribute [rw] source_blob_sha
#   @return [Object]
#
# @!attribute [rw] source_sha
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] supported_features
#   @return [Hash]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] warnings
#   @return [Array]
#
# @!attribute [rw] workflow_name
#   @return [Object]
#
# @!attribute [rw] workflow_path
#   @return [String]
GithubCiRepositoryCompatibilityReport = Struct.new(
  :analyzed_at,
  :analyzed_at_label,
  :ci_pipeline_id,
  :ci_pipeline_run_id,
  :created_at,
  :created_at_label,
  :diagnostics,
  :errors,
  :event_action,
  :event_name,
  :execution_allowed,
  :github_ci_repository_id,
  :head_sha,
  :id,
  :metadata,
  :organization_id,
  :parser_version,
  :pull_request_number,
  :ref_name,
  :referenced_actions,
  :required_secrets,
  :runner_labels,
  :source_blob_sha,
  :source_sha,
  :status,
  :supported_features,
  :updated_at,
  :updated_at_label,
  :warnings,
  :workflow_name,
  :workflow_path,
  keyword_init: true
)

# Request payload for GithubCiRepositoryCompatibilityReport#load.
#
# @!attribute [rw] github_ci_repository_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
GithubCiRepositoryCompatibilityReportLoadMatch = Struct.new(
  :github_ci_repository_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for GithubCiRepositoryCompatibilityReport#list.
#
# @!attribute [rw] github_ci_repository_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] event_name
#   @return [String, nil]
#
# @!attribute [rw] source_sha
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubCiRepositoryCompatibilityReportListMatch = Struct.new(
  :github_ci_repository_id,
  :organization_id,
  :event_name,
  :source_sha,
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

# GithubIntegration entity data model.
#
# @!attribute [rw] account_avatar_url
#   @return [Object]
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] connection_status
#   @return [String]
#
# @!attribute [rw] connection_status_label
#   @return [String]
#
# @!attribute [rw] github_installation
#   @return [Object]
#
# @!attribute [rw] health
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imported_repositories_count
#   @return [Integer]
#
# @!attribute [rw] imported_repositories_count_label
#   @return [String]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] repositories
#   @return [Array]
GithubIntegration = Struct.new(
  :account_avatar_url,
  :account_login,
  :connection_status,
  :connection_status_label,
  :github_installation,
  :health,
  :id,
  :imported_repositories_count,
  :imported_repositories_count_label,
  :organization,
  :pagination,
  :repositories,
  keyword_init: true
)

# Request payload for GithubIntegration#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
GithubIntegrationLoadMatch = Struct.new(
  :id,
  :organization_id,
  :page,
  keyword_init: true
)

# Request payload for GithubIntegration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubIntegrationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# GithubOnboarding entity data model.
#
# @!attribute [rw] accounts
#   @return [Array]
#
# @!attribute [rw] active_batch_id
#   @return [Object]
#
# @!attribute [rw] batches
#   @return [Array]
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] installations
#   @return [Array]
GithubOnboarding = Struct.new(
  :accounts,
  :active_batch_id,
  :batches,
  :capabilities,
  :installations,
  keyword_init: true
)

# Request payload for GithubOnboarding#load.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubOnboardingLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# GithubOnboardingBranch entity data model.
#
# @!attribute [rw] branches
#   @return [Array]
GithubOnboardingBranch = Struct.new(
  :branches,
  keyword_init: true
)

# Request payload for GithubOnboardingBranch#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
GithubOnboardingBranchListMatch = Struct.new(
  :organization_id,
  :github_app_installation_id,
  :name,
  :owner,
  keyword_init: true
)

# GithubOnboardingImport entity data model.
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] complete
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] failed_item_count
#   @return [Integer]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imported_item_count
#   @return [Integer]
#
# @!attribute [rw] item_count
#   @return [Integer]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] repositories
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] terminal_item_count
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [String]
GithubOnboardingImport = Struct.new(
  :account_login,
  :complete,
  :created_at,
  :failed_item_count,
  :github_app_installation_id,
  :id,
  :imported_item_count,
  :item_count,
  :items,
  :repositories,
  :status,
  :terminal_item_count,
  :updated_at,
  keyword_init: true
)

# Request payload for GithubOnboardingImport#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] repositories
#   @return [Object]
GithubOnboardingImportCreateData = Struct.new(
  :organization_id,
  :github_app_installation_id,
  :repositories,
  keyword_init: true
)

# GithubOnboardingImportBatch entity data model.
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] complete
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] failed_item_count
#   @return [Integer]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] imported_item_count
#   @return [Integer]
#
# @!attribute [rw] item_count
#   @return [Integer]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] terminal_item_count
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [String]
GithubOnboardingImportBatch = Struct.new(
  :account_login,
  :complete,
  :created_at,
  :failed_item_count,
  :github_app_installation_id,
  :id,
  :imported_item_count,
  :item_count,
  :items,
  :status,
  :terminal_item_count,
  :updated_at,
  keyword_init: true
)

# Request payload for GithubOnboardingImportBatch#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
GithubOnboardingImportBatchLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# GithubOnboardingImportItem entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
GithubOnboardingImportItem = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GithubOnboardingImportItem#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
GithubOnboardingImportItemCreateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# GithubPullRequest entity data model.
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] fetched_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] magic_merge
#   @return [Object]
#
# @!attribute [rw] pull_request
#   @return [Object]
#
# @!attribute [rw] stack
#   @return [Hash]
#
# @!attribute [rw] transcript_paths
#   @return [Array]
GithubPullRequest = Struct.new(
  :capabilities,
  :content,
  :fetched_at,
  :id,
  :magic_merge,
  :pull_request,
  :stack,
  :transcript_paths,
  keyword_init: true
)

# Request payload for GithubPullRequest#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pull_request_id
#   @return [String]
#
# @!attribute [rw] check_id
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] job_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] run_id
#   @return [String, nil]
#
# @!attribute [rw] section
#   @return [String, nil]
#
# @!attribute [rw] thread_id
#   @return [String, nil]
GithubPullRequestLoadMatch = Struct.new(
  :id,
  :organization_id,
  :pull_request_id,
  :check_id,
  :cursor,
  :job_id,
  :page,
  :run_id,
  :section,
  :thread_id,
  keyword_init: true
)

# Request payload for GithubPullRequest#create.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubPullRequestCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# GithubRunnerAdmission entity data model.
class GithubRunnerAdmission
end

# Request payload for GithubRunnerAdmission#create.
class GithubRunnerAdmissionCreateData
end

# GithubRunnerCache entity data model.
#
# @!attribute [rw] entry_id
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] matched_key
#   @return [String, nil]
#
# @!attribute [rw] ok
#   @return [Boolean]
#
# @!attribute [rw] operation
#   @return [String]
#
# @!attribute [rw] restore_keys
#   @return [Array, nil]
#
# @!attribute [rw] signed_download_url
#   @return [String, nil]
#
# @!attribute [rw] size_bytes
#   @return [String, nil]
#
# @!attribute [rw] upload_path
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GithubRunnerCache = Struct.new(
  :entry_id,
  :key,
  :matched_key,
  :ok,
  :operation,
  :restore_keys,
  :signed_download_url,
  :size_bytes,
  :upload_path,
  :version,
  keyword_init: true
)

# Request payload for GithubRunnerCache#create.
#
# @!attribute [rw] entry_id
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] operation
#   @return [String]
#
# @!attribute [rw] restore_keys
#   @return [Array, nil]
#
# @!attribute [rw] size_bytes
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GithubRunnerCacheCreateData = Struct.new(
  :entry_id,
  :key,
  :operation,
  :restore_keys,
  :size_bytes,
  :version,
  keyword_init: true
)

# GithubRunnerEgress entity data model.
#
# @!attribute [rw] can_request
#   @return [Boolean]
#
# @!attribute [rw] cidr
#   @return [Object]
#
# @!attribute [rw] ipv4
#   @return [Object]
#
# @!attribute [rw] requested_at_label
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
GithubRunnerEgress = Struct.new(
  :can_request,
  :cidr,
  :ipv4,
  :requested_at_label,
  :status,
  keyword_init: true
)

# Request payload for GithubRunnerEgress#load.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubRunnerEgressLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for GithubRunnerEgress#create.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubRunnerEgressCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# GithubRunnerHistory entity data model.
#
# @!attribute [rw] activity
#   @return [Array]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] observed_at
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] repositories
#   @return [Array]
#
# @!attribute [rw] runs
#   @return [Array]
#
# @!attribute [rw] setup
#   @return [Object, nil]
#
# @!attribute [rw] success_rate
#   @return [Object]
#
# @!attribute [rw] usage
#   @return [Hash]
GithubRunnerHistory = Struct.new(
  :activity,
  :counts,
  :observed_at,
  :pagination,
  :repositories,
  :runs,
  :setup,
  :success_rate,
  :usage,
  keyword_init: true
)

# Request payload for GithubRunnerHistory#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] repository
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
GithubRunnerHistoryLoadMatch = Struct.new(
  :organization_id,
  :day,
  :page,
  :q,
  :repository,
  :status,
  keyword_init: true
)

# GithubRunnerImage entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image_reference
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] modal_image_id
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] registry_secret_name
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
GithubRunnerImage = Struct.new(
  :created_at,
  :id,
  :image_reference,
  :last_error,
  :modal_image_id,
  :name,
  :registry_secret_name,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for GithubRunnerImage#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
GithubRunnerImageLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for GithubRunnerImage#list.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubRunnerImageListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for GithubRunnerImage#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] image_reference
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] registry_secret_name
#   @return [Object, nil]
GithubRunnerImageCreateData = Struct.new(
  :organization_id,
  :image_reference,
  :name,
  :registry_secret_name,
  keyword_init: true
)

# GithubRunnerPool entity data model.
#
# @!attribute [rw] cpu_millicores
#   @return [Integer]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] github_repository_id
#   @return [String]
#
# @!attribute [rw] github_runner_image
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Object, nil]
#
# @!attribute [rw] invocations
#   @return [Array]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object]
#
# @!attribute [rw] last_polled_at
#   @return [Object]
#
# @!attribute [rw] max_concurrency
#   @return [Integer]
#
# @!attribute [rw] memory_mb
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] repository_full_name
#   @return [String]
#
# @!attribute [rw] runtime_kind
#   @return [String]
#
# @!attribute [rw] timeout_seconds
#   @return [Integer]
GithubRunnerPool = Struct.new(
  :cpu_millicores,
  :enabled,
  :github_app_installation_id,
  :github_repository_id,
  :github_runner_image,
  :id,
  :image,
  :invocations,
  :label,
  :last_error,
  :last_polled_at,
  :max_concurrency,
  :memory_mb,
  :organization_id,
  :provider,
  :repository_full_name,
  :runtime_kind,
  :timeout_seconds,
  keyword_init: true
)

# Request payload for GithubRunnerPool#list.
#
# @!attribute [rw] organization_id
#   @return [String]
GithubRunnerPoolListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for GithubRunnerPool#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] github_app_installation_id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Object, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] max_concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] repository_full_name
#   @return [String]
#
# @!attribute [rw] timeout_seconds
#   @return [Integer, nil]
GithubRunnerPoolCreateData = Struct.new(
  :organization_id,
  :enabled,
  :github_app_installation_id,
  :image,
  :label,
  :max_concurrency,
  :provider,
  :repository_full_name,
  :timeout_seconds,
  keyword_init: true
)

# Request payload for GithubRunnerPool#update.
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
# @!attribute [rw] image
#   @return [Object, nil]
#
# @!attribute [rw] max_concurrency
#   @return [Integer, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] timeout_seconds
#   @return [Integer, nil]
GithubRunnerPoolUpdateData = Struct.new(
  :id,
  :organization_id,
  :enabled,
  :image,
  :max_concurrency,
  :provider,
  :timeout_seconds,
  keyword_init: true
)

# GithubRunnerSetup entity data model.
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] github_repository_connection_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] pull_request_url
#   @return [Object]
#
# @!attribute [rw] repository_full_name
#   @return [String]
#
# @!attribute [rw] roder_thread_id
#   @return [Object]
#
# @!attribute [rw] runner_labels
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] summary
#   @return [Object]
GithubRunnerSetup = Struct.new(
  :error,
  :github_repository_connection_id,
  :id,
  :pull_request_url,
  :repository_full_name,
  :roder_thread_id,
  :runner_labels,
  :status,
  :status_label,
  :summary,
  keyword_init: true
)

# Request payload for GithubRunnerSetup#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
GithubRunnerSetupLoadMatch = Struct.new(
  :organization_id,
  :id,
  keyword_init: true
)

# Request payload for GithubRunnerSetup#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_repository_connection_id
#   @return [String]
GithubRunnerSetupCreateData = Struct.new(
  :organization_id,
  :github_repository_connection_id,
  keyword_init: true
)

# Gitlab entity data model.
#
# @!attribute [rw] configured
#   @return [Boolean]
#
# @!attribute [rw] connections
#   @return [Array]
#
# @!attribute [rw] integrations
#   @return [Array]
#
# @!attribute [rw] inventory_error
#   @return [Object, nil]
#
# @!attribute [rw] next_page
#   @return [Object]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] projects
#   @return [Array]
#
# @!attribute [rw] redirect_uri
#   @return [Object]
#
# @!attribute [rw] selected_integration_id
#   @return [Object]
Gitlab = Struct.new(
  :configured,
  :connections,
  :integrations,
  :inventory_error,
  :next_page,
  :organization,
  :projects,
  :redirect_uri,
  :selected_integration_id,
  keyword_init: true
)

# Request payload for Gitlab#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] connection_id
#   @return [String, nil]
#
# @!attribute [rw] integration_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
GitlabLoadMatch = Struct.new(
  :organization_id,
  :connection_id,
  :integration_id,
  :page,
  :search,
  :sort,
  keyword_init: true
)

# Request payload for Gitlab#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] client_id
#   @return [Object, nil]
#
# @!attribute [rw] client_secret
#   @return [Object, nil]
#
# @!attribute [rw] instance_url
#   @return [Object, nil]
#
# @!attribute [rw] integration_id
#   @return [Object, nil]
#
# @!attribute [rw] return_target
#   @return [Object, nil]
#
# @!attribute [rw] webhook_authentication
#   @return [Object, nil]
GitlabCreateData = Struct.new(
  :organization_id,
  :client_id,
  :client_secret,
  :instance_url,
  :integration_id,
  :return_target,
  :webhook_authentication,
  keyword_init: true
)

# GitlabConnection entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
GitlabConnection = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GitlabConnection#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] action_name
#   @return [Object, nil]
#
# @!attribute [rw] integration_id
#   @return [Object, nil]
#
# @!attribute [rw] source_branch
#   @return [Object, nil]
GitlabConnectionCreateData = Struct.new(
  :id,
  :organization_id,
  :action_name,
  :integration_id,
  :source_branch,
  keyword_init: true
)

# GitlabImport entity data model.
#
# @!attribute [rw] integration_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [Integer]
#
# @!attribute [rw] repo_slug
#   @return [String, nil]
#
# @!attribute [rw] source_branch
#   @return [String, nil]
GitlabImport = Struct.new(
  :integration_id,
  :project_id,
  :repo_slug,
  :source_branch,
  keyword_init: true
)

# Request payload for GitlabImport#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] integration_id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [Integer]
#
# @!attribute [rw] repo_slug
#   @return [String, nil]
#
# @!attribute [rw] source_branch
#   @return [String, nil]
GitlabImportCreateData = Struct.new(
  :organization_id,
  :integration_id,
  :project_id,
  :repo_slug,
  :source_branch,
  keyword_init: true
)

# GitlabOauth entity data model.
class GitlabOauth
end

# Request payload for GitlabOauth#load.
class GitlabOauthLoadMatch
end

# GrantAllAgent entity data model.
#
# @!attribute [rw] all_agents_access
#   @return [Boolean]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] execution_available
#   @return [Boolean]
GrantAllAgent = Struct.new(
  :all_agents_access,
  :enabled,
  :execution_available,
  keyword_init: true
)

# Request payload for GrantAllAgent#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] enabled
#   @return [Boolean]
GrantAllAgentCreateData = Struct.new(
  :device_id,
  :organization_id,
  :enabled,
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

# IdentityOrganization entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
IdentityOrganization = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for IdentityOrganization#load.
#
# @!attribute [rw] id
#   @return [String]
IdentityOrganizationLoadMatch = Struct.new(
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

# ImageRepositoryTag entity data model.
#
# @!attribute [rw] image_repository
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] registry_url
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
ImageRepositoryTag = Struct.new(
  :image_repository,
  :name,
  :registry_url,
  :tags,
  keyword_init: true
)

# Request payload for ImageRepositoryTag#list.
#
# @!attribute [rw] image_repository_id
#   @return [String]
ImageRepositoryTagListMatch = Struct.new(
  :image_repository_id,
  keyword_init: true
)

# ImportBranchPolicy entity data model.
#
# @!attribute [rw] can_manage_pr_scenario_writing
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sandbox_region
#   @return [Boolean]
#
# @!attribute [rw] dedicated_outbound_ip_addresses
#   @return [Array]
#
# @!attribute [rw] default_trunk_bookmark
#   @return [String]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] sandbox_regions
#   @return [Array]
ImportBranchPolicy = Struct.new(
  :can_manage_pr_scenario_writing,
  :can_manage_sandbox_region,
  :dedicated_outbound_ip_addresses,
  :default_trunk_bookmark,
  :organization,
  :sandbox_regions,
  keyword_init: true
)

# Request payload for ImportBranchPolicy#load.
#
# @!attribute [rw] organization_id
#   @return [String]
ImportBranchPolicyLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for ImportBranchPolicy#update.
#
# @!attribute [rw] organization_id
#   @return [String]
ImportBranchPolicyUpdateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for ImportBranchPolicy#patch.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] default_trunk_bookmark
#   @return [String, nil]
ImportBranchPolicyPatchData = Struct.new(
  :organization_id,
  :default_trunk_bookmark,
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

# InvocationControl entity data model.
class InvocationControl
end

# Request payload for InvocationControl#create.
#
# @!attribute [rw] device_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] challenge
#   @return [Object, nil]
#
# @!attribute [rw] invocation_id
#   @return [Object, nil]
#
# @!attribute [rw] request_hash
#   @return [Object, nil]
#
# @!attribute [rw] signature
#   @return [Object, nil]
InvocationControlCreateData = Struct.new(
  :device_id,
  :organization_id,
  :challenge,
  :invocation_id,
  :request_hash,
  :signature,
  keyword_init: true
)

# JobLogChunk entity data model.
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] ci_job_id
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_run_id
#   @return [Object]
#
# @!attribute [rw] ci_step_id
#   @return [Object]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] content_format
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] sequence_number
#   @return [Integer]
#
# @!attribute [rw] stream
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
JobLogChunk = Struct.new(
  :byte_size,
  :ci_job_id,
  :ci_pipeline_run_id,
  :ci_step_id,
  :content,
  :content_format,
  :created_at,
  :id,
  :organization_id,
  :sequence_number,
  :stream,
  :updated_at,
  keyword_init: true
)

# Request payload for JobLogChunk#list.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
#
# @!attribute [rw] after_sequence
#   @return [Integer, nil]
JobLogChunkListMatch = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  :after_sequence,
  keyword_init: true
)

# Request payload for JobLogChunk#create.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobLogChunkCreateData = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# JobStep entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
JobStep = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for JobStep#list.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobStepListMatch = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobStep#create.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobStepCreateData = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobStep#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobStepUpdateData = Struct.new(
  :id,
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobStep#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobStepPatchData = Struct.new(
  :id,
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# JobWorkspace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
JobWorkspace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for JobWorkspace#list.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobWorkspaceListMatch = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobWorkspace#create.
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobWorkspaceCreateData = Struct.new(
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobWorkspace#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobWorkspaceUpdateData = Struct.new(
  :id,
  :job_id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for JobWorkspace#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] job_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
JobWorkspacePatchData = Struct.new(
  :id,
  :job_id,
  :pipeline_id,
  :run_id,
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

# Known entity data model.
class Known
end

# Request payload for Known#load.
class KnownLoadMatch
end

# Label entity data model.
#
# @!attribute [rw] changes_count
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
Label = Struct.new(
  :changes_count,
  :id,
  :name,
  :slug,
  keyword_init: true
)

# Request payload for Label#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] include_unused
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
LabelListMatch = Struct.new(
  :organization_id,
  :include_unused,
  :limit,
  :q,
  keyword_init: true
)

# LeaseArtifact entity data model.
class LeaseArtifact
end

# Request payload for LeaseArtifact#create.
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseArtifactCreateData = Struct.new(
  :lease_id,
  :node_id,
  keyword_init: true
)

# LeaseCache entity data model.
class LeaseCache
end

# Request payload for LeaseCache#create.
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseCacheCreateData = Struct.new(
  :lease_id,
  :node_id,
  keyword_init: true
)

# LeaseLogChunk entity data model.
class LeaseLogChunk
end

# Request payload for LeaseLogChunk#create.
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseLogChunkCreateData = Struct.new(
  :lease_id,
  :node_id,
  keyword_init: true
)

# LeaseReconciliation entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
LeaseReconciliation = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LeaseReconciliation#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseReconciliationCreateData = Struct.new(
  :id,
  :lease_id,
  :node_id,
  keyword_init: true
)

# LeaseStep entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
LeaseStep = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LeaseStep#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseStepUpdateData = Struct.new(
  :id,
  :lease_id,
  :node_id,
  keyword_init: true
)

# LeaseVerifyDiagnostic entity data model.
#
# @!attribute [rw] browser_events
#   @return [Hash]
#
# @!attribute [rw] live_browser
#   @return [Hash]
#
# @!attribute [rw] live_view
#   @return [Hash]
#
# @!attribute [rw] steps
#   @return [Array, nil]
LeaseVerifyDiagnostic = Struct.new(
  :browser_events,
  :live_browser,
  :live_view,
  :steps,
  keyword_init: true
)

# Request payload for LeaseVerifyDiagnostic#create.
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
#
# @!attribute [rw] browser_events
#   @return [Hash]
#
# @!attribute [rw] live_browser
#   @return [Hash]
#
# @!attribute [rw] live_view
#   @return [Hash]
#
# @!attribute [rw] steps
#   @return [Array, nil]
LeaseVerifyDiagnosticCreateData = Struct.new(
  :lease_id,
  :swarm_id,
  :task_id,
  :browser_events,
  :live_browser,
  :live_view,
  :steps,
  keyword_init: true
)

# LeaseVerifySecret entity data model.
class LeaseVerifySecret
end

# Request payload for LeaseVerifySecret#create.
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
LeaseVerifySecretCreateData = Struct.new(
  :lease_id,
  :swarm_id,
  :task_id,
  keyword_init: true
)

# LeaseWorkspace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
LeaseWorkspace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LeaseWorkspace#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lease_id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
LeaseWorkspaceUpdateData = Struct.new(
  :id,
  :lease_id,
  :node_id,
  keyword_init: true
)

# LocalAgentDecision entity data model.
#
# @!attribute [rw] request
#   @return [Hash]
LocalAgentDecision = Struct.new(
  :request,
  keyword_init: true
)

# Request payload for LocalAgentDecision#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] request
#   @return [Hash]
LocalAgentDecisionCreateData = Struct.new(
  :organization_id,
  :request,
  keyword_init: true
)

# LocalAgentResponse entity data model.
#
# @!attribute [rw] input
#   @return [Array]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] service_tier
#   @return [Object, nil]
#
# @!attribute [rw] store
#   @return [Boolean]
#
# @!attribute [rw] stream
#   @return [Boolean]
#
# @!attribute [rw] tools
#   @return [Array, nil]
LocalAgentResponse = Struct.new(
  :input,
  :model,
  :service_tier,
  :store,
  :stream,
  :tools,
  keyword_init: true
)

# Request payload for LocalAgentResponse#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Array]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] service_tier
#   @return [Object, nil]
#
# @!attribute [rw] store
#   @return [Boolean]
#
# @!attribute [rw] stream
#   @return [Boolean]
#
# @!attribute [rw] tools
#   @return [Array, nil]
LocalAgentResponseCreateData = Struct.new(
  :organization_id,
  :input,
  :model,
  :service_tier,
  :store,
  :stream,
  :tools,
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

# LogStreamChunk entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
LogStreamChunk = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LogStreamChunk#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] log_stream_id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
LogStreamChunkLoadMatch = Struct.new(
  :id,
  :log_stream_id,
  :space_id,
  keyword_init: true
)

# Request payload for LogStreamChunk#list.
#
# @!attribute [rw] log_stream_id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
LogStreamChunkListMatch = Struct.new(
  :log_stream_id,
  :space_id,
  keyword_init: true
)

# Request payload for LogStreamChunk#create.
#
# @!attribute [rw] log_stream_id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
LogStreamChunkCreateData = Struct.new(
  :log_stream_id,
  :space_id,
  keyword_init: true
)

# LogoImage entity data model.
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
LogoImage = Struct.new(
  :activated_products,
  :agents_only,
  :can_activate_products,
  :created_at,
  :created_at_label,
  :github_prs_authored_by_change_author,
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

# Request payload for LogoImage#update.
#
# @!attribute [rw] organization_id
#   @return [String]
LogoImageUpdateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for LogoImage#remove.
#
# @!attribute [rw] organization_id
#   @return [String]
LogoImageRemoveMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# MarketingSetting entity data model.
#
# @!attribute [rw] call_first
#   @return [Boolean]
MarketingSetting = Struct.new(
  :call_first,
  keyword_init: true
)

# Request payload for MarketingSetting#list.
#
# @!attribute [rw] call_first
#   @return [Boolean, nil]
MarketingSettingListMatch = Struct.new(
  :call_first,
  keyword_init: true
)

# McpOauth entity data model.
class McpOauth
end

# Request payload for McpOauth#load.
#
# @!attribute [rw] request
#   @return [String]
McpOauthLoadMatch = Struct.new(
  :request,
  keyword_init: true
)

# Request payload for McpOauth#create.
#
# @!attribute [rw] all_organizations
#   @return [Object, nil]
#
# @!attribute [rw] approve
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [Object, nil]
#
# @!attribute [rw] request
#   @return [Object, nil]
McpOauthCreateData = Struct.new(
  :all_organizations,
  :approve,
  :organization_id,
  :request,
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

# MergeQueueEntry entity data model.
#
# @!attribute [rw] analytics
#   @return [Hash]
#
# @!attribute [rw] change_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_target_commit_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_target_version
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] github_pr_number
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] policy
#   @return [Hash]
#
# @!attribute [rw] priority
#   @return [String, nil]
#
# @!attribute [rw] queue
#   @return [Hash]
#
# @!attribute [rw] target_branches
#   @return [Array, nil]
#
# @!attribute [rw] when_ready
#   @return [Object, nil]
MergeQueueEntry = Struct.new(
  :analytics,
  :change_id,
  :expected_target_commit_id,
  :expected_target_version,
  :expected_version,
  :github_pr_number,
  :id,
  :idempotency_key,
  :kind,
  :policy,
  :priority,
  :queue,
  :target_branches,
  :when_ready,
  keyword_init: true
)

# Request payload for MergeQueueEntry#create.
#
# @!attribute [rw] merge_queue_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] change_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_target_commit_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_target_version
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] github_pr_number
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] priority
#   @return [String, nil]
#
# @!attribute [rw] when_ready
#   @return [Object, nil]
MergeQueueEntryCreateData = Struct.new(
  :merge_queue_id,
  :organization_id,
  :repo_id,
  :change_id,
  :expected_target_commit_id,
  :expected_target_version,
  :expected_version,
  :github_pr_number,
  :idempotency_key,
  :kind,
  :priority,
  :when_ready,
  keyword_init: true
)

# Request payload for MergeQueueEntry#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] merge_queue_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
MergeQueueEntryRemoveMatch = Struct.new(
  :id,
  :merge_queue_id,
  :organization_id,
  :repo_id,
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

# MergeResolution entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] content
#   @return [Object, nil]
#
# @!attribute [rw] context
#   @return [Hash, nil]
#
# @!attribute [rw] duration_ms
#   @return [Integer]
#
# @!attribute [rw] fallback
#   @return [Boolean]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] ours
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] resolved
#   @return [Boolean]
#
# @!attribute [rw] theirs
#   @return [String]
MergeResolution = Struct.new(
  :action,
  :base,
  :content,
  :context,
  :duration_ms,
  :fallback,
  :model,
  :ours,
  :path,
  :resolved,
  :theirs,
  keyword_init: true
)

# Request payload for MergeResolution#create.
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] context
#   @return [Hash, nil]
#
# @!attribute [rw] ours
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] theirs
#   @return [String]
MergeResolutionCreateData = Struct.new(
  :base,
  :context,
  :ours,
  :path,
  :theirs,
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

# MetronomeWebhook entity data model.
class MetronomeWebhook
end

# Request payload for MetronomeWebhook#create.
class MetronomeWebhookCreateData
end

# ModelSubscriptionAccount entity data model.
#
# @!attribute [rw] accounts
#   @return [Array]
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean]
#
# @!attribute [rw] connection_agent
#   @return [Object]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] saved
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] usable
#   @return [Boolean]
ModelSubscriptionAccount = Struct.new(
  :accounts,
  :agents,
  :can_disconnect,
  :connection_agent,
  :email,
  :id,
  :label,
  :provider,
  :saved,
  :status,
  :usable,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccount#list.
#
# @!attribute [rw] accounts
#   @return [Array, nil]
#
# @!attribute [rw] agents
#   @return [Array, nil]
#
# @!attribute [rw] can_disconnect
#   @return [Boolean, nil]
#
# @!attribute [rw] connection_agent
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] saved
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] usable
#   @return [Boolean, nil]
ModelSubscriptionAccountListMatch = Struct.new(
  :accounts,
  :agents,
  :can_disconnect,
  :connection_agent,
  :email,
  :id,
  :label,
  :provider,
  :saved,
  :status,
  :usable,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccount#create.
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] action_name
#   @return [Object, nil]
#
# @!attribute [rw] agent_id
#   @return [Object, nil]
#
# @!attribute [rw] profile_id
#   @return [Object, nil]
#
# @!attribute [rw] token
#   @return [Object, nil]
ModelSubscriptionAccountCreateData = Struct.new(
  :label,
  :action_name,
  :agent_id,
  :profile_id,
  :token,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccount#update.
#
# @!attribute [rw] id
#   @return [String]
ModelSubscriptionAccountUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccount#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] label
#   @return [String, nil]
ModelSubscriptionAccountPatchData = Struct.new(
  :id,
  :label,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccount#remove.
#
# @!attribute [rw] id
#   @return [String]
ModelSubscriptionAccountRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ModelSubscriptionAccountConnection entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ModelSubscriptionAccountConnection = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccountConnection#load.
#
# @!attribute [rw] id
#   @return [String]
ModelSubscriptionAccountConnectionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ModelSubscriptionAccountConnection#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] action_name
#   @return [Object, nil]
#
# @!attribute [rw] login_id
#   @return [Object, nil]
#
# @!attribute [rw] method
#   @return [Object, nil]
#
# @!attribute [rw] step_id
#   @return [Object, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
ModelSubscriptionAccountConnectionUpdateData = Struct.new(
  :id,
  :action_name,
  :login_id,
  :method,
  :step_id,
  :value,
  keyword_init: true
)

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

# NetworkingSpace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
NetworkingSpace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkingSpace#load.
#
# @!attribute [rw] id
#   @return [String]
NetworkingSpaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkingSpace#list.
#
# @!attribute [rw] id
#   @return [String, nil]
NetworkingSpaceListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkingSpace#create.
class NetworkingSpaceCreateData
end

# Request payload for NetworkingSpace#update.
#
# @!attribute [rw] id
#   @return [String]
NetworkingSpaceUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkingSpace#patch.
#
# @!attribute [rw] id
#   @return [String]
NetworkingSpacePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkingSpace#remove.
#
# @!attribute [rw] id
#   @return [String]
NetworkingSpaceRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Node entity data model.
#
# @!attribute [rw] account_avatar_url
#   @return [Object]
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] installation_id
#   @return [String]
#
# @!attribute [rw] installed_at
#   @return [Object]
#
# @!attribute [rw] installed_at_label
#   @return [Object]
#
# @!attribute [rw] manage_access_url
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permission_entries
#   @return [Array]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] suspended_at
#   @return [Object]
#
# @!attribute [rw] suspended_at_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
Node = Struct.new(
  :account_avatar_url,
  :account_id,
  :account_login,
  :created_at,
  :created_at_label,
  :id,
  :installation_id,
  :installed_at,
  :installed_at_label,
  :manage_access_url,
  :organization_id,
  :permission_entries,
  :permissions,
  :status,
  :suspended_at,
  :suspended_at_label,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for Node#list.
#
# @!attribute [rw] organization_id
#   @return [String]
NodeListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# NodeCertificate entity data model.
class NodeCertificate
end

# Request payload for NodeCertificate#create.
#
# @!attribute [rw] node_id
#   @return [String]
NodeCertificateCreateData = Struct.new(
  :node_id,
  keyword_init: true
)

# NodeLease entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
NodeLease = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NodeLease#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
NodeLeaseLoadMatch = Struct.new(
  :id,
  :node_id,
  keyword_init: true
)

# Request payload for NodeLease#list.
#
# @!attribute [rw] node_id
#   @return [String]
NodeLeaseListMatch = Struct.new(
  :node_id,
  keyword_init: true
)

# Request payload for NodeLease#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] node_id
#   @return [String]
NodeLeaseCreateData = Struct.new(
  :id,
  :node_id,
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

# Now entity data model.
#
# @!attribute [rw] needs_attention
#   @return [Array]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] recently_landed
#   @return [Array]
#
# @!attribute [rw] shipping_now
#   @return [Array]
#
# @!attribute [rw] summary
#   @return [Hash]
Now = Struct.new(
  :needs_attention,
  :pagination,
  :recently_landed,
  :shipping_now,
  :summary,
  keyword_init: true
)

# Request payload for Now#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
NowLoadMatch = Struct.new(
  :organization_id,
  :page,
  keyword_init: true
)

# ObservabilityClickhouseCluster entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilityClickhouseCluster = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityClickhouseCluster#load.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityClickhouseClusterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityClickhouseCluster#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilityClickhouseClusterListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityClickhouseCluster#create.
class ObservabilityClickhouseClusterCreateData
end

# Request payload for ObservabilityClickhouseCluster#update.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityClickhouseClusterUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityClickhouseCluster#patch.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityClickhouseClusterPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityClickhouseCluster#remove.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityClickhouseClusterRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ObservabilityQuickwitCluster entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilityQuickwitCluster = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityQuickwitCluster#load.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityQuickwitClusterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityQuickwitCluster#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilityQuickwitClusterListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityQuickwitCluster#create.
class ObservabilityQuickwitClusterCreateData
end

# Request payload for ObservabilityQuickwitCluster#update.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityQuickwitClusterUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityQuickwitCluster#patch.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityQuickwitClusterPatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilityQuickwitCluster#remove.
#
# @!attribute [rw] id
#   @return [String]
ObservabilityQuickwitClusterRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ObservabilitySpace entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilitySpace = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilitySpace#load.
#
# @!attribute [rw] id
#   @return [String]
ObservabilitySpaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilitySpace#list.
#
# @!attribute [rw] id
#   @return [String, nil]
ObservabilitySpaceListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilitySpace#create.
class ObservabilitySpaceCreateData
end

# Request payload for ObservabilitySpace#update.
#
# @!attribute [rw] id
#   @return [String]
ObservabilitySpaceUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilitySpace#patch.
#
# @!attribute [rw] id
#   @return [String]
ObservabilitySpacePatchData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ObservabilitySpace#remove.
#
# @!attribute [rw] id
#   @return [String]
ObservabilitySpaceRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Openapi entity data model.
class Openapi
end

# Request payload for Openapi#load.
class OpenapiLoadMatch
end

# OrgInvitation entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] invitation
#   @return [Hash]
#
# @!attribute [rw] registration_options
#   @return [Object]
#
# @!attribute [rw] requires_password_setup
#   @return [Boolean]
#
# @!attribute [rw] start_guided_setup
#   @return [Boolean]
OrgInvitation = Struct.new(
  :id,
  :invitation,
  :registration_options,
  :requires_password_setup,
  :start_guided_setup,
  keyword_init: true
)

# Request payload for OrgInvitation#load.
#
# @!attribute [rw] id
#   @return [String]
OrgInvitationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrgInvitation#create.
#
# @!attribute [rw] id
#   @return [String]
OrgInvitationCreateData = Struct.new(
  :id,
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

# OrganizationApp entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationApp = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationApp#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] context
#   @return [Boolean, nil]
#
# @!attribute [rw] installed
#   @return [Boolean, nil]
#
# @!attribute [rw] native_agent_id
#   @return [String]
OrganizationAppListMatch = Struct.new(
  :organization_id,
  :context,
  :installed,
  :native_agent_id,
  keyword_init: true
)

# Request payload for OrganizationApp#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationAppUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationApp#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationAppRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationControl entity data model.
class OrganizationControl
end

# Request payload for OrganizationControl#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] device_id
#   @return [Object, nil]
#
# @!attribute [rw] native_device_id
#   @return [Object, nil]
#
# @!attribute [rw] pairing_generation
#   @return [Object, nil]
OrganizationControlCreateData = Struct.new(
  :organization_id,
  :device_id,
  :native_device_id,
  :pairing_generation,
  keyword_init: true
)

# OrganizationDevice entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationDevice = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationDevice#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Object, nil]
#
# @!attribute [rw] signature
#   @return [Object, nil]
OrganizationDeviceCreateData = Struct.new(
  :id,
  :organization_id,
  :payload,
  :signature,
  keyword_init: true
)

# OrganizationIdentityCertificate entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationIdentityCertificate = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificateLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#list.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificateListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificateCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificateUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificatePatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationIdentityCertificate#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationIdentityCertificateRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationInteraction entity data model.
class OrganizationInteraction
end

# Request payload for OrganizationInteraction#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationInteractionCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationInvitation entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String]
OrganizationInvitation = Struct.new(
  :email,
  :id,
  :role,
  keyword_init: true
)

# Request payload for OrganizationInvitation#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
OrganizationInvitationCreateData = Struct.new(
  :organization_id,
  :email,
  :role,
  keyword_init: true
)

# Request payload for OrganizationInvitation#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationInvitationRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationMessageFile entity data model.
class OrganizationMessageFile
end

# Request payload for OrganizationMessageFile#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationMessageFileCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationOidcTrust entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationOidcTrust = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#list.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustPatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationOidcTrust#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationOidcTrustRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationRunEvent entity data model.
class OrganizationRunEvent
end

# Request payload for OrganizationRunEvent#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationRunEventCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationRunOutcome entity data model.
class OrganizationRunOutcome
end

# Request payload for OrganizationRunOutcome#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationRunOutcomeCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationRunUsage entity data model.
class OrganizationRunUsage
end

# Request payload for OrganizationRunUsage#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationRunUsageCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationSandbox entity data model.
class OrganizationSandbox
end

# Request payload for OrganizationSandbox#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSandboxCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationSecret entity data model.
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
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] created_by
#   @return [Object]
#
# @!attribute [rw] current_version
#   @return [Object]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] env_key
#   @return [String]
#
# @!attribute [rw] expose_to_build
#   @return [Boolean]
#
# @!attribute [rw] expose_to_ci
#   @return [Boolean]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_accessed_at
#   @return [Object]
#
# @!attribute [rw] last_accessed_at_label
#   @return [Object]
#
# @!attribute [rw] last_accessed_by
#   @return [Object]
#
# @!attribute [rw] latest_version_number
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [Object]
#
# @!attribute [rw] owner_service_account_id
#   @return [Object]
#
# @!attribute [rw] rotation_policy
#   @return [Object]
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
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
OrganizationSecret = Struct.new(
  :app_environment_id,
  :app_service_id,
  :created_at,
  :created_at_label,
  :created_by,
  :current_version,
  :description,
  :env_key,
  :expose_to_build,
  :expose_to_ci,
  :hosted_app_id,
  :id,
  :last_accessed_at,
  :last_accessed_at_label,
  :last_accessed_by,
  :latest_version_number,
  :name,
  :organization_id,
  :owner_service_account_id,
  :rotation_policy,
  :scope_kind,
  :slug,
  :status,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for OrganizationSecret#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSecret#list.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSecret#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSecret#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSecret#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretPatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSecret#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSecretRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationServiceAccount entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationServiceAccount = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#list.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountPatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationServiceAccount#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationServiceAccountRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationSetting entity data model.
#
# @!attribute [rw] concurrent_run_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] customize_onboarding_packages
#   @return [Boolean, nil]
#
# @!attribute [rw] daily_run_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] deployment_usage_visibility
#   @return [String, nil]
#
# @!attribute [rw] monthly_browser_minutes_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] monthly_budget_dollars
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] onboarding_custom_pricing
#   @return [Boolean, nil]
#
# @!attribute [rw] onboarding_package_keys
#   @return [Array, nil]
OrganizationSetting = Struct.new(
  :concurrent_run_limit_override,
  :customize_onboarding_packages,
  :daily_run_limit_override,
  :deployment_usage_visibility,
  :monthly_browser_minutes_limit_override,
  :monthly_budget_dollars,
  :name,
  :onboarding_custom_pricing,
  :onboarding_package_keys,
  keyword_init: true
)

# Request payload for OrganizationSetting#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] concurrent_run_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] customize_onboarding_packages
#   @return [Boolean, nil]
#
# @!attribute [rw] daily_run_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] deployment_usage_visibility
#   @return [String, nil]
#
# @!attribute [rw] monthly_browser_minutes_limit_override
#   @return [Object, nil]
#
# @!attribute [rw] monthly_budget_dollars
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] onboarding_custom_pricing
#   @return [Boolean, nil]
#
# @!attribute [rw] onboarding_package_keys
#   @return [Array, nil]
OrganizationSettingUpdateData = Struct.new(
  :organization_id,
  :concurrent_run_limit_override,
  :customize_onboarding_packages,
  :daily_run_limit_override,
  :deployment_usage_visibility,
  :monthly_browser_minutes_limit_override,
  :monthly_budget_dollars,
  :name,
  :onboarding_custom_pricing,
  :onboarding_package_keys,
  keyword_init: true
)

# OrganizationSite entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationSite = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationSite#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] native_agent_id
#   @return [String]
OrganizationSiteListMatch = Struct.new(
  :organization_id,
  :native_agent_id,
  keyword_init: true
)

# Request payload for OrganizationSite#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSiteCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSite#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSiteUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationSite#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSiteRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OrganizationSubscription entity data model.
class OrganizationSubscription
end

# Request payload for OrganizationSubscription#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationSubscriptionCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# OrganizationTool entity data model.
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] native_agent_id
#   @return [String]
#
# @!attribute [rw] tool
#   @return [String]
OrganizationTool = Struct.new(
  :arguments,
  :native_agent_id,
  :tool,
  keyword_init: true
)

# Request payload for OrganizationTool#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] arguments
#   @return [Hash]
#
# @!attribute [rw] native_agent_id
#   @return [String]
#
# @!attribute [rw] tool
#   @return [String]
OrganizationToolCreateData = Struct.new(
  :organization_id,
  :arguments,
  :native_agent_id,
  :tool,
  keyword_init: true
)

# OrganizationWorkloadIdentity entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
OrganizationWorkloadIdentity = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#list.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#create.
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityPatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for OrganizationWorkloadIdentity#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
OrganizationWorkloadIdentityRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# OtelIngest entity data model.
class OtelIngest
end

# Request payload for OtelIngest#create.
class OtelIngestCreateData
end

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

# PageArtefact entity data model.
#
# @!attribute [rw] artefact
#   @return [Object]
#
# @!attribute [rw] automation
#   @return [Object]
#
# @!attribute [rw] automation_invocation_id
#   @return [Object, nil]
#
# @!attribute [rw] byte_size
#   @return [Integer]
#
# @!attribute [rw] checksum_sha256
#   @return [String]
#
# @!attribute [rw] comment_threads
#   @return [Array]
#
# @!attribute [rw] content_type
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] created_by_user_id
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] document_key
#   @return [String, nil]
#
# @!attribute [rw] draft
#   @return [Object]
#
# @!attribute [rw] entrypoint
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [Object, nil]
#
# @!attribute [rw] filename
#   @return [String]
#
# @!attribute [rw] files
#   @return [Array, nil]
#
# @!attribute [rw] harness
#   @return [Object, nil]
#
# @!attribute [rw] harness_version
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] kinds
#   @return [Array]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] preview
#   @return [Hash]
#
# @!attribute [rw] published_at
#   @return [Object, nil]
#
# @!attribute [rw] published_at_label
#   @return [Object]
#
# @!attribute [rw] publisher
#   @return [Object]
#
# @!attribute [rw] repository
#   @return [Object]
#
# @!attribute [rw] repository_id
#   @return [Object, nil]
#
# @!attribute [rw] selected_path
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] vcs_agent_checkpoint_id
#   @return [Object, nil]
#
# @!attribute [rw] vcs_agent_session_id
#   @return [Object, nil]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] versions
#   @return [Array]
#
# @!attribute [rw] view_url
#   @return [String]
#
# @!attribute [rw] web_url
#   @return [String]
PageArtefact = Struct.new(
  :artefact,
  :automation,
  :automation_invocation_id,
  :byte_size,
  :checksum_sha256,
  :comment_threads,
  :content_type,
  :created_at,
  :created_by_user_id,
  :description,
  :document_key,
  :draft,
  :entrypoint,
  :expires_at,
  :filename,
  :files,
  :harness,
  :harness_version,
  :id,
  :kind,
  :kinds,
  :model,
  :organization,
  :organization_id,
  :pagination,
  :permissions,
  :preview,
  :published_at,
  :published_at_label,
  :publisher,
  :repository,
  :repository_id,
  :selected_path,
  :slug,
  :source,
  :status,
  :title,
  :vcs_agent_checkpoint_id,
  :vcs_agent_session_id,
  :version,
  :versions,
  :view_url,
  :web_url,
  keyword_init: true
)

# Request payload for PageArtefact#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
#
# @!attribute [rw] versions_page
#   @return [Integer, nil]
PageArtefactLoadMatch = Struct.new(
  :id,
  :organization_id,
  :file,
  :version,
  :versions_page,
  keyword_init: true
)

# Request payload for PageArtefact#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] harness
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
PageArtefactListMatch = Struct.new(
  :organization_id,
  :author,
  :harness,
  :kind,
  :model,
  :page,
  :q,
  :repo,
  :slug,
  :source,
  keyword_init: true
)

# PageCiPipelineRun entity data model.
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jobs
#   @return [Array]
PageCiPipelineRun = Struct.new(
  :error,
  :id,
  :jobs,
  keyword_init: true
)

# Request payload for PageCiPipelineRun#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
PageCiPipelineRunLoadMatch = Struct.new(
  :id,
  :pipeline_id,
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

# PageRepoVcCommit entity data model.
#
# @!attribute [rw] commit
#   @return [Object]
#
# @!attribute [rw] diff_path
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
PageRepoVcCommit = Struct.new(
  :commit,
  :diff_path,
  :id,
  keyword_init: true
)

# Request payload for PageRepoVcCommit#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] parent
#   @return [String, nil]
PageRepoVcCommitLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :parent,
  keyword_init: true
)

# PagesBilling entity data model.
#
# @!attribute [rw] addons
#   @return [Array]
#
# @!attribute [rw] breakdown
#   @return [Object]
#
# @!attribute [rw] budget
#   @return [Object]
#
# @!attribute [rw] can_manage_contact
#   @return [Boolean]
#
# @!attribute [rw] can_manage_extra_spend
#   @return [Boolean]
#
# @!attribute [rw] can_manage_local_subscription
#   @return [Boolean]
#
# @!attribute [rw] can_manage_payment_method
#   @return [Boolean]
#
# @!attribute [rw] can_set_up_billing
#   @return [Boolean]
#
# @!attribute [rw] customer
#   @return [Object]
#
# @!attribute [rw] deployment_usage_visible
#   @return [Boolean]
#
# @!attribute [rw] entitlements
#   @return [Hash]
#
# @!attribute [rw] extra_spend_enabled
#   @return [Boolean]
#
# @!attribute [rw] feature_enabled
#   @return [Boolean]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] package
#   @return [Object]
#
# @!attribute [rw] prepaid
#   @return [Object]
#
# @!attribute [rw] preview
#   @return [Object]
#
# @!attribute [rw] storage_usage
#   @return [Hash]
#
# @!attribute [rw] stripe
#   @return [Hash]
#
# @!attribute [rw] subscription
#   @return [Object]
#
# @!attribute [rw] token_account
#   @return [Hash]
PagesBilling = Struct.new(
  :addons,
  :breakdown,
  :budget,
  :can_manage_contact,
  :can_manage_extra_spend,
  :can_manage_local_subscription,
  :can_manage_payment_method,
  :can_set_up_billing,
  :customer,
  :deployment_usage_visible,
  :entitlements,
  :extra_spend_enabled,
  :feature_enabled,
  :organization_id,
  :package,
  :prepaid,
  :preview,
  :storage_usage,
  :stripe,
  :subscription,
  :token_account,
  keyword_init: true
)

# Request payload for PagesBilling#load.
#
# @!attribute [rw] organization_id
#   @return [String]
PagesBillingLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# PagesGithubOnboarding entity data model.
#
# @!attribute [rw] onboarding
#   @return [Hash]
#
# @!attribute [rw] organization
#   @return [Hash]
PagesGithubOnboarding = Struct.new(
  :onboarding,
  :organization,
  keyword_init: true
)

# Request payload for PagesGithubOnboarding#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] github_app_installation_id
#   @return [String, nil]
#
# @!attribute [rw] github_import_batch_id
#   @return [String, nil]
PagesGithubOnboardingLoadMatch = Struct.new(
  :organization_id,
  :github_app_installation_id,
  :github_import_batch_id,
  keyword_init: true
)

# PagesMember entity data model.
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
PagesMember = Struct.new(
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

# Request payload for PagesMember#list.
#
# @!attribute [rw] organization_id
#   @return [String]
PagesMemberListMatch = Struct.new(
  :organization_id,
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

# PagesRegistry entity data model.
#
# @!attribute [rw] active_repository_count
#   @return [Integer]
#
# @!attribute [rw] error
#   @return [Object]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] repositories
#   @return [Array]
#
# @!attribute [rw] repository_count
#   @return [Integer]
PagesRegistry = Struct.new(
  :active_repository_count,
  :error,
  :pagination,
  :repositories,
  :repository_count,
  keyword_init: true
)

# Request payload for PagesRegistry#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
PagesRegistryLoadMatch = Struct.new(
  :organization_id,
  :page,
  keyword_init: true
)

# PagesSession entity data model.
#
# @!attribute [rw] adapter
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Object]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] ended_at
#   @return [Object]
#
# @!attribute [rw] external_session_id
#   @return [String]
#
# @!attribute [rw] facets
#   @return [Hash]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] github_access_warnings
#   @return [Array, nil]
#
# @!attribute [rw] harness
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_activity_at
#   @return [Object]
#
# @!attribute [rw] last_checkpoint_at
#   @return [Object]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] markers
#   @return [Array]
#
# @!attribute [rw] max_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pagination
#   @return [Hash]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] repository
#   @return [Object]
#
# @!attribute [rw] search
#   @return [Object, nil]
#
# @!attribute [rw] search_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] session
#   @return [Object]
#
# @!attribute [rw] sessions
#   @return [Array]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] stats
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [Object]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] token_stats
#   @return [Object]
#
# @!attribute [rw] transcript_index
#   @return [Object]
#
# @!attribute [rw] transcript_stats
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [Object]
#
# @!attribute [rw] user
#   @return [Object]
#
# @!attribute [rw] user_id
#   @return [String, nil]
PagesSession = Struct.new(
  :adapter,
  :created_at,
  :cursor,
  :ended_at,
  :external_session_id,
  :facets,
  :from,
  :github_access_warnings,
  :harness,
  :id,
  :last_activity_at,
  :last_checkpoint_at,
  :limit,
  :markers,
  :max_bytes,
  :mode,
  :offset,
  :pagination,
  :query,
  :repo,
  :repository,
  :search,
  :search_enabled,
  :session,
  :sessions,
  :started_at,
  :stats,
  :status,
  :title,
  :to,
  :token_stats,
  :transcript_index,
  :transcript_stats,
  :updated_at,
  :user,
  :user_id,
  keyword_init: true
)

# Request payload for PagesSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] around_event
#   @return [Integer, nil]
#
# @!attribute [rw] checkpoint
#   @return [String, nil]
#
# @!attribute [rw] event_digest
#   @return [String, nil]
PagesSessionLoadMatch = Struct.new(
  :id,
  :organization_id,
  :around_event,
  :checkpoint,
  :event_digest,
  keyword_init: true
)

# Request payload for PagesSession#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adapter
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
PagesSessionListMatch = Struct.new(
  :organization_id,
  :adapter,
  :from,
  :limit,
  :offset,
  :repo,
  :session,
  :status,
  :to,
  :user_id,
  keyword_init: true
)

# Request payload for PagesSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] adapter
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] max_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
PagesSessionCreateData = Struct.new(
  :organization_id,
  :adapter,
  :cursor,
  :from,
  :limit,
  :max_bytes,
  :mode,
  :offset,
  :query,
  :repo,
  :status,
  :to,
  :user_id,
  keyword_init: true
)

# Pairing entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Pairing = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Pairing#load.
#
# @!attribute [rw] id
#   @return [String]
PairingLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Pairing#list.
#
# @!attribute [rw] id
#   @return [String, nil]
PairingListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Pairing#create.
class PairingCreateData
end

# PairingEvent entity data model.
class PairingEvent
end

# Request payload for PairingEvent#list.
#
# @!attribute [rw] pairing_id
#   @return [String]
PairingEventListMatch = Struct.new(
  :pairing_id,
  keyword_init: true
)

# ParallelV1 entity data model.
class ParallelV1
end

# Request payload for ParallelV1#create.
#
# @!attribute [rw] organization_id
#   @return [String]
ParallelV1CreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# PatchsetDiff entity data model.
#
# @!attribute [rw] files
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] patchset
#   @return [Hash]
PatchsetDiff = Struct.new(
  :files,
  :id,
  :patchset,
  keyword_init: true
)

# Request payload for PatchsetDiff#load.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] patchset_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
PatchsetDiffLoadMatch = Struct.new(
  :change_id,
  :id,
  :organization_id,
  :patchset_id,
  :repo_id,
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

# ProactiveAgentWaitlistEntry entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] first_task
#   @return [Object, nil]
#
# @!attribute [rw] invite_code
#   @return [Object, nil]
#
# @!attribute [rw] places_per_referral
#   @return [Integer]
#
# @!attribute [rw] position
#   @return [Integer]
#
# @!attribute [rw] position_after_next_referral
#   @return [Integer]
#
# @!attribute [rw] referral_code
#   @return [String]
#
# @!attribute [rw] referral_count
#   @return [Integer]
#
# @!attribute [rw] total
#   @return [Integer]
#
# @!attribute [rw] website
#   @return [Object, nil]
ProactiveAgentWaitlistEntry = Struct.new(
  :email,
  :first_task,
  :invite_code,
  :places_per_referral,
  :position,
  :position_after_next_referral,
  :referral_code,
  :referral_count,
  :total,
  :website,
  keyword_init: true
)

# Request payload for ProactiveAgentWaitlistEntry#load.
#
# @!attribute [rw] id
#   @return [String]
ProactiveAgentWaitlistEntryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ProactiveAgentWaitlistEntry#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] first_task
#   @return [Object, nil]
#
# @!attribute [rw] invite_code
#   @return [Object, nil]
#
# @!attribute [rw] website
#   @return [Object, nil]
ProactiveAgentWaitlistEntryCreateData = Struct.new(
  :email,
  :first_task,
  :invite_code,
  :website,
  keyword_init: true
)

# Product entity data model.
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
# @!attribute [rw] product
#   @return [String]
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
Product = Struct.new(
  :activated_products,
  :agents_only,
  :can_activate_products,
  :created_at,
  :created_at_label,
  :github_prs_authored_by_change_author,
  :id,
  :logo_url,
  :member_count,
  :name,
  :pending_invitation_count,
  :personal,
  :product,
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

# Request payload for Product#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] product
#   @return [String]
ProductCreateData = Struct.new(
  :organization_id,
  :product,
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

# PullRequestAction entity data model.
#
# @!attribute [rw] action_name
#   @return [String]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] comment_id
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Array, nil]
#
# @!attribute [rw] event
#   @return [String, nil]
#
# @!attribute [rw] expected_head_sha
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Object, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] line
#   @return [Integer, nil]
#
# @!attribute [rw] node_id
#   @return [Object, nil]
#
# @!attribute [rw] operation_key
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] run_id
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] start_line
#   @return [Integer, nil]
#
# @!attribute [rw] start_side
#   @return [String, nil]
#
# @!attribute [rw] thread_id
#   @return [String, nil]
PullRequestAction = Struct.new(
  :action_name,
  :body,
  :comment_id,
  :comments,
  :event,
  :expected_head_sha,
  :id,
  :label,
  :line,
  :node_id,
  :operation_key,
  :path,
  :run_id,
  :side,
  :start_line,
  :start_side,
  :thread_id,
  keyword_init: true
)

# Request payload for PullRequestAction#create.
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pull_request_id
#   @return [String]
#
# @!attribute [rw] action_name
#   @return [String]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] comment_id
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Array, nil]
#
# @!attribute [rw] event
#   @return [String, nil]
#
# @!attribute [rw] expected_head_sha
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] line
#   @return [Integer, nil]
#
# @!attribute [rw] operation_key
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] run_id
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] start_line
#   @return [Integer, nil]
#
# @!attribute [rw] start_side
#   @return [String, nil]
#
# @!attribute [rw] thread_id
#   @return [String, nil]
PullRequestActionCreateData = Struct.new(
  :number,
  :organization_id,
  :pull_request_id,
  :action_name,
  :body,
  :comment_id,
  :comments,
  :event,
  :expected_head_sha,
  :label,
  :line,
  :operation_key,
  :path,
  :run_id,
  :side,
  :start_line,
  :start_side,
  :thread_id,
  keyword_init: true
)

# PullRequestMagicMerge entity data model.
class PullRequestMagicMerge
end

# Request payload for PullRequestMagicMerge#create.
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pull_request_id
#   @return [String]
#
# @!attribute [rw] expected_base_sha
#   @return [Object, nil]
#
# @!attribute [rw] expected_head_sha
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] resolutions
#   @return [Object, nil]
PullRequestMagicMergeCreateData = Struct.new(
  :number,
  :organization_id,
  :pull_request_id,
  :expected_base_sha,
  :expected_head_sha,
  :idempotency_key,
  :mode,
  :resolutions,
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

# PullRequestTranscript entity data model.
#
# @!attribute [rw] adapter
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [Object]
#
# @!attribute [rw] ended_at
#   @return [Object]
#
# @!attribute [rw] external_session_id
#   @return [String]
#
# @!attribute [rw] harness
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_activity_at
#   @return [Object]
#
# @!attribute [rw] last_checkpoint_at
#   @return [Object]
#
# @!attribute [rw] repository
#   @return [Object]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] stats
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [Object]
#
# @!attribute [rw] user
#   @return [Object]
PullRequestTranscript = Struct.new(
  :adapter,
  :created_at,
  :ended_at,
  :external_session_id,
  :harness,
  :id,
  :last_activity_at,
  :last_checkpoint_at,
  :repository,
  :started_at,
  :stats,
  :status,
  :title,
  :updated_at,
  :user,
  keyword_init: true
)

# Request payload for PullRequestTranscript#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] pull_request_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] paginated
#   @return [Boolean, nil]
PullRequestTranscriptListMatch = Struct.new(
  :organization_id,
  :pull_request_id,
  :repo_id,
  :cursor,
  :limit,
  :paginated,
  keyword_init: true
)

# PullZone entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
PullZone = Struct.new(
  :id,
  :name,
  :slug,
  keyword_init: true
)

# Request payload for PullZone#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] app
#   @return [String, nil]
PullZoneListMatch = Struct.new(
  :organization_id,
  :app,
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

# RelayAgentConnection entity data model.
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
RelayAgentConnection = Struct.new(
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

# Request payload for RelayAgentConnection#load.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
RelayAgentConnectionLoadMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for RelayAgentConnection#list.
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
RelayAgentConnectionListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  :selected_connection_id,
  keyword_init: true
)

# Request payload for RelayAgentConnection#create.
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
RelayAgentConnectionCreateData = Struct.new(
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

# Request payload for RelayAgentConnection#update.
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
RelayAgentConnectionUpdateData = Struct.new(
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

# Request payload for RelayAgentConnection#remove.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
RelayAgentConnectionRemoveMatch = Struct.new(
  :agent_id,
  :id,
  :organization_id,
  keyword_init: true
)

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

# RelaySignal entity data model.
class RelaySignal
end

# Request payload for RelaySignal#create.
class RelaySignalCreateData
end

# ReleaseRollout entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ReleaseRollout = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ReleaseRollout#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] release_id
#   @return [String]
ReleaseRolloutLoadMatch = Struct.new(
  :id,
  :release_id,
  keyword_init: true
)

# Request payload for ReleaseRollout#list.
#
# @!attribute [rw] release_id
#   @return [String]
ReleaseRolloutListMatch = Struct.new(
  :release_id,
  keyword_init: true
)

# Request payload for ReleaseRollout#create.
#
# @!attribute [rw] release_id
#   @return [String]
ReleaseRolloutCreateData = Struct.new(
  :release_id,
  keyword_init: true
)

# Repo entity data model.
#
# @!attribute [rw] can_retry_import
#   @return [Boolean]
#
# @!attribute [rw] can_retry_sync
#   @return [Boolean]
#
# @!attribute [rw] disclaimer
#   @return [Object]
#
# @!attribute [rw] federated_in_home
#   @return [Boolean]
#
# @!attribute [rw] github_repository
#   @return [Object]
#
# @!attribute [rw] icon_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] import_item_id
#   @return [Object]
#
# @!attribute [rw] is_home
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] remote_repository
#   @return [Object, nil]
#
# @!attribute [rw] root_path
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] sync_error_message
#   @return [Object]
#
# @!attribute [rw] sync_provider
#   @return [String, nil]
#
# @!attribute [rw] sync_status
#   @return [String]
Repo = Struct.new(
  :can_retry_import,
  :can_retry_sync,
  :disclaimer,
  :federated_in_home,
  :github_repository,
  :icon_name,
  :id,
  :import_item_id,
  :is_home,
  :name,
  :remote_repository,
  :root_path,
  :slug,
  :sync_error_message,
  :sync_provider,
  :sync_status,
  keyword_init: true
)

# Request payload for Repo#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
RepoLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Repo#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
RepoListMatch = Struct.new(
  :organization_id,
  :direction,
  :page,
  :q,
  :sort,
  keyword_init: true
)

# Request payload for Repo#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
RepoRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# RepoAccessToken entity data model.
#
# @!attribute [rw] access_token
#   @return [Hash]
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] credential_purpose
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] expires_at_label
#   @return [Object]
#
# @!attribute [rw] expires_in_days
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_used_at
#   @return [Object]
#
# @!attribute [rw] last_used_at_label
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] permission_level
#   @return [String, nil]
#
# @!attribute [rw] plain_text_token
#   @return [String]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] revoked_at_label
#   @return [Object]
#
# @!attribute [rw] token_preview
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
RepoAccessToken = Struct.new(
  :access_token,
  :active,
  :created_at,
  :created_at_label,
  :credential_purpose,
  :expires_at,
  :expires_at_label,
  :expires_in_days,
  :id,
  :last_used_at,
  :last_used_at_label,
  :name,
  :permission_level,
  :plain_text_token,
  :revoked_at,
  :revoked_at_label,
  :token_preview,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for RepoAccessToken#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAccessTokenListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoAccessToken#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] credential_purpose
#   @return [String, nil]
#
# @!attribute [rw] expires_in_days
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] permission_level
#   @return [String, nil]
RepoAccessTokenCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :credential_purpose,
  :expires_in_days,
  :name,
  :permission_level,
  keyword_init: true
)

# Request payload for RepoAccessToken#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAccessTokenRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# RepoAction entity data model.
#
# @!attribute [rw] pipeline
#   @return [Hash]
#
# @!attribute [rw] run
#   @return [Hash]
RepoAction = Struct.new(
  :pipeline,
  :run,
  keyword_init: true
)

# Request payload for RepoAction#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String, nil]
#
# @!attribute [rw] range
#   @return [String, nil]
RepoActionListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :pipeline_id,
  :range,
  keyword_init: true
)

# RepoAgentCheckpoint entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RepoAgentCheckpoint = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RepoAgentCheckpoint#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAgentCheckpointLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# RepoAgentSession entity data model.
#
# @!attribute [rw] adapter
#   @return [String, nil]
#
# @!attribute [rw] agent_session
#   @return [Hash]
#
# @!attribute [rw] external_session_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [Object, nil]
RepoAgentSession = Struct.new(
  :adapter,
  :agent_session,
  :external_session_id,
  :id,
  :status,
  :title,
  keyword_init: true
)

# Request payload for RepoAgentSession#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAgentSessionLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoAgentSession#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAgentSessionListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoAgentSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAgentSessionCreateData = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoAgentSession#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoAgentSessionUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoAgentSession#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] agent_session
#   @return [Hash, nil]
RepoAgentSessionPatchData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :agent_session,
  keyword_init: true
)

# RepoBookmarkProtection entity data model.
#
# @!attribute [rw] actor_policy
#   @return [Hash]
#
# @!attribute [rw] bypass_mode
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_by_user_id
#   @return [Object]
#
# @!attribute [rw] enabled
#   @return [Boolean]
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
# @!attribute [rw] priority
#   @return [Integer]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] requirements
#   @return [Hash]
#
# @!attribute [rw] target_kind
#   @return [String]
#
# @!attribute [rw] target_pattern
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_by_user_id
#   @return [Object]
RepoBookmarkProtection = Struct.new(
  :actor_policy,
  :bypass_mode,
  :created_at,
  :created_by_user_id,
  :enabled,
  :id,
  :name,
  :organization_id,
  :priority,
  :repository_id,
  :requirements,
  :target_kind,
  :target_pattern,
  :updated_at,
  :updated_by_user_id,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoBookmarkProtectionLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoBookmarkProtectionListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] actor_policy
#   @return [Hash, nil]
#
# @!attribute [rw] bypass_mode
#   @return [String, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] priority
#   @return [Integer, nil]
#
# @!attribute [rw] requirements
#   @return [Hash, nil]
#
# @!attribute [rw] target_kind
#   @return [String, nil]
#
# @!attribute [rw] target_pattern
#   @return [Object, nil]
RepoBookmarkProtectionCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :actor_policy,
  :bypass_mode,
  :enabled,
  :name,
  :priority,
  :requirements,
  :target_kind,
  :target_pattern,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] actor_policy
#   @return [Hash, nil]
#
# @!attribute [rw] bypass_mode
#   @return [String, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] priority
#   @return [Integer, nil]
#
# @!attribute [rw] requirements
#   @return [Hash, nil]
#
# @!attribute [rw] target_kind
#   @return [String, nil]
#
# @!attribute [rw] target_pattern
#   @return [Object, nil]
RepoBookmarkProtectionUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :actor_policy,
  :bypass_mode,
  :enabled,
  :name,
  :priority,
  :requirements,
  :target_kind,
  :target_pattern,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] actor_policy
#   @return [Hash, nil]
#
# @!attribute [rw] bypass_mode
#   @return [String, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] priority
#   @return [Integer, nil]
#
# @!attribute [rw] requirements
#   @return [Hash, nil]
#
# @!attribute [rw] target_kind
#   @return [String, nil]
#
# @!attribute [rw] target_pattern
#   @return [Object, nil]
RepoBookmarkProtectionPatchData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :actor_policy,
  :bypass_mode,
  :enabled,
  :name,
  :priority,
  :requirements,
  :target_kind,
  :target_pattern,
  keyword_init: true
)

# Request payload for RepoBookmarkProtection#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoBookmarkProtectionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# RepoBookmarkProtectionEvent entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] actor_kind
#   @return [String]
#
# @!attribute [rw] actor_label
#   @return [Object]
#
# @!attribute [rw] actor_user_id
#   @return [Object]
#
# @!attribute [rw] bookmark_name
#   @return [String]
#
# @!attribute [rw] bookmark_protection_rule_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] decision
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] intent
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] new_target
#   @return [Object]
#
# @!attribute [rw] old_target
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] reason_codes
#   @return [Array]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] source_request_id
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
RepoBookmarkProtectionEvent = Struct.new(
  :action,
  :actor_kind,
  :actor_label,
  :actor_user_id,
  :bookmark_name,
  :bookmark_protection_rule_id,
  :created_at,
  :created_at_label,
  :decision,
  :id,
  :intent,
  :metadata,
  :new_target,
  :old_target,
  :organization_id,
  :reason_codes,
  :repository_id,
  :source_request_id,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for RepoBookmarkProtectionEvent#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] bookmark
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
RepoBookmarkProtectionEventListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :bookmark,
  :limit,
  keyword_init: true
)

# RepoCloudWorkspaceBackup entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RepoCloudWorkspaceBackup = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RepoCloudWorkspaceBackup#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoCloudWorkspaceBackupLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoCloudWorkspaceBackup#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoCloudWorkspaceBackupListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoCloudWorkspaceBackup#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoCloudWorkspaceBackupCreateData = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# RepoCodeRule entity data model.
#
# @!attribute [rw] active_revision_number
#   @return [Object]
#
# @!attribute [rw] capabilities
#   @return [Hash]
#
# @!attribute [rw] code_rule
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash]
#
# @!attribute [rw] draft_pending
#   @return [Boolean]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] expected_version
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latest_revision_number
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] repository
#   @return [Hash]
#
# @!attribute [rw] scope
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] state_version
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] web_url
#   @return [String]
RepoCodeRule = Struct.new(
  :active_revision_number,
  :capabilities,
  :code_rule,
  :created_at,
  :definition,
  :draft_pending,
  :enabled,
  :expected_version,
  :id,
  :latest_revision_number,
  :name,
  :repository,
  :scope,
  :slug,
  :state_version,
  :updated_at,
  :web_url,
  keyword_init: true
)

# Request payload for RepoCodeRule#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoCodeRuleLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoCodeRule#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] rule
#   @return [String, nil]
RepoCodeRuleListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :rule,
  keyword_init: true
)

# Request payload for RepoCodeRule#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash]
RepoCodeRuleCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :definition,
  keyword_init: true
)

# Request payload for RepoCodeRule#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
RepoCodeRuleUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :definition,
  :expected_version,
  keyword_init: true
)

# Request payload for RepoCodeRule#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] definition
#   @return [Hash, nil]
#
# @!attribute [rw] expected_version
#   @return [Integer, nil]
RepoCodeRulePatchData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :definition,
  :expected_version,
  keyword_init: true
)

# Request payload for RepoCodeRule#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoCodeRuleRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# RepoSetting entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
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
# @!attribute [rw] expires_at
#   @return [Object]
#
# @!attribute [rw] expires_at_label
#   @return [Object]
#
# @!attribute [rw] icon_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_used_at
#   @return [Object]
#
# @!attribute [rw] last_used_at_label
#   @return [Object]
#
# @!attribute [rw] merge_authority
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permission_level
#   @return [String]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] revoked_at_label
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] token_preview
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
RepoSetting = Struct.new(
  :active,
  :created_at,
  :created_at_label,
  :description,
  :expires_at,
  :expires_at_label,
  :icon_name,
  :id,
  :last_used_at,
  :last_used_at_label,
  :merge_authority,
  :name,
  :organization_id,
  :permission_level,
  :revoked_at,
  :revoked_at_label,
  :slug,
  :status,
  :token_preview,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for RepoSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoSettingListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoSetting#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] icon_name
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
RepoSettingUpdateData = Struct.new(
  :organization_id,
  :repo_id,
  :description,
  :icon_name,
  :name,
  :status,
  keyword_init: true
)

# RepoStat entity data model.
#
# @!attribute [rw] repository_stats
#   @return [Hash]
RepoStat = Struct.new(
  :repository_stats,
  keyword_init: true
)

# Request payload for RepoStat#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
RepoStatListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for RepoStat#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] repository_stats
#   @return [Hash]
RepoStatCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :repository_stats,
  keyword_init: true
)

# RepoVc entity data model.
class RepoVc
end

# Request payload for RepoVc#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
RepoVcLoadMatch = Struct.new(
  :organization_id,
  :repo_id,
  :path,
  :ref,
  keyword_init: true
)

# Request payload for RepoVc#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] into
#   @return [Object, nil]
RepoVcCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :from,
  :into,
  keyword_init: true
)

# Request payload for RepoVc#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] auto_land_enabled
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
#
# @!attribute [rw] github_merge_gate
#   @return [Object, nil]
#
# @!attribute [rw] merge_authority
#   @return [Object, nil]
#
# @!attribute [rw] merge_github_repository_connection_id
#   @return [Object, nil]
#
# @!attribute [rw] queue_concurrency
#   @return [Object, nil]
#
# @!attribute [rw] queue_validation_mode
#   @return [Object, nil]
RepoVcUpdateData = Struct.new(
  :organization_id,
  :repo_id,
  :auto_land_enabled,
  :expected_version,
  :github_merge_gate,
  :merge_authority,
  :merge_github_repository_connection_id,
  :queue_concurrency,
  :queue_validation_mode,
  keyword_init: true
)

# RepoVcCommit entity data model.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] target_commit_id
#   @return [String]
RepoVcCommit = Struct.new(
  :name,
  :target_commit_id,
  keyword_init: true
)

# Request payload for RepoVcCommit#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String]
RepoVcCommitListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :limit,
  :offset,
  :page,
  :path,
  :q,
  :ref,
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

# RepositoryAccess entity data model.
class RepositoryAccess
end

# Request payload for RepositoryAccess#load.
#
# @!attribute [rw] organization_slug
#   @return [String, nil]
RepositoryAccessLoadMatch = Struct.new(
  :organization_slug,
  keyword_init: true
)

# Request payload for RepositoryAccess#create.
class RepositoryAccessCreateData
end

# RepositoryAccessResolve entity data model.
#
# @!attribute [rw] default_branch
#   @return [String]
#
# @!attribute [rw] git_auth_username
#   @return [String]
#
# @!attribute [rw] git_https_clone_url
#   @return [Object]
#
# @!attribute [rw] git_https_supported
#   @return [Boolean]
#
# @!attribute [rw] github_access_warnings
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] membership_role
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] organization_slug
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_name
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [String]
RepositoryAccessResolve = Struct.new(
  :default_branch,
  :git_auth_username,
  :git_https_clone_url,
  :git_https_supported,
  :github_access_warnings,
  :id,
  :membership_role,
  :organization_id,
  :organization_name,
  :organization_slug,
  :repository_id,
  :repository_name,
  :repository_slug,
  keyword_init: true
)

# Request payload for RepositoryAccessResolve#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] resolve_id
#   @return [String]
RepositoryAccessResolveLoadMatch = Struct.new(
  :id,
  :resolve_id,
  keyword_init: true
)

# RepositoryEvent entity data model.
class RepositoryEvent
end

# Request payload for RepositoryEvent#create.
class RepositoryEventCreateData
end

# RepositoryImport entity data model.
#
# @!attribute [rw] can_manage_connections
#   @return [Boolean]
#
# @!attribute [rw] github_imports
#   @return [Array]
#
# @!attribute [rw] github_installations
#   @return [Array]
#
# @!attribute [rw] gitlab_configured
#   @return [Boolean]
#
# @!attribute [rw] gitlab_imports
#   @return [Array]
#
# @!attribute [rw] gitlab_integrations
#   @return [Array]
#
# @!attribute [rw] gitlab_redirect_uri
#   @return [Object]
#
# @!attribute [rw] gitlab_self_managed_available
#   @return [Boolean]
#
# @!attribute [rw] inventory_errors
#   @return [Array]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repositories
#   @return [Array]
RepositoryImport = Struct.new(
  :can_manage_connections,
  :github_imports,
  :github_installations,
  :gitlab_configured,
  :gitlab_imports,
  :gitlab_integrations,
  :gitlab_redirect_uri,
  :gitlab_self_managed_available,
  :inventory_errors,
  :organization_id,
  :repositories,
  keyword_init: true
)

# Request payload for RepositoryImport#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] accounts_only
#   @return [Boolean, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
RepositoryImportLoadMatch = Struct.new(
  :organization_id,
  :accounts_only,
  :search,
  keyword_init: true
)

# RepositoryImportSession entity data model.
#
# @!attribute [rw] action_required
#   @return [String, nil]
#
# @!attribute [rw] authorization_endpoint
#   @return [String, nil]
#
# @!attribute [rw] can_authorize_github
#   @return [Boolean]
#
# @!attribute [rw] client_name
#   @return [Object]
#
# @!attribute [rw] client_version
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] error_message
#   @return [Object]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] git_imports
#   @return [Array]
#
# @!attribute [rw] github_app_installation_id
#   @return [Object]
#
# @!attribute [rw] github_connected
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idempotency_key
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] organization_slug
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
RepositoryImportSession = Struct.new(
  :action_required,
  :authorization_endpoint,
  :can_authorize_github,
  :client_name,
  :client_version,
  :created_at,
  :error_message,
  :expires_at,
  :git_imports,
  :github_app_installation_id,
  :github_connected,
  :id,
  :idempotency_key,
  :organization_id,
  :organization_slug,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for RepositoryImportSession#load.
#
# @!attribute [rw] id
#   @return [String]
RepositoryImportSessionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RepositoryImportSession#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] client_name
#   @return [Object, nil]
#
# @!attribute [rw] client_version
#   @return [Object, nil]
#
# @!attribute [rw] github_app_installation_id
#   @return [Object, nil]
#
# @!attribute [rw] idempotency_key
#   @return [String]
RepositoryImportSessionCreateData = Struct.new(
  :organization_id,
  :client_name,
  :client_version,
  :github_app_installation_id,
  :idempotency_key,
  keyword_init: true
)

# RepositoryImportSessionRepository entity data model.
#
# @!attribute [rw] default_branch
#   @return [Object]
#
# @!attribute [rw] full_name
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] private
#   @return [Boolean]
#
# @!attribute [rw] reason
#   @return [Object, nil]
#
# @!attribute [rw] selectable
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] visibility
#   @return [String]
RepositoryImportSessionRepository = Struct.new(
  :default_branch,
  :full_name,
  :name,
  :owner,
  :private,
  :reason,
  :selectable,
  :status,
  :visibility,
  keyword_init: true
)

# Request payload for RepositoryImportSessionRepository#list.
#
# @!attribute [rw] repository_import_session_id
#   @return [String]
#
# @!attribute [rw] q
#   @return [String, nil]
RepositoryImportSessionRepositoryListMatch = Struct.new(
  :repository_import_session_id,
  :q,
  keyword_init: true
)

# RepositoryImportSessionSelection entity data model.
#
# @!attribute [rw] repositories
#   @return [Object]
RepositoryImportSessionSelection = Struct.new(
  :repositories,
  keyword_init: true
)

# Request payload for RepositoryImportSessionSelection#create.
#
# @!attribute [rw] repository_import_session_id
#   @return [String]
#
# @!attribute [rw] repositories
#   @return [Object]
RepositoryImportSessionSelectionCreateData = Struct.new(
  :repository_import_session_id,
  :repositories,
  keyword_init: true
)

# RepositorySandboxEnvironment entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RepositorySandboxEnvironment = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RepositorySandboxEnvironment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
RepositorySandboxEnvironmentLoadMatch = Struct.new(
  :id,
  :repository_id,
  keyword_init: true
)

# Request payload for RepositorySandboxEnvironment#create.
#
# @!attribute [rw] repository_id
#   @return [String]
RepositorySandboxEnvironmentCreateData = Struct.new(
  :repository_id,
  keyword_init: true
)

# RoderCodeRepair entity data model.
#
# @!attribute [rw] base_sha
#   @return [String]
#
# @!attribute [rw] cancel_requested
#   @return [Boolean]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] launch_state
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [String]
#
# @!attribute [rw] roder_thread_id
#   @return [Object]
#
# @!attribute [rw] roder_turn_id
#   @return [Object]
#
# @!attribute [rw] scenario_run_id
#   @return [String]
#
# @!attribute [rw] task
#   @return [Object]
#
# @!attribute [rw] trigger_kind
#   @return [String]
RoderCodeRepair = Struct.new(
  :base_sha,
  :cancel_requested,
  :failure_code,
  :id,
  :launch_state,
  :organization_id,
  :repository_slug,
  :roder_thread_id,
  :roder_turn_id,
  :scenario_run_id,
  :task,
  :trigger_kind,
  keyword_init: true
)

# Request payload for RoderCodeRepair#load.
#
# @!attribute [rw] id
#   @return [String]
RoderCodeRepairLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RoderCodeRepair#list.
#
# @!attribute [rw] scenario_run_id
#   @return [String]
RoderCodeRepairListMatch = Struct.new(
  :scenario_run_id,
  keyword_init: true
)

# Request payload for RoderCodeRepair#create.
#
# @!attribute [rw] base_sha
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [String]
#
# @!attribute [rw] scenario_run_id
#   @return [String]
RoderCodeRepairCreateData = Struct.new(
  :base_sha,
  :organization_id,
  :repository_slug,
  :scenario_run_id,
  keyword_init: true
)

# RoderCodeRepairSetting entity data model.
#
# @!attribute [rw] available
#   @return [Boolean]
#
# @!attribute [rw] daily_limit
#   @return [Integer]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] enabled_at
#   @return [Object]
#
# @!attribute [rw] operator_user_id
#   @return [Object]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [Object]
RoderCodeRepairSetting = Struct.new(
  :available,
  :daily_limit,
  :enabled,
  :enabled_at,
  :operator_user_id,
  :organization_id,
  :repository_slug,
  keyword_init: true
)

# Request payload for RoderCodeRepairSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
RoderCodeRepairSettingListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for RoderCodeRepairSetting#create.
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [Object, nil]
RoderCodeRepairSettingCreateData = Struct.new(
  :enabled,
  :organization_id,
  :repository_slug,
  keyword_init: true
)

# RoderMachine entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RoderMachine = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RoderMachine#update.
#
# @!attribute [rw] id
#   @return [String]
RoderMachineUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# RoderRun entity data model.
class RoderRun
end

# Request payload for RoderRun#create.
#
# @!attribute [rw] events
#   @return [Object, nil]
RoderRunCreateData = Struct.new(
  :events,
  keyword_init: true
)

# RoderWorkspaceCredential entity data model.
#
# @!attribute [rw] api_token
#   @return [String]
#
# @!attribute [rw] author_email
#   @return [String]
#
# @!attribute [rw] author_name
#   @return [String]
#
# @!attribute [rw] clone_url
#   @return [String]
#
# @!attribute [rw] default_branch
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_slug
#   @return [String]
#
# @!attribute [rw] repository_spec
#   @return [String]
#
# @!attribute [rw] required_lifetime_seconds
#   @return [Integer]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] username
#   @return [String]
RoderWorkspaceCredential = Struct.new(
  :api_token,
  :author_email,
  :author_name,
  :clone_url,
  :default_branch,
  :expires_at,
  :organization_id,
  :repository_id,
  :repository_slug,
  :repository_spec,
  :required_lifetime_seconds,
  :token,
  :username,
  keyword_init: true
)

# Request payload for RoderWorkspaceCredential#create.
#
# @!attribute [rw] required_lifetime_seconds
#   @return [Integer]
RoderWorkspaceCredentialCreateData = Struct.new(
  :required_lifetime_seconds,
  keyword_init: true
)

# RunArtifact entity data model.
class RunArtifact
end

# Request payload for RunArtifact#list.
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunArtifactListMatch = Struct.new(
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for RunArtifact#create.
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunArtifactCreateData = Struct.new(
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# RunJob entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] allow_failure
#   @return [Boolean]
#
# @!attribute [rw] cache_archive_observations
#   @return [Object]
#
# @!attribute [rw] ci_pipeline_run_id
#   @return [String]
#
# @!attribute [rw] ci_runner_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dependencies_csv
#   @return [Object]
#
# @!attribute [rw] display_id
#   @return [Integer]
#
# @!attribute [rw] environment_csv
#   @return [Object]
#
# @!attribute [rw] execution_order
#   @return [Integer]
#
# @!attribute [rw] execution_profile
#   @return [Object, nil]
#
# @!attribute [rw] exit_code
#   @return [Object]
#
# @!attribute [rw] failed
#   @return [Boolean]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] log_chunks
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] queued_at
#   @return [Object]
#
# @!attribute [rw] reconciliation_id
#   @return [Object, nil]
#
# @!attribute [rw] retry_number
#   @return [Integer]
#
# @!attribute [rw] reuse
#   @return [Object]
#
# @!attribute [rw] runner_label_selector
#   @return [Object]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] started_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
#
# @!attribute [rw] steps
#   @return [Array]
#
# @!attribute [rw] timeout_seconds
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
RunJob = Struct.new(
  :active,
  :allow_failure,
  :cache_archive_observations,
  :ci_pipeline_run_id,
  :ci_runner_id,
  :created_at,
  :dependencies_csv,
  :display_id,
  :environment_csv,
  :execution_order,
  :execution_profile,
  :exit_code,
  :failed,
  :finished_at,
  :id,
  :kind,
  :log_chunks,
  :name,
  :number,
  :organization_id,
  :queued_at,
  :reconciliation_id,
  :retry_number,
  :reuse,
  :runner_label_selector,
  :slug,
  :started_at,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :steps,
  :timeout_seconds,
  :updated_at,
  keyword_init: true
)

# Request payload for RunJob#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunJobLoadMatch = Struct.new(
  :id,
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for RunJob#list.
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunJobListMatch = Struct.new(
  :pipeline_id,
  :run_id,
  keyword_init: true
)

# Request payload for RunJob#create.
#
# @!attribute [rw] pipeline_id
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [String]
RunJobCreateData = Struct.new(
  :pipeline_id,
  :run_id,
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

# RunWorkspaceCredential entity data model.
class RunWorkspaceCredential
end

# Request payload for RunWorkspaceCredential#create.
class RunWorkspaceCredentialCreateData
end

# RunnerLease entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RunnerLease = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RunnerLease#list.
#
# @!attribute [rw] runner_id
#   @return [String]
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerLeaseListMatch = Struct.new(
  :runner_id,
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerLease#create.
#
# @!attribute [rw] runner_id
#   @return [String]
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerLeaseCreateData = Struct.new(
  :runner_id,
  :runner_pool_id,
  keyword_init: true
)

# RunnerPoolNodeEnrollmentToken entity data model.
#
# @!attribute [rw] capabilities_csv
#   @return [Object]
#
# @!attribute [rw] ci_runner_pool_id
#   @return [String]
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
# @!attribute [rw] description
#   @return [Object]
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
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] last_used_at
#   @return [Object]
#
# @!attribute [rw] last_used_at_label
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] raw_token
#   @return [Object]
#
# @!attribute [rw] revoked_at
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] token_hint
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
#
# @!attribute [rw] usage_count
#   @return [Integer]
#
# @!attribute [rw] usage_count_label
#   @return [String]
RunnerPoolNodeEnrollmentToken = Struct.new(
  :capabilities_csv,
  :ci_runner_pool_id,
  :created_at,
  :created_at_label,
  :creator_user_id,
  :description,
  :expires_at,
  :expires_at_label,
  :id,
  :kind,
  :last_used_at,
  :last_used_at_label,
  :name,
  :organization_id,
  :raw_token,
  :revoked_at,
  :status,
  :token_hint,
  :updated_at,
  :updated_at_label,
  :usage_count,
  :usage_count_label,
  keyword_init: true
)

# Request payload for RunnerPoolNodeEnrollmentToken#list.
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolNodeEnrollmentTokenListMatch = Struct.new(
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerPoolNodeEnrollmentToken#create.
#
# @!attribute [rw] runner_pool_id
#   @return [String]
#
# @!attribute [rw] capabilities_csv
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] expires_at
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
RunnerPoolNodeEnrollmentTokenCreateData = Struct.new(
  :runner_pool_id,
  :capabilities_csv,
  :description,
  :expires_at,
  :kind,
  :name,
  keyword_init: true
)

# RunnerPoolRunner entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
RunnerPoolRunner = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RunnerPoolRunner#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolRunnerLoadMatch = Struct.new(
  :id,
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerPoolRunner#list.
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolRunnerListMatch = Struct.new(
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerPoolRunner#create.
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolRunnerCreateData = Struct.new(
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerPoolRunner#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolRunnerUpdateData = Struct.new(
  :id,
  :runner_pool_id,
  keyword_init: true
)

# Request payload for RunnerPoolRunner#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] runner_pool_id
#   @return [String]
RunnerPoolRunnerPatchData = Struct.new(
  :id,
  :runner_pool_id,
  keyword_init: true
)

# RuntimeInstanceHealthSnapshot entity data model.
class RuntimeInstanceHealthSnapshot
end

# Request payload for RuntimeInstanceHealthSnapshot#list.
#
# @!attribute [rw] runtime_instance_id
#   @return [String]
RuntimeInstanceHealthSnapshotListMatch = Struct.new(
  :runtime_instance_id,
  keyword_init: true
)

# Request payload for RuntimeInstanceHealthSnapshot#create.
#
# @!attribute [rw] runtime_instance_id
#   @return [String]
RuntimeInstanceHealthSnapshotCreateData = Struct.new(
  :runtime_instance_id,
  keyword_init: true
)

# SandboxIntegration entity data model.
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] catalog
#   @return [Array]
#
# @!attribute [rw] configuration
#   @return [Hash]
#
# @!attribute [rw] connected_profiles
#   @return [Hash]
#
# @!attribute [rw] credentials
#   @return [Hash]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] integrations
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
SandboxIntegration = Struct.new(
  :can_manage,
  :catalog,
  :configuration,
  :connected_profiles,
  :credentials,
  :enabled,
  :id,
  :integrations,
  :name,
  :provider,
  :version,
  keyword_init: true
)

# Request payload for SandboxIntegration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String, nil]
SandboxIntegrationListMatch = Struct.new(
  :organization_id,
  :provider,
  keyword_init: true
)

# Request payload for SandboxIntegration#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] configuration
#   @return [Hash]
#
# @!attribute [rw] credentials
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
SandboxIntegrationCreateData = Struct.new(
  :organization_id,
  :configuration,
  :credentials,
  :name,
  :provider,
  keyword_init: true
)

# Request payload for SandboxIntegration#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] credentials
#   @return [Hash, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
SandboxIntegrationUpdateData = Struct.new(
  :id,
  :organization_id,
  :credentials,
  :enabled,
  :name,
  :version,
  keyword_init: true
)

# Request payload for SandboxIntegration#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] credentials
#   @return [Hash, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
SandboxIntegrationPatchData = Struct.new(
  :id,
  :organization_id,
  :credentials,
  :enabled,
  :name,
  :version,
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

# SecretGrant entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SecretGrant = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SecretGrant#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantLoadMatch = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretGrant#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantListMatch = Struct.new(
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretGrant#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantCreateData = Struct.new(
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretGrant#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantUpdateData = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretGrant#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantPatchData = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretGrant#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretGrantRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# SecretVersion entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SecretVersion = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SecretVersion#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionLoadMatch = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretVersion#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionListMatch = Struct.new(
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretVersion#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionCreateData = Struct.new(
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretVersion#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionUpdateData = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretVersion#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionPatchData = Struct.new(
  :id,
  :organization_id,
  :secret_id,
  keyword_init: true
)

# Request payload for SecretVersion#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] secret_id
#   @return [String]
SecretVersionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :secret_id,
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

# Setting entity data model.
#
# @!attribute [rw] can_manage_pr_scenario_writing
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sandbox_region
#   @return [Boolean]
#
# @!attribute [rw] dedicated_outbound_ip_addresses
#   @return [Array]
#
# @!attribute [rw] default_trunk_bookmark
#   @return [String]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] sandbox_regions
#   @return [Array]
Setting = Struct.new(
  :can_manage_pr_scenario_writing,
  :can_manage_sandbox_region,
  :dedicated_outbound_ip_addresses,
  :default_trunk_bookmark,
  :organization,
  :sandbox_regions,
  keyword_init: true
)

# Request payload for Setting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
SettingListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# SettingMutationLease entity data model.
class SettingMutationLease
end

# Request payload for SettingMutationLease#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] reason
#   @return [Object, nil]
SettingMutationLeaseCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :reason,
  keyword_init: true
)

# Signal entity data model.
#
# @!attribute [rw] acked_at
#   @return [Object]
#
# @!attribute [rw] acked_by
#   @return [Object]
#
# @!attribute [rw] agent_runs
#   @return [Hash]
#
# @!attribute [rw] app_service_id
#   @return [Object]
#
# @!attribute [rw] attribution
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dedupe_key
#   @return [Object]
#
# @!attribute [rw] hosted_app_id
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] links
#   @return [Hash]
#
# @!attribute [rw] occurred_at
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] recovery
#   @return [Hash]
#
# @!attribute [rw] resolution
#   @return [Hash]
#
# @!attribute [rw] severity
#   @return [String]
#
# @!attribute [rw] source
#   @return [Hash]
#
# @!attribute [rw] subject_id
#   @return [Object]
#
# @!attribute [rw] subject_type
#   @return [Object]
#
# @!attribute [rw] summary
#   @return [String]
SignalType = Struct.new(
  :acked_at,
  :acked_by,
  :agent_runs,
  :app_service_id,
  :attribution,
  :created_at,
  :dedupe_key,
  :hosted_app_id,
  :id,
  :kind,
  :links,
  :occurred_at,
  :organization_id,
  :payload,
  :recovery,
  :resolution,
  :severity,
  :source,
  :subject_id,
  :subject_type,
  :summary,
  keyword_init: true
)

# Request payload for Signal#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for Signal#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] after_id
#   @return [String, nil]
#
# @!attribute [rw] before_id
#   @return [String, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [String, nil]
#
# @!attribute [rw] integration_id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] min_severity
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] subscription_id
#   @return [String, nil]
#
# @!attribute [rw] unacked
#   @return [Boolean, nil]
SignalListMatch = Struct.new(
  :organization_id,
  :after_id,
  :before_id,
  :hosted_app_id,
  :integration_id,
  :kind,
  :limit,
  :min_severity,
  :order,
  :severity,
  :since,
  :source,
  :subscription_id,
  :unacked,
  keyword_init: true
)

# Request payload for Signal#create.
class SignalCreateData
end

# SignalInbound entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SignalInbound = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SignalInbound#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inbound_id
#   @return [String]
SignalInboundUpdateData = Struct.new(
  :id,
  :inbound_id,
  keyword_init: true
)

# SignalIntegration entity data model.
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] api_token_stored
#   @return [Boolean]
#
# @!attribute [rw] config
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inbound_path
#   @return [String]
#
# @!attribute [rw] inbound_url
#   @return [String]
#
# @!attribute [rw] last_received_at
#   @return [Object, nil]
#
# @!attribute [rw] last_verified_at
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] rejected_signature_count
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] target_count
#   @return [Integer]
#
# @!attribute [rw] unmapped_delivery_count
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] webhook_secret
#   @return [String, nil]
#
# @!attribute [rw] webhook_secret_stored
#   @return [Boolean]
SignalIntegration = Struct.new(
  :api_token,
  :api_token_stored,
  :config,
  :created_at,
  :failure_message,
  :id,
  :inbound_path,
  :inbound_url,
  :last_received_at,
  :last_verified_at,
  :mode,
  :name,
  :organization_id,
  :provider,
  :rejected_signature_count,
  :status,
  :target_count,
  :unmapped_delivery_count,
  :updated_at,
  :webhook_secret,
  :webhook_secret_stored,
  keyword_init: true
)

# Request payload for SignalIntegration#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalIntegrationLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for SignalIntegration#list.
#
# @!attribute [rw] organization_id
#   @return [String]
SignalIntegrationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for SignalIntegration#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] config
#   @return [Hash, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] webhook_secret
#   @return [String, nil]
SignalIntegrationCreateData = Struct.new(
  :organization_id,
  :api_token,
  :config,
  :mode,
  :name,
  :provider,
  :webhook_secret,
  keyword_init: true
)

# Request payload for SignalIntegration#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] config
#   @return [Hash, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] webhook_secret
#   @return [String, nil]
SignalIntegrationUpdateData = Struct.new(
  :id,
  :organization_id,
  :api_token,
  :config,
  :mode,
  :name,
  :status,
  :webhook_secret,
  keyword_init: true
)

# Request payload for SignalIntegration#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] api_token
#   @return [String, nil]
#
# @!attribute [rw] config
#   @return [Hash, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] webhook_secret
#   @return [String, nil]
SignalIntegrationPatchData = Struct.new(
  :id,
  :organization_id,
  :api_token,
  :config,
  :mode,
  :name,
  :status,
  :webhook_secret,
  keyword_init: true
)

# Request payload for SignalIntegration#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalIntegrationRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# SignalIntegrationDelivery entity data model.
#
# @!attribute [rw] attempt_count
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] delivery_id
#   @return [String]
#
# @!attribute [rw] event_kind
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_error
#   @return [Object, nil]
#
# @!attribute [rw] ops_signal_id
#   @return [Object, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] processed_at
#   @return [Object, nil]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] received_at
#   @return [Object, nil]
#
# @!attribute [rw] signal_integration_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
SignalIntegrationDelivery = Struct.new(
  :attempt_count,
  :created_at,
  :delivery_id,
  :event_kind,
  :id,
  :last_error,
  :ops_signal_id,
  :organization_id,
  :processed_at,
  :provider,
  :received_at,
  :signal_integration_id,
  :state,
  keyword_init: true
)

# Request payload for SignalIntegrationDelivery#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] signal_integration_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
SignalIntegrationDeliveryListMatch = Struct.new(
  :organization_id,
  :signal_integration_id,
  :limit,
  keyword_init: true
)

# SignalIntegrationTarget entity data model.
#
# @!attribute [rw] app_service_id
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] display_name
#   @return [Object, nil]
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] external_id
#   @return [String]
#
# @!attribute [rw] external_kind
#   @return [String]
#
# @!attribute [rw] external_slug
#   @return [Object, nil]
#
# @!attribute [rw] hosted_app_id
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] signal_integration_id
#   @return [String]
#
# @!attribute [rw] signal_integration_targets
#   @return [Array]
#
# @!attribute [rw] targets
#   @return [Array]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
SignalIntegrationTarget = Struct.new(
  :app_service_id,
  :created_at,
  :display_name,
  :enabled,
  :external_id,
  :external_kind,
  :external_slug,
  :hosted_app_id,
  :id,
  :organization_id,
  :signal_integration_id,
  :signal_integration_targets,
  :targets,
  :updated_at,
  keyword_init: true
)

# Request payload for SignalIntegrationTarget#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] signal_integration_id
#   @return [String]
SignalIntegrationTargetListMatch = Struct.new(
  :organization_id,
  :signal_integration_id,
  keyword_init: true
)

# Request payload for SignalIntegrationTarget#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] signal_integration_id
#   @return [String]
#
# @!attribute [rw] targets
#   @return [Array, nil]
SignalIntegrationTargetUpdateData = Struct.new(
  :organization_id,
  :signal_integration_id,
  :targets,
  keyword_init: true
)

# SignalSubscription entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SignalSubscription = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SignalSubscription#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for SignalSubscription#list.
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for SignalSubscription#create.
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for SignalSubscription#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for SignalSubscription#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionPatchData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for SignalSubscription#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SignalSubscriptionRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Site entity data model.
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
Site = Struct.new(
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

# Request payload for Site#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site
#   @return [String, nil]
SiteListMatch = Struct.new(
  :organization_id,
  :site,
  keyword_init: true
)

# SiteAccessKey entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SiteAccessKey = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SiteAccessKey#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site_id
#   @return [String]
SiteAccessKeyListMatch = Struct.new(
  :organization_id,
  :site_id,
  keyword_init: true
)

# Request payload for SiteAccessKey#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site_id
#   @return [String]
SiteAccessKeyCreateData = Struct.new(
  :organization_id,
  :site_id,
  keyword_init: true
)

# Request payload for SiteAccessKey#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site_id
#   @return [String]
SiteAccessKeyRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :site_id,
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

# SiteSecret entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] native_agent_id
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
SiteSecret = Struct.new(
  :id,
  :native_agent_id,
  :value,
  keyword_init: true
)

# Request payload for SiteSecret#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site_id
#   @return [String]
#
# @!attribute [rw] native_agent_id
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
SiteSecretUpdateData = Struct.new(
  :id,
  :organization_id,
  :site_id,
  :native_agent_id,
  :value,
  keyword_init: true
)

# Request payload for SiteSecret#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] site_id
#   @return [String]
SiteSecretRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :site_id,
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

# SourceConnection entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SourceConnection = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SourceConnection#create.
#
# @!attribute [rw] id
#   @return [String]
SourceConnectionCreateData = Struct.new(
  :id,
  keyword_init: true
)

# SpaceAlertRule entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceAlertRule = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRuleLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRuleListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRuleCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRuleUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRulePatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAlertRule#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAlertRuleRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceAuditEvent entity data model.
class SpaceAuditEvent
end

# Request payload for SpaceAuditEvent#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAuditEventListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceAuditEvent#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceAuditEventCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# SpaceDnsRecord entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceDnsRecord = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceDnsRecord#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceDnsRecordRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceEnrollmentToken entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceEnrollmentToken = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceEnrollmentToken#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceEnrollmentTokenRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceGateway entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceGateway = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceGateway#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGateway#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGateway#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGateway#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGateway#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGateway#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGatewayRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceGroup entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceGroup = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceGroup#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroup#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroup#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroup#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroup#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceGroupMembership entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceGroupMembership = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceGroupMembership#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupMembershipListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroupMembership#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupMembershipCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroupMembership#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupMembershipUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroupMembership#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupMembershipPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceGroupMembership#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceGroupMembershipRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceLogStream entity data model.
class SpaceLogStream
end

# Request payload for SpaceLogStream#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceLogStreamListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceLogStream#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceLogStreamCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# SpaceMetricSery entity data model.
class SpaceMetricSery
end

# Request payload for SpaceMetricSery#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceMetricSeryListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceMetricSery#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceMetricSeryCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# SpaceOtelCollector entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceOtelCollector = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceOtelCollector#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceOtelCollectorRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpacePeer entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpacePeer = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpacePeer#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeer#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeer#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeer#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeer#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeer#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpacePeerAttachment entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpacePeerAttachment = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpacePeerAttachment#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerAttachmentListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeerAttachment#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerAttachmentCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeerAttachment#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerAttachmentUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeerAttachment#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerAttachmentPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePeerAttachment#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePeerAttachmentRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpacePolicy entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpacePolicy = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpacePolicy#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePolicy#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePolicy#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpacePolicy#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePolicy#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpacePolicy#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpacePolicyRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceSegment entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
SpaceSegment = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceSegment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentLoadMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceSegment#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceSegment#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceSegment#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentUpdateData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceSegment#patch.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentPatchData = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# Request payload for SpaceSegment#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] space_id
#   @return [String]
SpaceSegmentRemoveMatch = Struct.new(
  :id,
  :space_id,
  keyword_init: true
)

# SpaceTraceSpan entity data model.
class SpaceTraceSpan
end

# Request payload for SpaceTraceSpan#list.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceTraceSpanListMatch = Struct.new(
  :space_id,
  keyword_init: true
)

# Request payload for SpaceTraceSpan#create.
#
# @!attribute [rw] space_id
#   @return [String]
SpaceTraceSpanCreateData = Struct.new(
  :space_id,
  keyword_init: true
)

# Spark entity data model.
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
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] compute_credit_cents
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] credit_cents
#   @return [Object]
#
# @!attribute [rw] first_spark
#   @return [Object]
#
# @!attribute [rw] github_connected
#   @return [Boolean]
#
# @!attribute [rw] github_prs_authored_by_change_author
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jsonrpc
#   @return [String]
#
# @!attribute [rw] logo_url
#   @return [Object]
#
# @!attribute [rw] member_count
#   @return [Integer]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
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
# @!attribute [rw] started
#   @return [Boolean]
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
Spark = Struct.new(
  :activated_products,
  :agents_only,
  :can_activate_products,
  :can_manage,
  :compute_credit_cents,
  :created_at,
  :created_at_label,
  :credit_cents,
  :first_spark,
  :github_connected,
  :github_prs_authored_by_change_author,
  :id,
  :jsonrpc,
  :logo_url,
  :member_count,
  :method,
  :name,
  :params,
  :pending_invitation_count,
  :personal,
  :repository_count,
  :role,
  :sandbox_region,
  :shared_agent_personal_accounts_enabled,
  :slug,
  :source_control_providers,
  :source_ui_enabled,
  :started,
  :timezone,
  :updated_at,
  :updated_at_label,
  :verify_pr_scenario_writing_enabled,
  keyword_init: true
)

# Request payload for Spark#list.
#
# @!attribute [rw] organization_id
#   @return [String]
SparkListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Spark#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jsonrpc
#   @return [String]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
SparkCreateData = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

# SparkAgentIntegration entity data model.
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
SparkAgentIntegration = Struct.new(
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

# Request payload for SparkAgentIntegration#list.
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
SparkAgentIntegrationListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :catalog_q,
  :cursor,
  :limit,
  :q,
  :toolkit,
  keyword_init: true
)

# Request payload for SparkAgentIntegration#create.
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
SparkAgentIntegrationCreateData = Struct.new(
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

# SparkAgentSite entity data model.
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
SparkAgentSite = Struct.new(
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

# Request payload for SparkAgentSite#list.
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
SparkAgentSiteListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :cursor,
  :limit,
  keyword_init: true
)

# SparkAgentSkill entity data model.
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
SparkAgentSkill = Struct.new(
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

# Request payload for SparkAgentSkill#list.
#
# @!attribute [rw] agent_id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SparkAgentSkillListMatch = Struct.new(
  :agent_id,
  :organization_id,
  keyword_init: true
)

# Request payload for SparkAgentSkill#create.
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
SparkAgentSkillCreateData = Struct.new(
  :agent_id,
  :organization_id,
  :enabled,
  :name,
  :version,
  keyword_init: true
)

# SparkAgentThread entity data model.
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
SparkAgentThread = Struct.new(
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

# Request payload for SparkAgentThread#list.
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
SparkAgentThreadListMatch = Struct.new(
  :agent_id,
  :organization_id,
  :archived,
  :conversation_id,
  :cursor,
  :local_cursor,
  keyword_init: true
)

# Request payload for SparkAgentThread#create.
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
SparkAgentThreadCreateData = Struct.new(
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

# SparkCredit entity data model.
#
# @!attribute [rw] amount_cents
#   @return [Integer, nil]
#
# @!attribute [rw] autofill
#   @return [Object]
#
# @!attribute [rw] autofill_payment_unconfirmed
#   @return [Boolean]
#
# @!attribute [rw] available_usd
#   @return [String]
#
# @!attribute [rw] billing_unit
#   @return [String, nil]
#
# @!attribute [rw] can_manage
#   @return [Boolean]
#
# @!attribute [rw] compute_minutes
#   @return [Hash]
#
# @!attribute [rw] compute_usd
#   @return [String, nil]
#
# @!attribute [rw] credits_per_usd
#   @return [Integer]
#
# @!attribute [rw] inference_usd
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] payment_method
#   @return [Object]
#
# @!attribute [rw] payments_enabled
#   @return [Boolean]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] plans
#   @return [Array]
#
# @!attribute [rw] quoted_credits_cents
#   @return [Integer, nil]
#
# @!attribute [rw] quoted_price_cents
#   @return [Integer, nil]
#
# @!attribute [rw] refill_limits_cents
#   @return [Array]
#
# @!attribute [rw] refill_options
#   @return [Array]
#
# @!attribute [rw] refill_thresholds_cents
#   @return [Array]
#
# @!attribute [rw] request_key
#   @return [String]
#
# @!attribute [rw] settings
#   @return [Object]
#
# @!attribute [rw] starter_cents
#   @return [Integer]
#
# @!attribute [rw] top_up_max_cents
#   @return [Integer]
#
# @!attribute [rw] top_up_step_cents
#   @return [Integer]
SparkCredit = Struct.new(
  :amount_cents,
  :autofill,
  :autofill_payment_unconfirmed,
  :available_usd,
  :billing_unit,
  :can_manage,
  :compute_minutes,
  :compute_usd,
  :credits_per_usd,
  :inference_usd,
  :kind,
  :payment_method,
  :payments_enabled,
  :plan,
  :plans,
  :quoted_credits_cents,
  :quoted_price_cents,
  :refill_limits_cents,
  :refill_options,
  :refill_thresholds_cents,
  :request_key,
  :settings,
  :starter_cents,
  :top_up_max_cents,
  :top_up_step_cents,
  keyword_init: true
)

# Request payload for SparkCredit#load.
#
# @!attribute [rw] organization_id
#   @return [String]
SparkCreditLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for SparkCredit#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] view
#   @return [String, nil]
SparkCreditListMatch = Struct.new(
  :organization_id,
  :view,
  keyword_init: true
)

# Request payload for SparkCredit#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] amount_cents
#   @return [Integer, nil]
#
# @!attribute [rw] billing_unit
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] quoted_credits_cents
#   @return [Integer, nil]
#
# @!attribute [rw] quoted_price_cents
#   @return [Integer, nil]
#
# @!attribute [rw] request_key
#   @return [String]
SparkCreditCreateData = Struct.new(
  :organization_id,
  :amount_cents,
  :billing_unit,
  :kind,
  :plan,
  :quoted_credits_cents,
  :quoted_price_cents,
  :request_key,
  keyword_init: true
)

# Request payload for SparkCredit#update.
#
# @!attribute [rw] organization_id
#   @return [String]
SparkCreditUpdateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for SparkCredit#patch.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] view
#   @return [String, nil]
#
# @!attribute [rw] settings
#   @return [Object, nil]
SparkCreditPatchData = Struct.new(
  :organization_id,
  :view,
  :settings,
  keyword_init: true
)

# SparkCreditAgentUsage entity data model.
#
# @!attribute [rw] agents
#   @return [Array]
#
# @!attribute [rw] all
#   @return [Hash]
#
# @!attribute [rw] days
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] owners
#   @return [Array]
SparkCreditAgentUsage = Struct.new(
  :agents,
  :all,
  :days,
  :id,
  :owners,
  keyword_init: true
)

# Request payload for SparkCreditAgentUsage#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
SparkCreditAgentUsageLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# SparkCreditUsageTotal entity data model.
#
# @!attribute [rw] compute_minutes_used
#   @return [String]
#
# @!attribute [rw] compute_usd
#   @return [String]
#
# @!attribute [rw] inference_usd
#   @return [String]
SparkCreditUsageTotal = Struct.new(
  :compute_minutes_used,
  :compute_usd,
  :inference_usd,
  keyword_init: true
)

# Request payload for SparkCreditUsageTotal#list.
#
# @!attribute [rw] organization_id
#   @return [String]
SparkCreditUsageTotalListMatch = Struct.new(
  :organization_id,
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

# StatusChange entity data model.
#
# @!attribute [rw] change_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] patchsets
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
StatusChange = Struct.new(
  :change_id,
  :id,
  :patchsets,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  keyword_init: true
)

# Request payload for StatusChange#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
StatusChangeLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# StatusCommit entity data model.
#
# @!attribute [rw] checks
#   @return [Array]
#
# @!attribute [rw] commit_sha
#   @return [String]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
#
# @!attribute [rw] total
#   @return [Integer]
StatusCommit = Struct.new(
  :checks,
  :commit_sha,
  :counts,
  :id,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :total,
  keyword_init: true
)

# Request payload for StatusCommit#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
StatusCommitLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# StatusPatchset entity data model.
#
# @!attribute [rw] checks
#   @return [Array]
#
# @!attribute [rw] checks_status
#   @return [Object]
#
# @!attribute [rw] commit_sha
#   @return [Object]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] patchset_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] status_label
#   @return [String]
#
# @!attribute [rw] status_state
#   @return [String]
#
# @!attribute [rw] status_tone
#   @return [String]
#
# @!attribute [rw] total
#   @return [Integer]
StatusPatchset = Struct.new(
  :checks,
  :checks_status,
  :commit_sha,
  :counts,
  :id,
  :patchset_id,
  :status,
  :status_label,
  :status_state,
  :status_tone,
  :total,
  keyword_init: true
)

# Request payload for StatusPatchset#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
StatusPatchsetLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# StripeWebhook entity data model.
class StripeWebhook
end

# Request payload for StripeWebhook#create.
class StripeWebhookCreateData
end

# SubmitTelemetry entity data model.
class SubmitTelemetry
end

# Request payload for SubmitTelemetry#create.
class SubmitTelemetryCreateData
end

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

# SwarmEvent entity data model.
#
# @!attribute [rw] agent_swarm_id
#   @return [String]
#
# @!attribute [rw] attempt_id
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] scheduler_generation
#   @return [Object]
#
# @!attribute [rw] task_id
#   @return [Object]
SwarmEvent = Struct.new(
  :agent_swarm_id,
  :attempt_id,
  :created_at,
  :created_at_label,
  :id,
  :kind,
  :payload,
  :reason,
  :scheduler_generation,
  :task_id,
  keyword_init: true
)

# Request payload for SwarmEvent#list.
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] after
#   @return [Integer, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
SwarmEventListMatch = Struct.new(
  :swarm_id,
  :after,
  :kind,
  :limit,
  keyword_init: true
)

# SwarmLive entity data model.
class SwarmLive
end

# Request payload for SwarmLive#load.
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] after_event_id
#   @return [Integer, nil]
#
# @!attribute [rw] after_seq
#   @return [Integer, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
SwarmLiveLoadMatch = Struct.new(
  :swarm_id,
  :after_event_id,
  :after_seq,
  :cursor,
  :limit,
  keyword_init: true
)

# SwarmNote entity data model.
#
# @!attribute [rw] task_id
#   @return [Object, nil]
#
# @!attribute [rw] text
#   @return [String]
SwarmNote = Struct.new(
  :task_id,
  :text,
  keyword_init: true
)

# Request payload for SwarmNote#create.
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [Object, nil]
#
# @!attribute [rw] text
#   @return [String]
SwarmNoteCreateData = Struct.new(
  :swarm_id,
  :task_id,
  :text,
  keyword_init: true
)

# SwarmTask entity data model.
#
# @!attribute [rw] acceptance_commands
#   @return [Array]
#
# @!attribute [rw] agent_swarm_id
#   @return [String]
#
# @!attribute [rw] assigned_runner_id
#   @return [Object]
#
# @!attribute [rw] blocked_reason
#   @return [Object]
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] commit_count
#   @return [Integer]
#
# @!attribute [rw] commit_sha_result
#   @return [Object]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] current_attempt_id
#   @return [Object]
#
# @!attribute [rw] deadline_at
#   @return [Object]
#
# @!attribute [rw] depends_on_task_ids
#   @return [Array]
#
# @!attribute [rw] depth
#   @return [Integer]
#
# @!attribute [rw] diff_artifact_url
#   @return [Object]
#
# @!attribute [rw] display_id
#   @return [Integer]
#
# @!attribute [rw] environment_profile
#   @return [Object]
#
# @!attribute [rw] error_message
#   @return [Object]
#
# @!attribute [rw] failure_code
#   @return [Object]
#
# @!attribute [rw] finished_at
#   @return [Object]
#
# @!attribute [rw] finished_at_label
#   @return [Object]
#
# @!attribute [rw] harness
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input_revision
#   @return [Object]
#
# @!attribute [rw] iteration
#   @return [Integer]
#
# @!attribute [rw] landing_state
#   @return [String]
#
# @!attribute [rw] model
#   @return [Object]
#
# @!attribute [rw] model_provider
#   @return [Object]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] owned_paths
#   @return [Array]
#
# @!attribute [rw] parent_task_id
#   @return [Object]
#
# @!attribute [rw] position
#   @return [Integer]
#
# @!attribute [rw] prompt
#   @return [String]
#
# @!attribute [rw] queued_at
#   @return [Object]
#
# @!attribute [rw] queued_at_label
#   @return [Object]
#
# @!attribute [rw] reasoning_effort
#   @return [Object]
#
# @!attribute [rw] recent_activity
#   @return [Array]
#
# @!attribute [rw] repo_url
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] retry_number
#   @return [Integer]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] run_id
#   @return [Object]
#
# @!attribute [rw] stack_after_task_id
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
# @!attribute [rw] title
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
SwarmTask = Struct.new(
  :acceptance_commands,
  :agent_swarm_id,
  :assigned_runner_id,
  :blocked_reason,
  :changes,
  :commit_count,
  :commit_sha_result,
  :created_at,
  :created_at_label,
  :current_attempt_id,
  :deadline_at,
  :depends_on_task_ids,
  :depth,
  :diff_artifact_url,
  :display_id,
  :environment_profile,
  :error_message,
  :failure_code,
  :finished_at,
  :finished_at_label,
  :harness,
  :id,
  :input_revision,
  :iteration,
  :landing_state,
  :model,
  :model_provider,
  :number,
  :organization_id,
  :owned_paths,
  :parent_task_id,
  :position,
  :prompt,
  :queued_at,
  :queued_at_label,
  :reasoning_effort,
  :recent_activity,
  :repo_url,
  :result,
  :retry_number,
  :role,
  :run_id,
  :stack_after_task_id,
  :started_at,
  :started_at_label,
  :status,
  :title,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for SwarmTask#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] after_seq
#   @return [Integer, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
SwarmTaskLoadMatch = Struct.new(
  :id,
  :swarm_id,
  :after_seq,
  :limit,
  keyword_init: true
)

# Request payload for SwarmTask#list.
#
# @!attribute [rw] swarm_id
#   @return [String]
SwarmTaskListMatch = Struct.new(
  :swarm_id,
  keyword_init: true
)

# TaskLease entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
TaskLease = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for TaskLease#create.
#
# @!attribute [rw] swarm_id
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
TaskLeaseCreateData = Struct.new(
  :swarm_id,
  :task_id,
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

# ThreadPreviewAccess entity data model.
class ThreadPreviewAccess
end

# Request payload for ThreadPreviewAccess#load.
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] return_to
#   @return [String, nil]
ThreadPreviewAccessLoadMatch = Struct.new(
  :host,
  :return_to,
  keyword_init: true
)

# Request payload for ThreadPreviewAccess#create.
#
# @!attribute [rw] host
#   @return [Object, nil]
#
# @!attribute [rw] token
#   @return [Object, nil]
ThreadPreviewAccessCreateData = Struct.new(
  :host,
  :token,
  keyword_init: true
)

# ToolFeedback entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] details
#   @return [String]
#
# @!attribute [rw] feedback
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
ToolFeedback = Struct.new(
  :category,
  :created_at,
  :details,
  :feedback,
  :id,
  :metadata,
  :organization_id,
  :source,
  :summary,
  :user_id,
  keyword_init: true
)

# Request payload for ToolFeedback#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ToolFeedbackLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for ToolFeedback#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] feedback
#   @return [Hash]
ToolFeedbackCreateData = Struct.new(
  :organization_id,
  :feedback,
  keyword_init: true
)

# Transcript entity data model.
#
# @!attribute [rw] agent
#   @return [String]
#
# @!attribute [rw] author
#   @return [Hash]
#
# @!attribute [rw] checkpoint_pagination
#   @return [Hash]
#
# @!attribute [rw] checkpoints
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_checkpoint_at
#   @return [Object]
#
# @!attribute [rw] selected_checkpoint
#   @return [Object]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] started_at
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [Object]
Transcript = Struct.new(
  :agent,
  :author,
  :checkpoint_pagination,
  :checkpoints,
  :id,
  :last_checkpoint_at,
  :selected_checkpoint,
  :source_url,
  :started_at,
  :status,
  :title,
  keyword_init: true
)

# Request payload for Transcript#load.
#
# @!attribute [rw] around_event
#   @return [Integer, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] event_digest
#   @return [String, nil]
#
# @!attribute [rw] include_tool
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] max_byte
#   @return [Integer, nil]
#
# @!attribute [rw] source_ref
#   @return [String, nil]
TranscriptLoadMatch = Struct.new(
  :around_event,
  :cursor,
  :event_digest,
  :include_tool,
  :limit,
  :max_byte,
  :source_ref,
  keyword_init: true
)

# Request payload for Transcript#list.
#
# @!attribute [rw] change
#   @return [String, nil]
#
# @!attribute [rw] checkpoint_cursor
#   @return [String, nil]
#
# @!attribute [rw] commit
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] patchset
#   @return [Integer, nil]
#
# @!attribute [rw] pr
#   @return [String, nil]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] session
#   @return [String, nil]
TranscriptListMatch = Struct.new(
  :change,
  :checkpoint_cursor,
  :commit,
  :cursor,
  :limit,
  :patchset,
  :pr,
  :repo,
  :session,
  keyword_init: true
)

# Request payload for Transcript#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] adapter
#   @return [Object, nil]
#
# @!attribute [rw] cursor
#   @return [Object, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] limit
#   @return [Object, nil]
#
# @!attribute [rw] max_bytes
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [Object, nil]
#
# @!attribute [rw] query
#   @return [Object, nil]
#
# @!attribute [rw] repo
#   @return [Object, nil]
#
# @!attribute [rw] to
#   @return [Object, nil]
#
# @!attribute [rw] user
#   @return [Object, nil]
TranscriptCreateData = Struct.new(
  :organization_id,
  :status,
  :adapter,
  :cursor,
  :from,
  :limit,
  :max_bytes,
  :mode,
  :query,
  :repo,
  :to,
  :user,
  keyword_init: true
)

# V1Message entity data model.
class V1Message
end

# Request payload for V1Message#create.
#
# @!attribute [rw] organization_id
#   @return [String]
V1MessageCreateData = Struct.new(
  :organization_id,
  keyword_init: true
)

# VcBranch entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] target_commit_id
#   @return [String]
VcBranch = Struct.new(
  :id,
  :name,
  :target_commit_id,
  keyword_init: true
)

# Request payload for VcBranch#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcBranchListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcBranch#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcBranchCreateData = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcBranch#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcBranchRemoveMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# VcBrowser entity data model.
class VcBrowser
end

# Request payload for VcBrowser#load.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String]
#
# @!attribute [rw] recursive
#   @return [Boolean, nil]
VcBrowserLoadMatch = Struct.new(
  :organization_id,
  :repo_id,
  :file,
  :path,
  :ref,
  :recursive,
  keyword_init: true
)

# VcChange entity data model.
#
# @!attribute [rw] activity
#   @return [Array]
#
# @!attribute [rw] canonical_path
#   @return [String]
#
# @!attribute [rw] change
#   @return [Object]
#
# @!attribute [rw] checks
#   @return [Array, nil]
#
# @!attribute [rw] checks_status
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] group
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jj_change_id
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] landing
#   @return [Hash]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] patchset_number
#   @return [Object, nil]
#
# @!attribute [rw] previews
#   @return [Array]
#
# @!attribute [rw] primary_status
#   @return [Object, nil]
#
# @!attribute [rw] public_id
#   @return [String, nil]
#
# @!attribute [rw] related_changes
#   @return [Array]
#
# @!attribute [rw] relation_chain
#   @return [Array]
#
# @!attribute [rw] restack_state
#   @return [String, nil]
#
# @!attribute [rw] review_summary
#   @return [Hash, nil]
#
# @!attribute [rw] stack
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] sync
#   @return [Hash]
#
# @!attribute [rw] target
#   @return [Hash]
#
# @!attribute [rw] target_advanced
#   @return [Boolean]
#
# @!attribute [rw] target_branch
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String, nil]
VcChange = Struct.new(
  :activity,
  :canonical_path,
  :change,
  :checks,
  :checks_status,
  :description,
  :group,
  :id,
  :jj_change_id,
  :labels,
  :landing,
  :number,
  :patchset_number,
  :previews,
  :primary_status,
  :public_id,
  :related_changes,
  :relation_chain,
  :restack_state,
  :review_summary,
  :stack,
  :status,
  :sync,
  :target,
  :target_advanced,
  :target_branch,
  :title,
  :url,
  keyword_init: true
)

# Request payload for VcChange#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcChangeLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcChange#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mine
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
VcChangeListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :group,
  :label,
  :limit,
  :mine,
  :page,
  :status,
  :target,
  keyword_init: true
)

# Request payload for VcChange#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] assets
#   @return [Object, nil]
#
# @!attribute [rw] base
#   @return [Object, nil]
#
# @!attribute [rw] draft
#   @return [Object, nil]
#
# @!attribute [rw] dry_run
#   @return [Object, nil]
#
# @!attribute [rw] expected_base_commit_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_head_commit_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_review_head_commit_id
#   @return [Object, nil]
#
# @!attribute [rw] expected_review_patchset_number
#   @return [Object, nil]
#
# @!attribute [rw] git_publication_id
#   @return [Object, nil]
#
# @!attribute [rw] head
#   @return [Object, nil]
#
# @!attribute [rw] into
#   @return [Object, nil]
#
# @!attribute [rw] message
#   @return [Object, nil]
#
# @!attribute [rw] remove_reviewers
#   @return [Object, nil]
#
# @!attribute [rw] request_id
#   @return [Object, nil]
#
# @!attribute [rw] reviewers
#   @return [Object, nil]
#
# @!attribute [rw] transcript_chat
#   @return [Object, nil]
VcChangeCreateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :description,
  :labels,
  :title,
  :assets,
  :base,
  :draft,
  :dry_run,
  :expected_base_commit_id,
  :expected_head_commit_id,
  :expected_review_head_commit_id,
  :expected_review_patchset_number,
  :git_publication_id,
  :head,
  :into,
  :message,
  :remove_reviewers,
  :request_id,
  :reviewers,
  :transcript_chat,
  keyword_init: true
)

# Request payload for VcChange#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] assets
#   @return [Object, nil]
VcChangeUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :description,
  :assets,
  keyword_init: true
)

# VcChangeGroup entity data model.
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] title
#   @return [Object]
VcChangeGroup = Struct.new(
  :changes,
  :id,
  :name,
  :number,
  :status,
  :title,
  keyword_init: true
)

# Request payload for VcChangeGroup#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcChangeGroupLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcChangeGroup#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcChangeGroupListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcChangeGroup#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] title
#   @return [Object, nil]
VcChangeGroupCreateData = Struct.new(
  :organization_id,
  :repo_id,
  :name,
  :title,
  keyword_init: true
)

# VcFile entity data model.
#
# @!attribute [rw] paths
#   @return [Array]
#
# @!attribute [rw] truncated
#   @return [Boolean]
VcFile = Struct.new(
  :paths,
  :truncated,
  keyword_init: true
)

# Request payload for VcFile#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] prefix
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String]
VcFileListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :prefix,
  :ref,
  keyword_init: true
)

# VcMergeQueue entity data model.
#
# @!attribute [rw] analytics
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] policy
#   @return [Hash]
#
# @!attribute [rw] queue
#   @return [Hash]
#
# @!attribute [rw] target_branches
#   @return [Array, nil]
VcMergeQueue = Struct.new(
  :analytics,
  :id,
  :policy,
  :queue,
  :target_branches,
  keyword_init: true
)

# Request payload for VcMergeQueue#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] change
#   @return [String, nil]
#
# @!attribute [rw] entry_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] window_day
#   @return [Integer, nil]
VcMergeQueueLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :change,
  :entry_id,
  :page,
  :window_day,
  keyword_init: true
)

# Request payload for VcMergeQueue#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] change
#   @return [String, nil]
#
# @!attribute [rw] entry_id
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
#
# @!attribute [rw] window_day
#   @return [Integer, nil]
VcMergeQueueListMatch = Struct.new(
  :organization_id,
  :repo_id,
  :change,
  :entry_id,
  :page,
  :target,
  :window_day,
  keyword_init: true
)

# Request payload for VcMergeQueue#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
VcMergeQueueCreateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :expected_version,
  keyword_init: true
)

# Request payload for VcMergeQueue#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] concurrency
#   @return [Object, nil]
#
# @!attribute [rw] enabled
#   @return [Object, nil]
#
# @!attribute [rw] expected_version
#   @return [Object, nil]
VcMergeQueueUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :concurrency,
  :enabled,
  :expected_version,
  keyword_init: true
)

# VcStack entity data model.
#
# @!attribute [rw] alias_ref_name
#   @return [Object]
#
# @!attribute [rw] changes
#   @return [Array]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] landing
#   @return [Hash]
#
# @!attribute [rw] member_count
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [Object]
#
# @!attribute [rw] ref_name
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tip_change_number
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [String]
VcStack = Struct.new(
  :alias_ref_name,
  :changes,
  :code,
  :id,
  :landing,
  :member_count,
  :name,
  :ref_name,
  :status,
  :tip_change_number,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for VcStack#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcStackLoadMatch = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcStack#list.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
VcStackListMatch = Struct.new(
  :organization_id,
  :repo_id,
  keyword_init: true
)

# Request payload for VcStack#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] repo_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [Object, nil]
VcStackUpdateData = Struct.new(
  :id,
  :organization_id,
  :repo_id,
  :name,
  keyword_init: true
)

# VcsNode entity data model.
#
# @!attribute [rw] account_avatar_url
#   @return [Object]
#
# @!attribute [rw] account_id
#   @return [Object]
#
# @!attribute [rw] account_login
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] created_at_label
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] installation_id
#   @return [String]
#
# @!attribute [rw] installed_at
#   @return [Object]
#
# @!attribute [rw] installed_at_label
#   @return [Object]
#
# @!attribute [rw] manage_access_url
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] permission_entries
#   @return [Array]
#
# @!attribute [rw] permissions
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] suspended_at
#   @return [Object]
#
# @!attribute [rw] suspended_at_label
#   @return [Object]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] updated_at_label
#   @return [Object]
VcsNode = Struct.new(
  :account_avatar_url,
  :account_id,
  :account_login,
  :created_at,
  :created_at_label,
  :id,
  :installation_id,
  :installed_at,
  :installed_at_label,
  :manage_access_url,
  :organization_id,
  :permission_entries,
  :permissions,
  :status,
  :suspended_at,
  :suspended_at_label,
  :updated_at,
  :updated_at_label,
  keyword_init: true
)

# Request payload for VcsNode#list.
#
# @!attribute [rw] organization_id
#   @return [String]
VcsNodeListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# VcsSetting entity data model.
#
# @!attribute [rw] can_manage_pr_scenario_writing
#   @return [Boolean]
#
# @!attribute [rw] can_manage_sandbox_region
#   @return [Boolean]
#
# @!attribute [rw] dedicated_outbound_ip_addresses
#   @return [Array]
#
# @!attribute [rw] default_trunk_bookmark
#   @return [String]
#
# @!attribute [rw] organization
#   @return [Hash]
#
# @!attribute [rw] sandbox_regions
#   @return [Array]
VcsSetting = Struct.new(
  :can_manage_pr_scenario_writing,
  :can_manage_sandbox_region,
  :dedicated_outbound_ip_addresses,
  :default_trunk_bookmark,
  :organization,
  :sandbox_regions,
  keyword_init: true
)

# Request payload for VcsSetting#list.
#
# @!attribute [rw] organization_id
#   @return [String]
VcsSettingListMatch = Struct.new(
  :organization_id,
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

# VerifyEmailVerification entity data model.
class VerifyEmailVerification
end

# Request payload for VerifyEmailVerification#list.
class VerifyEmailVerificationListMatch
end

# VerifySignalIntegration entity data model.
#
# @!attribute [rw] api_token_stored
#   @return [Boolean]
#
# @!attribute [rw] config
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [Object, nil]
#
# @!attribute [rw] failure_message
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inbound_path
#   @return [String]
#
# @!attribute [rw] inbound_url
#   @return [String]
#
# @!attribute [rw] last_received_at
#   @return [Object, nil]
#
# @!attribute [rw] last_verified_at
#   @return [Object, nil]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] rejected_signature_count
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] target_count
#   @return [Integer]
#
# @!attribute [rw] unmapped_delivery_count
#   @return [Integer]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] webhook_secret_stored
#   @return [Boolean]
VerifySignalIntegration = Struct.new(
  :api_token_stored,
  :config,
  :created_at,
  :failure_message,
  :id,
  :inbound_path,
  :inbound_url,
  :last_received_at,
  :last_verified_at,
  :mode,
  :name,
  :organization_id,
  :provider,
  :rejected_signature_count,
  :status,
  :target_count,
  :unmapped_delivery_count,
  :updated_at,
  :webhook_secret_stored,
  keyword_init: true
)

# Request payload for VerifySignalIntegration#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
VerifySignalIntegrationCreateData = Struct.new(
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

# WaitlistApplication entity data model.
class WaitlistApplication
end

# Request payload for WaitlistApplication#create.
#
# @!attribute [rw] company_name
#   @return [Object, nil]
#
# @!attribute [rw] company_size
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [Object, nil]
#
# @!attribute [rw] invite_code
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] use_case
#   @return [Object, nil]
WaitlistApplicationCreateData = Struct.new(
  :company_name,
  :company_size,
  :email,
  :invite_code,
  :name,
  :use_case,
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

# WebhookGitlab entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
WebhookGitlab = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for WebhookGitlab#update.
#
# @!attribute [rw] id
#   @return [String]
WebhookGitlabUpdateData = Struct.new(
  :id,
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

# WorkspaceActivity entity data model.
#
# @!attribute [rw] live_activity
#   @return [Array]
#
# @!attribute [rw] recent_items
#   @return [Array]
#
# @!attribute [rw] unresolved_notification_count
#   @return [Integer]
WorkspaceActivity = Struct.new(
  :live_activity,
  :recent_items,
  :unresolved_notification_count,
  keyword_init: true
)

# Request payload for WorkspaceActivity#load.
#
# @!attribute [rw] organization_id
#   @return [String]
WorkspaceActivityLoadMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# WorkspaceActivityNotification entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
WorkspaceActivityNotification = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for WorkspaceActivityNotification#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
WorkspaceActivityNotificationUpdateData = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# WorkspaceSpace entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] hidden
#   @return [Boolean]
#
# @!attribute [rw] icon_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] import_status
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] position
#   @return [Object]
#
# @!attribute [rw] repository_id
#   @return [String]
#
# @!attribute [rw] repository_slug
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
WorkspaceSpace = Struct.new(
  :created_at,
  :default_branch,
  :description,
  :hidden,
  :icon_name,
  :id,
  :import_status,
  :name,
  :organization_id,
  :position,
  :repository_id,
  :repository_slug,
  :slug,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for WorkspaceSpace#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
WorkspaceSpaceLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for WorkspaceSpace#list.
#
# @!attribute [rw] organization_id
#   @return [String]
WorkspaceSpaceListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for WorkspaceSpace#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] icon_name
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
WorkspaceSpaceCreateData = Struct.new(
  :organization_id,
  :default_branch,
  :description,
  :icon_name,
  :name,
  :slug,
  keyword_init: true
)

# WorkspaceSpacePreference entity data model.
#
# @!attribute [rw] preferences
#   @return [Array]
#
# @!attribute [rw] spaces
#   @return [Array]
WorkspaceSpacePreference = Struct.new(
  :preferences,
  :spaces,
  keyword_init: true
)

# Request payload for WorkspaceSpacePreference#update.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] preferences
#   @return [Array, nil]
WorkspaceSpacePreferenceUpdateData = Struct.new(
  :organization_id,
  :preferences,
  keyword_init: true
)

