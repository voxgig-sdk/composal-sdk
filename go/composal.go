package voxgigcomposalsdk

import (
	"github.com/voxgig-sdk/composal-sdk/go/core"
	"github.com/voxgig-sdk/composal-sdk/go/entity"
	"github.com/voxgig-sdk/composal-sdk/go/feature"
	_ "github.com/voxgig-sdk/composal-sdk/go/utility"
)

// Type aliases preserve external API.
type ComposalSDK = core.ComposalSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ComposalEntityBase = core.ComposalEntityBase

// Deprecated: use ComposalEntityBase.
type ComposalEntity = core.ComposalEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ComposalError = core.ComposalError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewSecretsFeatureFunc = func() core.Feature {
		return feature.NewSecretsFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewA2aWellKnownEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewA2aWellKnownEntity(client, entopts)
	}
	core.NewAdminOrgEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAdminOrgEntity(client, entopts)
	}
	core.NewAgentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentEntity(client, entopts)
	}
	core.NewAgentAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentAppEntity(client, entopts)
	}
	core.NewAgentAppInstallEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentAppInstallEntity(client, entopts)
	}
	core.NewAgentAttachmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentAttachmentEntity(client, entopts)
	}
	core.NewAgentAutomationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentAutomationEntity(client, entopts)
	}
	core.NewAgentAvatarEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentAvatarEntity(client, entopts)
	}
	core.NewAgentCommandEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentCommandEntity(client, entopts)
	}
	core.NewAgentComputerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentComputerEntity(client, entopts)
	}
	core.NewAgentConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionEntity(client, entopts)
	}
	core.NewAgentConnectionDelegationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionDelegationEntity(client, entopts)
	}
	core.NewAgentConnectionGrantEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionGrantEntity(client, entopts)
	}
	core.NewAgentConnectionResourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionResourceEntity(client, entopts)
	}
	core.NewAgentConnectionSafetyControlEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionSafetyControlEntity(client, entopts)
	}
	core.NewAgentConnectionTriggerSubscriptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentConnectionTriggerSubscriptionEntity(client, entopts)
	}
	core.NewAgentContextCheckpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentContextCheckpointEntity(client, entopts)
	}
	core.NewAgentControlFlowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentControlFlowEntity(client, entopts)
	}
	core.NewAgentCoordinationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentCoordinationEntity(client, entopts)
	}
	core.NewAgentEmailEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentEmailEntity(client, entopts)
	}
	core.NewAgentEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentEventEntity(client, entopts)
	}
	core.NewAgentFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentFileEntity(client, entopts)
	}
	core.NewAgentInputEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentInputEntity(client, entopts)
	}
	core.NewAgentIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentIntegrationEntity(client, entopts)
	}
	core.NewAgentIntegrationAccountEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentIntegrationAccountEntity(client, entopts)
	}
	core.NewAgentIntegrationCallbackEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentIntegrationCallbackEntity(client, entopts)
	}
	core.NewAgentInteractionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentInteractionEntity(client, entopts)
	}
	core.NewAgentLibraryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentLibraryEntity(client, entopts)
	}
	core.NewAgentManagerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentManagerEntity(client, entopts)
	}
	core.NewAgentManagerChoiceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentManagerChoiceEntity(client, entopts)
	}
	core.NewAgentMarketplaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentMarketplaceEntity(client, entopts)
	}
	core.NewAgentMarketplaceSharedEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentMarketplaceSharedEntity(client, entopts)
	}
	core.NewAgentMissionControlEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentMissionControlEntity(client, entopts)
	}
	core.NewAgentOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentOperationEntity(client, entopts)
	}
	core.NewAgentProvisioningEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentProvisioningEntity(client, entopts)
	}
	core.NewAgentPullRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentPullRequestEntity(client, entopts)
	}
	core.NewAgentQuestionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentQuestionEntity(client, entopts)
	}
	core.NewAgentRelayFileGrantEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRelayFileGrantEntity(client, entopts)
	}
	core.NewAgentRelayFileGrantAccountEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRelayFileGrantAccountEntity(client, entopts)
	}
	core.NewAgentRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRepositoryEntity(client, entopts)
	}
	core.NewAgentResourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentResourceEntity(client, entopts)
	}
	core.NewAgentRoderEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRoderEntity(client, entopts)
	}
	core.NewAgentRoutineEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRoutineEntity(client, entopts)
	}
	core.NewAgentRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRunEntity(client, entopts)
	}
	core.NewAgentRuntimeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRuntimeEntity(client, entopts)
	}
	core.NewAgentSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSessionEntity(client, entopts)
	}
	core.NewAgentSessionCheckpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSessionCheckpointEntity(client, entopts)
	}
	core.NewAgentSessionRoderHandoffEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSessionRoderHandoffEntity(client, entopts)
	}
	core.NewAgentSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSettingEntity(client, entopts)
	}
	core.NewAgentSharingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSharingEntity(client, entopts)
	}
	core.NewAgentSiteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSiteEntity(client, entopts)
	}
	core.NewAgentSkillEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSkillEntity(client, entopts)
	}
	core.NewAgentSlackEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSlackEntity(client, entopts)
	}
	core.NewAgentSubagentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSubagentEntity(client, entopts)
	}
	core.NewAgentSubscriptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSubscriptionEntity(client, entopts)
	}
	core.NewAgentSwarmEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentSwarmEntity(client, entopts)
	}
	core.NewAgentTeammateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentTeammateEntity(client, entopts)
	}
	core.NewAgentTerminalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentTerminalEntity(client, entopts)
	}
	core.NewAgentThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentThreadEntity(client, entopts)
	}
	core.NewAgentToolEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentToolEntity(client, entopts)
	}
	core.NewAgentUsageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentUsageEntity(client, entopts)
	}
	core.NewAgentVerifyProjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentVerifyProjectEntity(client, entopts)
	}
	core.NewAgentWaitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWaitEntity(client, entopts)
	}
	core.NewAgentWebPreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWebPreviewEntity(client, entopts)
	}
	core.NewAgentWebhookEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWebhookEntity(client, entopts)
	}
	core.NewAgentWorkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkEntity(client, entopts)
	}
	core.NewAgentWorkflowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkflowEntity(client, entopts)
	}
	core.NewAgentWorkflowProposalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkflowProposalEntity(client, entopts)
	}
	core.NewAgentWorkflowRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkflowRunEntity(client, entopts)
	}
	core.NewAgentWorkflowTriggerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkflowTriggerEntity(client, entopts)
	}
	core.NewAgentWorkspaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWorkspaceEntity(client, entopts)
	}
	core.NewAgentWritePermissionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWritePermissionEntity(client, entopts)
	}
	core.NewAgreementEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgreementEntity(client, entopts)
	}
	core.NewAgreementAccessRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgreementAccessRequestEntity(client, entopts)
	}
	core.NewAlertRuleEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAlertRuleEventEntity(client, entopts)
	}
	core.NewAllocationLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAllocationLogEntity(client, entopts)
	}
	core.NewAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppEntity(client, entopts)
	}
	core.NewAppAccessEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppAccessEntity(client, entopts)
	}
	core.NewAppAccessJwkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppAccessJwkEntity(client, entopts)
	}
	core.NewAppCdnEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppCdnEntity(client, entopts)
	}
	core.NewAppConfigVariableEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppConfigVariableEntity(client, entopts)
	}
	core.NewAppDataResourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppDataResourceEntity(client, entopts)
	}
	core.NewAppDeployEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppDeployEntity(client, entopts)
	}
	core.NewAppDeploymentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppDeploymentEntity(client, entopts)
	}
	core.NewAppDeploymentOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppDeploymentOperationEntity(client, entopts)
	}
	core.NewAppDeploymentRollbackEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppDeploymentRollbackEntity(client, entopts)
	}
	core.NewAppEnvironmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppEnvironmentEntity(client, entopts)
	}
	core.NewAppLocationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppLocationEntity(client, entopts)
	}
	core.NewAppMetricEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppMetricEntity(client, entopts)
	}
	core.NewAppPreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppPreviewEntity(client, entopts)
	}
	core.NewAppPreviewProfileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppPreviewProfileEntity(client, entopts)
	}
	core.NewAppRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppRunEntity(client, entopts)
	}
	core.NewAppSecretEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppSecretEntity(client, entopts)
	}
	core.NewAppServiceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppServiceEntity(client, entopts)
	}
	core.NewAppServiceBindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppServiceBindingEntity(client, entopts)
	}
	core.NewAppServicePlacementEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppServicePlacementEntity(client, entopts)
	}
	core.NewAppStorageResourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppStorageResourceEntity(client, entopts)
	}
	core.NewArtefactEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtefactEntity(client, entopts)
	}
	core.NewArtefactCommentThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtefactCommentThreadEntity(client, entopts)
	}
	core.NewArtefactRevisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtefactRevisionEntity(client, entopts)
	}
	core.NewArtefactViewTokenEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtefactViewTokenEntity(client, entopts)
	}
	core.NewArtifactEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtifactEntity(client, entopts)
	}
	core.NewArtifactCacheNamespaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtifactCacheNamespaceEntity(client, entopts)
	}
	core.NewArtifactImageRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtifactImageRepositoryEntity(client, entopts)
	}
	core.NewArtifactPackageMirrorEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtifactPackageMirrorEntity(client, entopts)
	}
	core.NewArtifactRetentionPolicyEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewArtifactRetentionPolicyEntity(client, entopts)
	}
	core.NewAttachmentPartEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAttachmentPartEntity(client, entopts)
	}
	core.NewAuditEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuditEventEntity(client, entopts)
	}
	core.NewAuthEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthEntity(client, entopts)
	}
	core.NewAuthCliEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthCliEntity(client, entopts)
	}
	core.NewAuthGithubEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthGithubEntity(client, entopts)
	}
	core.NewAuthGoogleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthGoogleEntity(client, entopts)
	}
	core.NewAuthOpenaiEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthOpenaiEntity(client, entopts)
	}
	core.NewAuthPasswordResetEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthPasswordResetEntity(client, entopts)
	}
	core.NewAuthRegistrationOptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAuthRegistrationOptionEntity(client, entopts)
	}
	core.NewAutomationEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAutomationEventEntity(client, entopts)
	}
	core.NewAutomationRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAutomationRunEntity(client, entopts)
	}
	core.NewBackendRunnerPoolEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBackendRunnerPoolEntity(client, entopts)
	}
	core.NewBazelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelEntity(client, entopts)
	}
	core.NewBazelActionResultEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelActionResultEntity(client, entopts)
	}
	core.NewBazelBackendEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelBackendEntity(client, entopts)
	}
	core.NewBazelBlobEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelBlobEntity(client, entopts)
	}
	core.NewBazelExecutionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelExecutionEntity(client, entopts)
	}
	core.NewBazelFindMissingBlobEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBazelFindMissingBlobEntity(client, entopts)
	}
	core.NewBillingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingEntity(client, entopts)
	}
	core.NewBillingAddonEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingAddonEntity(client, entopts)
	}
	core.NewBillingCheckoutSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingCheckoutSessionEntity(client, entopts)
	}
	core.NewBillingInvoiceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingInvoiceEntity(client, entopts)
	}
	core.NewBillingPackageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingPackageEntity(client, entopts)
	}
	core.NewBillingPortalSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingPortalSessionEntity(client, entopts)
	}
	core.NewBillingPrepaidPeriodEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingPrepaidPeriodEntity(client, entopts)
	}
	core.NewBillingPrepaidPurchaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingPrepaidPurchaseEntity(client, entopts)
	}
	core.NewBillingTokenTopUpEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingTokenTopUpEntity(client, entopts)
	}
	core.NewBillingUsageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBillingUsageEntity(client, entopts)
	}
	core.NewBinaryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBinaryEntity(client, entopts)
	}
	core.NewBinaryVersionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBinaryVersionEntity(client, entopts)
	}
	core.NewBookmarkProtectionRefreshGithubRequiredCheckEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBookmarkProtectionRefreshGithubRequiredCheckEntity(client, entopts)
	}
	core.NewBrowserEgressCandidateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserEgressCandidateEntity(client, entopts)
	}
	core.NewBrowserSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionEntity(client, entopts)
	}
	core.NewBrowserSessionConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionConnectionEntity(client, entopts)
	}
	core.NewBrowserSessionControlEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionControlEntity(client, entopts)
	}
	core.NewBrowserSessionEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionEventEntity(client, entopts)
	}
	core.NewBrowserSessionMediaEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionMediaEntity(client, entopts)
	}
	core.NewBrowserSessionRecordingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionRecordingEntity(client, entopts)
	}
	core.NewBrowserSessionScreenshotEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionScreenshotEntity(client, entopts)
	}
	core.NewBrowserSessionTaskEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBrowserSessionTaskEntity(client, entopts)
	}
	core.NewCacheNamespaceEntryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCacheNamespaceEntryEntity(client, entopts)
	}
	core.NewCatalogSelectorEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCatalogSelectorEntity(client, entopts)
	}
	core.NewCdnDeploymentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCdnDeploymentEntity(client, entopts)
	}
	core.NewCdnHostnameEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCdnHostnameEntity(client, entopts)
	}
	core.NewCdnSpaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCdnSpaceEntity(client, entopts)
	}
	core.NewCdnSpaceObjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCdnSpaceObjectEntity(client, entopts)
	}
	core.NewChangeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeEntity(client, entopts)
	}
	core.NewChangeAssetEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeAssetEntity(client, entopts)
	}
	core.NewChangeCommentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeCommentEntity(client, entopts)
	}
	core.NewChangeFileReviewCheckpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeFileReviewCheckpointEntity(client, entopts)
	}
	core.NewChangeGitBranchSubmissionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeGitBranchSubmissionEntity(client, entopts)
	}
	core.NewChangeGitCommitIdentityEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeGitCommitIdentityEntity(client, entopts)
	}
	core.NewChangeGitPublicationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeGitPublicationEntity(client, entopts)
	}
	core.NewChangeGroupMemberEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeGroupMemberEntity(client, entopts)
	}
	core.NewChangeLabelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeLabelEntity(client, entopts)
	}
	core.NewChangeLandingHoldEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeLandingHoldEntity(client, entopts)
	}
	core.NewChangeLandingRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeLandingRequestEntity(client, entopts)
	}
	core.NewChangeRequestChangeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeRequestChangeEntity(client, entopts)
	}
	core.NewChangeReviewerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeReviewerEntity(client, entopts)
	}
	core.NewChangeTranscriptEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeTranscriptEntity(client, entopts)
	}
	core.NewChangeTranscriptSummaryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewChangeTranscriptSummaryEntity(client, entopts)
	}
	core.NewCheckpointPrepareChunkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCheckpointPrepareChunkEntity(client, entopts)
	}
	core.NewCiNodeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCiNodeEntity(client, entopts)
	}
	core.NewCiPipelineEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCiPipelineEntity(client, entopts)
	}
	core.NewCiPipelineRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCiPipelineRunEntity(client, entopts)
	}
	core.NewCiRunnerPoolEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCiRunnerPoolEntity(client, entopts)
	}
	core.NewCiStatusEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCiStatusEntity(client, entopts)
	}
	core.NewCliEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCliEventEntity(client, entopts)
	}
	core.NewCliReleaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCliReleaseEntity(client, entopts)
	}
	core.NewCloudWorkspaceBackupObjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCloudWorkspaceBackupObjectEntity(client, entopts)
	}
	core.NewCodeRuleEvaluationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCodeRuleEvaluationEntity(client, entopts)
	}
	core.NewComSiteAccessEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewComSiteAccessEntity(client, entopts)
	}
	core.NewComSiteAccessSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewComSiteAccessSessionEntity(client, entopts)
	}
	core.NewCommentThreadCommentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCommentThreadCommentEntity(client, entopts)
	}
	core.NewCommitDiffEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCommitDiffEntity(client, entopts)
	}
	core.NewConnectionRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewConnectionRequestEntity(client, entopts)
	}
	core.NewConnectionSourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewConnectionSourceEntity(client, entopts)
	}
	core.NewContactSubmissionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewContactSubmissionEntity(client, entopts)
	}
	core.NewControlComputerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewControlComputerEntity(client, entopts)
	}
	core.NewControlComputerControlOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewControlComputerControlOperationEntity(client, entopts)
	}
	core.NewCoordinationWaitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCoordinationWaitEntity(client, entopts)
	}
	core.NewCredentialSignInCheckEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewCredentialSignInCheckEntity(client, entopts)
	}
	core.NewDataResourceRotateCredentialEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDataResourceRotateCredentialEntity(client, entopts)
	}
	core.NewDeepScanEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeepScanEntity(client, entopts)
	}
	core.NewDeepScanFindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeepScanFindingEntity(client, entopts)
	}
	core.NewDeepScanFlowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeepScanFlowEntity(client, entopts)
	}
	core.NewDeepScanMappedFlowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeepScanMappedFlowEntity(client, entopts)
	}
	core.NewDeepScanOptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeepScanOptionEntity(client, entopts)
	}
	core.NewDemoShareEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDemoShareEntity(client, entopts)
	}
	core.NewDemoShareSegmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDemoShareSegmentEntity(client, entopts)
	}
	core.NewDeploymentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentEntity(client, entopts)
	}
	core.NewDeploymentDashboardNomadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentDashboardNomadEntity(client, entopts)
	}
	core.NewDeploymentDetailEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentDetailEntity(client, entopts)
	}
	core.NewDeploymentFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentFileEntity(client, entopts)
	}
	core.NewDeploymentLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentLogEntity(client, entopts)
	}
	core.NewDeploymentMetricEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentMetricEntity(client, entopts)
	}
	core.NewDeploymentPreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentPreviewEntity(client, entopts)
	}
	core.NewDeploymentSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentSettingEntity(client, entopts)
	}
	core.NewDesktopLocalAgentModelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDesktopLocalAgentModelEntity(client, entopts)
	}
	core.NewDesktopLocalAgentResponseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDesktopLocalAgentResponseEntity(client, entopts)
	}
	core.NewDeviceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceEntity(client, entopts)
	}
	core.NewDeviceBrowserOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceBrowserOperationEntity(client, entopts)
	}
	core.NewDeviceControlMessageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceControlMessageEntity(client, entopts)
	}
	core.NewDeviceControlOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceControlOperationEntity(client, entopts)
	}
	core.NewDeviceEnterpriseRelayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceEnterpriseRelayEntity(client, entopts)
	}
	core.NewDeviceFolderListingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceFolderListingEntity(client, entopts)
	}
	core.NewDeviceGrantEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceGrantEntity(client, entopts)
	}
	core.NewDeviceInvocationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceInvocationEntity(client, entopts)
	}
	core.NewDeviceLocalEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceLocalEventEntity(client, entopts)
	}
	core.NewDevicePairingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDevicePairingEntity(client, entopts)
	}
	core.NewDeviceProjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceProjectEntity(client, entopts)
	}
	core.NewDeviceScheduledCheckInEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeviceScheduledCheckInEntity(client, entopts)
	}
	core.NewDockerBuilderEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDockerBuilderEntity(client, entopts)
	}
	core.NewDockerBuilderSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDockerBuilderSessionEntity(client, entopts)
	}
	core.NewDockerBuilderSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDockerBuilderSettingEntity(client, entopts)
	}
	core.NewDomainDnsIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDomainDnsIntegrationEntity(client, entopts)
	}
	core.NewDomainPathRuleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDomainPathRuleEntity(client, entopts)
	}
	core.NewDreamEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDreamEntity(client, entopts)
	}
	core.NewEdgeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEdgeEntity(client, entopts)
	}
	core.NewEmailVerificationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEmailVerificationEntity(client, entopts)
	}
	core.NewEnvironmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentEntity(client, entopts)
	}
	core.NewEnvironmentDiscoveryRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentDiscoveryRunEntity(client, entopts)
	}
	core.NewEnvironmentExplorationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentExplorationEntity(client, entopts)
	}
	core.NewEnvironmentFirstRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentFirstRunEntity(client, entopts)
	}
	core.NewEnvironmentRevisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentRevisionEntity(client, entopts)
	}
	core.NewEnvironmentSecretBindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentSecretBindingEntity(client, entopts)
	}
	core.NewEnvironmentTestAccountEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEnvironmentTestAccountEntity(client, entopts)
	}
	core.NewEvidenceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewEvidenceEntity(client, entopts)
	}
	core.NewExecutionDesiredStateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExecutionDesiredStateEntity(client, entopts)
	}
	core.NewExecutionReconcilerTickEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExecutionReconcilerTickEntity(client, entopts)
	}
	core.NewExecutionReleaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExecutionReleaseEntity(client, entopts)
	}
	core.NewExecutionRuntimeInstanceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExecutionRuntimeInstanceEntity(client, entopts)
	}
	core.NewExplorationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExplorationEntity(client, entopts)
	}
	core.NewExplorationMessageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExplorationMessageEntity(client, entopts)
	}
	core.NewExplorationReportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExplorationReportEntity(client, entopts)
	}
	core.NewExplorationScenarioEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewExplorationScenarioEntity(client, entopts)
	}
	core.NewFindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewFindingEntity(client, entopts)
	}
	core.NewGhEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGhEntity(client, entopts)
	}
	core.NewGitImportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGitImportEntity(client, entopts)
	}
	core.NewGithubEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubEntity(client, entopts)
	}
	core.NewGithubAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubAppEntity(client, entopts)
	}
	core.NewGithubAppImportableRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubAppImportableRepositoryEntity(client, entopts)
	}
	core.NewGithubAppInstallationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubAppInstallationEntity(client, entopts)
	}
	core.NewGithubAppInstallationAuthorizationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubAppInstallationAuthorizationEntity(client, entopts)
	}
	core.NewGithubAppUserAuthorizationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubAppUserAuthorizationEntity(client, entopts)
	}
	core.NewGithubCiRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubCiRepositoryEntity(client, entopts)
	}
	core.NewGithubCiRepositoryCompatibilityReportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubCiRepositoryCompatibilityReportEntity(client, entopts)
	}
	core.NewGithubConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubConnectionEntity(client, entopts)
	}
	core.NewGithubIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubIntegrationEntity(client, entopts)
	}
	core.NewGithubOnboardingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubOnboardingEntity(client, entopts)
	}
	core.NewGithubOnboardingBranchEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubOnboardingBranchEntity(client, entopts)
	}
	core.NewGithubOnboardingImportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubOnboardingImportEntity(client, entopts)
	}
	core.NewGithubOnboardingImportBatchEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubOnboardingImportBatchEntity(client, entopts)
	}
	core.NewGithubOnboardingImportItemEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubOnboardingImportItemEntity(client, entopts)
	}
	core.NewGithubPullRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubPullRequestEntity(client, entopts)
	}
	core.NewGithubRunnerAdmissionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerAdmissionEntity(client, entopts)
	}
	core.NewGithubRunnerCacheEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerCacheEntity(client, entopts)
	}
	core.NewGithubRunnerEgressEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerEgressEntity(client, entopts)
	}
	core.NewGithubRunnerHistoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerHistoryEntity(client, entopts)
	}
	core.NewGithubRunnerImageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerImageEntity(client, entopts)
	}
	core.NewGithubRunnerPoolEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerPoolEntity(client, entopts)
	}
	core.NewGithubRunnerSetupEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubRunnerSetupEntity(client, entopts)
	}
	core.NewGitlabEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGitlabEntity(client, entopts)
	}
	core.NewGitlabConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGitlabConnectionEntity(client, entopts)
	}
	core.NewGitlabImportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGitlabImportEntity(client, entopts)
	}
	core.NewGitlabOauthEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGitlabOauthEntity(client, entopts)
	}
	core.NewGrantAllAgentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGrantAllAgentEntity(client, entopts)
	}
	core.NewHostingAppDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewHostingAppDomainEntity(client, entopts)
	}
	core.NewIdentityOrganizationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewIdentityOrganizationEntity(client, entopts)
	}
	core.NewImageRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewImageRepositoryEntity(client, entopts)
	}
	core.NewImageRepositoryTagEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewImageRepositoryTagEntity(client, entopts)
	}
	core.NewImportBranchPolicyEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewImportBranchPolicyEntity(client, entopts)
	}
	core.NewIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewIntegrationEntity(client, entopts)
	}
	core.NewInteractionResponseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewInteractionResponseEntity(client, entopts)
	}
	core.NewInvitationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewInvitationEntity(client, entopts)
	}
	core.NewInvocationControlEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewInvocationControlEntity(client, entopts)
	}
	core.NewJobLogChunkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewJobLogChunkEntity(client, entopts)
	}
	core.NewJobStepEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewJobStepEntity(client, entopts)
	}
	core.NewJobWorkspaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewJobWorkspaceEntity(client, entopts)
	}
	core.NewJourneyVariantReplayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewJourneyVariantReplayEntity(client, entopts)
	}
	core.NewKnowledgeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewKnowledgeEntity(client, entopts)
	}
	core.NewKnownEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewKnownEntity(client, entopts)
	}
	core.NewLabelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLabelEntity(client, entopts)
	}
	core.NewLeaseArtifactEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseArtifactEntity(client, entopts)
	}
	core.NewLeaseCacheEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseCacheEntity(client, entopts)
	}
	core.NewLeaseLogChunkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseLogChunkEntity(client, entopts)
	}
	core.NewLeaseReconciliationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseReconciliationEntity(client, entopts)
	}
	core.NewLeaseStepEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseStepEntity(client, entopts)
	}
	core.NewLeaseVerifyDiagnosticEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseVerifyDiagnosticEntity(client, entopts)
	}
	core.NewLeaseVerifySecretEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseVerifySecretEntity(client, entopts)
	}
	core.NewLeaseWorkspaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLeaseWorkspaceEntity(client, entopts)
	}
	core.NewLocalAgentDecisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLocalAgentDecisionEntity(client, entopts)
	}
	core.NewLocalAgentResponseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLocalAgentResponseEntity(client, entopts)
	}
	core.NewLocalThreadDeliveryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLocalThreadDeliveryEntity(client, entopts)
	}
	core.NewLocalThreadOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLocalThreadOperationEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLocationEntity(client, entopts)
	}
	core.NewLogStreamChunkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLogStreamChunkEntity(client, entopts)
	}
	core.NewLogoImageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewLogoImageEntity(client, entopts)
	}
	core.NewMarketingSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMarketingSettingEntity(client, entopts)
	}
	core.NewMcpOauthEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMcpOauthEntity(client, entopts)
	}
	core.NewMeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMeEntity(client, entopts)
	}
	core.NewMeEmailEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMeEmailEntity(client, entopts)
	}
	core.NewMeOnboardingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMeOnboardingEntity(client, entopts)
	}
	core.NewMediaFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMediaFileEntity(client, entopts)
	}
	core.NewMemberEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMemberEntity(client, entopts)
	}
	core.NewMemoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMemoryEntity(client, entopts)
	}
	core.NewMergeQueueEntryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMergeQueueEntryEntity(client, entopts)
	}
	core.NewMergeRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMergeRequestEntity(client, entopts)
	}
	core.NewMergeResolutionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMergeResolutionEntity(client, entopts)
	}
	core.NewMessagingConversationMessageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMessagingConversationMessageEntity(client, entopts)
	}
	core.NewMessagingConversationUploadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMessagingConversationUploadEntity(client, entopts)
	}
	core.NewMetricQueryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMetricQueryEntity(client, entopts)
	}
	core.NewMetronomeWebhookEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMetronomeWebhookEntity(client, entopts)
	}
	core.NewModelSubscriptionAccountEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewModelSubscriptionAccountEntity(client, entopts)
	}
	core.NewModelSubscriptionAccountConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewModelSubscriptionAccountConnectionEntity(client, entopts)
	}
	core.NewNetworkConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNetworkConnectionEntity(client, entopts)
	}
	core.NewNetworkingSpaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNetworkingSpaceEntity(client, entopts)
	}
	core.NewNodeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNodeEntity(client, entopts)
	}
	core.NewNodeCertificateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNodeCertificateEntity(client, entopts)
	}
	core.NewNodeLeaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNodeLeaseEntity(client, entopts)
	}
	core.NewNomadAllocationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNomadAllocationEntity(client, entopts)
	}
	core.NewNomadLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNomadLogEntity(client, entopts)
	}
	core.NewNowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNowEntity(client, entopts)
	}
	core.NewObservabilityClickhouseClusterEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewObservabilityClickhouseClusterEntity(client, entopts)
	}
	core.NewObservabilityQuickwitClusterEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewObservabilityQuickwitClusterEntity(client, entopts)
	}
	core.NewObservabilitySpaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewObservabilitySpaceEntity(client, entopts)
	}
	core.NewOpenapiEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOpenapiEntity(client, entopts)
	}
	core.NewOrgInvitationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrgInvitationEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationEntity(client, entopts)
	}
	core.NewOrganizationAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationAppEntity(client, entopts)
	}
	core.NewOrganizationControlEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationControlEntity(client, entopts)
	}
	core.NewOrganizationDeviceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationDeviceEntity(client, entopts)
	}
	core.NewOrganizationIdentityCertificateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationIdentityCertificateEntity(client, entopts)
	}
	core.NewOrganizationInteractionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationInteractionEntity(client, entopts)
	}
	core.NewOrganizationInvitationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationInvitationEntity(client, entopts)
	}
	core.NewOrganizationMessageFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationMessageFileEntity(client, entopts)
	}
	core.NewOrganizationOidcTrustEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationOidcTrustEntity(client, entopts)
	}
	core.NewOrganizationRunEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationRunEventEntity(client, entopts)
	}
	core.NewOrganizationRunOutcomeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationRunOutcomeEntity(client, entopts)
	}
	core.NewOrganizationRunUsageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationRunUsageEntity(client, entopts)
	}
	core.NewOrganizationSandboxEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationSandboxEntity(client, entopts)
	}
	core.NewOrganizationSecretEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationSecretEntity(client, entopts)
	}
	core.NewOrganizationServiceAccountEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationServiceAccountEntity(client, entopts)
	}
	core.NewOrganizationSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationSettingEntity(client, entopts)
	}
	core.NewOrganizationSiteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationSiteEntity(client, entopts)
	}
	core.NewOrganizationSubscriptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationSubscriptionEntity(client, entopts)
	}
	core.NewOrganizationToolEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationToolEntity(client, entopts)
	}
	core.NewOrganizationWorkloadIdentityEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationWorkloadIdentityEntity(client, entopts)
	}
	core.NewOtelIngestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOtelIngestEntity(client, entopts)
	}
	core.NewPageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageEntity(client, entopts)
	}
	core.NewPageAgentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageAgentEntity(client, entopts)
	}
	core.NewPageArtefactEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageArtefactEntity(client, entopts)
	}
	core.NewPageCiPipelineRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageCiPipelineRunEntity(client, entopts)
	}
	core.NewPageProjectRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageProjectRunEntity(client, entopts)
	}
	core.NewPageRepoVcCommitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageRepoVcCommitEntity(client, entopts)
	}
	core.NewPagesBillingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesBillingEntity(client, entopts)
	}
	core.NewPagesGithubOnboardingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesGithubOnboardingEntity(client, entopts)
	}
	core.NewPagesMemberEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesMemberEntity(client, entopts)
	}
	core.NewPagesProjectCredentialEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesProjectCredentialEntity(client, entopts)
	}
	core.NewPagesProjectPersonaEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesProjectPersonaEntity(client, entopts)
	}
	core.NewPagesProjectRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesProjectRunEntity(client, entopts)
	}
	core.NewPagesProjectScenarioEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesProjectScenarioEntity(client, entopts)
	}
	core.NewPagesRegistryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesRegistryEntity(client, entopts)
	}
	core.NewPagesSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPagesSessionEntity(client, entopts)
	}
	core.NewPairingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPairingEntity(client, entopts)
	}
	core.NewPairingEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPairingEventEntity(client, entopts)
	}
	core.NewParallelV1EntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewParallelV1Entity(client, entopts)
	}
	core.NewPatchsetDiffEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPatchsetDiffEntity(client, entopts)
	}
	core.NewPersonalAccessTokenEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPersonalAccessTokenEntity(client, entopts)
	}
	core.NewPreviewOperationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPreviewOperationEntity(client, entopts)
	}
	core.NewPreviewProfileSecretBindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPreviewProfileSecretBindingEntity(client, entopts)
	}
	core.NewPreviewSecretEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPreviewSecretEntity(client, entopts)
	}
	core.NewPreviewSharingApprovalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPreviewSharingApprovalEntity(client, entopts)
	}
	core.NewProactiveAgentWaitlistEntryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProactiveAgentWaitlistEntryEntity(client, entopts)
	}
	core.NewProductEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductEntity(client, entopts)
	}
	core.NewProductMapIdentityDecisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapIdentityDecisionEntity(client, entopts)
	}
	core.NewProductMapJourneyEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapJourneyEntity(client, entopts)
	}
	core.NewProductMapJourneyReplayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapJourneyReplayEntity(client, entopts)
	}
	core.NewProductMapObservationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapObservationEntity(client, entopts)
	}
	core.NewProductMapQuestionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapQuestionEntity(client, entopts)
	}
	core.NewProductMapStateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProductMapStateEntity(client, entopts)
	}
	core.NewProjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectEntity(client, entopts)
	}
	core.NewProjectAndroidApkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectAndroidApkEntity(client, entopts)
	}
	core.NewProjectCodeMapEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectCodeMapEntity(client, entopts)
	}
	core.NewProjectEnvironmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectEnvironmentEntity(client, entopts)
	}
	core.NewProjectFindingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectFindingEntity(client, entopts)
	}
	core.NewProjectFixtureEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectFixtureEntity(client, entopts)
	}
	core.NewProjectIosAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectIosAppEntity(client, entopts)
	}
	core.NewProjectMessagingConversationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectMessagingConversationEntity(client, entopts)
	}
	core.NewProjectOverviewMetricEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectOverviewMetricEntity(client, entopts)
	}
	core.NewProjectOverviewPullRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectOverviewPullRequestEntity(client, entopts)
	}
	core.NewProjectProductMapEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectProductMapEntity(client, entopts)
	}
	core.NewProjectRecordingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectRecordingEntity(client, entopts)
	}
	core.NewProjectRunPlanEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectRunPlanEntity(client, entopts)
	}
	core.NewProjectRunScheduleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectRunScheduleEntity(client, entopts)
	}
	core.NewProjectScenarioOptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectScenarioOptionEntity(client, entopts)
	}
	core.NewProjectScenarioRowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectScenarioRowEntity(client, entopts)
	}
	core.NewProjectSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewProjectSettingEntity(client, entopts)
	}
	core.NewPullRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestEntity(client, entopts)
	}
	core.NewPullRequestActionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestActionEntity(client, entopts)
	}
	core.NewPullRequestMagicMergeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestMagicMergeEntity(client, entopts)
	}
	core.NewPullRequestSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingEntity(client, entopts)
	}
	core.NewPullRequestSettingAddRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingAddRepositoryEntity(client, entopts)
	}
	core.NewPullRequestSettingDetectCommentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingDetectCommentEntity(client, entopts)
	}
	core.NewPullRequestTranscriptEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestTranscriptEntity(client, entopts)
	}
	core.NewPullZoneEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullZoneEntity(client, entopts)
	}
	core.NewRecorderEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRecorderEntity(client, entopts)
	}
	core.NewRegistryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRegistryEntity(client, entopts)
	}
	core.NewRegistryV2EntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRegistryV2Entity(client, entopts)
	}
	core.NewRelayAgentConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRelayAgentConnectionEntity(client, entopts)
	}
	core.NewRelayAgentLocalThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRelayAgentLocalThreadEntity(client, entopts)
	}
	core.NewRelaySignalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRelaySignalEntity(client, entopts)
	}
	core.NewReleaseRolloutEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewReleaseRolloutEntity(client, entopts)
	}
	core.NewRepoEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoEntity(client, entopts)
	}
	core.NewRepoAccessTokenEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoAccessTokenEntity(client, entopts)
	}
	core.NewRepoActionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoActionEntity(client, entopts)
	}
	core.NewRepoAgentCheckpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoAgentCheckpointEntity(client, entopts)
	}
	core.NewRepoAgentSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoAgentSessionEntity(client, entopts)
	}
	core.NewRepoBookmarkProtectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoBookmarkProtectionEntity(client, entopts)
	}
	core.NewRepoBookmarkProtectionEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoBookmarkProtectionEventEntity(client, entopts)
	}
	core.NewRepoCloudWorkspaceBackupEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoCloudWorkspaceBackupEntity(client, entopts)
	}
	core.NewRepoCodeRuleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoCodeRuleEntity(client, entopts)
	}
	core.NewRepoSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoSettingEntity(client, entopts)
	}
	core.NewRepoStatEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoStatEntity(client, entopts)
	}
	core.NewRepoVcEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoVcEntity(client, entopts)
	}
	core.NewRepoVcCommitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepoVcCommitEntity(client, entopts)
	}
	core.NewReportReplayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewReportReplayEntity(client, entopts)
	}
	core.NewReportScenarioEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewReportScenarioEntity(client, entopts)
	}
	core.NewRepositoryAccessEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryAccessEntity(client, entopts)
	}
	core.NewRepositoryAccessResolveEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryAccessResolveEntity(client, entopts)
	}
	core.NewRepositoryEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryEventEntity(client, entopts)
	}
	core.NewRepositoryImportEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryImportEntity(client, entopts)
	}
	core.NewRepositoryImportSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryImportSessionEntity(client, entopts)
	}
	core.NewRepositoryImportSessionRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryImportSessionRepositoryEntity(client, entopts)
	}
	core.NewRepositoryImportSessionSelectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositoryImportSessionSelectionEntity(client, entopts)
	}
	core.NewRepositorySandboxEnvironmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRepositorySandboxEnvironmentEntity(client, entopts)
	}
	core.NewRoderCodeRepairEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRoderCodeRepairEntity(client, entopts)
	}
	core.NewRoderCodeRepairSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRoderCodeRepairSettingEntity(client, entopts)
	}
	core.NewRoderMachineEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRoderMachineEntity(client, entopts)
	}
	core.NewRoderRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRoderRunEntity(client, entopts)
	}
	core.NewRoderWorkspaceCredentialEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRoderWorkspaceCredentialEntity(client, entopts)
	}
	core.NewRunArtifactEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunArtifactEntity(client, entopts)
	}
	core.NewRunJobEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunJobEntity(client, entopts)
	}
	core.NewRunScenarioRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunScenarioRunEntity(client, entopts)
	}
	core.NewRunScheduleOptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunScheduleOptionEntity(client, entopts)
	}
	core.NewRunSearchEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunSearchEntity(client, entopts)
	}
	core.NewRunUpdateEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunUpdateEntity(client, entopts)
	}
	core.NewRunWorkspaceCredentialEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunWorkspaceCredentialEntity(client, entopts)
	}
	core.NewRunnerLeaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunnerLeaseEntity(client, entopts)
	}
	core.NewRunnerPoolNodeEnrollmentTokenEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunnerPoolNodeEnrollmentTokenEntity(client, entopts)
	}
	core.NewRunnerPoolRunnerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRunnerPoolRunnerEntity(client, entopts)
	}
	core.NewRuntimeInstanceHealthSnapshotEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRuntimeInstanceHealthSnapshotEntity(client, entopts)
	}
	core.NewSandboxIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSandboxIntegrationEntity(client, entopts)
	}
	core.NewScenarioRevisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRevisionEntity(client, entopts)
	}
	core.NewScenarioRunLessonEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRunLessonEntity(client, entopts)
	}
	core.NewScenarioRunScenarioEditEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRunScenarioEditEntity(client, entopts)
	}
	core.NewSecretGrantEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSecretGrantEntity(client, entopts)
	}
	core.NewSecretVersionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSecretVersionEntity(client, entopts)
	}
	core.NewServiceEndpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewServiceEndpointEntity(client, entopts)
	}
	core.NewSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSettingEntity(client, entopts)
	}
	core.NewSettingMutationLeaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSettingMutationLeaseEntity(client, entopts)
	}
	core.NewSignalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalEntity(client, entopts)
	}
	core.NewSignalInboundEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalInboundEntity(client, entopts)
	}
	core.NewSignalIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalIntegrationEntity(client, entopts)
	}
	core.NewSignalIntegrationDeliveryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalIntegrationDeliveryEntity(client, entopts)
	}
	core.NewSignalIntegrationTargetEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalIntegrationTargetEntity(client, entopts)
	}
	core.NewSignalSubscriptionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSignalSubscriptionEntity(client, entopts)
	}
	core.NewSiteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSiteEntity(client, entopts)
	}
	core.NewSiteAccessKeyEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSiteAccessKeyEntity(client, entopts)
	}
	core.NewSitePreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSitePreviewEntity(client, entopts)
	}
	core.NewSiteSecretEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSiteSecretEntity(client, entopts)
	}
	core.NewSlackChannelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSlackChannelEntity(client, entopts)
	}
	core.NewSourceConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSourceConnectionEntity(client, entopts)
	}
	core.NewSpaceAlertRuleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceAlertRuleEntity(client, entopts)
	}
	core.NewSpaceAuditEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceAuditEventEntity(client, entopts)
	}
	core.NewSpaceDnsRecordEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceDnsRecordEntity(client, entopts)
	}
	core.NewSpaceEnrollmentTokenEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceEnrollmentTokenEntity(client, entopts)
	}
	core.NewSpaceGatewayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceGatewayEntity(client, entopts)
	}
	core.NewSpaceGroupEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceGroupEntity(client, entopts)
	}
	core.NewSpaceGroupMembershipEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceGroupMembershipEntity(client, entopts)
	}
	core.NewSpaceLogStreamEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceLogStreamEntity(client, entopts)
	}
	core.NewSpaceMetricSeryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceMetricSeryEntity(client, entopts)
	}
	core.NewSpaceOtelCollectorEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceOtelCollectorEntity(client, entopts)
	}
	core.NewSpacePeerEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpacePeerEntity(client, entopts)
	}
	core.NewSpacePeerAttachmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpacePeerAttachmentEntity(client, entopts)
	}
	core.NewSpacePolicyEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpacePolicyEntity(client, entopts)
	}
	core.NewSpaceSegmentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceSegmentEntity(client, entopts)
	}
	core.NewSpaceTraceSpanEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSpaceTraceSpanEntity(client, entopts)
	}
	core.NewSparkEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkEntity(client, entopts)
	}
	core.NewSparkAgentIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentIntegrationEntity(client, entopts)
	}
	core.NewSparkAgentLocalThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentLocalThreadEntity(client, entopts)
	}
	core.NewSparkAgentSiteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentSiteEntity(client, entopts)
	}
	core.NewSparkAgentSkillEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentSkillEntity(client, entopts)
	}
	core.NewSparkAgentThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentThreadEntity(client, entopts)
	}
	core.NewSparkCreditEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkCreditEntity(client, entopts)
	}
	core.NewSparkCreditAgentUsageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkCreditAgentUsageEntity(client, entopts)
	}
	core.NewSparkCreditUsageTotalEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkCreditUsageTotalEntity(client, entopts)
	}
	core.NewStaticSiteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStaticSiteEntity(client, entopts)
	}
	core.NewStaticSiteDeploymentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStaticSiteDeploymentEntity(client, entopts)
	}
	core.NewStaticSiteDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStaticSiteDomainEntity(client, entopts)
	}
	core.NewStatusChangeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStatusChangeEntity(client, entopts)
	}
	core.NewStatusCommitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStatusCommitEntity(client, entopts)
	}
	core.NewStatusPatchsetEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStatusPatchsetEntity(client, entopts)
	}
	core.NewStripeWebhookEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewStripeWebhookEntity(client, entopts)
	}
	core.NewSubmitTelemetryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSubmitTelemetryEntity(client, entopts)
	}
	core.NewSubscriptionModelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSubscriptionModelEntity(client, entopts)
	}
	core.NewSwarmEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSwarmEventEntity(client, entopts)
	}
	core.NewSwarmLiveEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSwarmLiveEntity(client, entopts)
	}
	core.NewSwarmNoteEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSwarmNoteEntity(client, entopts)
	}
	core.NewSwarmTaskEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSwarmTaskEntity(client, entopts)
	}
	core.NewTaskLeaseEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewTaskLeaseEntity(client, entopts)
	}
	core.NewThreadPreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewThreadPreviewEntity(client, entopts)
	}
	core.NewThreadPreviewAccessEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewThreadPreviewAccessEntity(client, entopts)
	}
	core.NewToolFeedbackEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewToolFeedbackEntity(client, entopts)
	}
	core.NewTranscriptEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewTranscriptEntity(client, entopts)
	}
	core.NewV1MessageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewV1MessageEntity(client, entopts)
	}
	core.NewVcBranchEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcBranchEntity(client, entopts)
	}
	core.NewVcBrowserEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcBrowserEntity(client, entopts)
	}
	core.NewVcChangeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcChangeEntity(client, entopts)
	}
	core.NewVcChangeGroupEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcChangeGroupEntity(client, entopts)
	}
	core.NewVcFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcFileEntity(client, entopts)
	}
	core.NewVcMergeQueueEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcMergeQueueEntity(client, entopts)
	}
	core.NewVcStackEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcStackEntity(client, entopts)
	}
	core.NewVcsNodeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcsNodeEntity(client, entopts)
	}
	core.NewVcsSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVcsSettingEntity(client, entopts)
	}
	core.NewVerificationProjectCredentialEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerificationProjectCredentialEntity(client, entopts)
	}
	core.NewVerificationProjectPersonaEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerificationProjectPersonaEntity(client, entopts)
	}
	core.NewVerificationProjectRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerificationProjectRunEntity(client, entopts)
	}
	core.NewVerificationProjectScenarioEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerificationProjectScenarioEntity(client, entopts)
	}
	core.NewVerifyAppDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifyAppDomainEntity(client, entopts)
	}
	core.NewVerifyBrowserSessionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifyBrowserSessionEntity(client, entopts)
	}
	core.NewVerifyEmailVerificationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifyEmailVerificationEntity(client, entopts)
	}
	core.NewVerifySignalIntegrationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifySignalIntegrationEntity(client, entopts)
	}
	core.NewVerifyStaticSiteDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifyStaticSiteDomainEntity(client, entopts)
	}
	core.NewVersionLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVersionLogEntity(client, entopts)
	}
	core.NewWaitlistApplicationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWaitlistApplicationEntity(client, entopts)
	}
	core.NewWebBotAuthEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWebBotAuthEntity(client, entopts)
	}
	core.NewWebhookGitlabEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWebhookGitlabEntity(client, entopts)
	}
	core.NewWorkflowRunStepEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkflowRunStepEntity(client, entopts)
	}
	core.NewWorkflowRunStopNoticeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkflowRunStopNoticeEntity(client, entopts)
	}
	core.NewWorkflowTriggerSkippedEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkflowTriggerSkippedEntity(client, entopts)
	}
	core.NewWorkspaceActivityEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkspaceActivityEntity(client, entopts)
	}
	core.NewWorkspaceActivityNotificationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkspaceActivityNotificationEntity(client, entopts)
	}
	core.NewWorkspaceSpaceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkspaceSpaceEntity(client, entopts)
	}
	core.NewWorkspaceSpacePreferenceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWorkspaceSpacePreferenceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewComposalSDK = core.NewComposalSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewComposalSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ComposalSDK  { return NewComposalSDK(nil) }
func Test() *ComposalSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewSecretsFeature = feature.NewSecretsFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
