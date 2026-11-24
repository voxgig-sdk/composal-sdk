package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewA2aWellKnownEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAdminOrgEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAppInstallEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAttachmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAutomationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAvatarEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentCommandEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentComputerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionDelegationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionGrantEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionResourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionSafetyControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionTriggerSubscriptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentContextCheckpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentControlFlowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentCoordinationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentEmailEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentInputEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentIntegrationAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentIntegrationCallbackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentInteractionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentLibraryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentManagerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentManagerChoiceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentMarketplaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentMarketplaceSharedEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentMissionControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentProvisioningEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentPullRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentQuestionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRelayFileGrantEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRelayFileGrantAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentResourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRoderEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRoutineEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRuntimeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSessionCheckpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSessionRoderHandoffEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSharingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSkillEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSlackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSubagentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSubscriptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSwarmEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentTeammateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentTerminalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentToolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentUsageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentVerifyProjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWaitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWebPreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWebhookEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowProposalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowTriggerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkspaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWritePermissionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgreementEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgreementAccessRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAlertRuleEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAllocationLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppAccessEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppAccessJwkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppCdnEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppConfigVariableEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppDataResourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppDeployEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppDeploymentOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppDeploymentRollbackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppEnvironmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppLocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppMetricEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppPreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppPreviewProfileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppSecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppServiceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppServiceBindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppServicePlacementEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppStorageResourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtefactEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtefactCommentThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtefactRevisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtefactViewTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtifactEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtifactCacheNamespaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtifactImageRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtifactPackageMirrorEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewArtifactRetentionPolicyEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAttachmentPartEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuditEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthCliEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthGithubEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthGoogleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthOpenaiEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthPasswordResetEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAuthRegistrationOptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAutomationEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAutomationRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBackendRunnerPoolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelActionResultEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelBackendEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelBlobEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelExecutionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBazelFindMissingBlobEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingAddonEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingCheckoutSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingInvoiceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingPackageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingPortalSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingPrepaidPeriodEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingPrepaidPurchaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingTokenTopUpEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBillingUsageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBinaryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBinaryVersionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBookmarkProtectionRefreshGithubRequiredCheckEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserEgressCandidateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionMediaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionRecordingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionScreenshotEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionTaskEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCacheNamespaceEntryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCatalogSelectorEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnHostnameEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnSpaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnSpaceObjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeAssetEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeCommentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeFileReviewCheckpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeGitBranchSubmissionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeGitCommitIdentityEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeGitPublicationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeGroupMemberEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeLabelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeLandingHoldEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeLandingRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeRequestChangeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeReviewerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeTranscriptEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewChangeTranscriptSummaryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCheckpointPrepareChunkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCiNodeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCiPipelineEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCiPipelineRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCiRunnerPoolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCiStatusEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCliEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCliReleaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCloudWorkspaceBackupObjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCodeRuleEvaluationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewComSiteAccessEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewComSiteAccessSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCommentThreadCommentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCommitDiffEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewConnectionRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewConnectionSourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewContactSubmissionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewControlComputerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewControlComputerControlOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCoordinationWaitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCredentialSignInCheckEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDataResourceRotateCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeepScanEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeepScanFindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeepScanFlowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeepScanMappedFlowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeepScanOptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDemoShareEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDemoShareSegmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentDashboardNomadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentDetailEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentMetricEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentPreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDesktopLocalAgentModelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDesktopLocalAgentResponseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceBrowserOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceControlMessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceControlOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceEnterpriseRelayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceFolderListingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceGrantEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceInvocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceLocalEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDevicePairingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceProjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeviceScheduledCheckInEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDockerBuilderEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDockerBuilderSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDockerBuilderSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDomainDnsIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDomainPathRuleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDreamEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEdgeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEmailVerificationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentDiscoveryRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentExplorationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentFirstRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentRevisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentSecretBindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentTestAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEvidenceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExecutionDesiredStateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExecutionReconcilerTickEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExecutionReleaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExecutionRuntimeInstanceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationMessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationReportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewFindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGhEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGitImportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubAppImportableRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubAppInstallationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubAppInstallationAuthorizationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubAppUserAuthorizationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubCiRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubCiRepositoryCompatibilityReportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubOnboardingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubOnboardingBranchEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubOnboardingImportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubOnboardingImportBatchEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubOnboardingImportItemEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubPullRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerAdmissionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerCacheEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerEgressEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerHistoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerImageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerPoolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubRunnerSetupEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGitlabEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGitlabConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGitlabImportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGitlabOauthEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGrantAllAgentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewHostingAppDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewIdentityOrganizationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewImageRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewImageRepositoryTagEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewImportBranchPolicyEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewInteractionResponseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewInvitationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewInvocationControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewJobLogChunkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewJobStepEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewJobWorkspaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewJourneyVariantReplayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewKnowledgeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewKnownEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLabelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseArtifactEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseCacheEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseLogChunkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseReconciliationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseStepEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseVerifyDiagnosticEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseVerifySecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLeaseWorkspaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalAgentDecisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalAgentResponseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalThreadDeliveryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalThreadOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLogStreamChunkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLogoImageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMarketingSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMcpOauthEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeEmailEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeOnboardingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMediaFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMemberEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMemoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMergeQueueEntryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMergeRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMergeResolutionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMessagingConversationMessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMessagingConversationUploadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMetricQueryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMetronomeWebhookEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewModelSubscriptionAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewModelSubscriptionAccountConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNetworkConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNetworkingSpaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNodeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNodeCertificateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNodeLeaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNomadAllocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNomadLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewObservabilityClickhouseClusterEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewObservabilityQuickwitClusterEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewObservabilitySpaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOpenapiEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrgInvitationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationDeviceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationIdentityCertificateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationInteractionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationInvitationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationMessageFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationOidcTrustEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationRunEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationRunOutcomeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationRunUsageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationSandboxEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationSecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationServiceAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationSubscriptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationToolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationWorkloadIdentityEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOtelIngestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageAgentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageArtefactEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageCiPipelineRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageRepoVcCommitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesBillingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesGithubOnboardingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesMemberEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectPersonaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesRegistryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPairingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPairingEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewParallelV1EntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPatchsetDiffEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPersonalAccessTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewProfileSecretBindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewSecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewSharingApprovalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProactiveAgentWaitlistEntryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapIdentityDecisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapJourneyEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapJourneyReplayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapObservationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapQuestionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProductMapStateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectAndroidApkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectCodeMapEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectEnvironmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectFindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectFixtureEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectIosAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectMessagingConversationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectOverviewMetricEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectOverviewPullRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectProductMapEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectRecordingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectRunPlanEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectRunScheduleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectScenarioOptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectScenarioRowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewProjectSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestActionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestMagicMergeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestSettingAddRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestSettingDetectCommentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestTranscriptEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullZoneEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRecorderEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRegistryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRegistryV2EntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRelayAgentConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRelayAgentLocalThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRelaySignalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewReleaseRolloutEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoAccessTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoActionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoAgentCheckpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoAgentSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoBookmarkProtectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoBookmarkProtectionEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoCloudWorkspaceBackupEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoCodeRuleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoStatEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoVcEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepoVcCommitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewReportReplayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewReportScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryAccessEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryAccessResolveEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryImportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryImportSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryImportSessionRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositoryImportSessionSelectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRepositorySandboxEnvironmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRoderCodeRepairEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRoderCodeRepairSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRoderMachineEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRoderRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRoderWorkspaceCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunArtifactEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunJobEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunScenarioRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunScheduleOptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunSearchEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunUpdateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunWorkspaceCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunnerLeaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunnerPoolNodeEnrollmentTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunnerPoolRunnerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRuntimeInstanceHealthSnapshotEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSandboxIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRevisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRunLessonEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRunScenarioEditEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSecretGrantEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSecretVersionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewServiceEndpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSettingMutationLeaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalInboundEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalIntegrationDeliveryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalIntegrationTargetEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSignalSubscriptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSiteAccessKeyEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSitePreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSiteSecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSlackChannelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSourceConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceAlertRuleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceAuditEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceDnsRecordEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceEnrollmentTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceGatewayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceGroupEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceGroupMembershipEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceLogStreamEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceMetricSeryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceOtelCollectorEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpacePeerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpacePeerAttachmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpacePolicyEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceSegmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSpaceTraceSpanEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentLocalThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentSkillEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkCreditEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkCreditAgentUsageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkCreditUsageTotalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStatusChangeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStatusCommitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStatusPatchsetEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStripeWebhookEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSubmitTelemetryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSubscriptionModelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSwarmEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSwarmLiveEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSwarmNoteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSwarmTaskEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewTaskLeaseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewThreadPreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewThreadPreviewAccessEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewToolFeedbackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewTranscriptEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewV1MessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcBranchEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcBrowserEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcChangeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcChangeGroupEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcMergeQueueEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcStackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcsNodeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVcsSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectPersonaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyAppDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyBrowserSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyEmailVerificationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifySignalIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyStaticSiteDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVersionLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWaitlistApplicationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWebBotAuthEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWebhookGitlabEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowRunStepEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowRunStopNoticeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowTriggerSkippedEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkspaceActivityEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkspaceActivityNotificationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkspaceSpaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkspaceSpacePreferenceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

