// Typed models for the Composal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/composal-sdk/go/core"
)

// A2aWellKnown is the typed data model for the a2a_well_known entity.
type A2aWellKnown struct {
}

// A2aWellKnownLoadMatch is the typed request payload for A2aWellKnown.LoadTyped.
type A2aWellKnownLoadMatch struct {
	A2aId string `json:"a2a_id"`
}

// AdminOrg is the typed data model for the admin_org entity.
type AdminOrg struct {
}

// AdminOrgLoadMatch is the typed request payload for AdminOrg.LoadTyped.
type AdminOrgLoadMatch struct {
	Id string `json:"id"`
}

// AdminOrgCreateData is the typed request payload for AdminOrg.CreateTyped.
type AdminOrgCreateData struct {
	BillingReason *string `json:"billing_reason,omitempty"`
	CustomizeOnboardingPackages *bool `json:"customize_onboarding_packages,omitempty"`
	MonthlyPriceDollars *any `json:"monthly_price_dollars,omitempty"`
	Name string `json:"name"`
	OnboardingCustomPricing *bool `json:"onboarding_custom_pricing,omitempty"`
	OnboardingPackageKeys *any `json:"onboarding_package_keys,omitempty"`
	OwnerEmail string `json:"owner_email"`
	PackageId *any `json:"package_id,omitempty"`
	SkipPayment *bool `json:"skip_payment,omitempty"`
	Slug string `json:"slug"`
}

// AdminOrgUpdateData is the typed request payload for AdminOrg.UpdateTyped.
type AdminOrgUpdateData struct {
	Id string `json:"id"`
	BillingEmail *any `json:"billing_email,omitempty"`
	MonthlyPriceDollars *any `json:"monthly_price_dollars,omitempty"`
	PackageId *any `json:"package_id,omitempty"`
	Reason *any `json:"reason,omitempty"`
}

// Agent is the typed data model for the agent entity.
type Agent struct {
}

// AgentLoadMatch is the typed request payload for Agent.LoadTyped.
type AgentLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentListMatch is the typed request payload for Agent.ListTyped.
type AgentListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	RuntimeVersion *string `json:"runtime_version,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AgentCreateData is the typed request payload for Agent.CreateTyped.
type AgentCreateData struct {
	OrganizationId string `json:"organization_id"`
	ViewerTimeZone *string `json:"viewer_time_zone,omitempty"`
	Configuration *any `json:"configuration,omitempty"`
	Name string `json:"name"`
	RuntimeVersion *string `json:"runtime_version,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// AgentUpdateData is the typed request payload for Agent.UpdateTyped.
type AgentUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Name *string `json:"name,omitempty"`
	TeamRole *string `json:"team_role,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	AcknowledgeReset *any `json:"acknowledge_reset,omitempty"`
	AfterId *any `json:"after_id,omitempty"`
	BeforeId *any `json:"before_id,omitempty"`
	ConversationId *any `json:"conversation_id,omitempty"`
	ExpectedGeneration *any `json:"expected_generation,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
	GithubAccess *any `json:"github_access,omitempty"`
	IntegrationId *any `json:"integration_id,omitempty"`
	KeepConnections *any `json:"keep_connections,omitempty"`
	MemoryMb *any `json:"memory_mb,omitempty"`
	Model *any `json:"model,omitempty"`
	Profile *any `json:"profile,omitempty"`
	Provider *any `json:"provider,omitempty"`
	Reasoning *any `json:"reasoning,omitempty"`
	RevokeAccess *any `json:"revoke_access,omitempty"`
	SetupOnly *any `json:"setup_only,omitempty"`
	Value *any `json:"value,omitempty"`
}

// AgentRemoveMatch is the typed request payload for Agent.RemoveTyped.
type AgentRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentApp is the typed data model for the agent_app entity.
type AgentApp struct {
}

// AgentAppLoadMatch is the typed request payload for AgentApp.LoadTyped.
type AgentAppLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentAppListMatch is the typed request payload for AgentApp.ListTyped.
type AgentAppListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// AgentAppCreateData is the typed request payload for AgentApp.CreateTyped.
type AgentAppCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Surface *any `json:"surface,omitempty"`
	View *any `json:"view,omitempty"`
}

// AgentAppInstall is the typed data model for the agent_app_install entity.
type AgentAppInstall struct {
}

// AgentAppInstallUpdateData is the typed request payload for AgentAppInstall.UpdateTyped.
type AgentAppInstallUpdateData struct {
	AgentAppId string `json:"agent_app_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentAppInstallRemoveMatch is the typed request payload for AgentAppInstall.RemoveTyped.
type AgentAppInstallRemoveMatch struct {
	AgentAppId string `json:"agent_app_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentAttachment is the typed data model for the agent_attachment entity.
type AgentAttachment struct {
}

// AgentAttachmentCreateData is the typed request payload for AgentAttachment.CreateTyped.
type AgentAttachmentCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ByteSize int `json:"byte_size"`
	ContentType string `json:"content_type"`
	FileName string `json:"file_name"`
}

// AgentAvatar is the typed data model for the agent_avatar entity.
type AgentAvatar struct {
}

// AgentAvatarLoadMatch is the typed request payload for AgentAvatar.LoadTyped.
type AgentAvatarLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	StyleCatalog *int `json:"style_catalog,omitempty"`
}

// AgentAvatarCreateData is the typed request payload for AgentAvatar.CreateTyped.
type AgentAvatarCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	StyleCatalog *int `json:"style_catalog,omitempty"`
	Description *any `json:"description,omitempty"`
	ExpectedGeneration *any `json:"expected_generation,omitempty"`
	Mode *any `json:"mode,omitempty"`
	Pixel *any `json:"pixel,omitempty"`
	Style *any `json:"style,omitempty"`
}

// AgentCommand is the typed data model for the agent_command entity.
type AgentCommand struct {
}

// AgentCommandListMatch is the typed request payload for AgentCommand.ListTyped.
type AgentCommandListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ConversationId *string `json:"conversation_id,omitempty"`
}

// AgentComputer is the typed data model for the agent_computer entity.
type AgentComputer struct {
}

// AgentComputerLoadMatch is the typed request payload for AgentComputer.LoadTyped.
type AgentComputerLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentComputerCreateData is the typed request payload for AgentComputer.CreateTyped.
type AgentComputerCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Prepare *any `json:"prepare,omitempty"`
}

// AgentConnection is the typed data model for the agent_connection entity.
type AgentConnection struct {
}

// AgentConnectionLoadMatch is the typed request payload for AgentConnection.LoadTyped.
type AgentConnectionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	GrantsCursor *string `json:"grants_cursor,omitempty"`
	GrantsLimit *int `json:"grants_limit,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentConnectionListMatch is the typed request payload for AgentConnection.ListTyped.
type AgentConnectionListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentConnectionCreateData is the typed request payload for AgentConnection.CreateTyped.
type AgentConnectionCreateData struct {
	OrganizationId string `json:"organization_id"`
	CreationKey *string `json:"creation_key,omitempty"`
	Name string `json:"name"`
	Toolkit string `json:"toolkit"`
}

// AgentConnectionUpdateData is the typed request payload for AgentConnection.UpdateTyped.
type AgentConnectionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Name *string `json:"name,omitempty"`
}

// AgentConnectionPatchData is the typed request payload for AgentConnection.PatchTyped.
type AgentConnectionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Name *string `json:"name,omitempty"`
}

// AgentConnectionRemoveMatch is the typed request payload for AgentConnection.RemoveTyped.
type AgentConnectionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentConnectionDelegation is the typed data model for the agent_connection_delegation entity.
type AgentConnectionDelegation struct {
}

// AgentConnectionDelegationListMatch is the typed request payload for AgentConnectionDelegation.ListTyped.
type AgentConnectionDelegationListMatch struct {
	AgentConnectionId string `json:"agent_connection_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentConnectionGrant is the typed data model for the agent_connection_grant entity.
type AgentConnectionGrant struct {
}

// AgentConnectionGrantListMatch is the typed request payload for AgentConnectionGrant.ListTyped.
type AgentConnectionGrantListMatch struct {
	AgentConnectionId string `json:"agent_connection_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentConnectionResource is the typed data model for the agent_connection_resource entity.
type AgentConnectionResource struct {
}

// AgentConnectionResourceCreateData is the typed request payload for AgentConnectionResource.CreateTyped.
type AgentConnectionResourceCreateData struct {
	AgentConnectionId string `json:"agent_connection_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *any `json:"cursor,omitempty"`
	Query *string `json:"query,omitempty"`
}

// AgentConnectionSafetyControl is the typed data model for the agent_connection_safety_control entity.
type AgentConnectionSafetyControl struct {
}

// AgentConnectionSafetyControlListMatch is the typed request payload for AgentConnectionSafetyControl.ListTyped.
type AgentConnectionSafetyControlListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentConnectionTriggerSubscription is the typed data model for the agent_connection_trigger_subscription entity.
type AgentConnectionTriggerSubscription struct {
}

// AgentConnectionTriggerSubscriptionListMatch is the typed request payload for AgentConnectionTriggerSubscription.ListTyped.
type AgentConnectionTriggerSubscriptionListMatch struct {
	AgentConnectionId string `json:"agent_connection_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentConnectionTriggerSubscriptionCreateData is the typed request payload for AgentConnectionTriggerSubscription.CreateTyped.
type AgentConnectionTriggerSubscriptionCreateData struct {
	AgentConnectionId string `json:"agent_connection_id"`
	OrganizationId string `json:"organization_id"`
	Configuration map[string]any `json:"configuration"`
	TriggerSlug string `json:"trigger_slug"`
}

// AgentConnectionTriggerSubscriptionUpdateData is the typed request payload for AgentConnectionTriggerSubscription.UpdateTyped.
type AgentConnectionTriggerSubscriptionUpdateData struct {
	AgentConnectionId string `json:"agent_connection_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
}

// AgentConnectionTriggerSubscriptionPatchData is the typed request payload for AgentConnectionTriggerSubscription.PatchTyped.
type AgentConnectionTriggerSubscriptionPatchData struct {
	AgentConnectionId string `json:"agent_connection_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
}

// AgentConnectionTriggerSubscriptionRemoveMatch is the typed request payload for AgentConnectionTriggerSubscription.RemoveTyped.
type AgentConnectionTriggerSubscriptionRemoveMatch struct {
	AgentConnectionId string `json:"agent_connection_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentContextCheckpoint is the typed data model for the agent_context_checkpoint entity.
type AgentContextCheckpoint struct {
}

// AgentContextCheckpointLoadMatch is the typed request payload for AgentContextCheckpoint.LoadTyped.
type AgentContextCheckpointLoadMatch struct {
	ChangeId string `json:"change_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ExpectedCommitId string `json:"expected_commit_id"`
	MaxByte *int `json:"max_byte,omitempty"`
}

// AgentControlFlow is the typed data model for the agent_control_flow entity.
type AgentControlFlow struct {
}

// AgentControlFlowLoadMatch is the typed request payload for AgentControlFlow.LoadTyped.
type AgentControlFlowLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentControlFlowListMatch is the typed request payload for AgentControlFlow.ListTyped.
type AgentControlFlowListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentControlFlowCreateData is the typed request payload for AgentControlFlow.CreateTyped.
type AgentControlFlowCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentCoordination is the typed data model for the agent_coordination entity.
type AgentCoordination struct {
}

// AgentCoordinationCreateData is the typed request payload for AgentCoordination.CreateTyped.
type AgentCoordinationCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	IncludeSource *any `json:"include_source,omitempty"`
}

// AgentEmail is the typed data model for the agent_email entity.
type AgentEmail struct {
}

// AgentEmailLoadMatch is the typed request payload for AgentEmail.LoadTyped.
type AgentEmailLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentEvent is the typed data model for the agent_event entity.
type AgentEvent struct {
}

// AgentEventLoadMatch is the typed request payload for AgentEvent.LoadTyped.
type AgentEventLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ConversationId *string `json:"conversation_id,omitempty"`
	DeviceActivityProvider *string `json:"device_activity_provider,omitempty"`
}

// AgentFile is the typed data model for the agent_file entity.
type AgentFile struct {
}

// AgentFileLoadMatch is the typed request payload for AgentFile.LoadTyped.
type AgentFileLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentInput is the typed data model for the agent_input entity.
type AgentInput struct {
}

// AgentInputCreateData is the typed request payload for AgentInput.CreateTyped.
type AgentInputCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	AttachmentIds *[]any `json:"attachment_ids,omitempty"`
	Attachments *[]any `json:"attachments,omitempty"`
	BrowserContext *map[string]any `json:"browser_context,omitempty"`
	ClientTime *map[string]any `json:"client_time,omitempty"`
	ConversationId string `json:"conversation_id"`
	ModelPolicy *any `json:"model_policy,omitempty"`
	RequesterMembershipId *string `json:"requester_membership_id,omitempty"`
	Speed *string `json:"speed,omitempty"`
	Text string `json:"text"`
}

// AgentIntegration is the typed data model for the agent_integration entity.
type AgentIntegration struct {
}

// AgentIntegrationLoadMatch is the typed request payload for AgentIntegration.LoadTyped.
type AgentIntegrationLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Enableable *bool `json:"enableable,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Toolkit *string `json:"toolkit,omitempty"`
}

// AgentIntegrationCreateData is the typed request payload for AgentIntegration.CreateTyped.
type AgentIntegrationCreateData struct {
	OrganizationId string `json:"organization_id"`
	CreationKey *string `json:"creation_key,omitempty"`
	Name string `json:"name"`
	Toolkit string `json:"toolkit"`
}

// AgentIntegrationRemoveMatch is the typed request payload for AgentIntegration.RemoveTyped.
type AgentIntegrationRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentIntegrationAccount is the typed data model for the agent_integration_account entity.
type AgentIntegrationAccount struct {
}

// AgentIntegrationAccountListMatch is the typed request payload for AgentIntegrationAccount.ListTyped.
type AgentIntegrationAccountListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Enableable *bool `json:"enableable,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Toolkit *string `json:"toolkit,omitempty"`
}

// AgentIntegrationCallback is the typed data model for the agent_integration_callback entity.
type AgentIntegrationCallback struct {
}

// AgentIntegrationCallbackLoadMatch is the typed request payload for AgentIntegrationCallback.LoadTyped.
type AgentIntegrationCallbackLoadMatch struct {
	Code *string `json:"code,omitempty"`
	ConnectionId string `json:"connection_id"`
	State string `json:"state"`
}

// AgentInteraction is the typed data model for the agent_interaction entity.
type AgentInteraction struct {
}

// AgentInteractionLoadMatch is the typed request payload for AgentInteraction.LoadTyped.
type AgentInteractionLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ConversationId string `json:"conversation_id"`
}

// AgentInteractionListMatch is the typed request payload for AgentInteraction.ListTyped.
type AgentInteractionListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ConversationId string `json:"conversation_id"`
	Ids *[]any `json:"ids,omitempty"`
}

// AgentInteractionCreateData is the typed request payload for AgentInteraction.CreateTyped.
type AgentInteractionCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ConversationId *any `json:"conversation_id,omitempty"`
	ExpectedRevision *any `json:"expected_revision,omitempty"`
}

// AgentLibrary is the typed data model for the agent_library entity.
type AgentLibrary struct {
}

// AgentLibraryLoadMatch is the typed request payload for AgentLibrary.LoadTyped.
type AgentLibraryLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentManager is the typed data model for the agent_manager entity.
type AgentManager struct {
}

// AgentManagerCreateData is the typed request payload for AgentManager.CreateTyped.
type AgentManagerCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	UserId string `json:"user_id"`
}

// AgentManagerRemoveMatch is the typed request payload for AgentManager.RemoveTyped.
type AgentManagerRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentManagerChoice is the typed data model for the agent_manager_choice entity.
type AgentManagerChoice struct {
}

// AgentManagerChoiceListMatch is the typed request payload for AgentManagerChoice.ListTyped.
type AgentManagerChoiceListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Q *string `json:"q,omitempty"`
}

// AgentMarketplace is the typed data model for the agent_marketplace entity.
type AgentMarketplace struct {
}

// AgentMarketplaceLoadMatch is the typed request payload for AgentMarketplace.LoadTyped.
type AgentMarketplaceLoadMatch struct {
	Id string `json:"id"`
}

// AgentMarketplaceCreateData is the typed request payload for AgentMarketplace.CreateTyped.
type AgentMarketplaceCreateData struct {
	OrganizationId string `json:"organization_id"`
	Bundle map[string]any `json:"bundle"`
	Category string `json:"category"`
	Explainer *any `json:"explainer,omitempty"`
	Name string `json:"name"`
	SourceAgentId *string `json:"source_agent_id,omitempty"`
	Summary string `json:"summary"`
	Visibility *string `json:"visibility,omitempty"`
}

// AgentMarketplaceUpdateData is the typed request payload for AgentMarketplace.UpdateTyped.
type AgentMarketplaceUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentMarketplacePatchData is the typed request payload for AgentMarketplace.PatchTyped.
type AgentMarketplacePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Bundle *map[string]any `json:"bundle,omitempty"`
	Category *string `json:"category,omitempty"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
	Explainer *any `json:"explainer,omitempty"`
	Name *string `json:"name,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// AgentMarketplaceRemoveMatch is the typed request payload for AgentMarketplace.RemoveTyped.
type AgentMarketplaceRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentMarketplaceShared is the typed data model for the agent_marketplace_shared entity.
type AgentMarketplaceShared struct {
}

// AgentMarketplaceSharedLoadMatch is the typed request payload for AgentMarketplaceShared.LoadTyped.
type AgentMarketplaceSharedLoadMatch struct {
	Id string `json:"id"`
	OrganizationId *string `json:"organization_id,omitempty"`
}

// AgentMarketplaceSharedCreateData is the typed request payload for AgentMarketplaceShared.CreateTyped.
type AgentMarketplaceSharedCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentMissionControl is the typed data model for the agent_mission_control entity.
type AgentMissionControl struct {
}

// AgentMissionControlCreateData is the typed request payload for AgentMissionControl.CreateTyped.
type AgentMissionControlCreateData struct {
	OrganizationId string `json:"organization_id"`
	Action *any `json:"action,omitempty"`
	AgentId *any `json:"agent_id,omitempty"`
	AgentIds *any `json:"agent_ids,omitempty"`
	At *any `json:"at,omitempty"`
}

// AgentOperation is the typed data model for the agent_operation entity.
type AgentOperation struct {
}

// AgentOperationLoadMatch is the typed request payload for AgentOperation.LoadTyped.
type AgentOperationLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentOperationCreateData is the typed request payload for AgentOperation.CreateTyped.
type AgentOperationCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Arguments map[string]any `json:"arguments"`
	Key string `json:"key"`
	Name string `json:"name"`
	RequesterId string `json:"requester_id"`
}

// AgentProvisioning is the typed data model for the agent_provisioning entity.
type AgentProvisioning struct {
}

// AgentProvisioningCreateData is the typed request payload for AgentProvisioning.CreateTyped.
type AgentProvisioningCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
}

// AgentPullRequest is the typed data model for the agent_pull_request entity.
type AgentPullRequest struct {
}

// AgentPullRequestListMatch is the typed request payload for AgentPullRequest.ListTyped.
type AgentPullRequestListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Scope *string `json:"scope,omitempty"`
}

// AgentQuestion is the typed data model for the agent_question entity.
type AgentQuestion struct {
}

// AgentQuestionCreateData is the typed request payload for AgentQuestion.CreateTyped.
type AgentQuestionCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Answers *any `json:"answers,omitempty"`
	ConversationId *any `json:"conversation_id,omitempty"`
}

// AgentRelayFileGrant is the typed data model for the agent_relay_file_grant entity.
type AgentRelayFileGrant struct {
}

// AgentRelayFileGrantLoadMatch is the typed request payload for AgentRelayFileGrant.LoadTyped.
type AgentRelayFileGrantLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentRelayFileGrantListMatch is the typed request payload for AgentRelayFileGrant.ListTyped.
type AgentRelayFileGrantListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	RequestKey *string `json:"request_key,omitempty"`
	SourceOperationId *string `json:"source_operation_id,omitempty"`
}

// AgentRelayFileGrantCreateData is the typed request payload for AgentRelayFileGrant.CreateTyped.
type AgentRelayFileGrantCreateData struct {
	OrganizationId string `json:"organization_id"`
	AccessMode string `json:"access_mode"`
	ConnectionId string `json:"connection_id"`
	ExpectedGeneration int `json:"expected_generation"`
	Key string `json:"key"`
	ResourceId string `json:"resource_id"`
	ResourceKind string `json:"resource_kind"`
	SourceOperationId string `json:"source_operation_id"`
}

// AgentRelayFileGrantRemoveMatch is the typed request payload for AgentRelayFileGrant.RemoveTyped.
type AgentRelayFileGrantRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentRelayFileGrantAccount is the typed data model for the agent_relay_file_grant_account entity.
type AgentRelayFileGrantAccount struct {
}

// AgentRelayFileGrantAccountListMatch is the typed request payload for AgentRelayFileGrantAccount.ListTyped.
type AgentRelayFileGrantAccountListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	SourceOperationId string `json:"source_operation_id"`
}

// AgentRepository is the typed data model for the agent_repository entity.
type AgentRepository struct {
}

// AgentRepositoryLoadMatch is the typed request payload for AgentRepository.LoadTyped.
type AgentRepositoryLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Q *string `json:"q,omitempty"`
}

// AgentRepositoryUpdateData is the typed request payload for AgentRepository.UpdateTyped.
type AgentRepositoryUpdateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
	WorkRepositories *[]any `json:"work_repositories,omitempty"`
}

// AgentResource is the typed data model for the agent_resource entity.
type AgentResource struct {
}

// AgentResourceListMatch is the typed request payload for AgentResource.ListTyped.
type AgentResourceListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentRoder is the typed data model for the agent_roder entity.
type AgentRoder struct {
}

// AgentRoderLoadMatch is the typed request payload for AgentRoder.LoadTyped.
type AgentRoderLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// AgentRoderCreateData is the typed request payload for AgentRoder.CreateTyped.
type AgentRoderCreateData struct {
	CheckpointHandoff *any `json:"checkpoint_handoff,omitempty"`
	GithubRepository *any `json:"github_repository,omitempty"`
	OrganizationId *any `json:"organization_id,omitempty"`
	RepositorySlug *any `json:"repository_slug,omitempty"`
	SessionPurpose *any `json:"session_purpose,omitempty"`
}

// AgentRoutine is the typed data model for the agent_routine entity.
type AgentRoutine struct {
}

// AgentRoutineListMatch is the typed request payload for AgentRoutine.ListTyped.
type AgentRoutineListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// AgentRoutineUpdateData is the typed request payload for AgentRoutine.UpdateTyped.
type AgentRoutineUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
	UtilityModel *map[string]any `json:"utility_model,omitempty"`
}

// AgentRun is the typed data model for the agent_run entity.
type AgentRun struct {
}

// AgentRunLoadMatch is the typed request payload for AgentRun.LoadTyped.
type AgentRunLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ConversationId *string `json:"conversation_id,omitempty"`
}

// AgentRuntime is the typed data model for the agent_runtime entity.
type AgentRuntime struct {
}

// AgentRuntimeCreateData is the typed request payload for AgentRuntime.CreateTyped.
type AgentRuntimeCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	AcknowledgeDataLoss *any `json:"acknowledge_data_loss,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
}

// AgentSession is the typed data model for the agent_session entity.
type AgentSession struct {
}

// AgentSessionLoadMatch is the typed request payload for AgentSession.LoadTyped.
type AgentSessionLoadMatch struct {
	Id string `json:"id"`
	AroundEvent *int `json:"around_event,omitempty"`
	Checkpoint *string `json:"checkpoint,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	EventDigest *string `json:"event_digest,omitempty"`
	IncludeTool *bool `json:"include_tool,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MaxByte *int `json:"max_byte,omitempty"`
	SourceRef *string `json:"source_ref,omitempty"`
}

// AgentSessionCheckpoint is the typed data model for the agent_session_checkpoint entity.
type AgentSessionCheckpoint struct {
}

// AgentSessionCheckpointLoadMatch is the typed request payload for AgentSessionCheckpoint.LoadTyped.
type AgentSessionCheckpointLoadMatch struct {
	AgentSessionId string `json:"agent_session_id"`
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// AgentSessionCheckpointCreateData is the typed request payload for AgentSessionCheckpoint.CreateTyped.
type AgentSessionCheckpointCreateData struct {
	AgentSessionId string `json:"agent_session_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// AgentSessionRoderHandoff is the typed data model for the agent_session_roder_handoff entity.
type AgentSessionRoderHandoff struct {
}

// AgentSessionRoderHandoffCreateData is the typed request payload for AgentSessionRoderHandoff.CreateTyped.
type AgentSessionRoderHandoffCreateData struct {
	AgentSessionId string `json:"agent_session_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	CheckpointId *string `json:"checkpoint_id,omitempty"`
	Purpose *string `json:"purpose,omitempty"`
}

// AgentSetting is the typed data model for the agent_setting entity.
type AgentSetting struct {
}

// AgentSettingLoadMatch is the typed request payload for AgentSetting.LoadTyped.
type AgentSettingLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentSettingUpdateData is the typed request payload for AgentSetting.UpdateTyped.
type AgentSettingUpdateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedVersion *string `json:"expected_version,omitempty"`
	Instructions *string `json:"instructions,omitempty"`
}

// AgentSharing is the typed data model for the agent_sharing entity.
type AgentSharing struct {
}

// AgentSharingLoadMatch is the typed request payload for AgentSharing.LoadTyped.
type AgentSharingLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentSite is the typed data model for the agent_site entity.
type AgentSite struct {
}

// AgentSiteLoadMatch is the typed request payload for AgentSite.LoadTyped.
type AgentSiteLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentSiteListMatch is the typed request payload for AgentSite.ListTyped.
type AgentSiteListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// AgentSiteCreateData is the typed request payload for AgentSite.CreateTyped.
type AgentSiteCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Surface *any `json:"surface,omitempty"`
	View *any `json:"view,omitempty"`
}

// AgentSkill is the typed data model for the agent_skill entity.
type AgentSkill struct {
}

// AgentSkillLoadMatch is the typed request payload for AgentSkill.LoadTyped.
type AgentSkillLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// AgentSkillCreateData is the typed request payload for AgentSkill.CreateTyped.
type AgentSkillCreateData struct {
	OrganizationId string `json:"organization_id"`
	Audience map[string]any `json:"audience"`
	Marketplace *string `json:"marketplace,omitempty"`
	Plugin *string `json:"plugin,omitempty"`
	Revision string `json:"revision"`
	Skills []any `json:"skills"`
	Source *string `json:"source,omitempty"`
}

// AgentSkillUpdateData is the typed request payload for AgentSkill.UpdateTyped.
type AgentSkillUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AgentIds *any `json:"agent_ids,omitempty"`
	Mode *any `json:"mode,omitempty"`
	NewAgents *any `json:"new_agents,omitempty"`
}

// AgentSkillRemoveMatch is the typed request payload for AgentSkill.RemoveTyped.
type AgentSkillRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentSlack is the typed data model for the agent_slack entity.
type AgentSlack struct {
}

// AgentSlackCreateData is the typed request payload for AgentSlack.CreateTyped.
type AgentSlackCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Action *any `json:"action,omitempty"`
	BotToken *any `json:"bot_token,omitempty"`
	Callback *any `json:"callback,omitempty"`
	ConfirmBeforeSending *any `json:"confirm_before_sending,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
	Mode *any `json:"mode,omitempty"`
	ShowSentUsing *any `json:"show_sent_using,omitempty"`
	SigningSecret *any `json:"signing_secret,omitempty"`
}

// AgentSubagent is the typed data model for the agent_subagent entity.
type AgentSubagent struct {
}

// AgentSubagentListMatch is the typed request payload for AgentSubagent.ListTyped.
type AgentSubagentListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ConversationId *string `json:"conversation_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
}

// AgentSubscription is the typed data model for the agent_subscription entity.
type AgentSubscription struct {
}

// AgentSubscriptionLoadMatch is the typed request payload for AgentSubscription.LoadTyped.
type AgentSubscriptionLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	RefreshProvider *string `json:"refresh_provider,omitempty"`
}

// AgentSubscriptionCreateData is the typed request payload for AgentSubscription.CreateTyped.
type AgentSubscriptionCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ActionName *any `json:"action_name,omitempty"`
	Label *any `json:"label,omitempty"`
	LoginId *any `json:"login_id,omitempty"`
	Method *any `json:"method,omitempty"`
	Model *any `json:"model,omitempty"`
	ProfileId *any `json:"profile_id,omitempty"`
	Provider *any `json:"provider,omitempty"`
	Reasoning *any `json:"reasoning,omitempty"`
	StepId *any `json:"step_id,omitempty"`
	Token *any `json:"token,omitempty"`
	Value *any `json:"value,omitempty"`
	Version *any `json:"version,omitempty"`
}

// AgentSwarm is the typed data model for the agent_swarm entity.
type AgentSwarm struct {
}

// AgentSwarmLoadMatch is the typed request payload for AgentSwarm.LoadTyped.
type AgentSwarmLoadMatch struct {
	Id string `json:"id"`
}

// AgentSwarmListMatch is the typed request payload for AgentSwarm.ListTyped.
type AgentSwarmListMatch struct {
	Org string `json:"org"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// AgentSwarmCreateData is the typed request payload for AgentSwarm.CreateTyped.
type AgentSwarmCreateData struct {
	BaseBookmark *any `json:"base_bookmark,omitempty"`
	BaseRef *any `json:"base_ref,omitempty"`
	BaseRevision *any `json:"base_revision,omitempty"`
	Budget *map[string]any `json:"budget,omitempty"`
	ConcurrencyKey *any `json:"concurrency_key,omitempty"`
	Environment *map[string]any `json:"environment,omitempty"`
	Goal *any `json:"goal,omitempty"`
	Model *any `json:"model,omitempty"`
	ModelProvider *any `json:"model_provider,omitempty"`
	OrganizationSlug any `json:"organization_slug"`
	Policy *map[string]any `json:"policy,omitempty"`
	QueuedAt *any `json:"queued_at,omitempty"`
	Repository *string `json:"repository,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Target *map[string]any `json:"target,omitempty"`
	TaskTemplateJson *any `json:"task_template_json,omitempty"`
	Tasks *[]any `json:"tasks,omitempty"`
}

// AgentSwarmUpdateData is the typed request payload for AgentSwarm.UpdateTyped.
type AgentSwarmUpdateData struct {
	Id string `json:"id"`
	Policy *map[string]any `json:"policy,omitempty"`
}

// AgentTeammate is the typed data model for the agent_teammate entity.
type AgentTeammate struct {
}

// AgentTeammateListMatch is the typed request payload for AgentTeammate.ListTyped.
type AgentTeammateListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Q *string `json:"q,omitempty"`
}

// AgentTerminal is the typed data model for the agent_terminal entity.
type AgentTerminal struct {
}

// AgentTerminalCreateData is the typed request payload for AgentTerminal.CreateTyped.
type AgentTerminalCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentThread is the typed data model for the agent_thread entity.
type AgentThread struct {
}

// AgentThreadLoadMatch is the typed request payload for AgentThread.LoadTyped.
type AgentThreadLoadMatch struct {
	Id string `json:"id"`
}

// AgentThreadCreateData is the typed request payload for AgentThread.CreateTyped.
type AgentThreadCreateData struct {
}

// AgentTool is the typed data model for the agent_tool entity.
type AgentTool struct {
}

// AgentToolListMatch is the typed request payload for AgentTool.ListTyped.
type AgentToolListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentUsage is the typed data model for the agent_usage entity.
type AgentUsage struct {
}

// AgentUsageLoadMatch is the typed request payload for AgentUsage.LoadTyped.
type AgentUsageLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Window *string `json:"window,omitempty"`
}

// AgentVerifyProject is the typed data model for the agent_verify_project entity.
type AgentVerifyProject struct {
}

// AgentVerifyProjectListMatch is the typed request payload for AgentVerifyProject.ListTyped.
type AgentVerifyProjectListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentVerifyProjectUpdateData is the typed request payload for AgentVerifyProject.UpdateTyped.
type AgentVerifyProjectUpdateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
	VerifyProjects *[]any `json:"verify_projects,omitempty"`
}

// AgentWait is the typed data model for the agent_wait entity.
type AgentWait struct {
}

// AgentWaitCreateData is the typed request payload for AgentWait.CreateTyped.
type AgentWaitCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWebPreview is the typed data model for the agent_web_preview entity.
type AgentWebPreview struct {
}

// AgentWebPreviewLoadMatch is the typed request payload for AgentWebPreview.LoadTyped.
type AgentWebPreviewLoadMatch struct {
	Asset *string `json:"asset,omitempty"`
	Token string `json:"token"`
}

// AgentWebhook is the typed data model for the agent_webhook entity.
type AgentWebhook struct {
}

// AgentWebhookLoadMatch is the typed request payload for AgentWebhook.LoadTyped.
type AgentWebhookLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWebhookCreateData is the typed request payload for AgentWebhook.CreateTyped.
type AgentWebhookCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	EventTypes []any `json:"event_types"`
	MaxEventsPerDay int `json:"max_events_per_day"`
	Name string `json:"name"`
	Purpose string `json:"purpose"`
}

// AgentWebhookUpdateData is the typed request payload for AgentWebhook.UpdateTyped.
type AgentWebhookUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Action *string `json:"action,omitempty"`
	ExpectedGeneration *int `json:"expected_generation,omitempty"`
}

// AgentWork is the typed data model for the agent_work entity.
type AgentWork struct {
}

// AgentWorkCreateData is the typed request payload for AgentWork.CreateTyped.
type AgentWorkCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Revision *any `json:"revision,omitempty"`
}

// AgentWorkflow is the typed data model for the agent_workflow entity.
type AgentWorkflow struct {
}

// AgentWorkflowLoadMatch is the typed request payload for AgentWorkflow.LoadTyped.
type AgentWorkflowLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	View *string `json:"view,omitempty"`
	WorkflowPath *string `json:"workflow_path,omitempty"`
}

// AgentWorkflowCreateData is the typed request payload for AgentWorkflow.CreateTyped.
type AgentWorkflowCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Path string `json:"path"`
	Template string `json:"template"`
}

// AgentWorkflowUpdateData is the typed request payload for AgentWorkflow.UpdateTyped.
type AgentWorkflowUpdateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedDigest *string `json:"expected_digest,omitempty"`
	Path *string `json:"path,omitempty"`
	Source *string `json:"source,omitempty"`
}

// AgentWorkflowProposal is the typed data model for the agent_workflow_proposal entity.
type AgentWorkflowProposal struct {
}

// AgentWorkflowProposalLoadMatch is the typed request payload for AgentWorkflowProposal.LoadTyped.
type AgentWorkflowProposalLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWorkflowProposalCreateData is the typed request payload for AgentWorkflowProposal.CreateTyped.
type AgentWorkflowProposalCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Digest string `json:"digest"`
	Model *any `json:"model,omitempty"`
	Reasoning *any `json:"reasoning,omitempty"`
}

// AgentWorkflowRun is the typed data model for the agent_workflow_run entity.
type AgentWorkflowRun struct {
}

// AgentWorkflowRunLoadMatch is the typed request payload for AgentWorkflowRun.LoadTyped.
type AgentWorkflowRunLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	DecisionCursor *string `json:"decision_cursor,omitempty"`
}

// AgentWorkflowRunListMatch is the typed request payload for AgentWorkflowRun.ListTyped.
type AgentWorkflowRunListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	AutomationKey *string `json:"automation_key,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	View *string `json:"view,omitempty"`
	WorkflowPath *string `json:"workflow_path,omitempty"`
}

// AgentWorkflowRunCreateData is the typed request payload for AgentWorkflowRun.CreateTyped.
type AgentWorkflowRunCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Checkpoint any `json:"checkpoint"`
	ResumeCount int `json:"resume_count"`
	Answer *any `json:"answer,omitempty"`
	Approved *any `json:"approved,omitempty"`
	QuestionAt *any `json:"question_at,omitempty"`
}

// AgentWorkflowTrigger is the typed data model for the agent_workflow_trigger entity.
type AgentWorkflowTrigger struct {
}

// AgentWorkflowTriggerLoadMatch is the typed request payload for AgentWorkflowTrigger.LoadTyped.
type AgentWorkflowTriggerLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWorkflowTriggerListMatch is the typed request payload for AgentWorkflowTrigger.ListTyped.
type AgentWorkflowTriggerListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWorkflowTriggerUpdateData is the typed request payload for AgentWorkflowTrigger.UpdateTyped.
type AgentWorkflowTriggerUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	DailyLimit *any `json:"daily_limit,omitempty"`
	ReadAt *any `json:"read_at,omitempty"`
	RunBudgetUsd *any `json:"run_budget_usd,omitempty"`
}

// AgentWorkflowTriggerRemoveMatch is the typed request payload for AgentWorkflowTrigger.RemoveTyped.
type AgentWorkflowTriggerRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWorkspace is the typed data model for the agent_workspace entity.
type AgentWorkspace struct {
}

// AgentWorkspaceListMatch is the typed request payload for AgentWorkspace.ListTyped.
type AgentWorkspaceListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// AgentWorkspaceUpdateData is the typed request payload for AgentWorkspace.UpdateTyped.
type AgentWorkspaceUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Action *string `json:"action,omitempty"`
}

// AgentWritePermission is the typed data model for the agent_write_permission entity.
type AgentWritePermission struct {
}

// AgentWritePermissionListMatch is the typed request payload for AgentWritePermission.ListTyped.
type AgentWritePermissionListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentWritePermissionRemoveMatch is the typed request payload for AgentWritePermission.RemoveTyped.
type AgentWritePermissionRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// Agreement is the typed data model for the agreement entity.
type Agreement struct {
}

// AgreementListMatch is the typed request payload for Agreement.ListTyped.
type AgreementListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// AgreementAccessRequest is the typed data model for the agreement_access_request entity.
type AgreementAccessRequest struct {
}

// AgreementAccessRequestCreateData is the typed request payload for AgreementAccessRequest.CreateTyped.
type AgreementAccessRequestCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// AlertRuleEvent is the typed data model for the alert_rule_event entity.
type AlertRuleEvent struct {
}

// AlertRuleEventLoadMatch is the typed request payload for AlertRuleEvent.LoadTyped.
type AlertRuleEventLoadMatch struct {
	AlertRuleId string `json:"alert_rule_id"`
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// AlertRuleEventCreateData is the typed request payload for AlertRuleEvent.CreateTyped.
type AlertRuleEventCreateData struct {
	AlertRuleId string `json:"alert_rule_id"`
	SpaceId string `json:"space_id"`
}

// AlertRuleEventRemoveMatch is the typed request payload for AlertRuleEvent.RemoveTyped.
type AlertRuleEventRemoveMatch struct {
	AlertRuleId string `json:"alert_rule_id"`
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// AllocationLog is the typed data model for the allocation_log entity.
type AllocationLog struct {
}

// AllocationLogLoadMatch is the typed request payload for AllocationLog.LoadTyped.
type AllocationLogLoadMatch struct {
	AllocationId string `json:"allocation_id"`
	AppId string `json:"app_id"`
	Offset *int `json:"offset,omitempty"`
	Origin *string `json:"origin,omitempty"`
	Task *string `json:"task,omitempty"`
	Type *string `json:"type,omitempty"`
}

// App is the typed data model for the app entity.
type App struct {
}

// AppLoadMatch is the typed request payload for App.LoadTyped.
type AppLoadMatch struct {
	Id string `json:"id"`
}

// AppListMatch is the typed request payload for App.ListTyped.
type AppListMatch struct {
	OrganizationId *string `json:"organization_id,omitempty"`
}

// AppCreateData is the typed request payload for App.CreateTyped.
type AppCreateData struct {
	Description *any `json:"description,omitempty"`
	Framework *any `json:"framework,omitempty"`
	Name string `json:"name"`
	OrganizationId string `json:"organization_id"`
	RepositoryId string `json:"repository_id"`
	RootPath string `json:"root_path"`
	Slug string `json:"slug"`
	Status *string `json:"status,omitempty"`
}

// AppUpdateData is the typed request payload for App.UpdateTyped.
type AppUpdateData struct {
	Id string `json:"id"`
	Description *any `json:"description,omitempty"`
	Framework *any `json:"framework,omitempty"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
	RootPath *string `json:"root_path,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppPatchData is the typed request payload for App.PatchTyped.
type AppPatchData struct {
	Id string `json:"id"`
	Description *any `json:"description,omitempty"`
	Framework *any `json:"framework,omitempty"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
	RootPath *string `json:"root_path,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppRemoveMatch is the typed request payload for App.RemoveTyped.
type AppRemoveMatch struct {
	Id string `json:"id"`
}

// AppAccess is the typed data model for the app_access entity.
type AppAccess struct {
}

// AppAccessLoadMatch is the typed request payload for AppAccess.LoadTyped.
type AppAccessLoadMatch struct {
}

// AppAccessJwk is the typed data model for the app_access_jwk entity.
type AppAccessJwk struct {
}

// AppAccessJwkLoadMatch is the typed request payload for AppAccessJwk.LoadTyped.
type AppAccessJwkLoadMatch struct {
}

// AppCdn is the typed data model for the app_cdn entity.
type AppCdn struct {
}

// AppCdnLoadMatch is the typed request payload for AppCdn.LoadTyped.
type AppCdnLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppCdnCreateData is the typed request payload for AppCdn.CreateTyped.
type AppCdnCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	CachePathPrefix *any `json:"cache_path_prefix,omitempty"`
	CacheSettingsJson *any `json:"cache_settings_json,omitempty"`
	DistributionKind *string `json:"distribution_kind,omitempty"`
	Name string `json:"name"`
	OriginUrl string `json:"origin_url"`
	RoutingSettingsJson *any `json:"routing_settings_json,omitempty"`
	SecuritySettingsJson *any `json:"security_settings_json,omitempty"`
	Slug string `json:"slug"`
	Status *string `json:"status,omitempty"`
}

// AppCdnUpdateData is the typed request payload for AppCdn.UpdateTyped.
type AppCdnUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	CachePathPrefix *any `json:"cache_path_prefix,omitempty"`
	CacheSettingsJson *any `json:"cache_settings_json,omitempty"`
	DistributionKind *string `json:"distribution_kind,omitempty"`
	Name *string `json:"name,omitempty"`
	OriginUrl *string `json:"origin_url,omitempty"`
	RoutingSettingsJson *any `json:"routing_settings_json,omitempty"`
	SecuritySettingsJson *any `json:"security_settings_json,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppCdnPatchData is the typed request payload for AppCdn.PatchTyped.
type AppCdnPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	CachePathPrefix *any `json:"cache_path_prefix,omitempty"`
	CacheSettingsJson *any `json:"cache_settings_json,omitempty"`
	DistributionKind *string `json:"distribution_kind,omitempty"`
	Name *string `json:"name,omitempty"`
	OriginUrl *string `json:"origin_url,omitempty"`
	RoutingSettingsJson *any `json:"routing_settings_json,omitempty"`
	SecuritySettingsJson *any `json:"security_settings_json,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppCdnRemoveMatch is the typed request payload for AppCdn.RemoveTyped.
type AppCdnRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppConfigVariable is the typed data model for the app_config_variable entity.
type AppConfigVariable struct {
}

// AppConfigVariableLoadMatch is the typed request payload for AppConfigVariable.LoadTyped.
type AppConfigVariableLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
}

// AppConfigVariableCreateData is the typed request payload for AppConfigVariable.CreateTyped.
type AppConfigVariableCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	Description *any `json:"description,omitempty"`
	ExposedToBuild bool `json:"exposed_to_build"`
	Key string `json:"key"`
	ScopeKind string `json:"scope_kind"`
	Value *any `json:"value,omitempty"`
	ValueKind string `json:"value_kind"`
}

// AppConfigVariableUpdateData is the typed request payload for AppConfigVariable.UpdateTyped.
type AppConfigVariableUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppConfigVariablePatchData is the typed request payload for AppConfigVariable.PatchTyped.
type AppConfigVariablePatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppConfigVariableRemoveMatch is the typed request payload for AppConfigVariable.RemoveTyped.
type AppConfigVariableRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDataResource is the typed data model for the app_data_resource entity.
type AppDataResource struct {
}

// AppDataResourceLoadMatch is the typed request payload for AppDataResource.LoadTyped.
type AppDataResourceLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppDataResourceCreateData is the typed request payload for AppDataResource.CreateTyped.
type AppDataResourceCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	Engine string `json:"engine"`
	HighAvailability *bool `json:"high_availability,omitempty"`
	Kind string `json:"kind"`
	Name string `json:"name"`
	Plan *any `json:"plan,omitempty"`
	Region *any `json:"region,omitempty"`
	Slug string `json:"slug"`
	StorageGb *any `json:"storage_gb,omitempty"`
	Version *any `json:"version,omitempty"`
}

// AppDataResourceUpdateData is the typed request payload for AppDataResource.UpdateTyped.
type AppDataResourceUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDataResourcePatchData is the typed request payload for AppDataResource.PatchTyped.
type AppDataResourcePatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDataResourceRemoveMatch is the typed request payload for AppDataResource.RemoveTyped.
type AppDataResourceRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDeploy is the typed data model for the app_deploy entity.
type AppDeploy struct {
}

// AppDeployCreateData is the typed request payload for AppDeploy.CreateTyped.
type AppDeployCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	Channel *string `json:"channel,omitempty"`
	Command *string `json:"command,omitempty"`
	CommitSha *string `json:"commit_sha,omitempty"`
	DesiredInstances *int `json:"desired_instances,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Image string `json:"image"`
	Region *string `json:"region,omitempty"`
	RolloutPredecessor *string `json:"rollout_predecessor,omitempty"`
	Service *string `json:"service,omitempty"`
	SourceRef *string `json:"source_ref,omitempty"`
}

// AppDeployment is the typed data model for the app_deployment entity.
type AppDeployment struct {
}

// AppDeploymentLoadMatch is the typed request payload for AppDeployment.LoadTyped.
type AppDeploymentLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppDeploymentCreateData is the typed request payload for AppDeployment.CreateTyped.
type AppDeploymentCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	AppServicePlacementId *string `json:"app_service_placement_id,omitempty"`
	ArtifactLocator *any `json:"artifact_locator,omitempty"`
	CommitSha *any `json:"commit_sha,omitempty"`
	DeployedUrl *any `json:"deployed_url,omitempty"`
	FailureMessage *any `json:"failure_message,omitempty"`
	FinishedAt *any `json:"finished_at,omitempty"`
	LocationId *string `json:"location_id,omitempty"`
	SourceRef *any `json:"source_ref,omitempty"`
	StartedAt *any `json:"started_at,omitempty"`
	Status *string `json:"status,omitempty"`
	TriggerKind *string `json:"trigger_kind,omitempty"`
}

// AppDeploymentUpdateData is the typed request payload for AppDeployment.UpdateTyped.
type AppDeploymentUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDeploymentPatchData is the typed request payload for AppDeployment.PatchTyped.
type AppDeploymentPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDeploymentRemoveMatch is the typed request payload for AppDeployment.RemoveTyped.
type AppDeploymentRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDeploymentDashboard is the typed data model for the app_deployment_dashboard entity.
type AppDeploymentDashboard struct {
}

// AppDeploymentDashboardLoadMatch is the typed request payload for AppDeploymentDashboard.LoadTyped.
type AppDeploymentDashboardLoadMatch struct {
	Id string `json:"id"`
	MetricsRange *string `json:"metrics_range,omitempty"`
}

// AppDeploymentOperation is the typed data model for the app_deployment_operation entity.
type AppDeploymentOperation struct {
}

// AppDeploymentOperationLoadMatch is the typed request payload for AppDeploymentOperation.LoadTyped.
type AppDeploymentOperationLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppDeploymentOperationListMatch is the typed request payload for AppDeploymentOperation.ListTyped.
type AppDeploymentOperationListMatch struct {
	AppId string `json:"app_id"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
}

// AppDeploymentOperationCreateData is the typed request payload for AppDeploymentOperation.CreateTyped.
type AppDeploymentOperationCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	AppServicePlacementId *string `json:"app_service_placement_id,omitempty"`
	ArtifactLocator *any `json:"artifact_locator,omitempty"`
	CommitSha *any `json:"commit_sha,omitempty"`
	DeployedUrl *any `json:"deployed_url,omitempty"`
	FailureMessage *string `json:"failure_message,omitempty"`
	FinishedAt *string `json:"finished_at,omitempty"`
	LocationId *string `json:"location_id,omitempty"`
	SourceRef *any `json:"source_ref,omitempty"`
	StartedAt *string `json:"started_at,omitempty"`
	Status *string `json:"status,omitempty"`
	TriggerKind *string `json:"trigger_kind,omitempty"`
}

// AppDeploymentRollback is the typed data model for the app_deployment_rollback entity.
type AppDeploymentRollback struct {
}

// AppDeploymentRollbackCreateData is the typed request payload for AppDeploymentRollback.CreateTyped.
type AppDeploymentRollbackCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	Deployment *any `json:"deployment,omitempty"`
	Environment *any `json:"environment,omitempty"`
	Force *bool `json:"force,omitempty"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Reason *any `json:"reason,omitempty"`
	Service *any `json:"service,omitempty"`
	To *string `json:"to,omitempty"`
}

// AppEnvironment is the typed data model for the app_environment entity.
type AppEnvironment struct {
}

// AppEnvironmentLoadMatch is the typed request payload for AppEnvironment.LoadTyped.
type AppEnvironmentLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppEnvironmentCreateData is the typed request payload for AppEnvironment.CreateTyped.
type AppEnvironmentCreateData struct {
	AppId string `json:"app_id"`
	AutoDeploy bool `json:"auto_deploy"`
	BaseDomain *any `json:"base_domain,omitempty"`
	BranchPattern *any `json:"branch_pattern,omitempty"`
	Kind string `json:"kind"`
	LocationId string `json:"location_id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	Status string `json:"status"`
}

// AppEnvironmentUpdateData is the typed request payload for AppEnvironment.UpdateTyped.
type AppEnvironmentUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AutoDeploy *bool `json:"auto_deploy,omitempty"`
	BaseDomain *any `json:"base_domain,omitempty"`
	BranchPattern *any `json:"branch_pattern,omitempty"`
	Kind *string `json:"kind,omitempty"`
	LocationId *string `json:"location_id,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppEnvironmentPatchData is the typed request payload for AppEnvironment.PatchTyped.
type AppEnvironmentPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AutoDeploy *bool `json:"auto_deploy,omitempty"`
	BaseDomain *any `json:"base_domain,omitempty"`
	BranchPattern *any `json:"branch_pattern,omitempty"`
	Kind *string `json:"kind,omitempty"`
	LocationId *string `json:"location_id,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppEnvironmentRemoveMatch is the typed request payload for AppEnvironment.RemoveTyped.
type AppEnvironmentRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppLocation is the typed data model for the app_location entity.
type AppLocation struct {
}

// AppLocationListMatch is the typed request payload for AppLocation.ListTyped.
type AppLocationListMatch struct {
	AppId string `json:"app_id"`
}

// AppLocationCreateData is the typed request payload for AppLocation.CreateTyped.
type AppLocationCreateData struct {
	AppId string `json:"app_id"`
	LocationId string `json:"location_id"`
}

// AppLocationRemoveMatch is the typed request payload for AppLocation.RemoveTyped.
type AppLocationRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppMetric is the typed data model for the app_metric entity.
type AppMetric struct {
}

// AppMetricLoadMatch is the typed request payload for AppMetric.LoadTyped.
type AppMetricLoadMatch struct {
	AppId string `json:"app_id"`
}

// AppPreview is the typed data model for the app_preview entity.
type AppPreview struct {
}

// AppPreviewLoadMatch is the typed request payload for AppPreview.LoadTyped.
type AppPreviewLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppPreviewCreateData is the typed request payload for AppPreview.CreateTyped.
type AppPreviewCreateData struct {
	AppId string `json:"app_id"`
	AppPreviewProfileId string `json:"app_preview_profile_id"`
	ChangeNumber *string `json:"change_number,omitempty"`
	ExpectedPatchset *int `json:"expected_patchset,omitempty"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	SourceRef *string `json:"source_ref,omitempty"`
}

// AppPreviewUpdateData is the typed request payload for AppPreview.UpdateTyped.
type AppPreviewUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppPreviewPatchData is the typed request payload for AppPreview.PatchTyped.
type AppPreviewPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	Access *string `json:"access,omitempty"`
	ExpectedGeneration *int `json:"expected_generation,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ResourceOverrides *map[string]any `json:"resource_overrides,omitempty"`
	Retained *bool `json:"retained,omitempty"`
	SharedDataBindingIds *[]any `json:"shared_data_binding_ids,omitempty"`
	SharedServiceBindingIds *[]any `json:"shared_service_binding_ids,omitempty"`
	StorageBindingResources *map[string]any `json:"storage_binding_resources,omitempty"`
}

// AppPreviewRemoveMatch is the typed request payload for AppPreview.RemoveTyped.
type AppPreviewRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppPreviewProfile is the typed data model for the app_preview_profile entity.
type AppPreviewProfile struct {
}

// AppPreviewProfileLoadMatch is the typed request payload for AppPreviewProfile.LoadTyped.
type AppPreviewProfileLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppPreviewProfileCreateData is the typed request payload for AppPreviewProfile.CreateTyped.
type AppPreviewProfileCreateData struct {
	AppId string `json:"app_id"`
	Automatic *bool `json:"automatic,omitempty"`
	Configuration *map[string]any `json:"configuration,omitempty"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	SourceEnvironmentId string `json:"source_environment_id"`
	TtlDays *int `json:"ttl_days,omitempty"`
}

// AppPreviewProfileUpdateData is the typed request payload for AppPreviewProfile.UpdateTyped.
type AppPreviewProfileUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppPreviewProfilePatchData is the typed request payload for AppPreviewProfile.PatchTyped.
type AppPreviewProfilePatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	Automatic *bool `json:"automatic,omitempty"`
	Configuration *map[string]any `json:"configuration,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourceEnvironmentId *string `json:"source_environment_id,omitempty"`
	TtlDays *int `json:"ttl_days,omitempty"`
}

// AppPreviewProfileRemoveMatch is the typed request payload for AppPreviewProfile.RemoveTyped.
type AppPreviewProfileRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppRun is the typed data model for the app_run entity.
type AppRun struct {
}

// AppRunLoadMatch is the typed request payload for AppRun.LoadTyped.
type AppRunLoadMatch struct {
	Id string `json:"id"`
}

// AppRunCreateData is the typed request payload for AppRun.CreateTyped.
type AppRunCreateData struct {
	Image *string `json:"image,omitempty"`
}

// AppSecret is the typed data model for the app_secret entity.
type AppSecret struct {
}

// AppSecretLoadMatch is the typed request payload for AppSecret.LoadTyped.
type AppSecretLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppSecretListMatch is the typed request payload for AppSecret.ListTyped.
type AppSecretListMatch struct {
	AppId string `json:"app_id"`
}

// AppSecretCreateData is the typed request payload for AppSecret.CreateTyped.
type AppSecretCreateData struct {
	AppId string `json:"app_id"`
	Description *any `json:"description,omitempty"`
	EnvKey *any `json:"env_key,omitempty"`
	ExposeToBuild *bool `json:"expose_to_build,omitempty"`
	Name string `json:"name"`
	RotationPolicy *any `json:"rotation_policy,omitempty"`
	Slug string `json:"slug"`
	Value *string `json:"value,omitempty"`
	ValueKind *any `json:"value_kind,omitempty"`
}

// AppSecretUpdateData is the typed request payload for AppSecret.UpdateTyped.
type AppSecretUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	Description *any `json:"description,omitempty"`
	EnvKey *any `json:"env_key,omitempty"`
	ExposeToBuild *bool `json:"expose_to_build,omitempty"`
	Name *string `json:"name,omitempty"`
	RotationPolicy *any `json:"rotation_policy,omitempty"`
}

// AppSecretPatchData is the typed request payload for AppSecret.PatchTyped.
type AppSecretPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	Description *any `json:"description,omitempty"`
	EnvKey *any `json:"env_key,omitempty"`
	ExposeToBuild *bool `json:"expose_to_build,omitempty"`
	Name *string `json:"name,omitempty"`
	RotationPolicy *any `json:"rotation_policy,omitempty"`
}

// AppSecretRemoveMatch is the typed request payload for AppSecret.RemoveTyped.
type AppSecretRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppService is the typed data model for the app_service entity.
type AppService struct {
}

// AppServiceLoadMatch is the typed request payload for AppService.LoadTyped.
type AppServiceLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppServiceCreateData is the typed request payload for AppService.CreateTyped.
type AppServiceCreateData struct {
	AppId string `json:"app_id"`
	AutoDeploy bool `json:"auto_deploy"`
	BuildCommand *any `json:"build_command,omitempty"`
	CpuMhz *any `json:"cpu_mhz,omitempty"`
	DeployPaths *[]any `json:"deploy_paths,omitempty"`
	DesiredInstances int `json:"desired_instances"`
	DiskMb *any `json:"disk_mb,omitempty"`
	HealthcheckPath *any `json:"healthcheck_path,omitempty"`
	InternalPort *any `json:"internal_port,omitempty"`
	Kind string `json:"kind"`
	MemoryMaxMb *any `json:"memory_max_mb,omitempty"`
	MemoryMb *any `json:"memory_mb,omitempty"`
	Name string `json:"name"`
	NomadConstraintsJson *any `json:"nomad_constraints_json,omitempty"`
	NomadKillTimeoutSeconds *any `json:"nomad_kill_timeout_seconds,omitempty"`
	NomadNamespace *any `json:"nomad_namespace,omitempty"`
	NomadRegion *any `json:"nomad_region,omitempty"`
	NomadShutdownDelaySeconds *any `json:"nomad_shutdown_delay_seconds,omitempty"`
	NomadUlimitsJson *any `json:"nomad_ulimits_json,omitempty"`
	NomadUpdateStrategyJson *any `json:"nomad_update_strategy_json,omitempty"`
	PrestartCommand *any `json:"prestart_command,omitempty"`
	PubliclyAccessible bool `json:"publicly_accessible"`
	ReleaseCommand *any `json:"release_command,omitempty"`
	Runtime string `json:"runtime"`
	RuntimeAdapterKind string `json:"runtime_adapter_kind"`
	RuntimeAdapterSettingsJson *any `json:"runtime_adapter_settings_json,omitempty"`
	Schedule *any `json:"schedule,omitempty"`
	Slug string `json:"slug"`
	SourcePath string `json:"source_path"`
	StartCommand any `json:"start_command"`
}

// AppServiceUpdateData is the typed request payload for AppService.UpdateTyped.
type AppServiceUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AutoDeploy *bool `json:"auto_deploy,omitempty"`
	BuildCommand *any `json:"build_command,omitempty"`
	CpuMhz *any `json:"cpu_mhz,omitempty"`
	DeployPaths *[]any `json:"deploy_paths,omitempty"`
	DesiredInstances *int `json:"desired_instances,omitempty"`
	DiskMb *any `json:"disk_mb,omitempty"`
	HealthcheckPath *any `json:"healthcheck_path,omitempty"`
	InternalPort *any `json:"internal_port,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MemoryMaxMb *any `json:"memory_max_mb,omitempty"`
	MemoryMb *any `json:"memory_mb,omitempty"`
	Name *string `json:"name,omitempty"`
	NomadConstraintsJson *any `json:"nomad_constraints_json,omitempty"`
	NomadKillTimeoutSeconds *any `json:"nomad_kill_timeout_seconds,omitempty"`
	NomadNamespace *any `json:"nomad_namespace,omitempty"`
	NomadRegion *any `json:"nomad_region,omitempty"`
	NomadShutdownDelaySeconds *any `json:"nomad_shutdown_delay_seconds,omitempty"`
	NomadUlimitsJson *any `json:"nomad_ulimits_json,omitempty"`
	NomadUpdateStrategyJson *any `json:"nomad_update_strategy_json,omitempty"`
	PrestartCommand *any `json:"prestart_command,omitempty"`
	PubliclyAccessible *bool `json:"publicly_accessible,omitempty"`
	ReleaseCommand *any `json:"release_command,omitempty"`
	Runtime *string `json:"runtime,omitempty"`
	RuntimeAdapterKind *string `json:"runtime_adapter_kind,omitempty"`
	RuntimeAdapterSettingsJson *any `json:"runtime_adapter_settings_json,omitempty"`
	Schedule *any `json:"schedule,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourcePath *string `json:"source_path,omitempty"`
	StartCommand *any `json:"start_command,omitempty"`
}

// AppServicePatchData is the typed request payload for AppService.PatchTyped.
type AppServicePatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	AutoDeploy *bool `json:"auto_deploy,omitempty"`
	BuildCommand *any `json:"build_command,omitempty"`
	CpuMhz *any `json:"cpu_mhz,omitempty"`
	DeployPaths *[]any `json:"deploy_paths,omitempty"`
	DesiredInstances *int `json:"desired_instances,omitempty"`
	DiskMb *any `json:"disk_mb,omitempty"`
	HealthcheckPath *any `json:"healthcheck_path,omitempty"`
	InternalPort *any `json:"internal_port,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MemoryMaxMb *any `json:"memory_max_mb,omitempty"`
	MemoryMb *any `json:"memory_mb,omitempty"`
	Name *string `json:"name,omitempty"`
	NomadConstraintsJson *any `json:"nomad_constraints_json,omitempty"`
	NomadKillTimeoutSeconds *any `json:"nomad_kill_timeout_seconds,omitempty"`
	NomadNamespace *any `json:"nomad_namespace,omitempty"`
	NomadRegion *any `json:"nomad_region,omitempty"`
	NomadShutdownDelaySeconds *any `json:"nomad_shutdown_delay_seconds,omitempty"`
	NomadUlimitsJson *any `json:"nomad_ulimits_json,omitempty"`
	NomadUpdateStrategyJson *any `json:"nomad_update_strategy_json,omitempty"`
	PrestartCommand *any `json:"prestart_command,omitempty"`
	PubliclyAccessible *bool `json:"publicly_accessible,omitempty"`
	ReleaseCommand *any `json:"release_command,omitempty"`
	Runtime *string `json:"runtime,omitempty"`
	RuntimeAdapterKind *string `json:"runtime_adapter_kind,omitempty"`
	RuntimeAdapterSettingsJson *any `json:"runtime_adapter_settings_json,omitempty"`
	Schedule *any `json:"schedule,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourcePath *string `json:"source_path,omitempty"`
	StartCommand *any `json:"start_command,omitempty"`
}

// AppServiceRemoveMatch is the typed request payload for AppService.RemoveTyped.
type AppServiceRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppServiceBinding is the typed data model for the app_service_binding entity.
type AppServiceBinding struct {
}

// AppServiceBindingLoadMatch is the typed request payload for AppServiceBinding.LoadTyped.
type AppServiceBindingLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppServiceBindingCreateData is the typed request payload for AppServiceBinding.CreateTyped.
type AppServiceBindingCreateData struct {
	AppId string `json:"app_id"`
}

// AppServiceBindingUpdateData is the typed request payload for AppServiceBinding.UpdateTyped.
type AppServiceBindingUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppServiceBindingPatchData is the typed request payload for AppServiceBinding.PatchTyped.
type AppServiceBindingPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppServiceBindingRemoveMatch is the typed request payload for AppServiceBinding.RemoveTyped.
type AppServiceBindingRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppServicePlacement is the typed data model for the app_service_placement entity.
type AppServicePlacement struct {
}

// AppServicePlacementLoadMatch is the typed request payload for AppServicePlacement.LoadTyped.
type AppServicePlacementLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppServicePlacementListMatch is the typed request payload for AppServicePlacement.ListTyped.
type AppServicePlacementListMatch struct {
	AppId string `json:"app_id"`
	Existing *bool `json:"existing,omitempty"`
	Service *string `json:"service,omitempty"`
}

// AppServicePlacementUpdateData is the typed request payload for AppServicePlacement.UpdateTyped.
type AppServicePlacementUpdateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	DeploymentChannel *any `json:"deployment_channel,omitempty"`
	Mode *string `json:"mode,omitempty"`
	ReplicasPerRegion *int `json:"replicas_per_region,omitempty"`
	RolloutStrategy *string `json:"rollout_strategy,omitempty"`
	Targets *[]any `json:"targets,omitempty"`
	ExpectedGeneration *any `json:"expected_generation,omitempty"`
}

// AppStorageResource is the typed data model for the app_storage_resource entity.
type AppStorageResource struct {
}

// AppStorageResourceLoadMatch is the typed request payload for AppStorageResource.LoadTyped.
type AppStorageResourceLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
}

// AppStorageResourceCreateData is the typed request payload for AppStorageResource.CreateTyped.
type AppStorageResourceCreateData struct {
	AppId string `json:"app_id"`
	AccessMode string `json:"access_mode"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	CapacityGb *any `json:"capacity_gb,omitempty"`
	Kind string `json:"kind"`
	LocationId *any `json:"location_id,omitempty"`
	MountPath *any `json:"mount_path,omitempty"`
	Name string `json:"name"`
	Provider string `json:"provider"`
	Region *any `json:"region,omitempty"`
	Slug string `json:"slug"`
	Status string `json:"status"`
}

// AppStorageResourceUpdateData is the typed request payload for AppStorageResource.UpdateTyped.
type AppStorageResourceUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppStorageResourcePatchData is the typed request payload for AppStorageResource.PatchTyped.
type AppStorageResourcePatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppStorageResourceRemoveMatch is the typed request payload for AppStorageResource.RemoveTyped.
type AppStorageResourceRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// Artefact is the typed data model for the artefact entity.
type Artefact struct {
}

// ArtefactLoadMatch is the typed request payload for Artefact.LoadTyped.
type ArtefactLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ArtefactListMatch is the typed request payload for Artefact.ListTyped.
type ArtefactListMatch struct {
	OrganizationId string `json:"organization_id"`
	Author *string `json:"author,omitempty"`
	CreatedByAgent *string `json:"created_by_agent,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Editable *string `json:"editable,omitempty"`
	Harness *string `json:"harness,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Model *string `json:"model,omitempty"`
	Q *string `json:"q,omitempty"`
	Repo *string `json:"repo,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Source *string `json:"source,omitempty"`
}

// ArtefactCreateData is the typed request payload for Artefact.CreateTyped.
type ArtefactCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// ArtefactUpdateData is the typed request payload for Artefact.UpdateTyped.
type ArtefactUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ArtefactPatchData is the typed request payload for Artefact.PatchTyped.
type ArtefactPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Description *any `json:"description,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Title *string `json:"title,omitempty"`
}

// ArtefactRemoveMatch is the typed request payload for Artefact.RemoveTyped.
type ArtefactRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ArtefactCommentThread is the typed data model for the artefact_comment_thread entity.
type ArtefactCommentThread struct {
}

// ArtefactCommentThreadListMatch is the typed request payload for ArtefactCommentThread.ListTyped.
type ArtefactCommentThreadListMatch struct {
	ArtefactId string `json:"artefact_id"`
	OrganizationId string `json:"organization_id"`
}

// ArtefactCommentThreadCreateData is the typed request payload for ArtefactCommentThread.CreateTyped.
type ArtefactCommentThreadCreateData struct {
	ArtefactId string `json:"artefact_id"`
	OrganizationId string `json:"organization_id"`
	Anchor string `json:"anchor"`
	Body string `json:"body"`
	Quote *string `json:"quote,omitempty"`
}

// ArtefactCommentThreadUpdateData is the typed request payload for ArtefactCommentThread.UpdateTyped.
type ArtefactCommentThreadUpdateData struct {
	ArtefactId string `json:"artefact_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Resolved *bool `json:"resolved,omitempty"`
}

// ArtefactRevision is the typed data model for the artefact_revision entity.
type ArtefactRevision struct {
}

// ArtefactRevisionCreateData is the typed request payload for ArtefactRevision.CreateTyped.
type ArtefactRevisionCreateData struct {
	ArtefactId string `json:"artefact_id"`
	OrganizationId string `json:"organization_id"`
	BaseVersion int `json:"base_version"`
	Content string `json:"content"`
}

// ArtefactViewToken is the typed data model for the artefact_view_token entity.
type ArtefactViewToken struct {
}

// ArtefactViewTokenCreateData is the typed request payload for ArtefactViewToken.CreateTyped.
type ArtefactViewTokenCreateData struct {
	ArtefactId string `json:"artefact_id"`
	OrganizationId string `json:"organization_id"`
	File *string `json:"file,omitempty"`
	OrganizationSlug *string `json:"organization_slug,omitempty"`
	Version *int `json:"version,omitempty"`
}

// Artifact is the typed data model for the artifact entity.
type Artifact struct {
}

// ArtifactLoadMatch is the typed request payload for Artifact.LoadTyped.
type ArtifactLoadMatch struct {
	Id string `json:"id"`
}

// ArtifactCreateData is the typed request payload for Artifact.CreateTyped.
type ArtifactCreateData struct {
}

// ArtifactUpdateData is the typed request payload for Artifact.UpdateTyped.
type ArtifactUpdateData struct {
	Id string `json:"id"`
}

// ArtifactPatchData is the typed request payload for Artifact.PatchTyped.
type ArtifactPatchData struct {
	Id string `json:"id"`
}

// ArtifactRemoveMatch is the typed request payload for Artifact.RemoveTyped.
type ArtifactRemoveMatch struct {
	Id string `json:"id"`
}

// ArtifactCacheNamespace is the typed data model for the artifact_cache_namespace entity.
type ArtifactCacheNamespace struct {
}

// ArtifactCacheNamespaceLoadMatch is the typed request payload for ArtifactCacheNamespace.LoadTyped.
type ArtifactCacheNamespaceLoadMatch struct {
	Id string `json:"id"`
}

// ArtifactCacheNamespaceCreateData is the typed request payload for ArtifactCacheNamespace.CreateTyped.
type ArtifactCacheNamespaceCreateData struct {
}

// ArtifactCacheNamespaceUpdateData is the typed request payload for ArtifactCacheNamespace.UpdateTyped.
type ArtifactCacheNamespaceUpdateData struct {
	Id string `json:"id"`
}

// ArtifactCacheNamespacePatchData is the typed request payload for ArtifactCacheNamespace.PatchTyped.
type ArtifactCacheNamespacePatchData struct {
	Id string `json:"id"`
}

// ArtifactCacheNamespaceRemoveMatch is the typed request payload for ArtifactCacheNamespace.RemoveTyped.
type ArtifactCacheNamespaceRemoveMatch struct {
	Id string `json:"id"`
}

// ArtifactImageRepository is the typed data model for the artifact_image_repository entity.
type ArtifactImageRepository struct {
}

// ArtifactImageRepositoryLoadMatch is the typed request payload for ArtifactImageRepository.LoadTyped.
type ArtifactImageRepositoryLoadMatch struct {
	Id string `json:"id"`
}

// ArtifactImageRepositoryCreateData is the typed request payload for ArtifactImageRepository.CreateTyped.
type ArtifactImageRepositoryCreateData struct {
}

// ArtifactImageRepositoryUpdateData is the typed request payload for ArtifactImageRepository.UpdateTyped.
type ArtifactImageRepositoryUpdateData struct {
	Id string `json:"id"`
}

// ArtifactImageRepositoryPatchData is the typed request payload for ArtifactImageRepository.PatchTyped.
type ArtifactImageRepositoryPatchData struct {
	Id string `json:"id"`
}

// ArtifactImageRepositoryRemoveMatch is the typed request payload for ArtifactImageRepository.RemoveTyped.
type ArtifactImageRepositoryRemoveMatch struct {
	Id string `json:"id"`
}

// ArtifactPackageMirror is the typed data model for the artifact_package_mirror entity.
type ArtifactPackageMirror struct {
}

// ArtifactPackageMirrorLoadMatch is the typed request payload for ArtifactPackageMirror.LoadTyped.
type ArtifactPackageMirrorLoadMatch struct {
	Id string `json:"id"`
}

// ArtifactPackageMirrorCreateData is the typed request payload for ArtifactPackageMirror.CreateTyped.
type ArtifactPackageMirrorCreateData struct {
}

// ArtifactPackageMirrorUpdateData is the typed request payload for ArtifactPackageMirror.UpdateTyped.
type ArtifactPackageMirrorUpdateData struct {
	Id string `json:"id"`
}

// ArtifactPackageMirrorPatchData is the typed request payload for ArtifactPackageMirror.PatchTyped.
type ArtifactPackageMirrorPatchData struct {
	Id string `json:"id"`
}

// ArtifactPackageMirrorRemoveMatch is the typed request payload for ArtifactPackageMirror.RemoveTyped.
type ArtifactPackageMirrorRemoveMatch struct {
	Id string `json:"id"`
}

// ArtifactRetentionPolicy is the typed data model for the artifact_retention_policy entity.
type ArtifactRetentionPolicy struct {
}

// ArtifactRetentionPolicyLoadMatch is the typed request payload for ArtifactRetentionPolicy.LoadTyped.
type ArtifactRetentionPolicyLoadMatch struct {
	Id string `json:"id"`
}

// ArtifactRetentionPolicyCreateData is the typed request payload for ArtifactRetentionPolicy.CreateTyped.
type ArtifactRetentionPolicyCreateData struct {
}

// ArtifactRetentionPolicyUpdateData is the typed request payload for ArtifactRetentionPolicy.UpdateTyped.
type ArtifactRetentionPolicyUpdateData struct {
	Id string `json:"id"`
}

// ArtifactRetentionPolicyPatchData is the typed request payload for ArtifactRetentionPolicy.PatchTyped.
type ArtifactRetentionPolicyPatchData struct {
	Id string `json:"id"`
}

// ArtifactRetentionPolicyRemoveMatch is the typed request payload for ArtifactRetentionPolicy.RemoveTyped.
type ArtifactRetentionPolicyRemoveMatch struct {
	Id string `json:"id"`
}

// AttachmentPart is the typed data model for the attachment_part entity.
type AttachmentPart struct {
}

// AttachmentPartUpdateData is the typed request payload for AttachmentPart.UpdateTyped.
type AttachmentPartUpdateData struct {
	AgentId string `json:"agent_id"`
	AttachmentId string `json:"attachment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AuditEvent is the typed data model for the audit_event entity.
type AuditEvent struct {
}

// AuditEventListMatch is the typed request payload for AuditEvent.ListTyped.
type AuditEventListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// Auth is the typed data model for the auth entity.
type Auth struct {
}

// AuthLoadMatch is the typed request payload for Auth.LoadTyped.
type AuthLoadMatch struct {
}

// AuthCreateData is the typed request payload for Auth.CreateTyped.
type AuthCreateData struct {
	CliLoginId *any `json:"cli_login_id,omitempty"`
	Code *any `json:"code,omitempty"`
	Email *any `json:"email,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	LoginId *any `json:"login_id,omitempty"`
	Name *any `json:"name,omitempty"`
	OrganizationInvitationToken *any `json:"organization_invitation_token,omitempty"`
	Password *any `json:"password,omitempty"`
	PollingToken *any `json:"polling_token,omitempty"`
	RedirectUri *any `json:"redirect_uri,omitempty"`
	State *any `json:"state,omitempty"`
	TurnstileToken *any `json:"turnstile_token,omitempty"`
}

// AuthRemoveMatch is the typed request payload for Auth.RemoveTyped.
type AuthRemoveMatch struct {
}

// AuthCli is the typed data model for the auth_cli entity.
type AuthCli struct {
}

// AuthCliCreateData is the typed request payload for AuthCli.CreateTyped.
type AuthCliCreateData struct {
	ClientKind *any `json:"client_kind,omitempty"`
	Intent *any `json:"intent,omitempty"`
	LoginId *any `json:"login_id,omitempty"`
	Name *any `json:"name,omitempty"`
	OrganizationId *any `json:"organization_id,omitempty"`
	OrganizationSlug *any `json:"organization_slug,omitempty"`
}

// AuthGithub is the typed data model for the auth_github entity.
type AuthGithub struct {
}

// AuthGithubLoadMatch is the typed request payload for AuthGithub.LoadTyped.
type AuthGithubLoadMatch struct {
	RedirectUri string `json:"redirect_uri"`
}

// AuthGoogle is the typed data model for the auth_google entity.
type AuthGoogle struct {
}

// AuthGoogleLoadMatch is the typed request payload for AuthGoogle.LoadTyped.
type AuthGoogleLoadMatch struct {
	RedirectUri string `json:"redirect_uri"`
}

// AuthOpenai is the typed data model for the auth_openai entity.
type AuthOpenai struct {
}

// AuthOpenaiLoadMatch is the typed request payload for AuthOpenai.LoadTyped.
type AuthOpenaiLoadMatch struct {
	Code *string `json:"code,omitempty"`
	Error *string `json:"error,omitempty"`
	State string `json:"state"`
}

// AuthPasswordReset is the typed data model for the auth_password_reset entity.
type AuthPasswordReset struct {
}

// AuthPasswordResetCreateData is the typed request payload for AuthPasswordReset.CreateTyped.
type AuthPasswordResetCreateData struct {
	Email string `json:"email"`
}

// AuthPasswordResetUpdateData is the typed request payload for AuthPasswordReset.UpdateTyped.
type AuthPasswordResetUpdateData struct {
	Password *string `json:"password,omitempty"`
	Token *string `json:"token,omitempty"`
}

// AuthRegistrationOption is the typed data model for the auth_registration_option entity.
type AuthRegistrationOption struct {
}

// AuthRegistrationOptionLoadMatch is the typed request payload for AuthRegistrationOption.LoadTyped.
type AuthRegistrationOptionLoadMatch struct {
	EmailPasswordSignupEnabled *bool `json:"email_password_signup_enabled,omitempty"`
	OpenaiSignInEnabled *bool `json:"openai_sign_in_enabled,omitempty"`
	TurnstileSiteKey *any `json:"turnstile_site_key,omitempty"`
	WaitlistEnabled *bool `json:"waitlist_enabled,omitempty"`
}

// AutomationEvent is the typed data model for the automation_event entity.
type AutomationEvent struct {
}

// AutomationEventUpdateData is the typed request payload for AutomationEvent.UpdateTyped.
type AutomationEventUpdateData struct {
	AgentId string `json:"agent_id"`
	AutomationId string `json:"automation_id"`
	OrganizationId string `json:"organization_id"`
	Action *string `json:"action,omitempty"`
	ExpectedRevision *any `json:"expected_revision,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	SubscriptionKey *string `json:"subscription_key,omitempty"`
}

// AutomationRun is the typed data model for the automation_run entity.
type AutomationRun struct {
}

// AutomationRunCreateData is the typed request payload for AutomationRun.CreateTyped.
type AutomationRunCreateData struct {
	AgentId string `json:"agent_id"`
	AutomationId string `json:"automation_id"`
	OrganizationId string `json:"organization_id"`
	Input map[string]any `json:"input"`
	RequestId string `json:"request_id"`
	VersionId string `json:"version_id"`
}

// BackendRunnerPool is the typed data model for the backend_runner_pool entity.
type BackendRunnerPool struct {
}

// BackendRunnerPoolLoadMatch is the typed request payload for BackendRunnerPool.LoadTyped.
type BackendRunnerPoolLoadMatch struct {
	BackendId string `json:"backend_id"`
}

// BackendRunnerPoolCreateData is the typed request payload for BackendRunnerPool.CreateTyped.
type BackendRunnerPoolCreateData struct {
	BackendId string `json:"backend_id"`
}

// BackendRunnerPoolRemoveMatch is the typed request payload for BackendRunnerPool.RemoveTyped.
type BackendRunnerPoolRemoveMatch struct {
	BackendId string `json:"backend_id"`
	Id string `json:"id"`
}

// Bazel is the typed data model for the bazel entity.
type Bazel struct {
}

// BazelCreateData is the typed request payload for Bazel.CreateTyped.
type BazelCreateData struct {
}

// BazelActionResult is the typed data model for the bazel_action_result entity.
type BazelActionResult struct {
}

// BazelActionResultLoadMatch is the typed request payload for BazelActionResult.LoadTyped.
type BazelActionResultLoadMatch struct {
	ActionResultId string `json:"action_result_id"`
	Id string `json:"id"`
}

// BazelActionResultUpdateData is the typed request payload for BazelActionResult.UpdateTyped.
type BazelActionResultUpdateData struct {
	ActionResultId string `json:"action_result_id"`
	Id string `json:"id"`
}

// BazelBackend is the typed data model for the bazel_backend entity.
type BazelBackend struct {
}

// BazelBackendLoadMatch is the typed request payload for BazelBackend.LoadTyped.
type BazelBackendLoadMatch struct {
	Id string `json:"id"`
}

// BazelBackendCreateData is the typed request payload for BazelBackend.CreateTyped.
type BazelBackendCreateData struct {
}

// BazelBackendUpdateData is the typed request payload for BazelBackend.UpdateTyped.
type BazelBackendUpdateData struct {
	Id string `json:"id"`
}

// BazelBackendPatchData is the typed request payload for BazelBackend.PatchTyped.
type BazelBackendPatchData struct {
	Id string `json:"id"`
}

// BazelBackendRemoveMatch is the typed request payload for BazelBackend.RemoveTyped.
type BazelBackendRemoveMatch struct {
	Id string `json:"id"`
}

// BazelBlob is the typed data model for the bazel_blob entity.
type BazelBlob struct {
}

// BazelBlobLoadMatch is the typed request payload for BazelBlob.LoadTyped.
type BazelBlobLoadMatch struct {
	BlobId string `json:"blob_id"`
	Hash string `json:"hash"`
	Id string `json:"id"`
}

// BazelBlobUpdateData is the typed request payload for BazelBlob.UpdateTyped.
type BazelBlobUpdateData struct {
	BlobId string `json:"blob_id"`
	Hash string `json:"hash"`
	Id string `json:"id"`
}

// BazelExecution is the typed data model for the bazel_execution entity.
type BazelExecution struct {
}

// BazelExecutionLoadMatch is the typed request payload for BazelExecution.LoadTyped.
type BazelExecutionLoadMatch struct {
	Id string `json:"id"`
}

// BazelExecutionCreateData is the typed request payload for BazelExecution.CreateTyped.
type BazelExecutionCreateData struct {
}

// BazelFindMissingBlob is the typed data model for the bazel_find_missing_blob entity.
type BazelFindMissingBlob struct {
}

// BazelFindMissingBlobCreateData is the typed request payload for BazelFindMissingBlob.CreateTyped.
type BazelFindMissingBlobCreateData struct {
}

// Billing is the typed data model for the billing entity.
type Billing struct {
}

// BillingLoadMatch is the typed request payload for Billing.LoadTyped.
type BillingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// BillingAddon is the typed data model for the billing_addon entity.
type BillingAddon struct {
}

// BillingAddonUpdateData is the typed request payload for BillingAddon.UpdateTyped.
type BillingAddonUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Quantity *int `json:"quantity,omitempty"`
}

// BillingBudget is the typed data model for the billing_budget entity.
type BillingBudget struct {
}

// BillingBudgetUpdateData is the typed request payload for BillingBudget.UpdateTyped.
type BillingBudgetUpdateData struct {
	OrganizationId string `json:"organization_id"`
	MonthlyCapCents *any `json:"monthly_cap_cents,omitempty"`
}

// BillingBudgetPatchData is the typed request payload for BillingBudget.PatchTyped.
type BillingBudgetPatchData struct {
	OrganizationId string `json:"organization_id"`
}

// BillingCheckoutSession is the typed data model for the billing_checkout_session entity.
type BillingCheckoutSession struct {
}

// BillingCheckoutSessionCreateData is the typed request payload for BillingCheckoutSession.CreateTyped.
type BillingCheckoutSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	CancelUrl *string `json:"cancel_url,omitempty"`
	CouponCode *string `json:"coupon_code,omitempty"`
	EntryPoint *string `json:"entry_point,omitempty"`
	PackageKey *string `json:"package_key,omitempty"`
	PackageRevision *int `json:"package_revision,omitempty"`
	SuccessUrl *string `json:"success_url,omitempty"`
}

// BillingContact is the typed data model for the billing_contact entity.
type BillingContact struct {
}

// BillingContactUpdateData is the typed request payload for BillingContact.UpdateTyped.
type BillingContactUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// BillingContactPatchData is the typed request payload for BillingContact.PatchTyped.
type BillingContactPatchData struct {
	OrganizationId string `json:"organization_id"`
	BillingEmail *string `json:"billing_email,omitempty"`
}

// BillingExtraSpend is the typed data model for the billing_extra_spend entity.
type BillingExtraSpend struct {
}

// BillingExtraSpendUpdateData is the typed request payload for BillingExtraSpend.UpdateTyped.
type BillingExtraSpendUpdateData struct {
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
	MonthlyCapCents *any `json:"monthly_cap_cents,omitempty"`
}

// BillingExtraSpendPatchData is the typed request payload for BillingExtraSpend.PatchTyped.
type BillingExtraSpendPatchData struct {
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
	MonthlyCapCents *any `json:"monthly_cap_cents,omitempty"`
}

// BillingInvoice is the typed data model for the billing_invoice entity.
type BillingInvoice struct {
}

// BillingInvoiceListMatch is the typed request payload for BillingInvoice.ListTyped.
type BillingInvoiceListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// BillingPackage is the typed data model for the billing_package entity.
type BillingPackage struct {
}

// BillingPackageListMatch is the typed request payload for BillingPackage.ListTyped.
type BillingPackageListMatch struct {
	Addons *[]any `json:"addons,omitempty"`
	BasePriceCents *int `json:"base_price_cents,omitempty"`
	BillingInterval *string `json:"billing_interval,omitempty"`
	BillingPolicy *string `json:"billing_policy,omitempty"`
	CiIncludedSpendCents *int `json:"ci_included_spend_cents,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Key *string `json:"key,omitempty"`
	MaxSeats *any `json:"max_seats,omitempty"`
	Name *string `json:"name,omitempty"`
	PayAsYouGoEnabled *bool `json:"pay_as_you_go_enabled,omitempty"`
	Rates *[]any `json:"rates,omitempty"`
	Revision *int `json:"revision,omitempty"`
	RoderDailyRunLimit *int `json:"roder_daily_run_limit,omitempty"`
	RoderRunConcurrencyLimit *int `json:"roder_run_concurrency_limit,omitempty"`
	SeatPriceCents *int `json:"seat_price_cents,omitempty"`
	TrialDays *int `json:"trial_days,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// BillingPortalSession is the typed data model for the billing_portal_session entity.
type BillingPortalSession struct {
}

// BillingPortalSessionCreateData is the typed request payload for BillingPortalSession.CreateTyped.
type BillingPortalSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	ReturnUrl *string `json:"return_url,omitempty"`
}

// BillingPrepaidPeriod is the typed data model for the billing_prepaid_period entity.
type BillingPrepaidPeriod struct {
}

// BillingPrepaidPeriodLoadMatch is the typed request payload for BillingPrepaidPeriod.LoadTyped.
type BillingPrepaidPeriodLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BillingPrepaidPurchase is the typed data model for the billing_prepaid_purchase entity.
type BillingPrepaidPurchase struct {
}

// BillingPrepaidPurchaseLoadMatch is the typed request payload for BillingPrepaidPurchase.LoadTyped.
type BillingPrepaidPurchaseLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BillingPrepaidPurchaseListMatch is the typed request payload for BillingPrepaidPurchase.ListTyped.
type BillingPrepaidPurchaseListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// BillingPrepaidPurchaseCreateData is the typed request payload for BillingPrepaidPurchase.CreateTyped.
type BillingPrepaidPurchaseCreateData struct {
	OrganizationId string `json:"organization_id"`
	Minutes int `json:"minutes"`
	RequestKey string `json:"request_key"`
}

// BillingSubscription is the typed data model for the billing_subscription entity.
type BillingSubscription struct {
}

// BillingSubscriptionUpdateData is the typed request payload for BillingSubscription.UpdateTyped.
type BillingSubscriptionUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// BillingSubscriptionPatchData is the typed request payload for BillingSubscription.PatchTyped.
type BillingSubscriptionPatchData struct {
	OrganizationId string `json:"organization_id"`
	CancelAtPeriodEnd *bool `json:"cancel_at_period_end,omitempty"`
}

// BillingTokenTopUp is the typed data model for the billing_token_top_up entity.
type BillingTokenTopUp struct {
}

// BillingTokenTopUpCreateData is the typed request payload for BillingTokenTopUp.CreateTyped.
type BillingTokenTopUpCreateData struct {
	OrganizationId string `json:"organization_id"`
	AmountCents int `json:"amount_cents"`
	RequestKey string `json:"request_key"`
}

// BillingUsage is the typed data model for the billing_usage entity.
type BillingUsage struct {
}

// BillingUsageLoadMatch is the typed request payload for BillingUsage.LoadTyped.
type BillingUsageLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Meter *string `json:"meter,omitempty"`
	Window *string `json:"window,omitempty"`
}

// Binary is the typed data model for the binary entity.
type Binary struct {
}

// BinaryLoadMatch is the typed request payload for Binary.LoadTyped.
type BinaryLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId string `json:"project_id"`
}

// BinaryListMatch is the typed request payload for Binary.ListTyped.
type BinaryListMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId string `json:"project_id"`
}

// BinaryCreateData is the typed request payload for Binary.CreateTyped.
type BinaryCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Arch *any `json:"arch,omitempty"`
	DownloadSecret *string `json:"download_secret,omitempty"`
	DownloadUrl string `json:"download_url"`
	Executable string `json:"executable"`
	Format any `json:"format"`
	IdempotencyKey string `json:"idempotency_key"`
	LaunchArgs *[]any `json:"launch_args,omitempty"`
	Name string `json:"name"`
	Platform *any `json:"platform,omitempty"`
	Sha256 *string `json:"sha256,omitempty"`
	Slug string `json:"slug"`
	WindowTitle string `json:"window_title"`
}

// BinaryVersion is the typed data model for the binary_version entity.
type BinaryVersion struct {
}

// BinaryVersionLoadMatch is the typed request payload for BinaryVersion.LoadTyped.
type BinaryVersionLoadMatch struct {
	BinaryId string `json:"binary_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// BinaryVersionListMatch is the typed request payload for BinaryVersion.ListTyped.
type BinaryVersionListMatch struct {
	BinaryId string `json:"binary_id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId string `json:"project_id"`
}

// BinaryVersionCreateData is the typed request payload for BinaryVersion.CreateTyped.
type BinaryVersionCreateData struct {
	BinaryId string `json:"binary_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Arch *any `json:"arch,omitempty"`
	DownloadSecret *string `json:"download_secret,omitempty"`
	DownloadUrl string `json:"download_url"`
	Executable *string `json:"executable,omitempty"`
	Format *any `json:"format,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	LaunchArgs *[]any `json:"launch_args,omitempty"`
	Platform *any `json:"platform,omitempty"`
	Sha256 *string `json:"sha256,omitempty"`
	WindowTitle *string `json:"window_title,omitempty"`
}

// BinaryVersionRemoveMatch is the typed request payload for BinaryVersion.RemoveTyped.
type BinaryVersionRemoveMatch struct {
	BinaryId string `json:"binary_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// BookmarkProtectionRefreshGithubRequiredCheck is the typed data model for the bookmark_protection_refresh_github_required_check entity.
type BookmarkProtectionRefreshGithubRequiredCheck struct {
}

// BookmarkProtectionRefreshGithubRequiredCheckCreateData is the typed request payload for BookmarkProtectionRefreshGithubRequiredCheck.CreateTyped.
type BookmarkProtectionRefreshGithubRequiredCheckCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	GithubBranch *string `json:"github_branch,omitempty"`
}

// BrowserEgressCandidate is the typed data model for the browser_egress_candidate entity.
type BrowserEgressCandidate struct {
}

// BrowserEgressCandidateListMatch is the typed request payload for BrowserEgressCandidate.ListTyped.
type BrowserEgressCandidateListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// BrowserSession is the typed data model for the browser_session entity.
type BrowserSession struct {
}

// BrowserSessionLoadMatch is the typed request payload for BrowserSession.LoadTyped.
type BrowserSessionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BrowserSessionCreateData is the typed request payload for BrowserSession.CreateTyped.
type BrowserSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	Controller *string `json:"controller,omitempty"`
	CredentialId *any `json:"credential_id,omitempty"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	ProjectId *any `json:"project_id,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BrowserSessionRemoveMatch is the typed request payload for BrowserSession.RemoveTyped.
type BrowserSessionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BrowserSessionConnection is the typed data model for the browser_session_connection entity.
type BrowserSessionConnection struct {
}

// BrowserSessionConnectionCreateData is the typed request payload for BrowserSessionConnection.CreateTyped.
type BrowserSessionConnectionCreateData struct {
	BrowserSessionId string `json:"browser_session_id"`
	OrganizationId string `json:"organization_id"`
	Generation int `json:"generation"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
}

// BrowserSessionControl is the typed data model for the browser_session_control entity.
type BrowserSessionControl struct {
}

// BrowserSessionControlLoadMatch is the typed request payload for BrowserSessionControl.LoadTyped.
type BrowserSessionControlLoadMatch struct {
	BrowserSessionId string `json:"browser_session_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BrowserSessionEvent is the typed data model for the browser_session_event entity.
type BrowserSessionEvent struct {
}

// BrowserSessionEventListMatch is the typed request payload for BrowserSessionEvent.ListTyped.
type BrowserSessionEventListMatch struct {
	BrowserSessionId string `json:"browser_session_id"`
	OrganizationId string `json:"organization_id"`
	After *string `json:"after,omitempty"`
}

// BrowserSessionMedia is the typed data model for the browser_session_media entity.
type BrowserSessionMedia struct {
}

// BrowserSessionMediaLoadMatch is the typed request payload for BrowserSessionMedia.LoadTyped.
type BrowserSessionMediaLoadMatch struct {
	BrowserSessionId string `json:"browser_session_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BrowserSessionRecording is the typed data model for the browser_session_recording entity.
type BrowserSessionRecording struct {
}

// BrowserSessionRecordingCreateData is the typed request payload for BrowserSessionRecording.CreateTyped.
type BrowserSessionRecordingCreateData struct {
	BrowserSessionId string `json:"browser_session_id"`
	OrganizationId string `json:"organization_id"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Wait *bool `json:"wait,omitempty"`
}

// BrowserSessionScreenshot is the typed data model for the browser_session_screenshot entity.
type BrowserSessionScreenshot struct {
}

// BrowserSessionScreenshotCreateData is the typed request payload for BrowserSessionScreenshot.CreateTyped.
type BrowserSessionScreenshotCreateData struct {
	BrowserSessionId string `json:"browser_session_id"`
	OrganizationId string `json:"organization_id"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Wait *bool `json:"wait,omitempty"`
}

// BrowserSessionTask is the typed data model for the browser_session_task entity.
type BrowserSessionTask struct {
}

// BrowserSessionTaskLoadMatch is the typed request payload for BrowserSessionTask.LoadTyped.
type BrowserSessionTaskLoadMatch struct {
	BrowserSessionId string `json:"browser_session_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// BrowserSessionTaskCreateData is the typed request payload for BrowserSessionTask.CreateTyped.
type BrowserSessionTaskCreateData struct {
	BrowserSessionId string `json:"browser_session_id"`
	OrganizationId string `json:"organization_id"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Instruction string `json:"instruction"`
	MaxRounds *int `json:"max_rounds,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	Outcome *any `json:"outcome,omitempty"`
}

// CacheNamespaceEntry is the typed data model for the cache_namespace_entry entity.
type CacheNamespaceEntry struct {
}

// CacheNamespaceEntryLoadMatch is the typed request payload for CacheNamespaceEntry.LoadTyped.
type CacheNamespaceEntryLoadMatch struct {
	CacheNamespaceId string `json:"cache_namespace_id"`
	Id *string `json:"id,omitempty"`
}

// CacheNamespaceEntryCreateData is the typed request payload for CacheNamespaceEntry.CreateTyped.
type CacheNamespaceEntryCreateData struct {
	CacheNamespaceId string `json:"cache_namespace_id"`
}

// CacheNamespaceEntryUpdateData is the typed request payload for CacheNamespaceEntry.UpdateTyped.
type CacheNamespaceEntryUpdateData struct {
	CacheNamespaceId string `json:"cache_namespace_id"`
	Id string `json:"id"`
}

// CacheNamespaceEntryPatchData is the typed request payload for CacheNamespaceEntry.PatchTyped.
type CacheNamespaceEntryPatchData struct {
	CacheNamespaceId string `json:"cache_namespace_id"`
	Id string `json:"id"`
}

// CacheNamespaceEntryRemoveMatch is the typed request payload for CacheNamespaceEntry.RemoveTyped.
type CacheNamespaceEntryRemoveMatch struct {
	CacheNamespaceId string `json:"cache_namespace_id"`
	Id string `json:"id"`
}

// CatalogSelector is the typed data model for the catalog_selector entity.
type CatalogSelector struct {
}

// CatalogSelectorLoadMatch is the typed request payload for CatalogSelector.LoadTyped.
type CatalogSelectorLoadMatch struct {
	AppId string `json:"app_id"`
}

// CdnDeployment is the typed data model for the cdn_deployment entity.
type CdnDeployment struct {
}

// CdnDeploymentLoadMatch is the typed request payload for CdnDeployment.LoadTyped.
type CdnDeploymentLoadMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id *string `json:"id,omitempty"`
}

// CdnDeploymentCreateData is the typed request payload for CdnDeployment.CreateTyped.
type CdnDeploymentCreateData struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
}

// CdnHostname is the typed data model for the cdn_hostname entity.
type CdnHostname struct {
}

// CdnHostnameLoadMatch is the typed request payload for CdnHostname.LoadTyped.
type CdnHostnameLoadMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id *string `json:"id,omitempty"`
}

// CdnHostnameCreateData is the typed request payload for CdnHostname.CreateTyped.
type CdnHostnameCreateData struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	DnsStatus *string `json:"dns_status,omitempty"`
	ForceSsl *bool `json:"force_ssl,omitempty"`
	Hostname string `json:"hostname"`
	TlsStatus *string `json:"tls_status,omitempty"`
}

// CdnHostnameUpdateData is the typed request payload for CdnHostname.UpdateTyped.
type CdnHostnameUpdateData struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id string `json:"id"`
}

// CdnHostnamePatchData is the typed request payload for CdnHostname.PatchTyped.
type CdnHostnamePatchData struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id string `json:"id"`
}

// CdnHostnameRemoveMatch is the typed request payload for CdnHostname.RemoveTyped.
type CdnHostnameRemoveMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id string `json:"id"`
}

// CdnSpace is the typed data model for the cdn_space entity.
type CdnSpace struct {
}

// CdnSpaceLoadMatch is the typed request payload for CdnSpace.LoadTyped.
type CdnSpaceLoadMatch struct {
	Id string `json:"id"`
}

// CdnSpaceCreateData is the typed request payload for CdnSpace.CreateTyped.
type CdnSpaceCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// CdnSpaceUpdateData is the typed request payload for CdnSpace.UpdateTyped.
type CdnSpaceUpdateData struct {
	Id string `json:"id"`
}

// CdnSpacePatchData is the typed request payload for CdnSpace.PatchTyped.
type CdnSpacePatchData struct {
	Id string `json:"id"`
}

// CdnSpaceRemoveMatch is the typed request payload for CdnSpace.RemoveTyped.
type CdnSpaceRemoveMatch struct {
	Id string `json:"id"`
}

// CdnSpaceObject is the typed data model for the cdn_space_object entity.
type CdnSpaceObject struct {
}

// CdnSpaceObjectLoadMatch is the typed request payload for CdnSpaceObject.LoadTyped.
type CdnSpaceObjectLoadMatch struct {
	CdnSpaceId string `json:"cdn_space_id"`
	Id *string `json:"id,omitempty"`
}

// CdnSpaceObjectUpdateData is the typed request payload for CdnSpaceObject.UpdateTyped.
type CdnSpaceObjectUpdateData struct {
	CdnSpaceId string `json:"cdn_space_id"`
}

// CdnSpaceObjectRemoveMatch is the typed request payload for CdnSpaceObject.RemoveTyped.
type CdnSpaceObjectRemoveMatch struct {
	CdnSpaceId string `json:"cdn_space_id"`
	Id string `json:"id"`
}

// Change is the typed data model for the change entity.
type Change struct {
}

// ChangeLoadMatch is the typed request payload for Change.LoadTyped.
type ChangeLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Author *string `json:"author,omitempty"`
	AwaitingReview *bool `json:"awaiting_review,omitempty"`
	Direction *string `json:"direction,omitempty"`
	GroupPage *string `json:"group_page,omitempty"`
	Label *string `json:"label,omitempty"`
	Mine *bool `json:"mine,omitempty"`
	Number *int `json:"number,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Repo *string `json:"repo,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Source *string `json:"source,omitempty"`
	Stack *string `json:"stack,omitempty"`
	State *string `json:"state,omitempty"`
	Target *string `json:"target,omitempty"`
	TipsOnly *bool `json:"tips_only,omitempty"`
	View *string `json:"view,omitempty"`
}

// ChangeAsset is the typed data model for the change_asset entity.
type ChangeAsset struct {
}

// ChangeAssetCreateData is the typed request payload for ChangeAsset.CreateTyped.
type ChangeAssetCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Alias string `json:"alias"`
	ByteSize int `json:"byte_size"`
	ChecksumMd5 string `json:"checksum_md5"`
	ChecksumSha256 string `json:"checksum_sha256"`
	ContentType string `json:"content_type"`
	Filename string `json:"filename"`
}

// ChangeComment is the typed data model for the change_comment entity.
type ChangeComment struct {
}

// ChangeCommentLoadMatch is the typed request payload for ChangeComment.LoadTyped.
type ChangeCommentLoadMatch struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Path *string `json:"path,omitempty"`
	Resolved *bool `json:"resolved,omitempty"`
}

// ChangeCommentCreateData is the typed request payload for ChangeComment.CreateTyped.
type ChangeCommentCreateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Body string `json:"body"`
	Kind *any `json:"kind,omitempty"`
	Line *any `json:"line,omitempty"`
	ParentCommentId *any `json:"parent_comment_id,omitempty"`
	PatchsetId *any `json:"patchset_id,omitempty"`
	Path *any `json:"path,omitempty"`
	Side *any `json:"side,omitempty"`
}

// ChangeFileReviewCheckpoint is the typed data model for the change_file_review_checkpoint entity.
type ChangeFileReviewCheckpoint struct {
}

// ChangeFileReviewCheckpointCreateData is the typed request payload for ChangeFileReviewCheckpoint.CreateTyped.
type ChangeFileReviewCheckpointCreateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	PatchsetId string `json:"patchset_id"`
	Path string `json:"path"`
	RequestId string `json:"request_id"`
	ReviewAction string `json:"review_action"`
}

// ChangeGitBranchSubmission is the typed data model for the change_git_branch_submission entity.
type ChangeGitBranchSubmission struct {
}

// ChangeGitBranchSubmissionCreateData is the typed request payload for ChangeGitBranchSubmission.CreateTyped.
type ChangeGitBranchSubmissionCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeGitCommitIdentity is the typed data model for the change_git_commit_identity entity.
type ChangeGitCommitIdentity struct {
}

// ChangeGitCommitIdentityLoadMatch is the typed request payload for ChangeGitCommitIdentity.LoadTyped.
type ChangeGitCommitIdentityLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeGitCommitIdentityCreateData is the typed request payload for ChangeGitCommitIdentity.CreateTyped.
type ChangeGitCommitIdentityCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	GitCommitIds []any `json:"git_commit_ids"`
}

// ChangeGitPublication is the typed data model for the change_git_publication entity.
type ChangeGitPublication struct {
}

// ChangeGitPublicationLoadMatch is the typed request payload for ChangeGitPublication.LoadTyped.
type ChangeGitPublicationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeGitPublicationCreateData is the typed request payload for ChangeGitPublication.CreateTyped.
type ChangeGitPublicationCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	OperationKey string `json:"operation_key"`
	Request map[string]any `json:"request"`
}

// ChangeGroupMember is the typed data model for the change_group_member entity.
type ChangeGroupMember struct {
}

// ChangeGroupMemberCreateData is the typed request payload for ChangeGroupMember.CreateTyped.
type ChangeGroupMemberCreateData struct {
	ChangeGroupId string `json:"change_group_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ChangeId string `json:"change_id"`
}

// ChangeGroupMemberRemoveMatch is the typed request payload for ChangeGroupMember.RemoveTyped.
type ChangeGroupMemberRemoveMatch struct {
	ChangeGroupId string `json:"change_group_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeLabel is the typed data model for the change_label entity.
type ChangeLabel struct {
}

// ChangeLabelUpdateData is the typed request payload for ChangeLabel.UpdateTyped.
type ChangeLabelUpdateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Add *[]any `json:"add,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Remove *[]any `json:"remove,omitempty"`
}

// ChangeLandingHold is the typed data model for the change_landing_hold entity.
type ChangeLandingHold struct {
}

// ChangeLandingHoldCreateData is the typed request payload for ChangeLandingHold.CreateTyped.
type ChangeLandingHoldCreateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeLandingRequest is the typed data model for the change_landing_request entity.
type ChangeLandingRequest struct {
}

// ChangeLandingRequestCreateData is the typed request payload for ChangeLandingRequest.CreateTyped.
type ChangeLandingRequestCreateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	DeferUntilReady *bool `json:"defer_until_ready,omitempty"`
	ExpectedRequirementVersion *string `json:"expected_requirement_version,omitempty"`
	ExpectedScopeVersion *string `json:"expected_scope_version,omitempty"`
	OverrideAcknowledged *bool `json:"override_acknowledged,omitempty"`
	OverrideCodes *[]any `json:"override_codes,omitempty"`
	Priority *string `json:"priority,omitempty"`
}

// ChangeLandingRequestRemoveMatch is the typed request payload for ChangeLandingRequest.RemoveTyped.
type ChangeLandingRequestRemoveMatch struct {
	ChangeId string `json:"change_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeRequestChange is the typed data model for the change_request_change entity.
type ChangeRequestChange struct {
}

// ChangeRequestChangeCreateData is the typed request payload for ChangeRequestChange.CreateTyped.
type ChangeRequestChangeCreateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Message *any `json:"message,omitempty"`
}

// ChangeReviewer is the typed data model for the change_reviewer entity.
type ChangeReviewer struct {
}

// ChangeReviewerListMatch is the typed request payload for ChangeReviewer.ListTyped.
type ChangeReviewerListMatch struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeReviewerUpdateData is the typed request payload for ChangeReviewer.UpdateTyped.
type ChangeReviewerUpdateData struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Add *[]any `json:"add,omitempty"`
	Remove *[]any `json:"remove,omitempty"`
}

// ChangeTranscript is the typed data model for the change_transcript entity.
type ChangeTranscript struct {
}

// ChangeTranscriptListMatch is the typed request payload for ChangeTranscript.ListTyped.
type ChangeTranscriptListMatch struct {
	ChangeId string `json:"change_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// ChangeTranscriptSummary is the typed data model for the change_transcript_summary entity.
type ChangeTranscriptSummary struct {
}

// ChangeTranscriptSummaryLoadMatch is the typed request payload for ChangeTranscriptSummary.LoadTyped.
type ChangeTranscriptSummaryLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Ids string `json:"ids"`
}

// CheckpointPrepareChunk is the typed data model for the checkpoint_prepare_chunk entity.
type CheckpointPrepareChunk struct {
}

// CheckpointPrepareChunkCreateData is the typed request payload for CheckpointPrepareChunk.CreateTyped.
type CheckpointPrepareChunkCreateData struct {
	AgentSessionId string `json:"agent_session_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// CiNode is the typed data model for the ci_node entity.
type CiNode struct {
}

// CiNodeLoadMatch is the typed request payload for CiNode.LoadTyped.
type CiNodeLoadMatch struct {
	Id string `json:"id"`
}

// CiNodeCreateData is the typed request payload for CiNode.CreateTyped.
type CiNodeCreateData struct {
}

// CiPipeline is the typed data model for the ci_pipeline entity.
type CiPipeline struct {
}

// CiPipelineLoadMatch is the typed request payload for CiPipeline.LoadTyped.
type CiPipelineLoadMatch struct {
	Id string `json:"id"`
}

// CiPipelineListMatch is the typed request payload for CiPipeline.ListTyped.
type CiPipelineListMatch struct {
	CiRunnerPoolId *any `json:"ci_runner_pool_id,omitempty"`
	ConcurrencyKey *any `json:"concurrency_key,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DefaultBranch *any `json:"default_branch,omitempty"`
	Description *any `json:"description,omitempty"`
	HostedAppId *any `json:"hosted_app_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	RepositoryId *any `json:"repository_id,omitempty"`
	RequiredCapabilitiesCsv *any `json:"required_capabilities_csv,omitempty"`
	RunnerPool *any `json:"runner_pool,omitempty"`
	Runs *[]any `json:"runs,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourceKind *string `json:"source_kind,omitempty"`
	Status *string `json:"status,omitempty"`
	StatusLabel *string `json:"status_label,omitempty"`
	StatusState *string `json:"status_state,omitempty"`
	StatusTone *string `json:"status_tone,omitempty"`
	TriggerOnPullRequest *bool `json:"trigger_on_pull_request,omitempty"`
	TriggerOnPush *bool `json:"trigger_on_push,omitempty"`
	TriggerOnSchedule *bool `json:"trigger_on_schedule,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	WorkflowPath *any `json:"workflow_path,omitempty"`
}

// CiPipelineCreateData is the typed request payload for CiPipeline.CreateTyped.
type CiPipelineCreateData struct {
}

// CiPipelineRun is the typed data model for the ci_pipeline_run entity.
type CiPipelineRun struct {
}

// CiPipelineRunLoadMatch is the typed request payload for CiPipelineRun.LoadTyped.
type CiPipelineRunLoadMatch struct {
	Id *string `json:"id,omitempty"`
	PipelineId string `json:"pipeline_id"`
}

// CiPipelineRunCreateData is the typed request payload for CiPipelineRun.CreateTyped.
type CiPipelineRunCreateData struct {
	PipelineId string `json:"pipeline_id"`
}

// CiRunnerPool is the typed data model for the ci_runner_pool entity.
type CiRunnerPool struct {
}

// CiRunnerPoolLoadMatch is the typed request payload for CiRunnerPool.LoadTyped.
type CiRunnerPoolLoadMatch struct {
	Id string `json:"id"`
}

// CiRunnerPoolListMatch is the typed request payload for CiRunnerPool.ListTyped.
type CiRunnerPoolListMatch struct {
	OrganizationId *string `json:"organization_id,omitempty"`
}

// CiRunnerPoolCreateData is the typed request payload for CiRunnerPool.CreateTyped.
type CiRunnerPoolCreateData struct {
}

// CiRunnerPoolUpdateData is the typed request payload for CiRunnerPool.UpdateTyped.
type CiRunnerPoolUpdateData struct {
	Id string `json:"id"`
}

// CiRunnerPoolPatchData is the typed request payload for CiRunnerPool.PatchTyped.
type CiRunnerPoolPatchData struct {
	Id string `json:"id"`
	Description *any `json:"description,omitempty"`
	ElasticConfigJson *any `json:"elastic_config_json,omitempty"`
	ElasticProviderKind *any `json:"elastic_provider_kind,omitempty"`
	IsolationMode *string `json:"isolation_mode,omitempty"`
	LabelsCsv *any `json:"labels_csv,omitempty"`
	MaxConcurrency *int `json:"max_concurrency,omitempty"`
	NodeCapabilitiesCsv *any `json:"node_capabilities_csv,omitempty"`
	RunnerKind *string `json:"runner_kind,omitempty"`
	Status *string `json:"status,omitempty"`
}

// CiStatus is the typed data model for the ci_status entity.
type CiStatus struct {
}

// CiStatusLoadMatch is the typed request payload for CiStatus.LoadTyped.
type CiStatusLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Ref *string `json:"ref,omitempty"`
}

// CliEvent is the typed data model for the cli_event entity.
type CliEvent struct {
}

// CliEventCreateData is the typed request payload for CliEvent.CreateTyped.
type CliEventCreateData struct {
	Event string `json:"event"`
	Properties map[string]any `json:"properties"`
}

// CliRelease is the typed data model for the cli_release entity.
type CliRelease struct {
}

// CliReleaseLoadMatch is the typed request payload for CliRelease.LoadTyped.
type CliReleaseLoadMatch struct {
}

// CliReleaseCreateData is the typed request payload for CliRelease.CreateTyped.
type CliReleaseCreateData struct {
}

// CloudWorkspaceBackupObject is the typed data model for the cloud_workspace_backup_object entity.
type CloudWorkspaceBackupObject struct {
}

// CloudWorkspaceBackupObjectLoadMatch is the typed request payload for CloudWorkspaceBackupObject.LoadTyped.
type CloudWorkspaceBackupObjectLoadMatch struct {
	CloudWorkspaceBackupId string `json:"cloud_workspace_backup_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// CodeRuleEvaluation is the typed data model for the code_rule_evaluation entity.
type CodeRuleEvaluation struct {
}

// CodeRuleEvaluationCreateData is the typed request payload for CodeRuleEvaluation.CreateTyped.
type CodeRuleEvaluationCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Diff string `json:"diff"`
}

// ComSiteAccess is the typed data model for the com_site_access entity.
type ComSiteAccess struct {
}

// ComSiteAccessLoadMatch is the typed request payload for ComSiteAccess.LoadTyped.
type ComSiteAccessLoadMatch struct {
	Host string `json:"host"`
	ReturnTo *string `json:"return_to,omitempty"`
}

// ComSiteAccessCreateData is the typed request payload for ComSiteAccess.CreateTyped.
type ComSiteAccessCreateData struct {
	Host *any `json:"host,omitempty"`
	Token *any `json:"token,omitempty"`
}

// ComSiteAccessSession is the typed data model for the com_site_access_session entity.
type ComSiteAccessSession struct {
}

// ComSiteAccessSessionCreateData is the typed request payload for ComSiteAccessSession.CreateTyped.
type ComSiteAccessSessionCreateData struct {
	Host string `json:"host"`
}

// CommentThreadComment is the typed data model for the comment_thread_comment entity.
type CommentThreadComment struct {
}

// CommentThreadCommentCreateData is the typed request payload for CommentThreadComment.CreateTyped.
type CommentThreadCommentCreateData struct {
	ArtefactId string `json:"artefact_id"`
	CommentThreadId string `json:"comment_thread_id"`
	OrganizationId string `json:"organization_id"`
	Body string `json:"body"`
}

// CommitDiff is the typed data model for the commit_diff entity.
type CommitDiff struct {
}

// CommitDiffLoadMatch is the typed request payload for CommitDiff.LoadTyped.
type CommitDiffLoadMatch struct {
	CommitId string `json:"commit_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Parent *string `json:"parent,omitempty"`
}

// ConnectionRequest is the typed data model for the connection_request entity.
type ConnectionRequest struct {
}

// ConnectionRequestLoadMatch is the typed request payload for ConnectionRequest.LoadTyped.
type ConnectionRequestLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ConnectionSource is the typed data model for the connection_source entity.
type ConnectionSource struct {
}

// ConnectionSourceListMatch is the typed request payload for ConnectionSource.ListTyped.
type ConnectionSourceListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// ContactSubmission is the typed data model for the contact_submission entity.
type ContactSubmission struct {
}

// ContactSubmissionCreateData is the typed request payload for ContactSubmission.CreateTyped.
type ContactSubmissionCreateData struct {
	Company *any `json:"company,omitempty"`
	Email string `json:"email"`
	Message string `json:"message"`
	Name string `json:"name"`
	Website *any `json:"website,omitempty"`
}

// ControlComputer is the typed data model for the control_computer entity.
type ControlComputer struct {
}

// ControlComputerListMatch is the typed request payload for ControlComputer.ListTyped.
type ControlComputerListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	ObserveConnection *bool `json:"observe_connection,omitempty"`
	PersistentAgentId string `json:"persistent_agent_id"`
}

// ControlComputerUpdateData is the typed request payload for ControlComputer.UpdateTyped.
type ControlComputerUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Enabled *any `json:"enabled,omitempty"`
	ExpectedRevision *any `json:"expected_revision,omitempty"`
	PersistentAgentId *any `json:"persistent_agent_id,omitempty"`
	Providers *any `json:"providers,omitempty"`
}

// ControlComputerControlOperation is the typed data model for the control_computer_control_operation entity.
type ControlComputerControlOperation struct {
}

// ControlComputerControlOperationLoadMatch is the typed request payload for ControlComputerControlOperation.LoadTyped.
type ControlComputerControlOperationLoadMatch struct {
	ControlComputerId string `json:"control_computer_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ControlComputerControlOperationCreateData is the typed request payload for ControlComputerControlOperation.CreateTyped.
type ControlComputerControlOperationCreateData struct {
	ControlComputerId string `json:"control_computer_id"`
	OrganizationId string `json:"organization_id"`
	Action string `json:"action"`
	Arguments map[string]any `json:"arguments"`
	Key string `json:"key"`
}

// CoordinationWait is the typed data model for the coordination_wait entity.
type CoordinationWait struct {
}

// CoordinationWaitListMatch is the typed request payload for CoordinationWait.ListTyped.
type CoordinationWaitListMatch struct {
	AgentId string `json:"agent_id"`
	CoordinationId string `json:"coordination_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// CredentialSignInCheck is the typed data model for the credential_sign_in_check entity.
type CredentialSignInCheck struct {
}

// CredentialSignInCheckCreateData is the typed request payload for CredentialSignInCheck.CreateTyped.
type CredentialSignInCheckCreateData struct {
	CredentialId string `json:"credential_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	EnvironmentId string `json:"environment_id"`
}

// DataResourceRotateCredential is the typed data model for the data_resource_rotate_credential entity.
type DataResourceRotateCredential struct {
}

// DataResourceRotateCredentialCreateData is the typed request payload for DataResourceRotateCredential.CreateTyped.
type DataResourceRotateCredentialCreateData struct {
	AppId string `json:"app_id"`
	DataResourceId string `json:"data_resource_id"`
}

// DeepScan is the typed data model for the deep_scan entity.
type DeepScan struct {
}

// DeepScanLoadMatch is the typed request payload for DeepScan.LoadTyped.
type DeepScanLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AgentId *string `json:"agent_id,omitempty"`
	Evidence *string `json:"evidence,omitempty"`
	FindingId *string `json:"finding_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// DeepScanListMatch is the typed request payload for DeepScan.ListTyped.
type DeepScanListMatch struct {
	OrganizationId string `json:"organization_id"`
	Finding *string `json:"finding,omitempty"`
	Page *int `json:"page,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Query *string `json:"query,omitempty"`
	Status *string `json:"status,omitempty"`
}

// DeepScanCreateData is the typed request payload for DeepScan.CreateTyped.
type DeepScanCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	AccountId *any `json:"account_id,omitempty"`
	Concurrency *int `json:"concurrency,omitempty"`
	EnvironmentId string `json:"environment_id"`
	Goal string `json:"goal"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	MaxTesters *int `json:"max_testers,omitempty"`
}

// DeepScanFinding is the typed data model for the deep_scan_finding entity.
type DeepScanFinding struct {
}

// DeepScanFindingListMatch is the typed request payload for DeepScanFinding.ListTyped.
type DeepScanFindingListMatch struct {
	DeepScanId string `json:"deep_scan_id"`
	OrganizationId string `json:"organization_id"`
	Priority *string `json:"priority,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// DeepScanFlow is the typed data model for the deep_scan_flow entity.
type DeepScanFlow struct {
}

// DeepScanFlowCreateData is the typed request payload for DeepScanFlow.CreateTyped.
type DeepScanFlowCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	AccountId *any `json:"account_id,omitempty"`
	Concurrency *int `json:"concurrency,omitempty"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	ExplorationId *string `json:"exploration_id,omitempty"`
	FlowNames []any `json:"flow_names"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	MaxTesters *int `json:"max_testers,omitempty"`
	Note *any `json:"note,omitempty"`
}

// DeepScanMappedFlow is the typed data model for the deep_scan_mapped_flow entity.
type DeepScanMappedFlow struct {
}

// DeepScanMappedFlowLoadMatch is the typed request payload for DeepScanMappedFlow.LoadTyped.
type DeepScanMappedFlowLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	AccountId *string `json:"account_id,omitempty"`
	EnvironmentId string `json:"environment_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// DeepScanOption is the typed data model for the deep_scan_option entity.
type DeepScanOption struct {
}

// DeepScanOptionListMatch is the typed request payload for DeepScanOption.ListTyped.
type DeepScanOptionListMatch struct {
	OrganizationId string `json:"organization_id"`
	EnvironmentQuery *string `json:"environment_query,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// DemoShare is the typed data model for the demo_share entity.
type DemoShare struct {
}

// DemoShareLoadMatch is the typed request payload for DemoShare.LoadTyped.
type DemoShareLoadMatch struct {
	Id string `json:"id"`
}

// DemoShareSegment is the typed data model for the demo_share_segment entity.
type DemoShareSegment struct {
}

// DemoShareSegmentLoadMatch is the typed request payload for DemoShareSegment.LoadTyped.
type DemoShareSegmentLoadMatch struct {
	DemoShareId string `json:"demo_share_id"`
	Id string `json:"id"`
}

// Deployment is the typed data model for the deployment entity.
type Deployment struct {
}

// DeploymentLoadMatch is the typed request payload for Deployment.LoadTyped.
type DeploymentLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DeploymentDashboardNomad is the typed data model for the deployment_dashboard_nomad entity.
type DeploymentDashboardNomad struct {
}

// DeploymentDashboardNomadLoadMatch is the typed request payload for DeploymentDashboardNomad.LoadTyped.
type DeploymentDashboardNomadLoadMatch struct {
	AppId string `json:"app_id"`
	Environment *string `json:"environment,omitempty"`
	Location *string `json:"location,omitempty"`
	Service *string `json:"service,omitempty"`
}

// DeploymentDetail is the typed data model for the deployment_detail entity.
type DeploymentDetail struct {
}

// DeploymentDetailLoadMatch is the typed request payload for DeploymentDetail.LoadTyped.
type DeploymentDetailLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Service *string `json:"service,omitempty"`
}

// DeploymentFile is the typed data model for the deployment_file entity.
type DeploymentFile struct {
}

// DeploymentFileUpdateData is the typed request payload for DeploymentFile.UpdateTyped.
type DeploymentFileUpdateData struct {
	DeploymentId string `json:"deployment_id"`
	StaticSiteId string `json:"static_site_id"`
}

// DeploymentLog is the typed data model for the deployment_log entity.
type DeploymentLog struct {
}

// DeploymentLogListMatch is the typed request payload for DeploymentLog.ListTyped.
type DeploymentLogListMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Limit *int `json:"limit,omitempty"`
	LogLocation *string `json:"log_location,omitempty"`
	LogService *string `json:"log_service,omitempty"`
	Service *string `json:"service,omitempty"`
}

// DeploymentMetric is the typed data model for the deployment_metric entity.
type DeploymentMetric struct {
}

// DeploymentMetricListMatch is the typed request payload for DeploymentMetric.ListTyped.
type DeploymentMetricListMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
	Environment *string `json:"environment,omitempty"`
	MetricsRange *string `json:"metrics_range,omitempty"`
	Service *string `json:"service,omitempty"`
}

// DeploymentPreview is the typed data model for the deployment_preview entity.
type DeploymentPreview struct {
}

// DeploymentPreviewListMatch is the typed request payload for DeploymentPreview.ListTyped.
type DeploymentPreviewListMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
	Change *string `json:"change,omitempty"`
	Expiry *string `json:"expiry,omitempty"`
	Health *string `json:"health,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Page *int `json:"page,omitempty"`
}

// DeploymentSetting is the typed data model for the deployment_setting entity.
type DeploymentSetting struct {
}

// DeploymentSettingListMatch is the typed request payload for DeploymentSetting.ListTyped.
type DeploymentSettingListMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Service *string `json:"service,omitempty"`
}

// DesktopLocalAgentModel is the typed data model for the desktop_local_agent_model entity.
type DesktopLocalAgentModel struct {
}

// DesktopLocalAgentModelListMatch is the typed request payload for DesktopLocalAgentModel.ListTyped.
type DesktopLocalAgentModelListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// DesktopLocalAgentResponse is the typed data model for the desktop_local_agent_response entity.
type DesktopLocalAgentResponse struct {
}

// DesktopLocalAgentResponseCreateData is the typed request payload for DesktopLocalAgentResponse.CreateTyped.
type DesktopLocalAgentResponseCreateData struct {
	OrganizationId string `json:"organization_id"`
	Input []any `json:"input"`
	MaxOutputTokens *int `json:"max_output_tokens,omitempty"`
	Model string `json:"model"`
	Store bool `json:"store"`
	Stream bool `json:"stream"`
}

// Device is the typed data model for the device entity.
type Device struct {
}

// DeviceLoadMatch is the typed request payload for Device.LoadTyped.
type DeviceLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DeviceListMatch is the typed request payload for Device.ListTyped.
type DeviceListMatch struct {
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	IncludeRevoked *bool `json:"include_revoked,omitempty"`
}

// DeviceCreateData is the typed request payload for Device.CreateTyped.
type DeviceCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Architecture string `json:"architecture"`
	Channel string `json:"channel"`
	Name string `json:"name"`
	PairingGeneration int `json:"pairing_generation"`
	Platform string `json:"platform"`
	Access *any `json:"access,omitempty"`
	Folders *any `json:"folders,omitempty"`
	MaxAgents *any `json:"max_agents,omitempty"`
	Mode *any `json:"mode,omitempty"`
	PublicKey *any `json:"public_key,omitempty"`
	Repositories *any `json:"repositories,omitempty"`
	Restricted *any `json:"restricted,omitempty"`
	Transport *any `json:"transport,omitempty"`
	Version *any `json:"version,omitempty"`
}

// DeviceBrowserOperation is the typed data model for the device_browser_operation entity.
type DeviceBrowserOperation struct {
}

// DeviceBrowserOperationListMatch is the typed request payload for DeviceBrowserOperation.ListTyped.
type DeviceBrowserOperationListMatch struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
}

// DeviceBrowserOperationCreateData is the typed request payload for DeviceBrowserOperation.CreateTyped.
type DeviceBrowserOperationCreateData struct {
	DeviceId string `json:"device_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ClaimToken *any `json:"claim_token,omitempty"`
	Response *any `json:"response,omitempty"`
}

// DeviceControlMessage is the typed data model for the device_control_message entity.
type DeviceControlMessage struct {
}

// DeviceControlMessageListMatch is the typed request payload for DeviceControlMessage.ListTyped.
type DeviceControlMessageListMatch struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// DeviceEnterpriseRelay is the typed data model for the device_enterprise_relay entity.
type DeviceEnterpriseRelay struct {
}

// DeviceEnterpriseRelayLoadMatch is the typed request payload for DeviceEnterpriseRelay.LoadTyped.
type DeviceEnterpriseRelayLoadMatch struct {
}

// DeviceFolderListing is the typed data model for the device_folder_listing entity.
type DeviceFolderListing struct {
}

// DeviceFolderListingLoadMatch is the typed request payload for DeviceFolderListing.LoadTyped.
type DeviceFolderListingLoadMatch struct {
	DeviceId string `json:"device_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DeviceFolderListingCreateData is the typed request payload for DeviceFolderListing.CreateTyped.
type DeviceFolderListingCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Key string `json:"key"`
	Path string `json:"path"`
}

// DeviceGrant is the typed data model for the device_grant entity.
type DeviceGrant struct {
}

// DeviceGrantListMatch is the typed request payload for DeviceGrant.ListTyped.
type DeviceGrantListMatch struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// DeviceGrantCreateData is the typed request payload for DeviceGrant.CreateTyped.
type DeviceGrantCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	AgentId string `json:"agent_id"`
	Capabilities []any `json:"capabilities"`
	PrincipalId string `json:"principal_id"`
}

// DeviceInvocation is the typed data model for the device_invocation entity.
type DeviceInvocation struct {
}

// DeviceInvocationCreateData is the typed request payload for DeviceInvocation.CreateTyped.
type DeviceInvocationCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Challenge *any `json:"challenge,omitempty"`
	InvocationId *any `json:"invocation_id,omitempty"`
	RequestHash *any `json:"request_hash,omitempty"`
	Signature *any `json:"signature,omitempty"`
}

// DeviceLocalEvent is the typed data model for the device_local_event entity.
type DeviceLocalEvent struct {
}

// DeviceLocalEventCreateData is the typed request payload for DeviceLocalEvent.CreateTyped.
type DeviceLocalEventCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Event string `json:"event"`
}

// DeviceOperation is the typed data model for the device_operation entity.
type DeviceOperation struct {
}

// DeviceOperationLoadMatch is the typed request payload for DeviceOperation.LoadTyped.
type DeviceOperationLoadMatch struct {
	DeviceId string `json:"device_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DeviceOperationCreateData is the typed request payload for DeviceOperation.CreateTyped.
type DeviceOperationCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Action string `json:"action"`
	Arguments map[string]any `json:"arguments"`
	Key string `json:"key"`
}

// DevicePairing is the typed data model for the device_pairing entity.
type DevicePairing struct {
}

// DevicePairingCreateData is the typed request payload for DevicePairing.CreateTyped.
type DevicePairingCreateData struct {
	OrganizationId string `json:"organization_id"`
	Architecture string `json:"architecture"`
	Channel string `json:"channel"`
	Name string `json:"name"`
	Platform string `json:"platform"`
	PublicKey string `json:"public_key"`
}

// DeviceProject is the typed data model for the device_project entity.
type DeviceProject struct {
}

// DeviceProjectRemoveMatch is the typed request payload for DeviceProject.RemoveTyped.
type DeviceProjectRemoveMatch struct {
	DeviceId string `json:"device_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DeviceScheduledCheckIn is the typed data model for the device_scheduled_check_in entity.
type DeviceScheduledCheckIn struct {
}

// DeviceScheduledCheckInCreateData is the typed request payload for DeviceScheduledCheckIn.CreateTyped.
type DeviceScheduledCheckInCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Enabled bool `json:"enabled"`
}

// DockerBuilder is the typed data model for the docker_builder entity.
type DockerBuilder struct {
}

// DockerBuilderLoadMatch is the typed request payload for DockerBuilder.LoadTyped.
type DockerBuilderLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderListMatch is the typed request payload for DockerBuilder.ListTyped.
type DockerBuilderListMatch struct {
	OrganizationId string `json:"organization_id"`
	Slug *string `json:"slug,omitempty"`
}

// DockerBuilderCreateData is the typed request payload for DockerBuilder.CreateTyped.
type DockerBuilderCreateData struct {
	OrganizationId string `json:"organization_id"`
	Backend *string `json:"backend,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// DockerBuilderUpdateData is the typed request payload for DockerBuilder.UpdateTyped.
type DockerBuilderUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderPatchData is the typed request payload for DockerBuilder.PatchTyped.
type DockerBuilderPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Slug *string `json:"slug,omitempty"`
}

// DockerBuilderSession is the typed data model for the docker_builder_session entity.
type DockerBuilderSession struct {
}

// DockerBuilderSessionLoadMatch is the typed request payload for DockerBuilderSession.LoadTyped.
type DockerBuilderSessionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderSessionCreateData is the typed request payload for DockerBuilderSession.CreateTyped.
type DockerBuilderSessionCreateData struct {
	DockerBuilderId string `json:"docker_builder_id"`
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderSessionRemoveMatch is the typed request payload for DockerBuilderSession.RemoveTyped.
type DockerBuilderSessionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderSetting is the typed data model for the docker_builder_setting entity.
type DockerBuilderSetting struct {
}

// DockerBuilderSettingLoadMatch is the typed request payload for DockerBuilderSetting.LoadTyped.
type DockerBuilderSettingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderSettingUpdateData is the typed request payload for DockerBuilderSetting.UpdateTyped.
type DockerBuilderSettingUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// DockerBuilderSettingPatchData is the typed request payload for DockerBuilderSetting.PatchTyped.
type DockerBuilderSettingPatchData struct {
	OrganizationId string `json:"organization_id"`
	IdleTimeoutSeconds *int `json:"idle_timeout_seconds,omitempty"`
	MaxConcurrency *int `json:"max_concurrency,omitempty"`
	Region *string `json:"region,omitempty"`
	RuntimeTimeoutSeconds *int `json:"runtime_timeout_seconds,omitempty"`
}

// DomainDnsIntegration is the typed data model for the domain_dns_integration entity.
type DomainDnsIntegration struct {
}

// DomainDnsIntegrationListMatch is the typed request payload for DomainDnsIntegration.ListTyped.
type DomainDnsIntegrationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// DomainDnsIntegrationCreateData is the typed request payload for DomainDnsIntegration.CreateTyped.
type DomainDnsIntegrationCreateData struct {
	OrganizationId string `json:"organization_id"`
	AccountLabel *any `json:"account_label,omitempty"`
	ApiToken string `json:"api_token"`
}

// DomainPathRule is the typed data model for the domain_path_rule entity.
type DomainPathRule struct {
}

// DomainPathRuleLoadMatch is the typed request payload for DomainPathRule.LoadTyped.
type DomainPathRuleLoadMatch struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
	Id string `json:"id"`
}

// DomainPathRuleListMatch is the typed request payload for DomainPathRule.ListTyped.
type DomainPathRuleListMatch struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
}

// DomainPathRuleCreateData is the typed request payload for DomainPathRule.CreateTyped.
type DomainPathRuleCreateData struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
	AppServiceEndpointId *any `json:"app_service_endpoint_id,omitempty"`
	AppServiceId any `json:"app_service_id"`
	PathPrefix string `json:"path_prefix"`
}

// DomainPathRuleUpdateData is the typed request payload for DomainPathRule.UpdateTyped.
type DomainPathRuleUpdateData struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
	Id string `json:"id"`
	AppServiceEndpointId *any `json:"app_service_endpoint_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	PathPrefix *string `json:"path_prefix,omitempty"`
}

// DomainPathRulePatchData is the typed request payload for DomainPathRule.PatchTyped.
type DomainPathRulePatchData struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
	Id string `json:"id"`
	AppServiceEndpointId *any `json:"app_service_endpoint_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	PathPrefix *string `json:"path_prefix,omitempty"`
}

// DomainPathRuleRemoveMatch is the typed request payload for DomainPathRule.RemoveTyped.
type DomainPathRuleRemoveMatch struct {
	AppId string `json:"app_id"`
	DomainId string `json:"domain_id"`
	Id string `json:"id"`
}

// Dream is the typed data model for the dream entity.
type Dream struct {
}

// DreamLoadMatch is the typed request payload for Dream.LoadTyped.
type DreamLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId string `json:"project_id"`
	Tab *string `json:"tab,omitempty"`
}

// DreamListMatch is the typed request payload for Dream.ListTyped.
type DreamListMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId string `json:"project_id"`
}

// DreamCreateData is the typed request payload for Dream.CreateTyped.
type DreamCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Attention bool `json:"attention"`
	Changes []any `json:"changes"`
	CompletedAt any `json:"completed_at"`
	Counts map[string]any `json:"counts"`
	Dream any `json:"dream"`
	ErrorCode any `json:"error_code"`
	Pagination map[string]any `json:"pagination"`
	Permissions map[string]any `json:"permissions"`
	Phase string `json:"phase"`
	Reason any `json:"reason"`
	Reviewed int `json:"reviewed"`
	ReviewedDate string `json:"reviewed_date"`
	Runs []any `json:"runs"`
	ScopeName string `json:"scope_name"`
	Skipped int `json:"skipped"`
	Tab string `json:"tab"`
	Timezone string `json:"timezone"`
}

// Edge is the typed data model for the edge entity.
type Edge struct {
}

// EdgeLoadMatch is the typed request payload for Edge.LoadTyped.
type EdgeLoadMatch struct {
}

// EmailVerification is the typed data model for the email_verification entity.
type EmailVerification struct {
}

// EmailVerificationCreateData is the typed request payload for EmailVerification.CreateTyped.
type EmailVerificationCreateData struct {
	Email *any `json:"email,omitempty"`
}

// EnvironmentDiscoveryRun is the typed data model for the environment_discovery_run entity.
type EnvironmentDiscoveryRun struct {
}

// EnvironmentDiscoveryRunLoadMatch is the typed request payload for EnvironmentDiscoveryRun.LoadTyped.
type EnvironmentDiscoveryRunLoadMatch struct {
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentDiscoveryRunCreateData is the typed request payload for EnvironmentDiscoveryRun.CreateTyped.
type EnvironmentDiscoveryRunCreateData struct {
	EnvironmentId string `json:"environment_id"`
	OrganizationId string `json:"organization_id"`
	AccountId *any `json:"account_id,omitempty"`
}

// EnvironmentExploration is the typed data model for the environment_exploration entity.
type EnvironmentExploration struct {
}

// EnvironmentExplorationCreateData is the typed request payload for EnvironmentExploration.CreateTyped.
type EnvironmentExplorationCreateData struct {
	EnvironmentId string `json:"environment_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *any `json:"account_id,omitempty"`
	Concurrency *int `json:"concurrency,omitempty"`
	Goal string `json:"goal"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	MaxTesters *int `json:"max_testers,omitempty"`
	PersonaId *any `json:"persona_id,omitempty"`
}

// EnvironmentFirstRun is the typed data model for the environment_first_run entity.
type EnvironmentFirstRun struct {
}

// EnvironmentFirstRunCreateData is the typed request payload for EnvironmentFirstRun.CreateTyped.
type EnvironmentFirstRunCreateData struct {
	EnvironmentId string `json:"environment_id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentRevision is the typed data model for the environment_revision entity.
type EnvironmentRevision struct {
}

// EnvironmentRevisionLoadMatch is the typed request payload for EnvironmentRevision.LoadTyped.
type EnvironmentRevisionLoadMatch struct {
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentRevisionCreateData is the typed request payload for EnvironmentRevision.CreateTyped.
type EnvironmentRevisionCreateData struct {
	EnvironmentId string `json:"environment_id"`
	OrganizationId string `json:"organization_id"`
	Blueprint map[string]any `json:"blueprint"`
	DryRun *bool `json:"dry_run,omitempty"`
	SourceMetadata *map[string]any `json:"source_metadata,omitempty"`
}

// EnvironmentRevisionUpdateData is the typed request payload for EnvironmentRevision.UpdateTyped.
type EnvironmentRevisionUpdateData struct {
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentSecretBinding is the typed data model for the environment_secret_binding entity.
type EnvironmentSecretBinding struct {
}

// EnvironmentSecretBindingLoadMatch is the typed request payload for EnvironmentSecretBinding.LoadTyped.
type EnvironmentSecretBindingLoadMatch struct {
	AppId string `json:"app_id"`
	EnvironmentId string `json:"environment_id"`
}

// EnvironmentSecretBindingCreateData is the typed request payload for EnvironmentSecretBinding.CreateTyped.
type EnvironmentSecretBindingCreateData struct {
	AppId string `json:"app_id"`
	EnvironmentId string `json:"environment_id"`
	EnvKey string `json:"env_key"`
	Mode *string `json:"mode,omitempty"`
	SecretId *string `json:"secret_id,omitempty"`
	SecretVersionId *string `json:"secret_version_id,omitempty"`
}

// EnvironmentSecretBindingRemoveMatch is the typed request payload for EnvironmentSecretBinding.RemoveTyped.
type EnvironmentSecretBindingRemoveMatch struct {
	AppId string `json:"app_id"`
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
}

// EnvironmentTestAccount is the typed data model for the environment_test_account entity.
type EnvironmentTestAccount struct {
}

// EnvironmentTestAccountListMatch is the typed request payload for EnvironmentTestAccount.ListTyped.
type EnvironmentTestAccountListMatch struct {
	EnvironmentId string `json:"environment_id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentTestAccountUpdateData is the typed request payload for EnvironmentTestAccount.UpdateTyped.
type EnvironmentTestAccountUpdateData struct {
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentTestAccountPatchData is the typed request payload for EnvironmentTestAccount.PatchTyped.
type EnvironmentTestAccountPatchData struct {
	EnvironmentId string `json:"environment_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Credentials *[]any `json:"credentials,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
}

// ExecutionDesiredState is the typed data model for the execution_desired_state entity.
type ExecutionDesiredState struct {
}

// ExecutionDesiredStateLoadMatch is the typed request payload for ExecutionDesiredState.LoadTyped.
type ExecutionDesiredStateLoadMatch struct {
	Id string `json:"id"`
}

// ExecutionDesiredStateCreateData is the typed request payload for ExecutionDesiredState.CreateTyped.
type ExecutionDesiredStateCreateData struct {
}

// ExecutionDesiredStateUpdateData is the typed request payload for ExecutionDesiredState.UpdateTyped.
type ExecutionDesiredStateUpdateData struct {
	Id string `json:"id"`
}

// ExecutionDesiredStatePatchData is the typed request payload for ExecutionDesiredState.PatchTyped.
type ExecutionDesiredStatePatchData struct {
	Id string `json:"id"`
}

// ExecutionDesiredStateRemoveMatch is the typed request payload for ExecutionDesiredState.RemoveTyped.
type ExecutionDesiredStateRemoveMatch struct {
	Id string `json:"id"`
}

// ExecutionReconcilerTick is the typed data model for the execution_reconciler_tick entity.
type ExecutionReconcilerTick struct {
}

// ExecutionReconcilerTickLoadMatch is the typed request payload for ExecutionReconcilerTick.LoadTyped.
type ExecutionReconcilerTickLoadMatch struct {
	Id string `json:"id"`
}

// ExecutionReconcilerTickCreateData is the typed request payload for ExecutionReconcilerTick.CreateTyped.
type ExecutionReconcilerTickCreateData struct {
}

// ExecutionRelease is the typed data model for the execution_release entity.
type ExecutionRelease struct {
}

// ExecutionReleaseLoadMatch is the typed request payload for ExecutionRelease.LoadTyped.
type ExecutionReleaseLoadMatch struct {
	Id string `json:"id"`
}

// ExecutionReleaseCreateData is the typed request payload for ExecutionRelease.CreateTyped.
type ExecutionReleaseCreateData struct {
}

// ExecutionRuntimeInstance is the typed data model for the execution_runtime_instance entity.
type ExecutionRuntimeInstance struct {
}

// ExecutionRuntimeInstanceLoadMatch is the typed request payload for ExecutionRuntimeInstance.LoadTyped.
type ExecutionRuntimeInstanceLoadMatch struct {
	Id string `json:"id"`
}

// ExecutionRuntimeInstanceListMatch is the typed request payload for ExecutionRuntimeInstance.ListTyped.
type ExecutionRuntimeInstanceListMatch struct {
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
	AppServiceId *string `json:"app_service_id,omitempty"`
	HostedAppId *string `json:"hosted_app_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
}

// ExecutionRuntimeInstanceCreateData is the typed request payload for ExecutionRuntimeInstance.CreateTyped.
type ExecutionRuntimeInstanceCreateData struct {
}

// ExecutionRuntimeInstanceUpdateData is the typed request payload for ExecutionRuntimeInstance.UpdateTyped.
type ExecutionRuntimeInstanceUpdateData struct {
	Id string `json:"id"`
}

// ExecutionRuntimeInstancePatchData is the typed request payload for ExecutionRuntimeInstance.PatchTyped.
type ExecutionRuntimeInstancePatchData struct {
	Id string `json:"id"`
}

// ExecutionRuntimeInstanceRemoveMatch is the typed request payload for ExecutionRuntimeInstance.RemoveTyped.
type ExecutionRuntimeInstanceRemoveMatch struct {
	Id string `json:"id"`
}

// Exploration is the typed data model for the exploration entity.
type Exploration struct {
}

// ExplorationLoadMatch is the typed request payload for Exploration.LoadTyped.
type ExplorationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AgentId *string `json:"agent_id,omitempty"`
	Evidence *string `json:"evidence,omitempty"`
	FindingId *string `json:"finding_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// ExplorationListMatch is the typed request payload for Exploration.ListTyped.
type ExplorationListMatch struct {
	OrganizationId string `json:"organization_id"`
	Launch *bool `json:"launch,omitempty"`
	Page *int `json:"page,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// ExplorationCreateData is the typed request payload for Exploration.CreateTyped.
type ExplorationCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	AccountId *any `json:"account_id,omitempty"`
	Concurrency *int `json:"concurrency,omitempty"`
	EnvironmentId string `json:"environment_id"`
	Goal string `json:"goal"`
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	MaxTesters *int `json:"max_testers,omitempty"`
	PersonaId *any `json:"persona_id,omitempty"`
}

// ExplorationMessage is the typed data model for the exploration_message entity.
type ExplorationMessage struct {
}

// ExplorationMessageCreateData is the typed request payload for ExplorationMessage.CreateTyped.
type ExplorationMessageCreateData struct {
	ExplorationId string `json:"exploration_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	Text string `json:"text"`
}

// ExplorationReport is the typed data model for the exploration_report entity.
type ExplorationReport struct {
}

// ExplorationReportLoadMatch is the typed request payload for ExplorationReport.LoadTyped.
type ExplorationReportLoadMatch struct {
	ExplorationId string `json:"exploration_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// ExplorationReportCreateData is the typed request payload for ExplorationReport.CreateTyped.
type ExplorationReportCreateData struct {
	ExplorationId string `json:"exploration_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	SourceIds *any `json:"source_ids,omitempty"`
}

// ExplorationScenario is the typed data model for the exploration_scenario entity.
type ExplorationScenario struct {
}

// ExplorationScenarioCreateData is the typed request payload for ExplorationScenario.CreateTyped.
type ExplorationScenarioCreateData struct {
	ExplorationId string `json:"exploration_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// Finding is the typed data model for the finding entity.
type Finding struct {
}

// FindingLoadMatch is the typed request payload for Finding.LoadTyped.
type FindingLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// FindingListMatch is the typed request payload for Finding.ListTyped.
type FindingListMatch struct {
	OrganizationId string `json:"organization_id"`
	Status *string `json:"status,omitempty"`
}

// FindingUpdateData is the typed request payload for Finding.UpdateTyped.
type FindingUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// FindingPatchData is the typed request payload for Finding.PatchTyped.
type FindingPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepositoryId *string `json:"repository_id,omitempty"`
	DeferredUntil *any `json:"deferred_until,omitempty"`
	Reason *string `json:"reason,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Gh is the typed data model for the gh entity.
type Gh struct {
}

// GhLoadMatch is the typed request payload for Gh.LoadTyped.
type GhLoadMatch struct {
	GhId string `json:"gh_id"`
	GithubRepo string `json:"github_repo"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	CheckId *string `json:"check_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	JobId *string `json:"job_id,omitempty"`
	Page *int `json:"page,omitempty"`
	RunId *string `json:"run_id,omitempty"`
	Section *string `json:"section,omitempty"`
	ThreadId *string `json:"thread_id,omitempty"`
}

// GitImport is the typed data model for the git_import entity.
type GitImport struct {
}

// GitImportLoadMatch is the typed request payload for GitImport.LoadTyped.
type GitImportLoadMatch struct {
	Id string `json:"id"`
}

// GitImportCreateData is the typed request payload for GitImport.CreateTyped.
type GitImportCreateData struct {
	OrganizationId string `json:"organization_id"`
	DestinationMode string `json:"destination_mode"`
	GitDefaultBranch *string `json:"git_default_branch,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	Name *string `json:"name,omitempty"`
	RootPath string `json:"root_path"`
	Slug string `json:"slug"`
	SourceBranch string `json:"source_branch"`
	TargetBranch *string `json:"target_branch,omitempty"`
}

// Github is the typed data model for the github entity.
type Github struct {
}

// GithubLoadMatch is the typed request payload for Github.LoadTyped.
type GithubLoadMatch struct {
	Name string `json:"name"`
	Owner string `json:"owner"`
}

// GithubApp is the typed data model for the github_app entity.
type GithubApp struct {
}

// GithubAppCreateData is the typed request payload for GithubApp.CreateTyped.
type GithubAppCreateData struct {
}

// GithubAppImportableRepository is the typed data model for the github_app_importable_repository entity.
type GithubAppImportableRepository struct {
}

// GithubAppImportableRepositoryListMatch is the typed request payload for GithubAppImportableRepository.ListTyped.
type GithubAppImportableRepositoryListMatch struct {
	GithubAppInstallationId *string `json:"github_app_installation_id,omitempty"`
	Page *int `json:"page,omitempty"`
}

// GithubAppInstallation is the typed data model for the github_app_installation entity.
type GithubAppInstallation struct {
}

// GithubAppInstallationListMatch is the typed request payload for GithubAppInstallation.ListTyped.
type GithubAppInstallationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// GithubAppInstallationCreateData is the typed request payload for GithubAppInstallation.CreateTyped.
type GithubAppInstallationCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AccountAvatarUrl any `json:"account_avatar_url"`
	AccountId any `json:"account_id"`
	AccountLogin string `json:"account_login"`
	CreatedAt string `json:"created_at"`
	CreatedAtLabel any `json:"created_at_label"`
	InstallationId string `json:"installation_id"`
	InstalledAt any `json:"installed_at"`
	InstalledAtLabel any `json:"installed_at_label"`
	ManageAccessUrl string `json:"manage_access_url"`
	PermissionEntries []any `json:"permission_entries"`
	Permissions map[string]any `json:"permissions"`
	Status string `json:"status"`
	SuspendedAt any `json:"suspended_at"`
	SuspendedAtLabel any `json:"suspended_at_label"`
	UpdatedAt string `json:"updated_at"`
	UpdatedAtLabel any `json:"updated_at_label"`
}

// GithubAppInstallationRemoveMatch is the typed request payload for GithubAppInstallation.RemoveTyped.
type GithubAppInstallationRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Force *bool `json:"force,omitempty"`
	UninstallOnGithub *bool `json:"uninstall_on_github,omitempty"`
}

// GithubAppInstallationAuthorization is the typed data model for the github_app_installation_authorization entity.
type GithubAppInstallationAuthorization struct {
}

// GithubAppInstallationAuthorizationCreateData is the typed request payload for GithubAppInstallationAuthorization.CreateTyped.
type GithubAppInstallationAuthorizationCreateData struct {
	OrganizationSlug string `json:"organization_slug"`
	ReturnTarget string `json:"return_target"`
}

// GithubAppUserAuthorization is the typed data model for the github_app_user_authorization entity.
type GithubAppUserAuthorization struct {
}

// GithubAppUserAuthorizationCreateData is the typed request payload for GithubAppUserAuthorization.CreateTyped.
type GithubAppUserAuthorizationCreateData struct {
}

// GithubCiRepository is the typed data model for the github_ci_repository entity.
type GithubCiRepository struct {
}

// GithubCiRepositoryLoadMatch is the typed request payload for GithubCiRepository.LoadTyped.
type GithubCiRepositoryLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// GithubCiRepositoryListMatch is the typed request payload for GithubCiRepository.ListTyped.
type GithubCiRepositoryListMatch struct {
	OrganizationId string `json:"organization_id"`
	AdoptionMode *string `json:"adoption_mode,omitempty"`
	Status *string `json:"status,omitempty"`
}

// GithubCiRepositoryCreateData is the typed request payload for GithubCiRepository.CreateTyped.
type GithubCiRepositoryCreateData struct {
	OrganizationId string `json:"organization_id"`
	AdoptionMode *string `json:"adoption_mode,omitempty"`
	CheckNamePrefix *string `json:"check_name_prefix,omitempty"`
	CiRunnerPoolId *any `json:"ci_runner_pool_id,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	GithubAppInstallationId string `json:"github_app_installation_id"`
	GithubRepositoryId string `json:"github_repository_id"`
	RepositoryName string `json:"repository_name"`
	RepositoryOwner string `json:"repository_owner"`
	Status *string `json:"status,omitempty"`
}

// GithubCiRepositoryUpdateData is the typed request payload for GithubCiRepository.UpdateTyped.
type GithubCiRepositoryUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AdoptionMode *string `json:"adoption_mode,omitempty"`
	CheckNamePrefix *string `json:"check_name_prefix,omitempty"`
	CiRunnerPoolId *any `json:"ci_runner_pool_id,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	PermissionStatus *string `json:"permission_status,omitempty"`
	Status *string `json:"status,omitempty"`
}

// GithubCiRepositoryPatchData is the typed request payload for GithubCiRepository.PatchTyped.
type GithubCiRepositoryPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AdoptionMode *string `json:"adoption_mode,omitempty"`
	CheckNamePrefix *string `json:"check_name_prefix,omitempty"`
	CiRunnerPoolId *any `json:"ci_runner_pool_id,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	PermissionStatus *string `json:"permission_status,omitempty"`
	Status *string `json:"status,omitempty"`
}

// GithubCiRepositoryCompatibilityReport is the typed data model for the github_ci_repository_compatibility_report entity.
type GithubCiRepositoryCompatibilityReport struct {
}

// GithubCiRepositoryCompatibilityReportLoadMatch is the typed request payload for GithubCiRepositoryCompatibilityReport.LoadTyped.
type GithubCiRepositoryCompatibilityReportLoadMatch struct {
	GithubCiRepositoryId string `json:"github_ci_repository_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// GithubCiRepositoryCompatibilityReportListMatch is the typed request payload for GithubCiRepositoryCompatibilityReport.ListTyped.
type GithubCiRepositoryCompatibilityReportListMatch struct {
	GithubCiRepositoryId string `json:"github_ci_repository_id"`
	OrganizationId string `json:"organization_id"`
	EventName *string `json:"event_name,omitempty"`
	SourceSha *string `json:"source_sha,omitempty"`
	Status *string `json:"status,omitempty"`
}

// GithubConnection is the typed data model for the github_connection entity.
type GithubConnection struct {
}

// GithubConnectionLoadMatch is the typed request payload for GithubConnection.LoadTyped.
type GithubConnectionLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	GithubAppInstallationId *string `json:"github_app_installation_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// GithubConnectionCreateData is the typed request payload for GithubConnection.CreateTyped.
type GithubConnectionCreateData struct {
	OrganizationId string `json:"organization_id"`
	GithubAppInstallationId string `json:"github_app_installation_id"`
	ProjectId *string `json:"project_id,omitempty"`
	Replace *bool `json:"replace,omitempty"`
	Repositories []any `json:"repositories"`
}

// GithubOnboarding is the typed data model for the github_onboarding entity.
type GithubOnboarding struct {
}

// GithubOnboardingLoadMatch is the typed request payload for GithubOnboarding.LoadTyped.
type GithubOnboardingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// GithubOnboardingBranch is the typed data model for the github_onboarding_branch entity.
type GithubOnboardingBranch struct {
}

// GithubOnboardingBranchListMatch is the typed request payload for GithubOnboardingBranch.ListTyped.
type GithubOnboardingBranchListMatch struct {
	OrganizationId string `json:"organization_id"`
	GithubAppInstallationId string `json:"github_app_installation_id"`
	Name string `json:"name"`
	Owner string `json:"owner"`
}

// GithubOnboardingImport is the typed data model for the github_onboarding_import entity.
type GithubOnboardingImport struct {
}

// GithubOnboardingImportCreateData is the typed request payload for GithubOnboardingImport.CreateTyped.
type GithubOnboardingImportCreateData struct {
	OrganizationId string `json:"organization_id"`
	GithubAppInstallationId string `json:"github_app_installation_id"`
	Repositories any `json:"repositories"`
}

// GithubOnboardingImportBatch is the typed data model for the github_onboarding_import_batch entity.
type GithubOnboardingImportBatch struct {
}

// GithubOnboardingImportBatchLoadMatch is the typed request payload for GithubOnboardingImportBatch.LoadTyped.
type GithubOnboardingImportBatchLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// GithubOnboardingImportItem is the typed data model for the github_onboarding_import_item entity.
type GithubOnboardingImportItem struct {
}

// GithubOnboardingImportItemCreateData is the typed request payload for GithubOnboardingImportItem.CreateTyped.
type GithubOnboardingImportItemCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// GithubPullRequest is the typed data model for the github_pull_request entity.
type GithubPullRequest struct {
}

// GithubPullRequestLoadMatch is the typed request payload for GithubPullRequest.LoadTyped.
type GithubPullRequestLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	PullRequestId string `json:"pull_request_id"`
	CheckId *string `json:"check_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	JobId *string `json:"job_id,omitempty"`
	Page *int `json:"page,omitempty"`
	RunId *string `json:"run_id,omitempty"`
	Section *string `json:"section,omitempty"`
	ThreadId *string `json:"thread_id,omitempty"`
}

// GithubPullRequestCreateData is the typed request payload for GithubPullRequest.CreateTyped.
type GithubPullRequestCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerAdmission is the typed data model for the github_runner_admission entity.
type GithubRunnerAdmission struct {
}

// GithubRunnerAdmissionCreateData is the typed request payload for GithubRunnerAdmission.CreateTyped.
type GithubRunnerAdmissionCreateData struct {
}

// GithubRunnerCache is the typed data model for the github_runner_cache entity.
type GithubRunnerCache struct {
}

// GithubRunnerCacheCreateData is the typed request payload for GithubRunnerCache.CreateTyped.
type GithubRunnerCacheCreateData struct {
	EntryId *string `json:"entry_id,omitempty"`
	Key *string `json:"key,omitempty"`
	Operation string `json:"operation"`
	RestoreKeys *[]any `json:"restore_keys,omitempty"`
	SizeBytes *string `json:"size_bytes,omitempty"`
	Version *string `json:"version,omitempty"`
}

// GithubRunnerEgress is the typed data model for the github_runner_egress entity.
type GithubRunnerEgress struct {
}

// GithubRunnerEgressLoadMatch is the typed request payload for GithubRunnerEgress.LoadTyped.
type GithubRunnerEgressLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerEgressCreateData is the typed request payload for GithubRunnerEgress.CreateTyped.
type GithubRunnerEgressCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerHistory is the typed data model for the github_runner_history entity.
type GithubRunnerHistory struct {
}

// GithubRunnerHistoryLoadMatch is the typed request payload for GithubRunnerHistory.LoadTyped.
type GithubRunnerHistoryLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Day *int `json:"day,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Repository *string `json:"repository,omitempty"`
	Status *string `json:"status,omitempty"`
}

// GithubRunnerImage is the typed data model for the github_runner_image entity.
type GithubRunnerImage struct {
}

// GithubRunnerImageLoadMatch is the typed request payload for GithubRunnerImage.LoadTyped.
type GithubRunnerImageLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerImageListMatch is the typed request payload for GithubRunnerImage.ListTyped.
type GithubRunnerImageListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerImageCreateData is the typed request payload for GithubRunnerImage.CreateTyped.
type GithubRunnerImageCreateData struct {
	OrganizationId string `json:"organization_id"`
	ImageReference string `json:"image_reference"`
	Name string `json:"name"`
	RegistrySecretName *any `json:"registry_secret_name,omitempty"`
}

// GithubRunnerPool is the typed data model for the github_runner_pool entity.
type GithubRunnerPool struct {
}

// GithubRunnerPoolListMatch is the typed request payload for GithubRunnerPool.ListTyped.
type GithubRunnerPoolListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// GithubRunnerPoolCreateData is the typed request payload for GithubRunnerPool.CreateTyped.
type GithubRunnerPoolCreateData struct {
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
	GithubAppInstallationId string `json:"github_app_installation_id"`
	Image *any `json:"image,omitempty"`
	Label *string `json:"label,omitempty"`
	MaxConcurrency *int `json:"max_concurrency,omitempty"`
	Provider *string `json:"provider,omitempty"`
	RepositoryFullName string `json:"repository_full_name"`
	TimeoutSeconds *int `json:"timeout_seconds,omitempty"`
}

// GithubRunnerPoolUpdateData is the typed request payload for GithubRunnerPool.UpdateTyped.
type GithubRunnerPoolUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Enabled *bool `json:"enabled,omitempty"`
	Image *any `json:"image,omitempty"`
	MaxConcurrency *int `json:"max_concurrency,omitempty"`
	Provider *string `json:"provider,omitempty"`
	TimeoutSeconds *int `json:"timeout_seconds,omitempty"`
}

// GithubRunnerSetup is the typed data model for the github_runner_setup entity.
type GithubRunnerSetup struct {
}

// GithubRunnerSetupLoadMatch is the typed request payload for GithubRunnerSetup.LoadTyped.
type GithubRunnerSetupLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Id string `json:"id"`
}

// GithubRunnerSetupCreateData is the typed request payload for GithubRunnerSetup.CreateTyped.
type GithubRunnerSetupCreateData struct {
	OrganizationId string `json:"organization_id"`
	GithubRepositoryConnectionId string `json:"github_repository_connection_id"`
}

// Gitlab is the typed data model for the gitlab entity.
type Gitlab struct {
}

// GitlabLoadMatch is the typed request payload for Gitlab.LoadTyped.
type GitlabLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	ConnectionId *string `json:"connection_id,omitempty"`
	IntegrationId *string `json:"integration_id,omitempty"`
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// GitlabCreateData is the typed request payload for Gitlab.CreateTyped.
type GitlabCreateData struct {
	OrganizationId string `json:"organization_id"`
	ClientId *any `json:"client_id,omitempty"`
	ClientSecret *any `json:"client_secret,omitempty"`
	InstanceUrl *any `json:"instance_url,omitempty"`
	IntegrationId *any `json:"integration_id,omitempty"`
	ReturnTarget *any `json:"return_target,omitempty"`
	WebhookAuthentication *any `json:"webhook_authentication,omitempty"`
}

// GitlabConnection is the typed data model for the gitlab_connection entity.
type GitlabConnection struct {
}

// GitlabConnectionCreateData is the typed request payload for GitlabConnection.CreateTyped.
type GitlabConnectionCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ActionName *any `json:"action_name,omitempty"`
	IntegrationId *any `json:"integration_id,omitempty"`
	SourceBranch *any `json:"source_branch,omitempty"`
}

// GitlabImport is the typed data model for the gitlab_import entity.
type GitlabImport struct {
}

// GitlabImportCreateData is the typed request payload for GitlabImport.CreateTyped.
type GitlabImportCreateData struct {
	OrganizationId string `json:"organization_id"`
	IntegrationId string `json:"integration_id"`
	ProjectId int `json:"project_id"`
	RepoSlug *string `json:"repo_slug,omitempty"`
	SourceBranch *string `json:"source_branch,omitempty"`
}

// GitlabOauth is the typed data model for the gitlab_oauth entity.
type GitlabOauth struct {
}

// GitlabOauthLoadMatch is the typed request payload for GitlabOauth.LoadTyped.
type GitlabOauthLoadMatch struct {
}

// GrantAllAgent is the typed data model for the grant_all_agent entity.
type GrantAllAgent struct {
}

// GrantAllAgentCreateData is the typed request payload for GrantAllAgent.CreateTyped.
type GrantAllAgentCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Enabled bool `json:"enabled"`
}

// HostingAppDomain is the typed data model for the hosting_app_domain entity.
type HostingAppDomain struct {
}

// HostingAppDomainLoadMatch is the typed request payload for HostingAppDomain.LoadTyped.
type HostingAppDomainLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
	AppEnvironmentId *string `json:"app_environment_id,omitempty"`
}

// HostingAppDomainCreateData is the typed request payload for HostingAppDomain.CreateTyped.
type HostingAppDomainCreateData struct {
	AppId string `json:"app_id"`
	AppEnvironmentId *any `json:"app_environment_id,omitempty"`
	AppServiceId any `json:"app_service_id"`
	DnsStatus *string `json:"dns_status,omitempty"`
	Hostname string `json:"hostname"`
	Kind string `json:"kind"`
	RedirectTo *any `json:"redirect_to,omitempty"`
	TlsStatus *string `json:"tls_status,omitempty"`
}

// HostingAppDomainUpdateData is the typed request payload for HostingAppDomain.UpdateTyped.
type HostingAppDomainUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// HostingAppDomainPatchData is the typed request payload for HostingAppDomain.PatchTyped.
type HostingAppDomainPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// HostingAppDomainRemoveMatch is the typed request payload for HostingAppDomain.RemoveTyped.
type HostingAppDomainRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// IdentityOrganization is the typed data model for the identity_organization entity.
type IdentityOrganization struct {
}

// IdentityOrganizationLoadMatch is the typed request payload for IdentityOrganization.LoadTyped.
type IdentityOrganizationLoadMatch struct {
	Id string `json:"id"`
}

// ImageRepository is the typed data model for the image_repository entity.
type ImageRepository struct {
}

// ImageRepositoryListMatch is the typed request payload for ImageRepository.ListTyped.
type ImageRepositoryListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ImageRepositoryCreateData is the typed request payload for ImageRepository.CreateTyped.
type ImageRepositoryCreateData struct {
	OrganizationId string `json:"organization_id"`
	HostedAppId *any `json:"hosted_app_id,omitempty"`
	Name string `json:"name"`
	ProviderKind *string `json:"provider_kind,omitempty"`
	RegistryAuthToken *string `json:"registry_auth_token,omitempty"`
	RepositoryPath *string `json:"repository_path,omitempty"`
	Slug string `json:"slug"`
	Status *string `json:"status,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// ImageRepositoryTag is the typed data model for the image_repository_tag entity.
type ImageRepositoryTag struct {
}

// ImageRepositoryTagListMatch is the typed request payload for ImageRepositoryTag.ListTyped.
type ImageRepositoryTagListMatch struct {
	ImageRepositoryId string `json:"image_repository_id"`
}

// ImportBranchPolicy is the typed data model for the import_branch_policy entity.
type ImportBranchPolicy struct {
}

// ImportBranchPolicyLoadMatch is the typed request payload for ImportBranchPolicy.LoadTyped.
type ImportBranchPolicyLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ImportBranchPolicyUpdateData is the typed request payload for ImportBranchPolicy.UpdateTyped.
type ImportBranchPolicyUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// ImportBranchPolicyPatchData is the typed request payload for ImportBranchPolicy.PatchTyped.
type ImportBranchPolicyPatchData struct {
	OrganizationId string `json:"organization_id"`
	DefaultTrunkBookmark *string `json:"default_trunk_bookmark,omitempty"`
}

// Integration is the typed data model for the integration entity.
type Integration struct {
}

// IntegrationLoadMatch is the typed request payload for Integration.LoadTyped.
type IntegrationLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// InteractionResponse is the typed data model for the interaction_response entity.
type InteractionResponse struct {
}

// InteractionResponseCreateData is the typed request payload for InteractionResponse.CreateTyped.
type InteractionResponseCreateData struct {
	AgentId string `json:"agent_id"`
	InteractionId string `json:"interaction_id"`
	OrganizationId string `json:"organization_id"`
	Answer map[string]any `json:"answer"`
	ConversationId string `json:"conversation_id"`
	ExpectedRevision int `json:"expected_revision"`
}

// Invitation is the typed data model for the invitation entity.
type Invitation struct {
}

// InvitationListMatch is the typed request payload for Invitation.ListTyped.
type InvitationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// InvitationCreateData is the typed request payload for Invitation.CreateTyped.
type InvitationCreateData struct {
	OrganizationId string `json:"organization_id"`
	Email string `json:"email"`
	Role string `json:"role"`
}

// InvitationRemoveMatch is the typed request payload for Invitation.RemoveTyped.
type InvitationRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// InvocationControl is the typed data model for the invocation_control entity.
type InvocationControl struct {
}

// InvocationControlCreateData is the typed request payload for InvocationControl.CreateTyped.
type InvocationControlCreateData struct {
	DeviceId string `json:"device_id"`
	OrganizationId string `json:"organization_id"`
	Challenge *any `json:"challenge,omitempty"`
	InvocationId *any `json:"invocation_id,omitempty"`
	RequestHash *any `json:"request_hash,omitempty"`
	Signature *any `json:"signature,omitempty"`
}

// JobLogChunk is the typed data model for the job_log_chunk entity.
type JobLogChunk struct {
}

// JobLogChunkListMatch is the typed request payload for JobLogChunk.ListTyped.
type JobLogChunkListMatch struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
	AfterSequence *int `json:"after_sequence,omitempty"`
}

// JobLogChunkCreateData is the typed request payload for JobLogChunk.CreateTyped.
type JobLogChunkCreateData struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobStep is the typed data model for the job_step entity.
type JobStep struct {
}

// JobStepLoadMatch is the typed request payload for JobStep.LoadTyped.
type JobStepLoadMatch struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobStepCreateData is the typed request payload for JobStep.CreateTyped.
type JobStepCreateData struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobStepUpdateData is the typed request payload for JobStep.UpdateTyped.
type JobStepUpdateData struct {
	Id string `json:"id"`
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobStepPatchData is the typed request payload for JobStep.PatchTyped.
type JobStepPatchData struct {
	Id string `json:"id"`
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobWorkspace is the typed data model for the job_workspace entity.
type JobWorkspace struct {
}

// JobWorkspaceLoadMatch is the typed request payload for JobWorkspace.LoadTyped.
type JobWorkspaceLoadMatch struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobWorkspaceCreateData is the typed request payload for JobWorkspace.CreateTyped.
type JobWorkspaceCreateData struct {
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobWorkspaceUpdateData is the typed request payload for JobWorkspace.UpdateTyped.
type JobWorkspaceUpdateData struct {
	Id string `json:"id"`
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JobWorkspacePatchData is the typed request payload for JobWorkspace.PatchTyped.
type JobWorkspacePatchData struct {
	Id string `json:"id"`
	JobId string `json:"job_id"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// JourneyVariantReplay is the typed data model for the journey_variant_replay entity.
type JourneyVariantReplay struct {
}

// JourneyVariantReplayCreateData is the typed request payload for JourneyVariantReplay.CreateTyped.
type JourneyVariantReplayCreateData struct {
	JourneyVariantId string `json:"journey_variant_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	ActorId *any `json:"actor_id,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	ReviewReason string `json:"review_reason"`
	ScenarioFile map[string]any `json:"scenario_file"`
}

// Knowledge is the typed data model for the knowledge entity.
type Knowledge struct {
}

// KnowledgeLoadMatch is the typed request payload for Knowledge.LoadTyped.
type KnowledgeLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	Q *string `json:"q,omitempty"`
}

// KnowledgeCreateData is the typed request payload for Knowledge.CreateTyped.
type KnowledgeCreateData struct {
	OrganizationId string `json:"organization_id"`
	Markdown string `json:"markdown"`
	ProjectId string `json:"project_id"`
	Title string `json:"title"`
}

// KnowledgeUpdateData is the typed request payload for Knowledge.UpdateTyped.
type KnowledgeUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// KnowledgePatchData is the typed request payload for Knowledge.PatchTyped.
type KnowledgePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ExpectedDigest *string `json:"expected_digest,omitempty"`
	Markdown *string `json:"markdown,omitempty"`
	Title *string `json:"title,omitempty"`
}

// KnowledgeRemoveMatch is the typed request payload for Knowledge.RemoveTyped.
type KnowledgeRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// Known is the typed data model for the known entity.
type Known struct {
}

// KnownLoadMatch is the typed request payload for Known.LoadTyped.
type KnownLoadMatch struct {
}

// Label is the typed data model for the label entity.
type Label struct {
}

// LabelListMatch is the typed request payload for Label.ListTyped.
type LabelListMatch struct {
	OrganizationId string `json:"organization_id"`
	IncludeUnused *bool `json:"include_unused,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
}

// LeaseArtifact is the typed data model for the lease_artifact entity.
type LeaseArtifact struct {
}

// LeaseArtifactCreateData is the typed request payload for LeaseArtifact.CreateTyped.
type LeaseArtifactCreateData struct {
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LeaseCache is the typed data model for the lease_cache entity.
type LeaseCache struct {
}

// LeaseCacheCreateData is the typed request payload for LeaseCache.CreateTyped.
type LeaseCacheCreateData struct {
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LeaseLogChunk is the typed data model for the lease_log_chunk entity.
type LeaseLogChunk struct {
}

// LeaseLogChunkCreateData is the typed request payload for LeaseLogChunk.CreateTyped.
type LeaseLogChunkCreateData struct {
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LeaseReconciliation is the typed data model for the lease_reconciliation entity.
type LeaseReconciliation struct {
}

// LeaseReconciliationCreateData is the typed request payload for LeaseReconciliation.CreateTyped.
type LeaseReconciliationCreateData struct {
	Id string `json:"id"`
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LeaseStep is the typed data model for the lease_step entity.
type LeaseStep struct {
}

// LeaseStepUpdateData is the typed request payload for LeaseStep.UpdateTyped.
type LeaseStepUpdateData struct {
	Id string `json:"id"`
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LeaseVerifyDiagnostic is the typed data model for the lease_verify_diagnostic entity.
type LeaseVerifyDiagnostic struct {
}

// LeaseVerifyDiagnosticCreateData is the typed request payload for LeaseVerifyDiagnostic.CreateTyped.
type LeaseVerifyDiagnosticCreateData struct {
	LeaseId string `json:"lease_id"`
	SwarmId string `json:"swarm_id"`
	TaskId string `json:"task_id"`
	BrowserEvents map[string]any `json:"browser_events"`
	LiveBrowser *map[string]any `json:"live_browser,omitempty"`
	LiveView *map[string]any `json:"live_view,omitempty"`
	Steps *[]any `json:"steps,omitempty"`
}

// LeaseVerifySecret is the typed data model for the lease_verify_secret entity.
type LeaseVerifySecret struct {
}

// LeaseVerifySecretCreateData is the typed request payload for LeaseVerifySecret.CreateTyped.
type LeaseVerifySecretCreateData struct {
	LeaseId string `json:"lease_id"`
	SwarmId string `json:"swarm_id"`
	TaskId string `json:"task_id"`
}

// LeaseWorkspace is the typed data model for the lease_workspace entity.
type LeaseWorkspace struct {
}

// LeaseWorkspaceUpdateData is the typed request payload for LeaseWorkspace.UpdateTyped.
type LeaseWorkspaceUpdateData struct {
	Id string `json:"id"`
	LeaseId string `json:"lease_id"`
	NodeId string `json:"node_id"`
}

// LocalAgentDecision is the typed data model for the local_agent_decision entity.
type LocalAgentDecision struct {
}

// LocalAgentDecisionCreateData is the typed request payload for LocalAgentDecision.CreateTyped.
type LocalAgentDecisionCreateData struct {
	OrganizationId string `json:"organization_id"`
	Request map[string]any `json:"request"`
}

// LocalAgentResponse is the typed data model for the local_agent_response entity.
type LocalAgentResponse struct {
}

// LocalAgentResponseCreateData is the typed request payload for LocalAgentResponse.CreateTyped.
type LocalAgentResponseCreateData struct {
	OrganizationId string `json:"organization_id"`
	Input []any `json:"input"`
	Model string `json:"model"`
	ServiceTier *any `json:"service_tier,omitempty"`
	Store bool `json:"store"`
	Stream bool `json:"stream"`
	Tools *[]any `json:"tools,omitempty"`
}

// LocalThreadDelivery is the typed data model for the local_thread_delivery entity.
type LocalThreadDelivery struct {
}

// LocalThreadDeliveryLoadMatch is the typed request payload for LocalThreadDelivery.LoadTyped.
type LocalThreadDeliveryLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	LocalThreadId string `json:"local_thread_id"`
	OrganizationId string `json:"organization_id"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
}

// LocalThreadDeliveryUpdateData is the typed request payload for LocalThreadDelivery.UpdateTyped.
type LocalThreadDeliveryUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	LocalThreadId string `json:"local_thread_id"`
	OrganizationId string `json:"organization_id"`
	Decision *string `json:"decision,omitempty"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
}

// LocalThreadOperation is the typed data model for the local_thread_operation entity.
type LocalThreadOperation struct {
}

// LocalThreadOperationLoadMatch is the typed request payload for LocalThreadOperation.LoadTyped.
type LocalThreadOperationLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	LocalThreadId *string `json:"local_thread_id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// LocalThreadOperationCreateData is the typed request payload for LocalThreadOperation.CreateTyped.
type LocalThreadOperationCreateData struct {
	AgentId string `json:"agent_id"`
	LocalThreadId string `json:"local_thread_id"`
	OrganizationId string `json:"organization_id"`
	Action string `json:"action"`
	Arguments map[string]any `json:"arguments"`
	Key string `json:"key"`
}

// Location is the typed data model for the location entity.
type Location struct {
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	Code *string `json:"code,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NomadDatacenter *string `json:"nomad_datacenter,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// LogStreamChunk is the typed data model for the log_stream_chunk entity.
type LogStreamChunk struct {
}

// LogStreamChunkLoadMatch is the typed request payload for LogStreamChunk.LoadTyped.
type LogStreamChunkLoadMatch struct {
	Id *string `json:"id,omitempty"`
	LogStreamId string `json:"log_stream_id"`
	SpaceId string `json:"space_id"`
}

// LogStreamChunkCreateData is the typed request payload for LogStreamChunk.CreateTyped.
type LogStreamChunkCreateData struct {
	LogStreamId string `json:"log_stream_id"`
	SpaceId string `json:"space_id"`
}

// LogoImage is the typed data model for the logo_image entity.
type LogoImage struct {
}

// LogoImageUpdateData is the typed request payload for LogoImage.UpdateTyped.
type LogoImageUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// LogoImageRemoveMatch is the typed request payload for LogoImage.RemoveTyped.
type LogoImageRemoveMatch struct {
	OrganizationId string `json:"organization_id"`
}

// MarketingSetting is the typed data model for the marketing_setting entity.
type MarketingSetting struct {
}

// MarketingSettingLoadMatch is the typed request payload for MarketingSetting.LoadTyped.
type MarketingSettingLoadMatch struct {
	CallFirst *bool `json:"call_first,omitempty"`
}

// McpOauth is the typed data model for the mcp_oauth entity.
type McpOauth struct {
}

// McpOauthLoadMatch is the typed request payload for McpOauth.LoadTyped.
type McpOauthLoadMatch struct {
	Request string `json:"request"`
}

// McpOauthCreateData is the typed request payload for McpOauth.CreateTyped.
type McpOauthCreateData struct {
	AllOrganizations *any `json:"all_organizations,omitempty"`
	Approve *any `json:"approve,omitempty"`
	OrganizationId *any `json:"organization_id,omitempty"`
	Request *any `json:"request,omitempty"`
}

// Me is the typed data model for the me entity.
type Me struct {
}

// MeLoadMatch is the typed request payload for Me.LoadTyped.
type MeLoadMatch struct {
	ActiveOrganization *any `json:"active_organization,omitempty"`
	AnalyticsDistinctId *string `json:"analytics_distinct_id,omitempty"`
	AnalyticsInternal *bool `json:"analytics_internal,omitempty"`
	ApiBaseUrl *string `json:"api_base_url,omitempty"`
	ApiToken *string `json:"api_token,omitempty"`
	AppPromotion *map[string]any `json:"app_promotion,omitempty"`
	CommitAuthorEmail *string `json:"commit_author_email,omitempty"`
	Email *string `json:"email,omitempty"`
	EnabledFeatures *[]any `json:"enabled_features,omitempty"`
	GithubPrUserAuthorizationConnected *bool `json:"github_pr_user_authorization_connected,omitempty"`
	GithubPrUserAuthorizationLogin *any `json:"github_pr_user_authorization_login,omitempty"`
	GithubPrsAuthoredByChangeAuthor *bool `json:"github_prs_authored_by_change_author,omitempty"`
	Id string `json:"id"`
	Impersonation *any `json:"impersonation,omitempty"`
	Name *any `json:"name,omitempty"`
	NextPath *string `json:"next_path,omitempty"`
	Onboarding *map[string]any `json:"onboarding,omitempty"`
	OpenaiSignInConnected *bool `json:"openai_sign_in_connected,omitempty"`
	OpenaiSignInEnabled *bool `json:"openai_sign_in_enabled,omitempty"`
	Organizations *[]any `json:"organizations,omitempty"`
	PendingOrganizationInvitationCount *int `json:"pending_organization_invitation_count,omitempty"`
	PendingOrganizationInvitationCountLabel *string `json:"pending_organization_invitation_count_label,omitempty"`
	PictureUrl *any `json:"picture_url,omitempty"`
	Superadmin *bool `json:"superadmin,omitempty"`
	TimeZone *any `json:"time_zone,omitempty"`
}

// MeCreateData is the typed request payload for Me.CreateTyped.
type MeCreateData struct {
	ActionName *any `json:"action_name,omitempty"`
	Confirmation *any `json:"confirmation,omitempty"`
}

// MeUpdateData is the typed request payload for Me.UpdateTyped.
type MeUpdateData struct {
}

// MeRemoveMatch is the typed request payload for Me.RemoveTyped.
type MeRemoveMatch struct {
	ActiveOrganization *any `json:"active_organization,omitempty"`
	AnalyticsDistinctId *string `json:"analytics_distinct_id,omitempty"`
	AnalyticsInternal *bool `json:"analytics_internal,omitempty"`
	ApiBaseUrl *string `json:"api_base_url,omitempty"`
	ApiToken *string `json:"api_token,omitempty"`
	AppPromotion *map[string]any `json:"app_promotion,omitempty"`
	CommitAuthorEmail *string `json:"commit_author_email,omitempty"`
	Email *string `json:"email,omitempty"`
	EnabledFeatures *[]any `json:"enabled_features,omitempty"`
	GithubPrUserAuthorizationConnected *bool `json:"github_pr_user_authorization_connected,omitempty"`
	GithubPrUserAuthorizationLogin *any `json:"github_pr_user_authorization_login,omitempty"`
	GithubPrsAuthoredByChangeAuthor *bool `json:"github_prs_authored_by_change_author,omitempty"`
	Id string `json:"id"`
	Impersonation *any `json:"impersonation,omitempty"`
	Name *any `json:"name,omitempty"`
	NextPath *string `json:"next_path,omitempty"`
	Onboarding *map[string]any `json:"onboarding,omitempty"`
	OpenaiSignInConnected *bool `json:"openai_sign_in_connected,omitempty"`
	OpenaiSignInEnabled *bool `json:"openai_sign_in_enabled,omitempty"`
	Organizations *[]any `json:"organizations,omitempty"`
	PendingOrganizationInvitationCount *int `json:"pending_organization_invitation_count,omitempty"`
	PendingOrganizationInvitationCountLabel *string `json:"pending_organization_invitation_count_label,omitempty"`
	PictureUrl *any `json:"picture_url,omitempty"`
	Superadmin *bool `json:"superadmin,omitempty"`
	TimeZone *any `json:"time_zone,omitempty"`
}

// MeEmail is the typed data model for the me_email entity.
type MeEmail struct {
}

// MeEmailListMatch is the typed request payload for MeEmail.ListTyped.
type MeEmailListMatch struct {
	Account *bool `json:"account,omitempty"`
	CanDelete *bool `json:"can_delete,omitempty"`
	CanResendVerification *bool `json:"can_resend_verification,omitempty"`
	CanSetAccount *bool `json:"can_set_account,omitempty"`
	CanSetCommitAuthor *bool `json:"can_set_commit_author,omitempty"`
	CommitAuthor *bool `json:"commit_author,omitempty"`
	Email *string `json:"email,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	VerificationStatus *string `json:"verification_status,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// MeEmailCreateData is the typed request payload for MeEmail.CreateTyped.
type MeEmailCreateData struct {
	Email string `json:"email"`
}

// MeEmailUpdateData is the typed request payload for MeEmail.UpdateTyped.
type MeEmailUpdateData struct {
	Id string `json:"id"`
}

// MeEmailPatchData is the typed request payload for MeEmail.PatchTyped.
type MeEmailPatchData struct {
	Id string `json:"id"`
	Account *bool `json:"account,omitempty"`
	CommitAuthor *bool `json:"commit_author,omitempty"`
}

// MeEmailRemoveMatch is the typed request payload for MeEmail.RemoveTyped.
type MeEmailRemoveMatch struct {
	Id string `json:"id"`
}

// MeOnboarding is the typed data model for the me_onboarding entity.
type MeOnboarding struct {
}

// MeOnboardingCreateData is the typed request payload for MeOnboarding.CreateTyped.
type MeOnboardingCreateData struct {
	Step *any `json:"step,omitempty"`
}

// MediaFile is the typed data model for the media_file entity.
type MediaFile struct {
}

// MediaFileLoadMatch is the typed request payload for MediaFile.LoadTyped.
type MediaFileLoadMatch struct {
	BrowserSessionId string `json:"browser_session_id"`
	Id string `json:"id"`
	MediaId string `json:"media_id"`
	OrganizationId string `json:"organization_id"`
	Inline *bool `json:"inline,omitempty"`
}

// Member is the typed data model for the member entity.
type Member struct {
}

// MemberListMatch is the typed request payload for Member.ListTyped.
type MemberListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// MemberUpdateData is the typed request payload for Member.UpdateTyped.
type MemberUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Role *string `json:"role,omitempty"`
}

// MemberPatchData is the typed request payload for Member.PatchTyped.
type MemberPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Role *string `json:"role,omitempty"`
}

// MemberRemoveMatch is the typed request payload for Member.RemoveTyped.
type MemberRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// Memory is the typed data model for the memory entity.
type Memory struct {
}

// MemoryLoadMatch is the typed request payload for Memory.LoadTyped.
type MemoryLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// MemoryListMatch is the typed request payload for Memory.ListTyped.
type MemoryListMatch struct {
	OrganizationId string `json:"organization_id"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	IncludeEnvironment *bool `json:"include_environment,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Q *string `json:"q,omitempty"`
	Tag *string `json:"tag,omitempty"`
}

// MemoryCreateData is the typed request payload for Memory.CreateTyped.
type MemoryCreateData struct {
	OrganizationId string `json:"organization_id"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	Finding string `json:"finding"`
	ProjectId *string `json:"project_id,omitempty"`
	Response *string `json:"response,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Title string `json:"title"`
	Workaround *string `json:"workaround,omitempty"`
}

// MemoryRemoveMatch is the typed request payload for Memory.RemoveTyped.
type MemoryRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// MergeQueueEntry is the typed data model for the merge_queue_entry entity.
type MergeQueueEntry struct {
}

// MergeQueueEntryCreateData is the typed request payload for MergeQueueEntry.CreateTyped.
type MergeQueueEntryCreateData struct {
	MergeQueueId string `json:"merge_queue_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ChangeId *any `json:"change_id,omitempty"`
	ExpectedTargetCommitId *any `json:"expected_target_commit_id,omitempty"`
	ExpectedTargetVersion *any `json:"expected_target_version,omitempty"`
	ExpectedVersion int `json:"expected_version"`
	GithubPrNumber *any `json:"github_pr_number,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	Kind string `json:"kind"`
	Priority *string `json:"priority,omitempty"`
	WhenReady *any `json:"when_ready,omitempty"`
}

// MergeQueueEntryRemoveMatch is the typed request payload for MergeQueueEntry.RemoveTyped.
type MergeQueueEntryRemoveMatch struct {
	Id string `json:"id"`
	MergeQueueId string `json:"merge_queue_id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// MergeResolution is the typed data model for the merge_resolution entity.
type MergeResolution struct {
}

// MergeResolutionCreateData is the typed request payload for MergeResolution.CreateTyped.
type MergeResolutionCreateData struct {
	Base string `json:"base"`
	Context *map[string]any `json:"context,omitempty"`
	Ours string `json:"ours"`
	Path *string `json:"path,omitempty"`
	Theirs string `json:"theirs"`
}

// MessagingConversationMessage is the typed data model for the messaging_conversation_message entity.
type MessagingConversationMessage struct {
}

// MessagingConversationMessageCreateData is the typed request payload for MessagingConversationMessage.CreateTyped.
type MessagingConversationMessageCreateData struct {
	MessagingConversationId string `json:"messaging_conversation_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	ClientOperationId string `json:"client_operation_id"`
	Content string `json:"content"`
	Media *map[string]any `json:"media,omitempty"`
	MediaUploadIds *[]any `json:"media_upload_ids,omitempty"`
	ReplyTo *string `json:"reply_to,omitempty"`
	RetryAttachment *bool `json:"retry_attachment,omitempty"`
	SendStyle *any `json:"send_style,omitempty"`
}

// MessagingConversationUpload is the typed data model for the messaging_conversation_upload entity.
type MessagingConversationUpload struct {
}

// MessagingConversationUploadCreateData is the typed request payload for MessagingConversationUpload.CreateTyped.
type MessagingConversationUploadCreateData struct {
	MessagingConversationId string `json:"messaging_conversation_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// MetricQuery is the typed data model for the metric_query entity.
type MetricQuery struct {
}

// MetricQueryLoadMatch is the typed request payload for MetricQuery.LoadTyped.
type MetricQueryLoadMatch struct {
}

// MetronomeWebhook is the typed data model for the metronome_webhook entity.
type MetronomeWebhook struct {
}

// MetronomeWebhookCreateData is the typed request payload for MetronomeWebhook.CreateTyped.
type MetronomeWebhookCreateData struct {
}

// ModelSubscriptionAccount is the typed data model for the model_subscription_account entity.
type ModelSubscriptionAccount struct {
}

// ModelSubscriptionAccountListMatch is the typed request payload for ModelSubscriptionAccount.ListTyped.
type ModelSubscriptionAccountListMatch struct {
	Accounts *[]any `json:"accounts,omitempty"`
	Agents *[]any `json:"agents,omitempty"`
	CanDisconnect *bool `json:"can_disconnect,omitempty"`
	ConnectionAgent *any `json:"connection_agent,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Label *string `json:"label,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Saved *bool `json:"saved,omitempty"`
	Status *string `json:"status,omitempty"`
	Usable *bool `json:"usable,omitempty"`
}

// ModelSubscriptionAccountCreateData is the typed request payload for ModelSubscriptionAccount.CreateTyped.
type ModelSubscriptionAccountCreateData struct {
	Label string `json:"label"`
	ActionName *any `json:"action_name,omitempty"`
	AgentId *any `json:"agent_id,omitempty"`
	ProfileId *any `json:"profile_id,omitempty"`
	Token *any `json:"token,omitempty"`
}

// ModelSubscriptionAccountUpdateData is the typed request payload for ModelSubscriptionAccount.UpdateTyped.
type ModelSubscriptionAccountUpdateData struct {
	Id string `json:"id"`
}

// ModelSubscriptionAccountPatchData is the typed request payload for ModelSubscriptionAccount.PatchTyped.
type ModelSubscriptionAccountPatchData struct {
	Id string `json:"id"`
	Label *string `json:"label,omitempty"`
}

// ModelSubscriptionAccountRemoveMatch is the typed request payload for ModelSubscriptionAccount.RemoveTyped.
type ModelSubscriptionAccountRemoveMatch struct {
	Id string `json:"id"`
}

// ModelSubscriptionAccountConnection is the typed data model for the model_subscription_account_connection entity.
type ModelSubscriptionAccountConnection struct {
}

// ModelSubscriptionAccountConnectionLoadMatch is the typed request payload for ModelSubscriptionAccountConnection.LoadTyped.
type ModelSubscriptionAccountConnectionLoadMatch struct {
	Id string `json:"id"`
}

// ModelSubscriptionAccountConnectionUpdateData is the typed request payload for ModelSubscriptionAccountConnection.UpdateTyped.
type ModelSubscriptionAccountConnectionUpdateData struct {
	Id string `json:"id"`
	ActionName *any `json:"action_name,omitempty"`
	LoginId *any `json:"login_id,omitempty"`
	Method *any `json:"method,omitempty"`
	StepId *any `json:"step_id,omitempty"`
	Value *any `json:"value,omitempty"`
}

// NetworkConnection is the typed data model for the network_connection entity.
type NetworkConnection struct {
}

// NetworkConnectionCreateData is the typed request payload for NetworkConnection.CreateTyped.
type NetworkConnectionCreateData struct {
	OrganizationId string `json:"organization_id"`
	AwsClientVpnProfile *string `json:"aws_client_vpn_profile,omitempty"`
	DeviceTag *string `json:"device_tag,omitempty"`
	Name string `json:"name"`
	OauthClientId *string `json:"oauth_client_id,omitempty"`
	OauthClientSecret *string `json:"oauth_client_secret,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Status *string `json:"status,omitempty"`
}

// NetworkConnectionUpdateData is the typed request payload for NetworkConnection.UpdateTyped.
type NetworkConnectionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// NetworkConnectionPatchData is the typed request payload for NetworkConnection.PatchTyped.
type NetworkConnectionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AwsClientVpnProfile *string `json:"aws_client_vpn_profile,omitempty"`
	DeviceTag *string `json:"device_tag,omitempty"`
	Name *string `json:"name,omitempty"`
	OauthClientId *string `json:"oauth_client_id,omitempty"`
	OauthClientSecret *string `json:"oauth_client_secret,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Status *string `json:"status,omitempty"`
}

// NetworkingSpace is the typed data model for the networking_space entity.
type NetworkingSpace struct {
}

// NetworkingSpaceLoadMatch is the typed request payload for NetworkingSpace.LoadTyped.
type NetworkingSpaceLoadMatch struct {
	Id string `json:"id"`
}

// NetworkingSpaceCreateData is the typed request payload for NetworkingSpace.CreateTyped.
type NetworkingSpaceCreateData struct {
}

// NetworkingSpaceUpdateData is the typed request payload for NetworkingSpace.UpdateTyped.
type NetworkingSpaceUpdateData struct {
	Id string `json:"id"`
}

// NetworkingSpacePatchData is the typed request payload for NetworkingSpace.PatchTyped.
type NetworkingSpacePatchData struct {
	Id string `json:"id"`
}

// NetworkingSpaceRemoveMatch is the typed request payload for NetworkingSpace.RemoveTyped.
type NetworkingSpaceRemoveMatch struct {
	Id string `json:"id"`
}

// Node is the typed data model for the node entity.
type Node struct {
}

// NodeListMatch is the typed request payload for Node.ListTyped.
type NodeListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// NodeCertificate is the typed data model for the node_certificate entity.
type NodeCertificate struct {
}

// NodeCertificateCreateData is the typed request payload for NodeCertificate.CreateTyped.
type NodeCertificateCreateData struct {
	NodeId string `json:"node_id"`
}

// NodeLease is the typed data model for the node_lease entity.
type NodeLease struct {
}

// NodeLeaseLoadMatch is the typed request payload for NodeLease.LoadTyped.
type NodeLeaseLoadMatch struct {
	NodeId string `json:"node_id"`
}

// NodeLeaseCreateData is the typed request payload for NodeLease.CreateTyped.
type NodeLeaseCreateData struct {
	Id string `json:"id"`
	NodeId string `json:"node_id"`
}

// NomadAllocation is the typed data model for the nomad_allocation entity.
type NomadAllocation struct {
}

// NomadAllocationLoadMatch is the typed request payload for NomadAllocation.LoadTyped.
type NomadAllocationLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// NomadLog is the typed data model for the nomad_log entity.
type NomadLog struct {
}

// NomadLogLoadMatch is the typed request payload for NomadLog.LoadTyped.
type NomadLogLoadMatch struct {
	AppId string `json:"app_id"`
	Environment *string `json:"environment,omitempty"`
	Location *string `json:"location,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Origin *string `json:"origin,omitempty"`
	Service *string `json:"service,omitempty"`
	Task *string `json:"task,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Now is the typed data model for the now entity.
type Now struct {
}

// NowLoadMatch is the typed request payload for Now.LoadTyped.
type NowLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// ObservabilityClickhouseCluster is the typed data model for the observability_clickhouse_cluster entity.
type ObservabilityClickhouseCluster struct {
}

// ObservabilityClickhouseClusterLoadMatch is the typed request payload for ObservabilityClickhouseCluster.LoadTyped.
type ObservabilityClickhouseClusterLoadMatch struct {
	Id string `json:"id"`
}

// ObservabilityClickhouseClusterCreateData is the typed request payload for ObservabilityClickhouseCluster.CreateTyped.
type ObservabilityClickhouseClusterCreateData struct {
}

// ObservabilityClickhouseClusterUpdateData is the typed request payload for ObservabilityClickhouseCluster.UpdateTyped.
type ObservabilityClickhouseClusterUpdateData struct {
	Id string `json:"id"`
}

// ObservabilityClickhouseClusterPatchData is the typed request payload for ObservabilityClickhouseCluster.PatchTyped.
type ObservabilityClickhouseClusterPatchData struct {
	Id string `json:"id"`
}

// ObservabilityClickhouseClusterRemoveMatch is the typed request payload for ObservabilityClickhouseCluster.RemoveTyped.
type ObservabilityClickhouseClusterRemoveMatch struct {
	Id string `json:"id"`
}

// ObservabilityQuickwitCluster is the typed data model for the observability_quickwit_cluster entity.
type ObservabilityQuickwitCluster struct {
}

// ObservabilityQuickwitClusterLoadMatch is the typed request payload for ObservabilityQuickwitCluster.LoadTyped.
type ObservabilityQuickwitClusterLoadMatch struct {
	Id string `json:"id"`
}

// ObservabilityQuickwitClusterCreateData is the typed request payload for ObservabilityQuickwitCluster.CreateTyped.
type ObservabilityQuickwitClusterCreateData struct {
}

// ObservabilityQuickwitClusterUpdateData is the typed request payload for ObservabilityQuickwitCluster.UpdateTyped.
type ObservabilityQuickwitClusterUpdateData struct {
	Id string `json:"id"`
}

// ObservabilityQuickwitClusterPatchData is the typed request payload for ObservabilityQuickwitCluster.PatchTyped.
type ObservabilityQuickwitClusterPatchData struct {
	Id string `json:"id"`
}

// ObservabilityQuickwitClusterRemoveMatch is the typed request payload for ObservabilityQuickwitCluster.RemoveTyped.
type ObservabilityQuickwitClusterRemoveMatch struct {
	Id string `json:"id"`
}

// ObservabilitySpace is the typed data model for the observability_space entity.
type ObservabilitySpace struct {
}

// ObservabilitySpaceLoadMatch is the typed request payload for ObservabilitySpace.LoadTyped.
type ObservabilitySpaceLoadMatch struct {
	Id string `json:"id"`
}

// ObservabilitySpaceCreateData is the typed request payload for ObservabilitySpace.CreateTyped.
type ObservabilitySpaceCreateData struct {
}

// ObservabilitySpaceUpdateData is the typed request payload for ObservabilitySpace.UpdateTyped.
type ObservabilitySpaceUpdateData struct {
	Id string `json:"id"`
}

// ObservabilitySpacePatchData is the typed request payload for ObservabilitySpace.PatchTyped.
type ObservabilitySpacePatchData struct {
	Id string `json:"id"`
}

// ObservabilitySpaceRemoveMatch is the typed request payload for ObservabilitySpace.RemoveTyped.
type ObservabilitySpaceRemoveMatch struct {
	Id string `json:"id"`
}

// Openapi is the typed data model for the openapi entity.
type Openapi struct {
}

// OpenapiLoadMatch is the typed request payload for Openapi.LoadTyped.
type OpenapiLoadMatch struct {
}

// OrgInvitation is the typed data model for the org_invitation entity.
type OrgInvitation struct {
}

// OrgInvitationLoadMatch is the typed request payload for OrgInvitation.LoadTyped.
type OrgInvitationLoadMatch struct {
	Id string `json:"id"`
}

// OrgInvitationCreateData is the typed request payload for OrgInvitation.CreateTyped.
type OrgInvitationCreateData struct {
	Id string `json:"id"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Id string `json:"id"`
}

// OrganizationListMatch is the typed request payload for Organization.ListTyped.
type OrganizationListMatch struct {
	ActivatedProducts *[]any `json:"activated_products,omitempty"`
	AgentsOnly *bool `json:"agents_only,omitempty"`
	CanActivateProducts *bool `json:"can_activate_products,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CreatedAtLabel *any `json:"created_at_label,omitempty"`
	GithubPrsAuthoredByChangeAuthor *bool `json:"github_prs_authored_by_change_author,omitempty"`
	GoogleWorkspaceDomain *any `json:"google_workspace_domain,omitempty"`
	Id *string `json:"id,omitempty"`
	LogoUrl *any `json:"logo_url,omitempty"`
	MemberCount *int `json:"member_count,omitempty"`
	Name *string `json:"name,omitempty"`
	PendingInvitationCount *int `json:"pending_invitation_count,omitempty"`
	Personal *bool `json:"personal,omitempty"`
	RepositoryCount *int `json:"repository_count,omitempty"`
	Role *any `json:"role,omitempty"`
	SandboxRegion *string `json:"sandbox_region,omitempty"`
	SharedAgentPersonalAccountsEnabled *bool `json:"shared_agent_personal_accounts_enabled,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourceControlProviders *[]any `json:"source_control_providers,omitempty"`
	SourceUiEnabled *bool `json:"source_ui_enabled,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UpdatedAtLabel *any `json:"updated_at_label,omitempty"`
	VerifyPrScenarioWritingEnabled *bool `json:"verify_pr_scenario_writing_enabled,omitempty"`
}

// OrganizationCreateData is the typed request payload for Organization.CreateTyped.
type OrganizationCreateData struct {
	Name string `json:"name"`
	Slug string `json:"slug"`
	Timezone *string `json:"timezone,omitempty"`
}

// OrganizationUpdateData is the typed request payload for Organization.UpdateTyped.
type OrganizationUpdateData struct {
	Id string `json:"id"`
	GithubPrsAuthoredByChangeAuthor *bool `json:"github_prs_authored_by_change_author,omitempty"`
	GoogleWorkspaceDomain *any `json:"google_workspace_domain,omitempty"`
	Name *string `json:"name,omitempty"`
	SandboxRegion *string `json:"sandbox_region,omitempty"`
	SharedAgentPersonalAccountsEnabled *bool `json:"shared_agent_personal_accounts_enabled,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	VerifyPrScenarioWritingEnabled *bool `json:"verify_pr_scenario_writing_enabled,omitempty"`
}

// OrganizationPatchData is the typed request payload for Organization.PatchTyped.
type OrganizationPatchData struct {
	Id string `json:"id"`
	GithubPrsAuthoredByChangeAuthor *bool `json:"github_prs_authored_by_change_author,omitempty"`
	GoogleWorkspaceDomain *any `json:"google_workspace_domain,omitempty"`
	Name *string `json:"name,omitempty"`
	SandboxRegion *string `json:"sandbox_region,omitempty"`
	SharedAgentPersonalAccountsEnabled *bool `json:"shared_agent_personal_accounts_enabled,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	VerifyPrScenarioWritingEnabled *bool `json:"verify_pr_scenario_writing_enabled,omitempty"`
}

// OrganizationApp is the typed data model for the organization_app entity.
type OrganizationApp struct {
}

// OrganizationAppLoadMatch is the typed request payload for OrganizationApp.LoadTyped.
type OrganizationAppLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Context *bool `json:"context,omitempty"`
	Installed *bool `json:"installed,omitempty"`
	NativeAgentId string `json:"native_agent_id"`
}

// OrganizationAppUpdateData is the typed request payload for OrganizationApp.UpdateTyped.
type OrganizationAppUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationAppRemoveMatch is the typed request payload for OrganizationApp.RemoveTyped.
type OrganizationAppRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationControl is the typed data model for the organization_control entity.
type OrganizationControl struct {
}

// OrganizationControlCreateData is the typed request payload for OrganizationControl.CreateTyped.
type OrganizationControlCreateData struct {
	OrganizationId string `json:"organization_id"`
	DeviceId *any `json:"device_id,omitempty"`
	NativeDeviceId *any `json:"native_device_id,omitempty"`
	PairingGeneration *any `json:"pairing_generation,omitempty"`
}

// OrganizationDevice is the typed data model for the organization_device entity.
type OrganizationDevice struct {
}

// OrganizationDeviceCreateData is the typed request payload for OrganizationDevice.CreateTyped.
type OrganizationDeviceCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Payload *any `json:"payload,omitempty"`
	Signature *any `json:"signature,omitempty"`
}

// OrganizationIdentityCertificate is the typed data model for the organization_identity_certificate entity.
type OrganizationIdentityCertificate struct {
}

// OrganizationIdentityCertificateLoadMatch is the typed request payload for OrganizationIdentityCertificate.LoadTyped.
type OrganizationIdentityCertificateLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationIdentityCertificateCreateData is the typed request payload for OrganizationIdentityCertificate.CreateTyped.
type OrganizationIdentityCertificateCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationIdentityCertificateUpdateData is the typed request payload for OrganizationIdentityCertificate.UpdateTyped.
type OrganizationIdentityCertificateUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationIdentityCertificatePatchData is the typed request payload for OrganizationIdentityCertificate.PatchTyped.
type OrganizationIdentityCertificatePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationIdentityCertificateRemoveMatch is the typed request payload for OrganizationIdentityCertificate.RemoveTyped.
type OrganizationIdentityCertificateRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationInteraction is the typed data model for the organization_interaction entity.
type OrganizationInteraction struct {
}

// OrganizationInteractionCreateData is the typed request payload for OrganizationInteraction.CreateTyped.
type OrganizationInteractionCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationInvitation is the typed data model for the organization_invitation entity.
type OrganizationInvitation struct {
}

// OrganizationInvitationCreateData is the typed request payload for OrganizationInvitation.CreateTyped.
type OrganizationInvitationCreateData struct {
	OrganizationId string `json:"organization_id"`
	Email string `json:"email"`
	Role string `json:"role"`
}

// OrganizationInvitationRemoveMatch is the typed request payload for OrganizationInvitation.RemoveTyped.
type OrganizationInvitationRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationMessageFile is the typed data model for the organization_message_file entity.
type OrganizationMessageFile struct {
}

// OrganizationMessageFileCreateData is the typed request payload for OrganizationMessageFile.CreateTyped.
type OrganizationMessageFileCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationOidcTrust is the typed data model for the organization_oidc_trust entity.
type OrganizationOidcTrust struct {
}

// OrganizationOidcTrustLoadMatch is the typed request payload for OrganizationOidcTrust.LoadTyped.
type OrganizationOidcTrustLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationOidcTrustCreateData is the typed request payload for OrganizationOidcTrust.CreateTyped.
type OrganizationOidcTrustCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationOidcTrustUpdateData is the typed request payload for OrganizationOidcTrust.UpdateTyped.
type OrganizationOidcTrustUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationOidcTrustPatchData is the typed request payload for OrganizationOidcTrust.PatchTyped.
type OrganizationOidcTrustPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationOidcTrustRemoveMatch is the typed request payload for OrganizationOidcTrust.RemoveTyped.
type OrganizationOidcTrustRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationRunEvent is the typed data model for the organization_run_event entity.
type OrganizationRunEvent struct {
}

// OrganizationRunEventCreateData is the typed request payload for OrganizationRunEvent.CreateTyped.
type OrganizationRunEventCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationRunOutcome is the typed data model for the organization_run_outcome entity.
type OrganizationRunOutcome struct {
}

// OrganizationRunOutcomeCreateData is the typed request payload for OrganizationRunOutcome.CreateTyped.
type OrganizationRunOutcomeCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationRunUsage is the typed data model for the organization_run_usage entity.
type OrganizationRunUsage struct {
}

// OrganizationRunUsageCreateData is the typed request payload for OrganizationRunUsage.CreateTyped.
type OrganizationRunUsageCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationSandbox is the typed data model for the organization_sandbox entity.
type OrganizationSandbox struct {
}

// OrganizationSandboxCreateData is the typed request payload for OrganizationSandbox.CreateTyped.
type OrganizationSandboxCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecret is the typed data model for the organization_secret entity.
type OrganizationSecret struct {
}

// OrganizationSecretLoadMatch is the typed request payload for OrganizationSecret.LoadTyped.
type OrganizationSecretLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecretListMatch is the typed request payload for OrganizationSecret.ListTyped.
type OrganizationSecretListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecretCreateData is the typed request payload for OrganizationSecret.CreateTyped.
type OrganizationSecretCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecretUpdateData is the typed request payload for OrganizationSecret.UpdateTyped.
type OrganizationSecretUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecretPatchData is the typed request payload for OrganizationSecret.PatchTyped.
type OrganizationSecretPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSecretRemoveMatch is the typed request payload for OrganizationSecret.RemoveTyped.
type OrganizationSecretRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationServiceAccount is the typed data model for the organization_service_account entity.
type OrganizationServiceAccount struct {
}

// OrganizationServiceAccountLoadMatch is the typed request payload for OrganizationServiceAccount.LoadTyped.
type OrganizationServiceAccountLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationServiceAccountCreateData is the typed request payload for OrganizationServiceAccount.CreateTyped.
type OrganizationServiceAccountCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationServiceAccountUpdateData is the typed request payload for OrganizationServiceAccount.UpdateTyped.
type OrganizationServiceAccountUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationServiceAccountPatchData is the typed request payload for OrganizationServiceAccount.PatchTyped.
type OrganizationServiceAccountPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationServiceAccountRemoveMatch is the typed request payload for OrganizationServiceAccount.RemoveTyped.
type OrganizationServiceAccountRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSetting is the typed data model for the organization_setting entity.
type OrganizationSetting struct {
}

// OrganizationSettingUpdateData is the typed request payload for OrganizationSetting.UpdateTyped.
type OrganizationSettingUpdateData struct {
	OrganizationId string `json:"organization_id"`
	ConcurrentRunLimitOverride *any `json:"concurrent_run_limit_override,omitempty"`
	CustomizeOnboardingPackages *bool `json:"customize_onboarding_packages,omitempty"`
	DailyRunLimitOverride *any `json:"daily_run_limit_override,omitempty"`
	DeploymentUsageVisibility *string `json:"deployment_usage_visibility,omitempty"`
	MonthlyBrowserMinutesLimitOverride *any `json:"monthly_browser_minutes_limit_override,omitempty"`
	MonthlyBudgetDollars *any `json:"monthly_budget_dollars,omitempty"`
	Name *string `json:"name,omitempty"`
	OnboardingCustomPricing *bool `json:"onboarding_custom_pricing,omitempty"`
	OnboardingPackageKeys *[]any `json:"onboarding_package_keys,omitempty"`
}

// OrganizationSite is the typed data model for the organization_site entity.
type OrganizationSite struct {
}

// OrganizationSiteLoadMatch is the typed request payload for OrganizationSite.LoadTyped.
type OrganizationSiteLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	NativeAgentId string `json:"native_agent_id"`
}

// OrganizationSiteCreateData is the typed request payload for OrganizationSite.CreateTyped.
type OrganizationSiteCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationSiteUpdateData is the typed request payload for OrganizationSite.UpdateTyped.
type OrganizationSiteUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSiteRemoveMatch is the typed request payload for OrganizationSite.RemoveTyped.
type OrganizationSiteRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationSubscription is the typed data model for the organization_subscription entity.
type OrganizationSubscription struct {
}

// OrganizationSubscriptionCreateData is the typed request payload for OrganizationSubscription.CreateTyped.
type OrganizationSubscriptionCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationTool is the typed data model for the organization_tool entity.
type OrganizationTool struct {
}

// OrganizationToolCreateData is the typed request payload for OrganizationTool.CreateTyped.
type OrganizationToolCreateData struct {
	OrganizationId string `json:"organization_id"`
	Arguments map[string]any `json:"arguments"`
	NativeAgentId string `json:"native_agent_id"`
	Tool string `json:"tool"`
}

// OrganizationWorkloadIdentity is the typed data model for the organization_workload_identity entity.
type OrganizationWorkloadIdentity struct {
}

// OrganizationWorkloadIdentityLoadMatch is the typed request payload for OrganizationWorkloadIdentity.LoadTyped.
type OrganizationWorkloadIdentityLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationWorkloadIdentityCreateData is the typed request payload for OrganizationWorkloadIdentity.CreateTyped.
type OrganizationWorkloadIdentityCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// OrganizationWorkloadIdentityUpdateData is the typed request payload for OrganizationWorkloadIdentity.UpdateTyped.
type OrganizationWorkloadIdentityUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationWorkloadIdentityPatchData is the typed request payload for OrganizationWorkloadIdentity.PatchTyped.
type OrganizationWorkloadIdentityPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OrganizationWorkloadIdentityRemoveMatch is the typed request payload for OrganizationWorkloadIdentity.RemoveTyped.
type OrganizationWorkloadIdentityRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// OtelIngest is the typed data model for the otel_ingest entity.
type OtelIngest struct {
}

// OtelIngestCreateData is the typed request payload for OtelIngest.CreateTyped.
type OtelIngestCreateData struct {
}

// Page is the typed data model for the page entity.
type Page struct {
}

// PageLoadMatch is the typed request payload for Page.LoadTyped.
type PageLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Query *string `json:"query,omitempty"`
	Section *string `json:"section,omitempty"`
	Status *string `json:"status,omitempty"`
	VerifyEnvironmentId *string `json:"verify_environment_id,omitempty"`
}

// PageAgent is the typed data model for the page_agent entity.
type PageAgent struct {
}

// PageAgentLoadMatch is the typed request payload for PageAgent.LoadTyped.
type PageAgentLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Agent *string `json:"agent,omitempty"`
	AgentSearch *string `json:"agent_search,omitempty"`
	AgentVisibility *string `json:"agent_visibility,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	IntegrationSearch *string `json:"integration_search,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// PageAgentCreateData is the typed request payload for PageAgent.CreateTyped.
type PageAgentCreateData struct {
	OrganizationId string `json:"organization_id"`
	AgentIds *any `json:"agent_ids,omitempty"`
}

// PageArtefact is the typed data model for the page_artefact entity.
type PageArtefact struct {
}

// PageArtefactLoadMatch is the typed request payload for PageArtefact.LoadTyped.
type PageArtefactLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	File *string `json:"file,omitempty"`
	Version *int `json:"version,omitempty"`
	VersionsPage *int `json:"versions_page,omitempty"`
}

// PageArtefactListMatch is the typed request payload for PageArtefact.ListTyped.
type PageArtefactListMatch struct {
	OrganizationId string `json:"organization_id"`
	Author *string `json:"author,omitempty"`
	Harness *string `json:"harness,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Model *string `json:"model,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Repo *string `json:"repo,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Source *string `json:"source,omitempty"`
}

// PageCiPipelineRun is the typed data model for the page_ci_pipeline_run entity.
type PageCiPipelineRun struct {
}

// PageCiPipelineRunLoadMatch is the typed request payload for PageCiPipelineRun.LoadTyped.
type PageCiPipelineRunLoadMatch struct {
	Id string `json:"id"`
	PipelineId string `json:"pipeline_id"`
}

// PageProjectRun is the typed data model for the page_project_run entity.
type PageProjectRun struct {
}

// PageProjectRunLoadMatch is the typed request payload for PageProjectRun.LoadTyped.
type PageProjectRunLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Browser *string `json:"browser,omitempty"`
	Detail *bool `json:"detail,omitempty"`
	Page *int `json:"page,omitempty"`
}

// PageRepoVcCommit is the typed data model for the page_repo_vc_commit entity.
type PageRepoVcCommit struct {
}

// PageRepoVcCommitLoadMatch is the typed request payload for PageRepoVcCommit.LoadTyped.
type PageRepoVcCommitLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Parent *string `json:"parent,omitempty"`
}

// PagesBilling is the typed data model for the pages_billing entity.
type PagesBilling struct {
}

// PagesBillingLoadMatch is the typed request payload for PagesBilling.LoadTyped.
type PagesBillingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// PagesGithubIntegration is the typed data model for the pages_github_integration entity.
type PagesGithubIntegration struct {
}

// PagesGithubIntegrationLoadMatch is the typed request payload for PagesGithubIntegration.LoadTyped.
type PagesGithubIntegrationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// PagesGithubIntegrationListMatch is the typed request payload for PagesGithubIntegration.ListTyped.
type PagesGithubIntegrationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// PagesGithubOnboarding is the typed data model for the pages_github_onboarding entity.
type PagesGithubOnboarding struct {
}

// PagesGithubOnboardingLoadMatch is the typed request payload for PagesGithubOnboarding.LoadTyped.
type PagesGithubOnboardingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	GithubAppInstallationId *string `json:"github_app_installation_id,omitempty"`
	GithubImportBatchId *string `json:"github_import_batch_id,omitempty"`
}

// PagesMember is the typed data model for the pages_member entity.
type PagesMember struct {
}

// PagesMemberListMatch is the typed request payload for PagesMember.ListTyped.
type PagesMemberListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// PagesProjectCredential is the typed data model for the pages_project_credential entity.
type PagesProjectCredential struct {
}

// PagesProjectCredentialListMatch is the typed request payload for PagesProjectCredential.ListTyped.
type PagesProjectCredentialListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// PagesProjectPersona is the typed data model for the pages_project_persona entity.
type PagesProjectPersona struct {
}

// PagesProjectPersonaListMatch is the typed request payload for PagesProjectPersona.ListTyped.
type PagesProjectPersonaListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// PagesProjectRun is the typed data model for the pages_project_run entity.
type PagesProjectRun struct {
}

// PagesProjectRunListMatch is the typed request payload for PagesProjectRun.ListTyped.
type PagesProjectRunListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	EnvironmentQuery *string `json:"environment_query,omitempty"`
	Page *int `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	Status *string `json:"status,omitempty"`
	Trigger *string `json:"trigger,omitempty"`
}

// PagesProjectScenario is the typed data model for the pages_project_scenario entity.
type PagesProjectScenario struct {
}

// PagesProjectScenarioListMatch is the typed request payload for PagesProjectScenario.ListTyped.
type PagesProjectScenarioListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Limit *int `json:"limit,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// PagesRegistry is the typed data model for the pages_registry entity.
type PagesRegistry struct {
}

// PagesRegistryLoadMatch is the typed request payload for PagesRegistry.LoadTyped.
type PagesRegistryLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// PagesSession is the typed data model for the pages_session entity.
type PagesSession struct {
}

// PagesSessionLoadMatch is the typed request payload for PagesSession.LoadTyped.
type PagesSessionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AroundEvent *int `json:"around_event,omitempty"`
	Checkpoint *string `json:"checkpoint,omitempty"`
	EventDigest *string `json:"event_digest,omitempty"`
}

// PagesSessionListMatch is the typed request payload for PagesSession.ListTyped.
type PagesSessionListMatch struct {
	OrganizationId string `json:"organization_id"`
	Adapter *string `json:"adapter,omitempty"`
	From *string `json:"from,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Repo *string `json:"repo,omitempty"`
	Session *string `json:"session,omitempty"`
	Status *string `json:"status,omitempty"`
	To *string `json:"to,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// PagesSessionCreateData is the typed request payload for PagesSession.CreateTyped.
type PagesSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	Adapter *string `json:"adapter,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	From *string `json:"from,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MaxBytes *int `json:"max_bytes,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Query *string `json:"query,omitempty"`
	Repo *string `json:"repo,omitempty"`
	Status *string `json:"status,omitempty"`
	To *string `json:"to,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// Pairing is the typed data model for the pairing entity.
type Pairing struct {
}

// PairingLoadMatch is the typed request payload for Pairing.LoadTyped.
type PairingLoadMatch struct {
	Id string `json:"id"`
}

// PairingCreateData is the typed request payload for Pairing.CreateTyped.
type PairingCreateData struct {
}

// PairingEvent is the typed data model for the pairing_event entity.
type PairingEvent struct {
}

// PairingEventLoadMatch is the typed request payload for PairingEvent.LoadTyped.
type PairingEventLoadMatch struct {
	PairingId string `json:"pairing_id"`
}

// ParallelV1 is the typed data model for the parallel_v1 entity.
type ParallelV1 struct {
}

// ParallelV1CreateData is the typed request payload for ParallelV1.CreateTyped.
type ParallelV1CreateData struct {
	OrganizationId string `json:"organization_id"`
}

// PatchsetDiff is the typed data model for the patchset_diff entity.
type PatchsetDiff struct {
}

// PatchsetDiffLoadMatch is the typed request payload for PatchsetDiff.LoadTyped.
type PatchsetDiffLoadMatch struct {
	ChangeId string `json:"change_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	PatchsetId string `json:"patchset_id"`
	RepoId string `json:"repo_id"`
}

// PersonalAccessToken is the typed data model for the personal_access_token entity.
type PersonalAccessToken struct {
}

// PersonalAccessTokenLoadMatch is the typed request payload for PersonalAccessToken.LoadTyped.
type PersonalAccessTokenLoadMatch struct {
	Id string `json:"id"`
}

// PersonalAccessTokenCreateData is the typed request payload for PersonalAccessToken.CreateTyped.
type PersonalAccessTokenCreateData struct {
}

// PersonalAccessTokenRemoveMatch is the typed request payload for PersonalAccessToken.RemoveTyped.
type PersonalAccessTokenRemoveMatch struct {
	Id string `json:"id"`
}

// PreviewOperation is the typed data model for the preview_operation entity.
type PreviewOperation struct {
}

// PreviewOperationLoadMatch is the typed request payload for PreviewOperation.LoadTyped.
type PreviewOperationLoadMatch struct {
	AppId string `json:"app_id"`
	PreviewId string `json:"preview_id"`
}

// PreviewProfileSecretBinding is the typed data model for the preview_profile_secret_binding entity.
type PreviewProfileSecretBinding struct {
}

// PreviewProfileSecretBindingLoadMatch is the typed request payload for PreviewProfileSecretBinding.LoadTyped.
type PreviewProfileSecretBindingLoadMatch struct {
	AppId string `json:"app_id"`
	PreviewProfileId string `json:"preview_profile_id"`
}

// PreviewProfileSecretBindingCreateData is the typed request payload for PreviewProfileSecretBinding.CreateTyped.
type PreviewProfileSecretBindingCreateData struct {
	AppId string `json:"app_id"`
	PreviewProfileId string `json:"preview_profile_id"`
	EnvKey string `json:"env_key"`
	Mode *string `json:"mode,omitempty"`
	SecretId *string `json:"secret_id,omitempty"`
	SecretVersionId *string `json:"secret_version_id,omitempty"`
}

// PreviewProfileSecretBindingRemoveMatch is the typed request payload for PreviewProfileSecretBinding.RemoveTyped.
type PreviewProfileSecretBindingRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	PreviewProfileId string `json:"preview_profile_id"`
}

// PreviewSecret is the typed data model for the preview_secret entity.
type PreviewSecret struct {
}

// PreviewSecretCreateData is the typed request payload for PreviewSecret.CreateTyped.
type PreviewSecretCreateData struct {
	AppId string `json:"app_id"`
	PreviewId string `json:"preview_id"`
	EnvKey string `json:"env_key"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	Value string `json:"value"`
}

// PreviewSecretRemoveMatch is the typed request payload for PreviewSecret.RemoveTyped.
type PreviewSecretRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	PreviewId string `json:"preview_id"`
}

// PreviewSharingApproval is the typed data model for the preview_sharing_approval entity.
type PreviewSharingApproval struct {
}

// PreviewSharingApprovalLoadMatch is the typed request payload for PreviewSharingApproval.LoadTyped.
type PreviewSharingApprovalLoadMatch struct {
	AppId string `json:"app_id"`
	PreviewId string `json:"preview_id"`
}

// PreviewSharingApprovalCreateData is the typed request payload for PreviewSharingApproval.CreateTyped.
type PreviewSharingApprovalCreateData struct {
	AppId string `json:"app_id"`
	PreviewId string `json:"preview_id"`
	BuildKeys *[]any `json:"build_keys,omitempty"`
	BuildSecrets *[]any `json:"build_secrets,omitempty"`
	DefaultConfiguration *[]any `json:"default_configuration,omitempty"`
	DefaultSecrets *[]any `json:"default_secrets,omitempty"`
	SnapshotVersion int `json:"snapshot_version"`
	SourceKeys *[]any `json:"source_keys,omitempty"`
}

// ProactiveAgentWaitlistEntry is the typed data model for the proactive_agent_waitlist_entry entity.
type ProactiveAgentWaitlistEntry struct {
}

// ProactiveAgentWaitlistEntryLoadMatch is the typed request payload for ProactiveAgentWaitlistEntry.LoadTyped.
type ProactiveAgentWaitlistEntryLoadMatch struct {
	Id string `json:"id"`
}

// ProactiveAgentWaitlistEntryCreateData is the typed request payload for ProactiveAgentWaitlistEntry.CreateTyped.
type ProactiveAgentWaitlistEntryCreateData struct {
	Email string `json:"email"`
	FirstTask *any `json:"first_task,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	Website *any `json:"website,omitempty"`
}

// Product is the typed data model for the product entity.
type Product struct {
}

// ProductCreateData is the typed request payload for Product.CreateTyped.
type ProductCreateData struct {
	OrganizationId string `json:"organization_id"`
	Product string `json:"product"`
}

// ProductMapIdentityDecision is the typed data model for the product_map_identity_decision entity.
type ProductMapIdentityDecision struct {
}

// ProductMapIdentityDecisionCreateData is the typed request payload for ProductMapIdentityDecision.CreateTyped.
type ProductMapIdentityDecisionCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Observations []any `json:"observations"`
	Operation string `json:"operation"`
	Reason string `json:"reason"`
	Target *map[string]any `json:"target,omitempty"`
}

// ProductMapJourney is the typed data model for the product_map_journey entity.
type ProductMapJourney struct {
}

// ProductMapJourneyLoadMatch is the typed request payload for ProductMapJourney.LoadTyped.
type ProductMapJourneyLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	After *string `json:"after,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	IncludeTree *bool `json:"include_tree,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
	VariantId *string `json:"variant_id,omitempty"`
}

// ProductMapJourneyListMatch is the typed request payload for ProductMapJourney.ListTyped.
type ProductMapJourneyListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	After *string `json:"after,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	IncludeCoverage *bool `json:"include_coverage,omitempty"`
	JourneyQuery *string `json:"journey_query,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
}

// ProductMapJourneyReplay is the typed data model for the product_map_journey_replay entity.
type ProductMapJourneyReplay struct {
}

// ProductMapJourneyReplayLoadMatch is the typed request payload for ProductMapJourneyReplay.LoadTyped.
type ProductMapJourneyReplayLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProductMapJourneyReplayCreateData is the typed request payload for ProductMapJourneyReplay.CreateTyped.
type ProductMapJourneyReplayCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProductMapObservation is the typed data model for the product_map_observation entity.
type ProductMapObservation struct {
}

// ProductMapObservationLoadMatch is the typed request payload for ProductMapObservation.LoadTyped.
type ProductMapObservationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
}

// ProductMapQuestion is the typed data model for the product_map_question entity.
type ProductMapQuestion struct {
}

// ProductMapQuestionCreateData is the typed request payload for ProductMapQuestion.CreateTyped.
type ProductMapQuestionCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	Question string `json:"question"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
	StateId *string `json:"state_id,omitempty"`
}

// ProductMapState is the typed data model for the product_map_state entity.
type ProductMapState struct {
}

// ProductMapStateLoadMatch is the typed request payload for ProductMapState.LoadTyped.
type ProductMapStateLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	IncludeConnection *bool `json:"include_connection,omitempty"`
	ObservationId *string `json:"observation_id,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
}

// ProductMapStateListMatch is the typed request payload for ProductMapState.ListTyped.
type ProductMapStateListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	After *string `json:"after,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
}

// Project is the typed data model for the project entity.
type Project struct {
}

// ProjectLoadMatch is the typed request payload for Project.LoadTyped.
type ProjectLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Overview *bool `json:"overview,omitempty"`
	Page *int `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	ScenarioId *string `json:"scenario_id,omitempty"`
	Status *string `json:"status,omitempty"`
	VerifyEnvironmentId *string `json:"verify_environment_id,omitempty"`
	View *string `json:"view,omitempty"`
}

// ProjectListMatch is the typed request payload for Project.ListTyped.
type ProjectListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ProjectCreateData is the typed request payload for Project.CreateTyped.
type ProjectCreateData struct {
	OrganizationId string `json:"organization_id"`
	Context *any `json:"context,omitempty"`
	DocumentationUrls *[]any `json:"documentation_urls,omitempty"`
	ExecutionMode *string `json:"execution_mode,omitempty"`
	Name string `json:"name"`
	Purpose *any `json:"purpose,omitempty"`
	Slug *string `json:"slug,omitempty"`
	VerifierPreferences *map[string]any `json:"verifier_preferences,omitempty"`
	WebsiteUrl *any `json:"website_url,omitempty"`
}

// ProjectUpdateData is the typed request payload for Project.UpdateTyped.
type ProjectUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Context *any `json:"context,omitempty"`
	DocumentationUrls *[]any `json:"documentation_urls,omitempty"`
	ExecutionMode *string `json:"execution_mode,omitempty"`
	Name *string `json:"name,omitempty"`
	Purpose *any `json:"purpose,omitempty"`
	Slug *string `json:"slug,omitempty"`
	VerifierPreferences *map[string]any `json:"verifier_preferences,omitempty"`
	Version *int `json:"version,omitempty"`
	WebsiteUrl *any `json:"website_url,omitempty"`
}

// ProjectPatchData is the typed request payload for Project.PatchTyped.
type ProjectPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Context *any `json:"context,omitempty"`
	DocumentationUrls *[]any `json:"documentation_urls,omitempty"`
	ExecutionMode *string `json:"execution_mode,omitempty"`
	Name *string `json:"name,omitempty"`
	Purpose *any `json:"purpose,omitempty"`
	Slug *string `json:"slug,omitempty"`
	VerifierPreferences *map[string]any `json:"verifier_preferences,omitempty"`
	Version *int `json:"version,omitempty"`
	WebsiteUrl *any `json:"website_url,omitempty"`
}

// ProjectAndroidApk is the typed data model for the project_android_apk entity.
type ProjectAndroidApk struct {
}

// ProjectAndroidApkCreateData is the typed request payload for ProjectAndroidApk.CreateTyped.
type ProjectAndroidApkCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectCodeMap is the typed data model for the project_code_map entity.
type ProjectCodeMap struct {
}

// ProjectCodeMapListMatch is the typed request payload for ProjectCodeMap.ListTyped.
type ProjectCodeMapListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Ref *string `json:"ref,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// ProjectCodeMapCreateData is the typed request payload for ProjectCodeMap.CreateTyped.
type ProjectCodeMapCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Ref *string `json:"ref,omitempty"`
	RepositoryId string `json:"repository_id"`
}

// ProjectEnvironment is the typed data model for the project_environment entity.
type ProjectEnvironment struct {
}

// ProjectEnvironmentLoadMatch is the typed request payload for ProjectEnvironment.LoadTyped.
type ProjectEnvironmentLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectEnvironmentListMatch is the typed request payload for ProjectEnvironment.ListTyped.
type ProjectEnvironmentListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectEnvironmentCreateData is the typed request payload for ProjectEnvironment.CreateTyped.
type ProjectEnvironmentCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	AllowedOrigins *[]any `json:"allowed_origins,omitempty"`
	BaseUrl *any `json:"base_url,omitempty"`
	Binary *string `json:"binary,omitempty"`
	Desktop *any `json:"desktop,omitempty"`
	ImessageNumber *any `json:"imessage_number,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MessagingTesterNumber *any `json:"messaging_tester_number,omitempty"`
	Name string `json:"name"`
}

// ProjectEnvironmentUpdateData is the typed request payload for ProjectEnvironment.UpdateTyped.
type ProjectEnvironmentUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	AllowedOrigins *[]any `json:"allowed_origins,omitempty"`
	BaseUrl *any `json:"base_url,omitempty"`
	Binary *string `json:"binary,omitempty"`
	ImessageNumber *any `json:"imessage_number,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MessagingTesterNumber *any `json:"messaging_tester_number,omitempty"`
	Name *string `json:"name,omitempty"`
	VerifyNetworkConnectionId *any `json:"verify_network_connection_id,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectEnvironmentPatchData is the typed request payload for ProjectEnvironment.PatchTyped.
type ProjectEnvironmentPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	AllowedOrigins *[]any `json:"allowed_origins,omitempty"`
	BaseUrl *any `json:"base_url,omitempty"`
	Binary *string `json:"binary,omitempty"`
	ImessageNumber *any `json:"imessage_number,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MessagingTesterNumber *any `json:"messaging_tester_number,omitempty"`
	Name *string `json:"name,omitempty"`
	VerifyNetworkConnectionId *any `json:"verify_network_connection_id,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectFinding is the typed data model for the project_finding entity.
type ProjectFinding struct {
}

// ProjectFindingListMatch is the typed request payload for ProjectFinding.ListTyped.
type ProjectFindingListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Page *int `json:"page,omitempty"`
	Priority *string `json:"priority,omitempty"`
	Query *string `json:"query,omitempty"`
	RunId *string `json:"run_id,omitempty"`
	Source *string `json:"source,omitempty"`
	State *string `json:"state,omitempty"`
}

// ProjectFixture is the typed data model for the project_fixture entity.
type ProjectFixture struct {
}

// ProjectFixtureLoadMatch is the typed request payload for ProjectFixture.LoadTyped.
type ProjectFixtureLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectFixtureListMatch is the typed request payload for ProjectFixture.ListTyped.
type ProjectFixtureListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialId *string `json:"credential_id,omitempty"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	Page *int `json:"page,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Q *string `json:"q,omitempty"`
}

// ProjectFixtureCreateData is the typed request payload for ProjectFixture.CreateTyped.
type ProjectFixtureCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectFixtureUpdateData is the typed request payload for ProjectFixture.UpdateTyped.
type ProjectFixtureUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialIds *[]any `json:"credential_ids,omitempty"`
	EnvironmentIds *[]any `json:"environment_ids,omitempty"`
	Name *string `json:"name,omitempty"`
	PersonaIds *[]any `json:"persona_ids,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectFixturePatchData is the typed request payload for ProjectFixture.PatchTyped.
type ProjectFixturePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialIds *[]any `json:"credential_ids,omitempty"`
	EnvironmentIds *[]any `json:"environment_ids,omitempty"`
	Name *string `json:"name,omitempty"`
	PersonaIds *[]any `json:"persona_ids,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectFixtureRemoveMatch is the typed request payload for ProjectFixture.RemoveTyped.
type ProjectFixtureRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Version int `json:"version"`
}

// ProjectIosApp is the typed data model for the project_ios_app entity.
type ProjectIosApp struct {
}

// ProjectIosAppCreateData is the typed request payload for ProjectIosApp.CreateTyped.
type ProjectIosAppCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectMessagingConversation is the typed data model for the project_messaging_conversation entity.
type ProjectMessagingConversation struct {
}

// ProjectMessagingConversationLoadMatch is the typed request payload for ProjectMessagingConversation.LoadTyped.
type ProjectMessagingConversationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectMessagingConversationCreateData is the typed request payload for ProjectMessagingConversation.CreateTyped.
type ProjectMessagingConversationCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AssistantNumber string `json:"assistant_number"`
	TesterNumber string `json:"tester_number"`
	VerifyEnvironmentId string `json:"verify_environment_id"`
}

// ProjectMessagingConversationUpdateData is the typed request payload for ProjectMessagingConversation.UpdateTyped.
type ProjectMessagingConversationUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AssistantNumber *string `json:"assistant_number,omitempty"`
	TesterNumber *string `json:"tester_number,omitempty"`
}

// ProjectMessagingConversationPatchData is the typed request payload for ProjectMessagingConversation.PatchTyped.
type ProjectMessagingConversationPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AssistantNumber *string `json:"assistant_number,omitempty"`
	TesterNumber *string `json:"tester_number,omitempty"`
}

// ProjectOverviewMetric is the typed data model for the project_overview_metric entity.
type ProjectOverviewMetric struct {
}

// ProjectOverviewMetricLoadMatch is the typed request payload for ProjectOverviewMetric.LoadTyped.
type ProjectOverviewMetricLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectOverviewPullRequest is the typed data model for the project_overview_pull_request entity.
type ProjectOverviewPullRequest struct {
}

// ProjectOverviewPullRequestListMatch is the typed request payload for ProjectOverviewPullRequest.ListTyped.
type ProjectOverviewPullRequestListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectPrTesting is the typed data model for the project_pr_testing entity.
type ProjectPrTesting struct {
}

// ProjectPrTestingLoadMatch is the typed request payload for ProjectPrTesting.LoadTyped.
type ProjectPrTestingLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Provider *string `json:"provider,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
	RepositorySearch *string `json:"repository_search,omitempty"`
	SourceRepository *string `json:"source_repository,omitempty"`
}

// ProjectProductMap is the typed data model for the project_product_map entity.
type ProjectProductMap struct {
}

// ProjectProductMapLoadMatch is the typed request payload for ProjectProductMap.LoadTyped.
type ProjectProductMapLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccountId *string `json:"account_id,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
	Source *string `json:"source,omitempty"`
	Target *string `json:"target,omitempty"`
	CompareRevisionId *string `json:"compare_revision_id,omitempty"`
	After *string `json:"after,omitempty"`
	ViewId *string `json:"view_id,omitempty"`
}

// ProjectProductMapCreateData is the typed request payload for ProjectProductMap.CreateTyped.
type ProjectProductMapCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectProductMapComparison is the typed data model for the project_product_map_comparison entity.
type ProjectProductMapComparison struct {
}

// ProjectProductMapComparisonLoadMatch is the typed request payload for ProjectProductMapComparison.LoadTyped.
type ProjectProductMapComparisonLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AccountId *string `json:"account_id,omitempty"`
	Area *string `json:"area,omitempty"`
	Before *string `json:"before,omitempty"`
	CompareRevisionId *string `json:"compare_revision_id,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	Query *string `json:"query,omitempty"`
	RevisionId *string `json:"revision_id,omitempty"`
	Since *string `json:"since,omitempty"`
}

// ProjectRecording is the typed data model for the project_recording entity.
type ProjectRecording struct {
}

// ProjectRecordingLoadMatch is the typed request payload for ProjectRecording.LoadTyped.
type ProjectRecordingLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectRecordingCreateData is the typed request payload for ProjectRecording.CreateTyped.
type ProjectRecordingCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	EnvironmentId string `json:"environment_id"`
	PersonaId string `json:"persona_id"`
	StartPath *string `json:"start_path,omitempty"`
}

// ProjectRecordingRemoveMatch is the typed request payload for ProjectRecording.RemoveTyped.
type ProjectRecordingRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectRunPlan is the typed data model for the project_run_plan entity.
type ProjectRunPlan struct {
}

// ProjectRunPlanLoadMatch is the typed request payload for ProjectRunPlan.LoadTyped.
type ProjectRunPlanLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectRunPlanListMatch is the typed request payload for ProjectRunPlan.ListTyped.
type ProjectRunPlanListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Page *int `json:"page,omitempty"`
}

// ProjectRunPlanCreateData is the typed request payload for ProjectRunPlan.CreateTyped.
type ProjectRunPlanCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Dependencies []any `json:"dependencies"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	Name string `json:"name"`
	Nodes []any `json:"nodes"`
}

// ProjectRunPlanUpdateData is the typed request payload for ProjectRunPlan.UpdateTyped.
type ProjectRunPlanUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Dependencies *[]any `json:"dependencies,omitempty"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	Name *string `json:"name,omitempty"`
	Nodes *[]any `json:"nodes,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectRunPlanPatchData is the typed request payload for ProjectRunPlan.PatchTyped.
type ProjectRunPlanPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Dependencies *[]any `json:"dependencies,omitempty"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	Name *string `json:"name,omitempty"`
	Nodes *[]any `json:"nodes,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectRunSchedule is the typed data model for the project_run_schedule entity.
type ProjectRunSchedule struct {
}

// ProjectRunScheduleLoadMatch is the typed request payload for ProjectRunSchedule.LoadTyped.
type ProjectRunScheduleLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectRunScheduleListMatch is the typed request payload for ProjectRunSchedule.ListTyped.
type ProjectRunScheduleListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectRunScheduleCreateData is the typed request payload for ProjectRunSchedule.CreateTyped.
type ProjectRunScheduleCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialIds map[string]any `json:"credential_ids"`
	EnvironmentId string `json:"environment_id"`
	Labels []any `json:"labels"`
	Name string `json:"name"`
	NotificationChannel *string `json:"notification_channel,omitempty"`
	SelectionMode string `json:"selection_mode"`
	SlackSubscriptionId *any `json:"slack_subscription_id,omitempty"`
	State string `json:"state"`
	TimeOfDay string `json:"time_of_day"`
	TimeZone string `json:"time_zone"`
}

// ProjectRunScheduleUpdateData is the typed request payload for ProjectRunSchedule.UpdateTyped.
type ProjectRunScheduleUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialIds *map[string]any `json:"credential_ids,omitempty"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	NotificationChannel *string `json:"notification_channel,omitempty"`
	SelectionMode *string `json:"selection_mode,omitempty"`
	SlackSubscriptionId *any `json:"slack_subscription_id,omitempty"`
	State *string `json:"state,omitempty"`
	TimeOfDay *string `json:"time_of_day,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectRunSchedulePatchData is the typed request payload for ProjectRunSchedule.PatchTyped.
type ProjectRunSchedulePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	CredentialIds *map[string]any `json:"credential_ids,omitempty"`
	EnvironmentId *string `json:"environment_id,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	NotificationChannel *string `json:"notification_channel,omitempty"`
	SelectionMode *string `json:"selection_mode,omitempty"`
	SlackSubscriptionId *any `json:"slack_subscription_id,omitempty"`
	State *string `json:"state,omitempty"`
	TimeOfDay *string `json:"time_of_day,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ProjectScenarioOption is the typed data model for the project_scenario_option entity.
type ProjectScenarioOption struct {
}

// ProjectScenarioOptionLoadMatch is the typed request payload for ProjectScenarioOption.LoadTyped.
type ProjectScenarioOptionLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// ProjectScenarioRow is the typed data model for the project_scenario_row entity.
type ProjectScenarioRow struct {
}

// ProjectScenarioRowListMatch is the typed request payload for ProjectScenarioRow.ListTyped.
type ProjectScenarioRowListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Page *int `json:"page,omitempty"`
	Sort *string `json:"sort,omitempty"`
	State *string `json:"state,omitempty"`
}

// ProjectSetting is the typed data model for the project_setting entity.
type ProjectSetting struct {
}

// ProjectSettingListMatch is the typed request payload for ProjectSetting.ListTyped.
type ProjectSettingListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// PullRequestAction is the typed data model for the pull_request_action entity.
type PullRequestAction struct {
}

// PullRequestActionCreateData is the typed request payload for PullRequestAction.CreateTyped.
type PullRequestActionCreateData struct {
	Number string `json:"number"`
	OrganizationId string `json:"organization_id"`
	PullRequestId string `json:"pull_request_id"`
	ActionName string `json:"action_name"`
	Body *string `json:"body,omitempty"`
	CommentId *string `json:"comment_id,omitempty"`
	Comments *[]any `json:"comments,omitempty"`
	Event *string `json:"event,omitempty"`
	ExpectedHeadSha *string `json:"expected_head_sha,omitempty"`
	Label *string `json:"label,omitempty"`
	Line *int `json:"line,omitempty"`
	OperationKey string `json:"operation_key"`
	Path *string `json:"path,omitempty"`
	RunId *string `json:"run_id,omitempty"`
	Side *string `json:"side,omitempty"`
	StartLine *int `json:"start_line,omitempty"`
	StartSide *string `json:"start_side,omitempty"`
	ThreadId *string `json:"thread_id,omitempty"`
}

// PullRequestMagicMerge is the typed data model for the pull_request_magic_merge entity.
type PullRequestMagicMerge struct {
}

// PullRequestMagicMergeCreateData is the typed request payload for PullRequestMagicMerge.CreateTyped.
type PullRequestMagicMergeCreateData struct {
	Number string `json:"number"`
	OrganizationId string `json:"organization_id"`
	PullRequestId string `json:"pull_request_id"`
	ExpectedBaseSha *any `json:"expected_base_sha,omitempty"`
	ExpectedHeadSha *any `json:"expected_head_sha,omitempty"`
	IdempotencyKey *any `json:"idempotency_key,omitempty"`
	Mode *any `json:"mode,omitempty"`
	Resolutions *any `json:"resolutions,omitempty"`
}

// PullRequestSetting is the typed data model for the pull_request_setting entity.
type PullRequestSetting struct {
}

// PullRequestSettingLoadMatch is the typed request payload for PullRequestSetting.LoadTyped.
type PullRequestSettingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
	Provider *string `json:"provider,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// PullRequestSettingCreateData is the typed request payload for PullRequestSetting.CreateTyped.
type PullRequestSettingCreateData struct {
	OrganizationId string `json:"organization_id"`
	AppPreviewProfileId *any `json:"app_preview_profile_id,omitempty"`
	AppServiceId *any `json:"app_service_id,omitempty"`
	Bots []any `json:"bots"`
	Concurrency *int `json:"concurrency,omitempty"`
	DemoVideos bool `json:"demo_videos"`
	DemoVideosEnabled *bool `json:"demo_videos_enabled,omitempty"`
	Deployment any `json:"deployment"`
	DeploymentEnvironment *string `json:"deployment_environment,omitempty"`
	Enabled bool `json:"enabled"`
	Environment string `json:"environment"`
	GithubCheckEnabled *bool `json:"github_check_enabled,omitempty"`
	ImessageCommentPrefix any `json:"imessage_comment_prefix"`
	ImessageNumber any `json:"imessage_number"`
	ImessageNumberSource string `json:"imessage_number_source"`
	Limits map[string]any `json:"limits"`
	LinkPattern any `json:"link_pattern"`
	Links any `json:"links"`
	MaxSeconds *int `json:"max_seconds,omitempty"`
	MessagingTesterNumber any `json:"messaging_tester_number"`
	NonProductPaths *[]any `json:"non_product_paths,omitempty"`
	PrCheck bool `json:"pr_check"`
	PreviewAccess *string `json:"preview_access,omitempty"`
	PreviewCommentAuthors *[]any `json:"preview_comment_authors,omitempty"`
	PreviewCommentPattern *string `json:"preview_comment_pattern,omitempty"`
	PreviewCommentWildcard any `json:"preview_comment_wildcard"`
	PreviewProfile any `json:"preview_profile"`
	Previews string `json:"previews"`
	ProjectId string `json:"project_id"`
	Provider string `json:"provider"`
	Repository string `json:"repository"`
	RepositoryId string `json:"repository_id"`
	RepositoryKind string `json:"repository_kind"`
	Service any `json:"service"`
	TargetMode string `json:"target_mode"`
	TriggerLabel string `json:"trigger_label"`
	TriggerOnComment *bool `json:"trigger_on_comment,omitempty"`
	TriggerOnLabel *bool `json:"trigger_on_label,omitempty"`
	TriggerOnPush *bool `json:"trigger_on_push,omitempty"`
	TriggerOnReady *bool `json:"trigger_on_ready,omitempty"`
	Triggers map[string]any `json:"triggers"`
	VerifyEnvironmentId string `json:"verify_environment_id"`
	WriteScenarios bool `json:"write_scenarios"`
}

// PullRequestSettingAddRepository is the typed data model for the pull_request_setting_add_repository entity.
type PullRequestSettingAddRepository struct {
}

// PullRequestSettingAddRepositoryCreateData is the typed request payload for PullRequestSettingAddRepository.CreateTyped.
type PullRequestSettingAddRepositoryCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Replace *bool `json:"replace,omitempty"`
	Repositories []any `json:"repositories"`
}

// PullRequestSettingDetectComment is the typed data model for the pull_request_setting_detect_comment entity.
type PullRequestSettingDetectComment struct {
}

// PullRequestSettingDetectCommentCreateData is the typed request payload for PullRequestSettingDetectComment.CreateTyped.
type PullRequestSettingDetectCommentCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// PullRequestTranscript is the typed data model for the pull_request_transcript entity.
type PullRequestTranscript struct {
}

// PullRequestTranscriptListMatch is the typed request payload for PullRequestTranscript.ListTyped.
type PullRequestTranscriptListMatch struct {
	OrganizationId string `json:"organization_id"`
	PullRequestId string `json:"pull_request_id"`
	RepoId string `json:"repo_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Paginated *bool `json:"paginated,omitempty"`
}

// PullZone is the typed data model for the pull_zone entity.
type PullZone struct {
}

// PullZoneListMatch is the typed request payload for PullZone.ListTyped.
type PullZoneListMatch struct {
	OrganizationId string `json:"organization_id"`
	App *string `json:"app,omitempty"`
}

// Recorder is the typed data model for the recorder entity.
type Recorder struct {
}

// RecorderLoadMatch is the typed request payload for Recorder.LoadTyped.
type RecorderLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// Registry is the typed data model for the registry entity.
type Registry struct {
}

// RegistryLoadMatch is the typed request payload for Registry.LoadTyped.
type RegistryLoadMatch struct {
}

// RegistryV2 is the typed data model for the registry_v2 entity.
type RegistryV2 struct {
}

// RegistryV2CreateData is the typed request payload for RegistryV2.CreateTyped.
type RegistryV2CreateData struct {
}

// RelayAgentConnection is the typed data model for the relay_agent_connection entity.
type RelayAgentConnection struct {
}

// RelayAgentConnectionLoadMatch is the typed request payload for RelayAgentConnection.LoadTyped.
type RelayAgentConnectionLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// RelayAgentConnectionListMatch is the typed request payload for RelayAgentConnection.ListTyped.
type RelayAgentConnectionListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	SelectedConnectionId *string `json:"selected_connection_id,omitempty"`
}

// RelayAgentConnectionCreateData is the typed request payload for RelayAgentConnection.CreateTyped.
type RelayAgentConnectionCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	AgentCardUrl string `json:"agent_card_url"`
	AuthScheme string `json:"auth_scheme"`
	Credential *any `json:"credential,omitempty"`
	Name string `json:"name"`
	RemoteAgent *any `json:"remote_agent,omitempty"`
	SourceOperationId *any `json:"source_operation_id,omitempty"`
}

// RelayAgentConnectionUpdateData is the typed request payload for RelayAgentConnection.UpdateTyped.
type RelayAgentConnectionUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AuthScheme *string `json:"auth_scheme,omitempty"`
	Credential *any `json:"credential,omitempty"`
	ExpectedGeneration *int `json:"expected_generation,omitempty"`
	Name *string `json:"name,omitempty"`
	RemoteAgent *any `json:"remote_agent,omitempty"`
}

// RelayAgentConnectionRemoveMatch is the typed request payload for RelayAgentConnection.RemoveTyped.
type RelayAgentConnectionRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// RelayAgentLocalThread is the typed data model for the relay_agent_local_thread entity.
type RelayAgentLocalThread struct {
}

// RelayAgentLocalThreadRemoveMatch is the typed request payload for RelayAgentLocalThread.RemoveTyped.
type RelayAgentLocalThreadRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// RelaySignal is the typed data model for the relay_signal entity.
type RelaySignal struct {
}

// RelaySignalCreateData is the typed request payload for RelaySignal.CreateTyped.
type RelaySignalCreateData struct {
}

// ReleaseRollout is the typed data model for the release_rollout entity.
type ReleaseRollout struct {
}

// ReleaseRolloutLoadMatch is the typed request payload for ReleaseRollout.LoadTyped.
type ReleaseRolloutLoadMatch struct {
	Id *string `json:"id,omitempty"`
	ReleaseId string `json:"release_id"`
}

// ReleaseRolloutCreateData is the typed request payload for ReleaseRollout.CreateTyped.
type ReleaseRolloutCreateData struct {
	ReleaseId string `json:"release_id"`
}

// Repo is the typed data model for the repo entity.
type Repo struct {
}

// RepoLoadMatch is the typed request payload for Repo.LoadTyped.
type RepoLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// RepoListMatch is the typed request payload for Repo.ListTyped.
type RepoListMatch struct {
	OrganizationId string `json:"organization_id"`
	Direction *string `json:"direction,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// RepoRemoveMatch is the typed request payload for Repo.RemoveTyped.
type RepoRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// RepoAccessToken is the typed data model for the repo_access_token entity.
type RepoAccessToken struct {
}

// RepoAccessTokenListMatch is the typed request payload for RepoAccessToken.ListTyped.
type RepoAccessTokenListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAccessTokenCreateData is the typed request payload for RepoAccessToken.CreateTyped.
type RepoAccessTokenCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	CredentialPurpose *string `json:"credential_purpose,omitempty"`
	ExpiresInDays *any `json:"expires_in_days,omitempty"`
	Name string `json:"name"`
	PermissionLevel *string `json:"permission_level,omitempty"`
}

// RepoAccessTokenRemoveMatch is the typed request payload for RepoAccessToken.RemoveTyped.
type RepoAccessTokenRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAction is the typed data model for the repo_action entity.
type RepoAction struct {
}

// RepoActionListMatch is the typed request payload for RepoAction.ListTyped.
type RepoActionListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	PipelineId *string `json:"pipeline_id,omitempty"`
	Range *string `json:"range,omitempty"`
}

// RepoAgentCheckpoint is the typed data model for the repo_agent_checkpoint entity.
type RepoAgentCheckpoint struct {
}

// RepoAgentCheckpointLoadMatch is the typed request payload for RepoAgentCheckpoint.LoadTyped.
type RepoAgentCheckpointLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAgentSession is the typed data model for the repo_agent_session entity.
type RepoAgentSession struct {
}

// RepoAgentSessionLoadMatch is the typed request payload for RepoAgentSession.LoadTyped.
type RepoAgentSessionLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAgentSessionCreateData is the typed request payload for RepoAgentSession.CreateTyped.
type RepoAgentSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAgentSessionUpdateData is the typed request payload for RepoAgentSession.UpdateTyped.
type RepoAgentSessionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoAgentSessionPatchData is the typed request payload for RepoAgentSession.PatchTyped.
type RepoAgentSessionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	AgentSession *map[string]any `json:"agent_session,omitempty"`
}

// RepoBookmarkProtection is the typed data model for the repo_bookmark_protection entity.
type RepoBookmarkProtection struct {
}

// RepoBookmarkProtectionLoadMatch is the typed request payload for RepoBookmarkProtection.LoadTyped.
type RepoBookmarkProtectionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoBookmarkProtectionListMatch is the typed request payload for RepoBookmarkProtection.ListTyped.
type RepoBookmarkProtectionListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoBookmarkProtectionCreateData is the typed request payload for RepoBookmarkProtection.CreateTyped.
type RepoBookmarkProtectionCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ActorPolicy *map[string]any `json:"actor_policy,omitempty"`
	BypassMode *string `json:"bypass_mode,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Requirements *map[string]any `json:"requirements,omitempty"`
	TargetKind *string `json:"target_kind,omitempty"`
	TargetPattern *any `json:"target_pattern,omitempty"`
}

// RepoBookmarkProtectionUpdateData is the typed request payload for RepoBookmarkProtection.UpdateTyped.
type RepoBookmarkProtectionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ActorPolicy *map[string]any `json:"actor_policy,omitempty"`
	BypassMode *string `json:"bypass_mode,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Requirements *map[string]any `json:"requirements,omitempty"`
	TargetKind *string `json:"target_kind,omitempty"`
	TargetPattern *any `json:"target_pattern,omitempty"`
}

// RepoBookmarkProtectionPatchData is the typed request payload for RepoBookmarkProtection.PatchTyped.
type RepoBookmarkProtectionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ActorPolicy *map[string]any `json:"actor_policy,omitempty"`
	BypassMode *string `json:"bypass_mode,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Requirements *map[string]any `json:"requirements,omitempty"`
	TargetKind *string `json:"target_kind,omitempty"`
	TargetPattern *any `json:"target_pattern,omitempty"`
}

// RepoBookmarkProtectionRemoveMatch is the typed request payload for RepoBookmarkProtection.RemoveTyped.
type RepoBookmarkProtectionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoBookmarkProtectionEvent is the typed data model for the repo_bookmark_protection_event entity.
type RepoBookmarkProtectionEvent struct {
}

// RepoBookmarkProtectionEventListMatch is the typed request payload for RepoBookmarkProtectionEvent.ListTyped.
type RepoBookmarkProtectionEventListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Bookmark *string `json:"bookmark,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// RepoCloudWorkspaceBackup is the typed data model for the repo_cloud_workspace_backup entity.
type RepoCloudWorkspaceBackup struct {
}

// RepoCloudWorkspaceBackupLoadMatch is the typed request payload for RepoCloudWorkspaceBackup.LoadTyped.
type RepoCloudWorkspaceBackupLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoCloudWorkspaceBackupCreateData is the typed request payload for RepoCloudWorkspaceBackup.CreateTyped.
type RepoCloudWorkspaceBackupCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoCodeRule is the typed data model for the repo_code_rule entity.
type RepoCodeRule struct {
}

// RepoCodeRuleLoadMatch is the typed request payload for RepoCodeRule.LoadTyped.
type RepoCodeRuleLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoCodeRuleListMatch is the typed request payload for RepoCodeRule.ListTyped.
type RepoCodeRuleListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Rule *string `json:"rule,omitempty"`
}

// RepoCodeRuleCreateData is the typed request payload for RepoCodeRule.CreateTyped.
type RepoCodeRuleCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Definition map[string]any `json:"definition"`
}

// RepoCodeRuleUpdateData is the typed request payload for RepoCodeRule.UpdateTyped.
type RepoCodeRuleUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Definition *map[string]any `json:"definition,omitempty"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
}

// RepoCodeRulePatchData is the typed request payload for RepoCodeRule.PatchTyped.
type RepoCodeRulePatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Definition *map[string]any `json:"definition,omitempty"`
	ExpectedVersion *int `json:"expected_version,omitempty"`
}

// RepoCodeRuleRemoveMatch is the typed request payload for RepoCodeRule.RemoveTyped.
type RepoCodeRuleRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoSetting is the typed data model for the repo_setting entity.
type RepoSetting struct {
}

// RepoSettingListMatch is the typed request payload for RepoSetting.ListTyped.
type RepoSettingListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoSettingUpdateData is the typed request payload for RepoSetting.UpdateTyped.
type RepoSettingUpdateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Description *any `json:"description,omitempty"`
	IconName *string `json:"icon_name,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
}

// RepoStat is the typed data model for the repo_stat entity.
type RepoStat struct {
}

// RepoStatLoadMatch is the typed request payload for RepoStat.LoadTyped.
type RepoStatLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// RepoStatCreateData is the typed request payload for RepoStat.CreateTyped.
type RepoStatCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Backend string `json:"backend"`
	CanRefresh bool `json:"can_refresh"`
	Freshness map[string]any `json:"freshness"`
	Note string `json:"note"`
	Physical map[string]any `json:"physical"`
	Series []any `json:"series"`
}

// RepoVc is the typed data model for the repo_vc entity.
type RepoVc struct {
}

// RepoVcLoadMatch is the typed request payload for RepoVc.LoadTyped.
type RepoVcLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Path *string `json:"path,omitempty"`
	Ref *string `json:"ref,omitempty"`
}

// RepoVcCreateData is the typed request payload for RepoVc.CreateTyped.
type RepoVcCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	From *any `json:"from,omitempty"`
	Into *any `json:"into,omitempty"`
}

// RepoVcUpdateData is the typed request payload for RepoVc.UpdateTyped.
type RepoVcUpdateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	AutoLandEnabled *any `json:"auto_land_enabled,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
	GithubMergeGate *any `json:"github_merge_gate,omitempty"`
	MergeAuthority *any `json:"merge_authority,omitempty"`
	MergeGithubRepositoryConnectionId *any `json:"merge_github_repository_connection_id,omitempty"`
	QueueConcurrency *any `json:"queue_concurrency,omitempty"`
	QueueValidationMode *any `json:"queue_validation_mode,omitempty"`
}

// RepoVcCommit is the typed data model for the repo_vc_commit entity.
type RepoVcCommit struct {
}

// RepoVcCommitListMatch is the typed request payload for RepoVcCommit.ListTyped.
type RepoVcCommitListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Page *int `json:"page,omitempty"`
	Path *string `json:"path,omitempty"`
	Q *string `json:"q,omitempty"`
	Ref string `json:"ref"`
}

// ReportReplay is the typed data model for the report_replay entity.
type ReportReplay struct {
}

// ReportReplayLoadMatch is the typed request payload for ReportReplay.LoadTyped.
type ReportReplayLoadMatch struct {
	ExplorationId string `json:"exploration_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	GeneratedAt *string `json:"generated_at,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// ReportScenario is the typed data model for the report_scenario entity.
type ReportScenario struct {
}

// ReportScenarioCreateData is the typed request payload for ReportScenario.CreateTyped.
type ReportScenarioCreateData struct {
	ExplorationId string `json:"exploration_id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// RepositoryAccess is the typed data model for the repository_access entity.
type RepositoryAccess struct {
}

// RepositoryAccessLoadMatch is the typed request payload for RepositoryAccess.LoadTyped.
type RepositoryAccessLoadMatch struct {
	OrganizationSlug *string `json:"organization_slug,omitempty"`
}

// RepositoryAccessCreateData is the typed request payload for RepositoryAccess.CreateTyped.
type RepositoryAccessCreateData struct {
}

// RepositoryAccessResolve is the typed data model for the repository_access_resolve entity.
type RepositoryAccessResolve struct {
}

// RepositoryAccessResolveLoadMatch is the typed request payload for RepositoryAccessResolve.LoadTyped.
type RepositoryAccessResolveLoadMatch struct {
	Id string `json:"id"`
	ResolveId string `json:"resolve_id"`
}

// RepositoryEvent is the typed data model for the repository_event entity.
type RepositoryEvent struct {
}

// RepositoryEventCreateData is the typed request payload for RepositoryEvent.CreateTyped.
type RepositoryEventCreateData struct {
}

// RepositoryImport is the typed data model for the repository_import entity.
type RepositoryImport struct {
}

// RepositoryImportLoadMatch is the typed request payload for RepositoryImport.LoadTyped.
type RepositoryImportLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	AccountsOnly *bool `json:"accounts_only,omitempty"`
	Search *string `json:"search,omitempty"`
}

// RepositoryImportSession is the typed data model for the repository_import_session entity.
type RepositoryImportSession struct {
}

// RepositoryImportSessionLoadMatch is the typed request payload for RepositoryImportSession.LoadTyped.
type RepositoryImportSessionLoadMatch struct {
	Id string `json:"id"`
}

// RepositoryImportSessionCreateData is the typed request payload for RepositoryImportSession.CreateTyped.
type RepositoryImportSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	ClientName *any `json:"client_name,omitempty"`
	ClientVersion *any `json:"client_version,omitempty"`
	GithubAppInstallationId *any `json:"github_app_installation_id,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
}

// RepositoryImportSessionRepository is the typed data model for the repository_import_session_repository entity.
type RepositoryImportSessionRepository struct {
}

// RepositoryImportSessionRepositoryListMatch is the typed request payload for RepositoryImportSessionRepository.ListTyped.
type RepositoryImportSessionRepositoryListMatch struct {
	RepositoryImportSessionId string `json:"repository_import_session_id"`
	Q *string `json:"q,omitempty"`
}

// RepositoryImportSessionSelection is the typed data model for the repository_import_session_selection entity.
type RepositoryImportSessionSelection struct {
}

// RepositoryImportSessionSelectionCreateData is the typed request payload for RepositoryImportSessionSelection.CreateTyped.
type RepositoryImportSessionSelectionCreateData struct {
	RepositoryImportSessionId string `json:"repository_import_session_id"`
	Repositories any `json:"repositories"`
}

// RepositorySandboxEnvironment is the typed data model for the repository_sandbox_environment entity.
type RepositorySandboxEnvironment struct {
}

// RepositorySandboxEnvironmentLoadMatch is the typed request payload for RepositorySandboxEnvironment.LoadTyped.
type RepositorySandboxEnvironmentLoadMatch struct {
	Id string `json:"id"`
	RepositoryId string `json:"repository_id"`
}

// RepositorySandboxEnvironmentCreateData is the typed request payload for RepositorySandboxEnvironment.CreateTyped.
type RepositorySandboxEnvironmentCreateData struct {
	RepositoryId string `json:"repository_id"`
}

// RoderCodeRepair is the typed data model for the roder_code_repair entity.
type RoderCodeRepair struct {
}

// RoderCodeRepairLoadMatch is the typed request payload for RoderCodeRepair.LoadTyped.
type RoderCodeRepairLoadMatch struct {
	Id string `json:"id"`
}

// RoderCodeRepairCreateData is the typed request payload for RoderCodeRepair.CreateTyped.
type RoderCodeRepairCreateData struct {
	BaseSha string `json:"base_sha"`
	OrganizationId string `json:"organization_id"`
	RepositorySlug string `json:"repository_slug"`
	ScenarioRunId string `json:"scenario_run_id"`
}

// RoderCodeRepairSetting is the typed data model for the roder_code_repair_setting entity.
type RoderCodeRepairSetting struct {
}

// RoderCodeRepairSettingLoadMatch is the typed request payload for RoderCodeRepairSetting.LoadTyped.
type RoderCodeRepairSettingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// RoderCodeRepairSettingCreateData is the typed request payload for RoderCodeRepairSetting.CreateTyped.
type RoderCodeRepairSettingCreateData struct {
	Enabled bool `json:"enabled"`
	OrganizationId string `json:"organization_id"`
	RepositorySlug *any `json:"repository_slug,omitempty"`
}

// RoderMachine is the typed data model for the roder_machine entity.
type RoderMachine struct {
}

// RoderMachineUpdateData is the typed request payload for RoderMachine.UpdateTyped.
type RoderMachineUpdateData struct {
	Id string `json:"id"`
}

// RoderRun is the typed data model for the roder_run entity.
type RoderRun struct {
}

// RoderRunCreateData is the typed request payload for RoderRun.CreateTyped.
type RoderRunCreateData struct {
	Events *any `json:"events,omitempty"`
}

// RoderWorkspaceCredential is the typed data model for the roder_workspace_credential entity.
type RoderWorkspaceCredential struct {
}

// RoderWorkspaceCredentialCreateData is the typed request payload for RoderWorkspaceCredential.CreateTyped.
type RoderWorkspaceCredentialCreateData struct {
	RequiredLifetimeSeconds int `json:"required_lifetime_seconds"`
}

// RunArtifact is the typed data model for the run_artifact entity.
type RunArtifact struct {
}

// RunArtifactLoadMatch is the typed request payload for RunArtifact.LoadTyped.
type RunArtifactLoadMatch struct {
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// RunArtifactCreateData is the typed request payload for RunArtifact.CreateTyped.
type RunArtifactCreateData struct {
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// RunJob is the typed data model for the run_job entity.
type RunJob struct {
}

// RunJobLoadMatch is the typed request payload for RunJob.LoadTyped.
type RunJobLoadMatch struct {
	Id *string `json:"id,omitempty"`
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// RunJobCreateData is the typed request payload for RunJob.CreateTyped.
type RunJobCreateData struct {
	PipelineId string `json:"pipeline_id"`
	RunId string `json:"run_id"`
}

// RunScenarioRun is the typed data model for the run_scenario_run entity.
type RunScenarioRun struct {
}

// RunScenarioRunLoadMatch is the typed request payload for RunScenarioRun.LoadTyped.
type RunScenarioRunLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	RunId string `json:"run_id"`
}

// RunScenarioRunUpdateData is the typed request payload for RunScenarioRun.UpdateTyped.
type RunScenarioRunUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	RunId string `json:"run_id"`
	Outcomes *any `json:"outcomes,omitempty"`
	Steps *any `json:"steps,omitempty"`
	Version *any `json:"version,omitempty"`
}

// RunScheduleOption is the typed data model for the run_schedule_option entity.
type RunScheduleOption struct {
}

// RunScheduleOptionListMatch is the typed request payload for RunScheduleOption.ListTyped.
type RunScheduleOptionListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// RunSearch is the typed data model for the run_search entity.
type RunSearch struct {
}

// RunSearchLoadMatch is the typed request payload for RunSearch.LoadTyped.
type RunSearchLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Query *string `json:"query,omitempty"`
}

// RunUpdate is the typed data model for the run_update entity.
type RunUpdate struct {
}

// RunUpdateLoadMatch is the typed request payload for RunUpdate.LoadTyped.
type RunUpdateLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	Status *string `json:"status,omitempty"`
	VerifyEnvironmentId *string `json:"verify_environment_id,omitempty"`
}

// RunWorkspaceCredential is the typed data model for the run_workspace_credential entity.
type RunWorkspaceCredential struct {
}

// RunWorkspaceCredentialCreateData is the typed request payload for RunWorkspaceCredential.CreateTyped.
type RunWorkspaceCredentialCreateData struct {
}

// RunnerLease is the typed data model for the runner_lease entity.
type RunnerLease struct {
}

// RunnerLeaseLoadMatch is the typed request payload for RunnerLease.LoadTyped.
type RunnerLeaseLoadMatch struct {
	RunnerId string `json:"runner_id"`
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerLeaseCreateData is the typed request payload for RunnerLease.CreateTyped.
type RunnerLeaseCreateData struct {
	RunnerId string `json:"runner_id"`
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerPoolNodeEnrollmentToken is the typed data model for the runner_pool_node_enrollment_token entity.
type RunnerPoolNodeEnrollmentToken struct {
}

// RunnerPoolNodeEnrollmentTokenListMatch is the typed request payload for RunnerPoolNodeEnrollmentToken.ListTyped.
type RunnerPoolNodeEnrollmentTokenListMatch struct {
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerPoolNodeEnrollmentTokenCreateData is the typed request payload for RunnerPoolNodeEnrollmentToken.CreateTyped.
type RunnerPoolNodeEnrollmentTokenCreateData struct {
	RunnerPoolId string `json:"runner_pool_id"`
	CapabilitiesCsv *any `json:"capabilities_csv,omitempty"`
	Description *any `json:"description,omitempty"`
	ExpiresAt *any `json:"expires_at,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Name string `json:"name"`
}

// RunnerPoolRunner is the typed data model for the runner_pool_runner entity.
type RunnerPoolRunner struct {
}

// RunnerPoolRunnerLoadMatch is the typed request payload for RunnerPoolRunner.LoadTyped.
type RunnerPoolRunnerLoadMatch struct {
	Id *string `json:"id,omitempty"`
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerPoolRunnerCreateData is the typed request payload for RunnerPoolRunner.CreateTyped.
type RunnerPoolRunnerCreateData struct {
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerPoolRunnerUpdateData is the typed request payload for RunnerPoolRunner.UpdateTyped.
type RunnerPoolRunnerUpdateData struct {
	Id string `json:"id"`
	RunnerPoolId string `json:"runner_pool_id"`
}

// RunnerPoolRunnerPatchData is the typed request payload for RunnerPoolRunner.PatchTyped.
type RunnerPoolRunnerPatchData struct {
	Id string `json:"id"`
	RunnerPoolId string `json:"runner_pool_id"`
}

// RuntimeInstanceHealthSnapshot is the typed data model for the runtime_instance_health_snapshot entity.
type RuntimeInstanceHealthSnapshot struct {
}

// RuntimeInstanceHealthSnapshotLoadMatch is the typed request payload for RuntimeInstanceHealthSnapshot.LoadTyped.
type RuntimeInstanceHealthSnapshotLoadMatch struct {
	RuntimeInstanceId string `json:"runtime_instance_id"`
}

// RuntimeInstanceHealthSnapshotCreateData is the typed request payload for RuntimeInstanceHealthSnapshot.CreateTyped.
type RuntimeInstanceHealthSnapshotCreateData struct {
	RuntimeInstanceId string `json:"runtime_instance_id"`
}

// SandboxIntegration is the typed data model for the sandbox_integration entity.
type SandboxIntegration struct {
}

// SandboxIntegrationLoadMatch is the typed request payload for SandboxIntegration.LoadTyped.
type SandboxIntegrationLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Provider *string `json:"provider,omitempty"`
}

// SandboxIntegrationCreateData is the typed request payload for SandboxIntegration.CreateTyped.
type SandboxIntegrationCreateData struct {
	OrganizationId string `json:"organization_id"`
	Configuration map[string]any `json:"configuration"`
	Credentials map[string]any `json:"credentials"`
	Name string `json:"name"`
	Provider string `json:"provider"`
}

// SandboxIntegrationUpdateData is the typed request payload for SandboxIntegration.UpdateTyped.
type SandboxIntegrationUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Credentials *map[string]any `json:"credentials,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	Name *string `json:"name,omitempty"`
	Version *int `json:"version,omitempty"`
}

// SandboxIntegrationPatchData is the typed request payload for SandboxIntegration.PatchTyped.
type SandboxIntegrationPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Credentials *map[string]any `json:"credentials,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	Name *string `json:"name,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ScenarioRevision is the typed data model for the scenario_revision entity.
type ScenarioRevision struct {
}

// ScenarioRevisionListMatch is the typed request payload for ScenarioRevision.ListTyped.
type ScenarioRevisionListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	ScenarioId string `json:"scenario_id"`
	Page *int `json:"page,omitempty"`
}

// ScenarioRunLesson is the typed data model for the scenario_run_lesson entity.
type ScenarioRunLesson struct {
}

// ScenarioRunLessonCreateData is the typed request payload for ScenarioRunLesson.CreateTyped.
type ScenarioRunLessonCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	RunId string `json:"run_id"`
	ScenarioRunId string `json:"scenario_run_id"`
	Finding string `json:"finding"`
	Title *string `json:"title,omitempty"`
	Workaround string `json:"workaround"`
}

// ScenarioRunScenarioEdit is the typed data model for the scenario_run_scenario_edit entity.
type ScenarioRunScenarioEdit struct {
}

// ScenarioRunScenarioEditCreateData is the typed request payload for ScenarioRunScenarioEdit.CreateTyped.
type ScenarioRunScenarioEditCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	RunId string `json:"run_id"`
	ScenarioRunId string `json:"scenario_run_id"`
	IdempotencyKey *any `json:"idempotency_key,omitempty"`
	Outcomes *any `json:"outcomes,omitempty"`
	Prompt *any `json:"prompt,omitempty"`
	Steps *any `json:"steps,omitempty"`
	Version *any `json:"version,omitempty"`
	ViewerTimeZone *any `json:"viewer_time_zone,omitempty"`
}

// SecretGrant is the typed data model for the secret_grant entity.
type SecretGrant struct {
}

// SecretGrantLoadMatch is the typed request payload for SecretGrant.LoadTyped.
type SecretGrantLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretGrantCreateData is the typed request payload for SecretGrant.CreateTyped.
type SecretGrantCreateData struct {
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretGrantUpdateData is the typed request payload for SecretGrant.UpdateTyped.
type SecretGrantUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretGrantPatchData is the typed request payload for SecretGrant.PatchTyped.
type SecretGrantPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretGrantRemoveMatch is the typed request payload for SecretGrant.RemoveTyped.
type SecretGrantRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretVersion is the typed data model for the secret_version entity.
type SecretVersion struct {
}

// SecretVersionLoadMatch is the typed request payload for SecretVersion.LoadTyped.
type SecretVersionLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretVersionCreateData is the typed request payload for SecretVersion.CreateTyped.
type SecretVersionCreateData struct {
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretVersionUpdateData is the typed request payload for SecretVersion.UpdateTyped.
type SecretVersionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretVersionPatchData is the typed request payload for SecretVersion.PatchTyped.
type SecretVersionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// SecretVersionRemoveMatch is the typed request payload for SecretVersion.RemoveTyped.
type SecretVersionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SecretId string `json:"secret_id"`
}

// ServiceEndpoint is the typed data model for the service_endpoint entity.
type ServiceEndpoint struct {
}

// ServiceEndpointLoadMatch is the typed request payload for ServiceEndpoint.LoadTyped.
type ServiceEndpointLoadMatch struct {
	AppId string `json:"app_id"`
	Id *string `json:"id,omitempty"`
	ServiceId string `json:"service_id"`
}

// ServiceEndpointCreateData is the typed request payload for ServiceEndpoint.CreateTyped.
type ServiceEndpointCreateData struct {
	AppId string `json:"app_id"`
	ServiceId string `json:"service_id"`
}

// ServiceEndpointUpdateData is the typed request payload for ServiceEndpoint.UpdateTyped.
type ServiceEndpointUpdateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	ServiceId string `json:"service_id"`
}

// ServiceEndpointPatchData is the typed request payload for ServiceEndpoint.PatchTyped.
type ServiceEndpointPatchData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	ServiceId string `json:"service_id"`
}

// ServiceEndpointRemoveMatch is the typed request payload for ServiceEndpoint.RemoveTyped.
type ServiceEndpointRemoveMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	ServiceId string `json:"service_id"`
}

// Setting is the typed data model for the setting entity.
type Setting struct {
}

// SettingLoadMatch is the typed request payload for Setting.LoadTyped.
type SettingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// SettingMutationLease is the typed data model for the setting_mutation_lease entity.
type SettingMutationLease struct {
}

// SettingMutationLeaseCreateData is the typed request payload for SettingMutationLease.CreateTyped.
type SettingMutationLeaseCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Reason *any `json:"reason,omitempty"`
}

// Signal is the typed data model for the signal entity.
type Signal struct {
}

// SignalLoadMatch is the typed request payload for Signal.LoadTyped.
type SignalLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SignalListMatch is the typed request payload for Signal.ListTyped.
type SignalListMatch struct {
	OrganizationId string `json:"organization_id"`
	AfterId *string `json:"after_id,omitempty"`
	BeforeId *string `json:"before_id,omitempty"`
	HostedAppId *string `json:"hosted_app_id,omitempty"`
	IntegrationId *string `json:"integration_id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MinSeverity *string `json:"min_severity,omitempty"`
	Order *string `json:"order,omitempty"`
	Severity *string `json:"severity,omitempty"`
	Since *string `json:"since,omitempty"`
	Source *string `json:"source,omitempty"`
	SubscriptionId *string `json:"subscription_id,omitempty"`
	Unacked *bool `json:"unacked,omitempty"`
}

// SignalCreateData is the typed request payload for Signal.CreateTyped.
type SignalCreateData struct {
}

// SignalInbound is the typed data model for the signal_inbound entity.
type SignalInbound struct {
}

// SignalInboundUpdateData is the typed request payload for SignalInbound.UpdateTyped.
type SignalInboundUpdateData struct {
	Id string `json:"id"`
	InboundId string `json:"inbound_id"`
}

// SignalIntegration is the typed data model for the signal_integration entity.
type SignalIntegration struct {
}

// SignalIntegrationLoadMatch is the typed request payload for SignalIntegration.LoadTyped.
type SignalIntegrationLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SignalIntegrationListMatch is the typed request payload for SignalIntegration.ListTyped.
type SignalIntegrationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// SignalIntegrationCreateData is the typed request payload for SignalIntegration.CreateTyped.
type SignalIntegrationCreateData struct {
	OrganizationId string `json:"organization_id"`
	ApiToken *string `json:"api_token,omitempty"`
	Config *map[string]any `json:"config,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name string `json:"name"`
	Provider string `json:"provider"`
	WebhookSecret *string `json:"webhook_secret,omitempty"`
}

// SignalIntegrationUpdateData is the typed request payload for SignalIntegration.UpdateTyped.
type SignalIntegrationUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ApiToken *string `json:"api_token,omitempty"`
	Config *map[string]any `json:"config,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
	WebhookSecret *string `json:"webhook_secret,omitempty"`
}

// SignalIntegrationPatchData is the typed request payload for SignalIntegration.PatchTyped.
type SignalIntegrationPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ApiToken *string `json:"api_token,omitempty"`
	Config *map[string]any `json:"config,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
	WebhookSecret *string `json:"webhook_secret,omitempty"`
}

// SignalIntegrationRemoveMatch is the typed request payload for SignalIntegration.RemoveTyped.
type SignalIntegrationRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SignalIntegrationDelivery is the typed data model for the signal_integration_delivery entity.
type SignalIntegrationDelivery struct {
}

// SignalIntegrationDeliveryListMatch is the typed request payload for SignalIntegrationDelivery.ListTyped.
type SignalIntegrationDeliveryListMatch struct {
	OrganizationId string `json:"organization_id"`
	SignalIntegrationId string `json:"signal_integration_id"`
	Limit *int `json:"limit,omitempty"`
}

// SignalIntegrationTarget is the typed data model for the signal_integration_target entity.
type SignalIntegrationTarget struct {
}

// SignalIntegrationTargetListMatch is the typed request payload for SignalIntegrationTarget.ListTyped.
type SignalIntegrationTargetListMatch struct {
	OrganizationId string `json:"organization_id"`
	SignalIntegrationId string `json:"signal_integration_id"`
}

// SignalIntegrationTargetUpdateData is the typed request payload for SignalIntegrationTarget.UpdateTyped.
type SignalIntegrationTargetUpdateData struct {
	OrganizationId string `json:"organization_id"`
	SignalIntegrationId string `json:"signal_integration_id"`
	Targets *[]any `json:"targets,omitempty"`
}

// SignalSubscription is the typed data model for the signal_subscription entity.
type SignalSubscription struct {
}

// SignalSubscriptionLoadMatch is the typed request payload for SignalSubscription.LoadTyped.
type SignalSubscriptionLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
}

// SignalSubscriptionCreateData is the typed request payload for SignalSubscription.CreateTyped.
type SignalSubscriptionCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// SignalSubscriptionUpdateData is the typed request payload for SignalSubscription.UpdateTyped.
type SignalSubscriptionUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SignalSubscriptionPatchData is the typed request payload for SignalSubscription.PatchTyped.
type SignalSubscriptionPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SignalSubscriptionRemoveMatch is the typed request payload for SignalSubscription.RemoveTyped.
type SignalSubscriptionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// Site is the typed data model for the site entity.
type Site struct {
}

// SiteListMatch is the typed request payload for Site.ListTyped.
type SiteListMatch struct {
	OrganizationId string `json:"organization_id"`
	Site *string `json:"site,omitempty"`
}

// SiteAccessKey is the typed data model for the site_access_key entity.
type SiteAccessKey struct {
}

// SiteAccessKeyLoadMatch is the typed request payload for SiteAccessKey.LoadTyped.
type SiteAccessKeyLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	SiteId string `json:"site_id"`
}

// SiteAccessKeyCreateData is the typed request payload for SiteAccessKey.CreateTyped.
type SiteAccessKeyCreateData struct {
	OrganizationId string `json:"organization_id"`
	SiteId string `json:"site_id"`
}

// SiteAccessKeyRemoveMatch is the typed request payload for SiteAccessKey.RemoveTyped.
type SiteAccessKeyRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SiteId string `json:"site_id"`
}

// SitePreview is the typed data model for the site_preview entity.
type SitePreview struct {
}

// SitePreviewLoadMatch is the typed request payload for SitePreview.LoadTyped.
type SitePreviewLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Url string `json:"url"`
}

// SiteSecret is the typed data model for the site_secret entity.
type SiteSecret struct {
}

// SiteSecretUpdateData is the typed request payload for SiteSecret.UpdateTyped.
type SiteSecretUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SiteId string `json:"site_id"`
	NativeAgentId *string `json:"native_agent_id,omitempty"`
	Value *string `json:"value,omitempty"`
}

// SiteSecretRemoveMatch is the typed request payload for SiteSecret.RemoveTyped.
type SiteSecretRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	SiteId string `json:"site_id"`
}

// SlackChannel is the typed data model for the slack_channel entity.
type SlackChannel struct {
}

// SlackChannelListMatch is the typed request payload for SlackChannel.ListTyped.
type SlackChannelListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Q *string `json:"q,omitempty"`
	Refresh *bool `json:"refresh,omitempty"`
}

// SourceConnection is the typed data model for the source_connection entity.
type SourceConnection struct {
}

// SourceConnectionCreateData is the typed request payload for SourceConnection.CreateTyped.
type SourceConnectionCreateData struct {
	Id string `json:"id"`
}

// SpaceAlertRule is the typed data model for the space_alert_rule entity.
type SpaceAlertRule struct {
}

// SpaceAlertRuleLoadMatch is the typed request payload for SpaceAlertRule.LoadTyped.
type SpaceAlertRuleLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceAlertRuleCreateData is the typed request payload for SpaceAlertRule.CreateTyped.
type SpaceAlertRuleCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceAlertRuleUpdateData is the typed request payload for SpaceAlertRule.UpdateTyped.
type SpaceAlertRuleUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceAlertRulePatchData is the typed request payload for SpaceAlertRule.PatchTyped.
type SpaceAlertRulePatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceAlertRuleRemoveMatch is the typed request payload for SpaceAlertRule.RemoveTyped.
type SpaceAlertRuleRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceAuditEvent is the typed data model for the space_audit_event entity.
type SpaceAuditEvent struct {
}

// SpaceAuditEventLoadMatch is the typed request payload for SpaceAuditEvent.LoadTyped.
type SpaceAuditEventLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceAuditEventCreateData is the typed request payload for SpaceAuditEvent.CreateTyped.
type SpaceAuditEventCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceDnsRecord is the typed data model for the space_dns_record entity.
type SpaceDnsRecord struct {
}

// SpaceDnsRecordLoadMatch is the typed request payload for SpaceDnsRecord.LoadTyped.
type SpaceDnsRecordLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceDnsRecordCreateData is the typed request payload for SpaceDnsRecord.CreateTyped.
type SpaceDnsRecordCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceDnsRecordUpdateData is the typed request payload for SpaceDnsRecord.UpdateTyped.
type SpaceDnsRecordUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceDnsRecordPatchData is the typed request payload for SpaceDnsRecord.PatchTyped.
type SpaceDnsRecordPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceDnsRecordRemoveMatch is the typed request payload for SpaceDnsRecord.RemoveTyped.
type SpaceDnsRecordRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceEnrollmentToken is the typed data model for the space_enrollment_token entity.
type SpaceEnrollmentToken struct {
}

// SpaceEnrollmentTokenLoadMatch is the typed request payload for SpaceEnrollmentToken.LoadTyped.
type SpaceEnrollmentTokenLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceEnrollmentTokenCreateData is the typed request payload for SpaceEnrollmentToken.CreateTyped.
type SpaceEnrollmentTokenCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceEnrollmentTokenUpdateData is the typed request payload for SpaceEnrollmentToken.UpdateTyped.
type SpaceEnrollmentTokenUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceEnrollmentTokenPatchData is the typed request payload for SpaceEnrollmentToken.PatchTyped.
type SpaceEnrollmentTokenPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceEnrollmentTokenRemoveMatch is the typed request payload for SpaceEnrollmentToken.RemoveTyped.
type SpaceEnrollmentTokenRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGateway is the typed data model for the space_gateway entity.
type SpaceGateway struct {
}

// SpaceGatewayLoadMatch is the typed request payload for SpaceGateway.LoadTyped.
type SpaceGatewayLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceGatewayCreateData is the typed request payload for SpaceGateway.CreateTyped.
type SpaceGatewayCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceGatewayUpdateData is the typed request payload for SpaceGateway.UpdateTyped.
type SpaceGatewayUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGatewayPatchData is the typed request payload for SpaceGateway.PatchTyped.
type SpaceGatewayPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGatewayRemoveMatch is the typed request payload for SpaceGateway.RemoveTyped.
type SpaceGatewayRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroup is the typed data model for the space_group entity.
type SpaceGroup struct {
}

// SpaceGroupLoadMatch is the typed request payload for SpaceGroup.LoadTyped.
type SpaceGroupLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceGroupCreateData is the typed request payload for SpaceGroup.CreateTyped.
type SpaceGroupCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceGroupUpdateData is the typed request payload for SpaceGroup.UpdateTyped.
type SpaceGroupUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroupPatchData is the typed request payload for SpaceGroup.PatchTyped.
type SpaceGroupPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroupRemoveMatch is the typed request payload for SpaceGroup.RemoveTyped.
type SpaceGroupRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroupMembership is the typed data model for the space_group_membership entity.
type SpaceGroupMembership struct {
}

// SpaceGroupMembershipLoadMatch is the typed request payload for SpaceGroupMembership.LoadTyped.
type SpaceGroupMembershipLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceGroupMembershipCreateData is the typed request payload for SpaceGroupMembership.CreateTyped.
type SpaceGroupMembershipCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceGroupMembershipUpdateData is the typed request payload for SpaceGroupMembership.UpdateTyped.
type SpaceGroupMembershipUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroupMembershipPatchData is the typed request payload for SpaceGroupMembership.PatchTyped.
type SpaceGroupMembershipPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceGroupMembershipRemoveMatch is the typed request payload for SpaceGroupMembership.RemoveTyped.
type SpaceGroupMembershipRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceLogStream is the typed data model for the space_log_stream entity.
type SpaceLogStream struct {
}

// SpaceLogStreamLoadMatch is the typed request payload for SpaceLogStream.LoadTyped.
type SpaceLogStreamLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceLogStreamCreateData is the typed request payload for SpaceLogStream.CreateTyped.
type SpaceLogStreamCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceMetricSery is the typed data model for the space_metric_sery entity.
type SpaceMetricSery struct {
}

// SpaceMetricSeryLoadMatch is the typed request payload for SpaceMetricSery.LoadTyped.
type SpaceMetricSeryLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceMetricSeryCreateData is the typed request payload for SpaceMetricSery.CreateTyped.
type SpaceMetricSeryCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceOtelCollector is the typed data model for the space_otel_collector entity.
type SpaceOtelCollector struct {
}

// SpaceOtelCollectorLoadMatch is the typed request payload for SpaceOtelCollector.LoadTyped.
type SpaceOtelCollectorLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceOtelCollectorCreateData is the typed request payload for SpaceOtelCollector.CreateTyped.
type SpaceOtelCollectorCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceOtelCollectorUpdateData is the typed request payload for SpaceOtelCollector.UpdateTyped.
type SpaceOtelCollectorUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceOtelCollectorPatchData is the typed request payload for SpaceOtelCollector.PatchTyped.
type SpaceOtelCollectorPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceOtelCollectorRemoveMatch is the typed request payload for SpaceOtelCollector.RemoveTyped.
type SpaceOtelCollectorRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeer is the typed data model for the space_peer entity.
type SpacePeer struct {
}

// SpacePeerLoadMatch is the typed request payload for SpacePeer.LoadTyped.
type SpacePeerLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpacePeerCreateData is the typed request payload for SpacePeer.CreateTyped.
type SpacePeerCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpacePeerUpdateData is the typed request payload for SpacePeer.UpdateTyped.
type SpacePeerUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeerPatchData is the typed request payload for SpacePeer.PatchTyped.
type SpacePeerPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeerRemoveMatch is the typed request payload for SpacePeer.RemoveTyped.
type SpacePeerRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeerAttachment is the typed data model for the space_peer_attachment entity.
type SpacePeerAttachment struct {
}

// SpacePeerAttachmentLoadMatch is the typed request payload for SpacePeerAttachment.LoadTyped.
type SpacePeerAttachmentLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpacePeerAttachmentCreateData is the typed request payload for SpacePeerAttachment.CreateTyped.
type SpacePeerAttachmentCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpacePeerAttachmentUpdateData is the typed request payload for SpacePeerAttachment.UpdateTyped.
type SpacePeerAttachmentUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeerAttachmentPatchData is the typed request payload for SpacePeerAttachment.PatchTyped.
type SpacePeerAttachmentPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePeerAttachmentRemoveMatch is the typed request payload for SpacePeerAttachment.RemoveTyped.
type SpacePeerAttachmentRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePolicy is the typed data model for the space_policy entity.
type SpacePolicy struct {
}

// SpacePolicyLoadMatch is the typed request payload for SpacePolicy.LoadTyped.
type SpacePolicyLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpacePolicyCreateData is the typed request payload for SpacePolicy.CreateTyped.
type SpacePolicyCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpacePolicyUpdateData is the typed request payload for SpacePolicy.UpdateTyped.
type SpacePolicyUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePolicyPatchData is the typed request payload for SpacePolicy.PatchTyped.
type SpacePolicyPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpacePolicyRemoveMatch is the typed request payload for SpacePolicy.RemoveTyped.
type SpacePolicyRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceSegment is the typed data model for the space_segment entity.
type SpaceSegment struct {
}

// SpaceSegmentLoadMatch is the typed request payload for SpaceSegment.LoadTyped.
type SpaceSegmentLoadMatch struct {
	Id *string `json:"id,omitempty"`
	SpaceId string `json:"space_id"`
}

// SpaceSegmentCreateData is the typed request payload for SpaceSegment.CreateTyped.
type SpaceSegmentCreateData struct {
	SpaceId string `json:"space_id"`
}

// SpaceSegmentUpdateData is the typed request payload for SpaceSegment.UpdateTyped.
type SpaceSegmentUpdateData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceSegmentPatchData is the typed request payload for SpaceSegment.PatchTyped.
type SpaceSegmentPatchData struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceSegmentRemoveMatch is the typed request payload for SpaceSegment.RemoveTyped.
type SpaceSegmentRemoveMatch struct {
	Id string `json:"id"`
	SpaceId string `json:"space_id"`
}

// SpaceTraceSpan is the typed data model for the space_trace_span entity.
type SpaceTraceSpan struct {
}

// SpaceTraceSpanLoadMatch is the typed request payload for SpaceTraceSpan.LoadTyped.
type SpaceTraceSpanLoadMatch struct {
	SpaceId string `json:"space_id"`
}

// SpaceTraceSpanCreateData is the typed request payload for SpaceTraceSpan.CreateTyped.
type SpaceTraceSpanCreateData struct {
	SpaceId string `json:"space_id"`
}

// Spark is the typed data model for the spark entity.
type Spark struct {
}

// SparkLoadMatch is the typed request payload for Spark.LoadTyped.
type SparkLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// SparkCreateData is the typed request payload for Spark.CreateTyped.
type SparkCreateData struct {
	Id *string `json:"id,omitempty"`
	Jsonrpc string `json:"jsonrpc"`
	Method string `json:"method"`
	Params *map[string]any `json:"params,omitempty"`
}

// SparkAgentIntegration is the typed data model for the spark_agent_integration entity.
type SparkAgentIntegration struct {
}

// SparkAgentIntegrationLoadMatch is the typed request payload for SparkAgentIntegration.LoadTyped.
type SparkAgentIntegrationLoadMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	CatalogQ *string `json:"catalog_q,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Toolkit *string `json:"toolkit,omitempty"`
}

// SparkAgentIntegrationCreateData is the typed request payload for SparkAgentIntegration.CreateTyped.
type SparkAgentIntegrationCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Toolkit *string `json:"toolkit,omitempty"`
	ConnectionId string `json:"connection_id"`
	Enabled bool `json:"enabled"`
	Generation int `json:"generation"`
}

// SparkAgentLocalThread is the typed data model for the spark_agent_local_thread entity.
type SparkAgentLocalThread struct {
}

// SparkAgentLocalThreadLoadMatch is the typed request payload for SparkAgentLocalThread.LoadTyped.
type SparkAgentLocalThreadLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SparkAgentLocalThreadCreateData is the typed request payload for SparkAgentLocalThread.CreateTyped.
type SparkAgentLocalThreadCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	DeviceId string `json:"device_id"`
	Key string `json:"key"`
	Provider string `json:"provider"`
	ResultSchema *any `json:"result_schema,omitempty"`
	ThreadId string `json:"thread_id"`
}

// SparkAgentLocalThreadUpdateData is the typed request payload for SparkAgentLocalThread.UpdateTyped.
type SparkAgentLocalThreadUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AllowedSenders *any `json:"allowed_senders,omitempty"`
	AskFirst *any `json:"ask_first,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
	ReplyWithFinalAnswer *any `json:"reply_with_final_answer,omitempty"`
	Restricted *any `json:"restricted,omitempty"`
}

// SparkAgentSite is the typed data model for the spark_agent_site entity.
type SparkAgentSite struct {
}

// SparkAgentSiteListMatch is the typed request payload for SparkAgentSite.ListTyped.
type SparkAgentSiteListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// SparkAgentSkill is the typed data model for the spark_agent_skill entity.
type SparkAgentSkill struct {
}

// SparkAgentSkillListMatch is the typed request payload for SparkAgentSkill.ListTyped.
type SparkAgentSkillListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// SparkAgentSkillCreateData is the typed request payload for SparkAgentSkill.CreateTyped.
type SparkAgentSkillCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Enabled bool `json:"enabled"`
	Name string `json:"name"`
	Version string `json:"version"`
}

// SparkAgentThread is the typed data model for the spark_agent_thread entity.
type SparkAgentThread struct {
}

// SparkAgentThreadListMatch is the typed request payload for SparkAgentThread.ListTyped.
type SparkAgentThreadListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Archived *bool `json:"archived,omitempty"`
	ConversationId *string `json:"conversation_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	LocalCursor *string `json:"local_cursor,omitempty"`
}

// SparkAgentThreadCreateData is the typed request payload for SparkAgentThread.CreateTyped.
type SparkAgentThreadCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Execution *any `json:"execution,omitempty"`
	InheritContext *bool `json:"inherit_context,omitempty"`
	Message *string `json:"message,omitempty"`
	ParentConversationId *string `json:"parent_conversation_id,omitempty"`
	RequesterMembershipId *string `json:"requester_membership_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// SparkAutomation is the typed data model for the spark_automation entity.
type SparkAutomation struct {
}

// SparkAutomationLoadMatch is the typed request payload for SparkAutomation.LoadTyped.
type SparkAutomationLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SparkAutomationListMatch is the typed request payload for SparkAutomation.ListTyped.
type SparkAutomationListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// SparkAutomationUpdateData is the typed request payload for SparkAutomation.UpdateTyped.
type SparkAutomationUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Definition *map[string]any `json:"definition,omitempty"`
	ExpectedRevision *int `json:"expected_revision,omitempty"`
}

// SparkCredit is the typed data model for the spark_credit entity.
type SparkCredit struct {
}

// SparkCreditLoadMatch is the typed request payload for SparkCredit.LoadTyped.
type SparkCreditLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	View *string `json:"view,omitempty"`
}

// SparkCreditCreateData is the typed request payload for SparkCredit.CreateTyped.
type SparkCreditCreateData struct {
	OrganizationId string `json:"organization_id"`
	AmountCents *int `json:"amount_cents,omitempty"`
	BillingUnit *string `json:"billing_unit,omitempty"`
	Kind string `json:"kind"`
	Plan *any `json:"plan,omitempty"`
	QuotedCreditsCents *int `json:"quoted_credits_cents,omitempty"`
	QuotedPriceCents *int `json:"quoted_price_cents,omitempty"`
	RequestKey string `json:"request_key"`
}

// SparkCreditUpdateData is the typed request payload for SparkCredit.UpdateTyped.
type SparkCreditUpdateData struct {
	OrganizationId string `json:"organization_id"`
}

// SparkCreditPatchData is the typed request payload for SparkCredit.PatchTyped.
type SparkCreditPatchData struct {
	OrganizationId string `json:"organization_id"`
	View *string `json:"view,omitempty"`
	Settings *any `json:"settings,omitempty"`
}

// SparkCreditAgentUsage is the typed data model for the spark_credit_agent_usage entity.
type SparkCreditAgentUsage struct {
}

// SparkCreditAgentUsageLoadMatch is the typed request payload for SparkCreditAgentUsage.LoadTyped.
type SparkCreditAgentUsageLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// SparkCreditUsageTotal is the typed data model for the spark_credit_usage_total entity.
type SparkCreditUsageTotal struct {
}

// SparkCreditUsageTotalLoadMatch is the typed request payload for SparkCreditUsageTotal.LoadTyped.
type SparkCreditUsageTotalLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// StaticSite is the typed data model for the static_site entity.
type StaticSite struct {
}

// StaticSiteLoadMatch is the typed request payload for StaticSite.LoadTyped.
type StaticSiteLoadMatch struct {
	Id string `json:"id"`
}

// StaticSiteListMatch is the typed request payload for StaticSite.ListTyped.
type StaticSiteListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// StaticSiteCreateData is the typed request payload for StaticSite.CreateTyped.
type StaticSiteCreateData struct {
	OrganizationId string `json:"organization_id"`
	Description *any `json:"description,omitempty"`
	ErrorDocument *any `json:"error_document,omitempty"`
	HostedAppId *any `json:"hosted_app_id,omitempty"`
	IndexDocument *string `json:"index_document,omitempty"`
	Name string `json:"name"`
	Region *any `json:"region,omitempty"`
	ReplicationRegions *[]any `json:"replication_regions,omitempty"`
	RepositoryId *any `json:"repository_id,omitempty"`
	Slug string `json:"slug"`
}

// StaticSiteUpdateData is the typed request payload for StaticSite.UpdateTyped.
type StaticSiteUpdateData struct {
	Id string `json:"id"`
}

// StaticSitePatchData is the typed request payload for StaticSite.PatchTyped.
type StaticSitePatchData struct {
	Id string `json:"id"`
}

// StaticSiteRemoveMatch is the typed request payload for StaticSite.RemoveTyped.
type StaticSiteRemoveMatch struct {
	Id string `json:"id"`
}

// StaticSiteDeployment is the typed data model for the static_site_deployment entity.
type StaticSiteDeployment struct {
}

// StaticSiteDeploymentLoadMatch is the typed request payload for StaticSiteDeployment.LoadTyped.
type StaticSiteDeploymentLoadMatch struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDeploymentListMatch is the typed request payload for StaticSiteDeployment.ListTyped.
type StaticSiteDeploymentListMatch struct {
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDeploymentCreateData is the typed request payload for StaticSiteDeployment.CreateTyped.
type StaticSiteDeploymentCreateData struct {
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDomain is the typed data model for the static_site_domain entity.
type StaticSiteDomain struct {
}

// StaticSiteDomainLoadMatch is the typed request payload for StaticSiteDomain.LoadTyped.
type StaticSiteDomainLoadMatch struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDomainListMatch is the typed request payload for StaticSiteDomain.ListTyped.
type StaticSiteDomainListMatch struct {
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDomainCreateData is the typed request payload for StaticSiteDomain.CreateTyped.
type StaticSiteDomainCreateData struct {
	StaticSiteId string `json:"static_site_id"`
	DnsMode *string `json:"dns_mode,omitempty"`
	Hostname string `json:"hostname"`
	Kind *string `json:"kind,omitempty"`
	RedirectTo *any `json:"redirect_to,omitempty"`
}

// StaticSiteDomainUpdateData is the typed request payload for StaticSiteDomain.UpdateTyped.
type StaticSiteDomainUpdateData struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDomainPatchData is the typed request payload for StaticSiteDomain.PatchTyped.
type StaticSiteDomainPatchData struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// StaticSiteDomainRemoveMatch is the typed request payload for StaticSiteDomain.RemoveTyped.
type StaticSiteDomainRemoveMatch struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// StatusChange is the typed data model for the status_change entity.
type StatusChange struct {
}

// StatusChangeLoadMatch is the typed request payload for StatusChange.LoadTyped.
type StatusChangeLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// StatusCommit is the typed data model for the status_commit entity.
type StatusCommit struct {
}

// StatusCommitLoadMatch is the typed request payload for StatusCommit.LoadTyped.
type StatusCommitLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// StatusPatchset is the typed data model for the status_patchset entity.
type StatusPatchset struct {
}

// StatusPatchsetLoadMatch is the typed request payload for StatusPatchset.LoadTyped.
type StatusPatchsetLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// StripeWebhook is the typed data model for the stripe_webhook entity.
type StripeWebhook struct {
}

// StripeWebhookCreateData is the typed request payload for StripeWebhook.CreateTyped.
type StripeWebhookCreateData struct {
}

// SubmitTelemetry is the typed data model for the submit_telemetry entity.
type SubmitTelemetry struct {
}

// SubmitTelemetryCreateData is the typed request payload for SubmitTelemetry.CreateTyped.
type SubmitTelemetryCreateData struct {
}

// SubscriptionModel is the typed data model for the subscription_model entity.
type SubscriptionModel struct {
}

// SubscriptionModelListMatch is the typed request payload for SubscriptionModel.ListTyped.
type SubscriptionModelListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ProfileId string `json:"profile_id"`
}

// SwarmEvent is the typed data model for the swarm_event entity.
type SwarmEvent struct {
}

// SwarmEventListMatch is the typed request payload for SwarmEvent.ListTyped.
type SwarmEventListMatch struct {
	SwarmId string `json:"swarm_id"`
	After *int `json:"after,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// SwarmLive is the typed data model for the swarm_live entity.
type SwarmLive struct {
}

// SwarmLiveLoadMatch is the typed request payload for SwarmLive.LoadTyped.
type SwarmLiveLoadMatch struct {
	SwarmId string `json:"swarm_id"`
	AfterEventId *int `json:"after_event_id,omitempty"`
	AfterSeq *int `json:"after_seq,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// SwarmNote is the typed data model for the swarm_note entity.
type SwarmNote struct {
}

// SwarmNoteCreateData is the typed request payload for SwarmNote.CreateTyped.
type SwarmNoteCreateData struct {
	SwarmId string `json:"swarm_id"`
	TaskId *any `json:"task_id,omitempty"`
	Text string `json:"text"`
}

// SwarmTask is the typed data model for the swarm_task entity.
type SwarmTask struct {
}

// SwarmTaskLoadMatch is the typed request payload for SwarmTask.LoadTyped.
type SwarmTaskLoadMatch struct {
	Id string `json:"id"`
	SwarmId string `json:"swarm_id"`
	AfterSeq *int `json:"after_seq,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// SwarmTaskListMatch is the typed request payload for SwarmTask.ListTyped.
type SwarmTaskListMatch struct {
	SwarmId string `json:"swarm_id"`
}

// TaskLease is the typed data model for the task_lease entity.
type TaskLease struct {
}

// TaskLeaseCreateData is the typed request payload for TaskLease.CreateTyped.
type TaskLeaseCreateData struct {
	SwarmId string `json:"swarm_id"`
	TaskId string `json:"task_id"`
}

// ThreadPreview is the typed data model for the thread_preview entity.
type ThreadPreview struct {
}

// ThreadPreviewCreateData is the typed request payload for ThreadPreview.CreateTyped.
type ThreadPreviewCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ThreadId string `json:"thread_id"`
	Port int `json:"port"`
}

// ThreadPreviewAccess is the typed data model for the thread_preview_access entity.
type ThreadPreviewAccess struct {
}

// ThreadPreviewAccessLoadMatch is the typed request payload for ThreadPreviewAccess.LoadTyped.
type ThreadPreviewAccessLoadMatch struct {
	Host string `json:"host"`
	ReturnTo *string `json:"return_to,omitempty"`
}

// ThreadPreviewAccessCreateData is the typed request payload for ThreadPreviewAccess.CreateTyped.
type ThreadPreviewAccessCreateData struct {
	Host *any `json:"host,omitempty"`
	Token *any `json:"token,omitempty"`
}

// ToolFeedback is the typed data model for the tool_feedback entity.
type ToolFeedback struct {
}

// ToolFeedbackLoadMatch is the typed request payload for ToolFeedback.LoadTyped.
type ToolFeedbackLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ToolFeedbackCreateData is the typed request payload for ToolFeedback.CreateTyped.
type ToolFeedbackCreateData struct {
	OrganizationId string `json:"organization_id"`
	Feedback map[string]any `json:"feedback"`
}

// Transcript is the typed data model for the transcript entity.
type Transcript struct {
}

// TranscriptLoadMatch is the typed request payload for Transcript.LoadTyped.
type TranscriptLoadMatch struct {
	AroundEvent *int `json:"around_event,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	EventDigest *string `json:"event_digest,omitempty"`
	IncludeTool *bool `json:"include_tool,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MaxByte *int `json:"max_byte,omitempty"`
	SourceRef *string `json:"source_ref,omitempty"`
}

// TranscriptListMatch is the typed request payload for Transcript.ListTyped.
type TranscriptListMatch struct {
	Change *string `json:"change,omitempty"`
	CheckpointCursor *string `json:"checkpoint_cursor,omitempty"`
	Commit *string `json:"commit,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Patchset *int `json:"patchset,omitempty"`
	Pr *string `json:"pr,omitempty"`
	Repo string `json:"repo"`
	Session *string `json:"session,omitempty"`
}

// TranscriptCreateData is the typed request payload for Transcript.CreateTyped.
type TranscriptCreateData struct {
	OrganizationId string `json:"organization_id"`
	Status string `json:"status"`
	Adapter *any `json:"adapter,omitempty"`
	Cursor *any `json:"cursor,omitempty"`
	From *any `json:"from,omitempty"`
	Limit *any `json:"limit,omitempty"`
	MaxBytes *any `json:"max_bytes,omitempty"`
	Mode *any `json:"mode,omitempty"`
	Query *any `json:"query,omitempty"`
	Repo *any `json:"repo,omitempty"`
	To *any `json:"to,omitempty"`
	User *any `json:"user,omitempty"`
}

// V1Message is the typed data model for the v1_message entity.
type V1Message struct {
}

// V1MessageCreateData is the typed request payload for V1Message.CreateTyped.
type V1MessageCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// VcBranch is the typed data model for the vc_branch entity.
type VcBranch struct {
}

// VcBranchListMatch is the typed request payload for VcBranch.ListTyped.
type VcBranchListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcBranchCreateData is the typed request payload for VcBranch.CreateTyped.
type VcBranchCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcBranchRemoveMatch is the typed request payload for VcBranch.RemoveTyped.
type VcBranchRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcBrowser is the typed data model for the vc_browser entity.
type VcBrowser struct {
}

// VcBrowserLoadMatch is the typed request payload for VcBrowser.LoadTyped.
type VcBrowserLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	File *string `json:"file,omitempty"`
	Path *string `json:"path,omitempty"`
	Ref string `json:"ref"`
	Recursive *bool `json:"recursive,omitempty"`
}

// VcChange is the typed data model for the vc_change entity.
type VcChange struct {
}

// VcChangeLoadMatch is the typed request payload for VcChange.LoadTyped.
type VcChangeLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcChangeListMatch is the typed request payload for VcChange.ListTyped.
type VcChangeListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Group *string `json:"group,omitempty"`
	Label *string `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Mine *bool `json:"mine,omitempty"`
	Page *int `json:"page,omitempty"`
	Status *string `json:"status,omitempty"`
	Target *string `json:"target,omitempty"`
}

// VcChangeCreateData is the typed request payload for VcChange.CreateTyped.
type VcChangeCreateData struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Description *any `json:"description,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Title string `json:"title"`
	Assets *any `json:"assets,omitempty"`
	Base *any `json:"base,omitempty"`
	Draft *any `json:"draft,omitempty"`
	DryRun *any `json:"dry_run,omitempty"`
	ExpectedBaseCommitId *any `json:"expected_base_commit_id,omitempty"`
	ExpectedHeadCommitId *any `json:"expected_head_commit_id,omitempty"`
	ExpectedReviewHeadCommitId *any `json:"expected_review_head_commit_id,omitempty"`
	ExpectedReviewPatchsetNumber *any `json:"expected_review_patchset_number,omitempty"`
	GitPublicationId *any `json:"git_publication_id,omitempty"`
	Head *any `json:"head,omitempty"`
	Into *any `json:"into,omitempty"`
	Message *any `json:"message,omitempty"`
	RemoveReviewers *any `json:"remove_reviewers,omitempty"`
	RequestId *any `json:"request_id,omitempty"`
	Reviewers *any `json:"reviewers,omitempty"`
	TranscriptChat *any `json:"transcript_chat,omitempty"`
}

// VcChangeUpdateData is the typed request payload for VcChange.UpdateTyped.
type VcChangeUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Description *any `json:"description,omitempty"`
	Assets *any `json:"assets,omitempty"`
}

// VcChangeGroup is the typed data model for the vc_change_group entity.
type VcChangeGroup struct {
}

// VcChangeGroupLoadMatch is the typed request payload for VcChangeGroup.LoadTyped.
type VcChangeGroupLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcChangeGroupListMatch is the typed request payload for VcChangeGroup.ListTyped.
type VcChangeGroupListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcChangeGroupCreateData is the typed request payload for VcChangeGroup.CreateTyped.
type VcChangeGroupCreateData struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Name string `json:"name"`
	Title *any `json:"title,omitempty"`
}

// VcFile is the typed data model for the vc_file entity.
type VcFile struct {
}

// VcFileListMatch is the typed request payload for VcFile.ListTyped.
type VcFileListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Prefix *string `json:"prefix,omitempty"`
	Ref string `json:"ref"`
}

// VcMergeQueue is the typed data model for the vc_merge_queue entity.
type VcMergeQueue struct {
}

// VcMergeQueueLoadMatch is the typed request payload for VcMergeQueue.LoadTyped.
type VcMergeQueueLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Change *string `json:"change,omitempty"`
	EntryId *string `json:"entry_id,omitempty"`
	Page *int `json:"page,omitempty"`
	WindowDay *int `json:"window_day,omitempty"`
}

// VcMergeQueueListMatch is the typed request payload for VcMergeQueue.ListTyped.
type VcMergeQueueListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Change *string `json:"change,omitempty"`
	EntryId *string `json:"entry_id,omitempty"`
	Page *int `json:"page,omitempty"`
	Target *string `json:"target,omitempty"`
	WindowDay *int `json:"window_day,omitempty"`
}

// VcMergeQueueCreateData is the typed request payload for VcMergeQueue.CreateTyped.
type VcMergeQueueCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
}

// VcMergeQueueUpdateData is the typed request payload for VcMergeQueue.UpdateTyped.
type VcMergeQueueUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Concurrency *any `json:"concurrency,omitempty"`
	Enabled *any `json:"enabled,omitempty"`
	ExpectedVersion *any `json:"expected_version,omitempty"`
}

// VcStack is the typed data model for the vc_stack entity.
type VcStack struct {
}

// VcStackLoadMatch is the typed request payload for VcStack.LoadTyped.
type VcStackLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcStackListMatch is the typed request payload for VcStack.ListTyped.
type VcStackListMatch struct {
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
}

// VcStackUpdateData is the typed request payload for VcStack.UpdateTyped.
type VcStackUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	RepoId string `json:"repo_id"`
	Name *any `json:"name,omitempty"`
}

// VcsNode is the typed data model for the vcs_node entity.
type VcsNode struct {
}

// VcsNodeListMatch is the typed request payload for VcsNode.ListTyped.
type VcsNodeListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// VcsSetting is the typed data model for the vcs_setting entity.
type VcsSetting struct {
}

// VcsSettingLoadMatch is the typed request payload for VcsSetting.LoadTyped.
type VcsSettingLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// VerificationProjectCredential is the typed data model for the verification_project_credential entity.
type VerificationProjectCredential struct {
}

// VerificationProjectCredentialLoadMatch is the typed request payload for VerificationProjectCredential.LoadTyped.
type VerificationProjectCredentialLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectCredentialListMatch is the typed request payload for VerificationProjectCredential.ListTyped.
type VerificationProjectCredentialListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectCredentialCreateData is the typed request payload for VerificationProjectCredential.CreateTyped.
type VerificationProjectCredentialCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	BrowserSession *string `json:"browser_session,omitempty"`
	ComposalInbox *bool `json:"composal_inbox,omitempty"`
	ComposalInboxUser *string `json:"composal_inbox_user,omitempty"`
	ComposalManagedGoogle *bool `json:"composal_managed_google,omitempty"`
	Cookies *string `json:"cookies,omitempty"`
	Description *any `json:"description,omitempty"`
	EmailLinkAuthOrigins *[]any `json:"email_link_auth_origins,omitempty"`
	Instructions *any `json:"instructions,omitempty"`
	LoginMethod string `json:"login_method"`
	LoginUrl *string `json:"login_url,omitempty"`
	Name string `json:"name"`
	Oidc *map[string]any `json:"oidc,omitempty"`
	Passkey *string `json:"passkey,omitempty"`
	Password *string `json:"password,omitempty"`
	RemoveBrowserAuthentication *bool `json:"remove_browser_authentication,omitempty"`
	RemoveTotp *bool `json:"remove_totp,omitempty"`
	TotpSecret *string `json:"totp_secret,omitempty"`
	Username *string `json:"username,omitempty"`
}

// VerificationProjectCredentialUpdateData is the typed request payload for VerificationProjectCredential.UpdateTyped.
type VerificationProjectCredentialUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	BrowserSession *string `json:"browser_session,omitempty"`
	ComposalInbox *bool `json:"composal_inbox,omitempty"`
	ComposalInboxUser *string `json:"composal_inbox_user,omitempty"`
	ComposalManagedGoogle *bool `json:"composal_managed_google,omitempty"`
	Cookies *string `json:"cookies,omitempty"`
	Description *any `json:"description,omitempty"`
	EmailLinkAuthOrigins *[]any `json:"email_link_auth_origins,omitempty"`
	Instructions *any `json:"instructions,omitempty"`
	LoginMethod *string `json:"login_method,omitempty"`
	LoginUrl *string `json:"login_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Oidc *map[string]any `json:"oidc,omitempty"`
	Passkey *string `json:"passkey,omitempty"`
	Password *string `json:"password,omitempty"`
	RemoveBrowserAuthentication *bool `json:"remove_browser_authentication,omitempty"`
	RemoveTotp *bool `json:"remove_totp,omitempty"`
	TotpSecret *string `json:"totp_secret,omitempty"`
	Username *string `json:"username,omitempty"`
}

// VerificationProjectCredentialPatchData is the typed request payload for VerificationProjectCredential.PatchTyped.
type VerificationProjectCredentialPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	BrowserSession *string `json:"browser_session,omitempty"`
	ComposalInbox *bool `json:"composal_inbox,omitempty"`
	ComposalInboxUser *string `json:"composal_inbox_user,omitempty"`
	ComposalManagedGoogle *bool `json:"composal_managed_google,omitempty"`
	Cookies *string `json:"cookies,omitempty"`
	Description *any `json:"description,omitempty"`
	EmailLinkAuthOrigins *[]any `json:"email_link_auth_origins,omitempty"`
	Instructions *any `json:"instructions,omitempty"`
	LoginMethod *string `json:"login_method,omitempty"`
	LoginUrl *string `json:"login_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Oidc *map[string]any `json:"oidc,omitempty"`
	Passkey *string `json:"passkey,omitempty"`
	Password *string `json:"password,omitempty"`
	RemoveBrowserAuthentication *bool `json:"remove_browser_authentication,omitempty"`
	RemoveTotp *bool `json:"remove_totp,omitempty"`
	TotpSecret *string `json:"totp_secret,omitempty"`
	Username *string `json:"username,omitempty"`
}

// VerificationProjectCredentialRemoveMatch is the typed request payload for VerificationProjectCredential.RemoveTyped.
type VerificationProjectCredentialRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Permanent *bool `json:"permanent,omitempty"`
}

// VerificationProjectPersona is the typed data model for the verification_project_persona entity.
type VerificationProjectPersona struct {
}

// VerificationProjectPersonaLoadMatch is the typed request payload for VerificationProjectPersona.LoadTyped.
type VerificationProjectPersonaLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectPersonaListMatch is the typed request payload for VerificationProjectPersona.ListTyped.
type VerificationProjectPersonaListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectPersonaCreateData is the typed request payload for VerificationProjectPersona.CreateTyped.
type VerificationProjectPersonaCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccessMode *string `json:"access_mode,omitempty"`
	Capabilities *any `json:"capabilities,omitempty"`
	CredentialId *any `json:"credential_id,omitempty"`
	Goals *any `json:"goals,omitempty"`
	Name string `json:"name"`
	Role string `json:"role"`
}

// VerificationProjectPersonaUpdateData is the typed request payload for VerificationProjectPersona.UpdateTyped.
type VerificationProjectPersonaUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccessMode *string `json:"access_mode,omitempty"`
	Capabilities *any `json:"capabilities,omitempty"`
	CredentialId *any `json:"credential_id,omitempty"`
	Goals *any `json:"goals,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *string `json:"role,omitempty"`
	Version *int `json:"version,omitempty"`
}

// VerificationProjectPersonaPatchData is the typed request payload for VerificationProjectPersona.PatchTyped.
type VerificationProjectPersonaPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	AccessMode *string `json:"access_mode,omitempty"`
	Capabilities *any `json:"capabilities,omitempty"`
	CredentialId *any `json:"credential_id,omitempty"`
	Goals *any `json:"goals,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *string `json:"role,omitempty"`
	Version *int `json:"version,omitempty"`
}

// VerificationProjectPersonaRemoveMatch is the typed request payload for VerificationProjectPersona.RemoveTyped.
type VerificationProjectPersonaRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectRun is the typed data model for the verification_project_run entity.
type VerificationProjectRun struct {
}

// VerificationProjectRunLoadMatch is the typed request payload for VerificationProjectRun.LoadTyped.
type VerificationProjectRunLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Diagnostic *bool `json:"diagnostic,omitempty"`
}

// VerificationProjectRunListMatch is the typed request payload for VerificationProjectRun.ListTyped.
type VerificationProjectRunListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Page *int `json:"page,omitempty"`
	Status *string `json:"status,omitempty"`
}

// VerificationProjectRunCreateData is the typed request payload for VerificationProjectRun.CreateTyped.
type VerificationProjectRunCreateData struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Concurrency int `json:"concurrency"`
	EnvironmentId any `json:"environment_id"`
	MaxSeconds int `json:"max_seconds"`
	RunPlanId *any `json:"run_plan_id,omitempty"`
	StartWhenPrepared bool `json:"start_when_prepared"`
	Digest *any `json:"digest,omitempty"`
	IdempotencyKey *any `json:"idempotency_key,omitempty"`
	Mode *any `json:"mode,omitempty"`
	RunPlanVersion *any `json:"run_plan_version,omitempty"`
	ScenarioFiles *any `json:"scenario_files,omitempty"`
	ScenarioIds *any `json:"scenario_ids,omitempty"`
	ViewerTimeZone *any `json:"viewer_time_zone,omitempty"`
}

// VerificationProjectScenario is the typed data model for the verification_project_scenario entity.
type VerificationProjectScenario struct {
}

// VerificationProjectScenarioLoadMatch is the typed request payload for VerificationProjectScenario.LoadTyped.
type VerificationProjectScenarioLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectScenarioListMatch is the typed request payload for VerificationProjectScenario.ListTyped.
type VerificationProjectScenarioListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
}

// VerificationProjectScenarioCreateData is the typed request payload for VerificationProjectScenario.CreateTyped.
type VerificationProjectScenarioCreateData struct {
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Actors *map[string]any `json:"actors,omitempty"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	Cleanup *[]any `json:"cleanup,omitempty"`
	Dependencies *[]any `json:"dependencies,omitempty"`
	Fixtures *[]any `json:"fixtures,omitempty"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	If *any `json:"if,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Name string `json:"name"`
	On *any `json:"on,omitempty"`
	Outcomes *[]any `json:"outcomes,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	PrimaryActor *any `json:"primary_actor,omitempty"`
	StartingConditions *any `json:"starting_conditions,omitempty"`
	Steps *[]any `json:"steps,omitempty"`
	Triggers *[]any `json:"triggers,omitempty"`
}

// VerificationProjectScenarioUpdateData is the typed request payload for VerificationProjectScenario.UpdateTyped.
type VerificationProjectScenarioUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Actors *map[string]any `json:"actors,omitempty"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	Cleanup *[]any `json:"cleanup,omitempty"`
	Dependencies *[]any `json:"dependencies,omitempty"`
	Fixtures *[]any `json:"fixtures,omitempty"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	If *any `json:"if,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	On *any `json:"on,omitempty"`
	Outcomes *[]any `json:"outcomes,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	PrimaryActor *any `json:"primary_actor,omitempty"`
	StartingConditions *any `json:"starting_conditions,omitempty"`
	Steps *[]any `json:"steps,omitempty"`
	Triggers *[]any `json:"triggers,omitempty"`
	Version *int `json:"version,omitempty"`
}

// VerificationProjectScenarioPatchData is the typed request payload for VerificationProjectScenario.PatchTyped.
type VerificationProjectScenarioPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId string `json:"project_id"`
	Actors *map[string]any `json:"actors,omitempty"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	Cleanup *[]any `json:"cleanup,omitempty"`
	Dependencies *[]any `json:"dependencies,omitempty"`
	Fixtures *[]any `json:"fixtures,omitempty"`
	IdentityProbe *any `json:"identity_probe,omitempty"`
	If *any `json:"if,omitempty"`
	Labels *[]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	On *any `json:"on,omitempty"`
	Outcomes *[]any `json:"outcomes,omitempty"`
	PersonaId *string `json:"persona_id,omitempty"`
	PrimaryActor *any `json:"primary_actor,omitempty"`
	StartingConditions *any `json:"starting_conditions,omitempty"`
	Steps *[]any `json:"steps,omitempty"`
	Triggers *[]any `json:"triggers,omitempty"`
	Version *int `json:"version,omitempty"`
}

// VerifyAppDomain is the typed data model for the verify_app_domain entity.
type VerifyAppDomain struct {
}

// VerifyAppDomainCreateData is the typed request payload for VerifyAppDomain.CreateTyped.
type VerifyAppDomainCreateData struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// VerifyBrowserSession is the typed data model for the verify_browser_session entity.
type VerifyBrowserSession struct {
}

// VerifyBrowserSessionLoadMatch is the typed request payload for VerifyBrowserSession.LoadTyped.
type VerifyBrowserSessionLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifyBrowserSessionCreateData is the typed request payload for VerifyBrowserSession.CreateTyped.
type VerifyBrowserSessionCreateData struct {
	OrganizationId string `json:"organization_id"`
	AccountId *string `json:"account_id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId string `json:"project_id"`
	Url string `json:"url"`
}

// VerifyBrowserSessionRemoveMatch is the typed request payload for VerifyBrowserSession.RemoveTyped.
type VerifyBrowserSessionRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifyEmailVerification is the typed data model for the verify_email_verification entity.
type VerifyEmailVerification struct {
}

// VerifyEmailVerificationLoadMatch is the typed request payload for VerifyEmailVerification.LoadTyped.
type VerifyEmailVerificationLoadMatch struct {
}

// VerifyEnvironment is the typed data model for the verify_environment entity.
type VerifyEnvironment struct {
}

// VerifyEnvironmentLoadMatch is the typed request payload for VerifyEnvironment.LoadTyped.
type VerifyEnvironmentLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// VerifyEnvironmentCreateData is the typed request payload for VerifyEnvironment.CreateTyped.
type VerifyEnvironmentCreateData struct {
	OrganizationId string `json:"organization_id"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	DefaultPolicy *map[string]any `json:"default_policy,omitempty"`
	ImessageNumber *any `json:"imessage_number,omitempty"`
	MessagingTesterNumber *any `json:"messaging_tester_number,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *any `json:"project_id,omitempty"`
	RepositoryId *any `json:"repository_id,omitempty"`
	Slug string `json:"slug"`
	TargetKind *any `json:"target_kind,omitempty"`
	TargetUrl *any `json:"target_url,omitempty"`
}

// VerifyEnvironmentUpdateData is the typed request payload for VerifyEnvironment.UpdateTyped.
type VerifyEnvironmentUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifyEnvironmentPatchData is the typed request payload for VerifyEnvironment.PatchTyped.
type VerifyEnvironmentPatchData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AllowedActions *string `json:"allowed_actions,omitempty"`
	ImessageNumber *any `json:"imessage_number,omitempty"`
	MessagingTesterNumber *any `json:"messaging_tester_number,omitempty"`
	Name *string `json:"name,omitempty"`
	TargetUrl *any `json:"target_url,omitempty"`
	VerifyNetworkConnectionId *any `json:"verify_network_connection_id,omitempty"`
	Version *int `json:"version,omitempty"`
}

// VerifyEnvironmentRemoveMatch is the typed request payload for VerifyEnvironment.RemoveTyped.
type VerifyEnvironmentRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifyEvidence is the typed data model for the verify_evidence entity.
type VerifyEvidence struct {
}

// VerifyEvidenceLoadMatch is the typed request payload for VerifyEvidence.LoadTyped.
type VerifyEvidenceLoadMatch struct {
	Id *string `json:"id,omitempty"`
	OrganizationId string `json:"organization_id"`
	AgentId *string `json:"agent_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	ExplorationId *string `json:"exploration_id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
	ScenarioRunId *string `json:"scenario_run_id,omitempty"`
}

// VerifyMergeRequest is the typed data model for the verify_merge_request entity.
type VerifyMergeRequest struct {
}

// VerifyMergeRequestLoadMatch is the typed request payload for VerifyMergeRequest.LoadTyped.
type VerifyMergeRequestLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// VerifyMergeRequestCreateData is the typed request payload for VerifyMergeRequest.CreateTyped.
type VerifyMergeRequestCreateData struct {
	OrganizationId string `json:"organization_id"`
	Branch *string `json:"branch,omitempty"`
	HeadSha *string `json:"head_sha,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	Number int `json:"number"`
	ProjectId *any `json:"project_id,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// VerifyPullRequest is the typed data model for the verify_pull_request entity.
type VerifyPullRequest struct {
}

// VerifyPullRequestLoadMatch is the typed request payload for VerifyPullRequest.LoadTyped.
type VerifyPullRequestLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// VerifyPullRequestCreateData is the typed request payload for VerifyPullRequest.CreateTyped.
type VerifyPullRequestCreateData struct {
	OrganizationId string `json:"organization_id"`
	Branch *string `json:"branch,omitempty"`
	CleanupOnly *bool `json:"cleanup_only,omitempty"`
	HeadSha *string `json:"head_sha,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	ImessageNumber *string `json:"imessage_number,omitempty"`
	Number *int `json:"number,omitempty"`
	PreviewUrl *any `json:"preview_url,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
}

// VerifyPullRequestRemoveMatch is the typed request payload for VerifyPullRequest.RemoveTyped.
type VerifyPullRequestRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifySignalIntegration is the typed data model for the verify_signal_integration entity.
type VerifySignalIntegration struct {
}

// VerifySignalIntegrationCreateData is the typed request payload for VerifySignalIntegration.CreateTyped.
type VerifySignalIntegrationCreateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// VerifyStaticSiteDomain is the typed data model for the verify_static_site_domain entity.
type VerifyStaticSiteDomain struct {
}

// VerifyStaticSiteDomainCreateData is the typed request payload for VerifyStaticSiteDomain.CreateTyped.
type VerifyStaticSiteDomainCreateData struct {
	Id string `json:"id"`
	StaticSiteId string `json:"static_site_id"`
}

// VersionLog is the typed data model for the version_log entity.
type VersionLog struct {
}

// VersionLogListMatch is the typed request payload for VersionLog.ListTyped.
type VersionLogListMatch struct {
	BinaryId string `json:"binary_id"`
	OrganizationId string `json:"organization_id"`
	VersionId string `json:"version_id"`
	ProjectId string `json:"project_id"`
}

// WaitlistApplication is the typed data model for the waitlist_application entity.
type WaitlistApplication struct {
}

// WaitlistApplicationCreateData is the typed request payload for WaitlistApplication.CreateTyped.
type WaitlistApplicationCreateData struct {
	CompanyName *any `json:"company_name,omitempty"`
	CompanySize *any `json:"company_size,omitempty"`
	Email *any `json:"email,omitempty"`
	InviteCode *any `json:"invite_code,omitempty"`
	Name *any `json:"name,omitempty"`
	UseCase *any `json:"use_case,omitempty"`
}

// WebBotAuth is the typed data model for the web_bot_auth entity.
type WebBotAuth struct {
}

// WebBotAuthCreateData is the typed request payload for WebBotAuth.CreateTyped.
type WebBotAuthCreateData struct {
	Origin string `json:"origin"`
}

// WebhookGitlab is the typed data model for the webhook_gitlab entity.
type WebhookGitlab struct {
}

// WebhookGitlabUpdateData is the typed request payload for WebhookGitlab.UpdateTyped.
type WebhookGitlabUpdateData struct {
	Id string `json:"id"`
}

// WorkflowRunStep is the typed data model for the workflow_run_step entity.
type WorkflowRunStep struct {
}

// WorkflowRunStepLoadMatch is the typed request payload for WorkflowRunStep.LoadTyped.
type WorkflowRunStepLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	WorkflowRunId string `json:"workflow_run_id"`
}

// WorkflowRunStopNotice is the typed data model for the workflow_run_stop_notice entity.
type WorkflowRunStopNotice struct {
}

// WorkflowRunStopNoticeCreateData is the typed request payload for WorkflowRunStopNotice.CreateTyped.
type WorkflowRunStopNoticeCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	WorkflowRunId string `json:"workflow_run_id"`
}

// WorkflowTriggerSkipped is the typed data model for the workflow_trigger_skipped entity.
type WorkflowTriggerSkipped struct {
}

// WorkflowTriggerSkippedCreateData is the typed request payload for WorkflowTriggerSkipped.CreateTyped.
type WorkflowTriggerSkippedCreateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	WorkflowTriggerId string `json:"workflow_trigger_id"`
}

// WorkspaceActivity is the typed data model for the workspace_activity entity.
type WorkspaceActivity struct {
}

// WorkspaceActivityLoadMatch is the typed request payload for WorkspaceActivity.LoadTyped.
type WorkspaceActivityLoadMatch struct {
	OrganizationId string `json:"organization_id"`
}

// WorkspaceActivityNotification is the typed data model for the workspace_activity_notification entity.
type WorkspaceActivityNotification struct {
}

// WorkspaceActivityNotificationUpdateData is the typed request payload for WorkspaceActivityNotification.UpdateTyped.
type WorkspaceActivityNotificationUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// WorkspaceSpace is the typed data model for the workspace_space entity.
type WorkspaceSpace struct {
}

// WorkspaceSpaceLoadMatch is the typed request payload for WorkspaceSpace.LoadTyped.
type WorkspaceSpaceLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// WorkspaceSpaceListMatch is the typed request payload for WorkspaceSpace.ListTyped.
type WorkspaceSpaceListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// WorkspaceSpaceCreateData is the typed request payload for WorkspaceSpace.CreateTyped.
type WorkspaceSpaceCreateData struct {
	OrganizationId string `json:"organization_id"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	Description *any `json:"description,omitempty"`
	IconName string `json:"icon_name"`
	Name string `json:"name"`
	Slug string `json:"slug"`
}

// WorkspaceSpacePreference is the typed data model for the workspace_space_preference entity.
type WorkspaceSpacePreference struct {
}

// WorkspaceSpacePreferenceUpdateData is the typed request payload for WorkspaceSpacePreference.UpdateTyped.
type WorkspaceSpacePreferenceUpdateData struct {
	OrganizationId string `json:"organization_id"`
	Preferences *[]any `json:"preferences,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
