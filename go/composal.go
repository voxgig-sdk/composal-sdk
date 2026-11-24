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
	core.NewAgentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentEntity(client, entopts)
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
	core.NewAgentControlFlowEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentControlFlowEntity(client, entopts)
	}
	core.NewAgentCoordinationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentCoordinationEntity(client, entopts)
	}
	core.NewAgentEmailEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentEmailEntity(client, entopts)
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
	core.NewAgentRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentRepositoryEntity(client, entopts)
	}
	core.NewAgentResourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentResourceEntity(client, entopts)
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
	core.NewAgentVerifyProjectEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentVerifyProjectEntity(client, entopts)
	}
	core.NewAgentWaitEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAgentWaitEntity(client, entopts)
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
	core.NewAllocationLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAllocationLogEntity(client, entopts)
	}
	core.NewAppEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAppEntity(client, entopts)
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
	core.NewAttachmentPartEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAttachmentPartEntity(client, entopts)
	}
	core.NewAutomationEventEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAutomationEventEntity(client, entopts)
	}
	core.NewAutomationRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewAutomationRunEntity(client, entopts)
	}
	core.NewBinaryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBinaryEntity(client, entopts)
	}
	core.NewBinaryVersionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewBinaryVersionEntity(client, entopts)
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
	core.NewConnectionRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewConnectionRequestEntity(client, entopts)
	}
	core.NewConnectionSourceEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewConnectionSourceEntity(client, entopts)
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
	core.NewDeploymentDashboardNomadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentDashboardNomadEntity(client, entopts)
	}
	core.NewDeploymentFileEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDeploymentFileEntity(client, entopts)
	}
	core.NewDomainPathRuleEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDomainPathRuleEntity(client, entopts)
	}
	core.NewDreamEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewDreamEntity(client, entopts)
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
	core.NewGithubConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewGithubConnectionEntity(client, entopts)
	}
	core.NewHostingAppDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewHostingAppDomainEntity(client, entopts)
	}
	core.NewImageRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewImageRepositoryEntity(client, entopts)
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
	core.NewJourneyVariantReplayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewJourneyVariantReplayEntity(client, entopts)
	}
	core.NewKnowledgeEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewKnowledgeEntity(client, entopts)
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
	core.NewMergeRequestEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewMergeRequestEntity(client, entopts)
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
	core.NewNetworkConnectionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNetworkConnectionEntity(client, entopts)
	}
	core.NewNomadAllocationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNomadAllocationEntity(client, entopts)
	}
	core.NewNomadLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewNomadLogEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewOrganizationEntity(client, entopts)
	}
	core.NewPageEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageEntity(client, entopts)
	}
	core.NewPageAgentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageAgentEntity(client, entopts)
	}
	core.NewPageProjectRunEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPageProjectRunEntity(client, entopts)
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
	core.NewPullRequestSettingEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingEntity(client, entopts)
	}
	core.NewPullRequestSettingAddRepositoryEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingAddRepositoryEntity(client, entopts)
	}
	core.NewPullRequestSettingDetectCommentEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewPullRequestSettingDetectCommentEntity(client, entopts)
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
	core.NewRelayAgentLocalThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewRelayAgentLocalThreadEntity(client, entopts)
	}
	core.NewReportReplayEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewReportReplayEntity(client, entopts)
	}
	core.NewReportScenarioEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewReportScenarioEntity(client, entopts)
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
	core.NewScenarioRevisionEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRevisionEntity(client, entopts)
	}
	core.NewScenarioRunLessonEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRunLessonEntity(client, entopts)
	}
	core.NewScenarioRunScenarioEditEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewScenarioRunScenarioEditEntity(client, entopts)
	}
	core.NewServiceEndpointEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewServiceEndpointEntity(client, entopts)
	}
	core.NewSitePreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSitePreviewEntity(client, entopts)
	}
	core.NewSlackChannelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSlackChannelEntity(client, entopts)
	}
	core.NewSparkAgentLocalThreadEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSparkAgentLocalThreadEntity(client, entopts)
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
	core.NewSubscriptionModelEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewSubscriptionModelEntity(client, entopts)
	}
	core.NewThreadPreviewEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewThreadPreviewEntity(client, entopts)
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
	core.NewVerifyStaticSiteDomainEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVerifyStaticSiteDomainEntity(client, entopts)
	}
	core.NewVersionLogEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewVersionLogEntity(client, entopts)
	}
	core.NewWebBotAuthEntityFunc = func(client *core.ComposalSDK, entopts map[string]any) core.ComposalEntityBase {
		return entity.NewWebBotAuthEntity(client, entopts)
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
