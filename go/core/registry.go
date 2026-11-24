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

var NewAgentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAttachmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAutomationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentAvatarEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentCommandEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentComputerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentControlFlowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentCoordinationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentEmailEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentInputEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

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

var NewAgentRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentResourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRoutineEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentRuntimeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSharingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSkillEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSlackEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSubagentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentSubscriptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentTeammateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentTerminalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentToolEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentVerifyProjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWaitEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWebhookEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowProposalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkflowTriggerEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWorkspaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAgentWritePermissionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAllocationLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAppEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

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

var NewAttachmentPartEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAutomationEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewAutomationRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBinaryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBinaryVersionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserEgressCandidateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionControlEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionEventEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionMediaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionRecordingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionScreenshotEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewBrowserSessionTaskEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCatalogSelectorEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnHostnameEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnSpaceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewCdnSpaceObjectEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewConnectionRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewConnectionSourceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

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

var NewDeploymentDashboardNomadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDeploymentFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDomainPathRuleEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewDreamEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentDiscoveryRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentExplorationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentFirstRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentRevisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentSecretBindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEnvironmentTestAccountEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewEvidenceEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationMessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationReportEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewExplorationScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewFindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewGithubConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewHostingAppDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewImageRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewIntegrationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewInteractionResponseEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewInvitationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewJourneyVariantReplayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewKnowledgeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalThreadDeliveryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocalThreadOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewLocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeEmailEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMeOnboardingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMediaFileEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMemberEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMemoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMergeRequestEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMessagingConversationMessageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMessagingConversationUploadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewMetricQueryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNetworkConnectionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNomadAllocationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewNomadLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewOrganizationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageAgentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPageProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectPersonaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPagesProjectScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPersonalAccessTokenEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewOperationEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewProfileSecretBindingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewSecretEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPreviewSharingApprovalEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

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

var NewPullRequestSettingEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestSettingAddRepositoryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewPullRequestSettingDetectCommentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRecorderEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRegistryEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRegistryV2EntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRelayAgentLocalThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewReportReplayEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewReportScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunScenarioRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunScheduleOptionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunSearchEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewRunUpdateEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRevisionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRunLessonEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewScenarioRunScenarioEditEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewServiceEndpointEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSitePreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSlackChannelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSparkAgentLocalThreadEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteDeploymentEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewStaticSiteDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewSubscriptionModelEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewThreadPreviewEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectCredentialEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectPersonaEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectRunEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerificationProjectScenarioEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyAppDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyBrowserSessionEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVerifyStaticSiteDomainEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewVersionLogEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWebBotAuthEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowRunStepEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowRunStopNoticeEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

var NewWorkflowTriggerSkippedEntityFunc func(client *ComposalSDK, entopts map[string]any) ComposalEntityBase

