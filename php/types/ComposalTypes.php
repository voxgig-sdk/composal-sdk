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

/** Request payload for AgentConnection#load. */
class AgentConnectionLoadMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
}

/** Request payload for AgentConnection#list. */
class AgentConnectionListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $selected_connection_id = null;
}

/** Request payload for AgentConnection#create. */
class AgentConnectionCreateData
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

/** Request payload for AgentConnection#update. */
class AgentConnectionUpdateData
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

/** Request payload for AgentConnection#remove. */
class AgentConnectionRemoveMatch
{
    public string $agent_id;
    public string $id;
    public string $organization_id;
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

/** Request payload for AgentIntegration#list. */
class AgentIntegrationListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $catalog_q = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $toolkit = null;
}

/** Request payload for AgentIntegration#create. */
class AgentIntegrationCreateData
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
    public string $deployed_at;
    public int $deployments_count;
    public string $hostname;
    public string $https;
    public string $id;
    public string $name;
    public string $url;
    public string $visibility;
}

/** Request payload for AgentSite#list. */
class AgentSiteListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?string $cursor = null;
    public ?int $limit = null;
}

/** AgentSkill entity data model. */
class AgentSkill
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

/** Request payload for AgentSkill#list. */
class AgentSkillListMatch
{
    public string $agent_id;
    public string $organization_id;
}

/** Request payload for AgentSkill#create. */
class AgentSkillCreateData
{
    public string $agent_id;
    public string $organization_id;
    public bool $enabled;
    public string $name;
    public string $version;
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

/** Request payload for AgentThread#list. */
class AgentThreadListMatch
{
    public string $agent_id;
    public string $organization_id;
    public ?bool $archived = null;
    public ?string $conversation_id = null;
    public ?string $cursor = null;
    public ?string $local_cursor = null;
}

/** Request payload for AgentThread#create. */
class AgentThreadCreateData
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

