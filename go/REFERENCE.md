# Composal Golang SDK Reference

Complete API reference for the Composal Golang SDK.


## ComposalSDK

### Constructor

```go
func NewComposalSDK(options map[string]any) *ComposalSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ComposalSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ComposalSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Agent(data map[string]any) ComposalEntityBase`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentAttachment(data map[string]any) ComposalEntityBase`

Create a new `AgentAttachment` entity instance. Pass `nil` for no initial data.

#### `AgentAutomation(data map[string]any) ComposalEntityBase`

Create a new `AgentAutomation` entity instance. Pass `nil` for no initial data.

#### `AgentAvatar(data map[string]any) ComposalEntityBase`

Create a new `AgentAvatar` entity instance. Pass `nil` for no initial data.

#### `AgentCommand(data map[string]any) ComposalEntityBase`

Create a new `AgentCommand` entity instance. Pass `nil` for no initial data.

#### `AgentComputer(data map[string]any) ComposalEntityBase`

Create a new `AgentComputer` entity instance. Pass `nil` for no initial data.

#### `AgentConnection(data map[string]any) ComposalEntityBase`

Create a new `AgentConnection` entity instance. Pass `nil` for no initial data.

#### `AgentControlFlow(data map[string]any) ComposalEntityBase`

Create a new `AgentControlFlow` entity instance. Pass `nil` for no initial data.

#### `AgentCoordination(data map[string]any) ComposalEntityBase`

Create a new `AgentCoordination` entity instance. Pass `nil` for no initial data.

#### `AgentEmail(data map[string]any) ComposalEntityBase`

Create a new `AgentEmail` entity instance. Pass `nil` for no initial data.

#### `AgentFile(data map[string]any) ComposalEntityBase`

Create a new `AgentFile` entity instance. Pass `nil` for no initial data.

#### `AgentInput(data map[string]any) ComposalEntityBase`

Create a new `AgentInput` entity instance. Pass `nil` for no initial data.

#### `AgentIntegration(data map[string]any) ComposalEntityBase`

Create a new `AgentIntegration` entity instance. Pass `nil` for no initial data.

#### `AgentInteraction(data map[string]any) ComposalEntityBase`

Create a new `AgentInteraction` entity instance. Pass `nil` for no initial data.

#### `AgentLibrary(data map[string]any) ComposalEntityBase`

Create a new `AgentLibrary` entity instance. Pass `nil` for no initial data.

#### `AgentManager(data map[string]any) ComposalEntityBase`

Create a new `AgentManager` entity instance. Pass `nil` for no initial data.

#### `AgentManagerChoice(data map[string]any) ComposalEntityBase`

Create a new `AgentManagerChoice` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplace(data map[string]any) ComposalEntityBase`

Create a new `AgentMarketplace` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplaceShared(data map[string]any) ComposalEntityBase`

Create a new `AgentMarketplaceShared` entity instance. Pass `nil` for no initial data.

#### `AgentMissionControl(data map[string]any) ComposalEntityBase`

Create a new `AgentMissionControl` entity instance. Pass `nil` for no initial data.

#### `AgentOperation(data map[string]any) ComposalEntityBase`

Create a new `AgentOperation` entity instance. Pass `nil` for no initial data.

#### `AgentProvisioning(data map[string]any) ComposalEntityBase`

Create a new `AgentProvisioning` entity instance. Pass `nil` for no initial data.

#### `AgentPullRequest(data map[string]any) ComposalEntityBase`

Create a new `AgentPullRequest` entity instance. Pass `nil` for no initial data.

#### `AgentQuestion(data map[string]any) ComposalEntityBase`

Create a new `AgentQuestion` entity instance. Pass `nil` for no initial data.

#### `AgentRepository(data map[string]any) ComposalEntityBase`

Create a new `AgentRepository` entity instance. Pass `nil` for no initial data.

#### `AgentResource(data map[string]any) ComposalEntityBase`

Create a new `AgentResource` entity instance. Pass `nil` for no initial data.

#### `AgentRoutine(data map[string]any) ComposalEntityBase`

Create a new `AgentRoutine` entity instance. Pass `nil` for no initial data.

#### `AgentRun(data map[string]any) ComposalEntityBase`

Create a new `AgentRun` entity instance. Pass `nil` for no initial data.

#### `AgentRuntime(data map[string]any) ComposalEntityBase`

Create a new `AgentRuntime` entity instance. Pass `nil` for no initial data.

#### `AgentSetting(data map[string]any) ComposalEntityBase`

Create a new `AgentSetting` entity instance. Pass `nil` for no initial data.

#### `AgentSharing(data map[string]any) ComposalEntityBase`

Create a new `AgentSharing` entity instance. Pass `nil` for no initial data.

#### `AgentSite(data map[string]any) ComposalEntityBase`

Create a new `AgentSite` entity instance. Pass `nil` for no initial data.

#### `AgentSkill(data map[string]any) ComposalEntityBase`

Create a new `AgentSkill` entity instance. Pass `nil` for no initial data.

#### `AgentSlack(data map[string]any) ComposalEntityBase`

Create a new `AgentSlack` entity instance. Pass `nil` for no initial data.

#### `AgentSubagent(data map[string]any) ComposalEntityBase`

Create a new `AgentSubagent` entity instance. Pass `nil` for no initial data.

#### `AgentSubscription(data map[string]any) ComposalEntityBase`

Create a new `AgentSubscription` entity instance. Pass `nil` for no initial data.

#### `AgentTeammate(data map[string]any) ComposalEntityBase`

Create a new `AgentTeammate` entity instance. Pass `nil` for no initial data.

#### `AgentTerminal(data map[string]any) ComposalEntityBase`

Create a new `AgentTerminal` entity instance. Pass `nil` for no initial data.

#### `AgentThread(data map[string]any) ComposalEntityBase`

Create a new `AgentThread` entity instance. Pass `nil` for no initial data.

#### `AgentTool(data map[string]any) ComposalEntityBase`

Create a new `AgentTool` entity instance. Pass `nil` for no initial data.

#### `AgentVerifyProject(data map[string]any) ComposalEntityBase`

Create a new `AgentVerifyProject` entity instance. Pass `nil` for no initial data.

#### `AgentWait(data map[string]any) ComposalEntityBase`

Create a new `AgentWait` entity instance. Pass `nil` for no initial data.

#### `AgentWebhook(data map[string]any) ComposalEntityBase`

Create a new `AgentWebhook` entity instance. Pass `nil` for no initial data.

#### `AgentWork(data map[string]any) ComposalEntityBase`

Create a new `AgentWork` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflow(data map[string]any) ComposalEntityBase`

Create a new `AgentWorkflow` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowProposal(data map[string]any) ComposalEntityBase`

Create a new `AgentWorkflowProposal` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowRun(data map[string]any) ComposalEntityBase`

Create a new `AgentWorkflowRun` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowTrigger(data map[string]any) ComposalEntityBase`

Create a new `AgentWorkflowTrigger` entity instance. Pass `nil` for no initial data.

#### `AgentWorkspace(data map[string]any) ComposalEntityBase`

Create a new `AgentWorkspace` entity instance. Pass `nil` for no initial data.

#### `AgentWritePermission(data map[string]any) ComposalEntityBase`

Create a new `AgentWritePermission` entity instance. Pass `nil` for no initial data.

#### `AllocationLog(data map[string]any) ComposalEntityBase`

Create a new `AllocationLog` entity instance. Pass `nil` for no initial data.

#### `App(data map[string]any) ComposalEntityBase`

Create a new `App` entity instance. Pass `nil` for no initial data.

#### `AppCdn(data map[string]any) ComposalEntityBase`

Create a new `AppCdn` entity instance. Pass `nil` for no initial data.

#### `AppConfigVariable(data map[string]any) ComposalEntityBase`

Create a new `AppConfigVariable` entity instance. Pass `nil` for no initial data.

#### `AppDataResource(data map[string]any) ComposalEntityBase`

Create a new `AppDataResource` entity instance. Pass `nil` for no initial data.

#### `AppDeploy(data map[string]any) ComposalEntityBase`

Create a new `AppDeploy` entity instance. Pass `nil` for no initial data.

#### `AppDeployment(data map[string]any) ComposalEntityBase`

Create a new `AppDeployment` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentOperation(data map[string]any) ComposalEntityBase`

Create a new `AppDeploymentOperation` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentRollback(data map[string]any) ComposalEntityBase`

Create a new `AppDeploymentRollback` entity instance. Pass `nil` for no initial data.

#### `AppEnvironment(data map[string]any) ComposalEntityBase`

Create a new `AppEnvironment` entity instance. Pass `nil` for no initial data.

#### `AppLocation(data map[string]any) ComposalEntityBase`

Create a new `AppLocation` entity instance. Pass `nil` for no initial data.

#### `AppMetric(data map[string]any) ComposalEntityBase`

Create a new `AppMetric` entity instance. Pass `nil` for no initial data.

#### `AppPreview(data map[string]any) ComposalEntityBase`

Create a new `AppPreview` entity instance. Pass `nil` for no initial data.

#### `AppPreviewProfile(data map[string]any) ComposalEntityBase`

Create a new `AppPreviewProfile` entity instance. Pass `nil` for no initial data.

#### `AppRun(data map[string]any) ComposalEntityBase`

Create a new `AppRun` entity instance. Pass `nil` for no initial data.

#### `AppSecret(data map[string]any) ComposalEntityBase`

Create a new `AppSecret` entity instance. Pass `nil` for no initial data.

#### `AppService(data map[string]any) ComposalEntityBase`

Create a new `AppService` entity instance. Pass `nil` for no initial data.

#### `AppServiceBinding(data map[string]any) ComposalEntityBase`

Create a new `AppServiceBinding` entity instance. Pass `nil` for no initial data.

#### `AppServicePlacement(data map[string]any) ComposalEntityBase`

Create a new `AppServicePlacement` entity instance. Pass `nil` for no initial data.

#### `AppStorageResource(data map[string]any) ComposalEntityBase`

Create a new `AppStorageResource` entity instance. Pass `nil` for no initial data.

#### `AttachmentPart(data map[string]any) ComposalEntityBase`

Create a new `AttachmentPart` entity instance. Pass `nil` for no initial data.

#### `AutomationEvent(data map[string]any) ComposalEntityBase`

Create a new `AutomationEvent` entity instance. Pass `nil` for no initial data.

#### `AutomationRun(data map[string]any) ComposalEntityBase`

Create a new `AutomationRun` entity instance. Pass `nil` for no initial data.

#### `Binary(data map[string]any) ComposalEntityBase`

Create a new `Binary` entity instance. Pass `nil` for no initial data.

#### `BinaryVersion(data map[string]any) ComposalEntityBase`

Create a new `BinaryVersion` entity instance. Pass `nil` for no initial data.

#### `BrowserEgressCandidate(data map[string]any) ComposalEntityBase`

Create a new `BrowserEgressCandidate` entity instance. Pass `nil` for no initial data.

#### `BrowserSession(data map[string]any) ComposalEntityBase`

Create a new `BrowserSession` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionConnection(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionConnection` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionControl(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionControl` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionEvent(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionEvent` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionMedia(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionMedia` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionRecording(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionRecording` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionScreenshot(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionScreenshot` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionTask(data map[string]any) ComposalEntityBase`

Create a new `BrowserSessionTask` entity instance. Pass `nil` for no initial data.

#### `CatalogSelector(data map[string]any) ComposalEntityBase`

Create a new `CatalogSelector` entity instance. Pass `nil` for no initial data.

#### `CdnDeployment(data map[string]any) ComposalEntityBase`

Create a new `CdnDeployment` entity instance. Pass `nil` for no initial data.

#### `CdnHostname(data map[string]any) ComposalEntityBase`

Create a new `CdnHostname` entity instance. Pass `nil` for no initial data.

#### `CdnSpace(data map[string]any) ComposalEntityBase`

Create a new `CdnSpace` entity instance. Pass `nil` for no initial data.

#### `CdnSpaceObject(data map[string]any) ComposalEntityBase`

Create a new `CdnSpaceObject` entity instance. Pass `nil` for no initial data.

#### `ConnectionRequest(data map[string]any) ComposalEntityBase`

Create a new `ConnectionRequest` entity instance. Pass `nil` for no initial data.

#### `ConnectionSource(data map[string]any) ComposalEntityBase`

Create a new `ConnectionSource` entity instance. Pass `nil` for no initial data.

#### `CoordinationWait(data map[string]any) ComposalEntityBase`

Create a new `CoordinationWait` entity instance. Pass `nil` for no initial data.

#### `CredentialSignInCheck(data map[string]any) ComposalEntityBase`

Create a new `CredentialSignInCheck` entity instance. Pass `nil` for no initial data.

#### `DataResourceRotateCredential(data map[string]any) ComposalEntityBase`

Create a new `DataResourceRotateCredential` entity instance. Pass `nil` for no initial data.

#### `DeepScan(data map[string]any) ComposalEntityBase`

Create a new `DeepScan` entity instance. Pass `nil` for no initial data.

#### `DeepScanFinding(data map[string]any) ComposalEntityBase`

Create a new `DeepScanFinding` entity instance. Pass `nil` for no initial data.

#### `DeepScanFlow(data map[string]any) ComposalEntityBase`

Create a new `DeepScanFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanMappedFlow(data map[string]any) ComposalEntityBase`

Create a new `DeepScanMappedFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanOption(data map[string]any) ComposalEntityBase`

Create a new `DeepScanOption` entity instance. Pass `nil` for no initial data.

#### `DemoShare(data map[string]any) ComposalEntityBase`

Create a new `DemoShare` entity instance. Pass `nil` for no initial data.

#### `DemoShareSegment(data map[string]any) ComposalEntityBase`

Create a new `DemoShareSegment` entity instance. Pass `nil` for no initial data.

#### `DeploymentDashboardNomad(data map[string]any) ComposalEntityBase`

Create a new `DeploymentDashboardNomad` entity instance. Pass `nil` for no initial data.

#### `DeploymentFile(data map[string]any) ComposalEntityBase`

Create a new `DeploymentFile` entity instance. Pass `nil` for no initial data.

#### `DomainPathRule(data map[string]any) ComposalEntityBase`

Create a new `DomainPathRule` entity instance. Pass `nil` for no initial data.

#### `Dream(data map[string]any) ComposalEntityBase`

Create a new `Dream` entity instance. Pass `nil` for no initial data.

#### `Environment(data map[string]any) ComposalEntityBase`

Create a new `Environment` entity instance. Pass `nil` for no initial data.

#### `EnvironmentDiscoveryRun(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentDiscoveryRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentExploration(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentExploration` entity instance. Pass `nil` for no initial data.

#### `EnvironmentFirstRun(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentFirstRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentRevision(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentRevision` entity instance. Pass `nil` for no initial data.

#### `EnvironmentSecretBinding(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentSecretBinding` entity instance. Pass `nil` for no initial data.

#### `EnvironmentTestAccount(data map[string]any) ComposalEntityBase`

Create a new `EnvironmentTestAccount` entity instance. Pass `nil` for no initial data.

#### `Evidence(data map[string]any) ComposalEntityBase`

Create a new `Evidence` entity instance. Pass `nil` for no initial data.

#### `Exploration(data map[string]any) ComposalEntityBase`

Create a new `Exploration` entity instance. Pass `nil` for no initial data.

#### `ExplorationMessage(data map[string]any) ComposalEntityBase`

Create a new `ExplorationMessage` entity instance. Pass `nil` for no initial data.

#### `ExplorationReport(data map[string]any) ComposalEntityBase`

Create a new `ExplorationReport` entity instance. Pass `nil` for no initial data.

#### `ExplorationScenario(data map[string]any) ComposalEntityBase`

Create a new `ExplorationScenario` entity instance. Pass `nil` for no initial data.

#### `Finding(data map[string]any) ComposalEntityBase`

Create a new `Finding` entity instance. Pass `nil` for no initial data.

#### `GithubConnection(data map[string]any) ComposalEntityBase`

Create a new `GithubConnection` entity instance. Pass `nil` for no initial data.

#### `HostingAppDomain(data map[string]any) ComposalEntityBase`

Create a new `HostingAppDomain` entity instance. Pass `nil` for no initial data.

#### `ImageRepository(data map[string]any) ComposalEntityBase`

Create a new `ImageRepository` entity instance. Pass `nil` for no initial data.

#### `Integration(data map[string]any) ComposalEntityBase`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `InteractionResponse(data map[string]any) ComposalEntityBase`

Create a new `InteractionResponse` entity instance. Pass `nil` for no initial data.

#### `Invitation(data map[string]any) ComposalEntityBase`

Create a new `Invitation` entity instance. Pass `nil` for no initial data.

#### `JourneyVariantReplay(data map[string]any) ComposalEntityBase`

Create a new `JourneyVariantReplay` entity instance. Pass `nil` for no initial data.

#### `Knowledge(data map[string]any) ComposalEntityBase`

Create a new `Knowledge` entity instance. Pass `nil` for no initial data.

#### `LocalThreadDelivery(data map[string]any) ComposalEntityBase`

Create a new `LocalThreadDelivery` entity instance. Pass `nil` for no initial data.

#### `LocalThreadOperation(data map[string]any) ComposalEntityBase`

Create a new `LocalThreadOperation` entity instance. Pass `nil` for no initial data.

#### `Location(data map[string]any) ComposalEntityBase`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Me(data map[string]any) ComposalEntityBase`

Create a new `Me` entity instance. Pass `nil` for no initial data.

#### `MeEmail(data map[string]any) ComposalEntityBase`

Create a new `MeEmail` entity instance. Pass `nil` for no initial data.

#### `MeOnboarding(data map[string]any) ComposalEntityBase`

Create a new `MeOnboarding` entity instance. Pass `nil` for no initial data.

#### `MediaFile(data map[string]any) ComposalEntityBase`

Create a new `MediaFile` entity instance. Pass `nil` for no initial data.

#### `Member(data map[string]any) ComposalEntityBase`

Create a new `Member` entity instance. Pass `nil` for no initial data.

#### `Memory(data map[string]any) ComposalEntityBase`

Create a new `Memory` entity instance. Pass `nil` for no initial data.

#### `MergeRequest(data map[string]any) ComposalEntityBase`

Create a new `MergeRequest` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationMessage(data map[string]any) ComposalEntityBase`

Create a new `MessagingConversationMessage` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationUpload(data map[string]any) ComposalEntityBase`

Create a new `MessagingConversationUpload` entity instance. Pass `nil` for no initial data.

#### `MetricQuery(data map[string]any) ComposalEntityBase`

Create a new `MetricQuery` entity instance. Pass `nil` for no initial data.

#### `NetworkConnection(data map[string]any) ComposalEntityBase`

Create a new `NetworkConnection` entity instance. Pass `nil` for no initial data.

#### `NomadAllocation(data map[string]any) ComposalEntityBase`

Create a new `NomadAllocation` entity instance. Pass `nil` for no initial data.

#### `NomadLog(data map[string]any) ComposalEntityBase`

Create a new `NomadLog` entity instance. Pass `nil` for no initial data.

#### `Organization(data map[string]any) ComposalEntityBase`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `Page(data map[string]any) ComposalEntityBase`

Create a new `Page` entity instance. Pass `nil` for no initial data.

#### `PageAgent(data map[string]any) ComposalEntityBase`

Create a new `PageAgent` entity instance. Pass `nil` for no initial data.

#### `PageProjectRun(data map[string]any) ComposalEntityBase`

Create a new `PageProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectCredential(data map[string]any) ComposalEntityBase`

Create a new `PagesProjectCredential` entity instance. Pass `nil` for no initial data.

#### `PagesProjectPersona(data map[string]any) ComposalEntityBase`

Create a new `PagesProjectPersona` entity instance. Pass `nil` for no initial data.

#### `PagesProjectRun(data map[string]any) ComposalEntityBase`

Create a new `PagesProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectScenario(data map[string]any) ComposalEntityBase`

Create a new `PagesProjectScenario` entity instance. Pass `nil` for no initial data.

#### `PersonalAccessToken(data map[string]any) ComposalEntityBase`

Create a new `PersonalAccessToken` entity instance. Pass `nil` for no initial data.

#### `PreviewOperation(data map[string]any) ComposalEntityBase`

Create a new `PreviewOperation` entity instance. Pass `nil` for no initial data.

#### `PreviewProfileSecretBinding(data map[string]any) ComposalEntityBase`

Create a new `PreviewProfileSecretBinding` entity instance. Pass `nil` for no initial data.

#### `PreviewSecret(data map[string]any) ComposalEntityBase`

Create a new `PreviewSecret` entity instance. Pass `nil` for no initial data.

#### `PreviewSharingApproval(data map[string]any) ComposalEntityBase`

Create a new `PreviewSharingApproval` entity instance. Pass `nil` for no initial data.

#### `ProductMapIdentityDecision(data map[string]any) ComposalEntityBase`

Create a new `ProductMapIdentityDecision` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourney(data map[string]any) ComposalEntityBase`

Create a new `ProductMapJourney` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourneyReplay(data map[string]any) ComposalEntityBase`

Create a new `ProductMapJourneyReplay` entity instance. Pass `nil` for no initial data.

#### `ProductMapObservation(data map[string]any) ComposalEntityBase`

Create a new `ProductMapObservation` entity instance. Pass `nil` for no initial data.

#### `ProductMapQuestion(data map[string]any) ComposalEntityBase`

Create a new `ProductMapQuestion` entity instance. Pass `nil` for no initial data.

#### `ProductMapState(data map[string]any) ComposalEntityBase`

Create a new `ProductMapState` entity instance. Pass `nil` for no initial data.

#### `Project(data map[string]any) ComposalEntityBase`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `ProjectAndroidApk(data map[string]any) ComposalEntityBase`

Create a new `ProjectAndroidApk` entity instance. Pass `nil` for no initial data.

#### `ProjectCodeMap(data map[string]any) ComposalEntityBase`

Create a new `ProjectCodeMap` entity instance. Pass `nil` for no initial data.

#### `ProjectEnvironment(data map[string]any) ComposalEntityBase`

Create a new `ProjectEnvironment` entity instance. Pass `nil` for no initial data.

#### `ProjectFinding(data map[string]any) ComposalEntityBase`

Create a new `ProjectFinding` entity instance. Pass `nil` for no initial data.

#### `ProjectFixture(data map[string]any) ComposalEntityBase`

Create a new `ProjectFixture` entity instance. Pass `nil` for no initial data.

#### `ProjectIosApp(data map[string]any) ComposalEntityBase`

Create a new `ProjectIosApp` entity instance. Pass `nil` for no initial data.

#### `ProjectMessagingConversation(data map[string]any) ComposalEntityBase`

Create a new `ProjectMessagingConversation` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewMetric(data map[string]any) ComposalEntityBase`

Create a new `ProjectOverviewMetric` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewPullRequest(data map[string]any) ComposalEntityBase`

Create a new `ProjectOverviewPullRequest` entity instance. Pass `nil` for no initial data.

#### `ProjectProductMap(data map[string]any) ComposalEntityBase`

Create a new `ProjectProductMap` entity instance. Pass `nil` for no initial data.

#### `ProjectRecording(data map[string]any) ComposalEntityBase`

Create a new `ProjectRecording` entity instance. Pass `nil` for no initial data.

#### `ProjectRunPlan(data map[string]any) ComposalEntityBase`

Create a new `ProjectRunPlan` entity instance. Pass `nil` for no initial data.

#### `ProjectRunSchedule(data map[string]any) ComposalEntityBase`

Create a new `ProjectRunSchedule` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioOption(data map[string]any) ComposalEntityBase`

Create a new `ProjectScenarioOption` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioRow(data map[string]any) ComposalEntityBase`

Create a new `ProjectScenarioRow` entity instance. Pass `nil` for no initial data.

#### `ProjectSetting(data map[string]any) ComposalEntityBase`

Create a new `ProjectSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequest(data map[string]any) ComposalEntityBase`

Create a new `PullRequest` entity instance. Pass `nil` for no initial data.

#### `PullRequestSetting(data map[string]any) ComposalEntityBase`

Create a new `PullRequestSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingAddRepository(data map[string]any) ComposalEntityBase`

Create a new `PullRequestSettingAddRepository` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingDetectComment(data map[string]any) ComposalEntityBase`

Create a new `PullRequestSettingDetectComment` entity instance. Pass `nil` for no initial data.

#### `Recorder(data map[string]any) ComposalEntityBase`

Create a new `Recorder` entity instance. Pass `nil` for no initial data.

#### `Registry(data map[string]any) ComposalEntityBase`

Create a new `Registry` entity instance. Pass `nil` for no initial data.

#### `RegistryV2(data map[string]any) ComposalEntityBase`

Create a new `RegistryV2` entity instance. Pass `nil` for no initial data.

#### `RelayAgentLocalThread(data map[string]any) ComposalEntityBase`

Create a new `RelayAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `ReportReplay(data map[string]any) ComposalEntityBase`

Create a new `ReportReplay` entity instance. Pass `nil` for no initial data.

#### `ReportScenario(data map[string]any) ComposalEntityBase`

Create a new `ReportScenario` entity instance. Pass `nil` for no initial data.

#### `RunScenarioRun(data map[string]any) ComposalEntityBase`

Create a new `RunScenarioRun` entity instance. Pass `nil` for no initial data.

#### `RunScheduleOption(data map[string]any) ComposalEntityBase`

Create a new `RunScheduleOption` entity instance. Pass `nil` for no initial data.

#### `RunSearch(data map[string]any) ComposalEntityBase`

Create a new `RunSearch` entity instance. Pass `nil` for no initial data.

#### `RunUpdate(data map[string]any) ComposalEntityBase`

Create a new `RunUpdate` entity instance. Pass `nil` for no initial data.

#### `ScenarioRevision(data map[string]any) ComposalEntityBase`

Create a new `ScenarioRevision` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunLesson(data map[string]any) ComposalEntityBase`

Create a new `ScenarioRunLesson` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunScenarioEdit(data map[string]any) ComposalEntityBase`

Create a new `ScenarioRunScenarioEdit` entity instance. Pass `nil` for no initial data.

#### `ServiceEndpoint(data map[string]any) ComposalEntityBase`

Create a new `ServiceEndpoint` entity instance. Pass `nil` for no initial data.

#### `SitePreview(data map[string]any) ComposalEntityBase`

Create a new `SitePreview` entity instance. Pass `nil` for no initial data.

#### `SlackChannel(data map[string]any) ComposalEntityBase`

Create a new `SlackChannel` entity instance. Pass `nil` for no initial data.

#### `SparkAgentLocalThread(data map[string]any) ComposalEntityBase`

Create a new `SparkAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `StaticSite(data map[string]any) ComposalEntityBase`

Create a new `StaticSite` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDeployment(data map[string]any) ComposalEntityBase`

Create a new `StaticSiteDeployment` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDomain(data map[string]any) ComposalEntityBase`

Create a new `StaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `SubscriptionModel(data map[string]any) ComposalEntityBase`

Create a new `SubscriptionModel` entity instance. Pass `nil` for no initial data.

#### `ThreadPreview(data map[string]any) ComposalEntityBase`

Create a new `ThreadPreview` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectCredential(data map[string]any) ComposalEntityBase`

Create a new `VerificationProjectCredential` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectPersona(data map[string]any) ComposalEntityBase`

Create a new `VerificationProjectPersona` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectRun(data map[string]any) ComposalEntityBase`

Create a new `VerificationProjectRun` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectScenario(data map[string]any) ComposalEntityBase`

Create a new `VerificationProjectScenario` entity instance. Pass `nil` for no initial data.

#### `VerifyAppDomain(data map[string]any) ComposalEntityBase`

Create a new `VerifyAppDomain` entity instance. Pass `nil` for no initial data.

#### `VerifyBrowserSession(data map[string]any) ComposalEntityBase`

Create a new `VerifyBrowserSession` entity instance. Pass `nil` for no initial data.

#### `VerifyStaticSiteDomain(data map[string]any) ComposalEntityBase`

Create a new `VerifyStaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `VersionLog(data map[string]any) ComposalEntityBase`

Create a new `VersionLog` entity instance. Pass `nil` for no initial data.

#### `WebBotAuth(data map[string]any) ComposalEntityBase`

Create a new `WebBotAuth` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStep(data map[string]any) ComposalEntityBase`

Create a new `WorkflowRunStep` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStopNotice(data map[string]any) ComposalEntityBase`

Create a new `WorkflowRunStopNotice` entity instance. Pass `nil` for no initial data.

#### `WorkflowTriggerSkipped(data map[string]any) ComposalEntityBase`

Create a new `WorkflowTriggerSkipped` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AgentEntity

```go
agent := client.Agent(nil)
fmt.Println(agent.GetName()) // "agent"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `any` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `any` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `any` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `any` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `[]any` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `any` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `[]any` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `any` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `any` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `any` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
| `slug` | `string` | Yes | Optional explicit API alias. |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `string` | No | Defaults to organization. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `attention` | - | - | - | - |
| `avatar` | - | - | - | - |
| `can_delete` | - | - | - | - |
| `can_edit_configuration` | - | - | - | - |
| `can_manage` | - | - | - | - |
| `can_manage_sharing` | - | - | - | - |
| `can_name_managers` | - | - | - | - |
| `can_queue_input` | - | - | - | - |
| `can_reconcile_save` | - | - | - | - |
| `configuration` | - | - | Yes | - |
| `configuration_revision` | - | - | - | - |
| `configuration_version` | - | - | - | - |
| `control_connections_available` | - | - | - | - |
| `controlling_user_id` | - | - | - | - |
| `coordination_available` | - | - | - | - |
| `created_at` | - | - | - | - |
| `direct_chat_available` | - | - | - | - |
| `has_unread_updates` | - | - | - | - |
| `id` | - | - | - | - |
| `last_reply_at` | - | - | - | - |
| `lifecycle_actions` | - | - | - | - |
| `lifecycle_version` | - | - | - | - |
| `local_agent_control_available` | - | - | - | - |
| `managers` | - | - | - | - |
| `model_change_action` | - | - | - | - |
| `name` | - | - | - | - |
| `organization_id` | - | - | - | - |
| `persona` | - | - | - | - |
| `preview` | - | - | - | - |
| `preview_received_at` | - | - | - | - |
| `provisioning` | - | - | - | - |
| `reply_triage` | - | - | - | - |
| `runtime_version` | - | - | - | - |
| `setup_pending` | - | - | - | - |
| `sharing_fixed` | - | - | - | - |
| `sharing_version` | - | - | - | - |
| `slug` | - | - | Yes | - |
| `status` | - | - | - | - |
| `team_role` | - | - | - | - |
| `updated_at` | - | - | - | - |
| `url_slug` | - | - | - | - |
| `visibility` | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Agent(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Load(map[string]any{"id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Agent(nil).Remove(map[string]any{"id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentAttachmentEntity

```go
agentAttachment := client.AgentAttachment(nil)
fmt.Println(agentAttachment.GetName()) // "agent_attachment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `int` | Yes |  |
| `content_type` | `string` | Yes |  |
| `file_name` | `string` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentAttachment(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "byte_size": 1,
    "content_type": "example_content_type",
    "file_name": "example_file_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentAttachmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentAutomationEntity

```go
agentAutomation := client.AgentAutomation(nil)
fmt.Println(agentAutomation.GetName()) // "agent_automation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `definition` | `map[string]any` | Yes |  |
| `event_subscriptions` | `[]any` | Yes |  |
| `event_triggers` | `[]any` | Yes |  |
| `expected_revision` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `[]any` | Yes |  |
| `version` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentAutomation(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentAutomation(nil).Load(map[string]any{"id": "agent_automation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentAutomation(nil).Update(map[string]any{
    "id": "agent_automation_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentAutomationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentAvatarEntity

```go
agentAvatar := client.AgentAvatar(nil)
fmt.Println(agentAvatar.GetName()) // "agent_avatar"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentAvatarEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentCommandEntity

```go
agentCommand := client.AgentCommand(nil)
fmt.Println(agentCommand.GetName()) // "agent_command"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `skill_model_visible` | `bool` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentCommand(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentCommandEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentComputerEntity

```go
agentComputer := client.AgentComputer(nil)
fmt.Println(agentComputer.GetName()) // "agent_computer"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentComputerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentConnectionEntity

```go
agentConnection := client.AgentConnection(nil)
fmt.Println(agentConnection.GetName()) // "agent_connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `connection` | `map[string]any` | Yes |  |
| `credential` | `any` | No | Write-only outbound key. |
| `error_code` | `any` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `any` | Yes |  |
| `requester_id` | `string` | Yes |  |
| `retired_at` | `any` | Yes |  |
| `revoked_at` | `any` | Yes |  |
| `scope_key` | `string` | Yes |  |
| `source_operation_id` | `any` | Yes |  |
| `state` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentConnection(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentConnection(nil).Load(map[string]any{"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentConnection(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "agent_card_url": "example_agent_card_url",
    "auth_scheme": "example_auth_scheme",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentConnection(nil).Update(map[string]any{
    "id": "agent_connection_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AgentConnection(nil).Remove(map[string]any{"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentConnectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentControlFlowEntity

```go
agentControlFlow := client.AgentControlFlow(nil)
fmt.Println(agentControlFlow.GetName()) // "agent_control_flow"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `bool` | Yes |  |
| `cancellation_requested` | `bool` | Yes |  |
| `device_name` | `string` | Yes |  |
| `flow_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `providers` | `[]any` | Yes |  |
| `repair_of_flow_id` | `string` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `title` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentControlFlow(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentControlFlow(nil).Load(map[string]any{"id": "agent_control_flow_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentControlFlowEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentCoordinationEntity

```go
agentCoordination := client.AgentCoordination(nil)
fmt.Println(agentCoordination.GetName()) // "agent_coordination"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentCoordinationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentEmailEntity

```go
agentEmail := client.AgentEmail(nil)
fmt.Println(agentEmail.GetName()) // "agent_email"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `any` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `preview` | `string` | No |  |
| `received_at` | `string` | Yes |  |
| `recipient_tag` | `any` | Yes | The +tag the sender used, if any |
| `spam` | `bool` | Yes | SES judged it spam |
| `subject` | `any` | Yes |  |
| `text` | `string` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentEmail(nil).Load(map[string]any{"id": "agent_email_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentEmailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentFileEntity

```go
agentFile := client.AgentFile(nil)
fmt.Println(agentFile.GetName()) // "agent_file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `string` | Yes |  |
| `download_url` | `string` | Yes |  |
| `filename` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `size_bytes` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentFile(nil).Load(map[string]any{"id": "agent_file_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentFileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentInputEntity

```go
agentInput := client.AgentInput(nil)
fmt.Println(agentInput.GetName()) // "agent_input"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `[]any` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `[]any` | No |  |
| `browser_context` | `map[string]any` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `map[string]any` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` | No |  |
| `requester_membership_id` | `string` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentInput(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "browser_context": map[string]any{},
    "client_time": map[string]any{},
    "conversation_id": "example_conversation_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentInputEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentIntegrationEntity

```go
agentIntegration := client.AgentIntegration(nil)
fmt.Println(agentIntegration.GetName()) // "agent_integration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `map[string]any` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `[]any` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` | Yes |  |
| `can_manage_organization` | `bool` | Yes |  |
| `catalog` | `[]any` | Yes |  |
| `connect_as` | `any` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `map[string]any` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `map[string]any` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` | Yes |  |
| `connections` | `[]any` | Yes |  |
| `email` | `map[string]any` | Yes | A native agent's own email address. |
| `enabled` | `bool` | Yes |  |
| `enabled_toolkits` | `[]any` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `pending_counts` | `map[string]any` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `map[string]any` | Yes |  |
| `webhook_connections` | `[]any` | Yes |  |
| `webhooks_available` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentIntegration(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentIntegration(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "connection_id": "example_connection_id",
    "enabled": true,
    "generation": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentIntegrationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentInteractionEntity

```go
agentInteraction := client.AgentInteraction(nil)
fmt.Println(agentInteraction.GetName()) // "agent_interaction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `interactions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentInteraction(nil).List(map[string]any{"agent_id": "example", "organization_id": "example", "conversation_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentInteraction(nil).Load(map[string]any{"id": "agent_interaction_id", "agent_id": "agent_id", "organization_id": "organization_id", "conversation_id": "conversation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentInteractionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentLibraryEntity

```go
agentLibrary := client.AgentLibrary(nil)
fmt.Println(agentLibrary.GetName()) // "agent_library"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentLibraryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentManagerEntity

```go
agentManager := client.AgentManager(nil)
fmt.Println(agentManager.GetName()) // "agent_manager"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `any` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `any` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `any` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `any` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `[]any` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `any` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `[]any` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `any` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `any` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `any` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` | Yes |  |
| `visibility` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentManager(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AgentManager(nil).Remove(map[string]any{"id": "agent_manager_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentManagerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentManagerChoiceEntity

```go
agentManagerChoice := client.AgentManagerChoice(nil)
fmt.Println(agentManagerChoice.GetName()) // "agent_manager_choice"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentManagerChoice(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentManagerChoiceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentMarketplaceEntity

```go
agentMarketplace := client.AgentMarketplace(nil)
fmt.Println(agentMarketplace.GetName()) // "agent_marketplace"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `map[string]any` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `any` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `[]any` | Yes |  |
| `category` | `string` | Yes |  |
| `counts` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `explainer` | `any` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `[]any` | Yes |  |
| `integrations` | `[]any` | Yes |  |
| `listing` | `any` | Yes |  |
| `listings` | `[]any` | Yes |  |
| `memories` | `[]any` | Yes |  |
| `name` | `string` | Yes |  |
| `next_page` | `any` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `[]any` | Yes |  |
| `publisher_avatar_url` | `any` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `[]any` | Yes |  |
| `share_token` | `any` | Yes | Present only for people who manage the listing. |
| `skills` | `[]any` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | No | The V2 agent this listing was published from. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `map[string]any` | Yes | Who a public marketplace response was read for. |
| `visibility` | `string` | Yes |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplace(nil).Load(map[string]any{"id": "agent_marketplace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplace(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "bundle": map[string]any{},
    "category": "example_category",
    "name": "example_name",
    "summary": "example_summary",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplace(nil).Update(map[string]any{
    "id": "agent_marketplace_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplace(nil).Patch(map[string]any{
    "id": "agent_marketplace_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplace(nil).Remove(map[string]any{"id": "agent_marketplace_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentMarketplaceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentMarketplaceSharedEntity

```go
agentMarketplaceShared := client.AgentMarketplaceShared(nil)
fmt.Println(agentMarketplaceShared.GetName()) // "agent_marketplace_shared"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `any` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` | Yes |  |
| `counts` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `explainer` | `any` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `[]any` | Yes |  |
| `integrations` | `[]any` | Yes |  |
| `listing` | `any` | Yes |  |
| `memories` | `[]any` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `[]any` | Yes |  |
| `publisher_avatar_url` | `any` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `any` | Yes | Present only for people who manage the listing. |
| `skills` | `[]any` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `map[string]any` | Yes | Who a public marketplace response was read for. |
| `visibility` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentMarketplaceShared(nil).Load(map[string]any{"id": "agent_marketplace_shared_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentMarketplaceSharedEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentMissionControlEntity

```go
agentMissionControl := client.AgentMissionControl(nil)
fmt.Println(agentMissionControl.GetName()) // "agent_mission_control"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentMissionControlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentOperationEntity

```go
agentOperation := client.AgentOperation(nil)
fmt.Println(agentOperation.GetName()) // "agent_operation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `map[string]any` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `operation` | `map[string]any` | Yes |  |
| `participant` | `string` | Yes |  |
| `requester_id` | `string` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentOperation(nil).Load(map[string]any{"id": "agent_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentOperation(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "arguments": map[string]any{},
    "key": "example_key",
    "name": "example_name",
    "requester_id": "example_requester_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentOperationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentProvisioningEntity

```go
agentProvisioning := client.AgentProvisioning(nil)
fmt.Println(agentProvisioning.GetName()) // "agent_provisioning"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentProvisioningEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentPullRequestEntity

```go
agentPullRequest := client.AgentPullRequest(nil)
fmt.Println(agentPullRequest.GetName()) // "agent_pull_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `owners` | `[]any` | Yes |  |
| `repository` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentPullRequest(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentPullRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentQuestionEntity

```go
agentQuestion := client.AgentQuestion(nil)
fmt.Println(agentQuestion.GetName()) // "agent_question"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentQuestionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentRepositoryEntity

```go
agentRepository := client.AgentRepository(nil)
fmt.Println(agentRepository.GetName()) // "agent_repository"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `environments` | `map[string]any` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` | Yes |  |
| `id` | `string` | No |  |
| `repository_choices` | `[]any` | Yes |  |
| `repository_choices_error` | `any` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `version` | `int` | Yes |  |
| `work_repositories` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentRepository(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentRepository(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentRepositoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentResourceEntity

```go
agentResource := client.AgentResource(nil)
fmt.Println(agentResource.GetName()) // "agent_resource"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `uri` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentResource(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentResourceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentRoutineEntity

```go
agentRoutine := client.AgentRoutine(nil)
fmt.Println(agentRoutine.GetName()) // "agent_routine"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `consecutive_errors` | `int` | Yes |  |
| `credit_wait` | `map[string]any` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `any` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_error` | `any` | Yes |  |
| `last_run_at` | `any` | Yes |  |
| `last_status` | `any` | Yes |  |
| `managed` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `any` | Yes |  |
| `routine` | `map[string]any` | Yes |  |
| `schedule` | `map[string]any` | Yes |  |
| `schedule_label` | `string` | Yes |  |
| `utility_model` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentRoutine(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentRoutine(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "id": "id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentRoutineEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentRunEntity

```go
agentRun := client.AgentRun(nil)
fmt.Println(agentRun.GetName()) // "agent_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `any` | No |  |
| `id` | `string` | No |  |
| `run_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentRun(nil).Load(map[string]any{"id": "agent_run_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentRuntimeEntity

```go
agentRuntime := client.AgentRuntime(nil)
fmt.Println(agentRuntime.GetName()) // "agent_runtime"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `[]any` | No |  |
| `can_manage` | `bool` | Yes |  |
| `can_reset` | `bool` | No |  |
| `image` | `string` | Yes |  |
| `memory_mb` | `any` | Yes |  |
| `platform` | `string` | No |  |
| `profile` | `string` | Yes |  |
| `provider` | `string` | No |  |
| `state` | `string` | Yes |  |
| `version` | `string` | Yes |  |
| `volume` | `any` | Yes |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentRuntimeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSettingEntity

```go
agentSetting := client.AgentSetting(nil)
fmt.Println(agentSetting.GetName()) // "agent_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_version` | `string` | Yes |  |
| `instructions` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentSetting(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentSetting(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSettingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSharingEntity

```go
agentSharing := client.AgentSharing(nil)
fmt.Println(agentSharing.GetName()) // "agent_sharing"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSharingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSiteEntity

```go
agentSite := client.AgentSite(nil)
fmt.Println(agentSite.GetName()) // "agent_site"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `string` | Yes |  |
| `deployments_count` | `int` | Yes |  |
| `hostname` | `string` | Yes |  |
| `https` | `string` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `visibility` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentSite(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSiteEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSkillEntity

```go
agentSkill := client.AgentSkill(nil)
fmt.Println(agentSkill.GetName()) // "agent_skill"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `configuration_state` | `string` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `skills` | `[]any` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentSkill(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentSkill(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "enabled": true,
    "name": "example_name",
    "version": "example_version",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSkillEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSlackEntity

```go
agentSlack := client.AgentSlack(nil)
fmt.Println(agentSlack.GetName()) // "agent_slack"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSlackEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSubagentEntity

```go
agentSubagent := client.AgentSubagent(nil)
fmt.Println(agentSubagent.GetName()) // "agent_subagent"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes |  |
| `attention` | `any` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `model` | `any` | Yes |  |
| `parent_id` | `string` | Yes |  |
| `preview` | `any` | Yes |  |
| `started_at` | `any` | Yes |  |
| `state` | `any` | Yes | What the thread is to the viewer. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentSubagent(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSubagentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSubscriptionEntity

```go
agentSubscription := client.AgentSubscription(nil)
fmt.Println(agentSubscription.GetName()) // "agent_subscription"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentSubscription(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentSubscription(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSubscriptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentTeammateEntity

```go
agentTeammate := client.AgentTeammate(nil)
fmt.Println(agentTeammate.GetName()) // "agent_teammate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `any` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `slug` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentTeammate(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentTeammateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentTerminalEntity

```go
agentTerminal := client.AgentTerminal(nil)
fmt.Println(agentTerminal.GetName()) // "agent_terminal"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentTerminalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentThreadEntity

```go
agentThread := client.AgentThread(nil)
fmt.Println(agentThread.GetName()) // "agent_thread"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `any` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` | Yes |  |
| `execution` | `any` | No |  |
| `first_input` | `any` | No |  |
| `first_input_key` | `string` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `string` | No |  |
| `inherit_context` | `bool` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `map[string]any` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `any` | Yes |  |
| `local_scope_key` | `any` | Yes |  |
| `local_status_pending` | `bool` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `[]any` | Yes |  |
| `main_thread_id` | `string` | Yes |  |
| `message` | `string` | No | The thread's first message. |
| `next_cursor` | `any` | Yes |  |
| `parent_conversation_id` | `string` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` | No |  |
| `selected_thread` | `any` | Yes |  |
| `thread` | `map[string]any` | Yes |  |
| `threads` | `[]any` | Yes |  |
| `title` | `string` | No |  |
| `total_archived_count` | `any` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentThread(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentThread(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentThreadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentToolEntity

```go
agentTool := client.AgentTool(nil)
fmt.Println(agentTool.GetName()) // "agent_tool"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `inputSchema` | `map[string]any` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentTool(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentToolEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentVerifyProjectEntity

```go
agentVerifyProject := client.AgentVerifyProject(nil)
fmt.Println(agentVerifyProject.GetName()) // "agent_verify_project"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` | Yes |  |
| `project_choices` | `[]any` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` | Yes |  |
| `verify_projects` | `[]any` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentVerifyProject(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentVerifyProject(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentVerifyProjectEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWaitEntity

```go
agentWait := client.AgentWait(nil)
fmt.Println(agentWait.GetName()) // "agent_wait"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWaitEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWebhookEntity

```go
agentWebhook := client.AgentWebhook(nil)
fmt.Println(agentWebhook.GetName()) // "agent_webhook"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `connection` | `map[string]any` | Yes |  |
| `deliveries` | `[]any` | Yes |  |
| `event_types` | `[]any` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `id` | `string` | No |  |
| `max_events_per_day` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `purpose` | `string` | Yes |  |
| `signing_key` | `any` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentWebhook(nil).Load(map[string]any{"id": "agent_webhook_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentWebhook(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "event_types": []any{},
    "max_events_per_day": 1,
    "name": "example_name",
    "purpose": "example_purpose",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentWebhook(nil).Update(map[string]any{
    "id": "agent_webhook_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWebhookEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkEntity

```go
agentWork := client.AgentWork(nil)
fmt.Println(agentWork.GetName()) // "agent_work"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkflowEntity

```go
agentWorkflow := client.AgentWorkflow(nil)
fmt.Println(agentWorkflow.GetName()) // "agent_workflow"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `path` | `string` | Yes |  |
| `source` | `string` | Yes | At most 262144 UTF-8 bytes |
| `template` | `string` | Yes | A template id from the catalog's templates |
| `templates` | `[]any` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `workflows` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentWorkflow(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflow(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "path": "example_path",
    "template": "example_template",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflow(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkflowEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkflowProposalEntity

```go
agentWorkflowProposal := client.AgentWorkflowProposal(nil)
fmt.Println(agentWorkflowProposal.GetName()) // "agent_workflow_proposal"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `map[string]any` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `any` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` | Yes |  |
| `can_revise` | `bool` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` | Yes |  |
| `definition` | `any` | Yes |  |
| `digest` | `string` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `any` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` | Yes |  |
| `model_choices` | `[]any` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` | Yes |  |
| `native_rows` | `[]any` | No |  |
| `path` | `string` | Yes |  |
| `pipeline_checkpoints` | `map[string]any` | Yes |  |
| `pipeline_commands` | `map[string]any` | Yes |  |
| `reasoning_choices` | `[]any` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `any` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `any` | Yes |  |
| `stale` | `bool` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `any` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `any` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflowProposal(nil).Load(map[string]any{"id": "agent_workflow_proposal_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkflowProposalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkflowRunEntity

```go
agentWorkflowRun := client.AgentWorkflowRun(nil)
fmt.Println(agentWorkflowRun.GetName()) // "agent_workflow_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `any` | Yes | Saved native automation identity. |
| `budget_seconds` | `any` | Yes | The run stops once it has been running this long |
| `budget_usd` | `any` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `any` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `any` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `map[string]any` | Yes |  |
| `error` | `any` | Yes |  |
| `finished_at` | `any` | Yes |  |
| `flow_steps` | `any` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes | Public run ID. |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `any` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `any` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `any` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float64` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `any` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `[]any` | Yes |  |
| `trigger_id` | `any` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `any` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `any` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentWorkflowRun(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflowRun(nil).Load(map[string]any{"id": "agent_workflow_run_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkflowRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkflowTriggerEntity

```go
agentWorkflowTrigger := client.AgentWorkflowTrigger(nil)
fmt.Println(agentWorkflowTrigger.GetName()) // "agent_workflow_trigger"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `any` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` | Yes |  |
| `can_pause` | `bool` | Yes | It is running, so a manager can pause it |
| `can_resume` | `bool` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `bool` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `any` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `any` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `next_due_at` | `any` | Yes |  |
| `pause_cause` | `any` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `any` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `any` | Yes |  |
| `schedule` | `any` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `any` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `any` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `any` | Yes |  |
| `starts` | `any` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `any` | Yes | The event subscription that starts it |
| `time_zone` | `string` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `any` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `map[string]any` | Yes |  |
| `workflow_path` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentWorkflowTrigger(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflowTrigger(nil).Load(map[string]any{"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflowTrigger(nil).Update(map[string]any{
    "id": "agent_workflow_trigger_id",
    "agent_id": "agent_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AgentWorkflowTrigger(nil).Remove(map[string]any{"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkflowTriggerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWorkspaceEntity

```go
agentWorkspace := client.AgentWorkspace(nil)
fmt.Println(agentWorkspace.GetName()) // "agent_workspace"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_delete` | `bool` | Yes |  |
| `can_keep` | `bool` | Yes |  |
| `cleanup_after` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentWorkspace(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AgentWorkspace(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "id": "id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWorkspaceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentWritePermissionEntity

```go
agentWritePermission := client.AgentWritePermission(nil)
fmt.Println(agentWritePermission.GetName()) // "agent_write_permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `string` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` | Yes |  |
| `granted_by` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `in_effect` | `bool` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `any` | Yes |  |
| `tool` | `string` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentWritePermission(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AgentWritePermission(nil).Remove(map[string]any{"id": "agent_write_permission_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentWritePermissionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AllocationLogEntity

```go
allocationLog := client.AllocationLog(nil)
fmt.Println(allocationLog.GetName()) // "allocation_log"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `any` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AllocationLog(nil).List(map[string]any{"allocation_id": "example", "app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AllocationLogEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppEntity

```go
app := client.App(nil)
fmt.Println(app.GetName()) // "app"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `description` | `any` | Yes |  |
| `framework` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `any` | Yes |  |
| `root_path` | `string` | Yes |  |
| `root_path_display` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.App(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.App(nil).Load(map[string]any{"id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.App(nil).Create(map[string]any{
    "name": "example_name",
    "organization_id": "example_organization_id",
    "repository_id": "example_repository_id",
    "root_path": "example_root_path",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.App(nil).Update(map[string]any{
    "id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.App(nil).Patch(map[string]any{
    "id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.App(nil).Remove(map[string]any{"id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppCdnEntity

```go
appCdn := client.AppCdn(nil)
fmt.Println(appCdn.GetName()) // "app_cdn"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `cache_path_prefix` | `any` | No |  |
| `cache_settings_json` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `distribution_kind` | `string` | Yes |  |
| `edge_hostname` | `any` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostnames` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `last_deployed_at` | `any` | Yes |  |
| `last_deployed_at_label` | `any` | Yes |  |
| `last_purged_at` | `any` | Yes |  |
| `last_purged_at_label` | `any` | Yes |  |
| `last_synced_at` | `any` | Yes |  |
| `last_synced_at_label` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `origin_url` | `string` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `routing_settings_json` | `any` | Yes |  |
| `security_settings_json` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppCdn(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppCdn(nil).Load(map[string]any{"id": "app_cdn_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppCdn(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "origin_url": "example_origin_url",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppCdn(nil).Update(map[string]any{
    "id": "app_cdn_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppCdn(nil).Patch(map[string]any{
    "id": "app_cdn_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppCdn(nil).Remove(map[string]any{"id": "app_cdn_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppCdnEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppConfigVariableEntity

```go
appConfigVariable := client.AppConfigVariable(nil)
fmt.Println(appConfigVariable.GetName()) // "app_config_variable"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `any` | Yes |  |
| `exposed_to_build` | `bool` | Yes |  |
| `has_value` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `scope_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `value` | `any` | Yes |  |
| `value_kind` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppConfigVariable(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppConfigVariable(nil).Load(map[string]any{"id": "app_config_variable_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppConfigVariable(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "exposed_to_build": true,
    "key": "example_key",
    "scope_kind": "example_scope_kind",
    "value_kind": "example_value_kind",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppConfigVariable(nil).Update(map[string]any{
    "id": "app_config_variable_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppConfigVariable(nil).Patch(map[string]any{
    "id": "app_config_variable_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppConfigVariable(nil).Remove(map[string]any{"id": "app_config_variable_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppConfigVariableEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppDataResourceEntity

```go
appDataResource := client.AppDataResource(nil)
fmt.Println(appDataResource.GetName()) // "app_data_resource"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `any` | Yes |  |
| `provider_metadata` | `map[string]any` | Yes |  |
| `region` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `any` | Yes |  |
| `storage_label` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppDataResource(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppDataResource(nil).Load(map[string]any{"id": "app_data_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppDataResource(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "engine": "example_engine",
    "kind": "example_kind",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppDataResource(nil).Update(map[string]any{
    "id": "app_data_resource_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppDataResource(nil).Patch(map[string]any{
    "id": "app_data_resource_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppDataResource(nil).Remove(map[string]any{"id": "app_data_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppDataResourceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppDeployEntity

```go
appDeploy := client.AppDeploy(nil)
fmt.Println(appDeploy.GetName()) // "app_deploy"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `channel` | `string` | No |  |
| `command` | `string` | No |  |
| `commit_sha` | `string` | No |  |
| `desired_instances` | `int` | No |  |
| `environment` | `string` | No | Environment slug or public ID, all, or existing. |
| `image` | `string` | Yes |  |
| `region` | `string` | No |  |
| `rollout_predecessor` | `string` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppDeploy(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "image": "example_image",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppDeployEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppDeploymentEntity

```go
appDeployment := client.AppDeployment(nil)
fmt.Println(appDeployment.GetName()) // "app_deployment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `any` | Yes |  |
| `build_role` | `any` | Yes |  |
| `commit_sha` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `creator_user_id` | `any` | Yes |  |
| `deployed_url` | `any` | Yes |  |
| `display_id` | `int` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `finished_at` | `any` | Yes |  |
| `finished_at_label` | `any` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `any` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `operation_key` | `any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rollback_reason` | `any` | Yes |  |
| `rollback_source_deployment_id` | `any` | Yes |  |
| `rollback_source_release_id` | `any` | Yes |  |
| `rollback_target_release_id` | `any` | Yes |  |
| `source_ref` | `any` | Yes |  |
| `started_at` | `any` | Yes |  |
| `started_at_label` | `any` | Yes |  |
| `status` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppDeployment(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppDeployment(nil).Load(map[string]any{"id": "app_deployment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppDeployment(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppDeployment(nil).Update(map[string]any{
    "id": "app_deployment_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppDeployment(nil).Patch(map[string]any{
    "id": "app_deployment_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppDeployment(nil).Remove(map[string]any{"id": "app_deployment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppDeploymentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppDeploymentOperationEntity

```go
appDeploymentOperation := client.AppDeploymentOperation(nil)
fmt.Println(appDeploymentOperation.GetName()) // "app_deployment_operation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `map[string]any` | Yes |  |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `any` | Yes |  |
| `build_duration_seconds` | `any` | Yes |  |
| `build_source` | `any` | Yes |  |
| `build_status` | `string` | Yes |  |
| `children` | `[]any` | Yes |  |
| `ci_pipeline_id` | `any` | Yes |  |
| `ci_pipeline_run_id` | `any` | Yes |  |
| `commit_sha` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator` | `any` | Yes |  |
| `deployed_url` | `any` | Yes |  |
| `duration_seconds` | `any` | Yes |  |
| `environment` | `map[string]any` | Yes |  |
| `failure_message` | `string` | No |  |
| `finished_at` | `string` | No |  |
| `history_kind` | `string` | Yes |  |
| `history_reason` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `is_live` | `bool` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `live_region_count` | `int` | Yes |  |
| `location_id` | `string` | No |  |
| `number` | `int` | Yes |  |
| `placement` | `any` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollback_reason` | `any` | Yes |  |
| `rollback_source_release_id` | `any` | Yes |  |
| `rollback_target_release_id` | `any` | Yes |  |
| `rollout_predecessor_id` | `any` | Yes |  |
| `rollout_status` | `string` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `service` | `map[string]any` | Yes |  |
| `source_ref` | `any` | Yes |  |
| `started_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `total_replicas` | `int` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppDeploymentOperation(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppDeploymentOperation(nil).Load(map[string]any{"id": "app_deployment_operation_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppDeploymentOperation(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppDeploymentOperationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppDeploymentRollbackEntity

```go
appDeploymentRollback := client.AppDeploymentRollback(nil)
fmt.Println(appDeploymentRollback.GetName()) // "app_deployment_rollback"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_id` | `string` | Yes |  |
| `app_service_id` | `string` | No |  |
| `blockers` | `[]any` | Yes |  |
| `candidate_releases` | `[]any` | Yes |  |
| `confirmation_text` | `string` | Yes |  |
| `current_deployment` | `any` | Yes |  |
| `current_release` | `any` | Yes |  |
| `deployment` | `any` | Yes |  |
| `desired_state` | `any` | Yes |  |
| `environment` | `any` | Yes |  |
| `execution_allowed` | `bool` | Yes |  |
| `force` | `bool` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `idempotent_reuse` | `bool` | Yes |  |
| `location` | `any` | Yes |  |
| `operation` | `any` | Yes |  |
| `reason` | `any` | Yes |  |
| `rollback_release` | `any` | Yes |  |
| `rollout` | `any` | Yes |  |
| `service` | `any` | Yes |  |
| `target_artifact_locator` | `any` | Yes |  |
| `target_release` | `any` | Yes |  |
| `to` | `string` | No |  |
| `warnings` | `[]any` | Yes |  |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppDeploymentRollback(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppDeploymentRollbackEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppEnvironmentEntity

```go
appEnvironment := client.AppEnvironment(nil)
fmt.Println(appEnvironment.GetName()) // "app_environment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `base_domain` | `any` | Yes |  |
| `branch_pattern` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppEnvironment(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppEnvironment(nil).Load(map[string]any{"id": "app_environment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppEnvironment(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "auto_deploy": true,
    "kind": "example_kind",
    "location_id": "example_location_id",
    "name": "example_name",
    "slug": "example_slug",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppEnvironment(nil).Update(map[string]any{
    "id": "app_environment_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppEnvironment(nil).Patch(map[string]any{
    "id": "app_environment_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppEnvironment(nil).Remove(map[string]any{"id": "app_environment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppEnvironmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppLocationEntity

```go
appLocation := client.AppLocation(nil)
fmt.Println(appLocation.GetName()) // "app_location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `location_id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_datacenter` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppLocation(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppLocation(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "location_id": "example_location_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppLocation(nil).Remove(map[string]any{"id": "app_location_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppLocationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppMetricEntity

```go
appMetric := client.AppMetric(nil)
fmt.Println(appMetric.GetName()) // "app_metric"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppMetricEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppPreviewEntity

```go
appPreview := client.AppPreview(nil)
fmt.Println(appPreview.GetName()) // "app_preview"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No |  |
| `app_preview_profile_id` | `string` | Yes |  |
| `change_number` | `string` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `int` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `int` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `resource_overrides` | `map[string]any` | No | Service public IDs mapped to resource overrides. |
| `retained` | `bool` | No |  |
| `shared_data_binding_ids` | `[]any` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `[]any` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` | Yes |  |
| `source_ref` | `string` | No |  |
| `storage_binding_resources` | `map[string]any` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppPreview(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppPreview(nil).Load(map[string]any{"id": "app_preview_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppPreview(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "app_preview_profile_id": "example_app_preview_profile_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppPreview(nil).Update(map[string]any{
    "id": "app_preview_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppPreview(nil).Patch(map[string]any{
    "id": "app_preview_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppPreview(nil).Remove(map[string]any{"id": "app_preview_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppPreviewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppPreviewProfileEntity

```go
appPreviewProfile := client.AppPreviewProfile(nil)
fmt.Println(appPreviewProfile.GetName()) // "app_preview_profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `bool` | No |  |
| `configuration` | `map[string]any` | No |  |
| `created_at` | `string` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_environment_id` | `string` | Yes |  |
| `ttl_days` | `int` | No |  |
| `updated_at` | `string` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppPreviewProfile(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppPreviewProfile(nil).Load(map[string]any{"id": "app_preview_profile_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppPreviewProfile(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "slug": "example_slug",
    "source_environment_id": "example_source_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppPreviewProfile(nil).Update(map[string]any{
    "id": "app_preview_profile_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppPreviewProfile(nil).Patch(map[string]any{
    "id": "app_preview_profile_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppPreviewProfile(nil).Remove(map[string]any{"id": "app_preview_profile_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppPreviewProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppRunEntity

```go
appRun := client.AppRun(nil)
fmt.Println(appRun.GetName()) // "app_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppRun(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppRun(nil).Load(map[string]any{"id": "app_run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppRun(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppSecretEntity

```go
appSecret := client.AppSecret(nil)
fmt.Println(appSecret.GetName()) // "app_secret"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `any` | No |  |
| `env_key` | `any` | No |  |
| `expose_to_build` | `bool` | No |  |
| `has_value` | `bool` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_version_number` | `any` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rotation_policy` | `any` | No |  |
| `scope_kind` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `value` | `string` | No |  |
| `value_digest` | `any` | No |  |
| `value_kind` | `any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppSecret(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppSecret(nil).Load(map[string]any{"id": "app_secret_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppSecret(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppSecret(nil).Update(map[string]any{
    "id": "app_secret_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppSecret(nil).Patch(map[string]any{
    "id": "app_secret_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppSecret(nil).Remove(map[string]any{"id": "app_secret_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppSecretEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppServiceEntity

```go
appService := client.AppService(nil)
fmt.Println(appService.GetName()) // "app_service"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `bindings` | `[]any` | Yes |  |
| `build_command` | `any` | Yes |  |
| `cpu_label` | `any` | Yes |  |
| `cpu_mhz` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `deploy_paths` | `[]any` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` | Yes |  |
| `disk_label` | `any` | Yes |  |
| `disk_mb` | `any` | Yes |  |
| `effective_deploy_paths` | `[]any` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `any` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `internal_port` | `any` | Yes |  |
| `kind` | `string` | Yes |  |
| `memory_label` | `any` | Yes |  |
| `memory_max_label` | `any` | Yes |  |
| `memory_max_mb` | `any` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_constraints_json` | `any` | Yes |  |
| `nomad_kill_timeout_seconds` | `any` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `any` | Yes |  |
| `nomad_region` | `any` | Yes |  |
| `nomad_shutdown_delay_seconds` | `any` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `any` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `any` | Yes |  |
| `prestart_command` | `any` | Yes |  |
| `publicly_accessible` | `bool` | Yes |  |
| `release_command` | `any` | Yes |  |
| `repo_source_path` | `string` | Yes |  |
| `runtime` | `string` | Yes |  |
| `runtime_adapter_kind` | `string` | Yes |  |
| `runtime_adapter_settings_json` | `any` | Yes |  |
| `schedule` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_path` | `string` | Yes |  |
| `start_command` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppService(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppService(nil).Load(map[string]any{"id": "app_service_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppService(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "auto_deploy": true,
    "desired_instances": 1,
    "kind": "example_kind",
    "name": "example_name",
    "publicly_accessible": true,
    "runtime": "example_runtime",
    "runtime_adapter_kind": "example_runtime_adapter_kind",
    "slug": "example_slug",
    "source_path": "example_source_path",
    "start_command": "example_start_command",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppService(nil).Update(map[string]any{
    "id": "app_service_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppService(nil).Patch(map[string]any{
    "id": "app_service_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppService(nil).Remove(map[string]any{"id": "app_service_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppServiceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppServiceBindingEntity

```go
appServiceBinding := client.AppServiceBinding(nil)
fmt.Println(appServiceBinding.GetName()) // "app_service_binding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppServiceBinding(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppServiceBinding(nil).Load(map[string]any{"id": "app_service_binding_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppServiceBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppServiceBinding(nil).Update(map[string]any{
    "id": "app_service_binding_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppServiceBinding(nil).Patch(map[string]any{
    "id": "app_service_binding_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppServiceBinding(nil).Remove(map[string]any{"id": "app_service_binding_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppServiceBindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppServicePlacementEntity

```go
appServicePlacement := client.AppServicePlacement(nil)
fmt.Println(appServicePlacement.GetName()) // "app_service_placement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment_channel` | `any` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `targets` | `[]any` | Yes |  |
| `total_replicas` | `int` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppServicePlacement(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppServicePlacement(nil).Load(map[string]any{"id": "app_service_placement_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppServicePlacementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppStorageResourceEntity

```go
appStorageResource := client.AppStorageResource(nil)
fmt.Println(appStorageResource.GetName()) // "app_storage_resource"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `any` | Yes |  |
| `attachment` | `any` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `any` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `ephemeral` | `bool` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `any` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location_code` | `any` | Yes |  |
| `location_id` | `any` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes | Storage backend. |
| `provider_error` | `any` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppStorageResource(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppStorageResource(nil).Load(map[string]any{"id": "app_storage_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppStorageResource(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "access_mode": "example_access_mode",
    "kind": "example_kind",
    "name": "example_name",
    "provider": "example_provider",
    "slug": "example_slug",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppStorageResource(nil).Update(map[string]any{
    "id": "app_storage_resource_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.AppStorageResource(nil).Patch(map[string]any{
    "id": "app_storage_resource_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppStorageResource(nil).Remove(map[string]any{"id": "app_storage_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppStorageResourceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AttachmentPartEntity

```go
attachmentPart := client.AttachmentPart(nil)
fmt.Println(attachmentPart.GetName()) // "attachment_part"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AttachmentPart(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "attachment_id": "attachment_id",
    "id": "id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AttachmentPartEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AutomationEventEntity

```go
automationEvent := client.AutomationEvent(nil)
fmt.Println(automationEvent.GetName()) // "automation_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `event_subscriptions` | `[]any` | Yes |  |
| `event_triggers` | `[]any` | Yes |  |
| `expected_revision` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `[]any` | Yes |  |
| `settings` | `map[string]any` | No |  |
| `subscription_key` | `string` | Yes |  |
| `version` | `map[string]any` | Yes |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AutomationEvent(nil).Update(map[string]any{
    "agent_id": "agent_id",
    "automation_id": "automation_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AutomationEventEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AutomationRunEntity

```go
automationRun := client.AutomationRun(nil)
fmt.Println(automationRun.GetName()) // "automation_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `any` | Yes | Saved native automation identity. |
| `budget_seconds` | `any` | Yes | The run stops once it has been running this long |
| `budget_usd` | `any` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `any` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `any` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `map[string]any` | Yes |  |
| `error` | `any` | Yes |  |
| `finished_at` | `any` | Yes |  |
| `flow_steps` | `any` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes |  |
| `input` | `map[string]any` | Yes |  |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `any` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `any` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` | Yes |  |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `any` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float64` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `any` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `[]any` | Yes |  |
| `trigger_id` | `any` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` | Yes |  |
| `wake_at` | `any` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `any` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AutomationRun(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "automation_id": "example_automation_id",
    "organization_id": "example_organization_id",
    "input": map[string]any{},
    "request_id": "example_request_id",
    "version_id": "example_version_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AutomationRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BinaryEntity

```go
binary := client.Binary(nil)
fmt.Println(binary.GetName()) // "binary"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `bool` | Yes |  |
| `arch` | `any` | No |  |
| `archived_at` | `any` | Yes |  |
| `binary` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `executable` | `string` | Yes |  |
| `format` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `latest_version` | `any` | Yes |  |
| `launch_args` | `[]any` | No |  |
| `name` | `string` | Yes |  |
| `needs_refresh` | `bool` | Yes |  |
| `operation` | `map[string]any` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `platform` | `any` | No |  |
| `project_id` | `string` | Yes |  |
| `sha256` | `string` | No |  |
| `slug` | `string` | Yes |  |
| `version` | `map[string]any` | Yes |  |
| `version_defaults` | `any` | No |  |
| `versions` | `[]any` | Yes |  |
| `window_title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Binary(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Binary(nil).Load(map[string]any{"id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Binary(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "download_url": "example_download_url",
    "executable": "example_executable",
    "format": "example_format",
    "idempotency_key": "example_idempotency_key",
    "name": "example_name",
    "slug": "example_slug",
    "window_title": "example_window_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BinaryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BinaryVersionEntity

```go
binaryVersion := client.BinaryVersion(nil)
fmt.Println(binaryVersion.GetName()) // "binary_version"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `any` | No |  |
| `cancelable` | `bool` | Yes |  |
| `configuration` | `map[string]any` | Yes |  |
| `configuration_digest` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deletable` | `bool` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `environment_uses` | `[]any` | Yes |  |
| `executable` | `string` | No |  |
| `format` | `any` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `launch_args` | `[]any` | No |  |
| `operation` | `map[string]any` | Yes |  |
| `package_sha256` | `any` | Yes |  |
| `package_size` | `any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `platform` | `any` | No |  |
| `preparations` | `[]any` | Yes |  |
| `retryable` | `bool` | Yes |  |
| `sha256` | `string` | No |  |
| `status` | `string` | Yes |  |
| `version` | `map[string]any` | Yes |  |
| `window_title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BinaryVersion(nil).List(map[string]any{"binary_id": "example", "organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BinaryVersion(nil).Load(map[string]any{"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BinaryVersion(nil).Create(map[string]any{
    "binary_id": "example_binary_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "download_url": "example_download_url",
    "idempotency_key": "example_idempotency_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.BinaryVersion(nil).Remove(map[string]any{"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BinaryVersionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserEgressCandidateEntity

```go
browserEgressCandidate := client.BrowserEgressCandidate(nil)
fmt.Println(browserEgressCandidate.GetName()) // "browser_egress_candidate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BrowserEgressCandidate(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserEgressCandidateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionEntity

```go
browserSession := client.BrowserSession(nil)
fmt.Println(browserSession.GetName()) // "browser_session"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `any` | No |  |
| `authentication_status` | `string` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `any` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `any` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `any` | No |  |
| `closure_basis` | `any` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` | Yes |  |
| `controller` | `string` | Yes |  |
| `credential_id` | `any` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `any` | No |  |
| `expires_at` | `string` | Yes |  |
| `failure_code` | `any` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `initial_url` | `string` | Yes |  |
| `max_seconds` | `int` | No |  |
| `pending_control_id` | `any` | No |  |
| `project_id` | `any` | No | Optional project slug or public ID. |
| `reconciled_at` | `any` | No |  |
| `started_at` | `any` | No |  |
| `status` | `string` | Yes |  |
| `url` | `string` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `any` | No |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BrowserSession(nil).Load(map[string]any{"id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BrowserSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.BrowserSession(nil).Remove(map[string]any{"id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionConnectionEntity

```go
browserSessionConnection := client.BrowserSessionConnection(nil)
fmt.Println(browserSessionConnection.GetName()) // "browser_session_connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `int` | Yes |  |
| `idempotency_key` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionConnection(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
    "generation": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionConnectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionControlEntity

```go
browserSessionControl := client.BrowserSessionControl(nil)
fmt.Println(browserSessionControl.GetName()) // "browser_session_control"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `completed_at` | `any` | No |  |
| `completed_generation` | `any` | No |  |
| `connection` | `any` | No |  |
| `failure_code` | `any` | No |  |
| `id` | `string` | Yes |  |
| `requested_controller` | `string` | Yes |  |
| `requested_generation` | `int` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionControl(nil).Load(map[string]any{"id": "browser_session_control_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionControlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionEventEntity

```go
browserSessionEvent := client.BrowserSessionEvent(nil)
fmt.Println(browserSessionEvent.GetName()) // "browser_session_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `any` | No |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `payload` | `map[string]any` | Yes |  |
| `source_sequence` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BrowserSessionEvent(nil).List(map[string]any{"browser_session_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionEventEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionMediaEntity

```go
browserSessionMedia := client.BrowserSessionMedia(nil)
fmt.Println(browserSessionMedia.GetName()) // "browser_session_media"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `capture_omissions` | `any` | No |  |
| `captured_at` | `any` | No |  |
| `ended_at` | `any` | No |  |
| `failure_code` | `any` | No |  |
| `files` | `[]any` | Yes |  |
| `frames` | `any` | No |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `partial` | `bool` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` | Yes |  |
| `source` | `any` | No | Screenshot provenance. |
| `status` | `string` | Yes |  |
| `stop_requested_at` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionMedia(nil).Load(map[string]any{"id": "browser_session_media_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionMediaEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionRecordingEntity

```go
browserSessionRecording := client.BrowserSessionRecording(nil)
fmt.Println(browserSessionRecording.GetName()) // "browser_session_recording"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionRecording(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionRecordingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionScreenshotEntity

```go
browserSessionScreenshot := client.BrowserSessionScreenshot(nil)
fmt.Println(browserSessionScreenshot.GetName()) // "browser_session_screenshot"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `string` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionScreenshot(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionScreenshotEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BrowserSessionTaskEntity

```go
browserSessionTask := client.BrowserSessionTask(nil)
fmt.Println(browserSessionTask.GetName()) // "browser_session_task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `any` | No |  |
| `browser_session_id` | `string` | Yes |  |
| `cancel_requested_at` | `any` | No |  |
| `completed_at` | `any` | No |  |
| `control_generation` | `any` | No |  |
| `deadline_at` | `string` | Yes |  |
| `effects_unknown` | `bool` | Yes |  |
| `failure_code` | `any` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `instruction` | `string` | Yes |  |
| `max_rounds` | `int` | Yes |  |
| `max_seconds` | `int` | No |  |
| `model_selection` | `map[string]any` | Yes |  |
| `outcome` | `any` | No |  |
| `result` | `map[string]any` | Yes |  |
| `started_at` | `any` | No |  |
| `status` | `string` | Yes |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionTask(nil).Load(map[string]any{"id": "browser_session_task_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BrowserSessionTask(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
    "instruction": "example_instruction",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrowserSessionTaskEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CatalogSelectorEntity

```go
catalogSelector := client.CatalogSelector(nil)
fmt.Println(catalogSelector.GetName()) // "catalog_selector"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CatalogSelector(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CatalogSelectorEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CdnDeploymentEntity

```go
cdnDeployment := client.CdnDeployment(nil)
fmt.Println(cdnDeployment.GetName()) // "cdn_deployment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CdnDeployment(nil).List(map[string]any{"app_id": "example", "cdn_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CdnDeployment(nil).Load(map[string]any{"id": "cdn_deployment_id", "app_id": "app_id", "cdn_id": "cdn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CdnDeployment(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "cdn_id": "example_cdn_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CdnDeploymentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CdnHostnameEntity

```go
cdnHostname := client.CdnHostname(nil)
fmt.Println(cdnHostname.GetName()) // "cdn_hostname"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `force_ssl` | `bool` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `provider_hostname_id` | `any` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CdnHostname(nil).List(map[string]any{"app_id": "example", "cdn_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CdnHostname(nil).Load(map[string]any{"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CdnHostname(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "cdn_id": "example_cdn_id",
    "hostname": "example_hostname",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CdnHostname(nil).Update(map[string]any{
    "id": "cdn_hostname_id",
    "app_id": "app_id",
    "cdn_id": "cdn_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.CdnHostname(nil).Patch(map[string]any{
    "id": "cdn_hostname_id",
    "app_id": "app_id",
    "cdn_id": "cdn_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CdnHostname(nil).Remove(map[string]any{"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CdnHostnameEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CdnSpaceEntity

```go
cdnSpace := client.CdnSpace(nil)
fmt.Println(cdnSpace.GetName()) // "cdn_space"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CdnSpace(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CdnSpace(nil).Load(map[string]any{"id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CdnSpace(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CdnSpace(nil).Update(map[string]any{
    "id": "cdn_space_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.CdnSpace(nil).Patch(map[string]any{
    "id": "cdn_space_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CdnSpace(nil).Remove(map[string]any{"id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CdnSpaceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CdnSpaceObjectEntity

```go
cdnSpaceObject := client.CdnSpaceObject(nil)
fmt.Println(cdnSpaceObject.GetName()) // "cdn_space_object"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CdnSpaceObject(nil).List(map[string]any{"cdn_space_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CdnSpaceObject(nil).Load(map[string]any{"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CdnSpaceObject(nil).Update(map[string]any{
    "cdn_space_id": "cdn_space_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CdnSpaceObject(nil).Remove(map[string]any{"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CdnSpaceObjectEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ConnectionRequestEntity

```go
connectionRequest := client.ConnectionRequest(nil)
fmt.Println(connectionRequest.GetName()) // "connection_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `error_code` | `any` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `any` | Yes |  |
| `retired_at` | `any` | Yes |  |
| `revoked_at` | `any` | Yes |  |
| `source_operation_id` | `any` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ConnectionRequest(nil).Load(map[string]any{"id": "connection_request_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConnectionRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ConnectionSourceEntity

```go
connectionSource := client.ConnectionSource(nil)
fmt.Println(connectionSource.GetName()) // "connection_source"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `device_id` | `string` | Yes |  |
| `device_name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `source_operation_id` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ConnectionSource(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConnectionSourceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CoordinationWaitEntity

```go
coordinationWait := client.CoordinationWait(nil)
fmt.Println(coordinationWait.GetName()) // "coordination_wait"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `bool` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `stop_state` | `any` | Yes |  |
| `wake_outcome` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CoordinationWait(nil).List(map[string]any{"agent_id": "example", "coordination_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoordinationWaitEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CredentialSignInCheckEntity

```go
credentialSignInCheck := client.CredentialSignInCheck(nil)
fmt.Println(credentialSignInCheck.GetName()) // "credential_sign_in_check"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes | The project environment (app) to sign in to |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CredentialSignInCheck(nil).Create(map[string]any{
    "credential_id": "example_credential_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "environment_id": "example_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CredentialSignInCheckEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DataResourceRotateCredentialEntity

```go
dataResourceRotateCredential := client.DataResourceRotateCredential(nil)
fmt.Println(dataResourceRotateCredential.GetName()) // "data_resource_rotate_credential"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `any` | Yes |  |
| `provider_metadata` | `map[string]any` | Yes |  |
| `region` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `any` | Yes |  |
| `storage_label` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DataResourceRotateCredential(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "data_resource_id": "example_data_resource_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DataResourceRotateCredentialEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeepScanEntity

```go
deepScan := client.DeepScan(nil)
fmt.Println(deepScan.GetName()) // "deep_scan"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | No |  |
| `active` | `[]any` | Yes |  |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `[]any` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `map[string]any` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `map[string]any` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DeepScan(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DeepScan(nil).Load(map[string]any{"id": "deep_scan_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DeepScan(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "environment_id": "example_environment_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeepScanEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeepScanFindingEntity

```go
deepScanFinding := client.DeepScanFinding(nil)
fmt.Println(deepScanFinding.GetName()) // "deep_scan_finding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `int` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `[]any` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `[]any` | Yes |  |
| `findings_fix_prompt` | `any` | Yes |  |
| `free_findings_pending` | `bool` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `priority` | `any` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | Yes |  |
| `reproduction_of` | `any` | Yes |  |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `unlock` | `map[string]any` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DeepScanFinding(nil).List(map[string]any{"deep_scan_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeepScanFindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeepScanFlowEntity

```go
deepScanFlow := client.DeepScanFlow(nil)
fmt.Println(deepScanFlow.GetName()) // "deep_scan_flow"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | No |  |
| `concurrency` | `int` | No |  |
| `environment_id` | `string` | No |  |
| `exploration_id` | `string` | No |  |
| `flow_names` | `[]any` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `int` | No |  |
| `max_testers` | `int` | No |  |
| `note` | `any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DeepScanFlow(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "flow_names": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeepScanFlowEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeepScanMappedFlowEntity

```go
deepScanMappedFlow := client.DeepScanMappedFlow(nil)
fmt.Println(deepScanMappedFlow.GetName()) // "deep_scan_mapped_flow"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | Yes |  |
| `environment_id` | `string` | Yes |  |
| `flow_map` | `any` | Yes |  |
| `revision_id` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DeepScanMappedFlow(nil).List(map[string]any{"organization_id": "example", "environment_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeepScanMappedFlowEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeepScanOptionEntity

```go
deepScanOption := client.DeepScanOption(nil)
fmt.Println(deepScanOption.GetName()) // "deep_scan_option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `[]any` | Yes |  |
| `deep_scan_defaults` | `any` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `any` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `personas` | `[]any` | No |  |
| `preview` | `bool` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DeepScanOption(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeepScanOptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DemoShareEntity

```go
demoShare := client.DemoShare(nil)
fmt.Println(demoShare.GetName()) // "demo_share"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `map[string]any` | Yes |  |
| `summary` | `string` | Yes | What the recorded browser confirmed. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DemoShare(nil).Load(map[string]any{"id": "demo_share_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DemoShareEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DemoShareSegmentEntity

```go
demoShareSegment := client.DemoShareSegment(nil)
fmt.Println(demoShareSegment.GetName()) // "demo_share_segment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DemoShareSegment(nil).Load(map[string]any{"id": "demo_share_segment_id", "demo_share_id": "demo_share_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DemoShareSegmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeploymentDashboardNomadEntity

```go
deploymentDashboardNomad := client.DeploymentDashboardNomad(nil)
fmt.Println(deploymentDashboardNomad.GetName()) // "deployment_dashboard_nomad"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeploymentDashboardNomadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeploymentFileEntity

```go
deploymentFile := client.DeploymentFile(nil)
fmt.Println(deploymentFile.GetName()) // "deployment_file"
```

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DeploymentFile(nil).Update(map[string]any{
    "deployment_id": "deployment_id",
    "static_site_id": "static_site_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeploymentFileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainPathRuleEntity

```go
domainPathRule := client.DomainPathRule(nil)
fmt.Println(domainPathRule.GetName()) // "domain_path_rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `string` | Yes |  |
| `app_service_endpoint_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `backend_ref` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_error` | `any` | Yes |  |
| `path_prefix` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainPathRule(nil).List(map[string]any{"app_id": "example", "domain_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainPathRule(nil).Load(map[string]any{"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainPathRule(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "domain_id": "example_domain_id",
    "app_service_id": "example_app_service_id",
    "path_prefix": "example_path_prefix",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainPathRule(nil).Update(map[string]any{
    "id": "domain_path_rule_id",
    "app_id": "app_id",
    "domain_id": "domain_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.DomainPathRule(nil).Patch(map[string]any{
    "id": "domain_path_rule_id",
    "app_id": "app_id",
    "domain_id": "domain_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainPathRule(nil).Remove(map[string]any{"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainPathRuleEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DreamEntity

```go
dream := client.Dream(nil)
fmt.Println(dream.GetName()) // "dream"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `bool` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `[]any` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `any` | Yes |  |
| `counts` | `map[string]any` | Yes |  |
| `dream` | `any` | Yes |  |
| `error_code` | `any` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Yes | Public id used in the dream's URL |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `phase` | `string` | Yes | Where the dream is. |
| `reason` | `any` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Yes | Local day whose finished runs it reviewed |
| `runs` | `[]any` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Yes | Project or unassigned environment name |
| `skipped` | `int` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `string` | Yes |  |
| `timezone` | `string` | Yes | Organization timezone the dream used |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Dream(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Dream(nil).Load(map[string]any{"id": "dream_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DreamEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentEntity

```go
environment := client.Environment(nil)
fmt.Println(environment.GetName()) // "environment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `any` | Yes |  |
| `agent_sign_up_available` | `bool` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `map[string]any` | Yes |  |
| `cleanup` | `[]any` | Yes |  |
| `connection` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_policy` | `map[string]any` | No |  |
| `default_policy_json` | `map[string]any` | Yes |  |
| `discovery_defaults` | `map[string]any` | Yes |  |
| `environment` | `map[string]any` | Yes |  |
| `exploration_accounts` | `[]any` | No |  |
| `explorations` | `[]any` | No |  |
| `first_run` | `any` | No |  |
| `hosted_app_id` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `any` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` | Yes |  |
| `managed_google_available` | `bool` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` | Yes |  |
| `messaging_tester_number` | `any` | No | One configured tester number. |
| `name` | `string` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `[]any` | Yes |  |
| `onboarding_discovery` | `any` | No |  |
| `organization_id` | `string` | Yes |  |
| `pending_accounts` | `[]any` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `map[string]any` | Yes |  |
| `project_id` | `any` | Yes | Owning project. |
| `repository_id` | `any` | Yes |  |
| `revisions` | `[]any` | Yes |  |
| `setup_discovery_id` | `any` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `target_kind` | `any` | Yes |  |
| `target_url` | `any` | Yes |  |
| `test_accounts` | `map[string]any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Environment(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Load(map[string]any{"id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Update(map[string]any{
    "id": "environment_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Patch(map[string]any{
    "id": "environment_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Remove(map[string]any{"id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentDiscoveryRunEntity

```go
environmentDiscoveryRun := client.EnvironmentDiscoveryRun(nil)
fmt.Println(environmentDiscoveryRun.GetName()) // "environment_discovery_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | Yes | Omit for anonymous exploration |
| `deadline_at` | `string` | Yes |  |
| `environment_revision_id` | `string` | Yes |  |
| `evidence` | `[]any` | No |  |
| `failure_code` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `queued_at` | `string` | Yes |  |
| `recording` | `map[string]any` | Yes |  |
| `result` | `any` | Yes |  |
| `status` | `string` | Yes |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EnvironmentDiscoveryRun(nil).Load(map[string]any{"id": "environment_discovery_run_id", "environment_id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentDiscoveryRun(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentExplorationEntity

```go
environmentExploration := client.EnvironmentExploration(nil)
fmt.Println(environmentExploration.GetName()) // "environment_exploration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | No |  |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `persona_id` | `any` | No |  |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentExploration(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentExplorationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentFirstRunEntity

```go
environmentFirstRun := client.EnvironmentFirstRun(nil)
fmt.Println(environmentFirstRun.GetName()) // "environment_first_run"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentFirstRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentRevisionEntity

```go
environmentRevision := client.EnvironmentRevision(nil)
fmt.Println(environmentRevision.GetName()) // "environment_revision"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `[]any` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `any` | Yes |  |
| `app_release_id` | `any` | Yes |  |
| `blueprint` | `map[string]any` | Yes |  |
| `blueprint_json` | `map[string]any` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `digest` | `string` | Yes |  |
| `dry_run` | `bool` | No |  |
| `expires_at` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `ready_at` | `any` | Yes |  |
| `resolved_manifest_json` | `map[string]any` | Yes |  |
| `retention_policy_json` | `map[string]any` | Yes |  |
| `revision` | `int` | Yes |  |
| `revoked_at` | `any` | Yes |  |
| `runner_environment_revision_id` | `any` | Yes |  |
| `safety_policy_json` | `map[string]any` | Yes |  |
| `schema_version` | `int` | Yes |  |
| `source_metadata` | `map[string]any` | No |  |
| `source_metadata_json` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `validation_json` | `map[string]any` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EnvironmentRevision(nil).Load(map[string]any{"id": "environment_revision_id", "environment_id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentRevision(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
    "blueprint": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentRevision(nil).Update(map[string]any{
    "id": "environment_revision_id",
    "environment_id": "environment_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentRevisionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentSecretBindingEntity

```go
environmentSecretBinding := client.EnvironmentSecretBinding(nil)
fmt.Println(environmentSecretBinding.GetName()) // "environment_secret_binding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `string` | Yes |  |
| `id` | `string` | No |  |
| `mode` | `string` | No |  |
| `secret_id` | `string` | No |  |
| `secret_version_id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.EnvironmentSecretBinding(nil).List(map[string]any{"app_id": "example", "environment_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentSecretBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "environment_id": "example_environment_id",
    "env_key": "example_env_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.EnvironmentSecretBinding(nil).Remove(map[string]any{"id": "environment_secret_binding_id", "app_id": "app_id", "environment_id": "environment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentSecretBindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentTestAccountEntity

```go
environmentTestAccount := client.EnvironmentTestAccount(nil)
fmt.Println(environmentTestAccount.GetName()) // "environment_test_account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `bool` | Yes |  |
| `credentials` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `persona` | `string` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `tenant` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.EnvironmentTestAccount(nil).List(map[string]any{"environment_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentTestAccount(nil).Update(map[string]any{
    "environment_id": "environment_id",
    "id": "id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.EnvironmentTestAccount(nil).Patch(map[string]any{
    "environment_id": "environment_id",
    "id": "id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentTestAccountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EvidenceEntity

```go
evidence := client.Evidence(nil)
fmt.Println(evidence.GetName()) // "evidence"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Evidence(nil).Load(map[string]any{"id": "evidence_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EvidenceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ExplorationEntity

```go
exploration := client.Exploration(nil)
fmt.Println(exploration.GetName()) // "exploration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | No |  |
| `active` | `[]any` | Yes |  |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `[]any` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `map[string]any` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `map[string]any` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `persona_id` | `any` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Exploration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Exploration(nil).Load(map[string]any{"id": "exploration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Exploration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "environment_id": "example_environment_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExplorationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ExplorationMessageEntity

```go
explorationMessage := client.ExplorationMessage(nil)
fmt.Println(explorationMessage.GetName()) // "exploration_message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ExplorationMessage(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExplorationMessageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ExplorationReportEntity

```go
explorationReport := client.ExplorationReport(nil)
fmt.Println(explorationReport.GetName()) // "exploration_report"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExplorationReportEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ExplorationScenarioEntity

```go
explorationScenario := client.ExplorationScenario(nil)
fmt.Println(explorationScenario.GetName()) // "exploration_scenario"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `map[string]any` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `[]any` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `map[string]any` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `[]any` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `[]any` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` | Yes |  |
| `priority_counts` | `map[string]any` | Yes |  |
| `project_id` | `any` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `reproduction_of` | `any` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ExplorationScenario(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExplorationScenarioEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FindingEntity

```go
finding := client.Finding(nil)
fmt.Println(finding.GetName()) // "finding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deferred_until` | `any` | No | Required future time when status is deferred |
| `finding` | `map[string]any` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `first_seen_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `bool` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `reason` | `string` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `any` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `any` | Yes |  |
| `safe_summary` | `string` | Yes |  |
| `scenario_occurrences` | `[]any` | No |  |
| `severity` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Finding(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Finding(nil).Load(map[string]any{"id": "finding_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Finding(nil).Update(map[string]any{
    "id": "finding_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Finding(nil).Patch(map[string]any{
    "id": "finding_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## GithubConnectionEntity

```go
githubConnection := client.GithubConnection(nil)
fmt.Println(githubConnection.GetName()) // "github_connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `[]any` | Yes |  |
| `github_app_installation_id` | `string` | Yes |  |
| `installations` | `[]any` | Yes |  |
| `project_id` | `string` | No | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.GithubConnection(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.GithubConnection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_app_installation_id": "example_github_app_installation_id",
    "repositories": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GithubConnectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HostingAppDomainEntity

```go
hostingAppDomain := client.HostingAppDomain(nil)
fmt.Println(hostingAppDomain.GetName()) // "hosting_app_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `certificate` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `any` | Yes |  |
| `path_rules` | `[]any` | Yes |  |
| `record_name` | `any` | Yes |  |
| `record_type` | `any` | Yes |  |
| `record_value` | `any` | Yes |  |
| `redirect_to` | `any` | Yes |  |
| `static_site_id` | `any` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_record` | `any` | Yes |  |
| `verification_status` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HostingAppDomain(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.HostingAppDomain(nil).Load(map[string]any{"id": "hosting_app_domain_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.HostingAppDomain(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "app_service_id": "example_app_service_id",
    "hostname": "example_hostname",
    "kind": "example_kind",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.HostingAppDomain(nil).Update(map[string]any{
    "id": "hosting_app_domain_id",
    "app_id": "app_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.HostingAppDomain(nil).Patch(map[string]any{
    "id": "hosting_app_domain_id",
    "app_id": "app_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.HostingAppDomain(nil).Remove(map[string]any{"id": "hosting_app_domain_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HostingAppDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ImageRepositoryEntity

```go
imageRepository := client.ImageRepository(nil)
fmt.Println(imageRepository.GetName()) // "image_repository"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `hosted_app_id` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provider_kind` | `string` | Yes |  |
| `registry_auth_token` | `string` | No |  |
| `repository_path` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |
| `visibility` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ImageRepository(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ImageRepository(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImageRepositoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IntegrationEntity

```go
integration := client.Integration(nil)
fmt.Println(integration.GetName()) // "integration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `map[string]any` | Yes |  |
| `gitlab` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `slack` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Integration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## InteractionResponseEntity

```go
interactionResponse := client.InteractionResponse(nil)
fmt.Println(interactionResponse.GetName()) // "interaction_response"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `map[string]any` | Yes |  |
| `conversation_id` | `string` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.InteractionResponse(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "interaction_id": "example_interaction_id",
    "organization_id": "example_organization_id",
    "answer": map[string]any{},
    "conversation_id": "example_conversation_id",
    "expected_revision": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InteractionResponseEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## InvitationEntity

```go
invitation := client.Invitation(nil)
fmt.Println(invitation.GetName()) // "invitation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `any` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `any` | Yes |  |
| `expires_at_label` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `any` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `organization` | `map[string]any` | Yes |  |
| `revoked_at` | `any` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Invitation(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Invitation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Invitation(nil).Remove(map[string]any{"id": "invitation_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InvitationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## JourneyVariantReplayEntity

```go
journeyVariantReplay := client.JourneyVariantReplay(nil)
fmt.Println(journeyVariantReplay.GetName()) // "journey_variant_replay"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `any` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `any` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `max_seconds` | `int` | No |  |
| `preparation_receipt` | `any` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `any` | Yes |  |
| `scenario_file` | `map[string]any` | Yes |  |
| `scenario_run_id` | `any` | Yes |  |
| `source_digest` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variant_id` | `string` | Yes |  |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.JourneyVariantReplay(nil).Create(map[string]any{
    "journey_variant_id": "example_journey_variant_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "idempotency_key": "example_idempotency_key",
    "review_reason": "example_review_reason",
    "scenario_file": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JourneyVariantReplayEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## KnowledgeEntity

```go
knowledge := client.Knowledge(nil)
fmt.Println(knowledge.GetName()) // "knowledge"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `string` | Yes |  |
| `content_json` | `map[string]any` | Yes |  |
| `document` | `map[string]any` | Yes |  |
| `documents` | `[]any` | Yes |  |
| `dreaming` | `map[string]any` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `history` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `markdown` | `string` | Yes |  |
| `observed_at` | `string` | Yes |  |
| `organization` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `project_id` | `string` | Yes |  |
| `project_name` | `string` | Yes |  |
| `projects` | `[]any` | Yes |  |
| `selected_project_id` | `any` | Yes |  |
| `source` | `map[string]any` | Yes |  |
| `title` | `string` | Yes |  |
| `total` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Knowledge(nil).Load(map[string]any{"id": "knowledge_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Knowledge(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "markdown": "example_markdown",
    "project_id": "example_project_id",
    "title": "example_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Knowledge(nil).Update(map[string]any{
    "id": "knowledge_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Knowledge(nil).Patch(map[string]any{
    "id": "knowledge_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Knowledge(nil).Remove(map[string]any{"id": "knowledge_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KnowledgeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LocalThreadDeliveryEntity

```go
localThreadDelivery := client.LocalThreadDelivery(nil)
fmt.Println(localThreadDelivery.GetName()) // "local_thread_delivery"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `string` | Yes |  |
| `decision_pending` | `bool` | Yes |  |
| `delivery` | `map[string]any` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `id` | `string` | No |  |
| `policy` | `map[string]any` | Yes |  |
| `recovery_message` | `any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LocalThreadDelivery(nil).Load(map[string]any{"id": "local_thread_delivery_id", "agent_id": "agent_id", "local_thread_id": "local_thread_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LocalThreadDelivery(nil).Update(map[string]any{
    "id": "local_thread_delivery_id",
    "agent_id": "agent_id",
    "local_thread_id": "local_thread_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocalThreadDeliveryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LocalThreadOperationEntity

```go
localThreadOperation := client.LocalThreadOperation(nil)
fmt.Println(localThreadOperation.GetName()) // "local_thread_operation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `arguments` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `map[string]any` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `map[string]any` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `map[string]any` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LocalThreadOperation(nil).Load(map[string]any{"id": "local_thread_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LocalThreadOperation(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "local_thread_id": "example_local_thread_id",
    "organization_id": "example_organization_id",
    "action": "example_action",
    "arguments": map[string]any{},
    "key": "example_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocalThreadOperationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LocationEntity

```go
location := client.Location(nil)
fmt.Println(location.GetName()) // "location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_datacenter` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MeEntity

```go
me := client.Me(nil)
fmt.Println(me.GetName()) // "me"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `any` | Yes |  |
| `analytics_distinct_id` | `string` | No |  |
| `analytics_internal` | `bool` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` | No |  |
| `api_token` | `string` | No |  |
| `app_promotion` | `map[string]any` | Yes |  |
| `commit_author_email` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `enabled_features` | `[]any` | Yes |  |
| `github_pr_user_authorization_connected` | `bool` | Yes |  |
| `github_pr_user_authorization_login` | `any` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `impersonation` | `any` | Yes |  |
| `name` | `any` | Yes |  |
| `next_path` | `string` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `map[string]any` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` | No |  |
| `openai_sign_in_enabled` | `bool` | No |  |
| `organizations` | `[]any` | Yes |  |
| `pending_organization_invitation_count` | `int` | Yes |  |
| `pending_organization_invitation_count_label` | `string` | Yes |  |
| `picture_url` | `any` | Yes |  |
| `superadmin` | `bool` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `any` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Me(nil).Load(map[string]any{"id": "me_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Me(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MeEmailEntity

```go
meEmail := client.MeEmail(nil)
fmt.Println(meEmail.GetName()) // "me_email"
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
| `email` | `string` | Yes |  |
| `emails` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | No |  |
| `verification_status` | `string` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MeEmail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MeEmail(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.MeEmail(nil).Update(map[string]any{
    "id": "me_email_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.MeEmail(nil).Patch(map[string]any{
    "id": "me_email_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.MeEmail(nil).Remove(map[string]any{"id": "me_email_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeEmailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MeOnboardingEntity

```go
meOnboarding := client.MeOnboarding(nil)
fmt.Println(meOnboarding.GetName()) // "me_onboarding"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeOnboardingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MediaFileEntity

```go
mediaFile := client.MediaFile(nil)
fmt.Println(mediaFile.GetName()) // "media_file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MediaFile(nil).Load(map[string]any{"id": "media_file_id", "browser_session_id": "browser_session_id", "media_id": "media_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MediaFileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MemberEntity

```go
member := client.Member(nil)
fmt.Println(member.GetName()) // "member"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `any` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `any` | Yes |  |
| `expires_at_label` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `any` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `is_self` | `bool` | Yes |  |
| `organization` | `map[string]any` | Yes |  |
| `revoked_at` | `any` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |
| `user` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Member(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Member(nil).Update(map[string]any{
    "id": "member_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Member(nil).Patch(map[string]any{
    "id": "member_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Member(nil).Remove(map[string]any{"id": "member_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MemberEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MemoryEntity

```go
memory := client.Memory(nil)
fmt.Println(memory.GetName()) // "memory"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `environment_id` | `string` | No |  |
| `finding` | `string` | Yes |  |
| `history` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `indexed_at` | `any` | Yes |  |
| `memory` | `map[string]any` | Yes |  |
| `project_id` | `string` | No |  |
| `response` | `string` | No |  |
| `scope` | `map[string]any` | Yes |  |
| `source` | `map[string]any` | Yes |  |
| `tags` | `[]any` | No |  |
| `title` | `string` | Yes |  |
| `workaround` | `string` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Memory(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Memory(nil).Load(map[string]any{"id": "memory_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Memory(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "finding": "example_finding",
    "title": "example_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Memory(nil).Remove(map[string]any{"id": "memory_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MemoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MergeRequestEntity

```go
mergeRequest := client.MergeRequest(nil)
fmt.Println(mergeRequest.GetName()) // "merge_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `[]any` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` | Yes |  |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `any` | Yes |  |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` | Yes |  |
| `findings` | `[]any` | Yes |  |
| `github_repository` | `any` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` | Yes |  |
| `head_sha` | `string` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `any` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `any` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `any` | Yes |  |
| `provider` | `string` | Yes |  |
| `pull_request` | `map[string]any` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `requested_run_id` | `any` | Yes |  |
| `runs` | `[]any` | Yes |  |
| `source_branch` | `any` | Yes |  |
| `source_repository` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MergeRequest(nil).Load(map[string]any{"id": "merge_request_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MergeRequest(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "idempotency_key": "example_idempotency_key",
    "number": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MergeRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MessagingConversationMessageEntity

```go
messagingConversationMessage := client.MessagingConversationMessage(nil)
fmt.Println(messagingConversationMessage.GetName()) // "messaging_conversation_message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `client_operation_id` | `string` | Yes |  |
| `content` | `string` | Yes |  |
| `id` | `string` | No |  |
| `media` | `map[string]any` | Yes |  |
| `media_upload_ids` | `[]any` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `[]any` | Yes |  |
| `reply_to` | `string` | No | Public ID of a visible message |
| `retry_attachment` | `bool` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `any` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `any` | No |  |
| `send_style` | `any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MessagingConversationMessage(nil).Create(map[string]any{
    "messaging_conversation_id": "example_messaging_conversation_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "client_operation_id": "example_client_operation_id",
    "content": "example_content",
    "media": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessagingConversationMessageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MessagingConversationUploadEntity

```go
messagingConversationUpload := client.MessagingConversationUpload(nil)
fmt.Println(messagingConversationUpload.GetName()) // "messaging_conversation_upload"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `map[string]any` | Yes |  |
| `upload_id` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MessagingConversationUpload(nil).Create(map[string]any{
    "messaging_conversation_id": "example_messaging_conversation_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessagingConversationUploadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MetricQueryEntity

```go
metricQuery := client.MetricQuery(nil)
fmt.Println(metricQuery.GetName()) // "metric_query"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MetricQuery(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MetricQueryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## NetworkConnectionEntity

```go
networkConnection := client.NetworkConnection(nil)
fmt.Println(networkConnection.GetName()) // "network_connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_client_vpn_profile` | `string` | No |  |
| `created_at` | `string` | Yes |  |
| `device_tag` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `oauth_client_id` | `string` | No |  |
| `oauth_client_secret` | `string` | No |  |
| `provider` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `string` | Yes |  |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.NetworkConnection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.NetworkConnection(nil).Update(map[string]any{
    "id": "id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.NetworkConnection(nil).Patch(map[string]any{
    "id": "id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NetworkConnectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## NomadAllocationEntity

```go
nomadAllocation := client.NomadAllocation(nil)
fmt.Println(nomadAllocation.GetName()) // "nomad_allocation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `client_status` | `any` | Yes |  |
| `create_time` | `any` | Yes |  |
| `datacenter` | `any` | Yes |  |
| `desired_description` | `any` | Yes |  |
| `desired_status` | `any` | Yes |  |
| `fetched_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `job_id` | `any` | Yes |  |
| `modify_time` | `any` | Yes |  |
| `name` | `any` | Yes |  |
| `namespace` | `string` | Yes |  |
| `node_id` | `any` | Yes |  |
| `node_name` | `any` | Yes |  |
| `resources` | `map[string]any` | Yes |  |
| `task_group` | `any` | Yes |  |
| `task_states` | `[]any` | Yes |  |
| `verify_runner_images` | `[]any` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.NomadAllocation(nil).Load(map[string]any{"id": "nomad_allocation_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NomadAllocationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## NomadLogEntity

```go
nomadLog := client.NomadLog(nil)
fmt.Println(nomadLog.GetName()) // "nomad_log"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `any` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.NomadLog(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NomadLogEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OrganizationEntity

```go
organization := client.Organization(nil)
fmt.Println(organization.GetName()) // "organization"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `[]any` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `google_workspace_domain` | `any` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` | Yes |  |
| `logo_url` | `any` | Yes |  |
| `member_count` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pending_invitation_count` | `int` | Yes |  |
| `personal` | `bool` | Yes |  |
| `repository_count` | `int` | Yes |  |
| `role` | `any` | Yes |  |
| `sandbox_region` | `string` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `bool` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` | Yes |  |
| `source_control_providers` | `[]any` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Create(map[string]any{
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Update(map[string]any{
    "id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Patch(map[string]any{
    "id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PageEntity

```go
page := client.Page(nil)
fmt.Println(page.GetName()) // "page"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `[]any` | Yes |  |
| `checkout_required` | `bool` | Yes |  |
| `cli_signed_in_at` | `any` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `map[string]any` | Yes |  |
| `demo_project` | `any` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `[]any` | Yes |  |
| `included_deep_scan` | `bool` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` | No |  |
| `organization` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `project` | `any` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `[]any` | No |  |
| `pull_requests` | `[]any` | No |  |
| `repositories` | `[]any` | Yes |  |
| `runs` | `[]any` | Yes |  |
| `runs_pagination` | `map[string]any` | Yes |  |
| `suggested_app_url` | `any` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Page(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PageAgentEntity

```go
pageAgent := client.PageAgent(nil)
fmt.Println(pageAgent.GetName()) // "page_agent"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `[]any` | Yes |  |
| `can_edit_integration_connections` | `bool` | Yes |  |
| `creation_enabled` | `bool` | Yes |  |
| `inbox` | `any` | No |  |
| `integration_choices` | `[]any` | Yes |  |
| `integration_choices_truncated` | `bool` | Yes |  |
| `integration_selected` | `[]any` | Yes |  |
| `model_choices` | `[]any` | No |  |
| `new_configuration` | `any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `pinned_agent` | `any` | Yes |  |
| `platform_event_types` | `[]any` | Yes |  |
| `repository_choices` | `[]any` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `runtime_versions` | `[]any` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `any` | Yes |  |
| `selected_reference` | `any` | Yes |  |
| `viewer_id` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PageAgent(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PageAgentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PageProjectRunEntity

```go
pageProjectRun := client.PageProjectRun(nil)
fmt.Println(pageProjectRun.GetName()) // "page_project_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `[]any` | Yes |  |
| `fix_scenario_count` | `int` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `[]any` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` | Yes |  |
| `id` | `string` | No |  |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `preparation_reason` | `any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `run` | `map[string]any` | Yes |  |
| `scenario_runs` | `[]any` | Yes |  |
| `selected_scenario_run` | `any` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PageProjectRun(nil).Load(map[string]any{"id": "page_project_run_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PageProjectRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PagesProjectCredentialEntity

```go
pagesProjectCredential := client.PagesProjectCredential(nil)
fmt.Println(pagesProjectCredential.GetName()) // "pages_project_credential"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `any` | No |  |
| `composal_address` | `any` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` | Yes |  |
| `credential_keys` | `map[string]any` | Yes |  |
| `description` | `any` | Yes |  |
| `email_link_auth_origins` | `[]any` | Yes |  |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `any` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `any` | Yes |  |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes |  |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `any` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `username` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PagesProjectCredential(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PagesProjectCredentialEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PagesProjectPersonaEntity

```go
pagesProjectPersona := client.PagesProjectPersona(nil)
fmt.Println(pagesProjectPersona.GetName()) // "pages_project_persona"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `int` | Yes |  |
| `credentials` | `[]any` | Yes |  |
| `needs_attention_count` | `int` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `persona_states` | `map[string]any` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `[]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PagesProjectPersona(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PagesProjectPersonaEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PagesProjectRunEntity

```go
pagesProjectRun := client.PagesProjectRun(nil)
fmt.Println(pagesProjectRun.GetName()) // "pages_project_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `string` | Yes |  |
| `environments` | `[]any` | Yes |  |
| `environments_has_more` | `bool` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `runs` | `[]any` | Yes |  |
| `selected_environment` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PagesProjectRun(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PagesProjectRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PagesProjectScenarioEntity

```go
pagesProjectScenario := client.PagesProjectScenario(nil)
fmt.Println(pagesProjectScenario.GetName()) // "pages_project_scenario"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `any` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PagesProjectScenario(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PagesProjectScenarioEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PersonalAccessTokenEntity

```go
personalAccessToken := client.PersonalAccessToken(nil)
fmt.Println(personalAccessToken.GetName()) // "personal_access_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PersonalAccessToken(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PersonalAccessToken(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.PersonalAccessToken(nil).Remove(map[string]any{"id": "personal_access_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PersonalAccessTokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PreviewOperationEntity

```go
previewOperation := client.PreviewOperation(nil)
fmt.Println(previewOperation.GetName()) // "preview_operation"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PreviewOperation(nil).List(map[string]any{"app_id": "example", "preview_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PreviewOperationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PreviewProfileSecretBindingEntity

```go
previewProfileSecretBinding := client.PreviewProfileSecretBinding(nil)
fmt.Println(previewProfileSecretBinding.GetName()) // "preview_profile_secret_binding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `string` | Yes |  |
| `id` | `string` | No |  |
| `mode` | `string` | No |  |
| `secret_id` | `string` | No |  |
| `secret_version_id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PreviewProfileSecretBinding(nil).List(map[string]any{"app_id": "example", "preview_profile_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PreviewProfileSecretBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_profile_id": "example_preview_profile_id",
    "env_key": "example_env_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.PreviewProfileSecretBinding(nil).Remove(map[string]any{"id": "preview_profile_secret_binding_id", "app_id": "app_id", "preview_profile_id": "preview_profile_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PreviewProfileSecretBindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PreviewSecretEntity

```go
previewSecret := client.PreviewSecret(nil)
fmt.Println(previewSecret.GetName()) // "preview_secret"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `string` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PreviewSecret(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_id": "example_preview_id",
    "env_key": "example_env_key",
    "name": "example_name",
    "slug": "example_slug",
    "value": "example_value",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.PreviewSecret(nil).Remove(map[string]any{"id": "preview_secret_id", "app_id": "app_id", "preview_id": "preview_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PreviewSecretEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PreviewSharingApprovalEntity

```go
previewSharingApproval := client.PreviewSharingApproval(nil)
fmt.Println(previewSharingApproval.GetName()) // "preview_sharing_approval"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `[]any` | Yes |  |
| `approved_build_secrets` | `[]any` | Yes |  |
| `approved_default_configuration` | `[]any` | Yes |  |
| `approved_default_secrets` | `[]any` | Yes |  |
| `approved_source_keys` | `[]any` | Yes |  |
| `build_keys` | `[]any` | No |  |
| `build_secrets` | `[]any` | No |  |
| `default_configuration` | `[]any` | No |  |
| `default_secrets` | `[]any` | No |  |
| `services` | `[]any` | Yes |  |
| `snapshot_version` | `int` | Yes |  |
| `source_keys` | `[]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PreviewSharingApproval(nil).List(map[string]any{"app_id": "example", "preview_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PreviewSharingApproval(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_id": "example_preview_id",
    "snapshot_version": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PreviewSharingApprovalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapIdentityDecisionEntity

```go
productMapIdentityDecision := client.ProductMapIdentityDecision(nil)
fmt.Println(productMapIdentityDecision.GetName()) // "product_map_identity_decision"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `[]any` | Yes |  |
| `operation` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `target` | `map[string]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProductMapIdentityDecision(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "observations": []any{},
    "operation": "example_operation",
    "reason": "example_reason",
    "target": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapIdentityDecisionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapJourneyEntity

```go
productMapJourney := client.ProductMapJourney(nil)
fmt.Println(productMapJourney.GetName()) // "product_map_journey"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `any` | No |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `journey` | `map[string]any` | Yes |  |
| `next_cursor` | `any` | Yes |  |
| `preview` | `any` | No |  |
| `scope` | `map[string]any` | Yes |  |
| `title` | `string` | Yes |  |
| `tree` | `map[string]any` | Yes |  |
| `tree_loaded` | `bool` | No |  |
| `variant_count` | `int` | Yes |  |
| `variants` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProductMapJourney(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProductMapJourney(nil).Load(map[string]any{"id": "product_map_journey_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapJourneyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapJourneyReplayEntity

```go
productMapJourneyReplay := client.ProductMapJourneyReplay(nil)
fmt.Println(productMapJourneyReplay.GetName()) // "product_map_journey_replay"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `any` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `any` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `preparation_receipt` | `any` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `any` | Yes |  |
| `scenario_run_id` | `any` | Yes |  |
| `source_digest` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variant_id` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProductMapJourneyReplay(nil).Load(map[string]any{"id": "product_map_journey_replay_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapJourneyReplayEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapObservationEntity

```go
productMapObservation := client.ProductMapObservation(nil)
fmt.Println(productMapObservation.GetName()) // "product_map_observation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `map[string]any` | Yes |  |
| `events` | `[]any` | Yes |  |
| `evidence_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `observation_id` | `string` | Yes |  |
| `scope` | `map[string]any` | Yes |  |
| `state` | `any` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProductMapObservation(nil).Load(map[string]any{"id": "product_map_observation_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapObservationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapQuestionEntity

```go
productMapQuestion := client.ProductMapQuestion(nil)
fmt.Println(productMapQuestion.GetName()) // "product_map_question"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `area` | `string` | No |  |
| `before` | `string` | No |  |
| `claims` | `[]any` | Yes |  |
| `evidence_truncated` | `bool` | Yes |  |
| `model` | `string` | Yes |  |
| `persona_id` | `string` | No |  |
| `query` | `string` | No |  |
| `question` | `string` | Yes |  |
| `reasoning_effort` | `string` | Yes |  |
| `revision_id` | `string` | No |  |
| `scope` | `map[string]any` | Yes |  |
| `since` | `string` | No |  |
| `state_id` | `string` | No |  |
| `status` | `string` | Yes |  |
| `unknowns` | `[]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProductMapQuestion(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "question": "example_question",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapQuestionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductMapStateEntity

```go
productMapState := client.ProductMapState(nil)
fmt.Println(productMapState.GetName()) // "product_map_state"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `any` | Yes |  |
| `attempts` | `[]any` | Yes |  |
| `captured_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `incoming` | `[]any` | Yes |  |
| `labels` | `map[string]any` | Yes |  |
| `layout` | `map[string]any` | Yes |  |
| `observation_id` | `string` | Yes |  |
| `omitted_controls` | `int` | Yes |  |
| `outgoing` | `[]any` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `scope` | `map[string]any` | Yes |  |
| `screenshot_url` | `any` | Yes |  |
| `state` | `map[string]any` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProductMapState(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProductMapState(nil).Load(map[string]any{"id": "product_map_state_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductMapStateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectEntity

```go
project := client.Project(nil)
fmt.Println(project.GetName()) // "project"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `any` | Yes |  |
| `context` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credentials` | `[]any` | Yes |  |
| `demo` | `bool` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `[]any` | Yes |  |
| `environments` | `[]any` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `icon_url` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_provider` | `map[string]any` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `network_connections` | `[]any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `overview` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `personas` | `[]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `pull_request_options` | `map[string]any` | Yes |  |
| `pull_requests` | `[]any` | Yes |  |
| `purpose` | `any` | Yes |  |
| `runs` | `[]any` | Yes |  |
| `scenario_history` | `map[string]any` | Yes |  |
| `scenario_states` | `map[string]any` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `[]any` | Yes |  |
| `setup_required` | `bool` | No |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences` | `map[string]any` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` | Yes |  |
| `website_url` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Project(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Load(map[string]any{"id": "project_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Update(map[string]any{
    "id": "project_id",
    "organization_id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Project(nil).Patch(map[string]any{
    "id": "project_id",
    "organization_id": "organization_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectAndroidApkEntity

```go
projectAndroidApk := client.ProjectAndroidApk(nil)
fmt.Println(projectAndroidApk.GetName()) // "project_android_apk"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `map[string]any` | Yes |  |
| `artifact_paths` | `[]any` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `map[string]any` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `map[string]any` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectAndroidApk(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectAndroidApkEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectCodeMapEntity

```go
projectCodeMap := client.ProjectCodeMap(nil)
fmt.Println(projectCodeMap.GetName()) // "project_code_map"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `bool` | Yes |  |
| `commit_sha` | `string` | Yes |  |
| `configured` | `bool` | Yes |  |
| `error_code` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `repository_id` | `string` | Yes |  |
| `revision` | `map[string]any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectCodeMap(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectCodeMap(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "repository_id": "example_repository_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectCodeMapEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectEnvironmentEntity

```go
projectEnvironment := client.ProjectEnvironment(nil)
fmt.Println(projectEnvironment.GetName()) // "project_environment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `string` | Yes |  |
| `allowed_origins` | `[]any` | Yes |  |
| `archived_at` | `any` | Yes |  |
| `base_url` | `any` | Yes |  |
| `base_url_changeable` | `bool` | Yes | Whether an update may send a new base_url. |
| `binary` | `string` | No |  |
| `conversation_only_messaging` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `desktop` | `any` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `any` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `messaging_conversation` | `any` | Yes |  |
| `messaging_problem` | `any` | Yes |  |
| `messaging_source` | `any` | Yes |  |
| `messaging_tester_number` | `any` | Yes | One configured tester number. |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `any` | Yes |  |
| `source_branch` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectEnvironment(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectEnvironment(nil).Load(map[string]any{"id": "project_environment_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectEnvironment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ProjectEnvironment(nil).Update(map[string]any{
    "id": "project_environment_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ProjectEnvironment(nil).Patch(map[string]any{
    "id": "project_environment_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectEnvironmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectFindingEntity

```go
projectFinding := client.ProjectFinding(nil)
fmt.Println(projectFinding.GetName()) // "project_finding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `any` | No |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `bool` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` | Yes |  |
| `source` | `string` | Yes | The workflow that produced the finding |
| `source_title` | `string` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Yes | Where the finding is reviewed within its source |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectFinding(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectFindingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectFixtureEntity

```go
projectFixture := client.ProjectFixture(nil)
fmt.Println(projectFixture.GetName()) // "project_fixture"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `[]any` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` | Yes |  |
| `content_type` | `string` | Yes |  |
| `credential_ids` | `[]any` | Yes |  |
| `credentials` | `[]any` | Yes |  |
| `environment_ids` | `[]any` | Yes |  |
| `environments` | `[]any` | Yes |  |
| `fixtures` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `persona_ids` | `[]any` | Yes |  |
| `personas` | `[]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `sha256` | `string` | Yes |  |
| `url` | `string` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectFixture(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectFixture(nil).Load(map[string]any{"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectFixture(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ProjectFixture(nil).Update(map[string]any{
    "id": "project_fixture_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ProjectFixture(nil).Patch(map[string]any{
    "id": "project_fixture_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ProjectFixture(nil).Remove(map[string]any{"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id", "version": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectFixtureEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectIosAppEntity

```go
projectIosApp := client.ProjectIosApp(nil)
fmt.Println(projectIosApp.GetName()) // "project_ios_app"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `map[string]any` | Yes |  |
| `artifact_paths` | `[]any` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `map[string]any` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `map[string]any` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectIosApp(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectIosAppEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectMessagingConversationEntity

```go
projectMessagingConversation := client.ProjectMessagingConversation(nil)
fmt.Println(projectMessagingConversation.GetName()) // "project_messaging_conversation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `string` | Yes |  |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `leased` | `bool` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `reconciled_at` | `any` | Yes |  |
| `retirable` | `bool` | Yes |  |
| `seeded` | `bool` | Yes |  |
| `send_blocked_reason` | `any` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `any` | No |  |
| `tester_number` | `string` | Yes |  |
| `unknown_send` | `bool` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectMessagingConversation(nil).Load(map[string]any{"id": "project_messaging_conversation_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectMessagingConversation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "assistant_number": "example_assistant_number",
    "tester_number": "example_tester_number",
    "verify_environment_id": "example_verify_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ProjectMessagingConversation(nil).Update(map[string]any{
    "id": "project_messaging_conversation_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ProjectMessagingConversation(nil).Patch(map[string]any{
    "id": "project_messaging_conversation_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectMessagingConversationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectOverviewMetricEntity

```go
projectOverviewMetric := client.ProjectOverviewMetric(nil)
fmt.Println(projectOverviewMetric.GetName()) // "project_overview_metric"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectOverviewMetric(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectOverviewMetricEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectOverviewPullRequestEntity

```go
projectOverviewPullRequest := client.ProjectOverviewPullRequest(nil)
fmt.Println(projectOverviewPullRequest.GetName()) // "project_overview_pull_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `any` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `any` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `any` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `any` | Yes |  |
| `latest_reason` | `any` | Yes |  |
| `latest_run_id` | `any` | Yes |  |
| `latest_state` | `any` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `any` | Yes |  |
| `project_slug` | `any` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `any` | Yes |  |
| `source_repository` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectOverviewPullRequest(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectOverviewPullRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectProductMapEntity

```go
projectProductMap := client.ProjectProductMap(nil)
fmt.Println(projectProductMap.GetName()) // "project_product_map"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectProductMapEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectRecordingEntity

```go
projectRecording := client.ProjectRecording(nil)
fmt.Println(projectRecording.GetName()) // "project_recording"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `draft` | `any` | Yes | Present once drafted. |
| `environment_id` | `string` | Yes | The project environment the browser opens. |
| `error` | `any` | Yes |  |
| `event_count` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `persona_id` | `string` | Yes | The project persona the journey acts as. |
| `phase` | `string` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `bool` | Yes |  |
| `start_path` | `string` | No | A path on the environment to start at, such as /settings. |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectRecording(nil).Load(map[string]any{"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRecording(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "environment_id": "example_environment_id",
    "persona_id": "example_persona_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ProjectRecording(nil).Remove(map[string]any{"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectRecordingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectRunPlanEntity

```go
projectRunPlan := client.ProjectRunPlan(nil)
fmt.Println(projectRunPlan.GetName()) // "project_run_plan"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `any` | Yes |  |
| `base_url` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dependencies` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `any` | Yes |  |
| `kind` | `any` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `nodes` | `[]any` | Yes |  |
| `preview` | `any` | Yes |  |
| `project_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectRunPlan(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectRunPlan(nil).Load(map[string]any{"id": "project_run_plan_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunPlan(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "dependencies": []any{},
    "identity_probe": map[string]any{},
    "name": "example_name",
    "nodes": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunPlan(nil).Update(map[string]any{
    "id": "project_run_plan_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunPlan(nil).Patch(map[string]any{
    "id": "project_run_plan_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectRunPlanEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectRunScheduleEntity

```go
projectRunSchedule := client.ProjectRunSchedule(nil)
fmt.Println(projectRunSchedule.GetName()) // "project_run_schedule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `map[string]any` | Yes |  |
| `cron_expression` | `any` | No |  |
| `environment_id` | `string` | Yes | Project environment slug or public ID. |
| `environment_name` | `string` | No |  |
| `history` | `[]any` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `[]any` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string` | Yes |  |
| `notification_channel` | `string` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` | Yes |  |
| `selection_mode` | `string` | Yes |  |
| `slack_subscription_id` | `any` | No |  |
| `source_scenario_id` | `any` | No |  |
| `state` | `string` | Yes |  |
| `time_of_day` | `string` | Yes |  |
| `time_zone` | `string` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectRunSchedule(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ProjectRunSchedule(nil).Load(map[string]any{"id": "project_run_schedule_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunSchedule(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "credential_ids": map[string]any{},
    "environment_id": "example_environment_id",
    "labels": []any{},
    "name": "example_name",
    "selection_mode": "example_selection_mode",
    "state": "example_state",
    "time_of_day": "example_time_of_day",
    "time_zone": "example_time_zone",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunSchedule(nil).Update(map[string]any{
    "id": "project_run_schedule_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ProjectRunSchedule(nil).Patch(map[string]any{
    "id": "project_run_schedule_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectRunScheduleEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectScenarioOptionEntity

```go
projectScenarioOption := client.ProjectScenarioOption(nil)
fmt.Println(projectScenarioOption.GetName()) // "project_scenario_option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `[]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `personas` | `[]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `scenario_states` | `map[string]any` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `[]any` | Yes |  |
| `schedule_options` | `any` | No |  |
| `schedules` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectScenarioOption(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectScenarioOptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectScenarioRowEntity

```go
projectScenarioRow := client.ProjectScenarioRow(nil)
fmt.Println(projectScenarioRow.GetName()) // "project_scenario_row"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `int` | Yes |  |
| `dependency_count` | `int` | Yes |  |
| `health` | `map[string]any` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `[]any` | Yes |  |
| `name` | `string` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `step_count` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectScenarioRow(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectScenarioRowEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProjectSettingEntity

```go
projectSetting := client.ProjectSetting(nil)
fmt.Println(projectSetting.GetName()) // "project_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `[]any` | Yes |  |
| `messaging_conversations` | `[]any` | Yes |  |
| `messaging_enabled` | `bool` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `tester_numbers` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ProjectSetting(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectSettingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PullRequestEntity

```go
pullRequest := client.PullRequest(nil)
fmt.Println(pullRequest.GetName()) // "pull_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `[]any` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `[]any` | Yes |  |
| `head_sha` | `string` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | Yes |  |
| `imessage_number` | `string` | No | International destination of this exact deployed commit. |
| `number` | `int` | No |  |
| `pagination` | `map[string]any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `any` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `string` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `map[string]any` | Yes |  |
| `repository_id` | `string` | No |  |
| `runs` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PullRequest(nil).Load(map[string]any{"id": "pull_request_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PullRequest(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "idempotency_key": "example_idempotency_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PullRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PullRequestSettingEntity

```go
pullRequestSetting := client.PullRequestSetting(nil)
fmt.Println(pullRequestSetting.GetName()) // "pull_request_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `any` | No |  |
| `app_service_id` | `any` | No |  |
| `bots` | `[]any` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `any` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` | Yes |  |
| `demo_videos` | `bool` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `any` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` | No |  |
| `enabled` | `bool` | Yes | Test PRs automatically. |
| `environment` | `string` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `[]any` | Yes |  |
| `github_check_enabled` | `bool` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `[]any` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` | Yes |  |
| `imessage_comment_prefix` | `any` | Yes |  |
| `imessage_number` | `any` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` | Yes |  |
| `limits` | `map[string]any` | Yes |  |
| `link_pattern` | `any` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `any` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` | No |  |
| `messaging_enabled` | `bool` | Yes |  |
| `messaging_tester_number` | `any` | Yes | One configured tester number. |
| `non_product_paths` | `[]any` | No |  |
| `permissions` | `map[string]any` | Yes |  |
| `pr_check` | `bool` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` | No |  |
| `preview_comment_authors` | `[]any` | No |  |
| `preview_comment_pattern` | `string` | No |  |
| `preview_comment_wildcard` | `any` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `any` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `[]any` | Yes |  |
| `previews` | `string` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `[]any` | Yes |  |
| `provider` | `string` | Yes |  |
| `repositories` | `[]any` | Yes |  |
| `repository` | `string` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` | Yes |  |
| `service` | `any` | Yes | composal: the public service the browsers open. |
| `settings` | `[]any` | Yes |  |
| `setup` | `any` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `map[string]any` | Yes | The answers a new setup starts from |
| `source_repository` | `string` | Yes |  |
| `target_mode` | `string` | Yes |  |
| `tester_numbers` | `[]any` | Yes |  |
| `trigger_label` | `string` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` | No |  |
| `trigger_on_label` | `bool` | No |  |
| `trigger_on_push` | `bool` | No |  |
| `trigger_on_ready` | `bool` | No |  |
| `triggers` | `map[string]any` | Yes | When runs start. |
| `verify_environment_id` | `string` | Yes |  |
| `write_scenarios` | `bool` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PullRequestSetting(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PullRequestSetting(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "bots": []any{},
    "demo_videos": true,
    "deployment": "example_deployment",
    "enabled": true,
    "environment": "example_environment",
    "imessage_comment_prefix": "example_imessage_comment_prefix",
    "imessage_number": "example_imessage_number",
    "imessage_number_source": "example_imessage_number_source",
    "limits": map[string]any{},
    "link_pattern": "example_link_pattern",
    "links": "example_links",
    "messaging_tester_number": "example_messaging_tester_number",
    "pr_check": true,
    "preview_comment_wildcard": "example_preview_comment_wildcard",
    "preview_profile": "example_preview_profile",
    "previews": "example_previews",
    "project_id": "example_project_id",
    "provider": "example_provider",
    "repository": "example_repository",
    "repository_id": "example_repository_id",
    "repository_kind": "example_repository_kind",
    "service": "example_service",
    "target_mode": "example_target_mode",
    "trigger_label": "example_trigger_label",
    "triggers": map[string]any{},
    "verify_environment_id": "example_verify_environment_id",
    "write_scenarios": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PullRequestSettingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PullRequestSettingAddRepositoryEntity

```go
pullRequestSettingAddRepository := client.PullRequestSettingAddRepository(nil)
fmt.Println(pullRequestSettingAddRepository.GetName()) // "pull_request_setting_add_repository"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `string` | Yes |  |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `[]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PullRequestSettingAddRepository(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "repositories": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PullRequestSettingDetectCommentEntity

```go
pullRequestSettingDetectComment := client.PullRequestSettingDetectComment(nil)
fmt.Println(pullRequestSettingDetectComment.GetName()) // "pull_request_setting_detect_comment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `[]any` | No | The bots answer |
| `deployment` | `string` | No | The deployment answer |
| `example_url` | `string` | No |  |
| `imessage_comment_prefix` | `string` | No |  |
| `imessage_number` | `any` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `link_pattern` | `string` | No | The link_pattern answer |
| `project_id` | `string` | Yes | Project slug or ID. |
| `provider` | `string` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | No | Repository slug, ID or owner/name. |
| `request_number` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PullRequestSettingDetectComment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecorderEntity

```go
recorder := client.Recorder(nil)
fmt.Println(recorder.GetName()) // "recorder"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Recorder(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecorderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RegistryEntity

```go
registry := client.Registry(nil)
fmt.Println(registry.GetName()) // "registry"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RegistryV2Entity

```go
registryV2 := client.RegistryV2(nil)
fmt.Println(registryV2.GetName()) // "registry_v2"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegistryV2Entity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RelayAgentLocalThreadEntity

```go
relayAgentLocalThread := client.RelayAgentLocalThread(nil)
fmt.Println(relayAgentLocalThread.GetName()) // "relay_agent_local_thread"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.RelayAgentLocalThread(nil).Remove(map[string]any{"id": "relay_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RelayAgentLocalThreadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ReportReplayEntity

```go
reportReplay := client.ReportReplay(nil)
fmt.Println(reportReplay.GetName()) // "report_replay"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes |  |
| `generated_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `map[string]any` | Yes |  |
| `replay_steps` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ReportReplay(nil).Load(map[string]any{"id": "report_replay_id", "exploration_id": "exploration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportReplayEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ReportScenarioEntity

```go
reportScenario := client.ReportScenario(nil)
fmt.Println(reportScenario.GetName()) // "report_scenario"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `string` | Yes |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `project_id` | `any` | Yes |  |
| `related_explorations` | `[]any` | Yes |  |
| `report` | `map[string]any` | Yes |  |
| `saves_scenarios` | `bool` | Yes |  |
| `scenario_generation` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ReportScenario(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportScenarioEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RunScenarioRunEntity

```go
runScenarioRun := client.RunScenarioRun(nil)
fmt.Println(runScenarioRun.GetName()) // "run_scenario_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RunScenarioRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RunScheduleOptionEntity

```go
runScheduleOption := client.RunScheduleOption(nil)
fmt.Println(runScheduleOption.GetName()) // "run_schedule_option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.RunScheduleOption(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RunScheduleOptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RunSearchEntity

```go
runSearch := client.RunSearch(nil)
fmt.Println(runSearch.GetName()) // "run_search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.RunSearch(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RunSearchEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RunUpdateEntity

```go
runUpdate := client.RunUpdate(nil)
fmt.Println(runUpdate.GetName()) // "run_update"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `any` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `any` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `any` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `any` | Yes |  |
| `latest_reason` | `any` | Yes |  |
| `latest_run_id` | `any` | Yes |  |
| `latest_state` | `any` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `any` | Yes |  |
| `project_slug` | `any` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `any` | Yes |  |
| `source_repository` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.RunUpdate(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RunUpdateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScenarioRevisionEntity

```go
scenarioRevision := client.ScenarioRevision(nil)
fmt.Println(scenarioRevision.GetName()) // "scenario_revision"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `batch` | `string` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `string` | Yes |  |
| `definition` | `map[string]any` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` | Yes |  |
| `source` | `string` | Yes | The client the save came through. |
| `user` | `any` | Yes | Null when a system job saved the Scenario. |
| `version` | `int` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ScenarioRevision(nil).List(map[string]any{"organization_id": "example", "project_id": "example", "scenario_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScenarioRevisionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScenarioRunLessonEntity

```go
scenarioRunLesson := client.ScenarioRunLesson(nil)
fmt.Println(scenarioRunLesson.GetName()) // "scenario_run_lesson"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `string` | Yes |  |
| `title` | `string` | No | Defaults to the Scenario's name. |
| `workaround` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ScenarioRunLesson(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "run_id": "example_run_id",
    "scenario_run_id": "example_scenario_run_id",
    "finding": "example_finding",
    "workaround": "example_workaround",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScenarioRunLessonEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScenarioRunScenarioEditEntity

```go
scenarioRunScenarioEdit := client.ScenarioRunScenarioEdit(nil)
fmt.Println(scenarioRunScenarioEdit.GetName()) // "scenario_run_scenario_edit"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScenarioRunScenarioEditEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ServiceEndpointEntity

```go
serviceEndpoint := client.ServiceEndpoint(nil)
fmt.Println(serviceEndpoint.GetName()) // "service_endpoint"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ServiceEndpoint(nil).List(map[string]any{"app_id": "example", "service_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ServiceEndpoint(nil).Load(map[string]any{"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ServiceEndpoint(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "service_id": "example_service_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ServiceEndpoint(nil).Update(map[string]any{
    "id": "service_endpoint_id",
    "app_id": "app_id",
    "service_id": "service_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.ServiceEndpoint(nil).Patch(map[string]any{
    "id": "service_endpoint_id",
    "app_id": "app_id",
    "service_id": "service_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ServiceEndpoint(nil).Remove(map[string]any{"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ServiceEndpointEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SitePreviewEntity

```go
sitePreview := client.SitePreview(nil)
fmt.Println(sitePreview.GetName()) // "site_preview"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `any` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `any` | Yes |  |
| `url` | `string` | Yes | The address as it will be saved |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.SitePreview(nil).Load(map[string]any{"organization_id": "organization_id", "url": "url"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SitePreviewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SlackChannelEntity

```go
slackChannel := client.SlackChannel(nil)
fmt.Println(slackChannel.GetName()) // "slack_channel"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `is_member` | `bool` | Yes |  |
| `is_private` | `bool` | Yes |  |
| `is_slack_connect` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `published` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SlackChannel(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SlackChannelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SparkAgentLocalThreadEntity

```go
sparkAgentLocalThread := client.SparkAgentLocalThread(nil)
fmt.Println(sparkAgentLocalThread.GetName()) // "spark_agent_local_thread"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `archived` | `bool` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `bool` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `bool` | No |  |
| `can_end` | `bool` | Yes |  |
| `can_interrupt` | `bool` | Yes |  |
| `can_send` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `map[string]any` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `device_name` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `full_title` | `string` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `last_activity_at` | `any` | Yes |  |
| `native_thread_id` | `string` | Yes |  |
| `parent_conversation_id` | `any` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `map[string]any` | Yes |  |
| `relay_disconnected_at` | `any` | No |  |
| `relay_participant` | `map[string]any` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `any` | No |  |
| `section` | `string` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` | Yes |  |
| `status` | `any` | Yes | What the native thread is doing. |
| `task_configured` | `bool` | Yes |  |
| `thread_id` | `string` | Yes |  |
| `title` | `string` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.SparkAgentLocalThread(nil).Load(map[string]any{"id": "spark_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.SparkAgentLocalThread(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "device_id": "example_device_id",
    "key": "example_key",
    "provider": "example_provider",
    "thread_id": "example_thread_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SparkAgentLocalThreadEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## StaticSiteEntity

```go
staticSite := client.StaticSite(nil)
fmt.Println(staticSite.GetName()) // "static_site"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `any` | Yes |  |
| `cdn_hostname` | `string` | Yes |  |
| `cdn_url` | `string` | Yes |  |
| `cname_target` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_url` | `string` | Yes |  |
| `description` | `any` | Yes |  |
| `error_document` | `any` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `hosted_app_id` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `index_document` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `provisioned_at` | `any` | Yes |  |
| `region` | `any` | Yes |  |
| `replication_regions` | `[]any` | Yes |  |
| `repository_id` | `any` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.StaticSite(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.StaticSite(nil).Load(map[string]any{"id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.StaticSite(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.StaticSite(nil).Update(map[string]any{
    "id": "static_site_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.StaticSite(nil).Patch(map[string]any{
    "id": "static_site_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.StaticSite(nil).Remove(map[string]any{"id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StaticSiteEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## StaticSiteDeploymentEntity

```go
staticSiteDeployment := client.StaticSiteDeployment(nil)
fmt.Println(staticSiteDeployment.GetName()) // "static_site_deployment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `any` | Yes |  |
| `activated_at_label` | `any` | Yes |  |
| `commit_sha` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `any` | Yes |  |
| `creator_user_id` | `any` | Yes |  |
| `deploy_slug` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `file_count` | `int` | Yes |  |
| `file_count_label` | `string` | Yes |  |
| `finished_at` | `any` | Yes |  |
| `finished_at_label` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `is_active` | `bool` | Yes |  |
| `source_ref` | `any` | Yes |  |
| `started_at` | `any` | Yes |  |
| `started_at_label` | `any` | Yes |  |
| `static_site_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `total_bytes` | `int` | Yes |  |
| `total_bytes_label` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `any` | Yes |  |
| `uploaded_at` | `any` | Yes |  |
| `uploaded_at_label` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.StaticSiteDeployment(nil).List(map[string]any{"static_site_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDeployment(nil).Load(map[string]any{"id": "static_site_deployment_id", "static_site_id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDeployment(nil).Create(map[string]any{
    "static_site_id": "example_static_site_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StaticSiteDeploymentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## StaticSiteDomainEntity

```go
staticSiteDomain := client.StaticSiteDomain(nil)
fmt.Println(staticSiteDomain.GetName()) // "static_site_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `hosted_app_id` | `any` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `any` | Yes |  |
| `record_name` | `any` | Yes |  |
| `record_type` | `any` | Yes |  |
| `record_value` | `any` | Yes |  |
| `redirect_to` | `any` | Yes |  |
| `static_site_id` | `any` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_status` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.StaticSiteDomain(nil).List(map[string]any{"static_site_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDomain(nil).Load(map[string]any{"id": "static_site_domain_id", "static_site_id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDomain(nil).Create(map[string]any{
    "static_site_id": "example_static_site_id",
    "hostname": "example_hostname",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDomain(nil).Update(map[string]any{
    "id": "static_site_domain_id",
    "static_site_id": "static_site_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDomain(nil).Patch(map[string]any{
    "id": "static_site_domain_id",
    "static_site_id": "static_site_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.StaticSiteDomain(nil).Remove(map[string]any{"id": "static_site_domain_id", "static_site_id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StaticSiteDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SubscriptionModelEntity

```go
subscriptionModel := client.SubscriptionModel(nil)
fmt.Println(subscriptionModel.GetName()) // "subscription_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `reasoning` | `[]any` | No | Effort levels this plan model accepts. |
| `speeds` | `[]any` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SubscriptionModel(nil).List(map[string]any{"agent_id": "example", "organization_id": "example", "profile_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubscriptionModelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ThreadPreviewEntity

```go
threadPreview := client.ThreadPreview(nil)
fmt.Println(threadPreview.GetName()) // "thread_preview"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `any` | Yes |  |
| `port` | `int` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ThreadPreview(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "thread_id": "example_thread_id",
    "port": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThreadPreviewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerificationProjectCredentialEntity

```go
verificationProjectCredential := client.VerificationProjectCredential(nil)
fmt.Println(verificationProjectCredential.GetName()) // "verification_project_credential"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `any` | No |  |
| `browser_session` | `string` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `any` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | No | Select the Composal-managed Google test account when available. |
| `configured` | `bool` | Yes |  |
| `cookies` | `string` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `map[string]any` | Yes |  |
| `description` | `any` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `[]any` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `any` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `any` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes | Optional sign-in path or URL. |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `oidc` | `map[string]any` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `remove_browser_authentication` | `bool` | No |  |
| `remove_totp` | `bool` | No |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `any` | Yes |  |
| `status` | `string` | Yes |  |
| `totp_secret` | `string` | No | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `string` | Yes |  |
| `username` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VerificationProjectCredential(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectCredential(nil).Load(map[string]any{"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectCredential(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "login_method": "example_login_method",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectCredential(nil).Update(map[string]any{
    "id": "verification_project_credential_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectCredential(nil).Patch(map[string]any{
    "id": "verification_project_credential_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectCredential(nil).Remove(map[string]any{"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerificationProjectCredentialEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerificationProjectPersonaEntity

```go
verificationProjectPersona := client.VerificationProjectPersona(nil)
fmt.Println(verificationProjectPersona.GetName()) // "verification_project_persona"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes |  |
| `archived_at` | `any` | Yes |  |
| `capabilities` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credential_id` | `any` | Yes | The credential this persona signs in with. |
| `goals` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VerificationProjectPersona(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectPersona(nil).Load(map[string]any{"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectPersona(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectPersona(nil).Update(map[string]any{
    "id": "verification_project_persona_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectPersona(nil).Patch(map[string]any{
    "id": "verification_project_persona_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectPersona(nil).Remove(map[string]any{"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerificationProjectPersonaEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerificationProjectRunEntity

```go
verificationProjectRun := client.VerificationProjectRun(nil)
fmt.Println(verificationProjectRun.GetName()) // "verification_project_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `any` | Yes |  |
| `approved_digest` | `any` | Yes |  |
| `archived_at` | `any` | Yes |  |
| `available_tests` | `[]any` | Yes |  |
| `can_archive` | `bool` | Yes |  |
| `can_restore` | `bool` | Yes |  |
| `can_start_another_run` | `bool` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `concurrency` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator_name` | `any` | Yes |  |
| `definition_mode` | `string` | Yes |  |
| `environment_id` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `outcome` | `any` | Yes |  |
| `permissions` | `map[string]any` | Yes |  |
| `plan_digest` | `any` | Yes |  |
| `preparation_error_code` | `any` | Yes |  |
| `progress` | `map[string]any` | Yes |  |
| `project` | `map[string]any` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `any` | Yes |  |
| `queued_at` | `any` | Yes |  |
| `run` | `map[string]any` | Yes |  |
| `run_plan_id` | `any` | No |  |
| `scenario_runs` | `[]any` | Yes |  |
| `source_run_id` | `any` | Yes |  |
| `source_versions` | `any` | Yes |  |
| `start_when_prepared` | `bool` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` | Yes |  |
| `target_snapshot` | `map[string]any` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences_snapshot` | `map[string]any` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VerificationProjectRun(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectRun(nil).Load(map[string]any{"id": "verification_project_run_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerificationProjectRunEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerificationProjectScenarioEntity

```go
verificationProjectScenario := client.VerificationProjectScenario(nil)
fmt.Println(verificationProjectScenario.GetName()) // "verification_project_scenario"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `map[string]any` | No |  |
| `allowed_actions` | `string` | Yes |  |
| `archived_at` | `any` | Yes |  |
| `cleanup` | `[]any` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` | Yes |  |
| `dependencies` | `[]any` | Yes |  |
| `fixtures` | `[]any` | No | Files upload steps choose, ordered by name. |
| `health` | `map[string]any` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `any` | No |  |
| `if` | `any` | No | A documented subset of Actions expressions. |
| `labels` | `[]any` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `on` | `any` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `[]any` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `primary_actor` | `any` | No |  |
| `project_id` | `string` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `starting_conditions` | `any` | Yes |  |
| `steps` | `[]any` | Yes |  |
| `triggers` | `[]any` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VerificationProjectScenario(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectScenario(nil).Load(map[string]any{"id": "verification_project_scenario_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectScenario(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectScenario(nil).Update(map[string]any{
    "id": "verification_project_scenario_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.VerificationProjectScenario(nil).Patch(map[string]any{
    "id": "verification_project_scenario_id",
    "organization_id": "organization_id",
    "project_id": "project_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerificationProjectScenarioEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerifyAppDomainEntity

```go
verifyAppDomain := client.VerifyAppDomain(nil)
fmt.Println(verifyAppDomain.GetName()) // "verify_app_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerifyAppDomain(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerifyAppDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerifyBrowserSessionEntity

```go
verifyBrowserSession := client.VerifyBrowserSession(nil)
fmt.Println(verifyBrowserSession.GetName()) // "verify_browser_session"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | No | Required when opening a browser for a new credential. |
| `origin` | `string` | Yes |  |
| `project_id` | `string` | Yes | The project (slug or ID) whose credential receives the session. |
| `status` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `viewer_url` | `any` | Yes | Owner-only bearer link. |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VerifyBrowserSession(nil).Load(map[string]any{"id": "verify_browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerifyBrowserSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.VerifyBrowserSession(nil).Remove(map[string]any{"id": "verify_browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerifyBrowserSessionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerifyStaticSiteDomainEntity

```go
verifyStaticSiteDomain := client.VerifyStaticSiteDomain(nil)
fmt.Println(verifyStaticSiteDomain.GetName()) // "verify_static_site_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `any` | Yes |  |
| `app_service_id` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `any` | Yes |  |
| `hosted_app_id` | `any` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `any` | Yes |  |
| `record_name` | `any` | Yes |  |
| `record_type` | `any` | Yes |  |
| `record_value` | `any` | Yes |  |
| `redirect_to` | `any` | Yes |  |
| `static_site_id` | `any` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_status` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.VerifyStaticSiteDomain(nil).Create(map[string]any{
    "id": "example_id",
    "static_site_id": "example_static_site_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerifyStaticSiteDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VersionLogEntity

```go
versionLog := client.VersionLog(nil)
fmt.Println(versionLog.GetName()) // "version_log"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `string` | Yes |  |
| `failure_phase` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `image_digest` | `any` | Yes |  |
| `image_reference` | `any` | Yes |  |
| `installer_version` | `string` | Yes |  |
| `ready_at` | `any` | Yes |  |
| `receipt` | `any` | Yes |  |
| `safe_error` | `any` | Yes |  |
| `started_at` | `any` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VersionLog(nil).List(map[string]any{"binary_id": "example", "organization_id": "example", "version_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VersionLogEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WebBotAuthEntity

```go
webBotAuth := client.WebBotAuth(nil)
fmt.Println(webBotAuth.GetName()) // "web_bot_auth"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string` | Yes |  |
| `origin` | `string` | Yes |  |
| `signatures` | `[]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.WebBotAuth(nil).Create(map[string]any{
    "origin": "example_origin",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebBotAuthEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkflowRunStepEntity

```go
workflowRunStep := client.WorkflowRunStep(nil)
fmt.Println(workflowRunStep.GetName()) // "workflow_run_step"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkflowRunStepEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkflowRunStopNoticeEntity

```go
workflowRunStopNotice := client.WorkflowRunStopNotice(nil)
fmt.Println(workflowRunStopNotice.GetName()) // "workflow_run_stop_notice"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkflowRunStopNoticeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkflowTriggerSkippedEntity

```go
workflowTriggerSkipped := client.WorkflowTriggerSkipped(nil)
fmt.Println(workflowTriggerSkipped.GetName()) // "workflow_trigger_skipped"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkflowTriggerSkippedEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewComposalSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "secrets": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

