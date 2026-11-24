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

// AgentAutomation is the typed data model for the agent_automation entity.
type AgentAutomation struct {
}

// AgentAutomationLoadMatch is the typed request payload for AgentAutomation.LoadTyped.
type AgentAutomationLoadMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentAutomationListMatch is the typed request payload for AgentAutomation.ListTyped.
type AgentAutomationListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentAutomationUpdateData is the typed request payload for AgentAutomation.UpdateTyped.
type AgentAutomationUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Definition *map[string]any `json:"definition,omitempty"`
	ExpectedRevision *int `json:"expected_revision,omitempty"`
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
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// AgentConnectionListMatch is the typed request payload for AgentConnection.ListTyped.
type AgentConnectionListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	SelectedConnectionId *string `json:"selected_connection_id,omitempty"`
}

// AgentConnectionCreateData is the typed request payload for AgentConnection.CreateTyped.
type AgentConnectionCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	AgentCardUrl string `json:"agent_card_url"`
	AuthScheme string `json:"auth_scheme"`
	Credential *any `json:"credential,omitempty"`
	Name string `json:"name"`
	RemoteAgent *any `json:"remote_agent,omitempty"`
	SourceOperationId *any `json:"source_operation_id,omitempty"`
}

// AgentConnectionUpdateData is the typed request payload for AgentConnection.UpdateTyped.
type AgentConnectionUpdateData struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	AuthScheme *string `json:"auth_scheme,omitempty"`
	Credential *any `json:"credential,omitempty"`
	ExpectedGeneration *int `json:"expected_generation,omitempty"`
	Name *string `json:"name,omitempty"`
	RemoteAgent *any `json:"remote_agent,omitempty"`
}

// AgentConnectionRemoveMatch is the typed request payload for AgentConnection.RemoveTyped.
type AgentConnectionRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
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
	BrowserContext map[string]any `json:"browser_context"`
	ClientTime map[string]any `json:"client_time"`
	ConversationId string `json:"conversation_id"`
	ModelPolicy *any `json:"model_policy,omitempty"`
	RequesterMembershipId *string `json:"requester_membership_id,omitempty"`
	Speed *string `json:"speed,omitempty"`
	Text string `json:"text"`
}

// AgentIntegration is the typed data model for the agent_integration entity.
type AgentIntegration struct {
}

// AgentIntegrationListMatch is the typed request payload for AgentIntegration.ListTyped.
type AgentIntegrationListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	CatalogQ *string `json:"catalog_q,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Toolkit *string `json:"toolkit,omitempty"`
}

// AgentIntegrationCreateData is the typed request payload for AgentIntegration.CreateTyped.
type AgentIntegrationCreateData struct {
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

// AgentRepository is the typed data model for the agent_repository entity.
type AgentRepository struct {
}

// AgentRepositoryListMatch is the typed request payload for AgentRepository.ListTyped.
type AgentRepositoryListMatch struct {
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

// AgentSetting is the typed data model for the agent_setting entity.
type AgentSetting struct {
}

// AgentSettingListMatch is the typed request payload for AgentSetting.ListTyped.
type AgentSettingListMatch struct {
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

// AgentSiteListMatch is the typed request payload for AgentSite.ListTyped.
type AgentSiteListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// AgentSkill is the typed data model for the agent_skill entity.
type AgentSkill struct {
}

// AgentSkillListMatch is the typed request payload for AgentSkill.ListTyped.
type AgentSkillListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
}

// AgentSkillCreateData is the typed request payload for AgentSkill.CreateTyped.
type AgentSkillCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Enabled bool `json:"enabled"`
	Name string `json:"name"`
	Version string `json:"version"`
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

// AgentSubscriptionListMatch is the typed request payload for AgentSubscription.ListTyped.
type AgentSubscriptionListMatch struct {
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

// AgentThreadListMatch is the typed request payload for AgentThread.ListTyped.
type AgentThreadListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Archived *bool `json:"archived,omitempty"`
	ConversationId *string `json:"conversation_id,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	LocalCursor *string `json:"local_cursor,omitempty"`
}

// AgentThreadCreateData is the typed request payload for AgentThread.CreateTyped.
type AgentThreadCreateData struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	Execution *any `json:"execution,omitempty"`
	InheritContext *bool `json:"inherit_context,omitempty"`
	Message *string `json:"message,omitempty"`
	ParentConversationId *string `json:"parent_conversation_id,omitempty"`
	RequesterMembershipId *string `json:"requester_membership_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// AgentTool is the typed data model for the agent_tool entity.
type AgentTool struct {
}

// AgentToolListMatch is the typed request payload for AgentTool.ListTyped.
type AgentToolListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
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

// AgentWorkflowListMatch is the typed request payload for AgentWorkflow.ListTyped.
type AgentWorkflowListMatch struct {
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

// AllocationLog is the typed data model for the allocation_log entity.
type AllocationLog struct {
}

// AllocationLogListMatch is the typed request payload for AllocationLog.ListTyped.
type AllocationLogListMatch struct {
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

// AppCdn is the typed data model for the app_cdn entity.
type AppCdn struct {
}

// AppCdnLoadMatch is the typed request payload for AppCdn.LoadTyped.
type AppCdnLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// AppCdnListMatch is the typed request payload for AppCdn.ListTyped.
type AppCdnListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppConfigVariableListMatch is the typed request payload for AppConfigVariable.ListTyped.
type AppConfigVariableListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppDataResourceListMatch is the typed request payload for AppDataResource.ListTyped.
type AppDataResourceListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppDeploymentListMatch is the typed request payload for AppDeployment.ListTyped.
type AppDeploymentListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppEnvironmentListMatch is the typed request payload for AppEnvironment.ListTyped.
type AppEnvironmentListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppPreviewListMatch is the typed request payload for AppPreview.ListTyped.
type AppPreviewListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppPreviewProfileListMatch is the typed request payload for AppPreviewProfile.ListTyped.
type AppPreviewProfileListMatch struct {
	AppId string `json:"app_id"`
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

// AppRunListMatch is the typed request payload for AppRun.ListTyped.
type AppRunListMatch struct {
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
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
	Id string `json:"id"`
}

// AppServiceListMatch is the typed request payload for AppService.ListTyped.
type AppServiceListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppServiceBindingListMatch is the typed request payload for AppServiceBinding.ListTyped.
type AppServiceBindingListMatch struct {
	AppId string `json:"app_id"`
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
	Id string `json:"id"`
}

// AppStorageResourceListMatch is the typed request payload for AppStorageResource.ListTyped.
type AppStorageResourceListMatch struct {
	AppId string `json:"app_id"`
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

// CatalogSelector is the typed data model for the catalog_selector entity.
type CatalogSelector struct {
}

// CatalogSelectorListMatch is the typed request payload for CatalogSelector.ListTyped.
type CatalogSelectorListMatch struct {
	AppId string `json:"app_id"`
}

// CdnDeployment is the typed data model for the cdn_deployment entity.
type CdnDeployment struct {
}

// CdnDeploymentLoadMatch is the typed request payload for CdnDeployment.LoadTyped.
type CdnDeploymentLoadMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
	Id string `json:"id"`
}

// CdnDeploymentListMatch is the typed request payload for CdnDeployment.ListTyped.
type CdnDeploymentListMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
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
	Id string `json:"id"`
}

// CdnHostnameListMatch is the typed request payload for CdnHostname.ListTyped.
type CdnHostnameListMatch struct {
	AppId string `json:"app_id"`
	CdnId string `json:"cdn_id"`
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

// CdnSpaceListMatch is the typed request payload for CdnSpace.ListTyped.
type CdnSpaceListMatch struct {
	OrganizationId string `json:"organization_id"`
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
	Id string `json:"id"`
}

// CdnSpaceObjectListMatch is the typed request payload for CdnSpaceObject.ListTyped.
type CdnSpaceObjectListMatch struct {
	CdnSpaceId string `json:"cdn_space_id"`
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

// DeepScanMappedFlowListMatch is the typed request payload for DeepScanMappedFlow.ListTyped.
type DeepScanMappedFlowListMatch struct {
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

// DeploymentFile is the typed data model for the deployment_file entity.
type DeploymentFile struct {
}

// DeploymentFileUpdateData is the typed request payload for DeploymentFile.UpdateTyped.
type DeploymentFileUpdateData struct {
	DeploymentId string `json:"deployment_id"`
	StaticSiteId string `json:"static_site_id"`
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

// Environment is the typed data model for the environment entity.
type Environment struct {
}

// EnvironmentLoadMatch is the typed request payload for Environment.LoadTyped.
type EnvironmentLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// EnvironmentListMatch is the typed request payload for Environment.ListTyped.
type EnvironmentListMatch struct {
	OrganizationId string `json:"organization_id"`
	ProjectId *string `json:"project_id,omitempty"`
}

// EnvironmentCreateData is the typed request payload for Environment.CreateTyped.
type EnvironmentCreateData struct {
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

// EnvironmentUpdateData is the typed request payload for Environment.UpdateTyped.
type EnvironmentUpdateData struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// EnvironmentPatchData is the typed request payload for Environment.PatchTyped.
type EnvironmentPatchData struct {
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

// EnvironmentRemoveMatch is the typed request payload for Environment.RemoveTyped.
type EnvironmentRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
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

// EnvironmentSecretBindingListMatch is the typed request payload for EnvironmentSecretBinding.ListTyped.
type EnvironmentSecretBindingListMatch struct {
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

// Evidence is the typed data model for the evidence entity.
type Evidence struct {
}

// EvidenceLoadMatch is the typed request payload for Evidence.LoadTyped.
type EvidenceLoadMatch struct {
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

// GithubConnection is the typed data model for the github_connection entity.
type GithubConnection struct {
}

// GithubConnectionListMatch is the typed request payload for GithubConnection.ListTyped.
type GithubConnectionListMatch struct {
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

// HostingAppDomain is the typed data model for the hosting_app_domain entity.
type HostingAppDomain struct {
}

// HostingAppDomainLoadMatch is the typed request payload for HostingAppDomain.LoadTyped.
type HostingAppDomainLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
}

// HostingAppDomainListMatch is the typed request payload for HostingAppDomain.ListTyped.
type HostingAppDomainListMatch struct {
	AppId string `json:"app_id"`
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

// Integration is the typed data model for the integration entity.
type Integration struct {
}

// IntegrationListMatch is the typed request payload for Integration.ListTyped.
type IntegrationListMatch struct {
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

// MergeRequest is the typed data model for the merge_request entity.
type MergeRequest struct {
}

// MergeRequestLoadMatch is the typed request payload for MergeRequest.LoadTyped.
type MergeRequestLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// MergeRequestCreateData is the typed request payload for MergeRequest.CreateTyped.
type MergeRequestCreateData struct {
	OrganizationId string `json:"organization_id"`
	Branch *string `json:"branch,omitempty"`
	HeadSha *string `json:"head_sha,omitempty"`
	IdempotencyKey string `json:"idempotency_key"`
	Number int `json:"number"`
	ProjectId *any `json:"project_id,omitempty"`
	RepositoryId *string `json:"repository_id,omitempty"`
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
	Media map[string]any `json:"media"`
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

// MetricQueryListMatch is the typed request payload for MetricQuery.ListTyped.
type MetricQueryListMatch struct {
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

// NomadLogListMatch is the typed request payload for NomadLog.ListTyped.
type NomadLogListMatch struct {
	AppId string `json:"app_id"`
	Environment *string `json:"environment,omitempty"`
	Location *string `json:"location,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Origin *string `json:"origin,omitempty"`
	Service *string `json:"service,omitempty"`
	Task *string `json:"task,omitempty"`
	Type *string `json:"type,omitempty"`
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
	Limit *int `json:"limit,omitempty"`
}

// PageAgentListMatch is the typed request payload for PageAgent.ListTyped.
type PageAgentListMatch struct {
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

// PersonalAccessToken is the typed data model for the personal_access_token entity.
type PersonalAccessToken struct {
}

// PersonalAccessTokenListMatch is the typed request payload for PersonalAccessToken.ListTyped.
type PersonalAccessTokenListMatch struct {
	Id *string `json:"id,omitempty"`
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

// PreviewOperationListMatch is the typed request payload for PreviewOperation.ListTyped.
type PreviewOperationListMatch struct {
	AppId string `json:"app_id"`
	PreviewId string `json:"preview_id"`
}

// PreviewProfileSecretBinding is the typed data model for the preview_profile_secret_binding entity.
type PreviewProfileSecretBinding struct {
}

// PreviewProfileSecretBindingListMatch is the typed request payload for PreviewProfileSecretBinding.ListTyped.
type PreviewProfileSecretBindingListMatch struct {
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

// PreviewSharingApprovalListMatch is the typed request payload for PreviewSharingApproval.ListTyped.
type PreviewSharingApprovalListMatch struct {
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
	Target map[string]any `json:"target"`
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

// ProjectOverviewMetricListMatch is the typed request payload for ProjectOverviewMetric.ListTyped.
type ProjectOverviewMetricListMatch struct {
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
	IdentityProbe any `json:"identity_probe"`
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

// ProjectScenarioOptionListMatch is the typed request payload for ProjectScenarioOption.ListTyped.
type ProjectScenarioOptionListMatch struct {
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

// PullRequest is the typed data model for the pull_request entity.
type PullRequest struct {
}

// PullRequestLoadMatch is the typed request payload for PullRequest.LoadTyped.
type PullRequestLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
}

// PullRequestCreateData is the typed request payload for PullRequest.CreateTyped.
type PullRequestCreateData struct {
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

// PullRequestRemoveMatch is the typed request payload for PullRequest.RemoveTyped.
type PullRequestRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// PullRequestSetting is the typed data model for the pull_request_setting entity.
type PullRequestSetting struct {
}

// PullRequestSettingListMatch is the typed request payload for PullRequestSetting.ListTyped.
type PullRequestSettingListMatch struct {
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

// RelayAgentLocalThread is the typed data model for the relay_agent_local_thread entity.
type RelayAgentLocalThread struct {
}

// RelayAgentLocalThreadRemoveMatch is the typed request payload for RelayAgentLocalThread.RemoveTyped.
type RelayAgentLocalThreadRemoveMatch struct {
	AgentId string `json:"agent_id"`
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
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

// RunUpdateListMatch is the typed request payload for RunUpdate.ListTyped.
type RunUpdateListMatch struct {
	OrganizationId string `json:"organization_id"`
	Page *int `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	Status *string `json:"status,omitempty"`
	VerifyEnvironmentId *string `json:"verify_environment_id,omitempty"`
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

// ServiceEndpoint is the typed data model for the service_endpoint entity.
type ServiceEndpoint struct {
}

// ServiceEndpointLoadMatch is the typed request payload for ServiceEndpoint.LoadTyped.
type ServiceEndpointLoadMatch struct {
	AppId string `json:"app_id"`
	Id string `json:"id"`
	ServiceId string `json:"service_id"`
}

// ServiceEndpointListMatch is the typed request payload for ServiceEndpoint.ListTyped.
type ServiceEndpointListMatch struct {
	AppId string `json:"app_id"`
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

// SitePreview is the typed data model for the site_preview entity.
type SitePreview struct {
}

// SitePreviewLoadMatch is the typed request payload for SitePreview.LoadTyped.
type SitePreviewLoadMatch struct {
	OrganizationId string `json:"organization_id"`
	Url string `json:"url"`
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

// SubscriptionModel is the typed data model for the subscription_model entity.
type SubscriptionModel struct {
}

// SubscriptionModelListMatch is the typed request payload for SubscriptionModel.ListTyped.
type SubscriptionModelListMatch struct {
	AgentId string `json:"agent_id"`
	OrganizationId string `json:"organization_id"`
	ProfileId string `json:"profile_id"`
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

// WebBotAuth is the typed data model for the web_bot_auth entity.
type WebBotAuth struct {
}

// WebBotAuthCreateData is the typed request payload for WebBotAuth.CreateTyped.
type WebBotAuthCreateData struct {
	Origin string `json:"origin"`
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
