<?php
declare(strict_types=1);

// Typed models for the Composal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** A2aWellKnown entity data model. */
class A2aWellKnown
{
}

/** Request payload for A2aWellKnown#load. */
class A2aWellKnownLoadMatch
{
    public string $a2a_id;
}

/** AdminOrg entity data model. */
class AdminOrg
{
    public mixed $billing_email;
    public ?string $billing_reason = null;
    public ?bool $customize_onboarding_packages = null;
    public string $deployment_usage_visibility;
    public bool $deployment_usage_visible;
    public string $id;
    public mixed $monthly_price_dollars = null;
    public mixed $monthly_price_override_cents;
    public string $name;
    public ?bool $onboarding_custom_pricing = null;
    public mixed $onboarding_package_keys = null;
    public string $owner_email;
    public mixed $package_id;
    public ?bool $skip_payment = null;
    public string $slug;
}

/** Request payload for AdminOrg#load. */
class AdminOrgLoadMatch
{
    public string $id;
}

/** Request payload for AdminOrg#list. */
class AdminOrgListMatch
{
    public mixed $billing_email = null;
    public ?string $billing_reason = null;
    public ?bool $customize_onboarding_packages = null;
    public ?string $deployment_usage_visibility = null;
    public ?bool $deployment_usage_visible = null;
    public ?string $id = null;
    public mixed $monthly_price_dollars = null;
    public mixed $monthly_price_override_cents = null;
    public ?string $name = null;
    public ?bool $onboarding_custom_pricing = null;
    public mixed $onboarding_package_keys = null;
    public ?string $owner_email = null;
    public mixed $package_id = null;
    public ?bool $skip_payment = null;
    public ?string $slug = null;
}

/** Request payload for AdminOrg#create. */
class AdminOrgCreateData
{
    public ?string $billing_reason = null;
    public ?bool $customize_onboarding_packages = null;
    public mixed $monthly_price_dollars = null;
    public string $name;
    public ?bool $onboarding_custom_pricing = null;
    public mixed $onboarding_package_keys = null;
    public string $owner_email;
    public mixed $package_id = null;
    public ?bool $skip_payment = null;
    public string $slug;
}

/** Request payload for AdminOrg#update. */
class AdminOrgUpdateData
{
    public string $id;
    public mixed $billing_email = null;
    public mixed $monthly_price_dollars = null;
    public mixed $package_id = null;
    public mixed $reason = null;
}

/** Agent entity data model. */
class Agent
{
    public mixed $attention;
    public mixed $avatar = null;
    public ?bool $can_delete = null;
    public bool $can_edit_configuration;
    public bool $can_manage;
    public ?bool $can_manage_sharing = null;
    public ?bool $can_name_managers = null;
    public ?bool $can_queue_input = null;
    public bool $can_reconcile_save;
    public mixed $configuration;
    public int $configuration_revision;
    public mixed $configuration_version;
    public ?bool $control_connections_available = null;
    public string $controlling_user_id;
    public ?bool $coordination_available = null;
    public string $created_at;
    public ?bool $direct_chat_available = null;
    public bool $has_unread_updates;
    public string $id;
    public mixed $last_reply_at;
    public array $lifecycle_actions;
    public mixed $lifecycle_version;
    public ?bool $local_agent_control_available = null;
    public ?array $managers = null;
    public mixed $model_change_action = null;
    public string $name;
    public string $organization_id;
    public mixed $persona = null;
    public mixed $preview = null;
    public mixed $preview_received_at = null;
    public mixed $provisioning = null;
    public mixed $reply_triage;
    public ?string $runtime_version = null;
    public bool $setup_pending;
    public ?bool $sharing_fixed = null;
    public ?int $sharing_version = null;
    public string $slug;
    public string $status;
    public ?string $team_role = null;
    public string $updated_at;
    public ?string $url_slug = null;
    public ?string $visibility = null;
}

/** Request payload for Agent#load. */
class AgentLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Agent#list. */
class AgentListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $runtime_version = null;
    public ?string $status = null;
}

/** Request payload for Agent#create. */
class AgentCreateData
{
    public string $organization_id;
    public ?string $viewer_time_zone = null;
    public mixed $configuration = null;
    public string $name;
    public ?string $runtime_version = null;
    public ?string $slug = null;
    public ?string $visibility = null;
}

/** Request payload for Agent#update. */
class AgentUpdateData
{
    public string $id;
    public string $organization_id;
    public ?string $name = null;
    public ?string $team_role = null;
    public ?string $visibility = null;
    public mixed $acknowledge_reset = null;
    public mixed $after_id = null;
    public mixed $before_id = null;
    public mixed $conversation_id = null;
    public mixed $expected_generation = null;
    public mixed $expected_version = null;
    public mixed $github_access = null;
    public mixed $integration_id = null;
    public mixed $keep_connections = null;
    public mixed $memory_mb = null;
    public mixed $model = null;
    public mixed $profile = null;
    public mixed $provider = null;
    public mixed $reasoning = null;
    public mixed $revoke_access = null;
    public mixed $setup_only = null;
    public mixed $value = null;
}

/** Request payload for Agent#remove. */
class AgentRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentApp entity data model. */
class AgentApp
{
    public array $author;
    public bool $can_message;
    public int $deployments_count;
    public string $description;
    public int $hidden_install_count;
    public string $id;
    public int $install_count;
    public array $install_targets;
    public array $installed_by;
    public array $installed_target_ids;
    public array $items;
    public mixed $mcp_url;
    public mixed $next_cursor;
    public array $owner;
    public mixed $thread;
    public string $title;
    public string $url;
    public string $visibility;
}

/** Request payload for AgentApp#load. */
class AgentAppLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentApp#list. */
class AgentAppListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
}

/** Request payload for AgentApp#create. */
class AgentAppCreateData
{
    public string $id;
    public string $organization_id;
    public mixed $surface = null;
    public mixed $view = null;
}

/** AgentAppInstall entity data model. */
class AgentAppInstall
{
    public ?string $id = null;
    public bool $installed;
}

/** Request payload for AgentAppInstall#update. */
class AgentAppInstallUpdateData
{
    public string $agent_app_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentAppInstall#remove. */
class AgentAppInstallRemoveMatch
{
    public string $agent_app_id;
    public string $id;
    public string $organization_id;
}

/** AgentAttachment entity data model. */
class AgentAttachment
{
    public int $byte_size;
    public string $content_type;
    public string $file_name;
    public ?string $id = null;
}

/** Request payload for AgentAttachment#create. */
class AgentAttachmentCreateData
{
    public string $agent_id;
    public string $organization_id;
    public int $byte_size;
    public string $content_type;
    public string $file_name;
}

/** AgentAutomation entity data model. */
class AgentAutomation
{
    public bool $can_manage;
    public bool $can_manage_events;
    public bool $can_run;
    public bool $can_schedule;
    public array $definition;
    public array $event_subscriptions;
    public array $event_triggers;
    public int $expected_revision;
    public string $id;
    public string $key;
    public string $name;
    public int $revision;
    public mixed $schedule;
    public array $schedules;
    public array $version;
}

/** Request payload for AgentAutomation#load. */
class AgentAutomationLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentAutomation#list. */
class AgentAutomationListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** Request payload for AgentAutomation#update. */
class AgentAutomationUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?array $definition = null;
    public ?int $expected_revision = null;
}

/** AgentAvatar entity data model. */
class AgentAvatar
{
}

/** Request payload for AgentAvatar#load. */
class AgentAvatarLoadMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?int $style_catalog = null;
}

/** Request payload for AgentAvatar#create. */
class AgentAvatarCreateData
{
    public string $agent_id;
    public string $organization_id;
    public ?int $style_catalog = null;
    public mixed $description = null;
    public mixed $expected_generation = null;
    public mixed $mode = null;
    public mixed $pixel = null;
    public mixed $style = null;
}

/** AgentCommand entity data model. */
class AgentCommand
{
    public string $description;
    public string $display_name;
    public string $name;
    public bool $skill_model_visible;
    public string $source;
}

/** Request payload for AgentCommand#list. */
class AgentCommandListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $conversation_id = null;
}

/** AgentComputer entity data model. */
class AgentComputer
{
}

/** Request payload for AgentComputer#load. */
class AgentComputerLoadMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentComputer#create. */
class AgentComputerCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $prepare = null;
}

/** AgentConnection entity data model. */
class AgentConnection
{
    public array $actions;
    public array $activity;
    public mixed $admin_disabled_at = null;
    public ?bool $agent_tools = null;
    public string $authentication;
    public mixed $authorized_at;
    public ?bool $can_create_account = null;
    public array $capabilities;
    public ?string $catalog_section = null;
    public ?string $category = null;
    public string $certification;
    public mixed $checked_at;
    public array $connection;
    public mixed $consent;
    public string $created_at;
    public ?string $creation_key = null;
    public mixed $custodian_id;
    public ?string $description = null;
    public mixed $disabled_reason = null;
    public mixed $failure_code;
    public int $generation;
    public array $grants;
    public array $grants_pagination;
    public string $id;
    public array $limits;
    public string $name;
    public string $organization_id;
    public ?string $owner_name = null;
    public string $ownership_kind;
    public array $pagination;
    public string $policy_digest;
    public array $provider;
    public mixed $provider_disabled_reason = null;
    public array $provider_identity;
    public mixed $revoked_at;
    public int $schema_version;
    public string $status;
    public string $toolkit;
    public array $triggers;
    public string $updated_at;
    public string $user_id;
    public string $version;
}

/** Request payload for AgentConnection#load. */
class AgentConnectionLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?string $grants_cursor = null;
    public ?int $grants_limit = null;
    public ?int $limit = null;
}

/** Request payload for AgentConnection#list. */
class AgentConnectionListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** Request payload for AgentConnection#create. */
class AgentConnectionCreateData
{
    public string $organization_id;
    public ?string $creation_key = null;
    public string $name;
    public string $toolkit;
}

/** Request payload for AgentConnection#update. */
class AgentConnectionUpdateData
{
    public string $id;
    public string $organization_id;
    public ?string $name = null;
}

/** Request payload for AgentConnection#patch. */
class AgentConnectionPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $name = null;
}

/** Request payload for AgentConnection#remove. */
class AgentConnectionRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentConnectionDelegation entity data model. */
class AgentConnectionDelegation
{
    public string $authorized_by_id;
    public string $automation_connection_grant_id;
    public string $created_at;
    public string $id;
    public string $member_name;
    public mixed $revoked_at;
    public array $roles;
    public bool $usable;
    public string $user_id;
}

/** Request payload for AgentConnectionDelegation#list. */
class AgentConnectionDelegationListMatch
{
    public string $agent_connection_id;
    public string $organization_id;
}

/** AgentConnectionGrant entity data model. */
class AgentConnectionGrant
{
    public array $actions;
    public string $agent_connection_id;
    public string $automation_id;
    public int $connection_generation;
    public string $created_at;
    public string $id;
    public string $organization_id;
    public int $revision;
    public mixed $revoked_at;
    public string $status;
    public bool $usable;
    public string $user_id;
}

/** Request payload for AgentConnectionGrant#list. */
class AgentConnectionGrantListMatch
{
    public string $agent_connection_id;
    public string $organization_id;
}

/** AgentConnectionResource entity data model. */
class AgentConnectionResource
{
    public mixed $cursor = null;
    public mixed $next_cursor;
    public ?string $query = null;
    public array $resources;
}

/** Request payload for AgentConnectionResource#create. */
class AgentConnectionResourceCreateData
{
    public string $agent_connection_id;
    public string $organization_id;
    public mixed $cursor = null;
    public ?string $query = null;
}

/** AgentConnectionSafetyControl entity data model. */
class AgentConnectionSafetyControl
{
    public mixed $admin_disabled_at = null;
    public mixed $authorized_at;
    public mixed $checked_at;
    public string $created_at;
    public mixed $custodian_id;
    public mixed $failure_code;
    public int $generation;
    public string $id;
    public string $name;
    public string $organization_id;
    public ?string $owner_name = null;
    public string $ownership_kind;
    public mixed $provider_disabled_reason = null;
    public array $provider_identity;
    public mixed $revoked_at;
    public string $status;
    public string $toolkit;
    public string $updated_at;
    public string $user_id;
}

/** Request payload for AgentConnectionSafetyControl#list. */
class AgentConnectionSafetyControlListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** AgentConnectionTriggerSubscription entity data model. */
class AgentConnectionTriggerSubscription
{
    public string $agent_connection_id;
    public array $configuration;
    public string $created_at;
    public array $defaults;
    public string $delivery;
    public bool $enabled;
    public mixed $failure_code;
    public mixed $failure_request_id;
    public string $id;
    public string $latency;
    public string $name;
    public string $reconcile_at;
    public bool $reconciliation_uncertain;
    public mixed $remote_enabled;
    public mixed $replacement_id;
    public mixed $retired_at;
    public mixed $retirement_completed_at;
    public array $schema;
    public string $slug;
    public string $status;
    public string $toolkit;
    public string $toolkit_version;
    public string $trigger_slug;
    public string $updated_at;
    public string $version;
    public bool $waiting_for_retirement;
}

/** Request payload for AgentConnectionTriggerSubscription#list. */
class AgentConnectionTriggerSubscriptionListMatch
{
    public string $agent_connection_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** Request payload for AgentConnectionTriggerSubscription#create. */
class AgentConnectionTriggerSubscriptionCreateData
{
    public string $agent_connection_id;
    public string $organization_id;
    public array $configuration;
    public string $trigger_slug;
}

/** Request payload for AgentConnectionTriggerSubscription#update. */
class AgentConnectionTriggerSubscriptionUpdateData
{
    public string $agent_connection_id;
    public string $id;
    public string $organization_id;
    public ?bool $enabled = null;
}

/** Request payload for AgentConnectionTriggerSubscription#patch. */
class AgentConnectionTriggerSubscriptionPatchData
{
    public string $agent_connection_id;
    public string $id;
    public string $organization_id;
    public ?bool $enabled = null;
}

/** Request payload for AgentConnectionTriggerSubscription#remove. */
class AgentConnectionTriggerSubscriptionRemoveMatch
{
    public string $agent_connection_id;
    public string $id;
    public string $organization_id;
}

/** AgentContextCheckpoint entity data model. */
class AgentContextCheckpoint
{
    public ?string $id = null;
}

/** Request payload for AgentContextCheckpoint#load. */
class AgentContextCheckpointLoadMatch
{
    public string $change_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public string $expected_commit_id;
    public ?int $max_byte = null;
}

/** AgentControlFlow entity data model. */
class AgentControlFlow
{
    public bool $can_cancel;
    public bool $cancellation_requested;
    public string $device_name;
    public string $flow_id;
    public ?string $id = null;
    public array $providers;
    public ?string $repair_of_flow_id = null;
    public string $status_label;
    public int $step_count;
    public mixed $title;
}

/** Request payload for AgentControlFlow#load. */
class AgentControlFlowLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentControlFlow#list. */
class AgentControlFlowListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentControlFlow#create. */
class AgentControlFlowCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentCoordination entity data model. */
class AgentCoordination
{
    public ?string $id = null;
}

/** Request payload for AgentCoordination#create. */
class AgentCoordinationCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $include_source = null;
}

/** AgentEmail entity data model. */
class AgentEmail
{
    public mixed $delivery;
    public string $direction;
    public string $from;
    public string $id;
    public ?string $preview = null;
    public string $received_at;
    public mixed $recipient_tag;
    public bool $spam;
    public mixed $subject;
    public string $text;
    public array $to;
}

/** Request payload for AgentEmail#load. */
class AgentEmailLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentEvent entity data model. */
class AgentEvent
{
}

/** Request payload for AgentEvent#list. */
class AgentEventListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $conversation_id = null;
    public ?string $device_activity_provider = null;
}

/** AgentFile entity data model. */
class AgentFile
{
    public string $content_type;
    public string $download_url;
    public string $filename;
    public string $id;
    public int $size_bytes;
}

/** Request payload for AgentFile#load. */
class AgentFileLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentInput entity data model. */
class AgentInput
{
    public ?array $attachment_ids = null;
    public ?array $attachments = null;
    public array $browser_context;
    public array $client_time;
    public string $conversation_id;
    public mixed $model_policy = null;
    public ?string $requester_membership_id = null;
    public ?string $speed = null;
    public string $text;
}

/** Request payload for AgentInput#create. */
class AgentInputCreateData
{
    public string $agent_id;
    public string $organization_id;
    public ?array $attachment_ids = null;
    public ?array $attachments = null;
    public array $browser_context;
    public array $client_time;
    public string $conversation_id;
    public mixed $model_policy = null;
    public ?string $requester_membership_id = null;
    public ?string $speed = null;
    public string $text;
}

/** AgentIntegration entity data model. */
class AgentIntegration
{
    public array $account_counts;
    public ?bool $can_cancel_sign_in = null;
    public bool $can_delete;
    public bool $can_disconnect;
    public bool $can_enable;
    public bool $can_manage;
    public bool $can_manage_sharing;
    public bool $can_reconnect;
    public bool $can_sync;
    public array $catalog;
    public mixed $connected_by;
    public bool $connected_by_you;
    public array $connected_counts;
    public array $connections;
    public ?string $creation_key = null;
    public mixed $creation_key_digest = null;
    public int $generation;
    public string $id;
    public string $name;
    public array $pagination;
    public array $pending_counts;
    public mixed $provider_disabled_reason;
    public array $provider_identity;
    public mixed $provider_name;
    public string $reference;
    public ?string $sharing_status = null;
    public string $status;
    public bool $team_sharing_enabled;
    public int $team_sharing_version;
    public string $toolkit;
}

/** Request payload for AgentIntegration#load. */
class AgentIntegrationLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentIntegration#list. */
class AgentIntegrationListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?bool $enableable = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $toolkit = null;
}

/** Request payload for AgentIntegration#create. */
class AgentIntegrationCreateData
{
    public string $organization_id;
    public ?string $creation_key = null;
    public string $name;
    public string $toolkit;
}

/** Request payload for AgentIntegration#remove. */
class AgentIntegrationRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentIntegrationAccount entity data model. */
class AgentIntegrationAccount
{
    public ?bool $can_cancel_sign_in = null;
    public bool $can_delete;
    public bool $can_disconnect;
    public bool $can_enable;
    public bool $can_manage_sharing;
    public bool $can_reconnect;
    public bool $can_sync;
    public mixed $connected_by;
    public bool $connected_by_you;
    public mixed $creation_key_digest = null;
    public int $generation;
    public string $id;
    public string $name;
    public mixed $provider_disabled_reason;
    public array $provider_identity;
    public string $reference;
    public ?string $sharing_status = null;
    public string $status;
    public bool $team_sharing_enabled;
    public int $team_sharing_version;
    public string $toolkit;
}

/** Request payload for AgentIntegrationAccount#list. */
class AgentIntegrationAccountListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?bool $enableable = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $toolkit = null;
}

/** AgentIntegrationCallback entity data model. */
class AgentIntegrationCallback
{
}

/** Request payload for AgentIntegrationCallback#load. */
class AgentIntegrationCallbackLoadMatch
{
    public ?string $code = null;
    public string $connection_id;
    public string $state;
}

/** AgentInteraction entity data model. */
class AgentInteraction
{
    public ?string $id = null;
    public array $interactions;
}

/** Request payload for AgentInteraction#load. */
class AgentInteractionLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public string $conversation_id;
}

/** Request payload for AgentInteraction#list. */
class AgentInteractionListMatch
{
    public string $agent_id;
    public string $organization_id;
    public string $conversation_id;
    public ?array $ids = null;
}

/** Request payload for AgentInteraction#create. */
class AgentInteractionCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $conversation_id = null;
    public mixed $expected_revision = null;
}

/** AgentLibrary entity data model. */
class AgentLibrary
{
    public ?string $id = null;
}

/** Request payload for AgentLibrary#load. */
class AgentLibraryLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentManager entity data model. */
class AgentManager
{
    public mixed $attention;
    public mixed $avatar = null;
    public ?bool $can_delete = null;
    public bool $can_edit_configuration;
    public bool $can_manage;
    public ?bool $can_manage_sharing = null;
    public ?bool $can_name_managers = null;
    public ?bool $can_queue_input = null;
    public bool $can_reconcile_save;
    public mixed $configuration;
    public int $configuration_revision;
    public mixed $configuration_version;
    public ?bool $control_connections_available = null;
    public string $controlling_user_id;
    public ?bool $coordination_available = null;
    public string $created_at;
    public ?bool $direct_chat_available = null;
    public bool $has_unread_updates;
    public string $id;
    public mixed $last_reply_at;
    public array $lifecycle_actions;
    public mixed $lifecycle_version;
    public ?bool $local_agent_control_available = null;
    public ?array $managers = null;
    public mixed $model_change_action = null;
    public string $name;
    public string $organization_id;
    public mixed $persona = null;
    public mixed $preview = null;
    public mixed $preview_received_at = null;
    public mixed $provisioning = null;
    public mixed $reply_triage;
    public ?string $runtime_version = null;
    public bool $setup_pending;
    public ?bool $sharing_fixed = null;
    public ?int $sharing_version = null;
    public string $slug;
    public string $status;
    public ?string $team_role = null;
    public string $updated_at;
    public ?string $url_slug = null;
    public string $user_id;
    public ?string $visibility = null;
}

/** Request payload for AgentManager#create. */
class AgentManagerCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $user_id;
}

/** Request payload for AgentManager#remove. */
class AgentManagerRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentManagerChoice entity data model. */
class AgentManagerChoice
{
    public string $id;
    public string $name;
}

/** Request payload for AgentManagerChoice#list. */
class AgentManagerChoiceListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $q = null;
}

/** AgentMarketplace entity data model. */
class AgentMarketplace
{
    public array $bundle;
    public bool $can_manage;
    public mixed $catalog_key;
    public array $categories;
    public string $category;
    public array $counts;
    public string $created_at;
    public int $expected_version;
    public mixed $explainer;
    public bool $featured;
    public bool $from_composal;
    public string $id;
    public int $installs_count;
    public string $instructions;
    public array $integration_toolkits;
    public array $integrations;
    public mixed $listing;
    public array $listings;
    public array $memories;
    public string $name;
    public mixed $next_page;
    public string $organization_name;
    public array $page_apps;
    public mixed $publisher_avatar_url;
    public string $publisher_name;
    public array $sections;
    public mixed $share_token;
    public array $skills;
    public string $slug;
    public ?string $source_agent_id = null;
    public string $summary;
    public string $updated_at;
    public int $version;
    public array $viewer;
    public string $visibility;
}

/** Request payload for AgentMarketplace#load. */
class AgentMarketplaceLoadMatch
{
    public string $id;
}

/** Request payload for AgentMarketplace#create. */
class AgentMarketplaceCreateData
{
    public string $organization_id;
    public array $bundle;
    public string $category;
    public mixed $explainer = null;
    public string $name;
    public ?string $source_agent_id = null;
    public string $summary;
    public ?string $visibility = null;
}

/** Request payload for AgentMarketplace#update. */
class AgentMarketplaceUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentMarketplace#patch. */
class AgentMarketplacePatchData
{
    public string $id;
    public string $organization_id;
    public ?array $bundle = null;
    public ?string $category = null;
    public ?int $expected_version = null;
    public mixed $explainer = null;
    public ?string $name = null;
    public ?string $summary = null;
    public ?string $visibility = null;
}

/** Request payload for AgentMarketplace#remove. */
class AgentMarketplaceRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentMarketplaceShared entity data model. */
class AgentMarketplaceShared
{
    public bool $can_manage;
    public mixed $catalog_key;
    public string $category;
    public array $counts;
    public string $created_at;
    public mixed $explainer;
    public bool $featured;
    public bool $from_composal;
    public string $id;
    public int $installs_count;
    public string $instructions;
    public array $integration_toolkits;
    public array $integrations;
    public mixed $listing;
    public array $memories;
    public string $name;
    public string $organization_name;
    public array $page_apps;
    public mixed $publisher_avatar_url;
    public string $publisher_name;
    public mixed $share_token;
    public array $skills;
    public string $slug;
    public string $summary;
    public string $updated_at;
    public int $version;
    public array $viewer;
    public string $visibility;
}

/** Request payload for AgentMarketplaceShared#load. */
class AgentMarketplaceSharedLoadMatch
{
    public string $id;
    public ?string $organization_id = null;
}

/** Request payload for AgentMarketplaceShared#create. */
class AgentMarketplaceSharedCreateData
{
    public string $id;
    public string $organization_id;
}

/** AgentMissionControl entity data model. */
class AgentMissionControl
{
}

/** Request payload for AgentMissionControl#create. */
class AgentMissionControlCreateData
{
    public string $organization_id;
    public mixed $action = null;
    public mixed $agent_id = null;
    public mixed $agent_ids = null;
    public mixed $at = null;
}

/** AgentOperation entity data model. */
class AgentOperation
{
    public array $arguments;
    public ?string $id = null;
    public string $key;
    public string $name;
    public array $operation;
    public string $participant;
    public string $requester_id;
    public string $scope_key;
}

/** Request payload for AgentOperation#load. */
class AgentOperationLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentOperation#create. */
class AgentOperationCreateData
{
    public string $agent_id;
    public string $organization_id;
    public array $arguments;
    public string $key;
    public string $name;
    public string $requester_id;
}

/** AgentProvisioning entity data model. */
class AgentProvisioning
{
}

/** Request payload for AgentProvisioning#create. */
class AgentProvisioningCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $expected_version = null;
}

/** AgentPullRequest entity data model. */
class AgentPullRequest
{
    public string $id;
    public int $number;
    public array $owners;
    public string $repository;
    public string $status;
    public string $title;
    public string $url;
}

/** Request payload for AgentPullRequest#list. */
class AgentPullRequestListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?string $scope = null;
}

/** AgentQuestion entity data model. */
class AgentQuestion
{
    public ?string $id = null;
}

/** Request payload for AgentQuestion#create. */
class AgentQuestionCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $answers = null;
    public mixed $conversation_id = null;
}

/** AgentRelayFileGrant entity data model. */
class AgentRelayFileGrant
{
    public string $access_mode;
    public int $connection_generation;
    public string $connection_id;
    public string $connection_name;
    public string $created_at;
    public int $expected_generation;
    public string $id;
    public string $key;
    public string $provider;
    public string $resource_id;
    public string $resource_kind;
    public bool $revoked;
    public mixed $revoked_at;
    public ?bool $snapshot_supported = null;
    public string $source_operation_id;
}

/** Request payload for AgentRelayFileGrant#load. */
class AgentRelayFileGrantLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentRelayFileGrant#list. */
class AgentRelayFileGrantListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $request_key = null;
    public ?string $source_operation_id = null;
}

/** Request payload for AgentRelayFileGrant#create. */
class AgentRelayFileGrantCreateData
{
    public string $organization_id;
    public string $access_mode;
    public string $connection_id;
    public int $expected_generation;
    public string $key;
    public string $resource_id;
    public string $resource_kind;
    public string $source_operation_id;
}

/** Request payload for AgentRelayFileGrant#remove. */
class AgentRelayFileGrantRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentRelayFileGrantAccount entity data model. */
class AgentRelayFileGrantAccount
{
    public ?array $access_modes = null;
    public int $generation;
    public string $id;
    public string $name;
    public string $provider;
    public string $resource_kind;
}

/** Request payload for AgentRelayFileGrantAccount#list. */
class AgentRelayFileGrantAccountListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public string $source_operation_id;
}

/** AgentRepository entity data model. */
class AgentRepository
{
    public bool $can_manage;
    public array $environments;
    public int $expected_version;
    public ?string $id = null;
    public array $repository_choices;
    public mixed $repository_choices_error = null;
    public bool $repository_choices_truncated;
    public int $version;
    public array $work_repositories;
}

/** Request payload for AgentRepository#list. */
class AgentRepositoryListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $q = null;
}

/** Request payload for AgentRepository#update. */
class AgentRepositoryUpdateData
{
    public string $agent_id;
    public string $organization_id;
    public ?int $expected_version = null;
    public ?array $work_repositories = null;
}

/** AgentResource entity data model. */
class AgentResource
{
    public string $name;
    public string $uri;
}

/** Request payload for AgentResource#list. */
class AgentResourceListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** AgentRoder entity data model. */
class AgentRoder
{
}

/** Request payload for AgentRoder#load. */
class AgentRoderLoadMatch
{
    public string $organization_id;
}

/** Request payload for AgentRoder#create. */
class AgentRoderCreateData
{
    public mixed $checkpoint_handoff = null;
    public mixed $github_repository = null;
    public mixed $organization_id = null;
    public mixed $repository_slug = null;
    public mixed $session_purpose = null;
}

/** AgentRoutine entity data model. */
class AgentRoutine
{
    public bool $can_manage;
    public int $consecutive_errors;
    public array $credit_wait;
    public mixed $description;
    public bool $enabled;
    public string $id;
    public string $kind;
    public mixed $last_error;
    public mixed $last_run_at;
    public mixed $last_status;
    public bool $managed;
    public string $name;
    public mixed $next_run_at;
    public array $routine;
    public array $schedule;
    public string $schedule_label;
    public array $utility_model;
}

/** Request payload for AgentRoutine#list. */
class AgentRoutineListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
}

/** Request payload for AgentRoutine#update. */
class AgentRoutineUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?bool $enabled = null;
    public ?array $utility_model = null;
}

/** AgentRun entity data model. */
class AgentRun
{
    public mixed $error = null;
    public ?string $id = null;
    public string $run_id;
    public string $status;
}

/** Request payload for AgentRun#load. */
class AgentRunLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?string $conversation_id = null;
}

/** AgentRuntime entity data model. */
class AgentRuntime
{
    public ?array $available_profiles = null;
    public bool $can_manage;
    public ?bool $can_reset = null;
    public string $image;
    public mixed $memory_mb;
    public ?string $platform = null;
    public string $profile;
    public ?string $provider = null;
    public string $state;
    public string $version;
    public mixed $volume;
}

/** Request payload for AgentRuntime#create. */
class AgentRuntimeCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $acknowledge_data_loss = null;
    public mixed $expected_version = null;
}

/** AgentSession entity data model. */
class AgentSession
{
    public ?string $id = null;
}

/** Request payload for AgentSession#load. */
class AgentSessionLoadMatch
{
    public string $id;
    public ?int $around_event = null;
    public ?string $checkpoint = null;
    public ?string $cursor = null;
    public ?string $event_digest = null;
    public ?bool $include_tool = null;
    public ?int $limit = null;
    public ?int $max_byte = null;
    public ?string $source_ref = null;
}

/** AgentSessionCheckpoint entity data model. */
class AgentSessionCheckpoint
{
    public ?string $id = null;
}

/** Request payload for AgentSessionCheckpoint#load. */
class AgentSessionCheckpointLoadMatch
{
    public string $agent_session_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for AgentSessionCheckpoint#list. */
class AgentSessionCheckpointListMatch
{
    public string $agent_session_id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for AgentSessionCheckpoint#create. */
class AgentSessionCheckpointCreateData
{
    public string $agent_session_id;
    public string $organization_id;
    public string $repo_id;
}

/** AgentSessionRoderHandoff entity data model. */
class AgentSessionRoderHandoff
{
    public ?string $checkpoint_id = null;
    public ?string $purpose = null;
}

/** Request payload for AgentSessionRoderHandoff#create. */
class AgentSessionRoderHandoffCreateData
{
    public string $agent_session_id;
    public string $organization_id;
    public string $repo_id;
    public ?string $checkpoint_id = null;
    public ?string $purpose = null;
}

/** AgentSetting entity data model. */
class AgentSetting
{
    public bool $can_manage;
    public string $expected_version;
    public string $instructions;
    public string $version;
}

/** Request payload for AgentSetting#list. */
class AgentSettingListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentSetting#update. */
class AgentSettingUpdateData
{
    public string $agent_id;
    public string $organization_id;
    public ?string $expected_version = null;
    public ?string $instructions = null;
}

/** AgentSharing entity data model. */
class AgentSharing
{
}

/** Request payload for AgentSharing#load. */
class AgentSharingLoadMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** AgentSite entity data model. */
class AgentSite
{
    public array $author;
    public bool $can_message;
    public int $deployments_count;
    public mixed $description;
    public mixed $icon_url;
    public string $id;
    public string $name;
    public array $owner;
    public mixed $thread;
    public string $title;
    public string $url;
    public string $visibility;
}

/** Request payload for AgentSite#load. */
class AgentSiteLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentSite#list. */
class AgentSiteListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
}

/** Request payload for AgentSite#create. */
class AgentSiteCreateData
{
    public string $id;
    public string $organization_id;
    public mixed $surface = null;
    public mixed $view = null;
}

/** AgentSkill entity data model. */
class AgentSkill
{
    public array $agents;
    public array $audience;
    public bool $can_manage_library;
    public string $content;
    public array $files;
    public ?string $id = null;
    public ?string $marketplace = null;
    public bool $pending;
    public ?string $plugin = null;
    public string $revision;
    public array $skill;
    public array $skills;
    public ?string $source = null;
}

/** Request payload for AgentSkill#load. */
class AgentSkillLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentSkill#list. */
class AgentSkillListMatch
{
    public string $organization_id;
}

/** Request payload for AgentSkill#create. */
class AgentSkillCreateData
{
    public string $organization_id;
    public array $audience;
    public ?string $marketplace = null;
    public ?string $plugin = null;
    public string $revision;
    public array $skills;
    public ?string $source = null;
}

/** Request payload for AgentSkill#update. */
class AgentSkillUpdateData
{
    public string $id;
    public string $organization_id;
    public mixed $agent_ids = null;
    public mixed $mode = null;
    public mixed $new_agents = null;
}

/** Request payload for AgentSkill#remove. */
class AgentSkillRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** AgentSlack entity data model. */
class AgentSlack
{
}

/** Request payload for AgentSlack#create. */
class AgentSlackCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $action = null;
    public mixed $bot_token = null;
    public mixed $callback = null;
    public mixed $confirm_before_sending = null;
    public mixed $expected_version = null;
    public mixed $mode = null;
    public mixed $show_sent_using = null;
    public mixed $signing_secret = null;
}

/** AgentSubagent entity data model. */
class AgentSubagent
{
    public bool $active;
    public mixed $attention;
    public mixed $ended_at;
    public string $id;
    public mixed $model;
    public string $parent_id;
    public mixed $preview;
    public mixed $started_at;
    public mixed $state;
    public string $status;
    public string $title;
    public mixed $updated_at;
}

/** Request payload for AgentSubagent#list. */
class AgentSubagentListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $conversation_id = null;
    public ?string $cursor = null;
}

/** AgentSubscription entity data model. */
class AgentSubscription
{
}

/** Request payload for AgentSubscription#list. */
class AgentSubscriptionListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $refresh_provider = null;
}

/** Request payload for AgentSubscription#create. */
class AgentSubscriptionCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $action_name = null;
    public mixed $label = null;
    public mixed $login_id = null;
    public mixed $method = null;
    public mixed $model = null;
    public mixed $profile_id = null;
    public mixed $provider = null;
    public mixed $reasoning = null;
    public mixed $step_id = null;
    public mixed $token = null;
    public mixed $value = null;
    public mixed $version = null;
}

/** AgentSwarm entity data model. */
class AgentSwarm
{
    public mixed $base_bookmark;
    public mixed $base_ref;
    public mixed $base_revision;
    public array $budget;
    public mixed $canceled_at;
    public int $canceled_count;
    public mixed $concurrency_key;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $creator_user_id;
    public mixed $deadline_at;
    public int $display_id;
    public int $done_count;
    public array $environment;
    public int $failed_count;
    public mixed $finished_at;
    public mixed $finished_at_label;
    public array $github;
    public mixed $goal;
    public string $id;
    public mixed $model;
    public mixed $model_provider;
    public int $number;
    public string $organization_id;
    public mixed $organization_slug;
    public mixed $outcome;
    public mixed $phase;
    public array $policy;
    public mixed $queued_at;
    public mixed $queued_at_label;
    public ?string $repository = null;
    public mixed $repository_id;
    public mixed $repository_slug;
    public array $reserved;
    public int $scheduler_generation;
    public int $skipped_count;
    public string $slug;
    public mixed $started_at;
    public mixed $started_at_label;
    public string $status;
    public array $summary;
    public array $target;
    public int $task_count;
    public mixed $task_template_json;
    public array $tasks;
    public string $updated_at;
    public mixed $updated_at_label;
    public array $usage;
}

/** Request payload for AgentSwarm#load. */
class AgentSwarmLoadMatch
{
    public string $id;
}

/** Request payload for AgentSwarm#list. */
class AgentSwarmListMatch
{
    public string $org;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for AgentSwarm#create. */
class AgentSwarmCreateData
{
    public mixed $base_bookmark = null;
    public mixed $base_ref = null;
    public mixed $base_revision = null;
    public ?array $budget = null;
    public mixed $concurrency_key = null;
    public ?array $environment = null;
    public mixed $goal = null;
    public mixed $model = null;
    public mixed $model_provider = null;
    public mixed $organization_slug;
    public ?array $policy = null;
    public mixed $queued_at = null;
    public ?string $repository = null;
    public ?string $slug = null;
    public array $target;
    public mixed $task_template_json = null;
    public ?array $tasks = null;
}

/** Request payload for AgentSwarm#update. */
class AgentSwarmUpdateData
{
    public string $id;
    public ?array $policy = null;
}

/** AgentTeammate entity data model. */
class AgentTeammate
{
    public mixed $avatar;
    public string $id;
    public string $name;
    public mixed $persona = null;
    public string $slug;
}

/** Request payload for AgentTeammate#list. */
class AgentTeammateListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $q = null;
}

/** AgentTerminal entity data model. */
class AgentTerminal
{
}

/** Request payload for AgentTerminal#create. */
class AgentTerminalCreateData
{
    public string $agent_id;
    public string $organization_id;
}

/** AgentThread entity data model. */
class AgentThread
{
    public ?string $id = null;
}

/** Request payload for AgentThread#load. */
class AgentThreadLoadMatch
{
    public string $id;
}

/** Request payload for AgentThread#list. */
class AgentThreadListMatch
{
    public ?string $id = null;
}

/** Request payload for AgentThread#create. */
class AgentThreadCreateData
{
}

/** AgentTool entity data model. */
class AgentTool
{
    public ?string $description = null;
    public array $inputSchema;
    public string $name;
}

/** Request payload for AgentTool#list. */
class AgentToolListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** AgentUsage entity data model. */
class AgentUsage
{
    public array $days;
    public string $ended_at;
    public string $pricing_version;
    public string $source;
    public string $started_at;
    public array $user_days;
    public array $users;
    public string $window;
}

/** Request payload for AgentUsage#load. */
class AgentUsageLoadMatch
{
    public string $organization_id;
    public ?string $window = null;
}

/** AgentVerifyProject entity data model. */
class AgentVerifyProject
{
    public bool $available;
    public bool $can_manage;
    public int $expected_version;
    public array $project_choices;
    public bool $project_choices_truncated;
    public array $verify_projects;
    public int $version;
}

/** Request payload for AgentVerifyProject#list. */
class AgentVerifyProjectListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentVerifyProject#update. */
class AgentVerifyProjectUpdateData
{
    public string $agent_id;
    public string $organization_id;
    public ?int $expected_version = null;
    public ?array $verify_projects = null;
}

/** AgentWait entity data model. */
class AgentWait
{
    public ?string $id = null;
}

/** Request payload for AgentWait#create. */
class AgentWaitCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentWebPreview entity data model. */
class AgentWebPreview
{
    public mixed $description;
    public mixed $icon_url;
    public mixed $image_url;
    public mixed $title;
}

/** Request payload for AgentWebPreview#list. */
class AgentWebPreviewListMatch
{
    public ?string $asset = null;
    public string $token;
}

/** AgentWebhook entity data model. */
class AgentWebhook
{
    public string $action;
    public array $connection;
    public array $deliveries;
    public array $event_types;
    public int $expected_generation;
    public ?string $id = null;
    public int $max_events_per_day;
    public string $name;
    public string $purpose;
    public mixed $signing_key;
}

/** Request payload for AgentWebhook#load. */
class AgentWebhookLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentWebhook#create. */
class AgentWebhookCreateData
{
    public string $agent_id;
    public string $organization_id;
    public array $event_types;
    public int $max_events_per_day;
    public string $name;
    public string $purpose;
}

/** Request payload for AgentWebhook#update. */
class AgentWebhookUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?string $action = null;
    public ?int $expected_generation = null;
}

/** AgentWork entity data model. */
class AgentWork
{
    public ?string $id = null;
}

/** Request payload for AgentWork#create. */
class AgentWorkCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $revision = null;
}

/** AgentWorkflow entity data model. */
class AgentWorkflow
{
    public bool $can_manage;
    public string $expected_digest;
    public string $path;
    public string $source;
    public string $template;
    public array $templates;
    public bool $truncated;
    public array $workflows;
}

/** Request payload for AgentWorkflow#list. */
class AgentWorkflowListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $view = null;
    public ?string $workflow_path = null;
}

/** Request payload for AgentWorkflow#create. */
class AgentWorkflowCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $path;
    public string $template;
}

/** Request payload for AgentWorkflow#update. */
class AgentWorkflowUpdateData
{
    public string $agent_id;
    public string $organization_id;
    public ?string $expected_digest = null;
    public ?string $path = null;
    public ?string $source = null;
}

/** AgentWorkflowProposal entity data model. */
class AgentWorkflowProposal
{
    public array $agent_steps;
    public mixed $base_digest;
    public bool $can_manage;
    public bool $can_revise;
    public bool $can_save;
    public bool $can_set_trigger;
    public string $created_at;
    public mixed $definition;
    public string $digest;
    public mixed $error;
    public string $id;
    public ?array $model_choices = null;
    public string $name;
    public ?array $native_rows = null;
    public string $path;
    public array $pipeline_checkpoints;
    public array $pipeline_commands;
    public ?array $reasoning_choices = null;
    public mixed $runs_on_earlier_version;
    public mixed $saved;
    public bool $stale;
    public mixed $starts;
    public mixed $trigger_error;
}

/** Request payload for AgentWorkflowProposal#load. */
class AgentWorkflowProposalLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentWorkflowProposal#create. */
class AgentWorkflowProposalCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public string $digest;
    public mixed $model = null;
    public mixed $reasoning = null;
}

/** AgentWorkflowRun entity data model. */
class AgentWorkflowRun
{
    public string $action;
    public mixed $automation;
    public mixed $budget_seconds;
    public mixed $budget_usd;
    public bool $can_answer;
    public bool $can_approve;
    public bool $can_dismiss;
    public mixed $checkpoint;
    public mixed $conversation_id;
    public array $decision_history;
    public mixed $error;
    public mixed $finished_at;
    public mixed $flow_steps;
    public string $id;
    public bool $needs_you;
    public mixed $note;
    public mixed $nothing_to_do_reason;
    public int $resume_count;
    public mixed $retry_step_id;
    public int $running_seconds;
    public string $source;
    public int $spent_tokens;
    public float $spent_usd;
    public bool $stalled;
    public string $started_at;
    public mixed $started_by;
    public string $status;
    public int $step_count;
    public array $steps;
    public mixed $trigger_id;
    public mixed $wake_at;
    public mixed $workflow_digest;
    public mixed $workflow_path;
}

/** Request payload for AgentWorkflowRun#load. */
class AgentWorkflowRunLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?string $decision_cursor = null;
}

/** Request payload for AgentWorkflowRun#list. */
class AgentWorkflowRunListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $automation_key = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $view = null;
    public ?string $workflow_path = null;
}

/** Request payload for AgentWorkflowRun#create. */
class AgentWorkflowRunCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $checkpoint;
    public int $resume_count;
    public mixed $answer = null;
    public mixed $approved = null;
    public mixed $question_at = null;
}

/** AgentWorkflowTrigger entity data model. */
class AgentWorkflowTrigger
{
    public mixed $budget;
    public bool $can_manage;
    public bool $can_pause;
    public bool $can_resume;
    public bool $can_review;
    public mixed $daily_limit;
    public mixed $day_resets_at;
    public string $id;
    public string $kind;
    public mixed $next_due_at;
    public mixed $pause_cause;
    public bool $paused;
    public mixed $read_at;
    public mixed $run_budget_usd;
    public mixed $schedule;
    public mixed $settings_changed_at;
    public int $skipped_today;
    public mixed $stale_at;
    public mixed $stale_reason;
    public mixed $starts;
    public mixed $subscription_id;
    public string $time_zone;
    public mixed $today_count;
    public array $trigger;
    public string $workflow_path;
}

/** Request payload for AgentWorkflowTrigger#load. */
class AgentWorkflowTriggerLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentWorkflowTrigger#list. */
class AgentWorkflowTriggerListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentWorkflowTrigger#update. */
class AgentWorkflowTriggerUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $daily_limit = null;
    public mixed $read_at = null;
    public mixed $run_budget_usd = null;
}

/** Request payload for AgentWorkflowTrigger#remove. */
class AgentWorkflowTriggerRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** AgentWorkspace entity data model. */
class AgentWorkspace
{
    public string $action;
    public bool $can_delete;
    public bool $can_keep;
    public mixed $cleanup_after;
    public string $created_at;
    public string $id;
    public string $name;
    public string $reason;
    public string $state;
}

/** Request payload for AgentWorkspace#list. */
class AgentWorkspaceListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
}

/** Request payload for AgentWorkspace#update. */
class AgentWorkspaceUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?string $action = null;
}

/** AgentWritePermission entity data model. */
class AgentWritePermission
{
    public string $account;
    public string $granted_at;
    public mixed $granted_by;
    public string $id;
    public bool $in_effect;
    public mixed $last_used_at;
    public string $tool;
}

/** Request payload for AgentWritePermission#list. */
class AgentWritePermissionListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentWritePermission#remove. */
class AgentWritePermissionRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Agreement entity data model. */
class Agreement
{
    public mixed $body;
    public string $effective_on_label;
    public string $key;
    public string $summary;
    public string $title;
    public string $version;
}

/** Request payload for Agreement#list. */
class AgreementListMatch
{
    public string $organization_id;
}

/** AgreementAccessRequest entity data model. */
class AgreementAccessRequest
{
}

/** Request payload for AgreementAccessRequest#create. */
class AgreementAccessRequestCreateData
{
    public string $organization_id;
}

/** AlertRuleEvent entity data model. */
class AlertRuleEvent
{
    public ?string $id = null;
}

/** Request payload for AlertRuleEvent#load. */
class AlertRuleEventLoadMatch
{
    public string $alert_rule_id;
    public string $id;
    public string $space_id;
}

/** Request payload for AlertRuleEvent#list. */
class AlertRuleEventListMatch
{
    public string $alert_rule_id;
    public string $space_id;
}

/** Request payload for AlertRuleEvent#create. */
class AlertRuleEventCreateData
{
    public string $alert_rule_id;
    public string $space_id;
}

/** Request payload for AlertRuleEvent#remove. */
class AlertRuleEventRemoveMatch
{
    public string $alert_rule_id;
    public string $id;
    public string $space_id;
}

/** AllocationLog entity data model. */
class AllocationLog
{
    public string $allocation_id;
    public ?string $environment = null;
    public string $fetched_at;
    public mixed $location = null;
    public string $logs;
    public string $namespace;
    public int $offset;
    public string $origin;
    public ?string $service = null;
    public string $task;
    public string $type;
}

/** Request payload for AllocationLog#list. */
class AllocationLogListMatch
{
    public string $allocation_id;
    public string $app_id;
    public ?int $offset = null;
    public ?string $origin = null;
    public ?string $task = null;
    public ?string $type = null;
}

/** App entity data model. */
class App
{
    public string $created_at;
    public mixed $created_at_label;
    public mixed $description;
    public mixed $framework;
    public string $id;
    public string $name;
    public string $organization_id;
    public string $repository_id;
    public mixed $repository_kind;
    public string $root_path;
    public string $root_path_display;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for App#load. */
class AppLoadMatch
{
    public string $id;
}

/** Request payload for App#list. */
class AppListMatch
{
    public ?string $organization_id = null;
}

/** Request payload for App#create. */
class AppCreateData
{
    public mixed $description = null;
    public mixed $framework = null;
    public string $name;
    public string $organization_id;
    public string $repository_id;
    public string $root_path;
    public string $slug;
    public ?string $status = null;
}

/** Request payload for App#update. */
class AppUpdateData
{
    public string $id;
    public mixed $description = null;
    public mixed $framework = null;
    public ?string $name = null;
    public ?string $organization_id = null;
    public ?string $repository_id = null;
    public ?string $root_path = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for App#patch. */
class AppPatchData
{
    public string $id;
    public mixed $description = null;
    public mixed $framework = null;
    public ?string $name = null;
    public ?string $organization_id = null;
    public ?string $repository_id = null;
    public ?string $root_path = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for App#remove. */
class AppRemoveMatch
{
    public string $id;
}

/** AppAccess entity data model. */
class AppAccess
{
}

/** Request payload for AppAccess#load. */
class AppAccessLoadMatch
{
}

/** AppAccessJwk entity data model. */
class AppAccessJwk
{
}

/** Request payload for AppAccessJwk#list. */
class AppAccessJwkListMatch
{
}

/** AppCdn entity data model. */
class AppCdn
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public mixed $cache_path_prefix = null;
    public mixed $cache_settings_json;
    public string $created_at;
    public mixed $created_at_label;
    public string $distribution_kind;
    public mixed $edge_hostname;
    public mixed $failure_message;
    public string $hosted_app_id;
    public array $hostnames;
    public string $id;
    public mixed $last_deployed_at;
    public mixed $last_deployed_at_label;
    public mixed $last_purged_at;
    public mixed $last_purged_at_label;
    public mixed $last_synced_at;
    public mixed $last_synced_at_label;
    public string $name;
    public string $origin_url;
    public bool $provisioned;
    public mixed $routing_settings_json;
    public mixed $security_settings_json;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for AppCdn#load. */
class AppCdnLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppCdn#list. */
class AppCdnListMatch
{
    public string $app_id;
}

/** Request payload for AppCdn#create. */
class AppCdnCreateData
{
    public string $app_id;
    public mixed $app_environment_id = null;
    public mixed $app_service_id = null;
    public mixed $cache_path_prefix = null;
    public mixed $cache_settings_json = null;
    public ?string $distribution_kind = null;
    public string $name;
    public string $origin_url;
    public mixed $routing_settings_json = null;
    public mixed $security_settings_json = null;
    public string $slug;
    public ?string $status = null;
}

/** Request payload for AppCdn#update. */
class AppCdnUpdateData
{
    public string $app_id;
    public string $id;
    public mixed $app_environment_id = null;
    public mixed $app_service_id = null;
    public mixed $cache_path_prefix = null;
    public mixed $cache_settings_json = null;
    public ?string $distribution_kind = null;
    public ?string $name = null;
    public ?string $origin_url = null;
    public mixed $routing_settings_json = null;
    public mixed $security_settings_json = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for AppCdn#patch. */
class AppCdnPatchData
{
    public string $app_id;
    public string $id;
    public mixed $app_environment_id = null;
    public mixed $app_service_id = null;
    public mixed $cache_path_prefix = null;
    public mixed $cache_settings_json = null;
    public ?string $distribution_kind = null;
    public ?string $name = null;
    public ?string $origin_url = null;
    public mixed $routing_settings_json = null;
    public mixed $security_settings_json = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for AppCdn#remove. */
class AppCdnRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppConfigVariable entity data model. */
class AppConfigVariable
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public string $created_at;
    public mixed $description;
    public bool $exposed_to_build;
    public bool $has_value;
    public string $hosted_app_id;
    public string $id;
    public string $key;
    public string $scope_kind;
    public string $updated_at;
    public mixed $value;
    public string $value_kind;
}

/** Request payload for AppConfigVariable#load. */
class AppConfigVariableLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppConfigVariable#list. */
class AppConfigVariableListMatch
{
    public string $app_id;
    public ?string $app_environment_id = null;
}

/** Request payload for AppConfigVariable#create. */
class AppConfigVariableCreateData
{
    public string $app_id;
    public mixed $app_environment_id = null;
    public mixed $app_service_id = null;
    public mixed $description = null;
    public bool $exposed_to_build;
    public string $key;
    public string $scope_kind;
    public mixed $value = null;
    public string $value_kind;
}

/** Request payload for AppConfigVariable#update. */
class AppConfigVariableUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppConfigVariable#patch. */
class AppConfigVariablePatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppConfigVariable#remove. */
class AppConfigVariableRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppDataResource entity data model. */
class AppDataResource
{
    public mixed $app_environment_id;
    public string $created_at;
    public string $engine;
    public mixed $failure_message;
    public bool $high_availability;
    public string $hosted_app_id;
    public string $id;
    public string $kind;
    public string $name;
    public mixed $plan;
    public array $provider_metadata;
    public mixed $region;
    public string $slug;
    public string $status;
    public mixed $storage_gb;
    public mixed $storage_label;
    public string $updated_at;
    public mixed $version;
}

/** Request payload for AppDataResource#load. */
class AppDataResourceLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDataResource#list. */
class AppDataResourceListMatch
{
    public string $app_id;
}

/** Request payload for AppDataResource#create. */
class AppDataResourceCreateData
{
    public string $app_id;
    public mixed $app_environment_id = null;
    public string $engine;
    public ?bool $high_availability = null;
    public string $kind;
    public string $name;
    public mixed $plan = null;
    public mixed $region = null;
    public string $slug;
    public mixed $storage_gb = null;
    public mixed $version = null;
}

/** Request payload for AppDataResource#update. */
class AppDataResourceUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDataResource#patch. */
class AppDataResourcePatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDataResource#remove. */
class AppDataResourceRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppDeploy entity data model. */
class AppDeploy
{
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $channel = null;
    public ?string $command = null;
    public ?string $commit_sha = null;
    public ?int $desired_instances = null;
    public ?string $environment = null;
    public string $image;
    public ?string $region = null;
    public ?string $rollout_predecessor = null;
    public ?string $service = null;
    public ?string $source_ref = null;
}

/** Request payload for AppDeploy#create. */
class AppDeployCreateData
{
    public string $app_id;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $channel = null;
    public ?string $command = null;
    public ?string $commit_sha = null;
    public ?int $desired_instances = null;
    public ?string $environment = null;
    public string $image;
    public ?string $region = null;
    public ?string $rollout_predecessor = null;
    public ?string $service = null;
    public ?string $source_ref = null;
}

/** AppDeployment entity data model. */
class AppDeployment
{
    public string $app_environment_id;
    public string $app_service_id;
    public ?string $app_service_placement_id = null;
    public mixed $artifact_locator;
    public mixed $build_role;
    public mixed $commit_sha;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $creator_user_id;
    public mixed $deployed_url;
    public int $display_id;
    public mixed $failure_message;
    public mixed $finished_at;
    public mixed $finished_at_label;
    public string $hosted_app_id;
    public string $id;
    public mixed $idempotency_key;
    public bool $is_rollback;
    public mixed $location;
    public string $location_id;
    public int $number;
    public mixed $operation_key;
    public string $organization_id;
    public mixed $rollback_reason;
    public mixed $rollback_source_deployment_id;
    public mixed $rollback_source_release_id;
    public mixed $rollback_target_release_id;
    public mixed $source_ref;
    public mixed $started_at;
    public mixed $started_at_label;
    public string $status;
    public string $trigger_kind;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for AppDeployment#load. */
class AppDeploymentLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDeployment#list. */
class AppDeploymentListMatch
{
    public string $app_id;
}

/** Request payload for AppDeployment#create. */
class AppDeploymentCreateData
{
    public string $app_id;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $app_service_placement_id = null;
    public mixed $artifact_locator = null;
    public mixed $commit_sha = null;
    public mixed $deployed_url = null;
    public mixed $failure_message = null;
    public mixed $finished_at = null;
    public ?string $location_id = null;
    public mixed $source_ref = null;
    public mixed $started_at = null;
    public ?string $status = null;
    public ?string $trigger_kind = null;
}

/** Request payload for AppDeployment#update. */
class AppDeploymentUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDeployment#patch. */
class AppDeploymentPatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDeployment#remove. */
class AppDeploymentRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppDeploymentOperation entity data model. */
class AppDeploymentOperation
{
    public array $app;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $app_service_placement_id = null;
    public mixed $artifact_locator;
    public mixed $build_duration_seconds;
    public mixed $build_source;
    public string $build_status;
    public array $children;
    public mixed $ci_pipeline_id;
    public mixed $ci_pipeline_run_id;
    public mixed $commit_sha;
    public string $created_at;
    public mixed $creator;
    public mixed $deployed_url;
    public mixed $duration_seconds;
    public array $environment;
    public ?string $failure_message = null;
    public ?string $finished_at = null;
    public string $history_kind;
    public mixed $history_reason;
    public string $id;
    public bool $is_live;
    public bool $is_rollback;
    public int $live_region_count;
    public ?string $location_id = null;
    public int $number;
    public mixed $placement;
    public int $region_count;
    public int $replicas_per_region;
    public mixed $rollback_reason;
    public mixed $rollback_source_release_id;
    public mixed $rollback_target_release_id;
    public mixed $rollout_predecessor_id;
    public string $rollout_status;
    public string $rollout_strategy;
    public array $service;
    public mixed $source_ref;
    public ?string $started_at = null;
    public string $status;
    public int $total_replicas;
    public string $trigger_kind;
    public string $updated_at;
}

/** Request payload for AppDeploymentOperation#load. */
class AppDeploymentOperationLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppDeploymentOperation#list. */
class AppDeploymentOperationListMatch
{
    public string $app_id;
    public ?int $limit = null;
    public ?int $page = null;
}

/** Request payload for AppDeploymentOperation#create. */
class AppDeploymentOperationCreateData
{
    public string $app_id;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $app_service_placement_id = null;
    public mixed $artifact_locator = null;
    public mixed $commit_sha = null;
    public mixed $deployed_url = null;
    public ?string $failure_message = null;
    public ?string $finished_at = null;
    public ?string $location_id = null;
    public mixed $source_ref = null;
    public ?string $started_at = null;
    public ?string $status = null;
    public ?string $trigger_kind = null;
}

/** AppDeploymentRollback entity data model. */
class AppDeploymentRollback
{
    public ?string $app_environment_id = null;
    public string $app_id;
    public ?string $app_service_id = null;
    public array $blockers;
    public array $candidate_releases;
    public string $confirmation_text;
    public mixed $current_deployment;
    public mixed $current_release;
    public mixed $deployment;
    public mixed $desired_state;
    public mixed $environment;
    public bool $execution_allowed;
    public bool $force;
    public ?string $idempotency_key = null;
    public bool $idempotent_reuse;
    public mixed $location;
    public mixed $operation;
    public mixed $reason;
    public mixed $rollback_release;
    public mixed $rollout;
    public mixed $service;
    public mixed $target_artifact_locator;
    public mixed $target_release;
    public ?string $to = null;
    public array $warnings;
}

/** Request payload for AppDeploymentRollback#create. */
class AppDeploymentRollbackCreateData
{
    public string $app_id;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public mixed $deployment = null;
    public mixed $environment = null;
    public ?bool $force = null;
    public ?string $idempotency_key = null;
    public mixed $reason = null;
    public mixed $service = null;
    public ?string $to = null;
}

/** AppEnvironment entity data model. */
class AppEnvironment
{
    public bool $auto_deploy;
    public mixed $base_domain;
    public mixed $branch_pattern;
    public string $created_at;
    public mixed $created_at_label;
    public string $hosted_app_id;
    public string $id;
    public string $kind;
    public mixed $location;
    public string $location_id;
    public string $name;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for AppEnvironment#load. */
class AppEnvironmentLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppEnvironment#list. */
class AppEnvironmentListMatch
{
    public string $app_id;
}

/** Request payload for AppEnvironment#create. */
class AppEnvironmentCreateData
{
    public string $app_id;
    public bool $auto_deploy;
    public mixed $base_domain = null;
    public mixed $branch_pattern = null;
    public string $kind;
    public string $location_id;
    public string $name;
    public string $slug;
    public string $status;
}

/** Request payload for AppEnvironment#update. */
class AppEnvironmentUpdateData
{
    public string $app_id;
    public string $id;
    public ?bool $auto_deploy = null;
    public mixed $base_domain = null;
    public mixed $branch_pattern = null;
    public ?string $kind = null;
    public ?string $location_id = null;
    public ?string $name = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for AppEnvironment#patch. */
class AppEnvironmentPatchData
{
    public string $app_id;
    public string $id;
    public ?bool $auto_deploy = null;
    public mixed $base_domain = null;
    public mixed $branch_pattern = null;
    public ?string $kind = null;
    public ?string $location_id = null;
    public ?string $name = null;
    public ?string $slug = null;
    public ?string $status = null;
}

/** Request payload for AppEnvironment#remove. */
class AppEnvironmentRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppLocation entity data model. */
class AppLocation
{
    public string $code;
    public string $created_at;
    public string $id;
    public string $location_id;
    public string $name;
    public string $nomad_datacenter;
    public string $updated_at;
}

/** Request payload for AppLocation#list. */
class AppLocationListMatch
{
    public string $app_id;
}

/** Request payload for AppLocation#create. */
class AppLocationCreateData
{
    public string $app_id;
    public string $location_id;
}

/** Request payload for AppLocation#remove. */
class AppLocationRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppMetric entity data model. */
class AppMetric
{
}

/** Request payload for AppMetric#load. */
class AppMetricLoadMatch
{
    public string $app_id;
}

/** AppPreview entity data model. */
class AppPreview
{
    public ?string $access = null;
    public string $app_preview_profile_id;
    public ?string $change_number = null;
    public ?int $expected_generation = null;
    public ?int $expected_patchset = null;
    public ?string $expires_at = null;
    public ?string $id = null;
    public string $name;
    public ?array $resource_overrides = null;
    public ?bool $retained = null;
    public ?array $shared_data_binding_ids = null;
    public ?array $shared_service_binding_ids = null;
    public string $slug;
    public ?string $source_ref = null;
    public ?array $storage_binding_resources = null;
}

/** Request payload for AppPreview#load. */
class AppPreviewLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppPreview#list. */
class AppPreviewListMatch
{
    public string $app_id;
}

/** Request payload for AppPreview#create. */
class AppPreviewCreateData
{
    public string $app_id;
    public string $app_preview_profile_id;
    public ?string $change_number = null;
    public ?int $expected_patchset = null;
    public string $name;
    public string $slug;
    public ?string $source_ref = null;
}

/** Request payload for AppPreview#update. */
class AppPreviewUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppPreview#patch. */
class AppPreviewPatchData
{
    public string $app_id;
    public string $id;
    public ?string $access = null;
    public ?int $expected_generation = null;
    public ?string $expires_at = null;
    public ?array $resource_overrides = null;
    public ?bool $retained = null;
    public ?array $shared_data_binding_ids = null;
    public ?array $shared_service_binding_ids = null;
    public ?array $storage_binding_resources = null;
}

/** Request payload for AppPreview#remove. */
class AppPreviewRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppPreviewProfile entity data model. */
class AppPreviewProfile
{
    public ?bool $automatic = null;
    public ?array $configuration = null;
    public ?string $created_at = null;
    public string $hosted_app_id;
    public string $id;
    public string $name;
    public string $slug;
    public string $source_environment_id;
    public ?int $ttl_days = null;
    public ?string $updated_at = null;
}

/** Request payload for AppPreviewProfile#load. */
class AppPreviewProfileLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppPreviewProfile#list. */
class AppPreviewProfileListMatch
{
    public string $app_id;
}

/** Request payload for AppPreviewProfile#create. */
class AppPreviewProfileCreateData
{
    public string $app_id;
    public ?bool $automatic = null;
    public ?array $configuration = null;
    public string $name;
    public string $slug;
    public string $source_environment_id;
    public ?int $ttl_days = null;
}

/** Request payload for AppPreviewProfile#update. */
class AppPreviewProfileUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppPreviewProfile#patch. */
class AppPreviewProfilePatchData
{
    public string $app_id;
    public string $id;
    public ?bool $automatic = null;
    public ?array $configuration = null;
    public ?string $name = null;
    public ?string $slug = null;
    public ?string $source_environment_id = null;
    public ?int $ttl_days = null;
}

/** Request payload for AppPreviewProfile#remove. */
class AppPreviewProfileRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppRun entity data model. */
class AppRun
{
    public ?string $id = null;
    public ?string $image = null;
}

/** Request payload for AppRun#load. */
class AppRunLoadMatch
{
    public string $id;
}

/** Request payload for AppRun#list. */
class AppRunListMatch
{
    public ?string $id = null;
    public ?string $image = null;
}

/** Request payload for AppRun#create. */
class AppRunCreateData
{
    public ?string $image = null;
}

/** AppSecret entity data model. */
class AppSecret
{
    public ?string $created_at = null;
    public mixed $description = null;
    public mixed $env_key = null;
    public ?bool $expose_to_build = null;
    public ?bool $has_value = null;
    public string $hosted_app_id;
    public string $id;
    public mixed $latest_version_number = null;
    public string $name;
    public string $organization_id;
    public mixed $rotation_policy = null;
    public string $scope_kind;
    public string $slug;
    public string $status;
    public ?string $updated_at = null;
    public ?string $value = null;
    public mixed $value_digest = null;
    public mixed $value_kind = null;
}

/** Request payload for AppSecret#load. */
class AppSecretLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppSecret#list. */
class AppSecretListMatch
{
    public string $app_id;
}

/** Request payload for AppSecret#create. */
class AppSecretCreateData
{
    public string $app_id;
    public mixed $description = null;
    public mixed $env_key = null;
    public ?bool $expose_to_build = null;
    public string $name;
    public mixed $rotation_policy = null;
    public string $slug;
    public ?string $value = null;
    public mixed $value_kind = null;
}

/** Request payload for AppSecret#update. */
class AppSecretUpdateData
{
    public string $app_id;
    public string $id;
    public mixed $description = null;
    public mixed $env_key = null;
    public ?bool $expose_to_build = null;
    public ?string $name = null;
    public mixed $rotation_policy = null;
}

/** Request payload for AppSecret#patch. */
class AppSecretPatchData
{
    public string $app_id;
    public string $id;
    public mixed $description = null;
    public mixed $env_key = null;
    public ?bool $expose_to_build = null;
    public ?string $name = null;
    public mixed $rotation_policy = null;
}

/** Request payload for AppSecret#remove. */
class AppSecretRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppService entity data model. */
class AppService
{
    public bool $auto_deploy;
    public array $bindings;
    public mixed $build_command;
    public mixed $cpu_label;
    public mixed $cpu_mhz;
    public string $created_at;
    public mixed $created_at_label;
    public array $deploy_paths;
    public int $desired_instances;
    public mixed $disk_label;
    public mixed $disk_mb;
    public array $effective_deploy_paths;
    public mixed $healthcheck_path;
    public string $hosted_app_id;
    public string $id;
    public mixed $internal_port;
    public string $kind;
    public mixed $memory_label;
    public mixed $memory_max_label;
    public mixed $memory_max_mb;
    public mixed $memory_mb;
    public string $name;
    public mixed $nomad_constraints_json;
    public mixed $nomad_kill_timeout_seconds;
    public mixed $nomad_namespace;
    public mixed $nomad_region;
    public mixed $nomad_shutdown_delay_seconds;
    public mixed $nomad_ulimits_json;
    public mixed $nomad_update_strategy_json;
    public mixed $prestart_command;
    public bool $publicly_accessible;
    public mixed $release_command;
    public string $repo_source_path;
    public string $runtime;
    public string $runtime_adapter_kind;
    public mixed $runtime_adapter_settings_json;
    public mixed $schedule;
    public string $slug;
    public string $source_path;
    public mixed $start_command;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for AppService#load. */
class AppServiceLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppService#list. */
class AppServiceListMatch
{
    public string $app_id;
}

/** Request payload for AppService#create. */
class AppServiceCreateData
{
    public string $app_id;
    public bool $auto_deploy;
    public mixed $build_command = null;
    public mixed $cpu_mhz = null;
    public ?array $deploy_paths = null;
    public int $desired_instances;
    public mixed $disk_mb = null;
    public mixed $healthcheck_path = null;
    public mixed $internal_port = null;
    public string $kind;
    public mixed $memory_max_mb = null;
    public mixed $memory_mb = null;
    public string $name;
    public mixed $nomad_constraints_json = null;
    public mixed $nomad_kill_timeout_seconds = null;
    public mixed $nomad_namespace = null;
    public mixed $nomad_region = null;
    public mixed $nomad_shutdown_delay_seconds = null;
    public mixed $nomad_ulimits_json = null;
    public mixed $nomad_update_strategy_json = null;
    public mixed $prestart_command = null;
    public bool $publicly_accessible;
    public mixed $release_command = null;
    public string $runtime;
    public string $runtime_adapter_kind;
    public mixed $runtime_adapter_settings_json = null;
    public mixed $schedule = null;
    public string $slug;
    public string $source_path;
    public mixed $start_command;
}

/** Request payload for AppService#update. */
class AppServiceUpdateData
{
    public string $app_id;
    public string $id;
    public ?bool $auto_deploy = null;
    public mixed $build_command = null;
    public mixed $cpu_mhz = null;
    public ?array $deploy_paths = null;
    public ?int $desired_instances = null;
    public mixed $disk_mb = null;
    public mixed $healthcheck_path = null;
    public mixed $internal_port = null;
    public ?string $kind = null;
    public mixed $memory_max_mb = null;
    public mixed $memory_mb = null;
    public ?string $name = null;
    public mixed $nomad_constraints_json = null;
    public mixed $nomad_kill_timeout_seconds = null;
    public mixed $nomad_namespace = null;
    public mixed $nomad_region = null;
    public mixed $nomad_shutdown_delay_seconds = null;
    public mixed $nomad_ulimits_json = null;
    public mixed $nomad_update_strategy_json = null;
    public mixed $prestart_command = null;
    public ?bool $publicly_accessible = null;
    public mixed $release_command = null;
    public ?string $runtime = null;
    public ?string $runtime_adapter_kind = null;
    public mixed $runtime_adapter_settings_json = null;
    public mixed $schedule = null;
    public ?string $slug = null;
    public ?string $source_path = null;
    public mixed $start_command = null;
}

/** Request payload for AppService#patch. */
class AppServicePatchData
{
    public string $app_id;
    public string $id;
    public ?bool $auto_deploy = null;
    public mixed $build_command = null;
    public mixed $cpu_mhz = null;
    public ?array $deploy_paths = null;
    public ?int $desired_instances = null;
    public mixed $disk_mb = null;
    public mixed $healthcheck_path = null;
    public mixed $internal_port = null;
    public ?string $kind = null;
    public mixed $memory_max_mb = null;
    public mixed $memory_mb = null;
    public ?string $name = null;
    public mixed $nomad_constraints_json = null;
    public mixed $nomad_kill_timeout_seconds = null;
    public mixed $nomad_namespace = null;
    public mixed $nomad_region = null;
    public mixed $nomad_shutdown_delay_seconds = null;
    public mixed $nomad_ulimits_json = null;
    public mixed $nomad_update_strategy_json = null;
    public mixed $prestart_command = null;
    public ?bool $publicly_accessible = null;
    public mixed $release_command = null;
    public ?string $runtime = null;
    public ?string $runtime_adapter_kind = null;
    public mixed $runtime_adapter_settings_json = null;
    public mixed $schedule = null;
    public ?string $slug = null;
    public ?string $source_path = null;
    public mixed $start_command = null;
}

/** Request payload for AppService#remove. */
class AppServiceRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppServiceBinding entity data model. */
class AppServiceBinding
{
    public ?string $id = null;
}

/** Request payload for AppServiceBinding#load. */
class AppServiceBindingLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppServiceBinding#list. */
class AppServiceBindingListMatch
{
    public string $app_id;
}

/** Request payload for AppServiceBinding#create. */
class AppServiceBindingCreateData
{
    public string $app_id;
}

/** Request payload for AppServiceBinding#update. */
class AppServiceBindingUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppServiceBinding#patch. */
class AppServiceBindingPatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppServiceBinding#remove. */
class AppServiceBindingRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** AppServicePlacement entity data model. */
class AppServicePlacement
{
    public string $app_environment_id;
    public string $app_service_id;
    public string $created_at;
    public mixed $deployment_channel;
    public string $hosted_app_id;
    public string $id;
    public string $mode;
    public string $organization_id;
    public int $region_count;
    public int $replicas_per_region;
    public string $rollout_strategy;
    public array $targets;
    public int $total_replicas;
    public string $updated_at;
}

/** Request payload for AppServicePlacement#load. */
class AppServicePlacementLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppServicePlacement#list. */
class AppServicePlacementListMatch
{
    public string $app_id;
    public ?bool $existing = null;
    public ?string $service = null;
}

/** Request payload for AppServicePlacement#update. */
class AppServicePlacementUpdateData
{
    public string $app_id;
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public mixed $deployment_channel = null;
    public ?string $mode = null;
    public ?int $replicas_per_region = null;
    public ?string $rollout_strategy = null;
    public ?array $targets = null;
    public mixed $expected_generation = null;
}

/** AppStorageResource entity data model. */
class AppStorageResource
{
    public string $access_mode;
    public mixed $app_environment_id;
    public mixed $attachment;
    public mixed $capacity_gb;
    public mixed $capacity_label;
    public string $created_at;
    public bool $ephemeral;
    public mixed $external_volume_id;
    public string $hosted_app_id;
    public string $id;
    public string $kind;
    public mixed $location_code;
    public mixed $location_id;
    public mixed $mount_path;
    public string $name;
    public string $provider;
    public mixed $provider_error;
    public mixed $region;
    public string $slug;
    public string $status;
    public string $updated_at;
}

/** Request payload for AppStorageResource#load. */
class AppStorageResourceLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppStorageResource#list. */
class AppStorageResourceListMatch
{
    public string $app_id;
}

/** Request payload for AppStorageResource#create. */
class AppStorageResourceCreateData
{
    public string $app_id;
    public string $access_mode;
    public mixed $app_environment_id = null;
    public mixed $capacity_gb = null;
    public string $kind;
    public mixed $location_id = null;
    public mixed $mount_path = null;
    public string $name;
    public string $provider;
    public mixed $region = null;
    public string $slug;
    public string $status;
}

/** Request payload for AppStorageResource#update. */
class AppStorageResourceUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppStorageResource#patch. */
class AppStorageResourcePatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for AppStorageResource#remove. */
class AppStorageResourceRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** Artefact entity data model. */
class Artefact
{
    public mixed $automation_invocation_id = null;
    public int $byte_size;
    public string $checksum_sha256;
    public string $content_type;
    public mixed $created_at = null;
    public mixed $created_by_user_id = null;
    public mixed $description = null;
    public ?string $document_key = null;
    public ?string $entrypoint = null;
    public mixed $expires_at = null;
    public string $filename;
    public ?array $files = null;
    public mixed $harness = null;
    public mixed $harness_version = null;
    public string $id;
    public string $kind;
    public mixed $model = null;
    public string $organization_id;
    public mixed $published_at = null;
    public mixed $repository_id = null;
    public string $slug;
    public string $source;
    public string $status;
    public string $title;
    public mixed $vcs_agent_checkpoint_id = null;
    public mixed $vcs_agent_session_id = null;
    public int $version;
    public string $view_url;
    public string $web_url;
}

/** Request payload for Artefact#load. */
class ArtefactLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Artefact#list. */
class ArtefactListMatch
{
    public string $organization_id;
    public ?string $author = null;
    public ?string $created_by_agent = null;
    public ?string $cursor = null;
    public ?string $editable = null;
    public ?string $harness = null;
    public ?string $kind = null;
    public ?int $limit = null;
    public ?string $model = null;
    public ?string $q = null;
    public ?string $repo = null;
    public ?string $slug = null;
    public ?string $source = null;
}

/** Request payload for Artefact#create. */
class ArtefactCreateData
{
    public string $organization_id;
}

/** Request payload for Artefact#update. */
class ArtefactUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Artefact#patch. */
class ArtefactPatchData
{
    public string $id;
    public string $organization_id;
    public mixed $description = null;
    public ?string $kind = null;
    public ?string $title = null;
}

/** Request payload for Artefact#remove. */
class ArtefactRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** ArtefactCommentThread entity data model. */
class ArtefactCommentThread
{
    public string $anchor;
    public string $body;
    public array $comments;
    public string $id;
    public ?string $quote = null;
    public bool $resolved;
}

/** Request payload for ArtefactCommentThread#list. */
class ArtefactCommentThreadListMatch
{
    public string $artefact_id;
    public string $organization_id;
}

/** Request payload for ArtefactCommentThread#create. */
class ArtefactCommentThreadCreateData
{
    public string $artefact_id;
    public string $organization_id;
    public string $anchor;
    public string $body;
    public ?string $quote = null;
}

/** Request payload for ArtefactCommentThread#update. */
class ArtefactCommentThreadUpdateData
{
    public string $artefact_id;
    public string $id;
    public string $organization_id;
    public ?bool $resolved = null;
}

/** ArtefactRevision entity data model. */
class ArtefactRevision
{
    public int $base_version;
    public string $content;
}

/** Request payload for ArtefactRevision#create. */
class ArtefactRevisionCreateData
{
    public string $artefact_id;
    public string $organization_id;
    public int $base_version;
    public string $content;
}

/** ArtefactViewToken entity data model. */
class ArtefactViewToken
{
    public int $expires_in;
    public ?string $file = null;
    public ?string $organization_slug = null;
    public ?int $version = null;
    public string $viewer_url;
}

/** Request payload for ArtefactViewToken#create. */
class ArtefactViewTokenCreateData
{
    public string $artefact_id;
    public string $organization_id;
    public ?string $file = null;
    public ?string $organization_slug = null;
    public ?int $version = null;
}

/** Artifact entity data model. */
class Artifact
{
    public ?string $id = null;
}

/** Request payload for Artifact#load. */
class ArtifactLoadMatch
{
    public string $id;
}

/** Request payload for Artifact#list. */
class ArtifactListMatch
{
    public ?string $id = null;
}

/** Request payload for Artifact#create. */
class ArtifactCreateData
{
}

/** Request payload for Artifact#update. */
class ArtifactUpdateData
{
    public string $id;
}

/** Request payload for Artifact#patch. */
class ArtifactPatchData
{
    public string $id;
}

/** Request payload for Artifact#remove. */
class ArtifactRemoveMatch
{
    public string $id;
}

/** ArtifactCacheNamespace entity data model. */
class ArtifactCacheNamespace
{
    public ?string $id = null;
}

/** Request payload for ArtifactCacheNamespace#load. */
class ArtifactCacheNamespaceLoadMatch
{
    public string $id;
}

/** Request payload for ArtifactCacheNamespace#list. */
class ArtifactCacheNamespaceListMatch
{
    public ?string $id = null;
}

/** Request payload for ArtifactCacheNamespace#create. */
class ArtifactCacheNamespaceCreateData
{
}

/** Request payload for ArtifactCacheNamespace#update. */
class ArtifactCacheNamespaceUpdateData
{
    public string $id;
}

/** Request payload for ArtifactCacheNamespace#patch. */
class ArtifactCacheNamespacePatchData
{
    public string $id;
}

/** Request payload for ArtifactCacheNamespace#remove. */
class ArtifactCacheNamespaceRemoveMatch
{
    public string $id;
}

/** ArtifactImageRepository entity data model. */
class ArtifactImageRepository
{
    public ?string $id = null;
}

/** Request payload for ArtifactImageRepository#load. */
class ArtifactImageRepositoryLoadMatch
{
    public string $id;
}

/** Request payload for ArtifactImageRepository#list. */
class ArtifactImageRepositoryListMatch
{
    public ?string $id = null;
}

/** Request payload for ArtifactImageRepository#create. */
class ArtifactImageRepositoryCreateData
{
}

/** Request payload for ArtifactImageRepository#update. */
class ArtifactImageRepositoryUpdateData
{
    public string $id;
}

/** Request payload for ArtifactImageRepository#patch. */
class ArtifactImageRepositoryPatchData
{
    public string $id;
}

/** Request payload for ArtifactImageRepository#remove. */
class ArtifactImageRepositoryRemoveMatch
{
    public string $id;
}

/** ArtifactPackageMirror entity data model. */
class ArtifactPackageMirror
{
    public ?string $id = null;
}

/** Request payload for ArtifactPackageMirror#load. */
class ArtifactPackageMirrorLoadMatch
{
    public string $id;
}

/** Request payload for ArtifactPackageMirror#list. */
class ArtifactPackageMirrorListMatch
{
    public ?string $id = null;
}

/** Request payload for ArtifactPackageMirror#create. */
class ArtifactPackageMirrorCreateData
{
}

/** Request payload for ArtifactPackageMirror#update. */
class ArtifactPackageMirrorUpdateData
{
    public string $id;
}

/** Request payload for ArtifactPackageMirror#patch. */
class ArtifactPackageMirrorPatchData
{
    public string $id;
}

/** Request payload for ArtifactPackageMirror#remove. */
class ArtifactPackageMirrorRemoveMatch
{
    public string $id;
}

/** ArtifactRetentionPolicy entity data model. */
class ArtifactRetentionPolicy
{
    public ?string $id = null;
}

/** Request payload for ArtifactRetentionPolicy#load. */
class ArtifactRetentionPolicyLoadMatch
{
    public string $id;
}

/** Request payload for ArtifactRetentionPolicy#list. */
class ArtifactRetentionPolicyListMatch
{
    public ?string $id = null;
}

/** Request payload for ArtifactRetentionPolicy#create. */
class ArtifactRetentionPolicyCreateData
{
}

/** Request payload for ArtifactRetentionPolicy#update. */
class ArtifactRetentionPolicyUpdateData
{
    public string $id;
}

/** Request payload for ArtifactRetentionPolicy#patch. */
class ArtifactRetentionPolicyPatchData
{
    public string $id;
}

/** Request payload for ArtifactRetentionPolicy#remove. */
class ArtifactRetentionPolicyRemoveMatch
{
    public string $id;
}

/** AttachmentPart entity data model. */
class AttachmentPart
{
    public ?string $id = null;
}

/** Request payload for AttachmentPart#update. */
class AttachmentPartUpdateData
{
    public string $agent_id;
    public string $attachment_id;
    public string $id;
    public string $organization_id;
}

/** AuditEvent entity data model. */
class AuditEvent
{
    public string $action;
    public string $actor_kind;
    public mixed $actor_user_id;
    public string $created_at;
    public mixed $created_at_label;
    public string $id;
    public mixed $observability_space_id;
    public string $organization_id;
    public mixed $payload;
    public mixed $request_id;
    public string $severity;
    public string $subject_id;
    public string $subject_kind;
    public mixed $subject_name;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for AuditEvent#list. */
class AuditEventListMatch
{
    public string $organization_id;
}

/** Auth entity data model. */
class Auth
{
}

/** Request payload for Auth#load. */
class AuthLoadMatch
{
}

/** Request payload for Auth#create. */
class AuthCreateData
{
    public mixed $cli_login_id = null;
    public mixed $code = null;
    public mixed $email = null;
    public mixed $invite_code = null;
    public mixed $login_id = null;
    public mixed $name = null;
    public mixed $organization_invitation_token = null;
    public mixed $password = null;
    public mixed $polling_token = null;
    public mixed $redirect_uri = null;
    public mixed $state = null;
    public mixed $turnstile_token = null;
}

/** Request payload for Auth#remove. */
class AuthRemoveMatch
{
}

/** AuthCli entity data model. */
class AuthCli
{
}

/** Request payload for AuthCli#create. */
class AuthCliCreateData
{
    public mixed $client_kind = null;
    public mixed $intent = null;
    public mixed $login_id = null;
    public mixed $name = null;
    public mixed $organization_id = null;
    public mixed $organization_slug = null;
}

/** AuthGithub entity data model. */
class AuthGithub
{
}

/** Request payload for AuthGithub#load. */
class AuthGithubLoadMatch
{
    public string $redirect_uri;
}

/** AuthGoogle entity data model. */
class AuthGoogle
{
}

/** Request payload for AuthGoogle#load. */
class AuthGoogleLoadMatch
{
    public string $redirect_uri;
}

/** AuthOpenai entity data model. */
class AuthOpenai
{
}

/** Request payload for AuthOpenai#load. */
class AuthOpenaiLoadMatch
{
    public ?string $code = null;
    public ?string $error = null;
    public string $state;
}

/** AuthPasswordReset entity data model. */
class AuthPasswordReset
{
    public string $email;
    public string $message;
    public string $password;
    public string $token;
}

/** Request payload for AuthPasswordReset#create. */
class AuthPasswordResetCreateData
{
    public string $email;
}

/** Request payload for AuthPasswordReset#update. */
class AuthPasswordResetUpdateData
{
    public ?string $password = null;
    public ?string $token = null;
}

/** AuthRegistrationOption entity data model. */
class AuthRegistrationOption
{
    public bool $email_password_signup_enabled;
    public ?bool $openai_sign_in_enabled = null;
    public mixed $turnstile_site_key;
    public bool $waitlist_enabled;
}

/** Request payload for AuthRegistrationOption#list. */
class AuthRegistrationOptionListMatch
{
    public ?bool $email_password_signup_enabled = null;
    public ?bool $openai_sign_in_enabled = null;
    public mixed $turnstile_site_key = null;
    public ?bool $waitlist_enabled = null;
}

/** AutomationEvent entity data model. */
class AutomationEvent
{
    public string $action;
    public bool $can_manage;
    public bool $can_manage_events;
    public bool $can_run;
    public bool $can_schedule;
    public array $event_subscriptions;
    public array $event_triggers;
    public mixed $expected_revision;
    public string $id;
    public string $key;
    public string $name;
    public int $revision;
    public mixed $schedule;
    public array $schedules;
    public ?array $settings = null;
    public string $subscription_key;
    public array $version;
}

/** Request payload for AutomationEvent#update. */
class AutomationEventUpdateData
{
    public string $agent_id;
    public string $automation_id;
    public string $organization_id;
    public ?string $action = null;
    public mixed $expected_revision = null;
    public ?array $settings = null;
    public ?string $subscription_key = null;
}

/** AutomationRun entity data model. */
class AutomationRun
{
    public string $action;
    public mixed $automation;
    public mixed $budget_seconds;
    public mixed $budget_usd;
    public bool $can_answer;
    public bool $can_approve;
    public bool $can_dismiss;
    public mixed $checkpoint;
    public mixed $conversation_id;
    public array $decision_history;
    public mixed $error;
    public mixed $finished_at;
    public mixed $flow_steps;
    public string $id;
    public array $input;
    public bool $needs_you;
    public mixed $note;
    public mixed $nothing_to_do_reason;
    public string $request_id;
    public int $resume_count;
    public mixed $retry_step_id;
    public int $running_seconds;
    public string $source;
    public int $spent_tokens;
    public float $spent_usd;
    public bool $stalled;
    public string $started_at;
    public mixed $started_by;
    public string $status;
    public int $step_count;
    public array $steps;
    public mixed $trigger_id;
    public string $version_id;
    public mixed $wake_at;
    public mixed $workflow_digest;
    public mixed $workflow_path;
}

/** Request payload for AutomationRun#create. */
class AutomationRunCreateData
{
    public string $agent_id;
    public string $automation_id;
    public string $organization_id;
    public array $input;
    public string $request_id;
    public string $version_id;
}

/** BackendRunnerPool entity data model. */
class BackendRunnerPool
{
    public ?string $id = null;
}

/** Request payload for BackendRunnerPool#list. */
class BackendRunnerPoolListMatch
{
    public string $backend_id;
}

/** Request payload for BackendRunnerPool#create. */
class BackendRunnerPoolCreateData
{
    public string $backend_id;
}

/** Request payload for BackendRunnerPool#remove. */
class BackendRunnerPoolRemoveMatch
{
    public string $backend_id;
    public string $id;
}

/** Bazel entity data model. */
class Bazel
{
}

/** Request payload for Bazel#create. */
class BazelCreateData
{
}

/** BazelActionResult entity data model. */
class BazelActionResult
{
    public ?string $id = null;
}

/** Request payload for BazelActionResult#load. */
class BazelActionResultLoadMatch
{
    public string $action_result_id;
    public string $id;
}

/** Request payload for BazelActionResult#update. */
class BazelActionResultUpdateData
{
    public string $action_result_id;
    public string $id;
}

/** BazelBackend entity data model. */
class BazelBackend
{
    public ?string $id = null;
}

/** Request payload for BazelBackend#load. */
class BazelBackendLoadMatch
{
    public string $id;
}

/** Request payload for BazelBackend#list. */
class BazelBackendListMatch
{
    public ?string $id = null;
}

/** Request payload for BazelBackend#create. */
class BazelBackendCreateData
{
}

/** Request payload for BazelBackend#update. */
class BazelBackendUpdateData
{
    public string $id;
}

/** Request payload for BazelBackend#patch. */
class BazelBackendPatchData
{
    public string $id;
}

/** Request payload for BazelBackend#remove. */
class BazelBackendRemoveMatch
{
    public string $id;
}

/** BazelBlob entity data model. */
class BazelBlob
{
    public ?string $id = null;
}

/** Request payload for BazelBlob#load. */
class BazelBlobLoadMatch
{
    public string $blob_id;
    public string $hash;
    public string $id;
}

/** Request payload for BazelBlob#update. */
class BazelBlobUpdateData
{
    public string $blob_id;
    public string $hash;
    public string $id;
}

/** BazelExecution entity data model. */
class BazelExecution
{
    public ?string $id = null;
}

/** Request payload for BazelExecution#load. */
class BazelExecutionLoadMatch
{
    public string $id;
}

/** Request payload for BazelExecution#create. */
class BazelExecutionCreateData
{
}

/** BazelFindMissingBlob entity data model. */
class BazelFindMissingBlob
{
}

/** Request payload for BazelFindMissingBlob#create. */
class BazelFindMissingBlobCreateData
{
}

/** Billing entity data model. */
class Billing
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for Billing#load. */
class BillingLoadMatch
{
    public string $organization_id;
}

/** BillingAddon entity data model. */
class BillingAddon
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public ?string $id = null;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public int $quantity;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for BillingAddon#update. */
class BillingAddonUpdateData
{
    public string $id;
    public string $organization_id;
    public ?int $quantity = null;
}

/** BillingBudget entity data model. */
class BillingBudget
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public mixed $monthly_cap_cents = null;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for BillingBudget#update. */
class BillingBudgetUpdateData
{
    public string $organization_id;
    public mixed $monthly_cap_cents = null;
}

/** Request payload for BillingBudget#patch. */
class BillingBudgetPatchData
{
    public string $organization_id;
}

/** BillingCheckoutSession entity data model. */
class BillingCheckoutSession
{
    public ?string $cancel_url = null;
    public ?string $coupon_code = null;
    public ?string $entry_point = null;
    public ?string $package_key = null;
    public ?int $package_revision = null;
    public ?string $success_url = null;
}

/** Request payload for BillingCheckoutSession#create. */
class BillingCheckoutSessionCreateData
{
    public string $organization_id;
    public ?string $cancel_url = null;
    public ?string $coupon_code = null;
    public ?string $entry_point = null;
    public ?string $package_key = null;
    public ?int $package_revision = null;
    public ?string $success_url = null;
}

/** BillingContact entity data model. */
class BillingContact
{
    public array $addons;
    public string $billing_email;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for BillingContact#update. */
class BillingContactUpdateData
{
    public string $organization_id;
}

/** Request payload for BillingContact#patch. */
class BillingContactPatchData
{
    public string $organization_id;
    public ?string $billing_email = null;
}

/** BillingExtraSpend entity data model. */
class BillingExtraSpend
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public bool $enabled;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public mixed $monthly_cap_cents = null;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for BillingExtraSpend#update. */
class BillingExtraSpendUpdateData
{
    public string $organization_id;
    public ?bool $enabled = null;
    public mixed $monthly_cap_cents = null;
}

/** Request payload for BillingExtraSpend#patch. */
class BillingExtraSpendPatchData
{
    public string $organization_id;
    public ?bool $enabled = null;
    public mixed $monthly_cap_cents = null;
}

/** BillingInvoice entity data model. */
class BillingInvoice
{
    public int $amount_due_cents;
    public string $created_at;
    public string $currency;
    public mixed $hosted_invoice_url = null;
    public string $id;
    public mixed $invoice_pdf = null;
    public mixed $metronome_invoice_id = null;
    public mixed $number = null;
    public mixed $period_ended_at = null;
    public mixed $period_started_at = null;
    public string $status;
    public int $total_cents;
}

/** Request payload for BillingInvoice#list. */
class BillingInvoiceListMatch
{
    public string $organization_id;
}

/** BillingPackage entity data model. */
class BillingPackage
{
    public array $addons;
    public int $base_price_cents;
    public string $billing_interval;
    public string $billing_policy;
    public ?int $ci_included_spend_cents = null;
    public string $currency;
    public string $key;
    public mixed $max_seats = null;
    public string $name;
    public bool $pay_as_you_go_enabled;
    public array $rates;
    public int $revision;
    public ?int $roder_daily_run_limit = null;
    public ?int $roder_run_concurrency_limit = null;
    public int $seat_price_cents;
    public int $trial_days;
    public string $visibility;
}

/** Request payload for BillingPackage#list. */
class BillingPackageListMatch
{
    public ?array $addons = null;
    public ?int $base_price_cents = null;
    public ?string $billing_interval = null;
    public ?string $billing_policy = null;
    public ?int $ci_included_spend_cents = null;
    public ?string $currency = null;
    public ?string $key = null;
    public mixed $max_seats = null;
    public ?string $name = null;
    public ?bool $pay_as_you_go_enabled = null;
    public ?array $rates = null;
    public ?int $revision = null;
    public ?int $roder_daily_run_limit = null;
    public ?int $roder_run_concurrency_limit = null;
    public ?int $seat_price_cents = null;
    public ?int $trial_days = null;
    public ?string $visibility = null;
}

/** BillingPortalSession entity data model. */
class BillingPortalSession
{
    public ?string $return_url = null;
}

/** Request payload for BillingPortalSession#create. */
class BillingPortalSessionCreateData
{
    public string $organization_id;
    public ?string $return_url = null;
}

/** BillingPrepaidPeriod entity data model. */
class BillingPrepaidPeriod
{
    public mixed $activated_at;
    public string $created_at;
    public string $currency;
    public string $id;
    public mixed $last_error;
    public int $minutes;
    public int $net_amount_cents;
    public mixed $paid_at;
    public mixed $paid_total_cents;
    public mixed $payment_action_url;
    public string $period_ended_at;
    public string $period_started_at;
    public mixed $receipt_url;
    public int $refunded_net_cents;
    public string $state;
}

/** Request payload for BillingPrepaidPeriod#load. */
class BillingPrepaidPeriodLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** BillingPrepaidPurchase entity data model. */
class BillingPrepaidPurchase
{
    public mixed $activated_at;
    public string $created_at;
    public string $currency;
    public string $id;
    public mixed $last_error;
    public int $minutes;
    public int $net_amount_cents;
    public mixed $paid_at;
    public mixed $paid_total_cents;
    public mixed $payment_action_url;
    public array $prepaid;
    public array $purchase;
    public mixed $receipt_url;
    public int $refunded_net_cents;
    public string $request_key;
    public string $state;
}

/** Request payload for BillingPrepaidPurchase#load. */
class BillingPrepaidPurchaseLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for BillingPrepaidPurchase#list. */
class BillingPrepaidPurchaseListMatch
{
    public string $organization_id;
}

/** Request payload for BillingPrepaidPurchase#create. */
class BillingPrepaidPurchaseCreateData
{
    public string $organization_id;
    public int $minutes;
    public string $request_key;
}

/** BillingSubscription entity data model. */
class BillingSubscription
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public bool $cancel_at_period_end;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for BillingSubscription#update. */
class BillingSubscriptionUpdateData
{
    public string $organization_id;
}

/** Request payload for BillingSubscription#patch. */
class BillingSubscriptionPatchData
{
    public string $organization_id;
    public ?bool $cancel_at_period_end = null;
}

/** BillingTokenTopUp entity data model. */
class BillingTokenTopUp
{
    public int $amount_cents;
    public string $request_key;
}

/** Request payload for BillingTokenTopUp#create. */
class BillingTokenTopUpCreateData
{
    public string $organization_id;
    public int $amount_cents;
    public string $request_key;
}

/** BillingUsage entity data model. */
class BillingUsage
{
}

/** Request payload for BillingUsage#load. */
class BillingUsageLoadMatch
{
    public string $organization_id;
    public ?string $meter = null;
    public ?string $window = null;
}

/** Binary entity data model. */
class Binary
{
    public bool $accepts_versions;
    public mixed $arch = null;
    public mixed $archived_at;
    public array $binary;
    public string $created_at;
    public ?string $download_secret = null;
    public string $download_url;
    public string $executable;
    public mixed $format;
    public string $id;
    public string $idempotency_key;
    public mixed $latest_version;
    public ?array $launch_args = null;
    public string $name;
    public bool $needs_refresh;
    public array $operation;
    public array $pagination;
    public array $permissions;
    public mixed $platform = null;
    public string $project_id;
    public ?string $sha256 = null;
    public string $slug;
    public array $version;
    public mixed $version_defaults = null;
    public array $versions;
    public string $window_title;
}

/** Request payload for Binary#load. */
class BinaryLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $page = null;
    public string $project_id;
}

/** Request payload for Binary#list. */
class BinaryListMatch
{
    public string $organization_id;
    public ?int $page = null;
    public string $project_id;
}

/** Request payload for Binary#create. */
class BinaryCreateData
{
    public string $organization_id;
    public string $project_id;
    public mixed $arch = null;
    public ?string $download_secret = null;
    public string $download_url;
    public string $executable;
    public mixed $format;
    public string $idempotency_key;
    public ?array $launch_args = null;
    public string $name;
    public mixed $platform = null;
    public ?string $sha256 = null;
    public string $slug;
    public string $window_title;
}

/** BinaryVersion entity data model. */
class BinaryVersion
{
    public mixed $arch = null;
    public bool $cancelable;
    public array $configuration;
    public string $configuration_digest;
    public string $created_at;
    public bool $deletable;
    public ?string $download_secret = null;
    public string $download_url;
    public array $environment_uses;
    public ?string $executable = null;
    public mixed $format = null;
    public string $id;
    public string $idempotency_key;
    public ?array $launch_args = null;
    public array $operation;
    public mixed $package_sha256;
    public mixed $package_size;
    public array $permissions;
    public mixed $platform = null;
    public array $preparations;
    public bool $retryable;
    public ?string $sha256 = null;
    public string $status;
    public array $version;
    public ?string $window_title = null;
}

/** Request payload for BinaryVersion#load. */
class BinaryVersionLoadMatch
{
    public string $binary_id;
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for BinaryVersion#list. */
class BinaryVersionListMatch
{
    public string $binary_id;
    public string $organization_id;
    public ?int $page = null;
    public string $project_id;
}

/** Request payload for BinaryVersion#create. */
class BinaryVersionCreateData
{
    public string $binary_id;
    public string $organization_id;
    public string $project_id;
    public mixed $arch = null;
    public ?string $download_secret = null;
    public string $download_url;
    public ?string $executable = null;
    public mixed $format = null;
    public string $idempotency_key;
    public ?array $launch_args = null;
    public mixed $platform = null;
    public ?string $sha256 = null;
    public ?string $window_title = null;
}

/** Request payload for BinaryVersion#remove. */
class BinaryVersionRemoveMatch
{
    public string $binary_id;
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** BookmarkProtectionRefreshGithubRequiredCheck entity data model. */
class BookmarkProtectionRefreshGithubRequiredCheck
{
    public array $exclusions;
    public mixed $fetched_at = null;
    public mixed $fetched_at_label = null;
    public string $github_branch;
    public mixed $github_owner = null;
    public mixed $github_repository_name = null;
    public mixed $last_error = null;
    public bool $proven;
    public array $requirements;
    public bool $stale;
}

/** Request payload for BookmarkProtectionRefreshGithubRequiredCheck#create. */
class BookmarkProtectionRefreshGithubRequiredCheckCreateData
{
    public string $organization_id;
    public string $repo_id;
    public ?string $github_branch = null;
}

/** BrowserEgressCandidate entity data model. */
class BrowserEgressCandidate
{
    public string $id;
}

/** Request payload for BrowserEgressCandidate#list. */
class BrowserEgressCandidateListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** BrowserSession entity data model. */
class BrowserSession
{
    public mixed $active_task_id = null;
    public string $authentication_status;
    public mixed $authentication_task_id = null;
    public mixed $cdp_url = null;
    public mixed $closed_at = null;
    public mixed $closure_basis = null;
    public int $control_generation;
    public string $controller;
    public mixed $credential_id = null;
    public ?string $environment_id = null;
    public mixed $environment_revision_id = null;
    public string $expires_at;
    public mixed $failure_code = null;
    public string $id;
    public ?string $idempotency_key = null;
    public string $initial_url;
    public ?int $max_seconds = null;
    public mixed $pending_control_id = null;
    public mixed $project_id = null;
    public mixed $reconciled_at = null;
    public mixed $started_at = null;
    public string $status;
    public ?string $url = null;
    public mixed $viewer = null;
}

/** Request payload for BrowserSession#load. */
class BrowserSessionLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for BrowserSession#create. */
class BrowserSessionCreateData
{
    public string $organization_id;
    public ?string $controller = null;
    public mixed $credential_id = null;
    public ?string $environment_id = null;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public mixed $project_id = null;
    public ?string $url = null;
}

/** Request payload for BrowserSession#remove. */
class BrowserSessionRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** BrowserSessionConnection entity data model. */
class BrowserSessionConnection
{
    public int $generation;
    public ?string $idempotency_key = null;
}

/** Request payload for BrowserSessionConnection#create. */
class BrowserSessionConnectionCreateData
{
    public string $browser_session_id;
    public string $organization_id;
    public int $generation;
    public ?string $idempotency_key = null;
}

/** BrowserSessionControl entity data model. */
class BrowserSessionControl
{
    public string $browser_session_id;
    public mixed $completed_at = null;
    public mixed $completed_generation = null;
    public mixed $connection = null;
    public mixed $failure_code = null;
    public string $id;
    public string $requested_controller;
    public int $requested_generation;
    public string $status;
}

/** Request payload for BrowserSessionControl#load. */
class BrowserSessionControlLoadMatch
{
    public string $browser_session_id;
    public string $id;
    public string $organization_id;
}

/** BrowserSessionEvent entity data model. */
class BrowserSessionEvent
{
    public mixed $browser_task_id = null;
    public string $created_at;
    public string $id;
    public string $kind;
    public array $payload;
    public mixed $source_sequence = null;
}

/** Request payload for BrowserSessionEvent#list. */
class BrowserSessionEventListMatch
{
    public string $browser_session_id;
    public string $organization_id;
    public ?string $after = null;
}

/** BrowserSessionMedia entity data model. */
class BrowserSessionMedia
{
    public string $browser_session_id;
    public mixed $capture_omissions = null;
    public mixed $captured_at = null;
    public mixed $ended_at = null;
    public mixed $failure_code = null;
    public array $files;
    public mixed $frames = null;
    public string $id;
    public string $kind;
    public bool $partial;
    public string $retention_expires_at;
    public mixed $source = null;
    public string $status;
    public mixed $stop_requested_at = null;
}

/** Request payload for BrowserSessionMedia#load. */
class BrowserSessionMediaLoadMatch
{
    public string $browser_session_id;
    public string $id;
    public string $organization_id;
}

/** BrowserSessionRecording entity data model. */
class BrowserSessionRecording
{
    public ?string $id = null;
    public ?string $idempotency_key = null;
    public ?bool $wait = null;
}

/** Request payload for BrowserSessionRecording#create. */
class BrowserSessionRecordingCreateData
{
    public string $browser_session_id;
    public string $organization_id;
    public ?string $idempotency_key = null;
    public ?bool $wait = null;
}

/** BrowserSessionScreenshot entity data model. */
class BrowserSessionScreenshot
{
    public ?string $idempotency_key = null;
    public ?bool $wait = null;
}

/** Request payload for BrowserSessionScreenshot#create. */
class BrowserSessionScreenshotCreateData
{
    public string $browser_session_id;
    public string $organization_id;
    public ?string $idempotency_key = null;
    public ?bool $wait = null;
}

/** BrowserSessionTask entity data model. */
class BrowserSessionTask
{
    public mixed $activity = null;
    public string $browser_session_id;
    public mixed $cancel_requested_at = null;
    public mixed $completed_at = null;
    public mixed $control_generation = null;
    public string $deadline_at;
    public bool $effects_unknown;
    public mixed $failure_code = null;
    public string $id;
    public ?string $idempotency_key = null;
    public string $instruction;
    public int $max_rounds;
    public ?int $max_seconds = null;
    public array $model_selection;
    public mixed $outcome = null;
    public array $result;
    public mixed $started_at = null;
    public string $status;
}

/** Request payload for BrowserSessionTask#load. */
class BrowserSessionTaskLoadMatch
{
    public string $browser_session_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for BrowserSessionTask#create. */
class BrowserSessionTaskCreateData
{
    public string $browser_session_id;
    public string $organization_id;
    public ?string $idempotency_key = null;
    public string $instruction;
    public ?int $max_rounds = null;
    public ?int $max_seconds = null;
    public mixed $outcome = null;
}

/** CacheNamespaceEntry entity data model. */
class CacheNamespaceEntry
{
    public ?string $id = null;
}

/** Request payload for CacheNamespaceEntry#load. */
class CacheNamespaceEntryLoadMatch
{
    public string $cache_namespace_id;
    public string $id;
}

/** Request payload for CacheNamespaceEntry#list. */
class CacheNamespaceEntryListMatch
{
    public string $cache_namespace_id;
}

/** Request payload for CacheNamespaceEntry#create. */
class CacheNamespaceEntryCreateData
{
    public string $cache_namespace_id;
}

/** Request payload for CacheNamespaceEntry#update. */
class CacheNamespaceEntryUpdateData
{
    public string $cache_namespace_id;
    public string $id;
}

/** Request payload for CacheNamespaceEntry#patch. */
class CacheNamespaceEntryPatchData
{
    public string $cache_namespace_id;
    public string $id;
}

/** Request payload for CacheNamespaceEntry#remove. */
class CacheNamespaceEntryRemoveMatch
{
    public string $cache_namespace_id;
    public string $id;
}

/** CatalogSelector entity data model. */
class CatalogSelector
{
    public array $app;
}

/** Request payload for CatalogSelector#list. */
class CatalogSelectorListMatch
{
    public string $app_id;
}

/** CdnDeployment entity data model. */
class CdnDeployment
{
    public ?string $id = null;
}

/** Request payload for CdnDeployment#load. */
class CdnDeploymentLoadMatch
{
    public string $app_id;
    public string $cdn_id;
    public string $id;
}

/** Request payload for CdnDeployment#list. */
class CdnDeploymentListMatch
{
    public string $app_id;
    public string $cdn_id;
}

/** Request payload for CdnDeployment#create. */
class CdnDeploymentCreateData
{
    public string $app_id;
    public string $cdn_id;
}

/** CdnHostname entity data model. */
class CdnHostname
{
    public string $app_cdn_distribution_id;
    public string $created_at;
    public string $dns_status;
    public bool $force_ssl;
    public string $hostname;
    public string $id;
    public mixed $provider_hostname_id;
    public string $tls_status;
    public string $updated_at;
}

/** Request payload for CdnHostname#load. */
class CdnHostnameLoadMatch
{
    public string $app_id;
    public string $cdn_id;
    public string $id;
}

/** Request payload for CdnHostname#list. */
class CdnHostnameListMatch
{
    public string $app_id;
    public string $cdn_id;
}

/** Request payload for CdnHostname#create. */
class CdnHostnameCreateData
{
    public string $app_id;
    public string $cdn_id;
    public ?string $dns_status = null;
    public ?bool $force_ssl = null;
    public string $hostname;
    public ?string $tls_status = null;
}

/** Request payload for CdnHostname#update. */
class CdnHostnameUpdateData
{
    public string $app_id;
    public string $cdn_id;
    public string $id;
}

/** Request payload for CdnHostname#patch. */
class CdnHostnamePatchData
{
    public string $app_id;
    public string $cdn_id;
    public string $id;
}

/** Request payload for CdnHostname#remove. */
class CdnHostnameRemoveMatch
{
    public string $app_id;
    public string $cdn_id;
    public string $id;
}

/** CdnSpace entity data model. */
class CdnSpace
{
    public ?string $id = null;
}

/** Request payload for CdnSpace#load. */
class CdnSpaceLoadMatch
{
    public string $id;
}

/** Request payload for CdnSpace#list. */
class CdnSpaceListMatch
{
    public string $organization_id;
}

/** Request payload for CdnSpace#create. */
class CdnSpaceCreateData
{
    public string $organization_id;
}

/** Request payload for CdnSpace#update. */
class CdnSpaceUpdateData
{
    public string $id;
}

/** Request payload for CdnSpace#patch. */
class CdnSpacePatchData
{
    public string $id;
}

/** Request payload for CdnSpace#remove. */
class CdnSpaceRemoveMatch
{
    public string $id;
}

/** CdnSpaceObject entity data model. */
class CdnSpaceObject
{
    public ?string $id = null;
}

/** Request payload for CdnSpaceObject#load. */
class CdnSpaceObjectLoadMatch
{
    public string $cdn_space_id;
    public string $id;
}

/** Request payload for CdnSpaceObject#list. */
class CdnSpaceObjectListMatch
{
    public string $cdn_space_id;
}

/** Request payload for CdnSpaceObject#update. */
class CdnSpaceObjectUpdateData
{
    public string $cdn_space_id;
}

/** Request payload for CdnSpaceObject#remove. */
class CdnSpaceObjectRemoveMatch
{
    public string $cdn_space_id;
    public string $id;
}

/** Change entity data model. */
class Change
{
    public array $counts;
    public array $filters;
    public array $github_sync;
    public mixed $result;
}

/** Request payload for Change#list. */
class ChangeListMatch
{
    public string $organization_id;
    public ?string $author = null;
    public ?bool $awaiting_review = null;
    public ?string $direction = null;
    public ?string $group_page = null;
    public ?string $label = null;
    public ?bool $mine = null;
    public ?int $number = null;
    public ?int $page = null;
    public ?string $q = null;
    public ?string $repo = null;
    public ?string $sort = null;
    public ?string $source = null;
    public ?string $stack = null;
    public ?string $state = null;
    public ?string $target = null;
    public ?bool $tips_only = null;
    public ?string $view = null;
}

/** ChangeAsset entity data model. */
class ChangeAsset
{
    public string $alias;
    public int $byte_size;
    public string $checksum_md5;
    public string $checksum_sha256;
    public string $content_type;
    public string $filename;
    public ?string $id = null;
}

/** Request payload for ChangeAsset#create. */
class ChangeAssetCreateData
{
    public string $organization_id;
    public string $repo_id;
    public string $alias;
    public int $byte_size;
    public string $checksum_md5;
    public string $checksum_sha256;
    public string $content_type;
    public string $filename;
}

/** ChangeComment entity data model. */
class ChangeComment
{
    public string $body;
    public array $capabilities;
    public mixed $change_id = null;
    public mixed $created_at = null;
    public mixed $created_at_label = null;
    public string $id;
    public mixed $kind = null;
    public mixed $line = null;
    public bool $outdated;
    public mixed $parent_comment_id = null;
    public mixed $patchset_id = null;
    public mixed $patchset_number;
    public mixed $path = null;
    public ?array $replies = null;
    public bool $resolved;
    public mixed $resolved_at = null;
    public mixed $resolved_at_label = null;
    public array $resolved_by;
    public mixed $side = null;
    public mixed $updated_at = null;
    public mixed $updated_at_label = null;
    public array $user;
}

/** Request payload for ChangeComment#list. */
class ChangeCommentListMatch
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public ?string $path = null;
    public ?bool $resolved = null;
}

/** Request payload for ChangeComment#create. */
class ChangeCommentCreateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public string $body;
    public mixed $kind = null;
    public mixed $line = null;
    public mixed $parent_comment_id = null;
    public mixed $patchset_id = null;
    public mixed $path = null;
    public mixed $side = null;
}

/** ChangeFileReviewCheckpoint entity data model. */
class ChangeFileReviewCheckpoint
{
    public string $patchset_id;
    public string $path;
    public string $request_id;
    public string $review_action;
}

/** Request payload for ChangeFileReviewCheckpoint#create. */
class ChangeFileReviewCheckpointCreateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public string $patchset_id;
    public string $path;
    public string $request_id;
    public string $review_action;
}

/** ChangeGitBranchSubmission entity data model. */
class ChangeGitBranchSubmission
{
}

/** Request payload for ChangeGitBranchSubmission#create. */
class ChangeGitBranchSubmissionCreateData
{
    public string $organization_id;
    public string $repo_id;
}

/** ChangeGitCommitIdentity entity data model. */
class ChangeGitCommitIdentity
{
    public string $change_id;
    public int $change_number;
    public string $git_commit_id;
    public array $git_commit_ids;
    public ?string $id = null;
    public array $identities;
    public array $missing_git_commit_ids;
    public int $patchset_number;
}

/** Request payload for ChangeGitCommitIdentity#load. */
class ChangeGitCommitIdentityLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for ChangeGitCommitIdentity#create. */
class ChangeGitCommitIdentityCreateData
{
    public string $organization_id;
    public string $repo_id;
    public array $git_commit_ids;
}

/** ChangeGitPublication entity data model. */
class ChangeGitPublication
{
    public string $expected_target_commit_id;
    public ?string $id = null;
    public string $operation_key;
    public string $publication_id;
    public array $request;
    public string $request_digest;
    public array $revisions;
    public string $status;
    public ?array $transfer_refs = null;
}

/** Request payload for ChangeGitPublication#load. */
class ChangeGitPublicationLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for ChangeGitPublication#create. */
class ChangeGitPublicationCreateData
{
    public string $organization_id;
    public string $repo_id;
    public string $operation_key;
    public array $request;
}

/** ChangeGroupMember entity data model. */
class ChangeGroupMember
{
    public string $change_id;
    public array $changes;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $number = null;
    public string $status;
    public mixed $title;
}

/** Request payload for ChangeGroupMember#create. */
class ChangeGroupMemberCreateData
{
    public string $change_group_id;
    public string $organization_id;
    public string $repo_id;
    public string $change_id;
}

/** Request payload for ChangeGroupMember#remove. */
class ChangeGroupMemberRemoveMatch
{
    public string $change_group_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** ChangeLabel entity data model. */
class ChangeLabel
{
    public ?bool $accepted = null;
    public ?array $add = null;
    public array $approval;
    public ?array $assets = null;
    public mixed $author = null;
    public array $capabilities;
    public ?string $change_key = null;
    public ?array $checks = null;
    public ?string $checks_status = null;
    public ?array $comments = null;
    public ?int $comments_count = null;
    public ?string $comments_count_label = null;
    public mixed $commit_message = null;
    public array $current_patchset;
    public mixed $description = null;
    public ?bool $draft = null;
    public mixed $folded_into_number = null;
    public mixed $github_projection_status = null;
    public array $github_pull_request;
    public ?array $github_pull_requests = null;
    public mixed $group = null;
    public ?bool $has_description = null;
    public string $id;
    public mixed $jj_change_id = null;
    public ?array $labels = null;
    public ?bool $landable = null;
    public array $landed_by;
    public int $number;
    public ?bool $orphaned = null;
    public ?string $orphaned_at = null;
    public ?string $orphaned_at_label = null;
    public ?string $orphaned_reason = null;
    public mixed $parent_change_id = null;
    public mixed $parent_change_number = null;
    public mixed $patchset_number = null;
    public ?array $patchsets = null;
    public mixed $primary_status = null;
    public ?string $public_id = null;
    public ?array $relation_chain = null;
    public ?array $remove = null;
    public ?bool $requested_changes = null;
    public ?string $restack_state = null;
    public ?array $reviewer_candidates = null;
    public ?array $reviewers = null;
    public ?string $stable_change_id = null;
    public mixed $stack = null;
    public string $status;
    public string $target_branch;
    public string $title;
    public ?string $unresolved_comments_count_label = null;
    public ?string $url = null;
    public ?array $votes = null;
}

/** Request payload for ChangeLabel#update. */
class ChangeLabelUpdateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public ?array $add = null;
    public ?array $labels = null;
    public ?array $remove = null;
}

/** ChangeLandingHold entity data model. */
class ChangeLandingHold
{
}

/** Request payload for ChangeLandingHold#create. */
class ChangeLandingHoldCreateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
}

/** ChangeLandingRequest entity data model. */
class ChangeLandingRequest
{
    public ?array $change_ids = null;
    public int $count;
    public ?bool $defer_until_ready = null;
    public ?string $expected_requirement_version = null;
    public ?string $expected_scope_version = null;
    public ?string $head_change_id = null;
    public mixed $id = null;
    public array $numbers;
    public ?bool $override_acknowledged = null;
    public ?array $override_codes = null;
    public ?int $position = null;
    public ?string $priority = null;
    public string $scope_version;
    public string $state;
    public ?int $version = null;
}

/** Request payload for ChangeLandingRequest#create. */
class ChangeLandingRequestCreateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public ?bool $defer_until_ready = null;
    public ?string $expected_requirement_version = null;
    public ?string $expected_scope_version = null;
    public ?bool $override_acknowledged = null;
    public ?array $override_codes = null;
    public ?string $priority = null;
}

/** Request payload for ChangeLandingRequest#remove. */
class ChangeLandingRequestRemoveMatch
{
    public string $change_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** ChangeRequestChange entity data model. */
class ChangeRequestChange
{
    public mixed $message = null;
}

/** Request payload for ChangeRequestChange#create. */
class ChangeRequestChangeCreateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public mixed $message = null;
}

/** ChangeReviewer entity data model. */
class ChangeReviewer
{
    public ?array $add = null;
    public string $email;
    public mixed $name;
    public ?array $remove = null;
    public array $removed_reviewers;
    public array $requested_reviewers;
    public array $reviewers;
}

/** Request payload for ChangeReviewer#list. */
class ChangeReviewerListMatch
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for ChangeReviewer#update. */
class ChangeReviewerUpdateData
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
    public ?array $add = null;
    public ?array $remove = null;
}

/** ChangeTranscript entity data model. */
class ChangeTranscript
{
    public string $capture_kind;
    public string $captured_at;
    public array $harness;
    public string $id;
    public mixed $original_resume = null;
    public string $patchset_commit_id;
    public int $patchset_number;
    public int $redaction_count;
    public mixed $session_id = null;
    public mixed $session_title = null;
    public string $status;
    public bool $superseded;
    public array $user;
}

/** Request payload for ChangeTranscript#list. */
class ChangeTranscriptListMatch
{
    public string $change_id;
    public string $organization_id;
    public string $repo_id;
}

/** ChangeTranscriptSummary entity data model. */
class ChangeTranscriptSummary
{
    public array $summaries;
}

/** Request payload for ChangeTranscriptSummary#list. */
class ChangeTranscriptSummaryListMatch
{
    public string $organization_id;
    public string $ids;
}

/** CheckpointPrepareChunk entity data model. */
class CheckpointPrepareChunk
{
}

/** Request payload for CheckpointPrepareChunk#create. */
class CheckpointPrepareChunkCreateData
{
    public string $agent_session_id;
    public string $organization_id;
    public string $repo_id;
}

/** CiNode entity data model. */
class CiNode
{
    public mixed $architecture;
    public bool $bazel_enabled;
    public mixed $bazel_properties_json;
    public string $ci_runner_pool_id;
    public mixed $cordoned_at;
    public mixed $cordoned_at_label;
    public string $created_at;
    public mixed $created_at_label;
    public string $health_state;
    public mixed $heartbeat_age_seconds;
    public string $id;
    public string $kind;
    public mixed $labels_csv;
    public mixed $last_seen_at;
    public mixed $last_seen_at_label;
    public string $name;
    public mixed $network_peer_id;
    public mixed $node_capabilities_csv;
    public mixed $node_certificate_expires_at;
    public mixed $node_certificate_expires_at_label;
    public mixed $node_certificate_fingerprint_sha256;
    public mixed $node_certificate_serial;
    public mixed $offline_at;
    public mixed $offline_at_label;
    public mixed $online_at;
    public mixed $online_at_label;
    public string $organization_id;
    public mixed $os;
    public mixed $revoked_at;
    public mixed $revoked_at_label;
    public bool $schedulable;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
    public mixed $version;
}

/** Request payload for CiNode#load. */
class CiNodeLoadMatch
{
    public string $id;
}

/** Request payload for CiNode#create. */
class CiNodeCreateData
{
}

/** CiPipeline entity data model. */
class CiPipeline
{
    public mixed $ci_runner_pool_id;
    public mixed $concurrency_key;
    public string $created_at;
    public mixed $default_branch;
    public mixed $description;
    public mixed $hosted_app_id;
    public string $id;
    public string $name;
    public string $organization_id;
    public mixed $repository_id;
    public mixed $required_capabilities_csv;
    public mixed $runner_pool;
    public array $runs;
    public string $slug;
    public string $source_kind;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
    public bool $trigger_on_pull_request;
    public bool $trigger_on_push;
    public bool $trigger_on_schedule;
    public string $updated_at;
    public mixed $workflow_path;
}

/** Request payload for CiPipeline#load. */
class CiPipelineLoadMatch
{
    public string $id;
}

/** Request payload for CiPipeline#list. */
class CiPipelineListMatch
{
    public mixed $ci_runner_pool_id = null;
    public mixed $concurrency_key = null;
    public ?string $created_at = null;
    public mixed $default_branch = null;
    public mixed $description = null;
    public mixed $hosted_app_id = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $organization_id = null;
    public mixed $repository_id = null;
    public mixed $required_capabilities_csv = null;
    public mixed $runner_pool = null;
    public ?array $runs = null;
    public ?string $slug = null;
    public ?string $source_kind = null;
    public ?string $status = null;
    public ?string $status_label = null;
    public ?string $status_state = null;
    public ?string $status_tone = null;
    public ?bool $trigger_on_pull_request = null;
    public ?bool $trigger_on_push = null;
    public ?bool $trigger_on_schedule = null;
    public ?string $updated_at = null;
    public mixed $workflow_path = null;
}

/** Request payload for CiPipeline#create. */
class CiPipelineCreateData
{
}

/** CiPipelineRun entity data model. */
class CiPipelineRun
{
    public bool $active;
    public mixed $canceled_at;
    public string $ci_pipeline_id;
    public mixed $ci_runner_pool_id;
    public mixed $commit_sha;
    public mixed $concurrency_key;
    public string $created_at;
    public mixed $creator_user_id;
    public int $display_id;
    public bool $failed;
    public mixed $finished_at;
    public mixed $hosted_app_id;
    public string $id;
    public array $jobs;
    public mixed $message;
    public int $number;
    public string $organization_id;
    public mixed $parameters_json;
    public mixed $queued_at;
    public mixed $ref_name;
    public mixed $repository_id;
    public mixed $required_capabilities_csv;
    public int $retry_number;
    public bool $retryable;
    public string $slug;
    public mixed $source_url;
    public mixed $started_at;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
    public string $trigger_kind;
    public string $updated_at;
}

/** Request payload for CiPipelineRun#load. */
class CiPipelineRunLoadMatch
{
    public string $id;
    public string $pipeline_id;
}

/** Request payload for CiPipelineRun#list. */
class CiPipelineRunListMatch
{
    public string $pipeline_id;
}

/** Request payload for CiPipelineRun#create. */
class CiPipelineRunCreateData
{
    public string $pipeline_id;
}

/** CiRunnerPool entity data model. */
class CiRunnerPool
{
    public bool $bazel_enabled;
    public mixed $bazel_properties_json;
    public string $created_at;
    public mixed $description;
    public mixed $elastic_config_json;
    public mixed $elastic_provider_kind;
    public string $id;
    public string $isolation_mode;
    public mixed $labels_csv;
    public int $max_concurrency;
    public array $modal_capacity;
    public array $modal_runner_invocations;
    public string $name;
    public mixed $network_space_id;
    public mixed $node_capabilities_csv;
    public string $organization_id;
    public string $runner_count_label;
    public string $runner_kind;
    public array $runners;
    public string $slug;
    public string $status;
    public string $updated_at;
}

/** Request payload for CiRunnerPool#load. */
class CiRunnerPoolLoadMatch
{
    public string $id;
}

/** Request payload for CiRunnerPool#list. */
class CiRunnerPoolListMatch
{
    public ?string $organization_id = null;
}

/** Request payload for CiRunnerPool#create. */
class CiRunnerPoolCreateData
{
}

/** Request payload for CiRunnerPool#update. */
class CiRunnerPoolUpdateData
{
    public string $id;
}

/** Request payload for CiRunnerPool#patch. */
class CiRunnerPoolPatchData
{
    public string $id;
    public mixed $description = null;
    public mixed $elastic_config_json = null;
    public mixed $elastic_provider_kind = null;
    public ?string $isolation_mode = null;
    public mixed $labels_csv = null;
    public ?int $max_concurrency = null;
    public mixed $node_capabilities_csv = null;
    public ?string $runner_kind = null;
    public ?string $status = null;
}

/** CiStatus entity data model. */
class CiStatus
{
}

/** Request payload for CiStatus#load. */
class CiStatusLoadMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $ref = null;
}

/** CliEvent entity data model. */
class CliEvent
{
    public string $event;
    public array $properties;
}

/** Request payload for CliEvent#create. */
class CliEventCreateData
{
    public string $event;
    public array $properties;
}

/** CliRelease entity data model. */
class CliRelease
{
}

/** Request payload for CliRelease#load. */
class CliReleaseLoadMatch
{
}

/** Request payload for CliRelease#list. */
class CliReleaseListMatch
{
}

/** Request payload for CliRelease#create. */
class CliReleaseCreateData
{
}

/** CloudWorkspaceBackupObject entity data model. */
class CloudWorkspaceBackupObject
{
    public ?string $id = null;
}

/** Request payload for CloudWorkspaceBackupObject#load. */
class CloudWorkspaceBackupObjectLoadMatch
{
    public string $cloud_workspace_backup_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** CodeRuleEvaluation entity data model. */
class CodeRuleEvaluation
{
    public bool $advisory;
    public array $coverage;
    public string $diff;
    public int $duration_ms;
    public ?string $evaluator_version = null;
    public mixed $input_digest = null;
    public ?array $limits = null;
    public ?string $model = null;
    public array $requests;
    public int $schema_version;
    public mixed $snapshot_digest = null;
    public array $unchecked;
    public array $verdicts;
}

/** Request payload for CodeRuleEvaluation#create. */
class CodeRuleEvaluationCreateData
{
    public string $organization_id;
    public string $repo_id;
    public string $diff;
}

/** ComSiteAccess entity data model. */
class ComSiteAccess
{
}

/** Request payload for ComSiteAccess#load. */
class ComSiteAccessLoadMatch
{
    public string $host;
    public ?string $return_to = null;
}

/** Request payload for ComSiteAccess#create. */
class ComSiteAccessCreateData
{
    public mixed $host = null;
    public mixed $token = null;
}

/** ComSiteAccessSession entity data model. */
class ComSiteAccessSession
{
    public string $cookie_name;
    public string $host;
    public int $max_age;
    public string $session_token;
}

/** Request payload for ComSiteAccessSession#create. */
class ComSiteAccessSessionCreateData
{
    public string $host;
}

/** CommentThreadComment entity data model. */
class CommentThreadComment
{
    public string $body;
}

/** Request payload for CommentThreadComment#create. */
class CommentThreadCommentCreateData
{
    public string $artefact_id;
    public string $comment_thread_id;
    public string $organization_id;
    public string $body;
}

/** CommitDiff entity data model. */
class CommitDiff
{
    public array $files;
    public ?string $id = null;
    public mixed $parent_id;
}

/** Request payload for CommitDiff#load. */
class CommitDiffLoadMatch
{
    public string $commit_id;
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?string $parent = null;
}

/** ConnectionRequest entity data model. */
class ConnectionRequest
{
    public string $agent_card_url;
    public string $auth_scheme;
    public bool $can_configure;
    public bool $can_disconnect;
    public bool $can_setup;
    public mixed $error_code;
    public int $generation;
    public string $id;
    public string $name;
    public mixed $remote_agent;
    public mixed $retired_at;
    public mixed $revoked_at;
    public mixed $source_operation_id;
    public string $state;
}

/** Request payload for ConnectionRequest#load. */
class ConnectionRequestLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** ConnectionSource entity data model. */
class ConnectionSource
{
    public string $device_id;
    public string $device_name;
    public string $provider;
    public string $source_operation_id;
    public string $title;
}

/** Request payload for ConnectionSource#list. */
class ConnectionSourceListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** ContactSubmission entity data model. */
class ContactSubmission
{
    public mixed $company = null;
    public string $email;
    public string $message;
    public string $name;
    public mixed $website = null;
}

/** Request payload for ContactSubmission#create. */
class ContactSubmissionCreateData
{
    public mixed $company = null;
    public string $email;
    public string $message;
    public string $name;
    public mixed $website = null;
}

/** ControlComputer entity data model. */
class ControlComputer
{
    public array $connection;
    public array $consent;
    public array $device;
    public ?string $id = null;
    public ?array $provider_status = null;
}

/** Request payload for ControlComputer#list. */
class ControlComputerListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?bool $observe_connection = null;
    public string $persistent_agent_id;
}

/** Request payload for ControlComputer#update. */
class ControlComputerUpdateData
{
    public string $id;
    public string $organization_id;
    public mixed $enabled = null;
    public mixed $expected_revision = null;
    public mixed $persistent_agent_id = null;
    public mixed $providers = null;
}

/** ControlComputerControlOperation entity data model. */
class ControlComputerControlOperation
{
    public string $action;
    public array $arguments;
    public string $created_at;
    public array $delivery;
    public string $device_id;
    public ?string $diagnostic_code = null;
    public array $end;
    public string $expires_at;
    public string $id;
    public string $key;
    public string $provider;
    public array $references;
    public mixed $result;
    public bool $result_expired;
    public string $state;
}

/** Request payload for ControlComputerControlOperation#load. */
class ControlComputerControlOperationLoadMatch
{
    public string $control_computer_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for ControlComputerControlOperation#create. */
class ControlComputerControlOperationCreateData
{
    public string $control_computer_id;
    public string $organization_id;
    public string $action;
    public array $arguments;
    public string $key;
}

/** CoordinationWait entity data model. */
class CoordinationWait
{
    public bool $can_stop;
    public string $expires_at;
    public string $id;
    public string $status;
    public mixed $stop_state;
    public mixed $wake_outcome;
}

/** Request payload for CoordinationWait#list. */
class CoordinationWaitListMatch
{
    public string $agent_id;
    public string $coordination_id;
    public string $organization_id;
    public ?string $cursor = null;
}

/** CredentialSignInCheck entity data model. */
class CredentialSignInCheck
{
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public bool $paywalled;
    public array $permissions;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for CredentialSignInCheck#create. */
class CredentialSignInCheckCreateData
{
    public string $credential_id;
    public string $organization_id;
    public string $project_id;
    public string $environment_id;
}

/** DataResourceRotateCredential entity data model. */
class DataResourceRotateCredential
{
    public mixed $app_environment_id;
    public string $created_at;
    public string $engine;
    public mixed $failure_message;
    public bool $high_availability;
    public string $hosted_app_id;
    public string $id;
    public string $kind;
    public string $name;
    public mixed $plan;
    public array $provider_metadata;
    public mixed $region;
    public string $slug;
    public string $status;
    public mixed $storage_gb;
    public mixed $storage_label;
    public string $updated_at;
    public mixed $version;
}

/** Request payload for DataResourceRotateCredential#create. */
class DataResourceRotateCredentialCreateData
{
    public string $app_id;
    public string $data_resource_id;
}

/** DeepScan entity data model. */
class DeepScan
{
    public mixed $account_id = null;
    public array $active;
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorations;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public ?string $idempotency_key = null;
    public array $launch_options;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public array $pagination;
    public bool $paywalled;
    public array $permissions;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for DeepScan#load. */
class DeepScanLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $agent_id = null;
    public ?string $evidence = null;
    public ?string $finding_id = null;
    public ?string $project_id = null;
}

/** Request payload for DeepScan#list. */
class DeepScanListMatch
{
    public string $organization_id;
    public ?string $finding = null;
    public ?int $page = null;
    public ?string $project_id = null;
    public ?string $query = null;
    public ?string $status = null;
}

/** Request payload for DeepScan#create. */
class DeepScanCreateData
{
    public string $organization_id;
    public ?string $project_id = null;
    public mixed $account_id = null;
    public ?int $concurrency = null;
    public string $environment_id;
    public string $goal;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public ?int $max_testers = null;
}

/** DeepScanFinding entity data model. */
class DeepScanFinding
{
    public int $finding_count;
    public array $finding_ids;
    public array $findings;
    public mixed $findings_fix_prompt;
    public bool $free_findings_pending;
    public string $id;
    public string $mode;
    public array $permissions;
    public mixed $priority;
    public array $priority_counts;
    public mixed $project_id;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $reruns_available;
    public string $status;
    public string $title;
    public array $unlock;
    public string $web_url;
}

/** Request payload for DeepScanFinding#list. */
class DeepScanFindingListMatch
{
    public string $deep_scan_id;
    public string $organization_id;
    public ?string $priority = null;
    public ?string $project_id = null;
}

/** DeepScanFlow entity data model. */
class DeepScanFlow
{
    public mixed $account_id = null;
    public ?int $concurrency = null;
    public ?string $environment_id = null;
    public ?string $exploration_id = null;
    public array $flow_names;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public ?int $max_testers = null;
    public mixed $note = null;
}

/** Request payload for DeepScanFlow#create. */
class DeepScanFlowCreateData
{
    public string $organization_id;
    public ?string $project_id = null;
    public mixed $account_id = null;
    public ?int $concurrency = null;
    public ?string $environment_id = null;
    public ?string $exploration_id = null;
    public array $flow_names;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public ?int $max_testers = null;
    public mixed $note = null;
}

/** DeepScanMappedFlow entity data model. */
class DeepScanMappedFlow
{
    public mixed $account_id;
    public string $environment_id;
    public mixed $flow_map;
    public mixed $revision_id;
}

/** Request payload for DeepScanMappedFlow#list. */
class DeepScanMappedFlowListMatch
{
    public string $organization_id;
    public ?string $account_id = null;
    public string $environment_id;
    public ?string $project_id = null;
}

/** DeepScanOption entity data model. */
class DeepScanOption
{
    public array $accounts;
    public mixed $deep_scan_defaults = null;
    public mixed $flow_map;
    public string $id;
    public string $name;
    public ?array $personas = null;
    public ?bool $preview = null;
    public mixed $target_url;
}

/** Request payload for DeepScanOption#list. */
class DeepScanOptionListMatch
{
    public string $organization_id;
    public ?string $environment_query = null;
    public ?string $project_id = null;
}

/** DemoShare entity data model. */
class DemoShare
{
    public string $head_sha;
    public ?string $id = null;
    public array $recording;
    public string $summary;
}

/** Request payload for DemoShare#load. */
class DemoShareLoadMatch
{
    public string $id;
}

/** DemoShareSegment entity data model. */
class DemoShareSegment
{
    public ?string $id = null;
}

/** Request payload for DemoShareSegment#load. */
class DemoShareSegmentLoadMatch
{
    public string $demo_share_id;
    public string $id;
}

/** Deployment entity data model. */
class Deployment
{
    public array $app;
    public mixed $artifact_locator;
    public mixed $build_duration_seconds;
    public mixed $build_source;
    public string $build_status;
    public array $children;
    public mixed $ci_pipeline_id;
    public mixed $ci_pipeline_run_id;
    public mixed $commit_sha;
    public string $created_at;
    public mixed $creator;
    public mixed $deployed_url;
    public mixed $duration_seconds;
    public array $environment;
    public string $history_kind;
    public mixed $history_reason;
    public string $id;
    public bool $is_live;
    public bool $is_rollback;
    public int $live_region_count;
    public int $number;
    public mixed $placement;
    public int $region_count;
    public int $replicas_per_region;
    public mixed $rollback_reason;
    public mixed $rollback_source_release_id;
    public mixed $rollback_target_release_id;
    public mixed $rollout_predecessor_id;
    public string $rollout_status;
    public string $rollout_strategy;
    public array $service;
    public mixed $source_ref;
    public string $status;
    public int $total_replicas;
    public string $trigger_kind;
    public string $updated_at;
}

/** Request payload for Deployment#load. */
class DeploymentLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** DeploymentDashboardNomad entity data model. */
class DeploymentDashboardNomad
{
}

/** Request payload for DeploymentDashboardNomad#load. */
class DeploymentDashboardNomadLoadMatch
{
    public string $app_id;
    public ?string $environment = null;
    public ?string $location = null;
    public ?string $service = null;
}

/** DeploymentDetail entity data model. */
class DeploymentDetail
{
    public array $activity;
    public mixed $app;
    public mixed $app_id;
    public array $audit_events;
    public array $capacity;
    public array $data_resources;
    public array $deploy_targets;
    public array $deployments;
    public array $desired_states;
    public array $environments;
    public array $filters;
    public array $health;
    public array $nomad;
    public array $operations;
    public array $placements;
    public array $reconciler_ticks;
    public array $releases;
    public array $runtime_instances;
    public array $service_bindings;
    public array $service_views;
    public array $storage_resources;
}

/** Request payload for DeploymentDetail#list. */
class DeploymentDetailListMatch
{
    public string $organization_id;
    public ?string $app = null;
    public ?string $environment = null;
    public ?string $service = null;
}

/** DeploymentFile entity data model. */
class DeploymentFile
{
}

/** Request payload for DeploymentFile#update. */
class DeploymentFileUpdateData
{
    public string $deployment_id;
    public string $static_site_id;
}

/** DeploymentLog entity data model. */
class DeploymentLog
{
    public string $allocation_id;
    public mixed $app_environment_id;
    public mixed $app_release_id;
    public mixed $app_service_id;
    public mixed $details;
    public string $environment_name;
    public mixed $release_version;
    public string $service_name;
    public string $status;
    public mixed $task;
    public mixed $unreachable_reason;
}

/** Request payload for DeploymentLog#list. */
class DeploymentLogListMatch
{
    public string $organization_id;
    public ?string $app = null;
    public ?string $environment = null;
    public ?int $limit = null;
    public ?string $log_location = null;
    public ?string $log_service = null;
    public ?string $service = null;
}

/** DeploymentMetric entity data model. */
class DeploymentMetric
{
    public bool $auto_deploy;
    public string $environment_id;
    public string $environment_name;
    public string $placement_id;
    public bool $redeploy;
    public int $region_count;
    public int $replicas_per_region;
    public string $rollout_strategy;
    public string $service_id;
    public string $service_name;
    public mixed $source_ref;
}

/** Request payload for DeploymentMetric#list. */
class DeploymentMetricListMatch
{
    public string $organization_id;
    public ?string $app = null;
    public ?string $environment = null;
    public ?string $metrics_range = null;
    public ?string $service = null;
}

/** DeploymentPreview entity data model. */
class DeploymentPreview
{
    public string $access;
    public string $app_environment_id;
    public string $app_name;
    public string $app_preview_profile_id;
    public string $app_slug;
    public mixed $change_number;
    public ?string $created_at = null;
    public ?string $created_by_user_id = null;
    public string $expires_at;
    public int $generation;
    public string $health;
    public string $hosted_app_id;
    public string $id;
    public mixed $latest_operation_status;
    public string $name;
    public mixed $owner_name;
    public string $profile_name;
    public ?array $resource_overrides = null;
    public bool $retained;
    public string $slug;
    public int $snapshot_version;
    public string $source_revision;
    public string $status;
    public ?string $updated_at = null;
    public array $urls;
    public mixed $vcs_change_id = null;
}

/** Request payload for DeploymentPreview#list. */
class DeploymentPreviewListMatch
{
    public string $organization_id;
    public ?string $app = null;
    public ?string $change = null;
    public ?string $expiry = null;
    public ?string $health = null;
    public ?string $owner = null;
    public ?int $page = null;
}

/** DeploymentSetting entity data model. */
class DeploymentSetting
{
    public string $code;
    public string $created_at;
    public string $id;
    public string $name;
    public string $nomad_datacenter;
    public string $updated_at;
}

/** Request payload for DeploymentSetting#list. */
class DeploymentSettingListMatch
{
    public string $organization_id;
    public ?string $app = null;
    public ?string $environment = null;
    public ?string $service = null;
}

/** DesktopLocalAgentModel entity data model. */
class DesktopLocalAgentModel
{
    public string $id;
    public string $name;
}

/** Request payload for DesktopLocalAgentModel#list. */
class DesktopLocalAgentModelListMatch
{
    public string $organization_id;
}

/** DesktopLocalAgentResponse entity data model. */
class DesktopLocalAgentResponse
{
    public array $input;
    public ?int $max_output_tokens = null;
    public string $model;
    public bool $store;
    public bool $stream;
}

/** Request payload for DesktopLocalAgentResponse#create. */
class DesktopLocalAgentResponseCreateData
{
    public string $organization_id;
    public array $input;
    public ?int $max_output_tokens = null;
    public string $model;
    public bool $store;
    public bool $stream;
}

/** Device entity data model. */
class Device
{
    public string $architecture;
    public string $channel;
    public mixed $coding_connection;
    public mixed $connection_checked_at;
    public string $connection_status;
    public array $control_delivery_policy;
    public array $control_spawn_policy;
    public string $created_at;
    public array $device;
    public string $environment;
    public bool $execution_available;
    public string $id;
    public string $name;
    public string $native_device_id;
    public string $paired_at;
    public int $pairing_generation;
    public string $platform;
    public array $project_visibility;
    public ?array $provider_status = null;
    public mixed $revoked_at;
    public ?bool $scheduled_check_ins = null;
    public string $user_browser_access;
}

/** Request payload for Device#load. */
class DeviceLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Device#list. */
class DeviceListMatch
{
    public string $organization_id;
    public ?string $cursor = null;
    public ?bool $include_revoked = null;
}

/** Request payload for Device#create. */
class DeviceCreateData
{
    public string $id;
    public string $organization_id;
    public string $architecture;
    public string $channel;
    public string $name;
    public int $pairing_generation;
    public string $platform;
    public mixed $access = null;
    public mixed $folders = null;
    public mixed $max_agents = null;
    public mixed $mode = null;
    public mixed $public_key = null;
    public mixed $repositories = null;
    public mixed $restricted = null;
    public mixed $transport = null;
    public mixed $version = null;
}

/** DeviceBrowserOperation entity data model. */
class DeviceBrowserOperation
{
    public string $command;
    public string $created_at;
    public string $id;
}

/** Request payload for DeviceBrowserOperation#list. */
class DeviceBrowserOperationListMatch
{
    public string $device_id;
    public string $organization_id;
}

/** Request payload for DeviceBrowserOperation#create. */
class DeviceBrowserOperationCreateData
{
    public string $device_id;
    public string $id;
    public string $organization_id;
    public mixed $claim_token = null;
    public mixed $response = null;
}

/** DeviceControlMessage entity data model. */
class DeviceControlMessage
{
    public string $agent_id;
    public string $agent_name;
    public string $expires_at;
    public string $id;
    public mixed $sender;
    public mixed $text;
    public bool $text_omitted;
    public array $thread;
}

/** Request payload for DeviceControlMessage#list. */
class DeviceControlMessageListMatch
{
    public string $device_id;
    public string $organization_id;
    public ?string $cursor = null;
}

/** DeviceControlOperation entity data model. */
class DeviceControlOperation
{
    public string $action;
    public array $arguments;
    public string $created_at;
    public array $delivery;
    public string $device_id;
    public ?string $diagnostic_code = null;
    public array $end;
    public string $expires_at;
    public string $id;
    public string $key;
    public string $provider;
    public array $references;
    public mixed $result;
    public bool $result_expired;
    public string $state;
}

/** Request payload for DeviceControlOperation#load. */
class DeviceControlOperationLoadMatch
{
    public string $device_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for DeviceControlOperation#create. */
class DeviceControlOperationCreateData
{
    public string $device_id;
    public string $organization_id;
    public string $action;
    public array $arguments;
    public string $key;
}

/** DeviceEnterpriseRelay entity data model. */
class DeviceEnterpriseRelay
{
}

/** Request payload for DeviceEnterpriseRelay#list. */
class DeviceEnterpriseRelayListMatch
{
}

/** DeviceFolderListing entity data model. */
class DeviceFolderListing
{
    public ?string $code = null;
    public ?string $error = null;
    public ?array $folders = null;
    public string $id;
    public string $key;
    public mixed $parent = null;
    public ?string $path = null;
    public string $state;
    public ?bool $truncated = null;
}

/** Request payload for DeviceFolderListing#load. */
class DeviceFolderListingLoadMatch
{
    public string $device_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for DeviceFolderListing#create. */
class DeviceFolderListingCreateData
{
    public string $device_id;
    public string $organization_id;
    public string $key;
    public string $path;
}

/** DeviceGrant entity data model. */
class DeviceGrant
{
    public array $active_grants;
    public array $agent_choices;
    public string $agent_id;
    public bool $all_agents_access;
    public array $capabilities;
    public bool $execution_available;
    public array $grants;
    public ?string $id = null;
    public mixed $next_cursor;
    public string $principal_id;
}

/** Request payload for DeviceGrant#list. */
class DeviceGrantListMatch
{
    public string $device_id;
    public string $organization_id;
    public ?string $cursor = null;
}

/** Request payload for DeviceGrant#create. */
class DeviceGrantCreateData
{
    public string $device_id;
    public string $organization_id;
    public string $agent_id;
    public array $capabilities;
    public string $principal_id;
}

/** DeviceInvocation entity data model. */
class DeviceInvocation
{
}

/** Request payload for DeviceInvocation#create. */
class DeviceInvocationCreateData
{
    public string $device_id;
    public string $organization_id;
    public mixed $challenge = null;
    public mixed $invocation_id = null;
    public mixed $request_hash = null;
    public mixed $signature = null;
}

/** DeviceLocalEvent entity data model. */
class DeviceLocalEvent
{
    public string $event;
    public bool $recorded;
}

/** Request payload for DeviceLocalEvent#create. */
class DeviceLocalEventCreateData
{
    public string $device_id;
    public string $organization_id;
    public string $event;
}

/** DevicePairing entity data model. */
class DevicePairing
{
    public string $architecture;
    public string $channel;
    public ?string $id = null;
    public string $name;
    public string $platform;
    public string $public_key;
}

/** Request payload for DevicePairing#create. */
class DevicePairingCreateData
{
    public string $organization_id;
    public string $architecture;
    public string $channel;
    public string $name;
    public string $platform;
    public string $public_key;
}

/** DeviceProject entity data model. */
class DeviceProject
{
    public ?string $id = null;
}

/** Request payload for DeviceProject#remove. */
class DeviceProjectRemoveMatch
{
    public string $device_id;
    public string $id;
    public string $organization_id;
}

/** DeviceScheduledCheckIn entity data model. */
class DeviceScheduledCheckIn
{
    public bool $enabled;
}

/** Request payload for DeviceScheduledCheckIn#create. */
class DeviceScheduledCheckInCreateData
{
    public string $device_id;
    public string $organization_id;
    public bool $enabled;
}

/** DockerBuilder entity data model. */
class DockerBuilder
{
    public string $backend;
    public mixed $created_at;
    public mixed $gateway_url = null;
    public int $generation;
    public string $id;
    public mixed $last_activity_at;
    public string $organization_id;
    public mixed $ready_at;
    public mixed $slept_at;
    public string $slug;
    public int $startup_attempt;
    public mixed $startup_failure;
    public mixed $startup_stage;
    public string $status;
    public mixed $updated_at;
}

/** Request payload for DockerBuilder#load. */
class DockerBuilderLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for DockerBuilder#list. */
class DockerBuilderListMatch
{
    public string $organization_id;
    public ?string $slug = null;
}

/** Request payload for DockerBuilder#create. */
class DockerBuilderCreateData
{
    public string $organization_id;
    public ?string $backend = null;
    public ?string $slug = null;
}

/** Request payload for DockerBuilder#update. */
class DockerBuilderUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for DockerBuilder#patch. */
class DockerBuilderPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $slug = null;
}

/** DockerBuilderSession entity data model. */
class DockerBuilderSession
{
    public string $created_at;
    public string $docker_builder_id;
    public string $expires_at;
    public mixed $gateway_url = null;
    public int $generation;
    public string $id;
    public string $organization_id;
    public mixed $revoked_at;
    public string $user_id;
}

/** Request payload for DockerBuilderSession#load. */
class DockerBuilderSessionLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for DockerBuilderSession#create. */
class DockerBuilderSessionCreateData
{
    public string $docker_builder_id;
    public string $organization_id;
}

/** Request payload for DockerBuilderSession#remove. */
class DockerBuilderSessionRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** DockerBuilderSetting entity data model. */
class DockerBuilderSetting
{
    public array $docker_builder_settings;
    public int $idle_timeout_seconds;
    public int $max_concurrency;
    public string $organization_id;
    public string $region;
    public int $runtime_timeout_seconds;
}

/** Request payload for DockerBuilderSetting#list. */
class DockerBuilderSettingListMatch
{
    public string $organization_id;
}

/** Request payload for DockerBuilderSetting#update. */
class DockerBuilderSettingUpdateData
{
    public string $organization_id;
}

/** Request payload for DockerBuilderSetting#patch. */
class DockerBuilderSettingPatchData
{
    public string $organization_id;
    public ?int $idle_timeout_seconds = null;
    public ?int $max_concurrency = null;
    public ?string $region = null;
    public ?int $runtime_timeout_seconds = null;
}

/** DomainDnsIntegration entity data model. */
class DomainDnsIntegration
{
    public mixed $account_label;
    public string $api_token;
    public string $created_at;
    public mixed $failure_message;
    public bool $has_token;
    public string $id;
    public mixed $last_verified_at;
    public string $organization_id;
    public string $provider;
    public string $status;
    public string $updated_at;
}

/** Request payload for DomainDnsIntegration#list. */
class DomainDnsIntegrationListMatch
{
    public string $organization_id;
}

/** Request payload for DomainDnsIntegration#create. */
class DomainDnsIntegrationCreateData
{
    public string $organization_id;
    public mixed $account_label = null;
    public string $api_token;
}

/** DomainPathRule entity data model. */
class DomainPathRule
{
    public string $action_kind;
    public mixed $app_service_endpoint_id;
    public mixed $app_service_id;
    public mixed $backend_ref;
    public string $created_at;
    public string $id;
    public mixed $last_error;
    public string $path_prefix;
    public string $status;
    public string $updated_at;
}

/** Request payload for DomainPathRule#load. */
class DomainPathRuleLoadMatch
{
    public string $app_id;
    public string $domain_id;
    public string $id;
}

/** Request payload for DomainPathRule#list. */
class DomainPathRuleListMatch
{
    public string $app_id;
    public string $domain_id;
}

/** Request payload for DomainPathRule#create. */
class DomainPathRuleCreateData
{
    public string $app_id;
    public string $domain_id;
    public mixed $app_service_endpoint_id = null;
    public mixed $app_service_id;
    public string $path_prefix;
}

/** Request payload for DomainPathRule#update. */
class DomainPathRuleUpdateData
{
    public string $app_id;
    public string $domain_id;
    public string $id;
    public mixed $app_service_endpoint_id = null;
    public mixed $app_service_id = null;
    public ?string $path_prefix = null;
}

/** Request payload for DomainPathRule#patch. */
class DomainPathRulePatchData
{
    public string $app_id;
    public string $domain_id;
    public string $id;
    public mixed $app_service_endpoint_id = null;
    public mixed $app_service_id = null;
    public ?string $path_prefix = null;
}

/** Request payload for DomainPathRule#remove. */
class DomainPathRuleRemoveMatch
{
    public string $app_id;
    public string $domain_id;
    public string $id;
}

/** Dream entity data model. */
class Dream
{
    public bool $attention;
    public array $changes;
    public mixed $completed_at;
    public array $counts;
    public mixed $dream;
    public mixed $error_code;
    public string $id;
    public array $pagination;
    public array $permissions;
    public string $phase;
    public mixed $reason;
    public int $reviewed;
    public string $reviewed_date;
    public array $runs;
    public string $scope_name;
    public int $skipped;
    public string $tab;
    public string $timezone;
}

/** Request payload for Dream#load. */
class DreamLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $page = null;
    public string $project_id;
    public ?string $tab = null;
}

/** Request payload for Dream#list. */
class DreamListMatch
{
    public string $organization_id;
    public ?int $page = null;
    public string $project_id;
}

/** Request payload for Dream#create. */
class DreamCreateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public bool $attention;
    public array $changes;
    public mixed $completed_at;
    public array $counts;
    public mixed $dream;
    public mixed $error_code;
    public array $pagination;
    public array $permissions;
    public string $phase;
    public mixed $reason;
    public int $reviewed;
    public string $reviewed_date;
    public array $runs;
    public string $scope_name;
    public int $skipped;
    public string $tab;
    public string $timezone;
}

/** Edge entity data model. */
class Edge
{
}

/** Request payload for Edge#load. */
class EdgeLoadMatch
{
}

/** EmailVerification entity data model. */
class EmailVerification
{
}

/** Request payload for EmailVerification#create. */
class EmailVerificationCreateData
{
    public mixed $email = null;
}

/** Environment entity data model. */
class Environment
{
    public mixed $active_revision_id;
    public bool $agent_sign_up_available;
    public string $allowed_actions;
    public array $billing;
    public array $cleanup;
    public string $connection;
    public string $created_at;
    public ?array $default_policy = null;
    public array $default_policy_json;
    public array $discovery_defaults;
    public array $environment;
    public ?array $exploration_accounts = null;
    public ?array $explorations = null;
    public mixed $first_run = null;
    public mixed $hosted_app_id;
    public string $id;
    public mixed $imessage_number;
    public bool $included_deep_scan;
    public int $lock_version;
    public bool $managed_google_available;
    public string $managed_google_email;
    public mixed $messaging_tester_number = null;
    public string $name;
    public array $network_connections;
    public mixed $onboarding_discovery = null;
    public string $organization_id;
    public ?array $pending_accounts = null;
    public array $permissions;
    public mixed $project_id;
    public mixed $repository_id;
    public array $revisions;
    public mixed $setup_discovery_id = null;
    public bool $sign_in_check_available;
    public string $slug;
    public string $status;
    public mixed $target_kind;
    public mixed $target_url;
    public array $test_accounts;
    public string $updated_at;
    public mixed $verify_network_connection_id;
    public ?int $version = null;
}

/** Request payload for Environment#load. */
class EnvironmentLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $project_id = null;
}

/** Request payload for Environment#list. */
class EnvironmentListMatch
{
    public string $organization_id;
    public ?string $project_id = null;
}

/** Request payload for Environment#create. */
class EnvironmentCreateData
{
    public string $organization_id;
    public ?string $allowed_actions = null;
    public ?array $default_policy = null;
    public mixed $imessage_number = null;
    public mixed $messaging_tester_number = null;
    public ?string $name = null;
    public mixed $project_id = null;
    public mixed $repository_id = null;
    public string $slug;
    public mixed $target_kind = null;
    public mixed $target_url = null;
}

/** Request payload for Environment#update. */
class EnvironmentUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Environment#patch. */
class EnvironmentPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $allowed_actions = null;
    public mixed $imessage_number = null;
    public mixed $messaging_tester_number = null;
    public ?string $name = null;
    public mixed $target_url = null;
    public mixed $verify_network_connection_id = null;
    public ?int $version = null;
}

/** Request payload for Environment#remove. */
class EnvironmentRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** EnvironmentDiscoveryRun entity data model. */
class EnvironmentDiscoveryRun
{
    public mixed $account_id;
    public string $deadline_at;
    public string $environment_revision_id;
    public ?array $evidence = null;
    public mixed $failure_code;
    public string $id;
    public string $queued_at;
    public array $recording;
    public mixed $result;
    public string $status;
}

/** Request payload for EnvironmentDiscoveryRun#load. */
class EnvironmentDiscoveryRunLoadMatch
{
    public string $environment_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for EnvironmentDiscoveryRun#create. */
class EnvironmentDiscoveryRunCreateData
{
    public string $environment_id;
    public string $organization_id;
    public mixed $account_id = null;
}

/** EnvironmentExploration entity data model. */
class EnvironmentExploration
{
    public mixed $account_id = null;
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public ?string $idempotency_key = null;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public bool $paywalled;
    public array $permissions;
    public mixed $persona_id = null;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for EnvironmentExploration#create. */
class EnvironmentExplorationCreateData
{
    public string $environment_id;
    public string $organization_id;
    public string $project_id;
    public mixed $account_id = null;
    public ?int $concurrency = null;
    public string $goal;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public ?int $max_testers = null;
    public mixed $persona_id = null;
}

/** EnvironmentFirstRun entity data model. */
class EnvironmentFirstRun
{
}

/** Request payload for EnvironmentFirstRun#create. */
class EnvironmentFirstRunCreateData
{
    public string $environment_id;
    public string $organization_id;
}

/** EnvironmentRevision entity data model. */
class EnvironmentRevision
{
    public array $allowed_origins;
    public mixed $app_environment_id;
    public mixed $app_release_id;
    public array $blueprint;
    public array $blueprint_json;
    public string $cleanup_state;
    public string $created_at;
    public string $digest;
    public ?bool $dry_run = null;
    public mixed $expires_at;
    public string $id;
    public string $organization_id;
    public mixed $ready_at;
    public array $resolved_manifest_json;
    public array $retention_policy_json;
    public int $revision;
    public mixed $revoked_at;
    public mixed $runner_environment_revision_id;
    public array $safety_policy_json;
    public int $schema_version;
    public ?array $source_metadata = null;
    public array $source_metadata_json;
    public string $status;
    public string $updated_at;
    public array $validation_json;
    public string $verify_environment_id;
}

/** Request payload for EnvironmentRevision#load. */
class EnvironmentRevisionLoadMatch
{
    public string $environment_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for EnvironmentRevision#create. */
class EnvironmentRevisionCreateData
{
    public string $environment_id;
    public string $organization_id;
    public array $blueprint;
    public ?bool $dry_run = null;
    public ?array $source_metadata = null;
}

/** Request payload for EnvironmentRevision#update. */
class EnvironmentRevisionUpdateData
{
    public string $environment_id;
    public string $id;
    public string $organization_id;
}

/** EnvironmentSecretBinding entity data model. */
class EnvironmentSecretBinding
{
    public string $env_key;
    public ?string $id = null;
    public ?string $mode = null;
    public ?string $secret_id = null;
    public ?string $secret_version_id = null;
}

/** Request payload for EnvironmentSecretBinding#list. */
class EnvironmentSecretBindingListMatch
{
    public string $app_id;
    public string $environment_id;
}

/** Request payload for EnvironmentSecretBinding#create. */
class EnvironmentSecretBindingCreateData
{
    public string $app_id;
    public string $environment_id;
    public string $env_key;
    public ?string $mode = null;
    public ?string $secret_id = null;
    public ?string $secret_version_id = null;
}

/** Request payload for EnvironmentSecretBinding#remove. */
class EnvironmentSecretBindingRemoveMatch
{
    public string $app_id;
    public string $environment_id;
    public string $id;
}

/** EnvironmentTestAccount entity data model. */
class EnvironmentTestAccount
{
    public bool $configured;
    public array $credentials;
    public ?string $id = null;
    public string $persona;
    public string $revision_id;
    public string $role;
    public string $tenant;
}

/** Request payload for EnvironmentTestAccount#list. */
class EnvironmentTestAccountListMatch
{
    public string $environment_id;
    public string $organization_id;
}

/** Request payload for EnvironmentTestAccount#update. */
class EnvironmentTestAccountUpdateData
{
    public string $environment_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for EnvironmentTestAccount#patch. */
class EnvironmentTestAccountPatchData
{
    public string $environment_id;
    public string $id;
    public string $organization_id;
    public ?array $credentials = null;
    public ?string $revision_id = null;
}

/** Evidence entity data model. */
class Evidence
{
    public ?string $id = null;
}

/** Request payload for Evidence#load. */
class EvidenceLoadMatch
{
    public ?string $id = null;
    public string $organization_id;
    public ?string $agent_id = null;
    public ?string $cursor = null;
    public ?string $exploration_id = null;
    public ?string $kind = null;
    public ?int $limit = null;
    public ?string $repository_id = null;
    public ?string $scenario_run_id = null;
}

/** ExecutionDesiredState entity data model. */
class ExecutionDesiredState
{
    public array $desired_state;
    public ?string $id = null;
    public bool $stop_observed;
}

/** Request payload for ExecutionDesiredState#load. */
class ExecutionDesiredStateLoadMatch
{
    public string $id;
}

/** Request payload for ExecutionDesiredState#list. */
class ExecutionDesiredStateListMatch
{
    public ?array $desired_state = null;
    public ?string $id = null;
    public ?bool $stop_observed = null;
}

/** Request payload for ExecutionDesiredState#create. */
class ExecutionDesiredStateCreateData
{
}

/** Request payload for ExecutionDesiredState#update. */
class ExecutionDesiredStateUpdateData
{
    public string $id;
}

/** Request payload for ExecutionDesiredState#patch. */
class ExecutionDesiredStatePatchData
{
    public string $id;
}

/** Request payload for ExecutionDesiredState#remove. */
class ExecutionDesiredStateRemoveMatch
{
    public string $id;
}

/** ExecutionReconcilerTick entity data model. */
class ExecutionReconcilerTick
{
    public ?string $id = null;
}

/** Request payload for ExecutionReconcilerTick#load. */
class ExecutionReconcilerTickLoadMatch
{
    public string $id;
}

/** Request payload for ExecutionReconcilerTick#list. */
class ExecutionReconcilerTickListMatch
{
    public ?string $id = null;
}

/** Request payload for ExecutionReconcilerTick#create. */
class ExecutionReconcilerTickCreateData
{
}

/** ExecutionRelease entity data model. */
class ExecutionRelease
{
    public ?string $id = null;
}

/** Request payload for ExecutionRelease#load. */
class ExecutionReleaseLoadMatch
{
    public string $id;
}

/** Request payload for ExecutionRelease#list. */
class ExecutionReleaseListMatch
{
    public ?string $id = null;
}

/** Request payload for ExecutionRelease#create. */
class ExecutionReleaseCreateData
{
}

/** ExecutionRuntimeInstance entity data model. */
class ExecutionRuntimeInstance
{
    public string $adapter_kind;
    public string $app_environment_id;
    public mixed $app_release_id;
    public string $app_service_id;
    public mixed $booted_at;
    public mixed $booted_at_label;
    public string $created_at;
    public mixed $created_at_label;
    public string $hosted_app_id;
    public string $id;
    public string $instance_key;
    public mixed $last_reconciled_at;
    public mixed $last_reconciled_at_label;
    public mixed $last_seen_at;
    public mixed $last_seen_at_label;
    public mixed $location;
    public string $location_id;
    public mixed $network_peer_id;
    public mixed $nomad_allocation_id;
    public mixed $nomad_task_name;
    public string $organization_id;
    public mixed $private_ipv4;
    public mixed $private_ipv6;
    public mixed $provider_instance_id;
    public mixed $public_endpoint;
    public string $service_name;
    public string $slug;
    public string $status;
    public mixed $terminated_at;
    public mixed $terminated_at_label;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for ExecutionRuntimeInstance#load. */
class ExecutionRuntimeInstanceLoadMatch
{
    public string $id;
}

/** Request payload for ExecutionRuntimeInstance#list. */
class ExecutionRuntimeInstanceListMatch
{
    public ?string $app_environment_id = null;
    public ?string $app_service_id = null;
    public ?string $hosted_app_id = null;
    public ?int $limit = null;
    public ?int $page = null;
}

/** Request payload for ExecutionRuntimeInstance#create. */
class ExecutionRuntimeInstanceCreateData
{
}

/** Request payload for ExecutionRuntimeInstance#update. */
class ExecutionRuntimeInstanceUpdateData
{
    public string $id;
}

/** Request payload for ExecutionRuntimeInstance#patch. */
class ExecutionRuntimeInstancePatchData
{
    public string $id;
}

/** Request payload for ExecutionRuntimeInstance#remove. */
class ExecutionRuntimeInstanceRemoveMatch
{
    public string $id;
}

/** Exploration entity data model. */
class Exploration
{
    public mixed $account_id = null;
    public array $active;
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorations;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public ?string $idempotency_key = null;
    public array $launch_options;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public array $pagination;
    public bool $paywalled;
    public array $permissions;
    public mixed $persona_id = null;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for Exploration#load. */
class ExplorationLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $agent_id = null;
    public ?string $evidence = null;
    public ?string $finding_id = null;
    public ?string $project_id = null;
}

/** Request payload for Exploration#list. */
class ExplorationListMatch
{
    public string $organization_id;
    public ?bool $launch = null;
    public ?int $page = null;
    public ?string $project_id = null;
}

/** Request payload for Exploration#create. */
class ExplorationCreateData
{
    public string $organization_id;
    public ?string $project_id = null;
    public mixed $account_id = null;
    public ?int $concurrency = null;
    public string $environment_id;
    public string $goal;
    public ?string $idempotency_key = null;
    public ?int $max_seconds = null;
    public ?int $max_testers = null;
    public mixed $persona_id = null;
}

/** ExplorationMessage entity data model. */
class ExplorationMessage
{
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public bool $paywalled;
    public array $permissions;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public string $text;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for ExplorationMessage#create. */
class ExplorationMessageCreateData
{
    public string $exploration_id;
    public string $organization_id;
    public ?string $project_id = null;
    public string $text;
}

/** ExplorationReport entity data model. */
class ExplorationReport
{
}

/** Request payload for ExplorationReport#load. */
class ExplorationReportLoadMatch
{
    public string $exploration_id;
    public string $organization_id;
    public ?string $project_id = null;
}

/** Request payload for ExplorationReport#create. */
class ExplorationReportCreateData
{
    public string $exploration_id;
    public string $organization_id;
    public ?string $project_id = null;
    public mixed $source_ids = null;
}

/** ExplorationScenario entity data model. */
class ExplorationScenario
{
    public array $agent_filters;
    public array $agents;
    public ?bool $can_continue = null;
    public ?array $chat_messages = null;
    public int $concurrency;
    public array $covered_areas;
    public string $created_at;
    public string $deadline_at;
    public mixed $demo_project;
    public bool $ended_early;
    public string $environment_id;
    public string $environment_name;
    public array $explorer_activity;
    public int $finding_count;
    public array $findings;
    public mixed $findings_fix_prompt;
    public mixed $finished_at = null;
    public string $goal;
    public array $huntable_flows;
    public string $id;
    public int $max_seconds;
    public int $max_testers;
    public ?string $mode = null;
    public array $next_scan_improvements;
    public ?string $observed_at = null;
    public bool $onboarding;
    public bool $paywalled;
    public array $permissions;
    public array $priority_counts;
    public mixed $project_id = null;
    public array $related_explorations;
    public array $report;
    public mixed $reproduction_of;
    public array $reproductions;
    public bool $saves_scenarios;
    public array $scannable_flows;
    public array $scenario_generation;
    public bool $sign_in_needs_answer;
    public string $sign_in_outcome;
    public mixed $sign_in_question = null;
    public ?bool $startup_retryable = null;
    public string $status;
    public bool $time_limit_reached;
    public ?string $title = null;
    public mixed $unlock;
    public string $web_url;
}

/** Request payload for ExplorationScenario#create. */
class ExplorationScenarioCreateData
{
    public string $exploration_id;
    public string $organization_id;
    public ?string $project_id = null;
}

/** Finding entity data model. */
class Finding
{
    public string $confidence;
    public string $created_at;
    public mixed $deferred_until = null;
    public array $finding;
    public string $fingerprint;
    public string $first_seen_at;
    public string $id;
    public string $last_seen_at;
    public bool $locked;
    public int $occurrence_count;
    public string $organization_id;
    public array $permissions;
    public ?string $reason = null;
    public mixed $reported_occurrence;
    public mixed $repository_id;
    public string $safe_summary;
    public ?array $scenario_occurrences = null;
    public string $severity;
    public string $status;
    public string $title;
    public string $updated_at;
    public mixed $verification;
}

/** Request payload for Finding#load. */
class FindingLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $repository_id = null;
}

/** Request payload for Finding#list. */
class FindingListMatch
{
    public string $organization_id;
    public ?string $status = null;
}

/** Request payload for Finding#update. */
class FindingUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Finding#patch. */
class FindingPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $repository_id = null;
    public mixed $deferred_until = null;
    public ?string $reason = null;
    public ?string $status = null;
}

/** Gh entity data model. */
class Gh
{
    public array $capabilities;
    public array $content;
    public string $fetched_at;
    public ?string $id = null;
    public mixed $magic_merge;
    public mixed $pull_request;
    public array $stack;
    public array $transcript_paths;
}

/** Request payload for Gh#load. */
class GhLoadMatch
{
    public string $gh_id;
    public string $github_repo;
    public string $id;
    public string $organization_id;
    public ?string $check_id = null;
    public ?string $cursor = null;
    public ?string $job_id = null;
    public ?int $page = null;
    public ?string $run_id = null;
    public ?string $section = null;
    public ?string $thread_id = null;
}

/** GitImport entity data model. */
class GitImport
{
    public string $destination_mode;
    public mixed $error = null;
    public ?string $git_default_branch = null;
    public string $git_status;
    public string $git_url;
    public string $id;
    public string $idempotency_key;
    public ?string $name = null;
    public string $native_status;
    public string $organization;
    public mixed $repository_id = null;
    public string $root_path;
    public string $slug;
    public string $source_branch;
    public string $target_branch;
}

/** Request payload for GitImport#load. */
class GitImportLoadMatch
{
    public string $id;
}

/** Request payload for GitImport#create. */
class GitImportCreateData
{
    public string $organization_id;
    public string $destination_mode;
    public ?string $git_default_branch = null;
    public string $idempotency_key;
    public ?string $name = null;
    public string $root_path;
    public string $slug;
    public string $source_branch;
    public ?string $target_branch = null;
}

/** Github entity data model. */
class Github
{
}

/** Request payload for Github#load. */
class GithubLoadMatch
{
    public string $name;
    public string $owner;
}

/** GithubApp entity data model. */
class GithubApp
{
}

/** Request payload for GithubApp#create. */
class GithubAppCreateData
{
}

/** GithubAppImportableRepository entity data model. */
class GithubAppImportableRepository
{
    public string $account_login;
    public string $github_app_installation_id;
    public mixed $next_page;
    public array $repositories;
}

/** Request payload for GithubAppImportableRepository#list. */
class GithubAppImportableRepositoryListMatch
{
    public ?string $github_app_installation_id = null;
    public ?int $page = null;
}

/** GithubAppInstallation entity data model. */
class GithubAppInstallation
{
    public mixed $account_avatar_url;
    public mixed $account_id;
    public string $account_login;
    public string $created_at;
    public mixed $created_at_label;
    public string $id;
    public string $installation_id;
    public mixed $installed_at;
    public mixed $installed_at_label;
    public string $manage_access_url;
    public string $organization_id;
    public array $permission_entries;
    public array $permissions;
    public string $status;
    public mixed $suspended_at;
    public mixed $suspended_at_label;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for GithubAppInstallation#list. */
class GithubAppInstallationListMatch
{
    public string $organization_id;
}

/** Request payload for GithubAppInstallation#create. */
class GithubAppInstallationCreateData
{
    public string $id;
    public string $organization_id;
    public mixed $account_avatar_url;
    public mixed $account_id;
    public string $account_login;
    public string $created_at;
    public mixed $created_at_label;
    public string $installation_id;
    public mixed $installed_at;
    public mixed $installed_at_label;
    public string $manage_access_url;
    public array $permission_entries;
    public array $permissions;
    public string $status;
    public mixed $suspended_at;
    public mixed $suspended_at_label;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for GithubAppInstallation#remove. */
class GithubAppInstallationRemoveMatch
{
    public string $id;
    public string $organization_id;
    public ?bool $force = null;
    public ?bool $uninstall_on_github = null;
}

/** GithubAppInstallationAuthorization entity data model. */
class GithubAppInstallationAuthorization
{
    public string $installation_url;
    public string $organization_slug;
    public string $return_target;
}

/** Request payload for GithubAppInstallationAuthorization#create. */
class GithubAppInstallationAuthorizationCreateData
{
    public string $organization_slug;
    public string $return_target;
}

/** GithubAppUserAuthorization entity data model. */
class GithubAppUserAuthorization
{
}

/** Request payload for GithubAppUserAuthorization#create. */
class GithubAppUserAuthorizationCreateData
{
}

/** GithubCiRepository entity data model. */
class GithubCiRepository
{
    public string $adoption_mode;
    public string $check_name_prefix;
    public mixed $ci_runner_pool_id;
    public string $created_at;
    public mixed $created_at_label;
    public string $default_branch;
    public string $github_app_installation_id;
    public string $github_repository_id;
    public string $id;
    public mixed $last_compatibility_status;
    public mixed $last_error_message;
    public mixed $last_head_sha;
    public mixed $last_pull_request_number;
    public mixed $last_ref;
    public mixed $last_webhook_action;
    public mixed $last_webhook_at;
    public mixed $last_webhook_at_label;
    public mixed $last_webhook_delivery_id;
    public mixed $last_webhook_event;
    public array $metadata;
    public string $organization_id;
    public string $permission_status;
    public string $repository_full_name;
    public string $repository_name;
    public string $repository_owner;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
    public int $webhook_delivery_count;
}

/** Request payload for GithubCiRepository#load. */
class GithubCiRepositoryLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for GithubCiRepository#list. */
class GithubCiRepositoryListMatch
{
    public string $organization_id;
    public ?string $adoption_mode = null;
    public ?string $status = null;
}

/** Request payload for GithubCiRepository#create. */
class GithubCiRepositoryCreateData
{
    public string $organization_id;
    public ?string $adoption_mode = null;
    public ?string $check_name_prefix = null;
    public mixed $ci_runner_pool_id = null;
    public ?string $default_branch = null;
    public string $github_app_installation_id;
    public string $github_repository_id;
    public string $repository_name;
    public string $repository_owner;
    public ?string $status = null;
}

/** Request payload for GithubCiRepository#update. */
class GithubCiRepositoryUpdateData
{
    public string $id;
    public string $organization_id;
    public ?string $adoption_mode = null;
    public ?string $check_name_prefix = null;
    public mixed $ci_runner_pool_id = null;
    public ?string $default_branch = null;
    public ?string $permission_status = null;
    public ?string $status = null;
}

/** Request payload for GithubCiRepository#patch. */
class GithubCiRepositoryPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $adoption_mode = null;
    public ?string $check_name_prefix = null;
    public mixed $ci_runner_pool_id = null;
    public ?string $default_branch = null;
    public ?string $permission_status = null;
    public ?string $status = null;
}

/** GithubCiRepositoryCompatibilityReport entity data model. */
class GithubCiRepositoryCompatibilityReport
{
    public string $analyzed_at;
    public mixed $analyzed_at_label;
    public mixed $ci_pipeline_id;
    public mixed $ci_pipeline_run_id;
    public string $created_at;
    public mixed $created_at_label;
    public array $diagnostics;
    public array $errors;
    public mixed $event_action;
    public string $event_name;
    public bool $execution_allowed;
    public string $github_ci_repository_id;
    public mixed $head_sha;
    public string $id;
    public array $metadata;
    public string $organization_id;
    public string $parser_version;
    public mixed $pull_request_number;
    public mixed $ref_name;
    public array $referenced_actions;
    public array $required_secrets;
    public array $runner_labels;
    public mixed $source_blob_sha;
    public string $source_sha;
    public string $status;
    public array $supported_features;
    public string $updated_at;
    public mixed $updated_at_label;
    public array $warnings;
    public mixed $workflow_name;
    public string $workflow_path;
}

/** Request payload for GithubCiRepositoryCompatibilityReport#load. */
class GithubCiRepositoryCompatibilityReportLoadMatch
{
    public string $github_ci_repository_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for GithubCiRepositoryCompatibilityReport#list. */
class GithubCiRepositoryCompatibilityReportListMatch
{
    public string $github_ci_repository_id;
    public string $organization_id;
    public ?string $event_name = null;
    public ?string $source_sha = null;
    public ?string $status = null;
}

/** GithubConnection entity data model. */
class GithubConnection
{
    public array $accounts;
    public string $github_app_installation_id;
    public array $installations;
    public ?string $project_id = null;
    public ?bool $replace = null;
    public array $repositories;
}

/** Request payload for GithubConnection#list. */
class GithubConnectionListMatch
{
    public string $organization_id;
    public ?string $github_app_installation_id = null;
    public ?string $project_id = null;
}

/** Request payload for GithubConnection#create. */
class GithubConnectionCreateData
{
    public string $organization_id;
    public string $github_app_installation_id;
    public ?string $project_id = null;
    public ?bool $replace = null;
    public array $repositories;
}

/** GithubIntegration entity data model. */
class GithubIntegration
{
    public mixed $account_avatar_url;
    public string $account_login;
    public string $connection_status;
    public string $connection_status_label;
    public mixed $github_installation;
    public array $health;
    public string $id;
    public int $imported_repositories_count;
    public string $imported_repositories_count_label;
    public array $organization;
    public array $pagination;
    public array $repositories;
}

/** Request payload for GithubIntegration#load. */
class GithubIntegrationLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $page = null;
}

/** Request payload for GithubIntegration#list. */
class GithubIntegrationListMatch
{
    public string $organization_id;
}

/** GithubOnboarding entity data model. */
class GithubOnboarding
{
    public array $accounts;
    public mixed $active_batch_id;
    public array $batches;
    public array $capabilities;
    public array $installations;
}

/** Request payload for GithubOnboarding#load. */
class GithubOnboardingLoadMatch
{
    public string $organization_id;
}

/** GithubOnboardingBranch entity data model. */
class GithubOnboardingBranch
{
    public array $branches;
}

/** Request payload for GithubOnboardingBranch#list. */
class GithubOnboardingBranchListMatch
{
    public string $organization_id;
    public string $github_app_installation_id;
    public string $name;
    public string $owner;
}

/** GithubOnboardingImport entity data model. */
class GithubOnboardingImport
{
    public string $account_login;
    public bool $complete;
    public string $created_at;
    public int $failed_item_count;
    public string $github_app_installation_id;
    public string $id;
    public int $imported_item_count;
    public int $item_count;
    public array $items;
    public mixed $repositories;
    public string $status;
    public int $terminal_item_count;
    public string $updated_at;
}

/** Request payload for GithubOnboardingImport#create. */
class GithubOnboardingImportCreateData
{
    public string $organization_id;
    public string $github_app_installation_id;
    public mixed $repositories;
}

/** GithubOnboardingImportBatch entity data model. */
class GithubOnboardingImportBatch
{
    public string $account_login;
    public bool $complete;
    public string $created_at;
    public int $failed_item_count;
    public string $github_app_installation_id;
    public string $id;
    public int $imported_item_count;
    public int $item_count;
    public array $items;
    public string $status;
    public int $terminal_item_count;
    public string $updated_at;
}

/** Request payload for GithubOnboardingImportBatch#load. */
class GithubOnboardingImportBatchLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** GithubOnboardingImportItem entity data model. */
class GithubOnboardingImportItem
{
    public ?string $id = null;
}

/** Request payload for GithubOnboardingImportItem#create. */
class GithubOnboardingImportItemCreateData
{
    public string $id;
    public string $organization_id;
}

/** GithubPullRequest entity data model. */
class GithubPullRequest
{
    public array $capabilities;
    public array $content;
    public string $fetched_at;
    public ?string $id = null;
    public mixed $magic_merge;
    public mixed $pull_request;
    public array $stack;
    public array $transcript_paths;
}

/** Request payload for GithubPullRequest#load. */
class GithubPullRequestLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $pull_request_id;
    public ?string $check_id = null;
    public ?string $cursor = null;
    public ?string $job_id = null;
    public ?int $page = null;
    public ?string $run_id = null;
    public ?string $section = null;
    public ?string $thread_id = null;
}

/** Request payload for GithubPullRequest#create. */
class GithubPullRequestCreateData
{
    public string $organization_id;
}

/** GithubRunnerAdmission entity data model. */
class GithubRunnerAdmission
{
}

/** Request payload for GithubRunnerAdmission#create. */
class GithubRunnerAdmissionCreateData
{
}

/** GithubRunnerCache entity data model. */
class GithubRunnerCache
{
    public ?string $entry_id = null;
    public ?string $key = null;
    public ?string $matched_key = null;
    public bool $ok;
    public string $operation;
    public ?array $restore_keys = null;
    public ?string $signed_download_url = null;
    public ?string $size_bytes = null;
    public ?string $upload_path = null;
    public ?string $version = null;
}

/** Request payload for GithubRunnerCache#create. */
class GithubRunnerCacheCreateData
{
    public ?string $entry_id = null;
    public ?string $key = null;
    public string $operation;
    public ?array $restore_keys = null;
    public ?string $size_bytes = null;
    public ?string $version = null;
}

/** GithubRunnerEgress entity data model. */
class GithubRunnerEgress
{
    public bool $can_request;
    public mixed $cidr;
    public mixed $ipv4;
    public mixed $requested_at_label;
    public string $status;
}

/** Request payload for GithubRunnerEgress#load. */
class GithubRunnerEgressLoadMatch
{
    public string $organization_id;
}

/** Request payload for GithubRunnerEgress#create. */
class GithubRunnerEgressCreateData
{
    public string $organization_id;
}

/** GithubRunnerHistory entity data model. */
class GithubRunnerHistory
{
    public array $activity;
    public array $counts;
    public string $observed_at;
    public array $pagination;
    public array $repositories;
    public array $runs;
    public mixed $setup = null;
    public mixed $success_rate;
    public array $usage;
}

/** Request payload for GithubRunnerHistory#load. */
class GithubRunnerHistoryLoadMatch
{
    public string $organization_id;
    public ?int $day = null;
    public ?int $page = null;
    public ?string $q = null;
    public ?string $repository = null;
    public ?string $status = null;
}

/** GithubRunnerImage entity data model. */
class GithubRunnerImage
{
    public string $created_at;
    public string $id;
    public string $image_reference;
    public mixed $last_error;
    public mixed $modal_image_id;
    public string $name;
    public mixed $registry_secret_name;
    public string $status;
    public string $updated_at;
}

/** Request payload for GithubRunnerImage#load. */
class GithubRunnerImageLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for GithubRunnerImage#list. */
class GithubRunnerImageListMatch
{
    public string $organization_id;
}

/** Request payload for GithubRunnerImage#create. */
class GithubRunnerImageCreateData
{
    public string $organization_id;
    public string $image_reference;
    public string $name;
    public mixed $registry_secret_name = null;
}

/** GithubRunnerPool entity data model. */
class GithubRunnerPool
{
    public int $cpu_millicores;
    public bool $enabled;
    public string $github_app_installation_id;
    public string $github_repository_id;
    public mixed $github_runner_image;
    public string $id;
    public mixed $image = null;
    public array $invocations;
    public string $label;
    public mixed $last_error;
    public mixed $last_polled_at;
    public int $max_concurrency;
    public int $memory_mb;
    public string $organization_id;
    public string $provider;
    public string $repository_full_name;
    public string $runtime_kind;
    public int $timeout_seconds;
}

/** Request payload for GithubRunnerPool#list. */
class GithubRunnerPoolListMatch
{
    public string $organization_id;
}

/** Request payload for GithubRunnerPool#create. */
class GithubRunnerPoolCreateData
{
    public string $organization_id;
    public ?bool $enabled = null;
    public string $github_app_installation_id;
    public mixed $image = null;
    public ?string $label = null;
    public ?int $max_concurrency = null;
    public ?string $provider = null;
    public string $repository_full_name;
    public ?int $timeout_seconds = null;
}

/** Request payload for GithubRunnerPool#update. */
class GithubRunnerPoolUpdateData
{
    public string $id;
    public string $organization_id;
    public ?bool $enabled = null;
    public mixed $image = null;
    public ?int $max_concurrency = null;
    public ?string $provider = null;
    public ?int $timeout_seconds = null;
}

/** GithubRunnerSetup entity data model. */
class GithubRunnerSetup
{
    public mixed $error;
    public string $github_repository_connection_id;
    public string $id;
    public mixed $pull_request_url;
    public string $repository_full_name;
    public mixed $roder_thread_id;
    public array $runner_labels;
    public string $status;
    public string $status_label;
    public mixed $summary;
}

/** Request payload for GithubRunnerSetup#load. */
class GithubRunnerSetupLoadMatch
{
    public string $organization_id;
    public string $id;
}

/** Request payload for GithubRunnerSetup#create. */
class GithubRunnerSetupCreateData
{
    public string $organization_id;
    public string $github_repository_connection_id;
}

/** Gitlab entity data model. */
class Gitlab
{
    public bool $configured;
    public array $connections;
    public array $integrations;
    public mixed $inventory_error = null;
    public mixed $next_page;
    public array $organization;
    public array $projects;
    public mixed $redirect_uri;
    public mixed $selected_integration_id;
}

/** Request payload for Gitlab#load. */
class GitlabLoadMatch
{
    public string $organization_id;
    public ?string $connection_id = null;
    public ?string $integration_id = null;
    public ?int $page = null;
    public ?string $search = null;
    public ?string $sort = null;
}

/** Request payload for Gitlab#create. */
class GitlabCreateData
{
    public string $organization_id;
    public mixed $client_id = null;
    public mixed $client_secret = null;
    public mixed $instance_url = null;
    public mixed $integration_id = null;
    public mixed $return_target = null;
    public mixed $webhook_authentication = null;
}

/** GitlabConnection entity data model. */
class GitlabConnection
{
    public ?string $id = null;
}

/** Request payload for GitlabConnection#create. */
class GitlabConnectionCreateData
{
    public string $id;
    public string $organization_id;
    public mixed $action_name = null;
    public mixed $integration_id = null;
    public mixed $source_branch = null;
}

/** GitlabImport entity data model. */
class GitlabImport
{
    public string $integration_id;
    public int $project_id;
    public ?string $repo_slug = null;
    public ?string $source_branch = null;
}

/** Request payload for GitlabImport#create. */
class GitlabImportCreateData
{
    public string $organization_id;
    public string $integration_id;
    public int $project_id;
    public ?string $repo_slug = null;
    public ?string $source_branch = null;
}

/** GitlabOauth entity data model. */
class GitlabOauth
{
}

/** Request payload for GitlabOauth#load. */
class GitlabOauthLoadMatch
{
}

/** GrantAllAgent entity data model. */
class GrantAllAgent
{
    public bool $all_agents_access;
    public bool $enabled;
    public bool $execution_available;
}

/** Request payload for GrantAllAgent#create. */
class GrantAllAgentCreateData
{
    public string $device_id;
    public string $organization_id;
    public bool $enabled;
}

/** HostingAppDomain entity data model. */
class HostingAppDomain
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public mixed $certificate;
    public string $created_at;
    public string $dns_mode;
    public string $dns_status;
    public mixed $failure_message;
    public string $hosted_app_id;
    public string $hostname;
    public string $id;
    public string $kind;
    public mixed $last_checked_at;
    public array $path_rules;
    public mixed $record_name;
    public mixed $record_type;
    public mixed $record_value;
    public mixed $redirect_to;
    public mixed $static_site_id;
    public string $target_kind;
    public string $tls_status;
    public string $updated_at;
    public mixed $verification_record;
    public string $verification_status;
}

/** Request payload for HostingAppDomain#load. */
class HostingAppDomainLoadMatch
{
    public string $app_id;
    public string $id;
}

/** Request payload for HostingAppDomain#list. */
class HostingAppDomainListMatch
{
    public string $app_id;
    public ?string $app_environment_id = null;
}

/** Request payload for HostingAppDomain#create. */
class HostingAppDomainCreateData
{
    public string $app_id;
    public mixed $app_environment_id = null;
    public mixed $app_service_id;
    public ?string $dns_status = null;
    public string $hostname;
    public string $kind;
    public mixed $redirect_to = null;
    public ?string $tls_status = null;
}

/** Request payload for HostingAppDomain#update. */
class HostingAppDomainUpdateData
{
    public string $app_id;
    public string $id;
}

/** Request payload for HostingAppDomain#patch. */
class HostingAppDomainPatchData
{
    public string $app_id;
    public string $id;
}

/** Request payload for HostingAppDomain#remove. */
class HostingAppDomainRemoveMatch
{
    public string $app_id;
    public string $id;
}

/** IdentityOrganization entity data model. */
class IdentityOrganization
{
    public ?string $id = null;
}

/** Request payload for IdentityOrganization#load. */
class IdentityOrganizationLoadMatch
{
    public string $id;
}

/** ImageRepository entity data model. */
class ImageRepository
{
    public bool $auth_configured;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $hosted_app_id;
    public string $id;
    public string $name;
    public string $organization_id;
    public string $provider_kind;
    public ?string $registry_auth_token = null;
    public string $repository_path;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
    public string $visibility;
}

/** Request payload for ImageRepository#list. */
class ImageRepositoryListMatch
{
    public string $organization_id;
}

/** Request payload for ImageRepository#create. */
class ImageRepositoryCreateData
{
    public string $organization_id;
    public mixed $hosted_app_id = null;
    public string $name;
    public ?string $provider_kind = null;
    public ?string $registry_auth_token = null;
    public ?string $repository_path = null;
    public string $slug;
    public ?string $status = null;
    public ?string $visibility = null;
}

/** ImageRepositoryTag entity data model. */
class ImageRepositoryTag
{
    public array $image_repository;
    public string $name;
    public string $registry_url;
    public array $tags;
}

/** Request payload for ImageRepositoryTag#list. */
class ImageRepositoryTagListMatch
{
    public string $image_repository_id;
}

/** ImportBranchPolicy entity data model. */
class ImportBranchPolicy
{
    public bool $can_manage_pr_scenario_writing;
    public bool $can_manage_sandbox_region;
    public array $dedicated_outbound_ip_addresses;
    public string $default_trunk_bookmark;
    public array $organization;
    public array $sandbox_regions;
}

/** Request payload for ImportBranchPolicy#load. */
class ImportBranchPolicyLoadMatch
{
    public string $organization_id;
}

/** Request payload for ImportBranchPolicy#update. */
class ImportBranchPolicyUpdateData
{
    public string $organization_id;
}

/** Request payload for ImportBranchPolicy#patch. */
class ImportBranchPolicyPatchData
{
    public string $organization_id;
    public ?string $default_trunk_bookmark = null;
}

/** Integration entity data model. */
class Integration
{
    public array $github;
    public array $gitlab;
    public array $permissions;
    public array $slack;
}

/** Request payload for Integration#list. */
class IntegrationListMatch
{
    public string $organization_id;
}

/** InteractionResponse entity data model. */
class InteractionResponse
{
    public array $answer;
    public string $conversation_id;
    public int $expected_revision;
}

/** Request payload for InteractionResponse#create. */
class InteractionResponseCreateData
{
    public string $agent_id;
    public string $interaction_id;
    public string $organization_id;
    public array $answer;
    public string $conversation_id;
    public int $expected_revision;
}

/** Invitation entity data model. */
class Invitation
{
    public mixed $accepted_at;
    public mixed $accepted_by_user;
    public string $created_at;
    public mixed $created_at_label;
    public string $email;
    public ?string $email_delivery_status = null;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public string $id;
    public mixed $invite_url;
    public mixed $invited_by_user;
    public array $organization;
    public mixed $revoked_at;
    public string $role;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for Invitation#list. */
class InvitationListMatch
{
    public string $organization_id;
}

/** Request payload for Invitation#create. */
class InvitationCreateData
{
    public string $organization_id;
    public string $email;
    public string $role;
}

/** Request payload for Invitation#remove. */
class InvitationRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** InvocationControl entity data model. */
class InvocationControl
{
}

/** Request payload for InvocationControl#create. */
class InvocationControlCreateData
{
    public string $device_id;
    public string $organization_id;
    public mixed $challenge = null;
    public mixed $invocation_id = null;
    public mixed $request_hash = null;
    public mixed $signature = null;
}

/** JobLogChunk entity data model. */
class JobLogChunk
{
    public int $byte_size;
    public mixed $ci_job_id;
    public mixed $ci_pipeline_run_id;
    public mixed $ci_step_id;
    public string $content;
    public string $content_format;
    public string $created_at;
    public string $id;
    public string $organization_id;
    public int $sequence_number;
    public string $stream;
    public string $updated_at;
}

/** Request payload for JobLogChunk#list. */
class JobLogChunkListMatch
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
    public ?int $after_sequence = null;
}

/** Request payload for JobLogChunk#create. */
class JobLogChunkCreateData
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** JobStep entity data model. */
class JobStep
{
    public ?string $id = null;
}

/** Request payload for JobStep#list. */
class JobStepListMatch
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobStep#create. */
class JobStepCreateData
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobStep#update. */
class JobStepUpdateData
{
    public string $id;
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobStep#patch. */
class JobStepPatchData
{
    public string $id;
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** JobWorkspace entity data model. */
class JobWorkspace
{
    public ?string $id = null;
}

/** Request payload for JobWorkspace#list. */
class JobWorkspaceListMatch
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobWorkspace#create. */
class JobWorkspaceCreateData
{
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobWorkspace#update. */
class JobWorkspaceUpdateData
{
    public string $id;
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for JobWorkspace#patch. */
class JobWorkspacePatchData
{
    public string $id;
    public string $job_id;
    public string $pipeline_id;
    public string $run_id;
}

/** JourneyVariantReplay entity data model. */
class JourneyVariantReplay
{
    public mixed $actor_id;
    public bool $can_request_qualification;
    public string $created_at;
    public mixed $failure_code;
    public mixed $failure_message;
    public string $id;
    public string $idempotency_key;
    public ?int $max_seconds = null;
    public mixed $preparation_receipt;
    public mixed $qualification;
    public string $qualification_status;
    public bool $replay_required;
    public string $review_reason;
    public mixed $run_id;
    public array $scenario_file;
    public mixed $scenario_run_id;
    public string $source_digest;
    public string $status;
    public string $updated_at;
    public string $variant_id;
}

/** Request payload for JourneyVariantReplay#create. */
class JourneyVariantReplayCreateData
{
    public string $journey_variant_id;
    public string $organization_id;
    public string $project_id;
    public mixed $actor_id = null;
    public string $idempotency_key;
    public ?int $max_seconds = null;
    public string $review_reason;
    public array $scenario_file;
}

/** Knowledge entity data model. */
class Knowledge
{
    public string $content_digest;
    public array $content_json;
    public array $document;
    public array $documents;
    public array $dreaming;
    public string $expected_digest;
    public array $history;
    public string $id;
    public string $kind;
    public string $markdown;
    public string $observed_at;
    public array $organization;
    public array $permissions;
    public string $project_id;
    public string $project_name;
    public array $projects;
    public mixed $selected_project_id;
    public array $source;
    public string $title;
    public int $total;
}

/** Request payload for Knowledge#load. */
class KnowledgeLoadMatch
{
    public ?string $id = null;
    public string $organization_id;
    public ?string $project_id = null;
    public ?string $q = null;
}

/** Request payload for Knowledge#create. */
class KnowledgeCreateData
{
    public string $organization_id;
    public string $markdown;
    public string $project_id;
    public string $title;
}

/** Request payload for Knowledge#update. */
class KnowledgeUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Knowledge#patch. */
class KnowledgePatchData
{
    public string $id;
    public string $organization_id;
    public ?string $expected_digest = null;
    public ?string $markdown = null;
    public ?string $title = null;
}

/** Request payload for Knowledge#remove. */
class KnowledgeRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** Known entity data model. */
class Known
{
}

/** Request payload for Known#load. */
class KnownLoadMatch
{
}

/** Label entity data model. */
class Label
{
    public int $changes_count;
    public string $id;
    public string $name;
    public string $slug;
}

/** Request payload for Label#list. */
class LabelListMatch
{
    public string $organization_id;
    public ?bool $include_unused = null;
    public ?int $limit = null;
    public ?string $q = null;
}

/** LeaseArtifact entity data model. */
class LeaseArtifact
{
}

/** Request payload for LeaseArtifact#create. */
class LeaseArtifactCreateData
{
    public string $lease_id;
    public string $node_id;
}

/** LeaseCache entity data model. */
class LeaseCache
{
}

/** Request payload for LeaseCache#create. */
class LeaseCacheCreateData
{
    public string $lease_id;
    public string $node_id;
}

/** LeaseLogChunk entity data model. */
class LeaseLogChunk
{
}

/** Request payload for LeaseLogChunk#create. */
class LeaseLogChunkCreateData
{
    public string $lease_id;
    public string $node_id;
}

/** LeaseReconciliation entity data model. */
class LeaseReconciliation
{
    public ?string $id = null;
}

/** Request payload for LeaseReconciliation#create. */
class LeaseReconciliationCreateData
{
    public string $id;
    public string $lease_id;
    public string $node_id;
}

/** LeaseStep entity data model. */
class LeaseStep
{
    public ?string $id = null;
}

/** Request payload for LeaseStep#update. */
class LeaseStepUpdateData
{
    public string $id;
    public string $lease_id;
    public string $node_id;
}

/** LeaseVerifyDiagnostic entity data model. */
class LeaseVerifyDiagnostic
{
    public array $browser_events;
    public array $live_browser;
    public array $live_view;
    public ?array $steps = null;
}

/** Request payload for LeaseVerifyDiagnostic#create. */
class LeaseVerifyDiagnosticCreateData
{
    public string $lease_id;
    public string $swarm_id;
    public string $task_id;
    public array $browser_events;
    public array $live_browser;
    public array $live_view;
    public ?array $steps = null;
}

/** LeaseVerifySecret entity data model. */
class LeaseVerifySecret
{
}

/** Request payload for LeaseVerifySecret#create. */
class LeaseVerifySecretCreateData
{
    public string $lease_id;
    public string $swarm_id;
    public string $task_id;
}

/** LeaseWorkspace entity data model. */
class LeaseWorkspace
{
    public ?string $id = null;
}

/** Request payload for LeaseWorkspace#update. */
class LeaseWorkspaceUpdateData
{
    public string $id;
    public string $lease_id;
    public string $node_id;
}

/** LocalAgentDecision entity data model. */
class LocalAgentDecision
{
    public array $request;
}

/** Request payload for LocalAgentDecision#create. */
class LocalAgentDecisionCreateData
{
    public string $organization_id;
    public array $request;
}

/** LocalAgentResponse entity data model. */
class LocalAgentResponse
{
    public array $input;
    public string $model;
    public mixed $service_tier = null;
    public bool $store;
    public bool $stream;
    public ?array $tools = null;
}

/** Request payload for LocalAgentResponse#create. */
class LocalAgentResponseCreateData
{
    public string $organization_id;
    public array $input;
    public string $model;
    public mixed $service_tier = null;
    public bool $store;
    public bool $stream;
    public ?array $tools = null;
}

/** LocalThreadDelivery entity data model. */
class LocalThreadDelivery
{
    public string $decision;
    public bool $decision_pending;
    public array $delivery;
    public int $expected_version;
    public ?string $id = null;
    public array $policy;
    public mixed $recovery_message;
}

/** Request payload for LocalThreadDelivery#load. */
class LocalThreadDeliveryLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $local_thread_id;
    public string $organization_id;
    public ?int $expected_version = null;
}

/** Request payload for LocalThreadDelivery#update. */
class LocalThreadDeliveryUpdateData
{
    public string $agent_id;
    public string $id;
    public string $local_thread_id;
    public string $organization_id;
    public ?string $decision = null;
    public ?int $expected_version = null;
}

/** LocalThreadOperation entity data model. */
class LocalThreadOperation
{
    public string $action;
    public array $arguments;
    public string $created_at;
    public array $delivery;
    public string $device_id;
    public ?string $diagnostic_code = null;
    public array $end;
    public string $expires_at;
    public string $id;
    public string $key;
    public string $provider;
    public array $references;
    public mixed $result;
    public bool $result_expired;
    public string $state;
}

/** Request payload for LocalThreadOperation#load. */
class LocalThreadOperationLoadMatch
{
    public string $agent_id;
    public string $id;
    public ?string $local_thread_id = null;
    public string $organization_id;
}

/** Request payload for LocalThreadOperation#create. */
class LocalThreadOperationCreateData
{
    public string $agent_id;
    public string $local_thread_id;
    public string $organization_id;
    public string $action;
    public array $arguments;
    public string $key;
}

/** Location entity data model. */
class Location
{
    public string $code;
    public string $created_at;
    public string $id;
    public string $name;
    public string $nomad_datacenter;
    public string $updated_at;
}

/** Request payload for Location#list. */
class LocationListMatch
{
    public ?string $code = null;
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $nomad_datacenter = null;
    public ?string $updated_at = null;
}

/** LogStreamChunk entity data model. */
class LogStreamChunk
{
    public ?string $id = null;
}

/** Request payload for LogStreamChunk#load. */
class LogStreamChunkLoadMatch
{
    public string $id;
    public string $log_stream_id;
    public string $space_id;
}

/** Request payload for LogStreamChunk#list. */
class LogStreamChunkListMatch
{
    public string $log_stream_id;
    public string $space_id;
}

/** Request payload for LogStreamChunk#create. */
class LogStreamChunkCreateData
{
    public string $log_stream_id;
    public string $space_id;
}

/** LogoImage entity data model. */
class LogoImage
{
    public array $activated_products;
    public ?bool $agents_only = null;
    public bool $can_activate_products;
    public string $created_at;
    public mixed $created_at_label;
    public bool $github_prs_authored_by_change_author;
    public string $id;
    public mixed $logo_url;
    public int $member_count;
    public string $name;
    public int $pending_invitation_count;
    public bool $personal;
    public int $repository_count;
    public mixed $role;
    public string $sandbox_region;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public string $slug;
    public ?array $source_control_providers = null;
    public ?bool $source_ui_enabled = null;
    public string $timezone;
    public string $updated_at;
    public mixed $updated_at_label;
    public bool $verify_pr_scenario_writing_enabled;
}

/** Request payload for LogoImage#update. */
class LogoImageUpdateData
{
    public string $organization_id;
}

/** Request payload for LogoImage#remove. */
class LogoImageRemoveMatch
{
    public string $organization_id;
}

/** MarketingSetting entity data model. */
class MarketingSetting
{
    public bool $call_first;
}

/** Request payload for MarketingSetting#list. */
class MarketingSettingListMatch
{
    public ?bool $call_first = null;
}

/** McpOauth entity data model. */
class McpOauth
{
}

/** Request payload for McpOauth#load. */
class McpOauthLoadMatch
{
    public string $request;
}

/** Request payload for McpOauth#create. */
class McpOauthCreateData
{
    public mixed $all_organizations = null;
    public mixed $approve = null;
    public mixed $organization_id = null;
    public mixed $request = null;
}

/** Me entity data model. */
class Me
{
    public mixed $active_organization;
    public ?string $analytics_distinct_id = null;
    public bool $analytics_internal;
    public ?string $api_base_url = null;
    public ?string $api_token = null;
    public array $app_promotion;
    public string $commit_author_email;
    public string $email;
    public array $enabled_features;
    public bool $github_pr_user_authorization_connected;
    public mixed $github_pr_user_authorization_login;
    public bool $github_prs_authored_by_change_author;
    public string $id;
    public mixed $impersonation;
    public mixed $name;
    public ?string $next_path = null;
    public array $onboarding;
    public ?bool $openai_sign_in_connected = null;
    public ?bool $openai_sign_in_enabled = null;
    public array $organizations;
    public int $pending_organization_invitation_count;
    public string $pending_organization_invitation_count_label;
    public mixed $picture_url;
    public ?bool $superadmin = null;
    public mixed $time_zone = null;
}

/** Request payload for Me#load. */
class MeLoadMatch
{
    public mixed $active_organization = null;
    public ?string $analytics_distinct_id = null;
    public ?bool $analytics_internal = null;
    public ?string $api_base_url = null;
    public ?string $api_token = null;
    public ?array $app_promotion = null;
    public ?string $commit_author_email = null;
    public ?string $email = null;
    public ?array $enabled_features = null;
    public ?bool $github_pr_user_authorization_connected = null;
    public mixed $github_pr_user_authorization_login = null;
    public ?bool $github_prs_authored_by_change_author = null;
    public string $id;
    public mixed $impersonation = null;
    public mixed $name = null;
    public ?string $next_path = null;
    public ?array $onboarding = null;
    public ?bool $openai_sign_in_connected = null;
    public ?bool $openai_sign_in_enabled = null;
    public ?array $organizations = null;
    public ?int $pending_organization_invitation_count = null;
    public ?string $pending_organization_invitation_count_label = null;
    public mixed $picture_url = null;
    public ?bool $superadmin = null;
    public mixed $time_zone = null;
}

/** Request payload for Me#create. */
class MeCreateData
{
    public mixed $action_name = null;
    public mixed $confirmation = null;
}

/** Request payload for Me#update. */
class MeUpdateData
{
}

/** Request payload for Me#remove. */
class MeRemoveMatch
{
    public mixed $active_organization = null;
    public ?string $analytics_distinct_id = null;
    public ?bool $analytics_internal = null;
    public ?string $api_base_url = null;
    public ?string $api_token = null;
    public ?array $app_promotion = null;
    public ?string $commit_author_email = null;
    public ?string $email = null;
    public ?array $enabled_features = null;
    public ?bool $github_pr_user_authorization_connected = null;
    public mixed $github_pr_user_authorization_login = null;
    public ?bool $github_prs_authored_by_change_author = null;
    public string $id;
    public mixed $impersonation = null;
    public mixed $name = null;
    public ?string $next_path = null;
    public ?array $onboarding = null;
    public ?bool $openai_sign_in_connected = null;
    public ?bool $openai_sign_in_enabled = null;
    public ?array $organizations = null;
    public ?int $pending_organization_invitation_count = null;
    public ?string $pending_organization_invitation_count_label = null;
    public mixed $picture_url = null;
    public ?bool $superadmin = null;
    public mixed $time_zone = null;
}

/** MeEmail entity data model. */
class MeEmail
{
    public bool $account;
    public bool $can_delete;
    public bool $can_resend_verification;
    public bool $can_set_account;
    public bool $can_set_commit_author;
    public bool $commit_author;
    public string $email;
    public array $emails;
    public string $id;
    public ?string $message = null;
    public string $verification_status;
    public bool $verified;
}

/** Request payload for MeEmail#list. */
class MeEmailListMatch
{
    public ?bool $account = null;
    public ?bool $can_delete = null;
    public ?bool $can_resend_verification = null;
    public ?bool $can_set_account = null;
    public ?bool $can_set_commit_author = null;
    public ?bool $commit_author = null;
    public ?string $email = null;
    public ?array $emails = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?string $verification_status = null;
    public ?bool $verified = null;
}

/** Request payload for MeEmail#create. */
class MeEmailCreateData
{
    public string $email;
}

/** Request payload for MeEmail#update. */
class MeEmailUpdateData
{
    public string $id;
}

/** Request payload for MeEmail#patch. */
class MeEmailPatchData
{
    public string $id;
    public ?bool $account = null;
    public ?bool $commit_author = null;
}

/** Request payload for MeEmail#remove. */
class MeEmailRemoveMatch
{
    public string $id;
}

/** MeOnboarding entity data model. */
class MeOnboarding
{
}

/** Request payload for MeOnboarding#create. */
class MeOnboardingCreateData
{
    public mixed $step = null;
}

/** MediaFile entity data model. */
class MediaFile
{
    public ?string $id = null;
}

/** Request payload for MediaFile#load. */
class MediaFileLoadMatch
{
    public string $browser_session_id;
    public string $id;
    public string $media_id;
    public string $organization_id;
    public ?bool $inline = null;
}

/** Member entity data model. */
class Member
{
    public mixed $accepted_at;
    public mixed $accepted_by_user;
    public string $created_at;
    public mixed $created_at_label;
    public string $email;
    public ?string $email_delivery_status = null;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public string $id;
    public mixed $invite_url;
    public mixed $invited_by_user;
    public bool $is_self;
    public array $organization;
    public mixed $revoked_at;
    public string $role;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
    public array $user;
}

/** Request payload for Member#list. */
class MemberListMatch
{
    public string $organization_id;
}

/** Request payload for Member#update. */
class MemberUpdateData
{
    public string $id;
    public string $organization_id;
    public ?string $role = null;
}

/** Request payload for Member#patch. */
class MemberPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $role = null;
}

/** Request payload for Member#remove. */
class MemberRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** Memory entity data model. */
class Memory
{
    public string $confidence;
    public string $created_at;
    public ?string $environment_id = null;
    public string $finding;
    public array $history;
    public string $id;
    public mixed $indexed_at;
    public array $memory;
    public ?string $project_id = null;
    public ?string $response = null;
    public array $scope;
    public array $source;
    public ?array $tags = null;
    public string $title;
    public ?string $workaround = null;
}

/** Request payload for Memory#load. */
class MemoryLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $environment_id = null;
    public ?string $project_id = null;
}

/** Request payload for Memory#list. */
class MemoryListMatch
{
    public string $organization_id;
    public ?string $environment_id = null;
    public ?bool $include_environment = null;
    public ?string $project_id = null;
    public ?string $q = null;
    public ?string $tag = null;
}

/** Request payload for Memory#create. */
class MemoryCreateData
{
    public string $organization_id;
    public ?string $environment_id = null;
    public string $finding;
    public ?string $project_id = null;
    public ?string $response = null;
    public ?array $tags = null;
    public string $title;
    public ?string $workaround = null;
}

/** Request payload for Memory#remove. */
class MemoryRemoveMatch
{
    public string $id;
    public string $organization_id;
    public ?string $project_id = null;
}

/** MergeQueueEntry entity data model. */
class MergeQueueEntry
{
    public array $analytics;
    public mixed $change_id = null;
    public mixed $expected_target_commit_id = null;
    public mixed $expected_target_version = null;
    public int $expected_version;
    public mixed $github_pr_number = null;
    public ?string $id = null;
    public string $idempotency_key;
    public string $kind;
    public array $policy;
    public ?string $priority = null;
    public array $queue;
    public ?array $target_branches = null;
    public mixed $when_ready = null;
}

/** Request payload for MergeQueueEntry#create. */
class MergeQueueEntryCreateData
{
    public string $merge_queue_id;
    public string $organization_id;
    public string $repo_id;
    public mixed $change_id = null;
    public mixed $expected_target_commit_id = null;
    public mixed $expected_target_version = null;
    public int $expected_version;
    public mixed $github_pr_number = null;
    public string $idempotency_key;
    public string $kind;
    public ?string $priority = null;
    public mixed $when_ready = null;
}

/** Request payload for MergeQueueEntry#remove. */
class MergeQueueEntryRemoveMatch
{
    public string $id;
    public string $merge_queue_id;
    public string $organization_id;
    public string $repo_id;
}

/** MergeRequest entity data model. */
class MergeRequest
{
    public array $available_tests;
    public string $base_sha;
    public ?string $branch = null;
    public mixed $comment_url;
    public mixed $current_run = null;
    public bool $draft;
    public array $findings;
    public mixed $github_repository;
    public mixed $github_url;
    public string $head_sha;
    public string $id;
    public string $idempotency_key;
    public int $number;
    public array $pagination;
    public array $permissions;
    public bool $preview_cleanup_ready;
    public mixed $preview_url = null;
    public mixed $project = null;
    public mixed $project_id;
    public mixed $project_slug;
    public string $provider;
    public array $pull_request;
    public string $repository_id;
    public string $request_label;
    public mixed $requested_run_id;
    public array $runs;
    public mixed $source_branch;
    public mixed $source_repository;
    public mixed $source_url;
    public string $state;
    public string $title;
    public string $updated_at;
    public string $web_path;
}

/** Request payload for MergeRequest#load. */
class MergeRequestLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $page = null;
}

/** Request payload for MergeRequest#create. */
class MergeRequestCreateData
{
    public string $organization_id;
    public ?string $branch = null;
    public ?string $head_sha = null;
    public string $idempotency_key;
    public int $number;
    public mixed $project_id = null;
    public ?string $repository_id = null;
}

/** MergeResolution entity data model. */
class MergeResolution
{
    public string $action;
    public string $base;
    public mixed $content = null;
    public ?array $context = null;
    public int $duration_ms;
    public bool $fallback;
    public ?string $model = null;
    public string $ours;
    public ?string $path = null;
    public bool $resolved;
    public string $theirs;
}

/** Request payload for MergeResolution#create. */
class MergeResolutionCreateData
{
    public string $base;
    public ?array $context = null;
    public string $ours;
    public ?string $path = null;
    public string $theirs;
}

/** MessagingConversationMessage entity data model. */
class MessagingConversationMessage
{
    public int $attachment_limit;
    public int $attachment_max_bytes;
    public string $client_operation_id;
    public string $content;
    public ?string $id = null;
    public array $media;
    public ?array $media_upload_ids = null;
    public array $messages;
    public ?string $reply_to = null;
    public ?bool $retry_attachment = null;
    public mixed $send_blocked_reason;
    public ?string $send_disposition = null;
    public mixed $send_error = null;
    public mixed $send_style = null;
}

/** Request payload for MessagingConversationMessage#create. */
class MessagingConversationMessageCreateData
{
    public string $messaging_conversation_id;
    public string $organization_id;
    public string $project_id;
    public string $client_operation_id;
    public string $content;
    public array $media;
    public ?array $media_upload_ids = null;
    public ?string $reply_to = null;
    public ?bool $retry_attachment = null;
    public mixed $send_style = null;
}

/** MessagingConversationUpload entity data model. */
class MessagingConversationUpload
{
    public array $attachment;
    public string $upload_id;
}

/** Request payload for MessagingConversationUpload#create. */
class MessagingConversationUploadCreateData
{
    public string $messaging_conversation_id;
    public string $organization_id;
    public string $project_id;
}

/** MetricQuery entity data model. */
class MetricQuery
{
}

/** Request payload for MetricQuery#list. */
class MetricQueryListMatch
{
}

/** MetronomeWebhook entity data model. */
class MetronomeWebhook
{
}

/** Request payload for MetronomeWebhook#create. */
class MetronomeWebhookCreateData
{
}

/** ModelSubscriptionAccount entity data model. */
class ModelSubscriptionAccount
{
    public array $accounts;
    public array $agents;
    public bool $can_disconnect;
    public mixed $connection_agent;
    public ?string $email = null;
    public string $id;
    public string $label;
    public string $provider;
    public bool $saved;
    public string $status;
    public bool $usable;
}

/** Request payload for ModelSubscriptionAccount#list. */
class ModelSubscriptionAccountListMatch
{
    public ?array $accounts = null;
    public ?array $agents = null;
    public ?bool $can_disconnect = null;
    public mixed $connection_agent = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $label = null;
    public ?string $provider = null;
    public ?bool $saved = null;
    public ?string $status = null;
    public ?bool $usable = null;
}

/** Request payload for ModelSubscriptionAccount#create. */
class ModelSubscriptionAccountCreateData
{
    public string $label;
    public mixed $action_name = null;
    public mixed $agent_id = null;
    public mixed $profile_id = null;
    public mixed $token = null;
}

/** Request payload for ModelSubscriptionAccount#update. */
class ModelSubscriptionAccountUpdateData
{
    public string $id;
}

/** Request payload for ModelSubscriptionAccount#patch. */
class ModelSubscriptionAccountPatchData
{
    public string $id;
    public ?string $label = null;
}

/** Request payload for ModelSubscriptionAccount#remove. */
class ModelSubscriptionAccountRemoveMatch
{
    public string $id;
}

/** ModelSubscriptionAccountConnection entity data model. */
class ModelSubscriptionAccountConnection
{
    public ?string $id = null;
}

/** Request payload for ModelSubscriptionAccountConnection#load. */
class ModelSubscriptionAccountConnectionLoadMatch
{
    public string $id;
}

/** Request payload for ModelSubscriptionAccountConnection#update. */
class ModelSubscriptionAccountConnectionUpdateData
{
    public string $id;
    public mixed $action_name = null;
    public mixed $login_id = null;
    public mixed $method = null;
    public mixed $step_id = null;
    public mixed $value = null;
}

/** NetworkConnection entity data model. */
class NetworkConnection
{
    public ?string $aws_client_vpn_profile = null;
    public string $created_at;
    public ?string $device_tag = null;
    public string $id;
    public string $name;
    public ?string $oauth_client_id = null;
    public ?string $oauth_client_secret = null;
    public ?string $provider = null;
    public ?string $status = null;
    public string $updated_at;
}

/** Request payload for NetworkConnection#create. */
class NetworkConnectionCreateData
{
    public string $organization_id;
    public ?string $aws_client_vpn_profile = null;
    public ?string $device_tag = null;
    public string $name;
    public ?string $oauth_client_id = null;
    public ?string $oauth_client_secret = null;
    public ?string $provider = null;
    public ?string $status = null;
}

/** Request payload for NetworkConnection#update. */
class NetworkConnectionUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for NetworkConnection#patch. */
class NetworkConnectionPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $aws_client_vpn_profile = null;
    public ?string $device_tag = null;
    public ?string $name = null;
    public ?string $oauth_client_id = null;
    public ?string $oauth_client_secret = null;
    public ?string $provider = null;
    public ?string $status = null;
}

/** NetworkingSpace entity data model. */
class NetworkingSpace
{
    public ?string $id = null;
}

/** Request payload for NetworkingSpace#load. */
class NetworkingSpaceLoadMatch
{
    public string $id;
}

/** Request payload for NetworkingSpace#list. */
class NetworkingSpaceListMatch
{
    public ?string $id = null;
}

/** Request payload for NetworkingSpace#create. */
class NetworkingSpaceCreateData
{
}

/** Request payload for NetworkingSpace#update. */
class NetworkingSpaceUpdateData
{
    public string $id;
}

/** Request payload for NetworkingSpace#patch. */
class NetworkingSpacePatchData
{
    public string $id;
}

/** Request payload for NetworkingSpace#remove. */
class NetworkingSpaceRemoveMatch
{
    public string $id;
}

/** Node entity data model. */
class Node
{
    public mixed $account_avatar_url;
    public mixed $account_id;
    public string $account_login;
    public string $created_at;
    public mixed $created_at_label;
    public string $id;
    public string $installation_id;
    public mixed $installed_at;
    public mixed $installed_at_label;
    public string $manage_access_url;
    public string $organization_id;
    public array $permission_entries;
    public array $permissions;
    public string $status;
    public mixed $suspended_at;
    public mixed $suspended_at_label;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for Node#list. */
class NodeListMatch
{
    public string $organization_id;
}

/** NodeCertificate entity data model. */
class NodeCertificate
{
}

/** Request payload for NodeCertificate#create. */
class NodeCertificateCreateData
{
    public string $node_id;
}

/** NodeLease entity data model. */
class NodeLease
{
    public ?string $id = null;
}

/** Request payload for NodeLease#load. */
class NodeLeaseLoadMatch
{
    public string $id;
    public string $node_id;
}

/** Request payload for NodeLease#list. */
class NodeLeaseListMatch
{
    public string $node_id;
}

/** Request payload for NodeLease#create. */
class NodeLeaseCreateData
{
    public string $id;
    public string $node_id;
}

/** NomadAllocation entity data model. */
class NomadAllocation
{
    public string $allocation_id;
    public mixed $client_status;
    public mixed $create_time;
    public mixed $datacenter;
    public mixed $desired_description;
    public mixed $desired_status;
    public string $fetched_at;
    public ?string $id = null;
    public mixed $job_id;
    public mixed $modify_time;
    public mixed $name;
    public string $namespace;
    public mixed $node_id;
    public mixed $node_name;
    public array $resources;
    public mixed $task_group;
    public array $task_states;
    public ?array $verify_runner_images = null;
}

/** Request payload for NomadAllocation#load. */
class NomadAllocationLoadMatch
{
    public string $app_id;
    public string $id;
}

/** NomadLog entity data model. */
class NomadLog
{
    public string $allocation_id;
    public ?string $environment = null;
    public string $fetched_at;
    public mixed $location = null;
    public string $logs;
    public string $namespace;
    public int $offset;
    public string $origin;
    public ?string $service = null;
    public string $task;
    public string $type;
}

/** Request payload for NomadLog#list. */
class NomadLogListMatch
{
    public string $app_id;
    public ?string $environment = null;
    public ?string $location = null;
    public ?int $offset = null;
    public ?string $origin = null;
    public ?string $service = null;
    public ?string $task = null;
    public ?string $type = null;
}

/** Now entity data model. */
class Now
{
    public array $needs_attention;
    public array $pagination;
    public array $recently_landed;
    public array $shipping_now;
    public array $summary;
}

/** Request payload for Now#load. */
class NowLoadMatch
{
    public string $organization_id;
    public ?int $page = null;
}

/** ObservabilityClickhouseCluster entity data model. */
class ObservabilityClickhouseCluster
{
    public ?string $id = null;
}

/** Request payload for ObservabilityClickhouseCluster#load. */
class ObservabilityClickhouseClusterLoadMatch
{
    public string $id;
}

/** Request payload for ObservabilityClickhouseCluster#list. */
class ObservabilityClickhouseClusterListMatch
{
    public ?string $id = null;
}

/** Request payload for ObservabilityClickhouseCluster#create. */
class ObservabilityClickhouseClusterCreateData
{
}

/** Request payload for ObservabilityClickhouseCluster#update. */
class ObservabilityClickhouseClusterUpdateData
{
    public string $id;
}

/** Request payload for ObservabilityClickhouseCluster#patch. */
class ObservabilityClickhouseClusterPatchData
{
    public string $id;
}

/** Request payload for ObservabilityClickhouseCluster#remove. */
class ObservabilityClickhouseClusterRemoveMatch
{
    public string $id;
}

/** ObservabilityQuickwitCluster entity data model. */
class ObservabilityQuickwitCluster
{
    public ?string $id = null;
}

/** Request payload for ObservabilityQuickwitCluster#load. */
class ObservabilityQuickwitClusterLoadMatch
{
    public string $id;
}

/** Request payload for ObservabilityQuickwitCluster#list. */
class ObservabilityQuickwitClusterListMatch
{
    public ?string $id = null;
}

/** Request payload for ObservabilityQuickwitCluster#create. */
class ObservabilityQuickwitClusterCreateData
{
}

/** Request payload for ObservabilityQuickwitCluster#update. */
class ObservabilityQuickwitClusterUpdateData
{
    public string $id;
}

/** Request payload for ObservabilityQuickwitCluster#patch. */
class ObservabilityQuickwitClusterPatchData
{
    public string $id;
}

/** Request payload for ObservabilityQuickwitCluster#remove. */
class ObservabilityQuickwitClusterRemoveMatch
{
    public string $id;
}

/** ObservabilitySpace entity data model. */
class ObservabilitySpace
{
    public ?string $id = null;
}

/** Request payload for ObservabilitySpace#load. */
class ObservabilitySpaceLoadMatch
{
    public string $id;
}

/** Request payload for ObservabilitySpace#list. */
class ObservabilitySpaceListMatch
{
    public ?string $id = null;
}

/** Request payload for ObservabilitySpace#create. */
class ObservabilitySpaceCreateData
{
}

/** Request payload for ObservabilitySpace#update. */
class ObservabilitySpaceUpdateData
{
    public string $id;
}

/** Request payload for ObservabilitySpace#patch. */
class ObservabilitySpacePatchData
{
    public string $id;
}

/** Request payload for ObservabilitySpace#remove. */
class ObservabilitySpaceRemoveMatch
{
    public string $id;
}

/** Openapi entity data model. */
class Openapi
{
}

/** Request payload for Openapi#load. */
class OpenapiLoadMatch
{
}

/** OrgInvitation entity data model. */
class OrgInvitation
{
    public ?string $id = null;
    public array $invitation;
    public mixed $registration_options;
    public bool $requires_password_setup;
    public bool $start_guided_setup;
}

/** Request payload for OrgInvitation#load. */
class OrgInvitationLoadMatch
{
    public string $id;
}

/** Request payload for OrgInvitation#create. */
class OrgInvitationCreateData
{
    public string $id;
}

/** Organization entity data model. */
class Organization
{
    public array $activated_products;
    public ?bool $agents_only = null;
    public bool $can_activate_products;
    public string $created_at;
    public mixed $created_at_label;
    public bool $github_prs_authored_by_change_author;
    public mixed $google_workspace_domain = null;
    public string $id;
    public mixed $logo_url;
    public int $member_count;
    public string $name;
    public int $pending_invitation_count;
    public bool $personal;
    public int $repository_count;
    public mixed $role;
    public string $sandbox_region;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public string $slug;
    public ?array $source_control_providers = null;
    public ?bool $source_ui_enabled = null;
    public string $timezone;
    public string $updated_at;
    public mixed $updated_at_label;
    public bool $verify_pr_scenario_writing_enabled;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $id;
}

/** Request payload for Organization#list. */
class OrganizationListMatch
{
    public ?array $activated_products = null;
    public ?bool $agents_only = null;
    public ?bool $can_activate_products = null;
    public ?string $created_at = null;
    public mixed $created_at_label = null;
    public ?bool $github_prs_authored_by_change_author = null;
    public mixed $google_workspace_domain = null;
    public ?string $id = null;
    public mixed $logo_url = null;
    public ?int $member_count = null;
    public ?string $name = null;
    public ?int $pending_invitation_count = null;
    public ?bool $personal = null;
    public ?int $repository_count = null;
    public mixed $role = null;
    public ?string $sandbox_region = null;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public ?string $slug = null;
    public ?array $source_control_providers = null;
    public ?bool $source_ui_enabled = null;
    public ?string $timezone = null;
    public ?string $updated_at = null;
    public mixed $updated_at_label = null;
    public ?bool $verify_pr_scenario_writing_enabled = null;
}

/** Request payload for Organization#create. */
class OrganizationCreateData
{
    public string $name;
    public string $slug;
    public ?string $timezone = null;
}

/** Request payload for Organization#update. */
class OrganizationUpdateData
{
    public string $id;
    public ?bool $github_prs_authored_by_change_author = null;
    public mixed $google_workspace_domain = null;
    public ?string $name = null;
    public ?string $sandbox_region = null;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public ?string $slug = null;
    public ?string $timezone = null;
    public ?bool $verify_pr_scenario_writing_enabled = null;
}

/** Request payload for Organization#patch. */
class OrganizationPatchData
{
    public string $id;
    public ?bool $github_prs_authored_by_change_author = null;
    public mixed $google_workspace_domain = null;
    public ?string $name = null;
    public ?string $sandbox_region = null;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public ?string $slug = null;
    public ?string $timezone = null;
    public ?bool $verify_pr_scenario_writing_enabled = null;
}

/** OrganizationApp entity data model. */
class OrganizationApp
{
    public ?string $id = null;
}

/** Request payload for OrganizationApp#list. */
class OrganizationAppListMatch
{
    public string $organization_id;
    public ?bool $context = null;
    public ?bool $installed = null;
    public string $native_agent_id;
}

/** Request payload for OrganizationApp#update. */
class OrganizationAppUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationApp#remove. */
class OrganizationAppRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationControl entity data model. */
class OrganizationControl
{
}

/** Request payload for OrganizationControl#create. */
class OrganizationControlCreateData
{
    public string $organization_id;
    public mixed $device_id = null;
    public mixed $native_device_id = null;
    public mixed $pairing_generation = null;
}

/** OrganizationDevice entity data model. */
class OrganizationDevice
{
    public ?string $id = null;
}

/** Request payload for OrganizationDevice#create. */
class OrganizationDeviceCreateData
{
    public string $id;
    public string $organization_id;
    public mixed $payload = null;
    public mixed $signature = null;
}

/** OrganizationIdentityCertificate entity data model. */
class OrganizationIdentityCertificate
{
    public ?string $id = null;
}

/** Request payload for OrganizationIdentityCertificate#load. */
class OrganizationIdentityCertificateLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationIdentityCertificate#list. */
class OrganizationIdentityCertificateListMatch
{
    public string $organization_id;
}

/** Request payload for OrganizationIdentityCertificate#create. */
class OrganizationIdentityCertificateCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationIdentityCertificate#update. */
class OrganizationIdentityCertificateUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationIdentityCertificate#patch. */
class OrganizationIdentityCertificatePatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationIdentityCertificate#remove. */
class OrganizationIdentityCertificateRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationInteraction entity data model. */
class OrganizationInteraction
{
}

/** Request payload for OrganizationInteraction#create. */
class OrganizationInteractionCreateData
{
    public string $organization_id;
}

/** OrganizationInvitation entity data model. */
class OrganizationInvitation
{
    public string $email;
    public ?string $id = null;
    public string $role;
}

/** Request payload for OrganizationInvitation#create. */
class OrganizationInvitationCreateData
{
    public string $organization_id;
    public string $email;
    public string $role;
}

/** Request payload for OrganizationInvitation#remove. */
class OrganizationInvitationRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationMessageFile entity data model. */
class OrganizationMessageFile
{
}

/** Request payload for OrganizationMessageFile#create. */
class OrganizationMessageFileCreateData
{
    public string $organization_id;
}

/** OrganizationOidcTrust entity data model. */
class OrganizationOidcTrust
{
    public ?string $id = null;
}

/** Request payload for OrganizationOidcTrust#load. */
class OrganizationOidcTrustLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationOidcTrust#list. */
class OrganizationOidcTrustListMatch
{
    public string $organization_id;
}

/** Request payload for OrganizationOidcTrust#create. */
class OrganizationOidcTrustCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationOidcTrust#update. */
class OrganizationOidcTrustUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationOidcTrust#patch. */
class OrganizationOidcTrustPatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationOidcTrust#remove. */
class OrganizationOidcTrustRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationRunEvent entity data model. */
class OrganizationRunEvent
{
}

/** Request payload for OrganizationRunEvent#create. */
class OrganizationRunEventCreateData
{
    public string $organization_id;
}

/** OrganizationRunOutcome entity data model. */
class OrganizationRunOutcome
{
}

/** Request payload for OrganizationRunOutcome#create. */
class OrganizationRunOutcomeCreateData
{
    public string $organization_id;
}

/** OrganizationRunUsage entity data model. */
class OrganizationRunUsage
{
}

/** Request payload for OrganizationRunUsage#create. */
class OrganizationRunUsageCreateData
{
    public string $organization_id;
}

/** OrganizationSandbox entity data model. */
class OrganizationSandbox
{
}

/** Request payload for OrganizationSandbox#create. */
class OrganizationSandboxCreateData
{
    public string $organization_id;
}

/** OrganizationSecret entity data model. */
class OrganizationSecret
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $created_by;
    public mixed $current_version;
    public mixed $description;
    public string $env_key;
    public bool $expose_to_build;
    public bool $expose_to_ci;
    public mixed $hosted_app_id;
    public string $id;
    public mixed $last_accessed_at;
    public mixed $last_accessed_at_label;
    public mixed $last_accessed_by;
    public mixed $latest_version_number;
    public string $name;
    public mixed $organization_id;
    public mixed $owner_service_account_id;
    public mixed $rotation_policy;
    public string $scope_kind;
    public string $slug;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for OrganizationSecret#load. */
class OrganizationSecretLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationSecret#list. */
class OrganizationSecretListMatch
{
    public string $organization_id;
}

/** Request payload for OrganizationSecret#create. */
class OrganizationSecretCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationSecret#update. */
class OrganizationSecretUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationSecret#patch. */
class OrganizationSecretPatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationSecret#remove. */
class OrganizationSecretRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationServiceAccount entity data model. */
class OrganizationServiceAccount
{
    public ?string $id = null;
}

/** Request payload for OrganizationServiceAccount#load. */
class OrganizationServiceAccountLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationServiceAccount#list. */
class OrganizationServiceAccountListMatch
{
    public string $organization_id;
}

/** Request payload for OrganizationServiceAccount#create. */
class OrganizationServiceAccountCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationServiceAccount#update. */
class OrganizationServiceAccountUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationServiceAccount#patch. */
class OrganizationServiceAccountPatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationServiceAccount#remove. */
class OrganizationServiceAccountRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationSetting entity data model. */
class OrganizationSetting
{
    public mixed $concurrent_run_limit_override = null;
    public ?bool $customize_onboarding_packages = null;
    public mixed $daily_run_limit_override = null;
    public ?string $deployment_usage_visibility = null;
    public mixed $monthly_browser_minutes_limit_override = null;
    public mixed $monthly_budget_dollars = null;
    public ?string $name = null;
    public ?bool $onboarding_custom_pricing = null;
    public ?array $onboarding_package_keys = null;
}

/** Request payload for OrganizationSetting#update. */
class OrganizationSettingUpdateData
{
    public string $organization_id;
    public mixed $concurrent_run_limit_override = null;
    public ?bool $customize_onboarding_packages = null;
    public mixed $daily_run_limit_override = null;
    public ?string $deployment_usage_visibility = null;
    public mixed $monthly_browser_minutes_limit_override = null;
    public mixed $monthly_budget_dollars = null;
    public ?string $name = null;
    public ?bool $onboarding_custom_pricing = null;
    public ?array $onboarding_package_keys = null;
}

/** OrganizationSite entity data model. */
class OrganizationSite
{
    public ?string $id = null;
}

/** Request payload for OrganizationSite#list. */
class OrganizationSiteListMatch
{
    public string $organization_id;
    public string $native_agent_id;
}

/** Request payload for OrganizationSite#create. */
class OrganizationSiteCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationSite#update. */
class OrganizationSiteUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationSite#remove. */
class OrganizationSiteRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OrganizationSubscription entity data model. */
class OrganizationSubscription
{
}

/** Request payload for OrganizationSubscription#create. */
class OrganizationSubscriptionCreateData
{
    public string $organization_id;
}

/** OrganizationTool entity data model. */
class OrganizationTool
{
    public array $arguments;
    public string $native_agent_id;
    public string $tool;
}

/** Request payload for OrganizationTool#create. */
class OrganizationToolCreateData
{
    public string $organization_id;
    public array $arguments;
    public string $native_agent_id;
    public string $tool;
}

/** OrganizationWorkloadIdentity entity data model. */
class OrganizationWorkloadIdentity
{
    public ?string $id = null;
}

/** Request payload for OrganizationWorkloadIdentity#load. */
class OrganizationWorkloadIdentityLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationWorkloadIdentity#list. */
class OrganizationWorkloadIdentityListMatch
{
    public string $organization_id;
}

/** Request payload for OrganizationWorkloadIdentity#create. */
class OrganizationWorkloadIdentityCreateData
{
    public string $organization_id;
}

/** Request payload for OrganizationWorkloadIdentity#update. */
class OrganizationWorkloadIdentityUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationWorkloadIdentity#patch. */
class OrganizationWorkloadIdentityPatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for OrganizationWorkloadIdentity#remove. */
class OrganizationWorkloadIdentityRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** OtelIngest entity data model. */
class OtelIngest
{
}

/** Request payload for OtelIngest#create. */
class OtelIngestCreateData
{
}

/** Page entity data model. */
class Page
{
    public array $active_runs;
    public bool $checkout_required;
    public mixed $cli_signed_in_at;
    public array $counts;
    public mixed $demo_project;
    public array $environments;
    public bool $included_deep_scan;
    public mixed $onboarding_discovery = null;
    public array $organization;
    public array $permissions;
    public mixed $project;
    public ?array $pull_request_launch_options = null;
    public ?array $pull_requests = null;
    public array $repositories;
    public array $runs;
    public array $runs_pagination;
    public mixed $suggested_app_url;
    public bool $url_first_start;
}

/** Request payload for Page#load. */
class PageLoadMatch
{
    public string $organization_id;
    public ?int $page = null;
    public ?string $project_id = null;
    public ?string $query = null;
    public ?string $section = null;
    public ?string $status = null;
    public ?string $verify_environment_id = null;
}

/** PageAgent entity data model. */
class PageAgent
{
    public array $agents;
    public bool $can_edit_integration_connections;
    public bool $creation_enabled;
    public mixed $inbox = null;
    public array $integration_choices;
    public bool $integration_choices_truncated;
    public array $integration_selected;
    public ?array $model_choices = null;
    public mixed $new_configuration;
    public string $organization_id;
    public array $pagination;
    public mixed $pinned_agent;
    public array $platform_event_types;
    public array $repository_choices;
    public bool $repository_choices_truncated;
    public ?array $runtime_versions = null;
    public mixed $selected_agent;
    public mixed $selected_reference;
    public string $viewer_id;
}

/** Request payload for PageAgent#load. */
class PageAgentLoadMatch
{
    public string $organization_id;
    public ?string $agent = null;
    public ?string $agent_search = null;
    public ?string $agent_visibility = null;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** Request payload for PageAgent#list. */
class PageAgentListMatch
{
    public string $organization_id;
    public ?string $agent = null;
    public ?string $agent_search = null;
    public ?string $agent_visibility = null;
    public ?string $cursor = null;
    public ?string $integration_search = null;
    public ?int $limit = null;
}

/** Request payload for PageAgent#create. */
class PageAgentCreateData
{
    public string $organization_id;
    public mixed $agent_ids = null;
}

/** PageArtefact entity data model. */
class PageArtefact
{
    public mixed $artefact;
    public mixed $automation;
    public mixed $automation_invocation_id = null;
    public int $byte_size;
    public string $checksum_sha256;
    public array $comment_threads;
    public string $content_type;
    public mixed $created_at = null;
    public mixed $created_by_user_id = null;
    public mixed $description = null;
    public ?string $document_key = null;
    public mixed $draft;
    public ?string $entrypoint = null;
    public mixed $expires_at = null;
    public string $filename;
    public ?array $files = null;
    public mixed $harness = null;
    public mixed $harness_version = null;
    public string $id;
    public string $kind;
    public array $kinds;
    public mixed $model = null;
    public array $organization;
    public string $organization_id;
    public array $pagination;
    public array $permissions;
    public array $preview;
    public mixed $published_at = null;
    public mixed $published_at_label;
    public mixed $publisher;
    public mixed $repository;
    public mixed $repository_id = null;
    public ?string $selected_path = null;
    public string $slug;
    public string $source;
    public string $status;
    public string $title;
    public mixed $vcs_agent_checkpoint_id = null;
    public mixed $vcs_agent_session_id = null;
    public int $version;
    public array $versions;
    public string $view_url;
    public string $web_url;
}

/** Request payload for PageArtefact#load. */
class PageArtefactLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?string $file = null;
    public ?int $version = null;
    public ?int $versions_page = null;
}

/** Request payload for PageArtefact#list. */
class PageArtefactListMatch
{
    public string $organization_id;
    public ?string $author = null;
    public ?string $harness = null;
    public ?string $kind = null;
    public ?string $model = null;
    public ?int $page = null;
    public ?string $q = null;
    public ?string $repo = null;
    public ?string $slug = null;
    public ?string $source = null;
}

/** PageCiPipelineRun entity data model. */
class PageCiPipelineRun
{
    public mixed $error;
    public ?string $id = null;
    public array $jobs;
}

/** Request payload for PageCiPipelineRun#load. */
class PageCiPipelineRunLoadMatch
{
    public string $id;
    public string $pipeline_id;
}

/** PageProjectRun entity data model. */
class PageProjectRun
{
    public array $available_tests;
    public int $fix_scenario_count;
    public array $fix_scenarios;
    public int $fixable_count;
    public ?string $id = null;
    public array $pagination;
    public array $permissions;
    public mixed $preparation_reason;
    public array $project;
    public array $run;
    public array $scenario_runs;
    public mixed $selected_scenario_run;
    public string $web_path;
}

/** Request payload for PageProjectRun#load. */
class PageProjectRunLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $browser = null;
    public ?bool $detail = null;
    public ?int $page = null;
}

/** PageRepoVcCommit entity data model. */
class PageRepoVcCommit
{
    public mixed $commit;
    public string $diff_path;
    public ?string $id = null;
}

/** Request payload for PageRepoVcCommit#load. */
class PageRepoVcCommitLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?string $parent = null;
}

/** PagesBilling entity data model. */
class PagesBilling
{
    public array $addons;
    public mixed $breakdown;
    public mixed $budget;
    public bool $can_manage_contact;
    public bool $can_manage_extra_spend;
    public bool $can_manage_local_subscription;
    public bool $can_manage_payment_method;
    public bool $can_set_up_billing;
    public mixed $customer;
    public bool $deployment_usage_visible;
    public array $entitlements;
    public bool $extra_spend_enabled;
    public bool $feature_enabled;
    public string $organization_id;
    public mixed $package;
    public mixed $prepaid;
    public mixed $preview;
    public array $storage_usage;
    public array $stripe;
    public mixed $subscription;
    public array $token_account;
}

/** Request payload for PagesBilling#load. */
class PagesBillingLoadMatch
{
    public string $organization_id;
}

/** PagesGithubOnboarding entity data model. */
class PagesGithubOnboarding
{
    public array $onboarding;
    public array $organization;
}

/** Request payload for PagesGithubOnboarding#load. */
class PagesGithubOnboardingLoadMatch
{
    public string $organization_id;
    public ?string $github_app_installation_id = null;
    public ?string $github_import_batch_id = null;
}

/** PagesMember entity data model. */
class PagesMember
{
    public mixed $accepted_at;
    public mixed $accepted_by_user;
    public string $created_at;
    public mixed $created_at_label;
    public string $email;
    public ?string $email_delivery_status = null;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public string $id;
    public mixed $invite_url;
    public mixed $invited_by_user;
    public array $organization;
    public mixed $revoked_at;
    public string $role;
    public string $status;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for PagesMember#list. */
class PagesMemberListMatch
{
    public string $organization_id;
}

/** PagesProjectCredential entity data model. */
class PagesProjectCredential
{
    public mixed $browser_authentication = null;
    public mixed $composal_address;
    public bool $configured;
    public array $credential_keys;
    public mixed $description;
    public array $email_link_auth_origins;
    public bool $has_inbox;
    public string $id;
    public mixed $identity_provider;
    public mixed $instructions;
    public string $login_method;
    public string $login_url;
    public bool $managed;
    public bool $mfa_enabled;
    public string $name;
    public string $project_id;
    public string $provider_guidance;
    public bool $sign_in_verified;
    public mixed $sign_in_verified_at;
    public string $status;
    public string $updated_at;
    public string $username;
}

/** Request payload for PagesProjectCredential#list. */
class PagesProjectCredentialListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** PagesProjectPersona entity data model. */
class PagesProjectPersona
{
    public int $active_count;
    public array $credentials;
    public int $needs_attention_count;
    public array $permissions;
    public array $persona_states;
    public array $personas;
    public array $project;
}

/** Request payload for PagesProjectPersona#list. */
class PagesProjectPersonaListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** PagesProjectRun entity data model. */
class PagesProjectRun
{
    public string $environment_query;
    public array $environments;
    public bool $environments_has_more;
    public array $pagination;
    public array $runs;
    public mixed $selected_environment;
}

/** Request payload for PagesProjectRun#list. */
class PagesProjectRunListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $environment_id = null;
    public ?string $environment_query = null;
    public ?int $page = null;
    public ?string $query = null;
    public ?string $status = null;
    public ?string $trigger = null;
}

/** PagesProjectScenario entity data model. */
class PagesProjectScenario
{
    public mixed $base_url;
    public string $id;
    public mixed $kind;
    public string $name;
}

/** Request payload for PagesProjectScenario#list. */
class PagesProjectScenarioListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?int $limit = null;
    public ?string $sort = null;
}

/** PagesRegistry entity data model. */
class PagesRegistry
{
    public int $active_repository_count;
    public mixed $error;
    public array $pagination;
    public array $repositories;
    public int $repository_count;
}

/** Request payload for PagesRegistry#load. */
class PagesRegistryLoadMatch
{
    public string $organization_id;
    public ?int $page = null;
}

/** PagesSession entity data model. */
class PagesSession
{
    public ?string $adapter = null;
    public mixed $created_at;
    public ?string $cursor = null;
    public mixed $ended_at;
    public string $external_session_id;
    public array $facets;
    public ?string $from = null;
    public ?array $github_access_warnings = null;
    public string $harness;
    public string $id;
    public mixed $last_activity_at;
    public mixed $last_checkpoint_at;
    public ?int $limit = null;
    public array $markers;
    public ?int $max_bytes = null;
    public ?string $mode = null;
    public ?int $offset = null;
    public array $pagination;
    public ?string $query = null;
    public ?string $repo = null;
    public mixed $repository;
    public mixed $search = null;
    public ?bool $search_enabled = null;
    public mixed $session;
    public array $sessions;
    public mixed $started_at;
    public array $stats;
    public ?string $status = null;
    public mixed $title;
    public ?string $to = null;
    public mixed $token_stats;
    public mixed $transcript_index;
    public mixed $transcript_stats;
    public mixed $updated_at;
    public mixed $user;
    public ?string $user_id = null;
}

/** Request payload for PagesSession#load. */
class PagesSessionLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $around_event = null;
    public ?string $checkpoint = null;
    public ?string $event_digest = null;
}

/** Request payload for PagesSession#list. */
class PagesSessionListMatch
{
    public string $organization_id;
    public ?string $adapter = null;
    public ?string $from = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $repo = null;
    public ?string $session = null;
    public ?string $status = null;
    public ?string $to = null;
    public ?string $user_id = null;
}

/** Request payload for PagesSession#create. */
class PagesSessionCreateData
{
    public string $organization_id;
    public ?string $adapter = null;
    public ?string $cursor = null;
    public ?string $from = null;
    public ?int $limit = null;
    public ?int $max_bytes = null;
    public ?string $mode = null;
    public ?int $offset = null;
    public ?string $query = null;
    public ?string $repo = null;
    public ?string $status = null;
    public ?string $to = null;
    public ?string $user_id = null;
}

/** Pairing entity data model. */
class Pairing
{
    public ?string $id = null;
}

/** Request payload for Pairing#load. */
class PairingLoadMatch
{
    public string $id;
}

/** Request payload for Pairing#list. */
class PairingListMatch
{
    public ?string $id = null;
}

/** Request payload for Pairing#create. */
class PairingCreateData
{
}

/** PairingEvent entity data model. */
class PairingEvent
{
}

/** Request payload for PairingEvent#list. */
class PairingEventListMatch
{
    public string $pairing_id;
}

/** ParallelV1 entity data model. */
class ParallelV1
{
}

/** Request payload for ParallelV1#create. */
class ParallelV1CreateData
{
    public string $organization_id;
}

/** PatchsetDiff entity data model. */
class PatchsetDiff
{
    public array $files;
    public ?string $id = null;
    public array $patchset;
}

/** Request payload for PatchsetDiff#load. */
class PatchsetDiffLoadMatch
{
    public string $change_id;
    public string $id;
    public string $organization_id;
    public string $patchset_id;
    public string $repo_id;
}

/** PersonalAccessToken entity data model. */
class PersonalAccessToken
{
    public ?string $id = null;
}

/** Request payload for PersonalAccessToken#list. */
class PersonalAccessTokenListMatch
{
    public ?string $id = null;
}

/** Request payload for PersonalAccessToken#create. */
class PersonalAccessTokenCreateData
{
}

/** Request payload for PersonalAccessToken#remove. */
class PersonalAccessTokenRemoveMatch
{
    public string $id;
}

/** PreviewOperation entity data model. */
class PreviewOperation
{
}

/** Request payload for PreviewOperation#list. */
class PreviewOperationListMatch
{
    public string $app_id;
    public string $preview_id;
}

/** PreviewProfileSecretBinding entity data model. */
class PreviewProfileSecretBinding
{
    public string $env_key;
    public ?string $id = null;
    public ?string $mode = null;
    public ?string $secret_id = null;
    public ?string $secret_version_id = null;
}

/** Request payload for PreviewProfileSecretBinding#list. */
class PreviewProfileSecretBindingListMatch
{
    public string $app_id;
    public string $preview_profile_id;
}

/** Request payload for PreviewProfileSecretBinding#create. */
class PreviewProfileSecretBindingCreateData
{
    public string $app_id;
    public string $preview_profile_id;
    public string $env_key;
    public ?string $mode = null;
    public ?string $secret_id = null;
    public ?string $secret_version_id = null;
}

/** Request payload for PreviewProfileSecretBinding#remove. */
class PreviewProfileSecretBindingRemoveMatch
{
    public string $app_id;
    public string $id;
    public string $preview_profile_id;
}

/** PreviewSecret entity data model. */
class PreviewSecret
{
    public string $env_key;
    public ?string $id = null;
    public string $name;
    public string $slug;
    public string $value;
}

/** Request payload for PreviewSecret#create. */
class PreviewSecretCreateData
{
    public string $app_id;
    public string $preview_id;
    public string $env_key;
    public string $name;
    public string $slug;
    public string $value;
}

/** Request payload for PreviewSecret#remove. */
class PreviewSecretRemoveMatch
{
    public string $app_id;
    public string $id;
    public string $preview_id;
}

/** PreviewSharingApproval entity data model. */
class PreviewSharingApproval
{
    public array $approved_build_keys;
    public array $approved_build_secrets;
    public array $approved_default_configuration;
    public array $approved_default_secrets;
    public array $approved_source_keys;
    public ?array $build_keys = null;
    public ?array $build_secrets = null;
    public ?array $default_configuration = null;
    public ?array $default_secrets = null;
    public array $services;
    public int $snapshot_version;
    public ?array $source_keys = null;
}

/** Request payload for PreviewSharingApproval#list. */
class PreviewSharingApprovalListMatch
{
    public string $app_id;
    public string $preview_id;
}

/** Request payload for PreviewSharingApproval#create. */
class PreviewSharingApprovalCreateData
{
    public string $app_id;
    public string $preview_id;
    public ?array $build_keys = null;
    public ?array $build_secrets = null;
    public ?array $default_configuration = null;
    public ?array $default_secrets = null;
    public int $snapshot_version;
    public ?array $source_keys = null;
}

/** ProactiveAgentWaitlistEntry entity data model. */
class ProactiveAgentWaitlistEntry
{
    public string $email;
    public mixed $first_task = null;
    public mixed $invite_code = null;
    public int $places_per_referral;
    public int $position;
    public int $position_after_next_referral;
    public string $referral_code;
    public int $referral_count;
    public int $total;
    public mixed $website = null;
}

/** Request payload for ProactiveAgentWaitlistEntry#load. */
class ProactiveAgentWaitlistEntryLoadMatch
{
    public string $id;
}

/** Request payload for ProactiveAgentWaitlistEntry#create. */
class ProactiveAgentWaitlistEntryCreateData
{
    public string $email;
    public mixed $first_task = null;
    public mixed $invite_code = null;
    public mixed $website = null;
}

/** Product entity data model. */
class Product
{
    public array $activated_products;
    public ?bool $agents_only = null;
    public bool $can_activate_products;
    public string $created_at;
    public mixed $created_at_label;
    public bool $github_prs_authored_by_change_author;
    public string $id;
    public mixed $logo_url;
    public int $member_count;
    public string $name;
    public int $pending_invitation_count;
    public bool $personal;
    public string $product;
    public int $repository_count;
    public mixed $role;
    public string $sandbox_region;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public string $slug;
    public ?array $source_control_providers = null;
    public ?bool $source_ui_enabled = null;
    public string $timezone;
    public string $updated_at;
    public mixed $updated_at_label;
    public bool $verify_pr_scenario_writing_enabled;
}

/** Request payload for Product#create. */
class ProductCreateData
{
    public string $organization_id;
    public string $product;
}

/** ProductMapIdentityDecision entity data model. */
class ProductMapIdentityDecision
{
    public array $observations;
    public string $operation;
    public string $reason;
    public array $target;
}

/** Request payload for ProductMapIdentityDecision#create. */
class ProductMapIdentityDecisionCreateData
{
    public string $organization_id;
    public string $project_id;
    public array $observations;
    public string $operation;
    public string $reason;
    public array $target;
}

/** ProductMapJourney entity data model. */
class ProductMapJourney
{
    public mixed $default_variant_id = null;
    public string $goal;
    public string $id;
    public array $journey;
    public mixed $next_cursor;
    public mixed $preview = null;
    public array $scope;
    public string $title;
    public array $tree;
    public ?bool $tree_loaded = null;
    public int $variant_count;
    public array $variants;
}

/** Request payload for ProductMapJourney#load. */
class ProductMapJourneyLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $after = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?bool $include_tree = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
    public ?string $variant_id = null;
}

/** Request payload for ProductMapJourney#list. */
class ProductMapJourneyListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $after = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?bool $include_coverage = null;
    public ?string $journey_query = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
}

/** ProductMapJourneyReplay entity data model. */
class ProductMapJourneyReplay
{
    public mixed $actor_id;
    public bool $can_request_qualification;
    public string $created_at;
    public mixed $failure_code;
    public mixed $failure_message;
    public string $id;
    public mixed $preparation_receipt;
    public mixed $qualification;
    public string $qualification_status;
    public bool $replay_required;
    public string $review_reason;
    public mixed $run_id;
    public mixed $scenario_run_id;
    public string $source_digest;
    public string $status;
    public string $updated_at;
    public string $variant_id;
}

/** Request payload for ProductMapJourneyReplay#load. */
class ProductMapJourneyReplayLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProductMapJourneyReplay#create. */
class ProductMapJourneyReplayCreateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** ProductMapObservation entity data model. */
class ProductMapObservation
{
    public array $capture;
    public array $events;
    public string $evidence_id;
    public ?string $id = null;
    public string $observation_id;
    public array $scope;
    public mixed $state;
    public string $status;
}

/** Request payload for ProductMapObservation#load. */
class ProductMapObservationLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
}

/** ProductMapQuestion entity data model. */
class ProductMapQuestion
{
    public ?string $account_id = null;
    public ?string $area = null;
    public ?string $before = null;
    public array $claims;
    public bool $evidence_truncated;
    public string $model;
    public ?string $persona_id = null;
    public ?string $query = null;
    public string $question;
    public string $reasoning_effort;
    public ?string $revision_id = null;
    public array $scope;
    public ?string $since = null;
    public ?string $state_id = null;
    public string $status;
    public array $unknowns;
}

/** Request payload for ProductMapQuestion#create. */
class ProductMapQuestionCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public string $question;
    public ?string $revision_id = null;
    public ?string $since = null;
    public ?string $state_id = null;
}

/** ProductMapState entity data model. */
class ProductMapState
{
    public mixed $account_id;
    public array $attempts;
    public string $captured_at;
    public string $id;
    public array $incoming;
    public array $labels;
    public array $layout;
    public string $observation_id;
    public int $omitted_controls;
    public array $outgoing;
    public string $revision_id;
    public array $scope;
    public mixed $screenshot_url;
    public array $state;
    public bool $truncated;
    public string $url;
}

/** Request payload for ProductMapState#load. */
class ProductMapStateLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?bool $include_connection = null;
    public ?string $observation_id = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
}

/** Request payload for ProductMapState#list. */
class ProductMapStateListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $after = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
}

/** Project entity data model. */
class Project
{
    public mixed $archived_at;
    public mixed $context;
    public string $created_at;
    public array $credentials;
    public bool $demo;
    public array $documentation_urls;
    public array $environments;
    public string $execution_mode;
    public mixed $icon_url;
    public string $id;
    public array $identity_provider;
    public int $lock_version;
    public string $name;
    public array $network_connections;
    public string $organization_id;
    public array $overview;
    public array $permissions;
    public array $personas;
    public array $project;
    public array $pull_request_options;
    public array $pull_requests;
    public mixed $purpose;
    public array $runs;
    public array $scenario_history;
    public array $scenario_states;
    public array $scenarios;
    public ?bool $setup_required = null;
    public string $slug;
    public string $updated_at;
    public array $verifier_preferences;
    public int $version;
    public mixed $website_url;
}

/** Request payload for Project#load. */
class ProjectLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?bool $overview = null;
    public ?int $page = null;
    public ?string $query = null;
    public ?string $scenario_id = null;
    public ?string $status = null;
    public ?string $verify_environment_id = null;
    public ?string $view = null;
}

/** Request payload for Project#list. */
class ProjectListMatch
{
    public string $organization_id;
}

/** Request payload for Project#create. */
class ProjectCreateData
{
    public string $organization_id;
    public mixed $context = null;
    public ?array $documentation_urls = null;
    public ?string $execution_mode = null;
    public string $name;
    public mixed $purpose = null;
    public ?string $slug = null;
    public ?array $verifier_preferences = null;
    public mixed $website_url = null;
}

/** Request payload for Project#update. */
class ProjectUpdateData
{
    public string $id;
    public string $organization_id;
    public mixed $context = null;
    public ?array $documentation_urls = null;
    public ?string $execution_mode = null;
    public ?string $name = null;
    public mixed $purpose = null;
    public ?string $slug = null;
    public ?array $verifier_preferences = null;
    public ?int $version = null;
    public mixed $website_url = null;
}

/** Request payload for Project#patch. */
class ProjectPatchData
{
    public string $id;
    public string $organization_id;
    public mixed $context = null;
    public ?array $documentation_urls = null;
    public ?string $execution_mode = null;
    public ?string $name = null;
    public mixed $purpose = null;
    public ?string $slug = null;
    public ?array $verifier_preferences = null;
    public ?int $version = null;
    public mixed $website_url = null;
}

/** ProjectAndroidApk entity data model. */
class ProjectAndroidApk
{
    public array $android;
    public ?array $artifact_paths = null;
    public string $description;
    public string $image;
    public array $ios;
    public ?string $launch_command = null;
    public array $managed_binary;
    public ?string $platform = null;
    public ?string $provider = null;
    public ?string $setup_command = null;
}

/** Request payload for ProjectAndroidApk#create. */
class ProjectAndroidApkCreateData
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectCodeMap entity data model. */
class ProjectCodeMap
{
    public bool $can_scan;
    public string $commit_sha;
    public bool $configured;
    public mixed $error_code;
    public string $id;
    public string $name;
    public ?string $ref = null;
    public string $repository_id;
    public array $revision;
    public string $slug;
    public string $status;
}

/** Request payload for ProjectCodeMap#list. */
class ProjectCodeMapListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $ref = null;
    public ?string $repository_id = null;
}

/** Request payload for ProjectCodeMap#create. */
class ProjectCodeMapCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $ref = null;
    public string $repository_id;
}

/** ProjectEnvironment entity data model. */
class ProjectEnvironment
{
    public string $allowed_actions;
    public array $allowed_origins;
    public mixed $archived_at;
    public mixed $base_url;
    public bool $base_url_changeable;
    public ?string $binary = null;
    public bool $conversation_only_messaging;
    public string $created_at;
    public mixed $desktop;
    public string $execution_mode;
    public string $id;
    public mixed $imessage_number;
    public string $kind;
    public int $lock_version;
    public mixed $messaging_conversation;
    public mixed $messaging_problem;
    public mixed $messaging_source;
    public mixed $messaging_tester_number;
    public string $name;
    public string $project_id;
    public mixed $pull_request;
    public mixed $source_branch;
    public string $updated_at;
    public mixed $verify_network_connection_id;
    public int $version;
}

/** Request payload for ProjectEnvironment#load. */
class ProjectEnvironmentLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectEnvironment#list. */
class ProjectEnvironmentListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectEnvironment#create. */
class ProjectEnvironmentCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $allowed_actions = null;
    public ?array $allowed_origins = null;
    public mixed $base_url = null;
    public ?string $binary = null;
    public mixed $desktop = null;
    public mixed $imessage_number = null;
    public ?string $kind = null;
    public mixed $messaging_tester_number = null;
    public string $name;
}

/** Request payload for ProjectEnvironment#update. */
class ProjectEnvironmentUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $allowed_actions = null;
    public ?array $allowed_origins = null;
    public mixed $base_url = null;
    public ?string $binary = null;
    public mixed $imessage_number = null;
    public ?string $kind = null;
    public mixed $messaging_tester_number = null;
    public ?string $name = null;
    public mixed $verify_network_connection_id = null;
    public ?int $version = null;
}

/** Request payload for ProjectEnvironment#patch. */
class ProjectEnvironmentPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $allowed_actions = null;
    public ?array $allowed_origins = null;
    public mixed $base_url = null;
    public ?string $binary = null;
    public mixed $imessage_number = null;
    public ?string $kind = null;
    public mixed $messaging_tester_number = null;
    public ?string $name = null;
    public mixed $verify_network_connection_id = null;
    public ?int $version = null;
}

/** ProjectFinding entity data model. */
class ProjectFinding
{
    public mixed $deferred_until = null;
    public string $environment_name;
    public string $id;
    public string $last_seen_at;
    public bool $locked;
    public string $severity;
    public string $source;
    public string $source_title;
    public string $status;
    public string $title;
    public mixed $verification;
    public string $web_path;
}

/** Request payload for ProjectFinding#list. */
class ProjectFindingListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?int $page = null;
    public ?string $priority = null;
    public ?string $query = null;
    public ?string $run_id = null;
    public ?string $source = null;
    public ?string $state = null;
}

/** ProjectFixture entity data model. */
class ProjectFixture
{
    public array $assignments;
    public int $byte_size;
    public string $content_type;
    public array $credential_ids;
    public array $credentials;
    public array $environment_ids;
    public array $environments;
    public array $fixtures;
    public ?string $id = null;
    public int $lock_version;
    public string $name;
    public array $pagination;
    public array $permissions;
    public array $persona_ids;
    public array $personas;
    public array $project;
    public string $sha256;
    public string $url;
    public int $version;
}

/** Request payload for ProjectFixture#load. */
class ProjectFixtureLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectFixture#list. */
class ProjectFixtureListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $credential_id = null;
    public ?string $environment_id = null;
    public ?int $page = null;
    public ?string $persona_id = null;
    public ?string $q = null;
}

/** Request payload for ProjectFixture#create. */
class ProjectFixtureCreateData
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectFixture#update. */
class ProjectFixtureUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $credential_ids = null;
    public ?array $environment_ids = null;
    public ?string $name = null;
    public ?array $persona_ids = null;
    public ?int $version = null;
}

/** Request payload for ProjectFixture#patch. */
class ProjectFixturePatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $credential_ids = null;
    public ?array $environment_ids = null;
    public ?string $name = null;
    public ?array $persona_ids = null;
    public ?int $version = null;
}

/** Request payload for ProjectFixture#remove. */
class ProjectFixtureRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public int $version;
}

/** ProjectIosApp entity data model. */
class ProjectIosApp
{
    public array $android;
    public ?array $artifact_paths = null;
    public string $description;
    public string $image;
    public array $ios;
    public ?string $launch_command = null;
    public array $managed_binary;
    public ?string $platform = null;
    public ?string $provider = null;
    public ?string $setup_command = null;
}

/** Request payload for ProjectIosApp#create. */
class ProjectIosAppCreateData
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectMessagingConversation entity data model. */
class ProjectMessagingConversation
{
    public string $assistant_number;
    public int $attachment_limit;
    public int $attachment_max_bytes;
    public string $environment_name;
    public string $id;
    public bool $leased;
    public array $messages;
    public mixed $reconciled_at;
    public bool $retirable;
    public bool $seeded;
    public mixed $send_blocked_reason;
    public ?string $send_disposition = null;
    public mixed $send_error = null;
    public string $tester_number;
    public bool $unknown_send;
    public string $verify_environment_id;
}

/** Request payload for ProjectMessagingConversation#load. */
class ProjectMessagingConversationLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectMessagingConversation#create. */
class ProjectMessagingConversationCreateData
{
    public string $organization_id;
    public string $project_id;
    public string $assistant_number;
    public string $tester_number;
    public string $verify_environment_id;
}

/** Request payload for ProjectMessagingConversation#update. */
class ProjectMessagingConversationUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $assistant_number = null;
    public ?string $tester_number = null;
}

/** Request payload for ProjectMessagingConversation#patch. */
class ProjectMessagingConversationPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $assistant_number = null;
    public ?string $tester_number = null;
}

/** ProjectOverviewMetric entity data model. */
class ProjectOverviewMetric
{
    public array $counts;
}

/** Request payload for ProjectOverviewMetric#list. */
class ProjectOverviewMetricListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectOverviewPullRequest entity data model. */
class ProjectOverviewPullRequest
{
    public string $base_sha;
    public bool $can_verify;
    public mixed $comment_url;
    public bool $draft;
    public mixed $github_repository;
    public mixed $github_url;
    public string $head_sha;
    public string $id;
    public mixed $latest_created_at;
    public bool $latest_current;
    public mixed $latest_head_sha;
    public mixed $latest_reason;
    public mixed $latest_run_id;
    public mixed $latest_state;
    public int $number;
    public mixed $project_id;
    public mixed $project_slug;
    public string $provider;
    public string $repository_id;
    public string $request_label;
    public mixed $source_branch;
    public mixed $source_repository;
    public mixed $source_url;
    public string $state;
    public string $title;
    public string $updated_at;
    public string $web_path;
}

/** Request payload for ProjectOverviewPullRequest#list. */
class ProjectOverviewPullRequestListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectProductMap entity data model. */
class ProjectProductMap
{
}

/** Request payload for ProjectProductMap#load. */
class ProjectProductMapLoadMatch
{
    public string $organization_id;
    public string $project_id;
    public ?string $account_id = null;
    public ?string $area = null;
    public ?string $before = null;
    public ?string $persona_id = null;
    public ?string $query = null;
    public ?string $revision_id = null;
    public ?string $since = null;
    public ?string $source = null;
    public ?string $target = null;
    public ?string $compare_revision_id = null;
    public ?string $after = null;
    public ?string $view_id = null;
}

/** Request payload for ProjectProductMap#create. */
class ProjectProductMapCreateData
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectRecording entity data model. */
class ProjectRecording
{
    public array $browser;
    public string $created_at;
    public mixed $draft;
    public string $environment_id;
    public mixed $error;
    public int $event_count;
    public string $id;
    public string $persona_id;
    public string $phase;
    public bool $signed_in_during_recording;
    public ?string $start_path = null;
    public string $status;
    public string $updated_at;
}

/** Request payload for ProjectRecording#load. */
class ProjectRecordingLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectRecording#create. */
class ProjectRecordingCreateData
{
    public string $organization_id;
    public string $project_id;
    public string $environment_id;
    public string $persona_id;
    public ?string $start_path = null;
}

/** Request payload for ProjectRecording#remove. */
class ProjectRecordingRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** ProjectRunPlan entity data model. */
class ProjectRunPlan
{
    public mixed $archived_at;
    public mixed $base_url;
    public string $created_at;
    public array $dependencies;
    public string $id;
    public mixed $identity_probe;
    public mixed $kind;
    public int $lock_version;
    public string $name;
    public array $nodes;
    public mixed $preview;
    public string $project_id;
    public string $updated_at;
    public int $version;
}

/** Request payload for ProjectRunPlan#load. */
class ProjectRunPlanLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectRunPlan#list. */
class ProjectRunPlanListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?int $page = null;
}

/** Request payload for ProjectRunPlan#create. */
class ProjectRunPlanCreateData
{
    public string $organization_id;
    public string $project_id;
    public array $dependencies;
    public mixed $identity_probe;
    public string $name;
    public array $nodes;
}

/** Request payload for ProjectRunPlan#update. */
class ProjectRunPlanUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $dependencies = null;
    public mixed $identity_probe = null;
    public ?string $name = null;
    public ?array $nodes = null;
    public ?int $version = null;
}

/** Request payload for ProjectRunPlan#patch. */
class ProjectRunPlanPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $dependencies = null;
    public mixed $identity_probe = null;
    public ?string $name = null;
    public ?array $nodes = null;
    public ?int $version = null;
}

/** ProjectRunSchedule entity data model. */
class ProjectRunSchedule
{
    public array $credential_ids;
    public mixed $cron_expression = null;
    public string $environment_id;
    public ?string $environment_name = null;
    public array $history;
    public string $id;
    public array $labels;
    public int $lock_version;
    public string $name;
    public string $next_run_at;
    public ?string $notification_channel = null;
    public int $scenario_count;
    public string $selection_mode;
    public mixed $slack_subscription_id = null;
    public mixed $source_scenario_id = null;
    public string $state;
    public string $time_of_day;
    public string $time_zone;
    public int $version;
}

/** Request payload for ProjectRunSchedule#load. */
class ProjectRunScheduleLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectRunSchedule#list. */
class ProjectRunScheduleListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for ProjectRunSchedule#create. */
class ProjectRunScheduleCreateData
{
    public string $organization_id;
    public string $project_id;
    public array $credential_ids;
    public string $environment_id;
    public array $labels;
    public string $name;
    public ?string $notification_channel = null;
    public string $selection_mode;
    public mixed $slack_subscription_id = null;
    public string $state;
    public string $time_of_day;
    public string $time_zone;
}

/** Request payload for ProjectRunSchedule#update. */
class ProjectRunScheduleUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $credential_ids = null;
    public ?string $environment_id = null;
    public ?array $labels = null;
    public ?string $name = null;
    public ?string $notification_channel = null;
    public ?string $selection_mode = null;
    public mixed $slack_subscription_id = null;
    public ?string $state = null;
    public ?string $time_of_day = null;
    public ?string $time_zone = null;
    public ?int $version = null;
}

/** Request payload for ProjectRunSchedule#patch. */
class ProjectRunSchedulePatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $credential_ids = null;
    public ?string $environment_id = null;
    public ?array $labels = null;
    public ?string $name = null;
    public ?string $notification_channel = null;
    public ?string $selection_mode = null;
    public mixed $slack_subscription_id = null;
    public ?string $state = null;
    public ?string $time_of_day = null;
    public ?string $time_zone = null;
    public ?int $version = null;
}

/** ProjectScenarioOption entity data model. */
class ProjectScenarioOption
{
    public array $environments;
    public array $permissions;
    public array $personas;
    public array $project;
    public array $scenario_states;
    public array $scenarios;
    public mixed $schedule_options = null;
    public ?array $schedules = null;
}

/** Request payload for ProjectScenarioOption#list. */
class ProjectScenarioOptionListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** ProjectScenarioRow entity data model. */
class ProjectScenarioRow
{
    public int $actor_count;
    public int $dependency_count;
    public array $health;
    public string $id;
    public array $labels;
    public string $name;
    public string $persona_id;
    public bool $selectable_for_run;
    public int $step_count;
}

/** Request payload for ProjectScenarioRow#list. */
class ProjectScenarioRowListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?int $page = null;
    public ?string $sort = null;
    public ?string $state = null;
}

/** ProjectSetting entity data model. */
class ProjectSetting
{
    public array $available_messaging_environments;
    public array $messaging_conversations;
    public bool $messaging_enabled;
    public array $permissions;
    public array $project;
    public array $tester_numbers;
}

/** Request payload for ProjectSetting#list. */
class ProjectSettingListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** PullRequest entity data model. */
class PullRequest
{
    public array $available_tests;
    public ?string $branch = null;
    public ?bool $cleanup_only = null;
    public mixed $current_run = null;
    public array $findings;
    public ?string $head_sha = null;
    public ?string $id = null;
    public string $idempotency_key;
    public ?string $imessage_number = null;
    public ?int $number = null;
    public array $pagination;
    public array $permissions;
    public bool $preview_cleanup_ready;
    public mixed $preview_url = null;
    public mixed $project = null;
    public ?string $project_id = null;
    public array $pull_request;
    public ?string $repository_id = null;
    public array $runs;
}

/** Request payload for PullRequest#load. */
class PullRequestLoadMatch
{
    public string $id;
    public string $organization_id;
    public ?int $page = null;
}

/** Request payload for PullRequest#create. */
class PullRequestCreateData
{
    public string $organization_id;
    public ?string $branch = null;
    public ?bool $cleanup_only = null;
    public ?string $head_sha = null;
    public string $idempotency_key;
    public ?string $imessage_number = null;
    public ?int $number = null;
    public mixed $preview_url = null;
    public ?string $project_id = null;
    public ?string $repository_id = null;
}

/** Request payload for PullRequest#remove. */
class PullRequestRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** PullRequestAction entity data model. */
class PullRequestAction
{
    public string $action_name;
    public ?string $body = null;
    public ?string $comment_id = null;
    public ?array $comments = null;
    public ?string $event = null;
    public ?string $expected_head_sha = null;
    public mixed $id = null;
    public ?string $label = null;
    public ?int $line = null;
    public mixed $node_id = null;
    public string $operation_key;
    public ?string $path = null;
    public ?string $run_id = null;
    public ?string $side = null;
    public ?int $start_line = null;
    public ?string $start_side = null;
    public ?string $thread_id = null;
}

/** Request payload for PullRequestAction#create. */
class PullRequestActionCreateData
{
    public string $number;
    public string $organization_id;
    public string $pull_request_id;
    public string $action_name;
    public ?string $body = null;
    public ?string $comment_id = null;
    public ?array $comments = null;
    public ?string $event = null;
    public ?string $expected_head_sha = null;
    public ?string $label = null;
    public ?int $line = null;
    public string $operation_key;
    public ?string $path = null;
    public ?string $run_id = null;
    public ?string $side = null;
    public ?int $start_line = null;
    public ?string $start_side = null;
    public ?string $thread_id = null;
}

/** PullRequestMagicMerge entity data model. */
class PullRequestMagicMerge
{
}

/** Request payload for PullRequestMagicMerge#create. */
class PullRequestMagicMergeCreateData
{
    public string $number;
    public string $organization_id;
    public string $pull_request_id;
    public mixed $expected_base_sha = null;
    public mixed $expected_head_sha = null;
    public mixed $idempotency_key = null;
    public mixed $mode = null;
    public mixed $resolutions = null;
}

/** PullRequestSetting entity data model. */
class PullRequestSetting
{
    public mixed $app_preview_profile_id = null;
    public mixed $app_service_id = null;
    public array $bots;
    public bool $browser_options_available;
    public mixed $ci_preview;
    public ?int $concurrency = null;
    public mixed $configured_repository;
    public bool $demo_videos;
    public ?bool $demo_videos_enabled = null;
    public mixed $deployment;
    public ?string $deployment_environment = null;
    public bool $enabled;
    public string $environment;
    public array $environments;
    public ?bool $github_check_enabled = null;
    public array $hosting_presets;
    public string $id;
    public mixed $imessage_comment_prefix;
    public mixed $imessage_number;
    public string $imessage_number_source;
    public array $limits;
    public mixed $link_pattern;
    public mixed $links;
    public ?int $max_seconds = null;
    public bool $messaging_enabled;
    public mixed $messaging_tester_number;
    public ?array $non_product_paths = null;
    public array $permissions;
    public bool $pr_check;
    public ?string $preview_access = null;
    public ?array $preview_comment_authors = null;
    public ?string $preview_comment_pattern = null;
    public mixed $preview_comment_wildcard;
    public mixed $preview_profile;
    public array $preview_profiles;
    public string $previews;
    public string $project_id;
    public array $project_repositories;
    public string $provider;
    public array $repositories;
    public string $repository;
    public string $repository_id;
    public string $repository_kind;
    public mixed $selected_repository;
    public mixed $service;
    public array $settings;
    public mixed $setup;
    public array $setup_defaults;
    public string $source_repository;
    public string $target_mode;
    public array $tester_numbers;
    public string $trigger_label;
    public ?bool $trigger_on_comment = null;
    public ?bool $trigger_on_label = null;
    public ?bool $trigger_on_push = null;
    public ?bool $trigger_on_ready = null;
    public array $triggers;
    public string $verify_environment_id;
    public bool $write_scenarios;
}

/** Request payload for PullRequestSetting#list. */
class PullRequestSettingListMatch
{
    public string $organization_id;
    public ?string $project_id = null;
    public ?string $provider = null;
    public ?string $repository_id = null;
}

/** Request payload for PullRequestSetting#create. */
class PullRequestSettingCreateData
{
    public string $organization_id;
    public mixed $app_preview_profile_id = null;
    public mixed $app_service_id = null;
    public array $bots;
    public ?int $concurrency = null;
    public bool $demo_videos;
    public ?bool $demo_videos_enabled = null;
    public mixed $deployment;
    public ?string $deployment_environment = null;
    public bool $enabled;
    public string $environment;
    public ?bool $github_check_enabled = null;
    public mixed $imessage_comment_prefix;
    public mixed $imessage_number;
    public string $imessage_number_source;
    public array $limits;
    public mixed $link_pattern;
    public mixed $links;
    public ?int $max_seconds = null;
    public mixed $messaging_tester_number;
    public ?array $non_product_paths = null;
    public bool $pr_check;
    public ?string $preview_access = null;
    public ?array $preview_comment_authors = null;
    public ?string $preview_comment_pattern = null;
    public mixed $preview_comment_wildcard;
    public mixed $preview_profile;
    public string $previews;
    public string $project_id;
    public string $provider;
    public string $repository;
    public string $repository_id;
    public string $repository_kind;
    public mixed $service;
    public string $target_mode;
    public string $trigger_label;
    public ?bool $trigger_on_comment = null;
    public ?bool $trigger_on_label = null;
    public ?bool $trigger_on_push = null;
    public ?bool $trigger_on_ready = null;
    public array $triggers;
    public string $verify_environment_id;
    public bool $write_scenarios;
}

/** PullRequestSettingAddRepository entity data model. */
class PullRequestSettingAddRepository
{
    public string $project_id;
    public ?bool $replace = null;
    public array $repositories;
}

/** Request payload for PullRequestSettingAddRepository#create. */
class PullRequestSettingAddRepositoryCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?bool $replace = null;
    public array $repositories;
}

/** PullRequestSettingDetectComment entity data model. */
class PullRequestSettingDetectComment
{
    public ?array $bots = null;
    public ?string $deployment = null;
    public ?string $example_url = null;
    public ?string $imessage_comment_prefix = null;
    public mixed $imessage_number = null;
    public string $kind;
    public ?string $link_pattern = null;
    public string $project_id;
    public ?string $provider = null;
    public ?string $repository_id = null;
    public ?int $request_number = null;
}

/** Request payload for PullRequestSettingDetectComment#create. */
class PullRequestSettingDetectCommentCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $repository_id = null;
}

/** PullRequestTranscript entity data model. */
class PullRequestTranscript
{
    public string $adapter;
    public mixed $created_at;
    public mixed $ended_at;
    public string $external_session_id;
    public string $harness;
    public string $id;
    public mixed $last_activity_at;
    public mixed $last_checkpoint_at;
    public mixed $repository;
    public mixed $started_at;
    public array $stats;
    public string $status;
    public mixed $title;
    public mixed $updated_at;
    public mixed $user;
}

/** Request payload for PullRequestTranscript#list. */
class PullRequestTranscriptListMatch
{
    public string $organization_id;
    public string $pull_request_id;
    public string $repo_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?bool $paginated = null;
}

/** PullZone entity data model. */
class PullZone
{
    public string $id;
    public string $name;
    public string $slug;
}

/** Request payload for PullZone#list. */
class PullZoneListMatch
{
    public string $organization_id;
    public ?string $app = null;
}

/** Recorder entity data model. */
class Recorder
{
    public string $id;
    public string $name;
    public string $slug;
}

/** Request payload for Recorder#load. */
class RecorderLoadMatch
{
    public string $organization_id;
}

/** Registry entity data model. */
class Registry
{
}

/** Request payload for Registry#load. */
class RegistryLoadMatch
{
}

/** RegistryV2 entity data model. */
class RegistryV2
{
}

/** Request payload for RegistryV2#create. */
class RegistryV2CreateData
{
}

/** RelayAgentConnection entity data model. */
class RelayAgentConnection
{
    public string $agent_card_url;
    public string $auth_scheme;
    public bool $can_configure;
    public bool $can_disconnect;
    public bool $can_setup;
    public array $connection;
    public mixed $credential = null;
    public mixed $error_code;
    public int $expected_generation;
    public int $generation;
    public string $id;
    public string $name;
    public mixed $remote_agent;
    public string $requester_id;
    public mixed $retired_at;
    public mixed $revoked_at;
    public string $scope_key;
    public mixed $source_operation_id;
    public string $state;
}

/** Request payload for RelayAgentConnection#load. */
class RelayAgentConnectionLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for RelayAgentConnection#list. */
class RelayAgentConnectionListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $selected_connection_id = null;
}

/** Request payload for RelayAgentConnection#create. */
class RelayAgentConnectionCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $agent_card_url;
    public string $auth_scheme;
    public mixed $credential = null;
    public string $name;
    public mixed $remote_agent = null;
    public mixed $source_operation_id = null;
}

/** Request payload for RelayAgentConnection#update. */
class RelayAgentConnectionUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public ?string $auth_scheme = null;
    public mixed $credential = null;
    public ?int $expected_generation = null;
    public ?string $name = null;
    public mixed $remote_agent = null;
}

/** Request payload for RelayAgentConnection#remove. */
class RelayAgentConnectionRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** RelayAgentLocalThread entity data model. */
class RelayAgentLocalThread
{
    public ?string $id = null;
}

/** Request payload for RelayAgentLocalThread#remove. */
class RelayAgentLocalThreadRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** RelaySignal entity data model. */
class RelaySignal
{
}

/** Request payload for RelaySignal#create. */
class RelaySignalCreateData
{
}

/** ReleaseRollout entity data model. */
class ReleaseRollout
{
    public ?string $id = null;
}

/** Request payload for ReleaseRollout#load. */
class ReleaseRolloutLoadMatch
{
    public string $id;
    public string $release_id;
}

/** Request payload for ReleaseRollout#list. */
class ReleaseRolloutListMatch
{
    public string $release_id;
}

/** Request payload for ReleaseRollout#create. */
class ReleaseRolloutCreateData
{
    public string $release_id;
}

/** Repo entity data model. */
class Repo
{
    public bool $can_retry_import;
    public bool $can_retry_sync;
    public mixed $disclaimer;
    public bool $federated_in_home;
    public mixed $github_repository;
    public string $icon_name;
    public string $id;
    public mixed $import_item_id;
    public bool $is_home;
    public string $name;
    public mixed $remote_repository = null;
    public mixed $root_path;
    public string $slug;
    public mixed $sync_error_message;
    public ?string $sync_provider = null;
    public string $sync_status;
}

/** Request payload for Repo#load. */
class RepoLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Repo#list. */
class RepoListMatch
{
    public string $organization_id;
    public ?string $direction = null;
    public ?int $page = null;
    public ?string $q = null;
    public ?string $sort = null;
}

/** Request payload for Repo#remove. */
class RepoRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** RepoAccessToken entity data model. */
class RepoAccessToken
{
    public array $access_token;
    public bool $active;
    public string $created_at;
    public mixed $created_at_label;
    public ?string $credential_purpose = null;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public mixed $expires_in_days = null;
    public string $id;
    public mixed $last_used_at;
    public mixed $last_used_at_label;
    public string $name;
    public ?string $permission_level = null;
    public string $plain_text_token;
    public mixed $revoked_at;
    public mixed $revoked_at_label;
    public string $token_preview;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for RepoAccessToken#list. */
class RepoAccessTokenListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoAccessToken#create. */
class RepoAccessTokenCreateData
{
    public string $organization_id;
    public string $repo_id;
    public ?string $credential_purpose = null;
    public mixed $expires_in_days = null;
    public string $name;
    public ?string $permission_level = null;
}

/** Request payload for RepoAccessToken#remove. */
class RepoAccessTokenRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** RepoAction entity data model. */
class RepoAction
{
    public array $pipeline;
    public array $run;
}

/** Request payload for RepoAction#list. */
class RepoActionListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $pipeline_id = null;
    public ?string $range = null;
}

/** RepoAgentCheckpoint entity data model. */
class RepoAgentCheckpoint
{
    public ?string $id = null;
}

/** Request payload for RepoAgentCheckpoint#load. */
class RepoAgentCheckpointLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** RepoAgentSession entity data model. */
class RepoAgentSession
{
    public ?string $adapter = null;
    public array $agent_session;
    public ?string $external_session_id = null;
    public ?string $id = null;
    public ?string $status = null;
    public mixed $title = null;
}

/** Request payload for RepoAgentSession#load. */
class RepoAgentSessionLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoAgentSession#list. */
class RepoAgentSessionListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoAgentSession#create. */
class RepoAgentSessionCreateData
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoAgentSession#update. */
class RepoAgentSessionUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoAgentSession#patch. */
class RepoAgentSessionPatchData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?array $agent_session = null;
}

/** RepoBookmarkProtection entity data model. */
class RepoBookmarkProtection
{
    public array $actor_policy;
    public string $bypass_mode;
    public string $created_at;
    public mixed $created_by_user_id;
    public bool $enabled;
    public string $id;
    public string $name;
    public string $organization_id;
    public int $priority;
    public string $repository_id;
    public array $requirements;
    public string $target_kind;
    public mixed $target_pattern;
    public string $updated_at;
    public mixed $updated_by_user_id;
}

/** Request payload for RepoBookmarkProtection#load. */
class RepoBookmarkProtectionLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoBookmarkProtection#list. */
class RepoBookmarkProtectionListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoBookmarkProtection#create. */
class RepoBookmarkProtectionCreateData
{
    public string $organization_id;
    public string $repo_id;
    public ?array $actor_policy = null;
    public ?string $bypass_mode = null;
    public ?bool $enabled = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?array $requirements = null;
    public ?string $target_kind = null;
    public mixed $target_pattern = null;
}

/** Request payload for RepoBookmarkProtection#update. */
class RepoBookmarkProtectionUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?array $actor_policy = null;
    public ?string $bypass_mode = null;
    public ?bool $enabled = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?array $requirements = null;
    public ?string $target_kind = null;
    public mixed $target_pattern = null;
}

/** Request payload for RepoBookmarkProtection#patch. */
class RepoBookmarkProtectionPatchData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?array $actor_policy = null;
    public ?string $bypass_mode = null;
    public ?bool $enabled = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?array $requirements = null;
    public ?string $target_kind = null;
    public mixed $target_pattern = null;
}

/** Request payload for RepoBookmarkProtection#remove. */
class RepoBookmarkProtectionRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** RepoBookmarkProtectionEvent entity data model. */
class RepoBookmarkProtectionEvent
{
    public string $action;
    public string $actor_kind;
    public mixed $actor_label;
    public mixed $actor_user_id;
    public string $bookmark_name;
    public mixed $bookmark_protection_rule_id;
    public string $created_at;
    public mixed $created_at_label;
    public string $decision;
    public string $id;
    public mixed $intent;
    public array $metadata;
    public mixed $new_target;
    public mixed $old_target;
    public string $organization_id;
    public array $reason_codes;
    public string $repository_id;
    public mixed $source_request_id;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for RepoBookmarkProtectionEvent#list. */
class RepoBookmarkProtectionEventListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $bookmark = null;
    public ?int $limit = null;
}

/** RepoCloudWorkspaceBackup entity data model. */
class RepoCloudWorkspaceBackup
{
    public ?string $id = null;
}

/** Request payload for RepoCloudWorkspaceBackup#load. */
class RepoCloudWorkspaceBackupLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoCloudWorkspaceBackup#list. */
class RepoCloudWorkspaceBackupListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoCloudWorkspaceBackup#create. */
class RepoCloudWorkspaceBackupCreateData
{
    public string $organization_id;
    public string $repo_id;
}

/** RepoCodeRule entity data model. */
class RepoCodeRule
{
    public mixed $active_revision_number;
    public array $capabilities;
    public mixed $code_rule;
    public string $created_at;
    public array $definition;
    public bool $draft_pending;
    public bool $enabled;
    public int $expected_version;
    public string $id;
    public int $latest_revision_number;
    public string $name;
    public array $repository;
    public array $scope;
    public string $slug;
    public int $state_version;
    public string $updated_at;
    public string $web_url;
}

/** Request payload for RepoCodeRule#load. */
class RepoCodeRuleLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoCodeRule#list. */
class RepoCodeRuleListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $rule = null;
}

/** Request payload for RepoCodeRule#create. */
class RepoCodeRuleCreateData
{
    public string $organization_id;
    public string $repo_id;
    public array $definition;
}

/** Request payload for RepoCodeRule#update. */
class RepoCodeRuleUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?array $definition = null;
    public ?int $expected_version = null;
}

/** Request payload for RepoCodeRule#patch. */
class RepoCodeRulePatchData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?array $definition = null;
    public ?int $expected_version = null;
}

/** Request payload for RepoCodeRule#remove. */
class RepoCodeRuleRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** RepoSetting entity data model. */
class RepoSetting
{
    public bool $active;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $description;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public string $icon_name;
    public string $id;
    public mixed $last_used_at;
    public mixed $last_used_at_label;
    public string $merge_authority;
    public string $name;
    public string $organization_id;
    public string $permission_level;
    public mixed $revoked_at;
    public mixed $revoked_at_label;
    public string $slug;
    public string $status;
    public string $token_preview;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for RepoSetting#list. */
class RepoSettingListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoSetting#update. */
class RepoSettingUpdateData
{
    public string $organization_id;
    public string $repo_id;
    public mixed $description = null;
    public ?string $icon_name = null;
    public ?string $name = null;
    public ?string $status = null;
}

/** RepoStat entity data model. */
class RepoStat
{
    public array $repository_stats;
}

/** Request payload for RepoStat#list. */
class RepoStatListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for RepoStat#create. */
class RepoStatCreateData
{
    public string $organization_id;
    public string $repo_id;
    public array $repository_stats;
}

/** RepoVc entity data model. */
class RepoVc
{
}

/** Request payload for RepoVc#load. */
class RepoVcLoadMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $path = null;
    public ?string $ref = null;
}

/** Request payload for RepoVc#create. */
class RepoVcCreateData
{
    public string $organization_id;
    public string $repo_id;
    public mixed $from = null;
    public mixed $into = null;
}

/** Request payload for RepoVc#update. */
class RepoVcUpdateData
{
    public string $organization_id;
    public string $repo_id;
    public mixed $auto_land_enabled = null;
    public mixed $expected_version = null;
    public mixed $github_merge_gate = null;
    public mixed $merge_authority = null;
    public mixed $merge_github_repository_connection_id = null;
    public mixed $queue_concurrency = null;
    public mixed $queue_validation_mode = null;
}

/** RepoVcCommit entity data model. */
class RepoVcCommit
{
    public string $name;
    public string $target_commit_id;
}

/** Request payload for RepoVcCommit#list. */
class RepoVcCommitListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $page = null;
    public ?string $path = null;
    public ?string $q = null;
    public string $ref;
}

/** ReportReplay entity data model. */
class ReportReplay
{
    public string $agent_id;
    public string $generated_at;
    public ?string $id = null;
    public array $recording;
    public array $replay_steps;
}

/** Request payload for ReportReplay#load. */
class ReportReplayLoadMatch
{
    public string $exploration_id;
    public string $id;
    public string $organization_id;
    public ?string $generated_at = null;
    public ?string $project_id = null;
}

/** ReportScenario entity data model. */
class ReportScenario
{
    public string $environment_name;
    public string $goal;
    public string $id;
    public string $mode;
    public array $permissions;
    public mixed $project_id;
    public array $related_explorations;
    public array $report;
    public bool $saves_scenarios;
    public array $scenario_generation;
    public string $status;
}

/** Request payload for ReportScenario#create. */
class ReportScenarioCreateData
{
    public string $exploration_id;
    public string $organization_id;
    public ?string $project_id = null;
}

/** RepositoryAccess entity data model. */
class RepositoryAccess
{
}

/** Request payload for RepositoryAccess#load. */
class RepositoryAccessLoadMatch
{
    public ?string $organization_slug = null;
}

/** Request payload for RepositoryAccess#create. */
class RepositoryAccessCreateData
{
}

/** RepositoryAccessResolve entity data model. */
class RepositoryAccessResolve
{
    public string $default_branch;
    public string $git_auth_username;
    public mixed $git_https_clone_url;
    public bool $git_https_supported;
    public ?array $github_access_warnings = null;
    public ?string $id = null;
    public string $membership_role;
    public string $organization_id;
    public string $organization_name;
    public string $organization_slug;
    public string $repository_id;
    public string $repository_name;
    public string $repository_slug;
}

/** Request payload for RepositoryAccessResolve#load. */
class RepositoryAccessResolveLoadMatch
{
    public string $id;
    public string $resolve_id;
}

/** RepositoryEvent entity data model. */
class RepositoryEvent
{
}

/** Request payload for RepositoryEvent#create. */
class RepositoryEventCreateData
{
}

/** RepositoryImport entity data model. */
class RepositoryImport
{
    public bool $can_manage_connections;
    public array $github_imports;
    public array $github_installations;
    public bool $gitlab_configured;
    public array $gitlab_imports;
    public array $gitlab_integrations;
    public mixed $gitlab_redirect_uri;
    public bool $gitlab_self_managed_available;
    public array $inventory_errors;
    public string $organization_id;
    public array $repositories;
}

/** Request payload for RepositoryImport#load. */
class RepositoryImportLoadMatch
{
    public string $organization_id;
    public ?bool $accounts_only = null;
    public ?string $search = null;
}

/** RepositoryImportSession entity data model. */
class RepositoryImportSession
{
    public ?string $action_required = null;
    public ?string $authorization_endpoint = null;
    public bool $can_authorize_github;
    public mixed $client_name;
    public mixed $client_version;
    public string $created_at;
    public mixed $error_message;
    public string $expires_at;
    public array $git_imports;
    public mixed $github_app_installation_id;
    public bool $github_connected;
    public string $id;
    public string $idempotency_key;
    public string $organization_id;
    public string $organization_slug;
    public string $status;
    public string $updated_at;
}

/** Request payload for RepositoryImportSession#load. */
class RepositoryImportSessionLoadMatch
{
    public string $id;
}

/** Request payload for RepositoryImportSession#create. */
class RepositoryImportSessionCreateData
{
    public string $organization_id;
    public mixed $client_name = null;
    public mixed $client_version = null;
    public mixed $github_app_installation_id = null;
    public string $idempotency_key;
}

/** RepositoryImportSessionRepository entity data model. */
class RepositoryImportSessionRepository
{
    public mixed $default_branch;
    public string $full_name;
    public string $name;
    public string $owner;
    public bool $private;
    public mixed $reason = null;
    public bool $selectable;
    public string $status;
    public string $visibility;
}

/** Request payload for RepositoryImportSessionRepository#list. */
class RepositoryImportSessionRepositoryListMatch
{
    public string $repository_import_session_id;
    public ?string $q = null;
}

/** RepositoryImportSessionSelection entity data model. */
class RepositoryImportSessionSelection
{
    public mixed $repositories;
}

/** Request payload for RepositoryImportSessionSelection#create. */
class RepositoryImportSessionSelectionCreateData
{
    public string $repository_import_session_id;
    public mixed $repositories;
}

/** RepositorySandboxEnvironment entity data model. */
class RepositorySandboxEnvironment
{
    public ?string $id = null;
}

/** Request payload for RepositorySandboxEnvironment#load. */
class RepositorySandboxEnvironmentLoadMatch
{
    public string $id;
    public string $repository_id;
}

/** Request payload for RepositorySandboxEnvironment#create. */
class RepositorySandboxEnvironmentCreateData
{
    public string $repository_id;
}

/** RoderCodeRepair entity data model. */
class RoderCodeRepair
{
    public string $base_sha;
    public bool $cancel_requested;
    public mixed $failure_code;
    public string $id;
    public string $launch_state;
    public string $organization_id;
    public string $repository_slug;
    public mixed $roder_thread_id;
    public mixed $roder_turn_id;
    public string $scenario_run_id;
    public mixed $task;
    public string $trigger_kind;
}

/** Request payload for RoderCodeRepair#load. */
class RoderCodeRepairLoadMatch
{
    public string $id;
}

/** Request payload for RoderCodeRepair#list. */
class RoderCodeRepairListMatch
{
    public string $scenario_run_id;
}

/** Request payload for RoderCodeRepair#create. */
class RoderCodeRepairCreateData
{
    public string $base_sha;
    public string $organization_id;
    public string $repository_slug;
    public string $scenario_run_id;
}

/** RoderCodeRepairSetting entity data model. */
class RoderCodeRepairSetting
{
    public bool $available;
    public int $daily_limit;
    public bool $enabled;
    public mixed $enabled_at;
    public mixed $operator_user_id;
    public string $organization_id;
    public mixed $repository_slug;
}

/** Request payload for RoderCodeRepairSetting#list. */
class RoderCodeRepairSettingListMatch
{
    public string $organization_id;
}

/** Request payload for RoderCodeRepairSetting#create. */
class RoderCodeRepairSettingCreateData
{
    public bool $enabled;
    public string $organization_id;
    public mixed $repository_slug = null;
}

/** RoderMachine entity data model. */
class RoderMachine
{
    public ?string $id = null;
}

/** Request payload for RoderMachine#update. */
class RoderMachineUpdateData
{
    public string $id;
}

/** RoderRun entity data model. */
class RoderRun
{
}

/** Request payload for RoderRun#create. */
class RoderRunCreateData
{
    public mixed $events = null;
}

/** RoderWorkspaceCredential entity data model. */
class RoderWorkspaceCredential
{
    public string $api_token;
    public string $author_email;
    public string $author_name;
    public string $clone_url;
    public string $default_branch;
    public string $expires_at;
    public string $organization_id;
    public string $repository_id;
    public string $repository_slug;
    public string $repository_spec;
    public int $required_lifetime_seconds;
    public string $token;
    public string $username;
}

/** Request payload for RoderWorkspaceCredential#create. */
class RoderWorkspaceCredentialCreateData
{
    public int $required_lifetime_seconds;
}

/** RunArtifact entity data model. */
class RunArtifact
{
}

/** Request payload for RunArtifact#list. */
class RunArtifactListMatch
{
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for RunArtifact#create. */
class RunArtifactCreateData
{
    public string $pipeline_id;
    public string $run_id;
}

/** RunJob entity data model. */
class RunJob
{
    public bool $active;
    public bool $allow_failure;
    public mixed $cache_archive_observations;
    public string $ci_pipeline_run_id;
    public mixed $ci_runner_id;
    public string $created_at;
    public mixed $dependencies_csv;
    public int $display_id;
    public mixed $environment_csv;
    public int $execution_order;
    public mixed $execution_profile = null;
    public mixed $exit_code;
    public bool $failed;
    public mixed $finished_at;
    public string $id;
    public string $kind;
    public array $log_chunks;
    public string $name;
    public int $number;
    public string $organization_id;
    public mixed $queued_at;
    public mixed $reconciliation_id = null;
    public int $retry_number;
    public mixed $reuse;
    public mixed $runner_label_selector;
    public string $slug;
    public mixed $started_at;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
    public array $steps;
    public mixed $timeout_seconds;
    public string $updated_at;
}

/** Request payload for RunJob#load. */
class RunJobLoadMatch
{
    public string $id;
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for RunJob#list. */
class RunJobListMatch
{
    public string $pipeline_id;
    public string $run_id;
}

/** Request payload for RunJob#create. */
class RunJobCreateData
{
    public string $pipeline_id;
    public string $run_id;
}

/** RunScenarioRun entity data model. */
class RunScenarioRun
{
    public ?string $id = null;
}

/** Request payload for RunScenarioRun#load. */
class RunScenarioRunLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public string $run_id;
}

/** Request payload for RunScenarioRun#update. */
class RunScenarioRunUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public string $run_id;
    public mixed $outcomes = null;
    public mixed $steps = null;
    public mixed $version = null;
}

/** RunScheduleOption entity data model. */
class RunScheduleOption
{
    public string $id;
    public string $name;
}

/** Request payload for RunScheduleOption#list. */
class RunScheduleOptionListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** RunSearch entity data model. */
class RunSearch
{
    public array $runs;
}

/** Request payload for RunSearch#load. */
class RunSearchLoadMatch
{
    public string $organization_id;
    public ?string $query = null;
}

/** RunUpdate entity data model. */
class RunUpdate
{
    public string $base_sha;
    public bool $can_verify;
    public mixed $comment_url;
    public bool $draft;
    public mixed $github_repository;
    public mixed $github_url;
    public string $head_sha;
    public string $id;
    public mixed $latest_created_at;
    public bool $latest_current;
    public mixed $latest_head_sha;
    public mixed $latest_reason;
    public mixed $latest_run_id;
    public mixed $latest_state;
    public int $number;
    public mixed $project_id;
    public mixed $project_slug;
    public string $provider;
    public string $repository_id;
    public string $request_label;
    public mixed $source_branch;
    public mixed $source_repository;
    public mixed $source_url;
    public string $state;
    public string $title;
    public string $updated_at;
    public string $web_path;
}

/** Request payload for RunUpdate#list. */
class RunUpdateListMatch
{
    public string $organization_id;
    public ?int $page = null;
    public ?string $query = null;
    public ?string $status = null;
    public ?string $verify_environment_id = null;
}

/** RunWorkspaceCredential entity data model. */
class RunWorkspaceCredential
{
}

/** Request payload for RunWorkspaceCredential#create. */
class RunWorkspaceCredentialCreateData
{
}

/** RunnerLease entity data model. */
class RunnerLease
{
    public ?string $id = null;
}

/** Request payload for RunnerLease#list. */
class RunnerLeaseListMatch
{
    public string $runner_id;
    public string $runner_pool_id;
}

/** Request payload for RunnerLease#create. */
class RunnerLeaseCreateData
{
    public string $runner_id;
    public string $runner_pool_id;
}

/** RunnerPoolNodeEnrollmentToken entity data model. */
class RunnerPoolNodeEnrollmentToken
{
    public mixed $capabilities_csv;
    public string $ci_runner_pool_id;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $creator_user_id;
    public mixed $description;
    public mixed $expires_at;
    public mixed $expires_at_label;
    public string $id;
    public string $kind;
    public mixed $last_used_at;
    public mixed $last_used_at_label;
    public string $name;
    public string $organization_id;
    public mixed $raw_token;
    public mixed $revoked_at;
    public string $status;
    public string $token_hint;
    public string $updated_at;
    public mixed $updated_at_label;
    public int $usage_count;
    public string $usage_count_label;
}

/** Request payload for RunnerPoolNodeEnrollmentToken#list. */
class RunnerPoolNodeEnrollmentTokenListMatch
{
    public string $runner_pool_id;
}

/** Request payload for RunnerPoolNodeEnrollmentToken#create. */
class RunnerPoolNodeEnrollmentTokenCreateData
{
    public string $runner_pool_id;
    public mixed $capabilities_csv = null;
    public mixed $description = null;
    public mixed $expires_at = null;
    public ?string $kind = null;
    public string $name;
}

/** RunnerPoolRunner entity data model. */
class RunnerPoolRunner
{
    public ?string $id = null;
}

/** Request payload for RunnerPoolRunner#load. */
class RunnerPoolRunnerLoadMatch
{
    public string $id;
    public string $runner_pool_id;
}

/** Request payload for RunnerPoolRunner#list. */
class RunnerPoolRunnerListMatch
{
    public string $runner_pool_id;
}

/** Request payload for RunnerPoolRunner#create. */
class RunnerPoolRunnerCreateData
{
    public string $runner_pool_id;
}

/** Request payload for RunnerPoolRunner#update. */
class RunnerPoolRunnerUpdateData
{
    public string $id;
    public string $runner_pool_id;
}

/** Request payload for RunnerPoolRunner#patch. */
class RunnerPoolRunnerPatchData
{
    public string $id;
    public string $runner_pool_id;
}

/** RuntimeInstanceHealthSnapshot entity data model. */
class RuntimeInstanceHealthSnapshot
{
}

/** Request payload for RuntimeInstanceHealthSnapshot#list. */
class RuntimeInstanceHealthSnapshotListMatch
{
    public string $runtime_instance_id;
}

/** Request payload for RuntimeInstanceHealthSnapshot#create. */
class RuntimeInstanceHealthSnapshotCreateData
{
    public string $runtime_instance_id;
}

/** SandboxIntegration entity data model. */
class SandboxIntegration
{
    public bool $can_manage;
    public array $catalog;
    public array $configuration;
    public array $connected_profiles;
    public array $credentials;
    public bool $enabled;
    public string $id;
    public array $integrations;
    public string $name;
    public string $provider;
    public int $version;
}

/** Request payload for SandboxIntegration#list. */
class SandboxIntegrationListMatch
{
    public string $organization_id;
    public ?string $provider = null;
}

/** Request payload for SandboxIntegration#create. */
class SandboxIntegrationCreateData
{
    public string $organization_id;
    public array $configuration;
    public array $credentials;
    public string $name;
    public string $provider;
}

/** Request payload for SandboxIntegration#update. */
class SandboxIntegrationUpdateData
{
    public string $id;
    public string $organization_id;
    public ?array $credentials = null;
    public ?bool $enabled = null;
    public ?string $name = null;
    public ?int $version = null;
}

/** Request payload for SandboxIntegration#patch. */
class SandboxIntegrationPatchData
{
    public string $id;
    public string $organization_id;
    public ?array $credentials = null;
    public ?bool $enabled = null;
    public ?string $name = null;
    public ?int $version = null;
}

/** ScenarioRevision entity data model. */
class ScenarioRevision
{
    public string $action;
    public string $batch;
    public string $created_at;
    public array $definition;
    public string $id;
    public string $source;
    public mixed $user;
    public int $version;
}

/** Request payload for ScenarioRevision#list. */
class ScenarioRevisionListMatch
{
    public string $organization_id;
    public string $project_id;
    public string $scenario_id;
    public ?int $page = null;
}

/** ScenarioRunLesson entity data model. */
class ScenarioRunLesson
{
    public string $finding;
    public ?string $title = null;
    public string $workaround;
}

/** Request payload for ScenarioRunLesson#create. */
class ScenarioRunLessonCreateData
{
    public string $organization_id;
    public string $project_id;
    public string $run_id;
    public string $scenario_run_id;
    public string $finding;
    public ?string $title = null;
    public string $workaround;
}

/** ScenarioRunScenarioEdit entity data model. */
class ScenarioRunScenarioEdit
{
}

/** Request payload for ScenarioRunScenarioEdit#create. */
class ScenarioRunScenarioEditCreateData
{
    public string $organization_id;
    public string $project_id;
    public string $run_id;
    public string $scenario_run_id;
    public mixed $idempotency_key = null;
    public mixed $outcomes = null;
    public mixed $prompt = null;
    public mixed $steps = null;
    public mixed $version = null;
    public mixed $viewer_time_zone = null;
}

/** SecretGrant entity data model. */
class SecretGrant
{
    public ?string $id = null;
}

/** Request payload for SecretGrant#load. */
class SecretGrantLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretGrant#list. */
class SecretGrantListMatch
{
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretGrant#create. */
class SecretGrantCreateData
{
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretGrant#update. */
class SecretGrantUpdateData
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretGrant#patch. */
class SecretGrantPatchData
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretGrant#remove. */
class SecretGrantRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** SecretVersion entity data model. */
class SecretVersion
{
    public ?string $id = null;
}

/** Request payload for SecretVersion#load. */
class SecretVersionLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretVersion#list. */
class SecretVersionListMatch
{
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretVersion#create. */
class SecretVersionCreateData
{
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretVersion#update. */
class SecretVersionUpdateData
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretVersion#patch. */
class SecretVersionPatchData
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** Request payload for SecretVersion#remove. */
class SecretVersionRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $secret_id;
}

/** ServiceEndpoint entity data model. */
class ServiceEndpoint
{
    public ?string $id = null;
}

/** Request payload for ServiceEndpoint#load. */
class ServiceEndpointLoadMatch
{
    public string $app_id;
    public string $id;
    public string $service_id;
}

/** Request payload for ServiceEndpoint#list. */
class ServiceEndpointListMatch
{
    public string $app_id;
    public string $service_id;
}

/** Request payload for ServiceEndpoint#create. */
class ServiceEndpointCreateData
{
    public string $app_id;
    public string $service_id;
}

/** Request payload for ServiceEndpoint#update. */
class ServiceEndpointUpdateData
{
    public string $app_id;
    public string $id;
    public string $service_id;
}

/** Request payload for ServiceEndpoint#patch. */
class ServiceEndpointPatchData
{
    public string $app_id;
    public string $id;
    public string $service_id;
}

/** Request payload for ServiceEndpoint#remove. */
class ServiceEndpointRemoveMatch
{
    public string $app_id;
    public string $id;
    public string $service_id;
}

/** Setting entity data model. */
class Setting
{
    public bool $can_manage_pr_scenario_writing;
    public bool $can_manage_sandbox_region;
    public array $dedicated_outbound_ip_addresses;
    public string $default_trunk_bookmark;
    public array $organization;
    public array $sandbox_regions;
}

/** Request payload for Setting#list. */
class SettingListMatch
{
    public string $organization_id;
}

/** SettingMutationLease entity data model. */
class SettingMutationLease
{
}

/** Request payload for SettingMutationLease#create. */
class SettingMutationLeaseCreateData
{
    public string $organization_id;
    public string $repo_id;
    public mixed $reason = null;
}

/** Signal entity data model. */
class Signal
{
    public mixed $acked_at;
    public mixed $acked_by;
    public array $agent_runs;
    public mixed $app_service_id;
    public array $attribution;
    public string $created_at;
    public mixed $dedupe_key;
    public mixed $hosted_app_id;
    public string $id;
    public string $kind;
    public array $links;
    public string $occurred_at;
    public string $organization_id;
    public array $payload;
    public array $recovery;
    public array $resolution;
    public string $severity;
    public array $source;
    public mixed $subject_id;
    public mixed $subject_type;
    public string $summary;
}

/** Request payload for Signal#load. */
class SignalLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for Signal#list. */
class SignalListMatch
{
    public string $organization_id;
    public ?string $after_id = null;
    public ?string $before_id = null;
    public ?string $hosted_app_id = null;
    public ?string $integration_id = null;
    public ?string $kind = null;
    public ?int $limit = null;
    public ?string $min_severity = null;
    public ?string $order = null;
    public ?string $severity = null;
    public ?string $since = null;
    public ?string $source = null;
    public ?string $subscription_id = null;
    public ?bool $unacked = null;
}

/** Request payload for Signal#create. */
class SignalCreateData
{
}

/** SignalInbound entity data model. */
class SignalInbound
{
    public ?string $id = null;
}

/** Request payload for SignalInbound#update. */
class SignalInboundUpdateData
{
    public string $id;
    public string $inbound_id;
}

/** SignalIntegration entity data model. */
class SignalIntegration
{
    public ?string $api_token = null;
    public bool $api_token_stored;
    public array $config;
    public mixed $created_at = null;
    public mixed $failure_message;
    public string $id;
    public string $inbound_path;
    public string $inbound_url;
    public mixed $last_received_at = null;
    public mixed $last_verified_at = null;
    public string $mode;
    public string $name;
    public string $organization_id;
    public string $provider;
    public int $rejected_signature_count;
    public string $status;
    public int $target_count;
    public int $unmapped_delivery_count;
    public mixed $updated_at = null;
    public ?string $webhook_secret = null;
    public bool $webhook_secret_stored;
}

/** Request payload for SignalIntegration#load. */
class SignalIntegrationLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for SignalIntegration#list. */
class SignalIntegrationListMatch
{
    public string $organization_id;
}

/** Request payload for SignalIntegration#create. */
class SignalIntegrationCreateData
{
    public string $organization_id;
    public ?string $api_token = null;
    public ?array $config = null;
    public ?string $mode = null;
    public string $name;
    public string $provider;
    public ?string $webhook_secret = null;
}

/** Request payload for SignalIntegration#update. */
class SignalIntegrationUpdateData
{
    public string $id;
    public string $organization_id;
    public ?string $api_token = null;
    public ?array $config = null;
    public ?string $mode = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $webhook_secret = null;
}

/** Request payload for SignalIntegration#patch. */
class SignalIntegrationPatchData
{
    public string $id;
    public string $organization_id;
    public ?string $api_token = null;
    public ?array $config = null;
    public ?string $mode = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $webhook_secret = null;
}

/** Request payload for SignalIntegration#remove. */
class SignalIntegrationRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** SignalIntegrationDelivery entity data model. */
class SignalIntegrationDelivery
{
    public int $attempt_count;
    public mixed $created_at = null;
    public string $delivery_id;
    public mixed $event_kind = null;
    public string $id;
    public mixed $last_error = null;
    public mixed $ops_signal_id = null;
    public string $organization_id;
    public mixed $processed_at = null;
    public string $provider;
    public mixed $received_at = null;
    public string $signal_integration_id;
    public string $state;
}

/** Request payload for SignalIntegrationDelivery#list. */
class SignalIntegrationDeliveryListMatch
{
    public string $organization_id;
    public string $signal_integration_id;
    public ?int $limit = null;
}

/** SignalIntegrationTarget entity data model. */
class SignalIntegrationTarget
{
    public mixed $app_service_id = null;
    public mixed $created_at = null;
    public mixed $display_name = null;
    public bool $enabled;
    public string $external_id;
    public string $external_kind;
    public mixed $external_slug = null;
    public mixed $hosted_app_id = null;
    public string $id;
    public string $organization_id;
    public string $signal_integration_id;
    public array $signal_integration_targets;
    public array $targets;
    public mixed $updated_at = null;
}

/** Request payload for SignalIntegrationTarget#list. */
class SignalIntegrationTargetListMatch
{
    public string $organization_id;
    public string $signal_integration_id;
}

/** Request payload for SignalIntegrationTarget#update. */
class SignalIntegrationTargetUpdateData
{
    public string $organization_id;
    public string $signal_integration_id;
    public ?array $targets = null;
}

/** SignalSubscription entity data model. */
class SignalSubscription
{
    public ?string $id = null;
}

/** Request payload for SignalSubscription#load. */
class SignalSubscriptionLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for SignalSubscription#list. */
class SignalSubscriptionListMatch
{
    public string $organization_id;
}

/** Request payload for SignalSubscription#create. */
class SignalSubscriptionCreateData
{
    public string $organization_id;
}

/** Request payload for SignalSubscription#update. */
class SignalSubscriptionUpdateData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for SignalSubscription#patch. */
class SignalSubscriptionPatchData
{
    public string $id;
    public string $organization_id;
}

/** Request payload for SignalSubscription#remove. */
class SignalSubscriptionRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** Site entity data model. */
class Site
{
    public mixed $activated_at;
    public mixed $activated_at_label;
    public mixed $commit_sha;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $creator_user_id;
    public string $deploy_slug;
    public mixed $failure_message;
    public int $file_count;
    public string $file_count_label;
    public mixed $finished_at;
    public mixed $finished_at_label;
    public string $id;
    public bool $is_active;
    public mixed $source_ref;
    public mixed $started_at;
    public mixed $started_at_label;
    public string $static_site_id;
    public string $status;
    public int $total_bytes;
    public string $total_bytes_label;
    public string $trigger_kind;
    public string $updated_at;
    public mixed $updated_at_label;
    public mixed $uploaded_at;
    public mixed $uploaded_at_label;
}

/** Request payload for Site#list. */
class SiteListMatch
{
    public string $organization_id;
    public ?string $site = null;
}

/** SiteAccessKey entity data model. */
class SiteAccessKey
{
    public ?string $id = null;
}

/** Request payload for SiteAccessKey#list. */
class SiteAccessKeyListMatch
{
    public string $organization_id;
    public string $site_id;
}

/** Request payload for SiteAccessKey#create. */
class SiteAccessKeyCreateData
{
    public string $organization_id;
    public string $site_id;
}

/** Request payload for SiteAccessKey#remove. */
class SiteAccessKeyRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $site_id;
}

/** SitePreview entity data model. */
class SitePreview
{
    public mixed $icon_data_url;
    public mixed $title;
    public string $url;
}

/** Request payload for SitePreview#load. */
class SitePreviewLoadMatch
{
    public string $organization_id;
    public string $url;
}

/** SiteSecret entity data model. */
class SiteSecret
{
    public ?string $id = null;
    public string $native_agent_id;
    public string $value;
}

/** Request payload for SiteSecret#update. */
class SiteSecretUpdateData
{
    public string $id;
    public string $organization_id;
    public string $site_id;
    public ?string $native_agent_id = null;
    public ?string $value = null;
}

/** Request payload for SiteSecret#remove. */
class SiteSecretRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $site_id;
}

/** SlackChannel entity data model. */
class SlackChannel
{
    public string $id;
    public bool $is_member;
    public bool $is_private;
    public bool $is_slack_connect;
    public string $name;
    public bool $published;
}

/** Request payload for SlackChannel#list. */
class SlackChannelListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?string $kind = null;
    public ?string $q = null;
    public ?bool $refresh = null;
}

/** SourceConnection entity data model. */
class SourceConnection
{
    public ?string $id = null;
}

/** Request payload for SourceConnection#create. */
class SourceConnectionCreateData
{
    public string $id;
}

/** SpaceAlertRule entity data model. */
class SpaceAlertRule
{
    public ?string $id = null;
}

/** Request payload for SpaceAlertRule#load. */
class SpaceAlertRuleLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceAlertRule#list. */
class SpaceAlertRuleListMatch
{
    public string $space_id;
}

/** Request payload for SpaceAlertRule#create. */
class SpaceAlertRuleCreateData
{
    public string $space_id;
}

/** Request payload for SpaceAlertRule#update. */
class SpaceAlertRuleUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceAlertRule#patch. */
class SpaceAlertRulePatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceAlertRule#remove. */
class SpaceAlertRuleRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceAuditEvent entity data model. */
class SpaceAuditEvent
{
}

/** Request payload for SpaceAuditEvent#list. */
class SpaceAuditEventListMatch
{
    public string $space_id;
}

/** Request payload for SpaceAuditEvent#create. */
class SpaceAuditEventCreateData
{
    public string $space_id;
}

/** SpaceDnsRecord entity data model. */
class SpaceDnsRecord
{
    public ?string $id = null;
}

/** Request payload for SpaceDnsRecord#load. */
class SpaceDnsRecordLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceDnsRecord#list. */
class SpaceDnsRecordListMatch
{
    public string $space_id;
}

/** Request payload for SpaceDnsRecord#create. */
class SpaceDnsRecordCreateData
{
    public string $space_id;
}

/** Request payload for SpaceDnsRecord#update. */
class SpaceDnsRecordUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceDnsRecord#patch. */
class SpaceDnsRecordPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceDnsRecord#remove. */
class SpaceDnsRecordRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceEnrollmentToken entity data model. */
class SpaceEnrollmentToken
{
    public ?string $id = null;
}

/** Request payload for SpaceEnrollmentToken#load. */
class SpaceEnrollmentTokenLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceEnrollmentToken#list. */
class SpaceEnrollmentTokenListMatch
{
    public string $space_id;
}

/** Request payload for SpaceEnrollmentToken#create. */
class SpaceEnrollmentTokenCreateData
{
    public string $space_id;
}

/** Request payload for SpaceEnrollmentToken#update. */
class SpaceEnrollmentTokenUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceEnrollmentToken#patch. */
class SpaceEnrollmentTokenPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceEnrollmentToken#remove. */
class SpaceEnrollmentTokenRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceGateway entity data model. */
class SpaceGateway
{
    public ?string $id = null;
}

/** Request payload for SpaceGateway#load. */
class SpaceGatewayLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGateway#list. */
class SpaceGatewayListMatch
{
    public string $space_id;
}

/** Request payload for SpaceGateway#create. */
class SpaceGatewayCreateData
{
    public string $space_id;
}

/** Request payload for SpaceGateway#update. */
class SpaceGatewayUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGateway#patch. */
class SpaceGatewayPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGateway#remove. */
class SpaceGatewayRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceGroup entity data model. */
class SpaceGroup
{
    public ?string $id = null;
}

/** Request payload for SpaceGroup#list. */
class SpaceGroupListMatch
{
    public string $space_id;
}

/** Request payload for SpaceGroup#create. */
class SpaceGroupCreateData
{
    public string $space_id;
}

/** Request payload for SpaceGroup#update. */
class SpaceGroupUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGroup#patch. */
class SpaceGroupPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGroup#remove. */
class SpaceGroupRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceGroupMembership entity data model. */
class SpaceGroupMembership
{
    public ?string $id = null;
}

/** Request payload for SpaceGroupMembership#list. */
class SpaceGroupMembershipListMatch
{
    public string $space_id;
}

/** Request payload for SpaceGroupMembership#create. */
class SpaceGroupMembershipCreateData
{
    public string $space_id;
}

/** Request payload for SpaceGroupMembership#update. */
class SpaceGroupMembershipUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGroupMembership#patch. */
class SpaceGroupMembershipPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceGroupMembership#remove. */
class SpaceGroupMembershipRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceLogStream entity data model. */
class SpaceLogStream
{
}

/** Request payload for SpaceLogStream#list. */
class SpaceLogStreamListMatch
{
    public string $space_id;
}

/** Request payload for SpaceLogStream#create. */
class SpaceLogStreamCreateData
{
    public string $space_id;
}

/** SpaceMetricSery entity data model. */
class SpaceMetricSery
{
}

/** Request payload for SpaceMetricSery#list. */
class SpaceMetricSeryListMatch
{
    public string $space_id;
}

/** Request payload for SpaceMetricSery#create. */
class SpaceMetricSeryCreateData
{
    public string $space_id;
}

/** SpaceOtelCollector entity data model. */
class SpaceOtelCollector
{
    public ?string $id = null;
}

/** Request payload for SpaceOtelCollector#load. */
class SpaceOtelCollectorLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceOtelCollector#list. */
class SpaceOtelCollectorListMatch
{
    public string $space_id;
}

/** Request payload for SpaceOtelCollector#create. */
class SpaceOtelCollectorCreateData
{
    public string $space_id;
}

/** Request payload for SpaceOtelCollector#update. */
class SpaceOtelCollectorUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceOtelCollector#patch. */
class SpaceOtelCollectorPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceOtelCollector#remove. */
class SpaceOtelCollectorRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpacePeer entity data model. */
class SpacePeer
{
    public ?string $id = null;
}

/** Request payload for SpacePeer#load. */
class SpacePeerLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePeer#list. */
class SpacePeerListMatch
{
    public string $space_id;
}

/** Request payload for SpacePeer#create. */
class SpacePeerCreateData
{
    public string $space_id;
}

/** Request payload for SpacePeer#update. */
class SpacePeerUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePeer#patch. */
class SpacePeerPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePeer#remove. */
class SpacePeerRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpacePeerAttachment entity data model. */
class SpacePeerAttachment
{
    public ?string $id = null;
}

/** Request payload for SpacePeerAttachment#list. */
class SpacePeerAttachmentListMatch
{
    public string $space_id;
}

/** Request payload for SpacePeerAttachment#create. */
class SpacePeerAttachmentCreateData
{
    public string $space_id;
}

/** Request payload for SpacePeerAttachment#update. */
class SpacePeerAttachmentUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePeerAttachment#patch. */
class SpacePeerAttachmentPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePeerAttachment#remove. */
class SpacePeerAttachmentRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpacePolicy entity data model. */
class SpacePolicy
{
    public ?string $id = null;
}

/** Request payload for SpacePolicy#load. */
class SpacePolicyLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePolicy#list. */
class SpacePolicyListMatch
{
    public string $space_id;
}

/** Request payload for SpacePolicy#create. */
class SpacePolicyCreateData
{
    public string $space_id;
}

/** Request payload for SpacePolicy#update. */
class SpacePolicyUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePolicy#patch. */
class SpacePolicyPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpacePolicy#remove. */
class SpacePolicyRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceSegment entity data model. */
class SpaceSegment
{
    public ?string $id = null;
}

/** Request payload for SpaceSegment#load. */
class SpaceSegmentLoadMatch
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceSegment#list. */
class SpaceSegmentListMatch
{
    public string $space_id;
}

/** Request payload for SpaceSegment#create. */
class SpaceSegmentCreateData
{
    public string $space_id;
}

/** Request payload for SpaceSegment#update. */
class SpaceSegmentUpdateData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceSegment#patch. */
class SpaceSegmentPatchData
{
    public string $id;
    public string $space_id;
}

/** Request payload for SpaceSegment#remove. */
class SpaceSegmentRemoveMatch
{
    public string $id;
    public string $space_id;
}

/** SpaceTraceSpan entity data model. */
class SpaceTraceSpan
{
}

/** Request payload for SpaceTraceSpan#list. */
class SpaceTraceSpanListMatch
{
    public string $space_id;
}

/** Request payload for SpaceTraceSpan#create. */
class SpaceTraceSpanCreateData
{
    public string $space_id;
}

/** Spark entity data model. */
class Spark
{
    public array $activated_products;
    public ?bool $agents_only = null;
    public bool $can_activate_products;
    public bool $can_manage;
    public mixed $compute_credit_cents;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $credit_cents;
    public mixed $first_spark;
    public bool $github_connected;
    public bool $github_prs_authored_by_change_author;
    public string $id;
    public string $jsonrpc;
    public mixed $logo_url;
    public int $member_count;
    public string $method;
    public string $name;
    public ?array $params = null;
    public int $pending_invitation_count;
    public bool $personal;
    public int $repository_count;
    public mixed $role;
    public string $sandbox_region;
    public ?bool $shared_agent_personal_accounts_enabled = null;
    public string $slug;
    public ?array $source_control_providers = null;
    public ?bool $source_ui_enabled = null;
    public bool $started;
    public string $timezone;
    public string $updated_at;
    public mixed $updated_at_label;
    public bool $verify_pr_scenario_writing_enabled;
}

/** Request payload for Spark#list. */
class SparkListMatch
{
    public string $organization_id;
}

/** Request payload for Spark#create. */
class SparkCreateData
{
    public ?string $id = null;
    public string $jsonrpc;
    public string $method;
    public ?array $params = null;
}

/** SparkAgentIntegration entity data model. */
class SparkAgentIntegration
{
    public array $account_counts;
    public string $accounts_path;
    public array $added_toolkits;
    public bool $can_manage;
    public bool $can_manage_organization;
    public array $catalog;
    public mixed $connect_as;
    public array $connect_as_by_toolkit;
    public array $connected_counts;
    public string $connection_id;
    public array $connections;
    public array $email;
    public bool $enabled;
    public array $enabled_toolkits;
    public int $generation;
    public array $pagination;
    public array $pending_counts;
    public ?bool $personal_creation_key_supported = null;
    public bool $private_agent;
    public bool $shared_agent_personal_accounts_enabled;
    public array $slack;
    public array $webhook_connections;
    public bool $webhooks_available;
}

/** Request payload for SparkAgentIntegration#list. */
class SparkAgentIntegrationListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $catalog_q = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $toolkit = null;
}

/** Request payload for SparkAgentIntegration#create. */
class SparkAgentIntegrationCreateData
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $toolkit = null;
    public string $connection_id;
    public bool $enabled;
    public int $generation;
}

/** SparkAgentLocalThread entity data model. */
class SparkAgentLocalThread
{
    public string $action;
    public bool $archived;
    public bool $can_archive;
    public ?bool $can_disconnect_relay = null;
    public bool $can_end;
    public bool $can_interrupt;
    public bool $can_send;
    public string $created_at;
    public array $delivery;
    public string $device_id;
    public string $device_name;
    public ?string $diagnostic_code = null;
    public mixed $end;
    public string $expires_at;
    public string $full_title;
    public string $id;
    public string $key;
    public mixed $last_activity_at;
    public string $native_thread_id;
    public mixed $parent_conversation_id;
    public string $provider;
    public array $references;
    public mixed $relay_disconnected_at = null;
    public array $relay_participant;
    public mixed $result;
    public bool $result_expired;
    public mixed $result_schema = null;
    public string $section;
    public string $state;
    public mixed $status;
    public bool $task_configured;
    public string $thread_id;
    public string $title;
}

/** Request payload for SparkAgentLocalThread#load. */
class SparkAgentLocalThreadLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for SparkAgentLocalThread#create. */
class SparkAgentLocalThreadCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $device_id;
    public string $key;
    public string $provider;
    public mixed $result_schema = null;
    public string $thread_id;
}

/** Request payload for SparkAgentLocalThread#update. */
class SparkAgentLocalThreadUpdateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public mixed $allowed_senders = null;
    public mixed $ask_first = null;
    public mixed $expected_version = null;
    public mixed $reply_with_final_answer = null;
    public mixed $restricted = null;
}

/** SparkAgentSite entity data model. */
class SparkAgentSite
{
    public string $deployed_at;
    public int $deployments_count;
    public string $hostname;
    public string $https;
    public string $id;
    public string $name;
    public string $url;
    public string $visibility;
}

/** Request payload for SparkAgentSite#list. */
class SparkAgentSiteListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** SparkAgentSkill entity data model. */
class SparkAgentSkill
{
    public bool $available;
    public bool $can_configure;
    public bool $can_manage;
    public ?string $configuration_state = null;
    public string $description;
    public bool $enabled;
    public string $name;
    public array $skills;
    public string $version;
}

/** Request payload for SparkAgentSkill#list. */
class SparkAgentSkillListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for SparkAgentSkill#create. */
class SparkAgentSkillCreateData
{
    public string $agent_id;
    public string $organization_id;
    public bool $enabled;
    public string $name;
    public string $version;
}

/** SparkAgentThread entity data model. */
class SparkAgentThread
{
    public mixed $archived_count = null;
    public bool $can_create;
    public mixed $execution = null;
    public mixed $first_input = null;
    public ?string $first_input_key = null;
    public ?string $first_input_requester_membership_id = null;
    public ?string $id = null;
    public ?bool $inherit_context = null;
    public array $local_activities;
    public int $local_archived_count;
    public mixed $local_next_cursor;
    public mixed $local_scope_key;
    public bool $local_status_pending;
    public array $local_threads;
    public string $main_thread_id;
    public ?string $message = null;
    public mixed $next_cursor;
    public ?string $parent_conversation_id = null;
    public ?string $requester_membership_id = null;
    public mixed $selected_thread;
    public array $thread;
    public array $threads;
    public ?string $title = null;
    public mixed $total_archived_count;
}

/** Request payload for SparkAgentThread#list. */
class SparkAgentThreadListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?bool $archived = null;
    public ?string $conversation_id = null;
    public ?string $cursor = null;
    public ?string $local_cursor = null;
}

/** Request payload for SparkAgentThread#create. */
class SparkAgentThreadCreateData
{
    public string $agent_id;
    public string $organization_id;
    public mixed $execution = null;
    public ?bool $inherit_context = null;
    public ?string $message = null;
    public ?string $parent_conversation_id = null;
    public ?string $requester_membership_id = null;
    public ?string $title = null;
}

/** SparkCredit entity data model. */
class SparkCredit
{
    public ?int $amount_cents = null;
    public mixed $autofill;
    public bool $autofill_payment_unconfirmed;
    public string $available_usd;
    public ?string $billing_unit = null;
    public bool $can_manage;
    public array $compute_minutes;
    public ?string $compute_usd = null;
    public int $credits_per_usd;
    public ?string $inference_usd = null;
    public string $kind;
    public mixed $payment_method;
    public bool $payments_enabled;
    public ?string $plan = null;
    public array $plans;
    public ?int $quoted_credits_cents = null;
    public ?int $quoted_price_cents = null;
    public array $refill_limits_cents;
    public array $refill_options;
    public array $refill_thresholds_cents;
    public string $request_key;
    public mixed $settings;
    public int $starter_cents;
    public int $top_up_max_cents;
    public int $top_up_step_cents;
}

/** Request payload for SparkCredit#load. */
class SparkCreditLoadMatch
{
    public string $organization_id;
}

/** Request payload for SparkCredit#list. */
class SparkCreditListMatch
{
    public string $organization_id;
    public ?string $view = null;
}

/** Request payload for SparkCredit#create. */
class SparkCreditCreateData
{
    public string $organization_id;
    public ?int $amount_cents = null;
    public ?string $billing_unit = null;
    public string $kind;
    public ?string $plan = null;
    public ?int $quoted_credits_cents = null;
    public ?int $quoted_price_cents = null;
    public string $request_key;
}

/** Request payload for SparkCredit#update. */
class SparkCreditUpdateData
{
    public string $organization_id;
}

/** Request payload for SparkCredit#patch. */
class SparkCreditPatchData
{
    public string $organization_id;
    public ?string $view = null;
    public mixed $settings = null;
}

/** SparkCreditAgentUsage entity data model. */
class SparkCreditAgentUsage
{
    public array $agents;
    public array $all;
    public array $days;
    public ?string $id = null;
    public array $owners;
}

/** Request payload for SparkCreditAgentUsage#load. */
class SparkCreditAgentUsageLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** SparkCreditUsageTotal entity data model. */
class SparkCreditUsageTotal
{
    public string $compute_minutes_used;
    public string $compute_usd;
    public string $inference_usd;
}

/** Request payload for SparkCreditUsageTotal#list. */
class SparkCreditUsageTotalListMatch
{
    public string $organization_id;
}

/** StaticSite entity data model. */
class StaticSite
{
    public mixed $active_deployment_id;
    public string $cdn_hostname;
    public string $cdn_url;
    public string $cname_target;
    public string $created_at;
    public string $default_url;
    public mixed $description;
    public mixed $error_document;
    public mixed $failure_message;
    public mixed $hosted_app_id;
    public string $id;
    public string $index_document;
    public string $name;
    public string $organization_id;
    public bool $provisioned;
    public mixed $provisioned_at;
    public mixed $region;
    public array $replication_regions;
    public mixed $repository_id;
    public string $slug;
    public string $status;
    public string $updated_at;
}

/** Request payload for StaticSite#load. */
class StaticSiteLoadMatch
{
    public string $id;
}

/** Request payload for StaticSite#list. */
class StaticSiteListMatch
{
    public string $organization_id;
}

/** Request payload for StaticSite#create. */
class StaticSiteCreateData
{
    public string $organization_id;
    public mixed $description = null;
    public mixed $error_document = null;
    public mixed $hosted_app_id = null;
    public ?string $index_document = null;
    public string $name;
    public mixed $region = null;
    public ?array $replication_regions = null;
    public mixed $repository_id = null;
    public string $slug;
}

/** Request payload for StaticSite#update. */
class StaticSiteUpdateData
{
    public string $id;
}

/** Request payload for StaticSite#patch. */
class StaticSitePatchData
{
    public string $id;
}

/** Request payload for StaticSite#remove. */
class StaticSiteRemoveMatch
{
    public string $id;
}

/** StaticSiteDeployment entity data model. */
class StaticSiteDeployment
{
    public mixed $activated_at;
    public mixed $activated_at_label;
    public mixed $commit_sha;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $creator_user_id;
    public string $deploy_slug;
    public mixed $failure_message;
    public int $file_count;
    public string $file_count_label;
    public mixed $finished_at;
    public mixed $finished_at_label;
    public string $id;
    public bool $is_active;
    public mixed $source_ref;
    public mixed $started_at;
    public mixed $started_at_label;
    public string $static_site_id;
    public string $status;
    public int $total_bytes;
    public string $total_bytes_label;
    public string $trigger_kind;
    public string $updated_at;
    public mixed $updated_at_label;
    public mixed $uploaded_at;
    public mixed $uploaded_at_label;
}

/** Request payload for StaticSiteDeployment#load. */
class StaticSiteDeploymentLoadMatch
{
    public string $id;
    public string $static_site_id;
}

/** Request payload for StaticSiteDeployment#list. */
class StaticSiteDeploymentListMatch
{
    public string $static_site_id;
}

/** Request payload for StaticSiteDeployment#create. */
class StaticSiteDeploymentCreateData
{
    public string $static_site_id;
}

/** StaticSiteDomain entity data model. */
class StaticSiteDomain
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public string $created_at;
    public string $dns_mode;
    public string $dns_status;
    public mixed $failure_message;
    public mixed $hosted_app_id;
    public string $hostname;
    public string $id;
    public string $kind;
    public mixed $last_checked_at;
    public mixed $record_name;
    public mixed $record_type;
    public mixed $record_value;
    public mixed $redirect_to;
    public mixed $static_site_id;
    public string $target_kind;
    public string $tls_status;
    public string $updated_at;
    public string $verification_status;
}

/** Request payload for StaticSiteDomain#load. */
class StaticSiteDomainLoadMatch
{
    public string $id;
    public string $static_site_id;
}

/** Request payload for StaticSiteDomain#list. */
class StaticSiteDomainListMatch
{
    public string $static_site_id;
}

/** Request payload for StaticSiteDomain#create. */
class StaticSiteDomainCreateData
{
    public string $static_site_id;
    public ?string $dns_mode = null;
    public string $hostname;
    public ?string $kind = null;
    public mixed $redirect_to = null;
}

/** Request payload for StaticSiteDomain#update. */
class StaticSiteDomainUpdateData
{
    public string $id;
    public string $static_site_id;
}

/** Request payload for StaticSiteDomain#patch. */
class StaticSiteDomainPatchData
{
    public string $id;
    public string $static_site_id;
}

/** Request payload for StaticSiteDomain#remove. */
class StaticSiteDomainRemoveMatch
{
    public string $id;
    public string $static_site_id;
}

/** StatusChange entity data model. */
class StatusChange
{
    public string $change_id;
    public ?string $id = null;
    public array $patchsets;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
}

/** Request payload for StatusChange#load. */
class StatusChangeLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** StatusCommit entity data model. */
class StatusCommit
{
    public array $checks;
    public string $commit_sha;
    public array $counts;
    public ?string $id = null;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
    public int $total;
}

/** Request payload for StatusCommit#load. */
class StatusCommitLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** StatusPatchset entity data model. */
class StatusPatchset
{
    public array $checks;
    public mixed $checks_status;
    public mixed $commit_sha;
    public array $counts;
    public ?string $id = null;
    public string $patchset_id;
    public string $status;
    public string $status_label;
    public string $status_state;
    public string $status_tone;
    public int $total;
}

/** Request payload for StatusPatchset#load. */
class StatusPatchsetLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** StripeWebhook entity data model. */
class StripeWebhook
{
}

/** Request payload for StripeWebhook#create. */
class StripeWebhookCreateData
{
}

/** SubmitTelemetry entity data model. */
class SubmitTelemetry
{
}

/** Request payload for SubmitTelemetry#create. */
class SubmitTelemetryCreateData
{
}

/** SubscriptionModel entity data model. */
class SubscriptionModel
{
    public ?string $default_reasoning = null;
    public string $id;
    public string $name;
    public string $provider;
    public ?array $reasoning = null;
    public ?array $speeds = null;
}

/** Request payload for SubscriptionModel#list. */
class SubscriptionModelListMatch
{
    public string $agent_id;
    public string $organization_id;
    public string $profile_id;
}

/** SwarmEvent entity data model. */
class SwarmEvent
{
    public string $agent_swarm_id;
    public mixed $attempt_id;
    public string $created_at;
    public mixed $created_at_label;
    public int $id;
    public string $kind;
    public array $payload;
    public mixed $reason;
    public mixed $scheduler_generation;
    public mixed $task_id;
}

/** Request payload for SwarmEvent#list. */
class SwarmEventListMatch
{
    public string $swarm_id;
    public ?int $after = null;
    public ?string $kind = null;
    public ?int $limit = null;
}

/** SwarmLive entity data model. */
class SwarmLive
{
}

/** Request payload for SwarmLive#load. */
class SwarmLiveLoadMatch
{
    public string $swarm_id;
    public ?int $after_event_id = null;
    public ?int $after_seq = null;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** SwarmNote entity data model. */
class SwarmNote
{
    public mixed $task_id = null;
    public string $text;
}

/** Request payload for SwarmNote#create. */
class SwarmNoteCreateData
{
    public string $swarm_id;
    public mixed $task_id = null;
    public string $text;
}

/** SwarmTask entity data model. */
class SwarmTask
{
    public array $acceptance_commands;
    public string $agent_swarm_id;
    public mixed $assigned_runner_id;
    public mixed $blocked_reason;
    public array $changes;
    public int $commit_count;
    public mixed $commit_sha_result;
    public string $created_at;
    public mixed $created_at_label;
    public mixed $current_attempt_id;
    public mixed $deadline_at;
    public array $depends_on_task_ids;
    public int $depth;
    public mixed $diff_artifact_url;
    public int $display_id;
    public mixed $environment_profile;
    public mixed $error_message;
    public mixed $failure_code;
    public mixed $finished_at;
    public mixed $finished_at_label;
    public string $harness;
    public string $id;
    public mixed $input_revision;
    public int $iteration;
    public string $landing_state;
    public mixed $model;
    public mixed $model_provider;
    public int $number;
    public string $organization_id;
    public array $owned_paths;
    public mixed $parent_task_id;
    public int $position;
    public string $prompt;
    public mixed $queued_at;
    public mixed $queued_at_label;
    public mixed $reasoning_effort;
    public array $recent_activity;
    public string $repo_url;
    public array $result;
    public int $retry_number;
    public string $role;
    public mixed $run_id;
    public mixed $stack_after_task_id;
    public mixed $started_at;
    public mixed $started_at_label;
    public string $status;
    public mixed $title;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for SwarmTask#load. */
class SwarmTaskLoadMatch
{
    public string $id;
    public string $swarm_id;
    public ?int $after_seq = null;
    public ?int $limit = null;
}

/** Request payload for SwarmTask#list. */
class SwarmTaskListMatch
{
    public string $swarm_id;
}

/** TaskLease entity data model. */
class TaskLease
{
    public ?string $id = null;
}

/** Request payload for TaskLease#create. */
class TaskLeaseCreateData
{
    public string $swarm_id;
    public string $task_id;
}

/** ThreadPreview entity data model. */
class ThreadPreview
{
    public mixed $expires_at;
    public int $port;
    public string $url;
}

/** Request payload for ThreadPreview#create. */
class ThreadPreviewCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $thread_id;
    public int $port;
}

/** ThreadPreviewAccess entity data model. */
class ThreadPreviewAccess
{
}

/** Request payload for ThreadPreviewAccess#load. */
class ThreadPreviewAccessLoadMatch
{
    public string $host;
    public ?string $return_to = null;
}

/** Request payload for ThreadPreviewAccess#create. */
class ThreadPreviewAccessCreateData
{
    public mixed $host = null;
    public mixed $token = null;
}

/** ToolFeedback entity data model. */
class ToolFeedback
{
    public string $category;
    public string $created_at;
    public string $details;
    public array $feedback;
    public string $id;
    public array $metadata;
    public string $organization_id;
    public string $source;
    public string $summary;
    public string $user_id;
}

/** Request payload for ToolFeedback#load. */
class ToolFeedbackLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for ToolFeedback#create. */
class ToolFeedbackCreateData
{
    public string $organization_id;
    public array $feedback;
}

/** Transcript entity data model. */
class Transcript
{
    public string $agent;
    public array $author;
    public array $checkpoint_pagination;
    public array $checkpoints;
    public string $id;
    public mixed $last_checkpoint_at;
    public mixed $selected_checkpoint;
    public string $source_url;
    public string $started_at;
    public string $status;
    public mixed $title;
}

/** Request payload for Transcript#load. */
class TranscriptLoadMatch
{
    public ?int $around_event = null;
    public ?string $cursor = null;
    public ?string $event_digest = null;
    public ?bool $include_tool = null;
    public ?int $limit = null;
    public ?int $max_byte = null;
    public ?string $source_ref = null;
}

/** Request payload for Transcript#list. */
class TranscriptListMatch
{
    public ?string $change = null;
    public ?string $checkpoint_cursor = null;
    public ?string $commit = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?int $patchset = null;
    public ?string $pr = null;
    public string $repo;
    public ?string $session = null;
}

/** Request payload for Transcript#create. */
class TranscriptCreateData
{
    public string $organization_id;
    public string $status;
    public mixed $adapter = null;
    public mixed $cursor = null;
    public mixed $from = null;
    public mixed $limit = null;
    public mixed $max_bytes = null;
    public mixed $mode = null;
    public mixed $query = null;
    public mixed $repo = null;
    public mixed $to = null;
    public mixed $user = null;
}

/** V1Message entity data model. */
class V1Message
{
}

/** Request payload for V1Message#create. */
class V1MessageCreateData
{
    public string $organization_id;
}

/** VcBranch entity data model. */
class VcBranch
{
    public ?string $id = null;
    public string $name;
    public string $target_commit_id;
}

/** Request payload for VcBranch#list. */
class VcBranchListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcBranch#create. */
class VcBranchCreateData
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcBranch#remove. */
class VcBranchRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** VcBrowser entity data model. */
class VcBrowser
{
}

/** Request payload for VcBrowser#load. */
class VcBrowserLoadMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $file = null;
    public ?string $path = null;
    public string $ref;
    public ?bool $recursive = null;
}

/** VcChange entity data model. */
class VcChange
{
    public array $activity;
    public string $canonical_path;
    public mixed $change;
    public ?array $checks = null;
    public ?string $checks_status = null;
    public mixed $description = null;
    public mixed $group = null;
    public string $id;
    public mixed $jj_change_id = null;
    public ?array $labels = null;
    public array $landing;
    public int $number;
    public mixed $patchset_number = null;
    public array $previews;
    public mixed $primary_status = null;
    public ?string $public_id = null;
    public array $related_changes;
    public array $relation_chain;
    public ?string $restack_state = null;
    public ?array $review_summary = null;
    public mixed $stack = null;
    public string $status;
    public array $sync;
    public array $target;
    public bool $target_advanced;
    public string $target_branch;
    public string $title;
    public ?string $url = null;
}

/** Request payload for VcChange#load. */
class VcChangeLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcChange#list. */
class VcChangeListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $group = null;
    public ?string $label = null;
    public ?int $limit = null;
    public ?bool $mine = null;
    public ?int $page = null;
    public ?string $status = null;
    public ?string $target = null;
}

/** Request payload for VcChange#create. */
class VcChangeCreateData
{
    public ?string $id = null;
    public string $organization_id;
    public string $repo_id;
    public mixed $description = null;
    public ?array $labels = null;
    public string $title;
    public mixed $assets = null;
    public mixed $base = null;
    public mixed $draft = null;
    public mixed $dry_run = null;
    public mixed $expected_base_commit_id = null;
    public mixed $expected_head_commit_id = null;
    public mixed $expected_review_head_commit_id = null;
    public mixed $expected_review_patchset_number = null;
    public mixed $git_publication_id = null;
    public mixed $head = null;
    public mixed $into = null;
    public mixed $message = null;
    public mixed $remove_reviewers = null;
    public mixed $request_id = null;
    public mixed $reviewers = null;
    public mixed $transcript_chat = null;
}

/** Request payload for VcChange#update. */
class VcChangeUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public mixed $description = null;
    public mixed $assets = null;
}

/** VcChangeGroup entity data model. */
class VcChangeGroup
{
    public array $changes;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $number = null;
    public string $status;
    public mixed $title;
}

/** Request payload for VcChangeGroup#load. */
class VcChangeGroupLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcChangeGroup#list. */
class VcChangeGroupListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcChangeGroup#create. */
class VcChangeGroupCreateData
{
    public string $organization_id;
    public string $repo_id;
    public string $name;
    public mixed $title = null;
}

/** VcFile entity data model. */
class VcFile
{
    public array $paths;
    public bool $truncated;
}

/** Request payload for VcFile#list. */
class VcFileListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $prefix = null;
    public string $ref;
}

/** VcMergeQueue entity data model. */
class VcMergeQueue
{
    public array $analytics;
    public ?string $id = null;
    public array $policy;
    public array $queue;
    public ?array $target_branches = null;
}

/** Request payload for VcMergeQueue#load. */
class VcMergeQueueLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public ?string $change = null;
    public ?string $entry_id = null;
    public ?int $page = null;
    public ?int $window_day = null;
}

/** Request payload for VcMergeQueue#list. */
class VcMergeQueueListMatch
{
    public string $organization_id;
    public string $repo_id;
    public ?string $change = null;
    public ?string $entry_id = null;
    public ?int $page = null;
    public ?string $target = null;
    public ?int $window_day = null;
}

/** Request payload for VcMergeQueue#create. */
class VcMergeQueueCreateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public mixed $expected_version = null;
}

/** Request payload for VcMergeQueue#update. */
class VcMergeQueueUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public mixed $concurrency = null;
    public mixed $enabled = null;
    public mixed $expected_version = null;
}

/** VcStack entity data model. */
class VcStack
{
    public mixed $alias_ref_name;
    public array $changes;
    public string $code;
    public ?string $id = null;
    public array $landing;
    public int $member_count;
    public mixed $name;
    public string $ref_name;
    public string $status;
    public mixed $tip_change_number;
    public string $updated_at;
    public string $updated_at_label;
}

/** Request payload for VcStack#load. */
class VcStackLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcStack#list. */
class VcStackListMatch
{
    public string $organization_id;
    public string $repo_id;
}

/** Request payload for VcStack#update. */
class VcStackUpdateData
{
    public string $id;
    public string $organization_id;
    public string $repo_id;
    public mixed $name = null;
}

/** VcsNode entity data model. */
class VcsNode
{
    public mixed $account_avatar_url;
    public mixed $account_id;
    public string $account_login;
    public string $created_at;
    public mixed $created_at_label;
    public string $id;
    public string $installation_id;
    public mixed $installed_at;
    public mixed $installed_at_label;
    public string $manage_access_url;
    public string $organization_id;
    public array $permission_entries;
    public array $permissions;
    public string $status;
    public mixed $suspended_at;
    public mixed $suspended_at_label;
    public string $updated_at;
    public mixed $updated_at_label;
}

/** Request payload for VcsNode#list. */
class VcsNodeListMatch
{
    public string $organization_id;
}

/** VcsSetting entity data model. */
class VcsSetting
{
    public bool $can_manage_pr_scenario_writing;
    public bool $can_manage_sandbox_region;
    public array $dedicated_outbound_ip_addresses;
    public string $default_trunk_bookmark;
    public array $organization;
    public array $sandbox_regions;
}

/** Request payload for VcsSetting#list. */
class VcsSettingListMatch
{
    public string $organization_id;
}

/** VerificationProjectCredential entity data model. */
class VerificationProjectCredential
{
    public mixed $browser_authentication = null;
    public ?string $browser_session = null;
    public mixed $composal_address;
    public ?bool $composal_inbox = null;
    public ?string $composal_inbox_user = null;
    public ?bool $composal_managed_google = null;
    public bool $configured;
    public ?string $cookies = null;
    public array $credential_keys;
    public mixed $description;
    public array $email_link_auth_origins;
    public bool $has_inbox;
    public string $id;
    public mixed $identity_provider;
    public mixed $instructions;
    public string $login_method;
    public string $login_url;
    public bool $managed;
    public bool $mfa_enabled;
    public string $name;
    public ?array $oidc = null;
    public ?string $passkey = null;
    public ?string $password = null;
    public string $project_id;
    public string $provider_guidance;
    public ?bool $remove_browser_authentication = null;
    public ?bool $remove_totp = null;
    public bool $sign_in_verified;
    public mixed $sign_in_verified_at;
    public string $status;
    public ?string $totp_secret = null;
    public string $updated_at;
    public string $username;
}

/** Request payload for VerificationProjectCredential#load. */
class VerificationProjectCredentialLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectCredential#list. */
class VerificationProjectCredentialListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectCredential#create. */
class VerificationProjectCredentialCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $browser_session = null;
    public ?bool $composal_inbox = null;
    public ?string $composal_inbox_user = null;
    public ?bool $composal_managed_google = null;
    public ?string $cookies = null;
    public mixed $description = null;
    public ?array $email_link_auth_origins = null;
    public mixed $instructions = null;
    public string $login_method;
    public ?string $login_url = null;
    public string $name;
    public ?array $oidc = null;
    public ?string $passkey = null;
    public ?string $password = null;
    public ?bool $remove_browser_authentication = null;
    public ?bool $remove_totp = null;
    public ?string $totp_secret = null;
    public ?string $username = null;
}

/** Request payload for VerificationProjectCredential#update. */
class VerificationProjectCredentialUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $browser_session = null;
    public ?bool $composal_inbox = null;
    public ?string $composal_inbox_user = null;
    public ?bool $composal_managed_google = null;
    public ?string $cookies = null;
    public mixed $description = null;
    public ?array $email_link_auth_origins = null;
    public mixed $instructions = null;
    public ?string $login_method = null;
    public ?string $login_url = null;
    public ?string $name = null;
    public ?array $oidc = null;
    public ?string $passkey = null;
    public ?string $password = null;
    public ?bool $remove_browser_authentication = null;
    public ?bool $remove_totp = null;
    public ?string $totp_secret = null;
    public ?string $username = null;
}

/** Request payload for VerificationProjectCredential#patch. */
class VerificationProjectCredentialPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $browser_session = null;
    public ?bool $composal_inbox = null;
    public ?string $composal_inbox_user = null;
    public ?bool $composal_managed_google = null;
    public ?string $cookies = null;
    public mixed $description = null;
    public ?array $email_link_auth_origins = null;
    public mixed $instructions = null;
    public ?string $login_method = null;
    public ?string $login_url = null;
    public ?string $name = null;
    public ?array $oidc = null;
    public ?string $passkey = null;
    public ?string $password = null;
    public ?bool $remove_browser_authentication = null;
    public ?bool $remove_totp = null;
    public ?string $totp_secret = null;
    public ?string $username = null;
}

/** Request payload for VerificationProjectCredential#remove. */
class VerificationProjectCredentialRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?bool $permanent = null;
}

/** VerificationProjectPersona entity data model. */
class VerificationProjectPersona
{
    public string $access_mode;
    public mixed $archived_at;
    public mixed $capabilities;
    public string $created_at;
    public mixed $credential_id;
    public mixed $goals;
    public string $id;
    public int $lock_version;
    public string $name;
    public string $project_id;
    public string $role;
    public string $updated_at;
    public int $version;
}

/** Request payload for VerificationProjectPersona#load. */
class VerificationProjectPersonaLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectPersona#list. */
class VerificationProjectPersonaListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectPersona#create. */
class VerificationProjectPersonaCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?string $access_mode = null;
    public mixed $capabilities = null;
    public mixed $credential_id = null;
    public mixed $goals = null;
    public string $name;
    public string $role;
}

/** Request payload for VerificationProjectPersona#update. */
class VerificationProjectPersonaUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $access_mode = null;
    public mixed $capabilities = null;
    public mixed $credential_id = null;
    public mixed $goals = null;
    public ?string $name = null;
    public ?string $role = null;
    public ?int $version = null;
}

/** Request payload for VerificationProjectPersona#patch. */
class VerificationProjectPersonaPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?string $access_mode = null;
    public mixed $capabilities = null;
    public mixed $credential_id = null;
    public mixed $goals = null;
    public ?string $name = null;
    public ?string $role = null;
    public ?int $version = null;
}

/** Request payload for VerificationProjectPersona#remove. */
class VerificationProjectPersonaRemoveMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** VerificationProjectRun entity data model. */
class VerificationProjectRun
{
    public mixed $approved_at;
    public mixed $approved_digest;
    public mixed $archived_at;
    public array $available_tests;
    public bool $can_archive;
    public bool $can_restore;
    public bool $can_start_another_run;
    public string $cleanup_state;
    public int $concurrency;
    public string $created_at;
    public mixed $creator_name;
    public string $definition_mode;
    public mixed $environment_id;
    public string $id;
    public int $lock_version;
    public int $max_seconds;
    public mixed $outcome;
    public array $permissions;
    public mixed $plan_digest;
    public mixed $preparation_error_code;
    public array $progress;
    public array $project;
    public string $project_id;
    public mixed $pull_request;
    public mixed $queued_at;
    public array $run;
    public mixed $run_plan_id = null;
    public array $scenario_runs;
    public mixed $source_run_id;
    public mixed $source_versions;
    public bool $start_when_prepared;
    public string $state;
    public array $target_snapshot;
    public string $title;
    public string $updated_at;
    public array $verifier_preferences_snapshot;
    public string $web_path;
}

/** Request payload for VerificationProjectRun#load. */
class VerificationProjectRunLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?bool $diagnostic = null;
}

/** Request payload for VerificationProjectRun#list. */
class VerificationProjectRunListMatch
{
    public string $organization_id;
    public string $project_id;
    public ?int $page = null;
    public ?string $status = null;
}

/** Request payload for VerificationProjectRun#create. */
class VerificationProjectRunCreateData
{
    public ?string $id = null;
    public string $organization_id;
    public string $project_id;
    public int $concurrency;
    public mixed $environment_id;
    public int $max_seconds;
    public mixed $run_plan_id = null;
    public bool $start_when_prepared;
    public mixed $digest = null;
    public mixed $idempotency_key = null;
    public mixed $mode = null;
    public mixed $run_plan_version = null;
    public mixed $scenario_files = null;
    public mixed $scenario_ids = null;
    public mixed $viewer_time_zone = null;
}

/** VerificationProjectScenario entity data model. */
class VerificationProjectScenario
{
    public ?array $actors = null;
    public string $allowed_actions;
    public mixed $archived_at;
    public ?array $cleanup = null;
    public string $created_at;
    public array $dependencies;
    public ?array $fixtures = null;
    public array $health;
    public string $id;
    public mixed $identity_probe = null;
    public mixed $if = null;
    public array $labels;
    public mixed $last_revision;
    public int $lock_version;
    public string $name;
    public mixed $on = null;
    public array $outcomes;
    public string $persona_id;
    public mixed $primary_actor = null;
    public string $project_id;
    public bool $selectable_for_run;
    public mixed $starting_conditions;
    public array $steps;
    public array $triggers;
    public string $updated_at;
    public int $version;
}

/** Request payload for VerificationProjectScenario#load. */
class VerificationProjectScenarioLoadMatch
{
    public string $id;
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectScenario#list. */
class VerificationProjectScenarioListMatch
{
    public string $organization_id;
    public string $project_id;
}

/** Request payload for VerificationProjectScenario#create. */
class VerificationProjectScenarioCreateData
{
    public string $organization_id;
    public string $project_id;
    public ?array $actors = null;
    public ?string $allowed_actions = null;
    public ?array $cleanup = null;
    public ?array $dependencies = null;
    public ?array $fixtures = null;
    public mixed $identity_probe = null;
    public mixed $if = null;
    public ?array $labels = null;
    public string $name;
    public mixed $on = null;
    public ?array $outcomes = null;
    public ?string $persona_id = null;
    public mixed $primary_actor = null;
    public mixed $starting_conditions = null;
    public ?array $steps = null;
    public ?array $triggers = null;
}

/** Request payload for VerificationProjectScenario#update. */
class VerificationProjectScenarioUpdateData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $actors = null;
    public ?string $allowed_actions = null;
    public ?array $cleanup = null;
    public ?array $dependencies = null;
    public ?array $fixtures = null;
    public mixed $identity_probe = null;
    public mixed $if = null;
    public ?array $labels = null;
    public ?string $name = null;
    public mixed $on = null;
    public ?array $outcomes = null;
    public ?string $persona_id = null;
    public mixed $primary_actor = null;
    public mixed $starting_conditions = null;
    public ?array $steps = null;
    public ?array $triggers = null;
    public ?int $version = null;
}

/** Request payload for VerificationProjectScenario#patch. */
class VerificationProjectScenarioPatchData
{
    public string $id;
    public string $organization_id;
    public string $project_id;
    public ?array $actors = null;
    public ?string $allowed_actions = null;
    public ?array $cleanup = null;
    public ?array $dependencies = null;
    public ?array $fixtures = null;
    public mixed $identity_probe = null;
    public mixed $if = null;
    public ?array $labels = null;
    public ?string $name = null;
    public mixed $on = null;
    public ?array $outcomes = null;
    public ?string $persona_id = null;
    public mixed $primary_actor = null;
    public mixed $starting_conditions = null;
    public ?array $steps = null;
    public ?array $triggers = null;
    public ?int $version = null;
}

/** VerifyAppDomain entity data model. */
class VerifyAppDomain
{
    public ?string $id = null;
}

/** Request payload for VerifyAppDomain#create. */
class VerifyAppDomainCreateData
{
    public string $app_id;
    public string $id;
}

/** VerifyBrowserSession entity data model. */
class VerifyBrowserSession
{
    public string $account_id;
    public string $expires_at;
    public string $id;
    public ?string $name = null;
    public string $origin;
    public string $project_id;
    public string $status;
    public string $url;
    public mixed $viewer_url;
}

/** Request payload for VerifyBrowserSession#load. */
class VerifyBrowserSessionLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for VerifyBrowserSession#create. */
class VerifyBrowserSessionCreateData
{
    public string $organization_id;
    public ?string $account_id = null;
    public ?string $name = null;
    public string $project_id;
    public string $url;
}

/** Request payload for VerifyBrowserSession#remove. */
class VerifyBrowserSessionRemoveMatch
{
    public string $id;
    public string $organization_id;
}

/** VerifyEmailVerification entity data model. */
class VerifyEmailVerification
{
}

/** Request payload for VerifyEmailVerification#list. */
class VerifyEmailVerificationListMatch
{
}

/** VerifySignalIntegration entity data model. */
class VerifySignalIntegration
{
    public bool $api_token_stored;
    public array $config;
    public mixed $created_at = null;
    public mixed $failure_message;
    public string $id;
    public string $inbound_path;
    public string $inbound_url;
    public mixed $last_received_at = null;
    public mixed $last_verified_at = null;
    public string $mode;
    public string $name;
    public string $organization_id;
    public string $provider;
    public int $rejected_signature_count;
    public string $status;
    public int $target_count;
    public int $unmapped_delivery_count;
    public mixed $updated_at = null;
    public bool $webhook_secret_stored;
}

/** Request payload for VerifySignalIntegration#create. */
class VerifySignalIntegrationCreateData
{
    public string $id;
    public string $organization_id;
}

/** VerifyStaticSiteDomain entity data model. */
class VerifyStaticSiteDomain
{
    public mixed $app_environment_id;
    public mixed $app_service_id;
    public string $created_at;
    public string $dns_mode;
    public string $dns_status;
    public mixed $failure_message;
    public mixed $hosted_app_id;
    public string $hostname;
    public string $id;
    public string $kind;
    public mixed $last_checked_at;
    public mixed $record_name;
    public mixed $record_type;
    public mixed $record_value;
    public mixed $redirect_to;
    public mixed $static_site_id;
    public string $target_kind;
    public string $tls_status;
    public string $updated_at;
    public string $verification_status;
}

/** Request payload for VerifyStaticSiteDomain#create. */
class VerifyStaticSiteDomainCreateData
{
    public string $id;
    public string $static_site_id;
}

/** VersionLog entity data model. */
class VersionLog
{
    public string $base_image;
    public mixed $failure_phase;
    public string $id;
    public mixed $image_digest;
    public mixed $image_reference;
    public string $installer_version;
    public mixed $ready_at;
    public mixed $receipt;
    public mixed $safe_error;
    public mixed $started_at;
    public string $status;
}

/** Request payload for VersionLog#list. */
class VersionLogListMatch
{
    public string $binary_id;
    public string $organization_id;
    public string $version_id;
    public string $project_id;
}

/** WaitlistApplication entity data model. */
class WaitlistApplication
{
}

/** Request payload for WaitlistApplication#create. */
class WaitlistApplicationCreateData
{
    public mixed $company_name = null;
    public mixed $company_size = null;
    public mixed $email = null;
    public mixed $invite_code = null;
    public mixed $name = null;
    public mixed $use_case = null;
}

/** WebBotAuth entity data model. */
class WebBotAuth
{
    public string $expires_at;
    public string $origin;
    public array $signatures;
}

/** Request payload for WebBotAuth#create. */
class WebBotAuthCreateData
{
    public string $origin;
}

/** WebhookGitlab entity data model. */
class WebhookGitlab
{
    public ?string $id = null;
}

/** Request payload for WebhookGitlab#update. */
class WebhookGitlabUpdateData
{
    public string $id;
}

/** WorkflowRunStep entity data model. */
class WorkflowRunStep
{
    public ?string $id = null;
}

/** Request payload for WorkflowRunStep#load. */
class WorkflowRunStepLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public string $workflow_run_id;
}

/** WorkflowRunStopNotice entity data model. */
class WorkflowRunStopNotice
{
}

/** Request payload for WorkflowRunStopNotice#create. */
class WorkflowRunStopNoticeCreateData
{
    public string $agent_id;
    public string $organization_id;
    public string $workflow_run_id;
}

/** WorkflowTriggerSkipped entity data model. */
class WorkflowTriggerSkipped
{
    public ?string $id = null;
}

/** Request payload for WorkflowTriggerSkipped#create. */
class WorkflowTriggerSkippedCreateData
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
    public string $workflow_trigger_id;
}

/** WorkspaceActivity entity data model. */
class WorkspaceActivity
{
    public array $live_activity;
    public array $recent_items;
    public int $unresolved_notification_count;
}

/** Request payload for WorkspaceActivity#load. */
class WorkspaceActivityLoadMatch
{
    public string $organization_id;
}

/** WorkspaceActivityNotification entity data model. */
class WorkspaceActivityNotification
{
    public ?string $id = null;
}

/** Request payload for WorkspaceActivityNotification#update. */
class WorkspaceActivityNotificationUpdateData
{
    public string $id;
    public string $organization_id;
}

/** WorkspaceSpace entity data model. */
class WorkspaceSpace
{
    public string $created_at;
    public ?string $default_branch = null;
    public mixed $description;
    public bool $hidden;
    public string $icon_name;
    public string $id;
    public mixed $import_status;
    public string $name;
    public string $organization_id;
    public mixed $position;
    public string $repository_id;
    public string $repository_slug;
    public string $slug;
    public string $status;
    public string $updated_at;
}

/** Request payload for WorkspaceSpace#load. */
class WorkspaceSpaceLoadMatch
{
    public string $id;
    public string $organization_id;
}

/** Request payload for WorkspaceSpace#list. */
class WorkspaceSpaceListMatch
{
    public string $organization_id;
}

/** Request payload for WorkspaceSpace#create. */
class WorkspaceSpaceCreateData
{
    public string $organization_id;
    public ?string $default_branch = null;
    public mixed $description = null;
    public string $icon_name;
    public string $name;
    public string $slug;
}

/** WorkspaceSpacePreference entity data model. */
class WorkspaceSpacePreference
{
    public array $preferences;
    public array $spaces;
}

/** Request payload for WorkspaceSpacePreference#update. */
class WorkspaceSpacePreferenceUpdateData
{
    public string $organization_id;
    public ?array $preferences = null;
}

