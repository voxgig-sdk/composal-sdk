"use strict";
// Composal Ts SDK
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.ComposalSDK = exports.ComposalEntityBase = exports.BaseFeature = exports.sekreto = exports.config = exports.stdutil = void 0;
const A2aWellKnownEntity_1 = require("./entity/A2aWellKnownEntity");
const AdminOrgEntity_1 = require("./entity/AdminOrgEntity");
const AgentEntity_1 = require("./entity/AgentEntity");
const AgentAppEntity_1 = require("./entity/AgentAppEntity");
const AgentAppInstallEntity_1 = require("./entity/AgentAppInstallEntity");
const AgentAttachmentEntity_1 = require("./entity/AgentAttachmentEntity");
const AgentAutomationEntity_1 = require("./entity/AgentAutomationEntity");
const AgentAvatarEntity_1 = require("./entity/AgentAvatarEntity");
const AgentCommandEntity_1 = require("./entity/AgentCommandEntity");
const AgentComputerEntity_1 = require("./entity/AgentComputerEntity");
const AgentConnectionEntity_1 = require("./entity/AgentConnectionEntity");
const AgentConnectionDelegationEntity_1 = require("./entity/AgentConnectionDelegationEntity");
const AgentConnectionGrantEntity_1 = require("./entity/AgentConnectionGrantEntity");
const AgentConnectionResourceEntity_1 = require("./entity/AgentConnectionResourceEntity");
const AgentConnectionSafetyControlEntity_1 = require("./entity/AgentConnectionSafetyControlEntity");
const AgentConnectionTriggerSubscriptionEntity_1 = require("./entity/AgentConnectionTriggerSubscriptionEntity");
const AgentContextCheckpointEntity_1 = require("./entity/AgentContextCheckpointEntity");
const AgentControlFlowEntity_1 = require("./entity/AgentControlFlowEntity");
const AgentCoordinationEntity_1 = require("./entity/AgentCoordinationEntity");
const AgentEmailEntity_1 = require("./entity/AgentEmailEntity");
const AgentEventEntity_1 = require("./entity/AgentEventEntity");
const AgentFileEntity_1 = require("./entity/AgentFileEntity");
const AgentInputEntity_1 = require("./entity/AgentInputEntity");
const AgentIntegrationEntity_1 = require("./entity/AgentIntegrationEntity");
const AgentIntegrationAccountEntity_1 = require("./entity/AgentIntegrationAccountEntity");
const AgentIntegrationCallbackEntity_1 = require("./entity/AgentIntegrationCallbackEntity");
const AgentInteractionEntity_1 = require("./entity/AgentInteractionEntity");
const AgentLibraryEntity_1 = require("./entity/AgentLibraryEntity");
const AgentManagerEntity_1 = require("./entity/AgentManagerEntity");
const AgentManagerChoiceEntity_1 = require("./entity/AgentManagerChoiceEntity");
const AgentMarketplaceEntity_1 = require("./entity/AgentMarketplaceEntity");
const AgentMarketplaceSharedEntity_1 = require("./entity/AgentMarketplaceSharedEntity");
const AgentMissionControlEntity_1 = require("./entity/AgentMissionControlEntity");
const AgentOperationEntity_1 = require("./entity/AgentOperationEntity");
const AgentProvisioningEntity_1 = require("./entity/AgentProvisioningEntity");
const AgentPullRequestEntity_1 = require("./entity/AgentPullRequestEntity");
const AgentQuestionEntity_1 = require("./entity/AgentQuestionEntity");
const AgentRelayFileGrantEntity_1 = require("./entity/AgentRelayFileGrantEntity");
const AgentRelayFileGrantAccountEntity_1 = require("./entity/AgentRelayFileGrantAccountEntity");
const AgentRepositoryEntity_1 = require("./entity/AgentRepositoryEntity");
const AgentResourceEntity_1 = require("./entity/AgentResourceEntity");
const AgentRoderEntity_1 = require("./entity/AgentRoderEntity");
const AgentRoutineEntity_1 = require("./entity/AgentRoutineEntity");
const AgentRunEntity_1 = require("./entity/AgentRunEntity");
const AgentRuntimeEntity_1 = require("./entity/AgentRuntimeEntity");
const AgentSessionEntity_1 = require("./entity/AgentSessionEntity");
const AgentSessionCheckpointEntity_1 = require("./entity/AgentSessionCheckpointEntity");
const AgentSessionRoderHandoffEntity_1 = require("./entity/AgentSessionRoderHandoffEntity");
const AgentSettingEntity_1 = require("./entity/AgentSettingEntity");
const AgentSharingEntity_1 = require("./entity/AgentSharingEntity");
const AgentSiteEntity_1 = require("./entity/AgentSiteEntity");
const AgentSkillEntity_1 = require("./entity/AgentSkillEntity");
const AgentSlackEntity_1 = require("./entity/AgentSlackEntity");
const AgentSubagentEntity_1 = require("./entity/AgentSubagentEntity");
const AgentSubscriptionEntity_1 = require("./entity/AgentSubscriptionEntity");
const AgentSwarmEntity_1 = require("./entity/AgentSwarmEntity");
const AgentTeammateEntity_1 = require("./entity/AgentTeammateEntity");
const AgentTerminalEntity_1 = require("./entity/AgentTerminalEntity");
const AgentThreadEntity_1 = require("./entity/AgentThreadEntity");
const AgentToolEntity_1 = require("./entity/AgentToolEntity");
const AgentUsageEntity_1 = require("./entity/AgentUsageEntity");
const AgentVerifyProjectEntity_1 = require("./entity/AgentVerifyProjectEntity");
const AgentWaitEntity_1 = require("./entity/AgentWaitEntity");
const AgentWebPreviewEntity_1 = require("./entity/AgentWebPreviewEntity");
const AgentWebhookEntity_1 = require("./entity/AgentWebhookEntity");
const AgentWorkEntity_1 = require("./entity/AgentWorkEntity");
const AgentWorkflowEntity_1 = require("./entity/AgentWorkflowEntity");
const AgentWorkflowProposalEntity_1 = require("./entity/AgentWorkflowProposalEntity");
const AgentWorkflowRunEntity_1 = require("./entity/AgentWorkflowRunEntity");
const AgentWorkflowTriggerEntity_1 = require("./entity/AgentWorkflowTriggerEntity");
const AgentWorkspaceEntity_1 = require("./entity/AgentWorkspaceEntity");
const AgentWritePermissionEntity_1 = require("./entity/AgentWritePermissionEntity");
const AgreementEntity_1 = require("./entity/AgreementEntity");
const AgreementAccessRequestEntity_1 = require("./entity/AgreementAccessRequestEntity");
const AlertRuleEventEntity_1 = require("./entity/AlertRuleEventEntity");
const AllocationLogEntity_1 = require("./entity/AllocationLogEntity");
const AppEntity_1 = require("./entity/AppEntity");
const AppAccessEntity_1 = require("./entity/AppAccessEntity");
const AppAccessJwkEntity_1 = require("./entity/AppAccessJwkEntity");
const AppCdnEntity_1 = require("./entity/AppCdnEntity");
const AppConfigVariableEntity_1 = require("./entity/AppConfigVariableEntity");
const AppDataResourceEntity_1 = require("./entity/AppDataResourceEntity");
const AppDeployEntity_1 = require("./entity/AppDeployEntity");
const AppDeploymentEntity_1 = require("./entity/AppDeploymentEntity");
const AppDeploymentOperationEntity_1 = require("./entity/AppDeploymentOperationEntity");
const AppDeploymentRollbackEntity_1 = require("./entity/AppDeploymentRollbackEntity");
const AppEnvironmentEntity_1 = require("./entity/AppEnvironmentEntity");
const AppLocationEntity_1 = require("./entity/AppLocationEntity");
const AppMetricEntity_1 = require("./entity/AppMetricEntity");
const AppPreviewEntity_1 = require("./entity/AppPreviewEntity");
const AppPreviewProfileEntity_1 = require("./entity/AppPreviewProfileEntity");
const AppRunEntity_1 = require("./entity/AppRunEntity");
const AppSecretEntity_1 = require("./entity/AppSecretEntity");
const AppServiceEntity_1 = require("./entity/AppServiceEntity");
const AppServiceBindingEntity_1 = require("./entity/AppServiceBindingEntity");
const AppServicePlacementEntity_1 = require("./entity/AppServicePlacementEntity");
const AppStorageResourceEntity_1 = require("./entity/AppStorageResourceEntity");
const ArtefactEntity_1 = require("./entity/ArtefactEntity");
const ArtefactCommentThreadEntity_1 = require("./entity/ArtefactCommentThreadEntity");
const ArtefactRevisionEntity_1 = require("./entity/ArtefactRevisionEntity");
const ArtefactViewTokenEntity_1 = require("./entity/ArtefactViewTokenEntity");
const ArtifactEntity_1 = require("./entity/ArtifactEntity");
const ArtifactCacheNamespaceEntity_1 = require("./entity/ArtifactCacheNamespaceEntity");
const ArtifactImageRepositoryEntity_1 = require("./entity/ArtifactImageRepositoryEntity");
const ArtifactPackageMirrorEntity_1 = require("./entity/ArtifactPackageMirrorEntity");
const ArtifactRetentionPolicyEntity_1 = require("./entity/ArtifactRetentionPolicyEntity");
const AttachmentPartEntity_1 = require("./entity/AttachmentPartEntity");
const AuditEventEntity_1 = require("./entity/AuditEventEntity");
const AuthEntity_1 = require("./entity/AuthEntity");
const AuthCliEntity_1 = require("./entity/AuthCliEntity");
const AuthGithubEntity_1 = require("./entity/AuthGithubEntity");
const AuthGoogleEntity_1 = require("./entity/AuthGoogleEntity");
const AuthOpenaiEntity_1 = require("./entity/AuthOpenaiEntity");
const AuthPasswordResetEntity_1 = require("./entity/AuthPasswordResetEntity");
const AuthRegistrationOptionEntity_1 = require("./entity/AuthRegistrationOptionEntity");
const AutomationEventEntity_1 = require("./entity/AutomationEventEntity");
const AutomationRunEntity_1 = require("./entity/AutomationRunEntity");
const BackendRunnerPoolEntity_1 = require("./entity/BackendRunnerPoolEntity");
const BazelEntity_1 = require("./entity/BazelEntity");
const BazelActionResultEntity_1 = require("./entity/BazelActionResultEntity");
const BazelBackendEntity_1 = require("./entity/BazelBackendEntity");
const BazelBlobEntity_1 = require("./entity/BazelBlobEntity");
const BazelExecutionEntity_1 = require("./entity/BazelExecutionEntity");
const BazelFindMissingBlobEntity_1 = require("./entity/BazelFindMissingBlobEntity");
const BillingEntity_1 = require("./entity/BillingEntity");
const BillingAddonEntity_1 = require("./entity/BillingAddonEntity");
const BillingCheckoutSessionEntity_1 = require("./entity/BillingCheckoutSessionEntity");
const BillingInvoiceEntity_1 = require("./entity/BillingInvoiceEntity");
const BillingPackageEntity_1 = require("./entity/BillingPackageEntity");
const BillingPortalSessionEntity_1 = require("./entity/BillingPortalSessionEntity");
const BillingPrepaidPeriodEntity_1 = require("./entity/BillingPrepaidPeriodEntity");
const BillingPrepaidPurchaseEntity_1 = require("./entity/BillingPrepaidPurchaseEntity");
const BillingTokenTopUpEntity_1 = require("./entity/BillingTokenTopUpEntity");
const BillingUsageEntity_1 = require("./entity/BillingUsageEntity");
const BinaryEntity_1 = require("./entity/BinaryEntity");
const BinaryVersionEntity_1 = require("./entity/BinaryVersionEntity");
const BookmarkProtectionRefreshGithubRequiredCheckEntity_1 = require("./entity/BookmarkProtectionRefreshGithubRequiredCheckEntity");
const BrowserEgressCandidateEntity_1 = require("./entity/BrowserEgressCandidateEntity");
const BrowserSessionEntity_1 = require("./entity/BrowserSessionEntity");
const BrowserSessionConnectionEntity_1 = require("./entity/BrowserSessionConnectionEntity");
const BrowserSessionControlEntity_1 = require("./entity/BrowserSessionControlEntity");
const BrowserSessionEventEntity_1 = require("./entity/BrowserSessionEventEntity");
const BrowserSessionMediaEntity_1 = require("./entity/BrowserSessionMediaEntity");
const BrowserSessionRecordingEntity_1 = require("./entity/BrowserSessionRecordingEntity");
const BrowserSessionScreenshotEntity_1 = require("./entity/BrowserSessionScreenshotEntity");
const BrowserSessionTaskEntity_1 = require("./entity/BrowserSessionTaskEntity");
const CacheNamespaceEntryEntity_1 = require("./entity/CacheNamespaceEntryEntity");
const CatalogSelectorEntity_1 = require("./entity/CatalogSelectorEntity");
const CdnDeploymentEntity_1 = require("./entity/CdnDeploymentEntity");
const CdnHostnameEntity_1 = require("./entity/CdnHostnameEntity");
const CdnSpaceEntity_1 = require("./entity/CdnSpaceEntity");
const CdnSpaceObjectEntity_1 = require("./entity/CdnSpaceObjectEntity");
const ChangeEntity_1 = require("./entity/ChangeEntity");
const ChangeAssetEntity_1 = require("./entity/ChangeAssetEntity");
const ChangeCommentEntity_1 = require("./entity/ChangeCommentEntity");
const ChangeFileReviewCheckpointEntity_1 = require("./entity/ChangeFileReviewCheckpointEntity");
const ChangeGitBranchSubmissionEntity_1 = require("./entity/ChangeGitBranchSubmissionEntity");
const ChangeGitCommitIdentityEntity_1 = require("./entity/ChangeGitCommitIdentityEntity");
const ChangeGitPublicationEntity_1 = require("./entity/ChangeGitPublicationEntity");
const ChangeGroupMemberEntity_1 = require("./entity/ChangeGroupMemberEntity");
const ChangeLabelEntity_1 = require("./entity/ChangeLabelEntity");
const ChangeLandingHoldEntity_1 = require("./entity/ChangeLandingHoldEntity");
const ChangeLandingRequestEntity_1 = require("./entity/ChangeLandingRequestEntity");
const ChangeRequestChangeEntity_1 = require("./entity/ChangeRequestChangeEntity");
const ChangeReviewerEntity_1 = require("./entity/ChangeReviewerEntity");
const ChangeTranscriptEntity_1 = require("./entity/ChangeTranscriptEntity");
const ChangeTranscriptSummaryEntity_1 = require("./entity/ChangeTranscriptSummaryEntity");
const CheckpointPrepareChunkEntity_1 = require("./entity/CheckpointPrepareChunkEntity");
const CiNodeEntity_1 = require("./entity/CiNodeEntity");
const CiPipelineEntity_1 = require("./entity/CiPipelineEntity");
const CiPipelineRunEntity_1 = require("./entity/CiPipelineRunEntity");
const CiRunnerPoolEntity_1 = require("./entity/CiRunnerPoolEntity");
const CiStatusEntity_1 = require("./entity/CiStatusEntity");
const CliEventEntity_1 = require("./entity/CliEventEntity");
const CliReleaseEntity_1 = require("./entity/CliReleaseEntity");
const CloudWorkspaceBackupObjectEntity_1 = require("./entity/CloudWorkspaceBackupObjectEntity");
const CodeRuleEvaluationEntity_1 = require("./entity/CodeRuleEvaluationEntity");
const ComSiteAccessEntity_1 = require("./entity/ComSiteAccessEntity");
const ComSiteAccessSessionEntity_1 = require("./entity/ComSiteAccessSessionEntity");
const CommentThreadCommentEntity_1 = require("./entity/CommentThreadCommentEntity");
const CommitDiffEntity_1 = require("./entity/CommitDiffEntity");
const ConnectionRequestEntity_1 = require("./entity/ConnectionRequestEntity");
const ConnectionSourceEntity_1 = require("./entity/ConnectionSourceEntity");
const ContactSubmissionEntity_1 = require("./entity/ContactSubmissionEntity");
const ControlComputerEntity_1 = require("./entity/ControlComputerEntity");
const ControlComputerControlOperationEntity_1 = require("./entity/ControlComputerControlOperationEntity");
const CoordinationWaitEntity_1 = require("./entity/CoordinationWaitEntity");
const CredentialSignInCheckEntity_1 = require("./entity/CredentialSignInCheckEntity");
const DataResourceRotateCredentialEntity_1 = require("./entity/DataResourceRotateCredentialEntity");
const DeepScanEntity_1 = require("./entity/DeepScanEntity");
const DeepScanFindingEntity_1 = require("./entity/DeepScanFindingEntity");
const DeepScanFlowEntity_1 = require("./entity/DeepScanFlowEntity");
const DeepScanMappedFlowEntity_1 = require("./entity/DeepScanMappedFlowEntity");
const DeepScanOptionEntity_1 = require("./entity/DeepScanOptionEntity");
const DemoShareEntity_1 = require("./entity/DemoShareEntity");
const DemoShareSegmentEntity_1 = require("./entity/DemoShareSegmentEntity");
const DeploymentEntity_1 = require("./entity/DeploymentEntity");
const DeploymentDashboardNomadEntity_1 = require("./entity/DeploymentDashboardNomadEntity");
const DeploymentDetailEntity_1 = require("./entity/DeploymentDetailEntity");
const DeploymentFileEntity_1 = require("./entity/DeploymentFileEntity");
const DeploymentLogEntity_1 = require("./entity/DeploymentLogEntity");
const DeploymentMetricEntity_1 = require("./entity/DeploymentMetricEntity");
const DeploymentPreviewEntity_1 = require("./entity/DeploymentPreviewEntity");
const DeploymentSettingEntity_1 = require("./entity/DeploymentSettingEntity");
const DesktopLocalAgentModelEntity_1 = require("./entity/DesktopLocalAgentModelEntity");
const DesktopLocalAgentResponseEntity_1 = require("./entity/DesktopLocalAgentResponseEntity");
const DeviceEntity_1 = require("./entity/DeviceEntity");
const DeviceBrowserOperationEntity_1 = require("./entity/DeviceBrowserOperationEntity");
const DeviceControlMessageEntity_1 = require("./entity/DeviceControlMessageEntity");
const DeviceControlOperationEntity_1 = require("./entity/DeviceControlOperationEntity");
const DeviceEnterpriseRelayEntity_1 = require("./entity/DeviceEnterpriseRelayEntity");
const DeviceFolderListingEntity_1 = require("./entity/DeviceFolderListingEntity");
const DeviceGrantEntity_1 = require("./entity/DeviceGrantEntity");
const DeviceInvocationEntity_1 = require("./entity/DeviceInvocationEntity");
const DeviceLocalEventEntity_1 = require("./entity/DeviceLocalEventEntity");
const DevicePairingEntity_1 = require("./entity/DevicePairingEntity");
const DeviceProjectEntity_1 = require("./entity/DeviceProjectEntity");
const DeviceScheduledCheckInEntity_1 = require("./entity/DeviceScheduledCheckInEntity");
const DockerBuilderEntity_1 = require("./entity/DockerBuilderEntity");
const DockerBuilderSessionEntity_1 = require("./entity/DockerBuilderSessionEntity");
const DockerBuilderSettingEntity_1 = require("./entity/DockerBuilderSettingEntity");
const DomainDnsIntegrationEntity_1 = require("./entity/DomainDnsIntegrationEntity");
const DomainPathRuleEntity_1 = require("./entity/DomainPathRuleEntity");
const DreamEntity_1 = require("./entity/DreamEntity");
const EdgeEntity_1 = require("./entity/EdgeEntity");
const EmailVerificationEntity_1 = require("./entity/EmailVerificationEntity");
const EnvironmentEntity_1 = require("./entity/EnvironmentEntity");
const EnvironmentDiscoveryRunEntity_1 = require("./entity/EnvironmentDiscoveryRunEntity");
const EnvironmentExplorationEntity_1 = require("./entity/EnvironmentExplorationEntity");
const EnvironmentFirstRunEntity_1 = require("./entity/EnvironmentFirstRunEntity");
const EnvironmentRevisionEntity_1 = require("./entity/EnvironmentRevisionEntity");
const EnvironmentSecretBindingEntity_1 = require("./entity/EnvironmentSecretBindingEntity");
const EnvironmentTestAccountEntity_1 = require("./entity/EnvironmentTestAccountEntity");
const EvidenceEntity_1 = require("./entity/EvidenceEntity");
const ExecutionDesiredStateEntity_1 = require("./entity/ExecutionDesiredStateEntity");
const ExecutionReconcilerTickEntity_1 = require("./entity/ExecutionReconcilerTickEntity");
const ExecutionReleaseEntity_1 = require("./entity/ExecutionReleaseEntity");
const ExecutionRuntimeInstanceEntity_1 = require("./entity/ExecutionRuntimeInstanceEntity");
const ExplorationEntity_1 = require("./entity/ExplorationEntity");
const ExplorationMessageEntity_1 = require("./entity/ExplorationMessageEntity");
const ExplorationReportEntity_1 = require("./entity/ExplorationReportEntity");
const ExplorationScenarioEntity_1 = require("./entity/ExplorationScenarioEntity");
const FindingEntity_1 = require("./entity/FindingEntity");
const GhEntity_1 = require("./entity/GhEntity");
const GitImportEntity_1 = require("./entity/GitImportEntity");
const GithubEntity_1 = require("./entity/GithubEntity");
const GithubAppEntity_1 = require("./entity/GithubAppEntity");
const GithubAppImportableRepositoryEntity_1 = require("./entity/GithubAppImportableRepositoryEntity");
const GithubAppInstallationEntity_1 = require("./entity/GithubAppInstallationEntity");
const GithubAppInstallationAuthorizationEntity_1 = require("./entity/GithubAppInstallationAuthorizationEntity");
const GithubAppUserAuthorizationEntity_1 = require("./entity/GithubAppUserAuthorizationEntity");
const GithubCiRepositoryEntity_1 = require("./entity/GithubCiRepositoryEntity");
const GithubCiRepositoryCompatibilityReportEntity_1 = require("./entity/GithubCiRepositoryCompatibilityReportEntity");
const GithubConnectionEntity_1 = require("./entity/GithubConnectionEntity");
const GithubIntegrationEntity_1 = require("./entity/GithubIntegrationEntity");
const GithubOnboardingEntity_1 = require("./entity/GithubOnboardingEntity");
const GithubOnboardingBranchEntity_1 = require("./entity/GithubOnboardingBranchEntity");
const GithubOnboardingImportEntity_1 = require("./entity/GithubOnboardingImportEntity");
const GithubOnboardingImportBatchEntity_1 = require("./entity/GithubOnboardingImportBatchEntity");
const GithubOnboardingImportItemEntity_1 = require("./entity/GithubOnboardingImportItemEntity");
const GithubPullRequestEntity_1 = require("./entity/GithubPullRequestEntity");
const GithubRunnerAdmissionEntity_1 = require("./entity/GithubRunnerAdmissionEntity");
const GithubRunnerCacheEntity_1 = require("./entity/GithubRunnerCacheEntity");
const GithubRunnerEgressEntity_1 = require("./entity/GithubRunnerEgressEntity");
const GithubRunnerHistoryEntity_1 = require("./entity/GithubRunnerHistoryEntity");
const GithubRunnerImageEntity_1 = require("./entity/GithubRunnerImageEntity");
const GithubRunnerPoolEntity_1 = require("./entity/GithubRunnerPoolEntity");
const GithubRunnerSetupEntity_1 = require("./entity/GithubRunnerSetupEntity");
const GitlabEntity_1 = require("./entity/GitlabEntity");
const GitlabConnectionEntity_1 = require("./entity/GitlabConnectionEntity");
const GitlabImportEntity_1 = require("./entity/GitlabImportEntity");
const GitlabOauthEntity_1 = require("./entity/GitlabOauthEntity");
const GrantAllAgentEntity_1 = require("./entity/GrantAllAgentEntity");
const HostingAppDomainEntity_1 = require("./entity/HostingAppDomainEntity");
const IdentityOrganizationEntity_1 = require("./entity/IdentityOrganizationEntity");
const ImageRepositoryEntity_1 = require("./entity/ImageRepositoryEntity");
const ImageRepositoryTagEntity_1 = require("./entity/ImageRepositoryTagEntity");
const ImportBranchPolicyEntity_1 = require("./entity/ImportBranchPolicyEntity");
const IntegrationEntity_1 = require("./entity/IntegrationEntity");
const InteractionResponseEntity_1 = require("./entity/InteractionResponseEntity");
const InvitationEntity_1 = require("./entity/InvitationEntity");
const InvocationControlEntity_1 = require("./entity/InvocationControlEntity");
const JobLogChunkEntity_1 = require("./entity/JobLogChunkEntity");
const JobStepEntity_1 = require("./entity/JobStepEntity");
const JobWorkspaceEntity_1 = require("./entity/JobWorkspaceEntity");
const JourneyVariantReplayEntity_1 = require("./entity/JourneyVariantReplayEntity");
const KnowledgeEntity_1 = require("./entity/KnowledgeEntity");
const KnownEntity_1 = require("./entity/KnownEntity");
const LabelEntity_1 = require("./entity/LabelEntity");
const LeaseArtifactEntity_1 = require("./entity/LeaseArtifactEntity");
const LeaseCacheEntity_1 = require("./entity/LeaseCacheEntity");
const LeaseLogChunkEntity_1 = require("./entity/LeaseLogChunkEntity");
const LeaseReconciliationEntity_1 = require("./entity/LeaseReconciliationEntity");
const LeaseStepEntity_1 = require("./entity/LeaseStepEntity");
const LeaseVerifyDiagnosticEntity_1 = require("./entity/LeaseVerifyDiagnosticEntity");
const LeaseVerifySecretEntity_1 = require("./entity/LeaseVerifySecretEntity");
const LeaseWorkspaceEntity_1 = require("./entity/LeaseWorkspaceEntity");
const LocalAgentDecisionEntity_1 = require("./entity/LocalAgentDecisionEntity");
const LocalAgentResponseEntity_1 = require("./entity/LocalAgentResponseEntity");
const LocalThreadDeliveryEntity_1 = require("./entity/LocalThreadDeliveryEntity");
const LocalThreadOperationEntity_1 = require("./entity/LocalThreadOperationEntity");
const LocationEntity_1 = require("./entity/LocationEntity");
const LogStreamChunkEntity_1 = require("./entity/LogStreamChunkEntity");
const LogoImageEntity_1 = require("./entity/LogoImageEntity");
const MarketingSettingEntity_1 = require("./entity/MarketingSettingEntity");
const McpOauthEntity_1 = require("./entity/McpOauthEntity");
const MeEntity_1 = require("./entity/MeEntity");
const MeEmailEntity_1 = require("./entity/MeEmailEntity");
const MeOnboardingEntity_1 = require("./entity/MeOnboardingEntity");
const MediaFileEntity_1 = require("./entity/MediaFileEntity");
const MemberEntity_1 = require("./entity/MemberEntity");
const MemoryEntity_1 = require("./entity/MemoryEntity");
const MergeQueueEntryEntity_1 = require("./entity/MergeQueueEntryEntity");
const MergeRequestEntity_1 = require("./entity/MergeRequestEntity");
const MergeResolutionEntity_1 = require("./entity/MergeResolutionEntity");
const MessagingConversationMessageEntity_1 = require("./entity/MessagingConversationMessageEntity");
const MessagingConversationUploadEntity_1 = require("./entity/MessagingConversationUploadEntity");
const MetricQueryEntity_1 = require("./entity/MetricQueryEntity");
const MetronomeWebhookEntity_1 = require("./entity/MetronomeWebhookEntity");
const ModelSubscriptionAccountEntity_1 = require("./entity/ModelSubscriptionAccountEntity");
const ModelSubscriptionAccountConnectionEntity_1 = require("./entity/ModelSubscriptionAccountConnectionEntity");
const NetworkConnectionEntity_1 = require("./entity/NetworkConnectionEntity");
const NetworkingSpaceEntity_1 = require("./entity/NetworkingSpaceEntity");
const NodeEntity_1 = require("./entity/NodeEntity");
const NodeCertificateEntity_1 = require("./entity/NodeCertificateEntity");
const NodeLeaseEntity_1 = require("./entity/NodeLeaseEntity");
const NomadAllocationEntity_1 = require("./entity/NomadAllocationEntity");
const NomadLogEntity_1 = require("./entity/NomadLogEntity");
const NowEntity_1 = require("./entity/NowEntity");
const ObservabilityClickhouseClusterEntity_1 = require("./entity/ObservabilityClickhouseClusterEntity");
const ObservabilityQuickwitClusterEntity_1 = require("./entity/ObservabilityQuickwitClusterEntity");
const ObservabilitySpaceEntity_1 = require("./entity/ObservabilitySpaceEntity");
const OpenapiEntity_1 = require("./entity/OpenapiEntity");
const OrgInvitationEntity_1 = require("./entity/OrgInvitationEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
const OrganizationAppEntity_1 = require("./entity/OrganizationAppEntity");
const OrganizationControlEntity_1 = require("./entity/OrganizationControlEntity");
const OrganizationDeviceEntity_1 = require("./entity/OrganizationDeviceEntity");
const OrganizationIdentityCertificateEntity_1 = require("./entity/OrganizationIdentityCertificateEntity");
const OrganizationInteractionEntity_1 = require("./entity/OrganizationInteractionEntity");
const OrganizationInvitationEntity_1 = require("./entity/OrganizationInvitationEntity");
const OrganizationMessageFileEntity_1 = require("./entity/OrganizationMessageFileEntity");
const OrganizationOidcTrustEntity_1 = require("./entity/OrganizationOidcTrustEntity");
const OrganizationRunEventEntity_1 = require("./entity/OrganizationRunEventEntity");
const OrganizationRunOutcomeEntity_1 = require("./entity/OrganizationRunOutcomeEntity");
const OrganizationRunUsageEntity_1 = require("./entity/OrganizationRunUsageEntity");
const OrganizationSandboxEntity_1 = require("./entity/OrganizationSandboxEntity");
const OrganizationSecretEntity_1 = require("./entity/OrganizationSecretEntity");
const OrganizationServiceAccountEntity_1 = require("./entity/OrganizationServiceAccountEntity");
const OrganizationSettingEntity_1 = require("./entity/OrganizationSettingEntity");
const OrganizationSiteEntity_1 = require("./entity/OrganizationSiteEntity");
const OrganizationSubscriptionEntity_1 = require("./entity/OrganizationSubscriptionEntity");
const OrganizationToolEntity_1 = require("./entity/OrganizationToolEntity");
const OrganizationWorkloadIdentityEntity_1 = require("./entity/OrganizationWorkloadIdentityEntity");
const OtelIngestEntity_1 = require("./entity/OtelIngestEntity");
const PageEntity_1 = require("./entity/PageEntity");
const PageAgentEntity_1 = require("./entity/PageAgentEntity");
const PageArtefactEntity_1 = require("./entity/PageArtefactEntity");
const PageCiPipelineRunEntity_1 = require("./entity/PageCiPipelineRunEntity");
const PageProjectRunEntity_1 = require("./entity/PageProjectRunEntity");
const PageRepoVcCommitEntity_1 = require("./entity/PageRepoVcCommitEntity");
const PagesBillingEntity_1 = require("./entity/PagesBillingEntity");
const PagesGithubOnboardingEntity_1 = require("./entity/PagesGithubOnboardingEntity");
const PagesMemberEntity_1 = require("./entity/PagesMemberEntity");
const PagesProjectCredentialEntity_1 = require("./entity/PagesProjectCredentialEntity");
const PagesProjectPersonaEntity_1 = require("./entity/PagesProjectPersonaEntity");
const PagesProjectRunEntity_1 = require("./entity/PagesProjectRunEntity");
const PagesProjectScenarioEntity_1 = require("./entity/PagesProjectScenarioEntity");
const PagesRegistryEntity_1 = require("./entity/PagesRegistryEntity");
const PagesSessionEntity_1 = require("./entity/PagesSessionEntity");
const PairingEntity_1 = require("./entity/PairingEntity");
const PairingEventEntity_1 = require("./entity/PairingEventEntity");
const ParallelV1Entity_1 = require("./entity/ParallelV1Entity");
const PatchsetDiffEntity_1 = require("./entity/PatchsetDiffEntity");
const PersonalAccessTokenEntity_1 = require("./entity/PersonalAccessTokenEntity");
const PreviewOperationEntity_1 = require("./entity/PreviewOperationEntity");
const PreviewProfileSecretBindingEntity_1 = require("./entity/PreviewProfileSecretBindingEntity");
const PreviewSecretEntity_1 = require("./entity/PreviewSecretEntity");
const PreviewSharingApprovalEntity_1 = require("./entity/PreviewSharingApprovalEntity");
const ProactiveAgentWaitlistEntryEntity_1 = require("./entity/ProactiveAgentWaitlistEntryEntity");
const ProductEntity_1 = require("./entity/ProductEntity");
const ProductMapIdentityDecisionEntity_1 = require("./entity/ProductMapIdentityDecisionEntity");
const ProductMapJourneyEntity_1 = require("./entity/ProductMapJourneyEntity");
const ProductMapJourneyReplayEntity_1 = require("./entity/ProductMapJourneyReplayEntity");
const ProductMapObservationEntity_1 = require("./entity/ProductMapObservationEntity");
const ProductMapQuestionEntity_1 = require("./entity/ProductMapQuestionEntity");
const ProductMapStateEntity_1 = require("./entity/ProductMapStateEntity");
const ProjectEntity_1 = require("./entity/ProjectEntity");
const ProjectAndroidApkEntity_1 = require("./entity/ProjectAndroidApkEntity");
const ProjectCodeMapEntity_1 = require("./entity/ProjectCodeMapEntity");
const ProjectEnvironmentEntity_1 = require("./entity/ProjectEnvironmentEntity");
const ProjectFindingEntity_1 = require("./entity/ProjectFindingEntity");
const ProjectFixtureEntity_1 = require("./entity/ProjectFixtureEntity");
const ProjectIosAppEntity_1 = require("./entity/ProjectIosAppEntity");
const ProjectMessagingConversationEntity_1 = require("./entity/ProjectMessagingConversationEntity");
const ProjectOverviewMetricEntity_1 = require("./entity/ProjectOverviewMetricEntity");
const ProjectOverviewPullRequestEntity_1 = require("./entity/ProjectOverviewPullRequestEntity");
const ProjectProductMapEntity_1 = require("./entity/ProjectProductMapEntity");
const ProjectRecordingEntity_1 = require("./entity/ProjectRecordingEntity");
const ProjectRunPlanEntity_1 = require("./entity/ProjectRunPlanEntity");
const ProjectRunScheduleEntity_1 = require("./entity/ProjectRunScheduleEntity");
const ProjectScenarioOptionEntity_1 = require("./entity/ProjectScenarioOptionEntity");
const ProjectScenarioRowEntity_1 = require("./entity/ProjectScenarioRowEntity");
const ProjectSettingEntity_1 = require("./entity/ProjectSettingEntity");
const PullRequestEntity_1 = require("./entity/PullRequestEntity");
const PullRequestActionEntity_1 = require("./entity/PullRequestActionEntity");
const PullRequestMagicMergeEntity_1 = require("./entity/PullRequestMagicMergeEntity");
const PullRequestSettingEntity_1 = require("./entity/PullRequestSettingEntity");
const PullRequestSettingAddRepositoryEntity_1 = require("./entity/PullRequestSettingAddRepositoryEntity");
const PullRequestSettingDetectCommentEntity_1 = require("./entity/PullRequestSettingDetectCommentEntity");
const PullRequestTranscriptEntity_1 = require("./entity/PullRequestTranscriptEntity");
const PullZoneEntity_1 = require("./entity/PullZoneEntity");
const RecorderEntity_1 = require("./entity/RecorderEntity");
const RegistryEntity_1 = require("./entity/RegistryEntity");
const RegistryV2Entity_1 = require("./entity/RegistryV2Entity");
const RelayAgentConnectionEntity_1 = require("./entity/RelayAgentConnectionEntity");
const RelayAgentLocalThreadEntity_1 = require("./entity/RelayAgentLocalThreadEntity");
const RelaySignalEntity_1 = require("./entity/RelaySignalEntity");
const ReleaseRolloutEntity_1 = require("./entity/ReleaseRolloutEntity");
const RepoEntity_1 = require("./entity/RepoEntity");
const RepoAccessTokenEntity_1 = require("./entity/RepoAccessTokenEntity");
const RepoActionEntity_1 = require("./entity/RepoActionEntity");
const RepoAgentCheckpointEntity_1 = require("./entity/RepoAgentCheckpointEntity");
const RepoAgentSessionEntity_1 = require("./entity/RepoAgentSessionEntity");
const RepoBookmarkProtectionEntity_1 = require("./entity/RepoBookmarkProtectionEntity");
const RepoBookmarkProtectionEventEntity_1 = require("./entity/RepoBookmarkProtectionEventEntity");
const RepoCloudWorkspaceBackupEntity_1 = require("./entity/RepoCloudWorkspaceBackupEntity");
const RepoCodeRuleEntity_1 = require("./entity/RepoCodeRuleEntity");
const RepoSettingEntity_1 = require("./entity/RepoSettingEntity");
const RepoStatEntity_1 = require("./entity/RepoStatEntity");
const RepoVcEntity_1 = require("./entity/RepoVcEntity");
const RepoVcCommitEntity_1 = require("./entity/RepoVcCommitEntity");
const ReportReplayEntity_1 = require("./entity/ReportReplayEntity");
const ReportScenarioEntity_1 = require("./entity/ReportScenarioEntity");
const RepositoryAccessEntity_1 = require("./entity/RepositoryAccessEntity");
const RepositoryAccessResolveEntity_1 = require("./entity/RepositoryAccessResolveEntity");
const RepositoryEventEntity_1 = require("./entity/RepositoryEventEntity");
const RepositoryImportEntity_1 = require("./entity/RepositoryImportEntity");
const RepositoryImportSessionEntity_1 = require("./entity/RepositoryImportSessionEntity");
const RepositoryImportSessionRepositoryEntity_1 = require("./entity/RepositoryImportSessionRepositoryEntity");
const RepositoryImportSessionSelectionEntity_1 = require("./entity/RepositoryImportSessionSelectionEntity");
const RepositorySandboxEnvironmentEntity_1 = require("./entity/RepositorySandboxEnvironmentEntity");
const RoderCodeRepairEntity_1 = require("./entity/RoderCodeRepairEntity");
const RoderCodeRepairSettingEntity_1 = require("./entity/RoderCodeRepairSettingEntity");
const RoderMachineEntity_1 = require("./entity/RoderMachineEntity");
const RoderRunEntity_1 = require("./entity/RoderRunEntity");
const RoderWorkspaceCredentialEntity_1 = require("./entity/RoderWorkspaceCredentialEntity");
const RunArtifactEntity_1 = require("./entity/RunArtifactEntity");
const RunJobEntity_1 = require("./entity/RunJobEntity");
const RunScenarioRunEntity_1 = require("./entity/RunScenarioRunEntity");
const RunScheduleOptionEntity_1 = require("./entity/RunScheduleOptionEntity");
const RunSearchEntity_1 = require("./entity/RunSearchEntity");
const RunUpdateEntity_1 = require("./entity/RunUpdateEntity");
const RunWorkspaceCredentialEntity_1 = require("./entity/RunWorkspaceCredentialEntity");
const RunnerLeaseEntity_1 = require("./entity/RunnerLeaseEntity");
const RunnerPoolNodeEnrollmentTokenEntity_1 = require("./entity/RunnerPoolNodeEnrollmentTokenEntity");
const RunnerPoolRunnerEntity_1 = require("./entity/RunnerPoolRunnerEntity");
const RuntimeInstanceHealthSnapshotEntity_1 = require("./entity/RuntimeInstanceHealthSnapshotEntity");
const SandboxIntegrationEntity_1 = require("./entity/SandboxIntegrationEntity");
const ScenarioRevisionEntity_1 = require("./entity/ScenarioRevisionEntity");
const ScenarioRunLessonEntity_1 = require("./entity/ScenarioRunLessonEntity");
const ScenarioRunScenarioEditEntity_1 = require("./entity/ScenarioRunScenarioEditEntity");
const SecretGrantEntity_1 = require("./entity/SecretGrantEntity");
const SecretVersionEntity_1 = require("./entity/SecretVersionEntity");
const ServiceEndpointEntity_1 = require("./entity/ServiceEndpointEntity");
const SettingEntity_1 = require("./entity/SettingEntity");
const SettingMutationLeaseEntity_1 = require("./entity/SettingMutationLeaseEntity");
const SignalEntity_1 = require("./entity/SignalEntity");
const SignalInboundEntity_1 = require("./entity/SignalInboundEntity");
const SignalIntegrationEntity_1 = require("./entity/SignalIntegrationEntity");
const SignalIntegrationDeliveryEntity_1 = require("./entity/SignalIntegrationDeliveryEntity");
const SignalIntegrationTargetEntity_1 = require("./entity/SignalIntegrationTargetEntity");
const SignalSubscriptionEntity_1 = require("./entity/SignalSubscriptionEntity");
const SiteEntity_1 = require("./entity/SiteEntity");
const SiteAccessKeyEntity_1 = require("./entity/SiteAccessKeyEntity");
const SitePreviewEntity_1 = require("./entity/SitePreviewEntity");
const SiteSecretEntity_1 = require("./entity/SiteSecretEntity");
const SlackChannelEntity_1 = require("./entity/SlackChannelEntity");
const SourceConnectionEntity_1 = require("./entity/SourceConnectionEntity");
const SpaceAlertRuleEntity_1 = require("./entity/SpaceAlertRuleEntity");
const SpaceAuditEventEntity_1 = require("./entity/SpaceAuditEventEntity");
const SpaceDnsRecordEntity_1 = require("./entity/SpaceDnsRecordEntity");
const SpaceEnrollmentTokenEntity_1 = require("./entity/SpaceEnrollmentTokenEntity");
const SpaceGatewayEntity_1 = require("./entity/SpaceGatewayEntity");
const SpaceGroupEntity_1 = require("./entity/SpaceGroupEntity");
const SpaceGroupMembershipEntity_1 = require("./entity/SpaceGroupMembershipEntity");
const SpaceLogStreamEntity_1 = require("./entity/SpaceLogStreamEntity");
const SpaceMetricSeryEntity_1 = require("./entity/SpaceMetricSeryEntity");
const SpaceOtelCollectorEntity_1 = require("./entity/SpaceOtelCollectorEntity");
const SpacePeerEntity_1 = require("./entity/SpacePeerEntity");
const SpacePeerAttachmentEntity_1 = require("./entity/SpacePeerAttachmentEntity");
const SpacePolicyEntity_1 = require("./entity/SpacePolicyEntity");
const SpaceSegmentEntity_1 = require("./entity/SpaceSegmentEntity");
const SpaceTraceSpanEntity_1 = require("./entity/SpaceTraceSpanEntity");
const SparkEntity_1 = require("./entity/SparkEntity");
const SparkAgentIntegrationEntity_1 = require("./entity/SparkAgentIntegrationEntity");
const SparkAgentLocalThreadEntity_1 = require("./entity/SparkAgentLocalThreadEntity");
const SparkAgentSiteEntity_1 = require("./entity/SparkAgentSiteEntity");
const SparkAgentSkillEntity_1 = require("./entity/SparkAgentSkillEntity");
const SparkAgentThreadEntity_1 = require("./entity/SparkAgentThreadEntity");
const SparkCreditEntity_1 = require("./entity/SparkCreditEntity");
const SparkCreditAgentUsageEntity_1 = require("./entity/SparkCreditAgentUsageEntity");
const SparkCreditUsageTotalEntity_1 = require("./entity/SparkCreditUsageTotalEntity");
const StaticSiteEntity_1 = require("./entity/StaticSiteEntity");
const StaticSiteDeploymentEntity_1 = require("./entity/StaticSiteDeploymentEntity");
const StaticSiteDomainEntity_1 = require("./entity/StaticSiteDomainEntity");
const StatusChangeEntity_1 = require("./entity/StatusChangeEntity");
const StatusCommitEntity_1 = require("./entity/StatusCommitEntity");
const StatusPatchsetEntity_1 = require("./entity/StatusPatchsetEntity");
const StripeWebhookEntity_1 = require("./entity/StripeWebhookEntity");
const SubmitTelemetryEntity_1 = require("./entity/SubmitTelemetryEntity");
const SubscriptionModelEntity_1 = require("./entity/SubscriptionModelEntity");
const SwarmEventEntity_1 = require("./entity/SwarmEventEntity");
const SwarmLiveEntity_1 = require("./entity/SwarmLiveEntity");
const SwarmNoteEntity_1 = require("./entity/SwarmNoteEntity");
const SwarmTaskEntity_1 = require("./entity/SwarmTaskEntity");
const TaskLeaseEntity_1 = require("./entity/TaskLeaseEntity");
const ThreadPreviewEntity_1 = require("./entity/ThreadPreviewEntity");
const ThreadPreviewAccessEntity_1 = require("./entity/ThreadPreviewAccessEntity");
const ToolFeedbackEntity_1 = require("./entity/ToolFeedbackEntity");
const TranscriptEntity_1 = require("./entity/TranscriptEntity");
const V1MessageEntity_1 = require("./entity/V1MessageEntity");
const VcBranchEntity_1 = require("./entity/VcBranchEntity");
const VcBrowserEntity_1 = require("./entity/VcBrowserEntity");
const VcChangeEntity_1 = require("./entity/VcChangeEntity");
const VcChangeGroupEntity_1 = require("./entity/VcChangeGroupEntity");
const VcFileEntity_1 = require("./entity/VcFileEntity");
const VcMergeQueueEntity_1 = require("./entity/VcMergeQueueEntity");
const VcStackEntity_1 = require("./entity/VcStackEntity");
const VcsNodeEntity_1 = require("./entity/VcsNodeEntity");
const VcsSettingEntity_1 = require("./entity/VcsSettingEntity");
const VerificationProjectCredentialEntity_1 = require("./entity/VerificationProjectCredentialEntity");
const VerificationProjectPersonaEntity_1 = require("./entity/VerificationProjectPersonaEntity");
const VerificationProjectRunEntity_1 = require("./entity/VerificationProjectRunEntity");
const VerificationProjectScenarioEntity_1 = require("./entity/VerificationProjectScenarioEntity");
const VerifyAppDomainEntity_1 = require("./entity/VerifyAppDomainEntity");
const VerifyBrowserSessionEntity_1 = require("./entity/VerifyBrowserSessionEntity");
const VerifyEmailVerificationEntity_1 = require("./entity/VerifyEmailVerificationEntity");
const VerifySignalIntegrationEntity_1 = require("./entity/VerifySignalIntegrationEntity");
const VerifyStaticSiteDomainEntity_1 = require("./entity/VerifyStaticSiteDomainEntity");
const VersionLogEntity_1 = require("./entity/VersionLogEntity");
const WaitlistApplicationEntity_1 = require("./entity/WaitlistApplicationEntity");
const WebBotAuthEntity_1 = require("./entity/WebBotAuthEntity");
const WebhookGitlabEntity_1 = require("./entity/WebhookGitlabEntity");
const WorkflowRunStepEntity_1 = require("./entity/WorkflowRunStepEntity");
const WorkflowRunStopNoticeEntity_1 = require("./entity/WorkflowRunStopNoticeEntity");
const WorkflowTriggerSkippedEntity_1 = require("./entity/WorkflowTriggerSkippedEntity");
const WorkspaceActivityEntity_1 = require("./entity/WorkspaceActivityEntity");
const WorkspaceActivityNotificationEntity_1 = require("./entity/WorkspaceActivityNotificationEntity");
const WorkspaceSpaceEntity_1 = require("./entity/WorkspaceSpaceEntity");
const WorkspaceSpacePreferenceEntity_1 = require("./entity/WorkspaceSpacePreferenceEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const ComposalEntityBase_1 = require("./ComposalEntityBase");
Object.defineProperty(exports, "ComposalEntityBase", { enumerable: true, get: function () { return ComposalEntityBase_1.ComposalEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const sekreto = __importStar(require("./feature/secrets/sekreto"));
exports.sekreto = sekreto;
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class ComposalSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    _secrets;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    secrets() {
        return this._secrets && this._secrets.sekreto();
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
            spec.headers.accept = 'application/json';
        }
        if (null != this._secrets) {
            try {
                await this._secrets.resolve();
            }
            catch (err) {
                return err instanceof Error ? err : new Error(String(err));
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('ComposalSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('ComposalSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('ComposalSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.A2aWellKnown().list()` / `client.A2aWellKnown().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    A2aWellKnown(entopts) {
        const self = this;
        return new A2aWellKnownEntity_1.A2aWellKnownEntity(self, entopts);
    }
    // Entity access: `client.AdminOrg().list()` / `client.AdminOrg().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AdminOrg(entopts) {
        const self = this;
        return new AdminOrgEntity_1.AdminOrgEntity(self, entopts);
    }
    // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Agent(entopts) {
        const self = this;
        return new AgentEntity_1.AgentEntity(self, entopts);
    }
    // Entity access: `client.AgentApp().list()` / `client.AgentApp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentApp(entopts) {
        const self = this;
        return new AgentAppEntity_1.AgentAppEntity(self, entopts);
    }
    // Entity access: `client.AgentAppInstall().list()` / `client.AgentAppInstall().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAppInstall(entopts) {
        const self = this;
        return new AgentAppInstallEntity_1.AgentAppInstallEntity(self, entopts);
    }
    // Entity access: `client.AgentAttachment().list()` / `client.AgentAttachment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAttachment(entopts) {
        const self = this;
        return new AgentAttachmentEntity_1.AgentAttachmentEntity(self, entopts);
    }
    // Entity access: `client.AgentAutomation().list()` / `client.AgentAutomation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAutomation(entopts) {
        const self = this;
        return new AgentAutomationEntity_1.AgentAutomationEntity(self, entopts);
    }
    // Entity access: `client.AgentAvatar().list()` / `client.AgentAvatar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAvatar(entopts) {
        const self = this;
        return new AgentAvatarEntity_1.AgentAvatarEntity(self, entopts);
    }
    // Entity access: `client.AgentCommand().list()` / `client.AgentCommand().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentCommand(entopts) {
        const self = this;
        return new AgentCommandEntity_1.AgentCommandEntity(self, entopts);
    }
    // Entity access: `client.AgentComputer().list()` / `client.AgentComputer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentComputer(entopts) {
        const self = this;
        return new AgentComputerEntity_1.AgentComputerEntity(self, entopts);
    }
    // Entity access: `client.AgentConnection().list()` / `client.AgentConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnection(entopts) {
        const self = this;
        return new AgentConnectionEntity_1.AgentConnectionEntity(self, entopts);
    }
    // Entity access: `client.AgentConnectionDelegation().list()` / `client.AgentConnectionDelegation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnectionDelegation(entopts) {
        const self = this;
        return new AgentConnectionDelegationEntity_1.AgentConnectionDelegationEntity(self, entopts);
    }
    // Entity access: `client.AgentConnectionGrant().list()` / `client.AgentConnectionGrant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnectionGrant(entopts) {
        const self = this;
        return new AgentConnectionGrantEntity_1.AgentConnectionGrantEntity(self, entopts);
    }
    // Entity access: `client.AgentConnectionResource().list()` / `client.AgentConnectionResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnectionResource(entopts) {
        const self = this;
        return new AgentConnectionResourceEntity_1.AgentConnectionResourceEntity(self, entopts);
    }
    // Entity access: `client.AgentConnectionSafetyControl().list()` / `client.AgentConnectionSafetyControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnectionSafetyControl(entopts) {
        const self = this;
        return new AgentConnectionSafetyControlEntity_1.AgentConnectionSafetyControlEntity(self, entopts);
    }
    // Entity access: `client.AgentConnectionTriggerSubscription().list()` / `client.AgentConnectionTriggerSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnectionTriggerSubscription(entopts) {
        const self = this;
        return new AgentConnectionTriggerSubscriptionEntity_1.AgentConnectionTriggerSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.AgentContextCheckpoint().list()` / `client.AgentContextCheckpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentContextCheckpoint(entopts) {
        const self = this;
        return new AgentContextCheckpointEntity_1.AgentContextCheckpointEntity(self, entopts);
    }
    // Entity access: `client.AgentControlFlow().list()` / `client.AgentControlFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentControlFlow(entopts) {
        const self = this;
        return new AgentControlFlowEntity_1.AgentControlFlowEntity(self, entopts);
    }
    // Entity access: `client.AgentCoordination().list()` / `client.AgentCoordination().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentCoordination(entopts) {
        const self = this;
        return new AgentCoordinationEntity_1.AgentCoordinationEntity(self, entopts);
    }
    // Entity access: `client.AgentEmail().list()` / `client.AgentEmail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentEmail(entopts) {
        const self = this;
        return new AgentEmailEntity_1.AgentEmailEntity(self, entopts);
    }
    // Entity access: `client.AgentEvent().list()` / `client.AgentEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentEvent(entopts) {
        const self = this;
        return new AgentEventEntity_1.AgentEventEntity(self, entopts);
    }
    // Entity access: `client.AgentFile().list()` / `client.AgentFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentFile(entopts) {
        const self = this;
        return new AgentFileEntity_1.AgentFileEntity(self, entopts);
    }
    // Entity access: `client.AgentInput().list()` / `client.AgentInput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentInput(entopts) {
        const self = this;
        return new AgentInputEntity_1.AgentInputEntity(self, entopts);
    }
    // Entity access: `client.AgentIntegration().list()` / `client.AgentIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentIntegration(entopts) {
        const self = this;
        return new AgentIntegrationEntity_1.AgentIntegrationEntity(self, entopts);
    }
    // Entity access: `client.AgentIntegrationAccount().list()` / `client.AgentIntegrationAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentIntegrationAccount(entopts) {
        const self = this;
        return new AgentIntegrationAccountEntity_1.AgentIntegrationAccountEntity(self, entopts);
    }
    // Entity access: `client.AgentIntegrationCallback().list()` / `client.AgentIntegrationCallback().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentIntegrationCallback(entopts) {
        const self = this;
        return new AgentIntegrationCallbackEntity_1.AgentIntegrationCallbackEntity(self, entopts);
    }
    // Entity access: `client.AgentInteraction().list()` / `client.AgentInteraction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentInteraction(entopts) {
        const self = this;
        return new AgentInteractionEntity_1.AgentInteractionEntity(self, entopts);
    }
    // Entity access: `client.AgentLibrary().list()` / `client.AgentLibrary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentLibrary(entopts) {
        const self = this;
        return new AgentLibraryEntity_1.AgentLibraryEntity(self, entopts);
    }
    // Entity access: `client.AgentManager().list()` / `client.AgentManager().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentManager(entopts) {
        const self = this;
        return new AgentManagerEntity_1.AgentManagerEntity(self, entopts);
    }
    // Entity access: `client.AgentManagerChoice().list()` / `client.AgentManagerChoice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentManagerChoice(entopts) {
        const self = this;
        return new AgentManagerChoiceEntity_1.AgentManagerChoiceEntity(self, entopts);
    }
    // Entity access: `client.AgentMarketplace().list()` / `client.AgentMarketplace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMarketplace(entopts) {
        const self = this;
        return new AgentMarketplaceEntity_1.AgentMarketplaceEntity(self, entopts);
    }
    // Entity access: `client.AgentMarketplaceShared().list()` / `client.AgentMarketplaceShared().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMarketplaceShared(entopts) {
        const self = this;
        return new AgentMarketplaceSharedEntity_1.AgentMarketplaceSharedEntity(self, entopts);
    }
    // Entity access: `client.AgentMissionControl().list()` / `client.AgentMissionControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMissionControl(entopts) {
        const self = this;
        return new AgentMissionControlEntity_1.AgentMissionControlEntity(self, entopts);
    }
    // Entity access: `client.AgentOperation().list()` / `client.AgentOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentOperation(entopts) {
        const self = this;
        return new AgentOperationEntity_1.AgentOperationEntity(self, entopts);
    }
    // Entity access: `client.AgentProvisioning().list()` / `client.AgentProvisioning().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentProvisioning(entopts) {
        const self = this;
        return new AgentProvisioningEntity_1.AgentProvisioningEntity(self, entopts);
    }
    // Entity access: `client.AgentPullRequest().list()` / `client.AgentPullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentPullRequest(entopts) {
        const self = this;
        return new AgentPullRequestEntity_1.AgentPullRequestEntity(self, entopts);
    }
    // Entity access: `client.AgentQuestion().list()` / `client.AgentQuestion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentQuestion(entopts) {
        const self = this;
        return new AgentQuestionEntity_1.AgentQuestionEntity(self, entopts);
    }
    // Entity access: `client.AgentRelayFileGrant().list()` / `client.AgentRelayFileGrant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRelayFileGrant(entopts) {
        const self = this;
        return new AgentRelayFileGrantEntity_1.AgentRelayFileGrantEntity(self, entopts);
    }
    // Entity access: `client.AgentRelayFileGrantAccount().list()` / `client.AgentRelayFileGrantAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRelayFileGrantAccount(entopts) {
        const self = this;
        return new AgentRelayFileGrantAccountEntity_1.AgentRelayFileGrantAccountEntity(self, entopts);
    }
    // Entity access: `client.AgentRepository().list()` / `client.AgentRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRepository(entopts) {
        const self = this;
        return new AgentRepositoryEntity_1.AgentRepositoryEntity(self, entopts);
    }
    // Entity access: `client.AgentResource().list()` / `client.AgentResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentResource(entopts) {
        const self = this;
        return new AgentResourceEntity_1.AgentResourceEntity(self, entopts);
    }
    // Entity access: `client.AgentRoder().list()` / `client.AgentRoder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRoder(entopts) {
        const self = this;
        return new AgentRoderEntity_1.AgentRoderEntity(self, entopts);
    }
    // Entity access: `client.AgentRoutine().list()` / `client.AgentRoutine().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRoutine(entopts) {
        const self = this;
        return new AgentRoutineEntity_1.AgentRoutineEntity(self, entopts);
    }
    // Entity access: `client.AgentRun().list()` / `client.AgentRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRun(entopts) {
        const self = this;
        return new AgentRunEntity_1.AgentRunEntity(self, entopts);
    }
    // Entity access: `client.AgentRuntime().list()` / `client.AgentRuntime().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRuntime(entopts) {
        const self = this;
        return new AgentRuntimeEntity_1.AgentRuntimeEntity(self, entopts);
    }
    // Entity access: `client.AgentSession().list()` / `client.AgentSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSession(entopts) {
        const self = this;
        return new AgentSessionEntity_1.AgentSessionEntity(self, entopts);
    }
    // Entity access: `client.AgentSessionCheckpoint().list()` / `client.AgentSessionCheckpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSessionCheckpoint(entopts) {
        const self = this;
        return new AgentSessionCheckpointEntity_1.AgentSessionCheckpointEntity(self, entopts);
    }
    // Entity access: `client.AgentSessionRoderHandoff().list()` / `client.AgentSessionRoderHandoff().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSessionRoderHandoff(entopts) {
        const self = this;
        return new AgentSessionRoderHandoffEntity_1.AgentSessionRoderHandoffEntity(self, entopts);
    }
    // Entity access: `client.AgentSetting().list()` / `client.AgentSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSetting(entopts) {
        const self = this;
        return new AgentSettingEntity_1.AgentSettingEntity(self, entopts);
    }
    // Entity access: `client.AgentSharing().list()` / `client.AgentSharing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSharing(entopts) {
        const self = this;
        return new AgentSharingEntity_1.AgentSharingEntity(self, entopts);
    }
    // Entity access: `client.AgentSite().list()` / `client.AgentSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSite(entopts) {
        const self = this;
        return new AgentSiteEntity_1.AgentSiteEntity(self, entopts);
    }
    // Entity access: `client.AgentSkill().list()` / `client.AgentSkill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSkill(entopts) {
        const self = this;
        return new AgentSkillEntity_1.AgentSkillEntity(self, entopts);
    }
    // Entity access: `client.AgentSlack().list()` / `client.AgentSlack().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSlack(entopts) {
        const self = this;
        return new AgentSlackEntity_1.AgentSlackEntity(self, entopts);
    }
    // Entity access: `client.AgentSubagent().list()` / `client.AgentSubagent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSubagent(entopts) {
        const self = this;
        return new AgentSubagentEntity_1.AgentSubagentEntity(self, entopts);
    }
    // Entity access: `client.AgentSubscription().list()` / `client.AgentSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSubscription(entopts) {
        const self = this;
        return new AgentSubscriptionEntity_1.AgentSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.AgentSwarm().list()` / `client.AgentSwarm().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSwarm(entopts) {
        const self = this;
        return new AgentSwarmEntity_1.AgentSwarmEntity(self, entopts);
    }
    // Entity access: `client.AgentTeammate().list()` / `client.AgentTeammate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTeammate(entopts) {
        const self = this;
        return new AgentTeammateEntity_1.AgentTeammateEntity(self, entopts);
    }
    // Entity access: `client.AgentTerminal().list()` / `client.AgentTerminal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTerminal(entopts) {
        const self = this;
        return new AgentTerminalEntity_1.AgentTerminalEntity(self, entopts);
    }
    // Entity access: `client.AgentThread().list()` / `client.AgentThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentThread(entopts) {
        const self = this;
        return new AgentThreadEntity_1.AgentThreadEntity(self, entopts);
    }
    // Entity access: `client.AgentTool().list()` / `client.AgentTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTool(entopts) {
        const self = this;
        return new AgentToolEntity_1.AgentToolEntity(self, entopts);
    }
    // Entity access: `client.AgentUsage().list()` / `client.AgentUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentUsage(entopts) {
        const self = this;
        return new AgentUsageEntity_1.AgentUsageEntity(self, entopts);
    }
    // Entity access: `client.AgentVerifyProject().list()` / `client.AgentVerifyProject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentVerifyProject(entopts) {
        const self = this;
        return new AgentVerifyProjectEntity_1.AgentVerifyProjectEntity(self, entopts);
    }
    // Entity access: `client.AgentWait().list()` / `client.AgentWait().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWait(entopts) {
        const self = this;
        return new AgentWaitEntity_1.AgentWaitEntity(self, entopts);
    }
    // Entity access: `client.AgentWebPreview().list()` / `client.AgentWebPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWebPreview(entopts) {
        const self = this;
        return new AgentWebPreviewEntity_1.AgentWebPreviewEntity(self, entopts);
    }
    // Entity access: `client.AgentWebhook().list()` / `client.AgentWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWebhook(entopts) {
        const self = this;
        return new AgentWebhookEntity_1.AgentWebhookEntity(self, entopts);
    }
    // Entity access: `client.AgentWork().list()` / `client.AgentWork().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWork(entopts) {
        const self = this;
        return new AgentWorkEntity_1.AgentWorkEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflow().list()` / `client.AgentWorkflow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflow(entopts) {
        const self = this;
        return new AgentWorkflowEntity_1.AgentWorkflowEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowProposal().list()` / `client.AgentWorkflowProposal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowProposal(entopts) {
        const self = this;
        return new AgentWorkflowProposalEntity_1.AgentWorkflowProposalEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowRun().list()` / `client.AgentWorkflowRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowRun(entopts) {
        const self = this;
        return new AgentWorkflowRunEntity_1.AgentWorkflowRunEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowTrigger().list()` / `client.AgentWorkflowTrigger().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowTrigger(entopts) {
        const self = this;
        return new AgentWorkflowTriggerEntity_1.AgentWorkflowTriggerEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkspace().list()` / `client.AgentWorkspace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkspace(entopts) {
        const self = this;
        return new AgentWorkspaceEntity_1.AgentWorkspaceEntity(self, entopts);
    }
    // Entity access: `client.AgentWritePermission().list()` / `client.AgentWritePermission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWritePermission(entopts) {
        const self = this;
        return new AgentWritePermissionEntity_1.AgentWritePermissionEntity(self, entopts);
    }
    // Entity access: `client.Agreement().list()` / `client.Agreement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Agreement(entopts) {
        const self = this;
        return new AgreementEntity_1.AgreementEntity(self, entopts);
    }
    // Entity access: `client.AgreementAccessRequest().list()` / `client.AgreementAccessRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgreementAccessRequest(entopts) {
        const self = this;
        return new AgreementAccessRequestEntity_1.AgreementAccessRequestEntity(self, entopts);
    }
    // Entity access: `client.AlertRuleEvent().list()` / `client.AlertRuleEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AlertRuleEvent(entopts) {
        const self = this;
        return new AlertRuleEventEntity_1.AlertRuleEventEntity(self, entopts);
    }
    // Entity access: `client.AllocationLog().list()` / `client.AllocationLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AllocationLog(entopts) {
        const self = this;
        return new AllocationLogEntity_1.AllocationLogEntity(self, entopts);
    }
    // Entity access: `client.App().list()` / `client.App().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    App(entopts) {
        const self = this;
        return new AppEntity_1.AppEntity(self, entopts);
    }
    // Entity access: `client.AppAccess().list()` / `client.AppAccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppAccess(entopts) {
        const self = this;
        return new AppAccessEntity_1.AppAccessEntity(self, entopts);
    }
    // Entity access: `client.AppAccessJwk().list()` / `client.AppAccessJwk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppAccessJwk(entopts) {
        const self = this;
        return new AppAccessJwkEntity_1.AppAccessJwkEntity(self, entopts);
    }
    // Entity access: `client.AppCdn().list()` / `client.AppCdn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppCdn(entopts) {
        const self = this;
        return new AppCdnEntity_1.AppCdnEntity(self, entopts);
    }
    // Entity access: `client.AppConfigVariable().list()` / `client.AppConfigVariable().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppConfigVariable(entopts) {
        const self = this;
        return new AppConfigVariableEntity_1.AppConfigVariableEntity(self, entopts);
    }
    // Entity access: `client.AppDataResource().list()` / `client.AppDataResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDataResource(entopts) {
        const self = this;
        return new AppDataResourceEntity_1.AppDataResourceEntity(self, entopts);
    }
    // Entity access: `client.AppDeploy().list()` / `client.AppDeploy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploy(entopts) {
        const self = this;
        return new AppDeployEntity_1.AppDeployEntity(self, entopts);
    }
    // Entity access: `client.AppDeployment().list()` / `client.AppDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeployment(entopts) {
        const self = this;
        return new AppDeploymentEntity_1.AppDeploymentEntity(self, entopts);
    }
    // Entity access: `client.AppDeploymentOperation().list()` / `client.AppDeploymentOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploymentOperation(entopts) {
        const self = this;
        return new AppDeploymentOperationEntity_1.AppDeploymentOperationEntity(self, entopts);
    }
    // Entity access: `client.AppDeploymentRollback().list()` / `client.AppDeploymentRollback().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploymentRollback(entopts) {
        const self = this;
        return new AppDeploymentRollbackEntity_1.AppDeploymentRollbackEntity(self, entopts);
    }
    // Entity access: `client.AppEnvironment().list()` / `client.AppEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppEnvironment(entopts) {
        const self = this;
        return new AppEnvironmentEntity_1.AppEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.AppLocation().list()` / `client.AppLocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppLocation(entopts) {
        const self = this;
        return new AppLocationEntity_1.AppLocationEntity(self, entopts);
    }
    // Entity access: `client.AppMetric().list()` / `client.AppMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppMetric(entopts) {
        const self = this;
        return new AppMetricEntity_1.AppMetricEntity(self, entopts);
    }
    // Entity access: `client.AppPreview().list()` / `client.AppPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppPreview(entopts) {
        const self = this;
        return new AppPreviewEntity_1.AppPreviewEntity(self, entopts);
    }
    // Entity access: `client.AppPreviewProfile().list()` / `client.AppPreviewProfile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppPreviewProfile(entopts) {
        const self = this;
        return new AppPreviewProfileEntity_1.AppPreviewProfileEntity(self, entopts);
    }
    // Entity access: `client.AppRun().list()` / `client.AppRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppRun(entopts) {
        const self = this;
        return new AppRunEntity_1.AppRunEntity(self, entopts);
    }
    // Entity access: `client.AppSecret().list()` / `client.AppSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppSecret(entopts) {
        const self = this;
        return new AppSecretEntity_1.AppSecretEntity(self, entopts);
    }
    // Entity access: `client.AppService().list()` / `client.AppService().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppService(entopts) {
        const self = this;
        return new AppServiceEntity_1.AppServiceEntity(self, entopts);
    }
    // Entity access: `client.AppServiceBinding().list()` / `client.AppServiceBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppServiceBinding(entopts) {
        const self = this;
        return new AppServiceBindingEntity_1.AppServiceBindingEntity(self, entopts);
    }
    // Entity access: `client.AppServicePlacement().list()` / `client.AppServicePlacement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppServicePlacement(entopts) {
        const self = this;
        return new AppServicePlacementEntity_1.AppServicePlacementEntity(self, entopts);
    }
    // Entity access: `client.AppStorageResource().list()` / `client.AppStorageResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppStorageResource(entopts) {
        const self = this;
        return new AppStorageResourceEntity_1.AppStorageResourceEntity(self, entopts);
    }
    // Entity access: `client.Artefact().list()` / `client.Artefact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Artefact(entopts) {
        const self = this;
        return new ArtefactEntity_1.ArtefactEntity(self, entopts);
    }
    // Entity access: `client.ArtefactCommentThread().list()` / `client.ArtefactCommentThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtefactCommentThread(entopts) {
        const self = this;
        return new ArtefactCommentThreadEntity_1.ArtefactCommentThreadEntity(self, entopts);
    }
    // Entity access: `client.ArtefactRevision().list()` / `client.ArtefactRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtefactRevision(entopts) {
        const self = this;
        return new ArtefactRevisionEntity_1.ArtefactRevisionEntity(self, entopts);
    }
    // Entity access: `client.ArtefactViewToken().list()` / `client.ArtefactViewToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtefactViewToken(entopts) {
        const self = this;
        return new ArtefactViewTokenEntity_1.ArtefactViewTokenEntity(self, entopts);
    }
    // Entity access: `client.Artifact().list()` / `client.Artifact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Artifact(entopts) {
        const self = this;
        return new ArtifactEntity_1.ArtifactEntity(self, entopts);
    }
    // Entity access: `client.ArtifactCacheNamespace().list()` / `client.ArtifactCacheNamespace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactCacheNamespace(entopts) {
        const self = this;
        return new ArtifactCacheNamespaceEntity_1.ArtifactCacheNamespaceEntity(self, entopts);
    }
    // Entity access: `client.ArtifactImageRepository().list()` / `client.ArtifactImageRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactImageRepository(entopts) {
        const self = this;
        return new ArtifactImageRepositoryEntity_1.ArtifactImageRepositoryEntity(self, entopts);
    }
    // Entity access: `client.ArtifactPackageMirror().list()` / `client.ArtifactPackageMirror().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactPackageMirror(entopts) {
        const self = this;
        return new ArtifactPackageMirrorEntity_1.ArtifactPackageMirrorEntity(self, entopts);
    }
    // Entity access: `client.ArtifactRetentionPolicy().list()` / `client.ArtifactRetentionPolicy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactRetentionPolicy(entopts) {
        const self = this;
        return new ArtifactRetentionPolicyEntity_1.ArtifactRetentionPolicyEntity(self, entopts);
    }
    // Entity access: `client.AttachmentPart().list()` / `client.AttachmentPart().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AttachmentPart(entopts) {
        const self = this;
        return new AttachmentPartEntity_1.AttachmentPartEntity(self, entopts);
    }
    // Entity access: `client.AuditEvent().list()` / `client.AuditEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuditEvent(entopts) {
        const self = this;
        return new AuditEventEntity_1.AuditEventEntity(self, entopts);
    }
    // Entity access: `client.Auth().list()` / `client.Auth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Auth(entopts) {
        const self = this;
        return new AuthEntity_1.AuthEntity(self, entopts);
    }
    // Entity access: `client.AuthCli().list()` / `client.AuthCli().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthCli(entopts) {
        const self = this;
        return new AuthCliEntity_1.AuthCliEntity(self, entopts);
    }
    // Entity access: `client.AuthGithub().list()` / `client.AuthGithub().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthGithub(entopts) {
        const self = this;
        return new AuthGithubEntity_1.AuthGithubEntity(self, entopts);
    }
    // Entity access: `client.AuthGoogle().list()` / `client.AuthGoogle().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthGoogle(entopts) {
        const self = this;
        return new AuthGoogleEntity_1.AuthGoogleEntity(self, entopts);
    }
    // Entity access: `client.AuthOpenai().list()` / `client.AuthOpenai().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthOpenai(entopts) {
        const self = this;
        return new AuthOpenaiEntity_1.AuthOpenaiEntity(self, entopts);
    }
    // Entity access: `client.AuthPasswordReset().list()` / `client.AuthPasswordReset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthPasswordReset(entopts) {
        const self = this;
        return new AuthPasswordResetEntity_1.AuthPasswordResetEntity(self, entopts);
    }
    // Entity access: `client.AuthRegistrationOption().list()` / `client.AuthRegistrationOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuthRegistrationOption(entopts) {
        const self = this;
        return new AuthRegistrationOptionEntity_1.AuthRegistrationOptionEntity(self, entopts);
    }
    // Entity access: `client.AutomationEvent().list()` / `client.AutomationEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AutomationEvent(entopts) {
        const self = this;
        return new AutomationEventEntity_1.AutomationEventEntity(self, entopts);
    }
    // Entity access: `client.AutomationRun().list()` / `client.AutomationRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AutomationRun(entopts) {
        const self = this;
        return new AutomationRunEntity_1.AutomationRunEntity(self, entopts);
    }
    // Entity access: `client.BackendRunnerPool().list()` / `client.BackendRunnerPool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BackendRunnerPool(entopts) {
        const self = this;
        return new BackendRunnerPoolEntity_1.BackendRunnerPoolEntity(self, entopts);
    }
    // Entity access: `client.Bazel().list()` / `client.Bazel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Bazel(entopts) {
        const self = this;
        return new BazelEntity_1.BazelEntity(self, entopts);
    }
    // Entity access: `client.BazelActionResult().list()` / `client.BazelActionResult().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BazelActionResult(entopts) {
        const self = this;
        return new BazelActionResultEntity_1.BazelActionResultEntity(self, entopts);
    }
    // Entity access: `client.BazelBackend().list()` / `client.BazelBackend().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BazelBackend(entopts) {
        const self = this;
        return new BazelBackendEntity_1.BazelBackendEntity(self, entopts);
    }
    // Entity access: `client.BazelBlob().list()` / `client.BazelBlob().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BazelBlob(entopts) {
        const self = this;
        return new BazelBlobEntity_1.BazelBlobEntity(self, entopts);
    }
    // Entity access: `client.BazelExecution().list()` / `client.BazelExecution().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BazelExecution(entopts) {
        const self = this;
        return new BazelExecutionEntity_1.BazelExecutionEntity(self, entopts);
    }
    // Entity access: `client.BazelFindMissingBlob().list()` / `client.BazelFindMissingBlob().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BazelFindMissingBlob(entopts) {
        const self = this;
        return new BazelFindMissingBlobEntity_1.BazelFindMissingBlobEntity(self, entopts);
    }
    // Entity access: `client.Billing().list()` / `client.Billing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Billing(entopts) {
        const self = this;
        return new BillingEntity_1.BillingEntity(self, entopts);
    }
    // Entity access: `client.BillingAddon().list()` / `client.BillingAddon().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingAddon(entopts) {
        const self = this;
        return new BillingAddonEntity_1.BillingAddonEntity(self, entopts);
    }
    // Entity access: `client.BillingCheckoutSession().list()` / `client.BillingCheckoutSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingCheckoutSession(entopts) {
        const self = this;
        return new BillingCheckoutSessionEntity_1.BillingCheckoutSessionEntity(self, entopts);
    }
    // Entity access: `client.BillingInvoice().list()` / `client.BillingInvoice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingInvoice(entopts) {
        const self = this;
        return new BillingInvoiceEntity_1.BillingInvoiceEntity(self, entopts);
    }
    // Entity access: `client.BillingPackage().list()` / `client.BillingPackage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPackage(entopts) {
        const self = this;
        return new BillingPackageEntity_1.BillingPackageEntity(self, entopts);
    }
    // Entity access: `client.BillingPortalSession().list()` / `client.BillingPortalSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPortalSession(entopts) {
        const self = this;
        return new BillingPortalSessionEntity_1.BillingPortalSessionEntity(self, entopts);
    }
    // Entity access: `client.BillingPrepaidPeriod().list()` / `client.BillingPrepaidPeriod().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPrepaidPeriod(entopts) {
        const self = this;
        return new BillingPrepaidPeriodEntity_1.BillingPrepaidPeriodEntity(self, entopts);
    }
    // Entity access: `client.BillingPrepaidPurchase().list()` / `client.BillingPrepaidPurchase().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPrepaidPurchase(entopts) {
        const self = this;
        return new BillingPrepaidPurchaseEntity_1.BillingPrepaidPurchaseEntity(self, entopts);
    }
    // Entity access: `client.BillingTokenTopUp().list()` / `client.BillingTokenTopUp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingTokenTopUp(entopts) {
        const self = this;
        return new BillingTokenTopUpEntity_1.BillingTokenTopUpEntity(self, entopts);
    }
    // Entity access: `client.BillingUsage().list()` / `client.BillingUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingUsage(entopts) {
        const self = this;
        return new BillingUsageEntity_1.BillingUsageEntity(self, entopts);
    }
    // Entity access: `client.Binary().list()` / `client.Binary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Binary(entopts) {
        const self = this;
        return new BinaryEntity_1.BinaryEntity(self, entopts);
    }
    // Entity access: `client.BinaryVersion().list()` / `client.BinaryVersion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BinaryVersion(entopts) {
        const self = this;
        return new BinaryVersionEntity_1.BinaryVersionEntity(self, entopts);
    }
    // Entity access: `client.BookmarkProtectionRefreshGithubRequiredCheck().list()` / `client.BookmarkProtectionRefreshGithubRequiredCheck().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BookmarkProtectionRefreshGithubRequiredCheck(entopts) {
        const self = this;
        return new BookmarkProtectionRefreshGithubRequiredCheckEntity_1.BookmarkProtectionRefreshGithubRequiredCheckEntity(self, entopts);
    }
    // Entity access: `client.BrowserEgressCandidate().list()` / `client.BrowserEgressCandidate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserEgressCandidate(entopts) {
        const self = this;
        return new BrowserEgressCandidateEntity_1.BrowserEgressCandidateEntity(self, entopts);
    }
    // Entity access: `client.BrowserSession().list()` / `client.BrowserSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSession(entopts) {
        const self = this;
        return new BrowserSessionEntity_1.BrowserSessionEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionConnection().list()` / `client.BrowserSessionConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionConnection(entopts) {
        const self = this;
        return new BrowserSessionConnectionEntity_1.BrowserSessionConnectionEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionControl().list()` / `client.BrowserSessionControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionControl(entopts) {
        const self = this;
        return new BrowserSessionControlEntity_1.BrowserSessionControlEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionEvent().list()` / `client.BrowserSessionEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionEvent(entopts) {
        const self = this;
        return new BrowserSessionEventEntity_1.BrowserSessionEventEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionMedia().list()` / `client.BrowserSessionMedia().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionMedia(entopts) {
        const self = this;
        return new BrowserSessionMediaEntity_1.BrowserSessionMediaEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionRecording().list()` / `client.BrowserSessionRecording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionRecording(entopts) {
        const self = this;
        return new BrowserSessionRecordingEntity_1.BrowserSessionRecordingEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionScreenshot().list()` / `client.BrowserSessionScreenshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionScreenshot(entopts) {
        const self = this;
        return new BrowserSessionScreenshotEntity_1.BrowserSessionScreenshotEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionTask().list()` / `client.BrowserSessionTask().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionTask(entopts) {
        const self = this;
        return new BrowserSessionTaskEntity_1.BrowserSessionTaskEntity(self, entopts);
    }
    // Entity access: `client.CacheNamespaceEntry().list()` / `client.CacheNamespaceEntry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CacheNamespaceEntry(entopts) {
        const self = this;
        return new CacheNamespaceEntryEntity_1.CacheNamespaceEntryEntity(self, entopts);
    }
    // Entity access: `client.CatalogSelector().list()` / `client.CatalogSelector().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CatalogSelector(entopts) {
        const self = this;
        return new CatalogSelectorEntity_1.CatalogSelectorEntity(self, entopts);
    }
    // Entity access: `client.CdnDeployment().list()` / `client.CdnDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnDeployment(entopts) {
        const self = this;
        return new CdnDeploymentEntity_1.CdnDeploymentEntity(self, entopts);
    }
    // Entity access: `client.CdnHostname().list()` / `client.CdnHostname().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnHostname(entopts) {
        const self = this;
        return new CdnHostnameEntity_1.CdnHostnameEntity(self, entopts);
    }
    // Entity access: `client.CdnSpace().list()` / `client.CdnSpace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnSpace(entopts) {
        const self = this;
        return new CdnSpaceEntity_1.CdnSpaceEntity(self, entopts);
    }
    // Entity access: `client.CdnSpaceObject().list()` / `client.CdnSpaceObject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnSpaceObject(entopts) {
        const self = this;
        return new CdnSpaceObjectEntity_1.CdnSpaceObjectEntity(self, entopts);
    }
    // Entity access: `client.Change().list()` / `client.Change().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Change(entopts) {
        const self = this;
        return new ChangeEntity_1.ChangeEntity(self, entopts);
    }
    // Entity access: `client.ChangeAsset().list()` / `client.ChangeAsset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeAsset(entopts) {
        const self = this;
        return new ChangeAssetEntity_1.ChangeAssetEntity(self, entopts);
    }
    // Entity access: `client.ChangeComment().list()` / `client.ChangeComment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeComment(entopts) {
        const self = this;
        return new ChangeCommentEntity_1.ChangeCommentEntity(self, entopts);
    }
    // Entity access: `client.ChangeFileReviewCheckpoint().list()` / `client.ChangeFileReviewCheckpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeFileReviewCheckpoint(entopts) {
        const self = this;
        return new ChangeFileReviewCheckpointEntity_1.ChangeFileReviewCheckpointEntity(self, entopts);
    }
    // Entity access: `client.ChangeGitBranchSubmission().list()` / `client.ChangeGitBranchSubmission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeGitBranchSubmission(entopts) {
        const self = this;
        return new ChangeGitBranchSubmissionEntity_1.ChangeGitBranchSubmissionEntity(self, entopts);
    }
    // Entity access: `client.ChangeGitCommitIdentity().list()` / `client.ChangeGitCommitIdentity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeGitCommitIdentity(entopts) {
        const self = this;
        return new ChangeGitCommitIdentityEntity_1.ChangeGitCommitIdentityEntity(self, entopts);
    }
    // Entity access: `client.ChangeGitPublication().list()` / `client.ChangeGitPublication().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeGitPublication(entopts) {
        const self = this;
        return new ChangeGitPublicationEntity_1.ChangeGitPublicationEntity(self, entopts);
    }
    // Entity access: `client.ChangeGroupMember().list()` / `client.ChangeGroupMember().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeGroupMember(entopts) {
        const self = this;
        return new ChangeGroupMemberEntity_1.ChangeGroupMemberEntity(self, entopts);
    }
    // Entity access: `client.ChangeLabel().list()` / `client.ChangeLabel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeLabel(entopts) {
        const self = this;
        return new ChangeLabelEntity_1.ChangeLabelEntity(self, entopts);
    }
    // Entity access: `client.ChangeLandingHold().list()` / `client.ChangeLandingHold().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeLandingHold(entopts) {
        const self = this;
        return new ChangeLandingHoldEntity_1.ChangeLandingHoldEntity(self, entopts);
    }
    // Entity access: `client.ChangeLandingRequest().list()` / `client.ChangeLandingRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeLandingRequest(entopts) {
        const self = this;
        return new ChangeLandingRequestEntity_1.ChangeLandingRequestEntity(self, entopts);
    }
    // Entity access: `client.ChangeRequestChange().list()` / `client.ChangeRequestChange().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeRequestChange(entopts) {
        const self = this;
        return new ChangeRequestChangeEntity_1.ChangeRequestChangeEntity(self, entopts);
    }
    // Entity access: `client.ChangeReviewer().list()` / `client.ChangeReviewer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeReviewer(entopts) {
        const self = this;
        return new ChangeReviewerEntity_1.ChangeReviewerEntity(self, entopts);
    }
    // Entity access: `client.ChangeTranscript().list()` / `client.ChangeTranscript().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeTranscript(entopts) {
        const self = this;
        return new ChangeTranscriptEntity_1.ChangeTranscriptEntity(self, entopts);
    }
    // Entity access: `client.ChangeTranscriptSummary().list()` / `client.ChangeTranscriptSummary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeTranscriptSummary(entopts) {
        const self = this;
        return new ChangeTranscriptSummaryEntity_1.ChangeTranscriptSummaryEntity(self, entopts);
    }
    // Entity access: `client.CheckpointPrepareChunk().list()` / `client.CheckpointPrepareChunk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CheckpointPrepareChunk(entopts) {
        const self = this;
        return new CheckpointPrepareChunkEntity_1.CheckpointPrepareChunkEntity(self, entopts);
    }
    // Entity access: `client.CiNode().list()` / `client.CiNode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CiNode(entopts) {
        const self = this;
        return new CiNodeEntity_1.CiNodeEntity(self, entopts);
    }
    // Entity access: `client.CiPipeline().list()` / `client.CiPipeline().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CiPipeline(entopts) {
        const self = this;
        return new CiPipelineEntity_1.CiPipelineEntity(self, entopts);
    }
    // Entity access: `client.CiPipelineRun().list()` / `client.CiPipelineRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CiPipelineRun(entopts) {
        const self = this;
        return new CiPipelineRunEntity_1.CiPipelineRunEntity(self, entopts);
    }
    // Entity access: `client.CiRunnerPool().list()` / `client.CiRunnerPool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CiRunnerPool(entopts) {
        const self = this;
        return new CiRunnerPoolEntity_1.CiRunnerPoolEntity(self, entopts);
    }
    // Entity access: `client.CiStatus().list()` / `client.CiStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CiStatus(entopts) {
        const self = this;
        return new CiStatusEntity_1.CiStatusEntity(self, entopts);
    }
    // Entity access: `client.CliEvent().list()` / `client.CliEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CliEvent(entopts) {
        const self = this;
        return new CliEventEntity_1.CliEventEntity(self, entopts);
    }
    // Entity access: `client.CliRelease().list()` / `client.CliRelease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CliRelease(entopts) {
        const self = this;
        return new CliReleaseEntity_1.CliReleaseEntity(self, entopts);
    }
    // Entity access: `client.CloudWorkspaceBackupObject().list()` / `client.CloudWorkspaceBackupObject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CloudWorkspaceBackupObject(entopts) {
        const self = this;
        return new CloudWorkspaceBackupObjectEntity_1.CloudWorkspaceBackupObjectEntity(self, entopts);
    }
    // Entity access: `client.CodeRuleEvaluation().list()` / `client.CodeRuleEvaluation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CodeRuleEvaluation(entopts) {
        const self = this;
        return new CodeRuleEvaluationEntity_1.CodeRuleEvaluationEntity(self, entopts);
    }
    // Entity access: `client.ComSiteAccess().list()` / `client.ComSiteAccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ComSiteAccess(entopts) {
        const self = this;
        return new ComSiteAccessEntity_1.ComSiteAccessEntity(self, entopts);
    }
    // Entity access: `client.ComSiteAccessSession().list()` / `client.ComSiteAccessSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ComSiteAccessSession(entopts) {
        const self = this;
        return new ComSiteAccessSessionEntity_1.ComSiteAccessSessionEntity(self, entopts);
    }
    // Entity access: `client.CommentThreadComment().list()` / `client.CommentThreadComment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CommentThreadComment(entopts) {
        const self = this;
        return new CommentThreadCommentEntity_1.CommentThreadCommentEntity(self, entopts);
    }
    // Entity access: `client.CommitDiff().list()` / `client.CommitDiff().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CommitDiff(entopts) {
        const self = this;
        return new CommitDiffEntity_1.CommitDiffEntity(self, entopts);
    }
    // Entity access: `client.ConnectionRequest().list()` / `client.ConnectionRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConnectionRequest(entopts) {
        const self = this;
        return new ConnectionRequestEntity_1.ConnectionRequestEntity(self, entopts);
    }
    // Entity access: `client.ConnectionSource().list()` / `client.ConnectionSource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConnectionSource(entopts) {
        const self = this;
        return new ConnectionSourceEntity_1.ConnectionSourceEntity(self, entopts);
    }
    // Entity access: `client.ContactSubmission().list()` / `client.ContactSubmission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactSubmission(entopts) {
        const self = this;
        return new ContactSubmissionEntity_1.ContactSubmissionEntity(self, entopts);
    }
    // Entity access: `client.ControlComputer().list()` / `client.ControlComputer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ControlComputer(entopts) {
        const self = this;
        return new ControlComputerEntity_1.ControlComputerEntity(self, entopts);
    }
    // Entity access: `client.ControlComputerControlOperation().list()` / `client.ControlComputerControlOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ControlComputerControlOperation(entopts) {
        const self = this;
        return new ControlComputerControlOperationEntity_1.ControlComputerControlOperationEntity(self, entopts);
    }
    // Entity access: `client.CoordinationWait().list()` / `client.CoordinationWait().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CoordinationWait(entopts) {
        const self = this;
        return new CoordinationWaitEntity_1.CoordinationWaitEntity(self, entopts);
    }
    // Entity access: `client.CredentialSignInCheck().list()` / `client.CredentialSignInCheck().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CredentialSignInCheck(entopts) {
        const self = this;
        return new CredentialSignInCheckEntity_1.CredentialSignInCheckEntity(self, entopts);
    }
    // Entity access: `client.DataResourceRotateCredential().list()` / `client.DataResourceRotateCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DataResourceRotateCredential(entopts) {
        const self = this;
        return new DataResourceRotateCredentialEntity_1.DataResourceRotateCredentialEntity(self, entopts);
    }
    // Entity access: `client.DeepScan().list()` / `client.DeepScan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScan(entopts) {
        const self = this;
        return new DeepScanEntity_1.DeepScanEntity(self, entopts);
    }
    // Entity access: `client.DeepScanFinding().list()` / `client.DeepScanFinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanFinding(entopts) {
        const self = this;
        return new DeepScanFindingEntity_1.DeepScanFindingEntity(self, entopts);
    }
    // Entity access: `client.DeepScanFlow().list()` / `client.DeepScanFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanFlow(entopts) {
        const self = this;
        return new DeepScanFlowEntity_1.DeepScanFlowEntity(self, entopts);
    }
    // Entity access: `client.DeepScanMappedFlow().list()` / `client.DeepScanMappedFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanMappedFlow(entopts) {
        const self = this;
        return new DeepScanMappedFlowEntity_1.DeepScanMappedFlowEntity(self, entopts);
    }
    // Entity access: `client.DeepScanOption().list()` / `client.DeepScanOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanOption(entopts) {
        const self = this;
        return new DeepScanOptionEntity_1.DeepScanOptionEntity(self, entopts);
    }
    // Entity access: `client.DemoShare().list()` / `client.DemoShare().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DemoShare(entopts) {
        const self = this;
        return new DemoShareEntity_1.DemoShareEntity(self, entopts);
    }
    // Entity access: `client.DemoShareSegment().list()` / `client.DemoShareSegment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DemoShareSegment(entopts) {
        const self = this;
        return new DemoShareSegmentEntity_1.DemoShareSegmentEntity(self, entopts);
    }
    // Entity access: `client.Deployment().list()` / `client.Deployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Deployment(entopts) {
        const self = this;
        return new DeploymentEntity_1.DeploymentEntity(self, entopts);
    }
    // Entity access: `client.DeploymentDashboardNomad().list()` / `client.DeploymentDashboardNomad().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentDashboardNomad(entopts) {
        const self = this;
        return new DeploymentDashboardNomadEntity_1.DeploymentDashboardNomadEntity(self, entopts);
    }
    // Entity access: `client.DeploymentDetail().list()` / `client.DeploymentDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentDetail(entopts) {
        const self = this;
        return new DeploymentDetailEntity_1.DeploymentDetailEntity(self, entopts);
    }
    // Entity access: `client.DeploymentFile().list()` / `client.DeploymentFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentFile(entopts) {
        const self = this;
        return new DeploymentFileEntity_1.DeploymentFileEntity(self, entopts);
    }
    // Entity access: `client.DeploymentLog().list()` / `client.DeploymentLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentLog(entopts) {
        const self = this;
        return new DeploymentLogEntity_1.DeploymentLogEntity(self, entopts);
    }
    // Entity access: `client.DeploymentMetric().list()` / `client.DeploymentMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentMetric(entopts) {
        const self = this;
        return new DeploymentMetricEntity_1.DeploymentMetricEntity(self, entopts);
    }
    // Entity access: `client.DeploymentPreview().list()` / `client.DeploymentPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentPreview(entopts) {
        const self = this;
        return new DeploymentPreviewEntity_1.DeploymentPreviewEntity(self, entopts);
    }
    // Entity access: `client.DeploymentSetting().list()` / `client.DeploymentSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentSetting(entopts) {
        const self = this;
        return new DeploymentSettingEntity_1.DeploymentSettingEntity(self, entopts);
    }
    // Entity access: `client.DesktopLocalAgentModel().list()` / `client.DesktopLocalAgentModel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DesktopLocalAgentModel(entopts) {
        const self = this;
        return new DesktopLocalAgentModelEntity_1.DesktopLocalAgentModelEntity(self, entopts);
    }
    // Entity access: `client.DesktopLocalAgentResponse().list()` / `client.DesktopLocalAgentResponse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DesktopLocalAgentResponse(entopts) {
        const self = this;
        return new DesktopLocalAgentResponseEntity_1.DesktopLocalAgentResponseEntity(self, entopts);
    }
    // Entity access: `client.Device().list()` / `client.Device().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Device(entopts) {
        const self = this;
        return new DeviceEntity_1.DeviceEntity(self, entopts);
    }
    // Entity access: `client.DeviceBrowserOperation().list()` / `client.DeviceBrowserOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceBrowserOperation(entopts) {
        const self = this;
        return new DeviceBrowserOperationEntity_1.DeviceBrowserOperationEntity(self, entopts);
    }
    // Entity access: `client.DeviceControlMessage().list()` / `client.DeviceControlMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceControlMessage(entopts) {
        const self = this;
        return new DeviceControlMessageEntity_1.DeviceControlMessageEntity(self, entopts);
    }
    // Entity access: `client.DeviceControlOperation().list()` / `client.DeviceControlOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceControlOperation(entopts) {
        const self = this;
        return new DeviceControlOperationEntity_1.DeviceControlOperationEntity(self, entopts);
    }
    // Entity access: `client.DeviceEnterpriseRelay().list()` / `client.DeviceEnterpriseRelay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceEnterpriseRelay(entopts) {
        const self = this;
        return new DeviceEnterpriseRelayEntity_1.DeviceEnterpriseRelayEntity(self, entopts);
    }
    // Entity access: `client.DeviceFolderListing().list()` / `client.DeviceFolderListing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceFolderListing(entopts) {
        const self = this;
        return new DeviceFolderListingEntity_1.DeviceFolderListingEntity(self, entopts);
    }
    // Entity access: `client.DeviceGrant().list()` / `client.DeviceGrant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceGrant(entopts) {
        const self = this;
        return new DeviceGrantEntity_1.DeviceGrantEntity(self, entopts);
    }
    // Entity access: `client.DeviceInvocation().list()` / `client.DeviceInvocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceInvocation(entopts) {
        const self = this;
        return new DeviceInvocationEntity_1.DeviceInvocationEntity(self, entopts);
    }
    // Entity access: `client.DeviceLocalEvent().list()` / `client.DeviceLocalEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceLocalEvent(entopts) {
        const self = this;
        return new DeviceLocalEventEntity_1.DeviceLocalEventEntity(self, entopts);
    }
    // Entity access: `client.DevicePairing().list()` / `client.DevicePairing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DevicePairing(entopts) {
        const self = this;
        return new DevicePairingEntity_1.DevicePairingEntity(self, entopts);
    }
    // Entity access: `client.DeviceProject().list()` / `client.DeviceProject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceProject(entopts) {
        const self = this;
        return new DeviceProjectEntity_1.DeviceProjectEntity(self, entopts);
    }
    // Entity access: `client.DeviceScheduledCheckIn().list()` / `client.DeviceScheduledCheckIn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeviceScheduledCheckIn(entopts) {
        const self = this;
        return new DeviceScheduledCheckInEntity_1.DeviceScheduledCheckInEntity(self, entopts);
    }
    // Entity access: `client.DockerBuilder().list()` / `client.DockerBuilder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DockerBuilder(entopts) {
        const self = this;
        return new DockerBuilderEntity_1.DockerBuilderEntity(self, entopts);
    }
    // Entity access: `client.DockerBuilderSession().list()` / `client.DockerBuilderSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DockerBuilderSession(entopts) {
        const self = this;
        return new DockerBuilderSessionEntity_1.DockerBuilderSessionEntity(self, entopts);
    }
    // Entity access: `client.DockerBuilderSetting().list()` / `client.DockerBuilderSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DockerBuilderSetting(entopts) {
        const self = this;
        return new DockerBuilderSettingEntity_1.DockerBuilderSettingEntity(self, entopts);
    }
    // Entity access: `client.DomainDnsIntegration().list()` / `client.DomainDnsIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainDnsIntegration(entopts) {
        const self = this;
        return new DomainDnsIntegrationEntity_1.DomainDnsIntegrationEntity(self, entopts);
    }
    // Entity access: `client.DomainPathRule().list()` / `client.DomainPathRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainPathRule(entopts) {
        const self = this;
        return new DomainPathRuleEntity_1.DomainPathRuleEntity(self, entopts);
    }
    // Entity access: `client.Dream().list()` / `client.Dream().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dream(entopts) {
        const self = this;
        return new DreamEntity_1.DreamEntity(self, entopts);
    }
    // Entity access: `client.Edge().list()` / `client.Edge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Edge(entopts) {
        const self = this;
        return new EdgeEntity_1.EdgeEntity(self, entopts);
    }
    // Entity access: `client.EmailVerification().list()` / `client.EmailVerification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailVerification(entopts) {
        const self = this;
        return new EmailVerificationEntity_1.EmailVerificationEntity(self, entopts);
    }
    // Entity access: `client.Environment().list()` / `client.Environment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Environment(entopts) {
        const self = this;
        return new EnvironmentEntity_1.EnvironmentEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentDiscoveryRun().list()` / `client.EnvironmentDiscoveryRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentDiscoveryRun(entopts) {
        const self = this;
        return new EnvironmentDiscoveryRunEntity_1.EnvironmentDiscoveryRunEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentExploration().list()` / `client.EnvironmentExploration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentExploration(entopts) {
        const self = this;
        return new EnvironmentExplorationEntity_1.EnvironmentExplorationEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentFirstRun().list()` / `client.EnvironmentFirstRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentFirstRun(entopts) {
        const self = this;
        return new EnvironmentFirstRunEntity_1.EnvironmentFirstRunEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentRevision().list()` / `client.EnvironmentRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentRevision(entopts) {
        const self = this;
        return new EnvironmentRevisionEntity_1.EnvironmentRevisionEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentSecretBinding().list()` / `client.EnvironmentSecretBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentSecretBinding(entopts) {
        const self = this;
        return new EnvironmentSecretBindingEntity_1.EnvironmentSecretBindingEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentTestAccount().list()` / `client.EnvironmentTestAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentTestAccount(entopts) {
        const self = this;
        return new EnvironmentTestAccountEntity_1.EnvironmentTestAccountEntity(self, entopts);
    }
    // Entity access: `client.Evidence().list()` / `client.Evidence().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Evidence(entopts) {
        const self = this;
        return new EvidenceEntity_1.EvidenceEntity(self, entopts);
    }
    // Entity access: `client.ExecutionDesiredState().list()` / `client.ExecutionDesiredState().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExecutionDesiredState(entopts) {
        const self = this;
        return new ExecutionDesiredStateEntity_1.ExecutionDesiredStateEntity(self, entopts);
    }
    // Entity access: `client.ExecutionReconcilerTick().list()` / `client.ExecutionReconcilerTick().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExecutionReconcilerTick(entopts) {
        const self = this;
        return new ExecutionReconcilerTickEntity_1.ExecutionReconcilerTickEntity(self, entopts);
    }
    // Entity access: `client.ExecutionRelease().list()` / `client.ExecutionRelease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExecutionRelease(entopts) {
        const self = this;
        return new ExecutionReleaseEntity_1.ExecutionReleaseEntity(self, entopts);
    }
    // Entity access: `client.ExecutionRuntimeInstance().list()` / `client.ExecutionRuntimeInstance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExecutionRuntimeInstance(entopts) {
        const self = this;
        return new ExecutionRuntimeInstanceEntity_1.ExecutionRuntimeInstanceEntity(self, entopts);
    }
    // Entity access: `client.Exploration().list()` / `client.Exploration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Exploration(entopts) {
        const self = this;
        return new ExplorationEntity_1.ExplorationEntity(self, entopts);
    }
    // Entity access: `client.ExplorationMessage().list()` / `client.ExplorationMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationMessage(entopts) {
        const self = this;
        return new ExplorationMessageEntity_1.ExplorationMessageEntity(self, entopts);
    }
    // Entity access: `client.ExplorationReport().list()` / `client.ExplorationReport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationReport(entopts) {
        const self = this;
        return new ExplorationReportEntity_1.ExplorationReportEntity(self, entopts);
    }
    // Entity access: `client.ExplorationScenario().list()` / `client.ExplorationScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationScenario(entopts) {
        const self = this;
        return new ExplorationScenarioEntity_1.ExplorationScenarioEntity(self, entopts);
    }
    // Entity access: `client.Finding().list()` / `client.Finding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Finding(entopts) {
        const self = this;
        return new FindingEntity_1.FindingEntity(self, entopts);
    }
    // Entity access: `client.Gh().list()` / `client.Gh().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Gh(entopts) {
        const self = this;
        return new GhEntity_1.GhEntity(self, entopts);
    }
    // Entity access: `client.GitImport().list()` / `client.GitImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitImport(entopts) {
        const self = this;
        return new GitImportEntity_1.GitImportEntity(self, entopts);
    }
    // Entity access: `client.Github().list()` / `client.Github().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Github(entopts) {
        const self = this;
        return new GithubEntity_1.GithubEntity(self, entopts);
    }
    // Entity access: `client.GithubApp().list()` / `client.GithubApp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubApp(entopts) {
        const self = this;
        return new GithubAppEntity_1.GithubAppEntity(self, entopts);
    }
    // Entity access: `client.GithubAppImportableRepository().list()` / `client.GithubAppImportableRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubAppImportableRepository(entopts) {
        const self = this;
        return new GithubAppImportableRepositoryEntity_1.GithubAppImportableRepositoryEntity(self, entopts);
    }
    // Entity access: `client.GithubAppInstallation().list()` / `client.GithubAppInstallation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubAppInstallation(entopts) {
        const self = this;
        return new GithubAppInstallationEntity_1.GithubAppInstallationEntity(self, entopts);
    }
    // Entity access: `client.GithubAppInstallationAuthorization().list()` / `client.GithubAppInstallationAuthorization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubAppInstallationAuthorization(entopts) {
        const self = this;
        return new GithubAppInstallationAuthorizationEntity_1.GithubAppInstallationAuthorizationEntity(self, entopts);
    }
    // Entity access: `client.GithubAppUserAuthorization().list()` / `client.GithubAppUserAuthorization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubAppUserAuthorization(entopts) {
        const self = this;
        return new GithubAppUserAuthorizationEntity_1.GithubAppUserAuthorizationEntity(self, entopts);
    }
    // Entity access: `client.GithubCiRepository().list()` / `client.GithubCiRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubCiRepository(entopts) {
        const self = this;
        return new GithubCiRepositoryEntity_1.GithubCiRepositoryEntity(self, entopts);
    }
    // Entity access: `client.GithubCiRepositoryCompatibilityReport().list()` / `client.GithubCiRepositoryCompatibilityReport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubCiRepositoryCompatibilityReport(entopts) {
        const self = this;
        return new GithubCiRepositoryCompatibilityReportEntity_1.GithubCiRepositoryCompatibilityReportEntity(self, entopts);
    }
    // Entity access: `client.GithubConnection().list()` / `client.GithubConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubConnection(entopts) {
        const self = this;
        return new GithubConnectionEntity_1.GithubConnectionEntity(self, entopts);
    }
    // Entity access: `client.GithubIntegration().list()` / `client.GithubIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubIntegration(entopts) {
        const self = this;
        return new GithubIntegrationEntity_1.GithubIntegrationEntity(self, entopts);
    }
    // Entity access: `client.GithubOnboarding().list()` / `client.GithubOnboarding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubOnboarding(entopts) {
        const self = this;
        return new GithubOnboardingEntity_1.GithubOnboardingEntity(self, entopts);
    }
    // Entity access: `client.GithubOnboardingBranch().list()` / `client.GithubOnboardingBranch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubOnboardingBranch(entopts) {
        const self = this;
        return new GithubOnboardingBranchEntity_1.GithubOnboardingBranchEntity(self, entopts);
    }
    // Entity access: `client.GithubOnboardingImport().list()` / `client.GithubOnboardingImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubOnboardingImport(entopts) {
        const self = this;
        return new GithubOnboardingImportEntity_1.GithubOnboardingImportEntity(self, entopts);
    }
    // Entity access: `client.GithubOnboardingImportBatch().list()` / `client.GithubOnboardingImportBatch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubOnboardingImportBatch(entopts) {
        const self = this;
        return new GithubOnboardingImportBatchEntity_1.GithubOnboardingImportBatchEntity(self, entopts);
    }
    // Entity access: `client.GithubOnboardingImportItem().list()` / `client.GithubOnboardingImportItem().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubOnboardingImportItem(entopts) {
        const self = this;
        return new GithubOnboardingImportItemEntity_1.GithubOnboardingImportItemEntity(self, entopts);
    }
    // Entity access: `client.GithubPullRequest().list()` / `client.GithubPullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubPullRequest(entopts) {
        const self = this;
        return new GithubPullRequestEntity_1.GithubPullRequestEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerAdmission().list()` / `client.GithubRunnerAdmission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerAdmission(entopts) {
        const self = this;
        return new GithubRunnerAdmissionEntity_1.GithubRunnerAdmissionEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerCache().list()` / `client.GithubRunnerCache().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerCache(entopts) {
        const self = this;
        return new GithubRunnerCacheEntity_1.GithubRunnerCacheEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerEgress().list()` / `client.GithubRunnerEgress().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerEgress(entopts) {
        const self = this;
        return new GithubRunnerEgressEntity_1.GithubRunnerEgressEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerHistory().list()` / `client.GithubRunnerHistory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerHistory(entopts) {
        const self = this;
        return new GithubRunnerHistoryEntity_1.GithubRunnerHistoryEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerImage().list()` / `client.GithubRunnerImage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerImage(entopts) {
        const self = this;
        return new GithubRunnerImageEntity_1.GithubRunnerImageEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerPool().list()` / `client.GithubRunnerPool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerPool(entopts) {
        const self = this;
        return new GithubRunnerPoolEntity_1.GithubRunnerPoolEntity(self, entopts);
    }
    // Entity access: `client.GithubRunnerSetup().list()` / `client.GithubRunnerSetup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubRunnerSetup(entopts) {
        const self = this;
        return new GithubRunnerSetupEntity_1.GithubRunnerSetupEntity(self, entopts);
    }
    // Entity access: `client.Gitlab().list()` / `client.Gitlab().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Gitlab(entopts) {
        const self = this;
        return new GitlabEntity_1.GitlabEntity(self, entopts);
    }
    // Entity access: `client.GitlabConnection().list()` / `client.GitlabConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitlabConnection(entopts) {
        const self = this;
        return new GitlabConnectionEntity_1.GitlabConnectionEntity(self, entopts);
    }
    // Entity access: `client.GitlabImport().list()` / `client.GitlabImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitlabImport(entopts) {
        const self = this;
        return new GitlabImportEntity_1.GitlabImportEntity(self, entopts);
    }
    // Entity access: `client.GitlabOauth().list()` / `client.GitlabOauth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitlabOauth(entopts) {
        const self = this;
        return new GitlabOauthEntity_1.GitlabOauthEntity(self, entopts);
    }
    // Entity access: `client.GrantAllAgent().list()` / `client.GrantAllAgent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GrantAllAgent(entopts) {
        const self = this;
        return new GrantAllAgentEntity_1.GrantAllAgentEntity(self, entopts);
    }
    // Entity access: `client.HostingAppDomain().list()` / `client.HostingAppDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HostingAppDomain(entopts) {
        const self = this;
        return new HostingAppDomainEntity_1.HostingAppDomainEntity(self, entopts);
    }
    // Entity access: `client.IdentityOrganization().list()` / `client.IdentityOrganization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IdentityOrganization(entopts) {
        const self = this;
        return new IdentityOrganizationEntity_1.IdentityOrganizationEntity(self, entopts);
    }
    // Entity access: `client.ImageRepository().list()` / `client.ImageRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImageRepository(entopts) {
        const self = this;
        return new ImageRepositoryEntity_1.ImageRepositoryEntity(self, entopts);
    }
    // Entity access: `client.ImageRepositoryTag().list()` / `client.ImageRepositoryTag().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImageRepositoryTag(entopts) {
        const self = this;
        return new ImageRepositoryTagEntity_1.ImageRepositoryTagEntity(self, entopts);
    }
    // Entity access: `client.ImportBranchPolicy().list()` / `client.ImportBranchPolicy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImportBranchPolicy(entopts) {
        const self = this;
        return new ImportBranchPolicyEntity_1.ImportBranchPolicyEntity(self, entopts);
    }
    // Entity access: `client.Integration().list()` / `client.Integration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Integration(entopts) {
        const self = this;
        return new IntegrationEntity_1.IntegrationEntity(self, entopts);
    }
    // Entity access: `client.InteractionResponse().list()` / `client.InteractionResponse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InteractionResponse(entopts) {
        const self = this;
        return new InteractionResponseEntity_1.InteractionResponseEntity(self, entopts);
    }
    // Entity access: `client.Invitation().list()` / `client.Invitation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Invitation(entopts) {
        const self = this;
        return new InvitationEntity_1.InvitationEntity(self, entopts);
    }
    // Entity access: `client.InvocationControl().list()` / `client.InvocationControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InvocationControl(entopts) {
        const self = this;
        return new InvocationControlEntity_1.InvocationControlEntity(self, entopts);
    }
    // Entity access: `client.JobLogChunk().list()` / `client.JobLogChunk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JobLogChunk(entopts) {
        const self = this;
        return new JobLogChunkEntity_1.JobLogChunkEntity(self, entopts);
    }
    // Entity access: `client.JobStep().list()` / `client.JobStep().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JobStep(entopts) {
        const self = this;
        return new JobStepEntity_1.JobStepEntity(self, entopts);
    }
    // Entity access: `client.JobWorkspace().list()` / `client.JobWorkspace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JobWorkspace(entopts) {
        const self = this;
        return new JobWorkspaceEntity_1.JobWorkspaceEntity(self, entopts);
    }
    // Entity access: `client.JourneyVariantReplay().list()` / `client.JourneyVariantReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JourneyVariantReplay(entopts) {
        const self = this;
        return new JourneyVariantReplayEntity_1.JourneyVariantReplayEntity(self, entopts);
    }
    // Entity access: `client.Knowledge().list()` / `client.Knowledge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Knowledge(entopts) {
        const self = this;
        return new KnowledgeEntity_1.KnowledgeEntity(self, entopts);
    }
    // Entity access: `client.Known().list()` / `client.Known().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Known(entopts) {
        const self = this;
        return new KnownEntity_1.KnownEntity(self, entopts);
    }
    // Entity access: `client.Label().list()` / `client.Label().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Label(entopts) {
        const self = this;
        return new LabelEntity_1.LabelEntity(self, entopts);
    }
    // Entity access: `client.LeaseArtifact().list()` / `client.LeaseArtifact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseArtifact(entopts) {
        const self = this;
        return new LeaseArtifactEntity_1.LeaseArtifactEntity(self, entopts);
    }
    // Entity access: `client.LeaseCache().list()` / `client.LeaseCache().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseCache(entopts) {
        const self = this;
        return new LeaseCacheEntity_1.LeaseCacheEntity(self, entopts);
    }
    // Entity access: `client.LeaseLogChunk().list()` / `client.LeaseLogChunk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseLogChunk(entopts) {
        const self = this;
        return new LeaseLogChunkEntity_1.LeaseLogChunkEntity(self, entopts);
    }
    // Entity access: `client.LeaseReconciliation().list()` / `client.LeaseReconciliation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseReconciliation(entopts) {
        const self = this;
        return new LeaseReconciliationEntity_1.LeaseReconciliationEntity(self, entopts);
    }
    // Entity access: `client.LeaseStep().list()` / `client.LeaseStep().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseStep(entopts) {
        const self = this;
        return new LeaseStepEntity_1.LeaseStepEntity(self, entopts);
    }
    // Entity access: `client.LeaseVerifyDiagnostic().list()` / `client.LeaseVerifyDiagnostic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseVerifyDiagnostic(entopts) {
        const self = this;
        return new LeaseVerifyDiagnosticEntity_1.LeaseVerifyDiagnosticEntity(self, entopts);
    }
    // Entity access: `client.LeaseVerifySecret().list()` / `client.LeaseVerifySecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseVerifySecret(entopts) {
        const self = this;
        return new LeaseVerifySecretEntity_1.LeaseVerifySecretEntity(self, entopts);
    }
    // Entity access: `client.LeaseWorkspace().list()` / `client.LeaseWorkspace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LeaseWorkspace(entopts) {
        const self = this;
        return new LeaseWorkspaceEntity_1.LeaseWorkspaceEntity(self, entopts);
    }
    // Entity access: `client.LocalAgentDecision().list()` / `client.LocalAgentDecision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalAgentDecision(entopts) {
        const self = this;
        return new LocalAgentDecisionEntity_1.LocalAgentDecisionEntity(self, entopts);
    }
    // Entity access: `client.LocalAgentResponse().list()` / `client.LocalAgentResponse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalAgentResponse(entopts) {
        const self = this;
        return new LocalAgentResponseEntity_1.LocalAgentResponseEntity(self, entopts);
    }
    // Entity access: `client.LocalThreadDelivery().list()` / `client.LocalThreadDelivery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalThreadDelivery(entopts) {
        const self = this;
        return new LocalThreadDeliveryEntity_1.LocalThreadDeliveryEntity(self, entopts);
    }
    // Entity access: `client.LocalThreadOperation().list()` / `client.LocalThreadOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalThreadOperation(entopts) {
        const self = this;
        return new LocalThreadOperationEntity_1.LocalThreadOperationEntity(self, entopts);
    }
    // Entity access: `client.Location().list()` / `client.Location().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Location(entopts) {
        const self = this;
        return new LocationEntity_1.LocationEntity(self, entopts);
    }
    // Entity access: `client.LogStreamChunk().list()` / `client.LogStreamChunk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LogStreamChunk(entopts) {
        const self = this;
        return new LogStreamChunkEntity_1.LogStreamChunkEntity(self, entopts);
    }
    // Entity access: `client.LogoImage().list()` / `client.LogoImage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LogoImage(entopts) {
        const self = this;
        return new LogoImageEntity_1.LogoImageEntity(self, entopts);
    }
    // Entity access: `client.MarketingSetting().list()` / `client.MarketingSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MarketingSetting(entopts) {
        const self = this;
        return new MarketingSettingEntity_1.MarketingSettingEntity(self, entopts);
    }
    // Entity access: `client.McpOauth().list()` / `client.McpOauth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    McpOauth(entopts) {
        const self = this;
        return new McpOauthEntity_1.McpOauthEntity(self, entopts);
    }
    // Entity access: `client.Me().list()` / `client.Me().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Me(entopts) {
        const self = this;
        return new MeEntity_1.MeEntity(self, entopts);
    }
    // Entity access: `client.MeEmail().list()` / `client.MeEmail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeEmail(entopts) {
        const self = this;
        return new MeEmailEntity_1.MeEmailEntity(self, entopts);
    }
    // Entity access: `client.MeOnboarding().list()` / `client.MeOnboarding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeOnboarding(entopts) {
        const self = this;
        return new MeOnboardingEntity_1.MeOnboardingEntity(self, entopts);
    }
    // Entity access: `client.MediaFile().list()` / `client.MediaFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MediaFile(entopts) {
        const self = this;
        return new MediaFileEntity_1.MediaFileEntity(self, entopts);
    }
    // Entity access: `client.Member().list()` / `client.Member().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Member(entopts) {
        const self = this;
        return new MemberEntity_1.MemberEntity(self, entopts);
    }
    // Entity access: `client.Memory().list()` / `client.Memory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Memory(entopts) {
        const self = this;
        return new MemoryEntity_1.MemoryEntity(self, entopts);
    }
    // Entity access: `client.MergeQueueEntry().list()` / `client.MergeQueueEntry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MergeQueueEntry(entopts) {
        const self = this;
        return new MergeQueueEntryEntity_1.MergeQueueEntryEntity(self, entopts);
    }
    // Entity access: `client.MergeRequest().list()` / `client.MergeRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MergeRequest(entopts) {
        const self = this;
        return new MergeRequestEntity_1.MergeRequestEntity(self, entopts);
    }
    // Entity access: `client.MergeResolution().list()` / `client.MergeResolution().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MergeResolution(entopts) {
        const self = this;
        return new MergeResolutionEntity_1.MergeResolutionEntity(self, entopts);
    }
    // Entity access: `client.MessagingConversationMessage().list()` / `client.MessagingConversationMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MessagingConversationMessage(entopts) {
        const self = this;
        return new MessagingConversationMessageEntity_1.MessagingConversationMessageEntity(self, entopts);
    }
    // Entity access: `client.MessagingConversationUpload().list()` / `client.MessagingConversationUpload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MessagingConversationUpload(entopts) {
        const self = this;
        return new MessagingConversationUploadEntity_1.MessagingConversationUploadEntity(self, entopts);
    }
    // Entity access: `client.MetricQuery().list()` / `client.MetricQuery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MetricQuery(entopts) {
        const self = this;
        return new MetricQueryEntity_1.MetricQueryEntity(self, entopts);
    }
    // Entity access: `client.MetronomeWebhook().list()` / `client.MetronomeWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MetronomeWebhook(entopts) {
        const self = this;
        return new MetronomeWebhookEntity_1.MetronomeWebhookEntity(self, entopts);
    }
    // Entity access: `client.ModelSubscriptionAccount().list()` / `client.ModelSubscriptionAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ModelSubscriptionAccount(entopts) {
        const self = this;
        return new ModelSubscriptionAccountEntity_1.ModelSubscriptionAccountEntity(self, entopts);
    }
    // Entity access: `client.ModelSubscriptionAccountConnection().list()` / `client.ModelSubscriptionAccountConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ModelSubscriptionAccountConnection(entopts) {
        const self = this;
        return new ModelSubscriptionAccountConnectionEntity_1.ModelSubscriptionAccountConnectionEntity(self, entopts);
    }
    // Entity access: `client.NetworkConnection().list()` / `client.NetworkConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NetworkConnection(entopts) {
        const self = this;
        return new NetworkConnectionEntity_1.NetworkConnectionEntity(self, entopts);
    }
    // Entity access: `client.NetworkingSpace().list()` / `client.NetworkingSpace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NetworkingSpace(entopts) {
        const self = this;
        return new NetworkingSpaceEntity_1.NetworkingSpaceEntity(self, entopts);
    }
    // Entity access: `client.Node().list()` / `client.Node().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Node(entopts) {
        const self = this;
        return new NodeEntity_1.NodeEntity(self, entopts);
    }
    // Entity access: `client.NodeCertificate().list()` / `client.NodeCertificate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NodeCertificate(entopts) {
        const self = this;
        return new NodeCertificateEntity_1.NodeCertificateEntity(self, entopts);
    }
    // Entity access: `client.NodeLease().list()` / `client.NodeLease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NodeLease(entopts) {
        const self = this;
        return new NodeLeaseEntity_1.NodeLeaseEntity(self, entopts);
    }
    // Entity access: `client.NomadAllocation().list()` / `client.NomadAllocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NomadAllocation(entopts) {
        const self = this;
        return new NomadAllocationEntity_1.NomadAllocationEntity(self, entopts);
    }
    // Entity access: `client.NomadLog().list()` / `client.NomadLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NomadLog(entopts) {
        const self = this;
        return new NomadLogEntity_1.NomadLogEntity(self, entopts);
    }
    // Entity access: `client.Now().list()` / `client.Now().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Now(entopts) {
        const self = this;
        return new NowEntity_1.NowEntity(self, entopts);
    }
    // Entity access: `client.ObservabilityClickhouseCluster().list()` / `client.ObservabilityClickhouseCluster().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ObservabilityClickhouseCluster(entopts) {
        const self = this;
        return new ObservabilityClickhouseClusterEntity_1.ObservabilityClickhouseClusterEntity(self, entopts);
    }
    // Entity access: `client.ObservabilityQuickwitCluster().list()` / `client.ObservabilityQuickwitCluster().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ObservabilityQuickwitCluster(entopts) {
        const self = this;
        return new ObservabilityQuickwitClusterEntity_1.ObservabilityQuickwitClusterEntity(self, entopts);
    }
    // Entity access: `client.ObservabilitySpace().list()` / `client.ObservabilitySpace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ObservabilitySpace(entopts) {
        const self = this;
        return new ObservabilitySpaceEntity_1.ObservabilitySpaceEntity(self, entopts);
    }
    // Entity access: `client.Openapi().list()` / `client.Openapi().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Openapi(entopts) {
        const self = this;
        return new OpenapiEntity_1.OpenapiEntity(self, entopts);
    }
    // Entity access: `client.OrgInvitation().list()` / `client.OrgInvitation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrgInvitation(entopts) {
        const self = this;
        return new OrgInvitationEntity_1.OrgInvitationEntity(self, entopts);
    }
    // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Organization(entopts) {
        const self = this;
        return new OrganizationEntity_1.OrganizationEntity(self, entopts);
    }
    // Entity access: `client.OrganizationApp().list()` / `client.OrganizationApp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationApp(entopts) {
        const self = this;
        return new OrganizationAppEntity_1.OrganizationAppEntity(self, entopts);
    }
    // Entity access: `client.OrganizationControl().list()` / `client.OrganizationControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationControl(entopts) {
        const self = this;
        return new OrganizationControlEntity_1.OrganizationControlEntity(self, entopts);
    }
    // Entity access: `client.OrganizationDevice().list()` / `client.OrganizationDevice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationDevice(entopts) {
        const self = this;
        return new OrganizationDeviceEntity_1.OrganizationDeviceEntity(self, entopts);
    }
    // Entity access: `client.OrganizationIdentityCertificate().list()` / `client.OrganizationIdentityCertificate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationIdentityCertificate(entopts) {
        const self = this;
        return new OrganizationIdentityCertificateEntity_1.OrganizationIdentityCertificateEntity(self, entopts);
    }
    // Entity access: `client.OrganizationInteraction().list()` / `client.OrganizationInteraction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationInteraction(entopts) {
        const self = this;
        return new OrganizationInteractionEntity_1.OrganizationInteractionEntity(self, entopts);
    }
    // Entity access: `client.OrganizationInvitation().list()` / `client.OrganizationInvitation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationInvitation(entopts) {
        const self = this;
        return new OrganizationInvitationEntity_1.OrganizationInvitationEntity(self, entopts);
    }
    // Entity access: `client.OrganizationMessageFile().list()` / `client.OrganizationMessageFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationMessageFile(entopts) {
        const self = this;
        return new OrganizationMessageFileEntity_1.OrganizationMessageFileEntity(self, entopts);
    }
    // Entity access: `client.OrganizationOidcTrust().list()` / `client.OrganizationOidcTrust().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationOidcTrust(entopts) {
        const self = this;
        return new OrganizationOidcTrustEntity_1.OrganizationOidcTrustEntity(self, entopts);
    }
    // Entity access: `client.OrganizationRunEvent().list()` / `client.OrganizationRunEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationRunEvent(entopts) {
        const self = this;
        return new OrganizationRunEventEntity_1.OrganizationRunEventEntity(self, entopts);
    }
    // Entity access: `client.OrganizationRunOutcome().list()` / `client.OrganizationRunOutcome().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationRunOutcome(entopts) {
        const self = this;
        return new OrganizationRunOutcomeEntity_1.OrganizationRunOutcomeEntity(self, entopts);
    }
    // Entity access: `client.OrganizationRunUsage().list()` / `client.OrganizationRunUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationRunUsage(entopts) {
        const self = this;
        return new OrganizationRunUsageEntity_1.OrganizationRunUsageEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSandbox().list()` / `client.OrganizationSandbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSandbox(entopts) {
        const self = this;
        return new OrganizationSandboxEntity_1.OrganizationSandboxEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSecret().list()` / `client.OrganizationSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSecret(entopts) {
        const self = this;
        return new OrganizationSecretEntity_1.OrganizationSecretEntity(self, entopts);
    }
    // Entity access: `client.OrganizationServiceAccount().list()` / `client.OrganizationServiceAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationServiceAccount(entopts) {
        const self = this;
        return new OrganizationServiceAccountEntity_1.OrganizationServiceAccountEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSetting().list()` / `client.OrganizationSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSetting(entopts) {
        const self = this;
        return new OrganizationSettingEntity_1.OrganizationSettingEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSite().list()` / `client.OrganizationSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSite(entopts) {
        const self = this;
        return new OrganizationSiteEntity_1.OrganizationSiteEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSubscription().list()` / `client.OrganizationSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSubscription(entopts) {
        const self = this;
        return new OrganizationSubscriptionEntity_1.OrganizationSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.OrganizationTool().list()` / `client.OrganizationTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationTool(entopts) {
        const self = this;
        return new OrganizationToolEntity_1.OrganizationToolEntity(self, entopts);
    }
    // Entity access: `client.OrganizationWorkloadIdentity().list()` / `client.OrganizationWorkloadIdentity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationWorkloadIdentity(entopts) {
        const self = this;
        return new OrganizationWorkloadIdentityEntity_1.OrganizationWorkloadIdentityEntity(self, entopts);
    }
    // Entity access: `client.OtelIngest().list()` / `client.OtelIngest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OtelIngest(entopts) {
        const self = this;
        return new OtelIngestEntity_1.OtelIngestEntity(self, entopts);
    }
    // Entity access: `client.Page().list()` / `client.Page().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Page(entopts) {
        const self = this;
        return new PageEntity_1.PageEntity(self, entopts);
    }
    // Entity access: `client.PageAgent().list()` / `client.PageAgent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageAgent(entopts) {
        const self = this;
        return new PageAgentEntity_1.PageAgentEntity(self, entopts);
    }
    // Entity access: `client.PageArtefact().list()` / `client.PageArtefact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageArtefact(entopts) {
        const self = this;
        return new PageArtefactEntity_1.PageArtefactEntity(self, entopts);
    }
    // Entity access: `client.PageCiPipelineRun().list()` / `client.PageCiPipelineRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageCiPipelineRun(entopts) {
        const self = this;
        return new PageCiPipelineRunEntity_1.PageCiPipelineRunEntity(self, entopts);
    }
    // Entity access: `client.PageProjectRun().list()` / `client.PageProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageProjectRun(entopts) {
        const self = this;
        return new PageProjectRunEntity_1.PageProjectRunEntity(self, entopts);
    }
    // Entity access: `client.PageRepoVcCommit().list()` / `client.PageRepoVcCommit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageRepoVcCommit(entopts) {
        const self = this;
        return new PageRepoVcCommitEntity_1.PageRepoVcCommitEntity(self, entopts);
    }
    // Entity access: `client.PagesBilling().list()` / `client.PagesBilling().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesBilling(entopts) {
        const self = this;
        return new PagesBillingEntity_1.PagesBillingEntity(self, entopts);
    }
    // Entity access: `client.PagesGithubOnboarding().list()` / `client.PagesGithubOnboarding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesGithubOnboarding(entopts) {
        const self = this;
        return new PagesGithubOnboardingEntity_1.PagesGithubOnboardingEntity(self, entopts);
    }
    // Entity access: `client.PagesMember().list()` / `client.PagesMember().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesMember(entopts) {
        const self = this;
        return new PagesMemberEntity_1.PagesMemberEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectCredential().list()` / `client.PagesProjectCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectCredential(entopts) {
        const self = this;
        return new PagesProjectCredentialEntity_1.PagesProjectCredentialEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectPersona().list()` / `client.PagesProjectPersona().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectPersona(entopts) {
        const self = this;
        return new PagesProjectPersonaEntity_1.PagesProjectPersonaEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectRun().list()` / `client.PagesProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectRun(entopts) {
        const self = this;
        return new PagesProjectRunEntity_1.PagesProjectRunEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectScenario().list()` / `client.PagesProjectScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectScenario(entopts) {
        const self = this;
        return new PagesProjectScenarioEntity_1.PagesProjectScenarioEntity(self, entopts);
    }
    // Entity access: `client.PagesRegistry().list()` / `client.PagesRegistry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesRegistry(entopts) {
        const self = this;
        return new PagesRegistryEntity_1.PagesRegistryEntity(self, entopts);
    }
    // Entity access: `client.PagesSession().list()` / `client.PagesSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesSession(entopts) {
        const self = this;
        return new PagesSessionEntity_1.PagesSessionEntity(self, entopts);
    }
    // Entity access: `client.Pairing().list()` / `client.Pairing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Pairing(entopts) {
        const self = this;
        return new PairingEntity_1.PairingEntity(self, entopts);
    }
    // Entity access: `client.PairingEvent().list()` / `client.PairingEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PairingEvent(entopts) {
        const self = this;
        return new PairingEventEntity_1.PairingEventEntity(self, entopts);
    }
    // Entity access: `client.ParallelV1().list()` / `client.ParallelV1().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ParallelV1(entopts) {
        const self = this;
        return new ParallelV1Entity_1.ParallelV1Entity(self, entopts);
    }
    // Entity access: `client.PatchsetDiff().list()` / `client.PatchsetDiff().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PatchsetDiff(entopts) {
        const self = this;
        return new PatchsetDiffEntity_1.PatchsetDiffEntity(self, entopts);
    }
    // Entity access: `client.PersonalAccessToken().list()` / `client.PersonalAccessToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PersonalAccessToken(entopts) {
        const self = this;
        return new PersonalAccessTokenEntity_1.PersonalAccessTokenEntity(self, entopts);
    }
    // Entity access: `client.PreviewOperation().list()` / `client.PreviewOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewOperation(entopts) {
        const self = this;
        return new PreviewOperationEntity_1.PreviewOperationEntity(self, entopts);
    }
    // Entity access: `client.PreviewProfileSecretBinding().list()` / `client.PreviewProfileSecretBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewProfileSecretBinding(entopts) {
        const self = this;
        return new PreviewProfileSecretBindingEntity_1.PreviewProfileSecretBindingEntity(self, entopts);
    }
    // Entity access: `client.PreviewSecret().list()` / `client.PreviewSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewSecret(entopts) {
        const self = this;
        return new PreviewSecretEntity_1.PreviewSecretEntity(self, entopts);
    }
    // Entity access: `client.PreviewSharingApproval().list()` / `client.PreviewSharingApproval().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewSharingApproval(entopts) {
        const self = this;
        return new PreviewSharingApprovalEntity_1.PreviewSharingApprovalEntity(self, entopts);
    }
    // Entity access: `client.ProactiveAgentWaitlistEntry().list()` / `client.ProactiveAgentWaitlistEntry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProactiveAgentWaitlistEntry(entopts) {
        const self = this;
        return new ProactiveAgentWaitlistEntryEntity_1.ProactiveAgentWaitlistEntryEntity(self, entopts);
    }
    // Entity access: `client.Product().list()` / `client.Product().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Product(entopts) {
        const self = this;
        return new ProductEntity_1.ProductEntity(self, entopts);
    }
    // Entity access: `client.ProductMapIdentityDecision().list()` / `client.ProductMapIdentityDecision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapIdentityDecision(entopts) {
        const self = this;
        return new ProductMapIdentityDecisionEntity_1.ProductMapIdentityDecisionEntity(self, entopts);
    }
    // Entity access: `client.ProductMapJourney().list()` / `client.ProductMapJourney().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapJourney(entopts) {
        const self = this;
        return new ProductMapJourneyEntity_1.ProductMapJourneyEntity(self, entopts);
    }
    // Entity access: `client.ProductMapJourneyReplay().list()` / `client.ProductMapJourneyReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapJourneyReplay(entopts) {
        const self = this;
        return new ProductMapJourneyReplayEntity_1.ProductMapJourneyReplayEntity(self, entopts);
    }
    // Entity access: `client.ProductMapObservation().list()` / `client.ProductMapObservation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapObservation(entopts) {
        const self = this;
        return new ProductMapObservationEntity_1.ProductMapObservationEntity(self, entopts);
    }
    // Entity access: `client.ProductMapQuestion().list()` / `client.ProductMapQuestion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapQuestion(entopts) {
        const self = this;
        return new ProductMapQuestionEntity_1.ProductMapQuestionEntity(self, entopts);
    }
    // Entity access: `client.ProductMapState().list()` / `client.ProductMapState().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapState(entopts) {
        const self = this;
        return new ProductMapStateEntity_1.ProductMapStateEntity(self, entopts);
    }
    // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Project(entopts) {
        const self = this;
        return new ProjectEntity_1.ProjectEntity(self, entopts);
    }
    // Entity access: `client.ProjectAndroidApk().list()` / `client.ProjectAndroidApk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectAndroidApk(entopts) {
        const self = this;
        return new ProjectAndroidApkEntity_1.ProjectAndroidApkEntity(self, entopts);
    }
    // Entity access: `client.ProjectCodeMap().list()` / `client.ProjectCodeMap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectCodeMap(entopts) {
        const self = this;
        return new ProjectCodeMapEntity_1.ProjectCodeMapEntity(self, entopts);
    }
    // Entity access: `client.ProjectEnvironment().list()` / `client.ProjectEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectEnvironment(entopts) {
        const self = this;
        return new ProjectEnvironmentEntity_1.ProjectEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.ProjectFinding().list()` / `client.ProjectFinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectFinding(entopts) {
        const self = this;
        return new ProjectFindingEntity_1.ProjectFindingEntity(self, entopts);
    }
    // Entity access: `client.ProjectFixture().list()` / `client.ProjectFixture().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectFixture(entopts) {
        const self = this;
        return new ProjectFixtureEntity_1.ProjectFixtureEntity(self, entopts);
    }
    // Entity access: `client.ProjectIosApp().list()` / `client.ProjectIosApp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectIosApp(entopts) {
        const self = this;
        return new ProjectIosAppEntity_1.ProjectIosAppEntity(self, entopts);
    }
    // Entity access: `client.ProjectMessagingConversation().list()` / `client.ProjectMessagingConversation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectMessagingConversation(entopts) {
        const self = this;
        return new ProjectMessagingConversationEntity_1.ProjectMessagingConversationEntity(self, entopts);
    }
    // Entity access: `client.ProjectOverviewMetric().list()` / `client.ProjectOverviewMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectOverviewMetric(entopts) {
        const self = this;
        return new ProjectOverviewMetricEntity_1.ProjectOverviewMetricEntity(self, entopts);
    }
    // Entity access: `client.ProjectOverviewPullRequest().list()` / `client.ProjectOverviewPullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectOverviewPullRequest(entopts) {
        const self = this;
        return new ProjectOverviewPullRequestEntity_1.ProjectOverviewPullRequestEntity(self, entopts);
    }
    // Entity access: `client.ProjectProductMap().list()` / `client.ProjectProductMap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectProductMap(entopts) {
        const self = this;
        return new ProjectProductMapEntity_1.ProjectProductMapEntity(self, entopts);
    }
    // Entity access: `client.ProjectRecording().list()` / `client.ProjectRecording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRecording(entopts) {
        const self = this;
        return new ProjectRecordingEntity_1.ProjectRecordingEntity(self, entopts);
    }
    // Entity access: `client.ProjectRunPlan().list()` / `client.ProjectRunPlan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRunPlan(entopts) {
        const self = this;
        return new ProjectRunPlanEntity_1.ProjectRunPlanEntity(self, entopts);
    }
    // Entity access: `client.ProjectRunSchedule().list()` / `client.ProjectRunSchedule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRunSchedule(entopts) {
        const self = this;
        return new ProjectRunScheduleEntity_1.ProjectRunScheduleEntity(self, entopts);
    }
    // Entity access: `client.ProjectScenarioOption().list()` / `client.ProjectScenarioOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectScenarioOption(entopts) {
        const self = this;
        return new ProjectScenarioOptionEntity_1.ProjectScenarioOptionEntity(self, entopts);
    }
    // Entity access: `client.ProjectScenarioRow().list()` / `client.ProjectScenarioRow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectScenarioRow(entopts) {
        const self = this;
        return new ProjectScenarioRowEntity_1.ProjectScenarioRowEntity(self, entopts);
    }
    // Entity access: `client.ProjectSetting().list()` / `client.ProjectSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectSetting(entopts) {
        const self = this;
        return new ProjectSettingEntity_1.ProjectSettingEntity(self, entopts);
    }
    // Entity access: `client.PullRequest().list()` / `client.PullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequest(entopts) {
        const self = this;
        return new PullRequestEntity_1.PullRequestEntity(self, entopts);
    }
    // Entity access: `client.PullRequestAction().list()` / `client.PullRequestAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestAction(entopts) {
        const self = this;
        return new PullRequestActionEntity_1.PullRequestActionEntity(self, entopts);
    }
    // Entity access: `client.PullRequestMagicMerge().list()` / `client.PullRequestMagicMerge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestMagicMerge(entopts) {
        const self = this;
        return new PullRequestMagicMergeEntity_1.PullRequestMagicMergeEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSetting().list()` / `client.PullRequestSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSetting(entopts) {
        const self = this;
        return new PullRequestSettingEntity_1.PullRequestSettingEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSettingAddRepository().list()` / `client.PullRequestSettingAddRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSettingAddRepository(entopts) {
        const self = this;
        return new PullRequestSettingAddRepositoryEntity_1.PullRequestSettingAddRepositoryEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSettingDetectComment().list()` / `client.PullRequestSettingDetectComment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSettingDetectComment(entopts) {
        const self = this;
        return new PullRequestSettingDetectCommentEntity_1.PullRequestSettingDetectCommentEntity(self, entopts);
    }
    // Entity access: `client.PullRequestTranscript().list()` / `client.PullRequestTranscript().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestTranscript(entopts) {
        const self = this;
        return new PullRequestTranscriptEntity_1.PullRequestTranscriptEntity(self, entopts);
    }
    // Entity access: `client.PullZone().list()` / `client.PullZone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullZone(entopts) {
        const self = this;
        return new PullZoneEntity_1.PullZoneEntity(self, entopts);
    }
    // Entity access: `client.Recorder().list()` / `client.Recorder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recorder(entopts) {
        const self = this;
        return new RecorderEntity_1.RecorderEntity(self, entopts);
    }
    // Entity access: `client.Registry().list()` / `client.Registry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Registry(entopts) {
        const self = this;
        return new RegistryEntity_1.RegistryEntity(self, entopts);
    }
    // Entity access: `client.RegistryV2().list()` / `client.RegistryV2().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RegistryV2(entopts) {
        const self = this;
        return new RegistryV2Entity_1.RegistryV2Entity(self, entopts);
    }
    // Entity access: `client.RelayAgentConnection().list()` / `client.RelayAgentConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RelayAgentConnection(entopts) {
        const self = this;
        return new RelayAgentConnectionEntity_1.RelayAgentConnectionEntity(self, entopts);
    }
    // Entity access: `client.RelayAgentLocalThread().list()` / `client.RelayAgentLocalThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RelayAgentLocalThread(entopts) {
        const self = this;
        return new RelayAgentLocalThreadEntity_1.RelayAgentLocalThreadEntity(self, entopts);
    }
    // Entity access: `client.RelaySignal().list()` / `client.RelaySignal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RelaySignal(entopts) {
        const self = this;
        return new RelaySignalEntity_1.RelaySignalEntity(self, entopts);
    }
    // Entity access: `client.ReleaseRollout().list()` / `client.ReleaseRollout().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReleaseRollout(entopts) {
        const self = this;
        return new ReleaseRolloutEntity_1.ReleaseRolloutEntity(self, entopts);
    }
    // Entity access: `client.Repo().list()` / `client.Repo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Repo(entopts) {
        const self = this;
        return new RepoEntity_1.RepoEntity(self, entopts);
    }
    // Entity access: `client.RepoAccessToken().list()` / `client.RepoAccessToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoAccessToken(entopts) {
        const self = this;
        return new RepoAccessTokenEntity_1.RepoAccessTokenEntity(self, entopts);
    }
    // Entity access: `client.RepoAction().list()` / `client.RepoAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoAction(entopts) {
        const self = this;
        return new RepoActionEntity_1.RepoActionEntity(self, entopts);
    }
    // Entity access: `client.RepoAgentCheckpoint().list()` / `client.RepoAgentCheckpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoAgentCheckpoint(entopts) {
        const self = this;
        return new RepoAgentCheckpointEntity_1.RepoAgentCheckpointEntity(self, entopts);
    }
    // Entity access: `client.RepoAgentSession().list()` / `client.RepoAgentSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoAgentSession(entopts) {
        const self = this;
        return new RepoAgentSessionEntity_1.RepoAgentSessionEntity(self, entopts);
    }
    // Entity access: `client.RepoBookmarkProtection().list()` / `client.RepoBookmarkProtection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoBookmarkProtection(entopts) {
        const self = this;
        return new RepoBookmarkProtectionEntity_1.RepoBookmarkProtectionEntity(self, entopts);
    }
    // Entity access: `client.RepoBookmarkProtectionEvent().list()` / `client.RepoBookmarkProtectionEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoBookmarkProtectionEvent(entopts) {
        const self = this;
        return new RepoBookmarkProtectionEventEntity_1.RepoBookmarkProtectionEventEntity(self, entopts);
    }
    // Entity access: `client.RepoCloudWorkspaceBackup().list()` / `client.RepoCloudWorkspaceBackup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoCloudWorkspaceBackup(entopts) {
        const self = this;
        return new RepoCloudWorkspaceBackupEntity_1.RepoCloudWorkspaceBackupEntity(self, entopts);
    }
    // Entity access: `client.RepoCodeRule().list()` / `client.RepoCodeRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoCodeRule(entopts) {
        const self = this;
        return new RepoCodeRuleEntity_1.RepoCodeRuleEntity(self, entopts);
    }
    // Entity access: `client.RepoSetting().list()` / `client.RepoSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoSetting(entopts) {
        const self = this;
        return new RepoSettingEntity_1.RepoSettingEntity(self, entopts);
    }
    // Entity access: `client.RepoStat().list()` / `client.RepoStat().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoStat(entopts) {
        const self = this;
        return new RepoStatEntity_1.RepoStatEntity(self, entopts);
    }
    // Entity access: `client.RepoVc().list()` / `client.RepoVc().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoVc(entopts) {
        const self = this;
        return new RepoVcEntity_1.RepoVcEntity(self, entopts);
    }
    // Entity access: `client.RepoVcCommit().list()` / `client.RepoVcCommit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepoVcCommit(entopts) {
        const self = this;
        return new RepoVcCommitEntity_1.RepoVcCommitEntity(self, entopts);
    }
    // Entity access: `client.ReportReplay().list()` / `client.ReportReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportReplay(entopts) {
        const self = this;
        return new ReportReplayEntity_1.ReportReplayEntity(self, entopts);
    }
    // Entity access: `client.ReportScenario().list()` / `client.ReportScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportScenario(entopts) {
        const self = this;
        return new ReportScenarioEntity_1.ReportScenarioEntity(self, entopts);
    }
    // Entity access: `client.RepositoryAccess().list()` / `client.RepositoryAccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryAccess(entopts) {
        const self = this;
        return new RepositoryAccessEntity_1.RepositoryAccessEntity(self, entopts);
    }
    // Entity access: `client.RepositoryAccessResolve().list()` / `client.RepositoryAccessResolve().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryAccessResolve(entopts) {
        const self = this;
        return new RepositoryAccessResolveEntity_1.RepositoryAccessResolveEntity(self, entopts);
    }
    // Entity access: `client.RepositoryEvent().list()` / `client.RepositoryEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryEvent(entopts) {
        const self = this;
        return new RepositoryEventEntity_1.RepositoryEventEntity(self, entopts);
    }
    // Entity access: `client.RepositoryImport().list()` / `client.RepositoryImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryImport(entopts) {
        const self = this;
        return new RepositoryImportEntity_1.RepositoryImportEntity(self, entopts);
    }
    // Entity access: `client.RepositoryImportSession().list()` / `client.RepositoryImportSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryImportSession(entopts) {
        const self = this;
        return new RepositoryImportSessionEntity_1.RepositoryImportSessionEntity(self, entopts);
    }
    // Entity access: `client.RepositoryImportSessionRepository().list()` / `client.RepositoryImportSessionRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryImportSessionRepository(entopts) {
        const self = this;
        return new RepositoryImportSessionRepositoryEntity_1.RepositoryImportSessionRepositoryEntity(self, entopts);
    }
    // Entity access: `client.RepositoryImportSessionSelection().list()` / `client.RepositoryImportSessionSelection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositoryImportSessionSelection(entopts) {
        const self = this;
        return new RepositoryImportSessionSelectionEntity_1.RepositoryImportSessionSelectionEntity(self, entopts);
    }
    // Entity access: `client.RepositorySandboxEnvironment().list()` / `client.RepositorySandboxEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RepositorySandboxEnvironment(entopts) {
        const self = this;
        return new RepositorySandboxEnvironmentEntity_1.RepositorySandboxEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.RoderCodeRepair().list()` / `client.RoderCodeRepair().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoderCodeRepair(entopts) {
        const self = this;
        return new RoderCodeRepairEntity_1.RoderCodeRepairEntity(self, entopts);
    }
    // Entity access: `client.RoderCodeRepairSetting().list()` / `client.RoderCodeRepairSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoderCodeRepairSetting(entopts) {
        const self = this;
        return new RoderCodeRepairSettingEntity_1.RoderCodeRepairSettingEntity(self, entopts);
    }
    // Entity access: `client.RoderMachine().list()` / `client.RoderMachine().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoderMachine(entopts) {
        const self = this;
        return new RoderMachineEntity_1.RoderMachineEntity(self, entopts);
    }
    // Entity access: `client.RoderRun().list()` / `client.RoderRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoderRun(entopts) {
        const self = this;
        return new RoderRunEntity_1.RoderRunEntity(self, entopts);
    }
    // Entity access: `client.RoderWorkspaceCredential().list()` / `client.RoderWorkspaceCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoderWorkspaceCredential(entopts) {
        const self = this;
        return new RoderWorkspaceCredentialEntity_1.RoderWorkspaceCredentialEntity(self, entopts);
    }
    // Entity access: `client.RunArtifact().list()` / `client.RunArtifact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunArtifact(entopts) {
        const self = this;
        return new RunArtifactEntity_1.RunArtifactEntity(self, entopts);
    }
    // Entity access: `client.RunJob().list()` / `client.RunJob().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunJob(entopts) {
        const self = this;
        return new RunJobEntity_1.RunJobEntity(self, entopts);
    }
    // Entity access: `client.RunScenarioRun().list()` / `client.RunScenarioRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunScenarioRun(entopts) {
        const self = this;
        return new RunScenarioRunEntity_1.RunScenarioRunEntity(self, entopts);
    }
    // Entity access: `client.RunScheduleOption().list()` / `client.RunScheduleOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunScheduleOption(entopts) {
        const self = this;
        return new RunScheduleOptionEntity_1.RunScheduleOptionEntity(self, entopts);
    }
    // Entity access: `client.RunSearch().list()` / `client.RunSearch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunSearch(entopts) {
        const self = this;
        return new RunSearchEntity_1.RunSearchEntity(self, entopts);
    }
    // Entity access: `client.RunUpdate().list()` / `client.RunUpdate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunUpdate(entopts) {
        const self = this;
        return new RunUpdateEntity_1.RunUpdateEntity(self, entopts);
    }
    // Entity access: `client.RunWorkspaceCredential().list()` / `client.RunWorkspaceCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunWorkspaceCredential(entopts) {
        const self = this;
        return new RunWorkspaceCredentialEntity_1.RunWorkspaceCredentialEntity(self, entopts);
    }
    // Entity access: `client.RunnerLease().list()` / `client.RunnerLease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunnerLease(entopts) {
        const self = this;
        return new RunnerLeaseEntity_1.RunnerLeaseEntity(self, entopts);
    }
    // Entity access: `client.RunnerPoolNodeEnrollmentToken().list()` / `client.RunnerPoolNodeEnrollmentToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunnerPoolNodeEnrollmentToken(entopts) {
        const self = this;
        return new RunnerPoolNodeEnrollmentTokenEntity_1.RunnerPoolNodeEnrollmentTokenEntity(self, entopts);
    }
    // Entity access: `client.RunnerPoolRunner().list()` / `client.RunnerPoolRunner().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunnerPoolRunner(entopts) {
        const self = this;
        return new RunnerPoolRunnerEntity_1.RunnerPoolRunnerEntity(self, entopts);
    }
    // Entity access: `client.RuntimeInstanceHealthSnapshot().list()` / `client.RuntimeInstanceHealthSnapshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RuntimeInstanceHealthSnapshot(entopts) {
        const self = this;
        return new RuntimeInstanceHealthSnapshotEntity_1.RuntimeInstanceHealthSnapshotEntity(self, entopts);
    }
    // Entity access: `client.SandboxIntegration().list()` / `client.SandboxIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SandboxIntegration(entopts) {
        const self = this;
        return new SandboxIntegrationEntity_1.SandboxIntegrationEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRevision().list()` / `client.ScenarioRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRevision(entopts) {
        const self = this;
        return new ScenarioRevisionEntity_1.ScenarioRevisionEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRunLesson().list()` / `client.ScenarioRunLesson().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRunLesson(entopts) {
        const self = this;
        return new ScenarioRunLessonEntity_1.ScenarioRunLessonEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRunScenarioEdit().list()` / `client.ScenarioRunScenarioEdit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRunScenarioEdit(entopts) {
        const self = this;
        return new ScenarioRunScenarioEditEntity_1.ScenarioRunScenarioEditEntity(self, entopts);
    }
    // Entity access: `client.SecretGrant().list()` / `client.SecretGrant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SecretGrant(entopts) {
        const self = this;
        return new SecretGrantEntity_1.SecretGrantEntity(self, entopts);
    }
    // Entity access: `client.SecretVersion().list()` / `client.SecretVersion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SecretVersion(entopts) {
        const self = this;
        return new SecretVersionEntity_1.SecretVersionEntity(self, entopts);
    }
    // Entity access: `client.ServiceEndpoint().list()` / `client.ServiceEndpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ServiceEndpoint(entopts) {
        const self = this;
        return new ServiceEndpointEntity_1.ServiceEndpointEntity(self, entopts);
    }
    // Entity access: `client.Setting().list()` / `client.Setting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Setting(entopts) {
        const self = this;
        return new SettingEntity_1.SettingEntity(self, entopts);
    }
    // Entity access: `client.SettingMutationLease().list()` / `client.SettingMutationLease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SettingMutationLease(entopts) {
        const self = this;
        return new SettingMutationLeaseEntity_1.SettingMutationLeaseEntity(self, entopts);
    }
    // Entity access: `client.Signal().list()` / `client.Signal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Signal(entopts) {
        const self = this;
        return new SignalEntity_1.SignalEntity(self, entopts);
    }
    // Entity access: `client.SignalInbound().list()` / `client.SignalInbound().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SignalInbound(entopts) {
        const self = this;
        return new SignalInboundEntity_1.SignalInboundEntity(self, entopts);
    }
    // Entity access: `client.SignalIntegration().list()` / `client.SignalIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SignalIntegration(entopts) {
        const self = this;
        return new SignalIntegrationEntity_1.SignalIntegrationEntity(self, entopts);
    }
    // Entity access: `client.SignalIntegrationDelivery().list()` / `client.SignalIntegrationDelivery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SignalIntegrationDelivery(entopts) {
        const self = this;
        return new SignalIntegrationDeliveryEntity_1.SignalIntegrationDeliveryEntity(self, entopts);
    }
    // Entity access: `client.SignalIntegrationTarget().list()` / `client.SignalIntegrationTarget().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SignalIntegrationTarget(entopts) {
        const self = this;
        return new SignalIntegrationTargetEntity_1.SignalIntegrationTargetEntity(self, entopts);
    }
    // Entity access: `client.SignalSubscription().list()` / `client.SignalSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SignalSubscription(entopts) {
        const self = this;
        return new SignalSubscriptionEntity_1.SignalSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.Site().list()` / `client.Site().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Site(entopts) {
        const self = this;
        return new SiteEntity_1.SiteEntity(self, entopts);
    }
    // Entity access: `client.SiteAccessKey().list()` / `client.SiteAccessKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SiteAccessKey(entopts) {
        const self = this;
        return new SiteAccessKeyEntity_1.SiteAccessKeyEntity(self, entopts);
    }
    // Entity access: `client.SitePreview().list()` / `client.SitePreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SitePreview(entopts) {
        const self = this;
        return new SitePreviewEntity_1.SitePreviewEntity(self, entopts);
    }
    // Entity access: `client.SiteSecret().list()` / `client.SiteSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SiteSecret(entopts) {
        const self = this;
        return new SiteSecretEntity_1.SiteSecretEntity(self, entopts);
    }
    // Entity access: `client.SlackChannel().list()` / `client.SlackChannel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SlackChannel(entopts) {
        const self = this;
        return new SlackChannelEntity_1.SlackChannelEntity(self, entopts);
    }
    // Entity access: `client.SourceConnection().list()` / `client.SourceConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SourceConnection(entopts) {
        const self = this;
        return new SourceConnectionEntity_1.SourceConnectionEntity(self, entopts);
    }
    // Entity access: `client.SpaceAlertRule().list()` / `client.SpaceAlertRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceAlertRule(entopts) {
        const self = this;
        return new SpaceAlertRuleEntity_1.SpaceAlertRuleEntity(self, entopts);
    }
    // Entity access: `client.SpaceAuditEvent().list()` / `client.SpaceAuditEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceAuditEvent(entopts) {
        const self = this;
        return new SpaceAuditEventEntity_1.SpaceAuditEventEntity(self, entopts);
    }
    // Entity access: `client.SpaceDnsRecord().list()` / `client.SpaceDnsRecord().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceDnsRecord(entopts) {
        const self = this;
        return new SpaceDnsRecordEntity_1.SpaceDnsRecordEntity(self, entopts);
    }
    // Entity access: `client.SpaceEnrollmentToken().list()` / `client.SpaceEnrollmentToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceEnrollmentToken(entopts) {
        const self = this;
        return new SpaceEnrollmentTokenEntity_1.SpaceEnrollmentTokenEntity(self, entopts);
    }
    // Entity access: `client.SpaceGateway().list()` / `client.SpaceGateway().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceGateway(entopts) {
        const self = this;
        return new SpaceGatewayEntity_1.SpaceGatewayEntity(self, entopts);
    }
    // Entity access: `client.SpaceGroup().list()` / `client.SpaceGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceGroup(entopts) {
        const self = this;
        return new SpaceGroupEntity_1.SpaceGroupEntity(self, entopts);
    }
    // Entity access: `client.SpaceGroupMembership().list()` / `client.SpaceGroupMembership().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceGroupMembership(entopts) {
        const self = this;
        return new SpaceGroupMembershipEntity_1.SpaceGroupMembershipEntity(self, entopts);
    }
    // Entity access: `client.SpaceLogStream().list()` / `client.SpaceLogStream().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceLogStream(entopts) {
        const self = this;
        return new SpaceLogStreamEntity_1.SpaceLogStreamEntity(self, entopts);
    }
    // Entity access: `client.SpaceMetricSery().list()` / `client.SpaceMetricSery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceMetricSery(entopts) {
        const self = this;
        return new SpaceMetricSeryEntity_1.SpaceMetricSeryEntity(self, entopts);
    }
    // Entity access: `client.SpaceOtelCollector().list()` / `client.SpaceOtelCollector().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceOtelCollector(entopts) {
        const self = this;
        return new SpaceOtelCollectorEntity_1.SpaceOtelCollectorEntity(self, entopts);
    }
    // Entity access: `client.SpacePeer().list()` / `client.SpacePeer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpacePeer(entopts) {
        const self = this;
        return new SpacePeerEntity_1.SpacePeerEntity(self, entopts);
    }
    // Entity access: `client.SpacePeerAttachment().list()` / `client.SpacePeerAttachment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpacePeerAttachment(entopts) {
        const self = this;
        return new SpacePeerAttachmentEntity_1.SpacePeerAttachmentEntity(self, entopts);
    }
    // Entity access: `client.SpacePolicy().list()` / `client.SpacePolicy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpacePolicy(entopts) {
        const self = this;
        return new SpacePolicyEntity_1.SpacePolicyEntity(self, entopts);
    }
    // Entity access: `client.SpaceSegment().list()` / `client.SpaceSegment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceSegment(entopts) {
        const self = this;
        return new SpaceSegmentEntity_1.SpaceSegmentEntity(self, entopts);
    }
    // Entity access: `client.SpaceTraceSpan().list()` / `client.SpaceTraceSpan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpaceTraceSpan(entopts) {
        const self = this;
        return new SpaceTraceSpanEntity_1.SpaceTraceSpanEntity(self, entopts);
    }
    // Entity access: `client.Spark().list()` / `client.Spark().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Spark(entopts) {
        const self = this;
        return new SparkEntity_1.SparkEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentIntegration().list()` / `client.SparkAgentIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentIntegration(entopts) {
        const self = this;
        return new SparkAgentIntegrationEntity_1.SparkAgentIntegrationEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentLocalThread().list()` / `client.SparkAgentLocalThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentLocalThread(entopts) {
        const self = this;
        return new SparkAgentLocalThreadEntity_1.SparkAgentLocalThreadEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentSite().list()` / `client.SparkAgentSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentSite(entopts) {
        const self = this;
        return new SparkAgentSiteEntity_1.SparkAgentSiteEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentSkill().list()` / `client.SparkAgentSkill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentSkill(entopts) {
        const self = this;
        return new SparkAgentSkillEntity_1.SparkAgentSkillEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentThread().list()` / `client.SparkAgentThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentThread(entopts) {
        const self = this;
        return new SparkAgentThreadEntity_1.SparkAgentThreadEntity(self, entopts);
    }
    // Entity access: `client.SparkCredit().list()` / `client.SparkCredit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkCredit(entopts) {
        const self = this;
        return new SparkCreditEntity_1.SparkCreditEntity(self, entopts);
    }
    // Entity access: `client.SparkCreditAgentUsage().list()` / `client.SparkCreditAgentUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkCreditAgentUsage(entopts) {
        const self = this;
        return new SparkCreditAgentUsageEntity_1.SparkCreditAgentUsageEntity(self, entopts);
    }
    // Entity access: `client.SparkCreditUsageTotal().list()` / `client.SparkCreditUsageTotal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkCreditUsageTotal(entopts) {
        const self = this;
        return new SparkCreditUsageTotalEntity_1.SparkCreditUsageTotalEntity(self, entopts);
    }
    // Entity access: `client.StaticSite().list()` / `client.StaticSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSite(entopts) {
        const self = this;
        return new StaticSiteEntity_1.StaticSiteEntity(self, entopts);
    }
    // Entity access: `client.StaticSiteDeployment().list()` / `client.StaticSiteDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSiteDeployment(entopts) {
        const self = this;
        return new StaticSiteDeploymentEntity_1.StaticSiteDeploymentEntity(self, entopts);
    }
    // Entity access: `client.StaticSiteDomain().list()` / `client.StaticSiteDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSiteDomain(entopts) {
        const self = this;
        return new StaticSiteDomainEntity_1.StaticSiteDomainEntity(self, entopts);
    }
    // Entity access: `client.StatusChange().list()` / `client.StatusChange().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StatusChange(entopts) {
        const self = this;
        return new StatusChangeEntity_1.StatusChangeEntity(self, entopts);
    }
    // Entity access: `client.StatusCommit().list()` / `client.StatusCommit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StatusCommit(entopts) {
        const self = this;
        return new StatusCommitEntity_1.StatusCommitEntity(self, entopts);
    }
    // Entity access: `client.StatusPatchset().list()` / `client.StatusPatchset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StatusPatchset(entopts) {
        const self = this;
        return new StatusPatchsetEntity_1.StatusPatchsetEntity(self, entopts);
    }
    // Entity access: `client.StripeWebhook().list()` / `client.StripeWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StripeWebhook(entopts) {
        const self = this;
        return new StripeWebhookEntity_1.StripeWebhookEntity(self, entopts);
    }
    // Entity access: `client.SubmitTelemetry().list()` / `client.SubmitTelemetry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SubmitTelemetry(entopts) {
        const self = this;
        return new SubmitTelemetryEntity_1.SubmitTelemetryEntity(self, entopts);
    }
    // Entity access: `client.SubscriptionModel().list()` / `client.SubscriptionModel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SubscriptionModel(entopts) {
        const self = this;
        return new SubscriptionModelEntity_1.SubscriptionModelEntity(self, entopts);
    }
    // Entity access: `client.SwarmEvent().list()` / `client.SwarmEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SwarmEvent(entopts) {
        const self = this;
        return new SwarmEventEntity_1.SwarmEventEntity(self, entopts);
    }
    // Entity access: `client.SwarmLive().list()` / `client.SwarmLive().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SwarmLive(entopts) {
        const self = this;
        return new SwarmLiveEntity_1.SwarmLiveEntity(self, entopts);
    }
    // Entity access: `client.SwarmNote().list()` / `client.SwarmNote().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SwarmNote(entopts) {
        const self = this;
        return new SwarmNoteEntity_1.SwarmNoteEntity(self, entopts);
    }
    // Entity access: `client.SwarmTask().list()` / `client.SwarmTask().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SwarmTask(entopts) {
        const self = this;
        return new SwarmTaskEntity_1.SwarmTaskEntity(self, entopts);
    }
    // Entity access: `client.TaskLease().list()` / `client.TaskLease().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TaskLease(entopts) {
        const self = this;
        return new TaskLeaseEntity_1.TaskLeaseEntity(self, entopts);
    }
    // Entity access: `client.ThreadPreview().list()` / `client.ThreadPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ThreadPreview(entopts) {
        const self = this;
        return new ThreadPreviewEntity_1.ThreadPreviewEntity(self, entopts);
    }
    // Entity access: `client.ThreadPreviewAccess().list()` / `client.ThreadPreviewAccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ThreadPreviewAccess(entopts) {
        const self = this;
        return new ThreadPreviewAccessEntity_1.ThreadPreviewAccessEntity(self, entopts);
    }
    // Entity access: `client.ToolFeedback().list()` / `client.ToolFeedback().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ToolFeedback(entopts) {
        const self = this;
        return new ToolFeedbackEntity_1.ToolFeedbackEntity(self, entopts);
    }
    // Entity access: `client.Transcript().list()` / `client.Transcript().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Transcript(entopts) {
        const self = this;
        return new TranscriptEntity_1.TranscriptEntity(self, entopts);
    }
    // Entity access: `client.V1Message().list()` / `client.V1Message().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    V1Message(entopts) {
        const self = this;
        return new V1MessageEntity_1.V1MessageEntity(self, entopts);
    }
    // Entity access: `client.VcBranch().list()` / `client.VcBranch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcBranch(entopts) {
        const self = this;
        return new VcBranchEntity_1.VcBranchEntity(self, entopts);
    }
    // Entity access: `client.VcBrowser().list()` / `client.VcBrowser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcBrowser(entopts) {
        const self = this;
        return new VcBrowserEntity_1.VcBrowserEntity(self, entopts);
    }
    // Entity access: `client.VcChange().list()` / `client.VcChange().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcChange(entopts) {
        const self = this;
        return new VcChangeEntity_1.VcChangeEntity(self, entopts);
    }
    // Entity access: `client.VcChangeGroup().list()` / `client.VcChangeGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcChangeGroup(entopts) {
        const self = this;
        return new VcChangeGroupEntity_1.VcChangeGroupEntity(self, entopts);
    }
    // Entity access: `client.VcFile().list()` / `client.VcFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcFile(entopts) {
        const self = this;
        return new VcFileEntity_1.VcFileEntity(self, entopts);
    }
    // Entity access: `client.VcMergeQueue().list()` / `client.VcMergeQueue().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcMergeQueue(entopts) {
        const self = this;
        return new VcMergeQueueEntity_1.VcMergeQueueEntity(self, entopts);
    }
    // Entity access: `client.VcStack().list()` / `client.VcStack().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcStack(entopts) {
        const self = this;
        return new VcStackEntity_1.VcStackEntity(self, entopts);
    }
    // Entity access: `client.VcsNode().list()` / `client.VcsNode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcsNode(entopts) {
        const self = this;
        return new VcsNodeEntity_1.VcsNodeEntity(self, entopts);
    }
    // Entity access: `client.VcsSetting().list()` / `client.VcsSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VcsSetting(entopts) {
        const self = this;
        return new VcsSettingEntity_1.VcsSettingEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectCredential().list()` / `client.VerificationProjectCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectCredential(entopts) {
        const self = this;
        return new VerificationProjectCredentialEntity_1.VerificationProjectCredentialEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectPersona().list()` / `client.VerificationProjectPersona().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectPersona(entopts) {
        const self = this;
        return new VerificationProjectPersonaEntity_1.VerificationProjectPersonaEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectRun().list()` / `client.VerificationProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectRun(entopts) {
        const self = this;
        return new VerificationProjectRunEntity_1.VerificationProjectRunEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectScenario().list()` / `client.VerificationProjectScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectScenario(entopts) {
        const self = this;
        return new VerificationProjectScenarioEntity_1.VerificationProjectScenarioEntity(self, entopts);
    }
    // Entity access: `client.VerifyAppDomain().list()` / `client.VerifyAppDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyAppDomain(entopts) {
        const self = this;
        return new VerifyAppDomainEntity_1.VerifyAppDomainEntity(self, entopts);
    }
    // Entity access: `client.VerifyBrowserSession().list()` / `client.VerifyBrowserSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyBrowserSession(entopts) {
        const self = this;
        return new VerifyBrowserSessionEntity_1.VerifyBrowserSessionEntity(self, entopts);
    }
    // Entity access: `client.VerifyEmailVerification().list()` / `client.VerifyEmailVerification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyEmailVerification(entopts) {
        const self = this;
        return new VerifyEmailVerificationEntity_1.VerifyEmailVerificationEntity(self, entopts);
    }
    // Entity access: `client.VerifySignalIntegration().list()` / `client.VerifySignalIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifySignalIntegration(entopts) {
        const self = this;
        return new VerifySignalIntegrationEntity_1.VerifySignalIntegrationEntity(self, entopts);
    }
    // Entity access: `client.VerifyStaticSiteDomain().list()` / `client.VerifyStaticSiteDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyStaticSiteDomain(entopts) {
        const self = this;
        return new VerifyStaticSiteDomainEntity_1.VerifyStaticSiteDomainEntity(self, entopts);
    }
    // Entity access: `client.VersionLog().list()` / `client.VersionLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VersionLog(entopts) {
        const self = this;
        return new VersionLogEntity_1.VersionLogEntity(self, entopts);
    }
    // Entity access: `client.WaitlistApplication().list()` / `client.WaitlistApplication().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WaitlistApplication(entopts) {
        const self = this;
        return new WaitlistApplicationEntity_1.WaitlistApplicationEntity(self, entopts);
    }
    // Entity access: `client.WebBotAuth().list()` / `client.WebBotAuth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebBotAuth(entopts) {
        const self = this;
        return new WebBotAuthEntity_1.WebBotAuthEntity(self, entopts);
    }
    // Entity access: `client.WebhookGitlab().list()` / `client.WebhookGitlab().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebhookGitlab(entopts) {
        const self = this;
        return new WebhookGitlabEntity_1.WebhookGitlabEntity(self, entopts);
    }
    // Entity access: `client.WorkflowRunStep().list()` / `client.WorkflowRunStep().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowRunStep(entopts) {
        const self = this;
        return new WorkflowRunStepEntity_1.WorkflowRunStepEntity(self, entopts);
    }
    // Entity access: `client.WorkflowRunStopNotice().list()` / `client.WorkflowRunStopNotice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowRunStopNotice(entopts) {
        const self = this;
        return new WorkflowRunStopNoticeEntity_1.WorkflowRunStopNoticeEntity(self, entopts);
    }
    // Entity access: `client.WorkflowTriggerSkipped().list()` / `client.WorkflowTriggerSkipped().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowTriggerSkipped(entopts) {
        const self = this;
        return new WorkflowTriggerSkippedEntity_1.WorkflowTriggerSkippedEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceActivity().list()` / `client.WorkspaceActivity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceActivity(entopts) {
        const self = this;
        return new WorkspaceActivityEntity_1.WorkspaceActivityEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceActivityNotification().list()` / `client.WorkspaceActivityNotification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceActivityNotification(entopts) {
        const self = this;
        return new WorkspaceActivityNotificationEntity_1.WorkspaceActivityNotificationEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceSpace().list()` / `client.WorkspaceSpace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceSpace(entopts) {
        const self = this;
        return new WorkspaceSpaceEntity_1.WorkspaceSpaceEntity(self, entopts);
    }
    // Entity access: `client.WorkspaceSpacePreference().list()` / `client.WorkspaceSpacePreference().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkspaceSpacePreference(entopts) {
        const self = this;
        return new WorkspaceSpacePreferenceEntity_1.WorkspaceSpacePreferenceEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new ComposalSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return ComposalSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Composal' };
    }
    toString() {
        return 'Composal ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.ComposalSDK = ComposalSDK;
const SDK = ComposalSDK;
exports.SDK = SDK;
//# sourceMappingURL=ComposalSDK.js.map