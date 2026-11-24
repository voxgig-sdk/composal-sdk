# Composal Ruby SDK Reference

Complete API reference for the Composal Ruby SDK.


## ComposalSDK

### Constructor

```ruby
require_relative 'Composal_sdk'

client = ComposalSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ComposalSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ComposalSDK.test
```


### Instance Methods

#### `Agent(data = nil)`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentAttachment(data = nil)`

Create a new `AgentAttachment` entity instance. Pass `nil` for no initial data.

#### `AgentAutomation(data = nil)`

Create a new `AgentAutomation` entity instance. Pass `nil` for no initial data.

#### `AgentAvatar(data = nil)`

Create a new `AgentAvatar` entity instance. Pass `nil` for no initial data.

#### `AgentCommand(data = nil)`

Create a new `AgentCommand` entity instance. Pass `nil` for no initial data.

#### `AgentComputer(data = nil)`

Create a new `AgentComputer` entity instance. Pass `nil` for no initial data.

#### `AgentConnection(data = nil)`

Create a new `AgentConnection` entity instance. Pass `nil` for no initial data.

#### `AgentControlFlow(data = nil)`

Create a new `AgentControlFlow` entity instance. Pass `nil` for no initial data.

#### `AgentCoordination(data = nil)`

Create a new `AgentCoordination` entity instance. Pass `nil` for no initial data.

#### `AgentEmail(data = nil)`

Create a new `AgentEmail` entity instance. Pass `nil` for no initial data.

#### `AgentFile(data = nil)`

Create a new `AgentFile` entity instance. Pass `nil` for no initial data.

#### `AgentInput(data = nil)`

Create a new `AgentInput` entity instance. Pass `nil` for no initial data.

#### `AgentIntegration(data = nil)`

Create a new `AgentIntegration` entity instance. Pass `nil` for no initial data.

#### `AgentInteraction(data = nil)`

Create a new `AgentInteraction` entity instance. Pass `nil` for no initial data.

#### `AgentLibrary(data = nil)`

Create a new `AgentLibrary` entity instance. Pass `nil` for no initial data.

#### `AgentManager(data = nil)`

Create a new `AgentManager` entity instance. Pass `nil` for no initial data.

#### `AgentManagerChoice(data = nil)`

Create a new `AgentManagerChoice` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplace(data = nil)`

Create a new `AgentMarketplace` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplaceShared(data = nil)`

Create a new `AgentMarketplaceShared` entity instance. Pass `nil` for no initial data.

#### `AgentMissionControl(data = nil)`

Create a new `AgentMissionControl` entity instance. Pass `nil` for no initial data.

#### `AgentOperation(data = nil)`

Create a new `AgentOperation` entity instance. Pass `nil` for no initial data.

#### `AgentProvisioning(data = nil)`

Create a new `AgentProvisioning` entity instance. Pass `nil` for no initial data.

#### `AgentPullRequest(data = nil)`

Create a new `AgentPullRequest` entity instance. Pass `nil` for no initial data.

#### `AgentQuestion(data = nil)`

Create a new `AgentQuestion` entity instance. Pass `nil` for no initial data.

#### `AgentRepository(data = nil)`

Create a new `AgentRepository` entity instance. Pass `nil` for no initial data.

#### `AgentResource(data = nil)`

Create a new `AgentResource` entity instance. Pass `nil` for no initial data.

#### `AgentRoutine(data = nil)`

Create a new `AgentRoutine` entity instance. Pass `nil` for no initial data.

#### `AgentRun(data = nil)`

Create a new `AgentRun` entity instance. Pass `nil` for no initial data.

#### `AgentRuntime(data = nil)`

Create a new `AgentRuntime` entity instance. Pass `nil` for no initial data.

#### `AgentSetting(data = nil)`

Create a new `AgentSetting` entity instance. Pass `nil` for no initial data.

#### `AgentSharing(data = nil)`

Create a new `AgentSharing` entity instance. Pass `nil` for no initial data.

#### `AgentSite(data = nil)`

Create a new `AgentSite` entity instance. Pass `nil` for no initial data.

#### `AgentSkill(data = nil)`

Create a new `AgentSkill` entity instance. Pass `nil` for no initial data.

#### `AgentSlack(data = nil)`

Create a new `AgentSlack` entity instance. Pass `nil` for no initial data.

#### `AgentSubagent(data = nil)`

Create a new `AgentSubagent` entity instance. Pass `nil` for no initial data.

#### `AgentSubscription(data = nil)`

Create a new `AgentSubscription` entity instance. Pass `nil` for no initial data.

#### `AgentTeammate(data = nil)`

Create a new `AgentTeammate` entity instance. Pass `nil` for no initial data.

#### `AgentTerminal(data = nil)`

Create a new `AgentTerminal` entity instance. Pass `nil` for no initial data.

#### `AgentThread(data = nil)`

Create a new `AgentThread` entity instance. Pass `nil` for no initial data.

#### `AgentTool(data = nil)`

Create a new `AgentTool` entity instance. Pass `nil` for no initial data.

#### `AgentVerifyProject(data = nil)`

Create a new `AgentVerifyProject` entity instance. Pass `nil` for no initial data.

#### `AgentWait(data = nil)`

Create a new `AgentWait` entity instance. Pass `nil` for no initial data.

#### `AgentWebhook(data = nil)`

Create a new `AgentWebhook` entity instance. Pass `nil` for no initial data.

#### `AgentWork(data = nil)`

Create a new `AgentWork` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflow(data = nil)`

Create a new `AgentWorkflow` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowProposal(data = nil)`

Create a new `AgentWorkflowProposal` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowRun(data = nil)`

Create a new `AgentWorkflowRun` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowTrigger(data = nil)`

Create a new `AgentWorkflowTrigger` entity instance. Pass `nil` for no initial data.

#### `AgentWorkspace(data = nil)`

Create a new `AgentWorkspace` entity instance. Pass `nil` for no initial data.

#### `AgentWritePermission(data = nil)`

Create a new `AgentWritePermission` entity instance. Pass `nil` for no initial data.

#### `AllocationLog(data = nil)`

Create a new `AllocationLog` entity instance. Pass `nil` for no initial data.

#### `App(data = nil)`

Create a new `App` entity instance. Pass `nil` for no initial data.

#### `AppCdn(data = nil)`

Create a new `AppCdn` entity instance. Pass `nil` for no initial data.

#### `AppConfigVariable(data = nil)`

Create a new `AppConfigVariable` entity instance. Pass `nil` for no initial data.

#### `AppDataResource(data = nil)`

Create a new `AppDataResource` entity instance. Pass `nil` for no initial data.

#### `AppDeploy(data = nil)`

Create a new `AppDeploy` entity instance. Pass `nil` for no initial data.

#### `AppDeployment(data = nil)`

Create a new `AppDeployment` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentOperation(data = nil)`

Create a new `AppDeploymentOperation` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentRollback(data = nil)`

Create a new `AppDeploymentRollback` entity instance. Pass `nil` for no initial data.

#### `AppEnvironment(data = nil)`

Create a new `AppEnvironment` entity instance. Pass `nil` for no initial data.

#### `AppLocation(data = nil)`

Create a new `AppLocation` entity instance. Pass `nil` for no initial data.

#### `AppMetric(data = nil)`

Create a new `AppMetric` entity instance. Pass `nil` for no initial data.

#### `AppPreview(data = nil)`

Create a new `AppPreview` entity instance. Pass `nil` for no initial data.

#### `AppPreviewProfile(data = nil)`

Create a new `AppPreviewProfile` entity instance. Pass `nil` for no initial data.

#### `AppRun(data = nil)`

Create a new `AppRun` entity instance. Pass `nil` for no initial data.

#### `AppSecret(data = nil)`

Create a new `AppSecret` entity instance. Pass `nil` for no initial data.

#### `AppService(data = nil)`

Create a new `AppService` entity instance. Pass `nil` for no initial data.

#### `AppServiceBinding(data = nil)`

Create a new `AppServiceBinding` entity instance. Pass `nil` for no initial data.

#### `AppServicePlacement(data = nil)`

Create a new `AppServicePlacement` entity instance. Pass `nil` for no initial data.

#### `AppStorageResource(data = nil)`

Create a new `AppStorageResource` entity instance. Pass `nil` for no initial data.

#### `AttachmentPart(data = nil)`

Create a new `AttachmentPart` entity instance. Pass `nil` for no initial data.

#### `AutomationEvent(data = nil)`

Create a new `AutomationEvent` entity instance. Pass `nil` for no initial data.

#### `AutomationRun(data = nil)`

Create a new `AutomationRun` entity instance. Pass `nil` for no initial data.

#### `Binary(data = nil)`

Create a new `Binary` entity instance. Pass `nil` for no initial data.

#### `BinaryVersion(data = nil)`

Create a new `BinaryVersion` entity instance. Pass `nil` for no initial data.

#### `BrowserEgressCandidate(data = nil)`

Create a new `BrowserEgressCandidate` entity instance. Pass `nil` for no initial data.

#### `BrowserSession(data = nil)`

Create a new `BrowserSession` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionConnection(data = nil)`

Create a new `BrowserSessionConnection` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionControl(data = nil)`

Create a new `BrowserSessionControl` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionEvent(data = nil)`

Create a new `BrowserSessionEvent` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionMedia(data = nil)`

Create a new `BrowserSessionMedia` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionRecording(data = nil)`

Create a new `BrowserSessionRecording` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionScreenshot(data = nil)`

Create a new `BrowserSessionScreenshot` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionTask(data = nil)`

Create a new `BrowserSessionTask` entity instance. Pass `nil` for no initial data.

#### `CatalogSelector(data = nil)`

Create a new `CatalogSelector` entity instance. Pass `nil` for no initial data.

#### `CdnDeployment(data = nil)`

Create a new `CdnDeployment` entity instance. Pass `nil` for no initial data.

#### `CdnHostname(data = nil)`

Create a new `CdnHostname` entity instance. Pass `nil` for no initial data.

#### `CdnSpace(data = nil)`

Create a new `CdnSpace` entity instance. Pass `nil` for no initial data.

#### `CdnSpaceObject(data = nil)`

Create a new `CdnSpaceObject` entity instance. Pass `nil` for no initial data.

#### `ConnectionRequest(data = nil)`

Create a new `ConnectionRequest` entity instance. Pass `nil` for no initial data.

#### `ConnectionSource(data = nil)`

Create a new `ConnectionSource` entity instance. Pass `nil` for no initial data.

#### `CoordinationWait(data = nil)`

Create a new `CoordinationWait` entity instance. Pass `nil` for no initial data.

#### `CredentialSignInCheck(data = nil)`

Create a new `CredentialSignInCheck` entity instance. Pass `nil` for no initial data.

#### `DataResourceRotateCredential(data = nil)`

Create a new `DataResourceRotateCredential` entity instance. Pass `nil` for no initial data.

#### `DeepScan(data = nil)`

Create a new `DeepScan` entity instance. Pass `nil` for no initial data.

#### `DeepScanFinding(data = nil)`

Create a new `DeepScanFinding` entity instance. Pass `nil` for no initial data.

#### `DeepScanFlow(data = nil)`

Create a new `DeepScanFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanMappedFlow(data = nil)`

Create a new `DeepScanMappedFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanOption(data = nil)`

Create a new `DeepScanOption` entity instance. Pass `nil` for no initial data.

#### `DemoShare(data = nil)`

Create a new `DemoShare` entity instance. Pass `nil` for no initial data.

#### `DemoShareSegment(data = nil)`

Create a new `DemoShareSegment` entity instance. Pass `nil` for no initial data.

#### `DeploymentDashboardNomad(data = nil)`

Create a new `DeploymentDashboardNomad` entity instance. Pass `nil` for no initial data.

#### `DeploymentFile(data = nil)`

Create a new `DeploymentFile` entity instance. Pass `nil` for no initial data.

#### `DomainPathRule(data = nil)`

Create a new `DomainPathRule` entity instance. Pass `nil` for no initial data.

#### `Dream(data = nil)`

Create a new `Dream` entity instance. Pass `nil` for no initial data.

#### `Environment(data = nil)`

Create a new `Environment` entity instance. Pass `nil` for no initial data.

#### `EnvironmentDiscoveryRun(data = nil)`

Create a new `EnvironmentDiscoveryRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentExploration(data = nil)`

Create a new `EnvironmentExploration` entity instance. Pass `nil` for no initial data.

#### `EnvironmentFirstRun(data = nil)`

Create a new `EnvironmentFirstRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentRevision(data = nil)`

Create a new `EnvironmentRevision` entity instance. Pass `nil` for no initial data.

#### `EnvironmentSecretBinding(data = nil)`

Create a new `EnvironmentSecretBinding` entity instance. Pass `nil` for no initial data.

#### `EnvironmentTestAccount(data = nil)`

Create a new `EnvironmentTestAccount` entity instance. Pass `nil` for no initial data.

#### `Evidence(data = nil)`

Create a new `Evidence` entity instance. Pass `nil` for no initial data.

#### `Exploration(data = nil)`

Create a new `Exploration` entity instance. Pass `nil` for no initial data.

#### `ExplorationMessage(data = nil)`

Create a new `ExplorationMessage` entity instance. Pass `nil` for no initial data.

#### `ExplorationReport(data = nil)`

Create a new `ExplorationReport` entity instance. Pass `nil` for no initial data.

#### `ExplorationScenario(data = nil)`

Create a new `ExplorationScenario` entity instance. Pass `nil` for no initial data.

#### `Finding(data = nil)`

Create a new `Finding` entity instance. Pass `nil` for no initial data.

#### `GithubConnection(data = nil)`

Create a new `GithubConnection` entity instance. Pass `nil` for no initial data.

#### `HostingAppDomain(data = nil)`

Create a new `HostingAppDomain` entity instance. Pass `nil` for no initial data.

#### `ImageRepository(data = nil)`

Create a new `ImageRepository` entity instance. Pass `nil` for no initial data.

#### `Integration(data = nil)`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `InteractionResponse(data = nil)`

Create a new `InteractionResponse` entity instance. Pass `nil` for no initial data.

#### `Invitation(data = nil)`

Create a new `Invitation` entity instance. Pass `nil` for no initial data.

#### `JourneyVariantReplay(data = nil)`

Create a new `JourneyVariantReplay` entity instance. Pass `nil` for no initial data.

#### `Knowledge(data = nil)`

Create a new `Knowledge` entity instance. Pass `nil` for no initial data.

#### `LocalThreadDelivery(data = nil)`

Create a new `LocalThreadDelivery` entity instance. Pass `nil` for no initial data.

#### `LocalThreadOperation(data = nil)`

Create a new `LocalThreadOperation` entity instance. Pass `nil` for no initial data.

#### `Location(data = nil)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Me(data = nil)`

Create a new `Me` entity instance. Pass `nil` for no initial data.

#### `MeEmail(data = nil)`

Create a new `MeEmail` entity instance. Pass `nil` for no initial data.

#### `MeOnboarding(data = nil)`

Create a new `MeOnboarding` entity instance. Pass `nil` for no initial data.

#### `MediaFile(data = nil)`

Create a new `MediaFile` entity instance. Pass `nil` for no initial data.

#### `Member(data = nil)`

Create a new `Member` entity instance. Pass `nil` for no initial data.

#### `Memory(data = nil)`

Create a new `Memory` entity instance. Pass `nil` for no initial data.

#### `MergeRequest(data = nil)`

Create a new `MergeRequest` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationMessage(data = nil)`

Create a new `MessagingConversationMessage` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationUpload(data = nil)`

Create a new `MessagingConversationUpload` entity instance. Pass `nil` for no initial data.

#### `MetricQuery(data = nil)`

Create a new `MetricQuery` entity instance. Pass `nil` for no initial data.

#### `NetworkConnection(data = nil)`

Create a new `NetworkConnection` entity instance. Pass `nil` for no initial data.

#### `NomadAllocation(data = nil)`

Create a new `NomadAllocation` entity instance. Pass `nil` for no initial data.

#### `NomadLog(data = nil)`

Create a new `NomadLog` entity instance. Pass `nil` for no initial data.

#### `Organization(data = nil)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `Page(data = nil)`

Create a new `Page` entity instance. Pass `nil` for no initial data.

#### `PageAgent(data = nil)`

Create a new `PageAgent` entity instance. Pass `nil` for no initial data.

#### `PageProjectRun(data = nil)`

Create a new `PageProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectCredential(data = nil)`

Create a new `PagesProjectCredential` entity instance. Pass `nil` for no initial data.

#### `PagesProjectPersona(data = nil)`

Create a new `PagesProjectPersona` entity instance. Pass `nil` for no initial data.

#### `PagesProjectRun(data = nil)`

Create a new `PagesProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectScenario(data = nil)`

Create a new `PagesProjectScenario` entity instance. Pass `nil` for no initial data.

#### `PersonalAccessToken(data = nil)`

Create a new `PersonalAccessToken` entity instance. Pass `nil` for no initial data.

#### `PreviewOperation(data = nil)`

Create a new `PreviewOperation` entity instance. Pass `nil` for no initial data.

#### `PreviewProfileSecretBinding(data = nil)`

Create a new `PreviewProfileSecretBinding` entity instance. Pass `nil` for no initial data.

#### `PreviewSecret(data = nil)`

Create a new `PreviewSecret` entity instance. Pass `nil` for no initial data.

#### `PreviewSharingApproval(data = nil)`

Create a new `PreviewSharingApproval` entity instance. Pass `nil` for no initial data.

#### `ProductMapIdentityDecision(data = nil)`

Create a new `ProductMapIdentityDecision` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourney(data = nil)`

Create a new `ProductMapJourney` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourneyReplay(data = nil)`

Create a new `ProductMapJourneyReplay` entity instance. Pass `nil` for no initial data.

#### `ProductMapObservation(data = nil)`

Create a new `ProductMapObservation` entity instance. Pass `nil` for no initial data.

#### `ProductMapQuestion(data = nil)`

Create a new `ProductMapQuestion` entity instance. Pass `nil` for no initial data.

#### `ProductMapState(data = nil)`

Create a new `ProductMapState` entity instance. Pass `nil` for no initial data.

#### `Project(data = nil)`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `ProjectAndroidApk(data = nil)`

Create a new `ProjectAndroidApk` entity instance. Pass `nil` for no initial data.

#### `ProjectCodeMap(data = nil)`

Create a new `ProjectCodeMap` entity instance. Pass `nil` for no initial data.

#### `ProjectEnvironment(data = nil)`

Create a new `ProjectEnvironment` entity instance. Pass `nil` for no initial data.

#### `ProjectFinding(data = nil)`

Create a new `ProjectFinding` entity instance. Pass `nil` for no initial data.

#### `ProjectFixture(data = nil)`

Create a new `ProjectFixture` entity instance. Pass `nil` for no initial data.

#### `ProjectIosApp(data = nil)`

Create a new `ProjectIosApp` entity instance. Pass `nil` for no initial data.

#### `ProjectMessagingConversation(data = nil)`

Create a new `ProjectMessagingConversation` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewMetric(data = nil)`

Create a new `ProjectOverviewMetric` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewPullRequest(data = nil)`

Create a new `ProjectOverviewPullRequest` entity instance. Pass `nil` for no initial data.

#### `ProjectProductMap(data = nil)`

Create a new `ProjectProductMap` entity instance. Pass `nil` for no initial data.

#### `ProjectRecording(data = nil)`

Create a new `ProjectRecording` entity instance. Pass `nil` for no initial data.

#### `ProjectRunPlan(data = nil)`

Create a new `ProjectRunPlan` entity instance. Pass `nil` for no initial data.

#### `ProjectRunSchedule(data = nil)`

Create a new `ProjectRunSchedule` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioOption(data = nil)`

Create a new `ProjectScenarioOption` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioRow(data = nil)`

Create a new `ProjectScenarioRow` entity instance. Pass `nil` for no initial data.

#### `ProjectSetting(data = nil)`

Create a new `ProjectSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequest(data = nil)`

Create a new `PullRequest` entity instance. Pass `nil` for no initial data.

#### `PullRequestSetting(data = nil)`

Create a new `PullRequestSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingAddRepository(data = nil)`

Create a new `PullRequestSettingAddRepository` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingDetectComment(data = nil)`

Create a new `PullRequestSettingDetectComment` entity instance. Pass `nil` for no initial data.

#### `Recorder(data = nil)`

Create a new `Recorder` entity instance. Pass `nil` for no initial data.

#### `Registry(data = nil)`

Create a new `Registry` entity instance. Pass `nil` for no initial data.

#### `RegistryV2(data = nil)`

Create a new `RegistryV2` entity instance. Pass `nil` for no initial data.

#### `RelayAgentLocalThread(data = nil)`

Create a new `RelayAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `ReportReplay(data = nil)`

Create a new `ReportReplay` entity instance. Pass `nil` for no initial data.

#### `ReportScenario(data = nil)`

Create a new `ReportScenario` entity instance. Pass `nil` for no initial data.

#### `RunScenarioRun(data = nil)`

Create a new `RunScenarioRun` entity instance. Pass `nil` for no initial data.

#### `RunScheduleOption(data = nil)`

Create a new `RunScheduleOption` entity instance. Pass `nil` for no initial data.

#### `RunSearch(data = nil)`

Create a new `RunSearch` entity instance. Pass `nil` for no initial data.

#### `RunUpdate(data = nil)`

Create a new `RunUpdate` entity instance. Pass `nil` for no initial data.

#### `ScenarioRevision(data = nil)`

Create a new `ScenarioRevision` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunLesson(data = nil)`

Create a new `ScenarioRunLesson` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunScenarioEdit(data = nil)`

Create a new `ScenarioRunScenarioEdit` entity instance. Pass `nil` for no initial data.

#### `ServiceEndpoint(data = nil)`

Create a new `ServiceEndpoint` entity instance. Pass `nil` for no initial data.

#### `SitePreview(data = nil)`

Create a new `SitePreview` entity instance. Pass `nil` for no initial data.

#### `SlackChannel(data = nil)`

Create a new `SlackChannel` entity instance. Pass `nil` for no initial data.

#### `SparkAgentLocalThread(data = nil)`

Create a new `SparkAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `StaticSite(data = nil)`

Create a new `StaticSite` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDeployment(data = nil)`

Create a new `StaticSiteDeployment` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDomain(data = nil)`

Create a new `StaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `SubscriptionModel(data = nil)`

Create a new `SubscriptionModel` entity instance. Pass `nil` for no initial data.

#### `ThreadPreview(data = nil)`

Create a new `ThreadPreview` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectCredential(data = nil)`

Create a new `VerificationProjectCredential` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectPersona(data = nil)`

Create a new `VerificationProjectPersona` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectRun(data = nil)`

Create a new `VerificationProjectRun` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectScenario(data = nil)`

Create a new `VerificationProjectScenario` entity instance. Pass `nil` for no initial data.

#### `VerifyAppDomain(data = nil)`

Create a new `VerifyAppDomain` entity instance. Pass `nil` for no initial data.

#### `VerifyBrowserSession(data = nil)`

Create a new `VerifyBrowserSession` entity instance. Pass `nil` for no initial data.

#### `VerifyStaticSiteDomain(data = nil)`

Create a new `VerifyStaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `VersionLog(data = nil)`

Create a new `VersionLog` entity instance. Pass `nil` for no initial data.

#### `WebBotAuth(data = nil)`

Create a new `WebBotAuth` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStep(data = nil)`

Create a new `WorkflowRunStep` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStopNotice(data = nil)`

Create a new `WorkflowRunStopNotice` entity instance. Pass `nil` for no initial data.

#### `WorkflowTriggerSkipped(data = nil)`

Create a new `WorkflowTriggerSkipped` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AgentEntity

```ruby
agent = client.Agent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `Object` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `Object` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `Boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `Boolean` | Yes |  |
| `can_manage` | `Boolean` | Yes |  |
| `can_manage_sharing` | `Boolean` | No |  |
| `can_name_managers` | `Boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `Boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `Boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Object` | Yes |  |
| `configuration_revision` | `Integer` | Yes |  |
| `configuration_version` | `Object` | Yes | Opaque version token. |
| `control_connections_available` | `Boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `String` | Yes |  |
| `coordination_available` | `Boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `String` | Yes |  |
| `direct_chat_available` | `Boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `Boolean` | Yes |  |
| `id` | `String` | Yes |  |
| `last_reply_at` | `Object` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `Array` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `Object` | Yes | Opaque version token. |
| `local_agent_control_available` | `Boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `Array` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `Object` | No | Advisory composer action. |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `persona` | `Object` | No |  |
| `preview` | `Object` | No |  |
| `preview_received_at` | `Object` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Object` | No |  |
| `reply_triage` | `Object` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `String` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `Boolean` | Yes |  |
| `sharing_fixed` | `Boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `Integer` | No |  |
| `slug` | `String` | Yes | Optional explicit API alias. |
| `status` | `String` | Yes |  |
| `team_role` | `String` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `String` | Yes |  |
| `url_slug` | `String` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `String` | No | Defaults to organization. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Agent.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Agent.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Agent.load({ "id" => "agent_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Agent.remove({ "id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentAttachmentEntity

```ruby
agent_attachment = client.AgentAttachment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `Integer` | Yes |  |
| `content_type` | `String` | Yes |  |
| `file_name` | `String` | Yes |  |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentAttachment.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "byte_size" => 1, # Integer
  "content_type" => "example_content_type", # String
  "file_name" => "example_file_name", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentAttachmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentAutomationEntity

```ruby
agent_automation = client.AgentAutomation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `can_manage_events` | `Boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `Boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `Boolean` | Yes |  |
| `definition` | `Hash` | Yes |  |
| `event_subscriptions` | `Array` | Yes |  |
| `event_triggers` | `Array` | Yes |  |
| `expected_revision` | `Integer` | Yes |  |
| `id` | `String` | Yes |  |
| `key` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `revision` | `Integer` | Yes |  |
| `schedule` | `Object` | Yes |  |
| `schedules` | `Array` | Yes |  |
| `version` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentAutomation.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentAutomation.load({ "id" => "agent_automation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentAutomation.update({
  "id" => "agent_automation_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentAutomationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentAvatarEntity

```ruby
agent_avatar = client.AgentAvatar
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentAvatarEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentCommandEntity

```ruby
agent_command = client.AgentCommand
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | Yes |  |
| `display_name` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `skill_model_visible` | `Boolean` | Yes |  |
| `source` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentCommand.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentCommandEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentComputerEntity

```ruby
agent_computer = client.AgentComputer
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentComputerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentConnectionEntity

```ruby
agent_connection = client.AgentConnection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `String` | Yes |  |
| `auth_scheme` | `String` | Yes |  |
| `can_configure` | `Boolean` | Yes |  |
| `can_disconnect` | `Boolean` | Yes |  |
| `can_setup` | `Boolean` | Yes |  |
| `connection` | `Hash` | Yes |  |
| `credential` | `Object` | No | Write-only outbound key. |
| `error_code` | `Object` | Yes |  |
| `expected_generation` | `Integer` | Yes |  |
| `generation` | `Integer` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `remote_agent` | `Object` | Yes |  |
| `requester_id` | `String` | Yes |  |
| `retired_at` | `Object` | Yes |  |
| `revoked_at` | `Object` | Yes |  |
| `scope_key` | `String` | Yes |  |
| `source_operation_id` | `Object` | Yes |  |
| `state` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentConnection.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "agent_card_url" => "example_agent_card_url", # String
  "auth_scheme" => "example_auth_scheme", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentConnection.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentConnection.load({ "id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AgentConnection.remove({ "id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentConnection.update({
  "id" => "agent_connection_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentControlFlowEntity

```ruby
agent_control_flow = client.AgentControlFlow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `Boolean` | Yes |  |
| `cancellation_requested` | `Boolean` | Yes |  |
| `device_name` | `String` | Yes |  |
| `flow_id` | `String` | Yes |  |
| `id` | `String` | No |  |
| `providers` | `Array` | Yes |  |
| `repair_of_flow_id` | `String` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `String` | Yes |  |
| `step_count` | `Integer` | Yes |  |
| `title` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentControlFlow.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentControlFlow.load({ "id" => "agent_control_flow_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentControlFlowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentCoordinationEntity

```ruby
agent_coordination = client.AgentCoordination
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentCoordinationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentEmailEntity

```ruby
agent_email = client.AgentEmail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `Object` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `String` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `preview` | `String` | No |  |
| `received_at` | `String` | Yes |  |
| `recipient_tag` | `Object` | Yes | The +tag the sender used, if any |
| `spam` | `Boolean` | Yes | SES judged it spam |
| `subject` | `Object` | Yes |  |
| `text` | `String` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentEmail.load({ "id" => "agent_email_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentEmailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentFileEntity

```ruby
agent_file = client.AgentFile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `String` | Yes |  |
| `download_url` | `String` | Yes |  |
| `filename` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `size_bytes` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentFile.load({ "id" => "agent_file_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentFileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentInputEntity

```ruby
agent_input = client.AgentInput
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `Array` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `Array` | No |  |
| `browser_context` | `Hash` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `Hash` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `String` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `Object` | No |  |
| `requester_membership_id` | `String` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `String` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentInput.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "browser_context" => {}, # Hash
  "client_time" => {}, # Hash
  "conversation_id" => "example_conversation_id", # String
  "text" => "example_text", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentInputEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentIntegrationEntity

```ruby
agent_integration = client.AgentIntegration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `Hash` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `String` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `Array` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `Boolean` | Yes |  |
| `can_manage_organization` | `Boolean` | Yes |  |
| `catalog` | `Array` | Yes |  |
| `connect_as` | `Object` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `Hash` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `Hash` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `String` | Yes |  |
| `connections` | `Array` | Yes |  |
| `email` | `Hash` | Yes | A native agent's own email address. |
| `enabled` | `Boolean` | Yes |  |
| `enabled_toolkits` | `Array` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `Integer` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `pending_counts` | `Hash` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `Boolean` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `Boolean` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `Boolean` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `Hash` | Yes |  |
| `webhook_connections` | `Array` | Yes |  |
| `webhooks_available` | `Boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentIntegration.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "connection_id" => "example_connection_id", # String
  "enabled" => true, # Boolean
  "generation" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentIntegration.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentIntegrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentInteractionEntity

```ruby
agent_interaction = client.AgentInteraction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `interactions` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentInteraction.list({ "agent_id" => "example", "organization_id" => "example", "conversation_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentInteraction.load({ "id" => "agent_interaction_id", "agent_id" => "agent_id", "organization_id" => "organization_id", "conversation_id" => "conversation_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentInteractionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentLibraryEntity

```ruby
agent_library = client.AgentLibrary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentLibraryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentManagerEntity

```ruby
agent_manager = client.AgentManager
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `Object` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `Object` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `Boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `Boolean` | Yes |  |
| `can_manage` | `Boolean` | Yes |  |
| `can_manage_sharing` | `Boolean` | No |  |
| `can_name_managers` | `Boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `Boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `Boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Object` | Yes |  |
| `configuration_revision` | `Integer` | Yes |  |
| `configuration_version` | `Object` | Yes | Opaque version token. |
| `control_connections_available` | `Boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `String` | Yes |  |
| `coordination_available` | `Boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `String` | Yes |  |
| `direct_chat_available` | `Boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `Boolean` | Yes |  |
| `id` | `String` | Yes |  |
| `last_reply_at` | `Object` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `Array` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `Object` | Yes | Opaque version token. |
| `local_agent_control_available` | `Boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `Array` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `Object` | No | Advisory composer action. |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `persona` | `Object` | No |  |
| `preview` | `Object` | No |  |
| `preview_received_at` | `Object` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Object` | No |  |
| `reply_triage` | `Object` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `String` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `Boolean` | Yes |  |
| `sharing_fixed` | `Boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `Integer` | No |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `team_role` | `String` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `String` | Yes |  |
| `url_slug` | `String` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `String` | Yes |  |
| `visibility` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentManager.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "user_id" => "example_user_id", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AgentManager.remove({ "id" => "agent_manager_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentManagerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentManagerChoiceEntity

```ruby
agent_manager_choice = client.AgentManagerChoice
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentManagerChoice.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentManagerChoiceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentMarketplaceEntity

```ruby
agent_marketplace = client.AgentMarketplace
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `Hash` | Yes |  |
| `can_manage` | `Boolean` | Yes |  |
| `catalog_key` | `Object` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `Array` | Yes |  |
| `category` | `String` | Yes |  |
| `counts` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `expected_version` | `Integer` | Yes |  |
| `explainer` | `Object` | Yes | The listing's public write-up in Markdown. |
| `featured` | `Boolean` | Yes |  |
| `from_composal` | `Boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `String` | Yes |  |
| `installs_count` | `Integer` | Yes |  |
| `instructions` | `String` | Yes |  |
| `integration_toolkits` | `Array` | Yes |  |
| `integrations` | `Array` | Yes |  |
| `listing` | `Object` | Yes |  |
| `listings` | `Array` | Yes |  |
| `memories` | `Array` | Yes |  |
| `name` | `String` | Yes |  |
| `next_page` | `Object` | Yes |  |
| `organization_name` | `String` | Yes |  |
| `page_apps` | `Array` | Yes |  |
| `publisher_avatar_url` | `Object` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `String` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `Array` | Yes |  |
| `share_token` | `Object` | Yes | Present only for people who manage the listing. |
| `skills` | `Array` | Yes |  |
| `slug` | `String` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `String` | No | The V2 agent this listing was published from. |
| `summary` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |
| `viewer` | `Hash` | Yes | Who a public marketplace response was read for. |
| `visibility` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentMarketplace.create({
  "organization_id" => "example_organization_id", # String
  "bundle" => {}, # Hash
  "category" => "example_category", # String
  "name" => "example_name", # String
  "summary" => "example_summary", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentMarketplace.load({ "id" => "agent_marketplace_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AgentMarketplace.patch({
  "id" => "agent_marketplace_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AgentMarketplace.remove({ "id" => "agent_marketplace_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentMarketplace.update({
  "id" => "agent_marketplace_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentMarketplaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentMarketplaceSharedEntity

```ruby
agent_marketplace_shared = client.AgentMarketplaceShared
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `catalog_key` | `Object` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `String` | Yes |  |
| `counts` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `explainer` | `Object` | Yes | The listing's public write-up in Markdown. |
| `featured` | `Boolean` | Yes |  |
| `from_composal` | `Boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `String` | Yes |  |
| `installs_count` | `Integer` | Yes |  |
| `instructions` | `String` | Yes |  |
| `integration_toolkits` | `Array` | Yes |  |
| `integrations` | `Array` | Yes |  |
| `listing` | `Object` | Yes |  |
| `memories` | `Array` | Yes |  |
| `name` | `String` | Yes |  |
| `organization_name` | `String` | Yes |  |
| `page_apps` | `Array` | Yes |  |
| `publisher_avatar_url` | `Object` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `String` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `Object` | Yes | Present only for people who manage the listing. |
| `skills` | `Array` | Yes |  |
| `slug` | `String` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |
| `viewer` | `Hash` | Yes | Who a public marketplace response was read for. |
| `visibility` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentMarketplaceShared.load({ "id" => "agent_marketplace_shared_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentMarketplaceSharedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentMissionControlEntity

```ruby
agent_mission_control = client.AgentMissionControl
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentMissionControlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentOperationEntity

```ruby
agent_operation = client.AgentOperation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `Hash` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `String` | No |  |
| `key` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `operation` | `Hash` | Yes |  |
| `participant` | `String` | Yes |  |
| `requester_id` | `String` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentOperation.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
  "name" => "example_name", # String
  "requester_id" => "example_requester_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentOperation.load({ "id" => "agent_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentOperationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentProvisioningEntity

```ruby
agent_provisioning = client.AgentProvisioning
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentProvisioningEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentPullRequestEntity

```ruby
agent_pull_request = client.AgentPullRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `number` | `Integer` | Yes |  |
| `owners` | `Array` | Yes |  |
| `repository` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentPullRequest.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentPullRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentQuestionEntity

```ruby
agent_question = client.AgentQuestion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentQuestionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentRepositoryEntity

```ruby
agent_repository = client.AgentRepository
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `environments` | `Hash` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `Integer` | Yes |  |
| `id` | `String` | No |  |
| `repository_choices` | `Array` | Yes |  |
| `repository_choices_error` | `Object` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `Boolean` | Yes |  |
| `version` | `Integer` | Yes |  |
| `work_repositories` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentRepository.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentRepository.update({
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentRepositoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentResourceEntity

```ruby
agent_resource = client.AgentResource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | Yes |  |
| `uri` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentResource.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentRoutineEntity

```ruby
agent_routine = client.AgentRoutine
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `consecutive_errors` | `Integer` | Yes |  |
| `credit_wait` | `Hash` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `Object` | Yes |  |
| `enabled` | `Boolean` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `last_error` | `Object` | Yes |  |
| `last_run_at` | `Object` | Yes |  |
| `last_status` | `Object` | Yes |  |
| `managed` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `next_run_at` | `Object` | Yes |  |
| `routine` | `Hash` | Yes |  |
| `schedule` | `Hash` | Yes |  |
| `schedule_label` | `String` | Yes |  |
| `utility_model` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentRoutine.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentRoutine.update({
  "agent_id" => "agent_id",
  "id" => "id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentRoutineEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentRunEntity

```ruby
agent_run = client.AgentRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `Object` | No |  |
| `id` | `String` | No |  |
| `run_id` | `String` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentRun.load({ "id" => "agent_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentRuntimeEntity

```ruby
agent_runtime = client.AgentRuntime
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `Array` | No |  |
| `can_manage` | `Boolean` | Yes |  |
| `can_reset` | `Boolean` | No |  |
| `image` | `String` | Yes |  |
| `memory_mb` | `Object` | Yes |  |
| `platform` | `String` | No |  |
| `profile` | `String` | Yes |  |
| `provider` | `String` | No |  |
| `state` | `String` | Yes |  |
| `version` | `String` | Yes |  |
| `volume` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentRuntimeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSettingEntity

```ruby
agent_setting = client.AgentSetting
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `expected_version` | `String` | Yes |  |
| `instructions` | `String` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentSetting.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentSetting.update({
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSettingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSharingEntity

```ruby
agent_sharing = client.AgentSharing
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSharingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSiteEntity

```ruby
agent_site = client.AgentSite
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `String` | Yes |  |
| `deployments_count` | `Integer` | Yes |  |
| `hostname` | `String` | Yes |  |
| `https` | `String` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `url` | `String` | Yes |  |
| `visibility` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentSite.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSiteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSkillEntity

```ruby
agent_skill = client.AgentSkill
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `Boolean` | Yes |  |
| `can_configure` | `Boolean` | Yes |  |
| `can_manage` | `Boolean` | Yes |  |
| `configuration_state` | `String` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `String` | Yes |  |
| `enabled` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `skills` | `Array` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentSkill.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "enabled" => true, # Boolean
  "name" => "example_name", # String
  "version" => "example_version", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentSkill.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSkillEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSlackEntity

```ruby
agent_slack = client.AgentSlack
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSlackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSubagentEntity

```ruby
agent_subagent = client.AgentSubagent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | Yes |  |
| `attention` | `Object` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `model` | `Object` | Yes |  |
| `parent_id` | `String` | Yes |  |
| `preview` | `Object` | Yes |  |
| `started_at` | `Object` | Yes |  |
| `state` | `Object` | Yes | What the thread is to the viewer. |
| `status` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentSubagent.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSubagentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSubscriptionEntity

```ruby
agent_subscription = client.AgentSubscription
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentSubscription.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentSubscription.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSubscriptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentTeammateEntity

```ruby
agent_teammate = client.AgentTeammate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `Object` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `persona` | `Object` | No |  |
| `slug` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentTeammate.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentTeammateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentTerminalEntity

```ruby
agent_terminal = client.AgentTerminal
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentTerminalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentThreadEntity

```ruby
agent_thread = client.AgentThread
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `Object` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `Boolean` | Yes |  |
| `execution` | `Object` | No |  |
| `first_input` | `Object` | No |  |
| `first_input_key` | `String` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `String` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `String` | No |  |
| `inherit_context` | `Boolean` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `Hash` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `Integer` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `Object` | Yes |  |
| `local_scope_key` | `Object` | Yes |  |
| `local_status_pending` | `Boolean` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `Array` | Yes |  |
| `main_thread_id` | `String` | Yes |  |
| `message` | `String` | No | The thread's first message. |
| `next_cursor` | `Object` | Yes |  |
| `parent_conversation_id` | `String` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `String` | No |  |
| `selected_thread` | `Object` | Yes |  |
| `thread` | `Hash` | Yes |  |
| `threads` | `Array` | Yes |  |
| `title` | `String` | No |  |
| `total_archived_count` | `Object` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentThread.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentThread.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentThreadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentToolEntity

```ruby
agent_tool = client.AgentTool
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `inputSchema` | `Hash` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentTool.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentToolEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentVerifyProjectEntity

```ruby
agent_verify_project = client.AgentVerifyProject
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `Boolean` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `Boolean` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `Integer` | Yes |  |
| `project_choices` | `Array` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `Boolean` | Yes |  |
| `verify_projects` | `Array` | Yes |  |
| `version` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentVerifyProject.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentVerifyProject.update({
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentVerifyProjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWaitEntity

```ruby
agent_wait = client.AgentWait
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWaitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWebhookEntity

```ruby
agent_webhook = client.AgentWebhook
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `connection` | `Hash` | Yes |  |
| `deliveries` | `Array` | Yes |  |
| `event_types` | `Array` | Yes |  |
| `expected_generation` | `Integer` | Yes |  |
| `id` | `String` | No |  |
| `max_events_per_day` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `purpose` | `String` | Yes |  |
| `signing_key` | `Object` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentWebhook.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "event_types" => [], # Array
  "max_events_per_day" => 1, # Integer
  "name" => "example_name", # String
  "purpose" => "example_purpose", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentWebhook.load({ "id" => "agent_webhook_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentWebhook.update({
  "id" => "agent_webhook_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWebhookEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkEntity

```ruby
agent_work = client.AgentWork
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkflowEntity

```ruby
agent_workflow = client.AgentWorkflow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `Boolean` | Yes |  |
| `expected_digest` | `String` | Yes |  |
| `path` | `String` | Yes |  |
| `source` | `String` | Yes | At most 262144 UTF-8 bytes |
| `template` | `String` | Yes | A template id from the catalog's templates |
| `templates` | `Array` | Yes |  |
| `truncated` | `Boolean` | Yes |  |
| `workflows` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AgentWorkflow.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "path" => "example_path", # String
  "template" => "example_template", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentWorkflow.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentWorkflow.update({
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkflowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkflowProposalEntity

```ruby
agent_workflow_proposal = client.AgentWorkflowProposal
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `Hash` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `Object` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `Boolean` | Yes |  |
| `can_revise` | `Boolean` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `Boolean` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `Boolean` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `String` | Yes |  |
| `definition` | `Object` | Yes |  |
| `digest` | `String` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `Object` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `String` | Yes |  |
| `model_choices` | `Array` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `String` | Yes |  |
| `native_rows` | `Array` | No |  |
| `path` | `String` | Yes |  |
| `pipeline_checkpoints` | `Hash` | Yes |  |
| `pipeline_commands` | `Hash` | Yes |  |
| `reasoning_choices` | `Array` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `Object` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `Object` | Yes |  |
| `stale` | `Boolean` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `Object` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `Object` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentWorkflowProposal.load({ "id" => "agent_workflow_proposal_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkflowProposalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkflowRunEntity

```ruby
agent_workflow_run = client.AgentWorkflowRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `automation` | `Object` | Yes | Saved native automation identity. |
| `budget_seconds` | `Object` | Yes | The run stops once it has been running this long |
| `budget_usd` | `Object` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `Boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `Boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `Boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Object` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `Object` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Hash` | Yes |  |
| `error` | `Object` | Yes |  |
| `finished_at` | `Object` | Yes |  |
| `flow_steps` | `Object` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `String` | Yes | Public run ID. |
| `needs_you` | `Boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `Object` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `Object` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `Integer` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `Object` | Yes |  |
| `running_seconds` | `Integer` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `String` | Yes |  |
| `spent_tokens` | `Integer` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `Float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `Boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `String` | Yes |  |
| `started_by` | `Object` | Yes | The event that started the run |
| `status` | `String` | Yes |  |
| `step_count` | `Integer` | Yes |  |
| `steps` | `Array` | Yes |  |
| `trigger_id` | `Object` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `Object` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `Object` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentWorkflowRun.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentWorkflowRun.load({ "id" => "agent_workflow_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkflowRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkflowTriggerEntity

```ruby
agent_workflow_trigger = client.AgentWorkflowTrigger
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `Object` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `Boolean` | Yes |  |
| `can_pause` | `Boolean` | Yes | It is running, so a manager can pause it |
| `can_resume` | `Boolean` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `Boolean` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `Object` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `Object` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `next_due_at` | `Object` | Yes |  |
| `pause_cause` | `Object` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `Boolean` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `Object` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `Object` | Yes |  |
| `schedule` | `Object` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `Object` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `Integer` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `Object` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `Object` | Yes |  |
| `starts` | `Object` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `Object` | Yes | The event subscription that starts it |
| `time_zone` | `String` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `Object` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `Hash` | Yes |  |
| `workflow_path` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentWorkflowTrigger.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AgentWorkflowTrigger.load({ "id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AgentWorkflowTrigger.remove({ "id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentWorkflowTrigger.update({
  "id" => "agent_workflow_trigger_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkflowTriggerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWorkspaceEntity

```ruby
agent_workspace = client.AgentWorkspace
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `can_delete` | `Boolean` | Yes |  |
| `can_keep` | `Boolean` | Yes |  |
| `cleanup_after` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `reason` | `String` | Yes |  |
| `state` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentWorkspace.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AgentWorkspace.update({
  "agent_id" => "agent_id",
  "id" => "id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWorkspaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentWritePermissionEntity

```ruby
agent_write_permission = client.AgentWritePermission
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `String` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `String` | Yes |  |
| `granted_by` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `in_effect` | `Boolean` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `Object` | Yes |  |
| `tool` | `String` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AgentWritePermission.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AgentWritePermission.remove({ "id" => "agent_write_permission_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentWritePermissionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AllocationLogEntity

```ruby
allocation_log = client.AllocationLog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `String` | Yes |  |
| `environment` | `String` | No |  |
| `fetched_at` | `String` | Yes |  |
| `location` | `Object` | No |  |
| `logs` | `String` | Yes |  |
| `namespace` | `String` | Yes |  |
| `offset` | `Integer` | Yes |  |
| `origin` | `String` | Yes |  |
| `service` | `String` | No |  |
| `task` | `String` | Yes |  |
| `type` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AllocationLog.list({ "allocation_id" => "example", "app_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AllocationLogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppEntity

```ruby
app = client.App
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `description` | `Object` | Yes |  |
| `framework` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `repository_id` | `String` | Yes |  |
| `repository_kind` | `Object` | Yes |  |
| `root_path` | `String` | Yes |  |
| `root_path_display` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.App.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
  "repository_id" => "example_repository_id", # String
  "root_path" => "example_root_path", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.App.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.App.load({ "id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.App.patch({
  "id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.App.remove({ "id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.App.update({
  "id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppCdnEntity

```ruby
app_cdn = client.AppCdn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `cache_path_prefix` | `Object` | No |  |
| `cache_settings_json` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `distribution_kind` | `String` | Yes |  |
| `edge_hostname` | `Object` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `hostnames` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `last_deployed_at` | `Object` | Yes |  |
| `last_deployed_at_label` | `Object` | Yes |  |
| `last_purged_at` | `Object` | Yes |  |
| `last_purged_at_label` | `Object` | Yes |  |
| `last_synced_at` | `Object` | Yes |  |
| `last_synced_at_label` | `Object` | Yes |  |
| `name` | `String` | Yes |  |
| `origin_url` | `String` | Yes |  |
| `provisioned` | `Boolean` | Yes |  |
| `routing_settings_json` | `Object` | Yes |  |
| `security_settings_json` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppCdn.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "origin_url" => "example_origin_url", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppCdn.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppCdn.load({ "id" => "app_cdn_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppCdn.patch({
  "id" => "app_cdn_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppCdn.remove({ "id" => "app_cdn_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppCdn.update({
  "id" => "app_cdn_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppCdnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppConfigVariableEntity

```ruby
app_config_variable = client.AppConfigVariable
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `description` | `Object` | Yes |  |
| `exposed_to_build` | `Boolean` | Yes |  |
| `has_value` | `Boolean` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `key` | `String` | Yes |  |
| `scope_kind` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `value` | `Object` | Yes |  |
| `value_kind` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppConfigVariable.create({
  "app_id" => "example_app_id", # String
  "exposed_to_build" => true, # Boolean
  "key" => "example_key", # String
  "scope_kind" => "example_scope_kind", # String
  "value_kind" => "example_value_kind", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppConfigVariable.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppConfigVariable.load({ "id" => "app_config_variable_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppConfigVariable.patch({
  "id" => "app_config_variable_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppConfigVariable.remove({ "id" => "app_config_variable_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppConfigVariable.update({
  "id" => "app_config_variable_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppConfigVariableEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppDataResourceEntity

```ruby
app_data_resource = client.AppDataResource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `engine` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `high_availability` | `Boolean` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `plan` | `Object` | Yes |  |
| `provider_metadata` | `Hash` | Yes |  |
| `region` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `storage_gb` | `Object` | Yes |  |
| `storage_label` | `Object` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppDataResource.create({
  "app_id" => "example_app_id", # String
  "engine" => "example_engine", # String
  "kind" => "example_kind", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppDataResource.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppDataResource.load({ "id" => "app_data_resource_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppDataResource.patch({
  "id" => "app_data_resource_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppDataResource.remove({ "id" => "app_data_resource_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppDataResource.update({
  "id" => "app_data_resource_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppDataResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppDeployEntity

```ruby
app_deploy = client.AppDeploy
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `String` | No |  |
| `app_service_id` | `String` | No |  |
| `channel` | `String` | No |  |
| `command` | `String` | No |  |
| `commit_sha` | `String` | No |  |
| `desired_instances` | `Integer` | No |  |
| `environment` | `String` | No | Environment slug or public ID, all, or existing. |
| `image` | `String` | Yes |  |
| `region` | `String` | No |  |
| `rollout_predecessor` | `String` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `String` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppDeploy.create({
  "app_id" => "example_app_id", # String
  "image" => "example_image", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppDeployEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppDeploymentEntity

```ruby
app_deployment = client.AppDeployment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `String` | Yes |  |
| `app_service_id` | `String` | Yes |  |
| `app_service_placement_id` | `String` | No |  |
| `artifact_locator` | `Object` | Yes |  |
| `build_role` | `Object` | Yes |  |
| `commit_sha` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `creator_user_id` | `Object` | Yes |  |
| `deployed_url` | `Object` | Yes |  |
| `display_id` | `Integer` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `finished_at` | `Object` | Yes |  |
| `finished_at_label` | `Object` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `Object` | Yes |  |
| `is_rollback` | `Boolean` | Yes |  |
| `location` | `Object` | Yes |  |
| `location_id` | `String` | Yes |  |
| `number` | `Integer` | Yes |  |
| `operation_key` | `Object` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `rollback_reason` | `Object` | Yes |  |
| `rollback_source_deployment_id` | `Object` | Yes |  |
| `rollback_source_release_id` | `Object` | Yes |  |
| `rollback_target_release_id` | `Object` | Yes |  |
| `source_ref` | `Object` | Yes |  |
| `started_at` | `Object` | Yes |  |
| `started_at_label` | `Object` | Yes |  |
| `status` | `String` | Yes |  |
| `trigger_kind` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppDeployment.create({
  "app_id" => "example_app_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppDeployment.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppDeployment.load({ "id" => "app_deployment_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppDeployment.patch({
  "id" => "app_deployment_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppDeployment.remove({ "id" => "app_deployment_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppDeployment.update({
  "id" => "app_deployment_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppDeploymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppDeploymentOperationEntity

```ruby
app_deployment_operation = client.AppDeploymentOperation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `Hash` | Yes |  |
| `app_environment_id` | `String` | No |  |
| `app_service_id` | `String` | No |  |
| `app_service_placement_id` | `String` | No |  |
| `artifact_locator` | `Object` | Yes |  |
| `build_duration_seconds` | `Object` | Yes |  |
| `build_source` | `Object` | Yes |  |
| `build_status` | `String` | Yes |  |
| `children` | `Array` | Yes |  |
| `ci_pipeline_id` | `Object` | Yes |  |
| `ci_pipeline_run_id` | `Object` | Yes |  |
| `commit_sha` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `creator` | `Object` | Yes |  |
| `deployed_url` | `Object` | Yes |  |
| `duration_seconds` | `Object` | Yes |  |
| `environment` | `Hash` | Yes |  |
| `failure_message` | `String` | No |  |
| `finished_at` | `String` | No |  |
| `history_kind` | `String` | Yes |  |
| `history_reason` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `is_live` | `Boolean` | Yes |  |
| `is_rollback` | `Boolean` | Yes |  |
| `live_region_count` | `Integer` | Yes |  |
| `location_id` | `String` | No |  |
| `number` | `Integer` | Yes |  |
| `placement` | `Object` | Yes |  |
| `region_count` | `Integer` | Yes |  |
| `replicas_per_region` | `Integer` | Yes |  |
| `rollback_reason` | `Object` | Yes |  |
| `rollback_source_release_id` | `Object` | Yes |  |
| `rollback_target_release_id` | `Object` | Yes |  |
| `rollout_predecessor_id` | `Object` | Yes |  |
| `rollout_status` | `String` | Yes |  |
| `rollout_strategy` | `String` | Yes |  |
| `service` | `Hash` | Yes |  |
| `source_ref` | `Object` | Yes |  |
| `started_at` | `String` | No |  |
| `status` | `String` | Yes |  |
| `total_replicas` | `Integer` | Yes |  |
| `trigger_kind` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppDeploymentOperation.create({
  "app_id" => "example_app_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppDeploymentOperation.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppDeploymentOperation.load({ "id" => "app_deployment_operation_id", "app_id" => "app_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppDeploymentOperationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppDeploymentRollbackEntity

```ruby
app_deployment_rollback = client.AppDeploymentRollback
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `String` | No |  |
| `app_id` | `String` | Yes |  |
| `app_service_id` | `String` | No |  |
| `blockers` | `Array` | Yes |  |
| `candidate_releases` | `Array` | Yes |  |
| `confirmation_text` | `String` | Yes |  |
| `current_deployment` | `Object` | Yes |  |
| `current_release` | `Object` | Yes |  |
| `deployment` | `Object` | Yes |  |
| `desired_state` | `Object` | Yes |  |
| `environment` | `Object` | Yes |  |
| `execution_allowed` | `Boolean` | Yes |  |
| `force` | `Boolean` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `idempotent_reuse` | `Boolean` | Yes |  |
| `location` | `Object` | Yes |  |
| `operation` | `Object` | Yes |  |
| `reason` | `Object` | Yes |  |
| `rollback_release` | `Object` | Yes |  |
| `rollout` | `Object` | Yes |  |
| `service` | `Object` | Yes |  |
| `target_artifact_locator` | `Object` | Yes |  |
| `target_release` | `Object` | Yes |  |
| `to` | `String` | No |  |
| `warnings` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppDeploymentRollback.create({
  "app_id" => "example_app_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppDeploymentRollbackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppEnvironmentEntity

```ruby
app_environment = client.AppEnvironment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `Boolean` | Yes |  |
| `base_domain` | `Object` | Yes |  |
| `branch_pattern` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `location` | `Object` | Yes |  |
| `location_id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppEnvironment.create({
  "app_id" => "example_app_id", # String
  "auto_deploy" => true, # Boolean
  "kind" => "example_kind", # String
  "location_id" => "example_location_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "status" => "example_status", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppEnvironment.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppEnvironment.load({ "id" => "app_environment_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppEnvironment.patch({
  "id" => "app_environment_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppEnvironment.remove({ "id" => "app_environment_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppEnvironment.update({
  "id" => "app_environment_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppEnvironmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppLocationEntity

```ruby
app_location = client.AppLocation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `location_id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `nomad_datacenter` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppLocation.create({
  "app_id" => "example_app_id", # String
  "location_id" => "example_location_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppLocation.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppLocation.remove({ "id" => "app_location_id", "app_id" => "app_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppLocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppMetricEntity

```ruby
app_metric = client.AppMetric
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppMetricEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppPreviewEntity

```ruby
app_preview = client.AppPreview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `String` | No |  |
| `app_preview_profile_id` | `String` | Yes |  |
| `change_number` | `String` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `Integer` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `Integer` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | Yes |  |
| `resource_overrides` | `Hash` | No | Service public IDs mapped to resource overrides. |
| `retained` | `Boolean` | No |  |
| `shared_data_binding_ids` | `Array` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `Array` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `String` | Yes |  |
| `source_ref` | `String` | No |  |
| `storage_binding_resources` | `Hash` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppPreview.create({
  "app_id" => "example_app_id", # String
  "app_preview_profile_id" => "example_app_preview_profile_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppPreview.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppPreview.load({ "id" => "app_preview_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppPreview.patch({
  "id" => "app_preview_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppPreview.remove({ "id" => "app_preview_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppPreview.update({
  "id" => "app_preview_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppPreviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppPreviewProfileEntity

```ruby
app_preview_profile = client.AppPreviewProfile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `Boolean` | No |  |
| `configuration` | `Hash` | No |  |
| `created_at` | `String` | No |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `source_environment_id` | `String` | Yes |  |
| `ttl_days` | `Integer` | No |  |
| `updated_at` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppPreviewProfile.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "source_environment_id" => "example_source_environment_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppPreviewProfile.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppPreviewProfile.load({ "id" => "app_preview_profile_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppPreviewProfile.patch({
  "id" => "app_preview_profile_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppPreviewProfile.remove({ "id" => "app_preview_profile_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppPreviewProfile.update({
  "id" => "app_preview_profile_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppPreviewProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppRunEntity

```ruby
app_run = client.AppRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `image` | `String` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppRun.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppRun.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppRun.load({ "id" => "app_run_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppSecretEntity

```ruby
app_secret = client.AppSecret
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `description` | `Object` | No |  |
| `env_key` | `Object` | No |  |
| `expose_to_build` | `Boolean` | No |  |
| `has_value` | `Boolean` | No |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `latest_version_number` | `Object` | No |  |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `rotation_policy` | `Object` | No |  |
| `scope_kind` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | No |  |
| `value` | `String` | No |  |
| `value_digest` | `Object` | No |  |
| `value_kind` | `Object` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppSecret.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppSecret.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppSecret.load({ "id" => "app_secret_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppSecret.patch({
  "id" => "app_secret_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppSecret.remove({ "id" => "app_secret_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppSecret.update({
  "id" => "app_secret_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppSecretEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppServiceEntity

```ruby
app_service = client.AppService
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `Boolean` | Yes |  |
| `bindings` | `Array` | Yes |  |
| `build_command` | `Object` | Yes |  |
| `cpu_label` | `Object` | Yes |  |
| `cpu_mhz` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `deploy_paths` | `Array` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `Integer` | Yes |  |
| `disk_label` | `Object` | Yes |  |
| `disk_mb` | `Object` | Yes |  |
| `effective_deploy_paths` | `Array` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `Object` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `internal_port` | `Object` | Yes |  |
| `kind` | `String` | Yes |  |
| `memory_label` | `Object` | Yes |  |
| `memory_max_label` | `Object` | Yes |  |
| `memory_max_mb` | `Object` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `Object` | Yes |  |
| `name` | `String` | Yes |  |
| `nomad_constraints_json` | `Object` | Yes |  |
| `nomad_kill_timeout_seconds` | `Object` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `Object` | Yes |  |
| `nomad_region` | `Object` | Yes |  |
| `nomad_shutdown_delay_seconds` | `Object` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `Object` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `Object` | Yes |  |
| `prestart_command` | `Object` | Yes |  |
| `publicly_accessible` | `Boolean` | Yes |  |
| `release_command` | `Object` | Yes |  |
| `repo_source_path` | `String` | Yes |  |
| `runtime` | `String` | Yes |  |
| `runtime_adapter_kind` | `String` | Yes |  |
| `runtime_adapter_settings_json` | `Object` | Yes |  |
| `schedule` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `source_path` | `String` | Yes |  |
| `start_command` | `Object` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppService.create({
  "app_id" => "example_app_id", # String
  "auto_deploy" => true, # Boolean
  "desired_instances" => 1, # Integer
  "kind" => "example_kind", # String
  "name" => "example_name", # String
  "publicly_accessible" => true, # Boolean
  "runtime" => "example_runtime", # String
  "runtime_adapter_kind" => "example_runtime_adapter_kind", # String
  "slug" => "example_slug", # String
  "source_path" => "example_source_path", # String
  "start_command" => "example_start_command", # Object
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppService.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppService.load({ "id" => "app_service_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppService.patch({
  "id" => "app_service_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppService.remove({ "id" => "app_service_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppService.update({
  "id" => "app_service_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppServiceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppServiceBindingEntity

```ruby
app_service_binding = client.AppServiceBinding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppServiceBinding.create({
  "app_id" => "example_app_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppServiceBinding.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppServiceBinding.load({ "id" => "app_service_binding_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppServiceBinding.patch({
  "id" => "app_service_binding_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppServiceBinding.remove({ "id" => "app_service_binding_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppServiceBinding.update({
  "id" => "app_service_binding_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppServiceBindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppServicePlacementEntity

```ruby
app_service_placement = client.AppServicePlacement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `String` | Yes |  |
| `app_service_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `deployment_channel` | `Object` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `mode` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `region_count` | `Integer` | Yes |  |
| `replicas_per_region` | `Integer` | Yes |  |
| `rollout_strategy` | `String` | Yes |  |
| `targets` | `Array` | Yes |  |
| `total_replicas` | `Integer` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppServicePlacement.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppServicePlacement.load({ "id" => "app_service_placement_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppServicePlacementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppStorageResourceEntity

```ruby
app_storage_resource = client.AppStorageResource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `String` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `Object` | Yes |  |
| `attachment` | `Object` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `Object` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `ephemeral` | `Boolean` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `Object` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `location_code` | `Object` | Yes |  |
| `location_id` | `Object` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `Object` | Yes |  |
| `name` | `String` | Yes |  |
| `provider` | `String` | Yes | Storage backend. |
| `provider_error` | `Object` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AppStorageResource.create({
  "app_id" => "example_app_id", # String
  "access_mode" => "example_access_mode", # String
  "kind" => "example_kind", # String
  "name" => "example_name", # String
  "provider" => "example_provider", # String
  "slug" => "example_slug", # String
  "status" => "example_status", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AppStorageResource.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AppStorageResource.load({ "id" => "app_storage_resource_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.AppStorageResource.patch({
  "id" => "app_storage_resource_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AppStorageResource.remove({ "id" => "app_storage_resource_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AppStorageResource.update({
  "id" => "app_storage_resource_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppStorageResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AttachmentPartEntity

```ruby
attachment_part = client.AttachmentPart
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AttachmentPart.update({
  "agent_id" => "agent_id",
  "attachment_id" => "attachment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AttachmentPartEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AutomationEventEntity

```ruby
automation_event = client.AutomationEvent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `can_manage` | `Boolean` | Yes |  |
| `can_manage_events` | `Boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `Boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `Boolean` | Yes |  |
| `event_subscriptions` | `Array` | Yes |  |
| `event_triggers` | `Array` | Yes |  |
| `expected_revision` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `key` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `revision` | `Integer` | Yes |  |
| `schedule` | `Object` | Yes |  |
| `schedules` | `Array` | Yes |  |
| `settings` | `Hash` | No |  |
| `subscription_key` | `String` | Yes |  |
| `version` | `Hash` | Yes |  |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AutomationEvent.update({
  "agent_id" => "agent_id",
  "automation_id" => "automation_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AutomationEventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AutomationRunEntity

```ruby
automation_run = client.AutomationRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `automation` | `Object` | Yes | Saved native automation identity. |
| `budget_seconds` | `Object` | Yes | The run stops once it has been running this long |
| `budget_usd` | `Object` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `Boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `Boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `Boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Object` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `Object` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Hash` | Yes |  |
| `error` | `Object` | Yes |  |
| `finished_at` | `Object` | Yes |  |
| `flow_steps` | `Object` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `String` | Yes |  |
| `input` | `Hash` | Yes |  |
| `needs_you` | `Boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `Object` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `Object` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `String` | Yes |  |
| `resume_count` | `Integer` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `Object` | Yes |  |
| `running_seconds` | `Integer` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `String` | Yes |  |
| `spent_tokens` | `Integer` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `Float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `Boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `String` | Yes |  |
| `started_by` | `Object` | Yes | The event that started the run |
| `status` | `String` | Yes |  |
| `step_count` | `Integer` | Yes |  |
| `steps` | `Array` | Yes |  |
| `trigger_id` | `Object` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `String` | Yes |  |
| `wake_at` | `Object` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `Object` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AutomationRun.create({
  "agent_id" => "example_agent_id", # String
  "automation_id" => "example_automation_id", # String
  "organization_id" => "example_organization_id", # String
  "input" => {}, # Hash
  "request_id" => "example_request_id", # String
  "version_id" => "example_version_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AutomationRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BinaryEntity

```ruby
binary = client.Binary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `Boolean` | Yes |  |
| `arch` | `Object` | No |  |
| `archived_at` | `Object` | Yes |  |
| `binary` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `download_secret` | `String` | No |  |
| `download_url` | `String` | Yes |  |
| `executable` | `String` | Yes |  |
| `format` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | Yes |  |
| `latest_version` | `Object` | Yes |  |
| `launch_args` | `Array` | No |  |
| `name` | `String` | Yes |  |
| `needs_refresh` | `Boolean` | Yes |  |
| `operation` | `Hash` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `platform` | `Object` | No |  |
| `project_id` | `String` | Yes |  |
| `sha256` | `String` | No |  |
| `slug` | `String` | Yes |  |
| `version` | `Hash` | Yes |  |
| `version_defaults` | `Object` | No |  |
| `versions` | `Array` | Yes |  |
| `window_title` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Binary.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "download_url" => "example_download_url", # String
  "executable" => "example_executable", # String
  "format" => "example_format", # Object
  "idempotency_key" => "example_idempotency_key", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "window_title" => "example_window_title", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Binary.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Binary.load({ "id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BinaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BinaryVersionEntity

```ruby
binary_version = client.BinaryVersion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `Object` | No |  |
| `cancelable` | `Boolean` | Yes |  |
| `configuration` | `Hash` | Yes |  |
| `configuration_digest` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `deletable` | `Boolean` | Yes |  |
| `download_secret` | `String` | No |  |
| `download_url` | `String` | Yes |  |
| `environment_uses` | `Array` | Yes |  |
| `executable` | `String` | No |  |
| `format` | `Object` | No |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | Yes |  |
| `launch_args` | `Array` | No |  |
| `operation` | `Hash` | Yes |  |
| `package_sha256` | `Object` | Yes |  |
| `package_size` | `Object` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `platform` | `Object` | No |  |
| `preparations` | `Array` | Yes |  |
| `retryable` | `Boolean` | Yes |  |
| `sha256` | `String` | No |  |
| `status` | `String` | Yes |  |
| `version` | `Hash` | Yes |  |
| `window_title` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BinaryVersion.create({
  "binary_id" => "example_binary_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "download_url" => "example_download_url", # String
  "idempotency_key" => "example_idempotency_key", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.BinaryVersion.list({ "binary_id" => "example", "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BinaryVersion.load({ "id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.BinaryVersion.remove({ "id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BinaryVersionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserEgressCandidateEntity

```ruby
browser_egress_candidate = client.BrowserEgressCandidate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.BrowserEgressCandidate.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserEgressCandidateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionEntity

```ruby
browser_session = client.BrowserSession
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `Object` | No |  |
| `authentication_status` | `String` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `Object` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `Object` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `Object` | No |  |
| `closure_basis` | `Object` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `Integer` | Yes |  |
| `controller` | `String` | Yes |  |
| `credential_id` | `Object` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `String` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `Object` | No |  |
| `expires_at` | `String` | Yes |  |
| `failure_code` | `Object` | No |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `initial_url` | `String` | Yes |  |
| `max_seconds` | `Integer` | No |  |
| `pending_control_id` | `Object` | No |  |
| `project_id` | `Object` | No | Optional project slug or public ID. |
| `reconciled_at` | `Object` | No |  |
| `started_at` | `Object` | No |  |
| `status` | `String` | Yes |  |
| `url` | `String` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `Object` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BrowserSession.create({
  "organization_id" => "example_organization_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BrowserSession.load({ "id" => "browser_session_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.BrowserSession.remove({ "id" => "browser_session_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionConnectionEntity

```ruby
browser_session_connection = client.BrowserSessionConnection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `Integer` | Yes |  |
| `idempotency_key` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BrowserSessionConnection.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
  "generation" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionControlEntity

```ruby
browser_session_control = client.BrowserSessionControl
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `String` | Yes |  |
| `completed_at` | `Object` | No |  |
| `completed_generation` | `Object` | No |  |
| `connection` | `Object` | No |  |
| `failure_code` | `Object` | No |  |
| `id` | `String` | Yes |  |
| `requested_controller` | `String` | Yes |  |
| `requested_generation` | `Integer` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BrowserSessionControl.load({ "id" => "browser_session_control_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionControlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionEventEntity

```ruby
browser_session_event = client.BrowserSessionEvent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `Object` | No |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `payload` | `Hash` | Yes |  |
| `source_sequence` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.BrowserSessionEvent.list({ "browser_session_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionEventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionMediaEntity

```ruby
browser_session_media = client.BrowserSessionMedia
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `String` | Yes |  |
| `capture_omissions` | `Object` | No |  |
| `captured_at` | `Object` | No |  |
| `ended_at` | `Object` | No |  |
| `failure_code` | `Object` | No |  |
| `files` | `Array` | Yes |  |
| `frames` | `Object` | No |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `partial` | `Boolean` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `String` | Yes |  |
| `source` | `Object` | No | Screenshot provenance. |
| `status` | `String` | Yes |  |
| `stop_requested_at` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BrowserSessionMedia.load({ "id" => "browser_session_media_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionMediaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionRecordingEntity

```ruby
browser_session_recording = client.BrowserSessionRecording
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `idempotency_key` | `String` | No |  |
| `wait` | `Boolean` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BrowserSessionRecording.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionRecordingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionScreenshotEntity

```ruby
browser_session_screenshot = client.BrowserSessionScreenshot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `String` | No |  |
| `wait` | `Boolean` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BrowserSessionScreenshot.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionScreenshotEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BrowserSessionTaskEntity

```ruby
browser_session_task = client.BrowserSessionTask
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `Object` | No |  |
| `browser_session_id` | `String` | Yes |  |
| `cancel_requested_at` | `Object` | No |  |
| `completed_at` | `Object` | No |  |
| `control_generation` | `Object` | No |  |
| `deadline_at` | `String` | Yes |  |
| `effects_unknown` | `Boolean` | Yes |  |
| `failure_code` | `Object` | No |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `instruction` | `String` | Yes |  |
| `max_rounds` | `Integer` | Yes |  |
| `max_seconds` | `Integer` | No |  |
| `model_selection` | `Hash` | Yes |  |
| `outcome` | `Object` | No |  |
| `result` | `Hash` | Yes |  |
| `started_at` | `Object` | No |  |
| `status` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BrowserSessionTask.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
  "instruction" => "example_instruction", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BrowserSessionTask.load({ "id" => "browser_session_task_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BrowserSessionTaskEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CatalogSelectorEntity

```ruby
catalog_selector = client.CatalogSelector
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CatalogSelector.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CatalogSelectorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CdnDeploymentEntity

```ruby
cdn_deployment = client.CdnDeployment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CdnDeployment.create({
  "app_id" => "example_app_id", # String
  "cdn_id" => "example_cdn_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CdnDeployment.list({ "app_id" => "example", "cdn_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CdnDeployment.load({ "id" => "cdn_deployment_id", "app_id" => "app_id", "cdn_id" => "cdn_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CdnDeploymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CdnHostnameEntity

```ruby
cdn_hostname = client.CdnHostname
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dns_status` | `String` | Yes |  |
| `force_ssl` | `Boolean` | Yes |  |
| `hostname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `provider_hostname_id` | `Object` | Yes |  |
| `tls_status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CdnHostname.create({
  "app_id" => "example_app_id", # String
  "cdn_id" => "example_cdn_id", # String
  "hostname" => "example_hostname", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CdnHostname.list({ "app_id" => "example", "cdn_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CdnHostname.load({ "id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.CdnHostname.patch({
  "id" => "cdn_hostname_id",
  "app_id" => "app_id",
  "cdn_id" => "cdn_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.CdnHostname.remove({ "id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CdnHostname.update({
  "id" => "cdn_hostname_id",
  "app_id" => "app_id",
  "cdn_id" => "cdn_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CdnHostnameEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CdnSpaceEntity

```ruby
cdn_space = client.CdnSpace
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CdnSpace.create({
  "organization_id" => "example_organization_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CdnSpace.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CdnSpace.load({ "id" => "cdn_space_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.CdnSpace.patch({
  "id" => "cdn_space_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.CdnSpace.remove({ "id" => "cdn_space_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CdnSpace.update({
  "id" => "cdn_space_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CdnSpaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CdnSpaceObjectEntity

```ruby
cdn_space_object = client.CdnSpaceObject
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CdnSpaceObject.list({ "cdn_space_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CdnSpaceObject.load({ "id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.CdnSpaceObject.remove({ "id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CdnSpaceObject.update({
  "cdn_space_id" => "cdn_space_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CdnSpaceObjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConnectionRequestEntity

```ruby
connection_request = client.ConnectionRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `String` | Yes |  |
| `auth_scheme` | `String` | Yes |  |
| `can_configure` | `Boolean` | Yes |  |
| `can_disconnect` | `Boolean` | Yes |  |
| `can_setup` | `Boolean` | Yes |  |
| `error_code` | `Object` | Yes |  |
| `generation` | `Integer` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `remote_agent` | `Object` | Yes |  |
| `retired_at` | `Object` | Yes |  |
| `revoked_at` | `Object` | Yes |  |
| `source_operation_id` | `Object` | Yes |  |
| `state` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ConnectionRequest.load({ "id" => "connection_request_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConnectionRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConnectionSourceEntity

```ruby
connection_source = client.ConnectionSource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `device_id` | `String` | Yes |  |
| `device_name` | `String` | Yes |  |
| `provider` | `String` | Yes |  |
| `source_operation_id` | `String` | Yes |  |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ConnectionSource.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConnectionSourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoordinationWaitEntity

```ruby
coordination_wait = client.CoordinationWait
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `Boolean` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `stop_state` | `Object` | Yes |  |
| `wake_outcome` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CoordinationWait.list({ "agent_id" => "example", "coordination_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoordinationWaitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CredentialSignInCheckEntity

```ruby
credential_sign_in_check = client.CredentialSignInCheck
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes | The project environment (app) to sign in to |
| `environment_name` | `String` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CredentialSignInCheck.create({
  "credential_id" => "example_credential_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "environment_id" => "example_environment_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CredentialSignInCheckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DataResourceRotateCredentialEntity

```ruby
data_resource_rotate_credential = client.DataResourceRotateCredential
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `engine` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `high_availability` | `Boolean` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `plan` | `Object` | Yes |  |
| `provider_metadata` | `Hash` | Yes |  |
| `region` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `storage_gb` | `Object` | Yes |  |
| `storage_label` | `Object` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DataResourceRotateCredential.create({
  "app_id" => "example_app_id", # String
  "data_resource_id" => "example_data_resource_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DataResourceRotateCredentialEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeepScanEntity

```ruby
deep_scan = client.DeepScan
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | No |  |
| `active` | `Array` | Yes |  |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `explorations` | `Array` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `launch_options` | `Hash` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Hash` | Yes |  |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DeepScan.create({
  "organization_id" => "example_organization_id", # String
  "environment_id" => "example_environment_id", # String
  "goal" => "example_goal", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DeepScan.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DeepScan.load({ "id" => "deep_scan_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeepScanEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeepScanFindingEntity

```ruby
deep_scan_finding = client.DeepScanFinding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `Integer` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `Array` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `Array` | Yes |  |
| `findings_fix_prompt` | `Object` | Yes |  |
| `free_findings_pending` | `Boolean` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `String` | Yes |  |
| `mode` | `String` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `priority` | `Object` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | Yes |  |
| `reproduction_of` | `Object` | Yes |  |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `Boolean` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `unlock` | `Hash` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DeepScanFinding.list({ "deep_scan_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeepScanFindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeepScanFlowEntity

```ruby
deep_scan_flow = client.DeepScanFlow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | No |  |
| `concurrency` | `Integer` | No |  |
| `environment_id` | `String` | No |  |
| `exploration_id` | `String` | No |  |
| `flow_names` | `Array` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `max_seconds` | `Integer` | No |  |
| `max_testers` | `Integer` | No |  |
| `note` | `Object` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DeepScanFlow.create({
  "organization_id" => "example_organization_id", # String
  "flow_names" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeepScanFlowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeepScanMappedFlowEntity

```ruby
deep_scan_mapped_flow = client.DeepScanMappedFlow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | Yes |  |
| `environment_id` | `String` | Yes |  |
| `flow_map` | `Object` | Yes |  |
| `revision_id` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DeepScanMappedFlow.list({ "organization_id" => "example", "environment_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeepScanMappedFlowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeepScanOptionEntity

```ruby
deep_scan_option = client.DeepScanOption
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `Array` | Yes |  |
| `deep_scan_defaults` | `Object` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `Object` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `personas` | `Array` | No |  |
| `preview` | `Boolean` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DeepScanOption.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeepScanOptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DemoShareEntity

```ruby
demo_share = client.DemoShare
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `String` | Yes |  |
| `id` | `String` | No |  |
| `recording` | `Hash` | Yes |  |
| `summary` | `String` | Yes | What the recorded browser confirmed. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DemoShare.load({ "id" => "demo_share_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DemoShareEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DemoShareSegmentEntity

```ruby
demo_share_segment = client.DemoShareSegment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DemoShareSegment.load({ "id" => "demo_share_segment_id", "demo_share_id" => "demo_share_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DemoShareSegmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeploymentDashboardNomadEntity

```ruby
deployment_dashboard_nomad = client.DeploymentDashboardNomad
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeploymentDashboardNomadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeploymentFileEntity

```ruby
deployment_file = client.DeploymentFile
```

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DeploymentFile.update({
  "deployment_id" => "deployment_id",
  "static_site_id" => "static_site_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeploymentFileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainPathRuleEntity

```ruby
domain_path_rule = client.DomainPathRule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `String` | Yes |  |
| `app_service_endpoint_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `backend_ref` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `last_error` | `Object` | Yes |  |
| `path_prefix` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainPathRule.create({
  "app_id" => "example_app_id", # String
  "domain_id" => "example_domain_id", # String
  "app_service_id" => "example_app_service_id", # Object
  "path_prefix" => "example_path_prefix", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainPathRule.list({ "app_id" => "example", "domain_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainPathRule.load({ "id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.DomainPathRule.patch({
  "id" => "domain_path_rule_id",
  "app_id" => "app_id",
  "domain_id" => "domain_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainPathRule.remove({ "id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainPathRule.update({
  "id" => "domain_path_rule_id",
  "app_id" => "app_id",
  "domain_id" => "domain_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainPathRuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DreamEntity

```ruby
dream = client.Dream
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `Boolean` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `Array` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `Object` | Yes |  |
| `counts` | `Hash` | Yes |  |
| `dream` | `Object` | Yes |  |
| `error_code` | `Object` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `String` | Yes | Public id used in the dream's URL |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `phase` | `String` | Yes | Where the dream is. |
| `reason` | `Object` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `Integer` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `String` | Yes | Local day whose finished runs it reviewed |
| `runs` | `Array` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `String` | Yes | Project or unassigned environment name |
| `skipped` | `Integer` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `String` | Yes |  |
| `timezone` | `String` | Yes | Organization timezone the dream used |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Dream.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Dream.load({ "id" => "dream_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DreamEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentEntity

```ruby
environment = client.Environment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `Object` | Yes |  |
| `agent_sign_up_available` | `Boolean` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `String` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `Hash` | Yes |  |
| `cleanup` | `Array` | Yes |  |
| `connection` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `default_policy` | `Hash` | No |  |
| `default_policy_json` | `Hash` | Yes |  |
| `discovery_defaults` | `Hash` | Yes |  |
| `environment` | `Hash` | Yes |  |
| `exploration_accounts` | `Array` | No |  |
| `explorations` | `Array` | No |  |
| `first_run` | `Object` | No |  |
| `hosted_app_id` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `imessage_number` | `Object` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `Boolean` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `Integer` | Yes |  |
| `managed_google_available` | `Boolean` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `String` | Yes |  |
| `messaging_tester_number` | `Object` | No | One configured tester number. |
| `name` | `String` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `Array` | Yes |  |
| `onboarding_discovery` | `Object` | No |  |
| `organization_id` | `String` | Yes |  |
| `pending_accounts` | `Array` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `Hash` | Yes |  |
| `project_id` | `Object` | Yes | Owning project. |
| `repository_id` | `Object` | Yes |  |
| `revisions` | `Array` | Yes |  |
| `setup_discovery_id` | `Object` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `Boolean` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `target_kind` | `Object` | Yes |  |
| `target_url` | `Object` | Yes |  |
| `test_accounts` | `Hash` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verify_network_connection_id` | `Object` | Yes |  |
| `version` | `Integer` | No | Required for target or tester changes; use lock_version from the environment. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Environment.create({
  "organization_id" => "example_organization_id", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Environment.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Environment.load({ "id" => "environment_id", "organization_id" => "organization_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Environment.patch({
  "id" => "environment_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Environment.remove({ "id" => "environment_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Environment.update({
  "id" => "environment_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentDiscoveryRunEntity

```ruby
environment_discovery_run = client.EnvironmentDiscoveryRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | Yes | Omit for anonymous exploration |
| `deadline_at` | `String` | Yes |  |
| `environment_revision_id` | `String` | Yes |  |
| `evidence` | `Array` | No |  |
| `failure_code` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `queued_at` | `String` | Yes |  |
| `recording` | `Hash` | Yes |  |
| `result` | `Object` | Yes |  |
| `status` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EnvironmentDiscoveryRun.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EnvironmentDiscoveryRun.load({ "id" => "environment_discovery_run_id", "environment_id" => "environment_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentExplorationEntity

```ruby
environment_exploration = client.EnvironmentExploration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | No |  |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `persona_id` | `Object` | No |  |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EnvironmentExploration.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "goal" => "example_goal", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentExplorationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentFirstRunEntity

```ruby
environment_first_run = client.EnvironmentFirstRun
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentFirstRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentRevisionEntity

```ruby
environment_revision = client.EnvironmentRevision
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `Array` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `Object` | Yes |  |
| `app_release_id` | `Object` | Yes |  |
| `blueprint` | `Hash` | Yes |  |
| `blueprint_json` | `Hash` | Yes |  |
| `cleanup_state` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `digest` | `String` | Yes |  |
| `dry_run` | `Boolean` | No |  |
| `expires_at` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `ready_at` | `Object` | Yes |  |
| `resolved_manifest_json` | `Hash` | Yes |  |
| `retention_policy_json` | `Hash` | Yes |  |
| `revision` | `Integer` | Yes |  |
| `revoked_at` | `Object` | Yes |  |
| `runner_environment_revision_id` | `Object` | Yes |  |
| `safety_policy_json` | `Hash` | Yes |  |
| `schema_version` | `Integer` | Yes |  |
| `source_metadata` | `Hash` | No |  |
| `source_metadata_json` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `validation_json` | `Hash` | Yes |  |
| `verify_environment_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EnvironmentRevision.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
  "blueprint" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EnvironmentRevision.load({ "id" => "environment_revision_id", "environment_id" => "environment_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.EnvironmentRevision.update({
  "id" => "environment_revision_id",
  "environment_id" => "environment_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentRevisionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentSecretBindingEntity

```ruby
environment_secret_binding = client.EnvironmentSecretBinding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `String` | Yes |  |
| `id` | `String` | No |  |
| `mode` | `String` | No |  |
| `secret_id` | `String` | No |  |
| `secret_version_id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EnvironmentSecretBinding.create({
  "app_id" => "example_app_id", # String
  "environment_id" => "example_environment_id", # String
  "env_key" => "example_env_key", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EnvironmentSecretBinding.list({ "app_id" => "example", "environment_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.EnvironmentSecretBinding.remove({ "id" => "environment_secret_binding_id", "app_id" => "app_id", "environment_id" => "environment_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentSecretBindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnvironmentTestAccountEntity

```ruby
environment_test_account = client.EnvironmentTestAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `Boolean` | Yes |  |
| `credentials` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `persona` | `String` | Yes |  |
| `revision_id` | `String` | Yes |  |
| `role` | `String` | Yes |  |
| `tenant` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EnvironmentTestAccount.list({ "environment_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.EnvironmentTestAccount.patch({
  "environment_id" => "environment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.EnvironmentTestAccount.update({
  "environment_id" => "environment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnvironmentTestAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EvidenceEntity

```ruby
evidence = client.Evidence
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Evidence.load({ "id" => "evidence_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EvidenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExplorationEntity

```ruby
exploration = client.Exploration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | No |  |
| `active` | `Array` | Yes |  |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `explorations` | `Array` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | No |  |
| `launch_options` | `Hash` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Hash` | Yes |  |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `persona_id` | `Object` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Exploration.create({
  "organization_id" => "example_organization_id", # String
  "environment_id" => "example_environment_id", # String
  "goal" => "example_goal", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Exploration.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Exploration.load({ "id" => "exploration_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExplorationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExplorationMessageEntity

```ruby
exploration_message = client.ExplorationMessage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `text` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ExplorationMessage.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
  "text" => "example_text", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExplorationMessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExplorationReportEntity

```ruby
exploration_report = client.ExplorationReport
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExplorationReportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExplorationScenarioEntity

```ruby
exploration_scenario = client.ExplorationScenario
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Hash` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` | Yes |  |
| `can_continue` | `Boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` | No |  |
| `concurrency` | `Integer` | Yes |  |
| `covered_areas` | `Array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` | Yes |  |
| `deadline_at` | `String` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `explorer_activity` | `Hash` | Yes | What the team is doing now. |
| `finding_count` | `Integer` | Yes | Findings at every priority, locked ones included. |
| `findings` | `Array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `huntable_flows` | `Array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` | Yes |  |
| `max_seconds` | `Integer` | Yes |  |
| `max_testers` | `Integer` | Yes |  |
| `mode` | `String` | No |  |
| `next_scan_improvements` | `Array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` | Yes |  |
| `priority_counts` | `Hash` | Yes |  |
| `project_id` | `Object` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `reproduction_of` | `Object` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` | Yes |  |
| `sign_in_needs_answer` | `Boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` | Yes |  |
| `time_limit_reached` | `Boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ExplorationScenario.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExplorationScenarioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FindingEntity

```ruby
finding = client.Finding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `deferred_until` | `Object` | No | Required future time when status is deferred |
| `finding` | `Hash` | Yes |  |
| `fingerprint` | `String` | Yes |  |
| `first_seen_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `last_seen_at` | `String` | Yes |  |
| `locked` | `Boolean` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `Integer` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `reason` | `String` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `Object` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `Object` | Yes |  |
| `safe_summary` | `String` | Yes |  |
| `scenario_occurrences` | `Array` | No |  |
| `severity` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verification` | `Object` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Finding.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Finding.load({ "id" => "finding_id", "organization_id" => "organization_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Finding.patch({
  "id" => "finding_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Finding.update({
  "id" => "finding_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GithubConnectionEntity

```ruby
github_connection = client.GithubConnection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `Array` | Yes |  |
| `github_app_installation_id` | `String` | Yes |  |
| `installations` | `Array` | Yes |  |
| `project_id` | `String` | No | Project slug or public ID the repositories are added to. |
| `replace` | `Boolean` | No | Make these the project's only repositories. |
| `repositories` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.GithubConnection.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "repositories" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.GithubConnection.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GithubConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HostingAppDomainEntity

```ruby
hosting_app_domain = client.HostingAppDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `certificate` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dns_mode` | `String` | Yes |  |
| `dns_status` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `hosted_app_id` | `String` | Yes |  |
| `hostname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `last_checked_at` | `Object` | Yes |  |
| `path_rules` | `Array` | Yes |  |
| `record_name` | `Object` | Yes |  |
| `record_type` | `Object` | Yes |  |
| `record_value` | `Object` | Yes |  |
| `redirect_to` | `Object` | Yes |  |
| `static_site_id` | `Object` | Yes |  |
| `target_kind` | `String` | Yes |  |
| `tls_status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verification_record` | `Object` | Yes |  |
| `verification_status` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.HostingAppDomain.create({
  "app_id" => "example_app_id", # String
  "app_service_id" => "example_app_service_id", # Object
  "hostname" => "example_hostname", # String
  "kind" => "example_kind", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.HostingAppDomain.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.HostingAppDomain.load({ "id" => "hosting_app_domain_id", "app_id" => "app_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.HostingAppDomain.patch({
  "id" => "hosting_app_domain_id",
  "app_id" => "app_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.HostingAppDomain.remove({ "id" => "hosting_app_domain_id", "app_id" => "app_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.HostingAppDomain.update({
  "id" => "hosting_app_domain_id",
  "app_id" => "app_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HostingAppDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ImageRepositoryEntity

```ruby
image_repository = client.ImageRepository
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `hosted_app_id` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `provider_kind` | `String` | Yes |  |
| `registry_auth_token` | `String` | No |  |
| `repository_path` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |
| `visibility` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ImageRepository.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ImageRepository.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ImageRepositoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntegrationEntity

```ruby
integration = client.Integration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `Hash` | Yes |  |
| `gitlab` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `slack` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Integration.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InteractionResponseEntity

```ruby
interaction_response = client.InteractionResponse
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `Hash` | Yes |  |
| `conversation_id` | `String` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `Integer` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.InteractionResponse.create({
  "agent_id" => "example_agent_id", # String
  "interaction_id" => "example_interaction_id", # String
  "organization_id" => "example_organization_id", # String
  "answer" => {}, # Hash
  "conversation_id" => "example_conversation_id", # String
  "expected_revision" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InteractionResponseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InvitationEntity

```ruby
invitation = client.Invitation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `Object` | Yes |  |
| `accepted_by_user` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `email` | `String` | Yes |  |
| `email_delivery_status` | `String` | No |  |
| `expires_at` | `Object` | Yes |  |
| `expires_at_label` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `invite_url` | `Object` | Yes |  |
| `invited_by_user` | `Object` | Yes |  |
| `organization` | `Hash` | Yes |  |
| `revoked_at` | `Object` | Yes |  |
| `role` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Invitation.create({
  "organization_id" => "example_organization_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Invitation.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Invitation.remove({ "id" => "invitation_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InvitationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JourneyVariantReplayEntity

```ruby
journey_variant_replay = client.JourneyVariantReplay
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `Object` | Yes |  |
| `can_request_qualification` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `failure_code` | `Object` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | Yes |  |
| `max_seconds` | `Integer` | No |  |
| `preparation_receipt` | `Object` | Yes |  |
| `qualification` | `Object` | Yes |  |
| `qualification_status` | `String` | Yes |  |
| `replay_required` | `Boolean` | Yes |  |
| `review_reason` | `String` | Yes |  |
| `run_id` | `Object` | Yes |  |
| `scenario_file` | `Hash` | Yes |  |
| `scenario_run_id` | `Object` | Yes |  |
| `source_digest` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `variant_id` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.JourneyVariantReplay.create({
  "journey_variant_id" => "example_journey_variant_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "idempotency_key" => "example_idempotency_key", # String
  "review_reason" => "example_review_reason", # String
  "scenario_file" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JourneyVariantReplayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## KnowledgeEntity

```ruby
knowledge = client.Knowledge
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `String` | Yes |  |
| `content_json` | `Hash` | Yes |  |
| `document` | `Hash` | Yes |  |
| `documents` | `Array` | Yes |  |
| `dreaming` | `Hash` | Yes |  |
| `expected_digest` | `String` | Yes |  |
| `history` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `markdown` | `String` | Yes |  |
| `observed_at` | `String` | Yes |  |
| `organization` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `project_id` | `String` | Yes |  |
| `project_name` | `String` | Yes |  |
| `projects` | `Array` | Yes |  |
| `selected_project_id` | `Object` | Yes |  |
| `source` | `Hash` | Yes |  |
| `title` | `String` | Yes |  |
| `total` | `Integer` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Knowledge.create({
  "organization_id" => "example_organization_id", # String
  "markdown" => "example_markdown", # String
  "project_id" => "example_project_id", # String
  "title" => "example_title", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Knowledge.load({ "id" => "knowledge_id", "organization_id" => "organization_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Knowledge.patch({
  "id" => "knowledge_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Knowledge.remove({ "id" => "knowledge_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Knowledge.update({
  "id" => "knowledge_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `KnowledgeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocalThreadDeliveryEntity

```ruby
local_thread_delivery = client.LocalThreadDelivery
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `String` | Yes |  |
| `decision_pending` | `Boolean` | Yes |  |
| `delivery` | `Hash` | Yes |  |
| `expected_version` | `Integer` | Yes |  |
| `id` | `String` | No |  |
| `policy` | `Hash` | Yes |  |
| `recovery_message` | `Object` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LocalThreadDelivery.load({ "id" => "local_thread_delivery_id", "agent_id" => "agent_id", "local_thread_id" => "local_thread_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LocalThreadDelivery.update({
  "id" => "local_thread_delivery_id",
  "agent_id" => "agent_id",
  "local_thread_id" => "local_thread_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocalThreadDeliveryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocalThreadOperationEntity

```ruby
local_thread_operation = client.LocalThreadOperation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `arguments` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `delivery` | `Hash` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `String` | Yes |  |
| `diagnostic_code` | `String` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `Hash` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `key` | `String` | Yes |  |
| `provider` | `String` | Yes |  |
| `references` | `Hash` | Yes |  |
| `result` | `Object` | Yes |  |
| `result_expired` | `Boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LocalThreadOperation.create({
  "agent_id" => "example_agent_id", # String
  "local_thread_id" => "example_local_thread_id", # String
  "organization_id" => "example_organization_id", # String
  "action" => "example_action", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LocalThreadOperation.load({ "id" => "local_thread_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocalThreadOperationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocationEntity

```ruby
location = client.Location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `nomad_datacenter` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Location.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MeEntity

```ruby
me = client.Me
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `Object` | Yes |  |
| `analytics_distinct_id` | `String` | No |  |
| `analytics_internal` | `Boolean` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `String` | No |  |
| `api_token` | `String` | No |  |
| `app_promotion` | `Hash` | Yes |  |
| `commit_author_email` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `enabled_features` | `Array` | Yes |  |
| `github_pr_user_authorization_connected` | `Boolean` | Yes |  |
| `github_pr_user_authorization_login` | `Object` | Yes |  |
| `github_prs_authored_by_change_author` | `Boolean` | Yes |  |
| `id` | `String` | Yes |  |
| `impersonation` | `Object` | Yes |  |
| `name` | `Object` | Yes |  |
| `next_path` | `String` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `Hash` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `Boolean` | No |  |
| `openai_sign_in_enabled` | `Boolean` | No |  |
| `organizations` | `Array` | Yes |  |
| `pending_organization_invitation_count` | `Integer` | Yes |  |
| `pending_organization_invitation_count_label` | `String` | Yes |  |
| `picture_url` | `Object` | Yes |  |
| `superadmin` | `Boolean` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `Object` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Me.load({ "id" => "me_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Me.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MeEmailEntity

```ruby
me_email = client.MeEmail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `Boolean` | Yes |  |
| `can_delete` | `Boolean` | Yes |  |
| `can_resend_verification` | `Boolean` | Yes |  |
| `can_set_account` | `Boolean` | Yes |  |
| `can_set_commit_author` | `Boolean` | Yes |  |
| `commit_author` | `Boolean` | Yes |  |
| `email` | `String` | Yes |  |
| `emails` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `message` | `String` | No |  |
| `verification_status` | `String` | Yes |  |
| `verified` | `Boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MeEmail.create({
  "email" => "example_email", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MeEmail.list
results.each { |item| puts item.data_get }
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.MeEmail.patch({
  "id" => "me_email_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.MeEmail.remove({ "id" => "me_email_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.MeEmail.update({
  "id" => "me_email_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MeEmailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MeOnboardingEntity

```ruby
me_onboarding = client.MeOnboarding
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MeOnboardingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MediaFileEntity

```ruby
media_file = client.MediaFile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.MediaFile.load({ "id" => "media_file_id", "browser_session_id" => "browser_session_id", "media_id" => "media_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MediaFileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MemberEntity

```ruby
member = client.Member
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `Object` | Yes |  |
| `accepted_by_user` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `email` | `String` | Yes |  |
| `email_delivery_status` | `String` | No |  |
| `expires_at` | `Object` | Yes |  |
| `expires_at_label` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `invite_url` | `Object` | Yes |  |
| `invited_by_user` | `Object` | Yes |  |
| `is_self` | `Boolean` | Yes |  |
| `organization` | `Hash` | Yes |  |
| `revoked_at` | `Object` | Yes |  |
| `role` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |
| `user` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Member.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Member.patch({
  "id" => "member_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Member.remove({ "id" => "member_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Member.update({
  "id" => "member_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MemberEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MemoryEntity

```ruby
memory = client.Memory
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `environment_id` | `String` | No |  |
| `finding` | `String` | Yes |  |
| `history` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `indexed_at` | `Object` | Yes |  |
| `memory` | `Hash` | Yes |  |
| `project_id` | `String` | No |  |
| `response` | `String` | No |  |
| `scope` | `Hash` | Yes |  |
| `source` | `Hash` | Yes |  |
| `tags` | `Array` | No |  |
| `title` | `String` | Yes |  |
| `workaround` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Memory.create({
  "organization_id" => "example_organization_id", # String
  "finding" => "example_finding", # String
  "title" => "example_title", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Memory.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Memory.load({ "id" => "memory_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Memory.remove({ "id" => "memory_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MemoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MergeRequestEntity

```ruby
merge_request = client.MergeRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `Array` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `String` | Yes |  |
| `branch` | `String` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `Object` | Yes |  |
| `current_run` | `Object` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `Boolean` | Yes |  |
| `findings` | `Array` | Yes |  |
| `github_repository` | `Object` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` | Yes |  |
| `head_sha` | `String` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `String` | Yes |  |
| `idempotency_key` | `String` | Yes |  |
| `number` | `Integer` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `preview_cleanup_ready` | `Boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `Object` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Object` | No |  |
| `project_id` | `Object` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `Object` | Yes |  |
| `provider` | `String` | Yes |  |
| `pull_request` | `Hash` | Yes |  |
| `repository_id` | `String` | Yes |  |
| `request_label` | `String` | Yes |  |
| `requested_run_id` | `Object` | Yes |  |
| `runs` | `Array` | Yes |  |
| `source_branch` | `Object` | Yes |  |
| `source_repository` | `Object` | Yes |  |
| `source_url` | `Object` | Yes |  |
| `state` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `web_path` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MergeRequest.create({
  "organization_id" => "example_organization_id", # String
  "idempotency_key" => "example_idempotency_key", # String
  "number" => 1, # Integer
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.MergeRequest.load({ "id" => "merge_request_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MergeRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessagingConversationMessageEntity

```ruby
messaging_conversation_message = client.MessagingConversationMessage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `Integer` | Yes |  |
| `attachment_max_bytes` | `Integer` | Yes |  |
| `client_operation_id` | `String` | Yes |  |
| `content` | `String` | Yes |  |
| `id` | `String` | No |  |
| `media` | `Hash` | Yes |  |
| `media_upload_ids` | `Array` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `Array` | Yes |  |
| `reply_to` | `String` | No | Public ID of a visible message |
| `retry_attachment` | `Boolean` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `Object` | Yes |  |
| `send_disposition` | `String` | No |  |
| `send_error` | `Object` | No |  |
| `send_style` | `Object` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MessagingConversationMessage.create({
  "messaging_conversation_id" => "example_messaging_conversation_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "client_operation_id" => "example_client_operation_id", # String
  "content" => "example_content", # String
  "media" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessagingConversationMessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessagingConversationUploadEntity

```ruby
messaging_conversation_upload = client.MessagingConversationUpload
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `Hash` | Yes |  |
| `upload_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MessagingConversationUpload.create({
  "messaging_conversation_id" => "example_messaging_conversation_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessagingConversationUploadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetricQueryEntity

```ruby
metric_query = client.MetricQuery
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MetricQuery.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetricQueryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NetworkConnectionEntity

```ruby
network_connection = client.NetworkConnection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_client_vpn_profile` | `String` | No |  |
| `created_at` | `String` | Yes |  |
| `device_tag` | `String` | No |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `oauth_client_id` | `String` | No |  |
| `oauth_client_secret` | `String` | No |  |
| `provider` | `String` | No |  |
| `status` | `String` | No |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.NetworkConnection.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.NetworkConnection.patch({
  "id" => "id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.NetworkConnection.update({
  "id" => "id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NetworkConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NomadAllocationEntity

```ruby
nomad_allocation = client.NomadAllocation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `String` | Yes |  |
| `client_status` | `Object` | Yes |  |
| `create_time` | `Object` | Yes |  |
| `datacenter` | `Object` | Yes |  |
| `desired_description` | `Object` | Yes |  |
| `desired_status` | `Object` | Yes |  |
| `fetched_at` | `String` | Yes |  |
| `id` | `String` | No |  |
| `job_id` | `Object` | Yes |  |
| `modify_time` | `Object` | Yes |  |
| `name` | `Object` | Yes |  |
| `namespace` | `String` | Yes |  |
| `node_id` | `Object` | Yes |  |
| `node_name` | `Object` | Yes |  |
| `resources` | `Hash` | Yes |  |
| `task_group` | `Object` | Yes |  |
| `task_states` | `Array` | Yes |  |
| `verify_runner_images` | `Array` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.NomadAllocation.load({ "id" => "nomad_allocation_id", "app_id" => "app_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NomadAllocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NomadLogEntity

```ruby
nomad_log = client.NomadLog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `String` | Yes |  |
| `environment` | `String` | No |  |
| `fetched_at` | `String` | Yes |  |
| `location` | `Object` | No |  |
| `logs` | `String` | Yes |  |
| `namespace` | `String` | Yes |  |
| `offset` | `Integer` | Yes |  |
| `origin` | `String` | Yes |  |
| `service` | `String` | No |  |
| `task` | `String` | Yes |  |
| `type` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.NomadLog.list({ "app_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NomadLogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationEntity

```ruby
organization = client.Organization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `Array` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `Boolean` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `Boolean` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `github_prs_authored_by_change_author` | `Boolean` | Yes |  |
| `google_workspace_domain` | `Object` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `String` | Yes |  |
| `logo_url` | `Object` | Yes |  |
| `member_count` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `pending_invitation_count` | `Integer` | Yes |  |
| `personal` | `Boolean` | Yes |  |
| `repository_count` | `Integer` | Yes |  |
| `role` | `Object` | Yes |  |
| `sandbox_region` | `String` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `Boolean` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `String` | Yes |  |
| `source_control_providers` | `Array` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `Boolean` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `String` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |
| `verify_pr_scenario_writing_enabled` | `Boolean` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Organization.create({
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Organization.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Organization.load({ "id" => "organization_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Organization.patch({
  "id" => "organization_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Organization.update({
  "id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PageEntity

```ruby
page = client.Page
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `Array` | Yes |  |
| `checkout_required` | `Boolean` | Yes |  |
| `cli_signed_in_at` | `Object` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `Hash` | Yes |  |
| `demo_project` | `Object` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `Array` | Yes |  |
| `included_deep_scan` | `Boolean` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `Object` | No |  |
| `organization` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `project` | `Object` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `Array` | No |  |
| `pull_requests` | `Array` | No |  |
| `repositories` | `Array` | Yes |  |
| `runs` | `Array` | Yes |  |
| `runs_pagination` | `Hash` | Yes |  |
| `suggested_app_url` | `Object` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `Boolean` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Page.load({ "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PageAgentEntity

```ruby
page_agent = client.PageAgent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `Array` | Yes |  |
| `can_edit_integration_connections` | `Boolean` | Yes |  |
| `creation_enabled` | `Boolean` | Yes |  |
| `inbox` | `Object` | No |  |
| `integration_choices` | `Array` | Yes |  |
| `integration_choices_truncated` | `Boolean` | Yes |  |
| `integration_selected` | `Array` | Yes |  |
| `model_choices` | `Array` | No |  |
| `new_configuration` | `Object` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `pinned_agent` | `Object` | Yes |  |
| `platform_event_types` | `Array` | Yes |  |
| `repository_choices` | `Array` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `Boolean` | Yes |  |
| `runtime_versions` | `Array` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `Object` | Yes |  |
| `selected_reference` | `Object` | Yes |  |
| `viewer_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PageAgent.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PageAgentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PageProjectRunEntity

```ruby
page_project_run = client.PageProjectRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `Array` | Yes |  |
| `fix_scenario_count` | `Integer` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `Array` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `Integer` | Yes |  |
| `id` | `String` | No |  |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `preparation_reason` | `Object` | Yes |  |
| `project` | `Hash` | Yes |  |
| `run` | `Hash` | Yes |  |
| `scenario_runs` | `Array` | Yes |  |
| `selected_scenario_run` | `Object` | Yes |  |
| `web_path` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PageProjectRun.load({ "id" => "page_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PageProjectRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PagesProjectCredentialEntity

```ruby
pages_project_credential = client.PagesProjectCredential
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `Object` | No |  |
| `composal_address` | `Object` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `Boolean` | Yes |  |
| `credential_keys` | `Hash` | Yes |  |
| `description` | `Object` | Yes |  |
| `email_link_auth_origins` | `Array` | Yes |  |
| `has_inbox` | `Boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `String` | Yes |  |
| `identity_provider` | `Object` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `Object` | Yes |  |
| `login_method` | `String` | Yes |  |
| `login_url` | `String` | Yes |  |
| `managed` | `Boolean` | Yes |  |
| `mfa_enabled` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `project_id` | `String` | Yes |  |
| `provider_guidance` | `String` | Yes |  |
| `sign_in_verified` | `Boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `Object` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `username` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PagesProjectCredential.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PagesProjectCredentialEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PagesProjectPersonaEntity

```ruby
pages_project_persona = client.PagesProjectPersona
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `Integer` | Yes |  |
| `credentials` | `Array` | Yes |  |
| `needs_attention_count` | `Integer` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `persona_states` | `Hash` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `Array` | Yes |  |
| `project` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PagesProjectPersona.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PagesProjectPersonaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PagesProjectRunEntity

```ruby
pages_project_run = client.PagesProjectRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `String` | Yes |  |
| `environments` | `Array` | Yes |  |
| `environments_has_more` | `Boolean` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `runs` | `Array` | Yes |  |
| `selected_environment` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PagesProjectRun.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PagesProjectRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PagesProjectScenarioEntity

```ruby
pages_project_scenario = client.PagesProjectScenario
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `Object` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PagesProjectScenario.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PagesProjectScenarioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PersonalAccessTokenEntity

```ruby
personal_access_token = client.PersonalAccessToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PersonalAccessToken.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PersonalAccessToken.list
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.PersonalAccessToken.remove({ "id" => "personal_access_token_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PersonalAccessTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PreviewOperationEntity

```ruby
preview_operation = client.PreviewOperation
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PreviewOperation.list({ "app_id" => "example", "preview_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PreviewOperationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PreviewProfileSecretBindingEntity

```ruby
preview_profile_secret_binding = client.PreviewProfileSecretBinding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `String` | Yes |  |
| `id` | `String` | No |  |
| `mode` | `String` | No |  |
| `secret_id` | `String` | No |  |
| `secret_version_id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PreviewProfileSecretBinding.create({
  "app_id" => "example_app_id", # String
  "preview_profile_id" => "example_preview_profile_id", # String
  "env_key" => "example_env_key", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PreviewProfileSecretBinding.list({ "app_id" => "example", "preview_profile_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.PreviewProfileSecretBinding.remove({ "id" => "preview_profile_secret_binding_id", "app_id" => "app_id", "preview_profile_id" => "preview_profile_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PreviewProfileSecretBindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PreviewSecretEntity

```ruby
preview_secret = client.PreviewSecret
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `String` | Yes |  |
| `id` | `String` | No |  |
| `name` | `String` | Yes |  |
| `slug` | `String` | Yes |  |
| `value` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PreviewSecret.create({
  "app_id" => "example_app_id", # String
  "preview_id" => "example_preview_id", # String
  "env_key" => "example_env_key", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "value" => "example_value", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.PreviewSecret.remove({ "id" => "preview_secret_id", "app_id" => "app_id", "preview_id" => "preview_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PreviewSecretEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PreviewSharingApprovalEntity

```ruby
preview_sharing_approval = client.PreviewSharingApproval
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `Array` | Yes |  |
| `approved_build_secrets` | `Array` | Yes |  |
| `approved_default_configuration` | `Array` | Yes |  |
| `approved_default_secrets` | `Array` | Yes |  |
| `approved_source_keys` | `Array` | Yes |  |
| `build_keys` | `Array` | No |  |
| `build_secrets` | `Array` | No |  |
| `default_configuration` | `Array` | No |  |
| `default_secrets` | `Array` | No |  |
| `services` | `Array` | Yes |  |
| `snapshot_version` | `Integer` | Yes |  |
| `source_keys` | `Array` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PreviewSharingApproval.create({
  "app_id" => "example_app_id", # String
  "preview_id" => "example_preview_id", # String
  "snapshot_version" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PreviewSharingApproval.list({ "app_id" => "example", "preview_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PreviewSharingApprovalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapIdentityDecisionEntity

```ruby
product_map_identity_decision = client.ProductMapIdentityDecision
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `Array` | Yes |  |
| `operation` | `String` | Yes |  |
| `reason` | `String` | Yes |  |
| `target` | `Hash` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProductMapIdentityDecision.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "observations" => [], # Array
  "operation" => "example_operation", # String
  "reason" => "example_reason", # String
  "target" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapIdentityDecisionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapJourneyEntity

```ruby
product_map_journey = client.ProductMapJourney
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `Object` | No |  |
| `goal` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `journey` | `Hash` | Yes |  |
| `next_cursor` | `Object` | Yes |  |
| `preview` | `Object` | No |  |
| `scope` | `Hash` | Yes |  |
| `title` | `String` | Yes |  |
| `tree` | `Hash` | Yes |  |
| `tree_loaded` | `Boolean` | No |  |
| `variant_count` | `Integer` | Yes |  |
| `variants` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProductMapJourney.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProductMapJourney.load({ "id" => "product_map_journey_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapJourneyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapJourneyReplayEntity

```ruby
product_map_journey_replay = client.ProductMapJourneyReplay
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `Object` | Yes |  |
| `can_request_qualification` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `failure_code` | `Object` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `preparation_receipt` | `Object` | Yes |  |
| `qualification` | `Object` | Yes |  |
| `qualification_status` | `String` | Yes |  |
| `replay_required` | `Boolean` | Yes |  |
| `review_reason` | `String` | Yes |  |
| `run_id` | `Object` | Yes |  |
| `scenario_run_id` | `Object` | Yes |  |
| `source_digest` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `variant_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProductMapJourneyReplay.load({ "id" => "product_map_journey_replay_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapJourneyReplayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapObservationEntity

```ruby
product_map_observation = client.ProductMapObservation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `Hash` | Yes |  |
| `events` | `Array` | Yes |  |
| `evidence_id` | `String` | Yes |  |
| `id` | `String` | No |  |
| `observation_id` | `String` | Yes |  |
| `scope` | `Hash` | Yes |  |
| `state` | `Object` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProductMapObservation.load({ "id" => "product_map_observation_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapObservationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapQuestionEntity

```ruby
product_map_question = client.ProductMapQuestion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `String` | No |  |
| `area` | `String` | No |  |
| `before` | `String` | No |  |
| `claims` | `Array` | Yes |  |
| `evidence_truncated` | `Boolean` | Yes |  |
| `model` | `String` | Yes |  |
| `persona_id` | `String` | No |  |
| `query` | `String` | No |  |
| `question` | `String` | Yes |  |
| `reasoning_effort` | `String` | Yes |  |
| `revision_id` | `String` | No |  |
| `scope` | `Hash` | Yes |  |
| `since` | `String` | No |  |
| `state_id` | `String` | No |  |
| `status` | `String` | Yes |  |
| `unknowns` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProductMapQuestion.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "question" => "example_question", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapQuestionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductMapStateEntity

```ruby
product_map_state = client.ProductMapState
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `Object` | Yes |  |
| `attempts` | `Array` | Yes |  |
| `captured_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `incoming` | `Array` | Yes |  |
| `labels` | `Hash` | Yes |  |
| `layout` | `Hash` | Yes |  |
| `observation_id` | `String` | Yes |  |
| `omitted_controls` | `Integer` | Yes |  |
| `outgoing` | `Array` | Yes |  |
| `revision_id` | `String` | Yes |  |
| `scope` | `Hash` | Yes |  |
| `screenshot_url` | `Object` | Yes |  |
| `state` | `Hash` | Yes |  |
| `truncated` | `Boolean` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProductMapState.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProductMapState.load({ "id" => "product_map_state_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductMapStateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectEntity

```ruby
project = client.Project
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `Object` | Yes |  |
| `context` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `credentials` | `Array` | Yes |  |
| `demo` | `Boolean` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `Array` | Yes |  |
| `environments` | `Array` | Yes |  |
| `execution_mode` | `String` | Yes |  |
| `icon_url` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `identity_provider` | `Hash` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `network_connections` | `Array` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `overview` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `personas` | `Array` | Yes |  |
| `project` | `Hash` | Yes |  |
| `pull_request_options` | `Hash` | Yes |  |
| `pull_requests` | `Array` | Yes |  |
| `purpose` | `Object` | Yes |  |
| `runs` | `Array` | Yes |  |
| `scenario_history` | `Hash` | Yes |  |
| `scenario_states` | `Hash` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `Array` | Yes |  |
| `setup_required` | `Boolean` | No |  |
| `slug` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verifier_preferences` | `Hash` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `Integer` | Yes |  |
| `website_url` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Project.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Project.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Project.load({ "id" => "project_id", "organization_id" => "organization_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.Project.patch({
  "id" => "project_id",
  "organization_id" => "organization_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Project.update({
  "id" => "project_id",
  "organization_id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectAndroidApkEntity

```ruby
project_android_apk = client.ProjectAndroidApk
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `Hash` | Yes |  |
| `artifact_paths` | `Array` | No |  |
| `description` | `String` | Yes |  |
| `image` | `String` | Yes |  |
| `ios` | `Hash` | Yes |  |
| `launch_command` | `String` | No |  |
| `managed_binary` | `Hash` | Yes |  |
| `platform` | `String` | No |  |
| `provider` | `String` | No |  |
| `setup_command` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectAndroidApk.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectAndroidApkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectCodeMapEntity

```ruby
project_code_map = client.ProjectCodeMap
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `Boolean` | Yes |  |
| `commit_sha` | `String` | Yes |  |
| `configured` | `Boolean` | Yes |  |
| `error_code` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `ref` | `String` | No |  |
| `repository_id` | `String` | Yes |  |
| `revision` | `Hash` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectCodeMap.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "repository_id" => "example_repository_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectCodeMap.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectCodeMapEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectEnvironmentEntity

```ruby
project_environment = client.ProjectEnvironment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `String` | Yes |  |
| `allowed_origins` | `Array` | Yes |  |
| `archived_at` | `Object` | Yes |  |
| `base_url` | `Object` | Yes |  |
| `base_url_changeable` | `Boolean` | Yes | Whether an update may send a new base_url. |
| `binary` | `String` | No |  |
| `conversation_only_messaging` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `desktop` | `Object` | Yes |  |
| `execution_mode` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `imessage_number` | `Object` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `String` | Yes |  |
| `lock_version` | `Integer` | Yes |  |
| `messaging_conversation` | `Object` | Yes |  |
| `messaging_problem` | `Object` | Yes |  |
| `messaging_source` | `Object` | Yes |  |
| `messaging_tester_number` | `Object` | Yes | One configured tester number. |
| `name` | `String` | Yes |  |
| `project_id` | `String` | Yes |  |
| `pull_request` | `Object` | Yes |  |
| `source_branch` | `Object` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verify_network_connection_id` | `Object` | Yes |  |
| `version` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectEnvironment.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectEnvironment.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectEnvironment.load({ "id" => "project_environment_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ProjectEnvironment.patch({
  "id" => "project_environment_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ProjectEnvironment.update({
  "id" => "project_environment_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectEnvironmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectFindingEntity

```ruby
project_finding = client.ProjectFinding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `Object` | No |  |
| `environment_name` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `last_seen_at` | `String` | Yes |  |
| `locked` | `Boolean` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `String` | Yes |  |
| `source` | `String` | Yes | The workflow that produced the finding |
| `source_title` | `String` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `verification` | `Object` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `String` | Yes | Where the finding is reviewed within its source |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectFinding.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectFindingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectFixtureEntity

```ruby
project_fixture = client.ProjectFixture
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `Array` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `Integer` | Yes |  |
| `content_type` | `String` | Yes |  |
| `credential_ids` | `Array` | Yes |  |
| `credentials` | `Array` | Yes |  |
| `environment_ids` | `Array` | Yes |  |
| `environments` | `Array` | Yes |  |
| `fixtures` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `persona_ids` | `Array` | Yes |  |
| `personas` | `Array` | Yes |  |
| `project` | `Hash` | Yes |  |
| `sha256` | `String` | Yes |  |
| `url` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectFixture.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectFixture.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectFixture.load({ "id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ProjectFixture.patch({
  "id" => "project_fixture_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ProjectFixture.remove({ "id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id", "version" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ProjectFixture.update({
  "id" => "project_fixture_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectFixtureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectIosAppEntity

```ruby
project_ios_app = client.ProjectIosApp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `Hash` | Yes |  |
| `artifact_paths` | `Array` | No |  |
| `description` | `String` | Yes |  |
| `image` | `String` | Yes |  |
| `ios` | `Hash` | Yes |  |
| `launch_command` | `String` | No |  |
| `managed_binary` | `Hash` | Yes |  |
| `platform` | `String` | No |  |
| `provider` | `String` | No |  |
| `setup_command` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectIosApp.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectIosAppEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectMessagingConversationEntity

```ruby
project_messaging_conversation = client.ProjectMessagingConversation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `String` | Yes |  |
| `attachment_limit` | `Integer` | Yes |  |
| `attachment_max_bytes` | `Integer` | Yes |  |
| `environment_name` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `leased` | `Boolean` | Yes |  |
| `messages` | `Array` | Yes |  |
| `reconciled_at` | `Object` | Yes |  |
| `retirable` | `Boolean` | Yes |  |
| `seeded` | `Boolean` | Yes |  |
| `send_blocked_reason` | `Object` | Yes |  |
| `send_disposition` | `String` | No |  |
| `send_error` | `Object` | No |  |
| `tester_number` | `String` | Yes |  |
| `unknown_send` | `Boolean` | Yes |  |
| `verify_environment_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectMessagingConversation.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "assistant_number" => "example_assistant_number", # String
  "tester_number" => "example_tester_number", # String
  "verify_environment_id" => "example_verify_environment_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectMessagingConversation.load({ "id" => "project_messaging_conversation_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ProjectMessagingConversation.patch({
  "id" => "project_messaging_conversation_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ProjectMessagingConversation.update({
  "id" => "project_messaging_conversation_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectMessagingConversationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectOverviewMetricEntity

```ruby
project_overview_metric = client.ProjectOverviewMetric
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectOverviewMetric.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectOverviewMetricEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectOverviewPullRequestEntity

```ruby
project_overview_pull_request = client.ProjectOverviewPullRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `String` | Yes |  |
| `can_verify` | `Boolean` | Yes |  |
| `comment_url` | `Object` | Yes |  |
| `draft` | `Boolean` | Yes |  |
| `github_repository` | `Object` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` | Yes |  |
| `head_sha` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `latest_created_at` | `Object` | Yes |  |
| `latest_current` | `Boolean` | Yes |  |
| `latest_head_sha` | `Object` | Yes |  |
| `latest_reason` | `Object` | Yes |  |
| `latest_run_id` | `Object` | Yes |  |
| `latest_state` | `Object` | Yes |  |
| `number` | `Integer` | Yes |  |
| `project_id` | `Object` | Yes |  |
| `project_slug` | `Object` | Yes |  |
| `provider` | `String` | Yes |  |
| `repository_id` | `String` | Yes |  |
| `request_label` | `String` | Yes |  |
| `source_branch` | `Object` | Yes |  |
| `source_repository` | `Object` | Yes |  |
| `source_url` | `Object` | Yes |  |
| `state` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `web_path` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectOverviewPullRequest.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectOverviewPullRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectProductMapEntity

```ruby
project_product_map = client.ProjectProductMap
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectProductMapEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectRecordingEntity

```ruby
project_recording = client.ProjectRecording
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `draft` | `Object` | Yes | Present once drafted. |
| `environment_id` | `String` | Yes | The project environment the browser opens. |
| `error` | `Object` | Yes |  |
| `event_count` | `Integer` | Yes |  |
| `id` | `String` | Yes |  |
| `persona_id` | `String` | Yes | The project persona the journey acts as. |
| `phase` | `String` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `Boolean` | Yes |  |
| `start_path` | `String` | No | A path on the environment to start at, such as /settings. |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectRecording.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "environment_id" => "example_environment_id", # String
  "persona_id" => "example_persona_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectRecording.load({ "id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ProjectRecording.remove({ "id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectRecordingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectRunPlanEntity

```ruby
project_run_plan = client.ProjectRunPlan
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `Object` | Yes |  |
| `base_url` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dependencies` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `identity_probe` | `Object` | Yes |  |
| `kind` | `Object` | Yes |  |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `nodes` | `Array` | Yes |  |
| `preview` | `Object` | Yes |  |
| `project_id` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectRunPlan.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "dependencies" => [], # Array
  "identity_probe" => {}, # Object
  "name" => "example_name", # String
  "nodes" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectRunPlan.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectRunPlan.load({ "id" => "project_run_plan_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ProjectRunPlan.patch({
  "id" => "project_run_plan_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ProjectRunPlan.update({
  "id" => "project_run_plan_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectRunPlanEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectRunScheduleEntity

```ruby
project_run_schedule = client.ProjectRunSchedule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `Hash` | Yes |  |
| `cron_expression` | `Object` | No |  |
| `environment_id` | `String` | Yes | Project environment slug or public ID. |
| `environment_name` | `String` | No |  |
| `history` | `Array` | Yes |  |
| `id` | `String` | Yes |  |
| `labels` | `Array` | Yes |  |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `next_run_at` | `String` | Yes |  |
| `notification_channel` | `String` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `Integer` | Yes |  |
| `selection_mode` | `String` | Yes |  |
| `slack_subscription_id` | `Object` | No |  |
| `source_scenario_id` | `Object` | No |  |
| `state` | `String` | Yes |  |
| `time_of_day` | `String` | Yes |  |
| `time_zone` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ProjectRunSchedule.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "credential_ids" => {}, # Hash
  "environment_id" => "example_environment_id", # String
  "labels" => [], # Array
  "name" => "example_name", # String
  "selection_mode" => "example_selection_mode", # String
  "state" => "example_state", # String
  "time_of_day" => "example_time_of_day", # String
  "time_zone" => "example_time_zone", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectRunSchedule.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProjectRunSchedule.load({ "id" => "project_run_schedule_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ProjectRunSchedule.patch({
  "id" => "project_run_schedule_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ProjectRunSchedule.update({
  "id" => "project_run_schedule_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectRunScheduleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectScenarioOptionEntity

```ruby
project_scenario_option = client.ProjectScenarioOption
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `Array` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `personas` | `Array` | Yes |  |
| `project` | `Hash` | Yes |  |
| `scenario_states` | `Hash` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `Array` | Yes |  |
| `schedule_options` | `Object` | No |  |
| `schedules` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectScenarioOption.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectScenarioOptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectScenarioRowEntity

```ruby
project_scenario_row = client.ProjectScenarioRow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `Integer` | Yes |  |
| `dependency_count` | `Integer` | Yes |  |
| `health` | `Hash` | Yes |  |
| `id` | `String` | Yes |  |
| `labels` | `Array` | Yes |  |
| `name` | `String` | Yes |  |
| `persona_id` | `String` | Yes |  |
| `selectable_for_run` | `Boolean` | Yes |  |
| `step_count` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectScenarioRow.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectScenarioRowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectSettingEntity

```ruby
project_setting = client.ProjectSetting
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `Array` | Yes |  |
| `messaging_conversations` | `Array` | Yes |  |
| `messaging_enabled` | `Boolean` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `project` | `Hash` | Yes |  |
| `tester_numbers` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ProjectSetting.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectSettingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PullRequestEntity

```ruby
pull_request = client.PullRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `Array` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `String` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `Boolean` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `Object` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `Array` | Yes |  |
| `head_sha` | `String` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `String` | No |  |
| `idempotency_key` | `String` | Yes |  |
| `imessage_number` | `String` | No | International destination of this exact deployed commit. |
| `number` | `Integer` | No |  |
| `pagination` | `Hash` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `preview_cleanup_ready` | `Boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `Object` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Object` | No |  |
| `project_id` | `String` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `Hash` | Yes |  |
| `repository_id` | `String` | No |  |
| `runs` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PullRequest.create({
  "organization_id" => "example_organization_id", # String
  "idempotency_key" => "example_idempotency_key", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PullRequest.load({ "id" => "pull_request_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PullRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PullRequestSettingEntity

```ruby
pull_request_setting = client.PullRequestSetting
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `Object` | No |  |
| `app_service_id` | `Object` | No |  |
| `bots` | `Array` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `Boolean` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `Object` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `Integer` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `Object` | Yes |  |
| `demo_videos` | `Boolean` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `Boolean` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `Object` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `String` | No |  |
| `enabled` | `Boolean` | Yes | Test PRs automatically. |
| `environment` | `String` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `Array` | Yes |  |
| `github_check_enabled` | `Boolean` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `Array` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `String` | Yes |  |
| `imessage_comment_prefix` | `Object` | Yes |  |
| `imessage_number` | `Object` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `String` | Yes |  |
| `limits` | `Hash` | Yes |  |
| `link_pattern` | `Object` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `Object` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `Integer` | No |  |
| `messaging_enabled` | `Boolean` | Yes |  |
| `messaging_tester_number` | `Object` | Yes | One configured tester number. |
| `non_product_paths` | `Array` | No |  |
| `permissions` | `Hash` | Yes |  |
| `pr_check` | `Boolean` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `String` | No |  |
| `preview_comment_authors` | `Array` | No |  |
| `preview_comment_pattern` | `String` | No |  |
| `preview_comment_wildcard` | `Object` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `Object` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `Array` | Yes |  |
| `previews` | `String` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `String` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `Array` | Yes |  |
| `provider` | `String` | Yes |  |
| `repositories` | `Array` | Yes |  |
| `repository` | `String` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `String` | Yes |  |
| `repository_kind` | `String` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `Object` | Yes |  |
| `service` | `Object` | Yes | composal: the public service the browsers open. |
| `settings` | `Array` | Yes |  |
| `setup` | `Object` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `Hash` | Yes | The answers a new setup starts from |
| `source_repository` | `String` | Yes |  |
| `target_mode` | `String` | Yes |  |
| `tester_numbers` | `Array` | Yes |  |
| `trigger_label` | `String` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `Boolean` | No |  |
| `trigger_on_label` | `Boolean` | No |  |
| `trigger_on_push` | `Boolean` | No |  |
| `trigger_on_ready` | `Boolean` | No |  |
| `triggers` | `Hash` | Yes | When runs start. |
| `verify_environment_id` | `String` | Yes |  |
| `write_scenarios` | `Boolean` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PullRequestSetting.create({
  "organization_id" => "example_organization_id", # String
  "bots" => [], # Array
  "demo_videos" => true, # Boolean
  "deployment" => "example_deployment", # Object
  "enabled" => true, # Boolean
  "environment" => "example_environment", # String
  "imessage_comment_prefix" => "example_imessage_comment_prefix", # Object
  "imessage_number" => "example_imessage_number", # Object
  "imessage_number_source" => "example_imessage_number_source", # String
  "limits" => {}, # Hash
  "link_pattern" => "example_link_pattern", # Object
  "links" => "example_links", # Object
  "messaging_tester_number" => "example_messaging_tester_number", # Object
  "pr_check" => true, # Boolean
  "preview_comment_wildcard" => "example_preview_comment_wildcard", # Object
  "preview_profile" => "example_preview_profile", # Object
  "previews" => "example_previews", # String
  "project_id" => "example_project_id", # String
  "provider" => "example_provider", # String
  "repository" => "example_repository", # String
  "repository_id" => "example_repository_id", # String
  "repository_kind" => "example_repository_kind", # String
  "service" => "example_service", # Object
  "target_mode" => "example_target_mode", # String
  "trigger_label" => "example_trigger_label", # String
  "triggers" => {}, # Hash
  "verify_environment_id" => "example_verify_environment_id", # String
  "write_scenarios" => true, # Boolean
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PullRequestSetting.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PullRequestSettingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PullRequestSettingAddRepositoryEntity

```ruby
pull_request_setting_add_repository = client.PullRequestSettingAddRepository
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `String` | Yes |  |
| `replace` | `Boolean` | No | Make these the project's only repositories. |
| `repositories` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PullRequestSettingAddRepository.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "repositories" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PullRequestSettingDetectCommentEntity

```ruby
pull_request_setting_detect_comment = client.PullRequestSettingDetectComment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `Array` | No | The bots answer |
| `deployment` | `String` | No | The deployment answer |
| `example_url` | `String` | No |  |
| `imessage_comment_prefix` | `String` | No |  |
| `imessage_number` | `Object` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `String` | Yes |  |
| `link_pattern` | `String` | No | The link_pattern answer |
| `project_id` | `String` | Yes | Project slug or ID. |
| `provider` | `String` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `String` | No | Repository slug, ID or owner/name. |
| `request_number` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PullRequestSettingDetectComment.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecorderEntity

```ruby
recorder = client.Recorder
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `slug` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Recorder.load({ "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecorderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistryEntity

```ruby
registry = client.Registry
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistryV2Entity

```ruby
registry_v2 = client.RegistryV2
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistryV2Entity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RelayAgentLocalThreadEntity

```ruby
relay_agent_local_thread = client.RelayAgentLocalThread
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.RelayAgentLocalThread.remove({ "id" => "relay_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RelayAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportReplayEntity

```ruby
report_replay = client.ReportReplay
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `String` | Yes |  |
| `generated_at` | `String` | Yes |  |
| `id` | `String` | No |  |
| `recording` | `Hash` | Yes |  |
| `replay_steps` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ReportReplay.load({ "id" => "report_replay_id", "exploration_id" => "exploration_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportReplayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportScenarioEntity

```ruby
report_scenario = client.ReportScenario
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `String` | Yes |  |
| `goal` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `mode` | `String` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `project_id` | `Object` | Yes |  |
| `related_explorations` | `Array` | Yes |  |
| `report` | `Hash` | Yes |  |
| `saves_scenarios` | `Boolean` | Yes |  |
| `scenario_generation` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ReportScenario.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportScenarioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RunScenarioRunEntity

```ruby
run_scenario_run = client.RunScenarioRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RunScenarioRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RunScheduleOptionEntity

```ruby
run_schedule_option = client.RunScheduleOption
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.RunScheduleOption.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RunScheduleOptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RunSearchEntity

```ruby
run_search = client.RunSearch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.RunSearch.load({ "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RunSearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RunUpdateEntity

```ruby
run_update = client.RunUpdate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `String` | Yes |  |
| `can_verify` | `Boolean` | Yes |  |
| `comment_url` | `Object` | Yes |  |
| `draft` | `Boolean` | Yes |  |
| `github_repository` | `Object` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` | Yes |  |
| `head_sha` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `latest_created_at` | `Object` | Yes |  |
| `latest_current` | `Boolean` | Yes |  |
| `latest_head_sha` | `Object` | Yes |  |
| `latest_reason` | `Object` | Yes |  |
| `latest_run_id` | `Object` | Yes |  |
| `latest_state` | `Object` | Yes |  |
| `number` | `Integer` | Yes |  |
| `project_id` | `Object` | Yes |  |
| `project_slug` | `Object` | Yes |  |
| `provider` | `String` | Yes |  |
| `repository_id` | `String` | Yes |  |
| `request_label` | `String` | Yes |  |
| `source_branch` | `Object` | Yes |  |
| `source_repository` | `Object` | Yes |  |
| `source_url` | `Object` | Yes |  |
| `state` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `web_path` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.RunUpdate.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RunUpdateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScenarioRevisionEntity

```ruby
scenario_revision = client.ScenarioRevision
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `batch` | `String` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `String` | Yes |  |
| `definition` | `Hash` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `String` | Yes |  |
| `source` | `String` | Yes | The client the save came through. |
| `user` | `Object` | Yes | Null when a system job saved the Scenario. |
| `version` | `Integer` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ScenarioRevision.list({ "organization_id" => "example", "project_id" => "example", "scenario_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScenarioRevisionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScenarioRunLessonEntity

```ruby
scenario_run_lesson = client.ScenarioRunLesson
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `String` | Yes |  |
| `title` | `String` | No | Defaults to the Scenario's name. |
| `workaround` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ScenarioRunLesson.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "run_id" => "example_run_id", # String
  "scenario_run_id" => "example_scenario_run_id", # String
  "finding" => "example_finding", # String
  "workaround" => "example_workaround", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScenarioRunLessonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScenarioRunScenarioEditEntity

```ruby
scenario_run_scenario_edit = client.ScenarioRunScenarioEdit
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScenarioRunScenarioEditEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ServiceEndpointEntity

```ruby
service_endpoint = client.ServiceEndpoint
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ServiceEndpoint.create({
  "app_id" => "example_app_id", # String
  "service_id" => "example_service_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ServiceEndpoint.list({ "app_id" => "example", "service_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ServiceEndpoint.load({ "id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.ServiceEndpoint.patch({
  "id" => "service_endpoint_id",
  "app_id" => "app_id",
  "service_id" => "service_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ServiceEndpoint.remove({ "id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ServiceEndpoint.update({
  "id" => "service_endpoint_id",
  "app_id" => "app_id",
  "service_id" => "service_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ServiceEndpointEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SitePreviewEntity

```ruby
site_preview = client.SitePreview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `Object` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `Object` | Yes |  |
| `url` | `String` | Yes | The address as it will be saved |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SitePreview.load({ "organization_id" => "organization_id", "url" => "url" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SitePreviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SlackChannelEntity

```ruby
slack_channel = client.SlackChannel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `is_member` | `Boolean` | Yes |  |
| `is_private` | `Boolean` | Yes |  |
| `is_slack_connect` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `published` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.SlackChannel.list({ "agent_id" => "example", "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SlackChannelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SparkAgentLocalThreadEntity

```ruby
spark_agent_local_thread = client.SparkAgentLocalThread
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `archived` | `Boolean` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `Boolean` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `Boolean` | No |  |
| `can_end` | `Boolean` | Yes |  |
| `can_interrupt` | `Boolean` | Yes |  |
| `can_send` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `delivery` | `Hash` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `String` | Yes |  |
| `device_name` | `String` | Yes |  |
| `diagnostic_code` | `String` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `Object` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `full_title` | `String` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `String` | Yes |  |
| `key` | `String` | Yes |  |
| `last_activity_at` | `Object` | Yes |  |
| `native_thread_id` | `String` | Yes |  |
| `parent_conversation_id` | `Object` | Yes |  |
| `provider` | `String` | Yes |  |
| `references` | `Hash` | Yes |  |
| `relay_disconnected_at` | `Object` | No |  |
| `relay_participant` | `Hash` | Yes |  |
| `result` | `Object` | Yes |  |
| `result_expired` | `Boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `Object` | No |  |
| `section` | `String` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `String` | Yes |  |
| `status` | `Object` | Yes | What the native thread is doing. |
| `task_configured` | `Boolean` | Yes |  |
| `thread_id` | `String` | Yes |  |
| `title` | `String` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.SparkAgentLocalThread.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "device_id" => "example_device_id", # String
  "key" => "example_key", # String
  "provider" => "example_provider", # String
  "thread_id" => "example_thread_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SparkAgentLocalThread.load({ "id" => "spark_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SparkAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StaticSiteEntity

```ruby
static_site = client.StaticSite
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `Object` | Yes |  |
| `cdn_hostname` | `String` | Yes |  |
| `cdn_url` | `String` | Yes |  |
| `cname_target` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `default_url` | `String` | Yes |  |
| `description` | `Object` | Yes |  |
| `error_document` | `Object` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `hosted_app_id` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `index_document` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `provisioned` | `Boolean` | Yes |  |
| `provisioned_at` | `Object` | Yes |  |
| `region` | `Object` | Yes |  |
| `replication_regions` | `Array` | Yes |  |
| `repository_id` | `Object` | Yes |  |
| `slug` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.StaticSite.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.StaticSite.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.StaticSite.load({ "id" => "static_site_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.StaticSite.patch({
  "id" => "static_site_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.StaticSite.remove({ "id" => "static_site_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.StaticSite.update({
  "id" => "static_site_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StaticSiteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StaticSiteDeploymentEntity

```ruby
static_site_deployment = client.StaticSiteDeployment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `Object` | Yes |  |
| `activated_at_label` | `Object` | Yes |  |
| `commit_sha` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `created_at_label` | `Object` | Yes |  |
| `creator_user_id` | `Object` | Yes |  |
| `deploy_slug` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `file_count` | `Integer` | Yes |  |
| `file_count_label` | `String` | Yes |  |
| `finished_at` | `Object` | Yes |  |
| `finished_at_label` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `is_active` | `Boolean` | Yes |  |
| `source_ref` | `Object` | Yes |  |
| `started_at` | `Object` | Yes |  |
| `started_at_label` | `Object` | Yes |  |
| `static_site_id` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `total_bytes` | `Integer` | Yes |  |
| `total_bytes_label` | `String` | Yes |  |
| `trigger_kind` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `updated_at_label` | `Object` | Yes |  |
| `uploaded_at` | `Object` | Yes |  |
| `uploaded_at_label` | `Object` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.StaticSiteDeployment.create({
  "static_site_id" => "example_static_site_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.StaticSiteDeployment.list({ "static_site_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.StaticSiteDeployment.load({ "id" => "static_site_deployment_id", "static_site_id" => "static_site_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StaticSiteDeploymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StaticSiteDomainEntity

```ruby
static_site_domain = client.StaticSiteDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dns_mode` | `String` | Yes |  |
| `dns_status` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `hosted_app_id` | `Object` | Yes |  |
| `hostname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `last_checked_at` | `Object` | Yes |  |
| `record_name` | `Object` | Yes |  |
| `record_type` | `Object` | Yes |  |
| `record_value` | `Object` | Yes |  |
| `redirect_to` | `Object` | Yes |  |
| `static_site_id` | `Object` | Yes |  |
| `target_kind` | `String` | Yes |  |
| `tls_status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verification_status` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.StaticSiteDomain.create({
  "static_site_id" => "example_static_site_id", # String
  "hostname" => "example_hostname", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.StaticSiteDomain.list({ "static_site_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.StaticSiteDomain.load({ "id" => "static_site_domain_id", "static_site_id" => "static_site_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.StaticSiteDomain.patch({
  "id" => "static_site_domain_id",
  "static_site_id" => "static_site_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.StaticSiteDomain.remove({ "id" => "static_site_domain_id", "static_site_id" => "static_site_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.StaticSiteDomain.update({
  "id" => "static_site_domain_id",
  "static_site_id" => "static_site_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StaticSiteDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubscriptionModelEntity

```ruby
subscription_model = client.SubscriptionModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `String` | No |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `provider` | `String` | Yes |  |
| `reasoning` | `Array` | No | Effort levels this plan model accepts. |
| `speeds` | `Array` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.SubscriptionModel.list({ "agent_id" => "example", "organization_id" => "example", "profile_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubscriptionModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThreadPreviewEntity

```ruby
thread_preview = client.ThreadPreview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `Object` | Yes |  |
| `port` | `Integer` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ThreadPreview.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "thread_id" => "example_thread_id", # String
  "port" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThreadPreviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerificationProjectCredentialEntity

```ruby
verification_project_credential = client.VerificationProjectCredential
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `Object` | No |  |
| `browser_session` | `String` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `Object` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `Boolean` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `String` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `Boolean` | No | Select the Composal-managed Google test account when available. |
| `configured` | `Boolean` | Yes |  |
| `cookies` | `String` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `Hash` | Yes |  |
| `description` | `Object` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `Array` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `Boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `String` | Yes |  |
| `identity_provider` | `Object` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `Object` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `String` | Yes |  |
| `login_url` | `String` | Yes | Optional sign-in path or URL. |
| `managed` | `Boolean` | Yes |  |
| `mfa_enabled` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `oidc` | `Hash` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `String` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `String` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `String` | Yes |  |
| `provider_guidance` | `String` | Yes |  |
| `remove_browser_authentication` | `Boolean` | No |  |
| `remove_totp` | `Boolean` | No |  |
| `sign_in_verified` | `Boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `Object` | Yes |  |
| `status` | `String` | Yes |  |
| `totp_secret` | `String` | No | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `String` | Yes |  |
| `username` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerificationProjectCredential.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "login_method" => "example_login_method", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VerificationProjectCredential.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VerificationProjectCredential.load({ "id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.VerificationProjectCredential.patch({
  "id" => "verification_project_credential_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.VerificationProjectCredential.remove({ "id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.VerificationProjectCredential.update({
  "id" => "verification_project_credential_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerificationProjectCredentialEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerificationProjectPersonaEntity

```ruby
verification_project_persona = client.VerificationProjectPersona
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `String` | Yes |  |
| `archived_at` | `Object` | Yes |  |
| `capabilities` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `credential_id` | `Object` | Yes | The credential this persona signs in with. |
| `goals` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `project_id` | `String` | Yes |  |
| `role` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerificationProjectPersona.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
  "role" => "example_role", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VerificationProjectPersona.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VerificationProjectPersona.load({ "id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.VerificationProjectPersona.patch({
  "id" => "verification_project_persona_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.VerificationProjectPersona.remove({ "id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.VerificationProjectPersona.update({
  "id" => "verification_project_persona_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerificationProjectPersonaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerificationProjectRunEntity

```ruby
verification_project_run = client.VerificationProjectRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `Object` | Yes |  |
| `approved_digest` | `Object` | Yes |  |
| `archived_at` | `Object` | Yes |  |
| `available_tests` | `Array` | Yes |  |
| `can_archive` | `Boolean` | Yes |  |
| `can_restore` | `Boolean` | Yes |  |
| `can_start_another_run` | `Boolean` | Yes |  |
| `cleanup_state` | `String` | Yes |  |
| `concurrency` | `Integer` | Yes |  |
| `created_at` | `String` | Yes |  |
| `creator_name` | `Object` | Yes |  |
| `definition_mode` | `String` | Yes |  |
| `environment_id` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `lock_version` | `Integer` | Yes |  |
| `max_seconds` | `Integer` | Yes |  |
| `outcome` | `Object` | Yes |  |
| `permissions` | `Hash` | Yes |  |
| `plan_digest` | `Object` | Yes |  |
| `preparation_error_code` | `Object` | Yes |  |
| `progress` | `Hash` | Yes |  |
| `project` | `Hash` | Yes |  |
| `project_id` | `String` | Yes |  |
| `pull_request` | `Object` | Yes |  |
| `queued_at` | `Object` | Yes |  |
| `run` | `Hash` | Yes |  |
| `run_plan_id` | `Object` | No |  |
| `scenario_runs` | `Array` | Yes |  |
| `source_run_id` | `Object` | Yes |  |
| `source_versions` | `Object` | Yes |  |
| `start_when_prepared` | `Boolean` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `String` | Yes |  |
| `target_snapshot` | `Hash` | Yes |  |
| `title` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verifier_preferences_snapshot` | `Hash` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `String` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VerificationProjectRun.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VerificationProjectRun.load({ "id" => "verification_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerificationProjectRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerificationProjectScenarioEntity

```ruby
verification_project_scenario = client.VerificationProjectScenario
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `Hash` | No |  |
| `allowed_actions` | `String` | Yes |  |
| `archived_at` | `Object` | Yes |  |
| `cleanup` | `Array` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `String` | Yes |  |
| `dependencies` | `Array` | Yes |  |
| `fixtures` | `Array` | No | Files upload steps choose, ordered by name. |
| `health` | `Hash` | Yes |  |
| `id` | `String` | Yes |  |
| `identity_probe` | `Object` | No |  |
| `if` | `Object` | No | A documented subset of Actions expressions. |
| `labels` | `Array` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `Object` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `on` | `Object` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `Array` | Yes |  |
| `persona_id` | `String` | Yes |  |
| `primary_actor` | `Object` | No |  |
| `project_id` | `String` | Yes |  |
| `selectable_for_run` | `Boolean` | Yes |  |
| `starting_conditions` | `Object` | Yes |  |
| `steps` | `Array` | Yes |  |
| `triggers` | `Array` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerificationProjectScenario.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VerificationProjectScenario.list({ "organization_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VerificationProjectScenario.load({ "id" => "verification_project_scenario_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.VerificationProjectScenario.patch({
  "id" => "verification_project_scenario_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.VerificationProjectScenario.update({
  "id" => "verification_project_scenario_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerificationProjectScenarioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerifyAppDomainEntity

```ruby
verify_app_domain = client.VerifyAppDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerifyAppDomain.create({
  "app_id" => "example_app_id", # String
  "id" => "example_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerifyAppDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerifyBrowserSessionEntity

```ruby
verify_browser_session = client.VerifyBrowserSession
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `String` | Yes | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | No | Required when opening a browser for a new credential. |
| `origin` | `String` | Yes |  |
| `project_id` | `String` | Yes | The project (slug or ID) whose credential receives the session. |
| `status` | `String` | Yes |  |
| `url` | `String` | Yes |  |
| `viewer_url` | `Object` | Yes | Owner-only bearer link. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerifyBrowserSession.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "url" => "example_url", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VerifyBrowserSession.load({ "id" => "verify_browser_session_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.VerifyBrowserSession.remove({ "id" => "verify_browser_session_id", "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerifyBrowserSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerifyStaticSiteDomainEntity

```ruby
verify_static_site_domain = client.VerifyStaticSiteDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `Object` | Yes |  |
| `app_service_id` | `Object` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dns_mode` | `String` | Yes |  |
| `dns_status` | `String` | Yes |  |
| `failure_message` | `Object` | Yes |  |
| `hosted_app_id` | `Object` | Yes |  |
| `hostname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes |  |
| `last_checked_at` | `Object` | Yes |  |
| `record_name` | `Object` | Yes |  |
| `record_type` | `Object` | Yes |  |
| `record_value` | `Object` | Yes |  |
| `redirect_to` | `Object` | Yes |  |
| `static_site_id` | `Object` | Yes |  |
| `target_kind` | `String` | Yes |  |
| `tls_status` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `verification_status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.VerifyStaticSiteDomain.create({
  "id" => "example_id", # String
  "static_site_id" => "example_static_site_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerifyStaticSiteDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VersionLogEntity

```ruby
version_log = client.VersionLog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `String` | Yes |  |
| `failure_phase` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `image_digest` | `Object` | Yes |  |
| `image_reference` | `Object` | Yes |  |
| `installer_version` | `String` | Yes |  |
| `ready_at` | `Object` | Yes |  |
| `receipt` | `Object` | Yes |  |
| `safe_error` | `Object` | Yes |  |
| `started_at` | `Object` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VersionLog.list({ "binary_id" => "example", "organization_id" => "example", "version_id" => "example", "project_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VersionLogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebBotAuthEntity

```ruby
web_bot_auth = client.WebBotAuth
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `String` | Yes |  |
| `origin` | `String` | Yes |  |
| `signatures` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.WebBotAuth.create({
  "origin" => "example_origin", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebBotAuthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorkflowRunStepEntity

```ruby
workflow_run_step = client.WorkflowRunStep
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorkflowRunStepEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorkflowRunStopNoticeEntity

```ruby
workflow_run_stop_notice = client.WorkflowRunStopNotice
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorkflowRunStopNoticeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorkflowTriggerSkippedEntity

```ruby
workflow_trigger_skipped = client.WorkflowTriggerSkipped
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorkflowTriggerSkippedEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = ComposalSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

