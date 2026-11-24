# Composal Python SDK Reference

Complete API reference for the Composal Python SDK.


## ComposalSDK

### Constructor

```python
from composal_sdk import ComposalSDK

client = ComposalSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ComposalSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ComposalSDK.test()
```


### Instance Methods

#### `Agent(data=None)`

Create a new `AgentEntity` instance. Pass `None` for no initial data.

#### `AgentAttachment(data=None)`

Create a new `AgentAttachmentEntity` instance. Pass `None` for no initial data.

#### `AgentAutomation(data=None)`

Create a new `AgentAutomationEntity` instance. Pass `None` for no initial data.

#### `AgentAvatar(data=None)`

Create a new `AgentAvatarEntity` instance. Pass `None` for no initial data.

#### `AgentCommand(data=None)`

Create a new `AgentCommandEntity` instance. Pass `None` for no initial data.

#### `AgentComputer(data=None)`

Create a new `AgentComputerEntity` instance. Pass `None` for no initial data.

#### `AgentConnection(data=None)`

Create a new `AgentConnectionEntity` instance. Pass `None` for no initial data.

#### `AgentControlFlow(data=None)`

Create a new `AgentControlFlowEntity` instance. Pass `None` for no initial data.

#### `AgentCoordination(data=None)`

Create a new `AgentCoordinationEntity` instance. Pass `None` for no initial data.

#### `AgentEmail(data=None)`

Create a new `AgentEmailEntity` instance. Pass `None` for no initial data.

#### `AgentFile(data=None)`

Create a new `AgentFileEntity` instance. Pass `None` for no initial data.

#### `AgentInput(data=None)`

Create a new `AgentInputEntity` instance. Pass `None` for no initial data.

#### `AgentIntegration(data=None)`

Create a new `AgentIntegrationEntity` instance. Pass `None` for no initial data.

#### `AgentInteraction(data=None)`

Create a new `AgentInteractionEntity` instance. Pass `None` for no initial data.

#### `AgentLibrary(data=None)`

Create a new `AgentLibraryEntity` instance. Pass `None` for no initial data.

#### `AgentManager(data=None)`

Create a new `AgentManagerEntity` instance. Pass `None` for no initial data.

#### `AgentManagerChoice(data=None)`

Create a new `AgentManagerChoiceEntity` instance. Pass `None` for no initial data.

#### `AgentMarketplace(data=None)`

Create a new `AgentMarketplaceEntity` instance. Pass `None` for no initial data.

#### `AgentMarketplaceShared(data=None)`

Create a new `AgentMarketplaceSharedEntity` instance. Pass `None` for no initial data.

#### `AgentMissionControl(data=None)`

Create a new `AgentMissionControlEntity` instance. Pass `None` for no initial data.

#### `AgentOperation(data=None)`

Create a new `AgentOperationEntity` instance. Pass `None` for no initial data.

#### `AgentProvisioning(data=None)`

Create a new `AgentProvisioningEntity` instance. Pass `None` for no initial data.

#### `AgentPullRequest(data=None)`

Create a new `AgentPullRequestEntity` instance. Pass `None` for no initial data.

#### `AgentQuestion(data=None)`

Create a new `AgentQuestionEntity` instance. Pass `None` for no initial data.

#### `AgentRepository(data=None)`

Create a new `AgentRepositoryEntity` instance. Pass `None` for no initial data.

#### `AgentResource(data=None)`

Create a new `AgentResourceEntity` instance. Pass `None` for no initial data.

#### `AgentRoutine(data=None)`

Create a new `AgentRoutineEntity` instance. Pass `None` for no initial data.

#### `AgentRun(data=None)`

Create a new `AgentRunEntity` instance. Pass `None` for no initial data.

#### `AgentRuntime(data=None)`

Create a new `AgentRuntimeEntity` instance. Pass `None` for no initial data.

#### `AgentSetting(data=None)`

Create a new `AgentSettingEntity` instance. Pass `None` for no initial data.

#### `AgentSharing(data=None)`

Create a new `AgentSharingEntity` instance. Pass `None` for no initial data.

#### `AgentSite(data=None)`

Create a new `AgentSiteEntity` instance. Pass `None` for no initial data.

#### `AgentSkill(data=None)`

Create a new `AgentSkillEntity` instance. Pass `None` for no initial data.

#### `AgentSlack(data=None)`

Create a new `AgentSlackEntity` instance. Pass `None` for no initial data.

#### `AgentSubagent(data=None)`

Create a new `AgentSubagentEntity` instance. Pass `None` for no initial data.

#### `AgentSubscription(data=None)`

Create a new `AgentSubscriptionEntity` instance. Pass `None` for no initial data.

#### `AgentTeammate(data=None)`

Create a new `AgentTeammateEntity` instance. Pass `None` for no initial data.

#### `AgentTerminal(data=None)`

Create a new `AgentTerminalEntity` instance. Pass `None` for no initial data.

#### `AgentThread(data=None)`

Create a new `AgentThreadEntity` instance. Pass `None` for no initial data.

#### `AgentTool(data=None)`

Create a new `AgentToolEntity` instance. Pass `None` for no initial data.

#### `AgentVerifyProject(data=None)`

Create a new `AgentVerifyProjectEntity` instance. Pass `None` for no initial data.

#### `AgentWait(data=None)`

Create a new `AgentWaitEntity` instance. Pass `None` for no initial data.

#### `AgentWebhook(data=None)`

Create a new `AgentWebhookEntity` instance. Pass `None` for no initial data.

#### `AgentWork(data=None)`

Create a new `AgentWorkEntity` instance. Pass `None` for no initial data.

#### `AgentWorkflow(data=None)`

Create a new `AgentWorkflowEntity` instance. Pass `None` for no initial data.

#### `AgentWorkflowProposal(data=None)`

Create a new `AgentWorkflowProposalEntity` instance. Pass `None` for no initial data.

#### `AgentWorkflowRun(data=None)`

Create a new `AgentWorkflowRunEntity` instance. Pass `None` for no initial data.

#### `AgentWorkflowTrigger(data=None)`

Create a new `AgentWorkflowTriggerEntity` instance. Pass `None` for no initial data.

#### `AgentWorkspace(data=None)`

Create a new `AgentWorkspaceEntity` instance. Pass `None` for no initial data.

#### `AgentWritePermission(data=None)`

Create a new `AgentWritePermissionEntity` instance. Pass `None` for no initial data.

#### `AllocationLog(data=None)`

Create a new `AllocationLogEntity` instance. Pass `None` for no initial data.

#### `App(data=None)`

Create a new `AppEntity` instance. Pass `None` for no initial data.

#### `AppCdn(data=None)`

Create a new `AppCdnEntity` instance. Pass `None` for no initial data.

#### `AppConfigVariable(data=None)`

Create a new `AppConfigVariableEntity` instance. Pass `None` for no initial data.

#### `AppDataResource(data=None)`

Create a new `AppDataResourceEntity` instance. Pass `None` for no initial data.

#### `AppDeploy(data=None)`

Create a new `AppDeployEntity` instance. Pass `None` for no initial data.

#### `AppDeployment(data=None)`

Create a new `AppDeploymentEntity` instance. Pass `None` for no initial data.

#### `AppDeploymentOperation(data=None)`

Create a new `AppDeploymentOperationEntity` instance. Pass `None` for no initial data.

#### `AppDeploymentRollback(data=None)`

Create a new `AppDeploymentRollbackEntity` instance. Pass `None` for no initial data.

#### `AppEnvironment(data=None)`

Create a new `AppEnvironmentEntity` instance. Pass `None` for no initial data.

#### `AppLocation(data=None)`

Create a new `AppLocationEntity` instance. Pass `None` for no initial data.

#### `AppMetric(data=None)`

Create a new `AppMetricEntity` instance. Pass `None` for no initial data.

#### `AppPreview(data=None)`

Create a new `AppPreviewEntity` instance. Pass `None` for no initial data.

#### `AppPreviewProfile(data=None)`

Create a new `AppPreviewProfileEntity` instance. Pass `None` for no initial data.

#### `AppRun(data=None)`

Create a new `AppRunEntity` instance. Pass `None` for no initial data.

#### `AppSecret(data=None)`

Create a new `AppSecretEntity` instance. Pass `None` for no initial data.

#### `AppService(data=None)`

Create a new `AppServiceEntity` instance. Pass `None` for no initial data.

#### `AppServiceBinding(data=None)`

Create a new `AppServiceBindingEntity` instance. Pass `None` for no initial data.

#### `AppServicePlacement(data=None)`

Create a new `AppServicePlacementEntity` instance. Pass `None` for no initial data.

#### `AppStorageResource(data=None)`

Create a new `AppStorageResourceEntity` instance. Pass `None` for no initial data.

#### `AttachmentPart(data=None)`

Create a new `AttachmentPartEntity` instance. Pass `None` for no initial data.

#### `AutomationEvent(data=None)`

Create a new `AutomationEventEntity` instance. Pass `None` for no initial data.

#### `AutomationRun(data=None)`

Create a new `AutomationRunEntity` instance. Pass `None` for no initial data.

#### `Binary(data=None)`

Create a new `BinaryEntity` instance. Pass `None` for no initial data.

#### `BinaryVersion(data=None)`

Create a new `BinaryVersionEntity` instance. Pass `None` for no initial data.

#### `BrowserEgressCandidate(data=None)`

Create a new `BrowserEgressCandidateEntity` instance. Pass `None` for no initial data.

#### `BrowserSession(data=None)`

Create a new `BrowserSessionEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionConnection(data=None)`

Create a new `BrowserSessionConnectionEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionControl(data=None)`

Create a new `BrowserSessionControlEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionEvent(data=None)`

Create a new `BrowserSessionEventEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionMedia(data=None)`

Create a new `BrowserSessionMediaEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionRecording(data=None)`

Create a new `BrowserSessionRecordingEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionScreenshot(data=None)`

Create a new `BrowserSessionScreenshotEntity` instance. Pass `None` for no initial data.

#### `BrowserSessionTask(data=None)`

Create a new `BrowserSessionTaskEntity` instance. Pass `None` for no initial data.

#### `CatalogSelector(data=None)`

Create a new `CatalogSelectorEntity` instance. Pass `None` for no initial data.

#### `CdnDeployment(data=None)`

Create a new `CdnDeploymentEntity` instance. Pass `None` for no initial data.

#### `CdnHostname(data=None)`

Create a new `CdnHostnameEntity` instance. Pass `None` for no initial data.

#### `CdnSpace(data=None)`

Create a new `CdnSpaceEntity` instance. Pass `None` for no initial data.

#### `CdnSpaceObject(data=None)`

Create a new `CdnSpaceObjectEntity` instance. Pass `None` for no initial data.

#### `ConnectionRequest(data=None)`

Create a new `ConnectionRequestEntity` instance. Pass `None` for no initial data.

#### `ConnectionSource(data=None)`

Create a new `ConnectionSourceEntity` instance. Pass `None` for no initial data.

#### `CoordinationWait(data=None)`

Create a new `CoordinationWaitEntity` instance. Pass `None` for no initial data.

#### `CredentialSignInCheck(data=None)`

Create a new `CredentialSignInCheckEntity` instance. Pass `None` for no initial data.

#### `DataResourceRotateCredential(data=None)`

Create a new `DataResourceRotateCredentialEntity` instance. Pass `None` for no initial data.

#### `DeepScan(data=None)`

Create a new `DeepScanEntity` instance. Pass `None` for no initial data.

#### `DeepScanFinding(data=None)`

Create a new `DeepScanFindingEntity` instance. Pass `None` for no initial data.

#### `DeepScanFlow(data=None)`

Create a new `DeepScanFlowEntity` instance. Pass `None` for no initial data.

#### `DeepScanMappedFlow(data=None)`

Create a new `DeepScanMappedFlowEntity` instance. Pass `None` for no initial data.

#### `DeepScanOption(data=None)`

Create a new `DeepScanOptionEntity` instance. Pass `None` for no initial data.

#### `DemoShare(data=None)`

Create a new `DemoShareEntity` instance. Pass `None` for no initial data.

#### `DemoShareSegment(data=None)`

Create a new `DemoShareSegmentEntity` instance. Pass `None` for no initial data.

#### `DeploymentDashboardNomad(data=None)`

Create a new `DeploymentDashboardNomadEntity` instance. Pass `None` for no initial data.

#### `DeploymentFile(data=None)`

Create a new `DeploymentFileEntity` instance. Pass `None` for no initial data.

#### `DomainPathRule(data=None)`

Create a new `DomainPathRuleEntity` instance. Pass `None` for no initial data.

#### `Dream(data=None)`

Create a new `DreamEntity` instance. Pass `None` for no initial data.

#### `Environment(data=None)`

Create a new `EnvironmentEntity` instance. Pass `None` for no initial data.

#### `EnvironmentDiscoveryRun(data=None)`

Create a new `EnvironmentDiscoveryRunEntity` instance. Pass `None` for no initial data.

#### `EnvironmentExploration(data=None)`

Create a new `EnvironmentExplorationEntity` instance. Pass `None` for no initial data.

#### `EnvironmentFirstRun(data=None)`

Create a new `EnvironmentFirstRunEntity` instance. Pass `None` for no initial data.

#### `EnvironmentRevision(data=None)`

Create a new `EnvironmentRevisionEntity` instance. Pass `None` for no initial data.

#### `EnvironmentSecretBinding(data=None)`

Create a new `EnvironmentSecretBindingEntity` instance. Pass `None` for no initial data.

#### `EnvironmentTestAccount(data=None)`

Create a new `EnvironmentTestAccountEntity` instance. Pass `None` for no initial data.

#### `Evidence(data=None)`

Create a new `EvidenceEntity` instance. Pass `None` for no initial data.

#### `Exploration(data=None)`

Create a new `ExplorationEntity` instance. Pass `None` for no initial data.

#### `ExplorationMessage(data=None)`

Create a new `ExplorationMessageEntity` instance. Pass `None` for no initial data.

#### `ExplorationReport(data=None)`

Create a new `ExplorationReportEntity` instance. Pass `None` for no initial data.

#### `ExplorationScenario(data=None)`

Create a new `ExplorationScenarioEntity` instance. Pass `None` for no initial data.

#### `Finding(data=None)`

Create a new `FindingEntity` instance. Pass `None` for no initial data.

#### `GithubConnection(data=None)`

Create a new `GithubConnectionEntity` instance. Pass `None` for no initial data.

#### `HostingAppDomain(data=None)`

Create a new `HostingAppDomainEntity` instance. Pass `None` for no initial data.

#### `ImageRepository(data=None)`

Create a new `ImageRepositoryEntity` instance. Pass `None` for no initial data.

#### `Integration(data=None)`

Create a new `IntegrationEntity` instance. Pass `None` for no initial data.

#### `InteractionResponse(data=None)`

Create a new `InteractionResponseEntity` instance. Pass `None` for no initial data.

#### `Invitation(data=None)`

Create a new `InvitationEntity` instance. Pass `None` for no initial data.

#### `JourneyVariantReplay(data=None)`

Create a new `JourneyVariantReplayEntity` instance. Pass `None` for no initial data.

#### `Knowledge(data=None)`

Create a new `KnowledgeEntity` instance. Pass `None` for no initial data.

#### `LocalThreadDelivery(data=None)`

Create a new `LocalThreadDeliveryEntity` instance. Pass `None` for no initial data.

#### `LocalThreadOperation(data=None)`

Create a new `LocalThreadOperationEntity` instance. Pass `None` for no initial data.

#### `Location(data=None)`

Create a new `LocationEntity` instance. Pass `None` for no initial data.

#### `Me(data=None)`

Create a new `MeEntity` instance. Pass `None` for no initial data.

#### `MeEmail(data=None)`

Create a new `MeEmailEntity` instance. Pass `None` for no initial data.

#### `MeOnboarding(data=None)`

Create a new `MeOnboardingEntity` instance. Pass `None` for no initial data.

#### `MediaFile(data=None)`

Create a new `MediaFileEntity` instance. Pass `None` for no initial data.

#### `Member(data=None)`

Create a new `MemberEntity` instance. Pass `None` for no initial data.

#### `Memory(data=None)`

Create a new `MemoryEntity` instance. Pass `None` for no initial data.

#### `MergeRequest(data=None)`

Create a new `MergeRequestEntity` instance. Pass `None` for no initial data.

#### `MessagingConversationMessage(data=None)`

Create a new `MessagingConversationMessageEntity` instance. Pass `None` for no initial data.

#### `MessagingConversationUpload(data=None)`

Create a new `MessagingConversationUploadEntity` instance. Pass `None` for no initial data.

#### `MetricQuery(data=None)`

Create a new `MetricQueryEntity` instance. Pass `None` for no initial data.

#### `NetworkConnection(data=None)`

Create a new `NetworkConnectionEntity` instance. Pass `None` for no initial data.

#### `NomadAllocation(data=None)`

Create a new `NomadAllocationEntity` instance. Pass `None` for no initial data.

#### `NomadLog(data=None)`

Create a new `NomadLogEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `Page(data=None)`

Create a new `PageEntity` instance. Pass `None` for no initial data.

#### `PageAgent(data=None)`

Create a new `PageAgentEntity` instance. Pass `None` for no initial data.

#### `PageProjectRun(data=None)`

Create a new `PageProjectRunEntity` instance. Pass `None` for no initial data.

#### `PagesProjectCredential(data=None)`

Create a new `PagesProjectCredentialEntity` instance. Pass `None` for no initial data.

#### `PagesProjectPersona(data=None)`

Create a new `PagesProjectPersonaEntity` instance. Pass `None` for no initial data.

#### `PagesProjectRun(data=None)`

Create a new `PagesProjectRunEntity` instance. Pass `None` for no initial data.

#### `PagesProjectScenario(data=None)`

Create a new `PagesProjectScenarioEntity` instance. Pass `None` for no initial data.

#### `PersonalAccessToken(data=None)`

Create a new `PersonalAccessTokenEntity` instance. Pass `None` for no initial data.

#### `PreviewOperation(data=None)`

Create a new `PreviewOperationEntity` instance. Pass `None` for no initial data.

#### `PreviewProfileSecretBinding(data=None)`

Create a new `PreviewProfileSecretBindingEntity` instance. Pass `None` for no initial data.

#### `PreviewSecret(data=None)`

Create a new `PreviewSecretEntity` instance. Pass `None` for no initial data.

#### `PreviewSharingApproval(data=None)`

Create a new `PreviewSharingApprovalEntity` instance. Pass `None` for no initial data.

#### `ProductMapIdentityDecision(data=None)`

Create a new `ProductMapIdentityDecisionEntity` instance. Pass `None` for no initial data.

#### `ProductMapJourney(data=None)`

Create a new `ProductMapJourneyEntity` instance. Pass `None` for no initial data.

#### `ProductMapJourneyReplay(data=None)`

Create a new `ProductMapJourneyReplayEntity` instance. Pass `None` for no initial data.

#### `ProductMapObservation(data=None)`

Create a new `ProductMapObservationEntity` instance. Pass `None` for no initial data.

#### `ProductMapQuestion(data=None)`

Create a new `ProductMapQuestionEntity` instance. Pass `None` for no initial data.

#### `ProductMapState(data=None)`

Create a new `ProductMapStateEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `ProjectAndroidApk(data=None)`

Create a new `ProjectAndroidApkEntity` instance. Pass `None` for no initial data.

#### `ProjectCodeMap(data=None)`

Create a new `ProjectCodeMapEntity` instance. Pass `None` for no initial data.

#### `ProjectEnvironment(data=None)`

Create a new `ProjectEnvironmentEntity` instance. Pass `None` for no initial data.

#### `ProjectFinding(data=None)`

Create a new `ProjectFindingEntity` instance. Pass `None` for no initial data.

#### `ProjectFixture(data=None)`

Create a new `ProjectFixtureEntity` instance. Pass `None` for no initial data.

#### `ProjectIosApp(data=None)`

Create a new `ProjectIosAppEntity` instance. Pass `None` for no initial data.

#### `ProjectMessagingConversation(data=None)`

Create a new `ProjectMessagingConversationEntity` instance. Pass `None` for no initial data.

#### `ProjectOverviewMetric(data=None)`

Create a new `ProjectOverviewMetricEntity` instance. Pass `None` for no initial data.

#### `ProjectOverviewPullRequest(data=None)`

Create a new `ProjectOverviewPullRequestEntity` instance. Pass `None` for no initial data.

#### `ProjectProductMap(data=None)`

Create a new `ProjectProductMapEntity` instance. Pass `None` for no initial data.

#### `ProjectRecording(data=None)`

Create a new `ProjectRecordingEntity` instance. Pass `None` for no initial data.

#### `ProjectRunPlan(data=None)`

Create a new `ProjectRunPlanEntity` instance. Pass `None` for no initial data.

#### `ProjectRunSchedule(data=None)`

Create a new `ProjectRunScheduleEntity` instance. Pass `None` for no initial data.

#### `ProjectScenarioOption(data=None)`

Create a new `ProjectScenarioOptionEntity` instance. Pass `None` for no initial data.

#### `ProjectScenarioRow(data=None)`

Create a new `ProjectScenarioRowEntity` instance. Pass `None` for no initial data.

#### `ProjectSetting(data=None)`

Create a new `ProjectSettingEntity` instance. Pass `None` for no initial data.

#### `PullRequest(data=None)`

Create a new `PullRequestEntity` instance. Pass `None` for no initial data.

#### `PullRequestSetting(data=None)`

Create a new `PullRequestSettingEntity` instance. Pass `None` for no initial data.

#### `PullRequestSettingAddRepository(data=None)`

Create a new `PullRequestSettingAddRepositoryEntity` instance. Pass `None` for no initial data.

#### `PullRequestSettingDetectComment(data=None)`

Create a new `PullRequestSettingDetectCommentEntity` instance. Pass `None` for no initial data.

#### `Recorder(data=None)`

Create a new `RecorderEntity` instance. Pass `None` for no initial data.

#### `Registry(data=None)`

Create a new `RegistryEntity` instance. Pass `None` for no initial data.

#### `RegistryV2(data=None)`

Create a new `RegistryV2Entity` instance. Pass `None` for no initial data.

#### `RelayAgentLocalThread(data=None)`

Create a new `RelayAgentLocalThreadEntity` instance. Pass `None` for no initial data.

#### `ReportReplay(data=None)`

Create a new `ReportReplayEntity` instance. Pass `None` for no initial data.

#### `ReportScenario(data=None)`

Create a new `ReportScenarioEntity` instance. Pass `None` for no initial data.

#### `RunScenarioRun(data=None)`

Create a new `RunScenarioRunEntity` instance. Pass `None` for no initial data.

#### `RunScheduleOption(data=None)`

Create a new `RunScheduleOptionEntity` instance. Pass `None` for no initial data.

#### `RunSearch(data=None)`

Create a new `RunSearchEntity` instance. Pass `None` for no initial data.

#### `RunUpdate(data=None)`

Create a new `RunUpdateEntity` instance. Pass `None` for no initial data.

#### `ScenarioRevision(data=None)`

Create a new `ScenarioRevisionEntity` instance. Pass `None` for no initial data.

#### `ScenarioRunLesson(data=None)`

Create a new `ScenarioRunLessonEntity` instance. Pass `None` for no initial data.

#### `ScenarioRunScenarioEdit(data=None)`

Create a new `ScenarioRunScenarioEditEntity` instance. Pass `None` for no initial data.

#### `ServiceEndpoint(data=None)`

Create a new `ServiceEndpointEntity` instance. Pass `None` for no initial data.

#### `SitePreview(data=None)`

Create a new `SitePreviewEntity` instance. Pass `None` for no initial data.

#### `SlackChannel(data=None)`

Create a new `SlackChannelEntity` instance. Pass `None` for no initial data.

#### `SparkAgentLocalThread(data=None)`

Create a new `SparkAgentLocalThreadEntity` instance. Pass `None` for no initial data.

#### `StaticSite(data=None)`

Create a new `StaticSiteEntity` instance. Pass `None` for no initial data.

#### `StaticSiteDeployment(data=None)`

Create a new `StaticSiteDeploymentEntity` instance. Pass `None` for no initial data.

#### `StaticSiteDomain(data=None)`

Create a new `StaticSiteDomainEntity` instance. Pass `None` for no initial data.

#### `SubscriptionModel(data=None)`

Create a new `SubscriptionModelEntity` instance. Pass `None` for no initial data.

#### `ThreadPreview(data=None)`

Create a new `ThreadPreviewEntity` instance. Pass `None` for no initial data.

#### `VerificationProjectCredential(data=None)`

Create a new `VerificationProjectCredentialEntity` instance. Pass `None` for no initial data.

#### `VerificationProjectPersona(data=None)`

Create a new `VerificationProjectPersonaEntity` instance. Pass `None` for no initial data.

#### `VerificationProjectRun(data=None)`

Create a new `VerificationProjectRunEntity` instance. Pass `None` for no initial data.

#### `VerificationProjectScenario(data=None)`

Create a new `VerificationProjectScenarioEntity` instance. Pass `None` for no initial data.

#### `VerifyAppDomain(data=None)`

Create a new `VerifyAppDomainEntity` instance. Pass `None` for no initial data.

#### `VerifyBrowserSession(data=None)`

Create a new `VerifyBrowserSessionEntity` instance. Pass `None` for no initial data.

#### `VerifyStaticSiteDomain(data=None)`

Create a new `VerifyStaticSiteDomainEntity` instance. Pass `None` for no initial data.

#### `VersionLog(data=None)`

Create a new `VersionLogEntity` instance. Pass `None` for no initial data.

#### `WebBotAuth(data=None)`

Create a new `WebBotAuthEntity` instance. Pass `None` for no initial data.

#### `WorkflowRunStep(data=None)`

Create a new `WorkflowRunStepEntity` instance. Pass `None` for no initial data.

#### `WorkflowRunStopNotice(data=None)`

Create a new `WorkflowRunStopNoticeEntity` instance. Pass `None` for no initial data.

#### `WorkflowTriggerSkipped(data=None)`

Create a new `WorkflowTriggerSkippedEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AgentEntity

```python
agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `str | None` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `str | None` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Any` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `str | None` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `str` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `str` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `last_reply_at` | `str | None` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `list` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `str | None` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `list` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `str | None` | No | Advisory composer action. |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `persona` | `Any` | No |  |
| `preview` | `Any` | No |  |
| `preview_received_at` | `str | None` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Any` | No |  |
| `reply_triage` | `dict | None` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `str` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
| `slug` | `str` | Yes | Optional explicit API alias. |
| `status` | `str` | Yes |  |
| `team_role` | `str` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `str` | Yes |  |
| `url_slug` | `str` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `str` | No | Defaults to organization. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `attention` | - | - | - | - | - |
| `avatar` | - | - | - | - | - |
| `can_delete` | - | - | - | - | - |
| `can_edit_configuration` | - | - | - | - | - |
| `can_manage` | - | - | - | - | - |
| `can_manage_sharing` | - | - | - | - | - |
| `can_name_managers` | - | - | - | - | - |
| `can_queue_input` | - | - | - | - | - |
| `can_reconcile_save` | - | - | - | - | - |
| `configuration` | - | - | Yes | - | - |
| `configuration_revision` | - | - | - | - | - |
| `configuration_version` | - | - | - | - | - |
| `control_connections_available` | - | - | - | - | - |
| `controlling_user_id` | - | - | - | - | - |
| `coordination_available` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `direct_chat_available` | - | - | - | - | - |
| `has_unread_updates` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `last_reply_at` | - | - | - | - | - |
| `lifecycle_actions` | - | - | - | - | - |
| `lifecycle_version` | - | - | - | - | - |
| `local_agent_control_available` | - | - | - | - | - |
| `managers` | - | - | - | - | - |
| `model_change_action` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `organization_id` | - | - | - | - | - |
| `persona` | - | - | - | - | - |
| `preview` | - | - | - | - | - |
| `preview_received_at` | - | - | - | - | - |
| `provisioning` | - | - | - | - | - |
| `reply_triage` | - | - | - | - | - |
| `runtime_version` | - | - | - | - | - |
| `setup_pending` | - | - | - | - | - |
| `sharing_fixed` | - | - | - | - | - |
| `sharing_version` | - | - | - | - | - |
| `slug` | - | - | Yes | - | - |
| `status` | - | - | - | - | - |
| `team_role` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `url_slug` | - | - | - | - | - |
| `visibility` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AgentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Agent().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Agent().list({"organization_id": "example"})
for agent in results:
    print(agent.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Agent().load({"id": "agent_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Agent().remove({"id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentAttachmentEntity

```python
agent_attachment = client.AgentAttachment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `int` | Yes |  |
| `content_type` | `str` | Yes |  |
| `file_name` | `str` | Yes |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentAttachmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentAttachment().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "byte_size": 1,  # int
    "content_type": "example_content_type",  # str
    "file_name": "example_file_name",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAttachmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentAutomationEntity

```python
agent_automation = client.AgentAutomation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `definition` | `dict` | Yes |  |
| `event_subscriptions` | `list` | Yes |  |
| `event_triggers` | `list` | Yes |  |
| `expected_revision` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `key` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `Any` | Yes |  |
| `schedules` | `list` | Yes |  |
| `version` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentAutomationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentAutomation().list({"agent_id": "example", "organization_id": "example"})
for agent_automation in results:
    print(agent_automation.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentAutomationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentAutomation().load({"id": "agent_automation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentAutomationEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentAutomation().update({
    "id": "agent_automation_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAutomationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentAvatarEntity

```python
agent_avatar = client.AgentAvatar()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentAvatarEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> AgentAvatarEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAvatarEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentCommandEntity

```python
agent_command = client.AgentCommand()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | Yes |  |
| `display_name` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `skill_model_visible` | `bool` | Yes |  |
| `source` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentCommandEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentCommand().list({"agent_id": "example", "organization_id": "example"})
for agent_command in results:
    print(agent_command.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCommandEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentComputerEntity

```python
agent_computer = client.AgentComputer()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentComputerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> AgentComputerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentComputerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentConnectionEntity

```python
agent_connection = client.AgentConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `str` | Yes |  |
| `auth_scheme` | `str` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `connection` | `dict` | Yes |  |
| `credential` | `str | None` | No | Write-only outbound key. |
| `error_code` | `str | None` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `remote_agent` | `str | None` | Yes |  |
| `requester_id` | `str` | Yes |  |
| `retired_at` | `str | None` | Yes |  |
| `revoked_at` | `str | None` | Yes |  |
| `scope_key` | `str` | Yes |  |
| `source_operation_id` | `str | None` | Yes |  |
| `state` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `agent_card_url` | - | - | - | - | - |
| `auth_scheme` | - | - | - | - | - |
| `can_configure` | - | - | - | - | - |
| `can_disconnect` | - | - | - | - | - |
| `can_setup` | - | - | - | - | - |
| `connection` | - | - | - | - | - |
| `credential` | - | - | - | - | - |
| `error_code` | - | - | - | - | - |
| `expected_generation` | - | - | - | - | - |
| `generation` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `remote_agent` | - | - | Yes | Yes | - |
| `requester_id` | - | - | - | - | - |
| `retired_at` | - | - | - | - | - |
| `revoked_at` | - | - | - | - | - |
| `scope_key` | - | - | - | - | - |
| `source_operation_id` | - | - | Yes | - | - |
| `state` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AgentConnectionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentConnection().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "agent_card_url": "example_agent_card_url",  # str
    "auth_scheme": "example_auth_scheme",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentConnectionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentConnection().list({"agent_id": "example", "organization_id": "example"})
for agent_connection in results:
    print(agent_connection.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentConnectionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentConnection().load({"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentConnectionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentConnection().remove({"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentConnectionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentConnection().update({
    "id": "agent_connection_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentControlFlowEntity

```python
agent_control_flow = client.AgentControlFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `bool` | Yes |  |
| `cancellation_requested` | `bool` | Yes |  |
| `device_name` | `str` | Yes |  |
| `flow_id` | `str` | Yes |  |
| `id` | `str` | No |  |
| `providers` | `list` | Yes |  |
| `repair_of_flow_id` | `str` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `str` | Yes |  |
| `step_count` | `int` | Yes |  |
| `title` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentControlFlowEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[AgentControlFlowEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentControlFlow().list({"agent_id": "example", "organization_id": "example"})
for agent_control_flow in results:
    print(agent_control_flow.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentControlFlowEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentControlFlow().load({"id": "agent_control_flow_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentControlFlowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentCoordinationEntity

```python
agent_coordination = client.AgentCoordination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentCoordinationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCoordinationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentEmailEntity

```python
agent_email = client.AgentEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `str | None` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `str` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `preview` | `str` | No |  |
| `received_at` | `str` | Yes |  |
| `recipient_tag` | `str | None` | Yes | The +tag the sender used, if any |
| `spam` | `bool` | Yes | SES judged it spam |
| `subject` | `str | None` | Yes |  |
| `text` | `str` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> AgentEmailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentEmail().load({"id": "agent_email_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentFileEntity

```python
agent_file = client.AgentFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `str` | Yes |  |
| `download_url` | `str` | Yes |  |
| `filename` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `size_bytes` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> AgentFileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentFile().load({"id": "agent_file_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentFileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentInputEntity

```python
agent_input = client.AgentInput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `list` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `list` | No |  |
| `browser_context` | `dict` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `dict` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `str` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `Any` | No |  |
| `requester_membership_id` | `str` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `str` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentInputEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentInput().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "browser_context": {},  # dict
    "client_time": {},  # dict
    "conversation_id": "example_conversation_id",  # str
    "text": "example_text",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentInputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentIntegrationEntity

```python
agent_integration = client.AgentIntegration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `dict` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `str` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `list` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` | Yes |  |
| `can_manage_organization` | `bool` | Yes |  |
| `catalog` | `list` | Yes |  |
| `connect_as` | `str | None` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `dict` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `dict` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `str` | Yes |  |
| `connections` | `list` | Yes |  |
| `email` | `dict` | Yes | A native agent's own email address. |
| `enabled` | `bool` | Yes |  |
| `enabled_toolkits` | `list` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `pending_counts` | `dict` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `dict` | Yes |  |
| `webhook_connections` | `list` | Yes |  |
| `webhooks_available` | `bool` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentIntegrationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentIntegration().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "connection_id": "example_connection_id",  # str
    "enabled": True,  # bool
    "generation": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentIntegrationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentIntegration().list({"agent_id": "example", "organization_id": "example"})
for agent_integration in results:
    print(agent_integration.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentIntegrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentInteractionEntity

```python
agent_interaction = client.AgentInteraction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `interactions` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentInteractionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[AgentInteractionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentInteraction().list({"agent_id": "example", "organization_id": "example", "conversation_id": "example"})
for agent_interaction in results:
    print(agent_interaction.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentInteractionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentInteraction().load({"id": "agent_interaction_id", "agent_id": "agent_id", "organization_id": "organization_id", "conversation_id": "conversation_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentInteractionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentLibraryEntity

```python
agent_library = client.AgentLibrary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> AgentLibraryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentLibraryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentManagerEntity

```python
agent_manager = client.AgentManager()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `str | None` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `str | None` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Any` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `str | None` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `str` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `str` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `last_reply_at` | `str | None` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `list` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `str | None` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `list` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `str | None` | No | Advisory composer action. |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `persona` | `Any` | No |  |
| `preview` | `Any` | No |  |
| `preview_received_at` | `str | None` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Any` | No |  |
| `reply_triage` | `dict | None` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `str` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `team_role` | `str` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `str` | Yes |  |
| `url_slug` | `str` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `str` | Yes |  |
| `visibility` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentManagerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentManager().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "user_id": "example_user_id",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> AgentManagerEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentManager().remove({"id": "agent_manager_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentManagerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentManagerChoiceEntity

```python
agent_manager_choice = client.AgentManagerChoice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentManagerChoiceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentManagerChoice().list({"agent_id": "example", "organization_id": "example"})
for agent_manager_choice in results:
    print(agent_manager_choice.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentManagerChoiceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentMarketplaceEntity

```python
agent_marketplace = client.AgentMarketplace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `dict` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `str | None` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `list` | Yes |  |
| `category` | `str` | Yes |  |
| `counts` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `explainer` | `str | None` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `str` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `str` | Yes |  |
| `integration_toolkits` | `list` | Yes |  |
| `integrations` | `list` | Yes |  |
| `listing` | `Any` | Yes |  |
| `listings` | `list` | Yes |  |
| `memories` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `next_page` | `int | None` | Yes |  |
| `organization_name` | `str` | Yes |  |
| `page_apps` | `list` | Yes |  |
| `publisher_avatar_url` | `str | None` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `str` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `list` | Yes |  |
| `share_token` | `str | None` | Yes | Present only for people who manage the listing. |
| `skills` | `list` | Yes |  |
| `slug` | `str` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `str` | No | The V2 agent this listing was published from. |
| `summary` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `dict` | Yes | Who a public marketplace response was read for. |
| `visibility` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- |
| `bundle` | - | - | - | - | - |
| `can_manage` | - | - | - | - | - |
| `catalog_key` | - | - | - | - | - |
| `categories` | - | - | - | - | - |
| `category` | - | - | - | Yes | - |
| `counts` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `expected_version` | - | - | - | - | - |
| `explainer` | - | Yes | - | Yes | - |
| `featured` | - | - | - | - | - |
| `from_composal` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `installs_count` | - | - | - | - | - |
| `instructions` | - | - | - | - | - |
| `integration_toolkits` | - | - | - | - | - |
| `integrations` | - | - | - | - | - |
| `listing` | - | - | - | - | - |
| `listings` | - | - | - | - | - |
| `memories` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `next_page` | - | - | - | - | - |
| `organization_name` | - | - | - | - | - |
| `page_apps` | - | - | - | - | - |
| `publisher_avatar_url` | - | - | - | - | - |
| `publisher_name` | - | - | - | - | - |
| `sections` | - | - | - | - | - |
| `share_token` | - | - | - | - | - |
| `skills` | - | - | - | - | - |
| `slug` | - | - | - | - | - |
| `source_agent_id` | - | - | - | - | - |
| `summary` | - | - | - | Yes | - |
| `updated_at` | - | - | - | - | - |
| `version` | - | - | - | - | - |
| `viewer` | - | - | - | - | - |
| `visibility` | - | Yes | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> AgentMarketplaceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentMarketplace().create({
    "organization_id": "example_organization_id",  # str
    "bundle": {},  # dict
    "category": "example_category",  # str
    "name": "example_name",  # str
    "summary": "example_summary",  # str
})
```

#### `load(reqmatch, ctrl=None) -> AgentMarketplaceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentMarketplace().load({"id": "agent_marketplace_id"})
```

#### `patch(reqdata, ctrl=None) -> AgentMarketplaceEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AgentMarketplace().patch({
    "id": "agent_marketplace_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AgentMarketplaceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentMarketplace().remove({"id": "agent_marketplace_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentMarketplaceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentMarketplace().update({
    "id": "agent_marketplace_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMarketplaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentMarketplaceSharedEntity

```python
agent_marketplace_shared = client.AgentMarketplaceShared()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `str | None` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `str` | Yes |  |
| `counts` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `explainer` | `str | None` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `str` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `str` | Yes |  |
| `integration_toolkits` | `list` | Yes |  |
| `integrations` | `list` | Yes |  |
| `listing` | `Any` | Yes |  |
| `memories` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `organization_name` | `str` | Yes |  |
| `page_apps` | `list` | Yes |  |
| `publisher_avatar_url` | `str | None` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `str` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `str | None` | Yes | Present only for people who manage the listing. |
| `skills` | `list` | Yes |  |
| `slug` | `str` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `dict` | Yes | Who a public marketplace response was read for. |
| `visibility` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentMarketplaceSharedEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> AgentMarketplaceSharedEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentMarketplaceShared().load({"id": "agent_marketplace_shared_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMarketplaceSharedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentMissionControlEntity

```python
agent_mission_control = client.AgentMissionControl()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentMissionControlEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMissionControlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentOperationEntity

```python
agent_operation = client.AgentOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `dict` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `str` | No |  |
| `key` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `operation` | `dict` | Yes |  |
| `participant` | `str` | Yes |  |
| `requester_id` | `str` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentOperationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentOperation().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "arguments": {},  # dict
    "key": "example_key",  # str
    "name": "example_name",  # str
    "requester_id": "example_requester_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> AgentOperationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentOperation().load({"id": "agent_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentOperationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentProvisioningEntity

```python
agent_provisioning = client.AgentProvisioning()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentProvisioningEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentProvisioningEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentPullRequestEntity

```python
agent_pull_request = client.AgentPullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `number` | `int` | Yes |  |
| `owners` | `list` | Yes |  |
| `repository` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `url` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentPullRequestEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentPullRequest().list({"agent_id": "example", "organization_id": "example"})
for agent_pull_request in results:
    print(agent_pull_request.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentPullRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentQuestionEntity

```python
agent_question = client.AgentQuestion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentQuestionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentQuestionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentRepositoryEntity

```python
agent_repository = client.AgentRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `environments` | `dict` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` | Yes |  |
| `id` | `str` | No |  |
| `repository_choices` | `list` | Yes |  |
| `repository_choices_error` | `str | None` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `version` | `int` | Yes |  |
| `work_repositories` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentRepositoryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentRepository().list({"agent_id": "example", "organization_id": "example"})
for agent_repository in results:
    print(agent_repository.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentRepositoryEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentRepository().update({
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRepositoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentResourceEntity

```python
agent_resource = client.AgentResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | Yes |  |
| `uri` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentResource().list({"agent_id": "example", "organization_id": "example"})
for agent_resource in results:
    print(agent_resource.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentRoutineEntity

```python
agent_routine = client.AgentRoutine()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `consecutive_errors` | `int` | Yes |  |
| `credit_wait` | `dict` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `str | None` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `last_error` | `str | None` | Yes |  |
| `last_run_at` | `str | None` | Yes |  |
| `last_status` | `str | None` | Yes |  |
| `managed` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `next_run_at` | `str | None` | Yes |  |
| `routine` | `dict` | Yes |  |
| `schedule` | `dict` | Yes |  |
| `schedule_label` | `str` | Yes |  |
| `utility_model` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentRoutineEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentRoutine().list({"agent_id": "example", "organization_id": "example"})
for agent_routine in results:
    print(agent_routine.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentRoutineEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentRoutine().update({
    "agent_id": "agent_id",
    "id": "id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRoutineEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentRunEntity

```python
agent_run = client.AgentRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `str | None` | No |  |
| `id` | `str` | No |  |
| `run_id` | `str` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> AgentRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentRun().load({"id": "agent_run_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentRuntimeEntity

```python
agent_runtime = client.AgentRuntime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `list` | No |  |
| `can_manage` | `bool` | Yes |  |
| `can_reset` | `bool` | No |  |
| `image` | `str` | Yes |  |
| `memory_mb` | `int | None` | Yes |  |
| `platform` | `str` | No |  |
| `profile` | `str` | Yes |  |
| `provider` | `str` | No |  |
| `state` | `str` | Yes |  |
| `version` | `str` | Yes |  |
| `volume` | `dict | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentRuntimeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRuntimeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSettingEntity

```python
agent_setting = client.AgentSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_version` | `str` | Yes |  |
| `instructions` | `str` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentSettingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentSetting().list({"agent_id": "example", "organization_id": "example"})
for agent_setting in results:
    print(agent_setting.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentSettingEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentSetting().update({
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSharingEntity

```python
agent_sharing = client.AgentSharing()
```

### Operations

#### `load(reqmatch, ctrl=None) -> AgentSharingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSharingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSiteEntity

```python
agent_site = client.AgentSite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `str` | Yes |  |
| `deployments_count` | `int` | Yes |  |
| `hostname` | `str` | Yes |  |
| `https` | `str` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `url` | `str` | Yes |  |
| `visibility` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentSiteEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentSite().list({"agent_id": "example", "organization_id": "example"})
for agent_site in results:
    print(agent_site.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSiteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSkillEntity

```python
agent_skill = client.AgentSkill()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `configuration_state` | `str` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `str` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `skills` | `list` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentSkillEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentSkill().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "enabled": True,  # bool
    "name": "example_name",  # str
    "version": "example_version",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentSkillEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentSkill().list({"agent_id": "example", "organization_id": "example"})
for agent_skill in results:
    print(agent_skill.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSlackEntity

```python
agent_slack = client.AgentSlack()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentSlackEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSlackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSubagentEntity

```python
agent_subagent = client.AgentSubagent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes |  |
| `attention` | `dict | None` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `model` | `str | None` | Yes |  |
| `parent_id` | `str` | Yes |  |
| `preview` | `str | None` | Yes |  |
| `started_at` | `str | None` | Yes |  |
| `state` | `str | None` | Yes | What the thread is to the viewer. |
| `status` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str | None` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentSubagentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentSubagent().list({"agent_id": "example", "organization_id": "example"})
for agent_subagent in results:
    print(agent_subagent.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSubagentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSubscriptionEntity

```python
agent_subscription = client.AgentSubscription()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentSubscriptionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentSubscription().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentSubscriptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentSubscription().list({"agent_id": "example", "organization_id": "example"})
for agent_subscription in results:
    print(agent_subscription.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSubscriptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentTeammateEntity

```python
agent_teammate = client.AgentTeammate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `str | None` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `persona` | `Any` | No |  |
| `slug` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentTeammateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentTeammate().list({"agent_id": "example", "organization_id": "example"})
for agent_teammate in results:
    print(agent_teammate.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentTeammateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentTerminalEntity

```python
agent_terminal = client.AgentTerminal()
```

### Operations

#### `create(reqdata, ctrl=None) -> AgentTerminalEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentTerminalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentThreadEntity

```python
agent_thread = client.AgentThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `int | None` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` | Yes |  |
| `execution` | `Any` | No |  |
| `first_input` | `Any` | No |  |
| `first_input_key` | `str` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `str` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `str` | No |  |
| `inherit_context` | `bool` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `dict` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `str | None` | Yes |  |
| `local_scope_key` | `str | None` | Yes |  |
| `local_status_pending` | `bool` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `list` | Yes |  |
| `main_thread_id` | `str` | Yes |  |
| `message` | `str` | No | The thread's first message. |
| `next_cursor` | `str | None` | Yes |  |
| `parent_conversation_id` | `str` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `str` | No |  |
| `selected_thread` | `Any` | Yes |  |
| `thread` | `dict` | Yes |  |
| `threads` | `list` | Yes |  |
| `title` | `str` | No |  |
| `total_archived_count` | `int | None` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Operations

#### `create(reqdata, ctrl=None) -> AgentThreadEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentThread().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentThreadEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentThread().list({"agent_id": "example", "organization_id": "example"})
for agent_thread in results:
    print(agent_thread.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentThreadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentToolEntity

```python
agent_tool = client.AgentTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `inputSchema` | `dict` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentToolEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentTool().list({"agent_id": "example", "organization_id": "example"})
for agent_tool in results:
    print(agent_tool.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentVerifyProjectEntity

```python
agent_verify_project = client.AgentVerifyProject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` | Yes |  |
| `project_choices` | `list` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` | Yes |  |
| `verify_projects` | `list` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentVerifyProjectEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentVerifyProject().list({"agent_id": "example", "organization_id": "example"})
for agent_verify_project in results:
    print(agent_verify_project.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentVerifyProjectEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentVerifyProject().update({
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentVerifyProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWaitEntity

```python
agent_wait = client.AgentWait()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWaitEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWaitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWebhookEntity

```python
agent_webhook = client.AgentWebhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `connection` | `dict` | Yes |  |
| `deliveries` | `list` | Yes |  |
| `event_types` | `list` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `id` | `str` | No |  |
| `max_events_per_day` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `purpose` | `str` | Yes |  |
| `signing_key` | `str | None` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWebhookEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentWebhook().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "event_types": [],  # list
    "max_events_per_day": 1,  # int
    "name": "example_name",  # str
    "purpose": "example_purpose",  # str
})
```

#### `load(reqmatch, ctrl=None) -> AgentWebhookEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentWebhook().load({"id": "agent_webhook_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentWebhookEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentWebhook().update({
    "id": "agent_webhook_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkEntity

```python
agent_work = client.AgentWork()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWorkEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkflowEntity

```python
agent_workflow = client.AgentWorkflow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_digest` | `str` | Yes |  |
| `path` | `str` | Yes |  |
| `source` | `str` | Yes | At most 262144 UTF-8 bytes |
| `template` | `str` | Yes | A template id from the catalog's templates |
| `templates` | `list` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `workflows` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWorkflowEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentWorkflow().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "path": "example_path",  # str
    "template": "example_template",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentWorkflowEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentWorkflow().list({"agent_id": "example", "organization_id": "example"})
for agent_workflow in results:
    print(agent_workflow.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentWorkflowEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentWorkflow().update({
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkflowProposalEntity

```python
agent_workflow_proposal = client.AgentWorkflowProposal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `dict` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `str | None` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` | Yes |  |
| `can_revise` | `bool` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `str` | Yes |  |
| `definition` | `dict | None` | Yes |  |
| `digest` | `str` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `str | None` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `str` | Yes |  |
| `model_choices` | `list` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `str` | Yes |  |
| `native_rows` | `list` | No |  |
| `path` | `str` | Yes |  |
| `pipeline_checkpoints` | `dict` | Yes |  |
| `pipeline_commands` | `dict` | Yes |  |
| `reasoning_choices` | `list` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `int | None` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `dict | None` | Yes |  |
| `stale` | `bool` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `dict | None` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `str | None` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWorkflowProposalEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> AgentWorkflowProposalEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentWorkflowProposal().load({"id": "agent_workflow_proposal_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowProposalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkflowRunEntity

```python
agent_workflow_run = client.AgentWorkflowRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `automation` | `dict | None` | Yes | Saved native automation identity. |
| `budget_seconds` | `int | None` | Yes | The run stops once it has been running this long |
| `budget_usd` | `float | None` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `dict | None` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `str | None` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `dict` | Yes |  |
| `error` | `str | None` | Yes |  |
| `finished_at` | `str | None` | Yes |  |
| `flow_steps` | `list | None` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `str` | Yes | Public run ID. |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `str | None` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `str | None` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `str | None` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `str` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `str` | Yes |  |
| `started_by` | `dict | None` | Yes | The event that started the run |
| `status` | `str` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `list` | Yes |  |
| `trigger_id` | `str | None` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `str | None` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `str | None` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AgentWorkflowRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[AgentWorkflowRunEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentWorkflowRun().list({"agent_id": "example", "organization_id": "example"})
for agent_workflow_run in results:
    print(agent_workflow_run.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentWorkflowRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentWorkflowRun().load({"id": "agent_workflow_run_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkflowTriggerEntity

```python
agent_workflow_trigger = client.AgentWorkflowTrigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `dict | None` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` | Yes |  |
| `can_pause` | `bool` | Yes | It is running, so a manager can pause it |
| `can_resume` | `bool` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `bool` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `int | None` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `str | None` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `next_due_at` | `str | None` | Yes |  |
| `pause_cause` | `str | None` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `str | None` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `float | None` | Yes |  |
| `schedule` | `dict | None` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `str | None` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `str | None` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `str | None` | Yes |  |
| `starts` | `dict | None` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `str | None` | Yes | The event subscription that starts it |
| `time_zone` | `str` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `int | None` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `dict` | Yes |  |
| `workflow_path` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentWorkflowTriggerEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentWorkflowTrigger().list({"agent_id": "example", "organization_id": "example"})
for agent_workflow_trigger in results:
    print(agent_workflow_trigger.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentWorkflowTriggerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentWorkflowTrigger().load({"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentWorkflowTriggerEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentWorkflowTrigger().remove({"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> AgentWorkflowTriggerEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentWorkflowTrigger().update({
    "id": "agent_workflow_trigger_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowTriggerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWorkspaceEntity

```python
agent_workspace = client.AgentWorkspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `can_delete` | `bool` | Yes |  |
| `can_keep` | `bool` | Yes |  |
| `cleanup_after` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `reason` | `str` | Yes |  |
| `state` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentWorkspaceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentWorkspace().list({"agent_id": "example", "organization_id": "example"})
for agent_workspace in results:
    print(agent_workspace.data_get())
```

#### `update(reqdata, ctrl=None) -> AgentWorkspaceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentWorkspace().update({
    "agent_id": "agent_id",
    "id": "id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkspaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentWritePermissionEntity

```python
agent_write_permission = client.AgentWritePermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `str` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `str` | Yes |  |
| `granted_by` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `in_effect` | `bool` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `str | None` | Yes |  |
| `tool` | `str` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentWritePermissionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentWritePermission().list({"agent_id": "example", "organization_id": "example"})
for agent_write_permission in results:
    print(agent_write_permission.data_get())
```

#### `remove(reqmatch, ctrl=None) -> AgentWritePermissionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentWritePermission().remove({"id": "agent_write_permission_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWritePermissionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AllocationLogEntity

```python
allocation_log = client.AllocationLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `str` | Yes |  |
| `environment` | `str` | No |  |
| `fetched_at` | `str` | Yes |  |
| `location` | `str | None` | No |  |
| `logs` | `str` | Yes |  |
| `namespace` | `str` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `str` | Yes |  |
| `service` | `str` | No |  |
| `task` | `str` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AllocationLogEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AllocationLog().list({"allocation_id": "example", "app_id": "example"})
for allocation_log in results:
    print(allocation_log.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AllocationLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppEntity

```python
app = client.App()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `description` | `str | None` | Yes |  |
| `framework` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `repository_id` | `str` | Yes |  |
| `repository_kind` | `str | None` | Yes |  |
| `root_path` | `str` | Yes |  |
| `root_path_display` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - | - |
| `description` | - | - | Yes | Yes | Yes | - |
| `framework` | - | - | Yes | Yes | Yes | - |
| `id` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `organization_id` | - | - | - | Yes | Yes | - |
| `repository_id` | - | - | - | Yes | Yes | - |
| `repository_kind` | - | - | - | - | - | - |
| `root_path` | - | - | - | Yes | Yes | - |
| `root_path_display` | - | - | - | - | - | - |
| `slug` | - | - | - | Yes | Yes | - |
| `status` | - | - | Yes | Yes | Yes | - |
| `updated_at` | - | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.App().create({
    "name": "example_name",  # str
    "organization_id": "example_organization_id",  # str
    "repository_id": "example_repository_id",  # str
    "root_path": "example_root_path",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.App().list()
for app in results:
    print(app.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.App().load({"id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.App().patch({
    "id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.App().remove({"id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.App().update({
    "id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppCdnEntity

```python
app_cdn = client.AppCdn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `cache_path_prefix` | `str | None` | No |  |
| `cache_settings_json` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `distribution_kind` | `str` | Yes |  |
| `edge_hostname` | `str | None` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `hostnames` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `last_deployed_at` | `str | None` | Yes |  |
| `last_deployed_at_label` | `str | None` | Yes |  |
| `last_purged_at` | `str | None` | Yes |  |
| `last_purged_at_label` | `str | None` | Yes |  |
| `last_synced_at` | `str | None` | Yes |  |
| `last_synced_at_label` | `str | None` | Yes |  |
| `name` | `str` | Yes |  |
| `origin_url` | `str` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `routing_settings_json` | `str | None` | Yes |  |
| `security_settings_json` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | Yes | Yes | Yes | - |
| `app_service_id` | - | - | Yes | Yes | Yes | - |
| `cache_path_prefix` | - | - | - | - | - | - |
| `cache_settings_json` | - | - | Yes | Yes | Yes | - |
| `created_at` | - | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - | - |
| `distribution_kind` | - | - | Yes | Yes | Yes | - |
| `edge_hostname` | - | - | - | - | - | - |
| `failure_message` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `hostnames` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `last_deployed_at` | - | - | - | - | - | - |
| `last_deployed_at_label` | - | - | - | - | - | - |
| `last_purged_at` | - | - | - | - | - | - |
| `last_purged_at_label` | - | - | - | - | - | - |
| `last_synced_at` | - | - | - | - | - | - |
| `last_synced_at_label` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `origin_url` | - | - | - | Yes | Yes | - |
| `provisioned` | - | - | - | - | - | - |
| `routing_settings_json` | - | - | Yes | Yes | Yes | - |
| `security_settings_json` | - | - | Yes | Yes | Yes | - |
| `slug` | - | - | - | Yes | Yes | - |
| `status` | - | - | Yes | Yes | Yes | - |
| `updated_at` | - | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppCdnEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppCdn().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "origin_url": "example_origin_url",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppCdnEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppCdn().list({"app_id": "example"})
for app_cdn in results:
    print(app_cdn.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppCdnEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppCdn().load({"id": "app_cdn_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppCdnEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppCdn().patch({
    "id": "app_cdn_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppCdnEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppCdn().remove({"id": "app_cdn_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppCdnEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppCdn().update({
    "id": "app_cdn_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppCdnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppConfigVariableEntity

```python
app_config_variable = client.AppConfigVariable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `description` | `str | None` | Yes |  |
| `exposed_to_build` | `bool` | Yes |  |
| `has_value` | `bool` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `key` | `str` | Yes |  |
| `scope_kind` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `value` | `str | None` | Yes |  |
| `value_kind` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | Yes | - | - | - |
| `app_service_id` | - | - | Yes | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `description` | - | - | Yes | - | - | - |
| `exposed_to_build` | - | - | - | - | - | - |
| `has_value` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `key` | - | - | - | - | - | - |
| `scope_kind` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `value` | - | - | Yes | - | - | - |
| `value_kind` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppConfigVariableEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppConfigVariable().create({
    "app_id": "example_app_id",  # str
    "exposed_to_build": True,  # bool
    "key": "example_key",  # str
    "scope_kind": "example_scope_kind",  # str
    "value_kind": "example_value_kind",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppConfigVariableEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppConfigVariable().list({"app_id": "example"})
for app_config_variable in results:
    print(app_config_variable.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppConfigVariableEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppConfigVariable().load({"id": "app_config_variable_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppConfigVariableEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppConfigVariable().patch({
    "id": "app_config_variable_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppConfigVariableEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppConfigVariable().remove({"id": "app_config_variable_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppConfigVariableEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppConfigVariable().update({
    "id": "app_config_variable_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppConfigVariableEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppDataResourceEntity

```python
app_data_resource = client.AppDataResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `engine` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `plan` | `str | None` | Yes |  |
| `provider_metadata` | `dict` | Yes |  |
| `region` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `storage_gb` | `int | None` | Yes |  |
| `storage_label` | `str | None` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | Yes | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `engine` | - | - | - | - | - | - |
| `failure_message` | - | - | - | - | - | - |
| `high_availability` | - | - | Yes | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `kind` | - | - | - | - | - | - |
| `name` | - | - | - | - | - | - |
| `plan` | - | - | Yes | - | - | - |
| `provider_metadata` | - | - | - | - | - | - |
| `region` | - | - | Yes | - | - | - |
| `slug` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `storage_gb` | - | - | Yes | - | - | - |
| `storage_label` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `version` | - | - | Yes | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppDataResourceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppDataResource().create({
    "app_id": "example_app_id",  # str
    "engine": "example_engine",  # str
    "kind": "example_kind",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppDataResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppDataResource().list({"app_id": "example"})
for app_data_resource in results:
    print(app_data_resource.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppDataResourceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppDataResource().load({"id": "app_data_resource_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppDataResourceEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppDataResource().patch({
    "id": "app_data_resource_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppDataResourceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppDataResource().remove({"id": "app_data_resource_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppDataResourceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppDataResource().update({
    "id": "app_data_resource_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDataResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppDeployEntity

```python
app_deploy = client.AppDeploy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str` | No |  |
| `app_service_id` | `str` | No |  |
| `channel` | `str` | No |  |
| `command` | `str` | No |  |
| `commit_sha` | `str` | No |  |
| `desired_instances` | `int` | No |  |
| `environment` | `str` | No | Environment slug or public ID, all, or existing. |
| `image` | `str` | Yes |  |
| `region` | `str` | No |  |
| `rollout_predecessor` | `str` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `str` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AppDeployEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppDeploy().create({
    "app_id": "example_app_id",  # str
    "image": "example_image",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeployEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppDeploymentEntity

```python
app_deployment = client.AppDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str` | Yes |  |
| `app_service_id` | `str` | Yes |  |
| `app_service_placement_id` | `str` | No |  |
| `artifact_locator` | `str | None` | Yes |  |
| `build_role` | `str | None` | Yes |  |
| `commit_sha` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `creator_user_id` | `str | None` | Yes |  |
| `deployed_url` | `str | None` | Yes |  |
| `display_id` | `int` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `finished_at` | `str | None` | Yes |  |
| `finished_at_label` | `str | None` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str | None` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `location` | `Any` | Yes |  |
| `location_id` | `str` | Yes |  |
| `number` | `int` | Yes |  |
| `operation_key` | `str | None` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `rollback_reason` | `str | None` | Yes |  |
| `rollback_source_deployment_id` | `str | None` | Yes |  |
| `rollback_source_release_id` | `str | None` | Yes |  |
| `rollback_target_release_id` | `str | None` | Yes |  |
| `source_ref` | `str | None` | Yes |  |
| `started_at` | `str | None` | Yes |  |
| `started_at_label` | `str | None` | Yes |  |
| `status` | `str` | Yes |  |
| `trigger_kind` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | Yes | - | - | - |
| `app_service_id` | - | - | Yes | - | - | - |
| `app_service_placement_id` | - | - | - | - | - | - |
| `artifact_locator` | - | - | Yes | - | - | - |
| `build_role` | - | - | - | - | - | - |
| `commit_sha` | - | - | Yes | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - | - |
| `creator_user_id` | - | - | - | - | - | - |
| `deployed_url` | - | - | Yes | - | - | - |
| `display_id` | - | - | - | - | - | - |
| `failure_message` | - | - | Yes | - | - | - |
| `finished_at` | - | - | Yes | - | - | - |
| `finished_at_label` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `idempotency_key` | - | - | - | - | - | - |
| `is_rollback` | - | - | - | - | - | - |
| `location` | - | - | - | - | - | - |
| `location_id` | - | - | Yes | - | - | - |
| `number` | - | - | - | - | - | - |
| `operation_key` | - | - | - | - | - | - |
| `organization_id` | - | - | - | - | - | - |
| `rollback_reason` | - | - | - | - | - | - |
| `rollback_source_deployment_id` | - | - | - | - | - | - |
| `rollback_source_release_id` | - | - | - | - | - | - |
| `rollback_target_release_id` | - | - | - | - | - | - |
| `source_ref` | - | - | Yes | - | - | - |
| `started_at` | - | - | Yes | - | - | - |
| `started_at_label` | - | - | - | - | - | - |
| `status` | - | - | Yes | - | - | - |
| `trigger_kind` | - | - | Yes | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppDeploymentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppDeployment().create({
    "app_id": "example_app_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppDeploymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppDeployment().list({"app_id": "example"})
for app_deployment in results:
    print(app_deployment.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppDeploymentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppDeployment().load({"id": "app_deployment_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppDeploymentEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppDeployment().patch({
    "id": "app_deployment_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppDeploymentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppDeployment().remove({"id": "app_deployment_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppDeploymentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppDeployment().update({
    "id": "app_deployment_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppDeploymentOperationEntity

```python
app_deployment_operation = client.AppDeploymentOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `dict` | Yes |  |
| `app_environment_id` | `str` | No |  |
| `app_service_id` | `str` | No |  |
| `app_service_placement_id` | `str` | No |  |
| `artifact_locator` | `str | None` | Yes |  |
| `build_duration_seconds` | `int | None` | Yes |  |
| `build_source` | `dict | None` | Yes |  |
| `build_status` | `str` | Yes |  |
| `children` | `list` | Yes |  |
| `ci_pipeline_id` | `str | None` | Yes |  |
| `ci_pipeline_run_id` | `str | None` | Yes |  |
| `commit_sha` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `creator` | `dict | None` | Yes |  |
| `deployed_url` | `str | None` | Yes |  |
| `duration_seconds` | `int | None` | Yes |  |
| `environment` | `dict` | Yes |  |
| `failure_message` | `str` | No |  |
| `finished_at` | `str` | No |  |
| `history_kind` | `str` | Yes |  |
| `history_reason` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `is_live` | `bool` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `live_region_count` | `int` | Yes |  |
| `location_id` | `str` | No |  |
| `number` | `int` | Yes |  |
| `placement` | `dict | None` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollback_reason` | `str | None` | Yes |  |
| `rollback_source_release_id` | `str | None` | Yes |  |
| `rollback_target_release_id` | `str | None` | Yes |  |
| `rollout_predecessor_id` | `str | None` | Yes |  |
| `rollout_status` | `str` | Yes |  |
| `rollout_strategy` | `str` | Yes |  |
| `service` | `dict` | Yes |  |
| `source_ref` | `str | None` | Yes |  |
| `started_at` | `str` | No |  |
| `status` | `str` | Yes |  |
| `total_replicas` | `int` | Yes |  |
| `trigger_kind` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `app` | - | - | - |
| `app_environment_id` | - | - | - |
| `app_service_id` | - | - | - |
| `app_service_placement_id` | - | - | - |
| `artifact_locator` | - | - | Yes |
| `build_duration_seconds` | - | - | - |
| `build_source` | - | - | - |
| `build_status` | - | - | - |
| `children` | - | - | - |
| `ci_pipeline_id` | - | - | - |
| `ci_pipeline_run_id` | - | - | - |
| `commit_sha` | - | - | Yes |
| `created_at` | - | - | - |
| `creator` | - | - | - |
| `deployed_url` | - | - | Yes |
| `duration_seconds` | - | - | - |
| `environment` | - | - | - |
| `failure_message` | - | - | - |
| `finished_at` | - | - | - |
| `history_kind` | - | - | - |
| `history_reason` | - | - | - |
| `id` | - | - | - |
| `is_live` | - | - | - |
| `is_rollback` | - | - | - |
| `live_region_count` | - | - | - |
| `location_id` | - | - | - |
| `number` | - | - | - |
| `placement` | - | - | - |
| `region_count` | - | - | - |
| `replicas_per_region` | - | - | - |
| `rollback_reason` | - | - | - |
| `rollback_source_release_id` | - | - | - |
| `rollback_target_release_id` | - | - | - |
| `rollout_predecessor_id` | - | - | - |
| `rollout_status` | - | - | - |
| `rollout_strategy` | - | - | - |
| `service` | - | - | - |
| `source_ref` | - | - | Yes |
| `started_at` | - | - | - |
| `status` | - | - | Yes |
| `total_replicas` | - | - | - |
| `trigger_kind` | - | - | Yes |
| `updated_at` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppDeploymentOperationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppDeploymentOperation().create({
    "app_id": "example_app_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppDeploymentOperationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppDeploymentOperation().list({"app_id": "example"})
for app_deployment_operation in results:
    print(app_deployment_operation.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppDeploymentOperationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppDeploymentOperation().load({"id": "app_deployment_operation_id", "app_id": "app_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentOperationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppDeploymentRollbackEntity

```python
app_deployment_rollback = client.AppDeploymentRollback()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str` | No |  |
| `app_id` | `str` | Yes |  |
| `app_service_id` | `str` | No |  |
| `blockers` | `list` | Yes |  |
| `candidate_releases` | `list` | Yes |  |
| `confirmation_text` | `str` | Yes |  |
| `current_deployment` | `Any` | Yes |  |
| `current_release` | `Any` | Yes |  |
| `deployment` | `Any` | Yes |  |
| `desired_state` | `Any` | Yes |  |
| `environment` | `Any` | Yes |  |
| `execution_allowed` | `bool` | Yes |  |
| `force` | `bool` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `idempotent_reuse` | `bool` | Yes |  |
| `location` | `Any` | Yes |  |
| `operation` | `Any` | Yes |  |
| `reason` | `str | None` | Yes |  |
| `rollback_release` | `Any` | Yes |  |
| `rollout` | `Any` | Yes |  |
| `service` | `Any` | Yes |  |
| `target_artifact_locator` | `str | None` | Yes |  |
| `target_release` | `Any` | Yes |  |
| `to` | `str` | No |  |
| `warnings` | `list` | Yes |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `app_environment_id` | - |
| `app_id` | - |
| `app_service_id` | - |
| `blockers` | - |
| `candidate_releases` | - |
| `confirmation_text` | - |
| `current_deployment` | - |
| `current_release` | - |
| `deployment` | Yes |
| `desired_state` | - |
| `environment` | Yes |
| `execution_allowed` | - |
| `force` | Yes |
| `idempotency_key` | - |
| `idempotent_reuse` | - |
| `location` | - |
| `operation` | - |
| `reason` | Yes |
| `rollback_release` | - |
| `rollout` | - |
| `service` | Yes |
| `target_artifact_locator` | - |
| `target_release` | - |
| `to` | - |
| `warnings` | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppDeploymentRollbackEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppDeploymentRollback().create({
    "app_id": "example_app_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentRollbackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppEnvironmentEntity

```python
app_environment = client.AppEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `base_domain` | `str | None` | Yes |  |
| `branch_pattern` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `location` | `Any` | Yes |  |
| `location_id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `auto_deploy` | - | - | - | Yes | Yes | - |
| `base_domain` | - | - | Yes | Yes | Yes | - |
| `branch_pattern` | - | - | Yes | Yes | Yes | - |
| `created_at` | - | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `kind` | - | - | - | Yes | Yes | - |
| `location` | - | - | - | - | - | - |
| `location_id` | - | - | - | Yes | Yes | - |
| `name` | - | - | - | Yes | Yes | - |
| `slug` | - | - | - | Yes | Yes | - |
| `status` | - | - | - | Yes | Yes | - |
| `updated_at` | - | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppEnvironmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppEnvironment().create({
    "app_id": "example_app_id",  # str
    "auto_deploy": True,  # bool
    "kind": "example_kind",  # str
    "location_id": "example_location_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "status": "example_status",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppEnvironmentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppEnvironment().list({"app_id": "example"})
for app_environment in results:
    print(app_environment.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppEnvironmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppEnvironment().load({"id": "app_environment_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppEnvironmentEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppEnvironment().patch({
    "id": "app_environment_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppEnvironmentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppEnvironment().remove({"id": "app_environment_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppEnvironmentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppEnvironment().update({
    "id": "app_environment_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEnvironmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppLocationEntity

```python
app_location = client.AppLocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `location_id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `nomad_datacenter` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AppLocationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppLocation().create({
    "app_id": "example_app_id",  # str
    "location_id": "example_location_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppLocationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppLocation().list({"app_id": "example"})
for app_location in results:
    print(app_location.data_get())
```

#### `remove(reqmatch, ctrl=None) -> AppLocationEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppLocation().remove({"id": "app_location_id", "app_id": "app_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppLocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppMetricEntity

```python
app_metric = client.AppMetric()
```

### Operations

#### `load(reqmatch, ctrl=None) -> AppMetricEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppMetricEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppPreviewEntity

```python
app_preview = client.AppPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `str` | No |  |
| `app_preview_profile_id` | `str` | Yes |  |
| `change_number` | `str` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `int` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `int` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `str` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | Yes |  |
| `resource_overrides` | `dict` | No | Service public IDs mapped to resource overrides. |
| `retained` | `bool` | No |  |
| `shared_data_binding_ids` | `list` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `list` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `str` | Yes |  |
| `source_ref` | `str` | No |  |
| `storage_binding_resources` | `dict` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Operations

#### `create(reqdata, ctrl=None) -> AppPreviewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppPreview().create({
    "app_id": "example_app_id",  # str
    "app_preview_profile_id": "example_app_preview_profile_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppPreviewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppPreview().list({"app_id": "example"})
for app_preview in results:
    print(app_preview.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppPreviewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppPreview().load({"id": "app_preview_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppPreviewEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppPreview().patch({
    "id": "app_preview_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppPreviewEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppPreview().remove({"id": "app_preview_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppPreviewEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppPreview().update({
    "id": "app_preview_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppPreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppPreviewProfileEntity

```python
app_preview_profile = client.AppPreviewProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `bool` | No |  |
| `configuration` | `dict` | No |  |
| `created_at` | `str` | No |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `source_environment_id` | `str` | Yes |  |
| `ttl_days` | `int` | No |  |
| `updated_at` | `str` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `automatic` | - | - | - | - | - | - |
| `configuration` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `name` | - | - | - | - | Yes | - |
| `slug` | - | - | - | - | Yes | - |
| `source_environment_id` | - | - | - | - | Yes | - |
| `ttl_days` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppPreviewProfileEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppPreviewProfile().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "source_environment_id": "example_source_environment_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppPreviewProfileEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppPreviewProfile().list({"app_id": "example"})
for app_preview_profile in results:
    print(app_preview_profile.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppPreviewProfileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppPreviewProfile().load({"id": "app_preview_profile_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppPreviewProfileEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppPreviewProfile().patch({
    "id": "app_preview_profile_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppPreviewProfileEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppPreviewProfile().remove({"id": "app_preview_profile_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppPreviewProfileEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppPreviewProfile().update({
    "id": "app_preview_profile_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppPreviewProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppRunEntity

```python
app_run = client.AppRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `image` | `str` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Operations

#### `create(reqdata, ctrl=None) -> AppRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppRun().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppRunEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppRun().list()
for app_run in results:
    print(app_run.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppRun().load({"id": "app_run_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppSecretEntity

```python
app_secret = client.AppSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `description` | `str | None` | No |  |
| `env_key` | `str | None` | No |  |
| `expose_to_build` | `bool` | No |  |
| `has_value` | `bool` | No |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `latest_version_number` | `int | None` | No |  |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `rotation_policy` | `str | None` | No |  |
| `scope_kind` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `value` | `str` | No |  |
| `value_digest` | `str | None` | No |  |
| `value_kind` | `str | None` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - | - |
| `description` | - | - | - | - | - | - |
| `env_key` | - | - | - | - | - | - |
| `expose_to_build` | - | - | - | - | - | - |
| `has_value` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `latest_version_number` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `organization_id` | - | - | - | - | - | - |
| `rotation_policy` | - | - | - | - | - | - |
| `scope_kind` | - | - | - | - | - | - |
| `slug` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `value` | - | - | - | - | - | - |
| `value_digest` | - | - | - | - | - | - |
| `value_kind` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppSecretEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppSecret().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppSecretEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppSecret().list({"app_id": "example"})
for app_secret in results:
    print(app_secret.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppSecretEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppSecret().load({"id": "app_secret_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppSecretEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppSecret().patch({
    "id": "app_secret_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppSecretEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppSecret().remove({"id": "app_secret_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppSecretEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppSecret().update({
    "id": "app_secret_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppSecretEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppServiceEntity

```python
app_service = client.AppService()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `bindings` | `list` | Yes |  |
| `build_command` | `str | None` | Yes |  |
| `cpu_label` | `str | None` | Yes |  |
| `cpu_mhz` | `int | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `deploy_paths` | `list` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` | Yes |  |
| `disk_label` | `str | None` | Yes |  |
| `disk_mb` | `int | None` | Yes |  |
| `effective_deploy_paths` | `list` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `str | None` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `internal_port` | `int | None` | Yes |  |
| `kind` | `str` | Yes |  |
| `memory_label` | `str | None` | Yes |  |
| `memory_max_label` | `str | None` | Yes |  |
| `memory_max_mb` | `int | None` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `int | None` | Yes |  |
| `name` | `str` | Yes |  |
| `nomad_constraints_json` | `str | None` | Yes |  |
| `nomad_kill_timeout_seconds` | `int | None` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `str | None` | Yes |  |
| `nomad_region` | `str | None` | Yes |  |
| `nomad_shutdown_delay_seconds` | `int | None` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `str | None` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `str | None` | Yes |  |
| `prestart_command` | `str | None` | Yes |  |
| `publicly_accessible` | `bool` | Yes |  |
| `release_command` | `str | None` | Yes |  |
| `repo_source_path` | `str` | Yes |  |
| `runtime` | `str` | Yes |  |
| `runtime_adapter_kind` | `str` | Yes |  |
| `runtime_adapter_settings_json` | `str | None` | Yes |  |
| `schedule` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `source_path` | `str` | Yes |  |
| `start_command` | `str | None` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `auto_deploy` | - | - | - | Yes | Yes | - |
| `bindings` | - | - | - | - | - | - |
| `build_command` | - | - | Yes | Yes | Yes | - |
| `cpu_label` | - | - | - | - | - | - |
| `cpu_mhz` | - | - | Yes | Yes | Yes | - |
| `created_at` | - | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - | - |
| `deploy_paths` | - | - | Yes | Yes | Yes | - |
| `desired_instances` | - | - | - | Yes | Yes | - |
| `disk_label` | - | - | - | - | - | - |
| `disk_mb` | - | - | Yes | Yes | Yes | - |
| `effective_deploy_paths` | - | - | - | - | - | - |
| `healthcheck_path` | - | - | Yes | Yes | Yes | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `internal_port` | - | - | Yes | Yes | Yes | - |
| `kind` | - | - | - | Yes | Yes | - |
| `memory_label` | - | - | - | - | - | - |
| `memory_max_label` | - | - | - | - | - | - |
| `memory_max_mb` | - | - | Yes | Yes | Yes | - |
| `memory_mb` | - | - | Yes | Yes | Yes | - |
| `name` | - | - | - | Yes | Yes | - |
| `nomad_constraints_json` | - | - | Yes | Yes | Yes | - |
| `nomad_kill_timeout_seconds` | - | - | Yes | Yes | Yes | - |
| `nomad_namespace` | - | - | Yes | Yes | Yes | - |
| `nomad_region` | - | - | Yes | Yes | Yes | - |
| `nomad_shutdown_delay_seconds` | - | - | Yes | Yes | Yes | - |
| `nomad_ulimits_json` | - | - | Yes | Yes | Yes | - |
| `nomad_update_strategy_json` | - | - | Yes | Yes | Yes | - |
| `prestart_command` | - | - | Yes | Yes | Yes | - |
| `publicly_accessible` | - | - | - | Yes | Yes | - |
| `release_command` | - | - | Yes | Yes | Yes | - |
| `repo_source_path` | - | - | - | - | - | - |
| `runtime` | - | - | - | Yes | Yes | - |
| `runtime_adapter_kind` | - | - | - | Yes | Yes | - |
| `runtime_adapter_settings_json` | - | - | Yes | Yes | Yes | - |
| `schedule` | - | - | Yes | Yes | Yes | - |
| `slug` | - | - | - | Yes | Yes | - |
| `source_path` | - | - | - | Yes | Yes | - |
| `start_command` | - | - | - | Yes | Yes | - |
| `updated_at` | - | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppServiceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppService().create({
    "app_id": "example_app_id",  # str
    "auto_deploy": True,  # bool
    "desired_instances": 1,  # int
    "kind": "example_kind",  # str
    "name": "example_name",  # str
    "publicly_accessible": True,  # bool
    "runtime": "example_runtime",  # str
    "runtime_adapter_kind": "example_runtime_adapter_kind",  # str
    "slug": "example_slug",  # str
    "source_path": "example_source_path",  # str
    "start_command": "example_start_command",  # str | None
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppServiceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppService().list({"app_id": "example"})
for app_service in results:
    print(app_service.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppServiceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppService().load({"id": "app_service_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppServiceEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppService().patch({
    "id": "app_service_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppServiceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppService().remove({"id": "app_service_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppServiceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppService().update({
    "id": "app_service_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServiceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppServiceBindingEntity

```python
app_service_binding = client.AppServiceBinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> AppServiceBindingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppServiceBinding().create({
    "app_id": "example_app_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppServiceBindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppServiceBinding().list({"app_id": "example"})
for app_service_binding in results:
    print(app_service_binding.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppServiceBindingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppServiceBinding().load({"id": "app_service_binding_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppServiceBindingEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppServiceBinding().patch({
    "id": "app_service_binding_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppServiceBindingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppServiceBinding().remove({"id": "app_service_binding_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppServiceBindingEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppServiceBinding().update({
    "id": "app_service_binding_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServiceBindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppServicePlacementEntity

```python
app_service_placement = client.AppServicePlacement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str` | Yes |  |
| `app_service_id` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `deployment_channel` | `str | None` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `mode` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollout_strategy` | `str` | Yes |  |
| `targets` | `list` | Yes |  |
| `total_replicas` | `int` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AppServicePlacementEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppServicePlacement().list({"app_id": "example"})
for app_service_placement in results:
    print(app_service_placement.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppServicePlacementEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppServicePlacement().load({"id": "app_service_placement_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppServicePlacementEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServicePlacementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppStorageResourceEntity

```python
app_storage_resource = client.AppStorageResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `str` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `str | None` | Yes |  |
| `attachment` | `dict | None` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `int | None` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `ephemeral` | `bool` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `str | None` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `location_code` | `str | None` | Yes |  |
| `location_id` | `str | None` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `str | None` | Yes |  |
| `name` | `str` | Yes |  |
| `provider` | `str` | Yes | Storage backend. |
| `provider_error` | `str | None` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `access_mode` | - | - | - | - | - | - |
| `app_environment_id` | - | - | Yes | - | - | - |
| `attachment` | - | - | - | - | - | - |
| `capacity_gb` | - | - | Yes | - | - | - |
| `capacity_label` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `ephemeral` | - | - | - | - | - | - |
| `external_volume_id` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `kind` | - | - | - | - | - | - |
| `location_code` | - | - | - | - | - | - |
| `location_id` | - | - | Yes | - | - | - |
| `mount_path` | - | - | Yes | - | - | - |
| `name` | - | - | - | - | - | - |
| `provider` | - | - | - | - | - | - |
| `provider_error` | - | - | - | - | - | - |
| `region` | - | - | Yes | - | - | - |
| `slug` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> AppStorageResourceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AppStorageResource().create({
    "app_id": "example_app_id",  # str
    "access_mode": "example_access_mode",  # str
    "kind": "example_kind",  # str
    "name": "example_name",  # str
    "provider": "example_provider",  # str
    "slug": "example_slug",  # str
    "status": "example_status",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AppStorageResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AppStorageResource().list({"app_id": "example"})
for app_storage_resource in results:
    print(app_storage_resource.data_get())
```

#### `load(reqmatch, ctrl=None) -> AppStorageResourceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AppStorageResource().load({"id": "app_storage_resource_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> AppStorageResourceEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.AppStorageResource().patch({
    "id": "app_storage_resource_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> AppStorageResourceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AppStorageResource().remove({"id": "app_storage_resource_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> AppStorageResourceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AppStorageResource().update({
    "id": "app_storage_resource_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppStorageResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AttachmentPartEntity

```python
attachment_part = client.AttachmentPart()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> AttachmentPartEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AttachmentPart().update({
    "agent_id": "agent_id",
    "attachment_id": "attachment_id",
    "id": "id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AttachmentPartEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AutomationEventEntity

```python
automation_event = client.AutomationEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `event_subscriptions` | `list` | Yes |  |
| `event_triggers` | `list` | Yes |  |
| `expected_revision` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `key` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `Any` | Yes |  |
| `schedules` | `list` | Yes |  |
| `settings` | `dict` | No |  |
| `subscription_key` | `str` | Yes |  |
| `version` | `dict` | Yes |  |

### Operations

#### `update(reqdata, ctrl=None) -> AutomationEventEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AutomationEvent().update({
    "agent_id": "agent_id",
    "automation_id": "automation_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AutomationEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AutomationRunEntity

```python
automation_run = client.AutomationRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `automation` | `dict | None` | Yes | Saved native automation identity. |
| `budget_seconds` | `int | None` | Yes | The run stops once it has been running this long |
| `budget_usd` | `float | None` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `dict | None` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `str | None` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `dict` | Yes |  |
| `error` | `str | None` | Yes |  |
| `finished_at` | `str | None` | Yes |  |
| `flow_steps` | `list | None` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `str` | Yes |  |
| `input` | `dict` | Yes |  |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `str | None` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `str | None` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `str` | Yes |  |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `str | None` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `str` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `str` | Yes |  |
| `started_by` | `dict | None` | Yes | The event that started the run |
| `status` | `str` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `list` | Yes |  |
| `trigger_id` | `str | None` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `str` | Yes |  |
| `wake_at` | `str | None` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `str | None` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AutomationRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AutomationRun().create({
    "agent_id": "example_agent_id",  # str
    "automation_id": "example_automation_id",  # str
    "organization_id": "example_organization_id",  # str
    "input": {},  # dict
    "request_id": "example_request_id",  # str
    "version_id": "example_version_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AutomationRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BinaryEntity

```python
binary = client.Binary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `bool` | Yes |  |
| `arch` | `Any` | No |  |
| `archived_at` | `str | None` | Yes |  |
| `binary` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `download_secret` | `str` | No |  |
| `download_url` | `str` | Yes |  |
| `executable` | `str` | Yes |  |
| `format` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | Yes |  |
| `latest_version` | `Any` | Yes |  |
| `launch_args` | `list` | No |  |
| `name` | `str` | Yes |  |
| `needs_refresh` | `bool` | Yes |  |
| `operation` | `dict` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `platform` | `Any` | No |  |
| `project_id` | `str` | Yes |  |
| `sha256` | `str` | No |  |
| `slug` | `str` | Yes |  |
| `version` | `dict` | Yes |  |
| `version_defaults` | `Any` | No |  |
| `versions` | `list` | Yes |  |
| `window_title` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> BinaryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Binary().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "download_url": "example_download_url",  # str
    "executable": "example_executable",  # str
    "format": "example_format",  # Any
    "idempotency_key": "example_idempotency_key",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "window_title": "example_window_title",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BinaryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Binary().list({"organization_id": "example", "project_id": "example"})
for binary in results:
    print(binary.data_get())
```

#### `load(reqmatch, ctrl=None) -> BinaryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Binary().load({"id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BinaryVersionEntity

```python
binary_version = client.BinaryVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `Any` | No |  |
| `cancelable` | `bool` | Yes |  |
| `configuration` | `dict` | Yes |  |
| `configuration_digest` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `deletable` | `bool` | Yes |  |
| `download_secret` | `str` | No |  |
| `download_url` | `str` | Yes |  |
| `environment_uses` | `list` | Yes |  |
| `executable` | `str` | No |  |
| `format` | `Any` | No |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | Yes |  |
| `launch_args` | `list` | No |  |
| `operation` | `dict` | Yes |  |
| `package_sha256` | `str | None` | Yes |  |
| `package_size` | `int | None` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `platform` | `Any` | No |  |
| `preparations` | `list` | Yes |  |
| `retryable` | `bool` | Yes |  |
| `sha256` | `str` | No |  |
| `status` | `str` | Yes |  |
| `version` | `dict` | Yes |  |
| `window_title` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> BinaryVersionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BinaryVersion().create({
    "binary_id": "example_binary_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "download_url": "example_download_url",  # str
    "idempotency_key": "example_idempotency_key",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BinaryVersionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BinaryVersion().list({"binary_id": "example", "organization_id": "example", "project_id": "example"})
for binary_version in results:
    print(binary_version.data_get())
```

#### `load(reqmatch, ctrl=None) -> BinaryVersionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BinaryVersion().load({"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> BinaryVersionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.BinaryVersion().remove({"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinaryVersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserEgressCandidateEntity

```python
browser_egress_candidate = client.BrowserEgressCandidate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BrowserEgressCandidateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BrowserEgressCandidate().list({"organization_id": "example"})
for browser_egress_candidate in results:
    print(browser_egress_candidate.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserEgressCandidateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionEntity

```python
browser_session = client.BrowserSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `str | None` | No |  |
| `authentication_status` | `str` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `str | None` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `str | None` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `str | None` | No |  |
| `closure_basis` | `str | None` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` | Yes |  |
| `controller` | `str` | Yes |  |
| `credential_id` | `str | None` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `str` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `str | None` | No |  |
| `expires_at` | `str` | Yes |  |
| `failure_code` | `str | None` | No |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `initial_url` | `str` | Yes |  |
| `max_seconds` | `int` | No |  |
| `pending_control_id` | `str | None` | No |  |
| `project_id` | `str | None` | No | Optional project slug or public ID. |
| `reconciled_at` | `str | None` | No |  |
| `started_at` | `str | None` | No |  |
| `status` | `str` | Yes |  |
| `url` | `str` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `dict | None` | No |  |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `active_task_id` | - | - | - |
| `authentication_status` | - | - | - |
| `authentication_task_id` | - | - | - |
| `cdp_url` | - | - | - |
| `closed_at` | - | - | - |
| `closure_basis` | - | - | - |
| `control_generation` | - | - | - |
| `controller` | - | Yes | - |
| `credential_id` | - | - | - |
| `environment_id` | - | - | - |
| `environment_revision_id` | - | - | - |
| `expires_at` | - | - | - |
| `failure_code` | - | - | - |
| `id` | - | - | - |
| `idempotency_key` | - | - | - |
| `initial_url` | - | - | - |
| `max_seconds` | - | - | - |
| `pending_control_id` | - | - | - |
| `project_id` | - | - | - |
| `reconciled_at` | - | - | - |
| `started_at` | - | - | - |
| `status` | - | - | - |
| `url` | - | - | - |
| `viewer` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> BrowserSessionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BrowserSession().create({
    "organization_id": "example_organization_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> BrowserSessionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BrowserSession().load({"id": "browser_session_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> BrowserSessionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.BrowserSession().remove({"id": "browser_session_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionConnectionEntity

```python
browser_session_connection = client.BrowserSessionConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `int` | Yes |  |
| `idempotency_key` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> BrowserSessionConnectionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BrowserSessionConnection().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
    "generation": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionControlEntity

```python
browser_session_control = client.BrowserSessionControl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `str` | Yes |  |
| `completed_at` | `str | None` | No |  |
| `completed_generation` | `int | None` | No |  |
| `connection` | `dict | None` | No |  |
| `failure_code` | `str | None` | No |  |
| `id` | `str` | Yes |  |
| `requested_controller` | `str` | Yes |  |
| `requested_generation` | `int` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> BrowserSessionControlEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BrowserSessionControl().load({"id": "browser_session_control_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionControlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionEventEntity

```python
browser_session_event = client.BrowserSessionEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `str | None` | No |  |
| `created_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `payload` | `dict` | Yes |  |
| `source_sequence` | `int | None` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BrowserSessionEventEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BrowserSessionEvent().list({"browser_session_id": "example", "organization_id": "example"})
for browser_session_event in results:
    print(browser_session_event.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionMediaEntity

```python
browser_session_media = client.BrowserSessionMedia()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `str` | Yes |  |
| `capture_omissions` | `dict | None` | No |  |
| `captured_at` | `str | None` | No |  |
| `ended_at` | `str | None` | No |  |
| `failure_code` | `str | None` | No |  |
| `files` | `list` | Yes |  |
| `frames` | `int | None` | No |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `partial` | `bool` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `str` | Yes |  |
| `source` | `dict | None` | No | Screenshot provenance. |
| `status` | `str` | Yes |  |
| `stop_requested_at` | `str | None` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> BrowserSessionMediaEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BrowserSessionMedia().load({"id": "browser_session_media_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionMediaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionRecordingEntity

```python
browser_session_recording = client.BrowserSessionRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `idempotency_key` | `str` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl=None) -> BrowserSessionRecordingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BrowserSessionRecording().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionRecordingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionScreenshotEntity

```python
browser_session_screenshot = client.BrowserSessionScreenshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `str` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl=None) -> BrowserSessionScreenshotEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BrowserSessionScreenshot().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionScreenshotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrowserSessionTaskEntity

```python
browser_session_task = client.BrowserSessionTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `dict | None` | No |  |
| `browser_session_id` | `str` | Yes |  |
| `cancel_requested_at` | `str | None` | No |  |
| `completed_at` | `str | None` | No |  |
| `control_generation` | `int | None` | No |  |
| `deadline_at` | `str` | Yes |  |
| `effects_unknown` | `bool` | Yes |  |
| `failure_code` | `str | None` | No |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `instruction` | `str` | Yes |  |
| `max_rounds` | `int` | Yes |  |
| `max_seconds` | `int` | No |  |
| `model_selection` | `dict` | Yes |  |
| `outcome` | `str | None` | No |  |
| `result` | `dict` | Yes |  |
| `started_at` | `str | None` | No |  |
| `status` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `activity` | - | - |
| `browser_session_id` | - | - |
| `cancel_requested_at` | - | - |
| `completed_at` | - | - |
| `control_generation` | - | - |
| `deadline_at` | - | - |
| `effects_unknown` | - | - |
| `failure_code` | - | - |
| `id` | - | - |
| `idempotency_key` | - | - |
| `instruction` | - | - |
| `max_rounds` | - | Yes |
| `max_seconds` | - | - |
| `model_selection` | - | - |
| `outcome` | - | - |
| `result` | - | - |
| `started_at` | - | - |
| `status` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> BrowserSessionTaskEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BrowserSessionTask().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
    "instruction": "example_instruction",  # str
})
```

#### `load(reqmatch, ctrl=None) -> BrowserSessionTaskEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BrowserSessionTask().load({"id": "browser_session_task_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionTaskEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CatalogSelectorEntity

```python
catalog_selector = client.CatalogSelector()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CatalogSelectorEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CatalogSelector().list({"app_id": "example"})
for catalog_selector in results:
    print(catalog_selector.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatalogSelectorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CdnDeploymentEntity

```python
cdn_deployment = client.CdnDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> CdnDeploymentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CdnDeployment().create({
    "app_id": "example_app_id",  # str
    "cdn_id": "example_cdn_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CdnDeploymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CdnDeployment().list({"app_id": "example", "cdn_id": "example"})
for cdn_deployment in results:
    print(cdn_deployment.data_get())
```

#### `load(reqmatch, ctrl=None) -> CdnDeploymentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CdnDeployment().load({"id": "cdn_deployment_id", "app_id": "app_id", "cdn_id": "cdn_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnDeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CdnHostnameEntity

```python
cdn_hostname = client.CdnHostname()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dns_status` | `str` | Yes |  |
| `force_ssl` | `bool` | Yes |  |
| `hostname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `provider_hostname_id` | `str | None` | Yes |  |
| `tls_status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_cdn_distribution_id` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `dns_status` | - | - | Yes | - | - | - |
| `force_ssl` | - | - | Yes | - | - | - |
| `hostname` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `provider_hostname_id` | - | - | - | - | - | - |
| `tls_status` | - | - | Yes | - | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> CdnHostnameEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CdnHostname().create({
    "app_id": "example_app_id",  # str
    "cdn_id": "example_cdn_id",  # str
    "hostname": "example_hostname",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CdnHostnameEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CdnHostname().list({"app_id": "example", "cdn_id": "example"})
for cdn_hostname in results:
    print(cdn_hostname.data_get())
```

#### `load(reqmatch, ctrl=None) -> CdnHostnameEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CdnHostname().load({"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"})
```

#### `patch(reqdata, ctrl=None) -> CdnHostnameEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.CdnHostname().patch({
    "id": "cdn_hostname_id",
    "app_id": "app_id",
    "cdn_id": "cdn_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> CdnHostnameEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CdnHostname().remove({"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"})
```

#### `update(reqdata, ctrl=None) -> CdnHostnameEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CdnHostname().update({
    "id": "cdn_hostname_id",
    "app_id": "app_id",
    "cdn_id": "cdn_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnHostnameEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CdnSpaceEntity

```python
cdn_space = client.CdnSpace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> CdnSpaceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CdnSpace().create({
    "organization_id": "example_organization_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CdnSpaceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CdnSpace().list({"organization_id": "example"})
for cdn_space in results:
    print(cdn_space.data_get())
```

#### `load(reqmatch, ctrl=None) -> CdnSpaceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CdnSpace().load({"id": "cdn_space_id"})
```

#### `patch(reqdata, ctrl=None) -> CdnSpaceEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.CdnSpace().patch({
    "id": "cdn_space_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> CdnSpaceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CdnSpace().remove({"id": "cdn_space_id"})
```

#### `update(reqdata, ctrl=None) -> CdnSpaceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CdnSpace().update({
    "id": "cdn_space_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnSpaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CdnSpaceObjectEntity

```python
cdn_space_object = client.CdnSpaceObject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CdnSpaceObjectEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CdnSpaceObject().list({"cdn_space_id": "example"})
for cdn_space_object in results:
    print(cdn_space_object.data_get())
```

#### `load(reqmatch, ctrl=None) -> CdnSpaceObjectEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CdnSpaceObject().load({"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"})
```

#### `remove(reqmatch, ctrl=None) -> CdnSpaceObjectEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CdnSpaceObject().remove({"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"})
```

#### `update(reqdata, ctrl=None) -> CdnSpaceObjectEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CdnSpaceObject().update({
    "cdn_space_id": "cdn_space_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnSpaceObjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionRequestEntity

```python
connection_request = client.ConnectionRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `str` | Yes |  |
| `auth_scheme` | `str` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `error_code` | `str | None` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `remote_agent` | `str | None` | Yes |  |
| `retired_at` | `str | None` | Yes |  |
| `revoked_at` | `str | None` | Yes |  |
| `source_operation_id` | `str | None` | Yes |  |
| `state` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ConnectionRequestEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ConnectionRequest().load({"id": "connection_request_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionSourceEntity

```python
connection_source = client.ConnectionSource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `device_id` | `str` | Yes |  |
| `device_name` | `str` | Yes |  |
| `provider` | `str` | Yes |  |
| `source_operation_id` | `str` | Yes |  |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ConnectionSourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ConnectionSource().list({"agent_id": "example", "organization_id": "example"})
for connection_source in results:
    print(connection_source.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionSourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoordinationWaitEntity

```python
coordination_wait = client.CoordinationWait()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `bool` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `stop_state` | `str | None` | Yes |  |
| `wake_outcome` | `str | None` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CoordinationWaitEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CoordinationWait().list({"agent_id": "example", "coordination_id": "example", "organization_id": "example"})
for coordination_wait in results:
    print(coordination_wait.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoordinationWaitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CredentialSignInCheckEntity

```python
credential_sign_in_check = client.CredentialSignInCheck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes | The project environment (app) to sign in to |
| `environment_name` | `str` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl=None) -> CredentialSignInCheckEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CredentialSignInCheck().create({
    "credential_id": "example_credential_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "environment_id": "example_environment_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialSignInCheckEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DataResourceRotateCredentialEntity

```python
data_resource_rotate_credential = client.DataResourceRotateCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `engine` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `plan` | `str | None` | Yes |  |
| `provider_metadata` | `dict` | Yes |  |
| `region` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `storage_gb` | `int | None` | Yes |  |
| `storage_label` | `str | None` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DataResourceRotateCredentialEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DataResourceRotateCredential().create({
    "app_id": "example_app_id",  # str
    "data_resource_id": "example_data_resource_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataResourceRotateCredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeepScanEntity

```python
deep_scan = client.DeepScan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | No |  |
| `active` | `list` | Yes |  |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `explorations` | `list` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `launch_options` | `dict` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `dict` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `account_id` | - | - | - |
| `active` | - | - | - |
| `agent_filters` | - | - | - |
| `agents` | - | - | - |
| `can_continue` | - | - | - |
| `chat_messages` | - | - | - |
| `concurrency` | - | - | Yes |
| `covered_areas` | - | - | - |
| `created_at` | - | - | - |
| `deadline_at` | - | - | - |
| `demo_project` | - | - | - |
| `ended_early` | - | - | - |
| `environment_id` | - | - | - |
| `environment_name` | - | - | - |
| `explorations` | - | - | - |
| `explorer_activity` | - | - | - |
| `finding_count` | - | - | - |
| `findings` | - | - | - |
| `findings_fix_prompt` | - | - | - |
| `finished_at` | - | - | - |
| `goal` | - | - | - |
| `huntable_flows` | - | - | - |
| `id` | - | - | - |
| `idempotency_key` | - | - | - |
| `launch_options` | - | - | - |
| `max_seconds` | - | - | Yes |
| `max_testers` | - | - | Yes |
| `mode` | - | - | - |
| `next_scan_improvements` | - | - | - |
| `observed_at` | - | - | - |
| `onboarding` | - | - | - |
| `pagination` | - | - | - |
| `paywalled` | - | - | - |
| `permissions` | - | - | - |
| `priority_counts` | - | - | - |
| `project_id` | - | - | - |
| `related_explorations` | - | - | - |
| `report` | - | - | - |
| `reproduction_of` | - | - | - |
| `reproductions` | - | - | - |
| `saves_scenarios` | - | - | - |
| `scannable_flows` | - | - | - |
| `scenario_generation` | - | - | - |
| `sign_in_needs_answer` | - | - | - |
| `sign_in_outcome` | - | - | - |
| `sign_in_question` | - | - | - |
| `startup_retryable` | - | - | - |
| `status` | - | - | - |
| `time_limit_reached` | - | - | - |
| `title` | - | - | - |
| `unlock` | - | - | - |
| `web_url` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> DeepScanEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DeepScan().create({
    "organization_id": "example_organization_id",  # str
    "environment_id": "example_environment_id",  # str
    "goal": "example_goal",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DeepScanEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DeepScan().list({"organization_id": "example"})
for deep_scan in results:
    print(deep_scan.data_get())
```

#### `load(reqmatch, ctrl=None) -> DeepScanEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DeepScan().load({"id": "deep_scan_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeepScanFindingEntity

```python
deep_scan_finding = client.DeepScanFinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `int` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `list` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `list` | Yes |  |
| `findings_fix_prompt` | `str | None` | Yes |  |
| `free_findings_pending` | `bool` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `str` | Yes |  |
| `mode` | `str` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `priority` | `str | None` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | Yes |  |
| `reproduction_of` | `dict | None` | Yes |  |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `unlock` | `dict` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DeepScanFindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DeepScanFinding().list({"deep_scan_id": "example", "organization_id": "example"})
for deep_scan_finding in results:
    print(deep_scan_finding.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanFindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeepScanFlowEntity

```python
deep_scan_flow = client.DeepScanFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | No |  |
| `concurrency` | `int` | No |  |
| `environment_id` | `str` | No |  |
| `exploration_id` | `str` | No |  |
| `flow_names` | `list` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `max_seconds` | `int` | No |  |
| `max_testers` | `int` | No |  |
| `note` | `str | None` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> DeepScanFlowEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DeepScanFlow().create({
    "organization_id": "example_organization_id",  # str
    "flow_names": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanFlowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeepScanMappedFlowEntity

```python
deep_scan_mapped_flow = client.DeepScanMappedFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | Yes |  |
| `environment_id` | `str` | Yes |  |
| `flow_map` | `dict | None` | Yes |  |
| `revision_id` | `str | None` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DeepScanMappedFlowEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DeepScanMappedFlow().list({"organization_id": "example", "environment_id": "example"})
for deep_scan_mapped_flow in results:
    print(deep_scan_mapped_flow.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanMappedFlowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeepScanOptionEntity

```python
deep_scan_option = client.DeepScanOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `list` | Yes |  |
| `deep_scan_defaults` | `Any` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `dict | None` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `personas` | `list` | No |  |
| `preview` | `bool` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `str | None` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DeepScanOptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DeepScanOption().list({"organization_id": "example"})
for deep_scan_option in results:
    print(deep_scan_option.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DemoShareEntity

```python
demo_share = client.DemoShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `str` | Yes |  |
| `id` | `str` | No |  |
| `recording` | `dict` | Yes |  |
| `summary` | `str` | Yes | What the recorded browser confirmed. |

### Operations

#### `load(reqmatch, ctrl=None) -> DemoShareEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DemoShare().load({"id": "demo_share_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DemoShareEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DemoShareSegmentEntity

```python
demo_share_segment = client.DemoShareSegment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> DemoShareSegmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DemoShareSegment().load({"id": "demo_share_segment_id", "demo_share_id": "demo_share_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DemoShareSegmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeploymentDashboardNomadEntity

```python
deployment_dashboard_nomad = client.DeploymentDashboardNomad()
```

### Operations

#### `load(reqmatch, ctrl=None) -> DeploymentDashboardNomadEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentDashboardNomadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeploymentFileEntity

```python
deployment_file = client.DeploymentFile()
```

### Operations

#### `update(reqdata, ctrl=None) -> DeploymentFileEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DeploymentFile().update({
    "deployment_id": "deployment_id",
    "static_site_id": "static_site_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentFileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainPathRuleEntity

```python
domain_path_rule = client.DomainPathRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `str` | Yes |  |
| `app_service_endpoint_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `backend_ref` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `last_error` | `str | None` | Yes |  |
| `path_prefix` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `action_kind` | - | - | - | - | - | - |
| `app_service_endpoint_id` | - | - | Yes | Yes | Yes | - |
| `app_service_id` | - | - | - | - | - | - |
| `backend_ref` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `last_error` | - | - | - | - | - | - |
| `path_prefix` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> DomainPathRuleEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainPathRule().create({
    "app_id": "example_app_id",  # str
    "domain_id": "example_domain_id",  # str
    "app_service_id": "example_app_service_id",  # str | None
    "path_prefix": "example_path_prefix",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainPathRuleEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainPathRule().list({"app_id": "example", "domain_id": "example"})
for domain_path_rule in results:
    print(domain_path_rule.data_get())
```

#### `load(reqmatch, ctrl=None) -> DomainPathRuleEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainPathRule().load({"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"})
```

#### `patch(reqdata, ctrl=None) -> DomainPathRuleEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.DomainPathRule().patch({
    "id": "domain_path_rule_id",
    "app_id": "app_id",
    "domain_id": "domain_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> DomainPathRuleEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainPathRule().remove({"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"})
```

#### `update(reqdata, ctrl=None) -> DomainPathRuleEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainPathRule().update({
    "id": "domain_path_rule_id",
    "app_id": "app_id",
    "domain_id": "domain_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainPathRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DreamEntity

```python
dream = client.Dream()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `bool` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `list` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `str | None` | Yes |  |
| `counts` | `dict` | Yes |  |
| `dream` | `Any` | Yes |  |
| `error_code` | `str | None` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `str` | Yes | Public id used in the dream's URL |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `phase` | `str` | Yes | Where the dream is. |
| `reason` | `str | None` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `str` | Yes | Local day whose finished runs it reviewed |
| `runs` | `list` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `str` | Yes | Project or unassigned environment name |
| `skipped` | `int` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `str` | Yes |  |
| `timezone` | `str` | Yes | Organization timezone the dream used |

### Operations

#### `create(reqdata, ctrl=None) -> DreamEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[DreamEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Dream().list({"organization_id": "example", "project_id": "example"})
for dream in results:
    print(dream.data_get())
```

#### `load(reqmatch, ctrl=None) -> DreamEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Dream().load({"id": "dream_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DreamEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentEntity

```python
environment = client.Environment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `str | None` | Yes |  |
| `agent_sign_up_available` | `bool` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `str` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `dict` | Yes |  |
| `cleanup` | `list` | Yes |  |
| `connection` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `default_policy` | `dict` | No |  |
| `default_policy_json` | `dict` | Yes |  |
| `discovery_defaults` | `dict` | Yes |  |
| `environment` | `dict` | Yes |  |
| `exploration_accounts` | `list` | No |  |
| `explorations` | `list` | No |  |
| `first_run` | `Any` | No |  |
| `hosted_app_id` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `imessage_number` | `str | None` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` | Yes |  |
| `managed_google_available` | `bool` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `str` | Yes |  |
| `messaging_tester_number` | `str | None` | No | One configured tester number. |
| `name` | `str` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `list` | Yes |  |
| `onboarding_discovery` | `Any` | No |  |
| `organization_id` | `str` | Yes |  |
| `pending_accounts` | `list` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `dict` | Yes |  |
| `project_id` | `str | None` | Yes | Owning project. |
| `repository_id` | `str | None` | Yes |  |
| `revisions` | `list` | Yes |  |
| `setup_discovery_id` | `str | None` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `target_kind` | `str | None` | Yes |  |
| `target_url` | `str | None` | Yes |  |
| `test_accounts` | `dict` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verify_network_connection_id` | `str | None` | Yes |  |
| `version` | `int` | No | Required for target or tester changes; use lock_version from the environment. |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `active_revision_id` | - | - | - | - | - | - |
| `agent_sign_up_available` | - | - | - | - | - | - |
| `allowed_actions` | - | - | Yes | - | Yes | - |
| `billing` | - | - | - | - | - | - |
| `cleanup` | - | - | - | - | - | - |
| `connection` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `default_policy` | - | - | - | - | - | - |
| `default_policy_json` | - | - | - | - | - | - |
| `discovery_defaults` | - | - | - | - | - | - |
| `environment` | - | - | - | - | - | - |
| `exploration_accounts` | - | - | - | - | - | - |
| `explorations` | - | - | - | - | - | - |
| `first_run` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `imessage_number` | - | - | Yes | - | Yes | - |
| `included_deep_scan` | - | - | - | - | - | - |
| `lock_version` | - | - | - | - | - | - |
| `managed_google_available` | - | - | - | - | - | - |
| `managed_google_email` | - | - | - | - | - | - |
| `messaging_tester_number` | - | - | - | - | - | - |
| `name` | - | - | Yes | - | Yes | - |
| `network_connections` | - | - | - | - | - | - |
| `onboarding_discovery` | - | - | - | - | - | - |
| `organization_id` | - | - | - | - | - | - |
| `pending_accounts` | - | - | - | - | - | - |
| `permissions` | - | - | - | - | - | - |
| `project_id` | - | - | Yes | - | - | - |
| `repository_id` | - | - | Yes | - | - | - |
| `revisions` | - | - | - | - | - | - |
| `setup_discovery_id` | - | - | - | - | - | - |
| `sign_in_check_available` | - | - | - | - | - | - |
| `slug` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `target_kind` | - | - | Yes | - | - | - |
| `target_url` | - | - | Yes | - | Yes | - |
| `test_accounts` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `verify_network_connection_id` | - | - | - | - | Yes | - |
| `version` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Environment().create({
    "organization_id": "example_organization_id",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EnvironmentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Environment().list({"organization_id": "example"})
for environment in results:
    print(environment.data_get())
```

#### `load(reqmatch, ctrl=None) -> EnvironmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Environment().load({"id": "environment_id", "organization_id": "organization_id"})
```

#### `patch(reqdata, ctrl=None) -> EnvironmentEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Environment().patch({
    "id": "environment_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> EnvironmentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Environment().remove({"id": "environment_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> EnvironmentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Environment().update({
    "id": "environment_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentDiscoveryRunEntity

```python
environment_discovery_run = client.EnvironmentDiscoveryRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | Yes | Omit for anonymous exploration |
| `deadline_at` | `str` | Yes |  |
| `environment_revision_id` | `str` | Yes |  |
| `evidence` | `list` | No |  |
| `failure_code` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `queued_at` | `str` | Yes |  |
| `recording` | `dict` | Yes |  |
| `result` | `dict | None` | Yes |  |
| `status` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `account_id` | - | Yes |
| `deadline_at` | - | - |
| `environment_revision_id` | - | - |
| `evidence` | - | - |
| `failure_code` | - | - |
| `id` | - | - |
| `queued_at` | - | - |
| `recording` | - | - |
| `result` | - | - |
| `status` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentDiscoveryRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EnvironmentDiscoveryRun().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> EnvironmentDiscoveryRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EnvironmentDiscoveryRun().load({"id": "environment_discovery_run_id", "environment_id": "environment_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentExplorationEntity

```python
environment_exploration = client.EnvironmentExploration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | No |  |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `persona_id` | `str | None` | No |  |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `account_id` | - |
| `agent_filters` | - |
| `agents` | - |
| `can_continue` | - |
| `chat_messages` | - |
| `concurrency` | Yes |
| `covered_areas` | - |
| `created_at` | - |
| `deadline_at` | - |
| `demo_project` | - |
| `ended_early` | - |
| `environment_id` | - |
| `environment_name` | - |
| `explorer_activity` | - |
| `finding_count` | - |
| `findings` | - |
| `findings_fix_prompt` | - |
| `finished_at` | - |
| `goal` | - |
| `huntable_flows` | - |
| `id` | - |
| `idempotency_key` | - |
| `max_seconds` | Yes |
| `max_testers` | Yes |
| `mode` | - |
| `next_scan_improvements` | - |
| `observed_at` | - |
| `onboarding` | - |
| `paywalled` | - |
| `permissions` | - |
| `persona_id` | - |
| `priority_counts` | - |
| `project_id` | - |
| `related_explorations` | - |
| `report` | - |
| `reproduction_of` | - |
| `reproductions` | - |
| `saves_scenarios` | - |
| `scannable_flows` | - |
| `scenario_generation` | - |
| `sign_in_needs_answer` | - |
| `sign_in_outcome` | - |
| `sign_in_question` | - |
| `startup_retryable` | - |
| `status` | - |
| `time_limit_reached` | - |
| `title` | - |
| `unlock` | - |
| `web_url` | - |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentExplorationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EnvironmentExploration().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "goal": "example_goal",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentExplorationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentFirstRunEntity

```python
environment_first_run = client.EnvironmentFirstRun()
```

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentFirstRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentFirstRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentRevisionEntity

```python
environment_revision = client.EnvironmentRevision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `list` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `str | None` | Yes |  |
| `app_release_id` | `str | None` | Yes |  |
| `blueprint` | `dict` | Yes |  |
| `blueprint_json` | `dict` | Yes |  |
| `cleanup_state` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `digest` | `str` | Yes |  |
| `dry_run` | `bool` | No |  |
| `expires_at` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `ready_at` | `str | None` | Yes |  |
| `resolved_manifest_json` | `dict` | Yes |  |
| `retention_policy_json` | `dict` | Yes |  |
| `revision` | `int` | Yes |  |
| `revoked_at` | `str | None` | Yes |  |
| `runner_environment_revision_id` | `str | None` | Yes |  |
| `safety_policy_json` | `dict` | Yes |  |
| `schema_version` | `int` | Yes |  |
| `source_metadata` | `dict` | No |  |
| `source_metadata_json` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `validation_json` | `dict` | Yes |  |
| `verify_environment_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentRevisionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EnvironmentRevision().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
    "blueprint": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> EnvironmentRevisionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EnvironmentRevision().load({"id": "environment_revision_id", "environment_id": "environment_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> EnvironmentRevisionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.EnvironmentRevision().update({
    "id": "environment_revision_id",
    "environment_id": "environment_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentRevisionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentSecretBindingEntity

```python
environment_secret_binding = client.EnvironmentSecretBinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `str` | Yes |  |
| `id` | `str` | No |  |
| `mode` | `str` | No |  |
| `secret_id` | `str` | No |  |
| `secret_version_id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentSecretBindingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EnvironmentSecretBinding().create({
    "app_id": "example_app_id",  # str
    "environment_id": "example_environment_id",  # str
    "env_key": "example_env_key",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EnvironmentSecretBindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.EnvironmentSecretBinding().list({"app_id": "example", "environment_id": "example"})
for environment_secret_binding in results:
    print(environment_secret_binding.data_get())
```

#### `remove(reqmatch, ctrl=None) -> EnvironmentSecretBindingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.EnvironmentSecretBinding().remove({"id": "environment_secret_binding_id", "app_id": "app_id", "environment_id": "environment_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentSecretBindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentTestAccountEntity

```python
environment_test_account = client.EnvironmentTestAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `bool` | Yes |  |
| `credentials` | `list` | Yes |  |
| `id` | `str` | No |  |
| `persona` | `str` | Yes |  |
| `revision_id` | `str` | Yes |  |
| `role` | `str` | Yes |  |
| `tenant` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[EnvironmentTestAccountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.EnvironmentTestAccount().list({"environment_id": "example", "organization_id": "example"})
for environment_test_account in results:
    print(environment_test_account.data_get())
```

#### `patch(reqdata, ctrl=None) -> EnvironmentTestAccountEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.EnvironmentTestAccount().patch({
    "environment_id": "environment_id",
    "id": "id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> EnvironmentTestAccountEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.EnvironmentTestAccount().update({
    "environment_id": "environment_id",
    "id": "id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentTestAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EvidenceEntity

```python
evidence = client.Evidence()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> EvidenceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Evidence().load({"id": "evidence_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EvidenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExplorationEntity

```python
exploration = client.Exploration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | No |  |
| `active` | `list` | Yes |  |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `explorations` | `list` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | No |  |
| `launch_options` | `dict` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `dict` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `persona_id` | `str | None` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `account_id` | - | - | - |
| `active` | - | - | - |
| `agent_filters` | - | - | - |
| `agents` | - | - | - |
| `can_continue` | - | - | - |
| `chat_messages` | - | - | - |
| `concurrency` | - | - | Yes |
| `covered_areas` | - | - | - |
| `created_at` | - | - | - |
| `deadline_at` | - | - | - |
| `demo_project` | - | - | - |
| `ended_early` | - | - | - |
| `environment_id` | - | - | - |
| `environment_name` | - | - | - |
| `explorations` | - | - | - |
| `explorer_activity` | - | - | - |
| `finding_count` | - | - | - |
| `findings` | - | - | - |
| `findings_fix_prompt` | - | - | - |
| `finished_at` | - | - | - |
| `goal` | - | - | - |
| `huntable_flows` | - | - | - |
| `id` | - | - | - |
| `idempotency_key` | - | - | - |
| `launch_options` | - | - | - |
| `max_seconds` | - | - | Yes |
| `max_testers` | - | - | Yes |
| `mode` | - | - | - |
| `next_scan_improvements` | - | - | - |
| `observed_at` | - | - | - |
| `onboarding` | - | - | - |
| `pagination` | - | - | - |
| `paywalled` | - | - | - |
| `permissions` | - | - | - |
| `persona_id` | - | - | - |
| `priority_counts` | - | - | - |
| `project_id` | - | - | - |
| `related_explorations` | - | - | - |
| `report` | - | - | - |
| `reproduction_of` | - | - | - |
| `reproductions` | - | - | - |
| `saves_scenarios` | - | - | - |
| `scannable_flows` | - | - | - |
| `scenario_generation` | - | - | - |
| `sign_in_needs_answer` | - | - | - |
| `sign_in_outcome` | - | - | - |
| `sign_in_question` | - | - | - |
| `startup_retryable` | - | - | - |
| `status` | - | - | - |
| `time_limit_reached` | - | - | - |
| `title` | - | - | - |
| `unlock` | - | - | - |
| `web_url` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> ExplorationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Exploration().create({
    "organization_id": "example_organization_id",  # str
    "environment_id": "example_environment_id",  # str
    "goal": "example_goal",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ExplorationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Exploration().list({"organization_id": "example"})
for exploration in results:
    print(exploration.data_get())
```

#### `load(reqmatch, ctrl=None) -> ExplorationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Exploration().load({"id": "exploration_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExplorationMessageEntity

```python
exploration_message = client.ExplorationMessage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `text` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl=None) -> ExplorationMessageEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ExplorationMessage().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
    "text": "example_text",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationMessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExplorationReportEntity

```python
exploration_report = client.ExplorationReport()
```

### Operations

#### `create(reqdata, ctrl=None) -> ExplorationReportEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> ExplorationReportEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationReportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExplorationScenarioEntity

```python
exploration_scenario = client.ExplorationScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `dict` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `list` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` | Yes |  |
| `deadline_at` | `str` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `explorer_activity` | `dict` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `list` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `huntable_flows` | `list` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `str` | No |  |
| `next_scan_improvements` | `list` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` | Yes |  |
| `priority_counts` | `dict` | Yes |  |
| `project_id` | `str | None` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `reproduction_of` | `dict | None` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl=None) -> ExplorationScenarioEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ExplorationScenario().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationScenarioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FindingEntity

```python
finding = client.Finding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `deferred_until` | `str | None` | No | Required future time when status is deferred |
| `finding` | `dict` | Yes |  |
| `fingerprint` | `str` | Yes |  |
| `first_seen_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `last_seen_at` | `str` | Yes |  |
| `locked` | `bool` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `reason` | `str` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `dict | None` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `str | None` | Yes |  |
| `safe_summary` | `str` | Yes |  |
| `scenario_occurrences` | `list` | No |  |
| `severity` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verification` | `Any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[FindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Finding().list({"organization_id": "example"})
for finding in results:
    print(finding.data_get())
```

#### `load(reqmatch, ctrl=None) -> FindingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Finding().load({"id": "finding_id", "organization_id": "organization_id"})
```

#### `patch(reqdata, ctrl=None) -> FindingEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Finding().patch({
    "id": "finding_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> FindingEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Finding().update({
    "id": "finding_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GithubConnectionEntity

```python
github_connection = client.GithubConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `list` | Yes |  |
| `github_app_installation_id` | `str` | Yes |  |
| `installations` | `list` | Yes |  |
| `project_id` | `str` | No | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> GithubConnectionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.GithubConnection().create({
    "organization_id": "example_organization_id",  # str
    "github_app_installation_id": "example_github_app_installation_id",  # str
    "repositories": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list[GithubConnectionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.GithubConnection().list({"organization_id": "example"})
for github_connection in results:
    print(github_connection.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GithubConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HostingAppDomainEntity

```python
hosting_app_domain = client.HostingAppDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `certificate` | `dict | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dns_mode` | `str` | Yes |  |
| `dns_status` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `hosted_app_id` | `str` | Yes |  |
| `hostname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `last_checked_at` | `str | None` | Yes |  |
| `path_rules` | `list` | Yes |  |
| `record_name` | `str | None` | Yes |  |
| `record_type` | `str | None` | Yes |  |
| `record_value` | `str | None` | Yes |  |
| `redirect_to` | `str | None` | Yes |  |
| `static_site_id` | `str | None` | Yes |  |
| `target_kind` | `str` | Yes |  |
| `tls_status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verification_record` | `dict | None` | Yes |  |
| `verification_status` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | Yes | - | - | - |
| `app_service_id` | - | - | - | - | - | - |
| `certificate` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `dns_mode` | - | - | - | - | - | - |
| `dns_status` | - | - | Yes | - | - | - |
| `failure_message` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `hostname` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `kind` | - | - | - | - | - | - |
| `last_checked_at` | - | - | - | - | - | - |
| `path_rules` | - | - | - | - | - | - |
| `record_name` | - | - | - | - | - | - |
| `record_type` | - | - | - | - | - | - |
| `record_value` | - | - | - | - | - | - |
| `redirect_to` | - | - | Yes | - | - | - |
| `static_site_id` | - | - | - | - | - | - |
| `target_kind` | - | - | - | - | - | - |
| `tls_status` | - | - | Yes | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `verification_record` | - | - | - | - | - | - |
| `verification_status` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> HostingAppDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.HostingAppDomain().create({
    "app_id": "example_app_id",  # str
    "app_service_id": "example_app_service_id",  # str | None
    "hostname": "example_hostname",  # str
    "kind": "example_kind",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[HostingAppDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HostingAppDomain().list({"app_id": "example"})
for hosting_app_domain in results:
    print(hosting_app_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> HostingAppDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HostingAppDomain().load({"id": "hosting_app_domain_id", "app_id": "app_id"})
```

#### `patch(reqdata, ctrl=None) -> HostingAppDomainEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.HostingAppDomain().patch({
    "id": "hosting_app_domain_id",
    "app_id": "app_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> HostingAppDomainEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.HostingAppDomain().remove({"id": "hosting_app_domain_id", "app_id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> HostingAppDomainEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.HostingAppDomain().update({
    "id": "hosting_app_domain_id",
    "app_id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingAppDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageRepositoryEntity

```python
image_repository = client.ImageRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `hosted_app_id` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `provider_kind` | `str` | Yes |  |
| `registry_auth_token` | `str` | No |  |
| `repository_path` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |
| `visibility` | `str` | Yes |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `auth_configured` | - | - |
| `created_at` | - | - |
| `created_at_label` | - | - |
| `hosted_app_id` | - | Yes |
| `id` | - | - |
| `name` | - | - |
| `organization_id` | - | - |
| `provider_kind` | - | Yes |
| `registry_auth_token` | - | - |
| `repository_path` | - | Yes |
| `slug` | - | - |
| `status` | - | Yes |
| `updated_at` | - | - |
| `updated_at_label` | - | - |
| `visibility` | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> ImageRepositoryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ImageRepository().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ImageRepositoryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ImageRepository().list({"organization_id": "example"})
for image_repository in results:
    print(image_repository.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageRepositoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntegrationEntity

```python
integration = client.Integration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `dict` | Yes |  |
| `gitlab` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `slack` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[IntegrationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Integration().list({"organization_id": "example"})
for integration in results:
    print(integration.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntegrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InteractionResponseEntity

```python
interaction_response = client.InteractionResponse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `dict` | Yes |  |
| `conversation_id` | `str` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> InteractionResponseEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.InteractionResponse().create({
    "agent_id": "example_agent_id",  # str
    "interaction_id": "example_interaction_id",  # str
    "organization_id": "example_organization_id",  # str
    "answer": {},  # dict
    "conversation_id": "example_conversation_id",  # str
    "expected_revision": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionResponseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InvitationEntity

```python
invitation = client.Invitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `str | None` | Yes |  |
| `accepted_by_user` | `Any` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `email` | `str` | Yes |  |
| `email_delivery_status` | `str` | No |  |
| `expires_at` | `str | None` | Yes |  |
| `expires_at_label` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `invite_url` | `str | None` | Yes |  |
| `invited_by_user` | `Any` | Yes |  |
| `organization` | `dict` | Yes |  |
| `revoked_at` | `str | None` | Yes |  |
| `role` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> InvitationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Invitation().create({
    "organization_id": "example_organization_id",  # str
    "email": "example_email",  # str
    "role": "example_role",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[InvitationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Invitation().list({"organization_id": "example"})
for invitation in results:
    print(invitation.data_get())
```

#### `remove(reqmatch, ctrl=None) -> InvitationEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Invitation().remove({"id": "invitation_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvitationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JourneyVariantReplayEntity

```python
journey_variant_replay = client.JourneyVariantReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `str | None` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `failure_code` | `str | None` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | Yes |  |
| `max_seconds` | `int` | No |  |
| `preparation_receipt` | `dict | None` | Yes |  |
| `qualification` | `Any` | Yes |  |
| `qualification_status` | `str` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `str` | Yes |  |
| `run_id` | `str | None` | Yes |  |
| `scenario_file` | `dict` | Yes |  |
| `scenario_run_id` | `str | None` | Yes |  |
| `source_digest` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `variant_id` | `str` | Yes |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `actor_id` | Yes |
| `can_request_qualification` | - |
| `created_at` | - |
| `failure_code` | - |
| `failure_message` | - |
| `id` | - |
| `idempotency_key` | - |
| `max_seconds` | - |
| `preparation_receipt` | - |
| `qualification` | - |
| `qualification_status` | - |
| `replay_required` | - |
| `review_reason` | - |
| `run_id` | - |
| `scenario_file` | - |
| `scenario_run_id` | - |
| `source_digest` | - |
| `status` | - |
| `updated_at` | - |
| `variant_id` | - |

### Operations

#### `create(reqdata, ctrl=None) -> JourneyVariantReplayEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.JourneyVariantReplay().create({
    "journey_variant_id": "example_journey_variant_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
    "review_reason": "example_review_reason",  # str
    "scenario_file": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JourneyVariantReplayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KnowledgeEntity

```python
knowledge = client.Knowledge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `str` | Yes |  |
| `content_json` | `dict` | Yes |  |
| `document` | `dict` | Yes |  |
| `documents` | `list` | Yes |  |
| `dreaming` | `dict` | Yes |  |
| `expected_digest` | `str` | Yes |  |
| `history` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `markdown` | `str` | Yes |  |
| `observed_at` | `str` | Yes |  |
| `organization` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `project_id` | `str` | Yes |  |
| `project_name` | `str` | Yes |  |
| `projects` | `list` | Yes |  |
| `selected_project_id` | `str | None` | Yes |  |
| `source` | `dict` | Yes |  |
| `title` | `str` | Yes |  |
| `total` | `int` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> KnowledgeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Knowledge().create({
    "organization_id": "example_organization_id",  # str
    "markdown": "example_markdown",  # str
    "project_id": "example_project_id",  # str
    "title": "example_title",  # str
})
```

#### `load(reqmatch, ctrl=None) -> KnowledgeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Knowledge().load({"id": "knowledge_id", "organization_id": "organization_id"})
```

#### `patch(reqdata, ctrl=None) -> KnowledgeEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Knowledge().patch({
    "id": "knowledge_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> KnowledgeEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Knowledge().remove({"id": "knowledge_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> KnowledgeEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Knowledge().update({
    "id": "knowledge_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KnowledgeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocalThreadDeliveryEntity

```python
local_thread_delivery = client.LocalThreadDelivery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `str` | Yes |  |
| `decision_pending` | `bool` | Yes |  |
| `delivery` | `dict` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `id` | `str` | No |  |
| `policy` | `dict` | Yes |  |
| `recovery_message` | `str | None` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> LocalThreadDeliveryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LocalThreadDelivery().load({"id": "local_thread_delivery_id", "agent_id": "agent_id", "local_thread_id": "local_thread_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> LocalThreadDeliveryEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LocalThreadDelivery().update({
    "id": "local_thread_delivery_id",
    "agent_id": "agent_id",
    "local_thread_id": "local_thread_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocalThreadDeliveryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocalThreadOperationEntity

```python
local_thread_operation = client.LocalThreadOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `arguments` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `delivery` | `dict` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `str` | Yes |  |
| `diagnostic_code` | `str` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `dict` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `key` | `str` | Yes |  |
| `provider` | `str` | Yes |  |
| `references` | `dict` | Yes |  |
| `result` | `Any` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> LocalThreadOperationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LocalThreadOperation().create({
    "agent_id": "example_agent_id",  # str
    "local_thread_id": "example_local_thread_id",  # str
    "organization_id": "example_organization_id",  # str
    "action": "example_action",  # str
    "arguments": {},  # dict
    "key": "example_key",  # str
})
```

#### `load(reqmatch, ctrl=None) -> LocalThreadOperationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LocalThreadOperation().load({"id": "local_thread_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocalThreadOperationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationEntity

```python
location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `nomad_datacenter` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LocationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Location().list()
for location in results:
    print(location.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeEntity

```python
me = client.Me()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `Any` | Yes |  |
| `analytics_distinct_id` | `str` | No |  |
| `analytics_internal` | `bool` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `str` | No |  |
| `api_token` | `str` | No |  |
| `app_promotion` | `dict` | Yes |  |
| `commit_author_email` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `enabled_features` | `list` | Yes |  |
| `github_pr_user_authorization_connected` | `bool` | Yes |  |
| `github_pr_user_authorization_login` | `str | None` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `impersonation` | `dict | None` | Yes |  |
| `name` | `str | None` | Yes |  |
| `next_path` | `str` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `dict` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` | No |  |
| `openai_sign_in_enabled` | `bool` | No |  |
| `organizations` | `list` | Yes |  |
| `pending_organization_invitation_count` | `int` | Yes |  |
| `pending_organization_invitation_count_label` | `str` | Yes |  |
| `picture_url` | `str | None` | Yes |  |
| `superadmin` | `bool` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `str | None` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Operations

#### `create(reqdata, ctrl=None) -> MeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> MeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Me().load({"id": "me_id"})
```

#### `remove(reqmatch, ctrl=None) -> MeEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

#### `update(reqdata, ctrl=None) -> MeEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Me().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeEmailEntity

```python
me_email = client.MeEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `bool` | Yes |  |
| `can_delete` | `bool` | Yes |  |
| `can_resend_verification` | `bool` | Yes |  |
| `can_set_account` | `bool` | Yes |  |
| `can_set_commit_author` | `bool` | Yes |  |
| `commit_author` | `bool` | Yes |  |
| `email` | `str` | Yes |  |
| `emails` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `message` | `str` | No |  |
| `verification_status` | `str` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> MeEmailEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MeEmail().create({
    "email": "example_email",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MeEmailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MeEmail().list()
for me_email in results:
    print(me_email.data_get())
```

#### `patch(reqdata, ctrl=None) -> MeEmailEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.MeEmail().patch({
    "id": "me_email_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> MeEmailEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.MeEmail().remove({"id": "me_email_id"})
```

#### `update(reqdata, ctrl=None) -> MeEmailEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.MeEmail().update({
    "id": "me_email_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeEmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeOnboardingEntity

```python
me_onboarding = client.MeOnboarding()
```

### Operations

#### `create(reqdata, ctrl=None) -> MeOnboardingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeOnboardingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MediaFileEntity

```python
media_file = client.MediaFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> MediaFileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MediaFile().load({"id": "media_file_id", "browser_session_id": "browser_session_id", "media_id": "media_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MediaFileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MemberEntity

```python
member = client.Member()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `str | None` | Yes |  |
| `accepted_by_user` | `Any` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `email` | `str` | Yes |  |
| `email_delivery_status` | `str` | No |  |
| `expires_at` | `str | None` | Yes |  |
| `expires_at_label` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `invite_url` | `str | None` | Yes |  |
| `invited_by_user` | `Any` | Yes |  |
| `is_self` | `bool` | Yes |  |
| `organization` | `dict` | Yes |  |
| `revoked_at` | `str | None` | Yes |  |
| `role` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |
| `user` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MemberEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Member().list({"organization_id": "example"})
for member in results:
    print(member.data_get())
```

#### `patch(reqdata, ctrl=None) -> MemberEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Member().patch({
    "id": "member_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> MemberEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Member().remove({"id": "member_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> MemberEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Member().update({
    "id": "member_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MemberEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MemoryEntity

```python
memory = client.Memory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `environment_id` | `str` | No |  |
| `finding` | `str` | Yes |  |
| `history` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `indexed_at` | `str | None` | Yes |  |
| `memory` | `dict` | Yes |  |
| `project_id` | `str` | No |  |
| `response` | `str` | No |  |
| `scope` | `dict` | Yes |  |
| `source` | `dict` | Yes |  |
| `tags` | `list` | No |  |
| `title` | `str` | Yes |  |
| `workaround` | `str` | No |  |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `confidence` | - | - | - | - |
| `created_at` | - | - | - | - |
| `environment_id` | - | - | - | - |
| `finding` | - | - | - | - |
| `history` | - | - | - | - |
| `id` | - | - | - | - |
| `indexed_at` | - | - | - | - |
| `memory` | - | - | - | - |
| `project_id` | - | - | - | - |
| `response` | - | Yes | - | - |
| `scope` | - | - | - | - |
| `source` | - | - | - | - |
| `tags` | - | Yes | - | - |
| `title` | - | - | - | - |
| `workaround` | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> MemoryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Memory().create({
    "organization_id": "example_organization_id",  # str
    "finding": "example_finding",  # str
    "title": "example_title",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MemoryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Memory().list({"organization_id": "example"})
for memory in results:
    print(memory.data_get())
```

#### `load(reqmatch, ctrl=None) -> MemoryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Memory().load({"id": "memory_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> MemoryEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Memory().remove({"id": "memory_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MemoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MergeRequestEntity

```python
merge_request = client.MergeRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `list` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `str` | Yes |  |
| `branch` | `str` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `str | None` | Yes |  |
| `current_run` | `Any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` | Yes |  |
| `findings` | `list` | Yes |  |
| `github_repository` | `str | None` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` | Yes |  |
| `head_sha` | `str` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `str` | Yes |  |
| `idempotency_key` | `str` | Yes |  |
| `number` | `int` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `str | None` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Any` | No |  |
| `project_id` | `str | None` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `str | None` | Yes |  |
| `provider` | `str` | Yes |  |
| `pull_request` | `dict` | Yes |  |
| `repository_id` | `str` | Yes |  |
| `request_label` | `str` | Yes |  |
| `requested_run_id` | `str | None` | Yes |  |
| `runs` | `list` | Yes |  |
| `source_branch` | `str | None` | Yes |  |
| `source_repository` | `str | None` | Yes |  |
| `source_url` | `str | None` | Yes |  |
| `state` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `web_path` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `available_tests` | - | - |
| `base_sha` | - | - |
| `branch` | - | - |
| `comment_url` | - | - |
| `current_run` | - | - |
| `draft` | - | - |
| `findings` | - | - |
| `github_repository` | - | - |
| `github_url` | - | - |
| `head_sha` | - | Yes |
| `id` | - | - |
| `idempotency_key` | - | - |
| `number` | - | - |
| `pagination` | - | - |
| `permissions` | - | - |
| `preview_cleanup_ready` | - | - |
| `preview_url` | - | - |
| `project` | - | - |
| `project_id` | - | Yes |
| `project_slug` | - | - |
| `provider` | - | - |
| `pull_request` | - | - |
| `repository_id` | - | Yes |
| `request_label` | - | - |
| `requested_run_id` | - | - |
| `runs` | - | - |
| `source_branch` | - | - |
| `source_repository` | - | - |
| `source_url` | - | - |
| `state` | - | - |
| `title` | - | - |
| `updated_at` | - | - |
| `web_path` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> MergeRequestEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MergeRequest().create({
    "organization_id": "example_organization_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
    "number": 1,  # int
})
```

#### `load(reqmatch, ctrl=None) -> MergeRequestEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MergeRequest().load({"id": "merge_request_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MergeRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessagingConversationMessageEntity

```python
messaging_conversation_message = client.MessagingConversationMessage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `client_operation_id` | `str` | Yes |  |
| `content` | `str` | Yes |  |
| `id` | `str` | No |  |
| `media` | `dict` | Yes |  |
| `media_upload_ids` | `list` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `list` | Yes |  |
| `reply_to` | `str` | No | Public ID of a visible message |
| `retry_attachment` | `bool` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `str | None` | Yes |  |
| `send_disposition` | `str` | No |  |
| `send_error` | `str | None` | No |  |
| `send_style` | `str | None` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> MessagingConversationMessageEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MessagingConversationMessage().create({
    "messaging_conversation_id": "example_messaging_conversation_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "client_operation_id": "example_client_operation_id",  # str
    "content": "example_content",  # str
    "media": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessagingConversationMessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessagingConversationUploadEntity

```python
messaging_conversation_upload = client.MessagingConversationUpload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `dict` | Yes |  |
| `upload_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> MessagingConversationUploadEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MessagingConversationUpload().create({
    "messaging_conversation_id": "example_messaging_conversation_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessagingConversationUploadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetricQueryEntity

```python
metric_query = client.MetricQuery()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MetricQueryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MetricQuery().list()
for metric_query in results:
    print(metric_query.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetricQueryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NetworkConnectionEntity

```python
network_connection = client.NetworkConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_client_vpn_profile` | `str` | No |  |
| `created_at` | `str` | Yes |  |
| `device_tag` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `oauth_client_id` | `str` | No |  |
| `oauth_client_secret` | `str` | No |  |
| `provider` | `str` | No |  |
| `status` | `str` | No |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | create | update | patch |
| --- | --- | --- | --- |
| `aws_client_vpn_profile` | - | - | - |
| `created_at` | - | - | - |
| `device_tag` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |
| `oauth_client_id` | - | - | - |
| `oauth_client_secret` | - | - | - |
| `provider` | - | - | - |
| `status` | - | - | - |
| `updated_at` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> NetworkConnectionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.NetworkConnection().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```

#### `patch(reqdata, ctrl=None) -> NetworkConnectionEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.NetworkConnection().patch({
    "id": "id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> NetworkConnectionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.NetworkConnection().update({
    "id": "id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NomadAllocationEntity

```python
nomad_allocation = client.NomadAllocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `str` | Yes |  |
| `client_status` | `str | None` | Yes |  |
| `create_time` | `str | None` | Yes |  |
| `datacenter` | `str | None` | Yes |  |
| `desired_description` | `str | None` | Yes |  |
| `desired_status` | `str | None` | Yes |  |
| `fetched_at` | `str` | Yes |  |
| `id` | `str` | No |  |
| `job_id` | `str | None` | Yes |  |
| `modify_time` | `str | None` | Yes |  |
| `name` | `str | None` | Yes |  |
| `namespace` | `str` | Yes |  |
| `node_id` | `str | None` | Yes |  |
| `node_name` | `str | None` | Yes |  |
| `resources` | `dict` | Yes |  |
| `task_group` | `str | None` | Yes |  |
| `task_states` | `list` | Yes |  |
| `verify_runner_images` | `list` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `load(reqmatch, ctrl=None) -> NomadAllocationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.NomadAllocation().load({"id": "nomad_allocation_id", "app_id": "app_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NomadAllocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NomadLogEntity

```python
nomad_log = client.NomadLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `str` | Yes |  |
| `environment` | `str` | No |  |
| `fetched_at` | `str` | Yes |  |
| `location` | `str | None` | No |  |
| `logs` | `str` | Yes |  |
| `namespace` | `str` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `str` | Yes |  |
| `service` | `str` | No |  |
| `task` | `str` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[NomadLogEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.NomadLog().list({"app_id": "example"})
for nomad_log in results:
    print(nomad_log.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NomadLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `list` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `google_workspace_domain` | `str | None` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `str` | Yes |  |
| `logo_url` | `str | None` | Yes |  |
| `member_count` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `pending_invitation_count` | `int` | Yes |  |
| `personal` | `bool` | Yes |  |
| `repository_count` | `int` | Yes |  |
| `role` | `str | None` | Yes |  |
| `sandbox_region` | `str` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `bool` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `str` | Yes |  |
| `source_control_providers` | `list` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `str` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |
| `verify_pr_scenario_writing_enabled` | `bool` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch |
| --- | --- | --- | --- | --- | --- |
| `activated_products` | - | - | - | - | - |
| `agents_only` | - | - | - | - | - |
| `can_activate_products` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `created_at_label` | - | - | - | - | - |
| `github_prs_authored_by_change_author` | - | - | - | Yes | Yes |
| `google_workspace_domain` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `logo_url` | - | - | - | - | - |
| `member_count` | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes |
| `pending_invitation_count` | - | - | - | - | - |
| `personal` | - | - | - | - | - |
| `repository_count` | - | - | - | - | - |
| `role` | - | - | - | - | - |
| `sandbox_region` | - | - | - | Yes | Yes |
| `shared_agent_personal_accounts_enabled` | - | - | - | - | - |
| `slug` | - | - | - | Yes | Yes |
| `source_control_providers` | - | - | - | - | - |
| `source_ui_enabled` | - | - | - | - | - |
| `timezone` | - | - | Yes | Yes | Yes |
| `updated_at` | - | - | - | - | - |
| `updated_at_label` | - | - | - | - | - |
| `verify_pr_scenario_writing_enabled` | - | - | - | Yes | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> OrganizationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Organization().create({
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[OrganizationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Organization().list()
for organization in results:
    print(organization.data_get())
```

#### `load(reqmatch, ctrl=None) -> OrganizationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Organization().load({"id": "organization_id"})
```

#### `patch(reqdata, ctrl=None) -> OrganizationEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Organization().patch({
    "id": "organization_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> OrganizationEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Organization().update({
    "id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PageEntity

```python
page = client.Page()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `list` | Yes |  |
| `checkout_required` | `bool` | Yes |  |
| `cli_signed_in_at` | `str | None` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `dict` | Yes |  |
| `demo_project` | `dict | None` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `list` | Yes |  |
| `included_deep_scan` | `bool` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `Any` | No |  |
| `organization` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `project` | `Any` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `list` | No |  |
| `pull_requests` | `list` | No |  |
| `repositories` | `list` | Yes |  |
| `runs` | `list` | Yes |  |
| `runs_pagination` | `dict` | Yes |  |
| `suggested_app_url` | `str | None` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `load(reqmatch, ctrl=None) -> PageEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Page().load({"organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PageAgentEntity

```python
page_agent = client.PageAgent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `list` | Yes |  |
| `can_edit_integration_connections` | `bool` | Yes |  |
| `creation_enabled` | `bool` | Yes |  |
| `inbox` | `Any` | No |  |
| `integration_choices` | `list` | Yes |  |
| `integration_choices_truncated` | `bool` | Yes |  |
| `integration_selected` | `list` | Yes |  |
| `model_choices` | `list` | No |  |
| `new_configuration` | `Any` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `pinned_agent` | `Any` | Yes |  |
| `platform_event_types` | `list` | Yes |  |
| `repository_choices` | `list` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `runtime_versions` | `list` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `Any` | Yes |  |
| `selected_reference` | `str | None` | Yes |  |
| `viewer_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> PageAgentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[PageAgentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PageAgent().list({"organization_id": "example"})
for page_agent in results:
    print(page_agent.data_get())
```

#### `load(reqmatch, ctrl=None) -> PageAgentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageAgentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PageProjectRunEntity

```python
page_project_run = client.PageProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `list` | Yes |  |
| `fix_scenario_count` | `int` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `list` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` | Yes |  |
| `id` | `str` | No |  |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `preparation_reason` | `str | None` | Yes |  |
| `project` | `dict` | Yes |  |
| `run` | `dict` | Yes |  |
| `scenario_runs` | `list` | Yes |  |
| `selected_scenario_run` | `Any` | Yes |  |
| `web_path` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> PageProjectRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PageProjectRun().load({"id": "page_project_run_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageProjectRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PagesProjectCredentialEntity

```python
pages_project_credential = client.PagesProjectCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `dict | None` | No |  |
| `composal_address` | `str | None` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` | Yes |  |
| `credential_keys` | `dict` | Yes |  |
| `description` | `str | None` | Yes |  |
| `email_link_auth_origins` | `list` | Yes |  |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `str` | Yes |  |
| `identity_provider` | `dict | None` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `str | None` | Yes |  |
| `login_method` | `str` | Yes |  |
| `login_url` | `str` | Yes |  |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `project_id` | `str` | Yes |  |
| `provider_guidance` | `str` | Yes |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `str | None` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `username` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PagesProjectCredentialEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PagesProjectCredential().list({"organization_id": "example", "project_id": "example"})
for pages_project_credential in results:
    print(pages_project_credential.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectCredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PagesProjectPersonaEntity

```python
pages_project_persona = client.PagesProjectPersona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `int` | Yes |  |
| `credentials` | `list` | Yes |  |
| `needs_attention_count` | `int` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `persona_states` | `dict` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `list` | Yes |  |
| `project` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PagesProjectPersonaEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PagesProjectPersona().list({"organization_id": "example", "project_id": "example"})
for pages_project_persona in results:
    print(pages_project_persona.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectPersonaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PagesProjectRunEntity

```python
pages_project_run = client.PagesProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `str` | Yes |  |
| `environments` | `list` | Yes |  |
| `environments_has_more` | `bool` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `runs` | `list` | Yes |  |
| `selected_environment` | `Any` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PagesProjectRunEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PagesProjectRun().list({"organization_id": "example", "project_id": "example"})
for pages_project_run in results:
    print(pages_project_run.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PagesProjectScenarioEntity

```python
pages_project_scenario = client.PagesProjectScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str | None` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PagesProjectScenarioEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PagesProjectScenario().list({"organization_id": "example", "project_id": "example"})
for pages_project_scenario in results:
    print(pages_project_scenario.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectScenarioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PersonalAccessTokenEntity

```python
personal_access_token = client.PersonalAccessToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> PersonalAccessTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PersonalAccessToken().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PersonalAccessTokenEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PersonalAccessToken().list()
for personal_access_token in results:
    print(personal_access_token.data_get())
```

#### `remove(reqmatch, ctrl=None) -> PersonalAccessTokenEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.PersonalAccessToken().remove({"id": "personal_access_token_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonalAccessTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PreviewOperationEntity

```python
preview_operation = client.PreviewOperation()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PreviewOperationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PreviewOperation().list({"app_id": "example", "preview_id": "example"})
for preview_operation in results:
    print(preview_operation.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewOperationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PreviewProfileSecretBindingEntity

```python
preview_profile_secret_binding = client.PreviewProfileSecretBinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `str` | Yes |  |
| `id` | `str` | No |  |
| `mode` | `str` | No |  |
| `secret_id` | `str` | No |  |
| `secret_version_id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> PreviewProfileSecretBindingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PreviewProfileSecretBinding().create({
    "app_id": "example_app_id",  # str
    "preview_profile_id": "example_preview_profile_id",  # str
    "env_key": "example_env_key",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PreviewProfileSecretBindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PreviewProfileSecretBinding().list({"app_id": "example", "preview_profile_id": "example"})
for preview_profile_secret_binding in results:
    print(preview_profile_secret_binding.data_get())
```

#### `remove(reqmatch, ctrl=None) -> PreviewProfileSecretBindingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.PreviewProfileSecretBinding().remove({"id": "preview_profile_secret_binding_id", "app_id": "app_id", "preview_profile_id": "preview_profile_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewProfileSecretBindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PreviewSecretEntity

```python
preview_secret = client.PreviewSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `str` | Yes |  |
| `id` | `str` | No |  |
| `name` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `value` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> PreviewSecretEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PreviewSecret().create({
    "app_id": "example_app_id",  # str
    "preview_id": "example_preview_id",  # str
    "env_key": "example_env_key",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "value": "example_value",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> PreviewSecretEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.PreviewSecret().remove({"id": "preview_secret_id", "app_id": "app_id", "preview_id": "preview_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewSecretEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PreviewSharingApprovalEntity

```python
preview_sharing_approval = client.PreviewSharingApproval()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `list` | Yes |  |
| `approved_build_secrets` | `list` | Yes |  |
| `approved_default_configuration` | `list` | Yes |  |
| `approved_default_secrets` | `list` | Yes |  |
| `approved_source_keys` | `list` | Yes |  |
| `build_keys` | `list` | No |  |
| `build_secrets` | `list` | No |  |
| `default_configuration` | `list` | No |  |
| `default_secrets` | `list` | No |  |
| `services` | `list` | Yes |  |
| `snapshot_version` | `int` | Yes |  |
| `source_keys` | `list` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `approved_build_keys` | - | - |
| `approved_build_secrets` | - | - |
| `approved_default_configuration` | - | - |
| `approved_default_secrets` | - | - |
| `approved_source_keys` | - | - |
| `build_keys` | - | - |
| `build_secrets` | Yes | - |
| `default_configuration` | Yes | - |
| `default_secrets` | Yes | - |
| `services` | - | - |
| `snapshot_version` | - | - |
| `source_keys` | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> PreviewSharingApprovalEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PreviewSharingApproval().create({
    "app_id": "example_app_id",  # str
    "preview_id": "example_preview_id",  # str
    "snapshot_version": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PreviewSharingApprovalEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PreviewSharingApproval().list({"app_id": "example", "preview_id": "example"})
for preview_sharing_approval in results:
    print(preview_sharing_approval.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewSharingApprovalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapIdentityDecisionEntity

```python
product_map_identity_decision = client.ProductMapIdentityDecision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `list` | Yes |  |
| `operation` | `str` | Yes |  |
| `reason` | `str` | Yes |  |
| `target` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProductMapIdentityDecisionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProductMapIdentityDecision().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "observations": [],  # list
    "operation": "example_operation",  # str
    "reason": "example_reason",  # str
    "target": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapIdentityDecisionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapJourneyEntity

```python
product_map_journey = client.ProductMapJourney()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `str | None` | No |  |
| `goal` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `journey` | `dict` | Yes |  |
| `next_cursor` | `str | None` | Yes |  |
| `preview` | `Any` | No |  |
| `scope` | `dict` | Yes |  |
| `title` | `str` | Yes |  |
| `tree` | `dict` | Yes |  |
| `tree_loaded` | `bool` | No |  |
| `variant_count` | `int` | Yes |  |
| `variants` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProductMapJourneyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProductMapJourney().list({"organization_id": "example", "project_id": "example"})
for product_map_journey in results:
    print(product_map_journey.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProductMapJourneyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProductMapJourney().load({"id": "product_map_journey_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapJourneyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapJourneyReplayEntity

```python
product_map_journey_replay = client.ProductMapJourneyReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `str | None` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `failure_code` | `str | None` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `preparation_receipt` | `dict | None` | Yes |  |
| `qualification` | `Any` | Yes |  |
| `qualification_status` | `str` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `str` | Yes |  |
| `run_id` | `str | None` | Yes |  |
| `scenario_run_id` | `str | None` | Yes |  |
| `source_digest` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `variant_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProductMapJourneyReplayEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> ProductMapJourneyReplayEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProductMapJourneyReplay().load({"id": "product_map_journey_replay_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapJourneyReplayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapObservationEntity

```python
product_map_observation = client.ProductMapObservation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `dict` | Yes |  |
| `events` | `list` | Yes |  |
| `evidence_id` | `str` | Yes |  |
| `id` | `str` | No |  |
| `observation_id` | `str` | Yes |  |
| `scope` | `dict` | Yes |  |
| `state` | `Any` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ProductMapObservationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProductMapObservation().load({"id": "product_map_observation_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapObservationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapQuestionEntity

```python
product_map_question = client.ProductMapQuestion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | No |  |
| `area` | `str` | No |  |
| `before` | `str` | No |  |
| `claims` | `list` | Yes |  |
| `evidence_truncated` | `bool` | Yes |  |
| `model` | `str` | Yes |  |
| `persona_id` | `str` | No |  |
| `query` | `str` | No |  |
| `question` | `str` | Yes |  |
| `reasoning_effort` | `str` | Yes |  |
| `revision_id` | `str` | No |  |
| `scope` | `dict` | Yes |  |
| `since` | `str` | No |  |
| `state_id` | `str` | No |  |
| `status` | `str` | Yes |  |
| `unknowns` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProductMapQuestionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProductMapQuestion().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "question": "example_question",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapQuestionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductMapStateEntity

```python
product_map_state = client.ProductMapState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str | None` | Yes |  |
| `attempts` | `list` | Yes |  |
| `captured_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `incoming` | `list` | Yes |  |
| `labels` | `dict` | Yes |  |
| `layout` | `dict` | Yes |  |
| `observation_id` | `str` | Yes |  |
| `omitted_controls` | `int` | Yes |  |
| `outgoing` | `list` | Yes |  |
| `revision_id` | `str` | Yes |  |
| `scope` | `dict` | Yes |  |
| `screenshot_url` | `str | None` | Yes |  |
| `state` | `dict` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `url` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProductMapStateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProductMapState().list({"organization_id": "example", "project_id": "example"})
for product_map_state in results:
    print(product_map_state.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProductMapStateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProductMapState().load({"id": "product_map_state_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapStateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `str | None` | Yes |  |
| `context` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `credentials` | `list` | Yes |  |
| `demo` | `bool` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `list` | Yes |  |
| `environments` | `list` | Yes |  |
| `execution_mode` | `str` | Yes |  |
| `icon_url` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `identity_provider` | `dict` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `network_connections` | `list` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `overview` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `personas` | `list` | Yes |  |
| `project` | `dict` | Yes |  |
| `pull_request_options` | `dict` | Yes |  |
| `pull_requests` | `list` | Yes |  |
| `purpose` | `str | None` | Yes |  |
| `runs` | `list` | Yes |  |
| `scenario_history` | `dict` | Yes |  |
| `scenario_states` | `dict` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `list` | Yes |  |
| `setup_required` | `bool` | No |  |
| `slug` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verifier_preferences` | `dict` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` | Yes |  |
| `website_url` | `str | None` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch |
| --- | --- | --- | --- | --- | --- |
| `archived_at` | - | - | - | - | - |
| `context` | - | - | Yes | Yes | Yes |
| `created_at` | - | - | - | - | - |
| `credentials` | - | - | - | - | - |
| `demo` | - | - | - | - | - |
| `documentation_urls` | - | - | Yes | Yes | Yes |
| `environments` | - | - | - | - | - |
| `execution_mode` | - | - | Yes | Yes | Yes |
| `icon_url` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `identity_provider` | - | - | - | - | - |
| `lock_version` | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes |
| `network_connections` | - | - | - | - | - |
| `organization_id` | - | - | - | - | - |
| `overview` | - | - | - | - | - |
| `permissions` | - | - | - | - | - |
| `personas` | - | - | - | - | - |
| `project` | - | - | - | - | - |
| `pull_request_options` | - | - | - | - | - |
| `pull_requests` | - | - | - | - | - |
| `purpose` | - | - | Yes | Yes | Yes |
| `runs` | - | - | - | - | - |
| `scenario_history` | - | - | - | - | - |
| `scenario_states` | - | - | - | - | - |
| `scenarios` | - | - | - | - | - |
| `setup_required` | - | - | - | - | - |
| `slug` | - | - | Yes | Yes | Yes |
| `updated_at` | - | - | - | - | - |
| `verifier_preferences` | - | - | Yes | Yes | Yes |
| `version` | - | - | - | - | - |
| `website_url` | - | - | Yes | Yes | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Project().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Project().list({"organization_id": "example"})
for project in results:
    print(project.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Project().load({"id": "project_id", "organization_id": "organization_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.Project().patch({
    "id": "project_id",
    "organization_id": "organization_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> ProjectEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Project().update({
    "id": "project_id",
    "organization_id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectAndroidApkEntity

```python
project_android_apk = client.ProjectAndroidApk()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `dict` | Yes |  |
| `artifact_paths` | `list` | No |  |
| `description` | `str` | Yes |  |
| `image` | `str` | Yes |  |
| `ios` | `dict` | Yes |  |
| `launch_command` | `str` | No |  |
| `managed_binary` | `dict` | Yes |  |
| `platform` | `str` | No |  |
| `provider` | `str` | No |  |
| `setup_command` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectAndroidApkEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectAndroidApk().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectAndroidApkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectCodeMapEntity

```python
project_code_map = client.ProjectCodeMap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `bool` | Yes |  |
| `commit_sha` | `str` | Yes |  |
| `configured` | `bool` | Yes |  |
| `error_code` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `ref` | `str` | No |  |
| `repository_id` | `str` | Yes |  |
| `revision` | `dict` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectCodeMapEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectCodeMap().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "repository_id": "example_repository_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectCodeMapEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectCodeMap().list({"organization_id": "example", "project_id": "example"})
for project_code_map in results:
    print(project_code_map.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectCodeMapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEnvironmentEntity

```python
project_environment = client.ProjectEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `str` | Yes |  |
| `allowed_origins` | `list` | Yes |  |
| `archived_at` | `str | None` | Yes |  |
| `base_url` | `str | None` | Yes |  |
| `base_url_changeable` | `bool` | Yes | Whether an update may send a new base_url. |
| `binary` | `str` | No |  |
| `conversation_only_messaging` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `desktop` | `dict | None` | Yes |  |
| `execution_mode` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `imessage_number` | `str | None` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `str` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `messaging_conversation` | `Any` | Yes |  |
| `messaging_problem` | `str | None` | Yes |  |
| `messaging_source` | `Any` | Yes |  |
| `messaging_tester_number` | `str | None` | Yes | One configured tester number. |
| `name` | `str` | Yes |  |
| `project_id` | `str` | Yes |  |
| `pull_request` | `dict | None` | Yes |  |
| `source_branch` | `str | None` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verify_network_connection_id` | `str | None` | Yes |  |
| `version` | `int` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch |
| --- | --- | --- | --- | --- | --- |
| `allowed_actions` | - | - | Yes | Yes | Yes |
| `allowed_origins` | - | - | Yes | Yes | Yes |
| `archived_at` | - | - | - | - | - |
| `base_url` | - | - | Yes | Yes | Yes |
| `base_url_changeable` | - | - | - | - | - |
| `binary` | - | - | - | - | - |
| `conversation_only_messaging` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `desktop` | - | - | Yes | - | - |
| `execution_mode` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `imessage_number` | - | - | Yes | Yes | Yes |
| `kind` | - | - | Yes | Yes | Yes |
| `lock_version` | - | - | - | - | - |
| `messaging_conversation` | - | - | - | - | - |
| `messaging_problem` | - | - | - | - | - |
| `messaging_source` | - | - | - | - | - |
| `messaging_tester_number` | - | - | Yes | Yes | Yes |
| `name` | - | - | - | Yes | Yes |
| `project_id` | - | - | - | - | - |
| `pull_request` | - | - | - | - | - |
| `source_branch` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `verify_network_connection_id` | - | - | - | Yes | Yes |
| `version` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectEnvironmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectEnvironment().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectEnvironmentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectEnvironment().list({"organization_id": "example", "project_id": "example"})
for project_environment in results:
    print(project_environment.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectEnvironmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectEnvironment().load({"id": "project_environment_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectEnvironmentEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ProjectEnvironment().patch({
    "id": "project_environment_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> ProjectEnvironmentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ProjectEnvironment().update({
    "id": "project_environment_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEnvironmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectFindingEntity

```python
project_finding = client.ProjectFinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `str | None` | No |  |
| `environment_name` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `last_seen_at` | `str` | Yes |  |
| `locked` | `bool` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `str` | Yes |  |
| `source` | `str` | Yes | The workflow that produced the finding |
| `source_title` | `str` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `verification` | `Any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `str` | Yes | Where the finding is reviewed within its source |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectFindingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectFinding().list({"organization_id": "example", "project_id": "example"})
for project_finding in results:
    print(project_finding.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectFindingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectFixtureEntity

```python
project_fixture = client.ProjectFixture()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `list` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` | Yes |  |
| `content_type` | `str` | Yes |  |
| `credential_ids` | `list` | Yes |  |
| `credentials` | `list` | Yes |  |
| `environment_ids` | `list` | Yes |  |
| `environments` | `list` | Yes |  |
| `fixtures` | `list` | Yes |  |
| `id` | `str` | No |  |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `persona_ids` | `list` | Yes |  |
| `personas` | `list` | Yes |  |
| `project` | `dict` | Yes |  |
| `sha256` | `str` | Yes |  |
| `url` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `assignments` | - | - | - | - | - | - |
| `byte_size` | - | - | - | - | - | - |
| `content_type` | - | - | - | - | - | - |
| `credential_ids` | - | - | - | Yes | Yes | - |
| `credentials` | - | - | - | - | - | - |
| `environment_ids` | - | - | - | Yes | Yes | - |
| `environments` | - | - | - | - | - | - |
| `fixtures` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `lock_version` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `pagination` | - | - | - | - | - | - |
| `permissions` | - | - | - | - | - | - |
| `persona_ids` | - | - | - | Yes | Yes | - |
| `personas` | - | - | - | - | - | - |
| `project` | - | - | - | - | - | - |
| `sha256` | - | - | - | - | - | - |
| `url` | - | - | - | - | - | - |
| `version` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectFixtureEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectFixture().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectFixtureEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectFixture().list({"organization_id": "example", "project_id": "example"})
for project_fixture in results:
    print(project_fixture.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectFixtureEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectFixture().load({"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectFixtureEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ProjectFixture().patch({
    "id": "project_fixture_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> ProjectFixtureEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectFixture().remove({"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id", "version": 1})
```

#### `update(reqdata, ctrl=None) -> ProjectFixtureEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ProjectFixture().update({
    "id": "project_fixture_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectFixtureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectIosAppEntity

```python
project_ios_app = client.ProjectIosApp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `dict` | Yes |  |
| `artifact_paths` | `list` | No |  |
| `description` | `str` | Yes |  |
| `image` | `str` | Yes |  |
| `ios` | `dict` | Yes |  |
| `launch_command` | `str` | No |  |
| `managed_binary` | `dict` | Yes |  |
| `platform` | `str` | No |  |
| `provider` | `str` | No |  |
| `setup_command` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectIosAppEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectIosApp().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectIosAppEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectMessagingConversationEntity

```python
project_messaging_conversation = client.ProjectMessagingConversation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `str` | Yes |  |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `environment_name` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `leased` | `bool` | Yes |  |
| `messages` | `list` | Yes |  |
| `reconciled_at` | `str | None` | Yes |  |
| `retirable` | `bool` | Yes |  |
| `seeded` | `bool` | Yes |  |
| `send_blocked_reason` | `str | None` | Yes |  |
| `send_disposition` | `str` | No |  |
| `send_error` | `str | None` | No |  |
| `tester_number` | `str` | Yes |  |
| `unknown_send` | `bool` | Yes |  |
| `verify_environment_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectMessagingConversationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectMessagingConversation().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "assistant_number": "example_assistant_number",  # str
    "tester_number": "example_tester_number",  # str
    "verify_environment_id": "example_verify_environment_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> ProjectMessagingConversationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectMessagingConversation().load({"id": "project_messaging_conversation_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectMessagingConversationEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ProjectMessagingConversation().patch({
    "id": "project_messaging_conversation_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> ProjectMessagingConversationEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ProjectMessagingConversation().update({
    "id": "project_messaging_conversation_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectMessagingConversationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectOverviewMetricEntity

```python
project_overview_metric = client.ProjectOverviewMetric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectOverviewMetricEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectOverviewMetric().list({"organization_id": "example", "project_id": "example"})
for project_overview_metric in results:
    print(project_overview_metric.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectOverviewMetricEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectOverviewPullRequestEntity

```python
project_overview_pull_request = client.ProjectOverviewPullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `str` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `str | None` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `str | None` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` | Yes |  |
| `head_sha` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `latest_created_at` | `str | None` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `str | None` | Yes |  |
| `latest_reason` | `str | None` | Yes |  |
| `latest_run_id` | `str | None` | Yes |  |
| `latest_state` | `str | None` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `str | None` | Yes |  |
| `project_slug` | `str | None` | Yes |  |
| `provider` | `str` | Yes |  |
| `repository_id` | `str` | Yes |  |
| `request_label` | `str` | Yes |  |
| `source_branch` | `str | None` | Yes |  |
| `source_repository` | `str | None` | Yes |  |
| `source_url` | `str | None` | Yes |  |
| `state` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `web_path` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectOverviewPullRequestEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectOverviewPullRequest().list({"organization_id": "example", "project_id": "example"})
for project_overview_pull_request in results:
    print(project_overview_pull_request.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectOverviewPullRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectProductMapEntity

```python
project_product_map = client.ProjectProductMap()
```

### Operations

#### `create(reqdata, ctrl=None) -> ProjectProductMapEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> ProjectProductMapEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectProductMapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectRecordingEntity

```python
project_recording = client.ProjectRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `draft` | `Any` | Yes | Present once drafted. |
| `environment_id` | `str` | Yes | The project environment the browser opens. |
| `error` | `str | None` | Yes |  |
| `event_count` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `persona_id` | `str` | Yes | The project persona the journey acts as. |
| `phase` | `str` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `bool` | Yes |  |
| `start_path` | `str` | No | A path on the environment to start at, such as /settings. |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectRecordingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectRecording().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "environment_id": "example_environment_id",  # str
    "persona_id": "example_persona_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> ProjectRecordingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectRecording().load({"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> ProjectRecordingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectRecording().remove({"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRecordingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectRunPlanEntity

```python
project_run_plan = client.ProjectRunPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `str | None` | Yes |  |
| `base_url` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dependencies` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `identity_probe` | `dict | None` | Yes |  |
| `kind` | `str | None` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `nodes` | `list` | Yes |  |
| `preview` | `Any` | Yes |  |
| `project_id` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectRunPlanEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectRunPlan().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "dependencies": [],  # list
    "identity_probe": {},  # dict | None
    "name": "example_name",  # str
    "nodes": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectRunPlanEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectRunPlan().list({"organization_id": "example", "project_id": "example"})
for project_run_plan in results:
    print(project_run_plan.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectRunPlanEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectRunPlan().load({"id": "project_run_plan_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectRunPlanEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ProjectRunPlan().patch({
    "id": "project_run_plan_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> ProjectRunPlanEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ProjectRunPlan().update({
    "id": "project_run_plan_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRunPlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectRunScheduleEntity

```python
project_run_schedule = client.ProjectRunSchedule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `dict` | Yes |  |
| `cron_expression` | `str | None` | No |  |
| `environment_id` | `str` | Yes | Project environment slug or public ID. |
| `environment_name` | `str` | No |  |
| `history` | `list` | Yes |  |
| `id` | `str` | Yes |  |
| `labels` | `list` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `next_run_at` | `str` | Yes |  |
| `notification_channel` | `str` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` | Yes |  |
| `selection_mode` | `str` | Yes |  |
| `slack_subscription_id` | `str | None` | No |  |
| `source_scenario_id` | `str | None` | No |  |
| `state` | `str` | Yes |  |
| `time_of_day` | `str` | Yes |  |
| `time_zone` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch |
| --- | --- | --- | --- | --- | --- |
| `credential_ids` | - | - | - | Yes | Yes |
| `cron_expression` | - | - | - | - | - |
| `environment_id` | - | - | - | Yes | Yes |
| `environment_name` | - | - | - | - | - |
| `history` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `labels` | - | - | - | Yes | Yes |
| `lock_version` | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes |
| `next_run_at` | - | - | - | - | - |
| `notification_channel` | - | - | - | - | - |
| `scenario_count` | - | - | - | - | - |
| `selection_mode` | - | - | - | Yes | Yes |
| `slack_subscription_id` | - | - | - | - | - |
| `source_scenario_id` | - | - | - | - | - |
| `state` | - | - | - | Yes | Yes |
| `time_of_day` | - | - | - | Yes | Yes |
| `time_zone` | - | - | - | Yes | Yes |
| `version` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> ProjectRunScheduleEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ProjectRunSchedule().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "credential_ids": {},  # dict
    "environment_id": "example_environment_id",  # str
    "labels": [],  # list
    "name": "example_name",  # str
    "selection_mode": "example_selection_mode",  # str
    "state": "example_state",  # str
    "time_of_day": "example_time_of_day",  # str
    "time_zone": "example_time_zone",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ProjectRunScheduleEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectRunSchedule().list({"organization_id": "example", "project_id": "example"})
for project_run_schedule in results:
    print(project_run_schedule.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectRunScheduleEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectRunSchedule().load({"id": "project_run_schedule_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> ProjectRunScheduleEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ProjectRunSchedule().patch({
    "id": "project_run_schedule_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> ProjectRunScheduleEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ProjectRunSchedule().update({
    "id": "project_run_schedule_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRunScheduleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectScenarioOptionEntity

```python
project_scenario_option = client.ProjectScenarioOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `list` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `personas` | `list` | Yes |  |
| `project` | `dict` | Yes |  |
| `scenario_states` | `dict` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `list` | Yes |  |
| `schedule_options` | `Any` | No |  |
| `schedules` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectScenarioOptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectScenarioOption().list({"organization_id": "example", "project_id": "example"})
for project_scenario_option in results:
    print(project_scenario_option.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectScenarioOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectScenarioRowEntity

```python
project_scenario_row = client.ProjectScenarioRow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `int` | Yes |  |
| `dependency_count` | `int` | Yes |  |
| `health` | `dict` | Yes |  |
| `id` | `str` | Yes |  |
| `labels` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `persona_id` | `str` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `step_count` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectScenarioRowEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectScenarioRow().list({"organization_id": "example", "project_id": "example"})
for project_scenario_row in results:
    print(project_scenario_row.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectScenarioRowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectSettingEntity

```python
project_setting = client.ProjectSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `list` | Yes |  |
| `messaging_conversations` | `list` | Yes |  |
| `messaging_enabled` | `bool` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `project` | `dict` | Yes |  |
| `tester_numbers` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectSettingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectSetting().list({"organization_id": "example", "project_id": "example"})
for project_setting in results:
    print(project_setting.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PullRequestEntity

```python
pull_request = client.PullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `list` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `str` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `Any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `list` | Yes |  |
| `head_sha` | `str` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `str` | No |  |
| `idempotency_key` | `str` | Yes |  |
| `imessage_number` | `str` | No | International destination of this exact deployed commit. |
| `number` | `int` | No |  |
| `pagination` | `dict` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `str | None` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Any` | No |  |
| `project_id` | `str` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `dict` | Yes |  |
| `repository_id` | `str` | No |  |
| `runs` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> PullRequestEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PullRequest().create({
    "organization_id": "example_organization_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
})
```

#### `load(reqmatch, ctrl=None) -> PullRequestEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PullRequest().load({"id": "pull_request_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> PullRequestEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PullRequestSettingEntity

```python
pull_request_setting = client.PullRequestSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `str | None` | No |  |
| `app_service_id` | `str | None` | No |  |
| `bots` | `list` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `dict | None` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `Any` | Yes |  |
| `demo_videos` | `bool` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `str | None` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `str` | No |  |
| `enabled` | `bool` | Yes | Test PRs automatically. |
| `environment` | `str` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `list` | Yes |  |
| `github_check_enabled` | `bool` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `list` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `str` | Yes |  |
| `imessage_comment_prefix` | `str | None` | Yes |  |
| `imessage_number` | `str | None` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `str` | Yes |  |
| `limits` | `dict` | Yes |  |
| `link_pattern` | `str | None` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `str | None` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` | No |  |
| `messaging_enabled` | `bool` | Yes |  |
| `messaging_tester_number` | `str | None` | Yes | One configured tester number. |
| `non_product_paths` | `list` | No |  |
| `permissions` | `dict` | Yes |  |
| `pr_check` | `bool` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `str` | No |  |
| `preview_comment_authors` | `list` | No |  |
| `preview_comment_pattern` | `str` | No |  |
| `preview_comment_wildcard` | `str | None` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `str | None` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `list` | Yes |  |
| `previews` | `str` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `str` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `list` | Yes |  |
| `provider` | `str` | Yes |  |
| `repositories` | `list` | Yes |  |
| `repository` | `str` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `str` | Yes |  |
| `repository_kind` | `str` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `Any` | Yes |  |
| `service` | `str | None` | Yes | composal: the public service the browsers open. |
| `settings` | `list` | Yes |  |
| `setup` | `Any` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `dict` | Yes | The answers a new setup starts from |
| `source_repository` | `str` | Yes |  |
| `target_mode` | `str` | Yes |  |
| `tester_numbers` | `list` | Yes |  |
| `trigger_label` | `str` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` | No |  |
| `trigger_on_label` | `bool` | No |  |
| `trigger_on_push` | `bool` | No |  |
| `trigger_on_ready` | `bool` | No |  |
| `triggers` | `dict` | Yes | When runs start. |
| `verify_environment_id` | `str` | Yes |  |
| `write_scenarios` | `bool` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Operations

#### `create(reqdata, ctrl=None) -> PullRequestSettingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PullRequestSetting().create({
    "organization_id": "example_organization_id",  # str
    "bots": [],  # list
    "demo_videos": True,  # bool
    "deployment": "example_deployment",  # str | None
    "enabled": True,  # bool
    "environment": "example_environment",  # str
    "imessage_comment_prefix": "example_imessage_comment_prefix",  # str | None
    "imessage_number": "example_imessage_number",  # str | None
    "imessage_number_source": "example_imessage_number_source",  # str
    "limits": {},  # dict
    "link_pattern": "example_link_pattern",  # str | None
    "links": "example_links",  # str | None
    "messaging_tester_number": "example_messaging_tester_number",  # str | None
    "pr_check": True,  # bool
    "preview_comment_wildcard": "example_preview_comment_wildcard",  # str | None
    "preview_profile": "example_preview_profile",  # str | None
    "previews": "example_previews",  # str
    "project_id": "example_project_id",  # str
    "provider": "example_provider",  # str
    "repository": "example_repository",  # str
    "repository_id": "example_repository_id",  # str
    "repository_kind": "example_repository_kind",  # str
    "service": "example_service",  # str | None
    "target_mode": "example_target_mode",  # str
    "trigger_label": "example_trigger_label",  # str
    "triggers": {},  # dict
    "verify_environment_id": "example_verify_environment_id",  # str
    "write_scenarios": True,  # bool
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PullRequestSettingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PullRequestSetting().list({"organization_id": "example"})
for pull_request_setting in results:
    print(pull_request_setting.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PullRequestSettingAddRepositoryEntity

```python
pull_request_setting_add_repository = client.PullRequestSettingAddRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `str` | Yes |  |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> PullRequestSettingAddRepositoryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PullRequestSettingAddRepository().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "repositories": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PullRequestSettingDetectCommentEntity

```python
pull_request_setting_detect_comment = client.PullRequestSettingDetectComment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `list` | No | The bots answer |
| `deployment` | `str` | No | The deployment answer |
| `example_url` | `str` | No |  |
| `imessage_comment_prefix` | `str` | No |  |
| `imessage_number` | `str | None` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `str` | Yes |  |
| `link_pattern` | `str` | No | The link_pattern answer |
| `project_id` | `str` | Yes | Project slug or ID. |
| `provider` | `str` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `str` | No | Repository slug, ID or owner/name. |
| `request_number` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> PullRequestSettingDetectCommentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PullRequestSettingDetectComment().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecorderEntity

```python
recorder = client.Recorder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `slug` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> RecorderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Recorder().load({"organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecorderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistryEntity

```python
registry = client.Registry()
```

### Operations

#### `load(reqmatch, ctrl=None) -> RegistryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistryV2Entity

```python
registry_v2 = client.RegistryV2()
```

### Operations

#### `create(reqdata, ctrl=None) -> RegistryV2Entity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistryV2Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RelayAgentLocalThreadEntity

```python
relay_agent_local_thread = client.RelayAgentLocalThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> RelayAgentLocalThreadEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.RelayAgentLocalThread().remove({"id": "relay_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RelayAgentLocalThreadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportReplayEntity

```python
report_replay = client.ReportReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `str` | Yes |  |
| `generated_at` | `str` | Yes |  |
| `id` | `str` | No |  |
| `recording` | `dict` | Yes |  |
| `replay_steps` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ReportReplayEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ReportReplay().load({"id": "report_replay_id", "exploration_id": "exploration_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportReplayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportScenarioEntity

```python
report_scenario = client.ReportScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `str` | Yes |  |
| `goal` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `mode` | `str` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `project_id` | `str | None` | Yes |  |
| `related_explorations` | `list` | Yes |  |
| `report` | `dict` | Yes |  |
| `saves_scenarios` | `bool` | Yes |  |
| `scenario_generation` | `dict` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ReportScenarioEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ReportScenario().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportScenarioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RunScenarioRunEntity

```python
run_scenario_run = client.RunScenarioRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> RunScenarioRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

#### `update(reqdata, ctrl=None) -> RunScenarioRunEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunScenarioRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RunScheduleOptionEntity

```python
run_schedule_option = client.RunScheduleOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RunScheduleOptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.RunScheduleOption().list({"organization_id": "example", "project_id": "example"})
for run_schedule_option in results:
    print(run_schedule_option.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunScheduleOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RunSearchEntity

```python
run_search = client.RunSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> RunSearchEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.RunSearch().load({"organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunSearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RunUpdateEntity

```python
run_update = client.RunUpdate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `str` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `str | None` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `str | None` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` | Yes |  |
| `head_sha` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `latest_created_at` | `str | None` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `str | None` | Yes |  |
| `latest_reason` | `str | None` | Yes |  |
| `latest_run_id` | `str | None` | Yes |  |
| `latest_state` | `str | None` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `str | None` | Yes |  |
| `project_slug` | `str | None` | Yes |  |
| `provider` | `str` | Yes |  |
| `repository_id` | `str` | Yes |  |
| `request_label` | `str` | Yes |  |
| `source_branch` | `str | None` | Yes |  |
| `source_repository` | `str | None` | Yes |  |
| `source_url` | `str | None` | Yes |  |
| `state` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `web_path` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RunUpdateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.RunUpdate().list({"organization_id": "example"})
for run_update in results:
    print(run_update.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunUpdateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScenarioRevisionEntity

```python
scenario_revision = client.ScenarioRevision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `batch` | `str` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `str` | Yes |  |
| `definition` | `dict` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `str` | Yes |  |
| `source` | `str` | Yes | The client the save came through. |
| `user` | `Any` | Yes | Null when a system job saved the Scenario. |
| `version` | `int` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ScenarioRevisionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ScenarioRevision().list({"organization_id": "example", "project_id": "example", "scenario_id": "example"})
for scenario_revision in results:
    print(scenario_revision.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRevisionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScenarioRunLessonEntity

```python
scenario_run_lesson = client.ScenarioRunLesson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `str` | Yes |  |
| `title` | `str` | No | Defaults to the Scenario's name. |
| `workaround` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ScenarioRunLessonEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ScenarioRunLesson().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "run_id": "example_run_id",  # str
    "scenario_run_id": "example_scenario_run_id",  # str
    "finding": "example_finding",  # str
    "workaround": "example_workaround",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRunLessonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScenarioRunScenarioEditEntity

```python
scenario_run_scenario_edit = client.ScenarioRunScenarioEdit()
```

### Operations

#### `create(reqdata, ctrl=None) -> ScenarioRunScenarioEditEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRunScenarioEditEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ServiceEndpointEntity

```python
service_endpoint = client.ServiceEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> ServiceEndpointEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ServiceEndpoint().create({
    "app_id": "example_app_id",  # str
    "service_id": "example_service_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ServiceEndpointEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ServiceEndpoint().list({"app_id": "example", "service_id": "example"})
for service_endpoint in results:
    print(service_endpoint.data_get())
```

#### `load(reqmatch, ctrl=None) -> ServiceEndpointEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ServiceEndpoint().load({"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"})
```

#### `patch(reqdata, ctrl=None) -> ServiceEndpointEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.ServiceEndpoint().patch({
    "id": "service_endpoint_id",
    "app_id": "app_id",
    "service_id": "service_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> ServiceEndpointEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ServiceEndpoint().remove({"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"})
```

#### `update(reqdata, ctrl=None) -> ServiceEndpointEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ServiceEndpoint().update({
    "id": "service_endpoint_id",
    "app_id": "app_id",
    "service_id": "service_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceEndpointEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SitePreviewEntity

```python
site_preview = client.SitePreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `str | None` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `str | None` | Yes |  |
| `url` | `str` | Yes | The address as it will be saved |

### Operations

#### `load(reqmatch, ctrl=None) -> SitePreviewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SitePreview().load({"organization_id": "organization_id", "url": "url"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SitePreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SlackChannelEntity

```python
slack_channel = client.SlackChannel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `is_member` | `bool` | Yes |  |
| `is_private` | `bool` | Yes |  |
| `is_slack_connect` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `published` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SlackChannelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SlackChannel().list({"agent_id": "example", "organization_id": "example"})
for slack_channel in results:
    print(slack_channel.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SlackChannelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SparkAgentLocalThreadEntity

```python
spark_agent_local_thread = client.SparkAgentLocalThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `archived` | `bool` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `bool` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `bool` | No |  |
| `can_end` | `bool` | Yes |  |
| `can_interrupt` | `bool` | Yes |  |
| `can_send` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `delivery` | `dict` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `str` | Yes |  |
| `device_name` | `str` | Yes |  |
| `diagnostic_code` | `str` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `Any` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `full_title` | `str` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `str` | Yes |  |
| `key` | `str` | Yes |  |
| `last_activity_at` | `str | None` | Yes |  |
| `native_thread_id` | `str` | Yes |  |
| `parent_conversation_id` | `str | None` | Yes |  |
| `provider` | `str` | Yes |  |
| `references` | `dict` | Yes |  |
| `relay_disconnected_at` | `str | None` | No |  |
| `relay_participant` | `dict` | Yes |  |
| `result` | `Any` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `dict | bool` | No |  |
| `section` | `str` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `str` | Yes |  |
| `status` | `str | None` | Yes | What the native thread is doing. |
| `task_configured` | `bool` | Yes |  |
| `thread_id` | `str` | Yes |  |
| `title` | `str` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Operations

#### `create(reqdata, ctrl=None) -> SparkAgentLocalThreadEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.SparkAgentLocalThread().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "device_id": "example_device_id",  # str
    "key": "example_key",  # str
    "provider": "example_provider",  # str
    "thread_id": "example_thread_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> SparkAgentLocalThreadEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SparkAgentLocalThread().load({"id": "spark_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> SparkAgentLocalThreadEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SparkAgentLocalThreadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StaticSiteEntity

```python
static_site = client.StaticSite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `str | None` | Yes |  |
| `cdn_hostname` | `str` | Yes |  |
| `cdn_url` | `str` | Yes |  |
| `cname_target` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `default_url` | `str` | Yes |  |
| `description` | `str | None` | Yes |  |
| `error_document` | `str | None` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `hosted_app_id` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `index_document` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `provisioned_at` | `str | None` | Yes |  |
| `region` | `str | None` | Yes |  |
| `replication_regions` | `list` | Yes |  |
| `repository_id` | `str | None` | Yes |  |
| `slug` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `active_deployment_id` | - | - | - | - | - | - |
| `cdn_hostname` | - | - | - | - | - | - |
| `cdn_url` | - | - | - | - | - | - |
| `cname_target` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `default_url` | - | - | - | - | - | - |
| `description` | - | - | Yes | - | - | - |
| `error_document` | - | - | Yes | - | - | - |
| `failure_message` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | Yes | - | - | - |
| `id` | - | - | - | - | - | - |
| `index_document` | - | - | Yes | - | - | - |
| `name` | - | - | - | - | - | - |
| `organization_id` | - | - | - | - | - | - |
| `provisioned` | - | - | - | - | - | - |
| `provisioned_at` | - | - | - | - | - | - |
| `region` | - | - | Yes | - | - | - |
| `replication_regions` | - | - | Yes | - | - | - |
| `repository_id` | - | - | Yes | - | - | - |
| `slug` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> StaticSiteEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.StaticSite().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[StaticSiteEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.StaticSite().list({"organization_id": "example"})
for static_site in results:
    print(static_site.data_get())
```

#### `load(reqmatch, ctrl=None) -> StaticSiteEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.StaticSite().load({"id": "static_site_id"})
```

#### `patch(reqdata, ctrl=None) -> StaticSiteEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.StaticSite().patch({
    "id": "static_site_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> StaticSiteEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.StaticSite().remove({"id": "static_site_id"})
```

#### `update(reqdata, ctrl=None) -> StaticSiteEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.StaticSite().update({
    "id": "static_site_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StaticSiteDeploymentEntity

```python
static_site_deployment = client.StaticSiteDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `str | None` | Yes |  |
| `activated_at_label` | `str | None` | Yes |  |
| `commit_sha` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `created_at_label` | `str | None` | Yes |  |
| `creator_user_id` | `str | None` | Yes |  |
| `deploy_slug` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `file_count` | `int` | Yes |  |
| `file_count_label` | `str` | Yes |  |
| `finished_at` | `str | None` | Yes |  |
| `finished_at_label` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `is_active` | `bool` | Yes |  |
| `source_ref` | `str | None` | Yes |  |
| `started_at` | `str | None` | Yes |  |
| `started_at_label` | `str | None` | Yes |  |
| `static_site_id` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `total_bytes` | `int` | Yes |  |
| `total_bytes_label` | `str` | Yes |  |
| `trigger_kind` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `updated_at_label` | `str | None` | Yes |  |
| `uploaded_at` | `str | None` | Yes |  |
| `uploaded_at_label` | `str | None` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> StaticSiteDeploymentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.StaticSiteDeployment().create({
    "static_site_id": "example_static_site_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[StaticSiteDeploymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.StaticSiteDeployment().list({"static_site_id": "example"})
for static_site_deployment in results:
    print(static_site_deployment.data_get())
```

#### `load(reqmatch, ctrl=None) -> StaticSiteDeploymentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.StaticSiteDeployment().load({"id": "static_site_deployment_id", "static_site_id": "static_site_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteDeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StaticSiteDomainEntity

```python
static_site_domain = client.StaticSiteDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dns_mode` | `str` | Yes |  |
| `dns_status` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `hosted_app_id` | `str | None` | Yes |  |
| `hostname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `last_checked_at` | `str | None` | Yes |  |
| `record_name` | `str | None` | Yes |  |
| `record_type` | `str | None` | Yes |  |
| `record_value` | `str | None` | Yes |  |
| `redirect_to` | `str | None` | Yes |  |
| `static_site_id` | `str | None` | Yes |  |
| `target_kind` | `str` | Yes |  |
| `tls_status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verification_status` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `app_environment_id` | - | - | - | - | - | - |
| `app_service_id` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `dns_mode` | - | - | Yes | - | - | - |
| `dns_status` | - | - | - | - | - | - |
| `failure_message` | - | - | - | - | - | - |
| `hosted_app_id` | - | - | - | - | - | - |
| `hostname` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `kind` | - | - | Yes | - | - | - |
| `last_checked_at` | - | - | - | - | - | - |
| `record_name` | - | - | - | - | - | - |
| `record_type` | - | - | - | - | - | - |
| `record_value` | - | - | - | - | - | - |
| `redirect_to` | - | - | Yes | - | - | - |
| `static_site_id` | - | - | - | - | - | - |
| `target_kind` | - | - | - | - | - | - |
| `tls_status` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `verification_status` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> StaticSiteDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.StaticSiteDomain().create({
    "static_site_id": "example_static_site_id",  # str
    "hostname": "example_hostname",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[StaticSiteDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.StaticSiteDomain().list({"static_site_id": "example"})
for static_site_domain in results:
    print(static_site_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> StaticSiteDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.StaticSiteDomain().load({"id": "static_site_domain_id", "static_site_id": "static_site_id"})
```

#### `patch(reqdata, ctrl=None) -> StaticSiteDomainEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.StaticSiteDomain().patch({
    "id": "static_site_domain_id",
    "static_site_id": "static_site_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> StaticSiteDomainEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.StaticSiteDomain().remove({"id": "static_site_domain_id", "static_site_id": "static_site_id"})
```

#### `update(reqdata, ctrl=None) -> StaticSiteDomainEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.StaticSiteDomain().update({
    "id": "static_site_domain_id",
    "static_site_id": "static_site_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubscriptionModelEntity

```python
subscription_model = client.SubscriptionModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `provider` | `str` | Yes |  |
| `reasoning` | `list` | No | Effort levels this plan model accepts. |
| `speeds` | `list` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SubscriptionModelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SubscriptionModel().list({"agent_id": "example", "organization_id": "example", "profile_id": "example"})
for subscription_model in results:
    print(subscription_model.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThreadPreviewEntity

```python
thread_preview = client.ThreadPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `str | None` | Yes |  |
| `port` | `int` | Yes |  |
| `url` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ThreadPreviewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ThreadPreview().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "thread_id": "example_thread_id",  # str
    "port": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreadPreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerificationProjectCredentialEntity

```python
verification_project_credential = client.VerificationProjectCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `dict | None` | No |  |
| `browser_session` | `str` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `str | None` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `str` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | No | Select the Composal-managed Google test account when available. |
| `configured` | `bool` | Yes |  |
| `cookies` | `str` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `dict` | Yes |  |
| `description` | `str | None` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `list` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `str` | Yes |  |
| `identity_provider` | `dict | None` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `str | None` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `str` | Yes |  |
| `login_url` | `str` | Yes | Optional sign-in path or URL. |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `oidc` | `dict` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `str` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `str` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `str` | Yes |  |
| `provider_guidance` | `str` | Yes |  |
| `remove_browser_authentication` | `bool` | No |  |
| `remove_totp` | `bool` | No |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `str | None` | Yes |  |
| `status` | `str` | Yes |  |
| `totp_secret` | `str` | No | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `str` | Yes |  |
| `username` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `browser_authentication` | - | - | - | - | - | - |
| `browser_session` | - | - | - | - | - | - |
| `composal_address` | - | - | - | - | - | - |
| `composal_inbox` | - | - | - | - | - | - |
| `composal_inbox_user` | - | - | - | - | - | - |
| `composal_managed_google` | - | - | - | - | - | - |
| `configured` | - | - | - | - | - | - |
| `cookies` | - | - | - | - | - | - |
| `credential_keys` | - | - | - | - | - | - |
| `description` | - | - | Yes | Yes | Yes | - |
| `email_link_auth_origins` | - | - | Yes | Yes | Yes | - |
| `has_inbox` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `identity_provider` | - | - | - | - | - | - |
| `instructions` | - | - | Yes | Yes | Yes | - |
| `login_method` | - | - | - | Yes | Yes | - |
| `login_url` | - | - | Yes | Yes | Yes | - |
| `managed` | - | - | - | - | - | - |
| `mfa_enabled` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `oidc` | - | - | - | - | - | - |
| `passkey` | - | - | - | - | - | - |
| `password` | - | - | - | - | - | - |
| `project_id` | - | - | - | - | - | - |
| `provider_guidance` | - | - | - | - | - | - |
| `remove_browser_authentication` | - | - | - | - | - | - |
| `remove_totp` | - | - | - | - | - | - |
| `sign_in_verified` | - | - | - | - | - | - |
| `sign_in_verified_at` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `totp_secret` | - | - | - | - | - | - |
| `updated_at` | - | - | - | - | - | - |
| `username` | - | - | Yes | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> VerificationProjectCredentialEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerificationProjectCredential().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "login_method": "example_login_method",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[VerificationProjectCredentialEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VerificationProjectCredential().list({"organization_id": "example", "project_id": "example"})
for verification_project_credential in results:
    print(verification_project_credential.data_get())
```

#### `load(reqmatch, ctrl=None) -> VerificationProjectCredentialEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VerificationProjectCredential().load({"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> VerificationProjectCredentialEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.VerificationProjectCredential().patch({
    "id": "verification_project_credential_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> VerificationProjectCredentialEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.VerificationProjectCredential().remove({"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> VerificationProjectCredentialEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.VerificationProjectCredential().update({
    "id": "verification_project_credential_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectCredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerificationProjectPersonaEntity

```python
verification_project_persona = client.VerificationProjectPersona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `str` | Yes |  |
| `archived_at` | `str | None` | Yes |  |
| `capabilities` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `credential_id` | `str | None` | Yes | The credential this persona signs in with. |
| `goals` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `project_id` | `str` | Yes |  |
| `role` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `access_mode` | - | - | Yes | Yes | Yes | - |
| `archived_at` | - | - | - | - | - | - |
| `capabilities` | - | - | Yes | Yes | Yes | - |
| `created_at` | - | - | - | - | - | - |
| `credential_id` | - | - | Yes | Yes | Yes | - |
| `goals` | - | - | Yes | Yes | Yes | - |
| `id` | - | - | - | - | - | - |
| `lock_version` | - | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes | - |
| `project_id` | - | - | - | - | - | - |
| `role` | - | - | - | Yes | Yes | - |
| `updated_at` | - | - | - | - | - | - |
| `version` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> VerificationProjectPersonaEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerificationProjectPersona().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
    "role": "example_role",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[VerificationProjectPersonaEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VerificationProjectPersona().list({"organization_id": "example", "project_id": "example"})
for verification_project_persona in results:
    print(verification_project_persona.data_get())
```

#### `load(reqmatch, ctrl=None) -> VerificationProjectPersonaEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VerificationProjectPersona().load({"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> VerificationProjectPersonaEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.VerificationProjectPersona().patch({
    "id": "verification_project_persona_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> VerificationProjectPersonaEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.VerificationProjectPersona().remove({"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> VerificationProjectPersonaEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.VerificationProjectPersona().update({
    "id": "verification_project_persona_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectPersonaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerificationProjectRunEntity

```python
verification_project_run = client.VerificationProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `str | None` | Yes |  |
| `approved_digest` | `str | None` | Yes |  |
| `archived_at` | `str | None` | Yes |  |
| `available_tests` | `list` | Yes |  |
| `can_archive` | `bool` | Yes |  |
| `can_restore` | `bool` | Yes |  |
| `can_start_another_run` | `bool` | Yes |  |
| `cleanup_state` | `str` | Yes |  |
| `concurrency` | `int` | Yes |  |
| `created_at` | `str` | Yes |  |
| `creator_name` | `str | None` | Yes |  |
| `definition_mode` | `str` | Yes |  |
| `environment_id` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `outcome` | `str | None` | Yes |  |
| `permissions` | `dict` | Yes |  |
| `plan_digest` | `str | None` | Yes |  |
| `preparation_error_code` | `str | None` | Yes |  |
| `progress` | `dict` | Yes |  |
| `project` | `dict` | Yes |  |
| `project_id` | `str` | Yes |  |
| `pull_request` | `Any` | Yes |  |
| `queued_at` | `str | None` | Yes |  |
| `run` | `dict` | Yes |  |
| `run_plan_id` | `str | None` | No |  |
| `scenario_runs` | `list` | Yes |  |
| `source_run_id` | `str | None` | Yes |  |
| `source_versions` | `list | None` | Yes |  |
| `start_when_prepared` | `bool` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `str` | Yes |  |
| `target_snapshot` | `dict` | Yes |  |
| `title` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verifier_preferences_snapshot` | `dict` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `str` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Operations

#### `create(reqdata, ctrl=None) -> VerificationProjectRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[VerificationProjectRunEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VerificationProjectRun().list({"organization_id": "example", "project_id": "example"})
for verification_project_run in results:
    print(verification_project_run.data_get())
```

#### `load(reqmatch, ctrl=None) -> VerificationProjectRunEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VerificationProjectRun().load({"id": "verification_project_run_id", "organization_id": "organization_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerificationProjectScenarioEntity

```python
verification_project_scenario = client.VerificationProjectScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `dict` | No |  |
| `allowed_actions` | `str` | Yes |  |
| `archived_at` | `str | None` | Yes |  |
| `cleanup` | `list` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `str` | Yes |  |
| `dependencies` | `list` | Yes |  |
| `fixtures` | `list` | No | Files upload steps choose, ordered by name. |
| `health` | `dict` | Yes |  |
| `id` | `str` | Yes |  |
| `identity_probe` | `Any` | No |  |
| `if` | `str | None` | No | A documented subset of Actions expressions. |
| `labels` | `list` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `Any` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `on` | `Any` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `list` | Yes |  |
| `persona_id` | `str` | Yes |  |
| `primary_actor` | `str | None` | No |  |
| `project_id` | `str` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `starting_conditions` | `str | None` | Yes |  |
| `steps` | `list` | Yes |  |
| `triggers` | `list` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch |
| --- | --- | --- | --- | --- | --- |
| `actors` | - | - | - | - | - |
| `allowed_actions` | - | - | Yes | Yes | Yes |
| `archived_at` | - | - | - | - | - |
| `cleanup` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `dependencies` | - | - | Yes | Yes | Yes |
| `fixtures` | - | - | - | - | - |
| `health` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `identity_probe` | - | - | - | - | - |
| `if` | - | - | - | - | - |
| `labels` | - | - | Yes | Yes | Yes |
| `last_revision` | - | - | - | - | - |
| `lock_version` | - | - | - | - | - |
| `name` | - | - | - | Yes | Yes |
| `on` | - | - | - | - | - |
| `outcomes` | - | - | Yes | Yes | Yes |
| `persona_id` | - | - | Yes | Yes | Yes |
| `primary_actor` | - | - | - | - | - |
| `project_id` | - | - | - | - | - |
| `selectable_for_run` | - | - | - | - | - |
| `starting_conditions` | - | - | Yes | Yes | Yes |
| `steps` | - | - | Yes | Yes | Yes |
| `triggers` | - | - | Yes | Yes | Yes |
| `updated_at` | - | - | - | - | - |
| `version` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> VerificationProjectScenarioEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerificationProjectScenario().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[VerificationProjectScenarioEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VerificationProjectScenario().list({"organization_id": "example", "project_id": "example"})
for verification_project_scenario in results:
    print(verification_project_scenario.data_get())
```

#### `load(reqmatch, ctrl=None) -> VerificationProjectScenarioEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VerificationProjectScenario().load({"id": "verification_project_scenario_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> VerificationProjectScenarioEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.VerificationProjectScenario().patch({
    "id": "verification_project_scenario_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> VerificationProjectScenarioEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.VerificationProjectScenario().update({
    "id": "verification_project_scenario_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectScenarioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerifyAppDomainEntity

```python
verify_app_domain = client.VerifyAppDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> VerifyAppDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerifyAppDomain().create({
    "app_id": "example_app_id",  # str
    "id": "example_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyAppDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerifyBrowserSessionEntity

```python
verify_browser_session = client.VerifyBrowserSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | Yes | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | No | Required when opening a browser for a new credential. |
| `origin` | `str` | Yes |  |
| `project_id` | `str` | Yes | The project (slug or ID) whose credential receives the session. |
| `status` | `str` | Yes |  |
| `url` | `str` | Yes |  |
| `viewer_url` | `str | None` | Yes | Owner-only bearer link. |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `account_id` | - | Yes | - |
| `expires_at` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | - |
| `origin` | - | - | - |
| `project_id` | - | - | - |
| `status` | - | - | - |
| `url` | - | - | - |
| `viewer_url` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> VerifyBrowserSessionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerifyBrowserSession().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "url": "example_url",  # str
})
```

#### `load(reqmatch, ctrl=None) -> VerifyBrowserSessionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VerifyBrowserSession().load({"id": "verify_browser_session_id", "organization_id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> VerifyBrowserSessionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.VerifyBrowserSession().remove({"id": "verify_browser_session_id", "organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyBrowserSessionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerifyStaticSiteDomainEntity

```python
verify_static_site_domain = client.VerifyStaticSiteDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `str | None` | Yes |  |
| `app_service_id` | `str | None` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dns_mode` | `str` | Yes |  |
| `dns_status` | `str` | Yes |  |
| `failure_message` | `str | None` | Yes |  |
| `hosted_app_id` | `str | None` | Yes |  |
| `hostname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `last_checked_at` | `str | None` | Yes |  |
| `record_name` | `str | None` | Yes |  |
| `record_type` | `str | None` | Yes |  |
| `record_value` | `str | None` | Yes |  |
| `redirect_to` | `str | None` | Yes |  |
| `static_site_id` | `str | None` | Yes |  |
| `target_kind` | `str` | Yes |  |
| `tls_status` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `verification_status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> VerifyStaticSiteDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.VerifyStaticSiteDomain().create({
    "id": "example_id",  # str
    "static_site_id": "example_static_site_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyStaticSiteDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VersionLogEntity

```python
version_log = client.VersionLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `str` | Yes |  |
| `failure_phase` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `image_digest` | `str | None` | Yes |  |
| `image_reference` | `str | None` | Yes |  |
| `installer_version` | `str` | Yes |  |
| `ready_at` | `str | None` | Yes |  |
| `receipt` | `dict | None` | Yes |  |
| `safe_error` | `str | None` | Yes |  |
| `started_at` | `str | None` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VersionLogEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VersionLog().list({"binary_id": "example", "organization_id": "example", "version_id": "example", "project_id": "example"})
for version_log in results:
    print(version_log.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebBotAuthEntity

```python
web_bot_auth = client.WebBotAuth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `str` | Yes |  |
| `origin` | `str` | Yes |  |
| `signatures` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> WebBotAuthEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WebBotAuth().create({
    "origin": "example_origin",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebBotAuthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkflowRunStepEntity

```python
workflow_run_step = client.WorkflowRunStep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> WorkflowRunStepEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowRunStepEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkflowRunStopNoticeEntity

```python
workflow_run_stop_notice = client.WorkflowRunStopNotice()
```

### Operations

#### `create(reqdata, ctrl=None) -> WorkflowRunStopNoticeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowRunStopNoticeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkflowTriggerSkippedEntity

```python
workflow_trigger_skipped = client.WorkflowTriggerSkipped()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> WorkflowTriggerSkippedEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowTriggerSkippedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = ComposalSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "secrets": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

